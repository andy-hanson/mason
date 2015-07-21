"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../math/Number","../../math/methods","../../methods","../../Object","../../Type/Kind","../../Type/Method","../../Type/Pred-Type","../../Type/Tuple","../at","../at-Type","../q","./Range","./Seq"],(exports,compare_0,Number_1,methods_2,methods_3,Object_4,Kind_5,Method_6,Pred_45Type_7,Tuple_8,_64_9,_64_45Type_10,_63_11,Range_12,Seq_13)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_60_63=_ms.get(_$2,"<?"),_$3=_ms.getModule(Number_1),modulo=_ms.get(_$3,"modulo"),Nat=_ms.get(_$3,"Nat"),_$4=_ms.getModule(methods_2),_43=_ms.get(_$4,"+"),_45=_ms.get(_$4,"-"),_42=_ms.get(_$4,"*"),_$5=_ms.getModule(methods_3),sub=_ms.get(_$5,"sub"),_$6=_ms.getModule(Object_4),p_33=_ms.get(_$6,"p!"),_$7=_ms.getModule(Kind_5),kind_33=_ms.get(_$7,"kind!"),self_45kind_33=_ms.get(_$7,"self-kind!"),_$8=_ms.getModule(Method_6),impl_33=_ms.get(_$8,"impl!"),self_45impl_33=_ms.get(_$8,"self-impl!"),_$9=_ms.getModule(Pred_45Type_7),Any=_ms.get(_$9,"Any"),Tuple=_ms.getDefaultExport(Tuple_8),_64=_ms.getDefaultExport(_64_9),_$11=_ms.getModule(_64_9),_43_43_39=_ms.get(_$11,"++'"),count=_ms.get(_$11,"count"),empty_33=_ms.get(_$11,"empty!"),empty_63=_ms.get(_$11,"empty?"),iterator=_ms.get(_$11,"iterator"),map=_ms.get(_$11,"map"),_64_45Type=_ms.getDefaultExport(_64_45Type_10),_$12=_ms.getModule(_64_45Type_10),empty=_ms.get(_$12,"empty"),_$13=_ms.getModule(_63_11),un_45_63=_ms.get(_$13,"un-?"),_$14=_ms.getModule(Range_12),range=_ms.get(_$14,"range"),Seq=_ms.getDefaultExport(Seq_13),_$15=_ms.getModule(Seq_13),_60_43_43_33=_ms.get(_$15,"<++!"),_43_43_62_33=_ms.get(_$15,"++>!"),_63nth=_ms.get(_$15,"?nth"),_63_60pop_33=_ms.get(_$15,"?<pop!"),_63pop_62_33=_ms.get(_$15,"?pop>!"),reverse=_ms.get(_$15,"reverse"),set_45nth_33=_ms.get(_$15,"set-nth!");
		const Deque=Tuple(()=>{
			const built={};
			const doc=built.doc=`Seq that can efficiently add values on either side.`;
			const props=built.props=()=>{
				const built=[];
				_ms.add(built,[`data!`,Array]);
				_ms.add(built,[`start-index!`,Nat]);
				_ms.add(built,[`end-index!`,Nat]);
				return built
			}();
			return _ms.setName(built,"Deque")
		}());
		self_45kind_33(Deque,_64_45Type);
		self_45impl_33(empty,Deque,()=>{
			return Deque(Array(8),0,0)
		});
		const capacity=function capacity(_){
			return count(_["data!"])
		};
		const expand_33=function expand_33(_){
			const old_45data=_["data!"];
			const old_45capacity=capacity(_);
			const new_45capacity=_42(2,old_45capacity);
			const new_45data=Array(new_45capacity);
			for(let index of range(0,old_45capacity)){
				set_45nth_33(new_45data,index,_ms.sub(old_45data,index))
			};
			p_33(_,`data!`,new_45data)
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
			return ()=>{
				if(_ms.bool(_60_63(a,capacity(_)))){
					return _ms.bool((_60_63(_["end-index!"],_["start-index!"])||_60_63(a,_["end-index!"])))?_ms.some(()=>{
						return a
					}()):_ms.None
				} else {
					const b=wrap_45index(_,a);
					return _ms.bool((_60_63(_["end-index!"],_["start-index!"])&&_60_63(b,_["end-index!"])))?_ms.some(()=>{
						return b
					}()):_ms.None
				}
			}()
		};
		impl_33(iterator,Deque,function*(){
			const _this=this;
			const indices=(yield* function*(){
				if(_ms.bool(_60_63(_this["end-index!"],_this["start-index!"]))){
					return _43_43_39(range(_this["start-index!"],count(_this["data!"])),range(0,_this["end-index!"]))
				} else {
					return range(_this["start-index!"],_this["end-index!"])
				}
			}());
			for(let _ of indices){
				(yield _ms.sub(_this["data!"],_))
			}
		});
		kind_33(Deque,Seq);
		impl_33(_60_43_43_33,Deque,function(ems){
			const _this=this;
			_ms.checkContains(_64,ems,"ems");
			for(let em of reverse(ems)){
				const new_45start=prev_45index(_this,_this["start-index!"]);
				if(_ms.bool(_61_63(new_45start,_this["end-index!"]))){
					expand_33(_this);
					_60_43_43_33(_this,[em])
				} else {
					p_33(_this,`start-index!`,new_45start);
					set_45nth_33(_this["data!"],_this["start-index!"],em)
				}
			}
		});
		impl_33(_43_43_62_33,Deque,function(ems){
			const _this=this;
			_ms.checkContains(_64,ems,"ems");
			for(let em of ems){
				const new_45end=next_45index(_this,_this["end-index!"]);
				if(_ms.bool(_61_63(new_45end,_this["start-index!"]))){
					expand_33(_this);
					_43_43_62_33(_this,[em])
				} else {
					set_45nth_33(_this["data!"],_this["end-index!"],em);
					p_33(_this,`end-index!`,new_45end)
				}
			}
		});
		impl_33(_63_60pop_33,Deque,function(){
			const _this=this;
			return _ms.bool(empty_63(_this))?_ms.None:_ms.some(()=>{
				const x=_ms.sub(_this["data!"],_this["start-index!"]);
				p_33(_this,`start-index!`,next_45index(_this,_this["start-index!"]));
				return x
			}())
		});
		impl_33(_63pop_62_33,Deque,function(){
			const _this=this;
			return _ms.bool(empty_63(_this))?_ms.None:_ms.some(()=>{
				const new_45end=prev_45index(_this,_this["end-index!"]);
				p_33(_this,`end-index!`,new_45end);
				return _ms.sub(_this["data!"],new_45end)
			}())
		});
		impl_33(_63nth,Deque,function(index){
			const _this=this;
			_ms.checkContains(Nat,index,"index");
			return map(_63data_45index(_this,index),_ms.sub(sub,_this["data!"]))
		});
		impl_33(set_45nth_33,Deque,function(index,set_45to){
			const _this=this;
			_ms.checkContains(Nat,index,"index");
			_ms.checkContains(Any,set_45to,"set-to");
			const data_45index=un_45_63(_63data_45index(_this,index),_ms.lazy(()=>{
				return `Can't set at index ${_ms.show(index)}; count is ${_ms.show(count(_this))}`
			}));
			set_45nth_33(_this["data!"],data_45index,set_45to)
		});
		impl_33(empty_33,Deque,function(){
			const _this=this;
			empty_33(_this["data!"]);
			p_33(_this,`start-index!`,0);
			p_33(_this,`end-index!`,0)
		});
		const name=exports.name=`Deque`;
		exports.default=Deque;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9EZXF1ZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQWdCQSxZQUFRLFVBQ0s7O0dBQVosb0JBQU07R0FDTiw0QkFDTTs7a0JBQUgsQ0FBRyxRQUFPO2tCQUNWLENBQUcsZUFBYztrQkFDakIsQ0FBRyxhQUFZOzs7OztFQUVuQixlQUFXLE1BQU07RUFDakIsZUFBVyxNQUFNLE1BQ08sSUFBQTtVQUF2QixNQUFPLE1BQU0sR0FBRyxFQUFFO0VBQUE7RUFHbEIsZUFBWSxrQkFBQSxFQUNDO1VBQVosTUFBTTs7RUFFUCxnQkFBWSxtQkFBQSxFQUNDO0dBQVosaUJBQVc7R0FDWCxxQkFBZSxTQUFRO0dBQ3ZCLHFCQUFlLElBQUUsRUFBRTtHQUNuQixpQkFBVyxNQUFNO0dBQ1osUUFBQSxTQUFTLE1BQU0sRUFBRSxnQkFDWTtJQUFqQyxhQUFTLFdBQVMsY0FBTSxXQUFTO0dBQUE7R0FDbEMsS0FBRyxFQUFHLFFBQU87RUFBQTtFQUVkLG1CQUFjLHNCQUFBLEVBQUUsTUFDSztVQUFwQixPQUFPLE1BQU0sU0FBUTtFQUFBO0VBRXRCLG1CQUFjLHNCQUFBLEVBQUUsTUFDUztxQkFESDtVQUNyQixhQUFXLEVBQUcsSUFBRSxNQUFNO0VBQUE7RUFFdkIsbUJBQWMsc0JBQUEsRUFBRSxNQUNTO3FCQURIO1VBQ3JCLGFBQVcsRUFBRyxJQUFFLE1BQU07RUFBQTtFQUV2QixzQkFBZSx5QkFBQSxFQUFFLE1BQ1M7cUJBREg7R0FDdEIsUUFBSSxJQUFFLGtCQUFlOztJQUVwQixZQUFBLE9BQUcsRUFBRSxTQUFRLEtBQ0M7cUJBQVYsQ0FBSSxPQUFHLGdCQUFhLG9CQUFpQixPQUFHLEVBQUUsZ0NBQ2E7YUFBekQ7S0FBQTtXQUVFO0tBQUgsUUFBSSxhQUFXLEVBQUU7cUJBQ2QsQ0FBSyxPQUFHLGdCQUFhLG9CQUFpQixPQUFHLEVBQUUsZ0NBQ2E7YUFBMUQ7S0FBQTs7OztFQUVMLFFBQU0sU0FBUyxNQUNVLFdBQUE7O0dBQXhCLGNBQ2M7SUFBYixZQUFBLE9BQUcsb0JBQVksd0JBQ2E7WUFBM0IsVUFBSyxNQUFNLHNCQUFlLE1BQU0saUJBQVUsTUFBTSxFQUFFO1dBRS9DO1lBQUgsTUFBTSxzQkFBYzs7O0dBQ2pCLFFBQUEsS0FBQSxRQUNPO21CQUFSLGVBQU87R0FBQTtFQUFBO0VBRVosUUFBTSxNQUFNO0VBQ1osUUFBTSxhQUFLLE1BQVMsU0FBQSxJQUNLOztxQkFERDtHQUNsQixRQUFBLE1BQU0sUUFBUSxLQUNHO0lBQXJCLGtCQUFZLGFBQVcsTUFBSztJQUV2QixZQUFKLE9BQUcsWUFBVSxzQkFDVztLQUF2QixVQUFRO0tBQ1IsYUFBSyxNQUFLLENBQUU7SUFBQSxPQUVUO0tBQUgsS0FBRyxNQUFNLGVBQWM7S0FDdkIsYUFBUyxlQUFPLHNCQUFjO0lBQUE7R0FBQTtFQUFBO0VBRWxDLFFBQU0sYUFBSyxNQUFTLFNBQUEsSUFDSzs7cUJBREQ7R0FDbEIsUUFBQSxNQUFNLElBQ0c7SUFBYixnQkFBVSxhQUFXLE1BQUs7SUFFckIsWUFBSixPQUFHLFVBQVEsd0JBQ2E7S0FBdkIsVUFBUTtLQUNSLGFBQUssTUFBSyxDQUFFO0lBQUEsT0FFVDtLQUFILGFBQVMsZUFBTyxvQkFBWTtLQUM1QixLQUFHLE1BQU0sYUFBWTtJQUFBO0dBQUE7RUFBQTtFQUl6QixRQUFNLGFBQU8sTUFDUSxVQUFBOzttQkFBYixTQUFPLDhCQUNJO0lBQ2pCLGdCQUFJLGVBQU87SUFDWCxLQUFHLE1BQU0sZUFBZSxhQUFXLE1BQUs7V0FDeEM7R0FBQTtFQUFBO0VBRUYsUUFBTSxhQUFPLE1BQ1EsVUFBQTs7bUJBQWIsU0FBTyw4QkFDSTtJQUFqQixnQkFBVSxhQUFXLE1BQUs7SUFDMUIsS0FBRyxNQUFNLGFBQVk7bUJBQ3JCLGVBQU87R0FBQTtFQUFBO0VBRVQsUUFBTSxPQUFLLE1BQVEsU0FBQSxNQUNTOztxQkFESDtVQUN4QixJQUFLLGdCQUFZLE1BQUssZUFBTyxJQUFJOztFQUVsQyxRQUFNLGFBQVMsTUFBUyxTQUFBLE1BQVUsU0FDVTs7cUJBRGQ7cUJBQVc7R0FDeEMsbUJBQWEsU0FBTSxnQkFBWSxNQUFLO1dBQVMsK0JBQW9CLDZCQUFrQixNQUFNOztHQUN6RixhQUFTLGVBQU8sYUFBVztFQUFBO0VBRTVCLFFBQU0sU0FBTyxNQUNTLFVBQUE7O0dBQXJCLFNBQU87R0FFUCxLQUFHLE1BQU0sZUFBYztHQUN2QixLQUFHLE1BQU0sYUFBWTtFQUFBO0VBdEh0Qix3QkFBQTtrQkF3SEEiLCJmaWxlIjoiYXQvU2VxL0RlcXVlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=