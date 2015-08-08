"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/at","../../cash","../../compare","../../io/console","../../io/time","../../Function","../../math/Number","../../math/methods"],(exports,_64_0,$_1,compare_2,console_3,time_4,Function_5,Number_6,methods_7)=>{
	exports._get=_ms.lazy(()=>{
		const _64=_ms.getDefaultExport(_64_0),$=_ms.getDefaultExport($_1),_$3=_ms.getModule($_1),$after=_ms.get(_$3,"$after"),_$4=_ms.getModule(compare_2),_60_63=_ms.get(_$4,"<?"),_$5=_ms.getModule(console_3),log_33=_ms.get(_$5,"log!"),_$6=_ms.getModule(time_4),current_45time_45ms=_ms.get(_$6,"current-time-ms"),_$7=_ms.getModule(Function_5),Action=_ms.get(_$7,"Action"),_$8=_ms.getModule(Number_6),Nat=_ms.get(_$8,"Nat"),_$9=_ms.getModule(methods_7),_45=_ms.get(_$9,"-");
		const time_33=exports["time!"]=(()=>{
			const built={};
			const doc=built.doc=`Logs the time taken to run time-me once.`;
			return _ms.set(function time_33(name,time_45me){
				_ms.checkContains(String,name,"name");
				_ms.checkContains(Action,time_45me,"time-me");
				const _$14=time(time_45me),val=_$14.val,time_45taken=_$14["time-taken"];
				log_33(`${name}: ${time_45taken}`);
				return val
			},built)
		})();
		const time_42_33=exports["time*!"]=(()=>{
			const built={};
			const doc=built.doc=`Logs the time to run time-me \`times\` times.`;
			return _ms.set(function time_42_33(name,times,time_45me){
				_ms.checkContains(String,name,"name");
				_ms.checkContains(Nat,times,"times");
				_ms.checkContains(Action,time_45me,"time-me");
				return time_33(name,()=>{
					let i=times;
					const arr=[];
					for(;;){
						if(! _60_63(0,i)){
							break
						};
						i=_45(i,1);
						arr.push(time_45me(i))
					};
					return arr
				})
			},built)
		})();
		const race_42_33=exports["race*!"]=(()=>{
			const built={};
			const doc=built.doc=`Logs the time of to run each of time-us \`times\` times.`;
			return _ms.set(function race_42_33(times,time_45us){
				_ms.checkContains(Nat,times,"times");
				_ms.checkContains(_ms.sub(_64,Action),time_45us,"time-us");
				for(let _ of time_45us){
					time_42_33(`.`,times,_)
				}
			},built)
		})();
		const time=exports.time=(()=>{
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
		})();
		const $time=exports.$time=(()=>{
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
		})();
		const $time_33=exports["$time!"]=(()=>{
			const built={};
			const doc=built.doc=`Logs \`$time $time-me\` and returns $time-me's result.`;
			return _ms.set(function $time_33(name,$time_45me){
				_ms.checkContains(String,name,"name");
				_ms.checkContains(_ms.sub(Action,$),$time_45me,"$time-me");
				return _ms.checkContains($,$after($time($time_45me),time=>{
					_ms.checkContains(Number,time,"time");
					log_33(`${name}: ${time}`)
				}),"res")
			},built)
		})();
		const name=exports.name=`perf-test`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL3Rlc3RzL3BlcmYtdGVzdC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVVBLCtCQUNNLEtBQUE7O0dBQUwsb0JBQU07a0JBQ0wsaUJBQUEsS0FBWSxVQUNjO3NCQURyQjtzQkFBZTtJQUNwQixXQUFpQixLQUFLO0lBQ3RCLE9BQU0sR0FBQyxTQUFRO1dBQ2Y7R0FBQTs7RUFFRixtQ0FDTyxLQUFBOztHQUFOLG9CQUFNO2tCQUNMLG9CQUFBLEtBQVksTUFBVSxVQUNjO3NCQUQvQjtzQkFBYTtzQkFBWTtXQUM5QixRQUFNLEtBQ00sSUFBQTtLQUFYLE1BQU07S0FDTixVQUFNO0tBRUYsT0FBQTtNQUFILEtBQVEsT0FBRyxFQUFFLEdBQ0M7T0FBYjtNQUFBO1FBQ0ksSUFBRSxFQUFFO01BQ1QsU0FBVSxVQUFRO0tBQUE7WUFDbkI7SUFBQTtHQUFBOztFQUVILG1DQUNPLEtBQUE7O0dBQU4sb0JBQU07a0JBQ0osb0JBQUEsTUFBVSxVQUNpQjtzQkFEckI7OEJBQVksSUFBRTtJQUNoQixRQUFBLEtBQUEsVUFDTztLQUFYLFdBQVEsSUFBRyxNQUFNO0lBQUE7R0FBQTs7RUFFcEIsd0JBQ0ssS0FBQTs7R0FBSixvQkFBTTtrQkFDTCxjQUFBLFVBQ2dCO3NCQURSOztJQUNSLFlBQVE7SUFDUixvQkFBSztJQUNMLFVBQU07SUFDTix1Q0FBWSxJQUFFLElBQUk7Ozs7RUFFcEIsMEJBQ00sS0FBQTs7R0FBTCxvQkFDQztrQkFHQSxlQUFXLFdBQ2tCOzhCQURULE9BQU87SUFDM0IsWUFBUTtxQ0FEUCxFQUFFLFFBRUgsT0FBTyxhQUNZLElBQUE7S0FBbEIsVUFBTTtZQUNOLElBQUUsSUFBSTtJQUFBOzs7RUFFVCxpQ0FDTyxLQUFBOztHQUFOLG9CQUFNO2tCQUNMLGtCQUFHLEtBQVksV0FDa0I7c0JBRHpCOzhCQUFnQixPQUFPOzZCQUE5QixFQUNELE9BQVEsTUFBTSxZQUFZLE1BQ1c7dUJBRE47S0FDOUIsT0FBTSxHQUFDLFNBQVE7Ozs7RUEzRGxCLHdCQUFBIiwiZmlsZSI6Im1ldGEvdGVzdHMvcGVyZi10ZXN0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=