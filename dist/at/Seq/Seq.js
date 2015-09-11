"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../Function","../../math/methods","../../methods","../../String","../../Type/Kind","../../Type/Method","../../Type/Type","../at","../at-Type","../../math/Number","../../to-string","../q","../Range","./Stream","../../compare","../../Try","../q"],(exports,compare_0,Function_1,methods_2,methods_3,String_4,Kind_5,Method_6,Type_7,_64_8,_64_45Type_9,Number_10,to_45string_11,_63_12,Range_13,Stream_14,compare_15,Try_16,_63_17)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(Function_1),Pred=_ms.get(_$3,"Pred"),_$4=_ms.getModule(methods_2),_45=_ms.get(_$4,"-"),_43=_ms.get(_$4,"+"),_$5=_ms.getModule(methods_3),freeze=_ms.get(_$5,"freeze"),sub=_ms.get(_$5,"sub"),_$6=_ms.getModule(String_4),indent=_ms.get(_$6,"indent"),Kind=_ms.getDefaultExport(Kind_5),_$7=_ms.getModule(Kind_5),kind_33=_ms.get(_$7,"kind!"),self_45kind_33=_ms.get(_$7,"self-kind!"),Method=_ms.getDefaultExport(Method_6),_$8=_ms.getModule(Method_6),impl_33=_ms.get(_$8,"impl!"),_$9=_ms.getModule(Type_7),_61_62=_ms.get(_$9,"=>"),type_45of=_ms.get(_$9,"type-of"),_64=_ms.getDefaultExport(_64_8),_$10=_ms.getModule(_64_8),_43_43=_ms.get(_$10,"++"),count=_ms.get(_$10,"count"),empty_63=_ms.get(_$10,"empty?"),iterator=_ms.get(_$10,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_9),_$11=_ms.getModule(_64_45Type_9),empty=_ms.get(_$11,"empty"),from_45stream=_ms.get(_$11,"from-stream"),_$12=_ms.lazyGetModule(Number_10),Nat=_ms.lazyProp(_$12,"Nat"),to_45string=_ms.lazy(()=>_ms.getDefaultExport(to_45string_11)),_$13=_ms.lazyGetModule(_63_12),Opt_45_62_63=_ms.lazyProp(_$13,"Opt->?"),un_45_63=_ms.lazyProp(_$13,"un-?"),Range=_ms.lazy(()=>_ms.getDefaultExport(Range_13)),Stream=_ms.lazy(()=>_ms.getDefaultExport(Stream_14)),_$14=_ms.lazyGetModule(compare_15),_60_63=_ms.lazyProp(_$14,"<?"),_$15=_ms.lazyGetModule(Try_16),fails_63=_ms.lazyProp(_$15,"fails?"),_$16=_ms.lazyGetModule(_63_17),_63some=_ms.lazyProp(_$16,"?some"),_63None=_ms.lazyProp(_$16,"?None");
		const Seq=new (Kind)((()=>{
			const built={};
			built[`name`]="Seq";
			const doc=built.doc=`@ whose values are in a meaningful order.`;
			return built
		})());
		kind_33(Seq,_64);
		self_45kind_33(Seq,_64_45Type);
		const _60_43_43_126=exports["<++~"]=new (Method)((()=>{
			const built={};
			built[`name`]="<++~";
			const doc=built.doc=`TODO:REST
(There is no \`++>~\` because \`++~\` by default adds to the right for Seqs.)`;
			const test=built.test=function test(){};
			const args=built.args=2;
			const _default=built.default=function _default(left_45added){
				const _this=this;
				_ms.checkContains(_64,left_45added,"left-added");
				return _61_62(type_45of(_this),_43_43(left_45added,_this))
			};
			return built
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
			return _ms.set(_=>{
				return _ms.unlazy(un_45_63)(_63first(_),`Can not take first of empty.`)
			},built)
		})();
		const _63first=exports["?first"]=new (Method)((()=>{
			const built={};
			built[`name`]="?first";
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
			return built
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
			return _ms.set(_=>{
				return _ms.unlazy(un_45_63)(_63last(_),`Can not take last of empty.`)
			},built)
		})();
		const _63last=exports["?last"]=new (Method)((()=>{
			const built={};
			built[`name`]="?last";
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
			return built
		})());
		const tail=exports.tail=new (Method)((()=>{
			const built={};
			built[`name`]="tail";
			const doc=built.doc=`All elements but the first.
TODO: Eager for Linked-Lists.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2]],[2]);
				_ms.assoc(built,[[]],[]);
				return built
			};
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				return empty_63(_this)?_this:drop(_this,1)
			};
			return built
		})());
		const rtail=exports.rtail=new (Method)((()=>{
			const built={};
			built[`name`]="rtail";
			const doc=built.doc=`All elements but the last.
TODO: Eager for finger trees.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2]],[1]);
				_ms.assoc(built,[[]],[]);
				return built
			};
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				return empty_63(_this)?_this:take(_this,_45(count(_this),1))
			};
			return built
		})());
		const seq_61_63=exports["seq=?"]=(()=>{
			const built={};
			const doc=built.doc=`Whether two @s share the same elements in the same order.
The types of the @s do not matter.
Equivalent to \`=? (=> Array @a) (=> Array @b)\`, but may not have to fully unlazy both.`;
			const test=built.test=function test(){
				const s=new (_ms.unlazy(Stream))(function*(){
					(yield 1)
				});
				_ms.assert(seq_61_63,s,[1]);
				_ms.assertNot(seq_61_63,s,[2])
			};
			return _ms.set((_64a,_64b)=>{
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
			built[`name`]="?nth";
			const doc=built.doc=`|_ n:Nat
\`n\`th element in iteration order, if there are at least that many values.
0th is the first."`;
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
			return built
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
				return _ms.unlazy(un_45_63)(_63nth(_this,n),_ms.lazy(()=>`No element at index ${n} for
	${indent(_ms.unlazy(to_45string)(_this))}`))
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
			built[`name`]="slice";
			const doc=built.doc=`The elements from index start (inclusive) to end (exclusive).
Takes as much as possible.
Result length should be - end start, unless \`end\` was past the end.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[0,1,2,3],1,3],[1,2]);
				return built
			};
			const args=built.args=slice_45args;
			const _default=built.default=function _default(start,end){
				const _this=this;
				return _61_62(type_45of(_this),slice_126(_this,start,end))
			};
			return built
		})());
		const slice_126=exports["slice~"]=(()=>{
			const built={};
			const doc=built.doc=`Lazy slice.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[0,1,2,3],1,3],_61_62(_ms.unlazy(Stream),[1,2]));
				return built
			};
			const args=built.args=slice_45args;
			return _ms.set((_,start,end)=>{
				return _ms.checkContains(_64,take_126(drop_126(_,start),_45(end,start)),"res")
			},built)
		})();
		const take=exports.take=new (Method)((()=>{
			const built={};
			built[`name`]="take";
			const doc=built.doc=`TODO`;
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
		const take_126=exports["take~"]=(()=>{
			const built={};
			const doc=built.doc=`Stream including only the first count-to-take elements.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[0,1,2],2],_61_62(_ms.unlazy(Stream),[0,1]));
				_ms.assoc(built,[[0],2],_61_62(_ms.unlazy(Stream),[0]));
				const _=[0,1,2,3,4];
				_ms.assert(seq_61_63,_,_43_43(take_126(_,2),drop_126(_,2)));
				return built
			};
			return _ms.set((_,count_45to_45take)=>{
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
		const take_45while_126=exports["take-while~"]=(()=>{
			const built={};
			const doc=built.doc=`Stream stopping (and not including) the first element not satisfying while?.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2,- 1,3],_ms.sub(_ms.unlazy(_60_63),0)],_61_62(_ms.unlazy(Stream),[1,2]));
				return built
			};
			return _ms.set((_,while_63)=>{
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
			built[`name`]="drop";
			const doc=built.doc=`TODO`;
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
			const built={};
			const doc=built.doc=`Stream without the first count-to-drop elements.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[0,1,2,3],2],_61_62(_ms.unlazy(Stream),[2,3]));
				return built
			};
			return _ms.set((_,count_45to_45drop)=>{
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
			return _ms.set((_64a,_64b,zipper)=>{
				_ms.checkContains(_64,_64a,"@a");
				_ms.checkContains(_64,_64b,"@b");
				_ms.checkContains(_ms.sub(Function,2),zipper,"zipper");
				return _61_62(type_45of(_64a),zip_126(_64a,_64b,zipper))
			},built)
		})();
		const zip_126=exports["zip~"]=(()=>{
			const built={};
			const doc=built.doc=`Seq of zipper applied to corresponding elements of @a and @b.
Ends as soon as either of them does, discarding extra elements.
(Corresponding means: with the same index.)`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2],[10,20,30],_43],_61_62(_ms.unlazy(Stream),[11,22]));
				return built
			};
			return _ms.set((_64a,_64b,zipper)=>{
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
		const groups_45of_126=exports["groups-of~"]=(()=>{
			const built={};
			const doc=built.doc=`Seq of consecutive groups of \`group-size\` elements.`;
			const test=built.test=function test(){
				_ms.assert(seq_61_63,[[1,2],[3,4]],groups_45of_126(2,[1,2,3,4]));
				_ms.assert(seq_61_63,[[1,2,3]],groups_45of_126(3,[1,2,3,4]));
				_ms.assert(seq_61_63,[[],[],[]],take_126(groups_45of_126(0,[1]),3))
			};
			return _ms.set((group_45size,_)=>{
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
			return _ms.set(_=>{
				_ms.checkContains(Seq,_,"_");
				return new (_ms.unlazy(Range))(0,count(_))
			},built)
		})();
		const reverse_126=exports["reverse~"]=new (Method)((()=>{
			const built={};
			built[`name`]="reverse~";
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
			return built
		})());
		const reverse=exports.reverse=new (Method)((()=>{
			const built={};
			built[`name`]="reverse";
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
			return built
		})());
		const split_126=exports["split~"]=(()=>{
			const built={};
			const doc=built.doc=`Subseqs separated by elements where split? is true.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,0,1],_ms.sub(_61_63,0)],_61_62(_ms.unlazy(Stream),[[1],[1]]));
				_ms.assoc(built,[[0],_ms.sub(_61_63,0)],_61_62(_ms.unlazy(Stream),[[],[]]));
				return built
			};
			return _ms.set((_,split_63)=>{
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
			},built)
		})();
		const _60_43_33=exports["<+!"]=new (Method)((()=>{
			const built={};
			built[`name`]="<+!";
			const doc=built.doc=`TODO`;
			const args=built.args=[`_`,`added`];
			return built
		})());
		const _60_43_43_33=exports["<++!"]=new (Method)((()=>{
			const built={};
			built[`name`]="<++!";
			const doc=built.doc=`Makes \`_\` into \`+ added _\`.`;
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
			const doc=built.doc=`TODO`;
			const args=built.args=[`_`,`added`];
			return built
		})());
		const _43_43_62_33=exports["++>!"]=new (Method)((()=>{
			const built={};
			built[`name`]="++>!";
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
			return built
		})());
		const _63_60pop_33=exports["?<pop!"]=new (Method)((()=>{
			const built={};
			built[`name`]="?<pop!";
			const doc=built.doc=`Takes one element off the left side, if not empty?.`;
			const args=built.args=1;
			return built
		})());
		const _63pop_62_33=exports["?pop>!"]=new (Method)((()=>{
			const built={};
			built[`name`]="?pop>!";
			const doc=built.doc=`Takes one element off the right side, if not empty?.`;
			const args=built.args=1;
			return built
		})());
		const set_45nth_33=exports["set-nth!"]=new (Method)((()=>{
			const built={};
			built[`name`]="set-nth!";
			const doc=built.doc=`Makes \`_[n]\` be \`val\`.`;
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
		exports.default=Seq;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvQC9TZXEvU2VxLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBc0JBLFVBQUssS0FBSSxNQUNJLEtBQUE7O1NBQVosUUFBQTtHQUNBLG9CQUFNOzs7RUFFUCxRQUFNLElBQUk7RUFFVixlQUFXLElBQUk7RUFJZCxvQ0FBTSxLQUFJLFFBQ00sS0FBQTs7U0FBZixRQUFBO0dBQ0Esb0JBQ0M7R0FFRCxzQkFDUSxlQUFBO0dBQ1Isc0JBQU07R0FDTiw2QkFBVyxrQkFBQSxhQUNZO1VBcVhqQjtzQkF0WGdCO1dBQ3JCLE9BQUksVUFxWEMsT0FyWGMsT0FBRyxhQXFYakI7R0FBQTs7O0VBbFhQLDBCQUNNLEtBQUE7O0dBQUwsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFDLENBQUMsRUFBRSxJQUFPO29DQUVLLElBQUE7WUFBZixNQUFNO0lBQUE7OztrQkFDUCxHQUNDO2dDQUFJLFNBQUEsR0FBUzs7O0VBRWhCLGlDQUFRLEtBQUksUUFDTSxLQUFBOztTQUFqQixRQUFBO0dBQ0Esb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFDLENBQUMsRUFBRSx3QkFBYTtvQkFDakIsQ0FBQzs7O0dBQ0Ysc0JBQU07R0FDTiw2QkFDVyxtQkFBQTtVQWlXTDtXQWpXTCxPQWlXSyxNQWpXSztHQUFBOzs7RUFFWix3QkFDSyxLQUFBOztHQUFKLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBQyxDQUFDLEVBQUUsSUFBTztvQ0FFSyxJQUFBO1lBQWYsS0FBSztJQUFBOzs7R0FDUCxzQkFBTTtrQkFDTCxHQUNDO2dDQUFJLFFBQUEsR0FBUTs7O0VBRWYsK0JBQU8sS0FBSSxRQUNNLEtBQUE7O1NBQWhCLFFBQUE7R0FDQSxvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUMsQ0FBQyxFQUFFLHdCQUFhO29CQUNqQixDQUFDOzs7R0FDRixzQkFBTTtHQUNOLDZCQUNXLG1CQUFBO1VB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Q04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBQyxDQUFDLEVBQUUsSUFBTyxDQUFDLEVBQUU7OztHQUNmLHNCQUFNO0dBQ04sNkJBQ1csbUJBQUE7VUEwREw7V0ExREosY0FBWSxNQTBEUjs7OztFQXhEUCxrQ0FDTyxLQUFBOztHQUFOLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBQyxDQUFDLEVBQUUsRUFBRSxXQUFHLE9BQUcsSUFBTywwQkFBVSxDQUFDLENBQUMsR0FBRyxDQUFDO29CQUNuQyxDQUFDLENBQUMsV0FBRyxPQUFHLElBQU8sMEJBQVUsQ0FBQyxHQUFHOzs7a0JBQzdCLENBQUEsRUFBRSxXQUNXO3NCQURKO1dBRVQseUJBQ2MsV0FBQTtLQUFiLFdBQU8sU0FBQTtLQUNQLGVBQWE7S0FDYixjQUFZO0tBRVIsT0FBQTtNQUFILFVBQWE7TUFDYiw4QkFBWSxJQUFFLEVBQUU7TUFFWCxHQUFKLEtBQ0k7Y0FBQSxNQUFNLEVBQUUsV0FBUztPQUNwQjtNQUFBLE9BQ0QsR0FBQSxTQUFPLE9BQ0s7Y0FBUixNQUFNLEVBQUUsV0FBUzs7O2FBSWpCOzs7Ozs7O0VBSVQsK0JBQUssS0FBSSxRQUNNLEtBQUE7O1NBQWQsUUFBQTtHQUNBLG9CQUFNO0dBQ04sc0JBQU0sQ0FBRSxJQUFJOzs7RUFFYixtQ0FBTSxLQUFJLFFBQ00sS0FBQTs7U0FBZixRQUFBO0dBQ0Esb0JBQU07R0FDTixzQkFDSyxLQUFBOztrQkFBRDtrQkFDRCxDQUFFLFNBQVE7OztHQUNiLDZCQUFZLGtCQUFBLFNBQ007VUFpQlo7SUFqQkEsUUFBQSxLQUFBLFlBQVMsVUFDTTtLQUFuQixVQWdCSSxNQWhCSztJQUFBO0dBQUE7OztFQUdaLCtCQUFLLEtBQUksUUFDTSxLQUFBOztTQUFkLFFBQUE7R0FDQSxvQkFBTTtHQUNOLHNCQUFNLENBQUUsSUFBSTs7O0VBRWIsbUNBQU0sS0FBSSxRQUNNLEtBQUE7O1NBQWYsUUFBQTtHQUNBLG9CQUFNO0dBQ04sc0JBQ0ssS0FBQTs7a0JBQUQ7a0JBQ0QsQ0FBRSxTQUFROzs7R0FDYiw2QkFBWSxrQkFBQSxTQUNNO1VBQ1o7SUFEQSxRQUFBLEtBQUEsU0FDTTtLQUFWLFVBQUksTUFBSztJQUFBO0dBQUE7OztFQUdaLHFDQUFRLEtBQUksUUFDTSxLQUFBOztTQUFqQixRQUFBO0dBQ0Esb0JBQU07R0FDTixzQkFBTTs7O0VBRVAscUNBQVEsS0FBSSxRQUNNLEtBQUE7O1NBQWpCLFFBQUE7R0FDQSxvQkFBTTtHQUNOLHNCQUFNOzs7RUFHUCx1Q0FBVSxLQUFJLFFBQ00sS0FBQTs7U0FBbkIsUUFBQTtHQUNBLG9CQUFNO0dBQ04sc0JBQ0ssS0FBQTs7a0JBQUQ7a0JBQ0QsQ0FBRTtrQkFDRDs7Ozs7RUFsYk4sd0JBQUE7a0JBc0JBIiwiZmlsZSI6ImF0L1NlcS9TZXEuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==