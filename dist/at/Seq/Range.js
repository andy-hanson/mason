"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../control","../../Function","../../math/Number","../../math/methods","../../Type/Kind","../../Type/Method","../../Type/Pred-Type","../../Type/Tuple","../at","../at-Type","./Seq","../../compare","../../math/Number","../q","./Seq"],(exports,compare_0,control_1,Function_2,Number_3,methods_4,Kind_5,Method_6,Pred_45Type_7,Tuple_8,_64_9,_64_45Type_10,Seq_11,compare_12,Number_13,_63_14,Seq_15)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_60_63=_ms.get(_$2,"<?"),_60_61_63=_ms.get(_$2,"<=?"),_$3=_ms.getModule(control_1),opr=_ms.get(_$3,"opr"),_$4=_ms.getModule(Function_2),noop=_ms.get(_$4,"noop"),thunk=_ms.get(_$4,"thunk"),_$5=_ms.getModule(Number_3),Nat=_ms.get(_$5,"Nat"),round_45down=_ms.get(_$5,"round-down"),sign=_ms.get(_$5,"sign"),_$6=_ms.getModule(methods_4),_43=_ms.get(_$6,"+"),_45=_ms.get(_$6,"-"),_42=_ms.get(_$6,"*"),_47=_ms.get(_$6,"/"),_$7=_ms.getModule(Kind_5),kind_33=_ms.get(_$7,"kind!"),self_45kind_33=_ms.get(_$7,"self-kind!"),_$8=_ms.getModule(Method_6),impl_33=_ms.get(_$8,"impl!"),self_45impl_33=_ms.get(_$8,"self-impl!"),_$9=_ms.getModule(Pred_45Type_7),Opt=_ms.get(_$9,"Opt"),Tuple=_ms.getDefaultExport(Tuple_8),_64=_ms.getDefaultExport(_64_9),_$11=_ms.getModule(_64_9),count=_ms.get(_$11,"count"),iterator=_ms.get(_$11,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_10),_$12=_ms.getModule(_64_45Type_10),empty=_ms.get(_$12,"empty"),from_45stream=_ms.get(_$12,"from-stream"),_$13=_ms.getModule(Seq_11),_63nth=_ms.get(_$13,"?nth"),_$15=_ms.lazyGetModule(compare_12),_61_63=_ms.lazyProp(_$15,"=?"),_$16=_ms.lazyGetModule(Number_13),infinity=_ms.lazyProp(_$16,"infinity"),_63=_ms.lazy(()=>{
			return _ms.getDefaultExport(_63_14)
		}),_$18=_ms.lazyGetModule(Seq_15),seq_61_63=_ms.lazyProp(_$18,"seq=?"),take_39=_ms.lazyProp(_$18,"take'");
		const Range=Tuple(()=>{
			const built={};
			const doc=built.doc=`Seq of Numbers taking fixed steps.`;
			const props=built.props=()=>{
				const built=[];
				_ms.add(built,[`start`,Number]);
				_ms.add(built,[`end`,Number]);
				_ms.add(built,[`step`,Number]);
				return built
			}();
			const post_45construct=built["post-construct"]=function post_45construct(_){
				_ms.assert(_ms.unlazy(_61_63),sign(_.step),sign(_45(_.end,_.start)));
				noop(_)
			};
			const test=built.test=function test(){
				_ms.assert(_ms.unlazy(seq_61_63),[0,1,2],_ms.unlazy(take_39)(range(0,_ms.unlazy(infinity)),3))
			};
			return _ms.setName(built,"Range")
		}());
		const range=exports.range=function range(start,end,step){
			_ms.checkContains(Number,start,"start");
			_ms.checkContains(Number,end,"end");
			_ms.checkContains(_ms.sub(Opt,Number),step,"step");
			step=opr(step,sign(_45(end,start)));
			return Range(start,end,step)
		};
		const range_45incl=exports["range-incl"]=()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){};
			return _ms.set(function range_45incl(start,end,step){
				_ms.checkContains(Number,start,"start");
				_ms.checkContains(Number,end,"end");
				_ms.checkContains(_ms.sub(Opt,Number),step,"step");
				step=opr(step,sign(_45(end,start)));
				return range(start,_43(end,step),step)
			},built)
		}();
		self_45kind_33(Range,_64_45Type);
		self_45impl_33(empty,Range,thunk(range(0,0)));
		self_45impl_33(from_45stream,Range,_=>{
			return _
		});
		const length=exports.length=()=>{
			const built={};
			const doc=built.doc=`Difference between and and start values.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[range(5,10,2)],5);
				_ms.assoc(built,[range(5,10,3)],5);
				return built
			};
			return _ms.set(function length(_){
				_ms.checkContains(Range,_,"_");
				return _45(_.end,_.start)
			},built)
		}();
		impl_33(iterator,Range,()=>{
			const built={};
			const test=built.test=function test(){
				_ms.assert(_ms.unlazy(seq_61_63),range(0,10,2),[0,2,4,6,8])
			};
			return _ms.set(function*(){
				const _this=this;
				let cur=_this.start;
				for(;;){
					if(_60_61_63(_this.end,cur)){
						break
					};
					(yield cur);
					cur=_43(cur,_this.step)
				}
			},built)
		}());
		kind_33(Range,_64);
		impl_33(_63nth,Range,()=>{
			const built={};
			const test=built.test=function test(){
				const built=new global.Map();
				const r=range(0,10,2);
				_ms.assoc(built,[r,2],_ms.unlazy(_63)(4));
				_ms.assoc(built,[r,6],empty(_ms.unlazy(_63)));
				return built
			};
			return _ms.set(function(n){
				const _this=this;
				_ms.checkContains(Nat,n,"n");
				const it=_43(_this.start,_42(_this.step,n));
				return _ms.bool(_60_63(it,_this.end))?_ms.some(()=>{
					return it
				}()):_ms.None
			},built)
		}());
		impl_33(count,Range,()=>{
			const built={};
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[range(0,2,0.5)],4);
				return built
			};
			return _ms.set(function(){
				const _this=this;
				return round_45down(_47(length(_this),_this.step))
			},built)
		}());
		const name=exports.name=`Range`;
		exports.default=Range;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9SYW5nZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBbUJBLFlBQU8sVUFDSzs7R0FBWCxvQkFBTTtHQUNOLDRCQUNNOztrQkFBSCxDQUFHLFFBQU87a0JBQ1YsQ0FBRyxNQUFLO2tCQUNSLENBQUcsT0FBTTs7O0dBQ1osK0NBQWtCLDBCQUFBLEVBR2pCO2tDQURhLEtBQUssUUFBUyxLQUFNLElBQUUsTUFBTTtJQUN6QyxLQUFLO0dBQUE7R0FDTixzQkFDUSxlQUFBO3FDQUFPLENBQUUsRUFBRSxFQUFFLHVCQUFZLE1BQU0sd0JBQVk7R0FBQTs7O0VBRXBELDBCQUFRLGVBQUEsTUFBYSxJQUFXLEtBQ2dCO3FCQURsQztxQkFBVzs2QkFBWSxJQUFJO1FBQ2hDLElBQUksS0FBTSxLQUFNLElBQUUsSUFBSTtVQUM5QixNQUFNLE1BQU0sSUFBSTtFQUFBO0VBRWpCLDZDQUNXOztHQUFWLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtrQkFDUCxzQkFBQSxNQUFhLElBQVcsS0FDZ0I7c0JBRGxDO3NCQUFXOzhCQUFZLElBQUk7U0FDekIsSUFBSSxLQUFNLEtBQU0sSUFBRSxJQUFJO1dBQzlCLE1BQU0sTUFBTyxJQUFFLElBQUksTUFBTTtHQUFBOztFQUUzQixlQUFXLE1BQU07RUFDakIsZUFBVyxNQUFNLE1BQU8sTUFBTyxNQUFNLEVBQUU7RUFDdkMsZUFBVyxjQUFZLE1BQU8sR0FDQztVQUU5QjtFQUFBO0VBRUQsZ0NBQ087O0dBQU4sb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFHLE1BQU0sRUFBRSxHQUFHLElBQVE7b0JBQ3RCLENBQUcsTUFBTSxFQUFFLEdBQUcsSUFBUTs7O2tCQUN0QixnQkFBQSxFQUNPO3NCQURMO1dBQ0YsSUFBRSxNQUFNOzs7RUFFVixRQUFNLFNBQVMsVUFDSzs7R0FBbkIsc0JBQ1EsZUFBQTtxQ0FBUSxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtHQUFBO2tCQUVwQyxXQUFBOztJQUFILFFBQVE7SUFFSixPQUFBO0tBQUgsR0FBSSxVQUFJLFVBQUssS0FDRztNQUFmO0tBQUE7WUFDRTtTQUNJLElBQUUsSUFBSTs7OztFQUVoQixRQUFNLE1BQU07RUFFWixRQUFNLE9BQUssVUFDSzs7R0FBZixzQkFDTyxlQUFBOztJQUFOLFFBQUksTUFBTSxFQUFFLEdBQUc7b0JBQ2YsQ0FBRSxFQUFFLG1CQUFTO29CQUNiLENBQUUsRUFBRSxHQUFPOzs7a0JBQ1YsU0FBQSxFQUNLOztzQkFESDtJQUVILFNBQUssSUFBRSxZQUFRLElBQUUsV0FBTTtvQkFDcEIsT0FBRyxHQUFHLHlCQUNJO1lBQVo7SUFBQTs7O0VBRUgsUUFBTSxNQUFNLFVBQ0s7O0dBQWhCLHNCQUNPLGVBQUE7O29CQUFOLENBQUcsTUFBTSxFQUFFLEVBQUUsTUFBVTs7O2tCQUV0QixVQUFBOztXQUFELGFBQVksSUFBRyxPQUFPLE9BQU07OztFQXZGOUIsd0JBQUE7a0JBbUJBIiwiZmlsZSI6ImF0L1NlcS9SYW5nZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9