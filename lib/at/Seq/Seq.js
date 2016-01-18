"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../compare","./../../Function","./../../math/methods","./../../methods","./../../String","./../../Type/Type","./../at","./../../math/Number","./../../to-string","./../q","./Stream"],(exports,compare_0,Function_1,methods_2,methods_3,String_4,Type_5,_64_6,Number_7,to_45string_8,_63_9,Stream_10)=>{
	exports._get=_ms.lazy(()=>{
		let _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(Function_1),Pred=_ms.get(_$3,"Pred"),_$4=_ms.getModule(methods_2),_45=_ms.get(_$4,"-"),_43=_ms.get(_$4,"+"),_$5=_ms.getModule(methods_3),sub=_ms.get(_$5,"sub"),_$6=_ms.getModule(String_4),indent=_ms.get(_$6,"indent"),_$7=_ms.getModule(Type_5),_61_62=_ms.get(_$7,"=>"),type_45of=_ms.get(_$7,"type-of"),_64=_ms.getDefaultExport(_64_6),_$8=_ms.getModule(_64_6),_43_43=_ms.get(_$8,"++"),count=_ms.get(_$8,"count"),empty=_ms.get(_$8,"empty"),empty_63=_ms.get(_$8,"empty?"),from_45stream=_ms.get(_$8,"from-stream"),iterator=_ms.get(_$8,"iterator"),_$9=_ms.lazyGetModule(Number_7),Nat=_ms.lazyProp(_$9,"Nat"),to_45string=_ms.lazy(()=>_ms.getDefaultExport(to_45string_8)),_$10=_ms.lazyGetModule(_63_9),Opt_45_62_63=_ms.lazyProp(_$10,"Opt->?"),un_45_63=_ms.lazyProp(_$10,"un-?"),Stream=_ms.lazy(()=>_ms.getDefaultExport(Stream_10));
		let Seq=exports.default=_ms.trait("Seq",[_64],{},{
			[_ms.symbol(sub)](n){
				let _this=this;
				_ms.checkInstance(_ms.unlazy(Nat),n,"n");
				return _ms.unlazy(un_45_63)(_63nth(_this,n),_ms.lazy(()=>`No element at index ${n} for
	${indent(_ms.unlazy(to_45string)(_this))}`))
			}
		});
		let _60_43_43_126=exports["<++~"]=_ms.method("<++~",[["left-added",_64]],function(left_45added){
			let _this=this;
			_ms.checkInstance(_64,left_45added,"left-added");
			return _61_62(type_45of(_this),_43_43(left_45added,_this))
		});
		let first=exports.first=function first(_){
			return _ms.unlazy(un_45_63)(_63first(_),`Can not take first of empty.`)
		};
		let _63first=exports["?first"]=_ms.method("?first",[],function(){
			let _this=this;
			return _63nth(_this,0)
		});
		let last=exports.last=function last(_){
			return _ms.unlazy(un_45_63)(_63last(_),`Can not take last of empty.`)
		};
		let _63last=exports["?last"]=_ms.method("?last",[],function(){
			let _this=this;
			return (empty_63(_this)?_ms.None:_ms.some((()=>{
				return _ms.sub(_this,_45(count(_this),1))
			})()))
		});
		let _64tail=exports["@tail"]=_ms.method("@tail",[],function(){
			let _this=this;
			return (empty_63(_this)?_this:_64drop(_this,1))
		});
		let _64rtail=exports["@rtail"]=_ms.method("@rtail",[],function(){
			let _this=this;
			return (empty_63(_this)?_this:_64take(_this,_45(count(_this),1)))
		});
		let seq_61_63=exports["seq=?"]=function seq_61_63(_64a,_64b){
			_ms.checkInstance(_64,_64a,"@a");
			_ms.checkInstance(_64,_64b,"@b");
			let iter_45a=iterator(_64a);
			let iter_45b=iterator(_64b);
			return (()=>{
				for(;;){
					let next_45a=iter_45a.next();
					let next_45b=iter_45b.next();
					if((next_45a.done||next_45b.done)){
						return _61_63(next_45a.done,next_45b.done)
					};
					if(! _61_63(next_45a.value,next_45b.value)){
						return false
					}
				}
			})()
		};
		let _63nth=exports["?nth"]=_ms.method("?nth",[["n",_ms.unlazy(Nat)]],function(n){
			let _this=this;
			_ms.checkInstance(_ms.unlazy(Nat),n,"n");
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
		let _64slice=exports["@slice"]=_ms.method("@slice",[["start",_ms.unlazy(Nat)],["end",_ms.unlazy(Nat)]],function(start,end){
			let _this=this;
			_ms.checkInstance(_ms.unlazy(Nat),start,"start");
			_ms.checkInstance(_ms.unlazy(Nat),end,"end");
			return _61_62(type_45of(_this),_64slice_126(_this,start,end))
		});
		let _64slice_126=exports["@slice~"]=function _64slice_126(_,start,end){
			return _ms.checkInstance(_64,_64take_126(_64drop_126(_,start),_45(end,start)),"returned value")
		};
		let _64take=exports["@take"]=_ms.method("@take",[["count-to-take",_ms.unlazy(Nat)]],function(count_45to_45take){
			let _this=this;
			_ms.checkInstance(_ms.unlazy(Nat),count_45to_45take,"count-to-take");
			return _61_62(type_45of(_this),_64take_126(_this,count_45to_45take))
		});
		let _64take_126=exports["@take~"]=function _64take_126(_,count_45to_45take){
			_ms.checkInstance(_ms.unlazy(Nat),count_45to_45take,"count-to-take");
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
		let _64take_45while_126=exports["@take-while~"]=function _64take_45while_126(_,while_63){
			_ms.checkInstance(Pred,while_63,"while?");
			return new (_ms.unlazy(Stream))(function*(){
				for(let elem of _){
					if(! while_63(elem)){
						break
					};
					(yield elem)
				}
			})
		};
		let _64drop=exports["@drop"]=_ms.method("@drop",[["count-to-drop",_ms.unlazy(Nat)]],function(count_45to_45drop){
			let _this=this;
			_ms.checkInstance(_ms.unlazy(Nat),count_45to_45drop,"count-to-drop");
			return _61_62(type_45of(_this),_64drop_126(_this,count_45to_45drop))
		});
		let _64drop_126=exports["@drop~"]=(()=>{
			return (_,count_45to_45drop)=>{
				return new (_ms.unlazy(Stream))(function*(){
					let iter=iterator(_);
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
		let _64zip=exports["@zip"]=function _64zip(_64a,_64b,zipper){
			_ms.checkInstance(_64,_64a,"@a");
			_ms.checkInstance(_64,_64b,"@b");
			_ms.checkInstance(_ms.sub(Function,2),zipper,"zipper");
			return _61_62(type_45of(_64a),_64zip_126(_64a,_64b,zipper))
		};
		let _64zip_126=exports["@zip~"]=function _64zip_126(_64a,_64b,zipper){
			_ms.checkInstance(_64,_64a,"@a");
			_ms.checkInstance(_64,_64b,"@b");
			_ms.checkInstance(_ms.sub(Function,2),zipper,"zipper");
			return new (_ms.unlazy(Stream))(function*(){
				let iter_45a=iterator(_64a);
				let iter_45b=iterator(_64b);
				for(;;){
					let next_45a=iter_45a.next();
					if(next_45a.done){
						break
					};
					let next_45b=iter_45b.next();
					if(next_45b.done){
						break
					};
					(yield zipper(next_45a.value,next_45b.value))
				}
			})
		};
		let _64groups_45of_126=exports["@groups-of~"]=function _64groups_45of_126(group_45size,_){
			_ms.checkInstance(_ms.unlazy(Nat),group_45size,"group-size");
			return (()=>{
				if(_61_63(group_45size,0)){
					return new (_ms.unlazy(Stream))(function*(){
						for(;;){
							(yield [])
						}
					})
				} else {
					return new (_ms.unlazy(Stream))(function*(){
						let iter=iterator(_);
						for(;;){
							let next_45group=[];
							for(;;){
								let _$0=iter.next(),value=_$0.value,done=_$0.done;
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
		let _64indexes=exports["@indexes"]=function _64indexes(_){
			_ms.checkInstance(Seq,_,"_");
			return _ms.range(0,count(_),true)
		};
		let _64reverse=exports["@reverse"]=_ms.method("@reverse",[],function(){
			let _this=this;
			return from_45stream(Array,_this).reverse()
		});
		let _64reverse_126=exports["@reverse~"]=_ms.method("@reverse~",[],function(){
			let _this=this;
			let arr=_61_62(Array,_this);
			return new (_ms.unlazy(Stream))(function*(){
				for(let _ of _64reverse(_64indexes(arr))){
					(yield _ms.sub(arr,_))
				}
			})
		});
		let _64split_126=exports["@split~"]=function _64split_126(_,split_63){
			_ms.checkInstance(Pred,split_63,"split?");
			return new (_ms.unlazy(Stream))(function*(){
				let iter=iterator(_);
				let prev_45idx=0;
				let cur_45idx=0;
				for(;;){
					let _$1=iter.next(),value=_$1.value,done=_$1.done;
					let next_45idx=_ms.lazy(()=>_43(1,cur_45idx));
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
		let _60_43_33=exports["<+!"]=_ms.method("<+!",["added"]);
		let _60_43_43_33=exports["<++!"]=_ms.method("<++!",[["@added",_64]],function(_64added){
			let _this=this;
			_ms.checkInstance(_64,_64added,"@added");
			for(let _ of _64reverse_126(_64added)){
				_60_43_33(_this,_)
			}
		});
		let _43_62_33=exports["+>!"]=_ms.method("+>!",["added"]);
		let _43_43_62_33=exports["++>!"]=_ms.method("++>!",[["@added",_64]],function(_64added){
			let _this=this;
			_ms.checkInstance(_64,_64added,"@added");
			for(let _ of _64added){
				_43_62_33(_this,_)
			}
		});
		let _63_60pop_33=exports["?<pop!"]=_ms.method("?<pop!",[]);
		let _63pop_62_33=exports["?pop>!"]=_ms.method("?pop>!",[]);
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9TZXEvU2VxLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBY0EseUNBQVc7R0FFVixZQUFBLE1BQUssRUFDSzs7O2dDQUNILE9BQUssTUFBSyxnQkFDZix1QkFBcUI7R0FDbEIsK0JBQWtCOzs7RUFJdkIsbUVBQXlCLE1BQVgsU0FBQSxhQUNZOztxQkFERDtVQUd4QixPQUFJLFVBQVEsT0FBTyxPQUFHLGFBQVc7RUFBQTtFQUdsQyx3QkFBUyxlQUFBLEVBQ0E7K0JBQ0gsU0FBTyxHQUFFOztFQUVmLHNEQUNnQixVQUFBOztVQUNmLE9BQUssTUFBSztFQUFBO0VBRVgsc0JBQVEsY0FBQSxFQUNBOytCQUNGLFFBQU0sR0FBRTs7RUFFZCxtREFDZSxVQUFBOztVQUNQLENBQUEsU0FBTyw4QkFDSTttQkFBakIsTUFBTSxJQUFHLE1BQU0sT0FBTTtHQUFBO0VBQUE7RUFFdkIsbURBQ2UsVUFBQTs7VUFFVCxDQUFDLFNBQU8sT0FBTSxNQUFNLFFBQU0sTUFBSztFQUFBO0VBRXJDLHNEQUNnQixVQUFBOztVQUVWLENBQUMsU0FBTyxPQUFNLE1BQU0sUUFBTSxNQUFNLElBQUcsTUFBTSxPQUFNO0VBQUE7RUFHckQsK0JBQVEsbUJBQUEsS0FBSyxLQUNJO3FCQUROO3FCQUFLO0dBSWYsYUFBUyxTQUFTO0dBQ2xCLGFBQVMsU0FBUztVQUVmO1dBQUE7S0FBRixhQUFTO0tBQ1QsYUFBUztLQUNOLEdBQUEsQ0FBRyxlQUFZLGVBQ1c7TUFBNUIsT0FBTSxPQUFHLGNBQVk7O0tBQ2YsS0FBQSxPQUFHLGVBQWEsZ0JBQ1k7TUFBbEMsT0FBTTtLQUFBO0lBQUE7R0FBQTtFQUFBO0VBRVQscUVBQWMsU0FBQSxFQUNLOzs7R0FFbEIsTUFBSTttQ0FFTztZQUFBLEtBQUEsTUFDSTtLQUFYLEdBQUEsT0FBRyxFQUFFLEdBQ0M7TUFBUixPQUFPO0tBQUE7T0FDSCxJQUFFLEVBQUU7SUFBQTtHQUFBO0VBQUE7RUFHWCx1R0FBZ0IsU0FBQSxNQUFVLElBQ087Ozs7VUFHaEMsT0FBSSxVQUFRLE9BQU8sYUFBUSxNQUFLLE1BQU07RUFBQTtFQUV2QyxvQ0FBVSxzQkFBSSxFQUFDLE1BQU0sSUFDRzs0QkFEYixJQUVWLFlBQVEsWUFBUSxFQUFDLE9BQVEsSUFBRSxJQUFJOztFQUVoQyxvRkFBZSxTQUFBLGtCQUNpQjs7O1VBQy9CLE9BQUksVUFBUSxPQUFPLFlBQU8sTUFBSztFQUFBO0VBRWhDLGtDQUFVLHFCQUFBLEVBQUMsa0JBQ2lCOztVQUd2QjtJQUFILEdBQUEsT0FBRyxFQUFFLG1CQUNhO1lBQWpCO1dBRUc7WUFDSCx5QkFDYyxXQUFBO01BQWIsTUFBSTtNQUNBLFFBQUEsUUFBUyxFQUNBO2NBQU47U0FDRCxJQUFFLEVBQUU7T0FDTixHQUFBLE9BQUcsRUFBRSxHQUNDO1FBQVI7T0FBQTtNQUFBO0tBQUE7SUFBQTtHQUFBO0VBQUE7RUFHTixnREFBZ0IsNkJBQUEsRUFBQyxTQUNXO3FCQURKO1VBR3ZCLHlCQUNjLFdBQUE7SUFBVCxRQUFBLFFBQVMsRUFDQTtLQUFMLEtBQUEsU0FBTyxNQUNJO01BQWpCO0tBQUE7WUFDSztJQUFBO0dBQUE7RUFBQTtFQUVULG9GQUFlLFNBQUEsa0JBQ2lCOzs7VUFDL0IsT0FBSSxVQUFRLE9BQU8sWUFBTyxNQUFLO0VBQUE7RUFFaEMsa0NBQ08sS0FBQTtVQUNKLENBQUEsRUFBQyxvQkFDYTtXQUNmLHlCQUNjLFdBQUE7S0FBYixTQUFPLFNBQVM7S0FDaEIsTUFBSTtLQUVELE9BQUE7TUFBQyxHQUFBLE9BQUcsRUFBRSxtQkFDYTtPQUFwQjtNQUFBO01BQ0UsR0FBQSxpQkFDZ0I7T0FBbEI7TUFBQTtRQUNJLElBQUUsRUFBRTtLQUFBO2FBQ0g7SUFBQTtHQUFBO0VBQUE7RUFLViwyQkFBTyxnQkFBQSxLQUFLLEtBQUssT0FDa0I7cUJBRHpCO3FCQUFLOzZCQUFTLFNBQVM7VUFHaEMsT0FBSSxVQUFRLE1BQUssV0FBTSxLQUFHLEtBQUc7RUFBQTtFQUU5QixnQ0FBUSxvQkFBQSxLQUFLLEtBQUssT0FDa0I7cUJBRHpCO3FCQUFLOzZCQUFTLFNBQVM7VUFLakMseUJBQ2MsV0FBQTtJQUFiLGFBQVMsU0FBUztJQUNsQixhQUFTLFNBQVM7SUFFZixPQUFBO0tBQUYsYUFBUztLQUNOLEdBQUEsY0FDVztNQUFiO0tBQUE7S0FDRCxhQUFTO0tBQ04sR0FBQSxjQUNXO01BQWI7S0FBQTtZQUNLLE9BQU8sZUFBYTs7OztFQUc3Qiw4Q0FBYyw0QkFBQSxhQUFnQixFQUNrQjs7VUFFM0M7SUFBSCxHQUFBLE9BQUcsYUFBVyxHQUNDO1lBQ2QseUJBQ2MsV0FBQTtNQUNWLE9BQUE7Y0FBSTtNQUFBO0tBQUE7SUFBQSxPQUVMO1lBQ0gseUJBQ2MsV0FBQTtNQUFiLFNBQU8sU0FBUztNQUViLE9BQUE7T0FBRixpQkFBYTtPQUVWLE9BQUE7UUFBRixRQUFhO1FBQ1YsR0FBQSxLQUNJO1NBQU47UUFBQTtRQUNELGFBQUssYUFBVyxDQUFDO1FBQ2QsR0FBQSxPQUFHLGFBQVksTUFBTSxlQUNXO1NBQWxDO1FBQUE7T0FBQTtPQUNLLEtBQUEsT0FBRyxhQUFZLE1BQU0sZUFDVztRQUF0QztPQUFBO2NBQ0s7TUFBQTtLQUFBO0lBQUE7R0FBQTtFQUFBO0VBRVgsbUNBQVcsb0JBQUEsRUFDSztxQkFESDtvQkFFWixFQUFJLE1BQU07O0VBRVgsNERBQ2tCLFVBQUE7O1VBQ2hCLGNBQVksTUFBTTs7RUFFcEIsa0VBQ21CLFVBQUE7O0dBQWxCLFFBQU0sT0FBRyxNQUFNO1VBRWYseUJBQ2MsV0FBQTtJQUFULFFBQUEsS0FBQSxXQUFVLFdBQVMsTUFDSTtvQkFBcEIsSUFBSztJQUFBO0dBQUE7RUFBQTtFQUVkLG9DQUFXLHNCQUFBLEVBQUMsU0FDVztxQkFESjtVQUlsQix5QkFDYyxXQUFBO0lBQWIsU0FBTyxTQUFTO0lBQ2hCLGVBQVc7SUFDWCxjQUFVO0lBRVAsT0FBQTtLQUFGLFFBQWE7S0FDYiw0QkFBWSxJQUFFLEVBQUU7S0FFWixHQUFILEtBQ0k7YUFBRyxTQUFRLEVBQUMsV0FBUztNQUN4QjtLQUFBLE9BQ0QsR0FBQSxTQUFPLE9BQ0s7YUFBTCxTQUFRLEVBQUMsV0FBUzs7O1lBSXJCOzs7Ozs7RUFJUjtFQUlBLDhEQUFzQixNQUFQLFNBQUEsU0FDUTs7cUJBREQ7R0FFakIsUUFBQSxLQUFBLGVBQVUsVUFDTTtJQUFuQixVQUFJLE1BQU07R0FBQTtFQUFBO0VBR1o7RUFJQSw4REFBc0IsTUFBUCxTQUFBLFNBQ1E7O3FCQUREO0dBRWpCLFFBQUEsS0FBQSxTQUNNO0lBQVQsVUFBSSxNQUFNO0dBQUE7RUFBQTtFQUVaO0VBSUEiLCJmaWxlIjoiYXQvU2VxL1NlcS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
