"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../String-as-Seq","../at/at","../show","../Type/Type"],function(exports,String_45as_45Seq_0,_64_1,show_2,Type_3){
	exports._get=_ms.lazy(function(){
		_ms.getModule(String_45as_45Seq_0);
		const _$5=_ms.getModule(_64_1),each_33=_ms.get(_$5,"each!"),show=_ms.getDefaultExport(show_2),_$7=_ms.getModule(Type_3),_61_62=_ms.get(_$7,"=>");
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
				each_33(args,function(_){
					return warn_33(show(_,function(){
						const repr=true;
						return {
							repr:repr
						}
					}()))
				});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9pby9jb25zb2xlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztFQVFBLHNCQUFNO0VBRU4sbUJBQWE7RUFFYix1Q0FDSztHQUFKLFVBQ0M7a0JBRUEsaUJBQ087O1dBQVAsaUJBQWdCLE9BQUcsT0FBTyxLQUFNO0dBQUE7O0VBRWxDLHlDQUNNO0dBQUwsVUFBTTtrQkFDTCxrQkFDTzs7V0FBUCxrQkFBaUIsT0FBRyxPQUFPLEtBQU07R0FBQTs7RUFHbEMsdUNBQ0s7R0FBSixVQUFNO2tCQUNMLGlCQUNPOztJQUFQLFFBQU87SUFDUCxRQUFNLEtBQU0sU0FBQSxFQUNDO1lBQVosUUFBTyxLQUFLLFlBQ0M7TUFBWixXQUFNOzs7Ozs7V0FDUixRQUFPO0dBQUE7O0VBRVQsMkNBQ087R0FBTixVQUFNO2tCQUNMLG1CQUNPOztXQUFQLG1CQUFrQixPQUFHLE9BQU8sS0FBTTtHQUFBOztFQXJDckMsd0JBQUEiLCJmaWxlIjoiaW8vY29uc29sZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9