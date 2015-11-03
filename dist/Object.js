"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Boolean","./compare","./js","./Type/Kind","./Type/Type","./at/at","./at/q","./at/Map/Map","./at/Set/Id-Set"],(exports,Boolean_0,compare_1,js_2,Kind_3,Type_4,_64_5,_63_6,Map_7,Id_45Set_8)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(Boolean_0),xor=_ms.get(_$0,"xor"),_$1=_ms.getModule(compare_1),_61_63=_ms.get(_$1,"=?"),_$2=_ms.getModule(js_2),defined_63=_ms.get(_$2,"defined?"),exists_63=_ms.get(_$2,"exists?"),id_61_63=_ms.get(_$2,"id=?"),js_45delete=_ms.get(_$2,"js-delete"),js_45set=_ms.get(_$2,"js-set"),js_45sub=_ms.get(_$2,"js-sub"),js_45typeof=_ms.get(_$2,"js-typeof"),Kind=_ms.getDefaultExport(Kind_3),_$3=_ms.getModule(Type_4),_61_62=_ms.get(_$3,"=>"),_$4=_ms.lazyGetModule(_64_5),_43_43=_ms.lazyProp(_$4,"++"),all_63=_ms.lazyProp(_$4,"all?"),count=_ms.lazyProp(_$4,"count"),empty_63=_ms.lazyProp(_$4,"empty?"),_64keep=_ms.lazyProp(_$4,"@keep"),_$5=_ms.lazyGetModule(_63_6),_63_45or=_ms.lazyProp(_$5,"?-or"),Opt_45_62_63=_ms.lazyProp(_$5,"Opt->?"),_63None=_ms.lazyProp(_$5,"?None"),Map=_ms.lazy(()=>_ms.getDefaultExport(Map_7)),_$6=_ms.lazyGetModule(Map_7),make_45map=_ms.lazyProp(_$6,"make-map"),Id_45Set=_ms.lazy(()=>_ms.getDefaultExport(Id_45Set_8));
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
		const forbidden_45fun_45props=_ms.lazy(()=>_61_62(_ms.unlazy(Id_45Set),["arguments","caller"]));
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
			const obj_45a=(! id_61_63(a,null)&&id_61_63(js_45typeof(a),"object"));
			const obj_45b=(! id_61_63(b,null)&&id_61_63(js_45typeof(b),"object"));
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
		const empty_45Object=exports["empty-Object"]=Object.freeze(new (Object)());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvT2JqZWN0Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBWUEseUNBQVksS0FBSSxNQUNJLEtBQUE7O2NBQ25CO0dBQ0Esc0NBQWMsQ0FBQyxPQUFPOzs7RUFFdkIsK0JBQVEsaUJBQVMsSUFBSTtxQkFBSzs0QkFBakIsNkJBRUYsWUFBVSxJQUFJLE1BQU07O0VBRTNCLDJDQUF1Qiw0QkFBVSxDQUFFLFlBQVc7RUFDOUMscURBQWtCLDZCQUFBO0dBR2pCLFlBQVEsMkJBQU87R0FFZixrQkFDZ0I7SUFBZixnQkFBQyxTQUFELEdBQ1M7Z0NBQUYsTUFBTzthQUNaLG1EQUFJO0tBQUE7SUFBQSxPQUVGO1lBQUg7SUFBQTtHQUFBOzZCQUNDLFlBQVUsNkJBQU87RUFBQTtFQUVyQiwyQ0FBYyx1QkFBQTtVQUdUO0lBQUgsR0FBQSxVQUFBLEdBQ1E7WUFBUCxZQUFPO0lBQUEsT0FFSjtZQUFIO0lBQUE7R0FBQTtFQUFBO0VBRUgsdUNBQVkscUJBQUEsRUFBRTtxQkFBVTtVQUV2QixDQUFHLFlBQVUsRUFBRSwyQkFDUztXQUF2QixTQUFPLEVBQUU7R0FBQTs7RUFFWCxpRUFBdUIsb0NBQUEsRUFBRTtxQkFBVTtVQUc5QjtJQUFILEdBQUEsVUFBQSxHQUNRO3FDQUFDLFNBQU8sRUFBRTtJQUFBLE9BRWQ7Ozs7O0VBRU4sdUNBQVkscUJBQUEsRUFBRTtxQkFBVTtVQUV2QixDQUFJLFVBQUEsSUFBVSxxQ0FBcUMsRUFBRTtFQUFBO0VBRXRELGlFQUF1QixvQ0FBQSxFQUFFO3FCQUFVO1VBRWxDLENBQUksVUFBQSxJQUFVLFdBQVUsU0FBTyxFQUFFO0VBQUE7RUFHbEMsdUNBQVcsc0JBQUEsRUFBRTtHQUlaLGNBQVEsQ0FBSyxFQUFLLFNBQUssRUFBRSxPQUFRLFNBQU0sWUFBVSxHQUFJO0dBQ3JELGNBQVEsQ0FBSyxFQUFLLFNBQUssRUFBRSxPQUFRLFNBQU0sWUFBVSxHQUFJO1VBRWpEO0lBQUgsR0FBQSxFQUFJLENBQUcsU0FBTSxTQUNLO1lBQWpCLFNBQUssRUFBRTtJQUFBLE9BQ1IsR0FBQSxJQUFJLFFBQU0sU0FDSztZQUFkO0lBQUEsT0FFRztLQUFILGtCQUFZLFNBQU0sc0JBQXNCLEdBQUksc0JBQXNCO1lBQ2xFLENBQUksYUFDUyxLQUFBO01BQVosU0FBSywyQkFBMkI7TUFDaEMsU0FBSywyQkFBMkI7YUFDaEMsQ0FBSyx5QkFBVSxzQkFBVyxNQUNJLEtBQUE7aUNBQXhCLEdBQUk7ZUFDUixPQUFJLFNBQU8sRUFBRSxHQUFJLFNBQU8sRUFBRTtPQUFBO01BQUE7S0FBQTtJQUFBO0dBQUE7RUFBQTtFQUVoQyw2Q0FBYyxjQUFlLEtBQUk7RUFFakMsaURBQWdCLDJCQUFBO3FCQUFFOytCQUVWLG9CQUFBO0VBQUE7RUFFUiw2Q0FBYyx5QkFBQTtpQ0FFSixvQkFBQSxHQUFrQjtXQUMxQixTQUFPLEVBQUU7R0FBQTtFQUFBO0VBRVgsNkNBQWMseUJBQUE7O1VBRVIsTUFDaUI7SUFBakIsUUFBQSxRQUFRLEVBQ0M7S0FDWixTQUFPLFlBQUksS0FBSyxXQUFHLEtBQUs7SUFBQTs7TUFIckIsS0FBSTtFQUFBO0VBTVQsdURBQW9CLDhCQUFBLEVBQVM7cUJBQVA7cUJBQWlCO2NBQy9CLFlBQVUsRUFBRTtHQUNuQixZQUFVLEVBQUU7RUFBQTtFQUVkLDZDQUFlOztVQUNkLGNBQWUsS0FBSSxVQUFRLEdBQUc7RUFBQTtFQUUvQiwrQ0FBZ0IseUJBQUE7O3FCQUFJO1VBQ2QsT0FDa0I7SUFBbEIsUUFBQSxPQUFPLFFBQ0s7S0FBZixTQUFPLEtBQUssSUFBSyxTQUFPLElBQUk7SUFBQTs7TUFGekIsS0FBSTtFQUFBO0VBSVYseURBQW9CLCtCQUFBLElBQVc7cUJBQVA7cUJBQWM7VUFDaEMsU0FDb0I7SUFBcEIsUUFBQSxPQUFPLGNBQVksS0FDRztLQUF6QixTQUFPLE9BQU8sSUFBSyxPQUFRLFNBQU8sSUFBSTtJQUFBOztNQUZuQyxLQUFJO0VBQUEiLCJmaWxlIjoiT2JqZWN0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
