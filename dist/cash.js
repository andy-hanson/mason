"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at","./control","./Function","./Generatorbang","./js","./methods","./Type/Method","./Type/Pred-Type","./Type/Type","./Try","./bang","./compare","./io/time","./math/Number","./math/methods","./Try"],function(exports,_64_0,control_1,Function_2,Generator_33_3,js_4,methods_5,Method_6,Pred_45Type_7,Type_8,Try_9,_33_10,compare_11,time_12,Number_13,methods_14,Try_15){
	exports._get=_ms.lazy(function(){
		const _64=_ms.getDefaultExport(_64_0),_$2=_ms.getModule(_64_0),flatten=_ms.get(_$2,"flatten"),map=_ms.get(_$2,"map"),_$3=_ms.getModule(control_1),_if=_ms.get(_$3,"if"),_$4=_ms.getModule(Function_2),apply=_ms.get(_$4,"apply"),Generator_33=_ms.getDefaultExport(Generator_33_3),_$6=_ms.getModule(js_4),_new=_ms.get(_$6,"new"),_$7=_ms.getModule(methods_5),sub=_ms.get(_$7,"sub"),_$8=_ms.getModule(Method_6),self_45impl_33=_ms.get(_$8,"self-impl!"),_$9=_ms.getModule(Pred_45Type_7),Any=_ms.get(_$9,"Any"),_$10=_ms.getModule(Type_8),_61_62=_ms.get(_$10,"=>"),_$12=_ms.lazyGetModule(Try_9),$catch=_ms.lazyProp(_$12,"$catch"),oh_45no_33=_ms.lazyProp(_$12,"oh-no!"),_33=_ms.lazy(function(){
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
				_ms.checkContains($,_,"_");
				return _ms.unlazy($catch)(_,function(err){
					global.console.log((((("=== error ===\n"+_ms.show(err.message))+"\n")+_ms.show(err.stack))+"\n=== error ==="));
					return _ms.unlazy(oh_45no_33)(err)
				})
			},"doc",doc)
		}();
		const $fail_45after_45time=exports["$fail-after-time"]=function(){
			const doc="Fails if it takes too long.";
			const $test=function* $test(){
				const $x=_ms.unlazy($after_45time)(100,function(){
					return 1
				});
				const a=(yield _ms.unlazy($try)($fail_45after_45time($x,1)));
				_ms.unlazy(_33)(_ms.unlazy(_61_63),a.message,"Took longer than 1 milliseconds.");
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),1,(yield $fail_45after_45time($x,200)))
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
			},"doc",doc,"$test",$test)
		}();
		const $after=exports.$after=function(){
			const doc="Applies `then` to the result whenever it is ready.\nIf `then` returns a $, returns a $ for that $'s value; else returns a $ for the result of `then`.";
			const $test=function* $test(){
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),2,(yield $after($resolved(1),_ms.sub(_ms.unlazy(_43),1))))
			};
			return _ms.set(function $after(_,then){
				_ms.checkContains($,_,"_");
				_ms.checkContains(Function,then,"then");
				return _ms.checkContains($,_.then(then),"res")
			},"doc",doc,"$test",$test)
		}();
		const $resolved=exports.$resolved=function(){
			const doc="$ that is already resolved.";
			const $test=function* $test(){
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),1,(yield $resolved(1)))
			};
			return _ms.set(function $resolved(value){
				return _ms.checkContains($,$.resolve(value),"res")
			},"doc",doc,"$test",$test)
		}();
		const $rejected=exports.$rejected=function(){
			const doc="$ that is already rejected.";
			const test=function test(){
				return $ing(function*(){
					const r=$rejected("a");
					_ms.unlazy(_33)(_ms.unlazy(_61_63),"a",(yield _ms.unlazy($try)(r)).message);
					const b=(yield _ms.unlazy($try)($after(r,function(){
						return _ms.unlazy(oh_45no_33)("b")
					})));
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),"a",b.message)
				})
			};
			return _ms.set(function $rejected(_){
				return $.reject(_61_62(Error,_))
			},"doc",doc,"test",test)
		}();
		const $delay=exports.$delay=function(){
			const doc="Schedules a computation to happen later.\nDoes *not* run it in parallel.\nIt should go without saying,\nbut if you needlessly $delay things all the time your program will take longer.";
			const $test=function* $test(){
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),1,(yield $delay(function(){
					return 1
				})))
			};
			return _ms.set(function $delay(delayed){
				_ms.checkContains(_ms.sub(Function,0),delayed,"delayed");
				return _new($,function(resolve){
					return resolve(delayed())
				})
			},"doc",doc,"$test",$test)
		}();
		const $all=exports.$all=function(){
			const doc="$ that resolves when the last $ in the input does, with every value in the original iteration order.\nIf any one of them fails, fails with the first such failure.";
			const $test=function* $test(){
				_ms.unlazy(_33)(_ms.unlazy(_61_63),[1,2],(yield $all([$resolved(1),$resolved(2)])));
				const all_45rejected=$all([$rejected("a"),$rejected("b")]);
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),"a",(yield _ms.unlazy($try)(all_45rejected)).message)
			};
			return _ms.set(function $all(_){
				_ms.checkContains(_ms.sub(_64,$),_,"_");
				return _ms.checkContains(_ms.sub($,Array),$.all(_61_62(Array,_)),"res")
			},"doc",doc,"$test",$test)
		}();
		const $map=exports.$map=function(){
			const doc="Asynchronously runs mapper for every element of mapped and returns a $ joining them.\nUnlike map, this always returns an Array.";
			const $test=function* $test(){
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),[2,3,4],(yield $map([1,2,3],function(_){
					return $delay(function(){
						return _ms.unlazy(_43)(_,1)
					})
				})))
			};
			return _ms.set(function $map(mapped,mapper){
				_ms.checkContains(_64,mapped,"mapped");
				_ms.checkContains(_ms.sub(Function,Any,$),mapper,"mapper");
				return _ms.checkContains(_ms.sub($,Array),$all(map(mapped,mapper)),"res")
			},"doc",doc,"$test",$test)
		}();
		const $flat_45map=exports["$flat-map"]=function(){
			const doc="Like $map but flattens the result.";
			const $test=function* $test(){
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),[1,1,2,2,3,3],(yield $flat_45map([1,2,3],function(_){
					return $delay(function(){
						return [_,_]
					})
				})))
			};
			return _ms.set(function $flat_45map(mapped,mapper){
				_ms.checkContains(_64,mapped,"mapped");
				_ms.checkContains(_ms.sub(Function,Any,_ms.sub($,_64)),mapper,"mapper");
				return _ms.checkContains(_ms.sub($,_64),$after($map(mapped,mapper),flatten),"res")
			},"doc",doc,"$test",$test)
		}();
		const $keep=exports.$keep=function(){
			const doc="Asynchronously runs keep-if? on each element and creates an Array of those that match.\nMaintains the original order.";
			const $test=function* $test(){
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),[2,4],(yield $keep([1,2,3,4],function(_){
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
						return _if(keep,_)
					})
				}),"res")
			},"doc",doc,"$test",$test)
		}();
		const $call=exports.$call=function(){
			const doc="Allows you to cal a function on $s as if they were the arguments.\nSo for any place you would write `f x` where `x` is an actualized value,\nyou may write `$call f $x` where `$x` is a promise.";
			const $test=function* $test(){
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),3,(yield $call(_ms.unlazy(_43),$resolved(1),$resolved(2))))
			};
			return _ms.set(function $call(f){
				const $args=[].slice.call(arguments,1);
				return _ms.checkContains($,$after($all($args),_ms.sub(apply,f)),"res")
			},"doc",doc,"$test",$test)
		}();
		const $ing=exports.$ing=function(){
			const doc="Within the generator, you may write:\n\ta <~ $get-a\nThe code after the assignment will become an $after of it.\nNote that $ing returns a $; it does *not* call $done at the end.";
			const $test=function* $test(){
				_ms.unlazy(_33)(_ms.unlazy(_61_63),"res",(yield $ing(function*(){
					const promised=(yield $resolved("promised"));
					_ms.unlazy(_33)(_ms.unlazy(_61_63),"promised",promised);
					return "res"
				})));
				const $whoops=(yield _ms.unlazy($try)($ing(function*(){
					(yield $rejected("whoops"));
					return _ms.unlazy(oh_45no_33)("It's been rejected, so the rest is never called.")
				})));
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),"whoops",$whoops.message)
			};
			return _ms.set(function $ing(code){
				_ms.checkContains(_ms.sub(Function,Generator_33),code,"code");
				const gen=code();
				const do_45next=function do_45next(last_45value){
					const _$179=gen.next(last_45value),value=_$179.value,done=_$179.done;
					return function(){
						if(_ms.bool(done)){
							return value
						} else {
							return $after(value,do_45next)
						}
					}()
				};
				return _ms.checkContains($,do_45next(),"res")
			},"doc",doc,"$test",$test)
		}();
		const name=exports.name="$";
		exports.default=$;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy8kLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFvQkEsa0JBQ0c7R0FBRixVQUNDO2tCQUVEOztFQUVELGVBQVcsSUFBSSxFQUNHLFVBQUE7VUFBakI7RUFBQTtFQUlELG9DQUNNO0dBQUwsVUFDQztrQkFJQSxlQUFBLEVBQ0c7c0JBREQ7OEJBQ0ssRUFBRyxTQUFBLElBQ0c7S0FDWixtQkFDQywrQkFDQyw2QkFDQTttQ0FHSztJQUFBO0dBQUE7O0VBRVYsaUVBQ2lCO0dBQWhCLFVBQU07R0FDTixZQUNTLGlCQUFBO0lBQVIsbUNBQWlCLElBQ0ssVUFBQTtZQUFyQjtJQUFBO0lBQ0QsUUFBSyx3QkFBTSxxQkFBaUIsR0FBRzt1Q0FDMUIsVUFBVzs4Q0FDWCxFQUFFLE9BQUkscUJBQWlCLEdBQUc7R0FBQTtrQkFDL0IsOEJBQUcsRUFBSSxVQUNjO3NCQURoQjtzQkFBVTs2QkFBZCxFQUVELEtBQUksRUFBRyxTQUFBLFFBQVEsT0FDTTtLQUFwQixPQUFPLEVBQUU7S0FDVCxjQUNXLGtCQUFBO2FBQVYsT0FBUSxPQUFHLE1BQU8sK0JBQWtCOztZQUNyQyxrQkFBa0IsUUFBUTtJQUFBOzs7RUFFN0Isc0NBQ087R0FBTixVQUNDO0dBRUQsWUFDUyxpQkFBQTs4Q0FBSCxFQUFFLE9BQUksT0FBUSxVQUFVLDJCQUFLO0dBQUE7a0JBQ2xDLGdCQUFHLEVBQUksS0FDYTtzQkFEZjtzQkFBTzs2QkFBWCxFQUNELE9BQU87OztFQUVULDRDQUNVO0dBQVQsVUFBTTtHQUNOLFlBQ1MsaUJBQUE7OENBQUgsRUFBRSxPQUFJLFVBQVU7R0FBQTtrQkFDckIsbUJBQUcsTUFDSzs2QkFEUCxFQUNELFVBQVU7OztFQUVaLDRDQUNVO0dBQVQsVUFBTTtHQUNOLFdBQ08sZUFBQTtXQUFOLEtBQ08sV0FBQTtLQUFOLFFBQUksVUFBVzt3Q0FDVCxJQUFHLHdCQUFTO0tBRWxCLFFBQUssd0JBQU0s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