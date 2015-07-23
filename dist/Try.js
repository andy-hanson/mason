"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at-Type","./at/q","./cash","./compare","./Function","./private/bootstrap","./Type/Method","./Type/Obj-Type","./Type/Kind","./Type/Pred-Type","./Type/Type","./Type/Wrap-Type","./Function","./cash"],(exports,_64_45Type_0,_63_1,$_2,compare_3,Function_4,bootstrap_5,Method_6,Obj_45Type_7,Kind_8,Pred_45Type_9,Type_10,Wrap_45Type_11,Function_12,$_13)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(_64_45Type_0),empty=_ms.get(_$2,"empty"),_63=_ms.getDefaultExport(_63_1),$=_ms.getDefaultExport($_2),_$4=_ms.getModule($_2),$after=_ms.get(_$4,"$after"),_$5=_ms.getModule(compare_3),_61_63=_ms.get(_$5,"=?"),_$6=_ms.getModule(Function_4),Action=_ms.get(_$6,"Action"),noop=_ms.get(_$6,"noop"),_$7=_ms.getModule(bootstrap_5),ms=_ms.get(_$7,"ms"),_$8=_ms.getModule(Method_6),self_45impl_33=_ms.get(_$8,"self-impl!"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_7),Kind=_ms.getDefaultExport(Kind_8),_$11=_ms.getModule(Pred_45Type_9),Any=_ms.get(_$11,"Any"),Union=_ms.get(_$11,"Union"),Type=_ms.getDefaultExport(Type_10),_$12=_ms.getModule(Type_10),contains_63=_ms.get(_$12,"contains?"),_61_62=_ms.get(_$12,"=>"),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_11),_$15=_ms.lazyGetModule(Function_12),thunk=_ms.lazyProp(_$15,"thunk"),_$16=_ms.lazyGetModule($_13),$rejected=_ms.lazyProp(_$16,"$rejected"),$resolved=_ms.lazyProp(_$16,"$resolved");
		const fail_33=function fail_33(){
			throw _ms.error("An error occurred.")
		};
		const Success=exports.Success=Wrap_45Type(()=>{
			const built={};
			const doc=built.doc=`Attempt that did not fail. _.val is the result of the attempted code.`;
			return _ms.setName(built,"Success")
		}());
		const Try=Kind(()=>{
			const built={};
			const doc=built.doc=`Result of running failable code. Success or Error.`;
			const implementors=built.implementors=[Success,Error];
			return _ms.setName(built,"Try")
		}());
		self_45impl_33(_61_62,Error,ms.error);
		const try_45result=exports["try-result"]=()=>{
			const built={};
			const doc=built.doc=`If \`tried\` throws an error, returns it; else returns Success of its result.\nIf you don't care about the value of the error, use \`?try\` instead.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[_ms.unlazy(thunk)(1)],Success(1));
				_ms.assert(_61_63,try_45result(fail_33).message,`An error occurred.`);
				return built
			};
			return _ms.set(function try_45result(tried){
				_ms.checkContains(Action,tried,"tried");
				return ()=>{
					try {
						return Success(tried())
					}catch(_){
						return _
					}
				}()
			},built)
		}();
		const _63try=exports["?try"]=()=>{
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
				return ()=>{
					try {
						return _63(tried())
					}catch(_){
						noop(_);
						return empty(_63)
					}
				}()
			},built)
		}();
		const fails_63=exports["fails?"]=()=>{
			const built={};
			const doc=built.doc=`Whether the Function throws some error.`;
			const test=built.test=function test(){
				_ms.assert(fails_63,fail_33);
				_ms.assertNot(fails_63,noop)
			};
			return _ms.set(function fails_63(tried){
				_ms.checkContains(Action,tried,"tried");
				return ()=>{
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
		const fails_45with_63=exports["fails-with?"]=()=>{
			const built={};
			const doc=built.doc=`Whether the Function throws an error of the given type or with the given message.`;
			const test=built.test=function test(){
				_ms.assert(fails_45with_63,`message`,()=>{
					throw _ms.error(`message`)
				});
				_ms.assert(fails_45with_63,TypeError,()=>{
					return null["missing-property"]
				})
			};
			return _ms.set(function fails_45with_63(expected_45error,tried){
				_ms.checkContains(_ms.sub(Union,String,Type),expected_45error,"expected-error");
				_ms.checkContains(Action,tried,"tried");
				return ()=>{
					try {
						tried();
						return false
					}catch(error){
						return ()=>{
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
		const error_45type=exports["error-type"]=()=>{
			const built={};
			const doc=built.doc=`Makes an Obj-Type with a \`message\` property,\nand a \`stack\` property automatically filled in on construction.\nVery slow to create, so use only for legitimate errors!`;
			const test=built.test=function test(){
				const ET=error_45type(()=>{
					const built={};
					const doc=built.doc=`ET`;
					return _ms.setName(built,"ET")
				}());
				_ms.assert(_61_63,ET.doc,`ET`);
				const x=ET({
					message:`mess`
				});
				_ms.assert(contains_63,Error,x);
				_ms.assert(_61_63,`mess`,x.message);
				_ms.assert(fails_45with_63,`mess`,()=>{
					throw _ms.error(x)
				})
			};
			return _ms.set(function error_45type(opts){
				const default_45args=()=>{
					const built={};
					const props=built.props=()=>{
						const built={};
						const message=built.message=String;
						const stack=built.stack=null;
						return _ms.setName(built,"props")
					}();
					const defaults=built.defaults=()=>{
						const built={};
						const stack=built.stack=function stack(_){
							return new Error(_.message).stack
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
		const annotate_45errors=exports["annotate-errors"]=()=>{
			const built={};
			const doc=built.doc=`If there are thrown errors, prepends \`annotation\` to their stack and message.`;
			const test=built.test=function test(){
				_ms.assert(fails_45with_63,`ab`,()=>{
					annotate_45errors(`a`,()=>{
						throw _ms.error(`b`)
					})
				})
			};
			return _ms.set(function annotate_45errors(annotation,tried){
				_ms.checkContains(Action,tried,"tried");
				return ()=>{
					try {
						return tried()
					}catch(_){
						_.stack=`${_ms.show(_ms.unlazy(annotation))}${_ms.show(_.stack)}`;
						_.message=`${_ms.show(_ms.unlazy(annotation))}${_ms.show(_.message)}`;
						throw _ms.error(_)
					}
				}()
			},built)
		}();
		const $try=exports.$try=()=>{
			const built={};
			const doc=built.doc=`Success if the $ is resolved, Error if rejected.`;
			const $test=built.$test=function* $test(){
				_ms.assert(_61_63,Success(1),(yield $try(_ms.unlazy($resolved)(1))));
				_ms.assert(_61_63,`a`,(yield $try(_ms.unlazy($rejected)(`a`))).message);
				_ms.assert(_61_63,`a`,(yield $try($.reject(`a`))).message)
			};
			return _ms.set(function $try(_){
				_ms.checkContains($,_,"_");
				return $catch($after(_,Success),_ms.sub(_61_62,Error))
			},built)
		}();
		const $catch=exports.$catch=()=>{
			const built={};
			const doc=built.doc=`If \`$\` succeeds, acts like \`identity\`.\nElse returns a \`$\` for the result of running \`catcher\` on the Error.\nLike for \`$after\`, \`catcher\` can also return another \`$\`.`;
			const $test=built.$test=function* $test(){
				_ms.assert(_61_63,`a`,(yield $catch(_ms.unlazy($rejected)(`a`),_=>{
					return _.message
				})))
			};
			return _ms.set(function $catch(promise,catcher){
				_ms.checkContains($,promise,"promise");
				_ms.checkContains(Function,catcher,"catcher");
				return _ms.checkContains($,promise.catch(catcher),"res")
			},built)
		}();
		const $annotate_45errors=exports["$annotate-errors"]=()=>{
			const built={};
			const doc=built.doc=`Like \`annotate-errors\` but works on errors thrown in a \`$\`.`;
			const $test=built.$test=function* $test(){
				_ms.assert(_61_63,`ab`,(yield $try($annotate_45errors(`a`,_ms.unlazy($rejected)(`b`)))).message)
			};
			return _ms.set(function $annotate_45errors(annotation,$tried){
				_ms.checkContains($,$tried,"$tried");
				return $catch($tried,_=>{
					_.stack=`${_ms.show(_ms.unlazy(annotation))}${_ms.show(_.stack)}`;
					_.message=`${_ms.show(_ms.unlazy(annotation))}${_ms.show(_.message)}`;
					throw _ms.error(_)
				})
			},built)
		}();
		const name=exports.name=`Try`;
		exports.default=Try;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UcnkubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFrQk0sY0FDVSxrQkFBQTtHQUFmOztFQUVELDhCQUFTLGdCQUNTOztHQUFqQixvQkFBTTs7O0VBRVAsVUFBSyxTQUNJOztHQUFSLG9CQUFNO0dBQ04sc0NBQWMsQ0FBRSxRQUFROzs7RUFFekIsZUFBVyxPQUFHLE1BQU07RUFFcEIsNkNBQ1c7O0dBQVYsb0JBQ0M7R0FFRCxzQkFDTyxlQUFBOztvQkFBTixtQkFBUyxJQUFRLFFBQVE7ZUFDakIsT0FBSSxhQUFXLGlCQUFnQjs7O2tCQUN2QyxzQkFBQSxNQUNZO3NCQUROOztTQUdGO2FBQUYsUUFBUTtLQUFBLENBQ1QsTUFDSyxFQUFBO2FBQUo7S0FBQTtJQUFBO0dBQUE7O0VBRUosaUNBQ0s7O0dBQUosb0JBQ0M7R0FHRCxzQkFDTyxlQUFBOztvQkFBTixtQkFBUyxJQUFRLElBQUU7b0JBQ25CLENBQUUsU0FBVyxNQUFNOzs7a0JBQ25CLGdCQUFBLE1BQ21COzhCQURiLFNBQVM7O1NBR1g7YUFBRixJQUFFO0tBQUEsQ0FDSCxNQUNLLEVBQUE7TUFBSixLQUFJO2FBQ0osTUFBTTtLQUFBO0lBQUE7R0FBQTs7RUFFVixxQ0FDTzs7R0FBTixvQkFBTTtHQUNOLHNCQUNRLGVBQUE7ZUFBQyxTQUFPO2tCQUNQLFNBQU87R0FBQTtrQkFDZixrQkFBQSxNQUNZO3NCQUROOztTQUdGO01BQUY7YUFDQTtLQUFBLENBQ0QsTUFDSyxFQUFBO01BQUosS0FBSTthQUNKO0tBQUE7SUFBQTtHQUFBOztFQUVKLGlEQUNZOztHQUFYLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtlQUFDLGdCQUFhLFVBQ1csSUFBQTtLQUEvQixnQkFBUTs7ZUFDRCxnQkFBWSxVQUNXLElBQUE7WUFBOUI7OztrQkFDRCx5QkFBQSxpQkFBa0MsTUFDWTs4QkFEL0IsTUFBTSxPQUFPO3NCQUFZOztTQUdwQztNQUFGO2FBQ0E7S0FBQSxDQUNELE1BQU0sTUFDSzs7T0FBTCxRQUFBO09BQ0oseUJBQUMsS0FBRCxJQUNLO2VBQUosWUFBVSxFQUFFO09BQUEsT0FDYix5QkFBQyxPQUFELElBQ087ZUFBTixPQUFHLGNBQWM7T0FBQTs7Ozs7O0VBRXZCLDZDQUNXOztHQUFWLG9CQUNDO0dBR0Qsc0JBQ1EsZUFBQTtJQUFQLFNBQUssaUJBQ1U7O0tBQWQsb0JBQU07OztlQUNDLE9BQUcsT0FBUTtJQUNuQixRQUFJLEdBQUc7YUFBVzs7ZUFDVixZQUFVLE1BQU07ZUFDaEIsT0FBSSxPQUFNO2VBQ1YsZ0JBQWEsT0FDUSxJQUFBO0tBQTVCLGdCQUFPO0lBQUE7R0FBQTtrQkFDUixzQkFBQSxLQUNJO0lBQUoseUJBQ2M7O0tBQWIsNEJBQ007O01BQUwsNEJBQVM7TUFDVCx3QkFBQTs7O0tBQ0Qsa0NBQ1M7O01BQVIsd0JBQVEsZUFBQSxFQUNDO2NBQVAsSUFBSSxNQUFNOzs7O0tBQ2IsZ0NBQVcsY0FBYzs7O0lBQzFCLFdBQU8sY0FBYyxlQUFhO1dBQ2xDLFdBQVM7R0FBQTs7RUFFWCx1REFDZ0I7O0dBQWYsb0JBQU07R0FDTixzQkFDUSxlQUFBO2VBQUMsZ0JBQWEsS0FDTSxJQUFBO0tBQTFCLGtCQUFpQixJQUNLLElBQUE7TUFBckIsZ0JBQVE7Ozs7a0JBQ1YsMkJBQUEsV0FBbUIsTUFDWTtzQkFETjs7U0FHckI7YUFBRjtLQUFBLENBQ0QsTUFDSyxFQUFBO01BQUosUUFBWSx1QkFMZCx3QkFLMkI7TUFDekIsVUFBYyx1QkFOaEIsd0JBTTZCO01BQzNCLGdCQUFPO0tBQUE7SUFBQTtHQUFBOztFQUdWLDRCQUNLOztHQUFKLG9CQUFNO0dBQ04sd0JBQ1UsaUJBQUE7ZUFBRCxPQUFJLFFBQVEsR0FBSSxPQUFHLDJCQUFnQjtlQUNuQyxPQUFJLElBQUksT0FBSSwyQkFBaUI7ZUFFN0IsT0FBSSxJQUFJLE9BQUksS0FBTSxTQUFVOztrQkFDcEMsY0FBQSxFQUNHO3NCQUREO1dBRUYsT0FBUSxPQUFPLEVBQUUsaUJBQVMsT0FBRztHQUFBOztFQUUvQixnQ0FDTzs7R0FBTixvQkFDQztHQUdELHdCQUNVLGlCQUFBO2VBQUQsT0FBSSxJQUFJLE9BQUksNkJBQW1CLEtBQUssR0FDQztZQUE1Qzs7O2tCQUNELGdCQUFHLFFBQVUsUUFDZ0I7c0JBRGxCO3NCQUFVOzZCQUFwQixFQUNELGNBQWM7OztFQUVoQix5REFDaUI7O0dBQWhCLG9CQUFNO0dBQ04sd0JBQ1UsaUJBQUE7ZUFBRCxPQUFJLEtBQUssT0FBRyxLQUFNLG1CQUFrQiwwQkFBZTs7a0JBQzNELDRCQUFBLFdBQW1CLE9BQ1E7c0JBREQ7V0FDMUIsT0FBTyxPQUFRLEdBQ0M7S0FBZixRQUFZLHVCQUZiLHdCQUUwQjtLQUN6QixVQUFjLHVCQUhmLHdCQUc0QjtLQUMzQixnQkFBTztJQUFBO0dBQUE7O0VBcktYLHdCQUFBO2tCQXdCQSIsImZpbGUiOiJUcnkuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==