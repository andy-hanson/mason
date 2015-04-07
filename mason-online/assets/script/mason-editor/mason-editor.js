import $ from 'jquery'
import compile from 'mason/meta/compile/compile'
import compileErrorToDomSpan from 'mason/meta/compile/browser-only/compileErrorToDomSpan'
import require from 'require'
import CompileError from 'mason/meta/compile/CompileError'
import BootOrder from 'mason/private/boot-order'
_ms.getModule(BootOrder)
import { setContent } from '../U/dom'
import { $done } from '../U/Promise'
import $eval from './$eval'
import { msCodeMirror, jsCodeMirror } from './make-codemirror'

const masonEditorImport = document.getElementById('link-mason-editor').import
const template = masonEditorImport.getElementById('mason-editor-template')

const sampleMs = `use
	mason.math.methods * -
	mason.compare <?
factorial = |case
	<? _ 2
		1
	else
		* _ (factorial (- _ 1
factorial 4`

const MasonEditorPrototype = Object.create(HTMLElement.prototype)
Object.assign(MasonEditorPrototype, {
	createdCallback() {
		const shadow = this.createShadowRoot()
		shadow.appendChild(document.importNode(template.content, true))

		const ms = shadow.getElementById('ms')
		const js = shadow.getElementById('js')
		this.statusIcon = shadow.getElementById('statusIcon')
		this.out = shadow.getElementById('out')

		this.ms = msCodeMirror(ms)
		this.js = jsCodeMirror(js, { readOnly: true })

		this.setStatus('writing')
		this.ms.on('changes', () => { this.setStatus('writing') })

		this.statusIcon.onclick = () => this.compile()

		this.ms.setValue(sampleMs)
		this.compile()
	},

	compile() {
		const msCode = this.ms.getValue()
		// TODO: use warnings
		try {
			const { result } = compile(msCode, {
				includeAmdefine: false,
				includeSourceMap: false,
				includeModuleDisplayName: false
			})
			if (result instanceof Error) {
				this.js.setValue('')
				this.showError(result)
			} else {
				this.js.setValue(result)
				this.evaluate(result)
			}
		} catch (err) {
			console.log(err.stack)
			throw err
		}
	},

	evaluate(js) {
		$done($eval(require, js).then(val => {
			this.out.textContent = _ms.show(val)
			this.setStatus('compiled')
		}).catch(err => this.showError(err)))
	},

	showError(err) {
		this.setStatus('error')
		setContent(this.out,
			err instanceof CompileError ? compileErrorToDomSpan(err) : err.stack)
	},

	setStatus(status) {
		this.status = status
		const className = () => {
			switch (status) {
				case 'compiled': return 'fa fa-check'
				case 'writing': return 'fa fa-circle-o-notch'
				case 'error': return 'fa fa-exclamation'
				default: throw new Error(status)
			}
		}
		this.statusIcon.className = className()
	}
})

export const MasonEditor = document.registerElement('mason-editor', {
	prototype: MasonEditorPrototype
})
