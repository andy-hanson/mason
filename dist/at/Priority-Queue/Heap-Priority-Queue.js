"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../compare","./../../math/Number","./../../math/methods","./../../Type/Kind","./../at","./../at-Type","./Priority-Queue"],(exports,compare_0,Number_1,methods_2,Kind_3,_64_4,_64_45Type_5,Priority_45Queue_6)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_60_63=_ms.get(_$0,"<?"),_$1=_ms.getModule(Number_1),int_47=_ms.get(_$1,"int/"),_$2=_ms.getModule(methods_2),_43=_ms.get(_$2,"+"),_45=_ms.get(_$2,"-"),_42=_ms.get(_$2,"*"),_$3=_ms.getModule(Kind_3),self_45kind_33=_ms.get(_$3,"self-kind!"),_$4=_ms.getModule(_64_4),_43_43_33=_ms.get(_$4,"++!"),count=_ms.get(_$4,"count"),empty_33=_ms.get(_$4,"empty!"),empty_63=_ms.get(_$4,"empty?"),iterator=_ms.get(_$4,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_5),_$5=_ms.getModule(_64_45Type_5),empty=_ms.get(_$5,"empty"),Priority_45Queue=_ms.getDefaultExport(Priority_45Queue_6),_$6=_ms.getModule(Priority_45Queue_6),_63pop_33=_ms.get(_$6,"?pop!");
		const Heap_45Priority_45Queue=exports.default=(()=>{
			const _=class Heap_45Priority_45Queue{
				static [_ms.symbol(empty)](){
					const _this=this;
					return new (_this)()
				}
				constructor(){
					_ms.newProperty(this,"array",[])
				}
				[_ms.symbol(iterator)](){
					const _this=this;
					return iterator(_this.array)
				}
				[_ms.symbol(_43_43_33)](added){
					const _this=this;
					for(let _ of added){
						add_33(_this.array,_)
					}
				}
				[_ms.symbol(_63pop_33)](){
					const _this=this;
					return (empty_63(_this)?_ms.None:_ms.some((()=>{
						return (_=>{
							fix_45down_33(_this.array);
							return _
						})(_ms.sub(_this.array,0))
					})()))
				}
				[_ms.symbol(empty_63)](){
					const _this=this;
					return empty_63(_this.array)
				}
				[_ms.symbol(empty_33)](){
					const _this=this;
					empty_33(_this.array)
				}
			};
			_ms.kindDo(_,Priority_45Queue);
			self_45kind_33(_,_64_45Type);
			return _
		})();
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
					_ms.setSub(heap,0,val,"mutate");
					break
				};
				const i_45parent=index_45parent(i_45cur);
				const parent=_ms.sub(heap,i_45parent);
				if(! _60_63(val,parent)){
					_ms.setSub(heap,i_45cur,val,"mutate");
					break
				};
				_ms.setSub(heap,i_45cur,parent,"mutate");
				i_45cur=i_45parent
			}
		};
		const fix_45down_33=function fix_45down_33(heap){
			const val=heap.pop();
			const size=count(heap);
			if(! _61_63(size,0)){
				let i_45cur=0;
				const go_33=function go_33(goto_45idx){
					_ms.setSub(heap,i_45cur,_ms.sub(heap,goto_45idx),"mutate");
					i_45cur=goto_45idx
				};
				const ok_45index_63=function ok_45index_63(_){
					return _60_63(_,size)
				};
				for(;;){
					const i_45left_45child=index_45left_45child(i_45cur);
					if(! ok_45index_63(i_45left_45child)){
						break
					};
					const left=_ms.sub(heap,i_45left_45child);
					const i_45right_45child=_43(i_45left_45child,1);
					if(! ok_45index_63(i_45right_45child)){
						if(_60_63(left,val)){
							go_33(i_45left_45child)
						};
						break
					};
					const right=_ms.sub(heap,i_45right_45child);
					if(_60_63(left,val)){
						go_33((_60_63(right,left)?i_45right_45child:i_45left_45child))
					} else if(_60_63(right,val)){
						go_33(i_45right_45child)
					} else {
						break
					}
				};
				_ms.setSub(heap,i_45cur,val,"mutate")
			}
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9Qcmlvcml0eS1RdWV1ZS9IZWFwLVByaW9yaXR5LVF1ZXVlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBU0EsOENBQTJCLEtBSXZCOztJQUlGLG1CQUFBO1dBc0JPO1lBckJOLEtBcUJNO0lBQUE7SUFsQkU7cUJBQVQsYUFBUztJQUFBO0lBRVYsWUFBQTtXQWdCUTtZQWZQLFNBZU87O0lBYlIsWUFBQSxZQUFNO1dBYUU7S0FaRixRQUFBLEtBQUEsTUFDSztNQUFULE9BV00sWUFYTTtLQUFBO0lBQUE7SUFFZCxZQUFBO1dBU1E7WUFSUCxDQUFPLFNBUUEsOEJBUFc7YUFBWixJQUNTO09BQWIsY0FNSzs7aUJBQUEsWUFQTTtLQUFBO0lBQUE7SUFHZCxZQUFBO1dBSVE7WUFIUCxTQUdPOztJQURSLFlBQUE7V0FDUTtLQUFQLFNBQU87OztnQkE5QnVCO0dBSTlCLGVBQVcsRUFBRTs7O0VBK0JkLDJCQUFvQiw4QkFBQTtVQUNuQixJQUFFLEVBQUcsSUFBRSxFQUFFO0VBQUE7RUFDVixxQkFBZ0Isd0JBQUE7VUFDZixJQUFHLE9BQU0sSUFBRSxFQUFFLEtBQUssR0FBRztFQUFBO0VBRXRCLGFBQVMsZ0JBQUEsS0FBSztHQUdiO0dBQ0EsWUFBVSxNQUFNO0dBRVosT0FBQTtJQUFILEdBQUksT0FBRyxRQUFNLEdBQ0M7Z0JBQWIsS0FBSyxFQUFNO0tBQ1g7SUFBQTtJQUNELGlCQUFXLGVBQWE7SUFDeEIscUJBQVMsS0FBSztJQUNkLEtBQVEsT0FBRyxJQUFJLFFBQ007Z0JBQXBCLEtBQUssUUFBVTtLQUNmO0lBQUE7ZUFDRCxLQUFLLFFBQVU7WUFDTjtHQUFBO0VBQUE7RUFFWCxvQkFBYyx1QkFBQTtHQUNiLFVBQU07R0FDTixXQUFPLE1BQU07R0FDYixLQUFRLE9BQUcsS0FBSyxHQUNDO0lBSWhCLFlBQVU7SUFDVixZQUFRLGVBQUE7Z0JBQ1AsS0FBSyxnQkFBVSxLQUFLO2FBQ1g7SUFBQTtJQUNWLG9CQUFhLHVCQUFBO1lBQ1osT0FBRyxFQUFFO0lBQUE7SUFFRixPQUFBO0tBQUgsdUJBQWUscUJBQWlCO0tBQ2hDLEtBQVEsY0FBVSxrQkFDWTtNQUE3QjtLQUFBO0tBQ0QsbUJBQU8sS0FBSztLQUNaLHdCQUFnQixJQUFFLGlCQUFhO0tBQy9CLEtBQVEsY0FBVSxtQkFDYTtNQUE5QixHQUFJLE9BQUcsS0FBSyxLQUNHO09BQWQsTUFBSTtNQUFBO01BQ0w7S0FBQTtLQUNELG9CQUFRLEtBQUs7S0FFUixHQUFKLE9BQUcsS0FBSyxLQUNHO01BQVYsTUFBUyxDQUFDLE9BQUcsTUFBTSxNQUFNLGtCQUFjO0tBQUEsT0FDeEMsR0FBQSxPQUFHLE1BQU0sS0FDRztNQUFYLE1BQUk7S0FBQSxPQUVEO01BQUg7S0FBQTtJQUFBO2VBQ0gsS0FBSyxRQUFVIiwiZmlsZSI6ImF0L1ByaW9yaXR5LVF1ZXVlL0hlYXAtUHJpb3JpdHktUXVldWUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
