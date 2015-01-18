use
	..$ -> $after
	..!
	..@ -> count keep each! max map
	..@.Seq -> seq=? sort
	..Comparable -> =?
	..Fun -> ignore
	..js -> new
	..maps.Identity-Map!
	..maps.Map -> values
	..maps.multi-map! -> add-to-@!
	..methods -> empty
	..modules -> get-global-module
	..Str -> lines
	..Try -> oh-no!

request = get-global-module "request"

\ TODO: ..io.http module
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
