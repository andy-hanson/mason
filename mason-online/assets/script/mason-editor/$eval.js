export default (require, js) => {
	const fun = Function('define', js)
	return new Promise((resolve, reject) => {
		const def = (required, doDefine) => {
			const e = required.shift()
			if (e !== 'exports')
				throw new Error('Not a Mason module!')
			// TODO:ES6 (...modules) =>
			require(required, function() {
				try {
					const modules = Array.prototype.slice.call(arguments)
					const exports = { }
					modules.unshift(exports)
					doDefine(...modules)
					// TODO: Make public API for this sort of thing.
					const module = _ms.getModule(exports)
					// TODO: compile option to not include module name
					delete module.displayName
					const keys = Object.keys(module)
					if (keys.length === 1 && keys[0] === 'default')
						resolve(module.default)
					else
						resolve(module)
				} catch (err) {
					reject(err)
				}
			}, reject)
		}
		return fun(def)
	})
}
