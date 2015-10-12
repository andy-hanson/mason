import
	msl.@.Map.multi-map add-to-@!
	msl.compare sort
	msl.RegExp rgx
	..tests

maximum-anagram-sets. |words
	| http://rosettacode.org/wiki/Anagrams#JavaScript
	|| e.g., "amnos" -> ["mason" "monas"]
	sorted->words = empty Id-Map
	for! words
		todo  Function to add just one new element
		add-to-@! sorted->words sort_ [_]
	max-count = max @for @values sorted->words
		count_
	@keep (@values sorted->words) |_
		=? count_ max-count

tests "demo"
	maximum-anagram-sets -> !|
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
			. ["abel" "able" "bale" "bela" "elba"]
			. ["alger" "glare" "lager" "large" "regal"]
			. ["angel" "angle" "galen" "glean" "lange"]
			. ["caret" "carte" "cater" "crate" "trace"]
			. ["elan" "lane" "lean" "lena" "neal"]
			. ["evil" "levi" "live" "veil" "vile"]
