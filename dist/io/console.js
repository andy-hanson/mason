"use strict";
if (typeof define !== "function") var define = require("amdefine")(module);
define([ "exports", "../Str-as-Seq", "../at/at", "../show", "../Str", "../Type/Type" ], function(exports, Str_45as_45Seq_0, _64_1, show_2, Str_3, Type_4) {
	exports._get = _ms.lazy(function() {
		_ms.getModule(Str_45as_45Seq_0);
		const _$4 = _ms.getModule(_64_1), each_33 = _ms.get(_$4, "each!"), show = _ms.getDefaultExport(show_2), Str = _ms.getDefaultExport(Str_3), _$7 = _ms.getModule(Type_4), _61_62 = _ms.get(_$7, "=>");
		const exports = { };
		const doc = exports.doc = "Funs that write to the console (also known as shell, command prompt, stdout/stderr).";
		const js_45console = global.console;
		const log_33 = exports["log!"] = function() {
			const doc = "Prints its arguments to the console, separated by spaces.\nAlways adds a newline at the end.";
			return _ms.set(function() {
				const args = [ ].slice.call(arguments, 0);
				return js_45console.log(_61_62(Str, args, " "))
			}, "doc", doc, "displayName", "log!")
		}();
		const warn_33 = exports["warn!"] = function() {
			const doc = "Like `log!`, but prints to stderr.";
			return _ms.set(function() {
				const args = [ ].slice.call(arguments, 0);
				return js_45console.warn(_61_62(Str, args, " "))
			}, "doc", doc, "displayName", "warn!")
		}();
		const dbg_33 = exports["dbg!"] = function() {
			const doc = "Show something for debugging.";
			return _ms.set(function() {
				const args = [ ].slice.call(arguments, 0);
				warn_33("-->");
				each_33(args, function(_) {
					return warn_33(show(_, function() {
						const repr = true;
						return {
							repr: repr
						}
					}()))
				});
				return warn_33("<--")
			}, "doc", doc, "displayName", "dbg!")
		}();
		const trace_33 = exports["trace!"] = function() {
			const doc = "Logs the current stacktrace.";
			return _ms.set(function() {
				const args = [ ].slice.call(arguments, 0);
				return js_45console.trace(_61_62(Str, args, " "))
			}, "doc", doc, "displayName", "trace!")
		}();
		const displayName = exports.displayName = "console";
		return exports
	})
})
//# sourceMappingURL=../io/console.js.map