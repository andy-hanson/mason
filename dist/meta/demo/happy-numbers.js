"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/at","../../at/atbang","../../at/at-Type","../../at/Seq/Arraybang","../../at/Seq/Range","../../at/Seq/Seqbang","../../at/Seq/Stream","../../at/Set/Id-Setbang","../../Boolean","../../control","../../js","../../math/Number","../../math/methods","../../Type/Type","../../bang","../../at/Seq/Seq"],function(exports,_64_0,_64_33_1,_64_45Type_2,Array_33_3,Range_4,Seq_33_5,Stream_6,Id_45Set_33_7,Boolean_8,control_9,js_10,Number_11,methods_12,Type_13,_33_14,Seq_15){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(_64_0),fold=_ms.get(_$2,"fold"),keep=_ms.get(_$2,"keep"),map=_ms.get(_$2,"map"),map_39=_ms.get(_$2,"map'"),_$3=_ms.getModule(_64_33_1),_43_43_33=_ms.get(_$3,"++!"),_$4=_ms.getModule(_64_45Type_2),empty=_ms.get(_$4,"empty"),Array_33=_ms.getDefaultExport(Array_33_3),_$6=_ms.getModule(Range_4),range=_ms.get(_$6,"range"),_$7=_ms.getModule(Seq_33_5),set_45nth_33=_ms.get(_$7,"set-nth!"),Stream=_ms.getDefaultExport(Stream_6),Id_45Set_33=_ms.getDefaultExport(Id_45Set_33_7),_$10=_ms.getModule(Boolean_8),and=_ms.get(_$10,"and"),not=_ms.get(_$10,"not"),_$11=_ms.getModule(control_9),returning=_ms.get(_$11,"returning"),_$12=_ms.getModule(js_10),defined_63=_ms.get(_$12,"defined?"),js_45sub=_ms.get(_$12,"js-sub"),_$13=_ms.getModule(Number_11),infinity=_ms.get(_$13,"infinity"),Nat=_ms.get(_$13,"Nat"),square=_ms.get(_$13,"square"),_$14=_ms.getModule(methods_12),_43=_ms.get(_$14,"+"),_$15=_ms.getModule(Type_13),contains_63=_ms.get(_$15,"contains?"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_14)
		}),_$18=_ms.lazyGetModule(Seq_15),seq_61_63=_ms.lazyProp(_$18,"seq=?"),take_39=_ms.lazyProp(_$18,"take'");
		const digits=function digits(_){
			_ms.checkContains(Nat,_,"_");
			return map_39(_.toString(10),Number.parseInt)
		};
		const step=function step(_){
			_ms.checkContains(Nat,_,"_");
			return _ms.checkContains(Nat,fold(map(digits(_),square),0,_43),"res")
		};
		const cache=empty(Array_33);
		set_45nth_33(cache,1,true);
		const happy_63=exports["happy?"]=function(){
			const doc="http://rosettacode.org/wiki/Happy_numbers";
			return _ms.set(function happy_63(n){
				_ms.checkContains(Nat,n,"n");
				const stepped_45through=empty(Id_45Set_33);
				const loop=function loop(cur){
					return function(){
						const _=js_45sub(cache,cur);
						if(_ms.bool(defined_63(_))){
							return _
						} else {
							return and(not(contains_63(stepped_45through,cur)),_ms.lazy(function(){
								return function(){
									_43_43_33(stepped_45through,[cur]);
									return loop(step(cur))
								}()
							}))
						}
					}()
				};
				return returning(loop(n),function(ans){
					for(let _ of stepped_45through[Symbol.iterator]()){
						set_45nth_33(cache,_,ans)
					};
					return set_45nth_33(cache,n,ans)
				})
			},"doc",doc)
		}();
		const happy_45numbers=exports["happy-numbers"]=_ms.checkContains(_ms.sub(Stream,Nat),function(){
			const doc="Stream of all happy numbers.";
			const test=function test(){
				return _ms.unlazy(_33)(_ms.unlazy(seq_61_63),_ms.unlazy(take_39)(happy_45numbers,8),function(){
					const _0=1;
					const _1=7;
					const _2=10;
					const _3=13;
					const _4=19;
					const _5=23;
					const _6=28;
					const _7=31;
					return [_0,_1,_2,_3,_4,_5,_6,_7]
				}())
			};
			return _ms.set(keep(range(1,infinity),happy_63),"doc",doc,"test",test,"name","happy-numbers")
		}(),"happy-numbers");
		const name=exports.name="happy-numbers";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vaGFwcHktbnVtYmVycy5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBbUJBLGFBQVUsZ0JBQUEsRUFDSztxQkFESDtVQUVYLE9BQU0sV0FBVyxJQUFJOztFQUV0QixXQUFRLGNBQUssRUFDSztxQkFESDs0QkFBTixJQUNSLEtBQU0sSUFBSSxPQUFBLEdBQVEsUUFBUSxFQUFFOztFQUU3QixZQUFRLE1BQU07RUFDZCxhQUFTLE1BQU0sRUFBRTtFQUVqQiwyQ0FDTztHQUFOLFVBQU07a0JBQ0wsa0JBQUEsRUFDSztzQkFESDtJQUNGLHdCQUFrQixNQUFNO0lBQ3hCLFdBQVEsY0FBQSxJQUNHOztNQUFMLFFBQUEsU0FBTyxNQUFNO01BQ2pCLFlBQUEsV0FBQSxJQUNTO2NBQVI7TUFBQSxPQUVHO2NBQUgsSUFBSyxJQUFLLFlBQVUsa0JBQWdCO3lCQUNPO1NBQzFDLFVBQUksa0JBQWdCLENBQUU7Z0JBQ3RCLEtBQU0sS0FBSztRQUFBO09BQUE7TUFBQTtLQUFBO0lBQUE7V0FDZixVQUFXLEtBQUssR0FBSSxTQUFBLElBQ0c7S0FBakIsUUFBQSxLQUFBLHFDQUNlO01BQW5CLGFBQVMsTUFBTSxFQUFFO0tBQUE7WUFDbEIsYUFBUyxNQUFNLEVBQUU7SUFBQTtHQUFBOztFQUVwQix5RUFBYyxPQUFPLGVBQ0s7R0FBekIsVUFBTTtHQUNOLFdBQ08sZUFBQTtxRUFBUyxnQkFBYyxhQUNFO0tBQTlCLFNBQUU7S0FDRixTQUFFO0tBQ0YsU0FBRTtLQUNGLFNBQUU7S0FDRixTQUFFO0tBQ0YsU0FBRTtLQUNGLFNBQUU7S0FDRixTQUFFOzs7O2tCQUNKLEtBQU0sTUFBTSxFQUFFLFVBQVU7O0VBM0R6Qix3QkFBQSIsImZpbGUiOiJtZXRhL2RlbW8vaGFwcHktbnVtYmVycy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9