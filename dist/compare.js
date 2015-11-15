"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./js","./Type/Method","./at/at","./at/at-Type","./at/q","./at/Seq/Seq","./control","./Function","./Object","./Type/Pred-Type"],(exports,js_0,Method_1,_64_2,_64_45Type_3,_63_4,Seq_5,control_6,Function_7,Object_8,Pred_45Type_9)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(js_0),defined_63=_ms.get(_$2,"defined?"),id_61_63=_ms.get(_$2,"id=?"),Method=_ms.getDefaultExport(Method_1),_64=_ms.lazy(()=>_ms.getDefaultExport(_64_2)),_$3=_ms.lazyGetModule(_64_2),all_63=_ms.lazyProp(_$3,"all?"),empty_63=_ms.lazyProp(_$3,"empty?"),iterator=_ms.lazyProp(_$3,"iterator"),_$4=_ms.lazyGetModule(_64_45Type_3),from_45stream=_ms.lazyProp(_$4,"from-stream"),_$5=_ms.lazyGetModule(_63_4),un_45_63=_ms.lazyProp(_$5,"un-?"),Seq=_ms.lazy(()=>_ms.getDefaultExport(Seq_5)),_$6=_ms.lazyGetModule(Seq_5),first=_ms.lazyProp(_$6,"first"),_64tail=_ms.lazyProp(_$6,"@tail"),_$7=_ms.lazyGetModule(control_6),opr=_ms.lazyProp(_$7,"opr"),_$8=_ms.lazyGetModule(Function_7),identity=_ms.lazyProp(_$8,"identity"),_$9=_ms.lazyGetModule(Object_8),object_61_63=_ms.lazyProp(_$9,"object=?"),_$10=_ms.lazyGetModule(Pred_45Type_9),Opt=_ms.lazyProp(_$10,"Opt");
		const compare=exports.default=_ms.method("compare",["other"]);
		const _61_63=exports["=?"]=new (Method)((()=>{
			const built={};
			built.name="=?";
			const allow_45null_63=built["allow-null?"]=true;
			const args=built.args=["other"];
			const _default=built.default=function _default(other){
				const _this=this;
				return (id_61_63(_this,other)||_ms.unlazy(object_61_63)(_this,other))
			};
			return built
		})());
		const _60_63=exports["<?"]=_ms.method("<?",["other"],function(other){
			const _this=this;
			return _60_63(compare(_this,other),0)
		});
		const _60_61_63=exports["<=?"]=_ms.method("<=?",["other"],function(other){
			const _this=this;
			return _60_61_63(compare(_this,other),0)
		});
		const _62_63=exports[">?"]=_ms.method(">?",["other"],function(other){
			const _this=this;
			return _62_63(compare(_this,other),0)
		});
		const _62_61_63=exports[">=?"]=_ms.method(">=?",["other"],function(other){
			const _this=this;
			return _62_61_63(compare(_this,other),0)
		});
		const same_63=exports["same?"]=function same_63(fun,a,b){
			_ms.checkContains(Function,fun,"fun");
			return _61_63(fun(a),fun(b))
		};
		const all_45same_63=exports["all-same?"]=function all_45same_63(_64coll,fun){
			_ms.checkContains(_ms.unlazy(_64),_64coll,"@coll");
			_ms.checkContains(_ms.sub(_ms.unlazy(Opt),Function),fun,"fun");
			fun=_ms.unlazy(opr)(fun,_ms.unlazy(identity));
			return ((_ms.unlazy(empty_63)||_64coll)||(()=>{
				const fst=fun(_ms.sub(_64coll,0));
				return _ms.unlazy(all_63)(_64coll,_=>_61_63(fst,fun(_)))
			})())
		};
		const min=exports.min=function min(_){
			_ms.checkContains(_ms.unlazy(_64),_,"_");
			return min_45by(_,_ms.unlazy(identity))
		};
		const _63min=exports["?min"]=function _63min(_){
			_ms.checkContains(_ms.unlazy(_64),_,"_");
			return _63min_45by(_,_ms.unlazy(identity))
		};
		const min_45by=exports["min-by"]=function min_45by(_,by){
			_ms.checkContains(_ms.unlazy(_64),_,"_");
			_ms.checkContains(Function,by,"by");
			return _ms.unlazy(un_45_63)(_63min_45by(_,by),`Can not take min of empty.`)
		};
		const _63min_45by=exports["?min-by"]=function _63min_45by(_,by){
			_ms.checkContains(_ms.unlazy(_64),_,"_");
			_ms.checkContains(Function,by,"by");
			return (_ms.unlazy(empty_63)(_)?_ms.None:_ms.some((()=>{
				const iter=_ms.unlazy(iterator)(_);
				const value=iter.next().value;
				let cur_45min=value;
				let cur_45min_45by=by(value);
				return (()=>{
					for(;;){
						const _$0=iter.next(),value=_$0.value,done=_$0.done;
						if(done){
							return cur_45min
						};
						const value_45by=by(value);
						if(_62_63(cur_45min_45by,value_45by)){
							cur_45min=value;
							cur_45min_45by=value_45by
						}
					}
				})()
			})()))
		};
		const max=exports.max=function max(_){
			_ms.checkContains(_ms.unlazy(_64),_,"_");
			return max_45by(_,_ms.unlazy(identity))
		};
		const _63max=exports["?max"]=function _63max(_){
			_ms.checkContains(_ms.unlazy(_64),_,"_");
			return _63max_45by(_,_ms.unlazy(identity))
		};
		const max_45by=exports["max-by"]=function max_45by(_,by){
			_ms.checkContains(_ms.unlazy(_64),_,"_");
			_ms.checkContains(Function,by,"by");
			return _ms.unlazy(un_45_63)(_63max_45by(_,by),`Can not take max of empty.`)
		};
		const _63max_45by=exports["?max-by"]=function _63max_45by(_,by){
			_ms.checkContains(_ms.unlazy(_64),_,"_");
			_ms.checkContains(Function,by,"by");
			return (_ms.unlazy(empty_63)(_)?_ms.None:_ms.some((()=>{
				const iter=_ms.unlazy(iterator)(_);
				const value=iter.next().value;
				let cur_45max=value;
				let cur_45max_45by=by(value);
				return (()=>{
					for(;;){
						const _$1=iter.next(),value=_$1.value,done=_$1.done;
						if(done){
							return cur_45max
						};
						const value_45by=by(value);
						if(_60_63(cur_45max_45by,value_45by)){
							cur_45max=value;
							cur_45max_45by=value_45by
						}
					}
				})()
			})()))
		};
		const sorted_63=exports["sorted?"]=function sorted_63(seq,sort_45by){
			_ms.checkContains(_ms.unlazy(Seq),seq,"seq");
			_ms.checkContains(_ms.sub(_ms.unlazy(Opt),Function),sort_45by,"sort-by");
			sort_45by=_ms.unlazy(opr)(sort_45by,_ms.unlazy(identity));
			return (()=>{
				const _=seq;
				if(_ms.unlazy(empty_63)(_)){
					return true
				} else {
					let sb_45prev=sort_45by(_ms.unlazy(first)(_));
					return _ms.unlazy(all_63)(_ms.unlazy(_64tail)(_),em=>{
						const sb_45cur=sort_45by(em);
						return (()=>{
							const _=_60_63(sb_45prev,sb_45cur);
							sb_45prev=sb_45cur;
							return _
						})()
					})
				}
			})()
		};
		const sort=exports.sort=_ms.method("sort",["sort-by"],function(sort_45by){
			const _this=this;
			return (()=>{
				const _=_ms.unlazy(from_45stream)(Array,_this);
				_.sort((()=>{
					const _=sort_45by;
					if(defined_63(_)){
						return (a,b)=>{
							return compare(sort_45by(a),sort_45by(b))
						}
					} else {
						return compare
					}
				})());
				return _
			})()
		});
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvY29tcGFyZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQWFBO0VBZ0JBLDJCQUFJLEtBQUksUUFDTSxLQUFBOztjQVNiO0dBQ0EsMkNBQWE7R0FDYixzQkFBTSxDQUFFO0dBQ1IsNkJBQVcsa0JBQUE7VUE0R2E7V0EzR3ZCLENBQUksU0EyR21CLE1BM0dULGlDQTJHUyxNQTNHYTtHQUFBOzs7RUFFdEMscURBQVksU0FBQTtTQXlHYTtVQXRHeEIsT0FBSSxRQXNHb0IsTUF0R1AsT0FBTztFQUFBO0VBRXpCLDBEQUFhLFNBQUE7U0FvR1k7VUFsR3hCLFVBQUssUUFrR21CLE1BbEdOLE9BQU87RUFBQTtFQUUxQixxREFBWSxTQUFBO1NBZ0dhO1VBOUZ4QixPQUFJLFFBOEZvQixNQTlGUCxPQUFPO0VBQUE7RUFFekIsMERBQWEsU0FBQTtTQTRGWTtVQTFGeEIsVUFBSyxRQTBGbUIsTUExRk4sT0FBTztFQUFBO0VBR3pCLCtCQUFRLGlCQUFBLElBQWEsRUFBRTtxQkFBWDtVQUVYLE9BQUksSUFBSSxHQUFJLElBQUk7RUFBQTtFQUVqQix5Q0FBWSx1QkFBQSxRQUFROzs2Q0FBUTt1QkFDaEI7VUFDWCx3QkFBVSxVQUNLLEtBQUE7SUFBZCxVQUFNLFlBQUksUUFBTTs4QkFDWCxXQUFRLE9BQUcsSUFBSSxJQUFBO0dBQUE7RUFBQTtFQUl0QixzQkFBTSxhQUFBOztVQUNMLFNBQU87O0VBRVIsNkJBQU8sZ0JBQUE7O1VBQ04sWUFBUTs7RUFFVCxpQ0FBUyxrQkFBQSxFQUFJOztxQkFBRzsrQkFDVCxZQUFRLEVBQUUsSUFBSzs7RUFFdEIscUNBQVUscUJBQUEsRUFBSTs7cUJBQUc7VUFDVCxzQkFBQSwwQkFDTztJQUFiLGdDQUFPO0lBQ1AsWUFBUTtJQUNSLGNBQVk7SUFDWixtQkFBZSxHQUFHO1dBRWY7WUFBQTtNQUFGLFVBQWE7TUFDVixHQUFBLEtBQ0k7T0FBTixPQUFNO01BQUE7TUFDUCxpQkFBVyxHQUFHO01BQ1gsR0FBQSxPQUFHLGVBQVcsWUFDUTtpQkFBYjtzQkFDRztNQUFBO0tBQUE7SUFBQTtHQUFBO0VBQUE7RUFHbEIsc0JBQU0sYUFBQTs7VUFFTCxTQUFPOztFQUVSLDZCQUFPLGdCQUFBOztVQUVOLFlBQVE7O0VBRVQsaUNBQVMsa0JBQUEsRUFBSTs7cUJBQUc7K0JBR1QsWUFBUSxFQUFFLElBQUs7O0VBRXRCLHFDQUFVLHFCQUFBLEVBQUk7O3FCQUFHO1VBRVQsc0JBQUEsMEJBQ087SUFBYixnQ0FBTztJQUNQLFlBQVE7SUFDUixjQUFZO0lBQ1osbUJBQWUsR0FBRztXQUVmO1lBQUE7TUFBRixVQUFhO01BQ1YsR0FBQSxLQUNJO09BQU4sT0FBTTtNQUFBO01BQ1AsaUJBQVcsR0FBRztNQUNYLEdBQUEsT0FBRyxlQUFXLFlBQ1E7aUJBQWI7c0JBQ0c7TUFBQTtLQUFBO0lBQUE7R0FBQTtFQUFBO0VBR2xCLG1DQUFVLG1CQUFBLElBQVE7OzZDQUFZOzZCQUVkO1VBQ1Y7SUFBQSxRQUFBO0lBQ0osd0JBQUEsR0FDTztZQUFOO0lBQUEsT0FFRztLQUFILGNBQVksNEJBQVE7bURBQ2YsR0FBUTtNQUNaLGVBQVMsVUFBUTthQUNaLEtBQ2lCO2VBRGpCLE9BQUcsVUFBUTtpQkFDSjs7Ozs7OztFQUdoQixzREFBYyxTQUFBO1NBTVU7VUFBbEIsS0FDc0I7c0NBRFYsTUFBTTtJQUN0QixPQUFZO0tBQUEsUUFBQTtLQUNYLEdBQUEsV0FBQSxHQUNTO2FBQVAsQ0FBQSxFQUFFO2NBQ0YsUUFBUyxVQUFRLEdBQUksVUFBUTtNQUFBO0tBQUEsT0FFM0I7YUFBSDtLQUFBO0lBQUEiLCJmaWxlIjoiY29tcGFyZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
