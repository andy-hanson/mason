"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../control","../../Fun","../../math/Num","../../math/methods","../../Type/Kind","../../Type/Pred-Type","../../Type/Tuple","../at","../at-Type","./Seq","../../bang","../../compare","../../math/Num","../q","./Seq"],function(exports,compare_0,control_1,Fun_2,Num_3,methods_4,Kind_5,Pred_45Type_6,Tuple_7,_64_8,_64_45Type_9,Seq_10,_33_11,compare_12,Num_13,_63_14,Seq_15){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(compare_0),_60_63=_ms.get(_$2,"<?"),_60_61_63=_ms.get(_$2,"<=?"),_$3=_ms.getModule(control_1),_if=_ms.get(_$3,"if"),opr=_ms.get(_$3,"opr"),Ref_33=_ms.get(_$3,"Ref!"),get=_ms.get(_$3,"get"),set_33=_ms.get(_$3,"set!"),_$4=_ms.getModule(Fun_2),noop=_ms.get(_$4,"noop"),thunk=_ms.get(_$4,"thunk"),Num=_ms.getDefaultExport(Num_3),_$5=_ms.getModule(Num_3),Nat=_ms.get(_$5,"Nat"),round_45down=_ms.get(_$5,"round-down"),sign=_ms.get(_$5,"sign"),_$6=_ms.getModule(methods_4),_43=_ms.get(_$6,"+"),_45=_ms.get(_$6,"-"),_42=_ms.get(_$6,"*"),_47=_ms.get(_$6,"/"),_$7=_ms.getModule(Kind_5),kind_33=_ms.get(_$7,"kind!"),self_45kind_33=_ms.get(_$7,"self-kind!"),_$8=_ms.getModule(Pred_45Type_6),Opt=_ms.get(_$8,"Opt"),Tuple=_ms.getDefaultExport(Tuple_7),_64=_ms.getDefaultExport(_64_8),_$10=_ms.getModule(_64_8),count=_ms.get(_$10,"count"),iterator=_ms.get(_$10,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_9),_$11=_ms.getModule(_64_45Type_9),empty=_ms.get(_$11,"empty"),from_45stream=_ms.get(_$11,"from-stream"),_$12=_ms.getModule(Seq_10),_63nth=_ms.get(_$12,"?nth"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_11)
		}),_$15=_ms.lazyGetModule(compare_12),_61_63=_ms.lazyProp(_$15,"=?"),_$16=_ms.lazyGetModule(Num_13),infinity=_ms.lazyProp(_$16,"infinity"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_14)
		}),_$18=_ms.lazyGetModule(Seq_15),seq_61_63=_ms.lazyProp(_$18,"seq=?"),take_39=_ms.lazyProp(_$18,"take'");
		const Range=Tuple(function(){
			const doc="Seq of Nums taking fixed steps.";
			const props=function(){
				const _0=["start",Num];
				const _1=["end",Num];
				const _2=["step",Num];
				return [_0,_1,_2]
			}();
			const post_45construct=_ms.set(function(_){
				_ms.unlazy(_33)(_ms.unlazy(_61_63),sign(_.step),sign(_45(_.end,_.start)));
				return noop(_)
			},"displayName","post-construct");
			const test=_ms.set(function(){
				return _ms.unlazy(_33)(_ms.unlazy(seq_61_63),[0,1,2],_ms.unlazy(take_39)(range(0,_ms.unlazy(infinity)),3))
			},"displayName","test");
			return {
				doc:doc,
				props:props,
				"post-construct":post_45construct,
				test:test,
				displayName:"Range"
			}
		}());
		const range=exports.range=_ms.set(function(start,end,_63step){
			_ms.checkContains(Num,start,"start");
			_ms.checkContains(Num,end,"end");
			_ms.checkContains(_ms.sub(Opt,Num),_63step,"?step");
			const step=opr(_63step,sign(_45(end,start)));
			return Range(start,end,step)
		},"displayName","range");
		const range_45incl=exports["range-incl"]=function(){
			const doc="TODO";
			const test=_ms.set(function(){
				return "TODO"
			},"displayName","test");
			return _ms.set(function(start,end,_63step){
				_ms.checkContains(Num,start,"start");
				_ms.checkContains(Num,end,"end");
				_ms.checkContains(_ms.sub(Opt,Num),_63step,"?step");
				const step=opr(_63step,sign(_45(end,start)));
				return range(start,_43(end,step),step)
			},"doc",doc,"test",test,"displayName","range-incl")
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
			const test=_ms.set(function(){
				const _k0=[range(5,10,2)],_v0=5;
				const _k1=[range(5,10,3)],_v1=5;
				return _ms.map(_k0,_v0,_k1,_v1)
			},"displayName","test");
			return _ms.set(function(_){
				_ms.checkContains(Range,_,"_");
				return _45(_.end,_.start)
			},"doc",doc,"test",test,"displayName","length")
		}();
		kind_33(Range,_64,function(){
			const _k0=_63nth,_v0=function(){
				const test=_ms.set(function(){
					const r=range(0,10,2);
					const _k0=[r,2],_v0=_ms.unlazy(_63)(4);
					const _k1=[r,6],_v1=empty(_ms.unlazy(_63));
					return _ms.map(_k0,_v0,_k1,_v1)
				},"displayName","test");
				return _ms.set(function(_,n){
					_ms.checkContains(Nat,n,"n");
					const it=_43(_.start,_42(_.step,n));
					return _if(_60_63(it,_.end),it)
				},"test",test)
			}();
			const _k1=count,_v1=function(){
				const test=_ms.set(function(){
					const _k0=[range(0,2,0.5)],_v0=4;
					return _ms.map(_k0,_v0)
				},"displayName","test");
				return _ms.set(function(_){
					return round_45down(_47(length(_),_.step))
				},"test",test)
			}();
			const _k2=iterator,_v2=function(){
				const test=_ms.set(function(){
					return _ms.unlazy(_33)(_ms.unlazy(seq_61_63),range(0,10,2),[0,2,4,6,8])
				},"displayName","test");
				return _ms.set(function*(range){
					const cur=Ref_33(range.start);
					loop80:while(true){
						{
							const _=get(cur);
							if(_ms.bool(_60_61_63(range.end,_))){
								break loop80
							} else {
								(yield _);
								set_33(cur,_43(_,range.step))
							}
						}
					}
				},"test",test)
			}();
			return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2)
		}());
		const displayName=exports.displayName="Range";
		exports.default=Range;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9SYW5nZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7RUFtQkEsWUFBUSxnQkFDSztHQUFaLFVBQU07R0FDTixzQkFDTTtJQUFMLFNBQUUsQ0FBRyxRQUFPO0lBQ1osU0FBRSxDQUFHLE1BQUs7SUFDVixTQUFFLENBQUcsT0FBTTtXQUZOOztHQUdOLCtCQUFpQixTQUFBLEVBR2hCO3VDQURPLEtBQUssUUFBUyxLQUFNLElBQUUsTUFBTTtXQUNuQyxLQUFLO0dBQUE7R0FDTixtQkFDTyxVQUFBO2lEQUFFLENBQUUsRUFBRSxFQUFFLHVCQUFZLE1BQU0sd0JBQVk7R0FBQTtVQVZqQzs7Ozs7Ozs7RUFZYixrQ0FBUSxTQUFBLE1BQVUsSUFBUSxRQUNjO3FCQUQxQjtxQkFBUTs2QkFBVSxJQUFJO0dBQ25DLFdBQU8sSUFBSSxRQUFPLEtBQU0sSUFBRSxJQUFJO1VBQzlCLE1BQU0sTUFBTSxJQUFJO0VBQUE7RUFFakIsbURBQ1c7R0FBVixVQUFNO0dBQ04sbUJBQ08sVUFBQTtXQUFMO0dBQUE7a0JBQ0QsU0FBQSxNQUFVLElBQVEsUUFDYztzQkFEMUI7c0JBQVE7OEJBQVUsSUFBSTtJQUM1QixXQUFPLElBQUksUUFBTyxLQUFNLElBQUUsSUFBSTtXQUM5QixNQUFNLE1BQU8sSUFBRSxJQUFJLE1BQU07R0FBQTs7RUFFM0IsZUFBVyxNQUFNLHFCQUNNO0dBQXRCLFVBQUEsVUFBUyxNQUFPLE1BQU0sRUFBRTtHQUd4QixVQUFBLGtCQUFnQixTQUFBLEVBQ0M7V0FBaEI7R0FBQTs7O0VBRUYsc0NBQ087R0FBTixVQUFNO0dBQ04sbUJBQ08sVUFBQTtJQUFOLFVBQUEsQ0FBRyxNQUFNLEVBQUUsR0FBRyxRQUFRO0lBQ3RCLFVBQUEsQ0FBRyxNQUFNLEVBQUUsR0FBRyxRQUFROzs7a0JBQ3RCLFNBQUEsRUFDTztzQkFETDtXQUNGLElBQUUsTUFBTTs7O0VBRVYsUUFBTSxNQUFNLGNBQ0M7R0FBWixVQUFBLHFCQUNPO0lBQU4sbUJBQ08sVUFBQTtLQUFOLFFBQUksTUFBTSxFQUFFLEdBQUc7S0FDZixVQUFBLENBQUUsRUFBRSx1QkFBUztLQUNiLFVBQUEsQ0FBRSxFQUFFLE9BQU87OzttQkFDWCxTQUFBLEVBQUUsRUFDSzt1QkFESDtLQUNKLFNBQUssSUFBRSxRQUFTLElBQUUsT0FBTztZQUN6QixJQUFJLE9BQUcsR0FBRyxPQUFPO0lBQUE7O0dBQ25CLFVBQUEsb0JBQ1E7SUFBUCxtQkFDTyxVQUFBO0tBQU4sVUFBQSxDQUFHLE1BQU0sRUFBRSxFQUFFLFVBQVU7OzttQkFDdkIsU0FBQSxFQUNDO1lBQUQsYUFBWSxJQUFFLE9BQUEsR0FBUTs7O0dBRXhCLFVBQUEsdUJBQ1c7SUFBVixtQkFDTyxVQUFBO2tEQUFHLE1BQU0sRUFBRSxHQUFHLEdBQUcsQ0FBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO0lBQUE7bUJBQ2hDLFVBQUEsTUFDSztLQUFOLFVBQU0sT0FBSzt1QkFFTjtNQUFFO09BQUEsUUFBQyxJQUFJO09BQ1YsWUFBQSxVQUFJLFVBQVUsSUFDQztRQUFkO2NBRUc7UUFBQSxPQUFBO1FBQ0gsT0FBSyxJQUFLLElBQUUsRUFBRTs7Ozs7Ozs7RUFyRnBCLHNDQUFBO2tCQStGQSIsImZpbGUiOiJhdC9TZXEvUmFuZ2UuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==