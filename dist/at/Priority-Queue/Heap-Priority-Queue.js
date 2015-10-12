"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../compare","./../../math/Number","./../../math/methods","./../../Type/Kind","./../at","./../at-Type","./Priority-Queue"],(exports,compare_0,Number_1,methods_2,Kind_3,_64_4,_64_45Type_5,Priority_45Queue_6)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_60_63=_ms.get(_$0,"<?"),_$1=_ms.getModule(Number_1),int_47=_ms.get(_$1,"int/"),_$2=_ms.getModule(methods_2),_43=_ms.get(_$2,"+"),_45=_ms.get(_$2,"-"),_42=_ms.get(_$2,"*"),_$3=_ms.getModule(Kind_3),kind_33=_ms.get(_$3,"kind!"),self_45kind_33=_ms.get(_$3,"self-kind!"),_$4=_ms.getModule(_64_4),_43_43_33=_ms.get(_$4,"++!"),count=_ms.get(_$4,"count"),empty_33=_ms.get(_$4,"empty!"),empty_63=_ms.get(_$4,"empty?"),iterator=_ms.get(_$4,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_5),_$5=_ms.getModule(_64_45Type_5),empty=_ms.get(_$5,"empty"),Priority_45Queue=_ms.getDefaultExport(Priority_45Queue_6),_$6=_ms.getModule(Priority_45Queue_6),_63pop_33=_ms.get(_$6,"?pop!");
		const Heap_45Priority_45Queue=exports.default=(()=>{
			const _=class Heap_45Priority_45Queue{
				static [_ms.symbol(empty)](){
					const _this=this;
					return new (_this)()
				}
				constructor(){
					_ms.newProperty(this,"array",[])
				}
				[_ms.symbol(iterator)](){
					const _this=this;
					return iterator(_this.array)
				}
				[_ms.symbol(_43_43_33)](added){
					const _this=this;
					for(let _ of added){
						add_33(_this.array,_)
					}
				}
				[_ms.symbol(_63pop_33)](){
					const _this=this;
					return (empty_63(_this)?_ms.None:_ms.some((()=>{
						return (_=>{
							fix_45down_33(_this.array);
							return _
						})(_ms.sub(_this.array,0))
					})()))
				}
				[_ms.symbol(empty_63)](){
					const _this=this;
					return empty_63(_this.array)
				}
				[_ms.symbol(empty_33)](){
					const _this=this;
					empty_33(_this.array)
				}
			};
			self_45kind_33(_,_64_45Type);
			kind_33(_,Priority_45Queue);
			return _
		})();
		const index_45left_45child=function index_45left_45child(idx){
			return _43(1,_42(2,idx))
		};
		const index_45parent=function index_45parent(idx){
			return _45(int_47(_43(1,idx),2),1)
		};
		const add_33=function add_33(heap,val){
			heap.push();
			let i_45cur=count(heap);
			for(;;){
				if(_61_63(i_45cur,0)){
					_ms.setSub(heap,0,val,"mutate");
					break
				};
				const i_45parent=index_45parent(i_45cur);
				const parent=_ms.sub(heap,i_45parent);
				if(! _60_63(val,parent)){
					_ms.setSub(heap,i_45cur,val,"mutate");
					break
				};
				_ms.setSub(heap,i_45cur,parent,"mutate");
				i_45cur=i_45parent
			}
		};
		const fix_45down_33=function fix_45down_33(heap){
			const val=heap.pop();
			const size=count(heap);
			if(! _61_63(size,0)){
				let i_45cur=0;
				const go_33=function go_33(goto_45idx){
					_ms.setSub(heap,i_45cur,_ms.sub(heap,goto_45idx),"mutate");
					i_45cur=goto_45idx
				};
				const ok_45index_63=function ok_45index_63(_){
					return _60_63(_,size)
				};
				for(;;){
					const i_45left_45child=index_45left_45child(i_45cur);
					if(! ok_45index_63(i_45left_45child)){
						break
					};
					const left=_ms.sub(heap,i_45left_45child);
					const i_45right_45child=_43(i_45left_45child,1);
					if(! ok_45index_63(i_45right_45child)){
						if(_60_63(left,val)){
							go_33(i_45left_45child)
						};
						break
					};
					const right=_ms.sub(heap,i_45right_45child);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9Qcmlvcml0eS1RdWV1ZS9IZWFwLVByaW9yaXR5LVF1ZXVlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBU0EsOENBQzBCLEtBR3RCO1NBREg7SUFNQyxtQkFBQTtXQXNCTztZQXJCTixLQXFCTTtJQUFBO0lBbEJFO3FCQUFULGFBQVM7SUFBQTtJQUVWLFlBQUE7V0FnQlE7WUFmUCxTQWVPOztJQWJSLFlBQUEsWUFBTTtXQWFFO0tBWkYsUUFBQSxLQUFBLE1BQ0s7TUFBVCxPQVdNLFlBWE07S0FBQTtJQUFBO0lBRWQsWUFBQTtXQVNRO1lBUlAsQ0FBTyxTQVFBLDhCQVBXO2FBQVosSUFDUztPQUFiLGNBTUs7O2lCQUFBLFlBUE07S0FBQTtJQUFBO0lBR2QsWUFBQTtXQUlRO1lBSFAsU0FHTzs7SUFEUixZQUFBO1dBQ1E7S0FBUCxTQUFPOzs7R0EzQlAsZUFBVyxFQUFFO0dBQ2IsUUFBTSxFQUFFO1VBRlQ7RUFBQTtFQWlDQSwyQkFBb0IsOEJBQUE7VUFDbkIsSUFBRSxFQUFHLElBQUUsRUFBRTtFQUFBO0VBQ1YscUJBQWdCLHdCQUFBO1VBQ2YsSUFBRyxPQUFNLElBQUUsRUFBRSxLQUFLLEdBQUc7RUFBQTtFQUV0QixhQUFTLGdCQUFBLEtBQUs7R0FHYjtHQUNBLFlBQVUsTUFBTTtHQUVaLE9BQUE7SUFBSCxHQUFJLE9BQUcsUUFBTSxHQUNDO2dCQUFiLEtBQUssRUFBTTtLQUNYO0lBQUE7SUFDRCxpQkFBVyxlQUFhO0lBQ3hCLHFCQUFTLEtBQUs7SUFDZCxLQUFRLE9BQUcsSUFBSSxRQUNNO2dCQUFwQixLQUFLLFFBQVU7S0FDZjtJQUFBO2VBQ0QsS0FBSyxRQUFVO1lBQ047R0FBQTtFQUFBO0VBRVgsb0JBQWMsdUJBQUE7R0FDYixVQUFNO0dBQ04sV0FBTyxNQUFNO0dBQ2IsS0FBUSxPQUFHLEtBQUssR0FDQztJQUloQixZQUFVO0lBQ1YsWUFBUSxlQUFBO2dCQUNQLEtBQUssZ0JBQVUsS0FBSzthQUNYO0lBQUE7SUFDVixvQkFBYSx1QkFBQTtZQUNaLE9BQUcsRUFBRTtJQUFBO0lBRUYsT0FBQTtLQUFILHVCQUFlLHFCQUFpQjtLQUNoQyxLQUFRLGNBQVUsa0JBQ1k7TUFBN0I7S0FBQTtLQUNELG1CQUFPLEtBQUs7S0FDWix3QkFBZ0IsSUFBRSxpQkFBYTtLQUMvQixLQUFRLGNBQVUsbUJBQ2E7TUFBOUIsR0FBSSxPQUFHLEtBQUssS0FDRztPQUFkLE1BQUk7TUFBQTtNQUNMO0tBQUE7S0FDRCxvQkFBUSxLQUFLO0tBRVIsR0FBSixPQUFHLEtBQUssS0FDRztNQUFWLE1BQVMsQ0FBQyxPQUFHLE1BQU0sTUFBTSxrQkFBYztLQUFBLE9BQ3hDLEdBQUEsT0FBRyxNQUFNLEtBQ0c7TUFBWCxNQUFJO0tBQUEsT0FFRDtNQUFIO0tBQUE7SUFBQTtlQUNILEtBQUssUUFBVSIsImZpbGUiOiJhdC9Qcmlvcml0eS1RdWV1ZS9IZWFwLVByaW9yaXR5LVF1ZXVlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
