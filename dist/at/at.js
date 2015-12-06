"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../compare","./../Function","./../js","./../math/methods","./../to-string","./../String","./../Type/Method","./../Type/Pred-Type","./../Type/Type","./../control","./q","./Seq/Seq","./Seq/Stream","./Set/Set"],(exports,compare_0,Function_1,js_2,methods_3,to_45string_4,String_5,Method_6,Pred_45Type_7,Type_8,control_9,_63_10,Seq_11,Stream_12,Set_13)=>{
	exports._get=_ms.lazy(()=>{
		let _$1=_ms.getModule(compare_0),_61_63=_ms.get(_$1,"=?"),_$2=_ms.getModule(Function_1),Action=_ms.get(_$2,"Action"),identity=_ms.get(_$2,"identity"),Pred=_ms.get(_$2,"Pred"),_$3=_ms.getModule(js_2),defined_63=_ms.get(_$3,"defined?"),id_61_63=_ms.get(_$3,"id=?"),_$4=_ms.getModule(methods_3),_43=_ms.get(_$4,"+"),to_45string=_ms.getDefaultExport(to_45string_4),_$5=_ms.getModule(to_45string_4),inspect=_ms.get(_$5,"inspect"),_$6=_ms.getModule(String_5),indent=_ms.get(_$6,"indent"),Method=_ms.getDefaultExport(Method_6),_$7=_ms.getModule(Pred_45Type_7),Any=_ms.get(_$7,"Any"),Opt=_ms.get(_$7,"Opt"),_$8=_ms.getModule(Type_8),_61_62=_ms.get(_$8,"=>"),has_45instance_63=_ms.get(_$8,"has-instance?"),type_45of=_ms.get(_$8,"type-of"),_$9=_ms.lazyGetModule(control_9),opr=_ms.lazyProp(_$9,"opr"),_$10=_ms.lazyGetModule(_63_10),Opt_45_62_63=_ms.lazyProp(_$10,"Opt->?"),_$11=_ms.lazyGetModule(Seq_11),_43_62_33=_ms.lazyProp(_$11,"+>!"),_43_43_62_33=_ms.lazyProp(_$11,"++>!"),first=_ms.lazyProp(_$11,"first"),seq_61_63=_ms.lazyProp(_$11,"seq=?"),_64tail=_ms.lazyProp(_$11,"@tail"),Stream=_ms.lazy(()=>_ms.getDefaultExport(Stream_12)),Set=_ms.lazy(()=>_ms.getDefaultExport(Set_13));
		let _64=exports.default=_ms.kind("@",[],{},{
			[_ms.symbol(has_45instance_63)](em){
				let _this=this;
				_ms.checkInstance(Any,em,"em");
				return any_63(_this,em_45compare=>{
					return _61_63(em,em_45compare)
				})
			},
			[_ms.symbol(_61_63)](_64other){
				let _this=this;
				return (id_61_63(type_45of(_this),type_45of(_64other))&&_ms.unlazy(seq_61_63)(_this,_64other))
			},
			[_ms.symbol(to_45string)](){
				let _this=this;
				return do_45inspect(_this,to_45string)
			},
			[_ms.symbol(inspect)](){
				let _this=this;
				return do_45inspect(_this,inspect)
			}
		});
		let do_45inspect=function do_45inspect(_,recurse){
			return (()=>{
				if(empty_63(_)){
					return `empty ${_.constructor.name}`
				} else {
					let content=(()=>{
						let show_45ems=_61_62(Array,(()=>{
							let built=[];
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
		let iterator=exports.iterator=new (Method)((()=>{
			let built={};
			built.name="iterator";
			let args=built.args=[];
			let impl_45symbol=built["impl-symbol"]=Symbol.iterator;
			return built
		})());
		let empty_63=exports["empty?"]=_ms.method("empty?",[],function(){
			let _this=this;
			return iterator(_this).next().done
		});
		let each_33=exports["each!"]=function each_33(_,do_45for_45each_33){
			_ms.checkInstance(_64,_,"_");
			_ms.checkInstance(Action,do_45for_45each_33,"do-for-each!");
			for(let elem of _){
				do_45for_45each_33(elem)
			}
		};
		let fold=exports.fold=function fold(_,b,c){
			_ms.checkInstance(_64,_,"_");
			let _$0=(()=>{
				if(defined_63(c)){
					let built={};
					let start=built.start=b;
					let folder=built.folder=c;
					let rest=built.rest=_;
					return built
				} else {
					let built={};
					let start=built.start=_ms.unlazy(first)(_);
					let folder=built.folder=b;
					let rest=built.rest=_ms.unlazy(_64tail)(_);
					return built
				}
			})(),start=_$0.start,rest=_$0.rest,folder=_$0.folder;
			let acc=start;
			for(let _ of rest){
				acc=folder(acc,_)
			};
			return acc
		};
		let any_63=exports["any?"]=function any_63(_,pred_63){
			_ms.checkInstance(_64,_,"_");
			_ms.checkInstance(_ms.sub(Opt,Pred),pred_63,"pred?");
			pred_63=_ms.unlazy(opr)(pred_63,identity);
			return ! empty_63(_63find(_,pred_63))
		};
		let all_63=exports["all?"]=function all_63(_,pred_63){
			_ms.checkInstance(_64,_,"_");
			_ms.checkInstance(_ms.sub(Opt,Pred),pred_63,"pred?");
			pred_63=_ms.unlazy(opr)(pred_63,identity);
			return empty_63(_63find(_,em=>{
				return ! pred_63(em)
			}))
		};
		let _63find=exports["?find"]=function _63find(_,pred_63){
			_ms.checkInstance(Pred,pred_63,"pred?");
			return _ms.unlazy(Opt_45_62_63)((()=>{
				for(let elem of _){
					if(pred_63(elem)){
						return elem
					}
				}
			})())
		};
		let count=exports.count=_ms.method("count",[],function(){
			let _this=this;
			return fold(_this,0,_ms.sub(_43,1))
		});
		let _64keep=exports["@keep"]=_ms.method("@keep",[["keep-if?",Pred]],function(keep_45if_63){
			let _this=this;
			_ms.checkInstance(Pred,keep_45if_63,"keep-if?");
			return _61_62(type_45of(_this),(()=>{
				let built=[];
				for(let _ of _this){
					if(keep_45if_63(_)){
						_ms.add(built,_)
					}
				};
				return built
			})())
		});
		let _64keep_126=exports["@keep~"]=function _64keep_126(_64filtered,keep_45if_63){
			_ms.checkInstance(_64,_64filtered,"@filtered");
			_ms.checkInstance(Pred,keep_45if_63,"keep-if?");
			return new (_ms.unlazy(Stream))(function*(){
				for(let _ of _64filtered){
					if(keep_45if_63(_)){
						(yield _)
					}
				}
			})
		};
		let _64toss=exports["@toss"]=function _64toss(_64filtered,toss_45if_63){
			_ms.checkInstance(_64,_64filtered,"@filtered");
			_ms.checkInstance(Pred,toss_45if_63,"toss-if?");
			return _64keep(_64filtered,_=>! toss_45if_63(_))
		};
		let _64toss_126=exports["@toss~"]=function _64toss_126(_64filtered,toss_45if_63){
			_ms.checkInstance(_64,_64filtered,"@filtered");
			_ms.checkInstance(Pred,toss_45if_63,"toss-if?");
			return _64keep_126(_64filtered,_=>! toss_45if_63(_))
		};
		let _64map=exports["@map"]=function _64map(_,mapper){
			_ms.checkInstance(_64,_,"_");
			_ms.checkInstance(Function,mapper,"mapper");
			return _61_62(type_45of(_),(()=>{
				let built=[];
				for(let elem of _){
					_ms.add(built,mapper(elem))
				};
				return built
			})())
		};
		let _64map_126=exports["@map~"]=function _64map_126(mapped,mapper){
			_ms.checkInstance(_64,mapped,"mapped");
			_ms.checkInstance(Function,mapper,"mapper");
			return new (_ms.unlazy(Stream))(function*(){
				for(let _ of mapped){
					(yield mapper(_))
				}
			})
		};
		let _64flat_45map=exports["@flat-map"]=_ms.method("@flat-map",[["mapper",_ms.sub(Function,Any,_64)]],function(mapper){
			let _this=this;
			_ms.checkInstance(_ms.sub(Function,Any,_64),mapper,"mapper");
			return _61_62(type_45of(_this),(()=>{
				let built=[];
				for(let _ of _this){
					_ms.addMany(built,mapper(_))
				};
				return built
			})())
		});
		let _64flat_45map_126=exports["@flat-map~"]=function _64flat_45map_126(mapped,mapper){
			_ms.checkInstance(_64,mapped,"mapped");
			_ms.checkInstance(_ms.sub(Function,Any,_64),mapper,"mapper");
			return new (_ms.unlazy(Stream))(function*(){
				for(let _ of mapped){
					(yield* iterator(mapper(_)))
				}
			})
		};
		let _64flatten=exports["@flatten"]=_ms.method("@flatten",[],function(){
			let _this=this;
			return _61_62(type_45of(_this),(()=>{
				let built=[];
				for(let _ of _this){
					_ms.addMany(built,_)
				};
				return built
			})())
		});
		let _64flatten_126=exports["@flatten~"]=function _64flatten_126(flattened){
			return new (_ms.unlazy(Stream))(function*(){
				for(let _ of flattened){
					(yield* iterator(_))
				}
			})
		};
		let _43_43=exports["++"]=_ms.method("++",[["@other",_64]],function(_64other){
			let _this=this;
			_ms.checkInstance(_64,_64other,"@other");
			return _61_62(type_45of(_this),(()=>{
				let built=[];
				_ms.addMany(built,_this);
				_ms.addMany(built,_64other);
				return built
			})())
		});
		let _43_43_126=exports["++~"]=function _43_43_126(_64a,_64b){
			return _ms.checkInstance(_ms.unlazy(Stream),new (_ms.unlazy(Stream))(function*(){
				(yield* iterator(_64a));
				(yield* iterator(_64b))
			}),"returned value")
		};
		let _45_45=exports["--"]=_ms.method("--",[["@remove",_64]],function(_64remove){
			let _this=this;
			_ms.checkInstance(_64,_64remove,"@remove");
			return _61_62(type_45of(_this),_45_45_126(_this,_64remove))
		});
		let _45_45_126=exports["--~"]=function _45_45_126(_64removed_45from,_64remove){
			_ms.checkInstance(_64,_64remove,"@remove");
			return _ms.checkInstance(_64,new (_ms.unlazy(Stream))(function*(){
				let _64remove_45remaining=_61_62(_ms.unlazy(Set),_64remove);
				for(let _ of _64removed_45from){
					if(_ms.hasInstance(_64remove_45remaining,_)){
						_45_45_33(_64remove_45remaining,[_])
					} else {
						(yield _)
					}
				}
			}),"returned value")
		};
		let empty_33=exports["empty!"]=_ms.method("empty!",[]);
		let _43_33=exports["+!"]=_ms.method("+!",["added"],function(added){
			let _this=this;
			_ms.unlazy(_43_62_33)(_this,added)
		});
		let _43_43_33=exports["++!"]=_ms.method("++!",[["@added",_64]],function(_64added){
			let _this=this;
			_ms.checkInstance(_64,_64added,"@added");
			_ms.unlazy(_43_43_62_33)(_this,_64added)
		});
		let _45_33=exports["-!"]=_ms.method("-!",[["@removed",_64]]);
		let _45_45_33=exports["--!"]=_ms.method("--!",[["@removed",_64]]);
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9ALm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBaUJBO2VBS0Msb0JBQWU7UUEyTVQ7c0JBM01ZO1dBRWpCLE9BeU1LLE1Bek1NO1lBQ1YsT0FBRyxHQUFHO0lBQUE7R0FBQTtlQUVSLFNBQUk7UUFzTUU7V0FyTUwsQ0FBSyxTQUFNLFVBcU1OLE9Bck1xQixVQUFRLGtDQXFNN0IsTUFyTWtEO0dBQUE7ZUFFeEQ7UUFtTU07V0FsTUwsYUFrTUssTUFsTVc7R0FBQTtlQUNqQjtRQWlNTTtXQWhNTCxhQWdNSyxNQWhNVztHQUFBO0VBQUE7RUFFbEIsaUJBQWUsc0JBQUEsRUFBQztVQUVYO0lBQUgsR0FBQSxTQUFRLEdBQ0E7WUFBTixTQUFTO1dBRVA7S0FBSCxZQUNTLEtBQUE7TUFDUixlQUFXLE9BQUcsTUFBVzs7ZUFBQSxNQUFPLEVBQ0E7c0JBQTdCLE9BQVEsUUFBUTtPQUFBOzs7YUFDbEIsU0FBUSxnQkFBZTs7WUFDeEIsR0FBRyxxQkFBbUI7Ozs7RUFFMUIsOEJBQVUsS0FBSSxRQUNNLEtBQUE7O2NBQ25CO0dBQ0Esb0JBQU07R0FDTix1Q0FBYTs7O0VBRWQsc0RBQ2dCO09BMktUO1VBMUtMLFNBMEtLOztFQXZLTiw2QkFBUyxpQkFBQSxFQUFJO3FCQUFGO3FCQUFlO0dBTXJCLFFBQUEsUUFBUyxFQUNBO0lBQVosbUJBQWE7R0FBQTtFQUFBO0VBRWYsc0JBQU8sY0FBQSxFQUFJLEVBQUU7cUJBQUo7R0FJUixRQUN3QjtJQUF2QixHQUFBLFdBQVMsR0FDQzs7S0FBVCxzQkFBTztLQUNQLHdCQUFRO0tBQ1Isb0JBQU87O1dBRUo7O0tBQUgsd0NBQWE7S0FDYix3QkFBUTtLQUNSLHdDQUFZOzs7O0dBRWQsUUFBTTtHQUNGLFFBQUEsS0FBQSxLQUNJO1FBQUEsT0FBTyxJQUFLO0dBQUE7VUFDcEI7RUFBQTtFQUVELDJCQUFPLGdCQUFBLEVBQUk7cUJBQUY7NkJBQVEsSUFBSTsyQkFFUCxR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
