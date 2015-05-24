"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Boolean","../compare","../Function","../js","../math/methods","../Type/Js-Method","../Type/Kind","../Type/Method","../Type/Pred-Type","../Type/Type","../control","./atbang","./at-Type","./q","./Seq/Seq","./Seq/Stream","./Set/Setbang","../bang","../math/Number","../Try","./at-Type","./Map/Weak-Id-Mapbang"],function(exports,Boolean_0,compare_1,Function_2,js_3,methods_4,Js_45Method_5,Kind_6,Method_7,Pred_45Type_8,Type_9,control_10,_64_33_11,_64_45Type_12,_63_13,Seq_14,Stream_15,Set_33_16,_33_17,Number_18,Try_19,_64_45Type_20,Weak_45Id_45Map_33_21){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_ms.get(_$2,"and"),not=_ms.get(_$2,"not"),_$3=_ms.getModule(compare_1),_61_63=_ms.get(_$3,"=?"),_$4=_ms.getModule(Function_2),identity=_ms.get(_$4,"identity"),Pred=_ms.get(_$4,"Pred"),_$5=_ms.getModule(js_3),defined_63=_ms.get(_$5,"defined?"),id_61_63=_ms.get(_$5,"id=?"),_$6=_ms.getModule(methods_4),_43=_ms.get(_$6,"+"),Js_45Method=_ms.getDefaultExport(Js_45Method_5),Kind=_ms.getDefaultExport(Kind_6),Method=_ms.getDefaultExport(Method_7),_$9=_ms.getModule(Method_7),impl_33=_ms.get(_$9,"impl!"),_$10=_ms.getModule(Pred_45Type_8),Any=_ms.get(_$10,"Any"),Opt=_ms.get(_$10,"Opt"),_$11=_ms.getModule(Type_9),_61_62=_ms.get(_$11,"=>"),contains_63=_ms.get(_$11,"contains?"),type_45of=_ms.get(_$11,"type-of"),_$13=_ms.lazyGetModule(control_10),opr=_ms.lazyProp(_$13,"opr"),_$14=_ms.lazyGetModule(_64_33_11),_45_45_33=_ms.lazyProp(_$14,"--!"),_$15=_ms.lazyGetModule(_64_45Type_12),empty=_ms.lazyProp(_$15,"empty"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_13)
		}),_$17=_ms.lazyGetModule(Seq_14),first=_ms.lazyProp(_$17,"first"),seq_61_63=_ms.lazyProp(_$17,"seq=?"),tail=_ms.lazyProp(_$17,"tail"),Stream=_ms.lazy(function(){
			return _ms.getDefaultExport(Stream_15)
		}),Set_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Set_33_16)
		}),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_17)
		}),_$21=_ms.lazyGetModule(_33_17),_33not=_ms.lazyProp(_$21,"!not"),_$22=_ms.lazyGetModule(Number_18),divisible_63=_ms.lazyProp(_$22,"divisible?"),_$23=_ms.lazyGetModule(Try_19),fails_63=_ms.lazyProp(_$23,"fails?"),_64_45Type=_ms.lazy(function(){
			return _ms.getDefaultExport(_64_45Type_20)
		}),Weak_45Id_45Map_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Weak_45Id_45Map_33_21)
		});
		const _64=Kind(function(){
			const doc="\"Bag\". Contains a variable number of elements. Most things implementing `iterator` should be @s.\nIf the iteration order of an @ is meaningful and `+ a b` is the concatenation, it is a Seq.\nIf an @ only stores a given element once, it is a Set.";
			const implementor_45test=function implementor_45test(_64_45type){
				if(! _ms.bool(_61_63(_64_45type,_ms.unlazy(Weak_45Id_45Map_33)))){
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
		const iterator=exports.iterator=Js_45Method(function(){
			const doc="Creates a new Generator! which yields the values in the @.";
			const args=1;
			const impl_45symbol=Symbol.iterator;
			return {
				doc:doc,
				args:args,
				"impl-symbol":impl_45symbol,
				name:"iterator"
			}
		}());
		const empty_63=exports["empty?"]=Method(function(){
			const doc="Whether `count` is 0. Often much faster.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[]],true);
				_ms.assoc(built,[[1]],false);
				return built
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
				_ms.unlazy(_33not)(contains_63,[0],1)
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
				const built=new global.Map();
				_ms.assoc(built,[[1,2,3],_43],6);
				_ms.assoc(built,[[1,2,3],4,_43],10);
				return built
			};
			return _ms.set(function fold(_,b,c){
				_ms.checkContains(_64,_,"_");
				const _$71=function(){
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
				}(),start=_$71.start,rest=_$71.rest,folder=_$71.folder;
				let acc=start;
				for(let _ of rest[Symbol.iterator]()){
					acc=folder(acc,_)
				};
				return acc
			},"doc",doc,"test",test)
		}();
		const any_63=exports["any?"]=function(){
			const doc="Whether pred? is true for at least one element.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[0,1],_ms.sub(_61_63,1)],true);
				_ms.assoc(built,[[0,1],_ms.sub(_61_63,2)],false);
				return built
			};
			return _ms.set(function any_63(_,pred_63){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(_ms.sub(Opt,Pred),pred_63,"pred?");
				pred_63=_ms.unlazy(opr)(pred_63,identity);
				return not(empty_63(_63find(_,pred_63)))
			},"doc",doc,"test",test)
		}();
		const all_63=exports["all?"]=function(){
			const doc="Whether pred? is true for every element.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[0,0],_ms.sub(_61_63,0)],true);
				_ms.assoc(built,[[0,1],_ms.sub(_61_63,0)],false);
				return built
			};
			return _ms.set(function all_63(_,pred_63){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(_ms.sub(Opt,Pred),pred_63,"pred?");
				pred_63=_ms.unlazy(opr)(pred_63,identity);
				return empty_63(_63find(_,function(em){
					return not(pred_63(em))
				}))
			},"doc",doc,"test",test)
		}();
		const _63find=exports["?find"]=function(){
			const doc="First element for which pred? is true.\n(To find all, use `keep`.)";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[0,1],_ms.sub(_61_63,1)],_ms.unlazy(_63)(1));
				_ms.assoc(built,[[0],_ms.sub(_61_63,1)],_ms.unlazy(empty)(_ms.unlazy(_63)));
				return built
			};
			return _ms.set(function _63find(_,pred_63){
				_ms.checkContains(Pred,pred_63,"pred?");
				let found=_ms.unlazy(empty)(_ms.unlazy(_63));
				for(let _ of _[Symbol.iterator]()){
					if(_ms.bool(pred_63(_))){
						found=_ms.unlazy(_63)(_);
						break
					}
				};
				return found
			},"doc",doc,"test",test)
		}();
		const count=exports.count=Method(function(){
			const doc="Number of elements.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[]],0);
				_ms.assoc(built,[[1,2,3]],3);
				return built
			};
			const args=1;
			const _default=function _default(_){
				_ms.checkContains(_64,_,"_");
				return fold(_,0,_ms.sub(_43,1))
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
				const built=new global.Map();
				_ms.assoc(built,[[1,2],_ms.sub(_61_63,2)],[2]);
				return built
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
				const built=new global.Map();
				_ms.assoc(built,[[1,2],_ms.sub(_61_63,2)],_61_62(_ms.unlazy(Stream),[2]));
				return built
			};
			return _ms.set(function keep_39(filtered,keep_45if_63){
				_ms.checkContains(_64,filtered,"filtered");
				_ms.checkContains(Pred,keep_45if_63,"keep-if?");
				return _ms.unlazy(Stream)(function*(){
					for(let _ of filtered[Symbol.iterator]()){
						if(_ms.bool(keep_45if_63(_))){
							(yield _)
						}
					}
				})
			},"doc",doc,"test",test)
		}();
		const map=exports.map=function(){
			const doc="TODO";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[true,false],not],[false,true]);
				return built
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
				const built=new global.Map();
				_ms.assoc(built,[[true,false],not],_61_62(_ms.unlazy(Stream),[false,true]));
				return built
			};
			return _ms.set(function map_39(mapped,mapper){
				_ms.checkContains(_64,mapped,"mapped");
				_ms.checkContains(Function,mapper,"mapper");
				return _ms.unlazy(Stream)(function*(){
					for(let _ of mapped[Symbol.iterator]()){
						(yield mapper(_))
					}
				})
			},"doc",doc,"test",test)
		}();
		const flat_45map=exports["flat-map"]=Method(function(){
			const doc="Like `map`, but each mapping produces multiple values.";
			const test=function test(){
				const built=new global.Map();
				const f=function f(a){
					return [a,a]
				};
				_ms.assoc(built,[[1,2],f],[1,1,2,2]);
				return built
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
				const built=new global.Map();
				const f=function f(_){
					return function(){
						if(_ms.bool(_ms.unlazy(divisible_63)(_,2))){
							return [_,_]
						} else {
							return [_]
						}
					}()
				};
				_ms.assoc(built,[[1,2,3,4],f],_61_62(_ms.unlazy(Stream),[1,2,2,3,4,4]));
				return built
			};
			const args=2;
			return _ms.set(function flat_45map_39(mapped,mapper){
				_ms.checkContains(_64,mapped,"mapped");
				_ms.checkContains(_ms.sub(Function,Any,_64),mapper,"mapper");
				return _ms.unlazy(Stream)(function*(){
					for(let _ of mapped[Symbol.iterator]()){
						(yield* iterator(mapper(_)))
					}
				})
			},"doc",doc,"test",test,"args",args)
		}();
		const flatten=exports.flatten=Method(function(){
			const doc="For an @ containing many @, produces an @ containing all of their entries combined.\nThis does *not* consider more than 1 nested level, and there *every* element of _ must be an @.\nMore efficient than `fold + _`.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[[1,2],[3],[]]],[1,2,3]);
				return built
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
				const built=new global.Map();
				_ms.assoc(built,[[[1,2],[3],[]]],_61_62(_ms.unlazy(Stream),[1,2,3]));
				_ms.assoc(built,[[[1],[[2]]]],_61_62(_ms.unlazy(Stream),[1,[2]]));
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return _61_62(Array,flatten([[1],2,[3]]))
				});
				return built
			};
			return _ms.set(function flatten_39(flattened){
				_ms.checkContains(_ms.sub(_64,_64),flattened,"flattened");
				return _ms.unlazy(Stream)(function*(){
					for(let _ of flattened[Symbol.iterator]()){
						(yield* iterator(_))
					}
				})
			},"doc",doc,"test",test)
		}();
		const _43_43=exports["++"]=Method(function(){
			const doc="Type-preserving +.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[0],[1]],[0,1]);
				return built
			};
			const args=function(){
				const built=[];
				_ms.add(built,["@a",_64]);
				_ms.add(built,["@b",_64]);
				return built
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
				const built=new global.Map();
				_ms.assoc(built,[[0],[1]],_61_62(_ms.unlazy(Stream),[0,1]));
				return built
			};
			return _ms.set(function _43_43_39(_64a,_64b){
				return _ms.checkContains(_ms.unlazy(Stream),_ms.unlazy(Stream)(function*(){
					(yield* iterator(_64a));
					(yield* iterator(_64b))
				}),"res")
			},"doc",doc,"test",test)
		}();
		const _45_45=exports["--"]=Method(function(){
			const doc="@ without any of the elements in `remove`.\nRemoves the *first* occurrence of each element.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[1,2,1],[1]],[2,1]);
				return built
			};
			const args=function(){
				const built=[];
				_ms.add(built,"_");
				_ms.add(built,["@remove",_64]);
				return built
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
				const built=new global.Map();
				_ms.assoc(built,[[1,2,1],[1]],_61_62(_ms.unlazy(Stream),[2,1]));
				return built
			};
			return _ms.set(function _45_45_39(_64removed_45from,_64remove){
				_ms.checkContains(_64,_64remove,"@remove");
				return _ms.checkContains(_64,_ms.unlazy(Stream)(function*(){
					const _64remove_45remaining=_61_62(_ms.unlazy(Set_33),_64remove);
					for(let _ of _64removed_45from[Symbol.iterator]()){
						if(_ms.bool(_ms.contains(_64remove_45remaining,_))){
							_ms.unlazy(_45_45_33)(_64remove_45remaining,[_])
						} else {
							(yield _)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL0AubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7RUEwQkEsVUFBSSxlQUNJO0dBQVAsVUFDQztHQUdELHlCQUFvQiw0QkFBQSxXQUNNO0lBQXpCLGNBQVEsT0FBRyw0Q0FDbUI7cUJBQTFCLG1DQUFpQixZQUFTO0tBQzdCLDBCQUFVO3FCQUNSLFNBQU87SUFBQTtHQUFBOzs7Ozs7O0VBRVosZ0NBQVUsc0JBQ1M7R0FBbEIsVUFBTTtHQUNOLFdBQU07R0FDTixvQkFBYTs7Ozs7Ozs7RUFFZCxpQ0FBUSxpQkFDTTtHQUFiLFVBQU07R0FDTixXQUNPLGVBQUE7O29CQUFOLENBQUUsSUFBUztvQkFDWCxDQUFFLENBQUUsSUFBUzs7O0dBQ2QsV0FBTTtHQUNOLGVBQVUsa0JBQUEsRUFDQztXQUFWLFNBQVE7Ozs7Ozs7Ozs7RUFHVCxRQUFNLFlBQVUsY0FDQztHQUFoQixVQUFNO0dBQ04sV0FDUSxlQUFBO29CQUFMLFlBQVUsQ0FBRSxHQUFJO3VCQUNiLFlBQVUsQ0FBRSxHQUFJO0dBQUE7a0JBQ3JCLFNBQUEsRUFBRSxHQUNNO3NCQURIO1dBQ0wsT0FBSyxFQUFHLFNBQUEsYUFDVTtZQUFqQixPQUFHLEdBQUc7SUFBQTtHQUFBOztFQUVULGtDQUNLO0dBQUosVUFDQztHQUdELFdBQ08sZUFBQTs7b0JBQU4sQ0FBRSxDQUFFLEVBQUUsRUFBRSxHQUFJLEtBQU87b0JBQ25CLENBQUUsQ0FBRSxFQUFFLEVBQUUsR0FBSSxFQUFFLEtBQU87OztrQkFDckIsY0FBQSxFQUFJLEVBQUUsRUFDQztzQkFETDtJQUNGO0tBQ0MsWUFBQSxXQUFTLElBQ0M7TUFBVCxZQUFPO01BQ1AsYUFBUTtNQUNSLFdBQU07Ozs7OztZQUVIO01BQUgsOEJBQVk7TUFDWixhQUFRO01BQ1IsNEJBQVU7Ozs7Ozs7O0lBRVosUUFBUTtJQUNILFFBQUEsS0FBQSx3QkFDSTtTQUFELE9BQU8s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