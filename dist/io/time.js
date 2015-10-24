"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../cash"],(exports,$_0)=>{
	exports._get=_ms.lazy(()=>{
		const $=_ms.getDefaultExport($_0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvaW8vdGltZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQUtBLDJDQUFjLHVCQUFBLFVBQWU7cUJBQVA7cUJBQVM7VUFFOUIsS0FBSSxHQUFJO0lBQ1AsUUFDTTtLQUFMLFFBQVE7SUFBQTtJQUNULFdBQVcsRUFBRTtHQUFBO0VBQUEiLCJmaWxlIjoiaW8vdGltZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
