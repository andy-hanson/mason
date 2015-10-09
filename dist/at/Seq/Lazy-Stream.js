"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Function","../../math/Number","../../math/methods","../../Type/Kind","../../Type/Method","../at","../at-Type","../q","./Seq","./Stream"],(exports,Function_0,Number_1,methods_2,Kind_3,Method_4,_64_5,_64_45Type_6,_63_7,Seq_8,Stream_9)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(Function_0),call=_ms.get(_$0,"call"),thunk=_ms.get(_$0,"thunk"),_$1=_ms.getModule(Number_1),Nat=_ms.get(_$1,"Nat"),_$2=_ms.getModule(methods_2),_45=_ms.get(_$2,"-"),_$3=_ms.getModule(Kind_3),kind_33=_ms.get(_$3,"kind!"),self_45kind_33=_ms.get(_$3,"self-kind!"),_$4=_ms.getModule(Method_4),impl_33=_ms.get(_$4,"impl!"),self_45impl_33=_ms.get(_$4,"self-impl!"),_$5=_ms.getModule(_64_5),count=_ms.get(_$5,"count"),iterator=_ms.get(_$5,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_6),_$6=_ms.getModule(_64_45Type_6),empty=_ms.get(_$6,"empty"),from_45stream=_ms.get(_$6,"from-stream"),_$7=_ms.getModule(_63_7),Some=_ms.get(_$7,"Some"),Seq=_ms.getDefaultExport(Seq_8),_$8=_ms.getModule(Seq_8),_63nth=_ms.get(_$8,"?nth"),Stream=_ms.getDefaultExport(Stream_9);
		const Lazy_45Stream=exports.default=(()=>{
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
		impl_33(iterator,Lazy_45Stream,function*(){
			const _this=this;
			(yield* iterator(_this.cache));
			(yield* _this["caching-iterator"])
		});
		const name=exports.name=`Lazy-Stream`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9TZXEvTGF6eS1TdHJlYW0ubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFZQSxvQ0FDa0IsS0FLZDtTQURIO0lBUUMsbUJBQUEsZ0JBQWEsRUFDQztXQTZCWDtZQTdCRixLQTZCRSxPQTVCUSxJQUFBO2FBQVQsU0FBQTtLQUFBO0lBQUE7SUFFUSxZQUFBLE9BQ2U7dUJBRFI7cUJBRWpCLGFBQVM7S0FJVCxXQUFPLEtBQUksUUFBTztLQUNsQixXQUFPO3FCQUNQLHdCQUFvQixLQUNRLFdBQUE7TUFBdEIsUUFBQSxLQUFBLEtBQ0k7T0FDUixnQkFBZ0I7Y0FDYjtNQUFBO0tBQUE7SUFBQTtJQUVOLFlBQUEsU0FBTSxFQUNLO1dBV1A7dUJBWkk7WUFFRjtNQUFBLFFBQUEsT0FVRixZQVZjO01BQ2hCLGdCQUFDLEtBQUQsR0FDSztjQUFKO01BQUEsT0FFRztPQUFILGVBQVMsSUFBRSxFQUFHLE1BTWI7Y0FMRCxPQUFNLE9BS0wsMkJBTCtCO01BQUE7S0FBQTtJQUFBO0dBQUE7R0FoQ2xDLGVBQVcsRUFBRTtHQUViLGVBQVcsTUFBTSxFQUFHLE1BQU8sS0FBSSxHQUNLLFdBQUE7R0FDcEMsUUFBTSxFQUFFO1VBTFQ7RUFBQTtFQW9DRCxRQUFNLFNBQVMsY0FDZ0IsV0FBQTtTQUMxQjtXQURBLFNBQ0E7V0FBQTs7RUF2REwsd0JBQUEiLCJmaWxlIjoiYXQvU2VxL0xhenktU3RyZWFtLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
