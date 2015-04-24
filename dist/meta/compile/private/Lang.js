if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', './U/util'], function (exports, _UUtil) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});

	const g = ['<~', '<~~'];
	const GeneratorKeywords = _UUtil.newSet(g);
	exports.GeneratorKeywords = GeneratorKeywords;
	const AssignKeywords = _UUtil.newSet(['=', '. '].concat(g));

	exports.AssignKeywords = AssignKeywords;
	const LineSplitKeywords = _UUtil.newSet(AssignKeywords, ['->']);

	exports.LineSplitKeywords = LineSplitKeywords;
	// `export` is not a keyword, but `. ` assigns in module context become exports.
	const KAssign = _UUtil.newSet(AssignKeywords, ['export']);
	exports.KAssign = KAssign;
	const KFun = _UUtil.newSet(['|', '~|']);
	exports.KFun = KFun;
	const CaseKeywords = _UUtil.newSet(['case', 'case!']);
	exports.CaseKeywords = CaseKeywords;
	const SpecialKeywords = _UUtil.newSet(['this', 'this-module-directory']);
	exports.SpecialKeywords = SpecialKeywords;
	const UseKeywords = _UUtil.newSet(['use!', 'use', 'use~', 'use-debug']);

	exports.UseKeywords = UseKeywords;
	const AllKeywords = _UUtil.newSet(LineSplitKeywords, KFun, CaseKeywords, SpecialKeywords, UseKeywords, ['~', ':', '_', 'debug', 'debugger', 'else', 'end-loop!', 'in', 'loop!', 'out', 'region']);

	exports.AllKeywords = AllKeywords;
	const ReservedNames = _UUtil.newSet(['for', 'return']);

	// Names that are not allowed in a Name token.
	const NonNames = _UUtil.newSet(['region'], AllKeywords, ReservedNames);

	exports.NonNames = NonNames;
	const GroupKinds = _UUtil.newSet(['(', '[', '{', '->', 'ln', 'sp', '"']);

	exports.GroupKinds = GroupKinds;
	const GroupOpenToClose = _UUtil.newMap([['(', ')'], ['[', ']'], ['{', '}'], ['->', '<-'], ['ln', 'ln'], ['sp', 'sp'], ['"', 'close"']]);

	exports.GroupOpenToClose = GroupOpenToClose;
	// TODO: Allow Opts to specify additional globals.
	const JsGlobals = _UUtil.newSet(['Array', 'Boolean', 'Date', 'Error', 'EvalError', 'Function', 'JSON', 'Math', 'Number', 'Object', 'Promise', 'RangeError', 'ReferenceError', 'RegExp', 'String', 'Symbol', 'SyntaxError', 'TypeError', 'URIError', 'decodeURI', 'decodeURIComponent', 'encodeURI', 'encodeURIComponent', 'eval', 'undefined', 'Buffer', 'clearInterval', 'clearTimeout', 'console', 'global', 'setInterval', 'setTimeout',
	// Not really globals, but it works out that way.
	'false', 'true', 'null']);

	exports.JsGlobals = JsGlobals;
	// Anything not explicitly reserved is a valid name character.
	// A `~` may appear in a name, but not at the beginning.
	const NonNameCharacters = '()[]{}.:|_ \n\t"`#;,';
	exports.NonNameCharacters = NonNameCharacters;
	const ReservedCharacters = '`;,%^&\\';

	exports.ReservedCharacters = ReservedCharacters;
	const defaultLoopName = 'anon-loop';

	exports.defaultLoopName = defaultLoopName;
	const fileExtension = '.ms';
	exports.fileExtension = fileExtension;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL0xhbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBLE9BQU0sQ0FBQyxHQUFHLENBQUUsSUFBSSxFQUFFLEtBQUssQ0FBRSxDQUFBO0FBQ2xCLE9BQU0saUJBQWlCLEdBQUcsT0FIeEIsTUFBTSxDQUd5QixDQUFDLENBQUMsQ0FBQTtTQUE3QixpQkFBaUIsR0FBakIsaUJBQWlCO0FBQ3ZCLE9BQU0sY0FBYyxHQUFHLE9BSnJCLE1BQU0sQ0FJc0IsQ0FBRSxHQUFHLEVBQUUsSUFBSSxDQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7O1NBQWhELGNBQWMsR0FBZCxjQUFjO0FBRXBCLE9BQU0saUJBQWlCLEdBQUcsT0FOeEIsTUFBTSxDQU15QixjQUFjLEVBQUUsQ0FBRSxJQUFJLENBQUUsQ0FBQyxDQUFBOztTQUFwRCxpQkFBaUIsR0FBakIsaUJBQWlCOztBQUd2QixPQUFNLE9BQU8sR0FBRyxPQVRkLE1BQU0sQ0FTZSxjQUFjLEVBQUUsQ0FBRSxRQUFRLENBQUUsQ0FBQyxDQUFBO1NBQTlDLE9BQU8sR0FBUCxPQUFPO0FBQ2IsT0FBTSxJQUFJLEdBQUcsT0FWWCxNQUFNLENBVVksQ0FBRSxHQUFHLEVBQUUsSUFBSSxDQUFFLENBQUMsQ0FBQTtTQUE1QixJQUFJLEdBQUosSUFBSTtBQUNWLE9BQU0sWUFBWSxHQUFHLE9BWG5CLE1BQU0sQ0FXb0IsQ0FBRSxNQUFNLEVBQUUsT0FBTyxDQUFFLENBQUMsQ0FBQTtTQUExQyxZQUFZLEdBQVosWUFBWTtBQUNsQixPQUFNLGVBQWUsR0FBRyxPQVp0QixNQUFNLENBWXVCLENBQUUsTUFBTSxFQUFFLHVCQUF1QixDQUFFLENBQUMsQ0FBQTtTQUE3RCxlQUFlLEdBQWYsZUFBZTtBQUNyQixPQUFNLFdBQVcsR0FBRyxPQWJsQixNQUFNLENBYW1CLENBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFFLENBQUMsQ0FBQTs7U0FBNUQsV0FBVyxHQUFYLFdBQVc7QUFFakIsT0FBTSxXQUFXLEdBQUcsT0FmbEIsTUFBTSxDQWdCZCxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsQ0FDckUsR0FBRyxFQUNILEdBQUcsRUFDSCxHQUFHLEVBQ0gsT0FBTyxFQUNQLFVBQVUsRUFDVixNQUFNLEVBQ04sV0FBVyxFQUNYLElBQUksRUFDSixPQUFPLEVBQ1AsS0FBSyxFQUNMLFFBQVEsQ0FDUixDQUFDLENBQUE7O1NBYlcsV0FBVyxHQUFYLFdBQVc7QUFleEIsT0FBTSxhQUFhLEdBQUcsT0E5QmIsTUFBTSxDQThCYyxDQUFFLEtBQUssRUFBRSxRQUFRLENBQUUsQ0FBQyxDQUFBOzs7QUFHMUMsT0FBTSxRQUFRLEdBQUcsT0FqQ2YsTUFBTSxDQWlDZ0IsQ0FBRSxRQUFRLENBQUUsRUFBRSxXQUFXLEVBQUUsYUFBYSxDQUFDLENBQUE7O1NBQTNELFFBQVEsR0FBUixRQUFRO0FBRWQsT0FBTSxVQUFVLEdBQUcsT0FuQ2pCLE1BQU0sQ0FtQ2tCLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQTs7U0FBM0QsVUFBVSxHQUFWLFVBQVU7QUFFaEIsT0FBTSxnQkFBZ0IsR0FBRyxPQXJDZixNQUFNLENBcUNnQixDQUN0QyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFDVixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFDVixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFDVixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFDWixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFDWixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFDWixDQUFDLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUE7O1NBUEwsZ0JBQWdCLEdBQWhCLGdCQUFnQjs7QUFVdEIsT0FBTSxTQUFTLEdBQUcsT0EvQ2hCLE1BQU0sQ0ErQ2lCLENBQy9CLE9BQU8sRUFDUCxTQUFTLEVBQ1QsTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEVBQ1gsVUFBVSxFQUNWLE1BQU0sRUFDTixNQUFNLEVBQ04sUUFBUSxFQUNSLFFBQVEsRUFDUixTQUFTLEVBQ1QsWUFBWSxFQUNaLGdCQUFnQixFQUNoQixRQUFRLEVBQ1IsUUFBUSxFQUNSLFFBQVEsRUFDUixhQUFhLEVBQ2IsV0FBVyxFQUNYLFVBQVUsRUFDVixXQUFXLEVBQ1gsb0JBQW9CLEVBQ3BCLFdBQVcsRUFDWCxvQkFBb0IsRUFDcEIsTUFBTSxFQUNOLFdBQVcsRUFDWCxRQUFRLEVBQ1IsZUFBZSxFQUNmLGNBQWMsRUFDZCxTQUFTLEVBQ1QsUUFBUSxFQUNSLGFBQWEsRUFDYixZQUFZOztBQUVaLFFBQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxDQUN2QixDQUFDLENBQUE7O1NBbkNXLFNBQVMsR0FBVCxTQUFTOzs7QUF1Q2YsT0FBTSxpQkFBaUIsR0FBRyxzQkFBc0IsQ0FBQTtTQUExQyxpQkFBaUIsR0FBakIsaUJBQWlCO0FBQ3ZCLE9BQU0sa0JBQWtCLEdBQUcsVUFBVSxDQUFBOztTQUEvQixrQkFBa0IsR0FBbEIsa0JBQWtCO0FBRXhCLE9BQU0sZUFBZSxHQUFHLFdBQVcsQ0FBQTs7U0FBN0IsZUFBZSxHQUFmLGVBQWU7QUFFckIsT0FBTSxhQUFhLEdBQUcsS0FBSyxDQUFBO1NBQXJCLGFBQWEsR0FBYixhQUFhIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL0xhbmcuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBuZXdTZXQsIG5ld01hcCB9IGZyb20gJy4vVS91dGlsJ1xuXG5jb25zdCBnID0gWyAnPH4nLCAnPH5+JyBdXG5leHBvcnQgY29uc3QgR2VuZXJhdG9yS2V5d29yZHMgPSBuZXdTZXQoZylcbmV4cG9ydCBjb25zdCBBc3NpZ25LZXl3b3JkcyA9IG5ld1NldChbICc9JywgJy4gJyBdLmNvbmNhdChnKSlcblxuZXhwb3J0IGNvbnN0IExpbmVTcGxpdEtleXdvcmRzID0gbmV3U2V0KEFzc2lnbktleXdvcmRzLCBbICctPicgXSlcblxuLy8gYGV4cG9ydGAgaXMgbm90IGEga2V5d29yZCwgYnV0IGAuIGAgYXNzaWducyBpbiBtb2R1bGUgY29udGV4dCBiZWNvbWUgZXhwb3J0cy5cbmV4cG9ydCBjb25zdCBLQXNzaWduID0gbmV3U2V0KEFzc2lnbktleXdvcmRzLCBbICdleHBvcnQnIF0pXG5leHBvcnQgY29uc3QgS0Z1biA9IG5ld1NldChbICd8JywgJ358JyBdKVxuZXhwb3J0IGNvbnN0IENhc2VLZXl3b3JkcyA9IG5ld1NldChbICdjYXNlJywgJ2Nhc2UhJyBdKVxuZXhwb3J0IGNvbnN0IFNwZWNpYWxLZXl3b3JkcyA9IG5ld1NldChbICd0aGlzJywgJ3RoaXMtbW9kdWxlLWRpcmVjdG9yeScgXSlcbmV4cG9ydCBjb25zdCBVc2VLZXl3b3JkcyA9IG5ld1NldChbICd1c2UhJywgJ3VzZScsICd1c2V+JywgJ3VzZS1kZWJ1ZycgXSlcblxuZXhwb3J0IGNvbnN0IEFsbEtleXdvcmRzID0gbmV3U2V0KFxuXHRMaW5lU3BsaXRLZXl3b3JkcywgS0Z1biwgQ2FzZUtleXdvcmRzLCBTcGVjaWFsS2V5d29yZHMsIFVzZUtleXdvcmRzLCBbXG5cdCd+Jyxcblx0JzonLFxuXHQnXycsXG5cdCdkZWJ1ZycsXG5cdCdkZWJ1Z2dlcicsXG5cdCdlbHNlJyxcblx0J2VuZC1sb29wIScsXG5cdCdpbicsXG5cdCdsb29wIScsXG5cdCdvdXQnLFxuXHQncmVnaW9uJ1xuXSlcblxuY29uc3QgUmVzZXJ2ZWROYW1lcyA9IG5ld1NldChbICdmb3InLCAncmV0dXJuJyBdKVxuXG4vLyBOYW1lcyB0aGF0IGFyZSBub3QgYWxsb3dlZCBpbiBhIE5hbWUgdG9rZW4uXG5leHBvcnQgY29uc3QgTm9uTmFtZXMgPSBuZXdTZXQoWyAncmVnaW9uJyBdLCBBbGxLZXl3b3JkcywgUmVzZXJ2ZWROYW1lcylcblxuZXhwb3J0IGNvbnN0IEdyb3VwS2luZHMgPSBuZXdTZXQoWycoJywgJ1snLCAneycsICctPicsICdsbicsICdzcCcsICdcIiddKVxuXG5leHBvcnQgY29uc3QgR3JvdXBPcGVuVG9DbG9zZSA9IG5ld01hcChbXG5cdFsnKCcsICcpJ10sXG5cdFsnWycsICddJ10sXG5cdFsneycsICd9J10sXG5cdFsnLT4nLCAnPC0nXSxcblx0WydsbicsICdsbiddLFxuXHRbJ3NwJywgJ3NwJ10sXG5cdFsnXCInLCAnY2xvc2VcIiddXSlcblxuLy8gVE9ETzogQWxsb3cgT3B0cyB0byBzcGVjaWZ5IGFkZGl0aW9uYWwgZ2xvYmFscy5cbmV4cG9ydCBjb25zdCBKc0dsb2JhbHMgPSBuZXdTZXQoW1xuXHQnQXJyYXknLFxuXHQnQm9vbGVhbicsXG5cdCdEYXRlJyxcblx0J0Vycm9yJyxcblx0J0V2YWxFcnJvcicsXG5cdCdGdW5jdGlvbicsXG5cdCdKU09OJyxcblx0J01hdGgnLFxuXHQnTnVtYmVyJyxcblx0J09iamVjdCcsXG5cdCdQcm9taXNlJyxcblx0J1JhbmdlRXJyb3InLFxuXHQnUmVmZXJlbmNlRXJyb3InLFxuXHQnUmVnRXhwJyxcblx0J1N0cmluZycsXG5cdCdTeW1ib2wnLFxuXHQnU3ludGF4RXJyb3InLFxuXHQnVHlwZUVycm9yJyxcblx0J1VSSUVycm9yJyxcblx0J2RlY29kZVVSSScsXG5cdCdkZWNvZGVVUklDb21wb25lbnQnLFxuXHQnZW5jb2RlVVJJJyxcblx0J2VuY29kZVVSSUNvbXBvbmVudCcsXG5cdCdldmFsJyxcblx0J3VuZGVmaW5lZCcsXG5cdCdCdWZmZXInLFxuXHQnY2xlYXJJbnRlcnZhbCcsXG5cdCdjbGVhclRpbWVvdXQnLFxuXHQnY29uc29sZScsXG5cdCdnbG9iYWwnLFxuXHQnc2V0SW50ZXJ2YWwnLFxuXHQnc2V0VGltZW91dCcsXG5cdC8vIE5vdCByZWFsbHkgZ2xvYmFscywgYnV0IGl0IHdvcmtzIG91dCB0aGF0IHdheS5cblx0J2ZhbHNlJywgJ3RydWUnLCAnbnVsbCdcbl0pXG5cbi8vIEFueXRoaW5nIG5vdCBleHBsaWNpdGx5IHJlc2VydmVkIGlzIGEgdmFsaWQgbmFtZSBjaGFyYWN0ZXIuXG4vLyBBIGB+YCBtYXkgYXBwZWFyIGluIGEgbmFtZSwgYnV0IG5vdCBhdCB0aGUgYmVnaW5uaW5nLlxuZXhwb3J0IGNvbnN0IE5vbk5hbWVDaGFyYWN0ZXJzID0gJygpW117fS46fF8gXFxuXFx0XCJgIzssJ1xuZXhwb3J0IGNvbnN0IFJlc2VydmVkQ2hhcmFjdGVycyA9ICdgOywlXiZcXFxcJ1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdExvb3BOYW1lID0gJ2Fub24tbG9vcCdcblxuZXhwb3J0IGNvbnN0IGZpbGVFeHRlbnNpb24gPSAnLm1zJ1xuIl0sInNvdXJjZVJvb3QiOiIvc3JjIn0=