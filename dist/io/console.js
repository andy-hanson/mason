"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../String-as-Seq","../show","../Type/Type"],(exports,String_45as_45Seq_0,show_1,Type_2)=>{
	exports._get=_ms.lazy(()=>{
		_ms.getModule(String_45as_45Seq_0);
		const show=_ms.getDefaultExport(show_1),_$6=_ms.getModule(Type_2),_61_62=_ms.get(_$6,"=>");
		const doc=exports.doc=`Functions that write to the console (also known as shell, command prompt, stdout/stderr).`;
		const js_45console=global.console;
		const log_33=exports["log!"]=()=>{
			const built={};
			const doc=built.doc=`Prints its arguments to the console, separated by spaces.\nAlways adds a newline at the end.`;
			return _ms.set(function log_33(){
				const args=[].slice.call(arguments,0);
				js_45console.log(_61_62(String,args,` `))
			},built)
		}();
		const warn_33=exports["warn!"]=()=>{
			const built={};
			const doc=built.doc=`Like \`log!\`, but prints to stderr.`;
			return _ms.set(function warn_33(){
				const args=[].slice.call(arguments,0);
				js_45console.warn(_61_62(String,args,` `))
			},built)
		}();
		const dbg_33=exports["dbg!"]=()=>{
			const built={};
			const doc=built.doc=`Show something for debugging.`;
			return _ms.set(function dbg_33(){
				const args=[].slice.call(arguments,0);
				warn_33(`-->`);
				for(let _ of args){
					warn_33(show(_,()=>{
						const built={};
						const repr=built.repr=true;
						return built
					}()))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9pby9jb25zb2xlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztFQU9BLHNCQUFNO0VBRU4sbUJBQWE7RUFFYixpQ0FDSzs7R0FBSixvQkFDQztrQkFFQyxpQkFDTzs7SUFBUixpQkFBZ0IsT0FBRyxPQUFPLEtBQU07OztFQUVsQyxtQ0FDTTs7R0FBTCxvQkFBTTtrQkFDSixrQkFDTzs7SUFBUixrQkFBaUIsT0FBRyxPQUFPLEtBQU07OztFQUdsQyxpQ0FDSzs7R0FBSixvQkFBTTtrQkFDSixpQkFDTzs7SUFBUixRQUFPO0lBQ0YsUUFBQSxLQUFBLEtBQ0k7S0FBUixRQUFPLEtBQUssTUFDQzs7TUFBWixzQkFBTTs7OztJQUNSLFFBQU87OztFQUVULHFDQUNPOztHQUFOLG9CQUFNO2tCQUNKLG1CQUNPOztJQUFSLG1CQUFrQixPQUFHLE9BQU8sS0FBTTs7O0VBcENyQyx3QkFBQSIsImZpbGUiOiJpby9jb25zb2xlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=