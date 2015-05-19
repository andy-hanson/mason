"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Boolean","./compare","./js","./methods","./Type/Type","./Type/Kind","./at/at","./at/at-Type","./at/q","./at/Map/Map","./at/Set/Id-Setbang","./control","./Objectbang","./bang","./at/Set/Set","./Try"],function(exports,Boolean_0,compare_1,js_2,methods_3,Type_4,Kind_5,_64_6,_64_45Type_7,_63_8,Map_9,Id_45Set_33_10,control_11,Object_33_12,_33_13,Set_14,Try_15){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_$2.and,not=_$2.not,nor=_$2.nor,xor=_$2.xor,_$3=_ms.getModule(compare_1),_61_63=_$3["=?"],_$4=_ms.getModule(js_2),defined_63=_$4["defined?"],js_61_61=_$4["js=="],js_45typeof=_$4["js-typeof"],id_61_63=_$4["id=?"],js_45sub=_$4["js-sub"],_$5=_ms.getModule(methods_3),freeze=_$5.freeze,_$6=_ms.getModule(Type_4),_61_62=_$6["=>"],contains_63=_$6["contains?"],Kind=_ms.getDefaultExport(Kind_5),_64=_ms.lazy(function(){
			return _ms.getDefaultExport(_64_6)
		}),_$9=_ms.lazyGetModule(_64_6),_43_43=_ms.lazyProp(_$9,"++"),all_63=_ms.lazyProp(_$9,"all?"),count=_ms.lazyProp(_$9,"count"),empty_63=_ms.lazyProp(_$9,"empty?"),keep=_ms.lazyProp(_$9,"keep"),_$10=_ms.lazyGetModule(_64_45Type_7),empty=_ms.lazyProp(_$10,"empty"),_63=_ms.lazy(function(){
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
			return _ms.set(function can_45get_45p_63(_){
				return not(js_61_61(_,null))
			},"doc",doc)
		}();
		const flag_63=exports["flag?"]=function(){
			const doc="If it has a property for the flag, uses that. Otherwise false.";
			return _ms.set(function flag_63(obj,flag){
				return _ms.unlazy(_63_45or)(_63p(obj,flag),false)
			},"doc",doc)
		}();
		const forbidden_45fun_45props=_ms.lazy(function(){
			return _61_62(_ms.unlazy(Id_45Set_33),["arguments","caller"])
		});
		const _64p_45all=exports["@p-all"]=function(){
			const doc="Every property name directly stored in an object.\nIncludes non-enumerable properties and symbols.";
			return _ms.set(function _64p_45all(_){
				const props=Object.getOwnPropertyNames(_);
				const own_45names=function(){
					if(_ms.contains(Function,_)){
						return _ms.unlazy(keep)(props,function(name){
							return not(contains_63(_ms.unlazy(forbidden_45fun_45props),name))
						})
					} else {
						return props
					}
				}();
				return _ms.unlazy(_43_43)(own_45names,Object.getOwnPropertySymbols(_))
			},"doc",doc)
		}();
		const _64p=exports["@p"]=function(){
			const doc="Like @p-all, but excludes non-enumerable properties and symbols.";
			return _ms.set(function _64p(_){
				return function(){
					if(can_45get_45p_63(_)){
						return Object.keys(_)
					} else {
						return []
					}
				}()
			},"doc",doc)
		}();
		const _63p=exports["?p"]=function(){
			const doc="`?` containing the value of the property, if it exists.";
			return _ms.set(function _63p(_,name){
				return function(){
					if(p_63(_,name)){
						return _ms.unlazy(_63)(js_45sub(_,name))
					} else {
						return _ms.unlazy(empty)(_ms.unlazy(_63))
					}
				}()
			},"doc",doc)
		}();
		const _63p_45with_45proto=exports["?p-with-proto"]=function(){
			const doc="Like `?p`, but also looks through the prototype chain.";
			return _ms.set(function _63p_45with_45proto(_,name){
				return function(){
					if(can_45get_45p_63(_)){
						return _ms.unlazy(Opt_45_62_63)(js_45sub(_,name))
					} else {
						return _ms.unlazy(empty)(_ms.unlazy(_63))
					}
				}()
			},"doc",doc)
		}();
		const p=exports.p=function(){
			const doc="Gets the value of a property. Does not include properties in the prototype.";
			return _ms.set(function p(_,name){
				return js_45sub(_,name)
			},"doc",doc)
		}();
		const p_63=exports["p?"]=function(){
			const doc="Whether there is a property by that name.";
			return _ms.set(function p_63(_,name){
				return and(can_45get_45p_63(_),_ms.lazy(function(){
					return Object.prototype.hasOwnProperty.call(_,name)
				}))
			},"doc",doc)
		}();
		const p_45with_45proto_63=exports["p-with-proto?"]=function(){
			const doc="Like `p?` but looks through the prototype.";
			return _ms.set(function p_45with_45proto_63(_,name){
				return and(can_45get_45p_63(_),_ms.lazy(function(){
					return defined_63(js_45sub(_,name))
				}))
			},"doc",doc)
		}();
		const object_61_63=exports["object=?"]=function(){
			const doc="For Objects, whether they are of the same type and have `=?` properties.\nFor primitives, whether they are `=?`.";
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
					if(nor(obj_45a,obj_45b)){
						return id_61_63(a,b)
					} else if(xor(obj_45a,obj_45b)){
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
			},"doc",doc)
		}();
		const empty_45Object=exports["empty-Object"]=Object.freeze(Object.create(Object.prototype));
		const empty_45Object_63=exports["empty-Object?"]=function(){
			const doc="Whether there are no properties, not even hidden ones.";
			return _ms.set(function empty_45Object_63(_){
				return _ms.unlazy(empty_63)(_64p_45all(_))
			},"doc",doc)
		}();
		const Object_45_62Map=exports["Object->Map"]=function(){
			const doc="A Map whose keys are property names and whose values are the properties' values.";
			return _ms.set(function Object_45_62Map(_){
				return _ms.unlazy(make_45map)(_64p(_),_ms.sub(p,_))
			},"doc",doc)
		}();
		const Map_45_62Object=exports["Map->Object"]=function(){
			const doc="Given a Map whose keys are Strings, creates an Object whose Object->Map is that.";
			return _ms.set(function Map_45_62Object(_){
				return _ms.unlazy(returning)(_ms.unlazy(empty_45Object_33)(),function(obj){
					for(let _ of _ms.iterator(_)){
						_ms.unlazy(p_43_33)(obj,_.key,_.val)
					};
					return freeze(obj)
				})
			},"doc",doc)
		}();
		const prototype=exports.prototype=function(){
			const doc="Gets prototype of an object.";
			return _ms.set(Object.getPrototypeOf,"doc",doc,"name","prototype")
		}();
		const name=exports.name="Object";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9PYmplY3QubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0VBb0JBLHlDQUFZLGVBQ0k7R0FBZixVQUFNO0dBQ04sbUJBQWMsQ0FBRSxPQUFPOzs7Ozs7O0VBRXhCLHVEQUNXO0dBQVYsVUFBTTtrQkFLTCwwQkFBQSxFQUNDO1dBQUQsSUFBSyxTQUFLLEVBQUU7R0FBQTs7RUFFZCx5Q0FDTTtHQUFMLFVBQU07a0JBTUwsaUJBQVMsSUFBSSxLQUNlO2dDQUF0QixLQUFHLElBQUksTUFBTTtHQUFBOztFQUVyQjtVQUF1QiwrQkFBVyxDQUFHLFlBQVk7RUFBQTtFQUNqRCw2Q0FDTztHQUFOLFVBQ0M7a0JBZUEsb0JBQWUsRUFDQztJQUFoQixZQUFRLDJCQUEyQjtJQUVuQztLQUNDLGdCQUFDLFNBQUQsR0FDUzs4QkFBSCxNQUFPLFNBQUEsS0FDSTtjQUFmLElBQUssZ0RBQThCO01BQUE7S0FBQSxPQUVqQzthQUFIO0tBQUE7SUFBQTs4QkFDQyxZQUFXLDZCQUE2QjtHQUFBOztFQUU3QyxtQ0FDRztHQUFGLFVBQ0M7a0JBWUEsY0FBVyxFQUNDOztLQUNYLEdBQUEsaUJBQUEsR0FDVzthQUFWLFlBQVk7S0FBQSxPQUVUO2FBQUg7S0FBQTtJQUFBO0dBQUE7O0VBRUosbUNBQ0c7R0FBRixVQUFNO2tCQVNMLGNBQUEsRUFBRSxLQUNlOztLQUNoQixHQUFBLEtBQUcsRUFBRSxNQUNJOzZCQUFMLFNBQU8sRUFBRTtLQUFBLE9BRVQ7Ozs7OztFQUVQLDZEQUNjO0dBQWIsVUFBTTtrQkFJTCw2QkFBQSxFQUFFLEtBQ2U7O0tBQ2hCLEdBQUEsaUJBQUEsR0FDVztzQ0FBRixTQUFPLEVBQUU7S0FBQSxPQUVkOzs7Ozs7RUFFUCw0QkFDRTtHQUFELFVBQU07a0JBU0wsV0FBQSxFQUFFLEtBSUY7V0FBQSxTQUFPLEVBQUU7R0FBQTs7RUFFWCxtQ0FDRztHQUFGLFVBQU07a0JBTUwsY0FBQSxFQUFFLEtBQ2U7V0FBakIsSUFBSSxpQkFBQTtZQUFjLHFDQUFxQyxFQUFFO0lBQUE7R0FBQTs7RUFFM0QsNkRBQ2M7R0FBYixVQUFNO2tCQUdMLDZCQUFBLEVBQUUsS0FDZTtXQUFqQixJQUFJLGlCQUFBO1lBQWMsV0FBVSxTQUFPLEVBQUU7SUFBQTtHQUFBOztFQUd2QyxpREFDUztHQUFSLFVBQ0M7a0JBZ0JBLHNCQUFTLEVBQUUsRUFDQztJQUNaLGVBQVMsU0FBSyxFQUFFO0lBQ2hCLGVBQVMsU0FBSyxFQUFFO0lBRWhCLGNBQVEsSUFBSyxJQUFJO1lBQVUsU0FBTSxZQUFVLEdBQUk7SUFBQTtJQUMvQyxjQUFRLElBQUssSUFBSTtZQUFVLFNBQU0sWUFBVSxHQUFJO0lBQUE7O0tBRTlDLEdBQUEsSUFBSSxRQUFNLFNBQ0s7YUFBZCxTQUFLLEVBQUU7S0FBQSxPQUNSLEdBQUEsSUFBSSxRQUFNLFNBQ0s7YUFBZDtLQUFBLE9BRUc7TUFBSCxrQkFBWSxTQUFNLHNCQUFzQixHQUFJLHNCQUFzQjthQUNsRSxJQUFJO3dCQUNXO1FBQWQsU0FBSywyQkFBMkI7UUFDaEMsU0FBSywyQkFBMkI7ZUFDaEMsSUFBSyx5QkFBVSxzQkFBVzswQkFDTTtvQ0FBMUIsR0FBSSxTQUFBLEVBQ0M7a0JBQVQsT0FBSSxTQUFPLEVBQUUsR0FBSSxTQUFPLEVBQUU7VUFBQTtTQUFBO1FBQUE7T0FBQTtNQUFBO0tBQUE7SUFBQTtHQUFBOztFQUVqQyw2Q0FBYyxjQUFlLGNBQWM7RUFFM0MsMkRBQ2M7R0FBYixVQUFNO2tCQUlMLDJCQUFBLEVBQ1E7Z0NBQUQsV0FBQTtHQUFBOztFQUVULHVEQUNZO0dBQVgsVUFBTTtrQkFLTCx5QkFBQSxFQUNDO2tDQUFRLEtBQUEsV0FBSSxFQUFFO0dBQUE7O0VBRWpCLHVEQUNZO0dBQVgsVUFBTTtrQkFXTCx5QkFBQSxFQUNLO2lFQUFzQixTQUFBLElBQ0c7S0FBeEIsUUFBQSxrQkFBQSxHQUNDOzBCQUFELElBQUksTUFBTTs7WUFDZixPQUFPO0lBQUE7R0FBQTs7RUFFViw0Q0FDVTtHQUFULFVBQU07a0JBSU47O0VBN09ELHdCQUFBIiwiZmlsZSI6Ik9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9