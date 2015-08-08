"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/at","../../at/at-Type","../../at/Range","../../at/Seq/Seq","../../at/Seq/Stream","../../at/Set/Id-Set","../../compare","../../js","../../math/Number","../../math/methods","../../Type/Type","../../at/Seq/Seq"],(exports,_64_0,_64_45Type_1,Range_2,Seq_3,Stream_4,Id_45Set_5,compare_6,js_7,Number_8,methods_9,Type_10,Seq_11)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(_64_0),_43_43_33=_ms.get(_$2,"++!"),fold=_ms.get(_$2,"fold"),keep_39=_ms.get(_$2,"keep'"),map=_ms.get(_$2,"map"),_$3=_ms.getModule(_64_45Type_1),empty=_ms.get(_$3,"empty"),Range=_ms.getDefaultExport(Range_2),_$5=_ms.getModule(Seq_3),set_45nth_33=_ms.get(_$5,"set-nth!"),Stream=_ms.getDefaultExport(Stream_4),Id_45Set=_ms.getDefaultExport(Id_45Set_5),_$8=_ms.getModule(compare_6),_61_63=_ms.get(_$8,"=?"),_$9=_ms.getModule(js_7),defined_63=_ms.get(_$9,"defined?"),js_45sub=_ms.get(_$9,"js-sub"),_$10=_ms.getModule(Number_8),infinity=_ms.get(_$10,"infinity"),int_47=_ms.get(_$10,"int/"),Nat=_ms.get(_$10,"Nat"),remainder=_ms.get(_$10,"remainder"),square=_ms.get(_$10,"square"),_$11=_ms.getModule(methods_9),_43=_ms.get(_$11,"+"),_$12=_ms.getModule(Type_10),contains_63=_ms.get(_$12,"contains?"),_$14=_ms.lazyGetModule(Seq_11),seq_61_63=_ms.lazyProp(_$14,"seq=?"),take=_ms.lazyProp(_$14,"take");
		const digits=function digits(_){
			const base=10;
			return new (Stream)(function*(){
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
		const happy_63=exports["happy?"]=(()=>{
			const built={};
			const doc=built.doc=`http://rosettacode.org/wiki/Happy_numbers`;
			return _ms.set(function happy_63(n){
				_ms.checkContains(Nat,n,"n");
				const stepped_45through=empty(Id_45Set);
				let cur=n;
				const n_45happy_63=(()=>{
					for(;;){
						{
							const _=js_45sub(cache,cur);
							if(defined_63(_)){
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
				})();
				return (_=>{
					set_45nth_33(cache,n,_);
					for(let _ of stepped_45through){
						set_45nth_33(cache,_,n_45happy_63)
					};
					return _
				})(n_45happy_63)
			},built)
		})();
		const happy_45numbers=_ms.checkContains(_ms.sub(Stream,Nat),(()=>{
			const built={};
			const doc=built.doc=`Stream of all happy numbers.`;
			const test=built.test=function test(){
				_ms.assert(_ms.unlazy(seq_61_63),_ms.unlazy(take)(happy_45numbers,8),(()=>{
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
				})())
			};
			return _ms.set(keep_39(new (Range)(1,infinity),happy_63),built,"happy-numbers")
		})(),"happy-numbers");
		const name=exports.name=`happy-numbers`;
		exports.default=happy_45numbers;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vaGFwcHktbnVtYmVycy5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQWdCQSxhQUFVLGdCQUFBLEVBQ0M7R0FBVixXQUFPO1VBQ1AsS0FBSSxRQUNVLFdBQUE7SUFBYixTQUFTO0lBRUwsT0FBQTtZQUFBLFVBQVUsS0FBSztVQUNWLE9BQUssS0FBSztLQUNsQixHQUFJLE9BQUcsS0FBSyxHQUNDO01BQVo7S0FBQTtJQUFBO0dBQUE7RUFBQTtFQUVKLG1CQUFjLHNCQUFBLEVBQ0M7VUFDZCxLQUFNLElBQUksT0FBTSxHQUFFLFFBQVE7RUFBQTtFQUUzQixZQUFRO0VBQ1IsYUFBUyxNQUFNLEVBQUU7RUFFakIsaUNBQ08sS0FBQTs7R0FBTixvQkFBTTtrQkFDTCxrQkFBQSxFQUNLO3NCQURIO0lBQ0Ysd0JBQWtCLE1BQU07SUFDeEIsUUFBUTtJQUNSLG1CQUNjO1lBQUE7TUFBUDtPQUFBLFFBQUEsU0FBTyxNQUFNO09BQ2xCLEdBQUEsV0FBUSxHQUNDO1FBQVIsT0FBTTtPQUFBLE9BRUg7UUFBSCxHQUFJLFlBQVUsa0JBQWdCLEtBQ0c7U0FBaEMsT0FBTTtRQUFBO1FBRVAsVUFBSSxrQkFBZ0IsQ0FBRTtZQUNmLGFBQVc7T0FBQTtNQUFBO0tBQUE7SUFBQTtXQUNoQixJQUNRO0tBQVosYUFBUyxNQUFNLEVBQUU7S0FDWixRQUFBLEtBQUEsa0JBQ2U7TUFBbkIsYUFBUyxNQUFNLEVBQUU7S0FBQTs7T0FIZDtHQUFBOztFQUtQLGdEQUFjLE9BQU8sS0FDSyxLQUFBOztHQUF6QixvQkFBTTtHQUNOLHNCQUNRLGVBQUE7c0RBQWEsZ0JBQWMsR0FDRSxLQUFBOzttQkFBakM7bUJBQ0E7bUJBQ0E7bUJBQ0E7bUJBQ0E7bUJBQ0E7bUJBQ0E7bUJBQ0E7Ozs7a0JBQ0osUUFBTyxLQUFJLE9BQU0sRUFBRSxVQUFVOztFQWpFOUIsd0JBQUE7a0JBcURBIiwiZmlsZSI6Im1ldGEvZGVtby9oYXBweS1udW1iZXJzLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=