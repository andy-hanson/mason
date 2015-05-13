"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at","./at/at-Type","./at/Map/Weak-Id-Mapbang","./Bool","./compare","./Fun","./js","./math/bit-arithmetic","./math/Num","./math/methods","./Obj","./Str","./Type/Method","./bang"],function(exports,_64_0,_64_45Type_1,Weak_45Id_45Map_33_2,Bool_3,compare_4,Fun_5,js_6,bit_45arithmetic_7,Num_8,methods_9,Obj_10,Str_11,Method_12,_33_13){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(_64_0),empty_63=_ms.get(_$2,"empty?"),fold=_ms.get(_$2,"fold"),map=_ms.get(_$2,"map"),_$3=_ms.getModule(_64_45Type_1),empty=_ms.get(_$3,"empty"),Weak_45Id_45Map_33=_ms.getDefaultExport(Weak_45Id_45Map_33_2),Bool=_ms.getDefaultExport(Bool_3),_$6=_ms.getModule(compare_4),_61_63=_ms.get(_$6,"=?"),Fun=_ms.getDefaultExport(Fun_5),_$8=_ms.getModule(js_6),id_61_63=_ms.get(_$8,"id=?"),_$9=_ms.getModule(bit_45arithmetic_7),bit_45and=_ms.get(_$9,"bit-and"),hexidecimal=_ms.get(_$9,"hexidecimal"),Num=_ms.getDefaultExport(Num_8),_$10=_ms.getModule(Num_8),Int=_ms.get(_$10,"Int"),round_45towards_450=_ms.get(_$10,"round-towards-0"),_$11=_ms.getModule(methods_9),_43=_ms.get(_$11,"+"),_42=_ms.get(_$11,"*"),_$12=_ms.getModule(Obj_10),p=_ms.get(_$12,"p"),_63p=_ms.get(_$12,"?p"),_64p_45all=_ms.get(_$12,"@p-all"),Str=_ms.getDefaultExport(Str_11),Method=_ms.getDefaultExport(Method_12),_$14=_ms.getModule(Method_12),impl_33=_ms.get(_$14,"impl!"),impl_45for=_ms.get(_$14,"impl-for"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_13)
		}),_$16=_ms.lazyGetModule(_33_13),_33not=_ms.lazyProp(_$16,"!not");
		const max_45hash_45code=hexidecimal("7fffffff");
		const keep_45small=function(){
			return _ms.set(function(_){
				return bit_45and(_,max_45hash_45code)
			},"displayName","keep-small")
		}();
		const hashes=empty(Weak_45Id_45Map_33);
		const hash_45code=Method(function(){
			const doc=function(){
				return "|:Int _\nInteger used to identify a value in a Hash-Map! (or Hash-Set!).\nThis should have a high probability of being different than the hash-codes of the other values in the map."
			}();
			const test=function(){
				return _ms.set(function(){
					const a=function(){
						const x=1;
						const y=2;
						return {
							x:x,
							y:y,
							displayName:"a"
						}
					}();
					const b=function(){
						const x=1;
						const y=1;
						return {
							x:x,
							y:y,
							displayName:"b"
						}
					}();
					_ms.unlazy(_33)(_61_63,hash_45code(a),hash_45code(a));
					return _ms.unlazy(_33not)(_61_63,hash_45code(a),hash_45code(b))
				},"displayName","test")
			}();
			const _default=function(){
				return _ms.set(function(_){
					return _ms.checkContains(Int,function(){
						if(_ms.bool(id_61_63(_,null))){
							return 108
						} else if(_ms.bool(id_61_63(_,undefined))){
							return 109
						} else if(_ms.bool(hashes.has(_))){
							return hashes.get(_)
						} else if(_ms.bool(_ms.contains(Fun,_))){
							return impl_45for(hash_45code,Fun)(_)
						} else {
							hashes.set(_,17);
							const vals=map(_64p_45all(_),function(){
								return _ms.set(function(name){
									return p(_,name)
								},"displayName","vals")
							}());
							const hash=fold(vals,17,function(){
								return _ms.set(function(acc,val){
									const x=keep_45small(_42(acc,23));
									return keep_45small(_43(hash_45code(val),x))
								},"displayName","hash")
							}());
							hashes.set(_,hash);
							return hash
						}
					}(),"res")
				},"displayName","default")
			}();
			return {
				doc:doc,
				test:test,
				default:_default,
				displayName:"hash-code"
			}
		}());
		impl_33(hash_45code,Bool,function(_){
			return function(){
				if(_ms.bool(_)){
					return 1
				} else {
					return 0
				}
			}()
		});
		impl_33(hash_45code,Fun,function(fun){
			return hash_45code(function(){
				const _=_63p(fun,"displayName");
				if(_ms.bool(empty_63(_))){
					return function(){
						const _=fun.name;
						if(_ms.bool(_61_63(0,_.length))){
							return fun.toString()
						} else {
							return _
						}
					}()
				} else {
					return _.val
				}
			}())
		});
		impl_33(hash_45code,Str,function(){
			const test=function(){
				return _ms.set(function(){
					_ms.unlazy(_33)(_61_63,hash_45code("a"),hash_45code("a"));
					return _ms.unlazy(_33not)(_61_63,hash_45code("a"),hash_45code("b"))
				},"displayName","test")
			}();
			return _ms.set(function(_){
				const reducer=function(){
					return _ms.set(function(hash,ch){
						return keep_45small(_42(31,_43(hash,ch.charCodeAt(0))))
					},"displayName","reducer")
				}();
				return Array.prototype.reduce.call(_,reducer,13)
			},"test",test)
		}());
		impl_33(hash_45code,Symbol,function(){
			const test=function(){
				return _ms.set(function(){
					const sym=Symbol("test");
					return _ms.unlazy(_33)(_61_63,hash_45code(sym),hash_45code(sym))
				},"displayName","test")
			}();
			return _ms.set(function(){
				return _ms.checkContains(Int,42,"res")
			},"test",test)
		}());
		impl_33(hash_45code,Num,function(_){
			return bit_45and(round_45towards_450(_),max_45hash_45code)
		});
		const displayName=exports.displayName="hash-code";
		exports.default=hash_45code;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9oYXNoLWNvZGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQWlCQSx3QkFBZ0IsWUFBYTtFQUU3Qiw2QkFBYztrQkFBQSxTQUFBLEVBQ0M7V0FBZCxVQUFRLEVBQUU7R0FBQTs7RUFFWCxhQUFTLE1BQU07RUFFZixrQkFBWSxpQkFDTTtHQUFqQixvQkFDSTtXQUNGO0dBQUE7R0FHRixxQkFDTzttQkFBQSxVQUFBO0tBQU4sa0JBQ0c7TUFBRixRQUFHO01BQ0gsUUFBRzs7Ozs7OztLQUNKLGtCQUNHO01BQUYsUUFBRztNQUNILFFBQUc7Ozs7Ozs7cUJBQ0YsT0FBSSxZQUFVLEdBQUksWUFBVTsrQkFDekIsT0FBSSxZQUFVLEdBQUksWUFBVTtJQUFBOztHQUdsQyx5QkFBVTttQkFBQSxTQUFLLEVBQ0M7OEJBREw7TUFFVCxZQUFBLFNBQUssRUFBRSxPQUNFO2NBQVI7TUFBQSxPQUNELFlBQUEsU0FBSyxFQUFFLFlBQ1M7Y0FBZjtNQUFBLE9BQ0QsWUFBQSxXQUFXLElBQ0M7Y0FBWCxXQUFXO01BQUEsT0FDWix5QkFBQyxJQUFELElBQ0k7Y0FDRixXQUFTLFlBQVUsS0FBSztNQUFBLE9BRXRCO09BQ0gsV0FBVyxFQUFFO09BRWIsV0FBTyxJQUFJLFdBQUEsYUFBUzt1QkFBQSxTQUFBLEtBQ0k7Z0JBQXZCLEVBQUUsRUFBRTtRQUFBOztPQUNMLFdBQU8sS0FBSyxLQUFLLGFBQUk7dUJBQUEsU0FBQSxJQUFJLElBQ0c7U0FBM0IsUUFBSSxhQUFZLElBQUUsSUFBSTtnQkFDdEIsYUFBWSxJQUFHLFlBQVUsS0FBSztRQUFBOztPQUMvQixXQUFXLEVBQUU7Y0FDYjtNQUFBO0tBQUE7Ozs7Ozs7Ozs7RUFHSixRQUFNLFlBQVUsS0FBTSxTQUFBLEVBQUE7O0lBQ3JCLFlBQUEsR0FDQztZQUFBO0lBQUEsT0FFRztZQUFIO0lBQUE7R0FBQTtFQUFBO0VBRUYsUUFBTSxZQUFVLElBQUssU0FBQSxJQUNHO1VBQ3ZCO0lBQWUsUUFBQSxLQUFHLElBQUs7SUFDdEIsWUFBQSxTQUFBLElBQ087O01BQUQsUUFBQTtNQUNKLFlBQUEsT0FBRyxFQUFFLFdBQ3dCO2NBQTVCO2FBRUc7Y0FBSDtNQUFBO0tBQUE7SUFBQSxPQUVDO1lBQUg7Ozs7RUFFSCxRQUFNLFlBQVUsY0FDRztHQUFsQixxQkFDTzttQkFBQSxVQUFBO3FCQUFKLE9BQUksWUFBVyxLQUFLLFlBQVc7K0JBQzVCLE9BQUksWUFBVyxLQUFLLFlBQVc7SUFBQTs7a0JBQ3BDLFNBQUEsRUFDQztJQUFELHdCQUFXO29CQUFBLFNBQUEsS0FBSyxHQUNFO2FBQWpCLGFBQVksSUFBRSxHQUFJLElBQUUsS0FBTSxjQUFjO0tBQUE7O1dBQ3pDLDRCQUE0QixFQUFFLFFBQVE7R0FBQTs7RUFFeEMsUUFBTSxZQUFVLGlCQUNNO0dBQXJCLHFCQUNPO21CQUFBLFVBQUE7S0FBTixVQUFNLE9BQVE7NEJBQ1osT0FBSSxZQUFVLEtBQU0sWUFBVTtJQUFBOztrQkFDaEMsVUFDSTs2QkFESCxJQUVEOzs7RUFFRixRQUFNLFlBQVUsSUFBSyxTQUFBLEVBQ0M7VUFDckIsVUFBUSxvQkFBQSxHQUFpQjtFQUFBO0VBdEcxQixzQ0FBQTtrQkF3R0EiLCJmaWxlIjoiaGFzaC1jb2RlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=