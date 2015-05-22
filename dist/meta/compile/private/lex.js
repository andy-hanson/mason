if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'module', 'esast/dist/Loc', '../CompileError', './language', './Token', './util'], function (exports, module, _esastDistLoc, _CompileError, _language, _Token, _util) {
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
								if ((0, _util.isEmpty)(curGroup.subTokens) || !(0, _Token.isKeyword)(_Token.KW_Lazy, (0, _util.last)(curGroup.subTokens))) space(loc());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL2xleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztrQkFZZSxVQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUs7OztBQUd6QyxjQUFZLEdBQUcsWUFBWSxHQUFHLFVBQU0sQ0FBQTs7Ozs7Ozs7QUFRcEMsUUFBTSxVQUFVLEdBQUcsRUFBRyxDQUFBO0FBQ3RCLE1BQUksUUFBUSxDQUFBO0FBQ1osUUFDQyxpQkFBaUIsR0FBRyxVQUFBLEtBQUs7VUFDeEIsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0dBQUE7Ozs7O0FBSS9CLFdBQVMsR0FBRyxVQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUs7QUFDbkMsYUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTs7O0FBR3pCLFdBQVEsR0FBRyxXQWhDSSxLQUFLLEVBZ0NILGtCQUFJLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFHLEVBQUUsU0FBUyxDQUFDLENBQUE7R0FDcEQ7Ozs7O0FBSUQsYUFBVyxHQUFHLFVBQUMsUUFBUSxFQUFFLFNBQVMsRUFBSzs7O0FBR3RDLFVBQU8sUUFBUSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7QUFDbkMsVUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQTs7QUFFN0IsV0FBTyxDQUFDLEtBQUssQ0FDWixPQUFPLFlBNUN5QyxhQUFhLEFBNENwQyxJQUFJLE9BQU8sWUE1Q1AsU0FBUyxBQTRDWSxJQUFJLE9BQU8sWUE1Q0UsT0FBTyxBQTRDRyxFQUN6RSxRQUFRLEVBQUU7WUFDVixxQkFBbUIsV0E1Q3dDLGFBQWEsRUE0Q3ZDLFNBQVMsQ0FBQyxvQ0FDcEIsV0E3Q29DLGFBQWEsRUE2Q25DLE9BQU8sQ0FBQyxDQUFFO0tBQUEsQ0FBQyxDQUFBO0FBQ2pELHFCQUFpQixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDMUM7QUFDRCxvQkFBaUIs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S0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsT0FBSSxDQUFBO0FBQzVDLEtBQUcsUUFBTSxHQUFHLGdCQUFXLENBQUMsTUFBTSwwQkFBcUIsTUFBTSxRQUFLLENBQUE7QUFDOUQsU0FBTyxRQUFRLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0VBQzFCO09BQ0QsT0FBTyxHQUFHLFNBQVMsQ0FBQyxZQUFZLENBQUM7T0FDakMsZUFBZSxHQUFHLFNBQVMsV0F4akJuQixpQkFBaUIsRUF3akJzQixJQUFJLENBQUM7T0FDcEQsaUJBQWlCLEdBQUcsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL2xleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMb2MsIHsgUG9zLCBTdGFydExpbmUsIFN0YXJ0UG9zLCBTdGFydENvbHVtbiwgc2luZ2xlQ2hhckxvYyB9IGZyb20gJ2VzYXN0L2Rpc3QvTG9jJ1xuaW1wb3J0IHsgY29kZSB9IGZyb20gJy4uL0NvbXBpbGVFcnJvcidcbmltcG9ydCB7IE5vbk5hbWVDaGFyYWN0ZXJzIH0gZnJvbSAnLi9sYW5ndWFnZSdcbmltcG9ydCB7IERvdE5hbWUsIEdyb3VwLCBHX0Jsb2NrLCBHX0JyYWNrZXQsIEdfTGluZSwgR19QYXJlbnRoZXNpcywgR19TcGFjZSwgR19RdW90ZSxcblx0aXNLZXl3b3JkLCBLZXl3b3JkLCBLV19Bc3NpZ25NdXRhYmxlLCBLV19Bc3NpZ25NdXRhdGUsIEtXX0ZvY3VzLCBLV19GdW4sIEtXX0dlbkZ1biwgS1dfTGF6eSxcblx0S1dfT2JqQXNzaWduLCBLV19SZWdpb24sIEtXX1R5cGUsIE5hbWUsIG9wS2V5d29yZEtpbmRGcm9tTmFtZSwgc2hvd0dyb3VwS2luZCxcblx0VG9rZW5OdW1iZXJMaXRlcmFsIH0gZnJvbSAnLi9Ub2tlbidcbmltcG9ydCB7IGFzc2VydCwgaXNFbXB0eSwgbGFzdCB9IGZyb20gJy4vdXRpbCdcblxuLypcblRoaXMgcHJvZHVjZXMgdGhlIFRva2VuIHRyZWUgKHNlZSBUb2tlbi5qcykuXG4qL1xuZXhwb3J0IGRlZmF1bHQgKGNvbnRleHQsIHNvdXJjZVN0cmluZykgPT4ge1xuXHQvLyBMZXhpbmcgYWxnb3JpdGhtIHJlcXVpcmVzIHRyYWlsaW5nIG5ld2xpbmUgdG8gY2xvc2UgYW55IGJsb2Nrcy5cblx0Ly8gVXNlIGEgbnVsbC10ZXJtaW5hdGVkIHN0cmluZyBiZWNhdXNlIGl0J3MgZmFzdGVyIHRoYW4gY2hlY2tpbmcgd2hldGhlciBpbmRleCA9PT0gbGVuZ3RoLlxuXHRzb3VyY2VTdHJpbmcgPSBzb3VyY2VTdHJpbmcgKyAnXFxuXFwwJ1xuXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIEdST1VQSU5HXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8vIFdlIG9ubHkgZXZlciB3cml0ZSB0byB0aGUgaW5uZXJtb3N0IEdyb3VwO1xuXHQvLyB3aGVuIHdlIGNsb3NlIHRoYXQgR3JvdXAgd2UgYWRkIGl0IHRvIHRoZSBlbmNsb3NpbmcgR3JvdXAgYW5kIGNvbnRpbnVlIHdpdGggdGhhdCBvbmUuXG5cdC8vIE5vdGUgdGhhdCBgY3VyR3JvdXBgIGlzIGNvbmNlcHR1YWxseSB0aGUgdG9wIG9mIHRoZSBzdGFjaywgYnV0IGlzIG5vdCBzdG9yZWQgaW4gYHN0YWNrYC5cblx0Y29uc3QgZ3JvdXBTdGFjayA9IFsgXVxuXHRsZXQgY3VyR3JvdXBcblx0Y29uc3Rcblx0XHRhZGRUb0N1cnJlbnRHcm91cCA9IHRva2VuID0+XG5cdFx0XHRjdXJHcm91cC5zdWJUb2tlbnMucHVzaCh0b2tlbiksXG5cblx0XHQvLyBQYXVzZSB3cml0aW5nIHRvIGN1ckdyb3VwIGluIGZhdm9yIG9mIHdyaXRpbmcgdG8gYSBzdWItZ3JvdXAuXG5cdFx0Ly8gV2hlbiB0aGUgc3ViLWdyb3VwIGZpbmlzaGVzIHdlIHdpbGwgcG9wIHRoZSBzdGFjayBhbmQgcmVzdW1lIHdyaXRpbmcgdG8gaXRzIHBhcmVudC5cblx0XHRvcGVuR3JvdXAgPSAob3BlblBvcywgZ3JvdXBLaW5kKSA9PiB7XG5cdFx0XHRncm91cFN0YWNrLnB1c2goY3VyR3JvdXApXG5cdFx0XHQvLyBDb250ZW50cyB3aWxsIGJlIGFkZGVkIHRvIGJ5IGBvYC5cblx0XHRcdC8vIGN1ckdyb3VwLmxvYy5lbmQgd2lsbCBiZSB3cml0dGVuIHRvIHdoZW4gY2xvc2luZyBpdC5cblx0XHRcdGN1ckdyb3VwID0gR3JvdXAoTG9jKG9wZW5Qb3MsIG51bGwpLCBbIF0sIGdyb3VwS2luZClcblx0XHR9LFxuXG5cdFx0Ly8gQSBncm91cCBlbmRpbmcgbWF5IGNsb3NlIG11dGxpcGxlIGdyb3Vwcy5cblx0XHQvLyBGb3IgZXhhbXBsZSwgaW4gYGxvZyEgKCsgMSAxYCwgdGhlIEdfTGluZSB3aWxsIGFsc28gY2xvc2UgYSBHX1BhcmVudGhlc2lzLlxuXHRcdGNsb3NlR3JvdXBzID0gKGNsb3NlUG9zLCBjbG9zZUtpbmQpID0+IHtcblx0XHRcdC8vIGN1ckdyb3VwIGlzIGRpZmZlcmVudCBlYWNoIHRpbWUgd2UgZ28gdGhyb3VnaCB0aGUgbG9vcFxuXHRcdFx0Ly8gYmVjYXVzZSBfY2xvc2VTaW5nbGVHcm91cCBicmluZ3MgdXMgdG8gYW4gZW5jbG9zaW5nIGdyb3VwLlxuXHRcdFx0d2hpbGUgKGN1ckdyb3VwLmtpbmQgIT09IGNsb3NlS2luZCkge1xuXHRcdFx0XHRjb25zdCBjdXJLaW5kID0gY3VyR3JvdXAua2luZFxuXHRcdFx0XHQvLyBBIGxpbmUgY2FuIGNsb3NlIGEgcGFyZW50aGVzaXMsIGJ1dCBhIHBhcmVudGhlc2lzIGNhbid0IGNsb3NlIGEgbGluZSFcblx0XHRcdFx0Y29udGV4dC5jaGVjayhcblx0XHRcdFx0XHRjdXJLaW5kID09PSBHX1BhcmVudGhlc2lzIHx8IGN1cktpbmQgPT09IEdfQnJhY2tldCB8fCBjdXJLaW5kID09PSBHX1NwYWNlLFxuXHRcdFx0XHRcdGNsb3NlUG9zLCAoKSA9PlxuXHRcdFx0XHRcdGBUcnlpbmcgdG8gY2xvc2UgJHtzaG93R3JvdXBLaW5kKGNsb3NlS2luZCl9LCBgICtcblx0XHRcdFx0XHRgYnV0IGxhc3Qgb3BlbmVkIHdhcyAke3Nob3dHcm91cEtpbmQoY3VyS2luZCl9YClcblx0XHRcdFx0X2Nsb3NlU2luZ2xlR3JvdXAoY2xvc2VQb3MsIGN1ckdyb3VwLmtpbmQpXG5cdFx0XHR9XG5cdFx0XHRfY2xvc2VTaW5nbGVHcm91cChjbG9zZVBvcywgY2xvc2VLaW5kKVxuXHRcdH0sXG5cblx0XHRfY2xvc2VTaW5nbGVHcm91cCA9IChjbG9zZVBvcywgY2xvc2VLaW5kKSA9PiB7XG5cdFx0XHRsZXQganVzdENsb3NlZCA9IGN1ckdyb3VwXG5cdFx0XHRjdXJHcm91cCA9IGdyb3VwU3RhY2sucG9wKClcblx0XHRcdGp1c3RDbG9zZWQubG9jLmVuZCA9IGNsb3NlUG9zXG5cdFx0XHRzd2l0Y2ggKGNsb3NlS2luZCkge1xuXHRcdFx0XHRjYXNlIEdfU3BhY2U6IHtcblx0XHRcdFx0XHRjb25zdCBzaXplID0ganVzdENsb3NlZC5zdWJUb2tlbnMubGVuZ3RoXG5cdFx0XHRcdFx0aWYgKHNpemUgIT09IDApXG5cdFx0XHRcdFx0XHQvLyBTcGFjZWQgc2hvdWxkIGFsd2F5cyBoYXZlIGF0IGxlYXN0IHR3byBlbGVtZW50cy5cblx0XHRcdFx0XHRcdGFkZFRvQ3VycmVudEdyb3VwKHNpemUgPT09IDEgPyBqdXN0Q2xvc2VkLnN1YlRva2Vuc1swXSA6IGp1c3RDbG9zZWQpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXNlIEdfTGluZTpcblx0XHRcdFx0XHQvLyBMaW5lIG11c3QgaGF2ZSBjb250ZW50LlxuXHRcdFx0XHRcdC8vIFRoaXMgY2FuIGhhcHBlbiBpZiB0aGVyZSB3YXMganVzdCBhIGNvbW1lbnQuXG5cdFx0XHRcdFx0aWYgKCFpc0VtcHR5KGp1c3RDbG9zZWQuc3ViVG9rZW5zKSlcblx0XHRcdFx0XHRcdGFkZFRvQ3VycmVudEdyb3VwKGp1c3RDbG9zZWQpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0Y2FzZSBHX0Jsb2NrOlxuXHRcdFx0XHRcdGNvbnRleHQuY2hlY2soIWlzRW1wdHkoanVzdENsb3NlZC5zdWJUb2tlbnMpLCBjbG9zZVBvcywgJ0VtcHR5IGJsb2NrLicpXG5cdFx0XHRcdFx0YWRkVG9DdXJyZW50R3JvdXAoanVzdENsb3NlZClcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdGFkZFRvQ3VycmVudEdyb3VwKGp1c3RDbG9zZWQpXG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdG9wZW5QYXJlbnRoZXNpcyA9IGxvYyA9PiB7XG5cdFx0XHRvcGVuR3JvdXAobG9jLnN0YXJ0LCBHX1BhcmVudGhlc2lzKVxuXHRcdFx0b3Blbkdyb3VwKGxvYy5lbmQsIEdfU3BhY2UpXG5cdFx0fSxcblxuXHRcdG9wZW5CcmFja2V0ID0gbG9jID0+IHtcblx0XHRcdG9wZW5Hcm91cChsb2Muc3RhcnQsIEdfQnJhY2tldClcblx0XHRcdG9wZW5Hcm91cChsb2MuZW5kLCBHX1NwYWNlKVxuXHRcdH0sXG5cblx0XHQvLyBXaGVuIHN0YXJ0aW5nIGEgbmV3IGxpbmUsIGEgc3BhY2VkIGdyb3VwIGlzIGNyZWF0ZWQgaW1wbGljaXRseS5cblx0XHRvcGVuTGluZSA9IHBvcyA9PiB7XG5cdFx0XHRvcGVuR3JvdXAocG9zLCBHX0xpbmUpXG5cdFx0XHRvcGVuR3JvdXAocG9zLCBHX1NwYWNlKVxuXHRcdH0sXG5cblx0XHRjbG9zZUxpbmUgPSBwb3MgPT4ge1xuXHRcdFx0Y2xvc2VHcm91cHMocG9zLCBHX1NwYWNlKVxuXHRcdFx0Y2xvc2VHcm91cHMocG9zLCBHX0xpbmUpXG5cdFx0fSxcblxuXHRcdC8vIFdoZW4gZW5jb3VudGVyaW5nIGEgc3BhY2UsIGl0IGJvdGggY2xvc2VzIGFuZCBvcGVucyBhIHNwYWNlZCBncm91cC5cblx0XHRzcGFjZSA9IGxvYyA9PiB7XG5cdFx0XHRjbG9zZUdyb3Vwcyhsb2Muc3RhcnQsIEdfU3BhY2UpXG5cdFx0XHRvcGVuR3JvdXAobG9jLmVuZCwgR19TcGFjZSlcblx0XHR9XG5cblx0Ly8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblx0Ly8gSVRFUkFUSU5HIFRIUk9VR0ggU09VUkNFU1RSSU5HXG5cdC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdC8qXG5cdFRoZXNlIGFyZSBrZXB0IHVwLXRvLWRhdGUgYXMgd2UgaXRlcmF0ZSB0aHJvdWdoIHNvdXJjZVN0cmluZy5cblx0RXZlcnkgYWNjZXNzIHRvIGluZGV4IGhhcyBjb3JyZXNwb25kaW5nIGNoYW5nZXMgdG8gbGluZSBhbmQvb3IgY29sdW1uLlxuXHRUaGlzIGFsc28gZXhwbGFpbnMgd2h5IHRoZXJlIGFyZSBkaWZmZXJlbnQgZnVuY3Rpb25zIGZvciBuZXdsaW5lcyB2cyBvdGhlciBjaGFyYWN0ZXJzLlxuXHQqL1xuXHRsZXQgaW5kZXggPSAwLCBsaW5lID0gU3RhcnRMaW5lLCBjb2x1bW4gPSBTdGFydENvbHVtblxuXG5cdC8qXG5cdE5PVEU6IFdlIHVzZSBjaGFyYWN0ZXIgKmNvZGVzKiBmb3IgZXZlcnl0aGluZy5cblx0Q2hhcmFjdGVycyBhcmUgb2YgdHlwZSBOdW1iZXIgYW5kIG5vdCBqdXN0IFN0cmluZ3Mgb2YgbGVuZ3RoIG9uZS5cblx0Ki9cblx0Y29uc3Rcblx0XHRwb3MgPSAoKSA9PiBQb3MobGluZSwgY29sdW1uKSxcblxuXHRcdHBlZWsgPSAoKSA9PiBzb3VyY2VTdHJpbmcuY2hhckNvZGVBdChpbmRleCksXG5cblx0XHQvLyBNYXkgZWF0IGEgTmV3bGluZS5cblx0XHQvLyBJZiB0aGF0IGhhcHBlbnMsIGxpbmUgYW5kIGNvbHVtbiB3aWxsIHRlbXBvcmFyaWx5IGJlIHdyb25nLFxuXHRcdC8vIGJ1dCB3ZSBoYW5kbGUgaXQgaW4gdGhhdCBzcGVjaWFsIGNhc2UgKHJhdGhlciB0aGFuIGNoZWNraW5nIGZvciBOZXdsaW5lIGV2ZXJ5IHRpbWUpLlxuXHRcdGVhdCA9ICgpID0+IHtcblx0XHRcdGNvbnN0IGNoYXIgPSBzb3VyY2VTdHJpbmcuY2hhckNvZGVBdChpbmRleClcblx0XHRcdGluZGV4ID0gaW5kZXggKyAxXG5cdFx0XHRjb2x1bW4gPSBjb2x1bW4gKyAxXG5cdFx0XHRyZXR1cm4gY2hhclxuXHRcdH0sXG5cblx0XHQvLyBjaGFyVG9FYXQgbXVzdCBub3QgYmUgTmV3bGluZS5cblx0XHR0cnlFYXQgPSBjaGFyVG9FYXQgPT4ge1xuXHRcdFx0Y29uc3QgY2FuRWF0ID0gcGVlaygpID09PSBjaGFyVG9FYXRcblx0XHRcdGlmIChjYW5FYXQpIHtcblx0XHRcdFx0aW5kZXggPSBpbmRleCArIDFcblx0XHRcdFx0Y29sdW1uID0gY29sdW1uICsgMVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGNhbkVhdFxuXHRcdH0sXG5cblx0XHR0cnlFYXROZXdsaW5lID0gKCkgPT4ge1xuXHRcdFx0Y29uc3QgY2FuRWF0ID0gcGVlaygpID09PSBOZXdsaW5lXG5cdFx0XHRpZiAoY2FuRWF0KSB7XG5cdFx0XHRcdGluZGV4ID0gaW5kZXggKyAxXG5cdFx0XHRcdGxpbmUgPSBsaW5lICsgMVxuXHRcdFx0XHRjb2x1bW4gPSBTdGFydENvbHVtblxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGNhbkVhdFxuXHRcdH0sXG5cblx0XHQvLyBDYWxsZXIgbXVzdCBlbnN1cmUgdGhhdCBiYWNraW5nIHVwIG5DaGFyc1RvQmFja1VwIGNoYXJhY3RlcnMgYnJpbmdzIHVzIHRvIG9sZFBvcy5cblx0XHRzdGVwQmFja01hbnkgPSAob2xkUG9zLCBuQ2hhcnNUb0JhY2tVcCkgPT4ge1xuXHRcdFx0aW5kZXggPSBpbmRleCAtIG5DaGFyc1RvQmFja1VwXG5cdFx0XHRsaW5lID0gb2xkUG9zLmxpbmVcblx0XHRcdGNvbHVtbiA9IG9sZFBvcy5jb2x1bW5cblx0XHR9LFxuXG5cdFx0Ly8gRm9yIHRha2VXaGlsZSwgdGFrZVdoaWxlV2l0aFByZXYsIGFuZCBza2lwV2hpbGVFcXVhbHMsXG5cdFx0Ly8gY2hhcmFjdGVyUHJlZGljYXRlIG11c3QgKm5vdCogYWNjZXB0IE5ld2xpbmUuXG5cdFx0Ly8gT3RoZXJ3aXNlIHRoZXJlIG1heSBiZSBhbiBpbmZpbml0ZSBsb29wIVxuXHRcdHRha2VXaGlsZSA9IGNoYXJhY3RlclByZWRpY2F0ZSA9PiB7XG5cdFx0XHRjb25zdCBzdGFydEluZGV4ID0gaW5kZXhcblx0XHRcdF9za2lwV2hpbGUoY2hhcmFjdGVyUHJlZGljYXRlKVxuXHRcdFx0cmV0dXJuIHNvdXJjZVN0cmluZy5zbGljZShzdGFydEluZGV4LCBpbmRleClcblx0XHR9LFxuXG5cdFx0dGFrZVdoaWxlV2l0aFByZXYgPSBjaGFyYWN0ZXJQcmVkaWNhdGUgPT4ge1xuXHRcdFx0Y29uc3Qgc3RhcnRJbmRleCA9IGluZGV4XG5cdFx0XHRfc2tpcFdoaWxlKGNoYXJhY3RlclByZWRpY2F0ZSlcblx0XHRcdHJldHVybiBzb3VyY2VTdHJpbmcuc2xpY2Uoc3RhcnRJbmRleCAtIDEsIGluZGV4KVxuXHRcdH0sXG5cblx0XHRza2lwV2hpbGVFcXVhbHMgPSBjaGFyID0+XG5cdFx0XHRfc2tpcFdoaWxlKF8gPT4gXyA9PT0gY2hhciksXG5cblx0XHRza2lwUmVzdE9mTGluZSA9ICgpID0+XG5cdFx0XHRfc2tpcFdoaWxlKF8gPT4gXyAhPT0gTmV3bGluZSksXG5cblx0XHRfc2tpcFdoaWxlID0gY2hhcmFjdGVyUHJlZGljYXRlID0+IHtcblx0XHRcdGNvbnN0IHN0YXJ0SW5kZXggPSBpbmRleFxuXHRcdFx0d2hpbGUgKGNoYXJhY3RlclByZWRpY2F0ZShwZWVrKCkpKVxuXHRcdFx0XHRpbmRleCA9IGluZGV4ICsgMVxuXHRcdFx0Y29uc3QgZGlmZiA9IGluZGV4IC0gc3RhcnRJbmRleFxuXHRcdFx0Y29sdW1uID0gY29sdW1uICsgZGlmZlxuXHRcdFx0cmV0dXJuIGRpZmZcblx0XHR9LFxuXG5cdFx0Ly8gQ2FsbGVkIGFmdGVyIHNlZWluZyB0aGUgZmlyc3QgbmV3bGluZS5cblx0XHQvLyBSZXR1cm5zICMgdG90YWwgbmV3bGluZXMsIGluY2x1ZGluZyB0aGUgZmlyc3QuXG5cdFx0c2tpcE5ld2xpbmVzID0gKCkgPT4ge1xuXHRcdFx0Y29uc3Qgc3RhcnRMaW5lID0gbGluZVxuXHRcdFx0bGluZSA9IGxpbmUgKyAxXG5cdFx0XHR3aGlsZSAocGVlaygpID09PSBOZXdsaW5lKSB7XG5cdFx0XHRcdGluZGV4ID0gaW5kZXggKyAxXG5cdFx0XHRcdGxpbmUgPSBsaW5lICsgMVxuXHRcdFx0fVxuXHRcdFx0Y29sdW1uID0gU3RhcnRDb2x1bW5cblx0XHRcdHJldHVybiBsaW5lIC0gc3RhcnRMaW5lXG5cdFx0fVxuXG5cdC8vIFNwcmlua2xlIGNoZWNrUG9zKCkgYXJvdW5kIHRvIGRlYnVnIGxpbmUgYW5kIGNvbHVtbiB0cmFja2luZyBlcnJvcnMuXG5cdC8qXG5cdGNvbnN0XG5cdFx0Y2hlY2tQb3MgPSAoKSA9PiB7XG5cdFx0XHRjb25zdCBwID0gX2dldENvcnJlY3RQb3MoKVxuXHRcdFx0aWYgKHAubGluZSAhPT0gbGluZSB8fCBwLmNvbHVtbiAhPT0gY29sdW1uKVxuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoYGluZGV4OiAke2luZGV4fSwgd3Jvbmc6ICR7UG9zKGxpbmUsIGNvbHVtbil9LCByaWdodDogJHtwfWApXG5cdFx0fSxcblx0XHRfaW5kZXhUb1BvcyA9IG5ldyBNYXAoKSxcblx0XHRfZ2V0Q29ycmVjdFBvcyA9ICgpID0+IHtcblx0XHRcdGlmIChpbmRleCA9PT0gMClcblx0XHRcdFx0cmV0dXJuIFBvcyhTdGFydExpbmUsIFN0YXJ0Q29sdW1uKVxuXG5cdFx0XHRsZXQgb2xkUG9zLCBvbGRJbmRleFxuXHRcdFx0Zm9yIChvbGRJbmRleCA9IGluZGV4IC0gMTsgOyBvbGRJbmRleCA9IG9sZEluZGV4IC0gMSkge1xuXHRcdFx0XHRvbGRQb3MgPSBfaW5kZXhUb1Bvcy5nZXQob2xkSW5kZXgpXG5cdFx0XHRcdGlmIChvbGRQb3MgIT09IHVuZGVmaW5lZClcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRhc3NlcnQob2xkSW5kZXggPj0gMClcblx0XHRcdH1cblx0XHRcdGxldCBuZXdMaW5lID0gb2xkUG9zLmxpbmUsIG5ld0NvbHVtbiA9IG9sZFBvcy5jb2x1bW5cblx0XHRcdGZvciAoOyBvbGRJbmRleCA8IGluZGV4OyBvbGRJbmRleCA9IG9sZEluZGV4ICsgMSlcblx0XHRcdFx0aWYgKHNvdXJjZVN0cmluZy5jaGFyQ29kZUF0KG9sZEluZGV4KSA9PT0gTmV3bGluZSkge1xuXHRcdFx0XHRcdG5ld0xpbmUgPSBuZXdMaW5lICsgMVxuXHRcdFx0XHRcdG5ld0NvbHVtbiA9IFN0YXJ0Q29sdW1uXG5cdFx0XHRcdH0gZWxzZVxuXHRcdFx0XHRcdG5ld0NvbHVtbiA9IG5ld0NvbHVtbiArIDFcblxuXHRcdFx0Y29uc3QgcCA9IFBvcyhuZXdMaW5lLCBuZXdDb2x1bW4pXG5cdFx0XHRfaW5kZXhUb1Bvcy5zZXQoaW5kZXgsIHApXG5cdFx0XHRyZXR1cm4gcFxuXHRcdH1cblx0Ki9cblxuXHQvKlxuXHRJbiB0aGUgY2FzZSBvZiBxdW90ZSBpbnRlcnBvbGF0aW9uIChcImF7Yn1jXCIpIHdlJ2xsIHJlY3Vyc2UgYmFjayBpbnRvIGhlcmUuXG5cdFdoZW4gaXNJblF1b3RlIGlzIHRydWUsIHdlIHdpbGwgbm90IGFsbG93IG5ld2xpbmVzLlxuXHQqL1xuXHRjb25zdCBsZXhQbGFpbiA9IGlzSW5RdW90ZSA9PiB7XG5cdFx0Ly8gVGhpcyB0ZWxscyB1cyB3aGljaCBpbmRlbnRlZCBibG9jayB3ZSdyZSBpbi5cblx0XHQvLyBJbmNyZW1lbnRpbmcgaXQgbWVhbnMgaXNzdWluZyBhIEdQX09wZW5CbG9jayBhbmQgZGVjcmVtZW50aW5nIGl0IG1lYW5zIGEgR1BfQ2xvc2VCbG9jay5cblx0XHQvLyBEb2VzIG5vdGhpbmcgaWYgaXNJblF1b3RlLlxuXHRcdGxldCBpbmRlbnQgPSAwXG5cblx0XHQvLyBNYWtlIGNsb3N1cmVzIG5vdyByYXRoZXIgdGhhbiBpbnNpZGUgdGhlIGxvb3AuXG5cdFx0Ly8gVGhpcyBpcyBzaWduaWZpY2FudGx5IGZhc3RlciBhcyBvZiBub2RlIHYwLjExLjE0LlxuXG5cdFx0Ly8gVGhpcyBpcyB3aGVyZSB3ZSBzdGFydGVkIGxleGluZyB0aGUgY3VycmVudCB0b2tlbi5cblx0XHRsZXQgc3RhcnRDb2x1bW5cblx0XHRjb25zdFxuXHRcdFx0c3RhcnRQb3MgPSAoKSA9PiBQb3MobGluZSwgc3RhcnRDb2x1bW4pLFxuXHRcdFx0bG9jID0gKCkgPT4gTG9jKHN0YXJ0UG9zKCksIHBvcygpKSxcblx0XHRcdGtleXdvcmQgPSBraW5kID0+XG5cdFx0XHRcdGFkZFRvQ3VycmVudEdyb3VwKEtleXdvcmQobG9jKCksIGtpbmQpKSxcblx0XHRcdGVhdEFuZEFkZE51bWJlciA9ICgpID0+IHtcblx0XHRcdFx0Ly8gVE9ETzogQSByZWFsIG51bWJlciBsaXRlcmFsIGxleGVyLCBub3QganVzdCBKYXZhU2NyaXB0J3MuLi5cblx0XHRcdFx0Y29uc3QgbnVtYmVyU3RyaW5nID0gdGFrZVdoaWxlV2l0aFByZXYoaXNOdW1iZXJDaGFyYWN0ZXIpXG5cdFx0XHRcdGNvbnN0IG51bWJlciA9IE51bWJlcihudW1iZXJTdHJpbmcpXG5cdFx0XHRcdGNvbnRleHQuY2hlY2soIU51bWJlci5pc05hTihudW1iZXIpLCBwb3MsICgpID0+XG5cdFx0XHRcdFx0YEludmFsaWQgbnVtYmVyIGxpdGVyYWwgJHtjb2RlKG51bWJlclN0cmluZyl9YClcblx0XHRcdFx0YWRkVG9DdXJyZW50R3JvdXAoVG9rZW5OdW1iZXJMaXRlcmFsKGxvYygpLCBudW1iZXIpKVxuXHRcdFx0fVxuXG5cdFx0d2hpbGUgKHRydWUpIHtcblx0XHRcdHN0YXJ0Q29sdW1uID0gY29sdW1uXG5cdFx0XHRjb25zdCBjaGFyYWN0ZXJFYXRlbiA9IGVhdCgpXG5cdFx0XHQvLyBHZW5lcmFsbHksIHRoZSB0eXBlIG9mIGEgdG9rZW4gaXMgZGV0ZXJtaW5lZCBieSB0aGUgZmlyc3QgY2hhcmFjdGVyLlxuXHRcdFx0c3dpdGNoIChjaGFyYWN0ZXJFYXRlbikge1xuXHRcdFx0XHRjYXNlIFplcm86XG5cdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdGNhc2UgTjA6IGNhc2UgTjE6IGNhc2UgTjI6IGNhc2UgTjM6IGNhc2UgTjQ6XG5cdFx0XHRcdGNhc2UgTjU6IGNhc2UgTjY6IGNhc2UgTjc6IGNhc2UgTjg6IGNhc2UgTjk6XG5cdFx0XHRcdFx0ZWF0QW5kQWRkTnVtYmVyKClcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRjYXNlIE9wZW5QYXJlbnRoZXNpczpcblx0XHRcdFx0XHRvcGVuUGFyZW50aGVzaXMobG9jKCkpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0Y2FzZSBPcGVuQnJhY2tldDpcblx0XHRcdFx0XHRvcGVuQnJhY2tldChsb2MoKSlcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRjYXNlIENsb3NlUGFyZW50aGVzaXM6XG5cdFx0XHRcdFx0Y2xvc2VHcm91cHMocG9zKCksIEdfUGFyZW50aGVzaXMpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0Y2FzZSBDbG9zZUJyYWNrZXQ6XG5cdFx0XHRcdFx0Y2xvc2VHcm91cHMocG9zKCkuZW5kLCBHX0JyYWNrZXQpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0Y2FzZSBDbG9zZUJyYWNlOlxuXHRcdFx0XHRcdGNvbnRleHQuY2hlY2soaXNJblF1b3RlLCBsb2MsICgpID0+XG5cdFx0XHRcdFx0XHRgUmVzZXJ2ZWQgY2hhcmFjdGVyICR7c2hvd0NoYXIoQ2xvc2VCcmFjZSl9YClcblx0XHRcdFx0XHRyZXR1cm5cblx0XHRcdFx0Y2FzZSBTcGFjZToge1xuXHRcdFx0XHRcdGNvbnN0IG5leHQgPSBwZWVrKClcblx0XHRcdFx0XHRjb250ZXh0Lndhcm5JZihuZXh0ID09PSBTcGFjZSwgbG9jLCAnTXVsdGlwbGUgc3BhY2VzIGluIGEgcm93LicpXG5cdFx0XHRcdFx0Y29udGV4dC53YXJuSWYobmV4dCA9PT0gTmV3bGluZSwgbG9jLCAnTGluZSBlbmRzIGluIGEgc3BhY2UuJylcblx0XHRcdFx0XHRzcGFjZShsb2MoKSlcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhc2UgRG90OiB7XG5cdFx0XHRcdFx0Y29uc3QgcCA9IHBlZWsoKVxuXHRcdFx0XHRcdGlmIChwID09PSBTcGFjZSB8fCBwID09PSBOZXdsaW5lKSB7XG5cdFx0XHRcdFx0XHQvLyBPYmpMaXQgYXNzaWduIGluIGl0cyBvd24gc3BhY2VkIGdyb3VwLlxuXHRcdFx0XHRcdFx0Ly8gV2UgY2FuJ3QganVzdCBjcmVhdGUgYSBuZXcgR3JvdXAgaGVyZSBiZWNhdXNlIHdlIHdhbnQgdG9cblx0XHRcdFx0XHRcdC8vIGVuc3VyZSBpdCdzIG5vdCBwYXJ0IG9mIHRoZSBwcmVjZWRpbmcgb3IgZm9sbG93aW5nIHNwYWNlZCBncm91cC5cblx0XHRcdFx0XHRcdGNsb3NlR3JvdXBzKHN0YXJ0UG9zKCksIEdfU3BhY2UpXG5cdFx0XHRcdFx0XHRrZXl3b3JkKEtXX09iakFzc2lnbilcblx0XHRcdFx0XHRcdG9wZW5Hcm91cChwb3MoKSwgR19TcGFjZSlcblx0XHRcdFx0XHR9IGVsc2Vcblx0XHRcdFx0XHRcdGFkZFRvQ3VycmVudEdyb3VwKERvdE5hbWUoXG5cdFx0XHRcdFx0XHRcdGxvYygpLFxuXHRcdFx0XHRcdFx0XHQvLyArMSBmb3IgdGhlIGRvdCB3ZSBqdXN0IHNraXBwZWQuXG5cdFx0XHRcdFx0XHRcdHNraXBXaGlsZUVxdWFscyhEb3QpICsgMSxcblx0XHRcdFx0XHRcdFx0dGFrZVdoaWxlKGlzTmFtZUNoYXJhY3RlcikpKVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdH1cblx0XHRcdFx0Y2FzZSBDb2xvbjpcblx0XHRcdFx0XHRpZiAodHJ5RWF0KENvbG9uKSkge1xuXHRcdFx0XHRcdFx0Y29uc3QgZXEgPSB0cnlFYXQoRXF1YWwpXG5cdFx0XHRcdFx0XHRjb250ZXh0LmNoZWNrKGVxLCBsb2MsICgpID0+XG5cdFx0XHRcdFx0XHRcdGAke2NvZGUoJzo6Jyl9IG11c3QgYmUgZm9sbG93ZWQgYnkgJHtjb2RlKCc9Jyl9YClcblx0XHRcdFx0XHRcdGtleXdvcmQoS1dfQXNzaWduTXV0YWJsZSlcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHRyeUVhdChFcXVhbCkpXG5cdFx0XHRcdFx0XHRrZXl3b3JkKEtXX0Fzc2lnbk11dGF0ZSlcblx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRrZXl3b3JkKEtXX1R5cGUpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0Y2FzZSBUaWxkZTpcblx0XHRcdFx0XHRpZiAodHJ5RWF0KEJhcikpIHtcblx0XHRcdFx0XHRcdGtleXdvcmQoS1dfR2VuRnVuKVxuXHRcdFx0XHRcdFx0c3BhY2UobG9jKCkpXG5cdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRrZXl3b3JkKEtXX0xhenkpXG5cdFx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRjYXNlIEJhcjpcblx0XHRcdFx0XHRrZXl3b3JkKEtXX0Z1bilcblx0XHRcdFx0XHQvLyBGaXJzdCBhcmcgaW4gaXRzIG93biBzcGFjZWQgZ3JvdXBcblx0XHRcdFx0XHRzcGFjZShsb2MoKSlcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRjYXNlIFVuZGVyc2NvcmU6XG5cdFx0XHRcdFx0a2V5d29yZChLV19Gb2N1cylcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRjYXNlIEhhc2g6XG5cdFx0XHRcdFx0aWYgKCEodHJ5RWF0KFNwYWNlKSB8fCB0cnlFYXQoVGFiKSkpXG5cdFx0XHRcdFx0XHRjb250ZXh0LmZhaWwobG9jLCAoKSA9PiBgJHtjb2RlKCcjJyl9IG11c3QgYmUgZm9sbG93ZWQgYnkgc3BhY2Ugb3IgdGFiLn1gKVxuXHRcdFx0XHRcdHNraXBSZXN0T2ZMaW5lKClcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHRjYXNlIE5ld2xpbmU6IHtcblx0XHRcdFx0XHRjb250ZXh0LmNoZWNrKCFpc0luUXVvdGUsIGxvYywgJ1F1b3RlIGludGVycG9sYXRpb24gY2Fubm90IGNvbnRhaW4gbmV3bGluZScpXG5cblx0XHRcdFx0XHQvLyBTa2lwIGFueSBibGFuayBsaW5lcy5cblx0XHRcdFx0XHRza2lwTmV3bGluZXMoKVxuXHRcdFx0XHRcdGNvbnN0IG9sZEluZGVudCA9IGluZGVudFxuXHRcdFx0XHRcdGluZGVudCA9IHNraXBXaGlsZUVxdWFscyhUYWIpXG5cdFx0XHRcdFx0Y29udGV4dC5jaGVjayhwZWVrKCkgIT09IFNwYWNlLCBwb3MsICdMaW5lIGJlZ2lucyBpbiBhIHNwYWNlJylcblx0XHRcdFx0XHRpZiAoaW5kZW50IDw9IG9sZEluZGVudCkge1xuXHRcdFx0XHRcdFx0Zm9yIChsZXQgaSA9IGluZGVudDsgaSA8IG9sZEluZGVudDsgaSA9IGkgKyAxKSB7XG5cdFx0XHRcdFx0XHRcdGNsb3NlTGluZShsb2Muc3RhcnQpXG5cdFx0XHRcdFx0XHRcdGNsb3NlR3JvdXBzKGxvYy5lbmQsIEdfQmxvY2spXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRjbG9zZUxpbmUobG9jKCkuc3RhcnQpXG5cdFx0XHRcdFx0XHRvcGVuTGluZShsb2MoKS5lbmQpXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGNvbnRleHQuY2hlY2soaW5kZW50ID09PSBvbGRJbmRlbnQgKyAxLCBsb2MsXG5cdFx0XHRcdFx0XHRcdCdMaW5lIGlzIGluZGVudGVkIG1vcmUgdGhhbiBvbmNlJylcblx0XHRcdFx0XHRcdC8vIEJsb2NrIGF0IGVuZCBvZiBsaW5lIGdvZXMgaW4gaXRzIG93biBzcGFjZWQgZ3JvdXAuXG5cdFx0XHRcdFx0XHQvLyBIb3dldmVyLCBgfmAgcHJlY2VkaW5nIGEgYmxvY2sgZ29lcyBpbiBhIGdyb3VwIHdpdGggaXQuXG5cdFx0XHRcdFx0XHRpZiAoaXNFbXB0eShjdXJHcm91cC5zdWJUb2tlbnMpIHx8XG5cdFx0XHRcdFx0XHRcdCFpc0tleXdvcmQoS1dfTGF6eSwgbGFzdChjdXJHcm91cC5zdWJUb2tlbnMpKSlcblx0XHRcdFx0XHRcdFx0c3BhY2UobG9jKCkpXG5cdFx0XHRcdFx0XHRvcGVuR3JvdXAobG9jKCkuc3RhcnQsIEdfQmxvY2spXG5cdFx0XHRcdFx0XHRvcGVuTGluZShsb2MoKS5lbmQpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdH1cblx0XHRcdFx0Y2FzZSBRdW90ZTpcblx0XHRcdFx0XHRsZXhRdW90ZShpbmRlbnQpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0Y2FzZSBBbXBlcnNhbmQ6IGNhc2UgQmFja3NsYXNoOiBjYXNlIEJhY2t0aWNrOiBjYXNlIENhcmV0OlxuXHRcdFx0XHRjYXNlIENvbW1hOiBjYXNlIFBlcmNlbnQ6IGNhc2UgU2VtaWNvbG9uOlxuXHRcdFx0XHRcdGNvbnRleHQuZmFpbChsb2MsIGBSZXNlcnZlZCBjaGFyYWN0ZXIgJHtzaG93Q2hhcihjaGFyYWN0ZXJFYXRlbil9YClcblx0XHRcdFx0Y2FzZSBUYWI6XG5cdFx0XHRcdFx0Ly8gV2UgYWx3YXlzIGVhdCB0YWJzIGluIHRoZSBOZXdsaW5lIGhhbmRsZXIsXG5cdFx0XHRcdFx0Ly8gc28gdGhpcyB3aWxsIG9ubHkgaGFwcGVuIGluIHRoZSBtaWRkbGUgb2YgYSBsaW5lLlxuXHRcdFx0XHRcdGNvbnRleHQuZmFpbChsb2MoKSwgJ1RhYiBtYXkgb25seSBiZSB1c2VkIHRvIGluZGVudCcpXG5cdFx0XHRcdGNhc2UgSHlwaGVuOlxuXHRcdFx0XHRcdGlmIChpc0RpZ2l0KHBlZWsoKSkpIHtcblx0XHRcdFx0XHRcdC8vIGVhdE51bWJlcigpIGxvb2tzIGF0IHByZXYgY2hhcmFjdGVyLCBzbyBoeXBoZW4gaW5jbHVkZWQuXG5cdFx0XHRcdFx0XHRlYXRBbmRBZGROdW1iZXIoKVxuXHRcdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Ly8gZWxzZSBmYWxsdGhyb3VnaFxuXHRcdFx0XHRkZWZhdWx0OiB7XG5cdFx0XHRcdFx0Ly8gQWxsIG90aGVyIGNoYXJhY3RlcnMgc2hvdWxkIGJlIGhhbmRsZWQgaW4gYSBjYXNlIGFib3ZlLlxuXHRcdFx0XHRcdGNvbnN0IG5hbWUgPSB0YWtlV2hpbGVXaXRoUHJldihpc05hbWVDaGFyYWN0ZXIpXG5cdFx0XHRcdFx0Y29uc3Qga2V5d29yZEtpbmQgPSBvcEtleXdvcmRLaW5kRnJvbU5hbWUobmFtZSlcblx0XHRcdFx0XHRpZiAoa2V5d29yZEtpbmQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0Y29udGV4dC5jaGVjayhrZXl3b3JkS2luZCAhPT0gLTEsIHBvcywgKCkgPT5cblx0XHRcdFx0XHRcdFx0YFJlc2VydmVkIG5hbWUgJHtjb2RlKG5hbWUpfWApXG5cdFx0XHRcdFx0XHRpZiAoa2V5d29yZEtpbmQgPT09IEtXX1JlZ2lvbilcblx0XHRcdFx0XHRcdFx0Ly8gVE9ETzogRWF0IGFuZCBwdXQgaXQgaW4gUmVnaW9uIGV4cHJlc3Npb25cblx0XHRcdFx0XHRcdFx0c2tpcFJlc3RPZkxpbmUoKVxuXHRcdFx0XHRcdFx0a2V5d29yZChrZXl3b3JkS2luZClcblx0XHRcdFx0XHR9IGVsc2Vcblx0XHRcdFx0XHRcdGFkZFRvQ3VycmVudEdyb3VwKE5hbWUobG9jKCksIG5hbWUpKVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Y29uc3QgbGV4UXVvdGUgPSBpbmRlbnQgPT4ge1xuXHRcdGNvbnN0IHF1b3RlSW5kZW50ID0gaW5kZW50ICsgMVxuXG5cdFx0Ly8gSW5kZW50ZWQgcXVvdGUgaXMgY2hhcmFjdGVyaXplZCBieSBiZWluZyBpbW1lZGlhdGVseSBmb2xsb3dlZCBieSBhIG5ld2xpbmUuXG5cdFx0Ly8gVGhlIG5leHQgbGluZSAqbXVzdCogaGF2ZSBzb21lIGNvbnRlbnQgYXQgdGhlIG5leHQgaW5kZW50YXRpb24uXG5cdFx0Y29uc3QgaXNJbmRlbnRlZCA9IHRyeUVhdE5ld2xpbmUoKVxuXHRcdGlmIChpc0luZGVudGVkKSB7XG5cdFx0XHRjb25zdCBhY3R1YWxJbmRlbnQgPSBza2lwV2hpbGVFcXVhbHMoVGFiKVxuXHRcdFx0Y29udGV4dC5jaGVjayhhY3R1YWxJbmRlbnQgPT09IHF1b3RlSW5kZW50LCBwb3MsXG5cdFx0XHRcdCdJbmRlbnRlZCBxdW90ZSBtdXN0IGhhdmUgZXhhY3RseSBvbmUgbW9yZSBpbmRlbnQgdGhhbiBwcmV2aW91cyBsaW5lLicpXG5cdFx0fVxuXG5cdFx0Ly8gQ3VycmVudCBzdHJpbmcgbGl0ZXJhbCBwYXJ0IG9mIHF1b3RlIHdlIGFyZSByZWFkaW5nLlxuXHRcdGxldCByZWFkID0gJydcblxuXHRcdGNvbnN0IG1heWJlT3V0cHV0UmVhZCA9ICgpID0+IHtcblx0XHRcdGlmIChyZWFkICE9PSAnJykge1xuXHRcdFx0XHRhZGRUb0N1cnJlbnRHcm91cChyZWFkKVxuXHRcdFx0XHRyZWFkID0gJydcblx0XHRcdH1cblx0XHR9XG5cblx0XHRjb25zdCBsb2NTaW5nbGUgPSAoKSA9PiBzaW5nbGVDaGFyTG9jKHBvcygpKVxuXG5cdFx0b3Blbkdyb3VwKGxvY1NpbmdsZSgpLnN0YXJ0LCBHX1F1b3RlKVxuXG5cdFx0ZWF0Q2hhcnM6IHdoaWxlICh0cnVlKSB7XG5cdFx0XHRjb25zdCBjaGFyID0gZWF0KClcblx0XHRcdHN3aXRjaCAoY2hhcikge1xuXHRcdFx0XHRjYXNlIEJhY2tzbGFzaDoge1xuXHRcdFx0XHRcdHJlYWQgPSByZWFkICsgcXVvdGVFc2NhcGUoZWF0KCkpXG5cdFx0XHRcdFx0YnJlYWtcblx0XHRcdFx0fVxuXHRcdFx0XHRjYXNlIE9wZW5CcmFjZToge1xuXHRcdFx0XHRcdG1heWJlT3V0cHV0UmVhZCgpXG5cdFx0XHRcdFx0Y29uc3QgbCA9IGxvY1NpbmdsZSgpXG5cdFx0XHRcdFx0b3BlblBhcmVudGhlc2lzKGwpXG5cdFx0XHRcdFx0bGV4UGxhaW4odHJ1ZSlcblx0XHRcdFx0XHRjbG9zZUdyb3VwcyhsLmVuZCwgR19QYXJlbnRoZXNpcylcblx0XHRcdFx0XHRicmVha1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNhc2UgTmV3bGluZToge1xuXHRcdFx0XHRcdGNvbnN0IG9yaWdpbmFsUG9zID0gcG9zKClcblx0XHRcdFx0XHQvLyBHbyBiYWNrIHRvIGJlZm9yZSB3ZSBhdGUgaXQuXG5cdFx0XHRcdFx0b3JpZ2luYWxQb3MuY29sdW1uID0gb3JpZ2luYWxQb3MuY29sdW1uIC0gMVxuXG5cdFx0XHRcdFx0Y29udGV4dC5jaGVjayhpc0luZGVudGVkLCBsb2NTaW5nbGUsICdVbmNsb3NlZCBxdW90ZS4nKVxuXHRcdFx0XHRcdC8vIEFsbG93IGV4dHJhIGJsYW5rIGxpbmVzLlxuXHRcdFx0XHRcdGNvbnN0IG51bU5ld2xpbmVzID0gc2tpcE5ld2xpbmVzKClcblx0XHRcdFx0XHRjb25zdCBuZXdJbmRlbnQgPSBza2lwV2hpbGVFcXVhbHMoVGFiKVxuXHRcdFx0XHRcdGlmIChuZXdJbmRlbnQgPCBxdW90ZUluZGVudCkge1xuXHRcdFx0XHRcdFx0Ly8gSW5kZW50ZWQgcXVvdGUgc2VjdGlvbiBpcyBvdmVyLlxuXHRcdFx0XHRcdFx0Ly8gVW5kbyByZWFkaW5nIHRoZSB0YWJzIGFuZCBuZXdsaW5lLlxuXHRcdFx0XHRcdFx0c3RlcEJhY2tNYW55KG9yaWdpbmFsUG9zLCBudW1OZXdsaW5lcyArIG5ld0luZGVudClcblx0XHRcdFx0XHRcdGFzc2VydChwZWVrKCkgPT09IE5ld2xpbmUpXG5cdFx0XHRcdFx0XHRicmVhayBlYXRDaGFyc1xuXHRcdFx0XHRcdH0gZWxzZVxuXHRcdFx0XHRcdFx0cmVhZCA9IHJlYWQgK1xuXHRcdFx0XHRcdFx0XHQnXFxuJy5yZXBlYXQobnVtTmV3bGluZXMpICsgJ1xcdCcucmVwZWF0KG5ld0luZGVudCAtIHF1b3RlSW5kZW50KVxuXHRcdFx0XHRcdGJyZWFrXG5cdFx0XHRcdH1cblx0XHRcdFx0Y2FzZSBRdW90ZTpcblx0XHRcdFx0XHRpZiAoIWlzSW5kZW50ZWQpXG5cdFx0XHRcdFx0XHRicmVhayBlYXRDaGFyc1xuXHRcdFx0XHRcdC8vIEVsc2UgZmFsbHRocm91Z2hcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHQvLyBJJ3ZlIHRyaWVkIHB1c2hpbmcgY2hhcmFjdGVyIGNvZGVzIHRvIGFuIGFycmF5IGFuZCBzdHJpbmdpZnlpbmcgdGhlbSBsYXRlcixcblx0XHRcdFx0XHQvLyBidXQgdGhpcyB0dXJuZWQgb3V0IHRvIGJlIGJldHRlci5cblx0XHRcdFx0XHRyZWFkID0gcmVhZCArIFN0cmluZy5mcm9tQ2hhckNvZGUoY2hhcilcblx0XHRcdH1cblx0XHR9XG5cblx0XHRtYXliZU91dHB1dFJlYWQoKVxuXHRcdGNsb3NlR3JvdXBzKGxvY1NpbmdsZSgpLnN0YXJ0LCBHX1F1b3RlKVxuXHR9XG5cblx0Y29uc3QgcXVvdGVFc2NhcGUgPSBjaCA9PiB7XG5cdFx0c3dpdGNoIChjaCkge1xuXHRcdFx0Y2FzZSBPcGVuQnJhY2U6IHJldHVybiAneydcblx0XHRcdGNhc2UgTGV0dGVyTjogcmV0dXJuICdcXG4nXG5cdFx0XHRjYXNlIExldHRlclQ6IHJldHVybiAnXFx0J1xuXHRcdFx0Y2FzZSBRdW90ZTogcmV0dXJuICdcIidcblx0XHRcdGNhc2UgQmFja3NsYXNoOiByZXR1cm4gJ1xcXFwnXG5cdFx0XHRkZWZhdWx0OiBjb250ZXh0LmZhaWwocG9zLCBgTm8gbmVlZCB0byBlc2NhcGUgJHtzaG93Q2hhcihjaCl9YClcblx0XHR9XG5cdH1cblxuXHRjdXJHcm91cCA9IEdyb3VwKExvYyhTdGFydFBvcywgbnVsbCksIFsgXSwgR19CbG9jaylcblx0b3BlbkxpbmUoU3RhcnRQb3MpXG5cblx0bGV4UGxhaW4oZmFsc2UpXG5cblx0Y29uc3QgZW5kUG9zID0gcG9zKClcblx0Y2xvc2VMaW5lKGVuZFBvcylcblx0YXNzZXJ0KGlzRW1wdHkoZ3JvdXBTdGFjaykpXG5cdGN1ckdyb3VwLmxvYy5lbmQgPSBlbmRQb3Ncblx0cmV0dXJuIGN1ckdyb3VwXG59XG5cbmNvbnN0IGNjID0gXyA9PiBfLmNoYXJDb2RlQXQoMClcbmNvbnN0XG5cdEFtcGVyc2FuZCA9IGNjKCcmJyksXG5cdEJhY2tzbGFzaCA9IGNjKCdcXFxcJyksXG5cdEJhY2t0aWNrID0gY2MoJ2AnKSxcblx0QmFyID0gY2MoJ3wnKSxcblx0Q2FyZXQgPSBjYygnXicpLFxuXHRDbG9zZUJyYWNlID0gY2MoJ30nKSxcblx0Q2xvc2VCcmFja2V0ID0gY2MoJ10nKSxcblx0Q2xvc2VQYXJlbnRoZXNpcyA9IGNjKCcpJyksXG5cdENvbG9uID0gY2MoJzonKSxcblx0Q29tbWEgPSBjYygnLCcpLFxuXHREb3QgPSBjYygnLicpLFxuXHRFcXVhbCA9IGNjKCc9JyksXG5cdEhhc2ggPSBjYygnIycpLFxuXHRIeXBoZW4gPSBjYygnLScpLFxuXHRMZXR0ZXJOID0gY2MoJ24nKSxcblx0TGV0dGVyVCA9IGNjKCd0JyksXG5cdE4wID0gY2MoJzAnKSxcblx0TjEgPSBjYygnMScpLFxuXHROMiA9IGNjKCcyJyksXG5cdE4zID0gY2MoJzMnKSxcblx0TjQgPSBjYygnNCcpLFxuXHRONSA9IGNjKCc1JyksXG5cdE42ID0gY2MoJzYnKSxcblx0TjcgPSBjYygnNycpLFxuXHROOCA9IGNjKCc4JyksXG5cdE45ID0gY2MoJzknKSxcblx0TmV3bGluZSA9IGNjKCdcXG4nKSxcblx0T3BlbkJyYWNlID0gY2MoJ3snKSxcblx0T3BlbkJyYWNrZXQgPSBjYygnWycpLFxuXHRPcGVuUGFyZW50aGVzaXMgPSBjYygnKCcpLFxuXHRQZXJjZW50ID0gY2MoJyUnKSxcblx0UXVvdGUgPSBjYygnXCInKSxcblx0U2VtaWNvbG9uID0gY2MoJzsnKSxcblx0U3BhY2UgPSBjYygnICcpLFxuXHRUYWIgPSBjYygnXFx0JyksXG5cdFRpbGRlID0gY2MoJ34nKSxcblx0VW5kZXJzY29yZSA9IGNjKCdfJyksXG5cdFplcm8gPSBjYygnXFwwJylcblxuY29uc3Rcblx0c2hvd0NoYXIgPSBjaGFyID0+IGNvZGUoU3RyaW5nLmZyb21DaGFyQ29kZShjaGFyKSksXG5cdF9jaGFyUHJlZCA9IChjaGFycywgbmVnYXRlKSA9PiB7XG5cdFx0bGV0IHNyYyA9ICdzd2l0Y2goY2gpIHtcXG4nXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkgPSBpICsgMSlcblx0XHRcdHNyYyA9IGAke3NyY31jYXNlICR7Y2hhcnMuY2hhckNvZGVBdChpKX06IGBcblx0XHRzcmMgPSBgJHtzcmN9IHJldHVybiAkeyFuZWdhdGV9XFxuZGVmYXVsdDogcmV0dXJuICR7bmVnYXRlfVxcbn1gXG5cdFx0cmV0dXJuIEZ1bmN0aW9uKCdjaCcsIHNyYylcblx0fSxcblx0aXNEaWdpdCA9IF9jaGFyUHJlZCgnMDEyMzQ1Njc4OScpLFxuXHRpc05hbWVDaGFyYWN0ZXIgPSBfY2hhclByZWQoTm9uTmFtZUNoYXJhY3RlcnMsIHRydWUpLFxuXHRpc051bWJlckNoYXJhY3RlciA9IF9jaGFyUHJlZCgnMDEyMzQ1Njc4OS5lJylcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9