if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', '../CompileError', './language', './Token', './util'], function (exports, module, _esastDistLoc, _CompileError, _language, _Token, _util) {
	'use strict';

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _Loc = _interopRequire(_esastDistLoc);

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
			return curGroup.tokens.push(token);
		},
		     

		// Pause writing to curGroup in favor of writing to a sub-group.
		// When the sub-group finishes we will pop the stack and resume writing to its parent.
		openGroup = function (openPos, groupKind) {
			groupStack.push(curGroup);
			// Contents will be added to by `o`.
			// curGroup.loc.end will be written to when closing it.
			curGroup = (0, _Token.Group)((0, _Loc)(openPos, null), [], groupKind);
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
						const size = justClosed.tokens.length;
						if (size !== 0)
							// Spaced should always have at least two elements.
							addToCurrentGroup(size === 1 ? justClosed.tokens[0] : justClosed);
						break;
					}
				case _Token.G_Line:
					// Line must have content.
					// This can happen if there was just a comment.
					if (!(0, _util.isEmpty)(justClosed.tokens)) addToCurrentGroup(justClosed);
					break;
				case _Token.G_Block:
					context.check(!(0, _util.isEmpty)(justClosed.tokens), closePos, 'Empty block.');
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
				return (0, _Loc)(startPos(), pos());
			},
			      keyword = function (kind) {
				return addToCurrentGroup((0, _Token.Keyword)(loc(), kind));
			},
			      eatAndAddNumber = function () {
				// TODO: A real number literal lexer, not just JavaScript's...
				const numberString = takeWhileWithPrev(isNumberCharacter);
				const number = Number(numberString);
				context.check(!Number.isNaN(number), pos, function () {
					return 'Invalid number literal ' + (0, _CompileError.code)(numberString);
				});
				addToCurrentGroup((0, _Token.TokenNumberLiteral)(loc(), number));
			};

			while (true) {
				startColumn = column;
				const characterEaten = eat();
				// Generally, the type of a token is determined by the first character.
				switch (characterEaten) {
					case Zero:
						return;
					case N0:case N1:case N2:case N3:case N4:
					case N5:case N6:case N7:case N8:case N9:
						eatAndAddNumber();
						break;
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
						closeGroups(pos().end, _Token.G_Bracket);
						break;
					case CloseBrace:
						context.check(isInQuote, loc, function () {
							return 'Reserved character ' + showChar(CloseBrace);
						});
						return;
					case Space:
						{
							const next = peek();
							context.warnIf(next === Space, loc, 'Multiple spaces in a row.');
							context.warnIf(next === Newline, loc, 'Line ends in a space.');
							space(loc());
							break;
						}
					case Dot:
						{
							const p = peek();
							if (p === Space || p === Newline) {
								// ObjLit assign in its own spaced group.
								// We can't just create a new Group here because we want to
								// ensure it's not part of the preceding or following spaced group.
								closeGroups(startPos(), _Token.G_Space);
								keyword(_Token.KW_ObjAssign);
								openGroup(pos(), _Token.G_Space);
							} else addToCurrentGroup((0, _Token.DotName)(loc(),
							// +1 for the dot we just skipped.
							skipWhileEquals(Dot) + 1, takeWhile(isNameCharacter)));
							break;
						}
					case Colon:
						if (tryEat(Colon)) {
							const eq = tryEat(Equal);
							context.check(eq, loc, function () {
								return '' + (0, _CompileError.code)('::') + ' must be followed by ' + (0, _CompileError.code)('=');
							});
							keyword(_Token.KW_AssignMutable);
						} else if (tryEat(Equal)) keyword(_Token.KW_AssignMutate);else keyword(_Token.KW_Type);
						break;
					case Tilde:
						if (tryEat(Bar)) {
							keyword(_Token.KW_GenFun);
							space(loc());
							break;
						} else {
							keyword(_Token.KW_Lazy);
							break;
						}
						break;
					case Bar:
						keyword(_Token.KW_Fun);
						// First arg in its own spaced group
						space(loc());
						break;
					case Underscore:
						keyword(_Token.KW_Focus);
						break;
					case Hash:
						if (!(tryEat(Space) || tryEat(Tab))) context.fail(loc, function () {
							return '' + (0, _CompileError.code)('#') + ' must be followed by space or tab.}';
						});
						skipRestOfLine();
						break;
					case Newline:
						{
							context.check(!isInQuote, loc, 'Quote interpolation cannot contain newline');

							// Skip any blank lines.
							skipNewlines();
							const oldIndent = indent;
							indent = skipWhileEquals(Tab);
							context.check(peek() !== Space, pos, 'Line begins in a space');
							if (indent <= oldIndent) {
								for (let i = indent; i < oldIndent; i = i + 1) {
									closeLine(loc.start);
									closeGroups(loc.end, _Token.G_Block);
								}
								closeLine(loc().start);
								openLine(loc().end);
							} else {
								context.check(indent === oldIndent + 1, loc, 'Line is indented more than once');
								// Block at end of line goes in its own spaced group.
								// However, `~` preceding a block goes in a group with it.
								if ((0, _util.isEmpty)(curGroup.tokens) || !(0, _Token.isKeyword)(_Token.KW_Lazy, (0, _util.last)(curGroup.tokens))) space(loc());
								openGroup(loc().start, _Token.G_Block);
								openLine(loc().end);
							}
							break;
						}
					case Quote:
						lexQuote(indent);
						break;
					case Ampersand:case Backslash:case Backtick:case Caret:
					case Comma:case Percent:case Semicolon:
						context.fail(loc, 'Reserved character ' + showChar(characterEaten));
					case Tab:
						// We always eat tabs in the Newline handler,
						// so this will only happen in the middle of a line.
						context.fail(loc(), 'Tab may only be used to indent');
					case Hyphen:
						if (isDigit(peek())) {
							// eatNumber() looks at prev character, so hyphen included.
							eatAndAddNumber();
							break;
						}
					// else fallthrough
					default:
						{
							// All other characters should be handled in a case above.
							const name = takeWhileWithPrev(isNameCharacter);
							const keywordKind = (0, _Token.keywordKindFromName)(name);
							if (keywordKind !== undefined) {
								if (keywordKind === _Token.KW_Region)
									// TODO: Eat and put it in Region expression
									skipRestOfLine();
								keyword(keywordKind);
							} else if (tryEat(Underscore)) addToCurrentGroup((0, _Token.CallOnFocus)(loc(), name));else {
								context.check(!(0, _language.isReservedName)(name), pos, function () {
									return 'Reserved name ' + (0, _CompileError.code)(name);
								});
								addToCurrentGroup((0, _Token.Name)(loc(), name));
							}
						}
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
			closeGroups(locSingle().start, _Token.G_Quote);
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

		curGroup = (0, _Token.Group)((0, _Loc)(_esastDistLoc.StartPos, null), [], _Token.G_Block);
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
		for (let i = 0; i < chars.length; i = i + 1) src = '' + src + 'case ' + chars.charCodeAt(i) + ': ';
		src = '' + src + ' return ' + !negate + '\ndefault: return ' + negate + '\n}';
		return Function('ch', src);
	},
	      isDigit = _charPred('0123456789'),
	      isNameCharacter = _charPred(_language.NonNameCharacters, true),
	      isNumberCharacter = _charPred('0123456789.e');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL2xleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztrQkFZZSxVQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUs7OztBQUd6QyxjQUFZLEdBQUcsWUFBWSxHQUFHLFVBQU0sQ0FBQTs7Ozs7Ozs7QUFRcEMsUUFBTSxVQUFVLEdBQUcsRUFBRyxDQUFBO0FBQ3RCLE1BQUksUUFBUSxDQUFBO0FBQ1osUUFDQyxpQkFBaUIsR0FBRyxVQUFBLEtBQUs7VUFDeEIsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0dBQUE7Ozs7O0FBSTVCLFdBQVMsR0FBRyxVQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUs7QUFDbkMsYUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTs7O0FBR3pCLFdBQVEsR0FBRyxXQWhDaUIsS0FBSyxFQWdDaEIsVUFBSSxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRyxFQUFFLFNBQVMsQ0FBQyxDQUFBO0dBQ3BEOzs7OztBQUlELGFBQVcsR0FBRyxVQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUs7OztBQUd0QyxVQUFPLFFBQVEsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO0FBQ25DLFVBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUE7O0FBRTdCLFdBQU8sQ0FBQyxLQUFLLENBQ1osT0FBTyxZQTVDc0QsYUFBYSxBQTRDakQsSUFBSSxPQUFPLFlBNUNNLFNBQVMsQUE0Q0QsSUFBSSxPQUFPLFlBNUNlLE9BQU8sQUE0Q1YsRUFDekUsUUFBUSxFQUFFO1lBQ1YscUJBQW1CLFdBNUNxQyxhQUFhLEVBNENwQyxTQUFTLENBQUMsb0NBQ3BCLFdBN0NpQyxhQUFhLEVBNkNoQyxPQUFPLENBQUMsQ0FBRTtLQUFBLENBQUMsQ0FBQTtBQUNqRCxxQkFBaUIsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzFDO0FBQ0Qsb0JBQWlC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RyxnQkFBZ0IsQ0FBQTtBQUMxQixPQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFDMUMsR0FBRyxRQUFNLEdBQUcsYUFBUSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxPQUFJLENBQUE7QUFDNUMsS0FBRyxRQUFNLEdBQUcsZ0JBQVcsQ0FBQyxNQUFNLDBCQUFxQixNQUFNLFFBQUssQ0FBQTtBQUM5RCxTQUFPLFFBQVEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUE7RUFDMUI7T0FDRCxPQUFPLEdBQUcsU0FBUyxDQUFDLFlBQVksQ0FBQztPQUNqQyxlQUFlLEdBQUcsU0FBUyxXQTFqQkgsaUJBQWlCLEVBMGpCTSxJQUFJLENBQUM7T0FDcEQsaUJBQWlCLEdBQUcsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL2xleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMb2MsIHsgUG9zLCBTdGFydExpbmUsIFN0YXJ0UG9zLCBTdGFydENvbHVtbiwgc2luZ2xlQ2hhckxvYyB9IGZyb20gJ2VzYXN0L2Rpc3QvTG9jJ1xuaW1wb3J0IHsgY29kZSB9IGZyb20gJy4uL0NvbXBpbGVFcnJvcidcbmltcG9ydCB7IGlzUmVzZXJ2ZWROYW1lLCBOb25OYW1lQ2hhcmFjdGVycyB9IGZyb20gJy4vbGFuZ3VhZ2UnXG5pbXBvcnQgeyBDYWxsT25Gb2N1cywgRG90TmFtZSwgR3JvdXAsIEdfQmxvY2ssIEdfQnJhY2tldCwgR19MaW5lLCBHX1BhcmVudGhlc2lzLCBHX1NwYWNlLCBHX1F1b3RlLFxuXHRpc0tleXdvcmQsIEtleXdvcmQsIGtleXdvcmRLaW5kRnJvbU5hbWUsIEtXX0Fzc2lnbk11dGFibGUsIEtXX0Fzc2lnbk11dGF0ZSwgS1dfRm9jdXMsIEtXX0Z1bixcblx0S1dfR2VuRnVuLCBLV19MYXp5LCBLV19PYmpBc3NpZ24sIEtXX1JlZ2lvbiwgS1dfVHlwZSwgTmFtZSwgc2hvd0dyb3VwS2luZCwgVG9rZW5OdW1iZXJMaXRlcmFsXG5cdH0gZnJvbSAnLi9Ub2tlbidcbmltcG9ydCB7IGFzc2VydCwgaXNFbXB0eSwgbGFzdCB9IGZyb20gJy4vdXRpbCdcblxuLypcblRoaXMgcHJvZHVjZXMgdGhlIFRva2VuIHRyZWUgKHNlZSBUb2tlbi5qcykuXG4qL1xuZXhwb3J0IGRlZmF1bHQgKGNvbnRleHQsIHNvdXJjZVN0cmluZykgPT4ge1xuXHQvLyBMZXhpbmcgYWxnb3JpdGhtIHJlcXVpcmVzIHRyYWlsaW5nIG5ld2xpbmUgdG8gY2xvc2UgYW55IGJsb2Nrcy5cblx0Ly8gVXNlIGEgbnVsbC10ZXJtaW5hdGVkIHN0cmluZyBiZWNhdXNlIGl0J3MgZmFzdGVyIHRoYW4gY2hlY2tpbmcgd2hldGhlciBpbmRleCA9PT0gbGVuZ3RoLlxuXHRzb3VyY2VTdHJpbmcgPSBzb3VyY2VTdHJpbmcgKyAnXFxuXFwwJ1xuXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIEdST1VQSU5HXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIFdlIG9ubHkgZXZlciB3cml0ZSB0byB0aGUgaW5uZXJtb3N0IEdyb3VwO1xuXHQvLyB3aGVuIHdlIGNsb3NlIHRoYXQgR3JvdXAgd2UgYWRkIGl0IHRvIHRoZSBlbmNsb3NpbmcgR3JvdXAgYW5kIGNvbnRpbnVlIHdpdGggdGhhdCBvbmUuXG5cdC8vIE5vdGUgdGhhdCBgY3VyR3JvdXBgIGlzIGNvbmNlcHR1YWxseSB0aGUgdG9wIG9mIHRoZSBzdGFjaywgYnV0IGlzIG5vdCBzdG9yZWQgaW4gYHN0YWNrYC5cblx0Y29uc3QgZ3JvdXBTdGFjayA9IFsgXVxuXHRsZXQgY3VyR3JvdXBcblx0Y29uc3Rcblx0XHRhZGRUb0N1cnJlbnRHcm91cCA9IHRva2VuID0+XG5cdFx0XHRjdXJHcm91cC50b2tlbnMucHVzaCh0b2tlbiksXG5cblx0XHQvLyBQYXVzZSB3cml0aW5nIHRvIGN1ckdyb3VwIGluIGZhdm9yIG9mIHdyaXRpbmcgdG8gYSBzdWItZ3JvdXAuXG5cdFx0Ly8gV2hlbiB0aGUgc3ViLWdyb3VwIGZpbmlzaGVzIHdlIHdpbGwgcG9wIHRoZSBzdGFjayBhbmQgcmVzdW1lIHdyaXRpbmcgdG8gaXRzIHBhcmVudC5cblx0XHRvcGVuR3JvdXAgPSAob3BlblBvcywgZ3JvdXBLaW5kKSA9PiB7XG5cdFx0XHRncm91cFN0YWNrLnB1c2goY3VyR3JvdXApXG5cdFx0XHQvLyBDb250ZW50cyB3aWxsIGJlIGFkZGVkIHRvIGJ5IGBvYC5cblx0XHRcdC8vIGN1ckdyb3VwLmxvYy5lbmQgd2lsbCBiZSB3cml0dGVuIHRvIHdoZW4gY2xvc2luZyBpdC5cblx0XHRcdGN1ckdyb3VwID0gR3JvdXAoTG9jKG9wZW5Qb3MsIG51bGwpLCBbIF0sIGdyb3VwS2luZClcblx0XHR9LFxuXG5cdFx0Ly8gQSBncm91cCBlbmRpbmcgbWF5IGNsb3NlIG11dGxpcGxlIGdyb3Vwcy5cblx0XHQvLyBGb3IgZXhhbXBsZSwgaW4gYGxvZyEgKCsgMSAxYCwgdGhlIEdfTGluZSB3aWxsIGFsc28gY2xvc2UgYSBHX1BhcmVudGhlc2lzLlxuXHRcdGNsb3NlR3JvdXBzID0gKGNsb3NlUG9zLCBjbG9zZUtpbmQpID0+IHtcblx0XHRcdC8vIGN1ckdyb3VwIGlzIGRpZmZlcmVudCBlYWNoIHRpbWUgd2UgZ28gdGhyb3VnaCB0aGUgbG9vcFxuXHRcdFx0Ly8gYmVjYXVzZSBfY2xvc2VTaW5nbGVHcm91cCBicmluZ3MgdXMgdG8gYW4gZW5jbG9zaW5nIGdyb3VwLlxuXHRcdFx0d2hpbGUgKGN1ckdyb3VwLmtpbmQgIT09IGNsb3NlS2luZCkge1xuXHRcdFx0XHRjb25zdCBjdXJLaW5kID0gY3VyR3JvdXAua2luZFxuXHRcdFx0XHQvLyBBIGxpbmUgY2FuIGNsb3NlIGEgcGFyZW50aGVzaXMsIGJ1dCBhIHBhcmVudGhlc2lzIGNhbid0IGNsb3NlIGEgbGluZSFcblx0XHRcdFx0Y29udGV4dC5jaGVjayhcblx0XHRcdFx0XHRjdXJLaW5kID09PSBHX1BhcmVudGhlc2lzIHx8IGN1cktpbmQgPT09IEdfQnJhY2tldCB8fCBjdXJLaW5kID09PSBHX1NwYWNlLFxuXHRcdFx0XHRcdGNsb3NlUG9zLCAoKSA9PlxuXHRcdFx0XHRcdGBUcnlpbmcgdG8gY2xvc2UgJHtzaG93R3JvdXBLaW5kKGNsb3NlS2luZCl9LCBgICtcblx0XHRcdFx0XHRgYnV0IGxhc3Qgb3BlbmVkIHdhcyAke3Nob3dHcm91cEtpbmQoY3VyS2luZCl9YClcblx0XHRcdFx0X2Nsb3NlU2luZ2xlR3JvdXAoY2xvc2VQb3MsIGN1ckdyb3VwLmtpbmQpXG5cdFx0XHR9XG5cdFx0XHRfY2xvc2VTaW5nbGVHcm91cChjbG9zZVBvcywgY2xvc2VLaW5kKVxuXHRcdH0sXG5cblx0XHRfY2xvc2VTaW5nbGVHcm91cCA9IChjbG9zZVBvcywgY2xvc2VLaW5kKSA9PiB7XG5cdFx0XHRsZXQganVzdENsb3NlZCA9IGN1ckdyb3VwXG5cdFx0XHRjdXJHcm91cCA9IGdyb3VwU3RhY2sucG9wKClcblx0XHRcdGp1c3RDbG9zZWQubG9jLmVuZCA9IGNsb3NlUG9zXG5cdFx0XHRzd2l0Y2ggKGNsb3NlS2luZCkge1xuXHRcdFx0XHRjYXNlIEdfU3BhY2U6IHtcblx0XHRcdFx0XHRjb25zdCBzaXplID0ganVzdENsb3NlZC50b2tlbnMubGVuZ3RoXG5cdFx0XHRcdFx0aWYgKHNpemUgIT09IDApXG5cdFx0XHRcdFx0XHQvLyBTcGFjZWQgc2hvdWxkIGFsd2F5cyBoYXZlIGF0IGxlYXN0IHR3byBlbGVtZW50cy5cblx0XHRcdFx0XHRcdGFkZFRvQ3VycmVudEdyb3VwKHNpemUgPT09IDEgPyBqdXN0Q2xvc2VkLnRva2Vuc1swXSA6IGp1c3RDbG9zZWQpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXNlIEdfTGluZTpcblx0XHRcdFx0XHQvLyBMaW5lIG11c3QgaGF2ZSBjb250ZW50LlxuXHRcdFx0XHRcdC8vIFRoaXMgY2FuIGhhcHBlbiBpZiB0aGVyZSB3YXMganVzdCBhIGNvbW1lbnQuXG5cdFx0XHRcdFx0aWYgKCFpc0VtcHR5KGp1c3RDbG9zZWQudG9rZW5zKSlcblx0XHRcdFx0XHRcdGFkZFRvQ3VycmVudEdyb3VwKGp1c3RDbG9zZWQpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0Y2FzZSBHX0Jsb2NrOlxuXHRcdFx0XHRcdGNvbnRleHQuY2hlY2soIWlzRW1wdHkoanVzdENsb3NlZC50b2tlbnMpLCBjbG9zZVBvcywgJ0VtcHR5IGJsb2NrLicpXG5cdFx0XHRcdFx0YWRkVG9DdXJyZW50R3JvdXAoanVzdENsb3NlZClcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdGFkZFRvQ3VycmVudEdyb3VwKGp1c3RDbG9zZWQpXG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdG9wZW5QYXJlbnRoZXNpcyA9IGxvYyA9PiB7XG5cdFx0XHRvcGVuR3JvdXAobG9jLnN0YXJ0LCBHX1BhcmVudGhlc2lzKVxuXHRcdFx0b3Blbkdyb3VwKGxvYy5lbmQsIEdfU3BhY2UpXG5cdFx0fSxcblxuXHRcdG9wZW5CcmFja2V0ID0gbG9jID0+IHtcblx0XHRcdG9wZW5Hcm91cChsb2Muc3RhcnQsIEdfQnJhY2tldClcblx0XHRcdG9wZW5Hcm91cChsb2MuZW5kLCBHX1NwYWNlKVxuXHRcdH0sXG5cblx0XHQvLyBXaGVuIHN0YXJ0aW5nIGEgbmV3IGxpbmUsIGEgc3BhY2VkIGdyb3VwIGlzIGNyZWF0ZWQgaW1wbGljaXRseS5cblx0XHRvcGVuTGluZSA9IHBvcyA9PiB7XG5cdFx0XHRvcGVuR3JvdXAocG9zLCBHX0xpbmUpXG5cdFx0XHRvcGVuR3JvdXAocG9zLCBHX1NwYWNlKVxuXHRcdH0sXG5cblx0XHRjbG9zZUxpbmUgPSBwb3MgPT4ge1xuXHRcdFx0Y2xvc2VHcm91cHMocG9zLCBHX1NwYWNlKVxuXHRcdFx0Y2xvc2VHcm91cHMocG9zLCBHX0xpbmUpXG5cdFx0fSxcblxuXHRcdC8vIFdoZW4gZW5jb3VudGVyaW5nIGEgc3BhY2UsIGl0IGJvdGggY2xvc2VzIGFuZCBvcGVucyBhIHNwYWNlZCBncm91cC5cblx0XHRzcGFjZSA9IGxvYyA9PiB7XG5cdFx0XHRjbG9zZUdyb3Vwcyhsb2Muc3RhcnQsIEdfU3BhY2UpXG5cdFx0XHRvcGVuR3JvdXAobG9jLmVuZCwgR19TcGFjZSlcblx0XHR9XG5cblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gSVRFUkFUSU5HIFRIUk9VR0ggU09VUkNFU1RSSU5HXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8qXG5cdFRoZXNlIGFyZSBrZXB0IHVwLXRvLWRhdGUgYXMgd2UgaXRlcmF0ZSB0aHJvdWdoIHNvdXJjZVN0cmluZy5cblx0RXZlcnkgYWNjZXNzIHRvIGluZGV4IGhhcyBjb3JyZXNwb25kaW5nIGNoYW5nZXMgdG8gbGluZSBhbmQvb3IgY29sdW1uLlxuXHRUaGlzIGFsc28gZXhwbGFpbnMgd2h5IHRoZXJlIGFyZSBkaWZmZXJlbnQgZnVuY3Rpb25zIGZvciBuZXdsaW5lcyB2cyBvdGhlciBjaGFyYWN0ZXJzLlxuXHQqL1xuXHRsZXQgaW5kZXggPSAwLCBsaW5lID0gU3RhcnRMaW5lLCBjb2x1bW4gPSBTdGFydENvbHVtblxuXG5cdC8qXG5cdE5PVEU6IFdlIHVzZSBjaGFyYWN0ZXIgKmNvZGVzKiBmb3IgZXZlcnl0aGluZy5cblx0Q2hhcmFjdGVycyBhcmUgb2YgdHlwZSBOdW1iZXIgYW5kIG5vdCBqdXN0IFN0cmluZ3Mgb2YgbGVuZ3RoIG9uZS5cblx0Ki9cblx0Y29uc3Rcblx0XHRwb3MgPSAoKSA9PiBQb3MobGluZSwgY29sdW1uKSxcblxuXHRcdHBlZWsgPSAoKSA9PiBzb3VyY2VTdHJpbmcuY2hhckNvZGVBdChpbmRleCksXG5cblx0XHQvLyBNYXkgZWF0IGEgTmV3bGluZS5cblx0XHQvLyBJZiB0aGF0IGhhcHBlbnMsIGxpbmUgYW5kIGNvbHVtbiB3aWxsIHRlbXBvcmFyaWx5IGJlIHdyb25nLFxuXHRcdC8vIGJ1dCB3ZSBoYW5kbGUgaXQgaW4gdGhhdCBzcGVjaWFsIGNhc2UgKHJhdGhlciB0aGFuIGNoZWNraW5nIGZvciBOZXdsaW5lIGV2ZXJ5IHRpbWUpLlxuXHRcdGVhdCA9ICgpID0+IHtcblx0XHRcdGNvbnN0IGNoYXIgPSBzb3VyY2VTdHJpbmcuY2hhckNvZGVBdChpbmRleClcblx0XHRcdGluZGV4ID0gaW5kZXggKyAxXG5cdFx0XHRjb2x1bW4gPSBjb2x1bW4gKyAxXG5cdFx0XHRyZXR1cm4gY2hhclxuXHRcdH0sXG5cblx0XHQvLyBjaGFyVG9FYXQgbXVzdCBub3QgYmUgTmV3bGluZS5cblx0XHR0cnlFYXQgPSBjaGFyVG9FYXQgPT4ge1xuXHRcdFx0Y29uc3QgY2FuRWF0ID0gcGVlaygpID09PSBjaGFyVG9FYXRcblx0XHRcdGlmIChjYW5FYXQpIHtcblx0XHRcdFx0aW5kZXggPSBpbmRleCArIDFcblx0XHRcdFx0Y29sdW1uID0gY29sdW1uICsgMVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGNhbkVhdFxuXHRcdH0sXG5cblx0XHR0cnlFYXROZXdsaW5lID0gKCkgPT4ge1xuXHRcdFx0Y29uc3QgY2FuRWF0ID0gcGVlaygpID09PSBOZXdsaW5lXG5cdFx0XHRpZiAoY2FuRWF0KSB7XG5cdFx0XHRcdGluZGV4ID0gaW5kZXggKyAxXG5cdFx0XHRcdGxpbmUgPSBsaW5lICsgMVxuXHRcdFx0XHRjb2x1bW4gPSBTdGFydENvbHVtblxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGNhbkVhdFxuXHRcdH0sXG5cblx0XHQvLyBDYWxsZXIgbXVzdCBlbnN1cmUgdGhhdCBiYWNraW5nIHVwIG5DaGFyc1RvQmFja1VwIGNoYXJhY3RlcnMgYnJpbmdzIHVzIHRvIG9sZFBvcy5cblx0XHRzdGVwQmFja01hbnkgPSAob2xkUG9zLCBuQ2hhcnNUb0JhY2tVcCkgPT4ge1xuXHRcdFx0aW5kZXggPSBpbmRleCAtIG5DaGFyc1RvQmFja1VwXG5cdFx0XHRsaW5lID0gb2xkUG9zLmxpbmVcblx0XHRcdGNvbHVtbiA9IG9sZFBvcy5jb2x1bW5cblx0XHR9LFxuXG5cdFx0Ly8gRm9yIHRha2VXaGlsZSwgdGFrZVdoaWxlV2l0aFByZXYsIGFuZCBza2lwV2hpbGVFcXVhbHMsXG5cdFx0Ly8gY2hhcmFjdGVyUHJlZGljYXRlIG11c3QgKm5vdCogYWNjZXB0IE5ld2xpbmUuXG5cdFx0Ly8gT3RoZXJ3aXNlIHRoZXJlIG1heSBiZSBhbiBpbmZpbml0ZSBsb29wIVxuXHRcdHRha2VXaGlsZSA9IGNoYXJhY3RlclByZWRpY2F0ZSA9PiB7XG5cdFx0XHRjb25zdCBzdGFydEluZGV4ID0gaW5kZXhcblx0XHRcdF9za2lwV2hpbGUoY2hhcmFjdGVyUHJlZGljYXRlKVxuXHRcdFx0cmV0dXJuIHNvdXJjZVN0cmluZy5zbGljZShzdGFydEluZGV4LCBpbmRleClcblx0XHR9LFxuXG5cdFx0dGFrZVdoaWxlV2l0aFByZXYgPSBjaGFyYWN0ZXJQcmVkaWNhdGUgPT4ge1xuXHRcdFx0Y29uc3Qgc3RhcnRJbmRleCA9IGluZGV4XG5cdFx0XHRfc2tpcFdoaWxlKGNoYXJhY3RlclByZWRpY2F0ZSlcblx0XHRcdHJldHVybiBzb3VyY2VTdHJpbmcuc2xpY2Uoc3RhcnRJbmRleCAtIDEsIGluZGV4KVxuXHRcdH0sXG5cblx0XHRza2lwV2hpbGVFcXVhbHMgPSBjaGFyID0+XG5cdFx0XHRfc2tpcFdoaWxlKF8gPT4gXyA9PT0gY2hhciksXG5cblx0XHRza2lwUmVzdE9mTGluZSA9ICgpID0+XG5cdFx0XHRfc2tpcFdoaWxlKF8gPT4gXyAhPT0gTmV3bGluZSksXG5cblx0XHRfc2tpcFdoaWxlID0gY2hhcmFjdGVyUHJlZGljYXRlID0+IHtcblx0XHRcdGNvbnN0IHN0YXJ0SW5kZXggPSBpbmRleFxuXHRcdFx0d2hpbGUgKGNoYXJhY3RlclByZWRpY2F0ZShwZWVrKCkpKVxuXHRcdFx0XHRpbmRleCA9IGluZGV4ICsgMVxuXHRcdFx0Y29uc3QgZGlmZiA9IGluZGV4IC0gc3RhcnRJbmRleFxuXHRcdFx0Y29sdW1uID0gY29sdW1uICsgZGlmZlxuXHRcdFx0cmV0dXJuIGRpZmZcblx0XHR9LFxuXG5cdFx0Ly8gQ2FsbGVkIGFmdGVyIHNlZWluZyB0aGUgZmlyc3QgbmV3bGluZS5cblx0XHQvLyBSZXR1cm5zICMgdG90YWwgbmV3bGluZXMsIGluY2x1ZGluZyB0aGUgZmlyc3QuXG5cdFx0c2tpcE5ld2xpbmVzID0gKCkgPT4ge1xuXHRcdFx0Y29uc3Qgc3RhcnRMaW5lID0gbGluZVxuXHRcdFx0bGluZSA9IGxpbmUgKyAxXG5cdFx0XHR3aGlsZSAocGVlaygpID09PSBOZXdsaW5lKSB7XG5cdFx0XHRcdGluZGV4ID0gaW5kZXggKyAxXG5cdFx0XHRcdGxpbmUgPSBsaW5lICsgMVxuXHRcdFx0fVxuXHRcdFx0Y29sdW1uID0gU3RhcnRDb2x1bW5cblx0XHRcdHJldHVybiBsaW5lIC0gc3RhcnRMaW5lXG5cdFx0fVxuXG5cdC8vIFNwcmlua2xlIGNoZWNrUG9zKCkgYXJvdW5kIHRvIGRlYnVnIGxpbmUgYW5kIGNvbHVtbiB0cmFja2luZyBlcnJvcnMuXG5cdC8qXG5cdGNvbnN0XG5cdFx0Y2hlY2tQb3MgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBwID0gX2dldENvcnJlY3RQb3MoKVxuXHRcdFx0aWYgKHAubGluZSAhPT0gbGluZSB8fCBwLmNvbHVtbiAhPT0gY29sdW1uKVxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYGluZGV4OiAke2luZGV4fSwgd3Jvbmc6ICR7UG9zKGxpbmUsIGNvbHVtbil9LCByaWdodDogJHtwfWApXG5cdFx0fSxcblx0XHRfaW5kZXhUb1BvcyA9IG5ldyBNYXAoKSxcblx0XHRfZ2V0Q29ycmVjdFBvcyA9ICgpID0+IHtcblx0XHRcdGlmIChpbmRleCA9PT0gMClcblx0XHRcdFx0cmV0dXJuIFBvcyhTdGFydExpbmUsIFN0YXJ0Q29sdW1uKVxuXG5cdFx0XHRsZXQgb2xkUG9zLCBvbGRJbmRleFxuXHRcdFx0Zm9yIChvbGRJbmRleCA9IGluZGV4IC0gMTsgOyBvbGRJbmRleCA9IG9sZEluZGV4IC0gMSkge1xuXHRcdFx0XHRvbGRQb3MgPSBfaW5kZXhUb1Bvcy5nZXQob2xkSW5kZXgpXG5cdFx0XHRcdGlmIChvbGRQb3MgIT09IHVuZGVmaW5lZClcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRhc3NlcnQob2xkSW5kZXggPj0gMClcblx0XHRcdH1cblx0XHRcdGxldCBuZXdMaW5lID0gb2xkUG9zLmxpbmUsIG5ld0NvbHVtbiA9IG9sZFBvcy5jb2x1bW5cblx0XHRcdGZvciAoOyBvbGRJbmRleCA8IGluZGV4OyBvbGRJbmRleCA9IG9sZEluZGV4ICsgMSlcblx0XHRcdFx0aWYgKHNvdXJjZVN0cmluZy5jaGFyQ29kZUF0KG9sZEluZGV4KSA9PT0gTmV3bGluZSkge1xuXHRcdFx0XHRcdG5ld0xpbmUgPSBuZXdMaW5lICsgMVxuXHRcdFx0XHRcdG5ld0NvbHVtbiA9IFN0YXJ0Q29sdW1uXG5cdFx0XHRcdH0gZWxzZVxuXHRcdFx0XHRcdG5ld0NvbHVtbiA9IG5ld0NvbHVtbiArIDFcblxuXHRcdFx0Y29uc3QgcCA9IFBvcyhuZXdMaW5lLCBuZXdDb2x1bW4pXG5cdFx0XHRfaW5kZXhUb1Bvcy5zZXQoaW5kZXgsIHApXG5cdFx0XHRyZXR1cm4gcFxuXHRcdH1cblx0Ki9cblxuXHQvKlxuXHRJbiB0aGUgY2FzZSBvZiBxdW90ZSBpbnRlcnBvbGF0aW9uIChcImF7Yn1jXCIpIHdlJ2xsIHJlY3Vyc2UgYmFjayBpbnRvIGhlcmUuXG5cdFdoZW4gaXNJblF1b3RlIGlzIHRydWUsIHdlIHdpbGwgbm90IGFsbG93IG5ld2xpbmVzLlxuXHQqL1xuXHRjb25zdCBsZXhQbGFpbiA9IGlzSW5RdW90ZSA9PiB7XG5cdFx0Ly8gVGhpcyB0ZWxscyB1cyB3aGljaCBpbmRlbnRlZCBibG9jayB3ZSdyZSBpbi5cblx0XHQvLyBJbmNyZW1lbnRpbmcgaXQgbWVhbnMgaXNzdWluZyBhIEdQX09wZW5CbG9jayBhbmQgZGVjcmVtZW50aW5nIGl0IG1lYW5zIGEgR1BfQ2xvc2VCbG9jay5cblx0XHQvLyBEb2VzIG5vdGhpbmcgaWYgaXNJblF1b3RlLlxuXHRcdGxldCBpbmRlbnQgPSAwXG5cblx0XHQvLyBNYWtlIGNsb3N1cmVzIG5vdyByYXRoZXIgdGhhbiBpbnNpZGUgdGhlIGxvb3AuXG5cdFx0Ly8gVGhpcyBpcyBzaWduaWZpY2FudGx5IGZhc3RlciBhcyBvZiBub2RlIHYwLjExLjE0LlxuXG5cdFx0Ly8gVGhpcyBpcyB3aGVyZSB3ZSBzdGFydGVkIGxleGluZyB0aGUgY3VycmVudCB0b2tlbi5cblx0XHRsZXQgc3RhcnRDb2x1bW5cblx0XHRjb25zdFxuXHRcdFx0c3RhcnRQb3MgPSAoKSA9PiBQb3MobGluZSwgc3RhcnRDb2x1bW4pLFxuXHRcdFx0bG9jID0gKCkgPT4gTG9jKHN0YXJ0UG9zKCksIHBvcygpKSxcblx0XHRcdGtleXdvcmQgPSBraW5kID0+XG5cdFx0XHRcdGFkZFRvQ3VycmVudEdyb3VwKEtleXdvcmQobG9jKCksIGtpbmQpKSxcblx0XHRcdGVhdEFuZEFkZE51bWJlciA9ICgpID0+IHtcblx0XHRcdFx0Ly8gVE9ETzogQSByZWFsIG51bWJlciBsaXRlcmFsIGxleGVyLCBub3QganVzdCBKYXZhU2NyaXB0J3MuLi5cblx0XHRcdFx0Y29uc3QgbnVtYmVyU3RyaW5nID0gdGFrZVdoaWxlV2l0aFByZXYoaXNOdW1iZXJDaGFyYWN0ZXIpXG5cdFx0XHRcdGNvbnN0IG51bWJlciA9IE51bWJlcihudW1iZXJTdHJpbmcpXG5cdFx0XHRcdGNvbnRleHQuY2hlY2soIU51bWJlci5pc05hTihudW1iZXIpLCBwb3MsICgpID0+XG5cdFx0XHRcdFx0YEludmFsaWQgbnVtYmVyIGxpdGVyYWwgJHtjb2RlKG51bWJlclN0cmluZyl9YClcblx0XHRcdFx0YWRkVG9DdXJyZW50R3JvdXAoVG9rZW5OdW1iZXJMaXRlcmFsKGxvYygpLCBudW1iZXIpKVxuXHRcdFx0fVxuXG5cdFx0d2hpbGUgKHRydWUpIHtcblx0XHRcdHN0YXJ0Q29sdW1uID0gY29sdW1uXG5cdFx0XHRjb25zdCBjaGFyYWN0ZXJFYXRlbiA9IGVhdCgpXG5cdFx0XHQvLyBHZW5lcmFsbHksIHRoZSB0eXBlIG9mIGEgdG9rZW4gaXMgZGV0ZXJtaW5lZCBieSB0aGUgZmlyc3QgY2hhcmFjdGVyLlxuXHRcdFx0c3dpdGNoIChjaGFyYWN0ZXJFYXRlbikge1xuXHRcdFx0XHRjYXNlIFplcm86XG5cdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdGNhc2UgTjA6IGNhc2UgTjE6IGNhc2UgTjI6IGNhc2UgTjM6IGNhc2UgTjQ6XG5cdFx0XHRcdGNhc2UgTjU6IGNhc2UgTjY6IGNhc2UgTjc6IGNhc2UgTjg6IGNhc2UgTjk6XG5cdFx0XHRcdFx0ZWF0QW5kQWRkTnVtYmVyKClcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRjYXNlIE9wZW5QYXJlbnRoZXNpczpcblx0XHRcdFx0XHRvcGVuUGFyZW50aGVzaXMobG9jKCkpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0Y2FzZSBPcGVuQnJhY2tldDpcblx0XHRcdFx0XHRvcGVuQnJhY2tldChsb2MoKSlcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRjYXNlIENsb3NlUGFyZW50aGVzaXM6XG5cdFx0XHRcdFx0Y2xvc2VHcm91cHMocG9zKCksIEdfUGFyZW50aGVzaXMpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0Y2FzZSBDbG9zZUJyYWNrZXQ6XG5cdFx0XHRcdFx0Y2xvc2VHcm91cHMocG9zKCkuZW5kLCBHX0JyYWNrZXQpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0Y2FzZSBDbG9zZUJyYWNlOlxuXHRcdFx0XHRcdGNvbnRleHQuY2hlY2soaXNJblF1b3RlLCBsb2MsICgpID0+XG5cdFx0XHRcdFx0XHRgUmVzZXJ2ZWQgY2hhcmFjdGVyICR7c2hvd0NoYXIoQ2xvc2VCcmFjZSl9YClcblx0XHRcdFx0XHRyZXR1cm5cblx0XHRcdFx0Y2FzZSBTcGFjZToge1xuXHRcdFx0XHRcdGNvbnN0IG5leHQgPSBwZWVrKClcblx0XHRcdFx0XHRjb250ZXh0Lndhcm5JZihuZXh0ID09PSBTcGFjZSwgbG9jLCAnTXVsdGlwbGUgc3BhY2VzIGluIGEgcm93LicpXG5cdFx0XHRcdFx0Y29udGV4dC53YXJuSWYobmV4dCA9PT0gTmV3bGluZSwgbG9jLCAnTGluZSBlbmRzIGluIGEgc3BhY2UuJylcblx0XHRcdFx0XHRzcGFjZShsb2MoKSlcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhc2UgRG90OiB7XG5cdFx0XHRcdFx0Y29uc3QgcCA9IHBlZWsoKVxuXHRcdFx0XHRcdGlmIChwID09PSBTcGFjZSB8fCBwID09PSBOZXdsaW5lKSB7XG5cdFx0XHRcdFx0XHQvLyBPYmpMaXQgYXNzaWduIGluIGl0cyBvd24gc3BhY2VkIGdyb3VwLlxuXHRcdFx0XHRcdFx0Ly8gV2UgY2FuJ3QganVzdCBjcmVhdGUgYSBuZXcgR3JvdXAgaGVyZSBiZWNhdXNlIHdlIHdhbnQgdG9cblx0XHRcdFx0XHRcdC8vIGVuc3VyZSBpdCdzIG5vdCBwYXJ0IG9mIHRoZSBwcmVjZWRpbmcgb3IgZm9sbG93aW5nIHNwYWNlZCBncm91cC5cblx0XHRcdFx0XHRcdGNsb3NlR3JvdXBzKHN0YXJ0UG9zKCksIEdfU3BhY2UpXG5cdFx0XHRcdFx0XHRrZXl3b3JkKEtXX09iakFzc2lnbilcblx0XHRcdFx0XHRcdG9wZW5Hcm91cChwb3MoKSwgR19TcGFjZSlcblx0XHRcdFx0XHR9IGVsc2Vcblx0XHRcdFx0XHRcdGFkZFRvQ3VycmVudEdyb3VwKERvdE5hbWUoXG5cdFx0XHRcdFx0XHRcdGxvYygpLFxuXHRcdFx0XHRcdFx0XHQvLyArMSBmb3IgdGhlIGRvdCB3ZSBqdXN0IHNraXBwZWQuXG5cdFx0XHRcdFx0XHRcdHNraXBXaGlsZUVxdWFscyhEb3QpICsgMSxcblx0XHRcdFx0XHRcdFx0dGFrZVdoaWxlKGlzTmFtZUNoYXJhY3RlcikpKVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdH1cblx0XHRcdFx0Y2FzZSBDb2xvbjpcblx0XHRcdFx0XHRpZiAodHJ5RWF0KENvbG9uKSkge1xuXHRcdFx0XHRcdFx0Y29uc3QgZXEgPSB0cnlFYXQoRXF1YWwpXG5cdFx0XHRcdFx0XHRjb250ZXh0LmNoZWNrKGVxLCBsb2MsICgpID0+XG5cdFx0XHRcdFx0XHRcdGAke2NvZGUoJzo6Jyl9IG11c3QgYmUgZm9sbG93ZWQgYnkgJHtjb2RlKCc9Jyl9YClcblx0XHRcdFx0XHRcdGtleXdvcmQoS1dfQXNzaWduTXV0YWJsZSlcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHRyeUVhdChFcXVhbCkpXG5cdFx0XHRcdFx0XHRrZXl3b3JkKEtXX0Fzc2lnbk11dGF0ZSlcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRrZXl3b3JkKEtXX1R5cGUpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0Y2FzZSBUaWxkZTpcblx0XHRcdFx0XHRpZiAodHJ5RWF0KEJhcikpIHtcblx0XHRcdFx0XHRcdGtleXdvcmQoS1dfR2VuRnVuKVxuXHRcdFx0XHRcdFx0c3BhY2UobG9jKCkpXG5cdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRrZXl3b3JkKEtXX0xhenkpXG5cdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRjYXNlIEJhcjpcblx0XHRcdFx0XHRrZXl3b3JkKEtXX0Z1bilcblx0XHRcdFx0XHQvLyBGaXJzdCBhcmcgaW4gaXRzIG93biBzcGFjZWQgZ3JvdXBcblx0XHRcdFx0XHRzcGFjZShsb2MoKSlcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRjYXNlIFVuZGVyc2NvcmU6XG5cdFx0XHRcdFx0a2V5d29yZChLV19Gb2N1cylcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRjYXNlIEhhc2g6XG5cdFx0XHRcdFx0aWYgKCEodHJ5RWF0KFNwYWNlKSB8fCB0cnlFYXQoVGFiKSkpXG5cdFx0XHRcdFx0XHRjb250ZXh0LmZhaWwobG9jLCAoKSA9PiBgJHtjb2RlKCcjJyl9IG11c3QgYmUgZm9sbG93ZWQgYnkgc3BhY2Ugb3IgdGFiLn1gKVxuXHRcdFx0XHRcdHNraXBSZXN0T2ZMaW5lKClcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRjYXNlIE5ld2xpbmU6IHtcblx0XHRcdFx0XHRjb250ZXh0LmNoZWNrKCFpc0luUXVvdGUsIGxvYywgJ1F1b3RlIGludGVycG9sYXRpb24gY2Fubm90IGNvbnRhaW4gbmV3bGluZScpXG5cblx0XHRcdFx0XHQvLyBTa2lwIGFueSBibGFuayBsaW5lcy5cblx0XHRcdFx0XHRza2lwTmV3bGluZXMoKVxuXHRcdFx0XHRcdGNvbnN0IG9sZEluZGVudCA9IGluZGVudFxuXHRcdFx0XHRcdGluZGVudCA9IHNraXBXaGlsZUVxdWFscyhUYWIpXG5cdFx0XHRcdFx0Y29udGV4dC5jaGVjayhwZWVrKCkgIT09IFNwYWNlLCBwb3MsICdMaW5lIGJlZ2lucyBpbiBhIHNwYWNlJylcblx0XHRcdFx0XHRpZiAoaW5kZW50IDw9IG9sZEluZGVudCkge1xuXHRcdFx0XHRcdFx0Zm9yIChsZXQgaSA9IGluZGVudDsgaSA8IG9sZEluZGVudDsgaSA9IGkgKyAxKSB7XG5cdFx0XHRcdFx0XHRcdGNsb3NlTGluZShsb2Muc3RhcnQpXG5cdFx0XHRcdFx0XHRcdGNsb3NlR3JvdXBzKGxvYy5lbmQsIEdfQmxvY2spXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjbG9zZUxpbmUobG9jKCkuc3RhcnQpXG5cdFx0XHRcdFx0XHRvcGVuTGluZShsb2MoKS5lbmQpXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNvbnRleHQuY2hlY2soaW5kZW50ID09PSBvbGRJbmRlbnQgKyAxLCBsb2MsXG5cdFx0XHRcdFx0XHRcdCdMaW5lIGlzIGluZGVudGVkIG1vcmUgdGhhbiBvbmNlJylcblx0XHRcdFx0XHRcdC8vIEJsb2NrIGF0IGVuZCBvZiBsaW5lIGdvZXMgaW4gaXRzIG93biBzcGFjZWQgZ3JvdXAuXG5cdFx0XHRcdFx0XHQvLyBIb3dldmVyLCBgfmAgcHJlY2VkaW5nIGEgYmxvY2sgZ29lcyBpbiBhIGdyb3VwIHdpdGggaXQuXG5cdFx0XHRcdFx0XHRpZiAoaXNFbXB0eShjdXJHcm91cC50b2tlbnMpIHx8ICFpc0tleXdvcmQoS1dfTGF6eSwgbGFzdChjdXJHcm91cC50b2tlbnMpKSlcblx0XHRcdFx0XHRcdFx0c3BhY2UobG9jKCkpXG5cdFx0XHRcdFx0XHRvcGVuR3JvdXAobG9jKCkuc3RhcnQsIEdfQmxvY2spXG5cdFx0XHRcdFx0XHRvcGVuTGluZShsb2MoKS5lbmQpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdH1cblx0XHRcdFx0Y2FzZSBRdW90ZTpcblx0XHRcdFx0XHRsZXhRdW90ZShpbmRlbnQpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0Y2FzZSBBbXBlcnNhbmQ6IGNhc2UgQmFja3NsYXNoOiBjYXNlIEJhY2t0aWNrOiBjYXNlIENhcmV0OlxuXHRcdFx0XHRjYXNlIENvbW1hOiBjYXNlIFBlcmNlbnQ6IGNhc2UgU2VtaWNvbG9uOlxuXHRcdFx0XHRcdGNvbnRleHQuZmFpbChsb2MsIGBSZXNlcnZlZCBjaGFyYWN0ZXIgJHtzaG93Q2hhcihjaGFyYWN0ZXJFYXRlbil9YClcblx0XHRcdFx0Y2FzZSBUYWI6XG5cdFx0XHRcdFx0Ly8gV2UgYWx3YXlzIGVhdCB0YWJzIGluIHRoZSBOZXdsaW5lIGhhbmRsZXIsXG5cdFx0XHRcdFx0Ly8gc28gdGhpcyB3aWxsIG9ubHkgaGFwcGVuIGluIHRoZSBtaWRkbGUgb2YgYSBsaW5lLlxuXHRcdFx0XHRcdGNvbnRleHQuZmFpbChsb2MoKSwgJ1RhYiBtYXkgb25seSBiZSB1c2VkIHRvIGluZGVudCcpXG5cdFx0XHRcdGNhc2UgSHlwaGVuOlxuXHRcdFx0XHRcdGlmIChpc0RpZ2l0KHBlZWsoKSkpIHtcblx0XHRcdFx0XHRcdC8vIGVhdE51bWJlcigpIGxvb2tzIGF0IHByZXYgY2hhcmFjdGVyLCBzbyBoeXBoZW4gaW5jbHVkZWQuXG5cdFx0XHRcdFx0XHRlYXRBbmRBZGROdW1iZXIoKVxuXHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gZWxzZSBmYWxsdGhyb3VnaFxuXHRcdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdFx0Ly8gQWxsIG90aGVyIGNoYXJhY3RlcnMgc2hvdWxkIGJlIGhhbmRsZWQgaW4gYSBjYXNlIGFib3ZlLlxuXHRcdFx0XHRcdGNvbnN0IG5hbWUgPSB0YWtlV2hpbGVXaXRoUHJldihpc05hbWVDaGFyYWN0ZXIpXG5cdFx0XHRcdFx0Y29uc3Qga2V5d29yZEtpbmQgPSBrZXl3b3JkS2luZEZyb21OYW1lKG5hbWUpXG5cdFx0XHRcdFx0aWYgKGtleXdvcmRLaW5kICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRcdGlmIChrZXl3b3JkS2luZCA9PT0gS1dfUmVnaW9uKVxuXHRcdFx0XHRcdFx0XHQvLyBUT0RPOiBFYXQgYW5kIHB1dCBpdCBpbiBSZWdpb24gZXhwcmVzc2lvblxuXHRcdFx0XHRcdFx0XHRza2lwUmVzdE9mTGluZSgpXG5cdFx0XHRcdFx0XHRrZXl3b3JkKGtleXdvcmRLaW5kKVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAodHJ5RWF0KFVuZGVyc2NvcmUpKVxuXHRcdFx0XHRcdFx0YWRkVG9DdXJyZW50R3JvdXAoQ2FsbE9uRm9jdXMobG9jKCksIG5hbWUpKVxuXHRcdFx0XHRcdGVsc2Uge1xuXHRcdFx0XHRcdFx0Y29udGV4dC5jaGVjayghaXNSZXNlcnZlZE5hbWUobmFtZSksIHBvcywgKCkgPT5cblx0XHRcdFx0XHRcdFx0YFJlc2VydmVkIG5hbWUgJHtjb2RlKG5hbWUpfWApXG5cdFx0XHRcdFx0XHRhZGRUb0N1cnJlbnRHcm91cChOYW1lKGxvYygpLCBuYW1lKSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRjb25zdCBsZXhRdW90ZSA9IGluZGVudCA9PiB7XG5cdFx0Y29uc3QgcXVvdGVJbmRlbnQgPSBpbmRlbnQgKyAxXG5cblx0XHQvLyBJbmRlbnRlZCBxdW90ZSBpcyBjaGFyYWN0ZXJpemVkIGJ5IGJlaW5nIGltbWVkaWF0ZWx5IGZvbGxvd2VkIGJ5IGEgbmV3bGluZS5cblx0XHQvLyBUaGUgbmV4dCBsaW5lICptdXN0KiBoYXZlIHNvbWUgY29udGVudCBhdCB0aGUgbmV4dCBpbmRlbnRhdGlvbi5cblx0XHRjb25zdCBpc0luZGVudGVkID0gdHJ5RWF0TmV3bGluZSgpXG5cdFx0aWYgKGlzSW5kZW50ZWQpIHtcblx0XHRcdGNvbnN0IGFjdHVhbEluZGVudCA9IHNraXBXaGlsZUVxdWFscyhUYWIpXG5cdFx0XHRjb250ZXh0LmNoZWNrKGFjdHVhbEluZGVudCA9PT0gcXVvdGVJbmRlbnQsIHBvcyxcblx0XHRcdFx0J0luZGVudGVkIHF1b3RlIG11c3QgaGF2ZSBleGFjdGx5IG9uZSBtb3JlIGluZGVudCB0aGFuIHByZXZpb3VzIGxpbmUuJylcblx0XHR9XG5cblx0XHQvLyBDdXJyZW50IHN0cmluZyBsaXRlcmFsIHBhcnQgb2YgcXVvdGUgd2UgYXJlIHJlYWRpbmcuXG5cdFx0bGV0IHJlYWQgPSAnJ1xuXG5cdFx0Y29uc3QgbWF5YmVPdXRwdXRSZWFkID0gKCkgPT4ge1xuXHRcdFx0aWYgKHJlYWQgIT09ICcnKSB7XG5cdFx0XHRcdGFkZFRvQ3VycmVudEdyb3VwKHJlYWQpXG5cdFx0XHRcdHJlYWQgPSAnJ1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGNvbnN0IGxvY1NpbmdsZSA9ICgpID0+IHNpbmdsZUNoYXJMb2MocG9zKCkpXG5cblx0XHRvcGVuR3JvdXAobG9jU2luZ2xlKCkuc3RhcnQsIEdfUXVvdGUpXG5cblx0XHRlYXRDaGFyczogd2hpbGUgKHRydWUpIHtcblx0XHRcdGNvbnN0IGNoYXIgPSBlYXQoKVxuXHRcdFx0c3dpdGNoIChjaGFyKSB7XG5cdFx0XHRcdGNhc2UgQmFja3NsYXNoOiB7XG5cdFx0XHRcdFx0cmVhZCA9IHJlYWQgKyBxdW90ZUVzY2FwZShlYXQoKSlcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhc2UgT3BlbkJyYWNlOiB7XG5cdFx0XHRcdFx0bWF5YmVPdXRwdXRSZWFkKClcblx0XHRcdFx0XHRjb25zdCBsID0gbG9jU2luZ2xlKClcblx0XHRcdFx0XHRvcGVuUGFyZW50aGVzaXMobClcblx0XHRcdFx0XHRsZXhQbGFpbih0cnVlKVxuXHRcdFx0XHRcdGNsb3NlR3JvdXBzKGwuZW5kLCBHX1BhcmVudGhlc2lzKVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdH1cblx0XHRcdFx0Y2FzZSBOZXdsaW5lOiB7XG5cdFx0XHRcdFx0Y29uc3Qgb3JpZ2luYWxQb3MgPSBwb3MoKVxuXHRcdFx0XHRcdC8vIEdvIGJhY2sgdG8gYmVmb3JlIHdlIGF0ZSBpdC5cblx0XHRcdFx0XHRvcmlnaW5hbFBvcy5jb2x1bW4gPSBvcmlnaW5hbFBvcy5jb2x1bW4gLSAxXG5cblx0XHRcdFx0XHRjb250ZXh0LmNoZWNrKGlzSW5kZW50ZWQsIGxvY1NpbmdsZSwgJ1VuY2xvc2VkIHF1b3RlLicpXG5cdFx0XHRcdFx0Ly8gQWxsb3cgZXh0cmEgYmxhbmsgbGluZXMuXG5cdFx0XHRcdFx0Y29uc3QgbnVtTmV3bGluZXMgPSBza2lwTmV3bGluZXMoKVxuXHRcdFx0XHRcdGNvbnN0IG5ld0luZGVudCA9IHNraXBXaGlsZUVxdWFscyhUYWIpXG5cdFx0XHRcdFx0aWYgKG5ld0luZGVudCA8IHF1b3RlSW5kZW50KSB7XG5cdFx0XHRcdFx0XHQvLyBJbmRlbnRlZCBxdW90ZSBzZWN0aW9uIGlzIG92ZXIuXG5cdFx0XHRcdFx0XHQvLyBVbmRvIHJlYWRpbmcgdGhlIHRhYnMgYW5kIG5ld2xpbmUuXG5cdFx0XHRcdFx0XHRzdGVwQmFja01hbnkob3JpZ2luYWxQb3MsIG51bU5ld2xpbmVzICsgbmV3SW5kZW50KVxuXHRcdFx0XHRcdFx0YXNzZXJ0KHBlZWsoKSA9PT0gTmV3bGluZSlcblx0XHRcdFx0XHRcdGJyZWFrIGVhdENoYXJzXG5cdFx0XHRcdFx0fSBlbHNlXG5cdFx0XHRcdFx0XHRyZWFkID0gcmVhZCArXG5cdFx0XHRcdFx0XHRcdCdcXG4nLnJlcGVhdChudW1OZXdsaW5lcykgKyAnXFx0Jy5yZXBlYXQobmV3SW5kZW50IC0gcXVvdGVJbmRlbnQpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXNlIFF1b3RlOlxuXHRcdFx0XHRcdGlmICghaXNJbmRlbnRlZClcblx0XHRcdFx0XHRcdGJyZWFrIGVhdENoYXJzXG5cdFx0XHRcdFx0Ly8gRWxzZSBmYWxsdGhyb3VnaFxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdC8vIEkndmUgdHJpZWQgcHVzaGluZyBjaGFyYWN0ZXIgY29kZXMgdG8gYW4gYXJyYXkgYW5kIHN0cmluZ2lmeWluZyB0aGVtIGxhdGVyLFxuXHRcdFx0XHRcdC8vIGJ1dCB0aGlzIHR1cm5lZCBvdXQgdG8gYmUgYmV0dGVyLlxuXHRcdFx0XHRcdHJlYWQgPSByZWFkICsgU3RyaW5nLmZyb21DaGFyQ29kZShjaGFyKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdG1heWJlT3V0cHV0UmVhZCgpXG5cdFx0Y2xvc2VHcm91cHMobG9jU2luZ2xlKCkuc3RhcnQsIEdfUXVvdGUpXG5cdH1cblxuXHRjb25zdCBxdW90ZUVzY2FwZSA9IGNoID0+IHtcblx0XHRzd2l0Y2ggKGNoKSB7XG5cdFx0XHRjYXNlIE9wZW5CcmFjZTogcmV0dXJuICd7J1xuXHRcdFx0Y2FzZSBMZXR0ZXJOOiByZXR1cm4gJ1xcbidcblx0XHRcdGNhc2UgTGV0dGVyVDogcmV0dXJuICdcXHQnXG5cdFx0XHRjYXNlIFF1b3RlOiByZXR1cm4gJ1wiJ1xuXHRcdFx0Y2FzZSBCYWNrc2xhc2g6IHJldHVybiAnXFxcXCdcblx0XHRcdGRlZmF1bHQ6IGNvbnRleHQuZmFpbChwb3MsIGBObyBuZWVkIHRvIGVzY2FwZSAke3Nob3dDaGFyKGNoKX1gKVxuXHRcdH1cblx0fVxuXG5cdGN1ckdyb3VwID0gR3JvdXAoTG9jKFN0YXJ0UG9zLCBudWxsKSwgWyBdLCBHX0Jsb2NrKVxuXHRvcGVuTGluZShTdGFydFBvcylcblxuXHRsZXhQbGFpbihmYWxzZSlcblxuXHRjb25zdCBlbmRQb3MgPSBwb3MoKVxuXHRjbG9zZUxpbmUoZW5kUG9zKVxuXHRhc3NlcnQoaXNFbXB0eShncm91cFN0YWNrKSlcblx0Y3VyR3JvdXAubG9jLmVuZCA9IGVuZFBvc1xuXHRyZXR1cm4gY3VyR3JvdXBcbn1cblxuY29uc3QgY2MgPSBfID0+IF8uY2hhckNvZGVBdCgwKVxuY29uc3Rcblx0QW1wZXJzYW5kID0gY2MoJyYnKSxcblx0QmFja3NsYXNoID0gY2MoJ1xcXFwnKSxcblx0QmFja3RpY2sgPSBjYygnYCcpLFxuXHRCYXIgPSBjYygnfCcpLFxuXHRDYXJldCA9IGNjKCdeJyksXG5cdENsb3NlQnJhY2UgPSBjYygnfScpLFxuXHRDbG9zZUJyYWNrZXQgPSBjYygnXScpLFxuXHRDbG9zZVBhcmVudGhlc2lzID0gY2MoJyknKSxcblx0Q29sb24gPSBjYygnOicpLFxuXHRDb21tYSA9IGNjKCcsJyksXG5cdERvdCA9IGNjKCcuJyksXG5cdEVxdWFsID0gY2MoJz0nKSxcblx0SGFzaCA9IGNjKCcjJyksXG5cdEh5cGhlbiA9IGNjKCctJyksXG5cdExldHRlck4gPSBjYygnbicpLFxuXHRMZXR0ZXJUID0gY2MoJ3QnKSxcblx0TjAgPSBjYygnMCcpLFxuXHROMSA9IGNjKCcxJyksXG5cdE4yID0gY2MoJzInKSxcblx0TjMgPSBjYygnMycpLFxuXHRONCA9IGNjKCc0JyksXG5cdE41ID0gY2MoJzUnKSxcblx0TjYgPSBjYygnNicpLFxuXHRONyA9IGNjKCc3JyksXG5cdE44ID0gY2MoJzgnKSxcblx0TjkgPSBjYygnOScpLFxuXHROZXdsaW5lID0gY2MoJ1xcbicpLFxuXHRPcGVuQnJhY2UgPSBjYygneycpLFxuXHRPcGVuQnJhY2tldCA9IGNjKCdbJyksXG5cdE9wZW5QYXJlbnRoZXNpcyA9IGNjKCcoJyksXG5cdFBlcmNlbnQgPSBjYygnJScpLFxuXHRRdW90ZSA9IGNjKCdcIicpLFxuXHRTZW1pY29sb24gPSBjYygnOycpLFxuXHRTcGFjZSA9IGNjKCcgJyksXG5cdFRhYiA9IGNjKCdcXHQnKSxcblx0VGlsZGUgPSBjYygnficpLFxuXHRVbmRlcnNjb3JlID0gY2MoJ18nKSxcblx0WmVybyA9IGNjKCdcXDAnKVxuXG5jb25zdFxuXHRzaG93Q2hhciA9IGNoYXIgPT4gY29kZShTdHJpbmcuZnJvbUNoYXJDb2RlKGNoYXIpKSxcblx0X2NoYXJQcmVkID0gKGNoYXJzLCBuZWdhdGUpID0+IHtcblx0XHRsZXQgc3JjID0gJ3N3aXRjaChjaCkge1xcbidcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNoYXJzLmxlbmd0aDsgaSA9IGkgKyAxKVxuXHRcdFx0c3JjID0gYCR7c3JjfWNhc2UgJHtjaGFycy5jaGFyQ29kZUF0KGkpfTogYFxuXHRcdHNyYyA9IGAke3NyY30gcmV0dXJuICR7IW5lZ2F0ZX1cXG5kZWZhdWx0OiByZXR1cm4gJHtuZWdhdGV9XFxufWBcblx0XHRyZXR1cm4gRnVuY3Rpb24oJ2NoJywgc3JjKVxuXHR9LFxuXHRpc0RpZ2l0ID0gX2NoYXJQcmVkKCcwMTIzNDU2Nzg5JyksXG5cdGlzTmFtZUNoYXJhY3RlciA9IF9jaGFyUHJlZChOb25OYW1lQ2hhcmFjdGVycywgdHJ1ZSksXG5cdGlzTnVtYmVyQ2hhcmFjdGVyID0gX2NoYXJQcmVkKCcwMTIzNDU2Nzg5LmUnKVxuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=