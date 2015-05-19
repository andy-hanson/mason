"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../compare","../js","../private/bootstrap","../private/js-impl","./Impl-Type","./Kind","./Method","../at/q","../Object","../bang","./Method"],function(exports,compare_0,js_1,bootstrap_2,js_45impl_3,Impl_45Type_4,Kind_5,Method_6,_63_7,Object_8,_33_9,Method_10){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(compare_0),_61_63=_$2["=?"],_$3=_ms.getModule(js_1),id_61_63=_$3["id=?"],js_45instanceof=_$3["js-instanceof"],_$4=_ms.getModule(bootstrap_2),implContains=_$4.implContains,ms=_$4.ms,msDef=_$4.msDef,_$6=_ms.getModule(js_45impl_3),ohNo=_$6.ohNo,Impl_45Type=_ms.getDefaultExport(Impl_45Type_4),Kind=_ms.getDefaultExport(Kind_5),_$8=_ms.getModule(Kind_5),kind_33=_$8["kind!"],Method=_ms.getDefaultExport(Method_6),_$9=_ms.getModule(Method_6),impl_33=_$9["impl!"],_$11=_ms.lazyGetModule(_63_7),_63_45or=_ms.lazyProp(_$11,"?-or"),_$12=_ms.lazyGetModule(Object_8),_63p_45with_45proto=_ms.lazyProp(_$12,"?p-with-proto"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_9)
		}),_$15=_ms.lazyGetModule(Method_10),self_45impl_33=_ms.lazyProp(_$15,"self-impl!");
		const Type=Kind(function(){
			const doc="Anything implementing contains?.\nTypes are generally used to succinctly make assertions about values.";
			return {
				doc:doc,
				name:"Type"
			}
		}());
		impl_33(_61_63,Type,id_61_63);
		const contains_63=exports["contains?"]=ms.contains;
		const extract=exports.extract=Method(function(){
			const doc="Given a type and arbitrary value:\n\tIf the value is of the type, return an array of sub-values.\n\tOtherwise, return `null`.\nThe array of values are taken into local variables.\nFor example:";
			const args=function(){
				const _0="type";
				const _1="candidate";
				const _2=["num-extracteds",Number];
				return [_0,_1,_2]
			}();
			return {
				doc:doc,
				args:args,
				name:"extract"
			}
		}());
		msDef("extract",extract);
		msDef("checkContains",function(type,value,name){
			if(contains_63(type,value)){} else {
				ohNo((((((((""+_ms.show(name))+" is no ")+_ms.show(type))+", is a ")+_ms.show(type_45of(value)))+": ")+_ms.show(value)))
			};
			return value
		});
		const _61_62=exports["=>"]=Method(function(){
			const doc="|convert-to:Type convert-me (may take additional args)\nConverts a value to a given type.";
			const wrap=function wrap(impl,type,converted,opts){
				return function(){
					const _=converted;
					if(_ms.contains(type,_)){
						return _
					} else {
						return impl(type,converted,opts)
					}
				}()
			};
			return {
				doc:doc,
				wrap:wrap,
				name:"=>"
			}
		}());
		const type_45of=exports["type-of"]=function(){
			const doc="Most specific Impl-Type for a value.";
			return _ms.set(function type_45of(_){
				return _ms.unlazy(_63_45or)(_ms.unlazy(_63p_45with_45proto)(_,"constructor"),Object)
			},"doc",doc)
		}();
		kind_33(Impl_45Type,Type);
		kind_33(Method,Type);
		implContains(Function,function(fun,_){
			return js_45instanceof(_,fun)
		});
		const name=exports.name="Type";
		exports.default=Type;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL1R5cGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQWdCQSxXQUFPLGVBQ0k7R0FBVixVQUNDOzs7Ozs7RUFHRixRQUFNLE9BQUcsS0FBSztFQUdkLHVDQUFXO0VBRVgsOEJBQVMsaUJBQ007R0FBZCxVQUNDO0dBc0JELHFCQUNLO0lBQUosU0FBRztJQUNILFNBQUc7SUFDSCxTQUFFLENBQUcsaUJBQWdCOzs7Ozs7Ozs7RUFFdkIsTUFBTyxVQUFTO0VBRWhCLE1BQU8sZ0JBQWdCLFNBQUEsS0FBSyxNQUFNLEtBQ0k7R0FDaEMsR0FBSixZQUFVLEtBQUssT0FDSyxRQUVoQjtJQUFILEtBQU0sT0FuQkcsWUFtQkYsMkJBQWEsMkJBQWEsVUFBUSx3QkFBUztHQUFBO1VBQ3BEO0VBQUE7RUFFRCwyQkFBSSxpQkFDTTtHQUFULFVBQ0M7R0FFRCxXQUFPLGNBQUEsS0FBSyxLQUFLLFVBQVUsS0FDSTs7S0FBekIsUUFBQTtLQUNKLGdCQUFDLEtBQUQsR0FDSzthQUFKO0tBQUEsT0FFRzthQUFILEtBQUssS0FBSyxVQUFVO0tBQUE7SUFBQTtHQUFBOzs7Ozs7O0VBRXhCLDZDQUNRO0dBQVAsVUFDQztrQkFJQSxtQkFBVyxFQUNDO2dFQUFRLEVBQUcsZUFBYztHQUFBOztFQUd0QyxRQUFNLFlBQVU7RUFDaEIsUUFBTSxPQUFPO0VBR2IsYUFBYSxTQUFVLFNBQUEsSUFBSSxFQUNDO1VBQTNCLGdCQUFjLEVBQUU7RUFBQTtFQTNGbEIsd0JBQUE7a0JBNkZBIiwiZmlsZSI6IlR5cGUvVHlwZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9