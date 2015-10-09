"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Boolean","./compare","./js","./methods","./to-string","./Type/Kind","./Type/Pred-Type","./Type/Type","./at/at","./at/at-Type","./at/q","./at/Map/Map","./at/Set/Id-Set","./control"],(exports,Boolean_0,compare_1,js_2,methods_3,to_45string_4,Kind_5,Pred_45Type_6,Type_7,_64_8,_64_45Type_9,_63_10,Map_11,Id_45Set_12,control_13)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(Boolean_0),xor=_ms.get(_$0,"xor"),_$1=_ms.getModule(compare_1),_61_63=_ms.get(_$1,"=?"),_$2=_ms.getModule(js_2),defined_63=_ms.get(_$2,"defined?"),id_61_63=_ms.get(_$2,"id=?"),js_61_61=_ms.get(_$2,"js=="),js_45delete=_ms.get(_$2,"js-delete"),js_45set=_ms.get(_$2,"js-set"),js_45sub=_ms.get(_$2,"js-sub"),js_45typeof=_ms.get(_$2,"js-typeof"),_$3=_ms.getModule(methods_3),freeze=_ms.get(_$3,"freeze"),_$4=_ms.getModule(to_45string_4),inspect=_ms.get(_$4,"inspect"),Kind=_ms.getDefaultExport(Kind_5),_$5=_ms.getModule(Pred_45Type_6),Opt=_ms.get(_$5,"Opt"),_$6=_ms.getModule(Type_7),_61_62=_ms.get(_$6,"=>"),_$7=_ms.lazyGetModule(_64_8),_43_43=_ms.lazyProp(_$7,"++"),all_63=_ms.lazyProp(_$7,"all?"),count=_ms.lazyProp(_$7,"count"),empty_63=_ms.lazyProp(_$7,"empty?"),_64keep=_ms.lazyProp(_$7,"@keep"),_$8=_ms.lazyGetModule(_64_45Type_9),empty=_ms.lazyProp(_$8,"empty"),_63=_ms.lazy(()=>_ms.getDefaultExport(_63_10)),_$9=_ms.lazyGetModule(_63_10),_63_45or=_ms.lazyProp(_$9,"?-or"),Opt_45_62_63=_ms.lazyProp(_$9,"Opt->?"),Map=_ms.lazy(()=>_ms.getDefaultExport(Map_11)),_$10=_ms.lazyGetModule(Map_11),make_45map=_ms.lazyProp(_$10,"make-map"),Id_45Set=_ms.lazy(()=>_ms.getDefaultExport(Id_45Set_12)),_$11=_ms.lazyGetModule(control_13),opr=_ms.lazyProp(_$11,"opr");
		const Object_45Key=exports["Object-Key"]=new (Kind)((()=>{
			const built={};
			built[`name`]="Object-Key";
			const implementors=built.implementors=[String,Symbol];
			return built
		})());
		const can_45get_45p_63=exports["can-get-p?"]=function can_45get_45p_63(_){
			return ! js_61_61(_,null)
		};
		const flag_63=exports["flag?"]=function flag_63(obj,flag){
			_ms.checkContains(Object_45Key,flag,"flag");
			return _ms.checkContains(Boolean,_ms.unlazy(_63_45or)(_63p(obj,flag),false),"res")
		};
		const forbidden_45fun_45props=_ms.lazy(()=>_61_62(_ms.unlazy(Id_45Set),[`arguments`,`caller`]));
		const _64p_45all=exports["@p-all"]=function _64p_45all(_){
			const props=Object.getOwnPropertyNames(_);
			const own_45names=(()=>{
				if(_ms.contains(Function,_)){
					return _ms.unlazy(_64keep)(props,_=>{
						return ! _ms.contains(_ms.unlazy(forbidden_45fun_45props),_)
					})
				} else {
					return props
				}
			})();
			return _ms.unlazy(_43_43)(own_45names,Object.getOwnPropertySymbols(_))
		};
		const _64p=exports["@p"]=(()=>{
			return _=>{
				return (()=>{
					if(can_45get_45p_63(_)){
						return Object.keys(_)
					} else {
						return []
					}
				})()
			}
		})();
		const _63p=exports["?p"]=function _63p(_,prop_45name){
			_ms.checkContains(Object_45Key,prop_45name,"prop-name");
			return (p_63(_,prop_45name)?_ms.some((()=>{
				return js_45sub(_,prop_45name)
			})()):_ms.None)
		};
		const _63p_45with_45proto=exports["?p-with-proto"]=function _63p_45with_45proto(_,prop_45name){
			_ms.checkContains(Object_45Key,prop_45name,"prop-name");
			return (()=>{
				if(can_45get_45p_63(_)){
					return _ms.unlazy(Opt_45_62_63)(js_45sub(_,prop_45name))
				} else {
					return _ms.unlazy(empty)(_ms.unlazy(_63))
				}
			})()
		};
		const p=exports.p=function p(_,prop_45name){
			_ms.checkContains(Object_45Key,prop_45name,"prop-name");
			_ms.assert(p_63,_,prop_45name);
			return js_45sub(_,prop_45name)
		};
		const p_63=exports["p?"]=function p_63(_,prop_45name){
			_ms.checkContains(Object_45Key,prop_45name,"prop-name");
			return (can_45get_45p_63(_)&&Object.prototype.hasOwnProperty.call(_,prop_45name))
		};
		const p_45with_45proto_63=exports["p-with-proto?"]=(()=>{
			return (_,prop_45name)=>{
				_ms.checkContains(Object_45Key,prop_45name,"prop-name");
				return (can_45get_45p_63(_)&&defined_63(js_45sub(_,prop_45name)))
			}
		})();
		const object_61_63=exports["object=?"]=function object_61_63(a,b){
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
		};
		const empty_45Object=exports["empty-Object"]=Object.freeze(Object.create(Object.prototype));
		const empty_45Object_63=exports["empty-Object?"]=function empty_45Object_63(_){
			_ms.checkContains(Object,_,"_");
			return _ms.unlazy(empty_63)(_64p_45all(_))
		};
		const Object_45_62Map=exports["Object->Map"]=function Object_45_62Map(_){
			return _ms.unlazy(make_45map)(_64p(_),_ms.sub(p,_))
		};
		const Map_45_62Object=exports["Map->Object"]=function Map_45_62Object(_){
			_ms.checkContains(_ms.unlazy(Map),_,"_");
			return (obj=>{
				for(let elem of _){
					p_43_33(obj,_ms.sub(elem,0),_ms.sub(elem,1))
				};
				freeze(obj);
				return obj
			})(empty_45Object_33())
		};
		const prototype=exports.prototype=(()=>{
			return Object.getPrototypeOf
		})();
		const empty_45Object_33=exports["empty-Object!"]=function empty_45Object_33(prototype){
			_ms.checkContains(_ms.sub(Opt,Object),prototype,"prototype");
			return Object.create(_ms.unlazy(opr)(prototype,Object.prototype))
		};
		const p_43_33=exports["p+!"]=function p_43_33(_,prop_45name,val){
			_ms.checkContains(Object,_,"_");
			_ms.checkContains(Object_45Key,prop_45name,"prop-name");
			Object.defineProperty(_,prop_45name,(()=>{
				const built={};
				const enumerable=built.enumerable=true;
				const writable=built.writable=false;
				const value=built.value=val;
				return built
			})())
		};
		const p_43mut_33=exports["p+mut!"]=function p_43mut_33(_,prop_45name,val){
			_ms.checkContains(Object,_,"_");
			_ms.checkContains(Object_45Key,prop_45name,"prop-name");
			Object.defineProperty(_,prop_45name,(()=>{
				const built={};
				const enumerable=built.enumerable=true;
				const writable=built.writable=true;
				const value=built.value=val;
				const configurable=built.configurable=true;
				return built
			})())
		};
		const p_33=exports["p!"]=function p_33(_,prop_45name,new_45val){
			_ms.checkContains(Object,_,"_");
			_ms.checkContains(Object_45Key,prop_45name,"prop-name");
			_ms.assert(p_63,_,prop_45name);
			js_45set(_,prop_45name,new_45val)
		};
		const p_45_33=exports["p-!"]=function p_45_33(_,prop_45name){
			_ms.checkContains(Object,_,"_");
			_ms.checkContains(Object_45Key,prop_45name,"prop-name");
			_ms.assert(p_63,_,prop_45name);
			js_45delete(_,prop_45name)
		};
		const extend_33=exports["extend!"]=function extend_33(_,extender){
			_ms.checkContains(Object,_,"_");
			_ms.checkContains(Object,extender,"extender");
			Object.assign(_,extender)
		};
		const send=exports.send=function send(target,method_45name){
			const args=[].slice.call(arguments,2);
			_ms.checkContains(Object_45Key,method_45name,"method-name");
			const impl=js_45sub(target,method_45name);
			if(! _ms.contains(Function,impl))throw new (Error)(`Method ${inspect(method_45name)} not implemented by ${inspect(target)}.`);
			return impl.apply(target,args)
		};
		const send_33=exports["send!"]=send;
		const object_45merge=exports["object-merge"]=function object_45merge(){
			const objects=[].slice.call(arguments,0);
			return Object.assign(new (Object)(),...objects)
		};
		const map_45object_45values=exports["map-object-values"]=function map_45object_45values(obj,mapper){
			_ms.checkContains(Object,obj,"obj");
			_ms.checkContains(Function,mapper,"mapper");
			return (mapped=>{
				for(let key of _64p(obj)){
					p_43_33(mapped,key,mapper(p(obj,key)))
				};
				return mapped
			})(new (Object)())
		};
		const name=exports.name=`Object`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvT2JqZWN0Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBaUJBLHlDQUFZLEtBQUksTUFDSSxLQUFBOztTQUNuQixRQUFBO0dBQ0Esc0NBQWMsQ0FBQyxPQUFPOzs7RUFHdkIsNkNBQWEsMEJBQUEsRUFDQztVQUNiLEVBQUksU0FBSyxFQUFFO0VBQUE7RUFFWiwrQkFBUSxpQkFBUyxJQUFJLEtBQ2U7cUJBRFY7NEJBQWpCLDZCQUVGLEtBQUcsSUFBSSxNQUFNOztFQUVwQiwyQ0FBdUIsNEJBQVUsQ0FBRSxZQUFZO0VBQy9DLG1DQUFTLG9CQUFBLEVBQ0M7R0FFVCxZQTRJUywyQkE1SUs7R0FFZCxrQkFDZ0I7SUFBZixnQkF3SW9DLFNBeElwQyxHQUNTO2dDQUFGLE1BQU8sR0FDQzthQUFiLG1EQUFJO0tBQUE7SUFBQSxPQUVGO1lBQUg7SUFBQTtHQUFBOzZCQUNDLFlBb0lNLDZCQXBJVTtFQUFBO0VBRXBCLHlCQUNHLEtBQUE7VUFDRCxHQUFBO1dBQ0k7S0FBSixHQUFBLGlCQUFBLEdBQ1c7YUE4SEgsWUE5SEQ7S0FBQSxPQUVIO2FBQUg7S0FBQTtJQUFBO0dBQUE7RUFBQTtFQUVILHlCQUFLLGNBQUEsRUFBRSxZQUNvQjtxQkFEVjtVQUVoQixDQUFHLEtBQUcsRUFBRSwyQkFDUztXQUFoQixTQUFPLEVBQUU7R0FBQTs7RUFFWCxtREFBZ0IsNkJBQUEsRUFBRSxZQUNvQjtxQkFEVjtVQUd2QjtJQUFILEdBQUEsaUJBQUEsR0FDVztxQ0FBRixTQUFPLEVBQUU7SUFBQSxPQUVkOzs7OztFQUdOLGtCQUFJLFdBQUEsRUFBRSxZQUNvQjtxQkFEVjtjQUVQLEtBQUcsRUFBRTtVQUNiLFNBQU8sRUFBRTtFQUFBO0VBRVYseUJBQUssY0FBQSxFQUFFLFlBQ29CO3FCQURWO1VBRWhCLENBQUksaUJBQUEsSUFxR0sscUNBckc2QyxFQUFFO0VBQUE7RUFFekQsbURBQ2MsS0FBQTtVQUNaLENBQUEsRUFB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
