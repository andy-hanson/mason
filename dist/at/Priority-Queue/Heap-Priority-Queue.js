"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../control","../../math/Number","../../math/methods","../../Type/Method","../../Type/Kind","../../Type/Wrap-Type","../at","../at-Type","../Seq/Seq","./Priority-Queue"],(exports,compare_0,control_1,Number_2,methods_3,Method_4,Kind_5,Wrap_45Type_6,_64_7,_64_45Type_8,Seq_9,Priority_45Queue_10)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_60_63=_ms.get(_$2,"<?"),_$3=_ms.getModule(control_1),returning=_ms.get(_$3,"returning"),_$4=_ms.getModule(Number_2),int_47=_ms.get(_$4,"int/"),_$5=_ms.getModule(methods_3),_43=_ms.get(_$5,"+"),_45=_ms.get(_$5,"-"),_42=_ms.get(_$5,"*"),_$6=_ms.getModule(Method_4),impl_33=_ms.get(_$6,"impl!"),self_45impl_33=_ms.get(_$6,"self-impl!"),_$7=_ms.getModule(Kind_5),kind_33=_ms.get(_$7,"kind!"),self_45kind_33=_ms.get(_$7,"self-kind!"),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_6),_$9=_ms.getModule(_64_7),_43_43_33=_ms.get(_$9,"++!"),count=_ms.get(_$9,"count"),empty_33=_ms.get(_$9,"empty!"),empty_63=_ms.get(_$9,"empty?"),iterator=_ms.get(_$9,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_8),_$10=_ms.getModule(_64_45Type_8),empty=_ms.get(_$10,"empty"),_$11=_ms.getModule(Seq_9),set_45nth_33=_ms.get(_$11,"set-nth!"),Priority_45Queue=_ms.getDefaultExport(Priority_45Queue_10),_$12=_ms.getModule(Priority_45Queue_10),_63pop_33=_ms.get(_$12,"?pop!");
		const Heap_45Priority_45Queue=Wrap_45Type(()=>{
			const built={};
			const doc=built.doc=`Default implementation for Priority-Queue.`;
			const wrapped_45type=built["wrapped-type"]=Array;
			return _ms.setName(built,"Heap-Priority-Queue")
		}());
		self_45kind_33(Heap_45Priority_45Queue,_64_45Type);
		self_45impl_33(empty,Heap_45Priority_45Queue,()=>{
			return Heap_45Priority_45Queue([])
		});
		impl_33(iterator,Heap_45Priority_45Queue,function(){
			const _this=this;
			return iterator(_this.val)
		});
		kind_33(Heap_45Priority_45Queue,Priority_45Queue);
		impl_33(_43_43_33,Heap_45Priority_45Queue,function(added){
			const _this=this;
			for(let em of added){
				add_33(_this.val,em)
			}
		});
		impl_33(_63pop_33,Heap_45Priority_45Queue,function(){
			const _this=this;
			return _ms.bool(empty_63(_this))?_ms.None:_ms.some(()=>{
				return returning(_ms.sub(_this.val,0),()=>{
					fix_45down_33(_this.val)
				})
			}())
		});
		impl_33(empty_63,Heap_45Priority_45Queue,function(){
			const _this=this;
			return empty_63(_this.val)
		});
		impl_33(empty_33,Heap_45Priority_45Queue,function(){
			const _this=this;
			empty_33(_this.val)
		});
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
					set_45nth_33(heap,0,val);
					break
				};
				const i_45parent=index_45parent(i_45cur);
				const parent=_ms.sub(heap,i_45parent);
				if(! _ms.bool(_60_63(val,parent))){
					set_45nth_33(heap,i_45cur,val);
					break
				};
				set_45nth_33(heap,i_45cur,parent);
				i_45cur=i_45parent
			}
		};
		const fix_45down_33=function fix_45down_33(heap){
			const val=heap.pop();
			const size=count(heap);
			if(! _ms.bool(_61_63(size,0))){
				let i_45cur=0;
				const go_33=function go_33(goto_45idx){
					set_45nth_33(heap,i_45cur,_ms.sub(heap,goto_45idx));
					i_45cur=goto_45idx
				};
				const ok_45index_63=function ok_45index_63(_){
					return _60_63(_,size)
				};
				for(;;){
					const i_45left_45child=index_45left_45child(i_45cur);
					if(! _ms.bool(ok_45index_63(i_45left_45child))){
						break
					};
					const left=_ms.sub(heap,i_45left_45child);
					const i_45right_45child=_43(i_45left_45child,1);
					if(! _ms.bool(ok_45index_63(i_45right_45child))){
						if(_60_63(left,val)){
							go_33(i_45left_45child)
						};
						break
					};
					const right=_ms.sub(heap,i_45right_45child);
					if(_ms.bool(_60_63(left,val))){
						go_33(()=>{
							if(_ms.bool(_60_63(right,left))){
								return i_45right_45child
							} else {
								return i_45left_45child
							}
						}())
					} else if(_ms.bool(_60_63(right,val))){
						go_33(i_45right_45child)
					} else {
						break
					}
				};
				set_45nth_33(heap,i_45cur,val)
			}
		};
		const name=exports.name=`Heap-Priority-Queue`;
		exports.default=Heap_45Priority_45Queue;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1ByaW9yaXR5LVF1ZXVlL0hlYXAtUHJpb3JpdHktUXVldWUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFhQSw4QkFBcUIsZ0JBQ1M7O0dBQTdCLG9CQUFNO0dBQ04sMkNBQWM7OztFQUVmLGVBQVcsd0JBQW9CO0VBQy9CLGVBQVcsTUFBTSx3QkFDcUIsSUFBQTtVQUFyQyx3QkFBb0I7RUFBQTtFQUVyQixRQUFNLFNBQVMsd0JBQ3NCLFVBQUE7U0FnQjdCO1VBaEJQLFNBZ0JPOztFQWRSLFFBQU0sd0JBQW9CO0VBRTFCLFFBQU0sVUFBSSx3QkFBdUIsU0FBQSxNQUNLO1NBVzlCO0dBWEYsUUFBQSxNQUFNLE1BQ0s7SUFBZixPQVVNLFVBVkk7R0FBQTtFQUFBO0VBRVosUUFBTSxVQUFNLHdCQUNzQixVQUFBO1NBTzFCO21CQVBBLFNBT0EsOEJBTlc7V0FBakIsa0JBTU0sVUFOUyxHQUNLLElBQUE7S0FBbkIsY0FLSzs7OztFQUhSLFFBQU0sU0FBTyx3QkFDc0IsVUFBQTtTQUUzQjtVQUZQLFNBRU87O0VBRFIsUUFBTSxTQUFPLHdCQUN1QixVQUFBO1NBQTVCO0dBQVAsU0FBTzs7RUFJUCwyQkFBb0IsOEJBQUEsSUFDRztVQUF0QixJQUFFLEVBQUcsSUFBRSxFQUFFO0VBQUE7RUFDVixxQkFBZ0Isd0JBQUEsSUFDRztVQUFsQixJQUFHLE9BQU0sSUFBRSxFQUFFLEtBQUssR0FBRztFQUFBO0VBRXRCLGFBQVMsZ0JBQUEsS0FBSyxJQUNHO0dBRWhCO0dBQ0EsWUFBVSxNQUFNO0dBRVosT0FBQTtJQUFILEdBQUksT0FBRyxRQUFNLEdBQ0M7S0FBYixhQUFTLEtBQUssRUFBRTtLQUNoQjtJQUFBO0lBQ0QsaUJBQVcsZUFBYTtJQUN4QixxQkFBUyxLQUFLO0lBQ2QsY0FBUSxPQUFHLElBQUksU0FDTTtLQUFwQixhQUFTLEtBQUssUUFBTTtLQUNwQjtJQUFBO0lBQ0QsYUFBUyxLQUFLLFFBQU07WUFDWDtHQUFBO0VBQUE7RUFFWCxvQkFBYyx1QkFBQSxLQUNJO0dBQWpCLFVBQU07R0FDTixXQUFPLE1BQU07R0FDYixjQUFRLE9BQUcsS0FBSyxJQUNDO0lBSWhCLFlBQVU7SUFDVixZQUFRLGVBQUEsV0FDUTtLQUFmLGFBQVMsS0FBSyxnQkFBTSxLQUFLO2FBQ2hCO0lBQUE7SUFDVixvQkFBYSx1QkFBQSxFQUNDO1lBQWIsT0FBRyxFQUFFO0lBQUE7SUFFRixPQUFBO0tBQUgsdUJBQWUscUJBQWlCO0tBQ2hDLGNBQVEsY0FBVSxtQkFDWTtNQUE3QjtLQUFBO0tBQ0QsbUJBQU8sS0FBSztLQUNaLHdCQUFnQixJQUFFLGlCQUFhO0tBQy9CLGNBQVEsY0FBVSxvQkFDYTtNQUE5QixHQUFJLE9BQUcsS0FBSyxLQUNHO09BQWQsTUFBSTtNQUFBO01BQ0w7S0FBQTtLQUNELG9CQUFRLEtBQUs7S0FFUixZQUFKLE9BQUcsS0FBSyxNQUNHO01BQ1Y7T0FDQyxZQUFBLE9BQUcsTUFBTSxPQUNJO2VBQVo7T0FBQSxPQUVHO2VBQUg7T0FBQTtNQUFBO0tBQUEsT0FDSCxZQUFBLE9BQUcsTUFBTSxNQUNHO01BQVgsTUFBSTtLQUFBLE9BRUQ7TUFBSDtLQUFBO0lBQUE7SUFDSCxhQUFTLEtBQUssUUFBTTtHQUFBO0VBQUE7RUFyR3ZCLHdCQUFBO2tCQWFBIiwiZmlsZSI6ImF0L1ByaW9yaXR5LVF1ZXVlL0hlYXAtUHJpb3JpdHktUXVldWUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==