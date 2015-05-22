"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at-Type","./at/q","./cash","./Boolean","./compare","./Function","./js","./private/js-impl","./Objectbang","./Type/Method","./Type/Obj-Type","./Type/Kind","./Type/Pred-Type","./Type/Type","./Type/Wrap-Type","./bang","./control","./Function","./cash"],function(exports,_64_45Type_0,_63_1,$_2,Boolean_3,compare_4,Function_5,js_6,js_45impl_7,Object_33_8,Method_9,Obj_45Type_10,Kind_11,Pred_45Type_12,Type_13,Wrap_45Type_14,_33_15,control_16,Function_17,$_18){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(_64_45Type_0),empty=_ms.get(_$2,"empty"),_63=_ms.getDefaultExport(_63_1),$=_ms.getDefaultExport($_2),_$4=_ms.getModule($_2),$after=_ms.get(_$4,"$after"),_$5=_ms.getModule(Boolean_3),and=_ms.get(_$5,"and"),_$6=_ms.getModule(compare_4),_61_63=_ms.get(_$6,"=?"),_$7=_ms.getModule(Function_5),Action=_ms.get(_$7,"Action"),_$8=_ms.getModule(js_6),_new=_ms.get(_$8,"new"),_$9=_ms.getModule(js_45impl_7),makeError=_ms.get(_$9,"makeError"),alwaysDoAfter=_ms.get(_$9,"alwaysDoAfter"),ohNo=_ms.get(_$9,"ohNo"),iTry=_ms.get(_$9,"iTry"),_$10=_ms.getModule(Object_33_8),p_33=_ms.get(_$10,"p!"),_$11=_ms.getModule(Method_9),self_45impl_33=_ms.get(_$11,"self-impl!"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_10),Kind=_ms.getDefaultExport(Kind_11),_$14=_ms.getModule(Pred_45Type_12),Any=_ms.get(_$14,"Any"),Union=_ms.get(_$14,"Union"),Type=_ms.getDefaultExport(Type_13),_$15=_ms.getModule(Type_13),contains_63=_ms.get(_$15,"contains?"),_61_62=_ms.get(_$15,"=>"),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_14),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_15)
		}),_$18=_ms.lazyGetModule(_33_15),_33not=_ms.lazyProp(_$18,"!not"),_$19=_ms.lazyGetModule(control_16),build=_ms.lazyProp(_$19,"build"),_$20=_ms.lazyGetModule(Function_17),thunk=_ms.lazyProp(_$20,"thunk"),_$21=_ms.lazyGetModule($_18),$rejected=_ms.lazyProp(_$21,"$rejected"),$resolved=_ms.lazyProp(_$21,"$resolved");
		const Success=exports.Success=Wrap_45Type(function(){
			const doc="Attempt that did not fail. _.val is the result of the attempted code.";
			return {
				doc:doc,
				name:"Success"
			}
		}());
		const Try=Kind(function(){
			const doc="Result of running failable code. Success or Error.";
			const implementors=[Success,Error];
			return {
				doc:doc,
				implementors:implementors,
				name:"Try"
			}
		}());
		self_45impl_33(_61_62,Error,makeError);
		const oh_45no_33=exports["oh-no!"]=function(){
			const doc="Throws an Error.\nIf `error` is a String, it will be put into a new Error.\nIf it is possible for the creation of `error` to fail, make it lazy.";
			const test=function test(){
				_ms.unlazy(_33)(fails_45with_63,"a",function(){
					return oh_45no_33("a")
				});
				return _ms.unlazy(_33)(fails_45with_63,TypeError,function(){
					return oh_45no_33(TypeError())
				})
			};
			return _ms.set(ohNo,"doc",doc,"test",test,"name","oh-no!")
		}();
		const _try=exports.try=function(){
			const doc="If `tried` throws an error, returns it; else returns Success of its result.\nIf you don't care about the value of the error, use `?try` instead.";
			const test=function test(){
				const _k0=[_ms.unlazy(thunk)(1)],_v0=Success(1);
				_ms.unlazy(_33)(fails_45with_63,"Oh no!",oh_45no_33);
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function _try(tried){
				_ms.checkContains(_ms.sub(Function,Any),tried,"tried");
				return iTry(Success,tried)
			},"doc",doc,"test",test)
		}();
		const _63try=exports["?try"]=function(){
			const doc="`?` containing any successes.\nThis can be thought of as translating an Error-throwing Function to an ?-returning one.\nThe opposite of this is `@.?.un-?`.";
			const test=function test(){
				const _k0=[_ms.unlazy(thunk)(1)],_v0=_63(1);
				const _k1=[oh_45no_33],_v1=empty(_63);
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function _63try(tried){
				_ms.checkContains(_ms.sub(Function,Any),tried,"tried");
				return function(){
					const _=_try(tried);
					if(_ms.bool(_ms.contains(Success,_))){
						return _63(_.val)
					} else {
						return empty(_63)
					}
				}()
			},"doc",doc,"test",test)
		}();
		const fails_63=exports["fails?"]=function(){
			const doc="Whether the Function throws some error.";
			const test=function test(){
				_ms.unlazy(_33)(fails_63,function(){
					return oh_45no_33()
				});
				return _ms.unlazy(_33not)(fails_63,function(){})
			};
			return _ms.set(function fails_63(_){
				_ms.checkContains(Action,_,"_");
				return contains_63(Error,_try(_))
			},"doc",doc,"test",test)
		}();
		const fails_45with_63=exports["fails-with?"]=function(){
			const doc="Whether the Function throws an error of the given type or with the given message.";
			const test=function test(){
				_ms.unlazy(_33)(fails_45with_63,"message",function(){
					return oh_45no_33("message")
				});
				return _ms.unlazy(_33)(fails_45with_63,TypeError,function(){
					return null["missing-property"]
				})
			};
			return _ms.set(function fails_45with_63(expected_45error,act){
				_ms.checkContains(_ms.sub(Union,String,Type),expected_45error,"expected-error");
				_ms.checkContains(Action,act,"act");
				const result=_try(act);
				return and(contains_63(Error,result),_ms.lazy(function(){
					return function(){
						return function(){
							const _=expected_45error;
							if(_ms.bool(_ms.contains(Type,_))){
								return contains_63(_,result)
							} else if(_ms.bool(_ms.contains(String,_))){
								return _61_63(result.message,_)
							} else throw new Error("No branch of `case` matches.")
						}()
					}()
				}))
			},"doc",doc,"test",test)
		}();
		const error_45type=exports["error-type"]=function(){
			const doc="Makes an Obj-Type with a `message` property, and a `stack` property automatically filled in on construction.";
			const test=function test(){
				const ET=error_45type(function(){
					const doc="ET";
					return {
						doc:doc,
						name:"ET"
					}
				}());
				_ms.unlazy(_33)(_61_63,ET.doc,"ET");
				const x=ET({
					message:"mess"
				});
				_ms.unlazy(_33)(contains_63,Error,x);
				_ms.unlazy(_33)(_61_63,"mess",x.message);
				return _ms.unlazy(_33)(fails_45with_63,"mess",function(){
					return oh_45no_33(x)
				})
			};
			return _ms.set(function error_45type(opts){
				const default_45args=function(){
					const props=function(){
						const message=String;
						const stack=null;
						return {
							message:message,
							stack:stack,
							name:"props"
						}
					}();
					const defaults=function(){
						const stack=function stack(_){
							return _new(Error,_.message).stack
						};
						return {
							stack:stack,
							name:"defaults"
						}
					}();
					const prototype=Object.create(Error.prototype);
					return {
						props:props,
						defaults:defaults,
						prototype:prototype,
						name:"default-args"
					}
				}();
				const args=Object.assign(default_45args,opts);
				return Obj_45Type(args)
			},"doc",doc,"test",test)
		}();
		const always_45do_45after=exports["always-do-after"]=function(){
			const doc="Executes `finally-do`, even if there are errors.";
			const test=function test(){
				return _ms.unlazy(_33)(_61_63,[0],_ms.unlazy(build)(function(_yield){
					return _try(function(){
						return always_45do_45after(oh_45no_33,_ms.sub(_yield,0))
					})
				}))
			};
			return _ms.set(function always_45do_45after(tried,finally_45do){
				_ms.checkContains(_ms.sub(Function,Any),tried,"tried");
				_ms.checkContains(Action,finally_45do,"finally-do");
				return alwaysDoAfter(tried,finally_45do)
			},"doc",doc,"test",test)
		}();
		const annotate_45errors=exports["annotate-errors"]=function(){
			const doc="If there are thrown errors, prepends `annotation` to their stack and message.";
			const test=function test(){
				return _ms.unlazy(_33)(fails_45with_63,"ab",function(){
					return annotate_45errors("a",function(){
						return oh_45no_33("b")
					})
				})
			};
			return _ms.set(function annotate_45errors(annotation,tried){
				_ms.checkContains(Action,tried,"tried");
				return function(){
					const _=_try(tried);
					if(_ms.bool(_ms.contains(Success,_))){
						return _.val
					} else {
						p_33(_,"stack",((""+_ms.show(_ms.unlazy(annotation)))+_ms.show(_.stack)));
						p_33(_,"message",((""+_ms.show(_ms.unlazy(annotation)))+_ms.show(_.message)));
						return oh_45no_33(_)
					}
				}()
			},"doc",doc,"test",test)
		}();
		const $try=exports.$try=function(){
			const doc="Success if the $ is resolved, Error if rejected.";
			const $test=function* $test(){
				_ms.unlazy(_33)(_61_63,Success(1),(yield $try(_ms.unlazy($resolved)(1))));
				_ms.unlazy(_33)(_61_63,"a",(yield $try(_ms.unlazy($rejected)("a"))).message);
				return _ms.unlazy(_33)(_61_63,"a",(yield $try($.reject("a"))).message)
			};
			return _ms.set(function $try(_){
				_ms.checkContains($,_,"_");
				return _ms.checkContains(_ms.sub($,Try),$catch($after(_,Success),_ms.sub(_61_62,Error)),"res")
			},"doc",doc,"$test",$test)
		}();
		const $catch=exports.$catch=function(){
			const doc="If `$` succeeds, acts like `identity`.\nElse returns a `$` for the result of running `catcher` on the Error.\nLike for `$after`, `catcher` can also return another `$`.";
			const $test=function* $test(){
				return _ms.unlazy(_33)(_61_63,"a",(yield $catch(_ms.unlazy($rejected)("a"),function(_){
					return _.message
				})))
			};
			return _ms.set(function $catch(promise,catcher){
				_ms.checkContains($,promise,"promise");
				_ms.checkContains(Function,catcher,"catcher");
				return _ms.checkContains($,promise.catch(catcher),"res")
			},"doc",doc,"$test",$test)
		}();
		const $annotate_45errors=exports["$annotate-errors"]=function(){
			const doc="Like `annotate-errors` but works on errors thrown in a `$`.";
			const $test=function* $test(){
				return _ms.unlazy(_33)(_61_63,"ab",(yield $try($annotate_45errors("a",_ms.unlazy($rejected)("b")))).message)
			};
			return _ms.set(function $annotate_45errors(annotation,$tried){
				_ms.checkContains($,$tried,"$tried");
				return $catch($tried,function(_){
					p_33(_,"stack",((""+_ms.show(_ms.unlazy(annotation)))+_ms.show(_.stack)));
					p_33(_,"message",((""+_ms.show(_ms.unlazy(annotation)))+_ms.show(_.message)));
					return oh_45no_33(_)
				})
			},"doc",doc,"$test",$test)
		}();
		const name=exports.name="Try";
		exports.default=Try;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UcnkubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQXNCQSw4QkFBUyxzQkFDUztHQUFqQixVQUFNOzs7Ozs7RUFFUCxVQUFNLGVBQ0k7R0FBVCxVQUFNO0dBQ04sbUJBQWMsQ0FBRSxRQUFROzs7Ozs7O0VBRXpCLGVBQVcsT0FBRyxNQUFNO0VBRXBCLDZDQUNPO0dBQU4sVUFDQztHQUdELFdBQ08sZUFBQTtvQkFBSixnQkFBYSxJQUNJLFVBQUE7WUFBbEIsV0FBUTtJQUFBOzJCQUNQLGdCQUFZLFVBQ1csVUFBQTtZQUF4QixXQUFPO0lBQUE7R0FBQTtrQkFDVDs7RUFFRCxpQ0FDSTtHQUFILFVBQ0M7R0FFRCxXQUNPLGVBQUE7SUFBTixVQUFBLG1CQUFTLFFBQVEsUUFBUTtvQkFDdkIsZ0JBQWEsU0FBUTs7O2tCQUN2QixjQUFBLE1BQ21COzhCQURiLFNBQVM7V0FDZixLQUFLLFFBQVE7R0FBQTs7RUFFZix1Q0FDSztHQUFKLFVBQ0M7R0FHRCxXQUNPLGVBQUE7SUFBTixVQUFBLG1CQUFTLFFBQVEsSUFBRTtJQUNuQixVQUFBLENBQUUsZ0JBQVksTUFBTTs7O2tCQUNwQixnQkFBQSxNQUNtQjs4QkFEYixTQUFTOztLQUNWLFFBQUEsS0FBSTtLQUNSLHlCQUFDLFFBQUQsSUFDUTthQUFQLElBQUU7WUFFQzthQUFILE1BQU07S0FBQTtJQUFBO0dBQUE7O0VBRVYsMkNBQ087R0FBTixVQUFNO0dBQ04sV0FDTyxlQUFBO29CQUFKLFNBQ1EsVUFBQTtZQUFUO0lBQUE7OEJBQ0ksU0FDUSxVQUFBO0dBQUE7a0JBQ2Isa0JBQUEsRUFDUTtzQkFETjtXQUNGLFlBQVUsTUFBTSxLQUFHO0dBQUE7O0VBRXJCLHVEQUNZO0dBQVgsVUFBTTtHQUNOLFdBQ08sZUFBQTtvQkFBSixnQkFBYSxVQUNVLFVBQUE7WUFBeEIsV0FBUTtJQUFBOzJCQUNQLGdCQUFZLFVBQ1csVUFBQTtZQUF4Qjs7O2tCQUNELHlCQUFBLGlCQUFrQyxJQUNVOzhCQUQ3QixNQUFNLE9BQU87c0JBQVU7SUFDdEMsYUFBUyxLQUFJO1dBQ2IsSUFBSyxZQUFVLE1BQU07c0JBQ1M7O09BQXhCLFFBQUE7T0FDSix5QkFBQyxLQUFELElBQ0s7ZUFBSixZQUFVLEVBQUU7T0FBQSxPQUNiLHlCQUFDLE9BQUQsSUFDTztlQUFOLE9BQUcsZUFBZTtPQUFBOzs7Ozs7RUFFdkIsbURBQ1c7R0FBVixVQUNDO0dBQ0QsV0FDTyxlQUFBO0lBQU4sU0FBSyx1QkFDVTtLQUFkLFVBQU07Ozs7OztvQkFDTCxPQUFHLE9BQVE7SUFDYixRQUFJLEdBQUc7YUFBVztJQUFBO29CQUNoQixZQUFVLE1BQU07b0JBQ2hCLE9BQUksT0FBTTsyQkFDVixnQkFBYSxPQUNPLFVBQUE7WUFBckIsV0FBTztJQUFBO0dBQUE7a0JBQ1Isc0JBQUEsS0FDSTtJQUFKLCtCQUNjO0tBQWIsc0JBQ007TUFBTCxjQUFTO01BQ1QsWUFBQTs7Ozs7OztLQUNELHlCQUNTO01BQVIsWUFBUSxlQUFBLEVBQ0M7Y0FBUCxLQUFJLE1BQU07Ozs7Ozs7S0FDYixnQkFBVyxjQUFjOzs7Ozs7OztJQUMxQixXQUFPLGNBQWMsZUFBYTtXQUNsQyxXQUFTO0dBQUE7O0VBRVgsK0RBQ2dCO0dBQWYsVUFBTTtHQUNOLFdBQ08sZUFBQTsyQkFBSixPQUFHLENBQUUscUJBQVksU0FBQSxPQUNLO1lBQXZCLEtBQ0ssVUFBQTthQUFKLG9CQUFnQixtQkFBTyxPQUFNO0tBQUE7SUFBQTtHQUFBO2tCQUMvQiw2QkFBQSxNQUFvQixhQUNpQjs4QkFEL0IsU0FBUztzQkFBZ0I7V0FDL0IsY0FBYyxNQUFNO0dBQUE7O0VBRXRCLDZEQUNnQjtHQUFmLFVBQU07R0FDTixXQUNPLGVBQUE7MkJBQUosZ0JBQWEsS0FDSyxVQUFBO1lBQW5CLGtCQUFpQixJQUNJLFVBQUE7YUFBcEIsV0FBUTtLQUFBO0lBQUE7R0FBQTtrQkFDViwyQkFBQSxXQUFtQixNQUNZO3NCQUROOztLQUNwQixRQUFBLEtBQUk7S0FDUix5QkFBQyxRQUFELElBQ1E7YUFBUDtZQUVHO01BQUgsS0FBRyxFQUFHLFFBQVEsRUExRnNCLHVCQXFGdEMsdUJBSzZCO01BQzNCLEtBQUcsRUFBRyxVQUFVLEVBM0ZvQix1QkFxRnRDLHVCQU0rQjthQUM3QixXQUFPO0tBQUE7SUFBQTtHQUFBOztFQUdWLGtDQUNLO0dBQUosVUFBTTtHQUNOLFlBQ1MsaUJBQUE7b0JBQU4sT0FBSSxRQUFRLEdBQUcsT0FBSSwyQkFBZ0I7b0JBQ25DLE9BQUksSUFBRyxPQUFLLDJCQUFpQjsyQkFFN0IsT0FBSSxJQUFHLE9BQUssS0FBTSxTQUFVOztrQkFDOUIsY0FBUSxFQUNHO3NCQUREO3FDQUFULEVBQUUsS0FFSCxPQUFRLE9BQU8sRUFBRSxpQkFBUyxPQUFHOzs7RUFFL0Isc0NBQ087R0FBTixVQUNDO0dBR0QsWUFDUyxpQkFBQTsyQkFBTixPQUFJLElBQUcsT0FBSyw2QkFBbUIsS0FBSyxTQUFBLEVBQ0M7WUFBdEM7OztrQkFDRCxnQkFBRyxRQUFVLFFBQ2dCO3NCQURsQjtzQkFBVTs2QkFBcEIsRUFDRCxjQUFjOzs7RUFFaEIsK0RBQ2lCO0dBQWhCLFVBQU07R0FDTixZQUNTLGlCQUFBOzJCQUFOLE9BQUksS0FBSSxPQUFJLEtBQU0sbUJBQWtCLDBCQUFlOztrQkFDckQsNEJBQUEsV0FBbUIsT0FDUTtzQkFERDtXQUMxQixPQUFPLE9BQVEsU0FBQSxFQUNDO0tBQWYsS0FBRyxFQUFHLFFBQVEsRUEzSHNCLHVCQXlIckMsdUJBRTRCO0tBQzNCLEtBQUcsRUFBRyxVQUFVLEVBNUhvQix1QkF5SHJDLHVCQUc4QjtZQUM3QixXQUFPO0lBQUE7R0FBQTs7RUE3S1gsd0JBQUE7a0JBK0tBIiwiZmlsZSI6IlRyeS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9