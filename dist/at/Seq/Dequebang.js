"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../math/Number","../../math/methods","../../methods","../../Objectbang","../../Type/Js-Method","../../Type/Kind","../../Type/Pred-Type","../../Type/Tuple","../at","../atbang","../at-Type","../q","./Arraybang","./Range","./Seq","./Seqbang"],(exports,compare_0,Number_1,methods_2,methods_3,Object_33_4,Js_45Method_5,Kind_6,Pred_45Type_7,Tuple_8,_64_9,_64_33_10,_64_45Type_11,_63_12,Array_33_13,Range_14,Seq_15,Seq_33_16)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_60_63=_ms.get(_$2,"<?"),_$3=_ms.getModule(Number_1),modulo=_ms.get(_$3,"modulo"),Nat=_ms.get(_$3,"Nat"),_$4=_ms.getModule(methods_2),_43=_ms.get(_$4,"+"),_45=_ms.get(_$4,"-"),_42=_ms.get(_$4,"*"),_$5=_ms.getModule(methods_3),sub=_ms.get(_$5,"sub"),_$6=_ms.getModule(Object_33_4),p_33=_ms.get(_$6,"p!"),_$7=_ms.getModule(Js_45Method_5),js_45impl_33=_ms.get(_$7,"js-impl!"),_$8=_ms.getModule(Kind_6),kind_33=_ms.get(_$8,"kind!"),self_45kind_33=_ms.get(_$8,"self-kind!"),_$9=_ms.getModule(Pred_45Type_7),Any=_ms.get(_$9,"Any"),Tuple=_ms.getDefaultExport(Tuple_8),_64=_ms.getDefaultExport(_64_9),_$11=_ms.getModule(_64_9),_43_43_39=_ms.get(_$11,"++'"),count=_ms.get(_$11,"count"),empty_63=_ms.get(_$11,"empty?"),iterator=_ms.get(_$11,"iterator"),map=_ms.get(_$11,"map"),_$12=_ms.getModule(_64_33_10),empty_33=_ms.get(_$12,"empty!"),_64_45Type=_ms.getDefaultExport(_64_45Type_11),_$13=_ms.getModule(_64_45Type_11),empty=_ms.get(_$13,"empty"),_$14=_ms.getModule(_63_12),un_45_63=_ms.get(_$14,"un-?"),Array_33=_ms.getDefaultExport(Array_33_13),_$16=_ms.getModule(Range_14),range=_ms.get(_$16,"range"),_$17=_ms.getModule(Seq_15),_63nth=_ms.get(_$17,"?nth"),reverse=_ms.get(_$17,"reverse"),Seq_33=_ms.getDefaultExport(Seq_33_16),_$18=_ms.getModule(Seq_33_16),_60_43_43_33=_ms.get(_$18,"<++!"),_43_43_62_33=_ms.get(_$18,"++>!"),_63_60pop_33=_ms.get(_$18,"?<pop!"),_63pop_62_33=_ms.get(_$18,"?pop>!"),set_45nth_33=_ms.get(_$18,"set-nth!");
		const Deque_33=Tuple(()=>{
			const built={};
			const doc=built.doc=`Seq! that can efficiently add values on either side.`;
			const props=built.props=()=>{
				const built=[];
				_ms.add(built,[`data!`,Array_33]);
				_ms.add(built,[`start-index!`,Nat]);
				_ms.add(built,[`end-index!`,Nat]);
				return built
			}();
			return _ms.setName(built,"Deque!")
		}());
		self_45kind_33(Deque_33,_64_45Type,()=>{
			const built=new global.Map();
			_ms.assoc(built,empty,()=>{
				return Deque_33(empty(Array_33,8),0,0)
			});
			return built
		}());
		const capacity=function capacity(_){
			return count(_["data!"])
		};
		const expand_33=function expand_33(_){
			const old_45data=_["data!"];
			const old_45capacity=capacity(_);
			const new_45capacity=_42(2,old_45capacity);
			const new_45data=empty(Array_33,new_45capacity);
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
		js_45impl_33(iterator,Deque_33,function*(){
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
		kind_33(Deque_33,Seq_33,()=>{
			const built=new global.Map();
			_ms.assoc(built,_60_43_43_33,(_,ems)=>{
				_ms.checkContains(_64,ems,"ems");
				for(let em of reverse(ems)){
					const new_45start=prev_45index(_,_["start-index!"]);
					if(_ms.bool(_61_63(new_45start,_["end-index!"]))){
						expand_33(_);
						_60_43_43_33(_,[em])
					} else {
						p_33(_,`start-index!`,new_45start);
						set_45nth_33(_["data!"],_["start-index!"],em)
					}
				}
			});
			_ms.assoc(built,_43_43_62_33,(_,ems)=>{
				_ms.checkContains(_64,ems,"ems");
				for(let em of ems){
					const new_45end=next_45index(_,_["end-index!"]);
					if(_ms.bool(_61_63(new_45end,_["start-index!"]))){
						expand_33(_);
						_43_43_62_33(_,[em])
					} else {
						set_45nth_33(_["data!"],_["end-index!"],em);
						p_33(_,`end-index!`,new_45end)
					}
				}
			});
			_ms.assoc(built,_63_60pop_33,_=>{
				return _ms.bool(empty_63(_))?_ms.None:_ms.some(()=>{
					const x=_ms.sub(_["data!"],_["start-index!"]);
					p_33(_,`start-index!`,next_45index(_,_["start-index!"]));
					return x
				}())
			});
			_ms.assoc(built,_63pop_62_33,_=>{
				return _ms.bool(empty_63(_))?_ms.None:_ms.some(()=>{
					const new_45end=prev_45index(_,_["end-index!"]);
					p_33(_,`end-index!`,new_45end);
					return _ms.sub(_["data!"],new_45end)
				}())
			});
			_ms.assoc(built,_63nth,(_,index)=>{
				_ms.checkContains(Nat,index,"index");
				return map(_63data_45index(_,index),_ms.sub(sub,_["data!"]))
			});
			_ms.assoc(built,set_45nth_33,(_,index,set_45to)=>{
				_ms.checkContains(Nat,index,"index");
				_ms.checkContains(Any,set_45to,"set-to");
				const data_45index=un_45_63(_63data_45index(_,index),_ms.lazy(()=>{
					return `Can't set at index ${_ms.show(index)}; count is ${_ms.show(count(_))}`
				}));
				set_45nth_33(_["data!"],data_45index,set_45to)
			});
			_ms.assoc(built,empty_33,_=>{
				empty_33(_["data!"]);
				p_33(_,`start-index!`,0);
				p_33(_,`end-index!`,0)
			});
			return built
		}());
		const name=exports.name=`Deque!`;
		exports.default=Deque_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9EZXF1ZSEubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFtQkEsZUFBUyxVQUNLOztHQUFiLG9CQUFNO0dBQ04sNEJBQ007O2tCQUFILENBQUcsUUFBTztrQkFDVixDQUFHLGVBQWM7a0JBQ2pCLENBQUcsYUFBWTs7Ozs7RUFFbkIsZUFBVyxTQUFPLGVBQ007O21CQUF2QixNQUNVLElBQUE7V0FBVCxTQUFRLE1BQU0sU0FBTyxHQUFHLEVBQUU7R0FBQTs7O0VBRzNCLGVBQVksa0JBQUEsRUFDQztVQUFaLE1BQU07O0VBRVAsZ0JBQVksbUJBQUEsRUFDQztHQUFaLGlCQUFXO0dBQ1gscUJBQWUsU0FBUTtHQUN2QixxQkFBZSxJQUFFLEVBQUU7R0FDbkIsaUJBQVcsTUFBTSxTQUFPO0dBQ25CLFFBQUEsU0FBUyxNQUFNLEVBQUUsZ0JBQ1k7SUFBakMsYUFBUyxXQUFTLGNBQU0sV0FBUztHQUFBO0dBQ2xDLEtBQUcsRUFBRyxRQUFPO0VBQUE7RUFFZCxtQkFBYyxzQkFBQSxFQUFFLE1BQ0s7VUFBcEIsT0FBTyxNQUFNLFNBQVE7RUFBQTtFQUV0QixtQkFBYyxzQkFBQSxFQUFFLE1BQ1M7cUJBREg7VUFDckIsYUFBVyxFQUFHLElBQUUsTUFBTTtFQUFBO0VBRXZCLG1CQUFjLHNCQUFBLEVBQUUsTUFDUztxQkFESDtVQUNyQixhQUFXLEVBQUcsSUFBRSxNQUFNO0VBQUE7RUFFdkIsc0JBQWUseUJBQUEsRUFBRSxNQUNTO3FCQURIO0dBQ3RCLFFBQUksSUFBRSxrQkFBZTs7SUFFcEIsWUFBQSxPQUFHLEVBQUUsU0FBUSxLQUNDO3FCQUFWLENBQUksT0FBRyxnQkFBYSxvQkFBaUIsT0FBRyxFQUFFLGdDQUNhO2FBQXpEO0tBQUE7V0FFRTtLQUFILFFBQUksYUFBVyxFQUFFO3FCQUNkLENBQUssT0FBRyxnQkFBYSxvQkFBaUIsT0FBRyxFQUFFLGdDQUNhO2FBQTFEO0tBQUE7Ozs7RUFFTCxhQUFTLFNBQVMsU0FDVyxXQUFBOztHQUE1QixjQUNjO0lBQWIsWUFBQSxPQUFHLG9CQUFZLHdCQUNhO1lBQTNCLFVBQUssTUFBTSxzQkFBZSxNQUFNLGlCQUFVLE1BQU0sRUFBRTtXQUUvQztZQUFILE1BQU0sc0JBQWM7OztHQUNqQixRQUFBLEtBQUEsUUFDTzttQkFBUixlQUFPO0dBQUE7RUFBQTtFQUVaLFFBQU0sU0FBTyxXQUNJOzttQkFBaEIsYUFBVSxDQUFBLEVBQUUsTUFDSztzQkFERDtJQUNWLFFBQUEsTUFBTSxRQUFRLEtBQ0c7S0FBckIsa0JBQVksYUFBVyxFQUFFO0tBRXBCLFlBQUosT0FBRyxZQUFVLGtCQUNZO01BQXhCLFVBQU87TUFDUCxhQUFLLEVBQUUsQ0FBRTtLQUFBLE9BRU47TUFBSCxLQUFHLEVBQUcsZUFBYztNQUNwQixhQUFTLFdBQVEsa0JBQWU7S0FBQTtJQUFBO0dBQUE7bUJBRXBDLGFBQVUsQ0FBQSxFQUFFLE1BQ0s7c0JBREQ7SUFDVixRQUFBLE1BQU0sSUFDRztLQUFiLGdCQUFVLGFBQVcsRUFBRTtLQUVsQixZQUFKLE9BQUcsVUFBUSxvQkFDYztNQUF4QixVQUFPO01BQ1AsYUFBSyxFQUFFLENBQUU7S0FBQSxPQUVOO01BQUgsYUFBUyxXQUFRLGdCQUFhO01BQzlCLEtBQUcsRUFBRyxhQUFZO0tBQUE7SUFBQTtHQUFBO21CQUl0QixhQUFXLEdBQ0M7b0JBQUosU0FBTSwwQkFDQztLQUFiLGdCQUFJLFdBQVE7S0FDWixLQUFHLEVBQUcsZUFBZSxhQUFXLEVBQUU7WUFDbEM7SUFBQTtHQUFBO21CQUVGLGFBQVcsR0FDQztvQkFBSixTQUFNLDBCQUNDO0tBQWIsZ0JBQVUsYUFBVyxFQUFFO0tBQ3ZCLEtBQUcsRUFBRyxhQUFZO29CQUNsQixXQUFRO0lBQUE7R0FBQTttQkFFVixPQUFTLENBQUEsRUFBRSxRQUNTO3NCQURIO1dBQ2hCLElBQUssZ0JBQVksRUFBRSxlQUFPLElBQUk7O21CQUUvQixhQUFjLENBQUEsRUFBRSxNQUFVLFdBQ1U7c0JBRGQ7c0JBQVc7SUFDaEMsbUJBQWEsU0FBTSxnQkFBWSxFQUFFO1lBQVMsK0JBQW9CLDZCQUFrQixNQUFLOztJQUNyRixhQUFTLFdBQVEsYUFBVztHQUFBO21CQUU3QixTQUFZLEdBQ0M7SUFBWixTQUFPO0lBRVAsS0FBRyxFQUFHLGVBQWM7SUFDcEIsS0FBRyxFQUFHLGFBQVk7R0FBQTs7O0VBeEhwQix3QkFBQTtrQkEwSEEiLCJmaWxlIjoiYXQvU2VxL0RlcXVlYmFuZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9