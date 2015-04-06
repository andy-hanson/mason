import $ from 'jquery'

export const setContent = (node, content) => {
	$(node).empty()
	if (content instanceof Node)
		node.appendChild(content)
	else
		node.textContent = content
}
