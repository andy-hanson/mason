"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../compare","../Function","../js","../math/methods","../to-string","../String","../Type/Method","../Type/Kind","../Type/Method","../Type/Pred-Type","../Type/Type","../control","./q","./Seq/Seq","./Seq/Stream","./Set/Set","../math/Number","../Try","./at-Type","./q","./Map/Weak-Id-Map","./Seq/Deque"],(exports,compare_0,Function_1,js_2,methods_3,to_45string_4,String_5,Method_6,Kind_7,Method_8,Pred_45Type_9,Type_10,control_11,_63_12,Seq_13,Stream_14,Set_15,Number_16,Try_17,_64_45Type_18,_63_19,Weak_45Id_45Map_20,Deque_21)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_60_63=_ms.get(_$2,"<?"),_$3=_ms.getModule(Function_1),identity=_ms.get(_$3,"identity"),Pred=_ms.get(_$3,"Pred"),_$4=_ms.getModule(js_2),defined_63=_ms.get(_$4,"defined?"),id_61_63=_ms.get(_$4,"id=?"),_$5=_ms.getModule(methods_3),_43=_ms.get(_$5,"+"),to_45string=_ms.getDefaultExport(to_45string_4),_$7=_ms.getModule(String_5),indent=_ms.get(_$7,"indent"),Method=_ms.getDefaultExport(Method_6),Kind=_ms.getDefaultExport(Kind_7),_$10=_ms.getModule(Method_8),impl_33=_ms.get(_$10,"impl!"),_$11=_ms.getModule(Pred_45Type_9),Any=_ms.get(_$11,"Any"),Opt=_ms.get(_$11,"Opt"),_$12=_ms.getModule(Type_10),_61_62=_ms.get(_$12,"=>"),contains_63=_ms.get(_$12,"contains?"),type_45of=_ms.get(_$12,"type-of"),_$14=_ms.lazyGetModule(control_11),opr=_ms.lazyProp(_$14,"opr"),_$15=_ms.lazyGetModule(_63_12),Opt_45_62_63=_ms.lazyProp(_$15,"Opt->?"),_$16=_ms.lazyGetModule(Seq_13),_43_43_62_33=_ms.lazyProp(_$16,"++>!"),first=_ms.lazyProp(_$16,"first"),seq_61_63=_ms.lazyProp(_$16,"seq=?"),tail=_ms.lazyProp(_$16,"tail"),take_39=_ms.lazyProp(_$16,"take'"),Stream=_ms.lazy(()=>{
			return _ms.getDefaultExport(Stream_14)
		}),Set=_ms.lazy(()=>{
			return _ms.getDefaultExport(Set_15)
		}),_$20=_ms.lazyGetModule(Number_16),divisible_63=_ms.lazyProp(_$20,"divisible?"),_$21=_ms.lazyGetModule(Try_17),fails_63=_ms.lazyProp(_$21,"fails?"),_$22=_ms.lazyGetModule(_64_45Type_18),empty=_ms.lazyProp(_$22,"empty"),_$23=_ms.lazyGetModule(_63_19),_63None=_ms.lazyProp(_$23,"?None"),_63some=_ms.lazyProp(_$23,"?some"),Weak_45Id_45Map=_ms.lazy(()=>{
			return _ms.getDefaultExport(Weak_45Id_45Map_20)
		}),Deque=_ms.lazy(()=>{
			return _ms.getDefaultExport(Deque_21)
		});
		const _64=new (Kind)(()=>{
			const built={};
			const doc=built.doc=`"Bag". Contains a variable number of elements. Most things implementing \`iterator\` should be @s.\nIf the iteration order of an @ is meaningful and \`+ a b\` is the concatenation, it is a Seq.\nIf an @ only stores a given element once, it is a Set.`;
			const implementor_45test=built["implementor-test"]=function implementor_45test(_64_45type){
				if(! _61_63(_64_45type,_ms.unlazy(Weak_45Id_45Map))){
					const _=_ms.unlazy(empty)(_64_45type);
					_ms.assert(empty_63,_)
				}
			};
			return _ms.setName(built,"@")
		}());
		impl_33(to_45string,_64,()=>{
			const built={};
			const test=built.test=function test(){
				const built=new (global.Map)();
				const d=_61_62(_ms.unlazy(Deque),[1,2,3]);
				_ms.assoc(built,[d],`\n\t. 1\n\t. 2\n\t. 3`);
				_ms.assoc(built,[d,{
					repr:true
				}],`=> Deque\n\t. 1\n\t. 2\n\t. 3`);
				_ms.assoc(built,[_ms.unlazy(empty)(_ms.unlazy(Deque))],`[ ]`);
				_ms.assoc(built,[_ms.unlazy(empty)(_ms.unlazy(Deque)),{
					repr:true
				}],`empty Deque`);
				return built
			};
			return _ms.set(function(){
				const _this=this;
				const content=()=>{
					if(empty_63(_this)){
						return `[ ]`
					} else {
						const ems=()=>{
							const built=[];
							for(let _ of _this){
								_ms.add(built,indent(to_45string(_)))
							};
							return built
						}();
						const _$64=()=>{
							if(_60_63(100,count(_this))){
								const built={};
								const show_45ems=built["show-ems"]=_ms.unlazy(take_39)(ems,100);
								const end=built.end=`\n\t...`;
								return built
							} else {
								const built={};
								const show_45ems=built["show-ems"]=ems;
								const end=built.end="";
								return built
							}
						}(),show_45ems=_$64["show-ems"],end=_$64.end;
						return `\n\t. ${_61_62(String,show_45ems,`\n\t. `)}${end}`
					}
				}();
				return ()=>{
					if(empty_63(_this)){
						return `empty ${type_45of(_this)}`
					} else {
						return `=> ${type_45of(_this)}${content}`
					}
				}()
			},built)
		}());
		const iterator=exports.iterator=new (Method)(()=>{
			const built={};
			const doc=built.doc=`Creates a new Generator which yields the values in the @.`;
			const args=built.args=1;
			const impl_45symbol=built["impl-symbol"]=Symbol.iterator;
			return _ms.setName(built,"iterator")
		}());
		const empty_63=exports["empty?"]=new (Method)(()=>{
			const built={};
			const doc=built.doc=`Whether \`count\` is 0. Often much faster.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
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
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2,3],_43],6);
				_ms.assoc(built,[[1,2,3],4,_43],10);
				return built
			};
			return _ms.set(function fold(_,b,c){
				_ms.checkContains(_64,_,"_");
				const _$113=()=>{
					if(defined_63(c)){
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
				}(),start=_$113.start,rest=_$113.rest,folder=_$113.folder;
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
				const built=new (global.Map)();
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
				const built=new (global.Map)();
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
				const built=new (global.Map)();
				_ms.assoc(built,[[0,1],_ms.sub(_61_63,1)],_ms.unlazy(_63some)(1));
				_ms.assoc(built,[[0],_ms.sub(_61_63,1)],_ms.unlazy(_63None));
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
		const count=exports.count=new (Method)(()=>{
			const built={};
			const doc=built.doc=`Number of elements.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
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
		const keep=exports.keep=new (Method)(()=>{
			const built={};
			const doc=built.doc=`Only the elements that satisfy \`keep-if?\`.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
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
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2],_ms.sub(_61_63,2)],_61_62(_ms.unlazy(Stream),[2]));
				return built
			};
			return _ms.set(function keep_39(filtered,keep_45if_63){
				_ms.checkContains(_64,filtered,"filtered");
				_ms.checkContains(Pred,keep_45if_63,"keep-if?");
				return new (_ms.unlazy(Stream))(function*(){
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
				const built=new (global.Map)();
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
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2],_ms.sub(_61_63,2)],_61_62(_ms.unlazy(Stream),[false,true]));
				return built
			};
			return _ms.set(function map_39(mapped,mapper){
				_ms.checkContains(_64,mapped,"mapped");
				_ms.checkContains(Function,mapper,"mapper");
				return new (_ms.unlazy(Stream))(function*(){
					for(let _ of mapped){
						(yield mapper(_))
					}
				})
			},built)
		}();
		const flat_45map=exports["flat-map"]=new (Method)(()=>{
			const built={};
			const doc=built.doc=`Like \`map\`, but each mapping produces multiple values.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
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
				const built=new (global.Map)();
				const f=function f(_){
					return ()=>{
						if(_ms.unlazy(divisible_63)(_,2)){
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
				return new (_ms.unlazy(Stream))(function*(){
					for(let _ of mapped){
						(yield* iterator(mapper(_)))
					}
				})
			},built)
		}();
		const flatten=exports.flatten=new (Method)(()=>{
			const built={};
			const doc=built.doc=`For an @ containing many @, produces an @ containing all of their entries combined.\nThis does *not* consider more than 1 nested level, and there *every* element of _ must be an @.\nMore efficient than \`fold + _\`.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
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
				const built=new (global.Map)();
				_ms.assoc(built,[[[1,2],[3],[]]],_61_62(_ms.unlazy(Stream),[1,2,3]));
				_ms.assoc(built,[[[1],[[2]]]],_61_62(_ms.unlazy(Stream),[1,[2]]));
				_ms.assert(_ms.unlazy(fails_63),()=>{
					return _61_62(Array,flatten([[1],2,[3]]))
				});
				return built
			};
			return _ms.set(function flatten_39(flattened){
				return new (_ms.unlazy(Stream))(function*(){
					for(let _ of flattened){
						(yield* iterator(_))
					}
				})
			},built)
		}();
		const _43_43=exports["++"]=new (Method)(()=>{
			const built={};
			const doc=built.doc=`Concatenation. Sets should override this.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
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
				const built=new (global.Map)();
				_ms.assoc(built,[[0],[1]],_61_62(_ms.unlazy(Stream),[0,1]));
				return built
			};
			return _ms.set(function _43_43_39(_64a,_64b){
				return _ms.checkContains(_ms.unlazy(Stream),new (_ms.unlazy(Stream))(function*(){
					(yield* iterator(_64a));
					(yield* iterator(_64b))
				}),"res")
			},built)
		}();
		const _45_45=exports["--"]=new (Method)(()=>{
			const built={};
			const doc=built.doc=`@ without any of the elements in \`remove\`.\nRemoves the *first* occurrence of each element.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
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
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2,1],[1]],_61_62(_ms.unlazy(Stream),[2,1]));
				return built
			};
			return _ms.set(function _45_45_39(_64removed_45from,_64remove){
				_ms.checkContains(_64,_64remove,"@remove");
				return _ms.checkContains(_64,new (_ms.unlazy(Stream))(function*(){
					const _64remove_45remaining=_61_62(_ms.unlazy(Set),_64remove);
					for(let _ of _64removed_45from){
						if(_ms.contains(_64remove_45remaining,_)){
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
		const empty_33=exports["empty!"]=new (Method)(()=>{
			const built={};
			const doc=built.doc=`Mutates this collection so that it will be \`empty?\`.`;
			const args=built.args=1;
			return _ms.setName(built,"empty!")
		}());
		const _43_43_33=exports["++!"]=new (Method)(()=>{
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
		const _45_45_33=exports["--!"]=new (Method)(()=>{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL0AubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztFQTBCQSxVQUFHLEtBQUksVUFDSTs7R0FBVixvQkFDQztHQUdELG1EQUFvQiw0QkFBQSxXQUNNO0lBQXpCLEtBQVEsT0FBRyx3Q0FDa0I7S0FFNUIsMEJBQVU7Z0JBQ0YsU0FBTztJQUFBO0dBQUE7OztFQUdsQixRQUFNLFlBQVUsUUFDQzs7R0FBaEIsc0JBQ08sZUFBQTs7SUFBTixRQUFJLHlCQUFTLENBQUUsRUFBRSxFQUFFO29CQUNuQixDQUFFLEdBQ0Q7b0JBSUQsQ0FBRSxFQUFFO1VBQU87SUFBQSxHQUNWO29CQUlELHVDQUFzQjtvQkFDdEIsc0NBQWdCO1VBQU87SUFBQSxHQUFZOzs7a0JBR2xDLFVBQUE7VUFpU0s7SUFqU047S0FDQyxHQUFBLFNBZ1NLLE9BL1JNO2FBQVQ7WUFFRTtNQUNIOztlQUFXLEtBNFJQLE1BM1JXO3NCQUFkLE9BQU8sWUFBUztPQUFBOzs7TUFDakI7T0FDQyxHQUFBLE9BQUcsSUFBSyxNQXlSTCxRQXhSZ0I7O1FBQWxCLHVEQUFnQixJQUFJO1FBQ3BCLG9CQUFNOztjQUVIOztRQUFILG1DQUFVO1FBQ1Ysb0JBQU07Ozs7YUFDUCxTQUFPLE9BQUcsT0FBTyxXQUFVLFlBQVM7Ozs7S0FHdEMsR0FBQSxTQWdSSyxPQS9RTTthQUFULFNBQU8sVUErUUo7WUE3UUQ7YUFBRixNQUFJLFVBNlFELFNBN1FlOzs7OztFQUd2QixnQ0FBVSxLQUFJLFlBQ007O0dBQW5CLG9CQUFNO0dBQ04sc0JBQU07R0FDTix5Q0FBYTs7O0VBRWQsaUNBQVEsS0FBSSxZQUNNOztHQUFqQixvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsSUFBUztvQkFDWCxDQUFFLENBQUUsSUFBUzs7O0dBQ2Qsc0JBQU07R0FDTiw2QkFDVyxtQkFBQTtVQThQSjtXQTlQTCxTQThQSzs7OztFQTNQUCxR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