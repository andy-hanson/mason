"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at","./Function","./Generator","./methods","./Type/Method","./Type/Pred-Type","./Type/Type","./io/time","./Try","./compare","./math/Number","./math/methods","./Try"],(exports,_64_0,Function_1,Generator_2,methods_3,Method_4,Pred_45Type_5,Type_6,time_7,Try_8,compare_9,Number_10,methods_11,Try_12)=>{
	exports._get=_ms.lazy(()=>{
		const _64=_ms.getDefaultExport(_64_0),_$1=_ms.getModule(_64_0),flatten=_ms.get(_$1,"flatten"),_$2=_ms.getModule(Function_1),apply=_ms.get(_$2,"apply"),Thunk=_ms.get(_$2,"Thunk"),Generator=_ms.getDefaultExport(Generator_2),_$3=_ms.getModule(methods_3),sub=_ms.get(_$3,"sub"),_$4=_ms.getModule(Method_4),self_45impl_33=_ms.get(_$4,"self-impl!"),_$5=_ms.getModule(Pred_45Type_5),Any=_ms.get(_$5,"Any"),_$6=_ms.getModule(Type_6),_61_62=_ms.get(_$6,"=>"),_$7=_ms.lazyGetModule(time_7),$after_45time=_ms.lazyProp(_$7,"$after-time"),_$8=_ms.lazyGetModule(Try_8),$catch=_ms.lazyProp(_$8,"$catch"),_$9=_ms.lazyGetModule(compare_9),_61_63=_ms.lazyProp(_$9,"=?"),_$10=_ms.lazyGetModule(Number_10),divisible_63=_ms.lazyProp(_$10,"divisible?"),_$11=_ms.lazyGetModule(methods_11),_43=_ms.lazyProp(_$11,"+"),_$12=_ms.lazyGetModule(Try_12),$try=_ms.lazyProp(_$12,"$try");
		const $=(()=>{
			const built={};
			const doc=built.doc=`https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
Called \`$\` because you "cash in" on it after some time.`;
			return _ms.set(Promise,built)
		})();
		self_45impl_33(sub,$,()=>{
			return $
		});
		const $done=exports.$done=(()=>{
			const built={};
			const doc=built.doc=`Don't forget $done!
Logs any errors that happen inside a promise.
It would be great if we could make these errors happen top-level...
This is probably a kludge. See <http://blog.soareschen.com/the-problem-with-es6-promises>.`;
			return _ms.set(_=>{
				_ms.checkContains($,_,"_");
				return _ms.unlazy($catch)(_,err=>{
					console.log(`=== error ===
${err.message}
${err.stack}
=== error ===`);
					throw err
				})
			},built)
		})();
		const $fail_45after_45time=exports["$fail-after-time"]=(()=>{
			const built={};
			const doc=built.doc=`Fails if it takes too long.`;
			const $test=built.$test=function* $test(){
				const $x=_ms.unlazy($after_45time)(100,()=>{
					return 1
				});
				const a=(yield _ms.unlazy($try)($fail_45after_45time($x,1)));
				_ms.assert(_ms.unlazy(_61_63),a.message,`Took longer than 1 milliseconds.`);
				_ms.assert(_ms.unlazy(_61_63),1,(yield $fail_45after_45time($x,200)))
			};
			return _ms.set((_,time_45ms)=>{
				_ms.checkContains($,_,"_");
				_ms.checkContains(Number,time_45ms,"time-ms");
				return _ms.checkContains($,new ($)((resolve,reject)=>{
					$after(_,resolve);
					const timeout=function timeout(){
						return reject(new (Error)(`Took longer than ${time_45ms} milliseconds.`))
					};
					return setTimeout(timeout,time_45ms)
				}),"res")
			},built)
		})();
		const $after=exports.$after=(()=>{
			const built={};
			const doc=built.doc=`Applies \`then\` to the result whenever it is ready.
If \`then\` returns a $, returns a $ for that $'s value; else returns a $ for the result of \`then\`.`;
			const $test=built.$test=function* $test(){
				_ms.assert(_ms.unlazy(_61_63),2,(yield $after($resolved(1),_ms.sub(_ms.unlazy(_43),1))))
			};
			return _ms.set((_,then)=>{
				_ms.checkContains($,_,"_");
				_ms.checkContains(Function,then,"then");
				return _ms.checkContains($,_.then(then),"res")
			},built)
		})();
		const $resolved=exports.$resolved=(()=>{
			const built={};
			const doc=built.doc=`$ that is already resolved.`;
			const $test=built.$test=function* $test(){
				_ms.assert(_ms.unlazy(_61_63),1,(yield $resolved(1)))
			};
			return _ms.set(value=>{
				return _ms.checkContains($,$.resolve(value),"res")
			},built)
		})();
		const $rejected=exports.$rejected=(()=>{
			const built={};
			const doc=built.doc=`$ that is already rejected.`;
			const test=built.test=function test(){
				return $ing(function*(){
					const r=$rejected(`a`);
					_ms.assert(_ms.unlazy(_61_63),`a`,(yield _ms.unlazy($try)(r)));
					_ms.assert(_ms.unlazy(_61_63),`a`,(yield _ms.unlazy($try)($after(r,()=>{
						throw new (Error)(`b`)
					}))))
				})
			};
			return _ms.set(_=>{
				return $.reject(_)
			},built)
		})();
		const $delay=exports.$delay=(()=>{
			const built={};
			const doc=built.doc=`Schedules a computation to happen later.
Does *not* run it in parallel.
It should go without saying,
but if you needlessly $delay things all the time your program will take longer.`;
			const $test=built.$test=function* $test(){
				_ms.assert(_ms.unlazy(_61_63),1,(yield $delay(()=>{
					return 1
				})))
			};
			return _ms.set(delayed=>{
				_ms.checkContains(Thunk,delayed,"delayed");
				return _ms.unlazy($after_45time)(0,delayed)
			},built)
		})();
		const $all=exports.$all=(()=>{
			const built={};
			const doc=built.doc=`$ that resolves when the last $ in the input does, with every value in the original iteration order.
If any one of them fails, fails with the first such failure.`;
			const $test=built.$test=function* $test(){
				_ms.assert(_ms.unlazy(_61_63),[1,2],(yield $all([$resolved(1),$resolved(2)])));
				const all_45rejected=$all([$rejected(`a`),$rejected(`b`)]);
				_ms.assert(_ms.unlazy(_61_63),`a`,(yield _ms.unlazy($try)(all_45rejected)))
			};
			return _ms.set(_=>{
				_ms.checkContains(_64,_,"_");
				return _ms.checkContains(_ms.sub($,Array),$.all(_61_62(Array,_)),"res")
			},built)
		})();
		const $map=exports.$map=(()=>{
			const built={};
			const doc=built.doc=`Asynchronously runs mapper for every element of mapped and returns a $ joining them.
Unlike map, this always returns an Array.`;
			const $test=built.$test=function* $test(){
				_ms.assert(_ms.unlazy(_61_63),[2,3,4],(yield $map([1,2,3],_=>{
					return $delay(()=>{
						return _ms.unlazy(_43)(_,1)
					})
				})))
			};
			return _ms.set((mapped,mapper)=>{
				_ms.checkContains(_64,mapped,"mapped");
				_ms.checkContains(_ms.sub(Function,Any,$),mapper,"mapper");
				return _ms.checkContains(_ms.sub($,Array),$all((()=>{
					const built=[];
					for(let _ of mapped){
						_ms.add(built,mapper(_))
					};
					return built
				})()),"res")
			},built)
		})();
		const $flat_45map=exports["$flat-map"]=(()=>{
			const built={};
			const doc=built.doc=`Like $map but flattens the result.`;
			const $test=built.$test=function* $test(){
				_ms.assert(_ms.unlazy(_61_63),[1,1,2,2,3,3],(yield $flat_45map([1,2,3],_=>{
					return $delay(()=>{
						return [_,_]
					})
				})))
			};
			return _ms.set((mapped,mapper)=>{
				_ms.checkContains(_64,mapped,"mapped");
				_ms.checkContains(_ms.sub(Function,Any,_ms.sub($,_64)),mapper,"mapper");
				return _ms.checkContains(_ms.sub($,_64),$after($map(mapped,mapper),flatten),"res")
			},built)
		})();
		const $keep=exports.$keep=(()=>{
			const built={};
			const doc=built.doc=`Asynchronously runs keep-if? on each element and creates an Array of those that match.
Maintains the original order.`;
			const $test=built.$test=function* $test(){
				_ms.assert(_ms.unlazy(_61_63),[2,4],(yield $keep([1,2,3,4],_=>{
					return $delay(()=>{
						return _ms.unlazy(divisible_63)(_,2)
					})
				})))
			};
			return _ms.set((keep_45some,keep_45if_63)=>{
				_ms.checkContains(_64,keep_45some,"keep-some");
				_ms.checkContains(_ms.sub(Function,Any,_ms.sub($,Boolean)),keep_45if_63,"keep-if?");
				return _ms.checkContains(_ms.sub($,Array),$flat_45map(keep_45some,_=>{
					return $after(keep_45if_63(_),keep=>{
						return keep?_ms.some((()=>{
							return _
						})()):_ms.None
					})
				}),"res")
			},built)
		})();
		const $call=exports.$call=(()=>{
			const built={};
			const doc=built.doc=`Allows you to cal a function on $s as if they were the arguments.
So for any place you would write \`f x\` where \`x\` is an actualized value,
you may write \`$call f $x\` where \`$x\` is a promise.`;
			const $test=built.$test=function* $test(){
				_ms.assert(_ms.unlazy(_61_63),3,(yield $call(_ms.unlazy(_43),$resolved(1),$resolved(2))))
			};
			return _ms.set(function(f){
				const $args=[].slice.call(arguments,1);
				return _ms.checkContains($,$after($all($args),_ms.sub(apply,f)),"res")
			},built)
		})();
		const $ing=exports.$ing=(()=>{
			const built={};
			const doc=built.doc=`Within the generator, you may write:
	a <~ $get-a
The code after the assignment will become an $after of it.
Note that $ing returns a $; it does *not* call $done at the end.`;
			const $test=built.$test=function* $test(){
				_ms.assert(_ms.unlazy(_61_63),`res`,(yield $ing(function*(){
					const promised=(yield $resolved(`promised`));
					_ms.assert(_ms.unlazy(_61_63),`promised`,promised);
					return `res`
				})));
				const $whoops=(yield _ms.unlazy($try)($ing(function*(){
					(yield $rejected(`whoops`));
					throw new (Error)(`It's been rejected, so the rest is never called.`)
				})));
				_ms.assert(_ms.unlazy(_61_63),`whoops`,$whoops)
			};
			return _ms.set(code=>{
				_ms.checkContains(_ms.sub(Function,Generator),code,"code");
				const $_45generator=code();
				const do_45next=function do_45next(last_45value){
					const _$0=$_45generator.next(last_45value),value=_$0.value,done=_$0.done;
					return (()=>{
						if(done){
							return value
						} else {
							return $after(value,do_45next)
						}
					})()
				};
				return _ms.checkContains($,do_45next(),"res")
			},built)
		})();
		const name=exports.name=`$`;
		exports.default=$;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvJC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQWtCQSxRQUNFLEtBQUE7O0dBQUQsb0JBQ0M7a0JBRUQ7O0VBRUQsZUFBVyxJQUFJLEVBQ0csSUFBQTtVQUFqQjtFQUFBO0VBSUQsMEJBQ00sS0FBQTs7R0FBTCxvQkFDQztrQkFJQSxHQUNHO3NCQUREOzhCQUNLLEVBQUksS0FDRztLQUNiLFlBQ0MsaUJBQ0MsZUFDQTtLQUdGLE1BQU87SUFBQTtHQUFBOztFQUVWLHVEQUNpQixLQUFBOztHQUFoQixvQkFBTTtHQUNOLHdCQUNVLGlCQUFBO0lBQVQsbUNBQWlCLElBQ0ssSUFBQTtZQUFyQjtJQUFBO0lBQ0QsUUFBSyx3QkFBTSxxQkFBaUIsR0FBRztrQ0FDcEIsVUFBVztrQ0FDWCxFQUFHLE9BQUcscUJBQWlCLEdBQUc7R0FBQTtrQkFDckMsQ0FBRyxFQUFJLFlBQ2M7c0JBRGhCO3NCQUFVOzZCQUFkLEVBQ0QsS0FBSSxHQUFHLENBQUEsUUFBUSxTQUNNO0tBQXBCLE9BQU8sRUFBRTtLQUNULGNBQ1csa0JBQUE7YUFBVixPQUFPLEtBQUksT0FBTyxvQkFBa0I7O1lBQ3JDLFdBQVcsUUFBUTtJQUFBOzs7RUFFdEIsNEJBQ08sS0FBQTs7R0FBTixvQkFDQztHQUVELHdCQUNVLGlCQUFBO2tDQUFFLEVBQUcsT0FBRyxPQUFRLFVBQVUsMkJBQUs7R0FBQTtrQkFDeEMsQ0FBRyxFQUFJLE9BQ2E7c0JBRGY7c0JBMEdHOzZCQTFHUCxFQUNELE9BQU87OztFQUVULGtDQUNVLEtBQUE7O0dBQVQsb0JBQU07R0FDTix3QkFDVSxpQkFBQTtrQ0FBRSxFQUFHLE9BQUcsVUFBVTtHQUFBO2tCQUN4QixPQUNLOzZCQURQLEVBQ0QsVUFBVTs7O0VBRVosa0NBQ1UsS0FBQTs7R0FBVCxvQkFBTTtHQUNOLHNCQUNPLGVBQUE7V0FBTixLQUNRLFdBQUE7S0FBUCxRQUFJLFVBQVc7bUNBQ0gsSUFBSSx3QkFBUTttQ0FF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