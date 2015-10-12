import
	global describe it
	source-map-support install
	msl.assert assert-call!

install()

tests. !|test-name mp
	describe test-name !|
		for! pair of mp
			todo syntax array destructure
			key = pair[0]
			val = pair[1]

			it key.name !|
				case! key
					:Function
						case! val
							:Function
								res = val()
								if! res:Map
									assert-call! key res
							else
								assert-call! key val
					else
						val()

