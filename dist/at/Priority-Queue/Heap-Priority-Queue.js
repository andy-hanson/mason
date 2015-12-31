"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../compare","./../../math/Number","./../../math/methods","./../at","./Priority-Queue"],(exports,compare_0,Number_1,methods_2,_64_3,Priority_45Queue_4)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_60_63=_ms.get(_$0,"<?"),_$1=_ms.getModule(Number_1),int_47=_ms.get(_$1,"int/"),_$2=_ms.getModule(methods_2),_43=_ms.get(_$2,"+"),_45=_ms.get(_$2,"-"),_42=_ms.get(_$2,"*"),_$3=_ms.getModule(_64_3),_43_43_33=_ms.get(_$3,"++!"),count=_ms.get(_$3,"count"),empty_33=_ms.get(_$3,"empty!"),empty_63=_ms.get(_$3,"empty?"),iterator=_ms.get(_$3,"iterator"),Priority_45Queue=_ms.getDefaultExport(Priority_45Queue_4),_$4=_ms.getModule(Priority_45Queue_4),_63pop_33=_ms.get(_$4,"?pop!");
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
		let index_45left_45child=_=>_43(1,_42(2,_));
		let index_45parent=_=>_45(int_47(_43(1,_),2),1);
		let add_33=function add_33(heap,val){
			heap.push();
			let i_45cur=count(heap);
			for(;;){
				if(_61_63(i_45cur,0)){
					_ms.setSub(heap,0,val,"mutate");
					break
				};
				let i_45parent=index_45parent(i_45cur);
				let parent=_ms.sub(heap,i_45parent);
				if(! _60_63(val,parent)){
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
			if(! _61_63(size,0)){
				let i_45cur=0;
				let go_33=function go_33(goto_45idx){
					_ms.setSub(heap,i_45cur,_ms.sub(heap,goto_45idx),"mutate");
					i_45cur=goto_45idx
				};
				let ok_45index_63=_=>_60_63(_,size);
				for(;;){
					let i_45left_45child=index_45left_45child(i_45cur);
					if(! ok_45index_63(i_45left_45child)){
						break
					};
					let left=_ms.sub(heap,i_45left_45child);
					let i_45right_45child=_43(i_45left_45child,1);
					if(! ok_45index_63(i_45right_45child)){
						if(_60_63(left,val)){
							go_33(i_45left_45child)
						};
						break
					};
					let right=_ms.sub(heap,i_45right_45child);
					if(_60_63(left,val)){
						go_33((_60_63(right,left)?i_45right_45child:i_45left_45child))
					} else if(_60_63(right,val)){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9Qcmlvcml0eS1RdWV1ZS9IZWFwLVByaW9yaXR5LVF1ZXVlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBT0EsNENBQTJCOztJQUlqQixhQUFBO1NBa0JEO3FCQUFBLGNBbEJFO0lBQUE7Z0JBRVYsWUFDVTtTQWVGO1lBZlAsU0FlTzs7Z0JBYlIsWUFBTSxNQUNLO1NBWUg7S0FaSCxRQUFBLEtBQUEsTUFDSztNQUFSLE9BV00sWUFYTztLQUFBO0lBQUE7Z0JBRWYsYUFDTztTQVFDO1lBUkEsQ0FBQSxTQVFBLDhCQVBXO2FBQVosS0FDUztxQkFNUixZQVBNO09BQ1gsY0FNSzs7Ozs7Z0JBSlIsWUFDUTtTQUdBO1lBSFAsU0FHTzs7Z0JBRFIsWUFDUztTQUFEO0tBQVAsU0FBTzs7O2lCQXRCd0I7OztFQTJCaEMsNEJBQXFCLElBQUUsRUFBRyxJQUFFLEVBQUc7RUFDL0Isc0JBQWlCLElBQUcsT0FBTSxJQUFFLEVBQUcsR0FBRSxHQUFHO0VBRXBDLFdBQVMsZ0JBQUEsS0FBSyxJQUNHO0dBRWhCO0dBQ0EsWUFBUSxNQUFNO0dBRVgsT0FBQTtJQUFDLEdBQUEsT0FBRyxRQUFNLEdBQ0M7Z0JBQVosS0FBSyxFQUFNO0tBQ1g7SUFBQTtJQUNELGVBQVcsZUFBYTtJQUN4QixtQkFBUyxLQUFLO0lBQ1AsS0FBQSxPQUFHLElBQUksUUFDTTtnQkFBbkIsS0FBSyxRQUFVO0tBQ2Y7SUFBQTtlQUNELEtBQUssUUFBVTtZQUNOO0dBQUE7RUFBQTtFQUVYLGtCQUFjLHVCQUFBLEtBQ0k7R0FBakIsUUFBTTtHQUNOLFNBQU8sTUFBTTtHQUNOLEtBQUEsT0FBRyxLQUFLLEdBQ0M7SUFJZixZQUFRO0lBQ1IsVUFBUSxlQUFBLFdBQ1E7Z0JBQWYsS0FBSyxnQkFBVSxLQUFLO2FBQ1g7SUFBQTtJQUNWLHFCQUFjLE9BQUksRUFBQztJQUVoQixPQUFBO0tBQUYscUJBQWUscUJBQWlCO0tBQ3pCLEtBQUEsY0FBVSxrQkFDWTtNQUE1QjtLQUFBO0tBQ0QsaUJBQU8sS0FBSztLQUNaLHNCQUFnQixJQUFFLGlCQUFhO0tBQ3hCLEtBQUEsY0FBVSxtQkFDYTtNQUExQixHQUFBLE9BQUcsS0FBSyxLQUNHO09BQWIsTUFBSTtNQUFBO01BQ0w7S0FBQTtLQUNELGtCQUFRLEtBQUs7S0FFVCxHQUFILE9BQUcsS0FBSyxLQUNHO01BQVYsTUFBUyxDQUFDLE9BQUcsTUFBTSxNQUFNLGtCQUFjO0tBQUEsT0FDeEMsR0FBQSxPQUFHLE1BQU0sS0FDRztNQUFYLE1BQUk7S0FBQSxPQUVEO01BQUg7S0FBQTtJQUFBO2VBQ0gsS0FBSyxRQUFVIiwiZmlsZSI6ImF0L1ByaW9yaXR5LVF1ZXVlL0hlYXAtUHJpb3JpdHktUXVldWUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
