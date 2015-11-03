"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at","./Function","./methods","./Type/Method","./Type/Pred-Type","./Type/Type"],(exports,_64_0,Function_1,methods_2,Method_3,Pred_45Type_4,Type_5)=>{
	exports._get=_ms.lazy(()=>{
		const _64=_ms.getDefaultExport(_64_0),_$0=_ms.getModule(_64_0),_64flatten=_ms.get(_$0,"@flatten"),_64map=_ms.get(_$0,"@map"),_$1=_ms.getModule(Function_1),Action=_ms.get(_$1,"Action"),_$2=_ms.getModule(methods_2),sub=_ms.get(_$2,"sub"),_$3=_ms.getModule(Method_3),self_45impl_33=_ms.get(_$3,"self-impl!"),_$4=_ms.getModule(Pred_45Type_4),Any=_ms.get(_$4,"Any"),_$5=_ms.getModule(Type_5),_61_62=_ms.get(_$5,"=>");
		const $=exports.default=(()=>{
			return Promise
		})();
		self_45impl_33(sub,$,()=>{
			return $
		});
		const $do=exports.$do=function $do($act){
			_ms.checkContains(_ms.sub(Action,$),$act,"$act");
			return $done($act())
		};
		const $done=exports.$done=function $done(_){
			_ms.checkContains($,_,"_");
			return _.catch(err=>{
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
				_.then(resolve);
				const timeout=function timeout(){
					return reject(new (Error)(`Took longer than ${time_45ms} milliseconds.`))
				};
				return setTimeout(timeout,time_45ms)
			}),"returned value")
		};
		const _45_62$=exports["->$"]=(()=>{
			return $.resolve
		})();
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
			return _ms.checkContains(_ms.sub($,Array),$.all(_64map(mapped,mapper)),"returned value")
		};
		const $flat_45map=exports["$flat-map"]=function $flat_45map(mapped,mapper){
			_ms.checkContains(_64,mapped,"mapped");
			_ms.checkContains(_ms.sub(Function,Any,_ms.sub($,_64)),mapper,"mapper");
			return _ms.async(function* $flat_45map(){
				return _ms.checkContains(_64,_64flatten((yield $map(mapped,mapper))),"returned value")
			})
		};
		const $keep=exports.$keep=function $keep(keep_45some,keep_45if_63){
			_ms.checkContains(_64,keep_45some,"keep-some");
			_ms.checkContains(_ms.sub(Function,Any,_ms.sub($,Boolean)),keep_45if_63,"keep-if?");
			return _ms.async(function* $keep(){
				return _ms.checkContains(Array,(yield* function*(){
					const built=[];
					for(let _ of keep_45some){
						if((yield keep_45if_63(_))){
							_ms.add(built,_)
						}
					};
					return built
				}()),"returned value")
			})
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvJC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVNBLHdCQUNFLEtBQUE7VUFFRDtFQUFBO0VBRUQsZUFBVyxJQUFJLEVBQ0c7VUFBakI7RUFBQTtFQUlELHNCQUFNLGFBQUE7NkJBQUssT0FBTztVQUVqQixNQUFNO0VBQUE7RUFFUCwwQkFBUSxlQUFBO3FCQUFFO1VBS1QsUUFBVTtJQUVULFlBQ0MsaUJBQ0MsZUFDQTtJQUdGLE1BQU07R0FBQTtFQUFBO0VBRVIsdURBQW1CLDhCQUFHLEVBQUk7cUJBQUY7cUJBQVU7NEJBQWQsRUFFbkIsS0FBSSxHQUFHLENBQUEsUUFBUTtJQUNkLE9BQU87SUFDUCxjQUNXO1lBQVYsT0FBTyxLQUFJLE9BQU8sb0JBQWtCOztXQUNyQyxXQUFXLFFBQVE7R0FBQTs7RUFHckIsNkJBQ0ksS0FBQTtVQUNIOztFQUVELDRCQUFTLGdCQUFBO3FCQUFRO1VBTWhCLEtBQUksR0FBRyxDQUFBLFFBQVE7V0FDZCxhQUNlO0tBQ1IsSUFDRjtNQUFGLFFBQVE7S0FBQSxDQUNULE1BQU0sTUFDSztNQUFWLE9BQU87S0FBQTtJQUFBO0dBQUE7RUFBQTtFQUVaLHdCQUFPLGNBQVU7NkJBQUUsSUFBRTtvQ0FBYixFQUFFLE9BR1QsTUFBTyxPQUFHLE1BQU07O0VBR2pCLHdCQUFPLGNBQVUsT0FBUztxQkFBRjs2QkFBUyxTQUFTLElBQUk7b0NBQXRDLEVBQUUsT0FHVCxNQUFPLE9BQUssT0FBTzs7RUFFcEIsdUNBQWEscUJBQUcsT0FBUztxQkFBRjs2QkFBUyxTQUFTLFlBQUksRUFBRTs7NkJBQWpDLElBRWIsV0FBVSxPQUFHLEtBQUssT0FBTzs7O0VBRTFCLDBCQUFTLGVBQU8sWUFBWTtxQkFBRjs2QkFBVyxTQUFTLFlBQUksRUFBRTs7NkJBQTFDLE1BR0o7O2FBQUEsS0FBQSxZQUNTO01BQWIsR0FBRyxPQUFHLGFBQUEsSUFDUztxQkFBWjtNQUFBO0tBQUEiLCJmaWxlIjoiY2FzaC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
