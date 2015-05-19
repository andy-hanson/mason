"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/at","../../cash","../../io/console","../../io/time","../../Function","../../private/js-impl","../../math/Number","../../math/methods"],function(exports,_64_0,$_1,console_2,time_3,Function_4,js_45impl_5,Number_6,methods_7){
	exports._get=_ms.lazy(function(){
		const _64=_ms.getDefaultExport(_64_0),$=_ms.getDefaultExport($_1),_$3=_ms.getModule($_1),$after=_$3.$after,_$4=_ms.getModule(console_2),log_33=_$4["log!"],_$5=_ms.getModule(time_3),current_45time_45ms=_$5["current-time-ms"],_$6=_ms.getModule(Function_4),Action=_$6.Action,_$7=_ms.getModule(js_45impl_5),timeStar=_$7.timeStar,_$8=_ms.getModule(Number_6),Nat=_$8.Nat,_$9=_ms.getModule(methods_7),_45=_$9["-"];
		const time_33=exports["time!"]=function(){
			const doc="Logs the time taken to run time-me once.";
			return _ms.set(function time_33(name,time_45me){
				const _$14=time(time_45me),val=_$14.val,time_45taken=_$14["time-taken"];
				log_33((((""+_ms.show(name))+": ")+_ms.show(time_45taken)));
				return val
			},"doc",doc)
		}();
		const time_42_33=exports["time*!"]=function(){
			const doc="Logs the time to run time-me `times` times.";
			return _ms.set(function time_42_33(name,times,time_45me){
				timeStar(times,time_45me);
				return time_33(name,function(){
					return timeStar(times,time_45me)
				})
			},"doc",doc)
		}();
		const race_42_33=exports["race*!"]=function(){
			const doc="Logs the time of to run each of time-us `times` times.";
			return _ms.set(function race_42_33(times,time_45us){
				for(let _ of _ms.iterator(time_45us)){
					time_42_33(".",times,_)
				}
			},"doc",doc)
		}();
		const time=exports.time=function(){
			const doc="Time taken to run time-me (milliseconds), and its result.";
			return _ms.set(function time(time_45me){
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
				const start=current_45time_45ms();
				return $after($time_45me,function(){
					const end=current_45time_45ms();
					return _45(end,start)
				})
			},"doc",doc)
		}();
		const $time_33=exports["$time!"]=function(){
			const doc="Logs `$time $time-me` and returns $time-me's result.";
			return _ms.set(function $time_33(name,$time_45me){
				return $after($time($time_45me),function(time){
					log_33((((""+_ms.show(name))+": ")+_ms.show(time)));
					return $time_45me
				})
			},"doc",doc)
		}();
		const name=exports.name="perf-test";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL3Rlc3RzL3BlcmYtdGVzdC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVVBLHlDQUNNO0dBQUwsVUFBTTtrQkFDTCxpQkFBQSxLQUFZLFVBQ2M7SUFBMUIsV0FBaUIsS0FBSztJQUN0QixPQUFNLEdBK0JGLFlBL0JHLHNCQUFRO1dBQ2Y7R0FBQTs7RUFFRiw2Q0FDTztHQUFOLFVBQU07a0JBQ0wsb0JBQUEsS0FBWSxNQUFVLFVBQ2M7SUFBcEMsU0FBUyxNQUFNO1dBQ2YsUUFBTSxLQUNNLFVBQUE7WUFBWCxTQUFTLE1BQU07SUFBQTtHQUFBOztFQUVsQiw2Q0FDTztHQUFOLFVBQU07a0JBQ0wsb0JBQUEsTUFBVSxVQUNpQjtJQUF0QixRQUFBLGtCQUFBLFdBQ087S0FBWCxXQUFRLElBQUcsTUFBTTtJQUFBO0dBQUE7O0VBRXBCLGtDQUNLO0dBQUosVUFBTTtrQkFDTCxjQUFBLFVBQ2dCO0lBQWhCLFlBQVE7SUFDUixVQUFLO0lBQ0wsVUFBTTtJQUNOLG1CQUFZLElBQUUsSUFBSTs7Ozs7OztFQUVwQixvQ0FDTTtHQUFMLFVBQ0M7a0JBR0EsZUFBVyxXQUNVO0lBQXJCLFlBQVE7V0FDUixPQUFPLFdBQ1UsVUFBQTtLQUFoQixVQUFNO1lBQ04sSUFBRSxJQUFJO0lBQUE7R0FBQTs7RUFFVCwyQ0FDTztHQUFOLFVBQU07a0JBQ0wsa0JBQUcsS0FBWSxXQUNVO1dBQXpCLE9BQVEsTUFBTSxZQUFXLFNBQUEsS0FDVztLQUFuQyxPQUFNLEdBUkgsWUFRSSxzQkFBUTtZQUNmO0lBQUE7R0FBQTs7RUF0REgsd0JBQUEiLCJmaWxlIjoibWV0YS90ZXN0cy9wZXJmLXRlc3QuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==