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
				const real_45props=Object.getOwnPropertyNames(ot.props).filter(function(prop){
					return real_45prop_63(ot.props,prop)
				});
				const extensible=flag_63(ot.extensible);
				if(_ms.bool(extensible)){
					add_33("Object.assign(this, _)")
				};
				real_45props.forEach(function(prop){
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
				});
				if(_ms.bool(defined_63(ot["opt-props"]))){
					Object.getOwnPropertyNames(ot["opt-props"]).forEach(function(prop){
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
					})
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL09iai1UeXBlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFhQSxjQUFTLGlCQUFBLEVBQUE7O0lBQ1IsWUFBQSxXQUFBLElBQ1M7WUFBUixNQUFLLFlBQU0sRUFBRTtJQUFBLE9BRVY7WUFBSDtJQUFBO0dBQUE7RUFBQTtFQUVGLGlCQUFZLG9CQUFBLEdBQ0U7R0FBUCwyQkFBa0IsOEJBQUEsTUFBTSxLQUNJO0lBQ2pDLFdBQU8sZ0NBQWdDLE1BQU07V0FDN0MsSUFBSyxZQUFNLFdBQVc7R0FBQTtHQUV2QixxQkFBYyx3QkFBQSxNQUFNLEtBQ0k7V0FDdkIsUUFBUyxZQUFNLEtBQU07c0JBQ1E7YUFDNUIsSUFBSyxZQUFPLFlBQVcsU0FBTyxNQUFNLE9BQVE7S0FBQTtJQUFBO0dBQUE7R0FFOUMsYUFBVSxnQkFBQSxLQUNJO1dBQVosaUJBQUk7O0dBRU4sVUFBTSxTQUFVLFNBQUEsT0FDSTtJQUFuQixXQUFPLG9CQUFrQjtJQUV6QixPQUNDLGtDQUFpQixpREFDTSxrQ0FBb0I7SUFFNUMsbUJBQWMsMkJBQTJCLGlCQUFrQixTQUFBLEtBQ0k7WUFBOUQsZUFBVyxTQUFTO0lBQUE7SUFFckIsaUJBQWEsUUFBTTtJQUVuQixZQUFJLFlBQ1U7S0FBYixPQUFNO0lBQUE7SUFFUCxxQkFBb0IsU0FBQSxLQUNJO0tBQXZCLFVBQU0sT0FBTztLQUViLGNBQVEsWUFDVTtNQUFqQixPQUFNLG1CQUFLLHVCQUFTO0tBQUE7S0FFckIsaUJBQVcsSUFBSyxXQUFTO2FBQWUsV0FBVSxTQUFPLFlBQVk7S0FBQTtLQUVyRSxZQUFJLFlBQ1E7TUFBWCxPQUFNLDBCQUFTLHVDQUF5Qiw4QkFBZ0I7O0tBRzlDLFlBQVYscUJBQWUsU0FBUyxPQUNJO01BQTNCLE9BQU0seUNBQXdCLHlCQUFXLHVCQUFTO1lBQ25ELFlBQUEsWUFDUSxRQUVKO01BQUgsT0FDQywrREFBZ0QsK0RBQ1g7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