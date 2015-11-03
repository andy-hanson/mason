"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./cash","./compare","./Function","./Type/Pred-Type","./Type/Type"],(exports,$_0,compare_1,Function_2,Pred_45Type_3,Type_4)=>{
	exports._get=_ms.lazy(()=>{
		const $=_ms.getDefaultExport($_0),_$0=_ms.getModule(compare_1),_61_63=_ms.get(_$0,"=?"),_$1=_ms.getModule(Function_2),Action=_ms.get(_$1,"Action"),_$2=_ms.getModule(Pred_45Type_3),Union=_ms.get(_$2,"Union"),Type=_ms.getDefaultExport(Type_4);
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
			const success=_.then(val=>{
				return new (Success)(val)
			});
			return success.catch(err=>{
				return err
			})
		};
		const $annotate_45errors=exports["$annotate-errors"]=function $annotate_45errors(annotation,$tried){
			_ms.checkContains($,$tried,"$tried");
			return $tried.catch(_=>{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvVHJ5Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBT0EsOEJBQ2M7R0FDSCxZQUFBOzs7O0VBR1gseUNBQWEsc0JBQUE7cUJBQU07VUFHWjtRQUNGO1lBQUYsS0FBSSxTQUFRO0lBQUEsQ0FDYixNQUNLLEVBQUE7WUFBSjtJQUFBO0dBQUE7RUFBQTtFQUVILGlDQUFTLGtCQUFBO3FCQUFNO1VBR1I7UUFDRjtLQUFGO1lBQ0E7SUFBQSxDQUNELE1BQ0ssRUFBQTtZQUNKO0lBQUE7R0FBQTtFQUFBO0VBRUgsNkNBQWMseUJBQUEsaUJBQWtDOzZCQUFuQixNQUFNLE9BQU87cUJBQVk7VUFHL0M7UUFDRjtLQUFGO1lBQ0E7SUFBQSxDQUNELE1BQU0sTUFDSztZQUFMO01BQUEsUUFBQTtNQUNKLGdCQUFDLEtBQUQsR0FDSzsyQkFBRSxFQUFOO01BQUEsT0FDRCxnQkFBQyxPQUFELEdBQ087Y0FBTixPQUFHLGNBQWM7TUFBQTs7Ozs7RUFFdEIsbURBQWtCLDJCQUFBLFdBQW1CO3FCQUFNO1VBR3BDO1FBQ0Y7WUFBRjtJQUFBLENBQ0QsTUFDSyxFQUFBO0tBQUosUUFBWSw0QkFBYTtLQUN6QixVQUFjLDRCQUFhO0tBQzNCLE1BQU07SUFBQTtHQUFBO0VBQUE7RUFLUix3QkFBTyxjQUFBO3FCQUFFO0dBR1IsY0FBVSxPQUFRO1dBQ2pCLEtBQUksU0FBUTtHQUFBO1VBQ2IsY0FBZTtXQUNkO0dBQUE7RUFBQTtFQUVGLHFEQUFtQiw0QkFBQSxXQUFtQjtxQkFBTztVQUU1QyxhQUFjO0lBQ2IsZ0JBQUksTUFBRCxHQUNNO0tBQVIsUUFBWSw0QkFBYTtLQUN6QixVQUFjLDRCQUFhOztJQUM1QixNQUFNO0dBQUE7RUFBQSIsImZpbGUiOiJUcnkuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
