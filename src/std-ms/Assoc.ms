doc. "TODO"

use
	.? -> un-?
	.Bool -> not
	.error -> oh-no!
	.Interface
	.Method
	.pred-types -> Any
	.Seq -> empty?

get. Method
	doc. |:Any _ key:Any
		"Value corresponding to `key`. Fails if not `has-key? _ key`."
	default. |assoc key:Any
		case ?get assoc key
			empty?_
				oh-no! "{assoc} does not contain {key}."
			else
				_.val

?get. Method
	doc. |:? _ key:Any
		"?some of the value corresponding to `key`, or ?none if not `has-key? _ key`."

has-key?. Method
	doc. |:Bool _ key:Any
		"Whether the key is in the Assoc."
	default. |assoc key:Any
		not (empty? (?get assoc key))

keys. Method
	doc. |:Seq _
		"Seq of every key that the Assoc `has-key?`."

keys-values. Method
	doc. |:Seq[Any]
		"Every \{ key, val }."
	default. |assoc
		(keys assoc).map |_
			key. _
			val. get assoc _

Assoc. Interface
	doc. "Mapping from keys to values."
	methods.
		. get
		. ?get
		. has-key?
		. keys
		. keys-values
