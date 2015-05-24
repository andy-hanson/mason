"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","esast/dist/mangle-identifier","../js","../private/js-impl","../Objectbang","./Impl-Type","./Kind","./Method","./Obj-Type","./Type","../bang","../compare","../js","../Try"],function(exports,mangle_45identifier_0,js_1,js_45impl_2,Object_33_3,Impl_45Type_4,Kind_5,Method_6,Obj_45Type_7,Type_8,_33_9,compare_10,js_11,Try_12){
	exports._get=_ms.lazy(function(){
		const mangle_45identifier=_ms.getDefaultExport(mangle_45identifier_0),_$3=_ms.getModule(js_1),js_45instanceof=_ms.get(_$3,"js-instanceof"),_$4=_ms.getModule(js_45impl_2),buildStr=_ms.get(_$4,"buildStr"),_$5=_ms.getModule(Object_33_3),p_43_33=_ms.get(_$5,"p+!"),Impl_45Type=_ms.getDefaultExport(Impl_45Type_4),_$7=_ms.getModule(Kind_5),kind_33=_ms.get(_$7,"kind!"),_$8=_ms.getModule(Method_6),impl_33=_ms.get(_$8,"impl!"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_7),Type=_ms.getDefaultExport(Type_8),_$10=_ms.getModule(Type_8),contains_63=_ms.get(_$10,"contains?"),extract=_ms.get(_$10,"extract"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_9)
		}),_$13=_ms.lazyGetModule(compare_10),_61_63=_ms.lazyProp(_$13,"=?"),_$14=_ms.lazyGetModule(js_11),defined_63=_ms.lazyProp(_$14,"defined?"),_$15=_ms.lazyGetModule(Try_12),fails_63=_ms.lazyProp(_$15,"fails?");
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
					const name=mangle_45identifier(_.name);
					add_33((((((("return function "+_ms.show(name))+"(_) {\n\tif (!(this instanceof ")+_ms.show(name))+")) return new ")+_ms.show(name))+"(_)\n\tthis.val = _"));
					if(_ms.bool(_ms.unlazy(defined_63)(_["wrapped-type"]))){
						add_33("_ms.checkContains(wrappedType, _, \"val\")")
					};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL1dyYXAtVHlwZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBZ0JBLGtCQUFZLHFCQUNRO0dBQW5CLFVBQ0M7R0FFRCxzQkFDTTtJQUFMLFdBQU07SUFDTixnQkFBVzs7Ozs7O0dBQ1osNEJBQ1U7SUFBVCxxQkFBYzs7Ozs7O0dBQ2YsaUJBQVk7R0FDWix5QkFDUztJQUFSLGdCQUNZLG9CQUFBO1lBQVgsY0FBYzs7Ozs7OztHQUNoQix1QkFBaUIsMEJBQUEsRUFDQztXQUFqQixRQUFJLFlBQWEsY0FBYTtHQUFBO0dBQy9CLHNCQUFnQix5QkFBQSxFQUNDO0lBQWhCLFVBQU0sU0FBVSxTQUFBLE9BQ0k7S0FBbkIsV0FBTyxvQkFBa0I7S0FDekIsT0FDQyxrQ0FBaUIsbURBQ08sa0NBQW9CO0tBRXZDLG1DQUFhLG9CQUNjO01BQWhDLE9BQU07S0FBQTtZQUNQLE9BQU07SUFBQTtJQUNQLFFBQUksU0FBVSxjQUFhO1dBQzNCLEVBQUU7O0dBQ0gsV0FDUSxlQUFBO0lBQVAsUUFBSSxzQkFDUztLQUFaLFVBQU07S0FDTixxQkFBYzs7Ozs7OztJQUNmLFFBQUksRUFBRTt1Q0FDRCxNQUFNO3lDQUVLLFVBQUE7WUFBZixFQUFHO0lBQUE7R0FBQTs7Ozs7Ozs7Ozs7OztFQUVOLFFBQU0sWUFBVTtFQUNoQixRQUFNLFlBQVUsWUFBVyxTQUFBLEdBQUcsRUFDQztVQUE5QixnQkFBYyxFQUFFO0VBQUE7RUFDakIsUUFBTSxRQUFRLFlBQVcsU0FBQSxHQUFHLEVBQ0M7O0lBQzNCLFlBQUEsZ0JBQWMsRUFBRSxLQUNFO1lBQWpCLENBQUU7V0FFQztZQUFIO0lBQUE7R0FBQTtFQUFBO0VBNURILHdCQUFBO2tCQThEQSIsImZpbGUiOiJUeXBlL1dyYXAtVHlwZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9