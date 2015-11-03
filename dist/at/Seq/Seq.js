"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../compare","./../../Function","./../../math/methods","./../../methods","./../../String","./../../Type/Kind","./../../Type/Method","./../../Type/Type","./../at","./../at-Type","./../../math/Number","./../../to-string","./../q","./Stream"],(exports,compare_0,Function_1,methods_2,methods_3,String_4,Kind_5,Method_6,Type_7,_64_8,_64_45Type_9,Number_10,to_45string_11,_63_12,Stream_13)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(Function_1),Pred=_ms.get(_$3,"Pred"),_$4=_ms.getModule(methods_2),_45=_ms.get(_$4,"-"),_43=_ms.get(_$4,"+"),_$5=_ms.getModule(methods_3),sub=_ms.get(_$5,"sub"),_$6=_ms.getModule(String_4),indent=_ms.get(_$6,"indent"),_$7=_ms.getModule(Kind_5),self_45kind_33=_ms.get(_$7,"self-kind!"),Method=_ms.getDefaultExport(Method_6),_$8=_ms.getModule(Type_7),_61_62=_ms.get(_$8,"=>"),type_45of=_ms.get(_$8,"type-of"),_64=_ms.getDefaultExport(_64_8),_$9=_ms.getModule(_64_8),_43_43=_ms.get(_$9,"++"),count=_ms.get(_$9,"count"),empty_63=_ms.get(_$9,"empty?"),iterator=_ms.get(_$9,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_9),_$10=_ms.getModule(_64_45Type_9),empty=_ms.get(_$10,"empty"),from_45stream=_ms.get(_$10,"from-stream"),_$11=_ms.lazyGetModule(Number_10),Nat=_ms.lazyProp(_$11,"Nat"),to_45string=_ms.lazy(()=>_ms.getDefaultExport(to_45string_11)),_$12=_ms.lazyGetModule(_63_12),Opt_45_62_63=_ms.lazyProp(_$12,"Opt->?"),un_45_63=_ms.lazyProp(_$12,"un-?"),Stream=_ms.lazy(()=>_ms.getDefaultExport(Stream_13));
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
		const _60_43_43_126=exports["<++~"]=new (Method)((()=>{
			const built={};
			built.name="<++~";
			const args=built.args=2;
			const _default=built.default=function _default(left_45added){
				const _this=this;
				_ms.checkContains(_64,left_45added,"left-added");
				return _61_62(type_45of(_this),_43_43(left_45added,_this))
			};
			return built
		})());
		const first=exports.first=function first(_){
			return _ms.unlazy(un_45_63)(_63first(_),`Can not take first of empty.`)
		};
		const _63first=exports["?first"]=new (Method)((()=>{
			const built={};
			built.name="?first";
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				return _63nth(_this,0)
			};
			return built
		})());
		const last=exports.last=function last(_){
			return _ms.unlazy(un_45_63)(_63last(_),`Can not take last of empty.`)
		};
		const _63last=exports["?last"]=new (Method)((()=>{
			const built={};
			built.name="?last";
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				return (empty_63(_this)?_ms.None:_ms.some((()=>{
					return _ms.sub(_this,_45(count(_this),1))
				})()))
			};
			return built
		})());
		const _64tail=exports["@tail"]=new (Method)((()=>{
			const built={};
			built.name="@tail";
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				return (empty_63(_this)?_this:_64drop(_this,1))
			};
			return built
		})());
		const _64rtail=exports["@rtail"]=new (Method)((()=>{
			const built={};
			built.name="@rtail";
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				return (empty_63(_this)?_this:_64take(_this,_45(count(_this),1)))
			};
			return built
		})());
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
		const _63nth=exports["?nth"]=new (Method)((()=>{
			const built={};
			built.name="?nth";
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,"_");
				_ms.add(built,["n",_ms.unlazy(Nat)]);
				return built
			})();
			const _default=built.default=function _default(n){
				const _this=this;
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
			};
			return built
		})());
		const _64slice=exports["@slice"]=new (Method)((()=>{
			const built={};
			built.name="@slice";
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,"_");
				_ms.add(built,["start",_ms.unlazy(Nat)]);
				_ms.add(built,["end",_ms.unlazy(Nat)]);
				return built
			})();
			const _default=built.default=function _default(start,end){
				const _this=this;
				return _61_62(type_45of(_this),_64slice_126(_this,start,end))
			};
			return built
		})());
		const _64slice_126=exports["@slice~"]=function _64slice_126(_,start,end){
			return _ms.checkContains(_64,_64take_126(_64drop_126(_,start),_45(end,start)),"returned value")
		};
		const _64take=exports["@take"]=new (Method)((()=>{
			const built={};
			built.name="@take";
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,"_");
				_ms.add(built,["count-to-take",_ms.unlazy(Nat)]);
				return built
			})();
			const _default=built.default=function _default(count_45to_45take){
				const _this=this;
				return _61_62(type_45of(_this),_64take_126(_this,count_45to_45take))
			};
			return built
		})());
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
		const _64drop=exports["@drop"]=new (Method)((()=>{
			const built={};
			built.name="@drop";
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,"_");
				_ms.add(built,["count-to-drop",_ms.unlazy(Nat)]);
				return built
			})();
			const _default=built.default=function _default(count_45to_45drop){
				const _this=this;
				return _61_62(type_45of(_this),_64drop_126(_this,count_45to_45drop))
			};
			return built
		})());
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
		const _64reverse=exports["@reverse"]=new (Method)((()=>{
			const built={};
			built.name="@reverse";
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				return from_45stream(Array,_this).reverse()
			};
			return built
		})());
		const _64reverse_126=exports["@reverse~"]=new (Method)((()=>{
			const built={};
			built.name="@reverse~";
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				const arr=_61_62(Array,_this);
				return new (_ms.unlazy(Stream))(function*(){
					for(let _ of _64reverse(_64indexes(arr))){
						(yield _ms.sub(arr,_))
					}
				})
			};
			return built
		})());
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
		const _60_43_33=exports["<+!"]=new (Method)((()=>{
			const built={};
			built.name="<+!";
			const args=built.args=["_","added"];
			return built
		})());
		const _60_43_43_33=exports["<++!"]=new (Method)((()=>{
			const built={};
			built.name="<++!";
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,"_");
				_ms.add(built,["@added",_64]);
				return built
			})();
			const _default=built.default=function _default(_64added){
				const _this=this;
				for(let _ of _64reverse_126(_64added)){
					_60_43_33(_this,_)
				}
			};
			return built
		})());
		const _43_62_33=exports["+>!"]=new (Method)((()=>{
			const built={};
			built.name="+>!";
			const args=built.args=["_","added"];
			return built
		})());
		const _43_43_62_33=exports["++>!"]=new (Method)((()=>{
			const built={};
			built.name="++>!";
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,"_");
				_ms.add(built,["@added",_64]);
				return built
			})();
			const _default=built.default=function _default(_64added){
				const _this=this;
				for(let _ of _64added){
					_43_62_33(_this,_)
				}
			};
			return built
		})());
		const _63_60pop_33=exports["?<pop!"]=new (Method)((()=>{
			const built={};
			built.name="?<pop!";
			const args=built.args=1;
			return built
		})());
		const _63pop_62_33=exports["?pop>!"]=new (Method)((()=>{
			const built={};
			built.name="?pop>!";
			const args=built.args=1;
			return built
		})());
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9TZXEvU2VxLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBaUJBLDBCQUFVLEtBR1A7MkJBSE87Z0JBS1QsTUFBSztXQXdTRTs7aUNBdFNBLE9Bc1NBLE1BdFNVLGdCQUNmLHVCQUFxQixVQUNuQiwrQkFvU0c7OztHQTFTTixlQUFXLEVBQUU7OztFQVVkLG9DQUFNLEtBQUksUUFDTSxLQUFBOztjQUVmO0dBQ0Esc0JBQU07R0FDTiw2QkFBVyxrQkFBQTtVQTJSTDtzQkEzUmdCO1dBQ3JCLE9BQUksVUEwUkMsT0ExUmMsT0FBRyxhQTBSakI7R0FBQTs7O0VBdlJQLDBCQUFRLGVBQUE7K0JBRUYsU0FBQSxHQUFTOztFQUVmLGlDQUFRLEtBQUksUUFDTSxLQUFBOztjQUNqQjtHQUNBLHNCQUFNO0dBQ04sNkJBQ1c7VUE4UUw7V0E5UUwsT0E4UUssTUE5UUs7R0FBQTs7O0VBRVosd0JBQU8sY0FBQTsrQkFFRCxRQUFBLEdBQVE7O0VBRWQsK0JBQU8sS0FBSSxRQUNNLEtBQUE7O2NBQ2hCO0dBQ0Esc0JBQU07R0FDTiw2QkFDVztVQW1RTDtXQW5RTCxDQUFPLFNBbVFGLDhCQWxRYTtvQkFrUWIsTUFsUUUsSUFBRyxNQWtRTCxPQWxRaUI7SUFBQTtHQUFBOzs7RUFFeEIsK0JBQU8sS0FBSSxRQUNNLEtBQUE7O2NBRWhCO0dBQ0Esc0JBQU07R0FDTiw2QkFDVztVQTBQTDtXQTFQQSxDQUFDLFNBMFBELGFBMVBvQixRQTBQcEIsTUExUCtCO0dBQUE7OztFQUV0QyxpQ0FBUSxLQUFJLFFBQ00sS0FBQTs7Y0FFakI7R0FDQSxzQkFBTTtHQUNOLDZCQUNXO1VBa1BMO1dBbFBBLENBQUMsU0FrUEQsYUFsUG9CLFFBa1BwQixNQWxQZ0MsSUFBRyxNQWtQbkMsT0FsUCtDO0dBQUE7OztFQUd0RCxpQ0FBUSxtQkFBQSxLQUFLO3FCQUFGO3FCQUFLO0dBSWYsZUFBUyxTQUFTO0dBQ2xCLGVBQVMsU0FBUztV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QUFhO1FBQ2IsR0FBRyxLQUNJO1NBQU47UUFBQTtRQUNELGFBQUssYUFBVyxDQUFDO1FBQ2pCLEdBQUcsT0FBRyxhQUFZLE1BQU0sZUFDVztTQUFsQztRQUFBO09BQUE7T0FDRixLQUFPLE9BQUcsYUFBWSxNQUFNLGVBQ1c7UUFBdEM7T0FBQTtjQUNFO01BQUE7S0FBQTtJQUFBO0dBQUE7RUFBQTtFQUVSLHFDQUFXLG9CQUFBO3FCQUFFO29CQUVaLEVBQUksTUFBQTs7RUFFTCxxQ0FBVSxLQUFJLFFBQ00sS0FBQTs7Y0FDbkI7R0FDQSxzQkFBTTtHQUNOLDZCQUNXO1VBa0VMO1dBbEVKLGNBQVksTUFrRVI7Ozs7RUFoRVAsMENBQVcsS0FBSSxRQUNNLEtBQUE7O2NBQ3BCO0dBQ0Esc0JBQU07R0FDTiw2QkFDVztVQTJETDtJQTNETCxVQUFNLE9BQUcsTUEyREo7V0F6REwseUJBQ2M7S0FBVCxRQUFBLEtBQUEsV0FBVSxXQUFTLE1BQ0k7cUJBQXZCLElBQUk7S0FBQTtJQUFBO0dBQUE7OztFQUVYLHNDQUFVLHNCQUFBLEVBQUU7cUJBQU87VUFJbEIseUJBQ2M7SUFBYixXQUFPLFNBQUE7SUFDUCxlQUFhO0lBQ2IsY0FBWTtJQUVULE9BQUE7S0FBRixVQUFhO0tBQ2IsOEJBQVksSUFBRSxFQUFFO0tBRVosR0FBSCxLQUNJO2FBQUEsU0FBTyxFQUFFLFdBQVM7TUFDckI7S0FBQSxPQUNELEdBQUEsU0FBTyxPQUNLO2FBQVIsU0FBTyxFQUFFLFdBQVM7OztZQUlsQjs7Ozs7O0VBSVIsK0JBQUssS0FBSSxRQUNNLEtBQUE7O2NBQ2Q7R0FDQSxzQkFBTSxDQUFFLElBQUc7OztFQUVaLG1DQUFNLEtBQUksUUFDTSxLQUFBOztjQUNmO0dBQ0Esc0JBQ0ssS0FBQTs7a0JBQUQ7a0JBQ0QsQ0FBRSxTQUFPOzs7R0FDWiw2QkFBWSxrQkFBQTtVQWtCTjtJQWpCRCxRQUFBLEtBQUEsZUFBVSxVQUNNO0tBQW5CLFVBZ0JJLE1BaEJLO0lBQUE7R0FBQTs7O0VBR1osK0JBQUssS0FBSSxRQUNNLEtBQUE7O2NBQ2Q7R0FDQSxzQkFBTSxDQUFFLElBQUc7OztFQUVaLG1DQUFNLEtBQUksUUFDTSxLQUFBOztjQUNmO0dBQ0Esc0JBQ0ssS0FBQTs7a0JBQUQ7a0JBQ0QsQ0FBRSxTQUFPOzs7R0FDWiw2QkFBWSxrQkFBQTtVQUVOO0lBREQsUUFBQSxLQUFBLFNBQ007S0FBVCxVQUFJLE1BQUs7SUFBQTtHQUFBOzs7RUFHWixxQ0FBUSxLQUFJLFFBQ00sS0FBQTs7Y0FDakI7R0FDQSxzQkFBTTs7O0VBRVAscUNBQVEsS0FBSSxRQUNNLEtBQUE7O2NBQ2pCO0dBQ0Esc0JBQU0iLCJmaWxlIjoiYXQvU2VxL1NlcS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
