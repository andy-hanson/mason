"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../compare","../js","../private/bootstrap","../private/js-impl","./Impl-Type","./Kind","./Method","../at/q","../Object","../bang","./Method"],function(exports,compare_0,js_1,bootstrap_2,js_45impl_3,Impl_45Type_4,Kind_5,Method_6,_63_7,Object_8,_33_9,Method_10){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(js_1),id_61_63=_ms.get(_$3,"id=?"),js_45instanceof=_ms.get(_$3,"js-instanceof"),_$4=_ms.getModule(bootstrap_2),implContains=_ms.get(_$4,"implContains"),ms=_ms.get(_$4,"ms"),msDef=_ms.get(_$4,"msDef"),_$6=_ms.getModule(js_45impl_3),ohNo=_ms.get(_$6,"ohNo"),Impl_45Type=_ms.getDefaultExport(Impl_45Type_4),Kind=_ms.getDefaultExport(Kind_5),_$8=_ms.getModule(Kind_5),kind_33=_ms.get(_$8,"kind!"),Method=_ms.getDefaultExport(Method_6),_$9=_ms.getModule(Method_6),impl_33=_ms.get(_$9,"impl!"),_$11=_ms.lazyGetModule(_63_7),_63_45or=_ms.lazyProp(_$11,"?-or"),_$12=_ms.lazyGetModule(Object_8),_63p_45with_45proto=_ms.lazyProp(_$12,"?p-with-proto"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_9)
		}),_$15=_ms.lazyGetModule(Method_10),self_45impl_33=_ms.lazyProp(_$15,"self-impl!");
		const Type=Kind(function(){
			const built={};
			const doc=built.doc="Anything implementing contains?.\nTypes are generally used to succinctly make assertions about values.";
			return _ms.setName(built,"Type")
		}());
		impl_33(_61_63,Type,id_61_63);
		const contains_63=exports["contains?"]=ms.contains;
		const extract=exports.extract=Method(function(){
			const built={};
			const doc=built.doc="Given a type and arbitrary value:\n\tIf the value is of the type, return an array of sub-values.\n\tOtherwise, return `null`.\nThe array of values are taken into local variables.\nFor example:";
			const test=built.test=function test(){
				const My_45Type=function(){
					const built={};
					const doc=built.doc="Example type";
					return _ms.setName(built,"My-Type")
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
				const f=function f(_){
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
				_ms.unlazy(_33)(_61_63,"not extractable",f())
			};
			const args=built.args=function(){
				const built=[];
				_ms.add(built,"type");
				_ms.add(built,"candidate");
				_ms.add(built,["num-extracteds",Number]);
				return built
			}();
			return _ms.setName(built,"extract")
		}());
		msDef("extract",extract);
		msDef("checkContains",function(type,value,name){
			if(! _ms.bool(contains_63(type,value))){
				ohNo((((((((""+_ms.show(name))+" is no ")+_ms.show(type))+", is a ")+_ms.show(type_45of(value)))+": ")+_ms.show(value)))
			};
			return value
		});
		const _61_62=exports["=>"]=Method(function(){
			const built={};
			const doc=built.doc="TODO: Don't take additional args...\n|convert-to:Type convert-me (may take additional args)\nConverts a value to a given type.";
			const wrap=built.wrap=function wrap(impl,type,converted,opts){
				return function(){
					const _=converted;
					if(_ms.bool(_ms.contains(type,_))){
						return _
					} else {
						return impl(type,converted,opts)
					}
				}()
			};
			return _ms.setName(built,"=>")
		}());
		const type_45of=exports["type-of"]=function(){
			const built={};
			const doc=built.doc="Most specific Impl-Type for a value.";
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[Type],Kind);
				_ms.assoc(built,[null],Object);
				return built
			};
			return _ms.set(function type_45of(_){
				return _ms.checkContains(Impl_45Type,_ms.unlazy(_63_45or)(_ms.unlazy(_63p_45with_45proto)(_,"constructor"),Object),"res")
			},built)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL1R5cGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQWdCQSxXQUFNLGVBQ0k7O0dBQVQsb0JBQ0M7OztFQUdGLFFBQU0sT0FBRyxLQUFLO0VBR2QsdUNBQVc7RUFFWCw4QkFBUyxpQkFDTTs7R0FBZCxvQkFDQztHQUtELHNCQUNRLGVBQUE7SUFDUCwwQkFDUzs7S0FBUixvQkFBTTs7OytCQUNJLFFBQVEsVUFBUyxTQUFBLEVBQUE7O01BQzNCLFlBQUEsT0FBRyxFQUFHLGdCQUNZO2NBQWpCLENBQUUsRUFBRTtNQUFBLE9BRUQ7Y0FBSDtNQUFBO0tBQUE7SUFBQTtJQUVGLFFBQUssV0FBQSxFQUFBOztNQUNKOzRCQUFDLFVBQUQ7c0JBQ1k7O2VBQVYsRUEyRWMsWUEzRWIsYUFBRztPQUFBLE9BRUY7ZUFBRjtPQUFBO01BQUE7S0FBQTtJQUFBO29CQUVELE9BQUksS0FBSyxFQUFHO29CQUNaLE9BQUksa0JBQWlCO0dBQUE7R0FDeEIsZ0NBQ0s7O2tCQUFEO2tCQUNBO2tCQUNELENBQUcsaUJBQWdCOzs7OztFQUV2QixNQUFPLFVBQVM7RUFFaEIsTUFBTyxnQkFBZ0IsU0FBQSxLQUFLLE1BQU0sS0FDSTtHQUFyQyxjQUFRLFlBQVUsS0FBSyxRQUNLO0lBQTNCLEtBQU0sT0E0RFcsWUE1RFYsMkJBQWEsMkJBQWEsVUFBUSx3QkFBUztHQUFBO1VBQ25EO0VBQUE7RUFFRCwyQkFBSSxpQkFDTTs7R0FBVCxvQkFDQztHQUdELHNCQUFPLGNBQUEsS0FBSyxLQUFLLFVBQVUsS0FDSTs7S0FBekIsUUFBQTtLQUNKLHlCQUFDLEtBQUQsSUFDSzthQUFKO0tBQUEsT0FFRzthQUFILEtBQUssS0FBSyxVQUFVO0tBQUE7SUFBQTtHQUFBOzs7RUFFeEIsNkNBQ1E7O0dBQVAsb0JBQ0M7R0FDRCxzQkFDTyxlQUFBOztvQkFBTixDQUFFLE1BQVU7b0JBQ1osQ0FBRSxNQUFVOzs7a0JBQ1osbUJBQVcsRUFDQzs2QkFEWCxpRUFDbUIsRUFBRyxlQUFjOzs7RUFHdEMsUUFBTSxZQUFVO0VBQ2hCLFFBQU0sT0FBTztFQUdiLGFBQWEsU0FBVSxTQUFBLElBQUksRUFDQztVQUEzQixnQkFBYyxFQUFFO0VBQUE7RUExRmxCLHdCQUFBO2tCQWdCQSIsImZpbGUiOiJUeXBlL1R5cGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==