
// TODO: Have this generated for me.
const allExports = {
	'!': '!',
	'@': '@/@',
	$: '$',
	'<?': 'compare',
	'?': '@/?',
	Bool: 'Bool',
	'contains?': 'Type/Type',
	curry: 'Fun',
	Error: 'Try',
	'each~': 'Generator!',
	'?find': '@/@',
	Fun: 'Fun',
	'Generator!': 'Generator!',
	Map: '@/Map/Map',
	Obj: 'Obj',
	show: 'show',
	sub: 'methods',
	Str: 'Str',
	Type: 'Type/Type'
}
const exportPaths = {}
Object.keys(allExports).forEach(function(key) {
	const use = allExports[key]
	const relUrl = use.replace('.', '/')
	exportPaths[key] = 'https://github.com/andy-hanson/mason/tree/master/src/' + relUrl + '.ms'
})

export default methodName =>
	exportPaths[methodName]
