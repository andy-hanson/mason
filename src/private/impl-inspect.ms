import
	global JSON
	..@.Set.Id-Set
	..js js-typeof
	..Object @properties @all-properties
	..String indent
	..to-string inspect
	..Type.Method impl!
	..Type.Type =>

impl! inspect Object .|
	switch .toString
		Object.prototype.toString
			@props = @all-properties this
			enumerable-props = => Id-Set (@properties this)
			s = "#(.constructor.name)"
			for @props
				s := "#s\n\t#(indent (inspect-property this _ :enumerable-props))"
			s
		else
			.toString()

inspect-property = |obj key enumerable?
	desc = Object.getOwnPropertyDescriptor obj key

	prop-name = cond enumerable? key "[#key]"

	str = case
		and desc.get desc.set
			"[Getter/Setter]"
		desc.get
			"[Getter]"
		desc.set
			"[Setter]"
		else
			inspect desc.value

	"#prop-name. #str"

inspect-primitive = .|
	todo use :Object instead of typeof
	switch js-typeof this
		'object
			"[#(.constructor.name) #this]"
		else
			String this

impl! inspect Boolean inspect-primitive
impl! inspect Number inspect-primitive

impl! inspect String .|
	str = JSON.stringify this
	todo :String vs :string
	switch js-typeof this
		'object
			"[String #str]"
		else
			str

impl! inspect Symbol .|
	switch js-typeof this
		'object
			"[Symbol #(inspect .valueOf())]"
		else
			.toString()
