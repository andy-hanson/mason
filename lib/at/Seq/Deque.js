"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../math/Number","./../../methods","./../../Type/Pred-Type","./../at","./../q","./Seq"],(exports,Number_0,methods_1,Pred_45Type_2,_64_3,_63_4,Seq_5)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(Number_0),modulo=_ms.get(_$0,"modulo"),Nat=_ms.get(_$0,"Nat"),_$1=_ms.getModule(methods_1),set_45sub_33=_ms.get(_$1,"set-sub!"),_$2=_ms.getModule(Pred_45Type_2),Any=_ms.get(_$2,"Any"),_64=_ms.getDefaultExport(_64_3),_$3=_ms.getModule(_64_3),_43_43_126=_ms.get(_$3,"++~"),count=_ms.get(_$3,"count"),empty_33=_ms.get(_$3,"empty!"),empty_63=_ms.get(_$3,"empty?"),iterator=_ms.get(_$3,"iterator"),_64map=_ms.get(_$3,"@map"),_$4=_ms.getModule(_63_4),un_45_63=_ms.get(_$4,"un-?"),Seq=_ms.getDefaultExport(Seq_5),_$5=_ms.getModule(Seq_5),_60_43_43_33=_ms.get(_$5,"<++!"),_43_43_62_33=_ms.get(_$5,"++>!"),_63nth=_ms.get(_$5,"?nth"),_63_60pop_33=_ms.get(_$5,"?<pop!"),_63pop_62_33=_ms.get(_$5,"?pop>!"),_64reverse=_ms.get(_$5,"@reverse");
		let Deque=exports.default=(()=>{
			let _=class Deque{
				constructor(){
					let _this=this;
					_this.data=Array(8);
					_this["start-index"]=0;
					_this["end-index"]=0
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
						if(_ms.eq(new_45start,_this["end-index"])){
							_this["expand!"]();
							_60_43_43_33(_this,[_])
						} else {
							_this["start-index"]=new_45start;
							_ms.setSub(_this.data,_this["start-index"],_)
						}
					}
				}
				[_ms.symbol(_43_43_62_33)](ems){
					let _this=this;
					_ms.checkInstance(_64,ems,"ems");
					for(let _ of ems){
						let new_45end=_this["next-index"](_this["end-index"]);
						if(_ms.eq(new_45end,_this["start-index"])){
							_this["expand!"]();
							_43_43_62_33(_this,[_])
						} else {
							_ms.setSub(_this.data,_this["end-index"],_);
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
					_ms.setSub(_this.data,data_45index,set_45to)
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
					let new_45capacity=(2*old_45capacity);
					let new_45data=new (Array)(new_45capacity);
					for(let _ of _ms.range(0,old_45capacity,true)){
						_ms.setSub(new_45data,_,_ms.sub(old_45data,_))
					};
					_this.data=new_45data
				}
				"wrap-index"(index){
					let _this=this;
					return modulo(index,_this.capacity)
				}
				"next-index"(index){
					let _this=this;
					return _this["wrap-index"]((index+1))
				}
				"prev-index"(index){
					let _this=this;
					return _this["wrap-index"]((index-1))
				}
				get "wrapped?"(){
					let _this=this;
					return (_this["end-index"]<_this["start-index"])
				}
				"?data-index"(index){
					let _this=this;
					let a=(_this["start-index"]+index);
					return (()=>{
						if((a<_this.capacity)){
							return ((_this["wrapped?"]||(a<_this["end-index"]))?_ms.some((()=>{
								return a
							})()):_ms.None)
						} else {
							let b=_this["wrap-index"](a);
							return ((_this["wrapped?"]&&(b<_this["end-index"]))?_ms.some((()=>{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9TZXEvRGVxdWUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFRQSwwQkFBYTs7SUFJSCxhQUFBOztLQUFSLFdBQVMsTUFBTTtLQUNmLHFCQUFnQjtLQUNoQixtQkFBYztJQUFBO0lBRWYsYUFBQyxZQUNhOztLQUFiLFlBQ2M7TUFBYixHQUFBLGtCQUNTO2NBQVIscUJBQUkscUJBQWdCLE1BQU0sNEJBQU8sRUFBSzthQUVuQzt3QkFBSCxxQkFBZ0I7OztLQUNkLFFBQUEsS0FBQSxRQUNPO3FCQUFKLFdBQU87S0FBQTtJQUFBO0lBRWYsWUFBQyxlQUFRLElBQ0s7O3VCQUREO0tBQ1IsUUFBQSxLQUFBLFdBQVMsS0FDRztNQUFmLGdCQUFZLG9CQUFZO01BRXBCLFVBQUEsWUFBVSxvQkFDVTtPQUF0QjtPQUNBLGFBQUssTUFBSyxDQUFFO01BQUEsT0FFVDtPQUFILHFCQUFnQjtrQkFDaEIsV0FBTSxxQkFBa0I7TUFBQTtLQUFBO0lBQUE7SUFFNUIsWUFBQyxlQUFRLElBQ0s7O3VCQUREO0tBQ1IsUUFBQSxLQUFBLElBQ0c7TUFBTixjQUFVLG9CQUFZO01BRWxCLFVBQUEsVUFBUSxzQkFDWTtPQUF0QjtPQUNBLGFBQUssTUFBSyxDQUFFO01BQUEsT0FFVDtrQkFBSCxXQUFNLG1CQUFnQjtPQUN0QixtQkFBYztNQUFBO0tBQUE7SUFBQTtJQUlsQixZQUFDLGdCQUNTOztZQUFGLENBQUEsU0FBTyw4QkFDSTthQUFaLEtBQ21CO3FCQURuQixXQUFNO09BQ1YscUJBQWdCLG9CQUFZOzs7OztJQUUvQixZQUFDLGdCQUNTOztZQUFGLENBQUEsU0FBTyw4QkFDSTtNQUFqQixjQUFVLG9CQUFZO01BQ3RCLG1CQUFjO3FCQUNkLFdBQU07S0FBQTtJQUFBO0lBRVIsWUFBQyxTQUFPLE1BQ1M7O3VCQURIO1lBRWIsT0FBTSxxQkFBYSxPQUFTLEdBQ0E7cUJBQTNCLFdBQU87S0FBQTtJQUFBO0lBRVQsWUFBQyxlQUFZLE1BQVUsU0FDVTs7dUJBRGQ7dUJBQVc7S0FDN0IsaUJBQWEsU0FBTSxxQkFBYSxvQkFBUyxzQkFBb0IsbUJBQWtCLE1BQU07Z0JBQ3JGLFdBQU0sYUFBZTtJQUFBO0lBRXRCLFlBQUMsWUFDVTs7S0FBVixTQUFPO0tBQ1AscUJBQWdCO0tBQ2hCLG1CQUFjO0lBQUE7SUFFWixjQUNZOztZQUFkLE1BQU07O2VBR007O0tBQVosZUFBVztLQUNYLG1CQUFlO0tBQ2YsbUJBQWUsQ0FBRSxFQUFFO0tBQ25CLGVBQVcsS0FBSSxPQUFNO0tBQ2pCLFFBQUEsZUFBQSxFQUFJLHFCQUNZO2lCQUFuQixXQUFVLFVBQUssV0FBVTtLQUFBO0tBQzFCLFdBQVM7SUFBQTtpQkFFSyxNQUNLOztZQUFuQixPQUFPLE1BQU07O2lCQUVDLE1BQ0s7O1lBQW5CLG9CQUFZLENBQUUsTUFBTTtJQUFBO2lCQUVOLE1BQ0s7O1lBQW5CLG9CQUFZLENBQUUsTUFBTTtJQUFBO0lBRWxCLGdCQUNZOztZQUFkLENBQUcsbUJBQVc7O2tCQUVDLE1BQ0s7O0tBQXBCLE1BQUksQ0FBRSxxQkFBYTtZQUVmO01BQUgsR0FBQSxDQUFHLEVBQUUsZ0JBQ1M7Y0FBVixDQUFBLENBQUcsbUJBQVUsQ0FBRyxFQUFFLG1DQUNVO2VBQTlCO09BQUE7YUFFRTtPQUFILE1BQUksb0JBQVk7Y0FDYixDQUFBLENBQUksbUJBQVUsQ0FBRyxFQUFFLG1DQUNVO2VBQS9CO09BQUE7Ozs7O2lCQW5HYyIsImZpbGUiOiJhdC9TZXEvRGVxdWUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
