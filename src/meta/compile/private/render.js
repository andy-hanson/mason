import r, { renderWithSourceMap } from 'esast/dist/render'

export default function render(cx, ast) {
	return cx.opts.sourceMap() ?
		renderWithSourceMap(ast, cx.opts.modulePath(), `./${cx.opts.jsBaseName()}`) :
		r(ast)
}
