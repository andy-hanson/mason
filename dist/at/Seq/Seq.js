"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../Function","../../math/methods","../../methods","../../String","../../Type/Kind","../../Type/Method","../../Type/Type","../at","../at-Type","../../math/Number","../../show","../q","./Arraybang","./Seqbang","./Stream","../../bang","../../compare","../../Try","../q"],function(exports,compare_0,Function_1,methods_2,methods_3,String_4,Kind_5,Method_6,Type_7,_64_8,_64_45Type_9,Number_10,show_11,_63_12,Array_33_13,Seq_33_14,Stream_15,_33_16,compare_17,Try_18,_63_19){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(Function_1),Pred=_ms.get(_$3,"Pred"),_$4=_ms.getModule(methods_2),_45=_ms.get(_$4,"-"),_43=_ms.get(_$4,"+"),_$5=_ms.getModule(methods_3),freeze=_ms.get(_$5,"freeze"),sub=_ms.get(_$5,"sub"),_$6=_ms.getModule(String_4),indent=_ms.get(_$6,"indent"),Kind=_ms.getDefaultExport(Kind_5),_$7=_ms.getModule(Kind_5),kind_33=_ms.get(_$7,"kind!"),self_45kind_33=_ms.get(_$7,"self-kind!"),Method=_ms.getDefaultExport(Method_6),_$8=_ms.getModule(Method_6),impl_33=_ms.get(_$8,"impl!"),self_45impl_33=_ms.get(_$8,"self-impl!"),_$9=_ms.getModule(Type_7),_61_62=_ms.get(_$9,"=>"),type_45of=_ms.get(_$9,"type-of"),_64=_ms.getDefaultExport(_64_8),_$10=_ms.getModule(_64_8),_43_43=_ms.get(_$10,"++"),count=_ms.get(_$10,"count"),empty_63=_ms.get(_$10,"empty?"),iterator=_ms.get(_$10,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_9),_$11=_ms.getModule(_64_45Type_9),empty=_ms.get(_$11,"empty"),from_45stream=_ms.get(_$11,"from-stream"),_$13=_ms.lazyGetModule(Number_10),Nat=_ms.lazyProp(_$13,"Nat"),show=_ms.lazy(function(){
			return _ms.getDefaultExport(show_11)
		}),_$15=_ms.lazyGetModule(_63_12),Opt_45_62_63=_ms.lazyProp(_$15,"Opt->?"),un_45_63=_ms.lazyProp(_$15,"un-?"),Array_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Array_33_13)
		}),_$17=_ms.lazyGetModule(Seq_33_14),_43_43_62_33=_ms.lazyProp(_$17,"++>!"),Stream=_ms.lazy(function(){
			return _ms.getDefaultExport(Stream_15)
		}),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_16)
		}),_$20=_ms.lazyGetModule(_33_16),_33not=_ms.lazyProp(_$20,"!not"),_$21=_ms.lazyGetModule(compare_17),_60_63=_ms.lazyProp(_$21,"<?"),_$22=_ms.lazyGetModule(Try_18),fails_63=_ms.lazyProp(_$22,"fails?"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_19)
		});
		const Seq=Kind(function(){
			const built={};
			const doc=built.doc=`@ whose values are in a meaningful order.`;
			return _ms.setName(built,"Seq")
		}());
		kind_33(Seq,_64);
		self_45kind_33(Seq,_64_45Type);
		self_45impl_33(empty,Seq,function(){
			return empty(Array)
		});
		const _60_43_43_39=exports["<++'"]=Method(function(){
			const built={};
			const doc=built.doc=`TODO:REST\n(There is no \`++>'\` because \`++\` by default adds to the right for Seqs.)`;
			const test=built.test=function test(){};
			const args=built.args=2;
			const _default=built.default=function _default(_,left_45added){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(_64,left_45added,"left-added");
				return _61_62(type_45of(_),_43_43(left_45added,_))
			};
			return _ms.setName(built,"<++'")
		}());
		const first=exports.first=function(){
			const built={};
			const doc=built.doc=`First value in iteration order.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[1,2]],1);
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return first([])
				});
				return built
			};
			return _ms.set(function first(_){
				return _ms.unlazy(un_45_63)(_63first(_),`Can not take first of empty.`)
			},built)
		}();
		const _63first=exports["?first"]=Method(function(){
			const built={};
			const doc=built.doc=`First value in iteration order, if non-empty.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[1,2]],_ms.unlazy(_63)(1));
				_ms.assoc(built,[[]],empty(_ms.unlazy(_63)));
				return built
			};
			const args=built.args=1;
			const _default=built.default=function _default(_){
				return _63nth(_,0)
			};
			return _ms.setName(built,"?first")
		}());
		const last=exports.last=function(){
			const built={};
			const doc=built.doc=`Last value in iteration order.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[1,2]],2);
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return last([])
				});
				return built
			};
			const args=built.args=1;
			return _ms.set(function last(_){
				return _ms.unlazy(un_45_63)(_63last(_),`Can not take last of empty.`)
			},built)
		}();
		const _63last=exports["?last"]=Method(function(){
			const built={};
			const doc=built.doc=`Last value in iteration order, if non-empty.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[1,2]],_ms.unlazy(_63)(2));
				_ms.assoc(built,[[]],empty(_ms.unlazy(_63)));
				return built
			};
			const args=built.args=1;
			const _default=built.default=function _default(_){
				return _ms.bool(empty_63(_))?_ms.None:_ms.some(function(){
					return _ms.sub(_,_45(count(_),1))
				}())
			};
			return _ms.setName(built,"?last")
		}());
		const tail=exports.tail=Method(function(){
			const built={};
			const doc=built.doc=`All elements but the first.\nTODO: Eager for Linked-Lists.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[1,2]],[2]);
				_ms.assoc(built,[[]],[]);
				return built
			};
			const args=built.args=1;
			const _default=built.default=function _default(_){
				return function(){
					if(_ms.bool(empty_63(_))){
						return _
					} else {
						return drop(_,1)
					}
				}()
			};
			return _ms.setName(built,"tail")
		}());
		const rtail=exports.rtail=Method(function(){
			const built={};
			const doc=built.doc=`All elements but the last.\nTODO: Eager for finger trees.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[1,2]],[1]);
				_ms.assoc(built,[[]],[]);
				return built
			};
			const args=built.args=1;
			const _default=built.default=function _default(_){
				return function(){
					if(_ms.bool(empty_63(_))){
						return _
					} else {
						return take(_,_45(count(_),1))
					}
				}()
			};
			return _ms.setName(built,"rtail")
		}());
		const seq_61_63=exports["seq=?"]=function(){
			const built={};
			const doc=built.doc=`Whether two @s share the same elements in the same order.\nThe types of the @s do not matter.\nEquivalent to \`=? (=> Array @a) (=> Array @b)\`, but may not have to fully unlazy both.`;
			const test=built.test=function test(){
				const s=_ms.unlazy(Stream)(function*(){
					(yield 1)
				});
				_ms.unlazy(_33)(seq_61_63,s,[1]);
				return _ms.unlazy(_33not)(seq_61_63,s,[2])
			};
			return _ms.set(function seq_61_63(_64a,_64b){
				_ms.checkContains(_64,_64a,"@a");
				_ms.checkContains(_64,_64b,"@b");
				const iter_45a=iterator(_64a);
				const iter_45b=iterator(_64b);
				return function(){
					for(;;){
						const next_45a=iter_45a.next();
						const next_45b=iter_45b.next();
						if(_ms.bool(next_45a.done)){
							return next_45b.done
						} else if(_ms.bool(next_45b.done)){
							return false
						} else if(_ms.bool(_61_63(next_45a.value,next_45b.value))){} else {
							return false
						}
					}
				}()
			},built)
		}();
		const _63nth=exports["?nth"]=Method(function(){
			const built={};
			const doc=built.doc=`|_ n:Nat\n\`n\`th element in iteration order, if there are at least that many values.\n0th is the first."`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[0,1],1],_ms.unlazy(_63)(1));
				_ms.assoc(built,[[0,1],2],empty(_ms.unlazy(_63)));
				return built
			};
			const args=built.args=function(){
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`n`,_ms.unlazy(Nat)]);
				return built
			}();
			const _default=built.default=function _default(_,n){
				let i=0;
				return _ms.unlazy(Opt_45_62_63)(function(){
					for(let _ of _){
						if(_ms.bool(_61_63(i,n))){
							return _
						} else {
							i=_43(1,i)
						}
					}
				}())
			};
			return _ms.setName(built,"?nth")
		}());
		impl_33(sub,Seq,function(){
			const built={};
			const doc=built.doc=`Nth value in iteration order.`;
			const test=built.test=function test(){
				_ms.unlazy(_33)(_61_63,_ms.sub([0,1],1),1);
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return _ms.sub([0,1],2)
				})
			};
			return _ms.set(function(_,n){
				_ms.checkContains(_ms.unlazy(Nat),n,"n");
				return _ms.unlazy(un_45_63)(_63nth(_,n),_ms.lazy(function(){
					return `No element at index ${_ms.show(n)} for\n\t${_ms.show(indent(_ms.unlazy(show)(_)))}`
				}))
			},built)
		}());
		const slice_45args=function(){
			const built=[];
			_ms.add(built,`_`);
			_ms.add(built,[`start`,_ms.unlazy(Nat)]);
			_ms.add(built,[`end`,_ms.unlazy(Nat)]);
			return built
		}();
		const slice=exports.slice=Method(function(){
			const built={};
			const doc=built.doc=`The elements from index start (inclusive) to end (exclusive).\nTakes as much as possible.\nResult length should be - end start, unless \`end\` was past the end.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[0,1,2,3],1,3],[1,2]);
				return built
			};
			const args=built.args=slice_45args;
			const _default=built.default=function _default(_,start,end){
				return _61_62(type_45of(_),slice_39(_,start,end))
			};
			return _ms.setName(built,"slice")
		}());
		const slice_39=exports["slice'"]=function(){
			const built={};
			const doc=built.doc=`Lazy slice.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[0,1,2,3],1,3],_61_62(_ms.unlazy(Stream),[1,2]));
				return built
			};
			const args=built.args=slice_45args;
			return _ms.set(function slice_39(_,start,end){
				return _ms.checkContains(_64,take_39(drop_39(_,start),_45(end,start)),"res")
			},built)
		}();
		const take=exports.take=Method(function(){
			const built={};
			const doc=built.doc=`TODO`;
			const args=built.args=function(){
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`count-to-take`,_ms.unlazy(Nat)]);
				return built
			}();
			const _default=built.default=function _default(_,count_45to_45take){
				return _61_62(type_45of(_),take_39(_,count_45to_45take))
			};
			return _ms.setName(built,"take")
		}());
		const take_39=exports["take'"]=function(){
			const built={};
			const doc=built.doc=`Stream including only the first count-to-take elements.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[0,1,2],2],_61_62(_ms.unlazy(Stream),[0,1]));
				_ms.assoc(built,[[0],2],_61_62(_ms.unlazy(Stream),[0]));
				const _=[0,1,2,3,4];
				_ms.unlazy(_33)(seq_61_63,_,_43_43(take_39(_,2),drop_39(_,2)));
				return built
			};
			return _ms.set(function take_39(_,count_45to_45take){
				_ms.checkContains(_ms.unlazy(Nat),count_45to_45take,"count-to-take");
				return function(){
					if(_ms.bool(_61_63(0,count_45to_45take))){
						return empty(_ms.unlazy(Stream))
					} else {
						return _ms.unlazy(Stream)(function*(){
							let n=count_45to_45take;
							for(let _ of _){
								(yield _);
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
		const take_45while_39=exports["take-while'"]=function(){
			const built={};
			const doc=built.doc=`Stream stopping (and not including) the first element not satisfying while?.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[1,2,- 1,3],_ms.sub(_ms.unlazy(_60_63),0)],_61_62(_ms.unlazy(Stream),[1,2]));
				return built
			};
			return _ms.set(function take_45while_39(_,while_63){
				_ms.checkContains(Pred,while_63,"while?");
				return _ms.unlazy(Stream)(function*(){
					for(let _ of _){
						if(! _ms.bool(while_63(_))){
							break
						};
						(yield _)
					}
				})
			},built)
		}();
		const drop=exports.drop=Method(function(){
			const built={};
			const doc=built.doc=`TODO`;
			const args=built.args=function(){
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`count-to-drop`,_ms.unlazy(Nat)]);
				return built
			}();
			const _default=built.default=function _default(_,count_45to_45drop){
				return _61_62(type_45of(_),drop_39(_,count_45to_45drop))
			};
			return _ms.setName(built,"drop")
		}());
		const drop_39=exports["drop'"]=function(){
			const built={};
			const doc=built.doc=`Stream without the first count-to-drop elements.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[0,1,2,3],2],_61_62(_ms.unlazy(Stream),[2,3]));
				return built
			};
			return _ms.set(function drop_39(_,count_45to_45drop){
				return _ms.unlazy(Stream)(function*(){
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
		const zip=exports.zip=function(){
			const built={};
			const doc=built.doc=`Type-preserving zip.`;
			const test=built.test=function test(){
				const built=new global.Map();
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
		const zip_39=exports["zip'"]=function(){
			const built={};
			const doc=built.doc=`Seq of zipper applied to corresponding elements of @a and @b.\nEnds as soon as either of them does, discarding extra elements.\n(Corresponding means: with the same index.)`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[1,2],[10,20,30],_43],_61_62(_ms.unlazy(Stream),[11,22]));
				return built
			};
			return _ms.set(function zip_39(_64a,_64b,zipper){
				_ms.checkContains(_64,_64a,"@a");
				_ms.checkContains(_64,_64b,"@b");
				_ms.checkContains(_ms.sub(Function,2),zipper,"zipper");
				return _ms.unlazy(Stream)(function*(){
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
		const groups_45of_39=exports["groups-of'"]=function(){
			const built={};
			const doc=built.doc=`Seq of consecutive groups of \`group-size\` elements.`;
			const test=built.test=function test(){
				_ms.unlazy(_33)(seq_61_63,[[1,2],[3,4]],groups_45of_39(2,[1,2,3,4]));
				_ms.unlazy(_33)(seq_61_63,[[1,2,3]],groups_45of_39(3,[1,2,3,4]));
				_ms.unlazy(_33)(seq_61_63,[[],[],[]],take_39(groups_45of_39(0,[1]),3))
			};
			return _ms.set(function groups_45of_39(group_45size,_){
				_ms.checkContains(_ms.unlazy(Nat),group_45size,"group-size");
				return _ms.checkContains(_ms.sub(Seq,Array),function(){
					if(_ms.bool(_61_63(group_45size,0))){
						return _ms.unlazy(Stream)(function*(){
							for(;;){
								(yield [])
							}
						})
					} else {
						return _ms.unlazy(Stream)(function*(){
							const iter=iterator(_);
							for(;;){
								const next_45group=empty(_ms.unlazy(Array_33));
								for(;;){
									const _$319=iter.next(),value=_$319.value,done=_$319.done;
									if(done){
										break
									};
									_ms.unlazy(_43_43_62_33)(next_45group,[value]);
									if(_61_63(group_45size,count(next_45group))){
										break
									}
								};
								if(! _ms.bool(_61_63(group_45size,count(next_45group)))){
									break
								};
								(yield freeze(next_45group))
							}
						})
					}
				}(),"res")
			},built)
		}();
		const reverse=exports.reverse=Method(function(){
			const built={};
			const doc=built.doc=`Seq with the opposite order.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[1,2]],[2,1]);
				return built
			};
			const args=built.args=1;
			const _default=built.default=function _default(_){
				return from_45stream(_ms.unlazy(Array_33),_).reverse()
			};
			return _ms.setName(built,"reverse")
		}());
		const split_39=exports["split'"]=function(){
			const built={};
			const doc=built.doc=`Subseqs separated by elements where split? is true.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[1,0,1],_ms.sub(_61_63,0)],_61_62(_ms.unlazy(Stream),[[1],[1]]));
				_ms.assoc(built,[[0],_ms.sub(_61_63,0)],_61_62(_ms.unlazy(Stream),[[],[]]));
				return built
			};
			return _ms.set(function split_39(_,split_63){
				_ms.checkContains(Pred,split_63,"split?");
				return _ms.unlazy(Stream)(function*(){
					const iter=iterator(_);
					let prev_45idx=0;
					let cur_45idx=0;
					for(;;){
						const _$351=iter.next(),value=_$351.value,done=_$351.done;
						const next_45idx=_ms.lazy(function(){
							return _43(1,cur_45idx)
						});
						if(_ms.bool(done)){
							(yield slice(_,prev_45idx,cur_45idx));
							break
						} else if(_ms.bool(split_63(value))){
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
		const name=exports.name=`Seq`;
		exports.default=Seq;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9TZXEubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0VBd0JBLFVBQUssZUFDSTs7R0FBUixvQkFBTTs7O0VBRVAsUUFBTSxJQUFJO0VBRVYsZUFBVyxJQUFJO0VBQ2YsZUFBVyxNQUFNLElBQ0ssVUFBQTtVQUFyQixNQUFNO0VBQUE7RUFJTixtQ0FBTSxpQkFDTTs7R0FBWCxvQkFDQztHQUVELHNCQUNRLGVBQUE7R0FDUixzQkFBTTtHQUNOLDZCQUFVLGtCQUFBLEVBQUksYUFDWTtzQkFEZDtzQkFBYTtXQUN4QixPQUFHLFVBQU8sR0FBRyxPQUFHLGFBQVc7R0FBQTs7O0VBRzdCLG9DQUNNOztHQUFMLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxDQUFFLEVBQUUsSUFBUzt5Q0FFTCxVQUFBO1lBQVQsTUFBTTtJQUFBOzs7a0JBQ1AsZUFBQSxFQUNDO2dDQUFJLFNBQU0sR0FBRzs7O0VBRWhCLGlDQUFRLGlCQUNNOztHQUFiLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxDQUFFLEVBQUUsb0JBQVc7b0JBQ2pCLENBQUUsSUFBUzs7O0dBQ1osc0JBQU07R0FDTiw2QkFBVSxrQkFBQSxFQUNDO1dBQVYsT0FBSyxFQUFFO0dBQUE7OztFQUVULGtDQUNLOztHQUFKLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxDQUFFLEVBQUUsSUFBUzt5Q0FFTCxVQUFBO1lBQVQsS0FBSztJQUFBOzs7R0FDUCxzQkFBTTtrQkFDTCxjQUFBLEVBQ0M7Z0NBQUksUUFBSyxHQUFHOzs7RUFFZiwrQkFBTyxpQkFDTTs7R0FBWixvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsQ0FBRSxFQUFFLG9CQUFXO29CQUNqQixDQUFFLElBQVM7OztHQUNaLHNCQUFNO0dBQ04sNkJBQVUsa0JBQUEsRUFDQztvQkFBSCxT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