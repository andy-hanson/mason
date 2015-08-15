"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../cash","../compare"],(exports,$_0,compare_1)=>{
	exports._get=_ms.lazy(()=>{
		const $=_ms.getDefaultExport($_0),_$4=_ms.lazyGetModule(compare_1),_61_63=_ms.lazyProp(_$4,"=?");
		const current_45time_45ms=exports["current-time-ms"]=(()=>{
			const built={};
			const doc=built.doc=`Milliseconds since 1 January 1970 00:00:00 UTC.`;
			return _ms.set(function current_45time_45ms(){
				return new (Date)().getTime()
			},built)
		})();
		const $after_45time=exports["$after-time"]=(()=>{
			const built={};
			const doc=built.doc=`Does something after a certain time has passed.`;
			const $test=built.$test=function* $test(){
				_ms.assert(_ms.unlazy(_61_63),1,(yield $after_45time(1,()=>{
					return 1
				})))
			};
			return _ms.set(function $after_45time(time_45ms,_){
				_ms.checkContains(Number,time_45ms,"time-ms");
				_ms.checkContains(Function,_,"_");
				return new ($)(resolve=>{
					const f=function f(){
						resolve(_())
					};
					global.setTimeout(f,time_45ms)
				})
			},built)
		})();
		const name=exports.name=`time`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvaW8vdGltZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQUtBLHFEQUNnQixLQUFBOztHQUFmLG9CQUFNO2tCQUVMLDhCQUFBO1dBQUMsS0FBSTs7O0VBRVAsMkNBQ1ksS0FBQTs7R0FBWCxvQkFBTTtHQUNOLHdCQUNVLGlCQUFBO2tDQUFFLEVBQUcsT0FBRyxjQUFZLEVBQ0csSUFBQTtZQUEvQjtJQUFBO0dBQUE7a0JBQ0QsdUJBQUEsVUFBZSxFQUNVO3NCQURqQjtzQkFBUztXQUNqQixLQUFJLEdBQUksU0FDTztLQUFkLFFBQ00sWUFBQTtNQUFMLFFBQVE7S0FBQTtLQUNULGtCQUFrQixFQUFFO0lBQUE7R0FBQTs7RUFuQnZCLHdCQUFBIiwiZmlsZSI6ImlvL3RpbWUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==