"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at","./control","./Function","./Generatorbang","./js","./methods","./Type/Method","./Type/Pred-Type","./Type/Type","./io/time","./Try","./bang","./compare","./math/Number","./math/methods","./Try"],function(exports,_64_0,control_1,Function_2,Generator_33_3,js_4,methods_5,Method_6,Pred_45Type_7,Type_8,time_9,Try_10,_33_11,compare_12,Number_13,methods_14,Try_15){
	exports._get=_ms.lazy(function(){
		const _64=_ms.getDefaultExport(_64_0),_$2=_ms.getModule(_64_0),flatten=_ms.get(_$2,"flatten"),map=_ms.get(_$2,"map"),_$3=_ms.getModule(control_1),_if=_ms.get(_$3,"if"),_$4=_ms.getModule(Function_2),apply=_ms.get(_$4,"apply"),Thunk=_ms.get(_$4,"Thunk"),Generator_33=_ms.getDefaultExport(Generator_33_3),_$6=_ms.getModule(js_4),_new=_ms.get(_$6,"new"),_$7=_ms.getModule(methods_5),sub=_ms.get(_$7,"sub"),_$8=_ms.getModule(Method_6),self_45impl_33=_ms.get(_$8,"self-impl!"),_$9=_ms.getModule(Pred_45Type_7),Any=_ms.get(_$9,"Any"),_$10=_ms.getModule(Type_8),_61_62=_ms.get(_$10,"=>"),_$12=_ms.lazyGetModule(time_9),$after_45time=_ms.lazyProp(_$12,"$after-time"),_$13=_ms.lazyGetModule(Try_10),$catch=_ms.lazyProp(_$13,"$catch"),oh_45no_33=_ms.lazyProp(_$13,"oh-no!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_11)
		}),_$16=_ms.lazyGetModule(compare_12),_61_63=_ms.lazyProp(_$16,"=?"),_$17=_ms.lazyGetModule(Number_13),divisible_63=_ms.lazyProp(_$17,"divisible?"),_$18=_ms.lazyGetModule(methods_14),_43=_ms.lazyProp(_$18,"+"),_$19=_ms.lazyGetModule(Try_15),$try=_ms.lazyProp(_$19,"$try");
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
					_ms.unlazy(oh_45no_33)(err)
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
						return _ms.unlazy(oh_45no_33)("b")
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
						return _if(keep,_)
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
					_ms.unlazy(oh_45no_33)("It's been rejected, so the rest is never called.")
				})));
				_ms.unlazy(_33)(_ms.unlazy(_61_63),"whoops",$whoops.message)
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
			},built)
		}();
		const name=exports.name="$";
		exports.default=$;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy8kLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFvQkEsa0JBQ0U7O0dBQUQsb0JBQ0M7a0JBRUQ7O0VBRUQsZUFBVyxJQUFJLEVBQ0csVUFBQTtVQUFqQjtFQUFBO0VBSUQsb0NBQ007O0dBQUwsb0JBQ0M7a0JBSUEsZUFBQSxFQUNHO3NCQUREOzhCQUNLLEVBQUksU0FBQSxJQUNHO0tBQ2IsbUJBQ0MsK0JBQ0MsNkJBQ0E7NEJBR0s7SUFBQTtHQUFBOztFQUVWLGlFQUNpQjs7R0FBaEIsb0JBQU07R0FDTix3QkFDVSxpQkFBQTtJQUFULG1DQUFpQixJQUNLLFVBQUE7WUFBckI7SUFBQTtJQUNELFFBQUssd0JBQU0scUJBQWlCLEdBQUc7dUNBQzFCLFVBQVc7dUNBQ1gsRUFBRyxPQUFHLHFCQUFpQixHQUFHO0dBQUE7a0JBQy9CLDhCQUFHLEVBQUksVUFDYztzQkFEaEI7c0JBQVU7NkJBQWQsRUFFRCxLQUFJLEVBQUcsU0FBQSxRQUFRLE9BQ007S0FBcEIsT0FBTyxFQUFFO0tBQ1QsY0FDVyxrQkFBQTthQUFWLE9BQVEsT0FBRyxNQUFPLCtCQUFrQjs7WUFDckMsa0JBQWtCLFFBQVE7SUFBQTs7O0VBRTdCLHNDQUNPOztHQUFOLG9CQUNDO0dBRUQsd0JBQ1UsaUJBQUE7dUNBQUosRUFBRyxPQUFHLE9BQVEsVUFBVSwyQkFBSztHQUFBO2tCQUNsQyxnQkFBRyxFQUFJLEtBQ2E7c0JBRGY7c0JBQU87NkJBQVgsRUFDRCxPQUFPOzs7RUFFVCw0Q0FDVTs7R0FBVCxvQkFBTTtHQUNOLHdCQUNVLGlCQUFBO3VDQUFKLEVBQUcsT0FBRyxVQUFVO0dBQUE7a0JBQ3JCLG1CQUFHLE1BQ0s7NkJBRFAsRUFDRCxVQUFVOzs7RUFFWiw0Q0FDVTs7R0FBVCxvQkFBTTtHQUNOLHNCQUNPLGVBQUE7V0FBTixLQUNRLFdBQUE7S0FBUCxRQUFJLFVBQVc7d0NBQ1QsSUFBSSx3QkFBUTtL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