"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../js","../../Type/Kind","../at","../at-Type","./Seq"],(exports,js_0,Kind_1,_64_2,_64_45Type_3,Seq_4)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(js_0),id_61_63=_ms.get(_$2,"id=?"),_$3=_ms.getModule(Kind_1),kind_33=_ms.get(_$3,"kind!"),self_45kind_33=_ms.get(_$3,"self-kind!"),_64=_ms.getDefaultExport(_64_2),_$4=_ms.getModule(_64_2),_43_43=_ms.get(_$4,"++"),empty_63=_ms.get(_$4,"empty?"),iterator=_ms.get(_$4,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_3),_$5=_ms.getModule(_64_45Type_3),empty=_ms.get(_$5,"empty"),from_45stream=_ms.get(_$5,"from-stream"),Seq=_ms.getDefaultExport(Seq_4),_$6=_ms.getModule(Seq_4),_60_43_43_39=_ms.get(_$6,"<++'"),tail=_ms.get(_$6,"tail");
		const LList=()=>{
			const _=class LList{
				static [_ms.symbol(empty)](){
					const _this=this;
					return empty_45LList
				}
				static [_ms.symbol(from_45stream)](_){
					const _this=this;
					return _60_43_43_39(empty_45LList,_)
				}
				constructor(head,tail){
					_ms.newProperty(this,"head",head);
					_ms.newProperty(this,"tail",tail)
				}
				*[_ms.symbol(iterator)](){
					const _this=this;
					let cur=_this;
					for(;;){
						if(empty_63(cur)){
							break
						};
						(yield cur.head);
						cur=cur.tail
					}
				}
				[_ms.symbol(empty_63)](){
					const _this=this;
					return id_61_63(_this,empty_45LList)
				}
				[_ms.symbol(tail)](){
					const _this=this;
					return _this.tail
				}
				[_ms.symbol(_60_43_43_39)](left_45added){
					const _this=this;
					_ms.checkContains(_64,left_45added,"left-added");
					const iter=iterator(left_45added);
					const f=function f(){
						const _$44=iter.next(),value=_$44.value,done=_$44.done;
						return ()=>{
							if(done){
								return _this
							} else {
								return new (LList)(value,f())
							}
						}()
					};
					return f()
				}
				[_ms.symbol(_43_43)](other){
					const _this=this;
					return ()=>{
						const _=other;
						if(_ms.contains(LList,_)){
							return _60_43_43_39(other,_this)
						} else {
							return _43_43.default.call(_this,other)
						}
					}()
				}
			};
			self_45kind_33(_,_64_45Type);
			kind_33(_,Seq);
			return _
		}();
		const empty_45LList=new (LList)(void 0,void 0);
		Object.defineProperty(empty_45LList,`tail`,()=>{
			const built={};
			const value=built.value=empty_45LList;
			return built
		}());
		const name=exports.name=`LList`;
		exports.default=LList;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9MTGlzdC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQU9BLGdCQUVJO1NBREg7dUJBSUMsU0FDTztXQTBDTTtZQTFDWjtJQUFBO3VCQUNELGdCQUFhLEVBQ0M7V0F3Q0Q7WUF4Q1osYUFBSyxjQUFZO0lBQUE7Z0JBT1IsS0FBSyxLQUNJO3FCQUFuQixZQUFRO3FCQUNSLFlBQVE7SUFBQTtpQkFFVCxZQUNZO1dBNEJFO0tBNUJiLFFBNEJhO0tBMUJULE9BQUE7TUFBSCxHQUFJLFNBQU8sS0FDRztPQUFiO01BQUE7YUFDRTtVQUNJOzs7Z0JBRVQsWUFDUTtXQW9CTTtZQXBCYixTQW9CYSxNQXBCSDtJQUFBO2dCQUVYLFFBQ007V0FpQlE7WUFBQTs7Z0JBZmQsZUFBTSxhQUNZO1dBY0o7dUJBZkc7S0FDaEIsV0FBTyxTQUFTO0tBQ2hCLFFBQ0ssWUFBQTtNQUFKLFdBQWE7O09BRVosR0FBQSxLQUNJO2VBU087T0FBQSxPQVBQO2VBQUgsS0FBSSxPQUFNLE1BQU07T0FBQTtNQUFBO0tBQUE7WUFDbkI7SUFBQTtnQkFHRCxTQUFJLE1BQ0s7V0FFSzs7TUFGUixRQUFBO01BQ0osZ0JBQUMsTUFBRCxHQUNNO2NBQUwsYUFBSyxNQUFNO01BQUEsT0FFUjtjQUFILG9CQUZXLE1BRVU7TUFBQTtLQUFBO0lBQUE7R0FBQTtHQWhEdkIsZUFBVyxFQUFFO0dBQ2IsUUFBTSxFQUFFO1VBRlQ7RUFBQTtFQW1ERCxvQkFBYyxLQUFJLE9BQU0sT0FBVTtFQUNsQyxzQkFBc0IsY0FBYSxXQUNLOztHQUF2Qyx3QkFBTzs7O0VBN0RSLHdCQUFBO2tCQU9BIiwiZmlsZSI6ImF0L1NlcS9MTGlzdC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9