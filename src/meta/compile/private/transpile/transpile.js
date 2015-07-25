import { ArrayExpression, ArrowFunctionExpression, BinaryExpression, BlockStatement, BreakStatement,
	CallExpression, CatchClause, ClassBody, ClassExpression, ConditionalExpression,
	ContinueStatement, DebuggerStatement, ExpressionStatement, ForOfStatement, FunctionExpression,
	Identifier, IfStatement, Literal, LogicalExpression, MethodDefinition, NewExpression,
	ObjectExpression, Program, ReturnStatement, TemplateLiteral, ThisExpression, ThrowStatement,
	TryStatement, VariableDeclaration, UnaryExpression, VariableDeclarator } from 'esast/dist/ast'
import { idCached, loc, member, propertyIdOrLiteralCached, toStatement } from 'esast/dist/util'
import { assignmentExpressionPlain, callExpressionThunk, functionExpressionThunk, memberExpression,
	property, yieldExpressionDelegate, yieldExpressionNoDelegate } from 'esast/dist/specialize'
import * as MsAstTypes from '../../MsAst'
import { AssignSingle, Call, Fun, L_And, L_Or, LD_Lazy, LD_Mutable, MethodImpl, MS_Mutate, MS_New,
	MS_NewMutable, Pattern, Splat, SD_Debugger, SV_Contains, SV_False, SV_Null, SV_Sub, SV_Super,
	SV_ThisModuleDirectory, SV_True, SV_Undefined } from '../../MsAst'
import manglePath from '../manglePath'
import { assert, cat, flatMap, flatOpMap, ifElse, isEmpty,
	implementMany, isPositive, opIf, opMap, tail, unshift } from '../util'
import { AmdefineHeader, ArraySliceCall, DeclareBuiltBag, DeclareBuiltMap, DeclareBuiltObj,
	EmptyTemplateElement, ExportsDefault, ExportsGet, IdArguments, IdBuilt, IdDefine, IdExports,
	IdExtract, IdFunctionApplyCall, IdLexicalThis, LitEmptyArray, LitEmptyString, LitNull,
	LitStrExports, LitStrThrow, LitZero, ReturnBuilt, ReturnExports, ReturnRes, ThrowAssertFail,
	ThrowNoCaseMatch, UseStrict } from './ast-constants'
import { IdMs, lazyWrap, msAdd, msAddMany, msArr, msAssert, msAssertNot, msAssoc, msBool,
	msCheckContains, msError, msExtract, msGet, msGetDefaultExport, msGetModule, msLazy, msLazyGet,
	msLazyGetModule, msNewMutableProperty, msNewProperty, msSet, msSetName, msSetLazy, msShow,
	msSome, msSymbol, MsNone } from './ms-call'
import { accessLocalDeclare, declare, forStatementInfinite, idForDeclareCached,
	opTypeCheckForLocalDeclare, templateElementForString } from './util'

let context, verifyResults, isInGenerator

export default (_context, moduleExpression, _verifyResults) => {
	context = _context
	verifyResults = _verifyResults
	isInGenerator = false
	const res = t0(moduleExpression)
	// Release for garbage collection.
	context = verifyResults = undefined
	return res
}

export const
	t0 = expr => loc(expr.transpileSubtree(), expr.loc)
const
	t1 = (expr, arg) => loc(expr.transpileSubtree(arg), expr.loc),
	t3 = (expr, arg, arg2, arg3) => loc(expr.transpileSubtree(arg, arg2, arg3), expr.loc),
	tLines = exprs => {
		const out = [ ]
		for (const expr of exprs) {
			const ast = expr.transpileSubtree()
			if (ast instanceof Array)
				// Debug may produce multiple statements.
				for (const _ of ast)
					out.push(toStatement(_))
			else
				out.push(loc(toStatement(ast), expr.loc))
		}
		return out
	}

implementMany(MsAstTypes, 'transpileSubtree', {
	Assert() {
		const failCond = () => {
			const cond = msBool(t0(this.condition))
			return this.negate ? cond : UnaryExpression('!', cond)
		}

		return ifElse(this.opThrown,
			thrown => IfStatement(failCond(), ThrowStatement(msError(t0(thrown)))),
			() => {
				if (this.condition instanceof Call) {
					const call = this.condition
					const anySplat = call.args.some(_ => _ instanceof Splat)
					context.check(!anySplat, call.loc, 'TODO: Splat args in assert')
					const ass = this.negate ? msAssertNot : msAssert
					return ass(t0(call.called), ...call.args.map(t0))
				} else
					return IfStatement(failCond(), ThrowAssertFail)
			})
	},

	AssignSingle(valWrap) {
		const val = valWrap === undefined ? t0(this.value) : valWrap(t0(this.value))
		const declare =
			makeDeclarator(this.assignee, val, false, verifyResults.isExportAssign(this))
		return VariableDeclaration(this.assignee.isMutable() ? 'let' : 'const', [ declare ])
	},
	// TODO:ES6 Just use native destructuring assign
	AssignDestructure() {
		return VariableDeclaration(this.kind() === LD_Mutable ? 'let' : 'const',
			makeDestructureDeclarators(
				this.assignees,
				this.kind() === LD_Lazy,
				t0(this.value),
				false,
				verifyResults.isExportAssign(this)))
	},

	BagEntry() { return msAdd(IdBuilt, t0(this.value)) },

	BagEntryMany() { return msAddMany(IdBuilt, t0(this.value)) },

	BagSimple() { return ArrayExpression(this.parts.map(t0)) },

	BlockDo(lead, opDeclareRes, opOut) {
		// TODO:ES6 Optional arguments
		if (lead === undefined) lead = null
		if (opDeclareRes === undefined) opDeclareRes = null
		if (opOut === undefined) opOut = null
		assert(opDeclareRes === null)
		return BlockStatement(cat(lead, tLines(this.lines), opOut))
	},

	BlockValThrow(lead, opDeclareRes, opOut) {
		// TODO:ES6 Optional arguments
		if (lead === undefined) lead = null
		if (opDeclareRes === undefined) opDeclareRes = null
		if (opOut === undefined) opOut = null
		context.warnIf(opDeclareRes !== null || opOut !== null, this.loc,
			'Out condition ignored because of oh-no!')
		return BlockStatement(cat(lead, tLines(this.lines), t0(this._throw)))
	},

	BlockWithReturn(lead, opDeclareRes, opOut) {
		return transpileBlock(t0(this.returned), tLines(this.lines), lead, opDeclareRes, opOut)
	},

	BlockBag(lead, opDeclareRes, opOut) {
		return transpileBlock(
			IdBuilt,
			cat(DeclareBuiltBag, tLines(this.lines)),
			lead, opDeclareRes, opOut)
	},

	BlockObj(lead, opDeclareRes, opOut) {
		const lines = cat(DeclareBuiltObj, tLines(this.lines))
		const res = ifElse(this.opObjed,
			objed => ifElse(this.opName,
				name => msSet(t0(objed), IdBuilt, Literal(name)),
				() => msSet(t0(objed), IdBuilt)),
			() => ifElse(this.opName,
				_ => msSetName(IdBuilt, Literal(_)),
				() => IdBuilt))
		return transpileBlock(res, lines, lead, opDeclareRes, opOut)
	},

	BlockMap(lead, opDeclareRes, opOut) {
		return transpileBlock(
			IdBuilt,
			cat(DeclareBuiltMap, tLines(this.lines)),
			lead, opDeclareRes, opOut)
	},

	BlockWrap() { return blockWrap(t0(this.block)) },

	BreakDo() { return BreakStatement() },

	BreakVal() { return ReturnStatement(t0(this.value)) },

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
		return blockWrap(BlockStatement(block))
	},

	CaseDoPart: casePart,
	CaseValPart: casePart,

	Class() {
		const methods = cat(
			this.statics.map(methodDefinition(true)),
			opMap(this.opConstructor, constructorDefinition),
			this.methods.map(methodDefinition(false)))
		const opName = opMap(this.opName, idCached)
		return ClassExpression(opName, opMap(this.superClass, t0), ClassBody(methods))
	},

	ConditionalDo() {
		return IfStatement(
			this.isUnless ? UnaryExpression('!', maybeBoolWrap(t0(this.test))) : t0(this.test),
			t0(this.result))
	},

	ConditionalVal() {
		const test = maybeBoolWrap(t0(this.test))
		const result = msSome(blockWrap(t0(this.result)))
		return this.isUnless ?
			ConditionalExpression(test, MsNone, result) :
			ConditionalExpression(test, result, MsNone)
	},

	Catch() {
		return CatchClause(t0(this.caught), t0(this.block))
	},

	Continue() { return ContinueStatement() },

	// TODO: includeInoutChecks is misnamed
	Debug() { return context.opts.includeInoutChecks() ? tLines(this.lines) : [ ] },

	ExceptDo() { return transpileExcept(this) },
	ExceptVal() { return blockWrap(BlockStatement([ transpileExcept(this) ])) },

	ForDo() { return forLoop(this.opIteratee, this.block) },

	ForBag() {
		return blockWrap(BlockStatement([
			DeclareBuiltBag,
			forLoop(this.opIteratee, this.block),
			ReturnBuilt
		]))
	},

	ForVal() {
		return blockWrap(BlockStatement([ forLoop(this.opIteratee, this.block) ]))
	},

	Fun() {
		const oldInGenerator = isInGenerator
		isInGenerator = this.isGenerator

		// TODO:ES6 use `...`f
		const nArgs = Literal(this.args.length)
		const opDeclareRest = opMap(this.opRestArg, rest =>
			declare(rest, CallExpression(ArraySliceCall, [IdArguments, nArgs])))
		const argChecks = opIf(context.opts.includeTypeChecks(), () =>
			flatOpMap(this.args, opTypeCheckForLocalDeclare))

		const _in = opMap(this.opIn, t0)

		const opDeclareThis = opMap(this.opDeclareThis, () =>
			VariableDeclaration('const', [ VariableDeclarator(IdLexicalThis, ThisExpression()) ]))

		const lead = cat(opDeclareThis, opDeclareRest, argChecks, _in)

		const _out = opMap(this.opOut, t0)
		const body = t3(this.block, lead, this.opDeclareRes, _out)
		const args = this.args.map(t0)
		isInGenerator = oldInGenerator
		const id = opMap(this.opName, idCached)

		const canUseArrowFunction =
			id === null && opDeclareThis === null && opDeclareRest === null && !this.isGenerator
		return canUseArrowFunction ?
			ArrowFunctionExpression(args, body) :
			FunctionExpression(id, args, body, this.isGenerator)
	},

	Lazy() { return lazyWrap(t0(this.value)) },

	NumberLiteral() {
		// Negative numbers are not part of ES spec.
		// http://www.ecma-international.org/ecma-262/5.1/#sec-7.8.3
		const lit = Literal(Math.abs(this.value))
		return isPositive(this.value) ? lit : UnaryExpression('-', lit)
	},

	GlobalAccess() { return Identifier(this.name) },

	LocalAccess() {
		return this.name === 'this' ?
			Identifier('_this') :
			accessLocalDeclare(verifyResults.localDeclareForAccess(this))
	},

	LocalDeclare() { return idForDeclareCached(this) },

	LocalMutate() {
		return assignmentExpressionPlain(idCached(this.name), t0(this.value))
	},

	Logic() {
		assert(this.kind === L_And || this.kind === L_Or)
		const op = this.kind === L_And ? '&&' : '||'
		return tail(this.args).reduce((a, b) => LogicalExpression(op, a, t0(b)), t0(this.args[0]))
	},

	MapEntry() { return msAssoc(IdBuilt, t0(this.key), t0(this.val)) },

	Member() { return member(t0(this.object), this.name) },

	MemberSet() {
		switch (this.kind) {
			case MS_Mutate:
				return assignmentExpressionPlain(member(t0(this.object), this.name), t0(this.value))
			case MS_New:
				return msNewProperty(t0(this.object), Literal(this.name), t0(this.value))
			case MS_NewMutable:
				return msNewMutableProperty(t0(this.object), Literal(this.name), t0(this.value))
			default: throw new Error()
		}
	},

	Module() {
		const body = cat(
			tLines(this.lines),
			opMap(this.opDefaultExport, _ => assignmentExpressionPlain(ExportsDefault, t0(_))))
		return Program(cat(
			opIf(context.opts.includeUseStrict(), () => UseStrict),
			opIf(context.opts.includeAmdefine(), () => AmdefineHeader),
			toStatement(amdWrapModule(this.doUses, this.uses.concat(this.debugUses), body))))
	},

	New() {
		const anySplat = this.args.some(_ => _ instanceof Splat)
		context.check(!anySplat, this.loc, 'TODO: Splat params for new')
		return NewExpression(t0(this.type), this.args.map(t0))
	},

	Not() { return UnaryExpression('!', t0(this.arg)) },

	ObjEntry() {
		return (this.assign instanceof AssignSingle && !this.assign.assignee.isLazy()) ?
			t1(this.assign, val =>
				assignmentExpressionPlain(member(IdBuilt, this.assign.assignee.name), val)) :
			cat(
				t0(this.assign),
				this.assign.allAssignees().map(_ =>
					msSetLazy(IdBuilt, Literal(_.name), idForDeclareCached(_))))
	},

	ObjSimple() {
		return ObjectExpression(this.pairs.map(pair =>
			property('init', propertyIdOrLiteralCached(pair.key), t0(pair.value))))
	},

	Quote() {
		if (this.parts.length === 0)
			return LitEmptyString
		else {
			const quasis = [ ], expressions = [ ]

			// TemplateLiteral must start with a TemplateElement
			if (typeof this.parts[0] !== 'string')
				quasis.push(EmptyTemplateElement)

			for (let part of this.parts)
				if (typeof part === 'string')
					quasis.push(templateElementForString(part))
				else {
					// "{1}{1}" needs an empty quasi in the middle (and on the ends)
					if (quasis.length === expressions.length)
						quasis.push(EmptyTemplateElement)
					expressions.push(msShow(t0(part)))
				}

			// TemplateLiteral must end with a TemplateElement, so one more quasi than expression.
			if (quasis.length === expressions.length)
				quasis.push(EmptyTemplateElement)

			return TemplateLiteral(quasis, expressions)
		}
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
			case SV_Super: return Identifier('super')
			case SV_ThisModuleDirectory: return Identifier('__dirname')
			case SV_True: return Literal(true)
			case SV_Undefined: return UnaryExpression('void', LitZero)
			default: throw new Error(this.kind)
		}
	},

	Throw() {
		return ifElse(this.opThrown,
			_ => ThrowStatement(msError(t0(_))),
			() => ThrowStatement(msError(LitStrThrow)))
	},

	Yield() { return yieldExpressionNoDelegate(t0(this.yielded)) },

	YieldTo() { return yieldExpressionDelegate(t0(this.yieldedTo)) }
})

function casePart(alternate) {
	if (this.test instanceof Pattern) {
		const { type, patterned, locals } = this.test
		const decl = VariableDeclaration('const', [
			VariableDeclarator(IdExtract, msExtract(t0(type), t0(patterned))) ])
		const test = BinaryExpression('!==', IdExtract, LitNull)
		const extract = VariableDeclaration('const', locals.map((_, idx) =>
			VariableDeclarator(idForDeclareCached(_), memberExpression(IdExtract, Literal(idx)))))
		const res = t1(this.result, extract)
		return BlockStatement([ decl, IfStatement(test, res, alternate) ])
	} else
		// alternate written to by `caseBody`.
		return IfStatement(maybeBoolWrap(t0(this.test)), t0(this.result), alternate)
}

// Functions specific to certain expressions.
const
	// Wraps a block (with `return` statements in it) in an IIFE.
	blockWrap = block => {
		const invoke = callExpressionThunk(functionExpressionThunk(block, isInGenerator))
		return isInGenerator ? yieldExpressionDelegate(invoke) : invoke
	},

	caseBody = (parts, opElse) => {
		let acc = ifElse(opElse, t0, () => ThrowNoCaseMatch)
		for (let i = parts.length - 1; i >= 0; i = i - 1)
			acc = t1(parts[i], acc)
		return acc
	},

	forLoop = (opIteratee, block) =>
		ifElse(opIteratee,
			({ element, bag }) => {
				const declare = VariableDeclaration('let', [ VariableDeclarator(t0(element)) ])
				return ForOfStatement(declare, t0(bag), t0(block))
			},
			() => forStatementInfinite(t0(block))),

	constructorDefinition = fun =>
		MethodDefinition(Identifier('constructor'), t0(fun), 'constructor', false, false),
	methodDefinition = isStatic => method => {
		if (method instanceof Fun) {
			assert(method.opName !== null)
			const key = propertyIdOrLiteralCached(method.opName)
			const value = t0(method)
			value.id = null
			const computed = false
			return MethodDefinition(key, value, 'method', isStatic, computed)
		} else {
			assert(method instanceof MethodImpl)
			const fun = method.fun
			assert(fun.opName === null)
			const key = msSymbol(t0(method.symbol))
			const value = t0(fun)
			// This is handled by `key`.
			value.id = null
			// TODO: get/set!
			const computed = true
			return MethodDefinition(key, value, 'method', isStatic, computed)
		}
	},

	transpileBlock = (returned, lines, lead, opDeclareRes, opOut) => {
		// TODO:ES6 Optional arguments
		if (lead === undefined) lead = null
		if (opDeclareRes === undefined) opDeclareRes = null
		if (opOut === undefined) opOut = null
		const fin = ifElse(opDeclareRes,
			rd => {
				const ret = maybeWrapInCheckContains(returned, rd.opType, rd.name)
				return ifElse(opOut,
					_ => cat(declare(rd, ret), _, ReturnRes),
					() => ReturnStatement(ret))
			},
			() => cat(opOut, ReturnStatement(returned)))
		return BlockStatement(cat(lead, lines, fin))
	},

	transpileExcept = except =>
		TryStatement(
			t0(except._try),
			opMap(except._catch, t0),
			opMap(except._finally, t0))

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
			context.opts.lazyModule() ?
				BlockStatement([ ExpressionStatement(
					assignmentExpressionPlain(ExportsGet,
						msLazy(functionExpressionThunk(fullBody)))) ]) :
				fullBody
		return CallExpression(IdDefine, [ usePaths, ArrowFunctionExpression(useArgs, lazyBody) ])
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

// General utils. Not in util.js because these close over context.
const
	maybeBoolWrap = ast =>
		context.opts.includeCaseChecks() ? msBool(ast) : ast,

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
			context.check(!isLazy, loc, 'Lazy export not supported.')
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
		(context.opts.includeTypeChecks() && opType !== null) ?
			msCheckContains(t0(opType), ast, Literal(name)) :
			ast,

	getMember = (astObject, gotName, isLazy, isModule) =>
		isLazy ?
		msLazyGet(astObject, Literal(gotName)) :
		isModule && context.opts.includeUseChecks() ?
		msGet(astObject, Literal(gotName)) :
		member(astObject, gotName)
