use
	..@ count keep each! max map
	..@.Seq sort
	..Comparable =?
	..maps.Identity-Map!
	..maps.Map values
	..maps.multi-map! add-to-@!
	..methods empty
debug use
	..$ _ $after
	..!
	..@.Seq seq=?
	..Fun ignore
	..js new
	..Str lines
	..Try oh-no!
	..modules get-global-module

debug
	\ TODO: ..io.http module

	request = get-global-module "request"
	$request = |url
		new $ |resolve
			request url |err res body
				ignore res \ TODO:Ignored vars
				case! err
					=? _ ()
						()
					else
						oh-no! err
				resolve body

maximum-anagram-sets.
	doc. "http://rosettacode.org/wiki/Anagrams#JavaScript"
	test. |
		$after ($request "http://www.puzzlers.org/pub/wordlists/unixdict.txt") |body
			words = lines body
			! seq=? (maximum-anagram-sets words)
				. [ "abel" "able" "bale" "bela" "elba"
				. [ "alger" "glare" "lager" "large" "regal"
				. [ "angel" "angle" "galen" "glean" "lange"
				. [ "caret" "carte" "cater" "crate" "trace"
				. [ "elan" "lane" "lean" "lena" "neal"
				. [ "evil" "levi" "live" "veil" "vile"
	|words
		\ e.g., "amnos" -> "mason"
		\ TODO: make-multi-map
		\ TODO: This is slow!
		mp = empty Identity-Map!
		each! words |word
			add-to-@! mp (sort word) [ word ]

		max-count = max (map (values mp) count) 0
		keep (values mp) |_
			=? count_ max-count
