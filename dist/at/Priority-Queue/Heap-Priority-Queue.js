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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1ByaW9yaXR5LVF1ZXVlL0hlYXAtUHJpb3JpdHktUXVldWUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFhQSw4QkFBcUIsZ0JBQ1M7O0dBQTdCLG9CQUFNO0dBQ04sMkNBQWM7OztFQUVmLGVBQVcsd0JBQW9CO0VBQy9CLGVBQVcsTUFBTSx3QkFDcUIsSUFBQTtVQUFyQyx3QkFBb0I7RUFBQTtFQUVyQixRQUFNLFNBQVMsd0JBQ3NCLFVBQUE7O1VBQXBDLFNBQVM7O0VBRVYsUUFBTSx3QkFBb0I7RUFFMUIsUUFBTSxVQUFJLHdCQUF1QixTQUFBLE1BQ0s7O0dBQWhDLFFBQUEsTUFBTSxNQUNLO0lBQWYsT0FBSyxVQUFLO0dBQUE7RUFBQTtFQUVaLFFBQU0sVUFBTSx3QkFDc0IsVUFBQTs7bUJBQTFCLFNBQU8sOEJBQ0k7V0FBakIsa0JBQVUsVUFBSyxHQUNLLElBQUE7S0FBbkIsY0FBVTs7OztFQUViLFFBQU0sU0FBTyx3QkFDc0IsVUFBQTs7VUFBbEMsU0FBTzs7RUFDUixRQUFNLFNBQU8sd0JBQ3VCLFVBQUE7O0dBQW5DLFNBQU87O0VBSVAsMkJBQW9CLDhCQUFBLElBQ0c7VUFBdEIsSUFBRSxFQUFHLElBQUUsRUFBRTtFQUFBO0VBQ1YscUJBQWdCLHdCQUFBLElBQ0c7VUFBbEIsSUFBRyxPQUFNLElBQUUsRUFBRSxLQUFLLEdBQUc7RUFBQTtFQUV0QixhQUFTLGdCQUFBLEtBQUssSUFDRztHQUVoQjtHQUNBLFlBQVUsTUFBTTtHQUVaLE9BQUE7SUFBSCxHQUFJLE9BQUcsUUFBTSxHQUNDO0tBQWIsYUFBUyxLQUFLLEVBQUU7S0FDaEI7SUFBQTtJQUNELGlCQUFXLGVBQWE7SUFDeEIscUJBQVMsS0FBSztJQUNkLGNBQVEsT0FBRyxJQUFJLFNBQ007S0FBcEIsYUFBUyxLQUFLLFFBQU07S0FDcEI7SUFBQTtJQUNELGFBQVMsS0FBSyxRQUFNO1lBQ1g7R0FBQTtFQUFBO0VBRVgsb0JBQWMsdUJBQUEsS0FDSTtHQUFqQixVQUFNO0dBQ04sV0FBTyxNQUFNO0dBQ2IsY0FBUSxPQUFHLEtBQUssSUFDQztJQUloQixZQUFVO0lBQ1YsWUFBUSxlQUFBLFdBQ1E7S0FBZixhQUFTLEtBQUssZ0JBQU0sS0FBSzthQUNoQjtJQUFBO0lBQ1Ysb0JBQWEsdUJBQUEsRUFDQztZQUFiLE9BQUcsRUFBRTtJQUFBO0lBRUYsT0FBQTtLQUFILHVCQUFlLHFCQUFpQjtLQUNoQyxjQUFRLGNBQVUsbUJBQ1k7TUFBN0I7S0FBQTtLQUNELG1CQUFPLEtBQUs7S0FDWix3QkFBZ0IsSUFBRSxpQkFBYTtLQUMvQixjQUFRLGNBQVUsb0JBQ2E7TUFBOUIsR0FBSSxPQUFHLEtBQUssS0FDRztPQUFkLE1BQUk7TUFBQTtNQUNMO0tBQUE7S0FDRCxvQkFBUSxLQUFLO0tBRVIsWUFBSixPQUFHLEtBQUssTUFDRztNQUNWO09BQ0MsWUFBQSxPQUFHLE1BQU0sT0FDSTtlQUFaO09BQUEsT0FFRztlQUFIO09BQUE7TUFBQTtLQUFBLE9BQ0gsWUFBQSxPQUFHLE1BQU0sTUFDRztNQUFYLE1BQUk7S0FBQSxPQUVEO01BQUg7S0FBQTtJQUFBO0lBQ0gsYUFBUyxLQUFLLFFBQU07R0FBQTtFQUFBO0VBckd2Qix3QkFBQTtrQkFhQSIsImZpbGUiOiJhdC9Qcmlvcml0eS1RdWV1ZS9IZWFwLVByaW9yaXR5LVF1ZXVlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=