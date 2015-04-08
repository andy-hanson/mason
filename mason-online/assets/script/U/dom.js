export const empty = node => {
	while (node.firstChild)
		node.removeChild(node.firstChild)
}

export const setContent = (node, content) => {
	empty(node)
	if (content instanceof Node)
		node.appendChild(content)
	else
		node.textContent = content
}

export const replaceNode = (oldNode, newNode) =>
	oldNode.parentNode.replaceChild(newNode, oldNode)
