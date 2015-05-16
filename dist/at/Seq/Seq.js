"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Boolean","../../compare","../../control","../../Function","../../math/methods","../../methods","../../String","../../Type/Kind","../../Type/Method","../../Type/Type","../at","../at-Type","../../control","../../math/Number","../../show","../q","./Arraybang","./Seqbang","./Stream","../../bang","../../compare","../../Try"],function(exports,Boolean_0,compare_1,control_2,Function_3,methods_4,methods_5,String_6,Kind_7,Method_8,Type_9,_64_10,_64_45Type_11,control_12,Number_13,show_14,_63_15,Array_33_16,Seq_33_17,Stream_18,_33_19,compare_20,Try_21){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),not=_ms.get(_$2,"not"),_$3=_ms.getModule(compare_1),_61_63=_ms.get(_$3,"=?"),_$4=_ms.getModule(control_2),End_45Loop=_ms.get(_$4,"End-Loop"),_if=_ms.get(_$4,"if"),loop=_ms.get(_$4,"loop"),_$5=_ms.getModule(Function_3),Pred=_ms.get(_$5,"Pred"),_$6=_ms.getModule(methods_4),_45=_ms.get(_$6,"-"),_43=_ms.get(_$6,"+"),_$7=_ms.getModule(methods_5),freeze=_ms.get(_$7,"freeze"),sub=_ms.get(_$7,"sub"),_$8=_ms.getModule(String_6),indent=_ms.get(_$8,"indent"),Kind=_ms.getDefaultExport(Kind_7),_$9=_ms.getModule(Kind_7),kind_33=_ms.get(_$9,"kind!"),self_45kind_33=_ms.get(_$9,"self-kind!"),Method=_ms.getDefaultExport(Method_8),_$10=_ms.getModule(Method_8),impl_33=_ms.get(_$10,"impl!"),self_45impl_33=_ms.get(_$10,"self-impl!"),_$11=_ms.getModule(Type_9),_61_62=_ms.get(_$11,"=>"),type_45of=_ms.get(_$11,"type-of"),_64=_ms.getDefaultExport(_64_10),_$12=_ms.getModule(_64_10),_43_43=_ms.get(_$12,"++"),count=_ms.get(_$12,"count"),empty_63=_ms.get(_$12,"empty?"),iterator=_ms.get(_$12,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_11),_$13=_ms.getModule(_64_45Type_11),empty=_ms.get(_$13,"empty"),from_45stream=_ms.get(_$13,"from-stream"),_$15=_ms.lazyGetModule(control_12),Ref_33=_ms.lazyProp(_$15,"Ref!"),get=_ms.lazyProp(_$15,"get"),mod_33=_ms.lazyProp(_$15,"mod!"),set_33=_ms.lazyProp(_$15,"set!"),_$16=_ms.lazyGetModule(Number_13),Nat=_ms.lazyProp(_$16,"Nat"),show=_ms.lazy(function(){
			return _ms.getDefaultExport(show_14)
		}),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_15)
		}),_$18=_ms.lazyGetModule(_63_15),un_45_63=_ms.lazyProp(_$18,"un-?"),Array_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Array_33_16)
		}),_$20=_ms.lazyGetModule(Seq_33_17),_43_43_62_33=_ms.lazyProp(_$20,"++>!"),Stream=_ms.lazy(function(){
			return _ms.getDefaultExport(Stream_18)
		}),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_19)
		}),_$23=_ms.lazyGetModule(_33_19),_33not=_ms.lazyProp(_$23,"!not"),_$24=_ms.lazyGetModule(compare_20),_60_63=_ms.lazyProp(_$24,"<?"),_$25=_ms.lazyGetModule(Try_21),fails_63=_ms.lazyProp(_$25,"fails?");
		const Seq=Kind(function(){
			const doc="@ whose values are in a meaningful order.";
			return {
				doc:doc,
				name:"Seq"
			}
		}());
		kind_33(Seq,_64);
		self_45kind_33(Seq,_64_45Type);
		self_45impl_33(empty,Seq,function(){
			return empty(Array)
		});
		const _60_43_43_39=exports["<++'"]=Method(function(){
			const doc="TODO:REST\n(There is no `++>'` because `++` by default adds to the right for Seqs.)";
			const test=function test(){
				return "TODO"
			};
			const args=2;
			const _default=function _default(_,left_45added){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(_64,left_45added,"left-added");
				return _61_62(type_45of(_),_43_43(left_45added,_))
			};
			return {
				doc:doc,
				test:test,
				args:args,
				default:_default,
				name:"<++'"
			}
		}());
		const first=exports.first=function(){
			const doc="First value in iteration order.";
			const test=function test(){
				const _k0=[[1,2]],_v0=1;
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return first([])
				});
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function first(_){
				return _ms.unlazy(un_45_63)(_63first(_),"Can not take first of empty.")
			},"doc",doc,"test",test)
		}();
		const _63first=exports["?first"]=Method(function(){
			const doc="First value in iteration order, if non-empty.";
			const test=function test(){
				const _k0=[[1,2]],_v0=_ms.unlazy(_63)(1);
				const _k1=[[]],_v1=empty(_ms.unlazy(_63));
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			const args=1;
			const _default=function _default(_){
				return _63nth(_,0)
			};
			return {
				doc:doc,
				test:test,
				args:args,
				default:_default,
				name:"?first"
			}
		}());
		const last=exports.last=function(){
			const doc="Last value in iteration order.";
			const test=function test(){
				const _k0=[[1,2]],_v0=2;
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return last([])
				});
				return _ms.map(_k0,_v0)
			};
			const args=1;
			return _ms.set(function last(_){
				return _ms.unlazy(un_45_63)(_63last(_),"Can not take `last` of empty.")
			},"doc",doc,"test",test,"args",args)
		}();
		const _63last=exports["?last"]=Method(function(){
			const doc="Last value in iteration order, if non-empty.";
			const test=function test(){
				const _k0=[[1,2]],_v0=_ms.unlazy(_63)(2);
				const _k1=[[]],_v1=empty(_ms.unlazy(_63));
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			const args=1;
			const _default=function _default(_){
				return _if(not(empty_63(_)),_ms.lazy(function(){
					return _ms.sub(_,_45(count(_),1))
				}))
			};
			return {
				doc:doc,
				test:test,
				args:args,
				default:_default,
				name:"?last"
			}
		}());
		const tail=exports.tail=Method(function(){
			const doc="All elements but the first.\nTODO: Eager for Linked-Lists.";
			const test=function test(){
				const _k0=[[1,2]],_v0=_61_62(_ms.unlazy(Stream),[2]);
				const _k1=[[]],_v1=[];
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			const args=1;
			const _default=function _default(_){
				return function(){
					if(_ms.bool(empty_63(_))){
						return _
					} else {
						return drop_39(_,1)
					}
				}()
			};
			return {
				doc:doc,
				test:test,
				args:args,
				default:_default,
				name:"tail"
			}
		}());
		const rtail=exports.rtail=Method(function(){
			const doc="All elements but the last.\nTODO: Eager for finger trees.";
			const test=function test(){
				const _k0=[[1,2]],_v0=_61_62(_ms.unlazy(Stream),[1]);
				const _k1=[[]],_v1=[];
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			const args=1;
			const _default=function _default(_){
				return function(){
					if(_ms.bool(empty_63(_))){
						return _
					} else {
						return take_39(_,_45(count(_),1))
					}
				}()
			};
			return {
				doc:doc,
				test:test,
				args:args,
				default:_default,
				name:"rtail"
			}
		}());
		const seq_61_63=exports["seq=?"]=function(){
			const doc="Whether two @s share the same elements in the same order.\nThe types of the @s do not matter.\nEquivalent to `=? (=> Array @a) (=> Array @b)`, but may not have to fully unlazy both.";
			const test=function test(){
				const s=_ms.unlazy(Stream)(function*(){
					return (yield 1)
				});
				_ms.unlazy(_33)(seq_61_63,s,[1]);
				return _ms.unlazy(_33not)(seq_61_63,s,[2])
			};
			return _ms.set(function seq_61_63(_64a,_64b){
				_ms.checkContains(_64,_64a,"@a");
				_ms.checkContains(_64,_64b,"@b");
				const iter_45a=iterator(_64a);
				const iter_45b=iterator(_64b);
				return loop(null,function(){
					const next_45a=iter_45a.next();
					const next_45b=iter_45b.next();
					return function(){
						if(_ms.bool(next_45a.done)){
							return End_45Loop(next_45b.done)
						} else if(_ms.bool(next_45b.done)){
							return End_45Loop(false)
						} else if(_ms.bool(not(_61_63(next_45a.value,next_45b.value)))){
							return End_45Loop(false)
						} else {
							return null
						}
					}()
				})
			},"doc",doc,"test",test)
		}();
		const _63nth=exports["?nth"]=Method(function(){
			const doc="|_ n:Nat\n`n`th element in iteration order, if there are at least that many values.\n0th is the first.\"";
			const test=function test(){
				const _k0=[[0,1],1],_v0=_ms.unlazy(_63)(1);
				const _k1=[[0,1],2],_v1=empty(_ms.unlazy(_63));
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			const args=function(){
				const _0="_";
				const _1=["n",_ms.unlazy(Nat)];
				return [_0,_1]
			}();
			const _default=function _default(_,n){
				const iter=iterator(_);
				const i=_ms.unlazy(Ref_33)(0);
				const ans=_ms.unlazy(Ref_33)(empty(_ms.unlazy(_63)));
				loop157:while(true){
					const _$158=iter.next(),value=_$158.value,done=_$158.done;
					if(_ms.bool(done)){
						break loop157
					} else if(_ms.bool(_61_63(_ms.unlazy(get)(i),n))){
						_ms.unlazy(set_33)(ans,_ms.unlazy(_63)(value));
						break loop157
					} else {
						_ms.unlazy(mod_33)(i,_ms.sub(_43,1))
					}
				};
				return _ms.unlazy(get)(ans)
			};
			return {
				doc:doc,
				test:test,
				args:args,
				default:_default,
				name:"?nth"
			}
		}());
		impl_33(sub,Seq,function(){
			const doc="Nth value in iteration order.";
			const test=function test(){
				_ms.unlazy(_33)(_61_63,_ms.sub([0,1],1),1);
				return _ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return _ms.sub([0,1],2)
				})
			};
			return _ms.set(function(_,n){
				_ms.checkContains(_ms.unlazy(Nat),n,"n");
				return _ms.unlazy(un_45_63)(_63nth(_,n),_ms.lazy(function(){
					return ((("No element at index "+_ms.show(n))+" for\n\t")+_ms.show(indent(_ms.unlazy(show)(_))))
				}))
			},"doc",doc,"test",test)
		}());
		const slice_45args=function(){
			const _0="_";
			const _1=["start",_ms.unlazy(Nat)];
			const _2=["end",_ms.unlazy(Nat)];
			return [_0,_1,_2]
		}();
		const slice=exports.slice=Method(function(){
			const doc="The elements from index start (inclusive) to end (exclusive).\nTakes as much as possible.\nResult length should be - end start, unless `end` was past the end.";
			const test=function test(){
				const _k0=[[0,1,2,3],1,3],_v0=[1,2];
				return _ms.map(_k0,_v0)
			};
			const args=slice_45args;
			const _default=function _default(_,start,end){
				return _61_62(type_45of(_),slice_39(_,start,end))
			};
			return {
				doc:doc,
				test:test,
				args:args,
				default:_default,
				name:"slice"
			}
		}());
		const slice_39=exports["slice'"]=function(){
			const doc="Lazy slice.";
			const test=function test(){
				const _k0=[[0,1,2,3],1,3],_v0=_61_62(_ms.unlazy(Stream),[1,2]);
				return _ms.map(_k0,_v0)
			};
			const args=slice_45args;
			return _ms.set(function slice_39(_,start,end){
				return _ms.checkContains(_64,take_39(drop_39(_,start),_45(end,start)),"res")
			},"doc",doc,"test",test,"args",args)
		}();
		const take_39=exports["take'"]=function(){
			const doc="Stream including only the first count-to-take elements.";
			const test=function test(){
				const _k0=[[0,1,2],2],_v0=_61_62(_ms.unlazy(Stream),[0,1]);
				const _k1=[[0],2],_v1=_61_62(_ms.unlazy(Stream),[0]);
				const _=[0,1,2,3,4];
				_ms.unlazy(_33)(seq_61_63,_,_43_43(take_39(_,2),drop_39(_,2)));
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function take_39(_,count_45to_45take){
				_ms.checkContains(_ms.unlazy(Nat),count_45to_45take,"count-to-take");
				return _ms.unlazy(Stream)(function*(){
					const iter=iterator(_);
					const i=_ms.unlazy(Ref_33)(0);
					loop218:while(true){
						if(_ms.bool(_61_63(_ms.unlazy(get)(i),count_45to_45take))){
							break loop218
						} else {
							const _$223=iter.next(),value=_$223.value,done=_$223.done;
							if(_ms.bool(done)){
								break loop218
							} else {
								(yield value);
								_ms.unlazy(mod_33)(i,_ms.sub(_43,1))
							}
						}
					}
				})
			},"doc",doc,"test",test)
		}();
		const take_45while_39=exports["take-while'"]=function(){
			const doc="Stream stopping (and not including) the first element not satisfying while?.";
			const test=function test(){
				const _k0=[[1,2,- 1,3],_ms.sub(_ms.unlazy(_60_63),0)],_v0=_61_62(_ms.unlazy(Stream),[1,2]);
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function take_45while_39(_,while_63){
				_ms.checkContains(Pred,while_63,"while?");
				return _ms.unlazy(Stream)(function*(){
					const iter=iterator(_);
					loop238:while(true){
						const _$239=iter.next(),value=_$239.value,done=_$239.done;
						if(_ms.bool(done)){
							break loop238
						} else if(_ms.bool(while_63(value))){
							(yield value)
						} else {
							break loop238
						}
					}
				})
			},"doc",doc,"test",test)
		}();
		const drop_39=exports["drop'"]=Method(function(){
			const doc="Stream without the first count-to-drop elements.";
			const test=function test(){
				const _k0=[[0,1,2,3],2],_v0=_61_62(_ms.unlazy(Stream),[2,3]);
				return _ms.map(_k0,_v0)
			};
			const args=function(){
				const _0="_";
				const _1=["count-to-drop",_ms.unlazy(Nat)];
				return [_0,_1]
			}();
			const _default=function _default(_,count_45to_45drop){
				return _ms.unlazy(Stream)(function*(){
					const iter=iterator(_);
					const i=_ms.unlazy(Ref_33)(0);
					loop260:while(true){
						if(_ms.bool(_61_63(_ms.unlazy(get)(i),count_45to_45drop))){
							break loop260
						} else {
							if(_ms.bool(iter.next().done)){
								break loop260
							} else {
								_ms.unlazy(mod_33)(i,_ms.sub(_43,1))
							}
						}
					};
					return (yield* iter)
				})
			};
			return {
				doc:doc,
				test:test,
				args:args,
				default:_default,
				name:"drop'"
			}
		}());
		const zip=exports.zip=function(){
			const doc="Type-preserving zip.";
			const test=function test(){
				const _k0=[[1,2],[10,20],_43],_v0=[11,22];
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function zip(_64a,_64b,zipper){
				_ms.checkContains(_64,_64a,"@a");
				_ms.checkContains(_64,_64b,"@b");
				_ms.checkContains(_ms.sub(Function,2),zipper,"zipper");
				return _61_62(type_45of(_64a),zip_39(_64a,_64b,zipper))
			},"doc",doc,"test",test)
		}();
		const zip_39=exports["zip'"]=function(){
			const doc="Seq of zipper applied to corresponding elements of @a and @b.\nEnds as soon as either of them does, discarding extra elements.\n(Corresponding means: with the same index.)";
			const test=function test(){
				const _k0=[[1,2],[10,20,30],_43],_v0=_61_62(_ms.unlazy(Stream),[11,22]);
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function zip_39(_64a,_64b,zipper){
				_ms.checkContains(_64,_64a,"@a");
				_ms.checkContains(_64,_64b,"@b");
				_ms.checkContains(_ms.sub(Function,2),zipper,"zipper");
				return _ms.unlazy(Stream)(function*(){
					const iter_45a=iterator(_64a);
					const iter_45b=iterator(_64b);
					loop293:while(true){
						const next_45a=iter_45a.next();
						if(_ms.bool(next_45a.done)){
							break loop293
						} else {
							const next_45b=iter_45b.next();
							if(_ms.bool(next_45b.done)){
								break loop293
							} else {
								(yield zipper(next_45a.value,next_45b.value))
							}
						}
					}
				})
			},"doc",doc,"test",test)
		}();
		const groups_45of_39=exports["groups-of'"]=function(){
			const doc="Seq of consecutive groups of `group-size` elements.";
			const test=function test(){
				_ms.unlazy(_33)(seq_61_63,[[1,2],[3,4]],groups_45of_39(2,[1,2,3,4]));
				_ms.unlazy(_33)(seq_61_63,[[1,2,3]],groups_45of_39(3,[1,2,3,4]));
				return _ms.unlazy(_33)(seq_61_63,[[],[],[]],take_39(groups_45of_39(0,[1]),3))
			};
			return _ms.set(function groups_45of_39(group_45size,_){
				_ms.checkContains(_ms.unlazy(Nat),group_45size,"group-size");
				return _ms.checkContains(_ms.sub(Seq,Array),function(){
					if(_ms.bool(_61_63(group_45size,0))){
						return _ms.unlazy(Stream)(function*(){
							loop319:while(true){
								(yield [])
							}
						})
					} else {
						return _ms.unlazy(Stream)(function*(){
							const iter=iterator(_);
							loop324:while(true){
								const next_45group=empty(_ms.unlazy(Array_33));
								loop326:while(true){
									const _$327=iter.next(),value=_$327.value,done=_$327.done;
									if(_ms.bool(done)){
										break loop326
									} else {
										_ms.unlazy(_43_43_62_33)(next_45group,[value]);
										{
											const _=count(next_45group);
											if(_ms.bool(_61_63(_,group_45size))){
												break loop326
											} else {}
										}
									}
								};
								{
									const _=count(next_45group);
									if(_ms.bool(_61_63(_,group_45size))){
										(yield freeze(next_45group))
									} else {
										break loop324
									}
								}
							}
						})
					}
				}(),"res")
			},"doc",doc,"test",test)
		}();
		const reverse=exports.reverse=Method(function(){
			const doc="Seq with the opposite order.";
			const test=function test(){
				const _k0=[[1,2]],_v0=[2,1];
				return _ms.map(_k0,_v0)
			};
			const args=1;
			const _default=function _default(_){
				return from_45stream(_ms.unlazy(Array_33),_).reverse()
			};
			return {
				doc:doc,
				test:test,
				args:args,
				default:_default,
				name:"reverse"
			}
		}());
		const split_39=exports["split'"]=function(){
			const doc="Subseqs separated by elements where split? is true.";
			const test=function test(){
				const _k0=[[1,0,1],_ms.sub(_61_63,0)],_v0=_61_62(_ms.unlazy(Stream),[[1],[1]]);
				const _k1=[[0],_ms.sub(_61_63,0)],_v1=_61_62(_ms.unlazy(Stream),[[],[]]);
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function split_39(_,split_63){
				_ms.checkContains(Pred,split_63,"split?");
				return _ms.unlazy(Stream)(function*(){
					const iter=iterator(_);
					const prev_45idx=_ms.unlazy(Ref_33)(0);
					const cur_45idx=_ms.unlazy(Ref_33)(0);
					loop362:while(true){
						const _$363=iter.next(),value=_$363.value,done=_$363.done;
						const next_45idx=_ms.lazy(function(){
							return _43(1,_ms.unlazy(get)(cur_45idx))
						});
						if(_ms.bool(done)){
							(yield slice(_,_ms.unlazy(get)(prev_45idx),_ms.unlazy(get)(cur_45idx)));
							break loop362
						} else if(_ms.bool(split_63(value))){
							(yield slice(_,_ms.unlazy(get)(prev_45idx),_ms.unlazy(get)(cur_45idx)));
							_ms.unlazy(set_33)(prev_45idx,_ms.unlazy(next_45idx));
							_ms.unlazy(set_33)(cur_45idx,_ms.unlazy(next_45idx))
						} else {
							_ms.unlazy(set_33)(cur_45idx,_ms.unlazy(next_45idx))
						}
					}
				})
			},"doc",doc,"test",test)
		}();
		const name=exports.name="Seq";
		exports.default=Seq;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9TZXEubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0VBMEJBLFVBQU0sZUFDSTtHQUFULFVBQU07Ozs7OztFQUVQLFFBQU0sSUFBSTtFQUVWLGVBQVcsSUFBSTtFQUNmLGVBQVcsTUFBTSxJQUNLLFVBQUE7VUFBckIsTUFBTTtFQUFBO0VBR04sbUNBQU0saUJBQ007R0FBWCxVQUNDO0dBRUQsV0FDTyxlQUFBO1dBQUw7R0FBQTtHQUNGLFdBQU07R0FDTixlQUFVLGtCQUFBLEVBQUksYUFDWTtzQkFEZDtzQkFBYTtXQUN4QixPQUFHLFVBQUEsR0FBVSxPQUFHLGFBQVc7R0FBQTs7Ozs7Ozs7O0VBRzdCLG9DQUNNO0dBQUwsVUFBTTtHQUNOLFdBQ08sZUFBQTtJQUFOLFVBQUEsQ0FBRSxDQUFFLEVBQUUsUUFBUzt5Q0FFTCxVQUFBO1lBQVQsTUFBTTtJQUFBOzs7a0JBQ1AsZUFBQSxFQUNDO2dDQUFJLFNBQUEsR0FBUztHQUFBOztFQUVoQixpQ0FBUSxpQkFDTTtHQUFiLFVBQU07R0FDTixXQUNPLGVBQUE7SUFBTixVQUFBLENBQUUsQ0FBRSxFQUFFLHdCQUFXO0lBQ2pCLFVBQUEsQ0FBRSxRQUFTOzs7R0FDWixXQUFNO0dBQ04sZUFBVSxrQkFBQSxFQUNDO1dBQVYsT0FBSyxFQUFFO0dBQUE7Ozs7Ozs7OztFQUVULGtDQUNLO0dBQUosVUFBTTtHQUNOLFdBQ08sZUFBQTtJQUFOLFVBQUEsQ0FBRSxDQUFFLEVBQUUsUUFBUzt5Q0FFTCxVQUFBO1lBQVQsS0FBSztJQUFBOzs7R0FDUCxXQUFNO2tCQUNMLGNBQUEsRUFDQztnQ0FBSSxRQUFBLEdBQVE7R0FBQTs7RUFFZiwrQkFBTyxpQkFDTTtHQUFaLFVBQU07R0FDTixXQUNPLGVBQUE7SUFBTixVQUFBLENBQUUsQ0FBRSxFQUFFLHdCQUFXO0lBQ2pCLFVBQUEsQ0FBRSxRQUFTOzs7R0FDWixXQUFN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