import r, { renderWithSourceMap } from 'esast/dist/render'

export default function render(cx, ast) {
	return cx.opts.includeSourceMap() ?
		renderWithSourceMap(ast, cx.opts.modulePath(), `./${cx.opts.jsBaseName()}`) :
		r(ast)
}
