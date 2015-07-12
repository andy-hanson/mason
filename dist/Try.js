"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at-Type","./at/q","./cash","./compare","./Function","./js","./private/bootstrap","./Object","./Objectbang","./Type/Method","./Type/Obj-Type","./Type/Kind","./Type/Pred-Type","./Type/Type","./Type/Wrap-Type","./bang","./Function","./cash"],function(exports,_64_45Type_0,_63_1,$_2,compare_3,Function_4,js_5,bootstrap_6,Object_7,Object_33_8,Method_9,Obj_45Type_10,Kind_11,Pred_45Type_12,Type_13,Wrap_45Type_14,_33_15,Function_16,$_17){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(_64_45Type_0),empty=_ms.get(_$2,"empty"),_63=_ms.getDefaultExport(_63_1),$=_ms.getDefaultExport($_2),_$4=_ms.getModule($_2),$after=_ms.get(_$4,"$after"),_$5=_ms.getModule(compare_3),_61_63=_ms.get(_$5,"=?"),_$6=_ms.getModule(Function_4),Action=_ms.get(_$6,"Action"),noop=_ms.get(_$6,"noop"),_$7=_ms.getModule(js_5),_new=_ms.get(_$7,"new"),_$8=_ms.getModule(bootstrap_6),ms=_ms.get(_$8,"ms"),_$9=_ms.getModule(Object_7),p=_ms.get(_$9,"p"),_$10=_ms.getModule(Object_33_8),p_33=_ms.get(_$10,"p!"),_$11=_ms.getModule(Method_9),self_45impl_33=_ms.get(_$11,"self-impl!"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_10),Kind=_ms.getDefaultExport(Kind_11),_$14=_ms.getModule(Pred_45Type_12),Any=_ms.get(_$14,"Any"),Union=_ms.get(_$14,"Union"),Type=_ms.getDefaultExport(Type_13),_$15=_ms.getModule(Type_13),contains_63=_ms.get(_$15,"contains?"),_61_62=_ms.get(_$15,"=>"),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_14),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_15)
		}),_$18=_ms.lazyGetModule(_33_15),_33not=_ms.lazyProp(_$18,"!not"),_$19=_ms.lazyGetModule(Function_16),thunk=_ms.lazyProp(_$19,"thunk"),_$20=_ms.lazyGetModule($_17),$rejected=_ms.lazyProp(_$20,"$rejected"),$resolved=_ms.lazyProp(_$20,"$resolved");
		const fail_33=function fail_33(){
			throw _ms.error("Oh no!")
		};
		const Success=exports.Success=Wrap_45Type(function(){
			const built={};
			const doc=built.doc=`Attempt that did not fail. _.val is the result of the attempted code.`;
			return _ms.setName(built,"Success")
		}());
		const Try=Kind(function(){
			const built={};
			const doc=built.doc=`Result of running failable code. Success or Error.`;
			const implementors=built.implementors=[Success,Error];
			return _ms.setName(built,"Try")
		}());
		self_45impl_33(_61_62,Error,p(ms,`error`));
		const try_45result=exports["try-result"]=function(){
			const built={};
			const doc=built.doc=`If \`tried\` throws an error, returns it; else returns Success of its result.\nIf you don't care about the value of the error, use \`?try\` instead.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[_ms.unlazy(thunk)(1)],Success(1));
				_ms.unlazy(_33)(_61_63,try_45result(fail_33).message,`Oh no!`);
				return built
			};
			return _ms.set(function try_45result(tried){
				_ms.checkContains(Action,tried,"tried");
				return function(){
					try {
						return Success(tried())
					}catch(_){
						return _
					}
				}()
			},built)
		}();
		const _63try=exports["?try"]=function(){
			const built={};
			const doc=built.doc=`\`?\` containing any successes.\nThis can be thought of as translating an Error-throwing Function to an ?-returning one.\nThe opposite of this is \`@.?.un-?\`.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[_ms.unlazy(thunk)(1)],_63(1));
				_ms.assoc(built,[fail_33],empty(_63));
				return built
			};
			return _ms.set(function _63try(tried){
				_ms.checkContains(_ms.sub(Function,Any),tried,"tried");
				return function(){
					try {
						return _63(tried())
					}catch(_){
						noop(_);
						return empty(_63)
					}
				}()
			},built)
		}();
		const fails_63=exports["fails?"]=function(){
			const built={};
			const doc=built.doc=`Whether the Function throws some error.`;
			const test=built.test=function test(){
				_ms.unlazy(_33)(fails_63,fail_33);
				_ms.unlazy(_33not)(fails_63,noop)
			};
			return _ms.set(function fails_63(tried){
				_ms.checkContains(Action,tried,"tried");
				return function(){
					try {
						tried();
						return false
					}catch(_){
						noop(_);
						return true
					}
				}()
			},built)
		}();
		const fails_45with_63=exports["fails-with?"]=function(){
			const built={};
			const doc=built.doc=`Whether the Function throws an error of the given type or with the given message.`;
			const test=built.test=function test(){
				_ms.unlazy(_33)(fails_45with_63,`message`,function(){
					throw _ms.error(`message`)
				});
				_ms.unlazy(_33)(fails_45with_63,TypeError,function(){
					return null["missing-property"]
				})
			};
			return _ms.set(function fails_45with_63(expected_45error,tried){
				_ms.checkContains(_ms.sub(Union,String,Type),expected_45error,"expected-error");
				_ms.checkContains(Action,tried,"tried");
				return function(){
					try {
						tried();
						return false
					}catch(error){
						return function(){
							const _=expected_45error;
							if(_ms.bool(_ms.contains(Type,_))){
								return contains_63(_,error)
							} else if(_ms.bool(_ms.contains(String,_))){
								return _61_63(error.message,_)
							} else throw new Error("No branch of `case` matches.")
						}()
					}
				}()
			},built)
		}();
		const error_45type=exports["error-type"]=function(){
			const built={};
			const doc=built.doc=`Makes an Obj-Type with a \`message\` property,\nand a \`stack\` property automatically filled in on construction.\nVery slow to create, so use only for legitimate errors!`;
			const test=built.test=function test(){
				const ET=error_45type(function(){
					const built={};
					const doc=built.doc=`ET`;
					return _ms.setName(built,"ET")
				}());
				_ms.unlazy(_33)(_61_63,ET.doc,`ET`);
				const x=ET({
					message:`mess`
				});
				_ms.unlazy(_33)(contains_63,Error,x);
				_ms.unlazy(_33)(_61_63,`mess`,x.message);
				_ms.unlazy(_33)(fails_45with_63,`mess`,function(){
					throw _ms.error(x)
				})
			};
			return _ms.set(function error_45type(opts){
				const default_45args=function(){
					const built={};
					const props=built.props=function(){
						const built={};
						const message=built.message=String;
						const stack=built.stack=null;
						return _ms.setName(built,"props")
					}();
					const defaults=built.defaults=function(){
						const built={};
						const stack=built.stack=function stack(_){
							return _new(Error,_.message).stack
						};
						return _ms.setName(built,"defaults")
					}();
					const prototype=built.prototype=Object.create(Error.prototype);
					return _ms.setName(built,"default-args")
				}();
				const args=Object.assign(default_45args,opts);
				return Obj_45Type(args)
			},built)
		}();
		const annotate_45errors=exports["annotate-errors"]=function(){
			const built={};
			const doc=built.doc=`If there are thrown errors, prepends \`annotation\` to their stack and message.`;
			const test=built.test=function test(){
				return _ms.unlazy(_33)(fails_45with_63,`ab`,function(){
					annotate_45errors(`a`,function(){
						throw _ms.error(`b`)
					})
				})
			};
			return _ms.set(function annotate_45errors(annotation,tried){
				_ms.checkContains(Action,tried,"tried");
				return function(){
					try {
						return tried()
					}catch(_){
						p_33(_,`stack`,`${_ms.show(_ms.unlazy(annotation))}${_ms.show(_.stack)}`);
						p_33(_,`message`,`${_ms.show(_ms.unlazy(annotation))}${_ms.show(_.message)}`);
						throw _ms.error(_)
					}
				}()
			},built)
		}();
		const $try=exports.$try=function(){
			const built={};
			const doc=built.doc=`Success if the $ is resolved, Error if rejected.`;
			const $test=built.$test=function* $test(){
				_ms.unlazy(_33)(_61_63,Success(1),(yield $try(_ms.unlazy($resolved)(1))));
				_ms.unlazy(_33)(_61_63,`a`,(yield $try(_ms.unlazy($rejected)(`a`))).message);
				_ms.unlazy(_33)(_61_63,`a`,(yield $try($.reject(`a`))).message)
			};
			return _ms.set(function $try(_){
				_ms.checkContains($,_,"_");
				return $catch($after(_,Success),_ms.sub(_61_62,Error))
			},built)
		}();
		const $catch=exports.$catch=function(){
			const built={};
			const doc=built.doc=`If \`$\` succeeds, acts like \`identity\`.\nElse returns a \`$\` for the result of running \`catcher\` on the Error.\nLike for \`$after\`, \`catcher\` can also return another \`$\`.`;
			const $test=built.$test=function* $test(){
				_ms.unlazy(_33)(_61_63,`a`,(yield $catch(_ms.unlazy($rejected)(`a`),function(_){
					return _.message
				})))
			};
			return _ms.set(function $catch(promise,catcher){
				_ms.checkContains($,promise,"promise");
				_ms.checkContains(Function,catcher,"catcher");
				return _ms.checkContains($,promise.catch(catcher),"res")
			},built)
		}();
		const $annotate_45errors=exports["$annotate-errors"]=function(){
			const built={};
			const doc=built.doc=`Like \`annotate-errors\` but works on errors thrown in a \`$\`.`;
			const $test=built.$test=function* $test(){
				_ms.unlazy(_33)(_61_63,`ab`,(yield $try($annotate_45errors(`a`,_ms.unlazy($rejected)(`b`)))).message)
			};
			return _ms.set(function $annotate_45errors(annotation,$tried){
				_ms.checkContains($,$tried,"$tried");
				return $catch($tried,function(_){
					p_33(_,`stack`,`${_ms.show(_ms.unlazy(annotation))}${_ms.show(_.stack)}`);
					p_33(_,`message`,`${_ms.show(_ms.unlazy(annotation))}${_ms.show(_.message)}`);
					throw _ms.error(_)
				})
			},built)
		}();
		const name=exports.name=`Try`;
		exports.default=Try;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UcnkubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQXNCTSxjQUNVLGtCQUFBO0dBQWY7O0VBRUQsOEJBQVMsc0JBQ1M7O0dBQWpCLG9CQUFNOzs7RUFFUCxVQUFLLGVBQ0k7O0dBQVIsb0JBQU07R0FDTixzQ0FBYyxDQUFFLFFBQVE7OztFQUV6QixlQUFXLE9BQUcsTUFBTyxFQUFFLEdBQUk7RUFFM0IsbURBQ1c7O0dBQVYsb0JBQ0M7R0FFRCxzQkFDTyxlQUFBOztvQkFBTixtQkFBUyxJQUFRLFFBQVE7b0JBQ3ZCLE9BQUksYUFBVyxpQkFBZ0I7OztrQkFDakMsc0JBQUEsTUFDWTtzQkFETjs7U0FHRjthQUFGLFFBQVE7S0FBQSxDQUNULE1BQ0ssRUFBQTthQUFKO0tBQUE7SUFBQTtHQUFBOztFQUVKLHVDQUNLOztHQUFKLG9CQUNDO0dBR0Qsc0JBQ08sZUFBQTs7b0JBQU4sbUJBQVMsSUFBUSxJQUFFO29CQUNuQixDQUFFLFNBQVcsTUFBTTs7O2tCQUNuQixnQkFBQSxNQUNtQjs4QkFEYixTQUFTOztTQUdYO2FBQUYsSUFBRTtLQUFBLENBQ0gsTUFDSyxFQUFBO01BQUosS0FBSTthQUNKLE1BQU07S0FBQTtJQUFBO0dBQUE7O0VBRVYsMkNBQ087O0dBQU4sb0JBQU07R0FDTixzQkFDUSxlQUFBO29CQUFMLFNBQU87dUJBQ0osU0FBTztHQUFBO2tCQUNaLGtCQUFBLE1BQ1k7c0JBRE47O1NBR0Y7TUFBRjthQUNBO0tBQUEsQ0FDRCxNQUNLLEVBQUE7TUFBSixLQUFJO2FBQ0o7S0FBQTtJQUFBO0dBQUE7O0VBRUosdURBQ1k7O0dBQVgsb0JBQU07R0FDTixzQkFDUSxlQUFBO29CQUFMLGdCQUFhLFVBQ1csVUFBQTtLQUF6QixnQkFBUTs7b0JBQ1AsZ0JBQVksVUFDVyxVQUFBO1lBQXhCOzs7a0JBQ0QseUJBQUEsaUJBQWtDLE1BQ1k7OEJBRC9CLE1BQU0sT0FBTztzQkFBWTs7U0FHcEM7TUFBRjthQUNBO0tBQUEsQ0FDRCxNQUFNLE1BQ0s7O09BQUwsUUFBQTtPQUNKLHlCQUFDLEtBQUQsSUFDSztlQUFKLFlBQVUsRUFBRTtPQUFBLE9BQ2IseUJBQUMsT0FBRCxJQUNPO2VBQU4sT0FBRyxjQUFjO09BQUE7Ozs7OztFQUV2QixtREFDVzs7R0FBVixvQkFDQztHQUdELHNCQUNRLGVBQUE7SUFBUCxTQUFLLHVCQUNVOztLQUFkLG9CQUFNOzs7b0JBQ0wsT0FBRyxPQUFRO0lBQ2IsUUFBSSxHQUFHO2FBQVc7O29CQUNoQixZQUFVLE1BQU07b0JBQ2hCLE9BQUksT0FBTTtvQkFDVixnQkFBYSxPQUNRLFVBQUE7S0FBdEIsZ0JBQU87SUFBQTtHQUFBO2tCQUNSLHNCQUFBLEtBQ0k7SUFBSiwrQkFDYzs7S0FBYixrQ0FDTTs7TUFBTCw0QkFBUztNQUNULHdCQUFBOzs7S0FDRCx3Q0FDUzs7TUFBUix3QkFBUSxlQUFBLEVBQ0M7Y0FBUCxLQUFJLE1BQU07Ozs7S0FDYixnQ0FBVyxjQUFjOzs7SUFDMUIsV0FBTyxjQUFjLGVBQWE7V0FDbEMsV0FBUztHQUFBOztFQUVYLDZEQUNnQjs7R0FBZixvQkFBTTtHQUNOLHNCQUNPLGVBQUE7MkJBQUosZ0JBQWEsS0FDTSxVQUFBO0tBQXBCLGtCQUFpQixJQUNLLFVBQUE7TUFBckIsZ0JBQVE7Ozs7a0JBQ1YsMkJBQUEsV0FBbUIsTUFDWTtzQkFETjs7U0FHckI7YUFBRjtLQUFBLENBQ0QsTUFDSyxFQUFBO01BQUosS0FBRyxFQUFHLFFBQVEsdUJBTGhCLHdCQUs2QjtNQUMzQixLQUFHLEVBQUcsVUFBVSx1QkFObEIsd0JBTStCO01BQzdCLGdCQUFPO0tBQUE7SUFBQTtHQUFBOztFQUdWLGtDQUNLOztHQUFKLG9CQUFNO0dBQ04sd0JBQ1UsaUJBQUE7b0JBQVAsT0FBSSxRQUFRLEdBQUksT0FBRywyQkFBZ0I7b0JBQ25DLE9BQUksSUFBSSxPQUFJLDJCQUFpQjtvQkFFN0IsT0FBSSxJQUFJLE9BQUksS0FBTSxTQUFVOztrQkFDOUIsY0FBQSxFQUNHO3NCQUREO1dBRUYsT0FBUSxPQUFPLEVBQUUsaUJBQVMsT0FBRztHQUFBOztFQUUvQixzQ0FDTzs7R0FBTixvQkFDQztHQUdELHdCQUNVLGlCQUFBO29CQUFQLE9BQUksSUFBSSxPQUFJLDZCQUFtQixLQUFLLFNBQUEsRUFDQztZQUF0Qzs7O2tCQUNELGdCQUFHLFFBQVUsUUFDZ0I7c0JBRGxCO3NCQUFVOzZCQUFwQixFQUNELGNBQWM7OztFQUVoQiwrREFDaUI7O0dBQWhCLG9CQUFNO0dBQ04sd0JBQ1UsaUJBQUE7b0JBQVAsT0FBSSxLQUFLLE9BQUcsS0FBTSxtQkFBa0IsMEJBQWU7O2tCQUNyRCw0QkFBQSxXQUFtQixPQUNRO3NCQUREO1dBQzFCLE9BQU8sT0FBUSxTQUFBLEVBQ0M7S0FBZixLQUFHLEVBQUcsUUFBUSx1QkFGZix3QkFFNEI7S0FDM0IsS0FBRyxFQUFHLFVBQVUsdUJBSGpCLHdCQUc4QjtLQUM3QixnQkFBTztJQUFBO0dBQUE7O0VBektYLHdCQUFBO2tCQTRCQSIsImZpbGUiOiJUcnkuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==