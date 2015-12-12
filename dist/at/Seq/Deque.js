"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../compare","./../../math/Number","./../../math/methods","./../../methods","./../../Type/Pred-Type","./../at","./../q","./Seq"],(exports,compare_0,Number_1,methods_2,methods_3,Pred_45Type_4,_64_5,_63_6,Seq_7)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_60_63=_ms.get(_$0,"<?"),_$1=_ms.getModule(Number_1),modulo=_ms.get(_$1,"modulo"),Nat=_ms.get(_$1,"Nat"),_$2=_ms.getModule(methods_2),_43=_ms.get(_$2,"+"),_45=_ms.get(_$2,"-"),_42=_ms.get(_$2,"*"),_$3=_ms.getModule(methods_3),set_45sub_33=_ms.get(_$3,"set-sub!"),_$4=_ms.getModule(Pred_45Type_4),Any=_ms.get(_$4,"Any"),_64=_ms.getDefaultExport(_64_5),_$5=_ms.getModule(_64_5),_43_43_126=_ms.get(_$5,"++~"),count=_ms.get(_$5,"count"),empty_33=_ms.get(_$5,"empty!"),empty_63=_ms.get(_$5,"empty?"),iterator=_ms.get(_$5,"iterator"),_64map=_ms.get(_$5,"@map"),_$6=_ms.getModule(_63_6),un_45_63=_ms.get(_$6,"un-?"),Seq=_ms.getDefaultExport(Seq_7),_$7=_ms.getModule(Seq_7),_60_43_43_33=_ms.get(_$7,"<++!"),_43_43_62_33=_ms.get(_$7,"++>!"),_63nth=_ms.get(_$7,"?nth"),_63_60pop_33=_ms.get(_$7,"?<pop!"),_63pop_62_33=_ms.get(_$7,"?pop>!"),_64reverse=_ms.get(_$7,"@reverse");
		let Deque=exports.default=(()=>{
			let _=class Deque{
				constructor(){
					let _this=this;
					_ms.newProperty(_this,"data",Array(8));
					_ms.newProperty(_this,"start-index",0);
					_ms.newProperty(_this,"end-index",0)
				}
				*[_ms.symbol(iterator)](){
					let _this=this;
					let indices=(yield* function*(){
						if(_this["wrapped?"]){
							return _43_43_126(_ms.range(_this["start-index"],count(_this.data),true),_ms.range(0,_this["end-index"],true))
						} else {
							return _ms.range(_this["start-index"],_this["end-index"],true)
						}
					}());
					for(let _ of indices){
						(yield _ms.sub(_this.data,_))
					}
				}
				[_ms.symbol(_60_43_43_33)](ems){
					let _this=this;
					_ms.checkInstance(_64,ems,"ems");
					for(let _ of _64reverse(ems)){
						let new_45start=_this["prev-index"](_this["start-index"]);
						if(_61_63(new_45start,_this["end-index"])){
							_this["expand!"]();
							_60_43_43_33(_this,[_])
						} else {
							_this["start-index"]=new_45start;
							_ms.setSub(_this.data,_this["start-index"],_,"mutate")
						}
					}
				}
				[_ms.symbol(_43_43_62_33)](ems){
					let _this=this;
					_ms.checkInstance(_64,ems,"ems");
					for(let _ of ems){
						let new_45end=_this["next-index"](_this["end-index"]);
						if(_61_63(new_45end,_this["start-index"])){
							_this["expand!"]();
							_43_43_62_33(_this,[_])
						} else {
							_ms.setSub(_this.data,_this["end-index"],_,"mutate");
							_this["end-index"]=new_45end
						}
					}
				}
				[_ms.symbol(_63_60pop_33)](){
					let _this=this;
					return (empty_63(_this)?_ms.None:_ms.some((()=>{
						return (()=>{
							let _=_ms.sub(_this.data,_this["start-index"]);
							_this["start-index"]=_this["next-index"](_this["start-index"]);
							return _
						})()
					})()))
				}
				[_ms.symbol(_63pop_62_33)](){
					let _this=this;
					return (empty_63(_this)?_ms.None:_ms.some((()=>{
						let new_45end=_this["prev-index"](_this["end-index"]);
						_this["end-index"]=new_45end;
						return _ms.sub(_this.data,new_45end)
					})()))
				}
				[_ms.symbol(_63nth)](index){
					let _this=this;
					_ms.checkInstance(Nat,index,"index");
					return _64map(_this["?data-index"](index),_=>{
						return _ms.sub(_this.data,_)
					})
				}
				[_ms.symbol(set_45sub_33)](index,set_45to){
					let _this=this;
					_ms.checkInstance(Nat,index,"index");
					_ms.checkInstance(Any,set_45to,"set-to");
					let data_45index=un_45_63(_this["?data-index"](index),_ms.lazy(()=>`Can't set at index ${index}; count is ${count(_this)}.`));
					_ms.setSub(_this.data,data_45index,set_45to,"mutate")
				}
				[_ms.symbol(empty_33)](){
					let _this=this;
					empty_33(_this.data);
					_this["start-index"]=0;
					_this["end-index"]=0
				}
				get capacity(){
					let _this=this;
					return count(_this.data)
				}
				"expand!"(){
					let _this=this;
					let old_45data=_this.data;
					let old_45capacity=_this.capacity;
					let new_45capacity=_42(2,old_45capacity);
					let new_45data=new (Array)(new_45capacity);
					for(let _ of _ms.range(0,old_45capacity,true)){
						_ms.setSub(new_45data,_,_ms.sub(old_45data,_),"init")
					};
					_this.data=new_45data
				}
				"wrap-index"(index){
					let _this=this;
					return modulo(index,_this.capacity)
				}
				"next-index"(index){
					let _this=this;
					return _this["wrap-index"](_43(index,1))
				}
				"prev-index"(index){
					let _this=this;
					return _this["wrap-index"](_45(index,1))
				}
				get "wrapped?"(){
					let _this=this;
					return _60_63(_this["end-index"],_this["start-index"])
				}
				"?data-index"(index){
					let _this=this;
					let a=_43(_this["start-index"],index);
					return (()=>{
						if(_60_63(a,_this.capacity)){
							return ((_this["wrapped?"]||_60_63(a,_this["end-index"]))?_ms.some((()=>{
								return a
							})()):_ms.None)
						} else {
							let b=_this["wrap-index"](a);
							return ((_this["wrapped?"]&&_60_63(b,_this["end-index"]))?_ms.some((()=>{
								return b
							})()):_ms.None)
						}
					})()
				}
			};
			_ms.kindDo(_,Seq);
			return _
		})();
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9TZXEvRGVxdWUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFVQSwwQkFBYTs7SUFJSDtTQXVGRjtxQkFBQSxhQXZGRSxNQUFNO3FCQXVGUixvQkF0RlM7cUJBc0ZULGtCQXJGTztJQUFBO2lCQUVkO1NBbUZPO0tBbEZOLFlBQ2M7TUFBYixHQWlGSyxrQkFoRkk7Y0FBUixxQkFnRkkscUJBaEZnQixNQWdGaEIsNEJBaEY2QixFQWdGN0I7YUE5RUQ7d0JBOEVDOzs7S0E3RUYsUUFBQSxLQUFBLFFBQ087cUJBNEVMLFdBNUVRO0tBQUE7SUFBQTtnQkFFZixlQUFPO1NBMEVBO3VCQTFFSTtLQUNOLFFBQUEsS0FBQSxXQUFTLEtBQ0c7TUFBZixnQkF3RUs7TUF0RUQsR0FBSCxPQUFHLFlBc0VDLG9CQXJFbUI7T0FxRW5CO09BcEVILGFBb0VHLE1BcEVPLENBQUU7TUFBQSxPQUVUO09Ba0VBLHFCQWxFYTtrQkFrRWIsZ0NBakVxQjs7OztnQkFFNUIsZUFBTztTQStEQTt1QkEvREk7S0FDTixRQUFBLEtBQUEsSUFDRztNQUFOLGNBNkRLO01BM0RELEdBQUgsT0FBRyxVQTJEQyxzQkExRG1CO09BMERuQjtPQXpESCxhQXlERyxNQXpETyxDQUFFO01BQUEsT0FFVDtrQkF1REEsOEJBdkRtQjtPQXVEbkIsbUJBdERXO01BQUE7S0FBQTtJQUFBO2dCQUlsQjtTQWtETztZQWpEQyxDQUFBLFNBaURELDhCQWhEWTthQUFaLEtBQ21CO3FCQStDbkI7T0FBQTs7Ozs7Z0JBN0NQO1NBNkNPO1lBNUNDLENBQUEsU0E0Q0QsOEJBM0NZO01BQWpCLGNBMkNLO01BQUEsbUJBMUNTO3FCQTBDVCxXQXpDQztLQUFBO0lBQUE7Z0JBRVIsU0FBTTtTQXVDQzt1QkF2Q0s7WUFFWCxPQXFDTSxxQkFyQ2EsT0FBUztxQkFxQ3RCLFdBcENFO0tBQUE7SUFBQTtnQkFFVCxlQUFXLE1BQVU7U0FrQ2Q7dUJBbENVO3VCQUFXO0tBQzNCLGlCQUFhLFNBaUNQLHFCQWpDMEIsb0JBQVMsc0JBQW9CLG1CQUFrQixNQWlDekU7Z0JBQUEsV0FoQ0EsYUFBZTs7Z0JBRXRCO1NBOEJPO0tBN0JOLFNBNkJNO0tBQUEscUJBNUJVO0tBNEJWLG1CQTNCUTtJQUFBO2tCQUdDO1NBd0JUO1lBeEJOLE1Bd0JNOzs7U0FBQTtLQXJCTixlQXFCTTtLQXBCTixtQkFvQk07S0FuQk4sbUJBQWUsSUFBRSxFQUFFO0tBQ25CLGVBQVcsS0FBSSxPQUFNO0tBQ2pCLFFBQUEsZUFBQSxFQUFJLHFCQUNZO2lCQUFuQixXQUFVLFVBQUksV0FBVTs7S0FnQm5CLFdBZkc7SUFBQTtpQkFFTTtTQWFUO1lBWk4sT0FBTyxNQVlEOztpQkFWUztTQVVUO1lBQUEsb0JBVE8sSUFBRSxNQUFNO0lBQUE7aUJBRU47U0FPVDtZQUFBLG9CQU5PLElBQUUsTUFBTTtJQUFBO29CQUdOO1NBR1Q7WUFITixPQUdNOztrQkFEVTtTQUNWO0tBQU4sTUFBSSxJQUFFLHFCQUFhO1lBRWY7TUFBSCxHQUFBLE9BQUcsRUFGRSxnQkFHUztjQUFWLENBQUEsQ0FIQyxtQkFHYSxPQUFHLEVBSGhCLG1DQUk2QjtlQUFoQztPQUFBO2FBRUU7T0FBSCxNQU5JLG9CQU1ZO2NBQ2IsQ0FBQSxDQVBDLG1CQU9jLE9BQUcsRUFQakIsbUNBUThCO2VBQWpDO09BQUE7Ozs7O2dCQW5HYSIsImZpbGUiOiJhdC9TZXEvRGVxdWUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
