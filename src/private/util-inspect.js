
const inspect = (obj, opts) => {
	// default options
	let ctx = {
		seen: [],
		stylize: stylizeNoColor
	}
	if (opts)
		Object.assign(ctx, opts)
	// set default options
	if (ctx.showHidden === undefined) ctx.showHidden = false
	if (ctx.depth === undefined) ctx.depth = 2
	if (ctx.colors === undefined) ctx.colors = false
	if (ctx.customInspect === undefined) ctx.customInspect = true
	if (ctx.colors) ctx.stylize = stylizeWithColor
	return formatValue(ctx, obj, ctx.depth)
}
export default inspect

Object.assign(inspect, {
	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	colors: {
		bold : [ 1, 22 ],
		italic : [ 3, 23 ],
		underline: [ 4, 24 ],
		inverse: [ 7, 27 ],
		white: [ 37, 39 ],
		grey: [ 90, 39 ],
		black: [ 30, 39 ],
		blue: [ 34, 39 ],
		cyan: [ 36, 39 ],
		green: [ 32, 39 ],
		magenta: [ 35, 39 ],
		red: [ 31, 39 ],
		yellow: [ 33, 39 ]
	},

	// Don't use 'blue' not visible on cmd.exe
	styles: {
		special: 'cyan',
		number: 'yellow',
		boolean: 'yellow',
		undefined: 'grey',
		null: 'bold',
		string: 'green',
		symbol: 'green',
		date: 'magenta',
		// "name": intentionally not styling
		regexp: 'red'
	}
})

const
	stylizeWithColor = (str, styleType) => {
		let style = inspect.styles[styleType]

		if (style)
			return '\u001b[' + inspect.colors[style][0] + 'm' + str +
				 '\u001b[' + inspect.colors[style][1] + 'm'
		else
			return str
	},

	stylizeNoColor = str => str,

	//What is this for?
	arrayToHash = array => {
		let hash = {}

		for (let val of array) {
			hash[val] = true
		}

		return hash
	},

	getConstructorOf = obj => {
		while (obj) {
			let descriptor = Object.getOwnPropertyDescriptor(obj, 'constructor')
			if (descriptor !== undefined &&
					typeof descriptor.value === 'function' &&
					descriptor.value.name !== '')
				return descriptor.value

			obj = Object.getPrototypeOf(obj)
		}

		return null
	},

	inspectPromise = () => {
		//TODO: this was using Debug...
		return null
	}


const formatValue = (ctx, value, recurseTimes) => {
	// Provide a hook for user-specified inspect functions.
	// Check that value is an object with an inspect function on it
	if (ctx.customInspect &&
			value &&
			typeof value.inspect === 'function' &&
			// Filter out the util module, it's inspect function is special
			value.inspect !== inspect &&
			// Also filter out any prototype objects using the circular check.
			!(value.constructor && value.constructor.prototype === value)) {
		let ret = value.inspect(recurseTimes, ctx)
		if (typeof ret !== 'string')
			ret = formatValue(ctx, ret, recurseTimes)
		return ret
	}

	// Primitive types cannot have properties
	let primitive = formatPrimitive(ctx, value)
	if (primitive)
		return primitive

	// Look up the keys of the object.
	let keys = Object.keys(value)
	let visibleKeys = arrayToHash(keys)

	if (ctx.showHidden) {
		keys = Object.getOwnPropertyNames(value)
		keys = keys.concat(Object.getOwnPropertySymbols(value))
	}

	// This could be a boxed primitive (new String(), etc.), check valueOf()
	// NOTE: Avoid calling `valueOf` on `Date` instance because it will return
	// a number which, when object has some additional user-stored `keys`,
	// will be printed out.
	let formatted
	let raw = value
	try {
		// the .valueOf() call can fail for a multitude of reasons
		if (!isDate(value))
			raw = value.valueOf()
	} catch (e) {
		// ignore...
	}

	if (typeof raw === 'string')
		// for boxed Strings, we have to remove the 0-n indexed entries,
		// since they just noisey up the output and are redundant
		keys = keys.filter(key =>
			!(key >= 0 && key < raw.length))

	// Some type of object without properties can be shortcutted.
	if (keys.length === 0) {
		if (typeof value === 'function') {
			let name = value.name ? ': ' + value.name : ''
			return ctx.stylize('[Function' + name + ']', 'special')
		}
		if (isRegExp(value))
			return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp')
		if (isDate(value))
			return ctx.stylize(Date.prototype.toString.call(value), 'date')
		if (isError(value))
			return formatError(value)
		// now check the `raw` value to handle boxed primitives
		if (typeof raw === 'string') {
			formatted = formatPrimitiveNoColor(ctx, raw)
			return ctx.stylize('[String: ' + formatted + ']', 'string')
		}
		if (typeof raw === 'number') {
			formatted = formatPrimitiveNoColor(ctx, raw)
			return ctx.stylize('[Number: ' + formatted + ']', 'number')
		}
		if (typeof raw === 'boolean') {
			formatted = formatPrimitiveNoColor(ctx, raw)
			return ctx.stylize('[Boolean: ' + formatted + ']', 'boolean')
		}
	}

	let constructor = getConstructorOf(value)
	let base = '', empty = false, braces, formatter

	if (Array.isArray(value)) {
		if (constructor === Array)
			constructor = null
		braces = ['[', ']']
		empty = value.length === 0
		formatter = formatArray
	} else if (value instanceof Set) {
		braces = ['{', '}']
		// With `showHidden`, `length` will display as a hidden property for
		// arrays. For consistency's sake, do the same for `size`, even though this
		// property isn't selected by Object.getOwnPropertyNames().
		if (ctx.showHidden)
			keys.unshift('size')
		empty = value.size === 0
		formatter = formatSet
	} else if (value instanceof Map) {
		braces = ['{', '}']
		// Ditto.
		if (ctx.showHidden)
			keys.unshift('size')
		empty = value.size === 0
		formatter = formatMap
	} else {
		// Only create a mirror if the object superficially looks like a Promise.
		let promiseInternals = value instanceof Promise && inspectPromise(value)
		if (promiseInternals) {
			braces = ['{', '}']
			formatter = formatPromise
		} else {
			if (constructor === Object)
				constructor = null
			braces = ['{', '}']
			empty = true  // No other data than keys.
			formatter = formatObject
		}
	}

	empty = empty === true && keys.length === 0

	// Make functions say that they are functions
	if (typeof value === 'function') {
		let n = value.name ? ': ' + value.name : ''
		base = ' [Function' + n + ']'
	}

	// Make RegExps say that they are RegExps
	if (isRegExp(value))
		base = ' ' + RegExp.prototype.toString.call(value)

	//TODO: else if
	// Make dates with properties first say the date
	if (isDate(value))
		base = ' ' + Date.prototype.toUTCString.call(value)

	// Make error with message first say the error
	if (isError(value))
		base = ' ' + formatError(value)

	// Make boxed primitive Strings look like such
	if (typeof raw === 'string') {
		formatted = formatPrimitiveNoColor(ctx, raw)
		base = ' ' + '[String: ' + formatted + ']'
	}

	// Make boxed primitive Numbers look like such
	if (typeof raw === 'number') {
		formatted = formatPrimitiveNoColor(ctx, raw)
		base = ' ' + '[Number: ' + formatted + ']'
	}

	// Make boxed primitive Booleans look like such
	if (typeof raw === 'boolean') {
		formatted = formatPrimitiveNoColor(ctx, raw)
		base = ' ' + '[Boolean: ' + formatted + ']'
	}

	// Add constructor name if available
	if (base === '' && constructor)
		braces[0] = constructor.name + ' ' + braces[0]

	if (empty === true)
		return braces[0] + base + braces[1]

	if (recurseTimes < 0)
		return isRegExp(value) ?
			ctx.stylize(RegExp.prototype.toString.call(value), 'regexp') :
			ctx.stylize('[Object]', 'special')

	ctx.seen.push(value)

	let output = formatter(ctx, value, recurseTimes, visibleKeys, keys)

	ctx.seen.pop()

	return reduceToSingleString(output, base, braces)
}

const formatPrimitive = (ctx, value) => {
	if (value === undefined)
		return ctx.stylize('undefined', 'undefined')

	// For some reason typeof null is "object", so special case here.
	if (value === null)
		return ctx.stylize('null', 'null')

	let type = typeof value

	if (type === 'string') {
		let simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
				.replace(/'/g, '\\\'')
				.replace(/\\"/g, '"') + '\''
		return ctx.stylize(simple, 'string')
	}
	if (type === 'number') {
		// Format -0 as '-0'. Strict equality won't distinguish 0 from -0,
		// so instead we use the fact that 1 / -0 < 0 whereas 1 / 0 > 0 .
		if (value === 0 && 1 / value < 0)
			return ctx.stylize('-0', 'number')
		return ctx.stylize('' + value, 'number')
	}
	if (type === 'boolean')
		return ctx.stylize('' + value, 'boolean')
	// es6 symbol primitive
	if (type === 'symbol')
		return ctx.stylize(value.toString(), 'symbol')
}


const
	formatPrimitiveNoColor = (ctx, value) => {
		let stylize = ctx.stylize
		ctx.stylize = stylizeNoColor
		let str = formatPrimitive(ctx, value)
		ctx.stylize = stylize
		return str
	},

	formatError = value =>
		'[' + Error.prototype.toString.call(value) + ']',

	formatObject = (ctx, value, recurseTimes, visibleKeys, keys) =>
		keys.map(key => formatProperty(ctx, value, recurseTimes, visibleKeys, key, false)),

	formatArray = (ctx, value, recurseTimes, visibleKeys, keys) => {
		let output = []
		for (let i = 0, l = value.length; i < l; i = i + 1)
			if (hasOwnProperty(value, String(i)))
				output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
						String(i), true))
			else
				output.push('')
		for (let key of keys) {
			if (typeof key === 'symbol' || !key.match(/^\d+$/))
				output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
						key, true))
		}
		return output
	},

	formatSet = (ctx, value, recurseTimes, visibleKeys, keys) => {
		let output = []
		for (let v of value) {
			let nextRecurseTimes = recurseTimes === null ? null : recurseTimes - 1
			let str = formatalue(ctx, v, nextRecurseTimes)
			output.push(str)
		}
		for (let key of keys)
			output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
																 key, false))
		return output
	},

	formatMap = (ctx, value, recurseTimes, visibleKeys, keys) => {
		let output = []
		value.forEach((v, k) => {
			let nextRecurseTimes = recurseTimes === null ? null : recurseTimes - 1
			let str = formatValue(ctx, k, nextRecurseTimes)
			str = str + ' => '
			str = str + formatValue(ctx, v, nextRecurseTimes)
			output.push(str)
		})
		for (let key of keys) {
			output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
																 key, false))
		}
		return output
	},

	formatPromise = (ctx, value, recurseTimes, visibleKeys, keys) => {
		let output = []
		let internals = inspectPromise(value)
		if (internals.status === 'pending')
			output.push('<pending>')
		else {
			let nextRecurseTimes = recurseTimes === null ? null : recurseTimes - 1
			let str = formatValue(ctx, internals.value, nextRecurseTimes)
			if (internals.status === 'rejected')
				output.push('<rejected> ' + str)
			else
				output.push(str)
		}
		for (let key of keys) {
			output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
																 key, false))
		}
		return output
	},

	formatProperty = (ctx, value, recurseTimes, visibleKeys, key, array) => {
		let name, str, desc
		desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] }
		if (desc.get)
			str = desc.set ?
				ctx.stylize('[Getter/Setter]', 'special') :
				ctx.stylize('[Getter]', 'special')
		else if (desc.set)
			str = ctx.stylize('[Setter]', 'special')

		if (!hasOwnProperty(visibleKeys, key))
			name = typeof key === 'symbol' ?
				'[' + ctx.stylize(key.toString(), 'symbol') + ']' :
				'[' + key + ']'
		if (!str) {
			if (ctx.seen.indexOf(desc.value) < 0) {
				str = recurseTimes === null ?
					formatValue(ctx, desc.value, null) :
					formatValue(ctx, desc.value, recurseTimes - 1)
				if (str.indexOf('\n') > -1) {
					str = '\n' + str.split('\n').map(line => '   ' + line).join('\n')
					if (array)
						str = str.substr(2)
				}
			} else
				str = ctx.stylize('[Circular]', 'special')
		}
		if (name === undefined) {
			if (array && key.match(/^\d+$/))
				return str
			name = JSON.stringify('' + key)
			if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
				name = name.substr(1, name.length - 2)
				name = ctx.stylize(name, 'name')
			} else {
				name = name.replace(/'/g, '\\\'')
									 .replace(/\\"/g, '"')
									 .replace(/(^"|"$)/g, '\'')
									 .replace(/\\\\/g, '\\')
				name = ctx.stylize(name, 'string')
			}
		}

		return name + ': ' + str
	},

	reduceToSingleString = (output, base, braces) => {
		let length = output.reduce(
			(prev, cur) =>prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1,
			0)

		if (length > 60)
			return braces[0] +
						 // If the opening "brace" is too large, like in the case of "Set {",
						 // we need to force the first item to be on the next line or the
						 // items will not line up correctly.
						 (base === '' && braces[0].length === 1 ? '' : base + '\n ') +
						 ' ' +
						 output.join(',\n  ') +
						 ' ' +
						 braces[1]

		return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1]
	}

const
	isRegExp = re => objectToString(re) === '[object RegExp]',
	isDate = d => objectToString(d) === '[object Date]',
	isError = e => objectToString(e) === '[object Error]' || e instanceof Error,
	objectToString = o => Object.prototype.toString.call(o),
	hasOwnProperty = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
