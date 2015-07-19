"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../control","../../math/Number","../../math/methods","../../Type/Js-Method","../../Type/Kind","../../Type/Wrap-Type","../at","../atbang","../at-Type","../Seq/Arraybang","../Seq/Seqbang","./Priority-Queuebang"],function(exports,compare_0,control_1,Number_2,methods_3,Js_45Method_4,Kind_5,Wrap_45Type_6,_64_7,_64_33_8,_64_45Type_9,Array_33_10,Seq_33_11,Priority_45Queue_33_12){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_60_63=_ms.get(_$2,"<?"),_$3=_ms.getModule(control_1),returning=_ms.get(_$3,"returning"),_$4=_ms.getModule(Number_2),int_47=_ms.get(_$4,"int/"),_$5=_ms.getModule(methods_3),_43=_ms.get(_$5,"+"),_45=_ms.get(_$5,"-"),_42=_ms.get(_$5,"*"),_$6=_ms.getModule(Js_45Method_4),js_45impl_33=_ms.get(_$6,"js-impl!"),_$7=_ms.getModule(Kind_5),kind_33=_ms.get(_$7,"kind!"),self_45kind_33=_ms.get(_$7,"self-kind!"),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_6),_$9=_ms.getModule(_64_7),count=_ms.get(_$9,"count"),empty_63=_ms.get(_$9,"empty?"),iterator=_ms.get(_$9,"iterator"),_$10=_ms.getModule(_64_33_8),_43_43_33=_ms.get(_$10,"++!"),empty_33=_ms.get(_$10,"empty!"),_64_45Type=_ms.getDefaultExport(_64_45Type_9),_$11=_ms.getModule(_64_45Type_9),empty=_ms.get(_$11,"empty"),Array_33=_ms.getDefaultExport(Array_33_10),_$13=_ms.getModule(Seq_33_11),set_45nth_33=_ms.get(_$13,"set-nth!"),Priority_45Queue_33=_ms.getDefaultExport(Priority_45Queue_33_12),_$14=_ms.getModule(Priority_45Queue_33_12),_63pop_33=_ms.get(_$14,"?pop!");
		const Heap_45Priority_45Queue_33=Wrap_45Type(function(){
			const built={};
			const doc=built.doc=`Default implementation for Priority-Queue!.`;
			const wrapped_45type=built["wrapped-type"]=Array_33;
			return _ms.setName(built,"Heap-Priority-Queue!")
		}());
		self_45kind_33(Heap_45Priority_45Queue_33,_64_45Type,function(){
			const built=new global.Map();
			_ms.assoc(built,empty,function(){
				return Heap_45Priority_45Queue_33(empty(Array_33))
			});
			return built
		}());
		js_45impl_33(iterator,Heap_45Priority_45Queue_33,function(){
			const _this=this;
			return iterator(_this.val)
		});
		kind_33(Heap_45Priority_45Queue_33,Priority_45Queue_33,function(){
			const built=new global.Map();
			_ms.assoc(built,_43_43_33,function(_,added){
				for(let em of added){
					add_33(_.val,em)
				}
			});
			_ms.assoc(built,_63pop_33,function(_){
				return _ms.bool(empty_63(_))?_ms.None:_ms.some(function(){
					return returning(_ms.sub(_.val,0),function(){
						fix_45down_33(_.val)
					})
				}())
			});
			_ms.assoc(built,empty_63,function(_){
				return empty_63(_.val)
			});
			_ms.assoc(built,empty_33,function(_){
				empty_33(_.val)
			});
			return built
		}());
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
						go_33(function(){
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
		const name=exports.name=`Heap-Priority-Queue!`;
		exports.default=Heap_45Priority_45Queue_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1ByaW9yaXR5LVF1ZXVlL0hlYXAtUHJpb3JpdHktUXVldWUhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBZUEsaUNBQXNCLHNCQUNTOztHQUE5QixvQkFBTTtHQUNOLDJDQUFjOzs7RUFFZixlQUFXLDJCQUFxQixxQkFDTTs7bUJBQXJDLE1BQ1UsVUFBQTtXQUFULDJCQUFzQixNQUFNO0dBQUE7OztFQUU5QixhQUFTLFNBQVMsMkJBQ3VCLFVBQUE7O1VBQXhDLFNBQVM7O0VBRVYsUUFBTSwyQkFBcUIsOEJBQ2U7O21CQUF6QyxVQUFTLFNBQUEsRUFBRSxNQUNLO0lBQVYsUUFBQSxNQUFNLE1BQ0s7S0FBZixPQUFLLE1BQU07SUFBQTtHQUFBO21CQUNiLFVBQVUsU0FBQSxFQUNDO29CQUFILFNBQU0sZ0NBQ0M7WUFBYixrQkFBVSxNQUFNLEdBQ0ssVUFBQTtNQUFwQixjQUFVOzs7O21CQUViLFNBQVcsU0FBQSxFQUNDO1dBQVgsU0FBTzs7bUJBQ1IsU0FBWSxTQUFBLEVBQ0M7SUFBWixTQUFPOzs7O0VBSVIsMkJBQW9CLDhCQUFBLElBQ0c7VUFBdEIsSUFBRSxFQUFHLElBQUUsRUFBRTtFQUFBO0VBQ1YscUJBQWdCLHdCQUFBLElBQ0c7VUFBbEIsSUFBRyxPQUFNLElBQUUsRUFBRSxLQUFLLEdBQUc7RUFBQTtFQUV0QixhQUFTLGdCQUFBLEtBQUssSUFDRztHQUVoQjtHQUNBLFlBQVUsTUFBTTtHQUVaLE9BQUE7SUFBSCxHQUFJLE9BQUcsUUFBTSxHQUNDO0tBQWIsYUFBUyxLQUFLLEVBQUU7S0FDaEI7SUFBQTtJQUNELGlCQUFXLGVBQWE7SUFDeEIscUJBQVMsS0FBSztJQUNkLGNBQVEsT0FBRyxJQUFJLFNBQ007S0FBcEIsYUFBUyxLQUFLLFFBQU07S0FDcEI7SUFBQTtJQUNELGFBQVMsS0FBSyxRQUFNO1lBQ1g7R0FBQTtFQUFBO0VBRVgsb0JBQWMsdUJBQUEsS0FDSTtHQUFqQixVQUFNO0dBQ04sV0FBTyxNQUFNO0dBQ2IsY0FBUSxPQUFHLEtBQUssSUFDQztJQUloQixZQUFVO0lBQ1YsWUFBUSxlQUFBLFdBQ1E7S0FBZixhQUFTLEtBQUssZ0JBQU0sS0FBSzthQUNoQjtJQUFBO0lBQ1Ysb0JBQWEsdUJBQUEsRUFDQztZQUFiLE9BQUcsRUFBRTtJQUFBO0lBRUYsT0FBQTtLQUFILHVCQUFlLHFCQUFpQjtLQUNoQyxjQUFRLGNBQVUsbUJBQ1k7TUFBN0I7S0FBQTtLQUNELG1CQUFPLEtBQUs7S0FDWix3QkFBZ0IsSUFBRSxpQkFBYTtLQUMvQixjQUFRLGNBQVUsb0JBQ2E7TUFBOUIsR0FBSSxPQUFHLEtBQUssS0FDRztPQUFkLE1BQUk7TUFBQTtNQUNMO0tBQUE7S0FDRCxvQkFBUSxLQUFLO0tBRVIsWUFBSixPQUFHLEtBQUssTUFDRztNQUNWO09BQ0MsWUFBQSxPQUFHLE1BQU0sT0FDSTtlQUFaO09BQUEsT0FFRztlQUFIO09BQUE7TUFBQTtLQUFBLE9BQ0gsWUFBQSxPQUFHLE1BQU0sTUFDRztNQUFYLE1BQUk7S0FBQSxPQUVEO01BQUg7S0FBQTtJQUFBO0lBQ0gsYUFBUyxLQUFLLFFBQU07R0FBQTtFQUFBO0VBckd2Qix3QkFBQTtrQkFlQSIsImZpbGUiOiJhdC9Qcmlvcml0eS1RdWV1ZS9IZWFwLVByaW9yaXR5LVF1ZXVlYmFuZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9