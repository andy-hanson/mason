"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Boolean","../private/bootstrap","../js","../private/js-impl","../bang","../compare","../private/js-impl","../Try","./Type"],function(exports,Boolean_0,bootstrap_1,js_2,js_45impl_3,_33_4,compare_5,js_45impl_6,Try_7,Type_8){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_ms.get(_$2,"and"),implies=_ms.get(_$2,"implies"),not=_ms.get(_$2,"not"),_$3=_ms.getModule(bootstrap_1),impl_45contains_63_33=_ms.get(_$3,"impl-contains?!"),p_43_33=_ms.get(_$3,"p+!"),_$4=_ms.getModule(js_2),defined_63=_ms.get(_$4,"defined?"),js_33=_ms.get(_$4,"js!"),js_61_61_61=_ms.get(_$4,"js==="),js_45instanceof=_ms.get(_$4,"js-instanceof"),js_45sub=_ms.get(_$4,"js-sub"),js_45typeof=_ms.get(_$4,"js-typeof"),_$5=_ms.getModule(js_45impl_3),buildStr=_ms.get(_$5,"buildStr"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_4)
		}),_$8=_ms.lazyGetModule(compare_5),_61_63=_ms.lazyProp(_$8,"=?"),_$9=_ms.lazyGetModule(js_45impl_6),addOne=_ms.lazyProp(_$9,"addOne"),_$10=_ms.lazyGetModule(Try_7),fails_63=_ms.lazyProp(_$10,"fails?"),_$11=_ms.lazyGetModule(Type_8),type_45of=_ms.lazyProp(_$11,"type-of");
		const if_33=function(){
			return _ms.set(function(bool,act){
				if(_ms.bool(bool)){
					act()
				} else {}
			},"displayName","if!")
		}();
		const flag_63=function(){
			return _ms.set(function(_){
				return function(){
					if(_ms.bool(defined_63(_))){
						return js_33(js_61_61_61(_,false))
					} else {
						return false
					}
				}()
			},"displayName","flag?")
		}();
		const make_45ctr=function(){
			return _ms.set(function(ot){
				const prop_45has_45type_63=function(){
					return _ms.set(function(props,prop){
						const desc=Object.getOwnPropertyDescriptor(props,prop);
						return not(js_61_61_61(desc.value,null))
					},"displayName","prop-has-type?")
				}();
				const real_45prop_63=function(){
					return _ms.set(function(props,prop){
						return implies(js_61_61_61(prop,"displayName"),_ms.lazy(function(){
							return function(){
								return not(js_61_61_61(js_45typeof(js_45sub(props,prop)),"string"))
							}()
						}))
					},"displayName","real-prop?")
				}();
				const access=function(){
					return _ms.set(function(name){
						return (("[\""+_ms.show(name))+"\"]")
					},"displayName","access")
				}();
				const src=buildStr(function(){
					return _ms.set(function(add_33){
						add_33("return function ctr(_) {\nif (!(this instanceof ctr)) return new ctr(_)");
						const real_45props=Object.getOwnPropertyNames(ot.props).filter(function(){
							return _ms.set(function(prop){
								return real_45prop_63(ot.props,prop)
							},"displayName","real-props")
						}());
						const extensible=flag_63(ot.extensible);
						if_33(extensible,function(){
							return add_33("Object.assign(this, _)")
						});
						real_45props.forEach(function(prop){
							const acc=access(prop);
							if_33(not(extensible),function(){
								return add_33(((("this"+_ms.show(acc))+" = _")+_ms.show(acc)))
							});
							const default_63=and(defined_63(ot.defaults),_ms.lazy(function(){
								return defined_63(js_45sub(ot.defaults,prop))
							}));
							if_33(default_63,function(){
								return add_33((((((("if (this"+_ms.show(acc))+" === undefined) this")+_ms.show(acc))+" = defaults")+_ms.show(acc))+"(_)"))
							});
							if(_ms.bool(prop_45has_45type_63(ot.props,prop))){
								add_33((((((("_ms.checkContains(props"+_ms.show(acc))+", this")+_ms.show(acc))+", \"")+_ms.show(prop))+"\")"))
							} else if(_ms.bool(default_63)){} else {
								add_33((((("if (!Object.prototype.hasOwnProperty.call(_, \""+_ms.show(prop))+"\"))\n\tthrow new Error(\"Forgot to assign ")+_ms.show(prop))+".\")"))
							}
						});
						if_33(defined_63(ot["opt-props"]),function(){
							return Object.getOwnPropertyNames(ot["opt-props"]).forEach(function(prop){
								return if_33(real_45prop_63(ot["opt-props"],prop),function(){
									const acc=access(prop);
									add_33((("if (_"+_ms.show(acc))+" !== undefined) {"));
									if_33(not(extensible),function(){
										return add_33(((("this"+_ms.show(acc))+" = _")+_ms.show(acc)))
									});
									if_33(prop_45has_45type_63(ot["opt-props"],prop),function(){
										return add_33((((((("_ms.checkContains(optProps"+_ms.show(acc))+", this")+_ms.show(acc))+", \"")+_ms.show(prop))+"\")"))
									});
									return add_33("}")
								})
							})
						});
						if_33(not(extensible),function(){
							const check=(("_ms.checkNoExtras(this, _, \""+_ms.show(ot.displayName))+"\")");
							if(_ms.bool(defined_63(ot["opt-props"]))){
								add_33(check)
							} else {
								const n_45props=real_45props.length;
								const n_45props_45compare=function(){
									if(_ms.bool(defined_63(real_45props.displayName))){
										return (""+_ms.show(n_45props))
									} else {
										return (((("(Object.prototype.hasOwnProperty.call(_, \"displayName\") ? "+_ms.show(_ms.unlazy(addOne)(n_45props)))+" : ")+_ms.show(n_45props))+")")
									}
								}();
								add_33((((("if (Object.keys(_).length > "+_ms.show(n_45props_45compare))+")  {\n\t")+_ms.show(check))+"\n\tthrow new Error(\"Unreachable\")\n}"))
							}
						});
						if_33(defined_63(ot["make-callable"]),function(){
							return add_33("var callBaby = makeCallable(this)\nObject.setPrototypeOf(callBaby, prototype)\nObject.assign(callBaby, this)")
						});
						if_33(defined_63(ot["post-construct"]),function(){
							const post=function(){
								if(_ms.bool(defined_63(ot["make-callable"]))){
									return "callBaby"
								} else {
									return "this"
								}
							}();
							return add_33((("postConstruct("+_ms.show(post))+")"))
						});
						if_33(defined_63(ot["make-callable"]),function(){
							return add_33("return callBaby")
						});
						return add_33("}")
					},"displayName","src")
				}());
				const make_45ctr=Function("prototype","props","defaults","makeCallable","postConstruct","optProps",src);
				const ctr=make_45ctr(ot.prototype,ot.props,ot.defaults,ot["make-callable"],ot["post-construct"],ot["opt-props"]);
				p_43_33(ctr,"source",src);
				return ctr
			},"displayName","make-ctr")
		}();
		const obj_45type_45args=function(){
			const doc="Impl-Type for Objects with specific properties.\nObj-Types are nominal types;\na value must be constructed by calling the Obj-Type in order to be contained by it.\n\nNote that there are Objects whose types are not Obj-Types;\nthese include those of Wrap-Types and those made by constructor Functions, JavaScript-style.";
			const prototype=Object.create(Object.prototype);
			const props=function(){
				const displayName=String;
				const props=Object;
				const prototype=Object;
				return {
					displayName:displayName,
					props:props,
					prototype:prototype
				}
			}();
			const opt_45props=function(){
				const defaults=Object;
				const make_45callable=Function;
				const opt_45props=Object;
				const post_45construct=Function;
				const doc=String;
				const test=Function;
				const extensible=Boolean;
				return {
					defaults:defaults,
					"make-callable":make_45callable,
					"opt-props":opt_45props,
					"post-construct":post_45construct,
					doc:doc,
					test:test,
					extensible:extensible,
					displayName:"opt-props"
				}
			}();
			const defaults=function(){
				const prototype=function(){
					return _ms.set(function(){
						return Object.create(Object.prototype)
					},"displayName","prototype")
				}();
				return {
					prototype:prototype,
					displayName:"defaults"
				}
			}();
			const post_45construct=function(){
				return _ms.set(function(_){
					return p_43_33(_.prototype,"constructor",_)
				},"displayName","post-construct")
			}();
			const make_45callable=make_45ctr;
			const test=function(){
				return _ms.set(function(){
					const Vec2D=Obj_45Type(function(){
						const props=function(){
							const x=Number;
							const y=Number;
							return {
								x:x,
								y:y,
								displayName:"props"
							}
						}();
						return {
							props:props,
							displayName:"Vec2D"
						}
					}());
					const v=Vec2D(function(){
						const x=1;
						const y=2;
						return {
							x:x,
							y:y,
							displayName:"v"
						}
					}());
					_ms.unlazy(_33)(_ms.unlazy(_61_63),v.x,1);
					_ms.unlazy(_33)(_ms.unlazy(_61_63),v.y,2);
					_ms.unlazy(_33)(_ms.unlazy(_61_63),_ms.unlazy(type_45of)(v),Vec2D);
					_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
						return Vec2D(function(){
							const x="one";
							const y="two";
							return {
								x:x,
								y:y
							}
						}())
					});
					_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
						return Vec2D(function(){
							const x=1;
							return {
								x:x
							}
						}())
					});
					_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
						return Vec2D(function(){
							const x=1;
							const y=2;
							const z=3;
							return {
								x:x,
								y:y,
								z:z
							}
						}())
					});
					const Q=Obj_45Type(function(){
						const props=function(){
							const x=null;
							return {
								x:x,
								displayName:"props"
							}
						}();
						const opt_45props=function(){
							const y=Number;
							return {
								y:y,
								displayName:"opt-props"
							}
						}();
						return {
							props:props,
							"opt-props":opt_45props,
							displayName:"Q"
						}
					}());
					const q=Q(function(){
						const x=1;
						const y=2;
						return {
							x:x,
							y:y,
							displayName:"q"
						}
					}());
					_ms.unlazy(_33)(_ms.unlazy(_61_63),q.x,1);
					_ms.unlazy(_33)(_ms.unlazy(_61_63),q.y,2);
					_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
						return Q(function(){
							const x=1;
							const z=3;
							return {
								x:x,
								z:z
							}
						}())
					});
					const Ex=Obj_45Type(function(){
						const props=function(){
							const x=null;
							return {
								x:x,
								displayName:"props"
							}
						}();
						const extensible=true;
						return {
							props:props,
							extensible:extensible,
							displayName:"Ex"
						}
					}());
					const ex=Ex(function(){
						const x=1;
						const y=2;
						return {
							x:x,
							y:y,
							displayName:"ex"
						}
					}());
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),ex.y,2)
				},"displayName","test")
			}();
			return {
				doc:doc,
				prototype:prototype,
				props:props,
				"opt-props":opt_45props,
				defaults:defaults,
				"post-construct":post_45construct,
				"make-callable":make_45callable,
				test:test,
				displayName:"obj-type-args"
			}
		}();
		const Obj_45Type=make_45ctr(obj_45type_45args)(obj_45type_45args);
		impl_45contains_63_33(Obj_45Type,function(ot,_){
			return js_45instanceof(_,ot)
		});
		const displayName=exports.displayName="Obj-Type";
		exports.default=Obj_45Type;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL09iai1UeXBlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFZQSxzQkFBTztrQkFBQSxTQUFBLEtBQUssSUFDRztJQUNULFlBQUosTUFDSTtLQUFIO0lBQUEsT0FFRztHQUFBOztFQUVOLHdCQUFTO2tCQUFBLFNBQUEsRUFBQTs7S0FDUixZQUFBLFdBQUEsSUFDUzthQUFSLE1BQUssWUFBTSxFQUFFO0tBQUEsT0FFVjthQUFIO0tBQUE7SUFBQTtHQUFBOztFQUVGLDJCQUFZO2tCQUFBLFNBQUEsR0FDRTtJQUFQLHFDQUFrQjtvQkFBQSxTQUFBLE1BQU0sS0FDSTtNQUNqQyxXQUFPLGdDQUFnQyxNQUFNO2FBQzdDLElBQUssWUFBTSxXQUFXO0tBQUE7O0lBRXZCLCtCQUFjO29CQUFBLFNBQUEsTUFBTSxLQUNJO2FBQ3ZCLFFBQVMsWUFBTSxLQUFNO3dCQUNlO2VBQ25DLElBQUssWUFBTyxZQUFXLFNBQU8sTUFBTSxPQUFRO09BQUE7TUFBQTtLQUFBOztJQUU5Qyx1QkFBVTtvQkFBQSxTQUFBLEtBQ0k7YUFBWixpQkFBSTs7O0lBRU4sVUFBTSxtQkFBVTtvQkFBQSxTQUFBLE9BQ0k7TUFBbkIsT0FDQztNQUdELG1CQUFjLDJCQUEyQiwyQkFBa0I7c0JBQUEsU0FBQSxLQUNJO2VBQTlELGVBQVcsU0FBUztPQUFBOztNQUVyQixpQkFBYSxRQUFNO01BRW5CLE1BQUksV0FDWSxVQUFBO2NBQWYsT0FBTTtNQUFBO01BRVAscUJBQW9CLFNBQUEsS0FDSTtPQUF2QixVQUFNLE9BQU87T0FFYixNQUFLLElBQUksWUFDYSxVQUFBO2VBQXJCLE9BQU0sbUJBQUssdUJBQVM7T0FBQTtPQUVyQixpQkFBVyxJQUFLLFdBQVM7ZUFBZSxXQUFVLFNBQU8sWUFBWTtPQUFBO09BRXJFLE1BQUssV0FDVyxVQUFBO2VBQWYsT0FBTSwwQkFBUyx1Q0FBeUIsOEJBQWdCOztPQUc5QyxZQUFWLHFCQUFlLFNBQVMsT0FDSTtRQUEzQixPQUFNLHlDQUF3Qix5QkFBVyx1QkFBUztjQUNuRCxZQUFBLFlBQ1EsUUFFSjtRQUFILE9BQ0MsK0RBQWdELCtEQUNYOzs7TUFFekMsTUFBSyxXQUFTLGlCQUNlLFVBQUE7Y0FBM0IsMkJBQTJCLHlCQUF1QixTQUFBLEtBQ0k7ZUFBdEQsTUFBSyxlQUFXLGdCQUFhLE1BQ08sVUFBQTtTQUFuQyxVQUFNLE9BQU87U0FDYixPQUFNLG1CQUFNO1NBQ1osTUFBSyxJQUFJLFlBQ2EsVUFBQTtpQkFBckIsT0FBTSxtQkFBSyx1QkFBUztTQUFBO1NBQ2YsTUFBSyxxQkFBZSxnQkFBYSxNQUNPLFVBQUE7aUJBQzdDLE9BQU0sNENBQTJCLHlCQUFXLHVCQUFTOztnQkFDdEQsT0FBTTtRQUFBO09BQUE7TUFBQTtNQUVILE1BQUssSUFBSSxZQUNhLFVBQUE7T0FBM0IsWUFBUywyQ0FBOEI7T0FFbEMsWUFBSixXQUFTLGtCQUNZO1FBQXBCLE9BQUs7T0FBQSxPQUVGO1FBQUgsZ0JBQVU7UUFDVjtTQUNDLFlBQUEsV0FBUywyQkFDc0I7aUJBQTdCLENBcERJLFlBb0RIO1NBQUEsT0FFQztpQkFBRiwrRkFBb0UsNkJBQVk7OztRQUVuRixPQUNDLDRDQUE2QiwyQ0FDM0I7OztNQUlOLE1BQUssV0FBUyxxQkFDbUIsVUFBQTtjQUFoQyxPQUNDO01BQUE7TUFJRixNQUFLLFdBQVMsc0JBQ29CLFVBQUE7T0FBakM7UUFDQyxZQUFBLFdBQVMsc0JBQ2dCO2dCQUF2QjtRQUFBLE9BRUU7Z0JBQUY7UUFBQTtPQUFBO2NBQ0gsT0FBTSw0QkFBZTs7TUFFdEIsTUFBSyxXQUFTLHFCQUNtQixVQUFBO2NBQWhDLE9BQU07TUFBQTthQUVQLE9BQU07S0FBQTs7SUFFUCxpQkFBVyxTQUFVLFlBQVksUUFBUSxXQUFXLGVBQWUsZ0JBQWdCLFdBQVU7SUFDN0YsVUFBTSxXQUFTLGFBQWEsU0FBUyxZQUFZLG9CQUFpQixxQkFBa0I7SUFDOUUsUUFBSSxJQUFLLFNBQVE7V0FDdkI7R0FBQTs7RUFFRCxrQ0FDZTtHQUFkLFVBQ0M7R0FPRCxnQkFBVyxjQUFjO0dBQ3pCLHNCQUNNO0lBQUwsa0JBQWE7SUFDYixZQUFPO0lBQ1AsZ0JBQVc7Ozs7Ozs7R0FDWiw0QkFDVTtJQUFULGVBQVU7SUFFVixzQkFBZTtJQUNmLGtCQUFXO0lBQ1gsdUJBQWdCO0lBQ2hCLFVBQUs7SUFDTCxXQUFNO0lBQ04saUJBQVk7Ozs7Ozs7Ozs7OztHQUNiLHlCQUNTO0lBQVIsMEJBQ1k7b0JBQUEsVUFBQTthQUFYLGNBQWM7Ozs7Ozs7O0dBQ2hCLGlDQUFpQjttQkFBQSxTQUFBLEVBQ0M7WUFBakIsUUFBSSxZQUFhLGNBQWE7SUFBQTs7R0FDL0Isc0JBQWU7R0FDZixxQkFDTzttQkFBQSxVQUFBO0tBQU4sWUFBUSxxQkFDUTtNQUFmLHNCQUNNO09BQUwsUUFBRztPQUNILFFBQUc7Ozs7Ozs7Ozs7OztLQUNMLFFBQUksZ0JBQ0s7TUFBUixRQUFHO01BQ0gsUUFBRzs7Ozs7Ozt3Q0FDQyxJQUFJO3dDQUNKLElBQUk7OERBQ0ssR0FBRzswQ0FFUCxVQUFBO2FBQVQsZ0JBQ0s7T0FBSixRQUFJO09BQ0osUUFBSTs7Ozs7OzswQ0FFSSxVQUFBO2FBQVQsZ0JBQ0s7T0FBSixRQUFHOzs7Ozs7MENBRUssVUFBQTthQUFULGdCQUNLO09BQUosUUFBRztPQUNILFFBQUc7T0FDSCxRQUFHOzs7Ozs7OztLQUVMLFFBQUkscUJBQ1E7TUFBWCxzQkFDTTtPQUFMLFFBQUE7Ozs7OztNQUNELDRCQUNVO09BQVQsUUFBRzs7Ozs7Ozs7Ozs7O0tBQ0wsUUFBSSxZQUNDO01BQUosUUFBRztNQUNILFFBQUc7Ozs7Ozs7d0NBQ0MsSUFBSTt3Q0FDSixJQUFJOzBDQUVDLFVBQUE7YUFBVCxZQUNDO09BQUEsUUFBRztPQUNILFFBQUc7Ozs7Ozs7S0FFTCxTQUFLLHFCQUNRO01BQVosc0JBQ007T0FBTCxRQUFBOzs7Ozs7TUFDRCxpQkFBWTs7Ozs7OztLQUNiLFNBQUssYUFDRTtNQUFOLFFBQUc7TUFDSCxRQUFHOzs7Ozs7OytDQUNDLEtBQUs7SUFBQTs7Ozs7Ozs7Ozs7Ozs7RUFHWixpQkFBWSxXQUFTLG1CQUFlO0VBRXBDLHNCQUFnQixXQUFVLFNBQUEsR0FBRyxFQUNDO1VBQTdCLGdCQUFjLEVBQUU7RUFBQTtFQWxOakIsc0NBQUE7a0JBb05BIiwiZmlsZSI6IlR5cGUvT2JqLVR5cGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==