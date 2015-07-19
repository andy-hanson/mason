"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../cash","../compare"],(exports,$_0,compare_1)=>{
	exports._get=_ms.lazy(()=>{
		const $=_ms.getDefaultExport($_0),_$4=_ms.lazyGetModule(compare_1),_61_63=_ms.lazyProp(_$4,"=?");
		const current_45time_45ms=exports["current-time-ms"]=()=>{
			const built={};
			const doc=built.doc=`Milliseconds since 1 January 1970 00:00:00 UTC.`;
			return _ms.set(function current_45time_45ms(){
				return new Date().getTime()
			},built)
		}();
		const $after_45time=exports["$after-time"]=()=>{
			const built={};
			const doc=built.doc=`Does something after a certain time has passed.`;
			const $test=built.$test=function* $test(){
				_ms.assert(_ms.unlazy(_61_63),1,(yield $after_45time(1,()=>{
					return 1
				})))
			};
			return _ms.set(function $after_45time(time_45ms,_){
				_ms.checkContains(Number,time_45ms,"time-ms");
				_ms.checkContains(Function,_,"_");
				return new $(resolve=>{
					const f=function f(){
						resolve(_())
					};
					global.setTimeout(f,time_45ms)
				})
			},built)
		}();
		const name=exports.name=`time`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9pby90aW1lLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBS0EseURBQ2dCOztHQUFmLG9CQUFNO2tCQUVMLDhCQUFBO1dBQUMsSUFBSTs7O0VBRVAsK0NBQ1k7O0dBQVgsb0JBQU07R0FDTix3QkFDVSxpQkFBQTtrQ0FBRSxFQUFHLE9BQUcsY0FBWSxFQUNHLElBQUE7WUFBL0I7SUFBQTtHQUFBO2tCQUNELHVCQUFBLFVBQWUsRUFDVTtzQkFEakI7c0JBQVM7V0FFakIsSUFBSSxFQUFJLFNBQ087S0FBZCxRQUNNLFlBQUE7TUFBTCxRQUFRO0tBQUE7S0FDVCxrQkFBa0IsRUFBRTtJQUFBO0dBQUE7O0VBcEJ2Qix3QkFBQSIsImZpbGUiOiJpby90aW1lLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=