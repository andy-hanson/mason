if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', '../CompileError', '../MsAst', './language', './Token', './util'], function (exports, module, _esastDistLoc, _CompileError, _MsAst, _language, _Token, _util) {
	'use strict';

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Loc = _interopRequireDefault(_esastDistLoc);

	/*
 This produces the Token tree (see Token.js).
 */

	module.exports = function (context, sourceString) {
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
		const addToCurrentGroup = function (token) {
			return curGroup.subTokens.push(token);
		},
		     

		// Pause writing to curGroup in favor of writing to a sub-group.
		// When the sub-group finishes we will pop the stack and resume writing to its parent.
		openGroup = function (openPos, groupKind) {
			groupStack.push(curGroup);
			// Contents will be added to by `o`.
			// curGroup.loc.end will be written to when closing it.
			curGroup = (0, _Token.Group)((0, _Loc.default)(openPos, null), [], groupKind);
		},
		     

		// A group ending may close mutliple groups.
		// For example, in `log! (+ 1 1`, the G_Line will also close a G_Parenthesis.
		closeGroups = function (closePos, closeKind) {
			// curGroup is different each time we go through the loop
			// because _closeSingleGroup brings us to an enclosing group.
			while (curGroup.kind !== closeKind) {
				const curKind = curGroup.kind;
				// A line can close a parenthesis, but a parenthesis can't close a line!
				context.check(curKind === _Token.G_Parenthesis || curKind === _Token.G_Bracket || curKind === _Token.G_Space, closePos, function () {
					return 'Trying to close ' + (0, _Token.showGroupKind)(closeKind) + ', ' + ('but last opened was ' + (0, _Token.showGroupKind)(curKind));
				});
				_closeSingleGroup(closePos, curGroup.kind);
			}
			_closeSingleGroup(closePos, closeKind);
		},
		      _closeSingleGroup = function (closePos, closeKind) {
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
		      openParenthesis = function (loc) {
			openGroup(loc.start, _Token.G_Parenthesis);
			openGroup(loc.end, _Token.G_Space);
		},
		      openBracket = function (loc) {
			openGroup(loc.start, _Token.G_Bracket);
			openGroup(loc.end, _Token.G_Space);
		},
		     

		// When starting a new line, a spaced group is created implicitly.
		openLine = function (pos) {
			openGroup(pos, _Token.G_Line);
			openGroup(pos, _Token.G_Space);
		},
		      closeLine = function (pos) {
			closeGroups(pos, _Token.G_Space);
			closeGroups(pos, _Token.G_Line);
		},
		     

		// When encountering a space, it both closes and opens a spaced group.
		space = function (loc) {
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
		const pos = function () {
			return (0, _esastDistLoc.Pos)(line, column);
		},
		      peek = function () {
			return sourceString.charCodeAt(index);
		},
		     

		// May eat a Newline.
		// If that happens, line and column will temporarily be wrong,
		// but we handle it in that special case (rather than checking for Newline every time).
		eat = function () {
			const char = sourceString.charCodeAt(index);
			index = index + 1;
			column = column + 1;
			return char;
		},
		     

		// charToEat must not be Newline.
		tryEat = function (charToEat) {
			const canEat = peek() === charToEat;
			if (canEat) {
				index = index + 1;
				column = column + 1;
			}
			return canEat;
		},
		      mustEat = function (charToEat, precededBy) {
			const canEat = tryEat(charToEat);
			context.check(canEat, pos, function () {
				return (0, _CompileError.code)(precededBy) + ' must be followed by ' + showChar(charToEat);
			});
		},
		      tryEatNewline = function () {
			const canEat = peek() === Newline;
			if (canEat) {
				index = index + 1;
				line = line + 1;
				column = _esastDistLoc.StartColumn;
			}
			return canEat;
		},
		     

		// Caller must ensure that backing up nCharsToBackUp characters brings us to oldPos.
		stepBackMany = function (oldPos, nCharsToBackUp) {
			index = index - nCharsToBackUp;
			line = oldPos.line;
			column = oldPos.column;
		},
		     

		// For takeWhile, takeWhileWithPrev, and skipWhileEquals,
		// characterPredicate must *not* accept Newline.
		// Otherwise there may be an infinite loop!
		takeWhile = function (characterPredicate) {
			const startIndex = index;
			_skipWhile(characterPredicate);
			return sourceString.slice(startIndex, index);
		},
		      takeWhileWithPrev = function (characterPredicate) {
			const startIndex = index;
			_skipWhile(characterPredicate);
			return sourceString.slice(startIndex - 1, index);
		},
		      skipWhileEquals = function (char) {
			return _skipWhile(function (_) {
				return _ === char;
			});
		},
		      skipRestOfLine = function () {
			return _skipWhile(function (_) {
				return _ !== Newline;
			});
		},
		      _skipWhile = function (characterPredicate) {
			const startIndex = index;
			while (characterPredicate(peek())) index = index + 1;
			const diff = index - startIndex;
			column = column + diff;
			return diff;
		},
		     

		// Called after seeing the first newline.
		// Returns # total newlines, including the first.
		skipNewlines = function () {
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
		const lexPlain = function (isInQuote) {
			// This tells us which indented block we're in.
			// Incrementing it means issuing a GP_OpenBlock and decrementing it means a GP_CloseBlock.
			// Does nothing if isInQuote.
			let indent = 0;

			// Make closures now rather than inside the loop.
			// This is significantly faster as of node v0.11.14.

			// This is where we started lexing the current token.
			let startColumn;
			const startPos = function () {
				return (0, _esastDistLoc.Pos)(line, startColumn);
			},
			      loc = function () {
				return (0, _Loc.default)(startPos(), pos());
			},
			      keyword = function (kind) {
				return addToCurrentGroup((0, _Token.Keyword)(loc(), kind));
			},
			      funKeyword = function (kind) {
				keyword(kind);
				space(loc());
			},
			      eatAndAddNumber = function () {
				// TODO: A real number literal lexer, not just JavaScript's...
				const numberString = takeWhileWithPrev(isNumberCharacter);
				const number = Number(numberString);
				context.check(!Number.isNaN(number), pos, function () {
					return 'Invalid number literal ' + (0, _CompileError.code)(numberString);
				});
				addToCurrentGroup((0, _MsAst.NumberLiteral)(loc(), number));
			};

			const handleName = function () {
				// All other characters should be handled in a case above.
				const name = takeWhileWithPrev(isNameCharacter);
				const keywordKind = (0, _Token.opKeywordKindFromName)(name);
				if (keywordKind !== undefined) {
					context.check(keywordKind !== -1, pos, function () {
						return 'Reserved name ' + (0, _CompileError.code)(name);
					});
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
						context.check(isInQuote, loc, function () {
							return 'Reserved character ' + showChar(CloseBrace);
						});
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
							funKeyword(_Token.KW_GenFunDo);
						} else if (tryEat(Bar)) funKeyword(_Token.KW_GenFun);else keyword(_Token.KW_Lazy);
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
								context.check(nl, loc, function () {
									return '#Closing {code(\'###\')} must be followed by newline.';
								});
								break;
							}
						} else {
							// Single-line comment
							if (!(tryEat(Space) || tryEat(Tab))) context.fail(loc, function () {
								return (0, _CompileError.code)('#') + ' must be followed by space or tab.';
							});
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
						context.fail(loc, 'Reserved character ' + showChar(characterEaten));
					default:
						handleName();
				}
			}
		};

		const lexQuote = function (indent) {
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

			const maybeOutputRead = function () {
				if (read !== '') {
					addToCurrentGroup(read);
					read = '';
				}
			};

			const locSingle = function () {
				return (0, _esastDistLoc.singleCharLoc)(pos());
			};

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

		const quoteEscape = function (ch) {
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
					context.fail(pos, 'No need to escape ' + showChar(ch));
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

	const cc = function (_) {
		return _.charCodeAt(0);
	};
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

	const showChar = function (char) {
		return (0, _CompileError.code)(String.fromCharCode(char));
	},
	      _charPred = function (chars, negate) {
		let src = 'switch(ch) {\n';
		for (let i = 0; i < chars.length; i = i + 1) src = src + 'case ' + chars.charCodeAt(i) + ': ';
		src = src + ' return ' + !negate + '\ndefault: return ' + negate + '\n}';
		return Function('ch', src);
	},
	      isDigit = _charPred('0123456789'),
	      isNameCharacter = _charPred(_language.NonNameCharacters, true),
	      isNumberCharacter = _charPred('0123456789.e');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL2xleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztrQkFhZSxVQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUs7OztBQUd6QyxjQUFZLEdBQUcsWUFBWSxHQUFHLFVBQU0sQ0FBQTs7Ozs7Ozs7QUFRcEMsUUFBTSxVQUFVLEdBQUcsRUFBRyxDQUFBO0FBQ3RCLE1BQUksUUFBUSxDQUFBO0FBQ1osUUFDQyxpQkFBaUIsR0FBRyxVQUFBLEtBQUs7VUFDeEIsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0dBQUE7Ozs7O0FBSS9CLFdBQVMsR0FBRyxVQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUs7QUFDbkMsYUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTs7O0FBR3pCLFdBQVEsR0FBRyxXQWhDSSxLQUFLLEVBZ0NILGtCQUFJLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFHLEVBQUUsU0FBUyxDQUFDLENBQUE7R0FDcEQ7Ozs7O0FBSUQsYUFBVyxHQUFHLFVBQUMsUUFBUSxFQUFFLFNBQVMsRUFBSzs7O0FBR3RDLFVBQU8sUUFBUSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7QUFDbkMsVUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQTs7QUFFN0IsV0FBTyxDQUFDLEtBQUssQ0FDWixPQUFPLFlBNUN5QyxhQUFhLEFBNENwQyxJQUFJLE9BQU8sWUE1Q1AsU0FBUyxBQTRDWSxJQUFJLE9BQU8sWUE1Q0UsT0FBTyxBQTRDRyxFQUN6RSxRQUFRLEVBQUU7WUFDVixxQkFBbUIsV0EzQ0EsYUFBYSxFQTJDQyxTQUFTLENBQUMsb0NBQ3BCLFdBNUNKLGFBQWEsRUE0Q0ssT0FBTyxDQUFDLENBQUU7S0FBQSxDQUFDLENBQUE7QUFDakQscUJBQWlCLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMxQztBQUNELG9CQUFpQixDQUFD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QUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFDMUMsR0FBRyxHQUFNLEdBQUcsYUFBUSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFJLENBQUE7QUFDNUMsS0FBRyxHQUFNLEdBQUcsZ0JBQVcsQ0FBQyxNQUFNLDBCQUFxQixNQUFNLFFBQUssQ0FBQTtBQUM5RCxTQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUE7RUFDMUI7T0FDRCxPQUFPLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQztPQUNqQyxlQUFlLEdBQUcsU0FBUyxXQS9tQm5CLGlCQUFpQixFQSttQnNCLElBQUksQ0FBQztPQUNwRCxpQkFBaUIsR0FBRyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUEiLCJmaWxlIjoibWV0YS9jb21waWxlL3ByaXZhdGUvbGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvYywgeyBQb3MsIFN0YXJ0TGluZSwgU3RhcnRQb3MsIFN0YXJ0Q29sdW1uLCBzaW5nbGVDaGFyTG9jIH0gZnJvbSAnZXNhc3QvZGlzdC9Mb2MnXG5pbXBvcnQgeyBjb2RlIH0gZnJvbSAnLi4vQ29tcGlsZUVycm9yJ1xuaW1wb3J0IHsgTnVtYmVyTGl0ZXJhbCB9IGZyb20gJy4uL01zQXN0J1xuaW1wb3J0IHsgTm9uTmFtZUNoYXJhY3RlcnMgfSBmcm9tICcuL2xhbmd1YWdlJ1xuaW1wb3J0IHsgRG90TmFtZSwgR3JvdXAsIEdfQmxvY2ssIEdfQnJhY2tldCwgR19MaW5lLCBHX1BhcmVudGhlc2lzLCBHX1NwYWNlLCBHX1F1b3RlLFxuXHRpc0tleXdvcmQsIEtleXdvcmQsIEtXX0Fzc2lnbk11dGFibGUsIEtXX0VsbGlwc2lzLCBLV19Gb2N1cywgS1dfRnVuLCBLV19GdW5EbywgS1dfR2VuRnVuLFxuXHRLV19HZW5GdW5EbywgS1dfTGF6eSwgS1dfTG9jYWxNdXRhdGUsIEtXX09iakFzc2lnbiwgS1dfUmVnaW9uLCBLV19UeXBlLCBOYW1lLFxuXHRvcEtleXdvcmRLaW5kRnJvbU5hbWUsIHNob3dHcm91cEtpbmQgfSBmcm9tICcuL1Rva2VuJ1xuaW1wb3J0IHsgYXNzZXJ0LCBpc0VtcHR5LCBsYXN0IH0gZnJvbSAnLi91dGlsJ1xuXG4vKlxuVGhpcyBwcm9kdWNlcyB0aGUgVG9rZW4gdHJlZSAoc2VlIFRva2VuLmpzKS5cbiovXG5leHBvcnQgZGVmYXVsdCAoY29udGV4dCwgc291cmNlU3RyaW5nKSA9PiB7XG5cdC8vIExleGluZyBhbGdvcml0aG0gcmVxdWlyZXMgdHJhaWxpbmcgbmV3bGluZSB0byBjbG9zZSBhbnkgYmxvY2tzLlxuXHQvLyBVc2UgYSBudWxsLXRlcm1pbmF0ZWQgc3RyaW5nIGJlY2F1c2UgaXQncyBmYXN0ZXIgdGhhbiBjaGVja2luZyB3aGV0aGVyIGluZGV4ID09PSBsZW5ndGguXG5cdHNvdXJjZVN0cmluZyA9IHNvdXJjZVN0cmluZyArICdcXG5cXDAnXG5cblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gR1JPVVBJTkdcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gV2Ugb25seSBldmVyIHdyaXRlIHRvIHRoZSBpbm5lcm1vc3QgR3JvdXA7XG5cdC8vIHdoZW4gd2UgY2xvc2UgdGhhdCBHcm91cCB3ZSBhZGQgaXQgdG8gdGhlIGVuY2xvc2luZyBHcm91cCBhbmQgY29udGludWUgd2l0aCB0aGF0IG9uZS5cblx0Ly8gTm90ZSB0aGF0IGBjdXJHcm91cGAgaXMgY29uY2VwdHVhbGx5IHRoZSB0b3Agb2YgdGhlIHN0YWNrLCBidXQgaXMgbm90IHN0b3JlZCBpbiBgc3RhY2tgLlxuXHRjb25zdCBncm91cFN0YWNrID0gWyBdXG5cdGxldCBjdXJHcm91cFxuXHRjb25zdFxuXHRcdGFkZFRvQ3VycmVudEdyb3VwID0gdG9rZW4gPT5cblx0XHRcdGN1ckdyb3VwLnN1YlRva2Vucy5wdXNoKHRva2VuKSxcblxuXHRcdC8vIFBhdXNlIHdyaXRpbmcgdG8gY3VyR3JvdXAgaW4gZmF2b3Igb2Ygd3JpdGluZyB0byBhIHN1Yi1ncm91cC5cblx0XHQvLyBXaGVuIHRoZSBzdWItZ3JvdXAgZmluaXNoZXMgd2Ugd2lsbCBwb3AgdGhlIHN0YWNrIGFuZCByZXN1bWUgd3JpdGluZyB0byBpdHMgcGFyZW50LlxuXHRcdG9wZW5Hcm91cCA9IChvcGVuUG9zLCBncm91cEtpbmQpID0+IHtcblx0XHRcdGdyb3VwU3RhY2sucHVzaChjdXJHcm91cClcblx0XHRcdC8vIENvbnRlbnRzIHdpbGwgYmUgYWRkZWQgdG8gYnkgYG9gLlxuXHRcdFx0Ly8gY3VyR3JvdXAubG9jLmVuZCB3aWxsIGJlIHdyaXR0ZW4gdG8gd2hlbiBjbG9zaW5nIGl0LlxuXHRcdFx0Y3VyR3JvdXAgPSBHcm91cChMb2Mob3BlblBvcywgbnVsbCksIFsgXSwgZ3JvdXBLaW5kKVxuXHRcdH0sXG5cblx0XHQvLyBBIGdyb3VwIGVuZGluZyBtYXkgY2xvc2UgbXV0bGlwbGUgZ3JvdXBzLlxuXHRcdC8vIEZvciBleGFtcGxlLCBpbiBgbG9nISAoKyAxIDFgLCB0aGUgR19MaW5lIHdpbGwgYWxzbyBjbG9zZSBhIEdfUGFyZW50aGVzaXMuXG5cdFx0Y2xvc2VHcm91cHMgPSAoY2xvc2VQb3MsIGNsb3NlS2luZCkgPT4ge1xuXHRcdFx0Ly8gY3VyR3JvdXAgaXMgZGlmZmVyZW50IGVhY2ggdGltZSB3ZSBnbyB0aHJvdWdoIHRoZSBsb29wXG5cdFx0XHQvLyBiZWNhdXNlIF9jbG9zZVNpbmdsZUdyb3VwIGJyaW5ncyB1cyB0byBhbiBlbmNsb3NpbmcgZ3JvdXAuXG5cdFx0XHR3aGlsZSAoY3VyR3JvdXAua2luZCAhPT0gY2xvc2VLaW5kKSB7XG5cdFx0XHRcdGNvbnN0IGN1cktpbmQgPSBjdXJHcm91cC5raW5kXG5cdFx0XHRcdC8vIEEgbGluZSBjYW4gY2xvc2UgYSBwYXJlbnRoZXNpcywgYnV0IGEgcGFyZW50aGVzaXMgY2FuJ3QgY2xvc2UgYSBsaW5lIVxuXHRcdFx0XHRjb250ZXh0LmNoZWNrKFxuXHRcdFx0XHRcdGN1cktpbmQgPT09IEdfUGFyZW50aGVzaXMgfHwgY3VyS2luZCA9PT0gR19CcmFja2V0IHx8IGN1cktpbmQgPT09IEdfU3BhY2UsXG5cdFx0XHRcdFx0Y2xvc2VQb3MsICgpID0+XG5cdFx0XHRcdFx0YFRyeWluZyB0byBjbG9zZSAke3Nob3dHcm91cEtpbmQoY2xvc2VLaW5kKX0sIGAgK1xuXHRcdFx0XHRcdGBidXQgbGFzdCBvcGVuZWQgd2FzICR7c2hvd0dyb3VwS2luZChjdXJLaW5kKX1gKVxuXHRcdFx0XHRfY2xvc2VTaW5nbGVHcm91cChjbG9zZVBvcywgY3VyR3JvdXAua2luZClcblx0XHRcdH1cblx0XHRcdF9jbG9zZVNpbmdsZUdyb3VwKGNsb3NlUG9zLCBjbG9zZUtpbmQpXG5cdFx0fSxcblxuXHRcdF9jbG9zZVNpbmdsZUdyb3VwID0gKGNsb3NlUG9zLCBjbG9zZUtpbmQpID0+IHtcblx0XHRcdGxldCBqdXN0Q2xvc2VkID0gY3VyR3JvdXBcblx0XHRcdGN1ckdyb3VwID0gZ3JvdXBTdGFjay5wb3AoKVxuXHRcdFx0anVzdENsb3NlZC5sb2MuZW5kID0gY2xvc2VQb3Ncblx0XHRcdHN3aXRjaCAoY2xvc2VLaW5kKSB7XG5cdFx0XHRcdGNhc2UgR19TcGFjZToge1xuXHRcdFx0XHRcdGNvbnN0IHNpemUgPSBqdXN0Q2xvc2VkLnN1YlRva2Vucy5sZW5ndGhcblx0XHRcdFx0XHRpZiAoc2l6ZSAhPT0gMClcblx0XHRcdFx0XHRcdC8vIFNwYWNlZCBzaG91bGQgYWx3YXlzIGhhdmUgYXQgbGVhc3QgdHdvIGVsZW1lbnRzLlxuXHRcdFx0XHRcdFx0YWRkVG9DdXJyZW50R3JvdXAoc2l6ZSA9PT0gMSA/IGp1c3RDbG9zZWQuc3ViVG9rZW5zWzBdIDoganVzdENsb3NlZClcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhc2UgR19MaW5lOlxuXHRcdFx0XHRcdC8vIExpbmUgbXVzdCBoYXZlIGNvbnRlbnQuXG5cdFx0XHRcdFx0Ly8gVGhpcyBjYW4gaGFwcGVuIGlmIHRoZXJlIHdhcyBqdXN0IGEgY29tbWVudC5cblx0XHRcdFx0XHRpZiAoIWlzRW1wdHkoanVzdENsb3NlZC5zdWJUb2tlbnMpKVxuXHRcdFx0XHRcdFx0YWRkVG9DdXJyZW50R3JvdXAoanVzdENsb3NlZClcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRjYXNlIEdfQmxvY2s6XG5cdFx0XHRcdFx0Y29udGV4dC5jaGVjayghaXNFbXB0eShqdXN0Q2xvc2VkLnN1YlRva2VucyksIGNsb3NlUG9zLCAnRW1wdHkgYmxvY2suJylcblx0XHRcdFx0XHRhZGRUb0N1cnJlbnRHcm91cChqdXN0Q2xvc2VkKVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0YWRkVG9DdXJyZW50R3JvdXAoanVzdENsb3NlZClcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0b3BlblBhcmVudGhlc2lzID0gbG9jID0+IHtcblx0XHRcdG9wZW5Hcm91cChsb2Muc3RhcnQsIEdfUGFyZW50aGVzaXMpXG5cdFx0XHRvcGVuR3JvdXAobG9jLmVuZCwgR19TcGFjZSlcblx0XHR9LFxuXG5cdFx0b3BlbkJyYWNrZXQgPSBsb2MgPT4ge1xuXHRcdFx0b3Blbkdyb3VwKGxvYy5zdGFydCwgR19CcmFja2V0KVxuXHRcdFx0b3Blbkdyb3VwKGxvYy5lbmQsIEdfU3BhY2UpXG5cdFx0fSxcblxuXHRcdC8vIFdoZW4gc3RhcnRpbmcgYSBuZXcgbGluZSwgYSBzcGFjZWQgZ3JvdXAgaXMgY3JlYXRlZCBpbXBsaWNpdGx5LlxuXHRcdG9wZW5MaW5lID0gcG9zID0+IHtcblx0XHRcdG9wZW5Hcm91cChwb3MsIEdfTGluZSlcblx0XHRcdG9wZW5Hcm91cChwb3MsIEdfU3BhY2UpXG5cdFx0fSxcblxuXHRcdGNsb3NlTGluZSA9IHBvcyA9PiB7XG5cdFx0XHRjbG9zZUdyb3Vwcyhwb3MsIEdfU3BhY2UpXG5cdFx0XHRjbG9zZUdyb3Vwcyhwb3MsIEdfTGluZSlcblx0XHR9LFxuXG5cdFx0Ly8gV2hlbiBlbmNvdW50ZXJpbmcgYSBzcGFjZSwgaXQgYm90aCBjbG9zZXMgYW5kIG9wZW5zIGEgc3BhY2VkIGdyb3VwLlxuXHRcdHNwYWNlID0gbG9jID0+IHtcblx0XHRcdGNsb3NlR3JvdXBzKGxvYy5zdGFydCwgR19TcGFjZSlcblx0XHRcdG9wZW5Hcm91cChsb2MuZW5kLCBHX1NwYWNlKVxuXHRcdH1cblxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBJVEVSQVRJTkcgVEhST1VHSCBTT1VSQ0VTVFJJTkdcblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Lypcblx0VGhlc2UgYXJlIGtlcHQgdXAtdG8tZGF0ZSBhcyB3ZSBpdGVyYXRlIHRocm91Z2ggc291cmNlU3RyaW5nLlxuXHRFdmVyeSBhY2Nlc3MgdG8gaW5kZXggaGFzIGNvcnJlc3BvbmRpbmcgY2hhbmdlcyB0byBsaW5lIGFuZC9vciBjb2x1bW4uXG5cdFRoaXMgYWxzbyBleHBsYWlucyB3aHkgdGhlcmUgYXJlIGRpZmZlcmVudCBmdW5jdGlvbnMgZm9yIG5ld2xpbmVzIHZzIG90aGVyIGNoYXJhY3RlcnMuXG5cdCovXG5cdGxldCBpbmRleCA9IDAsIGxpbmUgPSBTdGFydExpbmUsIGNvbHVtbiA9IFN0YXJ0Q29sdW1uXG5cblx0Lypcblx0Tk9URTogV2UgdXNlIGNoYXJhY3RlciAqY29kZXMqIGZvciBldmVyeXRoaW5nLlxuXHRDaGFyYWN0ZXJzIGFyZSBvZiB0eXBlIE51bWJlciBhbmQgbm90IGp1c3QgU3RyaW5ncyBvZiBsZW5ndGggb25lLlxuXHQqL1xuXHRjb25zdFxuXHRcdHBvcyA9ICgpID0+IFBvcyhsaW5lLCBjb2x1bW4pLFxuXG5cdFx0cGVlayA9ICgpID0+IHNvdXJjZVN0cmluZy5jaGFyQ29kZUF0KGluZGV4KSxcblxuXHRcdC8vIE1heSBlYXQgYSBOZXdsaW5lLlxuXHRcdC8vIElmIHRoYXQgaGFwcGVucywgbGluZSBhbmQgY29sdW1uIHdpbGwgdGVtcG9yYXJpbHkgYmUgd3JvbmcsXG5cdFx0Ly8gYnV0IHdlIGhhbmRsZSBpdCBpbiB0aGF0IHNwZWNpYWwgY2FzZSAocmF0aGVyIHRoYW4gY2hlY2tpbmcgZm9yIE5ld2xpbmUgZXZlcnkgdGltZSkuXG5cdFx0ZWF0ID0gKCkgPT4ge1xuXHRcdFx0Y29uc3QgY2hhciA9IHNvdXJjZVN0cmluZy5jaGFyQ29kZUF0KGluZGV4KVxuXHRcdFx0aW5kZXggPSBpbmRleCArIDFcblx0XHRcdGNvbHVtbiA9IGNvbHVtbiArIDFcblx0XHRcdHJldHVybiBjaGFyXG5cdFx0fSxcblxuXHRcdC8vIGNoYXJUb0VhdCBtdXN0IG5vdCBiZSBOZXdsaW5lLlxuXHRcdHRyeUVhdCA9IGNoYXJUb0VhdCA9PiB7XG5cdFx0XHRjb25zdCBjYW5FYXQgPSBwZWVrKCkgPT09IGNoYXJUb0VhdFxuXHRcdFx0aWYgKGNhbkVhdCkge1xuXHRcdFx0XHRpbmRleCA9IGluZGV4ICsgMVxuXHRcdFx0XHRjb2x1bW4gPSBjb2x1bW4gKyAxXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gY2FuRWF0XG5cdFx0fSxcblxuXHRcdG11c3RFYXQgPSAoY2hhclRvRWF0LCBwcmVjZWRlZEJ5KSA9PiB7XG5cdFx0XHRjb25zdCBjYW5FYXQgPSB0cnlFYXQoY2hhclRvRWF0KVxuXHRcdFx0Y29udGV4dC5jaGVjayhjYW5FYXQsIHBvcywgKCkgPT5cblx0XHRcdFx0YCR7Y29kZShwcmVjZWRlZEJ5KX0gbXVzdCBiZSBmb2xsb3dlZCBieSAke3Nob3dDaGFyKGNoYXJUb0VhdCl9YClcblx0XHR9LFxuXG5cdFx0dHJ5RWF0TmV3bGluZSA9ICgpID0+IHtcblx0XHRcdGNvbnN0IGNhbkVhdCA9IHBlZWsoKSA9PT0gTmV3bGluZVxuXHRcdFx0aWYgKGNhbkVhdCkge1xuXHRcdFx0XHRpbmRleCA9IGluZGV4ICsgMVxuXHRcdFx0XHRsaW5lID0gbGluZSArIDFcblx0XHRcdFx0Y29sdW1uID0gU3RhcnRDb2x1bW5cblx0XHRcdH1cblx0XHRcdHJldHVybiBjYW5FYXRcblx0XHR9LFxuXG5cdFx0Ly8gQ2FsbGVyIG11c3QgZW5zdXJlIHRoYXQgYmFja2luZyB1cCBuQ2hhcnNUb0JhY2tVcCBjaGFyYWN0ZXJzIGJyaW5ncyB1cyB0byBvbGRQb3MuXG5cdFx0c3RlcEJhY2tNYW55ID0gKG9sZFBvcywgbkNoYXJzVG9CYWNrVXApID0+IHtcblx0XHRcdGluZGV4ID0gaW5kZXggLSBuQ2hhcnNUb0JhY2tVcFxuXHRcdFx0bGluZSA9IG9sZFBvcy5saW5lXG5cdFx0XHRjb2x1bW4gPSBvbGRQb3MuY29sdW1uXG5cdFx0fSxcblxuXHRcdC8vIEZvciB0YWtlV2hpbGUsIHRha2VXaGlsZVdpdGhQcmV2LCBhbmQgc2tpcFdoaWxlRXF1YWxzLFxuXHRcdC8vIGNoYXJhY3RlclByZWRpY2F0ZSBtdXN0ICpub3QqIGFjY2VwdCBOZXdsaW5lLlxuXHRcdC8vIE90aGVyd2lzZSB0aGVyZSBtYXkgYmUgYW4gaW5maW5pdGUgbG9vcCFcblx0XHR0YWtlV2hpbGUgPSBjaGFyYWN0ZXJQcmVkaWNhdGUgPT4ge1xuXHRcdFx0Y29uc3Qgc3RhcnRJbmRleCA9IGluZGV4XG5cdFx0XHRfc2tpcFdoaWxlKGNoYXJhY3RlclByZWRpY2F0ZSlcblx0XHRcdHJldHVybiBzb3VyY2VTdHJpbmcuc2xpY2Uoc3RhcnRJbmRleCwgaW5kZXgpXG5cdFx0fSxcblxuXHRcdHRha2VXaGlsZVdpdGhQcmV2ID0gY2hhcmFjdGVyUHJlZGljYXRlID0+IHtcblx0XHRcdGNvbnN0IHN0YXJ0SW5kZXggPSBpbmRleFxuXHRcdFx0X3NraXBXaGlsZShjaGFyYWN0ZXJQcmVkaWNhdGUpXG5cdFx0XHRyZXR1cm4gc291cmNlU3RyaW5nLnNsaWNlKHN0YXJ0SW5kZXggLSAxLCBpbmRleClcblx0XHR9LFxuXG5cdFx0c2tpcFdoaWxlRXF1YWxzID0gY2hhciA9PlxuXHRcdFx0X3NraXBXaGlsZShfID0+IF8gPT09IGNoYXIpLFxuXG5cdFx0c2tpcFJlc3RPZkxpbmUgPSAoKSA9PlxuXHRcdFx0X3NraXBXaGlsZShfID0+IF8gIT09IE5ld2xpbmUpLFxuXG5cdFx0X3NraXBXaGlsZSA9IGNoYXJhY3RlclByZWRpY2F0ZSA9PiB7XG5cdFx0XHRjb25zdCBzdGFydEluZGV4ID0gaW5kZXhcblx0XHRcdHdoaWxlIChjaGFyYWN0ZXJQcmVkaWNhdGUocGVlaygpKSlcblx0XHRcdFx0aW5kZXggPSBpbmRleCArIDFcblx0XHRcdGNvbnN0IGRpZmYgPSBpbmRleCAtIHN0YXJ0SW5kZXhcblx0XHRcdGNvbHVtbiA9IGNvbHVtbiArIGRpZmZcblx0XHRcdHJldHVybiBkaWZmXG5cdFx0fSxcblxuXHRcdC8vIENhbGxlZCBhZnRlciBzZWVpbmcgdGhlIGZpcnN0IG5ld2xpbmUuXG5cdFx0Ly8gUmV0dXJucyAjIHRvdGFsIG5ld2xpbmVzLCBpbmNsdWRpbmcgdGhlIGZpcnN0LlxuXHRcdHNraXBOZXdsaW5lcyA9ICgpID0+IHtcblx0XHRcdGNvbnN0IHN0YXJ0TGluZSA9IGxpbmVcblx0XHRcdGxpbmUgPSBsaW5lICsgMVxuXHRcdFx0d2hpbGUgKHBlZWsoKSA9PT0gTmV3bGluZSkge1xuXHRcdFx0XHRpbmRleCA9IGluZGV4ICsgMVxuXHRcdFx0XHRsaW5lID0gbGluZSArIDFcblx0XHRcdH1cblx0XHRcdGNvbHVtbiA9IFN0YXJ0Q29sdW1uXG5cdFx0XHRyZXR1cm4gbGluZSAtIHN0YXJ0TGluZVxuXHRcdH1cblxuXHQvLyBTcHJpbmtsZSBjaGVja1BvcygpIGFyb3VuZCB0byBkZWJ1ZyBsaW5lIGFuZCBjb2x1bW4gdHJhY2tpbmcgZXJyb3JzLlxuXHQvKlxuXHRjb25zdFxuXHRcdGNoZWNrUG9zID0gKCkgPT4ge1xuXHRcdFx0Y29uc3QgcCA9IF9nZXRDb3JyZWN0UG9zKClcblx0XHRcdGlmIChwLmxpbmUgIT09IGxpbmUgfHwgcC5jb2x1bW4gIT09IGNvbHVtbilcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKGBpbmRleDogJHtpbmRleH0sIHdyb25nOiAke1BvcyhsaW5lLCBjb2x1bW4pfSwgcmlnaHQ6ICR7cH1gKVxuXHRcdH0sXG5cdFx0X2luZGV4VG9Qb3MgPSBuZXcgTWFwKCksXG5cdFx0X2dldENvcnJlY3RQb3MgPSAoKSA9PiB7XG5cdFx0XHRpZiAoaW5kZXggPT09IDApXG5cdFx0XHRcdHJldHVybiBQb3MoU3RhcnRMaW5lLCBTdGFydENvbHVtbilcblxuXHRcdFx0bGV0IG9sZFBvcywgb2xkSW5kZXhcblx0XHRcdGZvciAob2xkSW5kZXggPSBpbmRleCAtIDE7IDsgb2xkSW5kZXggPSBvbGRJbmRleCAtIDEpIHtcblx0XHRcdFx0b2xkUG9zID0gX2luZGV4VG9Qb3MuZ2V0KG9sZEluZGV4KVxuXHRcdFx0XHRpZiAob2xkUG9zICE9PSB1bmRlZmluZWQpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0YXNzZXJ0KG9sZEluZGV4ID49IDApXG5cdFx0XHR9XG5cdFx0XHRsZXQgbmV3TGluZSA9IG9sZFBvcy5saW5lLCBuZXdDb2x1bW4gPSBvbGRQb3MuY29sdW1uXG5cdFx0XHRmb3IgKDsgb2xkSW5kZXggPCBpbmRleDsgb2xkSW5kZXggPSBvbGRJbmRleCArIDEpXG5cdFx0XHRcdGlmIChzb3VyY2VTdHJpbmcuY2hhckNvZGVBdChvbGRJbmRleCkgPT09IE5ld2xpbmUpIHtcblx0XHRcdFx0XHRuZXdMaW5lID0gbmV3TGluZSArIDFcblx0XHRcdFx0XHRuZXdDb2x1bW4gPSBTdGFydENvbHVtblxuXHRcdFx0XHR9IGVsc2Vcblx0XHRcdFx0XHRuZXdDb2x1bW4gPSBuZXdDb2x1bW4gKyAxXG5cblx0XHRcdGNvbnN0IHAgPSBQb3MobmV3TGluZSwgbmV3Q29sdW1uKVxuXHRcdFx0X2luZGV4VG9Qb3Muc2V0KGluZGV4LCBwKVxuXHRcdFx0cmV0dXJuIHBcblx0XHR9XG5cdCovXG5cblx0Lypcblx0SW4gdGhlIGNhc2Ugb2YgcXVvdGUgaW50ZXJwb2xhdGlvbiAoXCJhe2J9Y1wiKSB3ZSdsbCByZWN1cnNlIGJhY2sgaW50byBoZXJlLlxuXHRXaGVuIGlzSW5RdW90ZSBpcyB0cnVlLCB3ZSB3aWxsIG5vdCBhbGxvdyBuZXdsaW5lcy5cblx0Ki9cblx0Y29uc3QgbGV4UGxhaW4gPSBpc0luUXVvdGUgPT4ge1xuXHRcdC8vIFRoaXMgdGVsbHMgdXMgd2hpY2ggaW5kZW50ZWQgYmxvY2sgd2UncmUgaW4uXG5cdFx0Ly8gSW5jcmVtZW50aW5nIGl0IG1lYW5zIGlzc3VpbmcgYSBHUF9PcGVuQmxvY2sgYW5kIGRlY3JlbWVudGluZyBpdCBtZWFucyBhIEdQX0Nsb3NlQmxvY2suXG5cdFx0Ly8gRG9lcyBub3RoaW5nIGlmIGlzSW5RdW90ZS5cblx0XHRsZXQgaW5kZW50ID0gMFxuXG5cdFx0Ly8gTWFrZSBjbG9zdXJlcyBub3cgcmF0aGVyIHRoYW4gaW5zaWRlIHRoZSBsb29wLlxuXHRcdC8vIFRoaXMgaXMgc2lnbmlmaWNhbnRseSBmYXN0ZXIgYXMgb2Ygbm9kZSB2MC4xMS4xNC5cblxuXHRcdC8vIFRoaXMgaXMgd2hlcmUgd2Ugc3RhcnRlZCBsZXhpbmcgdGhlIGN1cnJlbnQgdG9rZW4uXG5cdFx0bGV0IHN0YXJ0Q29sdW1uXG5cdFx0Y29uc3Rcblx0XHRcdHN0YXJ0UG9zID0gKCkgPT4gUG9zKGxpbmUsIHN0YXJ0Q29sdW1uKSxcblx0XHRcdGxvYyA9ICgpID0+IExvYyhzdGFydFBvcygpLCBwb3MoKSksXG5cdFx0XHRrZXl3b3JkID0ga2luZCA9PlxuXHRcdFx0XHRhZGRUb0N1cnJlbnRHcm91cChLZXl3b3JkKGxvYygpLCBraW5kKSksXG5cdFx0XHRmdW5LZXl3b3JkID0ga2luZCA9PiB7XG5cdFx0XHRcdGtleXdvcmQoa2luZClcblx0XHRcdFx0c3BhY2UobG9jKCkpXG5cdFx0XHR9LFxuXHRcdFx0ZWF0QW5kQWRkTnVtYmVyID0gKCkgPT4ge1xuXHRcdFx0XHQvLyBUT0RPOiBBIHJlYWwgbnVtYmVyIGxpdGVyYWwgbGV4ZXIsIG5vdCBqdXN0IEphdmFTY3JpcHQncy4uLlxuXHRcdFx0XHRjb25zdCBudW1iZXJTdHJpbmcgPSB0YWtlV2hpbGVXaXRoUHJldihpc051bWJlckNoYXJhY3Rlcilcblx0XHRcdFx0Y29uc3QgbnVtYmVyID0gTnVtYmVyKG51bWJlclN0cmluZylcblx0XHRcdFx0Y29udGV4dC5jaGVjayghTnVtYmVyLmlzTmFOKG51bWJlciksIHBvcywgKCkgPT5cblx0XHRcdFx0XHRgSW52YWxpZCBudW1iZXIgbGl0ZXJhbCAke2NvZGUobnVtYmVyU3RyaW5nKX1gKVxuXHRcdFx0XHRhZGRUb0N1cnJlbnRHcm91cChOdW1iZXJMaXRlcmFsKGxvYygpLCBudW1iZXIpKVxuXHRcdFx0fVxuXG5cdFx0Y29uc3QgaGFuZGxlTmFtZSA9ICgpID0+IHtcblx0XHRcdC8vIEFsbCBvdGhlciBjaGFyYWN0ZXJzIHNob3VsZCBiZSBoYW5kbGVkIGluIGEgY2FzZSBhYm92ZS5cblx0XHRcdGNvbnN0IG5hbWUgPSB0YWtlV2hpbGVXaXRoUHJldihpc05hbWVDaGFyYWN0ZXIpXG5cdFx0XHRjb25zdCBrZXl3b3JkS2luZCA9IG9wS2V5d29yZEtpbmRGcm9tTmFtZShuYW1lKVxuXHRcdFx0aWYgKGtleXdvcmRLaW5kICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0Y29udGV4dC5jaGVjayhrZXl3b3JkS2luZCAhPT0gLTEsIHBvcywgKCkgPT5cblx0XHRcdFx0XHRgUmVzZXJ2ZWQgbmFtZSAke2NvZGUobmFtZSl9YClcblx0XHRcdFx0aWYgKGtleXdvcmRLaW5kID09PSBLV19SZWdpb24pXG5cdFx0XHRcdFx0Ly8gVE9ETzogRWF0IGFuZCBwdXQgaXQgaW4gUmVnaW9uIGV4cHJlc3Npb25cblx0XHRcdFx0XHRza2lwUmVzdE9mTGluZSgpXG5cdFx0XHRcdGtleXdvcmQoa2V5d29yZEtpbmQpXG5cdFx0XHR9IGVsc2Vcblx0XHRcdFx0YWRkVG9DdXJyZW50R3JvdXAoTmFtZShsb2MoKSwgbmFtZSkpXG5cdFx0fVxuXG5cdFx0d2hpbGUgKHRydWUpIHtcblx0XHRcdHN0YXJ0Q29sdW1uID0gY29sdW1uXG5cdFx0XHRjb25zdCBjaGFyYWN0ZXJFYXRlbiA9IGVhdCgpXG5cdFx0XHQvLyBHZW5lcmFsbHksIHRoZSB0eXBlIG9mIGEgdG9rZW4gaXMgZGV0ZXJtaW5lZCBieSB0aGUgZmlyc3QgY2hhcmFjdGVyLlxuXHRcdFx0c3dpdGNoIChjaGFyYWN0ZXJFYXRlbikge1xuXHRcdFx0XHRjYXNlIFplcm86XG5cdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdGNhc2UgQ2xvc2VCcmFjZTpcblx0XHRcdFx0XHRjb250ZXh0LmNoZWNrKGlzSW5RdW90ZSwgbG9jLCAoKSA9PlxuXHRcdFx0XHRcdFx0YFJlc2VydmVkIGNoYXJhY3RlciAke3Nob3dDaGFyKENsb3NlQnJhY2UpfWApXG5cdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdGNhc2UgUXVvdGU6XG5cdFx0XHRcdFx0bGV4UXVvdGUoaW5kZW50KVxuXHRcdFx0XHRcdGJyZWFrXG5cblx0XHRcdFx0Ly8gR1JPVVBTXG5cblx0XHRcdFx0Y2FzZSBPcGVuUGFyZW50aGVzaXM6XG5cdFx0XHRcdFx0b3BlblBhcmVudGhlc2lzKGxvYygpKVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdGNhc2UgT3BlbkJyYWNrZXQ6XG5cdFx0XHRcdFx0b3BlbkJyYWNrZXQobG9jKCkpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0Y2FzZSBDbG9zZVBhcmVudGhlc2lzOlxuXHRcdFx0XHRcdGNsb3NlR3JvdXBzKHBvcygpLCBHX1BhcmVudGhlc2lzKVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdGNhc2UgQ2xvc2VCcmFja2V0OlxuXHRcdFx0XHRcdGNsb3NlR3JvdXBzKHBvcygpLCBHX0JyYWNrZXQpXG5cdFx0XHRcdFx0YnJlYWtcblxuXHRcdFx0XHRjYXNlIFNwYWNlOiB7XG5cdFx0XHRcdFx0Y29uc3QgbmV4dCA9IHBlZWsoKVxuXHRcdFx0XHRcdGNvbnRleHQud2FybklmKG5leHQgPT09IFNwYWNlLCBsb2MsICdNdWx0aXBsZSBzcGFjZXMgaW4gYSByb3cuJylcblx0XHRcdFx0XHRjb250ZXh0Lndhcm5JZihuZXh0ID09PSBOZXdsaW5lLCBsb2MsICdMaW5lIGVuZHMgaW4gYSBzcGFjZS4nKVxuXHRcdFx0XHRcdHNwYWNlKGxvYygpKVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRjYXNlIE5ld2xpbmU6IHtcblx0XHRcdFx0XHRjb250ZXh0LmNoZWNrKCFpc0luUXVvdGUsIGxvYywgJ1F1b3RlIGludGVycG9sYXRpb24gY2Fubm90IGNvbnRhaW4gbmV3bGluZScpXG5cblx0XHRcdFx0XHQvLyBTa2lwIGFueSBibGFuayBsaW5lcy5cblx0XHRcdFx0XHRza2lwTmV3bGluZXMoKVxuXHRcdFx0XHRcdGNvbnN0IG9sZEluZGVudCA9IGluZGVudFxuXHRcdFx0XHRcdGluZGVudCA9IHNraXBXaGlsZUVxdWFscyhUYWIpXG5cdFx0XHRcdFx0Y29udGV4dC5jaGVjayhwZWVrKCkgIT09IFNwYWNlLCBwb3MsICdMaW5lIGJlZ2lucyBpbiBhIHNwYWNlJylcblx0XHRcdFx0XHRpZiAoaW5kZW50IDw9IG9sZEluZGVudCkge1xuXHRcdFx0XHRcdFx0Y29uc3QgbCA9IGxvYygpXG5cdFx0XHRcdFx0XHRmb3IgKGxldCBpID0gaW5kZW50OyBpIDwgb2xkSW5kZW50OyBpID0gaSArIDEpIHtcblx0XHRcdFx0XHRcdFx0Y2xvc2VMaW5lKGwuc3RhcnQpXG5cdFx0XHRcdFx0XHRcdGNsb3NlR3JvdXBzKGwuZW5kLCBHX0Jsb2NrKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Y2xvc2VMaW5lKGwuc3RhcnQpXG5cdFx0XHRcdFx0XHRvcGVuTGluZShsLmVuZClcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y29udGV4dC5jaGVjayhpbmRlbnQgPT09IG9sZEluZGVudCArIDEsIGxvYyxcblx0XHRcdFx0XHRcdFx0J0xpbmUgaXMgaW5kZW50ZWQgbW9yZSB0aGFuIG9uY2UnKVxuXHRcdFx0XHRcdFx0Ly8gQmxvY2sgYXQgZW5kIG9mIGxpbmUgZ29lcyBpbiBpdHMgb3duIHNwYWNlZCBncm91cC5cblx0XHRcdFx0XHRcdC8vIEhvd2V2ZXIsIGB+YCBwcmVjZWRpbmcgYSBibG9jayBnb2VzIGluIGEgZ3JvdXAgd2l0aCBpdC5cblx0XHRcdFx0XHRcdGlmIChpc0VtcHR5KGN1ckdyb3VwLnN1YlRva2VucykgfHxcblx0XHRcdFx0XHRcdFx0IWlzS2V5d29yZChLV19MYXp5LCBsYXN0KGN1ckdyb3VwLnN1YlRva2VucykpKVxuXHRcdFx0XHRcdFx0XHRzcGFjZShsb2MoKSlcblx0XHRcdFx0XHRcdG9wZW5Hcm91cChsb2MoKS5zdGFydCwgR19CbG9jaylcblx0XHRcdFx0XHRcdG9wZW5MaW5lKGxvYygpLmVuZClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXNlIFRhYjpcblx0XHRcdFx0XHQvLyBXZSBhbHdheXMgZWF0IHRhYnMgaW4gdGhlIE5ld2xpbmUgaGFuZGxlcixcblx0XHRcdFx0XHQvLyBzbyB0aGlzIHdpbGwgb25seSBoYXBwZW4gaW4gdGhlIG1pZGRsZSBvZiBhIGxpbmUuXG5cdFx0XHRcdFx0Y29udGV4dC5mYWlsKGxvYygpLCAnVGFiIG1heSBvbmx5IGJlIHVzZWQgdG8gaW5kZW50JylcblxuXHRcdFx0XHQvLyBGVU5cblxuXHRcdFx0XHRjYXNlIEJhbmc6XG5cdFx0XHRcdFx0aWYgKHRyeUVhdChCYXIpKVxuXHRcdFx0XHRcdFx0ZnVuS2V5d29yZChLV19GdW5Ebylcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRoYW5kbGVOYW1lKClcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRjYXNlIFRpbGRlOlxuXHRcdFx0XHRcdGlmICh0cnlFYXQoQmFuZykpIHtcblx0XHRcdFx0XHRcdG11c3RFYXQoQmFyLCAnfiEnKVxuXHRcdFx0XHRcdFx0ZnVuS2V5d29yZChLV19HZW5GdW5Ebylcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHRyeUVhdChCYXIpKVxuXHRcdFx0XHRcdFx0ZnVuS2V5d29yZChLV19HZW5GdW4pXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0a2V5d29yZChLV19MYXp5KVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdGNhc2UgQmFyOlxuXHRcdFx0XHRcdGtleXdvcmQoS1dfRnVuKVxuXHRcdFx0XHRcdC8vIEZpcnN0IGFyZyBpbiBpdHMgb3duIHNwYWNlZCBncm91cFxuXHRcdFx0XHRcdHNwYWNlKGxvYygpKVxuXHRcdFx0XHRcdGJyZWFrXG5cblx0XHRcdFx0Ly8gTlVNQkVSXG5cblx0XHRcdFx0Y2FzZSBIeXBoZW46XG5cdFx0XHRcdFx0aWYgKGlzRGlnaXQocGVlaygpKSlcblx0XHRcdFx0XHRcdC8vIGVhdE51bWJlcigpIGxvb2tzIGF0IHByZXYgY2hhcmFjdGVyLCBzbyBoeXBoZW4gaW5jbHVkZWQuXG5cdFx0XHRcdFx0XHRlYXRBbmRBZGROdW1iZXIoKVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdGhhbmRsZU5hbWUoKVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdGNhc2UgTjA6IGNhc2UgTjE6IGNhc2UgTjI6IGNhc2UgTjM6IGNhc2UgTjQ6XG5cdFx0XHRcdGNhc2UgTjU6IGNhc2UgTjY6IGNhc2UgTjc6IGNhc2UgTjg6IGNhc2UgTjk6XG5cdFx0XHRcdFx0ZWF0QW5kQWRkTnVtYmVyKClcblx0XHRcdFx0XHRicmVha1xuXG5cblx0XHRcdFx0Ly8gT1RIRVJcblxuXHRcdFx0XHRjYXNlIEhhc2g6XG5cdFx0XHRcdFx0aWYgKHRyeUVhdChIYXNoKSkge1xuXHRcdFx0XHRcdFx0Ly8gTXVsdGktbGluZSBjb21tZW50XG5cdFx0XHRcdFx0XHRtdXN0RWF0KEhhc2gsICcjIycpXG5cdFx0XHRcdFx0XHR3aGlsZSAodHJ1ZSlcblx0XHRcdFx0XHRcdFx0aWYgKGVhdCgpID09PSBIYXNoICYmIGVhdCgpID09PSBIYXNoICYmIGVhdCgpID09PSBIYXNoKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29uc3QgbmwgPSB0cnlFYXQoTmV3bGluZSlcblx0XHRcdFx0XHRcdFx0XHRjb250ZXh0LmNoZWNrKG5sLCBsb2MsICgpID0+XG5cdFx0XHRcdFx0XHRcdFx0XHRgI0Nsb3Npbmcge2NvZGUoJyMjIycpfSBtdXN0IGJlIGZvbGxvd2VkIGJ5IG5ld2xpbmUuYClcblx0XHRcdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vIFNpbmdsZS1saW5lIGNvbW1lbnRcblx0XHRcdFx0XHRcdGlmICghKHRyeUVhdChTcGFjZSkgfHwgdHJ5RWF0KFRhYikpKVxuXHRcdFx0XHRcdFx0XHRjb250ZXh0LmZhaWwobG9jLCAoKSA9PlxuXHRcdFx0XHRcdFx0XHRcdGAke2NvZGUoJyMnKX0gbXVzdCBiZSBmb2xsb3dlZCBieSBzcGFjZSBvciB0YWIuYClcblx0XHRcdFx0XHRcdHNraXBSZXN0T2ZMaW5lKClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWtcblxuXHRcdFx0XHRjYXNlIERvdDoge1xuXHRcdFx0XHRcdGNvbnN0IG5leHQgPSBwZWVrKClcblx0XHRcdFx0XHRpZiAobmV4dCA9PT0gU3BhY2UgfHwgbmV4dCA9PT0gTmV3bGluZSkge1xuXHRcdFx0XHRcdFx0Ly8gT2JqTGl0IGFzc2lnbiBpbiBpdHMgb3duIHNwYWNlZCBncm91cC5cblx0XHRcdFx0XHRcdC8vIFdlIGNhbid0IGp1c3QgY3JlYXRlIGEgbmV3IEdyb3VwIGhlcmUgYmVjYXVzZSB3ZSB3YW50IHRvXG5cdFx0XHRcdFx0XHQvLyBlbnN1cmUgaXQncyBub3QgcGFydCBvZiB0aGUgcHJlY2VkaW5nIG9yIGZvbGxvd2luZyBzcGFjZWQgZ3JvdXAuXG5cdFx0XHRcdFx0XHRjbG9zZUdyb3VwcyhzdGFydFBvcygpLCBHX1NwYWNlKVxuXHRcdFx0XHRcdFx0a2V5d29yZChLV19PYmpBc3NpZ24pXG5cdFx0XHRcdFx0XHQvLyBUaGlzIGV4aXN0cyBzb2xlbHkgc28gdGhhdCB0aGUgU3BhY2Ugb3IgTmV3bGluZSBoYW5kbGVyIGNhbiBjbG9zZSBpdC4uLlxuXHRcdFx0XHRcdFx0b3Blbkdyb3VwKHBvcygpLCBHX1NwYWNlKVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQvLyArMSBmb3IgdGhlIGRvdCB3ZSBqdXN0IGF0ZS5cblx0XHRcdFx0XHRcdGNvbnN0IG5Eb3RzID0gc2tpcFdoaWxlRXF1YWxzKERvdCkgKyAxXG5cdFx0XHRcdFx0XHRjb25zdCBuZXh0ID0gcGVlaygpXG5cdFx0XHRcdFx0XHRpZiAobkRvdHMgPT09IDMgJiYgbmV4dCA9PT0gU3BhY2UgfHwgbmV4dCA9PT0gTmV3bGluZSlcblx0XHRcdFx0XHRcdFx0a2V5d29yZChLV19FbGxpcHNpcylcblx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdFx0YWRkVG9DdXJyZW50R3JvdXAoRG90TmFtZShsb2MoKSwgbkRvdHMsIHRha2VXaGlsZShpc05hbWVDaGFyYWN0ZXIpKSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNhc2UgQ29sb246XG5cdFx0XHRcdFx0aWYgKHRyeUVhdChDb2xvbikpIHtcblx0XHRcdFx0XHRcdG11c3RFYXQoRXF1YWwsICc6OicpXG5cdFx0XHRcdFx0XHRrZXl3b3JkKEtXX0Fzc2lnbk11dGFibGUpXG5cdFx0XHRcdFx0fSBlbHNlIGlmICh0cnlFYXQoRXF1YWwpKVxuXHRcdFx0XHRcdFx0a2V5d29yZChLV19Mb2NhbE11dGF0ZSlcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRrZXl3b3JkKEtXX1R5cGUpXG5cdFx0XHRcdFx0YnJlYWtcblxuXHRcdFx0XHRjYXNlIFVuZGVyc2NvcmU6XG5cdFx0XHRcdFx0a2V5d29yZChLV19Gb2N1cylcblx0XHRcdFx0XHRicmVha1xuXG5cdFx0XHRcdGNhc2UgQW1wZXJzYW5kOiBjYXNlIEJhY2tzbGFzaDogY2FzZSBCYWNrdGljazogY2FzZSBDYXJldDpcblx0XHRcdFx0Y2FzZSBDb21tYTogY2FzZSBQZXJjZW50OiBjYXNlIFNlbWljb2xvbjpcblx0XHRcdFx0XHRjb250ZXh0LmZhaWwobG9jLCBgUmVzZXJ2ZWQgY2hhcmFjdGVyICR7c2hvd0NoYXIoY2hhcmFjdGVyRWF0ZW4pfWApXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0aGFuZGxlTmFtZSgpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgbGV4UXVvdGUgPSBpbmRlbnQgPT4ge1xuXHRcdGNvbnN0IHF1b3RlSW5kZW50ID0gaW5kZW50ICsgMVxuXG5cdFx0Ly8gSW5kZW50ZWQgcXVvdGUgaXMgY2hhcmFjdGVyaXplZCBieSBiZWluZyBpbW1lZGlhdGVseSBmb2xsb3dlZCBieSBhIG5ld2xpbmUuXG5cdFx0Ly8gVGhlIG5leHQgbGluZSAqbXVzdCogaGF2ZSBzb21lIGNvbnRlbnQgYXQgdGhlIG5leHQgaW5kZW50YXRpb24uXG5cdFx0Y29uc3QgaXNJbmRlbnRlZCA9IHRyeUVhdE5ld2xpbmUoKVxuXHRcdGlmIChpc0luZGVudGVkKSB7XG5cdFx0XHRjb25zdCBhY3R1YWxJbmRlbnQgPSBza2lwV2hpbGVFcXVhbHMoVGFiKVxuXHRcdFx0Y29udGV4dC5jaGVjayhhY3R1YWxJbmRlbnQgPT09IHF1b3RlSW5kZW50LCBwb3MsXG5cdFx0XHRcdCdJbmRlbnRlZCBxdW90ZSBtdXN0IGhhdmUgZXhhY3RseSBvbmUgbW9yZSBpbmRlbnQgdGhhbiBwcmV2aW91cyBsaW5lLicpXG5cdFx0fVxuXG5cdFx0Ly8gQ3VycmVudCBzdHJpbmcgbGl0ZXJhbCBwYXJ0IG9mIHF1b3RlIHdlIGFyZSByZWFkaW5nLlxuXHRcdGxldCByZWFkID0gJydcblxuXHRcdGNvbnN0IG1heWJlT3V0cHV0UmVhZCA9ICgpID0+IHtcblx0XHRcdGlmIChyZWFkICE9PSAnJykge1xuXHRcdFx0XHRhZGRUb0N1cnJlbnRHcm91cChyZWFkKVxuXHRcdFx0XHRyZWFkID0gJydcblx0XHRcdH1cblx0XHR9XG5cblx0XHRjb25zdCBsb2NTaW5nbGUgPSAoKSA9PiBzaW5nbGVDaGFyTG9jKHBvcygpKVxuXG5cdFx0b3Blbkdyb3VwKGxvY1NpbmdsZSgpLnN0YXJ0LCBHX1F1b3RlKVxuXG5cdFx0ZWF0Q2hhcnM6IHdoaWxlICh0cnVlKSB7XG5cdFx0XHRjb25zdCBjaGFyID0gZWF0KClcblx0XHRcdHN3aXRjaCAoY2hhcikge1xuXHRcdFx0XHRjYXNlIEJhY2tzbGFzaDoge1xuXHRcdFx0XHRcdHJlYWQgPSByZWFkICsgcXVvdGVFc2NhcGUoZWF0KCkpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXNlIE9wZW5CcmFjZToge1xuXHRcdFx0XHRcdG1heWJlT3V0cHV0UmVhZCgpXG5cdFx0XHRcdFx0Y29uc3QgbCA9IGxvY1NpbmdsZSgpXG5cdFx0XHRcdFx0b3BlblBhcmVudGhlc2lzKGwpXG5cdFx0XHRcdFx0bGV4UGxhaW4odHJ1ZSlcblx0XHRcdFx0XHRjbG9zZUdyb3VwcyhsLmVuZCwgR19QYXJlbnRoZXNpcylcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhc2UgTmV3bGluZToge1xuXHRcdFx0XHRcdGNvbnN0IG9yaWdpbmFsUG9zID0gcG9zKClcblx0XHRcdFx0XHQvLyBHbyBiYWNrIHRvIGJlZm9yZSB3ZSBhdGUgaXQuXG5cdFx0XHRcdFx0b3JpZ2luYWxQb3MuY29sdW1uID0gb3JpZ2luYWxQb3MuY29sdW1uIC0gMVxuXG5cdFx0XHRcdFx0Y29udGV4dC5jaGVjayhpc0luZGVudGVkLCBsb2NTaW5nbGUsICdVbmNsb3NlZCBxdW90ZS4nKVxuXHRcdFx0XHRcdC8vIEFsbG93IGV4dHJhIGJsYW5rIGxpbmVzLlxuXHRcdFx0XHRcdGNvbnN0IG51bU5ld2xpbmVzID0gc2tpcE5ld2xpbmVzKClcblx0XHRcdFx0XHRjb25zdCBuZXdJbmRlbnQgPSBza2lwV2hpbGVFcXVhbHMoVGFiKVxuXHRcdFx0XHRcdGlmIChuZXdJbmRlbnQgPCBxdW90ZUluZGVudCkge1xuXHRcdFx0XHRcdFx0Ly8gSW5kZW50ZWQgcXVvdGUgc2VjdGlvbiBpcyBvdmVyLlxuXHRcdFx0XHRcdFx0Ly8gVW5kbyByZWFkaW5nIHRoZSB0YWJzIGFuZCBuZXdsaW5lLlxuXHRcdFx0XHRcdFx0c3RlcEJhY2tNYW55KG9yaWdpbmFsUG9zLCBudW1OZXdsaW5lcyArIG5ld0luZGVudClcblx0XHRcdFx0XHRcdGFzc2VydChwZWVrKCkgPT09IE5ld2xpbmUpXG5cdFx0XHRcdFx0XHRicmVhayBlYXRDaGFyc1xuXHRcdFx0XHRcdH0gZWxzZVxuXHRcdFx0XHRcdFx0cmVhZCA9IHJlYWQgK1xuXHRcdFx0XHRcdFx0XHQnXFxuJy5yZXBlYXQobnVtTmV3bGluZXMpICsgJ1xcdCcucmVwZWF0KG5ld0luZGVudCAtIHF1b3RlSW5kZW50KVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdH1cblx0XHRcdFx0Y2FzZSBRdW90ZTpcblx0XHRcdFx0XHRpZiAoIWlzSW5kZW50ZWQpXG5cdFx0XHRcdFx0XHRicmVhayBlYXRDaGFyc1xuXHRcdFx0XHRcdC8vIEVsc2UgZmFsbHRocm91Z2hcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHQvLyBJJ3ZlIHRyaWVkIHB1c2hpbmcgY2hhcmFjdGVyIGNvZGVzIHRvIGFuIGFycmF5IGFuZCBzdHJpbmdpZnlpbmcgdGhlbSBsYXRlcixcblx0XHRcdFx0XHQvLyBidXQgdGhpcyB0dXJuZWQgb3V0IHRvIGJlIGJldHRlci5cblx0XHRcdFx0XHRyZWFkID0gcmVhZCArIFN0cmluZy5mcm9tQ2hhckNvZGUoY2hhcilcblx0XHRcdH1cblx0XHR9XG5cblx0XHRtYXliZU91dHB1dFJlYWQoKVxuXHRcdGNsb3NlR3JvdXBzKHBvcygpLCBHX1F1b3RlKVxuXHR9XG5cblx0Y29uc3QgcXVvdGVFc2NhcGUgPSBjaCA9PiB7XG5cdFx0c3dpdGNoIChjaCkge1xuXHRcdFx0Y2FzZSBPcGVuQnJhY2U6IHJldHVybiAneydcblx0XHRcdGNhc2UgTGV0dGVyTjogcmV0dXJuICdcXG4nXG5cdFx0XHRjYXNlIExldHRlclQ6IHJldHVybiAnXFx0J1xuXHRcdFx0Y2FzZSBRdW90ZTogcmV0dXJuICdcIidcblx0XHRcdGNhc2UgQmFja3NsYXNoOiByZXR1cm4gJ1xcXFwnXG5cdFx0XHRkZWZhdWx0OiBjb250ZXh0LmZhaWwocG9zLCBgTm8gbmVlZCB0byBlc2NhcGUgJHtzaG93Q2hhcihjaCl9YClcblx0XHR9XG5cdH1cblxuXHRjdXJHcm91cCA9IEdyb3VwKExvYyhTdGFydFBvcywgbnVsbCksIFsgXSwgR19CbG9jaylcblx0b3BlbkxpbmUoU3RhcnRQb3MpXG5cblx0bGV4UGxhaW4oZmFsc2UpXG5cblx0Y29uc3QgZW5kUG9zID0gcG9zKClcblx0Y2xvc2VMaW5lKGVuZFBvcylcblx0YXNzZXJ0KGlzRW1wdHkoZ3JvdXBTdGFjaykpXG5cdGN1ckdyb3VwLmxvYy5lbmQgPSBlbmRQb3Ncblx0cmV0dXJuIGN1ckdyb3VwXG59XG5cbmNvbnN0IGNjID0gXyA9PiBfLmNoYXJDb2RlQXQoMClcbmNvbnN0XG5cdEFtcGVyc2FuZCA9IGNjKCcmJyksXG5cdEJhY2tzbGFzaCA9IGNjKCdcXFxcJyksXG5cdEJhY2t0aWNrID0gY2MoJ2AnKSxcblx0QmFuZyA9IGNjKCchJyksXG5cdEJhciA9IGNjKCd8JyksXG5cdENhcmV0ID0gY2MoJ14nKSxcblx0Q2xvc2VCcmFjZSA9IGNjKCd9JyksXG5cdENsb3NlQnJhY2tldCA9IGNjKCddJyksXG5cdENsb3NlUGFyZW50aGVzaXMgPSBjYygnKScpLFxuXHRDb2xvbiA9IGNjKCc6JyksXG5cdENvbW1hID0gY2MoJywnKSxcblx0RG90ID0gY2MoJy4nKSxcblx0RXF1YWwgPSBjYygnPScpLFxuXHRIYXNoID0gY2MoJyMnKSxcblx0SHlwaGVuID0gY2MoJy0nKSxcblx0TGV0dGVyTiA9IGNjKCduJyksXG5cdExldHRlclQgPSBjYygndCcpLFxuXHROMCA9IGNjKCcwJyksXG5cdE4xID0gY2MoJzEnKSxcblx0TjIgPSBjYygnMicpLFxuXHROMyA9IGNjKCczJyksXG5cdE40ID0gY2MoJzQnKSxcblx0TjUgPSBjYygnNScpLFxuXHRONiA9IGNjKCc2JyksXG5cdE43ID0gY2MoJzcnKSxcblx0TjggPSBjYygnOCcpLFxuXHROOSA9IGNjKCc5JyksXG5cdE5ld2xpbmUgPSBjYygnXFxuJyksXG5cdE9wZW5CcmFjZSA9IGNjKCd7JyksXG5cdE9wZW5CcmFja2V0ID0gY2MoJ1snKSxcblx0T3BlblBhcmVudGhlc2lzID0gY2MoJygnKSxcblx0UGVyY2VudCA9IGNjKCclJyksXG5cdFF1b3RlID0gY2MoJ1wiJyksXG5cdFNlbWljb2xvbiA9IGNjKCc7JyksXG5cdFNwYWNlID0gY2MoJyAnKSxcblx0VGFiID0gY2MoJ1xcdCcpLFxuXHRUaWxkZSA9IGNjKCd+JyksXG5cdFVuZGVyc2NvcmUgPSBjYygnXycpLFxuXHRaZXJvID0gY2MoJ1xcMCcpXG5cbmNvbnN0XG5cdHNob3dDaGFyID0gY2hhciA9PiBjb2RlKFN0cmluZy5mcm9tQ2hhckNvZGUoY2hhcikpLFxuXHRfY2hhclByZWQgPSAoY2hhcnMsIG5lZ2F0ZSkgPT4ge1xuXHRcdGxldCBzcmMgPSAnc3dpdGNoKGNoKSB7XFxuJ1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcnMubGVuZ3RoOyBpID0gaSArIDEpXG5cdFx0XHRzcmMgPSBgJHtzcmN9Y2FzZSAke2NoYXJzLmNoYXJDb2RlQXQoaSl9OiBgXG5cdFx0c3JjID0gYCR7c3JjfSByZXR1cm4gJHshbmVnYXRlfVxcbmRlZmF1bHQ6IHJldHVybiAke25lZ2F0ZX1cXG59YFxuXHRcdHJldHVybiBGdW5jdGlvbignY2gnLCBzcmMpXG5cdH0sXG5cdGlzRGlnaXQgPSBfY2hhclByZWQoJzAxMjM0NTY3ODknKSxcblx0aXNOYW1lQ2hhcmFjdGVyID0gX2NoYXJQcmVkKE5vbk5hbWVDaGFyYWN0ZXJzLCB0cnVlKSxcblx0aXNOdW1iZXJDaGFyYWN0ZXIgPSBfY2hhclByZWQoJzAxMjM0NTY3ODkuZScpXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==