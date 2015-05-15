"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at","./at/at-Type","./at/Map/Weak-Id-Mapbang","./compare","./js","./math/bit-arithmetic","./math/Number","./math/methods","./Object","./Type/Method","./bang"],function(exports,_64_0,_64_45Type_1,Weak_45Id_45Map_33_2,compare_3,js_4,bit_45arithmetic_5,Number_6,methods_7,Object_8,Method_9,_33_10){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(_64_0),empty_63=_ms.get(_$2,"empty?"),fold=_ms.get(_$2,"fold"),map=_ms.get(_$2,"map"),_$3=_ms.getModule(_64_45Type_1),empty=_ms.get(_$3,"empty"),Weak_45Id_45Map_33=_ms.getDefaultExport(Weak_45Id_45Map_33_2),_$5=_ms.getModule(compare_3),_61_63=_ms.get(_$5,"=?"),_$6=_ms.getModule(js_4),id_61_63=_ms.get(_$6,"id=?"),_$7=_ms.getModule(bit_45arithmetic_5),bit_45and=_ms.get(_$7,"bit-and"),hexidecimal=_ms.get(_$7,"hexidecimal"),_$8=_ms.getModule(Number_6),Int=_ms.get(_$8,"Int"),round_45towards_450=_ms.get(_$8,"round-towards-0"),_$9=_ms.getModule(methods_7),_43=_ms.get(_$9,"+"),_42=_ms.get(_$9,"*"),_$10=_ms.getModule(Object_8),p=_ms.get(_$10,"p"),_63p=_ms.get(_$10,"?p"),_64p_45all=_ms.get(_$10,"@p-all"),Method=_ms.getDefaultExport(Method_9),_$11=_ms.getModule(Method_9),impl_33=_ms.get(_$11,"impl!"),impl_45for=_ms.get(_$11,"impl-for"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_10)
		}),_$13=_ms.lazyGetModule(_33_10),_33not=_ms.lazyProp(_$13,"!not");
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
						} else if(_ms.bool(id_61_63(_,void 0))){
							return 109
						} else if(_ms.bool(hashes.has(_))){
							return hashes.get(_)
						} else if(_ms.bool(_ms.contains(Function,_))){
							return impl_45for(hash_45code,Function)(_)
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
		impl_33(hash_45code,Boolean,function(_){
			return function(){
				if(_ms.bool(_)){
					return 1
				} else {
					return 0
				}
			}()
		});
		impl_33(hash_45code,Function,function(fun){
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
		impl_33(hash_45code,String,function(){
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
		impl_33(hash_45code,Number,function(_){
			return bit_45and(round_45towards_450(_),max_45hash_45code)
		});
		const displayName=exports.displayName="hash-code";
		exports.default=hash_45code;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9oYXNoLWNvZGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQWNBLHdCQUFnQixZQUFhO0VBRTdCLDZCQUFjO2tCQUFBLFNBQUEsRUFDQztXQUFkLFVBQVEsRUFBRTtHQUFBOztFQUVYLGFBQVMsTUFBTTtFQUVmLGtCQUFZLGlCQUNNO0dBQWpCLG9CQUNJO1dBQ0Y7R0FBQTtHQUdGLHFCQUNPO21CQUFBLFVBQUE7S0FBTixrQkFDRztNQUFGLFFBQUc7TUFDSCxRQUFHOzs7Ozs7O0tBQ0osa0JBQ0c7TUFBRixRQUFHO01BQ0gsUUFBRzs7Ozs7OztxQkFDRixPQUFJLFlBQVUsR0FBSSxZQUFVOytCQUN6QixPQUFJLFlBQVUsR0FBSSxZQUFVO0lBQUE7O0dBR2xDLHlCQUFVO21CQUFBLFNBQUssRUFDQzs4QkFETDtNQUVULFlBQUEsU0FBSyxFQUFFLE9BQ0U7Y0FBUjtNQUFBLE9BQ0QsWUFBQSxTQUFLLEVBQUUsU0FDUztjQUFmO01BQUEsT0FDRCxZQUFBLFdBQVcsSUFDQztjQUFYLFdBQVc7TUFBQSxPQUNaLHlCQUFDLFNBQUQsSUFDUztjQUNQLFdBQVMsWUFBVSxVQUFVO01BQUEsT0FFM0I7T0FDSCxXQUFXLEVBQUU7T0FFYixXQUFPLElBQUksV0FBQSxhQUFTO3VCQUFBLFNBQUEsS0FDSTtnQkFBdkIsRUFBRSxFQUFFO1FBQUE7O09BQ0wsV0FBTyxLQUFLLEtBQUssYUFBSTt1QkFBQSxTQUFBLElBQUksSUFDRztTQUEzQixRQUFJLGFBQVksSUFBRSxJQUFJO2dCQUN0QixhQUFZLElBQUcsWUFBVSxLQUFLO1FBQUE7O09BQy9CLFdBQVcsRUFBRTtjQUNiO01BQUE7S0FBQTs7Ozs7Ozs7OztFQUdKLFFBQU0sWUFBVSxRQUFTLFNBQUEsRUFBQTs7SUFDeEIsWUFBQSxHQUNDO1lBQUE7SUFBQSxPQUVHO1lBQUg7SUFBQTtHQUFBO0VBQUE7RUFFRixRQUFNLFlBQVUsU0FBVSxTQUFBLElBQ0c7VUFDNUI7SUFBZSxRQUFBLEtBQUcsSUFBSztJQUN0QixZQUFBLFNBQUEsSUFDTzs7TUFBRCxRQUFBO01BQ0osWUFBQSxPQUFHLEVBQUUsV0FDd0I7Y0FBNUI7YUFFRztjQUFIO01BQUE7S0FBQTtJQUFBLE9BRUM7WUFBSDs7OztFQUVILFFBQU0sWUFBVSxpQkFDTTtHQUFyQixxQkFDTzttQkFBQSxVQUFBO3FCQUFKLE9BQUksWUFBVyxLQUFLLFlBQVc7K0JBQzVCLE9BQUksWUFBVyxLQUFLLFlBQVc7SUFBQTs7a0JBQ3BDLFNBQUEsRUFDQztJQUFELHdCQUFXO29CQUFBLFNBQUEsS0FBSyxHQUNFO2FBQWpCLGFBQVksSUFBRSxHQUFJLElBQUUsS0FBTSxjQUFjO0tBQUE7O1dBQ3pDLDRCQUE0QixFQUFFLFFBQVE7R0FBQTs7RUFFeEMsUUFBTSxZQUFVLGlCQUNNO0dBQXJCLHFCQUNPO21CQUFBLFVBQUE7S0FBTixVQUFNLE9BQVE7NEJBQ1osT0FBSSxZQUFVLEtBQU0sWUFBVTtJQUFBOztrQkFDaEMsVUFDSTs2QkFESCxJQUVEOzs7RUFFRixRQUFNLFlBQVUsT0FBUSxTQUFBLEVBQ0M7VUFDeEIsVUFBUSxvQkFBQSxHQUFpQjtFQUFBO0VBbkcxQixzQ0FBQTtrQkFxR0EiLCJmaWxlIjoiaGFzaC1jb2RlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=