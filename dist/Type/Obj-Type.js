"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","esast/dist/mangle-identifier","../Boolean","../private/bootstrap","../js","../private/js-impl","../bang","../compare","../private/js-impl","../Try","./Type"],function(exports,mangle_45identifier_0,Boolean_1,bootstrap_2,js_3,js_45impl_4,_33_5,compare_6,js_45impl_7,Try_8,Type_9){
	exports._get=_ms.lazy(function(){
		const mangle_45identifier=_ms.getDefaultExport(mangle_45identifier_0),_$3=_ms.getModule(Boolean_1),and=_ms.get(_$3,"and"),implies=_ms.get(_$3,"implies"),not=_ms.get(_$3,"not"),_$4=_ms.getModule(bootstrap_2),implContains=_ms.get(_$4,"implContains"),pAdd=_ms.get(_$4,"pAdd"),_$5=_ms.getModule(js_3),defined_63=_ms.get(_$5,"defined?"),js_33=_ms.get(_$5,"js!"),js_61_61_61=_ms.get(_$5,"js==="),js_45instanceof=_ms.get(_$5,"js-instanceof"),js_45sub=_ms.get(_$5,"js-sub"),js_45typeof=_ms.get(_$5,"js-typeof"),_$6=_ms.getModule(js_45impl_4),buildStr=_ms.get(_$6,"buildStr"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_5)
		}),_$9=_ms.lazyGetModule(compare_6),_61_63=_ms.lazyProp(_$9,"=?"),_$10=_ms.lazyGetModule(js_45impl_7),addOne=_ms.lazyProp(_$10,"addOne"),_$11=_ms.lazyGetModule(Try_8),fails_63=_ms.lazyProp(_$11,"fails?"),_$12=_ms.lazyGetModule(Type_9),type_45of=_ms.lazyProp(_$12,"type-of");
		const flag_63=function flag_63(_){
			return function(){
				if(_ms.bool(defined_63(_))){
					return js_33(js_61_61_61(_,false))
				} else {
					return false
				}
			}()
		};
		const make_45ctr=function make_45ctr(ot){
			const prop_45has_45type_63=function prop_45has_45type_63(props,prop){
				const desc=Object.getOwnPropertyDescriptor(props,prop);
				return not(js_61_61_61(desc.value,null))
			};
			const real_45prop_63=function real_45prop_63(props,prop){
				return implies(js_61_61_61(prop,"name"),_ms.lazy(function(){
					return function(){
						return not(js_61_61_61(js_45typeof(js_45sub(props,prop)),"string"))
					}()
				}))
			};
			const access=function access(name){
				return (("[\""+_ms.show(name))+"\"]")
			};
			const src=buildStr(function(add_33){
				const name=mangle_45identifier(ot.name);
				add_33((((((("return function "+_ms.show(name))+"(_) {\nif (!(this instanceof ")+_ms.show(name))+")) return new ")+_ms.show(name))+"(_)"));
				const real_45props=Object.getOwnPropertyNames(ot.props).filter(function(_){
					return real_45prop_63(ot.props,_)
				});
				const extensible=flag_63(ot.extensible);
				if(_ms.bool(extensible)){
					add_33("Object.assign(this, _)")
				};
				for(let prop of real_45props[Symbol.iterator]()){
					const acc=access(prop);
					if(! _ms.bool(extensible)){
						add_33(((("this"+_ms.show(acc))+" = _")+_ms.show(acc)))
					};
					const default_63=and(defined_63(ot.defaults),_ms.lazy(function(){
						return defined_63(js_45sub(ot.defaults,prop))
					}));
					if(_ms.bool(default_63)){
						add_33((((((("if (this"+_ms.show(acc))+" === undefined) this")+_ms.show(acc))+" = defaults")+_ms.show(acc))+"(_)"))
					};
					if(_ms.bool(prop_45has_45type_63(ot.props,prop))){
						add_33((((((("_ms.checkContains(props"+_ms.show(acc))+", this")+_ms.show(acc))+", \"")+_ms.show(prop))+"\")"))
					} else if(_ms.bool(default_63)){} else {
						add_33((((("if (!Object.prototype.hasOwnProperty.call(_, \""+_ms.show(prop))+"\"))\n\tthrow new Error(\"Forgot to assign ")+_ms.show(prop))+".\")"))
					}
				};
				if(_ms.bool(defined_63(ot["opt-props"]))){
					for(let prop of Object.getOwnPropertyNames(ot["opt-props"])[Symbol.iterator]()){
						if(_ms.bool(real_45prop_63(ot["opt-props"],prop))){
							const acc=access(prop);
							add_33((("if (_"+_ms.show(acc))+" !== undefined) {"));
							if(! _ms.bool(extensible)){
								add_33(((("this"+_ms.show(acc))+" = _")+_ms.show(acc)))
							};
							if(_ms.bool(prop_45has_45type_63(ot["opt-props"],prop))){
								add_33((((((("_ms.checkContains(optProps"+_ms.show(acc))+", this")+_ms.show(acc))+", \"")+_ms.show(prop))+"\")"))
							};
							add_33("}")
						}
					}
				};
				if(! _ms.bool(extensible)){
					const check=(("_ms.checkNoExtras(this, _, \""+_ms.show(ot.name))+"\")");
					if(_ms.bool(defined_63(ot["opt-props"]))){
						add_33(check)
					} else {
						const n_45props=real_45props.length;
						const n_45props_45compare=function(){
							if(_ms.bool(defined_63(real_45props.name))){
								return (""+_ms.show(n_45props))
							} else {
								return (((("(Object.prototype.hasOwnProperty.call(_, \"name\") ? "+_ms.show(_ms.unlazy(addOne)(n_45props)))+" : ")+_ms.show(n_45props))+")")
							}
						}();
						add_33((((("if (Object.keys(_).length > "+_ms.show(n_45props_45compare))+")  {\n\t")+_ms.show(check))+"\n\tthrow new Error(\"Unreachable\")\n}"))
					}
				};
				if(_ms.bool(defined_63(ot["make-callable"]))){
					add_33("const callBaby = makeCallable(this)\nObject.setPrototypeOf(callBaby, prototype)\ndelete this.name\nObject.assign(callBaby, this)")
				};
				if(_ms.bool(defined_63(ot["post-construct"]))){
					const post=function(){
						if(_ms.bool(defined_63(ot["make-callable"]))){
							return "callBaby"
						} else {
							return "this"
						}
					}();
					add_33((("postConstruct("+_ms.show(post))+")"))
				};
				if(_ms.bool(defined_63(ot["make-callable"]))){
					add_33("return callBaby")
				};
				return add_33("}")
			});
			const make_45ctr=Function("prototype","props","defaults","makeCallable","postConstruct","optProps",src);
			const ctr=make_45ctr(ot.prototype,ot.props,ot.defaults,ot["make-callable"],ot["post-construct"],ot["opt-props"]);
			pAdd(ctr,"source",src);
			return ctr
		};
		const obj_45type_45args=function(){
			const doc="Impl-Type for Objects with specific properties.\nObj-Types are nominal types;\na value must be constructed by calling the Obj-Type in order to be contained by it.\n\nNote that there are Objects whose types are not Obj-Types;\nthese include those of Wrap-Types and those made by constructor Functions, JavaScript-style.";
			const prototype=Object.create(Object.prototype);
			const props=function(){
				const name=String;
				const props=Object;
				const prototype=Object;
				return {
					name:name,
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
					name:"opt-props"
				}
			}();
			const defaults=function(){
				const prototype=function prototype(){
					return Object.create(Object.prototype)
				};
				return {
					prototype:prototype,
					name:"defaults"
				}
			}();
			const post_45construct=function post_45construct(_){
				return pAdd(_.prototype,"constructor",_)
			};
			const make_45callable=make_45ctr;
			const test=function test(){
				const Vec2D=Obj_45Type(function(){
					const props=function(){
						const x=Number;
						const y=Number;
						return {
							x:x,
							y:y,
							name:"props"
						}
					}();
					return {
						props:props,
						name:"Vec2D"
					}
				}());
				const v=Vec2D(function(){
					const x=1;
					const y=2;
					return {
						x:x,
						y:y,
						name:"v"
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
							name:"props"
						}
					}();
					const opt_45props=function(){
						const y=Number;
						return {
							y:y,
							name:"opt-props"
						}
					}();
					return {
						props:props,
						"opt-props":opt_45props,
						name:"Q"
					}
				}());
				const q=Q(function(){
					const x=1;
					const y=2;
					return {
						x:x,
						y:y,
						name:"q"
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
							name:"props"
						}
					}();
					const extensible=true;
					return {
						props:props,
						extensible:extensible,
						name:"Ex"
					}
				}());
				const ex=Ex(function(){
					const x=1;
					const y=2;
					return {
						x:x,
						y:y,
						name:"ex"
					}
				}());
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),ex.y,2)
			};
			return {
				doc:doc,
				prototype:prototype,
				props:props,
				"opt-props":opt_45props,
				defaults:defaults,
				"post-construct":post_45construct,
				"make-callable":make_45callable,
				test:test,
				name:"obj-type-args"
			}
		}();
		const Obj_45Type=make_45ctr(obj_45type_45args)(obj_45type_45args);
		implContains(Obj_45Type,function(ot,_){
			return js_45instanceof(_,ot)
		});
		const name=exports.name="Obj-Type";
		exports.default=Obj_45Type;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL09iai1UeXBlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFhQSxjQUFTLGlCQUFBLEVBQUE7O0lBQ1IsWUFBQSxXQUFBLElBQ1M7WUFBUixNQUFLLFlBQU0sRUFBRTtJQUFBLE9BRVY7WUFBSDtJQUFBO0dBQUE7RUFBQTtFQUVGLGlCQUFZLG9CQUFBLEdBQ0U7R0FBUCwyQkFBa0IsOEJBQUEsTUFBTSxLQUNJO0lBQ2pDLFdBQU8sZ0NBQWdDLE1BQU07V0FDN0MsSUFBSyxZQUFNLFdBQVc7R0FBQTtHQUV2QixxQkFBYyx3QkFBQSxNQUFNLEtBQ0k7V0FDdkIsUUFBUyxZQUFNLEtBQU07c0JBQ1E7YUFDNUIsSUFBSyxZQUFPLFlBQVcsU0FBTyxNQUFNLE9BQVE7S0FBQTtJQUFBO0dBQUE7R0FFOUMsYUFBVSxnQkFBQSxLQUNJO1dBQVosaUJBQUk7O0dBRU4sVUFBTSxTQUFVLFNBQUEsT0FDSTtJQUFuQixXQUFPLG9CQUFrQjtJQUV6QixPQUNDLGtDQUFpQixpREFDTSxrQ0FBb0I7SUFFNUMsbUJBQWMsMkJBQTJCLGlCQUFrQixTQUFBLEVBQ0M7WUFBM0QsZUFBVyxTQUFTO0lBQUE7SUFFckIsaUJBQWEsUUFBTTtJQUVuQixZQUFJLFlBQ1U7S0FBYixPQUFNO0lBQUE7SUFFRixRQUFBLFFBQVEsZ0NBQ1U7S0FBdEIsVUFBTSxPQUFPO0tBRWIsY0FBUSxZQUNVO01BQWpCLE9BQU0sbUJBQUssdUJBQVM7S0FBQTtLQUVyQixpQkFBVyxJQUFLLFdBQVM7YUFBZSxXQUFVLFNBQU8sWUFBWTtLQUFBO0tBRXJFLFlBQUksWUFDUTtNQUFYLE9BQU0sMEJBQVMsdUNBQXlCLDhCQUFnQjs7S0FHOUMsWUFBVixxQkFBZSxTQUFTLE9BQ0k7TUFBM0IsT0FBTSx5Q0FBd0IseUJBQVcsdUJBQVM7WUFDbkQsWUFBQSxZQUNRLFFBRUo7TUFBSCxPQUNDLCtEQUFnRCwrREFDWDs7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