"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../compare","../Function","../js","../math/methods","../Type/Method","../Type/Kind","../Type/Method","../Type/Pred-Type","../Type/Type","../control","./q","./Seq/Seq","./Seq/Stream","./Set/Set","../math/Number","../Try","./at-Type","./q","./Map/Weak-Id-Map"],(exports,compare_0,Function_1,js_2,methods_3,Method_4,Kind_5,Method_6,Pred_45Type_7,Type_8,control_9,_63_10,Seq_11,Stream_12,Set_13,Number_14,Try_15,_64_45Type_16,_63_17,Weak_45Id_45Map_18)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(Function_1),identity=_ms.get(_$3,"identity"),Pred=_ms.get(_$3,"Pred"),_$4=_ms.getModule(js_2),defined_63=_ms.get(_$4,"defined?"),id_61_63=_ms.get(_$4,"id=?"),_$5=_ms.getModule(methods_3),_43=_ms.get(_$5,"+"),Method=_ms.getDefaultExport(Method_4),Kind=_ms.getDefaultExport(Kind_5),_$8=_ms.getModule(Method_6),impl_33=_ms.get(_$8,"impl!"),_$9=_ms.getModule(Pred_45Type_7),Any=_ms.get(_$9,"Any"),Opt=_ms.get(_$9,"Opt"),_$10=_ms.getModule(Type_8),_61_62=_ms.get(_$10,"=>"),contains_63=_ms.get(_$10,"contains?"),type_45of=_ms.get(_$10,"type-of"),_$12=_ms.lazyGetModule(control_9),opr=_ms.lazyProp(_$12,"opr"),_$13=_ms.lazyGetModule(_63_10),Opt_45_62_63=_ms.lazyProp(_$13,"Opt->?"),_$14=_ms.lazyGetModule(Seq_11),_43_43_62_33=_ms.lazyProp(_$14,"++>!"),first=_ms.lazyProp(_$14,"first"),seq_61_63=_ms.lazyProp(_$14,"seq=?"),tail=_ms.lazyProp(_$14,"tail"),Stream=_ms.lazy(()=>{
			return _ms.getDefaultExport(Stream_12)
		}),Set=_ms.lazy(()=>{
			return _ms.getDefaultExport(Set_13)
		}),_$18=_ms.lazyGetModule(Number_14),divisible_63=_ms.lazyProp(_$18,"divisible?"),_$19=_ms.lazyGetModule(Try_15),fails_63=_ms.lazyProp(_$19,"fails?"),_64_45Type=_ms.lazy(()=>{
			return _ms.getDefaultExport(_64_45Type_16)
		}),_$20=_ms.lazyGetModule(_64_45Type_16),empty=_ms.lazyProp(_$20,"empty"),_63=_ms.lazy(()=>{
			return _ms.getDefaultExport(_63_17)
		}),Weak_45Id_45Map=_ms.lazy(()=>{
			return _ms.getDefaultExport(Weak_45Id_45Map_18)
		});
		const _64=Kind(()=>{
			const built={};
			const doc=built.doc=`"Bag". Contains a variable number of elements. Most things implementing \`iterator\` should be @s.\nIf the iteration order of an @ is meaningful and \`+ a b\` is the concatenation, it is a Seq.\nIf an @ only stores a given element once, it is a Set.`;
			const implementor_45test=built["implementor-test"]=function implementor_45test(_64_45type){
				if(! _ms.bool(_61_63(_64_45type,_ms.unlazy(Weak_45Id_45Map)))){
					if(! _ms.bool(_ms.contains(_ms.unlazy(_64_45Type),_64_45type)))throw _ms.error(`Be sure to make your @ type a @-Type.`);
					const _=_ms.unlazy(empty)(_64_45type);
					_ms.assert(empty_63,_)
				}
			};
			return _ms.setName(built,"@")
		}());
		const iterator=exports.iterator=Method(()=>{
			const built={};
			const doc=built.doc=`Creates a new Generator which yields the values in the @.`;
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
			const _default=built.default=function _default(){
				const _this=this;
				return iterator(_this).next().done
			};
			return _ms.setName(built,"empty?")
		}());
		impl_33(contains_63,_64,()=>{
			const built={};
			const doc=built.doc=`Whether one of the elements =? em.`;
			const test=built.test=function test(){
				_ms.assert(_ms.contains,[0],0);
				_ms.assertNot(_ms.contains,[0],1)
			};
			return _ms.set(function(em){
				const _this=this;
				_ms.checkContains(Any,em,"em");
				return any_63(_this,em_45compare=>{
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
				const _$68=()=>{
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
				}(),start=_$68.start,rest=_$68.rest,folder=_$68.folder;
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
			const _default=built.default=function _default(){
				const _this=this;
				return fold(_this,0,_ms.sub(_43,1))
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
			const _default=built.default=function _default(keep_45if_63){
				const _this=this;
				_ms.checkContains(Pred,keep_45if_63,"keep-if?");
				return _61_62(type_45of(_this),()=>{
					const built=[];
					for(let _ of _this){
						if(keep_45if_63(_)){
							_ms.add(built,_)
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
			const _default=built.default=function _default(mapper){
				const _this=this;
				_ms.checkContains(_ms.sub(Function,Any,_64),mapper,"mapper");
				return _61_62(type_45of(_this),()=>{
					const built=[];
					for(let _ of _this){
						_ms.addMany(built,mapper(_))
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
			const _default=built.default=function _default(){
				const _this=this;
				return _61_62(type_45of(_this),()=>{
					const built=[];
					for(let _ of _this){
						_ms.addMany(built,_)
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
			const _default=built.default=function _default(_64other){
				const _this=this;
				return _61_62(type_45of(_this),()=>{
					const built=[];
					for(;;){
						_ms.addMany(built,_this);
						_ms.addMany(built,_64other);
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
			const _default=built.default=function _default(_64remove){
				const _this=this;
				return _61_62(type_45of(_this),_45_45_39(_this,_64remove))
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
					const _64remove_45remaining=_61_62(_ms.unlazy(Set),_64remove);
					for(let _ of _64removed_45from){
						if(_ms.bool(_ms.contains(_64remove_45remaining,_))){
							_45_45_33(_64remove_45remaining,[_])
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
			return _ms.set(function(_64other){
				const _this=this;
				return (id_61_63(type_45of(_this),type_45of(_64other))&&_ms.unlazy(seq_61_63)(_this,_64other))
			},built)
		}());
		const empty_33=exports["empty!"]=Method(()=>{
			const built={};
			const doc=built.doc=`Mutates this collection so that it will be \`empty?\`.`;
			const args=built.args=1;
			return _ms.setName(built,"empty!")
		}());
		const _43_43_33=exports["++!"]=Method(()=>{
			const built={};
			const doc=built.doc=`Adds new elements.\nFor Seqs these are added on the right; use \`<++!\` to add on the left.`;
			const test=built.test=function test(){};
			const args=built.args=()=>{
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`added`,_64]);
				return built
			}();
			const _default=built.default=function _default(added){
				const _this=this;
				_ms.unlazy(_43_43_62_33)(_this,added)
			};
			return _ms.setName(built,"++!")
		}());
		const _45_45_33=exports["--!"]=Method(()=>{
			const built={};
			const doc=built.doc=`Removes all elements in \`removed\` once.\nFor Seqs these are removed starting from the left.`;
			const args=built.args=()=>{
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`@removed`,_64]);
				return built
			}();
			const test=built.test=function test(){};
			return _ms.setName(built,"--!")
		}());
		const name=exports.name=`@`;
		exports.default=_64;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL0AubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0VBdUJBLFVBQUcsU0FDSTs7R0FBTixvQkFDQztHQUdELG1EQUFvQiw0QkFBQSxXQUNNO0lBQXpCLGNBQVEsT0FBRyx5Q0FDa0I7S0FBcEIsa0RBQUEsNkJBQXNCO0tBQzlCLDBCQUFVO2dCQUNGLFNBQU87SUFBQTtHQUFBOzs7RUFFbEIsZ0NBQVUsV0FDTTs7R0FBZixvQkFBTTtHQUNOLHNCQUFNO0dBQ04seUNBQWE7OztFQUVkLGlDQUFRLFdBQ007O0dBQWIsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFFLElBQVM7b0JBQ1gsQ0FBRSxDQUFFLElBQVM7OztHQUNkLHNCQUFNO0dBQ04sNkJBQ1csbUJBQUE7O1dBQVQsU0FBUzs7OztFQUdYLFFBQU0sWUFBVSxRQUNDOztHQUFoQixvQkFBTTtHQUNOLHNCQUNRLGVBQUE7NEJBQUcsQ0FBRSxHQUFKOytCQUNFLENBQUUsR0FBSjtHQUFBO2tCQUNQLFNBQUEsR0FDTTs7c0JBREg7V0FDSixPQUFLLE1BQU0sY0FDVTtZQUFwQixPQUFHLEdBQUc7SUFBQTtHQUFBOztFQUVULDRCQUNLOztHQUFKLG9CQUNDO0dBR0Qsc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxDQUFFLEVBQUUsRUFBRSxHQUFJLEtBQU87b0JBQ25CLENBQUUsQ0FBRSxFQUFFLEVBQUUsR0FBSSxFQUFFLEtBQU87OztrQkFDckIsY0FBQSxFQUFJLEVBQUUsRUFDQztzQkFETDtJQUNGO0tBQ0MsWUFBQSxXQUFTLElBQ0M7O01BQVQsd0JBQU87TUFDUCwwQkFBUTtNQUNSLHNCQUFNOztZQUVIOztNQUFILDBDQUFZO01BQ1osMEJBQVE7TUFDUix1Q0FBVTs7OztJQUVaLFFBQVE7SUFDSCxRQUFBLEtBQUEsS0FDSTtTQUFELE9BQU8sSUFBSTtJQUFBO1dBQ25CO0dBQUE7O0VBRUYsaUNB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RSxFQUFFOzs7R0FDeEIsMEJBQ0s7O2tCQUFGLENBQUcsS0FBSTtrQkFDUCxDQUFHLEtBQUk7OztHQUNWLDZCQUFXLGtCQUFBLFNBQ007O1dBRWhCLE9BQUksVUFBUTs7WUFDVTt3QkFBakI7d0JBQ0E7TUFDSjtLQUFBOzs7Ozs7RUFFSCxtQ0FDSTs7R0FBSCxvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsQ0FBRSxHQUFJLENBQUUsSUFBUywwQkFBVSxDQUFFLEVBQUU7OztrQkFDakMsbUJBQVEsS0FBRyxLQUNFO21FQUVILFdBQUE7YUFBTCxTQUFTO2FBQ1QsU0FBUztJQUFBOzs7RUFHaEIsMkJBQUksV0FDTTs7R0FBVCxvQkFDQztHQUVELHNCQUNPLGVBQUE7O29CQUFOLENBQUUsQ0FBRSxFQUFFLEVBQUUsR0FBSSxDQUFFLElBQVMsQ0FBRSxFQUFFOzs7R0FDNUIsMEJBQ0s7O2tCQUFEO2tCQUNELENBQUcsVUFBUzs7O0dBQ2YsNkJBQVcsa0JBQUEsVUFDTzs7V0FBakIsT0FBSSxVQUFRLE9BQU8sVUFBSSxNQUFLO0dBQUE7OztFQUU5QixtQ0FDSTs7R0FBSCxvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsQ0FBRSxFQUFFLEVBQUUsR0FBSSxDQUFFLElBQVMsMEJBQVUsQ0FBRSxFQUFFOzs7a0JBQ3JDLG1CQUFHLGtCQUFjLFVBQ1M7c0JBREQ7NkJBQXhCLHVCQUdTLFdBQUE7S0FBVCw0QkFBb0IsdUJBQU87S0FDdEIsUUFBQSxLQUFBLGtCQUNhO01BQ1oseUJBQUgsc0JBQUQsSUFDa0I7T0FDakIsVUFBSSxzQkFBa0IsQ0FBRTtNQUFBLE9BRXJCO2NBQUE7TUFBQTtLQUFBO0lBQUE7OztFQUVULFFBQU0sT0FBRyxRQUNDOztHQUFULHNCQUNRLGVBQUE7ZUFBQyxPQUFHLENBQUUsR0FBSSxDQUFFO0dBQUE7a0JBQ2xCLFNBQUEsU0FDTTs7V0FBUCxDQUFLLFNBQU0sVUFBUSxPQUFPLFVBQVEsa0NBQWdCLE1BQUs7R0FBQTs7RUFHekQsaUNBQVEsV0FDTTs7R0FBYixvQkFBTTtHQUNOLHNCQUFNOzs7RUFFUCwrQkFBSyxXQUNNOztHQUFWLG9CQUNDO0dBRUQsc0JBQ1EsZUFBQTtHQUNSLDBCQUNLOztrQkFBRDtrQkFDRCxDQUFHLFFBQU87OztHQUViLDZCQUFZLGtCQUFBLE1BQ0s7OzZCQUFYLE1BQUs7R0FBQTs7O0VBRVosK0JBQUssV0FDTTs7R0FBVixvQkFDQztHQUVELDBCQUNLOztrQkFBRDtrQkFDRCxDQUFHLFdBQVU7OztHQUNoQixzQkFDUSxlQUFBOzs7RUF0VFYsd0JBQUE7a0JBdUJBIiwiZmlsZSI6ImF0L2F0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=