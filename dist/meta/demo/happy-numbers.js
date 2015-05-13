"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/at","../../at/atbang","../../at/at-Type","../../at/Seq/Arraybang","../../at/Seq/Range","../../at/Seq/Seqbang","../../at/Seq/Stream","../../at/Set/Id-Setbang","../../Bool","../../control","../../js","../../math/Num","../../math/methods","../../Type/Type","../../bang","../../at/Seq/Seq"],function(exports,_64_0,_64_33_1,_64_45Type_2,Array_33_3,Range_4,Seq_33_5,Stream_6,Id_45Set_33_7,Bool_8,control_9,js_10,Num_11,methods_12,Type_13,_33_14,Seq_15){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(_64_0),each_33=_ms.get(_$2,"each!"),fold=_ms.get(_$2,"fold"),keep=_ms.get(_$2,"keep"),map=_ms.get(_$2,"map"),map_39=_ms.get(_$2,"map'"),_$3=_ms.getModule(_64_33_1),_43_43_33=_ms.get(_$3,"++!"),_$4=_ms.getModule(_64_45Type_2),empty=_ms.get(_$4,"empty"),Array_33=_ms.getDefaultExport(Array_33_3),_$6=_ms.getModule(Range_4),range=_ms.get(_$6,"range"),_$7=_ms.getModule(Seq_33_5),set_45nth_33=_ms.get(_$7,"set-nth!"),Stream=_ms.getDefaultExport(Stream_6),Id_45Set_33=_ms.getDefaultExport(Id_45Set_33_7),Bool=_ms.getDefaultExport(Bool_8),_$10=_ms.getModule(Bool_8),and=_ms.get(_$10,"and"),not=_ms.get(_$10,"not"),_$11=_ms.getModule(control_9),returning=_ms.get(_$11,"returning"),_$12=_ms.getModule(js_10),defined_63=_ms.get(_$12,"defined?"),js_45sub=_ms.get(_$12,"js-sub"),Num=_ms.getDefaultExport(Num_11),_$13=_ms.getModule(Num_11),infinity=_ms.get(_$13,"infinity"),Nat=_ms.get(_$13,"Nat"),square=_ms.get(_$13,"square"),_$14=_ms.getModule(methods_12),_43=_ms.get(_$14,"+"),_$15=_ms.getModule(Type_13),contains_63=_ms.get(_$15,"contains?"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_14)
		}),_$18=_ms.lazyGetModule(Seq_15),seq_61_63=_ms.lazyProp(_$18,"seq=?"),take_39=_ms.lazyProp(_$18,"take'");
		const digits=function(){
			return _ms.set(function(_){
				_ms.checkContains(Nat,_,"_");
				return map_39(_.toString(10),Num.parseInt)
			},"displayName","digits")
		}();
		const step=function(){
			return function(){
				return _ms.set(function(_){
					_ms.checkContains(Nat,_,"_");
					return _ms.checkContains(Nat,fold(map(digits(_),square),0,_43),"res")
				},"displayName","step")
			}()
		}();
		const cache=empty(Array_33);
		set_45nth_33(cache,1,true);
		const happy_63=exports["happy?"]=function(){
			const doc="http://rosettacode.org/wiki/Happy_numbers";
			return _ms.set(function(n){
				_ms.checkContains(Nat,n,"n");
				const stepped_45through=empty(Id_45Set_33);
				const loop=function(){
					return _ms.set(function(cur){
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
					},"displayName","loop")
				}();
				return returning(loop(n),function(ans){
					_ms.checkContains(Bool,ans,"ans");
					each_33(stepped_45through,function(_){
						return set_45nth_33(cache,_,ans)
					});
					return set_45nth_33(cache,n,ans)
				})
			},"doc",doc,"displayName","happy?")
		}();
		const happy_45numbers=exports["happy-numbers"]=_ms.checkContains(_ms.sub(Stream,Nat),function(){
			const doc="Stream of all happy numbers.";
			const test=function(){
				return _ms.set(function(){
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
				},"displayName","test")
			}();
			return _ms.set(keep(range(1,infinity),happy_63),"doc",doc,"test",test,"displayName","happy-numbers")
		}(),"happy-numbers");
		const displayName=exports.displayName="happy-numbers";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vaGFwcHktbnVtYmVycy5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBbUJBLHVCQUFVO2tCQUFBLFNBQUEsRUFDSztzQkFESDtXQUVYLE9BQU0sV0FBVyxJQUFJOzs7RUFFdEIscUJBQ007b0JBQUo7bUJBQUEsU0FBSyxFQUNLO3VCQURIOzhCQUFOLElBQ0QsS0FBTSxJQUFJLE9BQUEsR0FBUSxRQUFRLEVBQUU7Ozs7RUFFOUIsWUFBUSxNQUFNO0VBQ2QsYUFBUyxNQUFNLEVBQUU7RUFFakIsMkNBQ087R0FBTixVQUFNO2tCQUNMLFNBQUEsRUFDSztzQkFESDtJQUNGLHdCQUFrQixNQUFNO0lBQ3hCLHFCQUFRO29CQUFBLFNBQUEsSUFDRzs7T0FBTCxRQUFBLFNBQU8sTUFBTTtPQUNqQixZQUFBLFdBQUEsSUFDUztlQUFSO09BQUEsT0FFRztlQUFILElBQUssSUFBSyxZQUFVLGtCQUFnQjswQkFDTztVQUMxQyxVQUFJLGtCQUFnQixDQUFFO2lCQUN0QixLQUFNLEtBQUs7U0FBQTtRQUFBO09BQUE7TUFBQTtLQUFBOztXQUNmLFVBQVcsS0FBSyxHQUFJLFNBQUEsSUFDUTt1QkFESjtLQUN2QixRQUFNLGtCQUFpQixTQUFBLEVBQ0M7YUFBdkIsYUFBUyxNQUFNLEVBQUU7S0FBQTtZQUNsQixhQUFTLE1BQU0sRUFBRTtJQUFBO0dBQUE7O0VBRXBCLHlFQUFjLE9BQU8sZUFDSztHQUF6QixVQUFNO0dBQ04scUJBQ087bUJBQUEsVUFBQTtzRUFBUyxnQkFBYyxhQUNFO01BQTlCLFNBQUU7TUFDRixTQUFFO01BQ0YsU0FBRTtNQUNGLFNBQUU7TUFDRixTQUFFO01BQ0YsU0FBRTtNQUNGLFNBQUU7TUFDRixTQUFFOzs7OztrQkFDSixLQUFNLE1BQU0sRUFBRSxVQUFVOztFQTVEekIsc0NBQUEiLCJmaWxlIjoibWV0YS9kZW1vL2hhcHB5LW51bWJlcnMuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==