import CodeMirror from 'codemirror'
import $ from 'jquery'
import './codemirror-mason-mode'

export default (domElement, opts) => {
	const baseOpts = {
		autoClearEmptyLines: true,
		indentUnit: 4,
		indentWithTabs: true,
		lineNumbers: true,
		lineWrapping: true,
		mode: 'mason',
		theme: 'eclipse',
		// Entire CodeMirror is rendered. We expect small scripts.
		viewportMargin: Infinity
	}
	return CodeMirror(domElement, Object.assign(baseOpts, opts))
}

