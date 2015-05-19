"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../cash","../js","../bang","../compare","../meta/tests/perf-test"],function(exports,$_0,js_1,_33_2,compare_3,perf_45test_4){
	exports._get=_ms.lazy(function(){
		const $=_ms.getDefaultExport($_0),_$3=_ms.getModule(js_1),_new=_$3.new,_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_2)
		}),_$6=_ms.lazyGetModule(compare_3),_61_63=_ms.lazyProp(_$6,"=?"),_60_63=_ms.lazyProp(_$6,"<?"),_$7=_ms.lazyGetModule(perf_45test_4),$time=_ms.lazyProp(_$7,"$time");
		const current_45time_45ms=exports["current-time-ms"]=function(){
			const doc="Milliseconds since 1 January 1970 00:00:00 UTC.";
			return _ms.set(function current_45time_45ms(){
				return _new(Date).getTime()
			},"doc",doc)
		}();
		const $after_45time=exports["$after-time"]=function(){
			const doc="Does something after a certain time has passed.";
			return _ms.set(function $after_45time(time_45ms,_){
				return _new($,function(resolve){
					const f=function f(){
						return resolve(_())
					};
					return global.setTimeout(f,time_45ms)
				})
			},"doc",doc)
		}();
		const name=exports.name="time";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9pby90aW1lLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFTQSwrREFDZ0I7R0FBZixVQUFNO2tCQUVMLDhCQUFBO1dBQUMsS0FBSTs7O0VBRVAscURBQ1k7R0FBWCxVQUFNO2tCQU1MLHVCQUFBLFVBQWUsRUFDVTtXQUN6QixLQUFJLEVBQUcsU0FBQSxRQUNPO0tBQWIsUUFDSyxZQUFBO2FBQUosUUFBUTtLQUFBO1lBQ1Qsa0JBQWtCLEVBQUU7SUFBQTtHQUFBOztFQTFCdkIsd0JBQUEiLCJmaWxlIjoiaW8vdGltZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9