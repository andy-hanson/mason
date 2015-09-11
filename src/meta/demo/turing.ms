use
	...@.@ count empty?
	...@.Seq.Deque
	...@.Seq.Seq _ <++! ++>! set-nth!
	...compare =?
	...js id=?
	...math.methods + -
	...Object p
	...Type.Type =>
	...Type.Pred-Type Any

region Rule results
	R. |written new-state
		# TODO:SYNTAX go-right. state. ...
		(write. written go-right. true state. new-state)
	L. |written new-state
		(write. written go-right. false state. new-state)
	fin.
		doc. "Stops the machine."

run-turing.
	doc. "http://rosettacode.org/wiki/Universal_Turing_machine"
	test. |
		incrementer =
			init-state. "a"
			blank. 0
			rules.
				a.
					1 -> R 1 "a"
					0 -> fin
		[incrementer [1 1 1]] -> [1 1 1 0]

		busy-beaver =
			init-state. "a"
			blank. 0
			rules.
				a.
					0 -> R 1 "b"
					1 -> L 1 "c"
				b.
					0 -> L 1 "a"
					1 -> R 1 "b"
				c.
					0 -> L 1 "b"
					1 -> fin
		[busy-beaver []] -> [1 1 1 1 1 1]

		sorting-test =
			init-state. "a"
			blank. 0
			rules.
				a.
					0 -> L 0 "e"
					1 -> R 1 "a"
					2 -> R 3 "b"
				b.
					0 -> L 0 "c"
					1 -> R 1 "b"
					2 -> R 2 "b"
				c.
					1 -> L 2 "d"
					2 -> L 2 "c"
					3 -> L 2 "e"
				d.
					1 -> L 1 "d"
					2 -> L 2 "d"
					3 -> R 1 "a"
				e.
					0 -> fin
					1 -> L 1 "e"
		[sorting-test [2 2 2 1 1 1]] -> [0 1 1 1 2 2 2 0]

	|spec init-tape:Seq
		rules:Object blank:Any init-state:Any = spec
		tape = => Deque cond (empty? init-tape) [blank] init-tape
		index ::= 0
		state ::= init-state
		for
			symbol-here = tape[index]
			rule-here = (p rules state)[symbol-here]

			if! id=? rule-here fin
				break => Array tape

			write go-right = rule-here
			state := rule-here.state
			set-nth! tape index write
			index := case index
				go-right
					if! =? _ (- (count tape) 1)
						# TODO: +>!
						++>! tape [blank]
					+ _ 1
				=? _ 0
					# TODO: <+!
					<++! tape [blank]
					0
				else
					- _ 1
