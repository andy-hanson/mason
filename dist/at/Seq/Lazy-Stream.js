"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Function","../../math/Number","../../math/methods","../../Type/Kind","../../Type/Method","../at","../at-Type","../q","./Seq","./Stream","../../math/methods","../Range","./Seq","../../compare","../../control"],(exports,Function_0,Number_1,methods_2,Kind_3,Method_4,_64_5,_64_45Type_6,_63_7,Seq_8,Stream_9,methods_10,Range_11,Seq_12,compare_13,control_14)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(Function_0),call=_ms.get(_$2,"call"),thunk=_ms.get(_$2,"thunk"),_$3=_ms.getModule(Number_1),Nat=_ms.get(_$3,"Nat"),_$4=_ms.getModule(methods_2),_45=_ms.get(_$4,"-"),_$5=_ms.getModule(Kind_3),kind_33=_ms.get(_$5,"kind!"),self_45kind_33=_ms.get(_$5,"self-kind!"),_$6=_ms.getModule(Method_4),impl_33=_ms.get(_$6,"impl!"),self_45impl_33=_ms.get(_$6,"self-impl!"),_$7=_ms.getModule(_64_5),count=_ms.get(_$7,"count"),iterator=_ms.get(_$7,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_6),_$8=_ms.getModule(_64_45Type_6),empty=_ms.get(_$8,"empty"),from_45stream=_ms.get(_$8,"from-stream"),_$9=_ms.getModule(_63_7),Some=_ms.get(_$9,"Some"),Seq=_ms.getDefaultExport(Seq_8),_$10=_ms.getModule(Seq_8),_63nth=_ms.get(_$10,"?nth"),Stream=_ms.getDefaultExport(Stream_9),_$13=_ms.lazyGetModule(methods_10),_43=_ms.lazyProp(_$13,"+"),Range=_ms.lazy(()=>_ms.getDefaultExport(Range_11)),_$15=_ms.lazyGetModule(Seq_12),seq_61_63=_ms.lazyProp(_$15,"seq=?"),take_39=_ms.lazyProp(_$15,"take'"),_$17=_ms.lazyGetModule(compare_13),_61_63=_ms.lazyProp(_$17,"=?"),_$18=_ms.lazyGetModule(control_14),build=_ms.lazyProp(_$18,"build");
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
				for(let _ of new (_ms.unlazy(Range))(2,Number.POSITIVE_INFINITY)){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvQC9TZXEvTGF6eS1TdHJlYW0ubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFtQkEsb0JBQ2tCLEtBQ2Q7U0FESDt1QkFRQyxnQkFBYSxFQUNDO1dBeURWO1lBekRILEtBeURHLE9BeERPLElBQUE7YUFBVCxTQUFBO0tBQUE7SUFBQTtnQkFRUSxPQUM2Qjt1QkFEdEI7cUJBQ2pCLGFBQVM7S0FJVCxXQUFPLEtBQUksUUFBTztLQUNsQixXQUFPO3FCQUNQLHdCQUFvQixLQUNRLFdBQUE7TUFBdEIsUUFBQSxLQUFBLEtBQ0k7T0FDUixnQkFBZ0I7Y0FDYjtNQUFBO0tBQUE7SUFBQTtnQkFFTixTQUFNLEVBQ0s7V0FrQ047dUJBbkNHO1lBRUY7TUFBQSxRQUFBLE9BaUNELFlBakNhO01BQ2hCLGdCQUFDLEtBQUQsR0FDSztjQUFKO01BQUEsT0FFRztPQUFILGVBQVMsSUFBRSxFQUFHLE1BNkJaO2NBNUJGLE9BQU0sT0E0QkosMkJBNUI4QjtNQUFBO0tBQUE7SUFBQTtHQUFBO0dBckNsQyxlQUFXLEVBQUU7R0FFYixlQUFXLE1BQU0sRUFBRyxNQUFPLEtBQUksR0FDSyxXQUFBO0dBQ3BDLFFBQU0sRUFBRTtVQUxUO0VBQUE7a0JBMENELHFCQUNxQixJQUFBO0dBQXBCLGlCQUFhLEtBQUksZUFDZSxXQUFBO1dBQTVCO1dBQ0E7SUFDRSxRQUFBLEtBQUEsd0JBQVUsRUFBRSwwQkFDd0I7b0NBQ25DLFdBQVksSUFBRSxFQUFFLFlBQUksV0FBWSxJQUFFLEVBQUU7SUFBQTtHQUFBO3dEQUN0QixXQUFXLElBQUksQ0FBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFHLEdBQUcsR0FBRztFQUFBO0VBSTVELFFBQU0sU0FBUyxjQUNXLEtBQUE7O0dBQXpCLHNCQUNRLGVBQUE7a0NBQUksQ0FBRSxFQUFFLHFCQUFhLFFBQ0s7S0FBaEMsUUFBSSxLQUFJLGVBQ2UsV0FBQTtNQUF0QixPQUFNO2FBQ0g7TUFDSCxPQUFNO2FBQ0g7TUFDSCxPQUFNO0tBQUE7c0NBQ08sQ0FBRSx1QkFBVyxFQUFFO3NDQUNmLENBQUUsRUFBRSx1QkFBVyxFQUFFO0lBQUE7R0FBQTtrQkFFN0IsV0FBQTtVQUNDO1lBREEsU0FDQTtZQUFBOzs7RUF0Rk4sd0JBQUE7a0JBbUJBIiwiZmlsZSI6ImF0L1NlcS9MYXp5LVN0cmVhbS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9