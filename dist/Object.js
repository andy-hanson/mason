"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Boolean","./compare","./js","./Type/Kind","./Type/primitive","./Type/Type","./at/at","./at/q","./at/Map/Map","./at/Set/Id-Set"],(exports,Boolean_0,compare_1,js_2,Kind_3,primitive_4,Type_5,_64_6,_63_7,Map_8,Id_45Set_9)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(Boolean_0),xor=_ms.get(_$0,"xor"),_$1=_ms.getModule(compare_1),_61_63=_ms.get(_$1,"=?"),_$2=_ms.getModule(js_2),defined_63=_ms.get(_$2,"defined?"),exists_63=_ms.get(_$2,"exists?"),id_61_63=_ms.get(_$2,"id=?"),js_45delete=_ms.get(_$2,"js-delete"),js_45set=_ms.get(_$2,"js-set"),js_45sub=_ms.get(_$2,"js-sub"),Kind=_ms.getDefaultExport(Kind_3),_$3=_ms.getModule(primitive_4),Bool=_ms.get(_$3,"Bool"),_$4=_ms.getModule(Type_5),_61_62=_ms.get(_$4,"=>"),_$5=_ms.lazyGetModule(_64_6),_43_43=_ms.lazyProp(_$5,"++"),all_63=_ms.lazyProp(_$5,"all?"),count=_ms.lazyProp(_$5,"count"),empty_63=_ms.lazyProp(_$5,"empty?"),_64keep=_ms.lazyProp(_$5,"@keep"),_$6=_ms.lazyGetModule(_63_7),_63_45or=_ms.lazyProp(_$6,"?-or"),Opt_45_62_63=_ms.lazyProp(_$6,"Opt->?"),_63None=_ms.lazyProp(_$6,"?None"),Map=_ms.lazy(()=>_ms.getDefaultExport(Map_8)),_$7=_ms.lazyGetModule(Map_8),make_45map=_ms.lazyProp(_$7,"make-map"),Id_45Set=_ms.lazy(()=>_ms.getDefaultExport(Id_45Set_9));
		let Object_45Key=exports["Object-Key"]=new (Kind)((()=>{
			let built={};
			built.name="Object-Key";
			let implementors=built.implementors=[String,Symbol];
			return built
		})());
		let flag_63=exports["flag?"]=function flag_63(obj,flag){
			_ms.checkContains(Object_45Key,flag,"flag");
			return _ms.checkContains(Bool,_ms.unlazy(_63_45or)(_63property(obj,flag),false),"returned value")
		};
		let forbidden_45fun_45props=_ms.lazy(()=>_61_62(_ms.unlazy(Id_45Set),["arguments","caller"]));
		let _64all_45properties=exports["@all-properties"]=function _64all_45properties(_){
			let props=Object.getOwnPropertyNames(_);
			let own_45names=(_ms.contains(Function,_)?_ms.unlazy(_64keep)(props,_=>! _ms.contains(_ms.unlazy(forbidden_45fun_45props),_)):props);
			return _ms.unlazy(_43_43)(own_45names,Object.getOwnPropertySymbols(_))
		};
		let _64properties=exports["@properties"]=function _64properties(_){
			return (exists_63(_)?Object.keys(_):[])
		};
		let _63property=exports["?property"]=function _63property(_,prop_45name){
			_ms.checkContains(Object_45Key,prop_45name,"prop-name");
			return (property_63(_,prop_45name)?_ms.some((()=>{
				return js_45sub(_,prop_45name)
			})()):_ms.None)
		};
		let _63property_45with_45proto=exports["?property-with-proto"]=function _63property_45with_45proto(_,prop_45name){
			_ms.checkContains(Object_45Key,prop_45name,"prop-name");
			return (exists_63(_)?_ms.unlazy(Opt_45_62_63)(js_45sub(_,prop_45name)):_ms.unlazy(_63None))
		};
		let property_63=exports["property?"]=function property_63(_,prop_45name){
			_ms.checkContains(Object_45Key,prop_45name,"prop-name");
			return (exists_63(_)&&Object.prototype.hasOwnProperty.call(_,prop_45name))
		};
		let property_45with_45proto_63=exports["property-with-proto?"]=function property_45with_45proto_63(_,prop_45name){
			_ms.checkContains(Object_45Key,prop_45name,"prop-name");
			return (exists_63(_)&&defined_63(js_45sub(_,prop_45name)))
		};
		let object_61_63=exports["object=?"]=function object_61_63(a,b){
			return (()=>{
				if(! (_ms.contains(Object,a)||_ms.contains(Object,b))){
					return id_61_63(a,b)
				} else if(xor(_ms.contains(Object,a),_ms.contains(Object,b))){
					return false
				} else {
					let same_45type=id_61_63(Object.getPrototypeOf(a),Object.getPrototypeOf(b));
					return (same_45type&&(()=>{
						let ak=Object.getOwnPropertyNames(a);
						let bk=Object.getOwnPropertyNames(b);
						return (_61_63(_ms.unlazy(count)(ak),_ms.unlazy(count)(bk))&&(()=>{
							return _ms.unlazy(all_63)(ak,k=>{
								return _61_63(js_45sub(a,k),js_45sub(b,k))
							})
						})())
					})())
				}
			})()
		};
		let empty_45Object=exports["empty-Object"]=Object.freeze(new (Object)());
		let empty_45Object_63=exports["empty-Object?"]=function empty_45Object_63(_){
			_ms.checkContains(Object,_,"_");
			return _ms.unlazy(empty_63)(_64all_45properties(_))
		};
		let Object_45_62Map=exports["Object->Map"]=function Object_45_62Map(_){
			return _ms.unlazy(make_45map)(_64all_45properties(_),_ms.sub(js_45sub,_))
		};
		let Map_45_62Object=exports["Map->Object"]=function Map_45_62Object(_){
			_ms.checkContains(_ms.unlazy(Map),_,"_");
			return (()=>{
				let obj=new (Object)();
				for(let elem of _){
					js_45set(obj,_ms.sub(elem,0),_ms.sub(elem,1))
				};
				return obj
			})()
		};
		let delete_45property_33=exports["delete-property!"]=function delete_45property_33(_,prop_45name){
			_ms.checkContains(Object,_,"_");
			_ms.checkContains(Object_45Key,prop_45name,"prop-name");
			_ms.assert(property_63,_,prop_45name);
			js_45delete(_,prop_45name)
		};
		let object_45merge=exports["object-merge"]=function object_45merge(){
			let objects=[].slice.call(arguments,0);
			return Object.assign(new (Object)(),...objects)
		};
		let object_45select=exports["object-select"]=function object_45select(obj){
			let _64keys=[].slice.call(arguments,1);
			_ms.checkContains(Object,obj,"obj");
			return (()=>{
				let kept=new (Object)();
				for(let key of _64keys){
					js_45set(kept,key,js_45sub(obj,key))
				};
				return kept
			})()
		};
		let map_45object_45values=exports["map-object-values"]=function map_45object_45values(obj,mapper){
			_ms.checkContains(Object,obj,"obj");
			_ms.checkContains(Function,mapper,"mapper");
			return (()=>{
				let mapped=new (Object)();
				for(let key of _64properties(obj)){
					js_45set(mapped,key,mapper(js_45sub(obj,key)))
				};
				return mapped
			})()
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvT2JqZWN0Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBYUEsdUNBQVksS0FBSSxNQUNJLEtBQUE7O2NBQ25CO0dBQ0Esb0NBQWMsQ0FBQyxPQUFPOzs7RUFFdkIsNkJBQVEsaUJBQU0sSUFBSTtxQkFBSzs0QkFBZCwwQkFFRixZQUFVLElBQUksTUFBTTs7RUFFM0IseUNBQXVCLDRCQUFVLENBQUUsWUFBVztFQUM5QyxtREFBbUIsNkJBQUE7R0FJbEIsVUFBUSwyQkFBMkI7R0FDbkMsZ0JBQWlCLGNBQUMsU0FBRCx1QkFBaUIsU0FBUSxtREFBSSxJQUF1Qjs2QkFDbEUsWUFBVSw2QkFBNkI7RUFBQTtFQUUzQyx5Q0FBZSx1QkFBQTtVQUVULENBQUEsVUFBUSxHQUFDLFlBQVksR0FBQztFQUFBO0VBRTVCLHFDQUFhLHFCQUFBLEVBQUM7cUJBQVU7VUFFcEIsQ0FBQSxZQUFXLEVBQUMsMkJBQ1M7V0FBdkIsU0FBUSxFQUFDO0dBQUE7O0VBRVgsK0RBQXdCLG9DQUFBLEVBQUM7cUJBQVU7VUFFN0IsQ0FBQSxVQUFRLDRCQUFVLFNBQVEsRUFBQzs7RUFFakMscUNBQWEscUJBQUEsRUFBQztxQkFBVTtVQUV2QixDQUFJLFVBQVEsSUFBRSxxQ0FBc0MsRUFBQztFQUFBO0VBRXRELCtEQUF3QixvQ0FBQSxFQUFDO3FCQUFVO1VBRWxDLENBQUksVUFBUSxJQUFFLFdBQVUsU0FBUSxFQUFDO0VBQUE7RUFHbEMscUNBQVcsc0JBQUEsRUFBRTtVQUlSO0lBQUgsR0FBQSxFQUFJLGNBQUssT0FBRixpQkFBVyxPQUFGLElBQ1E7WUFBdkIsU0FBSyxFQUFFO0lBQUEsT0FDUixHQUFBLGlCQUFNLE9BQUYsZ0JBQVcsT0FBRixJQUNRO1lBQXBCO0lBQUEsT0FFRztLQUFILGdCQUFZLFNBQU0sc0JBQXNCLEdBQUksc0JBQXNCO1lBQ2xFLENBQUksYUFDUyxLQUFBO01BQVosT0FBSywyQkFBMkI7TUFDaEMsT0FBSywyQkFBMkI7YUFDaEMsQ0FBSyx5QkFBVSxzQkFBVyxNQUNJLEtBQUE7aUNBQXhCLEdBQUk7ZUFDUixPQUFJLFNBQU8sRUFBRSxHQUFJLFNBQU8sRUFBRTtPQUFBO01BQUE7S0FBQTtJQUFBO0dBQUE7RUFBQTtFQUVoQywyQ0FBYyxjQUFjLEtBQUk7RUFFaEMsK0NBQWdCLDJCQUFBO3FCQUFFOytCQUVWLG9CQUFnQjtFQUFBO0VBRXhCLDJDQUFlLHlCQUFBO2lDQUVMLG9CQUFnQixXQUFDLFNBQVE7RUFBQTtFQUVuQywyQ0FBYyx5QkFBQTs7VUFFUixLQUNpQjtZQURqQixLQUFJO0lBQ0osUUFBQSxRQUFTLEVBQ0E7S0FDWixTQUFPLFlBQUksS0FBSyxXQUFHLEtBQUs7SUFBQTs7OztFQUcxQixxREFBb0IsOEJBQUEsRUFBUztxQkFBUDtxQkFBaUI7Y0FDL0IsWUFBVyxFQUFDO0dBQ25CLFlBQVcsRUFBQztFQUFBO0VBRWQsMkNBQWU7O1VBQ2QsY0FBZSxLQUFJLFVBQVEsR0FBRztFQUFBO0VBRS9CLDZDQUFnQix5QkFBQTs7cUJBQUk7VUFDZCxLQUNrQjthQURsQixLQUFJO0lBQ0osUUFBQSxPQUFPLFFBQ0s7S0FBZixTQUFPLEtBQUssSUFBSyxTQUFPLElBQUk7SUFBQTs7OztFQUUvQix1REFBb0IsK0JBQUEsSUFBVztxQkFBUDtxQkFBYztVQUNoQyxLQUNvQjtlQURwQixLQUFJO0lBQ0osUUFBQSxPQUFPLGNBQVksS0FDRztLQUF6QixTQUFPLE9BQU8sSUFBSyxPQUFRLFNBQU8sSUFBSTtJQUFBIiwiZmlsZSI6Ik9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
