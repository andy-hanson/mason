"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Fun","../js","../private/js-impl","../Obj","../Objbang","../Str","./Impl-Type","./Kind","./Method","./Obj-Type","./Type","../bang","../compare","../js","../math/Num","../Try"],function(exports,Fun_0,js_1,js_45impl_2,Obj_3,Obj_33_4,Str_5,Impl_45Type_6,Kind_7,Method_8,Obj_45Type_9,Type_10,_33_11,compare_12,js_13,Num_14,Try_15){
	exports._get=_ms.lazy(function(){
		const Fun=_ms.getDefaultExport(Fun_0),_$3=_ms.getModule(js_1),js_45instanceof=_ms.get(_$3,"js-instanceof"),_$4=_ms.getModule(js_45impl_2),buildStr=_ms.get(_$4,"buildStr"),Obj=_ms.getDefaultExport(Obj_3),_$6=_ms.getModule(Obj_33_4),p_43_33=_ms.get(_$6,"p+!"),Str=_ms.getDefaultExport(Str_5),Impl_45Type=_ms.getDefaultExport(Impl_45Type_6),_$9=_ms.getModule(Kind_7),kind_33=_ms.get(_$9,"kind!"),_$10=_ms.getModule(Method_8),impl_33=_ms.get(_$10,"impl!"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_9),Type=_ms.getDefaultExport(Type_10),_$12=_ms.getModule(Type_10),contains_63=_ms.get(_$12,"contains?"),extract=_ms.get(_$12,"extract"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_11)
		}),_$15=_ms.lazyGetModule(compare_12),_61_63=_ms.lazyProp(_$15,"=?"),_$17=_ms.lazyGetModule(js_13),defined_63=_ms.lazyProp(_$17,"defined?"),Num=_ms.lazy(function(){
			return _ms.getDefaultExport(Num_14)
		}),_$19=_ms.lazyGetModule(Try_15),fails_63=_ms.lazyProp(_$19,"fails?");
		const if_33=_ms.set(function(cond,fun){
			if(_ms.bool(cond)){
				fun()
			} else {
				null
			}
		},"displayName","if!");
		const Wrap_45Type=Obj_45Type(function(){
			const doc="Obj with only one prop (always called `val`).\nThese are useful for wrapping a value with a new type.";
			const props=function(){
				const displayName=Str;
				const prototype=Obj;
				return {
					displayName:displayName,
					prototype:prototype
				}
			}();
			const opt_45props=function(){
				const wrapped_45type=Type;
				return {
					"wrapped-type":wrapped_45type,
					displayName:"opt-props"
				}
			}();
			const extensible=true;
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
			const make_45callable=_ms.set(function(_){
				const src=buildStr(_ms.set(function(add_33){
					add_33("return function ctr(_) {\n\tif (!(this instanceof ctr)) return new ctr(_)\n\tthis.val = _");
					if_33(_ms.unlazy(defined_63)(_["wrapped-type"]),function(){
						return add_33("_ms.checkContains(wrappedType, _, \"val\")")
					});
					return add_33("}")
				},"displayName","src"));
				const f=Fun("wrappedType",src);
				return f(_["wrapped-type"])
			},"displayName","make-callable");
			const test=_ms.set(function(){
				const W=Wrap_45Type(function(){
					const doc="W";
					const wrapped_45type=_ms.unlazy(Num);
					return {
						doc:doc,
						"wrapped-type":wrapped_45type,
						displayName:"W"
					}
				}());
				const w=W(3);
				_ms.unlazy(_33)(_ms.unlazy(_61_63),w.val,3);
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return W("three")
				})
			},"displayName","test");
			return {
				doc:doc,
				props:props,
				"opt-props":opt_45props,
				extensible:extensible,
				defaults:defaults,
				"post-construct":post_45construct,
				"make-callable":make_45callable,
				test:test,
				displayName:"Wrap-Type"
			}
		}());
		kind_33(Wrap_45Type,Impl_45Type);
		impl_33(contains_63,Wrap_45Type,function(wt,_){
			return js_45instanceof(_,wt)
		});
		impl_33(extract,Wrap_45Type,function(wt,_){
			return function(){
				if(_ms.bool(js_45instanceof(_,wt))){
					return [_.val]
				} else {
					return null
				}
			}()
		});
		const displayName=exports.displayName="Wrap-Type";
		exports.default=Wrap_45Type;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL1dyYXAtVHlwZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7RUFxQk0sb0JBQU8sU0FBQSxLQUFLLElBQ0c7R0FDZixZQUFKLE1BQ0k7SUFBSDtHQUFBLE9BRUc7SUFBSDtHQUFBO0VBQUE7RUFFSCxrQkFBWSxxQkFDUTtHQUFuQixVQUNDO0dBRUQsc0JBQ007SUFBTCxrQkFBYTtJQUNiLGdCQUFXO1dBRE47Ozs7O0dBRU4sNEJBQ1U7SUFBVCxxQkFBYztXQUFMOzs7OztHQUNWLGlCQUFZO0dBQ1oseUJBQ1M7SUFBUix3QkFDWSxVQUFBO1lBQVgsV0FBVzs7V0FESjs7Ozs7R0FFVCwrQkFBaUIsU0FBQSxFQUNDO1dBQWpCLFFBQUksWUFBYSxjQUFhO0dBQUE7R0FDL0IsOEJBQWdCLFNBQUEsRUFDQztJQUFoQixVQUFNLGlCQUFVLFNBQUEsT0FDSTtLQUFuQixPQUNDO0tBR0ssNkJBQWMsbUJBQ2lCLFVBQUE7YUFBcEMsT0FBTTtLQUFBO1lBQ1AsT0FBTTtJQUFBO0lBQ1AsUUFBSSxJQUFLLGNBQWE7V0FDdEIsRUFBRTs7R0FDSCxtQkFDTyxVQUFBO0lBQU4sUUFBSSxzQkFDUztLQUFaLFVBQU07S0FDTjtZQURZOzs7Ozs7SUFFYixRQUFJLEVBQUU7dUNBQ0QsTUFBTTt5Q0FFSyxVQUFBO1lBQWYsRUFBRztJQUFBO0dBQUE7VUFoQ2M7Ozs7Ozs7Ozs7OztFQWtDcEIsUUFBTSxZQUFVO0VBQ2hCLFFBQU0sWUFBVSxZQUFXLFNBQUEsR0FBRyxFQUNDO1VBQTlCLGdCQUFjLEVBQUU7RUFBQTtFQUNqQixRQUFNLFFBQVEsWUFBVyxTQUFBLEdBQUcsRUFDQzs7SUFDM0IsWUFBQSxnQkFBYyxFQUFFLEtBQ0U7WUFBakIsQ0FBRTtXQUVDO1lBQUg7SUFBQTtHQUFBO0VBQUE7RUF2RUgsc0NBQUE7a0JBeUVBIiwiZmlsZSI6IlR5cGUvV3JhcC1UeXBlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=