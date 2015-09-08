"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../compare","../Function","../js","../math/methods","../to-string","../String","../Type/Method","../Type/Kind","../Type/Method","../Type/Pred-Type","../Type/Type","../control","./q","./Seq/Seq","./Seq/Stream","./Set/Set","../math/Number","../Try","./at-Type","./q","./Map/Weak-Id-Map","./Seq/Deque"],(exports,compare_0,Function_1,js_2,methods_3,to_45string_4,String_5,Method_6,Kind_7,Method_8,Pred_45Type_9,Type_10,control_11,_63_12,Seq_13,Stream_14,Set_15,Number_16,Try_17,_64_45Type_18,_63_19,Weak_45Id_45Map_20,Deque_21)=>{
	exports._get=_ms.lazy(()=>{
		const _$1=_ms.getModule(compare_0),_61_63=_ms.get(_$1,"=?"),_$2=_ms.getModule(Function_1),identity=_ms.get(_$2,"identity"),Pred=_ms.get(_$2,"Pred"),_$3=_ms.getModule(js_2),defined_63=_ms.get(_$3,"defined?"),id_61_63=_ms.get(_$3,"id=?"),_$4=_ms.getModule(methods_3),_43=_ms.get(_$4,"+"),to_45string=_ms.getDefaultExport(to_45string_4),_$5=_ms.getModule(to_45string_4),inspect=_ms.get(_$5,"inspect"),_$6=_ms.getModule(String_5),indent=_ms.get(_$6,"indent"),Method=_ms.getDefaultExport(Method_6),Kind=_ms.getDefaultExport(Kind_7),_$7=_ms.getModule(Method_8),impl_33=_ms.get(_$7,"impl!"),_$8=_ms.getModule(Pred_45Type_9),Any=_ms.get(_$8,"Any"),Opt=_ms.get(_$8,"Opt"),_$9=_ms.getModule(Type_10),_61_62=_ms.get(_$9,"=>"),contains_63=_ms.get(_$9,"contains?"),type_45of=_ms.get(_$9,"type-of"),_$10=_ms.lazyGetModule(control_11),opr=_ms.lazyProp(_$10,"opr"),_$11=_ms.lazyGetModule(_63_12),Opt_45_62_63=_ms.lazyProp(_$11,"Opt->?"),_$12=_ms.lazyGetModule(Seq_13),_43_62_33=_ms.lazyProp(_$12,"+>!"),_43_43_62_33=_ms.lazyProp(_$12,"++>!"),first=_ms.lazyProp(_$12,"first"),seq_61_63=_ms.lazyProp(_$12,"seq=?"),tail=_ms.lazyProp(_$12,"tail"),Stream=_ms.lazy(()=>_ms.getDefaultExport(Stream_14)),Set=_ms.lazy(()=>_ms.getDefaultExport(Set_15)),_$13=_ms.lazyGetModule(Number_16),divisible_63=_ms.lazyProp(_$13,"divisible?"),_$14=_ms.lazyGetModule(Try_17),fails_63=_ms.lazyProp(_$14,"fails?"),_$15=_ms.lazyGetModule(_64_45Type_18),empty=_ms.lazyProp(_$15,"empty"),_$16=_ms.lazyGetModule(_63_19),_63None=_ms.lazyProp(_$16,"?None"),_63some=_ms.lazyProp(_$16,"?some"),Weak_45Id_45Map=_ms.lazy(()=>_ms.getDefaultExport(Weak_45Id_45Map_20)),Deque=_ms.lazy(()=>_ms.getDefaultExport(Deque_21));
		const _64=new (Kind)((()=>{
			const built={};
			built[`name`]="@";
			const doc=built.doc=`"Bag". Contains a variable number of elements. Most things implementing \`iterator\` should be @s.
If the iteration order of an @ is meaningful and \`+ a b\` is the concatenation, it is a Seq.
If an @ only stores a given element once, it is a Set.`;
			const implementor_45test=built["implementor-test"]=function implementor_45test(_64_45type){
				if(! _61_63(_64_45type,_ms.unlazy(Weak_45Id_45Map))){
					const _=_ms.unlazy(empty)(_64_45type);
					_ms.assert(empty_63,_)
				}
			};
			return built
		})());
		const do_45inspect=function do_45inspect(_,recurse){
			return (()=>{
				if(empty_63(_)){
					return `empty ${_.constructor.name}`
				} else {
					const content=(()=>{
						const show_45ems=_61_62(Array,(()=>{
							const built=[];
							for(let em of _){
								_ms.add(built,indent(recurse(em)))
							};
							return built
						})());
						return `\n\t. ${show_45ems.join(`\n\t. `)}`
					})();
					return `${_.constructor.name}${content}`
				}
			})()
		};
		impl_33(to_45string,_64,(()=>{
			const built={};
			const test=built.test=function test(){
				const built=new (global.Map)();
				const d=_61_62(_ms.unlazy(Deque),[1,2,3]);
				_ms.assoc(built,[d],`Deque
	. 1
	. 2
	. 3`);
				_ms.assoc(built,[_ms.unlazy(empty)(_ms.unlazy(Deque))],`empty Deque`);
				return built
			};
			return _ms.set(function(){
				const _this=this;
				return do_45inspect(_this,to_45string)
			},built)
		})());
		impl_33(inspect,_64,function(){
			const _this=this;
			return do_45inspect(_this,inspect)
		});
		const iterator=exports.iterator=new (Method)((()=>{
			const built={};
			built[`name`]="iterator";
			const doc=built.doc=`Creates a new Generator which yields the values in the @.`;
			const args=built.args=1;
			const impl_45symbol=built["impl-symbol"]=Symbol.iterator;
			return built
		})());
		const empty_63=exports["empty?"]=new (Method)((()=>{
			const built={};
			built[`name`]="empty?";
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
			return built
		})());
		impl_33(contains_63,_64,(()=>{
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
		})());
		const fold=exports.fold=(()=>{
			const built={};
			const doc=built.doc=`Keeps a state variable \`acc\` and keeps applying \`folder acc em\` for the elements, in order.
Returns the final value.
If empty?_, fails unless a \`start\` value for \`acc\` is provided. Otherwise \`acc\` starts as the first element.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2,3],_43],6);
				_ms.assoc(built,[[1,2,3],4,_43],10);
				return built
			};
			return _ms.set((_,b,c)=>{
				_ms.checkContains(_64,_,"_");
				const _$0=(()=>{
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
				})(),start=_$0.start,rest=_$0.rest,folder=_$0.folder;
				let acc=start;
				for(let _ of rest){
					acc=folder(acc,_)
				};
				return acc
			},built)
		})();
		const any_63=exports["any?"]=(()=>{
			const built={};
			const doc=built.doc=`Whether pred? is true for at least one element.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[0,1],_ms.sub(_61_63,1)],true);
				_ms.assoc(built,[[0,1],_ms.sub(_61_63,2)],false);
				return built
			};
			return _ms.set((_,pred_63)=>{
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(_ms.sub(Opt,Pred),pred_63,"pred?");
				pred_63=_ms.unlazy(opr)(pred_63,identity);
				return ! empty_63(_63find(_,pred_63))
			},built)
		})();
		const all_63=exports["all?"]=(()=>{
			const built={};
			const doc=built.doc=`Whether pred? is true for every element.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[0,0],_ms.sub(_61_63,0)],true);
				_ms.assoc(built,[[0,1],_ms.sub(_61_63,0)],false);
				return built
			};
			return _ms.set((_,pred_63)=>{
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(_ms.sub(Opt,Pred),pred_63,"pred?");
				pred_63=_ms.unlazy(opr)(pred_63,identity);
				return empty_63(_63find(_,em=>{
					return ! pred_63(em)
				}))
			},built)
		})();
		const _63find=exports["?find"]=(()=>{
			const built={};
			const doc=built.doc=`First element for which pred? is true.
(To find all, use \`keep\`.)`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[0,1],_ms.sub(_61_63,1)],_ms.unlazy(_63some)(1));
				_ms.assoc(built,[[0],_ms.sub(_61_63,1)],_ms.unlazy(_63None));
				return built
			};
			return _ms.set((_,pred_63)=>{
				_ms.checkContains(Pred,pred_63,"pred?");
				return _ms.unlazy(Opt_45_62_63)((()=>{
					for(let elem of _){
						if(pred_63(elem)){
							return elem
						}
					}
				})())
			},built)
		})();
		const count=exports.count=new (Method)((()=>{
			const built={};
			built[`name`]="count";
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
			return built
		})());
		const keep=exports.keep=new (Method)((()=>{
			const built={};
			built[`name`]="keep";
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
				return _61_62(type_45of(_this),(()=>{
					const built=[];
					for(let _ of _this){
						if(keep_45if_63(_)){
							_ms.add(built,_)
						}
					};
					return built
				})())
			};
			return built
		})());
		const keep_126=exports["keep~"]=(()=>{
			const built={};
			const doc=built.doc=`Lazy keep.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2],_ms.sub(_61_63,2)],_61_62(_ms.unlazy(Stream),[2]));
				return built
			};
			return _ms.set((filtered,keep_45if_63)=>{
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
		})();
		const map=exports.map=(()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2],_ms.sub(_61_63,2)],[false,true]);
				return built
			};
			return _ms.set((_,mapper)=>{
				_ms.checkContains(_64,_,"_");
				_ms.checkContains(Function,mapper,"mapper");
				return _61_62(type_45of(_),(()=>{
					const built=[];
					for(let elem of _){
						_ms.add(built,mapper(elem))
					};
					return built
				})())
			},built)
		})();
		const map_126=exports["map~"]=(()=>{
			const built={};
			const doc=built.doc=`Lazy map.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2],_ms.sub(_61_63,2)],_61_62(_ms.unlazy(Stream),[false,true]));
				return built
			};
			return _ms.set((mapped,mapper)=>{
				_ms.checkContains(_64,mapped,"mapped");
				_ms.checkContains(Function,mapper,"mapper");
				return new (_ms.unlazy(Stream))(function*(){
					for(let _ of mapped){
						(yield mapper(_))
					}
				})
			},built)
		})();
		const flat_45map=exports["flat-map"]=new (Method)((()=>{
			const built={};
			built[`name`]="flat-map";
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
				return _61_62(type_45of(_this),(()=>{
					const built=[];
					for(let _ of _this){
						_ms.addMany(built,mapper(_))
					};
					return built
				})())
			};
			return built
		})());
		const flat_45map_126=exports["flat-map~"]=(()=>{
			const built={};
			const doc=built.doc=`Lazy flat-map.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				const f=function f(_){
					return (()=>{
						if(_ms.unlazy(divisible_63)(_,2)){
							return [_,_]
						} else {
							return [_]
						}
					})()
				};
				_ms.assoc(built,[[1,2,3,4],f],_61_62(_ms.unlazy(Stream),[1,2,2,3,4,4]));
				return built
			};
			const args=built.args=2;
			return _ms.set((mapped,mapper)=>{
				_ms.checkContains(_64,mapped,"mapped");
				_ms.checkContains(_ms.sub(Function,Any,_64),mapper,"mapper");
				return new (_ms.unlazy(Stream))(function*(){
					for(let _ of mapped){
						(yield* iterator(mapper(_)))
					}
				})
			},built)
		})();
		const flatten=exports.flatten=new (Method)((()=>{
			const built={};
			built[`name`]="flatten";
			const doc=built.doc=`For an @ containing many @, produces an @ containing all of their entries combined.
This does *not* consider more than 1 nested level, and there *every* element of _ must be an @.
More efficient than \`fold + _\`.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[[1,2],[3],[]]],[1,2,3]);
				return built
			};
			const args=built.args=2;
			const _default=built.default=function _default(){
				const _this=this;
				return _61_62(type_45of(_this),(()=>{
					const built=[];
					for(let _ of _this){
						_ms.addMany(built,_)
					};
					return built
				})())
			};
			return built
		})());
		const flatten_126=exports["flatten~"]=(()=>{
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
			return _ms.set(flattened=>{
				return new (_ms.unlazy(Stream))(function*(){
					for(let _ of flattened){
						(yield* iterator(_))
					}
				})
			},built)
		})();
		const _43_43=exports["++"]=new (Method)((()=>{
			const built={};
			built[`name`]="++";
			const doc=built.doc=`Concatenation. Sets should override this.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[0],[1]],[0,1]);
				return built
			};
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,[`@a`,_64]);
				_ms.add(built,[`@b`,_64]);
				return built
			})();
			const _default=built.default=function _default(_64other){
				const _this=this;
				return _61_62(type_45of(_this),(()=>{
					const built=[];
					for(;;){
						_ms.addMany(built,_this);
						_ms.addMany(built,_64other);
						break
					};
					return built
				})())
			};
			return built
		})());
		const _43_43_126=exports["++~"]=(()=>{
			const built={};
			const doc=built.doc=`Lazy ++.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[0],[1]],_61_62(_ms.unlazy(Stream),[0,1]));
				return built
			};
			return _ms.set((_64a,_64b)=>{
				return _ms.checkContains(_ms.unlazy(Stream),new (_ms.unlazy(Stream))(function*(){
					(yield* iterator(_64a));
					(yield* iterator(_64b))
				}),"res")
			},built)
		})();
		const _45_45=exports["--"]=new (Method)((()=>{
			const built={};
			built[`name`]="--";
			const doc=built.doc=`@ without any of the elements in \`remove\`.
Removes the *first* occurrence of each element.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2,1],[1]],[2,1]);
				return built
			};
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`@remove`,_64]);
				return built
			})();
			const _default=built.default=function _default(_64remove){
				const _this=this;
				return _61_62(type_45of(_this),_45_45_126(_this,_64remove))
			};
			return built
		})());
		const _45_45_126=exports["--~"]=(()=>{
			const built={};
			const doc=built.doc=`Lazy --.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[1,2,1],[1]],_61_62(_ms.unlazy(Stream),[2,1]));
				return built
			};
			return _ms.set((_64removed_45from,_64remove)=>{
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
		})();
		impl_33(_61_63,_64,(()=>{
			const built={};
			const test=built.test=function test(){
				_ms.assert(_61_63,[1],[1])
			};
			return _ms.set(function(_64other){
				const _this=this;
				return (id_61_63(type_45of(_this),type_45of(_64other))&&_ms.unlazy(seq_61_63)(_this,_64other))
			},built)
		})());
		const empty_33=exports["empty!"]=new (Method)((()=>{
			const built={};
			built[`name`]="empty!";
			const doc=built.doc=`Mutates this collection so that it will be \`empty?\`.`;
			const args=built.args=1;
			return built
		})());
		const _43_33=exports["+!"]=new (Method)((()=>{
			const built={};
			built[`name`]="+!";
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){};
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,`added`);
				return built
			})();
			const _default=built.default=function _default(added){
				const _this=this;
				_ms.unlazy(_43_62_33)(_this,added)
			};
			return built
		})());
		const _43_43_33=exports["++!"]=new (Method)((()=>{
			const built={};
			built[`name`]="++!";
			const doc=built.doc=`Adds new elements.
For Seqs these are added on the right; use \`<++!\` to add on the left.`;
			const test=built.test=function test(){};
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`@added`,_64]);
				return built
			})();
			const _default=built.default=function _default(_64added){
				const _this=this;
				_ms.unlazy(_43_43_62_33)(_this,_64added)
			};
			return built
		})());
		const _45_33=exports["-!"]=new (Method)((()=>{
			const built={};
			built[`name`]="-!";
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){};
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`@removed`,_64]);
				return built
			})();
			return built
		})());
		const _45_45_33=exports["--!"]=new (Method)((()=>{
			const built={};
			built[`name`]="--!";
			const doc=built.doc=`Removes all elements in \`removed\` once.
For Seqs these are removed starting from the left.`;
			const test=built.test=function test(){};
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`@removed`,_64]);
				return built
			})();
			return built
		})());
		const name=exports.name=`@`;
		exports.default=_64;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvQC9ALm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBMEJBLFVBQUcsS0FBSSxNQUNJLEtBQUE7O1NBQVYsUUFBQTtHQUNBLG9CQUNDO0dBR0QsbURBQW9CLDRCQUFBLFdBQ007SUFBekIsS0FBUSxPQUFHLHdDQUNrQjtLQUU1QiwwQkFBVTtnQkFDRixTQUFPO0lBQUE7R0FBQTs7O0VBR2xCLG1CQUFjLHNCQUFBLEVBQUUsUUFDTztVQUNsQjtJQUFILEdBQUEsU0FBTyxHQUNDO1lBQU4sU0FBTztXQUVMO0tBQUgsY0FDUyxLQUFBO01BQ1IsaUJBQVcsT0FpTlIsTUFqTnNCOztlQUFBLE1BQU0sRUFDQztzQkFBL0IsT0FBUSxRQUFRO09BQUE7OzthQUNoQixTQUFPLGdCQUFlOztZQUN2QixHQUFDLHFCQUFvQjs7OztFQUV6QixRQUFNLFlBQVUsSUFDQyxLQUFBOztHQUFoQixzQkFDTyxlQUFBOztJQUFOLFFBQUkseUJBQVMsQ0FBQyxFQUFFLEVBQUU7b0JBQ2xCLENBQUMsR0FDQTtvQkFJRCx1Q0FBb0I7OztrQkFFbkIsVUFBQTtVQXNTSztXQXRTTixhQXNTTSxNQXRTVTtHQUFBOztFQUVsQixRQUFNLFFBQVEsSUFDSSxVQUFBO1NBbVNWO1VBblNQLGFBbVNPLE1BblNTO0VBQUE7RUFFakIsZ0NBQVUsS0FBSSxRQUNNLEtBQUE7O1NBQW5CLFFBQUE7R0FDQSxvQkFBTTtHQUNOLHNCQUFNO0dBQ04seUNBQWE7OztFQUVkLGlDQUFRLEtBQUksUUFDTSxLQUFBOztTQUFqQixRQUFBO0dBQ0Esb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFDLElBQU87b0JBQ1IsQ0FBQyxDQUFDLElBQU87OztHQUNWLHNCQUFNO0dBQ04sNkJBQ1csbUJBQUE7VUFtUko7V0FuUkwsU0FtUks7Ozs7RUFoUlAsUUFBTSxZQUFVLElBQ0MsS0FBQTs7R0FBaEIsb0JBQU07R0FDTixzQkFDUSxlQUFBOzRCQUFHLENB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a0JBQUEsTUFDSztVQWNYOzBCQUFBLE1BZEk7R0FBQTs7O0VBRVgsK0JBQUssS0FBSSxRQUNNLEtBQUE7O1NBQWQsUUFBQTtHQUNBLG9CQUNDO0dBRUQsc0JBQ1EsZUFBQTtHQUNSLHNCQUNLLEtBQUE7O2tCQUFEO2tCQUNELENBQUUsU0FBUTs7O0dBRWIsNkJBQVksa0JBQUEsU0FDTTtVQUFaOzZCQUFBLE1BQUs7R0FBQTs7O0VBR1osMkJBQUksS0FBSSxRQUNNLEtBQUE7O1NBQWIsUUFBQTtHQUNBLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtHQUNSLHNCQUNLLEtBQUE7O2tCQUFEO2tCQUNELENBQUUsV0FBVTs7Ozs7RUFFaEIsK0JBQUssS0FBSSxRQUNNLEtBQUE7O1NBQWQsUUFBQTtHQUNBLG9CQUNDO0dBRUQsc0JBQ1EsZUFBQTtHQUNSLHNCQUNLLEtBQUE7O2tCQUFEO2tCQUNELENBQUUsV0FBVTs7Ozs7RUF6WGpCLHdCQUFBO2tCQTBCQSIsImZpbGUiOiJhdC9hdC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9