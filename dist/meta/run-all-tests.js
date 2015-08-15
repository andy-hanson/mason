"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../private/boot-order","require","../cash","./modules","./tests/run-tests","./tests/perf-test"],(exports,boot_45order_0,require_1,$_2,modules_3,run_45tests_4,perf_45test_5)=>{
	exports._get=_ms.lazy(()=>{
		_ms.getModule(boot_45order_0);
		const require=_ms.getDefaultExport(require_1),_$5=_ms.getModule($_2),$done=_ms.get(_$5,"$done"),$ing=_ms.get(_$5,"$ing"),_$7=_ms.getModule(modules_3),$_64all_45modules=_ms.get(_$7,"$@all-modules"),_$8=_ms.getModule(run_45tests_4),$test_45all=_ms.get(_$8,"$test-all"),_$9=_ms.getModule(perf_45test_5),$time_33=_ms.get(_$9,"$time!");
		const name=exports.name=`run-all-tests`;
		exports.default=()=>{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvbWV0YS9ydW4tYWxsLXRlc3RzLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztFQUFBLHdCQUFBO2tCQVdFLElBQUE7R0FBRCxNQUFPLEtBQ08sV0FBQTtJQUNiLGFBQVEsT0FBQSxrQkFBYyxRQUFTO1dBQzVCLE9BQUEsU0FBUSxPQUNPLElBQUE7WUFBakIsWUFBVTtJQUFBO0dBQUE7RUFBQSIsImZpbGUiOiJtZXRhL3J1bi1hbGwtdGVzdHMuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==