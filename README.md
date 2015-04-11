# Mason

Mason (rhymes with 'JSON') is a subset of JavaScript with nifty syntax for declarative data.

[See the website!](http://andy-hanson.github.io/mason)

It is currently in progress.


## Build

	# See https://github.com/joyent/node/issues/14195
	nvm use 0.11.14

	cd esast
	npm install
	./gulp all

	cd ..
	npm install
	./gulp all


## Run

To test changes to the compiler:

	./gulp watch-js
	# In another console:
	./gulp test-compile # Compiles ms-test.ms

To test changes to Mason code:

	./gulp
	# In another console:
	./gulp run # Runs src/meta/run-all-tests.ms

And in the other console, `./gulp run` will run all tests.


## Edit

Go to `editor` and run `./gen-tmLanguage`.
Then put the resulting `Mason.tmLanguage` wherever is appropriate.

Sublime Text 3 users: `cp ./Mason.tmLanguage ~/.config/sublime-text-3/Packages/User/Mason.tmLanguage`


## Contribute

There's lots to work on, and nothing's frozen about the language.
Email <andy.pj.hanson@gmail.com>.
