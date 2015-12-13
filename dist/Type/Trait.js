"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../compare","./../js","./../private/bootstrap","./Method"],(exports,compare_0,js_1,bootstrap_2,Method_3)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_$1=_ms.getModule(js_1),defined_63=_ms.get(_$1,"defined?"),exists_63=_ms.get(_$1,"exists?"),js_45sub=_ms.get(_$1,"js-sub"),_$2=_ms.getModule(bootstrap_2),implContains=_ms.get(_$2,"implContains"),msDef=_ms.get(_$2,"msDef"),_$3=_ms.getModule(Method_3),propagate_45method_45down_33=_ms.get(_$3,"propagate-method-down!"),propagate_45static_45down_33=_ms.get(_$3,"propagate-static-down!");
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
					Object.defineProperty(_this.prototype,_this["symbol-for-isa"],(()=>{
						return {
							value:true,
							writable:false,
							enumerable:false,
							configurable:false
						}
					})());
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
		msDef("trait",(_45name,super_45traits,static_45methods,methods)=>{
			let trt=new (Trait)((()=>{
				let built={};
				built.name=_45name;
				built["super-traits"]=super_45traits;
				return built
			})());
			return (()=>{
				let _=trt;
				assign_45defs_33(_,static_45methods);
				assign_45defs_33(_.prototype,methods);
				return _
			})()
		});
		let trait_45do_33=function trait_45do_33(implementor,trt){
			_ms.checkInstance(Trait,trt,"trt");
			if(! can_45subtype_63(trt))throw new (Error)(`${trt} is not open to new subtypes.`);
			_ms.assertNot(has_45trait_63,implementor,trt);
			unchecked_45trait_33(implementor,trt)
		};
		msDef("traitDo",trait_45do_33);
		msDef("traitWithDefs",(implementor,trt,static_45methods,methods)=>{
			_ms.checkInstance(Trait,trt,"trt");
			trait_45do_33(implementor,trt);
			assign_45defs_33(implementor,static_45methods);
			assign_45defs_33(implementor.prototype,methods)
		});
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
			let def_33=function def_33(_){
				Object.defineProperty(assignee,_,Object.getOwnPropertyDescriptor(definitions,_))
			};
			for(let _ of Object.getOwnPropertyNames(definitions)){
				def_33(_)
			};
			for(let _ of Object.getOwnPropertySymbols(definitions)){
				def_33(_)
			}
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvVHlwZS9UcmFpdC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQU1BLDBCQUNZLEtBR1Q7O0lBS1EsWUFBQTtTQUZ3QjtxQkFBQSxhQUl6QjtxQkFKeUIscUJBTWpCO3FCQU5pQix1Q0FTbkIsTUFBYTtNQUFNLE1BQU47TUFDMUIsR0FBQSxXQUFTLEdBQ0E7Y0FDUixjQUFjO01BQUEsT0FFWDtjQUFIO01BQUE7S0FBQTtxQkFkK0IsdUJBZ0JmLE9BQVEsT0FoQk87cUJBQUEsa0JBaUJwQixjQUFjO0tBRTNCLHNCQW5CaUMsd0NBb0JlLEtBQUE7YUFBL0M7YUFBUTtnQkFBZTtrQkFBa0I7b0JBQW9CO01BQUE7S0FBQTtLQUUxRCxRQUFBLEtBdEI2QixtQkF1QmhCO01BQWhCLG9CQUFpQixFQXZCZTtLQUFBO0tBd0I5QixHQUFBLFdBQVMsd0JBQ21CO01BQTFCLFFBQUEsS0FBQSx1QkFDbUI7T0FBdEIscUJBMUIrQixNQTBCUjtNQUFBO0tBQUE7SUFBQTtHQUFBO0dBNUJ6QixhQUFjLEVBQUksU0FBQTtRQUVlO1dBQWhDLENBQUksVUFBUSxJQUFFLFFBQVMsU0FBUSxFQUFDOzs7O0VBNEJuQyw2Q0FBZSwwQkFBQTtxQkFBRTtVQUVoQixFQUFJLGdCQUFpQjs7RUFHdEIscURBQW9CLDhCQUFBLFlBQVk7R0FHL0Isc0JBQXNCO0dBQ3RCLG9CQUFnQixZQUFZO0VBQUE7RUFFN0IsaUVBQXlCLG9DQUFBO3FCQUFJO1VBS3ZCOztZQUFBLEtBQUEsaUJBQ2dCO0tBQ2hCLG1CQUFGLE1BQUQsR0FDTTt3QkFBRCwyQkFBdUI7S0FBQSxPQUV4QjtvQkFBQTtLQUFBO0lBQUE7Ozs7RUFFUCxNQUFPLFFBQU8sQ0FBQSxRQUFNLGVBQWEsaUJBQWU7R0FFL0MsUUFBTSxLQUFJLE9BQ0ssS0FBQTs7ZUFBUjswQkFDTjs7O1VBQ0ksS0FDRztVQURIO0lBQ0osaUJBQWMsRUFBQztJQUNmLGlCQUFjLFlBQVc7Ozs7RUFFM0Isa0JBQWMsdUJBQUEsWUFBWTtxQkFBSTtHQUd0QixLQUFBLGlCQUFhLHVCQUFXLEdBQUM7aUJBQ3pCLGVBQVcsWUFBWTtHQUM5QixxQkFBaUIsWUFBWTtFQUFBO0VBRTlCLE1BQU8sVUFBUTtFQUVmLE1BQU8sZ0JBQWdCLENBQUEsWUFBWSxJQUFVLGlCQUFlO3FCQUFyQjtHQUN0QyxjQUFVLFlBQVk7R0FDdEIsaUJBQWEsWUFBWTtHQUN6QixpQkFBYSxzQkFBc0I7RUFBQTtFQUVwQyx5Q0FBYSx3QkFBQSxZQUFZO3FCQUFJO1VBSXZCO0lBQUEsTUFBQTtJQUNKLG1CQUFDLE1BQUQsR0FDTTtZQUFKLHVCQUFvQjthQUNwQixDQUFJLE9BQUcsY0FBWSxNQUFNLGVBQVcsY0FBWTtLQUFBO0lBQUEsT0FFOUM7NEJBQW1CLElBQXRCOzs7O0VBR0Ysa0JBQVcsMkJBQTJCLFVBQVEsNkJBQTZCO0VBRTNFLHdCQUFxQiw2QkFBQSxFQUFDO0dBQ2xCLG1CQUFDLE1BQUQsR0FDTTtJQUFQLHVCQUFtQjtHQUFBO0dBQ3JCLHFCQUFrQixFQUFDO0VBQUE7RUFFcEIseUJBQXFCLDhCQUFBLFlBQVk7R0FDaEMsV0FBUyxnQkFBQTtJQUNKLFFBQUEsS0FBQSxXQUFPLGVBQ2E7S0FBdkIsNkJBQXVCLFlBQWEsRUFBRSxTQUFPLGNBQWU7SUFBQTtJQUV6RCxRQUFBLEtBQUEsWUFBWSxLQUNHO0tBQ1YsT0FBQTtXQUNOO1dBQU07V0FBYztXQUFjO1dBQWdCLFlBQ1M7OztjQUUzRCw2QkFBdUIsWUFBYSxFQUFFLFNBQU8sSUFBSztLQUFBO0lBQUE7SUFHakQsUUFBQSxLQUFBLDZCQUE2QixLQUNHO0tBQW5DLDZCQUF1QixZQUFhLEVBQUUsU0FBTyxJQUFLO0lBQUE7SUFDL0MsUUFBQSxLQUFBLG9CQUNnQjtLQUFuQixPQUFNO0lBQUE7R0FBQTtHQUNSLE9BQUs7RUFBQTtFQUVOLHFCQUFpQiwwQkFBQSxTQUFTO0dBRXpCLFdBQVUsZ0JBQUE7SUFDVCxzQkFBc0IsU0FBVSxFQUFFLGdDQUFnQyxZQUFhO0dBQUE7R0FDNUUsUUFBQSxLQUFBLDJCQUEyQixhQUNXO0lBQXpDLE9BQU07R0FBQTtHQUNILFFBQUEsS0FBQSw2QkFBNkIsYUFDVztJQUEzQyxPQUFNO0dBQUE7RUFBQSIsImZpbGUiOiJUeXBlL1RyYWl0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
