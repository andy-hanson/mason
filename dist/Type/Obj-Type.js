"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","esast/dist/mangle-identifier","../Boolean","../private/bootstrap","../js","../private/js-impl","../compare","../private/js-impl","../Try","./Type"],(exports,mangle_45identifier_0,Boolean_1,bootstrap_2,js_3,js_45impl_4,compare_5,js_45impl_6,Try_7,Type_8)=>{
	exports._get=_ms.lazy(()=>{
		const mangle_45identifier=_ms.getDefaultExport(mangle_45identifier_0),_$3=_ms.getModule(Boolean_1),implies=_ms.get(_$3,"implies"),_$4=_ms.getModule(bootstrap_2),implContains=_ms.get(_$4,"implContains"),pAdd=_ms.get(_$4,"pAdd"),_$5=_ms.getModule(js_3),defined_63=_ms.get(_$5,"defined?"),js_33=_ms.get(_$5,"js!"),js_61_61_61=_ms.get(_$5,"js==="),js_45instanceof=_ms.get(_$5,"js-instanceof"),js_45sub=_ms.get(_$5,"js-sub"),js_45typeof=_ms.get(_$5,"js-typeof"),_$6=_ms.getModule(js_45impl_4),buildStr=_ms.get(_$6,"buildStr"),_$8=_ms.lazyGetModule(compare_5),_61_63=_ms.lazyProp(_$8,"=?"),_$9=_ms.lazyGetModule(js_45impl_6),addOne=_ms.lazyProp(_$9,"addOne"),_$10=_ms.lazyGetModule(Try_7),fails_63=_ms.lazyProp(_$10,"fails?"),_$11=_ms.lazyGetModule(Type_8),type_45of=_ms.lazyProp(_$11,"type-of");
		const flag_63=function flag_63(_){
			return ()=>{
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
				return ! js_61_61_61(desc.value,null)
			};
			const real_45prop_63=function real_45prop_63(props,prop){
				return implies(js_61_61_61(prop,`name`),_ms.lazy(()=>{
					return ()=>{
						return ! js_61_61_61(js_45typeof(js_45sub(props,prop)),`string`)
					}()
				}))
			};
			const access=function access(name){
				return `["${_ms.show(name)}"]`
			};
			const src=buildStr(add_33=>{
				const name=mangle_45identifier(ot.name);
				add_33(`return function ${_ms.show(name)}(_) {\nif (!(this instanceof ${_ms.show(name)})) return new ${_ms.show(name)}(_)`);
				const real_45props=Object.getOwnPropertyNames(ot.props).filter(_=>{
					return real_45prop_63(ot.props,_)
				});
				const extensible=flag_63(ot.extensible);
				if(extensible){
					add_33(`Object.assign(this, _)`)
				};
				for(let prop of real_45props){
					const acc=access(prop);
					if(! _ms.bool(extensible)){
						add_33(`this${_ms.show(acc)} = _${_ms.show(acc)}`)
					};
					const default_63=(defined_63(ot.defaults)&&defined_63(js_45sub(ot.defaults,prop)));
					if(default_63){
						add_33(`if (this${_ms.show(acc)} === undefined) this${_ms.show(acc)} = defaults${_ms.show(acc)}(_)`)
					};
					if(_ms.bool(prop_45has_45type_63(ot.props,prop))){
						add_33(`_ms.checkContains(props${_ms.show(acc)}, this${_ms.show(acc)}, "${_ms.show(prop)}")`)
					} else if(_ms.bool(default_63)){} else {
						add_33(`if (!Object.prototype.hasOwnProperty.call(_, "${_ms.show(prop)}"))\n\tthrow new Error("Forgot to assign ${_ms.show(prop)}.")`)
					}
				};
				if(defined_63(ot["opt-props"])){
					for(let prop of Object.getOwnPropertyNames(ot["opt-props"])){
						if(real_45prop_63(ot["opt-props"],prop)){
							const acc=access(prop);
							add_33(`if (_${_ms.show(acc)} !== undefined) {`);
							if(! _ms.bool(extensible)){
								add_33(`this${_ms.show(acc)} = _${_ms.show(acc)}`)
							};
							if(prop_45has_45type_63(ot["opt-props"],prop)){
								add_33(`_ms.checkContains(optProps${_ms.show(acc)}, this${_ms.show(acc)}, "${_ms.show(prop)}")`)
							};
							add_33(`}`)
						}
					}
				};
				if(! _ms.bool(extensible)){
					const check=`_ms.checkNoExtras(this, _, "${_ms.show(ot.name)}")`;
					if(_ms.bool(defined_63(ot["opt-props"]))){
						add_33(check)
					} else {
						const n_45props=real_45props.length;
						const n_45props_45compare=()=>{
							if(_ms.bool(defined_63(real_45props.name))){
								return `${_ms.show(n_45props)}`
							} else {
								return `(Object.prototype.hasOwnProperty.call(_, "name") ? ${_ms.show(_ms.unlazy(addOne)(n_45props))} : ${_ms.show(n_45props)})`
							}
						}();
						add_33(`if (Object.keys(_).length > ${_ms.show(n_45props_45compare)})  {\n\t${_ms.show(check)}\n\tthrow new Error("Unreachable")\n}`)
					}
				};
				if(defined_63(ot["make-callable"])){
					add_33(`const callBaby = makeCallable(this)\nObject.setPrototypeOf(callBaby, prototype)\ndelete this.name\nObject.assign(callBaby, this)`)
				};
				if(defined_63(ot["post-construct"])){
					const post=()=>{
						if(_ms.bool(defined_63(ot["make-callable"]))){
							return `callBaby`
						} else {
							return `this`
						}
					}();
					add_33(`postConstruct(${_ms.show(post)})`)
				};
				if(defined_63(ot["make-callable"])){
					add_33(`return callBaby`)
				};
				return add_33(`}`)
			});
			const make_45ctr=Function(`prototype`,`props`,`defaults`,`makeCallable`,`postConstruct`,`optProps`,src);
			const ctr=make_45ctr(ot.prototype,ot.props,ot.defaults,ot["make-callable"],ot["post-construct"],ot["opt-props"]);
			pAdd(ctr,`source`,src);
			return ctr
		};
		const obj_45type_45args=()=>{
			const built={};
			const doc=built.doc=`Impl-Type for Objects with specific properties.\nObj-Types are nominal types;\na value must be constructed by calling the Obj-Type in order to be contained by it.\n\nNote that there are Objects whose types are not Obj-Types;\nthese include those of Wrap-Types and those made by constructor Functions, JavaScript-style.`;
			const prototype=built.prototype=Object.create(Object.prototype);
			const props=built.props=()=>{
				const built={};
				const name=built.name=String;
				const props=built.props=Object;
				const prototype=built.prototype=Object;
				return built
			}();
			const opt_45props=built["opt-props"]=()=>{
				const built={};
				const opt_45props=built["opt-props"]=Object;
				const extensible=built.extensible=Boolean;
				const defaults=built.defaults=Object;
				const make_45callable=built["make-callable"]=Function;
				const post_45construct=built["post-construct"]=Function;
				return _ms.setName(built,"opt-props")
			}();
			const extensible=built.extensible=true;
			const defaults=built.defaults=()=>{
				const built={};
				const prototype=built.prototype=function prototype(){
					return Object.create(Object.prototype)
				};
				return _ms.setName(built,"defaults")
			}();
			const post_45construct=built["post-construct"]=function post_45construct(_){
				return pAdd(_.prototype,`constructor`,_)
			};
			const make_45callable=built["make-callable"]=make_45constructor;
			const test=built.test=function test(){
				const Vec2D=Obj_45Type(()=>{
					const built={};
					const props=built.props=()=>{
						const built={};
						const x=built.x=Number;
						const y=built.y=Number;
						return _ms.setName(built,"props")
					}();
					return _ms.setName(built,"Vec2D")
				}());
				const v=Vec2D(()=>{
					const built={};
					const x=built.x=1;
					const y=built.y=2;
					return _ms.setName(built,"v")
				}());
				_ms.assert(_ms.unlazy(_61_63),v.x,1);
				_ms.assert(_ms.unlazy(_61_63),v.y,2);
				_ms.assert(_ms.unlazy(_61_63),_ms.unlazy(type_45of)(v),Vec2D);
				_ms.assert(_ms.unlazy(fails_63),()=>{
					return Vec2D(()=>{
						const built={};
						const x=built.x=`one`;
						const y=built.y=`two`;
						return built
					}())
				});
				_ms.assert(_ms.unlazy(fails_63),()=>{
					return Vec2D(()=>{
						const built={};
						const x=built.x=1;
						return built
					}())
				});
				_ms.assert(_ms.unlazy(fails_63),()=>{
					return Vec2D(()=>{
						const built={};
						const x=built.x=1;
						const y=built.y=2;
						const z=built.z=3;
						return built
					}())
				});
				const Q=Obj_45Type(()=>{
					const built={};
					const props=built.props=()=>{
						const built={};
						const x=built.x=null;
						return _ms.setName(built,"props")
					}();
					const opt_45props=built["opt-props"]=()=>{
						const built={};
						const y=built.y=Number;
						return _ms.setName(built,"opt-props")
					}();
					return _ms.setName(built,"Q")
				}());
				const q=Q(()=>{
					const built={};
					const x=built.x=1;
					const y=built.y=2;
					return _ms.setName(built,"q")
				}());
				_ms.assert(_ms.unlazy(_61_63),q.x,1);
				_ms.assert(_ms.unlazy(_61_63),q.y,2);
				_ms.assert(_ms.unlazy(fails_63),()=>{
					return Q(()=>{
						const built={};
						const x=built.x=1;
						const z=built.z=3;
						return built
					}())
				});
				const Ex=Obj_45Type(()=>{
					const built={};
					const props=built.props=()=>{
						const built={};
						const x=built.x=null;
						return _ms.setName(built,"props")
					}();
					const extensible=built.extensible=true;
					return _ms.setName(built,"Ex")
				}());
				const ex=Ex(()=>{
					const built={};
					const x=built.x=1;
					const y=built.y=2;
					return _ms.setName(built,"ex")
				}());
				_ms.assert(_ms.unlazy(_61_63),ex.y,2)
			};
			return _ms.setName(built,"obj-type-args")
		}();
		const Obj_45Type=make_45constructor(obj_45type_45args)(obj_45type_45args);
		implContains(Obj_45Type,function(_){
			const _this=this;
			return js_45instanceof(_,_this)
		});
		const name=exports.name=`Obj-Type`;
		exports.default=Obj_45Type;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL09iai1UeXBlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBWUEsY0FBUyxpQkFBQSxFQUFBOztJQUNSLFlBQUEsV0FBUSxJQUNDO1lBQVIsTUFBSyxZQUFNLEVBQUU7SUFBQSxPQUVWO1lBQUg7SUFBQTtHQUFBO0VBQUE7RUFFRix5QkFBb0IsNEJBQUEsR0FDRTtHQUFmLDJCQUFrQiw4QkFBQSxNQUFNLEtBQ0k7SUFDakMsV0FBTyxnQ0FBZ0MsTUFBTTtXQUM3QyxFQUFJLFlBQU0sV0FBVztHQUFBO0dBRXRCLHFCQUFjLHdCQUFBLE1BQU0sS0FDSTtXQUN2QixRQUFTLFlBQU0sS0FBTTtnQkFDUTthQUM1QixFQUFJLFlBQU8sWUFBVyxTQUFPLE1BQU0sT0FBUTs7OztHQUU3QyxhQUFVLGdCQUFBLEtBQ0k7V0FBWixjQUFJOztHQUVOLFVBQU0sU0FBVSxRQUNJO0lBQW5CLFdBQU8sb0JBQWtCO0lBRXpCLE9BQ0MsNEJBQWlCLDhDQUNNLCtCQUFvQjtJQUU1QyxtQkFBYywyQkFBMkIsaUJBQWtCLEdBQ0M7WUFBM0QsZUFBVyxTQUFTO0lBQUE7SUFFckIsaUJBQWEsUUFBTTtJQUVuQixHQUFJLFdBQ1U7S0FBYixPQUFNOztJQUVGLFFBQUEsUUFBUSxhQUNVO0tBQXRCLFVBQU0sT0FBTztLQUViLGNBQVEsWUFDVTtNQUFqQixPQUFNLGdCQUFLLG9CQUFTOztLQUVyQixpQkFBVyxDQUFLLFdBQVMsY0FBYyxXQUFVLFNBQU8sWUFBWTtLQUVwRSxHQUFJLFdBQ1E7TUFBWCxPQUFNLG9CQUFTLG9DQUF5QiwyQkFBZ0I7O0tBRzlDLFlBQVYscUJBQWUsU0FBUyxPQUNJO01BQTNCLE9BQU0sbUNBQXdCLHNCQUFXLG1CQUFTO1lBQ25ELFlBQUEsWUFDUSxRQUVKO01BQUgsT0FDQywwREFBZ0QsMERBQ1g7OztJQUV6QyxHQUFJLFdBQVMsaUJBQ1k7S0FBbkIsUUFBQSxRQUFR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