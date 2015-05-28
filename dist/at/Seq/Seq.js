"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Boolean","../../compare","../../Function","../../math/methods","../../methods","../../String","../../Type/Kind","../../Type/Method","../../Type/Type","../at","../at-Type","../../math/Number","../../show","../q","./Arraybang","./Seqbang","./Stream","../../bang","../../compare","../../Try","../q"],function(exports,Boolean_0,compare_1,Function_2,methods_3,methods_4,String_5,Kind_6,Method_7,Type_8,_64_9,_64_45Type_10,Number_11,show_12,_63_13,Array_33_14,Seq_33_15,Stream_16,_33_17,compare_18,Try_19,_63_20){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),not=_ms.get(_$2,"not"),_$3=_ms.getModule(compare_1),_61_63=_ms.get(_$3,"=?"),_$4=_ms.getModule(Function_2),Pred=_ms.get(_$4,"Pred"),_$5=_ms.getModule(methods_3),_45=_ms.get(_$5,"-"),_43=_ms.get(_$5,"+"),_$6=_ms.getModule(methods_4),freeze=_ms.get(_$6,"freeze"),sub=_ms.get(_$6,"sub"),_$7=_ms.getModule(String_5),indent=_ms.get(_$7,"indent"),Kind=_ms.getDefaultExport(Kind_6),_$8=_ms.getModule(Kind_6),kind_33=_ms.get(_$8,"kind!"),self_45kind_33=_ms.get(_$8,"self-kind!"),Method=_ms.getDefaultExport(Method_7),_$9=_ms.getModule(Method_7),impl_33=_ms.get(_$9,"impl!"),self_45impl_33=_ms.get(_$9,"self-impl!"),_$10=_ms.getModule(Type_8),_61_62=_ms.get(_$10,"=>"),type_45of=_ms.get(_$10,"type-of"),_64=_ms.getDefaultExport(_64_9),_$11=_ms.getModule(_64_9),_43_43=_ms.get(_$11,"++"),count=_ms.get(_$11,"count"),empty_63=_ms.get(_$11,"empty?"),iterator=_ms.get(_$11,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_10),_$12=_ms.getModule(_64_45Type_10),empty=_ms.get(_$12,"empty"),from_45stream=_ms.get(_$12,"from-stream"),_$14=_ms.lazyGetModule(Number_11),Nat=_ms.lazyProp(_$14,"Nat"),show=_ms.lazy(function(){
			return _ms.getDefaultExport(show_12)
		}),_$16=_ms.lazyGetModule(_63_13),Opt_45_62_63=_ms.lazyProp(_$16,"Opt->?"),un_45_63=_ms.lazyProp(_$16,"un-?"),Array_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Array_33_14)
		}),_$18=_ms.lazyGetModule(Seq_33_15),_43_43_62_33=_ms.lazyProp(_$18,"++>!"),Stream=_ms.lazy(function(){
			return _ms.getDefaultExport(Stream_16)
		}),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_17)
		}),_$21=_ms.lazyGetModule(_33_17),_33not=_ms.lazyProp(_$21,"!not"),_$22=_ms.lazyGetModule(compare_18),_60_63=_ms.lazyProp(_$22,"<?"),_$23=_ms.lazyGetModule(Try_19),fails_63=_ms.lazyProp(_$23,"fails?"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_20)
		});
		const Seq=Kind(function(){
			const built={};
			const doc=built.doc="@ whose values are in a meaningful order.";
			return _ms.setName(built,"Seq")
		}());
		kind_33(Seq,_64);
		self_45kind_33(Seq,_64_45Type);
		self_45impl_33(empty,Seq,function(){
			return empty(Array)
		});
		const _60_43_43_39=exports["<++'"]=Method(function(){
			const built={};
			const doc=built.doc="TODO:REST\n(There is no `++>'` because `++` by default adds to the right for Seqs.)";
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
			const doc=built.doc="First value in iteration order.";
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[1,2]],1);
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return first([])
				});
				return built
			};
			return _ms.set(function first(_){
				return _ms.unlazy(un_45_63)(_63first(_),"Can not take first of empty.")
			},built)
		}();
		const _63first=exports["?first"]=Method(function(){
			const built={};
			const doc=built.doc="First value in iteration order, if non-empty.";
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
			const doc=built.doc="Last value in iteration order.";
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
				return _ms.unlazy(un_45_63)(_63last(_),"Can not take last of empty.")
			},built)
		}();
		const _63last=exports["?last"]=Method(function(){
			const built={};
			const doc=built.doc="Last value in iteration order, if non-empty.";
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[1,2]],_ms.unlazy(_63)(2));
				_ms.assoc(built,[[]],empty(_ms.unlazy(_63)));
				return built
			};
			const args=built.args=1;
			const _default=built.default=function _default(_){
				return _ms.bool(not(empty_63(_)))?_ms.some(function(){
					return _ms.sub(_,_45(count(_),1))
				}()):_ms.None
			};
			return _ms.setName(built,"?last")
		}());
		const tail=exports.tail=Method(function(){
			const built={};
			const doc=built.doc="All elements but the first.\nTODO: Eager for Linked-Lists.";
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
			const doc=built.doc="All elements but the last.\nTODO: Eager for finger trees.";
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
			const doc=built.doc="Whether two @s share the same elements in the same order.\nThe types of the @s do not matter.\nEquivalent to `=? (=> Array @a) (=> Array @b)`, but may not have to fully unlazy both.";
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
			const doc=built.doc="|_ n:Nat\n`n`th element in iteration order, if there are at least that many values.\n0th is the first.\"";
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[0,1],1],_ms.unlazy(_63)(1));
				_ms.assoc(built,[[0,1],2],empty(_ms.unlazy(_63)));
				return built
			};
			const args=built.args=function(){
				const built=[];
				_ms.add(built,"_");
				_ms.add(built,["n",_ms.unlazy(Nat)]);
				return built
			}();
			const _default=built.default=function _default(_,n){
				let i=0;
				return _ms.unlazy(Opt_45_62_63)(function(){
					for(let _ of _[Symbol.iterator]()){
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
			const doc=built.doc="Nth value in iteration order.";
			const test=built.test=function test(){
				_ms.unlazy(_33)(_61_63,_ms.sub([0,1],1),1);
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return _ms.sub([0,1],2)
				})
			};
			return _ms.set(function(_,n){
				_ms.checkContains(_ms.unlazy(Nat),n,"n");
				return _ms.unlazy(un_45_63)(_63nth(_,n),_ms.lazy(function(){
					return ((("No element at index "+_ms.show(n))+" for\n\t")+_ms.show(indent(_ms.unlazy(show)(_))))
				}))
			},built)
		}());
		const slice_45args=function(){
			const built=[];
			_ms.add(built,"_");
			_ms.add(built,["start",_ms.unlazy(Nat)]);
			_ms.add(built,["end",_ms.unlazy(Nat)]);
			return built
		}();
		const slice=exports.slice=Method(function(){
			const built={};
			const doc=built.doc="The elements from index start (inclusive) to end (exclusive).\nTakes as much as possible.\nResult length should be - end start, unless `end` was past the end.";
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
			const doc=built.doc="Lazy slice.";
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
			const doc=built.doc="TODO";
			const args=built.args=function(){
				const built=[];
				_ms.add(built,"_");
				_ms.add(built,["count-to-take",_ms.unlazy(Nat)]);
				return built
			}();
			const _default=built.default=function _default(_,count_45to_45take){
				return _61_62(type_45of(_),take_39(_,count_45to_45take))
			};
			return _ms.setName(built,"take")
		}());
		const take_39=exports["take'"]=function(){
			const built={};
			const doc=built.doc="Stream including only the first count-to-take elements.";
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
							for(let _ of _[Symbol.iterator]()){
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
			const doc=built.doc="Stream stopping (and not including) the first element not satisfying while?.";
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[1,2,- 1,3],_ms.sub(_ms.unlazy(_60_63),0)],_61_62(_ms.unlazy(Stream),[1,2]));
				return built
			};
			return _ms.set(function take_45while_39(_,while_63){
				_ms.checkContains(Pred,while_63,"while?");
				return _ms.unlazy(Stream)(function*(){
					for(let _ of _[Symbol.iterator]()){
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
			const doc=built.doc="TODO";
			const args=built.args=function(){
				const built=[];
				_ms.add(built,"_");
				_ms.add(built,["count-to-drop",_ms.unlazy(Nat)]);
				return built
			}();
			const _default=built.default=function _default(_,count_45to_45drop){
				return _61_62(type_45of(_),drop_39(_,count_45to_45drop))
			};
			return _ms.setName(built,"drop")
		}());
		const drop_39=exports["drop'"]=function(){
			const built={};
			const doc=built.doc="Stream without the first count-to-drop elements.";
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
			const doc=built.doc="Type-preserving zip.";
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
			const doc=built.doc="Seq of zipper applied to corresponding elements of @a and @b.\nEnds as soon as either of them does, discarding extra elements.\n(Corresponding means: with the same index.)";
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
			const doc=built.doc="Seq of consecutive groups of `group-size` elements.";
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
									const _$320=iter.next(),value=_$320.value,done=_$320.done;
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
			const doc=built.doc="Seq with the opposite order.";
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
			const doc=built.doc="Subseqs separated by elements where split? is true.";
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
						const _$352=iter.next(),value=_$352.value,done=_$352.done;
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
		const name=exports.name="Seq";
		exports.default=Seq;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9TZXEubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0VBeUJBLFVBQUssZUFDSTs7R0FBUixvQkFBTTs7O0VBRVAsUUFBTSxJQUFJO0VBRVYsZUFBVyxJQUFJO0VBQ2YsZUFBVyxNQUFNLElBQ0ssVUFBQTtVQUFyQixNQUFNO0VBQUE7RUFJTixtQ0FBTSxpQkFDTTs7R0FBWCxvQkFDQztHQUVELHNCQUNRLGVBQUE7R0FDUixzQkFBTTtHQUNOLDZCQUFVLGtCQUFBLEVBQUksYUFDWTtzQkFEZDtzQkFBYTtXQUN4QixPQUFHLFVBQU8sR0FBRyxPQUFHLGFBQVc7R0FBQTs7O0VBRzdCLG9DQUNNOztHQUFMLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxDQUFFLEVBQUUsSUFBUzt5Q0FFTCxVQUFBO1lBQVQsTUFBTTtJQUFBOzs7a0JBQ1AsZUFBQSxFQUNDO2dDQUFJLFNBQU0sR0FBRztHQUFBOztFQUVoQixpQ0FBUSxpQkFDTTs7R0FBYixvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsQ0FBRSxFQUFFLG9CQUFXO29CQUNqQixDQUFFLElBQVM7OztHQUNaLHNCQUFNO0dBQ04sNkJBQVUsa0JBQUEsRUFDQztXQUFWLE9BQUssRUFBRTtHQUFBOzs7RUFFVCxrQ0FDSzs7R0FBSixvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsQ0FBRSxFQUFFLElBQVM7eUNBRUwsVUFBQTtZQUFULEtBQUs7SUFBQTs7O0dBQ1Asc0JBQU07a0JBQ0wsY0FBQSxFQUNDO2dDQUFJLFFBQUssR0FBRztHQUFBOztFQUVmLCtCQUFPLGlCQUNNOztHQUFaLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxDQUFFLEVBQUUsb0JBQVc7b0JBQ2pCLENBQUUsSUFBUzs7O0dBQ1osc0JBQU07R0FDTiw2QkFBVSxrQkFBQSxFQUND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