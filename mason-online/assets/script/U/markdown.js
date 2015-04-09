import marked from 'marked'
import { empty } from './dom'

export const setMarkdownContent = (node, md) => {
	node.innerHTML = marked(md)
	joinParagraphs(node)
}

const
	split = (list, isTypeB, yieldA, yieldB) => {
		let last = 0
		let typeA = true
		for (let i = 0; i < list.length; i = i + 1) {
			const _ = list[i]
			const thisB = isTypeB(_)
			if (thisB && typeA) {
				// First type B. Yield preceding typeAs.
				yieldA(Array.prototype.slice.call(list, last, i))
				last = i
				typeA = false
			} else if (!thisB && !typeA) {
				// First type A.
				yieldB(Array.prototype.slice.call(list, last, i))
				last = i
				typeA = true
			}
		}
		(typeA ? yieldA : yieldB)(Array.prototype.slice.call(list, last, list.length))
	},

	makeSection = nodes => {
		const _ = document.createElement('section')
		nodes.forEach(node => _.appendChild(node))
		return _
	},

	joinParagraphs = node => {
		const isP = node =>
			node.nodeType !== 3 && node.tagName.toLowerCase() === 'p'

		const goodChildren = Array.prototype.filter.call(node.childNodes, node =>
			// Don't include whitespace-only text nodes.
			node.nodeType !== 3 || /\S/.test(node.textContent))

		const newNodes = []
		split(goodChildren, isP,
			nonPNodes => newNodes.push(...nonPNodes),
			pNodes => newNodes.push(makeSection(pNodes)))
		empty(node)
		newNodes.forEach(_ => node.appendChild(_))
	}
