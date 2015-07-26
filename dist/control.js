"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./js","./methods","./Type/Pred-Type","./at/Seq/Seq","./compare"],(exports,js_0,methods_1,Pred_45Type_2,Seq_3,compare_4)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(js_0),defined_63=_ms.get(_$2,"defined?"),_$3=_ms.getModule(methods_1),freeze=_ms.get(_$3,"freeze"),_$4=_ms.getModule(Pred_45Type_2),Any=_ms.get(_$4,"Any"),Opt=_ms.get(_$4,"Opt"),Seq=_ms.lazy(()=>{
			return _ms.getDefaultExport(Seq_3)
		}),_$6=_ms.lazyGetModule(Seq_3),_43_43_62_33=_ms.lazyProp(_$6,"++>!"),_$8=_ms.lazyGetModule(compare_4),_61_63=_ms.lazyProp(_$8,"=?");
		const opr=exports.opr=()=>{
			const built={};
			const doc=built.doc=`Fills in an Opt with a default value.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[void 0,1],1);
				_ms.assoc(built,[1,2],1);
				return built
			};
			return _ms.set(function opr(_,_default){
				_ms.checkContains(Opt,_,"_");
				return ()=>{
					if(_ms.bool(defined_63(_))){
						return _
					} else {
						return _ms.unlazy(_default)
					}
				}()
			},built)
		}();
		const build=exports.build=()=>{
			const built={};
			const doc=built.doc=`Passes in a \`yield\` Function to \`calls-yield\`.\nReturns a Seq of what \`calls-yield\` called \`yield\` with.`;
			const test=built.test=function test(){
				_ms.assert(_ms.unlazy(_61_63),[0,1],build(_yield=>{
					_yield(0);
					return _yield(1)
				}))
			};
			return _ms.set(function build(calls_45yield){
				_ms.checkContains(Function,calls_45yield,"calls-yield");
				const yielded=[];
				const _yield=function _yield(_){
					return _ms.unlazy(_43_43_62_33)(yielded,[_])
				};
				calls_45yield(_yield);
				return _ms.checkContains(_ms.unlazy(Seq),freeze(yielded),"res")
			},built)
		}();
		const unreachable_33=exports["unreachable!"]=()=>{
			const built={};
			const doc=built.doc=`Call this to mark code as unreachable.`;
			return _ms.set(function unreachable_33(){
				throw _ms.error(`This should not be reachable.`)
			},built)
		}();
		const TODO=exports.TODO=()=>{
			const built={};
			const doc=built.doc=`Placeholder for something which you really ought to implement one of these days.`;
			return _ms.set(function TODO(){
				throw _ms.error(`This function has not yet been implemented.`)
			},built)
		}();
		const returning=exports.returning=()=>{
			const built={};
			const doc=built.doc=`Calls \`do-after\` and returns \`returned\`.`;
			const test=built.test=function test(){
				_ms.assert(_ms.unlazy(_61_63),[0],build(_yield=>{
					_ms.assert(_ms.unlazy(_61_63),1,returning(1,()=>{
						_yield(0)
					}))
				}))
			};
			return _ms.set(function returning(returned,do_45after){
				_ms.checkContains(Any,returned,"returned");
				_ms.checkContains(Function,do_45after,"do-after");
				do_45after(returned);
				return returned
			},built)
		}();
		const name=exports.name=`control`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9jb250cm9sLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFTQSwwQkFDSTs7R0FBSCxvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsT0FBVSxHQUFPO29CQUNuQixDQUFFLEVBQUUsR0FBTzs7O2tCQUNYLGFBQUEsRUFBTSxTQUNRO3NCQURaOztLQUVELFlBQUEsV0FBUSxJQUNDO2FBQVI7S0FBQSxPQUVHOzs7Ozs7RUFFUCw4QkFDTTs7R0FBTCxvQkFDQztHQUVELHNCQUNRLGVBQUE7a0NBQUksQ0FBRSxFQUFFLEdBQUssTUFBTyxRQUNLO0tBQS9CLE9BQU07WUFDTixPQUFNO0lBQUE7R0FBQTtrQkFDUCxlQUFLLGNBQ29CO3NCQURSO0lBQ2pCLGNBQVU7SUFDVixhQUFTLGdCQUFBLEVBQ0M7cUNBQUosUUFBUSxDQUFFO0lBQUE7SUFDaEIsY0FBWTs2Q0FDWixPQUFPOzs7RUFFVCxpREFDYTs7R0FBWixvQkFBTTtrQkFFSix5QkFBQTtJQUFELGdCQUFROzs7RUFFViw0QkFDSzs7R0FBSixvQkFBTTtrQkFFSixlQUFBO0lBQUQsZ0JBQVE7OztFQUVWLHNDQUNVOztHQUFULG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtrQ0FBSSxDQUFFLEdBQUssTUFBUSxRQUNLO21DQUFuQixFQUFHLFVBQVUsRUFDSSxJQUFBO01BQTNCLE9BQU07S0FBQTtJQUFBO0dBQUE7a0JBQ1IsbUJBQUEsU0FBYSxXQUNpQjtzQkFEckI7c0JBQWE7SUFDdEIsV0FBUztXQUNUO0dBQUE7O0VBdERGLHdCQUFBIiwiZmlsZSI6ImNvbnRyb2wuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==