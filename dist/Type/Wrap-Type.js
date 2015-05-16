"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../js","../private/js-impl","../Objectbang","./Impl-Type","./Kind","./Method","./Obj-Type","./Type","../bang","../compare","../js","../Try"],function(exports,js_0,js_45impl_1,Object_33_2,Impl_45Type_3,Kind_4,Method_5,Obj_45Type_6,Type_7,_33_8,compare_9,js_10,Try_11){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(js_0),js_45instanceof=_ms.get(_$2,"js-instanceof"),_$3=_ms.getModule(js_45impl_1),buildStr=_ms.get(_$3,"buildStr"),_$4=_ms.getModule(Object_33_2),p_43_33=_ms.get(_$4,"p+!"),Impl_45Type=_ms.getDefaultExport(Impl_45Type_3),_$6=_ms.getModule(Kind_4),kind_33=_ms.get(_$6,"kind!"),_$7=_ms.getModule(Method_5),impl_33=_ms.get(_$7,"impl!"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_6),Type=_ms.getDefaultExport(Type_7),_$9=_ms.getModule(Type_7),contains_63=_ms.get(_$9,"contains?"),extract=_ms.get(_$9,"extract"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_8)
		}),_$12=_ms.lazyGetModule(compare_9),_61_63=_ms.lazyProp(_$12,"=?"),_$14=_ms.lazyGetModule(js_10),defined_63=_ms.lazyProp(_$14,"defined?"),_$15=_ms.lazyGetModule(Try_11),fails_63=_ms.lazyProp(_$15,"fails?");
		const if_33=function if_33(cond,fun){
			if(_ms.bool(cond)){
				fun()
			} else {}
		};
		const Wrap_45Type=Obj_45Type(function(){
			const doc="Object with only one prop (always called `val`).\nThese are useful for wrapping a value with a new type.";
			const props=function(){
				const name=String;
				const prototype=Object;
				return {
					name:name,
					prototype:prototype
				}
			}();
			const opt_45props=function(){
				const wrapped_45type=Type;
				return {
					"wrapped-type":wrapped_45type,
					name:"opt-props"
				}
			}();
			const extensible=true;
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
				return p_43_33(_.prototype,"constructor",_)
			};
			const make_45callable=function make_45callable(_){
				const src=buildStr(function(add_33){
					add_33("return function ctr(_) {\n\tif (!(this instanceof ctr)) return new ctr(_)\n\tthis.val = _");
					if_33(_ms.unlazy(defined_63)(_["wrapped-type"]),function(){
						return add_33("_ms.checkContains(wrappedType, _, \"val\")")
					});
					return add_33("}")
				});
				const f=Function("wrappedType",src);
				return f(_["wrapped-type"])
			};
			const test=function test(){
				const W=Wrap_45Type(function(){
					const doc="W";
					const wrapped_45type=Number;
					return {
						doc:doc,
						"wrapped-type":wrapped_45type,
						name:"W"
					}
				}());
				const w=W(3);
				_ms.unlazy(_33)(_ms.unlazy(_61_63),w.val,3);
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return W("three")
				})
			};
			return {
				doc:doc,
				props:props,
				"opt-props":opt_45props,
				extensible:extensible,
				defaults:defaults,
				"post-construct":post_45construct,
				"make-callable":make_45callable,
				test:test,
				name:"Wrap-Type"
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
		const name=exports.name="Wrap-Type";
		exports.default=Wrap_45Type;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL1dyYXAtVHlwZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBaUJNLFlBQU8sZUFBQSxLQUFLLElBQ0c7R0FDZixZQUFKLE1BQ0k7SUFBSDtHQUFBLE9BRUc7RUFBQTtFQUVOLGtCQUFZLHFCQUNRO0dBQW5CLFVBQ0M7R0FFRCxzQkFDTTtJQUFMLFdBQU07SUFDTixnQkFBVzs7Ozs7O0dBQ1osNEJBQ1U7SUFBVCxxQkFBYzs7Ozs7O0dBQ2YsaUJBQVk7R0FDWix5QkFDUztJQUFSLGdCQUNZLG9CQUFBO1lBQVgsY0FBYzs7Ozs7OztHQUNoQix1QkFBaUIsMEJBQUEsRUFDQztXQUFqQixRQUFJLFlBQWEsY0FBYTtHQUFBO0dBQy9CLHNCQUFnQix5QkFBQSxFQUNDO0lBQWhCLFVBQU0sU0FBVSxTQUFBLE9BQ0k7S0FBbkIsT0FDQztLQUdLLDZCQUFjLG1CQUNpQixVQUFBO2FBQXBDLE9BQU07S0FBQTtZQUNQLE9BQU07SUFBQTtJQUNQLFFBQUksU0FBVSxjQUFhO1dBQzNCLEVBQUU7O0dBQ0gsV0FDTyxlQUFBO0lBQU4sUUFBSSxzQkFDUztLQUFaLFVBQU07S0FDTixxQkFBYzs7Ozs7OztJQUNmLFFBQUksRUFBRTt1Q0FDRCxNQUFNO3lDQUVLLFVBQUE7WUFBZixFQUFHO0lBQUE7R0FBQTs7Ozs7Ozs7Ozs7OztFQUVOLFFBQU0sWUFBVTtFQUNoQixRQUFNLFlBQVUsWUFBVyxTQUFBLEdBQUcsRUFDQztVQUE5QixnQkFBYyxFQUFFO0VBQUE7RUFDakIsUUFBTSxRQUFRLFlBQVcsU0FBQSxHQUFHLEVBQ0M7O0lBQzNCLFlBQUEsZ0JBQWMsRUFBRSxLQUNFO1lBQWpCLENBQUU7V0FFQztZQUFIO0lBQUE7R0FBQTtFQUFBO0VBbkVILHdCQUFBO2tCQXFFQSIsImZpbGUiOiJUeXBlL1dyYXAtVHlwZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9