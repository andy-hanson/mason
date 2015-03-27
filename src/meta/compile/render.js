import { generate } from 'escodegen'

export default function render(ast, opts) {
	return generate(ast, {
		format: {
			indent: { style: '\t' },
			semicolons: false
		},
		sourceMap: opts.modulePath(),
		file: './' + opts.jsBaseName(),
		// TODO: Make an option
		sourceMapRoot: undefined,
		sourceMapWithCode: true,
		// TODO: Make an option
		sourceContent: false
	})
}
