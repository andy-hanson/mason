"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../compare","./../../Type/Type","./../../Type/Kind","./../../Type/Method","./../at","./../at-Type","./Hash-Set"],(exports,compare_0,Type_1,Kind_2,Method_3,_64_4,_64_45Type_5,Hash_45Set_6)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),same_63=_ms.get(_$0,"same?"),_$1=_ms.getModule(Type_1),_61_62=_ms.get(_$1,"=>"),type_45of=_ms.get(_$1,"type-of"),_$2=_ms.getModule(Kind_2),self_45kind_33=_ms.get(_$2,"self-kind!"),Method=_ms.getDefaultExport(Method_3),_64=_ms.getDefaultExport(_64_4),_$3=_ms.getModule(_64_4),all_63=_ms.get(_$3,"all?"),count=_ms.get(_$3,"count"),_64keep=_ms.get(_$3,"@keep"),_64_45Type=_ms.getDefaultExport(_64_45Type_5),_$4=_ms.getModule(_64_45Type_5),empty=_ms.get(_$4,"empty"),Hash_45Set=_ms.lazy(()=>_ms.getDefaultExport(Hash_45Set_6));
		const Set=exports.default=(()=>{
			const _=_ms.kind("Set",[_64],{
				[_ms.symbol(empty)](){
					const _this=this;
					return empty(_ms.unlazy(Hash_45Set))
				}
			},{
				[_ms.symbol(_61_63)](other){
					const _this=this;
					return ((same_63(type_45of,_this,other)&&same_63(count,_this,other))&&all_63(_this,_=>{
						return _ms.contains(other,_)
					}))
				}
			});
			self_45kind_33(_,_64_45Type);
			return _
		})();
		const intersect=exports.intersect=new (Method)((()=>{
			const built={};
			built.name="intersect";
			const args=built.args=2;
			const _default=built.default=function _default(_64intersect_45with){
				const _this=this;
				return _64keep(_this,_=>{
					return _ms.contains(_61_62(Set,_64intersect_45with),_)
				})
			};
			return built
		})());
		const set_61_63=exports["set=?"]=function set_61_63(a,b){
			_ms.checkContains(_64,a,"a");
			_ms.checkContains(_64,b,"b");
			return _61_63(_61_62(Set,a),_61_62(Set,b))
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9TZXQvU2V0Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBVUEsMEJBQVUsS0FLTjsyQkFMTTtnQkFRUjtXQWFNO1lBWkw7OztnQkFFRixTQUFJO1dBVUc7WUFSTixFQUFLLFFBQU0sVUFRTCxNQVJrQixRQUFRLFFBQU0sTUFRaEMsTUFSMkMsU0FBUSxPQVFuRCxNQVI4RDswQkFDbEUsTUFBRDtLQUFBO0lBQUE7R0FBQTtHQVRELGVBQVcsRUFBRTs7O0VBV2Ysa0NBQVcsS0FBSSxRQUNNLEtBQUE7O2NBQ3BCO0dBQ0Esc0JBQU07R0FDTiw2QkFBVyxrQkFBQTtVQUNKO1dBQU4sUUFBTSxNQUFNO3lCQUNSLE9BQUcsSUFBSSxxQkFBVjtJQUFBO0dBQUE7OztFQUVILGlDQUFRLG1CQUFBLEVBQUk7cUJBQUY7cUJBQUk7VUFFYixPQUFJLE9BQUcsSUFBSSxHQUFJLE9BQUcsSUFBSTtFQUFBIiwiZmlsZSI6ImF0L1NldC9TZXQuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
