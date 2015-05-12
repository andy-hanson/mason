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
		const doc=exports.doc="Functions implementing behavior native to JavaScript.";
		const op=_ms.set(function(op_45name){
			return Fun("a","b",(("return a "+_ms.show(op_45name))+" b"))
		},"displayName","op");
		const unary_45op=_ms.set(function(op_45name){
			return Fun("_",(("return "+_ms.show(op_45name))+" _"))
		},"displayName","unary-op");
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
			const test=_ms.set(function(){
				const _k0=[undefined],_v0=false;
				const _k1=[0],_v1=true;
				return _ms.map(_k0,_v0,_k1,_v1)
			},"displayName","test");
			return _ms.set(function(_){
				return _ms.unlazy(not)(id_61_63(_,undefined))
			},"doc",doc,"test",test,"displayName","defined?")
		}();
		const id_61_63=exports["id=?"]=function(){
			const doc="For Objs, whether they are the same place in memory.\nFor primitive types, whether they have the same data.\nTODO: Explain (and test) difference between this and js===";
			const test=_ms.set(function(){
				const _k0=["a","a"],_v0=true;
				const _k1=[["a"],["a"]],_v1=false;
				return _ms.map(_k0,_v0,_k1,_v1)
			},"displayName","test");
			return _ms.set(global.Object.is,"doc",doc,"test",test,"displayName","id=?")
		}();
		const truthy_63=exports["truthy?"]=function(){
			const doc="Whether javascript's `if` statement would consider the value to be true.";
			const test=_ms.set(function(){
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
			},"displayName","test");
			return _ms.set(function(a){
				return _ms.checkContains(_ms.unlazy(Bool),js_33(js_33(a)),"res")
			},"doc",doc,"test",test,"displayName","truthy?")
		}();
		const _new=exports.new=function(){
			const doc="Emulates JavaScript's `new` keyword.\nCreates a new Obj whose prototype is `constructor.prototype` and calls the constructor on it.\nWierd things may happen if you try to create a new Error this way.";
			const test=_ms.set(function(){
				const My_45Fun_45Type=_ms.set(function(a){
					return _ms.unlazy(p_43_33)(this,"a",a)
				},"displayName","My-Fun-Type");
				const x=_ms.checkContains(My_45Fun_45Type,_new(My_45Fun_45Type,1),"x");
				_ms.unlazy(_33)(_ms.unlazy(_61_63),x.a,1);
				const y=_ms.checkContains(Error,_new(Error,"Oh no!"),"y");
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),y.message,"Oh no!")
			},"displayName","test");
			return _ms.set(iNew,"doc",doc,"test",test,"displayName","new")
		}();
		const js_45typeof=exports["js-typeof"]=function(){
			const doc="JavaScript's `typeof` operator.";
			const test=_ms.set(function(){
				const _k0=[undefined],_v0="undefined";
				const _k1=[null],_v1="object";
				const _k2=[true],_v2="boolean";
				const _k3=[0],_v3="number";
				const _k4=["a"],_v4="string";
				const _k5=[Symbol("s")],_v5="symbol";
				const _k6=[js_45typeof],_v6="function";
				const _k7=[_ms.unlazy(_64)],_v7="object";
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3,_k4,_v4,_k5,_v5,_k6,_v6,_k7,_v7)
			},"displayName","test");
			return _ms.set(unary_45op("typeof"),"doc",doc,"test",test,"displayName","js-typeof")
		}();
		const apply_45with_45this=exports["apply-with-this"]=function(){
			const doc="Like `apply`, and also makes the hidden parameter `this` to be `new-this`.\nActs like `new-this.f ...arguments` if `f` were in the prototype chain of `new-this`.";
			const test=_ms.set(function(){
				const f=_ms.set(function(a){
					return _ms.unlazy(_43)(this,a)
				},"displayName","f");
				const _k0=[f,1,[2]],_v0=3;
				return _ms.map(_k0,_v0)
			},"displayName","test");
			return _ms.set(function(f,new_45this,_arguments){
				_ms.checkContains(Fun,f,"f");
				_ms.checkContains(_ms.unlazy(_64),_arguments,"arguments");
				return Fun.prototype.apply.call(f,new_45this,_ms.unlazy(_61_62)(Array,_arguments))
			},"doc",doc,"test",test,"displayName","apply-with-this")
		}();
		const call_45with_45this=exports["call-with-this"]=function(){
			const doc="Like `apply-with-this` but does not take a list.";
			const test=_ms.set(function(){
				const f=_ms.set(function(a){
					return _ms.unlazy(_43)(this,a)
				},"displayName","f");
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),call_45with_45this(f,1,2),3)
			},"displayName","test");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9qcy5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0VBZUEsc0JBQU07RUFFTixpQkFBTSxTQUFBLFVBQ087VUFBWixJQUFLLElBQUksSUFBSSx1QkFBVTs7RUFDeEIseUJBQVksU0FBQSxVQUNPO1VBQWxCLElBQUssSUFBSSxxQkFBUTs7RUFFbEIsaUNBQVEsR0FBSTtFQUNaLHFDQUFVLEdBQUk7RUFDZCwrQkFBTSxHQUFJO0VBQ1YsK0JBQU0sR0FBSTtFQUNWLG1DQUFPLEdBQUk7RUFDWCxtQ0FBTyxHQUFJO0VBQ1gsK0JBQU0sR0FBSTtFQUNWLDJCQUFLLEdBQUk7RUFDVCwyQkFBSyxHQUFJO0VBQ1QsK0JBQU0sR0FBSTtFQUNWLCtCQUFNLEdBQUk7RUFDViwyQkFBSyxHQUFJO0VBQ1QsMkJBQUssR0FBSTtFQUNULDJCQUFLLEdBQUk7RUFDVCwyQkFBSyxHQUFJO0VBQ1QsaUNBQVEsR0FBSTtFQUNaLGlDQUFRLEdBQUk7RUFDWiw0QkFBSyxXQUFVO0VBQ2YsMkJBQUssV0FBVTtFQUNmLGlDQUFRLElBQUssTUFBTSxPQUFPO0VBQzFCLGlDQUFRLElBQUssTUFBTSxPQUFPLE1BQU07RUFDaEMsdUNBQVcsSUFBSyxNQUFNLE9BQU87RUFDN0IsK0NBQWUsR0FBSTtFQUduQiwrQ0FDUztHQUFSLFVBQU07R0FDTixtQkFDTyxVQUFBO0lBQU4sVUFBQSxDQUFFLGVBQWU7SUFDakIsVUFBQSxDQUFFLE9BQU87OztrQkFDVCxTQUFBLEVBQ0M7MkJBQUksU0FBSyxFQUFFO0dBQUE7O0VBRWQseUNBQ0s7R0FBSixVQUNDO0dBR0QsbUJBQ08sVUFBQTtJQUFOLFVBQUEsQ0FBRyxJQUFJLFNBQVE7SUFDZixVQUFBLENBQUUsQ0FBRyxLQUFLLENBQUcsVUFBVTs7O2tCQUN4Qjs7RUFFRCw2Q0FDUTtHQUFQLFVBQU07R0FDTixtQkFDTyxVQUFBO0lBQU4sc0JBQ087S0FBTixTQUFFO0tBQ0YsU0FBRTtLQUNGLFNBQUU7S0FDRjtLQUNBLFNBQUc7S0FDSCxTQUFFO1lBTEk7O3dCQU1ELE1BQU8sU0FBQSxFQUNDOytCQUFSLFVBQVE7SUFBQTtvQkFDWixVQUFROzJCQUNSLFVBQVE7R0FBQTtrQkFFVixTQUFNLEVBQ0M7OENBQVAsTUFBSyxNQUFJOzs7RUFFWCxpQ0FDSTtHQUFILFVBQ0M7R0FHRCxtQkFDTyxVQUFBO0lBQU4sOEJBQWUsU0FBQSxFQUNDO2dDQUFYLEtBQU0sSUFBRztJQUFBO0lBQ2QsMEJBQUUsZ0JBQWMsS0FBSSxnQkFBWTt1Q0FDM0IsSUFBSTtJQUNULDBCQUFFLE1BQVEsS0FBSSxNQUFPOzhDQUNoQixVQUFXO0dBQUE7a0JBQ2pCOztFQUVELGlEQUNVO0dBQVQsVUFBTTtHQUNOLG1CQUNPLFVBQUE7SUFBTixVQUFBLENBQUUsZUFBZ0I7SUFDbEIsVUFBQSxDQUFFLFVBQVM7SUFDWCxVQUFBLENBQUUsVUFBVztJQUNiLFVBQUEsQ0FBRSxPQUFRO0lBQ1YsVUFBQSxDQUFHLFNBQVM7SUFDWixVQUFBLENBQUcsT0FBUSxVQUFVO0lBQ3JCLFVBQUEsQ0FBRSxpQkFBZ0I7SUFDbEIsVUFBQSxzQkFBVTs7O2tCQUNYLFdBQVU7O0VBRVgsK0RBQ2dCO0dBQWYsVUFDQztHQUVELG1CQUNPLFVBQUE7SUFBTixnQkFBSyxTQUFBLEVBQ0M7NEJBQUgsS0FBSztJQUFBO0lBQ1IsVUFBQSxDQUFFLEVBQUUsRUFBRSxDQUFFLFFBQVM7OztrQkFDakIsU0FBQSxFQUFNLFdBQVMsV0FDVztzQkFEeEI7O1dBRUYseUJBQXlCLEVBQUUsOEJBQWEsTUFBTTtHQUFBOztFQUVoRCw2REFDZTtHQUFkLFVBQU07R0FDTixtQkFDTyxVQUFBO0lBQU4sZ0JBQUssU0FBQSxFQUNDOzRCQUFILEtBQUs7SUFBQTs4Q0FDRixtQkFBZSxFQUFFLEVBQUUsR0FBRztHQUFBO2tCQUM1QixTQUFBLEVBQU0sV0FDZ0I7O3NCQURwQjtXQUNGLG9CQUFnQixFQUFFLFdBQVM7R0FBQTs7RUFqSTdCLHNDQUFBIiwiZmlsZSI6ImpzLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=