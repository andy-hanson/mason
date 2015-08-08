"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../math/Number","../../math/methods","../../methods","../../Type/Kind","../../Type/Pred-Type","../at","../at-Type","../q","../Range","./Seq"],(exports,compare_0,Number_1,methods_2,methods_3,Kind_4,Pred_45Type_5,_64_6,_64_45Type_7,_63_8,Range_9,Seq_10)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_60_63=_ms.get(_$2,"<?"),_$3=_ms.getModule(Number_1),modulo=_ms.get(_$3,"modulo"),Nat=_ms.get(_$3,"Nat"),_$4=_ms.getModule(methods_2),_43=_ms.get(_$4,"+"),_45=_ms.get(_$4,"-"),_42=_ms.get(_$4,"*"),_$5=_ms.getModule(methods_3),sub=_ms.get(_$5,"sub"),_$6=_ms.getModule(Kind_4),kind_33=_ms.get(_$6,"kind!"),self_45kind_33=_ms.get(_$6,"self-kind!"),_$7=_ms.getModule(Pred_45Type_5),Any=_ms.get(_$7,"Any"),_64=_ms.getDefaultExport(_64_6),_$8=_ms.getModule(_64_6),_43_43_39=_ms.get(_$8,"++'"),count=_ms.get(_$8,"count"),empty_33=_ms.get(_$8,"empty!"),empty_63=_ms.get(_$8,"empty?"),iterator=_ms.get(_$8,"iterator"),map=_ms.get(_$8,"map"),_64_45Type=_ms.getDefaultExport(_64_45Type_7),_$9=_ms.getModule(_64_45Type_7),empty=_ms.get(_$9,"empty"),_$10=_ms.getModule(_63_8),un_45_63=_ms.get(_$10,"un-?"),Range=_ms.getDefaultExport(Range_9),Seq=_ms.getDefaultExport(Seq_10),_$12=_ms.getModule(Seq_10),_60_43_43_33=_ms.get(_$12,"<++!"),_43_43_62_33=_ms.get(_$12,"++>!"),_63nth=_ms.get(_$12,"?nth"),_63_60pop_33=_ms.get(_$12,"?<pop!"),_63pop_62_33=_ms.get(_$12,"?pop>!"),reverse=_ms.get(_$12,"reverse"),set_45nth_33=_ms.get(_$12,"set-nth!");
		const Deque=(()=>{
			const _=class Deque{
				static [_ms.symbol(empty)](){
					const _this=this;
					return new (_this)()
				}
				constructor(){
					_ms.newMutableProperty(this,"data!",Array(8));
					_ms.newMutableProperty(this,"start-index!",0);
					_ms.newMutableProperty(this,"end-index!",0)
				}
				*[_ms.symbol(iterator)](){
					const _this=this;
					const indices=(yield* function*(){
						if(_60_63(_this["end-index!"],_this["start-index!"])){
							return _43_43_39(new (Range)(_this["start-index!"],count(_this["data!"])),new (Range)(0,_this["end-index!"]))
						} else {
							return new (Range)(_this["start-index!"],_this["end-index!"])
						}
					}());
					for(let _ of indices){
						(yield _ms.sub(_this["data!"],_))
					}
				}
				[_ms.symbol(_60_43_43_33)](ems){
					const _this=this;
					_ms.checkContains(_64,ems,"ems");
					for(let em of reverse(ems)){
						const new_45start=prev_45index(_this,_this["start-index!"]);
						if(_61_63(new_45start,_this["end-index!"])){
							expand_33(_this);
							_60_43_43_33(_this,[em])
						} else {
							_this["start-index!"]=new_45start;
							set_45nth_33(_this["data!"],_this["start-index!"],em)
						}
					}
				}
				[_ms.symbol(_43_43_62_33)](ems){
					const _this=this;
					_ms.checkContains(_64,ems,"ems");
					for(let em of ems){
						const new_45end=next_45index(_this,_this["end-index!"]);
						if(_61_63(new_45end,_this["start-index!"])){
							expand_33(_this);
							_43_43_62_33(_this,[em])
						} else {
							set_45nth_33(_this["data!"],_this["end-index!"],em);
							_this["end-index!"]=new_45end
						}
					}
				}
				[_ms.symbol(_63_60pop_33)](){
					const _this=this;
					return empty_63(_this)?_ms.None:_ms.some((()=>{
						return (_=>{
							_this["start-index!"]=next_45index(_this,_this["start-index!"]);
							return _
						})(_ms.sub(_this["data!"],_this["start-index!"]))
					})())
				}
				[_ms.symbol(_63pop_62_33)](){
					const _this=this;
					return empty_63(_this)?_ms.None:_ms.some((()=>{
						const new_45end=prev_45index(_this,_this["end-index!"]);
						_this["end-index!"]=new_45end;
						return _ms.sub(_this["data!"],new_45end)
					})())
				}
				[_ms.symbol(_63nth)](index){
					const _this=this;
					_ms.checkContains(Nat,index,"index");
					return map(_63data_45index(_this,index),_ms.sub(sub,_this["data!"]))
				}
				[_ms.symbol(set_45nth_33)](index,set_45to){
					const _this=this;
					_ms.checkContains(Nat,index,"index");
					_ms.checkContains(Any,set_45to,"set-to");
					const data_45index=un_45_63(_63data_45index(_this,index),_ms.lazy(()=>{
						return `Can't set at index ${index}; count is ${count(_this)}`
					}));
					set_45nth_33(_this["data!"],data_45index,set_45to)
				}
				[_ms.symbol(empty_33)](){
					const _this=this;
					empty_33(_this["data!"]);
					_this["start-index!"]=0;
					_this["end-index!"]=0
				}
			};
			self_45kind_33(_,_64_45Type);
			kind_33(_,Seq);
			return _
		})();
		const capacity=function capacity(_){
			return count(_["data!"])
		};
		const expand_33=function expand_33(_){
			const old_45data=_["data!"];
			const old_45capacity=capacity(_);
			const new_45capacity=_42(2,old_45capacity);
			const new_45data=Array(new_45capacity);
			for(let index of new (Range)(0,old_45capacity)){
				set_45nth_33(new_45data,index,_ms.sub(old_45data,index))
			};
			_["data!"]=new_45data
		};
		const wrap_45index=function wrap_45index(_,index){
			return modulo(index,capacity(_))
		};
		const next_45index=function next_45index(_,index){
			_ms.checkContains(Nat,index,"index");
			return wrap_45index(_,_43(index,1))
		};
		const prev_45index=function prev_45index(_,index){
			_ms.checkContains(Nat,index,"index");
			return wrap_45index(_,_45(index,1))
		};
		const _63data_45index=function _63data_45index(_,index){
			_ms.checkContains(Nat,index,"index");
			const a=_43(_["start-index!"],index);
			return (()=>{
				if(_60_63(a,capacity(_))){
					return (_60_63(_["end-index!"],_["start-index!"])||_60_63(a,_["end-index!"]))?_ms.some((()=>{
						return a
					})()):_ms.None
				} else {
					const b=wrap_45index(_,a);
					return (_60_63(_["end-index!"],_["start-index!"])&&_60_63(b,_["end-index!"]))?_ms.some((()=>{
						return b
					})()):_ms.None
				}
			})()
		};
		const name=exports.name=`Deque`;
		exports.default=Deque;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9EZXF1ZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQWFBLFlBQ1ksS0FDUjtTQURIO3VCQU1DLFNBQ087V0FpRVA7WUFqRUMsS0FpRUQ7SUFBQTtpQkE5RFM7NEJBQVQsYUFBVyxNQUFNOzRCQUNqQixvQkFBa0I7NEJBQ2xCLGtCQUFnQjtJQUFBO2lCQUlqQixZQUNZO1dBdURYO0tBdkRBLGNBQ2M7TUFBYixHQUFBLE9Bc0RELDJDQXJENkI7Y0FBM0IsVUFBSyxLQUFJLE9BcURYLHNCQXJEZ0MsTUFxRGhDLGlCQXJEZ0QsS0FBSSxPQUFNLEVBcUQxRDthQW5ESztjQUFILEtBQUksT0FtRE47OztLQWxESyxRQUFBLEtBQUEsUUFDTztxQkFpRFosZUFqRFc7S0FBQTtJQUFBO2dCQUVaLGVBQU8sSUFDSztXQThDWDt1QkEvQ1U7S0FDTCxRQUFBLE1BQU0sUUFBUSxLQUNHO01BQXJCLGtCQUFZLGFBNkNiO01BM0NNLEdBQUosT0FBRyxZQTJDTCxxQkExQzBCO09BQXZCLFVBMENIO09BekNHLGFBeUNILE1BekNhLENBQUU7TUFBQSxPQUVUO09BdUNOLHNCQXZDb0I7T0FDakIsYUFzQ0gscUNBdENpQztNQUFBO0tBQUE7SUFBQTtnQkFJbEMsZUFBTyxJQUNLO1dBaUNYO3VCQWxDVTtLQUNMLFFBQUEsTUFBTSxJQUNHO01BQWIsZ0JBQVUsYUFnQ1g7TUE5Qk0sR0FBSixPQUFHLFVBOEJMLHVCQTdCMEI7T0FBdkIsVUE2Qkg7T0E1QkcsYUE0QkgsTUE1QmEsQ0FBRTtNQUFBLE9BRVQ7T0FBSCxhQTBCSCxtQ0ExQitCO09BMEIvQixvQkF6QmtCO01BQUE7S0FBQTtJQUFBO2dCQUluQixnQkFDUTtXQW9CUDtZQXBCTyxTQW9CUCw4QkFuQmtCO2FBQVosSUFDcUI7T0FrQjNCLHNCQWxCbUIsYUFrQm5COztpQkFBQTs7O2dCQWhCRCxnQkFDUTtXQWVQO1lBZk8sU0FlUCw4QkFka0I7TUFBakIsZ0JBQVUsYUFjWDtNQUFBLG9CQWJnQjtxQkFhaEIsZUFaUTtLQUFBO0lBQUE7Z0JBRVQsU0FBTSxNQUNTO1dBU2Q7dUJBVlc7WUFDWCxJQUFLLGdCQVNMLE1BVHNCLGVBQU8sSUFTN0I7O2dCQVBELGVBQVcsTUFBVSxTQUNVO1dBTTlCO3VCQVBnQjt1QkFBVztLQUMzQixtQkFBYSxTQUFNLGdCQU1uQixNQU5vQzthQUFTLHNCQUFvQixtQkFBa0IsTUFNbkY7O0tBTEEsYUFLQSxlQUxnQixhQUFXO0lBQUE7Z0JBRTVCLFlBQ1M7V0FFUjtLQUZBLFNBRUE7S0FBQSxzQkFEaUI7S0FDakIsb0JBQWU7SUFBQTtHQUFBO0dBdkVmLGVBQVcsRUFBRTtHQUNiLFFBQU0sRUFBRTtVQUZUO0VBQUE7RUEyRUEsZUFBWSxrQkFBQSxFQUNDO1VBQVosTUFBTTs7RUFFUCxnQkFBWSxtQkFBQSxFQUNDO0dBQVosaUJBQVc7R0FDWCxxQkFBZSxTQUFRO0dBQ3ZCLHFCQUFlLElBQUUsRUFBRTtHQUNuQixpQkFBVyxNQUFNO0dBQ1osUUFBQSxTQUFTLEtBQUksT0FBTSxFQUFFLGdCQUNZO0lBQXJDLGFBQVMsV0FBUyxjQUFNLFdBQVM7R0FBQTtHQUNsQyxXQUFXO0VBQUE7RUFFWixtQkFBYyxzQkFBQSxFQUFFLE1BQ0s7VUFBcEIsT0FBTyxNQUFNLFNBQVE7RUFBQTtFQUV0QixtQkFBYyxzQkFBQSxFQUFFLE1BQ1M7cUJBREg7VUFDckIsYUFBVyxFQUFHLElBQUUsTUFBTTtFQUFBO0VBRXZCLG1CQUFjLHNCQUFBLEVBQUUsTUFDUztxQkFESDtVQUNyQixhQUFXLEVBQUcsSUFBRSxNQUFNO0VBQUE7RUFFdkIsc0JBQWUseUJBQUEsRUFBRSxNQUNTO3FCQURIO0dBQ3RCLFFBQUksSUFBRSxrQkFBZTtVQUVqQjtJQUFILEdBQUEsT0FBRyxFQUFFLFNBQVEsSUFDQztZQUFWLENBQUksT0FBRyxnQkFBYSxvQkFBaUIsT0FBRyxFQUFFLGdDQUNhO2FBQXpEO0tBQUE7V0FFRTtLQUFILFFBQUksYUFBVyxFQUFFO1lBQ2QsQ0FBSyxPQUFHLGdCQUFhLG9CQUFpQixPQUFHLEVBQUUsZ0NBQ2E7YUFBMUQ7S0FBQTs7OztFQXZITCx3QkFBQTtrQkFhQSIsImZpbGUiOiJhdC9TZXEvRGVxdWUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==