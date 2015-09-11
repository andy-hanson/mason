use
	global JSON
	..@.Set.Id-Set
	..js js-typeof
	..Object @p @p-all
	..String indent
	..to-string inspect
	..Type.Method impl!
	..Type.Type =>

impl! inspect Object
	test. |
		[(a. 1 b. 2)] -> "
			Object
				a. 1
				b. 2
		# TODO: test non-enumerable properties
	.|
		switch .toString
			Object.prototype.toString
				props = @p-all this
				enumerable-props = => Id-Set (@p this)
				s ::= "{.constructor.name}"
				for! props
					s := "{s}\n\t{inspect-property this _ :enumerable-props}"
				s
			else
				.toString()

inspect-property = |obj key enumerable?
	desc = Object.getOwnPropertyDescriptor obj key

	prop-name = cond enumerable? key "[{key}]"

	str = case
		and desc.get desc.set
			"[Getter/Setter]"
		desc.get
			"[Getter]"
		desc.set
			"[Setter]"
		else
			str = inspect desc.value
			cond "\n":str "\n{indent str}" str

	"{prop-name}. {str}"


inspect-primitive = .|
	switch js-typeof this
		"object"
			"[{.constructor.name} {this}]"
		else
			"{this}"

impl! inspect Boolean inspect-primitive
impl! inspect Number inspect-primitive

impl! inspect String .|
	switch js-typeof this
		"object"
			"[String {inspect .valueOf()}]"
		else
			JSON.stringify this

impl! inspect Symbol .|
	switch js-typeof this
		"object"
			"[Symbol {inspect .valueOf()}]"
		else
			.toString()
