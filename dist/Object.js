"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Boolean","./compare","./js","./methods","./Type/Type","./Type/Kind","./at/at","./at/at-Type","./at/q","./at/Map/Map","./at/Set/Id-Setbang","./control","./Objectbang","./bang","./at/Set/Set","./Try"],function(exports,Boolean_0,compare_1,js_2,methods_3,Type_4,Kind_5,_64_6,_64_45Type_7,_63_8,Map_9,Id_45Set_33_10,control_11,Object_33_12,_33_13,Set_14,Try_15){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_ms.get(_$2,"and"),not=_ms.get(_$2,"not"),nor=_ms.get(_$2,"nor"),xor=_ms.get(_$2,"xor"),_$3=_ms.getModule(compare_1),_61_63=_ms.get(_$3,"=?"),_$4=_ms.getModule(js_2),defined_63=_ms.get(_$4,"defined?"),js_61_61=_ms.get(_$4,"js=="),js_45typeof=_ms.get(_$4,"js-typeof"),id_61_63=_ms.get(_$4,"id=?"),js_45sub=_ms.get(_$4,"js-sub"),_$5=_ms.getModule(methods_3),freeze=_ms.get(_$5,"freeze"),_$6=_ms.getModule(Type_4),_61_62=_ms.get(_$6,"=>"),contains_63=_ms.get(_$6,"contains?"),Kind=_ms.getDefaultExport(Kind_5),_64=_ms.lazy(function(){
			return _ms.getDefaultExport(_64_6)
		}),_$9=_ms.lazyGetModule(_64_6),_43_43=_ms.lazyProp(_$9,"++"),all_63=_ms.lazyProp(_$9,"all?"),count=_ms.lazyProp(_$9,"count"),each_33=_ms.lazyProp(_$9,"each!"),empty_63=_ms.lazyProp(_$9,"empty?"),keep=_ms.lazyProp(_$9,"keep"),_$10=_ms.lazyGetModule(_64_45Type_7),empty=_ms.lazyProp(_$10,"empty"),_63=_ms.lazy(function(){
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
				const _k0=[null],_v0=false;
				const _k1=[void 0],_v1=false;
				const _k2=[1],_v2=true;
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2)
			};
			return _ms.set(function can_45get_45p_63(_){
				return not(js_61_61(_,null))
			},"doc",doc,"test",test)
		}();
		const flag_63=exports["flag?"]=function(){
			const doc="If it has a property for the flag, uses that. Otherwise false.";
			const test=function test(){
				const _k0=[{
					a:true
				},"a"],_v0=true;
				const _k1=[{
					a:false
				},"a"],_v1=false;
				const _k2=[empty_45Object,"a"],_v2=false;
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2)
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
				_ms.unlazy(_33)(_ms.unlazy(set_61_63),_64p_45all(obj),["a",sym]);
				return _ms.unlazy(_33)(_ms.unlazy(set_61_63),_64p_45all(_64p_45all),["length","name","prototype","doc","test","name"])
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
				return _ms.checkContains(_ms.sub(_ms.unlazy(_64),Object_45Key),_ms.unlazy(_43_43)(own_45names,Object.getOwnPropertySymbols(_)),"res")
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
				return _ms.unlazy(_33)(_ms.unlazy(set_61_63),_64p(_64p),["doc","test"])
			};
			return _ms.set(function _64p(_){
				return _ms.checkContains(_ms.sub(_ms.unlazy(_64),String),function(){
					if(_ms.bool(can_45get_45p_63(_))){
						return Object.keys(_)
					} else {
						return []
					}
				}(),"res")
			},"doc",doc,"test",test)
		}();
		const _63p=exports["?p"]=function(){
			const doc="`?` containing the value of the property, if it exists.";
			const test=function test(){
				const x=function(){
					const a=1;
					const b=null;
					return {
						a:a,
						b:b,
						name:"x"
					}
				}();
				const _k0=[x,"a"],_v0=_ms.unlazy(_63)(1);
				const _k1=[x,"b"],_v1=_ms.unlazy(_63)(null);
				const _k2=[x,"toString"],_v2=_ms.unlazy(empty)(_ms.unlazy(_63));
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2)
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
				const _k0=[1,"toString"],_v0=_ms.unlazy(_63)(Number.prototype.toString);
				const _k1=[1,"asdfghjkl"],_v1=_ms.unlazy(empty)(_ms.unlazy(_63));
				return _ms.map(_k0,_v0,_k1,_v1)
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
				const x=function(){
					const a=1;
					const b=null;
					return {
						a:a,
						b:b,
						name:"x"
					}
				}();
				const _k0=[x,"a"],_v0=1;
				const _k1=[x,"b"],_v1=null;
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return p("c")
				});
				return _ms.map(_k0,_v0,_k1,_v1)
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
				const x={
					a:1
				};
				const _k0=[x,"a"],_v0=true;
				const _k1=[x,"b"],_v1=false;
				const _k2=[x,"toString"],_v2=false;
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2)
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
				const _k0=[empty_45Object,"toString"],_v0=true;
				return _ms.map(_k0,_v0)
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
				const _k0=[a,b],_v0=true;
				const _k1=[a,c],_v1=false;
				const _k2=[1,1],_v2=true;
				const _k3=[object_61_63,object_61_63],_v3=true;
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3)
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
				return _ms.checkContains(Boolean,function(){
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
				}(),"res")
			},"doc",doc,"test",test)
		}();
		const empty_45Object=exports["empty-Object"]=Object.freeze(Object.create(Object.prototype));
		const empty_45Object_63=exports["empty-Object?"]=function(){
			const doc="Whether there are no properties, not even hidden ones.";
			const test=function test(){
				const _k0=[empty_45Object],_v0=true;
				const _k1=[Object],_v1=false;
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function empty_45Object_63(_){
				_ms.checkContains(Object,_,"_");
				return _ms.unlazy(empty_63)(_64p_45all(_))
			},"doc",doc,"test",test)
		}();
		const Object_45_62Map=exports["Object->Map"]=function(){
			const doc="A Map whose keys are property names and whose values are the properties' values.";
			const test=function test(){
				const _k0=[{
					a:1,
					b:2
				}],_v0=function(){
					const _k0="a",_v0=1;
					const _k1="b",_v1=2;
					return _ms.map(_k0,_v0,_k1,_v1)
				}();
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function Object_45_62Map(_){
				return _ms.unlazy(make_45map)(_64p(_),_ms.sub(p,_))
			},"doc",doc,"test",test)
		}();
		const Map_45_62Object=exports["Map->Object"]=function(){
			const doc="Given a Map whose keys are Strings, creates an Object whose Object->Map is that.";
			const test=function test(){
				const map=function(){
					const _k0="a",_v0=1;
					const _k1="b",_v1=2;
					return _ms.map(_k0,_v0,_k1,_v1)
				}();
				const _k0=[map],_v0={
					a:1,
					b:2
				};
				_ms.unlazy(_33)(_61_63,map,Object_45_62Map(Map_45_62Object(map)));
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return Map_45_62Object(function(){
						const _k0=1,_v0=2;
						return _ms.map(_k0,_v0)
					}())
				});
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function Map_45_62Object(_){
				_ms.checkContains(_ms.unlazy(Map),_,"_");
				return _ms.unlazy(returning)(_ms.unlazy(empty_45Object_33)(),function(obj){
					_ms.unlazy(each_33)(_,function(pair){
						return _ms.unlazy(p_43_33)(obj,pair.key,pair.val)
					});
					return freeze(obj)
				})
			},"doc",doc,"test",test)
		}();
		const prototype=exports.prototype=function(){
			const doc="Gets prototype of an object.";
			const test=function test(){
				const _k0=[empty_45Object],_v0=Object.prototype;
				const _k1=[Object_45Key],_v1=Kind.prototype;
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(Object.getPrototypeOf,"doc",doc,"test",test,"name","prototype")
		}();
		const name=exports.name="Object";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9PYmplY3QubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0VBb0JBLHlDQUFZLGVBQ0k7R0FBZixVQUFNO0dBQ04sbUJBQWMsQ0FBRSxPQUFPOzs7Ozs7O0VBRXhCLHVEQUNXO0dBQVYsVUFBTTtHQUNOLFdBQ08sZUFBQTtJQUFOLFVBQUEsQ0FBRSxVQUFVO0lBQ1osVUFBQSxDQUFFLFlBQWU7SUFDakIsVUFBQSxDQUFFLE9BQU87OztrQkFDVCwwQkFBQSxFQUNDO1dBQUQsSUFBSyxTQUFLLEVBQUU7R0FBQTs7RUFFZCx5Q0FDTTtHQUFMLFVBQU07R0FDTixXQUNPLGVBQUE7SUFDTixVQUFBLENBQUU7T0FBSTtJQUFBLEVBQU8sU0FBUTtJQUNyQixVQUFBLENBQUU7T0FBSTtJQUFBLEVBQVEsU0FBUTtJQUN0QixVQUFBLENBQUUsZUFBYyxTQUFROzs7a0JBQ3hCLGlCQUFTLElBQUksS0FDZTtzQkFEVjs2QkFBakIsNkJBQ0ssS0FBRyxJQUFJLE1BQU07OztFQUVyQjtVQUF1QiwrQkFBVyxDQUFHLFlBQVk7RUFBQTtFQUNqRCw2Q0FDTztHQUFOLFVBQ0M7R0FHRCxXQUNPLGVBQUE7SUFBTjt3QkFDSSxJQUFLLElBQUc7SUFDWixVQUFNLE9BQVE7SUFDZCxzQkFBc0IsSUFBSSxjQUNHO0tBQTVCLFlBQU87S0FDUCxpQkFBWTs7Ozs7OzBDQUNKLFdBQU8sS0FBSyxDQUFHLElBQUc7aURBR2xCLFdBQU8sWUFBUSxDQUFHLFNBQVMsT0FBTyxZQUFZLE1BQU0sT0FBTztHQUFBO2tCQUNwRSxvQkFBZSxFQUNDO0lBQWhCLFlBQVEsMkJBQTJCO0lBRW5DO0tBQ0MseUJBQUMsU0FBRCxJQUNTOzhCQUFILE1BQU8sU0FBQSxLQUNJO2NBQWYsSUFBSyxnREFBOEI7TUFBQTtLQUFBLE9BRWpDO2FBQUg7S0FBQTtJQUFBO3FEQVJDLGlDQVNBLFlBQVcsNkJBQTZCOzs7RUFF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