"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Bool","../../compare","../../control","../../Fun","../../math/methods","../../methods","../../Str","../../Type/Kind","../../Type/Method","../../Type/Type","../at","../at-Type","../../control","../../math/Num","../../show","../q","./Arraybang","./Seqbang","./Stream","../../bang","../../compare","../../Try"],function(exports,Bool_0,compare_1,control_2,Fun_3,methods_4,methods_5,Str_6,Kind_7,Method_8,Type_9,_64_10,_64_45Type_11,control_12,Num_13,show_14,_63_15,Array_33_16,Seq_33_17,Stream_18,_33_19,compare_20,Try_21){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Bool_0),not=_ms.get(_$2,"not"),_$3=_ms.getModule(compare_1),_61_63=_ms.get(_$3,"=?"),_$4=_ms.getModule(control_2),End_45Loop=_ms.get(_$4,"End-Loop"),_if=_ms.get(_$4,"if"),loop=_ms.get(_$4,"loop"),Fun=_ms.getDefaultExport(Fun_3),_$5=_ms.getModule(Fun_3),Pred=_ms.get(_$5,"Pred"),_$6=_ms.getModule(methods_4),_45=_ms.get(_$6,"-"),_43=_ms.get(_$6,"+"),_$7=_ms.getModule(methods_5),freeze=_ms.get(_$7,"freeze"),sub=_ms.get(_$7,"sub"),_$8=_ms.getModule(Str_6),indent=_ms.get(_$8,"indent"),Kind=_ms.getDefaultExport(Kind_7),_$9=_ms.getModule(Kind_7),kind_33=_ms.get(_$9,"kind!"),self_45kind_33=_ms.get(_$9,"self-kind!"),Method=_ms.getDefaultExport(Method_8),_$10=_ms.getModule(Method_8),impl_33=_ms.get(_$10,"impl!"),self_45impl_33=_ms.get(_$10,"self-impl!"),_$11=_ms.getModule(Type_9),_61_62=_ms.get(_$11,"=>"),type_45of=_ms.get(_$11,"type-of"),_64=_ms.getDefaultExport(_64_10),_$12=_ms.getModule(_64_10),_43_43=_ms.get(_$12,"++"),count=_ms.get(_$12,"count"),empty_63=_ms.get(_$12,"empty?"),iterator=_ms.get(_$12,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_11),_$13=_ms.getModule(_64_45Type_11),empty=_ms.get(_$13,"empty"),from_45stream=_ms.get(_$13,"from-stream"),_$15=_ms.lazyGetModule(control_12),Ref_33=_ms.lazyProp(_$15,"Ref!"),get=_ms.lazyProp(_$15,"get"),mod_33=_ms.lazyProp(_$15,"mod!"),set_33=_ms.lazyProp(_$15,"set!"),_$16=_ms.lazyGetModule(Num_13),Nat=_ms.lazyProp(_$16,"Nat"),show=_ms.lazy(function(){
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
		const exports={};
		const Seq=Kind(function(){
			const doc="@ whose values are in a meaningful order.";
			return {
				doc:doc,
				displayName:"Seq"
			}
		}());
		kind_33(Seq,_64);
		self_45kind_33(Seq,_64_45Type);
		self_45impl_33(empty,Seq,function(){
			return empty(Array)
		});
		const _60_43_43_39=exports["<++'"]=Method(function(){
			const doc="TODO:REST\n(There is no `++>'` because `++` by default adds to the right for Seqs.)";
			const test=function(){
				return "TODO"
			};
			return _ms.set(function(_,left_45added){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(_64,left_45added,"left-added");
				return _61_62(type_45of(_),_43_43(left_45added,_))
			},"doc",doc,"test",test,"displayName","<++'")
		}());
		const first=exports.first=function(){
			const doc="First value in iteration order.";
			const test=function(){
				const _k0=[[1,2]],_v0=1;
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return first([])
				});
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function(_){
				return _ms.unlazy(un_45_63)(_63first(_),"Can not take first of empty.")
			},"doc",doc,"test",test,"displayName","first")
		}();
		const _63first=exports["?first"]=Method(function(){
			const doc="First value in iteration order, if non-empty.";
			const test=function(){
				const _k0=[[1,2]],_v0=_ms.unlazy(_63)(1);
				const _k1=[[]],_v1=empty(_ms.unlazy(_63));
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			const _default=function(_){
				return _63nth(_,0)
			};
			return {
				doc:doc,
				test:test,
				default:_default,
				displayName:"?first"
			}
		}());
		const last=exports.last=function(){
			const doc="Last value in iteration order.";
			const test=function(){
				const _k0=[[1,2]],_v0=2;
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return last([])
				});
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function(_){
				return _ms.unlazy(un_45_63)(_63last(_),"Can not take `last` of empty.")
			},"doc",doc,"test",test,"displayName","last")
		}();
		const _63last=exports["?last"]=Method(function(){
			const doc="Last value in iteration order, if non-empty.";
			const test=function(){
				const _k0=[[1,2]],_v0=_ms.unlazy(_63)(2);
				const _k1=[[]],_v1=empty(_ms.unlazy(_63));
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			const _default=function(_){
				return _if(not(empty_63(_)),_ms.lazy(function(){
					return _ms.sub(_,_45(count(_),1))
				}))
			};
			return {
				doc:doc,
				test:test,
				default:_default,
				displayName:"?last"
			}
		}());
		const tail=exports.tail=Method(function(){
			const doc="All elements but the first.\nTODO: Eager for Linked-Lists.";
			const test=function(){
				const _k0=[[1,2]],_v0=_61_62(_ms.unlazy(Stream),[2]);
				const _k1=[[]],_v1=[];
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			const _default=function(_){
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
				default:_default,
				displayName:"tail"
			}
		}());
		const rtail=exports.rtail=Method(function(){
			const doc="All elements but the last.\nTODO: Eager for finger trees.";
			const test=function(){
				const _k0=[[1,2]],_v0=_61_62(_ms.unlazy(Stream),[1]);
				const _k1=[[]],_v1=[];
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			const _default=function(_){
				return function(){
					if(_ms.bool(empty_63(_))){
						return _
					} else {
						return take_39(_,_45(count(_),1))
					}
				}()
			};
			return {
				default:_default,
				doc:doc,
				test:test,
				displayName:"rtail"
			}
		}());
		const seq_61_63=exports["seq=?"]=function(){
			const doc="Whether two @s share the same elements in the same order.\nThe types of the @s do not matter.\nEquivalent to `=? (=> Array @a) (=> Array @b)`, but may not have to fully unlazy both.";
			const test=function(){
				const s=_ms.unlazy(Stream)(function*(){
					return (yield 1)
				});
				_ms.unlazy(_33)(seq_61_63,s,[1]);
				return _ms.unlazy(_33not)(seq_61_63,s,[2])
			};
			return _ms.set(function(_64a,_64b){
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
			},"doc",doc,"test",test,"displayName","seq=?")
		}();
		const _63nth=exports["?nth"]=Method(function(){
			const doc=function(_,n){
				_ms.checkContains(_ms.unlazy(Nat),n,"n");
				return "`n`th element in iteration order, if there are at least that many values.\n0th is the first.\""
			};
			const test=function(){
				const _k0=[[0,1],1],_v0=_ms.unlazy(_63)(1);
				const _k1=[[0,1],2],_v1=empty(_ms.unlazy(_63));
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			const _default=function(_,n){
				_ms.checkContains(_ms.unlazy(Nat),n,"n");
				const iter=iterator(_);
				const i=_ms.unlazy(Ref_33)(0);
				const ans=_ms.unlazy(Ref_33)(empty(_ms.unlazy(_63)));
				loop148:while(true){
					const _$149=iter.next(),value=_$149.value,done=_$149.done;
					if(_ms.bool(done)){
						break loop148
					} else if(_ms.bool(_61_63(_ms.unlazy(get)(i),n))){
						_ms.unlazy(set_33)(ans,_ms.unlazy(_63)(value));
						break loop148
					} else {
						_ms.unlazy(mod_33)(i,_ms.sub(_43,1))
					}
				};
				return _ms.unlazy(get)(ans)
			};
			return {
				doc:doc,
				test:test,
				default:_default,
				displayName:"?nth"
			}
		}());
		impl_33(sub,Seq,function(){
			const doc="Nth value in iteration order.";
			const test=function(){
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
		const slice=exports.slice=Method(function(){
			const doc="The elements from index start (inclusive) to end (exclusive).\nTakes as much as possible.\nResult length should be - end start, unless `end` was past the end.";
			const test=function(){
				const _k0=[[0,1,2,3],1,3],_v0=[1,2];
				return _ms.map(_k0,_v0)
			};
			const _default=function(_,start,end){
				_ms.checkContains(_ms.unlazy(Nat),start,"start");
				_ms.checkContains(_ms.unlazy(Nat),end,"end");
				return _61_62(type_45of(_),slice_39(_,start,end))
			};
			return {
				doc:doc,
				test:test,
				default:_default,
				displayName:"slice"
			}
		}());
		const slice_39=exports["slice'"]=function(){
			const doc="Lazy slice.";
			const test=function(){
				const _k0=[[0,1,2,3],1,3],_v0=_61_62(_ms.unlazy(Stream),[1,2]);
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function(_,start,end){
				_ms.checkContains(_ms.unlazy(Nat),start,"start");
				_ms.checkContains(_ms.unlazy(Nat),end,"end");
				return _ms.checkContains(_64,take_39(drop_39(_,start),_45(end,start)),"res")
			},"doc",doc,"test",test,"displayName","slice'")
		}();
		const take_39=exports["take'"]=function(){
			const doc="Stream including only the first count-to-take elements.";
			const test=function(){
				const _k0=[[0,1,2],2],_v0=_61_62(_ms.unlazy(Stream),[0,1]);
				const _k1=[[0],2],_v1=_61_62(_ms.unlazy(Stream),[0]);
				const _=[0,1,2,3,4];
				_ms.unlazy(_33)(seq_61_63,_,_43_43(take_39(_,2),drop_39(_,2)));
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function(_,count_45to_45take){
				_ms.checkContains(_ms.unlazy(Nat),count_45to_45take,"count-to-take");
				return _ms.unlazy(Stream)(function*(){
					const iter=iterator(_);
					const i=_ms.unlazy(Ref_33)(0);
					loop202:while(true){
						if(_ms.bool(_61_63(_ms.unlazy(get)(i),count_45to_45take))){
							break loop202
						} else {
							const _$207=iter.next(),value=_$207.value,done=_$207.done;
							if(_ms.bool(done)){
								break loop202
							} else {
								(yield value);
								_ms.unlazy(mod_33)(i,_ms.sub(_43,1))
							}
						}
					}
				})
			},"doc",doc,"test",test,"displayName","take'")
		}();
		const take_45while_39=exports["take-while'"]=function(){
			const doc="Stream stopping (and not including) the first element not satisfying while?.";
			const test=function(){
				const _k0=[[1,2,- 1,3],_ms.sub(_ms.unlazy(_60_63),0)],_v0=_61_62(_ms.unlazy(Stream),[1,2]);
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function(_,while_63){
				_ms.checkContains(Pred,while_63,"while?");
				return _ms.unlazy(Stream)(function*(){
					const iter=iterator(_);
					loop222:while(true){
						const _$223=iter.next(),value=_$223.value,done=_$223.done;
						if(_ms.bool(done)){
							break loop222
						} else if(_ms.bool(while_63(value))){
							(yield value)
						} else {
							break loop222
						}
					}
				})
			},"doc",doc,"test",test,"displayName","take-while'")
		}();
		const drop_39=exports["drop'"]=Method(function(){
			const doc="Stream without the first count-to-drop elements.";
			const test=function(){
				const _k0=[[0,1,2,3],2],_v0=_61_62(_ms.unlazy(Stream),[2,3]);
				return _ms.map(_k0,_v0)
			};
			const _default=function(_,count_45to_45drop){
				_ms.checkContains(_ms.unlazy(Nat),count_45to_45drop,"count-to-drop");
				return _ms.checkContains(_64,_ms.unlazy(Stream)(function*(){
					const iter=iterator(_);
					const i=_ms.unlazy(Ref_33)(0);
					loop241:while(true){
						if(_ms.bool(_61_63(_ms.unlazy(get)(i),count_45to_45drop))){
							break loop241
						} else {
							if(_ms.bool(iter.next().done)){
								break loop241
							} else {
								_ms.unlazy(mod_33)(i,_ms.sub(_43,1))
							}
						}
					};
					return (yield* iter)
				}),"res")
			};
			return {
				doc:doc,
				test:test,
				default:_default,
				displayName:"drop'"
			}
		}());
		const zip=exports.zip=function(){
			const doc="Type-preserving zip.";
			const test=function(){
				const _k0=[[1,2],[10,20],_43],_v0=[11,22];
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function(_64a,_64b,zipper){
				_ms.checkContains(_64,_64a,"@a");
				_ms.checkContains(_64,_64b,"@b");
				_ms.checkContains(_ms.sub(Fun,2),zipper,"zipper");
				return _61_62(type_45of(_64a),zip_39(_64a,_64b,zipper))
			},"doc",doc,"test",test,"displayName","zip")
		}();
		const zip_39=exports["zip'"]=function(){
			const doc="Seq of zipper applied to corresponding elements of @a and @b.\nEnds as soon as either of them does, discarding extra elements.\n(Corresponding means: with the same index.)";
			const test=function(){
				const _k0=[[1,2],[10,20,30],_43],_v0=_61_62(_ms.unlazy(Stream),[11,22]);
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function(_64a,_64b,zipper){
				_ms.checkContains(_64,_64a,"@a");
				_ms.checkContains(_64,_64b,"@b");
				_ms.checkContains(_ms.sub(Fun,2),zipper,"zipper");
				return _ms.unlazy(Stream)(function*(){
					const iter_45a=iterator(_64a);
					const iter_45b=iterator(_64b);
					loop274:while(true){
						const next_45a=iter_45a.next();
						if(_ms.bool(next_45a.done)){
							break loop274
						} else {
							const next_45b=iter_45b.next();
							if(_ms.bool(next_45b.done)){
								break loop274
							} else {
								(yield zipper(next_45a.value,next_45b.value))
							}
						}
					}
				})
			},"doc",doc,"test",test,"displayName","zip'")
		}();
		const groups_45of_39=exports["groups-of'"]=function(){
			const doc="Seq of consecutive groups of `group-size` elements.";
			const test=function(){
				_ms.unlazy(_33)(seq_61_63,[[1,2],[3,4]],groups_45of_39(2,[1,2,3,4]));
				_ms.unlazy(_33)(seq_61_63,[[1,2,3]],groups_45of_39(3,[1,2,3,4]));
				return _ms.unlazy(_33)(seq_61_63,[[],[],[]],take_39(groups_45of_39(0,[1]),3))
			};
			return _ms.set(function(group_45size,_){
				_ms.checkContains(_ms.unlazy(Nat),group_45size,"group-size");
				return _ms.checkContains(_ms.sub(Seq,Array),function(){
					if(_ms.bool(_61_63(group_45size,0))){
						return _ms.unlazy(Stream)(function*(){
							loop300:while(true){
								(yield [])
							}
						})
					} else {
						return _ms.unlazy(Stream)(function*(){
							const iter=iterator(_);
							loop305:while(true){
								const next_45group=empty(_ms.unlazy(Array_33));
								loop307:while(true){
									const _$308=iter.next(),value=_$308.value,done=_$308.done;
									if(_ms.bool(done)){
										break loop307
									} else {
										_ms.unlazy(_43_43_62_33)(next_45group,[value]);
										{
											const _=count(next_45group);
											if(_ms.bool(_61_63(_,group_45size))){
												break loop307
											} else {
												null
											}
										}
									}
								};
								{
									const _=count(next_45group);
									if(_ms.bool(_61_63(_,group_45size))){
										(yield freeze(next_45group))
									} else {
										break loop305
									}
								}
							}
						})
					}
				}(),"res")
			},"doc",doc,"test",test,"displayName","groups-of'")
		}();
		const reverse=exports.reverse=Method(function(){
			const doc="Seq with the opposite order.";
			const test=function(){
				const _k0=[[1,2]],_v0=[2,1];
				return _ms.map(_k0,_v0)
			};
			const _default=function(_){
				return _ms.checkContains(Array,from_45stream(_ms.unlazy(Array_33),_).reverse(),"res")
			};
			return {
				doc:doc,
				test:test,
				default:_default,
				displayName:"reverse"
			}
		}());
		const split_39=exports["split'"]=function(){
			const doc="Subseqs separated by elements where split? is true.";
			const test=function(){
				const _k0=[[1,0,1],_ms.sub(_61_63,0)],_v0=_61_62(_ms.unlazy(Stream),[[1],[1]]);
				const _k1=[[0],_ms.sub(_61_63,0)],_v1=_61_62(_ms.unlazy(Stream),[[],[]]);
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function(_,split_63){
				_ms.checkContains(Pred,split_63,"split?");
				return _ms.unlazy(Stream)(function*(){
					const iter=iterator(_);
					const prev_45idx=_ms.unlazy(Ref_33)(0);
					const cur_45idx=_ms.unlazy(Ref_33)(0);
					loop342:while(true){
						const _$343=iter.next(),value=_$343.value,done=_$343.done;
						const next_45idx=_ms.lazy(function(){
							return _43(1,_ms.unlazy(get)(cur_45idx))
						});
						if(_ms.bool(done)){
							(yield slice(_,_ms.unlazy(get)(prev_45idx),_ms.unlazy(get)(cur_45idx)));
							break loop342
						} else if(_ms.bool(split_63(value))){
							(yield slice(_,_ms.unlazy(get)(prev_45idx),_ms.unlazy(get)(cur_45idx)));
							_ms.unlazy(set_33)(prev_45idx,_ms.unlazy(next_45idx));
							_ms.unlazy(set_33)(cur_45idx,_ms.unlazy(next_45idx))
						} else {
							_ms.unlazy(set_33)(cur_45idx,_ms.unlazy(next_45idx))
						}
					}
				})
			},"doc",doc,"test",test,"displayName","split'")
		}();
		exports.default=Seq;
		const displayName=exports.displayName="Seq";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9TZXEubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2lDQTBCQTs7Ozs7Ozs7Ozs7OztFQUFBLFVBQU0sZUFBSTtHQUNULFVBQU07VUFERzs7Ozs7RUFHVixRQUFNLElBQUk7RUFFVixlQUFXLElBQUk7RUFDZixlQUFXLE1BQU0sSUFBSyxVQUFBO1VBQ3JCLE1BQU07RUFBQTtFQUdOLG1DQUFNLGlCQUFNO0dBQ1gsVUFDQztHQUVELFdBQU8sVUFBQTtXQUNMO0dBQUE7a0JBQ0QsU0FBQSxFQUFJLGFBQVk7c0JBQWQ7c0JBQWE7V0FDZixPQUFHLFVBQUEsR0FBVSxPQUFHLGFBQVc7R0FBQTs7RUFHN0Isb0NBQU07R0FDTCxVQUFNO0dBQ04sV0FBTyxVQUFBO0lBQ04sVUFBQSxDQUFFLENBQUUsRUFBRSxRQUFTO3lDQUNMLFVBQUE7WUFDVCxNQUFNO0lBQUE7OztrQkFDUCxTQUFBLEVBQUM7Z0NBQ0ksU0FBQSxHQUFTO0dBQUE7O0VBRWhCLGlDQUFRLGlCQUFNO0dBQ2IsVUFBTTtHQUNOLFdBQU8sVUFBQTtJQUNOLFVBQUEsQ0FBRSxDQUFFLEVBQUUsd0JBQVc7SUFDakIsVUFBQSxDQUFFLFFBQVM7OztHQUNaLGVBQVUsU0FBQSxFQUFDO1dBQ1YsT0FBSyxFQUFFO0dBQUE7VUFOSzs7Ozs7OztFQVFkLGtDQUFLO0dBQ0osVUFBTTtHQUNOLFdBQU8sVUFBQTtJQUNOLFVBQUEsQ0FBRSxDQUFFLEVBQUUsUUFBUzt5Q0FDTCxVQUFBO1lBQ1QsS0FBSztJQUFBOzs7a0JBQ04sU0FBQSxFQUFDO2dDQUNJLFFBQUEsR0FBUTtHQUFBOztFQUVmLCtCQUFPLGlCQUFNO0dBQ1osVUFBTTtHQUNOLFdBQU8sVUFBQTtJQUNOLFVBQUEsQ0FBRSxDQUFFLEVBQUUsd0JBQVc7SUFDakIsVUFBQSxDQUFFLFFBQVM7OztHQUNaLGVBQVUsU0FBQSxFQUFDO1dBQ1YsSUFBSSxJQUFJLFNBQUE7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