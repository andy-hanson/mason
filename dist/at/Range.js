"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../compare","../control","../Function","../math/Number","../math/methods","../Type/Kind","../Type/Method","../Type/Pred-Type","./at","./at-Type","./Seq/Seq","../math/Number","./Seq/Seq"],(exports,compare_0,control_1,Function_2,Number_3,methods_4,Kind_5,Method_6,Pred_45Type_7,_64_8,_64_45Type_9,Seq_10,Number_11,Seq_12)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_60_63=_ms.get(_$2,"<?"),_60_61_63=_ms.get(_$2,"<=?"),_$3=_ms.getModule(control_1),opr=_ms.get(_$3,"opr"),_$4=_ms.getModule(Function_2),thunk=_ms.get(_$4,"thunk"),_$5=_ms.getModule(Number_3),Nat=_ms.get(_$5,"Nat"),round_45down=_ms.get(_$5,"round-down"),sign=_ms.get(_$5,"sign"),_$6=_ms.getModule(methods_4),_43=_ms.get(_$6,"+"),_45=_ms.get(_$6,"-"),_42=_ms.get(_$6,"*"),_47=_ms.get(_$6,"/"),_$7=_ms.getModule(Kind_5),kind_33=_ms.get(_$7,"kind!"),self_45kind_33=_ms.get(_$7,"self-kind!"),_$8=_ms.getModule(Method_6),self_45impl_33=_ms.get(_$8,"self-impl!"),_$9=_ms.getModule(Pred_45Type_7),Opt=_ms.get(_$9,"Opt"),_64=_ms.getDefaultExport(_64_8),_$10=_ms.getModule(_64_8),count=_ms.get(_$10,"count"),iterator=_ms.get(_$10,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_9),_$11=_ms.getModule(_64_45Type_9),empty=_ms.get(_$11,"empty"),from_45stream=_ms.get(_$11,"from-stream"),_$12=_ms.getModule(Seq_10),_63nth=_ms.get(_$12,"?nth"),_$14=_ms.lazyGetModule(Number_11),infinity=_ms.lazyProp(_$14,"infinity"),_$15=_ms.lazyGetModule(Seq_12),seq_61_63=_ms.lazyProp(_$15,"seq=?"),take_39=_ms.lazyProp(_$15,"take'");
		const Range=(()=>{
			const _=class Range{
				static [_ms.symbol(from_45stream)](_){
					const _this=this;
					return _
				}
				constructor(start,end,step){
					_ms.checkContains(Number,start,"start");
					_ms.checkContains(Number,end,"end");
					_ms.checkContains(_ms.sub(Opt,Number),step,"step");
					_ms.newProperty(this,"start",start);
					_ms.newProperty(this,"end",end);
					_ms.newProperty(this,"step",opr(step,sign(_45(end,start))))
				}
				*[_ms.symbol(iterator)](){
					const _this=this;
					let cur=_this.start;
					for(;;){
						const break_45cond=(yield* function*(){
							if(_60_63(0,_this.step)){
								return _60_61_63(_this.end,cur)
							} else {
								return _60_61_63(cur,_this.end)
							}
						}());
						if(break_45cond){
							break
						};
						(yield cur);
						cur=_43(cur,_this.step)
					}
				}
				[_ms.symbol(_63nth)](n){
					const _this=this;
					_ms.checkContains(Nat,n,"n");
					const it=_43(_this.start,_42(_this.step,n));
					return _60_63(it,_this.end)?_ms.some((()=>{
						return it
					})()):_ms.None
				}
				[_ms.symbol(count)](){
					const _this=this;
					return round_45down(_47(length(_this),_this.step))
				}
			};
			self_45kind_33(_,_64_45Type);
			self_45impl_33(empty,_,thunk(new (_)(0,0)));
			kind_33(_,_64);
			return _
		})();
		_ms.newProperty(Range,"test",()=>{
			_ms.assert(_ms.unlazy(seq_61_63),[0,1,2],_ms.unlazy(take_39)(range(0,_ms.unlazy(infinity)),3))
		});
		const range=exports.range=function range(start,end,step){
			_ms.checkContains(Number,start,"start");
			_ms.checkContains(Number,end,"end");
			_ms.checkContains(_ms.sub(Opt,Number),step,"step");
			return new (Range)(start,end,step)
		};
		const range_45incl=exports["range-incl"]=(()=>{
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
		})();
		const length=exports.length=(()=>{
			const built={};
			const doc=built.doc=`Difference between and and start values.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[range(5,10,2)],5);
				_ms.assoc(built,[range(5,10,3)],5);
				return built
			};
			return _ms.set(function length(_){
				_ms.checkContains(Range,_,"_");
				return _45(_.end,_.start)
			},built)
		})();
		const name=exports.name=`Range`;
		exports.default=Range;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvQC9SYW5nZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQWdCQSxZQUNZLEtBQ1I7U0FESDt1QkFPQyxnQkFBYSxFQUNDO1dBNENjO1lBMUMzQjtJQUFBO2dCQUlTLE1BQWEsSUFBVyxLQUNnQjt1QkFEbEM7dUJBQVc7K0JBQVksSUFBSTtxQkFDM0MsYUFBUztxQkFDVCxXQUFPO3FCQUNQLFlBQVEsSUFBSSxLQUFNLEtBQU0sSUFBRSxJQUFJO0lBQUE7aUJBRS9CLFlBQ1k7V0FnQ2lCO0tBN0I1QixRQTZCNEI7S0EzQnhCLE9BQUE7TUFBSCxtQkFDaUI7T0FBaEIsR0FBQSxPQUFHLEVBMEJ1QixZQXpCaEI7ZUFBVCxVQXlCeUIsVUF6QmhCO09BQUEsT0FFTjtlQUFILFVBQUksSUF1QnFCOzs7TUF0QjNCLEdBQUksYUFDVTtPQUFiO01BQUE7YUFFRTtVQUNJLElBQUUsSUFrQmtCOzs7Z0JBaEI3QixTQUFNLEVBQ0s7V0Fla0I7dUJBaEJyQjtLQVFQLFNBQUssSUFRdUIsWUFSYixJQVFhLFdBUkw7WUFDcEIsT0FBRyxHQU9zQix5QkFOZjthQUFaO0tBQUE7O2dCQUVGLFNBQ087V0FHc0I7WUFBNUIsYUFBWSxJQUFHLE9BQWE7OztHQW5ENUIsZUFBVyxFQUFFO0dBRWIsZUFBVyxNQUFNLEVBQUcsTUFBTyxLQUFJLEdBQUUsRUFBRTtHQUNuQyxRQUFNLEVBQUU7VUFKVDtFQUFBO2tCQXdERCxhQUNlLElBQUE7b0NBQUEsQ0FBRSxFQUFFLEVBQUUsdUJBQVksTUFBTSx3QkFBWTtFQUFBO0VBR25ELDBCQUFRLGVBQUEsTUFBYSxJQUFXLEtBQ2dCO3FCQURsQztxQkFBVzs2QkFBWSxJQUFJO1VBQ3hDLEtBQUksT0FBTSxNQUFNLElBQUk7RUFBQTtFQUVyQix5Q0FDVyxLQUFBOztHQUFWLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtrQkFDUCxzQkFBQSxNQUFhLElBQVcsS0FDZ0I7c0JBRGxDO3NCQUFXOzhCQUFZLElBQUk7U0FDekIsSUFBSSxLQUFNLEtBQU0sSUFBRSxJQUFJO1dBQzlCLE1BQU0sTUFBTyxJQUFFLElBQUksTUFBTTtHQUFBOztFQUczQiw0QkFDTyxLQUFBOztHQUFOLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRyxNQUFNLEVBQUUsR0FBRyxJQUFRO29CQUN0QixDQUFHLE1BQU0sRUFBRSxHQUFHLElBQVE7OztrQkFDdEIsZ0JBQUEsRUFDTztzQkFETDtXQUNGLElBQUUsTUFBTTs7O0VBL0ZWLHdCQUFBO2tCQWdCQSIsImZpbGUiOiJhdC9SYW5nZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9