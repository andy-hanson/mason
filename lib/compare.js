"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./js","./Type/Method","./at/at","./at/q","./at/Seq/Seq","./control","./Function","./Object","./Type/Pred-Type"],(exports,js_0,Method_1,_64_2,_63_3,Seq_4,control_5,Function_6,Object_7,Pred_45Type_8)=>{
	exports._get=_ms.lazy(()=>{
		let _$2=_ms.getModule(js_0),defined_63=_ms.get(_$2,"defined?"),id_61_63=_ms.get(_$2,"id=?"),Method=_ms.getDefaultExport(Method_1),_64=_ms.lazy(()=>_ms.getDefaultExport(_64_2)),_$3=_ms.lazyGetModule(_64_2),all_63=_ms.lazyProp(_$3,"all?"),empty_63=_ms.lazyProp(_$3,"empty?"),from_45stream=_ms.lazyProp(_$3,"from-stream"),iterator=_ms.lazyProp(_$3,"iterator"),_$4=_ms.lazyGetModule(_63_3),un_45_63=_ms.lazyProp(_$4,"un-?"),Seq=_ms.lazy(()=>_ms.getDefaultExport(Seq_4)),_$5=_ms.lazyGetModule(Seq_4),first=_ms.lazyProp(_$5,"first"),_64tail=_ms.lazyProp(_$5,"@tail"),_$6=_ms.lazyGetModule(control_5),opr=_ms.lazyProp(_$6,"opr"),_$7=_ms.lazyGetModule(Function_6),identity=_ms.lazyProp(_$7,"identity"),_$8=_ms.lazyGetModule(Object_7),object_61_63=_ms.lazyProp(_$8,"object=?"),_$9=_ms.lazyGetModule(Pred_45Type_8),Opt=_ms.lazyProp(_$9,"Opt");
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
			_ms.checkInstance(Function,fun,"fun");
			return _61_63(fun(a),fun(b))
		};
		let all_45same_63=exports["all-same?"]=function all_45same_63(_64coll,fun){
			_ms.checkInstance(_ms.unlazy(_64),_64coll,"@coll");
			_ms.checkInstance(_ms.sub(_ms.unlazy(Opt),Function),fun,"fun");
			fun=_ms.unlazy(opr)(fun,_ms.unlazy(identity));
			return (_ms.unlazy(empty_63)(_64coll)||(()=>{
				let fst=fun(_ms.sub(_64coll,0));
				return _ms.unlazy(all_63)(_ms.unlazy(_64tail)(_64coll),_=>_61_63(fst,fun(_)))
			})())
		};
		let min=exports.min=function min(_){
			_ms.checkInstance(_ms.unlazy(_64),_,"_");
			return min_45by(_,_ms.unlazy(identity))
		};
		let _63min=exports["?min"]=function _63min(_){
			_ms.checkInstance(_ms.unlazy(_64),_,"_");
			return _63min_45by(_,_ms.unlazy(identity))
		};
		let min_45by=exports["min-by"]=function min_45by(_,by){
			_ms.checkInstance(_ms.unlazy(_64),_,"_");
			_ms.checkInstance(Function,by,"by");
			return _ms.unlazy(un_45_63)(_63min_45by(_,by),`Can not take min of empty.`)
		};
		let _63min_45by=exports["?min-by"]=function _63min_45by(_,by){
			_ms.checkInstance(_ms.unlazy(_64),_,"_");
			_ms.checkInstance(Function,by,"by");
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
			_ms.checkInstance(_ms.unlazy(_64),_,"_");
			return max_45by(_,_ms.unlazy(identity))
		};
		let _63max=exports["?max"]=function _63max(_){
			_ms.checkInstance(_ms.unlazy(_64),_,"_");
			return _63max_45by(_,_ms.unlazy(identity))
		};
		let max_45by=exports["max-by"]=function max_45by(_,by){
			_ms.checkInstance(_ms.unlazy(_64),_,"_");
			_ms.checkInstance(Function,by,"by");
			return _ms.unlazy(un_45_63)(_63max_45by(_,by),`Can not take max of empty.`)
		};
		let _63max_45by=exports["?max-by"]=function _63max_45by(_,by){
			_ms.checkInstance(_ms.unlazy(_64),_,"_");
			_ms.checkInstance(Function,by,"by");
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
			_ms.checkInstance(_ms.unlazy(Seq),seq,"seq");
			_ms.checkInstance(_ms.sub(_ms.unlazy(Opt),Function),sort_45by,"sort-by");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvY29tcGFyZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVlBO0VBZ0JBLHlCQUFJLEtBQUksUUFDTSxLQUFBOztjQVNiO0dBQ0EseUNBQWE7R0FDYixvQkFBTSxDQUFFO0dBQ1IsMkJBQVcsa0JBQUEsTUFDSzs7V0FBZixDQUFJLFNBQUssTUFBSyxpQ0FBaUIsTUFBSztHQUFBOzs7RUFFdEMsbURBQVksU0FBQSxNQUNLOztVQUVoQixPQUFJLFFBQVEsTUFBSyxPQUFPO0VBQUE7RUFFekIsd0RBQWEsU0FBQSxNQUNLOztVQUNqQixVQUFLLFFBQVEsTUFBSyxPQUFPO0VBQUE7RUFFMUIsbURBQVksU0FBQSxNQUNLOztVQUNoQixPQUFJLFFBQVEsTUFBSyxPQUFPO0VBQUE7RUFFekIsd0RBQWEsU0FBQSxNQUNLOztVQUNqQixVQUFLLFFBQVEsTUFBSyxPQUFPO0VBQUE7RUFHekIsNkJBQVEsaUJBQUEsSUFBYSxFQUFFLEVBQ0M7cUJBRFo7VUFFWCxPQUFJLElBQUksR0FBSSxJQUFJO0VBQUE7RUFFakIsdUNBQVksdUJBQUEsUUFBUSxJQUNpQjs7NkNBRFQ7dUJBQ2hCO1VBQ1gsc0JBQVcsVUFDTSxLQUFBO0lBQWhCLFFBQU0sWUFBSSxRQUFNO2tEQUNKLFlBQVMsT0FBRyxJQUFJLElBQUk7R0FBQTtFQUFBO0VBSWxDLG9CQUFNLGFBQUEsRUFDRzs7VUFBUixTQUFROztFQUVULDJCQUFPLGdCQUFBLEVBQ0c7O1VBQVQsWUFBUzs7RUFFViwrQkFBUyxrQkFBQSxFQUFJLEdBQ1c7O3FCQURSOytCQUNULFlBQVMsRUFBQyxJQUFLOztFQUV0QixtQ0FBVSxxQkFBQSxFQUFJLEdBQ1c7O3FCQURSO1VBQ1Qsc0JBQU8sMEJBQ0E7SUFBYiw4QkFBZ0I7SUFDaEIsVUFBUTtJQUNSLGNBQVU7SUFDVixtQkFBYSxHQUFHO1dBRWI7WUFBQTtNQUFGLFFBQWE7TUFDVixHQUFBLEtBQ0k7T0FBTixPQUFNO01BQUE7TUFDUCxlQUFXLEdBQUc7TUFDWCxHQUFBLE9BQUcsZUFBVyxZQUNRO2lCQUFiO3NCQUNHO01BQUE7S0FBQTtJQUFBO0dBQUE7RUFBQTtFQUdsQixvQkFBTSxhQUFBLEVBQ0c7O1VBQ1IsU0FBUTs7RUFFVCwyQkFBTyxnQkFBQSxFQUNHOztVQUNULFlBQVM7O0VBRVYsK0JBQVMsa0JBQUEsRUFBSSxHQUNXOztxQkFEUjsrQkFHVCxZQUFTLEVBQUMsSUFBSzs7RUFFdEIsbUNBQVUscUJBQUEsRUFBSSxHQUNXOztxQkFEUjtVQUVULHNCQUFPLDBCQUNBO0lBQWIsOEJBQWdCO0lBQ2hCLFVBQVE7SUFDUixjQUFVO0lBQ1YsbUJBQWEsR0FBRztXQUViO1lBQUE7TUFBRixRQUFhO01BQ1YsR0FBQSxLQUNJO09BQU4sT0FBTTtNQUFBO01BQ1AsZUFBVyxHQUFHO01BQ1gsR0FBQSxPQUFHLGVBQVcsWUFDUTtpQkFBYjtzQkFDRztNQUFBO0tBQUE7SUFBQTtHQUFBO0VBQUE7RUFHbEIsaUNBQVUsbUJBQUEsSUFBUSxVQUNxQjs7NkNBRFQ7NkJBRWQ7VUFDVjtJQUFBLE1BQUE7SUFDSix3QkFBTyxHQUNBO1lBQU47SUFBQSxPQUVHO0tBQUgsY0FBVSw0QkFBYzttREFDYixHQUFFLElBQ0U7TUFBZCxhQUFTLFVBQVE7YUFDWixLQUNpQjthQURqQixPQUFHLFVBQVE7aUJBQ0o7Ozs7Ozs7RUFHaEIsb0RBQWMsU0FBQSxVQUNPOztVQUtmLEtBQ3NCO29DQURWLE1BQU07SUFDckIsT0FBVztLQUFBLE1BQUE7S0FDWCxHQUFBLFdBQVMsR0FDQTthQUFQLENBQUEsRUFBRSxJQUNDO2NBQUgsUUFBUyxVQUFRLEdBQUksVUFBUTtNQUFBO0tBQUEsT0FFM0I7YUFBSDtLQUFBO0lBQUEiLCJmaWxlIjoiY29tcGFyZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
