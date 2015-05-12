"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at","./Bool","./control","./Fun","./Generatorbang","./js","./methods","./Type/Method","./Type/Pred-Type","./Type/Type","./math/Num","./Try","./bang","./compare","./io/time","./math/Num","./math/methods","./Try"],function(exports,_64_0,Bool_1,control_2,Fun_3,Generator_33_4,js_5,methods_6,Method_7,Pred_45Type_8,Type_9,Num_10,Try_11,_33_12,compare_13,time_14,Num_15,methods_16,Try_17){
	exports._get=_ms.lazy(function(){
		const _64=_ms.getDefaultExport(_64_0),_$2=_ms.getModule(_64_0),flatten=_ms.get(_$2,"flatten"),map=_ms.get(_$2,"map"),Bool=_ms.getDefaultExport(Bool_1),_$4=_ms.getModule(control_2),_if=_ms.get(_$4,"if"),Fun=_ms.getDefaultExport(Fun_3),_$5=_ms.getModule(Fun_3),apply=_ms.get(_$5,"apply"),Generator_33=_ms.getDefaultExport(Generator_33_4),_$7=_ms.getModule(js_5),_new=_ms.get(_$7,"new"),_$8=_ms.getModule(methods_6),sub=_ms.get(_$8,"sub"),_$9=_ms.getModule(Method_7),self_45impl_33=_ms.get(_$9,"self-impl!"),_$10=_ms.getModule(Pred_45Type_8),Any=_ms.get(_$10,"Any"),_$11=_ms.getModule(Type_9),_61_62=_ms.get(_$11,"=>"),Num=_ms.lazy(function(){
			return _ms.getDefaultExport(Num_10)
		}),_$14=_ms.lazyGetModule(Try_11),$catch=_ms.lazyProp(_$14,"$catch"),oh_45no_33=_ms.lazyProp(_$14,"oh-no!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_12)
		}),_$17=_ms.lazyGetModule(compare_13),_61_63=_ms.lazyProp(_$17,"=?"),_$18=_ms.lazyGetModule(time_14),$after_45time=_ms.lazyProp(_$18,"$after-time"),_$19=_ms.lazyGetModule(Num_15),divisible_63=_ms.lazyProp(_$19,"divisible?"),_$20=_ms.lazyGetModule(methods_16),_43=_ms.lazyProp(_$20,"+"),_$21=_ms.lazyGetModule(Try_17),$try=_ms.lazyProp(_$21,"$try");
		const $=function(){
			const doc="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise\nCalled `$` because you \"cash in\" on it after some time.";
			return _ms.set(Promise,"doc",doc,"displayName","$")
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
			const $test=_ms.set(function*(){
				const $x=_ms.unlazy($after_45time)(100,_ms.set(function(){
					return 1
				},"displayName","$x"));
				const a=(yield _ms.unlazy($try)($fail_45after_45time($x,1)));
				_ms.unlazy(_33)(_ms.unlazy(_61_63),a.message,"Took longer than 1 milliseconds.");
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),1,(yield $fail_45after_45time($x,200)))
			},"displayName","$test");
			return _ms.set(function(_,time_45ms){
				_ms.checkContains($,_,"_");
				_ms.checkContains(_ms.unlazy(Num),time_45ms,"time-ms");
				return _ms.checkContains($,_new($,function(resolve,reject){
					$after(_,resolve);
					const timeout=_ms.set(function(){
						return reject(_61_62(Error,(("Took longer than "+_ms.show(time_45ms))+" milliseconds.")))
					},"displayName","timeout");
					return global.setTimeout(timeout,time_45ms)
				}),"res")
			},"doc",doc,"$test",$test,"displayName","$fail-after-time")
		}();
		const $after=exports.$after=function(){
			const doc="Applies `then` to the result whenever it is ready.\nIf `then` returns a $, returns a $ for that $'s value; else returns a $ for the result of `then`.";
			const $test=_ms.set(function*(){
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),2,(yield $after($resolved(1),_ms.sub(_ms.unlazy(_43),1))))
			},"displayName","$test");
			return _ms.set(function(_,then){
				_ms.checkContains($,_,"_");
				_ms.checkContains(Fun,then,"then");
				return _ms.checkContains($,_.then(then),"res")
			},"doc",doc,"$test",$test,"displayName","$after")
		}();
		const $resolved=exports.$resolved=function(){
			const doc="$ that is already resolved.";
			const $test=_ms.set(function*(){
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),1,(yield $resolved(1)))
			},"displayName","$test");
			return _ms.set(function(value){
				return _ms.checkContains($,Promise.resolve(value),"res")
			},"doc",doc,"$test",$test,"displayName","$resolved")
		}();
		const $rejected=exports.$rejected=function(){
			const doc="$ that is already rejected.";
			const test=_ms.set(function(){
				return $ing(function*(){
					const r=$rejected("a");
					_ms.unlazy(_33)(_ms.unlazy(_61_63),"a",(yield _ms.unlazy($try)(r)).message);
					const b=(yield _ms.unlazy($try)($after(r,_ms.set(function(){
						return _ms.unlazy(oh_45no_33)("b")
					},"displayName","b"))));
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),"a",b.message)
				})
			},"displayName","test");
			return _ms.set(function(_){
				return Promise.reject(_61_62(Error,_))
			},"doc",doc,"test",test,"displayName","$rejected")
		}();
		const $delay=exports.$delay=function(){
			const doc="Schedules a computation to happen later.\nDoes *not* run it in parallel.\nIt should go without saying,\nbut if you needlessly $delay things all the time your program will take longer.";
			const $test=_ms.set(function*(){
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),1,(yield $delay(function(){
					return 1
				})))
			},"displayName","$test");
			return _ms.set(function(delayed){
				_ms.checkContains(_ms.sub(Fun,0),delayed,"delayed");
				return _new($,function(resolve){
					return resolve(delayed())
				})
			},"doc",doc,"$test",$test,"displayName","$delay")
		}();
		const $all=exports.$all=function(){
			const doc="$ that resolves when the last $ in the input does, with every value in the original iteration order.\nIf any one of them fails, fails with the first such failure.";
			const $test=_ms.set(function*(){
				_ms.unlazy(_33)(_ms.unlazy(_61_63),[1,2],(yield $all([$resolved(1),$resolved(2)])));
				const all_45rejected=$all([$rejected("a"),$rejected("b")]);
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),"a",(yield _ms.unlazy($try)(all_45rejected)).message)
			},"displayName","$test");
			return _ms.set(function(_){
				_ms.checkContains(_ms.sub(_64,$),_,"_");
				return _ms.checkContains(_ms.sub($,Array),$.all(_61_62(Array,_)),"res")
			},"doc",doc,"$test",$test,"displayName","$all")
		}();
		const $map=exports.$map=function(){
			const doc="Asynchronously runs mapper for every element of mapped and returns a $ joining them.\nUnlike map, this always returns an Array.";
			const $test=_ms.set(function*(){
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),[2,3,4],(yield $map([1,2,3],function(_){
					return $delay(function(){
						return _ms.unlazy(_43)(_,1)
					})
				})))
			},"displayName","$test");
			return _ms.set(function(mapped,mapper){
				_ms.checkContains(_64,mapped,"mapped");
				_ms.checkContains(_ms.sub(Fun,Any,$),mapper,"mapper");
				return _ms.checkContains(_ms.sub($,Array),$all(map(mapped,mapper)),"res")
			},"doc",doc,"$test",$test,"displayName","$map")
		}();
		const $flat_45map=exports["$flat-map"]=function(){
			const doc="Like $map but flattens the result.";
			const $test=_ms.set(function*(){
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),[1,1,2,2,3,3],(yield $flat_45map([1,2,3],function(_){
					return $delay(function(){
						return [_,_]
					})
				})))
			},"displayName","$test");
			return _ms.set(function(mapped,mapper){
				_ms.checkContains(_64,mapped,"mapped");
				_ms.checkContains(_ms.sub(Fun,Any,_ms.sub($,_64)),mapper,"mapper");
				return _ms.checkContains(_ms.sub($,_64),$after($map(mapped,mapper),flatten),"res")
			},"doc",doc,"$test",$test,"displayName","$flat-map")
		}();
		const $keep=exports.$keep=function(){
			const doc="Asynchronously runs keep-if? on each element and creates an Array of those that match.\nMaintains the original order.";
			const $test=_ms.set(function*(){
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),[2,4],(yield $keep([1,2,3,4],function(_){
					return $delay(function(){
						return _ms.unlazy(divisible_63)(_,2)
					})
				})))
			},"displayName","$test");
			return _ms.set(function(keep_45some,keep_45if_63){
				_ms.checkContains(_64,keep_45some,"keep-some");
				_ms.checkContains(_ms.sub(Fun,Any,_ms.sub($,Bool)),keep_45if_63,"keep-if?");
				return _ms.checkContains(_ms.sub($,Array),$flat_45map(keep_45some,function(_){
					return $after(keep_45if_63(_),function(keep){
						return _if(keep,_)
					})
				}),"res")
			},"doc",doc,"$test",$test,"displayName","$keep")
		}();
		const $call=exports.$call=function(){
			const doc="Allows you to cal a function on $s as if they were the arguments.\nSo for any place you would write `f x` where `x` is an actualized value,\nyou may write `$call f $x` where `$x` is a promise.";
			const $test=_ms.set(function*(){
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),3,(yield $call(_ms.unlazy(_43),$resolved(1),$resolved(2))))
			},"displayName","$test");
			return _ms.set(function(f){
				const $args=[].slice.call(arguments,1);
				return _ms.checkContains($,$after($all($args),_ms.sub(apply,f)),"res")
			},"doc",doc,"$test",$test,"displayName","$call")
		}();
		const $ing=exports.$ing=function(){
			const doc="Within the generator, you may write:\n\ta <~ $get-a\nThe code after the assignment will become an $after of it.\nNote that $ing returns a $; it does *not* call $done at the end.";
			const $test=_ms.set(function*(){
				_ms.unlazy(_33)(_ms.unlazy(_61_63),"res",(yield $ing(function*(){
					const promised=(yield $resolved("promised"));
					_ms.unlazy(_33)(_ms.unlazy(_61_63),"promised",promised);
					return "res"
				})));
				const $whoops=(yield _ms.unlazy($try)($ing(_ms.set(function*(){
					(yield $rejected("whoops"));
					return _ms.unlazy(oh_45no_33)("It's been rejected, so the rest is never called.")
				},"displayName","$whoops"))));
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),"whoops",$whoops.message)
			},"displayName","$test");
			return _ms.set(function(code){
				_ms.checkContains(_ms.sub(Fun,Generator_33),code,"code");
				const gen=code();
				const do_45next=_ms.set(function(last_45value){
					const _$181=gen.next(last_45value),value=_$181.value,done=_$181.done;
					return function(){
						if(_ms.bool(done)){
							return value
						} else {
							return $after(value,do_45next)
						}
					}()
				},"displayName","do-next");
				return _ms.checkContains($,do_45next(),"res")
			},"doc",doc,"$test",$test,"displayName","$ing")
		}();
		const displayName=exports.displayName="$";
		exports.default=$;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy8kLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztFQXNCQSxrQkFDRztHQUFGLFVBQ0M7a0JBRUQ7O0VBRUQsZUFBVyxJQUFJLEVBQ0csVUFBQTtVQUFqQjtFQUFBO0VBSUQsb0NBQ007R0FBTCxVQUNDO2tCQUlBLFNBQUEsRUFDRztzQkFERDs4QkFDSyxFQUFHLFNBQUEsSUFDRztLQUNaLG1CQUNDLCtCQUNDLDZCQUNBO21DQUdLO0lBQUE7R0FBQTs7RUFFVixpRUFDaUI7R0FBaEIsVUFBTTtHQUNOLG9CQUNTLFdBQUE7SUFBUixtQ0FBaUIsWUFDSyxVQUFBO1lBQXJCO0lBQUE7SUFDRCxRQUFLLHdCQUFNLHFCQUFpQixHQUFHO3VDQUMxQixVQUFXOzhDQUNYLEVBQUUsT0FBSSxxQkFBaUIsR0FBRztHQUFBO2tCQUMvQixTQUFHLEVBQUksVUFDVztzQkFEYjs7NkJBQUosRUFFRCxLQUFJLEVBQUcsU0FBQSxRQUFRLE9BQ007S0FBcEIsT0FBTyxFQUFFO0tBQ1Qsc0JBQ1csVUFBQTthQUFWLE9BQVEsT0FBRyxNQUFPLCtCQUFrQjs7WUFDckMsa0JBQWtCLFFBQVE7SUFBQTs7O0VBRTdCLHNDQUNPO0dBQU4sVUFDQztHQUVELG9CQUNTLFdBQUE7OENBQUgsRUFBRSxPQUFJLE9BQVEsVUFBVSwyQkFBSztHQUFBO2tCQUNsQyxTQUFHLEVBQUksS0FDUTtzQkFEVjtzQkFBTzs2QkFBWCxFQUNELE9BQU87OztFQUVULDRDQUNVO0dBQVQsVUFBTTtHQUNOLG9CQUNTLFdBQUE7OENBQUgsRUFBRSxPQUFJLFVBQVU7R0FBQTtrQkFDckIsU0FBRyxNQUNLOzZCQURQLEVBQ0QsZ0JBQWdCOzs7RUFFbEIsNENBQ1U7R0FBVCxVQUFNO0dBQ04sbUJBQ08sVUFBQTtXQUFOLEtBQ08sV0FBQTtLQUFOLFFBQUksVUFBVzt3Q0FDVCxJQUFHLHdCQUFTO0tBRWxCLFFBQUssd0JBQU0sT0FB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