"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../compare","../js","../private/bootstrap","./Method","../at/at","./Impl-Type","../methods"],(exports,compare_0,js_1,bootstrap_2,Method_3,_64_4,Impl_45Type_5,methods_6)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_$1=_ms.getModule(js_1),defined_63=_ms.get(_$1,"defined?"),js_61_61=_ms.get(_$1,"js=="),js_45sub=_ms.get(_$1,"js-sub"),_$2=_ms.getModule(bootstrap_2),implContains=_ms.get(_$2,"implContains"),pAdd=_ms.get(_$2,"pAdd"),_$3=_ms.getModule(Method_3),impl_33=_ms.get(_$3,"impl!"),propagate_45method_45down_33=_ms.get(_$3,"propagate-method-down!"),self_45impl_33=_ms.get(_$3,"self-impl!"),_64=_ms.lazy(()=>_ms.getDefaultExport(_64_4)),_$4=_ms.lazyGetModule(Impl_45Type_5),Self_45Type=_ms.lazyProp(_$4,"Self-Type"),_$5=_ms.lazyGetModule(methods_6),freeze=_ms.lazyProp(_$5,"freeze"),frozen_63=_ms.lazyProp(_$5,"frozen?");
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
			return _ms.checkContains(_ms.unlazy(_64),(()=>{
				const built=[];
				for(let _ of kind.implementors){
					if(_ms.contains(Kind,_)){
						_ms.addMany(built,concrete_45implementors(_))
					} else {
						_ms.add(built,_)
					}
				};
				return built
			})(),"res")
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
				for(let property of _64p_45all(kind.prototype)){
					propagate_45method_45down_33(implementor,property,js_45sub(kind.prototype,property))
				};
				for(let _ of kind["super-kinds"]){
					rec_33(_)
				}
			};
			rec_33(kind)
		};
		const name=exports.name=`Kind`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvVHlwZS9LaW5kLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBVUEsMkJBQ1csS0FVUDtTQURILFFBdUNTO0lBbENFLFlBQUEsT0FDTTs2QkFBSSxPQUFaO0tBOEYyQixzQkE1RmIsS0FBTSxPQUNLLEtBQUE7O01BQWhDLHdCQUFPOzs7cUJBRVIsbUJBQW9CO01BQUEsUUFBQTtNQUNuQixHQUFBLFdBQUEsR0FDUztjQUNSO01BQUEsT0FFRztjQUFIO01BQUE7S0FBQTtxQkFFRixvQkFBcUI7TUFBQSxRQUFBO01BQ3BCLEdBQUEsV0FBQSxHQUNTO2lDQUNSO01BQUEsT0FFRztjQUFIO01BQUE7S0FBQTtxQkFFRixzQkFBdUI7TUFBQSxRQUFBO01BQ3RCLEdBQUEsV0FBQSxHQUNTO2NBQ1I7TUFBQSxPQUVHO2NBQUgsT0FBUSxPQUFLOzs7cUJBRWYsaUJBQWtCO01BQUEsUUFBQTtNQUNqQixHQUFBLFdBQUEsR0FDUztjQUNSO01BQUEsT0FFRztjQStEOEIsY0EvRG5CO01BQUE7S0FBQTtLQUVoQixLQUFLLGVBQVcsdUJBQWdCO0tBQzNCLFFBQUEsS0FBQSxrQkFDYTtNQUFqQixvQkFBZ0IsRUFBRTtLQUFBO0lBQUE7R0FBQTtHQXhDbkIsYUFBYSxFQUFJLFNBQUEsRUFDQztVQUN1QjtXQUF4QyxRQUFRLENBQUssRUFBSSxTQUFLLEVBQUUsT0FBTyxTQUFPLEVBQUU7O1VBSDFDO0VBQUE7RUEyQ0QsK0NBQWUsMEJBQUEsRUFDTTtxQkFESjtVQUVoQix3QkFBWTs7RUFHYixxREFBbUIsNkJBQUEsWUFBWSxLQUNJO0dBRWxDLHVCQUF1QjtHQUN2QixvQkFBZ0IsWUFBWTtFQUFBO0VBRTdCLCtEQUF3QixpQ0FBRyxLQUM2QjtxQkFEeEI7NENBRzFCOztZQUFBLEtBQUEsa0JBQ2lCO0tBQ2hCLGdCQUFILEtBQUQsR0FDSzt3QkFBQSx3QkFBQTtLQUFBLE9BRUQ7b0JBQUQ7S0FBQTtJQUFBOzs7O0VBRU4sK0JBQVMsU0FiUCxRQWFPLFlBQVksS0FBVSxlQUNZO3FCQURqQjtHQUtqQixLQUFBLGlCQUFhLHdCQUFhLEdBQUM7aUJBQzNCLFFBQU0sWUFBWTtHQUUxQixvQkFBZ0IsWUFBWTtHQUM1QixHQUFJLFdBQVMsZ0JBQ1k7SUFBbkIsUUFBQSxLQUFBLGVBQ1k7S0FDaEIsUUFBTyxTQUFPLEVBQUUsR0FBRyxZQUFhLFNBQU8sRUFBRTtJQUFBO0dBQUE7RUFBQTtFQUU1QywyQ0FBYyxTQXhCYixlQXdCYSxZQUFtQixLQUFVLGVBQ1k7cUJBcUJsQjtxQkF0QkM7R0FFckMsUUFBTyw4QkFBYyxhQUFhO0dBQ2xDLEdBQUksV0FBUyxnQkFDWTtJQUFuQixRQUFBLEtBQUEsZUFDWTtLQUNoQixlQUFZLFNBQU8sRUFBRSxHQUFHLFlBQWEsU0FBTyxFQUFFO0lBQUE7R0FBQTtFQUFBO0VBRWpELCtCQUFRLGlCQUFBLFlBQVksS0FDUztxQkFESjtVQUluQjtJQUFBLFFBQUE7SUFDSixnQkFBQyxLQUFELEdBQ0s7WUFBSixzQkFBb0IsY0FDVTthQUE3QixDQUFJLE9BQUcsYUFBVyxPQUFPLFFBQU0sYUFBVztLQUFBO0lBQUEsT0FFeEM7S0FBSCxRQUFJO3lCQUNILEtBQUQ7SUFBQTtHQUFBO0VBQUE7RUFHRixpQkFBVSxvQkFBQSxFQUNDO1VBQXlCLDJCQUE3QixVQUE2Qiw2QkFBTTtFQUFBO0VBRTFDLDBCQUFvQiw2QkFBQSxFQUFFLEtBQ0k7R0FBekIsZ0JBQUssS0FBRCxHQUNLO0lBQVIsc0JBQW1CO0dBQUE7R0FDcEIscUJBQWlCLEVBQUU7RUFBQTtFQUVwQiwyQkFBcUIsOEJBQUEsWUFBWSxLQUNJO0dBQXBDLGFBQVMsZ0JBQUEsS0FDSTtJQUFQLFFBQUEsWUFBWSxXQUFPLGdCQUNjO0tBQXJDLDZCQUF1QixZQUFZLFNBQVUsU0FBTyxlQUFlO0lBQUE7SUFDL0QsUUFBQSxLQUFBLG9CQUNnQjtLQUFwQixPQUFLO0lBQUE7R0FBQTtHQUNQLE9BQUs7RUFBQTtFQXJJUCx3QkFBQSIsImZpbGUiOiJUeXBlL0tpbmQuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
