import assert from 'assert'
import { existsSync } from 'fs'
import { dirname, resolve } from 'path'

export default function mangle(path) {
	return path.replace(/!/g, '_bang_').replace(/@/g, '_at_')
}

export function fixupPath(path, tx) {
	// KLUDGE: requirejs uses 'main' instead of 'index', so explicitly ask for 'index'
	if (path.startsWith('.') && existsSync(resolve(dirname(tx.opts.modulePath()), path)))
		path = path + '/index'
	return manglePath(path)
}

export const manglePath = mangle