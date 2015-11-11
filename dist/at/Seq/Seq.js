"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../compare","./../../Function","./../../math/methods","./../../methods","./../../String","./../../Type/Kind","./../../Type/Type","./../at","./../at-Type","./../../math/Number","./../../to-string","./../q","./Stream"],(exports,compare_0,Function_1,methods_2,methods_3,String_4,Kind_5,Type_6,_64_7,_64_45Type_8,Number_9,to_45string_10,_63_11,Stream_12)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(Function_1),Pred=_ms.get(_$3,"Pred"),_$4=_ms.getModule(methods_2),_45=_ms.get(_$4,"-"),_43=_ms.get(_$4,"+"),_$5=_ms.getModule(methods_3),sub=_ms.get(_$5,"sub"),_$6=_ms.getModule(String_4),indent=_ms.get(_$6,"indent"),_$7=_ms.getModule(Kind_5),self_45kind_33=_ms.get(_$7,"self-kind!"),_$8=_ms.getModule(Type_6),_61_62=_ms.get(_$8,"=>"),type_45of=_ms.get(_$8,"type-of"),_64=_ms.getDefaultExport(_64_7),_$9=_ms.getModule(_64_7),_43_43=_ms.get(_$9,"++"),count=_ms.get(_$9,"count"),empty_63=_ms.get(_$9,"empty?"),iterator=_ms.get(_$9,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_8),_$10=_ms.getModule(_64_45Type_8),empty=_ms.get(_$10,"empty"),from_45stream=_ms.get(_$10,"from-stream"),_$11=_ms.lazyGetModule(Number_9),Nat=_ms.lazyProp(_$11,"Nat"),to_45string=_ms.lazy(()=>_ms.getDefaultExport(to_45string_10)),_$12=_ms.lazyGetModule(_63_11),Opt_45_62_63=_ms.lazyProp(_$12,"Opt->?"),un_45_63=_ms.lazyProp(_$12,"un-?"),Stream=_ms.lazy(()=>_ms.getDefaultExport(Stream_12));
		const Seq=exports.default=(()=>{
			const _=_ms.kind("Seq",[_64],{},{
				[_ms.symbol(sub)](n){
					const _this=this;
					_ms.checkContains(_ms.unlazy(Nat),n,"n");
					return _ms.unlazy(un_45_63)(_63nth(_this,n),_ms.lazy(()=>`No element at index ${n} for
	${indent(_ms.unlazy(to_45string)(_this))}`))
				}
			});
			self_45kind_33(_,_64_45Type);
			return _
		})();
		const _60_43_43_126=exports["<++~"]=_ms.method("<++~",[["left-added",_64]],function(left_45added){
			const _this=this;
			_ms.checkContains(_64,left_45added,"left-added");
			return _61_62(type_45of(_this),_43_43(left_45added,_this))
		});
		const first=exports.first=function first(_){
			return _ms.unlazy(un_45_63)(_63first(_),`Can not take first of empty.`)
		};
		const _63first=exports["?first"]=_ms.method("?first",[],function(){
			const _this=this;
			return _63nth(_this,0)
		});
		const last=exports.last=function last(_){
			return _ms.unlazy(un_45_63)(_63last(_),`Can not take last of empty.`)
		};
		const _63last=exports["?last"]=_ms.method("?last",[],function(){
			const _this=this;
			return (empty_63(_this)?_ms.None:_ms.some((()=>{
				return _ms.sub(_this,_45(count(_this),1))
			})()))
		});
		const _64tail=exports["@tail"]=_ms.method("@tail",[],function(){
			const _this=this;
			return (empty_63(_this)?_this:_64drop(_this,1))
		});
		const _64rtail=exports["@rtail"]=_ms.method("@rtail",[],function(){
			const _this=this;
			return (empty_63(_this)?_this:_64take(_this,_45(count(_this),1)))
		});
		const seq_61_63=exports["seq=?"]=function seq_61_63(_64a,_64b){
			_ms.checkContains(_64,_64a,"@a");
			_ms.checkContains(_64,_64b,"@b");
			const iter_45a=iterator(_64a);
			const iter_45b=iterator(_64b);
			return (()=>{
				for(;;){
					const next_45a=iter_45a.next();
					const next_45b=iter_45b.next();
					if((next_45a.done||next_45b.done)){
						return _61_63(next_45a.done,next_45b.done)
					};
					if(! _61_63(next_45a.value,next_45b.value)){
						return false
					}
				}
			})()
		};
		const _63nth=exports["?nth"]=_ms.method("?nth",[["n",_ms.unlazy(Nat)]],function(n){
			const _this=this;
			_ms.checkContains(_ms.unlazy(Nat),n,"n");
			let i=0;
			return _ms.unlazy(Opt_45_62_63)((()=>{
				for(let _ of _this){
					if(_61_63(i,n)){
						return _
					};
					i=_43(1,i)
				}
			})())
		});
		const _64slice=exports["@slice"]=_ms.method("@slice",[["start",_ms.unlazy(Nat)],["end",_ms.unlazy(Nat)]],function(start,end){
			const _this=this;
			_ms.checkContains(_ms.unlazy(Nat),start,"start");
			_ms.checkContains(_ms.unlazy(Nat),end,"end");
			return _61_62(type_45of(_this),_64slice_126(_this,start,end))
		});
		const _64slice_126=exports["@slice~"]=function _64slice_126(_,start,end){
			return _ms.checkContains(_64,_64take_126(_64drop_126(_,start),_45(end,start)),"returned value")
		};
		const _64take=exports["@take"]=_ms.method("@take",[["count-to-take",_ms.unlazy(Nat)]],function(count_45to_45take){
			const _this=this;
			_ms.checkContains(_ms.unlazy(Nat),count_45to_45take,"count-to-take");
			return _61_62(type_45of(_this),_64take_126(_this,count_45to_45take))
		});
		const _64take_126=exports["@take~"]=function _64take_126(_,count_45to_45take){
			_ms.checkContains(_ms.unlazy(Nat),count_45to_45take,"count-to-take");
			return (()=>{
				if(_61_63(0,count_45to_45take)){
					return empty(_ms.unlazy(Stream))
				} else {
					return new (_ms.unlazy(Stream))(function*(){
						let n=count_45to_45take;
						for(let elem of _){
							(yield elem);
							n=_45(n,1);
							if(_61_63(0,n)){
								break
							}
						}
					})
				}
			})()
		};
		const _64take_45while_126=exports["@take-while~"]=function _64take_45while_126(_,while_63){
			_ms.checkContains(Pred,while_63,"while?");
			return new (_ms.unlazy(Stream))(function*(){
				for(let elem of _){
					if(! while_63(elem)){
						break
					};
					(yield elem)
				}
			})
		};
		const _64drop=exports["@drop"]=_ms.method("@drop",[["count-to-drop",_ms.unlazy(Nat)]],function(count_45to_45drop){
			const _this=this;
			_ms.checkContains(_ms.unlazy(Nat),count_45to_45drop,"count-to-drop");
			return _61_62(type_45of(_this),_64drop_126(_this,count_45to_45drop))
		});
		const _64drop_126=exports["@drop~"]=(()=>{
			return (_,count_45to_45drop)=>{
				return new (_ms.unlazy(Stream))(function*(){
					const iter=iterator(_);
					let i=0;
					for(;;){
						if(_61_63(i,count_45to_45drop)){
							break
						};
						if(iter.next().done){
							break
						};
						i=_43(1,i)
					};
					(yield* iter)
				})
			}
		})();
		const _64zip=exports["@zip"]=function _64zip(_64a,_64b,zipper){
			_ms.checkContains(_64,_64a,"@a");
			_ms.checkContains(_64,_64b,"@b");
			_ms.checkContains(_ms.sub(Function,2),zipper,"zipper");
			return _61_62(type_45of(_64a),_64zip_126(_64a,_64b,zipper))
		};
		const _64zip_126=exports["@zip~"]=function _64zip_126(_64a,_64b,zipper){
			_ms.checkContains(_64,_64a,"@a");
			_ms.checkContains(_64,_64b,"@b");
			_ms.checkContains(_ms.sub(Function,2),zipper,"zipper");
			return new (_ms.unlazy(Stream))(function*(){
				const iter_45a=iterator(_64a);
				const iter_45b=iterator(_64b);
				for(;;){
					const next_45a=iter_45a.next();
					if(next_45a.done){
						break
					};
					const next_45b=iter_45b.next();
					if(next_45b.done){
						break
					};
					(yield zipper(next_45a.value,next_45b.value))
				}
			})
		};
		const _64groups_45of_126=exports["@groups-of~"]=function _64groups_45of_126(group_45size,_){
			_ms.checkContains(_ms.unlazy(Nat),group_45size,"group-size");
			return (()=>{
				if(_61_63(group_45size,0)){
					return new (_ms.unlazy(Stream))(function*(){
						for(;;){
							(yield [])
						}
					})
				} else {
					return new (_ms.unlazy(Stream))(function*(){
						const iter=iterator(_);
						for(;;){
							const next_45group=[];
							for(;;){
								const _$0=iter.next(),value=_$0.value,done=_$0.done;
								if(done){
									break
								};
								_43_43_62_33(next_45group,[value]);
								if(_61_63(group_45size,count(next_45group))){
									break
								}
							};
							if(! _61_63(group_45size,count(next_45group))){
								break
							};
							(yield next_45group)
						}
					})
				}
			})()
		};
		const _64indexes=exports["@indexes"]=function _64indexes(_){
			_ms.checkContains(Seq,_,"_");
			return _ms.range(0,count(_),true)
		};
		const _64reverse=exports["@reverse"]=_ms.method("@reverse",[],function(){
			const _this=this;
			return from_45stream(Array,_this).reverse()
		});
		const _64reverse_126=exports["@reverse~"]=_ms.method("@reverse~",[],function(){
			const _this=this;
			const arr=_61_62(Array,_this);
			return new (_ms.unlazy(Stream))(function*(){
				for(let _ of _64reverse(_64indexes(arr))){
					(yield _ms.sub(arr,_))
				}
			})
		});
		const _64split_126=exports["@split~"]=function _64split_126(_,split_63){
			_ms.checkContains(Pred,split_63,"split?");
			return new (_ms.unlazy(Stream))(function*(){
				const iter=iterator(_);
				let prev_45idx=0;
				let cur_45idx=0;
				for(;;){
					const _$1=iter.next(),value=_$1.value,done=_$1.done;
					const next_45idx=_ms.lazy(()=>_43(1,cur_45idx));
					if(done){
						(yield _64slice(_,prev_45idx,cur_45idx));
						break
					} else if(split_63(value)){
						(yield _64slice(_,prev_45idx,cur_45idx));
						prev_45idx=_ms.unlazy(next_45idx);
						cur_45idx=_ms.unlazy(next_45idx)
					} else {
						cur_45idx=_ms.unlazy(next_45idx)
					}
				}
			})
		};
		const _60_43_33=exports["<+!"]=_ms.method("<+!",["added"]);
		const _60_43_43_33=exports["<++!"]=_ms.method("<++!",[["@added",_64]],function(_64added){
			const _this=this;
			_ms.checkContains(_64,_64added,"@added");
			for(let _ of _64reverse_126(_64added)){
				_60_43_33(_this,_)
			}
		});
		const _43_62_33=exports["+>!"]=_ms.method("+>!",["added"]);
		const _43_43_62_33=exports["++>!"]=_ms.method("++>!",[["@added",_64]],function(_64added){
			const _this=this;
			_ms.checkContains(_64,_64added,"@added");
			for(let _ of _64added){
				_43_62_33(_this,_)
			}
		});
		const _63_60pop_33=exports["?<pop!"]=_ms.method("?<pop!",[]);
		const _63pop_62_33=exports["?pop>!"]=_ms.method("?pop>!",[]);
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9TZXEvU2VxLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBZ0JBLDBCQUFVLEtBR1A7MkJBSE87Z0JBS1QsTUFBSztXQXlPQzs7aUNBdk9DLE9BdU9ELE1Bdk9XLGdCQUNmLHVCQUFxQixVQUNuQiwrQkFxT0U7OztHQTNPTCxlQUFXLEVBQUU7OztFQVVkLHFFQUF5QixNQUFYLFNBQUE7U0FpT1I7cUJBak9tQjtVQUd4QixPQUFJLFVBOE5DLE9BOU5jLE9BQUcsYUE4TmpCO0VBQUE7RUEzTk4sMEJBQVEsZUFBQTsrQkFFRixTQUFBLEdBQVM7O0VBRWYsd0RBQ2dCO1NBc05WO1VBck5MLE9BcU5LLE1Bck5LO0VBQUE7RUFFWCx3QkFBTyxjQUFBOytCQUVELFFBQUEsR0FBUTs7RUFFZCxxREFDZTtTQThNVDtVQTdNRSxDQUFBLFNBNk1GLDhCQTVNYTttQkE0TWIsTUE1TUUsSUFBRyxNQTRNTCxPQTVNaUI7R0FBQTtFQUFBO0VBRXZCLHFEQUNlO1NBeU1UO1VBdk1BLENBQUMsU0F1TUQsYUF2TW9CLFFBdU1wQixNQXZNK0I7RUFBQTtFQUVyQyx3REFDZ0I7U0FvTVY7VUFsTUEsQ0FBQyxTQWtNRCxhQWxNb0IsUUFrTXBCLE1BbE1nQyxJQUFHLE1Ba01uQyxPQWxNK0M7RUFBQTtFQUdyRCxpQ0FBUSxtQkFBQSxLQUFLO3FCQUFGO3FCQUFLO0dBSWYsZUFBUyxTQUFTO0dBQ2xCLGVBQVMsU0FBUztVQUVmO1dBQUE7S0FBRixlQUFTO0tBQ1QsZUFBUztLQUNOLEdBQUEsQ0FBRyxlQUFZLGVBQ1c7TUFBNUIsT0FBTSxPQUFHLGNBQVk7O0tBQ2YsS0FBQSxPQUFHLGVBQWEsZ0JBQ1k7TUFBbEMsT0FBTTtLQUFBO0lBQUE7R0FBQTtFQUFBO0VBRVQsdUVBQWMsU0FBQTtTQWlMUjs7R0E5S0wsTUFBTTttQ0FFSztZQUFBLEtBNEtOLE1BM0tVO0tBQVgsR0FBQSxPQUFHLEVBQUUsR0FDQztNQUFSLE9BQU07S0FBQTtPQUNGLElBQUUsRUFBRTtJQUFBO0dBQUE7RUFBQTtFQUdYLHlHQUFnQixTQUFBLE1BQVU7U0FzS3BCOzs7VUFsS0wsT0FBSSxVQWtLQyxPQWxLYyxhQWtLZCxNQWxLMkIsTUFBTTtFQUFBO0VBRXZDLHNDQUFVLHNCQUFHLEVBQUUsTUFBTTs0QkFBVixJQUVWLFlBQVEsWUFBTyxFQUFFLE9BQVEsSUFBRSxJQUFJOztFQUVoQyxzRkFBZSxTQUFBO1NBNEpUOztVQTFKTCxPQUFJLFVBMEpDLE9BMUpjLFlBMEpkLE1BMUowQjtFQUFBO0VBRWhDLG9DQUFTLHFCQUFBLEVBQUU7O1VBSU47SUFBSCxHQUFBLE9BQUcsRUFBRSxtQkFDYTtZQUFqQjtXQUVHO1lBQ0gseUJBQ2M7TUFBYixNQUFNO01BQ0YsUUFBQSxRQUFRLEVBQ0M7Y0FBVDtTQUNFLElBQUUsRUFBRTtPQUNOLEdBQUEsT0FBRyxFQUFFLEdBQ0M7UUFBUjtPQUFBO01BQUE7S0FBQTtJQUFBO0dBQUE7RUFBQTtFQUdOLGtEQUFlLDZCQUFBLEVBQUU7cUJBQU87VUFHdkIseUJBQ2M7SUFBVCxRQUFBLFFBQVEsRUFDQztLQUFMLEtBQUEsU0FBTyxNQUNJO01BQWpCO0tBQUE7WUFDRTtJQUFBO0dBQUE7RUFBQTtFQUVOLHNGQUFlLFNBQUE7U0E4SFQ7O1VBNUhMLE9BQUksVUE0SEMsT0E1SGMsWUE0SGQsTUE1SDBCO0VBQUE7RUFFaEMsb0NBQ08sS0FBQTtVQUNMLENBQUEsRUFBRTtXQUVGLHlCQUNjO0tBQWIsV0FBTyxTQUFBO0tBQ1AsTUFBTTtLQUVILE9BQUE7TUFBQyxHQUFBLE9BQUcsRUFBRSxtQkFDYTtPQUFwQjtNQUFBO01BQ0UsR0FBQSxpQkFDZ0I7T0FBbEI7TUFBQTtRQUNJLElBQUUsRUFBRTtLQUFBO2FBQ047SUFBQTtHQUFBO0VBQUE7RUFLUCw2QkFBTyxnQkFBQSxLQUFLLEtBQUs7cUJBQVA7cUJBQUs7NkJBQVMsU0FBUztVQUdoQyxPQUFJLFVBQVEsTUFBSyxXQUFNLEtBQUcsS0FBRztFQUFBO0VBRTlCLGtDQUFRLG9CQUFBLEtBQUssS0FBSztxQkFBUDtxQkFBSzs2QkFBUyxTQUFTO1VBS2pDLHlCQUNjO0lBQWIsZUFBUyxTQUFTO0lBQ2xCLGVBQVMsU0FBUztJQUVmLE9BQUE7S0FBRixlQUFTO0tBQ04sR0FBQSxjQUNXO01BQWI7S0FBQTtLQUNELGVBQVM7S0FDTixHQUFBLGNBQ1c7TUFBYjtLQUFBO1lBQ0UsT0FBTyxlQUFhOzs7O0VBRzFCLGdEQUFjLDRCQUFBLGFBQWU7O1VBR3hCO0lBQUgsR0FBQSxPQUFHLGFBQVcsR0FDQztZQUNkLHlCQUNjO01BQ1YsT0FBQTtjQUFDO01BQUE7S0FBQTtJQUFBLE9BRUY7WUFDSCx5QkFDYztNQUFiLFdBQU8sU0FBQTtNQUVKLE9BQUE7T0FBRixtQkFBYTtPQUVWLE9BQUE7UUFBRixVQUFhO1FBQ1YsR0FBQSxLQUNJO1NBQU47UUFBQTtRQUNELGFBQUssYUFBVyxDQUFDO1FBQ2QsR0FBQSxPQUFHLGFBQVksTUFBTSxlQUNXO1NBQWxDO1FBQUE7T0FBQTtPQUNLLEtBQUEsT0FBRyxhQUFZLE1BQU0sZUFDVztRQUF0QztPQUFBO2NBQ0U7TUFBQTtLQUFBO0lBQUE7R0FBQTtFQUFBO0VBRVIscUNBQVcsb0JBQUE7cUJBQUU7b0JBRVosRUFBSSxNQUFBOztFQUVMLDhEQUNrQjtTQW1EWjtVQWxESixjQUFZLE1Ba0RSOztFQWhETixvRUFDbUI7U0ErQ2I7R0EvQ0wsVUFBTSxPQUFHLE1BK0NKO1VBN0NMLHlCQUNjO0lBQVQsUUFBQSxLQUFBLFdBQVUsV0FBUyxNQUNJO29CQUF2QixJQUFJO0lBQUE7R0FBQTtFQUFBO0VBRVYsc0NBQVUsc0JBQUEsRUFBRTtxQkFBTztVQUlsQix5QkFDYztJQUFiLFdBQU8sU0FBQTtJQUNQLGVBQWE7SUFDYixjQUFZO0lBRVQsT0FBQTtLQUFGLFVBQWE7S0FDYiw4QkFBWSxJQUFFLEVBQUU7S0FFWixHQUFILEtBQ0k7YUFBQSxTQUFPLEVBQUUsV0FBUztNQUNyQjtLQUFBLE9BQ0QsR0FBQSxTQUFPLE9BQ0s7YUFBUixTQUFPLEVBQUUsV0FBUzs7O1lBSWxCOzs7Ozs7RUFJUjtFQUlBLGdFQUFzQixNQUFQLFNBQUE7U0FhVDtxQkFiZ0I7R0FFakIsUUFBQSxLQUFBLGVBQVUsVUFDTTtJQUFuQixVQVVJLE1BVks7R0FBQTtFQUFBO0VBR1g7RUFJQSxnRUFBc0IsTUFBUCxTQUFBO1NBR1Q7cUJBSGdCO0dBRWpCLFFBQUEsS0FBQSxTQUNNO0lBQVQsVUFBSSxNQUFLO0dBQUE7RUFBQTtFQUVYO0VBSUEiLCJmaWxlIjoiYXQvU2VxL1NlcS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
