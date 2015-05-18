use
	...@.@ count each! keep map
	...@.@-Type empty
	...@.Map.Map values
	...@.Map.Id-Map!
	...@.Map.multi-map! add-to-@!
	...compare =? max sort
use-debug
	...!
	...@.Seq.Seq seq=?
	...String split-str

maximum-anagram-sets.
	doc. "http://rosettacode.org/wiki/Anagrams#JavaScript"
	test. |
		words = split-str (RegExp "\\s") "
			abel able bale bela elba
			alger glare lager large regal
			angel angle galen glean lange
			caret carte cater crate trace
			elan lane lean lena neal
			evil levi live veil vile
			random words to prove it's doing work
		! seq=? (maximum-anagram-sets words)
			. [ "abel" "able" "bale" "bela" "elba"
			. [ "alger" "glare" "lager" "large" "regal"
			. [ "angel" "angle" "galen" "glean" "lange"
			. [ "caret" "carte" "cater" "crate" "trace"
			. [ "elan" "lane" "lean" "lena" "neal"
			. [ "evil" "levi" "live" "veil" "vile"
	|words
		# e.g., "amnos" -> [ "mason" "monas" ]
		sorted->words = empty Id-Map!
		each! words |_
			add-to-@! sorted->words sort_ [ _ ]
		max-count = max (map (values sorted->words) count
		keep (values sorted->words) |_
			=? count_ max-count
