"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/at","../../cash","../../io/console","../../io/time","../../Function","../../private/js-impl","../../math/Number","../../math/methods"],function(exports,_64_0,$_1,console_2,time_3,Function_4,js_45impl_5,Number_6,methods_7){
	exports._get=_ms.lazy(function(){
		const _64=_ms.getDefaultExport(_64_0),$=_ms.getDefaultExport($_1),_$3=_ms.getModule($_1),$after=_ms.get(_$3,"$after"),_$4=_ms.getModule(console_2),log_33=_ms.get(_$4,"log!"),_$5=_ms.getModule(time_3),current_45time_45ms=_ms.get(_$5,"current-time-ms"),_$6=_ms.getModule(Function_4),Action=_ms.get(_$6,"Action"),_$7=_ms.getModule(js_45impl_5),timeStar=_ms.get(_$7,"timeStar"),_$8=_ms.getModule(Number_6),Nat=_ms.get(_$8,"Nat"),_$9=_ms.getModule(methods_7),_45=_ms.get(_$9,"-");
		const time_33=exports["time!"]=function(){
			const doc="Logs the time taken to run time-me once.";
			return _ms.set(function time_33(name,time_45me){
				_ms.checkContains(String,name,"name");
				_ms.checkContains(Action,time_45me,"time-me");
				const _$14=time(time_45me),val=_$14.val,time_45taken=_$14["time-taken"];
				log_33((((""+_ms.show(name))+": ")+_ms.show(time_45taken)));
				return val
			},"doc",doc)
		}();
		const time_42_33=exports["time*!"]=function(){
			const doc="Logs the time to run time-me `times` times.";
			return _ms.set(function time_42_33(name,times,time_45me){
				_ms.checkContains(String,name,"name");
				_ms.checkContains(Nat,times,"times");
				_ms.checkContains(Action,time_45me,"time-me");
				timeStar(times,time_45me);
				return time_33(name,function(){
					return timeStar(times,time_45me)
				})
			},"doc",doc)
		}();
		const race_42_33=exports["race*!"]=function(){
			const doc="Logs the time of to run each of time-us `times` times.";
			return _ms.set(function race_42_33(times,time_45us){
				_ms.checkContains(Nat,times,"times");
				_ms.checkContains(_ms.sub(_64,Action),time_45us,"time-us");
				for(let _ of time_45us[Symbol.iterator]()){
					time_42_33(".",times,_)
				}
			},"doc",doc)
		}();
		const time=exports.time=function(){
			const doc="Time taken to run time-me (milliseconds), and its result.";
			return _ms.set(function time(time_45me){
				_ms.checkContains(Function,time_45me,"time-me");
				const start=current_45time_45ms();
				const val=time_45me();
				const end=current_45time_45ms();
				const time_45taken=_45(end,start);
				return {
					val:val,
					"time-taken":time_45taken
				}
			},"doc",doc)
		}();
		const $time=exports.$time=function(){
			const doc="The difference in time (milliseconds) between when $time is called and when $time-me resolves.\nFor accuracy you should generally start $time-ing a $ as soon as you create it.\nReturned value in ms.";
			return _ms.set(function $time($time_45me){
				_ms.checkContains($,$time_45me,"$time-me");
				const start=current_45time_45ms();
				return _ms.checkContains(_ms.sub($,Number),$after($time_45me,function(){
					const end=current_45time_45ms();
					return _45(end,start)
				}),"res")
			},"doc",doc)
		}();
		const $time_33=exports["$time!"]=function(){
			const doc="Logs `$time $time-me` and returns $time-me's result.";
			return _ms.set(function $time_33(name,$time_45me){
				_ms.checkContains(String,name,"name");
				_ms.checkContains($,$time_45me,"$time-me");
				return _ms.checkContains($,$after($time($time_45me),function(time){
					_ms.checkContains(Number,time,"time");
					log_33((((""+_ms.show(name))+": ")+_ms.show(time)));
					return $time_45me
				}),"res")
			},"doc",doc)
		}();
		const name=exports.name="perf-test";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL3Rlc3RzL3BlcmYtdGVzdC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVVBLHlDQUNNO0dBQUwsVUFBTTtrQkFDTCxpQkFBQSxLQUFZLFVBQ2M7c0JBRHJCO3NCQUFlO0lBQ3BCLFdBQWlCLEtBQUs7SUFDdEIsT0FBTSxHQUtJLFlBTEgsc0JBQVE7V0FDZjtHQUFBOztFQUVGLDZDQUNPO0dBQU4sVUFBTTtrQkFDTCxvQkFBQSxLQUFZLE1BQVUsVUFDYztzQkFEL0I7c0JBQWE7c0JBQVk7SUFDOUIsU0FBUyxNQUFNO1dBQ2YsUUFBTSxLQUNNLFVBQUE7WUFBWCxTQUFTLE1BQU07SUFBQTtHQUFBOztFQUVsQiw2Q0FDTztHQUFOLFVBQU07a0JBQ0wsb0JBQUEsTUFBVSxVQUNpQjtzQkFEckI7OEJBQVksSUFBRTtJQUNmLFFBQUEsS0FBQSw2QkFDTztLQUFYLFdBQVEsSUFBRyxNQUFNO0lBQUE7R0FBQTs7RUFFcEIsa0NBQ0s7R0FBSixVQUFNO2tCQUNMLGNBQUEsVUFDZ0I7c0JBRFI7SUFDUixZQUFRO0lBQ1IsVUFBSztJQUNMLFVBQU07SUFDTixtQkFBWSxJQUFFLElBQUk7Ozs7Ozs7RUFFcEIsb0NBQ007R0FBTCxVQUNDO2tCQUdBLGVBQVcsV0FDVTtzQkFERDtJQUNwQixZQUFRO3FDQURQLEVBQUUsUUFFSCxPQUFPLFdBQ1UsVUFBQTtLQUFoQixVQUFNO1lBQ04sSUFBRSxJQUFJO0lBQUE7OztFQUVULDJDQUNPO0dBQU4sVUFBTTtrQkFDTCxrQkFBRyxLQUFZLFdBQ1U7c0JBRGpCO3NCQUFnQjs2QkFBdkIsRUFDRCxPQUFRLE1BQU0sWUFBVyxTQUFBLEtBQ1c7dUJBRE47S0FDN0IsT0FBTSxHQWxDRyxZQWtDRixzQkFBUTtZQUNmO0lBQUE7OztFQXRESCx3QkFBQSIsImZpbGUiOiJtZXRhL3Rlc3RzL3BlcmYtdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9