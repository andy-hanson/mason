"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../control","../../Function","../../math/Number","../../math/methods","../../Type/Js-Method","../../Type/Kind","../../Type/Pred-Type","../../Type/Tuple","../at","../at-Type","./Seq","../../bang","../../compare","../../math/Number","../q","./Seq"],function(exports,compare_0,control_1,Function_2,Number_3,methods_4,Js_45Method_5,Kind_6,Pred_45Type_7,Tuple_8,_64_9,_64_45Type_10,Seq_11,_33_12,compare_13,Number_14,_63_15,Seq_16){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(compare_0),_60_63=_ms.get(_$2,"<?"),_60_61_63=_ms.get(_$2,"<=?"),_$3=_ms.getModule(control_1),_if=_ms.get(_$3,"if"),opr=_ms.get(_$3,"opr"),_$4=_ms.getModule(Function_2),noop=_ms.get(_$4,"noop"),thunk=_ms.get(_$4,"thunk"),_$5=_ms.getModule(Number_3),Nat=_ms.get(_$5,"Nat"),round_45down=_ms.get(_$5,"round-down"),sign=_ms.get(_$5,"sign"),_$6=_ms.getModule(methods_4),_43=_ms.get(_$6,"+"),_45=_ms.get(_$6,"-"),_42=_ms.get(_$6,"*"),_47=_ms.get(_$6,"/"),_$7=_ms.getModule(Js_45Method_5),js_45impl_33=_ms.get(_$7,"js-impl!"),_$8=_ms.getModule(Kind_6),kind_33=_ms.get(_$8,"kind!"),self_45kind_33=_ms.get(_$8,"self-kind!"),_$9=_ms.getModule(Pred_45Type_7),Opt=_ms.get(_$9,"Opt"),Tuple=_ms.getDefaultExport(Tuple_8),_64=_ms.getDefaultExport(_64_9),_$11=_ms.getModule(_64_9),count=_ms.get(_$11,"count"),iterator=_ms.get(_$11,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_10),_$12=_ms.getModule(_64_45Type_10),empty=_ms.get(_$12,"empty"),from_45stream=_ms.get(_$12,"from-stream"),_$13=_ms.getModule(Seq_11),_63nth=_ms.get(_$13,"?nth"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_12)
		}),_$16=_ms.lazyGetModule(compare_13),_61_63=_ms.lazyProp(_$16,"=?"),_$17=_ms.lazyGetModule(Number_14),infinity=_ms.lazyProp(_$17,"infinity"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_15)
		}),_$19=_ms.lazyGetModule(Seq_16),seq_61_63=_ms.lazyProp(_$19,"seq=?"),take_39=_ms.lazyProp(_$19,"take'");
		const Range=Tuple(function(){
			const built={};
			const doc=built.doc="Seq of Numbers taking fixed steps.";
			const props=built.props=function(){
				const built=[];
				_ms.add(built,["start",Number]);
				_ms.add(built,["end",Number]);
				_ms.add(built,["step",Number]);
				return built
			}();
			const post_45construct=built["post-construct"]=function post_45construct(_){
				_ms.unlazy(_33)(_ms.unlazy(_61_63),sign(_.step),sign(_45(_.end,_.start)));
				noop(_)
			};
			const test=built.test=function test(){
				_ms.unlazy(_33)(_ms.unlazy(seq_61_63),[0,1,2],_ms.unlazy(take_39)(range(0,_ms.unlazy(infinity)),3))
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
		const range_45incl=exports["range-incl"]=function(){
			const built={};
			const doc=built.doc="TODO";
			const test=built.test=function test(){};
			return _ms.set(function range_45incl(start,end,step){
				_ms.checkContains(Number,start,"start");
				_ms.checkContains(Number,end,"end");
				_ms.checkContains(_ms.sub(Opt,Number),step,"step");
				step=opr(step,sign(_45(end,start)));
				return range(start,_43(end,step),step)
			},built)
		}();
		self_45kind_33(Range,_64_45Type,function(){
			const built=new global.Map();
			_ms.assoc(built,empty,thunk(range(0,0)));
			_ms.assoc(built,from_45stream,function(_){
				return _
			});
			return built
		}());
		const length=exports.length=function(){
			const built={};
			const doc=built.doc="Difference between and and start values.";
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
		js_45impl_33(iterator,Range,function(){
			const built={};
			const test=built.test=function test(){
				return _ms.unlazy(_33)(_ms.unlazy(seq_61_63),range(0,10,2),[0,2,4,6,8])
			};
			return _ms.set(function*(){
				let cur=this.start;
				for(;;){
					if(_ms.bool(_60_61_63(this.end,cur))){
						break
					};
					(yield cur);
					cur=_43(cur,this.step)
				}
			},built)
		}());
		kind_33(Range,_64,function(){
			const built=new global.Map();
			_ms.assoc(built,_63nth,function(){
				const built={};
				const test=built.test=function test(){
					const built=new global.Map();
					const r=range(0,10,2);
					_ms.assoc(built,[r,2],_ms.unlazy(_63)(4));
					_ms.assoc(built,[r,6],empty(_ms.unlazy(_63)));
					return built
				};
				return _ms.set(function(_,n){
					_ms.checkContains(Nat,n,"n");
					const it=_43(_.start,_42(_.step,n));
					return _if(_60_63(it,_.end),it)
				},built)
			}());
			_ms.assoc(built,count,function(){
				const built={};
				const test=built.test=function test(){
					const built=new global.Map();
					_ms.assoc(built,[range(0,2,0.5)],4);
					return built
				};
				return _ms.set(function(_){
					return round_45down(_47(length(_),_.step))
				},built)
			}());
			return built
		}());
		const name=exports.name="Range";
		exports.default=Range;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9SYW5nZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7RUFvQkEsWUFBTyxnQkFDSzs7R0FBWCxvQkFBTTtHQUNOLGtDQUNNOztrQkFBSCxDQUFHLFFBQU87a0JBQ1YsQ0FBRyxNQUFLO2tCQUNSLENBQUcsT0FBTTs7O0dBQ1osK0NBQWtCLDBCQUFBLEVBR2pCO3VDQURPLEtBQUssUUFBUyxLQUFNLElBQUUsTUFBTTtJQUNuQyxLQUFLO0dBQUE7R0FDTixzQkFDUSxlQUFBOzBDQUFDLENBQUUsRUFBRSxFQUFFLHVCQUFZLE1BQU0sd0JBQVk7R0FBQTs7O0VBRTlDLDBCQUFRLGVBQUEsTUFBYSxJQUFXLEtBQ2dCO3FCQURsQztxQkFBVzs2QkFBWSxJQUFJO1FBQ2hDLElBQUksS0FBTSxLQUFNLElBQUUsSUFBSTtVQUM5QixNQUFNLE1BQU0sSUFBSTtFQUFBO0VBRWpCLG1EQUNXOztHQUFWLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtrQkFDUCxzQkFBQSxNQUFhLElBQVcsS0FDZ0I7c0JBRGxDO3NCQUFXOzhCQUFZLElBQUk7U0FDekIsSUFBSSxLQUFNLEtBQU0sSUFBRSxJQUFJO1dBQzlCLE1BQU0sTUFBTyxJQUFFLElBQUksTUFBTTtHQUFBOztFQUUzQixlQUFXLE1BQU0scUJBQ007O21CQUF0QixNQUFTLE1BQU8sTUFBTSxFQUFFO21CQUd4QixjQUFnQixTQUFBLEVBQ0M7V0FBaEI7R0FBQTs7O0VBRUYsc0NBQ087O0dBQU4sb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFHLE1BQU0sRUFBRSxHQUFHLElBQVE7b0JBQ3RCLENBQUcsTUFBTSxFQUFFLEdBQUcsSUFBUTs7O2tCQUN0QixnQkFBQSxFQUNPO3NCQURMO1dBQ0YsSUFBRSxNQUFNOzs7RUFFVixhQUFTLFNBQVMsZ0JBQ0s7O0dBQXRCLHNCQUNPLGVBQUE7aURBQUcsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7R0FBQTtrQkFFL0IsV0FBQTtJQUFGLFFBQVE7SUFFSixPQUFBO0tBQUgsWUFBSSxVQUFJLFNBQVMsTUFDRztNQUFuQjtLQUFBO1lBQ0U7U0FDSSxJQUFFLElBQUk7Ozs7RUFFaEIsUUFBTSxNQUFNLGNBQ0M7O21CQUFaLGlCQUNPOztJQUFOLHNCQUNPLGVBQUE7O0tBQU4sUUFBSSxNQUFNLEVBQUUsR0FBRztxQkFDZixDQUFFLEVBQUUsbUJBQVM7cUJBQ2IsQ0FBRSxFQUFFLEdBQU87OzttQkFDWCxTQUFBLEVBQUUsRUFDSzt1QkFESDtLQUNKLFNBQUssSUFBRSxRQUFTLElBQUUsT0FBTztZQUN6QixJQUFJLE9BQUcsR0FBRyxPQUFPO0lBQUE7O21CQUNuQixnQkFDUTs7SUFBUCxzQkFDTyxlQUFBOztxQkFBTixDQUFHLE1BQU0sRUFBRSxFQUFFLE1BQVU7OzttQkFDdkIsU0FBQSxFQUNDO1lBQUQsYUFBWSxJQUFFLE9BQU0sR0FBRTs7Ozs7RUFwRnpCLHdCQUFBO2tCQW9CQSIsImZpbGUiOiJhdC9TZXEvUmFuZ2UuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==