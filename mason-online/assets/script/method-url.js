
// TODO: Have this generated for me.
const allExports = {
	'<?': 'compare'
}
const exportPaths = {}
Object.keys(allExports).forEach(function(key) {
	const use = allExports[key]
	const relUrl = use.replace('.', '/')
	exportPaths[key] = 'https://github.com/andy-hanson/mason/tree/master/src/' + relUrl + '.ms'
})

export default methodName =>
	exportPaths[methodName]
