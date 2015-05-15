"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../js","../private/js-impl","../Objectbang","./Impl-Type","./Kind","./Method","./Obj-Type","./Type","../bang","../compare","../js","../Try"],function(exports,js_0,js_45impl_1,Object_33_2,Impl_45Type_3,Kind_4,Method_5,Obj_45Type_6,Type_7,_33_8,compare_9,js_10,Try_11){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(js_0),js_45instanceof=_ms.get(_$2,"js-instanceof"),_$3=_ms.getModule(js_45impl_1),buildStr=_ms.get(_$3,"buildStr"),_$4=_ms.getModule(Object_33_2),p_43_33=_ms.get(_$4,"p+!"),Impl_45Type=_ms.getDefaultExport(Impl_45Type_3),_$6=_ms.getModule(Kind_4),kind_33=_ms.get(_$6,"kind!"),_$7=_ms.getModule(Method_5),impl_33=_ms.get(_$7,"impl!"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_6),Type=_ms.getDefaultExport(Type_7),_$9=_ms.getModule(Type_7),contains_63=_ms.get(_$9,"contains?"),extract=_ms.get(_$9,"extract"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_8)
		}),_$12=_ms.lazyGetModule(compare_9),_61_63=_ms.lazyProp(_$12,"=?"),_$14=_ms.lazyGetModule(js_10),defined_63=_ms.lazyProp(_$14,"defined?"),_$15=_ms.lazyGetModule(Try_11),fails_63=_ms.lazyProp(_$15,"fails?");
		const if_33=function(){
			return _ms.set(function(cond,fun){
				if(_ms.bool(cond)){
					fun()
				} else {}
			},"displayName","if!")
		}();
		const Wrap_45Type=Obj_45Type(function(){
			const doc="Object with only one prop (always called `val`).\nThese are useful for wrapping a value with a new type.";
			const props=function(){
				const displayName=String;
				const prototype=Object;
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
				const prototype=function(){
					return _ms.set(function(){
						return Object.create(Object.prototype)
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
			const make_45callable=function(){
				return _ms.set(function(_){
					const src=buildStr(function(){
						return _ms.set(function(add_33){
							add_33("return function ctr(_) {\n\tif (!(this instanceof ctr)) return new ctr(_)\n\tthis.val = _");
							if_33(_ms.unlazy(defined_63)(_["wrapped-type"]),function(){
								return add_33("_ms.checkContains(wrappedType, _, \"val\")")
							});
							return add_33("}")
						},"displayName","src")
					}());
					const f=Function("wrappedType",src);
					return f(_["wrapped-type"])
				},"displayName","make-callable")
			}();
			const test=function(){
				return _ms.set(function(){
					const W=Wrap_45Type(function(){
						const doc="W";
						const wrapped_45type=Number;
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
				},"displayName","test")
			}();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL1dyYXAtVHlwZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBaUJNLHNCQUFPO2tCQUFBLFNBQUEsS0FBSyxJQUNHO0lBQ2YsWUFBSixNQUNJO0tBQUg7SUFBQSxPQUVHO0dBQUE7O0VBRU4sa0JBQVkscUJBQ1E7R0FBbkIsVUFDQztHQUVELHNCQUNNO0lBQUwsa0JBQWE7SUFDYixnQkFBVzs7Ozs7O0dBQ1osNEJBQ1U7SUFBVCxxQkFBYzs7Ozs7O0dBQ2YsaUJBQVk7R0FDWix5QkFDUztJQUFSLDBCQUNZO29CQUFBLFVBQUE7YUFBWCxjQUFjOzs7Ozs7OztHQUNoQixpQ0FBaUI7bUJBQUEsU0FBQSxFQUNDO1lBQWpCLFFBQUksWUFBYSxjQUFhO0lBQUE7O0dBQy9CLGdDQUFnQjttQkFBQSxTQUFBLEVBQ0M7S0FBaEIsVUFBTSxtQkFBVTtxQkFBQSxTQUFBLE9BQ0k7T0FBbkIsT0FDQztPQUdLLDZCQUFjLG1CQUNpQixVQUFBO2VBQXBDLE9BQU07T0FBQTtjQUNQLE9BQU07TUFBQTs7S0FDUCxRQUFJLFNBQVUsY0FBYTtZQUMzQixFQUFFOzs7R0FDSCxxQkFDTzttQkFBQSxVQUFBO0tBQU4sUUFBSSxzQkFDUztNQUFaLFVBQU07TUFDTixxQkFBYzs7Ozs7OztLQUNmLFFBQUksRUFBRTt3Q0FDRCxNQUFNOzBDQUVLLFVBQUE7YUFBZixFQUFHO0tBQUE7SUFBQTs7Ozs7Ozs7Ozs7Ozs7RUFFTixRQUFNLFlBQVU7RUFDaEIsUUFBTSxZQUFVLFlBQVcsU0FBQSxHQUFHLEVBQ0M7VUFBOUIsZ0JBQWMsRUFBRTtFQUFBO0VBQ2pCLFFBQU0sUUFBUSxZQUFXLFNBQUEsR0FBRyxFQUNDOztJQUMzQixZQUFBLGdCQUFjLEVBQUUsS0FDRTtZQUFqQixDQUFFO1dBRUM7WUFBSDtJQUFBO0dBQUE7RUFBQTtFQW5FSCxzQ0FBQTtrQkFxRUEiLCJmaWxlIjoiVHlwZS9XcmFwLVR5cGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==