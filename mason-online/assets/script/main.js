import $ from 'jquery'
import makeCodeBox from './code/make-code-box'

$(() => {
	makeCodeBox($('#code').get(0), {
		autofocus: true
	})
})
