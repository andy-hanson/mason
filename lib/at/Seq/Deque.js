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
			_ms.traitDo(_,Seq);
			return _
		})();
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9TZXEvRGVxdWUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFVQSwwQkFBYTs7SUFJSCxhQUFBOztxQkFBUixhQUFRLE1BQU07cUJBQ2Qsb0JBQWU7cUJBQ2Ysa0JBQWE7SUFBQTtJQUVkLGFBQUEsWUFDWTs7S0FBWCxZQUNjO01BQWIsR0FBQSxrQkFDUztjQUFSLHFCQUFJLHFCQUFnQixNQUFNLDRCQUFPLEVBQUs7YUFFbkM7d0JBQUgscUJBQWdCOzs7S0FDZCxRQUFBLEtBQUEsUUFDTztxQkFBSixXQUFPO0tBQUE7SUFBQTtJQUVmLFlBQUEsZUFBTyxJQUNLOzt1QkFERDtLQUNOLFFBQUEsS0FBQSxXQUFTLEtBQ0c7TUFBZixnQkFBWSxvQkFBWTtNQUVwQixHQUFILE9BQUcsWUFBVSxvQkFDVTtPQUF0QjtPQUNBLGFBQUssTUFBSyxDQUFFO01BQUEsT0FFVDtPQUFILHFCQUFnQjtrQkFDaEIsV0FBTSxxQkFBa0I7Ozs7SUFFNUIsWUFBQSxlQUFPLElBQ0s7O3VCQUREO0tBQ04sUUFBQSxLQUFBLElBQ0c7TUFBTixjQUFVLG9CQUFZO01BRWxCLEdBQUgsT0FBRyxVQUFRLHNCQUNZO09BQXRCO09BQ0EsYUFBSyxNQUFLLENBQUU7TUFBQSxPQUVUO2tCQUFILFdBQU0sbUJBQWdCO09BQ3RCLG1CQUFjO01BQUE7S0FBQTtJQUFBO0lBSWxCLFlBQUEsZ0JBQ1E7O1lBQUEsQ0FBQSxTQUFPLDhCQUNJO2FBQVosS0FDbUI7cUJBRG5CLFdBQU07T0FDVixxQkFBZ0Isb0JBQVk7Ozs7O0lBRS9CLFlBQUEsZ0JBQ1E7O1lBQUEsQ0FBQSxTQUFPLDhCQUNJO01BQWpCLGNBQVUsb0JBQVk7TUFDdEIsbUJBQWM7cUJBQ2QsV0FBTTtLQUFBO0lBQUE7SUFFUixZQUFBLFNBQU0sTUFDUzs7dUJBREg7WUFFWCxPQUFNLHFCQUFhLE9BQVMsR0FDQTtxQkFBM0IsV0FBTztLQUFBO0lBQUE7SUFFVCxZQUFBLGVBQVcsTUFBVSxTQUNVOzt1QkFEZDt1QkFBVztLQUMzQixpQkFBYSxTQUFNLHFCQUFhLG9CQUFTLHNCQUFvQixtQkFBa0IsTUFBTTtnQkFDckYsV0FBTSxhQUFlOztJQUV0QixZQUFBLFlBQ1M7O0tBQVIsU0FBTztLQUNQLHFCQUFnQjtLQUNoQixtQkFBYztJQUFBO0lBRVosY0FDYTs7WUFBZixNQUFNOztlQUdPOztLQUFiLGVBQVc7S0FDWCxtQkFBZTtLQUNmLG1CQUFlLElBQUUsRUFBRTtLQUNuQixlQUFXLEtBQUksT0FBTTtLQUNqQixRQUFBLGVBQUEsRUFBSSxxQkFDWTtpQkFBbkIsV0FBVSxVQUFJLFdBQVU7O0tBQ3pCLFdBQVM7SUFBQTtpQkFFTSxNQUNLOztZQUFwQixPQUFPLE1BQU07O2lCQUVFLE1BQ0s7O1lBQXBCLG9CQUFhLElBQUUsTUFBTTtJQUFBO2lCQUVOLE1BQ0s7O1lBQXBCLG9CQUFhLElBQUUsTUFBTTtJQUFBO0lBRW5CLGdCQUNhOztZQUFmLE9BQUcsbUJBQVc7O2tCQUVFLE1BQ0s7O0tBQXJCLE1BQUksSUFBRSxxQkFBYTtZQUVmO01BQUgsR0FBQSxPQUFHLEVBQUUsZ0JBQ1M7Y0FBVixDQUFBLENBQUcsbUJBQVcsT0FBRyxFQUFFLG1DQUNXO2VBQWhDO09BQUE7YUFFRTtPQUFILE1BQUksb0JBQVk7Y0FDYixDQUFBLENBQUksbUJBQVcsT0FBRyxFQUFFLG1DQUNXO2VBQWpDO09BQUE7Ozs7O2lCQW5HYyIsImZpbGUiOiJhdC9TZXEvRGVxdWUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
