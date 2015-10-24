"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../compare","./../Function","./../js","./../math/Number","./../math/methods","./../Type/Kind","./../Type/Method","./../Type/Pred-Type","./at","./at-Type","./Seq/Seq"],(exports,compare_0,Function_1,js_2,Number_3,methods_4,Kind_5,Method_6,Pred_45Type_7,_64_8,_64_45Type_9,Seq_10)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(compare_0),_60_63=_ms.get(_$0,"<?"),_60_61_63=_ms.get(_$0,"<=?"),_$1=_ms.getModule(Function_1),thunk=_ms.get(_$1,"thunk"),_$2=_ms.getModule(js_2),defined_63=_ms.get(_$2,"defined?"),_$3=_ms.getModule(Number_3),neg=_ms.get(_$3,"neg"),Nat=_ms.get(_$3,"Nat"),remainder=_ms.get(_$3,"remainder"),same_45sign_63=_ms.get(_$3,"same-sign?"),sign=_ms.get(_$3,"sign"),_$4=_ms.getModule(methods_4),_43=_ms.get(_$4,"+"),_45=_ms.get(_$4,"-"),_42=_ms.get(_$4,"*"),_47=_ms.get(_$4,"/"),_$5=_ms.getModule(Kind_5),kind_33=_ms.get(_$5,"kind!"),self_45kind_33=_ms.get(_$5,"self-kind!"),_$6=_ms.getModule(Method_6),self_45impl_33=_ms.get(_$6,"self-impl!"),_$7=_ms.getModule(Pred_45Type_7),Opt=_ms.get(_$7,"Opt"),_64=_ms.getDefaultExport(_64_8),_$8=_ms.getModule(_64_8),count=_ms.get(_$8,"count"),iterator=_ms.get(_$8,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_9),_$9=_ms.getModule(_64_45Type_9),empty=_ms.get(_$9,"empty"),from_45stream=_ms.get(_$9,"from-stream"),_$10=_ms.getModule(Seq_10),_63nth=_ms.get(_$10,"?nth"),_64reverse=_ms.get(_$10,"@reverse");
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
				*[_ms.symbol(iterator)](){
					const _this=this;
					let cur=_this.start;
					for(;;){
						const break_45cond=(yield* function*(){
							if(_60_63(0,_this.step)){
								return _60_61_63(_this.end,cur)
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
					return Math.floor(_47(length(_this),_this.step))
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
			self_45kind_33(_,_64_45Type);
			self_45impl_33(empty,_,thunk(new (_)(0,0)));
			kind_33(_,_64);
			return _
		})();
		const length=exports.length=function length(_){
			_ms.checkContains(Range,_,"_");
			return _45(_.end,_.start)
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9SYW5nZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQWFBLDRCQUNZLEtBSVI7U0FESDtJQU9DLG1CQUFBLGdCQUFhO1dBMENtQjtZQXZDL0I7SUFBQTtJQUVTLFlBQUEsTUFBYSxJQUFXO3VCQUFsQjt1QkFBVzsrQkFBWSxJQUFJO3FCQUMzQyxhQUFTO3FCQUNULFdBQU87cUJBQ1AsWUFBYTtNQUFBLFFBQUE7TUFDWixHQUFBLFdBQUEsR0FDUztrQkFBQSxlQUFXLEVBQUcsSUFBRSxJQUFJO2NBQzVCO01BQUEsT0FFRztjQUFILEtBQU0sSUFBRSxJQUFJO01BQUE7S0FBQTtJQUFBO0lBRWYsYUFBQTtXQTJCaUM7S0ExQmhDLFFBMEJnQztLQXhCNUIsT0FBQTtNQUFILG1CQUNpQjtPQUFoQixHQUFBLE9BQUcsRUF1QjJCLFlBdEJwQjtlQUFULFVBc0I2QixVQXRCcEI7T0FBQSxPQUVOO2VBQUgsVUFBSSxJQW9CeUI7OztNQW5CL0IsR0FBSSxhQUNVO09BQWI7TUFBQTthQUVFO1VBQ0ksSUFBRSxJQWVzQjs7O0lBWGpDLFlBQUEsU0FBTTtXQVcyQjt1QkFYekI7S0FFUCxTQUFLLElBUzJCLFlBVGpCLElBU2lCLFdBVFQ7WUFDdkIsQ0FBRyxPQUFHLEdBUTBCLHlCQVBuQjthQUFaO0tBQUE7O0lBRUYsWUFBQTtXQUtpQztZQUpoQyxXQUFZLElBQUcsT0FJaUI7O0lBRmpDLFlBQUE7V0FFaUM7S0FEaEMsaUJBQVcsSUFDcUI7S0FBaEMsVUFBTSxVQUFXLElBQWU7WUFDekI7YUFBQTtZQUNOLEVBQ0M7ZUFBQSxLQUFJLE9BQU8sSUFIbUIsc0JBR0osSUFISSx3QkFHWTtPQUFBO3NCQUUxQyxLQUFJLE9BQU8sSUFMbUIsVUFLWixLQUxZLFlBS0E7TUFBQTtLQUFBO0lBQUE7R0FBQTtHQXJEaEMsZUFBVyxFQUFFO0dBRWIsZUFBVyxNQUFNLEVBQUcsTUFBTyxLQUFJLEdBQUUsRUFBRTtHQUNuQyxRQUFNLEVBQUU7VUFKVDtFQUFBO0VBeURELDRCQUFTLGdCQUFBO3FCQUFFO1VBRVYsSUFBRSxNQUFNIiwiZmlsZSI6ImF0L1JhbmdlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
