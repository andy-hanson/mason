"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Function","../../Generator","../../math/Number","../../math/methods","../../Type/Kind","../../Type/Method","../../Type/Tuple","../at","../at-Type","../q","./Seq","./Stream","../../compare","../../control","../../math/methods","../../math/Number","../../Type/Type","./Range","./Seq"],(exports,Function_0,Generator_1,Number_2,methods_3,Kind_4,Method_5,Tuple_6,_64_7,_64_45Type_8,_63_9,Seq_10,Stream_11,compare_12,control_13,methods_14,Number_15,Type_16,Range_17,Seq_18)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(Function_0),call=_ms.get(_$2,"call"),thunk=_ms.get(_$2,"thunk"),Generator=_ms.getDefaultExport(Generator_1),_$3=_ms.getModule(Generator_1),empty_45Generator=_ms.get(_$3,"empty-Generator"),_$4=_ms.getModule(Number_2),Nat=_ms.get(_$4,"Nat"),_$5=_ms.getModule(methods_3),_45=_ms.get(_$5,"-"),_$6=_ms.getModule(Kind_4),kind_33=_ms.get(_$6,"kind!"),self_45kind_33=_ms.get(_$6,"self-kind!"),_$7=_ms.getModule(Method_5),impl_33=_ms.get(_$7,"impl!"),self_45impl_33=_ms.get(_$7,"self-impl!"),Tuple=_ms.getDefaultExport(Tuple_6),_$9=_ms.getModule(_64_7),count=_ms.get(_$9,"count"),iterator=_ms.get(_$9,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_8),_$10=_ms.getModule(_64_45Type_8),empty=_ms.get(_$10,"empty"),from_45stream=_ms.get(_$10,"from-stream"),_$11=_ms.getModule(_63_9),_63_45or=_ms.get(_$11,"?-or"),Seq=_ms.getDefaultExport(Seq_10),_$12=_ms.getModule(Seq_10),_63nth=_ms.get(_$12,"?nth"),Stream=_ms.getDefaultExport(Stream_11),_$15=_ms.lazyGetModule(compare_12),_61_63=_ms.lazyProp(_$15,"=?"),_$16=_ms.lazyGetModule(control_13),build=_ms.lazyProp(_$16,"build"),_$17=_ms.lazyGetModule(methods_14),_43=_ms.lazyProp(_$17,"+"),_$18=_ms.lazyGetModule(Number_15),infinity=_ms.lazyProp(_$18,"infinity"),_$19=_ms.lazyGetModule(Type_16),_61_62=_ms.lazyProp(_$19,"=>"),_$20=_ms.lazyGetModule(Range_17),range=_ms.lazyProp(_$20,"range"),_$21=_ms.lazyGetModule(Seq_18),seq_61_63=_ms.lazyProp(_$21,"seq=?"),take_39=_ms.lazyProp(_$21,"take'");
		const Lazy_45Stream=Tuple(()=>{
			const built={};
			const doc=built.doc=`Like Stream, but caches its elements as it produces them.\nIf you want to stream the results of an expensive computation and use it multiple times, use this.\nIf you have a cheap computation or only need to iterate through it once, use Stream.`;
			const props=built.props=()=>{
				const built=[];
				_ms.add(built,[`caching-iterator`,Generator]);
				_ms.add(built,[`cache`,Array]);
				return built
			}();
			return _ms.setName(built,"Lazy-Stream")
		}());
		self_45kind_33(Lazy_45Stream,_64_45Type);
		self_45impl_33(empty,Lazy_45Stream,thunk(Lazy_45Stream(empty_45Generator,[])));
		self_45impl_33(from_45stream,Lazy_45Stream,_=>{
			return lazy_45streaming(()=>{
				return iterator(_)
			})
		});
		impl_33(iterator,Lazy_45Stream,()=>{
			const built={};
			const test=built.test=function test(){
				_ms.assert(_ms.unlazy(_61_63),[1,2],_ms.unlazy(build)(_yield=>{
					const _=_ms.unlazy(_61_62)(Lazy_45Stream,Stream(function*(){
						_yield(1);
						(yield 1);
						_yield(2);
						(yield 2);
						_yield(3)
					}));
					_ms.assert(_ms.unlazy(seq_61_63),[1],_ms.unlazy(take_39)(_,1));
					_ms.assert(_ms.unlazy(seq_61_63),[1,2],_ms.unlazy(take_39)(_,2))
				}))
			};
			return _ms.set(function*(){
				const _this=this;
				(yield* iterator(_this.cache));
				(yield* _this["caching-iterator"])
			},built)
		}());
		kind_33(Lazy_45Stream,Seq);
		impl_33(_63nth,Lazy_45Stream,function(n){
			const _this=this;
			_ms.checkContains(Nat,n,"n");
			return _63_45or(_63nth(_this.cache,n),_ms.lazy(()=>{
				return ()=>{
					const n_45left=_45(n,count(_this.cache));
					return _63nth(Stream(_this["caching-iterator"]),n_45left)
				}()
			}))
		});
		const lazy_45streaming=exports["lazy-streaming"]=()=>{
			const built={};
			const doc=built.doc=`Creates a Lazy-Stream from a generator.`;
			const test=built.test=function test(){
				const fibonaccis=Stream(function*(){
					(yield 1);
					(yield 1);
					for(let _ of _ms.unlazy(range)(2,_ms.unlazy(infinity))){
						(yield _ms.unlazy(_43)(_ms.sub(fibonaccis,_45(_,1)),_ms.sub(fibonaccis,_45(_,2))))
					}
				});
				_ms.assert(_ms.unlazy(seq_61_63),_ms.unlazy(take_39)(fibonaccis,10),[1,1,2,3,5,8,13,21,34,55])
			};
			return _ms.set(function lazy_45streaming(stream){
				_ms.checkContains(_ms.sub(Function,Generator),stream,"stream");
				const cache=[];
				const strm=Stream(stream);
				const iter=call(function*(){
					for(let _ of strm){
						cache.push(_);
						(yield _)
					}
				});
				return Lazy_45Stream(iter,cache)
			},built)
		}();
		const name=exports.name=`Lazy-Stream`;
		exports.default=Lazy_45Stream;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9MYXp5LVN0cmVhbS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQXNCQSxvQkFBYSxVQUNLOztHQUFqQixvQkFDQztHQUdELDRCQUNNOztrQkFBSCxDQUFHLG1CQUFrQjtrQkFDckIsQ0FBRyxRQUFPOzs7OztFQUVkLGVBQVcsY0FBWTtFQUN2QixlQUFXLE1BQU0sY0FBYSxNQUFPLGNBQVksa0JBQWdCO0VBRWpFLGVBQVcsY0FBWSxjQUFhLEdBQ0M7VUFBcEMsaUJBQ2dCLElBQUE7V0FBZixTQUFRO0dBQUE7RUFBQTtFQUVWLFFBQU0sU0FBUyxrQkFDVzs7R0FBekIsc0JBQ1EsZUFBQTtrQ0FBSSxDQUFFLEVBQUUscUJBQWEsUUFDSztLQUFoQywyQkFBTyxjQUFhLE9BQ1UsV0FBQTtNQUE3QixPQUFNO2FBQ0g7TUFDSCxPQUFNO2FBQ0g7TUFDSCxPQUFNO0tBQUE7c0NBQ08sQ0FBRSx1QkFBVyxFQUFFO3NDQUNmLENBQUUsRUFBRSx1QkFBVyxFQUFFO0lBQUE7R0FBQTtrQkFFN0IsV0FBQTtVQU1pQjtZQU5oQixTQU1nQjtZQUFBOzs7RUFIdEIsUUFBTSxjQUFZO0VBQ2xCLFFBQU0sT0FBSyxjQUFjLFNBQUEsRUFDSztTQUNSO3FCQUZLO1VBQzFCLFNBQU0sT0FDZSxZQURIO2VBQ0k7S0FBckIsZUFBUyxJQUFFLEVBQUcsTUFBTTtZQUNwQixPQUFNLE9BRGMsMkJBQ1k7SUFBQTtHQUFBO0VBQUE7RUFFbEMscURBQ2U7O0dBQWQsb0JBQU07R0FDTixzQkFDUSxlQUFBO0lBQVAsaUJBQWEsT0FDVSxXQUFBO1lBQW5CO1lBQ0E7S0FDRSxRQUFBLHVCQUFNLHdCQUNVO3FDQUNmLFdBQVksSUFBRSxFQUFFLFlBQUcsV0FBWSxJQUFFLEVBQUU7S0FBQTtJQUFBO3lEQUNyQixXQUFXLElBQUksQ0FBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEdBQUcsR0FBRztHQUFBO2tCQUMzRCwwQkFBQSxPQUMwQjs4QkFEbkIsU0FBUztJQUNoQixZQUFRO0lBSVIsV0FBTyxPQUFPO0lBQ2QsV0FBTyxLQUNRLFdBQUE7S0FBVCxRQUFBLEtBQUEsS0FDSTtNQUNSLFdBQVc7YUFDUjtLQUFBO0lBQUE7V0FDTCxjQUFZLEtBQUs7R0FBQTs7RUFoRm5CLHdCQUFBO2tCQXNCQSIsImZpbGUiOiJhdC9TZXEvTGF6eS1TdHJlYW0uanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==