"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at","./Function","./methods","./Type/Method","./Type/Pred-Type","./Type/Type"],(exports,_64_0,Function_1,methods_2,Method_3,Pred_45Type_4,Type_5)=>{
	exports._get=_ms.lazy(()=>{
		let _64=_ms.getDefaultExport(_64_0),_$0=_ms.getModule(_64_0),_64flatten=_ms.get(_$0,"@flatten"),_64map=_ms.get(_$0,"@map"),_$1=_ms.getModule(Function_1),Action=_ms.get(_$1,"Action"),_$2=_ms.getModule(methods_2),sub=_ms.get(_$2,"sub"),_$3=_ms.getModule(Method_3),self_45impl_33=_ms.get(_$3,"self-impl!"),_$4=_ms.getModule(Pred_45Type_4),Any=_ms.get(_$4,"Any"),_$5=_ms.getModule(Type_5),_61_62=_ms.get(_$5,"=>");
		let $=exports.default=(()=>{
			return Promise
		})();
		self_45impl_33(sub,$,()=>{
			return $
		});
		let $do=exports.$do=function $do($act){
			_ms.checkContains(_ms.sub(Action,$),$act,"$act");
			return $done($act())
		};
		let $done=exports.$done=function $done(_){
			_ms.checkContains($,_,"_");
			return _.catch(err=>{
				console.log(`=== error ===
${err.message}
${err.stack}
=== error ===`);
				throw err
			})
		};
		let $fail_45after_45time=exports["$fail-after-time"]=function $fail_45after_45time(_,time_45ms){
			_ms.checkContains($,_,"_");
			_ms.checkContains(Number,time_45ms,"time-ms");
			return _ms.checkContains($,new ($)((resolve,reject)=>{
				_.then(resolve);
				let timeout=function timeout(){
					reject(new (Error)(`Took longer than ${time_45ms} milliseconds.`))
				};
				setTimeout(timeout,time_45ms)
			}),"returned value")
		};
		let _45_62$=exports["->$"]=(()=>{
			return $.resolve
		})();
		let $delay=exports.$delay=function $delay(delayed){
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
		let $all=exports.$all=function $all(_){
			_ms.checkContains(_ms.sub(_64,$),_,"_");
			return _ms.checkContains(_ms.sub($,Array),$.all(_61_62(Array,_)),"returned value")
		};
		let $map=exports.$map=function $map(mapped,mapper){
			_ms.checkContains(_64,mapped,"mapped");
			_ms.checkContains(_ms.sub(Function,Any,$),mapper,"mapper");
			return _ms.checkContains(_ms.sub($,Array),$.all(_64map(mapped,mapper)),"returned value")
		};
		let $flat_45map=exports["$flat-map"]=function $flat_45map(mapped,mapper){
			_ms.checkContains(_64,mapped,"mapped");
			_ms.checkContains(_ms.sub(Function,Any,_ms.sub($,_64)),mapper,"mapper");
			return _ms.async(function*(){
				return _ms.checkContains(_64,_64flatten((yield $map(mapped,mapper))),"returned value")
			})
		};
		let $keep=exports.$keep=function $keep(keep_45some,keep_45if_63){
			_ms.checkContains(_64,keep_45some,"keep-some");
			_ms.checkContains(_ms.sub(Function,Any,_ms.sub($,Boolean)),keep_45if_63,"keep-if?");
			return _ms.async(function*(){
				return _ms.checkContains(Array,(yield* function*(){
					let built=[];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvJC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVNBLHNCQUNFLEtBQUE7VUFFRDtFQUFBO0VBRUQsZUFBVyxJQUFJLEVBQ0c7VUFBakI7RUFBQTtFQUlELG9CQUFNLGFBQUE7NkJBQUssT0FBTztVQUVqQixNQUFNO0VBQUE7RUFFUCx3QkFBUSxlQUFBO3FCQUFFO1VBS1QsUUFBVTtJQUVULFlBQ0MsaUJBQ0MsZUFDQTtJQUdGLE1BQU07R0FBQTtFQUFBO0VBRVIscURBQW1CLDhCQUFHLEVBQUk7cUJBQUY7cUJBQVU7NEJBQWQsRUFFbkIsS0FBSSxHQUFJLENBQUEsUUFBUTtJQUNmLE9BQU87SUFDUCxZQUNZO0tBQVgsT0FBTyxLQUFJLE9BQU8sb0JBQWtCOztJQUNyQyxXQUFXLFFBQVE7R0FBQTs7RUFHckIsMkJBQ0ksS0FBQTtVQUNIOztFQUVELDBCQUFTLGdCQUFBO3FCQUFRO1VBTWhCLEtBQUksR0FBRyxDQUFBLFFBQVE7V0FDZCxhQUNlO0tBQ1IsSUFDRjtNQUFGLFFBQVE7S0FBQSxhQUNUO01BQ0MsT0FBTztLQUFBO0lBQUE7R0FBQTtFQUFBO0VBRVosc0JBQU8sY0FBVTs2QkFBRSxJQUFFO29DQUFiLEVBQUUsT0FHVCxNQUFPLE9BQUcsTUFBTTs7RUFHakIsc0JBQU8sY0FBVSxPQUFTO3FCQUFGOzZCQUFTLFNBQVMsSUFBSTtvQ0FBdEMsRUFBRSxPQUdULE1BQU8sT0FBSyxPQUFPOztFQUVwQixxQ0FBYSxxQkFBRyxPQUFTO3FCQUFGOzZCQUFTLFNBQVMsWUFBSSxFQUFFOzs2QkFBakMsSUFFYixXQUFVLE9BQUcsS0FBSyxPQUFPOzs7RUFFMUIsd0JBQVMsZUFBTyxZQUFZO3FCQUFGOzZCQUFXLFNBQVMsWUFBSSxFQUFFOzs2QkFBMUMsTUFHSjs7YUFBQSxLQUFBLFlBQ1M7TUFBVixHQUFDLE9BQUcsYUFBQSxJQUNVO3FCQUFkO01BQUE7S0FBQSIsImZpbGUiOiJjYXNoLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
