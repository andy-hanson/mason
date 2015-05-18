"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Boolean","../../js","../../Objectbang","../../Type/Kind","../../Type/Tuple","../at","../at-Type","./Seq"],function(exports,Boolean_0,js_1,Object_33_2,Kind_3,Tuple_4,_64_5,_64_45Type_6,Seq_7){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),not=_ms.get(_$2,"not"),_$3=_ms.getModule(js_1),id_61_63=_ms.get(_$3,"id=?"),_$4=_ms.getModule(Object_33_2),p_33=_ms.get(_$4,"p!"),_$5=_ms.getModule(Kind_3),kind_33=_ms.get(_$5,"kind!"),self_45kind_33=_ms.get(_$5,"self-kind!"),Tuple=_ms.getDefaultExport(Tuple_4),_64=_ms.getDefaultExport(_64_5),_$7=_ms.getModule(_64_5),_43_43=_ms.get(_$7,"++"),empty_63=_ms.get(_$7,"empty?"),iterator=_ms.get(_$7,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_6),_$8=_ms.getModule(_64_45Type_6),empty=_ms.get(_$8,"empty"),from_45stream=_ms.get(_$8,"from-stream"),Seq=_ms.getDefaultExport(Seq_7),_$9=_ms.getModule(Seq_7),_60_43_43_39=_ms.get(_$9,"<++'"),tail=_ms.get(_$9,"tail");
		const LList=Tuple(function(){
			const doc="Singly-linked list.";
			const props=["head","tail"];
			return {
				doc:doc,
				props:props,
				name:"LList"
			}
		}());
		const empty_45LList=LList(void 0,void 0);
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
				if(not(empty_63(_))){
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
				const f=function f(){
					const _$40=iter.next(),value=_$40.value,done=_$40.done;
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
		const name=exports.name="LList";
		exports.default=LList;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9MTGlzdC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVVBLFlBQVEsZ0JBQ0s7R0FBWixVQUNDO0dBQ0QsWUFBTyxDQUFHLE9BQU87Ozs7Ozs7RUFFbEIsb0JBQWMsTUFBTSxPQUFVO0VBQzlCLEtBQUcsY0FBYSxPQUFNO0VBRXRCLGVBQVcsTUFBTSxxQkFDTTtHQUF0QixVQUFBLFVBQ1UsVUFBQTtXQUFUO0dBQUE7R0FDRCxVQUFBLGtCQUFnQixTQUFBLEVBQ0M7V0FBaEIsYUFBSyxjQUFZO0dBQUE7OztFQUVuQixRQUFNLE1BQU0sY0FDRztHQUFkLFVBQUEsYUFBVyxTQUFBLEVBQ0M7V0FBWCxTQUFLLEVBQUU7R0FBQTtHQUVSLFVBQUEsYUFBYyxVQUFBLEVBQ0M7SUFBZCxHQUFJLElBQUksU0FBQSxJQUNPO1lBQVg7YUFDQyxTQUFTOzs7R0FFZixVQUFBLFNBQVMsU0FBQSxFQUNDO1dBQVQ7O0dBRUQsVUFBQSxpQkFBUyxTQUFBLEVBQUUsYUFDWTtzQkFERDtJQUNyQixXQUFPLFNBQVM7SUFDaEIsUUFDSyxZQUFBO0tBQUosV0FBYTs7TUFFWixZQUFBLE1BQ0k7Y0FBSDtNQUFBLE9BRUc7Y0FBSCxNQUFNLE1BQU07TUFBQTtLQUFBO0lBQUE7V0FDZjtHQUFBO0dBR0QsVUFBQSxXQUFPLFNBQUEsRUFBRSxFQUNDOztLQUFKLFFBQUE7S0FDSix5QkFBQyxNQUFELElBQ007YUFBTCxhQUFLLEVBQUU7S0FBQSxPQUVKO2FBQUgsZUFBVyxFQUFFO0tBQUE7SUFBQTtHQUFBOzs7RUFyRGpCLHdCQUFBO2tCQXVEQSIsImZpbGUiOiJhdC9TZXEvTExpc3QuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==