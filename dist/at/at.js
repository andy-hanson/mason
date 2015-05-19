"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Boolean","../compare","../Function","../js","../math/methods","../private/bootstrap","../Type/Type","../Type/Kind","../Type/Method","../Type/Pred-Type","../control","../math/Number","./atbang","./at-Type","./q","./Seq/Seq","./Seq/Stream","./Set/Setbang","../bang","../math/Number","../Try","./at-Type","./Map/Weak-Id-Mapbang"],function(exports,Boolean_0,compare_1,Function_2,js_3,methods_4,bootstrap_5,Type_6,Kind_7,Method_8,Pred_45Type_9,control_10,Number_11,_64_33_12,_64_45Type_13,_63_14,Seq_15,Stream_16,Set_33_17,_33_18,Number_19,Try_20,_64_45Type_21,Weak_45Id_45Map_33_22){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_$2.and,not=_$2.not,_$3=_ms.getModule(compare_1),_61_63=_$3["=?"],_$4=_ms.getModule(Function_2),identity=_$4.identity,Pred=_$4.Pred,_$5=_ms.getModule(js_3),defined_63=_$5["defined?"],id_61_63=_$5["id=?"],_$6=_ms.getModule(methods_4),_43=_$6["+"],_$7=_ms.getModule(bootstrap_5),msDef=_$7.msDef,_$8=_ms.getModule(Type_6),_61_62=_$8["=>"],contains_63=_$8["contains?"],type_45of=_$8["type-of"],Kind=_ms.getDefaultExport(Kind_7),Method=_ms.getDefaultExport(Method_8),_$10=_ms.getModule(Method_8),impl_33=_$10["impl!"],_$11=_ms.getModule(Pred_45Type_9),Any=_$11.Any,Opt=_$11.Opt,_$13=_ms.lazyGetModule(control_10),opr=_ms.lazyProp(_$13,"opr"),_$15=_ms.lazyGetModule(Number_11),Nat=_ms.lazyProp(_$15,"Nat"),_$16=_ms.lazyGetModule(_64_33_12),_45_45_33=_ms.lazyProp(_$16,"--!"),_$17=_ms.lazyGetModule(_64_45Type_13),empty=_ms.lazyProp(_$17,"empty"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_14)
		}),_$19=_ms.lazyGetModule(Seq_15),first=_ms.lazyProp(_$19,"first"),seq_61_63=_ms.lazyProp(_$19,"seq=?"),tail=_ms.lazyProp(_$19,"tail"),Stream=_ms.lazy(function(){
			return _ms.getDefaultExport(Stream_16)
		}),Set_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Set_33_17)
		}),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_18)
		}),_$23=_ms.lazyGetModule(_33_18),_33not=_ms.lazyProp(_$23,"!not"),_$24=_ms.lazyGetModule(Number_19),divisible_63=_ms.lazyProp(_$24,"divisible?"),_$25=_ms.lazyGetModule(Try_20),fails_63=_ms.lazyProp(_$25,"fails?"),_64_45Type=_ms.lazy(function(){
			return _ms.getDefaultExport(_64_45Type_21)
		}),Weak_45Id_45Map_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Weak_45Id_45Map_33_22)
		});
		const _64=Kind(function(){
			const doc="\"Bag\". Contains a variable number of elements. Most things implementing `iterator` should be @s.\nIf the iteration order of an @ is meaningful and `+ a b` is the concatenation, it is a Seq.\nIf an @ only stores a given element once, it is a Set.";
			return {
				doc:doc,
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
			const args=1;
			const _default=function _default(_){
				return iterator(_).next().done
			};
			return {
				doc:doc,
				args:args,
				default:_default,
				name:"empty?"
			}
		}());
		impl_33(contains_63,_64,function(){
			const doc="Whether one of the elements =? em.";
			return _ms.set(function(_,em){
				return any_63(_,function(em_45compare){
					return _61_63(em,em_45compare)
				})
			},"doc",doc)
		}());
		const fold=exports.fold=function(){
			const doc="Keeps a state variable `acc` and keeps applying `folder acc em` for the elements, in order.\nReturns the final value.\nIf empty?_, fails unless a `start` value for `acc` is provided. Otherwise `acc` starts as the first element.";
			return _ms.set(function fold(_,b,c){
				const _$73=function(){
					if(defined_63(c)){
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
				}(),start=_$73.start,rest=_$73.rest,folder=_$73.folder;
				let acc=start;
				for(let _ of _ms.iterator(rest)){
					acc=folder(acc,_)
				};
				return acc
			},"doc",doc)
		}();
		const any_63=exports["any?"]=function(){
			const doc="Whether pred? is true for at least one element.";
			return _ms.set(function any_63(_,pred_63){
				pred_63=_ms.unlazy(opr)(pred_63,identity);
				return not(empty_63(_63find(_,pred_63)))
			},"doc",doc)
		}();
		const all_63=exports["all?"]=function(){
			const doc="Whether pred? is true for every element.";
			return _ms.set(function all_63(_,pred_63){
				pred_63=_ms.unlazy(opr)(pred_63,identity);
				return empty_63(_63find(_,function(em){
					return not(pred_63(em))
				}))
			},"doc",doc)
		}();
		const _63find=exports["?find"]=function(){
			const doc="First element for which pred? is true.\n(To find all, use `keep`.)";
			return _ms.set(function _63find(_,pred_63){
				let found=_ms.unlazy(empty)(_ms.unlazy(_63));
				for(let _ of _ms.iterator(_)){
					if(pred_63(_)){
						found=_ms.unlazy(_63)(_);
						break
					}
				};
				return found
			},"doc",doc)
		}();
		const count=exports.count=Method(function(){
			const doc="Number of elements.";
			const args=1;
			const _default=function _default(_){
				return fold(_,0,_ms.sub(_43,1))
			};
			return {
				doc:doc,
				args:args,
				default:_default,
				name:"count"
			}
		}());
		const keep=exports.keep=Method(function(){
			const doc="Only the elements that satisfy `keep-if?`.";
			const args=2;
			const _default=function _default(_,keep_45if_63){
				return _61_62(type_45of(_),keep_39(_,keep_45if_63))
			};
			return {
				doc:doc,
				args:args,
				default:_default,
				name:"keep"
			}
		}());
		const keep_39=exports["keep'"]=function(){
			const doc="Lazy keep.";
			return _ms.set(function keep_39(filtered,keep_45if_63){
				return _ms.unlazy(Stream)(function*(){
					for(let _ of _ms.iterator(filtered)){
						if(keep_45if_63(_)){
							(yield _)
						}
					}
				})
			},"doc",doc)
		}();
		const map=exports.map=function(){
			const doc="TODO";
			return _ms.set(function map(_,mapper){
				return _61_62(type_45of(_),map_39(_,mapper))
			},"doc",doc)
		}();
		const map_39=exports["map'"]=function(){
			const doc="Lazy map.";
			return _ms.set(function map_39(mapped,mapper){
				return _ms.unlazy(Stream)(function*(){
					for(let _ of _ms.iterator(mapped)){
						(yield mapper(_))
					}
				})
			},"doc",doc)
		}();
		const fold_45map=exports["fold-map"]=function(){
			const doc="Performs a map while also carrying some state from one element to the next.\n`mapper-folder` takes in the state and the element,\nand produces `here` (the mapped value) and `next` (the next state value).\nUnlike map, this must be eagerly evaluated, like fold.";
			return _ms.set(function fold_45map(_,start,mapper_45folder){
				let acc=start;
				const mapped=_61_62(Array,map(_,function(em){
					const _$187=mapper_45folder(acc,em),here=_$187.here,next=_$187.next;
					acc=next;
					return here
				}));
				const folded=acc;
				return {
					mapped:mapped,
					folded:folded
				}
			},"doc",doc)
		}();
		const flat_45map=exports["flat-map"]=Method(function(){
			const doc="Like `map`, but each mapping produces multiple values.";
			const args=2;
			const _default=function _default(_,mapper){
				return _61_62(type_45of(_),flat_45map_39(_,mapper))
			};
			return {
				doc:doc,
				args:args,
				default:_default,
				name:"flat-map"
			}
		}());
		const flat_45map_39=exports["flat-map'"]=function(){
			const doc="Lazy flat-map.";
			const args=2;
			return _ms.set(function flat_45map_39(mapped,mapper){
				return _ms.unlazy(Stream)(function*(){
					for(let _ of _ms.iterator(mapped)){
						(yield* iterator(mapper(_)))
					}
				})
			},"doc",doc,"args",args)
		}();
		const flatten=exports.flatten=Method(function(){
			const doc="For an @ containing many @, produces an @ containing all of their entries combined.\nThis does *not* consider more than 1 nested level, and there *every* element of _ must be an @.\nMore efficient than `fold + _`.";
			const args=2;
			const _default=function _default(_){
				return _61_62(type_45of(_),flatten_39(_))
			};
			return {
				doc:doc,
				args:args,
				default:_default,
				name:"flatten"
			}
		}());
		const flatten_39=exports["flatten'"]=function(){
			const doc="Lazy flatten.";
			return _ms.set(function flatten_39(flattened){
				return _ms.unlazy(Stream)(function*(){
					for(let _ of _ms.iterator(flattened)){
						(yield* iterator(_))
					}
				})
			},"doc",doc)
		}();
		const _43_43=exports["++"]=Method(function(){
			const doc="Type-preserving +.";
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
				args:args,
				default:_default,
				name:"++"
			}
		}());
		const _43_43_39=exports["++'"]=function(){
			const doc="Concatenation. Sets should override this.";
			return _ms.set(function _43_43_39(_64a,_64b){
				return _ms.unlazy(Stream)(function*(){
					(yield* iterator(_64a));
					return (yield* iterator(_64b))
				})
			},"doc",doc)
		}();
		const _45_45=exports["--"]=Method(function(){
			const doc="@ without any of the elements in `remove`.\nRemoves the *first* occurrence of each element.";
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
				args:args,
				default:_default,
				name:"--"
			}
		}());
		const _45_45_39=exports["--'"]=function(){
			const doc="Lazy --.";
			return _ms.set(function _45_45_39(_64removed_45from,_64remove){
				return _ms.unlazy(Stream)(function*(){
					const _64remove_45remaining=_61_62(_ms.unlazy(Set_33),_64remove);
					for(let _ of _ms.iterator(_64removed_45from)){
						if(_ms.contains(_64remove_45remaining,_)){
							_ms.unlazy(_45_45_33)(_64remove_45remaining,[_])
						} else {
							(yield _)
						}
					}
				})
			},"doc",doc)
		}();
		impl_33(_61_63,_64,function(){
			return _ms.set(function(_64a,_64b){
				return and(id_61_63(type_45of(_64a),type_45of(_64b)),_ms.lazy(function(){
					return _ms.unlazy(seq_61_63)(_64a,_64b)
				}))
			})
		}());
		const name=exports.name="@";
		exports.default=_64;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL0AubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7RUE0QkEsVUFBSSxlQUNJO0dBQVAsVUFDQzs7Ozs7O0VBU0YsZ0NBQVUsaUJBQ007R0FBZixVQUFNO0dBQ04sV0FBTTs7Ozs7OztFQUNQLE1BQU8sV0FBVTtFQUVqQixpQ0FBUSxpQkFDTTtHQUFiLFVBQU07R0FJTixXQUFNO0dBQ04sZUFBVSxrQkFBQSxFQUNDO1dBQVYsU0FBQTs7Ozs7Ozs7O0VBR0QsUUFBTSxZQUFVLGNBQ0M7R0FBaEIsVUFBTTtrQkFJTCxTQUFBLEVBQUUsR0FDTTtXQUFSLE9BQUssRUFBRyxTQUFBLGFBQ1U7WUFBakIsT0FBRyxHQUFHO0lBQUE7R0FBQTs7RUFFVCxrQ0FDSztHQUFKLFVBQ0M7a0JBTUEsY0FBQSxFQUFJLEVBQUUsRUFDQztJQUFQO0tBQ0MsR0FBQSxXQUFTLEdBQ0M7TUFBVCxZQUFPO01BQ1AsYUFBUTtNQUNSLFdBQU07Ozs7OztZQUVIO01BQUgsOEJBQU87TUFDUCxhQUFRO01BQ1IsNEJBQU07Ozs7Ozs7O0lBRVIsUUFBUTtJQUNILFFBQUEsa0JBQUEsTUFDSTtTQUFELE9BQU8sSUFBSTtJQUFBO1dBQ25CO0dBQUE7O0VBRUYsdUNBQ0s7R0FBSixVQUFNO2tCQUlMLGdCQUFBLEVBQUksUUFDZTs0QkFBTixRQUFNO1dBQ25CLElBQUssU0FBUSxRQUFNLEVBQUU7R0FBQTs7RUFFdkIsdUNBQ0s7R0FBSixVQUFNO2tCQUlMLGdCQUFBLEVBQUksUUFDZTs0QkFBTixRQUFNO1dBQ25CLFNBQVEsUUFBTSxFQUFHLFNBQUEsR0FDRTtZQUFsQixJQUFLLFFBQU07SUFBQTtHQUFBOztFQUVkLHlDQUNNO0dBQUwsVUFDQztrQkFLQSxpQkFBQSxFQUFFLFFBQ1U7SUFDWjtJQUNLLFFBQUEsa0JBQUEsR0FDQztLQUFMLEdBQUksUUFBQSxHQUNNOzRCQUFBO01BQ1Q7S0FB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