"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./js","./methods","./Type/Pred-Type","./at/Seq/Seq"],(exports,js_0,methods_1,Pred_45Type_2,Seq_3)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(js_0),defined_63=_ms.get(_$0,"defined?"),js_45=_ms.get(_$0,"js-"),js_60_61=_ms.get(_$0,"js<="),_$1=_ms.getModule(methods_1),freeze=_ms.get(_$1,"freeze"),_$2=_ms.getModule(Pred_45Type_2),Opt=_ms.get(_$2,"Opt"),Seq=_ms.lazy(()=>_ms.getDefaultExport(Seq_3)),_$3=_ms.lazyGetModule(Seq_3),_43_43_62_33=_ms.lazyProp(_$3,"++>!");
		const do_45times_33=exports["do-times!"]=function do_45times_33(n_45times,action){
			_ms.assert(js_60_61,0,n_45times);
			let n=n_45times;
			for(;;){
				if(! n){
					break
				};
				action();
				n=js_45(n,1)
			}
		};
		const opr=exports.opr=function opr(_,_default){
			_ms.checkContains(Opt,_,"_");
			return (defined_63(_)?_:_ms.unlazy(_default))
		};
		const build=exports.build=function build(calls_45yield){
			_ms.checkContains(Function,calls_45yield,"calls-yield");
			const yielded=[];
			const _yield=function _yield(_){
				return _ms.unlazy(_43_43_62_33)(yielded,[_])
			};
			calls_45yield(_yield);
			return _ms.checkContains(_ms.unlazy(Seq),freeze(yielded),"res")
		};
		const unreachable_33=exports["unreachable!"]=function unreachable_33(){
			throw new (Error)(`This should not be reachable.`)
		};
		const TODO=exports.TODO=function TODO(){
			throw new (Error)(`This function has not yet been implemented.`)
		};
		const name=exports.name=`control`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvY29udHJvbC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQU9BLHlDQUFhLHVCQUFBLFVBQVEsT0FDTTtjQUNsQixTQUFLLEVBQUU7R0FDZixNQUFNO0dBRUYsT0FBQTtJQUFILEtBQVEsRUFDQztLQUFSO0lBQUE7SUFDRDtNQUNLLE1BQUksRUFBRTtHQUFBO0VBQUE7RUFFYixzQkFBTSxhQUFBLEVBQU0sU0FDUTtxQkFEWjtVQUVGLENBQUEsV0FBQSxHQUFVOztFQUVoQiwwQkFBUSxlQUFLLGNBQ29CO3FCQURSO0dBR3hCLGNBQVU7R0FDVixhQUFTLGdCQUFBLEVBQ0M7b0NBQUosUUFBUSxDQUFDO0dBQUE7R0FDZixjQUFZOzRDQUNaLE9BQU87O0VBR1IsNkNBQ2dCLHlCQUFBO0dBQ2Ysa0JBQVE7O0VBR1Qsd0JBQ1EsZUFBQTtHQUNQLGtCQUFROztFQXRDVCx3QkFBQSIsImZpbGUiOiJjb250cm9sLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
