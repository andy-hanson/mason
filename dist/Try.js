"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at-Type","./at/q","./cash","./Boolean","./compare","./Function","./js","./private/js-impl","./Objectbang","./Type/Method","./Type/Obj-Type","./Type/Kind","./Type/Pred-Type","./Type/Type","./Type/Wrap-Type","./bang","./control","./Function","./cash"],function(exports,_64_45Type_0,_63_1,$_2,Boolean_3,compare_4,Function_5,js_6,js_45impl_7,Object_33_8,Method_9,Obj_45Type_10,Kind_11,Pred_45Type_12,Type_13,Wrap_45Type_14,_33_15,control_16,Function_17,$_18){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(_64_45Type_0),empty=_$2.empty,_63=_ms.getDefaultExport(_63_1),$=_ms.getDefaultExport($_2),_$4=_ms.getModule($_2),$after=_$4.$after,_$5=_ms.getModule(Boolean_3),and=_$5.and,_$6=_ms.getModule(compare_4),_61_63=_$6["=?"],_$7=_ms.getModule(Function_5),Action=_$7.Action,_$8=_ms.getModule(js_6),_new=_$8.new,_$9=_ms.getModule(js_45impl_7),makeError=_$9.makeError,alwaysDoAfter=_$9.alwaysDoAfter,ohNo=_$9.ohNo,iTry=_$9.iTry,_$10=_ms.getModule(Object_33_8),p_33=_$10["p!"],_$11=_ms.getModule(Method_9),self_45impl_33=_$11["self-impl!"],Obj_45Type=_ms.getDefaultExport(Obj_45Type_10),Kind=_ms.getDefaultExport(Kind_11),_$14=_ms.getModule(Pred_45Type_12),Any=_$14.Any,Union=_$14.Union,Type=_ms.getDefaultExport(Type_13),_$15=_ms.getModule(Type_13),contains_63=_$15["contains?"],_61_62=_$15["=>"],Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_14),_33=_ms.lazy(function(){
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
			return _ms.set(ohNo,"doc",doc,"name","oh-no!")
		}();
		const _try=exports.try=function(){
			const doc="If `tried` throws an error, returns it; else returns Success of its result.\nIf you don't care about the value of the error, use `?try` instead.";
			return _ms.set(function _try(tried){
				return iTry(Success,tried)
			},"doc",doc)
		}();
		const _63try=exports["?try"]=function(){
			const doc="`?` containing any successes.\nThis can be thought of as translating an Error-throwing Function to an ?-returning one.\nThe opposite of this is `@.?.un-?`.";
			return _ms.set(function _63try(tried){
				return function(){
					const _=_try(tried);
					if(_ms.contains(Success,_)){
						return _63(_.val)
					} else {
						return empty(_63)
					}
				}()
			},"doc",doc)
		}();
		const fails_63=exports["fails?"]=function(){
			const doc="Whether the Function throws some error.";
			return _ms.set(function fails_63(_){
				return contains_63(Error,_try(_))
			},"doc",doc)
		}();
		const fails_45with_63=exports["fails-with?"]=function(){
			const doc="Whether the Function throws an error of the given type or with the given message.";
			return _ms.set(function fails_45with_63(expected_45error,act){
				const result=_try(act);
				return and(contains_63(Error,result),_ms.lazy(function(){
					return function(){
						return function(){
							const _=expected_45error;
							if(_ms.contains(Type,_)){
								return contains_63(_,result)
							} else if(_ms.contains(String,_)){
								return _61_63(result.message,_)
							} else throw new Error("No branch of `case` matches.")
						}()
					}()
				}))
			},"doc",doc)
		}();
		const error_45type=exports["error-type"]=function(){
			const doc="Makes an Obj-Type with a `message` property, and a `stack` property automatically filled in on construction.";
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
			},"doc",doc)
		}();
		const always_45do_45after=exports["always-do-after"]=function(){
			const doc="Executes `finally-do`, even if there are errors.";
			return _ms.set(function always_45do_45after(tried,finally_45do){
				return alwaysDoAfter(tried,finally_45do)
			},"doc",doc)
		}();
		const annotate_45errors=exports["annotate-errors"]=function(){
			const doc="If there are thrown errors, prepends `annotation` to their stack and message.";
			return _ms.set(function annotate_45errors(annotation,tried){
				return function(){
					const _=_try(tried);
					if(_ms.contains(Success,_)){
						return _.val
					} else {
						p_33(_,"stack",((""+_ms.show(_ms.unlazy(annotation)))+_ms.show(_.stack)));
						p_33(_,"message",((""+_ms.show(_ms.unlazy(annotation)))+_ms.show(_.message)));
						return oh_45no_33(_)
					}
				}()
			},"doc",doc)
		}();
		const $try=exports.$try=function(){
			const doc="Success if the $ is resolved, Error if rejected.";
			return _ms.set(function $try(_){
				return $catch($after(_,Success),_ms.sub(_61_62,Error))
			},"doc",doc)
		}();
		const $catch=exports.$catch=function(){
			const doc="If `$` succeeds, acts like `identity`.\nElse returns a `$` for the result of running `catcher` on the Error.\nLike for `$after`, `catcher` can also return another `$`.";
			return _ms.set(function $catch(promise,catcher){
				return promise.catch(catcher)
			},"doc",doc)
		}();
		const $annotate_45errors=exports["$annotate-errors"]=function(){
			const doc="Like `annotate-errors` but works on errors thrown in a `$`.";
			return _ms.set(function $annotate_45errors(annotation,$tried){
				return $catch($tried,function(_){
					p_33(_,"stack",((""+_ms.show(_ms.unlazy(annotation)))+_ms.show(_.stack)));
					p_33(_,"message",((""+_ms.show(_ms.unlazy(annotation)))+_ms.show(_.message)));
					return oh_45no_33(_)
				})
			},"doc",doc)
		}();
		const name=exports.name="Try";
		exports.default=Try;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UcnkubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQXNCQSw4QkFBUyxzQkFDUztHQUFqQixVQUFNOzs7Ozs7RUFFUCxVQUFNLGVBQ0k7R0FBVCxVQUFNO0dBQ04sbUJBQWMsQ0FBRSxRQUFROzs7Ozs7O0VBRXpCLGVBQVcsT0FBRyxNQUFNO0VBRXBCLDZDQUNPO0dBQU4sVUFDQztrQkFRRDs7RUFFRCxpQ0FDSTtHQUFILFVBQ0M7a0JBS0EsY0FBQSxNQUNtQjtXQUFuQixLQUFLLFFBQVE7R0FBQTs7RUFFZix1Q0FDSztHQUFKLFVBQ0M7a0JBTUEsZ0JBQUEsTUFDbUI7O0tBQWQsUUFBQSxLQUFJO0tBQ1IsZ0JBQUMsUUFBRCxHQUNRO2FBQVAsSUFBRTtZQUVDO2FBQUgsTUFBTTtLQUFBO0lBQUE7R0FBQTs7RUFFViwyQ0FDTztHQUFOLFVBQU07a0JBTUwsa0JBQUEsRUFDUTtXQUFSLFlBQVUsTUFBTSxLQUFBO0dBQUE7O0VBRWxCLHVEQUNZO0dBQVgsVUFBTTtrQkFNTCx5QkFBQSxpQkFBa0MsSUFDVTtJQUE1QyxhQUFTLEtBQUk7V0FDYixJQUFLLFlBQVUsTUFBTTtzQkFDUzs7T0FBeEIsUUFBQTtPQUNKLGdCQUFDLEtBQUQsR0FDSztlQUFKLFlBQVUsRUFBRTtPQUFBLE9BQ2IsZ0JBQUMsT0FBRCxHQUNPO2VBQU4sT0FBRyxlQUFlO09BQUE7Ozs7OztFQUV2QixtREFDVztHQUFWLFVBQ0M7a0JBVUEsc0JBQUEsS0FDSTtJQUFKLCtCQUNjO0tBQWIsc0JBQ007TUFBTCxjQUFTO01BQ1QsWUFBQTs7Ozs7OztLQUNELHlCQUNTO01BQVIsWUFBUSxlQUFBLEVBQ0M7Y0FBUCxLQUFJLE1BQU07Ozs7Ozs7S0FDYixnQkFBVyxjQUFjOzs7Ozs7OztJQUMxQixXQUFPLGNBQWMsZUFBYTtXQUNsQyxXQUFTO0dBQUE7O0VBRVgsK0RBQ2dCO0dBQWYsVUFBTTtrQkFLTCw2QkFBQSxNQUFvQixhQUNpQjtXQUFyQyxjQUFjLE1BQU07R0FBQTs7RUFFdEIsNkRBQ2dCO0dBQWYsVUFBTTtrQkFLTCwyQkFBQSxXQUFtQixNQUNZOztLQUExQixRQUFBLEtBQUk7S0FDUixnQkFBQyxRQUFELEdBQ1E7YUFBUDtZQUVHO01BQUgsS0FBRyxFQUFHLFFBQVEsRUF2R00sdUJBa0d0Qix1QkFLNkI7TUFDM0IsS0FBRyxFQUFHLFVBQVUsRUF4R0ksdUJBa0d0Qix1QkFNK0I7YUFDN0IsV0FBTztLQUFBO0lBQUE7R0FBQTs7RUFHVixrQ0FDSztHQUFKLFVBQU07a0JBTUwsY0FBUSxFQUNHO1dBQ1gsT0FBUSxPQUFPLEVBQUUsaUJBQVMsT0FBRztHQUFBOztFQUUvQixzQ0FDTztHQUFOLFVBQ0M7a0JBTUEsZ0JBQUcsUUFBVSxRQUNnQjtXQUE3QixjQUFjO0dBQUE7O0VBRWhCLCtEQUNpQjtHQUFoQixVQUFNO2tCQUdMLDRCQUFBLFdBQW1CLE9BQ1E7V0FBM0IsT0FBTyxPQUFRLFNBQUEsRUFDQztLQUFmLEtBQUcsRUFBRyxRQUFRLEVBeElNLHVCQXNJckIsdUJBRTRCO0tBQzNCLEtBQUcsRUFBRyxVQUFVLEVBeklJLHVCQXNJckIsdUJBRzhCO1lBQzdCLFdBQU87SUFBQTtHQUFBOztFQTdLWCx3QkFBQTtrQkErS0EiLCJmaWxlIjoiVHJ5LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=