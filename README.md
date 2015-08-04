# Mason

Mason (rhymes with 'JSON') is a subset of JavaScript with nifty syntax for declarative data.

[See the website!](http://andy-hanson.github.io/mason)

It is currently in progress.


## Build

	# Currently only works in io.js
	nvm use iojs
	npm install
	./gulp compile-all
	./gulp list-modules
	./gulp run


## Run

To test changes to the compiler:

	./gulp watch-js
	# In another console:
	./gulp test-compile # Compiles ms-test.ms

To test changes to Mason code:

	./gulp watch
	# In another console:
	./gulp run # Runs src/meta/run-all-tests.ms


## Edit

Go to `editor` and run `./gen-tmLanguage`.
Then put the resulting `Mason.tmLanguage` wherever is appropriate.

Sublime Text 3 users: `cp ./Mason.tmLanguage ~/.config/sublime-text-3/Packages/User/Mason.tmLanguage`


## Contribute

There's lots to work on, and nothing's frozen about the language.
Email <andy.pj.hanson@gmail.com>.
