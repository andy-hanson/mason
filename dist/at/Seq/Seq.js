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
			const doc="|_ n:Nat\n`n`th element in iteration order, if there are at least that many values.\n0th is the first.\"";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9TZXEubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2lDQTBCQTs7Ozs7Ozs7Ozs7OztFQUFBLFVBQU0sZUFDSTtHQUFULFVBQU07VUFBRzs7Ozs7RUFFVixRQUFNLElBQUk7RUFFVixlQUFXLElBQUk7RUFDZixlQUFXLE1BQU0sSUFDSyxVQUFBO1VBQXJCLE1BQU07RUFBQTtFQUdOLG1DQUFNLGlCQUNNO0dBQVgsVUFDQztHQUVELFdBQ08sVUFBQTtXQUFMO0dBQUE7a0JBQ0QsU0FBQSxFQUFJLGFBQ1k7c0JBRGQ7c0JBQWE7V0FDZixPQUFHLFVBQUEsR0FBVSxPQUFHLGFBQVc7R0FBQTs7RUFHN0Isb0NBQ007R0FBTCxVQUFNO0dBQ04sV0FDTyxVQUFBO0lBQU4sVUFBQSxDQUFFLENBQUUsRUFBRSxRQUFTO3lDQUVMLFVBQUE7WUFBVCxNQUFNO0lBQUE7OztrQkFDUCxTQUFBLEVBQ0M7Z0NBQUksU0FBQSxHQUFTO0dBQUE7O0VBRWhCLGlDQUFRLGlCQUNNO0dBQWIsVUFBTTtHQUNOLFdBQ08sVUFBQTtJQUFOLFVBQUEsQ0FBRSxDQUFFLEVBQUUsd0JBQVc7SUFDakIsVUFBQSxDQUFFLFFBQVM7OztHQUNaLGVBQVUsU0FBQSxFQUNDO1dBQVYsT0FBSyxFQUFFO0dBQUE7VUFMSzs7Ozs7OztFQU9kLGtDQUNLO0dBQUosVUFBTTtHQUNOLFdBQ08sVUFBQTtJQUFOLFVBQUEsQ0FBRSxDQUFFLEVBQUUsUUFBUzt5Q0FFTCxVQUFBO1lBQVQsS0FBSztJQUFBOzs7a0JBQ04sU0FBQSxFQUNDO2dDQUFJLFFBQUEsR0FBUTtHQUFBOztFQUVmLCtCQUFPLGlCQUNNO0dBQVosVUFBTTtHQUNOLFdBQ08sVUFBQTtJQUFOLFVBQUEsQ0FBRSxDQUFFLEVBQUUsd0JBQVc7SUFDakIsVUFBQSxDQUFFLFFBQVM7OztHQUNaLGVBQVUsU0FBQSxFQUNDO1dBQVYsSUFBSSxJQUFJLFNBQUE7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