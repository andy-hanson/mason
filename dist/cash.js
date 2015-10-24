"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at","./Function","./methods","./Type/Method","./Type/Pred-Type","./Type/Type"],(exports,_64_0,Function_1,methods_2,Method_3,Pred_45Type_4,Type_5)=>{
	exports._get=_ms.lazy(()=>{
		const _64=_ms.getDefaultExport(_64_0),_$0=_ms.getModule(_64_0),_64flatten=_ms.get(_$0,"@flatten"),_$1=_ms.getModule(Function_1),Action=_ms.get(_$1,"Action"),_$2=_ms.getModule(methods_2),sub=_ms.get(_$2,"sub"),_$3=_ms.getModule(Method_3),self_45impl_33=_ms.get(_$3,"self-impl!"),_$4=_ms.getModule(Pred_45Type_4),Any=_ms.get(_$4,"Any"),_$5=_ms.getModule(Type_5),_61_62=_ms.get(_$5,"=>");
		const $=exports.default=(()=>{
			return Promise
		})();
		self_45impl_33(sub,$,()=>{
			return $
		});
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
			return _ms.checkContains(_ms.sub($,Array),$.all((()=>{
				const built=[];
				for(let _ of mapped){
					_ms.add(built,mapper(_))
				};
				return built
			})()),"returned value")
		};
		const $flat_45map=exports["$flat-map"]=function $flat_45map(mapped,mapper){
			return _ms.async(function* $flat_45map(){
				_ms.checkContains(_64,mapped,"mapped");
				_ms.checkContains(_ms.sub(Function,Any,_ms.sub($,_64)),mapper,"mapper");
				return _ms.checkContains(_64,_64flatten((yield $map(mapped,mapper))),"returned value")
			})
		};
		const $keep=exports.$keep=function $keep(keep_45some,keep_45if_63){
			return _ms.async(function* $keep(){
				_ms.checkContains(_64,keep_45some,"keep-some");
				_ms.checkContains(_ms.sub(Function,Any,_ms.sub($,Boolean)),keep_45if_63,"keep-if?");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvJC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVNBLHdCQUNFLEtBQUE7VUFFRDtFQUFBO0VBRUQsZUFBVyxJQUFJLEVBQ0c7VUFBakI7RUFBQTtFQUlELDBCQUFRLGVBQUE7cUJBQUU7VUFLVCxRQUFVO0lBRVQsWUFDQyxpQkFDQyxlQUNBO0lBR0YsTUFBTztHQUFBO0VBQUE7RUFFVCx1REFBbUIsOEJBQUcsRUFBSTtxQkFBRjtxQkFBVTs0QkFBZCxFQUVuQixLQUFJLEdBQUcsQ0FBQSxRQUFRO0lBQ2QsT0FBTztJQUNQLGNBQ1c7WUFBVixPQUFPLEtBQUksT0FBTyxvQkFBa0I7O1dBQ3JDLFdBQVcsUUFBUTtHQUFBOztFQUdyQiw2QkFDSSxLQUFBO1VBQ0g7O0VBRUQsNEJBQVMsZ0JBQUE7cUJBQVE7VUFNaEIsS0FBSSxHQUFHLENBQUEsUUFBUTtXQUNkLGFBQ2U7S0FDUCxJQUNGO01BQUgsUUFBUTtLQUFBLENBQ1QsTUFBTyxNQUNLO01BQVgsT0FBTztLQUFBO0lBQUE7R0FBQTtFQUFBO0VBRVosd0JBQU8sY0FBVTs2QkFBRSxJQUFFO29DQUFiLEVBQUUsT0FHVCxNQUFPLE9BQUcsTUFBTTs7RUFFakIsd0JBQU8sY0FBVSxPQUFTO3FCQUFGOzZCQUFTLFNBQVMsSUFBSTtvQ0FBdEMsRUFBRSxPQUdULE1BQVc7O1lBQUEsS0FBQSxPQUNNO21CQUFoQixPQUFBO0lBQUE7Ozs7RUFFRix1Q0FBYSxxQkFBRyxPQUFTOztzQkFBRjs4QkFBUyxTQUFTLFlBQUksRUFBRTs2QkFBakMsSUFFYixXQUFVLE9BQUcsS0FBSyxPQUFPOzs7RUFFMUIsMEJBQVMsZUFBTyxZQUFZOztzQkFBRjs4QkFBVyxTQUFTLFlBQUksRUFBRTs2QkFBMUMsTUFHSjs7YUFBQSxLQUFBLFlBQ1M7TUFBYixHQUFJLE9BQUcsYUFBQSxJQUNTO3FCQUFiO01BQUE7S0FBQSIsImZpbGUiOiJjYXNoLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
