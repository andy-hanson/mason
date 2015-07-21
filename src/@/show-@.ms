use
	..compare <?
	..Object flag?
	..show
	..String indent
	..Type.Type => type-of
	..Type.Method impl! impl-for
	.@ _ count empty?
	.Seq.Seq take'
use-debug
	.@-Type empty
	.Seq.Deque

impl! show @
	test. |
		d = => Deque [ 1 2 3 ]
		[ d ] -> "
			\n\t. 1
				. 2
				. 3
		# TODO:SYNTAX [ d repr. ]
		[ d (repr. true) ] -> "
			=> Deque
				. 1
				. 2
				. 3
		[ (empty Deque) ] -> "[ ]"
		[ (empty Deque) (repr. true) ] -> "empty Deque"

	.|opts
		content = case
			empty? this
				"[ ]"
			else
				# TODO: map (eager)
				ems = @for this
					indent (show _ opts)
				show-ems end = case
					<? 100 (count this)
						show-ems. take' ems 100
						end. "\n\t..."
					else
						show-ems. ems
						end. ""
				"\n\t. {=> String show-ems "\n\t. "}{end}"
		case
			flag? opts "repr"
				case
					empty? this
						"empty {type-of this}"
					else
						"=> {type-of this}{content}"
			else
				content

# TODO:KLUDGE Explicit impl!s for Array so that it doesn't act like a Map
impl! show Array (impl-for show @)
