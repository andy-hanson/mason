"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Boolean","../../compare","../../math/Number","../../math/methods","../../methods","../../Objectbang","../../Type/Js-Method","../../Type/Kind","../../Type/Pred-Type","../../Type/Tuple","../at","../atbang","../at-Type","../q","./Arraybang","./Range","./Seq","./Seqbang"],function(exports,Boolean_0,compare_1,Number_2,methods_3,methods_4,Object_33_5,Js_45Method_6,Kind_7,Pred_45Type_8,Tuple_9,_64_10,_64_33_11,_64_45Type_12,_63_13,Array_33_14,Range_15,Seq_16,Seq_33_17){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_ms.get(_$2,"and"),not=_ms.get(_$2,"not"),or=_ms.get(_$2,"or"),_$3=_ms.getModule(compare_1),_61_63=_ms.get(_$3,"=?"),_60_63=_ms.get(_$3,"<?"),_$4=_ms.getModule(Number_2),modulo=_ms.get(_$4,"modulo"),Nat=_ms.get(_$4,"Nat"),_$5=_ms.getModule(methods_3),_43=_ms.get(_$5,"+"),_45=_ms.get(_$5,"-"),_42=_ms.get(_$5,"*"),_$6=_ms.getModule(methods_4),sub=_ms.get(_$6,"sub"),_$7=_ms.getModule(Object_33_5),p_33=_ms.get(_$7,"p!"),_$8=_ms.getModule(Js_45Method_6),js_45impl_33=_ms.get(_$8,"js-impl!"),_$9=_ms.getModule(Kind_7),kind_33=_ms.get(_$9,"kind!"),self_45kind_33=_ms.get(_$9,"self-kind!"),_$10=_ms.getModule(Pred_45Type_8),Any=_ms.get(_$10,"Any"),Tuple=_ms.getDefaultExport(Tuple_9),_64=_ms.getDefaultExport(_64_10),_$12=_ms.getModule(_64_10),_43_43_39=_ms.get(_$12,"++'"),count=_ms.get(_$12,"count"),empty_63=_ms.get(_$12,"empty?"),iterator=_ms.get(_$12,"iterator"),map=_ms.get(_$12,"map"),_$13=_ms.getModule(_64_33_11),empty_33=_ms.get(_$13,"empty!"),_64_45Type=_ms.getDefaultExport(_64_45Type_12),_$14=_ms.getModule(_64_45Type_12),empty=_ms.get(_$14,"empty"),_$15=_ms.getModule(_63_13),un_45_63=_ms.get(_$15,"un-?"),Array_33=_ms.getDefaultExport(Array_33_14),_$17=_ms.getModule(Range_15),range=_ms.get(_$17,"range"),_$18=_ms.getModule(Seq_16),_63nth=_ms.get(_$18,"?nth"),reverse=_ms.get(_$18,"reverse"),Seq_33=_ms.getDefaultExport(Seq_33_17),_$19=_ms.getModule(Seq_33_17),_60_43_43_33=_ms.get(_$19,"<++!"),_43_43_62_33=_ms.get(_$19,"++>!"),_63_60pop_33=_ms.get(_$19,"?<pop!"),_63pop_62_33=_ms.get(_$19,"?pop>!"),set_45nth_33=_ms.get(_$19,"set-nth!");
		const Deque_33=Tuple(function(){
			const built={};
			const doc=built.doc="Seq! that can efficiently add values on either side.";
			const props=built.props=function(){
				const built=[];
				_ms.add(built,["data!",Array_33]);
				_ms.add(built,["start-index!",Nat]);
				_ms.add(built,["end-index!",Nat]);
				return built
			}();
			return _ms.setName(built,"Deque!")
		}());
		self_45kind_33(Deque_33,_64_45Type,function(){
			const built=new global.Map();
			_ms.assoc(built,empty,function(){
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
			for(let index of range(0,old_45capacity)[Symbol.iterator]()){
				set_45nth_33(new_45data,index,_ms.sub(old_45data,index))
			};
			p_33(_,"data!",new_45data)
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
			return function(){
				if(_ms.bool(_60_63(a,capacity(_)))){
					return _ms.bool(or(_60_63(_["end-index!"],_["start-index!"]),_ms.lazy(function(){
						return _60_63(a,_["end-index!"])
					})))?_ms.some(function(){
						return a
					}()):_ms.None
				} else {
					const b=wrap_45index(_,a);
					return _ms.bool(and(_60_63(_["end-index!"],_["start-index!"]),_ms.lazy(function(){
						return _60_63(b,_["end-index!"])
					})))?_ms.some(function(){
						return b
					}()):_ms.None
				}
			}()
		};
		js_45impl_33(iterator,Deque_33,function*(){
			const self=this;
			const indices=(yield* function*(){
				if(_ms.bool(_60_63(self["end-index!"],self["start-index!"]))){
					return _43_43_39(range(self["start-index!"],count(self["data!"])),range(0,self["end-index!"]))
				} else {
					return range(self["start-index!"],self["end-index!"])
				}
			}());
			for(let _ of indices[Symbol.iterator]()){
				(yield _ms.sub(this["data!"],_))
			}
		});
		kind_33(Deque_33,Seq_33,function(){
			const built=new global.Map();
			_ms.assoc(built,_60_43_43_33,function(_,ems){
				_ms.checkContains(_64,ems,"ems");
				for(let em of reverse(ems)[Symbol.iterator]()){
					const new_45start=prev_45index(_,_["start-index!"]);
					if(_ms.bool(_61_63(new_45start,_["end-index!"]))){
						expand_33(_);
						_60_43_43_33(_,[em])
					} else {
						p_33(_,"start-index!",new_45start);
						set_45nth_33(_["data!"],_["start-index!"],em)
					}
				}
			});
			_ms.assoc(built,_43_43_62_33,function(_,ems){
				_ms.checkContains(_64,ems,"ems");
				for(let em of ems[Symbol.iterator]()){
					const new_45end=next_45index(_,_["end-index!"]);
					if(_ms.bool(_61_63(new_45end,_["start-index!"]))){
						expand_33(_);
						_43_43_62_33(_,[em])
					} else {
						set_45nth_33(_["data!"],_["end-index!"],em);
						p_33(_,"end-index!",new_45end)
					}
				}
			});
			_ms.assoc(built,_63_60pop_33,function(_){
				return _ms.bool(not(empty_63(_)))?_ms.some(function(){
					const x=_ms.sub(_["data!"],_["start-index!"]);
					p_33(_,"start-index!",next_45index(_,_["start-index!"]));
					return x
				}()):_ms.None
			});
			_ms.assoc(built,_63pop_62_33,function(_){
				return _ms.bool(not(empty_63(_)))?_ms.some(function(){
					const new_45end=prev_45index(_,_["end-index!"]);
					p_33(_,"end-index!",new_45end);
					return _ms.sub(_["data!"],new_45end)
				}()):_ms.None
			});
			_ms.assoc(built,_63nth,function(_,index){
				_ms.checkContains(Nat,index,"index");
				return map(_63data_45index(_,index),_ms.sub(sub,_["data!"]))
			});
			_ms.assoc(built,set_45nth_33,function(_,index,set_45to){
				_ms.checkContains(Nat,index,"index");
				_ms.checkContains(Any,set_45to,"set-to");
				const data_45index=un_45_63(_63data_45index(_,index),_ms.lazy(function(){
					return ((("Can't set at index "+_ms.show(index))+"; count is ")+_ms.show(count(_)))
				}));
				set_45nth_33(_["data!"],data_45index,set_45to)
			});
			_ms.assoc(built,empty_33,function(_){
				empty_33(_["data!"]);
				p_33(_,"start-index!",0);
				p_33(_,"end-index!",0)
			});
			return built
		}());
		const name=exports.name="Deque!";
		exports.default=Deque_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9EZXF1ZSEubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFvQkEsZUFBUyxnQkFDSzs7R0FBYixvQkFBTTtHQUNOLGtDQUNNOztrQkFBSCxDQUFHLFFBQU87a0JBQ1YsQ0FBRyxlQUFjO2tCQUNqQixDQUFHLGFBQVk7Ozs7O0VBRW5CLGVBQVcsU0FBTyxxQkFDTTs7bUJBQXZCLE1BQ1UsVUFBQTtXQUFULFNBQVEsTUFBTSxTQUFPLEdBQUcsRUFBRTtHQUFBOzs7RUFHM0IsZUFBWSxrQkFBQSxFQUNDO1VBQVosTUFBTTs7RUFFUCxnQkFBWSxtQkFBQSxFQUNDO0dBQVosaUJBQVc7R0FDWCxxQkFBZSxTQUFRO0dBQ3ZCLHFCQUFlLElBQUUsRUFBRTtHQUNuQixpQkFBVyxNQUFNLFNBQU87R0FDbkIsUUFBQSxTQUFTLE1BQU0sRUFBRSxtQ0FDWTtJQUFqQyxhQUFTLFdBQVMsY0FBTSxXQUFTO0dBQUE7R0FDbEMsS0FBRyxFQUFHLFFBQU87RUFBQTtFQUVkLG1CQUFjLHNCQUFBLEVBQUUsTUFDSztVQUFwQixPQUFPLE1BQU0sU0FBUTtFQUFBO0VBRXRCLG1CQUFjLHNCQUFBLEVBQUUsTUFDUztxQkFESDtVQUNyQixhQUFXLEVBQUcsSUFBRSxNQUFNO0VBQUE7RUFFdkIsbUJBQWMsc0JBQUEsRUFBRSxNQUNTO3FCQURIO1VBQ3JCLGFBQVcsRUFBRyxJQUFFLE1BQU07RUFBQTtFQUV2QixzQkFBZSx5QkFBQSxFQUFFLE1BQ1M7cUJBREg7R0FDdEIsUUFBSSxJQUFFLGtCQUFlOztJQUVwQixZQUFBLE9BQUcsRUFBRSxTQUFRLEtBQ0M7cUJBQVYsR0FBSSxPQUFHLGdCQUFhO2FBQWtCLE9BQUcsRUFBRTs2QkFDYTthQUExRDtLQUFBO1dBRUU7S0FBSCxRQUFJLGFBQVcsRUFBRTtxQkFDZCxJQUFLLE9BQUcsZ0JBQWE7YUFBa0IsT0FBRyxFQUFFOzZCQUNhO2FBQTNEO0tBQUE7Ozs7RUFFTCxhQUFTLFNBQVMsU0FDVSxXQUFBO0dBQzNCLFdBQU87R0FDUCxjQUNjO0lBQWIsWUFBQSxPQUFHLG1CQUFnQix1QkFDaUI7WUFBbkMsVUFBSyxNQUFNLHFCQUFtQixNQUFNLGdCQUFjLE1BQU0sRUFBRTtXQUV2RDtZQUFILE1BQU0scUJBQWtCOzs7R0FDckIsUUFBQSxLQUFBLDJCQUNPO21CQUFSLGNBQVc7R0FBQTtFQUFBO0VBRWhCLFFBQU0sU0FBTyxpQkFDSTs7bUJBQWhCLGFBQVUsU0FBQSxFQUFFLElBQ0s7c0JBREQ7SUFDVixRQUFBLE1BQU0sUUFBUSx3QkFDRztLQUFyQixrQkFBWSxhQUFXLEVBQUU7S0FFcEIsWUFBSixPQUFHLFlBQVUsa0JBQ1k7TUFBeEIsVUFBTztNQUNQLGFBQUssRUFBRSxDQUFFO0tBQUEsT0FFTjtNQUFILEtBQUcsRUFBRyxlQUFjO01BQ3BCLGFBQVMsV0FBUSxrQkFBZTtLQUFBO0lBQUE7R0FBQTttQkFFcEMsYUFBVSxTQUFBLEVBQUUsSUFDSztzQkFERDtJQUNWLFFBQUEsTUFBTSx1QkFDRztLQUFiLGdCQUFVLGFBQVcsRUFBRTtLQUVsQixZQUFKLE9BQUcsVUFBUSxvQkFDYztNQUF4QixVQUFPO01BQ1AsYUFBSyxFQUFFLENBQUU7S0FBQSxPQUVOO01BQUgsYUFBUyxXQUFRLGdCQUFhO01BQzlCLEtBQUcsRUFBRyxhQUFZO0tBQUE7SUFBQTtHQUFBO21CQUl0QixhQUFXLFNBQUEsRUFDQztvQkFBUixJQUFJLFNBQU0sd0JBQ0M7S0FBYixnQkFBSSxXQUFRO0tBQ1osS0FBRyxFQUFHLGVBQWUsYUFBVyxFQUFFO1lBQ2xDO0lBQUE7O21CQUVGLGFBQVcsU0FBQSxFQUNDO29CQUFSLElBQUksU0FBTSx3QkFDQztLQUFiLGdCQUFVLGFBQVcsRUFBRTtLQUN2QixLQUFHLEVBQUcsYUFBWTtvQkFDbEIsV0FBUTtJQUFBOzttQkFFVixPQUFTLFNBQUEsRUFBRSxNQUNTO3NCQURIO1dBQ2hCLElBQUssZ0JBQVksRUFBRSxlQUFPLElBQUk7O21CQUUvQixhQUFjLFNBQUEsRUFBRSxNQUFVLFNBQ1U7c0JBRGQ7c0JBQVc7SUFDaEMsbUJBQWEsU0FBTSxnQkFBWSxFQUFFO1lBQVMsa0NBQW9CLGdDQUFrQixNQUFLO0lBQUE7SUFDckYsYUFBUyxXQUFRLGFBQVc7R0FBQTttQkFFN0IsU0FBWSxTQUFBLEVBQ0M7SUFBWixTQUFPO0lBRVAsS0FBRyxFQUFHLGVBQWM7SUFDcEIsS0FBRyxFQUFHLGFBQVk7R0FBQTs7O0VBM0hwQix3QkFBQTtrQkE2SEEiLCJmaWxlIjoiYXQvU2VxL0RlcXVlYmFuZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9