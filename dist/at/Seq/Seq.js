"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../compare","./../../Function","./../../math/methods","./../../methods","./../../String","./../../Type/Kind","./../../Type/Method","./../../Type/Type","./../at","./../at-Type","./../../math/Number","./../../to-string","./../q","./../Range","./Stream"],(exports,compare_0,Function_1,methods_2,methods_3,String_4,Kind_5,Method_6,Type_7,_64_8,_64_45Type_9,Number_10,to_45string_11,_63_12,Range_13,Stream_14)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(Function_1),Pred=_ms.get(_$3,"Pred"),_$4=_ms.getModule(methods_2),_45=_ms.get(_$4,"-"),_43=_ms.get(_$4,"+"),_$5=_ms.getModule(methods_3),sub=_ms.get(_$5,"sub"),_$6=_ms.getModule(String_4),indent=_ms.get(_$6,"indent"),Kind=_ms.getDefaultExport(Kind_5),_$7=_ms.getModule(Kind_5),kind_33=_ms.get(_$7,"kind!"),self_45kind_33=_ms.get(_$7,"self-kind!"),Method=_ms.getDefaultExport(Method_6),_$8=_ms.getModule(Method_6),impl_33=_ms.get(_$8,"impl!"),_$9=_ms.getModule(Type_7),_61_62=_ms.get(_$9,"=>"),type_45of=_ms.get(_$9,"type-of"),_64=_ms.getDefaultExport(_64_8),_$10=_ms.getModule(_64_8),_43_43=_ms.get(_$10,"++"),count=_ms.get(_$10,"count"),empty_63=_ms.get(_$10,"empty?"),iterator=_ms.get(_$10,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_9),_$11=_ms.getModule(_64_45Type_9),empty=_ms.get(_$11,"empty"),from_45stream=_ms.get(_$11,"from-stream"),_$12=_ms.lazyGetModule(Number_10),Nat=_ms.lazyProp(_$12,"Nat"),to_45string=_ms.lazy(()=>_ms.getDefaultExport(to_45string_11)),_$13=_ms.lazyGetModule(_63_12),Opt_45_62_63=_ms.lazyProp(_$13,"Opt->?"),un_45_63=_ms.lazyProp(_$13,"un-?"),Range=_ms.lazy(()=>_ms.getDefaultExport(Range_13)),Stream=_ms.lazy(()=>_ms.getDefaultExport(Stream_14));
		const Seq=exports.default=new (Kind)((()=>{
			const built={};
			built.name="Seq";
			return built
		})());
		kind_33(Seq,_64);
		self_45kind_33(Seq,_64_45Type);
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
		impl_33(sub,Seq,function(n){
			const _this=this;
			_ms.checkContains(_ms.unlazy(Nat),n,"n");
			return _ms.unlazy(un_45_63)(_63nth(_this,n),_ms.lazy(()=>`No element at index ${n} for
	${indent(_ms.unlazy(to_45string)(_this))}`))
		});
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
			return new (_ms.unlazy(Range))(0,count(_))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9TZXEvU2VxLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBa0JBLDBCQUFLLEtBQUksTUFDSSxLQUFBOztjQUNaOzs7RUFFRCxRQUFNLElBQUk7RUFFVixlQUFXLElBQUk7RUFJZCxvQ0FBTSxLQUFJLFFBQ00sS0FBQTs7Y0FFZjtHQUNBLHNCQUFNO0dBQ04sNkJBQVcsa0JBQUE7VUFpU0w7c0JBalNnQjtXQUNyQixPQUFJLFVBZ1NDLE9BaFNjLE9BQUcsYUFnU2pCO0dBQUE7OztFQTdSUCwwQkFBUSxlQUFBOytCQUVGLFNBQUEsR0FBUzs7RUFFZixpQ0FBUSxLQUFJLFFBQ00sS0FBQTs7Y0FDakI7R0FDQSxzQkFBTTtHQUNOLDZCQUNXO1VBb1JMO1dBcFJMLE9Bb1JLLE1BcFJLO0dBQUE7OztFQUVaLHdCQUFPLGNBQUE7K0JBRUQsUUFBQSxHQUFROztFQUVkLCtCQUFPLEtBQUksUUFDTSxLQUFBOztjQUNoQjtHQUNBLHNCQUFNO0dBQ04sNkJBQ1c7VUF5UUw7V0F6UUwsQ0FBTyxTQXlRRiw4QkF4UWE7b0JBd1FiLE1BeFFFLElBQUcsTUF3UUwsT0F4UWlCO0lBQUE7R0FBQTs7O0VBRXhCLCtCQUFPLEtBQUksUUFDTSxLQUFBOztjQUVoQjtHQUNBLHNCQUFNO0dBQ04sNkJBQ1c7VUFnUUw7V0FoUUEsQ0FBQyxTQWdRRCxhQWhRb0IsUUFnUXBCLE1BaFErQjtHQUFBOzs7RUFFdEMsaUNBQVEsS0FBSSxRQUNNLEtBQUE7O2NBRWpCO0dBQ0Esc0JBQU07R0FDTiw2QkFDVztVQXdQTDtXQXhQQSxDQUFDLFNBd1BELGFBeFBvQixRQXdQcEIsTUF4UGdDLElBQUcsTUF3UG5DLE9BeFArQztHQUFBOzs7RUFHdEQsaUNBQVEsbUJBQUEsS0FBSztxQkFBRjtxQkFBSztHQUlmLGVBQVMsU0FBUztHQUNsQixlQUFTLFNBQVM7VUFFZjtXQUFBO0tBQUYsZUFBUztLQUNULGVBQVM7S0FFSixHQUFKLGNB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O01BRUgsT0FBQTtPQUFILG1CQUFhO09BRVQsT0FBQTtRQUFILFVBQWE7UUFDYixHQUFJLEtBQ0k7U0FBUDtRQUFBO1FBQ0QsYUFBSyxhQUFXLENBQUM7UUFDakIsR0FBSSxPQUFHLGFBQVksTUFBTSxlQUNXO1NBQW5DO1FBQUE7T0FBQTtPQUNGLEtBQVEsT0FBRyxhQUFZLE1BQU0sZUFDVztRQUF2QztPQUFBO2NBQ0U7TUFBQTtLQUFBO0lBQUE7R0FBQTtFQUFBO0VBRVIscUNBQVcsb0JBQUE7cUJBQUU7VUFFWix3QkFBVSxFQUFFLE1BQUE7RUFBQTtFQUViLHFDQUFVLEtBQUksUUFDTSxLQUFBOztjQUNuQjtHQUNBLHNCQUFNO0dBQ04sNkJBQ1c7VUFrRUw7V0FsRUosY0FBWSxNQWtFUjs7OztFQWhFUCwwQ0FBVyxLQUFJLFFBQ00sS0FBQTs7Y0FDcEI7R0FDQSxzQkFBTTtHQUNOLDZCQUNXO1VBMkRMO0lBM0RMLFVBQU0sT0FBRyxNQTJESjtXQXpETCx5QkFDYztLQUFSLFFBQUEsS0FBQSxXQUFVLFdBQVMsTUFDSTtxQkFBeEIsSUFBSTtLQUFBO0lBQUE7R0FBQTs7O0VBRVgsc0NBQVUsc0JBQUEsRUFBRTtxQkFBTztVQUlsQix5QkFDYztJQUFiLFdBQU8sU0FBQTtJQUNQLGVBQWE7SUFDYixjQUFZO0lBRVIsT0FBQTtLQUFILFVBQWE7S0FDYiw4QkFBWSxJQUFFLEVBQUU7S0FFWCxHQUFKLEtBQ0k7YUFBQSxTQUFPLEVBQUUsV0FBUztNQUNyQjtLQUFBLE9BQ0QsR0FBQSxTQUFPLE9BQ0s7YUFBUixTQUFPLEVBQUUsV0FBUzs7O1lBSWxCOzs7Ozs7RUFJUiwrQkFBSyxLQUFJLFFBQ00sS0FBQTs7Y0FDZDtHQUNBLHNCQUFNLENBQUUsSUFBRzs7O0VBRVosbUNBQU0sS0FBSSxRQUNNLEtBQUE7O2NBQ2Y7R0FDQSxzQkFDSyxLQUFBOztrQkFBRDtrQkFDRCxDQUFFLFNBQU87OztHQUNaLDZCQUFZLGtCQUFBO1VBa0JOO0lBakJBLFFBQUEsS0FBQSxlQUFVLFVBQ007S0FBcEIsVUFnQkksTUFoQks7SUFBQTtHQUFBOzs7RUFHWiwrQkFBSyxLQUFJLFFBQ00sS0FBQTs7Y0FDZDtHQUNBLHNCQUFNLENBQUUsSUFBRzs7O0VBRVosbUNBQU0sS0FBSSxRQUNNLEtBQUE7O2NBQ2Y7R0FDQSxzQkFDSyxLQUFBOztrQkFBRDtrQkFDRCxDQUFFLFNBQU87OztHQUNaLDZCQUFZLGtCQUFBO1VBRU47SUFEQSxRQUFBLEtBQUEsU0FDTTtLQUFWLFVBQUksTUFBSztJQUFBO0dBQUE7OztFQUdaLHFDQUFRLEtBQUksUUFDTSxLQUFBOztjQUNqQjtHQUNBLHNCQUFNOzs7RUFFUCxxQ0FBUSxLQUFJLFFBQ00sS0FBQTs7Y0FDakI7R0FDQSxzQkFBTSIsImZpbGUiOiJhdC9TZXEvU2VxLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
