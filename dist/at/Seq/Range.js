"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../control","../../Function","../../math/Number","../../math/methods","../../Type/Kind","../../Type/Pred-Type","../../Type/Tuple","../at","../at-Type","./Seq","../../bang","../../compare","../../math/Number","../q","./Seq"],function(exports,compare_0,control_1,Function_2,Number_3,methods_4,Kind_5,Pred_45Type_6,Tuple_7,_64_8,_64_45Type_9,Seq_10,_33_11,compare_12,Number_13,_63_14,Seq_15){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(compare_0),_60_63=_$2["<?"],_60_61_63=_$2["<=?"],_$3=_ms.getModule(control_1),_if=_$3.if,opr=_$3.opr,_$4=_ms.getModule(Function_2),noop=_$4.noop,thunk=_$4.thunk,_$5=_ms.getModule(Number_3),Nat=_$5.Nat,round_45down=_$5["round-down"],sign=_$5.sign,_$6=_ms.getModule(methods_4),_43=_$6["+"],_45=_$6["-"],_42=_$6["*"],_47=_$6["/"],_$7=_ms.getModule(Kind_5),kind_33=_$7["kind!"],self_45kind_33=_$7["self-kind!"],_$8=_ms.getModule(Pred_45Type_6),Opt=_$8.Opt,Tuple=_ms.getDefaultExport(Tuple_7),_64=_ms.getDefaultExport(_64_8),_$10=_ms.getModule(_64_8),count=_$10.count,iterator=_$10.iterator,_64_45Type=_ms.getDefaultExport(_64_45Type_9),_$11=_ms.getModule(_64_45Type_9),empty=_$11.empty,from_45stream=_$11["from-stream"],_$12=_ms.getModule(Seq_10),_63nth=_$12["?nth"],_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_11)
		}),_$15=_ms.lazyGetModule(compare_12),_61_63=_ms.lazyProp(_$15,"=?"),_$16=_ms.lazyGetModule(Number_13),infinity=_ms.lazyProp(_$16,"infinity"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_14)
		}),_$18=_ms.lazyGetModule(Seq_15),seq_61_63=_ms.lazyProp(_$18,"seq=?"),take_39=_ms.lazyProp(_$18,"take'");
		const Range=Tuple(function(){
			const doc="Seq of Numbers taking fixed steps.";
			const props=function(){
				const _0=["start",Number];
				const _1=["end",Number];
				const _2=["step",Number];
				return [_0,_1,_2]
			}();
			const post_45construct=function post_45construct(_){
				return noop(_)
			};
			return {
				doc:doc,
				props:props,
				"post-construct":post_45construct,
				name:"Range"
			}
		}());
		const range=exports.range=function range(start,end,step){
			step=opr(step,sign(_45(end,start)));
			return Range(start,end,step)
		};
		const range_45incl=exports["range-incl"]=function(){
			const doc="TODO";
			return _ms.set(function range_45incl(start,end,step){
				step=opr(step,sign(_45(end,start)));
				return range(start,_43(end,step),step)
			},"doc",doc)
		}();
		self_45kind_33(Range,_64_45Type,function(){
			const _k0=empty,_v0=thunk(range(0,0));
			const _k1=from_45stream,_v1=function(_){
				return _
			};
			return _ms.map(_k0,_v0,_k1,_v1)
		}());
		const length=exports.length=function(){
			const doc="Difference between and and start values.";
			return _ms.set(function length(_){
				return _45(_.end,_.start)
			},"doc",doc)
		}();
		kind_33(Range,_64,function(){
			const _k0=_63nth,_v0=function(){
				return _ms.set(function(_,n){
					const it=_43(_.start,_42(_.step,n));
					return _if(_60_63(it,_.end),it)
				})
			}();
			const _k1=count,_v1=function(){
				return _ms.set(function(_){
					return round_45down(_47(length(_),_.step))
				})
			}();
			const _k2=iterator,_v2=function(){
				return _ms.set(function*(range){
					let cur=range.start;
					while(true){
						if(_60_61_63(range.end,cur)){
							break
						};
						(yield cur);
						cur=_43(cur,range.step)
					}
				})
			}();
			return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2)
		}());
		const name=exports.name="Range";
		exports.default=Range;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9SYW5nZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7RUFtQkEsWUFBUSxnQkFDSztHQUFaLFVBQU07R0FDTixzQkFDTTtJQUFMLFNBQUUsQ0FBRyxRQUFPO0lBQ1osU0FBRSxDQUFHLE1BQUs7SUFDVixTQUFFLENBQUcsT0FBTTs7O0dBQ1osdUJBQWlCLDBCQUFBLEVBR2hCO1dBQUEsS0FBSztHQUFBOzs7Ozs7OztFQUlQLDBCQUFRLGVBQUEsTUFBYSxJQUFXLEtBQ2dCO1FBQXZDLElBQUksS0FBTSxLQUFNLElBQUUsSUFBSTtVQUM5QixNQUFNLE1BQU0sSUFBSTtFQUFBO0VBRWpCLG1EQUNXO0dBQVYsVUFBTTtrQkFHTCxzQkFBQSxNQUFhLElBQVcsS0FDZ0I7U0FBaEMsSUFBSSxLQUFNLEtBQU0sSUFBRSxJQUFJO1dBQzlCLE1BQU0sTUFBTyxJQUFFLElBQUksTUFBTTtHQUFBOztFQUUzQixlQUFXLE1BQU0scUJBQ007R0FBdEIsVUFBQSxVQUFTLE1BQU8sTUFBTSxFQUFFO0dBR3hCLFVBQUEsa0JBQWdCLFNBQUEsRUFDQztXQUFoQjtHQUFBOzs7RUFFRixzQ0FDTztHQUFOLFVBQU07a0JBSUwsZ0JBQUEsRUFDTztXQUFQLElBQUUsTUFBTTs7O0VBRVYsUUFBTSxNQUFNLGNBQ0M7R0FBWixVQUFBLHFCQUNPO21CQUlMLFNBQUEsRUFBRSxFQUNLO0tBQVAsU0FBSyxJQUFFLFFBQVMsSUFBRSxPQUFPO1lBQ3pCLElBQUksT0FBRyxHQUFHLE9BQU87SUFBQTtHQUFBO0dBQ25CLFVBQUEsb0JBQ1E7bUJBRU4sU0FBQSxFQUNDO1lBQUQsYUFBWSxJQUFFLE9BQUEsR0FBUTs7O0dBRXhCLFVBQUEsdUJBQ1c7bUJBRVIsVUFBQSxNQUNLO0tBQU4sUUFBUTtLQUVKLFdBQUE7TUFBSCxHQUFJLFVBQUksVUFBVSxLQUNHO09BQXBCO01BQUE7YUFDRTtVQUNJLElBQUUsSUFBSTs7Ozs7O0VBbkZqQix3QkFBQTtrQkFxRkEiLCJmaWxlIjoiYXQvU2VxL1JhbmdlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=