"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Boolean","./compare","./js","./methods","./Type/Type","./Type/Kind","./at/at","./at/at-Type","./at/q","./at/Map/Map","./at/Set/Id-Setbang","./control","./Objectbang","./bang","./at/Set/Set","./Try"],function(exports,Boolean_0,compare_1,js_2,methods_3,Type_4,Kind_5,_64_6,_64_45Type_7,_63_8,Map_9,Id_45Set_33_10,control_11,Object_33_12,_33_13,Set_14,Try_15){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_ms.get(_$2,"and"),not=_ms.get(_$2,"not"),nor=_ms.get(_$2,"nor"),xor=_ms.get(_$2,"xor"),_$3=_ms.getModule(compare_1),_61_63=_ms.get(_$3,"=?"),_$4=_ms.getModule(js_2),defined_63=_ms.get(_$4,"defined?"),js_61_61=_ms.get(_$4,"js=="),js_45typeof=_ms.get(_$4,"js-typeof"),id_61_63=_ms.get(_$4,"id=?"),js_45sub=_ms.get(_$4,"js-sub"),_$5=_ms.getModule(methods_3),freeze=_ms.get(_$5,"freeze"),_$6=_ms.getModule(Type_4),_61_62=_ms.get(_$6,"=>"),contains_63=_ms.get(_$6,"contains?"),Kind=_ms.getDefaultExport(Kind_5),_$9=_ms.lazyGetModule(_64_6),_43_43=_ms.lazyProp(_$9,"++"),all_63=_ms.lazyProp(_$9,"all?"),count=_ms.lazyProp(_$9,"count"),empty_63=_ms.lazyProp(_$9,"empty?"),keep=_ms.lazyProp(_$9,"keep"),_$10=_ms.lazyGetModule(_64_45Type_7),empty=_ms.lazyProp(_$10,"empty"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_8)
		}),_$11=_ms.lazyGetModule(_63_8),_63_45or=_ms.lazyProp(_$11,"?-or"),Opt_45_62_63=_ms.lazyProp(_$11,"Opt->?"),Map=_ms.lazy(function(){
			return _ms.getDefaultExport(Map_9)
		}),_$12=_ms.lazyGetModule(Map_9),make_45map=_ms.lazyProp(_$12,"make-map"),Id_45Set_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Id_45Set_33_10)
		}),_$14=_ms.lazyGetModule(control_11),returning=_ms.lazyProp(_$14,"returning"),_$15=_ms.lazyGetModule(Object_33_12),empty_45Object_33=_ms.lazyProp(_$15,"empty-Object!"),p_43_33=_ms.lazyProp(_$15,"p+!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_13)
		}),_$18=_ms.lazyGetModule(Set_14),set_61_63=_ms.lazyProp(_$18,"set=?"),_$19=_ms.lazyGetModule(Try_15),fails_63=_ms.lazyProp(_$19,"fails?");
		const Object_45Key=exports["Object-Key"]=Kind(function(){
			const doc="Can be used as a name for a property of an object.";
			const implementors=[String,Symbol];
			return {
				doc:doc,
				implementors:implementors,
				name:"Object-Key"
			}
		}());
		const can_45get_45p_63=exports["can-get-p?"]=function(){
			const doc="Whether it's safe to try to directly access properties.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[null],false);
				_ms.assoc(built,[void 0],false);
				_ms.assoc(built,[1],true);
				return built
			};
			return _ms.set(function can_45get_45p_63(_){
				return not(js_61_61(_,null))
			},"doc",doc,"test",test)
		}();
		const flag_63=exports["flag?"]=function(){
			const doc="If it has a property for the flag, uses that. Otherwise false.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[{
					a:true
				},"a"],true);
				_ms.assoc(built,[{
					a:false
				},"a"],false);
				_ms.assoc(built,[empty_45Object,"a"],false);
				return built
			};
			return _ms.set(function flag_63(obj,flag){
				_ms.checkContains(Object_45Key,flag,"flag");
				return _ms.checkContains(Boolean,_ms.unlazy(_63_45or)(_63p(obj,flag),false),"res")
			},"doc",doc,"test",test)
		}();
		const forbidden_45fun_45props=_ms.lazy(function(){
			return _61_62(_ms.unlazy(Id_45Set_33),["arguments","caller"])
		});
		const _64p_45all=exports["@p-all"]=function(){
			const doc="Every property name directly stored in an object.\nIncludes non-enumerable properties and symbols.";
			const test=function test(){
				const obj=_ms.unlazy(empty_45Object_33)();
				_ms.unlazy(p_43_33)(obj,"a",0);
				const sym=Symbol("s");
				Object.defineProperty(obj,sym,function(){
					const value=0;
					const enumerable=false;
					return {
						value:value,
						enumerable:enumerable
					}
				}());
				_ms.unlazy(_33)(_ms.unlazy(set_61_63),_64p_45all([0,0]),["0","1","length"]);
				_ms.unlazy(_33)(_ms.unlazy(set_61_63),_64p_45all(obj),["a",sym]);
				_ms.unlazy(_33)(_ms.unlazy(set_61_63),_64p_45all(_64p_45all),["length","name","prototype","doc","test","name"])
			};
			return _ms.set(function _64p_45all(_){
				const props=Object.getOwnPropertyNames(_);
				const own_45names=function(){
					if(_ms.bool(_ms.contains(Function,_))){
						return _ms.unlazy(keep)(props,function(name){
							return not(contains_63(_ms.unlazy(forbidden_45fun_45props),name))
						})
					} else {
						return props
					}
				}();
				return _ms.unlazy(_43_43)(own_45names,Object.getOwnPropertySymbols(_))
			},"doc",doc,"test",test)
		}();
		const _64p=exports["@p"]=function(){
			const doc="Like @p-all, but excludes non-enumerable properties and symbols.";
			const test=function test(){
				const obj=_ms.unlazy(empty_45Object_33)();
				Object.defineProperty(obj,"a",function(){
					const value=0;
					const enumerable=false;
					return {
						value:value,
						enumerable:enumerable
					}
				}());
				const sym=Symbol("s");
				Object.defineProperty(obj,sym,function(){
					const value=0;
					const enumerable=true;
					return {
						value:value,
						enumerable:enumerable
					}
				}());
				_ms.unlazy(_33)(_ms.unlazy(empty_63),_64p(obj));
				_ms.unlazy(_33)(_ms.unlazy(set_61_63),_64p(_64p),["doc","test"])
			};
			return _ms.set(function _64p(_){
				return function(){
					if(_ms.bool(can_45get_45p_63(_))){
						return Object.keys(_)
					} else {
						return []
					}
				}()
			},"doc",doc,"test",test)
		}();
		const _63p=exports["?p"]=function(){
			const doc="`?` containing the value of the property, if it exists.";
			const test=function test(){
				const built=new global.Map();
				const x=function(){
					const a=1;
					const b=null;
					return {
						a:a,
						b:b,
						name:"x"
					}
				}();
				_ms.assoc(built,[x,"a"],_ms.unlazy(_63)(1));
				_ms.assoc(built,[x,"b"],_ms.unlazy(_63)(null));
				_ms.assoc(built,[x,"toString"],_ms.unlazy(empty)(_ms.unlazy(_63)));
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
			},"doc",doc,"test",test)
		}();
		const _63p_45with_45proto=exports["?p-with-proto"]=function(){
			const doc="Like `?p`, but also looks through the prototype chain.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[1,"toString"],_ms.unlazy(_63)(Number.prototype.toString));
				_ms.assoc(built,[1,"asdfghjkl"],_ms.unlazy(empty)(_ms.unlazy(_63)));
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
			},"doc",doc,"test",test)
		}();
		const p=exports.p=function(){
			const doc="Gets the value of a property. Does not include properties in the prototype.";
			const test=function test(){
				const built=new global.Map();
				const x=function(){
					const a=1;
					const b=null;
					return {
						a:a,
						b:b,
						name:"x"
					}
				}();
				_ms.assoc(built,[x,"a"],1);
				_ms.assoc(built,[x,"b"],null);
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return p("c")
				});
				return built
			};
			return _ms.set(function p(_,name){
				_ms.checkContains(Object_45Key,name,"name");
				_ms.unlazy(_33)(p_63,_,name);
				return js_45sub(_,name)
			},"doc",doc,"test",test)
		}();
		const p_63=exports["p?"]=function(){
			const doc="Whether there is a property by that name.";
			const test=function test(){
				const built=new global.Map();
				const x={
					a:1
				};
				_ms.assoc(built,[x,"a"],true);
				_ms.assoc(built,[x,"b"],false);
				_ms.assoc(built,[x,"toString"],false);
				return built
			};
			return _ms.set(function p_63(_,name){
				_ms.checkContains(Object_45Key,name,"name");
				return and(can_45get_45p_63(_),_ms.lazy(function(){
					return Object.prototype.hasOwnProperty.call(_,name)
				}))
			},"doc",doc,"test",test)
		}();
		const p_45with_45proto_63=exports["p-with-proto?"]=function(){
			const doc="Like `p?` but looks through the prototype.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[empty_45Object,"toString"],true);
				return built
			};
			return _ms.set(function p_45with_45proto_63(_,name){
				_ms.checkContains(Object_45Key,name,"name");
				return and(can_45get_45p_63(_),_ms.lazy(function(){
					return defined_63(js_45sub(_,name))
				}))
			},"doc",doc,"test",test)
		}();
		const object_61_63=exports["object=?"]=function(){
			const doc="For Objects, whether they are of the same type and have `=?` properties.\nFor primitives, whether they are `=?`.";
			const test=function test(){
				const built=new global.Map();
				const a=function(){
					const a=1;
					return {
						a:a,
						name:"a"
					}
				}();
				const b=function(){
					const name="a";
					const a=1;
					return {
						name:name,
						a:a
					}
				}();
				const c=function(){
					const x=3;
					return {
						x:x,
						name:"c"
					}
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
				const obj_45a=and(not(null_45a),_ms.lazy(function(){
					return id_61_63(js_45typeof(a),"object")
				}));
				const obj_45b=and(not(null_45b),_ms.lazy(function(){
					return id_61_63(js_45typeof(b),"object")
				}));
				return function(){
					if(_ms.bool(nor(obj_45a,obj_45b))){
						return id_61_63(a,b)
					} else if(_ms.bool(xor(obj_45a,obj_45b))){
						return false
					} else {
						const same_45type=id_61_63(Object.getPrototypeOf(a),Object.getPrototypeOf(b));
						return and(same_45type,_ms.lazy(function(){
							return function(){
								const ak=Object.getOwnPropertyNames(a);
								const bk=Object.getOwnPropertyNames(b);
								return and(_61_63(_ms.unlazy(count)(ak),_ms.unlazy(count)(bk)),_ms.lazy(function(){
									return function(){
										return _ms.unlazy(all_63)(ak,function(k){
											return _61_63(js_45sub(a,k),js_45sub(b,k))
										})
									}()
								}))
							}()
						}))
					}
				}()
			},"doc",doc,"test",test)
		}();
		const empty_45Object=exports["empty-Object"]=Object.freeze(Object.create(Object.prototype));
		const empty_45Object_63=exports["empty-Object?"]=function(){
			const doc="Whether there are no properties, not even hidden ones.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[empty_45Object],true);
				_ms.assoc(built,[Object],false);
				return built
			};
			return _ms.set(function empty_45Object_63(_){
				_ms.checkContains(Object,_,"_");
				return _ms.unlazy(empty_63)(_64p_45all(_))
			},"doc",doc,"test",test)
		}();
		const Object_45_62Map=exports["Object->Map"]=function(){
			const doc="A Map whose keys are property names and whose values are the properties' values.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[{
					a:1,
					b:2
				}],function(){
					const built=new global.Map();
					_ms.assoc(built,"a",1);
					_ms.assoc(built,"b",2);
					return built
				}());
				return built
			};
			return _ms.set(function Object_45_62Map(_){
				return _ms.unlazy(make_45map)(_64p(_),_ms.sub(p,_))
			},"doc",doc,"test",test)
		}();
		const Map_45_62Object=exports["Map->Object"]=function(){
			const doc="Given a Map whose keys are Strings, creates an Object whose Object->Map is that.";
			const test=function test(){
				const built=new global.Map();
				const map=function(){
					const built=new global.Map();
					_ms.assoc(built,"a",1);
					_ms.assoc(built,"b",2);
					return built
				}();
				_ms.assoc(built,[map],{
					a:1,
					b:2
				});
				_ms.unlazy(_33)(_61_63,map,Object_45_62Map(Map_45_62Object(map)));
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
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
					for(let _ of _[Symbol.iterator]()){
						_ms.unlazy(p_43_33)(obj,_ms.sub(_,0),_ms.sub(_,1))
					};
					freeze(obj)
				})
			},"doc",doc,"test",test)
		}();
		const prototype=exports.prototype=function(){
			const doc="Gets prototype of an object.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[empty_45Object],Object.prototype);
				_ms.assoc(built,[Object_45Key],Kind.prototype);
				return built
			};
			return _ms.set(Object.getPrototypeOf,"doc",doc,"test",test,"name","prototype")
		}();
		const name=exports.name="Object";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9PYmplY3QubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztFQW9CQSx5Q0FBWSxlQUNJO0dBQWYsVUFBTTtHQUNOLG1CQUFjLENBQUUsT0FBTzs7Ozs7OztFQUV4Qix1REFDVztHQUFWLFVBQU07R0FDTixXQUNPLGVBQUE7O29CQUFOLENBQUUsTUFBVTtvQkFDWixDQUFFLFFBQWU7b0JBQ2pCLENBQUUsR0FBTzs7O2tCQUNULDBCQUFBLEVBQ0M7V0FBRCxJQUFLLFNBQUssRUFBRTtHQUFBOztFQUVkLHlDQUNNO0dBQUwsVUFBTTtHQUNOLFdBQ08sZUFBQTs7b0JBQ04sQ0FBRTtPQUFJO0lBQUEsRUFBTyxLQUFRO29CQUNyQixDQUFFO09BQUk7SUFBQSxFQUFRLEtBQVE7b0JBQ3RCLENBQUUsZUFBYyxLQUFROzs7a0JBQ3hCLGlCQUFTLElBQUksS0FDZTtzQkFEVjs2QkFBakIsNkJBQ0ssS0FBRyxJQUFJLE1BQU07OztFQUVyQjtVQUF1QiwrQkFBVyxDQUFHLFlBQVk7RUFBQTtFQUNqRCw2Q0FDTztHQUFOLFVBQ0M7R0FFRCxXQUNRLGVBQUE7SUFBUDt3QkFDSSxJQUFLLElBQUc7SUFDWixVQUFNLE9BQVE7SUFDZCxzQkFBc0IsSUFBSSxjQUNHO0tBQTVCLFlBQU87S0FDUCxpQkFBWTs7Ozs7OzBDQUNKLFdBQU8sQ0FBRSxFQUFFLElBQUssQ0FBRyxJQUFJLElBQUk7MENBQzNCLFdBQU8sS0FBSyxDQUFHLElBQUc7MENBR2xCLFdBQU8sWUFBUSxDQUFHLFNBQVMsT0FBTyxZQUFZLE1BQU0sT0FBTztHQUFBO2tCQUNwRSxvQkFBQSxFQUNDO0lBQUQsWUFBUSwyQkFBMEI7SUFFbEM7S0FDQyx5QkFBQyxTQUFELElBQ1M7OEJBQUgsTUFBTyxTQUFBLEtBQ0k7Y0FBZixJQUFLLGdEQUE4QjtNQUFBO0tBQUEsT0FFakM7YUFBSDtLQUFBO0lBQUE7OEJBQ0MsWUFBVyw2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