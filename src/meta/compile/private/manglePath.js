import { existsSync } from 'fs'
import { dirname, resolve } from 'path'
import { assert } from './U/util'

export default function manglePath(path) {
	return path
	.replace(/!/g, '_bang_')
	.replace(/@/g, '_at_')
	.replace(/\?/g, '_q_')
	.replace(/\$/g, '_cash_')
}
