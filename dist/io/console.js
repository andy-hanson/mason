"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../Type/Type"],(exports,Type_0)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(Type_0),_61_62=_ms.get(_$0,"=>");
		const log_33=exports["log!"]=(()=>{
			return a=>{
				console.log(a)
			}
		})();
		const warn_33=exports["warn!"]=(()=>{
			return function(){
				const args=[].slice.call(arguments,0);
				console.warn(...args)
			}
		})();
		const dbg_33=exports["dbg!"]=(()=>{
			return function(){
				const args=[].slice.call(arguments,0);
				warn_33(`-->`);
				for(let _ of args){
					warn_33(_)
				};
				warn_33(`<--`)
			}
		})();
		const trace_33=exports["trace!"]=(()=>{
			return function(){
				const args=[].slice.call(arguments,0);
				console.trace(_61_62(String,args,` `))
			}
		})();
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvaW8vY29uc29sZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQU1BLDZCQUNLLEtBQUE7VUFHRjtJQUNELFlBQVk7R0FBQTtFQUFBO0VBRWQsK0JBQ00sS0FBQTtVQUNIOztJQUNELGFBQWEsR0FBRztHQUFBO0VBQUE7RUFHakIsNkJBQ0ssS0FBQTtVQUNGOztJQUNELFFBQU87SUFDRixRQUFBLEtBQUEsS0FDSTtLQUFSLFFBQU07SUFBQTtJQUNQLFFBQU87OztFQUVULGlDQUNPLEtBQUE7VUFDSjs7SUFDRCxjQUFlLE9BQUcsT0FBTyxLQUFNIiwiZmlsZSI6ImlvL2NvbnNvbGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
