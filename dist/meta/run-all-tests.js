"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../private/boot","require","../cash","./modules","./tests/run-tests","./tests/perf-test"],(exports,boot_0,require_1,$_2,modules_3,run_45tests_4,perf_45test_5)=>{
	exports._get=_ms.lazy(()=>{
		_ms.getModule(boot_0);
		const require=_ms.getDefaultExport(require_1),_$0=_ms.getModule($_2),$done=_ms.get(_$0,"$done"),$ing=_ms.get(_$0,"$ing"),_$1=_ms.getModule(modules_3),$_64all_45modules=_ms.get(_$1,"$@all-modules"),_$2=_ms.getModule(run_45tests_4),$test_45all=_ms.get(_$2,"$test-all"),_$3=_ms.getModule(perf_45test_5),$time_33=_ms.get(_$3,"$time!");
		const name=exports.name=`run-all-tests`;
		exports.default=function run_45all_45tests(){
			$done($ing(function*(){
				const _64all=(yield $_64all_45modules(require,`../modules-list`));
				return (yield $time_33(`test`,()=>{
					return $test_45all(_64all)
				}))
			}))
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvbWV0YS9ydW4tYWxsLXRlc3RzLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztFQUFBLHdCQUFBO2tCQVdFLDRCQUFBO0dBQUQsTUFBTyxLQUNPLFdBQUE7SUFDYixhQUFRLE9BQUEsa0JBQWMsUUFBUztXQUM1QixPQUFBLFNBQVEsT0FDTyxJQUFBO1lBQWpCLFlBQVU7SUFBQTtHQUFBO0VBQUEiLCJmaWxlIjoibWV0YS9ydW4tYWxsLXRlc3RzLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=