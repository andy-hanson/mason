"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../compare","./../Function","./../js","./../math/methods","./../to-string","./../String","./../Type/Method","./../Type/Pred-Type","./../Type/Type","./../control","./q","./Seq/Seq","./Seq/Stream","./Set/Set"],(exports,compare_0,Function_1,js_2,methods_3,to_45string_4,String_5,Method_6,Pred_45Type_7,Type_8,control_9,_63_10,Seq_11,Stream_12,Set_13)=>{
	exports._get=_ms.lazy(()=>{
		const _$1=_ms.getModule(compare_0),_61_63=_ms.get(_$1,"=?"),_$2=_ms.getModule(Function_1),Action=_ms.get(_$2,"Action"),identity=_ms.get(_$2,"identity"),Pred=_ms.get(_$2,"Pred"),_$3=_ms.getModule(js_2),defined_63=_ms.get(_$3,"defined?"),id_61_63=_ms.get(_$3,"id=?"),_$4=_ms.getModule(methods_3),_43=_ms.get(_$4,"+"),to_45string=_ms.getDefaultExport(to_45string_4),_$5=_ms.getModule(to_45string_4),inspect=_ms.get(_$5,"inspect"),_$6=_ms.getModule(String_5),indent=_ms.get(_$6,"indent"),Method=_ms.getDefaultExport(Method_6),_$7=_ms.getModule(Pred_45Type_7),Any=_ms.get(_$7,"Any"),Opt=_ms.get(_$7,"Opt"),_$8=_ms.getModule(Type_8),_61_62=_ms.get(_$8,"=>"),contains_63=_ms.get(_$8,"contains?"),type_45of=_ms.get(_$8,"type-of"),_$9=_ms.lazyGetModule(control_9),opr=_ms.lazyProp(_$9,"opr"),_$10=_ms.lazyGetModule(_63_10),Opt_45_62_63=_ms.lazyProp(_$10,"Opt->?"),_$11=_ms.lazyGetModule(Seq_11),_43_62_33=_ms.lazyProp(_$11,"+>!"),_43_43_62_33=_ms.lazyProp(_$11,"++>!"),first=_ms.lazyProp(_$11,"first"),seq_61_63=_ms.lazyProp(_$11,"seq=?"),_64tail=_ms.lazyProp(_$11,"@tail"),Stream=_ms.lazy(()=>_ms.getDefaultExport(Stream_12)),Set=_ms.lazy(()=>_ms.getDefaultExport(Set_13));
		const _64=exports.default=_ms.kind("@",[],{},{
			[_ms.symbol(contains_63)](em){
				const _this=this;
				_ms.checkContains(Any,em,"em");
				return any_63(_this,em_45compare=>{
					return _61_63(em,em_45compare)
				})
			},
			[_ms.symbol(_61_63)](_64other){
				const _this=this;
				return (id_61_63(type_45of(_this),type_45of(_64other))&&_ms.unlazy(seq_61_63)(_this,_64other))
			},
			[_ms.symbol(to_45string)](){
				const _this=this;
				return do_45inspect(_this,to_45string)
			},
			[_ms.symbol(inspect)](){
				const _this=this;
				return do_45inspect(_this,inspect)
			}
		});
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
		const iterator=exports.iterator=new (Method)((()=>{
			const built={};
			built.name="iterator";
			const args=built.args=[];
			const impl_45symbol=built["impl-symbol"]=Symbol.iterator;
			return built
		})());
		const empty_63=exports["empty?"]=_ms.method("empty?",[],function(){
			const _this=this;
			return iterator(_this).next().done
		});
		const each_33=exports["each!"]=function each_33(_,do_45for_45each_33){
			_ms.checkContains(_64,_,"_");
			_ms.checkContains(Action,do_45for_45each_33,"do-for-each!");
			for(let elem of _){
				do_45for_45each_33(elem)
			}
		};
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
					const rest=built.rest=_ms.unlazy(_64tail)(_);
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
		const count=exports.count=_ms.method("count",[],function(){
			const _this=this;
			return fold(_this,0,_ms.sub(_43,1))
		});
		const _64keep=exports["@keep"]=_ms.method("@keep",[["keep-if?",Pred]],function(keep_45if_63){
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
		});
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
		const _64flat_45map=exports["@flat-map"]=_ms.method("@flat-map",[["mapper",_ms.sub(Function,Any,_64)]],function(mapper){
			const _this=this;
			_ms.checkContains(_ms.sub(Function,Any,_64),mapper,"mapper");
			return _61_62(type_45of(_this),(()=>{
				const built=[];
				for(let _ of _this){
					_ms.addMany(built,mapper(_))
				};
				return built
			})())
		});
		const _64flat_45map_126=exports["@flat-map~"]=function _64flat_45map_126(mapped,mapper){
			_ms.checkContains(_64,mapped,"mapped");
			_ms.checkContains(_ms.sub(Function,Any,_64),mapper,"mapper");
			return new (_ms.unlazy(Stream))(function*(){
				for(let _ of mapped){
					(yield* iterator(mapper(_)))
				}
			})
		};
		const _64flatten=exports["@flatten"]=_ms.method("@flatten",[],function(){
			const _this=this;
			return _61_62(type_45of(_this),(()=>{
				const built=[];
				for(let _ of _this){
					_ms.addMany(built,_)
				};
				return built
			})())
		});
		const _64flatten_126=exports["@flatten~"]=function _64flatten_126(flattened){
			return new (_ms.unlazy(Stream))(function*(){
				for(let _ of flattened){
					(yield* iterator(_))
				}
			})
		};
		const _43_43=exports["++"]=_ms.method("++",[["@other",_64]],function(_64other){
			const _this=this;
			_ms.checkContains(_64,_64other,"@other");
			return _61_62(type_45of(_this),(()=>{
				const built=[];
				_ms.addMany(built,_this);
				_ms.addMany(built,_64other);
				return built
			})())
		});
		const _43_43_126=exports["++~"]=function _43_43_126(_64a,_64b){
			return _ms.checkContains(_ms.unlazy(Stream),new (_ms.unlazy(Stream))(function*(){
				(yield* iterator(_64a));
				(yield* iterator(_64b))
			}),"returned value")
		};
		const _45_45=exports["--"]=_ms.method("--",[["@remove",_64]],function(_64remove){
			const _this=this;
			_ms.checkContains(_64,_64remove,"@remove");
			return _61_62(type_45of(_this),_45_45_126(_this,_64remove))
		});
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
			}),"returned value")
		};
		const empty_33=exports["empty!"]=_ms.method("empty!",[]);
		const _43_33=exports["+!"]=_ms.method("+!",["added"],function(added){
			const _this=this;
			_ms.unlazy(_43_62_33)(_this,added)
		});
		const _43_43_33=exports["++!"]=_ms.method("++!",[["@added",_64]],function(_64added){
			const _this=this;
			_ms.checkContains(_64,_64added,"@added");
			_ms.unlazy(_43_43_62_33)(_this,_64added)
		});
		const _45_33=exports["-!"]=_ms.method("-!",[["@removed",_64]]);
		const _45_45_33=exports["--!"]=_ms.method("--!",[["@removed",_64]]);
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9ALm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBaUJBO2VBS0MsY0FBVztVQWtNTDtzQkFsTVE7V0FFYixPQWdNSyxNQWhNTTtZQUNWLE9BQUcsR0FBRztJQUFBO0dBQUE7ZUFFUixTQUFJO1VBNkxFO1dBNUxMLENBQUssU0FBTSxVQTRMTixPQTVMcUIsVUFBUSxrQ0E0TDdCLE1BNUxrRDtHQUFBO2VBRXhEO1VBMExNO1dBekxMLGFBeUxLLE1BekxXO0dBQUE7ZUFDakI7VUF3TE07V0F2TEwsYUF1TEssTUF2TFc7R0FBQTtFQUFBO0VBRWxCLG1CQUFjLHNCQUFBLEVBQUU7VUFFWDtJQUFILEdBQUEsU0FBTyxHQUNDO1lBQU4sU0FBTztXQUVMO0tBQUgsY0FDUyxLQUFBO01BQ1IsaUJBQVcsT0FBRyxNQUFXOztlQUFBLE1BQU0sRUFDQztzQkFBN0IsT0FBUSxRQUFRO09BQUE7OzthQUNsQixTQUFPLGdCQUFlOztZQUN2QixHQUFDLHFCQUFvQjs7OztFQUV6QixnQ0FBVSxLQUFJLFFBQ00sS0FBQTs7Y0FDbkI7R0FDQSxzQkFBTTtHQUNOLHlDQUFhOzs7RUFFZCx3REFDZ0I7U0FrS1Q7VUFqS0wsU0FpS0s7O0VBOUpOLCtCQUFTLGlCQUFBLEVBQUk7cUJBQUY7cUJBQWU7R0FNckIsUUFBQSxRQUFRLEVBQ0M7SUFBWixtQkFBYTtHQUFBO0VBQUE7RUFFZix3QkFBTyxjQUFBLEVBQUksRUFBRTtxQkFBSjtHQUlSLFVBQ3dCO0lBQXZCLEdBQUEsV0FBUyxHQUNDOztLQUFULHdCQUFPO0tBQ1AsMEJBQVE7S0FDUixzQkFBTTs7V0FFSDs7S0FBSCwwQ0FBTztLQUNQLDBCQUFRO0tBQ1IsMENBQU07Ozs7R0FFUixRQUFRO0dBQ0osUUFBQSxLQUFBLEtBQ0k7UUFBQSxPQUFPLElBQUk7R0FBQTtVQUNuQjtFQUFBO0VBRUQsNkJBQU8sZ0JBQUEsRUFBSTtxQkFBRjs2QkFBUSxJQUFJOzJCQUVQLFFB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
