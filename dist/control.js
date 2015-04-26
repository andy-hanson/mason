"use strict";
if ((typeof define !== "function")) var define = require("amdefine")(module);
define([ "exports", "./Bool", "./Fun", "./js", "./methods", "./Objbang", "./Type/Pred-Type", "./Type/Wrap-Type", "./at/at-Type", "./at/q", "./at/Map/Map", "./at/Seq/Arraybang", "./at/Seq/Seq", "./at/Seq/Seqbang", "./Try", "./bang", "./compare", "./math/methods" ], function(exports, Bool_0, Fun_1, js_2, methods_3, Obj_33_4, Pred_45Type_5, Wrap_45Type_6, _64_45Type_7, _63_8, Map_9, Array_33_10, Seq_11, Seq_33_12, Try_13, _33_14, compare_15, methods_16) {
	exports._get = _ms.lazy(function() {
		const Bool = _ms.getDefaultExport(Bool_0), Fun = _ms.getDefaultExport(Fun_1), _$3 = _ms.getModule(Fun_1), Act = _ms.get(_$3, "Act"), _$4 = _ms.getModule(js_2), defined_63 = _ms.get(_$4, "defined?"), _$5 = _ms.getModule(methods_3), freeze = _ms.get(_$5, "freeze"), _$6 = _ms.getModule(Obj_33_4), p_33 = _ms.get(_$6, "p!"), _$7 = _ms.getModule(Pred_45Type_5), Any = _ms.get(_$7, "Any"), Opt = _ms.get(_$7, "Opt"), Wrap_45Type = _ms.getDefaultExport(Wrap_45Type_6), _$10 = _ms.lazyGetModule(_64_45Type_7), empty = _ms.lazyProp(_$10, "empty"), _63 = _ms.lazy(function() {
			return _ms.getDefaultExport(_63_8)
		}), _$11 = _ms.lazyGetModule(_63_8), _63_45or = _ms.lazyProp(_$11, "?-or"), Map = _ms.lazy(function() {
			return _ms.getDefaultExport(Map_9)
		}), _$12 = _ms.lazyGetModule(Map_9), _63get = _ms.lazyProp(_$12, "?get"), Array_33 = _ms.lazy(function() {
			return _ms.getDefaultExport(Array_33_10)
		}), Seq = _ms.lazy(function() {
			return _ms.getDefaultExport(Seq_11)
		}), _$15 = _ms.lazyGetModule(Seq_33_12), _43_43_62_33 = _ms.lazyProp(_$15, "++>!"), _$16 = _ms.lazyGetModule(Try_13), oh_45no_33 = _ms.lazyProp(_$16, "oh-no!"), _33 = _ms.lazy(function() {
			return _ms.getDefaultExport(_33_14)
		}), _$18 = _ms.lazyGetModule(_33_14), _33call = _ms.lazyProp(_$18, "!call"), _$19 = _ms.lazyGetModule(compare_15), _61_63 = _ms.lazyProp(_$19, "=?"), _$20 = _ms.lazyGetModule(methods_16), _43 = _ms.lazyProp(_$20, "+");
		const exports = { };
		const opr = exports.opr = function() {
			const doc = "Fills in an Opt with a default value.";
			const test = function() {
				const _k0 = [ undefined, 1 ], _v0 = 1;
				const _k1 = [ 1, 2 ], _v1 = 1;
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(_, _default) {
				_ms.checkContains(Opt, _, "_");
				return function() {
					switch (true) {
						case _ms.bool(defined_63(_)): {
							return _
						}
						default: {
							return _ms.unlazy(_default)
						}
					}
				}()
			}, "doc", doc, "test", test, "displayName", "opr")
		}();
		const build = exports.build = function() {
			const doc = "Passes in a `yield` function to `calls-yield`.\nReturns a Seq of what `calls-yield` called `yield` with.";
			const test = function() {
				return _ms.unlazy(_33)(_ms.unlazy(_61_63), [ 0, 1 ], build(function(_yield) {
					_yield(0);
					return _yield(1)
				}))
			};
			return _ms.set(function(calls_45yield) {
				_ms.checkContains(Fun, calls_45yield, "calls-yield");
				const yielded = _ms.unlazy(empty)(_ms.unlazy(Array_33));
				const _yield = function(_) {
					return _ms.unlazy(_43_43_62_33)(yielded, [ _ ])
				};
				calls_45yield(_yield);
				return _ms.checkContains(_ms.unlazy(Seq), freeze(yielded), "res")
			}, "doc", doc, "test", test, "displayName", "build")
		}();
		const _switch = exports.switch = function() {
			const doc = "Calls the Fun that `cases` associates with `val`.";
			const test = function() {
				const n = function(x) {
					return _switch(x, function() {
						const _k0 = 1, _v0 = function() {
							return "one"
						};
						const _k1 = 2, _v1 = function() {
							return "two"
						};
						const _k2 = switch_45else, _v2 = function() {
							return "three"
						};
						return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2)
					}())
				};
				return _ms.unlazy(_33call)(n, function() {
					const _k0 = [ 1 ], _v0 = "one";
					const _k1 = [ 2 ], _v1 = "two";
					const _k2 = [ 3 ], _v2 = "three";
					return _ms.map(_k0, _v0, _k1, _v1, _k2, _v2)
				}())
			};
			return _ms.set(function(val, cases) {
				_ms.checkContains(Any, val, "val");
				_ms.checkContains(_ms.sub(_ms.unlazy(Map), Any, Fun), cases, "cases");
				const dispatch = _ms.checkContains(Fun, _ms.unlazy(_63_45or)(_ms.unlazy(_63get)(cases, val), _ms.lazy(function() {
					return _ms.sub(cases, switch_45else)
				})), "dispatch");
				return dispatch()
			}, "doc", doc, "test", test, "displayName", "switch")
		}();
		const switch_45else = exports["switch-else"] = function() {
			const doc = "Special object used as default for `switch` statements.";
			return {
				doc: doc,
				displayName: "switch-else"
			}
		}();
		const _if = exports.if = function() {
			const doc = "Iff `condition`, evaluates `result` and puts it in a `?`.";
			const test = function() {
				const _k0 = [ true, 1 ], _v0 = _ms.unlazy(_63)(1);
				const _k1 = [ false, 1 ], _v1 = _ms.unlazy(empty)(_ms.unlazy(_63));
				return _ms.map(_k0, _v0, _k1, _v1)
			};
			return _ms.set(function(condition, result) {
				_ms.checkContains(Bool, condition, "condition");
				return _ms.checkContains(_ms.unlazy(_63), function() {
					switch (true) {
						case _ms.bool(condition): {
							return _ms.unlazy(_63)(_ms.unlazy(result))
						}
						default: {
							return _ms.unlazy(empty)(_ms.unlazy(_63))
						}
					}
				}(), "res")
			}, "doc", doc, "test", test, "displayName", "if")
		}();
		const if_33 = exports["if!"] = function() {
			const doc = "Runs `result` iff `condition`.";
			const test = function() {
				_ms.unlazy(_33)(_ms.unlazy(_61_63), [ 0 ], build(function(_yield) {
					return if_33(true, function() {
						return _yield(0)
					})
				}));
				return if_33(false, _ms.unlazy(oh_45no_33))
			};
			return _ms.set(function(condition, result) {
				_ms.checkContains(Bool, condition, "condition");
				_ms.checkContains(Act, result, "result");
				switch (true) {
					case _ms.bool(condition):
						{
							result()
						};
						break
					default: {
						null
					}
				}
			}, "doc", doc, "test", test, "displayName", "if!")
		}();
		const unreachable_33 = exports["unreachable!"] = function() {
			const doc = "Call this to mark code as unreachable.";
			return _ms.set(function() {
				return _ms.unlazy(oh_45no_33)("This should not be reachable.")
			}, "doc", doc, "displayName", "unreachable!")
		}();
		const TODO = exports.TODO = function() {
			const doc = "Placeholder for something which you really ought to implement one of these days.";
			return _ms.set(function() {
				return _ms.unlazy(oh_45no_33)("This function has not yet been implemented.")
			}, "doc", doc, "displayName", "TODO")
		}();
		const returning = exports.returning = function() {
			const doc = "Calls `do-after` and returns `returned`.";
			const test = function() {
				return _ms.unlazy(_33)(_ms.unlazy(_61_63), [ 0 ], build(function(_yield) {
					return _ms.unlazy(_33)(_ms.unlazy(_61_63), 1, returning(1, function() {
						return _yield(0)
					}))
				}))
			};
			return _ms.set(function(returned, do_45after) {
				_ms.checkContains(Any, returned, "returned");
				_ms.checkContains(Fun, do_45after, "do-after");
				do_45after(returned);
				return returned
			}, "doc", doc, "test", test, "displayName", "returning")
		}();
		const loop = exports.loop = function() {
			const doc = "Maintains a value representing state, and continually applies `transform-state` to it until that returns an End-Loop.\nReturns the value inside that End-Loop.";
			const test = function() {
				const f = function(_) {
					return function() {
						switch (true) {
							case _ms.bool(_ms.unlazy(_61_63)(_, 10)): {
								return End_45Loop("end")
							}
							default: {
								return _ms.unlazy(_43)(_, 1)
							}
						}
					}()
				};
				const _k0 = [ 0, f ], _v0 = "end";
				return _ms.map(_k0, _v0)
			};
			return _ms.set(function(init_45state, transform_45state) {
				_ms.checkContains(Fun, transform_45state, "transform-state");
				const state = Ref_33(init_45state);
				const output = Ref_33(null);
				loop131: while (true) {
					{
						const _ = transform_45state(get(state));
						switch (true) {
							case _ms.bool(_ms.contains(End_45Loop, _)):
								{
									set_33(output, _.val);
									break loop131
								};
								break
							default: {
								set_33(state, _)
							}
						}
					}
				};
				return get(output)
			}, "doc", doc, "test", test, "displayName", "loop")
		}();
		const End_45Loop = exports["End-Loop"] = Wrap_45Type(function() {
			const doc = "Wrap a value in this to indicate that you want this to be the return value of the loop.";
			return {
				doc: doc,
				displayName: "End-Loop"
			}
		}());
		const Ref_33 = exports["Ref!"] = Wrap_45Type(function() {
			const doc = "Mutable holder of some value.\nCreate a Ref! by passing in the initial value.\nChange this at any time with `set!`.\nUse `get` at any time to get the current value.";
			return {
				doc: doc,
				displayName: "Ref!"
			}
		}());
		const set_33 = exports["set!"] = function() {
			const doc = "Change the current value.";
			const test = function() {
				const _ = Ref_33(null);
				set_33(_, 0);
				return _ms.unlazy(_33)(_ms.unlazy(_61_63), get(_), 0)
			};
			return _ms.set(function(_, new_45value) {
				_ms.checkContains(Ref_33, _, "_");
				return p_33(_, "val", new_45value)
			}, "doc", doc, "test", test, "displayName", "set!")
		}();
		const mod_33 = exports["mod!"] = function() {
			const doc = "Gets the value, changes it, and sets it.";
			const test = function() {
				const _ = Ref_33(0);
				mod_33(_, _ms.sub(_ms.unlazy(_43), 1));
				return _ms.unlazy(_33)(_ms.unlazy(_61_63), get(_), 1)
			};
			return _ms.set(function(_, f) {
				_ms.checkContains(Ref_33, _, "_");
				_ms.checkContains(Fun, f, "f");
				return set_33(_, f(get(_)))
			}, "doc", doc, "test", test, "displayName", "mod!")
		}();
		const get = exports.get = function() {
			const doc = "Current value.";
			const test = function() {
				const _k0 = [ Ref_33(0) ], _v0 = 0;
				return _ms.map(_k0, _v0)
			};
			return _ms.set(function(_) {
				_ms.checkContains(Ref_33, _, "_");
				return _.val
			}, "doc", doc, "test", test, "displayName", "get")
		}();
		const displayName = exports.displayName = "control";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9jb250cm9sLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztvQ0FxQkE7QUFBQTs7Ozs7Ozs7Ozs7O0VBQUEscUNBQUk7QUFBQSxHQUNILFlBQU07QUFBQSxHQUNOLGFBQU8sV0FDTjtBQUFBLElBQUEsWUFBQSxFQUFBLFdBQVksV0FBTztBQUFBLElBQ25CLFlBQUEsRUFBRSxHQUFFLFdBQU87QUFBQTs7a0JBQ1gsU0FBQSxHQUFNLFVBQ047QUFBQSxzQkFERTs7O01BRUQsY0FBQSxXQUFBLEtBQ0M7QUFBQSxjQUFBO0FBQUE7QUFBQSxlQUVBO0FBQUEseUJBTEk7QUFBQTtBQUFBO0FBQUE7QUFBQTs7RUFPUix5Q0FBTTtBQUFBLEdBQ0wsWUFDQztBQUFBLEdBQ0QsYUFBTyxXQUNOO0FBQUEsK0NBQUssRUFBRSxHQUFFLEtBQUksTUFBUSxTQUFBLFFBQ3BCO0FBQUEsS0FBQSxPQUFNO0FBQUEsWUFDTixPQUFNO0FBQUE7QUFBQTtBQUFBLGtCQUNQLFNBQUssZUFDTDtBQUFBLHNCQURpQjtJQUNqQjtJQUNBLGVBQVMsU0FBQSxHQUNSO0FBQUEscUNBQUEsU0FBYSxFQUFFO0FBQUE7QUFBQSxJQUNoQixjQUFBO0FBQUEsOENBQ0EsT0FBQTs7O0VBR0QsNENBQU87QUFBQSxHQUNOLFlBQU07QUFBQSxHQUNOLGFBQU8sV0FDTjtBQUFBLElBQUEsVUFBSyxTQUFBLEdBQ0o7QUFBQSxZQUFBLFFBQUEsY0FBUTtBQUFBLE1BQ1AsWUFBQSxTQUFNLFdBQ0w7QUFBQSxjQUFDO0FBQUE7QUFBQSxNQUNGLFlBQUEsU0FBTSxXQUNMO0FBQUEsY0FBQztBQUFBO0FBQUEsTUFDRixZQUFBLHFCQUFnQixXQUNmO0FBQUEsY0FBQztBQUFBO0FBQUE7OzsrQkFDSixjQUFPO0FBQUEsS0FDTixZQUFBLEVBQUUsV0FBUTtBQUFBLEtBQ1YsWUFBQSxFQUFFLFdBQVE7QUFBQSxLQUNWLFlBQUEsRUFBRSxXQUFRO0FBQUE7OztrQkFDWCxTQUFBLEtBQVEsT0FDUjtBQUFBLHNCQURJOytDQUFhLEtBQUE7SUFDakIsbUNBQVMsNkNBQVcsT0FBQTtvQkFBa0IsT0FBSztBQUFBO1dBQzNDO0FBQUE7O0VBQ0YsMERBQVk7QUFBQSxHQUNYLFlBQU07QUFBQSxVQURLO0FBQUE7Ozs7RUFHWixvQ0FBRztBQUFBLEdBQ0YsWUFBTTtBQUFBLEdBQ04sYUFBTyxXQUNOO0FBQUEsSUFBQSxZQUFBLEVBQUEsTUFBTywyQkFBUztBQUFBLElBQ2hCLFlBQUEsRUFBQSxPQUFROzs7a0JBQ1IsU0FBRyxXQUFlLFFBQ2xCO0FBQUEsc0JBRGE7OztNQUVaLGNBQUEsWUFDQztBQUFBLHlDQUhnQjtBQUFBO0FBQUEsZUFLaEI7QUFBQTs7Ozs7O0VBRUosMENBQUk7QUFBQSxHQUNILFlBQU07QUFBQSxHQUNOLGFBQU8sV0FDTjtBQUFBLHdDQUFLLEVBQUUsS0FBSSxNQUFRLFNBQUEsUUFDbEI7QUFBQSxZQUFBLE1BQUEsTUFBVSxXQUNUO0FBQUEsYUFBQSxPQUFNO0FBQUE7QUFBQTtBQUFBLFdBQ1IsTUFBQTs7a0JBQ0EsU0FBQSxXQUFlLFFBQ2Y7QUFBQSxzQkFEVTtzQkFBWTtJQUNqQjtLQUNKLGNBQUE7QUFBQSxNQUNDO0FBQUEsT0FBQTtBQUFBO0FBQUE7Y0FFQTtBQUFBLE1BQUE7QUFBQTtBQUFBO0FBQUE7O0VBRUwsNERBQWE7QUFBQSxHQUNaLFlBQU07QUFBQSxrQkFDTCxXQUNBO0FBQUEsa0NBQVE7QUFBQTs7RUFFVix1Q0FBSztBQUFBLEdBQ0osWUFBTTtBQUFBLGtCQUNMLFdBQ0E7QUFBQSxrQ0FBUTtBQUFBOztFQUVWLGlEQUFVO0FBQUEsR0FDVCxZQUFNO0FBQUEsR0FDTixhQUFPLFdBQ047QUFBQSwrQ0FBSyxFQUFFLEtBQUksTUFBUSxTQUFBLFFBQ2xCO0FBQUEsZ0RBQUssR0FBRSxVQUFXLEdBQUcsV0FDcEI7QUFBQSxhQUFBLE9BQU07QUFBQTtBQUFBO0FBQUE7QUFBQSxrQkFDUixTQUFBLFVBQWEsWUFDYjtBQUFBLHNCQURTO3NCQUFhO0lBQ3RCLFdBQUE7QUFBQSxXQUNBO0FBQUE7O0VBR0QsdUNBQUs7QUFBQSxHQUNKLFlBQ0M7QUFBQSxHQUNELGFBQU8sV0FDTjtBQUFBLElBQUEsVUFBSyxTQUFBLEdBQUE7QUFBQTs7T0FDSixpQ0FBRyxHQUFFLE1BQ0o7QUFBQSxlQUFBLFdBQVU7QUFBQTtBQUFBLGdCQUVWO0FBQUEsK0JBQUUsR0FBRTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFDTixZQUFBLEVBQUUsR0FBRixXQUFZO0FBQUE7O2tCQUVaLFNBQUEsY0FBVyxtQkFDWDtBQUFBLHNCQUQyQjtJQUMzQixjQUFRLE9BQUE7QUFBQSxJQUNSLGVBQVMsT0FBSztBQUFBLDBCQUViO0FBQUEsS0FBTTtBQUFBLE1BQUEsVUFBQSxrQkFBZ0IsSUFBQTtBQUFBO09BQ3JCLDJCQUFDLFlBQUQ7QUFBQSxRQUNDO0FBQUEsU0FBQSxPQUFBLFFBQVk7U0FDWjs7O2dCQUVBO0FBQUEsUUFBQSxPQUFBLE9BQVc7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBQ2QsSUFBQTtBQUFBOztFQUVGLHlDQUFVLHVCQUFTO0FBQUEsR0FDbEIsWUFBTTtBQUFBLFVBRFk7QUFBQTs7OztFQUluQixpQ0FBTSx1QkFBUztBQUFBLEdBQ2QsWUFDQztBQUFBLFVBRmE7QUFBQTs7OztFQUdmLDRDQUFLO0FBQUEsR0FDSixZQUFNO0FBQUEsR0FDTixhQUFPLFdBQ047QUFBQSxJQUFBLFVBQUksT0FBSztBQUFBLElBQ1QsT0FBSyxHQUFFO0FBQUEsK0NBQ1AsSUFBSyxJQUFLO0FBQUE7QUFBQSxrQkFDVixTQUFBLEdBQU8sYUFDUDtBQUFBLHNCQURFO1dBQ0YsS0FBRyxHQUFHLE9BQU47QUFBQTs7RUFFRiw0Q0FBSztBQUFBLEdBQ0osWUFBTTtBQUFBLEdBQ04sYUFBTyxXQUNOO0FBQUEsSUFBQSxVQUFJLE9BQUs7QUFBQSxJQUNULE9BQUssNEJBQUk7QUFBQSwrQ0FDVCxJQUFLLElBQUs7QUFBQTtBQUFBLGtCQUNWLFNBQUEsR0FBTyxHQUNQO0FBQUEsc0JBREU7c0JBQU87V0FDVCxPQUFLLEdBQUUsRUFBQSxJQUFHO0FBQUE7O0VBRVoscUNBQUk7QUFBQSxHQUNILFlBQU07QUFBQSxHQUNOLGFBQU8sV0FDTjtBQUFBLElBQUEsWUFBQSxFQUFFLE9BQU0sWUFBUTtBQUFBOztrQkFDaEIsU0FBQSxHQUNBO0FBQUEsc0JBREU7V0FDRjs7O0VBektILDBDQUFBO0FBQUEiLCJmaWxlIjoiY29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9