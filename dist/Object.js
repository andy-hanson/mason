"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Boolean","./compare","./js","./methods","./Type/Type","./Type/Kind","./at/at","./at/at-Type","./at/q","./at/Map/Map","./at/Set/Id-Setbang","./control","./Objectbang","./at/Set/Set","./Try"],function(exports,Boolean_0,compare_1,js_2,methods_3,Type_4,Kind_5,_64_6,_64_45Type_7,_63_8,Map_9,Id_45Set_33_10,control_11,Object_33_12,Set_13,Try_14){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),xor=_ms.get(_$2,"xor"),_$3=_ms.getModule(compare_1),_61_63=_ms.get(_$3,"=?"),_$4=_ms.getModule(js_2),defined_63=_ms.get(_$4,"defined?"),js_61_61=_ms.get(_$4,"js=="),js_45typeof=_ms.get(_$4,"js-typeof"),id_61_63=_ms.get(_$4,"id=?"),js_45sub=_ms.get(_$4,"js-sub"),_$5=_ms.getModule(methods_3),freeze=_ms.get(_$5,"freeze"),_$6=_ms.getModule(Type_4),_61_62=_ms.get(_$6,"=>"),contains_63=_ms.get(_$6,"contains?"),Kind=_ms.getDefaultExport(Kind_5),_$9=_ms.lazyGetModule(_64_6),_43_43=_ms.lazyProp(_$9,"++"),all_63=_ms.lazyProp(_$9,"all?"),count=_ms.lazyProp(_$9,"count"),empty_63=_ms.lazyProp(_$9,"empty?"),keep=_ms.lazyProp(_$9,"keep"),_$10=_ms.lazyGetModule(_64_45Type_7),empty=_ms.lazyProp(_$10,"empty"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_8)
		}),_$11=_ms.lazyGetModule(_63_8),_63_45or=_ms.lazyProp(_$11,"?-or"),Opt_45_62_63=_ms.lazyProp(_$11,"Opt->?"),Map=_ms.lazy(function(){
			return _ms.getDefaultExport(Map_9)
		}),_$12=_ms.lazyGetModule(Map_9),make_45map=_ms.lazyProp(_$12,"make-map"),Id_45Set_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Id_45Set_33_10)
		}),_$14=_ms.lazyGetModule(control_11),returning=_ms.lazyProp(_$14,"returning"),_$15=_ms.lazyGetModule(Object_33_12),empty_45Object_33=_ms.lazyProp(_$15,"empty-Object!"),p_43_33=_ms.lazyProp(_$15,"p+!"),_$17=_ms.lazyGetModule(Set_13),set_61_63=_ms.lazyProp(_$17,"set=?"),_$18=_ms.lazyGetModule(Try_14),fails_63=_ms.lazyProp(_$18,"fails?");
		const Object_45Key=exports["Object-Key"]=Kind(function(){
			const built={};
			const doc=built.doc=`Can be used as a name for a property of an object.`;
			const implementors=built.implementors=[String,Symbol];
			return _ms.setName(built,"Object-Key")
		}());
		const can_45get_45p_63=exports["can-get-p?"]=function(){
			const built={};
			const doc=built.doc=`Whether it's safe to try to directly access properties.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[null],false);
				_ms.assoc(built,[void 0],false);
				_ms.assoc(built,[1],true);
				return built
			};
			return _ms.set(function can_45get_45p_63(_){
				return ! js_61_61(_,null)
			},built)
		}();
		const flag_63=exports["flag?"]=function(){
			const built={};
			const doc=built.doc=`If it has a property for the flag, uses that. Otherwise false.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[{
					a:true
				},`a`],true);
				_ms.assoc(built,[{
					a:false
				},`a`],false);
				_ms.assoc(built,[empty_45Object,`a`],false);
				return built
			};
			return _ms.set(function flag_63(obj,flag){
				_ms.checkContains(Object_45Key,flag,"flag");
				return _ms.checkContains(Boolean,_ms.unlazy(_63_45or)(_63p(obj,flag),false),"res")
			},built)
		}();
		const forbidden_45fun_45props=_ms.lazy(function(){
			return _61_62(_ms.unlazy(Id_45Set_33),[`arguments`,`caller`])
		});
		const _64p_45all=exports["@p-all"]=function(){
			const built={};
			const doc=built.doc=`Every property name directly stored in an object.\nIncludes non-enumerable properties and symbols.`;
			const test=built.test=function test(){
				const obj=_ms.unlazy(empty_45Object_33)();
				_ms.unlazy(p_43_33)(obj,`a`,0);
				const sym=Symbol(`s`);
				Object.defineProperty(obj,sym,function(){
					const built={};
					const value=built.value=0;
					const enumerable=built.enumerable=false;
					return built
				}());
				_ms.assert(_ms.unlazy(set_61_63),_64p_45all([0,0]),[`0`,`1`,`length`]);
				_ms.assert(_ms.unlazy(set_61_63),_64p_45all(obj),[`a`,sym]);
				_ms.assert(_ms.unlazy(set_61_63),_64p_45all(_64p_45all),[`length`,`name`,`prototype`,`doc`,`test`,`name`])
			};
			return _ms.set(function _64p_45all(_){
				const props=Object.getOwnPropertyNames(_);
				const own_45names=function(){
					if(_ms.bool(_ms.contains(Function,_))){
						return _ms.unlazy(keep)(props,function(name){
							return ! contains_63(_ms.unlazy(forbidden_45fun_45props),name)
						})
					} else {
						return props
					}
				}();
				return _ms.unlazy(_43_43)(own_45names,Object.getOwnPropertySymbols(_))
			},built)
		}();
		const _64p=exports["@p"]=function(){
			const built={};
			const doc=built.doc=`Like @p-all, but excludes non-enumerable properties and symbols.`;
			const test=built.test=function test(){
				const obj=_ms.unlazy(empty_45Object_33)();
				Object.defineProperty(obj,`a`,function(){
					const built={};
					const value=built.value=0;
					const enumerable=built.enumerable=false;
					return built
				}());
				const sym=Symbol(`s`);
				Object.defineProperty(obj,sym,function(){
					const built={};
					const value=built.value=0;
					const enumerable=built.enumerable=true;
					return built
				}());
				_ms.assert(_ms.unlazy(empty_63),_64p(obj));
				_ms.assert(_ms.unlazy(set_61_63),_64p(_64p),[`doc`,`test`])
			};
			return _ms.set(function _64p(_){
				return function(){
					if(_ms.bool(can_45get_45p_63(_))){
						return Object.keys(_)
					} else {
						return []
					}
				}()
			},built)
		}();
		const _63p=exports["?p"]=function(){
			const built={};
			const doc=built.doc=`\`?\` containing the value of the property, if it exists.`;
			const test=built.test=function test(){
				const built=new global.Map();
				const x=function(){
					const built={};
					const a=built.a=1;
					const b=built.b=null;
					return _ms.setName(built,"x")
				}();
				_ms.assoc(built,[x,`a`],_ms.unlazy(_63)(1));
				_ms.assoc(built,[x,`b`],_ms.unlazy(_63)(null));
				_ms.assoc(built,[x,`toString`],_ms.unlazy(empty)(_ms.unlazy(_63)));
				return built
			};
			return _ms.set(function _63p(_,name){
				_ms.checkContains(Object_45Key,name,"name");
				return function(){
					if(_ms.bool(p_63(_,name))){
						return _ms.unlazy(_63)(js_45sub(_,name))
					} else {
						return _ms.unlazy(empty)(_ms.unlazy(_63))
					}
				}()
			},built)
		}();
		const _63p_45with_45proto=exports["?p-with-proto"]=function(){
			const built={};
			const doc=built.doc=`Like \`?p\`, but also looks through the prototype chain.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[1,`toString`],_ms.unlazy(_63)(Number.prototype.toString));
				_ms.assoc(built,[1,`asdfghjkl`],_ms.unlazy(empty)(_ms.unlazy(_63)));
				return built
			};
			return _ms.set(function _63p_45with_45proto(_,name){
				_ms.checkContains(Object_45Key,name,"name");
				return function(){
					if(_ms.bool(can_45get_45p_63(_))){
						return _ms.unlazy(Opt_45_62_63)(js_45sub(_,name))
					} else {
						return _ms.unlazy(empty)(_ms.unlazy(_63))
					}
				}()
			},built)
		}();
		const p=exports.p=function(){
			const built={};
			const doc=built.doc=`Gets the value of a property. Does not include properties in the prototype.`;
			const test=built.test=function test(){
				const built=new global.Map();
				const x=function(){
					const built={};
					const a=built.a=1;
					const b=built.b=null;
					return _ms.setName(built,"x")
				}();
				_ms.assoc(built,[x,`a`],1);
				_ms.assoc(built,[x,`b`],null);
				_ms.assert(_ms.unlazy(fails_63),function(){
					return p(`c`)
				});
				return built
			};
			return _ms.set(function p(_,name){
				_ms.checkContains(Object_45Key,name,"name");
				_ms.assert(p_63,_,name);
				return js_45sub(_,name)
			},built)
		}();
		const p_63=exports["p?"]=function(){
			const built={};
			const doc=built.doc=`Whether there is a property by that name.`;
			const test=built.test=function test(){
				const built=new global.Map();
				const x={
					a:1
				};
				_ms.assoc(built,[x,`a`],true);
				_ms.assoc(built,[x,`b`],false);
				_ms.assoc(built,[x,`toString`],false);
				return built
			};
			return _ms.set(function p_63(_,name){
				_ms.checkContains(Object_45Key,name,"name");
				return (can_45get_45p_63(_)&&Object.prototype.hasOwnProperty.call(_,name))
			},built)
		}();
		const p_45with_45proto_63=exports["p-with-proto?"]=function(){
			const built={};
			const doc=built.doc=`Like \`p?\` but looks through the prototype.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[empty_45Object,`toString`],true);
				return built
			};
			return _ms.set(function p_45with_45proto_63(_,name){
				_ms.checkContains(Object_45Key,name,"name");
				return (can_45get_45p_63(_)&&defined_63(js_45sub(_,name)))
			},built)
		}();
		const object_61_63=exports["object=?"]=function(){
			const built={};
			const doc=built.doc=`For Objects, whether they are of the same type and have \`=?\` properties.\nFor primitives, whether they are \`=?\`.`;
			const test=built.test=function test(){
				const built=new global.Map();
				const a=function(){
					const built={};
					const a=built.a=1;
					return _ms.setName(built,"a")
				}();
				const b=function(){
					const built={};
					const name=built.name=`a`;
					const a=built.a=1;
					return built
				}();
				const c=function(){
					const built={};
					const x=built.x=3;
					return _ms.setName(built,"c")
				}();
				_ms.assoc(built,[a,b],true);
				_ms.assoc(built,[a,c],false);
				_ms.assoc(built,[1,1],true);
				_ms.assoc(built,[object_61_63,object_61_63],true);
				return built
			};
			return _ms.set(function object_61_63(a,b){
				const null_45a=id_61_63(a,null);
				const null_45b=id_61_63(b,null);
				const obj_45a=(! null_45a&&id_61_63(js_45typeof(a),`object`));
				const obj_45b=(! null_45b&&id_61_63(js_45typeof(b),`object`));
				return function(){
					if(_ms.bool(! (obj_45a||obj_45b))){
						return id_61_63(a,b)
					} else if(_ms.bool(xor(obj_45a,obj_45b))){
						return false
					} else {
						const same_45type=id_61_63(Object.getPrototypeOf(a),Object.getPrototypeOf(b));
						return (same_45type&&function(){
							const ak=Object.getOwnPropertyNames(a);
							const bk=Object.getOwnPropertyNames(b);
							return (_61_63(_ms.unlazy(count)(ak),_ms.unlazy(count)(bk))&&function(){
								return _ms.unlazy(all_63)(ak,function(k){
									return _61_63(js_45sub(a,k),js_45sub(b,k))
								})
							}())
						}())
					}
				}()
			},built)
		}();
		const empty_45Object=exports["empty-Object"]=Object.freeze(Object.create(Object.prototype));
		const empty_45Object_63=exports["empty-Object?"]=function(){
			const built={};
			const doc=built.doc=`Whether there are no properties, not even hidden ones.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[empty_45Object],true);
				_ms.assoc(built,[Object],false);
				return built
			};
			return _ms.set(function empty_45Object_63(_){
				_ms.checkContains(Object,_,"_");
				return _ms.unlazy(empty_63)(_64p_45all(_))
			},built)
		}();
		const Object_45_62Map=exports["Object->Map"]=function(){
			const built={};
			const doc=built.doc=`A Map whose keys are property names and whose values are the properties' values.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[{
					a:1,
					b:2
				}],function(){
					const built=new global.Map();
					_ms.assoc(built,`a`,1);
					_ms.assoc(built,`b`,2);
					return built
				}());
				return built
			};
			return _ms.set(function Object_45_62Map(_){
				return _ms.unlazy(make_45map)(_64p(_),_ms.sub(p,_))
			},built)
		}();
		const Map_45_62Object=exports["Map->Object"]=function(){
			const built={};
			const doc=built.doc=`Given a Map whose keys are Strings, creates an Object whose Object->Map is that.`;
			const test=built.test=function test(){
				const built=new global.Map();
				const map=function(){
					const built=new global.Map();
					_ms.assoc(built,`a`,1);
					_ms.assoc(built,`b`,2);
					return built
				}();
				_ms.assoc(built,[map],{
					a:1,
					b:2
				});
				_ms.assert(_61_63,map,Object_45_62Map(Map_45_62Object(map)));
				_ms.assert(_ms.unlazy(fails_63),function(){
					return Map_45_62Object(function(){
						const built=new global.Map();
						_ms.assoc(built,1,2);
						return built
					}())
				});
				return built
			};
			return _ms.set(function Map_45_62Object(_){
				_ms.checkContains(_ms.unlazy(Map),_,"_");
				return _ms.unlazy(returning)(_ms.unlazy(empty_45Object_33)(),function(obj){
					for(let _ of _){
						_ms.unlazy(p_43_33)(obj,_ms.sub(_,0),_ms.sub(_,1))
					};
					freeze(obj)
				})
			},built)
		}();
		const prototype=exports.prototype=function(){
			const built={};
			const doc=built.doc=`Gets prototype of an object.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[empty_45Object],Object.prototype);
				_ms.assoc(built,[Object_45Key],Kind.prototype);
				return built
			};
			return _ms.set(Object.getPrototypeOf,built,"prototype")
		}();
		const name=exports.name=`Object`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9PYmplY3QubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7RUFtQkEseUNBQVksZUFDSTs7R0FBZixvQkFBTTtHQUNOLHNDQUFjLENBQUUsT0FBTzs7O0VBRXhCLHVEQUNXOztHQUFWLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxNQUFVO29CQUNaLENBQUUsUUFBZTtvQkFDakIsQ0FBRSxHQUFPOzs7a0JBQ1QsMEJBQUEsRUFDQztXQUFELEVBQUksU0FBSyxFQUFFO0dBQUE7O0VBRWIseUNBQ007O0dBQUwsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFDTixDQUFFO09BQUk7SUFBQSxFQUFPLEtBQVE7b0JBQ3JCLENBQUU7T0FBSTtJQUFBLEVBQVEsS0FBUTtvQkFDdEIsQ0FBRSxlQUFjLEtBQVE7OztrQkFDeEIsaUJBQVMsSUFBSSxLQUNlO3NCQURWOzZCQUFqQiw2QkFDSyxLQUFHLElBQUksTUFBTTs7O0VBRXJCO1VBQXVCLCtCQUFXLENBQUcsWUFBWTs7RUFDakQsNkNBQ087O0dBQU4sb0JBQ0M7R0FFRCxzQkFDUSxlQUFBO0lBQVA7d0JBQ0ksSUFBSyxJQUFHO0lBQ1osVUFBTSxPQUFRO0lBQ2Qsc0JBQXNCLElBQUksY0FDRzs7S0FBNUIsd0JBQU87S0FDUCxrQ0FBWTs7O3FDQUNFLFdBQU8sQ0FBRSxFQUFFLElBQUssQ0FBRyxJQUFJLElBQUk7cUNBQzNCLFdBQU8sS0FBSyxDQUFHLElBQUc7cUNBR2xCLFdBQU8sWUFBUSxDQUFHLFNBQVMsT0FBTyxZQUFZLE1BQU0sT0FBTzs7a0JBQzFFLG9CQUFBLEVBQ0M7SUFBRCxZQUFRLDJCQUEwQjtJQUVsQztLQUNDLHlCQUFDLFNBQUQsSUFDUzs4QkFBSCxNQUFPLFNBQUEsS0FDSTtjQUFmLEVBQUksZ0RBQThCO01BQUE7S0FBQSxPQUVoQzthQUFIO0tBQUE7SUFBQTs4QkFDQyxZQUFXLDZCQUE2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