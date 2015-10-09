"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at","./Function","./Generator","./methods","./Type/Method","./Type/Pred-Type","./Type/Type","./io/time","./Try"],(exports,_64_0,Function_1,Generator_2,methods_3,Method_4,Pred_45Type_5,Type_6,time_7,Try_8)=>{
	exports._get=_ms.lazy(()=>{
		const _64=_ms.getDefaultExport(_64_0),_$1=_ms.getModule(_64_0),_64flatten=_ms.get(_$1,"@flatten"),_$2=_ms.getModule(Function_1),Action=_ms.get(_$2,"Action"),Generator=_ms.getDefaultExport(Generator_2),_$3=_ms.getModule(methods_3),sub=_ms.get(_$3,"sub"),_$4=_ms.getModule(Method_4),self_45impl_33=_ms.get(_$4,"self-impl!"),_$5=_ms.getModule(Pred_45Type_5),Any=_ms.get(_$5,"Any"),_$6=_ms.getModule(Type_6),_61_62=_ms.get(_$6,"=>"),_$7=_ms.lazyGetModule(time_7),$after_45time=_ms.lazyProp(_$7,"$after-time"),_$8=_ms.lazyGetModule(Try_8),$catch=_ms.lazyProp(_$8,"$catch");
		const $=exports.default=(()=>{
			return Promise
		})();
		self_45impl_33(sub,$,()=>{
			return $
		});
		const $done=exports.$done=(()=>{
			return _=>{
				_ms.checkContains($,_,"_");
				return _ms.unlazy($catch)(_,err=>{
					console.log(`=== error ===
${err.message}
${err.stack}
=== error ===`);
					throw err
				})
			}
		})();
		const $fail_45after_45time=exports["$fail-after-time"]=function $fail_45after_45time(_,time_45ms){
			_ms.checkContains($,_,"_");
			_ms.checkContains(Number,time_45ms,"time-ms");
			return _ms.checkContains($,new ($)((resolve,reject)=>{
				$after(_,resolve);
				const timeout=function timeout(){
					return reject(new (Error)(`Took longer than ${time_45ms} milliseconds.`))
				};
				return setTimeout(timeout,time_45ms)
			}),"res")
		};
		const $after=exports.$after=function $after(_,then){
			_ms.checkContains($,_,"_");
			_ms.checkContains(Function,then,"then");
			return _ms.checkContains($,_.then(then),"res")
		};
		const $resolved=exports.$resolved=function $resolved(value){
			return _ms.checkContains($,$.resolve(value),"res")
		};
		const _45_62$=exports["->$"]=$resolved;
		const $rejected=exports.$rejected=function $rejected(_){
			return $.reject(_)
		};
		const $delay=exports.$delay=function $delay(delayed){
			_ms.checkContains(Action,delayed,"delayed");
			return _ms.unlazy($after_45time)(0,delayed)
		};
		const $all=exports.$all=function $all(_){
			_ms.checkContains(_ms.sub(_64,$),_,"_");
			return _ms.checkContains(_ms.sub($,Array),$.all(_61_62(Array,_)),"res")
		};
		const $map=exports.$map=function $map(mapped,mapper){
			_ms.checkContains(_64,mapped,"mapped");
			_ms.checkContains(_ms.sub(Function,Any,$),mapper,"mapper");
			return _ms.checkContains(_ms.sub($,Array),$.all((()=>{
				const built=[];
				for(let _ of mapped){
					_ms.add(built,mapper(_))
				};
				return built
			})()),"res")
		};
		const $flat_45map=exports["$flat-map"]=function $flat_45map(mapped,mapper){
			_ms.checkContains(_64,mapped,"mapped");
			_ms.checkContains(_ms.sub(Function,Any,_ms.sub($,_64)),mapper,"mapper");
			return _ms.checkContains(_ms.sub($,_64),$after($map(mapped,mapper),_64flatten),"res")
		};
		const $keep=exports.$keep=function $keep(keep_45some,keep_45if_63){
			_ms.checkContains(_64,keep_45some,"keep-some");
			_ms.checkContains(_ms.sub(Function,Any,_ms.sub($,Boolean)),keep_45if_63,"keep-if?");
			return _ms.checkContains(_ms.sub($,Array),$flat_45map(keep_45some,_=>{
				return $after(keep_45if_63(_),keep=>{
					return (keep?_ms.some((()=>{
						return _
					})()):_ms.None)
				})
			}),"res")
		};
		const $ing=exports.$ing=function $ing(code){
			_ms.checkContains(_ms.sub(Function,Generator),code,"code");
			const $_45generator=code();
			const do_45next=function do_45next(last_45value){
				const _$0=$_45generator.next(last_45value),value=_$0.value,done=_$0.done;
				return (done?value:$after(value,do_45next))
			};
			return _ms.checkContains($,do_45next(),"res")
		};
		const name=exports.name=`$`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvJC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQWFBLHdCQUNFLEtBQUE7VUFFRDtFQUFBO0VBRUQsZUFBVyxJQUFJLEVBQ0csSUFBQTtVQUFqQjtFQUFBO0VBSUQsMEJBQ00sS0FBQTtVQUlKLEdBQ0c7c0JBREQ7OEJBQ0ssRUFBSSxLQUNHO0tBQ2IsWUFDQyxpQkFDQyxlQUNBO0tBR0YsTUFBTztJQUFBO0dBQUE7RUFBQTtFQUVWLHVEQUFtQiw4QkFBRyxFQUFJLFVBQ2M7cUJBRGhCO3FCQUFVOzRCQUFkLEVBRW5CLEtBQUksR0FBRyxDQUFBLFFBQVEsU0FDTTtJQUFwQixPQUFPLEVBQUU7SUFDVCxjQUNXLGtCQUFBO1lBQVYsT0FBTyxLQUFJLE9BQU8sb0JBQWtCOztXQUNyQyxXQUFXLFFBQVE7R0FBQTs7RUFFckIsNEJBQVMsZ0JBQUcsRUFBSSxLQUNhO3FCQURmO3FCQStDQzs0QkEvQ0wsRUFHVCxPQUFPOztFQUVSLGtDQUFZLG1CQUFHLE1BQ0s7NEJBRFAsRUFFWixVQUFVOztFQUdYLDZCQUFLO0VBRUwsa0NBQVksbUJBQUEsRUFDQztVQUNaLFNBQVM7RUFBQTtFQUVWLDRCQUFTLGdCQUFBLFFBQ2M7cUJBRE47b0NBTUosRUFBRTtFQUFBO0VBRWYsd0JBQU8sY0FBVSxFQUNNOzZCQURKLElBQUU7b0NBQWIsRUFlRyxPQVpWLE1BQU8sT0FZRyxNQVpNOztFQUVqQix3QkFBTyxjQUFVLE9BQVMsT0FDc0I7cUJBRHhCOzZCQWtCVCxTQWxCMkIsSUFBSTtvQ0FBdEMsRUFVRyxPQVBWLE1BQVc7O1lBQUEsS0FBQSxPQUNNO21CQUFoQixPQUFBO0lBQUE7Ozs7RUFFRix1Q0FBWSxxQkFBTSxPQUFTLE9BQ3lCO3FCQUQzQjs2QkFZVixTQVo0QixZQUFJLEVBQUU7b0NBQXBDLEVBQUUsS0FFZCxPQUFRLEtBQUssT0FBTyxRQUFROztFQUU3QiwwQkFBUSxlQUFVLFlBQVksYUFDaUM7cUJBRG5DOzZCQVFiLFNBUmlDLFlBQUksRUFBRTtvQ0FBN0MsRUFBRSxPQUdWLFlBQVUsWUFBVyxHQUNDO1dBQXJCLE9BQU8sYUFBQSxHQUFXLE1BQ0k7WUFBckIsQ0FBRyxtQkFDSTthQUFOO0tBQUE7Ozs7RUFFSix3QkFBTyxjQUFHLEtBQ3dCOzZCQURuQixTQUFTO0dBS3ZCLG9CQUFjO0dBQ2QsZ0JBQVcsbUJBQUEsYUFDVTtJQUFwQixVQUFhLG1CQUFpQjtXQUN6QixDQUFBLEtBQUssTUFBTyxPQUFPLE1BQU07R0FBQTs0QkFSeEIsRUFTUDs7RUF2R0Qsd0JBQUEiLCJmaWxlIjoiY2FzaC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
