"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../math/Number","../../math/methods","../../Type/Kind","../../Type/Pred-Type","../at","../at-Type","../q","../Range","./Seq"],(exports,compare_0,Number_1,methods_2,Kind_3,Pred_45Type_4,_64_5,_64_45Type_6,_63_7,Range_8,Seq_9)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_60_63=_ms.get(_$0,"<?"),_$1=_ms.getModule(Number_1),modulo=_ms.get(_$1,"modulo"),Nat=_ms.get(_$1,"Nat"),_$2=_ms.getModule(methods_2),_43=_ms.get(_$2,"+"),_45=_ms.get(_$2,"-"),_42=_ms.get(_$2,"*"),_$3=_ms.getModule(Kind_3),kind_33=_ms.get(_$3,"kind!"),self_45kind_33=_ms.get(_$3,"self-kind!"),_$4=_ms.getModule(Pred_45Type_4),Any=_ms.get(_$4,"Any"),_64=_ms.getDefaultExport(_64_5),_$5=_ms.getModule(_64_5),_43_43_126=_ms.get(_$5,"++~"),count=_ms.get(_$5,"count"),empty_33=_ms.get(_$5,"empty!"),empty_63=_ms.get(_$5,"empty?"),iterator=_ms.get(_$5,"iterator"),_64map=_ms.get(_$5,"@map"),_64_45Type=_ms.getDefaultExport(_64_45Type_6),_$6=_ms.getModule(_64_45Type_6),empty=_ms.get(_$6,"empty"),_$7=_ms.getModule(_63_7),un_45_63=_ms.get(_$7,"un-?"),Range=_ms.getDefaultExport(Range_8),Seq=_ms.getDefaultExport(Seq_9),_$8=_ms.getModule(Seq_9),_60_43_43_33=_ms.get(_$8,"<++!"),_43_43_62_33=_ms.get(_$8,"++>!"),_63nth=_ms.get(_$8,"?nth"),_63_60pop_33=_ms.get(_$8,"?<pop!"),_63pop_62_33=_ms.get(_$8,"?pop>!"),reverse=_ms.get(_$8,"reverse"),set_45nth_33=_ms.get(_$8,"set-nth!");
		const Deque=exports.default=(()=>{
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
							return _43_43_126(new (Range)(_this["start-index!"],count(_this["data!"])),new (Range)(0,_this["end-index!"]))
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
					return (empty_63(_this)?_ms.None:_ms.some((()=>{
						return (_=>{
							_this["start-index!"]=next_45index(_this,_this["start-index!"]);
							return _
						})(_ms.sub(_this["data!"],_this["start-index!"]))
					})()))
				}
				[_ms.symbol(_63pop_62_33)](){
					const _this=this;
					return (empty_63(_this)?_ms.None:_ms.some((()=>{
						const new_45end=prev_45index(_this,_this["end-index!"]);
						_this["end-index!"]=new_45end;
						return _ms.sub(_this["data!"],new_45end)
					})()))
				}
				[_ms.symbol(_63nth)](index){
					const _this=this;
					_ms.checkContains(Nat,index,"index");
					return _64map(_63data_45index(_this,index),_=>{
						return _ms.sub(_this["data!"],_)
					})
				}
				[_ms.symbol(set_45nth_33)](index,set_45to){
					const _this=this;
					_ms.checkContains(Nat,index,"index");
					_ms.checkContains(Any,set_45to,"set-to");
					const data_45index=un_45_63(_63data_45index(_this,index),_ms.lazy(()=>`Can't set at index ${index}; count is ${count(_this)}`));
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
					return ((_60_63(_["end-index!"],_["start-index!"])||_60_63(a,_["end-index!"]))?_ms.some((()=>{
						return a
					})()):_ms.None)
				} else {
					const b=wrap_45index(_,a);
					return ((_60_63(_["end-index!"],_["start-index!"])&&_60_63(b,_["end-index!"]))?_ms.some((()=>{
						return b
					})()):_ms.None)
				}
			})()
		};
		const name=exports.name=`Deque`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9TZXEvRGVxdWUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFZQSw0QkFDWSxLQUdSO1NBREg7SUFNQyxtQkFBQSxTQUNPO1dBaUVQO1lBakVDLEtBaUVEO0lBQUE7SUE5RFMsYUFBQTs0QkFBVCxhQXdFVyxNQXhFTTs0QkFDakIsb0JBQWtCOzRCQUNsQixrQkFBZ0I7SUFBQTtJQUVqQixhQUFBLFlBQ1k7V0F5RFg7S0F6REEsY0FDYztNQUFiLEdBQUEsT0F3REQsMkNBdkQ2QjtjQUEzQixXQUFLLEtBQUksT0F1RFgsc0JBdkRnQyxNQXVEaEMsaUJBdkRnRCxLQUFJLE9BQU0sRUF1RDFEO2FBckRLO2NBQUgsS0FBSSxPQXFETjs7O0tBcERLLFFBQUEsS0FBQSxRQUNPO3FCQW1EWixlQW5EVztLQUFBO0lBQUE7SUFFWixZQUFBLGVBQU8sSUFDSztXQWdEWDt1QkFqRFU7S0FDTCxRQUFBLE1BQU0sUUFBUSxLQUNHO01BQXJCLGtCQUFZLGFBK0NiO01BN0NNLEdBQUosT0FBRyxZQTZDTCxxQkE1QzBCO09BQXZCLFVBNENIO09BM0NHLGFBMkNILE1BM0NhLENBQUM7TUFBQSxPQUVSO09BeUNOLHNCQXpDb0I7T0FDakIsYUF3Q0gscUNBeENpQztNQUFBO0tBQUE7SUFBQTtJQUlsQyxZQUFBLGVBQU8sSUFDSztXQW1DWDt1QkFwQ1U7S0FDTCxRQUFBLE1BQU0sSUFDRztNQUFiLGdCQUFVLGFBa0NYO01BaENNLEdBQUosT0FBRyxVQWdDTCx1QkEvQjBCO09BQXZCLFVBK0JIO09BOUJHLGFBOEJILE1BOUJhLENBQUM7TUFBQSxPQUVSO09BQUgsYUE0QkgsbUNBNUIrQjtPQTRCL0Isb0JBM0JrQjtNQUFBO0tBQUE7SUFBQTtJQUluQixZQUFBLGdCQUNRO1dBc0JQO1lBdEJBLENBQU8sU0FzQlAsOEJBckJrQjthQUFaLElBQ3FCO09Bb0IzQixzQkFwQm1CLGFBb0JuQjs7aUJBQUE7OztJQWxCRCxZQUFBLGdCQUNRO1dBaUJQO1lBakJBLENBQU8sU0FpQlAsOEJBaEJrQjtNQUFqQixnQkFBVSxhQWdCWDtNQUFBLG9CQWZnQjtxQkFlaEIsZUFkUTtLQUFBO0lBQUE7SUFFVCxZQUFBLFNBQU0sTUFDUztXQVdkO3VCQVpXO1lBRVgsT0FBTSxnQkFVTixNQVZ1QixPQUFRLEdBQ0M7cUJBU2hDLGVBVFE7S0FBQTtJQUFBO0lBRVQsWUFBQSxlQUFXLE1BQVUsU0FDVTtXQU05Qjt1QkFQZ0I7dUJBQVc7S0FDM0IsbUJBQWEsU0FBTSxnQkFNbkIsTUFOb0Msb0JBQVMsc0JBQW9CLG1CQUFrQixNQU1uRjtLQUxBLGFBS0EsZUFMZ0IsYUFBVztJQUFBO0lBRTVCLFlBQUEsWUFDUztXQUVSO0tBRkEsU0FFQTtLQUFBLHNCQURpQjtLQUNqQixvQkFBZTtJQUFBO0dBQUE7R0F2RWYsZUFBVyxFQUFFO0dBQ2IsUUFBTSxFQUFFO1VBRlQ7RUFBQTtFQTJFQSxlQUFZLGtCQUFBLEVBQ0M7VUFBWixNQUFNOztFQUVQLGdCQUFZLG1CQUFBLEVBQ0M7R0FBWixpQkFBVztHQUNYLHFCQUFlLFNBQUE7R0FDZixxQkFBZSxJQUFFLEVBQUU7R0FDbkIsaUJBQVcsTUFBTTtHQUNaLFFBQUEsU0FBUyxLQUFJLE9BQU0sRUFBRSxnQkFDWTtJQUFyQyxhQUFTLFdBQVMsY0FBTSxXQUFTO0dBQUE7R0FDbEMsV0FBVztFQUFBO0VBRVosbUJBQWMsc0JBQUEsRUFBRSxNQUNLO1VBQXBCLE9BQU8sTUFBTSxTQUFBO0VBQUE7RUFFZCxtQkFBYyxzQkFBQSxFQUFFLE1BQ1M7cUJBREg7VUFDckIsYUFBVyxFQUFHLElBQUUsTUFBTTtFQUFBO0VBRXZCLG1CQUFjLHNCQUFBLEVBQUUsTUFDUztxQkFESDtVQUNyQixhQUFXLEVBQUcsSUFBRSxNQUFNO0VBQUE7RUFFdkIsc0JBQWUseUJBQUEsRUFBRSxNQUNTO3FCQURIO0dBQ3RCLFFBQUksSUFBRSxrQkFBZTtVQUVqQjtJQUFILEdBQUEsT0FBRyxFQUFFLFNBQUEsSUFDUztZQUFiLENBQUcsQ0FBSSxPQUFHLGdCQUFhLG9CQUFpQixPQUFHLEVBQUUsZ0NBQ2E7YUFBekQ7S0FBQTtXQUVFO0tBQUgsUUFBSSxhQUFXLEVBQUU7WUFDakIsQ0FBRyxDQUFLLE9BQUcsZ0JBQWEsb0JBQWlCLE9BQUcsRUFBRSxnQ0FDYTthQUExRDtLQUFBOzs7O0VBeEhMLHdCQUFBIiwiZmlsZSI6ImF0L1NlcS9EZXF1ZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
