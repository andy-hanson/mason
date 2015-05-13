"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../cash","../Fun","../js","../math/Num","../bang","../compare","../meta/tests/perf-test"],function(exports,$_0,Fun_1,js_2,Num_3,_33_4,compare_5,perf_45test_6){
	exports._get=_ms.lazy(function(){
		const $=_ms.getDefaultExport($_0),Fun=_ms.getDefaultExport(Fun_1),_$4=_ms.getModule(js_2),_new=_ms.get(_$4,"new"),Num=_ms.getDefaultExport(Num_3),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_4)
		}),_$8=_ms.lazyGetModule(compare_5),_61_63=_ms.lazyProp(_$8,"=?"),_60_63=_ms.lazyProp(_$8,"<?"),_$9=_ms.lazyGetModule(perf_45test_6),$time=_ms.lazyProp(_$9,"$time");
		const current_45time_45ms=exports["current-time-ms"]=function(){
			const doc="Milliseconds since 1 January 1970 00:00:00 UTC.";
			return _ms.set(function(){
				return _new(global.Date).getTime()
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
				_ms.checkContains(Num,time_45ms,"time-ms");
				_ms.checkContains(Fun,_,"_");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9pby90aW1lLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFXQSwrREFDZ0I7R0FBZixVQUFNO2tCQUVMLFVBQUE7V0FBQyxLQUFJOzs7RUFFUCxxREFDWTtHQUFYLFVBQU07R0FDTixzQkFDUzttQkFBQSxXQUFBO0tBQVIsUUFBSSxjQUFZLElBQ0ssbUJBQUE7cUJBQUEsVUFBQTtjQUFwQjtNQUFBOzt3Q0FDSSxJQUFJLHlCQUFJOytDQUNSLEVBQUUsT0FBSTtJQUFBOztrQkFDWCxTQUFBLFVBQVksRUFDSztzQkFEVDtzQkFBTTtXQUVkLEtBQUksRUFBRyxTQUFBLFFBQ087S0FBYixrQkFDSztxQkFBQSxVQUFBO2NBQUosUUFBUTtNQUFBOztZQUNULGtCQUFrQixFQUFFO0lBQUE7R0FBQTs7RUE1QnZCLHNDQUFBIiwiZmlsZSI6ImlvL3RpbWUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==