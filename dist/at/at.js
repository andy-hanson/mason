"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Boolean","../compare","../Function","../js","../math/methods","../private/bootstrap","../Type/Type","../Type/Kind","../Type/Method","../Type/Pred-Type","../control","../math/Number","./atbang","./at-Type","./q","./Seq/Seq","./Seq/Stream","./Set/Setbang","../control","../bang","../math/Number","../Try","./at-Type","./Map/Weak-Id-Mapbang"],function(exports,Boolean_0,compare_1,Function_2,js_3,methods_4,bootstrap_5,Type_6,Kind_7,Method_8,Pred_45Type_9,control_10,Number_11,_64_33_12,_64_45Type_13,_63_14,Seq_15,Stream_16,Set_33_17,control_18,_33_19,Number_20,Try_21,_64_45Type_22,Weak_45Id_45Map_33_23){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_ms.get(_$2,"and"),not=_ms.get(_$2,"not"),_$3=_ms.getModule(compare_1),_61_63=_ms.get(_$3,"=?"),_$4=_ms.getModule(Function_2),Action=_ms.get(_$4,"Action"),identity=_ms.get(_$4,"identity"),Pred=_ms.get(_$4,"Pred"),_$5=_ms.getModule(js_3),defined_63=_ms.get(_$5,"defined?"),id_61_63=_ms.get(_$5,"id=?"),_$6=_ms.getModule(methods_4),_43=_ms.get(_$6,"+"),_$7=_ms.getModule(bootstrap_5),msDef=_ms.get(_$7,"msDef"),_$8=_ms.getModule(Type_6),_61_62=_ms.get(_$8,"=>"),contains_63=_ms.get(_$8,"contains?"),type_45of=_ms.get(_$8,"type-of"),Kind=_ms.getDefaultExport(Kind_7),Method=_ms.getDefaultExport(Method_8),_$10=_ms.getModule(Method_8),impl_33=_ms.get(_$10,"impl!"),_$11=_ms.getModule(Pred_45Type_9),Any=_ms.get(_$11,"Any"),Opt=_ms.get(_$11,"Opt"),_$13=_ms.lazyGetModule(control_10),opr=_ms.lazyProp(_$13,"opr"),Ref_33=_ms.lazyProp(_$13,"Ref!"),get=_ms.lazyProp(_$13,"get"),set_33=_ms.lazyProp(_$13,"set!"),_$15=_ms.lazyGetModule(Number_11),Nat=_ms.lazyProp(_$15,"Nat"),_$16=_ms.lazyGetModule(_64_33_12),_45_45_33=_ms.lazyProp(_$16,"--!"),_$17=_ms.lazyGetModule(_64_45Type_13),empty=_ms.lazyProp(_$17,"empty"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_14)
		}),_$19=_ms.lazyGetModule(Seq_15),first=_ms.lazyProp(_$19,"first"),seq_61_63=_ms.lazyProp(_$19,"seq=?"),tail=_ms.lazyProp(_$19,"tail"),Stream=_ms.lazy(function(){
			return _ms.getDefaultExport(Stream_16)
		}),Set_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Set_33_17)
		}),_$23=_ms.lazyGetModule(control_18),build=_ms.lazyProp(_$23,"build"),if_33=_ms.lazyProp(_$23,"if!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_19)
		}),_$24=_ms.lazyGetModule(_33_19),_33not=_ms.lazyProp(_$24,"!not"),_$25=_ms.lazyGetModule(Number_20),divisible_63=_ms.lazyProp(_$25,"divisible?"),_$26=_ms.lazyGetModule(Try_21),fails_63=_ms.lazyProp(_$26,"fails?"),_64_45Type=_ms.lazy(function(){
			return _ms.getDefaultExport(_64_45Type_22)
		}),Weak_45Id_45Map_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Weak_45Id_45Map_33_23)
		});
		const _64=Kind(function(){
			const doc="\"Bag\". Contains a variable number of elements. Most things implementing `iterator` should be @s.\nIf the iteration order of an @ is meaningful and `+ a b` is the concatenation, it is a Seq.\nIf an @ only stores a given element once, it is a Set.";
			const implementor_45test=function(){
				return _ms.set(function(_64_45type){
					return _ms.unlazy(if_33)(not(_61_63(_64_45type,_ms.unlazy(Weak_45Id_45Map_33))),function(){
						_ms.unlazy(_33)(contains_63(_ms.unlazy(_64_45Type),_64_45type),"Be sure to make your @ type a @-Type.");
						const _=_ms.unlazy(empty)(_64_45type);
						return _ms.unlazy(_33)(empty_63,_)
					})
				},"displayName","implementor-test")
			}();
			return {
				doc:doc,
				"implementor-test":implementor_45test,
				displayName:"@"
			}
		}());
		const iterator=exports.iterator=Method(function(){
			const doc="Creates a new Generator! which yields the values in the @.";
			return {
				doc:doc,
				displayName:"iterator"
			}
		}());
		msDef("iterator",iterator);
		const empty_63=exports["empty?"]=Method(function(){
			const doc="Whether `count` is 0. Often much faster.";
			const test=function(){
				return _ms.set(function(){
					const _k0=[[]],_v0=true;
					const _k1=[[1]],_v1=false;
					return _ms.map(_k0,_v0,_k1,_v1)
				},"displayName","test")
			}();
			const _default=function(){
				return _ms.set(function(_){
					return iterator(_).next().done
				},"displayName","default")
			}();
			return {
				doc:doc,
				test:test,
				default:_default,
				displayName:"empty?"
			}
		}());
		impl_33(contains_63,_64,function(){
			const doc="Whether one of the elements =? em.";
			const test=function(){
				return _ms.set(function(){
					_ms.unlazy(_33)(contains_63,[0],0);
					return _ms.unlazy(_33not)(contains_63,[0],1)
				},"displayName","test")
			}();
			return _ms.set(function(_,em){
				_ms.checkContains(Any,em,"em");
				return any_63(_,function(em_45compare){
					return _61_63(em,em_45compare)
				})
			},"doc",doc,"test",test)
		}());
		const fold=exports.fold=function(){
			const doc="Keeps a state variable `acc` and keeps applying `folder acc em` for the elements, in order.\nReturns the final value.\nIf empty?_, fails unless a `start` value for `acc` is provided. Otherwise `acc` starts as the first element.";
			const test=function(){
				return _ms.set(function(){
					const _k0=[[1,2,3],_43],_v0=6;
					const _k1=[[1,2,3],4,_43],_v1=10;
					return _ms.map(_k0,_v0,_k1,_v1)
				},"displayName","test")
			}();
			return _ms.set(function(_,b,c){
				_ms.checkContains(_64,_,"_");
				const _$72=function(){
					if(_ms.bool(defined_63(c))){
						const start=b;
						const folder=c;
						const rest=_;
						return {
							start:start,
							folder:folder,
							rest:rest
						}
					} else {
						const start=_ms.unlazy(first)(_);
						const folder=b;
						const rest=_ms.unlazy(tail)(_);
						return {
							start:start,
							folder:folder,
							rest:rest
						}
					}
				}(),start=_$72.start,rest=_$72.rest,folder=_$72.folder;
				const acc=_ms.unlazy(Ref_33)(start);
				const iter=iterator(rest);
				loop84:while(true){
					const _$85=iter.next(),value=_$85.value,done=_$85.done;
					if(_ms.bool(done)){
						break loop84
					} else {
						_ms.unlazy(set_33)(acc,folder(_ms.unlazy(get)(acc),value))
					}
				};
				return _ms.unlazy(get)(acc)
			},"doc",doc,"test",test,"displayName","fold")
		}();
		const each_33=exports["each!"]=Method(function(){
			const doc="Calls do-for-each on every element in the @, in order.";
			const test=function(){
				return _ms.set(function(){
					return _ms.unlazy(_33)(_61_63,[1,2,3],_ms.unlazy(build)(function(_yield){
						return each_33([1,2,3],_yield)
					}))
				},"displayName","test")
			}();
			const _default=function(){
				return _ms.set(function(_,do_45for_45each){
					_ms.checkContains(Action,do_45for_45each,"do-for-each");
					const iter=iterator(_);
					loop100:while(true){
						const _$101=iter.next(),value=_$101.value,done=_$101.done;
						if(_ms.bool(done)){
							break loop100
						} else {
							do_45for_45each(value)
						}
					}
				},"displayName","default")
			}();
			return {
				doc:doc,
				test:test,
				default:_default,
				displayName:"each!"
			}
		}());
		const any_63=exports["any?"]=function(){
			const doc="Whether pred? is true for at least one element.";
			const test=function(){
				return _ms.set(function(){
					const _k0=[[0,1],_ms.sub(_61_63,1)],_v0=true;
					const _k1=[[0,1],_ms.sub(_61_63,2)],_v1=false;
					return _ms.map(_k0,_v0,_k1,_v1)
				},"displayName","test")
			}();
			return _ms.set(function(_,_63pred_63){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(_ms.sub(Opt,Pred),_63pred_63,"?pred?");
				const pred_63=_ms.unlazy(opr)(_63pred_63,identity);
				return not(empty_63(_63find(_,pred_63)))
			},"doc",doc,"test",test,"displayName","any?")
		}();
		const all_63=exports["all?"]=function(){
			const doc="Whether pred? is true for every element.";
			const test=function(){
				return _ms.set(function(){
					const _k0=[[0,0],_ms.sub(_61_63,0)],_v0=true;
					const _k1=[[0,1],_ms.sub(_61_63,0)],_v1=false;
					return _ms.map(_k0,_v0,_k1,_v1)
				},"displayName","test")
			}();
			return _ms.set(function(_,_63pred_63){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(_ms.sub(Opt,Pred),_63pred_63,"?pred?");
				const pred_63=_ms.unlazy(opr)(_63pred_63,identity);
				return empty_63(_63find(_,function(em){
					return not(pred_63(em))
				}))
			},"doc",doc,"test",test,"displayName","all?")
		}();
		const _63find=exports["?find"]=function(){
			const doc="First element for which pred? is true.\n(To find all, use `keep`.)";
			const test=function(){
				return _ms.set(function(){
					const _k0=[[0,1],_ms.sub(_61_63,1)],_v0=_ms.unlazy(_63)(1);
					const _k1=[[0],_ms.sub(_61_63,1)],_v1=_ms.unlazy(empty)(_ms.unlazy(_63));
					return _ms.map(_k0,_v0,_k1,_v1)
				},"displayName","test")
			}();
			return _ms.set(function(_,pred_63){
				_ms.checkContains(Pred,pred_63,"pred?");
				const iter=iterator(_);
				const found=_ms.unlazy(Ref_33)(_ms.unlazy(empty)(_ms.unlazy(_63)));
				loop138:while(true){
					const _$139=iter.next(),value=_$139.value,done=_$139.done;
					if(_ms.bool(done)){
						break loop138
					} else if(_ms.bool(pred_63(value))){
						_ms.unlazy(set_33)(found,_ms.unlazy(_63)(value));
						break loop138
					} else {}
				};
				return _ms.unlazy(get)(found)
			},"doc",doc,"test",test,"displayName","?find")
		}();
		const count=exports.count=Method(function(){
			const doc="Number of elements.";
			const test=function(){
				return _ms.set(function(){
					const _k0=[[]],_v0=0;
					const _k1=[[1,2,3]],_v1=3;
					return _ms.map(_k0,_v0,_k1,_v1)
				},"displayName","test")
			}();
			const _default=function(){
				return _ms.set(function(_){
					_ms.checkContains(_64,_,"_");
					return _ms.checkContains(_ms.unlazy(Nat),fold(_,0,_ms.sub(_43,1)),"res")
				},"displayName","default")
			}();
			return {
				doc:doc,
				test:test,
				default:_default,
				displayName:"count"
			}
		}());
		const keep=exports.keep=Method(function(){
			const doc="Only the elements that satisfy `keep-if?`.";
			const test=function(){
				return _ms.set(function(){
					const _k0=[[1,2],_ms.sub(_61_63,2)],_v0=[2];
					return _ms.map(_k0,_v0)
				},"displayName","test")
			}();
			const _default=function(){
				return _ms.set(function(_,keep_45if_63){
					_ms.checkContains(_64,_,"_");
					_ms.checkContains(Pred,keep_45if_63,"keep-if?");
					return _61_62(type_45of(_),keep_39(_,keep_45if_63))
				},"displayName","default")
			}();
			return {
				doc:doc,
				test:test,
				default:_default,
				displayName:"keep"
			}
		}());
		const keep_39=exports["keep'"]=function(){
			const doc="Lazy keep.";
			const test=function(){
				return _ms.set(function(){
					const _k0=[[1,2],_ms.sub(_61_63,2)],_v0=_61_62(_ms.unlazy(Stream),[2]);
					return _ms.map(_k0,_v0)
				},"displayName","test")
			}();
			return _ms.set(function(_,keep_45if_63){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(Pred,keep_45if_63,"keep-if?");
				return _ms.unlazy(Stream)(function*(){
					const iter=iterator(_);
					loop174:while(true){
						const _$175=iter.next(),value=_$175.value,done=_$175.done;
						if(_ms.bool(done)){
							break loop174
						} else if(_ms.bool(keep_45if_63(value))){
							(yield value)
						} else {}
					}
				})
			},"doc",doc,"test",test,"displayName","keep'")
		}();
		const map=exports.map=function(){
			const doc="TODO";
			const test=function(){
				return _ms.set(function(){
					const _k0=[[true,false],not],_v0=[false,true];
					return _ms.map(_k0,_v0)
				},"displayName","test")
			}();
			return _ms.set(function(_,mapper){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(Function,mapper,"mapper");
				return _61_62(type_45of(_),map_39(_,mapper))
			},"doc",doc,"test",test,"displayName","map")
		}();
		const map_39=exports["map'"]=function(){
			const doc="Lazy map.";
			const test=function(){
				return _ms.set(function(){
					const _k0=[[true,false],not],_v0=_61_62(_ms.unlazy(Stream),[false,true]);
					return _ms.map(_k0,_v0)
				},"displayName","test")
			}();
			return _ms.set(function(_,mapper){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(Function,mapper,"mapper");
				return _ms.unlazy(Stream)(function*(){
					const iter=iterator(_);
					loop199:while(true){
						const _$200=iter.next(),value=_$200.value,done=_$200.done;
						if(_ms.bool(done)){
							break loop199
						} else {
							(yield mapper(value))
						}
					}
				})
			},"doc",doc,"test",test,"displayName","map'")
		}();
		const fold_45map=exports["fold-map"]=function(){
			const doc="Performs a map while also carrying some state from one element to the next.\n`mapper-folder` takes in the state and the element,\nand produces `here` (the mapped value) and `next` (the next state value).\nUnlike map, this must be eagerly evaluated, like fold.";
			const test=function(){
				return _ms.set(function(){
					const f=function(){
						return _ms.set(function(acc,em){
							const here=_43(1,em);
							const next=_43(1,acc);
							return {
								here:here,
								next:next
							}
						},"displayName","f")
					}();
					const _k0=[[1,2,3],0,f],_v0=function(){
						const mapped=[2,3,4];
						const folded=3;
						return {
							mapped:mapped,
							folded:folded
						}
					}();
					return _ms.map(_k0,_v0)
				},"displayName","test")
			}();
			return _ms.set(function(_,start,mapper_45folder){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(Any,start,"start");
				_ms.checkContains(_ms.sub(Function,2,Object),mapper_45folder,"mapper-folder");
				const acc=_ms.unlazy(Ref_33)(start);
				const mapped=_61_62(Array,map(_,function(){
					return _ms.set(function(em){
						const _$225=mapper_45folder(_ms.unlazy(get)(acc),em),here=_ms.checkContains(Any,_$225.here,"here"),next=_ms.checkContains(Any,_$225.next,"next");
						_ms.unlazy(set_33)(acc,next);
						return here
					},"displayName","mapped")
				}()));
				const folded=_ms.unlazy(get)(acc);
				return {
					mapped:mapped,
					folded:folded
				}
			},"doc",doc,"test",test,"displayName","fold-map")
		}();
		const flat_45map=exports["flat-map"]=Method(function(){
			const doc="Like `map`, but each mapping produces multiple values.";
			const test=function(){
				return _ms.set(function(){
					const f=function(){
						return _ms.set(function(a){
							return [a,a]
						},"displayName","f")
					}();
					const _k0=[[1,2],f],_v0=[1,1,2,2];
					return _ms.map(_k0,_v0)
				},"displayName","test")
			}();
			const _default=function(){
				return _ms.set(function(_,mapper){
					_ms.checkContains(_ms.sub(Function,Any,_64),mapper,"mapper");
					return _61_62(type_45of(_),flat_45map_39(_,mapper))
				},"displayName","default")
			}();
			return {
				doc:doc,
				test:test,
				default:_default,
				displayName:"flat-map"
			}
		}());
		const flat_45map_39=exports["flat-map'"]=function(){
			const doc="Lazy flat-map.";
			const test=function(){
				return _ms.set(function(){
					const f=function(){
						return _ms.set(function(_){
							return function(){
								if(_ms.bool(_ms.unlazy(divisible_63)(_,2))){
									return [_,_]
								} else {
									return [_]
								}
							}()
						},"displayName","f")
					}();
					const _k0=[[1,2,3,4],f],_v0=_61_62(_ms.unlazy(Stream),[1,2,2,3,4,4]);
					return _ms.map(_k0,_v0)
				},"displayName","test")
			}();
			return _ms.set(function(_,mapper){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(_ms.sub(Function,Any,_64),mapper,"mapper");
				return _ms.unlazy(Stream)(function*(){
					const iter=iterator(_);
					loop253:while(true){
						const _$254=iter.next(),value=_$254.value,done=_$254.done;
						if(_ms.bool(done)){
							break loop253
						} else {
							(yield* iterator(mapper(value)))
						}
					}
				})
			},"doc",doc,"test",test,"displayName","flat-map'")
		}();
		const flatten=exports.flatten=Method(function(){
			const doc="For an @ containing many @, produces an @ containing all of their entries combined.\nThis does *not* consider more than 1 nested level, and there *every* element of _ must be an @.\nMore efficient than `fold + _`.";
			const test=function(){
				return _ms.set(function(){
					const _k0=[[[1,2],[3],[]]],_v0=[1,2,3];
					return _ms.map(_k0,_v0)
				},"displayName","test")
			}();
			const _default=function(){
				return _ms.set(function(_){
					return _61_62(type_45of(_),flatten_39(_))
				},"displayName","default")
			}();
			return {
				doc:doc,
				test:test,
				default:_default,
				displayName:"flatten"
			}
		}());
		const flatten_39=exports["flatten'"]=function(){
			const doc="Lazy flatten.";
			const test=function(){
				return _ms.set(function(){
					const _k0=[[[1,2],[3],[]]],_v0=_61_62(_ms.unlazy(Stream),[1,2,3]);
					const _k1=[[[1],[[2]]]],_v1=_61_62(_ms.unlazy(Stream),[1,[2]]);
					_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
						return _61_62(Array,flatten([[1],2,[3]]))
					});
					return _ms.map(_k0,_v0,_k1,_v1)
				},"displayName","test")
			}();
			return _ms.set(function(_){
				_ms.checkContains(_ms.sub(_64,_64),_,"_");
				return _ms.unlazy(Stream)(function*(){
					const iter=iterator(_);
					loop284:while(true){
						const _$285=iter.next(),value=_$285.value,done=_$285.done;
						if(_ms.bool(done)){
							break loop284
						} else {
							(yield* iterator(value))
						}
					}
				})
			},"doc",doc,"test",test,"displayName","flatten'")
		}();
		const _43_43=exports["++"]=Method(function(){
			const doc="Type-preserving +.";
			const test=function(){
				return _ms.set(function(){
					const _k0=[[0],[1]],_v0=[0,1];
					return _ms.map(_k0,_v0)
				},"displayName","test")
			}();
			const _default=function(){
				return _ms.set(function(_64a,_64b){
					return _61_62(type_45of(_64a),_43_43_39(_64a,_64b))
				},"displayName","default")
			}();
			return {
				doc:doc,
				test:test,
				default:_default,
				displayName:"++"
			}
		}());
		const _43_43_39=exports["++'"]=function(){
			const doc="Concatenation. Sets should override this.";
			const test=function(){
				return _ms.set(function(){
					const _k0=[[0],[1]],_v0=_61_62(_ms.unlazy(Stream),[0,1]);
					return _ms.map(_k0,_v0)
				},"displayName","test")
			}();
			return _ms.set(function(_64a,_64b){
				return _ms.checkContains(_ms.unlazy(Stream),_ms.unlazy(Stream)(function*(){
					(yield* iterator(_64a));
					return (yield* iterator(_64b))
				}),"res")
			},"doc",doc,"test",test,"displayName","++'")
		}();
		const _45_45=exports["--"]=Method(function(){
			const doc="@ without any of the elements in `remove`.\nRemoves the *first* occurrence of each element.";
			const test=function(){
				return _ms.set(function(){
					const _k0=[[1,2,1],[1]],_v0=[2,1];
					return _ms.map(_k0,_v0)
				},"displayName","test")
			}();
			const _default=function(){
				return _ms.set(function(_,_64remove){
					_ms.checkContains(_64,_64remove,"@remove");
					return _61_62(type_45of(_),_45_45_39(_,_64remove))
				},"displayName","default")
			}();
			return {
				doc:doc,
				test:test,
				default:_default,
				displayName:"--"
			}
		}());
		const _45_45_39=exports["--'"]=function(){
			const doc="Lazy --.";
			const test=function(){
				return _ms.set(function(){
					const _k0=[[1,2,1],[1]],_v0=_61_62(_ms.unlazy(Stream),[2,1]);
					return _ms.map(_k0,_v0)
				},"displayName","test")
			}();
			return _ms.set(function(_,_64remove){
				_ms.checkContains(_64,_64remove,"@remove");
				return _ms.checkContains(_64,_ms.unlazy(Stream)(function*(){
					const iter=iterator(_);
					const _64remove_45remaining=_61_62(_ms.unlazy(Set_33),_64remove);
					loop327:while(true){
						const _$328=iter.next(),value=_$328.value,done=_$328.done;
						if(_ms.bool(done)){
							break loop327
						} else {
							{
								const _=value;
								if(_ms.bool(_ms.contains(_64remove_45remaining,_))){
									_ms.unlazy(_45_45_33)(_64remove_45remaining,[value])
								} else {
									(yield value)
								}
							}
						}
					}
				}),"res")
			},"doc",doc,"test",test,"displayName","--'")
		}();
		impl_33(_61_63,_64,function(){
			const test=function(){
				return _ms.set(function(){
					return _ms.unlazy(_33)(_61_63,[1],[1])
				},"displayName","test")
			}();
			return _ms.set(function(_64a,_64b){
				return and(id_61_63(type_45of(_64a),type_45of(_64b)),_ms.lazy(function(){
					return _ms.unlazy(seq_61_63)(_64a,_64b)
				}))
			},"test",test)
		}());
		const displayName=exports.displayName="@";
		exports.default=_64;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL0AubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7RUE2QkEsVUFBSSxlQUNJO0dBQVAsVUFDQztHQUdELG1DQUFtQjttQkFBQSxTQUFBLFdBQ007OEJBQW5CLElBQUssT0FBRyw0Q0FDdUIsVUFBQTtzQkFBaEMsbUNBQWlCLFlBQVM7TUFDN0IsMEJBQVU7NkJBQ1IsU0FBTztLQUFBO0lBQUE7Ozs7Ozs7O0VBRVosZ0NBQVUsaUJBQ007R0FBZixVQUFNOzs7Ozs7RUFDUCxNQUFPLFdBQVU7RUFFakIsaUNBQVEsaUJBQ007R0FBYixVQUFNO0dBQ04scUJBQ087bUJBQUEsVUFBQTtLQUFOLFVBQUEsQ0FBRSxRQUFTO0tBQ1gsVUFBQSxDQUFFLENBQUUsUUFBUzs7OztHQUNkLHlCQUFVO21CQUFBLFNBQUEsRUFDQztZQUFWLFNBQUE7Ozs7Ozs7Ozs7RUFHRCxRQUFNLFlBQVUsY0FDQztHQUFoQixVQUFNO0dBQ04scUJBQ087bUJBQUEsVUFBQTtxQkFBSixZQUFVLENBQUUsR0FBSTsrQkFDYixZQUFVLENBQUUsR0FBSTtJQUFBOztrQkFDckIsU0FBQSxFQUFFLEdBQ007c0JBREg7V0FDTCxPQUFLLEVBQUcsU0FBQSxhQUNVO1lBQWpCLE9BQUcsR0FBRztJQUFBO0dBQUE7O0VBRVQsa0NBQ0s7R0FBSixVQUNDO0dBR0QscUJBQ087bUJBQUEsVUFBQTtLQUFOLFVBQUEsQ0FBRSxDQUFFLEVBQUUsRUFBRSxHQUFJLFNBQU87S0FDbkIsVUFBQSxDQUFFLENBQUUsRUFBRSxFQUFFLEdBQUksRUFBRSxTQUFPOzs7O2tCQUNyQixTQUFBLEVBQUksRUFBRSxFQUNDO3NCQURMO0lBQ0Y7S0FDQyxZQUFBLFdBQVMsSUFDQztNQUFULFlBQU87TUFDUCxhQUFRO01BQ1IsV0FBTTs7Ozs7O1lBRUg7TUFBSCw4QkFBTztNQUNQLGFBQVE7TUFDUiw0QkFBTTs7Ozs7Ozs7SUFF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LFdBQU8sU0FBQTt3QkFFRjtNQUFKLFlBQWE7TUFFUixZQUFKLE1BQ0k7T0FBSDthQUVHO2VBQUMsU0FBUztNQUFBO0tBQUE7SUFBQTtHQUFBOztFQUduQiwyQkFBSSxpQkFDTTtHQUFULFVBQU07R0FDTixxQkFDTzttQkFBQSxVQUFBO0tBQU4sVUFBQSxDQUFFLENBQUUsR0FBSSxDQUFFLFFBQVMsQ0FBRSxFQUFFOzs7O0dBQ3hCLHlCQUFVO21CQUFBLFNBQUEsS0FBRyxLQUNFO1lBQWQsT0FBSSxVQUFRLE1BQUssVUFBSSxLQUFHO0lBQUE7Ozs7Ozs7OztFQUUxQix5Q0FDSTtHQUFILFVBQU07R0FDTixxQkFDTzttQkFBQSxVQUFBO0tBQU4sVUFBQSxDQUFFLENBQUUsR0FBSSxDQUFFLFFBQVMsMEJBQVUsQ0FBRSxFQUFFOzs7O2tCQUNqQyxTQUFRLEtBQUcsS0FDRTttRUFDSixXQUFBO2FBQUosU0FBUztZQUNULFFBQUEsU0FBUztJQUFBOzs7RUFHaEIsMkJBQUksaUJBQ007R0FBVCxVQUNDO0dBRUQscUJBQ087bUJBQUEsVUFBQTtLQUFOLFVBQUEsQ0FBRSxDQUFFLEVBQUUsRUFBRSxHQUFJLENBQUUsUUFBUyxDQUFFLEVBQUU7Ozs7R0FDNUIseUJBQVU7bUJBQUEsU0FBQSxFQUFFLFVBQ1M7dUJBREQ7WUFDbkIsT0FBRyxVQUFBLEdBQVUsVUFBSSxFQUFFO0lBQUE7Ozs7Ozs7OztFQUVyQix5Q0FDSTtHQUFILFVBQU07R0FDTixxQkFDTzttQkFBQSxVQUFBO0tBQU4sVUFBQSxDQUFFLENBQUUsRUFBRSxFQUFFLEdBQUksQ0FBRSxRQUFTLDBCQUFVLENBQUUsRUFBRTs7OztrQkFDckMsU0FBRyxFQUFFLFVBQ1M7c0JBREQ7NkJBQVosdUJBRVEsV0FBQTtLQUFSLFdBQU8sU0FBQTtLQUNQLDRCQUFvQiwwQkFBUTt3QkFFdkI7TUFBSixZQUFhO01BRVIsWUFBSixNQUNJO09BQUg7YUFFRztPQUFHO1FBQUEsUUFBQTtRQUNMLHlCQUFDLHNCQUFELElBQ2tCOytCQUNiLHNCQUFrQixDQUFFO1FBQUEsT0FFckI7Z0JBQUE7UUFBQTtPQUFBO01BQUE7S0FBQTtJQUFBOzs7RUFHWCxRQUFNLE9BQUcsY0FDQztHQUFULHFCQUNPO21CQUFBLFVBQUE7NEJBQUosT0FBRyxDQUFFLEdBQUksQ0FBRTtJQUFBOztrQkFDYixTQUFBLEtBQUcsS0FDRTtXQUFMLElBQUssU0FBTSxVQUFRLE1BQUssVUFBUTtrQ0FBYSxLQUFHO0lBQUE7R0FBQTs7RUF4Vm5ELHNDQUFBO2tCQTBWQSIsImZpbGUiOiJhdC9hdC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9