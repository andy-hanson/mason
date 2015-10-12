"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Boolean","./compare","./js","./methods","./Type/Kind","./Type/Type","./at/at","./at/q","./at/Map/Map","./at/Set/Id-Set"],(exports,Boolean_0,compare_1,js_2,methods_3,Kind_4,Type_5,_64_6,_63_7,Map_8,Id_45Set_9)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(Boolean_0),xor=_ms.get(_$0,"xor"),_$1=_ms.getModule(compare_1),_61_63=_ms.get(_$1,"=?"),_$2=_ms.getModule(js_2),defined_63=_ms.get(_$2,"defined?"),exists_63=_ms.get(_$2,"exists?"),id_61_63=_ms.get(_$2,"id=?"),js_45delete=_ms.get(_$2,"js-delete"),js_45set=_ms.get(_$2,"js-set"),js_45sub=_ms.get(_$2,"js-sub"),js_45typeof=_ms.get(_$2,"js-typeof"),_$3=_ms.getModule(methods_3),freeze=_ms.get(_$3,"freeze"),Kind=_ms.getDefaultExport(Kind_4),_$4=_ms.getModule(Type_5),_61_62=_ms.get(_$4,"=>"),_$5=_ms.lazyGetModule(_64_6),_43_43=_ms.lazyProp(_$5,"++"),all_63=_ms.lazyProp(_$5,"all?"),count=_ms.lazyProp(_$5,"count"),empty_63=_ms.lazyProp(_$5,"empty?"),_64keep=_ms.lazyProp(_$5,"@keep"),_$6=_ms.lazyGetModule(_63_7),_63_45or=_ms.lazyProp(_$6,"?-or"),Opt_45_62_63=_ms.lazyProp(_$6,"Opt->?"),_63None=_ms.lazyProp(_$6,"?None"),Map=_ms.lazy(()=>_ms.getDefaultExport(Map_8)),_$7=_ms.lazyGetModule(Map_8),make_45map=_ms.lazyProp(_$7,"make-map"),Id_45Set=_ms.lazy(()=>_ms.getDefaultExport(Id_45Set_9));
		const Object_45Key=exports["Object-Key"]=new (Kind)((()=>{
			const built={};
			built.name="Object-Key";
			const implementors=built.implementors=[String,Symbol];
			return built
		})());
		const flag_63=exports["flag?"]=function flag_63(obj,flag){
			_ms.checkContains(Object_45Key,flag,"flag");
			return _ms.checkContains(Boolean,_ms.unlazy(_63_45or)(_63property(obj,flag),false),"returned value")
		};
		const forbidden_45fun_45props=_ms.lazy(()=>_61_62(_ms.unlazy(Id_45Set),[`arguments`,`caller`]));
		const _64all_45properties=exports["@all-properties"]=function _64all_45properties(_){
			const props=Object.getOwnPropertyNames(_);
			const own_45names=(()=>{
				if(_ms.contains(Function,_)){
					return _ms.unlazy(_64keep)(props,_=>{
						return ! _ms.contains(_ms.unlazy(forbidden_45fun_45props),_)
					})
				} else {
					return props
				}
			})();
			return _ms.unlazy(_43_43)(own_45names,Object.getOwnPropertySymbols(_))
		};
		const _64properties=exports["@properties"]=function _64properties(_){
			return (()=>{
				if(exists_63(_)){
					return Object.keys(_)
				} else {
					return []
				}
			})()
		};
		const _63property=exports["?property"]=function _63property(_,prop_45name){
			_ms.checkContains(Object_45Key,prop_45name,"prop-name");
			return (property_63(_,prop_45name)?_ms.some((()=>{
				return js_45sub(_,prop_45name)
			})()):_ms.None)
		};
		const _63property_45with_45proto=exports["?property-with-proto"]=function _63property_45with_45proto(_,prop_45name){
			_ms.checkContains(Object_45Key,prop_45name,"prop-name");
			return (()=>{
				if(exists_63(_)){
					return _ms.unlazy(Opt_45_62_63)(js_45sub(_,prop_45name))
				} else {
					return _ms.unlazy(_63None)
				}
			})()
		};
		const property_63=exports["property?"]=function property_63(_,prop_45name){
			_ms.checkContains(Object_45Key,prop_45name,"prop-name");
			return (exists_63(_)&&Object.prototype.hasOwnProperty.call(_,prop_45name))
		};
		const property_45with_45proto_63=exports["property-with-proto?"]=function property_45with_45proto_63(_,prop_45name){
			_ms.checkContains(Object_45Key,prop_45name,"prop-name");
			return (exists_63(_)&&defined_63(js_45sub(_,prop_45name)))
		};
		const object_61_63=exports["object=?"]=function object_61_63(a,b){
			const null_45a=id_61_63(a,null);
			const null_45b=id_61_63(b,null);
			const obj_45a=(! null_45a&&id_61_63(js_45typeof(a),`object`));
			const obj_45b=(! null_45b&&id_61_63(js_45typeof(b),`object`));
			return (()=>{
				if(! (obj_45a||obj_45b)){
					return id_61_63(a,b)
				} else if(xor(obj_45a,obj_45b)){
					return false
				} else {
					const same_45type=id_61_63(Object.getPrototypeOf(a),Object.getPrototypeOf(b));
					return (same_45type&&(()=>{
						const ak=Object.getOwnPropertyNames(a);
						const bk=Object.getOwnPropertyNames(b);
						return (_61_63(_ms.unlazy(count)(ak),_ms.unlazy(count)(bk))&&(()=>{
							return _ms.unlazy(all_63)(ak,k=>{
								return _61_63(js_45sub(a,k),js_45sub(b,k))
							})
						})())
					})())
				}
			})()
		};
		const empty_45Object=exports["empty-Object"]=Object.freeze(Object.create(Object.prototype));
		const empty_45Object_63=exports["empty-Object?"]=function empty_45Object_63(_){
			_ms.checkContains(Object,_,"_");
			return _ms.unlazy(empty_63)(_64all_45properties(_))
		};
		const Object_45_62Map=exports["Object->Map"]=function Object_45_62Map(_){
			return _ms.unlazy(make_45map)(_64all_45properties(_),prop=>{
				return js_45sub(_,prop)
			})
		};
		const Map_45_62Object=exports["Map->Object"]=function Map_45_62Object(_){
			_ms.checkContains(_ms.unlazy(Map),_,"_");
			return (obj=>{
				for(let elem of _){
					js_45set(obj,_ms.sub(elem,0),_ms.sub(elem,1))
				};
				freeze(obj);
				return obj
			})(new (Object)())
		};
		const delete_45property_33=exports["delete-property!"]=function delete_45property_33(_,prop_45name){
			_ms.checkContains(Object,_,"_");
			_ms.checkContains(Object_45Key,prop_45name,"prop-name");
			_ms.assert(property_63,_,prop_45name);
			js_45delete(_,prop_45name)
		};
		const object_45merge=exports["object-merge"]=function object_45merge(){
			const objects=[].slice.call(arguments,0);
			return Object.assign(new (Object)(),...objects)
		};
		const object_45select=exports["object-select"]=function object_45select(obj){
			const _64keys=[].slice.call(arguments,1);
			_ms.checkContains(Object,obj,"obj");
			return (kept=>{
				for(let key of _64keys){
					js_45set(kept,key,js_45sub(obj,key))
				};
				return kept
			})(new (Object)())
		};
		const map_45object_45values=exports["map-object-values"]=function map_45object_45values(obj,mapper){
			_ms.checkContains(Object,obj,"obj");
			_ms.checkContains(Function,mapper,"mapper");
			return (mapped=>{
				for(let key of _64properties(obj)){
					js_45set(mapped,key,mapper(js_45sub(obj,key)))
				};
				return mapped
			})(new (Object)())
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvT2JqZWN0Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBYUEseUNBQVksS0FBSSxNQUNJLEtBQUE7O2NBQ25CO0dBQ0Esc0NBQWMsQ0FBQyxPQUFPOzs7RUFFdkIsK0JBQVEsaUJBQVMsSUFBSTtxQkFBSzs0QkFBakIsNkJBRUYsWUFBVSxJQUFJLE1BQU07O0VBRTNCLDJDQUF1Qiw0QkFBVSxDQUFFLFlBQVk7RUFDL0MscURBQWtCLDZCQUFBO0dBR2pCLFlBQVEsMkJBQU87R0FFZixrQkFDZ0I7SUFBZixnQkFBQyxTQUFELEdBQ1M7Z0NBQUYsTUFBTzthQUNaLG1EQUFJO0tBQUE7SUFBQSxPQUVGO1lBQUg7SUFBQTtHQUFBOzZCQUNDLFlBQVUsNkJBQU87RUFBQTtFQUdyQiwyQ0FBYyx1QkFBQTtVQUdUO0lBQUgsR0FBQSxVQUFBLEdBQ1E7WUFBUCxZQUFPO0lBQUEsT0FFSjtZQUFIO0lBQUE7R0FBQTtFQUFBO0VBRUgsdUNBQVkscUJBQUEsRUFBRTtxQkFBVTtVQUV2QixDQUFHLFlBQVUsRUFBRSwyQkFDUztXQUF2QixTQUFPLEVBQUU7R0FBQTs7RUFFWCxpRUFBdUIsb0NBQUEsRUFBRTtxQkFBVTtVQUc5QjtJQUFILEdBQUEsVUFBQSxHQUNRO3FDQUFDLFNBQU8sRUFBRTtJQUFBLE9BRWQ7Ozs7O0VBRU4sdUNBQVkscUJBQUEsRUFBRTtxQkFBVTtVQUV2QixDQUFJLFVBQUEsSUFBVSxxQ0FBcUMsRUFBRTtFQUFBO0VBRXRELGlFQUF1QixvQ0FBQSxFQUFFO3FCQUFVO1VBRWxDLENBQUksVUFBQSxJQUFVLFdBQVUsU0FBTyxFQUFFO0VBQUE7RUFHbEMsdUNBQVcsc0JBQUEsRUFBRTtHQUlaLGVBQVMsU0FBSyxFQUFFO0dBQ2hCLGVBQVMsU0FBSyxFQUFFO0dBRWhCLGNBQVEsQ0FBSyxFQUFJLFVBQVMsU0FBTSxZQUFVLEdBQUk7R0FDOUMsY0FBUSxDQUFLLEVBQUksVUFBUyxTQUFNLFlBQVUsR0FBSTtVQUUxQztJQUFILEdBQUEsRUFBSSxDQUFHLFNBQU0sU0FDSztZQUFqQixTQUFLLEVBQUU7SUFBQSxPQUNSLEdBQUEsSUFBSSxRQUFNLFNBQ0s7WUFBZDtJQUFBLE9BRUc7S0FBSCxrQkFBWSxTQUFNLHNCQUFzQixHQUFJLHNCQUFzQjtZQUNsRSxDQUFJLGFBQ1MsS0FBQTtNQUFaLFNBQUssMkJBQTJCO01BQ2hDLFNBQUssMkJBQTJCO2FBQ2hDLENBQUsseUJBQVUsc0JBQVcsTUFDSSxLQUFBO2lDQUF4QixHQUFJO2VBQ1IsT0FBSSxTQUFPLEVBQUUsR0FBSSxTQUFPLEVBQUU7T0FBQTtNQUFBO0tBQUE7SUFBQTtHQUFBO0VBQUE7RUFFaEMsNkNBQWMsY0FBZSxjQUFjO0VBRTNDLGlEQUFnQiwyQkFBQTtxQkFBRTsrQkFFVixvQkFBQTtFQUFBO0VBRVIsNkNBQWMseUJBQUE7aUNBRUosb0JBQUEsR0FBa0I7V0FDMUIsU0FBTyxFQUFFO0dBQUE7RUFBQTtFQUVYLDZDQUFjLHlCQUFBOztVQUVSLE1BQ2lCO0lBQWhCLFFBQUEsUUFBUSxFQUNDO0tBQ2IsU0FBTyxZQUFJLEtBQUssV0FBRyxLQUFLO0lBQUE7SUFDekIsT0FBTzs7TUFKSCxLQUFJO0VBQUE7RUFPVCx1REFBb0IsOEJBQUEsRUFBUztxQkFBUDtxQkFBaUI7Y0FDOUIsWUFBVSxFQUFFO0dBQ3BCLFlBQVUsRUFBRTtFQUFBO0VBRWQsNkNBQWU7O1VBQ2QsY0FBZSxLQUFJLFVBQVEsR0FBRztFQUFBO0VBRS9CLCtDQUFnQix5QkFBQTs7cUJBQUk7VUFDZCxPQUNrQjtJQUFqQixRQUFBLE9BQU8sUUFDSztLQUFoQixTQUFPLEtBQUssSUFBSyxTQUFPLElBQUk7SUFBQTs7TUFGekIsS0FBSTtFQUFBO0VBSVYseURBQW9CLCtCQUFBLElBQVc7cUJBQVA7cUJBQWM7VUFDaEMsU0FDb0I7SUFBbkIsUUFBQSxPQUFPLGNBQVksS0FDRztLQUExQixTQUFPLE9BQU8sSUFBSyxPQUFRLFNBQU8sSUFBSTtJQUFBOztNQUZuQyxLQUFJO0VBQUEiLCJmaWxlIjoiT2JqZWN0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
