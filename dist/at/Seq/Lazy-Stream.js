"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Fun","../../Generatorbang","../../math/Num","../../math/methods","../../Type/Kind","../../Type/Tuple","../at","../atbang","../at-Type","../q","./Arraybang","./Seq","./Stream","../../bang","../../compare","../../control","../../math/methods","../../math/Num","../../Type/Type","./Range","./Seq"],function(exports,Fun_0,Generator_33_1,Num_2,methods_3,Kind_4,Tuple_5,_64_6,_64_33_7,_64_45Type_8,_63_9,Array_33_10,Seq_11,Stream_12,_33_13,compare_14,control_15,methods_16,Num_17,Type_18,Range_19,Seq_20){
	exports._get=_ms.lazy(function(){
		const Fun=_ms.getDefaultExport(Fun_0),_$2=_ms.getModule(Fun_0),thunk=_ms.get(_$2,"thunk"),Generator_33=_ms.getDefaultExport(Generator_33_1),_$3=_ms.getModule(Generator_33_1),each_126=_ms.get(_$3,"each~"),empty_45Generator=_ms.get(_$3,"empty-Generator"),_$4=_ms.getModule(Num_2),Nat=_ms.get(_$4,"Nat"),_$5=_ms.getModule(methods_3),_45=_ms.get(_$5,"-"),_$6=_ms.getModule(Kind_4),kind_33=_ms.get(_$6,"kind!"),self_45kind_33=_ms.get(_$6,"self-kind!"),Tuple=_ms.getDefaultExport(Tuple_5),_$8=_ms.getModule(_64_6),count=_ms.get(_$8,"count"),iterator=_ms.get(_$8,"iterator"),_$9=_ms.getModule(_64_33_7),_43_43_33=_ms.get(_$9,"++!"),_64_45Type=_ms.getDefaultExport(_64_45Type_8),_$10=_ms.getModule(_64_45Type_8),empty=_ms.get(_$10,"empty"),from_45stream=_ms.get(_$10,"from-stream"),_$11=_ms.getModule(_63_9),_63_45or=_ms.get(_$11,"?-or"),Array_33=_ms.getDefaultExport(Array_33_10),Seq=_ms.getDefaultExport(Seq_11),_$13=_ms.getModule(Seq_11),_63nth=_ms.get(_$13,"?nth"),Stream=_ms.getDefaultExport(Stream_12),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_13)
		}),_$17=_ms.lazyGetModule(compare_14),_61_63=_ms.lazyProp(_$17,"=?"),_$18=_ms.lazyGetModule(control_15),build=_ms.lazyProp(_$18,"build"),_$19=_ms.lazyGetModule(methods_16),_43=_ms.lazyProp(_$19,"+"),_$20=_ms.lazyGetModule(Num_17),infinity=_ms.lazyProp(_$20,"infinity"),_$21=_ms.lazyGetModule(Type_18),_61_62=_ms.lazyProp(_$21,"=>"),_$22=_ms.lazyGetModule(Range_19),range=_ms.lazyProp(_$22,"range"),_$23=_ms.lazyGetModule(Seq_20),seq_61_63=_ms.lazyProp(_$23,"seq=?"),take_39=_ms.lazyProp(_$23,"take'");
		const Lazy_45Stream=Tuple(function(){
			const doc="Like Stream, but caches its elements as it produces them.\nIf you want to stream the results of an expensive computation and use it multiple times, use this.\nIf you have a cheap computation or only need to iterate through it once, use Stream.";
			const props=function(){
				const _0=["caching-iterator",Generator_33];
				const _1=["cache",Array_33];
				return [_0,_1]
			}();
			return {
				doc:doc,
				props:props,
				displayName:"Lazy-Stream"
			}
		}());
		self_45kind_33(Lazy_45Stream,_64_45Type,function(){
			const _k0=empty,_v0=thunk(Lazy_45Stream(empty_45Generator,empty(Array_33)));
			const _k1=from_45stream,_v1=function(_){
				return lazy_45streaming(function(){
					return iterator(_)
				})
			};
			return _ms.map(_k0,_v0,_k1,_v1)
		}());
		kind_33(Lazy_45Stream,Seq,function(){
			const _k0=iterator,_v0=function(){
				const test=_ms.set(function(){
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),[1,2],_ms.unlazy(build)(function(_yield){
						const _=_ms.unlazy(_61_62)(Lazy_45Stream,Stream(_ms.set(function*(){
							_yield(1);
							(yield 1);
							_yield(2);
							(yield 2);
							return _yield(3)
						},"displayName","_")));
						_ms.unlazy(_33)(_ms.unlazy(seq_61_63),[1],_ms.unlazy(take_39)(_,1));
						return _ms.unlazy(_33)(_ms.unlazy(seq_61_63),[1,2],_ms.unlazy(take_39)(_,2))
					}))
				},"displayName","test");
				return _ms.set(function*(_){
					(yield* iterator(_.cache));
					return (yield* _["caching-iterator"])
				},"test",test)
			}();
			const _k1=_63nth,_v1=function(stream,n){
				_ms.checkContains(Nat,n,"n");
				return _63_45or(_63nth(stream.cache,n),_ms.lazy(function(){
					return function(){
						const n_45left=_45(n,count(stream.cache));
						return _63nth(Stream(stream["caching-iterator"]),n_45left)
					}()
				}))
			};
			return _ms.map(_k0,_v0,_k1,_v1)
		}());
		const lazy_45streaming=exports["lazy-streaming"]=function(){
			const doc="Creates a Lazy-Stream from a generator.";
			const test=_ms.set(function(){
				const fibonaccis=Stream(_ms.set(function*(){
					(yield 1);
					(yield 1);
					return (yield* each_126(_ms.unlazy(range)(2,_ms.unlazy(infinity)),function*(i){
						return (yield _ms.unlazy(_43)(_ms.sub(fibonaccis,_45(i,1)),_ms.sub(fibonaccis,_45(i,2))))
					}))
				},"displayName","fibonaccis"));
				return _ms.unlazy(_33)(_ms.unlazy(seq_61_63),_ms.unlazy(take_39)(fibonaccis,10),[1,1,2,3,5,8,13,21,34,55])
			},"displayName","test");
			return _ms.set(function(stream){
				_ms.checkContains(_ms.sub(Fun,Generator_33),stream,"stream");
				const cash=empty(Array_33);
				const iter=each_126(Stream(stream),_ms.set(function*(_){
					_43_43_33(cash,[_]);
					return (yield _)
				},"displayName","iter"));
				return Lazy_45Stream(iter,cash)
			},"doc",doc,"test",test,"displayName","lazy-streaming")
		}();
		const displayName=exports.displayName="Lazy-Stream";
		exports.default=Lazy_45Stream;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9MYXp5LVN0cmVhbS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBd0JBLG9CQUFjLGdCQUNLO0dBQWxCLFVBQ0M7R0FHRCxzQkFDTTtJQUFMLFNBQUUsQ0FBRyxtQkFBa0I7SUFDdkIsU0FBRSxDQUFHLFFBQU87V0FEUDs7VUFMWTs7Ozs7O0VBUW5CLGVBQVcsY0FBWSxxQkFDTTtHQUE1QixVQUFBLFVBQVMsTUFBTyxjQUFZLGtCQUFpQixNQUFNO0dBRW5ELFVBQUEsa0JBQWdCLFNBQUEsRUFDQztXQUFoQixpQkFDZ0IsVUFBQTtZQUFmLFNBQUE7SUFBQTtHQUFBOzs7RUFFSCxRQUFNLGNBQVksY0FDRztHQUFwQixVQUFBLHVCQUNXO0lBQVYsbUJBQ08sVUFBQTsrQ0FBRCxDQUFFLEVBQUUscUJBQVksU0FBQSxPQUNLO01BQXpCLDJCQUFPLGNBQWEsZUFDUyxXQUFBO09BQTVCLE9BQU07T0FDSCxPQUFBO09BQ0gsT0FBTTtPQUNILE9BQUE7Y0FDSCxPQUFNO01BQUE7NENBQ0MsQ0FBRSx1QkFBVyxFQUFFO21EQUNmLENBQUUsRUFBRSx1QkFBVyxFQUFFO0tBQUE7SUFBQTttQkFDekIsVUFBQSxFQUNDO0tBQUUsUUFBQSxTQUFTO1lBQ1QsUUFBQTs7O0dBRU4sVUFBQSxXQUFTLFNBQUEsT0FBTyxFQUNLO3NCQURIO1dBQ2pCLFNBQU0sT0FBSyxhQUFhO3NCQUNJO01BQTNCLGVBQVMsSUFBRSxFQUFHLE1BQU07YUFDcEIsT0FBTSxPQUFPLDRCQUF5QjtLQUFBO0lBQUE7R0FBQTs7O0VBRXpDLDJEQUNlO0dBQWQsVUFBTTtHQUNOLG1CQUNPLFVBQUE7SUFBTixpQkFBYSxlQUNTLFdBQUE7S0FBbEIsT0FBQTtLQUNBLE9BQUE7WUFDQyxRQUFBLDJCQUFhLHdCQUFjLFVBQUEsRUFDQzthQUM1QiwrQkFBRSxXQUFZLElBQUUsRUFBRSxZQUFHLFdBQVksSUFBRSxFQUFFO0tBQUE7SUFBQTtxRUFDM0IsV0FBVyxJQUFJLENBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxHQUFHLEdBQUc7R0FBQTtrQkFDckQsU0FBQSxPQUNzQjs4QkFEZixJQUFJO0lBQ1gsV0FBTyxNQUFNO0lBRWIsV0FBTyxTQUFPLE9BQU8sZ0JBQVUsVUFBQSxFQUNDO0tBQS9CLFVBQUksS0FBSyxDQUFFO1lBQ1IsT0FBQTtJQUFBO1dBQ0osY0FBWSxLQUFLO0dBQUE7O0VBN0VuQixzQ0FBQTtrQkErRUEiLCJmaWxlIjoiYXQvU2VxL0xhenktU3RyZWFtLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=