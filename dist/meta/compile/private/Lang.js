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
	const ReservedWords = _UUtil.newSet(['for', 'return']);

	exports.ReservedWords = ReservedWords;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL0xhbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUVBLE9BQU0sQ0FBQyxHQUFHLENBQUUsSUFBSSxFQUFFLEtBQUssQ0FBRSxDQUFBO0FBQ2xCLE9BQU0saUJBQWlCLEdBQUcsT0FIeEIsTUFBTSxDQUd5QixDQUFDLENBQUMsQ0FBQTtTQUE3QixpQkFBaUIsR0FBakIsaUJBQWlCO0FBQ3ZCLE9BQU0sY0FBYyxHQUFHLE9BSnJCLE1BQU0sQ0FJc0IsQ0FBRSxHQUFHLEVBQUUsSUFBSSxDQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7O1NBQWhELGNBQWMsR0FBZCxjQUFjO0FBRXBCLE9BQU0saUJBQWlCLEdBQUcsT0FOeEIsTUFBTSxDQU15QixjQUFjLEVBQUUsQ0FBRSxJQUFJLENBQUUsQ0FBQyxDQUFBOztTQUFwRCxpQkFBaUIsR0FBakIsaUJBQWlCOztBQUd2QixPQUFNLE9BQU8sR0FBRyxPQVRkLE1BQU0sQ0FTZSxjQUFjLEVBQUUsQ0FBRSxRQUFRLENBQUUsQ0FBQyxDQUFBO1NBQTlDLE9BQU8sR0FBUCxPQUFPO0FBQ2IsT0FBTSxJQUFJLEdBQUcsT0FWWCxNQUFNLENBVVksQ0FBRSxHQUFHLEVBQUUsSUFBSSxDQUFFLENBQUMsQ0FBQTtTQUE1QixJQUFJLEdBQUosSUFBSTtBQUNWLE9BQU0sWUFBWSxHQUFHLE9BWG5CLE1BQU0sQ0FXb0IsQ0FBRSxNQUFNLEVBQUUsT0FBTyxDQUFFLENBQUMsQ0FBQTtTQUExQyxZQUFZLEdBQVosWUFBWTtBQUNsQixPQUFNLGVBQWUsR0FBRyxPQVp0QixNQUFNLENBWXVCLENBQUUsTUFBTSxFQUFFLHVCQUF1QixDQUFFLENBQUMsQ0FBQTtTQUE3RCxlQUFlLEdBQWYsZUFBZTtBQUNyQixPQUFNLFdBQVcsR0FBRyxPQWJsQixNQUFNLENBYW1CLENBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFFLENBQUMsQ0FBQTs7U0FBNUQsV0FBVyxHQUFYLFdBQVc7QUFFakIsT0FBTSxXQUFXLEdBQUcsT0FmbEIsTUFBTSxDQWdCZCxpQkFBaUIsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsQ0FDckUsR0FBRyxFQUNILEdBQUcsRUFDSCxHQUFHLEVBQ0gsT0FBTyxFQUNQLFVBQVUsRUFDVixNQUFNLEVBQ04sV0FBVyxFQUNYLElBQUksRUFDSixPQUFPLEVBQ1AsS0FBSyxFQUNMLFFBQVEsQ0FDUixDQUFDLENBQUE7O1NBYlcsV0FBVyxHQUFYLFdBQVc7QUFlakIsT0FBTSxhQUFhLEdBQUcsT0E5QnBCLE1BQU0sQ0E4QnFCLENBQUUsS0FBSyxFQUFFLFFBQVEsQ0FBRSxDQUFDLENBQUE7O1NBQTNDLGFBQWEsR0FBYixhQUFhO0FBRW5CLE9BQU0sVUFBVSxHQUFHLE9BaENqQixNQUFNLENBZ0NrQixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUE7O1NBQTNELFVBQVUsR0FBVixVQUFVO0FBRWhCLE9BQU0sZ0JBQWdCLEdBQUcsT0FsQ2YsTUFBTSxDQWtDZ0IsQ0FDdEMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQ1YsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQ1YsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQ1YsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQ1osQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQ1osQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQ1osQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFBOztTQVBMLGdCQUFnQixHQUFoQixnQkFBZ0I7O0FBVXRCLE9BQU0sU0FBUyxHQUFHLE9BNUNoQixNQUFNLENBNENpQixDQUMvQixPQUFPLEVBQ1AsU0FBUyxFQUNULE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxFQUNYLFVBQVUsRUFDVixNQUFNLEVBQ04sTUFBTSxFQUNOLFFBQVEsRUFDUixRQUFRLEVBQ1IsU0FBUyxFQUNULFlBQVksRUFDWixnQkFBZ0IsRUFDaEIsUUFBUSxFQUNSLFFBQVEsRUFDUixRQUFRLEVBQ1IsYUFBYSxFQUNiLFdBQVcsRUFDWCxVQUFVLEVBQ1YsV0FBVyxFQUNYLG9CQUFvQixFQUNwQixXQUFXLEVBQ1gsb0JBQW9CLEVBQ3BCLE1BQU0sRUFDTixXQUFXLEVBQ1gsUUFBUSxFQUNSLGVBQWUsRUFDZixjQUFjLEVBQ2QsU0FBUyxFQUNULFFBQVEsRUFDUixhQUFhLEVBQ2IsWUFBWTs7QUFFWixRQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sQ0FDdkIsQ0FBQyxDQUFBOztTQW5DVyxTQUFTLEdBQVQsU0FBUzs7O0FBdUNmLE9BQU0saUJBQWlCLEdBQUcsc0JBQXNCLENBQUE7U0FBMUMsaUJBQWlCLEdBQWpCLGlCQUFpQjtBQUN2QixPQUFNLGtCQUFrQixHQUFHLFVBQVUsQ0FBQTs7U0FBL0Isa0JBQWtCLEdBQWxCLGtCQUFrQjtBQUV4QixPQUFNLGVBQWUsR0FBRyxXQUFXLENBQUE7O1NBQTdCLGVBQWUsR0FBZixlQUFlO0FBRXJCLE9BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQTtTQUFyQixhQUFhLEdBQWIsYUFBYSIsImZpbGUiOiJtZXRhL2NvbXBpbGUvcHJpdmF0ZS9MYW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbmV3U2V0LCBuZXdNYXAgfSBmcm9tICcuL1UvdXRpbCdcblxuY29uc3QgZyA9IFsgJzx+JywgJzx+ficgXVxuZXhwb3J0IGNvbnN0IEdlbmVyYXRvcktleXdvcmRzID0gbmV3U2V0KGcpXG5leHBvcnQgY29uc3QgQXNzaWduS2V5d29yZHMgPSBuZXdTZXQoWyAnPScsICcuICcgXS5jb25jYXQoZykpXG5cbmV4cG9ydCBjb25zdCBMaW5lU3BsaXRLZXl3b3JkcyA9IG5ld1NldChBc3NpZ25LZXl3b3JkcywgWyAnLT4nIF0pXG5cbi8vIGBleHBvcnRgIGlzIG5vdCBhIGtleXdvcmQsIGJ1dCBgLiBgIGFzc2lnbnMgaW4gbW9kdWxlIGNvbnRleHQgYmVjb21lIGV4cG9ydHMuXG5leHBvcnQgY29uc3QgS0Fzc2lnbiA9IG5ld1NldChBc3NpZ25LZXl3b3JkcywgWyAnZXhwb3J0JyBdKVxuZXhwb3J0IGNvbnN0IEtGdW4gPSBuZXdTZXQoWyAnfCcsICd+fCcgXSlcbmV4cG9ydCBjb25zdCBDYXNlS2V5d29yZHMgPSBuZXdTZXQoWyAnY2FzZScsICdjYXNlIScgXSlcbmV4cG9ydCBjb25zdCBTcGVjaWFsS2V5d29yZHMgPSBuZXdTZXQoWyAndGhpcycsICd0aGlzLW1vZHVsZS1kaXJlY3RvcnknIF0pXG5leHBvcnQgY29uc3QgVXNlS2V5d29yZHMgPSBuZXdTZXQoWyAndXNlIScsICd1c2UnLCAndXNlficsICd1c2UtZGVidWcnIF0pXG5cbmV4cG9ydCBjb25zdCBBbGxLZXl3b3JkcyA9IG5ld1NldChcblx0TGluZVNwbGl0S2V5d29yZHMsIEtGdW4sIENhc2VLZXl3b3JkcywgU3BlY2lhbEtleXdvcmRzLCBVc2VLZXl3b3JkcywgW1xuXHQnficsXG5cdCc6Jyxcblx0J18nLFxuXHQnZGVidWcnLFxuXHQnZGVidWdnZXInLFxuXHQnZWxzZScsXG5cdCdlbmQtbG9vcCEnLFxuXHQnaW4nLFxuXHQnbG9vcCEnLFxuXHQnb3V0Jyxcblx0J3JlZ2lvbidcbl0pXG5cbmV4cG9ydCBjb25zdCBSZXNlcnZlZFdvcmRzID0gbmV3U2V0KFsgJ2ZvcicsICdyZXR1cm4nIF0pXG5cbmV4cG9ydCBjb25zdCBHcm91cEtpbmRzID0gbmV3U2V0KFsnKCcsICdbJywgJ3snLCAnLT4nLCAnbG4nLCAnc3AnLCAnXCInXSlcblxuZXhwb3J0IGNvbnN0IEdyb3VwT3BlblRvQ2xvc2UgPSBuZXdNYXAoW1xuXHRbJygnLCAnKSddLFxuXHRbJ1snLCAnXSddLFxuXHRbJ3snLCAnfSddLFxuXHRbJy0+JywgJzwtJ10sXG5cdFsnbG4nLCAnbG4nXSxcblx0WydzcCcsICdzcCddLFxuXHRbJ1wiJywgJ2Nsb3NlXCInXV0pXG5cbi8vIFRPRE86IEFsbG93IE9wdHMgdG8gc3BlY2lmeSBhZGRpdGlvbmFsIGdsb2JhbHMuXG5leHBvcnQgY29uc3QgSnNHbG9iYWxzID0gbmV3U2V0KFtcblx0J0FycmF5Jyxcblx0J0Jvb2xlYW4nLFxuXHQnRGF0ZScsXG5cdCdFcnJvcicsXG5cdCdFdmFsRXJyb3InLFxuXHQnRnVuY3Rpb24nLFxuXHQnSlNPTicsXG5cdCdNYXRoJyxcblx0J051bWJlcicsXG5cdCdPYmplY3QnLFxuXHQnUHJvbWlzZScsXG5cdCdSYW5nZUVycm9yJyxcblx0J1JlZmVyZW5jZUVycm9yJyxcblx0J1JlZ0V4cCcsXG5cdCdTdHJpbmcnLFxuXHQnU3ltYm9sJyxcblx0J1N5bnRheEVycm9yJyxcblx0J1R5cGVFcnJvcicsXG5cdCdVUklFcnJvcicsXG5cdCdkZWNvZGVVUkknLFxuXHQnZGVjb2RlVVJJQ29tcG9uZW50Jyxcblx0J2VuY29kZVVSSScsXG5cdCdlbmNvZGVVUklDb21wb25lbnQnLFxuXHQnZXZhbCcsXG5cdCd1bmRlZmluZWQnLFxuXHQnQnVmZmVyJyxcblx0J2NsZWFySW50ZXJ2YWwnLFxuXHQnY2xlYXJUaW1lb3V0Jyxcblx0J2NvbnNvbGUnLFxuXHQnZ2xvYmFsJyxcblx0J3NldEludGVydmFsJyxcblx0J3NldFRpbWVvdXQnLFxuXHQvLyBOb3QgcmVhbGx5IGdsb2JhbHMsIGJ1dCBpdCB3b3JrcyBvdXQgdGhhdCB3YXkuXG5cdCdmYWxzZScsICd0cnVlJywgJ251bGwnXG5dKVxuXG4vLyBBbnl0aGluZyBub3QgZXhwbGljaXRseSByZXNlcnZlZCBpcyBhIHZhbGlkIG5hbWUgY2hhcmFjdGVyLlxuLy8gQSBgfmAgbWF5IGFwcGVhciBpbiBhIG5hbWUsIGJ1dCBub3QgYXQgdGhlIGJlZ2lubmluZy5cbmV4cG9ydCBjb25zdCBOb25OYW1lQ2hhcmFjdGVycyA9ICcoKVtde30uOnxfIFxcblxcdFwiYCM7LCdcbmV4cG9ydCBjb25zdCBSZXNlcnZlZENoYXJhY3RlcnMgPSAnYDssJV4mXFxcXCdcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRMb29wTmFtZSA9ICdhbm9uLWxvb3AnXG5cbmV4cG9ydCBjb25zdCBmaWxlRXh0ZW5zaW9uID0gJy5tcydcbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9