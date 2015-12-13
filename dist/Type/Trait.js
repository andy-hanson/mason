"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../compare","./../js","./../private/bootstrap","./Method","./Impl-Type"],(exports,compare_0,js_1,bootstrap_2,Method_3,Impl_45Type_4)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_$1=_ms.getModule(js_1),defined_63=_ms.get(_$1,"defined?"),exists_63=_ms.get(_$1,"exists?"),js_45sub=_ms.get(_$1,"js-sub"),_$2=_ms.getModule(bootstrap_2),addProperty=_ms.get(_$2,"addProperty"),implContains=_ms.get(_$2,"implContains"),msDef=_ms.get(_$2,"msDef"),_$3=_ms.getModule(Method_3),impl_33=_ms.get(_$3,"impl!"),propagate_45method_45down_33=_ms.get(_$3,"propagate-method-down!"),propagate_45static_45down_33=_ms.get(_$3,"propagate-static-down!"),self_45impl_33=_ms.get(_$3,"self-impl!"),_$4=_ms.lazyGetModule(Impl_45Type_4),Self_45Type=_ms.lazyProp(_$4,"Self-Type");
		let Trait=exports.default=(()=>{
			let _=class Trait{
				constructor(params){
					let _this=this;
					_ms.newProperty(_this,"name",params.name);
					_ms.newProperty(_this,"super-traits",[]);
					_ms.newProperty(_this,"implementors",_ms.checkInstance(Array,(()=>{
						let _=params.implementors;
						if(defined_63(_)){
							return Object.freeze(_)
						} else {
							return []
						}
					})(),"implementors"));
					_ms.newProperty(_this,"symbol-for-isa",Symbol(`isa-${_this.name}`));
					_ms.newProperty(_this,"prototype",Object.create(null));
					addProperty(_this.prototype,_this["symbol-for-isa"],true);
					for(let _ of _this.implementors){
						on_45implementor_33(_,_this)
					};
					if(defined_63(params["super-traits"])){
						for(let _ of params["super-traits"]){
							unchecked_45trait_33(_this,_)
						}
					}
				}
			};
			implContains(_,function(_){
				let _this=this;
				return (exists_63(_)&&Boolean(js_45sub(_,_this["symbol-for-isa"])))
			});
			return _
		})();
		msDef("trait",(_45name,super_45traits,static_45defs,proto_45defs)=>{
			let k=new (Trait)((()=>{
				let built={};
				built.name=_45name;
				built["super-traits"]=super_45traits;
				return built
			})());
			return (()=>{
				let _=k;
				assign_45defs_33(_,static_45defs);
				assign_45defs_33(_.prototype,proto_45defs);
				return _
			})()
		});
		let can_45subtype_63=exports["can-subtype?"]=function can_45subtype_63(_){
			_ms.checkInstance(Trait,_,"_");
			return ! Object.isFrozen(_.implementors)
		};
		let unchecked_45trait_33=exports["unchecked-trait!"]=function unchecked_45trait_33(implementor,trt){
			trt.implementors.push(implementor);
			on_45implementor_33(implementor,trt)
		};
		let _64concrete_45implementors=exports["@concrete-implementors"]=function _64concrete_45implementors(trt){
			_ms.checkInstance(Trait,trt,"trt");
			return (()=>{
				let built=[];
				for(let _ of trt.implementors){
					if(_ms.hasInstance(Trait,_)){
						_ms.addMany(built,_64concrete_45implementors(_))
					} else {
						_ms.add(built,_)
					}
				};
				return built
			})()
		};
		let trait_33=exports["trait!"]=function trait_33(implementor,trt,method_45impls){
			_ms.checkInstance(Trait,trt,"trt");
			if(! can_45subtype_63(trt))throw new (Error)(`${trt} is not open to new subtypes.`);
			_ms.assertNot(has_45trait_63,implementor,trt);
			unchecked_45trait_33(implementor,trt);
			if(defined_63(method_45impls)){
				for(let _ of method_45impls){
					impl_33(js_45sub(_,0),implementor,js_45sub(_,1))
				}
			}
		};
		msDef("traitDo",trait_33);
		let self_45trait_33=exports["self-trait!"]=function self_45trait_33(implementor,trt,method_45impls){
			_ms.checkInstance(Object,implementor,"implementor");
			_ms.checkInstance(Trait,trt,"trt");
			trait_33(new (_ms.unlazy(Self_45Type))(implementor),trt);
			if(defined_63(method_45impls)){
				for(let _ of method_45impls){
					self_45impl_33(js_45sub(_,0),implementor,js_45sub(_,1))
				}
			}
		};
		let has_45trait_63=exports["has-trait?"]=function has_45trait_63(implementor,trt){
			_ms.checkInstance(Trait,trt,"trt");
			return (()=>{
				let _=implementor;
				if(_ms.hasInstance(Trait,_)){
					return _["super-traits"].some(super_45trait=>{
						return (_61_63(super_45trait,trt)||has_45trait_63(super_45trait,trt))
					})
				} else {
					return _ms.hasInstance(trt,implementor.prototype)
				}
			})()
		};
		let _64p_45all=_=>Object.getOwnPropertyNames(_).concat(Object.getOwnPropertySymbols(_));
		let on_45implementor_33=function on_45implementor_33(_,trt){
			if(_ms.hasInstance(Trait,_)){
				_["super-traits"].push(trt)
			};
			inherit_45methods_33(_,trt)
		};
		let inherit_45methods_33=function inherit_45methods_33(implementor,trt){
			let rec_33=function rec_33(trt){
				for(let _ of _64p_45all(trt.prototype)){
					propagate_45method_45down_33(implementor,_,js_45sub(trt.prototype,_))
				};
				for(let _ of Object.keys(trt)){
					switch(_){
						case "name":
						case "super-traits":
						case "implementors":
						case "symbol-for-isa":
						case "prototype":{
							break
						}
						default:propagate_45static_45down_33(implementor,_,js_45sub(trt,_))
					}
				};
				for(let _ of Object.getOwnPropertySymbols(trt)){
					propagate_45static_45down_33(implementor,_,js_45sub(trt,_))
				};
				for(let _ of trt["super-traits"]){
					rec_33(_)
				}
			};
			rec_33(trt)
		};
		let assign_45defs_33=function assign_45defs_33(assignee,definitions){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvVHlwZS9UcmFpdC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVFBLDBCQUNZLEtBR1Q7O0lBSVEsWUFBQTtTQUZ3QjtxQkFBQSxhQUl6QjtxQkFKeUIscUJBTWpCO3FCQU5pQix1Q0FTbkIsTUFBYTtNQUFNLE1BQU47TUFDMUIsR0FBQSxXQUFTLEdBQ0E7Y0FDUixjQUFjO01BQUEsT0FFWDtjQUFIO01BQUE7S0FBQTtxQkFkK0IsdUJBZ0JmLE9BQVEsT0FoQk87cUJBQUEsa0JBaUJwQixjQUFjO0tBRTNCLFlBbkJpQyx3Q0FtQk07S0FFbkMsUUFBQSxLQXJCNkIsbUJBc0JoQjtNQUFoQixvQkFBaUIsRUF0QmU7S0FBQTtLQXVCOUIsR0FBQSxXQUFTLHdCQUNtQjtNQUExQixRQUFBLEtBQUEsdUJBQ21CO09BQXRCLHFCQXpCK0IsTUF5QlI7TUFBQTtLQUFBO0lBQUE7R0FBQTtHQTNCekIsYUFBYyxFQUFJLFNBQUE7UUFFZTtXQUFoQyxDQUFJLFVBQVEsSUFBRSxRQUFTLFNBQVEsRUFBQzs7OztFQTJCbkMsTUFBTyxRQUFPLENBQUEsUUFBTSxlQUFhLGNBQVk7R0FHNUMsTUFBSSxLQUFJLE9BQ0ssS0FBQTs7ZUFBTjswQkFDTjs7O1VBQ0ksS0FDQztVQUREO0lBQ0osaUJBQWMsRUFBQztJQUNmLGlCQUFjLFlBQVc7Ozs7RUFFM0IsNkNBQWUsMEJBQUE7cUJBQUU7VUFFaEIsRUFBSSxnQkFBaUI7O0VBR3RCLHFEQUFvQiw4QkFBQSxZQUFZO0dBRy9CLHNCQUFzQjtHQUN0QixvQkFBZ0IsWUFBWTtFQUFBO0VBRTdCLGlFQUF5QixvQ0FBQTtxQkFBSTtVQUl2Qjs7WUFBQSxLQUFBLGlCQUNnQjtLQUNoQixtQkFBRixNQUFELEdBQ007d0JBQUQsMkJBQXVCO0tBQUEsT0FFeEI7b0JBQUE7S0FBQTtJQUFBOzs7O0VBRVAsK0JBQVUsa0JBQUEsWUFBWSxJQUFVO3FCQUFOO0dBS2xCLEtBQUEsaUJBQWEsdUJBQVcsR0FBQztpQkFDekIsZUFBVyxZQUFZO0dBRTlCLHFCQUFpQixZQUFZO0dBQzFCLEdBQUEsV0FBUyxnQkFDWTtJQUFuQixRQUFBLEtBQUEsZUFDWTtLQUNmLFFBQU8sU0FBUSxFQUFDLEdBQUcsWUFBYSxTQUFRLEVBQUM7SUFBQTtHQUFBO0VBQUE7RUFFNUMsTUFBTyxVQUFRO0VBRWYsMkNBQWUseUJBQUEsWUFBbUIsSUFBVTtxQkFBakI7cUJBQVc7R0FFckMsU0FBUSw4QkFBYyxhQUFhO0dBQ2hDLEdBQUEsV0FBUyxnQkFDWTtJQUFuQixRQUFBLEtBQUEsZUFDWTtLQUNmLGVBQVksU0FBUSxFQUFDLEdBQUcsWUFBYSxTQUFRLEVBQUM7SUFBQTtHQUFBO0VBQUE7RUFFakQseUNBQWEsd0JBQUEsWUFBWTtxQkFBSTtVQUl2QjtJQUFBLE1BQUE7SUFDSixtQkFBQyxNQUFELEdBQ007WUFBSix1QkFBb0I7YUFDcEIsQ0FBSSxPQUFHLGNBQVksTUFBTSxlQUFXLGNBQVk7S0FBQTtJQUFBLE9BRTlDOzRCQUFtQixJQUF0Qjs7OztFQUdGLGtCQUFXLDJCQUEyQixVQUFRLDZCQUE2QjtFQUUzRSx3QkFBcUIsNkJBQUEsRUFBQztHQUNsQixtQkFBQyxNQUFELEdBQ007SUFBUCx1QkFBbUI7R0FBQTtHQUNyQixxQkFBa0IsRUFBQztFQUFBO0VBRXBCLHlCQUFxQiw4QkFBQSxZQUFZO0dBQ2hDLFdBQVMsZ0JBQUE7SUFDSixRQUFBLEtBQUEsV0FBTyxlQUNhO0tBQXZCLDZCQUF1QixZQUFhLEVBQUUsU0FBTyxjQUFlO0lBQUE7SUFFekQsUUFBQSxLQUFBLFlBQVksS0FDRztLQUNWLE9BQUE7V0FDTjtXQUFNO1dBQWM7V0FBYztXQUFnQixZQUNTOzs7Y0FFM0QsNkJBQXVCLFlBQWEsRUFBRSxTQUFPLElBQUs7S0FBQTtJQUFBO0lBR2pELFFBQUEsS0FBQSw2QkFBNkIsS0FDRztLQUFuQyw2QkFBdUIsWUFBYSxFQUFFLFNBQU8sSUFBSztJQUFBO0lBQy9DLFFBQUEsS0FBQSxvQkFDZ0I7S0FBbkIsT0FBTTtJQUFBO0dBQUE7R0FDUixPQUFLO0VBQUE7RUFFTixxQkFBaUIsMEJBQUEsU0FBUztHQUVyQixRQUFBLEtBQUEsMkJBQTJCLGFBQ1c7SUFBekMsc0JBQXNCLFNBQVUsRUFBRSxnQ0FBZ0MsWUFBYTtHQUFBO0dBQzVFLFFBQUEsS0FBQSw2QkFBNkIsYUFDVztJQUEzQyxzQkFBc0IsU0FBVSxFQUFFLGdDQUFnQyxZQUFhO0dBQUE7RUFBQSIsImZpbGUiOiJUeXBlL1RyYWl0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
