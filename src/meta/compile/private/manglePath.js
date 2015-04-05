export default path =>
	path.replace(/!/g, '_bang_')
	.replace(/@/g, '_at_')
	.replace(/\?/g, '_q_')
	.replace(/\$/g, '_cash_')

