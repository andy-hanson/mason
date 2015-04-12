import renderAst from 'esast/dist/render'

export default function render(cx, ast) {
	return renderAst(ast, cx.opts.modulePath(),
		cx.opts.sourceMap() ? `./${cx.opts.jsBaseName()}` : undefined)
}
