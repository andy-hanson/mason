use
	..@ count each! keep map
	..@.@-Type empty
	..@.Map values
	..@.Map.Id-Map!
	..@.Map.multi-map! add-to-@!
	..compare =? max sort
use-debug
	..$ _ $after
	..!
	..@.Seq seq=?
	..Bool false
	..control if!
	..Fun noop
	..js new
	..Str split-str
	..Try oh-no!
	..modules get-global-module

debug
	# TODO: ..io.http module

	request = get-global-module "request"
	$request = |url
		new $ |resolve
			request url |err res body
				noop res
				case! err
					=? _ ()
						()
					else
						oh-no! err
				resolve body

maximum-anagram-sets.
	doc. "http://rosettacode.org/wiki/Anagrams#JavaScript"
	test. |
		# Takes too long
		if! false |
			$after ($request "http://www.puzzlers.org/pub/wordlists/unixdict.txt") |body
				words = split-str body "\n"
				! seq=? (maximum-anagram-sets words)
					. [ "abel" "able" "bale" "bela" "elba"
					. [ "alger" "glare" "lager" "large" "regal"
					. [ "angel" "angle" "galen" "glean" "lange"
					. [ "caret" "carte" "cater" "crate" "trace"
					. [ "elan" "lane" "lean" "lena" "neal"
					. [ "evil" "levi" "live" "veil" "vile"
	|words
		# e.g., "amnos" -> "mason"
		# TODO: This is slow!
		mp = empty Id-Map!
		each! words |word
			add-to-@! mp (sort word) [ word ]

		max-count = max (map (values mp) count
		keep (values mp) |_
			=? count_ max-count
