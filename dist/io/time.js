"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../cash","../js","../bang","../compare","../meta/tests/perf-test"],function(exports,$_0,js_1,_33_2,compare_3,perf_45test_4){
	exports._get=_ms.lazy(function(){
		const $=_ms.getDefaultExport($_0),_$3=_ms.getModule(js_1),_new=_ms.get(_$3,"new"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_2)
		}),_$6=_ms.lazyGetModule(compare_3),_61_63=_ms.lazyProp(_$6,"=?"),_60_63=_ms.lazyProp(_$6,"<?"),_$7=_ms.lazyGetModule(perf_45test_4),$time=_ms.lazyProp(_$7,"$time");
		const current_45time_45ms=exports["current-time-ms"]=function(){
			const doc="Milliseconds since 1 January 1970 00:00:00 UTC.";
			return _ms.set(function(){
				return _new(Date).getTime()
			},"doc",doc,"displayName","current-time-ms")
		}();
		const $after_45time=exports["$after-time"]=function(){
			const doc="Does something after a certain time has passed.";
			const $test=function(){
				return _ms.set(function*(){
					const _=$after_45time(100,(yield* function*(){
						return _ms.set(function(){
							return 1
						},"displayName","_")
					}()));
					_ms.unlazy(_33)(_ms.unlazy(_60_63),100,(yield _ms.unlazy($time)(_)));
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),1,(yield _))
				},"displayName","$test")
			}();
			return _ms.set(function(time_45ms,_){
				_ms.checkContains(Number,time_45ms,"time-ms");
				_ms.checkContains(Function,_,"_");
				return _new($,function(resolve){
					const f=function(){
						return _ms.set(function(){
							return resolve(_())
						},"displayName","f")
					}();
					return global.setTimeout(f,time_45ms)
				})
			},"doc",doc,"$test",$test,"displayName","$after-time")
		}();
		const displayName=exports.displayName="time";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9pby90aW1lLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFTQSwrREFDZ0I7R0FBZixVQUFNO2tCQUVMLFVBQUE7V0FBQyxLQUFJOzs7RUFFUCxxREFDWTtHQUFYLFVBQU07R0FDTixzQkFDUzttQkFBQSxXQUFBO0tBQVIsUUFBSSxjQUFZLElBQ0ssbUJBQUE7cUJBQUEsVUFBQTtjQUFwQjtNQUFBOzt3Q0FDSSxJQUFJLHlCQUFJOytDQUNSLEVBQUUsT0FBSTtJQUFBOztrQkFDWCxTQUFBLFVBQWUsRUFDVTtzQkFEakI7c0JBQVM7V0FFakIsS0FBSSxFQUFHLFNBQUEsUUFDTztLQUFiLGtCQUNLO3FCQUFBLFVBQUE7Y0FBSixRQUFRO01BQUE7O1lBQ1Qsa0JBQWtCLEVBQUU7SUFBQTtHQUFBOztFQTFCdkIsc0NBQUEiLCJmaWxlIjoiaW8vdGltZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9