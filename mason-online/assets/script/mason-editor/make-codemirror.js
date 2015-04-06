import CodeMirror from '../../lib/codemirror/lib/codemirror'
import './codemirror-mason-mode'
// TODO: RequireJS paths should let us just use 'codemirror/mode/javascript/javascript.js'
import '../../lib/codemirror/mode/javascript/javascript.js'

const commonOpts = {
	autoClearEmptyLines: true,
	indentWithTabs: true,
	lineNumbers: true,
	lineWrapping: true,
	// Entire CodeMirror is rendered. We expect small scripts.
	viewportMargin: Infinity
}

const special = (specialOpts) => (domElement, opts) =>
	CodeMirror(domElement, Object.assign({}, commonOpts, specialOpts, opts))

export const msCodeMirror = special({ mode: 'mason', theme: 'monokai' })

export const jsCodeMirror = special({
	mode: 'javascript',
	theme: 'base16-light',
	// Kludge because a scrollbar showed up even with nowhere to scroll.
	scrollbarStyle: null
})
