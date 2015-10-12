"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../cash"],(exports,$_0)=>{
	exports._get=_ms.lazy(()=>{
		const $=_ms.getDefaultExport($_0);
		const current_45time_45ms=exports["current-time-ms"]=(()=>{
			return ()=>{
				return new (Date)().getTime()
			}
		})();
		const $after_45time=exports["$after-time"]=function $after_45time(time_45ms,_){
			_ms.checkContains(Number,time_45ms,"time-ms");
			_ms.checkContains(Function,_,"_");
			return new ($)(resolve=>{
				const f=function f(){
					resolve(_())
				};
				setTimeout(f,time_45ms)
			})
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvaW8vdGltZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQU1BLHFEQUNnQixLQUFBO1VBRWQ7V0FDQyxLQUFJOzs7RUFFUCwyQ0FBYyx1QkFBQSxVQUFlO3FCQUFQO3FCQUFTO1VBRTlCLEtBQUksR0FBSTtJQUNQLFFBQ007S0FBTCxRQUFRO0lBQUE7SUFDVCxXQUFXLEVBQUU7R0FBQTtFQUFBIiwiZmlsZSI6ImlvL3RpbWUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
