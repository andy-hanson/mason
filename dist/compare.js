"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./js","./Type/Method","./at/at","./at/at-Type","./at/q","./at/Seq/Seq","./control","./Function","./Object","./Type/Pred-Type"],(exports,js_0,Method_1,_64_2,_64_45Type_3,_63_4,Seq_5,control_6,Function_7,Object_8,Pred_45Type_9)=>{
	exports._get=_ms.lazy(()=>{
		let _$2=_ms.getModule(js_0),defined_63=_ms.get(_$2,"defined?"),id_61_63=_ms.get(_$2,"id=?"),Method=_ms.getDefaultExport(Method_1),_64=_ms.lazy(()=>_ms.getDefaultExport(_64_2)),_$3=_ms.lazyGetModule(_64_2),all_63=_ms.lazyProp(_$3,"all?"),empty_63=_ms.lazyProp(_$3,"empty?"),iterator=_ms.lazyProp(_$3,"iterator"),_$4=_ms.lazyGetModule(_64_45Type_3),from_45stream=_ms.lazyProp(_$4,"from-stream"),_$5=_ms.lazyGetModule(_63_4),un_45_63=_ms.lazyProp(_$5,"un-?"),Seq=_ms.lazy(()=>_ms.getDefaultExport(Seq_5)),_$6=_ms.lazyGetModule(Seq_5),first=_ms.lazyProp(_$6,"first"),_64tail=_ms.lazyProp(_$6,"@tail"),_$7=_ms.lazyGetModule(control_6),opr=_ms.lazyProp(_$7,"opr"),_$8=_ms.lazyGetModule(Function_7),identity=_ms.lazyProp(_$8,"identity"),_$9=_ms.lazyGetModule(Object_8),object_61_63=_ms.lazyProp(_$9,"object=?"),_$10=_ms.lazyGetModule(Pred_45Type_9),Opt=_ms.lazyProp(_$10,"Opt");
		let compare=exports.default=_ms.method("compare",["other"]);
		let _61_63=exports["=?"]=new (Method)((()=>{
			let built={};
			built.name="=?";
			let allow_45null_63=built["allow-null?"]=true;
			let args=built.args=["other"];
			let _default=built.default=function _default(other){
				let _this=this;
				return (id_61_63(_this,other)||_ms.unlazy(object_61_63)(_this,other))
			};
			return built
		})());
		let _60_63=exports["<?"]=_ms.method("<?",["other"],function(other){
			let _this=this;
			return _60_63(compare(_this,other),0)
		});
		let _60_61_63=exports["<=?"]=_ms.method("<=?",["other"],function(other){
			let _this=this;
			return _60_61_63(compare(_this,other),0)
		});
		let _62_63=exports[">?"]=_ms.method(">?",["other"],function(other){
			let _this=this;
			return _62_63(compare(_this,other),0)
		});
		let _62_61_63=exports[">=?"]=_ms.method(">=?",["other"],function(other){
			let _this=this;
			return _62_61_63(compare(_this,other),0)
		});
		let same_63=exports["same?"]=function same_63(fun,a,b){
			_ms.checkContains(Function,fun,"fun");
			return _61_63(fun(a),fun(b))
		};
		let all_45same_63=exports["all-same?"]=function all_45same_63(_64coll,fun){
			_ms.checkContains(_ms.unlazy(_64),_64coll,"@coll");
			_ms.checkContains(_ms.sub(_ms.unlazy(Opt),Function),fun,"fun");
			fun=_ms.unlazy(opr)(fun,_ms.unlazy(identity));
			return (_ms.unlazy(empty_63)(_64coll)||(()=>{
				let fst=fun(_ms.sub(_64coll,0));
				return _ms.unlazy(all_63)(_ms.unlazy(_64tail)(_64coll),_=>_61_63(fst,fun(_)))
			})())
		};
		let min=exports.min=function min(_){
			_ms.checkContains(_ms.unlazy(_64),_,"_");
			return min_45by(_,_ms.unlazy(identity))
		};
		let _63min=exports["?min"]=function _63min(_){
			_ms.checkContains(_ms.unlazy(_64),_,"_");
			return _63min_45by(_,_ms.unlazy(identity))
		};
		let min_45by=exports["min-by"]=function min_45by(_,by){
			_ms.checkContains(_ms.unlazy(_64),_,"_");
			_ms.checkContains(Function,by,"by");
			return _ms.unlazy(un_45_63)(_63min_45by(_,by),`Can not take min of empty.`)
		};
		let _63min_45by=exports["?min-by"]=function _63min_45by(_,by){
			_ms.checkContains(_ms.unlazy(_64),_,"_");
			_ms.checkContains(Function,by,"by");
			return (_ms.unlazy(empty_63)(_)?_ms.None:_ms.some((()=>{
				let iter=_ms.unlazy(iterator)(_);
				let value=iter.next().value;
				let cur_45min=value;
				let cur_45min_45by=by(value);
				return (()=>{
					for(;;){
						let _$0=iter.next(),value=_$0.value,done=_$0.done;
						if(done){
							return cur_45min
						};
						let value_45by=by(value);
						if(_62_63(cur_45min_45by,value_45by)){
							cur_45min=value;
							cur_45min_45by=value_45by
						}
					}
				})()
			})()))
		};
		let max=exports.max=function max(_){
			_ms.checkContains(_ms.unlazy(_64),_,"_");
			return max_45by(_,_ms.unlazy(identity))
		};
		let _63max=exports["?max"]=function _63max(_){
			_ms.checkContains(_ms.unlazy(_64),_,"_");
			return _63max_45by(_,_ms.unlazy(identity))
		};
		let max_45by=exports["max-by"]=function max_45by(_,by){
			_ms.checkContains(_ms.unlazy(_64),_,"_");
			_ms.checkContains(Function,by,"by");
			return _ms.unlazy(un_45_63)(_63max_45by(_,by),`Can not take max of empty.`)
		};
		let _63max_45by=exports["?max-by"]=function _63max_45by(_,by){
			_ms.checkContains(_ms.unlazy(_64),_,"_");
			_ms.checkContains(Function,by,"by");
			return (_ms.unlazy(empty_63)(_)?_ms.None:_ms.some((()=>{
				let iter=_ms.unlazy(iterator)(_);
				let value=iter.next().value;
				let cur_45max=value;
				let cur_45max_45by=by(value);
				return (()=>{
					for(;;){
						let _$1=iter.next(),value=_$1.value,done=_$1.done;
						if(done){
							return cur_45max
						};
						let value_45by=by(value);
						if(_60_63(cur_45max_45by,value_45by)){
							cur_45max=value;
							cur_45max_45by=value_45by
						}
					}
				})()
			})()))
		};
		let sorted_63=exports["sorted?"]=function sorted_63(seq,sort_45by){
			_ms.checkContains(_ms.unlazy(Seq),seq,"seq");
			_ms.checkContains(_ms.sub(_ms.unlazy(Opt),Function),sort_45by,"sort-by");
			sort_45by=_ms.unlazy(opr)(sort_45by,_ms.unlazy(identity));
			return (()=>{
				let _=seq;
				if(_ms.unlazy(empty_63)(_)){
					return true
				} else {
					let sb_45prev=sort_45by(_ms.unlazy(first)(_));
					return _ms.unlazy(all_63)(_ms.unlazy(_64tail)(_),em=>{
						let sb_45cur=sort_45by(em);
						return (()=>{
							let _=_60_63(sb_45prev,sb_45cur);
							sb_45prev=sb_45cur;
							return _
						})()
					})
				}
			})()
		};
		let sort=exports.sort=_ms.method("sort",["sort-by"],function(sort_45by){
			let _this=this;
			return (()=>{
				let _=_ms.unlazy(from_45stream)(Array,_this);
				_.sort((()=>{
					let _=sort_45by;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvY29tcGFyZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQWFBO0VBZ0JBLHlCQUFJLEtBQUksUUFDTSxLQUFBOztjQVNiO0dBQ0EseUNBQWE7R0FDYixvQkFBTSxDQUFFO0dBQ1IsMkJBQVcsa0JBQUE7UUE0R2E7V0EzR3ZCLENBQUksU0EyR21CLE1BM0dULGlDQTJHUyxNQTNHYTtHQUFBOzs7RUFFdEMsbURBQVksU0FBQTtPQXlHYTtVQXRHeEIsT0FBSSxRQXNHb0IsTUF0R1AsT0FBTztFQUFBO0VBRXpCLHdEQUFhLFNBQUE7T0FvR1k7VUFsR3hCLFVBQUssUUFrR21CLE1BbEdOLE9BQU87RUFBQTtFQUUxQixtREFBWSxTQUFBO09BZ0dhO1VBOUZ4QixPQUFJLFFBOEZvQixNQTlGUCxPQUFPO0VBQUE7RUFFekIsd0RBQWEsU0FBQTtPQTRGWTtVQTFGeEIsVUFBSyxRQTBGbUIsTUExRk4sT0FBTztFQUFBO0VBR3pCLDZCQUFRLGlCQUFBLElBQWEsRUFBRTtxQkFBWDtVQUVYLE9BQUksSUFBSSxHQUFJLElBQUk7RUFBQTtFQUVqQix1Q0FBWSx1QkFBQSxRQUFROzs2Q0FBUTt1QkFDaEI7VUFDWCxzQkFBVyxVQUNNLEtBQUE7SUFBaEIsUUFBTSxZQUFJLFFBQU07a0RBQ0osWUFBUyxPQUFHLElBQUksSUFBQTtHQUFBO0VBQUE7RUFJOUIsb0JBQU0sYUFBQTs7VUFDTCxTQUFPOztFQUVSLDJCQUFPLGdCQUFBOztVQUNOLFlBQVE7O0VBRVQsK0JBQVMsa0JBQUEsRUFBSTs7cUJBQUc7K0JBQ1QsWUFBUSxFQUFFLElBQUs7O0VBRXRCLG1DQUFVLHFCQUFBLEVBQUk7O3FCQUFHO1VBQ1Qsc0JBQUEsMEJBQ087SUFBYiw4QkFBTztJQUNQLFVBQVE7SUFDUixjQUFVO0lBQ1YsbUJBQWEsR0FBRztXQUViO1lBQUE7TUFBRixRQUFhO01BQ1YsR0FBQSxLQUNJO09BQU4sT0FBTTtNQUFBO01BQ1AsZUFBVyxHQUFHO01BQ1gsR0FBQSxPQUFHLGVBQVcsWUFDUTtpQkFBYjtzQkFDRztNQUFBO0tBQUE7SUFBQTtHQUFBO0VBQUE7RUFHbEIsb0JBQU0sYUFBQTs7VUFFTCxTQUFPOztFQUVSLDJCQUFPLGdCQUFBOztVQUVOLFlBQVE7O0VBRVQsK0JBQVMsa0JBQUEsRUFBSTs7cUJBQUc7K0JBR1QsWUFBUSxFQUFFLElBQUs7O0VBRXRCLG1DQUFVLHFCQUFBLEVBQUk7O3FCQUFHO1VBRVQsc0JBQUEsMEJBQ087SUFBYiw4QkFBTztJQUNQLFVBQVE7SUFDUixjQUFVO0lBQ1YsbUJBQWEsR0FBRztXQUViO1lBQUE7TUFBRixRQUFhO01BQ1YsR0FBQSxLQUNJO09BQU4sT0FBTTtNQUFBO01BQ1AsZUFBVyxHQUFHO01BQ1gsR0FBQSxPQUFHLGVBQVcsWUFDUTtpQkFBYjtzQkFDRztNQUFBO0tBQUE7SUFBQTtHQUFBO0VBQUE7RUFHbEIsaUNBQVUsbUJBQUEsSUFBUTs7NkNBQVk7NkJBRWQ7VUFDVjtJQUFBLE1BQUE7SUFDSix3QkFBQSxHQUNPO1lBQU47SUFBQSxPQUVHO0tBQUgsY0FBVSw0QkFBUTttREFDYixHQUFRO01BQ1osYUFBUyxVQUFRO2FBQ1osS0FDaUI7YUFEakIsT0FBRyxVQUFRO2lCQUNKOzs7Ozs7O0VBR2hCLG9EQUFjLFNBQUE7T0FNVTtVQUFsQixLQUNzQjtvQ0FEVixNQUFNO0lBQ3RCLE9BQVk7S0FBQSxNQUFBO0tBQ1gsR0FBQSxXQUFBLEdBQ1M7YUFBUCxDQUFBLEVBQUU7Y0FDRixRQUFTLFVBQVEsR0FBSSxVQUFRO01BQUE7S0FBQSxPQUUzQjthQUFIO0tBQUE7SUFBQSIsImZpbGUiOiJjb21wYXJlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
