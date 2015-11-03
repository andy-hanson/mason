"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../compare","./../../math/Number","./../../math/methods","./../../methods","./../../Type/Kind","./../../Type/Pred-Type","./../at","./../at-Type","./../q","./Seq"],(exports,compare_0,Number_1,methods_2,methods_3,Kind_4,Pred_45Type_5,_64_6,_64_45Type_7,_63_8,Seq_9)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_60_63=_ms.get(_$0,"<?"),_$1=_ms.getModule(Number_1),modulo=_ms.get(_$1,"modulo"),Nat=_ms.get(_$1,"Nat"),_$2=_ms.getModule(methods_2),_43=_ms.get(_$2,"+"),_45=_ms.get(_$2,"-"),_42=_ms.get(_$2,"*"),_$3=_ms.getModule(methods_3),set_45sub_33=_ms.get(_$3,"set-sub!"),_$4=_ms.getModule(Kind_4),self_45kind_33=_ms.get(_$4,"self-kind!"),_$5=_ms.getModule(Pred_45Type_5),Any=_ms.get(_$5,"Any"),_64=_ms.getDefaultExport(_64_6),_$6=_ms.getModule(_64_6),_43_43_126=_ms.get(_$6,"++~"),count=_ms.get(_$6,"count"),empty_33=_ms.get(_$6,"empty!"),empty_63=_ms.get(_$6,"empty?"),iterator=_ms.get(_$6,"iterator"),_64map=_ms.get(_$6,"@map"),_64_45Type=_ms.getDefaultExport(_64_45Type_7),_$7=_ms.getModule(_64_45Type_7),empty=_ms.get(_$7,"empty"),_$8=_ms.getModule(_63_8),un_45_63=_ms.get(_$8,"un-?"),Seq=_ms.getDefaultExport(Seq_9),_$9=_ms.getModule(Seq_9),_60_43_43_33=_ms.get(_$9,"<++!"),_43_43_62_33=_ms.get(_$9,"++>!"),_63nth=_ms.get(_$9,"?nth"),_63_60pop_33=_ms.get(_$9,"?<pop!"),_63pop_62_33=_ms.get(_$9,"?pop>!"),_64reverse=_ms.get(_$9,"@reverse");
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
							return _43_43_126(_ms.range(_this["start-index!"],count(_this["data!"]),true),_ms.range(0,_this["end-index!"],true))
						} else {
							return _ms.range(_this["start-index!"],_this["end-index!"],true)
						}
					}());
					for(let _ of indices){
						(yield _ms.sub(_this["data!"],_))
					}
				}
				[_ms.symbol(_60_43_43_33)](ems){
					const _this=this;
					_ms.checkContains(_64,ems,"ems");
					for(let _ of _64reverse(ems)){
						const new_45start=prev_45index(_this,_this["start-index!"]);
						if(_61_63(new_45start,_this["end-index!"])){
							expand_33(_this);
							_60_43_43_33(_this,[_])
						} else {
							_this["start-index!"]=new_45start;
							_ms.setSub(_this["data!"],_this["start-index!"],_,"mutate")
						}
					}
				}
				[_ms.symbol(_43_43_62_33)](ems){
					const _this=this;
					_ms.checkContains(_64,ems,"ems");
					for(let _ of ems){
						const new_45end=next_45index(_this,_this["end-index!"]);
						if(_61_63(new_45end,_this["start-index!"])){
							expand_33(_this);
							_43_43_62_33(_this,[_])
						} else {
							_ms.setSub(_this["data!"],_this["end-index!"],_,"mutate");
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
				[_ms.symbol(set_45sub_33)](index,set_45to){
					const _this=this;
					_ms.checkContains(Nat,index,"index");
					_ms.checkContains(Any,set_45to,"set-to");
					const data_45index=un_45_63(_63data_45index(_this,index),_ms.lazy(()=>`Can't set at index ${index}; count is ${count(_this)}.`));
					_ms.setSub(_this["data!"],data_45index,set_45to,"mutate")
				}
				[_ms.symbol(empty_33)](){
					const _this=this;
					empty_33(_this["data!"]);
					_this["start-index!"]=0;
					_this["end-index!"]=0
				}
			};
			_ms.kindDo(_,Seq);
			self_45kind_33(_,_64_45Type);
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
			for(let index of _ms.range(0,old_45capacity,true)){
				_ms.setSub(new_45data,index,_ms.sub(old_45data,index),"init")
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
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9TZXEvRGVxdWUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFZQSw0QkFBYSxLQUlWOzt1QkFJRDtXQWdFQTtZQS9EQyxLQStERDtJQUFBO0lBNURROzRCQUFSLGFBQVcsTUFBTTs0QkFDakIsb0JBQWtCOzRCQUNsQixrQkFBZ0I7SUFBQTtpQkFFakI7V0F3REM7S0F2REEsY0FDYztNQUFiLEdBQUEsT0FzREQsMkNBckQ2QjtjQUEzQixxQkFxREYsc0JBckR1QixNQXFEdkIsZ0NBckRxQyxFQXFEckM7YUFuREs7d0JBbURMOzs7S0FsREksUUFBQSxLQUFBLFFBQ087cUJBaURYLGVBakRXO0tBQUE7SUFBQTtnQkFFWixlQUFPO1dBK0NOO3VCQS9DVTtLQUNOLFFBQUEsS0FBQSxXQUFTLEtBQ0c7TUFBZixrQkFBWSxhQTZDYjtNQTNDSyxHQUFILE9BQUcsWUEyQ0wscUJBMUMwQjtPQUF2QixVQTBDSDtPQXpDRyxhQXlDSCxNQXpDYSxDQUFDO01BQUEsT0FFUjtPQXVDTixzQkF2Q29CO2tCQXVDcEIscUNBdEM0Qjs7OztnQkFFN0IsZUFBTztXQW9DTjt1QkFwQ1U7S0FDTixRQUFBLEtBQUEsSUFDRztNQUFOLGdCQUFVLGFBa0NYO01BaENLLEdBQUgsT0FBRyxVQWdDTCx1QkEvQjBCO09BQXZCLFVBK0JIO09BOUJHLGFBOEJILE1BOUJhLENBQUM7TUFBQSxPQUVSO2tCQTRCTixtQ0E1QjBCO09BNEIxQixvQkEzQmtCO01BQUE7S0FBQTtJQUFBO2dCQUluQjtXQXVCQztZQXRCQSxDQUFPLFNBc0JQLDhCQXJCa0I7YUFBWixJQUNxQjtPQW9CM0Isc0JBcEJtQixhQW9CbkI7O2lCQUFBOzs7Z0JBbEJEO1dBa0JDO1lBakJBLENBQU8sU0FpQlAsOEJBaEJrQjtNQUFqQixnQkFBVSxhQWdCWDtNQUFBLG9CQWZnQjtxQkFlaEIsZUFkUTtLQUFBO0lBQUE7Z0JBRVQsU0FBTTtXQVlMO3VCQVpXO1lBRVgsT0FBTSxnQkFVTixNQVZ1QixPQUFRO3FCQVUvQixlQVRRO0tBQUE7SUFBQTtnQkFFVCxlQUFXLE1BQVU7V0FPcEI7dUJBUGdCO3VCQUFXO0tBQzNCLG1CQUFhLFNBQU0sZ0JBTW5CLE1BTm9DLG9CQUFTLHNCQUFvQixtQkFBa0IsTUFNbkY7Z0JBQUEsZUFMTyxhQUFlOztnQkFFdkI7V0FHQztLQUZBLFNBRUE7S0FBQSxzQkFEaUI7S0FDakIsb0JBQWU7SUFBQTtHQUFBO2dCQXhFQztHQUloQixlQUFXLEVBQUU7OztFQXVFZCxlQUFZLGtCQUFBO1VBQ1gsTUFBTTs7RUFFUCxnQkFBWSxtQkFBQTtHQUNYLGlCQUFXO0dBQ1gscUJBQWUsU0FBQTtHQUNmLHFCQUFlLElBQUUsRUFBRTtHQUNuQixpQkFBVyxNQUFNO0dBQ2IsUUFBQSxtQkFBUyxFQUFJLHFCQUNZO2VBQTVCLFdBQVMsY0FBUyxXQUFTOztHQUM1QixXQUFXO0VBQUE7RUFFWixtQkFBYyxzQkFBQSxFQUFFO1VBQ2YsT0FBTyxNQUFNLFNBQUE7RUFBQTtFQUVkLG1CQUFjLHNCQUFBLEVBQUU7cUJBQU07VUFDckIsYUFBVyxFQUFHLElBQUUsTUFBTTtFQUFBO0VBRXZCLG1CQUFjLHNCQUFBLEVBQUU7cUJBQU07VUFDckIsYUFBVyxFQUFHLElBQUUsTUFBTTtFQUFBO0VBRXZCLHNCQUFlLHlCQUFBLEVBQUU7cUJBQU07R0FDdEIsUUFBSSxJQUFFLGtCQUFlO1VBRWpCO0lBQUgsR0FBQSxPQUFHLEVBQUUsU0FBQSxJQUNTO1lBQWIsQ0FBRyxDQUFJLE9BQUcsZ0JBQWEsb0JBQWlCLE9BQUcsRUFBRSxnQ0FDYTthQUF6RDtLQUFBO1dBRUU7S0FBSCxRQUFJLGFBQVcsRUFBRTtZQUNqQixDQUFHLENBQUssT0FBRyxnQkFBYSxvQkFBaUIsT0FBRyxFQUFFLGdDQUNhO2FBQTFEO0tBQUEiLCJmaWxlIjoiYXQvU2VxL0RlcXVlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
