"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Bool","../compare","../Fun","../js","../math/methods","../Obj","../private/bootstrap","../Type/Type","../Type/Kind","../Type/Method","../Type/Pred-Type","../control","../Generatorbang","../math/Num","./atbang","./at-Type","./q","./Seq/Seq","./Seq/Stream","./Set/Setbang","../control","../bang","../math/Num","../Try","./at-Type","./Map/Weak-Id-Mapbang"],function(exports,Bool_0,compare_1,Fun_2,js_3,methods_4,Obj_5,bootstrap_6,Type_7,Kind_8,Method_9,Pred_45Type_10,control_11,Generator_33_12,Num_13,_64_33_14,_64_45Type_15,_63_16,Seq_17,Stream_18,Set_33_19,control_20,_33_21,Num_22,Try_23,_64_45Type_24,Weak_45Id_45Map_33_25){
	exports._get=_ms.lazy(function(){
		const Bool=_ms.getDefaultExport(Bool_0),_$2=_ms.getModule(Bool_0),and=_ms.get(_$2,"and"),not=_ms.get(_$2,"not"),_$3=_ms.getModule(compare_1),_61_63=_ms.get(_$3,"=?"),Fun=_ms.getDefaultExport(Fun_2),_$4=_ms.getModule(Fun_2),Act=_ms.get(_$4,"Act"),identity=_ms.get(_$4,"identity"),Pred=_ms.get(_$4,"Pred"),_$5=_ms.getModule(js_3),defined_63=_ms.get(_$5,"defined?"),id_61_63=_ms.get(_$5,"id=?"),_$6=_ms.getModule(methods_4),_43=_ms.get(_$6,"+"),Obj=_ms.getDefaultExport(Obj_5),_$8=_ms.getModule(bootstrap_6),msDef=_ms.get(_$8,"msDef"),_$9=_ms.getModule(Type_7),_61_62=_ms.get(_$9,"=>"),contains_63=_ms.get(_$9,"contains?"),type_45of=_ms.get(_$9,"type-of"),Kind=_ms.getDefaultExport(Kind_8),Method=_ms.getDefaultExport(Method_9),_$11=_ms.getModule(Method_9),impl_33=_ms.get(_$11,"impl!"),_$12=_ms.getModule(Pred_45Type_10),Any=_ms.get(_$12,"Any"),Opt=_ms.get(_$12,"Opt"),_$14=_ms.lazyGetModule(control_11),opr=_ms.lazyProp(_$14,"opr"),Ref_33=_ms.lazyProp(_$14,"Ref!"),get=_ms.lazyProp(_$14,"get"),set_33=_ms.lazyProp(_$14,"set!"),Generator_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Generator_33_12)
		}),_$16=_ms.lazyGetModule(Num_13),Nat=_ms.lazyProp(_$16,"Nat"),_$17=_ms.lazyGetModule(_64_33_14),_45_45_33=_ms.lazyProp(_$17,"--!"),_$18=_ms.lazyGetModule(_64_45Type_15),empty=_ms.lazyProp(_$18,"empty"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_16)
		}),_$20=_ms.lazyGetModule(Seq_17),first=_ms.lazyProp(_$20,"first"),seq_61_63=_ms.lazyProp(_$20,"seq=?"),tail=_ms.lazyProp(_$20,"tail"),Stream=_ms.lazy(function(){
			return _ms.getDefaultExport(Stream_18)
		}),Set_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Set_33_19)
		}),_$24=_ms.lazyGetModule(control_20),build=_ms.lazyProp(_$24,"build"),if_33=_ms.lazyProp(_$24,"if!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_21)
		}),_$25=_ms.lazyGetModule(_33_21),_33not=_ms.lazyProp(_$25,"!not"),_$26=_ms.lazyGetModule(Num_22),divisible_63=_ms.lazyProp(_$26,"divisible?"),_$27=_ms.lazyGetModule(Try_23),fails_63=_ms.lazyProp(_$27,"fails?"),_64_45Type=_ms.lazy(function(){
			return _ms.getDefaultExport(_64_45Type_24)
		}),Weak_45Id_45Map_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Weak_45Id_45Map_33_25)
		});
		const exports={};
		const _64=Kind(function(){
			const doc="\"Bag\". Contains a variable number of elements. Most things implementing `iterator` should be @s.\nIf the iteration order of an @ is meaningful and `+ a b` is the concatenation, it is a Seq.\nIf an @ only stores a given element once, it is a Set.";
			const implementor_45test=function(_64_45type){
				return _ms.unlazy(if_33)(not(_61_63(_64_45type,_ms.unlazy(Weak_45Id_45Map_33))),function(){
					_ms.unlazy(_33)(contains_63(_ms.unlazy(_64_45Type),_64_45type),"Be sure to make your @ type a @-Type.");
					const _=_ms.unlazy(empty)(_64_45type);
					return _ms.unlazy(_33)(empty_63,_)
				})
			};
			return {
				doc:doc,
				"implementor-test":implementor_45test,
				displayName:"@"
			}
		}());
		const iterator=exports.iterator=Method(function(){
			const doc=function(_){
				return _ms.checkContains(_ms.unlazy(Generator_33),"Creates a new Generator! which yields the values in the @. Should create a new one every time.","res")
			};
			return {
				doc:doc,
				displayName:"iterator"
			}
		}());
		msDef("iterator",iterator);
		const empty_63=exports["empty?"]=Method(function(){
			const doc="Whether `count` is 0. Often much faster.";
			const test=function(){
				const _k0=[[]],_v0=true;
				const _k1=[[1]],_v1=false;
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			const _default=function(_){
				return _ms.checkContains(Bool,iterator(_).next().done,"res")
			};
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
				_ms.unlazy(_33)(contains_63,[0],0);
				return _ms.unlazy(_33not)(contains_63,[0],1)
			};
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
				const _k0=[[1,2,3],_43],_v0=6;
				const _k1=[[1,2,3],4,_43],_v1=10;
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function(_,b,c){
				_ms.checkContains(_64,_,"_");
				const _$74=function(){
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
				}(),start=_$74.start,rest=_$74.rest,folder=_$74.folder;
				const acc=_ms.unlazy(Ref_33)(start);
				const iter=iterator(rest);
				loop86:while(true){
					const _$87=iter.next(),value=_$87.value,done=_$87.done;
					if(_ms.bool(done)){
						break loop86
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
				return _ms.unlazy(_33)(_61_63,[1,2,3],_ms.unlazy(build)(function(_yield){
					return each_33([1,2,3],_yield)
				}))
			};
			const _default=function(_,do_45for_45each){
				_ms.checkContains(Act,do_45for_45each,"do-for-each");
				const iter=iterator(_);
				loop102:while(true){
					const _$103=iter.next(),value=_$103.value,done=_$103.done;
					if(_ms.bool(done)){
						break loop102
					} else {
						do_45for_45each(value)
					}
				}
			};
			return {
				default:_default,
				doc:doc,
				test:test,
				displayName:"each!"
			}
		}());
		const any_63=exports["any?"]=function(){
			const doc="Whether pred? is true for at least one element.";
			const test=function(){
				const _k0=[[0,1],_ms.sub(_61_63,1)],_v0=true;
				const _k1=[[0,1],_ms.sub(_61_63,2)],_v1=false;
				return _ms.map(_k0,_v0,_k1,_v1)
			};
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
				const _k0=[[0,0],_ms.sub(_61_63,0)],_v0=true;
				const _k1=[[0,1],_ms.sub(_61_63,0)],_v1=false;
				return _ms.map(_k0,_v0,_k1,_v1)
			};
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
				const _k0=[[0,1],_ms.sub(_61_63,1)],_v0=_ms.unlazy(_63)(1);
				const _k1=[[0],_ms.sub(_61_63,1)],_v1=_ms.unlazy(empty)(_ms.unlazy(_63));
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function(_,pred_63){
				_ms.checkContains(Pred,pred_63,"pred?");
				const iter=iterator(_);
				const found=_ms.unlazy(Ref_33)(_ms.unlazy(empty)(_ms.unlazy(_63)));
				loop140:while(true){
					const _$141=iter.next(),value=_$141.value,done=_$141.done;
					if(_ms.bool(done)){
						break loop140
					} else if(_ms.bool(pred_63(value))){
						_ms.unlazy(set_33)(found,_ms.unlazy(_63)(value));
						break loop140
					} else {
						null
					}
				};
				return _ms.unlazy(get)(found)
			},"doc",doc,"test",test,"displayName","?find")
		}();
		const count=exports.count=Method(function(){
			const doc="Number of elements.";
			const test=function(){
				const _k0=[[]],_v0=0;
				const _k1=[[1,2,3]],_v1=3;
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			const _default=function(_){
				_ms.checkContains(_64,_,"_");
				return _ms.checkContains(_ms.unlazy(Nat),fold(_,0,_ms.sub(_43,1)),"res")
			};
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
				const _k0=[[1,2],_ms.sub(_61_63,2)],_v0=[2];
				return _ms.map(_k0,_v0)
			};
			const _default=function(_,keep_45if_63){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(Pred,keep_45if_63,"keep-if?");
				return _61_62(type_45of(_),keep_39(_,keep_45if_63))
			};
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
				const _k0=[[1,2],_ms.sub(_61_63,2)],_v0=_61_62(_ms.unlazy(Stream),[2]);
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function(_,keep_45if_63){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(Pred,keep_45if_63,"keep-if?");
				return _ms.unlazy(Stream)(function*(){
					const iter=iterator(_);
					loop176:while(true){
						const _$177=iter.next(),value=_$177.value,done=_$177.done;
						if(_ms.bool(done)){
							break loop176
						} else if(_ms.bool(keep_45if_63(value))){
							(yield value)
						} else {
							null
						}
					}
				})
			},"doc",doc,"test",test,"displayName","keep'")
		}();
		const map=exports.map=function(){
			const doc="TODO";
			const test=function(){
				const _k0=[[true,false],not],_v0=[false,true];
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function(_,mapper){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(Fun,mapper,"mapper");
				return _61_62(type_45of(_),map_39(_,mapper))
			},"doc",doc,"test",test,"displayName","map")
		}();
		const map_39=exports["map'"]=function(){
			const doc="Lazy map.";
			const test=function(){
				const _k0=[[true,false],not],_v0=_61_62(_ms.unlazy(Stream),[false,true]);
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function(_,mapper){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(Fun,mapper,"mapper");
				return _ms.unlazy(Stream)(function*(){
					const iter=iterator(_);
					loop201:while(true){
						const _$202=iter.next(),value=_$202.value,done=_$202.done;
						if(_ms.bool(done)){
							break loop201
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
				const f=function(acc,em){
					const here=_43(1,em);
					const next=_43(1,acc);
					return {
						here:here,
						next:next
					}
				};
				const _k0=[[1,2,3],0,f],_v0=function(){
					const mapped=[2,3,4];
					const folded=3;
					return {
						mapped:mapped,
						folded:folded
					}
				}();
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function(_,start,mapper_45folder){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(Any,start,"start");
				_ms.checkContains(_ms.sub(Fun,2,Obj),mapper_45folder,"mapper-folder");
				const acc=_ms.unlazy(Ref_33)(start);
				const mapped=_61_62(Array,map(_,function(em){
					const _$227=mapper_45folder(_ms.unlazy(get)(acc),em),here=_ms.checkContains(Any,_$227.here,"here"),next=_ms.checkContains(Any,_$227.next,"next");
					_ms.unlazy(set_33)(acc,next);
					return here
				}));
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
				const f=function(a){
					return [a,a]
				};
				const _k0=[[1,2],f],_v0=[1,1,2,2];
				return _ms.map(_k0,_v0)
			};
			const _default=function(_,mapper){
				_ms.checkContains(_ms.sub(Fun,Any,_64),mapper,"mapper");
				return _61_62(type_45of(_),flat_45map_39(_,mapper))
			};
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
				const f=function(_){
					return function(){
						if(_ms.bool(_ms.unlazy(divisible_63)(_,2))){
							return [_,_]
						} else {
							return [_]
						}
					}()
				};
				const _k0=[[1,2,3,4],f],_v0=_61_62(_ms.unlazy(Stream),[1,2,2,3,4,4]);
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function(_,mapper){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(_ms.sub(Fun,Any,_64),mapper,"mapper");
				return _ms.unlazy(Stream)(function*(){
					const iter=iterator(_);
					loop255:while(true){
						const _$256=iter.next(),value=_$256.value,done=_$256.done;
						if(_ms.bool(done)){
							break loop255
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
				const _k0=[[[1,2],[3],[]]],_v0=[1,2,3];
				return _ms.map(_k0,_v0)
			};
			const _default=function(_){
				return _61_62(type_45of(_),flatten_39(_))
			};
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
				const _k0=[[[1,2],[3],[]]],_v0=_61_62(_ms.unlazy(Stream),[1,2,3]);
				const _k1=[[[1],[[2]]]],_v1=_61_62(_ms.unlazy(Stream),[1,[2]]);
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return _61_62(Array,flatten([[1],2,[3]]))
				});
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function(_){
				_ms.checkContains(_ms.sub(_64,_64),_,"_");
				return _ms.unlazy(Stream)(function*(){
					const iter=iterator(_);
					loop286:while(true){
						const _$287=iter.next(),value=_$287.value,done=_$287.done;
						if(_ms.bool(done)){
							break loop286
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
				const _k0=[[0],[1]],_v0=[0,1];
				return _ms.map(_k0,_v0)
			};
			const _default=function(_64a,_64b){
				return _61_62(type_45of(_64a),_43_43_39(_64a,_64b))
			};
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
				const _k0=[[0],[1]],_v0=_61_62(_ms.unlazy(Stream),[0,1]);
				return _ms.map(_k0,_v0)
			};
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
				const _k0=[[1,2,1],[1]],_v0=[2,1];
				return _ms.map(_k0,_v0)
			};
			const _default=function(_,_64remove){
				_ms.checkContains(_64,_64remove,"@remove");
				return _61_62(type_45of(_),_45_45_39(_,_64remove))
			};
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
				const _k0=[[1,2,1],[1]],_v0=_61_62(_ms.unlazy(Stream),[2,1]);
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function(_,_64remove){
				_ms.checkContains(_64,_64remove,"@remove");
				return _ms.checkContains(_64,_ms.unlazy(Stream)(function*(){
					const iter=iterator(_);
					const _64remove_45remaining=_61_62(_ms.unlazy(Set_33),_64remove);
					loop329:while(true){
						const _$330=iter.next(),value=_$330.value,done=_$330.done;
						if(_ms.bool(done)){
							break loop329
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
				return _ms.unlazy(_33)(_61_63,[1],[1])
			};
			return _ms.set(function(_64a,_64b){
				return and(id_61_63(type_45of(_64a),type_45of(_64b)),_ms.lazy(function(){
					return _ms.unlazy(seq_61_63)(_64a,_64b)
				}))
			},"test",test)
		}());
		exports.default=_64;
		const displayName=exports.displayName="@";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL0AubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2lDQThCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFBQSxVQUFJLGVBQUk7R0FDUCxVQUNDO0dBR0QseUJBQW1CLFNBQUEsV0FBTTs2QkFDbkIsSUFBSyxPQUFHLDRDQUF1QixVQUFBO3FCQUNoQyxtQ0FBaUIsWUFBUztLQUM3QiwwQkFBVTs0QkFDUixTQUFPO0lBQUE7R0FBQTtVQVRKOzs7Ozs7RUFXUixnQ0FBVSxpQkFBTTtHQUNmLFVBQU0sU0FBWSxFQUFDO3NEQUNqQjs7VUFGYTs7Ozs7RUFHaEIsTUFBTyxXQUFVO0VBRWpCLGlDQUFRLGlCQUFNO0dBQ2IsVUFBTTtHQUNOLFdBQU8sVUFBQTtJQUNOLFVBQUEsQ0FBRSxRQUFTO0lBQ1gsVUFBQSxDQUFFLENBQUUsUUFBUzs7O0dBQ2QsZUFBVSxTQUFNLEVBQUM7NkJBQU4sS0FDVixTQUFBOztVQU5ZOzs7Ozs7O0VBU2IsUUFBTSxZQUFVLGNBQUM7R0FDaEIsVUFBTTtHQUNOLFdBQU8sVUFBQTtvQkFDSixZQUFVLENBQUUsR0FBSTs4QkFDYixZQUFVLENBQUUsR0FBSTtHQUFBO2tCQUNyQixTQUFBLEVBQUUsR0FBTTtzQkFBSDtXQUNMLE9BQUssRUFBRyxTQUFBLGFBQVU7WUFDakIsT0FBRyxHQUFHO0lBQUE7R0FBQTs7RUFFVCxrQ0FBSztHQUNKLFVBQ0M7R0FHRCxXQUFPLFVBQUE7SUFDTixVQUFBLENBQUUsQ0FBRSxFQUFFLEVBQUUsR0FBSSxTQUFPO0lBQ25CLFVBQUEsQ0FBRSxDQUFFLEVBQUUsRUFBRSxHQUFJLEVBQUUsU0FBTzs7O2tCQUNyQixTQUFBLEVBQUksRUFBRSxFQUFDO3NCQUFMO0lBQ0Y7S0FDQyxZQUFBLFdBQVMsSUFBQztNQUNULFlBQU87TUFDUCxhQUFRO01BQ1IsV0FBTTthQUhHOzs7OztZQUlOO01BQ0gsOEJBQU87TUFDUCxhQUFRO01BQ1IsNEJBQU07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