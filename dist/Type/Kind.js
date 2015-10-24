"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../compare","./../js","./../private/bootstrap","./Method","./Impl-Type"],(exports,compare_0,js_1,bootstrap_2,Method_3,Impl_45Type_4)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_$1=_ms.getModule(js_1),defined_63=_ms.get(_$1,"defined?"),js_61_61=_ms.get(_$1,"js=="),js_45sub=_ms.get(_$1,"js-sub"),_$2=_ms.getModule(bootstrap_2),implContains=_ms.get(_$2,"implContains"),pAdd=_ms.get(_$2,"pAdd"),_$3=_ms.getModule(Method_3),impl_33=_ms.get(_$3,"impl!"),propagate_45method_45down_33=_ms.get(_$3,"propagate-method-down!"),self_45impl_33=_ms.get(_$3,"self-impl!"),_$4=_ms.lazyGetModule(Impl_45Type_4),Self_45Type=_ms.lazyProp(_$4,"Self-Type");
		const Kind=exports.default=(()=>{
			const _=class Kind{
				constructor(params){
					_ms.assert(_ms.contains,String,params.name);
					Object.defineProperty(this,`name`,(()=>{
						const built={};
						const value=built.value=params.name;
						return built
					})());
					_ms.newProperty(this,"super-kinds",(()=>{
						const _=params["super-kinds"];
						if(defined_63(_)){
							return _
						} else {
							return []
						}
					})());
					_ms.newProperty(this,"implementors",(()=>{
						const _=params.implementors;
						if(defined_63(_)){
							return Object.freeze(_)
						} else {
							return []
						}
					})());
					_ms.newProperty(this,"symbol-for-isa",(()=>{
						const _=params["symbol-for-isa"];
						if(defined_63(_)){
							return _
						} else {
							return Symbol(`isa-${this.name}`)
						}
					})());
					_ms.newProperty(this,"prototype",(()=>{
						const _=params.prototype;
						if(defined_63(_)){
							return _
						} else {
							return Object.create(null)
						}
					})());
					pAdd(this.prototype,this["symbol-for-isa"],true);
					for(let _ of this.implementors){
						on_45implementor_33(_,this)
					}
				}
			};
			implContains(_,function(_){
				const _this=this;
				return Boolean((! js_61_61(_,null)&&js_45sub(_,_this["symbol-for-isa"])))
			});
			return _
		})();
		const can_45subtype_63=exports["can-subtype?"]=function can_45subtype_63(_){
			_ms.checkContains(Kind,_,"_");
			return ! Object.isFrozen(_.implementors)
		};
		const unchecked_45kind_33=exports["unchecked-kind!"]=function unchecked_45kind_33(implementor,kind){
			kind.implementors.push(implementor);
			on_45implementor_33(implementor,kind)
		};
		const concrete_45implementors=exports["concrete-implementors"]=function concrete_45implementors(kind){
			_ms.checkContains(Kind,kind,"kind");
			return (()=>{
				const built=[];
				for(let _ of kind.implementors){
					if(_ms.contains(Kind,_)){
						_ms.addMany(built,concrete_45implementors(_))
					} else {
						_ms.add(built,_)
					}
				};
				return built
			})()
		};
		const kind_33=exports["kind!"]=function kind_33(implementor,kind,method_45impls){
			_ms.checkContains(Kind,kind,"kind");
			if(! can_45subtype_63(kind))throw new (Error)(`${kind} is not open to new subtypes.`);
			_ms.assertNot(kind_63,implementor,kind);
			unchecked_45kind_33(implementor,kind);
			if(defined_63(method_45impls)){
				for(let _ of method_45impls){
					impl_33(js_45sub(_,0),implementor,js_45sub(_,1))
				}
			}
		};
		const self_45kind_33=exports["self-kind!"]=function self_45kind_33(implementor,kind,method_45impls){
			_ms.checkContains(Object,implementor,"implementor");
			_ms.checkContains(Kind,kind,"kind");
			kind_33(new (_ms.unlazy(Self_45Type))(implementor),kind);
			if(defined_63(method_45impls)){
				for(let _ of method_45impls){
					self_45impl_33(js_45sub(_,0),implementor,js_45sub(_,1))
				}
			}
		};
		const kind_63=exports["kind?"]=function kind_63(implementor,kind){
			_ms.checkContains(Kind,kind,"kind");
			return (()=>{
				const _=implementor;
				if(_ms.contains(Kind,_)){
					return _["super-kinds"].some(super_45kind=>{
						return (_61_63(super_45kind,kind)||kind_63(super_45kind,kind))
					})
				} else {
					const _=implementor.prototype;
					return _ms.contains(kind,_)
				}
			})()
		};
		const _64p_45all=function _64p_45all(_){
			return Object.getOwnPropertyNames(_).concat(Object.getOwnPropertySymbols(_))
		};
		const on_45implementor_33=function on_45implementor_33(_,kind){
			if(_ms.contains(Kind,_)){
				_["super-kinds"].push(kind)
			};
			inherit_45methods_33(_,kind)
		};
		const inherit_45methods_33=function inherit_45methods_33(implementor,kind){
			const rec_33=function rec_33(kind){
				for(let _ of _64p_45all(kind.prototype)){
					propagate_45method_45down_33(implementor,_,js_45sub(kind.prototype,_))
				};
				for(let _ of kind["super-kinds"]){
					rec_33(_)
				}
			};
			rec_33(kind)
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvVHlwZS9LaW5kLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBUUEsMkJBQ1csS0FVUDtTQURIO0lBS1csWUFBQTs2QkFDVSxPQUFaO0tBRVIsc0JBQXNCLEtBQU0sT0FDSyxLQUFBOztNQUFoQyx3QkFBTzs7O3FCQUVSLG1CQUFvQjtNQUFBLFFBQUE7TUFDbkIsR0FBQSxXQUFBLEdBQ1M7Y0FDUjtNQUFBLE9BRUc7Y0FBSDtNQUFBO0tBQUE7cUJBRUYsb0JBQXFCO01BQUEsUUFBQTtNQUNwQixHQUFBLFdBQUEsR0FDUztjQUVSLGNBQU87TUFBQSxPQUVKO2NBQUg7TUFBQTtLQUFBO3FCQUVGLHNCQUF1QjtNQUFBLFFBQUE7TUFDdEIsR0FBQSxXQUFBLEdBQ1M7Y0FDUjtNQUFBLE9BRUc7Y0FBSCxPQUFRLE9BQUs7OztxQkFFZixpQkFBa0I7TUFBQSxRQUFBO01BQ2pCLEdBQUEsV0FBQSxHQUNTO2NBQ1I7TUFBQSxPQUVHO2NBQUgsY0FBYztNQUFBO0tBQUE7S0FFaEIsS0FBSyxlQUFXLHVCQUFnQjtLQUMzQixRQUFBLEtBQUEsa0JBQ2E7TUFBakIsb0JBQWdCLEVBQUU7S0FBQTtJQUFBO0dBQUE7R0F6Q25CLGFBQWEsRUFBSSxTQUFBO1VBRXdCO1dBQXhDLFFBQVEsQ0FBSyxFQUFJLFNBQUssRUFBRSxPQUFPLFNBQU8sRUFBRTs7VUFIMUM7RUFBQTtFQTRDRCwrQ0FBZSwwQkFBQTtxQkFBRTtVQUVoQixFQUFJLGdCQUFnQjs7RUFHckIscURBQW1CLDZCQUFBLFlBQVk7R0FHOUIsdUJBQXVCO0dBQ3ZCLG9CQUFnQixZQUFZO0VBQUE7RUFHN0IsK0RBQXdCLGlDQUFBO3FCQUFLO1VBR3ZCOztZQUFBLEtBQUEsa0JBQ2lCO0tBQ2hCLGdCQUFILEtBQUQsR0FDSzt3QkFBQSx3QkFBQTtLQUFBLE9BRUQ7b0JBQUQ7S0FBQTtJQUFBOzs7O0VBRU4sK0JBQVMsaUJBQUEsWUFBWSxLQUFVO3FCQUFMO0dBS2pCLEtBQUEsaUJBQWEsd0JBQWEsR0FBQztpQkFDM0IsUUFBTSxZQUFZO0dBRTFCLG9CQUFnQixZQUFZO0dBQzVCLEdBQUksV0FBUyxnQkFDWTtJQUFuQixRQUFBLEtBQUEsZUFDWTtLQUNoQixRQUFPLFNBQU8sRUFBRSxHQUFHLFlBQWEsU0FBTyxFQUFFO0lBQUE7R0FBQTtFQUFBO0VBRTVDLDJDQUFjLHdCQUFBLFlBQW1CLEtBQVU7cUJBQWpCO3FCQUFZO0dBRXJDLFFBQU8sOEJBQWMsYUFBYTtHQUNsQyxHQUFJLFdBQVMsZ0JBQ1k7SUFBbkIsUUFBQSxLQUFBLGVBQ1k7S0FDaEIsZUFBWSxTQUFPLEVBQUUsR0FBRyxZQUFhLFNBQU8sRUFBRTtJQUFBO0dBQUE7RUFBQTtFQUVqRCwrQkFBUSxpQkFBQSxZQUFZO3FCQUFLO1VBSW5CO0lBQUEsUUFBQTtJQUNKLGdCQUFDLEtBQUQsR0FDSztZQUFKLHNCQUFvQjthQUNuQixDQUFJLE9BQUcsYUFBVyxPQUFPLFFBQU0sYUFBVztLQUFBO0lBQUEsT0FFeEM7S0FBSCxRQUFJO3lCQUNILEtBQUQ7SUFBQTtHQUFBO0VBQUE7RUFHRixpQkFBVSxvQkFBQTtVQUNULDJCQUFPLFVBQTRCLDZCQUFPO0VBQUE7RUFFM0MsMEJBQW9CLDZCQUFBLEVBQUU7R0FDckIsZ0JBQUssS0FBRCxHQUNLO0lBQVIsc0JBQW1CO0dBQUE7R0FDcEIscUJBQWlCLEVBQUU7RUFBQTtFQUVwQiwyQkFBcUIsOEJBQUEsWUFBWTtHQUNoQyxhQUFTLGdCQUFBO0lBQ0gsUUFBQSxLQUFBLFdBQU8sZ0JBQ2M7S0FBekIsNkJBQXVCLFlBQVksRUFBRyxTQUFPLGVBQWU7SUFBQTtJQUN4RCxRQUFBLEtBQUEsb0JBQ2dCO0tBQXBCLE9BQUs7SUFBQTtHQUFBO0dBQ1AsT0FBSztFQUFBIiwiZmlsZSI6IlR5cGUvS2luZC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
