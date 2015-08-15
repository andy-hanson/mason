"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../String-as-Seq","../Type/Type"],(exports,String_45as_45Seq_0,Type_1)=>{
	exports._get=_ms.lazy(()=>{
		_ms.getModule(String_45as_45Seq_0);
		const _$5=_ms.getModule(Type_1),_61_62=_ms.get(_$5,"=>");
		const doc=exports.doc=`Functions that write to the console (also known as shell, command prompt, stdout/stderr).`;
		const log_33=exports["log!"]=(()=>{
			const built={};
			const doc=built.doc=`Prints its arguments to the console, separated by spaces.\nAlways adds a newline at the end.`;
			return _ms.set(function log_33(a){
				global.console.log(a)
			},built)
		})();
		const warn_33=exports["warn!"]=(()=>{
			const built={};
			const doc=built.doc=`Like \`log!\`, but prints to stderr.`;
			return _ms.set(function warn_33(){
				const args=[].slice.call(arguments,0);
				global.console.warn(...args)
			},built)
		})();
		const dbg_33=exports["dbg!"]=(()=>{
			const built={};
			const doc=built.doc=`Show something for debugging.`;
			return _ms.set(function dbg_33(){
				const args=[].slice.call(arguments,0);
				warn_33(`-->`);
				for(let _ of args){
					warn_33(_)
				};
				warn_33(`<--`)
			},built)
		})();
		const trace_33=exports["trace!"]=(()=>{
			const built={};
			const doc=built.doc=`Logs the current stacktrace.`;
			return _ms.set(function trace_33(){
				const args=[].slice.call(arguments,0);
				global.console.trace(_61_62(String,args,` `))
			},built)
		})();
		const name=exports.name=`console`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvaW8vY29uc29sZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7RUFNQSxzQkFBTTtFQUVOLDZCQUNLLEtBQUE7O0dBQUosb0JBQ0M7a0JBR0MsZ0JBQUEsRUFDQztJQUFGLG1CQUFtQjtHQUFBOztFQUVyQiwrQkFDTSxLQUFBOztHQUFMLG9CQUFNO2tCQUNKLGtCQUNPOztJQUFSLG9CQUFvQixHQUFBO0dBQUE7O0VBR3JCLDZCQUNLLEtBQUE7O0dBQUosb0JBQU07a0JBQ0osaUJBQ087O0lBQVIsUUFBTztJQUNGLFFBQUEsS0FBQSxLQUNJO0tBQVIsUUFBTTtJQUFBO0lBQ1AsUUFBTzs7O0VBRVQsaUNBQ08sS0FBQTs7R0FBTixvQkFBTTtrQkFDSixtQkFDTzs7SUFBUixxQkFBc0IsT0FBRyxPQUFPLEtBQU07OztFQWpDekMsd0JBQUEiLCJmaWxlIjoiaW8vY29uc29sZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9