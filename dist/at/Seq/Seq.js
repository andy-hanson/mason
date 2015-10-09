"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../Function","../../math/methods","../../methods","../../String","../../Type/Kind","../../Type/Method","../../Type/Type","../at","../at-Type","../../math/Number","../../to-string","../q","../Range","./Stream"],(exports,compare_0,Function_1,methods_2,methods_3,String_4,Kind_5,Method_6,Type_7,_64_8,_64_45Type_9,Number_10,to_45string_11,_63_12,Range_13,Stream_14)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(Function_1),Pred=_ms.get(_$3,"Pred"),_$4=_ms.getModule(methods_2),_45=_ms.get(_$4,"-"),_43=_ms.get(_$4,"+"),_$5=_ms.getModule(methods_3),freeze=_ms.get(_$5,"freeze"),sub=_ms.get(_$5,"sub"),_$6=_ms.getModule(String_4),indent=_ms.get(_$6,"indent"),Kind=_ms.getDefaultExport(Kind_5),_$7=_ms.getModule(Kind_5),kind_33=_ms.get(_$7,"kind!"),self_45kind_33=_ms.get(_$7,"self-kind!"),Method=_ms.getDefaultExport(Method_6),_$8=_ms.getModule(Method_6),impl_33=_ms.get(_$8,"impl!"),_$9=_ms.getModule(Type_7),_61_62=_ms.get(_$9,"=>"),type_45of=_ms.get(_$9,"type-of"),_64=_ms.getDefaultExport(_64_8),_$10=_ms.getModule(_64_8),_43_43=_ms.get(_$10,"++"),count=_ms.get(_$10,"count"),empty_63=_ms.get(_$10,"empty?"),iterator=_ms.get(_$10,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_9),_$11=_ms.getModule(_64_45Type_9),empty=_ms.get(_$11,"empty"),from_45stream=_ms.get(_$11,"from-stream"),_$12=_ms.lazyGetModule(Number_10),Nat=_ms.lazyProp(_$12,"Nat"),to_45string=_ms.lazy(()=>_ms.getDefaultExport(to_45string_11)),_$13=_ms.lazyGetModule(_63_12),Opt_45_62_63=_ms.lazyProp(_$13,"Opt->?"),un_45_63=_ms.lazyProp(_$13,"un-?"),Range=_ms.lazy(()=>_ms.getDefaultExport(Range_13)),Stream=_ms.lazy(()=>_ms.getDefaultExport(Stream_14));
		const Seq=exports.default=new (Kind)((()=>{
			const built={};
			built[`name`]="Seq";
			return built
		})());
		kind_33(Seq,_64);
		self_45kind_33(Seq,_64_45Type);
		const _60_43_43_126=exports["<++~"]=new (Method)((()=>{
			const built={};
			built[`name`]="<++~";
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
			built[`name`]="?first";
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
			built[`name`]="?last";
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				return (empty_63(_this)?_ms.None:_ms.some((()=>{
					return _ms.sub(_this,_45(count(_this),1))
				})()))
			};
			return built
		})());
		const tail=exports.tail=new (Method)((()=>{
			const built={};
			built[`name`]="tail";
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				return (empty_63(_this)?_this:drop(_this,1))
			};
			return built
		})());
		const rtail=exports.rtail=new (Method)((()=>{
			const built={};
			built[`name`]="rtail";
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				return (empty_63(_this)?_this:take(_this,_45(count(_this),1)))
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
			built[`name`]="?nth";
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`n`,_ms.unlazy(Nat)]);
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
		const slice_45args=(()=>{
			const built=[];
			_ms.add(built,`_`);
			_ms.add(built,[`start`,_ms.unlazy(Nat)]);
			_ms.add(built,[`end`,_ms.unlazy(Nat)]);
			return built
		})();
		const slice=exports.slice=new (Method)((()=>{
			const built={};
			built[`name`]="slice";
			const args=built.args=slice_45args;
			const _default=built.default=function _default(start,end){
				const _this=this;
				return _61_62(type_45of(_this),slice_126(_this,start,end))
			};
			return built
		})());
		const slice_126=exports["slice~"]=function slice_126(_,start,end){
			return _ms.checkContains(_64,take_126(drop_126(_,start),_45(end,start)),"res")
		};
		const take=exports.take=new (Method)((()=>{
			const built={};
			built[`name`]="take";
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`count-to-take`,_ms.unlazy(Nat)]);
				return built
			})();
			const _default=built.default=function _default(count_45to_45take){
				const _this=this;
				return _61_62(type_45of(_this),take_126(_this,count_45to_45take))
			};
			return built
		})());
		const take_126=exports["take~"]=function take_126(_,count_45to_45take){
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
		const take_45while_126=exports["take-while~"]=function take_45while_126(_,while_63){
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
		const drop=exports.drop=new (Method)((()=>{
			const built={};
			built[`name`]="drop";
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`count-to-drop`,_ms.unlazy(Nat)]);
				return built
			})();
			const _default=built.default=function _default(count_45to_45drop){
				const _this=this;
				return _61_62(type_45of(_this),drop_126(_this,count_45to_45drop))
			};
			return built
		})());
		const drop_126=exports["drop~"]=(()=>{
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
		const zip=exports.zip=function zip(_64a,_64b,zipper){
			_ms.checkContains(_64,_64a,"@a");
			_ms.checkContains(_64,_64b,"@b");
			_ms.checkContains(_ms.sub(Function,2),zipper,"zipper");
			return _61_62(type_45of(_64a),zip_126(_64a,_64b,zipper))
		};
		const zip_126=exports["zip~"]=function zip_126(_64a,_64b,zipper){
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
		const groups_45of_126=exports["groups-of~"]=function groups_45of_126(group_45size,_){
			_ms.checkContains(_ms.unlazy(Nat),group_45size,"group-size");
			return _ms.checkContains(Seq,(()=>{
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
							(yield freeze(next_45group))
						}
					})
				}
			})(),"res")
		};
		const indexes=exports.indexes=function indexes(_){
			_ms.checkContains(Seq,_,"_");
			return new (_ms.unlazy(Range))(0,count(_))
		};
		const reverse=exports.reverse=new (Method)((()=>{
			const built={};
			built[`name`]="reverse";
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				return from_45stream(Array,_this).reverse()
			};
			return built
		})());
		const reverse_126=exports["reverse~"]=new (Method)((()=>{
			const built={};
			built[`name`]="reverse~";
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				const arr=_61_62(Array,_this);
				return new (_ms.unlazy(Stream))(function*(){
					for(let _ of reverse(indexes(arr))){
						(yield _ms.sub(arr,_))
					}
				})
			};
			return built
		})());
		const split_126=exports["split~"]=function split_126(_,split_63){
			_ms.checkContains(Pred,split_63,"split?");
			return new (_ms.unlazy(Stream))(function*(){
				const iter=iterator(_);
				let prev_45idx=0;
				let cur_45idx=0;
				for(;;){
					const _$1=iter.next(),value=_$1.value,done=_$1.done;
					const next_45idx=_ms.lazy(()=>_43(1,cur_45idx));
					if(done){
						(yield slice(_,prev_45idx,cur_45idx));
						break
					} else if(split_63(value)){
						(yield slice(_,prev_45idx,cur_45idx));
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
			built[`name`]="<+!";
			const args=built.args=[`_`,`added`];
			return built
		})());
		const _60_43_43_33=exports["<++!"]=new (Method)((()=>{
			const built={};
			built[`name`]="<++!";
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`@added`,_64]);
				return built
			})();
			const _default=built.default=function _default(_64added){
				const _this=this;
				for(let _ of reverse_126(_64added)){
					_60_43_33(_this,_)
				}
			};
			return built
		})());
		const _43_62_33=exports["+>!"]=new (Method)((()=>{
			const built={};
			built[`name`]="+>!";
			const args=built.args=[`_`,`added`];
			return built
		})());
		const _43_43_62_33=exports["++>!"]=new (Method)((()=>{
			const built={};
			built[`name`]="++>!";
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`@added`,_64]);
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
			built[`name`]="?<pop!";
			const args=built.args=1;
			return built
		})());
		const _63pop_62_33=exports["?pop>!"]=new (Method)((()=>{
			const built={};
			built[`name`]="?pop>!";
			const args=built.args=1;
			return built
		})());
		const set_45nth_33=exports["set-nth!"]=new (Method)((()=>{
			const built={};
			built[`name`]="set-nth!";
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`n`,_ms.unlazy(Nat)]);
				_ms.add(built,`val`);
				return built
			})();
			return built
		})());
		const name=exports.name=`Seq`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9TZXEvU2VxLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBa0JBLDBCQUFLLEtBQUksTUFDSSxLQUFBOztTQUNaLFFBQUE7OztFQUVELFFBQU0sSUFBSTtFQUVWLGVBQVcsSUFBSTtFQUlkLG9DQUFNLEtBQUksUUFDTSxLQUFBOztTQUVmLFFBQUE7R0FDQSxzQkFBTTtHQUNOLDZCQUFXLGtCQUFBLGFBQ1k7VUFpU2pCO3NCQWxTZ0I7V0FDckIsT0FBSSxVQWlTQyxPQWpTYyxPQUFHLGFBaVNqQjtHQUFBOzs7RUE5UlAsMEJBQVEsZUFBQSxFQUNDOytCQUNILFNBQUEsR0FBUzs7RUFFZixpQ0FBUSxLQUFJLFFBQ00sS0FBQTs7U0FDakIsUUFBQTtHQUNBLHNCQUFNO0dBQ04sNkJBQ1csbUJBQUE7VUFxUkw7V0FyUkwsT0FxUkssTUFyUks7R0FBQTs7O0VBRVosd0JBQU8sY0FBQSxFQUNDOytCQUNGLFFBQUEsR0FBUTs7RUFFZCwrQkFBTyxLQUFJLFFBQ00sS0FBQTs7U0FDaEIsUUFBQTtHQUNBLHNCQUFNO0dBQ04sNkJBQ1csbUJBQUE7VUEwUUw7V0ExUUwsQ0FBTyxTQTBRRiw4QkF6UWE7b0JBeVFiLE1BelFFLElBQUcsTUF5UUwsT0F6UWlCO0lBQUE7R0FBQTs7O0VBRXhCLHdCQUFNLEtBQUksUUFDTSxLQUFBOztTQUVmLFFBQUE7R0FDQSxzQkFBTTtHQUNOLDZCQUNXLG1CQUFBO1VBaVFMO1dBalFBLENBQUMsU0FpUUQsYUFqUW9CLEtBaVFwQixNQWpROEI7R0FBQTs7O0VBRXJDLDBCQUFPLEtBQUksUUFDTSxLQUFBOztTQUVoQixRQUFBO0dBQ0Esc0JBQU07R0FDTiw2QkFDVyxtQkFBQTtVQXlQTDtXQXpQQSxDQUFDLFNBeVBELGFBelBvQixLQXlQcEIsTUF6UCtCLElBQUcsTUF5UGxDLE9BelA4QztHQUFBOzs7RUFHckQsaUNBQVEsbUJBQUEsS0FBSyxLQUNJO3FCQUROO3FCQUFL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
