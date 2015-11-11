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
			const own_45names=(_ms.contains(Function,_)?_ms.unlazy(_64keep)(props,_=>! _ms.contains(_ms.unlazy(forbidden_45fun_45props),_)):props);
			return _ms.unlazy(_43_43)(own_45names,Object.getOwnPropertySymbols(_))
		};
		const _64properties=exports["@properties"]=function _64properties(_){
			return (exists_63(_)?Object.keys(_):[])
		};
		const _63property=exports["?property"]=function _63property(_,prop_45name){
			_ms.checkContains(Object_45Key,prop_45name,"prop-name");
			return (property_63(_,prop_45name)?_ms.some((()=>{
				return js_45sub(_,prop_45name)
			})()):_ms.None)
		};
		const _63property_45with_45proto=exports["?property-with-proto"]=function _63property_45with_45proto(_,prop_45name){
			_ms.checkContains(Object_45Key,prop_45name,"prop-name");
			return (exists_63(_)?_ms.unlazy(Opt_45_62_63)(js_45sub(_,prop_45name)):_ms.unlazy(_63None))
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
			return _ms.unlazy(make_45map)(_64all_45properties(_),_ms.sub(js_45sub,_))
		};
		const Map_45_62Object=exports["Map->Object"]=function Map_45_62Object(_){
			_ms.checkContains(_ms.unlazy(Map),_,"_");
			return (()=>{
				const obj=new (Object)();
				for(let elem of _){
					js_45set(obj,_ms.sub(elem,0),_ms.sub(elem,1))
				};
				return obj
			})()
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
			return (()=>{
				const kept=new (Object)();
				for(let key of _64keys){
					js_45set(kept,key,js_45sub(obj,key))
				};
				return kept
			})()
		};
		const map_45object_45values=exports["map-object-values"]=function map_45object_45values(obj,mapper){
			_ms.checkContains(Object,obj,"obj");
			_ms.checkContains(Function,mapper,"mapper");
			return (()=>{
				const mapped=new (Object)();
				for(let key of _64properties(obj)){
					js_45set(mapped,key,mapper(js_45sub(obj,key)))
				};
				return mapped
			})()
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvT2JqZWN0Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBWUEseUNBQVksS0FBSSxNQUNJLEtBQUE7O2NBQ25CO0dBQ0Esc0NBQWMsQ0FBQyxPQUFPOzs7RUFFdkIsK0JBQVEsaUJBQVMsSUFBSTtxQkFBSzs0QkFBakIsNkJBRUYsWUFBVSxJQUFJLE1BQU07O0VBRTNCLDJDQUF1Qiw0QkFBVSxDQUFFLFlBQVc7RUFDOUMscURBQWtCLDZCQUFBO0dBSWpCLFlBQVEsMkJBQU87R0FDZixrQkFBaUIsY0FBQyxTQUFELHVCQUFpQixTQUFRLG1EQUFJLElBQXVCOzZCQUNsRSxZQUFVLDZCQUFPO0VBQUE7RUFFckIsMkNBQWMsdUJBQUE7VUFFUixDQUFBLFVBQUEsR0FBUyxZQUFPLEdBQU07RUFBQTtFQUU1Qix1Q0FBWSxxQkFBQSxFQUFFO3FCQUFVO1VBRXBCLENBQUEsWUFBVSxFQUFFLDJCQUNTO1dBQXZCLFNBQU8sRUFBRTtHQUFBOztFQUVYLGlFQUF1QixvQ0FBQSxFQUFFO3FCQUFVO1VBRTdCLENBQUEsVUFBQSw0QkFBa0IsU0FBTyxFQUFFOztFQUVqQyx1Q0FBWSxxQkFBQSxFQUFFO3FCQUFVO1VBRXZCLENBQUksVUFBQSxJQUFVLHFDQUFxQyxFQUFFO0VBQUE7RUFFdEQsaUVBQXVCLG9DQUFBLEVBQUU7cUJBQVU7VUFFbEMsQ0FBSSxVQUFBLElBQVUsV0FBVSxTQUFPLEVBQUU7RUFBQTtFQUdsQyx1Q0FBVyxzQkFBQSxFQUFFO0dBSVosY0FBUSxDQUFLLEVBQUssU0FBSyxFQUFFLE9BQVEsU0FBTSxZQUFVLEdBQUk7R0FDckQsY0FBUSxDQUFLLEVBQUssU0FBSyxFQUFFLE9BQVEsU0FBTSxZQUFVLEdBQUk7VUFFakQ7SUFBSCxHQUFBLEVBQUksQ0FBRyxTQUFNLFNBQ0s7WUFBakIsU0FBSyxFQUFFO0lBQUEsT0FDUixHQUFBLElBQUksUUFBTSxTQUNLO1lBQWQ7SUFBQSxPQUVHO0tBQUgsa0JBQVksU0FBTSxzQkFBc0IsR0FBSSxzQkFBc0I7WUFDbEUsQ0FBSSxhQUNTLEtBQUE7TUFBWixTQUFLLDJCQUEyQjtNQUNoQyxTQUFLLDJCQUEyQjthQUNoQyxDQUFLLHlCQUFVLHNCQUFXLE1BQ0ksS0FBQTtpQ0FBeEIsR0FBSTtlQUNSLE9BQUksU0FBTyxFQUFFLEdBQUksU0FBTyxFQUFFO09BQUE7TUFBQTtLQUFBO0lBQUE7R0FBQTtFQUFBO0VBRWhDLDZDQUFjLGNBQWUsS0FBSTtFQUVqQyxpREFBZ0IsMkJBQUE7cUJBQUU7K0JBRVYsb0JBQUE7RUFBQTtFQUVSLDZDQUFjLHlCQUFBO2lDQUVKLG9CQUFBLFdBQWlCLFNBQU87RUFBQTtFQUVsQyw2Q0FBYyx5QkFBQTs7VUFFUixLQUNpQjtjQURqQixLQUFJO0lBQ0osUUFBQSxRQUFRLEVBQ0M7S0FDWixTQUFPLFlBQUksS0FBSyxXQUFHLEtBQUs7SUFBQTs7OztFQUcxQix1REFBb0IsOEJBQUEsRUFBUztxQkFBUDtxQkFBaUI7Y0FDL0IsWUFBVSxFQUFFO0dBQ25CLFlBQVUsRUFBRTtFQUFBO0VBRWQsNkNBQWU7O1VBQ2QsY0FBZSxLQUFJLFVBQVEsR0FBRztFQUFBO0VBRS9CLCtDQUFnQix5QkFBQTs7cUJBQUk7VUFDZCxLQUNrQjtlQURsQixLQUFJO0lBQ0osUUFBQSxPQUFPLFFBQ0s7S0FBZixTQUFPLEtBQUssSUFBSyxTQUFPLElBQUk7SUFBQTs7OztFQUUvQix5REFBb0IsK0JBQUEsSUFBVztxQkFBUDtxQkFBYztVQUNoQyxLQUNvQjtpQkFEcEIsS0FBSTtJQUNKLFFBQUEsT0FBTyxjQUFZLEtBQ0c7S0FBekIsU0FBTyxPQUFPLElBQUssT0FBUSxTQUFPLElBQUk7SUFBQSIsImZpbGUiOiJPYmplY3QuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
