"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../compare","./../js","./../private/bootstrap","./Method","./Impl-Type","./../methods"],(exports,compare_0,js_1,bootstrap_2,Method_3,Impl_45Type_4,methods_5)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_$1=_ms.getModule(js_1),defined_63=_ms.get(_$1,"defined?"),js_61_61=_ms.get(_$1,"js=="),js_45sub=_ms.get(_$1,"js-sub"),_$2=_ms.getModule(bootstrap_2),implContains=_ms.get(_$2,"implContains"),pAdd=_ms.get(_$2,"pAdd"),_$3=_ms.getModule(Method_3),impl_33=_ms.get(_$3,"impl!"),propagate_45method_45down_33=_ms.get(_$3,"propagate-method-down!"),self_45impl_33=_ms.get(_$3,"self-impl!"),_$4=_ms.lazyGetModule(Impl_45Type_4),Self_45Type=_ms.lazyProp(_$4,"Self-Type"),_$5=_ms.lazyGetModule(methods_5),freeze=_ms.lazyProp(_$5,"freeze"),frozen_63=_ms.lazyProp(_$5,"frozen?");
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
							return _ms.unlazy(freeze)(_)
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
			return ! _ms.unlazy(frozen_63)(_.implementors)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvVHlwZS9LaW5kLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBU0EsMkJBQ1csS0FVUDtTQURIO0lBS1csWUFBQTs2QkFDVSxPQUFaO0tBRVIsc0JBQXNCLEtBQU0sT0FDSyxLQUFBOztNQUFoQyx3QkFBTzs7O3FCQUVSLG1CQUFvQjtNQUFBLFFBQUE7TUFDbkIsR0FBQSxXQUFBLEdBQ1M7Y0FDUjtNQUFBLE9BRUc7Y0FBSDtNQUFBO0tBQUE7cUJBRUYsb0JBQXFCO01BQUEsUUFBQTtNQUNwQixHQUFBLFdBQUEsR0FDUztpQ0FDUjtNQUFBLE9BRUc7Y0FBSDtNQUFBO0tBQUE7cUJBRUYsc0JBQXVCO01BQUEsUUFBQTtNQUN0QixHQUFBLFdBQUEsR0FDUztjQUNSO01BQUEsT0FFRztjQUFILE9BQVEsT0FBSzs7O3FCQUVmLGlCQUFrQjtNQUFBLFFBQUE7TUFDakIsR0FBQSxXQUFBLEdBQ1M7Y0FDUjtNQUFBLE9BRUc7Y0FBSCxjQUFjO01BQUE7S0FBQTtLQUVoQixLQUFLLGVBQVcsdUJBQWdCO0tBQzNCLFFBQUEsS0FBQSxrQkFDYTtNQUFqQixvQkFBZ0IsRUFBRTtLQUFBO0lBQUE7R0FBQTtHQXhDbkIsYUFBYSxFQUFJLFNBQUE7VUFFd0I7V0FBeEMsUUFBUSxDQUFLLEVBQUksU0FBSyxFQUFFLE9BQU8sU0FBTyxFQUFFOztVQUgxQztFQUFBO0VBMkNELCtDQUFlLDBCQUFBO3FCQUFFO1VBRWhCLHdCQUFZOztFQUdiLHFEQUFtQiw2QkFBQSxZQUFZO0dBRzlCLHVCQUF1QjtHQUN2QixvQkFBZ0IsWUFBWTtFQUFBO0VBRzdCLCtEQUF3QixpQ0FBQTtxQkFBSztVQUd2Qjs7WUFBQSxLQUFBLGtCQUNpQjtLQUNoQixnQkFBSCxLQUFELEdBQ0s7d0JBQUEsd0JBQUE7S0FBQSxPQUVEO29CQUFEO0tBQUE7SUFBQTs7OztFQUVOLCtCQUFTLGlCQUFBLFlBQVksS0FBVTtxQkFBTDtHQUtqQixLQUFBLGlCQUFhLHdCQUFhLEdBQUM7aUJBQzNCLFFBQU0sWUFBWTtHQUUxQixvQkFBZ0IsWUFBWTtHQUM1QixHQUFJLFdBQVMsZ0JBQ1k7SUFBbkIsUUFBQSxLQUFBLGVBQ1k7S0FDaEIsUUFBTyxTQUFPLEVBQUUsR0FBRyxZQUFhLFNBQU8sRUFBRTtJQUFBO0dBQUE7RUFBQTtFQUU1QywyQ0FBYyx3QkFBQSxZQUFtQixLQUFVO3FCQUFqQjtxQkFBWTtHQUVyQyxRQUFPLDhCQUFjLGFBQWE7R0FDbEMsR0FBSSxXQUFTLGdCQUNZO0lBQW5CLFFBQUEsS0FBQSxlQUNZO0tBQ2hCLGVBQVksU0FBTyxFQUFFLEdBQUcsWUFBYSxTQUFPLEVBQUU7SUFBQTtHQUFBO0VBQUE7RUFFakQsK0JBQVEsaUJBQUEsWUFBWTtxQkFBSztVQUluQjtJQUFBLFFBQUE7SUFDSixnQkFBQyxLQUFELEdBQ0s7WUFBSixzQkFBb0I7YUFDbkIsQ0FBSSxPQUFHLGFBQVcsT0FBTyxRQUFNLGFBQVc7S0FBQTtJQUFBLE9BRXhDO0tBQUgsUUFBSTt5QkFDSCxLQUFEO0lBQUE7R0FBQTtFQUFBO0VBR0YsaUJBQVUsb0JBQUE7VUFDVCwyQkFBTyxVQUE0Qiw2QkFBTztFQUFBO0VBRTNDLDBCQUFvQiw2QkFBQSxFQUFFO0dBQ3JCLGdCQUFLLEtBQUQsR0FDSztJQUFSLHNCQUFtQjtHQUFBO0dBQ3BCLHFCQUFpQixFQUFFO0VBQUE7RUFFcEIsMkJBQXFCLDhCQUFBLFlBQVk7R0FDaEMsYUFBUyxnQkFBQTtJQUNILFFBQUEsS0FBQSxXQUFPLGdCQUNjO0tBQXpCLDZCQUF1QixZQUFZLEVBQUcsU0FBTyxlQUFlO0lBQUE7SUFDeEQsUUFBQSxLQUFBLG9CQUNnQjtLQUFwQixPQUFLO0lBQUE7R0FBQTtHQUNQLE9BQUs7RUFBQSIsImZpbGUiOiJUeXBlL0tpbmQuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
