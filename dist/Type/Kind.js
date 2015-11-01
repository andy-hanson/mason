"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../compare","./../js","./../private/bootstrap","./Method","./Impl-Type"],(exports,compare_0,js_1,bootstrap_2,Method_3,Impl_45Type_4)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_$1=_ms.getModule(js_1),defined_63=_ms.get(_$1,"defined?"),js_61_61=_ms.get(_$1,"js=="),js_45sub=_ms.get(_$1,"js-sub"),_$2=_ms.getModule(bootstrap_2),implContains=_ms.get(_$2,"implContains"),msDef=_ms.get(_$2,"msDef"),pAdd=_ms.get(_$2,"pAdd"),_$3=_ms.getModule(Method_3),impl_33=_ms.get(_$3,"impl!"),propagate_45method_45down_33=_ms.get(_$3,"propagate-method-down!"),self_45impl_33=_ms.get(_$3,"self-impl!"),_$4=_ms.lazyGetModule(Impl_45Type_4),Self_45Type=_ms.lazyProp(_$4,"Self-Type");
		const Kind=exports.default=(()=>{
			const _=class Kind{
				constructor(params){
					_ms.newProperty(this,"name",_ms.checkContains(String,params.name,"name"));
					_ms.newProperty(this,"super-kinds",_ms.checkContains(Array,(()=>{
						const _=params["super-kinds"];
						if(defined_63(_)){
							return _
						} else {
							return []
						}
					})(),"super-kinds"));
					_ms.newProperty(this,"implementors",_ms.checkContains(Array,(()=>{
						const _=params.implementors;
						if(defined_63(_)){
							return Object.freeze(_)
						} else {
							return []
						}
					})(),"implementors"));
					_ms.newProperty(this,"symbol-for-isa",Symbol(`isa-${this.name}`));
					_ms.newProperty(this,"prototype",Object.create(null));
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
		const unchecked_45kind_33=exports["unchecked-kind!"]=function unchecked_45kind_33(implementor,knd){
			knd.implementors.push(implementor);
			on_45implementor_33(implementor,knd)
		};
		const concrete_45implementors=exports["concrete-implementors"]=function concrete_45implementors(knd){
			_ms.checkContains(Kind,knd,"knd");
			return (()=>{
				const built=[];
				for(let _ of knd.implementors){
					if(_ms.contains(Kind,_)){
						_ms.addMany(built,concrete_45implementors(_))
					} else {
						_ms.add(built,_)
					}
				};
				return built
			})()
		};
		const kind_33=exports["kind!"]=function kind_33(implementor,knd,method_45impls){
			_ms.checkContains(Kind,knd,"knd");
			if(! can_45subtype_63(knd))throw new (Error)(`${knd} is not open to new subtypes.`);
			_ms.assertNot(kind_63,implementor,knd);
			unchecked_45kind_33(implementor,knd);
			if(defined_63(method_45impls)){
				for(let _ of method_45impls){
					impl_33(js_45sub(_,0),implementor,js_45sub(_,1))
				}
			}
		};
		msDef("kindDo",kind_33);
		const self_45kind_33=exports["self-kind!"]=function self_45kind_33(implementor,knd,method_45impls){
			_ms.checkContains(Object,implementor,"implementor");
			_ms.checkContains(Kind,knd,"knd");
			kind_33(new (_ms.unlazy(Self_45Type))(implementor),knd);
			if(defined_63(method_45impls)){
				for(let _ of method_45impls){
					self_45impl_33(js_45sub(_,0),implementor,js_45sub(_,1))
				}
			}
		};
		const kind_63=exports["kind?"]=function kind_63(implementor,knd){
			_ms.checkContains(Kind,knd,"knd");
			return (()=>{
				const _=implementor;
				if(_ms.contains(Kind,_)){
					return _["super-kinds"].some(super_45kind=>{
						return (_61_63(super_45kind,knd)||kind_63(super_45kind,knd))
					})
				} else {
					const _=implementor.prototype;
					return _ms.contains(knd,_)
				}
			})()
		};
		const _64p_45all=function _64p_45all(_){
			return Object.getOwnPropertyNames(_).concat(Object.getOwnPropertySymbols(_))
		};
		const on_45implementor_33=function on_45implementor_33(_,knd){
			if(_ms.contains(Kind,_)){
				_["super-kinds"].push(knd)
			};
			inherit_45methods_33(_,knd)
		};
		const inherit_45methods_33=function inherit_45methods_33(implementor,knd){
			const rec_33=function rec_33(knd){
				for(let _ of _64p_45all(knd.prototype)){
					propagate_45method_45down_33(implementor,_,js_45sub(knd.prototype,_))
				};
				for(let _ of knd["super-kinds"]){
					rec_33(_)
				}
			};
			rec_33(knd)
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvVHlwZS9LaW5kLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBUUEsMkJBQ1csS0FVUDs7SUFJUSxZQUFBO3FCQUNWLDhCQUFNLE9BQVM7cUJBRWYscUNBQWEsTUFBYTtNQUFBLFFBQUE7TUFDekIsR0FBQSxXQUFBLEdBQ1M7Y0FBUjtNQUFBLE9BRUc7Y0FBSDtNQUFBO0tBQUE7cUJBR0Ysc0NBQWMsTUFBYTtNQUFBLFFBQUE7TUFDMUIsR0FBQSxXQUFBLEdBQ1M7Y0FDUixjQUFPO01BQUEsT0FFSjtjQUFIO01BQUE7S0FBQTtxQkFFRixzQkFBa0IsT0FBUSxPQUFLO3FCQUMvQixpQkFBYSxjQUFjO0tBRTNCLEtBQUssZUFBVyx1QkFBZ0I7S0FFM0IsUUFBQSxLQUFBLGtCQUNhO01BQWpCLG9CQUFnQixFQUFFO0tBQUE7SUFBQTtHQUFBO0dBM0JuQixhQUFhLEVBQUksU0FBQTtVQUV3QjtXQUF4QyxRQUFRLENBQUssRUFBSSxTQUFLLEVBQUUsT0FBTyxTQUFPLEVBQUU7Ozs7RUEyQjNDLCtDQUFlLDBCQUFBO3FCQUFFO1VBRWhCLEVBQUksZ0JBQWdCOztFQUdyQixxREFBbUIsNkJBQUEsWUFBWTtHQUc5QixzQkFBc0I7R0FDdEIsb0JBQWdCLFlBQVk7RUFBQTtFQUc3QiwrREFBd0IsaUNBQUE7cUJBQUk7VUFHdEI7O1lBQUEsS0FBQSxpQkFDZ0I7S0FDZixnQkFBSCxLQUFELEdBQ0s7d0JBQUEsd0JBQUE7S0FBQSxPQUVEO29CQUFEO0tBQUE7SUFBQTs7OztFQUVOLCtCQUFTLGlCQUFBLFlBQVksSUFBUztxQkFBTDtHQUtoQixLQUFBLGlCQUFhLHVCQUFZLEdBQUM7aUJBQzFCLFFBQU0sWUFBWTtHQUUxQixvQkFBZ0IsWUFBWTtHQUM1QixHQUFJLFdBQVMsZ0JBQ1k7SUFBbkIsUUFBQSxLQUFBLGVBQ1k7S0FDaEIsUUFBTyxTQUFPLEVBQUUsR0FBRyxZQUFhLFNBQU8sRUFBRTtJQUFBO0dBQUE7RUFBQTtFQUU1QyxNQUFPLFNBQU87RUFFZCwyQ0FBYyx3QkFBQSxZQUFtQixJQUFTO3FCQUFoQjtxQkFBVztHQUVwQyxRQUFPLDhCQUFjLGFBQWE7R0FDbEMsR0FBSSxXQUFTLGdCQUNZO0lBQW5CLFFBQUEsS0FBQSxlQUNZO0tBQ2hCLGVBQVksU0FBTyxFQUFFLEdBQUcsWUFBYSxTQUFPLEVBQUU7SUFBQTtHQUFBO0VBQUE7RUFFakQsK0JBQVEsaUJBQUEsWUFBWTtxQkFBSTtVQUlsQjtJQUFBLFFBQUE7SUFDSixnQkFBQyxLQUFELEdBQ0s7WUFBSixzQkFBb0I7YUFDbkIsQ0FBSSxPQUFHLGFBQVcsTUFBTSxRQUFNLGFBQVc7S0FBQTtJQUFBLE9BRXZDO0tBQUgsUUFBSTt5QkFDSCxJQUFEO0lBQUE7R0FBQTtFQUFBO0VBR0YsaUJBQVUsb0JBQUE7VUFDVCwyQkFBTyxVQUE0Qiw2QkFBTztFQUFBO0VBRTNDLDBCQUFvQiw2QkFBQSxFQUFFO0dBQ3JCLGdCQUFLLEtBQUQsR0FDSztJQUFSLHNCQUFtQjtHQUFBO0dBQ3BCLHFCQUFpQixFQUFFO0VBQUE7RUFFcEIsMkJBQXFCLDhCQUFBLFlBQVk7R0FDaEMsYUFBUyxnQkFBQTtJQUNILFFBQUEsS0FBQSxXQUFPLGVBQ2E7S0FBeEIsNkJBQXVCLFlBQVksRUFBRyxTQUFPLGNBQWM7SUFBQTtJQUN2RCxRQUFBLEtBQUEsbUJBQ2U7S0FBbkIsT0FBSztJQUFBO0dBQUE7R0FDUCxPQUFLO0VBQUEiLCJmaWxlIjoiVHlwZS9LaW5kLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
