export const
	assert = cond => {
		if (!cond)
			throw new Error('Assertion failed.')
	},

	cat = (...parts) => {
		const out = [ ]
		parts.forEach(_ => {
			if (_ instanceof Array)
				out.push(..._)
			else if (_ !== null)
				out.push(_)
		})
		return out
	},

	eachReverse = (array, action) => {
		for (let i = array.length - 1; i >= 0; i = i - 1)
			action(array[i])
	},

	flatMap = (mapped, mapper) => {
		const out = []
		mapped.forEach((_, i) => out.push(...mapper(_, i)))
		return out
	},

	// flatMap where opMapper returns optionals instead of arrays.
	flatOpMap = (arr, opMapper) => {
		const out = [ ]
		arr.forEach(em => opEach(opMapper(em), _ => out.push(_)))
		return out
	},

	head = arr => {
		assert(!isEmpty(arr))
		return arr[0]
	},

	ifElse = (op, ifSome, ifNone) =>
		op === null ? ifNone() : ifSome(op),

	implementMany = (holder, methodName, nameToImpl) =>
		Object.keys(nameToImpl).forEach(name =>
			holder[name].prototype[methodName] = nameToImpl[name]),

	isEmpty = arr => arr.length === 0,

	// -0 is negative
	isPositive = n => n >= 0 && 1 / n !== -Infinity,

	iteratorToArray = iter => {
		const out = []
		for (let em of iter)
			out.push(em)
		return out
	},

	last = arr => {
		assert(!isEmpty(arr))
		return arr[arr.length - 1]
	},

	// TODO:ES6 map.keys()
	mapKeys = map => {
		const res = [ ]
		map.forEach((value, key) => res.push(key))
		return res
	},

	// TODO:ES6 Just use `new Set`
	newSet = function() {
		const set = new Set()
		for (let i = 0; i < arguments.length; i = i + 1)
			arguments[i].forEach(_ => set.add(_))
		return set
	},

	opEach = (op, mapper) =>
		op === null ? null : mapper(op),

	opIf = (cond, makeOp) =>
		cond ? makeOp() : null,

	opMap = opEach,

	push = (mutArr, em) => {
		mutArr.push(em)
		return mutArr
	},

	repeat = (em, n) => {
		assert(n >= 0)
		const out = []
		for (let i = n; i > 0; i = i - 1)
			out.push(em)
		return out
	},

	rtail = arr => {
		assert(!isEmpty(arr))
		return arr.slice(0, arr.length - 1)
	},

	tail = arr => {
		assert(!isEmpty(arr))
		return arr.slice(1)
	},

	type = (instance, itsType) => {
		if (!(Object(instance) instanceof itsType))
			throw new Error(`${instance} is not a ${itsType.name}`)
	},

	unshift = (em, mutArr) => {
		mutArr.unshift(em)
		return mutArr
	}
