import $ from 'jquery'
import require from 'require'
import { setContent } from '../U/dom'
import { $done } from '../U/Promise'
import $compile from './$compile'
import $eval from './$eval'
import { msCodeMirror, jsCodeMirror } from './make-codemirror'

const template =
	document.getElementById('link-mason-editor').import.querySelector('template')

const MasonEditorPrototype = Object.assign(Object.create(HTMLElement.prototype), {
	createdCallback() {
		this.initialCode = this.textContent.trim()
		$(this).empty()
		this.appendChild(document.importNode(template.content, true))

		const get = id => this.querySelector(`#${id}`)
		const ms = get('ms'), js = get('js')
		this.ms = msCodeMirror(ms)
		this.js = jsCodeMirror(js)
		this.statusIcon = get('statusIcon')
		this.out = get('out')

		// Only expand JS when hovering. CSS animations for this in mason-editor.styl.
		$(js).hover(
			// hover in:
			() => { js.style['max-height'] = `${js.querySelector('.CodeMirror').offsetHeight}px` },
			// hover out:
			() => { js.style['max-height'] = '0.5em' })

		this.setStatus('writing')
		this.ms.on('changes', () => { this.setStatus('writing') })
		this.statusIcon.onclick = () => this.compile()
		this.ms.setValue(this.initialCode)
		this.style.visibility = 'visible'
		this.compile()
	},

	compile() {
		const msCode = this.ms.getValue()
		$done($compile(msCode).then(({ success, result }) => {
			if (success) {
				this.js.setValue(result)
				this.evaluate(result)
			}
			else
				this.showError(result)
		}))
	},

	evaluate(js) {
		$done($eval(require, js).then(val => {
			this.out.textContent = _ms.show(val)
			this.setStatus('compiled')
		}).catch(err => this.showError(err)))
	},

	showError(errorDomNode) {
		this.js.setValue('')
		this.setStatus('error')
		setContent(this.out, errorDomNode)
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
