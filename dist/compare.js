"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./js","./Type/Method","./at/at","./at/at-Type","./at/q","./at/Seq/Seq","./control","./Function","./Object","./Type/Pred-Type"],(exports,js_0,Method_1,_64_2,_64_45Type_3,_63_4,Seq_5,control_6,Function_7,Object_8,Pred_45Type_9)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(js_0),id_61_63=_ms.get(_$2,"id=?"),Method=_ms.getDefaultExport(Method_1),_64=_ms.lazy(()=>_ms.getDefaultExport(_64_2)),_$3=_ms.lazyGetModule(_64_2),all_63=_ms.lazyProp(_$3,"all?"),empty_63=_ms.lazyProp(_$3,"empty?"),iterator=_ms.lazyProp(_$3,"iterator"),_$4=_ms.lazyGetModule(_64_45Type_3),from_45stream=_ms.lazyProp(_$4,"from-stream"),_$5=_ms.lazyGetModule(_63_4),un_45_63=_ms.lazyProp(_$5,"un-?"),Seq=_ms.lazy(()=>_ms.getDefaultExport(Seq_5)),_$6=_ms.lazyGetModule(Seq_5),first=_ms.lazyProp(_$6,"first"),_64tail=_ms.lazyProp(_$6,"@tail"),_$7=_ms.lazyGetModule(control_6),opr=_ms.lazyProp(_$7,"opr"),_$8=_ms.lazyGetModule(Function_7),identity=_ms.lazyProp(_$8,"identity"),_$9=_ms.lazyGetModule(Object_8),object_61_63=_ms.lazyProp(_$9,"object=?"),_$10=_ms.lazyGetModule(Pred_45Type_9),Opt=_ms.lazyProp(_$10,"Opt");
		const compare=exports.default=new (Method)((()=>{
			const built={};
			built.name="compare";
			const args=built.args=2;
			return built
		})());
		const _61_63=exports["=?"]=new (Method)((()=>{
			const built={};
			built.name="=?";
			const args=built.args=2;
			const allow_45null_63=built["allow-null?"]=true;
			const _default=built.default=function _default(other){
				const _this=this;
				return (id_61_63(_this,other)||_ms.unlazy(object_61_63)(_this,other))
			};
			return built
		})());
		const _60_63=exports["<?"]=new (Method)((()=>{
			const built={};
			built.name="<?";
			const args=built.args=2;
			const _default=built.default=function _default(other){
				const _this=this;
				return _60_63(compare(_this,other),0)
			};
			return built
		})());
		const _60_61_63=exports["<=?"]=new (Method)((()=>{
			const built={};
			built.name="<=?";
			const args=built.args=2;
			const _default=built.default=function _default(other){
				const _this=this;
				return _60_61_63(compare(_this,other),0)
			};
			return built
		})());
		const _62_63=exports[">?"]=new (Method)((()=>{
			const built={};
			built.name=">?";
			const args=built.args=2;
			const _default=built.default=function _default(other){
				const _this=this;
				return _62_63(compare(_this,other),0)
			};
			return built
		})());
		const _62_61_63=exports[">=?"]=new (Method)((()=>{
			const built={};
			built.name=">=?";
			const args=built.args=2;
			const _default=built.default=function _default(other){
				const _this=this;
				return _62_61_63(compare(_this,other),0)
			};
			return built
		})());
		const same_63=exports["same?"]=function same_63(f,a,b){
			_ms.checkContains(Function,f,"f");
			return _61_63(f(a),f(b))
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
						return (_=>{
							sb_45prev=sb_45cur;
							return _
						})(_60_63(sb_45prev,sb_45cur))
					})
				}
			})()
		};
		const sort=exports.sort=new (Method)((()=>{
			const built={};
			built.name="sort";
			const args=built.args=(()=>{
				return 2
			})();
			const _default=built.default=function _default(sort_45by){
				const _this=this;
				sort_45by=_ms.unlazy(opr)(sort_45by,_ms.unlazy(identity));
				const sorted=_ms.unlazy(from_45stream)(Array,_this);
				sorted.sort((a,b)=>{
					return compare(sort_45by(a),sort_45by(b))
				});
				return sorted
			};
			return built
		})());
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvY29tcGFyZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQWFBLDhCQUFTLEtBQUksUUFDTSxLQUFBOztjQWNsQjtHQUNBLHNCQUFNOzs7RUFFUCwyQkFBSSxLQUFJLFFBQ00sS0FBQTs7Y0FTYjtHQUNBLHNCQUFNO0dBQ04sMkNBQWE7R0FDYiw2QkFBVyxrQkFBQTtVQXNIa0I7V0FySDVCLENBQUksU0FxSHdCLE1BckhkLGlDQXFIYyxNQXJIUTtHQUFBOzs7RUFFdEMsMkJBQUksS0FBSSxRQUNNLEtBQUE7O2NBRWI7R0FDQSxzQkFBTTtHQUNOLDZCQUFXLGtCQUFBO1VBOEdrQjtXQTdHNUIsT0FBSSxRQTZHd0IsTUE3R1gsT0FBTztHQUFBOzs7RUFFMUIsK0JBQUssS0FBSSxRQUNNLEtBQUE7O2NBQ2Q7R0FDQSxzQkFBTTtHQUNOLDZCQUFXLGtCQUFBO1VBdUdrQjtXQXRHNUIsVUFBSyxRQXNHdUIsTUF0R1YsT0FBTztHQUFBOzs7RUFFM0IsMkJBQUksS0FBSSxRQUNNLEtBQUE7O2NBQ2I7R0FDQSxzQkFBTTtHQUNOLDZCQUFXLGtCQUFBO1VBZ0drQjtXQS9GNUIsT0FBSSxRQStGd0IsTUEvRlgsT0FBTztHQUFBOzs7RUFFMUIsK0JBQUssS0FBSSxRQUNNLEtBQUE7O2NBQ2Q7R0FDQSxzQkFBTTtHQUNOLDZCQUFXLGtCQUFBO1VBeUZrQjtXQXhGNUIsVUFBSyxRQXdGdUIsTUF4RlYsT0FBTztHQUFBOzs7RUFHMUIsK0JBQVEsaUJBQUEsRUFBVyxFQUFFO3FCQUFYO1VBRVQsT0FBSSxFQUFFLEdBQUksRUFBRTtFQUFBO0VBR2Isc0JBQU0sYUFBQTs7VUFDTCxTQUFPOztFQUVSLDZCQUFPLGdCQUFBOztVQUNOLFlBQVE7O0VBRVQsaUNBQVMsa0JBQUEsRUFBSTs7cUJBQUc7K0JBQ1QsWUFBUSxFQUFFLElBQUs7O0VBRXRCLHFDQUFVLHFCQUFBLEVBQUk7O3FCQUFHO1VBQ2hCLHNCQUFPLDBCQUNPO0lBQWIsZ0NBQU87SUFDUCxZQUFRO0lBQ1IsY0FBWTtJQUNaLG1CQUFlLEdBQUc7V0FFZjtZQUFBO01BQUYsVUFBYTtNQUNiLEdBQUksS0FDSTtPQUFQLE9BQU07TUFBQTtNQUNQLGlCQUFXLEdBQUc7TUFDZCxHQUFJLE9BQUcsZUFBVyxZQUNRO2lCQUFkO3NCQUNHO01BQUE7S0FBQTtJQUFBO0dBQUE7RUFBQTtFQUdsQixzQkFBTSxhQUFBOztVQUVMLFNBQU87O0VBRVIsNkJBQU8sZ0JBQUE7O1VBRU4sWUFBUTs7RUFFVCxpQ0FBUyxrQkFBQSxFQUFJOztxQkFBRzsrQkFHVCxZQUFRLEVBQUUsSUFBSzs7RUFFdEIscUNBQVUscUJBQUEsRUFBSTs7cUJBQUc7VUFFaEIsc0JBQU8sMEJBQ087SUFBYixnQ0FBTztJQUNQLFlBQVE7SUFDUixjQUFZO0lBQ1osbUJBQWUsR0FBRztXQUVmO1lBQUE7TUFBRixVQUFhO01BQ2IsR0FBSSxLQUNJO09BQVAsT0FBTTtNQUFBO01BQ1AsaUJBQVcsR0FBRztNQUNkLEdBQUksT0FBRyxlQUFXLFlBQ1E7aUJBQWQ7c0JBQ0c7TUFBQTtLQUFBO0lBQUE7R0FBQTtFQUFBO0VBR2xCLG1DQUFVLG1CQUFBLElBQVE7OzZDQUFZOzZCQUVkO1VBQ1Y7SUFBQSxRQUFBO0lBQ0osd0JBQUEsR0FDTztZQUFOO0lBQUEsT0FFRztLQUFILGNBQVksNEJBQVE7bURBQ2YsR0FBUTtNQUNaLGVBQVMsVUFBUTthQUNaLElBQ2lCO2lCQUFWOztTQURQLE9BQUcsVUFBUTtLQUFBO0lBQUE7R0FBQTtFQUFBO0VBR3BCLHdCQUFNLEtBQUksUUFDTSxLQUFBOztjQUdmO0dBQ0Esc0JBQ0ssS0FBQTtXQUFKO0dBQUE7R0FHRCw2QkFBVyxrQkFBQTtVQUdpQjs4QkFGWjtJQUVmLHVDQUFxQixNQUFNO0lBQzNCLFlBQWEsQ0FBQSxFQUFFO1lBQ2QsUUFBUyxVQUFRLEdBQUksVUFBUTtJQUFBO1dBQzlCO0dBQUEiLCJmaWxlIjoiY29tcGFyZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
