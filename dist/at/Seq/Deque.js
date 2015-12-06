"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../compare","./../../math/Number","./../../math/methods","./../../methods","./../../Type/Kind","./../../Type/Pred-Type","./../at","./../at-Type","./../q","./Seq"],(exports,compare_0,Number_1,methods_2,methods_3,Kind_4,Pred_45Type_5,_64_6,_64_45Type_7,_63_8,Seq_9)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_60_63=_ms.get(_$0,"<?"),_$1=_ms.getModule(Number_1),modulo=_ms.get(_$1,"modulo"),Nat=_ms.get(_$1,"Nat"),_$2=_ms.getModule(methods_2),_43=_ms.get(_$2,"+"),_45=_ms.get(_$2,"-"),_42=_ms.get(_$2,"*"),_$3=_ms.getModule(methods_3),set_45sub_33=_ms.get(_$3,"set-sub!"),_$4=_ms.getModule(Kind_4),self_45kind_33=_ms.get(_$4,"self-kind!"),_$5=_ms.getModule(Pred_45Type_5),Any=_ms.get(_$5,"Any"),_64=_ms.getDefaultExport(_64_6),_$6=_ms.getModule(_64_6),_43_43_126=_ms.get(_$6,"++~"),count=_ms.get(_$6,"count"),empty_33=_ms.get(_$6,"empty!"),empty_63=_ms.get(_$6,"empty?"),iterator=_ms.get(_$6,"iterator"),_64map=_ms.get(_$6,"@map"),_64_45Type=_ms.getDefaultExport(_64_45Type_7),_$7=_ms.getModule(_64_45Type_7),empty=_ms.get(_$7,"empty"),_$8=_ms.getModule(_63_8),un_45_63=_ms.get(_$8,"un-?"),Seq=_ms.getDefaultExport(Seq_9),_$9=_ms.getModule(Seq_9),_60_43_43_33=_ms.get(_$9,"<++!"),_43_43_62_33=_ms.get(_$9,"++>!"),_63nth=_ms.get(_$9,"?nth"),_63_60pop_33=_ms.get(_$9,"?<pop!"),_63pop_62_33=_ms.get(_$9,"?pop>!"),_64reverse=_ms.get(_$9,"@reverse");
		let Deque=exports.default=(()=>{
			let _=class Deque{
				static [_ms.symbol(empty)](){
					let _this=this;
					return new (_this)()
				}
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
					_ms.checkContains(_64,ems,"ems");
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
					_ms.checkContains(_64,ems,"ems");
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
					_ms.checkContains(Nat,index,"index");
					return _64map(_this["?data-index"](index),_=>{
						return _ms.sub(_this.data,_)
					})
				}
				[_ms.symbol(set_45sub_33)](index,set_45to){
					let _this=this;
					_ms.checkContains(Nat,index,"index");
					_ms.checkContains(Any,set_45to,"set-to");
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
			self_45kind_33(_,_64_45Type);
			return _
		})();
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9TZXEvRGVxdWUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFZQSwwQkFBYSxLQUlWOzt1QkFJRDtTQTJGTTtZQTFGTCxLQTBGSztJQUFBO0lBdkZFO1NBdUZGO3FCQUFBLGFBdkZFLE1BQU07cUJBdUZSLG9CQXRGUztxQkFzRlQsa0JBckZPO0lBQUE7aUJBRWQ7U0FtRk87S0FsRk4sWUFDYztNQUFiLEdBaUZLLGtCQWhGSTtjQUFSLHFCQWdGSSxxQkFoRmdCLE1BZ0ZoQiw0QkFoRjZCLEVBZ0Y3QjthQTlFRDt3QkE4RUM7OztLQTdFRixRQUFBLEtBQUEsUUFDTztxQkE0RUwsV0E1RVE7S0FBQTtJQUFBO2dCQUVmLGVBQU87U0EwRUE7dUJBMUVJO0tBQ04sUUFBQSxLQUFBLFdBQVMsS0FDRztNQUFmLGdCQXdFSztNQXRFRCxHQUFILE9BQUcsWUFzRUMsb0JBckVtQjtPQXFFbkI7T0FwRUgsYUFvRUcsTUFwRU8sQ0FBRTtNQUFBLE9BRVQ7T0FrRUEscUJBbEVhO2tCQWtFYixnQ0FqRXFCOzs7O2dCQUU1QixlQUFPO1NBK0RBO3VCQS9ESTtLQUNOLFFBQUEsS0FBQSxJQUNHO01BQU4sY0E2REs7TUEzREQsR0FBSCxPQUFHLFVBMkRDLHNCQTFEbUI7T0EwRG5CO09BekRILGFBeURHLE1BekRPLENBQUU7TUFBQSxPQUVUO2tCQXVEQSw4QkF2RG1CO09BdURuQixtQkF0RFc7TUFBQTtLQUFBO0lBQUE7Z0JBSWxCO1NBa0RPO1lBakRDLENBQUEsU0FpREQsOEJBaERZO2FBQVosS0FDbUI7cUJBK0NuQjtPQUFBOzs7OztnQkE3Q1A7U0E2Q087WUE1Q0MsQ0FBQSxTQTRDRCw4QkEzQ1k7TUFBakIsY0EyQ0s7TUFBQSxtQkExQ1M7cUJBMENULFdBekNDO0tBQUE7SUFBQTtnQkFFUixTQUFNO1NBdUNDO3VCQXZDSztZQUVYLE9BcUNNLHFCQXJDYSxPQUFTO3FCQXFDdEIsV0FwQ0U7S0FBQTtJQUFBO2dCQUVULGVBQVcsTUFBVTtTQWtDZDt1QkFsQ1U7dUJBQVc7S0FDM0IsaUJBQWEsU0FpQ1AscUJBakMwQixvQkFBUyxzQkFBb0IsbUJBQWtCLE1BaUN6RTtnQkFBQSxXQWhDQSxhQUFlOztnQkFFdEI7U0E4Qk87S0E3Qk4sU0E2Qk07S0FBQSxxQkE1QlU7S0E0QlYsbUJBM0JRO0lBQUE7a0JBR0M7U0F3QlQ7WUF4Qk4sTUF3Qk07OztTQUFBO0tBckJOLGVBcUJNO0tBcEJOLG1CQW9CTTtLQW5CTixtQkFBZSxJQUFFLEVBQUU7S0FDbkIsZUFBVyxLQUFJLE9BQU07S0FDakIsUUFBQSxlQUFBLEVBQUkscUJBQ1k7aUJBQW5CLFdBQVUsVUFBSSxXQUFVOztLQWdCbkIsV0FmRztJQUFBO2lCQUVNO1NBYVQ7WUFaTixPQUFPLE1BWUQ7O2lCQVZTO1NBVVQ7WUFBQSxvQkFUTyxJQUFFLE1BQU07SUFBQTtpQkFFTjtTQU9UO1lBQUEsb0JBTk8sSUFBRSxNQUFNO0lBQUE7b0JBR047U0FHVDtZQUhOLE9BR007O2tCQURVO1NBQ1Y7S0FBTixNQUFJLElBQUUscUJBQWE7WUFFZjtNQUFILEdBQUEsT0FBRyxFQUZFLGdCQUdTO2NBQVYsQ0FBQSxDQUhDLG1CQUdhLE9BQUcsRUFIaEIsbUNBSTZCO2VBQWhDO09BQUE7YUFFRTtPQUFILE1BTkksb0JBTVk7Y0FDYixDQUFBLENBUEMsbUJBT2MsT0FBRyxFQVBqQixtQ0FROEI7ZUFBakM7T0FBQTs7Ozs7Z0JBM0dhO0dBSWhCLGVBQVksRUFBQyIsImZpbGUiOiJhdC9TZXEvRGVxdWUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
