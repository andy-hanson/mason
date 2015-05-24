"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Function","../../Generatorbang","../../math/Number","../../math/methods","../../Type/Js-Method","../../Type/Kind","../../Type/Tuple","../at","../at-Type","../q","./Arraybang","./Seq","./Stream","../../bang","../../compare","../../control","../../math/methods","../../math/Number","../../Type/Type","./Range","./Seq"],function(exports,Function_0,Generator_33_1,Number_2,methods_3,Js_45Method_4,Kind_5,Tuple_6,_64_7,_64_45Type_8,_63_9,Array_33_10,Seq_11,Stream_12,_33_13,compare_14,control_15,methods_16,Number_17,Type_18,Range_19,Seq_20){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Function_0),call=_ms.get(_$2,"call"),thunk=_ms.get(_$2,"thunk"),Generator_33=_ms.getDefaultExport(Generator_33_1),_$3=_ms.getModule(Generator_33_1),empty_45Generator=_ms.get(_$3,"empty-Generator"),_$4=_ms.getModule(Number_2),Nat=_ms.get(_$4,"Nat"),_$5=_ms.getModule(methods_3),_45=_ms.get(_$5,"-"),_$6=_ms.getModule(Js_45Method_4),js_45impl_33=_ms.get(_$6,"js-impl!"),_$7=_ms.getModule(Kind_5),kind_33=_ms.get(_$7,"kind!"),self_45kind_33=_ms.get(_$7,"self-kind!"),Tuple=_ms.getDefaultExport(Tuple_6),_$9=_ms.getModule(_64_7),count=_ms.get(_$9,"count"),iterator=_ms.get(_$9,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_8),_$10=_ms.getModule(_64_45Type_8),empty=_ms.get(_$10,"empty"),from_45stream=_ms.get(_$10,"from-stream"),_$11=_ms.getModule(_63_9),_63_45or=_ms.get(_$11,"?-or"),Array_33=_ms.getDefaultExport(Array_33_10),Seq=_ms.getDefaultExport(Seq_11),_$13=_ms.getModule(Seq_11),_63nth=_ms.get(_$13,"?nth"),Stream=_ms.getDefaultExport(Stream_12),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_13)
		}),_$17=_ms.lazyGetModule(compare_14),_61_63=_ms.lazyProp(_$17,"=?"),_$18=_ms.lazyGetModule(control_15),build=_ms.lazyProp(_$18,"build"),_$19=_ms.lazyGetModule(methods_16),_43=_ms.lazyProp(_$19,"+"),_$20=_ms.lazyGetModule(Number_17),infinity=_ms.lazyProp(_$20,"infinity"),_$21=_ms.lazyGetModule(Type_18),_61_62=_ms.lazyProp(_$21,"=>"),_$22=_ms.lazyGetModule(Range_19),range=_ms.lazyProp(_$22,"range"),_$23=_ms.lazyGetModule(Seq_20),seq_61_63=_ms.lazyProp(_$23,"seq=?"),take_39=_ms.lazyProp(_$23,"take'");
		const Lazy_45Stream=Tuple(function(){
			const doc="Like Stream, but caches its elements as it produces them.\nIf you want to stream the results of an expensive computation and use it multiple times, use this.\nIf you have a cheap computation or only need to iterate through it once, use Stream.";
			const props=function(){
				const built=[];
				_ms.add(built,["caching-iterator",Generator_33]);
				_ms.add(built,["cache",Array_33]);
				return built
			}();
			return {
				doc:doc,
				props:props,
				name:"Lazy-Stream"
			}
		}());
		self_45kind_33(Lazy_45Stream,_64_45Type,function(){
			const built=new global.Map();
			_ms.assoc(built,empty,thunk(Lazy_45Stream(empty_45Generator,empty(Array_33))));
			_ms.assoc(built,from_45stream,function(_){
				return lazy_45streaming(function(){
					return iterator(_)
				})
			});
			return built
		}());
		js_45impl_33(iterator,Lazy_45Stream,function(){
			const test=function test(){
				_ms.unlazy(_33)(_ms.unlazy(_61_63),[1,2],_ms.unlazy(build)(function(_yield){
					const _=_ms.unlazy(_61_62)(Lazy_45Stream,Stream(function*(){
						_yield(1);
						(yield 1);
						_yield(2);
						(yield 2);
						_yield(3)
					}));
					_ms.unlazy(_33)(_ms.unlazy(seq_61_63),[1],_ms.unlazy(take_39)(_,1));
					_ms.unlazy(_33)(_ms.unlazy(seq_61_63),[1,2],_ms.unlazy(take_39)(_,2))
				}))
			};
			return _ms.set(function*(){
				(yield* iterator(this.cache));
				(yield* this["caching-iterator"])
			},"test",test)
		}());
		kind_33(Lazy_45Stream,Seq,function(){
			const built=new global.Map();
			_ms.assoc(built,_63nth,function(stream,n){
				_ms.checkContains(Nat,n,"n");
				return _63_45or(_63nth(stream.cache,n),_ms.lazy(function(){
					return function(){
						const n_45left=_45(n,count(stream.cache));
						return _63nth(Stream(stream["caching-iterator"]),n_45left)
					}()
				}))
			});
			return built
		}());
		const lazy_45streaming=exports["lazy-streaming"]=function(){
			const doc="Creates a Lazy-Stream from a generator.";
			const test=function test(){
				const fibonaccis=Stream(function*(){
					(yield 1);
					(yield 1);
					for(let _ of _ms.unlazy(range)(2,_ms.unlazy(infinity))[Symbol.iterator]()){
						(yield _ms.unlazy(_43)(_ms.sub(fibonaccis,_45(_,1)),_ms.sub(fibonaccis,_45(_,2))))
					}
				});
				return _ms.unlazy(_33)(_ms.unlazy(seq_61_63),_ms.unlazy(take_39)(fibonaccis,10),[1,1,2,3,5,8,13,21,34,55])
			};
			return _ms.set(function lazy_45streaming(stream){
				_ms.checkContains(_ms.sub(Function,Generator_33),stream,"stream");
				const cache=empty(Array_33);
				const strm=Stream(stream);
				const iter=call(function*(){
					for(let _ of strm[Symbol.iterator]()){
						cache.push(_);
						(yield _)
					}
				});
				return Lazy_45Stream(iter,cache)
			},"doc",doc,"test",test)
		}();
		const name=exports.name="Lazy-Stream";
		exports.default=Lazy_45Stream;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9MYXp5LVN0cmVhbS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBd0JBLG9CQUFjLGdCQUNLO0dBQWxCLFVBQ0M7R0FHRCxzQkFDTTs7a0JBQUgsQ0FBRyxtQkFBa0I7a0JBQ3JCLENBQUcsUUFBTzs7Ozs7Ozs7O0VBRWQsZUFBVyxjQUFZLHFCQUNNOzttQkFBNUIsTUFBUyxNQUFPLGNBQVksa0JBQWlCLE1BQU07bUJBRW5ELGNBQWdCLFNBQUEsRUFDQztXQUFoQixpQkFDZ0IsVUFBQTtZQUFmLFNBQVE7SUFBQTtHQUFBOzs7RUFFWCxhQUFTLFNBQVMsd0JBQ1c7R0FBNUIsV0FDUSxlQUFBO3VDQUFGLENBQUUsRUFBRSxxQkFBYSxTQUFBLE9BQ0s7S0FBMUIsMkJBQU8sY0FBYSxPQUNVLFdBQUE7TUFBN0IsT0FBTTthQUNIO01BQ0gsT0FBTTthQUNIO01BQ0gsT0FBTTtLQUFBOzJDQUNDLENBQUUsdUJBQVcsRUFBRTsyQ0FDZixDQUFFLEVBQUUsdUJBQVcsRUFBRTtJQUFBO0dBQUE7a0JBRXhCLFdBQUE7WUFBRSxTQUFTO1lBQ1Q7OztFQUVOLFFBQU0sY0FBWSxjQUNHOzttQkFBcEIsT0FBUyxTQUFBLE9BQU8sRUFDSztzQkFESDtXQUNqQixTQUFNLE9BQUssYUFBYTtzQkFDSTtNQUEzQixlQUFTLElBQUUsRUFBRyxNQUFNO2FBQ3BCLE9BQU0sT0FBTyw0QkFBeUI7S0FBQTtJQUFBO0dBQUE7OztFQUV6QywyREFDZTtHQUFkLFVBQU07R0FDTixXQUNPLGVBQUE7SUFBTixpQkFBYSxPQUNVLFdBQUE7WUFBbkI7WUFDQTtLQUNFLFFBQUEsdUJBQU0sMkNBQ1U7cUNBQ2YsV0FBWSxJQUFFLEVBQUUsWUFBRyxXQUFZLElBQUUsRUFBRTtLQUFBO0lBQUE7cUVBQzNCLFdBQVcsSUFBSSxDQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsR0FBRyxHQUFHO0dBQUE7a0JBQ3JELDBCQUFBLE9BQzJCOzhCQURwQixTQUFTO0lBQ2hCLFlBQVEsTUFBTTtJQUlkLFdBQU8sT0FBTztJQUNkLFdBQU8sS0FDUSxXQUFBO0tBQVQsUUFBQSxLQUFBLHdCQUNJO01BQ1IsV0FBVzthQUNSO0tBQUE7SUFBQTtXQUNMLGNBQVksS0FBSztHQUFBOztFQWxGbkIsd0JBQUE7a0JBb0ZBIiwiZmlsZSI6ImF0L1NlcS9MYXp5LVN0cmVhbS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9