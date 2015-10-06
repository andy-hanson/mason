"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../compare","../Function","../js","../math/methods","../to-string","../String","../Type/Method","../Type/Kind","../Type/Method","../Type/Pred-Type","../Type/Type","../control","./q","./Seq/Seq","./Seq/Stream","./Set/Set","../math/Number","../Try","./at-Type","./q","./Map/Weak-Id-Map","./Seq/Deque"],(exports,compare_0,Function_1,js_2,methods_3,to_45string_4,String_5,Method_6,Kind_7,Method_8,Pred_45Type_9,Type_10,control_11,_63_12,Seq_13,Stream_14,Set_15,Number_16,Try_17,_64_45Type_18,_63_19,Weak_45Id_45Map_20,Deque_21)=>{
	exports._get=_ms.lazy(()=>{
		const _$1=_ms.getModule(compare_0),_61_63=_ms.get(_$1,"=?"),_$2=_ms.getModule(Function_1),identity=_ms.get(_$2,"identity"),Pred=_ms.get(_$2,"Pred"),_$3=_ms.getModule(js_2),defined_63=_ms.get(_$3,"defined?"),id_61_63=_ms.get(_$3,"id=?"),_$4=_ms.getModule(methods_3),_43=_ms.get(_$4,"+"),to_45string=_ms.getDefaultExport(to_45string_4),_$5=_ms.getModule(to_45string_4),inspect=_ms.get(_$5,"inspect"),_$6=_ms.getModule(String_5),indent=_ms.get(_$6,"indent"),Method=_ms.getDefaultExport(Method_6),Kind=_ms.getDefaultExport(Kind_7),_$7=_ms.getModule(Method_8),impl_33=_ms.get(_$7,"impl!"),_$8=_ms.getModule(Pred_45Type_9),Any=_ms.get(_$8,"Any"),Opt=_ms.get(_$8,"Opt"),_$9=_ms.getModule(Type_10),_61_62=_ms.get(_$9,"=>"),contains_63=_ms.get(_$9,"contains?"),type_45of=_ms.get(_$9,"type-of"),_$10=_ms.lazyGetModule(control_11),opr=_ms.lazyProp(_$10,"opr"),_$11=_ms.lazyGetModule(_63_12),Opt_45_62_63=_ms.lazyProp(_$11,"Opt->?"),_$12=_ms.lazyGetModule(Seq_13),_43_62_33=_ms.lazyProp(_$12,"+>!"),_43_43_62_33=_ms.lazyProp(_$12,"++>!"),first=_ms.lazyProp(_$12,"first"),seq_61_63=_ms.lazyProp(_$12,"seq=?"),tail=_ms.lazyProp(_$12,"tail"),Stream=_ms.lazy(()=>_ms.getDefaultExport(Stream_14)),Set=_ms.lazy(()=>_ms.getDefaultExport(Set_15)),_$13=_ms.lazyGetModule(Number_16),divisible_63=_ms.lazyProp(_$13,"divisible?"),_$14=_ms.lazyGetModule(Try_17),fails_63=_ms.lazyProp(_$14,"fails?"),_$15=_ms.lazyGetModule(_64_45Type_18),empty=_ms.lazyProp(_$15,"empty"),_$16=_ms.lazyGetModule(_63_19),_63None=_ms.lazyProp(_$16,"?None"),_63some=_ms.lazyProp(_$16,"?some"),Weak_45Id_45Map=_ms.lazy(()=>_ms.getDefaultExport(Weak_45Id_45Map_20)),Deque=_ms.lazy(()=>_ms.getDefaultExport(Deque_21));
		const _64=exports.default=new (Kind)((()=>{
			const built={};
			built[`name`]="@";
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
			const args=built.args=1;
			const impl_45symbol=built["impl-symbol"]=Symbol.iterator;
			return built
		})());
		const empty_63=exports["empty?"]=new (Method)((()=>{
			const built={};
			built[`name`]="empty?";
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
		const _64keep=exports["@keep"]=new (Method)((()=>{
			const built={};
			built[`name`]="@keep";
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
		const _64keep_126=exports["@keep~"]=(()=>{
			const built={};
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
		const _64map=exports["@map"]=(()=>{
			const built={};
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
		const _64map_126=exports["@map~"]=(()=>{
			const built={};
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
		const _64flat_45map=exports["@flat-map"]=new (Method)((()=>{
			const built={};
			built[`name`]="@flat-map";
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
		const _64flat_45map_126=exports["@flat-map~"]=(()=>{
			const built={};
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
		const _64flatten=exports["@flatten"]=new (Method)((()=>{
			const built={};
			built[`name`]="@flatten";
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
		const _64flatten_126=exports["@flatten~"]=(()=>{
			const built={};
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[[[1,2],[3],[]]],_61_62(_ms.unlazy(Stream),[1,2,3]));
				_ms.assoc(built,[[[1],[[2]]]],_61_62(_ms.unlazy(Stream),[1,[2]]));
				_ms.assert(_ms.unlazy(fails_63),()=>{
					return _61_62(Array,_64flatten_126([[1],2,[3]]))
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
			const args=built.args=1;
			return built
		})());
		const _43_33=exports["+!"]=new (Method)((()=>{
			const built={};
			built[`name`]="+!";
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
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9ALm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBMEJBLDBCQUFHLEtBQUksTUFDSSxLQUFBOztTQUdWLFFBQUE7R0FDQSxtREFBb0IsNEJBQUEsV0FDTTtJQUF6QixLQUFRLE9BQUcsd0NBQ2tCO0tBQzVCLDBCQUFVO2dCQUNGLFNBQU87SUFBQTtHQUFBOzs7RUFHbEIsbUJBQWMsc0JBQUEsRUFBRSxRQUNPO1VBQ2xCO0lBQUgsR0FBQSxTQUFPLEdBQ0M7WUFBTixTQUFPO1dBRUw7S0FBSCxjQUNTLEtBQUE7TUFDUixpQkFBVyxPQStNUixNQS9Nc0I7O2VBQUEsTUFBTSxFQUNDO3NCQUEvQixPQUFRLFFBQVE7T0FBQTs7O2FBQ2hCLFNBQU8sZ0JBQWU7O1lBQ3ZCLEdBQUMscUJBQW9COzs7O0VBRXpCLFFBQU0sWUFBVSxJQUNDLEtBQUE7O0dBQWhCLHNCQUNPLGVBQUE7O0lBQU4sUUFBSSx5QkFBUyxDQUFDLEVBQUUsRUFBRTtvQkFDbEIsQ0FBQyxHQUNBO29CQUlELHVDQUFvQjs7O2tCQUVuQixVQUFBO1VBa1NLO1dBbFNOLGFBa1NNLE1BbFNVO0dBQUE7O0VBRWxCLFFBQU0sUUFBUSxJQUNJLFVBQUE7U0ErUlY7VUEvUlAsYUErUk8sTUEvUlM7RUFBQTtFQUVqQixnQ0FBVSxLQUFJLFFBQ00sS0FBQTs7U0FDbkIsUUFBQTtHQUNBLHNCQUFNO0dBQ04seUNBQWE7OztFQUVkLGlDQUFRLEtBQUksUUFDTSxLQUFBOztTQUNqQixRQUFBO0dBQ0Esc0JBQ08sZUFBQTs7b0JBQU4sQ0FBQyxJQUFPO29CQUNSLENBQUMsQ0FBQyxJQUFPOzs7R0FDVixzQkFBTTtHQUNOLDZCQUNXLG1CQUFBO1VBK1FKO1dBL1FMLFNBK1FLOzs7O0VBNVFQLFFBQU0sWUFBVSxJQUNDLEtBQUE7O0dBQ2hCLHNCQUNRLGVBQUE7NEJBQUcsQ0FBQyxHQUFIOytCQUNFLENBQUMsR0FBSDtHQUFBO2tCQUNQLFNBQUEs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RDtrQkFDRCxDQUFFLFVBQVM7OztHQUNkLDZCQUFXLGtCQUFBLFVBQ087VUFzRFo7V0F0REwsT0FBSSxVQXNEQyxPQXREYyxXQXNEZCxNQXREdUI7R0FBQTs7O0VBRTlCLGdDQUNJLEtBQUE7O0dBQ0gsc0JBQ08sZUFBQTs7b0JBQU4sQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsSUFBTywwQkFBVSxDQUFDLEVBQUU7OztrQkFDOUIsQ0FBRyxrQkFBYyxZQUNTO3NCQUREOzZCQUF4QixJQUVELHlCQUNjLFdBQUE7S0FBYiw0QkFBb0IsdUJBQU87S0FDdEIsUUFBQSxLQUFBLGtCQUNhO01BQ1osZ0JBQUgsc0JBQUQsR0FDa0I7T0FDakIsVUFBSSxzQkFBa0IsQ0FBQztNQUFBLE9BRXBCO2NBQUE7TUFBQTtLQUFBO0lBQUE7OztFQUVULFFBQU0sT0FBRyxJQUNDLEtBQUE7O0dBQVQsc0JBQ1EsZUFBQTtlQUFDLE9BQUcsQ0FBQyxHQUFHLENBQUM7R0FBQTtrQkFDZixTQUFBLFNBQ007VUFnQ0Y7V0FoQ0wsQ0FBSyxTQUFNLFVBZ0NOLE9BaENxQixVQUFRLGtDQWdDN0IsTUFoQ2tEO0dBQUE7O0VBR3pELGlDQUFRLEtBQUksUUFDTSxLQUFBOztTQUNqQixRQUFBO0dBQ0Esc0JBQU07OztFQUdQLDJCQUFJLEtBQUksUUFDTSxLQUFBOztTQUNiLFFBQUE7R0FDQSxzQkFDUSxlQUFBO0dBQ1Isc0JBQ0ssS0FBQTs7a0JBQUQ7a0JBQ0E7OztHQUVKLDZCQUFZLGtCQUFBLE1BQ0s7VUFhWDswQkFBQSxNQWJJO0dBQUE7OztFQUVYLCtCQUFLLEtBQUksUUFDTSxLQUFBOztTQUVkLFFBQUE7R0FDQSxzQkFDUSxlQUFBO0dBQ1Isc0JBQ0ssS0FBQTs7a0JBQUQ7a0JBQ0QsQ0FBRSxTQUFROzs7R0FFYiw2QkFBWSxrQkFBQSxTQUNNO1VBQVo7NkJBQUEsTUFBSztHQUFBOzs7RUFHWiwyQkFBSSxLQUFJLFFBQ00sS0FBQTs7U0FDYixRQUFBO0dBQ0Esc0JBQ1EsZUFBQTtHQUNSLHNCQUNLLEtBQUE7O2tCQUFEO2tCQUNELENBQUUsV0FBVTs7Ozs7RUFFaEIsK0JBQUssS0FBSSxRQUNNLEtBQUE7O1NBRWQsUUFBQTtHQUNBLHNCQUNRLGVBQUE7R0FDUixzQkFDSyxLQUFBOztrQkFBRDtrQkFDRCxDQUFFLFdBQVU7Ozs7O0VBbFhqQix3QkFBQSIsImZpbGUiOiJhdC9hdC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9