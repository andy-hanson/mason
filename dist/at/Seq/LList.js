"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../js","../../Object","../../Type/Kind","../../Type/Method","../../Type/Tuple","../at","../at-Type","./Seq"],(exports,js_0,Object_1,Kind_2,Method_3,Tuple_4,_64_5,_64_45Type_6,Seq_7)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(js_0),id_61_63=_ms.get(_$2,"id=?"),_$3=_ms.getModule(Object_1),p_33=_ms.get(_$3,"p!"),_$4=_ms.getModule(Kind_2),kind_33=_ms.get(_$4,"kind!"),self_45kind_33=_ms.get(_$4,"self-kind!"),_$5=_ms.getModule(Method_3),impl_33=_ms.get(_$5,"impl!"),self_45impl_33=_ms.get(_$5,"self-impl!"),Tuple=_ms.getDefaultExport(Tuple_4),_64=_ms.getDefaultExport(_64_5),_$7=_ms.getModule(_64_5),_43_43=_ms.get(_$7,"++"),empty_63=_ms.get(_$7,"empty?"),iterator=_ms.get(_$7,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_6),_$8=_ms.getModule(_64_45Type_6),empty=_ms.get(_$8,"empty"),from_45stream=_ms.get(_$8,"from-stream"),Seq=_ms.getDefaultExport(Seq_7),_$9=_ms.getModule(Seq_7),_60_43_43_39=_ms.get(_$9,"<++'"),tail=_ms.get(_$9,"tail");
		const LList=Tuple(()=>{
			const built={};
			const doc=built.doc=`Singly-linked list.`;
			const props=built.props=[`head`,`tail`];
			return _ms.setName(built,"LList")
		}());
		const empty_45LList=LList(void 0,void 0);
		p_33(empty_45LList,`tail`,empty_45LList);
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
				const _$43=iter.next(),value=_$43.value,done=_$43.done;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9MTGlzdC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVVBLFlBQU8sVUFDSzs7R0FBWCxvQkFDQztHQUNELHdCQUFPLENBQUcsT0FBTzs7O0VBRWxCLG9CQUFjLE1BQU0sT0FBVTtFQUM5QixLQUFHLGNBQWEsT0FBTTtFQUV0QixlQUFXLE1BQU07RUFDakIsZUFBVyxNQUFNLE1BQ08sSUFBQTtVQUF2QjtFQUFBO0VBQ0QsZUFBVyxjQUFZLE1BQU8sR0FDQztVQUE5QixhQUFLLGNBQVk7RUFBQTtFQUVsQixRQUFNLFNBQVMsTUFDVSxXQUFBOztHQUF4QixRQUFRO0dBRUosT0FBQTtJQUFILEdBQUksU0FBTyxLQUNHO0tBQWI7SUFBQTtXQUNFO1FBQ0k7OztFQUVULFFBQU0sTUFBTTtFQUNaLFFBQU0sU0FBTyxNQUNRLFVBQUE7O1VBQXBCLFNBQUssTUFBSztFQUFBO0VBRVgsUUFBTSxLQUFLLE1BQU8sR0FDQztVQUFsQjs7RUFFRCxRQUFNLGFBQUssTUFBTyxDQUFBLEVBQUUsZUFDWTtxQkFERDtHQUM5QixXQUFPLFNBQVM7R0FDaEIsUUFDSyxZQUFBO0lBQUosV0FBYTs7S0FFWixZQUFBLE1BQ0k7YUFBSDtLQUFBLE9BRUc7YUFBSCxNQUFNLE1BQU07S0FBQTtJQUFBO0dBQUE7VUFDZjtFQUFBO0VBR0QsUUFBTSxPQUFHLE1BQVEsU0FBQSxNQUNLOzs7SUFBaEIsUUFBQTtJQUNKLHlCQUFDLE1BQUQsSUFDTTtZQUFMLGFBQUssTUFBTTtJQUFBLE9BRVI7WUFBSCxvQkFBZ0IsTUFBSztJQUFBO0dBQUE7RUFBQTtFQXhEeEIsd0JBQUE7a0JBVUEiLCJmaWxlIjoiYXQvU2VxL0xMaXN0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=