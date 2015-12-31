"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../compare","./../math/Number","./../math/methods","./../private/bootstrap","./../Type/primitive","./at","./Seq/Seq"],(exports,compare_0,Number_1,methods_2,bootstrap_3,primitive_4,_64_5,Seq_6)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(compare_0),_60_63=_ms.get(_$0,"<?"),_60_61_63=_ms.get(_$0,"<=?"),_62_61_63=_ms.get(_$0,">=?"),_$1=_ms.getModule(Number_1),Nat=_ms.get(_$1,"Nat"),remainder=_ms.get(_$1,"remainder"),_$2=_ms.getModule(methods_2),_43=_ms.get(_$2,"+"),_45=_ms.get(_$2,"-"),_42=_ms.get(_$2,"*"),_47=_ms.get(_$2,"/"),_$3=_ms.getModule(bootstrap_3),msDef=_ms.get(_$3,"msDef"),_$4=_ms.getModule(primitive_4),Num=_ms.get(_$4,"Num"),_64=_ms.getDefaultExport(_64_5),_$5=_ms.getModule(_64_5),count=_ms.get(_$5,"count"),empty=_ms.get(_$5,"empty"),from_45stream=_ms.get(_$5,"from-stream"),iterator=_ms.get(_$5,"iterator"),_$6=_ms.getModule(Seq_6),_63nth=_ms.get(_$6,"?nth"),_64reverse=_ms.get(_$6,"@reverse");
		let Range=exports.default=(()=>{
			let _=class Range{
				static [_ms.symbol(empty)](){
					let _this=this;
					return _ms.range(0,0,true)
				}
				static [_ms.symbol(from_45stream)](_){
					let _this=this;
					return _
				}
				constructor(start,end,step){
					this.start=_ms.checkInstance(Num,start,"start");
					this.end=_ms.checkInstance(Num,end,"end");
					this.step=_ms.checkInstance(Num,step,"step");
					Object.freeze(this)
				}
				by(step){
					let _this=this;
					return new (Range)(_this.start,_this.end,step)
				}
				get length(){
					let _this=this;
					return _45(_this.end,_this.start)
				}
				*[_ms.symbol(iterator)](){
					let _this=this;
					let cur=_this.start;
					for(;;){
						let break_45cond=(yield* function*(){
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
					let _this=this;
					_ms.checkInstance(Nat,n,"n");
					let it=_43(_this.start,_42(_this.step,n));
					return (_60_63(it,_this.end)?_ms.some((()=>{
						return it
					})()):_ms.None)
				}
				[_ms.symbol(count)](){
					let _this=this;
					return Math.floor(_47(_this.length,_this.step))
				}
				[_ms.symbol(_64reverse)](){
					let _this=this;
					let new_45step=_42(- 1,_this.step);
					let rem=remainder(_45(_this.end,_this.start),_this.step);
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
			_ms.beRecord(_,["start","end","step"]);
			_ms.traitDo(_,_64);
			return _
		})();
		msDef("range",(start,end,exclusive_63)=>{
			if(! exclusive_63){
				end=_43(end,Math.sign(_45(end,start)))
			};
			let step=Math.sign(_45(end,start));
			return new (Range)(start,end,step)
		});
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9SYW5nZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVNBLDBCQUFhOzt1QkFLWCxTQUNPO1NBMEN5QjtzQkExQy9CLEVBQUk7O3VCQUVMLGdCQUFjLEVBQ0E7U0F1Q2tCO1lBcEM5QjtJQUFBOztrQ0FaZTtnQ0FBUTtpQ0FBUzs7O09BZTlCLEtBQ0k7U0FnQ3dCO1lBaENoQyxLQUFJLE9BZ0M0QixzQkFoQ1Y7SUFBQTtnQkFHWjtTQTZCc0I7WUE3QmhDLElBNkJnQzs7aUJBM0JqQyxZQUNZO1NBMEJxQjtLQTFCaEMsUUEwQmdDO0tBeEI3QixPQUFBO01BQUYsaUJBQ2lCO09BQWhCLEdBQUEsT0FBRyxFQXVCMkIsWUF0QnBCO2VBQVQsVUFBSSxJQXNCeUI7Y0FwQjFCO2VBQUgsVUFBSSxJQW9CeUI7OztNQW5CNUIsR0FBQSxhQUNVO09BQVo7TUFBQTthQUVLO1VBQ0MsSUFBRSxJQWVzQjs7O2dCQVhqQyxTQUFNLEVBQ0s7U0FVc0I7dUJBWHpCO0tBRVAsT0FBSyxJQVMyQixZQVRqQixJQVNpQixXQVRUO1lBQ3BCLENBQUEsT0FBRyxHQVEwQix5QkFQbkI7YUFBWjtLQUFBOztnQkFFRixTQUNPO1NBSTBCO1lBSmhDLFdBQVksSUFJb0I7O2dCQUZqQyxjQUNVO1NBQ3VCO0tBRGhDLGVBQVcsSUFBRSxJQUNtQjtLQUFoQyxRQUFNLFVBQVcsSUFBZTtZQUN6QjthQUFBO1lBQ04sRUFDQztlQUFBLEtBQUksT0FBTyxJQUhtQixzQkFHSixJQUhJLHdCQUdZO09BQUE7c0JBRTFDLEtBQUksT0FBTyxJQUxtQixVQUtaLEtBTFksWUFLQTtNQUFBO0tBQUE7SUFBQTtHQUFBOztpQkFyRFk7OztFQXVEOUMsTUFBTyxRQUFPLENBQUEsTUFBTSxJQUFJLGVBQ1U7R0FBMUIsS0FBQSxhQUNVO1FBQVQsSUFBRSxJQUFLLFVBQVcsSUFBRSxJQUFJO0dBQUE7R0FDaEMsU0FBTyxVQUFXLElBQUUsSUFBSTtVQUN4QixLQUFJLE9BQU0sTUFBTSxJQUFJO0VBQUEiLCJmaWxlIjoiYXQvUmFuZ2UuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
