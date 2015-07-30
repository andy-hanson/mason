import { AssignSingle, BagSimple, Call, LD_Const, LocalDeclare, Member, New, ObjPair, ObjSimple,
	Quote, QuoteTemplate, SpecialVal, SV_False, SV_Null, SV_ThisModuleDirectory, SV_True,
	SV_Undefined } from '../../dist/meta/compile/MsAst'
import { aAccess, assignAZero, focusAccess, loc, one, two, zero } from './util/ast-util'
import { test } from './util/test-asts'

describe('expressions', () => {
	test(
		'[ 0 1 ]',
		BagSimple(loc, [ zero, one ]),
		'[0,1]')

	test(
		'(a. 0 b. 1)',
		ObjSimple(loc, [
			ObjPair(loc, 'a', zero),
			ObjPair(loc, 'b', one)
		]),
		`
			{
				a:0,
				b:1
			}`)

	test(
		'0',
		zero,
		'0')

	test(
		'0.x',
		Member(loc, zero, 'x'),
		'0..x')

	describe('Call', () => {
		test(
			'0 1',
			Call(loc, zero, [ one ]),
			'0(1)')

		test(
			'0()',
			Call(loc, zero, [ ]),
			'0()')

		// TODO:ES6 Splat

		test(
			'0[1 2]',
			Call.sub(loc, [ zero, one, two ]),
			'_ms.sub(0,1,2)')

		test(
			'0:1',
			Call.contains(loc, one, zero),
			'_ms.contains(1,0)')

		test(
			'new 0',
			New(loc, zero, [ ]),
			'new (0)()')
	})

	describe('SpecialVal', () => {
		// TODO: Move to types test?
		test(
			`
				a = 0
				_ = 0
				:a`,
			[
				assignAZero,
				// TODO: assignFocusZero (but that uses LocalDeclareFocus, not a plain LocalDeclare)
				AssignSingle(loc, LocalDeclare(loc, '_', null, LD_Const), zero),
				Call.contains(loc, aAccess, focusAccess)
			],
			`
				const a=0;
				const _=0;
				return _ms.contains(a,_)`)

		test('false', SpecialVal(loc, SV_False), 'false')
		test('null', SpecialVal(loc, SV_Null), 'null')
		test('this-module-directory', SpecialVal(loc, SV_ThisModuleDirectory), '__dirname')
		test('true', SpecialVal(loc, SV_True), 'true')
		test('undefined', SpecialVal(loc, SV_Undefined), 'void 0')
	})

	describe('Quote', () => {
		test(
			'"a"',
			Quote(loc, [ 'a' ]),
			'`a`')

		test(
			`
				"
					a
						b
					c`,
			Quote(loc, [ 'a\n\tb\nc' ]),
			'`a\\n\\tb\\nc`')

		test(
			'"a\\{\\n"',
			Quote(loc, [ 'a\{\n' ]),
			'`a\\{\\n`')

		test(
			'"a{0}b"',
			Quote(loc, [ 'a', zero, 'b' ]),
			'`a${_ms.show(0)}b`')

		test(
			'0"a{0}b"',
			QuoteTemplate(loc, zero, Quote(loc, [ 'a', zero, 'b' ])),
			'0`a${_ms.show(0)}b`')
	})
})

// TODO:
// BlockWrap
