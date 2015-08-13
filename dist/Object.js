"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Boolean","./compare","./js","./methods","./to-string","./Type/Kind","./Type/Pred-Type","./Type/Type","./at/at","./at/at-Type","./at/q","./at/Map/Map","./at/Set/Id-Set","./control","./at/q","./at/Set/Set","./Try"],(exports,Boolean_0,compare_1,js_2,methods_3,to_45string_4,Kind_5,Pred_45Type_6,Type_7,_64_8,_64_45Type_9,_63_10,Map_11,Id_45Set_12,control_13,_63_14,Set_15,Try_16)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(Boolean_0),xor=_ms.get(_$2,"xor"),_$3=_ms.getModule(compare_1),_61_63=_ms.get(_$3,"=?"),_$4=_ms.getModule(js_2),defined_63=_ms.get(_$4,"defined?"),id_61_63=_ms.get(_$4,"id=?"),js_61_61=_ms.get(_$4,"js=="),js_45delete=_ms.get(_$4,"js-delete"),js_45set=_ms.get(_$4,"js-set"),js_45sub=_ms.get(_$4,"js-sub"),js_45typeof=_ms.get(_$4,"js-typeof"),_$5=_ms.getModule(methods_3),freeze=_ms.get(_$5,"freeze"),_$6=_ms.getModule(to_45string_4),inspect=_ms.get(_$6,"inspect"),Kind=_ms.getDefaultExport(Kind_5),_$8=_ms.getModule(Pred_45Type_6),Opt=_ms.get(_$8,"Opt"),_$9=_ms.getModule(Type_7),_61_62=_ms.get(_$9,"=>"),contains_63=_ms.get(_$9,"contains?"),_$11=_ms.lazyGetModule(_64_8),_43_43=_ms.lazyProp(_$11,"++"),all_63=_ms.lazyProp(_$11,"all?"),count=_ms.lazyProp(_$11,"count"),empty_63=_ms.lazyProp(_$11,"empty?"),keep=_ms.lazyProp(_$11,"keep"),_$12=_ms.lazyGetModule(_64_45Type_9),empty=_ms.lazyProp(_$12,"empty"),_63=_ms.lazy(()=>{
			return _ms.getDefaultExport(_63_10)
		}),_$13=_ms.lazyGetModule(_63_10),_63_45or=_ms.lazyProp(_$13,"?-or"),Opt_45_62_63=_ms.lazyProp(_$13,"Opt->?"),Map=_ms.lazy(()=>{
			return _ms.getDefaultExport(Map_11)
		}),_$14=_ms.lazyGetModule(Map_11),make_45map=_ms.lazyProp(_$14,"make-map"),Id_45Set=_ms.lazy(()=>{
			return _ms.getDefaultExport(Id_45Set_12)
		}),_$16=_ms.lazyGetModule(control_13),opr=_ms.lazyProp(_$16,"opr"),_$18=_ms.lazyGetModule(_63_14),_63None=_ms.lazyProp(_$18,"?None"),_63some=_ms.lazyProp(_$18,"?some"),_$19=_ms.lazyGetModule(Set_15),set_61_63=_ms.lazyProp(_$19,"set=?"),_$20=_ms.lazyGetModule(Try_16),fails_63=_ms.lazyProp(_$20,"fails?"),fails_45with_63=_ms.lazyProp(_$20,"fails-with?");
		const Object_45Key=exports["Object-Key"]=new (Kind)((()=>{
			const built={};
			const doc=built.doc=`Can be used as a name for a property of an object.`;
			const implementors=built.implementors=[String,Symbol];
			return _ms.setName(built,"Object-Key")
		})());
		const can_45get_45p_63=exports["can-get-p?"]=(()=>{
			const built={};
			const doc=built.doc=`Whether it's safe to try to directly access properties.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[null],false);
				_ms.assoc(built,[void 0],false);
				_ms.assoc(built,[1],true);
				return built
			};
			return _ms.set(function can_45get_45p_63(_){
				return ! js_61_61(_,null)
			},built)
		})();
		const flag_63=exports["flag?"]=(()=>{
			const built={};
			const doc=built.doc=`If it has a property for the flag, uses that. Otherwise false.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
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
		})();
		const forbidden_45fun_45props=_ms.lazy(()=>{
			return _61_62(_ms.unlazy(Id_45Set),[`arguments`,`caller`])
		});
		const _64p_45all=exports["@p-all"]=(()=>{
			const built={};
			const doc=built.doc=`Every property name directly stored in an object.\nIncludes non-enumerable properties and symbols.`;
			const test=built.test=function test(){
				const obj=empty_45Object_33();
				p_43_33(obj,`a`,0);
				const sym=Symbol(`s`);
				Object.defineProperty(obj,sym,(()=>{
					const built={};
					const value=built.value=0;
					const enumerable=built.enumerable=false;
					return built
				})());
				_ms.assert(_ms.unlazy(set_61_63),_64p_45all([0,0]),[`0`,`1`,`length`]);
				_ms.assert(_ms.unlazy(set_61_63),_64p_45all(obj),[`a`,sym]);
				_ms.assert(_ms.unlazy(set_61_63),_64p_45all(_64p_45all),[`length`,`name`,`prototype`,`doc`,`test`,`name`])
			};
			return _ms.set(function _64p_45all(_){
				const props=Object.getOwnPropertyNames(_);
				const own_45names=(()=>{
					if(_ms.contains(Function,_)){
						return _ms.unlazy(keep)(props,name=>{
							return ! contains_63(_ms.unlazy(forbidden_45fun_45props),name)
						})
					} else {
						return props
					}
				})();
				return _ms.unlazy(_43_43)(own_45names,Object.getOwnPropertySymbols(_))
			},built)
		})();
		const _64p=exports["@p"]=(()=>{
			const built={};
			const doc=built.doc=`Like @p-all, but excludes non-enumerable properties and symbols.`;
			const test=built.test=function test(){
				const obj=empty_45Object_33();
				Object.defineProperty(obj,`a`,(()=>{
					const built={};
					const value=built.value=0;
					const enumerable=built.enumerable=false;
					return built
				})());
				const sym=Symbol(`s`);
				Object.defineProperty(obj,sym,(()=>{
					const built={};
					const value=built.value=0;
					const enumerable=built.enumerable=true;
					return built
				})());
				_ms.assert(_ms.unlazy(empty_63),_64p(obj));
				_ms.assert(_ms.unlazy(set_61_63),_64p(_64p),[`doc`,`test`])
			};
			return _ms.set(function _64p(_){
				return (()=>{
					if(can_45get_45p_63(_)){
						return Object.keys(_)
					} else {
						return []
					}
				})()
			},built)
		})();
		const _63p=exports["?p"]=(()=>{
			const built={};
			const doc=built.doc=`\`?\` containing the value of the property, if it exists.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				const x=(()=>{
					const built={};
					const a=built.a=1;
					const b=built.b=null;
					return _ms.setName(built,"x")
				})();
				_ms.assoc(built,[x,`a`],_ms.unlazy(_63some)(1));
				_ms.assoc(built,[x,`b`],_ms.unlazy(_63some)(null));
				_ms.assoc(built,[x,`toString`],_ms.unlazy(empty)(_ms.unlazy(_63)));
				return built
			};
			return _ms.set(function _63p(_,name){
				_ms.checkContains(Object_45Key,name,"name");
				return p_63(_,name)?_ms.some((()=>{
					return js_45sub(_,name)
				})()):_ms.None
			},built)
		})();
		const _63p_45with_45proto=exports["?p-with-proto"]=(()=>{
			const built={};
			const doc=built.doc=`Like \`?p\`, but also looks through the prototype chain.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[1,`toString`],_ms.unlazy(_63some)(Number.prototype.toString));
				_ms.assoc(built,[1,`asdfghjkl`],_ms.unlazy(_63None));
				return built
			};
			return _ms.set(function _63p_45with_45proto(_,name){
				_ms.checkContains(Object_45Key,name,"name");
				return (()=>{
					if(can_45get_45p_63(_)){
						return _ms.unlazy(Opt_45_62_63)(js_45sub(_,name))
					} else {
						return _ms.unlazy(empty)(_ms.unlazy(_63))
					}
				})()
			},built)
		})();
		const p=exports.p=(()=>{
			const built={};
			const doc=built.doc=`Gets the value of a property. Does not include properties in the prototype.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				const x=(()=>{
					const built={};
					const a=built.a=1;
					const b=built.b=null;
					return _ms.setName(built,"x")
				})();
				_ms.assoc(built,[x,`a`],1);
				_ms.assoc(built,[x,`b`],null);
				_ms.assert(_ms.unlazy(fails_63),()=>{
					return p(`c`)
				});
				return built
			};
			return _ms.set(function p(_,name){
				_ms.checkContains(Object_45Key,name,"name");
				_ms.assert(p_63,_,name);
				return js_45sub(_,name)
			},built)
		})();
		const p_63=exports["p?"]=(()=>{
			const built={};
			const doc=built.doc=`Whether there is a property by that name.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
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
		})();
		const p_45with_45proto_63=exports["p-with-proto?"]=(()=>{
			const built={};
			const doc=built.doc=`Like \`p?\` but looks through the prototype.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[empty_45Object,`toString`],true);
				return built
			};
			return _ms.set(function p_45with_45proto_63(_,name){
				_ms.checkContains(Object_45Key,name,"name");
				return (can_45get_45p_63(_)&&defined_63(js_45sub(_,name)))
			},built)
		})();
		const object_61_63=exports["object=?"]=(()=>{
			const built={};
			const doc=built.doc=`For Objects, whether they are of the same type and have \`=?\` properties.\nFor primitives, whether they are \`=?\`.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				const a=(()=>{
					const built={};
					const a=built.a=1;
					return _ms.setName(built,"a")
				})();
				const b=(()=>{
					const built={};
					const name=built.name=`a`;
					const a=built.a=1;
					return built
				})();
				const c=(()=>{
					const built={};
					const x=built.x=3;
					return _ms.setName(built,"c")
				})();
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
				return (()=>{
					if(! (obj_45a||obj_45b)){
						return id_61_63(a,b)
					} else if(xor(obj_45a,obj_45b)){
						return false
					} else {
						const same_45type=id_61_63(Object.getPrototypeOf(a),Object.getPrototypeOf(b));
						return (same_45type&&(()=>{
							const ak=Object.getOwnPropertyNames(a);
							const bk=Object.getOwnPropertyNames(b);
							return (_61_63(_ms.unlazy(count)(ak),_ms.unlazy(count)(bk))&&(()=>{
								return _ms.unlazy(all_63)(ak,k=>{
									return _61_63(js_45sub(a,k),js_45sub(b,k))
								})
							})())
						})())
					}
				})()
			},built)
		})();
		const empty_45Object=exports["empty-Object"]=Object.freeze(Object.create(Object.prototype));
		const empty_45Object_63=exports["empty-Object?"]=(()=>{
			const built={};
			const doc=built.doc=`Whether there are no properties, not even hidden ones.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[empty_45Object],true);
				_ms.assoc(built,[Object],false);
				return built
			};
			return _ms.set(function empty_45Object_63(_){
				_ms.checkContains(Object,_,"_");
				return _ms.unlazy(empty_63)(_64p_45all(_))
			},built)
		})();
		const Object_45_62Map=exports["Object->Map"]=(()=>{
			const built={};
			const doc=built.doc=`A Map whose keys are property names and whose values are the properties' values.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[{
					a:1,
					b:2
				}],(()=>{
					const built=new (global.Map)();
					_ms.assoc(built,`a`,1);
					_ms.assoc(built,`b`,2);
					return built
				})());
				return built
			};
			return _ms.set(function Object_45_62Map(_){
				return _ms.unlazy(make_45map)(_64p(_),_ms.sub(p,_))
			},built)
		})();
		const Map_45_62Object=exports["Map->Object"]=(()=>{
			const built={};
			const doc=built.doc=`Given a Map whose keys are Strings, creates an Object whose Object->Map is that.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				const map=(()=>{
					const built=new (global.Map)();
					_ms.assoc(built,`a`,1);
					_ms.assoc(built,`b`,2);
					return built
				})();
				_ms.assoc(built,[map],{
					a:1,
					b:2
				});
				_ms.assert(_61_63,map,Object_45_62Map(Map_45_62Object(map)));
				_ms.assert(_ms.unlazy(fails_63),()=>{
					return Map_45_62Object((()=>{
						const built=new (global.Map)();
						_ms.assoc(built,1,2);
						return built
					})())
				});
				return built
			};
			return _ms.set(function Map_45_62Object(_){
				_ms.checkContains(_ms.unlazy(Map),_,"_");
				return (obj=>{
					for(let elem of _){
						p_43_33(obj,_ms.sub(elem,0),_ms.sub(elem,1))
					};
					freeze(obj);
					return obj
				})(empty_45Object_33())
			},built)
		})();
		const prototype=exports.prototype=(()=>{
			const built={};
			const doc=built.doc=`Gets prototype of an object.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[empty_45Object],Object.prototype);
				_ms.assoc(built,[Object_45Key],Kind.prototype);
				return built
			};
			return _ms.set(Object.getPrototypeOf,built,"prototype")
		})();
		const empty_45Object_33=exports["empty-Object!"]=(()=>{
			const built={};
			const doc=built.doc=`Creates a new Object! with no properties and the given prototype.`;
			const test=built.test=function test(){
				const _=empty_45Object_33();
				_ms.assert(empty_45Object_63,_);
				const child=empty_45Object_33(_);
				_ms.assert(_61_63,_,prototype(child))
			};
			return _ms.set(function empty_45Object_33(prototype){
				_ms.checkContains(_ms.sub(Opt,Object),prototype,"prototype");
				return Object.create(_ms.unlazy(opr)(prototype,Object.prototype))
			},built)
		})();
		const p_43_33=exports["p+!"]=(()=>{
			const built={};
			const doc=built.doc=`Adds a new immutable property.`;
			const test=built.test=function test(){
				const _=empty_45Object_33();
				p_43_33(_,`a`,1);
				_ms.assert(_61_63,_.a,1);
				_ms.assert(_ms.unlazy(fails_63),()=>{
					return p_43_33(_,`a`,2)
				});
				_ms.assert(_ms.unlazy(fails_63),()=>{
					return p_43_33(`string`,`a`,1)
				})
			};
			return _ms.set(function p_43_33(_,name,val){
				_ms.checkContains(Object,_,"_");
				_ms.checkContains(Object_45Key,name,"name");
				Object.defineProperty(_,name,(()=>{
					const built={};
					const enumerable=built.enumerable=true;
					const writable=built.writable=false;
					const value=built.value=val;
					return built
				})())
			},built)
		})();
		const p_43mut_33=exports["p+mut!"]=(()=>{
			const built={};
			const doc=built.doc=`Adds a new mutable property.`;
			const test=built.test=`See \`p!\``;
			return _ms.set(function p_43mut_33(_,name,val){
				_ms.checkContains(Object,_,"_");
				_ms.checkContains(Object_45Key,name,"name");
				Object.defineProperty(_,name,(()=>{
					const built={};
					const enumerable=built.enumerable=true;
					const writable=built.writable=true;
					const value=built.value=val;
					const configurable=built.configurable=true;
					return built
				})())
			},built)
		})();
		const p_33=exports["p!"]=(()=>{
			const built={};
			const doc=built.doc=`Modifies an already-existing property.`;
			const test=built.test=function test(){
				const _=empty_45Object_33();
				p_43mut_33(_,`a`,1);
				p_33(_,`a`,2);
				_ms.assert(_61_63,_.a,2)
			};
			return _ms.set(function p_33(_,name,new_45val){
				_ms.checkContains(Object,_,"_");
				_ms.checkContains(Object_45Key,name,"name");
				_ms.assert(p_63,_,name);
				js_45set(_,name,new_45val)
			},built)
		})();
		const p_45_33=exports["p-!"]=(()=>{
			const built={};
			const test=built.test=function test(){
				const _=empty_45Object_33();
				p_43mut_33(_,`a`,1);
				p_45_33(_,`a`);
				_ms.assertNot(p_63,_,`a`)
			};
			return _ms.set(function p_45_33(_,name){
				_ms.checkContains(Object,_,"_");
				_ms.checkContains(Object_45Key,name,"name");
				_ms.assert(p_63,_,name);
				js_45delete(_,name)
			},built)
		})();
		const extend_33=exports["extend!"]=(()=>{
			const built={};
			const doc=built.doc=`Adds all the properties in \`extender\` to \`_\`.`;
			const test=built.test=function test(){
				const _=empty_45Object_33();
				extend_33(_,(()=>{
					const built={};
					const a=built.a=1;
					return built
				})());
				_ms.assert(_61_63,_.a,1)
			};
			return _ms.set(function extend_33(_,extender){
				_ms.checkContains(Object,_,"_");
				_ms.checkContains(Object,extender,"extender");
				Object.assign(_,extender)
			},built)
		})();
		const send=exports.send=(()=>{
			const built={};
			const doc=built.doc=`Calls \`target\`'s method \`name\` with the given arguments.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[1,`toFixed`,2],`1.00`);
				_ms.assert(_ms.unlazy(fails_45with_63),`Method 'toFixed' not implemented by '1'.`,()=>{
					send_33(`1`,`toFixed`)
				});
				return built
			};
			return _ms.set(function send(target,name){
				const args=[].slice.call(arguments,2);
				_ms.checkContains(Object_45Key,name,"name");
				const impl=js_45sub(target,name);
				if(! _ms.contains(Function,impl))throw _ms.error(`Method ${inspect(name)} not implemented by ${inspect(target)}.`);
				return impl.apply(target,args)
			},built)
		})();
		const send_33=exports["send!"]=send;
		const object_45merge=exports["object-merge"]=function object_45merge(){
			const objects=[].slice.call(arguments,0);
			return Function.apply.call(Object.assign,null,[].concat(new (Object)(),_ms.arr(objects)))
		};
		const name=exports.name=`Object`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9PYmplY3QubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7RUFxQkEseUNBQVksS0FBSSxNQUNJLEtBQUE7O0dBQW5CLG9CQUFNO0dBQ04sc0NBQWMsQ0FBRSxPQUFPOzs7RUFFeEIsNkNBQ1csS0FBQTs7R0FBVixvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsTUFBVTtvQkFDWixDQUFFLFFBQWU7b0JBQ2pCLENBQUUsR0FBTzs7O2tCQUNULDBCQUFBLEVBQ0M7V0FBRCxFQUFJLFNBQUssRUFBRTtHQUFBOztFQUViLCtCQUNNLEtBQUE7O0dBQUwsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFDTixDQUFFO09BQUk7SUFBQSxFQUFPLEtBQVE7b0JBQ3JCLENBQUU7T0FBSTtJQUFBLEVBQVEsS0FBUTtvQkFDdEIsQ0FBRSxlQUFjLEtBQVE7OztrQkFDeEIsaUJBQVMsSUFBSSxLQUNlO3NCQURWOzZCQUFqQiw2QkFDSyxLQUFHLElBQUksTUFBTTs7O0VBRXJCO1VBQXVCLDRCQUFVLENBQUcsWUFBWTs7RUFDaEQsbUNBQ08sS0FBQTs7R0FBTixvQkFDQztHQUVELHNCQUNRLGVBQUE7SUFBUCxVQUFNO0lBQ04sUUFBSSxJQUFLLElBQUc7SUFDWixVQUFNLE9BQVE7SUFDZCxzQkFBc0IsSUFBSSxJQUNHLEtBQUE7O0tBQTVCLHdCQUFPO0tBQ1Asa0NBQVk7OztxQ0FDRSxXQUFPLENBQUUsRUFBRSxJQUFLLENBQUcsSUFBSSxJQUFJO3FDQUMzQixXQUFPLEtBQUssQ0FBRyxJQUFHO3FDQUdsQixXQUFPLFlBQVEsQ0FBRyxTQUFTLE9BQU8sWUFBWSxNQUFNLE9BQU87O2tCQUMxRSxvQkFBQSxFQUNDO0lBQUQsWUFBUSwyQkFBMEI7SUFFbEMsa0JBQ2dCO0tBQWYsZ0JBQUMsU0FBRCxHQUNTOzhCQUFILE1BQU8sTUFDSTtjQUFmLEVBQUksZ0RBQThCO01BQUE7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QUU7R0FBQTs7RUFHZCxtQ0FDUSxLQUFBOztHQUFQLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtJQUFQLFFBQUk7SUFDSixVQUFRLEVBQ0MsS0FBQTs7S0FBUixnQkFBRzs7O2VBQ0ksT0FBRyxJQUFJO0dBQUE7a0JBQ2QsbUJBQUEsRUFBUyxTQUNlO3NCQUR0QjtzQkFBZ0I7SUFDbkIsY0FBYyxFQUFFO0dBQUE7O0VBRW5CLHdCQUNLLEtBQUE7O0dBQUosb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFFLEVBQUcsVUFBUyxHQUFROzJDQUNELDJDQUM0QyxJQUFBO0tBQWhFLFFBQU8sSUFBSTs7OztrQkFDWixjQUFBLE9BQU8sS0FDdUI7O3NCQURsQjtJQUNaLFdBQU8sU0FBTyxPQUFPO0lBQ2Isa0JBQUssU0FBTCxzQkFBc0IsVUFBUSxRQUFRLDRCQUEwQixRQUFRO1dBQ2hGLFdBQVcsT0FBTztHQUFBOztFQUVwQiwrQkFBTztFQUVQLDZDQUFlLHlCQUNVOzs4QkFBeEIsNkJBQWUsS0FBSSxrQkFBUTtFQUFBO0VBcFU1Qix3QkFBQSIsImZpbGUiOiJPYmplY3QuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==