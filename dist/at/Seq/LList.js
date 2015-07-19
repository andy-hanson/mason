"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../js","../../Object","../../Type/Js-Method","../../Type/Kind","../../Type/Tuple","../at","../at-Type","./Seq"],(exports,js_0,Object_1,Js_45Method_2,Kind_3,Tuple_4,_64_5,_64_45Type_6,Seq_7)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(js_0),id_61_63=_ms.get(_$2,"id=?"),_$3=_ms.getModule(Object_1),p_33=_ms.get(_$3,"p!"),_$4=_ms.getModule(Js_45Method_2),js_45impl_33=_ms.get(_$4,"js-impl!"),_$5=_ms.getModule(Kind_3),kind_33=_ms.get(_$5,"kind!"),self_45kind_33=_ms.get(_$5,"self-kind!"),Tuple=_ms.getDefaultExport(Tuple_4),_64=_ms.getDefaultExport(_64_5),_$7=_ms.getModule(_64_5),_43_43=_ms.get(_$7,"++"),empty_63=_ms.get(_$7,"empty?"),iterator=_ms.get(_$7,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_6),_$8=_ms.getModule(_64_45Type_6),empty=_ms.get(_$8,"empty"),from_45stream=_ms.get(_$8,"from-stream"),Seq=_ms.getDefaultExport(Seq_7),_$9=_ms.getModule(Seq_7),_60_43_43_39=_ms.get(_$9,"<++'"),tail=_ms.get(_$9,"tail");
		const LList=Tuple(()=>{
			const built={};
			const doc=built.doc=`Singly-linked list.`;
			const props=built.props=[`head`,`tail`];
			return _ms.setName(built,"LList")
		}());
		const empty_45LList=LList(void 0,void 0);
		p_33(empty_45LList,`tail`,empty_45LList);
		self_45kind_33(LList,_64_45Type,()=>{
			const built=new global.Map();
			_ms.assoc(built,empty,()=>{
				return empty_45LList
			});
			_ms.assoc(built,from_45stream,_=>{
				return _60_43_43_39(empty_45LList,_)
			});
			return built
		}());
		js_45impl_33(iterator,LList,function*(){
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
		kind_33(LList,Seq,()=>{
			const built=new global.Map();
			_ms.assoc(built,empty_63,_=>{
				return id_61_63(_,empty_45LList)
			});
			_ms.assoc(built,tail,_=>{
				return _.tail
			});
			_ms.assoc(built,_60_43_43_39,(_,left_45added)=>{
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
			_ms.assoc(built,_43_43,(a,b)=>{
				return ()=>{
					const _=b;
					if(_ms.bool(_ms.contains(LList,_))){
						return _60_43_43_39(b,a)
					} else {
						return _43_43.default(a,b)
					}
				}()
			});
			return built
		}());
		const name=exports.name=`LList`;
		exports.default=LList;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9MTGlzdC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVVBLFlBQU8sVUFDSzs7R0FBWCxvQkFDQztHQUNELHdCQUFPLENBQUcsT0FBTzs7O0VBRWxCLG9CQUFjLE1BQU0sT0FBVTtFQUM5QixLQUFHLGNBQWEsT0FBTTtFQUV0QixlQUFXLE1BQU0sZUFDTTs7bUJBQXRCLE1BQ1UsSUFBQTtXQUFUO0dBQUE7bUJBQ0QsY0FBZ0IsR0FDQztXQUFoQixhQUFLLGNBQVk7R0FBQTs7O0VBRW5CLGFBQVMsU0FBUyxNQUNVLFdBQUE7O0dBQTNCLFFBQVE7R0FFSixPQUFBO0lBQUgsR0FBSSxTQUFPLEtBQ0c7S0FBYjtJQUFBO1dBQ0U7UUFDSTs7O0VBRVQsUUFBTSxNQUFNLFFBQ0c7O21CQUFkLFNBQVcsR0FDQztXQUFYLFNBQUssRUFBRTtHQUFBO21CQUVSLEtBQVMsR0FDQztXQUFUOzttQkFFRCxhQUFTLENBQUEsRUFBRSxlQUNZO3NCQUREO0lBQ3JCLFdBQU8sU0FBUztJQUNoQixRQUNLLFlBQUE7S0FBSixXQUFhOztNQUVaLFlBQUEsTUFDSTtjQUFIO01BQUEsT0FFRztjQUFILE1BQU0sTUFBTTtNQUFBO0tBQUE7SUFBQTtXQUNmO0dBQUE7bUJBR0QsT0FBTyxDQUFBLEVBQUUsSUFDQzs7S0FBSixRQUFBO0tBQ0oseUJBQUMsTUFBRCxJQUNNO2FBQUwsYUFBSyxFQUFFO0tBQUEsT0FFSjthQUFILGVBQVcsRUFBRTtLQUFBO0lBQUE7R0FBQTs7O0VBeERqQix3QkFBQTtrQkFVQSIsImZpbGUiOiJhdC9TZXEvTExpc3QuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==