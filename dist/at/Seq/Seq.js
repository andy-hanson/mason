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
					if(next_45a.done){
						return next_45b.done
					} else if(next_45b.done){
						return false
					} else if(_61_63(next_45a.value,next_45b.value)){} else {
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
				for(let elem of _this){
					{
						const _=elem;
						if(_61_63(i,n)){
							return _
						} else {
							i=_43(1,i)
						}
					}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9TZXEvU2VxLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBZ0JBLDBCQUFVLEtBR1A7MkJBSE87Z0JBS1QsTUFBSztXQWlQQzs7aUNBL09DLE9BK09ELE1BL09XLGdCQUNmLHVCQUFxQixVQUNuQiwrQkE2T0U7OztHQW5QTCxlQUFXLEVBQUU7OztFQVVkLHFFQUF5QixNQUFYLFNBQUE7U0F5T1I7cUJBek9tQjtVQUd4QixPQUFJLFVBc09DLE9BdE9jLE9BQUcsYUFzT2pCO0VBQUE7RUFuT04sMEJBQVEsZUFBQTsrQkFFRixTQUFBLEdBQVM7O0VBRWYsd0RBQ2dCO1NBOE5WO1VBN05MLE9BNk5LLE1BN05LO0VBQUE7RUFFWCx3QkFBTyxjQUFBOytCQUVELFFBQUEsR0FBUTs7RUFFZCxxREFDZTtTQXNOVDtVQXJOTCxDQUFPLFNBcU5GLDhCQXBOYTttQkFvTmIsTUFwTkUsSUFBRyxNQW9OTCxPQXBOaUI7R0FBQTtFQUFBO0VBRXZCLHFEQUNlO1NBaU5UO1VBL01BLENBQUMsU0ErTUQsYUEvTW9CLFFBK01wQixNQS9NK0I7RUFBQTtFQUVyQyx3REFDZ0I7U0E0TVY7VUExTUEsQ0FBQyxTQTBNRCxhQTFNb0IsUUEwTXBCLE1BMU1nQyxJQUFHLE1BME1uQyxPQTFNK0M7RUFBQTtFQUdyRCxpQ0FBUSxtQkFBQSxLQUFLO3FCQUFGO3FCQUFLO0dBSWYsZUFBUyxTQUFTO0dBQ2xCLGVBQVMsU0FBUztVQUVmO1dBQUE7S0FBRixlQUFTO0tBQ1QsZUFBUztLQUVMLEdBQUgsY0FDVztNQUFWLE9BQU07WUFDUCxHQUFBLGNBQ1c7TUFBVixPQUFNO0tBQUEsT0FDUCxHQUFBLE9BQUcsZUFBYSxnQkFDWSxRQUV4QjtNQUFILE9BQU07S0FBQTtJQUFBO0dBQUE7RUFBQTtFQUVWLHVFQUFjLFNBQUE7U0FvTFI7O0dBakxMLE1BQU07bUNBRUs7WUFBQSxRQStLTixNQTlLa0I7S0FBakI7TUFBQSxRQUFBO01BQ0osR0FBQSxPQUFHLEVBQUUsR0FDQztPQUFMLE9BQU07TUFBQSxPQUVIO1NBQ0UsSUFBRSxFQUFFO01BQUE7S0FBQTtJQUFBO0dBQUE7RUFBQTtFQUdiLHlHQUFnQixTQUFBLE1BQVU7U0FzS3BCOzs7VUFsS0wsT0FBSSxVQWtLQyxPQWxLYyxhQWtLZCxNQWxLMkIsTUFBTTtFQUFBO0VBRXZDLHNDQUFVLHNCQUFHLEVBQUUsTUFBTTs0QkFBVixJQUVWLFlBQVEsWUFBTyxFQUFFLE9BQVEsSUFBRSxJQUFJOztFQUVoQyxzRkFBZSxTQUFBO1NBNEpUOztVQTFKTCxPQUFJLFVBMEpDLE9BMUpjLFlBMEpkLE1BMUowQjtFQUFBO0VBRWhDLG9DQUFTLHFCQUFBLEVBQUU7O1VBSU47SUFBSCxHQUFBLE9BQUcsRUFBRSxtQkFDYTtZQUFqQjtXQUVHO1lBQ0gseUJBQ2M7TUFBYixNQUFNO01BQ0YsUUFBQSxRQUFRLEVBQ0M7Y0FBVDtTQUNFLElBQUUsRUFBRTtPQUNULEdBQUcsT0FBRyxFQUFFLEdBQ0M7UUFBUjtPQUFBO01BQUE7S0FBQTtJQUFBO0dBQUE7RUFBQTtFQUdOLGtEQUFlLDZCQUFBLEVBQUU7cUJBQU87VUFHdkIseUJBQ2M7SUFBVCxRQUFBLFFBQVEsRUFDQztLQUFaLEtBQU8sU0FBTyxNQUNJO01BQWpCO0tBQUE7WUFDRTtJQUFBO0dBQUE7RUFBQTtFQUVOLHNGQUFlLFNBQUE7U0E4SFQ7O1VBNUhMLE9BQUksVUE0SEMsT0E1SGMsWUE0SGQsTUE1SDBCO0VBQUE7RUFFaEMsb0NBQ08sS0FBQTtVQUNMLENBQUEsRUFBRTtXQUVGLHlCQUNjO0tBQWIsV0FBTyxTQUFBO0tBQ1AsTUFBTTtLQUVILE9BQUE7TUFBRixHQUFHLE9BQUcsRUFBRSxtQkFDYTtPQUFwQjtNQUFBO01BQ0QsR0FBRyxpQkFDZ0I7T0FBbEI7TUFBQTtRQUNJLElBQUUsRUFBRTtLQUFBO2FBQ047SUFBQTtHQUFBO0VBQUE7RUFLUCw2QkFBTyxnQkFBQSxLQUFLLEtBQUs7cUJBQVA7cUJBQUs7NkJBQVMsU0FBUztVQUdoQyxPQUFJLFVBQVEsTUFBSyxXQUFNLEtBQUcsS0FBRztFQUFBO0VBRTlCLGtDQUFRLG9CQUFBLEtBQUssS0FBSztxQkFBUDtxQkFBSzs2QkFBUyxTQUFTO1VBS2pDLHlCQUNjO0lBQWIsZUFBUyxTQUFTO0lBQ2xCLGVBQVMsU0FBUztJQUVmLE9BQUE7S0FBRixlQUFTO0tBQ1QsR0FBRyxjQUNXO01BQWI7S0FBQTtLQUNELGVBQVM7S0FDVCxHQUFHLGNBQ1c7TUFBYjtLQUFBO1lBQ0UsT0FBTyxlQUFhOzs7O0VBRzFCLGdEQUFjLDRCQUFBLGFBQWU7O1VBR3hCO0lBQUgsR0FBQSxPQUFHLGFBQVcsR0FDQztZQUNkLHlCQUNjO01BQ1YsT0FBQTtjQUFDO01BQUE7S0FBQTtJQUFBLE9BRUY7WUFDSCx5QkFDYztNQUFiLFdBQU8sU0FBQTtNQUVKLE9BQUE7T0FBRixtQkFBYTtPQUVWLE9BQUE7UUFBRixVQUFhO1FBQ2IsR0FBRyxLQUNJO1NBQU47UUFBQTtRQUNELGFBQUssYUFBVyxDQUFDO1FBQ2pCLEdBQUcsT0FBRyxhQUFZLE1BQU0sZUFDVztTQUFsQztRQUFBO09BQUE7T0FDRixLQUFPLE9BQUcsYUFBWSxNQUFNLGVBQ1c7UUFBdEM7T0FBQTtjQUNFO01BQUE7S0FBQTtJQUFBO0dBQUE7RUFBQTtFQUVSLHFDQUFXLG9CQUFBO3FCQUFFO29CQUVaLEVBQUksTUFBQTs7RUFFTCw4REFDa0I7U0FtRFo7VUFsREosY0FBWSxNQWtEUjs7RUFoRE4sb0VBQ21CO1NBK0NiO0dBL0NMLFVBQU0sT0FBRyxNQStDSjtVQTdDTCx5QkFDYztJQUFULFFBQUEsS0FBQSxXQUFVLFdBQVMsTUFDSTtvQkFBdkIsSUFBSTtJQUFBO0dBQUE7RUFBQTtFQUVWLHNDQUFVLHNCQUFBLEVBQUU7cUJBQU87VUFJbEIseUJBQ2M7SUFBYixXQUFPLFNBQUE7SUFDUCxlQUFhO0lBQ2IsY0FBWTtJQUVULE9BQUE7S0FBRixVQUFhO0tBQ2IsOEJBQVksSUFBRSxFQUFFO0tBRVosR0FBSCxLQUNJO2FBQUEsU0FBTyxFQUFFLFdBQVM7TUFDckI7S0FBQSxPQUNELEdBQUEsU0FBTyxPQUNLO2FBQVIsU0FBTyxFQUFFLFdBQVM7OztZQUlsQjs7Ozs7O0VBSVI7RUFJQSxnRUFBc0IsTUFBUCxTQUFBO1NBYVQ7cUJBYmdCO0dBRWpCLFFBQUEsS0FBQSxlQUFVLFVBQ007SUFBbkIsVUFVSSxNQVZLO0dBQUE7RUFBQTtFQUdYO0VBSUEsZ0VBQXNCLE1BQVAsU0FBQTtTQUdUO3FCQUhnQjtHQUVqQixRQUFBLEtBQUEsU0FDTTtJQUFULFVBQUksTUFBSztHQUFBO0VBQUE7RUFFWDtFQUlBIiwiZmlsZSI6ImF0L1NlcS9TZXEuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
