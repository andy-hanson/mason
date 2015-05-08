"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../compare","../js","../private/bootstrap","./Impl-Type","./Kind","./Method","../at/q","../Obj","../Try","../bang","./Method"],function(exports,compare_0,js_1,bootstrap_2,Impl_45Type_3,Kind_4,Method_5,_63_6,Obj_7,Try_8,_33_9,Method_10){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(js_1),id_61_63=_ms.get(_$3,"id=?"),js_45instanceof=_ms.get(_$3,"js-instanceof"),_$4=_ms.getModule(bootstrap_2),Fun=_ms.get(_$4,"Fun"),impl_45contains_63_33=_ms.get(_$4,"impl-contains?!"),msDef=_ms.get(_$4,"msDef"),Impl_45Type=_ms.getDefaultExport(Impl_45Type_3),Kind=_ms.getDefaultExport(Kind_4),_$6=_ms.getModule(Kind_4),kind_33=_ms.get(_$6,"kind!"),Method=_ms.getDefaultExport(Method_5),_$7=_ms.getModule(Method_5),_45_45contains_63=_ms.get(_$7,"--contains?"),impl_33=_ms.get(_$7,"impl!"),_$9=_ms.lazyGetModule(_63_6),_63_45or=_ms.lazyProp(_$9,"?-or"),Obj=_ms.lazy(function(){
			return _ms.getDefaultExport(Obj_7)
		}),_$10=_ms.lazyGetModule(Obj_7),_63p_45with_45proto=_ms.lazyProp(_$10,"?p-with-proto"),_$11=_ms.lazyGetModule(Try_8),oh_45no_33=_ms.lazyProp(_$11,"oh-no!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_9)
		}),_$14=_ms.lazyGetModule(Method_10),self_45impl_33=_ms.lazyProp(_$14,"self-impl!");
		const exports={};
		const Type=Kind(function(){
			const doc="Anything implementing contains?.\nTypes are generally used to succinctly make assertions about values.";
			return {
				doc:doc,
				displayName:"Type"
			}
		}());
		impl_33(_61_63,Type,id_61_63);
		const contains_63=exports["contains?"]=_45_45contains_63;
		const extract=exports.extract=Method(function(){
			const doc="Given a type and arbitrary value:\n\tIf the value is of the type, return an array of sub-values.\n\tOtherwise, return `null`.\nThe array of values are taken into local variables.\nFor example:";
			const test=function(){
				const My_45Type=function(){
					const doc="Example type";
					return {
						doc:doc,
						displayName:"My-Type"
					}
				}();
				_ms.unlazy(self_45impl_33)(extract,My_45Type,function(_){
					return function(){
						if(_ms.bool(_61_63(_,"extractable"))){
							return [1,2]
						} else {
							return null
						}
					}()
				});
				const f=function(_){
					return function(){
						{
							const _$=_ms.extract(My_45Type,_);
							if((_$!==null)){
								const a=_$[0],b=_$[1];
								return ((""+_ms.show(a))+_ms.show(b))
							} else {
								return "not extractable"
							}
						}
					}()
				};
				_ms.unlazy(_33)(_61_63,"12",f("extractable"));
				return _ms.unlazy(_33)(_61_63,"not extractable",f(null))
			};
			return {
				doc:doc,
				test:test,
				displayName:"extract"
			}
		}());
		msDef("extract",extract);
		msDef("checkContains",function(type,value,name){
			if(_ms.bool(contains_63(type,value))){
				null
			} else {
				_ms.unlazy(oh_45no_33)((((((((""+_ms.show(name))+" is no ")+_ms.show(type))+", is a ")+_ms.show(type_45of(value)))+": ")+_ms.show(value)))
			};
			return value
		});
		const _61_62=exports["=>"]=Method(function(){
			const doc=function(convert_45to,convert_45me){
				_ms.checkContains(Type,convert_45to,"convert-to");
				return "Converts a value to a given type."
			};
			const wrap=function(impl,type,converted,opts){
				return function(){
					const _=converted;
					if(_ms.bool(_ms.contains(type,_))){
						return _
					} else {
						return impl(type,converted,opts)
					}
				}()
			};
			return {
				doc:doc,
				wrap:wrap,
				displayName:"=>"
			}
		}());
		const type_45of=exports["type-of"]=function(){
			const doc="Most specific Impl-Type for a value.";
			const test=function(){
				const _k0=[Type],_v0=Kind;
				const _k1=[null],_v1=_ms.unlazy(Obj);
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function(obj){
				return _ms.checkContains(Impl_45Type,_ms.unlazy(_63_45or)(_ms.unlazy(_63p_45with_45proto)(obj,"constructor"),_ms.unlazy(Obj)),"res")
			},"doc",doc,"test",test,"displayName","type-of")
		}();
		kind_33(Impl_45Type,Type);
		kind_33(Method,Type);
		impl_45contains_63_33(Fun,function(fun,_){
			return js_45instanceof(_,fun)
		});
		exports.default=Type;
		const displayName=exports.displayName="Type";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL1R5cGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2lDQWVBOzs7Ozs7O0VBQUEsV0FBTyxlQUFJO0dBQ1YsVUFDQztVQUZTOzs7OztFQUtYLFFBQUEsT0FBQSxLQUFBO0VBRUEsdUNBQVc7RUFFWCw4QkFBUyxpQkFBTTtHQUNkLFVBQ0M7R0FLRCxXQUFPLFVBQ047SUFBQSwwQkFBUztLQUNSLFVBQU07WUFERTs7Ozs7K0JBRVQsUUFBQSxVQUE0QixTQUFBLEVBQUE7O01BQzNCLFlBQUEsT0FBRyxFQUFHLGdCQUFZO2NBQ2pCLENBQUUsRUFBRTtNQUFBLE9BQ0Q7Y0FDSDtNQUFBO0tBQUE7SUFBQTtJQUVGLFFBQUssU0FBQSxFQUFBOztNQUNKOzRCQUFDLFVBQUQ7c0JBQVk7O2VBQ1YsRUFDTyxZQURQLGFBQUc7T0FBQSxPQUNEO2VBQ0Y7T0FBQTtNQUFBO0tBQUE7SUFBQTtvQkFFSCxPQUFNLEtBQUksRUFBSTsyQkFDZCxPQUFNLGtCQUFpQixFQUFHO0dBQUE7VUF2QmI7Ozs7OztFQXlCZixNQUFPLFVBQVA7RUFFQSxNQUFPLGdCQUFnQixTQUFBLEtBQUssTUFBTSxLQUNqQztHQUFLLFlBQ0osWUFBQSxLQUFBLFFBQW9CO0lBQ25CO0dBQUEsT0FDRzsyQkFDSyxPQWJDLFlBYUQsMkJBQWEsMkJBQWEsVUFBQSx3QkFBaUI7R0FBQTtVQUNyRDtFQUFBO0VBRUQsMkJBQUksaUJBQU07R0FDVCxVQUFNLFNBQUEsYUFBZ0IsYUFDckI7c0JBRGdCO1dBQ2Y7R0FBQTtHQUNGLFdBQU8sU0FBQSxLQUFLLEtBQUssVUFBVSxLQUMxQjs7S0FBSyxRQUFBO0tBQ0oseUJBQUMsS0FBRCxJQUFLO2FBQ0o7S0FBQSxPQUNHO2FBQ0gsS0FBQSxLQUFBLFVBQUE7S0FBQTtJQUFBO0dBQUE7VUFSTTs7Ozs7O0VBVVYsNkNBQVE7R0FDUCxVQUNDO0dBQ0QsV0FBTyxVQUNOO0lBQUEsVUFBQSxDQUFBLFVBQVk7SUFDWixVQUFBLENBQUU7OztrQkFDRixTQUFXLElBQ1g7NkJBREMsaUVBQ0ksSUFBb0I7OztFQUcxQixRQUFBLFlBQUE7RUFDQSxRQUFBLE9BQUE7RUFHQSxzQkFBQSxJQUFxQixTQUFBLElBQUksRUFDeEI7VUFBQSxnQkFBYyxFQUFkO0VBQUE7a0JBRUY7RUF0RkEsc0NBQUEiLCJmaWxlIjoiVHlwZS9UeXBlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=