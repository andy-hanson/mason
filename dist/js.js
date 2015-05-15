"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./private/js-impl","./at/at","./Boolean","./Type/Type","./bang","./at/at","./compare","./math/methods","./Objectbang"],function(exports,js_45impl_0,_64_1,Boolean_2,Type_3,_33_4,_64_5,compare_6,methods_7,Object_33_8){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(js_45impl_0),iNew=_ms.get(_$2,"iNew"),_64=_ms.lazy(function(){
			return _ms.getDefaultExport(_64_1)
		}),_$5=_ms.lazyGetModule(Boolean_2),not=_ms.lazyProp(_$5,"not"),_$6=_ms.lazyGetModule(Type_3),_61_62=_ms.lazyProp(_$6,"=>"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_4)
		}),_$8=_ms.lazyGetModule(_33_4),_33not=_ms.lazyProp(_$8,"!not"),_$9=_ms.lazyGetModule(_64_5),each_33=_ms.lazyProp(_$9,"each!"),_$10=_ms.lazyGetModule(compare_6),_61_63=_ms.lazyProp(_$10,"=?"),_$11=_ms.lazyGetModule(methods_7),_43=_ms.lazyProp(_$11,"+"),_$12=_ms.lazyGetModule(Object_33_8),p_43_33=_ms.lazyProp(_$12,"p+!");
		const doc=exports.doc="Functions implementing behavior native to JavaScript.";
		const op=function(){
			return _ms.set(function(op_45name){
				return Function("a","b",(("return a "+_ms.show(op_45name))+" b"))
			},"displayName","op")
		}();
		const unary_45op=function(){
			return _ms.set(function(op_45name){
				return Function("_",(("return "+_ms.show(op_45name))+" _"))
			},"displayName","unary-op")
		}();
		const js_45and=exports["js-and"]=op("&");
		const js_45caret=exports["js-caret"]=op("^");
		const js_60_60=exports["js<<"]=op("<<");
		const js_62_62=exports["js>>"]=op(">>");
		const js_62_62_62=exports["js>>>"]=op(">>>");
		const js_61_61_61=exports["js==="]=op("===");
		const js_61_61=exports["js=="]=op("==");
		const js_60=exports["js<"]=op("<");
		const js_62=exports["js>"]=op(">");
		const js_60_61=exports["js<="]=op("<=");
		const js_62_61=exports["js>="]=op(">=");
		const js_43=exports["js+"]=op("+");
		const js_45=exports["js-"]=op("-");
		const js_42=exports["js*"]=op("*");
		const js_47=exports["js/"]=op("/");
		const js_45mod=exports["js-mod"]=op("%");
		const js_45bar=exports["js-bar"]=op("|");
		const js_126=exports["js~"]=unary_45op("~");
		const js_33=exports["js!"]=unary_45op("!");
		const js_45sub=exports["js-sub"]=Function("obj","prop","return obj[prop]");
		const js_45set=exports["js-set"]=Function("obj","prop","val","obj[prop] = val");
		const js_45delete=exports["js-delete"]=Function("obj","prop","delete obj[prop]");
		const js_45instanceof=exports["js-instanceof"]=op("instanceof");
		const defined_63=exports["defined?"]=function(){
			const doc="True for any value except `undefined`.";
			const test=function(){
				return _ms.set(function(){
					const _k0=[void 0],_v0=false;
					const _k1=[0],_v1=true;
					return _ms.map(_k0,_v0,_k1,_v1)
				},"displayName","test")
			}();
			return _ms.set(function(_){
				return _ms.unlazy(not)(id_61_63(_,void 0))
			},"doc",doc,"test",test,"displayName","defined?")
		}();
		const id_61_63=exports["id=?"]=function(){
			const doc="For Objects, whether they are the same place in memory.\nFor primitive types, whether they have the same data.\nTODO: Explain (and test) difference between this and js===";
			const test=function(){
				return _ms.set(function(){
					const _k0=["a","a"],_v0=true;
					const _k1=[["a"],["a"]],_v1=false;
					return _ms.map(_k0,_v0,_k1,_v1)
				},"displayName","test")
			}();
			return _ms.set(Object.is,"doc",doc,"test",test,"displayName","id=?")
		}();
		const truthy_63=exports["truthy?"]=function(){
			const doc="Whether javascript's `if` statement would consider the value to be true.";
			const test=function(){
				return _ms.set(function(){
					const falsy=function(){
						const _0=null;
						const _1=void 0;
						const _2=0;
						const _3=Number.NaN;
						const _4="";
						const _5=false;
						return [_0,_1,_2,_3,_4,_5]
					}();
					_ms.unlazy(each_33)(falsy,function(_){
						return _ms.unlazy(_33not)(truthy_63,_)
					});
					_ms.unlazy(_33)(truthy_63,[]);
					return _ms.unlazy(_33)(truthy_63,true)
				},"displayName","test")
			}();
			return _ms.set(function(a){
				return _ms.checkContains(Boolean,js_33(js_33(a)),"res")
			},"doc",doc,"test",test,"displayName","truthy?")
		}();
		const _new=exports.new=function(){
			const doc="Emulates JavaScript's `new` keyword.\nCreates a new Object whose prototype is `constructor.prototype` and calls the constructor on it.\nWierd things may happen if you try to create a new Error this way.";
			const test=function(){
				return _ms.set(function(){
					const My_45Function_45Type=function(){
						return _ms.set(function(a){
							return _ms.unlazy(p_43_33)(this,"a",a)
						},"displayName","My-Function-Type")
					}();
					const x=_ms.checkContains(My_45Function_45Type,_new(My_45Function_45Type,1),"x");
					_ms.unlazy(_33)(_ms.unlazy(_61_63),x.a,1);
					const y=_ms.checkContains(Error,_new(Error,"Oh no!"),"y");
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),y.message,"Oh no!")
				},"displayName","test")
			}();
			return _ms.set(iNew,"doc",doc,"test",test,"displayName","new")
		}();
		const js_45typeof=exports["js-typeof"]=function(){
			const doc="JavaScript's `typeof` operator.";
			const test=function(){
				return _ms.set(function(){
					const _k0=[void 0],_v0="undefined";
					const _k1=[null],_v1="object";
					const _k2=[true],_v2="boolean";
					const _k3=[0],_v3="number";
					const _k4=["a"],_v4="string";
					const _k5=[Symbol("s")],_v5="symbol";
					const _k6=[js_45typeof],_v6="function";
					const _k7=[_ms.unlazy(_64)],_v7="object";
					return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3,_k4,_v4,_k5,_v5,_k6,_v6,_k7,_v7)
				},"displayName","test")
			}();
			return _ms.set(unary_45op("typeof"),"doc",doc,"test",test,"displayName","js-typeof")
		}();
		const apply_45with_45this=exports["apply-with-this"]=function(){
			const doc="Like `apply`, and also makes the hidden parameter `this` to be `new-this`.\nActs like `new-this.f ...arguments` if `f` were in the prototype chain of `new-this`.";
			const test=function(){
				return _ms.set(function(){
					const f=function(){
						return _ms.set(function(a){
							return _ms.unlazy(_43)(this,a)
						},"displayName","f")
					}();
					const _k0=[f,1,[2]],_v0=3;
					return _ms.map(_k0,_v0)
				},"displayName","test")
			}();
			return _ms.set(function(f,new_45this,_arguments){
				_ms.checkContains(Function,f,"f");
				_ms.checkContains(_ms.unlazy(_64),_arguments,"arguments");
				return Function.prototype.apply.call(f,new_45this,_ms.unlazy(_61_62)(Array,_arguments))
			},"doc",doc,"test",test,"displayName","apply-with-this")
		}();
		const call_45with_45this=exports["call-with-this"]=function(){
			const doc="Like `apply-with-this` but does not take a list.";
			const test=function(){
				return _ms.set(function(){
					const f=function(){
						return _ms.set(function(a){
							return _ms.unlazy(_43)(this,a)
						},"displayName","f")
					}();
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),call_45with_45this(f,1,2),3)
				},"displayName","test")
			}();
			return _ms.set(function(_,new_45this){
				const args=[].slice.call(arguments,2);
				_ms.checkContains(Function,_,"_");
				return apply_45with_45this(_,new_45this,args)
			},"doc",doc,"test",test,"displayName","call-with-this")
		}();
		const displayName=exports.displayName="js";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9qcy5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7RUFhQSxzQkFBTTtFQUVOLG1CQUFNO2tCQUFBLFNBQUEsVUFDTztXQUFaLFNBQVUsSUFBSSxJQUFJLHVCQUFVOzs7RUFDN0IsMkJBQVk7a0JBQUEsU0FBQSxVQUNPO1dBQWxCLFNBQVUsSUFBSSxxQkFBUTs7O0VBRXZCLGlDQUFRLEdBQUk7RUFDWixxQ0FBVSxHQUFJO0VBQ2QsK0JBQU0sR0FBSTtFQUNWLCtCQUFNLEdBQUk7RUFDVixtQ0FBTyxHQUFJO0VBQ1gsbUNBQU8sR0FBSTtFQUNYLCtCQUFNLEdBQUk7RUFDViwyQkFBSyxHQUFJO0VBQ1QsMkJBQUssR0FBSTtFQUNULCtCQUFNLEdBQUk7RUFDViwrQkFBTSxHQUFJO0VBQ1YsMkJBQUssR0FBSTtFQUNULDJCQUFLLEdBQUk7RUFDVCwyQkFBSyxHQUFJO0VBQ1QsMkJBQUssR0FBSTtFQUNULGlDQUFRLEdBQUk7RUFDWixpQ0FBUSxHQUFJO0VBQ1osNEJBQUssV0FBVTtFQUNmLDJCQUFLLFdBQVU7RUFDZixpQ0FBUSxTQUFVLE1BQU0sT0FBTztFQUMvQixpQ0FBUSxTQUFVLE1BQU0sT0FBTyxNQUFNO0VBQ3JDLHVDQUFXLFNBQVUsTUFBTSxPQUFPO0VBQ2xDLCtDQUFlLEdBQUk7RUFHbkIsK0NBQ1M7R0FBUixVQUFNO0dBQ04scUJBQ087bUJBQUEsVUFBQTtLQUFOLFVBQUEsQ0FBRSxZQUFlO0tBQ2pCLFVBQUEsQ0FBRSxPQUFPOzs7O2tCQUNULFNBQUEsRUFDQzsyQkFBSSxTQUFLLEVBQUU7OztFQUVkLHlDQUNLO0dBQUosVUFDQztHQUdELHFCQUNPO21CQUFBLFVBQUE7S0FBTixVQUFBLENBQUcsSUFBSSxTQUFRO0tBQ2YsVUFBQSxDQUFFLENBQUcsS0FBSyxDQUFHLFVBQVU7Ozs7a0JBQ3hCOztFQUVELDZDQUNRO0dBQVAsVUFBTTtHQUNOLHFCQUNPO21CQUFBLFVBQUE7S0FBTixzQkFDTztNQUFOLFNBQUU7TUFDRixTQUFFO01BQ0YsU0FBRTtNQUNGLFNBQUU7TUFDRixTQUFHO01BQ0gsU0FBRTs7O3lCQUNHLE1BQU8sU0FBQSxFQUNDO2dDQUFSLFVBQVE7S0FBQTtxQkFDWixVQUFROzRCQUNSLFVBQVE7SUFBQTs7a0JBRVYsU0FBUyxFQUNDOzZCQURULFFBQ0QsTUFBSyxNQUFJOzs7RUFFWCxpQ0FDSTtHQUFILFVBQ0M7R0FHRCxxQkFDTzttQkFBQSxVQUFBO0tBQU4scUNBQW9CO3FCQUFBLFNBQUEsRUFDQztrQ0FBaEIsS0FBTSxJQUFHO01BQUE7O0tBQ2QsMEJBQUUscUJBQW1CLEtBQUkscUJBQWlCO3dDQUNyQyxJQUFJO0tBQ1QsMEJBQUUsTUFBUSxLQUFJLE1BQU87K0NBQ2hCLFVBQVc7SUFBQTs7a0JBQ2pCOztFQUVELGlEQUNVO0dBQVQsVUFBTTtHQUNOLHFCQUNPO21CQUFBLFVBQUE7S0FBTixVQUFBLENBQUUsWUFBZ0I7S0FDbEIsVUFBQSxDQUFFLFVBQVM7S0FDWCxVQUFBLENBQUUsVUFBVztLQUNiLFVBQUEsQ0FBRSxPQUFRO0tBQ1YsVUFBQSxDQUFHLFNBQVM7S0FDWixVQUFBLENBQUcsT0FBUSxVQUFVO0tBQ3JCLFVBQUEsQ0FBRSxpQkFBZ0I7S0FDbEIsVUFBQSxzQkFBVTs7OztrQkFDWCxXQUFVOztFQUVYLCtEQUNnQjtHQUFmLFVBQ0M7R0FFRCxxQkFDTzttQkFBQSxVQUFBO0tBQU4sa0JBQUs7cUJBQUEsU0FBQSxFQUNDOzhCQUFILEtBQUs7TUFBQTs7S0FDUixVQUFBLENBQUUsRUFBRSxFQUFFLENBQUUsUUFBUzs7OztrQkFDakIsU0FBQSxFQUFXLFdBQVMsV0FDVztzQkFEN0I7O1dBRUYsOEJBQThCLEVBQUUsOEJBQWEsTUFBTTtHQUFBOztFQUVyRCw2REFDZTtHQUFkLFVBQU07R0FDTixxQkFDTzttQkFBQSxVQUFBO0tBQU4sa0JBQUs7cUJBQUEsU0FBQSxFQUNDOzhCQUFILEtBQUs7TUFBQTs7K0NBQ0YsbUJBQWUsRUFBRSxFQUFFLEdBQUc7SUFBQTs7a0JBQzVCLFNBQUEsRUFBVyxXQUNnQjs7c0JBRHpCO1dBQ0Ysb0JBQWdCLEVBQUUsV0FBUztHQUFBOztFQS9IN0Isc0NBQUEiLCJmaWxlIjoianMuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==