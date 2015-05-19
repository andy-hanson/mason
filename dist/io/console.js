"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../String-as-Seq","../show","../Type/Type"],function(exports,String_45as_45Seq_0,show_1,Type_2){
	exports._get=_ms.lazy(function(){
		_ms.getModule(String_45as_45Seq_0);
		const show=_ms.getDefaultExport(show_1),_$6=_ms.getModule(Type_2),_61_62=_$6["=>"];
		const doc=exports.doc="Functions that write to the console (also known as shell, command prompt, stdout/stderr).";
		const js_45console=global.console;
		const log_33=exports["log!"]=function(){
			const doc="Prints its arguments to the console, separated by spaces.\nAlways adds a newline at the end.";
			return _ms.set(function log_33(){
				const args=[].slice.call(arguments,0);
				return js_45console.log(_61_62(String,args," "))
			},"doc",doc)
		}();
		const warn_33=exports["warn!"]=function(){
			const doc="Like `log!`, but prints to stderr.";
			return _ms.set(function warn_33(){
				const args=[].slice.call(arguments,0);
				return js_45console.warn(_61_62(String,args," "))
			},"doc",doc)
		}();
		const dbg_33=exports["dbg!"]=function(){
			const doc="Show something for debugging.";
			return _ms.set(function dbg_33(){
				const args=[].slice.call(arguments,0);
				warn_33("-->");
				for(let _ of _ms.iterator(args)){
					warn_33(show(_,function(){
						const repr=true;
						return {
							repr:repr
						}
					}()))
				};
				return warn_33("<--")
			},"doc",doc)
		}();
		const trace_33=exports["trace!"]=function(){
			const doc="Logs the current stacktrace.";
			return _ms.set(function trace_33(){
				const args=[].slice.call(arguments,0);
				return js_45console.trace(_61_62(String,args," "))
			},"doc",doc)
		}();
		const name=exports.name="console";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9pby9jb25zb2xlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztFQU9BLHNCQUFNO0VBRU4sbUJBQWE7RUFFYix1Q0FDSztHQUFKLFVBQ0M7a0JBRUEsaUJBQ087O1dBQVAsaUJBQWdCLE9BQUcsT0FBTyxLQUFNO0dBQUE7O0VBRWxDLHlDQUNNO0dBQUwsVUFBTTtrQkFDTCxrQkFDTzs7V0FBUCxrQkFBaUIsT0FBRyxPQUFPLEtBQU07R0FBQTs7RUFHbEMsdUNBQ0s7R0FBSixVQUFNO2tCQUNMLGlCQUNPOztJQUFQLFFBQU87SUFDRixRQUFBLGtCQUFBLE1BQ0k7S0FBUixRQUFPLEtBQUssWUFDQztNQUFaLFdBQU07Ozs7OztXQUNSLFFBQU87R0FBQTs7RUFFVCwyQ0FDTztHQUFOLFVBQU07a0JBQ0wsbUJBQ087O1dBQVAsbUJBQWtCLE9BQUcsT0FBTyxLQUFNO0dBQUE7O0VBcENyQyx3QkFBQSIsImZpbGUiOiJpby9jb25zb2xlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=