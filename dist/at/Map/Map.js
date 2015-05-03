"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Bool","../../compare","../../Fun","../../Generatorbang","../../methods","../../Type/Type","../../Type/Kind","../../Type/Method","../../Type/Pred-Type","../at","../at-Type","../q","./Hash-Mapbang","./Mapbang","../../bang","../../math/methods"],function(exports,Bool_0,compare_1,Fun_2,Generator_33_3,methods_4,Type_5,Kind_6,Method_7,Pred_45Type_8,_64_9,_64_45Type_10,_63_11,Hash_45Map_33_12,Map_33_13,_33_14,methods_15){
	exports._get=_ms.lazy(function(){
		const Bool=_ms.getDefaultExport(Bool_0),_$2=_ms.getModule(Bool_0),and=_ms.get(_$2,"and"),not=_ms.get(_$2,"not"),_$3=_ms.getModule(compare_1),_61_63=_ms.get(_$3,"=?"),Fun=_ms.getDefaultExport(Fun_2),_$5=_ms.getModule(Generator_33_3),each_126=_ms.get(_$5,"each~"),_$6=_ms.getModule(methods_4),sub=_ms.get(_$6,"sub"),_$7=_ms.getModule(Type_5),type_45of=_ms.get(_$7,"type-of"),Kind=_ms.getDefaultExport(Kind_6),_$8=_ms.getModule(Kind_6),kind_33=_ms.get(_$8,"kind!"),Method=_ms.getDefaultExport(Method_7),_$9=_ms.getModule(Method_7),impl_33=_ms.get(_$9,"impl!"),_$10=_ms.getModule(Pred_45Type_8),Any=_ms.get(_$10,"Any"),_64=_ms.getDefaultExport(_64_9),_$11=_ms.getModule(_64_9),all_63=_ms.get(_$11,"all?"),count=_ms.get(_$11,"count"),each_33=_ms.get(_$11,"each!"),empty_63=_ms.get(_$11,"empty?"),iterator=_ms.get(_$11,"iterator"),map=_ms.get(_$11,"map"),_$12=_ms.getModule(_64_45Type_10),empty=_ms.get(_$12,"empty"),_63=_ms.getDefaultExport(_63_11),_$13=_ms.getModule(_63_11),un_45_63=_ms.get(_$13,"un-?"),Hash_45Map_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Hash_45Map_33_12)
		}),_$16=_ms.lazyGetModule(Map_33_13),assoc_33=_ms.lazyProp(_$16,"assoc!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_14)
		}),_$19=_ms.lazyGetModule(methods_15),_43=_ms.lazyProp(_$19,"+");
		const exports={};
		const Map=Kind(function(){
			const doc="Mapping from keys to values.";
			return {
				doc:doc,
				displayName:"Map"
			}
		}());
		kind_33(Map,_64);
		impl_33(iterator,Map,function(_){
			return each_126(keys(_),function*(k){
				return (yield {
					key:k,
					val:_ms.sub(_,k)
				})
			})
		});
		const _63get=exports["?get"]=Method(function(){
			const doc=function(_,key){
				_ms.checkContains(Any,key,"key");
				return _ms.checkContains(_63,"`?` containing the value corresponding to `key`, if any.","res")
			};
			return {
				doc:doc,
				displayName:"?get"
			}
		}());
		const has_45key_63=exports["has-key?"]=Method(function(){
			const doc=function(_,key){
				_ms.checkContains(Any,key,"key");
				return _ms.checkContains(Bool,"Whether the key is in the Map.","res")
			};
			const _default=function(_,key){
				_ms.checkContains(Any,key,"key");
				return not(empty_63(_63get(_,key)))
			};
			return {
				doc:doc,
				default:_default,
				displayName:"has-key?"
			}
		}());
		const keys=exports.keys=Method(function(){
			const doc=function(_){
				return _ms.checkContains(_64,"Every key that the Map `has-key?`.","res")
			};
			return {
				doc:doc,
				displayName:"keys"
			}
		}());
		const values=exports.values=Method(function(){
			const doc=function(_){
				return _ms.checkContains(_64,"Every value in the Map.","res")
			};
			const _default=function(_){
				return map(keys(_),function(key){
					return _ms.sub(_,key)
				})
			};
			return {
				doc:doc,
				default:_default,
				displayName:"values"
			}
		}());
		const keys_45values=exports["keys-values"]=Method(function(){
			const doc=function(){
				return _ms.checkContains(_ms.sub(_64,Any),"Every { key, val }.","res")
			};
			const _default=function(_){
				return map(keys(_),function(k){
					const key=k;
					const val=_ms.sub(_,k);
					return {
						key:key,
						val:val
					}
				})
			};
			return {
				doc:doc,
				default:_default,
				displayName:"keys-values"
			}
		}());
		impl_33(_61_63,Map,function(m1,m2){
			return and(_61_63(type_45of(m1),type_45of(m2)),_ms.lazy(function(){
				return map_61_63(m1,m2)
			}))
		});
		impl_33(count,Map,function(){
			const test=function(){
				const map=function(){
					const _k0=1,_v0=2;
					const _k1=3,_v1=4;
					return _ms.map(_k0,_v0,_k1,_v1)
				}();
				const _k0=[map],_v0=2;
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function(_){
				return count(keys(_))
			},"test",test)
		}());
		impl_33(empty_63,Map,function(_){
			return empty_63(keys(_))
		});
		impl_33(sub,Map,function(map,key){
			_ms.checkContains(Any,key,"key");
			return un_45_63(_63get(map,key),_ms.lazy(function(){
				return ((((""+_ms.show(map))+" does not contain ")+_ms.show(key))+".")
			}))
		});
		const make_45map=exports["make-map"]=function(){
			const doc="Creates a Map whose values are the result of applying `get-value` to each key.";
			const test=function(){
				const map=make_45map([1,2],function(x){
					return _ms.unlazy(_43)(x,1)
				});
				_ms.unlazy(_33)(_61_63,_ms.sub(map,1),2);
				return _ms.unlazy(_33)(_61_63,_ms.sub(map,2),3)
			};
			return _ms.set(function(_64key,get_45value){
				_ms.checkContains(_64,_64key,"@key");
				_ms.checkContains(Fun,get_45value,"get-value");
				const map=empty(_ms.unlazy(Hash_45Map_33));
				each_33(_64key,function(_){
					return _ms.unlazy(assoc_33)(map,_,get_45value(_))
				});
				return map
			},"doc",doc,"test",test,"displayName","make-map")
		}();
		const map_61_63=exports["map=?"]=function(){
			const doc="Whether the two maps have the same keys and the same associated values, regardless of the maps' types.";
			const test=function(){
				const m1=function(){
					const _k0=1,_v0=2;
					const _k1=3,_v1=4;
					return _ms.map(_k0,_v0,_k1,_v1)
				}();
				const m2=function(){
					const _k0=1,_v0=2;
					return _ms.map(_k0,_v0)
				}();
				const _k0=[m1,m1],_v0=true;
				const _k1=[m1,m2],_v1=false;
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function(a,b){
				_ms.checkContains(Map,a,"a");
				_ms.checkContains(Map,b,"b");
				return and(_61_63(count(a),count(b)),_ms.lazy(function(){
					return function(){
						return all_63(keys(a),function(key){
							const _63bk=_63get(b,key);
							return and(not(empty_63(_63bk)),_ms.lazy(function(){
								return _61_63(_ms.sub(a,key),_63bk.val)
							}))
						})
					}()
				}))
			},"doc",doc,"test",test,"displayName","map=?")
		}();
		exports.default=Map;
		const displayName=exports.displayName="Map";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9NYXAubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2lDQW9CQTs7Ozs7OztFQUFBLFVBQU0sZUFBSTtHQUNULFVBQU07VUFERzs7Ozs7RUFHVixRQUFBLElBQUE7RUFDQSxRQUFBLFNBQUEsSUFBb0IsU0FBQSxFQUNuQjtVQUFBLFNBQUEsS0FBTSxHQUFRLFVBQUEsRUFDYjtXQUFHLE9BQUE7U0FBSztpQkFBTyxFQUFDO0lBQUE7R0FBQTtFQUFBO0VBR2pCLDZCQUFNLGlCQUFNO0dBQ1gsVUFBTSxTQUFHLEVBQUUsSUFDVjtzQkFEYzs2QkFBUixJQUNMOztVQUZTOzs7OztFQUlaLHVDQUFVLGlCQUFNO0dBQ2YsVUFBTSxTQUFNLEVBQUUsSUFDYjtzQkFEaUI7NkJBQVgsS0FDTDs7R0FDRixlQUFVLFNBQUEsRUFBRSxJQUNYO3NCQURlO1dBQ2YsSUFBSSxTQUFRLE9BQU0sRUFBTjtHQUFBO1VBSkU7Ozs7OztFQU1oQix3QkFBTSxpQkFBTTtHQUNYLFVBQU0sU0FBRyxFQUNSOzZCQURNLElBQ0w7O1VBRlM7Ozs7O0VBSVosNEJBQVEsaUJBQU07R0FDYixVQUFNLFNBQUcsRUFDUjs2QkFETSxJQUNMOztHQUNGLGVBQVUsU0FBQSxFQUNUO1dBQUEsSUFBQSxLQUFJLEdBQU8sU0FBQSxJQUNWO29CQUFBLEVBQUM7SUFBQTtHQUFBO1VBTFU7Ozs7OztFQU9kLDJDQUFhLGlCQUFNO0dBQ2xCLFVBQU0sVUFDTDtxQ0FETSxJQUFDLEtBQ047O0dBQ0YsZUFBVSxTQUFBLEVBQ1Q7V0FBQSxJQUFBLEtBQUksR0FBTyxTQUFBLEVBQ1Y7S0FBQSxVQUFLO0tBQ0wsa0JBQUssRUFBQztZQUROOzs7Ozs7VUFMZ0I7Ozs7OztFQVNuQixRQUFBLE9BQUEsSUFBYyxTQUFBLEdBQUcsR0FDaEI7VUFBQSxJQUFJLE9BQUksVUFBQSxJQUFhLFVBQUE7V0FBZSxVQUFBLEdBQUE7R0FBQTtFQUFBO0VBRXJDLFFBQUEsTUFBQSxjQUFlO0dBQ2QsV0FBTyxVQUNOO0lBQUEsb0JBQUs7S0FDSixVQUFBLE1BQUs7S0FDTCxVQUFBLE1BQUs7OztJQUNOLFVBQUEsQ0FBQSxTQUFXOzs7a0JBQ1gsU0FBQSxFQUNBO1dBQUEsTUFBQSxLQUFNO0dBQUE7O0VBRVIsUUFBQSxTQUFBLElBQWtCLFNBQUEsRUFDakI7VUFBQSxTQUFBLEtBQU87RUFBQTtFQUVSLFFBQUEsSUFBQSxJQUFlLFNBQUEsSUFBSSxJQUNsQjtxQkFEc0I7VUFDdEIsU0FBSyxPQUFBLElBQUE7V0FBaUIsSUE3RFUsWUE2RFYscUNBQXVCOzs7RUFHOUMsK0NBQVM7R0FDUixVQUFNO0dBQ04sV0FBTyxVQUNOO0lBQUEsVUFBTSxXQUFTLENBQUUsRUFBRSxHQUFLLFNBQUEsRUFDdkI7NEJBQUEsRUFBSTtJQUFBO29CQUNMLGVBQUssSUFBSSxHQUFHOzJCQUNaLGVBQUssSUFBSSxHQUFHO0dBQUE7a0JBQ1osU0FBQSxPQUFPLFlBQ1A7c0JBREs7c0JBQVk7SUFDakIsVUFBTTtJQUNOLFFBQUEsT0FBWSxTQUFBLEVBQ1g7aUNBQUEsSUFBVyxFQUFYLFlBQWE7SUFBQTtXQUNkO0dBQUE7O0VBRUYsMkNBQU07R0FDTCxVQUFNO0dBQ04sV0FBTyxVQUNOO0lBQUEsbUJBQUk7S0FDSCxVQUFBLE1BQUs7S0FDTCxVQUFBLE1BQUs7OztJQUNOLG1CQUFJO0tBQ0gsVUFBQSxNQUFLOzs7SUFDTixVQUFBLENBQUEsR0FBQSxRQUFhO0lBQ2IsVUFBQSxDQUFBLEdBQUEsUUFBYTs7O2tCQUNiLFNBQUEsRUFBTSxFQUNOO3NCQURFO3NCQUFNO1dBQ1IsSUFBSSxPQUFJLE1BQUEsR0FBVSxNQUFBO3NCQUFZO2FBQzdCLE9BQUssS0FBQSxHQUFVLFNBQUEsSUFDZDtPQUFBLFlBQU0sT0FBQSxFQUFBO2NBQ04sSUFBSSxJQUFLLFNBQUE7ZUFBZSxlQUFJLEVBQUMsS0FBTTs7Ozs7OztrQkFFeEM7RUEzR0Esc0NBQUEiLCJmaWxlIjoiYXQvTWFwL01hcC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9