"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../control","../../math/Number","../../math/methods","../../Type/Kind","../at","../at-Type","../Seq/Seq","./Priority-Queue"],(exports,compare_0,control_1,Number_2,methods_3,Kind_4,_64_5,_64_45Type_6,Seq_7,Priority_45Queue_8)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_60_63=_ms.get(_$2,"<?"),_$3=_ms.getModule(control_1),returning=_ms.get(_$3,"returning"),_$4=_ms.getModule(Number_2),int_47=_ms.get(_$4,"int/"),_$5=_ms.getModule(methods_3),_43=_ms.get(_$5,"+"),_45=_ms.get(_$5,"-"),_42=_ms.get(_$5,"*"),_$6=_ms.getModule(Kind_4),kind_33=_ms.get(_$6,"kind!"),self_45kind_33=_ms.get(_$6,"self-kind!"),_$7=_ms.getModule(_64_5),_43_43_33=_ms.get(_$7,"++!"),count=_ms.get(_$7,"count"),empty_33=_ms.get(_$7,"empty!"),empty_63=_ms.get(_$7,"empty?"),iterator=_ms.get(_$7,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_6),_$8=_ms.getModule(_64_45Type_6),empty=_ms.get(_$8,"empty"),_$9=_ms.getModule(Seq_7),set_45nth_33=_ms.get(_$9,"set-nth!"),Priority_45Queue=_ms.getDefaultExport(Priority_45Queue_8),_$10=_ms.getModule(Priority_45Queue_8),_63pop_33=_ms.get(_$10,"?pop!");
		const Heap_45Priority_45Queue=()=>{
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
					for(let em of added){
						add_33(_this.array,em)
					}
				}
				[_ms.symbol(_63pop_33)](){
					const _this=this;
					return _ms.bool(empty_63(_this))?_ms.None:_ms.some(()=>{
						return returning(_ms.sub(_this.array,0),()=>{
							fix_45down_33(_this.array)
						})
					}())
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
		}();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1ByaW9yaXR5LVF1ZXVlL0hlYXAtUHJpb3JpdHktUXVldWUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFXQSxrQ0FLSTtTQURIO3VCQU1DLFNBQ087V0FxQkE7WUFyQk4sS0FxQk07SUFBQTtpQkFsQkU7cUJBQVQsYUFBUztJQUFBO2dCQUVWLFlBQ1U7V0FlRjtZQWZQLFNBZU87O2dCQWJSLFlBQU0sTUFDSztXQVlIO0tBWkYsUUFBQSxNQUFNLE1BQ0s7TUFBZixPQVdNLFlBWE07S0FBQTtJQUFBO2dCQUVkLGFBQ087V0FRQztxQkFSQSxTQVFBLDhCQVBXO2FBQWpCLGtCQU9NLFlBUFcsR0FDSyxJQUFBO09BQXJCLGNBTUs7Ozs7Z0JBSlIsWUFDUTtXQUdBO1lBSFAsU0FHTzs7Z0JBRFIsWUFDUztXQUFEO0tBQVAsU0FBTzs7O0dBM0JQLGVBQVcsRUFBRTtHQUNiLFFBQU0sRUFBRTtVQUZUO0VBQUE7RUFpQ0EsMkJBQW9CLDhCQUFBLElBQ0c7VUFBdEIsSUFBRSxFQUFHLElBQUUsRUFBRTtFQUFBO0VBQ1YscUJBQWdCLHdCQUFBLElBQ0c7VUFBbEIsSUFBRyxPQUFNLElBQUUsRUFBRSxLQUFLLEdBQUc7RUFBQTtFQUV0QixhQUFTLGdCQUFBLEtBQUssSUFDRztHQUVoQjtHQUNBLFlBQVUsTUFBTTtHQUVaLE9BQUE7SUFBSCxHQUFJLE9BQUcsUUFBTSxHQUNDO0tBQWIsYUFBUyxLQUFLLEVBQUU7S0FDaEI7SUFBQTtJQUNELGlCQUFXLGVBQWE7SUFDeEIscUJBQVMsS0FBSztJQUNkLGNBQVEsT0FBRyxJQUFJLFNBQ007S0FBcEIsYUFBUyxLQUFLLFFBQU07S0FDcEI7SUFBQTtJQUNELGFBQVMsS0FBSyxRQUFNO1lBQ1g7R0FBQTtFQUFBO0VBRVgsb0JBQWMsdUJBQUEsS0FDSTtHQUFqQixVQUFNO0dBQ04sV0FBTyxNQUFNO0dBQ2IsY0FBUSxPQUFHLEtBQUssSUFDQztJQUloQixZQUFVO0lBQ1YsWUFBUSxlQUFBLFdBQ1E7S0FBZixhQUFTLEtBQUssZ0JBQU0sS0FBSzthQUNoQjtJQUFBO0lBQ1Ysb0JBQWEsdUJBQUEsRUFDQztZQUFiLE9BQUcsRUFBRTtJQUFBO0lBRUYsT0FBQTtLQUFILHVCQUFlLHFCQUFpQjtLQUNoQyxjQUFRLGNBQVUsbUJBQ1k7TUFBN0I7S0FBQTtLQUNELG1CQUFPLEtBQUs7S0FDWix3QkFBZ0IsSUFBRSxpQkFBYTtLQUMvQixjQUFRLGNBQVUsb0JBQ2E7TUFBOUIsR0FBSSxPQUFHLEtBQUssS0FDRztPQUFkLE1BQUk7TUFBQTtNQUNMO0tBQUE7S0FDRCxvQkFBUSxLQUFLO0tBRVIsWUFBSixPQUFHLEtBQUssTUFDRztNQUNWO09BQ0MsWUFBQSxPQUFHLE1BQU0sT0FDSTtlQUFaO09BQUEsT0FFRztlQUFIO09BQUE7TUFBQTtLQUFBLE9BQ0gsWUFBQSxPQUFHLE1BQU0sTUFDRztNQUFYLE1BQUk7S0FBQSxPQUVEO01BQUg7S0FBQTtJQUFBO0lBQ0gsYUFBUyxLQUFLLFFBQU07R0FBQTtFQUFBO0VBM0d2Qix3QkFBQTtrQkFXQSIsImZpbGUiOiJhdC9Qcmlvcml0eS1RdWV1ZS9IZWFwLVByaW9yaXR5LVF1ZXVlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=