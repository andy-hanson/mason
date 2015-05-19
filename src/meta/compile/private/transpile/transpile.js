import { ArrayExpression, BinaryExpression, BlockStatement, BreakStatement, CallExpression,
	DebuggerStatement, ExpressionStatement, FunctionExpression, Identifier, IfStatement,
	LabeledStatement, Literal, ObjectExpression, Program, ReturnStatement, ThisExpression,
	VariableDeclaration, UnaryExpression, VariableDeclarator, ReturnStatement
	} from 'esast/dist/ast'
import { idCached, loc, member, propertyIdOrLiteralCached, thunk, toStatement
	} from 'esast/dist/util'
import { assignmentExpressionPlain, callExpressionThunk, functionExpressionPlain,
	functionExpressionThunk, memberExpression, property, variableDeclarationConst,
	yieldExpressionDelegate, yieldExpressionNoDelegate } from 'esast/dist/specialize'
import * as EExports from '../../Expression'
import { LD_Lazy, LD_Mutable, Pattern, Splat, SD_Debugger, SV_Contains, SV_False, SV_Null, SV_Sub,
	SV_This, SV_ThisModuleDirectory, SV_True, SV_Undefined } from '../../Expression'
import manglePath from '../manglePath'
import { assert, cat, flatMap, flatOpMap, ifElse, isEmpty,
	implementMany, isPositive, opIf, opMap, range, tail, unshift } from '../util'
import { AmdefineHeader, ArraySliceCall, ExportsDefault, ExportsGet, IdArguments, IdDefine,
	IdExports, IdExtract, IdFunctionApplyCall, IdName, LitEmptyArray, LitEmptyString, LitNull,
	LitStrExports, LitStrName, LitZero, ReturnExports, ReturnRes, UseStrict
	} from './ast-constants'
import { IdMs, lazyWrap, msArr, msBool, msCheckContains, msExtract, msGet, msGetDefaultExport,
	msGetModule, msLazy, msLazyGet, msLazyGetModule, msLset, msMap, msSet, msShow
	} from './ms-call'
import { accessLocalDeclare, declare, declareSpecial,
	idForDeclareCached, throwError, whileStatementInfinite } from './util'

let cx, vr, isInGenerator

export default function transpile(_cx, moduleExpression, _vr) {
	cx = _cx
	vr = _vr
	isInGenerator = false
	const res = t0(moduleExpression)
	// Release for garbage collection
	cx = vr = undefined
	return res
}

const
	t0 = expr => loc(expr.transpileSubtree(), expr.loc),
	t1 = (expr, arg) => loc(expr.transpileSubtree(arg), expr.loc),
	t3 = (expr, arg, arg2, arg3) => loc(expr.transpileSubtree(arg, arg2, arg3), expr.loc),
	tLines = exprs => {
		const out = [ ]
		exprs.forEach(expr => {
			const ast = expr.transpileSubtree()
			if (ast instanceof Array)
				// Debug may produce multiple statements.
				ast.forEach(_ => out.push(toStatement(_)))
			else
				out.push(loc(toStatement(ast), expr.loc))
		})
		return out
	}

implementMany(EExports, 'transpileSubtree', {
	Assign() {
		return VariableDeclaration(
			this.assignee.isMutable() ? 'let' : 'const',
			[ makeDeclarator(this.assignee, t0(this.value), false, vr.isExportAssign(this)) ])
	},
	// TODO:ES6 Just use native destructuring assign
	AssignDestructure() {
		return VariableDeclaration(this.kind() === LD_Mutable ? 'let' : 'const',
			makeDestructureDeclarators(
				this.assignees,
				this.kind() === LD_Lazy,
				t0(this.value),
				false,
				vr.isExportAssign(this)))
	},

	AssignMutate() {
		return assignmentExpressionPlain(idCached(this.name), t0(this.value))
	},

	BagEntry() { return declareSpecial(`_${vr.listMapEntryIndex(this)}`, t0(this.value)) },

	BagSimple() { return ArrayExpression(this.parts.map(t0)) },

	BlockDo(lead = null, opResDeclare = null, opOut = null) {
		assert(opResDeclare === null)
		return BlockStatement(cat(lead, tLines(this.lines), opOut))
	},

	BlockWithReturn(lead, opResDeclare, opOut) {
		return transpileBlock(t0(this.returned), this.lines, lead, opResDeclare, opOut)
	},

	BlockObj(lead, opResDeclare, opOut) {
		// TODO: includeTypeChecks() is not the right method for this
		const keys =
			cx.opts.includeTypeChecks() ? this.keys : this.keys.filter(_ => !vr.isDebugLocal(_))
		const ret = ifElse(this.opObjed,
			_ => {
				const objed = t0(_)
				const keysVals = cat(
					flatMap(keys, key => [ Literal(key.name), accessLocalDeclare(key) ]),
					opMap(this.opName, _ => [ LitStrName, Literal(_) ]))
				const anyLazy = keys.some(_ => _.isLazy())
				return (anyLazy ? msLset : msSet)(objed, ...keysVals)
			},
			() => {
				const props = keys.map(key => {
					const val = accessLocalDeclare(key)
					const id = propertyIdOrLiteralCached(key.name)
					return key.isLazy() ?
						property('get', id, thunk(val)) :
						property('init', id, val)
				})
				const opPropName = opMap(this.opName, _ => property('init', IdName, Literal(_)))
				return ObjectExpression(cat(props, opPropName))
			})
		return transpileBlock(ret, this.lines, lead, opResDeclare, opOut)
	},

	BlockBag(lead, opResDeclare, opOut) {
		const length = vr.listMapLength(this)
		return transpileBlock(
			ArrayExpression(range(length).map(i => idCached(`_${i}`))),
			this.lines, lead, opResDeclare, opOut)
	},

	BlockMap(lead, opResDeclare, opOut) {
		const length = vr.listMapLength(this)
		return transpileBlock(
			msMap(...flatMap(range(length), i =>
				[ idCached(`_k${i}`), idCached(`_v${i}`) ])),
			this.lines, lead, opResDeclare, opOut)
	},

	BlockWrap() { return blockWrap(this, t0(this.block)) },

	Call() {
		const anySplat = this.args.some(arg => arg instanceof Splat)
		if (anySplat) {
			const args = this.args.map(arg =>
				arg instanceof Splat ?
					msArr(t0(arg.splatted)) :
					t0(arg))
			return CallExpression(IdFunctionApplyCall, [
				t0(this.called),
				LitNull,
				CallExpression(member(LitEmptyArray, 'concat'), args)])
		}
		else return CallExpression(t0(this.called), this.args.map(t0))
	},

	CaseDo() {
		const body = caseBody(this.parts, this.opElse)
		return ifElse(this.opCased, _ => BlockStatement([ t0(_), body ]), () => body)
	},

	CaseVal() {
		const body = caseBody(this.parts, this.opElse)
		const block = ifElse(this.opCased, _ => [ t0(_), body ], () => [ body ])
		return blockWrap(this, BlockStatement(block))
	},

	CaseDoPart: casePart,
	CaseValPart: casePart,
	// TODO: includeInoutChecks is misnamed
	Debug() { return cx.opts.includeInoutChecks() ? tLines(this.lines) : [ ] },

	ObjSimple() {
		return ObjectExpression(this.pairs.map(pair =>
			property('init', propertyIdOrLiteralCached(pair.key), t0(pair.value))))
	},

	EndLoop() { return BreakStatement(loopId(vr.endLoopToLoop.get(this))) },

	Fun() {
		const oldInGenerator = isInGenerator
		isInGenerator = this.isGenerator

		// TODO:ES6 use `...`f
		const nArgs = Literal(this.args.length)
		const opDeclareRest = opMap(this.opRestArg, rest =>
			declare(rest, CallExpression(ArraySliceCall, [IdArguments, nArgs])))
		const argChecks =
			opIf(cx.opts.includeTypeChecks(), () =>
				flatOpMap(this.args, _ =>
					// TODO: Way to typecheck lazies
					opIf(!_.isLazy(), () =>
						opMap(_.opType, type =>
							ExpressionStatement(msCheckContains(
								t0(type),
								accessLocalDeclare(_),
								Literal(_.name)))))))

		const _in = opMap(this.opIn, t0)
		const lead = cat(opDeclareRest, argChecks, _in)

		const _out = opMap(this.opOut, t0)
		const body = t3(this.block, lead, this.opResDeclare, _out)
		const args = this.args.map(t0)
		isInGenerator = oldInGenerator
		const id = opMap(this.name, idCached)
		return FunctionExpression(id, args, body, this.isGenerator)
	},

	Lazy() { return lazyWrap(t0(this.value)) },

	NumberLiteral() {
		// Negative numbers are not part of ES spec.
		// http://www.ecma-international.org/ecma-262/5.1/#sec-7.8.3
		const lit = Literal(Math.abs(this.value))
		return isPositive(this.value) ? lit : UnaryExpression('-', lit)
	},

	GlobalAccess() { return Identifier(this.name) },

	IfDo() { return IfStatement(maybeBoolWrap(t0(this.test)), t0(this.result)) },

	LocalAccess() { return accessLocalDeclare(vr.accessToLocal.get(this)) },

	LocalDeclare() { return idForDeclareCached(this) },

	// TODO: Don't always label!
	Loop() {
		return LabeledStatement(loopId(this), whileStatementInfinite(t0(this.block)))
	},

	MapEntry() {
		const index = vr.listMapEntryIndex(this)
		const k = `_k${index}`
		const v = `_v${index}`
		return variableDeclarationConst([
			VariableDeclarator(idCached(k), t0(this.key)),
			VariableDeclarator(idCached(v), t0(this.val))
		])
	},

	Member() { return member(t0(this.object), this.name) },

	Module() {
		const body = cat(
			tLines(this.lines),
			opMap(this.opDefaultExport, _ => assignmentExpressionPlain(ExportsDefault, t0(_))))
		return Program(cat(
			opIf(cx.opts.includeUseStrict(), () => UseStrict),
			opIf(cx.opts.includeAmdefine(), () => AmdefineHeader),
			toStatement(amdWrapModule(this.doUses, this.uses.concat(this.debugUses), body))))
	},

	Quote() {
		// TODO:ES6 use template strings
		const part0 = this.parts[0]
		const [ first, restParts ] =
			typeof part0 === 'string' ?
				[ Literal(part0), tail(this.parts) ] :
				[ LitEmptyString, this.parts ]
		return restParts.reduce(
			(ex, _) =>
				BinaryExpression('+', ex, typeof _ === 'string' ? Literal(_) : msShow(t0(_))),
			first)
	},

	SpecialDo() {
		switch (this.kind) {
			case SD_Debugger: return DebuggerStatement()
			default: throw new Error(this.kind)
		}
	},

	SpecialVal() {
		// Make new objects because we will assign `loc` to them.
		switch (this.kind) {
			case SV_Contains: return member(IdMs, 'contains')
			case SV_False: return Literal(false)
			case SV_Null: return Literal(null)
			case SV_Sub: return member(IdMs, 'sub')
			case SV_This: return 	ThisExpression()
			case SV_ThisModuleDirectory: return Identifier('__dirname')
			case SV_True: return Literal(true)
			case SV_Undefined: return UnaryExpression('void', LitZero)
			default: throw new Error(this.kind)
		}
	},

	UnlessDo() {
		return IfStatement(UnaryExpression('!', maybeBoolWrap(t0(this.test))), t0(this.result))
	},

	Yield() { return yieldExpressionNoDelegate(t0(this.yielded)) },

	YieldTo() { return yieldExpressionDelegate(t0(this.yieldedTo)) }
})

function casePart(alternate) {
	if (this.test instanceof Pattern) {
		const { type, patterned, locals } = this.test
		const decl = variableDeclarationConst([
			VariableDeclarator(IdExtract, msExtract(t0(type), t0(patterned))) ])
		const test = BinaryExpression('!==', IdExtract, LitNull)
		const extract = variableDeclarationConst(locals.map((_, idx) =>
			VariableDeclarator(idForDeclareCached(_), memberExpression(IdExtract, Literal(idx)))))
		const res = t1(this.result, extract)
		return BlockStatement([ decl, IfStatement(test, res, alternate) ])
	} else
		// alternate written to by `caseBody`.
		return IfStatement(maybeBoolWrap(t0(this.test)), t0(this.result), alternate)
}

// Functions specific to certain expressions.
const
	blockWrap = (_, block) => {
		const invoke = callExpressionThunk(functionExpressionThunk(block, isInGenerator))
		return isInGenerator ? yieldExpressionDelegate(invoke) : invoke
	},

	caseBody = (parts, opElse) => {
		let acc = ifElse(opElse, t0, () => throwError('No branch of `case` matches.'))
		for (let i = parts.length - 1; i >= 0; i = i - 1)
			acc = t1(parts[i], acc)
		return acc
	},

	loopId = loop => idCached(`loop${loop.loc.start.line}`),

	transpileBlock = (returned, lines, lead = null, opResDeclare = null, opOut = null) => {
		const fin = ifElse(opResDeclare,
			rd => {
				const ret = maybeWrapInCheckContains(returned, rd.opType, rd.name)
				return ifElse(opOut,
					_ => cat(declare(rd, ret), _, ReturnRes),
					() => ReturnStatement(ret))
			},
			() => cat(opOut, ReturnStatement(returned)))
		return BlockStatement(cat(lead, tLines(lines), fin))
	}

// Module helpers
const
	amdWrapModule = (doUses, otherUses, body) => {
		const allUses = doUses.concat(otherUses)
		const usePaths = ArrayExpression(cat(
			LitStrExports,
			allUses.map(_ => Literal(manglePath(_.path)))))
		const useIdentifiers = allUses.map((_, i) => idCached(`${pathBaseName(_.path)}_${i}`))
		const useArgs = cat(IdExports, useIdentifiers)
		const useDos = doUses.map((use, i) =>
			loc(ExpressionStatement(msGetModule(useIdentifiers[i])), use.loc))
		const opUseDeclare = opIf(!isEmpty(otherUses),
			() => VariableDeclaration('const', flatMap(otherUses, (use, i) =>
				useDeclarators(use, useIdentifiers[i + doUses.length]))))
		const fullBody = BlockStatement(cat(useDos, opUseDeclare, body, ReturnExports))
		const lazyBody =
			cx.opts.lazyModule() ?
				BlockStatement([ ExpressionStatement(
					assignmentExpressionPlain(ExportsGet,
						msLazy(functionExpressionThunk(fullBody)))) ]) :
				fullBody
		return CallExpression(IdDefine, [ usePaths, functionExpressionPlain(useArgs, lazyBody) ])
	},

	pathBaseName = path =>
		path.substr(path.lastIndexOf('/') + 1),

	useDeclarators = (use, moduleIdentifier) => {
		// TODO: Could be neater about this
		const isLazy = (isEmpty(use.used) ? use.opUseDefault : use.used[0]).isLazy()
		const value = (isLazy ? msLazyGetModule : msGetModule)(moduleIdentifier)

		const usedDefault = opMap(use.opUseDefault, def => {
			const defexp = msGetDefaultExport(moduleIdentifier)
			const val = isLazy ? lazyWrap(defexp) : defexp
			return loc(VariableDeclarator(idForDeclareCached(def), val), def.loc)
		})

		const usedDestruct = isEmpty(use.used) ? null :
			makeDestructureDeclarators(use.used, isLazy, value, true, false)

		return cat(usedDefault, usedDestruct)
	}

// General utils. Not in util.js because these close over cx.
const
	maybeBoolWrap = ast =>
		cx.opts.includeCaseChecks() ? msBool(ast) : ast,

	makeDestructureDeclarators = (assignees, isLazy, value, isModule, isExport) => {
		const destructuredName = `_$${assignees[0].loc.start.line}`
		const idDestructured = Identifier(destructuredName)
		const declarators = assignees.map(assignee => {
			// TODO: Don't compile it if it's never accessed
			const get = getMember(idDestructured, assignee.name, isLazy, isModule)
			return makeDeclarator(assignee, get, isLazy, isExport)
		})
		// Getting lazy module is done by ms.lazyGetModule.
		const val = (isLazy && !isModule) ? lazyWrap(value) : value
		return unshift(VariableDeclarator(idDestructured, val), declarators)
	},

	makeDeclarator = (assignee, value, valueIsAlreadyLazy, isExport) => {
		const { loc, name, opType } = assignee
		const isLazy = assignee.isLazy()
		// TODO: assert(assignee.opType === null)
		// or TODO: Allow type check on lazy value?
		value = isLazy ? value : maybeWrapInCheckContains(value, opType, name)
		if (isExport) {
			// TODO:ES6
			cx.check(!isLazy, loc, 'Lazy export not supported.')
			return VariableDeclarator(
				idForDeclareCached(assignee),
				assignmentExpressionPlain(member(IdExports, name), value))
		} else {
			const val = isLazy && !valueIsAlreadyLazy ? lazyWrap(value) : value
			assert(isLazy || !valueIsAlreadyLazy)
			return VariableDeclarator(idForDeclareCached(assignee), val)
		}
	},

	maybeWrapInCheckContains = (ast, opType, name) =>
		(cx.opts.includeTypeChecks() && opType !== null) ?
			msCheckContains(t0(opType), ast, Literal(name)) :
			ast,

	getMember = (astObject, gotName, isLazy, isModule) =>
		isLazy ?
		msLazyGet(astObject, Literal(gotName)) :
		isModule && cx.opts.includeUseChecks() ?
		msGet(astObject, Literal(gotName)) :
		member(astObject, gotName)
