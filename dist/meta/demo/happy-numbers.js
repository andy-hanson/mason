"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/at","../../at/at-Type","../../at/Seq/Range","../../at/Seq/Seq","../../at/Seq/Stream","../../at/Set/Id-Set","../../compare","../../control","../../js","../../math/Number","../../math/methods","../../Type/Type","../../at/Seq/Seq"],(exports,_64_0,_64_45Type_1,Range_2,Seq_3,Stream_4,Id_45Set_5,compare_6,control_7,js_8,Number_9,methods_10,Type_11,Seq_12)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(_64_0),_43_43_33=_ms.get(_$2,"++!"),fold=_ms.get(_$2,"fold"),keep_39=_ms.get(_$2,"keep'"),map=_ms.get(_$2,"map"),_$3=_ms.getModule(_64_45Type_1),empty=_ms.get(_$3,"empty"),Range=_ms.getDefaultExport(Range_2),_$5=_ms.getModule(Seq_3),set_45nth_33=_ms.get(_$5,"set-nth!"),Stream=_ms.getDefaultExport(Stream_4),Id_45Set=_ms.getDefaultExport(Id_45Set_5),_$8=_ms.getModule(compare_6),_61_63=_ms.get(_$8,"=?"),_$9=_ms.getModule(control_7),returning=_ms.get(_$9,"returning"),_$10=_ms.getModule(js_8),defined_63=_ms.get(_$10,"defined?"),js_45sub=_ms.get(_$10,"js-sub"),_$11=_ms.getModule(Number_9),infinity=_ms.get(_$11,"infinity"),int_47=_ms.get(_$11,"int/"),Nat=_ms.get(_$11,"Nat"),remainder=_ms.get(_$11,"remainder"),square=_ms.get(_$11,"square"),_$12=_ms.getModule(methods_10),_43=_ms.get(_$12,"+"),_$13=_ms.getModule(Type_11),contains_63=_ms.get(_$13,"contains?"),_$15=_ms.lazyGetModule(Seq_12),seq_61_63=_ms.lazyProp(_$15,"seq=?"),take=_ms.lazyProp(_$15,"take");
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
			return _ms.set(keep_39(new (Range)(1,infinity),happy_63),built,"happy-numbers")
		}(),"happy-numbers");
		const name=exports.name=`happy-numbers`;
		exports.default=happy_45numbers;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vaGFwcHktbnVtYmVycy5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQWlCQSxhQUFVLGdCQUFBLEVBQ0M7R0FBVixXQUFPO1VBQ1AsS0FBSSxRQUNVLFdBQUE7SUFBYixTQUFTO0lBRUwsT0FBQTtZQUFBLFVBQVUsS0FBSztVQUNWLE9BQUssS0FBSztLQUNsQixHQUFJLE9BQUcsS0FBSyxHQUNDO01BQVo7S0FBQTtJQUFBO0dBQUE7RUFBQTtFQUVKLG1CQUFjLHNCQUFBLEVBQ0M7VUFDZCxLQUFNLElBQUksT0FBTSxHQUFFLFFBQVE7RUFBQTtFQUUzQixZQUFRO0VBQ1IsYUFBUyxNQUFNLEVBQUU7RUFFakIscUNBQ087O0dBQU4sb0JBQU07a0JBQ0wsa0JBQUEsRUFDSztzQkFESDtJQUNGLHdCQUFrQixNQUFNO0lBQ3hCLFFBQVE7SUFDUjtZQUNjO01BQVA7T0FBQSxRQUFBLFNBQU8sTUFBTTtPQUNsQixZQUFBLFdBQVEsSUFDQztRQUFSLE9BQU07T0FBQSxPQUVIO1FBQUgsR0FBSSxZQUFVLGtCQUFnQixLQUNHO1NBQWhDLE9BQU07UUFBQTtRQUVQLFVBQUksa0JBQWdCLENBQUU7WUFDZixhQUFXO09BQUE7TUFBQTtLQUFBO0lBQUE7V0FDckIsVUFBVSxhQUNXLElBQUE7S0FBZixRQUFBLEtBQUEsa0JBQ2U7TUFBbkIsYUFBUyxNQUFNLEVBQUU7S0FBQTtLQUNsQixhQUFTLE1BQU0sRUFBRTtJQUFBO0dBQUE7O0VBRXBCLGdEQUFjLE9BQU8sU0FDSzs7R0FBekIsb0JBQU07R0FDTixzQkFDUSxlQUFBO3NEQUFhLGdCQUFjLE9BQ0U7O21CQUFqQzttQkFDQTttQkFDQTttQkFDQTttQkFDQTttQkFDQTttQkFDQTttQkFDQTs7OztrQkFDSixRQUFPLEtBQUksT0FBTSxFQUFFLFVBQVU7O0VBbEU5Qix3QkFBQTtrQkFzREEiLCJmaWxlIjoibWV0YS9kZW1vL2hhcHB5LW51bWJlcnMuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==