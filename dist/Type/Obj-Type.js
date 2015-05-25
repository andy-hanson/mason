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
		const make_45constructor=function make_45constructor(ot){
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
			const built={};
			const doc=built.doc="Impl-Type for Objects with specific properties.\nObj-Types are nominal types;\na value must be constructed by calling the Obj-Type in order to be contained by it.\n\nNote that there are Objects whose types are not Obj-Types;\nthese include those of Wrap-Types and those made by constructor Functions, JavaScript-style.";
			const prototype=built.prototype=Object.create(Object.prototype);
			const props=built.props=function(){
				const built={};
				const name=built.name=String;
				const props=built.props=Object;
				const prototype=built.prototype=Object;
				return built
			}();
			const opt_45props=built["opt-props"]=function(){
				const built={};
				const opt_45props=built["opt-props"]=Object;
				const extensible=built.extensible=Boolean;
				const defaults=built.defaults=Object;
				const make_45callable=built["make-callable"]=Function;
				const post_45construct=built["post-construct"]=Function;
				return _ms.setName(built,"opt-props")
			}();
			const extensible=built.extensible=true;
			const defaults=built.defaults=function(){
				const built={};
				const prototype=built.prototype=function prototype(){
					return Object.create(Object.prototype)
				};
				return _ms.setName(built,"defaults")
			}();
			const post_45construct=built["post-construct"]=function post_45construct(_){
				return pAdd(_.prototype,"constructor",_)
			};
			const make_45callable=built["make-callable"]=make_45constructor;
			const test=built.test=function test(){
				const Vec2D=Obj_45Type(function(){
					const built={};
					const props=built.props=function(){
						const built={};
						const x=built.x=Number;
						const y=built.y=Number;
						return _ms.setName(built,"props")
					}();
					return _ms.setName(built,"Vec2D")
				}());
				const v=Vec2D(function(){
					const built={};
					const x=built.x=1;
					const y=built.y=2;
					return _ms.setName(built,"v")
				}());
				_ms.unlazy(_33)(_ms.unlazy(_61_63),v.x,1);
				_ms.unlazy(_33)(_ms.unlazy(_61_63),v.y,2);
				_ms.unlazy(_33)(_ms.unlazy(_61_63),_ms.unlazy(type_45of)(v),Vec2D);
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return Vec2D(function(){
						const built={};
						const x=built.x="one";
						const y=built.y="two";
						return built
					}())
				});
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return Vec2D(function(){
						const built={};
						const x=built.x=1;
						return built
					}())
				});
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return Vec2D(function(){
						const built={};
						const x=built.x=1;
						const y=built.y=2;
						const z=built.z=3;
						return built
					}())
				});
				const Q=Obj_45Type(function(){
					const built={};
					const props=built.props=function(){
						const built={};
						const x=built.x=null;
						return _ms.setName(built,"props")
					}();
					const opt_45props=built["opt-props"]=function(){
						const built={};
						const y=built.y=Number;
						return _ms.setName(built,"opt-props")
					}();
					return _ms.setName(built,"Q")
				}());
				const q=Q(function(){
					const built={};
					const x=built.x=1;
					const y=built.y=2;
					return _ms.setName(built,"q")
				}());
				_ms.unlazy(_33)(_ms.unlazy(_61_63),q.x,1);
				_ms.unlazy(_33)(_ms.unlazy(_61_63),q.y,2);
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return Q(function(){
						const built={};
						const x=built.x=1;
						const z=built.z=3;
						return built
					}())
				});
				const Ex=Obj_45Type(function(){
					const built={};
					const props=built.props=function(){
						const built={};
						const x=built.x=null;
						return _ms.setName(built,"props")
					}();
					const extensible=built.extensible=true;
					return _ms.setName(built,"Ex")
				}());
				const ex=Ex(function(){
					const built={};
					const x=built.x=1;
					const y=built.y=2;
					return _ms.setName(built,"ex")
				}());
				_ms.unlazy(_33)(_ms.unlazy(_61_63),ex.y,2)
			};
			return _ms.setName(built,"obj-type-args")
		}();
		const Obj_45Type=make_45constructor(obj_45type_45args)(obj_45type_45args);
		implContains(Obj_45Type,function(ot,_){
			return js_45instanceof(_,ot)
		});
		const name=exports.name="Obj-Type";
		exports.default=Obj_45Type;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL09iai1UeXBlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFhQSxjQUFTLGlCQUFBLEVBQUE7O0lBQ1IsWUFBQSxXQUFRLElBQ0M7WUFBUixNQUFLLFlBQU0sRUFBRTtJQUFBLE9BRVY7WUFBSDtJQUFBO0dBQUE7RUFBQTtFQUVGLHlCQUFvQiw0QkFBQSxHQUNFO0dBQWYsMkJBQWtCLDhCQUFBLE1BQU0sS0FDSTtJQUNqQyxXQUFPLGdDQUFnQyxNQUFNO1dBQzdDLElBQUssWUFBTSxXQUFXO0dBQUE7R0FFdkIscUJBQWMsd0JBQUEsTUFBTSxLQUNJO1dBQ3ZCLFFBQVMsWUFBTSxLQUFNO3NCQUNRO2FBQzVCLElBQUssWUFBTyxZQUFXLFNBQU8sTUFBTSxPQUFRO0tBQUE7SUFBQTtHQUFBO0dBRTlDLGFBQVUsZ0JBQUEsS0FDSTtXQUFaLGlCQUFJOztHQUVOLFVBQU0sU0FBVSxTQUFBLE9BQ0k7SUFBbkIsV0FBTyxvQkFBa0I7SUFFekIsT0FDQyxrQ0FBaUIsaURBQ00sa0NBQW9CO0lBRTVDLG1CQUFjLDJCQUEyQixpQkFBa0IsU0FBQSxFQUNDO1lBQTNELGVBQVcsU0FBUztJQUFBO0lBRXJCLGlCQUFhLFFBQU07SUFFbkIsWUFBSSxZQUNVO0tBQWIsT0FBTTtJQUFBO0lBRUYsUUFBQSxRQUFRLGdDQUNVO0tBQXRCLFVBQU0sT0FBTztLQUViLGNBQVEsWUFDVTtNQUFqQixPQUFNLG1CQUFLLHVCQUFTO0tBQUE7S0FFckIsaUJBQVcsSUFBSyxXQUFTO2FBQWUsV0FBVSxTQUFPLFlBQVk7S0FBQTtLQUVyRSxZQUFJLFlBQ1E7TUFBWCxPQUFNLDBCQUFTLHVDQUF5Qiw4QkFBZ0I7O0tBRzlDLFlBQVYscUJBQWUsU0FBUyxPQUNJO01BQTNCLE9BQU0seUNBQXdCLHlCQUFXLHVCQUFTO1lBQ25ELFlBQUEsWUFDUSxRQUVKO01BQUgsT0FDQywrREFBZ0QsK0RBQ1g7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