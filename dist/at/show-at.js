"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../compare","../Object","../show","../String","../Type/Type","../Type/Method","./at","./Seq/Seq","./at-Type","./Seq/Deque"],(exports,compare_0,Object_1,show_2,String_3,Type_4,Method_5,_64_6,Seq_7,_64_45Type_8,Deque_9)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_60_63=_ms.get(_$2,"<?"),_$3=_ms.getModule(Object_1),flag_63=_ms.get(_$3,"flag?"),show=_ms.getDefaultExport(show_2),_$5=_ms.getModule(String_3),indent=_ms.get(_$5,"indent"),_$6=_ms.getModule(Type_4),_61_62=_ms.get(_$6,"=>"),type_45of=_ms.get(_$6,"type-of"),_$7=_ms.getModule(Method_5),impl_33=_ms.get(_$7,"impl!"),impl_45for=_ms.get(_$7,"impl-for"),_64=_ms.getDefaultExport(_64_6),_$8=_ms.getModule(_64_6),count=_ms.get(_$8,"count"),empty_63=_ms.get(_$8,"empty?"),_$9=_ms.getModule(Seq_7),take_39=_ms.get(_$9,"take'"),_$11=_ms.lazyGetModule(_64_45Type_8),empty=_ms.lazyProp(_$11,"empty"),Deque=_ms.lazy(()=>{
			return _ms.getDefaultExport(Deque_9)
		});
		impl_33(show,_64,()=>{
			const built={};
			const test=built.test=function test(){
				const built=new global.Map();
				const d=_61_62(_ms.unlazy(Deque),[1,2,3]);
				_ms.assoc(built,[d],`\n\t. 1\n\t. 2\n\t. 3`);
				_ms.assoc(built,[d,{
					repr:true
				}],`=> Deque\n\t. 1\n\t. 2\n\t. 3`);
				_ms.assoc(built,[_ms.unlazy(empty)(_ms.unlazy(Deque))],`[ ]`);
				_ms.assoc(built,[_ms.unlazy(empty)(_ms.unlazy(Deque)),{
					repr:true
				}],`empty Deque`);
				return built
			};
			return _ms.set((_,opts)=>{
				const content=()=>{
					if(_ms.bool(empty_63(_))){
						return `[ ]`
					} else {
						const ems=()=>{
							const built=[];
							for(let elem of _){
								_ms.add(built,indent(show(elem,opts)))
							};
							return built
						}();
						const _$38=()=>{
							if(_ms.bool(_60_63(100,count(_)))){
								const built={};
								const show_45ems=built["show-ems"]=take_39(ems,100);
								const end=built.end=`\n\t...`;
								return built
							} else {
								const built={};
								const show_45ems=built["show-ems"]=ems;
								const end=built.end="";
								return built
							}
						}(),show_45ems=_$38["show-ems"],end=_$38.end;
						return `\n\t. ${_ms.show(_61_62(String,show_45ems,`\n\t. `))}${_ms.show(end)}`
					}
				}();
				return ()=>{
					if(_ms.bool(flag_63(opts,`repr`))){
						return ()=>{
							if(_ms.bool(empty_63(_))){
								return `empty ${_ms.show(type_45of(_))}`
							} else {
								return `=> ${_ms.show(type_45of(_))}${_ms.show(content)}`
							}
						}()
					} else {
						return content
					}
				}()
			},built)
		}());
		const name=exports.name=`show-@`;
		exports.default=impl_33(show,Array,impl_45for(show,_64));
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL3Nob3ctQC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBYUEsUUFBTSxLQUFLLFFBQ0M7O0dBQVgsc0JBQ08sZUFBQTs7SUFBTixRQUFJLHlCQUFTLENBQUUsRUFBRSxFQUFFO29CQUNuQixDQUFFLEdBQ0Q7b0JBSUQsQ0FBRSxFQUFFO1VBQU87SUFBQSxHQUNWO29CQUlELHVDQUFzQjtvQkFDdEIsc0NBQWdCO1VBQU87SUFBQSxHQUFZOzs7a0JBRW5DLENBQUEsRUFBRSxPQUNJO0lBQU47S0FDQyxZQUFBLFNBQU0sSUFDQzthQUFMO1lBRUU7TUFDSDs7ZUFBVyxRQUFRLEVBQ0M7c0JBQW5CLE9BQVEsS0FBSyxLQUFLO09BQUE7OztNQUNuQjtPQUNDLFlBQUEsT0FBRyxJQUFJLE1BQUssS0FDQzs7UUFBWixtQ0FBVSxRQUFNLElBQUk7UUFDcEIsb0JBQU07O2NBRUg7O1FBQUgsbUNBQVU7UUFDVixvQkFBTTs7OzthQUNQLGtCQUFPLE9BQUcsT0FBTyxXQUFVLHNCQUFTOzs7O0tBRXRDLFlBQUEsUUFBTSxLQUFNLFNBQ0s7O09BQ2YsWUFBQSxTQUFNLElBQ0M7ZUFBTCxrQkFBTyxVQUFPO2NBRVo7ZUFBRixlQUFJLFVBQU8sZUFBRzs7O1lBRWQ7YUFBSDtLQUFBO0lBQUE7R0FBQTs7RUFyREosd0JBQUE7a0JBd0RBLFFBQU0sS0FBSyxNQUFPLFdBQVMsS0FBSyIsImZpbGUiOiJhdC9zaG93LWF0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=