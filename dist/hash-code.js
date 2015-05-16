"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at","./at/at-Type","./at/Map/Weak-Id-Mapbang","./compare","./js","./math/bit-arithmetic","./math/Number","./math/methods","./Object","./Type/Method","./bang"],function(exports,_64_0,_64_45Type_1,Weak_45Id_45Map_33_2,compare_3,js_4,bit_45arithmetic_5,Number_6,methods_7,Object_8,Method_9,_33_10){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(_64_0),fold=_ms.get(_$2,"fold"),map=_ms.get(_$2,"map"),_$3=_ms.getModule(_64_45Type_1),empty=_ms.get(_$3,"empty"),Weak_45Id_45Map_33=_ms.getDefaultExport(Weak_45Id_45Map_33_2),_$5=_ms.getModule(compare_3),_61_63=_ms.get(_$5,"=?"),_$6=_ms.getModule(js_4),id_61_63=_ms.get(_$6,"id=?"),_$7=_ms.getModule(bit_45arithmetic_5),bit_45and=_ms.get(_$7,"bit-and"),hexidecimal=_ms.get(_$7,"hexidecimal"),_$8=_ms.getModule(Number_6),Int=_ms.get(_$8,"Int"),round_45towards_450=_ms.get(_$8,"round-towards-0"),_$9=_ms.getModule(methods_7),_43=_ms.get(_$9,"+"),_42=_ms.get(_$9,"*"),_$10=_ms.getModule(Object_8),p=_ms.get(_$10,"p"),_64p_45all=_ms.get(_$10,"@p-all"),Method=_ms.getDefaultExport(Method_9),_$11=_ms.getModule(Method_9),impl_33=_ms.get(_$11,"impl!"),impl_45for=_ms.get(_$11,"impl-for"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_10)
		}),_$13=_ms.lazyGetModule(_33_10),_33not=_ms.lazyProp(_$13,"!not");
		const max_45hash_45code=hexidecimal("7fffffff");
		const keep_45small=function keep_45small(_){
			return bit_45and(_,max_45hash_45code)
		};
		const hashes=empty(Weak_45Id_45Map_33);
		const hash_45code=Method(function(){
			const doc=function(){
				return "|:Int _\nInteger used to identify a value in a Hash-Map! (or Hash-Set!).\nThis should have a high probability of being different than the hash-codes of the other values in the map."
			}();
			const test=function test(){
				const a=function(){
					const x=1;
					const y=2;
					return {
						x:x,
						y:y,
						name:"a"
					}
				}();
				const b=function(){
					const x=1;
					const y=1;
					return {
						x:x,
						y:y,
						name:"b"
					}
				}();
				_ms.unlazy(_33)(_61_63,hash_45code(a),hash_45code(a));
				return _ms.unlazy(_33not)(_61_63,hash_45code(a),hash_45code(b))
			};
			const args=1;
			const allow_45null_63=true;
			const _default=function _default(_){
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
				args:args,
				"allow-null?":allow_45null_63,
				default:_default,
				name:"hash-code"
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
				const _=fun.name;
				if(_ms.bool(_61_63(0,_.length))){
					return fun.toString()
				} else {
					return _
				}
			}())
		});
		impl_33(hash_45code,String,function(){
			const test=function test(){
				_ms.unlazy(_33)(_61_63,hash_45code("a"),hash_45code("a"));
				return _ms.unlazy(_33not)(_61_63,hash_45code("a"),hash_45code("b"))
			};
			return _ms.set(function(_){
				const reducer=function reducer(hash,ch){
					return keep_45small(_42(31,_43(hash,ch.charCodeAt(0))))
				};
				return Array.prototype.reduce.call(_,reducer,13)
			},"test",test)
		}());
		impl_33(hash_45code,Symbol,function(){
			const test=function test(){
				const sym=Symbol("test");
				return _ms.unlazy(_33)(_61_63,hash_45code(sym),hash_45code(sym))
			};
			return _ms.set(function(){
				return _ms.checkContains(Int,42,"res")
			},"test",test)
		}());
		impl_33(hash_45code,Number,function(_){
			return bit_45and(round_45towards_450(_),max_45hash_45code)
		});
		const name=exports.name="hash-code";
		exports.default=hash_45code;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9oYXNoLWNvZGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQWNBLHdCQUFnQixZQUFhO0VBRTdCLG1CQUFjLHNCQUFBLEVBQ0M7VUFBZCxVQUFRLEVBQUU7RUFBQTtFQUVYLGFBQVMsTUFBTTtFQUVmLGtCQUFZLGlCQUNNO0dBQWpCLG9CQUNJO1dBQ0Y7R0FBQTtHQUdGLFdBQ08sZUFBQTtJQUFOLGtCQUNHO0tBQUYsUUFBRztLQUNILFFBQUc7Ozs7Ozs7SUFDSixrQkFDRztLQUFGLFFBQUc7S0FDSCxRQUFHOzs7Ozs7O29CQUNGLE9BQUksWUFBVSxHQUFJLFlBQVU7OEJBQ3pCLE9BQUksWUFBVSxHQUFJLFlBQVU7R0FBQTtHQUVsQyxXQUFNO0dBQ04sc0JBQWE7R0FDYixlQUFVLGtCQUFLLEVBQ0M7NkJBREw7S0FFVCxZQUFBLFNBQUssRUFBRSxPQUNJO2FBQVY7S0FBQSxPQUNELFlBQUEsU0FBSyxFQUFFLFNBQ1M7YUFBZjtLQUFBLE9BQ0QsWUFBQSxXQUFXLElBQ0M7YUFBWCxXQUFXO0tBQUEsT0FDWix5QkFBQyxTQUFELElBQ1M7YUFDUCxXQUFTLFlBQVUsVUFBVTtLQUFBLE9BRTNCO01BQ0gsV0FBVyxFQUFFO01BRWIsV0FBTyxJQUFJLFdBQUEsR0FBUyxTQUFBLEtBQ0k7Y0FBdkIsRUFBRSxFQUFFO01BQUE7TUFDTCxXQUFPLEtBQUssS0FBSyxHQUFJLFNBQUEsSUFBSSxJQUNHO09BQTNCLFFBQUksYUFBWSxJQUFFLElBQUk7Y0FDdEIsYUFBWSxJQUFHLFlBQVUsS0FBSztNQUFBO01BQy9CLFdBQVcsRUFBRTthQUNiO0tBQUE7SUFBQTs7Ozs7Ozs7Ozs7RUFHSixRQUFNLFlBQVUsUUFBUyxTQUFBLEVBQUE7O0lBQ3hCLFlBQUEsR0FDQztZQUFBO0lBQUEsT0FFRztZQUFIO0lBQUE7R0FBQTtFQUFBO0VBRUYsUUFBTSxZQUFVLFNBQVUsU0FBQSxJQUNHO1VBQzVCO0lBQWUsUUFBQTtJQUNkLFlBQUEsT0FBRyxFQUFFLFdBQ3dCO1lBQTVCO1dBRUc7WUFBSDtJQUFBO0dBQUE7RUFBQTtFQUVILFFBQU0sWUFBVSxpQkFDTTtHQUFyQixXQUNPLGVBQUE7b0JBQUosT0FBSSxZQUFXLEtBQUssWUFBVzs4QkFDNUIsT0FBSSxZQUFXLEtBQUssWUFBVztHQUFBO2tCQUNwQyxTQUFBLEVBQ0M7SUFBRCxjQUFXLGlCQUFBLEtBQUssR0FDRTtZQUFqQixhQUFZLElBQUUsR0FBSSxJQUFFLEtBQU0sY0FBYztJQUFBO1dBQ3pDLDRCQUE0QixFQUFFLFFBQVE7R0FBQTs7RUFFeEMsUUFBTSxZQUFVLGlCQUNNO0dBQXJCLFdBQ08sZUFBQTtJQUFOLFVBQU0sT0FBUTsyQkFDWixPQUFJLFlBQVUsS0FBTSxZQUFVO0dBQUE7a0JBQ2hDLFVBQ0k7NkJBREgsSUFFRDs7O0VBRUYsUUFBTSxZQUFVLE9BQVEsU0FBQSxFQUNDO1VBQ3hCLFVBQVEsb0JBQUEsR0FBaUI7RUFBQTtFQWhHMUIsd0JBQUE7a0JBa0dBIiwiZmlsZSI6Imhhc2gtY29kZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9