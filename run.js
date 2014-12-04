"use strict"
require("child_process").exec("node --stack-trace-limit=100 --harmony src/build", function(error, stdout, stderr) {
	if (error != null)
		throw error
	if (stderr)
		console.log(stderr)
	else {
		console.log(stdout)
		require("./js/test")
	}
})
