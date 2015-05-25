"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../private/boot-order","require","../cash","./modules","./tests/run-tests","./tests/perf-test"],function(exports,boot_45order_0,require_1,$_2,modules_3,run_45tests_4,perf_45test_5){
	exports._get=_ms.lazy(function(){
		_ms.getModule(boot_45order_0);
		const require=_ms.getDefaultExport(require_1),_$5=_ms.getModule($_2),$done=_ms.get(_$5,"$done"),$ing=_ms.get(_$5,"$ing"),_$7=_ms.getModule(modules_3),$_64all_45modules=_ms.get(_$7,"$@all-modules"),_$8=_ms.getModule(run_45tests_4),$test_45all=_ms.get(_$8,"$test-all"),_$9=_ms.getModule(perf_45test_5),$time_33=_ms.get(_$9,"$time!");
		const name=exports.name="run-all-tests";
		exports.default=function(){
			$done($ing(function*(){
				const _64all=(yield $_64all_45modules(require,"../modules-list"));
				return (yield $time_33("test",function(){
					return $test_45all(_64all)
				}))
			}))
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL3J1bi1hbGwtdGVzdHMubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0VBQUEsd0JBQUE7a0JBV0UsVUFBQTtHQUFELE1BQU8sS0FDTyxXQUFBO0lBQ2IsYUFBUSxPQUFBLGtCQUFjLFFBQVM7V0FDNUIsT0FBQSxTQUFRLE9BQ08sVUFBQTtZQUFqQixZQUFVO0lBQUE7R0FBQTtFQUFBIiwiZmlsZSI6Im1ldGEvcnVuLWFsbC10ZXN0cy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9