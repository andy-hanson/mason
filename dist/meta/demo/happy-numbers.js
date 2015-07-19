"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/at","../../at/atbang","../../at/at-Type","../../at/Seq/Arraybang","../../at/Seq/Range","../../at/Seq/Seqbang","../../at/Seq/Stream","../../at/Set/Id-Setbang","../../compare","../../control","../../js","../../math/Number","../../math/methods","../../Type/Type","../../at/Seq/Seq"],(exports,_64_0,_64_33_1,_64_45Type_2,Array_33_3,Range_4,Seq_33_5,Stream_6,Id_45Set_33_7,compare_8,control_9,js_10,Number_11,methods_12,Type_13,Seq_14)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(_64_0),fold=_ms.get(_$2,"fold"),keep_39=_ms.get(_$2,"keep'"),map=_ms.get(_$2,"map"),_$3=_ms.getModule(_64_33_1),_43_43_33=_ms.get(_$3,"++!"),_$4=_ms.getModule(_64_45Type_2),empty=_ms.get(_$4,"empty"),Array_33=_ms.getDefaultExport(Array_33_3),_$6=_ms.getModule(Range_4),range=_ms.get(_$6,"range"),_$7=_ms.getModule(Seq_33_5),set_45nth_33=_ms.get(_$7,"set-nth!"),Stream=_ms.getDefaultExport(Stream_6),Id_45Set_33=_ms.getDefaultExport(Id_45Set_33_7),_$10=_ms.getModule(compare_8),_61_63=_ms.get(_$10,"=?"),_$11=_ms.getModule(control_9),returning=_ms.get(_$11,"returning"),_$12=_ms.getModule(js_10),defined_63=_ms.get(_$12,"defined?"),js_45sub=_ms.get(_$12,"js-sub"),_$13=_ms.getModule(Number_11),infinity=_ms.get(_$13,"infinity"),int_47=_ms.get(_$13,"int/"),Nat=_ms.get(_$13,"Nat"),remainder=_ms.get(_$13,"remainder"),square=_ms.get(_$13,"square"),_$14=_ms.getModule(methods_12),_43=_ms.get(_$14,"+"),_$15=_ms.getModule(Type_13),contains_63=_ms.get(_$15,"contains?"),_$17=_ms.lazyGetModule(Seq_14),seq_61_63=_ms.lazyProp(_$17,"seq=?"),take=_ms.lazyProp(_$17,"take");
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
		const cache=empty(Array_33);
		set_45nth_33(cache,1,true);
		const happy_63=exports["happy?"]=()=>{
			const built={};
			const doc=built.doc=`http://rosettacode.org/wiki/Happy_numbers`;
			return _ms.set(function happy_63(n){
				_ms.checkContains(Nat,n,"n");
				const stepped_45through=empty(Id_45Set_33);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vaGFwcHktbnVtYmVycy5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQW1CQSxhQUFVLGdCQUFBLEVBQ0M7R0FBVixXQUFPO1VBQ1AsT0FDVSxXQUFBO0lBQVQsU0FBUztJQUVMLE9BQUE7WUFBQSxVQUFVLEtBQUs7VUFDVixPQUFLLEtBQUs7S0FDbEIsR0FBSSxPQUFHLEtBQUssR0FDQztNQUFaO0tBQUE7SUFBQTtHQUFBO0VBQUE7RUFFSixtQkFBYyxzQkFBQSxFQUNDO1VBQ2QsS0FBTSxJQUFJLE9BQU0sR0FBRSxRQUFRO0VBQUE7RUFFM0IsWUFBUSxNQUFNO0VBQ2QsYUFBUyxNQUFNLEVBQUU7RUFFakIscUNBQ087O0dBQU4sb0JBQU07a0JBQ0wsa0JBQUEsRUFDSztzQkFESDtJQUNGLHdCQUFrQixNQUFNO0lBQ3hCLFFBQVE7SUFDUjtZQUNjO01BQVA7T0FBQSxRQUFBLFNBQU8sTUFBTTtPQUNsQixZQUFBLFdBQVEsSUFDQztRQUFSLE9BQU07T0FBQSxPQUVIO1FBQUgsR0FBSSxZQUFVLGtCQUFnQixLQUNHO1NBQWhDLE9BQU07UUFBQTtRQUVQLFVBQUksa0JBQWdCLENBQUU7WUFDZixhQUFXO09BQUE7TUFBQTtLQUFBO0lBQUE7V0FDckIsVUFBVSxhQUNXLElBQUE7S0FBZixRQUFBLEtBQUEsa0JBQ2U7TUFBbkIsYUFBUyxNQUFNLEVBQUU7S0FBQTtLQUNsQixhQUFTLE1BQU0sRUFBRTtJQUFBO0dBQUE7O0VBRXBCLGdEQUFjLE9BQU8sU0FDSzs7R0FBekIsb0JBQU07R0FDTixzQkFDUSxlQUFBO3NEQUFhLGdCQUFjLE9BQ0U7O21CQUFqQzttQkFDQTttQkFDQTttQkFDQTttQkFDQTttQkFDQTttQkFDQTttQkFDQTs7OztrQkFDSixRQUFPLE1BQU0sRUFBRSxVQUFVOztFQXBFMUIsd0JBQUE7a0JBd0RBIiwiZmlsZSI6Im1ldGEvZGVtby9oYXBweS1udW1iZXJzLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=