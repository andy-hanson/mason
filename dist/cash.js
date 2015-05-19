"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at","./control","./Function","./Generatorbang","./js","./methods","./Type/Method","./Type/Pred-Type","./Type/Type","./Try","./bang","./compare","./io/time","./math/Number","./math/methods","./Try"],function(exports,_64_0,control_1,Function_2,Generator_33_3,js_4,methods_5,Method_6,Pred_45Type_7,Type_8,Try_9,_33_10,compare_11,time_12,Number_13,methods_14,Try_15){
	exports._get=_ms.lazy(function(){
		const _64=_ms.getDefaultExport(_64_0),_$2=_ms.getModule(_64_0),flatten=_$2.flatten,map=_$2.map,_$3=_ms.getModule(control_1),_if=_$3.if,_$4=_ms.getModule(Function_2),apply=_$4.apply,Generator_33=_ms.getDefaultExport(Generator_33_3),_$6=_ms.getModule(js_4),_new=_$6.new,_$7=_ms.getModule(methods_5),sub=_$7.sub,_$8=_ms.getModule(Method_6),self_45impl_33=_$8["self-impl!"],_$9=_ms.getModule(Pred_45Type_7),Any=_$9.Any,_$10=_ms.getModule(Type_8),_61_62=_$10["=>"],_$12=_ms.lazyGetModule(Try_9),$catch=_ms.lazyProp(_$12,"$catch"),oh_45no_33=_ms.lazyProp(_$12,"oh-no!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_10)
		}),_$15=_ms.lazyGetModule(compare_11),_61_63=_ms.lazyProp(_$15,"=?"),_$16=_ms.lazyGetModule(time_12),$after_45time=_ms.lazyProp(_$16,"$after-time"),_$17=_ms.lazyGetModule(Number_13),divisible_63=_ms.lazyProp(_$17,"divisible?"),_$18=_ms.lazyGetModule(methods_14),_43=_ms.lazyProp(_$18,"+"),_$19=_ms.lazyGetModule(Try_15),$try=_ms.lazyProp(_$19,"$try");
		const $=function(){
			const doc="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise\nCalled `$` because you \"cash in\" on it after some time.";
			return _ms.set(global.Promise,"doc",doc,"name","$")
		}();
		self_45impl_33(sub,$,function(){
			return $
		});
		const $done=exports.$done=function(){
			const doc="Don't forget $done!\nLogs any errors that happen inside a promise.\nIt would be great if we could make these errors happen top-level...\nThis is probably a kludge. See <http://blog.soareschen.com/the-problem-with-es6-promises>.";
			return _ms.set(function $done(_){
				return _ms.unlazy($catch)(_,function(err){
					global.console.log((((("=== error ===\n"+_ms.show(err.message))+"\n")+_ms.show(err.stack))+"\n=== error ==="));
					return _ms.unlazy(oh_45no_33)(err)
				})
			},"doc",doc)
		}();
		const $fail_45after_45time=exports["$fail-after-time"]=function(){
			const doc="Fails if it takes too long.";
			return _ms.set(function $fail_45after_45time(_,time_45ms){
				return _new($,function(resolve,reject){
					$after(_,resolve);
					const timeout=function timeout(){
						return reject(_61_62(Error,(("Took longer than "+_ms.show(time_45ms))+" milliseconds.")))
					};
					return global.setTimeout(timeout,time_45ms)
				})
			},"doc",doc)
		}();
		const $after=exports.$after=function(){
			const doc="Applies `then` to the result whenever it is ready.\nIf `then` returns a $, returns a $ for that $'s value; else returns a $ for the result of `then`.";
			return _ms.set(function $after(_,then){
				return _.then(then)
			},"doc",doc)
		}();
		const $resolved=exports.$resolved=function(){
			const doc="$ that is already resolved.";
			return _ms.set(function $resolved(value){
				return $.resolve(value)
			},"doc",doc)
		}();
		const $rejected=exports.$rejected=function(){
			const doc="$ that is already rejected.";
			return _ms.set(function $rejected(_){
				return $.reject(_61_62(Error,_))
			},"doc",doc)
		}();
		const $delay=exports.$delay=function(){
			const doc="Schedules a computation to happen later.\nDoes *not* run it in parallel.\nIt should go without saying,\nbut if you needlessly $delay things all the time your program will take longer.";
			return _ms.set(function $delay(delayed){
				return _new($,function(resolve){
					return resolve(delayed())
				})
			},"doc",doc)
		}();
		const $all=exports.$all=function(){
			const doc="$ that resolves when the last $ in the input does, with every value in the original iteration order.\nIf any one of them fails, fails with the first such failure.";
			return _ms.set(function $all(_){
				return $.all(_61_62(Array,_))
			},"doc",doc)
		}();
		const $map=exports.$map=function(){
			const doc="Asynchronously runs mapper for every element of mapped and returns a $ joining them.\nUnlike map, this always returns an Array.";
			return _ms.set(function $map(mapped,mapper){
				return $all(map(mapped,mapper))
			},"doc",doc)
		}();
		const $flat_45map=exports["$flat-map"]=function(){
			const doc="Like $map but flattens the result.";
			return _ms.set(function $flat_45map(mapped,mapper){
				return $after($map(mapped,mapper),flatten)
			},"doc",doc)
		}();
		const $keep=exports.$keep=function(){
			const doc="Asynchronously runs keep-if? on each element and creates an Array of those that match.\nMaintains the original order.";
			return _ms.set(function $keep(keep_45some,keep_45if_63){
				return $flat_45map(keep_45some,function(_){
					return $after(keep_45if_63(_),function(keep){
						return _if(keep,_)
					})
				})
			},"doc",doc)
		}();
		const $call=exports.$call=function(){
			const doc="Allows you to cal a function on $s as if they were the arguments.\nSo for any place you would write `f x` where `x` is an actualized value,\nyou may write `$call f $x` where `$x` is a promise.";
			return _ms.set(function $call(f){
				const $args=[].slice.call(arguments,1);
				return $after($all($args),_ms.sub(apply,f))
			},"doc",doc)
		}();
		const $ing=exports.$ing=function(){
			const doc="Within the generator, you may write:\n\ta <~ $get-a\nThe code after the assignment will become an $after of it.\nNote that $ing returns a $; it does *not* call $done at the end.";
			return _ms.set(function $ing(code){
				const gen=code();
				const do_45next=function do_45next(last_45value){
					const _$179=gen.next(last_45value),value=_$179.value,done=_$179.done;
					return function(){
						if(done){
							return value
						} else {
							return $after(value,do_45next)
						}
					}()
				};
				return do_45next()
			},"doc",doc)
		}();
		const name=exports.name="$";
		exports.default=$;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy8kLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFvQkEsa0JBQ0c7R0FBRixVQUNDO2tCQUVEOztFQUVELGVBQVcsSUFBSSxFQUNHLFVBQUE7VUFBakI7RUFBQTtFQUlELG9DQUNNO0dBQUwsVUFDQztrQkFJQSxlQUFBLEVBQ0c7OEJBQUksRUFBRyxTQUFBLElBQ0c7S0FDWixtQkFDQywrQkFDQyw2QkFDQTttQ0FHSztJQUFBO0dBQUE7O0VBRVYsaUVBQ2lCO0dBQWhCLFVBQU07a0JBT0wsOEJBQUcsRUFBSSxVQUNjO1dBQ3JCLEtBQUksRUFBRyxTQUFBLFFBQVEsT0FDTTtLQUFwQixPQUFPLEVBQUU7S0FDVCxjQUNXLGtCQUFBO2FBQVYsT0FBUSxPQUFHLE1BQU8sK0JBQWtCOztZQUNyQyxrQkFBa0IsUUFBUTtJQUFBO0dBQUE7O0VBRTdCLHNDQUNPO0dBQU4sVUFDQztrQkFJQSxnQkFBRyxFQUFJLEtBQ2E7V0FBcEIsT0FBTztHQUFBOztFQUVULDRDQUNVO0dBQVQsVUFBTTtrQkFHTCxtQkFBRyxNQUNLO1dBQVIsVUFBVTtHQUFBOztFQUVaLDRDQUNVO0dBQVQsVUFBTTtrQkFTTCxtQkFBQSxFQUNDO1dBQUQsU0FBVSxPQUFHLE1BQU07R0FBQTs7RUFFckIsc0NBQ087R0FBTixVQUNDO2tCQU9BLGdCQUFBLFFBQ21CO1dBQW5CLEtBQUksRUFBRyxTQUFBLFFBQ087WUFBYixRQUFRO0lBQUE7R0FBQTs7RUFFWCxrQ0FDSztHQUFKLFVBQ0M7a0JBTUEsY0FBVSxFQUNNO1dBQWhCLE1BQU8sT0FBRyxNQUFNO0dBQUE7O0VBRWxCLGtDQUNLO0dBQUosVUFDQztrQkFNQSxjQUFVLE9BQVMsT0FDc0I7V0FBekMsS0FBTSxJQUFJLE9BQU87R0FBQTs7RUFFbkIsaURBQ1U7R0FBVCxVQUFNO2tCQUtMLHFCQUFNLE9BQVMsT0FDeUI7V0FBeEMsT0FBUSxLQUFLLE9BQU8sUUFBUTtHQUFBOztFQUU5QixvQ0FDTTtHQUFMLFVBQ0M7a0JBTUEsZUFBVSxZQUFZLGFBQ2lDO1dBQXZELFlBQVUsWUFBVyxTQUFBLEVBQ0M7WUFBckIsT0FBTyxhQUFBLEdBQVcsU0FBQSxLQUNJO2FBQXJCLElBQUcsS0FBSztLQUFBO0lBQUE7R0FBQTs7RUFFWixvQ0FDTTtHQUFMLFVBQ0M7a0JBS0EsZUFBRyxFQUNVOztXQUFiLE9BQVEsS0FBSyxlQUFPLE1BQU07R0FBQTs7RUFFNUIsa0NBQ0s7R0FBSixVQUNDO2tCQWFBLGNBQUcsS0FDeUI7SUFBNUIsVUFBTTtJQUNOLGdCQUFXLG1CQUFBLGFBQ1U7S0FBcEIsWUFBYSxTQUFTOztNQUVyQixHQUFBLEtBQ0k7Y0FBSDtNQUFBLE9BRUc7Y0FBSCxPQUFPLE1BQU07TUFBQTtLQUFBO0lBQUE7V0FDaEI7R0FBQTs7RUF4TEYsd0JBQUE7a0JBMExBIiwiZmlsZSI6ImNhc2guanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==