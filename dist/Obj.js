"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Bool","./compare","./js","./methods","./private/bootstrap","./Type/Type","./Type/Kind","./at/at","./at/at-Type","./at/q","./at/Map/Map","./at/Set/Id-Setbang","./control","./Fun","./Objbang","./bang","./at/Set/Set","./math/Num","./Try"],function(exports,Bool_0,compare_1,js_2,methods_3,bootstrap_4,Type_5,Kind_6,_64_7,_64_45Type_8,_63_9,Map_10,Id_45Set_33_11,control_12,Fun_13,Obj_33_14,_33_15,Set_16,Num_17,Try_18){
	exports._get=_ms.lazy(function(){
		const Bool=_ms.getDefaultExport(Bool_0),_$2=_ms.getModule(Bool_0),and=_ms.get(_$2,"and"),not=_ms.get(_$2,"not"),nor=_ms.get(_$2,"nor"),xor=_ms.get(_$2,"xor"),_$3=_ms.getModule(compare_1),_61_63=_ms.get(_$3,"=?"),_$4=_ms.getModule(js_2),defined_63=_ms.get(_$4,"defined?"),js_61_61=_ms.get(_$4,"js=="),js_45typeof=_ms.get(_$4,"js-typeof"),id_61_63=_ms.get(_$4,"id=?"),js_45sub=_ms.get(_$4,"js-sub"),_$5=_ms.getModule(methods_3),freeze=_ms.get(_$5,"freeze"),_$6=_ms.getModule(bootstrap_4),Str=_ms.get(_$6,"Str"),_$7=_ms.getModule(Type_5),_61_62=_ms.get(_$7,"=>"),contains_63=_ms.get(_$7,"contains?"),Kind=_ms.getDefaultExport(Kind_6),_64=_ms.lazy(function(){
			return _ms.getDefaultExport(_64_7)
		}),_$10=_ms.lazyGetModule(_64_7),_43_43=_ms.lazyProp(_$10,"++"),all_63=_ms.lazyProp(_$10,"all?"),count=_ms.lazyProp(_$10,"count"),each_33=_ms.lazyProp(_$10,"each!"),empty_63=_ms.lazyProp(_$10,"empty?"),keep=_ms.lazyProp(_$10,"keep"),_$11=_ms.lazyGetModule(_64_45Type_8),empty=_ms.lazyProp(_$11,"empty"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_9)
		}),_$12=_ms.lazyGetModule(_63_9),_63_45or=_ms.lazyProp(_$12,"?-or"),Opt_45_62_63=_ms.lazyProp(_$12,"Opt->?"),Map=_ms.lazy(function(){
			return _ms.getDefaultExport(Map_10)
		}),_$13=_ms.lazyGetModule(Map_10),make_45map=_ms.lazyProp(_$13,"make-map"),Id_45Set_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Id_45Set_33_11)
		}),_$15=_ms.lazyGetModule(control_12),returning=_ms.lazyProp(_$15,"returning"),Fun=_ms.lazy(function(){
			return _ms.getDefaultExport(Fun_13)
		}),_$17=_ms.lazyGetModule(Obj_33_14),empty_45Obj_33=_ms.lazyProp(_$17,"empty-Obj!"),p_43_33=_ms.lazyProp(_$17,"p+!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_15)
		}),_$20=_ms.lazyGetModule(Set_16),set_61_63=_ms.lazyProp(_$20,"set=?"),Num=_ms.lazy(function(){
			return _ms.getDefaultExport(Num_17)
		}),_$22=_ms.lazyGetModule(Try_18),fails_63=_ms.lazyProp(_$22,"fails?");
		const exports={};
		const Obj=function(){
			const doc="Contains anything that can store keys.\nEverything shares Obj.prototype.";
			return _ms.set(global.Object,"doc",doc,"displayName","Obj")
		}();
		const Obj_45Key=exports["Obj-Key"]=Kind(function(){
			const doc="Can be used as a name for a property of an object.";
			const implementors=[Str,Symbol];
			return {
				doc:doc,
				implementors:implementors,
				displayName:"Obj-Key"
			}
		}());
		const can_45get_45p_63=exports["can-get-p?"]=function(){
			const doc="Whether it's safe to try to directly access properties.";
			const test=function(){
				const _k0=[null],_v0=false;
				const _k1=[undefined],_v1=false;
				const _k2=[1],_v2=true;
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2)
			};
			return _ms.set(function(_){
				return not(js_61_61(_,null))
			},"doc",doc,"test",test,"displayName","can-get-p?")
		}();
		const flag_63=exports["flag?"]=function(){
			const doc="If it has a property for the flag, uses that. Otherwise false.";
			const test=function(){
				const _k0=[{
					a:true
				},"a"],_v0=true;
				const _k1=[{
					a:false
				},"a"],_v1=false;
				const _k2=[empty_45Obj,"a"],_v2=false;
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2)
			};
			return _ms.set(function(obj,flag){
				_ms.checkContains(Obj_45Key,flag,"flag");
				return _ms.checkContains(Bool,_ms.unlazy(_63_45or)(_63p(obj,flag),false),"res")
			},"doc",doc,"test",test,"displayName","flag?")
		}();
		const forbidden_45fun_45props=_ms.lazy(function(){
			return _61_62(_ms.unlazy(Id_45Set_33),["arguments","caller"])
		});
		const _64p_45all=exports["@p-all"]=function(){
			const doc="Every property name directly stored in an object.\nIncludes non-enumerable properties and symbols.";
			const test=function(){
				const obj=_ms.unlazy(empty_45Obj_33)();
				_ms.unlazy(p_43_33)(obj,"a",0);
				const sym=Symbol("s");
				Obj.defineProperty(obj,sym,function(){
					const value=0;
					const enumerable=false;
					return {
						value:value,
						enumerable:enumerable
					}
				}());
				_ms.unlazy(_33)(_ms.unlazy(set_61_63),_64p_45all(obj),["a",sym]);
				return _ms.unlazy(_33)(_ms.unlazy(set_61_63),_64p_45all(_64p_45all),["length","name","prototype","doc","test","displayName"])
			};
			return _ms.set(function(_){
				const props=Obj.getOwnPropertyNames(_);
				const own_45names=function(){
					if(_ms.bool(_ms.contains(_ms.unlazy(Fun),_))){
						return _ms.unlazy(keep)(props,function(name){
							return not(contains_63(_ms.unlazy(forbidden_45fun_45props),name))
						})
					} else {
						return props
					}
				}();
				return _ms.checkContains(_ms.sub(_ms.unlazy(_64),Obj_45Key),_ms.unlazy(_43_43)(own_45names,Obj.getOwnPropertySymbols(_)),"res")
			},"doc",doc,"test",test,"displayName","@p-all")
		}();
		const _64p=exports["@p"]=function(){
			const doc="Like @p-all, but excludes non-enumerable properties and symbols.";
			const test=function(){
				const obj=_ms.unlazy(empty_45Obj_33)();
				Obj.defineProperty(obj,"a",function(){
					const value=0;
					const enumerable=false;
					return {
						value:value,
						enumerable:enumerable
					}
				}());
				const sym=Symbol("s");
				Obj.defineProperty(obj,sym,function(){
					const value=0;
					const enumerable=true;
					return {
						value:value,
						enumerable:enumerable
					}
				}());
				_ms.unlazy(_33)(_ms.unlazy(empty_63),_64p(obj));
				return _ms.unlazy(_33)(_ms.unlazy(set_61_63),_64p(_64p),["doc","test","displayName"])
			};
			return _ms.set(function(_){
				return _ms.checkContains(_ms.sub(_ms.unlazy(_64),Str),function(){
					if(_ms.bool(can_45get_45p_63(_))){
						return Obj.keys(_)
					} else {
						return []
					}
				}(),"res")
			},"doc",doc,"test",test,"displayName","@p")
		}();
		const _63p=exports["?p"]=function(){
			const doc="`?` containing the value of the property, if it exists.";
			const test=function(){
				const x=function(){
					const a=1;
					const b=null;
					return {
						a:a,
						b:b,
						displayName:"x"
					}
				}();
				const _k0=[x,"a"],_v0=_ms.unlazy(_63)(1);
				const _k1=[x,"b"],_v1=_ms.unlazy(_63)(null);
				const _k2=[x,"toString"],_v2=_ms.unlazy(empty)(_ms.unlazy(_63));
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2)
			};
			return _ms.set(function(_,name){
				_ms.checkContains(Obj_45Key,name,"name");
				return function(){
					if(_ms.bool(p_63(_,name))){
						return _ms.unlazy(_63)(js_45sub(_,name))
					} else {
						return _ms.unlazy(empty)(_ms.unlazy(_63))
					}
				}()
			},"doc",doc,"test",test,"displayName","?p")
		}();
		const _63p_45with_45proto=exports["?p-with-proto"]=function(){
			const doc="Like `?p`, but also looks through the prototype chain.";
			const test=function(){
				const _k0=[1,"toString"],_v0=_ms.unlazy(_63)(_ms.unlazy(Num).prototype.toString);
				const _k1=[1,"asdfghjkl"],_v1=_ms.unlazy(empty)(_ms.unlazy(_63));
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function(_,name){
				_ms.checkContains(Obj_45Key,name,"name");
				return function(){
					if(_ms.bool(can_45get_45p_63(_))){
						return _ms.unlazy(Opt_45_62_63)(js_45sub(_,name))
					} else {
						return _ms.unlazy(empty)(_ms.unlazy(_63))
					}
				}()
			},"doc",doc,"test",test,"displayName","?p-with-proto")
		}();
		const p=exports.p=function(){
			const doc="Gets the value of a property. Does not include properties in the prototype.";
			const test=function(){
				const x=function(){
					const a=1;
					const b=null;
					return {
						a:a,
						b:b,
						displayName:"x"
					}
				}();
				const _k0=[x,"a"],_v0=1;
				const _k1=[x,"b"],_v1=null;
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return p("c")
				});
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function(_,name){
				_ms.checkContains(Obj_45Key,name,"name");
				_ms.unlazy(_33)(p_63,_,name);
				return js_45sub(_,name)
			},"doc",doc,"test",test,"displayName","p")
		}();
		const p_63=exports["p?"]=function(){
			const doc="Whether there is a property by that name.";
			const test=function(){
				const x={
					a:1
				};
				const _k0=[x,"a"],_v0=true;
				const _k1=[x,"b"],_v1=false;
				const _k2=[x,"toString"],_v2=false;
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2)
			};
			return _ms.set(function(_,name){
				_ms.checkContains(Obj_45Key,name,"name");
				return and(can_45get_45p_63(_),_ms.lazy(function(){
					return Obj.prototype.hasOwnProperty.call(_,name)
				}))
			},"doc",doc,"test",test,"displayName","p?")
		}();
		const p_45with_45proto_63=exports["p-with-proto?"]=function(){
			const doc="Like `p?` but looks through the prototype.";
			const test=function(){
				const _k0=[empty_45Obj,"toString"],_v0=true;
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function(_,name){
				_ms.checkContains(Obj_45Key,name,"name");
				return and(can_45get_45p_63(_),_ms.lazy(function(){
					return defined_63(js_45sub(_,name))
				}))
			},"doc",doc,"test",test,"displayName","p-with-proto?")
		}();
		const obj_61_63=exports["obj=?"]=function(){
			const doc="For Objs, whether they are of the same type and have `=?` properties.\nFor primitives, whether they are `=?`.";
			const test=function(){
				const a=function(){
					const a=1;
					return {
						a:a,
						displayName:"a"
					}
				}();
				const b=function(){
					const displayName="a";
					const a=1;
					return {
						displayName:displayName,
						a:a
					}
				}();
				const c=function(){
					const x=3;
					return {
						x:x,
						displayName:"c"
					}
				}();
				const _k0=[a,b],_v0=true;
				const _k1=[a,c],_v1=false;
				const _k2=[1,1],_v2=true;
				const _k3=[obj_61_63,obj_61_63],_v3=true;
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3)
			};
			return _ms.set(function(a,b){
				const null_45a=id_61_63(a,null);
				const null_45b=id_61_63(b,null);
				const obj_45a=and(not(null_45a),_ms.lazy(function(){
					return id_61_63(js_45typeof(a),"object")
				}));
				const obj_45b=and(not(null_45b),_ms.lazy(function(){
					return id_61_63(js_45typeof(b),"object")
				}));
				return _ms.checkContains(Bool,function(){
					if(_ms.bool(nor(obj_45a,obj_45b))){
						return id_61_63(a,b)
					} else if(_ms.bool(xor(obj_45a,obj_45b))){
						return false
					} else {
						const same_45type=id_61_63(Obj.getPrototypeOf(a),Obj.getPrototypeOf(b));
						return and(same_45type,_ms.lazy(function(){
							return function(){
								const ak=Obj.getOwnPropertyNames(a);
								const bk=Obj.getOwnPropertyNames(b);
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
			},"doc",doc,"test",test,"displayName","obj=?")
		}();
		const empty_45Obj=exports["empty-Obj"]=Obj.freeze(Obj.create(Obj.prototype));
		const empty_45Obj_63=exports["empty-Obj?"]=function(){
			const doc="Whether there are no properties, not even hidden ones.";
			const test=function(){
				const _k0=[empty_45Obj],_v0=true;
				const _k1=[Obj],_v1=false;
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function(_){
				_ms.checkContains(Obj,_,"_");
				return _ms.unlazy(empty_63)(_64p_45all(_))
			},"doc",doc,"test",test,"displayName","empty-Obj?")
		}();
		const Obj_45_62Map=exports["Obj->Map"]=function(){
			const doc="A Map whose keys are property names and whose values are the properties' values.";
			const test=function(){
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
			return _ms.set(function(_){
				return _ms.unlazy(make_45map)(_64p(_),_ms.sub(p,_))
			},"doc",doc,"test",test,"displayName","Obj->Map")
		}();
		const Map_45_62Obj=exports["Map->Obj"]=function(){
			const doc="Given a Map whose keys are Strs, creates an Obj whose Obj->Map is that.";
			const test=function(){
				const map=function(){
					const _k0="a",_v0=1;
					const _k1="b",_v1=2;
					return _ms.map(_k0,_v0,_k1,_v1)
				}();
				const _k0=[map],_v0={
					a:1,
					b:2
				};
				_ms.unlazy(_33)(_61_63,map,Obj_45_62Map(Map_45_62Obj(map)));
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return Map_45_62Obj(function(){
						const _k0=1,_v0=2;
						return _ms.map(_k0,_v0)
					}())
				});
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function(_){
				_ms.checkContains(_ms.unlazy(Map),_,"_");
				return _ms.unlazy(returning)(_ms.unlazy(empty_45Obj_33)(),function(obj){
					_ms.unlazy(each_33)(_,function(pair){
						return _ms.unlazy(p_43_33)(obj,pair.key,pair.val)
					});
					return freeze(obj)
				})
			},"doc",doc,"test",test,"displayName","Map->Obj")
		}();
		const prototype=exports.prototype=function(){
			const doc="Gets prototype of an object.";
			const test=function(){
				const _k0=[empty_45Obj],_v0=Obj.prototype;
				const _k1=[Obj_45Key],_v1=Kind.prototype;
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(Obj.getPrototypeOf,"doc",doc,"test",test,"displayName","prototype")
		}();
		exports.default=Obj;
		const displayName=exports.displayName="Obj";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9PYmoubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2lDQXVCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFBQSxvQkFBSztHQUNKLFVBQ0M7a0JBRUQ7O0VBRUQsbUNBQVMsZUFBSTtHQUNaLFVBQU07R0FDTixtQkFBYyxDQUFBLElBQUE7VUFGRjs7Ozs7O0VBSWIsdURBQVc7R0FDVixVQUFNO0dBQ04sV0FBTyxVQUNOO0lBQUEsVUFBQSxDQUFFLFVBQVE7SUFDVixVQUFBLENBQUEsZUFBaUI7SUFDakIsVUFBQSxDQUFFLE9BQU87OztrQkFDVCxTQUFBLEVBQ0E7V0FBQSxJQUFJLFNBQU0sRUFBRTtHQUFBOztFQUVkLHlDQUFNO0dBQ0wsVUFBTTtHQUNOLFdBQU8sVUFFTjtJQUFBLFVBQUEsQ0FBRTtPQUFJO0lBQUEsRUFBTyxTQUFRO0lBQ3JCLFVBQUEsQ0FBRTtPQUFJO0lBQUEsRUFBUSxTQUFRO0lBQ3RCLFVBQUEsQ0FBQSxZQUFhLFNBQVE7OztrQkFDckIsU0FBTSxJQUFJLEtBQ1Y7c0JBRGU7NkJBQWQsMEJBQ0ksS0FBQSxJQUFBLE1BQUw7OztFQUVGO1VBQXVCLCtCQUFXLENBQUcsWUFBWTtFQUFBO0VBQ2pELDZDQUFPO0dBQ04sVUFDQztHQUdELFdBQU8sVUFDTjtJQUFBO3dCQUNBLElBQVMsSUFBRztJQUNaLFVBQU0sT0FBUTtJQUNkLG1CQUFBLElBQUEsY0FBMEI7S0FDekIsWUFBTztLQUNQLGlCQUFZO1lBRmE7Ozs7OzBDQUdsQixXQUFBLEtBQWEsQ0FBRyxJQUFIO2lEQUViLFdBQUEsWUFBZ0IsQ0FBRyxTQUFTLE9BQU8sWUFBWSxNQUFNLE9BQU87R0FBQTtrQkFDcEUsU0FBWSxFQUNaO0lBQUEsWUFBUSx3QkFBd0I7SUFFaEM7S0FDQyx5Q0FBQSxJQUNDOzhCQUFBLE1BQVksU0FBQSxLQUNYO2NBQUEsSUFBSSxnREFBQTtNQUFBO0tBQUEsT0FFTDthQUFBO0tBQUE7SUFBQTtxREFSQSw4QkFTRixZQUFjLDBCQUEwQjs7O0VBRTFDLG1DQUFHO0dBQ0YsVUFDQztHQUNELFdBQU8sVUFDTjtJQUFBO0lBQ0EsbUJBQUEsSUFBd0IsY0FBRTtLQUN6QixZQUFPO0tBQ1AsaUJBQVk7WUFGYTs7Ozs7SUFHMUIsVUFBTSxPQUFRO0lBQ2QsbUJBQUEsSUFBQSxjQUEwQjtLQUN6QixZQUFPO0tBQ1AsaUJBQUE7WUFGeUI7Ozs7O3lDQUdqQixLQUFBO2lEQUNELEtBQUEsTUFBUSxDQUFHLE1BQU0sT0FBTztHQUFBO2tCQUNoQyxTQUFRLEVBQ1I7cURBREU7S0FFRCxZQUFBLGlCQUFBLElBQ0M7YUFBQSxTQUFTO0tBQUEsT0FFVDthQUFBO0tBQUE7SUFBQTs7O0VBRUosbUNBQUc7R0FDRixVQUFNO0dBQ04sV0FBTyxVQUNOO0lBQUEsa0JBQUc7S0FDRixRQUFHO0tBQ0gsUUFBRztZQUZEOzs7Ozs7SUFHSCxVQUFBLENBQUEsRUFBSyx5QkFBVTtJQUNmLFVBQUEsQ0FBQSxFQUFLLHlCQUFVO0lBRWYsVUFBQSxDQUFBLEVBQUs7OztrQkFDTCxTQUFBLEVBQUUsS0FDRjtzQkFETzs7S0FFTixZQUFBLEtBQUcsRUFBSCxPQUNDOzZCQUFFLFNBQVEsRUFBUjtLQUFBLE9BRUY7Ozs7OztFQUVKLDZEQUFjO0dBQ2IsVUFBTTtHQUNOLFdBQU8sVUFDTjtJQUFBLFVBQUEsQ0FBRSxFQUFHO0lBQ0wsVUFBQSxDQUFFLEVBQUc7OztrQkFDTCxTQUFBLEVBQUUsS0FDRjtzQkFETzs7S0FFTixZQUFBLGlCQUFBLElBQ0M7c0NBQU8sU0FBUSxFQUFSO0tBQUEsT0FFUDs7Ozs7O0VBRUosNEJBQUU7R0FDRCxVQUFNO0dBQ04sV0FBTyxVQUNOO0lBQUEsa0JBQUc7S0FDRixRQUFHO0tBQ0gsUUFBRztZQUZEOzs7Ozs7SUFHSCxVQUFBLENBQUEsRUFBSyxTQUFRO0lBQ2IsVUFBQSxDQUFBLEVBQUssU0FBUTt5Q0FDRyxVQUNmO1lBQUEsRUFBRztJQUFBOzs7a0JBQ0osU0FBQSxFQUFFLEtBSUY7c0JBSk87b0JBRU4sS0FBSyxFQUFMO1dBRUQsU0FBTyxFQUFQO0dBQUE7O0VBRUYsbUNBQUc7R0FDRixVQUFNO0dBQ04sV0FBTyxVQUNOO0lBQUEsUUFBSTtPQUFHO0lBQUE7SUFDUCxVQUFBLENBQUEsRUFBSyxTQUFRO0lBQ2IsVUFBQSxDQUFBLEVBQUssU0FBUTtJQUNiLFVBQUEsQ0FBQSxFQUFLLGdCQUFlOzs7a0JBQ3BCLFNBQUEsRUFBRSxLQUNGO3NCQURPO1dBQ1AsSUFBQSxpQkFBSTtZQUFjLGtDQUFrQyxFQUFuQztJQUFBO0dBQUE7O0VBRW5CLDZEQUFjO0dBQ2IsVUFBTTtHQUNOLFdBQU8sVUFDTjtJQUFBLFVBQUEsQ0FBQSxZQUFhLGdCQUFlOzs7a0JBQzVCLFNBQUEsRUFBRSxLQUNGO3NCQURPO1dBQ1AsSUFBQSxpQkFBSTtZQUFhLFdBQVUsU0FBUSxFQUFSO0lBQUE7R0FBQTs7RUFHN0IsMkNBQU07R0FDTCxVQUNDO0dBRUQsV0FBTyxVQUNOO0lBQUEsa0JBQUc7S0FDRixRQUFHO1lBREQ7Ozs7O0lBRUgsa0JBQUc7S0FFRixrQkFBYztLQUNkLFFBQUc7WUFIRDs7Ozs7SUFJSCxrQkFBRztLQUNGLFFBQUc7WUFERDs7Ozs7SUFFSCxVQUFBLENBQUEsRUFBQSxPQUFXO0lBQ1gsVUFBQSxDQUFBLEVBQUEsT0FBVztJQUNYLFVBQUEsQ0FBRSxFQUFFLE9BQU87SUFFWCxVQUFBLENBQUEsVUFBQSxlQUFtQjs7O2tCQUNuQixTQUFNLEVBQUUsRUFFUjtJQUFBLGVBQVMsU0FBQSxFQUFPO0lBQ2hCLGVBQVMsU0FBQSxFQUFPO0lBRWhCLGNBQVEsSUFBSSxJQUFBO1lBQWMsU0FBTSxZQUFBLEdBQWU7SUFBQTtJQUMvQyxjQUFRLElBQUksSUFBQTtZQUFjLFNBQU0sWUFBQSxHQUFlO0lBQUE7NkJBTjlDO0tBUUEsWUFBQSxJQUFBLFFBQUEsVUFDQzthQUFBLFNBQUEsRUFBQTtLQUFBLE9BQ0QsWUFBQSxJQUFBLFFBQUEsVUFDQzthQUFBO0tBQUEsT0FFQTtNQUFBLGtCQUFZLFNBQU0sbUJBQUQsR0FBd0IsbUJBQUQ7YUFDeEMsSUFBQTt3QkFBZTtRQUNkLFNBQUssd0JBQUE7UUFDTCxTQUFLLHdCQUFBO2VBQ0wsSUFBSSx5QkFBSSxzQkFBVzswQkFBYTtvQ0FDL0IsR0FBUyxTQUFBLEVBQ1I7a0JBQUEsT0FBRyxTQUFBLEVBQUEsR0FBYSxTQUFBLEVBQUE7VUFBQTtTQUFBO1FBQUE7T0FBQTtNQUFBO0tBQUE7SUFBQTs7O0VBRXZCLHVDQUFXLFdBQVksV0FBVztFQUVsQyxxREFBVztHQUNWLFVBQU07R0FDTixXQUFPLFVBQ047SUFBQSxVQUFBLENBQUEsaUJBQWlCO0lBQ2pCLFVBQUEsQ0FBQSxTQUFXOzs7a0JBQ1gsU0FBQSxFQUNBO3NCQURFO2dDQUNGLFdBQU87R0FBQTs7RUFFVCxpREFBUztHQUNSLFVBQU07R0FDTixXQUFPLFVBQ047SUFBQSxVQUFBLENBQUU7T0FBSTtPQUFLO0lBQUEsaUJBQU87S0FDakIsVUFBQyxRQUFNO0tBQ1AsVUFBQyxRQUFNOzs7OztrQkFDUixTQUFBLEVBQ0E7a0NBQUEsS0FBUyxXQUFJLEVBQUU7R0FBQTs7RUFFakIsaURBQVM7R0FDUixVQUFNO0dBQ04sV0FBTyxVQUVOO0lBQUEsb0JBQUs7S0FDSixVQUFDLFFBQU07S0FDUCxVQUFDLFFBQU07OztJQUNSLFVBQUEsQ0FBQSxTQUFXO09BQUc7T0FBSztJQUFBO29CQUNuQixPQUFBLElBQVMsYUFBVSxhQUFBO3lDQUNILFVBQ2Y7WUFBQSx1QkFBUTtNQUNQLFVBQUEsTUFBSzs7Ozs7O2tCQUNQLFNBQUEsRUFDQTs7OERBQXdCLFNBQUEsSUFDdkI7eUJBQU0sRUFBRyxTQUFBLEtBQ1I7aUNBQUEsSUFBUSxTQUFTOztZQUNsQixPQUFBO0lBQUE7R0FBQTs7RUFFSCw0Q0FBVTtHQUNULFVBQU07R0FDTixXQUFPLFVBQ047SUFBQSxVQUFBLENBQUEsaUJBQWlCO0lBQ2pCLFVBQUEsQ0FBQSxlQUFlOzs7a0JBQ2hCOztrQkFFRDtFQXRQQSxzQ0FBQSIsImZpbGUiOiJPYmouanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==