"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/at","../../at/at-Type","../../at/Seq/Range","../../at/Seq/Seq","../../at/Seq/Stream","../../at/Set/Id-Set","../../compare","../../control","../../js","../../math/Number","../../math/methods","../../Type/Type","../../at/Seq/Seq"],(exports,_64_0,_64_45Type_1,Range_2,Seq_3,Stream_4,Id_45Set_5,compare_6,control_7,js_8,Number_9,methods_10,Type_11,Seq_12)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(_64_0),_43_43_33=_ms.get(_$2,"++!"),fold=_ms.get(_$2,"fold"),keep_39=_ms.get(_$2,"keep'"),map=_ms.get(_$2,"map"),_$3=_ms.getModule(_64_45Type_1),empty=_ms.get(_$3,"empty"),_$4=_ms.getModule(Range_2),range=_ms.get(_$4,"range"),_$5=_ms.getModule(Seq_3),set_45nth_33=_ms.get(_$5,"set-nth!"),Stream=_ms.getDefaultExport(Stream_4),Id_45Set=_ms.getDefaultExport(Id_45Set_5),_$8=_ms.getModule(compare_6),_61_63=_ms.get(_$8,"=?"),_$9=_ms.getModule(control_7),returning=_ms.get(_$9,"returning"),_$10=_ms.getModule(js_8),defined_63=_ms.get(_$10,"defined?"),js_45sub=_ms.get(_$10,"js-sub"),_$11=_ms.getModule(Number_9),infinity=_ms.get(_$11,"infinity"),int_47=_ms.get(_$11,"int/"),Nat=_ms.get(_$11,"Nat"),remainder=_ms.get(_$11,"remainder"),square=_ms.get(_$11,"square"),_$12=_ms.getModule(methods_10),_43=_ms.get(_$12,"+"),_$13=_ms.getModule(Type_11),contains_63=_ms.get(_$13,"contains?"),_$15=_ms.lazyGetModule(Seq_12),seq_61_63=_ms.lazyProp(_$15,"seq=?"),take=_ms.lazyProp(_$15,"take");
		const digits=function digits(_){
			const base=10;
			return Stream(function*(){
				let left=_;
				for(;;){
					(yield remainder(left,base));
					left=int_47(left,base);
					if(_61_63(left,0)){
						break
					}
				}
			})
		};
		const happy_45step=function happy_45step(_){
			return fold(map(digits(_),square),_43)
		};
		const cache=[];
		set_45nth_33(cache,1,true);
		const happy_63=exports["happy?"]=()=>{
			const built={};
			const doc=built.doc=`http://rosettacode.org/wiki/Happy_numbers`;
			return _ms.set(function happy_63(n){
				_ms.checkContains(Nat,n,"n");
				const stepped_45through=empty(Id_45Set);
				let cur=n;
				const n_45happy_63=()=>{
					for(;;){
						{
							const _=js_45sub(cache,cur);
							if(_ms.bool(defined_63(_))){
								return _
							} else {
								if(contains_63(stepped_45through,cur)){
									return false
								};
								_43_43_33(stepped_45through,[cur]);
								cur=happy_45step(cur)
							}
						}
					}
				}();
				return returning(n_45happy_63,()=>{
					for(let _ of stepped_45through){
						set_45nth_33(cache,_,n_45happy_63)
					};
					set_45nth_33(cache,n,n_45happy_63)
				})
			},built)
		}();
		const happy_45numbers=_ms.checkContains(_ms.sub(Stream,Nat),()=>{
			const built={};
			const doc=built.doc=`Stream of all happy numbers.`;
			const test=built.test=function test(){
				_ms.assert(_ms.unlazy(seq_61_63),_ms.unlazy(take)(happy_45numbers,8),()=>{
					const built=[];
					_ms.add(built,1);
					_ms.add(built,7);
					_ms.add(built,10);
					_ms.add(built,13);
					_ms.add(built,19);
					_ms.add(built,23);
					_ms.add(built,28);
					_ms.add(built,31);
					return built
				}())
			};
			return _ms.set(keep_39(range(1,infinity),happy_63),built,"happy-numbers")
		}(),"happy-numbers");
		const name=exports.name=`happy-numbers`;
		exports.default=happy_45numbers;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vaGFwcHktbnVtYmVycy5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQWlCQSxhQUFVLGdCQUFBLEVBQ0M7R0FBVixXQUFPO1VBQ1AsT0FDVSxXQUFBO0lBQVQsU0FBUztJQUVMLE9BQUE7WUFBQSxVQUFVLEtBQUs7VUFDVixPQUFLLEtBQUs7S0FDbEIsR0FBSSxPQUFHLEtBQUssR0FDQztNQUFaO0tBQUE7SUFBQTtHQUFBO0VBQUE7RUFFSixtQkFBYyxzQkFBQSxFQUNDO1VBQ2QsS0FBTSxJQUFJLE9BQU0sR0FBRSxRQUFRO0VBQUE7RUFFM0IsWUFBUTtFQUNSLGFBQVMsTUFBTSxFQUFFO0VBRWpCLHFDQUNPOztHQUFOLG9CQUFNO2tCQUNMLGtCQUFBLEVBQ0s7c0JBREg7SUFDRix3QkFBa0IsTUFBTTtJQUN4QixRQUFRO0lBQ1I7WUFDYztNQUFQO09BQUEsUUFBQSxTQUFPLE1BQU07T0FDbEIsWUFBQSxXQUFRLElBQ0M7UUFBUixPQUFNO09BQUEsT0FFSDtRQUFILEdBQUksWUFBVSxrQkFBZ0IsS0FDRztTQUFoQyxPQUFNO1FBQUE7UUFFUCxVQUFJLGtCQUFnQixDQUFFO1lBQ2YsYUFBVztPQUFBO01BQUE7S0FBQTtJQUFBO1dBQ3JCLFVBQVUsYUFDVyxJQUFBO0tBQWYsUUFBQSxLQUFBLGtCQUNlO01BQW5CLGFBQVMsTUFBTSxFQUFFO0tBQUE7S0FDbEIsYUFBUyxNQUFNLEVBQUU7SUFBQTtHQUFBOztFQUVwQixnREFBYyxPQUFPLFNBQ0s7O0dBQXpCLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtzREFBYSxnQkFBYyxPQUNFOzttQkFBakM7bUJBQ0E7bUJBQ0E7bUJBQ0E7bUJBQ0E7bUJBQ0E7bUJBQ0E7bUJBQ0E7Ozs7a0JBQ0osUUFBTyxNQUFNLEVBQUUsVUFBVTs7RUFsRTFCLHdCQUFBO2tCQXNEQSIsImZpbGUiOiJtZXRhL2RlbW8vaGFwcHktbnVtYmVycy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9