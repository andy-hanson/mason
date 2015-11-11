"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../compare","./../Function","./../js","./../math/Number","./../math/methods","./../private/bootstrap","./../Type/Kind","./../Type/Method","./../Type/Pred-Type","./at","./at-Type","./Seq/Seq"],(exports,compare_0,Function_1,js_2,Number_3,methods_4,bootstrap_5,Kind_6,Method_7,Pred_45Type_8,_64_9,_64_45Type_10,Seq_11)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(compare_0),_60_63=_ms.get(_$0,"<?"),_60_61_63=_ms.get(_$0,"<=?"),_62_61_63=_ms.get(_$0,">=?"),_$1=_ms.getModule(Function_1),thunk=_ms.get(_$1,"thunk"),_$2=_ms.getModule(js_2),defined_63=_ms.get(_$2,"defined?"),_$3=_ms.getModule(Number_3),neg=_ms.get(_$3,"neg"),Nat=_ms.get(_$3,"Nat"),remainder=_ms.get(_$3,"remainder"),same_45sign_63=_ms.get(_$3,"same-sign?"),sign=_ms.get(_$3,"sign"),_$4=_ms.getModule(methods_4),_43=_ms.get(_$4,"+"),_45=_ms.get(_$4,"-"),_42=_ms.get(_$4,"*"),_47=_ms.get(_$4,"/"),_$5=_ms.getModule(bootstrap_5),msDef=_ms.get(_$5,"msDef"),_$6=_ms.getModule(Kind_6),self_45kind_33=_ms.get(_$6,"self-kind!"),_$7=_ms.getModule(Method_7),self_45impl_33=_ms.get(_$7,"self-impl!"),_$8=_ms.getModule(Pred_45Type_8),Opt=_ms.get(_$8,"Opt"),_64=_ms.getDefaultExport(_64_9),_$9=_ms.getModule(_64_9),count=_ms.get(_$9,"count"),iterator=_ms.get(_$9,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_10),_$10=_ms.getModule(_64_45Type_10),empty=_ms.get(_$10,"empty"),from_45stream=_ms.get(_$10,"from-stream"),_$11=_ms.getModule(Seq_11),_63nth=_ms.get(_$11,"?nth"),_64reverse=_ms.get(_$11,"@reverse");
		const Range=exports.default=(()=>{
			const _=class Range{
				static [_ms.symbol(from_45stream)](_){
					const _this=this;
					return _
				}
				constructor(start,end,step){
					_ms.checkContains(Number,start,"start");
					_ms.checkContains(Number,end,"end");
					_ms.checkContains(_ms.sub(Opt,Number),step,"step");
					_ms.newProperty(this,"start",start);
					_ms.newProperty(this,"end",end);
					_ms.newProperty(this,"step",(()=>{
						const _=step;
						if(defined_63(_)){
							_ms.assert(same_45sign_63,_,_45(end,start));
							return _
						} else {
							return sign(_45(end,start))
						}
					})())
				}
				by(step){
					const _this=this;
					return new (Range)(_this.start,_this.end,step)
				}
				length(){
					const _this=this;
					return _45(_this.end,_this.start)
				}
				*[_ms.symbol(iterator)](){
					const _this=this;
					let cur=_this.start;
					for(;;){
						const break_45cond=(yield* function*(){
							if(_60_63(0,_this.step)){
								return _62_61_63(cur,_this.end)
							} else {
								return _60_61_63(cur,_this.end)
							}
						}());
						if(break_45cond){
							break
						};
						(yield cur);
						cur=_43(cur,_this.step)
					}
				}
				[_ms.symbol(_63nth)](n){
					const _this=this;
					_ms.checkContains(Nat,n,"n");
					const it=_43(_this.start,_42(_this.step,n));
					return (_60_63(it,_this.end)?_ms.some((()=>{
						return it
					})()):_ms.None)
				}
				[_ms.symbol(count)](){
					const _this=this;
					return Math.floor(_47(_this.length(),_this.step))
				}
				[_ms.symbol(_64reverse)](){
					const _this=this;
					const new_45step=neg(_this.step);
					const rem=remainder(_45(_this.end,_this.start),_this.step);
					return (()=>{
						switch(rem){
							case 0:{
								return new (Range)(_45(_this.end,_this.step),_45(_this.start,_this.step),new_45step)
							}
							default:return new (Range)(_45(_this.end,rem),_this.start,new_45step)
						}
					})()
				}
			};
			_ms.kindDo(_,_64);
			self_45kind_33(_,_64_45Type);
			self_45impl_33(empty,_,thunk(new (_)(0,0)));
			return _
		})();
		msDef("range",(start,end,exclusive_63)=>{
			if(! exclusive_63){
				end=_43(end,sign(_45(end,start)))
			};
			return new (Range)(start,end)
		});
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9SYW5nZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQWNBLDRCQUFhLEtBS1Y7O3VCQUtELGdCQUFhO1dBZ0RtQjtZQTdDL0I7SUFBQTtJQUVRLFlBQUEsTUFBYSxJQUFXO3VCQUFsQjt1QkFBVzsrQkFBWSxJQUFJO3FCQUMxQyxhQUFTO3FCQUNULFdBQU87cUJBQ1AsWUFBYTtNQUFBLFFBQUE7TUFDWixHQUFBLFdBQUEsR0FDUztrQkFBRCxlQUFXLEVBQUcsSUFBRSxJQUFJO2NBQzNCO01BQUEsT0FFRztjQUFILEtBQU0sSUFBRSxJQUFJO01BQUE7S0FBQTtJQUFBO09BRVY7V0FpQzRCO1lBaENoQyxLQUFJLE9BZ0M0QixzQkFoQ1Y7SUFBQTs7V0FnQ1U7WUE3QmhDLElBNkJnQzs7aUJBM0JqQztXQTJCaUM7S0ExQmhDLFFBMEJnQztLQXhCN0IsT0FBQTtNQUFGLG1CQUNpQjtPQUFoQixHQUFBLE9BQUcsRUF1QjJCLFlBdEJwQjtlQUFULFVBQUksSUFzQnlCO2NBcEIxQjtlQUFILFVBQUksSUFvQnlCOzs7TUFuQjVCLEdBQUEsYUFDVTtPQUFaO01BQUE7YUFFRTtVQUNJLElBQUUsSUFlc0I7OztnQkFYakMsU0FBTTtXQVcyQjt1QkFYekI7S0FFUCxTQUFLLElBUzJCLFlBVGpCLElBU2lCLFdBVFQ7WUFDcEIsQ0FBQSxPQUFHLEdBUTBCLHlCQVBuQjthQUFaO0tBQUE7O2dCQUVGO1dBS2lDO1lBSmhDLFdBQVksSUFJb0I7O2dCQUZqQztXQUVpQztLQURoQyxpQkFBVyxJQUNxQjtLQUFoQyxVQUFNLFVBQVcsSUFBZTtZQUN6QjthQUFBO1lBQ04sRUFDQztlQUFBLEtBQUksT0FBTyxJQUhtQixzQkFHSixJQUhJLHdCQUdZO09BQUE7c0JBRTFDLEtBQUksT0FBTyxJQUxtQixVQUtaLEtBTFksWUFLQTtNQUFBO0tBQUE7SUFBQTtHQUFBO2dCQS9EaEI7R0FLaEIsZUFBVyxFQUFFO0dBRWIsZUFBVyxNQUFNLEVBQUcsTUFBTyxLQUFJLEdBQUUsRUFBRTs7O0VBMERyQyxNQUFPLFFBQU8sQ0FBQSxNQUFNLElBQUk7R0FDaEIsS0FBQSxhQUNVO1FBQVQsSUFBRSxJQUFLLEtBQU0sSUFBRSxJQUFJO0dBQUE7VUFDM0IsS0FBSSxPQUFNLE1BQU07RUFBQSIsImZpbGUiOiJhdC9SYW5nZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
