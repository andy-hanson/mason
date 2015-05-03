"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at-Type","./at/q","./cash","./Bool","./compare","./Fun","./js","./private/js-impl","./Obj","./Objbang","./Str","./Type/Method","./Type/Obj-Type","./Type/Kind","./Type/Pred-Type","./Type/Type","./Type/Wrap-Type","./bang","./control","./Fun","./cash"],function(exports,_64_45Type_0,_63_1,$_2,Bool_3,compare_4,Fun_5,js_6,js_45impl_7,Obj_8,Obj_33_9,Str_10,Method_11,Obj_45Type_12,Kind_13,Pred_45Type_14,Type_15,Wrap_45Type_16,_33_17,control_18,Fun_19,$_20){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(_64_45Type_0),empty=_ms.get(_$2,"empty"),_63=_ms.getDefaultExport(_63_1),$=_ms.getDefaultExport($_2),_$4=_ms.getModule($_2),$after=_ms.get(_$4,"$after"),_$5=_ms.getModule(Bool_3),and=_ms.get(_$5,"and"),_$6=_ms.getModule(compare_4),_61_63=_ms.get(_$6,"=?"),Fun=_ms.getDefaultExport(Fun_5),_$7=_ms.getModule(Fun_5),Act=_ms.get(_$7,"Act"),spread_33=_ms.get(_$7,"spread!"),_$8=_ms.getModule(js_6),_new=_ms.get(_$8,"new"),_$9=_ms.getModule(js_45impl_7),makeError=_ms.get(_$9,"makeError"),alwaysDoAfter=_ms.get(_$9,"alwaysDoAfter"),ohNo=_ms.get(_$9,"ohNo"),iTry=_ms.get(_$9,"iTry"),Obj=_ms.getDefaultExport(Obj_8),_$11=_ms.getModule(Obj_33_9),p_33=_ms.get(_$11,"p!"),p_43_33=_ms.get(_$11,"p+!"),Str=_ms.getDefaultExport(Str_10),_$13=_ms.getModule(Method_11),self_45impl_33=_ms.get(_$13,"self-impl!"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_12),Kind=_ms.getDefaultExport(Kind_13),_$16=_ms.getModule(Pred_45Type_14),Any=_ms.get(_$16,"Any"),Union=_ms.get(_$16,"Union"),Type=_ms.getDefaultExport(Type_15),_$17=_ms.getModule(Type_15),contains_63=_ms.get(_$17,"contains?"),_61_62=_ms.get(_$17,"=>"),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_16),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_17)
		}),_$20=_ms.lazyGetModule(_33_17),_33not=_ms.lazyProp(_$20,"!not"),_$21=_ms.lazyGetModule(control_18),build=_ms.lazyProp(_$21,"build"),_$22=_ms.lazyGetModule(Fun_19),thunk=_ms.lazyProp(_$22,"thunk"),_$23=_ms.lazyGetModule($_20),$rejected=_ms.lazyProp(_$23,"$rejected"),$resolved=_ms.lazyProp(_$23,"$resolved");
		const exports={};
		const Success=exports.Success=Wrap_45Type(function(){
			const doc="Attempt that did not fail. _.val is the result of the attempted code.";
			return {
				doc:doc,
				displayName:"Success"
			}
		}());
		const Try=Kind(function(){
			const doc="Result of running failable code. Success or Error.";
			const implementors=[Success,Error];
			return {
				doc:doc,
				implementors:implementors,
				displayName:"Try"
			}
		}());
		self_45impl_33(_61_62,Error,makeError);
		const oh_45no_33=exports["oh-no!"]=function(){
			const doc="Throws an Error.\nIf `error` is a Str, it will be put into a new Error.\nIf it is possible for the creation of `error` to fail, make it lazy.";
			const test=function(){
				_ms.unlazy(_33)(fails_45with_63,"a",function(){
					return oh_45no_33("a")
				});
				return _ms.unlazy(_33)(fails_45with_63,TypeError,function(){
					return oh_45no_33(TypeError())
				})
			};
			return _ms.set(ohNo,"doc",doc,"test",test,"displayName","oh-no!")
		}();
		const _try=exports.try=function(){
			const doc="If `tried` throws an error, returns it; else returns Success of its result.\nIf you don't care about the value of the error, use `?try` instead.";
			const test=function(){
				const _k0=[_ms.unlazy(thunk)(1)],_v0=Success(1);
				_ms.unlazy(_33)(fails_45with_63,"Oh no!",oh_45no_33);
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function(tried){
				_ms.checkContains(_ms.sub(Fun,Any),tried,"tried");
				return iTry(Success,tried)
			},"doc",doc,"test",test,"displayName","try")
		}();
		const _63try=exports["?try"]=function(){
			const doc="`?` containing any successes.\nThis can be thought of as translating an Error-throwing Fun to an ?-returning one.\nThe opposite of this is `@.?.un-?`.";
			const test=function(){
				const _k0=[_ms.unlazy(thunk)(1)],_v0=_63(1);
				const _k1=[oh_45no_33],_v1=empty(_63);
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function(tried){
				_ms.checkContains(_ms.sub(Fun,Any),tried,"tried");
				return function(){
					const _=_try(tried);
					if(_ms.bool(_ms.contains(Success,_))){
						return _63(_.val)
					} else {
						return empty(_63)
					}
				}()
			},"doc",doc,"test",test,"displayName","?try")
		}();
		const fails_63=exports["fails?"]=function(){
			const doc="Whether the Fun throws some error.";
			const test=function(){
				_ms.unlazy(_33)(fails_63,function(){
					return oh_45no_33()
				});
				return _ms.unlazy(_33not)(fails_63,function(){
					return null
				})
			};
			return _ms.set(function(_){
				_ms.checkContains(Act,_,"_");
				return contains_63(Error,_try(_))
			},"doc",doc,"test",test,"displayName","fails?")
		}();
		const fails_45with_63=exports["fails-with?"]=function(){
			const doc="Whether the Fun throws an error of the given type or with the given message.";
			const test=function(){
				_ms.unlazy(_33)(fails_45with_63,"message",function(){
					return oh_45no_33("message")
				});
				return _ms.unlazy(_33)(fails_45with_63,TypeError,function(){
					return null["missing-property"]
				})
			};
			return _ms.set(function(_with,act){
				_ms.checkContains(_ms.sub(Union,Str,Type),_with,"with");
				_ms.checkContains(Act,act,"act");
				const result=_try(act);
				return and(contains_63(Error,result),_ms.lazy(function(){
					return function(){
						return function(){
							const _=_with;
							if(_ms.bool(_ms.contains(Type,_))){
								return contains_63(_,result)
							} else if(_ms.bool(_ms.contains(Str,_))){
								return _61_63(result.message,_)
							} else throw new Error("No branch of `case` matches.")
						}()
					}()
				}))
			},"doc",doc,"test",test,"displayName","fails-with?")
		}();
		const error_45type=exports["error-type"]=function(){
			const doc="Makes an Obj-Type with a `message` property, and a `stack` property automatically filled in on construction.";
			const test=function(){
				const ET=error_45type(function(){
					const doc="ET";
					return {
						doc:doc,
						displayName:"ET"
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
			return _ms.set(function(opts){
				const _=Obj_45Type(function(){
					const props=function(){
						const message=Str;
						const stack=true;
						return {
							message:message,
							stack:stack,
							displayName:"props"
						}
					}();
					const defaults=function(){
						const stack=function(_){
							const message=_ms.checkContains(Str,_.message,"message");
							return _new(Error,message).stack
						};
						return {
							stack:stack,
							displayName:"defaults"
						}
					}();
					const prototype=Obj.create(Error.prototype);
					return {
						props:props,
						defaults:defaults,
						prototype:prototype,
						displayName:"_"
					}
				}());
				spread_33(p_43_33,_,opts);
				return _
			},"test",test,"doc",doc,"displayName","error-type")
		}();
		const always_45do_45after=exports["always-do-after"]=function(){
			const doc="Executes `finally-do`, even if there are errors.";
			const test=function(){
				return _ms.unlazy(_33)(_61_63,[0],_ms.unlazy(build)(function(_yield){
					return _try(function(){
						return always_45do_45after(oh_45no_33,_ms.sub(_yield,0))
					})
				}))
			};
			return _ms.set(function(tried,finally_45do){
				_ms.checkContains(_ms.sub(Fun,Any),tried,"tried");
				_ms.checkContains(Act,finally_45do,"finally-do");
				return alwaysDoAfter(tried,finally_45do)
			},"doc",doc,"test",test,"displayName","always-do-after")
		}();
		const annotate_45errors=exports["annotate-errors"]=function(){
			const doc="If there are thrown errors, prepends `annotation` to their stack and message.";
			const test=function(){
				return _ms.unlazy(_33)(fails_45with_63,"ab",function(){
					return annotate_45errors("a",function(){
						return oh_45no_33("b")
					})
				})
			};
			return _ms.set(function(annotation,tried){
				_ms.checkContains(Act,tried,"tried");
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
			},"doc",doc,"test",test,"displayName","annotate-errors")
		}();
		const $try=exports.$try=function(){
			const doc="Success if the $ is resolved, Error if rejected.";
			const $test=function*(){
				_ms.unlazy(_33)(_61_63,Success(1),(yield $try(_ms.unlazy($resolved)(1))));
				_ms.unlazy(_33)(_61_63,"a",(yield $try(_ms.unlazy($rejected)("a"))).message);
				return _ms.unlazy(_33)(_61_63,"a",(yield $try($.reject("a"))).message)
			};
			return _ms.set(function(_){
				_ms.checkContains($,_,"_");
				return _ms.checkContains(_ms.sub($,Try),$catch($after(_,Success),_ms.sub(_61_62,Error)),"res")
			},"doc",doc,"$test",$test,"displayName","$try")
		}();
		const $catch=exports.$catch=function(){
			const doc="If `$` succeeds, acts like `identity`.\nElse returns a `$` for the result of running `catcher` on the Error.\nLike for `$after`, `catcher` can also return another `$`.";
			const $test=function*(){
				return _ms.unlazy(_33)(_61_63,"a",(yield $catch(_ms.unlazy($rejected)("a"),function(_){
					return _.message
				})))
			};
			return _ms.set(function(promise,catcher){
				_ms.checkContains($,promise,"promise");
				_ms.checkContains(Fun,catcher,"catcher");
				return _ms.checkContains($,promise.catch(catcher),"res")
			},"doc",doc,"$test",$test,"displayName","$catch")
		}();
		const $annotate_45errors=exports["$annotate-errors"]=function(){
			const doc="Like `annotate-errors` but works on errors thrown in a `$`.";
			const $test=function*(){
				return _ms.unlazy(_33)(_61_63,"ab",(yield $try($annotate_45errors("a",_ms.unlazy($rejected)("b")))).message)
			};
			return _ms.set(function(annotation,$tried){
				_ms.checkContains($,$tried,"$tried");
				return $catch($tried,function(_){
					p_33(_,"stack",((""+_ms.show(_ms.unlazy(annotation)))+_ms.show(_.stack)));
					p_33(_,"message",((""+_ms.show(_ms.unlazy(annotation)))+_ms.show(_.message)));
					return oh_45no_33(_)
				})
			},"doc",doc,"$test",$test,"displayName","$annotate-errors")
		}();
		exports.default=Try;
		const displayName=exports.displayName="Try";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UcnkubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2lDQXdCQTs7Ozs7RUFBQSw4QkFBUyxzQkFBUztHQUNqQixVQUFNO1VBRFc7Ozs7O0VBR2xCLFVBQU0sZUFBSTtHQUNULFVBQU07R0FDTixtQkFBYyxDQUFBLFFBQUE7VUFGTDs7Ozs7O0VBSVYsZUFBQSxPQUFBLE1BQUE7RUFFQSw2Q0FBTztHQUNOLFVBQ0M7R0FHRCxXQUFPLFVBQ047b0JBQUEsZ0JBQWUsSUFBSSxVQUNsQjtZQUFBLFdBQVE7SUFBQTsyQkFDVCxnQkFBQSxVQUF5QixVQUN4QjtZQUFBLFdBQU87SUFBQTtHQUFBO2tCQUNUOztFQUVELGlDQUFJO0dBQ0gsVUFDQztHQUVELFdBQU8sVUFDTjtJQUFBLFVBQUEsbUJBQVMsUUFBUSxRQUFRO29CQUN6QixnQkFBZSxTQUFmOzs7a0JBQ0EsU0FBQSxNQUNBOzhCQURNLElBQUc7V0FDVCxLQUFBLFFBQUE7R0FBQTs7RUFFRix1Q0FBSztHQUNKLFVBQ0M7R0FHRCxXQUFPLFVBQ047SUFBQSxVQUFBLG1CQUFTLFFBQVEsSUFBRTtJQUNuQixVQUFBLENBQUEsZ0JBQWMsTUFBQTs7O2tCQUNkLFNBQUEsTUFDQTs4QkFETSxJQUFHOztLQUNKLFFBQUEsS0FBQTtLQUNKLHlCQUFDLFFBQUQsSUFDQzthQUFBLElBQUU7WUFFRjthQUFBLE1BQUE7S0FBQTtJQUFBO0dBQUE7O0VBRUosMkNBQU87R0FDTixVQUFNO0dBQ04sV0FBTyxVQUNOO29CQUFBLFNBQVUsVUFDVDtZQUFBO0lBQUE7OEJBQ0QsU0FBYSxVQUNaO1lBQUE7SUFBQTtHQUFBO2tCQUNELFNBQUEsRUFDQTtzQkFERTtXQUNGLFlBQUEsTUFBQSxLQUFnQjtHQUFBOztFQUVsQix1REFBWTtHQUNYLFVBQU07R0FDTixXQUFPLFVBQ047b0JBQUEsZ0JBQWUsVUFBVSxVQUN4QjtZQUFBLFdBQVE7SUFBQTsyQkFDVCxn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