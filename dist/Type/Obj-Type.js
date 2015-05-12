"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Bool","../private/bootstrap","../js","../private/js-impl","../bang","../compare","../private/js-impl","../math/Num","../Try","./Type"],function(exports,Bool_0,bootstrap_1,js_2,js_45impl_3,_33_4,compare_5,js_45impl_6,Num_7,Try_8,Type_9){
	exports._get=_ms.lazy(function(){
		const Bool=_ms.getDefaultExport(Bool_0),_$2=_ms.getModule(Bool_0),and=_ms.get(_$2,"and"),implies=_ms.get(_$2,"implies"),not=_ms.get(_$2,"not"),_$3=_ms.getModule(bootstrap_1),Fun=_ms.get(_$3,"Fun"),impl_45contains_63_33=_ms.get(_$3,"impl-contains?!"),Obj=_ms.get(_$3,"Obj"),p_43_33=_ms.get(_$3,"p+!"),Str=_ms.get(_$3,"Str"),_$4=_ms.getModule(js_2),defined_63=_ms.get(_$4,"defined?"),js_33=_ms.get(_$4,"js!"),js_61_61_61=_ms.get(_$4,"js==="),js_45instanceof=_ms.get(_$4,"js-instanceof"),js_45sub=_ms.get(_$4,"js-sub"),js_45typeof=_ms.get(_$4,"js-typeof"),_$5=_ms.getModule(js_45impl_3),buildStr=_ms.get(_$5,"buildStr"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_4)
		}),_$8=_ms.lazyGetModule(compare_5),_61_63=_ms.lazyProp(_$8,"=?"),_$9=_ms.lazyGetModule(js_45impl_6),addOne=_ms.lazyProp(_$9,"addOne"),Num=_ms.lazy(function(){
			return _ms.getDefaultExport(Num_7)
		}),_$11=_ms.lazyGetModule(Try_8),fails_63=_ms.lazyProp(_$11,"fails?"),_$12=_ms.lazyGetModule(Type_9),type_45of=_ms.lazyProp(_$12,"type-of");
		const if_33=_ms.set(function(bool,act){
			if(_ms.bool(bool)){
				act()
			} else {
				null
			}
		},"displayName","if!");
		const flag_63=_ms.set(function(_){
			return function(){
				if(_ms.bool(defined_63(_))){
					return js_33(js_61_61_61(_,false))
				} else {
					return false
				}
			}()
		},"displayName","flag?");
		const make_45ctr=_ms.set(function(ot){
			const prop_45has_45type_63=_ms.set(function(props,prop){
				const desc=Obj.getOwnPropertyDescriptor(props,prop);
				return not(js_61_61_61(desc.value,null))
			},"displayName","prop-has-type?");
			const real_45prop_63=_ms.set(function(props,prop){
				return implies(js_61_61_61(prop,"displayName"),_ms.lazy(function(){
					return function(){
						return not(js_61_61_61(js_45typeof(js_45sub(props,prop)),"string"))
					}()
				}))
			},"displayName","real-prop?");
			const access=_ms.set(function(name){
				return (("[\""+_ms.show(name))+"\"]")
			},"displayName","access");
			const src=buildStr(_ms.set(function(add_33){
				add_33("return function ctr(_) {\nif (!(this instanceof ctr)) return new ctr(_)");
				const real_45props=Obj.getOwnPropertyNames(ot.props).filter(_ms.set(function(prop){
					return real_45prop_63(ot.props,prop)
				},"displayName","real-props"));
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
			},"displayName","src"));
			const make_45ctr=Fun("prototype","props","defaults","makeCallable","postConstruct","optProps",src);
			const ctr=make_45ctr(ot.prototype,ot.props,ot.defaults,ot["make-callable"],ot["post-construct"],ot["opt-props"]);
			p_43_33(ctr,"source",src);
			return ctr
		},"displayName","make-ctr");
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
				const prototype=_ms.set(function(){
					return Obj.create(Obj.prototype)
				},"displayName","prototype");
				return {
					prototype:prototype,
					displayName:"defaults"
				}
			}();
			const post_45construct=_ms.set(function(_){
				return p_43_33(_.prototype,"constructor",_)
			},"displayName","post-construct");
			const make_45callable=make_45ctr;
			const test=_ms.set(function(){
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
			},"displayName","test");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL09iai1UeXBlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztFQWFBLG9CQUFPLFNBQUEsS0FBSyxJQUNHO0dBQ1QsWUFBSixNQUNJO0lBQUg7R0FBQSxPQUVHO0lBQUg7R0FBQTtFQUFBO0VBRUgsc0JBQVMsU0FBQSxFQUFBOztJQUNSLFlBQUEsV0FBQSxJQUNTO1lBQVIsTUFBSyxZQUFNLEVBQUU7SUFBQSxPQUVWO1lBQUg7SUFBQTtHQUFBO0VBQUE7RUFFRix5QkFBWSxTQUFBLEdBQ0U7R0FBUCxtQ0FBa0IsU0FBQSxNQUFNLEtBQ0k7SUFDakMsV0FBTyw2QkFBNkIsTUFBTTtXQUMxQyxJQUFLLFlBQU0sV0FBVztHQUFBO0dBRXZCLDZCQUFjLFNBQUEsTUFBTSxLQUNJO1dBQ3ZCLFFBQVMsWUFBTSxLQUFNO3NCQUNlO2FBQ25DLElBQUssWUFBTyxZQUFXLFNBQU8sTUFBTSxPQUFRO0tBQUE7SUFBQTtHQUFBO0dBRTlDLHFCQUFVLFNBQUEsS0FDSTtXQUFaLGlCQUFJOztHQUVOLFVBQU0saUJBQVUsU0FBQSxPQUNJO0lBQW5CLE9BQ0M7SUFHRCxtQkFBYyx3QkFBd0IseUJBQWtCLFNBQUEsS0FDSTtZQUEzRCxlQUFXLFNBQVM7SUFBQTtJQUVyQixpQkFBYSxRQUFNO0lBRW5CLE1BQUksV0FDWSxVQUFBO1lBQWYsT0FBTTtJQUFBO0lBRVAscUJBQW9CLFNBQUEsS0FDSTtLQUF2QixVQUFNLE9BQU87S0FFYixNQUFLLElBQUksWUFDYSxVQUFBO2FBQXJCLE9BQU0sbUJBQUssdUJBQVM7S0FBQTtLQUVyQixpQkFBVyxJQUFLLFdBQVM7YUFBZSxXQUFVLFNBQU8sWUFBWTtLQUFBO0tBRXJFLE1BQUssV0FDVyxVQUFBO2FBQWYsT0FBTSwwQkFBUyx1Q0FBeUIsOEJBQWdCOztLQUc5QyxZQUFWLHFCQUFlLFNBQVMsT0FDSTtNQUEzQixPQUFNLHlDQUF3Qix5QkFB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