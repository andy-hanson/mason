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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9TZXEvRGVxdWUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFVQSwwQkFBYTs7SUFJSCxhQUFBO1NBdUZGO3FCQUFBLGFBdkZFLE1BQU07cUJBdUZSLG9CQXRGUztxQkFzRlQsa0JBckZPO0lBQUE7aUJBRWQsWUFDWTtTQWtGTDtLQWxGTixZQUNjO01BQWIsR0FpRkssa0JBaEZJO2NBQVIscUJBZ0ZJLHFCQWhGZ0IsTUFnRmhCLDRCQWhGNkIsRUFnRjdCO2FBOUVEO3dCQThFQzs7O0tBN0VGLFFBQUEsS0FBQSxRQUNPO3FCQTRFTCxXQTVFUTtLQUFBO0lBQUE7Z0JBRWYsZUFBTyxJQUNLO1NBeUVMO3VCQTFFSTtLQUNOLFFBQUEsS0FBQSxXQUFTLEtBQ0c7TUFBZixnQkF3RUs7TUF0RUQsR0FBSCxPQUFHLFlBc0VDLG9CQXJFbUI7T0FxRW5CO09BcEVILGFBb0VHLE1BcEVPLENBQUU7TUFBQSxPQUVUO09Ba0VBLHFCQWxFYTtrQkFrRWIsZ0NBakVxQjs7OztnQkFFNUIsZUFBTyxJQUNLO1NBOERMO3VCQS9ESTtLQUNOLFFBQUEsS0FBQSxJQUNHO01BQU4sY0E2REs7TUEzREQsR0FBSCxPQUFHLFVBMkRDLHNCQTFEbUI7T0EwRG5CO09BekRILGFBeURHLE1BekRPLENBQUU7TUFBQSxPQUVUO2tCQXVEQSw4QkF2RG1CO09BdURuQixtQkF0RFc7TUFBQTtLQUFBO0lBQUE7Z0JBSWxCLGdCQUNRO1NBaUREO1lBakRDLENBQUEsU0FpREQsOEJBaERZO2FBQVosS0FDbUI7cUJBK0NuQjtPQUFBOzs7OztnQkE3Q1AsZ0JBQ1E7U0E0Q0Q7WUE1Q0MsQ0FBQSxTQTRDRCw4QkEzQ1k7TUFBakIsY0EyQ0s7TUFBQSxtQkExQ1M7cUJBMENULFdBekNDO0tBQUE7SUFBQTtnQkFFUixTQUFNLE1BQ1M7U0FzQ1I7dUJBdkNLO1lBRVgsT0FxQ00scUJBckNhLE9BQVMsR0FDQTtxQkFvQ3RCLFdBcENFO0tBQUE7SUFBQTtnQkFFVCxlQUFXLE1BQVUsU0FDVTtTQWlDeEI7dUJBbENVO3VCQUFXO0tBQzNCLGlCQUFhLFNBaUNQLHFCQWpDMEIsb0JBQVMsc0JBQW9CLG1CQUFrQixNQWlDekU7Z0JBQUEsV0FoQ0EsYUFBZTs7Z0JBRXRCLFlBQ1M7U0E2QkY7S0E3Qk4sU0E2Qk07S0FBQSxxQkE1QlU7S0E0QlYsbUJBM0JRO0lBQUE7a0JBR0M7U0F3QlQ7WUF4Qk4sTUF3Qk07O2VBckJPO1NBcUJQO0tBckJOLGVBcUJNO0tBcEJOLG1CQW9CTTtLQW5CTixtQkFBZSxJQUFFLEVBQUU7S0FDbkIsZUFBVyxLQUFJLE9BQU07S0FDakIsUUFBQSxlQUFBLEVBQUkscUJBQ1k7aUJBQW5CLFdBQVUsVUFBSSxXQUFVOztLQWdCbkIsV0FmRztJQUFBO2lCQUVNLE1BQ0s7U0FZZDtZQVpOLE9BQU8sTUFZRDs7aUJBVlMsTUFDSztTQVNkO1lBQUEsb0JBVE8sSUFBRSxNQUFNO0lBQUE7aUJBRU4sTUFDSztTQU1kO1lBQUEsb0JBTk8sSUFBRSxNQUFNO0lBQUE7b0JBR047U0FHVDtZQUhOLE9BR007O2tCQURVLE1BQ0s7U0FBZjtLQUFOLE1BQUksSUFBRSxxQkFBYTtZQUVmO01BQUgsR0FBQSxPQUFHLEVBRkUsZ0JBR1M7Y0FBVixDQUFBLENBSEMsbUJBR2EsT0FBRyxFQUhoQixtQ0FJNkI7ZUFBaEM7T0FBQTthQUVFO09BQUgsTUFOSSxvQkFNWTtjQUNiLENBQUEsQ0FQQyxtQkFPYyxPQUFHLEVBUGpCLG1DQVE4QjtlQUFqQztPQUFBOzs7OztpQkFuR2MiLCJmaWxlIjoiYXQvU2VxL0RlcXVlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
