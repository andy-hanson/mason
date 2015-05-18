"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Boolean","../compare","../Function","../js","../math/methods","../private/bootstrap","../Type/Type","../Type/Kind","../Type/Method","../Type/Pred-Type","../control","../math/Number","./atbang","./at-Type","./q","./Seq/Seq","./Seq/Stream","./Set/Setbang","../control","../bang","../math/Number","../Try","./at-Type","./Map/Weak-Id-Mapbang"],function(exports,Boolean_0,compare_1,Function_2,js_3,methods_4,bootstrap_5,Type_6,Kind_7,Method_8,Pred_45Type_9,control_10,Number_11,_64_33_12,_64_45Type_13,_63_14,Seq_15,Stream_16,Set_33_17,control_18,_33_19,Number_20,Try_21,_64_45Type_22,Weak_45Id_45Map_33_23){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_ms.get(_$2,"and"),not=_ms.get(_$2,"not"),_$3=_ms.getModule(compare_1),_61_63=_ms.get(_$3,"=?"),_$4=_ms.getModule(Function_2),Action=_ms.get(_$4,"Action"),identity=_ms.get(_$4,"identity"),Pred=_ms.get(_$4,"Pred"),_$5=_ms.getModule(js_3),defined_63=_ms.get(_$5,"defined?"),id_61_63=_ms.get(_$5,"id=?"),_$6=_ms.getModule(methods_4),_43=_ms.get(_$6,"+"),_$7=_ms.getModule(bootstrap_5),msDef=_ms.get(_$7,"msDef"),_$8=_ms.getModule(Type_6),_61_62=_ms.get(_$8,"=>"),contains_63=_ms.get(_$8,"contains?"),type_45of=_ms.get(_$8,"type-of"),Kind=_ms.getDefaultExport(Kind_7),Method=_ms.getDefaultExport(Method_8),_$10=_ms.getModule(Method_8),impl_33=_ms.get(_$10,"impl!"),_$11=_ms.getModule(Pred_45Type_9),Any=_ms.get(_$11,"Any"),Opt=_ms.get(_$11,"Opt"),_$13=_ms.lazyGetModule(control_10),opr=_ms.lazyProp(_$13,"opr"),_$15=_ms.lazyGetModule(Number_11),Nat=_ms.lazyProp(_$15,"Nat"),_$16=_ms.lazyGetModule(_64_33_12),_45_45_33=_ms.lazyProp(_$16,"--!"),_$17=_ms.lazyGetModule(_64_45Type_13),empty=_ms.lazyProp(_$17,"empty"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_14)
		}),_$19=_ms.lazyGetModule(Seq_15),first=_ms.lazyProp(_$19,"first"),seq_61_63=_ms.lazyProp(_$19,"seq=?"),tail=_ms.lazyProp(_$19,"tail"),Stream=_ms.lazy(function(){
			return _ms.getDefaultExport(Stream_16)
		}),Set_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Set_33_17)
		}),_$23=_ms.lazyGetModule(control_18),build=_ms.lazyProp(_$23,"build"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_19)
		}),_$24=_ms.lazyGetModule(_33_19),_33not=_ms.lazyProp(_$24,"!not"),_$25=_ms.lazyGetModule(Number_20),divisible_63=_ms.lazyProp(_$25,"divisible?"),_$26=_ms.lazyGetModule(Try_21),fails_63=_ms.lazyProp(_$26,"fails?"),_64_45Type=_ms.lazy(function(){
			return _ms.getDefaultExport(_64_45Type_22)
		}),Weak_45Id_45Map_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Weak_45Id_45Map_33_23)
		});
		const _64=Kind(function(){
			const doc="\"Bag\". Contains a variable number of elements. Most things implementing `iterator` should be @s.\nIf the iteration order of an @ is meaningful and `+ a b` is the concatenation, it is a Seq.\nIf an @ only stores a given element once, it is a Set.";
			const implementor_45test=function implementor_45test(_64_45type){
				if(not(_61_63(_64_45type,_ms.unlazy(Weak_45Id_45Map_33)))){
					_ms.unlazy(_33)(contains_63(_ms.unlazy(_64_45Type),_64_45type),"Be sure to make your @ type a @-Type.");
					const _=_ms.unlazy(empty)(_64_45type);
					_ms.unlazy(_33)(empty_63,_)
				}
			};
			return {
				doc:doc,
				"implementor-test":implementor_45test,
				name:"@"
			}
		}());
		const iterator=exports.iterator=Method(function(){
			const doc="Creates a new Generator! which yields the values in the @.";
			const args=1;
			return {
				doc:doc,
				args:args,
				name:"iterator"
			}
		}());
		msDef("iterator",iterator);
		const empty_63=exports["empty?"]=Method(function(){
			const doc="Whether `count` is 0. Often much faster.";
			const test=function test(){
				const _k0=[[]],_v0=true;
				const _k1=[[1]],_v1=false;
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			const args=1;
			const _default=function _default(_){
				return iterator(_).next().done
			};
			return {
				doc:doc,
				test:test,
				args:args,
				default:_default,
				name:"empty?"
			}
		}());
		impl_33(contains_63,_64,function(){
			const doc="Whether one of the elements =? em.";
			const test=function test(){
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
			const test=function test(){
				const _k0=[[1,2,3],_43],_v0=6;
				const _k1=[[1,2,3],4,_43],_v1=10;
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function fold(_,b,c){
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
				let acc=start;
				const iter=iterator(rest);
				loop86:while(true){
					const _$87=iter.next(),value=_$87.value,done=_$87.done;
					if(_ms.bool(done)){
						break loop86
					} else {
						acc=folder(acc,value)
					}
				};
				return acc
			},"doc",doc,"test",test)
		}();
		const each_33=exports["each!"]=Method(function(){
			const doc="Calls do-for-each on every element in the @, in order.";
			const test=function test(){
				return _ms.unlazy(_33)(_61_63,[1,2,3],_ms.unlazy(build)(function(_yield){
					return each_33([1,2,3],_yield)
				}))
			};
			const args=2;
			const _default=function _default(_,do_45for_45each){
				_ms.checkContains(Action,do_45for_45each,"do-for-each");
				const iter=iterator(_);
				loop103:while(true){
					const _$104=iter.next(),value=_$104.value,done=_$104.done;
					if(_ms.bool(done)){
						break loop103
					} else {
						do_45for_45each(value)
					}
				}
			};
			return {
				doc:doc,
				test:test,
				args:args,
				default:_default,
				name:"each!"
			}
		}());
		const any_63=exports["any?"]=function(){
			const doc="Whether pred? is true for at least one element.";
			const test=function test(){
				const _k0=[[0,1],_ms.sub(_61_63,1)],_v0=true;
				const _k1=[[0,1],_ms.sub(_61_63,2)],_v1=false;
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function any_63(_,_63pred_63){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(_ms.sub(Opt,Pred),_63pred_63,"?pred?");
				const pred_63=_ms.unlazy(opr)(_63pred_63,identity);
				return not(empty_63(_63find(_,pred_63)))
			},"doc",doc,"test",test)
		}();
		const all_63=exports["all?"]=function(){
			const doc="Whether pred? is true for every element.";
			const test=function test(){
				const _k0=[[0,0],_ms.sub(_61_63,0)],_v0=true;
				const _k1=[[0,1],_ms.sub(_61_63,0)],_v1=false;
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function all_63(_,_63pred_63){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(_ms.sub(Opt,Pred),_63pred_63,"?pred?");
				const pred_63=_ms.unlazy(opr)(_63pred_63,identity);
				return empty_63(_63find(_,function(em){
					return not(pred_63(em))
				}))
			},"doc",doc,"test",test)
		}();
		const _63find=exports["?find"]=function(){
			const doc="First element for which pred? is true.\n(To find all, use `keep`.)";
			const test=function test(){
				const _k0=[[0,1],_ms.sub(_61_63,1)],_v0=_ms.unlazy(_63)(1);
				const _k1=[[0],_ms.sub(_61_63,1)],_v1=_ms.unlazy(empty)(_ms.unlazy(_63));
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function _63find(_,pred_63){
				_ms.checkContains(Pred,pred_63,"pred?");
				const iter=iterator(_);
				let found=_ms.unlazy(empty)(_ms.unlazy(_63));
				loop141:while(true){
					const _$142=iter.next(),value=_$142.value,done=_$142.done;
					if(_ms.bool(done)){
						break loop141
					} else if(_ms.bool(pred_63(value))){
						found=_ms.unlazy(_63)(value);
						break loop141
					} else {}
				};
				return found
			},"doc",doc,"test",test)
		}();
		const count=exports.count=Method(function(){
			const doc="Number of elements.";
			const test=function test(){
				const _k0=[[]],_v0=0;
				const _k1=[[1,2,3]],_v1=3;
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			const args=1;
			const _default=function _default(_){
				_ms.checkContains(_64,_,"_");
				return _ms.checkContains(_ms.unlazy(Nat),fold(_,0,_ms.sub(_43,1)),"res")
			};
			return {
				doc:doc,
				test:test,
				args:args,
				default:_default,
				name:"count"
			}
		}());
		const keep=exports.keep=Method(function(){
			const doc="Only the elements that satisfy `keep-if?`.";
			const test=function test(){
				const _k0=[[1,2],_ms.sub(_61_63,2)],_v0=[2];
				return _ms.map(_k0,_v0)
			};
			const args=2;
			const _default=function _default(_,keep_45if_63){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(Pred,keep_45if_63,"keep-if?");
				return _61_62(type_45of(_),keep_39(_,keep_45if_63))
			};
			return {
				doc:doc,
				test:test,
				args:args,
				default:_default,
				name:"keep"
			}
		}());
		const keep_39=exports["keep'"]=function(){
			const doc="Lazy keep.";
			const test=function test(){
				const _k0=[[1,2],_ms.sub(_61_63,2)],_v0=_61_62(_ms.unlazy(Stream),[2]);
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function keep_39(_,keep_45if_63){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(Pred,keep_45if_63,"keep-if?");
				return _ms.unlazy(Stream)(function*(){
					const iter=iterator(_);
					loop179:while(true){
						const _$180=iter.next(),value=_$180.value,done=_$180.done;
						if(_ms.bool(done)){
							break loop179
						} else if(_ms.bool(keep_45if_63(value))){
							(yield value)
						} else {}
					}
				})
			},"doc",doc,"test",test)
		}();
		const map=exports.map=function(){
			const doc="TODO";
			const test=function test(){
				const _k0=[[true,false],not],_v0=[false,true];
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function map(_,mapper){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(Function,mapper,"mapper");
				return _61_62(type_45of(_),map_39(_,mapper))
			},"doc",doc,"test",test)
		}();
		const map_39=exports["map'"]=function(){
			const doc="Lazy map.";
			const test=function test(){
				const _k0=[[true,false],not],_v0=_61_62(_ms.unlazy(Stream),[false,true]);
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function map_39(_,mapper){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(Function,mapper,"mapper");
				return _ms.unlazy(Stream)(function*(){
					const iter=iterator(_);
					loop204:while(true){
						const _$205=iter.next(),value=_$205.value,done=_$205.done;
						if(_ms.bool(done)){
							break loop204
						} else {
							(yield mapper(value))
						}
					}
				})
			},"doc",doc,"test",test)
		}();
		const fold_45map=exports["fold-map"]=function(){
			const doc="Performs a map while also carrying some state from one element to the next.\n`mapper-folder` takes in the state and the element,\nand produces `here` (the mapped value) and `next` (the next state value).\nUnlike map, this must be eagerly evaluated, like fold.";
			const test=function test(){
				const f=function f(acc,em){
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
			return _ms.set(function fold_45map(_,start,mapper_45folder){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(Any,start,"start");
				_ms.checkContains(_ms.sub(Function,2,Object),mapper_45folder,"mapper-folder");
				let acc=start;
				const mapped=_61_62(Array,map(_,function(em){
					const _$230=mapper_45folder(acc,em),here=_ms.checkContains(Any,_$230.here,"here"),next=_ms.checkContains(Any,_$230.next,"next");
					acc=next;
					return here
				}));
				const folded=acc;
				return {
					mapped:mapped,
					folded:folded
				}
			},"doc",doc,"test",test)
		}();
		const flat_45map=exports["flat-map"]=Method(function(){
			const doc="Like `map`, but each mapping produces multiple values.";
			const test=function test(){
				const f=function f(a){
					return [a,a]
				};
				const _k0=[[1,2],f],_v0=[1,1,2,2];
				return _ms.map(_k0,_v0)
			};
			const args=2;
			const _default=function _default(_,mapper){
				_ms.checkContains(_ms.sub(Function,Any,_64),mapper,"mapper");
				return _61_62(type_45of(_),flat_45map_39(_,mapper))
			};
			return {
				doc:doc,
				test:test,
				args:args,
				default:_default,
				name:"flat-map"
			}
		}());
		const flat_45map_39=exports["flat-map'"]=function(){
			const doc="Lazy flat-map.";
			const test=function test(){
				const f=function f(_){
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
			const args=2;
			return _ms.set(function flat_45map_39(_,mapper){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(_ms.sub(Function,Any,_64),mapper,"mapper");
				return _ms.unlazy(Stream)(function*(){
					const iter=iterator(_);
					loop260:while(true){
						const _$261=iter.next(),value=_$261.value,done=_$261.done;
						if(_ms.bool(done)){
							break loop260
						} else {
							(yield* iterator(mapper(value)))
						}
					}
				})
			},"doc",doc,"test",test,"args",args)
		}();
		const flatten=exports.flatten=Method(function(){
			const doc="For an @ containing many @, produces an @ containing all of their entries combined.\nThis does *not* consider more than 1 nested level, and there *every* element of _ must be an @.\nMore efficient than `fold + _`.";
			const test=function test(){
				const _k0=[[[1,2],[3],[]]],_v0=[1,2,3];
				return _ms.map(_k0,_v0)
			};
			const args=2;
			const _default=function _default(_){
				return _61_62(type_45of(_),flatten_39(_))
			};
			return {
				doc:doc,
				test:test,
				args:args,
				default:_default,
				name:"flatten"
			}
		}());
		const flatten_39=exports["flatten'"]=function(){
			const doc="Lazy flatten.";
			const test=function test(){
				const _k0=[[[1,2],[3],[]]],_v0=_61_62(_ms.unlazy(Stream),[1,2,3]);
				const _k1=[[[1],[[2]]]],_v1=_61_62(_ms.unlazy(Stream),[1,[2]]);
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return _61_62(Array,flatten([[1],2,[3]]))
				});
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function flatten_39(_){
				_ms.checkContains(_ms.sub(_64,_64),_,"_");
				return _ms.unlazy(Stream)(function*(){
					const iter=iterator(_);
					loop292:while(true){
						const _$293=iter.next(),value=_$293.value,done=_$293.done;
						if(_ms.bool(done)){
							break loop292
						} else {
							(yield* iterator(value))
						}
					}
				})
			},"doc",doc,"test",test)
		}();
		const _43_43=exports["++"]=Method(function(){
			const doc="Type-preserving +.";
			const test=function test(){
				const _k0=[[0],[1]],_v0=[0,1];
				return _ms.map(_k0,_v0)
			};
			const args=function(){
				const _0=["@a",_64];
				const _1=["@b",_64];
				return [_0,_1]
			}();
			const _default=function _default(_64a,_64b){
				return _61_62(type_45of(_64a),_43_43_39(_64a,_64b))
			};
			return {
				doc:doc,
				test:test,
				args:args,
				default:_default,
				name:"++"
			}
		}());
		const _43_43_39=exports["++'"]=function(){
			const doc="Concatenation. Sets should override this.";
			const test=function test(){
				const _k0=[[0],[1]],_v0=_61_62(_ms.unlazy(Stream),[0,1]);
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function _43_43_39(_64a,_64b){
				return _ms.checkContains(_ms.unlazy(Stream),_ms.unlazy(Stream)(function*(){
					(yield* iterator(_64a));
					return (yield* iterator(_64b))
				}),"res")
			},"doc",doc,"test",test)
		}();
		const _45_45=exports["--"]=Method(function(){
			const doc="@ without any of the elements in `remove`.\nRemoves the *first* occurrence of each element.";
			const test=function test(){
				const _k0=[[1,2,1],[1]],_v0=[2,1];
				return _ms.map(_k0,_v0)
			};
			const args=function(){
				const _0="_";
				const _1=["@remove",_64];
				return [_0,_1]
			}();
			const _default=function _default(_,_64remove){
				return _61_62(type_45of(_),_45_45_39(_,_64remove))
			};
			return {
				doc:doc,
				test:test,
				args:args,
				default:_default,
				name:"--"
			}
		}());
		const _45_45_39=exports["--'"]=function(){
			const doc="Lazy --.";
			const test=function test(){
				const _k0=[[1,2,1],[1]],_v0=_61_62(_ms.unlazy(Stream),[2,1]);
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function _45_45_39(_,_64remove){
				_ms.checkContains(_64,_64remove,"@remove");
				return _ms.checkContains(_64,_ms.unlazy(Stream)(function*(){
					const iter=iterator(_);
					const _64remove_45remaining=_61_62(_ms.unlazy(Set_33),_64remove);
					loop341:while(true){
						const _$342=iter.next(),value=_$342.value,done=_$342.done;
						if(_ms.bool(done)){
							break loop341
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
			},"doc",doc,"test",test)
		}();
		impl_33(_61_63,_64,function(){
			const test=function test(){
				return _ms.unlazy(_33)(_61_63,[1],[1])
			};
			return _ms.set(function(_64a,_64b){
				return and(id_61_63(type_45of(_64a),type_45of(_64b)),_ms.lazy(function(){
					return _ms.unlazy(seq_61_63)(_64a,_64b)
				}))
			},"test",test)
		}());
		const name=exports.name="@";
		exports.default=_64;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL0AubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7RUE2QkEsVUFBSSxlQUNJO0dBQVAsVUFDQztHQUdELHlCQUFtQiw0QkFBQSxXQUNNO0lBQXhCLEdBQUssSUFBSyxPQUFHLDRDQUNxQjtxQkFBOUIsbUNBQWlCLFlBQVM7S0FDN0IsMEJBQVU7cUJBQ1IsU0FBTztJQUFBO0dBQUE7Ozs7Ozs7RUFFWixnQ0FBVSxpQkFDTTtHQUFmLFVBQU07R0FDTixXQUFNOzs7Ozs7O0VBQ1AsTUFBTyxXQUFVO0VBRWpCLGlDQUFRLGlCQUNNO0dBQWIsVUFBTTtHQUNOLFdBQ08sZUFBQTtJQUFOLFVBQUEsQ0FBRSxRQUFTO0lBQ1gsVUFBQSxDQUFFLENBQUUsUUFBUzs7O0dBQ2QsV0FBTTtHQUNOLGVBQVUsa0JBQUEsRUFDQztXQUFWLFNBQUE7Ozs7Ozs7Ozs7RUFHRCxRQUFNLFlBQVUsY0FDQztHQUFoQixVQUFNO0dBQ04sV0FDTyxlQUFBO29CQUFKLFlBQVUsQ0FBRSxHQUFJOzhCQUNiLFlBQVUsQ0FBRSxHQUFJO0dBQUE7a0JBQ3JCLFNBQUEsRUFBRSxHQUNNO3NCQURIO1dBQ0wsT0FBSyxFQUFHLFNBQUEsYUFDVTtZQUFqQixPQUFHLEdBQUc7SUFBQTtHQUFBOztFQUVULGtDQUNLO0dBQUosVUFDQztHQUdELFdBQ08sZUFBQTtJQUFOLFVBQUEsQ0FBRSxDQUFFLEVBQUUsRUFBRSxHQUFJLFNBQU87SUFDbkIsVUFBQSxDQUFFLENBQUUsRUFBRSxFQUFFLEdBQUksRUFBRSxTQUFPOzs7a0JBQ3JCLGNBQUEsRUFBSSxFQUFFLEVBQ0M7c0JBREw7SUFDRjtLQUNDLFlBQUEsV0FBUyxJQUNDO01BQVQsWUFBTztNQUNQLGFBQVE7TUFDUixXQUFNOzs7Ozs7WUFFSDtNQUFILDhCQUFPO01BQ1AsYUFBUTtNQUNSLDRCQUFNOzs7Ozs7OztJQUVSLFFBQVE7SUFDUixXQUFP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