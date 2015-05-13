"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/at","../../cash","../../io/console","../../io/time","../../Fun","../../private/js-impl","../../math/Num","../../math/methods","../../Str"],function(exports,_64_0,$_1,console_2,time_3,Fun_4,js_45impl_5,Num_6,methods_7,Str_8){
	exports._get=_ms.lazy(function(){
		const _64=_ms.getDefaultExport(_64_0),_$2=_ms.getModule(_64_0),each_33=_ms.get(_$2,"each!"),$=_ms.getDefaultExport($_1),_$3=_ms.getModule($_1),$after=_ms.get(_$3,"$after"),_$4=_ms.getModule(console_2),log_33=_ms.get(_$4,"log!"),_$5=_ms.getModule(time_3),current_45time_45ms=_ms.get(_$5,"current-time-ms"),Fun=_ms.getDefaultExport(Fun_4),_$6=_ms.getModule(Fun_4),Act=_ms.get(_$6,"Act"),_$7=_ms.getModule(js_45impl_5),timeStar=_ms.get(_$7,"timeStar"),Num=_ms.getDefaultExport(Num_6),_$8=_ms.getModule(Num_6),Nat=_ms.get(_$8,"Nat"),_$9=_ms.getModule(methods_7),_45=_ms.get(_$9,"-"),Str=_ms.getDefaultExport(Str_8);
		const time_33=exports["time!"]=function(){
			const doc="Logs the time taken to run time-me once.";
			return _ms.set(function(name,time_45me){
				_ms.checkContains(Str,name,"name");
				_ms.checkContains(Act,time_45me,"time-me");
				const _$15=time(time_45me),val=_$15.val,time_45taken=_$15["time-taken"];
				log_33((((""+_ms.show(name))+": ")+_ms.show(time_45taken)));
				return val
			},"doc",doc,"displayName","time!")
		}();
		const time_42_33=exports["time*!"]=function(){
			const doc="Logs the time to run time-me `times` times.";
			return _ms.set(function(name,times,time_45me){
				_ms.checkContains(Str,name,"name");
				_ms.checkContains(Nat,times,"times");
				_ms.checkContains(Act,time_45me,"time-me");
				timeStar(times,time_45me);
				return time_33(name,function(){
					return timeStar(times,time_45me)
				})
			},"doc",doc,"displayName","time*!")
		}();
		const race_42_33=exports["race*!"]=function(){
			const doc="Logs the time of to run each of time-us `times` times.";
			return _ms.set(function(times,time_45us){
				_ms.checkContains(Nat,times,"times");
				_ms.checkContains(_ms.sub(_64,Act),time_45us,"time-us");
				return each_33(time_45us,_ms.sub(time_42_33,".",times))
			},"doc",doc,"displayName","race*!")
		}();
		const time=exports.time=function(){
			const doc="Time taken to run time-me (milliseconds), and its result.";
			return _ms.set(function(time_45me){
				_ms.checkContains(Fun,time_45me,"time-me");
				const start=current_45time_45ms();
				const val=time_45me();
				const end=current_45time_45ms();
				const time_45taken=_45(end,start);
				return {
					val:val,
					"time-taken":time_45taken
				}
			},"doc",doc,"displayName","time")
		}();
		const $time=exports.$time=function(){
			const doc="The difference in time (milliseconds) between when $time is called and when $time-me resolves.\nFor accuracy you should generally start $time-ing a $ as soon as you create it.\nReturned value in ms.";
			return _ms.set(function($time_45me){
				_ms.checkContains($,$time_45me,"$time-me");
				const start=current_45time_45ms();
				return _ms.checkContains(_ms.sub($,Num),$after($time_45me,function(){
					const end=current_45time_45ms();
					return _45(end,start)
				}),"res")
			},"doc",doc,"displayName","$time")
		}();
		const $time_33=exports["$time!"]=function(){
			const doc="Logs `$time $time-me` and returns $time-me's result.";
			return _ms.set(function(name,$time_45me){
				_ms.checkContains(Str,name,"name");
				_ms.checkContains($,$time_45me,"$time-me");
				return _ms.checkContains($,$after($time($time_45me),function(time){
					_ms.checkContains(Num,time,"time");
					log_33((((""+_ms.show(name))+": ")+_ms.show(time)));
					return $time_45me
				}),"res")
			},"doc",doc,"displayName","$time!")
		}();
		const displayName=exports.displayName="perf-test";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL3Rlc3RzL3BlcmYtdGVzdC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVdBLHlDQUNNO0dBQUwsVUFBTTtrQkFDTCxTQUFBLEtBQVMsVUFDVztzQkFEZjtzQkFBWTtJQUNqQixXQUFpQixLQUFLO0lBQ3RCLE9BQU0sR0FLSSxZQUxILHNCQUFRO1dBQ2Y7R0FBQTs7RUFFRiw2Q0FDTztHQUFOLFVBQU07a0JBQ0wsU0FBQSxLQUFTLE1BQVUsVUFDVztzQkFEekI7c0JBQVU7c0JBQVk7SUFDM0IsU0FBUyxNQUFNO1dBQ2YsUUFBTSxLQUNNLFVBQUE7WUFBWCxTQUFTLE1BQU07SUFBQTtHQUFBOztFQUVsQiw2Q0FDTztHQUFOLFVBQU07a0JBQ0wsU0FBQSxNQUFVLFVBQ2M7c0JBRGxCOzhCQUFZLElBQUU7V0FDcEIsUUFBTSxrQkFBUSxXQUFRLElBQUc7R0FBQTs7RUFFM0Isa0NBQ0s7R0FBSixVQUFNO2tCQUNMLFNBQUEsVUFDVztzQkFESDtJQUNSLFlBQVE7SUFDUixVQUFLO0lBQ0wsVUFBTTtJQUNOLG1CQUFZLElBQUUsSUFBSTs7Ozs7OztFQUVwQixvQ0FDTTtHQUFMLFVBQ0M7a0JBR0EsU0FBUSxXQUNVO3NCQUREO0lBQ2pCLFlBQVE7cUNBRFAsRUFBRSxLQUVILE9BQU8sV0FDVSxVQUFBO0tBQWhCLFVBQU07WUFDTixJQUFFLElBQUk7SUFBQTs7O0VBRVQsMkNBQ087R0FBTixVQUFNO2tCQUNMLFNBQUcsS0FBUyxXQUNVO3NCQURkO3NCQUFhOzZCQUFwQixFQUNELE9BQVEsTUFBTSxZQUFXLFNBQUEsS0FDUTt1QkFESDtLQUM3QixPQUFNLEdBakNHLFlBaUNGLHNCQUFRO1lBQ2Y7SUFBQTs7O0VBdERILHNDQUFBIiwiZmlsZSI6Im1ldGEvdGVzdHMvcGVyZi10ZXN0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=