"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../Function","../../math/methods","../../methods","../../String","../../Type/Kind","../../Type/Method","../../Type/Type","../at","../at-Type","../../math/Number","../../to-string","../q","../Range","./Stream","../../compare","../../Try","../q"],(exports,compare_0,Function_1,methods_2,methods_3,String_4,Kind_5,Method_6,Type_7,_64_8,_64_45Type_9,Number_10,to_45string_11,_63_12,Range_13,Stream_14,compare_15,Try_16,_63_17)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(Function_1),Pred=_ms.get(_$3,"Pred"),_$4=_ms.getModule(methods_2),_45=_ms.get(_$4,"-"),_43=_ms.get(_$4,"+"),_$5=_ms.getModule(methods_3),freeze=_ms.get(_$5,"freeze"),sub=_ms.get(_$5,"sub"),_$6=_ms.getModule(String_4),indent=_ms.get(_$6,"indent"),Kind=_ms.getDefaultExport(Kind_5),_$7=_ms.getModule(Kind_5),kind_33=_ms.get(_$7,"kind!"),self_45kind_33=_ms.get(_$7,"self-kind!"),Method=_ms.getDefaultExport(Method_6),_$8=_ms.getModule(Method_6),impl_33=_ms.get(_$8,"impl!"),_$9=_ms.getModule(Type_7),_61_62=_ms.get(_$9,"=>"),type_45of=_ms.get(_$9,"type-of"),_64=_ms.getDefaultExport(_64_8),_$10=_ms.getModule(_64_8),_43_43=_ms.get(_$10,"++"),count=_ms.get(_$10,"count"),empty_63=_ms.get(_$10,"empty?"),iterator=_ms.get(_$10,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_9),_$11=_ms.getModule(_64_45Type_9),empty=_ms.get(_$11,"empty"),from_45stream=_ms.get(_$11,"from-stream"),_$13=_ms.lazyGetModule(Number_10),Nat=_ms.lazyProp(_$13,"Nat"),to_45string=_ms.lazy(()=>{
			return _ms.getDefaultExport(to_45string_11)
		}),_$15=_ms.lazyGetModule(_63_12),Opt_45_62_63=_ms.lazyProp(_$15,"Opt->?"),un_45_63=_ms.lazyProp(_$15,"un-?"),Range=_ms.lazy(()=>{
			return _ms.getDefaultExport(Range_13)
		}),Stream=_ms.lazy(()=>{
			return _ms.getDefaultExport(Stream_14)
		}),_$19=_ms.lazyGetModule(compare_15),_60_63=_ms.lazyProp(_$19,"<?"),_$20=_ms.lazyGetModule(Try_16),fails_63=_ms.lazyProp(_$20,"fails?"),_$21=_ms.lazyGetModule(_63_17),_63some=_ms.lazyProp(_$21,"?some"),_63None=_ms.lazyProp(_$21,"?None");
		const Seq=new (Kind)((()=>{
			const built={};
			const doc=built.doc=`@ whose values are in a meaningful order.`;
			return _ms.setName(built,"Seq")
		})());
		kind_33(Seq,_64);
		self_45kind_33(Seq,_64_45Type);
		const _60_43_43_39=exports["<++'"]=new (Method)((()=>{
			const built={};
			const doc=built.doc=`TODO:REST\n(There is no \`++>'\` because \`++\` by default adds to the right for Seqs.)`;
			const test=built.test=function test(){};
			const args=built.args=2;
			const _default=built.default=function _default(left_45added){
				const _this=this;
				_ms.checkContains(_64,left_45added,"left-added");
				return _61_62(type_45of(_this),_43_43(left_45added,_this))
			};
			return _ms.setName(built,"<++'")
		})());
		const first=exports.first=(()=>{
			const built={};
			const doc=built.doc=`First value in iteration order.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2]],1);
				_ms.assert(_ms.unlazy(fails_63),()=>{
					return first([])
				});
				return built
			};
			return _ms.set(function first(_){
				return _ms.unlazy(un_45_63)(_63first(_),`Can not take first of empty.`)
			},built)
		})();
		const _63first=exports["?first"]=new (Method)((()=>{
			const built={};
			const doc=built.doc=`First value in iteration order, if non-empty.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2]],_ms.unlazy(_63some)(1));
				_ms.assoc(built,[[]],_ms.unlazy(_63None));
				return built
			};
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				return _63nth(_this,0)
			};
			return _ms.setName(built,"?first")
		})());
		const last=exports.last=(()=>{
			const built={};
			const doc=built.doc=`Last value in iteration order.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2]],2);
				_ms.assert(_ms.unlazy(fails_63),()=>{
					return last([])
				});
				return built
			};
			const args=built.args=1;
			return _ms.set(function last(_){
				return _ms.unlazy(un_45_63)(_63last(_),`Can not take last of empty.`)
			},built)
		})();
		const _63last=exports["?last"]=new (Method)((()=>{
			const built={};
			const doc=built.doc=`Last value in iteration order, if non-empty.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2]],_ms.unlazy(_63some)(2));
				_ms.assoc(built,[[]],_ms.unlazy(_63None));
				return built
			};
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				return empty_63(_this)?_ms.None:_ms.some((()=>{
					return _ms.sub(_this,_45(count(_this),1))
				})())
			};
			return _ms.setName(built,"?last")
		})());
		const tail=exports.tail=new (Method)((()=>{
			const built={};
			const doc=built.doc=`All elements but the first.\nTODO: Eager for Linked-Lists.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2]],[2]);
				_ms.assoc(built,[[]],[]);
				return built
			};
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				return (()=>{
					const _=_this;
					if(empty_63(_)){
						return _
					} else {
						return drop(_,1)
					}
				})()
			};
			return _ms.setName(built,"tail")
		})());
		const rtail=exports.rtail=new (Method)((()=>{
			const built={};
			const doc=built.doc=`All elements but the last.\nTODO: Eager for finger trees.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2]],[1]);
				_ms.assoc(built,[[]],[]);
				return built
			};
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				return (()=>{
					const _=_this;
					if(empty_63(_)){
						return _
					} else {
						return take(_,_45(count(_),1))
					}
				})()
			};
			return _ms.setName(built,"rtail")
		})());
		const seq_61_63=exports["seq=?"]=(()=>{
			const built={};
			const doc=built.doc=`Whether two @s share the same elements in the same order.\nThe types of the @s do not matter.\nEquivalent to \`=? (=> Array @a) (=> Array @b)\`, but may not have to fully unlazy both.`;
			const test=built.test=function test(){
				const s=new (_ms.unlazy(Stream))(function*(){
					(yield 1)
				});
				_ms.assert(seq_61_63,s,[1]);
				_ms.assertNot(seq_61_63,s,[2])
			};
			return _ms.set(function seq_61_63(_64a,_64b){
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
			},built)
		})();
		const _63nth=exports["?nth"]=new (Method)((()=>{
			const built={};
			const doc=built.doc=`|_ n:Nat\n\`n\`th element in iteration order, if there are at least that many values.\n0th is the first."`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[0,1],1],_ms.unlazy(_63some)(1));
				_ms.assoc(built,[[0,1],2],_ms.unlazy(_63None));
				return built
			};
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
			return _ms.setName(built,"?nth")
		})());
		impl_33(sub,Seq,(()=>{
			const built={};
			const doc=built.doc=`Nth value in iteration order.`;
			const test=built.test=function test(){
				_ms.assert(_61_63,_ms.sub([0,1],1),1);
				_ms.assert(_ms.unlazy(fails_63),()=>{
					return _ms.sub([0,1],2)
				})
			};
			return _ms.set(function(n){
				const _this=this;
				_ms.checkContains(_ms.unlazy(Nat),n,"n");
				return _ms.unlazy(un_45_63)(_63nth(_this,n),_ms.lazy(()=>{
					return `No element at index ${n} for\n\t${indent(_ms.unlazy(to_45string)(_this))}`
				}))
			},built)
		})());
		const slice_45args=(()=>{
			const built=[];
			_ms.add(built,`_`);
			_ms.add(built,[`start`,_ms.unlazy(Nat)]);
			_ms.add(built,[`end`,_ms.unlazy(Nat)]);
			return built
		})();
		const slice=exports.slice=new (Method)((()=>{
			const built={};
			const doc=built.doc=`The elements from index start (inclusive) to end (exclusive).\nTakes as much as possible.\nResult length should be - end start, unless \`end\` was past the end.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[0,1,2,3],1,3],[1,2]);
				return built
			};
			const args=built.args=slice_45args;
			const _default=built.default=function _default(start,end){
				const _this=this;
				return _61_62(type_45of(_this),slice_39(_this,start,end))
			};
			return _ms.setName(built,"slice")
		})());
		const slice_39=exports["slice'"]=(()=>{
			const built={};
			const doc=built.doc=`Lazy slice.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[0,1,2,3],1,3],_61_62(_ms.unlazy(Stream),[1,2]));
				return built
			};
			const args=built.args=slice_45args;
			return _ms.set(function slice_39(_,start,end){
				return _ms.checkContains(_64,take_39(drop_39(_,start),_45(end,start)),"res")
			},built)
		})();
		const take=exports.take=new (Method)((()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`count-to-take`,_ms.unlazy(Nat)]);
				return built
			})();
			const _default=built.default=function _default(count_45to_45take){
				const _this=this;
				return _61_62(type_45of(_this),take_39(_this,count_45to_45take))
			};
			return _ms.setName(built,"take")
		})());
		const take_39=exports["take'"]=(()=>{
			const built={};
			const doc=built.doc=`Stream including only the first count-to-take elements.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[0,1,2],2],_61_62(_ms.unlazy(Stream),[0,1]));
				_ms.assoc(built,[[0],2],_61_62(_ms.unlazy(Stream),[0]));
				const _=[0,1,2,3,4];
				_ms.assert(seq_61_63,_,_43_43(take_39(_,2),drop_39(_,2)));
				return built
			};
			return _ms.set(function take_39(_,count_45to_45take){
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
			},built)
		})();
		const take_45while_39=exports["take-while'"]=(()=>{
			const built={};
			const doc=built.doc=`Stream stopping (and not including) the first element not satisfying while?.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2,- 1,3],_ms.sub(_ms.unlazy(_60_63),0)],_61_62(_ms.unlazy(Stream),[1,2]));
				return built
			};
			return _ms.set(function take_45while_39(_,while_63){
				_ms.checkContains(Pred,while_63,"while?");
				return new (_ms.unlazy(Stream))(function*(){
					for(let elem of _){
						if(! while_63(elem)){
							break
						};
						(yield elem)
					}
				})
			},built)
		})();
		const drop=exports.drop=new (Method)((()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`count-to-drop`,_ms.unlazy(Nat)]);
				return built
			})();
			const _default=built.default=function _default(count_45to_45drop){
				const _this=this;
				return _61_62(type_45of(_this),drop_39(_this,count_45to_45drop))
			};
			return _ms.setName(built,"drop")
		})());
		const drop_39=exports["drop'"]=(()=>{
			const built={};
			const doc=built.doc=`Stream without the first count-to-drop elements.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[0,1,2,3],2],_61_62(_ms.unlazy(Stream),[2,3]));
				return built
			};
			return _ms.set(function drop_39(_,count_45to_45drop){
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
			},built)
		})();
		const zip=exports.zip=(()=>{
			const built={};
			const doc=built.doc=`Type-preserving zip.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2],[10,20],_43],[11,22]);
				return built
			};
			return _ms.set(function zip(_64a,_64b,zipper){
				_ms.checkContains(_64,_64a,"@a");
				_ms.checkContains(_64,_64b,"@b");
				_ms.checkContains(_ms.sub(Function,2),zipper,"zipper");
				return _61_62(type_45of(_64a),zip_39(_64a,_64b,zipper))
			},built)
		})();
		const zip_39=exports["zip'"]=(()=>{
			const built={};
			const doc=built.doc=`Seq of zipper applied to corresponding elements of @a and @b.\nEnds as soon as either of them does, discarding extra elements.\n(Corresponding means: with the same index.)`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2],[10,20,30],_43],_61_62(_ms.unlazy(Stream),[11,22]));
				return built
			};
			return _ms.set(function zip_39(_64a,_64b,zipper){
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
			},built)
		})();
		const groups_45of_39=exports["groups-of'"]=(()=>{
			const built={};
			const doc=built.doc=`Seq of consecutive groups of \`group-size\` elements.`;
			const test=built.test=function test(){
				_ms.assert(seq_61_63,[[1,2],[3,4]],groups_45of_39(2,[1,2,3,4]));
				_ms.assert(seq_61_63,[[1,2,3]],groups_45of_39(3,[1,2,3,4]));
				_ms.assert(seq_61_63,[[],[],[]],take_39(groups_45of_39(0,[1]),3))
			};
			return _ms.set(function groups_45of_39(group_45size,_){
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
									const _$317=iter.next(),value=_$317.value,done=_$317.done;
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
			},built)
		})();
		const indexes=exports.indexes=(()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[0,0,0]],new (_ms.unlazy(Range))(0,3));
				return built
			};
			return _ms.set(function indexes(_){
				_ms.checkContains(Seq,_,"_");
				return new (_ms.unlazy(Range))(0,count(_))
			},built)
		})();
		const reverse_39=exports["reverse'"]=new (Method)((()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){};
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
			return _ms.setName(built,"reverse'")
		})());
		const reverse=exports.reverse=new (Method)((()=>{
			const built={};
			const doc=built.doc=`Seq with the opposite order.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2]],[2,1]);
				return built
			};
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				return from_45stream(Array,_this).reverse()
			};
			return _ms.setName(built,"reverse")
		})());
		const split_39=exports["split'"]=(()=>{
			const built={};
			const doc=built.doc=`Subseqs separated by elements where split? is true.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,0,1],_ms.sub(_61_63,0)],_61_62(_ms.unlazy(Stream),[[1],[1]]));
				_ms.assoc(built,[[0],_ms.sub(_61_63,0)],_61_62(_ms.unlazy(Stream),[[],[]]));
				return built
			};
			return _ms.set(function split_39(_,split_63){
				_ms.checkContains(Pred,split_63,"split?");
				return new (_ms.unlazy(Stream))(function*(){
					const iter=iterator(_);
					let prev_45idx=0;
					let cur_45idx=0;
					for(;;){
						const _$367=iter.next(),value=_$367.value,done=_$367.done;
						const next_45idx=_ms.lazy(()=>{
							return _43(1,cur_45idx)
						});
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
			},built)
		})();
		const _60_43_33=exports["<+!"]=new (Method)((()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const args=built.args=[`_`,`added`];
			return _ms.setName(built,"<+!")
		})());
		const _60_43_43_33=exports["<++!"]=new (Method)((()=>{
			const built={};
			const doc=built.doc=`Makes \`_\` into \`+ added _\`.`;
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`@added`,_64]);
				return built
			})();
			const _default=built.default=function _default(_64added){
				const _this=this;
				for(let _ of reverse_39(_64added)){
					_60_43_33(_this,_)
				}
			};
			return _ms.setName(built,"<++!")
		})());
		const _43_62_33=exports["+>!"]=new (Method)((()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const args=built.args=[`_`,`added`];
			return _ms.setName(built,"+>!")
		})());
		const _43_43_62_33=exports["++>!"]=new (Method)((()=>{
			const built={};
			const doc=built.doc=`Makes \`_\` into \`+ _ added\`.`;
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
			return _ms.setName(built,"++>!")
		})());
		const _63_60pop_33=exports["?<pop!"]=new (Method)((()=>{
			const built={};
			const doc=built.doc=`Takes one element off the left side, if not empty?.`;
			const args=built.args=1;
			return _ms.setName(built,"?<pop!")
		})());
		const _63pop_62_33=exports["?pop>!"]=new (Method)((()=>{
			const built={};
			const doc=built.doc=`Takes one element off the right side, if not empty?.`;
			const args=built.args=1;
			return _ms.setName(built,"?pop>!")
		})());
		const set_45nth_33=exports["set-nth!"]=new (Method)((()=>{
			const built={};
			const doc=built.doc=`Makes \`_[n]\` be \`val\`.`;
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`n`,_ms.unlazy(Nat)]);
				_ms.add(built,`val`);
				return built
			})();
			return _ms.setName(built,"set-nth!")
		})());
		const name=exports.name=`Seq`;
		exports.default=Seq;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvQC9TZXEvU2VxLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0VBc0JBLFVBQUssS0FBSSxNQUNJLEtBQUE7O0dBQVosb0JBQU07OztFQUVQLFFBQU0sSUFBSTtFQUVWLGVBQVcsSUFBSTtFQUlkLG1DQUFNLEtBQUksUUFDTSxLQUFBOztHQUFmLG9CQUNDO0dBRUQsc0JBQ1EsZUFBQTtHQUNSLHNCQUFNO0dBQ04sNkJBQVcsa0JBQUEsYUFDWTtVQStXakI7c0JBaFhnQjtXQUNyQixPQUFJLFVBK1dDLE9BL1djLE9BQUcsYUErV2pCO0dBQUE7OztFQTVXUCwwQkFDTSxLQUFBOztHQUFMLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxDQUFFLEVBQUUsSUFBUztvQ0FFQyxJQUFBO1lBQWYsTUFBTTtJQUFBOzs7a0JBQ1AsZUFBQSxFQUNDO2dDQUFJLFNBQU0sR0FBRzs7O0VBRWhCLGlDQUFRLEtBQUksUUFDTSxLQUFBOztHQUFqQixvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsQ0FBRSxFQUFFLHdCQUFlO29CQUNyQixDQUFFOzs7R0FDSCxzQkFBTTtHQUNOLDZCQUNXLG1CQUFBO1VBNFZMO1dBNVZMLE9BNFZLLE1BNVZLO0dBQUE7OztFQUVaLHdCQUNLLEtBQUE7O0dBQUosb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFFLENBQUUsRUFBRSxJQUFTO29DQUVDLElBQUE7WUFBZixLQUFLO0lBQUE7OztHQUNQLHNCQUFNO2tCQUNMLGNBQUEsRUFDQztnQ0FBSSxRQUFLLEdBQUc7OztFQUVmLCtCQUFPLEtBQUksUUFDTSxLQUFBOztHQUFoQixvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsQ0FBRSxFQUFFLHdCQUFlO29CQUNyQixDQUFFOzs7R0FDSCxzQkFBTTtHQUNOLDZCQUNXLG1CQUFBO1VBeVVMO1dBelVFLFNBeVVGLDhCQXhVYTtvQkF3VWIsTUF4VUUsSUFBRyxNQXdVTCxPQXhVaUI7SUFBQTtHQUFBOzs7RUFFeEIsd0JBQU0sS0FBSSxRQUNNLEtBQUE7O0dBQWYsb0JBQ0M7R0FFRCxzQkFDTyxlQUFBOztvQkFBTixDQUFFLENBQUUsRUFBRSxJQUFTLENBQUU7b0JBQ2pCLENBQUUsSUFBUzs7O0dBQ1osc0JBQU07R0FDTiw2QkFDVyxtQkFBQTtVQTZUTDtXQTdUQTtLQUFBLFFBNlRBO0tBNVRKLEdBQUEsU0FBTSxHQUNDO2FBQU47S0FBQSxPQUVHO2FBQUgsS0FBSyxFQUFFO0tBQUE7SUFBQTtHQUFBOzs7RUFFWCwwQkFBTyxLQUFJLFFBQ00sS0FBQTs7R0FBaEIsb0JBQ0M7R0FFRCxzQkFDTyxlQUFBOztvQkFBTixDQUFFLENBQUUsRUFBRSxJQUFTLENBQUU7b0JBQ2pCLENBQUUsSUFBUzs7O0dBQ1osc0JBQU07R0FDTiw2QkFDVyxtQkFBQTtVQThTTDtXQTlTQTtLQUFBLFFBOFNBO0tBN1NKLEdBQUEsU0FBTSxHQUNDO2FBQU47S0FBQSxPQUVHO2FBQUgsS0FBSyxFQUFHLElBQUUsTUFBSyxHQUFFO0tBQUE7SUFBQTtHQUFBOzs7RUFHckIsaUNBQ00sS0FBQTs7R0FBTCxvQkFDQztHQUdELHNCQUNRLGVBQUE7SUFBUCxRQUFJLHlCQUNjLFdBQUE7WUFBZDtJQUFBO2VBQ0ksVUFBTSxFQUFFLENBQUU7a0JBQ1YsVUFBTSxFQUFFLENBQUU7R0FBQTtrQkFDbEIsbUJBQUEsS0FBSyxLQUNJO3NCQUROO3NCQUFLO0lBQ1IsZUFBUyxTQUFTO0lBQ2xCLGVBQVMsU0FBUztXQUVmO1lBQUE7TUFBRixlQUFTO01BQ1QsZUFBUztNQUVKLEdBQUosY0FDVztPQUFWLE9BQU07YUFDUCxHQUFBLGNBQ1c7T0FBVixPQUFNO01BQUEsT0FDUCxHQUFBLE9BQUcsZUFBYSxnQkFDWSxRQUV4QjtPQUFILE9BQU07TUFBQTtLQUFBO0lBQUE7R0FBQTs7RUFFWCw2QkFBTSxLQUFJLFFBQ00sS0FBQTs7R0FBZixvQkFDQztHQUdELHNCQUNPLGVBQUE7O29CQUFOLENBQUUsQ0FBRSxFQUFFLEdBQUksdUJBQWE7b0JBQ3ZCLENBQUUsQ0FBRSxFQUFFLEdBQUk7OztHQUNYLHNCQUNLLEtBQUE7O2tCQUFEO2tCQUNELENBQUc7OztHQUNOLDZCQUFXLGtCQUFBLEVBQ0M7VUFpUU47SUFqUUwsTUFBTTtvQ0FFSzthQUFBLFFBK1BOLE1BOVBrQjtNQUFoQjtPQUFBLFFBQUE7T0FDTCxHQUFBLE9BQUcsRUFBRSxHQUNDO1FBQUwsT0FBTTtPQUFBLE9BRUg7VUFDRSxJQUFFLEVBQUU7T0FBQTtNQUFBO0tBQUE7SUFBQTtHQUFBOzs7RUFFZCxRQUFNLElBQUksSUFDRyxLQUFBOztHQUFaLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtlQUFDLGVBQUcsQ0FBRSxFQUFFLEdBQUksR0FBRztvQ0FFTixJQUFBO29CQUFmLENBQUUsRUFBRSxHQUFJO0lBQUE7R0FBQTtrQkFDUixTQUFBLEVBQ0s7VUFnUEQ7O2dDQWhQQyxPQWdQRCxNQWhQVztZQUNmLHVCQUFxQixZQUNuQiwrQkE4T0U7Ozs7RUEzT1AsbUJBQ1ksS0FBQTs7aUJBQVI7aUJBQ0QsQ0FBRztpQkFDSCxDQUFHOzs7RUFFTiwwQkFBTyxLQUFJLFFBQ00sS0FBQTs7R0FBaEIsb0JBQ0M7R0FHRCxzQkFDTyxlQUFBOztvQkFBTixDQUFFLENBQUUsRUFBRSxFQUFFLEVBQUUsR0FBSSxFQUFFLEdBQU8sQ0FBRSxFQUFFOzs7R0FDNUIsc0JBQU07R0FDTiw2QkFBVyxrQkFBQSxNQUFNLElBQ0c7VUE2TmQ7V0E3TkwsT0FBSSxVQTZOQyxPQTdOYyxTQTZOZCxNQTdOMEIsTUFBTTtHQUFBOzs7RUFFdkMsaUNBQ08sS0FBQTs7R0FBTixvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsQ0FBRSxFQUFFLEVBQUUsRUFBRSxHQUFJLEVBQUUsR0FBTywwQkFBVSxDQUFFLEVBQUU7OztHQUN0QyxzQkFBTTtrQkFDTCxrQkFBRyxFQUFFLE1BQU0sSUFDRzs2QkFEYixJQUNELFFBQU8sUUFBTSxFQUFFLE9BQVEsSUFBRSxJQUFJOzs7RUFFL0Isd0JBQU0sS0FBSSxRQUNNLEtBQUE7O0dBQWYsb0JBQU07R0FDTixzQkFDSyxLQUFBOztrQkFBRDtrQkFDRCxDQUFHOzs7R0FDTiw2QkFBVyxrQkFBQSxrQkFDYTtVQTZNbEI7V0E3TUwsT0FBSSxVQTZNQyxPQTdNYyxRQTZNZCxNQTdNeUI7R0FBQTs7O0VBRWhDLCtCQUNNLEtBQUE7O0dBQUwsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFFLENBQUUsRUFBRSxFQUFFLEdBQUksR0FBTywwQkFBVSxDQUFFLEVBQUU7b0JBRWpDLENBQUUsQ0FBRSxHQUFJLEdBQU8sMEJBQVUsQ0FBRTtJQUMzQixRQUFJLENBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTtlQUNOLFVBQU0sRUFBRyxPQUFJLFFBQU0sRUFBRSxHQUFJLFFBQU0sRUFBRTs7O2tCQUN6QyxpQkFBQSxFQUFFLGtCQUNpQjs7V0FFZjtLQUFILEdBQUEsT0FBRyxFQUFFLG1CQUNhO2FBQWpCO1lBRUc7YUFBSCx5QkFDYyxXQUFBO09BQWIsTUFBTTtPQUNELFFBQUEsUUFBUSxFQUNDO2VBQVY7VUFDRSxJQUFFLEVBQUU7UUFDVCxHQUFJLE9BQUcsRUFBRSxHQUNDO1NBQVQ7UUFBQTtPQUFBO01BQUE7S0FBQTtJQUFBO0dBQUE7O0VBSVAsNkNBQ1ksS0FBQTs7R0FBWCxvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsQ0FBRSxFQUFFLEVBQUUsSUFBRyw4QkFBTyxJQUFRLDBCQUFVLENBQUUsRUFBRTs7O2tCQUN4Qyx5QkFBQSxFQUFFLFNBQ1c7c0JBREo7V0FFVCx5QkFDYyxXQUFBO0tBQVIsUUFBQSxRQUFRLEVBQ0M7TUFBYixLQUFRLFNBQU8sTUFDSTtPQUFsQjtNQUFBO2FBQ0U7S0FBQTtJQUFBO0dBQUE7O0VBRVAsd0JBQU0sS0FBSSxRQUNNLEtBQUE7O0dBQWYsb0JBQU07R0FDTixzQkFDSyxLQUFBOztrQkFBRDtrQkFDRCxDQUFHOzs7R0FDTiw2QkFBVyxrQkFBQSxrQkFDYTtVQWlLbEI7V0FqS0wsT0FBSSxVQWlLQyxPQWpLYyxRQWlLZCxNQWpLeUI7R0FBQTs7O0VBRWhDLCtCQUNNLEtBQUE7O0dBQUwsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFFLENBQUUsRUFBRSxFQUFFLEVBQUUsR0FBSSxHQUFPLDBCQUFVLENBQUUsRUFBRTs7O2tCQUNuQyxpQkFBQSxFQUFFLGtCQUNhO1dBQ2YseUJBQ2MsV0FBQTtLQUFiLFdBQU8sU0FBUTtLQUNmLE1BQU07S0FFRixPQUFBO01BQUgsR0FBSSxPQUFHLEVBQUUsbUJBQ2E7T0FBckI7TUFBQTtNQUNELEdBQUksaUJBQ2dCO09BQW5CO01BQUE7UUFDSSxJQUFFLEVBQUU7S0FBQTthQUNOO0lBQUE7R0FBQTs7RUFLUCxzQkFDSSxLQUFBOztHQUFILG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxDQUFFLEVBQUUsR0FBSSxDQUFFLEdBQUcsSUFBSyxLQUFPLENBQUUsR0FBRzs7O2tCQUNoQyxhQUFBLEtBQUssS0FBSyxPQUNrQjtzQkFEekI7c0JBQUs7OEJBQVMsU0FBUztXQUMxQixPQUFJLFVBQVEsTUFBSyxPQUFLLEtBQUcsS0FBRztHQUFBOztFQUU5Qiw2QkFDSyxLQUFBOztHQUFKLG9CQUNDO0dBR0Qsc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxDQUFFLEVBQUUsR0FBSSxDQUFFLEdBQUcsR0FBRyxJQUFLLEtBQU8sMEJBQVUsQ0FBRSxHQUFHOzs7a0JBQzdDLGdCQUFBLEtBQUssS0FBSyxPQUNrQjtzQkFEekI7c0JBQUs7OEJBQVMsU0FBUztXQUUxQix5QkFDYyxXQUFBO0tBQWIsZUFBUyxTQUFTO0tBQ2xCLGVBQVMsU0FBUztLQUVkLE9BQUE7TUFBSCxlQUFTO01BQ1QsR0FBSSxjQUNXO09BQWQ7TUFBQTtNQUNELGVBQVM7TUFDVCxHQUFJLGNBQ1c7T0FBZDtNQUFBO2FBQ0UsT0FBTyxlQUFhOzs7OztFQUczQiwyQ0FDVyxLQUFBOztHQUFWLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtlQUFDLFVBQU0sQ0FBRSxDQUFFLEVBQUUsR0FBSSxDQUFFLEVBQUUsSUFBTyxlQUFXLEVBQUUsQ0FBRSxFQUFFLEVBQUUsRUFBRTtlQUVoRCxVQUFNLENBQUUsQ0FBRSxFQUFFLEVBQUUsSUFBTyxlQUFXLEVBQUUsQ0FBRSxFQUFFLEVBQUUsRUFBRTtlQUMxQyxVQUFNLENBQUUsR0FBRyxHQUFHLElBQU0sUUFBTyxlQUFXLEVBQUUsQ0FBRSxJQUFLO0dBQUE7a0JBQ3ZELHdCQUFLLGFBQWUsRUFDcUI7OzZCQUR4QyxJQUVHO0tBQUgsR0FBQSxPQUFHLGFBQVcsR0FDQzthQUNkLHlCQUNjLFdBQUE7T0FDVCxPQUFBO2VBQUE7T0FBQTtNQUFBO0tBQUEsT0FFRjthQUFILHlCQUNjLFdBQUE7T0FBYixXQUFPLFNBQVE7T0FFWCxPQUFBO1FBQUgsbUJBQWE7UUFFVCxPQUFBO1NBQUgsWUFBYTtTQUNiLEdBQUksS0FDSTtVQUFQO1NBQUE7U0FDRCxhQUFLLGFBQVcsQ0FBRTtTQUNsQixHQUFJLE9BQUcsYUFBWSxNQUFNLGVBQ1c7VUFBbkM7U0FBQTtRQUFBO1FBQ0YsS0FBUSxPQUFHLGFBQVksTUFBTSxlQUNXO1NBQXZDO1FBQUE7ZUFFRSxPQUFPO09BQUE7TUFBQTtLQUFBO0lBQUE7OztFQUdoQiw4QkFDUSxLQUFBOztHQUFQLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxDQUFFLEVBQUUsRUFBRSxJQUFTLHdCQUFVLEVBQUU7OztrQkFDN0IsaUJBQUEsRUFDSztzQkFESDtXQUNGLHdCQUFVLEVBQUUsTUFBSztHQUFBOztFQUVuQixxQ0FBVSxLQUFJLFFBQ00sS0FBQTs7R0FBbkIsb0JBQU07R0FDTixzQkFDUSxlQUFBO0dBQ1Isc0JBQU07R0FDTiw2QkFDVyxtQkFBQTtVQWlFTDtJQWpFTCxVQUFNLE9BQUcsTUFpRUo7V0FoRUwseUJBQ2MsV0FBQTtLQUFSLFFBQUEsS0FBQSxRQUFTLFFBQVEsTUFDSTtxQkFBdEIsSUFBSTtLQUFBO0lBQUE7R0FBQTs7O0VBRVgsOEJBQVMsS0FBSSxRQUNNLEtBQUE7O0dBQWxCLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxDQUFFLEVBQUUsSUFBUyxDQUFFLEVBQUU7OztHQUNwQixzQkFBTTtHQUNOLDZCQUNXLG1CQUFBO1VBc0RMO1dBdERKLGNBQVksTUFzRFI7Ozs7RUFwRFAsaUNBQ08sS0FBQTs7R0FBTixvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsQ0FBRSxFQUFFLEVBQUUsV0FBSSxPQUFHLElBQVEsMEJBQVUsQ0FBRSxDQUFFLEdBQUksQ0FBRTtvQkFDM0MsQ0FBRSxDQUFFLFdBQUksT0FBRyxJQUFRLDBCQUFVLENBQUUsR0FBRzs7O2tCQUNsQyxrQkFBQSxFQUFFLFNBQ1c7c0JBREo7V0FFVCx5QkFDYyxXQUFBO0tBQWIsV0FBTyxTQUFRO0tBQ2YsZUFBYTtLQUNiLGNBQVk7S0FFUixPQUFBO01BQUgsWUFBYTtNQUNiO2NBQVksSUFBRSxFQUFFO01BQUE7TUFFWCxHQUFKLEtBQ0k7Y0FBQSxNQUFNLEVBQUUsV0FBUztPQUNwQjtNQUFBLE9BQ0QsR0FBQSxTQUFPLE9BQ0s7Y0FBUixNQUFNLEVBQUUsV0FBUzs7O2FBSWpCOzs7Ozs7O0VBSVQsK0JBQUssS0FBSSxRQUNNLEtBQUE7O0dBQWQsb0JBQU07R0FDTixzQkFBTSxDQUFHLElBQUk7OztFQUVkLG1DQUFNLEtBQUksUUFDTSxLQUFBOztHQUFmLG9CQUFNO0dBQ04sc0JBQ0ssS0FBQTs7a0JBQUQ7a0JBQ0QsQ0FBRyxTQUFROzs7R0FDZCw2QkFBWSxrQkFBQSxTQUNNO1VBZVo7SUFmQSxRQUFBLEtBQUEsV0FBUyxVQUNNO0tBQW5CLFVBY0ksTUFkSztJQUFBO0dBQUE7OztFQUdaLCtCQUFLLEtBQUksUUFDTSxLQUFBOztHQUFkLG9CQUFNO0dBQ04sc0JBQU0sQ0FBRyxJQUFJOzs7RUFFZCxtQ0FBTSxLQUFJLFFBQ00sS0FBQTs7R0FBZixvQkFBTTtHQUNOLHNCQUNLLEtBQUE7O2tCQUFEO2tCQUNELENBQUcsU0FBUTs7O0dBQ2QsNkJBQVksa0JBQUEsU0FDTTtVQUNaO0lBREEsUUFBQSxLQUFBLFNBQ007S0FBVixVQUFJLE1BQUs7SUFBQTtHQUFBOzs7RUFHWixxQ0FBUSxLQUFJLFFBQ00sS0FBQTs7R0FBakIsb0JBQU07R0FDTixzQkFBTTs7O0VBRVAscUNBQVEsS0FBSSxRQUNNLEtBQUE7O0dBQWpCLG9CQUFNO0dBQ04sc0JBQU07OztFQUdQLHVDQUFVLEtBQUksUUFDTSxLQUFBOztHQUFuQixvQkFBTTtHQUNOLHNCQUNLLEtBQUE7O2tCQUFEO2tCQUNELENBQUc7a0JBQ0Y7Ozs7O0VBdmFOLHdCQUFBO2tCQXNCQSIsImZpbGUiOiJhdC9TZXEvU2VxLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=