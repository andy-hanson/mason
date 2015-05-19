"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Boolean","../../compare","../../control","../../Function","../../math/methods","../../methods","../../String","../../Type/Kind","../../Type/Method","../../Type/Type","../at","../at-Type","../../math/Number","../../show","../q","./Arraybang","./Seqbang","./Stream","../../bang","../../compare","../../Try"],function(exports,Boolean_0,compare_1,control_2,Function_3,methods_4,methods_5,String_6,Kind_7,Method_8,Type_9,_64_10,_64_45Type_11,Number_12,show_13,_63_14,Array_33_15,Seq_33_16,Stream_17,_33_18,compare_19,Try_20){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),not=_$2.not,_$3=_ms.getModule(compare_1),_61_63=_$3["=?"],_$4=_ms.getModule(control_2),End_45Loop=_$4["End-Loop"],_if=_$4.if,loop=_$4.loop,_$5=_ms.getModule(Function_3),Pred=_$5.Pred,_$6=_ms.getModule(methods_4),_45=_$6["-"],_43=_$6["+"],_$7=_ms.getModule(methods_5),freeze=_$7.freeze,sub=_$7.sub,_$8=_ms.getModule(String_6),indent=_$8.indent,Kind=_ms.getDefaultExport(Kind_7),_$9=_ms.getModule(Kind_7),kind_33=_$9["kind!"],self_45kind_33=_$9["self-kind!"],Method=_ms.getDefaultExport(Method_8),_$10=_ms.getModule(Method_8),impl_33=_$10["impl!"],self_45impl_33=_$10["self-impl!"],_$11=_ms.getModule(Type_9),_61_62=_$11["=>"],type_45of=_$11["type-of"],_64=_ms.getDefaultExport(_64_10),_$12=_ms.getModule(_64_10),_43_43=_$12["++"],count=_$12.count,empty_63=_$12["empty?"],iterator=_$12.iterator,_64_45Type=_ms.getDefaultExport(_64_45Type_11),_$13=_ms.getModule(_64_45Type_11),empty=_$13.empty,from_45stream=_$13["from-stream"],_$15=_ms.lazyGetModule(Number_12),Nat=_ms.lazyProp(_$15,"Nat"),show=_ms.lazy(function(){
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
			const args=2;
			const _default=function _default(_,left_45added){
				return _61_62(type_45of(_),_43_43(left_45added,_))
			};
			return {
				doc:doc,
				args:args,
				default:_default,
				name:"<++'"
			}
		}());
		const first=exports.first=function(){
			const doc="First value in iteration order.";
			return _ms.set(function first(_){
				return _ms.unlazy(un_45_63)(_63first(_),"Can not take first of empty.")
			},"doc",doc)
		}();
		const _63first=exports["?first"]=Method(function(){
			const doc="First value in iteration order, if non-empty.";
			const args=1;
			const _default=function _default(_){
				return _63nth(_,0)
			};
			return {
				doc:doc,
				args:args,
				default:_default,
				name:"?first"
			}
		}());
		const last=exports.last=function(){
			const doc="Last value in iteration order.";
			const args=1;
			return _ms.set(function last(_){
				return _ms.unlazy(un_45_63)(_63last(_),"Can not take `last` of empty.")
			},"doc",doc,"args",args)
		}();
		const _63last=exports["?last"]=Method(function(){
			const doc="Last value in iteration order, if non-empty.";
			const args=1;
			const _default=function _default(_){
				return _if(not(empty_63(_)),_ms.lazy(function(){
					return _ms.sub(_,_45(count(_),1))
				}))
			};
			return {
				doc:doc,
				args:args,
				default:_default,
				name:"?last"
			}
		}());
		const tail=exports.tail=Method(function(){
			const doc="All elements but the first.\nTODO: Eager for Linked-Lists.";
			const args=1;
			const _default=function _default(_){
				return function(){
					if(empty_63(_)){
						return _
					} else {
						return drop_39(_,1)
					}
				}()
			};
			return {
				doc:doc,
				args:args,
				default:_default,
				name:"tail"
			}
		}());
		const rtail=exports.rtail=Method(function(){
			const doc="All elements but the last.\nTODO: Eager for finger trees.";
			const args=1;
			const _default=function _default(_){
				return function(){
					if(empty_63(_)){
						return _
					} else {
						return take_39(_,_45(count(_),1))
					}
				}()
			};
			return {
				doc:doc,
				args:args,
				default:_default,
				name:"rtail"
			}
		}());
		const seq_61_63=exports["seq=?"]=function(){
			const doc="Whether two @s share the same elements in the same order.\nThe types of the @s do not matter.\nEquivalent to `=? (=> Array @a) (=> Array @b)`, but may not have to fully unlazy both.";
			return _ms.set(function seq_61_63(_64a,_64b){
				const iter_45a=iterator(_64a);
				const iter_45b=iterator(_64b);
				return loop(null,function(){
					const next_45a=iter_45a.next();
					const next_45b=iter_45b.next();
					return function(){
						if(next_45a.done){
							return End_45Loop(next_45b.done)
						} else if(next_45b.done){
							return End_45Loop(false)
						} else if(not(_61_63(next_45a.value,next_45b.value))){
							return End_45Loop(false)
						} else {
							return null
						}
					}()
				})
			},"doc",doc)
		}();
		const _63nth=exports["?nth"]=Method(function(){
			const doc="|_ n:Nat\n`n`th element in iteration order, if there are at least that many values.\n0th is the first.\"";
			const args=function(){
				const _0="_";
				const _1=["n",_ms.unlazy(Nat)];
				return [_0,_1]
			}();
			const _default=function _default(_,n){
				let i=0;
				let ans=empty(_ms.unlazy(_63));
				for(let _ of _ms.iterator(_)){
					if(_61_63(i,n)){
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
				args:args,
				default:_default,
				name:"?nth"
			}
		}());
		impl_33(sub,Seq,function(){
			const doc="Nth value in iteration order.";
			return _ms.set(function(_,n){
				return _ms.unlazy(un_45_63)(_63nth(_,n),_ms.lazy(function(){
					return ((("No element at index "+_ms.show(n))+" for\n\t")+_ms.show(indent(_ms.unlazy(show)(_))))
				}))
			},"doc",doc)
		}());
		const slice_45args=function(){
			const _0="_";
			const _1=["start",_ms.unlazy(Nat)];
			const _2=["end",_ms.unlazy(Nat)];
			return [_0,_1,_2]
		}();
		const slice=exports.slice=Method(function(){
			const doc="The elements from index start (inclusive) to end (exclusive).\nTakes as much as possible.\nResult length should be - end start, unless `end` was past the end.";
			const args=slice_45args;
			const _default=function _default(_,start,end){
				return _61_62(type_45of(_),slice_39(_,start,end))
			};
			return {
				doc:doc,
				args:args,
				default:_default,
				name:"slice"
			}
		}());
		const slice_39=exports["slice'"]=function(){
			const doc="Lazy slice.";
			const args=slice_45args;
			return _ms.set(function slice_39(_,start,end){
				return take_39(drop_39(_,start),_45(end,start))
			},"doc",doc,"args",args)
		}();
		const take_39=exports["take'"]=function(){
			const doc="Stream including only the first count-to-take elements.";
			return _ms.set(function take_39(_,count_45to_45take){
				return function(){
					if(_61_63(0,count_45to_45take)){
						return empty(_ms.unlazy(Stream))
					} else {
						return _ms.unlazy(Stream)(function*(){
							let n=count_45to_45take;
							for(let _ of _ms.iterator(_)){
								(yield _);
								n=_45(n,1);
								if(_61_63(0,n)){
									break
								}
							}
						})
					}
				}()
			},"doc",doc)
		}();
		const take_45while_39=exports["take-while'"]=function(){
			const doc="Stream stopping (and not including) the first element not satisfying while?.";
			return _ms.set(function take_45while_39(_,while_63){
				return _ms.unlazy(Stream)(function*(){
					for(let _ of _ms.iterator(_)){
						if(! while_63(_)){
							break
						};
						(yield _)
					}
				})
			},"doc",doc)
		}();
		const drop_39=exports["drop'"]=Method(function(){
			const doc="Stream without the first count-to-drop elements.";
			const args=function(){
				const _0="_";
				const _1=["count-to-drop",_ms.unlazy(Nat)];
				return [_0,_1]
			}();
			const _default=function _default(_,count_45to_45drop){
				return _ms.unlazy(Stream)(function*(){
					const iter=iterator(_);
					let i=0;
					while(true){
						if(_61_63(i,count_45to_45drop)){
							break
						};
						if(iter.next().done){
							break
						};
						i=_43(1,i)
					};
					return (yield* iter)
				})
			};
			return {
				doc:doc,
				args:args,
				default:_default,
				name:"drop'"
			}
		}());
		const zip=exports.zip=function(){
			const doc="Type-preserving zip.";
			return _ms.set(function zip(_64a,_64b,zipper){
				return _61_62(type_45of(_64a),zip_39(_64a,_64b,zipper))
			},"doc",doc)
		}();
		const zip_39=exports["zip'"]=function(){
			const doc="Seq of zipper applied to corresponding elements of @a and @b.\nEnds as soon as either of them does, discarding extra elements.\n(Corresponding means: with the same index.)";
			return _ms.set(function zip_39(_64a,_64b,zipper){
				return _ms.unlazy(Stream)(function*(){
					const iter_45a=iterator(_64a);
					const iter_45b=iterator(_64b);
					while(true){
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
			},"doc",doc)
		}();
		const groups_45of_39=exports["groups-of'"]=function(){
			const doc="Seq of consecutive groups of `group-size` elements.";
			return _ms.set(function groups_45of_39(group_45size,_){
				return function(){
					if(_61_63(group_45size,0)){
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
									const _$303=iter.next(),value=_$303.value,done=_$303.done;
									if(done){
										break
									};
									_ms.unlazy(_43_43_62_33)(next_45group,[value]);
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
				}()
			},"doc",doc)
		}();
		const reverse=exports.reverse=Method(function(){
			const doc="Seq with the opposite order.";
			const args=1;
			const _default=function _default(_){
				return from_45stream(_ms.unlazy(Array_33),_).reverse()
			};
			return {
				doc:doc,
				args:args,
				default:_default,
				name:"reverse"
			}
		}());
		const split_39=exports["split'"]=function(){
			const doc="Subseqs separated by elements where split? is true.";
			return _ms.set(function split_39(_,split_63){
				return _ms.unlazy(Stream)(function*(){
					const iter=iterator(_);
					let prev_45idx=0;
					let cur_45idx=0;
					while(true){
						const _$334=iter.next(),value=_$334.value,done=_$334.done;
						const next_45idx=_ms.lazy(function(){
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
			},"doc",doc)
		}();
		const name=exports.name="Seq";
		exports.default=Seq;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9TZXEubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0VBeUJBLFVBQU0sZUFDSTtHQUFULFVBQU07Ozs7OztFQUVQLFFBQU0sSUFBSTtFQUVWLGVBQVcsSUFBSTtFQUNmLGVBQVcsTUFBTSxJQUNLLFVBQUE7VUFBckIsTUFBTTtFQUFBO0VBR04sbUNBQU0saUJBQ007R0FBWCxVQUNDO0dBSUQsV0FBTTtHQUNOLGVBQVUsa0JBQUEsRUFBSSxhQUNZO1dBQXpCLE9BQUcsVUFBQSxHQUFVLE9BQUcsYUFBVztHQUFBOzs7Ozs7OztFQUc3QixvQ0FDTTtHQUFMLFVBQU07a0JBS0wsZUFBQSxFQUNDO2dDQUFJLFNBQUEsR0FBUztHQUFBOztFQUVoQixpQ0FBUSxpQkFDTTtHQUFiLFVBQU07R0FJTixXQUFNO0dBQ04sZUFBVSxrQkFBQSxFQUNDO1dBQVYsT0FBSyxFQUFFO0dBQUE7Ozs7Ozs7O0VBRVQsa0NBQ0s7R0FBSixVQUFNO0dBS04sV0FBTTtrQkFDTCxjQUFBLEVBQ0M7Z0NBQUksUUFBQSxHQUFRO0dBQUE7O0VBRWYsK0JBQU8saUJBQ007R0FBWixVQUFNO0dBSU4sV0FBTTtHQUNOLGVBQVUsa0JBQUEsRUFDQztXQUFWLElBQUksSUFBSSxTQUFBO29CQUFVLEVBQUcsSUFBRSxNQUFBLEdBQU87SUFBQTtHQUFBOzs7Ozs7OztFQUVoQyx3QkFBTSxpQkFDTTtHQUFYLFVBQ0M7R0FLRCxXQUFNO0dBQ04sZUFBVSxrQkFBQSxFQUFBOztLQUNULEdBQUEsU0FBQSxHQUNPO2FBQU47S0FBQSxPQUVHO2FBQUgsUUFBTSxFQUFFO0tBQUE7SUFBQTtHQUFBOzs7Ozs7OztFQUVYLDBCQUFPLGlCQUNNO0dBQVosVUFDQztHQUtELFdBQU07R0FDTixlQUFVLGtCQUFBLEVBQUE7O0tBQ1QsR0FBQSxTQUFBLEdBQ087YUFBTjtLQUFBLE9BRUc7YUFBSCxRQUFNLEVB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