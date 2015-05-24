"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../control","../../math/Number","../../math/methods","../../Type/Js-Method","../../Type/Kind","../../Type/Wrap-Type","../at","../atbang","../at-Type","../Seq/Arraybang","../Seq/Seqbang","./Priority-Queuebang"],function(exports,compare_0,control_1,Number_2,methods_3,Js_45Method_4,Kind_5,Wrap_45Type_6,_64_7,_64_33_8,_64_45Type_9,Array_33_10,Seq_33_11,Priority_45Queue_33_12){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_60_63=_ms.get(_$2,"<?"),_$3=_ms.getModule(control_1),returning=_ms.get(_$3,"returning"),unless=_ms.get(_$3,"unless"),_$4=_ms.getModule(Number_2),int_47=_ms.get(_$4,"int/"),_$5=_ms.getModule(methods_3),_43=_ms.get(_$5,"+"),_45=_ms.get(_$5,"-"),_42=_ms.get(_$5,"*"),_$6=_ms.getModule(Js_45Method_4),js_45impl_33=_ms.get(_$6,"js-impl!"),_$7=_ms.getModule(Kind_5),kind_33=_ms.get(_$7,"kind!"),self_45kind_33=_ms.get(_$7,"self-kind!"),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_6),_$9=_ms.getModule(_64_7),count=_ms.get(_$9,"count"),empty_63=_ms.get(_$9,"empty?"),iterator=_ms.get(_$9,"iterator"),_$10=_ms.getModule(_64_33_8),_43_43_33=_ms.get(_$10,"++!"),empty_33=_ms.get(_$10,"empty!"),_64_45Type=_ms.getDefaultExport(_64_45Type_9),_$11=_ms.getModule(_64_45Type_9),empty=_ms.get(_$11,"empty"),Array_33=_ms.getDefaultExport(Array_33_10),_$13=_ms.getModule(Seq_33_11),set_45nth_33=_ms.get(_$13,"set-nth!"),Priority_45Queue_33=_ms.getDefaultExport(Priority_45Queue_33_12),_$14=_ms.getModule(Priority_45Queue_33_12),_63pop_33=_ms.get(_$14,"?pop!");
		const Heap_45Priority_45Queue_33=Wrap_45Type(function(){
			const doc="Default implementation for Priority-Queue!.";
			const wrapped_45type=Array_33;
			return {
				doc:doc,
				"wrapped-type":wrapped_45type,
				name:"Heap-Priority-Queue!"
			}
		}());
		self_45kind_33(Heap_45Priority_45Queue_33,_64_45Type,function(){
			const built=new global.Map();
			_ms.assoc(built,empty,function(){
				return Heap_45Priority_45Queue_33(empty(Array_33))
			});
			return built
		}());
		js_45impl_33(iterator,Heap_45Priority_45Queue_33,function(){
			return iterator(this.val)
		});
		kind_33(Heap_45Priority_45Queue_33,Priority_45Queue_33,function(){
			const built=new global.Map();
			_ms.assoc(built,_43_43_33,function(_,added){
				for(let em of added[Symbol.iterator]()){
					add_33(_.val,em)
				}
			});
			_ms.assoc(built,_63pop_33,function(_){
				return unless(empty_63(_),_ms.lazy(function(){
					return function(){
						return returning(_ms.sub(_.val,0),function(){
							fix_45down_33(_.val)
						})
					}()
				}))
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
				if(_ms.bool(_61_63(i_45cur,0))){
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
						if(_ms.bool(_60_63(left,val))){
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
		const name=exports.name="Heap-Priority-Queue!";
		exports.default=Heap_45Priority_45Queue_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1ByaW9yaXR5LVF1ZXVlL0hlYXAtUHJpb3JpdHktUXVldWUhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBZUEsaUNBQXVCLHNCQUNTO0dBQS9CLFVBQU07R0FDTixxQkFBYzs7Ozs7OztFQUVmLGVBQVcsMkJBQXFCLHFCQUNNOzttQkFBckMsTUFDVSxVQUFBO1dBQVQsMkJBQXNCLE1BQU07R0FBQTs7O0VBRTlCLGFBQVMsU0FBUywyQkFDc0IsVUFBQTtVQUF2QyxTQUFTOztFQUVWLFFBQU0sMkJBQXFCLDhCQUNlOzttQkFBekMsVUFBUyxTQUFBLEVBQUUsTUFDSztJQUFWLFFBQUEsTUFBTSx5QkFDSztLQUFmLE9BQUssTUFBTTtJQUFBO0dBQUE7bUJBQ2IsVUFBVSxTQUFBLEVBQ0M7V0FBVixPQUFPLFNBQU07c0JBQ0c7YUFBZixrQkFBVSxNQUFNLEdBQ0ssVUFBQTtPQUFwQixjQUFVOzs7OzttQkFFYixTQUFXLFNBQUEsRUFDQztXQUFYLFNBQU87O21CQUNSLFNBQVksU0FBQSxFQUNDO0lBQVosU0FBTzs7OztFQUlSLDJCQUFvQiw4QkFBQSxJQUNHO1VBQXRCLElBQUUsRUFBRyxJQUFFLEVBQUU7RUFBQTtFQUNWLHFCQUFnQix3QkFBQSxJQUNHO1VBQWxCLElBQUcsT0FBTSxJQUFFLEVBQUUsS0FBSyxHQUFHO0VBQUE7RUFFdEIsYUFBUyxnQkFBQSxLQUFLLElBQ0c7R0FFaEI7R0FDQSxZQUFVLE1BQU07R0FFWixPQUFBO0lBQUgsWUFBSSxPQUFHLFFBQU0sSUFDQztLQUFiLGFBQVMsS0FBSyxFQUFFO0tBQ2hCO0lBQUE7SUFDRCxpQkFBVyxlQUFhO0lBQ3hCLHFCQUFTLEtBQUs7SUFDZCxjQUFRLE9BQUcsSUFBSSxTQUNNO0tBQXBCLGFBQVMsS0FBSyxRQUFNO0tBQ3BCO0lBQUE7SUFDRCxhQUFTLEtBQUssUUFBTTtZQUNYO0dBQUE7RUFBQTtFQUVYLG9CQUFjLHVCQUFBLEtBQ0k7R0FBakIsVUFBTTtHQUNOLFdBQU8sTUFBTTtHQUNiLGNBQVEsT0FBRyxLQUFLLElBQ0M7SUFJaEIsWUFBVTtJQUNWLFlBQVEsZUFBQSxXQUNRO0tBQWYsYUFBUyxLQUFLLGdCQUFNLEtBQUs7YUFDaEI7SUFBQTtJQUNWLG9CQUFhLHVCQUFBLEVBQ0M7WUFBYixPQUFHLEVBQUU7SUFBQTtJQUVGLE9BQUE7S0FBSCx1QkFBZSxxQkFBaUI7S0FDaEMsY0FBUSxjQUFVLG1CQUNZO01BQTdCO0tBQUE7S0FDRCxtQkFBTyxLQUFLO0tBQ1osd0JBQWdCLElBQUUsaUJBQWE7S0FDL0IsY0FBUSxjQUFVLG9CQUNhO01BQTlCLFlBQUksT0FBRyxLQUFLLE1BQ0c7T0FBZCxNQUFJO01BQUE7TUFDTDtLQUFBO0tBQ0Qsb0JBQVEsS0FBSztLQUVSLFlBQUosT0FBRyxLQUFLLE1BQ0c7TUFDVjtPQUNDLFlBQUEsT0FBRyxNQUFNLE9BQ0k7ZUFBWjtPQUFBLE9BRUc7ZUFBSDtPQUFBO01BQUE7S0FBQSxPQUNILFlBQUEsT0FBRyxNQUFNLE1BQ0c7TUFBWCxNQUFJO0tBQUEsT0FFRDtNQUFIO0tBQUE7SUFBQTtJQUNILGFBQVMsS0FBSyxRQUFNO0dBQUE7RUFBQTtFQXJHdkIsd0JBQUE7a0JBeUdBIiwiZmlsZSI6ImF0L1ByaW9yaXR5LVF1ZXVlL0hlYXAtUHJpb3JpdHktUXVldWViYW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=