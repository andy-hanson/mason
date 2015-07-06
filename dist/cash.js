"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at","./Function","./Generatorbang","./js","./methods","./Type/Method","./Type/Pred-Type","./Type/Type","./io/time","./Try","./bang","./compare","./math/Number","./math/methods","./Try"],function(exports,_64_0,Function_1,Generator_33_2,js_3,methods_4,Method_5,Pred_45Type_6,Type_7,time_8,Try_9,_33_10,compare_11,Number_12,methods_13,Try_14){
	exports._get=_ms.lazy(function(){
		const _64=_ms.getDefaultExport(_64_0),_$2=_ms.getModule(_64_0),flatten=_ms.get(_$2,"flatten"),map=_ms.get(_$2,"map"),_$3=_ms.getModule(Function_1),apply=_ms.get(_$3,"apply"),Thunk=_ms.get(_$3,"Thunk"),Generator_33=_ms.getDefaultExport(Generator_33_2),_$5=_ms.getModule(js_3),_new=_ms.get(_$5,"new"),_$6=_ms.getModule(methods_4),sub=_ms.get(_$6,"sub"),_$7=_ms.getModule(Method_5),self_45impl_33=_ms.get(_$7,"self-impl!"),_$8=_ms.getModule(Pred_45Type_6),Any=_ms.get(_$8,"Any"),_$9=_ms.getModule(Type_7),_61_62=_ms.get(_$9,"=>"),_$11=_ms.lazyGetModule(time_8),$after_45time=_ms.lazyProp(_$11,"$after-time"),_$12=_ms.lazyGetModule(Try_9),$catch=_ms.lazyProp(_$12,"$catch"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_10)
		}),_$15=_ms.lazyGetModule(compare_11),_61_63=_ms.lazyProp(_$15,"=?"),_$16=_ms.lazyGetModule(Number_12),divisible_63=_ms.lazyProp(_$16,"divisible?"),_$17=_ms.lazyGetModule(methods_13),_43=_ms.lazyProp(_$17,"+"),_$18=_ms.lazyGetModule(Try_14),$try=_ms.lazyProp(_$18,"$try");
		const $=function(){
			const built={};
			const doc=built.doc="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise\nCalled `$` because you \"cash in\" on it after some time.";
			return _ms.set(global.Promise,built,"$")
		}();
		self_45impl_33(sub,$,function(){
			return $
		});
		const $done=exports.$done=function(){
			const built={};
			const doc=built.doc="Don't forget $done!\nLogs any errors that happen inside a promise.\nIt would be great if we could make these errors happen top-level...\nThis is probably a kludge. See <http://blog.soareschen.com/the-problem-with-es6-promises>.";
			return _ms.set(function $done(_){
				_ms.checkContains($,_,"_");
				return _ms.unlazy($catch)(_,function(err){
					global.console.log((((("=== error ===\n"+_ms.show(err.message))+"\n")+_ms.show(err.stack))+"\n=== error ==="));
					throw _ms.error(err)
				})
			},built)
		}();
		const $fail_45after_45time=exports["$fail-after-time"]=function(){
			const built={};
			const doc=built.doc="Fails if it takes too long.";
			const $test=built.$test=function* $test(){
				const $x=_ms.unlazy($after_45time)(100,function(){
					return 1
				});
				const a=(yield _ms.unlazy($try)($fail_45after_45time($x,1)));
				_ms.unlazy(_33)(_ms.unlazy(_61_63),a.message,"Took longer than 1 milliseconds.");
				_ms.unlazy(_33)(_ms.unlazy(_61_63),1,(yield $fail_45after_45time($x,200)))
			};
			return _ms.set(function $fail_45after_45time(_,time_45ms){
				_ms.checkContains($,_,"_");
				_ms.checkContains(Number,time_45ms,"time-ms");
				return _ms.checkContains($,_new($,function(resolve,reject){
					$after(_,resolve);
					const timeout=function timeout(){
						return reject(_61_62(Error,(("Took longer than "+_ms.show(time_45ms))+" milliseconds.")))
					};
					return global.setTimeout(timeout,time_45ms)
				}),"res")
			},built)
		}();
		const $after=exports.$after=function(){
			const built={};
			const doc=built.doc="Applies `then` to the result whenever it is ready.\nIf `then` returns a $, returns a $ for that $'s value; else returns a $ for the result of `then`.";
			const $test=built.$test=function* $test(){
				_ms.unlazy(_33)(_ms.unlazy(_61_63),2,(yield $after($resolved(1),_ms.sub(_ms.unlazy(_43),1))))
			};
			return _ms.set(function $after(_,then){
				_ms.checkContains($,_,"_");
				_ms.checkContains(Function,then,"then");
				return _ms.checkContains($,_.then(then),"res")
			},built)
		}();
		const $resolved=exports.$resolved=function(){
			const built={};
			const doc=built.doc="$ that is already resolved.";
			const $test=built.$test=function* $test(){
				_ms.unlazy(_33)(_ms.unlazy(_61_63),1,(yield $resolved(1)))
			};
			return _ms.set(function $resolved(value){
				return _ms.checkContains($,$.resolve(value),"res")
			},built)
		}();
		const $rejected=exports.$rejected=function(){
			const built={};
			const doc=built.doc="$ that is already rejected.";
			const test=built.test=function test(){
				return $ing(function*(){
					const r=$rejected("a");
					_ms.unlazy(_33)(_ms.unlazy(_61_63),"a",(yield _ms.unlazy($try)(r)).message);
					const b=(yield _ms.unlazy($try)($after(r,function(){
						throw _ms.error("b")
					})));
					_ms.unlazy(_33)(_ms.unlazy(_61_63),"a",b.message)
				})
			};
			return _ms.set(function $rejected(_){
				return $.reject(_61_62(Error,_))
			},built)
		}();
		const $delay=exports.$delay=function(){
			const built={};
			const doc=built.doc="Schedules a computation to happen later.\nDoes *not* run it in parallel.\nIt should go without saying,\nbut if you needlessly $delay things all the time your program will take longer.";
			const $test=built.$test=function* $test(){
				_ms.unlazy(_33)(_ms.unlazy(_61_63),1,(yield $delay(function(){
					return 1
				})))
			};
			return _ms.set(function $delay(delayed){
				_ms.checkContains(Thunk,delayed,"delayed");
				return _ms.unlazy($after_45time)(0,delayed)
			},built)
		}();
		const $all=exports.$all=function(){
			const built={};
			const doc=built.doc="$ that resolves when the last $ in the input does, with every value in the original iteration order.\nIf any one of them fails, fails with the first such failure.";
			const $test=built.$test=function* $test(){
				_ms.unlazy(_33)(_ms.unlazy(_61_63),[1,2],(yield $all([$resolved(1),$resolved(2)])));
				const all_45rejected=$all([$rejected("a"),$rejected("b")]);
				_ms.unlazy(_33)(_ms.unlazy(_61_63),"a",(yield _ms.unlazy($try)(all_45rejected)).message)
			};
			return _ms.set(function $all(_){
				_ms.checkContains(_ms.sub(_64,$),_,"_");
				return _ms.checkContains(_ms.sub($,Array),$.all(_61_62(Array,_)),"res")
			},built)
		}();
		const $map=exports.$map=function(){
			const built={};
			const doc=built.doc="Asynchronously runs mapper for every element of mapped and returns a $ joining them.\nUnlike map, this always returns an Array.";
			const $test=built.$test=function* $test(){
				_ms.unlazy(_33)(_ms.unlazy(_61_63),[2,3,4],(yield $map([1,2,3],function(_){
					return $delay(function(){
						return _ms.unlazy(_43)(_,1)
					})
				})))
			};
			return _ms.set(function $map(mapped,mapper){
				_ms.checkContains(_64,mapped,"mapped");
				_ms.checkContains(_ms.sub(Function,Any,$),mapper,"mapper");
				return _ms.checkContains(_ms.sub($,Array),$all(map(mapped,mapper)),"res")
			},built)
		}();
		const $flat_45map=exports["$flat-map"]=function(){
			const built={};
			const doc=built.doc="Like $map but flattens the result.";
			const $test=built.$test=function* $test(){
				_ms.unlazy(_33)(_ms.unlazy(_61_63),[1,1,2,2,3,3],(yield $flat_45map([1,2,3],function(_){
					return $delay(function(){
						return [_,_]
					})
				})))
			};
			return _ms.set(function $flat_45map(mapped,mapper){
				_ms.checkContains(_64,mapped,"mapped");
				_ms.checkContains(_ms.sub(Function,Any,_ms.sub($,_64)),mapper,"mapper");
				return _ms.checkContains(_ms.sub($,_64),$after($map(mapped,mapper),flatten),"res")
			},built)
		}();
		const $keep=exports.$keep=function(){
			const built={};
			const doc=built.doc="Asynchronously runs keep-if? on each element and creates an Array of those that match.\nMaintains the original order.";
			const $test=built.$test=function* $test(){
				_ms.unlazy(_33)(_ms.unlazy(_61_63),[2,4],(yield $keep([1,2,3,4],function(_){
					return $delay(function(){
						return _ms.unlazy(divisible_63)(_,2)
					})
				})))
			};
			return _ms.set(function $keep(keep_45some,keep_45if_63){
				_ms.checkContains(_64,keep_45some,"keep-some");
				_ms.checkContains(_ms.sub(Function,Any,_ms.sub($,Boolean)),keep_45if_63,"keep-if?");
				return _ms.checkContains(_ms.sub($,Array),$flat_45map(keep_45some,function(_){
					return $after(keep_45if_63(_),function(keep){
						return _ms.bool(keep)?_ms.some(function(){
							return _
						}()):_ms.None
					})
				}),"res")
			},built)
		}();
		const $call=exports.$call=function(){
			const built={};
			const doc=built.doc="Allows you to cal a function on $s as if they were the arguments.\nSo for any place you would write `f x` where `x` is an actualized value,\nyou may write `$call f $x` where `$x` is a promise.";
			const $test=built.$test=function* $test(){
				_ms.unlazy(_33)(_ms.unlazy(_61_63),3,(yield $call(_ms.unlazy(_43),$resolved(1),$resolved(2))))
			};
			return _ms.set(function $call(f){
				const $args=[].slice.call(arguments,1);
				return _ms.checkContains($,$after($all($args),_ms.sub(apply,f)),"res")
			},built)
		}();
		const $ing=exports.$ing=function(){
			const built={};
			const doc=built.doc="Within the generator, you may write:\n\ta <~ $get-a\nThe code after the assignment will become an $after of it.\nNote that $ing returns a $; it does *not* call $done at the end.";
			const $test=built.$test=function* $test(){
				_ms.unlazy(_33)(_ms.unlazy(_61_63),"res",(yield $ing(function*(){
					const promised=(yield $resolved("promised"));
					_ms.unlazy(_33)(_ms.unlazy(_61_63),"promised",promised);
					return "res"
				})));
				const $whoops=(yield _ms.unlazy($try)($ing(function*(){
					(yield $rejected("whoops"));
					throw _ms.error("It's been rejected, so the rest is never called.")
				})));
				_ms.unlazy(_33)(_ms.unlazy(_61_63),"whoops",$whoops.message)
			};
			return _ms.set(function $ing(code){
				_ms.checkContains(_ms.sub(Function,Generator_33),code,"code");
				const $_45generator=code();
				const do_45next=function do_45next(last_45value){
					const _$179=$_45generator.next(last_45value),value=_$179.value,done=_$179.done;
					return function(){
						if(_ms.bool(done)){
							return value
						} else {
							return $after(value,do_45next)
						}
					}()
				};
				return _ms.checkContains($,do_45next(),"res")
			},built)
		}();
		const name=exports.name="$";
		exports.default=$;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy8kLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFtQkEsa0JBQ0U7O0dBQUQsb0JBQ0M7a0JBRUQ7O0VBRUQsZUFBVyxJQUFJLEVBQ0csVUFBQTtVQUFqQjtFQUFBO0VBSUQsb0NBQ007O0dBQUwsb0JBQ0M7a0JBSUEsZUFBQSxFQUNHO3NCQUREOzhCQUNLLEVBQUksU0FBQSxJQUNHO0tBQ2IsbUJBQ0MsK0JBQ0MsNkJBQ0E7S0FHRixnQkFBTztJQUFBO0dBQUE7O0VBRVYsaUVBQ2lCOztHQUFoQixvQkFBTTtHQUNOLHdCQUNVLGlCQUFBO0lBQVQsbUNBQWlCLElBQ0ssVUFBQTtZQUFyQjtJQUFBO0lBQ0QsUUFBSyx3QkFBTSxxQkFBaUIsR0FBRzt1Q0FDMUIsVUFBVzt1Q0FDWCxFQUFHLE9BQUcscUJBQWlCLEdBQUc7R0FBQTtrQkFDL0IsOEJBQUcsRUFBSSxVQUNjO3NCQURoQjtzQkFBVTs2QkFBZCxFQUVELEtBQUksRUFBRyxTQUFBLFFBQVEsT0FDTTtLQUFwQixPQUFPLEVBQUU7S0FDVCxjQUNXLGtCQUFBO2FBQVYsT0FBUSxPQUFHLE1BQU8sK0JBQWtCOztZQUNyQyxrQkFBa0IsUUFBUTtJQUFBOzs7RUFFN0Isc0NBQ087O0dBQU4sb0JBQ0M7R0FFRCx3QkFDVSxpQkFBQTt1Q0FBSixFQUFHLE9BQUcsT0FBUSxVQUFVLDJCQUFLO0dBQUE7a0JBQ2xDLGdCQUFHLEVBQUksS0FDYTtzQkFEZjtzQkFBTzs2QkFBWCxFQUNELE9BQU87OztFQUVULDRDQUNVOztHQUFULG9CQUFNO0dBQ04sd0JBQ1UsaUJBQUE7dUNBQUosRUFBRyxPQUFHLFVBQVU7R0FBQTtrQkFDckIsbUJBQUcsTUFDSzs2QkFEUCxFQUNELFVBQVU7OztFQUVaLDRDQUNVOztHQUFULG9CQUFNO0dBQ04sc0JBQ08sZUFBQTtXQUFOLEtBQ1EsV0FBQTtLQUFQLFFBQUksVUFBVzt3Q0FDVCxJQUFJLHdC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