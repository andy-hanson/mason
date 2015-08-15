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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvbWV0YS90ZXN0cy9wZXJmLXRlc3QubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFVQSwrQkFDTSxLQUFBOztHQUFMLG9CQUFNO2tCQUNMLGlCQUFBLEtBQVksVUFDYztzQkFEckI7c0JBQWU7SUFDcEIsV0FBaUIsS0FBSztJQUN0QixPQUFNLEdBQUMsU0FBUTtXQUNmO0dBQUE7O0VBRUYsbUNBQ08sS0FBQTs7R0FBTixvQkFBTTtrQkFDTCxvQkFBQSxLQUFZLE1BQVUsVUFDYztzQkFEL0I7c0JBQWE7c0JBQVk7V0FDOUIsUUFBTSxLQUNNLElBQUE7S0FBWCxNQUFNO0tBQ04sVUFBTTtLQUVGLE9BQUE7TUFBSCxLQUFRLE9BQUcsRUFBRSxHQUNDO09BQWI7TUFBQTtRQUNJLElBQUUsRUFBRTtNQUNULFNBQVUsVUFBUTtLQUFBO1lBQ25CO0lBQUE7R0FBQTs7RUFFSCxtQ0FDTyxLQUFBOztHQUFOLG9CQUFNO2tCQUNKLG9CQUFBLE1BQVUsVUFDaUI7c0JBRHJCOzhCQUFZLElBQUU7SUFDaEIsUUFBQSxLQUFBLFVBQ087S0FBWCxXQUFRLElBQUcsTUFBTTtJQUFBO0dBQUE7O0VBRXBCLHdCQUNLLEtBQUE7O0dBQUosb0JBQU07a0JBQ0wsY0FBQSxVQUNnQjtzQkFEUjs7SUFDUixZQUFRO0lBQ1Isb0JBQUs7SUFDTCxVQUFNO0lBQ04sdUNBQVksSUFBRSxJQUFJOzs7O0VBRXBCLDBCQUNNLEtBQUE7O0dBQUwsb0JBQ0M7a0JBR0EsZUFBVyxXQUNrQjs4QkFEVCxPQUFPO0lBQzNCLFlBQVE7cUNBRFAsRUFBRSxRQUVILE9BQU8sYUFDWSxJQUFBO0tBQWxCLFVBQU07WUFDTixJQUFFLElBQUk7SUFBQTs7O0VBRVQsaUNBQ08sS0FBQTs7R0FBTixvQkFBTTtrQkFDTCxrQkFBRyxLQUFZLFdBQ2tCO3NCQUR6Qjs4QkFBZ0IsT0FBTzs2QkFBOUIsRUFDRCxPQUFRLE1BQU0sWUFBWSxNQUNXO3VCQUROO0tBQzlCLE9BQU0sR0FBQyxTQUFROzs7O0VBM0RsQix3QkFBQSIsImZpbGUiOiJtZXRhL3Rlc3RzL3BlcmYtdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9