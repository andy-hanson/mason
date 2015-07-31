"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../String-as-Seq","../Type/Type"],(exports,String_45as_45Seq_0,Type_1)=>{
	exports._get=_ms.lazy(()=>{
		_ms.getModule(String_45as_45Seq_0);
		const _$5=_ms.getModule(Type_1),_61_62=_ms.get(_$5,"=>");
		const doc=exports.doc=`Functions that write to the console (also known as shell, command prompt, stdout/stderr).`;
		const js_45console=global.console;
		const log_33=exports["log!"]=()=>{
			const built={};
			const doc=built.doc=`Prints its arguments to the console, separated by spaces.\nAlways adds a newline at the end.`;
			return _ms.set(function log_33(){
				const args=[].slice.call(arguments,0);
				Function.apply.call(js_45console.log,null,[].concat(_ms.arr(args)))
			},built)
		}();
		const warn_33=exports["warn!"]=()=>{
			const built={};
			const doc=built.doc=`Like \`log!\`, but prints to stderr.`;
			return _ms.set(function warn_33(){
				const args=[].slice.call(arguments,0);
				Function.apply.call(js_45console.warn,null,[].concat(_ms.arr(args)))
			},built)
		}();
		const dbg_33=exports["dbg!"]=()=>{
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
		}();
		const trace_33=exports["trace!"]=()=>{
			const built={};
			const doc=built.doc=`Logs the current stacktrace.`;
			return _ms.set(function trace_33(){
				const args=[].slice.call(arguments,0);
				js_45console.trace(_61_62(String,args,` `))
			},built)
		}();
		const name=exports.name=`console`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9pby9jb25zb2xlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztFQU1BLHNCQUFNO0VBRU4sbUJBQWE7RUFFYixpQ0FDSzs7R0FBSixvQkFDQztrQkFFQyxpQkFDTzs7d0JBQVIsd0NBQWU7R0FBQTs7RUFFakIsbUNBQ007O0dBQUwsb0JBQU07a0JBQ0osa0JBQ087O3dCQUFSLHlDQUFnQjtHQUFBOztFQUdqQixpQ0FDSzs7R0FBSixvQkFBTTtrQkFDSixpQkFDTzs7SUFBUixRQUFPO0lBQ0YsUUFBQSxLQUFBLEtBQ0k7S0FBUixRQUFNO0lBQUE7SUFDUCxRQUFPOzs7RUFFVCxxQ0FDTzs7R0FBTixvQkFBTTtrQkFDSixtQkFDTzs7SUFBUixtQkFBa0IsT0FBRyxPQUFPLEtBQU07OztFQWxDckMsd0JBQUEiLCJmaWxlIjoiaW8vY29uc29sZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9