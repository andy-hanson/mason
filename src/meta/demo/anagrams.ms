use
	...@.@ count keep map
	...@.@-Type empty
	...@.Map.Map values
	...@.Map.Id-Map
	...@.Map.multi-map add-to-@!
	...compare =? max sort
use-debug
	...@.Seq.Seq seq=?
	...RegExp rgx

maximum-anagram-sets.
	doc. "http://rosettacode.org/wiki/Anagrams#JavaScript"
	test. !|
		w = "
			abel able bale bela elba
			alger glare lager large regal
			angel angle galen glean lange
			caret carte cater crate trace
			elan lane lean lena neal
			evil levi live veil vile
			random words to prove it's doing work
		words = w.split rgx"\s"
		assert! seq=? (maximum-anagram-sets words)
			. [ "abel" "able" "bale" "bela" "elba"
			. [ "alger" "glare" "lager" "large" "regal"
			. [ "angel" "angle" "galen" "glean" "lange"
			. [ "caret" "carte" "cater" "crate" "trace"
			. [ "elan" "lane" "lean" "lena" "neal"
			. [ "evil" "levi" "live" "veil" "vile"
	|words
		# e.g., "amnos" -> [ "mason" "monas" ]
		sorted->words = empty Id-Map
		for! words
			# TODO: Function to add just one new element
			add-to-@! sorted->words sort_ [ _ ]
		max-count = max (map (values sorted->words) count
		keep (values sorted->words) |_
			=? count_ max-count
