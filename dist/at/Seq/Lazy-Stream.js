"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Function","../../math/Number","../../math/methods","../../Type/Kind","../../Type/Method","../at","../at-Type","../q","./Seq","./Stream","../../math/methods","../../math/Number","../Range","./Seq","../../compare","../../control"],(exports,Function_0,Number_1,methods_2,Kind_3,Method_4,_64_5,_64_45Type_6,_63_7,Seq_8,Stream_9,methods_10,Number_11,Range_12,Seq_13,compare_14,control_15)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(Function_0),call=_ms.get(_$2,"call"),thunk=_ms.get(_$2,"thunk"),_$3=_ms.getModule(Number_1),Nat=_ms.get(_$3,"Nat"),_$4=_ms.getModule(methods_2),_45=_ms.get(_$4,"-"),_$5=_ms.getModule(Kind_3),kind_33=_ms.get(_$5,"kind!"),self_45kind_33=_ms.get(_$5,"self-kind!"),_$6=_ms.getModule(Method_4),impl_33=_ms.get(_$6,"impl!"),self_45impl_33=_ms.get(_$6,"self-impl!"),_$7=_ms.getModule(_64_5),count=_ms.get(_$7,"count"),iterator=_ms.get(_$7,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_6),_$8=_ms.getModule(_64_45Type_6),empty=_ms.get(_$8,"empty"),from_45stream=_ms.get(_$8,"from-stream"),_$9=_ms.getModule(_63_7),Some=_ms.get(_$9,"Some"),Seq=_ms.getDefaultExport(Seq_8),_$10=_ms.getModule(Seq_8),_63nth=_ms.get(_$10,"?nth"),Stream=_ms.getDefaultExport(Stream_9),_$13=_ms.lazyGetModule(methods_10),_43=_ms.lazyProp(_$13,"+"),_$14=_ms.lazyGetModule(Number_11),infinity=_ms.lazyProp(_$14,"infinity"),Range=_ms.lazy(()=>{
			return _ms.getDefaultExport(Range_12)
		}),_$16=_ms.lazyGetModule(Seq_13),seq_61_63=_ms.lazyProp(_$16,"seq=?"),take_39=_ms.lazyProp(_$16,"take'"),_$18=_ms.lazyGetModule(compare_14),_61_63=_ms.lazyProp(_$18,"=?"),_$19=_ms.lazyGetModule(control_15),build=_ms.lazyProp(_$19,"build");
		const Lazy_45Stream=(()=>{
			const _=class Lazy_45Stream{
				static [_ms.symbol(from_45stream)](_){
					const _this=this;
					return new (_this)(()=>{
						return iterator(_)
					})
				}
				constructor(stream){
					_ms.checkContains(Function,stream,"stream");
					_ms.newProperty(this,"cache",[]);
					const strm=new (Stream)(stream);
					const self=this;
					_ms.newProperty(this,"caching-iterator",call(function*(){
						for(let _ of strm){
							self.cache.push(_);
							(yield _)
						}
					}))
				}
				[_ms.symbol(_63nth)](n){
					const _this=this;
					_ms.checkContains(Nat,n,"n");
					return (()=>{
						const _=_63nth(_this.cache,n);
						if(_ms.contains(Some,_)){
							return _
						} else {
							const n_45left=_45(n,count(_this.cache));
							return _63nth(Stream(_this["caching-iterator"]),n_45left)
						}
					})()
				}
			};
			self_45kind_33(_,_64_45Type);
			self_45impl_33(empty,_,thunk(new (_)(function*(){})));
			kind_33(_,Seq);
			return _
		})();
		_ms.newProperty(Lazy_45Stream,"test",()=>{
			const fibonaccis=new (Lazy_45Stream)(function*(){
				(yield 1);
				(yield 1);
				for(let _ of new (_ms.unlazy(Range))(2,_ms.unlazy(infinity))){
					(yield _ms.unlazy(_43)(_ms.sub(fibonaccis,_45(_,1)),_ms.sub(fibonaccis,_45(_,2))))
				}
			});
			_ms.assert(_ms.unlazy(seq_61_63),_ms.unlazy(take_39)(fibonaccis,10),[1,1,2,3,5,8,13,21,34,55])
		});
		impl_33(iterator,Lazy_45Stream,(()=>{
			const built={};
			const test=built.test=function test(){
				_ms.assert(_ms.unlazy(_61_63),[1,2],_ms.unlazy(build)(_yield=>{
					const _=new (Lazy_45Stream)(function*(){
						_yield(1);
						(yield 1);
						_yield(2);
						(yield 2);
						_yield(3)
					});
					_ms.assert(_ms.unlazy(seq_61_63),[1],_ms.unlazy(take_39)(_,1));
					_ms.assert(_ms.unlazy(seq_61_63),[1,2],_ms.unlazy(take_39)(_,2))
				}))
			};
			return _ms.set(function*(){
				const _this=this;
				(yield* iterator(_this.cache));
				(yield* _this["caching-iterator"])
			},built)
		})());
		const name=exports.name=`Lazy-Stream`;
		exports.default=Lazy_45Stream;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9MYXp5LVN0cmVhbS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBb0JBLG9CQUNrQixLQUNkO1NBREg7dUJBUUMsZ0JBQWEsRUFDQztXQXlEVjtZQXpESCxLQXlERyxPQXhETyxJQUFBO2FBQVQsU0FBUTtLQUFBO0lBQUE7Z0JBUUEsT0FDNkI7dUJBRHRCO3FCQUNqQixhQUFTO0tBSVQsV0FBTyxLQUFJLFFBQU87S0FDbEIsV0FBTztxQkFDUCx3QkFBb0IsS0FDUSxXQUFBO01BQXRCLFFBQUEsS0FBQSxLQUNJO09BQ1IsZ0JBQWdCO2NBQ2I7TUFBQTtLQUFBO0lBQUE7Z0JBRU4sU0FBTSxFQUNLO1dBa0NOO3VCQW5DRztZQUVGO01BQUEsUUFBQSxPQWlDRCxZQWpDYTtNQUNoQixnQkFBQyxLQUFELEdBQ0s7Y0FBSjtNQUFBLE9BRUc7T0FBSCxlQUFTLElBQUUsRUFBRyxNQTZCWjtjQTVCRixPQUFNLE9BNEJKLDJCQTVCOEI7TUFBQTtLQUFBO0lBQUE7R0FBQTtHQXJDbEMsZUFBVyxFQUFFO0dBRWIsZUFBVyxNQUFNLEVBQUcsTUFBTyxLQUFJLEdBQ0ssV0FBQTtHQUNwQyxRQUFNLEVBQUU7VUFMVDtFQUFBO2tCQTBDRCxxQkFDcUIsSUFBQTtHQUFwQixpQkFBYSxLQUFJLGVBQ2UsV0FBQTtXQUE1QjtXQUNBO0lBQ0UsUUFBQSxLQUFBLHdCQUFVLHdCQUNVO29DQUNuQixXQUFZLElBQUUsRUFBRSxZQUFJLFdBQVksSUFBRSxFQUFFO0lBQUE7R0FBQTt3REFDdEIsV0FBVyxJQUFJLENBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxHQUFHLEdBQUc7RUFBQTtFQUk1RCxRQUFNLFNBQVMsY0FDVyxLQUFBOztHQUF6QixzQkFDUSxlQUFBO2tDQUFJLENBQUUsRUFBRSxxQkFBYSxRQUNLO0tBQWhDLFFBQUksS0FBSSxlQUNlLFdBQUE7TUFBdEIsT0FBTTthQUNIO01BQ0gsT0FBTTthQUNIO01BQ0gsT0FBTTtLQUFBO3NDQUNPLENBQUUsdUJBQVcsRUFBRTtzQ0FDZixDQUFFLEVBQUUsdUJBQVcsRUFBRTtJQUFBO0dBQUE7a0JBRTdCLFdBQUE7VUFDQztZQURBLFNBQ0E7WUFBQTs7O0VBdkZOLHdCQUFBO2tCQW9CQSIsImZpbGUiOiJhdC9TZXEvTGF6eS1TdHJlYW0uanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==