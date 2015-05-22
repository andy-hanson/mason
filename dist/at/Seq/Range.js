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
			const doc="Seq of Numbers taking fixed steps.";
			const props=function(){
				const _0=["start",Number];
				const _1=["end",Number];
				const _2=["step",Number];
				return [_0,_1,_2]
			}();
			const post_45construct=function post_45construct(_){
				_ms.unlazy(_33)(_ms.unlazy(_61_63),sign(_.step),sign(_45(_.end,_.start)));
				return noop(_)
			};
			const test=function test(){
				return _ms.unlazy(_33)(_ms.unlazy(seq_61_63),[0,1,2],_ms.unlazy(take_39)(range(0,_ms.unlazy(infinity)),3))
			};
			return {
				doc:doc,
				props:props,
				"post-construct":post_45construct,
				test:test,
				name:"Range"
			}
		}());
		const range=exports.range=function range(start,end,step){
			_ms.checkContains(Number,start,"start");
			_ms.checkContains(Number,end,"end");
			_ms.checkContains(_ms.sub(Opt,Number),step,"step");
			step=opr(step,sign(_45(end,start)));
			return Range(start,end,step)
		};
		const range_45incl=exports["range-incl"]=function(){
			const doc="TODO";
			const test=function test(){
				return "TODO"
			};
			return _ms.set(function range_45incl(start,end,step){
				_ms.checkContains(Number,start,"start");
				_ms.checkContains(Number,end,"end");
				_ms.checkContains(_ms.sub(Opt,Number),step,"step");
				step=opr(step,sign(_45(end,start)));
				return range(start,_43(end,step),step)
			},"doc",doc,"test",test)
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
			const test=function test(){
				const _k0=[range(5,10,2)],_v0=5;
				const _k1=[range(5,10,3)],_v1=5;
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function length(_){
				_ms.checkContains(Range,_,"_");
				return _45(_.end,_.start)
			},"doc",doc,"test",test)
		}();
		js_45impl_33(iterator,Range,function(){
			const test=function test(){
				return _ms.unlazy(_33)(_ms.unlazy(seq_61_63),range(0,10,2),[0,2,4,6,8])
			};
			return _ms.set(function*(){
				let cur=this.start;
				while(true){
					if(_ms.bool(_60_61_63(this.end,cur))){
						break
					};
					(yield cur);
					cur=_43(cur,this.step)
				}
			},"test",test)
		}());
		kind_33(Range,_64,function(){
			const _k0=_63nth,_v0=function(){
				const test=function test(){
					const r=range(0,10,2);
					const _k0=[r,2],_v0=_ms.unlazy(_63)(4);
					const _k1=[r,6],_v1=empty(_ms.unlazy(_63));
					return _ms.map(_k0,_v0,_k1,_v1)
				};
				return _ms.set(function(_,n){
					_ms.checkContains(Nat,n,"n");
					const it=_43(_.start,_42(_.step,n));
					return _if(_60_63(it,_.end),it)
				},"test",test)
			}();
			const _k1=count,_v1=function(){
				const test=function test(){
					const _k0=[range(0,2,0.5)],_v0=4;
					return _ms.map(_k0,_v0)
				};
				return _ms.set(function(_){
					return round_45down(_47(length(_),_.step))
				},"test",test)
			}();
			return _ms.map(_k0,_v0,_k1,_v1)
		}());
		const name=exports.name="Range";
		exports.default=Range;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9SYW5nZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7RUFvQkEsWUFBUSxnQkFDSztHQUFaLFVBQU07R0FDTixzQkFDTTtJQUFMLFNBQUUsQ0FBRyxRQUFPO0lBQ1osU0FBRSxDQUFHLE1BQUs7SUFDVixTQUFFLENBQUcsT0FBTTs7O0dBQ1osdUJBQWlCLDBCQUFBLEVBR2hCO3VDQURPLEtBQUssUUFBUyxLQUFNLElBQUUsTUFBTTtXQUNuQyxLQUFLO0dBQUE7R0FDTixXQUNPLGVBQUE7aURBQUUsQ0FBRSxFQUFFLEVBQUUsdUJBQVksTUFBTSx3QkFBWTtHQUFBOzs7Ozs7Ozs7RUFFOUMsMEJBQVEsZUFBQSxNQUFhLElBQVcsS0FDZ0I7cUJBRGxDO3FCQUFXOzZCQUFZLElBQUk7UUFDaEMsSUFBSSxLQUFNLEtBQU0sSUFBRSxJQUFJO1VBQzlCLE1BQU0sTUFBTSxJQUFJO0VBQUE7RUFFakIsbURBQ1c7R0FBVixVQUFNO0dBQ04sV0FDTyxlQUFBO1dBQUw7R0FBQTtrQkFDRCxzQkFBQSxNQUFhLElBQVcsS0FDZ0I7c0JBRGxDO3NCQUFXOzhCQUFZLElBQUk7U0FDekIsSUFBSSxLQUFNLEtBQU0sSUFBRSxJQUFJO1dBQzlCLE1BQU0sTUFBTyxJQUFFLElBQUksTUFBTTtHQUFBOztFQUUzQixlQUFXLE1BQU0scUJBQ007R0FBdEIsVUFBQSxVQUFTLE1BQU8sTUFBTSxFQUFFO0dBR3hCLFVBQUEsa0JBQWdCLFNBQUEsRUFDQztXQUFoQjtHQUFBOzs7RUFFRixzQ0FDTztHQUFOLFVBQU07R0FDTixXQUNPLGVBQUE7SUFBTixVQUFBLENBQUcsTUFBTSxFQUFFLEdBQUcsUUFBUTtJQUN0QixVQUFBLENBQUcsTUFBTSxFQUFFLEdBQUcsUUFBUTs7O2tCQUN0QixnQkFBQSxFQUNPO3NCQURMO1dBQ0YsSUFBRSxNQUFNOzs7RUFFVixhQUFTLFNBQVMsZ0JBQ0s7R0FBdEIsV0FDTyxlQUFBO2lEQUFHLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO0dBQUE7a0JBRWhDLFdBQUE7SUFBRCxRQUFRO0lBRUosV0FBQTtLQUFILFlBQUksVUFBSSxTQUFTLE1BQ0c7TUFBbkI7S0FBQTtZQUNFO1NBQ0ksSUFBRSxJQUFJOzs7O0VBRWhCLFFBQU0sTUFBTSxjQUNDO0dBQVosVUFBQSxxQkFDTztJQUFOLFdBQ08sZUFBQTtLQUFOLFFBQUksTUFBTSxFQUFFLEdBQUc7S0FDZixVQUFBLENBQUUsRUFBRSx1QkFBUztLQUNiLFVBQUEsQ0FBRSxFQUFFLE9BQU87OzttQkFDWCxTQUFBLEVBQUUsRUFDSzt1QkFESDtLQUNKLFNBQUssSUFBRSxRQUFTLElBQUUsT0FBTztZQUN6QixJQUFJLE9BQUcsR0FBRyxPQUFPO0lBQUE7O0dBQ25CLFVBQUEsb0JBQ1E7SUFBUCxXQUNPLGVBQUE7S0FBTixVQUFBLENBQUcsTUFBTSxFQUFFLEVBQUUsVUFBVTs7O21CQUN2QixTQUFBLEVBQ0M7WUFBRCxhQUFZLElBQUUsT0FBTSxHQUFFOzs7OztFQXBGekIsd0JBQUE7a0JBc0ZBIiwiZmlsZSI6ImF0L1NlcS9SYW5nZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9