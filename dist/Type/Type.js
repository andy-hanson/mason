"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../compare","../js","../private/bootstrap","../private/js-impl","./Impl-Type","./Kind","./Method","../at/q","../Object","../bang","./Method"],function(exports,compare_0,js_1,bootstrap_2,js_45impl_3,Impl_45Type_4,Kind_5,Method_6,_63_7,Object_8,_33_9,Method_10){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(js_1),id_61_63=_ms.get(_$3,"id=?"),js_45instanceof=_ms.get(_$3,"js-instanceof"),_$4=_ms.getModule(bootstrap_2),impl_45contains_63_33=_ms.get(_$4,"impl-contains?!"),msDef=_ms.get(_$4,"msDef"),_$6=_ms.getModule(js_45impl_3),ohNo=_ms.get(_$6,"ohNo"),Impl_45Type=_ms.getDefaultExport(Impl_45Type_4),Kind=_ms.getDefaultExport(Kind_5),_$8=_ms.getModule(Kind_5),kind_33=_ms.get(_$8,"kind!"),Method=_ms.getDefaultExport(Method_6),_$9=_ms.getModule(Method_6),_45_45contains_63=_ms.get(_$9,"--contains?"),impl_33=_ms.get(_$9,"impl!"),_$11=_ms.lazyGetModule(_63_7),_63_45or=_ms.lazyProp(_$11,"?-or"),_$12=_ms.lazyGetModule(Object_8),_63p_45with_45proto=_ms.lazyProp(_$12,"?p-with-proto"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_9)
		}),_$15=_ms.lazyGetModule(Method_10),self_45impl_33=_ms.lazyProp(_$15,"self-impl!");
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
				return _ms.set(function(){
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
					const f=function(){
						return _ms.set(function(_){
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
						},"displayName","f")
					}();
					_ms.unlazy(_33)(_61_63,"12",f("extractable"));
					return _ms.unlazy(_33)(_61_63,"not extractable",f())
				},"displayName","test")
			}();
			return {
				doc:doc,
				test:test,
				displayName:"extract"
			}
		}());
		msDef("extract",extract);
		msDef("checkContains",function(type,value,name){
			if(_ms.bool(contains_63(type,value))){} else {
				ohNo((((((((""+_ms.show(name))+" is no ")+_ms.show(type))+", is a ")+_ms.show(type_45of(value)))+": ")+_ms.show(value)))
			};
			return value
		});
		const _61_62=exports["=>"]=Method(function(){
			const doc="|convert-to:Type convert-me\nConverts a value to a given type.";
			const wrap=function(){
				return _ms.set(function(impl,type,converted,opts){
					return function(){
						const _=converted;
						if(_ms.bool(_ms.contains(type,_))){
							return _
						} else {
							return impl(type,converted,opts)
						}
					}()
				},"displayName","wrap")
			}();
			return {
				doc:doc,
				wrap:wrap,
				displayName:"=>"
			}
		}());
		const type_45of=exports["type-of"]=function(){
			const doc="Most specific Impl-Type for a value.";
			const test=function(){
				return _ms.set(function(){
					const _k0=[Type],_v0=Kind;
					const _k1=[null],_v1=Object;
					return _ms.map(_k0,_v0,_k1,_v1)
				},"displayName","test")
			}();
			return _ms.set(function(_){
				return _ms.checkContains(Impl_45Type,_ms.unlazy(_63_45or)(_ms.unlazy(_63p_45with_45proto)(_,"constructor"),Object),"res")
			},"doc",doc,"test",test,"displayName","type-of")
		}();
		kind_33(Impl_45Type,Type);
		kind_33(Method,Type);
		impl_45contains_63_33(Function,function(fun,_){
			return js_45instanceof(_,fun)
		});
		const displayName=exports.displayName="Type";
		exports.default=Type;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL1R5cGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQWdCQSxXQUFPLGVBQ0k7R0FBVixVQUNDOzs7Ozs7RUFHRixRQUFNLE9BQUcsS0FBSztFQUVkLHVDQUFXO0VBRVgsOEJBQVMsaUJBQ007R0FBZCxVQUNDO0dBS0QscUJBQ087bUJBQUEsVUFBQTtLQUFOLDBCQUNTO01BQVIsVUFBTTs7Ozs7O2dDQUNJLFFBQVEsVUFBUyxTQUFBLEVBQUE7O09BQzNCLFlBQUEsT0FBRyxFQUFHLGdCQUNZO2VBQWpCLENBQUUsRUFBRTtPQUFBLE9BRUQ7ZUFBSDtPQUFBO01BQUE7S0FBQTtLQUVGLGtCQUFLO3FCQUFBLFNBQUEsRUFBQTs7UUFDSjs4QkFBQyxVQUFEO3dCQUNZOztpQkFBVixFQUFPLFlBQU4sYUFBRztTQUFBLE9BRUY7aUJBQUY7U0FBQTtRQUFBO09BQUE7TUFBQTs7cUJBRUQsT0FBSSxLQUFLLEVBQUc7NEJBQ1osT0FBSSxrQkFBaUI7SUFBQTs7Ozs7Ozs7RUFFekIsTUFBTyxVQUFTO0VBRWhCLE1BQU8sZ0JBQWdCLFNBQUEsS0FBSyxNQUFNLEtBQ0k7R0FDaEMsWUFBSixZQUFVLEtBQUssUUFDSyxRQUVoQjtJQUFILEtBQU0sT0FkRyxZQWNGLDJCQUFhLDJCQUFhLFVBQVEsd0JBQVM7R0FBQTtVQUNwRDtFQUFBO0VBRUQsMkJBQUksaUJBQ007R0FBVCxVQUNDO0dBRUQscUJBQU87bUJBQUEsU0FBQSxLQUFLLEtBQUssVUFBVSxLQUNJOztNQUF6QixRQUFBO01BQ0oseUJBQUMsS0FBRCxJQUNLO2NBQUo7TUFBQSxPQUVHO2NBQUgsS0FBSyxLQUFLLFVBQVU7TUFBQTtLQUFBO0lBQUE7Ozs7Ozs7O0VBRXhCLDZDQUNRO0dBQVAsVUFDQztHQUNELHFCQUNPO21CQUFBLFVBQUE7S0FBTixVQUFBLENBQUUsVUFBVTtLQUNaLFVBQUEsQ0FBRSxVQUFROzs7O2tCQUNWLFNBQVcsRUFDQzs2QkFEWCxpRUFDbUIsRUFBRyxlQUFjOzs7RUFHdEMsUUFBTSxZQUFVO0VBQ2hCLFFBQU0sT0FBTztFQUdiLHNCQUFnQixTQUFVLFNBQUEsSUFBSSxFQUNDO1VBQTlCLGdCQUFjLEVBQUU7RUFBQTtFQXRGbEIsc0NBQUE7a0JBd0ZBIiwiZmlsZSI6IlR5cGUvVHlwZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9