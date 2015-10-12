"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/q","./cash","./compare","./Function","./Type/Pred-Type","./Type/Type"],(exports,_63_0,$_1,compare_2,Function_3,Pred_45Type_4,Type_5)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(_63_0),_63None=_ms.get(_$0,"?None"),_63some=_ms.get(_$0,"?some"),$=_ms.getDefaultExport($_1),_$1=_ms.getModule($_1),$after=_ms.get(_$1,"$after"),_$2=_ms.getModule(compare_2),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(Function_3),Action=_ms.get(_$3,"Action"),_$4=_ms.getModule(Pred_45Type_4),Any=_ms.get(_$4,"Any"),Union=_ms.get(_$4,"Union"),Type=_ms.getDefaultExport(Type_5);
		const Success=exports.Success=class Success{
			constructor(val){
				_ms.newProperty(this,"val",val)
			}
		};
		const try_45result=exports["try-result"]=function try_45result(tried){
			_ms.checkContains(Action,tried,"tried");
			return (()=>{
				try {
					return new (Success)(tried())
				}catch(_){
					return _
				}
			})()
		};
		const _63try=exports["?try"]=function _63try(tried){
			_ms.checkContains(_ms.sub(Function,Any),tried,"tried");
			return (()=>{
				try {
					return _63some(tried())
				}catch(_){
					return _63None
				}
			})()
		};
		const fails_63=exports["fails?"]=function fails_63(tried){
			_ms.checkContains(Action,tried,"tried");
			return (()=>{
				try {
					tried();
					return false
				}catch(_){
					return true
				}
			})()
		};
		const fails_45with_63=exports["fails-with?"]=function fails_45with_63(expected_45error,tried){
			_ms.checkContains(_ms.sub(Union,String,Type),expected_45error,"expected-error");
			_ms.checkContains(Action,tried,"tried");
			return (()=>{
				try {
					tried();
					return false
				}catch(error){
					return (()=>{
						const _=expected_45error;
						if(_ms.contains(Type,_)){
							return _ms.contains(_,error)
						} else if(_ms.contains(String,_)){
							return _61_63(error.message,_)
						} else throw new (Error)("No branch of `case` matches.")
					})()
				}
			})()
		};
		const annotate_45errors=exports["annotate-errors"]=function annotate_45errors(annotation,tried){
			_ms.checkContains(Action,tried,"tried");
			return (()=>{
				try {
					return tried()
				}catch(_){
					_.stack=`${_ms.unlazy(annotation)}${_.stack}`;
					_.message=`${_ms.unlazy(annotation)}${_.message}`;
					throw _
				}
			})()
		};
		const $try=exports.$try=function $try(_){
			_ms.checkContains($,_,"_");
			const success=$after(_,val=>{
				return new (Success)(val)
			});
			return success.catch(err=>{
				return err
			})
		};
		const $catch=exports.$catch=function $catch(promise,catcher){
			_ms.checkContains($,promise,"promise");
			_ms.checkContains(Function,catcher,"catcher");
			return _ms.checkContains($,promise.catch(catcher),"returned value")
		};
		const $annotate_45errors=exports["$annotate-errors"]=function $annotate_45errors(annotation,$tried){
			_ms.checkContains($,$tried,"$tried");
			return $catch($tried,_=>{
				if(_ms.contains(Error,_)){
					_.stack=`${_ms.unlazy(annotation)}${_.stack}`;
					_.message=`${_ms.unlazy(annotation)}${_.message}`
				};
				throw _
			})
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvVHJ5Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBUUEsOEJBQ2M7R0FDRixZQUFBOzs7O0VBR1oseUNBQWEsc0JBQUE7cUJBQU07VUFJWjtRQUNGO1lBQUYsS0FBSSxTQUFRO0lBQUEsQ0FDYixNQUNLLEVBQUE7WUFBSjtJQUFBO0dBQUE7RUFBQTtFQUdILDZCQUFPLGdCQUFBOzZCQUFNLFNBQVM7VUFLZjtRQUNGO1lBQUYsUUFBTTtJQUFBLENBQ1AsTUFDSyxFQUFBO1lBQ0o7SUFBQTtHQUFBO0VBQUE7RUFFSCxpQ0FBUyxrQkFBQTtxQkFBTTtVQUdSO1FBQ0Y7S0FBRjtZQUNBO0lBQUEsQ0FDRCxNQUNLLEVBQUE7WUFDSjtJQUFBO0dBQUE7RUFBQTtFQUVILDZDQUFjLHlCQUFBLGlCQUFrQzs2QkFBbkIsTUFBTSxPQUFPO3FCQUFZO1VBRy9DO1FBQ0Y7S0FBRjtZQUNBO0lBQUEsQ0FDRCxNQUFNLE1BQ0s7WUFBTDtNQUFBLFFBQUE7TUFDSixnQkFBQyxLQUFELEdBQ0s7MkJBQUUsRUFBTjtNQUFBLE9BQ0QsZ0JBQUMsT0FBRCxHQUNPO2NBQU4sT0FBRyxjQUFjO01BQUE7Ozs7O0VBRXRCLG1EQUFrQiwyQkFBQSxXQUFtQjtxQkFBTTtVQUdwQztRQUNGO1lBQUY7SUFBQSxDQUNELE1BQ0ssRUFBQTtLQUFKLFFBQVksNEJBQWE7S0FDekIsVUFBYyw0QkFBYTtLQUMzQixNQUFPO0lBQUE7R0FBQTtFQUFBO0VBS1Qsd0JBQU8sY0FBQTtxQkFBRTtHQUdSLGNBQVUsT0FBTyxFQUFHO1dBQ25CLEtBQUksU0FBUTtHQUFBO1VBQ2IsY0FBZTtXQUNkO0dBQUE7RUFBQTtFQUVGLDRCQUFTLGdCQUFHLFFBQVU7cUJBQUY7cUJBQVU7NEJBQXBCLEVBSVQsY0FBYzs7RUFFZixxREFBbUIsNEJBQUEsV0FBbUI7cUJBQU87VUFFNUMsT0FBTyxPQUFRO0lBQ2QsZ0JBQUssTUFBRCxHQUNNO0tBQVQsUUFBWSw0QkFBYTtLQUN6QixVQUFjLDRCQUFhOztJQUM1QixNQUFPO0dBQUE7RUFBQSIsImZpbGUiOiJUcnkuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
