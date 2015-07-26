"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../compare","../js","../private/bootstrap","./Impl-Type","./Kind","./Method","../at/q","../Object","./Method"],(exports,compare_0,js_1,bootstrap_2,Impl_45Type_3,Kind_4,Method_5,_63_6,Object_7,Method_8)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(js_1),id_61_63=_ms.get(_$3,"id=?"),_$4=_ms.getModule(bootstrap_2),ms=_ms.get(_$4,"ms"),msDef=_ms.get(_$4,"msDef"),Impl_45Type=_ms.getDefaultExport(Impl_45Type_3),Kind=_ms.getDefaultExport(Kind_4),_$7=_ms.getModule(Kind_4),kind_33=_ms.get(_$7,"kind!"),Method=_ms.getDefaultExport(Method_5),_$8=_ms.getModule(Method_5),impl_33=_ms.get(_$8,"impl!"),_$10=_ms.lazyGetModule(_63_6),_63_45or=_ms.lazyProp(_$10,"?-or"),_$11=_ms.lazyGetModule(Object_7),_63p_45with_45proto=_ms.lazyProp(_$11,"?p-with-proto"),_$13=_ms.lazyGetModule(Method_8),self_45impl_33=_ms.lazyProp(_$13,"self-impl!");
		const Type=new (Kind)(()=>{
			const built={};
			const doc=built.doc=`Anything implementing contains?.\nTypes are generally used to succinctly make assertions about values.`;
			return _ms.setName(built,"Type")
		}());
		impl_33(_61_63,Type,function(other){
			const _this=this;
			return id_61_63(_this,other)
		});
		const contains_63=exports["contains?"]=ms.contains;
		const extract=exports.extract=new (Method)(()=>{
			const built={};
			const doc=built.doc=`Given a type and arbitrary value:\n\tIf the value is of the type, return an array of sub-values.\n\tOtherwise, return \`null\`.\nThe array of values are taken into local variables.\nFor example:`;
			const test=built.test=function test(){
				const My_45Type=()=>{
					const built={};
					const doc=built.doc=`Example type`;
					return _ms.setName(built,"My-Type")
				}();
				_ms.unlazy(self_45impl_33)(extract,My_45Type,_=>{
					return ()=>{
						if(_ms.bool(_61_63(_,`extractable`))){
							return [1,2]
						} else {
							return null
						}
					}()
				});
				const f=function f(_){
					return ()=>{
						{
							const _$=_ms.extract(My_45Type,_);
							if((_$!==null)){
								const a=_$[0],b=_$[1];
								return `${_ms.show(a)}${_ms.show(b)}`
							} else {
								return `not extractable`
							}
						}
					}()
				};
				_ms.assert(_61_63,`12`,f(`extractable`));
				_ms.assert(_61_63,`not extractable`,f())
			};
			const args=built.args=()=>{
				const built=[];
				_ms.add(built,`type`);
				_ms.add(built,`candidate`);
				_ms.add(built,[`num-extracteds`,Number]);
				return built
			}();
			return _ms.setName(built,"extract")
		}());
		msDef(`extract`,extract);
		msDef(`checkContains`,(type,value,name)=>{
			if(! _ms.bool(contains_63(type,value)))throw _ms.error(`${_ms.show(name)} is no ${_ms.show(type)}, is a ${_ms.show(type_45of(value))}: ${_ms.show(value)}`);
			return value
		});
		const _61_62=exports["=>"]=new (Method)(()=>{
			const built={};
			const doc=built.doc=`TODO: Don't take additional args...\n|convert-to:Type convert-me (may take additional args)\nConverts a value to a given type.`;
			const wrap=built.wrap=function wrap(impl,type,converted,opts){
				return ()=>{
					const _=converted;
					if(_ms.bool(_ms.contains(type,_))){
						return _
					} else {
						return Function.prototype.call.call(impl,type,converted,opts)
					}
				}()
			};
			return _ms.setName(built,"=>")
		}());
		const type_45of=exports["type-of"]=()=>{
			const built={};
			const doc=built.doc=`Most specific Impl-Type for a value.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[Type],Kind);
				_ms.assoc(built,[null],Object);
				return built
			};
			return _ms.set(function type_45of(_){
				return _ms.checkContains(Impl_45Type,_ms.unlazy(_63_45or)(_ms.unlazy(_63p_45with_45proto)(_,`constructor`),Object),"res")
			},built)
		}();
		kind_33(Impl_45Type,Type);
		const name=exports.name=`Type`;
		exports.default=Type;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL1R5cGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFjQSxXQUFNLEtBQUksVUFDSTs7R0FBYixvQkFDQzs7O0VBR0YsUUFBTSxPQUFHLEtBQU8sU0FBQSxNQUNLO1NBQWY7VUFBTCxTQUFLLE1BQUs7RUFBQTtFQUdYLHVDQUFXO0VBRVgsOEJBQVMsS0FBSSxZQUNNOztHQUFsQixvQkFDQztHQUtELHNCQUNRLGVBQUE7SUFDUCxvQkFDUzs7S0FBUixvQkFBTTs7OytCQUNJLFFBQVEsVUFBUyxHQUFBOztNQUMzQixZQUFBLE9BQUcsRUFBRyxnQkFDWTtjQUFqQixDQUFFLEVBQUU7TUFBQSxPQUVEO2NBQUg7TUFBQTtLQUFBO0lBQUE7SUFFRixRQUFLLFdBQUEsRUFBQTs7TUFDSjs0QkFBQyxVQUFEO3NCQUNZOztlQUFWLFlBQUMsY0FBRztjQUVGO2VBQUY7Ozs7O2VBRUssT0FBSSxLQUFLLEVBQUc7ZUFDWixPQUFJLGtCQUFpQjtHQUFBO0dBQzlCLDBCQUNLOztrQkFBRDtrQkFDQTtrQkFDRCxDQUFHLGlCQUFnQjs7Ozs7RUFFdkIsTUFBTyxVQUFTO0VBRWhCLE1BQU8sZ0JBQWdCLENBQUEsS0FBSyxNQUFNLE9BQ0k7R0FBN0IsY0FBQSxZQUFVLEtBQUssd0JBQWMsWUFBQyx3QkFBYSx3QkFBYSxVQUFRLHFCQUFTO1VBQ2pGO0VBQUE7RUFFRCwyQkFBSSxLQUFJLFlBQ007O0dBQWIsb0JBQ0M7R0FHRCxzQkFBTyxjQUFBLEtBQUssS0FBSyxVQUFVLEtBQ0k7O0tBQXpCLFFBQUE7S0FDSix5QkFBQyxLQUFELElBQ0s7YUFBSjtLQUFBLE9BRUc7YUFBSCw2QkFBNkIsS0FBSyxLQUFLLFVBQVU7S0FBQTtJQUFBO0dBQUE7OztFQUVyRCx1Q0FDUTs7R0FBUCxvQkFDQztHQUNELHNCQUNPLGVBQUE7O29CQUFOLENBQUUsTUFBVTtvQkFDWixDQUFFLE1BQVU7OztrQkFDWixtQkFBVyxFQUNDOzZCQURYLGlFQUNtQixFQUFHLGVBQWM7OztFQUd0QyxRQUFNLFlBQVU7RUFuRmpCLHdCQUFBO2tCQWNBIiwiZmlsZSI6IlR5cGUvVHlwZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9