"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../compare","../Function","../js","../math/methods","../Type/Js-Method","../Type/Kind","../Type/Method","../Type/Pred-Type","../Type/Type","../control","./atbang","./q","./Seq/Seq","./Seq/Stream","./Set/Setbang","../math/Number","../Try","./at-Type","./q","./Map/Weak-Id-Mapbang"],(exports,compare_0,Function_1,js_2,methods_3,Js_45Method_4,Kind_5,Method_6,Pred_45Type_7,Type_8,control_9,_64_33_10,_63_11,Seq_12,Stream_13,Set_33_14,Number_15,Try_16,_64_45Type_17,_63_18,Weak_45Id_45Map_33_19)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(Function_1),identity=_ms.get(_$3,"identity"),Pred=_ms.get(_$3,"Pred"),_$4=_ms.getModule(js_2),defined_63=_ms.get(_$4,"defined?"),id_61_63=_ms.get(_$4,"id=?"),_$5=_ms.getModule(methods_3),_43=_ms.get(_$5,"+"),Js_45Method=_ms.getDefaultExport(Js_45Method_4),Kind=_ms.getDefaultExport(Kind_5),Method=_ms.getDefaultExport(Method_6),_$8=_ms.getModule(Method_6),impl_33=_ms.get(_$8,"impl!"),_$9=_ms.getModule(Pred_45Type_7),Any=_ms.get(_$9,"Any"),Opt=_ms.get(_$9,"Opt"),_$10=_ms.getModule(Type_8),_61_62=_ms.get(_$10,"=>"),contains_63=_ms.get(_$10,"contains?"),type_45of=_ms.get(_$10,"type-of"),_$12=_ms.lazyGetModule(control_9),opr=_ms.lazyProp(_$12,"opr"),_$13=_ms.lazyGetModule(_64_33_10),_45_45_33=_ms.lazyProp(_$13,"--!"),_$14=_ms.lazyGetModule(_63_11),Opt_45_62_63=_ms.lazyProp(_$14,"Opt->?"),_$15=_ms.lazyGetModule(Seq_12),first=_ms.lazyProp(_$15,"first"),seq_61_63=_ms.lazyProp(_$15,"seq=?"),tail=_ms.lazyProp(_$15,"tail"),Stream=_ms.lazy(()=>{
			return _ms.getDefaultExport(Stream_13)
		}),Set_33=_ms.lazy(()=>{
			return _ms.getDefaultExport(Set_33_14)
		}),_$19=_ms.lazyGetModule(Number_15),divisible_63=_ms.lazyProp(_$19,"divisible?"),_$20=_ms.lazyGetModule(Try_16),fails_63=_ms.lazyProp(_$20,"fails?"),_64_45Type=_ms.lazy(()=>{
			return _ms.getDefaultExport(_64_45Type_17)
		}),_$21=_ms.lazyGetModule(_64_45Type_17),empty=_ms.lazyProp(_$21,"empty"),_63=_ms.lazy(()=>{
			return _ms.getDefaultExport(_63_18)
		}),Weak_45Id_45Map_33=_ms.lazy(()=>{
			return _ms.getDefaultExport(Weak_45Id_45Map_33_19)
		});
		const _64=Kind(()=>{
			const built={};
			const doc=built.doc=`"Bag". Contains a variable number of elements. Most things implementing \`iterator\` should be @s.\nIf the iteration order of an @ is meaningful and \`+ a b\` is the concatenation, it is a Seq.\nIf an @ only stores a given element once, it is a Set.`;
			const implementor_45test=built["implementor-test"]=function implementor_45test(_64_45type){
				if(! _ms.bool(_61_63(_64_45type,_ms.unlazy(Weak_45Id_45Map_33)))){
					if(! _ms.bool(contains_63(_ms.unlazy(_64_45Type),_64_45type)))throw _ms.error(`Be sure to make your @ type a @-Type.`);
					const _=_ms.unlazy(empty)(_64_45type);
					_ms.assert(empty_63,_)
				}
			};
			return _ms.setName(built,"@")
		}());
		const iterator=exports.iterator=Js_45Method(()=>{
			const built={};
			const doc=built.doc=`Creates a new Generator! which yields the values in the @.`;
			const args=built.args=1;
			const impl_45symbol=built["impl-symbol"]=Symbol.iterator;
			return _ms.setName(built,"iterator")
		}());
		const empty_63=exports["empty?"]=Method(()=>{
			const built={};
			const doc=built.doc=`Whether \`count\` is 0. Often much faster.`;
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
		impl_33(contains_63,_64,()=>{
			const built={};
			const doc=built.doc=`Whether one of the elements =? em.`;
			const test=built.test=function test(){
				_ms.assert(contains_63,[0],0);
				_ms.assertNot(contains_63,[0],1)
			};
			return _ms.set((_,em)=>{
				_ms.checkContains(Any,em,"em");
				return any_63(_,em_45compare=>{
					return _61_63(em,em_45compare)
				})
			},built)
		}());
		const fold=exports.fold=()=>{
			const built={};
			const doc=built.doc=`Keeps a state variable \`acc\` and keeps applying \`folder acc em\` for the elements, in order.\nReturns the final value.\nIf empty?_, fails unless a \`start\` value for \`acc\` is provided. Otherwise \`acc\` starts as the first element.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[1,2,3],_43],6);
				_ms.assoc(built,[[1,2,3],4,_43],10);
				return built
			};
			return _ms.set(function fold(_,b,c){
				_ms.checkContains(_64,_,"_");
				const _$69=()=>{
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
				}(),start=_$69.start,rest=_$69.rest,folder=_$69.folder;
				let acc=start;
				for(let _ of rest){
					acc=folder(acc,_)
				};
				return acc
			},built)
		}();
		const any_63=exports["any?"]=()=>{
			const built={};
			const doc=built.doc=`Whether pred? is true for at least one element.`;
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
				return ! empty_63(_63find(_,pred_63))
			},built)
		}();
		const all_63=exports["all?"]=()=>{
			const built={};
			const doc=built.doc=`Whether pred? is true for every element.`;
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
				return empty_63(_63find(_,em=>{
					return ! pred_63(em)
				}))
			},built)
		}();
		const _63find=exports["?find"]=()=>{
			const built={};
			const doc=built.doc=`First element for which pred? is true.\n(To find all, use \`keep\`.)`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[0,1],_ms.sub(_61_63,1)],_ms.unlazy(_63)(1));
				_ms.assoc(built,[[0],_ms.sub(_61_63,1)],_ms.unlazy(empty)(_ms.unlazy(_63)));
				return built
			};
			return _ms.set(function _63find(_,pred_63){
				_ms.checkContains(Pred,pred_63,"pred?");
				return _ms.unlazy(Opt_45_62_63)(()=>{
					for(let elem of _){
						if(pred_63(elem)){
							return elem
						}
					}
				}())
			},built)
		}();
		const count=exports.count=Method(()=>{
			const built={};
			const doc=built.doc=`Number of elements.`;
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
		const keep=exports.keep=Method(()=>{
			const built={};
			const doc=built.doc=`Only the elements that satisfy \`keep-if?\`.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[1,2],_ms.sub(_61_63,2)],[2]);
				return built
			};
			const args=built.args=2;
			const _default=built.default=function _default(_,keep_45if_63){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(Pred,keep_45if_63,"keep-if?");
				return _61_62(type_45of(_),()=>{
					const built=[];
					for(let elem of _){
						if(keep_45if_63(elem)){
							_ms.add(built,elem)
						}
					};
					return built
				}())
			};
			return _ms.setName(built,"keep")
		}());
		const keep_39=exports["keep'"]=()=>{
			const built={};
			const doc=built.doc=`Lazy keep.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[1,2],_ms.sub(_61_63,2)],_61_62(_ms.unlazy(Stream),[2]));
				return built
			};
			return _ms.set(function keep_39(filtered,keep_45if_63){
				_ms.checkContains(_64,filtered,"filtered");
				_ms.checkContains(Pred,keep_45if_63,"keep-if?");
				return _ms.unlazy(Stream)(function*(){
					for(let _ of filtered){
						if(keep_45if_63(_)){
							(yield _)
						}
					}
				})
			},built)
		}();
		const map=exports.map=()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[1,2],_ms.sub(_61_63,2)],[false,true]);
				return built
			};
			return _ms.set(function map(_,mapper){
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(Function,mapper,"mapper");
				return _61_62(type_45of(_),()=>{
					const built=[];
					for(let elem of _){
						_ms.add(built,mapper(elem))
					};
					return built
				}())
			},built)
		}();
		const map_39=exports["map'"]=()=>{
			const built={};
			const doc=built.doc=`Lazy map.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[1,2],_ms.sub(_61_63,2)],_61_62(_ms.unlazy(Stream),[false,true]));
				return built
			};
			return _ms.set(function map_39(mapped,mapper){
				_ms.checkContains(_64,mapped,"mapped");
				_ms.checkContains(Function,mapper,"mapper");
				return _ms.unlazy(Stream)(function*(){
					for(let _ of mapped){
						(yield mapper(_))
					}
				})
			},built)
		}();
		const flat_45map=exports["flat-map"]=Method(()=>{
			const built={};
			const doc=built.doc=`Like \`map\`, but each mapping produces multiple values.`;
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
				return _61_62(type_45of(_),()=>{
					const built=[];
					for(let elem of _){
						_ms.addMany(built,mapper(elem))
					};
					return built
				}())
			};
			return _ms.setName(built,"flat-map")
		}());
		const flat_45map_39=exports["flat-map'"]=()=>{
			const built={};
			const doc=built.doc=`Lazy flat-map.`;
			const test=built.test=function test(){
				const built=new global.Map();
				const f=function f(_){
					return ()=>{
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
					for(let _ of mapped){
						(yield* iterator(mapper(_)))
					}
				})
			},built)
		}();
		const flatten=exports.flatten=Method(()=>{
			const built={};
			const doc=built.doc=`For an @ containing many @, produces an @ containing all of their entries combined.\nThis does *not* consider more than 1 nested level, and there *every* element of _ must be an @.\nMore efficient than \`fold + _\`.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[[1,2],[3],[]]],[1,2,3]);
				return built
			};
			const args=built.args=2;
			const _default=built.default=function _default(_){
				return _61_62(type_45of(_),()=>{
					const built=[];
					for(let elem of _){
						_ms.addMany(built,elem)
					};
					return built
				}())
			};
			return _ms.setName(built,"flatten")
		}());
		const flatten_39=exports["flatten'"]=()=>{
			const built={};
			const doc=built.doc=`Lazy flatten.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[[1,2],[3],[]]],_61_62(_ms.unlazy(Stream),[1,2,3]));
				_ms.assoc(built,[[[1],[[2]]]],_61_62(_ms.unlazy(Stream),[1,[2]]));
				_ms.assert(_ms.unlazy(fails_63),()=>{
					return _61_62(Array,flatten([[1],2,[3]]))
				});
				return built
			};
			return _ms.set(function flatten_39(flattened){
				_ms.checkContains(_ms.sub(_64,_64),flattened,"flattened");
				return _ms.unlazy(Stream)(function*(){
					for(let _ of flattened){
						(yield* iterator(_))
					}
				})
			},built)
		}();
		const _43_43=exports["++"]=Method(()=>{
			const built={};
			const doc=built.doc=`Concatenation. Sets should override this.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[0],[1]],[0,1]);
				return built
			};
			const args=built.args=()=>{
				const built=[];
				_ms.add(built,[`@a`,_64]);
				_ms.add(built,[`@b`,_64]);
				return built
			}();
			const _default=built.default=function _default(_64a,_64b){
				return _61_62(type_45of(_64a),()=>{
					const built=[];
					for(;;){
						_ms.addMany(built,_64a);
						_ms.addMany(built,_64b);
						break
					};
					return built
				}())
			};
			return _ms.setName(built,"++")
		}());
		const _43_43_39=exports["++'"]=()=>{
			const built={};
			const doc=built.doc=`Lazy ++.`;
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
		const _45_45=exports["--"]=Method(()=>{
			const built={};
			const doc=built.doc=`@ without any of the elements in \`remove\`.\nRemoves the *first* occurrence of each element.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[1,2,1],[1]],[2,1]);
				return built
			};
			const args=built.args=()=>{
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`@remove`,_64]);
				return built
			}();
			const _default=built.default=function _default(_,_64remove){
				return _61_62(type_45of(_),_45_45_39(_,_64remove))
			};
			return _ms.setName(built,"--")
		}());
		const _45_45_39=exports["--'"]=()=>{
			const built={};
			const doc=built.doc=`Lazy --.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[1,2,1],[1]],_61_62(_ms.unlazy(Stream),[2,1]));
				return built
			};
			return _ms.set(function _45_45_39(_64removed_45from,_64remove){
				_ms.checkContains(_64,_64remove,"@remove");
				return _ms.checkContains(_64,_ms.unlazy(Stream)(function*(){
					const _64remove_45remaining=_61_62(_ms.unlazy(Set_33),_64remove);
					for(let _ of _64removed_45from){
						if(_ms.bool(_ms.contains(_64remove_45remaining,_))){
							_ms.unlazy(_45_45_33)(_64remove_45remaining,[_])
						} else {
							(yield _)
						}
					}
				}),"res")
			},built)
		}();
		impl_33(_61_63,_64,()=>{
			const built={};
			const test=built.test=function test(){
				_ms.assert(_61_63,[1],[1])
			};
			return _ms.set((_64a,_64b)=>{
				return (id_61_63(type_45of(_64a),type_45of(_64b))&&_ms.unlazy(seq_61_63)(_64a,_64b))
			},built)
		}());
		const name=exports.name=`@`;
		exports.default=_64;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL0AubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0VBd0JBLFVBQUcsU0FDSTs7R0FBTixvQkFDQztHQUdELG1EQUFvQiw0QkFBQSxXQUNNO0lBQXpCLGNBQVEsT0FBRyw0Q0FDbUI7S0FBckIsY0FBQSxtQ0FBaUIsNkJBQWU7S0FDeEMsMEJBQVU7Z0JBQ0YsU0FBTztJQUFBO0dBQUE7OztFQUVsQixnQ0FBVSxnQkFDUzs7R0FBbEIsb0JBQU07R0FDTixzQkFBTTtHQUNOLHlDQUFhOzs7RUFFZCxpQ0FBUSxXQUNNOztHQUFiLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxJQUFTO29CQUNYLENBQUUsQ0FBRSxJQUFTOzs7R0FDZCxzQkFBTTtHQUNOLDZCQUFVLGtCQUFBLEVBQ0M7V0FBVixTQUFROzs7O0VBR1QsUUFBTSxZQUFVLFFBQ0M7O0dBQWhCLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtlQUFDLFlBQVUsQ0FBRSxHQUFJO2tCQUNoQixZQUFVLENBQUUsR0FBSTtHQUFBO2tCQUN4QixDQUFBLEVBQUUsS0FDTTtzQkFESDtXQUNMLE9BQUssRUFBRyxjQUNVO1lBQWpCLE9BQUcsR0FBRztJQUFBO0dBQUE7O0VBRVQsNEJBQ0s7O0dBQUosb0JBQ0M7R0FHRCxzQkFDTyxlQUFBOztvQkFBTixDQUFFLENBQUUsRUFBRSxFQUFFLEdBQUksS0FBTztvQkFDbkIsQ0FBRSxDQUFFLEVBQUUsRUFBRSxHQUFJLEVBQUUsS0FBTzs7O2tCQUNyQixjQUFBLEVBQUksRUFBRSxFQUNDO3NCQURMO0lBQ0Y7S0FDQyxZQUFBLFdBQVMsSUFDQzs7TUFBVCx3QkFBTztNQUNQLDBCQUFRO01BQ1Isc0JBQU07O1lBRUg7O01BQUgsMENBQVk7TUFDWiwwQkFBUTtNQUNSLHVDQUFVOzs7O0lBRVosUUFBUTtJQUNILFFBQUEsS0FBQSxLQUNJO1NBQUQsT0FBTyxJQUFJ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