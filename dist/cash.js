"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at","./Function","./Generator","./methods","./Type/Method","./Type/Pred-Type","./Type/Type","./Try"],(exports,_64_0,Function_1,Generator_2,methods_3,Method_4,Pred_45Type_5,Type_6,Try_7)=>{
	exports._get=_ms.lazy(()=>{
		const _64=_ms.getDefaultExport(_64_0),_$1=_ms.getModule(_64_0),_64flatten=_ms.get(_$1,"@flatten"),_$2=_ms.getModule(Function_1),Action=_ms.get(_$2,"Action"),Generator=_ms.getDefaultExport(Generator_2),_$3=_ms.getModule(methods_3),sub=_ms.get(_$3,"sub"),_$4=_ms.getModule(Method_4),self_45impl_33=_ms.get(_$4,"self-impl!"),_$5=_ms.getModule(Pred_45Type_5),Any=_ms.get(_$5,"Any"),_$6=_ms.getModule(Type_6),_61_62=_ms.get(_$6,"=>"),_$7=_ms.lazyGetModule(Try_7),$catch=_ms.lazyProp(_$7,"$catch");
		const $=exports.default=(()=>{
			return Promise
		})();
		self_45impl_33(sub,$,()=>{
			return $
		});
		const $done=exports.$done=function $done(_){
			_ms.checkContains($,_,"_");
			return _ms.unlazy($catch)(_,err=>{
				console.log(`=== error ===
${err.message}
${err.stack}
=== error ===`);
				throw err
			})
		};
		const $fail_45after_45time=exports["$fail-after-time"]=function $fail_45after_45time(_,time_45ms){
			_ms.checkContains($,_,"_");
			_ms.checkContains(Number,time_45ms,"time-ms");
			return _ms.checkContains($,new ($)((resolve,reject)=>{
				$after(_,resolve);
				const timeout=function timeout(){
					return reject(new (Error)(`Took longer than ${time_45ms} milliseconds.`))
				};
				return setTimeout(timeout,time_45ms)
			}),"returned value")
		};
		const $after=exports.$after=function $after(_,then){
			_ms.checkContains($,_,"_");
			_ms.checkContains(Function,then,"then");
			return _ms.checkContains($,_.then(then),"returned value")
		};
		const $resolved=exports.$resolved=function $resolved(value){
			return _ms.checkContains($,$.resolve(value),"returned value")
		};
		const _45_62$=exports["->$"]=$resolved;
		const $rejected=exports.$rejected=function $rejected(_){
			return $.reject(_)
		};
		const $delay=exports.$delay=function $delay(delayed){
			_ms.checkContains(Action,delayed,"delayed");
			return new ($)((resolve,reject)=>{
				return setImmediate(()=>{
					try {
						resolve(delayed())
					}catch(error){
						reject(error)
					}
				})
			})
		};
		const $all=exports.$all=function $all(_){
			_ms.checkContains(_ms.sub(_64,$),_,"_");
			return _ms.checkContains(_ms.sub($,Array),$.all(_61_62(Array,_)),"returned value")
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
			})()),"returned value")
		};
		const $flat_45map=exports["$flat-map"]=function $flat_45map(mapped,mapper){
			_ms.checkContains(_64,mapped,"mapped");
			_ms.checkContains(_ms.sub(Function,Any,_ms.sub($,_64)),mapper,"mapper");
			return _ms.checkContains(_ms.sub($,_64),$after($map(mapped,mapper),_64flatten),"returned value")
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
			}),"returned value")
		};
		const $ing=exports.$ing=function $ing(code){
			_ms.checkContains(_ms.sub(Function,Generator),code,"code");
			const $_45generator=code();
			const do_45next=function do_45next(last_45value){
				const _$0=$_45generator.next(last_45value),value=_$0.value,done=_$0.done;
				return (done?value:$after(value,do_45next))
			};
			return _ms.checkContains($,do_45next(),"returned value")
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvJC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVlBLHdCQUNFLEtBQUE7VUFFRDtFQUFBO0VBRUQsZUFBVyxJQUFJLEVBQ0c7VUFBakI7RUFBQTtFQUlELDBCQUFRLGVBQUE7cUJBQUU7NkJBS0YsRUFBSTtJQUVWLFlBQ0MsaUJBQ0MsZUFDQTtJQUdGLE1BQU87R0FBQTtFQUFBO0VBRVQsdURBQW1CLDhCQUFHLEVBQUk7cUJBQUY7cUJBQVU7NEJBQWQsRUFFbkIsS0FBSSxHQUFHLENBQUEsUUFBUTtJQUNkLE9BQU8sRUFBRTtJQUNULGNBQ1c7WUFBVixPQUFPLEtBQUksT0FBTyxvQkFBa0I7O1dBQ3JDLFdBQVcsUUFBUTtHQUFBOztFQUVyQiw0QkFBUyxnQkFBRyxFQUFJO3FCQUFGO3FCQUFPOzRCQUFYLEVBR1QsT0FBTzs7RUFFUixrQ0FBWSxtQkFBRzs0QkFBRixFQUVaLFVBQVU7O0VBR1gsNkJBQUs7RUFFTCxrQ0FBWSxtQkFBQTtVQUVYLFNBQVM7RUFBQTtFQUVWLDRCQUFTLGdCQUFBO3FCQUFRO1VBTWhCLEtBQUksR0FBRyxDQUFBLFFBQVE7V0FDZCxhQUNlO0tBQ1AsSUFDRjtNQUFILFFBQVE7S0FBQSxDQUNULE1BQU8sTUFDSztNQUFYLE9BQU87S0FBQTtJQUFBO0dBQUE7RUFBQTtFQUVaLHdCQUFPLGNBQVU7NkJBQUUsSUFBRTtvQ0FBYixFQUFFLE9BR1QsTUFBTyxPQUFHLE1BQU07O0VBRWpCLHdCQUFPLGNBQVUsT0FBUztxQkFBRjs2QkFBUyxTQUFTLElBQUk7b0NBQXRDLEVBQUUsT0FHVCxNQUFXOztZQUFBLEtBQUEsT0FDTTttQkFBaEIsT0FBQTtJQUFBOzs7O0VBRUYsdUNBQVkscUJBQU0sT0FBUztxQkFBRjs2QkFBUyxTQUFTLFlBQUksRUFBRTtvQ0FBcEMsRUFBRSxLQUVkLE9BQVEsS0FBSyxPQUFPLFFBQVE7O0VBRTdCLDBCQUFRLGVBQVUsWUFBWTtxQkFBRjs2QkFBVyxTQUFTLFlBQUksRUFBRTtvQ0FBN0MsRUFBRSxPQUdWLFlBQVUsWUFBVztXQUNwQixPQUFPLGFBQUEsR0FBVztZQUNqQixDQUFHLG1CQUNJO2FBQU47S0FBQTs7OztFQUVKLHdCQUFPLGNBQUc7NkJBQUssU0FBUztHQUt2QixvQkFBYztHQUNkLGdCQUFXLG1CQUFBO0lBQ1YsVUFBYSxtQkFBaUI7V0FDekIsQ0FBQSxLQUFLLE1BQU8sT0FBTyxNQUFNO0dBQUE7NEJBUnhCLEVBU1AiLCJmaWxlIjoiY2FzaC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
