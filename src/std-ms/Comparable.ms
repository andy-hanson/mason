use
	.Bool -> and false nor true
	.Interface
	.js -> identical?
	.Method
	.Object
	.Type -> subsumes?

compare. Method
	doc. "A Num < 0 if a < b, > 0 if a > b, and = 0 if a = b."

\ TODO: Major cleanup

\ TODO: Make public somewhere
same-type? = |a b
	identical? (Object.getPrototypeOf a) (Object.getPrototypeOf b)

same-members? = |a b
	ak = Object.getOwnPropertyNames a
	bk = Object.getOwnPropertyNames b
	x = arr-=? ak bk
	`if (!x) return false`
	eq = =?
	`for (let i = 0; i < ak.length; i++) { const key = ak[i]; if (!eq(a[ak], b[ak])) return false }`
	true

arr-=? = |a b
	la = a.length
	lb = b.length
	`if (la !== lb) return false`
	eq = =?
	`for (let i = 0; i < la; i++) if (!eq(a[i], b[i])) return false`
	true

\ TODO: Better name
inspect-=? = |:Bool a b
	obj-a = subsumes? Object a
	obj-b = subsumes? Object b
	case
		and obj-a obj-b
			and (same-type? a b) ~(same-members? a b)
		nor obj-a obj-b
			identical? a b
		else
			false

=?. Method
	doc. "TODO"
	default. inspect-=?
<?. Method
	doc. "TODO"
	default. |a b
		<? 0 (compare a b)
<=?. Method
	doc. "TODO"
	default. |a b
		<=? 0 (compare a b)
>?. Method
	doc. "TODO"
	default. |a b
		>? 0 (compare a b)
>=?. Method
	doc. "TODO"
	default. |a b
		>=? 0 (compare a b)

Comparable. Interface
	doc. "TODO"
	methods.
		. =?
		. <?
		. <=?
		. >?
		. >=?
