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
				return '' + (0, _CompileError.code)(precededBy) + ' must be followed by ' + showChar(charToEat);
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
						if (!(tryEat(Space) || tryEat(Tab))) context.fail(loc, function () {
							return '' + (0, _CompileError.code)('#') + ' must be followed by space or tab.';
						});
						skipRestOfLine();
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
								openGroup(pos(), _Token.G_Space);
							} else addToCurrentGroup((0, _Token.DotName)(loc(),
							// +1 for the dot we just skipped.
							skipWhileEquals(Dot) + 1, takeWhile(isNameCharacter)));
							break;
						}

					case Colon:
						if (tryEat(Colon)) {
							mustEat(Equal, '::');
							keyword(_Token.KW_AssignMutable);
						} else if (tryEat(Equal)) keyword(_Token.KW_AssignMutate);else keyword(_Token.KW_Type);
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
		for (let i = 0; i < chars.length; i = i + 1) src = '' + src + 'case ' + chars.charCodeAt(i) + ': ';
		src = '' + src + ' return ' + !negate + '\ndefault: return ' + negate + '\n}';
		return Function('ch', src);
	},
	      isDigit = _charPred('0123456789'),
	      isNameCharacter = _charPred(_language.NonNameCharacters, true),
	      isNumberCharacter = _charPred('0123456789.e');
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL2xleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztrQkFhZSxVQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUs7OztBQUd6QyxjQUFZLEdBQUcsWUFBWSxHQUFHLFVBQU0sQ0FBQTs7Ozs7Ozs7QUFRcEMsUUFBTSxVQUFVLEdBQUcsRUFBRyxDQUFBO0FBQ3RCLE1BQUksUUFBUSxDQUFBO0FBQ1osUUFDQyxpQkFBaUIsR0FBRyxVQUFBLEtBQUs7VUFDeEIsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0dBQUE7Ozs7O0FBSS9CLFdBQVMsR0FBRyxVQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUs7QUFDbkMsYUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTs7O0FBR3pCLFdBQVEsR0FBRyxXQWhDSSxLQUFLLEVBZ0NILGtCQUFJLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFHLEVBQUUsU0FBUyxDQUFDLENBQUE7R0FDcEQ7Ozs7O0FBSUQsYUFBVyxHQUFHLFVBQUMsUUFBUSxFQUFFLFNBQVMsRUFBSzs7O0FBR3RDLFVBQU8sUUFBUSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7QUFDbkMsVUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQTs7QUFFN0IsV0FBTyxDQUFDLEtBQUssQ0FDWixPQUFPLFlBNUN5QyxhQUFhLEFBNENwQyxJQUFJLE9BQU8sWUE1Q1AsU0FBUyxBQTRDWSxJQUFJLE9BQU8sWUE1Q0UsT0FBTyxBQTRDRyxFQUN6RSxRQUFRLEVBQUU7WUFDVixxQkFBbUIsV0EzQ3ZCLGFBQWEsRUEyQ3dCLFNBQVMsQ0FBQyxvQ0FDcEIsV0E1QzNCLGFBQWEsRUE0QzRCLE9BQU8sQ0FBQyxDQUFFO0tBQUEsQ0FBQyxDQUFBO0FBQ2pELHFCQUFpQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDMUM7QUFDRCxvQkFBaUIs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QUcsRUFBRSxDQUFDLEdBQUcsQ0FBQztPQUNmLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO09BQ2QsS0FBSyxHQUFHLEVBQUUsQ0FBQyxHQUFHLENBQUM7T0FDZixVQUFVLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQztPQUNwQixJQUFJLEdBQUcsRUFBRSxDQUFDLFFBQUksQ0FBQyxDQUFBOztBQUVoQixPQUNDLFFBQVEsR0FBRyxVQUFBLElBQUk7U0FBSSxrQkF0bEJYLElBQUksRUFzbEJZLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7RUFBQTtPQUNsRCxTQUFTLEdBQUcsVUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFLO0FBQzlCLE1BQUksR0FBRyxHQUFHLGdCQUFnQixDQUFBO0FBQzFCLE9BQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUMxQyxHQUFHLFFBQU0sR0FBRyxhQUFRLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE9BQUksQ0FBQTtBQUM1QyxLQUFHLFFBQU0sR0FBRyxnQkFBVyxDQUFDLE1BQU0sMEJBQXFCLE1BQU0sUUFBSyxDQUFBO0FBQzlELFNBQU8sUUFBUSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQTtFQUMxQjtPQUNELE9BQU8sR0FBRyxTQUFTLENBQUMsWUFBWSxDQUFDO09BQ2pDLGVBQWUsR0FBRyxTQUFTLFdBN2xCbkIsaUJBQWlCLEVBNmxCc0IsSUFBSSxDQUFDO09BQ3BELGlCQUFpQixHQUFHLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS9sZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTG9jLCB7IFBvcywgU3RhcnRMaW5lLCBTdGFydFBvcywgU3RhcnRDb2x1bW4sIHNpbmdsZUNoYXJMb2MgfSBmcm9tICdlc2FzdC9kaXN0L0xvYydcbmltcG9ydCB7IGNvZGUgfSBmcm9tICcuLi9Db21waWxlRXJyb3InXG5pbXBvcnQgeyBOdW1iZXJMaXRlcmFsIH0gZnJvbSAnLi4vTXNBc3QnXG5pbXBvcnQgeyBOb25OYW1lQ2hhcmFjdGVycyB9IGZyb20gJy4vbGFuZ3VhZ2UnXG5pbXBvcnQgeyBEb3ROYW1lLCBHcm91cCwgR19CbG9jaywgR19CcmFja2V0LCBHX0xpbmUsIEdfUGFyZW50aGVzaXMsIEdfU3BhY2UsIEdfUXVvdGUsXG5cdGlzS2V5d29yZCwgS2V5d29yZCwgS1dfQXNzaWduTXV0YWJsZSwgS1dfQXNzaWduTXV0YXRlLCBLV19Gb2N1cywgS1dfRnVuLCBLV19GdW5EbywgS1dfR2VuRnVuLFxuXHRLV19HZW5GdW5EbywgS1dfTGF6eSwgS1dfT2JqQXNzaWduLCBLV19SZWdpb24sIEtXX1R5cGUsIE5hbWUsIG9wS2V5d29yZEtpbmRGcm9tTmFtZSxcblx0c2hvd0dyb3VwS2luZCB9IGZyb20gJy4vVG9rZW4nXG5pbXBvcnQgeyBhc3NlcnQsIGlzRW1wdHksIGxhc3QgfSBmcm9tICcuL3V0aWwnXG5cbi8qXG5UaGlzIHByb2R1Y2VzIHRoZSBUb2tlbiB0cmVlIChzZWUgVG9rZW4uanMpLlxuKi9cbmV4cG9ydCBkZWZhdWx0IChjb250ZXh0LCBzb3VyY2VTdHJpbmcpID0+IHtcblx0Ly8gTGV4aW5nIGFsZ29yaXRobSByZXF1aXJlcyB0cmFpbGluZyBuZXdsaW5lIHRvIGNsb3NlIGFueSBibG9ja3MuXG5cdC8vIFVzZSBhIG51bGwtdGVybWluYXRlZCBzdHJpbmcgYmVjYXVzZSBpdCdzIGZhc3RlciB0aGFuIGNoZWNraW5nIHdoZXRoZXIgaW5kZXggPT09IGxlbmd0aC5cblx0c291cmNlU3RyaW5nID0gc291cmNlU3RyaW5nICsgJ1xcblxcMCdcblxuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBHUk9VUElOR1xuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvLyBXZSBvbmx5IGV2ZXIgd3JpdGUgdG8gdGhlIGlubmVybW9zdCBHcm91cDtcblx0Ly8gd2hlbiB3ZSBjbG9zZSB0aGF0IEdyb3VwIHdlIGFkZCBpdCB0byB0aGUgZW5jbG9zaW5nIEdyb3VwIGFuZCBjb250aW51ZSB3aXRoIHRoYXQgb25lLlxuXHQvLyBOb3RlIHRoYXQgYGN1ckdyb3VwYCBpcyBjb25jZXB0dWFsbHkgdGhlIHRvcCBvZiB0aGUgc3RhY2ssIGJ1dCBpcyBub3Qgc3RvcmVkIGluIGBzdGFja2AuXG5cdGNvbnN0IGdyb3VwU3RhY2sgPSBbIF1cblx0bGV0IGN1ckdyb3VwXG5cdGNvbnN0XG5cdFx0YWRkVG9DdXJyZW50R3JvdXAgPSB0b2tlbiA9PlxuXHRcdFx0Y3VyR3JvdXAuc3ViVG9rZW5zLnB1c2godG9rZW4pLFxuXG5cdFx0Ly8gUGF1c2Ugd3JpdGluZyB0byBjdXJHcm91cCBpbiBmYXZvciBvZiB3cml0aW5nIHRvIGEgc3ViLWdyb3VwLlxuXHRcdC8vIFdoZW4gdGhlIHN1Yi1ncm91cCBmaW5pc2hlcyB3ZSB3aWxsIHBvcCB0aGUgc3RhY2sgYW5kIHJlc3VtZSB3cml0aW5nIHRvIGl0cyBwYXJlbnQuXG5cdFx0b3Blbkdyb3VwID0gKG9wZW5Qb3MsIGdyb3VwS2luZCkgPT4ge1xuXHRcdFx0Z3JvdXBTdGFjay5wdXNoKGN1ckdyb3VwKVxuXHRcdFx0Ly8gQ29udGVudHMgd2lsbCBiZSBhZGRlZCB0byBieSBgb2AuXG5cdFx0XHQvLyBjdXJHcm91cC5sb2MuZW5kIHdpbGwgYmUgd3JpdHRlbiB0byB3aGVuIGNsb3NpbmcgaXQuXG5cdFx0XHRjdXJHcm91cCA9IEdyb3VwKExvYyhvcGVuUG9zLCBudWxsKSwgWyBdLCBncm91cEtpbmQpXG5cdFx0fSxcblxuXHRcdC8vIEEgZ3JvdXAgZW5kaW5nIG1heSBjbG9zZSBtdXRsaXBsZSBncm91cHMuXG5cdFx0Ly8gRm9yIGV4YW1wbGUsIGluIGBsb2chICgrIDEgMWAsIHRoZSBHX0xpbmUgd2lsbCBhbHNvIGNsb3NlIGEgR19QYXJlbnRoZXNpcy5cblx0XHRjbG9zZUdyb3VwcyA9IChjbG9zZVBvcywgY2xvc2VLaW5kKSA9PiB7XG5cdFx0XHQvLyBjdXJHcm91cCBpcyBkaWZmZXJlbnQgZWFjaCB0aW1lIHdlIGdvIHRocm91Z2ggdGhlIGxvb3Bcblx0XHRcdC8vIGJlY2F1c2UgX2Nsb3NlU2luZ2xlR3JvdXAgYnJpbmdzIHVzIHRvIGFuIGVuY2xvc2luZyBncm91cC5cblx0XHRcdHdoaWxlIChjdXJHcm91cC5raW5kICE9PSBjbG9zZUtpbmQpIHtcblx0XHRcdFx0Y29uc3QgY3VyS2luZCA9IGN1ckdyb3VwLmtpbmRcblx0XHRcdFx0Ly8gQSBsaW5lIGNhbiBjbG9zZSBhIHBhcmVudGhlc2lzLCBidXQgYSBwYXJlbnRoZXNpcyBjYW4ndCBjbG9zZSBhIGxpbmUhXG5cdFx0XHRcdGNvbnRleHQuY2hlY2soXG5cdFx0XHRcdFx0Y3VyS2luZCA9PT0gR19QYXJlbnRoZXNpcyB8fCBjdXJLaW5kID09PSBHX0JyYWNrZXQgfHwgY3VyS2luZCA9PT0gR19TcGFjZSxcblx0XHRcdFx0XHRjbG9zZVBvcywgKCkgPT5cblx0XHRcdFx0XHRgVHJ5aW5nIHRvIGNsb3NlICR7c2hvd0dyb3VwS2luZChjbG9zZUtpbmQpfSwgYCArXG5cdFx0XHRcdFx0YGJ1dCBsYXN0IG9wZW5lZCB3YXMgJHtzaG93R3JvdXBLaW5kKGN1cktpbmQpfWApXG5cdFx0XHRcdF9jbG9zZVNpbmdsZUdyb3VwKGNsb3NlUG9zLCBjdXJHcm91cC5raW5kKVxuXHRcdFx0fVxuXHRcdFx0X2Nsb3NlU2luZ2xlR3JvdXAoY2xvc2VQb3MsIGNsb3NlS2luZClcblx0XHR9LFxuXG5cdFx0X2Nsb3NlU2luZ2xlR3JvdXAgPSAoY2xvc2VQb3MsIGNsb3NlS2luZCkgPT4ge1xuXHRcdFx0bGV0IGp1c3RDbG9zZWQgPSBjdXJHcm91cFxuXHRcdFx0Y3VyR3JvdXAgPSBncm91cFN0YWNrLnBvcCgpXG5cdFx0XHRqdXN0Q2xvc2VkLmxvYy5lbmQgPSBjbG9zZVBvc1xuXHRcdFx0c3dpdGNoIChjbG9zZUtpbmQpIHtcblx0XHRcdFx0Y2FzZSBHX1NwYWNlOiB7XG5cdFx0XHRcdFx0Y29uc3Qgc2l6ZSA9IGp1c3RDbG9zZWQuc3ViVG9rZW5zLmxlbmd0aFxuXHRcdFx0XHRcdGlmIChzaXplICE9PSAwKVxuXHRcdFx0XHRcdFx0Ly8gU3BhY2VkIHNob3VsZCBhbHdheXMgaGF2ZSBhdCBsZWFzdCB0d28gZWxlbWVudHMuXG5cdFx0XHRcdFx0XHRhZGRUb0N1cnJlbnRHcm91cChzaXplID09PSAxID8ganVzdENsb3NlZC5zdWJUb2tlbnNbMF0gOiBqdXN0Q2xvc2VkKVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdH1cblx0XHRcdFx0Y2FzZSBHX0xpbmU6XG5cdFx0XHRcdFx0Ly8gTGluZSBtdXN0IGhhdmUgY29udGVudC5cblx0XHRcdFx0XHQvLyBUaGlzIGNhbiBoYXBwZW4gaWYgdGhlcmUgd2FzIGp1c3QgYSBjb21tZW50LlxuXHRcdFx0XHRcdGlmICghaXNFbXB0eShqdXN0Q2xvc2VkLnN1YlRva2VucykpXG5cdFx0XHRcdFx0XHRhZGRUb0N1cnJlbnRHcm91cChqdXN0Q2xvc2VkKVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdGNhc2UgR19CbG9jazpcblx0XHRcdFx0XHRjb250ZXh0LmNoZWNrKCFpc0VtcHR5KGp1c3RDbG9zZWQuc3ViVG9rZW5zKSwgY2xvc2VQb3MsICdFbXB0eSBibG9jay4nKVxuXHRcdFx0XHRcdGFkZFRvQ3VycmVudEdyb3VwKGp1c3RDbG9zZWQpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRhZGRUb0N1cnJlbnRHcm91cChqdXN0Q2xvc2VkKVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHRvcGVuUGFyZW50aGVzaXMgPSBsb2MgPT4ge1xuXHRcdFx0b3Blbkdyb3VwKGxvYy5zdGFydCwgR19QYXJlbnRoZXNpcylcblx0XHRcdG9wZW5Hcm91cChsb2MuZW5kLCBHX1NwYWNlKVxuXHRcdH0sXG5cblx0XHRvcGVuQnJhY2tldCA9IGxvYyA9PiB7XG5cdFx0XHRvcGVuR3JvdXAobG9jLnN0YXJ0LCBHX0JyYWNrZXQpXG5cdFx0XHRvcGVuR3JvdXAobG9jLmVuZCwgR19TcGFjZSlcblx0XHR9LFxuXG5cdFx0Ly8gV2hlbiBzdGFydGluZyBhIG5ldyBsaW5lLCBhIHNwYWNlZCBncm91cCBpcyBjcmVhdGVkIGltcGxpY2l0bHkuXG5cdFx0b3BlbkxpbmUgPSBwb3MgPT4ge1xuXHRcdFx0b3Blbkdyb3VwKHBvcywgR19MaW5lKVxuXHRcdFx0b3Blbkdyb3VwKHBvcywgR19TcGFjZSlcblx0XHR9LFxuXG5cdFx0Y2xvc2VMaW5lID0gcG9zID0+IHtcblx0XHRcdGNsb3NlR3JvdXBzKHBvcywgR19TcGFjZSlcblx0XHRcdGNsb3NlR3JvdXBzKHBvcywgR19MaW5lKVxuXHRcdH0sXG5cblx0XHQvLyBXaGVuIGVuY291bnRlcmluZyBhIHNwYWNlLCBpdCBib3RoIGNsb3NlcyBhbmQgb3BlbnMgYSBzcGFjZWQgZ3JvdXAuXG5cdFx0c3BhY2UgPSBsb2MgPT4ge1xuXHRcdFx0Y2xvc2VHcm91cHMobG9jLnN0YXJ0LCBHX1NwYWNlKVxuXHRcdFx0b3Blbkdyb3VwKGxvYy5lbmQsIEdfU3BhY2UpXG5cdFx0fVxuXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIElURVJBVElORyBUSFJPVUdIIFNPVVJDRVNUUklOR1xuXHQvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQvKlxuXHRUaGVzZSBhcmUga2VwdCB1cC10by1kYXRlIGFzIHdlIGl0ZXJhdGUgdGhyb3VnaCBzb3VyY2VTdHJpbmcuXG5cdEV2ZXJ5IGFjY2VzcyB0byBpbmRleCBoYXMgY29ycmVzcG9uZGluZyBjaGFuZ2VzIHRvIGxpbmUgYW5kL29yIGNvbHVtbi5cblx0VGhpcyBhbHNvIGV4cGxhaW5zIHdoeSB0aGVyZSBhcmUgZGlmZmVyZW50IGZ1bmN0aW9ucyBmb3IgbmV3bGluZXMgdnMgb3RoZXIgY2hhcmFjdGVycy5cblx0Ki9cblx0bGV0IGluZGV4ID0gMCwgbGluZSA9IFN0YXJ0TGluZSwgY29sdW1uID0gU3RhcnRDb2x1bW5cblxuXHQvKlxuXHROT1RFOiBXZSB1c2UgY2hhcmFjdGVyICpjb2RlcyogZm9yIGV2ZXJ5dGhpbmcuXG5cdENoYXJhY3RlcnMgYXJlIG9mIHR5cGUgTnVtYmVyIGFuZCBub3QganVzdCBTdHJpbmdzIG9mIGxlbmd0aCBvbmUuXG5cdCovXG5cdGNvbnN0XG5cdFx0cG9zID0gKCkgPT4gUG9zKGxpbmUsIGNvbHVtbiksXG5cblx0XHRwZWVrID0gKCkgPT4gc291cmNlU3RyaW5nLmNoYXJDb2RlQXQoaW5kZXgpLFxuXG5cdFx0Ly8gTWF5IGVhdCBhIE5ld2xpbmUuXG5cdFx0Ly8gSWYgdGhhdCBoYXBwZW5zLCBsaW5lIGFuZCBjb2x1bW4gd2lsbCB0ZW1wb3JhcmlseSBiZSB3cm9uZyxcblx0XHQvLyBidXQgd2UgaGFuZGxlIGl0IGluIHRoYXQgc3BlY2lhbCBjYXNlIChyYXRoZXIgdGhhbiBjaGVja2luZyBmb3IgTmV3bGluZSBldmVyeSB0aW1lKS5cblx0XHRlYXQgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBjaGFyID0gc291cmNlU3RyaW5nLmNoYXJDb2RlQXQoaW5kZXgpXG5cdFx0XHRpbmRleCA9IGluZGV4ICsgMVxuXHRcdFx0Y29sdW1uID0gY29sdW1uICsgMVxuXHRcdFx0cmV0dXJuIGNoYXJcblx0XHR9LFxuXG5cdFx0Ly8gY2hhclRvRWF0IG11c3Qgbm90IGJlIE5ld2xpbmUuXG5cdFx0dHJ5RWF0ID0gY2hhclRvRWF0ID0+IHtcblx0XHRcdGNvbnN0IGNhbkVhdCA9IHBlZWsoKSA9PT0gY2hhclRvRWF0XG5cdFx0XHRpZiAoY2FuRWF0KSB7XG5cdFx0XHRcdGluZGV4ID0gaW5kZXggKyAxXG5cdFx0XHRcdGNvbHVtbiA9IGNvbHVtbiArIDFcblx0XHRcdH1cblx0XHRcdHJldHVybiBjYW5FYXRcblx0XHR9LFxuXG5cdFx0bXVzdEVhdCA9IChjaGFyVG9FYXQsIHByZWNlZGVkQnkpID0+IHtcblx0XHRcdGNvbnN0IGNhbkVhdCA9IHRyeUVhdChjaGFyVG9FYXQpXG5cdFx0XHRjb250ZXh0LmNoZWNrKGNhbkVhdCwgcG9zLCAoKSA9PlxuXHRcdFx0XHRgJHtjb2RlKHByZWNlZGVkQnkpfSBtdXN0IGJlIGZvbGxvd2VkIGJ5ICR7c2hvd0NoYXIoY2hhclRvRWF0KX1gKVxuXHRcdH0sXG5cblx0XHR0cnlFYXROZXdsaW5lID0gKCkgPT4ge1xuXHRcdFx0Y29uc3QgY2FuRWF0ID0gcGVlaygpID09PSBOZXdsaW5lXG5cdFx0XHRpZiAoY2FuRWF0KSB7XG5cdFx0XHRcdGluZGV4ID0gaW5kZXggKyAxXG5cdFx0XHRcdGxpbmUgPSBsaW5lICsgMVxuXHRcdFx0XHRjb2x1bW4gPSBTdGFydENvbHVtblxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGNhbkVhdFxuXHRcdH0sXG5cblx0XHQvLyBDYWxsZXIgbXVzdCBlbnN1cmUgdGhhdCBiYWNraW5nIHVwIG5DaGFyc1RvQmFja1VwIGNoYXJhY3RlcnMgYnJpbmdzIHVzIHRvIG9sZFBvcy5cblx0XHRzdGVwQmFja01hbnkgPSAob2xkUG9zLCBuQ2hhcnNUb0JhY2tVcCkgPT4ge1xuXHRcdFx0aW5kZXggPSBpbmRleCAtIG5DaGFyc1RvQmFja1VwXG5cdFx0XHRsaW5lID0gb2xkUG9zLmxpbmVcblx0XHRcdGNvbHVtbiA9IG9sZFBvcy5jb2x1bW5cblx0XHR9LFxuXG5cdFx0Ly8gRm9yIHRha2VXaGlsZSwgdGFrZVdoaWxlV2l0aFByZXYsIGFuZCBza2lwV2hpbGVFcXVhbHMsXG5cdFx0Ly8gY2hhcmFjdGVyUHJlZGljYXRlIG11c3QgKm5vdCogYWNjZXB0IE5ld2xpbmUuXG5cdFx0Ly8gT3RoZXJ3aXNlIHRoZXJlIG1heSBiZSBhbiBpbmZpbml0ZSBsb29wIVxuXHRcdHRha2VXaGlsZSA9IGNoYXJhY3RlclByZWRpY2F0ZSA9PiB7XG5cdFx0XHRjb25zdCBzdGFydEluZGV4ID0gaW5kZXhcblx0XHRcdF9za2lwV2hpbGUoY2hhcmFjdGVyUHJlZGljYXRlKVxuXHRcdFx0cmV0dXJuIHNvdXJjZVN0cmluZy5zbGljZShzdGFydEluZGV4LCBpbmRleClcblx0XHR9LFxuXG5cdFx0dGFrZVdoaWxlV2l0aFByZXYgPSBjaGFyYWN0ZXJQcmVkaWNhdGUgPT4ge1xuXHRcdFx0Y29uc3Qgc3RhcnRJbmRleCA9IGluZGV4XG5cdFx0XHRfc2tpcFdoaWxlKGNoYXJhY3RlclByZWRpY2F0ZSlcblx0XHRcdHJldHVybiBzb3VyY2VTdHJpbmcuc2xpY2Uoc3RhcnRJbmRleCAtIDEsIGluZGV4KVxuXHRcdH0sXG5cblx0XHRza2lwV2hpbGVFcXVhbHMgPSBjaGFyID0+XG5cdFx0XHRfc2tpcFdoaWxlKF8gPT4gXyA9PT0gY2hhciksXG5cblx0XHRza2lwUmVzdE9mTGluZSA9ICgpID0+XG5cdFx0XHRfc2tpcFdoaWxlKF8gPT4gXyAhPT0gTmV3bGluZSksXG5cblx0XHRfc2tpcFdoaWxlID0gY2hhcmFjdGVyUHJlZGljYXRlID0+IHtcblx0XHRcdGNvbnN0IHN0YXJ0SW5kZXggPSBpbmRleFxuXHRcdFx0d2hpbGUgKGNoYXJhY3RlclByZWRpY2F0ZShwZWVrKCkpKVxuXHRcdFx0XHRpbmRleCA9IGluZGV4ICsgMVxuXHRcdFx0Y29uc3QgZGlmZiA9IGluZGV4IC0gc3RhcnRJbmRleFxuXHRcdFx0Y29sdW1uID0gY29sdW1uICsgZGlmZlxuXHRcdFx0cmV0dXJuIGRpZmZcblx0XHR9LFxuXG5cdFx0Ly8gQ2FsbGVkIGFmdGVyIHNlZWluZyB0aGUgZmlyc3QgbmV3bGluZS5cblx0XHQvLyBSZXR1cm5zICMgdG90YWwgbmV3bGluZXMsIGluY2x1ZGluZyB0aGUgZmlyc3QuXG5cdFx0c2tpcE5ld2xpbmVzID0gKCkgPT4ge1xuXHRcdFx0Y29uc3Qgc3RhcnRMaW5lID0gbGluZVxuXHRcdFx0bGluZSA9IGxpbmUgKyAxXG5cdFx0XHR3aGlsZSAocGVlaygpID09PSBOZXdsaW5lKSB7XG5cdFx0XHRcdGluZGV4ID0gaW5kZXggKyAxXG5cdFx0XHRcdGxpbmUgPSBsaW5lICsgMVxuXHRcdFx0fVxuXHRcdFx0Y29sdW1uID0gU3RhcnRDb2x1bW5cblx0XHRcdHJldHVybiBsaW5lIC0gc3RhcnRMaW5lXG5cdFx0fVxuXG5cdC8vIFNwcmlua2xlIGNoZWNrUG9zKCkgYXJvdW5kIHRvIGRlYnVnIGxpbmUgYW5kIGNvbHVtbiB0cmFja2luZyBlcnJvcnMuXG5cdC8qXG5cdGNvbnN0XG5cdFx0Y2hlY2tQb3MgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBwID0gX2dldENvcnJlY3RQb3MoKVxuXHRcdFx0aWYgKHAubGluZSAhPT0gbGluZSB8fCBwLmNvbHVtbiAhPT0gY29sdW1uKVxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYGluZGV4OiAke2luZGV4fSwgd3Jvbmc6ICR7UG9zKGxpbmUsIGNvbHVtbil9LCByaWdodDogJHtwfWApXG5cdFx0fSxcblx0XHRfaW5kZXhUb1BvcyA9IG5ldyBNYXAoKSxcblx0XHRfZ2V0Q29ycmVjdFBvcyA9ICgpID0+IHtcblx0XHRcdGlmIChpbmRleCA9PT0gMClcblx0XHRcdFx0cmV0dXJuIFBvcyhTdGFydExpbmUsIFN0YXJ0Q29sdW1uKVxuXG5cdFx0XHRsZXQgb2xkUG9zLCBvbGRJbmRleFxuXHRcdFx0Zm9yIChvbGRJbmRleCA9IGluZGV4IC0gMTsgOyBvbGRJbmRleCA9IG9sZEluZGV4IC0gMSkge1xuXHRcdFx0XHRvbGRQb3MgPSBfaW5kZXhUb1Bvcy5nZXQob2xkSW5kZXgpXG5cdFx0XHRcdGlmIChvbGRQb3MgIT09IHVuZGVmaW5lZClcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRhc3NlcnQob2xkSW5kZXggPj0gMClcblx0XHRcdH1cblx0XHRcdGxldCBuZXdMaW5lID0gb2xkUG9zLmxpbmUsIG5ld0NvbHVtbiA9IG9sZFBvcy5jb2x1bW5cblx0XHRcdGZvciAoOyBvbGRJbmRleCA8IGluZGV4OyBvbGRJbmRleCA9IG9sZEluZGV4ICsgMSlcblx0XHRcdFx0aWYgKHNvdXJjZVN0cmluZy5jaGFyQ29kZUF0KG9sZEluZGV4KSA9PT0gTmV3bGluZSkge1xuXHRcdFx0XHRcdG5ld0xpbmUgPSBuZXdMaW5lICsgMVxuXHRcdFx0XHRcdG5ld0NvbHVtbiA9IFN0YXJ0Q29sdW1uXG5cdFx0XHRcdH0gZWxzZVxuXHRcdFx0XHRcdG5ld0NvbHVtbiA9IG5ld0NvbHVtbiArIDFcblxuXHRcdFx0Y29uc3QgcCA9IFBvcyhuZXdMaW5lLCBuZXdDb2x1bW4pXG5cdFx0XHRfaW5kZXhUb1Bvcy5zZXQoaW5kZXgsIHApXG5cdFx0XHRyZXR1cm4gcFxuXHRcdH1cblx0Ki9cblxuXHQvKlxuXHRJbiB0aGUgY2FzZSBvZiBxdW90ZSBpbnRlcnBvbGF0aW9uIChcImF7Yn1jXCIpIHdlJ2xsIHJlY3Vyc2UgYmFjayBpbnRvIGhlcmUuXG5cdFdoZW4gaXNJblF1b3RlIGlzIHRydWUsIHdlIHdpbGwgbm90IGFsbG93IG5ld2xpbmVzLlxuXHQqL1xuXHRjb25zdCBsZXhQbGFpbiA9IGlzSW5RdW90ZSA9PiB7XG5cdFx0Ly8gVGhpcyB0ZWxscyB1cyB3aGljaCBpbmRlbnRlZCBibG9jayB3ZSdyZSBpbi5cblx0XHQvLyBJbmNyZW1lbnRpbmcgaXQgbWVhbnMgaXNzdWluZyBhIEdQX09wZW5CbG9jayBhbmQgZGVjcmVtZW50aW5nIGl0IG1lYW5zIGEgR1BfQ2xvc2VCbG9jay5cblx0XHQvLyBEb2VzIG5vdGhpbmcgaWYgaXNJblF1b3RlLlxuXHRcdGxldCBpbmRlbnQgPSAwXG5cblx0XHQvLyBNYWtlIGNsb3N1cmVzIG5vdyByYXRoZXIgdGhhbiBpbnNpZGUgdGhlIGxvb3AuXG5cdFx0Ly8gVGhpcyBpcyBzaWduaWZpY2FudGx5IGZhc3RlciBhcyBvZiBub2RlIHYwLjExLjE0LlxuXG5cdFx0Ly8gVGhpcyBpcyB3aGVyZSB3ZSBzdGFydGVkIGxleGluZyB0aGUgY3VycmVudCB0b2tlbi5cblx0XHRsZXQgc3RhcnRDb2x1bW5cblx0XHRjb25zdFxuXHRcdFx0c3RhcnRQb3MgPSAoKSA9PiBQb3MobGluZSwgc3RhcnRDb2x1bW4pLFxuXHRcdFx0bG9jID0gKCkgPT4gTG9jKHN0YXJ0UG9zKCksIHBvcygpKSxcblx0XHRcdGtleXdvcmQgPSBraW5kID0+XG5cdFx0XHRcdGFkZFRvQ3VycmVudEdyb3VwKEtleXdvcmQobG9jKCksIGtpbmQpKSxcblx0XHRcdGZ1bktleXdvcmQgPSBraW5kID0+IHtcblx0XHRcdFx0a2V5d29yZChraW5kKVxuXHRcdFx0XHRzcGFjZShsb2MoKSlcblx0XHRcdH0sXG5cdFx0XHRlYXRBbmRBZGROdW1iZXIgPSAoKSA9PiB7XG5cdFx0XHRcdC8vIFRPRE86IEEgcmVhbCBudW1iZXIgbGl0ZXJhbCBsZXhlciwgbm90IGp1c3QgSmF2YVNjcmlwdCdzLi4uXG5cdFx0XHRcdGNvbnN0IG51bWJlclN0cmluZyA9IHRha2VXaGlsZVdpdGhQcmV2KGlzTnVtYmVyQ2hhcmFjdGVyKVxuXHRcdFx0XHRjb25zdCBudW1iZXIgPSBOdW1iZXIobnVtYmVyU3RyaW5nKVxuXHRcdFx0XHRjb250ZXh0LmNoZWNrKCFOdW1iZXIuaXNOYU4obnVtYmVyKSwgcG9zLCAoKSA9PlxuXHRcdFx0XHRcdGBJbnZhbGlkIG51bWJlciBsaXRlcmFsICR7Y29kZShudW1iZXJTdHJpbmcpfWApXG5cdFx0XHRcdGFkZFRvQ3VycmVudEdyb3VwKE51bWJlckxpdGVyYWwobG9jKCksIG51bWJlcikpXG5cdFx0XHR9XG5cblx0XHRjb25zdCBoYW5kbGVOYW1lID0gKCkgPT4ge1xuXHRcdFx0Ly8gQWxsIG90aGVyIGNoYXJhY3RlcnMgc2hvdWxkIGJlIGhhbmRsZWQgaW4gYSBjYXNlIGFib3ZlLlxuXHRcdFx0Y29uc3QgbmFtZSA9IHRha2VXaGlsZVdpdGhQcmV2KGlzTmFtZUNoYXJhY3Rlcilcblx0XHRcdGNvbnN0IGtleXdvcmRLaW5kID0gb3BLZXl3b3JkS2luZEZyb21OYW1lKG5hbWUpXG5cdFx0XHRpZiAoa2V5d29yZEtpbmQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRjb250ZXh0LmNoZWNrKGtleXdvcmRLaW5kICE9PSAtMSwgcG9zLCAoKSA9PlxuXHRcdFx0XHRcdGBSZXNlcnZlZCBuYW1lICR7Y29kZShuYW1lKX1gKVxuXHRcdFx0XHRpZiAoa2V5d29yZEtpbmQgPT09IEtXX1JlZ2lvbilcblx0XHRcdFx0XHQvLyBUT0RPOiBFYXQgYW5kIHB1dCBpdCBpbiBSZWdpb24gZXhwcmVzc2lvblxuXHRcdFx0XHRcdHNraXBSZXN0T2ZMaW5lKClcblx0XHRcdFx0a2V5d29yZChrZXl3b3JkS2luZClcblx0XHRcdH0gZWxzZVxuXHRcdFx0XHRhZGRUb0N1cnJlbnRHcm91cChOYW1lKGxvYygpLCBuYW1lKSlcblx0XHR9XG5cblx0XHR3aGlsZSAodHJ1ZSkge1xuXHRcdFx0c3RhcnRDb2x1bW4gPSBjb2x1bW5cblx0XHRcdGNvbnN0IGNoYXJhY3RlckVhdGVuID0gZWF0KClcblx0XHRcdC8vIEdlbmVyYWxseSwgdGhlIHR5cGUgb2YgYSB0b2tlbiBpcyBkZXRlcm1pbmVkIGJ5IHRoZSBmaXJzdCBjaGFyYWN0ZXIuXG5cdFx0XHRzd2l0Y2ggKGNoYXJhY3RlckVhdGVuKSB7XG5cdFx0XHRcdGNhc2UgWmVybzpcblx0XHRcdFx0XHRyZXR1cm5cblx0XHRcdFx0Y2FzZSBDbG9zZUJyYWNlOlxuXHRcdFx0XHRcdGNvbnRleHQuY2hlY2soaXNJblF1b3RlLCBsb2MsICgpID0+XG5cdFx0XHRcdFx0XHRgUmVzZXJ2ZWQgY2hhcmFjdGVyICR7c2hvd0NoYXIoQ2xvc2VCcmFjZSl9YClcblx0XHRcdFx0XHRyZXR1cm5cblx0XHRcdFx0Y2FzZSBRdW90ZTpcblx0XHRcdFx0XHRsZXhRdW90ZShpbmRlbnQpXG5cdFx0XHRcdFx0YnJlYWtcblxuXHRcdFx0XHQvLyBHUk9VUFNcblxuXHRcdFx0XHRjYXNlIE9wZW5QYXJlbnRoZXNpczpcblx0XHRcdFx0XHRvcGVuUGFyZW50aGVzaXMobG9jKCkpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0Y2FzZSBPcGVuQnJhY2tldDpcblx0XHRcdFx0XHRvcGVuQnJhY2tldChsb2MoKSlcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRjYXNlIENsb3NlUGFyZW50aGVzaXM6XG5cdFx0XHRcdFx0Y2xvc2VHcm91cHMocG9zKCksIEdfUGFyZW50aGVzaXMpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0Y2FzZSBDbG9zZUJyYWNrZXQ6XG5cdFx0XHRcdFx0Y2xvc2VHcm91cHMocG9zKCksIEdfQnJhY2tldClcblx0XHRcdFx0XHRicmVha1xuXG5cdFx0XHRcdGNhc2UgU3BhY2U6IHtcblx0XHRcdFx0XHRjb25zdCBuZXh0ID0gcGVlaygpXG5cdFx0XHRcdFx0Y29udGV4dC53YXJuSWYobmV4dCA9PT0gU3BhY2UsIGxvYywgJ011bHRpcGxlIHNwYWNlcyBpbiBhIHJvdy4nKVxuXHRcdFx0XHRcdGNvbnRleHQud2FybklmKG5leHQgPT09IE5ld2xpbmUsIGxvYywgJ0xpbmUgZW5kcyBpbiBhIHNwYWNlLicpXG5cdFx0XHRcdFx0c3BhY2UobG9jKCkpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGNhc2UgTmV3bGluZToge1xuXHRcdFx0XHRcdGNvbnRleHQuY2hlY2soIWlzSW5RdW90ZSwgbG9jLCAnUXVvdGUgaW50ZXJwb2xhdGlvbiBjYW5ub3QgY29udGFpbiBuZXdsaW5lJylcblxuXHRcdFx0XHRcdC8vIFNraXAgYW55IGJsYW5rIGxpbmVzLlxuXHRcdFx0XHRcdHNraXBOZXdsaW5lcygpXG5cdFx0XHRcdFx0Y29uc3Qgb2xkSW5kZW50ID0gaW5kZW50XG5cdFx0XHRcdFx0aW5kZW50ID0gc2tpcFdoaWxlRXF1YWxzKFRhYilcblx0XHRcdFx0XHRjb250ZXh0LmNoZWNrKHBlZWsoKSAhPT0gU3BhY2UsIHBvcywgJ0xpbmUgYmVnaW5zIGluIGEgc3BhY2UnKVxuXHRcdFx0XHRcdGlmIChpbmRlbnQgPD0gb2xkSW5kZW50KSB7XG5cdFx0XHRcdFx0XHRjb25zdCBsID0gbG9jKClcblx0XHRcdFx0XHRcdGZvciAobGV0IGkgPSBpbmRlbnQ7IGkgPCBvbGRJbmRlbnQ7IGkgPSBpICsgMSkge1xuXHRcdFx0XHRcdFx0XHRjbG9zZUxpbmUobC5zdGFydClcblx0XHRcdFx0XHRcdFx0Y2xvc2VHcm91cHMobC5lbmQsIEdfQmxvY2spXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjbG9zZUxpbmUobC5zdGFydClcblx0XHRcdFx0XHRcdG9wZW5MaW5lKGwuZW5kKVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRjb250ZXh0LmNoZWNrKGluZGVudCA9PT0gb2xkSW5kZW50ICsgMSwgbG9jLFxuXHRcdFx0XHRcdFx0XHQnTGluZSBpcyBpbmRlbnRlZCBtb3JlIHRoYW4gb25jZScpXG5cdFx0XHRcdFx0XHQvLyBCbG9jayBhdCBlbmQgb2YgbGluZSBnb2VzIGluIGl0cyBvd24gc3BhY2VkIGdyb3VwLlxuXHRcdFx0XHRcdFx0Ly8gSG93ZXZlciwgYH5gIHByZWNlZGluZyBhIGJsb2NrIGdvZXMgaW4gYSBncm91cCB3aXRoIGl0LlxuXHRcdFx0XHRcdFx0aWYgKGlzRW1wdHkoY3VyR3JvdXAuc3ViVG9rZW5zKSB8fFxuXHRcdFx0XHRcdFx0XHQhaXNLZXl3b3JkKEtXX0xhenksIGxhc3QoY3VyR3JvdXAuc3ViVG9rZW5zKSkpXG5cdFx0XHRcdFx0XHRcdHNwYWNlKGxvYygpKVxuXHRcdFx0XHRcdFx0b3Blbkdyb3VwKGxvYygpLnN0YXJ0LCBHX0Jsb2NrKVxuXHRcdFx0XHRcdFx0b3BlbkxpbmUobG9jKCkuZW5kKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhc2UgVGFiOlxuXHRcdFx0XHRcdC8vIFdlIGFsd2F5cyBlYXQgdGFicyBpbiB0aGUgTmV3bGluZSBoYW5kbGVyLFxuXHRcdFx0XHRcdC8vIHNvIHRoaXMgd2lsbCBvbmx5IGhhcHBlbiBpbiB0aGUgbWlkZGxlIG9mIGEgbGluZS5cblx0XHRcdFx0XHRjb250ZXh0LmZhaWwobG9jKCksICdUYWIgbWF5IG9ubHkgYmUgdXNlZCB0byBpbmRlbnQnKVxuXG5cdFx0XHRcdC8vIEZVTlxuXG5cdFx0XHRcdGNhc2UgQmFuZzpcblx0XHRcdFx0XHRpZiAodHJ5RWF0KEJhcikpXG5cdFx0XHRcdFx0XHRmdW5LZXl3b3JkKEtXX0Z1bkRvKVxuXHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdGhhbmRsZU5hbWUoKVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdGNhc2UgVGlsZGU6XG5cdFx0XHRcdFx0aWYgKHRyeUVhdChCYW5nKSkge1xuXHRcdFx0XHRcdFx0bXVzdEVhdChCYXIsICd+IScpXG5cdFx0XHRcdFx0XHRmdW5LZXl3b3JkKEtXX0dlbkZ1bkRvKVxuXHRcdFx0XHRcdH0gZWxzZSBpZiAodHJ5RWF0KEJhcikpXG5cdFx0XHRcdFx0XHRmdW5LZXl3b3JkKEtXX0dlbkZ1bilcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRrZXl3b3JkKEtXX0xhenkpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0Y2FzZSBCYXI6XG5cdFx0XHRcdFx0a2V5d29yZChLV19GdW4pXG5cdFx0XHRcdFx0Ly8gRmlyc3QgYXJnIGluIGl0cyBvd24gc3BhY2VkIGdyb3VwXG5cdFx0XHRcdFx0c3BhY2UobG9jKCkpXG5cdFx0XHRcdFx0YnJlYWtcblxuXHRcdFx0XHQvLyBOVU1CRVJcblxuXHRcdFx0XHRjYXNlIEh5cGhlbjpcblx0XHRcdFx0XHRpZiAoaXNEaWdpdChwZWVrKCkpKVxuXHRcdFx0XHRcdFx0Ly8gZWF0TnVtYmVyKCkgbG9va3MgYXQgcHJldiBjaGFyYWN0ZXIsIHNvIGh5cGhlbiBpbmNsdWRlZC5cblx0XHRcdFx0XHRcdGVhdEFuZEFkZE51bWJlcigpXG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0aGFuZGxlTmFtZSgpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0Y2FzZSBOMDogY2FzZSBOMTogY2FzZSBOMjogY2FzZSBOMzogY2FzZSBONDpcblx0XHRcdFx0Y2FzZSBONTogY2FzZSBONjogY2FzZSBONzogY2FzZSBOODogY2FzZSBOOTpcblx0XHRcdFx0XHRlYXRBbmRBZGROdW1iZXIoKVxuXHRcdFx0XHRcdGJyZWFrXG5cblxuXHRcdFx0XHQvLyBPVEhFUlxuXG5cdFx0XHRcdGNhc2UgSGFzaDpcblx0XHRcdFx0XHRpZiAoISh0cnlFYXQoU3BhY2UpIHx8IHRyeUVhdChUYWIpKSlcblx0XHRcdFx0XHRcdGNvbnRleHQuZmFpbChsb2MsICgpID0+IGAke2NvZGUoJyMnKX0gbXVzdCBiZSBmb2xsb3dlZCBieSBzcGFjZSBvciB0YWIuYClcblx0XHRcdFx0XHRza2lwUmVzdE9mTGluZSgpXG5cdFx0XHRcdFx0YnJlYWtcblxuXHRcdFx0XHRjYXNlIERvdDoge1xuXHRcdFx0XHRcdGNvbnN0IG5leHQgPSBwZWVrKClcblx0XHRcdFx0XHRpZiAobmV4dCA9PT0gU3BhY2UgfHwgbmV4dCA9PT0gTmV3bGluZSkge1xuXHRcdFx0XHRcdFx0Ly8gT2JqTGl0IGFzc2lnbiBpbiBpdHMgb3duIHNwYWNlZCBncm91cC5cblx0XHRcdFx0XHRcdC8vIFdlIGNhbid0IGp1c3QgY3JlYXRlIGEgbmV3IEdyb3VwIGhlcmUgYmVjYXVzZSB3ZSB3YW50IHRvXG5cdFx0XHRcdFx0XHQvLyBlbnN1cmUgaXQncyBub3QgcGFydCBvZiB0aGUgcHJlY2VkaW5nIG9yIGZvbGxvd2luZyBzcGFjZWQgZ3JvdXAuXG5cdFx0XHRcdFx0XHRjbG9zZUdyb3VwcyhzdGFydFBvcygpLCBHX1NwYWNlKVxuXHRcdFx0XHRcdFx0a2V5d29yZChLV19PYmpBc3NpZ24pXG5cdFx0XHRcdFx0XHRvcGVuR3JvdXAocG9zKCksIEdfU3BhY2UpXG5cdFx0XHRcdFx0fSBlbHNlXG5cdFx0XHRcdFx0XHRhZGRUb0N1cnJlbnRHcm91cChEb3ROYW1lKFxuXHRcdFx0XHRcdFx0XHRsb2MoKSxcblx0XHRcdFx0XHRcdFx0Ly8gKzEgZm9yIHRoZSBkb3Qgd2UganVzdCBza2lwcGVkLlxuXHRcdFx0XHRcdFx0XHRza2lwV2hpbGVFcXVhbHMoRG90KSArIDEsXG5cdFx0XHRcdFx0XHRcdHRha2VXaGlsZShpc05hbWVDaGFyYWN0ZXIpKSlcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y2FzZSBDb2xvbjpcblx0XHRcdFx0XHRpZiAodHJ5RWF0KENvbG9uKSkge1xuXHRcdFx0XHRcdFx0bXVzdEVhdChFcXVhbCwgJzo6Jylcblx0XHRcdFx0XHRcdGtleXdvcmQoS1dfQXNzaWduTXV0YWJsZSlcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHRyeUVhdChFcXVhbCkpXG5cdFx0XHRcdFx0XHRrZXl3b3JkKEtXX0Fzc2lnbk11dGF0ZSlcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRrZXl3b3JkKEtXX1R5cGUpXG5cdFx0XHRcdFx0YnJlYWtcblxuXHRcdFx0XHRjYXNlIFVuZGVyc2NvcmU6XG5cdFx0XHRcdFx0a2V5d29yZChLV19Gb2N1cylcblx0XHRcdFx0XHRicmVha1xuXG5cdFx0XHRcdGNhc2UgQW1wZXJzYW5kOiBjYXNlIEJhY2tzbGFzaDogY2FzZSBCYWNrdGljazogY2FzZSBDYXJldDpcblx0XHRcdFx0Y2FzZSBDb21tYTogY2FzZSBQZXJjZW50OiBjYXNlIFNlbWljb2xvbjpcblx0XHRcdFx0XHRjb250ZXh0LmZhaWwobG9jLCBgUmVzZXJ2ZWQgY2hhcmFjdGVyICR7c2hvd0NoYXIoY2hhcmFjdGVyRWF0ZW4pfWApXG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0aGFuZGxlTmFtZSgpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgbGV4UXVvdGUgPSBpbmRlbnQgPT4ge1xuXHRcdGNvbnN0IHF1b3RlSW5kZW50ID0gaW5kZW50ICsgMVxuXG5cdFx0Ly8gSW5kZW50ZWQgcXVvdGUgaXMgY2hhcmFjdGVyaXplZCBieSBiZWluZyBpbW1lZGlhdGVseSBmb2xsb3dlZCBieSBhIG5ld2xpbmUuXG5cdFx0Ly8gVGhlIG5leHQgbGluZSAqbXVzdCogaGF2ZSBzb21lIGNvbnRlbnQgYXQgdGhlIG5leHQgaW5kZW50YXRpb24uXG5cdFx0Y29uc3QgaXNJbmRlbnRlZCA9IHRyeUVhdE5ld2xpbmUoKVxuXHRcdGlmIChpc0luZGVudGVkKSB7XG5cdFx0XHRjb25zdCBhY3R1YWxJbmRlbnQgPSBza2lwV2hpbGVFcXVhbHMoVGFiKVxuXHRcdFx0Y29udGV4dC5jaGVjayhhY3R1YWxJbmRlbnQgPT09IHF1b3RlSW5kZW50LCBwb3MsXG5cdFx0XHRcdCdJbmRlbnRlZCBxdW90ZSBtdXN0IGhhdmUgZXhhY3RseSBvbmUgbW9yZSBpbmRlbnQgdGhhbiBwcmV2aW91cyBsaW5lLicpXG5cdFx0fVxuXG5cdFx0Ly8gQ3VycmVudCBzdHJpbmcgbGl0ZXJhbCBwYXJ0IG9mIHF1b3RlIHdlIGFyZSByZWFkaW5nLlxuXHRcdGxldCByZWFkID0gJydcblxuXHRcdGNvbnN0IG1heWJlT3V0cHV0UmVhZCA9ICgpID0+IHtcblx0XHRcdGlmIChyZWFkICE9PSAnJykge1xuXHRcdFx0XHRhZGRUb0N1cnJlbnRHcm91cChyZWFkKVxuXHRcdFx0XHRyZWFkID0gJydcblx0XHRcdH1cblx0XHR9XG5cblx0XHRjb25zdCBsb2NTaW5nbGUgPSAoKSA9PiBzaW5nbGVDaGFyTG9jKHBvcygpKVxuXG5cdFx0b3Blbkdyb3VwKGxvY1NpbmdsZSgpLnN0YXJ0LCBHX1F1b3RlKVxuXG5cdFx0ZWF0Q2hhcnM6IHdoaWxlICh0cnVlKSB7XG5cdFx0XHRjb25zdCBjaGFyID0gZWF0KClcblx0XHRcdHN3aXRjaCAoY2hhcikge1xuXHRcdFx0XHRjYXNlIEJhY2tzbGFzaDoge1xuXHRcdFx0XHRcdHJlYWQgPSByZWFkICsgcXVvdGVFc2NhcGUoZWF0KCkpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXNlIE9wZW5CcmFjZToge1xuXHRcdFx0XHRcdG1heWJlT3V0cHV0UmVhZCgpXG5cdFx0XHRcdFx0Y29uc3QgbCA9IGxvY1NpbmdsZSgpXG5cdFx0XHRcdFx0b3BlblBhcmVudGhlc2lzKGwpXG5cdFx0XHRcdFx0bGV4UGxhaW4odHJ1ZSlcblx0XHRcdFx0XHRjbG9zZUdyb3VwcyhsLmVuZCwgR19QYXJlbnRoZXNpcylcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhc2UgTmV3bGluZToge1xuXHRcdFx0XHRcdGNvbnN0IG9yaWdpbmFsUG9zID0gcG9zKClcblx0XHRcdFx0XHQvLyBHbyBiYWNrIHRvIGJlZm9yZSB3ZSBhdGUgaXQuXG5cdFx0XHRcdFx0b3JpZ2luYWxQb3MuY29sdW1uID0gb3JpZ2luYWxQb3MuY29sdW1uIC0gMVxuXG5cdFx0XHRcdFx0Y29udGV4dC5jaGVjayhpc0luZGVudGVkLCBsb2NTaW5nbGUsICdVbmNsb3NlZCBxdW90ZS4nKVxuXHRcdFx0XHRcdC8vIEFsbG93IGV4dHJhIGJsYW5rIGxpbmVzLlxuXHRcdFx0XHRcdGNvbnN0IG51bU5ld2xpbmVzID0gc2tpcE5ld2xpbmVzKClcblx0XHRcdFx0XHRjb25zdCBuZXdJbmRlbnQgPSBza2lwV2hpbGVFcXVhbHMoVGFiKVxuXHRcdFx0XHRcdGlmIChuZXdJbmRlbnQgPCBxdW90ZUluZGVudCkge1xuXHRcdFx0XHRcdFx0Ly8gSW5kZW50ZWQgcXVvdGUgc2VjdGlvbiBpcyBvdmVyLlxuXHRcdFx0XHRcdFx0Ly8gVW5kbyByZWFkaW5nIHRoZSB0YWJzIGFuZCBuZXdsaW5lLlxuXHRcdFx0XHRcdFx0c3RlcEJhY2tNYW55KG9yaWdpbmFsUG9zLCBudW1OZXdsaW5lcyArIG5ld0luZGVudClcblx0XHRcdFx0XHRcdGFzc2VydChwZWVrKCkgPT09IE5ld2xpbmUpXG5cdFx0XHRcdFx0XHRicmVhayBlYXRDaGFyc1xuXHRcdFx0XHRcdH0gZWxzZVxuXHRcdFx0XHRcdFx0cmVhZCA9IHJlYWQgK1xuXHRcdFx0XHRcdFx0XHQnXFxuJy5yZXBlYXQobnVtTmV3bGluZXMpICsgJ1xcdCcucmVwZWF0KG5ld0luZGVudCAtIHF1b3RlSW5kZW50KVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdH1cblx0XHRcdFx0Y2FzZSBRdW90ZTpcblx0XHRcdFx0XHRpZiAoIWlzSW5kZW50ZWQpXG5cdFx0XHRcdFx0XHRicmVhayBlYXRDaGFyc1xuXHRcdFx0XHRcdC8vIEVsc2UgZmFsbHRocm91Z2hcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHQvLyBJJ3ZlIHRyaWVkIHB1c2hpbmcgY2hhcmFjdGVyIGNvZGVzIHRvIGFuIGFycmF5IGFuZCBzdHJpbmdpZnlpbmcgdGhlbSBsYXRlcixcblx0XHRcdFx0XHQvLyBidXQgdGhpcyB0dXJuZWQgb3V0IHRvIGJlIGJldHRlci5cblx0XHRcdFx0XHRyZWFkID0gcmVhZCArIFN0cmluZy5mcm9tQ2hhckNvZGUoY2hhcilcblx0XHRcdH1cblx0XHR9XG5cblx0XHRtYXliZU91dHB1dFJlYWQoKVxuXHRcdGNsb3NlR3JvdXBzKHBvcygpLCBHX1F1b3RlKVxuXHR9XG5cblx0Y29uc3QgcXVvdGVFc2NhcGUgPSBjaCA9PiB7XG5cdFx0c3dpdGNoIChjaCkge1xuXHRcdFx0Y2FzZSBPcGVuQnJhY2U6IHJldHVybiAneydcblx0XHRcdGNhc2UgTGV0dGVyTjogcmV0dXJuICdcXG4nXG5cdFx0XHRjYXNlIExldHRlclQ6IHJldHVybiAnXFx0J1xuXHRcdFx0Y2FzZSBRdW90ZTogcmV0dXJuICdcIidcblx0XHRcdGNhc2UgQmFja3NsYXNoOiByZXR1cm4gJ1xcXFwnXG5cdFx0XHRkZWZhdWx0OiBjb250ZXh0LmZhaWwocG9zLCBgTm8gbmVlZCB0byBlc2NhcGUgJHtzaG93Q2hhcihjaCl9YClcblx0XHR9XG5cdH1cblxuXHRjdXJHcm91cCA9IEdyb3VwKExvYyhTdGFydFBvcywgbnVsbCksIFsgXSwgR19CbG9jaylcblx0b3BlbkxpbmUoU3RhcnRQb3MpXG5cblx0bGV4UGxhaW4oZmFsc2UpXG5cblx0Y29uc3QgZW5kUG9zID0gcG9zKClcblx0Y2xvc2VMaW5lKGVuZFBvcylcblx0YXNzZXJ0KGlzRW1wdHkoZ3JvdXBTdGFjaykpXG5cdGN1ckdyb3VwLmxvYy5lbmQgPSBlbmRQb3Ncblx0cmV0dXJuIGN1ckdyb3VwXG59XG5cbmNvbnN0IGNjID0gXyA9PiBfLmNoYXJDb2RlQXQoMClcbmNvbnN0XG5cdEFtcGVyc2FuZCA9IGNjKCcmJyksXG5cdEJhY2tzbGFzaCA9IGNjKCdcXFxcJyksXG5cdEJhY2t0aWNrID0gY2MoJ2AnKSxcblx0QmFuZyA9IGNjKCchJyksXG5cdEJhciA9IGNjKCd8JyksXG5cdENhcmV0ID0gY2MoJ14nKSxcblx0Q2xvc2VCcmFjZSA9IGNjKCd9JyksXG5cdENsb3NlQnJhY2tldCA9IGNjKCddJyksXG5cdENsb3NlUGFyZW50aGVzaXMgPSBjYygnKScpLFxuXHRDb2xvbiA9IGNjKCc6JyksXG5cdENvbW1hID0gY2MoJywnKSxcblx0RG90ID0gY2MoJy4nKSxcblx0RXF1YWwgPSBjYygnPScpLFxuXHRIYXNoID0gY2MoJyMnKSxcblx0SHlwaGVuID0gY2MoJy0nKSxcblx0TGV0dGVyTiA9IGNjKCduJyksXG5cdExldHRlclQgPSBjYygndCcpLFxuXHROMCA9IGNjKCcwJyksXG5cdE4xID0gY2MoJzEnKSxcblx0TjIgPSBjYygnMicpLFxuXHROMyA9IGNjKCczJyksXG5cdE40ID0gY2MoJzQnKSxcblx0TjUgPSBjYygnNScpLFxuXHRONiA9IGNjKCc2JyksXG5cdE43ID0gY2MoJzcnKSxcblx0TjggPSBjYygnOCcpLFxuXHROOSA9IGNjKCc5JyksXG5cdE5ld2xpbmUgPSBjYygnXFxuJyksXG5cdE9wZW5CcmFjZSA9IGNjKCd7JyksXG5cdE9wZW5CcmFja2V0ID0gY2MoJ1snKSxcblx0T3BlblBhcmVudGhlc2lzID0gY2MoJygnKSxcblx0UGVyY2VudCA9IGNjKCclJyksXG5cdFF1b3RlID0gY2MoJ1wiJyksXG5cdFNlbWljb2xvbiA9IGNjKCc7JyksXG5cdFNwYWNlID0gY2MoJyAnKSxcblx0VGFiID0gY2MoJ1xcdCcpLFxuXHRUaWxkZSA9IGNjKCd+JyksXG5cdFVuZGVyc2NvcmUgPSBjYygnXycpLFxuXHRaZXJvID0gY2MoJ1xcMCcpXG5cbmNvbnN0XG5cdHNob3dDaGFyID0gY2hhciA9PiBjb2RlKFN0cmluZy5mcm9tQ2hhckNvZGUoY2hhcikpLFxuXHRfY2hhclByZWQgPSAoY2hhcnMsIG5lZ2F0ZSkgPT4ge1xuXHRcdGxldCBzcmMgPSAnc3dpdGNoKGNoKSB7XFxuJ1xuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY2hhcnMubGVuZ3RoOyBpID0gaSArIDEpXG5cdFx0XHRzcmMgPSBgJHtzcmN9Y2FzZSAke2NoYXJzLmNoYXJDb2RlQXQoaSl9OiBgXG5cdFx0c3JjID0gYCR7c3JjfSByZXR1cm4gJHshbmVnYXRlfVxcbmRlZmF1bHQ6IHJldHVybiAke25lZ2F0ZX1cXG59YFxuXHRcdHJldHVybiBGdW5jdGlvbignY2gnLCBzcmMpXG5cdH0sXG5cdGlzRGlnaXQgPSBfY2hhclByZWQoJzAxMjM0NTY3ODknKSxcblx0aXNOYW1lQ2hhcmFjdGVyID0gX2NoYXJQcmVkKE5vbk5hbWVDaGFyYWN0ZXJzLCB0cnVlKSxcblx0aXNOdW1iZXJDaGFyYWN0ZXIgPSBfY2hhclByZWQoJzAxMjM0NTY3ODkuZScpXG4iXSwic291cmNlUm9vdCI6Ii9zcmMifQ==