"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../compare","./../../math/Number","./../../math/methods","./../../methods","./../../Type/Kind","./../../Type/Pred-Type","./../at","./../at-Type","./../q","./../Range","./Seq"],(exports,compare_0,Number_1,methods_2,methods_3,Kind_4,Pred_45Type_5,_64_6,_64_45Type_7,_63_8,Range_9,Seq_10)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_60_63=_ms.get(_$0,"<?"),_$1=_ms.getModule(Number_1),modulo=_ms.get(_$1,"modulo"),Nat=_ms.get(_$1,"Nat"),_$2=_ms.getModule(methods_2),_43=_ms.get(_$2,"+"),_45=_ms.get(_$2,"-"),_42=_ms.get(_$2,"*"),_$3=_ms.getModule(methods_3),set_45sub_33=_ms.get(_$3,"set-sub!"),_$4=_ms.getModule(Kind_4),kind_33=_ms.get(_$4,"kind!"),self_45kind_33=_ms.get(_$4,"self-kind!"),_$5=_ms.getModule(Pred_45Type_5),Any=_ms.get(_$5,"Any"),_64=_ms.getDefaultExport(_64_6),_$6=_ms.getModule(_64_6),_43_43_126=_ms.get(_$6,"++~"),count=_ms.get(_$6,"count"),empty_33=_ms.get(_$6,"empty!"),empty_63=_ms.get(_$6,"empty?"),iterator=_ms.get(_$6,"iterator"),_64map=_ms.get(_$6,"@map"),_64_45Type=_ms.getDefaultExport(_64_45Type_7),_$7=_ms.getModule(_64_45Type_7),empty=_ms.get(_$7,"empty"),_$8=_ms.getModule(_63_8),un_45_63=_ms.get(_$8,"un-?"),Range=_ms.getDefaultExport(Range_9),Seq=_ms.getDefaultExport(Seq_10),_$9=_ms.getModule(Seq_10),_60_43_43_33=_ms.get(_$9,"<++!"),_43_43_62_33=_ms.get(_$9,"++>!"),_63nth=_ms.get(_$9,"?nth"),_63_60pop_33=_ms.get(_$9,"?<pop!"),_63pop_62_33=_ms.get(_$9,"?pop>!"),_64reverse=_ms.get(_$9,"@reverse");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9TZXEvRGVxdWUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFhQSw0QkFDWSxLQUdSO1NBREg7SUFNQyxtQkFBQTtXQWdFQTtZQS9EQyxLQStERDtJQUFBO0lBNURTOzRCQUFULGFBQVcsTUFBTTs0QkFDakIsb0JBQWtCOzRCQUNsQixrQkFBZ0I7SUFBQTtJQUVqQixhQUFBO1dBd0RDO0tBdkRBLGNBQ2M7TUFBYixHQUFBLE9Bc0RELDJDQXJENkI7Y0FBM0IsV0FBSyxLQUFJLE9BcURYLHNCQXJEZ0MsTUFxRGhDLGlCQXJEZ0QsS0FBSSxPQUFNLEVBcUQxRDthQW5ESztjQUFILEtBQUksT0FtRE47OztLQWxESyxRQUFBLEtBQUEsUUFDTztxQkFpRFosZUFqRFc7S0FBQTtJQUFBO0lBRVosWUFBQSxlQUFPO1dBK0NOO3VCQS9DVTtLQUNMLFFBQUEsS0FBQSxXQUFTLEtBQ0c7TUFBaEIsa0JBQVksYUE2Q2I7TUEzQ00sR0FBSixPQUFHLFlBMkNMLHFCQTFDMEI7T0FBdkIsVUEwQ0g7T0F6Q0csYUF5Q0gsTUF6Q2EsQ0FBQztNQUFBLE9BRVI7T0F1Q04sc0JBdkNvQjtrQkF1Q3BCLHFDQXRDNEI7Ozs7SUFFN0IsWUFBQSxlQUFPO1dBb0NOO3VCQXBDVTtLQUNMLFFBQUEsS0FBQSxJQUNHO01BQVAsZ0JBQVUsYUFrQ1g7TUFoQ00sR0FBSixPQUFHLFVBZ0NMLHVCQS9CMEI7T0FBdkIsVUErQkg7T0E5QkcsYUE4QkgsTUE5QmEsQ0FBQztNQUFBLE9BRVI7a0JBNEJOLG1DQTVCMEI7T0E0QjFCLG9CQTNCa0I7TUFBQTtLQUFBO0lBQUE7SUFJbkIsWUFBQTtXQXVCQztZQXRCQSxDQUFPLFNBc0JQLDhCQXJCa0I7YUFBWixJQUNxQjtPQW9CM0Isc0JBcEJtQixhQW9CbkI7O2lCQUFBOzs7SUFsQkQsWUFBQTtXQWtCQztZQWpCQSxDQUFPLFNBaUJQLDhCQWhCa0I7TUFBakIsZ0JBQVUsYUFnQlg7TUFBQSxvQkFmZ0I7cUJBZWhCLGVBZFE7S0FBQTtJQUFBO0lBRVQsWUFBQSxTQUFNO1dBWUw7dUJBWlc7WUFFWCxPQUFNLGdCQVVOLE1BVnVCLE9BQVE7cUJBVS9CLGVBVFE7S0FBQTtJQUFBO0lBRVQsWUFBQSxlQUFXLE1BQVU7V0FPcEI7dUJBUGdCO3VCQUFXO0tBQzNCLG1CQUFhLFNBQU0sZ0JBTW5CLE1BTm9DLG9CQUFTLHNCQUFvQixtQkFBa0IsTUFNbkY7Z0JBQUEsZUFMTyxhQUFlOztJQUV2QixZQUFBO1dBR0M7S0FGQSxTQUVBO0tBQUEsc0JBRGlCO0tBQ2pCLG9CQUFlO0lBQUE7R0FBQTtHQXJFZixlQUFXLEVBQUU7R0FDYixRQUFNLEVBQUU7VUFGVDtFQUFBO0VBeUVBLGVBQVksa0JBQUE7VUFDWCxNQUFNOztFQUVQLGdCQUFZLG1CQUFBO0dBQ1gsaUJBQVc7R0FDWCxxQkFBZSxTQUFBO0dBQ2YscUJBQWUsSUFBRSxFQUFFO0dBQ25CLGlCQUFXLE1BQU07R0FDWixRQUFBLFNBQVMsS0FBSSxPQUFNLEVBQUUsZ0JBQ1k7ZUFBckMsV0FBUyxjQUFTLFdBQVM7O0dBQzVCLFdBQVc7RUFBQTtFQUVaLG1CQUFjLHNCQUFBLEVBQUU7VUFDZixPQUFPLE1BQU0sU0FBQTtFQUFBO0VBRWQsbUJBQWMsc0JBQUEsRUFBRTtxQkFBTTtVQUNyQixhQUFXLEVBQUcsSUFBRSxNQUFNO0VBQUE7RUFFdkIsbUJBQWMsc0JBQUEsRUFBRTtxQkFBTTtVQUNyQixhQUFXLEVBQUcsSUFBRSxNQUFNO0VBQUE7RUFFdkIsc0JBQWUseUJBQUEsRUFBRTtxQkFBTTtHQUN0QixRQUFJLElBQUUsa0JBQWU7VUFFakI7SUFBSCxHQUFBLE9BQUcsRUFBRSxTQUFBLElBQ1M7WUFBYixDQUFHLENBQUksT0FBRyxnQkFBYSxvQkFBaUIsT0FBRyxFQUFFLGdDQUNhO2FBQXpEO0tBQUE7V0FFRTtLQUFILFFBQUksYUFBVyxFQUFFO1lBQ2pCLENBQUcsQ0FBSyxPQUFHLGdCQUFhLG9CQUFpQixPQUFHLEVBQUUsZ0NBQ2E7YUFBMUQ7S0FBQSIsImZpbGUiOiJhdC9TZXEvRGVxdWUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
