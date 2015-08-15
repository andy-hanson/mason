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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvQC9TZXEvRGVxdWUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFhQSxZQUNZLEtBQ1I7U0FESDt1QkFNQyxTQUNPO1dBaUVQO1lBakVDLEtBaUVEO0lBQUE7aUJBOURTOzRCQUFULGFBQVcsTUFBTTs0QkFDakIsb0JBQWtCOzRCQUNsQixrQkFBZ0I7SUFBQTtpQkFJakIsWUFDWTtXQXVEWDtLQXZEQSxjQUNjO01BQWIsR0FBQSxPQXNERCwyQ0FyRDZCO2NBQTNCLFVBQUssS0FBSSxPQXFEWCxzQkFyRGdDLE1BcURoQyxpQkFyRGdELEtBQUksT0FBTSxFQXFEMUQ7YUFuREs7Y0FBSCxLQUFJLE9BbUROOzs7S0FsREssUUFBQSxLQUFBLFFBQ087cUJBaURaLGVBakRXO0tBQUE7SUFBQTtnQkFFWixlQUFPLElBQ0s7V0E4Q1g7dUJBL0NVO0tBQ0wsUUFBQSxNQUFNLFFBQVEsS0FDRztNQUFyQixrQkFBWSxhQTZDYjtNQTNDTSxHQUFKLE9BQUcsWUEyQ0wscUJBMUMwQjtPQUF2QixVQTBDSDtPQXpDRyxhQXlDSCxNQXpDYSxDQUFFO01BQUEsT0FFVDtPQXVDTixzQkF2Q29CO09BQ2pCLGFBc0NILHFDQXRDaUM7TUFBQTtLQUFBO0lBQUE7Z0JBSWxDLGVBQU8sSUFDSztXQWlDWDt1QkFsQ1U7S0FDTCxRQUFBLE1BQU0sSUFDRztNQUFiLGdCQUFVLGFBZ0NYO01BOUJNLEdBQUosT0FBRyxVQThCTCx1QkE3QjBCO09BQXZCLFVBNkJIO09BNUJHLGFBNEJILE1BNUJhLENBQUU7TUFBQSxPQUVUO09BQUgsYUEwQkgsbUNBMUIrQjtPQTBCL0Isb0JBekJrQjtNQUFBO0tBQUE7SUFBQTtnQkFJbkIsZ0JBQ1E7V0FvQlA7WUFwQk8sU0FvQlAsOEJBbkJrQjthQUFaLElBQ3FCO09Ba0IzQixzQkFsQm1CLGFBa0JuQjs7aUJBQUE7OztnQkFoQkQsZ0JBQ1E7V0FlUDtZQWZPLFNBZVAsOEJBZGtCO01BQWpCLGdCQUFVLGFBY1g7TUFBQSxvQkFiZ0I7cUJBYWhCLGVBWlE7S0FBQTtJQUFBO2dCQUVULFNBQU0sTUFDUztXQVNkO3VCQVZXO1lBQ1gsSUFBSyxnQkFTTCxNQVRzQixlQUFPLElBUzdCOztnQkFQRCxlQUFXLE1BQVUsU0FDVTtXQU05Qjt1QkFQZ0I7dUJBQVc7S0FDM0IsbUJBQWEsU0FBTSxnQkFNbkIsTUFOb0M7YUFBUyxzQkFBb0IsbUJBQWtCLE1BTW5GOztLQUxBLGFBS0EsZUFMZ0IsYUFBVztJQUFBO2dCQUU1QixZQUNTO1dBRVI7S0FGQSxTQUVBO0tBQUEsc0JBRGlCO0tBQ2pCLG9CQUFlO0lBQUE7R0FBQTtHQXZFZixlQUFXLEVBQUU7R0FDYixRQUFNLEVBQUU7VUFGVDtFQUFBO0VBMkVBLGVBQVksa0JBQUEsRUFDQztVQUFaLE1BQU07O0VBRVAsZ0JBQVksbUJBQUEsRUFDQztHQUFaLGlCQUFXO0dBQ1gscUJBQWUsU0FBUTtHQUN2QixxQkFBZSxJQUFFLEVBQUU7R0FDbkIsaUJBQVcsTUFBTTtHQUNaLFFBQUEsU0FBUyxLQUFJLE9BQU0sRUFBRSxnQkFDWTtJQUFyQyxhQUFTLFdBQVMsY0FBTSxXQUFTO0dBQUE7R0FDbEMsV0FBVztFQUFBO0VBRVosbUJBQWMsc0JBQUEsRUFBRSxNQUNLO1VBQXBCLE9BQU8sTUFBTSxTQUFRO0VBQUE7RUFFdEIsbUJBQWMsc0JBQUEsRUFBRSxNQUNTO3FCQURIO1VBQ3JCLGFBQVcsRUFBRyxJQUFFLE1BQU07RUFBQTtFQUV2QixtQkFBYyxzQkFBQSxFQUFFLE1BQ1M7cUJBREg7VUFDckIsYUFBVyxFQUFHLElBQUUsTUFBTTtFQUFBO0VBRXZCLHNCQUFlLHlCQUFBLEVBQUUsTUFDUztxQkFESDtHQUN0QixRQUFJLElBQUUsa0JBQWU7VUFFakI7SUFBSCxHQUFBLE9BQUcsRUFBRSxTQUFRLElBQ0M7WUFBVixDQUFJLE9BQUcsZ0JBQWEsb0JBQWlCLE9BQUcsRUFBRSxnQ0FDYTthQUF6RDtLQUFBO1dBRUU7S0FBSCxRQUFJLGFBQVcsRUFBRTtZQUNkLENBQUssT0FBRyxnQkFBYSxvQkFBaUIsT0FBRyxFQUFFLGdDQUNhO2FBQTFEO0tBQUE7Ozs7RUF2SEwsd0JBQUE7a0JBYUEiLCJmaWxlIjoiYXQvU2VxL0RlcXVlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=