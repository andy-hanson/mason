"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../compare","../Function","../js","../math/methods","../to-string","../String","../Type/Method","../Type/Kind","../Type/Method","../Type/Pred-Type","../Type/Type","../control","./q","./Seq/Seq","./Seq/Stream","./Set/Set"],(exports,compare_0,Function_1,js_2,methods_3,to_45string_4,String_5,Method_6,Kind_7,Method_8,Pred_45Type_9,Type_10,control_11,_63_12,Seq_13,Stream_14,Set_15)=>{
	exports._get=_ms.lazy(()=>{
		const _$1=_ms.getModule(compare_0),_61_63=_ms.get(_$1,"=?"),_$2=_ms.getModule(Function_1),identity=_ms.get(_$2,"identity"),Pred=_ms.get(_$2,"Pred"),_$3=_ms.getModule(js_2),defined_63=_ms.get(_$3,"defined?"),id_61_63=_ms.get(_$3,"id=?"),_$4=_ms.getModule(methods_3),_43=_ms.get(_$4,"+"),to_45string=_ms.getDefaultExport(to_45string_4),_$5=_ms.getModule(to_45string_4),inspect=_ms.get(_$5,"inspect"),_$6=_ms.getModule(String_5),indent=_ms.get(_$6,"indent"),Method=_ms.getDefaultExport(Method_6),Kind=_ms.getDefaultExport(Kind_7),_$7=_ms.getModule(Method_8),impl_33=_ms.get(_$7,"impl!"),_$8=_ms.getModule(Pred_45Type_9),Any=_ms.get(_$8,"Any"),Opt=_ms.get(_$8,"Opt"),_$9=_ms.getModule(Type_10),_61_62=_ms.get(_$9,"=>"),contains_63=_ms.get(_$9,"contains?"),type_45of=_ms.get(_$9,"type-of"),_$10=_ms.lazyGetModule(control_11),opr=_ms.lazyProp(_$10,"opr"),_$11=_ms.lazyGetModule(_63_12),Opt_45_62_63=_ms.lazyProp(_$11,"Opt->?"),_$12=_ms.lazyGetModule(Seq_13),_43_62_33=_ms.lazyProp(_$12,"+>!"),_43_43_62_33=_ms.lazyProp(_$12,"++>!"),first=_ms.lazyProp(_$12,"first"),seq_61_63=_ms.lazyProp(_$12,"seq=?"),tail=_ms.lazyProp(_$12,"tail"),Stream=_ms.lazy(()=>_ms.getDefaultExport(Stream_14)),Set=_ms.lazy(()=>_ms.getDefaultExport(Set_15));
		const _64=exports.default=new (Kind)((()=>{
			const built={};
			built[`name`]="@";
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
		impl_33(to_45string,_64,function(){
			const _this=this;
			return do_45inspect(_this,to_45string)
		});
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
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				return iterator(_this).next().done
			};
			return built
		})());
		impl_33(contains_63,_64,function(em){
			const _this=this;
			_ms.checkContains(Any,em,"em");
			return any_63(_this,em_45compare=>{
				return _61_63(em,em_45compare)
			})
		});
		const fold=exports.fold=function fold(_,b,c){
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
		};
		const any_63=exports["any?"]=function any_63(_,pred_63){
			_ms.checkContains(_64,_,"_");
			_ms.checkContains(_ms.sub(Opt,Pred),pred_63,"pred?");
			pred_63=_ms.unlazy(opr)(pred_63,identity);
			return ! empty_63(_63find(_,pred_63))
		};
		const all_63=exports["all?"]=function all_63(_,pred_63){
			_ms.checkContains(_64,_,"_");
			_ms.checkContains(_ms.sub(Opt,Pred),pred_63,"pred?");
			pred_63=_ms.unlazy(opr)(pred_63,identity);
			return empty_63(_63find(_,em=>{
				return ! pred_63(em)
			}))
		};
		const _63find=exports["?find"]=function _63find(_,pred_63){
			_ms.checkContains(Pred,pred_63,"pred?");
			return _ms.unlazy(Opt_45_62_63)((()=>{
				for(let elem of _){
					if(pred_63(elem)){
						return elem
					}
				}
			})())
		};
		const count=exports.count=new (Method)((()=>{
			const built={};
			built[`name`]="count";
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
		const _64keep_126=exports["@keep~"]=function _64keep_126(filtered,keep_45if_63){
			_ms.checkContains(_64,filtered,"filtered");
			_ms.checkContains(Pred,keep_45if_63,"keep-if?");
			return new (_ms.unlazy(Stream))(function*(){
				for(let _ of filtered){
					if(keep_45if_63(_)){
						(yield _)
					}
				}
			})
		};
		const _64map=exports["@map"]=function _64map(_,mapper){
			_ms.checkContains(_64,_,"_");
			_ms.checkContains(Function,mapper,"mapper");
			return _61_62(type_45of(_),(()=>{
				const built=[];
				for(let elem of _){
					_ms.add(built,mapper(elem))
				};
				return built
			})())
		};
		const _64map_126=exports["@map~"]=function _64map_126(mapped,mapper){
			_ms.checkContains(_64,mapped,"mapped");
			_ms.checkContains(Function,mapper,"mapper");
			return new (_ms.unlazy(Stream))(function*(){
				for(let _ of mapped){
					(yield mapper(_))
				}
			})
		};
		const _64flat_45map=exports["@flat-map"]=new (Method)((()=>{
			const built={};
			built[`name`]="@flat-map";
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
		const _64flat_45map_126=exports["@flat-map~"]=function _64flat_45map_126(mapped,mapper){
			_ms.checkContains(_64,mapped,"mapped");
			_ms.checkContains(_ms.sub(Function,Any,_64),mapper,"mapper");
			return new (_ms.unlazy(Stream))(function*(){
				for(let _ of mapped){
					(yield* iterator(mapper(_)))
				}
			})
		};
		const _64flatten=exports["@flatten"]=new (Method)((()=>{
			const built={};
			built[`name`]="@flatten";
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
		const _64flatten_126=exports["@flatten~"]=function _64flatten_126(flattened){
			return new (_ms.unlazy(Stream))(function*(){
				for(let _ of flattened){
					(yield* iterator(_))
				}
			})
		};
		const _43_43=exports["++"]=new (Method)((()=>{
			const built={};
			built[`name`]="++";
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
		const _43_43_126=exports["++~"]=function _43_43_126(_64a,_64b){
			return _ms.checkContains(_ms.unlazy(Stream),new (_ms.unlazy(Stream))(function*(){
				(yield* iterator(_64a));
				(yield* iterator(_64b))
			}),"res")
		};
		const _45_45=exports["--"]=new (Method)((()=>{
			const built={};
			built[`name`]="--";
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
		const _45_45_126=exports["--~"]=function _45_45_126(_64removed_45from,_64remove){
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
		};
		impl_33(_61_63,_64,function(_64other){
			const _this=this;
			return (id_61_63(type_45of(_this),type_45of(_64other))&&_ms.unlazy(seq_61_63)(_this,_64other))
		});
		const empty_33=exports["empty!"]=new (Method)((()=>{
			const built={};
			built[`name`]="empty!";
			const args=built.args=1;
			return built
		})());
		const _43_33=exports["+!"]=new (Method)((()=>{
			const built={};
			built[`name`]="+!";
			const args=built.args=[`_`,`added`];
			const _default=built.default=function _default(added){
				const _this=this;
				_ms.unlazy(_43_62_33)(_this,added)
			};
			return built
		})());
		const _43_43_33=exports["++!"]=new (Method)((()=>{
			const built={};
			built[`name`]="++!";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9ALm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBbUJBLDBCQUFHLEtBQUksTUFDSSxLQUFBOztTQUdWLFFBQUE7OztFQUVELG1CQUFjLHNCQUFBLEVBQUUsUUFDTztVQUNsQjtJQUFILEdBQUEsU0FBTyxHQUNDO1lBQU4sU0FBTztXQUVMO0tBQUgsY0FDUyxLQUFBO01BQ1IsaUJBQVcsT0FBRyxNQUFXOztlQUFBLE1BQU0sRUFDQztzQkFBL0IsT0FBUSxRQUFRO09BQUE7OzthQUNoQixTQUFPLGdCQUFlOztZQUN2QixHQUFDLHFCQUFvQjs7OztFQUV6QixRQUFNLFlBQVUsSUFDSSxVQUFBO1NBbU5aO1VBbk5QLGFBbU5PLE1Bbk5TO0VBQUE7RUFFakIsUUFBTSxRQUFRLElBQ0ksVUFBQTtTQWdOVjtVQWhOUCxhQWdOTyxNQWhOUztFQUFBO0VBRWpCLGdDQUFVLEtBQUksUUFDTSxLQUFBOztTQUNuQixRQUFBO0dBQ0Esc0JBQU07R0FDTix5Q0FBYTs7O0VBRWQsaUNBQVEsS0FBSSxRQUNNLEtBQUE7O1NBQ2pCLFFBQUE7R0FDQSxzQkFBTTtHQUNOLDZCQUNXLG1CQUFBO1VBbU1KO1dBbk1MLFNBbU1LOzs7O0VBaE1QLFFBQU0sWUFBVSxJQUFJLFNBQUEsR0FDTTtTQStMbkI7cUJBaE1nQjtVQUV0QixPQThMTSxNQTlMSyxjQUNVO1dBQXBCLE9BQUcsR0FBRztHQUFBO0VBQUE7RUFFUix3QkFBTyxjQUFBLEVBQUksRUFBRSxFQUNDO3FCQURMO0dBSVIsVUFDd0I7SUFBdkIsR0FBQSxXQUFTLEdBQ0M7O0tBQVQsd0JBQU87S0FDUCwwQkFBUTtLQUNSLHNCQUFNOztXQUVIOztLQUFILDBDQUFPO0tBQ1AsMEJBQVE7S0FDUix1Q0FBTTs7OztHQUVSLFFBQVE7R0FDSCxRQUFBLEtBQUEsS0FDSTtRQUFELE9BQU8sSUFBSTtHQUFBO1VBQ25CO0VBQUE7RUFFRCw2QkFBTyxnQkFBQSxFQUFJLFFB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
