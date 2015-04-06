import $ from 'jquery'
import makeCodeMirror from './make-codemirror'

const masonEditorImport = document.getElementById('link-mason-editor').import
const template = masonEditorImport.getElementById('mason-editor-template')

const MasonEditorPrototype = Object.create(HTMLElement.prototype)
Object.assign(MasonEditorPrototype, {
	createdCallback() {
		const content = document.importNode(template.content, true)
		const shadow = this.createShadowRoot()
		// `ms` must be gotten *before* shadow.appendChild is called.
		// makeCodeMirror must be called *after*.
		const ms = content.getElementById('ms')
		shadow.appendChild(content)
		makeCodeMirror(ms, {
			autofocus: true
		})
	}
})

export const MasonEditor = document.registerElement('mason-editor', {
	prototype: MasonEditorPrototype
})
