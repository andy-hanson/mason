"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","esast/dist/mangle-identifier","../Boolean","../private/bootstrap","../js","../private/js-impl","../bang","../compare","../private/js-impl","../Try","./Type"],function(exports,mangle_45identifier_0,Boolean_1,bootstrap_2,js_3,js_45impl_4,_33_5,compare_6,js_45impl_7,Try_8,Type_9){
	exports._get=_ms.lazy(function(){
		const mangle_45identifier=_ms.getDefaultExport(mangle_45identifier_0),_$3=_ms.getModule(Boolean_1),and=_$3.and,implies=_$3.implies,not=_$3.not,_$4=_ms.getModule(bootstrap_2),implContains=_$4.implContains,pAdd=_$4.pAdd,_$5=_ms.getModule(js_3),defined_63=_$5["defined?"],js_33=_$5["js!"],js_61_61_61=_$5["js==="],js_45instanceof=_$5["js-instanceof"],js_45sub=_$5["js-sub"],js_45typeof=_$5["js-typeof"],_$6=_ms.getModule(js_45impl_4),buildStr=_$6.buildStr,_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_5)
		}),_$9=_ms.lazyGetModule(compare_6),_61_63=_ms.lazyProp(_$9,"=?"),_$10=_ms.lazyGetModule(js_45impl_7),addOne=_ms.lazyProp(_$10,"addOne"),_$11=_ms.lazyGetModule(Try_8),fails_63=_ms.lazyProp(_$11,"fails?"),_$12=_ms.lazyGetModule(Type_9),type_45of=_ms.lazyProp(_$12,"type-of");
		const flag_63=function flag_63(_){
			return function(){
				if(defined_63(_)){
					return js_33(js_61_61_61(_,false))
				} else {
					return false
				}
			}()
		};
		const make_45ctr=function make_45ctr(ot){
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
				if(extensible){
					add_33("Object.assign(this, _)")
				};
				real_45props.forEach(function(prop){
					const acc=access(prop);
					if(! extensible){
						add_33(((("this"+_ms.show(acc))+" = _")+_ms.show(acc)))
					};
					const default_63=and(defined_63(ot.defaults),_ms.lazy(function(){
						return defined_63(js_45sub(ot.defaults,prop))
					}));
					if(default_63){
						add_33((((((("if (this"+_ms.show(acc))+" === undefined) this")+_ms.show(acc))+" = defaults")+_ms.show(acc))+"(_)"))
					}
				});
				if(defined_63(ot["opt-props"])){
					Object.getOwnPropertyNames(ot["opt-props"]).forEach(function(prop){
						if(real_45prop_63(ot["opt-props"],prop)){
							const acc=access(prop);
							add_33((("if (_"+_ms.show(acc))+" !== undefined) {"));
							if(! extensible){
								add_33(((("this"+_ms.show(acc))+" = _")+_ms.show(acc)))
							};
							add_33("}")
						}
					})
				};
				if(defined_63(ot["make-callable"])){
					add_33("const callBaby = makeCallable(this)\nObject.setPrototypeOf(callBaby, prototype)\ndelete this.name\nObject.assign(callBaby, this)")
				};
				if(defined_63(ot["post-construct"])){
					const post=function(){
						if(defined_63(ot["make-callable"])){
							return "callBaby"
						} else {
							return "this"
						}
					}();
					add_33((("postConstruct("+_ms.show(post))+")"))
				};
				if(defined_63(ot["make-callable"])){
					add_33("return callBaby")
				};
				return add_33("}")
			});
			const make_45ctr=Function("prototype","props","defaults","makeCallable","postConstruct","optProps",src);
			const ctr=make_45ctr(ot.prototype,ot.props,ot.defaults,ot["make-callable"],ot["post-construct"],ot["opt-props"]);
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
				const extensible=Boolean;
				return {
					defaults:defaults,
					"make-callable":make_45callable,
					"opt-props":opt_45props,
					"post-construct":post_45construct,
					doc:doc,
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
			return {
				doc:doc,
				prototype:prototype,
				props:props,
				"opt-props":opt_45props,
				defaults:defaults,
				"post-construct":post_45construct,
				"make-callable":make_45callable,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL09iai1UeXBlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFhQSxjQUFTLGlCQUFBLEVBQUE7O0lBQ1IsR0FBQSxXQUFBLEdBQ1M7WUFBUixNQUFLLFlBQU0sRUFBRTtJQUFBLE9BRVY7WUFBSDtJQUFBO0dBQUE7RUFBQTtFQUVGLGlCQUFZLG9CQUFBLEdBQ0U7R0FLYixxQkFBYyx3QkFBQSxNQUFNLEtBQ0k7V0FDdkIsUUFBUyxZQUFNLEtBQU07c0JBQ1E7YUFDNUIsSUFBSyxZQUFPLFlBQVcsU0FBTyxNQUFNLE9BQVE7S0FBQTtJQUFBO0dBQUE7R0FFOUMsYUFBVSxnQkFBQSxLQUNJO1dBQVosaUJBQUk7O0dBRU4sVUFBTSxTQUFVLFNBQUEsT0FDSTtJQUFuQixXQUFPLG9CQUFrQjtJQUV6QixPQUNDLGtDQUFpQixpREFDTSxrQ0FBb0I7SUFFNUMsbUJBQWMsMkJBQTJCLGlCQUFrQixTQUFBLEtBQ0k7WUFBOUQsZUFBVyxTQUFTO0lBQUE7SUFFckIsaUJBQWEsUUFBTTtJQUVuQixHQUFJLFdBQ1U7S0FBYixPQUFNO0lBQUE7SUFFUCxxQkFBb0IsU0FBQSxLQUNJO0tBQXZCLFVBQU0sT0FBTztLQUViLEtBQVEsV0FDVTtNQUFqQixPQUFNLG1CQUFLLHVCQUFTO0tBQUE7S0FFckIsaUJBQVcsSUFBSyxXQUFTO2FBQWUsV0FBVSxTQUFPLFlBQVk7S0FBQTtLQUVyRSxHQUFJLFdBQ1E7TUFBWCxPQUFNLDBCQUFTLHVDQUF5Qiw4QkFBZ0I7OztJQVkxRCxHQUFJLFdBQVMsaUJBQ1k7S0FBdkIsMkJBQTJCLHlCQUF1QixTQUFBLEtBQ0k7TUFBdEQsR0FBSSxlQUFXLGdCQUFhLE1BQ0k7T0FBL0IsVUFBTSxPQUFPO09BQ2IsT0FBTSxtQkFBTTtPQUNaLEtBQVEsV0FDVTtRQUFqQixPQUFNLG1CQUFLLHVCQUFTO09BQUE7T0FJckIsT0FBTTtNQUFBO0tBQUE7SUFBQTtJQXNCVCxHQUFJLFdBQVMscUJBQ2dCO0tBQzVCLE9BQ0M7SUFBQTtJQUtGLEdBQUksV0FBUyxzQkFDaUI7S0FBN0I7TUFDQyxHQUFBLFdBQVMscUJBQ2dCO2NBQXZCO01BQUEsT0FFRTtjQUFGO01BQUE7S0FBQTtLQUNILE9BQU0sNEJBQWU7O0lBRXRCLEdBQUksV0FBUyxxQkFDZ0I7S0FBNUIsT0FBTTtJQUFBO1dBRVAsT0FBTTtHQUFBO0dBRVAsaUJBQVcsU0FBVSxZQUFZLFFBQVEsV0FBVyxlQUFlLGdCQUFnQixXQUFVO0dBQzdGLFVBQU0sV0FBUyxhQUFhLFNBQVMsWUFBWSxvQkFBaUIscUJBQWtCO1VBRXBGO0VBQUE7RUFFRCxrQ0FDZTtHQUFkLFVBQ0M7R0FPRCxnQkFBVyxjQUFjO0dBQ3pCLHNCQUNNO0lBQUwsV0FBTTtJQUNOLFlBQU87SUFDUCxnQkFBVzs7Ozs7OztHQUNaLDRCQUNVO0lBQVQsZUFBVTtJQUVWLHNCQUFlO0lBQ2Ysa0JBQVc7SUFDWCx1QkFBZ0I7SUFDaEIsVUFBSztJQUVMLGlCQUFZOzs7Ozs7Ozs7OztHQUNiLHlCQUNTO0lBQVIsZ0JBQ1ksb0JBQUE7WUFBWCxjQUFjOzs7Ozs7O0dBQ2hCLHVCQUFpQiwwQkFBQSxFQUNDO1dBQWpCLEtBQUssWUFBYSxjQUFhO0dBQUE7R0FDaEMsc0JBQWU7Ozs7Ozs7Ozs7OztFQWtEaEIsaUJBQVksV0FBUyxtQkFBZTtFQUVwQyxhQUFhLFdBQVUsU0FBQSxHQUFHLEVBQ0M7VUFBMUIsZ0JBQWMsRUFBRTtFQUFBO0VBak5qQix3QkFBQTtrQkFtTkEiLCJmaWxlIjoiVHlwZS9PYmotVHlwZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9