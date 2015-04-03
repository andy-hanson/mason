import { existsSync } from 'fs'
import { dirname, resolve } from 'path'
import { assert } from './U'

export default function mangle(path) {
	return path
	.replace(/!/g, '_bang_')
	.replace(/@/g, '_at_')
	.replace(/\?/g, '_q_')
	.replace(/\$/g, '_cash_')
}

export function fixupPath(path, tx) {
	// KLUDGE: requirejs uses 'main' instead of 'index', so explicitly ask for 'index'
	if (path.startsWith('.') && existsSync(resolve(dirname(tx.opts().modulePath()), path)))
		path = path + '/index'
	return manglePath(path)
}

export const manglePath = mangle
