"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../js","../../Type/Kind","../../Type/Method","../../Type/Tuple","../at","../at-Type","./Seq"],(exports,js_0,Kind_1,Method_2,Tuple_3,_64_4,_64_45Type_5,Seq_6)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(js_0),id_61_63=_ms.get(_$2,"id=?"),_$3=_ms.getModule(Kind_1),kind_33=_ms.get(_$3,"kind!"),self_45kind_33=_ms.get(_$3,"self-kind!"),_$4=_ms.getModule(Method_2),impl_33=_ms.get(_$4,"impl!"),self_45impl_33=_ms.get(_$4,"self-impl!"),Tuple=_ms.getDefaultExport(Tuple_3),_64=_ms.getDefaultExport(_64_4),_$6=_ms.getModule(_64_4),_43_43=_ms.get(_$6,"++"),empty_63=_ms.get(_$6,"empty?"),iterator=_ms.get(_$6,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_5),_$7=_ms.getModule(_64_45Type_5),empty=_ms.get(_$7,"empty"),from_45stream=_ms.get(_$7,"from-stream"),Seq=_ms.getDefaultExport(Seq_6),_$8=_ms.getModule(Seq_6),_60_43_43_39=_ms.get(_$8,"<++'"),tail=_ms.get(_$8,"tail");
		const LList=Tuple(()=>{
			const built={};
			const doc=built.doc=`Singly-linked list.`;
			const props=built.props=[`head`,`tail`];
			return _ms.setName(built,"LList")
		}());
		const empty_45LList=LList(void 0,void 0);
		empty_45LList.tail=empty_45LList;
		self_45kind_33(LList,_64_45Type);
		self_45impl_33(empty,LList,()=>{
			return empty_45LList
		});
		self_45impl_33(from_45stream,LList,_=>{
			return _60_43_43_39(empty_45LList,_)
		});
		impl_33(iterator,LList,function*(){
			const _this=this;
			let cur=_this;
			for(;;){
				if(empty_63(cur)){
					break
				};
				(yield cur.head);
				cur=cur.tail
			}
		});
		kind_33(LList,Seq);
		impl_33(empty_63,LList,function(){
			const _this=this;
			return id_61_63(_this,empty_45LList)
		});
		impl_33(tail,LList,_=>{
			return _.tail
		});
		impl_33(_60_43_43_39,LList,(_,left_45added)=>{
			_ms.checkContains(_64,left_45added,"left-added");
			const iter=iterator(left_45added);
			const f=function f(){
				const _$42=iter.next(),value=_$42.value,done=_$42.done;
				return ()=>{
					if(_ms.bool(done)){
						return _
					} else {
						return LList(value,f())
					}
				}()
			};
			return f()
		});
		impl_33(_43_43,LList,function(other){
			const _this=this;
			return ()=>{
				const _=other;
				if(_ms.bool(_ms.contains(LList,_))){
					return _60_43_43_39(other,_this)
				} else {
					return _43_43.default.call(_this,other)
				}
			}()
		});
		const name=exports.name=`LList`;
		exports.default=LList;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9MTGlzdC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVNBLFlBQU8sVUFDSzs7R0FBWCxvQkFDQztHQUNELHdCQUFPLENBQUcsT0FBTzs7O0VBRWxCLG9CQUFjLE1BQU0sT0FBVTtFQUM5QixtQkFBb0I7RUFFcEIsZUFBVyxNQUFNO0VBQ2pCLGVBQVcsTUFBTSxNQUNPLElBQUE7VUFBdkI7RUFBQTtFQUNELGVBQVcsY0FBWSxNQUFPLEdBQ0M7VUFBOUIsYUFBSyxjQUFZO0VBQUE7RUFFbEIsUUFBTSxTQUFTLE1BQ1UsV0FBQTs7R0FBeEIsUUFBUTtHQUVKLE9BQUE7SUFBSCxHQUFJLFNBQU8sS0FDRztLQUFiO0lBQUE7V0FDRTtRQUNJOzs7RUFFVCxRQUFNLE1BQU07RUFDWixRQUFNLFNBQU8sTUFDUSxVQUFBOztVQUFwQixTQUFLLE1BQUs7RUFBQTtFQUVYLFFBQU0sS0FBSyxNQUFPLEdBQ0M7VUFBbEI7O0VBRUQsUUFBTSxhQUFLLE1BQU8sQ0FBQSxFQUFFLGVBQ1k7cUJBREQ7R0FDOUIsV0FBTyxTQUFTO0dBQ2hCLFFBQ0ssWUFBQTtJQUFKLFdBQWE7O0tBRVosWUFBQSxNQUNJO2FBQUg7S0FBQSxPQUVHO2FBQUgsTUFBTSxNQUFNO0tBQUE7SUFBQTtHQUFBO1VBQ2Y7RUFBQTtFQUdELFFBQU0sT0FBRyxNQUFRLFNBQUEsTUFDSzs7O0lBQWhCLFFBQUE7SUFDSix5QkFBQyxNQUFELElBQ007WUFBTCxhQUFLLE1BQU07SUFBQSxPQUVSO1lBQUgsb0JBQWdCLE1BQUs7SUFBQTtHQUFBO0VBQUE7RUF2RHhCLHdCQUFBO2tCQVNBIiwiZmlsZSI6ImF0L1NlcS9MTGlzdC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9