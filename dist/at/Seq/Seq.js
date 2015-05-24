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
			const test=function test(){};
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
				const built=new global.Map();
				_ms.assoc(built,[[1,2]],1);
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return first([])
				});
				return built
			};
			return _ms.set(function first(_){
				return _ms.unlazy(un_45_63)(_63first(_),"Can not take first of empty.")
			},"doc",doc,"test",test)
		}();
		const _63first=exports["?first"]=Method(function(){
			const doc="First value in iteration order, if non-empty.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[1,2]],_ms.unlazy(_63)(1));
				_ms.assoc(built,[[]],empty(_ms.unlazy(_63)));
				return built
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
				const built=new global.Map();
				_ms.assoc(built,[[1,2]],2);
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return last([])
				});
				return built
			};
			const args=1;
			return _ms.set(function last(_){
				return _ms.unlazy(un_45_63)(_63last(_),"Can not take last of empty.")
			},"doc",doc,"test",test,"args",args)
		}();
		const _63last=exports["?last"]=Method(function(){
			const doc="Last value in iteration order, if non-empty.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[1,2]],_ms.unlazy(_63)(2));
				_ms.assoc(built,[[]],empty(_ms.unlazy(_63)));
				return built
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
				const built=new global.Map();
				_ms.assoc(built,[[1,2]],[2]);
				_ms.assoc(built,[[]],[]);
				return built
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
				const built=new global.Map();
				_ms.assoc(built,[[1,2]],[1]);
				_ms.assoc(built,[[]],[]);
				return built
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
				let eq=false;
				for(;;){
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
				const built=new global.Map();
				_ms.assoc(built,[[0,1],1],_ms.unlazy(_63)(1));
				_ms.assoc(built,[[0,1],2],empty(_ms.unlazy(_63)));
				return built
			};
			const args=function(){
				const built=[];
				_ms.add(built,"_");
				_ms.add(built,["n",_ms.unlazy(Nat)]);
				return built
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
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
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
			const built=[];
			_ms.add(built,"_");
			_ms.add(built,["start",_ms.unlazy(Nat)]);
			_ms.add(built,["end",_ms.unlazy(Nat)]);
			return built
		}();
		const slice=exports.slice=Method(function(){
			const doc="The elements from index start (inclusive) to end (exclusive).\nTakes as much as possible.\nResult length should be - end start, unless `end` was past the end.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[0,1,2,3],1,3],[1,2]);
				return built
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
				const built=new global.Map();
				_ms.assoc(built,[[0,1,2,3],1,3],_61_62(_ms.unlazy(Stream),[1,2]));
				return built
			};
			const args=slice_45args;
			return _ms.set(function slice_39(_,start,end){
				return _ms.checkContains(_64,take_39(drop_39(_,start),_45(end,start)),"res")
			},"doc",doc,"test",test,"args",args)
		}();
		const take=exports.take=Method(function(){
			const doc="TODO";
			const args=function(){
				const built=[];
				_ms.add(built,"_");
				_ms.add(built,["count-to-take",_ms.unlazy(Nat)]);
				return built
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
			},"doc",doc,"test",test)
		}();
		const drop=exports.drop=Method(function(){
			const doc="TODO";
			const args=function(){
				const built=[];
				_ms.add(built,"_");
				_ms.add(built,["count-to-drop",_ms.unlazy(Nat)]);
				return built
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
				const built=new global.Map();
				_ms.assoc(built,[[0,1,2,3],2],_61_62(_ms.unlazy(Stream),[2,3]));
				return built
			};
			return _ms.set(function drop_39(_,count_45to_45drop){
				return _ms.unlazy(Stream)(function*(){
					const iter=iterator(_);
					let i=0;
					for(;;){
						if(_ms.bool(_61_63(i,count_45to_45drop))){
							break
						};
						if(_ms.bool(iter.next().done)){
							break
						};
						i=_43(1,i)
					};
					(yield* iter)
				})
			},"doc",doc,"test",test)
		}();
		const zip=exports.zip=function(){
			const doc="Type-preserving zip.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[1,2],[10,20],_43],[11,22]);
				return built
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
				const built=new global.Map();
				_ms.assoc(built,[[1,2]],[2,1]);
				return built
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9TZXEubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0VBeUJBLFVBQU0sZUFDSTtHQUFULFVBQU07Ozs7OztFQUVQLFFBQU0sSUFBSTtFQUVWLGVBQVcsSUFBSTtFQUNmLGVBQVcsTUFBTSxJQUNLLFVBQUE7VUFBckIsTUFBTTtFQUFBO0VBR04sbUNBQU0saUJBQ007R0FBWCxVQUNDO0dBRUQsV0FDUSxlQUFBO0dBQ1IsV0FBTTtHQUNOLGVBQVUsa0JBQUEsRUFBSSxhQUNZO3NCQURkO3NCQUFhO1dBQ3hCLE9BQUcsVUFBTyxHQUFHLE9BQUcsYUFBVztHQUFBOzs7Ozs7Ozs7RUFHN0Isb0NBQ007R0FBTCxVQUFNO0dBQ04sV0FDTyxlQUFBOztvQkFBTixDQUFFLENBQUUsRUFBRSxJQUFTO3lDQUVMLFVBQUE7WUFBVCxNQUFNO0lBQUE7OztrQkFDUCxlQUFBLEVBQ0M7Z0NBQUksU0FBTSxHQUFHO0dBQUE7O0VBRWhCLGlDQUFRLGlCQUNNO0dBQWIsVUFBTTtHQUNOLFdBQ08sZUFBQTs7b0JBQU4sQ0FBRSxDQUFFLEVBQUUsb0JBQVc7b0JBQ2pCLENBQUUsSUFBUzs7O0dBQ1osV0FBTTtHQUNOLGVBQVUsa0JBQUEsRUFDQztXQUFWLE9BQUssRUFBRTtHQUFBOzs7Ozs7Ozs7RUFFVCxrQ0FDSztHQUFKLFVBQU07R0FDTixXQUNPLGVBQUE7O29CQUFOLENBQUUsQ0FBRSxFQUFFLElBQVM7eUNBRUwsVUFBQTtZQUFULEtBQUs7SUFBQTs7O0dBQ1AsV0FBTTtrQkFDTCxjQUFBLEVBQ0M7Z0NBQUksUUFBSyxHQUFHO0dBQUE7O0VBRWYsK0JBQU8saUJBQ007R0FBWixVQUFNO0dBQ04sV0FDTyxlQUFBOztvQkFBTixDQUFFLENBQUUsRUFBRSxvQkFBVztvQkFDakIsQ0FBRSxJQUFTOzs7R0FDWixXQUFNO0dBQ04sZUFBVSxrQkFBQSxFQUNDO1dBQVYsSUFB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