"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Function","../../Generatorbang","../../math/Number","../../math/methods","../../Type/Kind","../../Type/Tuple","../at","../atbang","../at-Type","../q","./Arraybang","./Seq","./Stream","../../bang","../../compare","../../control","../../math/methods","../../math/Number","../../Type/Type","./Range","./Seq"],function(exports,Function_0,Generator_33_1,Number_2,methods_3,Kind_4,Tuple_5,_64_6,_64_33_7,_64_45Type_8,_63_9,Array_33_10,Seq_11,Stream_12,_33_13,compare_14,control_15,methods_16,Number_17,Type_18,Range_19,Seq_20){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Function_0),thunk=_$2.thunk,Generator_33=_ms.getDefaultExport(Generator_33_1),_$3=_ms.getModule(Generator_33_1),each_126=_$3["each~"],empty_45Generator=_$3["empty-Generator"],_$4=_ms.getModule(Number_2),Nat=_$4.Nat,_$5=_ms.getModule(methods_3),_45=_$5["-"],_$6=_ms.getModule(Kind_4),kind_33=_$6["kind!"],self_45kind_33=_$6["self-kind!"],Tuple=_ms.getDefaultExport(Tuple_5),_$8=_ms.getModule(_64_6),count=_$8.count,iterator=_$8.iterator,_$9=_ms.getModule(_64_33_7),_43_43_33=_$9["++!"],_64_45Type=_ms.getDefaultExport(_64_45Type_8),_$10=_ms.getModule(_64_45Type_8),empty=_$10.empty,from_45stream=_$10["from-stream"],_$11=_ms.getModule(_63_9),_63_45or=_$11["?-or"],Array_33=_ms.getDefaultExport(Array_33_10),Seq=_ms.getDefaultExport(Seq_11),_$13=_ms.getModule(Seq_11),_63nth=_$13["?nth"],Stream=_ms.getDefaultExport(Stream_12),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_13)
		}),_$17=_ms.lazyGetModule(compare_14),_61_63=_ms.lazyProp(_$17,"=?"),_$18=_ms.lazyGetModule(control_15),build=_ms.lazyProp(_$18,"build"),_$19=_ms.lazyGetModule(methods_16),_43=_ms.lazyProp(_$19,"+"),_$20=_ms.lazyGetModule(Number_17),infinity=_ms.lazyProp(_$20,"infinity"),_$21=_ms.lazyGetModule(Type_18),_61_62=_ms.lazyProp(_$21,"=>"),_$22=_ms.lazyGetModule(Range_19),range=_ms.lazyProp(_$22,"range"),_$23=_ms.lazyGetModule(Seq_20),seq_61_63=_ms.lazyProp(_$23,"seq=?"),take_39=_ms.lazyProp(_$23,"take'");
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
				name:"Lazy-Stream"
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
				return _ms.set(function*(_){
					(yield* iterator(_.cache));
					return (yield* _["caching-iterator"])
				})
			}();
			const _k1=_63nth,_v1=function(stream,n){
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
			return _ms.set(function lazy_45streaming(stream){
				const cash=empty(Array_33);
				const iter=each_126(Stream(stream),function*(_){
					_43_43_33(cash,[_]);
					return (yield _)
				});
				return Lazy_45Stream(iter,cash)
			},"doc",doc)
		}();
		const name=exports.name="Lazy-Stream";
		exports.default=Lazy_45Stream;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9MYXp5LVN0cmVhbS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBd0JBLG9CQUFjLGdCQUNLO0dBQWxCLFVBQ0M7R0FHRCxzQkFDTTtJQUFMLFNBQUUsQ0FBRyxtQkFBa0I7SUFDdkIsU0FBRSxDQUFHLFFBQU87Ozs7Ozs7OztFQUVkLGVBQVcsY0FBWSxxQkFDTTtHQUE1QixVQUFBLFVBQVMsTUFBTyxjQUFZLGtCQUFpQixNQUFNO0dBRW5ELFVBQUEsa0JBQWdCLFNBQUEsRUFDQztXQUFoQixpQkFDZ0IsVUFBQTtZQUFmLFNBQUE7SUFBQTtHQUFBOzs7RUFFSCxRQUFNLGNBQVksY0FDRztHQUFwQixVQUFBLHVCQUNXO21CQVVSLFVBQUEsRUFDQzthQUFFLFNBQVM7WUFDVCxRQUFBOzs7R0FFTixVQUFBLFdBQVMsU0FBQSxPQUFPLEVBQ0s7V0FBcEIsU0FBTSxPQUFLLGFBQWE7c0JBQ0k7TUFBM0IsZUFBUyxJQUFFLEVBQUcsTUFBTTthQUNwQixPQUFNLE9BQU8sNEJBQXlCO0tBQUE7SUFBQTtHQUFBOzs7RUFFekMsMkRBQ2U7R0FBZCxVQUFNO2tCQVNMLDBCQUFBLE9BQzJCO0lBQTNCLFdBQU8sTUFBTTtJQUViLFdBQU8sU0FBTyxPQUFPLFFBQVUsVUFBQSxFQUNDO0tBQS9CLFVBQUksS0FBSyxDQUFFO1lBQ1IsT0FBQTtJQUFBO1dBQ0osY0FBWSxLQUFLO0dBQUE7O0VBN0VuQix3QkFBQTtrQkErRUEiLCJmaWxlIjoiYXQvU2VxL0xhenktU3RyZWFtLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=