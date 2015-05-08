"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../js","../../Objbang","../../Type/Kind","../../Type/Tuple","../at","../at-Type","./Seq"],function(exports,js_0,Obj_33_1,Kind_2,Tuple_3,_64_4,_64_45Type_5,Seq_6){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(js_0),id_61_63=_ms.get(_$2,"id=?"),_$3=_ms.getModule(Obj_33_1),p_33=_ms.get(_$3,"p!"),_$4=_ms.getModule(Kind_2),kind_33=_ms.get(_$4,"kind!"),self_45kind_33=_ms.get(_$4,"self-kind!"),Tuple=_ms.getDefaultExport(Tuple_3),_64=_ms.getDefaultExport(_64_4),_$6=_ms.getModule(_64_4),_43_43=_ms.get(_$6,"++"),empty_63=_ms.get(_$6,"empty?"),iterator=_ms.get(_$6,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_5),_$7=_ms.getModule(_64_45Type_5),empty=_ms.get(_$7,"empty"),from_45stream=_ms.get(_$7,"from-stream"),Seq=_ms.getDefaultExport(Seq_6),_$8=_ms.getModule(Seq_6),_60_43_43_39=_ms.get(_$8,"<++'"),tail=_ms.get(_$8,"tail");
		const exports={};
		const LList=Tuple(function(){
			const doc="Singly-linked list.";
			const props=["head","tail"];
			return {
				doc:doc,
				props:props,
				displayName:"LList"
			}
		}());
		const empty_45LList=LList(undefined,undefined);
		p_33(empty_45LList,"tail",empty_45LList);
		self_45kind_33(LList,_64_45Type,function(){
			const _k0=empty,_v0=function(){
				return empty_45LList
			};
			const _k1=from_45stream,_v1=function(_){
				return _60_43_43_39(empty_45LList,_)
			};
			return _ms.map(_k0,_v0,_k1,_v1)
		}());
		kind_33(LList,Seq,function(){
			const _k0=empty_63,_v0=function(_){
				return id_61_63(_,empty_45LList)
			};
			const _k1=iterator,_v1=function*(_){
				if(_ms.bool(empty_63(_))){
					null
				} else {
					(yield _.head);
					(yield* iterator(_.tail))
				}
			};
			const _k2=tail,_v2=function(_){
				return _.tail
			};
			const _k3=_60_43_43_39,_v3=function(_,left_45added){
				_ms.checkContains(_64,left_45added,"left-added");
				const iter=iterator(left_45added);
				const f=function(){
					const _$41=iter.next(),value=_$41.value,done=_$41.done;
					return function(){
						if(_ms.bool(done)){
							return _
						} else {
							return LList(value,f())
						}
					}()
				};
				return f()
			};
			const _k4=_43_43,_v4=function(a,b){
				return function(){
					const _=b;
					if(_ms.bool(_ms.contains(LList,_))){
						return _60_43_43_39(b,a)
					} else {
						return _43_43.default(a,b)
					}
				}()
			};
			return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3,_k4,_v4)
		}());
		exports.default=LList;
		const displayName=exports.displayName="LList";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9MTGlzdC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7aUNBU0E7OztFQUFBLFlBQVEsZ0JBQUs7R0FDWixVQUNDO0dBQ0QsWUFBTyxDQUFHLE9BQU87VUFITDs7Ozs7O0VBS2Isb0JBQWMsTUFBQSxVQUFBO0VBQ2QsS0FBQSxjQUFnQixPQUFoQjtFQUVBLGVBQUEsTUFBQSxxQkFBdUI7R0FDdEIsVUFBQSxVQUFVLFVBQ1Q7V0FBQTtHQUFBO0dBQ0QsVUFBQSxrQkFBZ0IsU0FBQSxFQUNmO1dBQUEsYUFBQSxjQUFpQjtHQUFBOzs7RUFFbkIsUUFBQSxNQUFBLGNBQWU7R0FDZCxVQUFBLGFBQVcsU0FBQSxFQUNWO1dBQUEsU0FBSyxFQUFMO0dBQUE7R0FFRCxVQUFBLGFBQWMsVUFBQSxFQUFBO0lBQUssWUFDbEIsU0FBQSxJQUNDO0tBQUE7SUFBQSxPQUVBO0tBQUksT0FBRDtLQUNDLFFBQUEsU0FBUzs7O0dBRWYsVUFBQSxTQUFTLFNBQUEsRUFDUjtXQUFBOztHQUVELFVBQUEsaUJBQVMsU0FBQSxFQUFFLGFBQ1Y7c0JBRHFCO0lBQ3JCLFdBQU8sU0FBQTtJQUNQLFFBQUssVUFDSjtLQUFBLFdBQWE7O01BRVosWUFBQSxNQUNDO2NBQUE7TUFBQSxPQUVBO2NBQUEsTUFBQSxNQUFZO01BQUE7S0FBQTtJQUFBO1dBQ2Y7R0FBQTtHQUdELFVBQUEsV0FBTyxTQUFBLEVBQUUsRUFDUjs7S0FBSyxRQUFBO0tBQ0oseUJBQUMsTUFBRCxJQUNDO2FBQUEsYUFBQSxFQUFBO0tBQUEsT0FFQTthQUFBLGVBQUEsRUFBQTtLQUFBO0lBQUE7R0FBQTs7O2tCQUVKO0VBeERBLHNDQUFBIiwiZmlsZSI6ImF0L1NlcS9MTGlzdC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9