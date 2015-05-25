"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./private/js-impl","./at/at","./Boolean","./Type/Type","./bang","./compare","./math/methods","./Objectbang"],function(exports,js_45impl_0,_64_1,Boolean_2,Type_3,_33_4,compare_5,methods_6,Object_33_7){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(js_45impl_0),iNew=_ms.get(_$2,"iNew"),_64=_ms.lazy(function(){
			return _ms.getDefaultExport(_64_1)
		}),_$5=_ms.lazyGetModule(Boolean_2),not=_ms.lazyProp(_$5,"not"),_$6=_ms.lazyGetModule(Type_3),_61_62=_ms.lazyProp(_$6,"=>"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_4)
		}),_$8=_ms.lazyGetModule(_33_4),_33not=_ms.lazyProp(_$8,"!not"),_$9=_ms.lazyGetModule(compare_5),_61_63=_ms.lazyProp(_$9,"=?"),_$10=_ms.lazyGetModule(methods_6),_43=_ms.lazyProp(_$10,"+"),_$11=_ms.lazyGetModule(Object_33_7),p_43_33=_ms.lazyProp(_$11,"p+!");
		const doc=exports.doc="Functions implementing behavior native to JavaScript.";
		const op=function op(op_45name){
			return Function("a","b",(("return a "+_ms.show(op_45name))+" b"))
		};
		const unary_45op=function unary_45op(op_45name){
			return Function("_",(("return "+_ms.show(op_45name))+" _"))
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
		const js_45sub=exports["js-sub"]=Function("obj","prop","return obj[prop]");
		const js_45set=exports["js-set"]=Function("obj","prop","val","obj[prop] = val");
		const js_45delete=exports["js-delete"]=Function("obj","prop","delete obj[prop]");
		const js_45instanceof=exports["js-instanceof"]=op("instanceof");
		const defined_63=exports["defined?"]=function(){
			const built={};
			const doc=built.doc="True for any value except `undefined`.";
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[void 0],false);
				_ms.assoc(built,[0],true);
				return built
			};
			return _ms.set(function defined_63(_){
				return _ms.unlazy(not)(id_61_63(_,void 0))
			},built)
		}();
		const id_61_63=exports["id=?"]=function(){
			const built={};
			const doc=built.doc="For Objects, whether they are the same place in memory.\nFor primitive types, whether they have the same data.\nTODO: Explain (and test) difference between this and js===";
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,["a","a"],true);
				_ms.assoc(built,[["a"],["a"]],false);
				return built
			};
			return _ms.set(Object.is,built,"id=?")
		}();
		const truthy_63=exports["truthy?"]=function(){
			const built={};
			const doc=built.doc="Whether javascript's `if` statement would consider the value to be true.";
			const test=built.test=function test(){
				for(let _ of [null,void 0,0,Number.NaN,"",false][Symbol.iterator]()){
					_ms.unlazy(_33not)(truthy_63,_)
				};
				_ms.unlazy(_33)(truthy_63,[]);
				_ms.unlazy(_33)(truthy_63,true)
			};
			return _ms.set(function truthy_63(_){
				return js_33(js_33(_))
			},built)
		}();
		const _new=exports.new=function(){
			const built={};
			const doc=built.doc="Emulates JavaScript's `new` keyword.\nCreates a new Object whose prototype is `constructor.prototype` and calls the constructor on it.\nWierd things may happen if you try to create a new Error this way.";
			const test=built.test=function test(){
				const My_45Function_45Type=function My_45Function_45Type(a){
					return _ms.unlazy(p_43_33)(this,"a",a)
				};
				const x=_ms.checkContains(My_45Function_45Type,_new(My_45Function_45Type,1),"x");
				_ms.unlazy(_33)(_ms.unlazy(_61_63),x.a,1);
				const y=_ms.checkContains(Error,_new(Error,"Oh no!"),"y");
				_ms.unlazy(_33)(_ms.unlazy(_61_63),y.message,"Oh no!")
			};
			return _ms.set(iNew,built,"new")
		}();
		const js_45typeof=exports["js-typeof"]=function(){
			const built={};
			const doc=built.doc="JavaScript's `typeof` operator.";
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[void 0],"undefined");
				_ms.assoc(built,[null],"object");
				_ms.assoc(built,[true],"boolean");
				_ms.assoc(built,[0],"number");
				_ms.assoc(built,["a"],"string");
				_ms.assoc(built,[Symbol("s")],"symbol");
				_ms.assoc(built,[js_45typeof],"function");
				_ms.assoc(built,[_ms.unlazy(_64)],"object");
				return built
			};
			return _ms.set(unary_45op("typeof"),built,"js-typeof")
		}();
		const apply_45with_45this=exports["apply-with-this"]=function(){
			const built={};
			const doc=built.doc="Like `apply`, and also makes the hidden parameter `this` to be `new-this`.\nActs like `new-this.f ...arguments` if `f` were in the prototype chain of `new-this`.";
			const test=built.test=function test(){
				const built=new global.Map();
				const f=function f(a){
					return _ms.unlazy(_43)(this,a)
				};
				_ms.assoc(built,[f,1,[2]],3);
				return built
			};
			return _ms.set(function apply_45with_45this(f,new_45this,_arguments){
				_ms.checkContains(Function,f,"f");
				_ms.checkContains(_ms.unlazy(_64),_arguments,"arguments");
				return Function.prototype.apply.call(f,new_45this,_ms.unlazy(_61_62)(Array,_arguments))
			},built)
		}();
		const call_45with_45this=exports["call-with-this"]=function(){
			const built={};
			const doc=built.doc="Like `apply-with-this` but does not take a list.";
			const test=built.test=function test(){
				const f=function f(a){
					return _ms.unlazy(_43)(this,a)
				};
				_ms.unlazy(_33)(_ms.unlazy(_61_63),call_45with_45this(f,1,2),3)
			};
			return _ms.set(function call_45with_45this(_,new_45this){
				const args=[].slice.call(arguments,2);
				_ms.checkContains(Function,_,"_");
				return apply_45with_45this(_,new_45this,args)
			},built)
		}();
		const name=exports.name="js";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9qcy5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7RUFZQSxzQkFBTTtFQUVOLFNBQU0sWUFBQSxVQUNPO1VBQVosU0FBVSxJQUFJLElBQUksdUJBQVU7O0VBQzdCLGlCQUFZLG9CQUFBLFVBQ087VUFBbEIsU0FBVSxJQUFJLHFCQUFROztFQUV2QixpQ0FBUSxHQUFJO0VBQ1oscUNBQVUsR0FBSTtFQUNkLCtCQUFNLEdBQUk7RUFDViwrQkFBTSxHQUFJO0VBQ1YsbUNBQU8sR0FBSTtFQUNYLG1DQUFPLEdBQUk7RUFDWCwrQkFBTSxHQUFJO0VBQ1YsMkJBQUssR0FBSTtFQUNULDJCQUFLLEdBQUk7RUFDVCwrQkFBTSxHQUFJO0VBQ1YsK0JBQU0sR0FBSTtFQUNWLDJCQUFLLEdBQUk7RUFDVCwyQkFBSyxHQUFJO0VBQ1QsMkJBQUssR0FBSTtFQUNULDJCQUFLLEdBQUk7RUFDVCxpQ0FBUSxHQUFJO0VBQ1osaUNBQVEsR0FBSTtFQUNaLDRCQUFLLFdBQVU7RUFDZiwyQkFBSyxXQUFVO0VBQ2YsaUNBQVEsU0FBVSxNQUFNLE9BQU87RUFDL0IsaUNBQVEsU0FBVSxNQUFNLE9BQU8sTUFBTTtFQUNyQyx1Q0FBVyxTQUFVLE1BQU0sT0FBTztFQUNsQywrQ0FBZSxHQUFJO0VBR25CLCtDQUNTOztHQUFSLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxRQUFlO29CQUNqQixDQUFFLEdBQU87OztrQkFDVCxvQkFBQSxFQUNDOzJCQUFJLFNBQUssRUFBRTs7O0VBRWQseUNBQ0s7O0dBQUosb0JBQ0M7R0FHRCxzQkFDTyxlQUFBOztvQkFBTixDQUFHLElBQUksS0FBUTtvQkFDZixDQUFFLENBQUcsS0FBSyxDQUFHLE1BQVU7OztrQkFDeEI7O0VBRUQsNkNBQ1E7O0dBQVAsb0JBQU07R0FDTixzQkFDUSxlQUFBO0lBQUYsUUFBQSxLQUFBLENBQUUsS0FBSyxPQUFVLEVBQUUsV0FBWSxHQUFFLDBCQUNPO3dCQUF2QyxVQUFRO0lBQUE7b0JBQ1osVUFBUTtvQkFDUixVQUFRO0dBQUE7a0JBQ1YsbUJBQUEsRUFDQztXQUFELE1BQUksTUFBRztHQUFBOztFQUVULGlDQUNJOztHQUFILG9CQUNDO0dBR0Qsc0JBQ1EsZUFBQTtJQUFQLDJCQUFvQiw4QkFBQSxFQUNDO2dDQUFoQixLQUFNLElBQUc7SUFBQTtJQUNkLDBCQUFFLHFCQUFtQixLQUFJLHFCQUFpQjt1Q0FDckMsSUFBSTtJQUNULDBCQUFFLE1BQVEsS0FBSSxNQUFPO3VDQUNoQixVQUFXO0dBQUE7a0JBQ2pCOztFQUVELGlEQUNVOztHQUFULG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxRQUFnQjtvQkFDbEIsQ0FBRSxNQUFXO29CQUNiLENBQUUsTUFBVztvQkFDYixDQUFFLEdBQVE7b0JBQ1YsQ0FBRyxLQUFTO29CQUNaLENBQUcsT0FBUSxNQUFVO29CQUNyQixDQUFFLGFBQWdCO29CQUNsQixrQkFBVTs7O2tCQUNYLFdBQVU7O0VBR1gsK0RBQ2dCOztHQUFmLG9CQUNDO0dBRUQsc0JBQ08sZUFBQTs7SUFBTixRQUFLLFdBQUEsRUFDQzs0QkFBSCxLQUFLO0lBQUE7b0JBQ1IsQ0FBRSxFQUFFLEVBQUUsQ0FBRSxJQUFTOzs7a0JBQ2pCLDZCQUFBLEVBQVcsV0FBUyxXQUNXO3NCQUQ3Qjs7V0FFRiw4QkFBOEIsRUFBRSw4QkFBYSxNQUFNO0dBQUE7O0VBRXJELDZEQUNlOztHQUFkLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtJQUFQLFFBQUssV0FBQSxFQUNDOzRCQUFILEtBQUs7SUFBQTt1Q0FDRixtQkFBZSxFQUFFLEVBQUUsR0FBRztHQUFBO2tCQUM1Qiw0QkFBQSxFQUFXLFdBQ2dCOztzQkFEekI7V0FDRixvQkFBZ0IsRUFBRSxXQUFTO0dBQUE7O0VBdkg3Qix3QkFBQSIsImZpbGUiOiJqcy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9