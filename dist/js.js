"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./private/bootstrap","./private/js-impl","./at/at","./Bool","./Type/Type","./bang","./at/at","./compare","./math/methods","./math/Num","./Objbang"],function(exports,bootstrap_0,js_45impl_1,_64_2,Bool_3,Type_4,_33_5,_64_6,compare_7,methods_8,Num_9,Obj_33_10){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(bootstrap_0),Fun=_ms.get(_$2,"Fun"),_$3=_ms.getModule(js_45impl_1),iNew=_ms.get(_$3,"iNew"),_64=_ms.lazy(function(){
			return _ms.getDefaultExport(_64_2)
		}),Bool=_ms.lazy(function(){
			return _ms.getDefaultExport(Bool_3)
		}),_$6=_ms.lazyGetModule(Bool_3),not=_ms.lazyProp(_$6,"not"),_$7=_ms.lazyGetModule(Type_4),_61_62=_ms.lazyProp(_$7,"=>"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_5)
		}),_$9=_ms.lazyGetModule(_33_5),_33not=_ms.lazyProp(_$9,"!not"),_$10=_ms.lazyGetModule(_64_6),each_33=_ms.lazyProp(_$10,"each!"),_$11=_ms.lazyGetModule(compare_7),_61_63=_ms.lazyProp(_$11,"=?"),_$12=_ms.lazyGetModule(methods_8),_43=_ms.lazyProp(_$12,"+"),Num=_ms.lazy(function(){
			return _ms.getDefaultExport(Num_9)
		}),_$14=_ms.lazyGetModule(Obj_33_10),p_43_33=_ms.lazyProp(_$14,"p+!");
		const exports={};
		const doc=exports.doc="Functions implementing behavior native to JavaScript.";
		const op=function(op_45name){
			return Fun("a","b",(("return a "+_ms.show(op_45name))+" b"))
		};
		const unary_45op=function(op_45name){
			return Fun("_",(("return "+_ms.show(op_45name))+" _"))
		};
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
		const js_45sub=exports["js-sub"]=Fun("obj","prop","return obj[prop]");
		const js_45set=exports["js-set"]=Fun("obj","prop","val","obj[prop] = val");
		const js_45delete=exports["js-delete"]=Fun("obj","prop","delete obj[prop]");
		const js_45instanceof=exports["js-instanceof"]=op("instanceof");
		const defined_63=exports["defined?"]=function(){
			const doc="True for any value except `undefined`.";
			const test=function(){
				const _k0=[undefined],_v0=false;
				const _k1=[0],_v1=true;
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function(_){
				return _ms.unlazy(not)(id_61_63(_,undefined))
			},"doc",doc,"test",test,"displayName","defined?")
		}();
		const id_61_63=exports["id=?"]=function(){
			const doc="For Objs, whether they are the same place in memory.\nFor primitive types, whether they have the same data.\nTODO: Explain (and test) difference between this and js===";
			const test=function(){
				const _k0=["a","a"],_v0=true;
				const _k1=[["a"],["a"]],_v1=false;
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(global.Object.is,"doc",doc,"test",test,"displayName","id=?")
		}();
		const truthy_63=exports["truthy?"]=function(){
			const doc="Whether javascript's `if` statement would consider the value to be true.";
			const test=function(){
				const falsy=function(){
					const _0=null;
					const _1=undefined;
					const _2=0;
					const _3=_ms.unlazy(Num).NaN;
					const _4="";
					const _5=false;
					return [_0,_1,_2,_3,_4,_5]
				}();
				_ms.unlazy(each_33)(falsy,function(_){
					return _ms.unlazy(_33not)(truthy_63,_)
				});
				_ms.unlazy(_33)(truthy_63,[]);
				return _ms.unlazy(_33)(truthy_63,true)
			};
			return _ms.set(function(a){
				return _ms.checkContains(_ms.unlazy(Bool),js_33(js_33(a)),"res")
			},"doc",doc,"test",test,"displayName","truthy?")
		}();
		const _new=exports.new=function(){
			const doc="Emulates JavaScript's `new` keyword.\nCreates a new Obj whose prototype is `constructor.prototype` and calls the constructor on it.\nWierd things may happen if you try to create a new Error this way.";
			const test=function(){
				const My_45Fun_45Type=function(a){
					return _ms.unlazy(p_43_33)(this,"a",a)
				};
				const x=_ms.checkContains(My_45Fun_45Type,_new(My_45Fun_45Type,1),"x");
				_ms.unlazy(_33)(_ms.unlazy(_61_63),x.a,1);
				const y=_ms.checkContains(Error,_new(Error,"Oh no!"),"y");
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),y.message,"Oh no!")
			};
			return _ms.set(iNew,"doc",doc,"test",test,"displayName","new")
		}();
		const js_45typeof=exports["js-typeof"]=function(){
			const doc="JavaScript's `typeof` operator.";
			const test=function(){
				const _k0=[undefined],_v0="undefined";
				const _k1=[null],_v1="object";
				const _k2=[true],_v2="boolean";
				const _k3=[0],_v3="number";
				const _k4=["a"],_v4="string";
				const _k5=[Symbol("s")],_v5="symbol";
				const _k6=[js_45typeof],_v6="function";
				const _k7=[_ms.unlazy(_64)],_v7="object";
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3,_k4,_v4,_k5,_v5,_k6,_v6,_k7,_v7)
			};
			return _ms.set(unary_45op("typeof"),"test",test,"doc",doc,"displayName","js-typeof")
		}();
		const apply_45with_45this=exports["apply-with-this"]=function(){
			const doc="Like `apply`, and also makes the hidden parameter `this` to be `new-this`.\nActs like `new-this.f ...arguments` if `f` were in the prototype chain of `new-this`.";
			const test=function(){
				const f=function(a){
					return _ms.unlazy(_43)(this,a)
				};
				const _k0=[f,1,[2]],_v0=3;
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function(f,new_45this,_arguments){
				_ms.checkContains(Fun,f,"f");
				_ms.checkContains(_ms.unlazy(_64),_arguments,"arguments");
				return Fun.prototype.apply.call(f,new_45this,_ms.unlazy(_61_62)(Array,_arguments))
			},"doc",doc,"test",test,"displayName","apply-with-this")
		}();
		const call_45with_45this=exports["call-with-this"]=function(){
			const doc="Like `apply-with-this` but does not take a list.";
			const test=function(){
				const f=function(a){
					return _ms.unlazy(_43)(this,a)
				};
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),call_45with_45this(f,1,2),3)
			};
			return _ms.set(function(f,new_45this){
				const args=[].slice.call(arguments,2);
				_ms.checkContains(Fun,f,"f");
				return apply_45with_45this(f,new_45this,args)
			},"doc",doc,"test",test,"displayName","call-with-this")
		}();
		const displayName=exports.displayName="js";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9qcy5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7aUNBZUE7Ozs7Ozs7Ozs7O0VBQUEsc0JBQU07RUFFTixTQUFNLFNBQUEsVUFDTztVQUFaLElBQUssSUFBSSxJQUFJLHVCQUFVOztFQUN4QixpQkFBWSxTQUFBLFVBQ087VUFBbEIsSUFBSyxJQUFJLHFCQUFROztFQUVsQixpQ0FBUSxHQUFJO0VBQ1oscUNBQVUsR0FBSTtFQUNkLCtCQUFNLEdBQUk7RUFDViwrQkFBTSxHQUFJO0VBQ1YsbUNBQU8sR0FBSTtFQUNYLG1DQUFPLEdBQUk7RUFDWCwrQkFBTSxHQUFJO0VBQ1YsMkJBQUssR0FBSTtFQUNULDJCQUFLLEdBQUk7RUFDVCwrQkFBTSxHQUFJO0VBQ1YsK0JBQU0sR0FBSTtFQUNWLDJCQUFLLEdBQUk7RUFDVCwyQkFBSyxHQUFJO0VBQ1QsMkJBQUssR0FBSTtFQUNULDJCQUFLLEdBQUk7RUFDVCxpQ0FBUSxHQUFJO0VBQ1osaUNBQVEsR0FBSTtFQUNaLDRCQUFLLFdBQVU7RUFDZiwyQkFBSyxXQUFVO0VBQ2YsaUNBQVEsSUFBSyxNQUFNLE9BQU87RUFDMUIsaUNBQVEsSUFBSyxNQUFNLE9BQU8sTUFBTTtFQUNoQyx1Q0FBVyxJQUFLLE1BQU0sT0FBTztFQUM3QiwrQ0FBZSxHQUFJO0VBR25CLCtDQUNTO0dBQVIsVUFBTTtHQUNOLFdBQ08sVUFBQTtJQUFOLFVBQUEsQ0FBRSxlQUFlO0lBQ2pCLFVBQUEsQ0FBRSxPQUFPOzs7a0JBQ1QsU0FBQSxFQUNDOzJCQUFJLFNBQUssRUFBRTtHQUFBOztFQUVkLHlDQUNLO0dBQUosVUFDQztHQUdELFdBQ08sVUFBQTtJQUFOLFVBQUEsQ0FBRyxJQUFJLFNBQVE7SUFDZixVQUFBLENBQUUsQ0FBRyxLQUFLLENBQUcsVUFBVTs7O2tCQUN4Qjs7RUFFRCw2Q0FDUTtHQUFQLFVBQU07R0FDTixXQUNPLFVBQUE7SUFBTixzQkFDTztLQUFOLFNBQUU7S0FDRixTQUFFO0tBQ0YsU0FBRTtLQUNGO0tBQ0EsU0FBRztLQUNILFNBQUU7WUFMSTs7d0JBTUQsTUFBTyxTQUFBLEVBQ0M7K0JBQVIsVUFBUTtJQUFBO29CQUNaLFVBQVE7MkJBQ1IsVUFBUTtHQUFBO2tCQUVWLFNBQU0sRUFDQzs4Q0FBUCxNQUFLLE1BQUk7OztFQUVYLGlDQUNJO0dBQUgsVUFDQztHQUdELFdBQ08sVUFBQTtJQUFOLHNCQUFlLFNBQUEsRUFDQztnQ0FBWCxLQUFNLElBQUc7SUFBQTtJQUNkLDBCQUFFLGdCQUFjLEtBQUksZ0JBQVk7dUNBQzNCLElBQUk7SUFDVCwwQkFBRSxNQUFRLEtBQUksTUFBTzs4Q0FDaEIsVUFBVztHQUFBO2tCQUNqQjs7RUFFRCxpREFDVTtHQUFULFVBQU07R0FDTixXQUNPLFVBQUE7SUFBTixVQUFBLENBQUUsZUFBZ0I7SUFDbEIsVUFBQSxDQUFFLFVBQVM7SUFDWCxVQUFBLENBQUUsVUFBVztJQUNiLFVBQUEsQ0FBRSxPQUFRO0lBQ1YsVUFBQSxDQUFHLFNBQVM7SUFDWixVQUFBLENBQUcsT0FBUSxVQUFVO0lBQ3JCLFVBQUEsQ0FBRSxpQkFBZ0I7SUFDbEIsVUFBQSxzQkFBVTs7O2tCQUNYLFdBQVU7O0VBRVgsK0RBQ2dCO0dBQWYsVUFDQztHQUVELFdBQ08sVUFBQTtJQUFOLFFBQUssU0FBQSxFQUNDOzRCQUFILEtBQUs7SUFBQTtJQUNSLFVBQUEsQ0FBRSxFQUFFLEVBQUUsQ0FBRSxRQUFTOzs7a0JBQ2pCLFNBQUEsRUFBTSxXQUFTLFdBQ1c7c0JBRHhCOztXQUVGLHlCQUF5QixFQUFFLDhCQUFhLE1BQU07R0FBQTs7RUFFaEQsNkRBQ2U7R0FBZCxVQUFNO0dBQ04sV0FDTyxVQUFBO0lBQU4sUUFBSyxTQUFBLEVBQ0M7NEJBQUgsS0FBSztJQUFBOzhDQUNGLG1CQUFlLEVBQUUsRUFBRSxHQUFHO0dBQUE7a0JBQzVCLFNBQUEsRUFBTSxXQUNnQjs7c0JBRHBCO1dBQ0Ysb0JBQWdCLEVBQUUsV0FBUztHQUFBOztFQWpJN0Isc0NBQUEiLCJmaWxlIjoianMuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==