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
					oh_45no_33("a")
				});
				_ms.unlazy(_33)(fails_45with_63,TypeError,function(){
					oh_45no_33(TypeError())
				})
			};
			return _ms.set(ohNo,"doc",doc,"test",test,"name","oh-no!")
		}();
		const _try=exports.try=function(){
			const doc="If `tried` throws an error, returns it; else returns Success of its result.\nIf you don't care about the value of the error, use `?try` instead.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[_ms.unlazy(thunk)(1)],Success(1));
				_ms.unlazy(_33)(fails_45with_63,"Oh no!",oh_45no_33);
				return built
			};
			return _ms.set(function _try(tried){
				_ms.checkContains(_ms.sub(Function,Any),tried,"tried");
				return iTry(Success,tried)
			},"doc",doc,"test",test)
		}();
		const _63try=exports["?try"]=function(){
			const doc="`?` containing any successes.\nThis can be thought of as translating an Error-throwing Function to an ?-returning one.\nThe opposite of this is `@.?.un-?`.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[_ms.unlazy(thunk)(1)],_63(1));
				_ms.assoc(built,[oh_45no_33],empty(_63));
				return built
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
					oh_45no_33()
				});
				_ms.unlazy(_33not)(fails_63,function(){})
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
					oh_45no_33("message")
				});
				_ms.unlazy(_33)(fails_45with_63,TypeError,function(){
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
			const doc="Makes an Obj-Type with a `message` property,\nand a `stack` property automatically filled in on construction.\nVery slow to create, so use only for legitimate errors!";
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
				_ms.unlazy(_33)(fails_45with_63,"mess",function(){
					oh_45no_33(x)
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
				_ms.unlazy(_33)(_61_63,[0],_ms.unlazy(build)(function(_yield){
					return _try(function(){
						always_45do_45after(oh_45no_33,_ms.sub(_yield,0))
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
				_ms.unlazy(_33)(_61_63,"a",(yield $try($.reject("a"))).message)
			};
			return _ms.set(function $try(_){
				_ms.checkContains($,_,"_");
				return $catch($after(_,Success),_ms.sub(_61_62,Error))
			},"doc",doc,"$test",$test)
		}();
		const $catch=exports.$catch=function(){
			const doc="If `$` succeeds, acts like `identity`.\nElse returns a `$` for the result of running `catcher` on the Error.\nLike for `$after`, `catcher` can also return another `$`.";
			const $test=function* $test(){
				_ms.unlazy(_33)(_61_63,"a",(yield $catch(_ms.unlazy($rejected)("a"),function(_){
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
				_ms.unlazy(_33)(_61_63,"ab",(yield $try($annotate_45errors("a",_ms.unlazy($rejected)("b")))).message)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UcnkubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQXNCQSw4QkFBUyxzQkFDUztHQUFqQixVQUFNOzs7Ozs7RUFFUCxVQUFNLGVBQ0k7R0FBVCxVQUFNO0dBQ04sbUJBQWMsQ0FBRSxRQUFROzs7Ozs7O0VBRXpCLGVBQVcsT0FBRyxNQUFNO0VBRXBCLDZDQUNPO0dBQU4sVUFDQztHQUdELFdBQ1EsZUFBQTtvQkFBTCxnQkFBYSxJQUNLLFVBQUE7S0FBbkIsV0FBUTtJQUFBO29CQUNQLGdCQUFZLFVBQ1ksVUFBQTtLQUF6QixXQUFPO0lBQUE7R0FBQTtrQkFDVDs7RUFFRCxpQ0FDSTtHQUFILFVBQ0M7R0FFRCxXQUNPLGVBQUE7O29CQUFOLG1CQUFTLElBQVEsUUFBUTtvQkFDdkIsZ0JBQWEsU0FBUTs7O2tCQUN2QixjQUFBLE1BQ21COzhCQURiLFNBQVM7V0FDZixLQUFLLFFBQVE7R0FBQTs7RUFFZix1Q0FDSztHQUFKLFVBQ0M7R0FHRCxXQUNPLGVBQUE7O29CQUFOLG1CQUFTLElBQVEsSUFBRTtvQkFDbkIsQ0FBRSxZQUFZLE1BQU07OztrQkFDcEIsZ0JBQUEsTUFDbUI7OEJBRGIsU0FBUzs7S0FDVixRQUFBLEtBQUk7S0FDUix5QkFBQyxRQUFELElBQ1E7YUFBUCxJQUFFO1lBRUM7YUFBSCxNQUFNO0tBQUE7SUFBQTtHQUFBOztFQUVWLDJDQUNPO0dBQU4sVUFBTTtHQUNOLFdBQ1EsZUFBQTtvQkFBTCxTQUNTLFVBQUE7S0FBVjtJQUFBO3VCQUNJLFNBQ1MsVUFBQTtHQUFBO2tCQUNkLGtCQUFBLEVBQ1E7c0JBRE47V0FDRixZQUFVLE1BQU0sS0FBRztHQUFBOztFQUVyQix1REFDWTtHQUFYLFVBQU07R0FDTixXQUNRLGVBQUE7b0JBQUwsZ0JBQWEsVUFDVyxVQUFBO0tBQXpCLFdBQVE7SUFBQTtvQkFDUCxnQkFBWSxVQUNXLFVBQUE7WUFBeEI7OztrQkFDRCx5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