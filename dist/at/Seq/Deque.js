"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../math/Number","../../math/methods","../../methods","../../Type/Kind","../../Type/Method","../../Type/Pred-Type","../../Type/Tuple","../at","../at-Type","../q","./Range","./Seq"],(exports,compare_0,Number_1,methods_2,methods_3,Kind_4,Method_5,Pred_45Type_6,Tuple_7,_64_8,_64_45Type_9,_63_10,Range_11,Seq_12)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_60_63=_ms.get(_$2,"<?"),_$3=_ms.getModule(Number_1),modulo=_ms.get(_$3,"modulo"),Nat=_ms.get(_$3,"Nat"),_$4=_ms.getModule(methods_2),_43=_ms.get(_$4,"+"),_45=_ms.get(_$4,"-"),_42=_ms.get(_$4,"*"),_$5=_ms.getModule(methods_3),sub=_ms.get(_$5,"sub"),_$6=_ms.getModule(Kind_4),kind_33=_ms.get(_$6,"kind!"),self_45kind_33=_ms.get(_$6,"self-kind!"),_$7=_ms.getModule(Method_5),impl_33=_ms.get(_$7,"impl!"),self_45impl_33=_ms.get(_$7,"self-impl!"),_$8=_ms.getModule(Pred_45Type_6),Any=_ms.get(_$8,"Any"),Tuple=_ms.getDefaultExport(Tuple_7),_64=_ms.getDefaultExport(_64_8),_$10=_ms.getModule(_64_8),_43_43_39=_ms.get(_$10,"++'"),count=_ms.get(_$10,"count"),empty_33=_ms.get(_$10,"empty!"),empty_63=_ms.get(_$10,"empty?"),iterator=_ms.get(_$10,"iterator"),map=_ms.get(_$10,"map"),_64_45Type=_ms.getDefaultExport(_64_45Type_9),_$11=_ms.getModule(_64_45Type_9),empty=_ms.get(_$11,"empty"),_$12=_ms.getModule(_63_10),un_45_63=_ms.get(_$12,"un-?"),_$13=_ms.getModule(Range_11),range=_ms.get(_$13,"range"),Seq=_ms.getDefaultExport(Seq_12),_$14=_ms.getModule(Seq_12),_60_43_43_33=_ms.get(_$14,"<++!"),_43_43_62_33=_ms.get(_$14,"++>!"),_63nth=_ms.get(_$14,"?nth"),_63_60pop_33=_ms.get(_$14,"?<pop!"),_63pop_62_33=_ms.get(_$14,"?pop>!"),reverse=_ms.get(_$14,"reverse"),set_45nth_33=_ms.get(_$14,"set-nth!");
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
					_this["start-index!"]=new_45start;
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
					_this["end-index!"]=new_45end
				}
			}
		});
		impl_33(_63_60pop_33,Deque,function(){
			const _this=this;
			return _ms.bool(empty_63(_this))?_ms.None:_ms.some(()=>{
				const x=_ms.sub(_this["data!"],_this["start-index!"]);
				_this["start-index!"]=next_45index(_this,_this["start-index!"]);
				return x
			}())
		});
		impl_33(_63pop_62_33,Deque,function(){
			const _this=this;
			return _ms.bool(empty_63(_this))?_ms.None:_ms.some(()=>{
				const new_45end=prev_45index(_this,_this["end-index!"]);
				_this["end-index!"]=new_45end;
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
			_this["start-index!"]=0;
			_this["end-index!"]=0
		});
		const name=exports.name=`Deque`;
		exports.default=Deque;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9EZXF1ZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQWVBLFlBQVEsVUFDSzs7R0FBWixvQkFBTTtHQUNOLDRCQUNNOztrQkFBSCxDQUFHLFFBQU87a0JBQ1YsQ0FBRyxlQUFjO2tCQUNqQixDQUFHLGFBQVk7Ozs7O0VBRW5CLGVBQVcsTUFBTTtFQUNqQixlQUFXLE1BQU0sTUFDTyxJQUFBO1VBQXZCLE1BQU8sTUFBTSxHQUFHLEVBQUU7RUFBQTtFQUdsQixlQUFZLGtCQUFBLEVBQ0M7VUFBWixNQUFNOztFQUVQLGdCQUFZLG1CQUFBLEVBQ0M7R0FBWixpQkFBVztHQUNYLHFCQUFlLFNBQVE7R0FDdkIscUJBQWUsSUFBRSxFQUFFO0dBQ25CLGlCQUFXLE1BQU07R0FDWixRQUFBLFNBQVMsTUFBTSxFQUFFLGdCQUNZO0lBQWpDLGFBQVMsV0FBUyxjQUFNLFdBQVM7R0FBQTtHQUNsQyxXQUFXO0VBQUE7RUFFWixtQkFBYyxzQkFBQSxFQUFFLE1BQ0s7VUFBcEIsT0FBTyxNQUFNLFNBQVE7RUFBQTtFQUV0QixtQkFBYyxzQkFBQSxFQUFFLE1BQ1M7cUJBREg7VUFDckIsYUFBVyxFQUFHLElBQUUsTUFBTTtFQUFBO0VBRXZCLG1CQUFjLHNCQUFBLEVBQUUsTUFDUztxQkFESDtVQUNyQixhQUFXLEVBQUcsSUFBRSxNQUFNO0VBQUE7RUFFdkIsc0JBQWUseUJBQUEsRUFBRSxNQUNTO3FCQURIO0dBQ3RCLFFBQUksSUFBRSxrQkFBZTs7SUFFcEIsWUFBQSxPQUFHLEVBQUUsU0FBUSxLQUNDO3FCQUFWLENBQUksT0FBRyxnQkFBYSxvQkFBaUIsT0FBRyxFQUFFLGdDQUNhO2FBQXpEO0tBQUE7V0FFRTtLQUFILFFBQUksYUFBVyxFQUFFO3FCQUNkLENBQUssT0FBRyxnQkFBYSxvQkFBaUIsT0FBRyxFQUFFLGdDQUNhO2FBQTFEO0tBQUE7Ozs7RUFFTCxRQUFNLFNBQVMsTUFDVSxXQUFBOztHQUF4QixjQUNjO0lBQWIsWUFBQSxPQUFHLG9CQUFZLHdCQUNhO1lBQTNCLFVBQUssTUFBTSxzQkFBZSxNQUFNLGlCQUFVLE1BQU0sRUFBRTtXQUUvQztZQUFILE1BQU0sc0JBQWM7OztHQUNqQixRQUFBLEtBQUEsUUFDTzttQkFBUixlQUFPO0dBQUE7RUFBQTtFQUVaLFFBQU0sTUFBTTtFQUNaLFFBQU0sYUFBSyxNQUFTLFNBQUEsSUFDSzs7cUJBREQ7R0FDbEIsUUFBQSxNQUFNLFFBQVEsS0FDRztJQUFyQixrQkFBWSxhQUFXLE1BQUs7SUFFdkIsWUFBSixPQUFHLFlBQVUsc0JBQ1c7S0FBdkIsVUFBUTtLQUNSLGFBQUssTUFBSyxDQUFFO0lBQUEsT0FFVDtLQUFILHNCQUFpQjtLQUNqQixhQUFTLGVBQU8sc0JBQWM7SUFBQTtHQUFBO0VBQUE7RUFFbEMsUUFBTSxhQUFLLE1BQVMsU0FBQSxJQUNLOztxQkFERDtHQUNsQixRQUFBLE1BQU0sSUFDRztJQUFiLGdCQUFVLGFBQVcsTUFBSztJQUVyQixZQUFKLE9BQUcsVUFBUSx3QkFDYTtLQUF2QixVQUFRO0tBQ1IsYUFBSyxNQUFLLENBQUU7SUFBQSxPQUVUO0tBQUgsYUFBUyxlQUFPLG9CQUFZO0tBQzVCLG9CQUFlO0lBQUE7R0FBQTtFQUFBO0VBSW5CLFFBQU0sYUFBTyxNQUNRLFVBQUE7O21CQUFiLFNBQU8sOEJBQ0k7SUFDakIsZ0JBQUksZUFBTztJQUNYLHNCQUFpQixhQUFXLE1BQUs7V0FDakM7R0FBQTtFQUFBO0VBRUYsUUFBTSxhQUFPLE1BQ1EsVUFBQTs7bUJBQWIsU0FBTyw4QkFDSTtJQUFqQixnQkFBVSxhQUFXLE1BQUs7SUFDMUIsb0JBQWU7bUJBQ2YsZUFBTztHQUFBO0VBQUE7RUFFVCxRQUFNLE9BQUssTUFBUSxTQUFBLE1BQ1M7O3FCQURIO1VBQ3hCLElBQUssZ0JBQVksTUFBSyxlQUFPLElBQUk7O0VBRWxDLFFBQU0sYUFBUyxNQUFTLFNBQUEsTUFBVSxTQUNVOztxQkFEZDtxQkFBVztHQUN4QyxtQkFBYSxTQUFNLGdCQUFZLE1BQUs7V0FBUywrQkFBb0IsNkJBQWtCLE1BQU07O0dBQ3pGLGFBQVMsZUFBTyxhQUFXO0VBQUE7RUFFNUIsUUFBTSxTQUFPLE1BQ1MsVUFBQTs7R0FBckIsU0FBTztHQUNQLHNCQUFpQjtHQUNqQixvQkFBZTtFQUFBO0VBcEhoQix3QkFBQTtrQkFzSEEiLCJmaWxlIjoiYXQvU2VxL0RlcXVlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=