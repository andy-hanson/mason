"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../compare","./../js","./../private/bootstrap","./Method","./Impl-Type"],(exports,compare_0,js_1,bootstrap_2,Method_3,Impl_45Type_4)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_$1=_ms.getModule(js_1),defined_63=_ms.get(_$1,"defined?"),js_61_61=_ms.get(_$1,"js=="),js_45sub=_ms.get(_$1,"js-sub"),_$2=_ms.getModule(bootstrap_2),implContains=_ms.get(_$2,"implContains"),msDef=_ms.get(_$2,"msDef"),pAdd=_ms.get(_$2,"pAdd"),_$3=_ms.getModule(Method_3),impl_33=_ms.get(_$3,"impl!"),propagate_45method_45down_33=_ms.get(_$3,"propagate-method-down!"),self_45impl_33=_ms.get(_$3,"self-impl!"),_$4=_ms.lazyGetModule(Impl_45Type_4),Self_45Type=_ms.lazyProp(_$4,"Self-Type");
		const Kind=exports.default=(()=>{
			const _=class Kind{
				constructor(params){
					_ms.newProperty(this,"name",_ms.checkContains(String,params.name,"name"));
					_ms.newProperty(this,"super-kinds",[]);
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
					};
					if(defined_63(params["super-kinds"])){
						for(let _ of params["super-kinds"]){
							unchecked_45kind_33(this,_)
						}
					}
				}
			};
			implContains(_,function(_){
				const _this=this;
				return Boolean((! js_61_61(_,null)&&js_45sub(_,_this["symbol-for-isa"])))
			});
			return _
		})();
		msDef("kind",(_45name,super_45kinds,static_45defs,proto_45defs)=>{
			const k=new (Kind)((()=>{
				const built={};
				built.name=_45name;
				built["super-kinds"]=super_45kinds;
				return built
			})());
			return (()=>{
				const _=k;
				assign_45defs_33(_,static_45defs);
				assign_45defs_33(_.prototype,proto_45defs);
				return _
			})()
		});
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
		const assign_45defs_33=function assign_45defs_33(assignee,definitions){
			for(let _ of Object.getOwnPropertyNames(definitions)){
				Object.defineProperty(assignee,_,Object.getOwnPropertyDescriptor(definitions,_))
			};
			for(let _ of Object.getOwnPropertySymbols(definitions)){
				Object.defineProperty(assignee,_,Object.getOwnPropertyDescriptor(definitions,_))
			}
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvVHlwZS9LaW5kLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBUUEsMkJBQ1csS0FVUjs7SUFJUSxZQUFBO3FCQUNULDhCQUFNLE9BQVM7cUJBRWYsbUJBQWU7cUJBR2Ysc0NBQWMsTUFBYTtNQUFNLFFBQU47TUFDMUIsR0FBQSxXQUFBLEdBQ1M7Y0FDUixjQUFPO01BQUEsT0FFSjtjQUFIO01BQUE7S0FBQTtxQkFFRixzQkFBa0IsT0FBUSxPQUFLO3FCQUMvQixpQkFBYSxjQUFjO0tBRTNCLEtBQUssZUFBVyx1QkFBZ0I7S0FFNUIsUUFBQSxLQUFBLGtCQUNhO01BQWhCLG9CQUFnQixFQUFFO0tBQUE7S0FDaEIsR0FBQSxXQUFTLHVCQUNrQjtNQUF6QixRQUFBLEtBQUEsc0JBQ2tCO09BQXJCLG9CQUFnQixLQUFLO01BQUE7S0FBQTtJQUFBO0dBQUE7R0ExQnZCLGFBQWEsRUFBSSxTQUFBO1VBRXdCO1dBQXhDLFFBQVEsQ0FBSyxFQUFJLFNBQUssRUFBRSxPQUFPLFNBQU8sRUFBRTs7OztFQTBCM0MsTUFBTyxPQUFNLENBQUEsUUFBTSxjQUFZLGNBQVk7R0FHMUMsUUFBSSxLQUFJLE1BQ0ksS0FBQTs7ZUFBTDt5QkFDTjs7O1VBQ0ksS0FDQztZQUREO0lBQ0osaUJBQWEsRUFBRTtJQUNmLGlCQUFhLFlBQVk7Ozs7RUFFM0IsK0NBQWUsMEJBQUE7cUJBQUU7VUFFaEIsRUFBSSxnQkFBZ0I7O0VBR3JCLHFEQUFtQiw2QkFBQSxZQUFZO0dBRzlCLHNCQUFzQjtHQUN0QixvQkFBZ0IsWUFBWTtFQUFBO0VBRzdCLCtEQUF3QixpQ0FBQTtxQkFBSTtVQUd0Qjs7WUFBQSxLQUFBLGlCQUNnQjtLQUNoQixnQkFBRixLQUFELEdBQ0s7d0JBQUEsd0JBQUE7S0FBQSxPQUVEO29CQUFEO0tBQUE7SUFBQTs7OztFQUVOLCtCQUFTLGlCQUFBLFlBQVksSUFBUztxQkFBTDtHQUtqQixLQUFBLGlCQUFhLHVCQUFXLEdBQUM7aUJBQ3pCLFFBQU0sWUFBWTtHQUV6QixvQkFBZ0IsWUFBWTtHQUN6QixHQUFBLFdBQVMsZ0JBQ1k7SUFBbkIsUUFBQSxLQUFBLGVBQ1k7S0FDZixRQUFPLFNBQU8sRUFBRSxHQUFHLFlBQWEsU0FBTyxFQUFFO0lBQUE7R0FBQTtFQUFBO0VBRTVDLE1BQU8sU0FBTztFQUVkLDJDQUFjLHdCQUFBLFlBQW1CLElBQVM7cUJBQWhCO3FCQUFXO0dBRXBDLFFBQU8sOEJBQWMsYUFBYTtHQUMvQixHQUFBLFdBQVMsZ0JBQ1k7SUFBbkIsUUFBQSxLQUFBLGVBQ1k7S0FDZixlQUFZLFNBQU8sRUFBRSxHQUFHLFlBQWEsU0FBTyxFQUFFO0lBQUE7R0FBQTtFQUFBO0VBRWpELCtCQUFRLGlCQUFBLFlBQVk7cUJBQUk7VUFJbEI7SUFBQSxRQUFBO0lBQ0osZ0JBQUMsS0FBRCxHQUNLO1lBQUosc0JBQW9CO2FBQ25CLENBQUksT0FBRyxhQUFXLE1BQU0sUUFBTSxhQUFXO0tBQUE7SUFBQSxPQUV2QztLQUFILFFBQUk7eUJBQ0gsSUFBRDtJQUFBO0dBQUE7RUFBQTtFQUdGLGlCQUFVLG9CQUFBO1VBQ1QsMkJBQU8sVUFBNEIsNkJBQU87RUFBQTtFQUUzQywwQkFBb0IsNkJBQUEsRUFBRTtHQUNsQixnQkFBQyxLQUFELEdBQ0s7SUFBUCxzQkFBbUI7R0FBQTtHQUNwQixxQkFBaUIsRUFBRTtFQUFBO0VBRXBCLDJCQUFxQiw4QkFBQSxZQUFZO0dBQ2hDLGFBQVMsZ0JBQUE7SUFDSixRQUFBLEtBQUEsV0FBTyxlQUNhO0tBQXZCLDZCQUF1QixZQUFZLEVBQUcsU0FBTyxjQUFjO0lBQUE7SUFDeEQsUUFBQSxLQUFBLG1CQUNlO0tBQWxCLE9BQUs7SUFBQTtHQUFBO0dBQ1AsT0FBSztFQUFBO0VBRU4sdUJBQWlCLDBCQUFBLFNBQVM7R0FFckIsUUFBQSxLQUFBLDJCQUEyQixhQUNXO0lBQXpDLHNCQUFzQixTQUFTLEVBQUcsZ0NBQWdDLFlBQVk7R0FBQTtHQUMzRSxRQUFBLEtBQUEsNkJBQTZCLGFBQ1c7SUFBM0Msc0JBQXNCLFNBQVMsRUFBRyxnQ0FBZ0MsWUFBWTtHQUFBO0VBQUEiLCJmaWxlIjoiVHlwZS9LaW5kLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
