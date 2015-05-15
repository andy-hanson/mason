"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at","./control","./Function","./Generatorbang","./js","./methods","./Type/Method","./Type/Pred-Type","./Type/Type","./Try","./bang","./compare","./io/time","./math/Number","./math/methods","./Try"],function(exports,_64_0,control_1,Function_2,Generator_33_3,js_4,methods_5,Method_6,Pred_45Type_7,Type_8,Try_9,_33_10,compare_11,time_12,Number_13,methods_14,Try_15){
	exports._get=_ms.lazy(function(){
		const _64=_ms.getDefaultExport(_64_0),_$2=_ms.getModule(_64_0),flatten=_ms.get(_$2,"flatten"),map=_ms.get(_$2,"map"),_$3=_ms.getModule(control_1),_if=_ms.get(_$3,"if"),_$4=_ms.getModule(Function_2),apply=_ms.get(_$4,"apply"),Generator_33=_ms.getDefaultExport(Generator_33_3),_$6=_ms.getModule(js_4),_new=_ms.get(_$6,"new"),_$7=_ms.getModule(methods_5),sub=_ms.get(_$7,"sub"),_$8=_ms.getModule(Method_6),self_45impl_33=_ms.get(_$8,"self-impl!"),_$9=_ms.getModule(Pred_45Type_7),Any=_ms.get(_$9,"Any"),_$10=_ms.getModule(Type_8),_61_62=_ms.get(_$10,"=>"),_$12=_ms.lazyGetModule(Try_9),$catch=_ms.lazyProp(_$12,"$catch"),oh_45no_33=_ms.lazyProp(_$12,"oh-no!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_10)
		}),_$15=_ms.lazyGetModule(compare_11),_61_63=_ms.lazyProp(_$15,"=?"),_$16=_ms.lazyGetModule(time_12),$after_45time=_ms.lazyProp(_$16,"$after-time"),_$17=_ms.lazyGetModule(Number_13),divisible_63=_ms.lazyProp(_$17,"divisible?"),_$18=_ms.lazyGetModule(methods_14),_43=_ms.lazyProp(_$18,"+"),_$19=_ms.lazyGetModule(Try_15),$try=_ms.lazyProp(_$19,"$try");
		const $=function(){
			const doc="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise\nCalled `$` because you \"cash in\" on it after some time.";
			return _ms.set(global.Promise,"doc",doc,"displayName","$")
		}();
		self_45impl_33(sub,$,function(){
			return $
		});
		const $done=exports.$done=function(){
			const doc="Don't forget $done!\nLogs any errors that happen inside a promise.\nIt would be great if we could make these errors happen top-level...\nThis is probably a kludge. See <http://blog.soareschen.com/the-problem-with-es6-promises>.";
			return _ms.set(function(_){
				_ms.checkContains($,_,"_");
				return _ms.unlazy($catch)(_,function(err){
					global.console.log((((("=== error ===\n"+_ms.show(err.message))+"\n")+_ms.show(err.stack))+"\n=== error ==="));
					return _ms.unlazy(oh_45no_33)(err)
				})
			},"doc",doc,"displayName","$done")
		}();
		const $fail_45after_45time=exports["$fail-after-time"]=function(){
			const doc="Fails if it takes too long.";
			const $test=function(){
				return _ms.set(function*(){
					const $x=_ms.unlazy($after_45time)(100,(yield* function*(){
						return _ms.set(function(){
							return 1
						},"displayName","$x")
					}()));
					const a=(yield _ms.unlazy($try)($fail_45after_45time($x,1)));
					_ms.unlazy(_33)(_ms.unlazy(_61_63),a.message,"Took longer than 1 milliseconds.");
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),1,(yield $fail_45after_45time($x,200)))
				},"displayName","$test")
			}();
			return _ms.set(function(_,time_45ms){
				_ms.checkContains($,_,"_");
				_ms.checkContains(Number,time_45ms,"time-ms");
				return _ms.checkContains($,_new($,function(resolve,reject){
					$after(_,resolve);
					const timeout=function(){
						return _ms.set(function(){
							return reject(_61_62(Error,(("Took longer than "+_ms.show(time_45ms))+" milliseconds.")))
						},"displayName","timeout")
					}();
					return global.setTimeout(timeout,time_45ms)
				}),"res")
			},"doc",doc,"$test",$test,"displayName","$fail-after-time")
		}();
		const $after=exports.$after=function(){
			const doc="Applies `then` to the result whenever it is ready.\nIf `then` returns a $, returns a $ for that $'s value; else returns a $ for the result of `then`.";
			const $test=function(){
				return _ms.set(function*(){
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),2,(yield $after($resolved(1),_ms.sub(_ms.unlazy(_43),1))))
				},"displayName","$test")
			}();
			return _ms.set(function(_,then){
				_ms.checkContains($,_,"_");
				_ms.checkContains(Function,then,"then");
				return _ms.checkContains($,_.then(then),"res")
			},"doc",doc,"$test",$test,"displayName","$after")
		}();
		const $resolved=exports.$resolved=function(){
			const doc="$ that is already resolved.";
			const $test=function(){
				return _ms.set(function*(){
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),1,(yield $resolved(1)))
				},"displayName","$test")
			}();
			return _ms.set(function(value){
				return _ms.checkContains($,$.resolve(value),"res")
			},"doc",doc,"$test",$test,"displayName","$resolved")
		}();
		const $rejected=exports.$rejected=function(){
			const doc="$ that is already rejected.";
			const test=function(){
				return _ms.set(function(){
					return $ing(function*(){
						const r=$rejected("a");
						_ms.unlazy(_33)(_ms.unlazy(_61_63),"a",(yield _ms.unlazy($try)(r)).message);
						const b=(yield _ms.unlazy($try)($after(r,(yield* function*(){
							return _ms.set(function(){
								return _ms.unlazy(oh_45no_33)("b")
							},"displayName","b")
						}()))));
						return _ms.unlazy(_33)(_ms.unlazy(_61_63),"a",b.message)
					})
				},"displayName","test")
			}();
			return _ms.set(function(_){
				return $.reject(_61_62(Error,_))
			},"doc",doc,"test",test,"displayName","$rejected")
		}();
		const $delay=exports.$delay=function(){
			const doc="Schedules a computation to happen later.\nDoes *not* run it in parallel.\nIt should go without saying,\nbut if you needlessly $delay things all the time your program will take longer.";
			const $test=function(){
				return _ms.set(function*(){
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),1,(yield $delay(function(){
						return 1
					})))
				},"displayName","$test")
			}();
			return _ms.set(function(delayed){
				_ms.checkContains(_ms.sub(Function,0),delayed,"delayed");
				return _new($,function(resolve){
					return resolve(delayed())
				})
			},"doc",doc,"$test",$test,"displayName","$delay")
		}();
		const $all=exports.$all=function(){
			const doc="$ that resolves when the last $ in the input does, with every value in the original iteration order.\nIf any one of them fails, fails with the first such failure.";
			const $test=function(){
				return _ms.set(function*(){
					_ms.unlazy(_33)(_ms.unlazy(_61_63),[1,2],(yield $all([$resolved(1),$resolved(2)])));
					const all_45rejected=$all([$rejected("a"),$rejected("b")]);
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),"a",(yield _ms.unlazy($try)(all_45rejected)).message)
				},"displayName","$test")
			}();
			return _ms.set(function(_){
				_ms.checkContains(_ms.sub(_64,$),_,"_");
				return _ms.checkContains(_ms.sub($,Array),$.all(_61_62(Array,_)),"res")
			},"doc",doc,"$test",$test,"displayName","$all")
		}();
		const $map=exports.$map=function(){
			const doc="Asynchronously runs mapper for every element of mapped and returns a $ joining them.\nUnlike map, this always returns an Array.";
			const $test=function(){
				return _ms.set(function*(){
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),[2,3,4],(yield $map([1,2,3],function(_){
						return $delay(function(){
							return _ms.unlazy(_43)(_,1)
						})
					})))
				},"displayName","$test")
			}();
			return _ms.set(function(mapped,mapper){
				_ms.checkContains(_64,mapped,"mapped");
				_ms.checkContains(_ms.sub(Function,Any,$),mapper,"mapper");
				return _ms.checkContains(_ms.sub($,Array),$all(map(mapped,mapper)),"res")
			},"doc",doc,"$test",$test,"displayName","$map")
		}();
		const $flat_45map=exports["$flat-map"]=function(){
			const doc="Like $map but flattens the result.";
			const $test=function(){
				return _ms.set(function*(){
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),[1,1,2,2,3,3],(yield $flat_45map([1,2,3],function(_){
						return $delay(function(){
							return [_,_]
						})
					})))
				},"displayName","$test")
			}();
			return _ms.set(function(mapped,mapper){
				_ms.checkContains(_64,mapped,"mapped");
				_ms.checkContains(_ms.sub(Function,Any,_ms.sub($,_64)),mapper,"mapper");
				return _ms.checkContains(_ms.sub($,_64),$after($map(mapped,mapper),flatten),"res")
			},"doc",doc,"$test",$test,"displayName","$flat-map")
		}();
		const $keep=exports.$keep=function(){
			const doc="Asynchronously runs keep-if? on each element and creates an Array of those that match.\nMaintains the original order.";
			const $test=function(){
				return _ms.set(function*(){
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),[2,4],(yield $keep([1,2,3,4],function(_){
						return $delay(function(){
							return _ms.unlazy(divisible_63)(_,2)
						})
					})))
				},"displayName","$test")
			}();
			return _ms.set(function(keep_45some,keep_45if_63){
				_ms.checkContains(_64,keep_45some,"keep-some");
				_ms.checkContains(_ms.sub(Function,Any,_ms.sub($,Boolean)),keep_45if_63,"keep-if?");
				return _ms.checkContains(_ms.sub($,Array),$flat_45map(keep_45some,function(_){
					return $after(keep_45if_63(_),function(keep){
						return _if(keep,_)
					})
				}),"res")
			},"doc",doc,"$test",$test,"displayName","$keep")
		}();
		const $call=exports.$call=function(){
			const doc="Allows you to cal a function on $s as if they were the arguments.\nSo for any place you would write `f x` where `x` is an actualized value,\nyou may write `$call f $x` where `$x` is a promise.";
			const $test=function(){
				return _ms.set(function*(){
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),3,(yield $call(_ms.unlazy(_43),$resolved(1),$resolved(2))))
				},"displayName","$test")
			}();
			return _ms.set(function(f){
				const $args=[].slice.call(arguments,1);
				return _ms.checkContains($,$after($all($args),_ms.sub(apply,f)),"res")
			},"doc",doc,"$test",$test,"displayName","$call")
		}();
		const $ing=exports.$ing=function(){
			const doc="Within the generator, you may write:\n\ta <~ $get-a\nThe code after the assignment will become an $after of it.\nNote that $ing returns a $; it does *not* call $done at the end.";
			const $test=function(){
				return _ms.set(function*(){
					_ms.unlazy(_33)(_ms.unlazy(_61_63),"res",(yield $ing(function*(){
						const promised=(yield $resolved("promised"));
						_ms.unlazy(_33)(_ms.unlazy(_61_63),"promised",promised);
						return "res"
					})));
					const $whoops=(yield _ms.unlazy($try)($ing((yield* function*(){
						return _ms.set(function*(){
							(yield $rejected("whoops"));
							return _ms.unlazy(oh_45no_33)("It's been rejected, so the rest is never called.")
						},"displayName","$whoops")
					}()))));
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),"whoops",$whoops.message)
				},"displayName","$test")
			}();
			return _ms.set(function(code){
				_ms.checkContains(_ms.sub(Function,Generator_33),code,"code");
				const gen=code();
				const do_45next=function(){
					return _ms.set(function(last_45value){
						const _$179=gen.next(last_45value),value=_$179.value,done=_$179.done;
						return function(){
							if(_ms.bool(done)){
								return value
							} else {
								return $after(value,do_45next)
							}
						}()
					},"displayName","do-next")
				}();
				return _ms.checkContains($,do_45next(),"res")
			},"doc",doc,"$test",$test,"displayName","$ing")
		}();
		const displayName=exports.displayName="$";
		exports.default=$;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy8kLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFvQkEsa0JBQ0c7R0FBRixVQUNDO2tCQUVEOztFQUVELGVBQVcsSUFBSSxFQUNHLFVBQUE7VUFBakI7RUFBQTtFQUlELG9DQUNNO0dBQUwsVUFDQztrQkFJQSxTQUFBLEVBQ0c7c0JBREQ7OEJBQ0ssRUFBRyxTQUFBLElBQ0c7S0FDWixtQkFDQywrQkFDQyw2QkFDQTttQ0FHSztJQUFBO0dBQUE7O0VBRVYsaUVBQ2lCO0dBQWhCLFVBQU07R0FDTixzQkFDUzttQkFBQSxXQUFBO0tBQVIsbUNBQWlCLElBQ0ssbUJBQUE7cUJBQUEsVUFBQTtjQUFyQjtNQUFBOztLQUNELFFBQUssd0JBQU0scUJBQWlCLEdBQUc7d0NBQzFCLFVBQVc7K0NBQ1gsRUFBRSxPQUFJLHFCQUFpQixHQUFHO0lBQUE7O2tCQUMvQixTQUFHLEVBQUksVUFDYztzQkFEaEI7c0JBQVU7NkJBQWQsRUFFRCxLQUFJLEVBQUcsU0FBQSxRQUFRLE9BQ007S0FBcEIsT0FBTyxFQUFFO0tBQ1Qsd0JBQ1c7cUJBQUEsVUFBQTtjQUFWLE9BQVEsT0FBRyxNQUFPLCtCQUFrQjs7O1lBQ3JDLGtCQUFrQixRQUFRO0lBQUE7OztFQUU3QixzQ0FDTztHQUFOLFVBQ0M7R0FFRCxzQkFDUzttQkFBQSxXQUFBOytDQUFILEVBQUUsT0FBSSxPQUFRLFVBQVUsMkJBQUs7SUFBQTs7a0JBQ2xDLFNBQUcsRUFBSSxLQUNhO3NCQURmO3NCQUFPOzZCQUFYLEVBQ0QsT0FBTzs7O0VBRVQsNENBQ1U7R0FBVCxVQUFNO0dBQ04sc0JBQ1M7bUJBQUEsV0FBQTsrQ0FBSCxFQUFFLE9BQUksVUFBVTtJQUFBOztrQkFDckIsU0FBRyxNQUNLOzZCQURQLEVBQ0QsVUFBVTs7O0VBRVosNENBQ1U7R0FBVCxVQUFNO0dBQ04scUJBQ087bUJBQUEsVUFBQTtZQUFOLEtBQ08sV0FBQTtNQUFO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