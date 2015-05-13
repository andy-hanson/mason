"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../js","../../Objbang","../../Type/Kind","../../Type/Tuple","../at","../at-Type","./Seq"],function(exports,js_0,Obj_33_1,Kind_2,Tuple_3,_64_4,_64_45Type_5,Seq_6){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(js_0),id_61_63=_ms.get(_$2,"id=?"),_$3=_ms.getModule(Obj_33_1),p_33=_ms.get(_$3,"p!"),_$4=_ms.getModule(Kind_2),kind_33=_ms.get(_$4,"kind!"),self_45kind_33=_ms.get(_$4,"self-kind!"),Tuple=_ms.getDefaultExport(Tuple_3),_64=_ms.getDefaultExport(_64_4),_$6=_ms.getModule(_64_4),_43_43=_ms.get(_$6,"++"),empty_63=_ms.get(_$6,"empty?"),iterator=_ms.get(_$6,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_5),_$7=_ms.getModule(_64_45Type_5),empty=_ms.get(_$7,"empty"),from_45stream=_ms.get(_$7,"from-stream"),Seq=_ms.getDefaultExport(Seq_6),_$8=_ms.getModule(Seq_6),_60_43_43_39=_ms.get(_$8,"<++'"),tail=_ms.get(_$8,"tail");
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
					return _ms.set(function(){
						const _$41=iter.next(),value=_$41.value,done=_$41.done;
						return function(){
							if(_ms.bool(done)){
								return _
							} else {
								return LList(value,f())
							}
						}()
					},"displayName","f")
				}();
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
		const displayName=exports.displayName="LList";
		exports.default=LList;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9MTGlzdC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVNBLFlBQVEsZ0JBQ0s7R0FBWixVQUNDO0dBQ0QsWUFBTyxDQUFHLE9BQU87Ozs7Ozs7RUFFbEIsb0JBQWMsTUFBTSxVQUFVO0VBQzlCLEtBQUcsY0FBYSxPQUFNO0VBRXRCLGVBQVcsTUFBTSxxQkFDTTtHQUF0QixVQUFBLFVBQ1UsVUFBQTtXQUFUO0dBQUE7R0FDRCxVQUFBLGtCQUFnQixTQUFBLEVBQ0M7V0FBaEIsYUFBSyxjQUFZO0dBQUE7OztFQUVuQixRQUFNLE1BQU0sY0FDRztHQUFkLFVBQUEsYUFBVyxTQUFBLEVBQ0M7V0FBWCxTQUFLLEVBQUU7R0FBQTtHQUVSLFVBQUEsYUFBYyxVQUFBLEVBQUE7SUFDSyxZQUFsQixTQUFBLElBQ087O1dBRUg7WUFBQTthQUNDLFNBQVM7OztHQUVmLFVBQUEsU0FBUyxTQUFBLEVBQ0M7V0FBVDs7R0FFRCxVQUFBLGlCQUFTLFNBQUEsRUFBRSxhQUNZO3NCQUREO0lBQ3JCLFdBQU8sU0FBUztJQUNoQixrQkFDSztvQkFBQSxVQUFBO01BQUosV0FBYTs7T0FFWixZQUFBLE1BQ0k7ZUFBSDtPQUFBLE9BRUc7ZUFBSCxNQUFNLE1BQU07T0FBQTtNQUFBO0tBQUE7O1dBQ2Y7R0FBQTtHQUdELFVBQUEsV0FBTyxTQUFBLEVBQUUsRUFDQzs7S0FBSixRQUFBO0tBQ0oseUJBQUMsTUFBRCxJQUNNO2FBQUwsYUFBSyxFQUFFO0tBQUEsT0FFSjthQUFILGVBQVcsRUFBRTtLQUFBO0lBQUE7R0FBQTs7O0VBdERqQixzQ0FBQTtrQkF3REEiLCJmaWxlIjoiYXQvU2VxL0xMaXN0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=