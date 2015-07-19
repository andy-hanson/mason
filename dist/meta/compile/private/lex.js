if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', '../CompileError', '../MsAst', './language', './Token', './util'], function (exports, module, _esastDistLoc, _CompileError, _MsAst, _language, _Token, _util) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Loc = _interopRequireDefault(_esastDistLoc);

	/*
 This produces the Token tree (see Token.js).
 */

	module.exports = (context, sourceString) => {
		// Lexing algorithm requires trailing newline to close any blocks.
		// Use a null-terminated string because it's faster than checking whether index === length.
		sourceString = sourceString + '\n\u0000';

		// --------------------------------------------------------------------------------------------
		// GROUPING
		// --------------------------------------------------------------------------------------------
		// We only ever write to the innermost Group;
		// when we close that Group we add it to the enclosing Group and continue with that one.
		// Note that `curGroup` is conceptually the top of the stack, but is not stored in `stack`.
		const groupStack = [];
		let curGroup;
		const addToCurrentGroup = token => curGroup.subTokens.push(token),
		     

		// Pause writing to curGroup in favor of writing to a sub-group.
		// When the sub-group finishes we will pop the stack and resume writing to its parent.
		openGroup = (openPos, groupKind) => {
			groupStack.push(curGroup);
			// Contents will be added to by `o`.
			// curGroup.loc.end will be written to when closing it.
			curGroup = (0, _Token.Group)((0, _Loc.default)(openPos, null), [], groupKind);
		},
		     

		// A group ending may close mutliple groups.
		// For example, in `log! (+ 1 1`, the G_Line will also close a G_Parenthesis.
		closeGroups = (closePos, closeKind) => {
			// curGroup is different each time we go through the loop
			// because _closeSingleGroup brings us to an enclosing group.
			while (curGroup.kind !== closeKind) {
				const curKind = curGroup.kind;
				// A line can close a parenthesis, but a parenthesis can't close a line!
				context.check(curKind === _Token.G_Parenthesis || curKind === _Token.G_Bracket || curKind === _Token.G_Space, closePos, () => `Trying to close ${ (0, _Token.showGroupKind)(closeKind) }, ` + `but last opened was ${ (0, _Token.showGroupKind)(curKind) }`);
				_closeSingleGroup(closePos, curGroup.kind);
			}
			_closeSingleGroup(closePos, closeKind);
		},
		      _closeSingleGroup = (closePos, closeKind) => {
			let justClosed = curGroup;
			curGroup = groupStack.pop();
			justClosed.loc.end = closePos;
			switch (closeKind) {
				case _Token.G_Space:
					{
						const size = justClosed.subTokens.length;
						if (size !== 0)
							// Spaced should always have at least two elements.
							addToCurrentGroup(size === 1 ? justClosed.subTokens[0] : justClosed);
						break;
					}
				case _Token.G_Line:
					// Line must have content.
					// This can happen if there was just a comment.
					if (!(0, _util.isEmpty)(justClosed.subTokens)) addToCurrentGroup(justClosed);
					break;
				case _Token.G_Block:
					context.check(!(0, _util.isEmpty)(justClosed.subTokens), closePos, 'Empty block.');
					addToCurrentGroup(justClosed);
					break;
				default:
					addToCurrentGroup(justClosed);
			}
		},
		      openParenthesis = loc => {
			openGroup(loc.start, _Token.G_Parenthesis);
			openGroup(loc.end, _Token.G_Space);
		},
		      openBracket = loc => {
			openGroup(loc.start, _Token.G_Bracket);
			openGroup(loc.end, _Token.G_Space);
		},
		     

		// When starting a new line, a spaced group is created implicitly.
		openLine = pos => {
			openGroup(pos, _Token.G_Line);
			openGroup(pos, _Token.G_Space);
		},
		      closeLine = pos => {
			closeGroups(pos, _Token.G_Space);
			closeGroups(pos, _Token.G_Line);
		},
		     

		// When encountering a space, it both closes and opens a spaced group.
		space = loc => {
			closeGroups(loc.start, _Token.G_Space);
			openGroup(loc.end, _Token.G_Space);
		};

		// --------------------------------------------------------------------------------------------
		// ITERATING THROUGH SOURCESTRING
		// --------------------------------------------------------------------------------------------
		/*
  These are kept up-to-date as we iterate through sourceString.
  Every access to index has corresponding changes to line and/or column.
  This also explains why there are different functions for newlines vs other characters.
  */
		let index = 0,
		    line = _esastDistLoc.StartLine,
		    column = _esastDistLoc.StartColumn;

		/*
  NOTE: We use character *codes* for everything.
  Characters are of type Number and not just Strings of length one.
  */
		const pos = () => (0, _esastDistLoc.Pos)(line, column),
		      peek = () => sourceString.charCodeAt(index),
		      peekNext = () => sourceString.charCodeAt(index + 1),
		     

		// May eat a Newline.
		// If that happens, line and column will temporarily be wrong,
		// but we handle it in that special case (rather than checking for Newline every time).
		eat = () => {
			const char = sourceString.charCodeAt(index);
			index = index + 1;
			column = column + 1;
			return char;
		},
		      skip = eat,
		     

		// charToEat must not be Newline.
		tryEat = charToEat => {
			const canEat = peek() === charToEat;
			if (canEat) {
				index = index + 1;
				column = column + 1;
			}
			return canEat;
		},
		      mustEat = (charToEat, precededBy) => {
			const canEat = tryEat(charToEat);
			context.check(canEat, pos, () => `${ (0, _CompileError.code)(precededBy) } must be followed by ${ showChar(charToEat) }`);
		},
		      tryEatNewline = () => {
			const canEat = peek() === Newline;
			if (canEat) {
				index = index + 1;
				line = line + 1;
				column = _esastDistLoc.StartColumn;
			}
			return canEat;
		},
		     

		// Caller must ensure that backing up nCharsToBackUp characters brings us to oldPos.
		stepBackMany = (oldPos, nCharsToBackUp) => {
			index = index - nCharsToBackUp;
			line = oldPos.line;
			column = oldPos.column;
		},
		     

		// For takeWhile, takeWhileWithPrev, and skipWhileEquals,
		// characterPredicate must *not* accept Newline.
		// Otherwise there may be an infinite loop!
		takeWhile = characterPredicate => {
			const startIndex = index;
			_skipWhile(characterPredicate);
			return sourceString.slice(startIndex, index);
		},
		      takeWhileWithPrev = characterPredicate => {
			const startIndex = index;
			_skipWhile(characterPredicate);
			return sourceString.slice(startIndex - 1, index);
		},
		      skipWhileEquals = char => _skipWhile(_ => _ === char),
		      skipRestOfLine = () => _skipWhile(_ => _ !== Newline),
		      _skipWhile = characterPredicate => {
			const startIndex = index;
			while (characterPredicate(peek())) index = index + 1;
			const diff = index - startIndex;
			column = column + diff;
			return diff;
		},
		     

		// Called after seeing the first newline.
		// Returns # total newlines, including the first.
		skipNewlines = () => {
			const startLine = line;
			line = line + 1;
			while (peek() === Newline) {
				index = index + 1;
				line = line + 1;
			}
			column = _esastDistLoc.StartColumn;
			return line - startLine;
		};

		// Sprinkle checkPos() around to debug line and column tracking errors.
		/*
  const
  	checkPos = () => {
  		const p = _getCorrectPos()
  		if (p.line !== line || p.column !== column)
  			throw new Error(`index: ${index}, wrong: ${Pos(line, column)}, right: ${p}`)
  	},
  	_indexToPos = new Map(),
  	_getCorrectPos = () => {
  		if (index === 0)
  			return Pos(StartLine, StartColumn)
  			let oldPos, oldIndex
  		for (oldIndex = index - 1; ; oldIndex = oldIndex - 1) {
  			oldPos = _indexToPos.get(oldIndex)
  			if (oldPos !== undefined)
  				break
  			assert(oldIndex >= 0)
  		}
  		let newLine = oldPos.line, newColumn = oldPos.column
  		for (; oldIndex < index; oldIndex = oldIndex + 1)
  			if (sourceString.charCodeAt(oldIndex) === Newline) {
  				newLine = newLine + 1
  				newColumn = StartColumn
  			} else
  				newColumn = newColumn + 1
  			const p = Pos(newLine, newColumn)
  		_indexToPos.set(index, p)
  		return p
  	}
  */

		/*
  In the case of quote interpolation ("a{b}c") we'll recurse back into here.
  When isInQuote is true, we will not allow newlines.
  */
		const lexPlain = isInQuote => {
			// This tells us which indented block we're in.
			// Incrementing it means issuing a GP_OpenBlock and decrementing it means a GP_CloseBlock.
			// Does nothing if isInQuote.
			let indent = 0;

			// Make closures now rather than inside the loop.
			// This is significantly faster as of node v0.11.14.

			// This is where we started lexing the current token.
			let startColumn;
			const startPos = () => (0, _esastDistLoc.Pos)(line, startColumn),
			      loc = () => (0, _Loc.default)(startPos(), pos()),
			      keyword = kind => addToCurrentGroup((0, _Token.Keyword)(loc(), kind)),
			      funKeyword = kind => {
				keyword(kind);
				space(loc());
			},
			      eatAndAddNumber = () => {
				// TODO: A real number literal lexer, not just JavaScript's...
				const numberString = takeWhileWithPrev(isNumberCharacter);
				const number = Number(numberString);
				context.check(!Number.isNaN(number), pos, () => `Invalid number literal ${ (0, _CompileError.code)(numberString) }`);
				addToCurrentGroup((0, _MsAst.NumberLiteral)(loc(), number));
			};

			const handleName = () => {
				// All other characters should be handled in a case above.
				const name = takeWhileWithPrev(isNameCharacter);
				const keywordKind = (0, _Token.opKeywordKindFromName)(name);
				if (keywordKind !== undefined) {
					context.check(keywordKind !== -1, pos, () => `Reserved name ${ (0, _CompileError.code)(name) }`);
					if (keywordKind === _Token.KW_Region)
						// TODO: Eat and put it in Region expression
						skipRestOfLine();
					keyword(keywordKind);
				} else addToCurrentGroup((0, _Token.Name)(loc(), name));
			};

			while (true) {
				startColumn = column;
				const characterEaten = eat();
				// Generally, the type of a token is determined by the first character.
				switch (characterEaten) {
					case Zero:
						return;
					case CloseBrace:
						context.check(isInQuote, loc, () => `Reserved character ${ showChar(CloseBrace) }`);
						return;
					case Quote:
						lexQuote(indent);
						break;

					// GROUPS

					case OpenParenthesis:
						openParenthesis(loc());
						break;
					case OpenBracket:
						openBracket(loc());
						break;
					case CloseParenthesis:
						closeGroups(pos(), _Token.G_Parenthesis);
						break;
					case CloseBracket:
						closeGroups(pos(), _Token.G_Bracket);
						break;

					case Space:
						{
							const next = peek();
							context.warnIf(next === Space, loc, 'Multiple spaces in a row.');
							context.warnIf(next === Newline, loc, 'Line ends in a space.');
							space(loc());
							break;
						}

					case Newline:
						{
							context.check(!isInQuote, loc, 'Quote interpolation cannot contain newline');

							// Skip any blank lines.
							skipNewlines();
							const oldIndent = indent;
							indent = skipWhileEquals(Tab);
							context.check(peek() !== Space, pos, 'Line begins in a space');
							if (indent <= oldIndent) {
								const l = loc();
								for (let i = indent; i < oldIndent; i = i + 1) {
									closeLine(l.start);
									closeGroups(l.end, _Token.G_Block);
								}
								closeLine(l.start);
								openLine(l.end);
							} else {
								context.check(indent === oldIndent + 1, loc, 'Line is indented more than once');
								// Block at end of line goes in its own spaced group.
								// However, `~` preceding a block goes in a group with it.
								if ((0, _util.isEmpty)(curGroup.subTokens) || !(0, _Token.isKeyword)(_Token.KW_Lazy, (0, _util.last)(curGroup.subTokens))) space(loc());
								openGroup(loc().start, _Token.G_Block);
								openLine(loc().end);
							}
							break;
						}
					case Tab:
						// We always eat tabs in the Newline handler,
						// so this will only happen in the middle of a line.
						context.fail(loc(), 'Tab may only be used to indent');

					// FUN

					case Bang:
						if (tryEat(Bar)) funKeyword(_Token.KW_FunDo);else handleName();
						break;
					case Tilde:
						if (tryEat(Bang)) {
							mustEat(Bar, '~!');
							funKeyword(_Token.KW_FunGenDo);
						} else if (tryEat(Bar)) funKeyword(_Token.KW_FunGen);else keyword(_Token.KW_Lazy);
						break;
					case Bar:
						keyword(_Token.KW_Fun);
						// First arg in its own spaced group
						space(loc());
						break;

					// NUMBER

					case Hyphen:
						if (isDigit(peek()))
							// eatNumber() looks at prev character, so hyphen included.
							eatAndAddNumber();else handleName();
						break;
					case N0:case N1:case N2:case N3:case N4:
					case N5:case N6:case N7:case N8:case N9:
						eatAndAddNumber();
						break;

					// OTHER

					case Hash:
						if (tryEat(Hash)) {
							// Multi-line comment
							mustEat(Hash, '##');
							while (true) if (eat() === Hash && eat() === Hash && eat() === Hash) {
								const nl = tryEat(Newline);
								context.check(nl, loc, () => `#Closing {code('###')} must be followed by newline.`);
								break;
							}
						} else {
							// Single-line comment
							if (!(tryEat(Space) || tryEat(Tab))) context.fail(loc, () => `${ (0, _CompileError.code)('#') } must be followed by space or tab.`);
							skipRestOfLine();
						}
						break;

					case Dot:
						{
							const next = peek();
							if (next === Space || next === Newline) {
								// ObjLit assign in its own spaced group.
								// We can't just create a new Group here because we want to
								// ensure it's not part of the preceding or following spaced group.
								closeGroups(startPos(), _Token.G_Space);
								keyword(_Token.KW_ObjAssign);
								// This exists solely so that the Space or Newline handler can close it...
								openGroup(pos(), _Token.G_Space);
							} else if (next === Bar) {
								skip();
								keyword(_Token.KW_FunThis);
								space(loc());
							} else if (next === Bang && peekNext() === Bar) {
								skip();
								skip();
								keyword(_Token.KW_FunThisDo);
								space(loc());
							} else if (next === Tilde) {
								skip();
								if (tryEat(Bang)) {
									mustEat(Bar, '.~!');
									keyword(_Token.KW_FunThisGenDo);
								} else {
									mustEat(Bar, '.~');
									keyword(_Token.KW_FunThisGen);
								}
								space(loc());
							} else {
								// +1 for the dot we just ate.
								const nDots = skipWhileEquals(Dot) + 1;
								const next = peek();
								if (nDots === 3 && next === Space || next === Newline) keyword(_Token.KW_Ellipsis);else addToCurrentGroup((0, _Token.DotName)(loc(), nDots, takeWhile(isNameCharacter)));
							}
							break;
						}

					case Colon:
						if (tryEat(Colon)) {
							mustEat(Equal, '::');
							keyword(_Token.KW_AssignMutable);
						} else if (tryEat(Equal)) keyword(_Token.KW_LocalMutate);else keyword(_Token.KW_Type);
						break;

					case Underscore:
						keyword(_Token.KW_Focus);
						break;

					case Ampersand:case Backslash:case Backtick:case Caret:
					case Comma:case Percent:case Semicolon:
						context.fail(loc, `Reserved character ${ showChar(characterEaten) }`);
					default:
						handleName();
				}
			}
		};

		const lexQuote = indent => {
			const quoteIndent = indent + 1;

			// Indented quote is characterized by being immediately followed by a newline.
			// The next line *must* have some content at the next indentation.
			const isIndented = tryEatNewline();
			if (isIndented) {
				const actualIndent = skipWhileEquals(Tab);
				context.check(actualIndent === quoteIndent, pos, 'Indented quote must have exactly one more indent than previous line.');
			}

			// Current string literal part of quote we are reading.
			let read = '';

			const maybeOutputRead = () => {
				if (read !== '') {
					addToCurrentGroup(read);
					read = '';
				}
			};

			const locSingle = () => (0, _esastDistLoc.singleCharLoc)(pos());

			openGroup(locSingle().start, _Token.G_Quote);

			eatChars: while (true) {
				const char = eat();
				switch (char) {
					case Backslash:
						{
							read = read + quoteEscape(eat());
							break;
						}
					case OpenBrace:
						{
							maybeOutputRead();
							const l = locSingle();
							openParenthesis(l);
							lexPlain(true);
							closeGroups(l.end, _Token.G_Parenthesis);
							break;
						}
					case Newline:
						{
							const originalPos = pos();
							// Go back to before we ate it.
							originalPos.column = originalPos.column - 1;

							context.check(isIndented, locSingle, 'Unclosed quote.');
							// Allow extra blank lines.
							const numNewlines = skipNewlines();
							const newIndent = skipWhileEquals(Tab);
							if (newIndent < quoteIndent) {
								// Indented quote section is over.
								// Undo reading the tabs and newline.
								stepBackMany(originalPos, numNewlines + newIndent);
								(0, _util.assert)(peek() === Newline);
								break eatChars;
							} else read = read + '\n'.repeat(numNewlines) + '\t'.repeat(newIndent - quoteIndent);
							break;
						}
					case Quote:
						if (!isIndented) break eatChars;
					// Else fallthrough
					default:
						// I've tried pushing character codes to an array and stringifying them later,
						// but this turned out to be better.
						read = read + String.fromCharCode(char);
				}
			}

			maybeOutputRead();
			closeGroups(pos(), _Token.G_Quote);
		};

		const quoteEscape = ch => {
			switch (ch) {
				case OpenBrace:
					return '{';
				case LetterN:
					return '\n';
				case LetterT:
					return '\t';
				case Quote:
					return '"';
				case Backslash:
					return '\\';
				default:
					context.fail(pos, `No need to escape ${ showChar(ch) }`);
			}
		};

		curGroup = (0, _Token.Group)((0, _Loc.default)(_esastDistLoc.StartPos, null), [], _Token.G_Block);
		openLine(_esastDistLoc.StartPos);

		lexPlain(false);

		const endPos = pos();
		closeLine(endPos);
		(0, _util.assert)((0, _util.isEmpty)(groupStack));
		curGroup.loc.end = endPos;
		return curGroup;
	};

	const cc = _ => _.charCodeAt(0);
	const Ampersand = cc('&'),
	      Backslash = cc('\\'),
	      Backtick = cc('`'),
	      Bang = cc('!'),
	      Bar = cc('|'),
	      Caret = cc('^'),
	      CloseBrace = cc('}'),
	      CloseBracket = cc(']'),
	      CloseParenthesis = cc(')'),
	      Colon = cc(':'),
	      Comma = cc(','),
	      Dot = cc('.'),
	      Equal = cc('='),
	      Hash = cc('#'),
	      Hyphen = cc('-'),
	      LetterN = cc('n'),
	      LetterT = cc('t'),
	      N0 = cc('0'),
	      N1 = cc('1'),
	      N2 = cc('2'),
	      N3 = cc('3'),
	      N4 = cc('4'),
	      N5 = cc('5'),
	      N6 = cc('6'),
	      N7 = cc('7'),
	      N8 = cc('8'),
	      N9 = cc('9'),
	      Newline = cc('\n'),
	      OpenBrace = cc('{'),
	      OpenBracket = cc('['),
	      OpenParenthesis = cc('('),
	      Percent = cc('%'),
	      Quote = cc('"'),
	      Semicolon = cc(';'),
	      Space = cc(' '),
	      Tab = cc('\t'),
	      Tilde = cc('~'),
	      Underscore = cc('_'),
	      Zero = cc('\u0000');

	const showChar = char => (0, _CompileError.code)(String.fromCharCode(char)),
	      _charPred = (chars, negate) => {
		let src = 'switch(ch) {\n';
		for (let i = 0; i < chars.length; i = i + 1) src = `${ src }case ${ chars.charCodeAt(i) }: `;
		src = `${ src } return ${ !negate }\ndefault: return ${ negate }\n}`;
		return Function('ch', src);
	},
	      isDigit = _charPred('0123456789'),
	      isNameCharacter = _charPred(_language.NonNameCharacters, true),
	      isNumberCharacter = _charPred('0123456789.e');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL2xleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztrQkFhZSxDQUFDLE9BQU8sRUFBRSxZQUFZLEtBQUs7OztBQUd6QyxjQUFZLEdBQUcsWUFBWSxHQUFHLFVBQU0sQ0FBQTs7Ozs7Ozs7QUFRcEMsUUFBTSxVQUFVLEdBQUcsRUFBRyxDQUFBO0FBQ3RCLE1BQUksUUFBUSxDQUFBO0FBQ1osUUFDQyxpQkFBaUIsR0FBRyxLQUFLLElBQ3hCLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzs7Ozs7QUFJL0IsV0FBUyxHQUFHLENBQUMsT0FBTyxFQUFFLFNBQVMsS0FBSztBQUNuQyxhQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBOzs7QUFHekIsV0FBUSxHQUFHLFdBaENJLEtBQUssRUFnQ0gsa0JBQUksT0FBTyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQTtHQUNwRDs7Ozs7QUFJRCxhQUFXLEdBQUcsQ0FBQyxRQUFRLEVBQUUsU0FBUyxLQUFLOzs7QUFHdEMsVUFBTyxRQUFRLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtBQUNuQyxVQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFBOztBQUU3QixXQUFPLENBQUMsS0FBSyxDQUNaLE9BQU8sWUE1Q3lDLGFBQWEsQUE0Q3BDLElBQUksT0FBTyxZQTVDUCxTQUFTLEFBNENZLElBQUksT0FBTyxZQTVDRSxPQUFPLEFBNENHLEVBQ3pFLFFBQVEsRUFBRSxNQUNWLENBQUMsZ0JBQWdCLEdBQUUsV0EzQ3dDLGFBQWEsRUEyQ3ZDLFNBQVMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxHQUMvQyxDQUFDLG9CQUFvQixHQUFFLFdBNUNvQyxhQUFhLEVBNENuQyxPQUFPLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQTtBQUNqRCxxQkFBaUIsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzFDO0FBQ0Qsb0JBQWlCLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFBO0dBQ3RDO1FBRUQsaUJBQWlCLEdBQUcsQ0FBQyxRQUFRLEVBQUUsU0FBUyxLQUFLO0FBQzVDLE9BQUksVUFBVSxHQUFHLFFBQVEsQ0FBQTtBQUN6QixXQUFRLEdBQUcsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFBO0FBQzNCLGFBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLFFBQVEsQ0FBQTtBQUM3QixXQUFRLFNBQVM7QUFDaEIsZ0JBMURnRSxPQUFPO0FBMER6RDtBQUNiLFlBQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFBO0FBQ3hDLFVBQUksSUFBSSxLQUFLLENBQUM7O0FBRWIsd0JBQWlCLENBQUMsSUFBSSxLQUFLLENBQUMsR0FBRyxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFBO0FBQ3JFLFlBQUs7TUFDTDtBQUFBLEFBQ0QsZ0JBakV5QyxNQUFNOzs7QUFvRTlDLFNBQUksQ0FBQyxVQWhFTyxPQUFPLEVBZ0VOLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFDakMsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUE7QUFDOUIsV0FBSztBQUFBLEFBQ04sZ0JBdkVxQixPQUFPO0FBd0UzQixZQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsVUFwRUgsT0FBTyxFQW9FSSxVQUFVLENBQUMsU0FBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLGNBQWMsQ0FBQyxDQUFBO0FBQ3ZFLHNCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFBO0FBQzdCLFdBQUs7QUFBQSxBQUNOO0FBQ0Msc0JBQWlCLENBQUMsVUFBVSxDQUFDLENBQUE7QUFBQSxJQUM5QjtHQUNEO1FBRUQsZUFBZSxHQUFHLEdBQUcsSUFBSTtBQUN4QixZQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssU0FqRitCLGFBQWEsQ0FpRjVCLENBQUE7QUFDbkMsWUFBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBbEZnRCxPQUFPLENBa0Y3QyxDQUFBO0dBQzNCO1FBRUQsV0FBVyxHQUFHLEdBQUcsSUFBSTtBQUNwQixZQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssU0F0RlksU0FBUyxDQXNGVCxDQUFBO0FBQy9CLFlBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxTQXZGZ0QsT0FBTyxDQXVGN0MsQ0FBQTtHQUMzQjs7OztBQUdELFVBQVEsR0FBRyxHQUFHLElBQUk7QUFDakIsWUFBUyxDQUFDLEdBQUcsU0E1RjZCLE1BQU0sQ0E0RjFCLENBQUE7QUFDdEIsWUFBUyxDQUFDLEdBQUcsU0E3Rm9ELE9BQU8sQ0E2RmpELENBQUE7R0FDdkI7UUFFRCxTQUFTLEdBQUcsR0FBRyxJQUFJO0FBQ2xCLGNBQVcsQ0FBQyxHQUFHLFNBakdrRCxPQUFPLENBaUcvQyxDQUFBO0FBQ3pCLGNBQVcsQ0FBQyxHQUFHLFNBbEcyQixNQUFNLENBa0d4QixDQUFBO0dBQ3hCOzs7O0FBR0QsT0FBSyxHQUFHLEdBQUcsSUFBSTtBQUNkLGNBQVcsQ0FBQyxHQUFHLENBQUMsS0FBSyxTQXZHNEMsT0FBTyxDQXVHekMsQ0FBQTtBQUMvQixZQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsU0F4R2dELE9BQU8sQ0F3RzdDLENBQUE7R0FDM0IsQ0FBQTs7Ozs7Ozs7OztBQVVGLE1BQUksS0FBSyxHQUFHLENBQUM7TUFBRSxJQUFJLGlCQXZIRCxTQUFTLEFBdUhJO01BQUUsTUFBTSxpQkF2SEEsV0FBVyxBQXVIRyxDQUFBOzs7Ozs7QUFNckQsUUFDQyxHQUFHLEdBQUcsTUFBTSxrQkE5SEEsR0FBRyxFQThIQyxJQUFJLEVBQUUsTUFBTSxDQUFDO1FBRTdCLElBQUksR0FBRyxNQUFNLFlBQVksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBQzNDLFFBQVEsR0FBRyxNQUFNLFlBQVksQ0FBQyxVQUFVLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQzs7Ozs7O0FBS25ELEtBQUcsR0FBRyxNQUFNO0FBQ1gsU0FBTSxJQUFJLEdBQUcsWUFBWSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUMzQyxRQUFLLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQTtBQUNqQixTQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQTtBQUNuQixVQUFPLElBQUksQ0FBQTtHQUNYO1FBQ0QsSUFBSSxHQUFHLEdBQUc7Ozs7QUFHVixRQUFNLEdBQUcsU0FBUyxJQUFJO0FBQ3JCLFNBQU0sTUFBTSxHQUFHLElBQUksRUFBRSxLQUFLLFNBQVMsQ0FBQTtBQUNuQyxPQUFJLE1BQU0sRUFBRTtBQUNYLFNBQUssR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFBO0FBQ2pCLFVBQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFBO0lBQ25CO0FBQ0QsVUFBTyxNQUFNLENBQUE7R0FDYjtRQUVELE9BQU8sR0FBRyxDQUFDLFNBQVMsRUFBRSxVQUFVLEtBQUs7QUFDcEMsU0FBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0FBQ2hDLFVBQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxNQUMxQixDQUFDLEdBQUUsa0JBMUpFLElBQUksRUEwSkQsVUFBVSxDQUFDLEVBQUMscUJBQXFCLEdBQUUsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO0dBQ2xFO1FBRUQsYUFBYSxHQUFHLE1BQU07QUFDckIsU0FBTSxNQUFNLEdBQUcsSUFBSSxFQUFFLEtBQUssT0FBTyxDQUFBO0FBQ2pDLE9BQUksTUFBTSxFQUFFO0FBQ1gsU0FBSyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUE7QUFDakIsUUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUE7QUFDZixVQUFNLGlCQW5LOEIsV0FBVyxBQW1LM0IsQ0FBQTtJQUNwQjtBQUNELFVBQU8sTUFBTSxDQUFBO0dBQ2I7Ozs7QUFHRCxjQUFZLEdBQUcsQ0FBQyxNQUFNLEVBQUUsY0FBYyxLQUFLO0FBQzFDLFFBQUssR0FBRyxLQUFLLEdBQUcsY0FBYyxDQUFBO0FBQzlCLE9BQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFBO0FBQ2xCLFNBQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFBO0dBQ3RCOzs7Ozs7QUFLRCxXQUFTLEdBQUcsa0JBQWtCLElBQUk7QUFDakMsU0FBTSxVQUFVLEdBQUcsS0FBSyxDQUFBO0FBQ3hCLGFBQVUsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0FBQzlCLFVBQU8sWUFBWSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsS0FBSyxDQUFDLENBQUE7R0FDNUM7UUFFRCxpQkFBaUIsR0FBRyxrQkFBa0IsSUFBSTtBQUN6QyxTQUFNLFVBQVUsR0FBRyxLQUFLLENBQUE7QUFDeEIsYUFBVSxDQUFDLGtCQUFrQixDQUFDLENBQUE7QUFDOUIsVUFBTyxZQUFZLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUE7R0FDaEQ7UUFFRCxlQUFlLEdBQUcsSUFBSSxJQUNyQixVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUM7UUFFNUIsY0FBYyxHQUFHLE1BQ2hCLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLE9BQU8sQ0FBQztRQUUvQixVQUFVLEdBQUcsa0JBQWtCLElBQUk7QUFDbEMsU0FBTSxVQUFVLEdBQUcsS0FBSyxDQUFBO0FBQ3hCLFVBQU8sa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUMsRUFDaEMsS0FBSyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUE7QUFDbEIsU0FBTSxJQUFJLEdBQUcsS0FBSyxHQUFHLFVBQVUsQ0FBQTtBQUMvQixTQUFNLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQTtBQUN0QixVQUFPLElBQUksQ0FBQTtHQUNYOzs7OztBQUlELGNBQVksR0FBRyxNQUFNO0FBQ3BCLFNBQU0sU0FBUyxHQUFHLElBQUksQ0FBQTtBQUN0QixPQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQTtBQUNmLFVBQU8sSUFBSSxFQUFFLEtBQUssT0FBTyxFQUFFO0FBQzFCLFNBQUssR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFBO0FBQ2pCLFFBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFBO0lBQ2Y7QUFDRCxTQUFNLGlCQXROK0IsV0FBVyxBQXNONUIsQ0FBQTtBQUNwQixVQUFPLElBQUksR0FBRyxTQUFTLENBQUE7R0FDdkIsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3Q0YsUUFBTSxRQUFRLEdBQUcsU0FBUyxJQUFJOzs7O0FBSTdCLE9BQUksTUFBTSxHQUFHLENBQUMsQ0FBQTs7Ozs7O0FBTWQsT0FBSSxXQUFXLENBQUE7QUFDZixTQUNDLFFBQVEsR0FBRyxNQUFNLGtCQTVRTixHQUFHLEVBNFFPLElBQUksRUFBRSxXQUFXLENBQUM7U0FDdkMsR0FBRyxHQUFHLE1BQU0sa0JBQUksUUFBUSxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUM7U0FDbEMsT0FBTyxHQUFHLElBQUksSUFDYixpQkFBaUIsQ0FBQyxXQTFRVixPQUFPLEVBMFFXLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3hDLFVBQVUsR0FBRyxJQUFJLElBQUk7QUFDcEIsV0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ2IsU0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUE7SUFDWjtTQUNELGVBQWUsR0FBRyxNQUFNOztBQUV2QixVQUFNLFlBQVksR0FBRyxpQkFBaUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO0FBQ3pELFVBQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQTtBQUNuQyxXQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFDekMsQ0FBQyx1QkFBdUIsR0FBRSxrQkF4UnRCLElBQUksRUF3UnVCLFlBQVksQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ2hELHFCQUFpQixDQUFDLFdBeFJiLGFBQWEsRUF3UmMsR0FBRyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQTtJQUMvQyxDQUFBOztBQUVGLFNBQU0sVUFBVSxHQUFHLE1BQU07O0FBRXhCLFVBQU0sSUFBSSxHQUFHLGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxDQUFBO0FBQy9DLFVBQU0sV0FBVyxHQUFHLFdBelJrQixxQkFBcUIsRUF5UmpCLElBQUksQ0FBQyxDQUFBO0FBQy9DLFFBQUksV0FBVyxLQUFLLFNBQVMsRUFBRTtBQUM5QixZQUFPLENBQUMsS0FBSyxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsTUFDdEMsQ0FBQyxjQUFjLEdBQUUsa0JBbFNiLElBQUksRUFrU2MsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7QUFDL0IsU0FBSSxXQUFXLFlBN1JKLFNBQVMsQUE2UlM7O0FBRTVCLG9CQUFjLEVBQUUsQ0FBQTtBQUNqQixZQUFPLENBQUMsV0FBVyxDQUFDLENBQUE7S0FDcEIsTUFDQSxpQkFBaUIsQ0FBQyxXQWxTYSxJQUFJLEVBa1NaLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUE7SUFDckMsQ0FBQTs7QUFFRCxVQUFPLElBQUksRUFBRTtBQUNaLGVBQVcsR0FBRyxNQUFNLENBQUE7QUFDcEIsVUFBTSxjQUFjLEdBQUcsR0FBRyxFQUFFLENBQUE7O0FBRTVCLFlBQVEsY0FBYztBQUNyQixVQUFLLElBQUk7QUFDUixhQUFNO0FBQUEsQUFDUCxVQUFLLFVBQVU7QUFDZCxhQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsTUFDN0IsQ0FBQyxtQkFBbUIsR0FBRSxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7QUFDOUMsYUFBTTtBQUFBLEFBQ1AsVUFBSyxLQUFLO0FBQ1QsY0FBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBQ2hCLFlBQUs7O0FBQUE7O0FBSU4sVUFBSyxlQUFlO0FBQ25CLHFCQUFlLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQTtBQUN0QixZQUFLO0FBQUEsQUFDTixVQUFLLFdBQVc7QUFDZixpQkFBVyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUE7QUFDbEIsWUFBSztBQUFBLEFBQ04sVUFBSyxnQkFBZ0I7QUFDcEIsaUJBQVcsQ0FBQyxHQUFHLEVBQUUsU0FoVStCLGFBQWEsQ0FnVTVCLENBQUE7QUFDakMsWUFBSztBQUFBLEFBQ04sVUFBSyxZQUFZO0FBQ2hCLGlCQUFXLENBQUMsR0FBRyxFQUFFLFNBblVZLFNBQVMsQ0FtVVQsQ0FBQTtBQUM3QixZQUFLOztBQUFBLEFBRU4sVUFBSyxLQUFLO0FBQUU7QUFDWCxhQUFNLElBQUksR0FBRyxJQUFJLEVBQUUsQ0FBQTtBQUNuQixjQUFPLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUUsR0FBRyxFQUFFLDJCQUEyQixDQUFDLENBQUE7QUFDaEUsY0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFLEdBQUcsRUFBRSx1QkFBdUIsQ0FBQyxDQUFBO0FBQzlELFlBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO0FBQ1osYUFBSztPQUNMOztBQUFBLEFBRUQsVUFBSyxPQUFPO0FBQUU7QUFDYixjQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSw0Q0FBNEMsQ0FBQyxDQUFBOzs7QUFHNUUsbUJBQVksRUFBRSxDQUFBO0FBQ2QsYUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFBO0FBQ3hCLGFBQU0sR0FBRyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDN0IsY0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxLQUFLLEVBQUUsR0FBRyxFQUFFLHdCQUF3QixDQUFDLENBQUE7QUFDOUQsV0FBSSxNQUFNLElBQUksU0FBUyxFQUFFO0FBQ3hCLGNBQU0sQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFBO0FBQ2YsYUFBSyxJQUFJLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUM5QyxrQkFBUyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUNsQixvQkFBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBMVZDLE9BQU8sQ0EwVkUsQ0FBQTtTQUMzQjtBQUNELGlCQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO0FBQ2xCLGdCQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2YsTUFBTTtBQUNOLGVBQU8sQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLFNBQVMsR0FBRyxDQUFDLEVBQUUsR0FBRyxFQUMxQyxpQ0FBaUMsQ0FBQyxDQUFBOzs7QUFHbkMsWUFBSSxVQS9WTyxPQUFPLEVBK1ZOLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFDOUIsQ0FBQyxXQW5XUCxTQUFTLFNBQzhELE9BQU8sRUFrV3BELFVBaFdELElBQUksRUFnV0UsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQzdDLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO0FBQ2IsaUJBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLFNBdFdGLE9BQU8sQ0FzV0ssQ0FBQTtBQUMvQixnQkFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ25CO0FBQ0QsYUFBSztPQUNMO0FBQUEsQUFDRCxVQUFLLEdBQUc7OztBQUdQLGFBQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsZ0NBQWdDLENBQUMsQ0FBQTs7QUFBQTs7QUFJdEQsVUFBSyxJQUFJO0FBQ1IsVUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQ2QsVUFBVSxRQW5Yc0QsUUFBUSxDQW1YcEQsQ0FBQSxLQUVwQixVQUFVLEVBQUUsQ0FBQTtBQUNiLFlBQUs7QUFBQSxBQUNOLFVBQUssS0FBSztBQUNULFVBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ2pCLGNBQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDbEIsaUJBQVUsUUF6WGYsV0FBVyxDQXlYaUIsQ0FBQTtPQUN2QixNQUFNLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUNyQixVQUFVLFFBNVhnRSxTQUFTLENBNFg5RCxDQUFBLEtBRXJCLE9BQU8sUUE3WDJELE9BQU8sQ0E2WHpELENBQUE7QUFDakIsWUFBSztBQUFBLEFBQ04sVUFBSyxHQUFHO0FBQ1AsYUFBTyxRQWpZa0QsTUFBTSxDQWlZaEQsQ0FBQTs7QUFFZixXQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQTtBQUNaLFlBQUs7O0FBQUE7O0FBSU4sVUFBSyxNQUFNO0FBQ1YsVUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBRWxCLHNCQUFlLEVBQUUsQ0FBQSxLQUVqQixVQUFVLEVBQUUsQ0FBQTtBQUNiLFlBQUs7QUFBQSxBQUNOLFVBQUssRUFBRSxDQUFDLEFBQUMsS0FBSyxFQUFFLENBQUMsQUFBQyxLQUFLLEVBQUUsQ0FBQyxBQUFDLEtBQUssRUFBRSxDQUFDLEFBQUMsS0FBSyxFQUFFLENBQUM7QUFDNUMsVUFBSyxFQUFFLENBQUMsQUFBQyxLQUFLLEVBQUUsQ0FBQyxBQUFDLEtBQUssRUFBRSxDQUFDLEFBQUMsS0FBSyxFQUFFLENBQUMsQUFBQyxLQUFLLEVBQUU7QUFDMUMscUJBQWUsRUFBRSxDQUFBO0FBQ2pCLFlBQUs7O0FBQUE7O0FBS04sVUFBSyxJQUFJO0FBQ1IsVUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7O0FBRWpCLGNBQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFDbkIsY0FBTyxJQUFJLEVBQ1YsSUFBSSxHQUFHLEVBQUUsS0FBSyxJQUFJLElBQUksR0FBRyxFQUFFLEtBQUssSUFBSSxJQUFJLEdBQUcsRUFBRSxLQUFLLElBQUksRUFBRTtBQUN2RCxjQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7QUFDMUIsZUFBTyxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLE1BQ3RCLENBQUMsbURBQW1ELENBQUMsQ0FBQyxDQUFBO0FBQ3ZELGNBQUs7UUFDTDtPQUNGLE1BQU07O0FBRU4sV0FBSSxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUEsQUFBQyxFQUNsQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUNqQixDQUFDLEdBQUUsa0JBMWFGLElBQUksRUEwYUcsR0FBRyxDQUFDLEVBQUMsa0NBQWtDLENBQUMsQ0FBQyxDQUFBO0FBQ25ELHFCQUFjLEVBQUUsQ0FBQTtPQUNoQjtBQUNELFlBQUs7O0FBQUEsQUFFTixVQUFLLEdBQUc7QUFBRTtBQUNULGFBQU0sSUFBSSxHQUFHLElBQUksRUFBRSxDQUFBO0FBQ25CLFdBQUksSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssT0FBTyxFQUFFOzs7O0FBSXZDLG1CQUFXLENBQUMsUUFBUSxFQUFFLFNBbGJ3QyxPQUFPLENBa2JyQyxDQUFBO0FBQ2hDLGVBQU8sUUFoYlosWUFBWSxDQWdiYyxDQUFBOztBQUVyQixpQkFBUyxDQUFDLEdBQUcsRUFBRSxTQXJiK0MsT0FBTyxDQXFiNUMsQ0FBQTtRQUN6QixNQUFNLElBQUksSUFBSSxLQUFLLEdBQUcsRUFBRTtBQUN4QixZQUFJLEVBQUUsQ0FBQTtBQUNOLGVBQU8sUUF0YkMsVUFBVSxDQXNiQyxDQUFBO0FBQ25CLGFBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO1FBQ1osTUFBTSxJQUFJLElBQUksS0FBSyxJQUFJLElBQUksUUFBUSxFQUFFLEtBQUssR0FBRyxFQUFFO0FBQy9DLFlBQUksRUFBRSxDQUFBO0FBQ04sWUFBSSxFQUFFLENBQUE7QUFDTixlQUFPLFFBM2JhLFlBQVksQ0EyYlgsQ0FBQTtBQUNyQixhQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQTtRQUNaLE1BQU0sSUFBSSxJQUFJLEtBQUssS0FBSyxFQUFFO0FBQzFCLFlBQUksRUFBRSxDQUFBO0FBQ04sWUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDakIsZ0JBQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUE7QUFDbkIsZ0JBQU8sUUFqY3lDLGVBQWUsQ0FpY3ZDLENBQUE7U0FDeEIsTUFBTTtBQUNOLGdCQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFBO0FBQ2xCLGdCQUFPLFFBcGMwQixhQUFhLENBb2N4QixDQUFBO1NBQ3RCO0FBQ0QsYUFBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUE7UUFDWixNQUFNOztBQUVOLGNBQU0sS0FBSyxHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDdEMsY0FBTSxJQUFJLEdBQUcsSUFBSSxFQUFFLENBQUE7QUFDbkIsWUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLElBQUksS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLE9BQU8sRUFDcEQsT0FBTyxRQTdjeUIsV0FBVyxDQTZjdkIsQ0FBQSxLQUVwQixpQkFBaUIsQ0FBQyxXQWhkaEIsT0FBTyxFQWdkaUIsR0FBRyxFQUFFLEVBQUUsS0FBSyxFQUFFLFNBQVMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDckU7QUFDRCxhQUFLO09BQ0w7O0FBQUEsQUFFRCxVQUFLLEtBQUs7QUFDVCxVQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUNsQixjQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFBO0FBQ3BCLGNBQU8sUUF2ZFEsZ0JBQWdCLENBdWROLENBQUE7T0FDekIsTUFBTSxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFDdkIsT0FBTyxRQXhkb0UsY0FBYyxDQXdkbEUsQ0FBQSxLQUV2QixPQUFPLFFBemRhLE9BQU8sQ0F5ZFgsQ0FBQTtBQUNqQixZQUFLOztBQUFBLEFBRU4sVUFBSyxVQUFVO0FBQ2QsYUFBTyxRQS9kd0MsUUFBUSxDQStkdEMsQ0FBQTtBQUNqQixZQUFLOztBQUFBLEFBRU4sVUFBSyxTQUFTLENBQUMsQUFBQyxLQUFLLFNBQVMsQ0FBQyxBQUFDLEtBQUssUUFBUSxDQUFDLEFBQUMsS0FBSyxLQUFLLENBQUM7QUFDMUQsVUFBSyxLQUFLLENBQUMsQUFBQyxLQUFLLE9BQU8sQ0FBQyxBQUFDLEtBQUssU0FBUztBQUN2QyxhQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLG1CQUFtQixHQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQTtBQUFBLEFBQ3BFO0FBQ0MsZ0JBQVUsRUFBRSxDQUFBO0FBQUEsS0FDYjtJQUNEO0dBQ0QsQ0FBQTs7QUFFRCxRQUFNLFFBQVEsR0FBRyxNQUFNLElBQUk7QUFDMUIsU0FBTSxXQUFXLEdBQUcsTUFBTSxHQUFHLENBQUMsQ0FBQTs7OztBQUk5QixTQUFNLFVBQVUsR0FBRyxhQUFhLEVBQUUsQ0FBQTtBQUNsQyxPQUFJLFVBQVUsRUFBRTtBQUNmLFVBQU0sWUFBWSxHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUN6QyxXQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksS0FBSyxXQUFXLEVBQUUsR0FBRyxFQUM5QyxzRUFBc0UsQ0FBQyxDQUFBO0lBQ3hFOzs7QUFHRCxPQUFJLElBQUksR0FBRyxFQUFFLENBQUE7O0FBRWIsU0FBTSxlQUFlLEdBQUcsTUFBTTtBQUM3QixRQUFJLElBQUksS0FBSyxFQUFFLEVBQUU7QUFDaEIsc0JBQWlCLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDdkIsU0FBSSxHQUFHLEVBQUUsQ0FBQTtLQUNUO0lBQ0QsQ0FBQTs7QUFFRCxTQUFNLFNBQVMsR0FBRyxNQUFNLGtCQXRnQjJCLGFBQWEsRUFzZ0IxQixHQUFHLEVBQUUsQ0FBQyxDQUFBOztBQUU1QyxZQUFTLENBQUMsU0FBUyxFQUFFLENBQUMsS0FBSyxTQXBnQmdELE9BQU8sQ0FvZ0I3QyxDQUFBOztBQUVyQyxXQUFRLEVBQUUsT0FBTyxJQUFJLEVBQUU7QUFDdEIsVUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUE7QUFDbEIsWUFBUSxJQUFJO0FBQ1gsVUFBSyxTQUFTO0FBQUU7QUFDZixXQUFJLEdBQUcsSUFBSSxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFBO0FBQ2hDLGFBQUs7T0FDTDtBQUFBLEFBQ0QsVUFBSyxTQUFTO0FBQUU7QUFDZixzQkFBZSxFQUFFLENBQUE7QUFDakIsYUFBTSxDQUFDLEdBQUcsU0FBUyxFQUFFLENBQUE7QUFDckIsc0JBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNsQixlQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDZCxrQkFBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBbGhCK0IsYUFBYSxDQWtoQjVCLENBQUE7QUFDakMsYUFBSztPQUNMO0FBQUEsQUFDRCxVQUFLLE9BQU87QUFBRTtBQUNiLGFBQU0sV0FBVyxHQUFHLEdBQUcsRUFBRSxDQUFBOztBQUV6QixrQkFBVyxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTs7QUFFM0MsY0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixDQUFDLENBQUE7O0FBRXZELGFBQU0sV0FBVyxHQUFHLFlBQVksRUFBRSxDQUFBO0FBQ2xDLGFBQU0sU0FBUyxHQUFHLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUN0QyxXQUFJLFNBQVMsR0FBRyxXQUFXLEVBQUU7OztBQUc1QixvQkFBWSxDQUFDLFdBQVcsRUFBRSxXQUFXLEdBQUcsU0FBUyxDQUFDLENBQUE7QUFDbEQsa0JBOWhCRyxNQUFNLEVBOGhCRixJQUFJLEVBQUUsS0FBSyxPQUFPLENBQUMsQ0FBQTtBQUMxQixjQUFNLFFBQVEsQ0FBQTtRQUNkLE1BQ0EsSUFBSSxHQUFHLElBQUksR0FDVixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxDQUFBO0FBQ2pFLGFBQUs7T0FDTDtBQUFBLEFBQ0QsVUFBSyxLQUFLO0FBQ1QsVUFBSSxDQUFDLFVBQVUsRUFDZCxNQUFNLFFBQVEsQ0FBQTtBQUFBO0FBRWhCOzs7QUFHQyxVQUFJLEdBQUcsSUFBSSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUE7QUFBQSxLQUN4QztJQUNEOztBQUVELGtCQUFlLEVBQUUsQ0FBQTtBQUNqQixjQUFXLENBQUMsR0FBRyxFQUFFLFNBcmpCMEQsT0FBTyxDQXFqQnZELENBQUE7R0FDM0IsQ0FBQTs7QUFFRCxRQUFNLFdBQVcsR0FBRyxFQUFFLElBQUk7QUFDekIsV0FBUSxFQUFFO0FBQ1QsU0FBSyxTQUFTO0FBQUUsWUFBTyxHQUFHLENBQUE7QUFBQSxBQUMxQixTQUFLLE9BQU87QUFBRSxZQUFPLElBQUksQ0FBQTtBQUFBLEFBQ3pCLFNBQUssT0FBTztBQUFFLFlBQU8sSUFBSSxDQUFBO0FBQUEsQUFDekIsU0FBSyxLQUFLO0FBQUUsWUFBTyxHQUFHLENBQUE7QUFBQSxBQUN0QixTQUFLLFNBQVM7QUFBRSxZQUFPLElBQUksQ0FBQTtBQUFBLEFBQzNCO0FBQVMsWUFBTyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxrQkFBa0IsR0FBRSxRQUFRLENBQUMsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7QUFBQSxJQUMvRDtHQUNELENBQUE7O0FBRUQsVUFBUSxHQUFHLFdBbmtCTSxLQUFLLEVBbWtCTCxnQ0F2a0JZLFFBQVEsRUF1a0JOLElBQUksQ0FBQyxFQUFFLEVBQUcsU0Fua0JqQixPQUFPLENBbWtCb0IsQ0FBQTtBQUNuRCxVQUFRLGVBeGtCcUIsUUFBUSxDQXdrQm5CLENBQUE7O0FBRWxCLFVBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTs7QUFFZixRQUFNLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQTtBQUNwQixXQUFTLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDakIsWUF0a0JRLE1BQU0sRUFza0JQLFVBdGtCUyxPQUFPLEVBc2tCUixVQUFVLENBQUMsQ0FBQyxDQUFBO0FBQzNCLFVBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQTtBQUN6QixTQUFPLFFBQVEsQ0FBQTtFQUNmOztBQUVELE9BQU0sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQy9CLE9BQ0MsU0FBUyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUM7T0FDbkIsU0FBUyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUM7T0FDcEIsUUFBUSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUM7T0FDbEIsSUFBSSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUM7T0FDZCxHQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQztPQUNiLEtBQUssR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDO09BQ2YsVUFBVSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUM7T0FDcEIsWUFBWSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUM7T0FDdEIsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQztPQUMxQixLQUFLLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQztPQUNmLEtBQUssR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDO09BQ2YsR0FBRyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUM7T0FDYixLQUFLLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQztPQUNmLElBQUksR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDO09BQ2QsTUFBTSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUM7T0FDaEIsT0FBTyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUM7T0FDakIsT0FBTyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUM7T0FDakIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUM7T0FDWixFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQztPQUNaLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDO09BQ1osRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUM7T0FDWixFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQztPQUNaLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDO09BQ1osRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUM7T0FDWixFQUFFLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQztPQUNaLEVBQUUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDO09BQ1osRUFBRSxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUM7T0FDWixPQUFPLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztPQUNsQixTQUFTLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQztPQUNuQixXQUFXLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQztPQUNyQixlQUFlLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQztPQUN6QixPQUFPLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQztPQUNqQixLQUFLLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQztPQUNmLFNBQVMsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDO09BQ25CLEtBQUssR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDO09BQ2YsR0FBRyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUM7T0FDZCxLQUFLLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQztPQUNmLFVBQVUsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDO09BQ3BCLElBQUksR0FBRyxFQUFFLENBQUMsUUFBSSxDQUFDLENBQUE7O0FBRWhCLE9BQ0MsUUFBUSxHQUFHLElBQUksSUFBSSxrQkE3bkJYLElBQUksRUE2bkJZLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7T0FDbEQsU0FBUyxHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sS0FBSztBQUM5QixNQUFJLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQTtBQUMxQixPQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFDMUMsR0FBRyxHQUFHLENBQUMsR0FBRSxHQUFHLEVBQUMsS0FBSyxHQUFFLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUE7QUFDNUMsS0FBRyxHQUFHLENBQUMsR0FBRSxHQUFHLEVBQUMsUUFBUSxHQUFFLENBQUMsTUFBTSxFQUFDLGtCQUFrQixHQUFFLE1BQU0sRUFBQyxHQUFHLENBQUMsQ0FBQTtBQUM5RCxTQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUE7RUFDMUI7T0FDRCxPQUFPLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQztPQUNqQyxlQUFlLEdBQUcsU0FBUyxXQXBvQm5CLGlCQUFpQixFQW9vQnNCLElBQUksQ0FBQztPQUNwRCxpQkFBaUIsR0FBRyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUEiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvbGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvYywgeyBQb3MsIFN0YXJ0TGluZSwgU3RhcnRQb3MsIFN0YXJ0Q29sdW1uLCBzaW5nbGVDaGFyTG9jIH0gZnJvbSAnZXNhc3QvZGlzdC9Mb2MnXG5pbXBvcnQgeyBjb2RlIH0gZnJvbSAnLi4vQ29tcGlsZUVycm9yJ1xuaW1wb3J0IHsgTnVtYmVyTGl0ZXJhbCB9IGZyb20gJy4uL01zQXN0J1xuaW1wb3J0IHsgTm9uTmFtZUNoYXJhY3RlcnMgfSBmcm9tICcuL2xhbmd1YWdlJ1xuaW1wb3J0IHsgRG90TmFtZSwgR3JvdXAsIEdfQmxvY2ssIEdfQnJhY2tldCwgR19MaW5lLCBHX1BhcmVudGhlc2lzLCBHX1NwYWNlLCBHX1F1b3RlLFxuXHRpc0tleXdvcmQsIEtleXdvcmQsIEtXX0Fzc2lnbk11dGFibGUsIEtXX0VsbGlwc2lzLCBLV19Gb2N1cywgS1dfRnVuLCBLV19GdW5EbywgS1dfRnVuR2VuLFxuXHRLV19GdW5HZW5EbywgS1dfRnVuVGhpcywgS1dfRnVuVGhpc0RvLCBLV19GdW5UaGlzR2VuLCBLV19GdW5UaGlzR2VuRG8sIEtXX0xhenksIEtXX0xvY2FsTXV0YXRlLFxuXHRLV19PYmpBc3NpZ24sIEtXX1JlZ2lvbiwgS1dfVHlwZSwgTmFtZSwgb3BLZXl3b3JkS2luZEZyb21OYW1lLCBzaG93R3JvdXBLaW5kIH0gZnJvbSAnLi9Ub2tlbidcbmltcG9ydCB7IGFzc2VydCwgaXNFbXB0eSwgbGFzdCB9IGZyb20gJy4vdXRpbCdcblxuLypcblRoaXMgcHJvZHVjZXMgdGhlIFRva2VuIHRyZWUgKHNlZSBUb2tlbi5qcykuXG4qL1xuZXhwb3J0IGRlZmF1bHQgKGNvbnRleHQsIHNvdXJjZVN0cmluZykgPT4ge1xuXHQvLyBMZXhpbmcgYWxnb3JpdGhtIHJlcXVpcmVzIHRyYWlsaW5nIG5ld2xpbmUgdG8gY2xvc2UgYW55IGJsb2Nrcy5cblx0Ly8gVXNlIGEgbnVsbC10ZXJtaW5hdGVkIHN0cmluZyBiZWNhdXNlIGl0J3MgZmFzdGVyIHRoYW4gY2hlY2tpbmcgd2hldGhlciBpbmRleCA9PT0gbGVuZ3RoLlxuXHRzb3VyY2VTdHJpbmcgPSBzb3VyY2VTdHJpbmcgKyAnXFxuXFwwJ1xuXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIEdST1VQSU5HXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIFdlIG9ubHkgZXZlciB3cml0ZSB0byB0aGUgaW5uZXJtb3N0IEdyb3VwO1xuXHQvLyB3aGVuIHdlIGNsb3NlIHRoYXQgR3JvdXAgd2UgYWRkIGl0IHRvIHRoZSBlbmNsb3NpbmcgR3JvdXAgYW5kIGNvbnRpbnVlIHdpdGggdGhhdCBvbmUuXG5cdC8vIE5vdGUgdGhhdCBgY3VyR3JvdXBgIGlzIGNvbmNlcHR1YWxseSB0aGUgdG9wIG9mIHRoZSBzdGFjaywgYnV0IGlzIG5vdCBzdG9yZWQgaW4gYHN0YWNrYC5cblx0Y29uc3QgZ3JvdXBTdGFjayA9IFsgXVxuXHRsZXQgY3VyR3JvdXBcblx0Y29uc3Rcblx0XHRhZGRUb0N1cnJlbnRHcm91cCA9IHRva2VuID0+XG5cdFx0XHRjdXJHcm91cC5zdWJUb2tlbnMucHVzaCh0b2tlbiksXG5cblx0XHQvLyBQYXVzZSB3cml0aW5nIHRvIGN1ckdyb3VwIGluIGZhdm9yIG9mIHdyaXRpbmcgdG8gYSBzdWItZ3JvdXAuXG5cdFx0Ly8gV2hlbiB0aGUgc3ViLWdyb3VwIGZpbmlzaGVzIHdlIHdpbGwgcG9wIHRoZSBzdGFjayBhbmQgcmVzdW1lIHdyaXRpbmcgdG8gaXRzIHBhcmVudC5cblx0XHRvcGVuR3JvdXAgPSAob3BlblBvcywgZ3JvdXBLaW5kKSA9PiB7XG5cdFx0XHRncm91cFN0YWNrLnB1c2goY3VyR3JvdXApXG5cdFx0XHQvLyBDb250ZW50cyB3aWxsIGJlIGFkZGVkIHRvIGJ5IGBvYC5cblx0XHRcdC8vIGN1ckdyb3VwLmxvYy5lbmQgd2lsbCBiZSB3cml0dGVuIHRvIHdoZW4gY2xvc2luZyBpdC5cblx0XHRcdGN1ckdyb3VwID0gR3JvdXAoTG9jKG9wZW5Qb3MsIG51bGwpLCBbIF0sIGdyb3VwS2luZClcblx0XHR9LFxuXG5cdFx0Ly8gQSBncm91cCBlbmRpbmcgbWF5IGNsb3NlIG11dGxpcGxlIGdyb3Vwcy5cblx0XHQvLyBGb3IgZXhhbXBsZSwgaW4gYGxvZyEgKCsgMSAxYCwgdGhlIEdfTGluZSB3aWxsIGFsc28gY2xvc2UgYSBHX1BhcmVudGhlc2lzLlxuXHRcdGNsb3NlR3JvdXBzID0gKGNsb3NlUG9zLCBjbG9zZUtpbmQpID0+IHtcblx0XHRcdC8vIGN1ckdyb3VwIGlzIGRpZmZlcmVudCBlYWNoIHRpbWUgd2UgZ28gdGhyb3VnaCB0aGUgbG9vcFxuXHRcdFx0Ly8gYmVjYXVzZSBfY2xvc2VTaW5nbGVHcm91cCBicmluZ3MgdXMgdG8gYW4gZW5jbG9zaW5nIGdyb3VwLlxuXHRcdFx0d2hpbGUgKGN1ckdyb3VwLmtpbmQgIT09IGNsb3NlS2luZCkge1xuXHRcdFx0XHRjb25zdCBjdXJLaW5kID0gY3VyR3JvdXAua2luZFxuXHRcdFx0XHQvLyBBIGxpbmUgY2FuIGNsb3NlIGEgcGFyZW50aGVzaXMsIGJ1dCBhIHBhcmVudGhlc2lzIGNhbid0IGNsb3NlIGEgbGluZSFcblx0XHRcdFx0Y29udGV4dC5jaGVjayhcblx0XHRcdFx0XHRjdXJLaW5kID09PSBHX1BhcmVudGhlc2lzIHx8IGN1cktpbmQgPT09IEdfQnJhY2tldCB8fCBjdXJLaW5kID09PSBHX1NwYWNlLFxuXHRcdFx0XHRcdGNsb3NlUG9zLCAoKSA9PlxuXHRcdFx0XHRcdGBUcnlpbmcgdG8gY2xvc2UgJHtzaG93R3JvdXBLaW5kKGNsb3NlS2luZCl9LCBgICtcblx0XHRcdFx0XHRgYnV0IGxhc3Qgb3BlbmVkIHdhcyAke3Nob3dHcm91cEtpbmQoY3VyS2luZCl9YClcblx0XHRcdFx0X2Nsb3NlU2luZ2xlR3JvdXAoY2xvc2VQb3MsIGN1ckdyb3VwLmtpbmQpXG5cdFx0XHR9XG5cdFx0XHRfY2xvc2VTaW5nbGVHcm91cChjbG9zZVBvcywgY2xvc2VLaW5kKVxuXHRcdH0sXG5cblx0XHRfY2xvc2VTaW5nbGVHcm91cCA9IChjbG9zZVBvcywgY2xvc2VLaW5kKSA9PiB7XG5cdFx0XHRsZXQganVzdENsb3NlZCA9IGN1ckdyb3VwXG5cdFx0XHRjdXJHcm91cCA9IGdyb3VwU3RhY2sucG9wKClcblx0XHRcdGp1c3RDbG9zZWQubG9jLmVuZCA9IGNsb3NlUG9zXG5cdFx0XHRzd2l0Y2ggKGNsb3NlS2luZCkge1xuXHRcdFx0XHRjYXNlIEdfU3BhY2U6IHtcblx0XHRcdFx0XHRjb25zdCBzaXplID0ganVzdENsb3NlZC5zdWJUb2tlbnMubGVuZ3RoXG5cdFx0XHRcdFx0aWYgKHNpemUgIT09IDApXG5cdFx0XHRcdFx0XHQvLyBTcGFjZWQgc2hvdWxkIGFsd2F5cyBoYXZlIGF0IGxlYXN0IHR3byBlbGVtZW50cy5cblx0XHRcdFx0XHRcdGFkZFRvQ3VycmVudEdyb3VwKHNpemUgPT09IDEgPyBqdXN0Q2xvc2VkLnN1YlRva2Vuc1swXSA6IGp1c3RDbG9zZWQpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXNlIEdfTGluZTpcblx0XHRcdFx0XHQvLyBMaW5lIG11c3QgaGF2ZSBjb250ZW50LlxuXHRcdFx0XHRcdC8vIFRoaXMgY2FuIGhhcHBlbiBpZiB0aGVyZSB3YXMganVzdCBhIGNvbW1lbnQuXG5cdFx0XHRcdFx0aWYgKCFpc0VtcHR5KGp1c3RDbG9zZWQuc3ViVG9rZW5zKSlcblx0XHRcdFx0XHRcdGFkZFRvQ3VycmVudEdyb3VwKGp1c3RDbG9zZWQpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0Y2FzZSBHX0Jsb2NrOlxuXHRcdFx0XHRcdGNvbnRleHQuY2hlY2soIWlzRW1wdHkoanVzdENsb3NlZC5zdWJUb2tlbnMpLCBjbG9zZVBvcywgJ0VtcHR5IGJsb2NrLicpXG5cdFx0XHRcdFx0YWRkVG9DdXJyZW50R3JvdXAoanVzdENsb3NlZClcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdGFkZFRvQ3VycmVudEdyb3VwKGp1c3RDbG9zZWQpXG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdG9wZW5QYXJlbnRoZXNpcyA9IGxvYyA9PiB7XG5cdFx0XHRvcGVuR3JvdXAobG9jLnN0YXJ0LCBHX1BhcmVudGhlc2lzKVxuXHRcdFx0b3Blbkdyb3VwKGxvYy5lbmQsIEdfU3BhY2UpXG5cdFx0fSxcblxuXHRcdG9wZW5CcmFja2V0ID0gbG9jID0+IHtcblx0XHRcdG9wZW5Hcm91cChsb2Muc3RhcnQsIEdfQnJhY2tldClcblx0XHRcdG9wZW5Hcm91cChsb2MuZW5kLCBHX1NwYWNlKVxuXHRcdH0sXG5cblx0XHQvLyBXaGVuIHN0YXJ0aW5nIGEgbmV3IGxpbmUsIGEgc3BhY2VkIGdyb3VwIGlzIGNyZWF0ZWQgaW1wbGljaXRseS5cblx0XHRvcGVuTGluZSA9IHBvcyA9PiB7XG5cdFx0XHRvcGVuR3JvdXAocG9zLCBHX0xpbmUpXG5cdFx0XHRvcGVuR3JvdXAocG9zLCBHX1NwYWNlKVxuXHRcdH0sXG5cblx0XHRjbG9zZUxpbmUgPSBwb3MgPT4ge1xuXHRcdFx0Y2xvc2VHcm91cHMocG9zLCBHX1NwYWNlKVxuXHRcdFx0Y2xvc2VHcm91cHMocG9zLCBHX0xpbmUpXG5cdFx0fSxcblxuXHRcdC8vIFdoZW4gZW5jb3VudGVyaW5nIGEgc3BhY2UsIGl0IGJvdGggY2xvc2VzIGFuZCBvcGVucyBhIHNwYWNlZCBncm91cC5cblx0XHRzcGFjZSA9IGxvYyA9PiB7XG5cdFx0XHRjbG9zZUdyb3Vwcyhsb2Muc3RhcnQsIEdfU3BhY2UpXG5cdFx0XHRvcGVuR3JvdXAobG9jLmVuZCwgR19TcGFjZSlcblx0XHR9XG5cblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gSVRFUkFUSU5HIFRIUk9VR0ggU09VUkNFU1RSSU5HXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8qXG5cdFRoZXNlIGFyZSBrZXB0IHVwLXRvLWRhdGUgYXMgd2UgaXRlcmF0ZSB0aHJvdWdoIHNvdXJjZVN0cmluZy5cblx0RXZlcnkgYWNjZXNzIHRvIGluZGV4IGhhcyBjb3JyZXNwb25kaW5nIGNoYW5nZXMgdG8gbGluZSBhbmQvb3IgY29sdW1uLlxuXHRUaGlzIGFsc28gZXhwbGFpbnMgd2h5IHRoZXJlIGFyZSBkaWZmZXJlbnQgZnVuY3Rpb25zIGZvciBuZXdsaW5lcyB2cyBvdGhlciBjaGFyYWN0ZXJzLlxuXHQqL1xuXHRsZXQgaW5kZXggPSAwLCBsaW5lID0gU3RhcnRMaW5lLCBjb2x1bW4gPSBTdGFydENvbHVtblxuXG5cdC8qXG5cdE5PVEU6IFdlIHVzZSBjaGFyYWN0ZXIgKmNvZGVzKiBmb3IgZXZlcnl0aGluZy5cblx0Q2hhcmFjdGVycyBhcmUgb2YgdHlwZSBOdW1iZXIgYW5kIG5vdCBqdXN0IFN0cmluZ3Mgb2YgbGVuZ3RoIG9uZS5cblx0Ki9cblx0Y29uc3Rcblx0XHRwb3MgPSAoKSA9PiBQb3MobGluZSwgY29sdW1uKSxcblxuXHRcdHBlZWsgPSAoKSA9PiBzb3VyY2VTdHJpbmcuY2hhckNvZGVBdChpbmRleCksXG5cdFx0cGVla05leHQgPSAoKSA9PiBzb3VyY2VTdHJpbmcuY2hhckNvZGVBdChpbmRleCArIDEpLFxuXG5cdFx0Ly8gTWF5IGVhdCBhIE5ld2xpbmUuXG5cdFx0Ly8gSWYgdGhhdCBoYXBwZW5zLCBsaW5lIGFuZCBjb2x1bW4gd2lsbCB0ZW1wb3JhcmlseSBiZSB3cm9uZyxcblx0XHQvLyBidXQgd2UgaGFuZGxlIGl0IGluIHRoYXQgc3BlY2lhbCBjYXNlIChyYXRoZXIgdGhhbiBjaGVja2luZyBmb3IgTmV3bGluZSBldmVyeSB0aW1lKS5cblx0XHRlYXQgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBjaGFyID0gc291cmNlU3RyaW5nLmNoYXJDb2RlQXQoaW5kZXgpXG5cdFx0XHRpbmRleCA9IGluZGV4ICsgMVxuXHRcdFx0Y29sdW1uID0gY29sdW1uICsgMVxuXHRcdFx0cmV0dXJuIGNoYXJcblx0XHR9LFxuXHRcdHNraXAgPSBlYXQsXG5cblx0XHQvLyBjaGFyVG9FYXQgbXVzdCBub3QgYmUgTmV3bGluZS5cblx0XHR0cnlFYXQgPSBjaGFyVG9FYXQgPT4ge1xuXHRcdFx0Y29uc3QgY2FuRWF0ID0gcGVlaygpID09PSBjaGFyVG9FYXRcblx0XHRcdGlmIChjYW5FYXQpIHtcblx0XHRcdFx0aW5kZXggPSBpbmRleCArIDFcblx0XHRcdFx0Y29sdW1uID0gY29sdW1uICsgMVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGNhbkVhdFxuXHRcdH0sXG5cblx0XHRtdXN0RWF0ID0gKGNoYXJUb0VhdCwgcHJlY2VkZWRCeSkgPT4ge1xuXHRcdFx0Y29uc3QgY2FuRWF0ID0gdHJ5RWF0KGNoYXJUb0VhdClcblx0XHRcdGNvbnRleHQuY2hlY2soY2FuRWF0LCBwb3MsICgpID0+XG5cdFx0XHRcdGAke2NvZGUocHJlY2VkZWRCeSl9IG11c3QgYmUgZm9sbG93ZWQgYnkgJHtzaG93Q2hhcihjaGFyVG9FYXQpfWApXG5cdFx0fSxcblxuXHRcdHRyeUVhdE5ld2xpbmUgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBjYW5FYXQgPSBwZWVrKCkgPT09IE5ld2xpbmVcblx0XHRcdGlmIChjYW5FYXQpIHtcblx0XHRcdFx0aW5kZXggPSBpbmRleCArIDFcblx0XHRcdFx0bGluZSA9IGxpbmUgKyAxXG5cdFx0XHRcdGNvbHVtbiA9IFN0YXJ0Q29sdW1uXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gY2FuRWF0XG5cdFx0fSxcblxuXHRcdC8vIENhbGxlciBtdXN0IGVuc3VyZSB0aGF0IGJhY2tpbmcgdXAgbkNoYXJzVG9CYWNrVXAgY2hhcmFjdGVycyBicmluZ3MgdXMgdG8gb2xkUG9zLlxuXHRcdHN0ZXBCYWNrTWFueSA9IChvbGRQb3MsIG5DaGFyc1RvQmFja1VwKSA9PiB7XG5cdFx0XHRpbmRleCA9IGluZGV4IC0gbkNoYXJzVG9CYWNrVXBcblx0XHRcdGxpbmUgPSBvbGRQb3MubGluZVxuXHRcdFx0Y29sdW1uID0gb2xkUG9zLmNvbHVtblxuXHRcdH0sXG5cblx0XHQvLyBGb3IgdGFrZVdoaWxlLCB0YWtlV2hpbGVXaXRoUHJldiwgYW5kIHNraXBXaGlsZUVxdWFscyxcblx0XHQvLyBjaGFyYWN0ZXJQcmVkaWNhdGUgbXVzdCAqbm90KiBhY2NlcHQgTmV3bGluZS5cblx0XHQvLyBPdGhlcndpc2UgdGhlcmUgbWF5IGJlIGFuIGluZmluaXRlIGxvb3AhXG5cdFx0dGFrZVdoaWxlID0gY2hhcmFjdGVyUHJlZGljYXRlID0+IHtcblx0XHRcdGNvbnN0IHN0YXJ0SW5kZXggPSBpbmRleFxuXHRcdFx0X3NraXBXaGlsZShjaGFyYWN0ZXJQcmVkaWNhdGUpXG5cdFx0XHRyZXR1cm4gc291cmNlU3RyaW5nLnNsaWNlKHN0YXJ0SW5kZXgsIGluZGV4KVxuXHRcdH0sXG5cblx0XHR0YWtlV2hpbGVXaXRoUHJldiA9IGNoYXJhY3RlclByZWRpY2F0ZSA9PiB7XG5cdFx0XHRjb25zdCBzdGFydEluZGV4ID0gaW5kZXhcblx0XHRcdF9za2lwV2hpbGUoY2hhcmFjdGVyUHJlZGljYXRlKVxuXHRcdFx0cmV0dXJuIHNvdXJjZVN0cmluZy5zbGljZShzdGFydEluZGV4IC0gMSwgaW5kZXgpXG5cdFx0fSxcblxuXHRcdHNraXBXaGlsZUVxdWFscyA9IGNoYXIgPT5cblx0XHRcdF9za2lwV2hpbGUoXyA9PiBfID09PSBjaGFyKSxcblxuXHRcdHNraXBSZXN0T2ZMaW5lID0gKCkgPT5cblx0XHRcdF9za2lwV2hpbGUoXyA9PiBfICE9PSBOZXdsaW5lKSxcblxuXHRcdF9za2lwV2hpbGUgPSBjaGFyYWN0ZXJQcmVkaWNhdGUgPT4ge1xuXHRcdFx0Y29uc3Qgc3RhcnRJbmRleCA9IGluZGV4XG5cdFx0XHR3aGlsZSAoY2hhcmFjdGVyUHJlZGljYXRlKHBlZWsoKSkpXG5cdFx0XHRcdGluZGV4ID0gaW5kZXggKyAxXG5cdFx0XHRjb25zdCBkaWZmID0gaW5kZXggLSBzdGFydEluZGV4XG5cdFx0XHRjb2x1bW4gPSBjb2x1bW4gKyBkaWZmXG5cdFx0XHRyZXR1cm4gZGlmZlxuXHRcdH0sXG5cblx0XHQvLyBDYWxsZWQgYWZ0ZXIgc2VlaW5nIHRoZSBmaXJzdCBuZXdsaW5lLlxuXHRcdC8vIFJldHVybnMgIyB0b3RhbCBuZXdsaW5lcywgaW5jbHVkaW5nIHRoZSBmaXJzdC5cblx0XHRza2lwTmV3bGluZXMgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBzdGFydExpbmUgPSBsaW5lXG5cdFx0XHRsaW5lID0gbGluZSArIDFcblx0XHRcdHdoaWxlIChwZWVrKCkgPT09IE5ld2xpbmUpIHtcblx0XHRcdFx0aW5kZXggPSBpbmRleCArIDFcblx0XHRcdFx0bGluZSA9IGxpbmUgKyAxXG5cdFx0XHR9XG5cdFx0XHRjb2x1bW4gPSBTdGFydENvbHVtblxuXHRcdFx0cmV0dXJuIGxpbmUgLSBzdGFydExpbmVcblx0XHR9XG5cblx0Ly8gU3ByaW5rbGUgY2hlY2tQb3MoKSBhcm91bmQgdG8gZGVidWcgbGluZSBhbmQgY29sdW1uIHRyYWNraW5nIGVycm9ycy5cblx0Lypcblx0Y29uc3Rcblx0XHRjaGVja1BvcyA9ICgpID0+IHtcblx0XHRcdGNvbnN0IHAgPSBfZ2V0Q29ycmVjdFBvcygpXG5cdFx0XHRpZiAocC5saW5lICE9PSBsaW5lIHx8IHAuY29sdW1uICE9PSBjb2x1bW4pXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihgaW5kZXg6ICR7aW5kZXh9LCB3cm9uZzogJHtQb3MobGluZSwgY29sdW1uKX0sIHJpZ2h0OiAke3B9YClcblx0XHR9LFxuXHRcdF9pbmRleFRvUG9zID0gbmV3IE1hcCgpLFxuXHRcdF9nZXRDb3JyZWN0UG9zID0gKCkgPT4ge1xuXHRcdFx0aWYgKGluZGV4ID09PSAwKVxuXHRcdFx0XHRyZXR1cm4gUG9zKFN0YXJ0TGluZSwgU3RhcnRDb2x1bW4pXG5cblx0XHRcdGxldCBvbGRQb3MsIG9sZEluZGV4XG5cdFx0XHRmb3IgKG9sZEluZGV4ID0gaW5kZXggLSAxOyA7IG9sZEluZGV4ID0gb2xkSW5kZXggLSAxKSB7XG5cdFx0XHRcdG9sZFBvcyA9IF9pbmRleFRvUG9zLmdldChvbGRJbmRleClcblx0XHRcdFx0aWYgKG9sZFBvcyAhPT0gdW5kZWZpbmVkKVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdGFzc2VydChvbGRJbmRleCA+PSAwKVxuXHRcdFx0fVxuXHRcdFx0bGV0IG5ld0xpbmUgPSBvbGRQb3MubGluZSwgbmV3Q29sdW1uID0gb2xkUG9zLmNvbHVtblxuXHRcdFx0Zm9yICg7IG9sZEluZGV4IDwgaW5kZXg7IG9sZEluZGV4ID0gb2xkSW5kZXggKyAxKVxuXHRcdFx0XHRpZiAoc291cmNlU3RyaW5nLmNoYXJDb2RlQXQob2xkSW5kZXgpID09PSBOZXdsaW5lKSB7XG5cdFx0XHRcdFx0bmV3TGluZSA9IG5ld0xpbmUgKyAxXG5cdFx0XHRcdFx0bmV3Q29sdW1uID0gU3RhcnRDb2x1bW5cblx0XHRcdFx0fSBlbHNlXG5cdFx0XHRcdFx0bmV3Q29sdW1uID0gbmV3Q29sdW1uICsgMVxuXG5cdFx0XHRjb25zdCBwID0gUG9zKG5ld0xpbmUsIG5ld0NvbHVtbilcblx0XHRcdF9pbmRleFRvUG9zLnNldChpbmRleCwgcClcblx0XHRcdHJldHVybiBwXG5cdFx0fVxuXHQqL1xuXG5cdC8qXG5cdEluIHRoZSBjYXNlIG9mIHF1b3RlIGludGVycG9sYXRpb24gKFwiYXtifWNcIikgd2UnbGwgcmVjdXJzZSBiYWNrIGludG8gaGVyZS5cblx0V2hlbiBpc0luUXVvdGUgaXMgdHJ1ZSwgd2Ugd2lsbCBub3QgYWxsb3cgbmV3bGluZXMuXG5cdCovXG5cdGNvbnN0IGxleFBsYWluID0gaXNJblF1b3RlID0+IHtcblx0XHQvLyBUaGlzIHRlbGxzIHVzIHdoaWNoIGluZGVudGVkIGJsb2NrIHdlJ3JlIGluLlxuXHRcdC8vIEluY3JlbWVudGluZyBpdCBtZWFucyBpc3N1aW5nIGEgR1BfT3BlbkJsb2NrIGFuZCBkZWNyZW1lbnRpbmcgaXQgbWVhbnMgYSBHUF9DbG9zZUJsb2NrLlxuXHRcdC8vIERvZXMgbm90aGluZyBpZiBpc0luUXVvdGUuXG5cdFx0bGV0IGluZGVudCA9IDBcblxuXHRcdC8vIE1ha2UgY2xvc3VyZXMgbm93IHJhdGhlciB0aGFuIGluc2lkZSB0aGUgbG9vcC5cblx0XHQvLyBUaGlzIGlzIHNpZ25pZmljYW50bHkgZmFzdGVyIGFzIG9mIG5vZGUgdjAuMTEuMTQuXG5cblx0XHQvLyBUaGlzIGlzIHdoZXJlIHdlIHN0YXJ0ZWQgbGV4aW5nIHRoZSBjdXJyZW50IHRva2VuLlxuXHRcdGxldCBzdGFydENvbHVtblxuXHRcdGNvbnN0XG5cdFx0XHRzdGFydFBvcyA9ICgpID0+IFBvcyhsaW5lLCBzdGFydENvbHVtbiksXG5cdFx0XHRsb2MgPSAoKSA9PiBMb2Moc3RhcnRQb3MoKSwgcG9zKCkpLFxuXHRcdFx0a2V5d29yZCA9IGtpbmQgPT5cblx0XHRcdFx0YWRkVG9DdXJyZW50R3JvdXAoS2V5d29yZChsb2MoKSwga2luZCkpLFxuXHRcdFx0ZnVuS2V5d29yZCA9IGtpbmQgPT4ge1xuXHRcdFx0XHRrZXl3b3JkKGtpbmQpXG5cdFx0XHRcdHNwYWNlKGxvYygpKVxuXHRcdFx0fSxcblx0XHRcdGVhdEFuZEFkZE51bWJlciA9ICgpID0+IHtcblx0XHRcdFx0Ly8gVE9ETzogQSByZWFsIG51bWJlciBsaXRlcmFsIGxleGVyLCBub3QganVzdCBKYXZhU2NyaXB0J3MuLi5cblx0XHRcdFx0Y29uc3QgbnVtYmVyU3RyaW5nID0gdGFrZVdoaWxlV2l0aFByZXYoaXNOdW1iZXJDaGFyYWN0ZXIpXG5cdFx0XHRcdGNvbnN0IG51bWJlciA9IE51bWJlcihudW1iZXJTdHJpbmcpXG5cdFx0XHRcdGNvbnRleHQuY2hlY2soIU51bWJlci5pc05hTihudW1iZXIpLCBwb3MsICgpID0+XG5cdFx0XHRcdFx0YEludmFsaWQgbnVtYmVyIGxpdGVyYWwgJHtjb2RlKG51bWJlclN0cmluZyl9YClcblx0XHRcdFx0YWRkVG9DdXJyZW50R3JvdXAoTnVtYmVyTGl0ZXJhbChsb2MoKSwgbnVtYmVyKSlcblx0XHRcdH1cblxuXHRcdGNvbnN0IGhhbmRsZU5hbWUgPSAoKSA9PiB7XG5cdFx0XHQvLyBBbGwgb3RoZXIgY2hhcmFjdGVycyBzaG91bGQgYmUgaGFuZGxlZCBpbiBhIGNhc2UgYWJvdmUuXG5cdFx0XHRjb25zdCBuYW1lID0gdGFrZVdoaWxlV2l0aFByZXYoaXNOYW1lQ2hhcmFjdGVyKVxuXHRcdFx0Y29uc3Qga2V5d29yZEtpbmQgPSBvcEtleXdvcmRLaW5kRnJvbU5hbWUobmFtZSlcblx0XHRcdGlmIChrZXl3b3JkS2luZCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGNvbnRleHQuY2hlY2soa2V5d29yZEtpbmQgIT09IC0xLCBwb3MsICgpID0+XG5cdFx0XHRcdFx0YFJlc2VydmVkIG5hbWUgJHtjb2RlKG5hbWUpfWApXG5cdFx0XHRcdGlmIChrZXl3b3JkS2luZCA9PT0gS1dfUmVnaW9uKVxuXHRcdFx0XHRcdC8vIFRPRE86IEVhdCBhbmQgcHV0IGl0IGluIFJlZ2lvbiBleHByZXNzaW9uXG5cdFx0XHRcdFx0c2tpcFJlc3RPZkxpbmUoKVxuXHRcdFx0XHRrZXl3b3JkKGtleXdvcmRLaW5kKVxuXHRcdFx0fSBlbHNlXG5cdFx0XHRcdGFkZFRvQ3VycmVudEdyb3VwKE5hbWUobG9jKCksIG5hbWUpKVxuXHRcdH1cblxuXHRcdHdoaWxlICh0cnVlKSB7XG5cdFx0XHRzdGFydENvbHVtbiA9IGNvbHVtblxuXHRcdFx0Y29uc3QgY2hhcmFjdGVyRWF0ZW4gPSBlYXQoKVxuXHRcdFx0Ly8gR2VuZXJhbGx5LCB0aGUgdHlwZSBvZiBhIHRva2VuIGlzIGRldGVybWluZWQgYnkgdGhlIGZpcnN0IGNoYXJhY3Rlci5cblx0XHRcdHN3aXRjaCAoY2hhcmFjdGVyRWF0ZW4pIHtcblx0XHRcdFx0Y2FzZSBaZXJvOlxuXHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHRjYXNlIENsb3NlQnJhY2U6XG5cdFx0XHRcdFx0Y29udGV4dC5jaGVjayhpc0luUXVvdGUsIGxvYywgKCkgPT5cblx0XHRcdFx0XHRcdGBSZXNlcnZlZCBjaGFyYWN0ZXIgJHtzaG93Q2hhcihDbG9zZUJyYWNlKX1gKVxuXHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHRjYXNlIFF1b3RlOlxuXHRcdFx0XHRcdGxleFF1b3RlKGluZGVudClcblx0XHRcdFx0XHRicmVha1xuXG5cdFx0XHRcdC8vIEdST1VQU1xuXG5cdFx0XHRcdGNhc2UgT3BlblBhcmVudGhlc2lzOlxuXHRcdFx0XHRcdG9wZW5QYXJlbnRoZXNpcyhsb2MoKSlcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRjYXNlIE9wZW5CcmFja2V0OlxuXHRcdFx0XHRcdG9wZW5CcmFja2V0KGxvYygpKVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdGNhc2UgQ2xvc2VQYXJlbnRoZXNpczpcblx0XHRcdFx0XHRjbG9zZUdyb3Vwcyhwb3MoKSwgR19QYXJlbnRoZXNpcylcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRjYXNlIENsb3NlQnJhY2tldDpcblx0XHRcdFx0XHRjbG9zZUdyb3Vwcyhwb3MoKSwgR19CcmFja2V0KVxuXHRcdFx0XHRcdGJyZWFrXG5cblx0XHRcdFx0Y2FzZSBTcGFjZToge1xuXHRcdFx0XHRcdGNvbnN0IG5leHQgPSBwZWVrKClcblx0XHRcdFx0XHRjb250ZXh0Lndhcm5JZihuZXh0ID09PSBTcGFjZSwgbG9jLCAnTXVsdGlwbGUgc3BhY2VzIGluIGEgcm93LicpXG5cdFx0XHRcdFx0Y29udGV4dC53YXJuSWYobmV4dCA9PT0gTmV3bGluZSwgbG9jLCAnTGluZSBlbmRzIGluIGEgc3BhY2UuJylcblx0XHRcdFx0XHRzcGFjZShsb2MoKSlcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y2FzZSBOZXdsaW5lOiB7XG5cdFx0XHRcdFx0Y29udGV4dC5jaGVjayghaXNJblF1b3RlLCBsb2MsICdRdW90ZSBpbnRlcnBvbGF0aW9uIGNhbm5vdCBjb250YWluIG5ld2xpbmUnKVxuXG5cdFx0XHRcdFx0Ly8gU2tpcCBhbnkgYmxhbmsgbGluZXMuXG5cdFx0XHRcdFx0c2tpcE5ld2xpbmVzKClcblx0XHRcdFx0XHRjb25zdCBvbGRJbmRlbnQgPSBpbmRlbnRcblx0XHRcdFx0XHRpbmRlbnQgPSBza2lwV2hpbGVFcXVhbHMoVGFiKVxuXHRcdFx0XHRcdGNvbnRleHQuY2hlY2socGVlaygpICE9PSBTcGFjZSwgcG9zLCAnTGluZSBiZWdpbnMgaW4gYSBzcGFjZScpXG5cdFx0XHRcdFx0aWYgKGluZGVudCA8PSBvbGRJbmRlbnQpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGwgPSBsb2MoKVxuXHRcdFx0XHRcdFx0Zm9yIChsZXQgaSA9IGluZGVudDsgaSA8IG9sZEluZGVudDsgaSA9IGkgKyAxKSB7XG5cdFx0XHRcdFx0XHRcdGNsb3NlTGluZShsLnN0YXJ0KVxuXHRcdFx0XHRcdFx0XHRjbG9zZUdyb3VwcyhsLmVuZCwgR19CbG9jaylcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNsb3NlTGluZShsLnN0YXJ0KVxuXHRcdFx0XHRcdFx0b3BlbkxpbmUobC5lbmQpXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNvbnRleHQuY2hlY2soaW5kZW50ID09PSBvbGRJbmRlbnQgKyAxLCBsb2MsXG5cdFx0XHRcdFx0XHRcdCdMaW5lIGlzIGluZGVudGVkIG1vcmUgdGhhbiBvbmNlJylcblx0XHRcdFx0XHRcdC8vIEJsb2NrIGF0IGVuZCBvZiBsaW5lIGdvZXMgaW4gaXRzIG93biBzcGFjZWQgZ3JvdXAuXG5cdFx0XHRcdFx0XHQvLyBIb3dldmVyLCBgfmAgcHJlY2VkaW5nIGEgYmxvY2sgZ29lcyBpbiBhIGdyb3VwIHdpdGggaXQuXG5cdFx0XHRcdFx0XHRpZiAoaXNFbXB0eShjdXJHcm91cC5zdWJUb2tlbnMpIHx8XG5cdFx0XHRcdFx0XHRcdCFpc0tleXdvcmQoS1dfTGF6eSwgbGFzdChjdXJHcm91cC5zdWJUb2tlbnMpKSlcblx0XHRcdFx0XHRcdFx0c3BhY2UobG9jKCkpXG5cdFx0XHRcdFx0XHRvcGVuR3JvdXAobG9jKCkuc3RhcnQsIEdfQmxvY2spXG5cdFx0XHRcdFx0XHRvcGVuTGluZShsb2MoKS5lbmQpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdH1cblx0XHRcdFx0Y2FzZSBUYWI6XG5cdFx0XHRcdFx0Ly8gV2UgYWx3YXlzIGVhdCB0YWJzIGluIHRoZSBOZXdsaW5lIGhhbmRsZXIsXG5cdFx0XHRcdFx0Ly8gc28gdGhpcyB3aWxsIG9ubHkgaGFwcGVuIGluIHRoZSBtaWRkbGUgb2YgYSBsaW5lLlxuXHRcdFx0XHRcdGNvbnRleHQuZmFpbChsb2MoKSwgJ1RhYiBtYXkgb25seSBiZSB1c2VkIHRvIGluZGVudCcpXG5cblx0XHRcdFx0Ly8gRlVOXG5cblx0XHRcdFx0Y2FzZSBCYW5nOlxuXHRcdFx0XHRcdGlmICh0cnlFYXQoQmFyKSlcblx0XHRcdFx0XHRcdGZ1bktleXdvcmQoS1dfRnVuRG8pXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0aGFuZGxlTmFtZSgpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0Y2FzZSBUaWxkZTpcblx0XHRcdFx0XHRpZiAodHJ5RWF0KEJhbmcpKSB7XG5cdFx0XHRcdFx0XHRtdXN0RWF0KEJhciwgJ34hJylcblx0XHRcdFx0XHRcdGZ1bktleXdvcmQoS1dfRnVuR2VuRG8pXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0cnlFYXQoQmFyKSlcblx0XHRcdFx0XHRcdGZ1bktleXdvcmQoS1dfRnVuR2VuKVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdGtleXdvcmQoS1dfTGF6eSlcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRjYXNlIEJhcjpcblx0XHRcdFx0XHRrZXl3b3JkKEtXX0Z1bilcblx0XHRcdFx0XHQvLyBGaXJzdCBhcmcgaW4gaXRzIG93biBzcGFjZWQgZ3JvdXBcblx0XHRcdFx0XHRzcGFjZShsb2MoKSlcblx0XHRcdFx0XHRicmVha1xuXG5cdFx0XHRcdC8vIE5VTUJFUlxuXG5cdFx0XHRcdGNhc2UgSHlwaGVuOlxuXHRcdFx0XHRcdGlmIChpc0RpZ2l0KHBlZWsoKSkpXG5cdFx0XHRcdFx0XHQvLyBlYXROdW1iZXIoKSBsb29rcyBhdCBwcmV2IGNoYXJhY3Rlciwgc28gaHlwaGVuIGluY2x1ZGVkLlxuXHRcdFx0XHRcdFx0ZWF0QW5kQWRkTnVtYmVyKClcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRoYW5kbGVOYW1lKClcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRjYXNlIE4wOiBjYXNlIE4xOiBjYXNlIE4yOiBjYXNlIE4zOiBjYXNlIE40OlxuXHRcdFx0XHRjYXNlIE41OiBjYXNlIE42OiBjYXNlIE43OiBjYXNlIE44OiBjYXNlIE45OlxuXHRcdFx0XHRcdGVhdEFuZEFkZE51bWJlcigpXG5cdFx0XHRcdFx0YnJlYWtcblxuXG5cdFx0XHRcdC8vIE9USEVSXG5cblx0XHRcdFx0Y2FzZSBIYXNoOlxuXHRcdFx0XHRcdGlmICh0cnlFYXQoSGFzaCkpIHtcblx0XHRcdFx0XHRcdC8vIE11bHRpLWxpbmUgY29tbWVudFxuXHRcdFx0XHRcdFx0bXVzdEVhdChIYXNoLCAnIyMnKVxuXHRcdFx0XHRcdFx0d2hpbGUgKHRydWUpXG5cdFx0XHRcdFx0XHRcdGlmIChlYXQoKSA9PT0gSGFzaCAmJiBlYXQoKSA9PT0gSGFzaCAmJiBlYXQoKSA9PT0gSGFzaCkge1xuXHRcdFx0XHRcdFx0XHRcdGNvbnN0IG5sID0gdHJ5RWF0KE5ld2xpbmUpXG5cdFx0XHRcdFx0XHRcdFx0Y29udGV4dC5jaGVjayhubCwgbG9jLCAoKSA9PlxuXHRcdFx0XHRcdFx0XHRcdFx0YCNDbG9zaW5nIHtjb2RlKCcjIyMnKX0gbXVzdCBiZSBmb2xsb3dlZCBieSBuZXdsaW5lLmApXG5cdFx0XHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQvLyBTaW5nbGUtbGluZSBjb21tZW50XG5cdFx0XHRcdFx0XHRpZiAoISh0cnlFYXQoU3BhY2UpIHx8IHRyeUVhdChUYWIpKSlcblx0XHRcdFx0XHRcdFx0Y29udGV4dC5mYWlsKGxvYywgKCkgPT5cblx0XHRcdFx0XHRcdFx0XHRgJHtjb2RlKCcjJyl9IG11c3QgYmUgZm9sbG93ZWQgYnkgc3BhY2Ugb3IgdGFiLmApXG5cdFx0XHRcdFx0XHRza2lwUmVzdE9mTGluZSgpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrXG5cblx0XHRcdFx0Y2FzZSBEb3Q6IHtcblx0XHRcdFx0XHRjb25zdCBuZXh0ID0gcGVlaygpXG5cdFx0XHRcdFx0aWYgKG5leHQgPT09IFNwYWNlIHx8IG5leHQgPT09IE5ld2xpbmUpIHtcblx0XHRcdFx0XHRcdC8vIE9iakxpdCBhc3NpZ24gaW4gaXRzIG93biBzcGFjZWQgZ3JvdXAuXG5cdFx0XHRcdFx0XHQvLyBXZSBjYW4ndCBqdXN0IGNyZWF0ZSBhIG5ldyBHcm91cCBoZXJlIGJlY2F1c2Ugd2Ugd2FudCB0b1xuXHRcdFx0XHRcdFx0Ly8gZW5zdXJlIGl0J3Mgbm90IHBhcnQgb2YgdGhlIHByZWNlZGluZyBvciBmb2xsb3dpbmcgc3BhY2VkIGdyb3VwLlxuXHRcdFx0XHRcdFx0Y2xvc2VHcm91cHMoc3RhcnRQb3MoKSwgR19TcGFjZSlcblx0XHRcdFx0XHRcdGtleXdvcmQoS1dfT2JqQXNzaWduKVxuXHRcdFx0XHRcdFx0Ly8gVGhpcyBleGlzdHMgc29sZWx5IHNvIHRoYXQgdGhlIFNwYWNlIG9yIE5ld2xpbmUgaGFuZGxlciBjYW4gY2xvc2UgaXQuLi5cblx0XHRcdFx0XHRcdG9wZW5Hcm91cChwb3MoKSwgR19TcGFjZSlcblx0XHRcdFx0XHR9IGVsc2UgaWYgKG5leHQgPT09IEJhcikge1xuXHRcdFx0XHRcdFx0c2tpcCgpXG5cdFx0XHRcdFx0XHRrZXl3b3JkKEtXX0Z1blRoaXMpXG5cdFx0XHRcdFx0XHRzcGFjZShsb2MoKSlcblx0XHRcdFx0XHR9IGVsc2UgaWYgKG5leHQgPT09IEJhbmcgJiYgcGVla05leHQoKSA9PT0gQmFyKSB7XG5cdFx0XHRcdFx0XHRza2lwKClcblx0XHRcdFx0XHRcdHNraXAoKVxuXHRcdFx0XHRcdFx0a2V5d29yZChLV19GdW5UaGlzRG8pXG5cdFx0XHRcdFx0XHRzcGFjZShsb2MoKSlcblx0XHRcdFx0XHR9IGVsc2UgaWYgKG5leHQgPT09IFRpbGRlKSB7XG5cdFx0XHRcdFx0XHRza2lwKClcblx0XHRcdFx0XHRcdGlmICh0cnlFYXQoQmFuZykpIHtcblx0XHRcdFx0XHRcdFx0bXVzdEVhdChCYXIsICcufiEnKVxuXHRcdFx0XHRcdFx0XHRrZXl3b3JkKEtXX0Z1blRoaXNHZW5Ebylcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdG11c3RFYXQoQmFyLCAnLn4nKVxuXHRcdFx0XHRcdFx0XHRrZXl3b3JkKEtXX0Z1blRoaXNHZW4pXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRzcGFjZShsb2MoKSlcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Ly8gKzEgZm9yIHRoZSBkb3Qgd2UganVzdCBhdGUuXG5cdFx0XHRcdFx0XHRjb25zdCBuRG90cyA9IHNraXBXaGlsZUVxdWFscyhEb3QpICsgMVxuXHRcdFx0XHRcdFx0Y29uc3QgbmV4dCA9IHBlZWsoKVxuXHRcdFx0XHRcdFx0aWYgKG5Eb3RzID09PSAzICYmIG5leHQgPT09IFNwYWNlIHx8IG5leHQgPT09IE5ld2xpbmUpXG5cdFx0XHRcdFx0XHRcdGtleXdvcmQoS1dfRWxsaXBzaXMpXG5cdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdGFkZFRvQ3VycmVudEdyb3VwKERvdE5hbWUobG9jKCksIG5Eb3RzLCB0YWtlV2hpbGUoaXNOYW1lQ2hhcmFjdGVyKSkpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjYXNlIENvbG9uOlxuXHRcdFx0XHRcdGlmICh0cnlFYXQoQ29sb24pKSB7XG5cdFx0XHRcdFx0XHRtdXN0RWF0KEVxdWFsLCAnOjonKVxuXHRcdFx0XHRcdFx0a2V5d29yZChLV19Bc3NpZ25NdXRhYmxlKVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAodHJ5RWF0KEVxdWFsKSlcblx0XHRcdFx0XHRcdGtleXdvcmQoS1dfTG9jYWxNdXRhdGUpXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0a2V5d29yZChLV19UeXBlKVxuXHRcdFx0XHRcdGJyZWFrXG5cblx0XHRcdFx0Y2FzZSBVbmRlcnNjb3JlOlxuXHRcdFx0XHRcdGtleXdvcmQoS1dfRm9jdXMpXG5cdFx0XHRcdFx0YnJlYWtcblxuXHRcdFx0XHRjYXNlIEFtcGVyc2FuZDogY2FzZSBCYWNrc2xhc2g6IGNhc2UgQmFja3RpY2s6IGNhc2UgQ2FyZXQ6XG5cdFx0XHRcdGNhc2UgQ29tbWE6IGNhc2UgUGVyY2VudDogY2FzZSBTZW1pY29sb246XG5cdFx0XHRcdFx0Y29udGV4dC5mYWlsKGxvYywgYFJlc2VydmVkIGNoYXJhY3RlciAke3Nob3dDaGFyKGNoYXJhY3RlckVhdGVuKX1gKVxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdGhhbmRsZU5hbWUoKVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdGNvbnN0IGxleFF1b3RlID0gaW5kZW50ID0+IHtcblx0XHRjb25zdCBxdW90ZUluZGVudCA9IGluZGVudCArIDFcblxuXHRcdC8vIEluZGVudGVkIHF1b3RlIGlzIGNoYXJhY3Rlcml6ZWQgYnkgYmVpbmcgaW1tZWRpYXRlbHkgZm9sbG93ZWQgYnkgYSBuZXdsaW5lLlxuXHRcdC8vIFRoZSBuZXh0IGxpbmUgKm11c3QqIGhhdmUgc29tZSBjb250ZW50IGF0IHRoZSBuZXh0IGluZGVudGF0aW9uLlxuXHRcdGNvbnN0IGlzSW5kZW50ZWQgPSB0cnlFYXROZXdsaW5lKClcblx0XHRpZiAoaXNJbmRlbnRlZCkge1xuXHRcdFx0Y29uc3QgYWN0dWFsSW5kZW50ID0gc2tpcFdoaWxlRXF1YWxzKFRhYilcblx0XHRcdGNvbnRleHQuY2hlY2soYWN0dWFsSW5kZW50ID09PSBxdW90ZUluZGVudCwgcG9zLFxuXHRcdFx0XHQnSW5kZW50ZWQgcXVvdGUgbXVzdCBoYXZlIGV4YWN0bHkgb25lIG1vcmUgaW5kZW50IHRoYW4gcHJldmlvdXMgbGluZS4nKVxuXHRcdH1cblxuXHRcdC8vIEN1cnJlbnQgc3RyaW5nIGxpdGVyYWwgcGFydCBvZiBxdW90ZSB3ZSBhcmUgcmVhZGluZy5cblx0XHRsZXQgcmVhZCA9ICcnXG5cblx0XHRjb25zdCBtYXliZU91dHB1dFJlYWQgPSAoKSA9PiB7XG5cdFx0XHRpZiAocmVhZCAhPT0gJycpIHtcblx0XHRcdFx0YWRkVG9DdXJyZW50R3JvdXAocmVhZClcblx0XHRcdFx0cmVhZCA9ICcnXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Y29uc3QgbG9jU2luZ2xlID0gKCkgPT4gc2luZ2xlQ2hhckxvYyhwb3MoKSlcblxuXHRcdG9wZW5Hcm91cChsb2NTaW5nbGUoKS5zdGFydCwgR19RdW90ZSlcblxuXHRcdGVhdENoYXJzOiB3aGlsZSAodHJ1ZSkge1xuXHRcdFx0Y29uc3QgY2hhciA9IGVhdCgpXG5cdFx0XHRzd2l0Y2ggKGNoYXIpIHtcblx0XHRcdFx0Y2FzZSBCYWNrc2xhc2g6IHtcblx0XHRcdFx0XHRyZWFkID0gcmVhZCArIHF1b3RlRXNjYXBlKGVhdCgpKVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdH1cblx0XHRcdFx0Y2FzZSBPcGVuQnJhY2U6IHtcblx0XHRcdFx0XHRtYXliZU91dHB1dFJlYWQoKVxuXHRcdFx0XHRcdGNvbnN0IGwgPSBsb2NTaW5nbGUoKVxuXHRcdFx0XHRcdG9wZW5QYXJlbnRoZXNpcyhsKVxuXHRcdFx0XHRcdGxleFBsYWluKHRydWUpXG5cdFx0XHRcdFx0Y2xvc2VHcm91cHMobC5lbmQsIEdfUGFyZW50aGVzaXMpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXNlIE5ld2xpbmU6IHtcblx0XHRcdFx0XHRjb25zdCBvcmlnaW5hbFBvcyA9IHBvcygpXG5cdFx0XHRcdFx0Ly8gR28gYmFjayB0byBiZWZvcmUgd2UgYXRlIGl0LlxuXHRcdFx0XHRcdG9yaWdpbmFsUG9zLmNvbHVtbiA9IG9yaWdpbmFsUG9zLmNvbHVtbiAtIDFcblxuXHRcdFx0XHRcdGNvbnRleHQuY2hlY2soaXNJbmRlbnRlZCwgbG9jU2luZ2xlLCAnVW5jbG9zZWQgcXVvdGUuJylcblx0XHRcdFx0XHQvLyBBbGxvdyBleHRyYSBibGFuayBsaW5lcy5cblx0XHRcdFx0XHRjb25zdCBudW1OZXdsaW5lcyA9IHNraXBOZXdsaW5lcygpXG5cdFx0XHRcdFx0Y29uc3QgbmV3SW5kZW50ID0gc2tpcFdoaWxlRXF1YWxzKFRhYilcblx0XHRcdFx0XHRpZiAobmV3SW5kZW50IDwgcXVvdGVJbmRlbnQpIHtcblx0XHRcdFx0XHRcdC8vIEluZGVudGVkIHF1b3RlIHNlY3Rpb24gaXMgb3Zlci5cblx0XHRcdFx0XHRcdC8vIFVuZG8gcmVhZGluZyB0aGUgdGFicyBhbmQgbmV3bGluZS5cblx0XHRcdFx0XHRcdHN0ZXBCYWNrTWFueShvcmlnaW5hbFBvcywgbnVtTmV3bGluZXMgKyBuZXdJbmRlbnQpXG5cdFx0XHRcdFx0XHRhc3NlcnQocGVlaygpID09PSBOZXdsaW5lKVxuXHRcdFx0XHRcdFx0YnJlYWsgZWF0Q2hhcnNcblx0XHRcdFx0XHR9IGVsc2Vcblx0XHRcdFx0XHRcdHJlYWQgPSByZWFkICtcblx0XHRcdFx0XHRcdFx0J1xcbicucmVwZWF0KG51bU5ld2xpbmVzKSArICdcXHQnLnJlcGVhdChuZXdJbmRlbnQgLSBxdW90ZUluZGVudClcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhc2UgUXVvdGU6XG5cdFx0XHRcdFx0aWYgKCFpc0luZGVudGVkKVxuXHRcdFx0XHRcdFx0YnJlYWsgZWF0Q2hhcnNcblx0XHRcdFx0XHQvLyBFbHNlIGZhbGx0aHJvdWdoXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0Ly8gSSd2ZSB0cmllZCBwdXNoaW5nIGNoYXJhY3RlciBjb2RlcyB0byBhbiBhcnJheSBhbmQgc3RyaW5naWZ5aW5nIHRoZW0gbGF0ZXIsXG5cdFx0XHRcdFx0Ly8gYnV0IHRoaXMgdHVybmVkIG91dCB0byBiZSBiZXR0ZXIuXG5cdFx0XHRcdFx0cmVhZCA9IHJlYWQgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGNoYXIpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0bWF5YmVPdXRwdXRSZWFkKClcblx0XHRjbG9zZUdyb3Vwcyhwb3MoKSwgR19RdW90ZSlcblx0fVxuXG5cdGNvbnN0IHF1b3RlRXNjYXBlID0gY2ggPT4ge1xuXHRcdHN3aXRjaCAoY2gpIHtcblx0XHRcdGNhc2UgT3BlbkJyYWNlOiByZXR1cm4gJ3snXG5cdFx0XHRjYXNlIExldHRlck46IHJldHVybiAnXFxuJ1xuXHRcdFx0Y2FzZSBMZXR0ZXJUOiByZXR1cm4gJ1xcdCdcblx0XHRcdGNhc2UgUXVvdGU6IHJldHVybiAnXCInXG5cdFx0XHRjYXNlIEJhY2tzbGFzaDogcmV0dXJuICdcXFxcJ1xuXHRcdFx0ZGVmYXVsdDogY29udGV4dC5mYWlsKHBvcywgYE5vIG5lZWQgdG8gZXNjYXBlICR7c2hvd0NoYXIoY2gpfWApXG5cdFx0fVxuXHR9XG5cblx0Y3VyR3JvdXAgPSBHcm91cChMb2MoU3RhcnRQb3MsIG51bGwpLCBbIF0sIEdfQmxvY2spXG5cdG9wZW5MaW5lKFN0YXJ0UG9zKVxuXG5cdGxleFBsYWluKGZhbHNlKVxuXG5cdGNvbnN0IGVuZFBvcyA9IHBvcygpXG5cdGNsb3NlTGluZShlbmRQb3MpXG5cdGFzc2VydChpc0VtcHR5KGdyb3VwU3RhY2spKVxuXHRjdXJHcm91cC5sb2MuZW5kID0gZW5kUG9zXG5cdHJldHVybiBjdXJHcm91cFxufVxuXG5jb25zdCBjYyA9IF8gPT4gXy5jaGFyQ29kZUF0KDApXG5jb25zdFxuXHRBbXBlcnNhbmQgPSBjYygnJicpLFxuXHRCYWNrc2xhc2ggPSBjYygnXFxcXCcpLFxuXHRCYWNrdGljayA9IGNjKCdgJyksXG5cdEJhbmcgPSBjYygnIScpLFxuXHRCYXIgPSBjYygnfCcpLFxuXHRDYXJldCA9IGNjKCdeJyksXG5cdENsb3NlQnJhY2UgPSBjYygnfScpLFxuXHRDbG9zZUJyYWNrZXQgPSBjYygnXScpLFxuXHRDbG9zZVBhcmVudGhlc2lzID0gY2MoJyknKSxcblx0Q29sb24gPSBjYygnOicpLFxuXHRDb21tYSA9IGNjKCcsJyksXG5cdERvdCA9IGNjKCcuJyksXG5cdEVxdWFsID0gY2MoJz0nKSxcblx0SGFzaCA9IGNjKCcjJyksXG5cdEh5cGhlbiA9IGNjKCctJyksXG5cdExldHRlck4gPSBjYygnbicpLFxuXHRMZXR0ZXJUID0gY2MoJ3QnKSxcblx0TjAgPSBjYygnMCcpLFxuXHROMSA9IGNjKCcxJyksXG5cdE4yID0gY2MoJzInKSxcblx0TjMgPSBjYygnMycpLFxuXHRONCA9IGNjKCc0JyksXG5cdE41ID0gY2MoJzUnKSxcblx0TjYgPSBjYygnNicpLFxuXHRONyA9IGNjKCc3JyksXG5cdE44ID0gY2MoJzgnKSxcblx0TjkgPSBjYygnOScpLFxuXHROZXdsaW5lID0gY2MoJ1xcbicpLFxuXHRPcGVuQnJhY2UgPSBjYygneycpLFxuXHRPcGVuQnJhY2tldCA9IGNjKCdbJyksXG5cdE9wZW5QYXJlbnRoZXNpcyA9IGNjKCcoJyksXG5cdFBlcmNlbnQgPSBjYygnJScpLFxuXHRRdW90ZSA9IGNjKCdcIicpLFxuXHRTZW1pY29sb24gPSBjYygnOycpLFxuXHRTcGFjZSA9IGNjKCcgJyksXG5cdFRhYiA9IGNjKCdcXHQnKSxcblx0VGlsZGUgPSBjYygnficpLFxuXHRVbmRlcnNjb3JlID0gY2MoJ18nKSxcblx0WmVybyA9IGNjKCdcXDAnKVxuXG5jb25zdFxuXHRzaG93Q2hhciA9IGNoYXIgPT4gY29kZShTdHJpbmcuZnJvbUNoYXJDb2RlKGNoYXIpKSxcblx0X2NoYXJQcmVkID0gKGNoYXJzLCBuZWdhdGUpID0+IHtcblx0XHRsZXQgc3JjID0gJ3N3aXRjaChjaCkge1xcbidcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJzLmxlbmd0aDsgaSA9IGkgKyAxKVxuXHRcdFx0c3JjID0gYCR7c3JjfWNhc2UgJHtjaGFycy5jaGFyQ29kZUF0KGkpfTogYFxuXHRcdHNyYyA9IGAke3NyY30gcmV0dXJuICR7IW5lZ2F0ZX1cXG5kZWZhdWx0OiByZXR1cm4gJHtuZWdhdGV9XFxufWBcblx0XHRyZXR1cm4gRnVuY3Rpb24oJ2NoJywgc3JjKVxuXHR9LFxuXHRpc0RpZ2l0ID0gX2NoYXJQcmVkKCcwMTIzNDU2Nzg5JyksXG5cdGlzTmFtZUNoYXJhY3RlciA9IF9jaGFyUHJlZChOb25OYW1lQ2hhcmFjdGVycywgdHJ1ZSksXG5cdGlzTnVtYmVyQ2hhcmFjdGVyID0gX2NoYXJQcmVkKCcwMTIzNDU2Nzg5LmUnKVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=