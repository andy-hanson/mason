use
	.$ -> $after
	.js -> global
	.Str

$time.
	doc. "TODO"
	|:$ name:Str $time-me:$
		start-timer! name
		$after $time-me |_
			end-timer! name
			_

start-timer!. |name
	global.console.time name

end-timer!. |name
	global.console.timeEnd name
