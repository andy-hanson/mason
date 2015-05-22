"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Boolean","../../compare","../../control","../../Function","../../math/methods","../../methods","../../String","../../Type/Kind","../../Type/Method","../../Type/Type","../at","../at-Type","../../math/Number","../../show","../q","./Arraybang","./Seqbang","./Stream","../../bang","../../compare","../../Try"],function(exports,Boolean_0,compare_1,control_2,Function_3,methods_4,methods_5,String_6,Kind_7,Method_8,Type_9,_64_10,_64_45Type_11,Number_12,show_13,_63_14,Array_33_15,Seq_33_16,Stream_17,_33_18,compare_19,Try_20){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),not=_ms.get(_$2,"not"),_$3=_ms.getModule(compare_1),_61_63=_ms.get(_$3,"=?"),_$4=_ms.getModule(control_2),_if=_ms.get(_$4,"if"),_$5=_ms.getModule(Function_3),Pred=_ms.get(_$5,"Pred"),_$6=_ms.getModule(methods_4),_45=_ms.get(_$6,"-"),_43=_ms.get(_$6,"+"),_$7=_ms.getModule(methods_5),freeze=_ms.get(_$7,"freeze"),sub=_ms.get(_$7,"sub"),_$8=_ms.getModule(String_6),indent=_ms.get(_$8,"indent"),Kind=_ms.getDefaultExport(Kind_7),_$9=_ms.getModule(Kind_7),kind_33=_ms.get(_$9,"kind!"),self_45kind_33=_ms.get(_$9,"self-kind!"),Method=_ms.getDefaultExport(Method_8),_$10=_ms.getModule(Method_8),impl_33=_ms.get(_$10,"impl!"),self_45impl_33=_ms.get(_$10,"self-impl!"),_$11=_ms.getModule(Type_9),_61_62=_ms.get(_$11,"=>"),type_45of=_ms.get(_$11,"type-of"),_64=_ms.getDefaultExport(_64_10),_$12=_ms.getModule(_64_10),_43_43=_ms.get(_$12,"++"),count=_ms.get(_$12,"count"),empty_63=_ms.get(_$12,"empty?"),iterator=_ms.get(_$12,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_11),_$13=_ms.getModule(_64_45Type_11),empty=_ms.get(_$13,"empty"),from_45stream=_ms.get(_$13,"from-stream"),_$15=_ms.lazyGetModule(Number_12),Nat=_ms.lazyProp(_$15,"Nat"),show=_ms.lazy(function(){
			return _ms.getDefaultExport(show_13)
		}),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_14)
		}),_$17=_ms.lazyGetModule(_63_14),un_45_63=_ms.lazyProp(_$17,"un-?"),Array_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Array_33_15)
		}),_$19=_ms.lazyGetModule(Seq_33_16),_43_43_62_33=_ms.lazyProp(_$19,"++>!"),Stream=_ms.lazy(function(){
			return _ms.getDefaultExport(Stream_17)
		}),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_18)
		}),_$22=_ms.lazyGetModule(_33_18),_33not=_ms.lazyProp(_$22,"!not"),_$23=_ms.lazyGetModule(compare_19),_60_63=_ms.lazyProp(_$23,"<?"),_$24=_ms.lazyGetModule(Try_20),fails_63=_ms.lazyProp(_$24,"fails?");
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
				return _ms.unlazy(un_45_63)(_63last(_),"Can not take last of empty.")
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
				const _k0=[[1,2]],_v0=[2];
				const _k1=[[]],_v1=[];
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			const args=1;
			const _default=function _default(_){
				return function(){
					if(_ms.bool(empty_63(_))){
						return _
					} else {
						return drop(_,1)
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
				const _k0=[[1,2]],_v0=[1];
				const _k1=[[]],_v1=[];
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			const args=1;
			const _default=function _default(_){
				return function(){
					if(_ms.bool(empty_63(_))){
						return _
					} else {
						return take(_,_45(count(_),1))
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
				let eq=false;
				while(true){
					const next_45a=iter_45a.next();
					const next_45b=iter_45b.next();
					if(_ms.bool(next_45a.done)){
						eq=next_45b.done;
						break
					} else if(_ms.bool(next_45b.done)){
						eq=false;
						break
					} else if(_ms.bool(_61_63(next_45a.value,next_45b.value))){} else {
						eq=false;
						break
					}
				};
				return eq
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
				let i=0;
				let ans=empty(_ms.unlazy(_63));
				for(let _ of _[Symbol.iterator]()){
					if(_ms.bool(_61_63(i,n))){
						ans=_ms.unlazy(_63)(_);
						break
					} else {
						i=_43(1,i)
					}
				};
				return ans
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
		const take=exports.take=Method(function(){
			const doc="TODO";
			const args=function(){
				const _0="_";
				const _1=["count-to-take",_ms.unlazy(Nat)];
				return [_0,_1]
			}();
			const _default=function _default(_,count_45to_45take){
				return _61_62(type_45of(_),take_39(_,count_45to_45take))
			};
			return {
				doc:doc,
				args:args,
				default:_default,
				name:"take"
			}
		}());
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
				return function(){
					if(_ms.bool(_61_63(0,count_45to_45take))){
						return empty(_ms.unlazy(Stream))
					} else {
						return _ms.unlazy(Stream)(function*(){
							let n=count_45to_45take;
							for(let _ of _[Symbol.iterator]()){
								(yield _);
								n=_45(n,1);
								if(_ms.bool(_61_63(0,n))){
									break
								}
							}
						})
					}
				}()
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
					for(let _ of _[Symbol.iterator]()){
						if(! _ms.bool(while_63(_))){
							break
						};
						(yield _)
					}
				})
			},"doc",doc,"test",test)
		}();
		const drop=exports.drop=Method(function(){
			const doc="TODO";
			const args=function(){
				const _0="_";
				const _1=["count-to-drop",_ms.unlazy(Nat)];
				return [_0,_1]
			}();
			const _default=function _default(_,count_45to_45drop){
				return _61_62(type_45of(_),drop_39(_,count_45to_45drop))
			};
			return {
				doc:doc,
				args:args,
				default:_default,
				name:"drop"
			}
		}());
		const drop_39=exports["drop'"]=function(){
			const doc="Stream without the first count-to-drop elements.";
			const test=function test(){
				const _k0=[[0,1,2,3],2],_v0=_61_62(_ms.unlazy(Stream),[2,3]);
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function drop_39(_,count_45to_45drop){
				return _ms.unlazy(Stream)(function*(){
					const iter=iterator(_);
					let i=0;
					while(true){
						if(_ms.bool(_61_63(i,count_45to_45drop))){
							break
						};
						if(_ms.bool(iter.next().done)){
							break
						};
						i=_43(1,i)
					};
					return (yield* iter)
				})
			},"doc",doc,"test",test)
		}();
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
					while(true){
						const next_45a=iter_45a.next();
						if(_ms.bool(next_45a.done)){
							break
						};
						const next_45b=iter_45b.next();
						if(_ms.bool(next_45b.done)){
							break
						};
						(yield zipper(next_45a.value,next_45b.value))
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
							while(true){
								(yield [])
							}
						})
					} else {
						return _ms.unlazy(Stream)(function*(){
							const iter=iterator(_);
							while(true){
								const next_45group=empty(_ms.unlazy(Array_33));
								while(true){
									const _$322=iter.next(),value=_$322.value,done=_$322.done;
									if(_ms.bool(done)){
										break
									};
									_ms.unlazy(_43_43_62_33)(next_45group,[value]);
									if(_ms.bool(_61_63(group_45size,count(next_45group)))){
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
					let prev_45idx=0;
					let cur_45idx=0;
					while(true){
						const _$353=iter.next(),value=_$353.value,done=_$353.done;
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
			},"doc",doc,"test",test)
		}();
		const name=exports.name="Seq";
		exports.default=Seq;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9TZXEubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0VBeUJBLFVBQU0sZUFDSTtHQUFULFVBQU07Ozs7OztFQUVQLFFBQU0sSUFBSTtFQUVWLGVBQVcsSUFBSTtFQUNmLGVBQVcsTUFBTSxJQUNLLFVBQUE7VUFBckIsTUFBTTtFQUFBO0VBR04sbUNBQU0saUJBQ007R0FBWCxVQUNDO0dBRUQsV0FDTyxlQUFBO1dBQUw7R0FBQTtHQUNGLFdBQU07R0FDTixlQUFVLGtCQUFBLEVBQUksYUFDWTtzQkFEZDtzQkFBYTtXQUN4QixPQUFHLFVBQU8sR0FBRyxPQUFHLGFBQVc7R0FBQTs7Ozs7Ozs7O0VBRzdCLG9DQUNNO0dBQUwsVUFBTTtHQUNOLFdBQ08sZUFBQTtJQUFOLFVBQUEsQ0FBRSxDQUFFLEVBQUUsUUFBUzt5Q0FFTCxVQUFBO1lBQVQsTUFBTTtJQUFBOzs7a0JBQ1AsZUFBQSxFQUNDO2dDQUFJLFNBQU0sR0FBRztHQUFBOztFQUVoQixpQ0FBUSxpQkFDTTtHQUFiLFVBQU07R0FDTixXQUNPLGVBQUE7SUFBTixVQUFBLENBQUUsQ0FBRSxFQUFFLHdCQUFXO0lBQ2pCLFVBQUEsQ0FBRSxRQUFTOzs7R0FDWixXQUFNO0dBQ04sZUFBVSxrQkFBQSxFQUNDO1dBQVYsT0FBSyxFQUFFO0dBQUE7Ozs7Ozs7OztFQUVULGtDQUNLO0dBQUosVUFBTTtHQUNOLFdBQ08sZUFBQTtJQUFOLFVBQUEsQ0FBRSxDQUFFLEVBQUUsUUFBUzt5Q0FFTCxVQUFBO1lBQVQsS0FBSztJQUFBOzs7R0FDUCxXQUFNO2tCQUNMLGNBQUEsRUFDQztnQ0FBSSxRQUFLLEdBQUc7R0FBQTs7RUFFZiwrQkFBTyxpQkFDTTtHQUFaLFVBQU07R0FDTixXQUNPLGVBQUE7SUFBTixVQUFBLENBQUUsQ0FBRSxFQUFFLHdCQUFXO0lBQ2pCLFVBQUEsQ0FBRSxRQUFTOzs7R0FDWixXQUFN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