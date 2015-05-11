"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at","./at/at-Type","./at/Map/Weak-Id-Mapbang","./Bool","./compare","./Fun","./js","./math/bit-arithmetic","./math/Num","./math/methods","./Obj","./Str","./Type/Method","./bang"],function(exports,_64_0,_64_45Type_1,Weak_45Id_45Map_33_2,Bool_3,compare_4,Fun_5,js_6,bit_45arithmetic_7,Num_8,methods_9,Obj_10,Str_11,Method_12,_33_13){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(_64_0),empty_63=_ms.get(_$2,"empty?"),fold=_ms.get(_$2,"fold"),map=_ms.get(_$2,"map"),_$3=_ms.getModule(_64_45Type_1),empty=_ms.get(_$3,"empty"),Weak_45Id_45Map_33=_ms.getDefaultExport(Weak_45Id_45Map_33_2),Bool=_ms.getDefaultExport(Bool_3),_$6=_ms.getModule(compare_4),_61_63=_ms.get(_$6,"=?"),Fun=_ms.getDefaultExport(Fun_5),_$8=_ms.getModule(js_6),id_61_63=_ms.get(_$8,"id=?"),_$9=_ms.getModule(bit_45arithmetic_7),bit_45and=_ms.get(_$9,"bit-and"),hexidecimal=_ms.get(_$9,"hexidecimal"),Num=_ms.getDefaultExport(Num_8),_$10=_ms.getModule(Num_8),Int=_ms.get(_$10,"Int"),round_45towards_450=_ms.get(_$10,"round-towards-0"),_$11=_ms.getModule(methods_9),_43=_ms.get(_$11,"+"),_42=_ms.get(_$11,"*"),_$12=_ms.getModule(Obj_10),p=_ms.get(_$12,"p"),_63p=_ms.get(_$12,"?p"),_64p_45all=_ms.get(_$12,"@p-all"),Str=_ms.getDefaultExport(Str_11),Method=_ms.getDefaultExport(Method_12),_$14=_ms.getModule(Method_12),impl_33=_ms.get(_$14,"impl!"),impl_45for=_ms.get(_$14,"impl-for"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_13)
		}),_$16=_ms.lazyGetModule(_33_13),_33not=_ms.lazyProp(_$16,"!not");
		const exports={};
		const max_45hash_45code=hexidecimal("7fffffff");
		const keep_45small=function(_){
			return bit_45and(_,max_45hash_45code)
		};
		const hashes=empty(Weak_45Id_45Map_33);
		const hash_45code=Method(function(){
			const doc=function(_){
				return _ms.checkContains(Int,"Integer used to identify a value in a Hash-Map! (or Hash-Set!).\nThis should have a high probability of being different than the hash-codes of the other values in the map.","res")
			};
			const test=function(){
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
			};
			const _default=function(_){
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
						const vals=map(_64p_45all(_),function(name){
							return p(_,name)
						});
						const hash=fold(vals,17,function(acc,val){
							const x=keep_45small(_42(acc,23));
							return keep_45small(_43(hash_45code(val),x))
						});
						hashes.set(_,hash);
						return hash
					}
				}(),"res")
			};
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
				_ms.unlazy(_33)(_61_63,hash_45code("a"),hash_45code("a"));
				return _ms.unlazy(_33not)(_61_63,hash_45code("a"),hash_45code("b"))
			};
			return _ms.set(function(_){
				const reducer=function(hash,ch){
					return keep_45small(_42(31,_43(hash,ch.charCodeAt(0))))
				};
				return Array.prototype.reduce.call(_,reducer,13)
			},"test",test)
		}());
		impl_33(hash_45code,Symbol,function(){
			const test=function(){
				const sym=Symbol("test");
				return _ms.unlazy(_33)(_61_63,hash_45code(sym),hash_45code(sym))
			};
			return _ms.set(function(){
				return _ms.checkContains(Int,42,"res")
			},"test",test)
		}());
		impl_33(hash_45code,Num,function(_){
			return bit_45and(round_45towards_450(_),max_45hash_45code)
		});
		exports.default=hash_45code;
		const displayName=exports.displayName="hash-code";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9oYXNoLWNvZGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2lDQWlCQTs7Ozs7RUFBQSx3QkFBZ0IsWUFBYTtFQUU3QixtQkFBYyxTQUFBLEVBQ0M7VUFBZCxVQUFRLEVBQUU7RUFBQTtFQUVYLGFBQVMsTUFBTTtFQUVmLGtCQUFZLGlCQUNNO0dBQWpCLFVBQU0sU0FBSyxFQUNDOzZCQURMLElBRUw7O0dBRUYsV0FDTyxVQUFBO0lBQU4sa0JBQ0c7S0FBRixRQUFHO0tBQ0gsUUFBRztZQUREOzs7Ozs7SUFFSCxrQkFDRztLQUFGLFFBQUc7S0FDSCxRQUFHO1lBREQ7Ozs7OztvQkFFRCxPQUFJLFlBQVUsR0FBSSxZQUFVOzhCQUN6QixPQUFJLFlBQVUsR0FBSSxZQUFVO0dBQUE7R0FHbEMsZUFBVSxTQUFLLEVBQ0M7NkJBREw7S0FFVCxZQUFBLFNBQUssRUFBRSxPQUNFO2FBQVI7S0FBQSxPQUNELFlBQUEsU0FBSyxFQUFFLFlBQ1M7YUFBZjtLQUFBLE9BQ0QsWUFBQSxXQUFXLElBQ0M7YUFBWCxXQUFXO0tBQUEsT0FDWix5QkFBQyxJQUFELElBQ0k7YUFDRixXQUFTLFlBQVUsS0FBSztLQUFBLE9BRXRCO01BQ0gsV0FBVyxFQUFFO01BRWIsV0FBTyxJQUFJLFdBQUEsR0FBUyxTQUFBLEtBQ0k7Y0FBdkIsRUFBRSxFQUFFO01BQUE7TUFDTCxXQUFPLEtBQUssS0FBSyxHQUFJLFNBQUEsSUFBSSxJQUNHO09BQTNCLFFBQUksYUFBWSxJQUFFLElBQUk7Y0FDdEIsYUFBWSxJQUFHLFlBQVUsS0FBSztNQUFBO01BQy9CLFdBQVcsRUFBRTthQUNiO0tBQUE7SUFBQTs7VUFwQ2M7Ozs7Ozs7RUF1Q2xCLFFBQU0sWUFBVSxLQUFNLFNBQUEsRUFBQTs7SUFDckIsWUFBQSxHQUNDO1lBQUE7SUFBQSxPQUVHO1lBQUg7SUFBQTtHQUFBO0VBQUE7RUFFRixRQUFNLFlBQVUsSUFBSyxTQUFBLElBQ0c7VUFDdkI7SUFBZSxRQUFBLEtBQUcsSUFBSztJQUN0QixZQUFBLFNBQUEsSUFDTzs7TUFBRCxRQUFBO01BQ0osWUFBQSxPQUFHLEVBQUUsV0FDd0I7Y0FBNUI7YUFFRztjQUFIO01BQUE7S0FBQTtJQUFBLE9BRUM7WUFBSDs7OztFQUVILFFBQU0sWUFBVSxjQUNHO0dBQWxCLFdBQ08sVUFBQTtvQkFBSixPQUFJLFlBQVcsS0FBSyxZQUFXOzhCQUM1QixPQUFJLFlBQVcsS0FBSyxZQUFXO0dBQUE7a0JBQ3BDLFNBQUEsRUFDQztJQUFELGNBQVcsU0FBQSxLQUFLLEdBQ0U7WUFBakIsYUFBWSxJQUFFLEdBQUksSUFBRSxLQUFNLGNBQWM7SUFBQTtXQUN6Qyw0QkFBNEIsRUFBRSxRQUFRO0dBQUE7O0VBRXhDLFFBQU0sWUFBVSxpQkFDTTtHQUFyQixXQUNPLFVBQUE7SUFBTixVQUFNLE9BQVE7MkJBQ1osT0FBSSxZQUFVLEtBQU0sWUFBVTtHQUFBO2tCQUNoQyxVQUNJOzZCQURILElBRUQ7OztFQUVGLFFBQU0sWUFBVSxJQUFLLFNBQUEsRUFDQztVQUNyQixVQUFRLG9CQUFBLEdBQWlCO0VBQUE7a0JBRTFCO0VBdkdBLHNDQUFBIiwiZmlsZSI6Imhhc2gtY29kZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9