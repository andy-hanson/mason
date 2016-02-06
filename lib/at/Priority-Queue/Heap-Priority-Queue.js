"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../compare","./../../math/Number","./../at","./Priority-Queue"],(exports,compare_0,Number_1,_64_2,Priority_45Queue_3)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(compare_0),lt_63=_ms.get(_$0,"lt?"),_$1=_ms.getModule(Number_1),int_47=_ms.get(_$1,"int/"),_$2=_ms.getModule(_64_2),_43_43_33=_ms.get(_$2,"++!"),count=_ms.get(_$2,"count"),empty_33=_ms.get(_$2,"empty!"),empty_63=_ms.get(_$2,"empty?"),iterator=_ms.get(_$2,"iterator"),Priority_45Queue=_ms.getDefaultExport(Priority_45Queue_3),_$3=_ms.getModule(Priority_45Queue_3),_63pop_33=_ms.get(_$3,"?pop!");
		let Heap_45Priority_45Queue=exports.default=(()=>{
			let _=class Heap_45Priority_45Queue{
				constructor(){
					let _this=this;
					_ms.newProperty(_this,"array",[])
				}
				[_ms.symbol(iterator)](){
					let _this=this;
					return iterator(_this.array)
				}
				[_ms.symbol(_43_43_33)](added){
					let _this=this;
					for(let _ of added){
						add_33(_this.array,_)
					}
				}
				[_ms.symbol(_63pop_33)](){
					let _this=this;
					return (empty_63(_this)?_ms.None:_ms.some((()=>{
						return (()=>{
							let _=_ms.sub(_this.array,0);
							fix_45down_33(_this.array);
							return _
						})()
					})()))
				}
				[_ms.symbol(empty_63)](){
					let _this=this;
					return empty_63(_this.array)
				}
				[_ms.symbol(empty_33)](){
					let _this=this;
					empty_33(_this.array)
				}
			};
			_ms.traitDo(_,Priority_45Queue);
			return _
		})();
		let index_45left_45child=_=>(1+(2*_));
		let index_45parent=_=>(int_47((1+_),2)-1);
		let add_33=function add_33(heap,val){
			heap.push();
			let i_45cur=count(heap);
			for(;;){
				if(_ms.eq(i_45cur,0)){
					_ms.setSub(heap,0,val,"mutate");
					break
				};
				let i_45parent=index_45parent(i_45cur);
				let parent=_ms.sub(heap,i_45parent);
				if(! (val<parent)){
					_ms.setSub(heap,i_45cur,val,"mutate");
					break
				};
				_ms.setSub(heap,i_45cur,parent,"mutate");
				i_45cur=i_45parent
			}
		};
		let fix_45down_33=function fix_45down_33(heap){
			let val=heap.pop();
			let size=count(heap);
			if(! _ms.eq(size,0)){
				let i_45cur=0;
				let go_33=function go_33(goto_45idx){
					_ms.setSub(heap,i_45cur,_ms.sub(heap,goto_45idx),"mutate");
					i_45cur=goto_45idx
				};
				let ok_45index_63=_=>lt_63(_,size);
				for(;;){
					let i_45left_45child=index_45left_45child(i_45cur);
					if(! ok_45index_63(i_45left_45child)){
						break
					};
					let left=_ms.sub(heap,i_45left_45child);
					let i_45right_45child=(i_45left_45child+1);
					if(! ok_45index_63(i_45right_45child)){
						if(lt_63(left,val)){
							go_33(i_45left_45child)
						};
						break
					};
					let right=_ms.sub(heap,i_45right_45child);
					if(lt_63(left,val)){
						go_33((lt_63(right,left)?i_45right_45child:i_45left_45child))
					} else if(lt_63(right,val)){
						go_33(i_45right_45child)
					} else {
						break
					}
				};
				_ms.setSub(heap,i_45cur,val,"mutate")
			}
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9Qcmlvcml0eS1RdWV1ZS9IZWFwLVByaW9yaXR5LVF1ZXVlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBTUEsNENBQTJCOztJQUlqQixhQUFBOztxQkFBUixjQUFTO0lBQUE7SUFFVixZQUFDLFlBQ1c7O1lBQVgsU0FBUzs7SUFFVixZQUFDLFlBQU8sTUFDSzs7S0FBUixRQUFBLEtBQUEsTUFDSztNQUFSLE9BQUssWUFBUTtLQUFBO0lBQUE7SUFFZixZQUFDLGFBQ1E7O1lBQUQsQ0FBQSxTQUFPLDhCQUNJO2FBQVosS0FDUztxQkFEVCxZQUFPO09BQ1gsY0FBVTs7Ozs7SUFFYixZQUFDLFlBQ1M7O1lBQVQsU0FBTzs7SUFFUixZQUFDLFlBQ1U7O0tBQVYsU0FBTzs7O2lCQXRCd0I7OztFQTJCaEMsNEJBQXFCLENBQUUsRUFBRSxDQUFFLEVBQUc7RUFDOUIsc0JBQWlCLENBQUcsT0FBTSxDQUFFLEVBQUcsR0FBRSxHQUFHO0VBRXBDLFdBQVMsZ0JBQUEsS0FBSyxJQUNHO0dBRWhCO0dBQ0EsWUFBUSxNQUFNO0dBRVgsT0FBQTtJQUFDLFVBQUcsUUFBTSxHQUNDO2dCQUFaLEtBQUssRUFBTTtLQUNYO0lBQUE7SUFDRCxlQUFXLGVBQWE7SUFDeEIsbUJBQVMsS0FBSztJQUNQLEtBQUEsQ0FBRyxJQUFJLFFBQ007Z0JBQW5CLEtBQUssUUFBVTtLQUNmO0lBQUE7ZUFDRCxLQUFLLFFBQVU7WUFDTjtHQUFBO0VBQUE7RUFFWCxrQkFBYyx1QkFBQSxLQUNJO0dBQWpCLFFBQU07R0FDTixTQUFPLE1BQU07R0FDTixZQUFHLEtBQUssR0FDQztJQUlmLFlBQVE7SUFDUixVQUFRLGVBQUEsV0FDUTtnQkFBZixLQUFLLGdCQUFVLEtBQUs7YUFDWDtJQUFBO0lBQ1YscUJBQWMsTUFBSyxFQUFDO0lBRWpCLE9BQUE7S0FBRixxQkFBZSxxQkFBaUI7S0FDekIsS0FBQSxjQUFVLGtCQUNZO01BQTVCO0tBQUE7S0FDRCxpQkFBTyxLQUFLO0tBQ1osc0JBQWdCLENBQUUsaUJBQWE7S0FDeEIsS0FBQSxjQUFVLG1CQUNhO01BQTFCLEdBQUEsTUFBSSxLQUFLLEtBQ0c7T0FBZCxNQUFJO01BQUE7TUFDTDtLQUFBO0tBQ0Qsa0JBQVEsS0FBSztLQUVULEdBQUgsTUFBSSxLQUFLLEtBQ0c7TUFBWCxNQUFTLENBQUMsTUFBSSxNQUFNLE1BQU0sa0JBQWM7S0FBQSxPQUN6QyxHQUFBLE1BQUksTUFBTSxLQUNHO01BQVosTUFBSTtLQUFBLE9BRUQ7TUFBSDtLQUFBO0lBQUE7ZUFDSCxLQUFLLFFBQVUiLCJmaWxlIjoiYXQvUHJpb3JpdHktUXVldWUvSGVhcC1Qcmlvcml0eS1RdWV1ZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
