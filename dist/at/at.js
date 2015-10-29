"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../compare","./../Function","./../js","./../math/methods","./../to-string","./../String","./../Type/Method","./../Type/Kind","./../Type/Method","./../Type/Pred-Type","./../Type/Type","./../control","./q","./Seq/Seq","./Seq/Stream","./Set/Set"],(exports,compare_0,Function_1,js_2,methods_3,to_45string_4,String_5,Method_6,Kind_7,Method_8,Pred_45Type_9,Type_10,control_11,_63_12,Seq_13,Stream_14,Set_15)=>{
	exports._get=_ms.lazy(()=>{
		const _$1=_ms.getModule(compare_0),_61_63=_ms.get(_$1,"=?"),_$2=_ms.getModule(Function_1),Action=_ms.get(_$2,"Action"),identity=_ms.get(_$2,"identity"),Pred=_ms.get(_$2,"Pred"),_$3=_ms.getModule(js_2),defined_63=_ms.get(_$3,"defined?"),id_61_63=_ms.get(_$3,"id=?"),_$4=_ms.getModule(methods_3),_43=_ms.get(_$4,"+"),to_45string=_ms.getDefaultExport(to_45string_4),_$5=_ms.getModule(to_45string_4),inspect=_ms.get(_$5,"inspect"),_$6=_ms.getModule(String_5),indent=_ms.get(_$6,"indent"),Method=_ms.getDefaultExport(Method_6),Kind=_ms.getDefaultExport(Kind_7),_$7=_ms.getModule(Method_8),impl_33=_ms.get(_$7,"impl!"),_$8=_ms.getModule(Pred_45Type_9),Any=_ms.get(_$8,"Any"),Opt=_ms.get(_$8,"Opt"),_$9=_ms.getModule(Type_10),_61_62=_ms.get(_$9,"=>"),contains_63=_ms.get(_$9,"contains?"),type_45of=_ms.get(_$9,"type-of"),_$10=_ms.lazyGetModule(control_11),opr=_ms.lazyProp(_$10,"opr"),_$11=_ms.lazyGetModule(_63_12),Opt_45_62_63=_ms.lazyProp(_$11,"Opt->?"),_$12=_ms.lazyGetModule(Seq_13),_43_62_33=_ms.lazyProp(_$12,"+>!"),_43_43_62_33=_ms.lazyProp(_$12,"++>!"),first=_ms.lazyProp(_$12,"first"),seq_61_63=_ms.lazyProp(_$12,"seq=?"),_64tail=_ms.lazyProp(_$12,"@tail"),Stream=_ms.lazy(()=>_ms.getDefaultExport(Stream_14)),Set=_ms.lazy(()=>_ms.getDefaultExport(Set_15));
		const _64=exports.default=new (Kind)((()=>{
			const built={};
			built.name="@";
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
			built.name="iterator";
			const args=built.args=1;
			const impl_45symbol=built["impl-symbol"]=Symbol.iterator;
			return built
		})());
		const empty_63=exports["empty?"]=new (Method)((()=>{
			const built={};
			built.name="empty?";
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
		const count=exports.count=new (Method)((()=>{
			const built={};
			built.name="count";
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				return fold(_this,0,_ms.sub(_43,1))
			};
			return built
		})());
		const _64keep=exports["@keep"]=new (Method)((()=>{
			const built={};
			built.name="@keep";
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
			built.name="@flat-map";
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
			built.name="@flatten";
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
			built.name="++";
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,["@a",_64]);
				_ms.add(built,["@b",_64]);
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
			}),"returned value")
		};
		const _45_45=exports["--"]=new (Method)((()=>{
			const built={};
			built.name="--";
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,"_");
				_ms.add(built,["@remove",_64]);
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
			}),"returned value")
		};
		impl_33(_61_63,_64,function(_64other){
			const _this=this;
			return (id_61_63(type_45of(_this),type_45of(_64other))&&_ms.unlazy(seq_61_63)(_this,_64other))
		});
		const empty_33=exports["empty!"]=new (Method)((()=>{
			const built={};
			built.name="empty!";
			const args=built.args=1;
			return built
		})());
		const _43_33=exports["+!"]=new (Method)((()=>{
			const built={};
			built.name="+!";
			const args=built.args=["_","added"];
			const _default=built.default=function _default(added){
				const _this=this;
				_ms.unlazy(_43_62_33)(_this,added)
			};
			return built
		})());
		const _43_43_33=exports["++!"]=new (Method)((()=>{
			const built={};
			built.name="++!";
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,"_");
				_ms.add(built,["@added",_64]);
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
			built.name="-!";
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,"_");
				_ms.add(built,["@removed",_64]);
				return built
			})();
			return built
		})());
		const _45_45_33=exports["--!"]=new (Method)((()=>{
			const built={};
			built.name="--!";
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,"_");
				_ms.add(built,["@removed",_64]);
				return built
			})();
			return built
		})());
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9ALm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBbUJBLDBCQUFHLEtBQUksTUFDSSxLQUFBOztjQUdWOzs7RUFFRCxtQkFBYyxzQkFBQSxFQUFFO1VBRVg7SUFBSCxHQUFBLFNBQU8sR0FDQztZQUFOLFNBQU87V0FFTDtLQUFILGNBQ1MsS0FBQTtNQUNSLGlCQUFXLE9BQUcsTUFBVzs7ZUFBQSxNQUFNLEVBQ0M7c0JBQS9CLE9BQVEsUUFBUTtPQUFBOzs7YUFDaEIsU0FBTyxnQkFBZTs7WUFDdkIsR0FBQyxxQkFBb0I7Ozs7RUFFekIsUUFBTSxZQUFVLElBQ0k7U0E0Tlo7VUE1TlAsYUE0Tk8sTUE1TlM7RUFBQTtFQUVqQixRQUFNLFFBQVEsSUFDSTtTQXlOVjtVQXpOUCxhQXlOTyxNQXpOUztFQUFBO0VBRWpCLGdDQUFVLEtBQUksUUFDTSxLQUFBOztjQUNuQjtHQUNBLHNCQUFNO0dBQ04seUNBQWE7OztFQUVkLGlDQUFRLEtBQUksUUFDTSxLQUFBOztjQUNqQjtHQUNBLHNCQUFNO0dBQ04sNkJBQ1c7VUE0TUo7V0E1TUwsU0E0TUs7Ozs7RUF6TVAsUUFBTSxZQUFVLElBQUksU0FBQTtTQXlNYjtxQkF6TWdCO1VBRXRCLE9BdU1NLE1Bdk1LO1dBQ1YsT0FBRyxHQUFHO0dBQUE7RUFBQTtFQUVSLCtCQUFTLGlCQUFBLEVBQUk7cUJBQUY7cUJBQWU7R0FNcEIsUUFBQSxRQUFRLEVBQ0M7SUFBYixtQkFBYTtHQUFBO0VBQUE7RUFFZix3QkFBTyxjQUFBLEVBQUksRUFBRTtxQkFBSjtHQUlSLFVBQ3dCO0lBQXZCLEdBQUEsV0FBUyxHQUNDOztLQUFULHdCQUFPO0tBQ1AsMEJBQVE7S0FDUixzQkFBTTs7V0FFSDs7S0FBSCwwQ0FBTztLQUNQLDBCQUFRO0tBQ1IsMENBQU07Ozs7R0FFUixRQUFRO0dBQ0gsUUFBQSxLQUFBLEtBQ0k7UUFBRCxPQUFPLElBQUk7R0FBQTtVQUNuQjtFQUFBO0VB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
