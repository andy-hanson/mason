"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/at","../../cash","../../io/console","../../io/time","../../Function","../../private/js-impl","../../math/Number","../../math/methods"],(exports,_64_0,$_1,console_2,time_3,Function_4,js_45impl_5,Number_6,methods_7)=>{
	exports._get=_ms.lazy(()=>{
		const _64=_ms.getDefaultExport(_64_0),$=_ms.getDefaultExport($_1),_$3=_ms.getModule($_1),$after=_ms.get(_$3,"$after"),_$4=_ms.getModule(console_2),log_33=_ms.get(_$4,"log!"),_$5=_ms.getModule(time_3),current_45time_45ms=_ms.get(_$5,"current-time-ms"),_$6=_ms.getModule(Function_4),Action=_ms.get(_$6,"Action"),_$7=_ms.getModule(js_45impl_5),timeStar=_ms.get(_$7,"timeStar"),_$8=_ms.getModule(Number_6),Nat=_ms.get(_$8,"Nat"),_$9=_ms.getModule(methods_7),_45=_ms.get(_$9,"-");
		const time_33=exports["time!"]=()=>{
			const built={};
			const doc=built.doc=`Logs the time taken to run time-me once.`;
			return _ms.set(function time_33(name,time_45me){
				_ms.checkContains(String,name,"name");
				_ms.checkContains(Action,time_45me,"time-me");
				const _$14=time(time_45me),val=_$14.val,time_45taken=_$14["time-taken"];
				log_33(`${_ms.show(name)}: ${_ms.show(time_45taken)}`);
				return val
			},built)
		}();
		const time_42_33=exports["time*!"]=()=>{
			const built={};
			const doc=built.doc=`Logs the time to run time-me \`times\` times.`;
			return _ms.set(function time_42_33(name,times,time_45me){
				_ms.checkContains(String,name,"name");
				_ms.checkContains(Nat,times,"times");
				_ms.checkContains(Action,time_45me,"time-me");
				timeStar(times,time_45me);
				return time_33(name,()=>{
					return timeStar(times,time_45me)
				})
			},built)
		}();
		const race_42_33=exports["race*!"]=()=>{
			const built={};
			const doc=built.doc=`Logs the time of to run each of time-us \`times\` times.`;
			return _ms.set(function race_42_33(times,time_45us){
				_ms.checkContains(Nat,times,"times");
				_ms.checkContains(_ms.sub(_64,Action),time_45us,"time-us");
				for(let _ of time_45us){
					time_42_33(`.`,times,_)
				}
			},built)
		}();
		const time=exports.time=()=>{
			const built={};
			const doc=built.doc=`Time taken to run time-me (milliseconds), and its result.`;
			return _ms.set(function time(time_45me){
				_ms.checkContains(Function,time_45me,"time-me");
				const built={};
				const start=current_45time_45ms();
				const val=built.val=time_45me();
				const end=current_45time_45ms();
				const time_45taken=built["time-taken"]=_45(end,start);
				return built
			},built)
		}();
		const $time=exports.$time=()=>{
			const built={};
			const doc=built.doc=`The difference in time (milliseconds) between when $time is called and when $time-me resolves.\nFor accuracy you should generally start $time-ing a $ as soon as you create it.\nReturned value in ms.`;
			return _ms.set(function $time($time_45me){
				_ms.checkContains(_ms.sub(Action,$),$time_45me,"$time-me");
				const start=current_45time_45ms();
				return _ms.checkContains(_ms.sub($,Number),$after($time_45me(),()=>{
					const end=current_45time_45ms();
					return _45(end,start)
				}),"res")
			},built)
		}();
		const $time_33=exports["$time!"]=()=>{
			const built={};
			const doc=built.doc=`Logs \`$time $time-me\` and returns $time-me's result.`;
			return _ms.set(function $time_33(name,$time_45me){
				_ms.checkContains(String,name,"name");
				_ms.checkContains(_ms.sub(Action,$),$time_45me,"$time-me");
				return _ms.checkContains($,$after($time($time_45me),time=>{
					_ms.checkContains(Number,time,"time");
					log_33(`${_ms.show(name)}: ${_ms.show(time)}`)
				}),"res")
			},built)
		}();
		const name=exports.name=`perf-test`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL3Rlc3RzL3BlcmYtdGVzdC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVVBLG1DQUNNOztHQUFMLG9CQUFNO2tCQUNMLGlCQUFBLEtBQVksVUFDYztzQkFEckI7c0JBQWU7SUFDcEIsV0FBaUIsS0FBSztJQUN0QixPQUFNLFlBQUMsbUJBQVE7V0FDZjtHQUFBOztFQUVGLHVDQUNPOztHQUFOLG9CQUFNO2tCQUNMLG9CQUFBLEtBQVksTUFBVSxVQUNjO3NCQUQvQjtzQkFBYTtzQkFBWTtJQUM5QixTQUFTLE1BQU07V0FDZixRQUFNLEtBQ00sSUFBQTtZQUFYLFNBQVMsTUFBTTtJQUFBO0dBQUE7O0VBRWxCLHVDQUNPOztHQUFOLG9CQUFNO2tCQUNKLG9CQUFBLE1BQVUsVUFDaUI7c0JBRHJCOzhCQUFZLElBQUU7SUFDaEIsUUFBQSxLQUFBLFVBQ087S0FBWCxXQUFRLElBQUcsTUFBTTtJQUFBO0dBQUE7O0VBRXBCLDRCQUNLOztHQUFKLG9CQUFNO2tCQUNMLGNBQUEsVUFDZ0I7c0JBRFI7O0lBQ1IsWUFBUTtJQUNSLG9CQUFLO0lBQ0wsVUFBTTtJQUNOLHVDQUFZLElBQUUsSUFBSTs7OztFQUVwQiw4QkFDTTs7R0FBTCxvQkFDQztrQkFHQSxlQUFXLFdBQ2tCOzhCQURULE9BQU87SUFDM0IsWUFBUTtxQ0FEUCxFQUFFLFFBRUgsT0FBTyxhQUNZLElBQUE7S0FBbEIsVUFBTTtZQUNOLElBQUUsSUFBSTtJQUFBOzs7RUFFVCxxQ0FDTzs7R0FBTixvQkFBTTtrQkFDTCxrQkFBRyxLQUFZLFdBQ2tCO3NCQUR6Qjs4QkFBZ0IsT0FBTzs2QkFBOUIsRUFDRCxPQUFRLE1BQU0sWUFBWSxNQUNXO3VCQUROO0tBQzlCLE9BQU0sWUFBQyxtQkFBUTs7OztFQXJEbEIsd0JBQUEiLCJmaWxlIjoibWV0YS90ZXN0cy9wZXJmLXRlc3QuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==