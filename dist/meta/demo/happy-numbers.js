"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/at","../../at/atbang","../../at/at-Type","../../at/Seq/Arraybang","../../at/Seq/Range","../../at/Seq/Seqbang","../../at/Seq/Stream","../../at/Set/Id-Setbang","../../compare","../../js","../../math/Number","../../math/methods","../../Type/Type","../../bang","../../at/Seq/Seq"],function(exports,_64_0,_64_33_1,_64_45Type_2,Array_33_3,Range_4,Seq_33_5,Stream_6,Id_45Set_33_7,compare_8,js_9,Number_10,methods_11,Type_12,_33_13,Seq_14){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(_64_0),fold=_ms.get(_$2,"fold"),keep=_ms.get(_$2,"keep"),map=_ms.get(_$2,"map"),_$3=_ms.getModule(_64_33_1),_43_43_33=_ms.get(_$3,"++!"),_$4=_ms.getModule(_64_45Type_2),empty=_ms.get(_$4,"empty"),Array_33=_ms.getDefaultExport(Array_33_3),_$6=_ms.getModule(Range_4),range=_ms.get(_$6,"range"),_$7=_ms.getModule(Seq_33_5),set_45nth_33=_ms.get(_$7,"set-nth!"),Stream=_ms.getDefaultExport(Stream_6),Id_45Set_33=_ms.getDefaultExport(Id_45Set_33_7),_$10=_ms.getModule(compare_8),_61_63=_ms.get(_$10,"=?"),_$11=_ms.getModule(js_9),defined_63=_ms.get(_$11,"defined?"),js_45sub=_ms.get(_$11,"js-sub"),_$12=_ms.getModule(Number_10),infinity=_ms.get(_$12,"infinity"),int_47=_ms.get(_$12,"int/"),Nat=_ms.get(_$12,"Nat"),remainder=_ms.get(_$12,"remainder"),square=_ms.get(_$12,"square"),_$13=_ms.getModule(methods_11),_43=_ms.get(_$13,"+"),_$14=_ms.getModule(Type_12),contains_63=_ms.get(_$14,"contains?"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_13)
		}),_$17=_ms.lazyGetModule(Seq_14),seq_61_63=_ms.lazyProp(_$17,"seq=?"),take=_ms.lazyProp(_$17,"take");
		const digits=function digits(_){
			const base=10;
			return Stream(function*(){
				let left=_;
				for(;;){
					(yield remainder(left,base));
					left=int_47(left,base);
					if(_ms.bool(_61_63(left,0))){
						break
					}
				}
			})
		};
		const happy_45step=function happy_45step(_){
			return fold(map(digits(_),square),_43)
		};
		const cache=empty(Array_33);
		set_45nth_33(cache,1,true);
		const happy_63=exports["happy?"]=function(){
			const built={};
			const doc=built.doc="http://rosettacode.org/wiki/Happy_numbers";
			return _ms.set(function happy_63(n){
				_ms.checkContains(Nat,n,"n");
				const stepped_45through=empty(Id_45Set_33);
				let cur=n;
				let res=null;
				for(;;){
					{
						const _=js_45sub(cache,cur);
						if(_ms.bool(defined_63(_))){
							res=_;
							break
						} else {
							if(_ms.bool(contains_63(stepped_45through,cur))){
								res=false;
								break
							};
							_43_43_33(stepped_45through,[cur]);
							cur=happy_45step(cur)
						}
					}
				};
				for(let _ of stepped_45through[Symbol.iterator]()){
					set_45nth_33(cache,_,res)
				};
				set_45nth_33(cache,n,res);
				return res
			},built)
		}();
		const happy_45numbers=_ms.checkContains(_ms.sub(Stream,Nat),function(){
			const built={};
			const doc=built.doc="Stream of all happy numbers.";
			const test=built.test=function test(){
				_ms.unlazy(_33)(_ms.unlazy(seq_61_63),_ms.unlazy(take)(happy_45numbers,8),function(){
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
			return _ms.set(keep(range(1,infinity),happy_63),built,"happy-numbers")
		}(),"happy-numbers");
		const name=exports.name="happy-numbers";
		exports.default=happy_45numbers;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vaGFwcHktbnVtYmVycy5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBbUJBLGFBQVUsZ0JBQUEsRUFDQztHQUFWLFdBQU87VUFDUCxPQUNVLFdBQUE7SUFBVCxTQUFTO0lBRUwsT0FBQTtZQUFBLFVBQVUsS0FBSztVQUNWLE9BQUssS0FBSztLQUNsQixZQUFJLE9BQUcsS0FBSyxJQUNDO01BQVo7S0FBQTtJQUFBO0dBQUE7RUFBQTtFQUVKLG1CQUFjLHNCQUFBLEVBQ0M7VUFDZCxLQUFNLElBQUksT0FBTSxHQUFFLFFBQVE7RUFBQTtFQUUzQixZQUFRLE1BQU07RUFDZCxhQUFTLE1BQU0sRUFBRTtFQUVqQiwyQ0FDTzs7R0FBTixvQkFBTTtrQkFDTCxrQkFBQSxFQUNLO3NCQURIO0lBQ0Ysd0JBQWtCLE1BQU07SUFDeEIsUUFBUTtJQUVSLFFBQVE7SUFFSixPQUFBO0tBQUc7TUFBQSxRQUFBLFNBQU8sTUFBTTtNQUNsQixZQUFBLFdBQVEsSUFDQztXQUFEO09BQ1A7TUFBQSxPQUVHO09BQUgsWUFBSSxZQUFVLGtCQUFnQixNQUNHO1lBQXpCO1FBQ1A7T0FBQTtPQUVELFVBQUksa0JBQWdCLENBQUU7V0FDZixhQUFXO01BQUE7S0FBQTtJQUFBO0lBRWhCLFFBQUEsS0FBQSxxQ0FDZTtLQUFuQixhQUFTLE1BQU0sRUFBRTtJQUFBO0lBQ2xCLGFBQVMsTUFBTSxFQUFFO1dBQ2pCO0dBQUE7O0VBRUYsZ0RBQWMsT0FBTyxlQUNLOztHQUF6QixvQkFBTTtHQUNOLHNCQUNRLGVBQUE7MkRBQU8sZ0JBQWMsYUFDRTs7bUJBQTNCO21CQUNBO21CQUNBO21CQUNBO21CQUNBO21CQUNBO21CQUNBO21CQUNBOzs7O2tCQUNKLEtBQU0sTUFBTSxFQUFFLFVBQVU7O0VBekV6Qix3QkFBQTtrQkE2REEiLCJmaWxlIjoibWV0YS9kZW1vL2hhcHB5LW51bWJlcnMuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==