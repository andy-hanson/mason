"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../Function","../../math/methods","../../methods","../../String","../../Type/Kind","../../Type/Method","../../Type/Type","../at","../at-Type","../../math/Number","../../show","../q","./Stream","../../compare","../../Try","../q"],(exports,compare_0,Function_1,methods_2,methods_3,String_4,Kind_5,Method_6,Type_7,_64_8,_64_45Type_9,Number_10,show_11,_63_12,Stream_13,compare_14,Try_15,_63_16)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(Function_1),Pred=_ms.get(_$3,"Pred"),_$4=_ms.getModule(methods_2),_45=_ms.get(_$4,"-"),_43=_ms.get(_$4,"+"),_$5=_ms.getModule(methods_3),freeze=_ms.get(_$5,"freeze"),sub=_ms.get(_$5,"sub"),_$6=_ms.getModule(String_4),indent=_ms.get(_$6,"indent"),Kind=_ms.getDefaultExport(Kind_5),_$7=_ms.getModule(Kind_5),kind_33=_ms.get(_$7,"kind!"),self_45kind_33=_ms.get(_$7,"self-kind!"),Method=_ms.getDefaultExport(Method_6),_$8=_ms.getModule(Method_6),impl_33=_ms.get(_$8,"impl!"),_$9=_ms.getModule(Type_7),_61_62=_ms.get(_$9,"=>"),type_45of=_ms.get(_$9,"type-of"),_64=_ms.getDefaultExport(_64_8),_$10=_ms.getModule(_64_8),_43_43=_ms.get(_$10,"++"),count=_ms.get(_$10,"count"),empty_63=_ms.get(_$10,"empty?"),iterator=_ms.get(_$10,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_9),_$11=_ms.getModule(_64_45Type_9),empty=_ms.get(_$11,"empty"),from_45stream=_ms.get(_$11,"from-stream"),_$13=_ms.lazyGetModule(Number_10),Nat=_ms.lazyProp(_$13,"Nat"),show=_ms.lazy(()=>{
			return _ms.getDefaultExport(show_11)
		}),_$15=_ms.lazyGetModule(_63_12),Opt_45_62_63=_ms.lazyProp(_$15,"Opt->?"),un_45_63=_ms.lazyProp(_$15,"un-?"),Stream=_ms.lazy(()=>{
			return _ms.getDefaultExport(Stream_13)
		}),_$18=_ms.lazyGetModule(compare_14),_60_63=_ms.lazyProp(_$18,"<?"),_$19=_ms.lazyGetModule(Try_15),fails_63=_ms.lazyProp(_$19,"fails?"),_$20=_ms.lazyGetModule(_63_16),_63some=_ms.lazyProp(_$20,"?some"),_63None=_ms.lazyProp(_$20,"?None");
		const Seq=new (Kind)(()=>{
			const built={};
			const doc=built.doc=`@ whose values are in a meaningful order.`;
			return _ms.setName(built,"Seq")
		}());
		kind_33(Seq,_64);
		self_45kind_33(Seq,_64_45Type);
		const _60_43_43_39=exports["<++'"]=new (Method)(()=>{
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
		}());
		const first=exports.first=()=>{
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
		}();
		const _63first=exports["?first"]=new (Method)(()=>{
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
		}());
		const last=exports.last=()=>{
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
		}();
		const _63last=exports["?last"]=new (Method)(()=>{
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
				return empty_63(_this)?_ms.None:_ms.some(()=>{
					return _ms.sub(_this,_45(count(_this),1))
				}())
			};
			return _ms.setName(built,"?last")
		}());
		const tail=exports.tail=new (Method)(()=>{
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
				return ()=>{
					const _=_this;
					if(empty_63(_)){
						return _
					} else {
						return drop(_,1)
					}
				}()
			};
			return _ms.setName(built,"tail")
		}());
		const rtail=exports.rtail=new (Method)(()=>{
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
				return ()=>{
					const _=_this;
					if(empty_63(_)){
						return _
					} else {
						return take(_,_45(count(_),1))
					}
				}()
			};
			return _ms.setName(built,"rtail")
		}());
		const seq_61_63=exports["seq=?"]=()=>{
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
				return ()=>{
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
				}()
			},built)
		}();
		const _63nth=exports["?nth"]=new (Method)(()=>{
			const built={};
			const doc=built.doc=`|_ n:Nat\n\`n\`th element in iteration order, if there are at least that many values.\n0th is the first."`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[0,1],1],_ms.unlazy(_63some)(1));
				_ms.assoc(built,[[0,1],2],_ms.unlazy(_63None));
				return built
			};
			const args=built.args=()=>{
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`n`,_ms.unlazy(Nat)]);
				return built
			}();
			const _default=built.default=function _default(n){
				const _this=this;
				let i=0;
				return _ms.unlazy(Opt_45_62_63)(()=>{
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
				}())
			};
			return _ms.setName(built,"?nth")
		}());
		impl_33(sub,Seq,()=>{
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
					return `No element at index ${_ms.show(n)} for\n\t${_ms.show(indent(_ms.unlazy(show)(_this)))}`
				}))
			},built)
		}());
		const slice_45args=()=>{
			const built=[];
			_ms.add(built,`_`);
			_ms.add(built,[`start`,_ms.unlazy(Nat)]);
			_ms.add(built,[`end`,_ms.unlazy(Nat)]);
			return built
		}();
		const slice=exports.slice=new (Method)(()=>{
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
		}());
		const slice_39=exports["slice'"]=()=>{
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
		}();
		const take=exports.take=new (Method)(()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const args=built.args=()=>{
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`count-to-take`,_ms.unlazy(Nat)]);
				return built
			}();
			const _default=built.default=function _default(count_45to_45take){
				const _this=this;
				return _61_62(type_45of(_this),take_39(_this,count_45to_45take))
			};
			return _ms.setName(built,"take")
		}());
		const take_39=exports["take'"]=()=>{
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
				return ()=>{
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
				}()
			},built)
		}();
		const take_45while_39=exports["take-while'"]=()=>{
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
		}();
		const drop=exports.drop=new (Method)(()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const args=built.args=()=>{
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`count-to-drop`,_ms.unlazy(Nat)]);
				return built
			}();
			const _default=built.default=function _default(count_45to_45drop){
				const _this=this;
				return _61_62(type_45of(_this),drop_39(_this,count_45to_45drop))
			};
			return _ms.setName(built,"drop")
		}());
		const drop_39=exports["drop'"]=()=>{
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
		}();
		const zip=exports.zip=()=>{
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
		}();
		const zip_39=exports["zip'"]=()=>{
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
		}();
		const groups_45of_39=exports["groups-of'"]=()=>{
			const built={};
			const doc=built.doc=`Seq of consecutive groups of \`group-size\` elements.`;
			const test=built.test=function test(){
				_ms.assert(seq_61_63,[[1,2],[3,4]],groups_45of_39(2,[1,2,3,4]));
				_ms.assert(seq_61_63,[[1,2,3]],groups_45of_39(3,[1,2,3,4]));
				_ms.assert(seq_61_63,[[],[],[]],take_39(groups_45of_39(0,[1]),3))
			};
			return _ms.set(function groups_45of_39(group_45size,_){
				_ms.checkContains(_ms.unlazy(Nat),group_45size,"group-size");
				return _ms.checkContains(Seq,()=>{
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
									const _$316=iter.next(),value=_$316.value,done=_$316.done;
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
				}(),"res")
			},built)
		}();
		const reverse=exports.reverse=new (Method)(()=>{
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
		}());
		const split_39=exports["split'"]=()=>{
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
						const _$348=iter.next(),value=_$348.value,done=_$348.done;
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
		}();
		const _60_43_43_33=exports["<++!"]=new (Method)(()=>{
			const built={};
			const doc=built.doc=`Makes \`_\` into \`+ added _\`.`;
			const args=built.args=()=>{
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`added`,_64]);
				return built
			}();
			return _ms.setName(built,"<++!")
		}());
		const _43_43_62_33=exports["++>!"]=new (Method)(()=>{
			const built={};
			const doc=built.doc=`Makes \`_\` into \`+ _ added\`.`;
			const args=built.args=()=>{
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`added`,_64]);
				return built
			}();
			return _ms.setName(built,"++>!")
		}());
		const _63_60pop_33=exports["?<pop!"]=new (Method)(()=>{
			const built={};
			const doc=built.doc=`Takes one element off the left side, if not empty?.`;
			const args=built.args=1;
			return _ms.setName(built,"?<pop!")
		}());
		const _63pop_62_33=exports["?pop>!"]=new (Method)(()=>{
			const built={};
			const doc=built.doc=`Takes one element off the right side, if not empty?.`;
			const args=built.args=1;
			return _ms.setName(built,"?pop>!")
		}());
		const set_45nth_33=exports["set-nth!"]=new (Method)(()=>{
			const built={};
			const doc=built.doc=`Makes \`_[n]\` be \`val\`.`;
			const args=built.args=()=>{
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`n`,_ms.unlazy(Nat)]);
				_ms.add(built,`val`);
				return built
			}();
			return _ms.setName(built,"set-nth!")
		}());
		const name=exports.name=`Seq`;
		exports.default=Seq;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9TZXEubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0VBcUJBLFVBQUssS0FBSSxVQUNJOztHQUFaLG9CQUFNOzs7RUFFUCxRQUFNLElBQUk7RUFFVixlQUFXLElBQUk7RUFJZCxtQ0FBTSxLQUFJLFlBQ007O0dBQWYsb0JBQ0M7R0FFRCxzQkFDUSxlQUFBO0dBQ1Isc0JBQU07R0FDTiw2QkFBVyxrQkFBQSxhQUNZO1VBdVNIO3NCQXhTRTtXQUNyQixPQUFJLFVBdVNlLE9BdlNBLE9BQUcsYUF1U0g7R0FBQTs7O0VBcFNyQiw4QkFDTTs7R0FBTCxvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsQ0FBRSxFQUFFLElBQVM7b0NBRUMsSUFBQTtZQUFmLE1BQU07SUFBQTs7O2tCQUNQLGVBQUEsRUFDQztnQ0FBSSxTQUFNLEdBQUc7OztFQUVoQixpQ0FBUSxLQUFJLFlBQ007O0dBQWpCLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxDQUFFLEVBQUUsd0JBQWU7b0JBQ3JCLENBQUU7OztHQUNILHNCQUFNO0dBQ04sNkJBQ1csbUJBQUE7VUFvUlM7V0FwUm5CLE9Bb1JtQixNQXBSVDtHQUFBOzs7RUFFWiw0QkFDSzs7R0FBSixvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsQ0FBRSxFQUFFLElBQVM7b0NBRUMsSUFBQTtZQUFmLEtBQUs7SUFBQTs7O0dBQ1Asc0JBQU07a0JBQ0wsY0FBQSxFQUNDO2dDQUFJLFFBQUssR0FBRzs7O0VBRWYsK0JBQU8sS0FBSSxZQUNNOztHQUFoQixvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsQ0FBRSxFQUFFLHdCQUFlO29CQUNyQixDQUFFOzs7R0FDSCxzQkFBTTtHQUNOLDZCQUNXLG1CQUFBO1VBaVFTO1dBalFaLFNBaVFZLDZCQWhRRDtvQkFnUUMsTUFoUVosSUFBRyxN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QUcsR0FBRyxJQUFNLFFBQU8sZUFBVyxFQUFFLENBQUUsSUFBSztHQUFBO2tCQUN2RCx3QkFBSyxhQUFlLEVBQ3FCOzs2QkFEeEM7S0FFQSxHQUFBLE9BQUcsYUFBVyxHQUNDO2FBQ2QseUJBQ2MsV0FBQTtPQUNULE9BQUE7ZUFBQTtPQUFBO01BQUE7S0FBQSxPQUVGO2FBQUgseUJBQ2MsV0FBQTtPQUFiLFdBQU8sU0FBUTtPQUVYLE9BQUE7UUFBSCxtQkFBYTtRQUVULE9BQUE7U0FBSCxZQUFhO1NBQ2IsR0FBSSxLQUNJO1VBQVA7U0FBQTtTQUNELGFBQUssYUFBVyxDQUFFO1NBQ2xCLEdBQUksT0FBRyxhQUFZLE1BQU0sZUFDVztVQUFuQztTQUFBO1FBQUE7UUFDRixLQUFRLE9BQUcsYUFBWSxNQUFNLGVBQ1c7U0FBdkM7UUFBQTtlQUVFLE9BQU87T0FBQTtNQUFBO0tBQUE7SUFBQTs7O0VBR2hCLDhCQUFTLEtBQUksWUFDTTs7R0FBbEIsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFFLENBQUUsRUFBRSxJQUFTLENBQUUsRUFBRTs7O0dBQ3BCLHNCQUFNO0dBQ04sNkJBQ1csbUJBQUE7VUFBUztXQUFsQixjQUFZLE1BQU07Ozs7RUFFckIscUNBQ087O0dBQU4sb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFFLENBQUUsRUFBRSxFQUFFLFdBQUksT0FBRyxJQUFRLDBCQUFVLENBQUUsQ0FBRSxHQUFJLENBQUU7b0JBQzNDLENBQUUsQ0FBRSxXQUFJLE9BQUcsSUFBUSwwQkFBVSxDQUFFLEdBQUc7OztrQkFDbEMsa0JBQUEsRUFBRSxTQUNXO3NCQURKO1dBRVQseUJBQ2MsV0FBQTtLQUFiLFdBQU8sU0FBUTtLQUNmLGVBQWE7S0FDYixjQUFZO0tBRVIsT0FBQTtNQUFILFlBQWE7TUFDYjtjQUFZLElBQUUsRUFBRTtNQUFBO01BRVgsR0FBSixLQUNJO2NBQUEsTUFBTSxFQUFFLFdBQVM7T0FDcEI7TUFBQSxPQUNELEdBQUEsU0FBTyxPQUNLO2NBQVIsTUFBTSxFQUFFLFdBQVM7OzthQUlqQjs7Ozs7OztFQUdULG1DQUFNLEtBQUksWUFDTTs7R0FBZixvQkFBTTtHQUNOLDBCQUNLOztrQkFBRDtrQkFDRCxDQUFHLFFBQU87Ozs7O0VBQ2QsbUNBQU0sS0FBSSxZQUNNOztHQUFmLG9CQUFNO0dBQ04sMEJBQ0s7O2tCQUFEO2tCQUNELENBQUcsUUFBTzs7Ozs7RUFFZCxxQ0FBUSxLQUFJLFlBQ007O0dBQWpCLG9CQUFNO0dBQ04sc0JBQU07OztFQUVQLHFDQUFRLEtBQUksWUFDTTs7R0FBakIsb0JBQU07R0FDTixzQkFBTTs7O0VBR1AsdUNBQVUsS0FBSSxZQUNNOztHQUFuQixvQkFBTTtHQUNOLDBCQUNLOztrQkFBRDtrQkFDRCxDQUFHO2tCQUNGOzs7OztFQWxZTix3QkFBQTtrQkFxQkEiLCJmaWxlIjoiYXQvU2VxL1NlcS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9