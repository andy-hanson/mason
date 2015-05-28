"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Boolean","../compare","../Function","../js","../math/methods","../Type/Js-Method","../Type/Kind","../Type/Method","../Type/Pred-Type","../Type/Type","../control","./atbang","./q","./Seq/Seq","./Seq/Stream","./Set/Setbang","../bang","../math/Number","../Try","./at-Type","./q","./Map/Weak-Id-Mapbang"],function(exports,Boolean_0,compare_1,Function_2,js_3,methods_4,Js_45Method_5,Kind_6,Method_7,Pred_45Type_8,Type_9,control_10,_64_33_11,_63_12,Seq_13,Stream_14,Set_33_15,_33_16,Number_17,Try_18,_64_45Type_19,_63_20,Weak_45Id_45Map_33_21){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_ms.get(_$2,"and"),not=_ms.get(_$2,"not"),_$3=_ms.getModule(compare_1),_61_63=_ms.get(_$3,"=?"),_$4=_ms.getModule(Function_2),identity=_ms.get(_$4,"identity"),Pred=_ms.get(_$4,"Pred"),_$5=_ms.getModule(js_3),defined_63=_ms.get(_$5,"defined?"),id_61_63=_ms.get(_$5,"id=?"),_$6=_ms.getModule(methods_4),_43=_ms.get(_$6,"+"),Js_45Method=_ms.getDefaultExport(Js_45Method_5),Kind=_ms.getDefaultExport(Kind_6),Method=_ms.getDefaultExport(Method_7),_$9=_ms.getModule(Method_7),impl_33=_ms.get(_$9,"impl!"),_$10=_ms.getModule(Pred_45Type_8),Any=_ms.get(_$10,"Any"),Opt=_ms.get(_$10,"Opt"),_$11=_ms.getModule(Type_9),_61_62=_ms.get(_$11,"=>"),contains_63=_ms.get(_$11,"contains?"),type_45of=_ms.get(_$11,"type-of"),_$13=_ms.lazyGetModule(control_10),opr=_ms.lazyProp(_$13,"opr"),_$14=_ms.lazyGetModule(_64_33_11),_45_45_33=_ms.lazyProp(_$14,"--!"),_$15=_ms.lazyGetModule(_63_12),Opt_45_62_63=_ms.lazyProp(_$15,"Opt->?"),_$16=_ms.lazyGetModule(Seq_13),first=_ms.lazyProp(_$16,"first"),seq_61_63=_ms.lazyProp(_$16,"seq=?"),tail=_ms.lazyProp(_$16,"tail"),Stream=_ms.lazy(function(){
			return _ms.getDefaultExport(Stream_14)
		}),Set_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Set_33_15)
		}),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_16)
		}),_$20=_ms.lazyGetModule(_33_16),_33not=_ms.lazyProp(_$20,"!not"),_$21=_ms.lazyGetModule(Number_17),divisible_63=_ms.lazyProp(_$21,"divisible?"),_$22=_ms.lazyGetModule(Try_18),fails_63=_ms.lazyProp(_$22,"fails?"),_64_45Type=_ms.lazy(function(){
			return _ms.getDefaultExport(_64_45Type_19)
		}),_$23=_ms.lazyGetModule(_64_45Type_19),empty=_ms.lazyProp(_$23,"empty"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_20)
		}),Weak_45Id_45Map_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Weak_45Id_45Map_33_21)
		});
		const _64=Kind(function(){
			const built={};
			const doc=built.doc="\"Bag\". Contains a variable number of elements. Most things implementing `iterator` should be @s.\nIf the iteration order of an @ is meaningful and `+ a b` is the concatenation, it is a Seq.\nIf an @ only stores a given element once, it is a Set.";
			const implementor_45test=built["implementor-test"]=function implementor_45test(_64_45type){
				if(! _ms.bool(_61_63(_64_45type,_ms.unlazy(Weak_45Id_45Map_33)))){
					_ms.unlazy(_33)(contains_63(_ms.unlazy(_64_45Type),_64_45type),"Be sure to make your @ type a @-Type.");
					const _=_ms.unlazy(empty)(_64_45type);
					_ms.unlazy(_33)(empty_63,_)
				}
			};
			return _ms.setName(built,"@")
		}());
		const iterator=exports.iterator=Js_45Method(function(){
			const built={};
			const doc=built.doc="Creates a new Generator! which yields the values in the @.";
			const args=built.args=1;
			const impl_45symbol=built["impl-symbol"]=Symbol.iterator;
			return _ms.setName(built,"iterator")
		}());
		const empty_63=exports["empty?"]=Method(function(){
			const built={};
			const doc=built.doc="Whether `count` is 0. Often much faster.";
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[]],true);
				_ms.assoc(built,[[1]],false);
				return built
			};
			const args=built.args=1;
			const _default=built.default=function _default(_){
				return iterator(_).next().done
			};
			return _ms.setName(built,"empty?")
		}());
		impl_33(contains_63,_64,function(){
			const built={};
			const doc=built.doc="Whether one of the elements =? em.";
			const test=built.test=function test(){
				_ms.unlazy(_33)(contains_63,[0],0);
				_ms.unlazy(_33not)(contains_63,[0],1)
			};
			return _ms.set(function(_,em){
				_ms.checkContains(Any,em,"em");
				return any_63(_,function(em_45compare){
					return _61_63(em,em_45compare)
				})
			},built)
		}());
		const fold=exports.fold=function(){
			const built={};
			const doc=built.doc="Keeps a state variable `acc` and keeps applying `folder acc em` for the elements, in order.\nReturns the final value.\nIf empty?_, fails unless a `start` value for `acc` is provided. Otherwise `acc` starts as the first element.";
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[1,2,3],_43],6);
				_ms.assoc(built,[[1,2,3],4,_43],10);
				return built
			};
			return _ms.set(function fold(_,b,c){
				_ms.checkContains(_64,_,"_");
				const _$71=function(){
					if(_ms.bool(defined_63(c))){
						const built={};
						const start=built.start=b;
						const folder=built.folder=c;
						const rest=built.rest=_;
						return built
					} else {
						const built={};
						const start=built.start=_ms.unlazy(first)(_);
						const folder=built.folder=b;
						const rest=built.rest=_ms.unlazy(tail)(_);
						return built
					}
				}(),start=_$71.start,rest=_$71.rest,folder=_$71.folder;
				let acc=start;
				for(let _ of rest[Symbol.iterator]()){
					acc=folder(acc,_)
				};
				return acc
			},built)
		}();
		const any_63=exports["any?"]=function(){
			const built={};
			const doc=built.doc="Whether pred? is true for at least one element.";
			const test=built.test=function test(){
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
			},built)
		}();
		const all_63=exports["all?"]=function(){
			const built={};
			const doc=built.doc="Whether pred? is true for every element.";
			const test=built.test=function test(){
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
			},built)
		}();
		const _63find=exports["?find"]=function(){
			const built={};
			const doc=built.doc="First element for which pred? is true.\n(To find all, use `keep`.)";
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[0,1],_ms.sub(_61_63,1)],_ms.unlazy(_63)(1));
				_ms.assoc(built,[[0],_ms.sub(_61_63,1)],_ms.unlazy(empty)(_ms.unlazy(_63)));
				return built
			};
			return _ms.set(function _63find(_,pred_63){
				_ms.checkContains(Pred,pred_63,"pred?");
				return _ms.unlazy(Opt_45_62_63)(function(){
					for(let _ of _[Symbol.iterator]()){
						if(_ms.bool(pred_63(_))){
							return _
						}
					}
				}())
			},built)
		}();
		const count=exports.count=Method(function(){
			const built={};
			const doc=built.doc="Number of elements.";
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[]],0);
				_ms.assoc(built,[[1,2,3]],3);
				return built
			};
			const args=built.args=1;
			const _default=built.default=function _default(_){
				_ms.checkContains(_64,_,"_");
				return fold(_,0,_ms.sub(_43,1))
			};
			return _ms.setName(built,"count")
		}());
		const keep=exports.keep=Method(function(){
			const built={};
			const doc=built.doc="Only the elements that satisfy `keep-if?`.";
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[1,2],_ms.sub(_61_63,2)],[2]);
				return built
			};
			const args=built.args=2;
			const _default=built.default=function _default(_,keep_45if_63){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(Pred,keep_45if_63,"keep-if?");
				return _61_62(type_45of(_),function(){
					const built=[];
					for(let _ of _[Symbol.iterator]()){
						if(_ms.bool(keep_45if_63(_))){
							_ms.add(built,_)
						}
					};
					return built
				}())
			};
			return _ms.setName(built,"keep")
		}());
		const keep_39=exports["keep'"]=function(){
			const built={};
			const doc=built.doc="Lazy keep.";
			const test=built.test=function test(){
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
			},built)
		}();
		const map=exports.map=function(){
			const built={};
			const doc=built.doc="TODO";
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[true,false],not],[false,true]);
				return built
			};
			return _ms.set(function map(_,mapper){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(Function,mapper,"mapper");
				return _61_62(type_45of(_),function(){
					const built=[];
					for(let _ of _[Symbol.iterator]()){
						_ms.add(built,mapper(_))
					};
					return built
				}())
			},built)
		}();
		const map_39=exports["map'"]=function(){
			const built={};
			const doc=built.doc="Lazy map.";
			const test=built.test=function test(){
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
			},built)
		}();
		const flat_45map=exports["flat-map"]=Method(function(){
			const built={};
			const doc=built.doc="Like `map`, but each mapping produces multiple values.";
			const test=built.test=function test(){
				const built=new global.Map();
				const f=function f(a){
					return [a,a]
				};
				_ms.assoc(built,[[1,2],f],[1,1,2,2]);
				return built
			};
			const args=built.args=2;
			const _default=built.default=function _default(_,mapper){
				_ms.checkContains(_ms.sub(Function,Any,_64),mapper,"mapper");
				return _61_62(type_45of(_),function(){
					const built=[];
					for(let _ of _[Symbol.iterator]()){
						for(let _ of mapper(_)[Symbol.iterator]()){
							_ms.add(built,_)
						}
					};
					return built
				}())
			};
			return _ms.setName(built,"flat-map")
		}());
		const flat_45map_39=exports["flat-map'"]=function(){
			const built={};
			const doc=built.doc="Lazy flat-map.";
			const test=built.test=function test(){
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
			const args=built.args=2;
			return _ms.set(function flat_45map_39(mapped,mapper){
				_ms.checkContains(_64,mapped,"mapped");
				_ms.checkContains(_ms.sub(Function,Any,_64),mapper,"mapper");
				return _ms.unlazy(Stream)(function*(){
					for(let _ of mapped[Symbol.iterator]()){
						(yield* iterator(mapper(_)))
					}
				})
			},built)
		}();
		const flatten=exports.flatten=Method(function(){
			const built={};
			const doc=built.doc="For an @ containing many @, produces an @ containing all of their entries combined.\nThis does *not* consider more than 1 nested level, and there *every* element of _ must be an @.\nMore efficient than `fold + _`.";
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[[1,2],[3],[]]],[1,2,3]);
				return built
			};
			const args=built.args=2;
			const _default=built.default=function _default(_){
				return _61_62(type_45of(_),function(){
					const built=[];
					for(let _ of _[Symbol.iterator]()){
						for(let _ of _[Symbol.iterator]()){
							_ms.add(built,_)
						}
					};
					return built
				}())
			};
			return _ms.setName(built,"flatten")
		}());
		const flatten_39=exports["flatten'"]=function(){
			const built={};
			const doc=built.doc="Lazy flatten.";
			const test=built.test=function test(){
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
			},built)
		}();
		const _43_43=exports["++"]=Method(function(){
			const built={};
			const doc=built.doc="Concatenation. Sets should override this.";
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[0],[1]],[0,1]);
				return built
			};
			const args=built.args=function(){
				const built=[];
				_ms.add(built,["@a",_64]);
				_ms.add(built,["@b",_64]);
				return built
			}();
			const _default=built.default=function _default(_64a,_64b){
				return _61_62(type_45of(_64a),function(){
					const built=[];
					for(;;){
						for(let _ of _64a[Symbol.iterator]()){
							_ms.add(built,_)
						};
						for(let _ of _64b[Symbol.iterator]()){
							_ms.add(built,_)
						};
						break
					};
					return built
				}())
			};
			return _ms.setName(built,"++")
		}());
		const _43_43_39=exports["++'"]=function(){
			const built={};
			const doc=built.doc="Lazy ++.";
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[0],[1]],_61_62(_ms.unlazy(Stream),[0,1]));
				return built
			};
			return _ms.set(function _43_43_39(_64a,_64b){
				return _ms.checkContains(_ms.unlazy(Stream),_ms.unlazy(Stream)(function*(){
					(yield* iterator(_64a));
					(yield* iterator(_64b))
				}),"res")
			},built)
		}();
		const _45_45=exports["--"]=Method(function(){
			const built={};
			const doc=built.doc="@ without any of the elements in `remove`.\nRemoves the *first* occurrence of each element.";
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[1,2,1],[1]],[2,1]);
				return built
			};
			const args=built.args=function(){
				const built=[];
				_ms.add(built,"_");
				_ms.add(built,["@remove",_64]);
				return built
			}();
			const _default=built.default=function _default(_,_64remove){
				return _61_62(type_45of(_),_45_45_39(_,_64remove))
			};
			return _ms.setName(built,"--")
		}());
		const _45_45_39=exports["--'"]=function(){
			const built={};
			const doc=built.doc="Lazy --.";
			const test=built.test=function test(){
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
			},built)
		}();
		impl_33(_61_63,_64,function(){
			const built={};
			const test=built.test=function test(){
				return _ms.unlazy(_33)(_61_63,[1],[1])
			};
			return _ms.set(function(_64a,_64b){
				return and(id_61_63(type_45of(_64a),type_45of(_64b)),_ms.lazy(function(){
					return _ms.unlazy(seq_61_63)(_64a,_64b)
				}))
			},built)
		}());
		const name=exports.name="@";
		exports.default=_64;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL0AubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7RUEwQkEsVUFBRyxlQUNJOztHQUFOLG9CQUNDO0dBR0QsbURBQW9CLDRCQUFBLFdBQ007SUFBekIsY0FBUSxPQUFHLDRDQUNtQjtxQkFBMUIsbUNBQWlCLFlBQVM7S0FDN0IsMEJBQVU7cUJBQ1IsU0FBTztJQUFBO0dBQUE7OztFQUVaLGdDQUFVLHNCQUNTOztHQUFsQixvQkFBTTtHQUNOLHNCQUFNO0dBQ04seUNBQWE7OztFQUVkLGlDQUFRLGlCQUNNOztHQUFiLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxJQUFTO29CQUNYLENBQUUsQ0FBRSxJQUFTOzs7R0FDZCxzQkFBTTtHQUNOLDZCQUFVLGtCQUFBLEVBQ0M7V0FBVixTQUFROzs7O0VBR1QsUUFBTSxZQUFVLGNBQ0M7O0dBQWhCLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtvQkFBTCxZQUFVLENBQUUsR0FBSTt1QkFDYixZQUFVLENBQUUsR0FBSTtHQUFBO2tCQUNyQixTQUFBLEVBQUUsR0FDTTtzQkFESDtXQUNMLE9BQUssRUFBRyxTQUFBLGFBQ1U7WUFBakIsT0FBRyxHQUFHO0lBQUE7R0FBQTs7RUFFVCxrQ0FDSzs7R0FBSixvQkFDQztHQUdELHNCQUNPLGVBQUE7O29CQUFOLENBQUUsQ0FBRSxFQUFFLEVBQUUsR0FBSSxLQUFPO29CQUNuQixDQUFFLENBQUUsRUFBRSxFQUFFLEdBQUksRUFBRSxLQUFPOzs7a0JBQ3JCLGNBQUEsRUFBSSxFQUFFLEVBQ0M7c0JBREw7SUFDRjtLQUNDLFlBQUEsV0FBUyxJQUNDOztNQUFULHdCQUFPO01BQ1AsMEJBQVE7TUFDUixzQkFBTTs7WUFFSDs7TUFBSCwwQ0FBWTtNQUNaLDBCQUFRO01BQ1IsdUNBQVU7Ozs7SUFFWixRQUFRO0lBQ0gsUUFBQSxLQUFBLHdCQUNJO1NBQUQsT0FBTyxJ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LDZCQUNTO2NBQVQsU0FBUTtLQUFBO0lBQUE7R0FBQTs7RUFFaEIsMkJBQUksaUJBQ007O0dBQVQsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFFLENBQUUsR0FBSSxDQUFFLElBQVMsQ0FBRSxFQUFFOzs7R0FDeEIsZ0NBQ0s7O2tCQUFGLENBQUcsS0FBSTtrQkFDUCxDQUFHLEtBQUk7OztHQUNWLDZCQUFVLGtCQUFBLEtBQUcsS0FDRTtXQUVkLE9BQUksVUFBUTs7WUFDUTtNQUNkLFFBQUEsS0FBQSx3QkFDRTtxQkFBSjtNQUFBO01BQ0UsUUFBQSxLQUFBLHdCQUNFO3FCQUFKO01BQUE7TUFDSDtLQUFBOzs7Ozs7RUFFSCx5Q0FDSTs7R0FBSCxvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsQ0FBRSxHQUFJLENBQUUsSUFBUywwQkFBVSxDQUFFLEVBQUU7OztrQkFDakMsbUJBQVEsS0FBRyxLQUNFO21FQUVILFdBQUE7YUFBTCxTQUFTO2FBQ1QsU0FBUztJQUFBOzs7RUFHaEIsMkJBQUksaUJBQ007O0dBQVQsb0JBQ0M7R0FFRCxzQkFDTyxlQUFBOztvQkFBTixDQUFFLENBQUUsRUFBRSxFQUFFLEdBQUksQ0FBRSxJQUFTLENBQUUsRUFBRTs7O0dBQzVCLGdDQUNLOztrQkFBRDtrQkFDRCxDQUFHLFVBQVM7OztHQUNmLDZCQUFVLGtCQUFBLEVBQUUsVUFDTztXQUFsQixPQUFHLFVBQU8sR0FBRyxVQUFJLEVBQUU7R0FBQTs7O0VBRXJCLHlDQUNJOztHQUFILG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxDQUFFLEVBQUUsRUFBRSxHQUFJLENBQUUsSUFBUywwQkFBVSxDQUFFLEVBQUU7OztrQkFDckMsbUJBQUcsa0JBQWMsVUFDUztzQkFERDs2QkFBeEIsdUJBR1MsV0FBQTtLQUFULDRCQUFvQiwwQkFBUTtLQUN2QixRQUFBLEtBQUEscUNBQ2E7TUFDWix5QkFBSCxzQkFBRCxJQUNrQjs2QkFDYixzQkFBa0IsQ0FBRTtNQUFBLE9BRXJCO2NBQUE7TUFBQTtLQUFBO0lBQUE7OztFQUVULFFBQU0sT0FBRyxjQUNDOztHQUFULHNCQUNPLGVBQUE7MkJBQUosT0FBRyxDQUFFLEdBQUksQ0FBRTtHQUFBO2tCQUNiLFNBQUEsS0FBRyxLQUNFO1dBQUwsSUFBSyxTQUFNLFVBQVEsTUFBSyxVQUFRO2tDQUFhLEtBQUc7SUFBQTtHQUFBOztFQXBTbkQsd0JBQUE7a0JBMEJBIiwiZmlsZSI6ImF0L2F0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=