"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Bool","../private/bootstrap","../js","../private/js-impl","../bang","../compare","../private/js-impl","../math/Num","../Try","./Type"],function(exports,Bool_0,bootstrap_1,js_2,js_45impl_3,_33_4,compare_5,js_45impl_6,Num_7,Try_8,Type_9){
	exports._get=_ms.lazy(function(){
		const Bool=_ms.getDefaultExport(Bool_0),_$2=_ms.getModule(Bool_0),and=_ms.get(_$2,"and"),implies=_ms.get(_$2,"implies"),not=_ms.get(_$2,"not"),_$3=_ms.getModule(bootstrap_1),Fun=_ms.get(_$3,"Fun"),impl_45contains_63_33=_ms.get(_$3,"impl-contains?!"),Obj=_ms.get(_$3,"Obj"),p_43_33=_ms.get(_$3,"p+!"),Str=_ms.get(_$3,"Str"),_$4=_ms.getModule(js_2),defined_63=_ms.get(_$4,"defined?"),js_33=_ms.get(_$4,"js!"),js_61_61_61=_ms.get(_$4,"js==="),js_45instanceof=_ms.get(_$4,"js-instanceof"),js_45sub=_ms.get(_$4,"js-sub"),js_45typeof=_ms.get(_$4,"js-typeof"),_$5=_ms.getModule(js_45impl_3),buildStr=_ms.get(_$5,"buildStr"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_4)
		}),_$8=_ms.lazyGetModule(compare_5),_61_63=_ms.lazyProp(_$8,"=?"),_$9=_ms.lazyGetModule(js_45impl_6),addOne=_ms.lazyProp(_$9,"addOne"),Num=_ms.lazy(function(){
			return _ms.getDefaultExport(Num_7)
		}),_$11=_ms.lazyGetModule(Try_8),fails_63=_ms.lazyProp(_$11,"fails?"),_$12=_ms.lazyGetModule(Type_9),type_45of=_ms.lazyProp(_$12,"type-of");
		const if_33=function(){
			return _ms.set(function(bool,act){
				if(_ms.bool(bool)){
					act()
				} else {
					null
				}
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
						const desc=Obj.getOwnPropertyDescriptor(props,prop);
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
						const real_45props=Obj.getOwnPropertyNames(ot.props).filter(function(){
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
							} else if(_ms.bool(default_63)){
								null
							} else {
								add_33((((("if (!Object.prototype.hasOwnProperty.call(_, \""+_ms.show(prop))+"\"))\n\tthrow new Error(\"Forgot to assign ")+_ms.show(prop))+".\")"))
							}
						});
						if_33(defined_63(ot["opt-props"]),function(){
							return Obj.getOwnPropertyNames(ot["opt-props"]).forEach(function(prop){
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
				const make_45ctr=Fun("prototype","props","defaults","makeCallable","postConstruct","optProps",src);
				const ctr=make_45ctr(ot.prototype,ot.props,ot.defaults,ot["make-callable"],ot["post-construct"],ot["opt-props"]);
				p_43_33(ctr,"source",src);
				return ctr
			},"displayName","make-ctr")
		}();
		const obj_45type_45args=function(){
			const doc="Impl-Type for Objs with specific properties.\nObj-Types are nominal types;\na value must be constructed by calling the Obj-Type in order to be contained by it.\n-\nNote that there are Objs whose types are not Obj-Types;\nthese include those of Wrap-Types and those made by constructor Funs, JavaScript-style.";
			const prototype=Obj.create(Obj.prototype);
			const props=function(){
				const displayName=Str;
				const props=Obj;
				const prototype=Obj;
				return {
					displayName:displayName,
					props:props,
					prototype:prototype
				}
			}();
			const opt_45props=function(){
				const defaults=Obj;
				const make_45callable=Fun;
				const opt_45props=Obj;
				const post_45construct=Fun;
				const doc=Str;
				const test=Fun;
				const extensible=Bool;
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
						return Obj.create(Obj.prototype)
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
							const x=_ms.unlazy(Num);
							const y=_ms.unlazy(Num);
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
							const y=_ms.unlazy(Num);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL09iai1UeXBlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztFQWFBLHNCQUFPO2tCQUFBLFNBQUEsS0FBSyxJQUNHO0lBQ1QsWUFBSixNQUNJO0tBQUg7SUFBQSxPQUVHOzs7OztFQUVOLHdCQUFTO2tCQUFBLFNBQUEsRUFBQTs7S0FDUixZQUFBLFdBQUEsSUFDUzthQUFSLE1BQUssWUFBTSxFQUFFO0tBQUEsT0FFVjthQUFIO0tBQUE7SUFBQTtHQUFBOztFQUVGLDJCQUFZO2tCQUFBLFNBQUEsR0FDRTtJQUFQLHFDQUFrQjtvQkFBQSxTQUFBLE1BQU0sS0FDSTtNQUNqQyxXQUFPLDZCQUE2QixNQUFNO2FBQzFDLElBQUssWUFBTSxXQUFXO0tBQUE7O0lBRXZCLCtCQUFjO29CQUFBLFNBQUEsTUFBTSxLQUNJO2FBQ3ZCLFFBQVMsWUFBTSxLQUFNO3dCQUNlO2VBQ25DLElBQUssWUFBTyxZQUFXLFNBQU8sTUFBTSxPQUFRO09BQUE7TUFBQTtLQUFBOztJQUU5Qyx1QkFBVTtvQkFBQSxTQUFBLEtBQ0k7YUFBWixpQkFBSTs7O0lBRU4sVUFBTSxtQkFBVTtvQkFBQSxTQUFBLE9BQ0k7TUFBbkIsT0FDQztNQUdELG1CQUFjLHdCQUF3QiwyQkFBa0I7c0JBQUEsU0FBQSxLQUNJO2VBQTNELGVBQVcsU0FBUztPQUFBOztNQUVyQixpQkFBYSxRQUFNO01BRW5CLE1BQUksV0FDWSxVQUFBO2NBQWYsT0FBTTtNQUFBO01BRVAscUJBQW9CLFNBQUEsS0FDSTtPQUF2QixVQUFNLE9BQU87T0FFYixNQUFLLElBQUksWUFDYSxVQUFBO2VBQXJCLE9BQU0sbUJBQUssdUJBQVM7T0FBQTtPQUVyQixpQkFBVyxJQUFLLFdBQVM7ZUFBZSxXQUFVLFNBQU8sWUFBWTtPQUFBO09BRXJFLE1BQUssV0FDVyxVQUFBO2VBQWYsT0FBTSwwQkFBUyx1Q0FBeUIsOEJBQWdCOztPQUc5QyxZ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