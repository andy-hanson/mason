"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Type/Kind","../../Type/Method","../../Type/Wrap-Type","../at","../at-Type","../Map/Map","../Map/Hash-Map","../Map/Map","./Set"],(exports,Kind_0,Method_1,Wrap_45Type_2,_64_3,_64_45Type_4,Map_5,Hash_45Map_6,Map_7,Set_8)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(Kind_0),kind_33=_ms.get(_$2,"kind!"),self_45kind_33=_ms.get(_$2,"self-kind!"),_$3=_ms.getModule(Method_1),impl_33=_ms.get(_$3,"impl!"),self_45impl_33=_ms.get(_$3,"self-impl!"),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_2),_$5=_ms.getModule(_64_3),_43_43_33=_ms.get(_$5,"++!"),_45_45_33=_ms.get(_$5,"--!"),empty_33=_ms.get(_$5,"empty!"),iterator=_ms.get(_$5,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_4),_$6=_ms.getModule(_64_45Type_4),empty=_ms.get(_$6,"empty"),_$7=_ms.getModule(Map_5),keys=_ms.get(_$7,"keys"),Hash_45Map=_ms.getDefaultExport(Hash_45Map_6),_$9=_ms.getModule(Map_7),assoc_33=_ms.get(_$9,"assoc!"),un_45assoc_33=_ms.get(_$9,"un-assoc!"),Set=_ms.getDefaultExport(Set_8);
		const Hash_45Set=Wrap_45Type(()=>{
			const built={};
			const doc=built.doc=`Set that considers elements equal using =?.\nRelies on an efficient hash-code implementation.`;
			const wrapped_45type=built["wrapped-type"]=Hash_45Map;
			return _ms.setName(built,"Hash-Set")
		}());
		self_45kind_33(Hash_45Set,_64_45Type);
		self_45impl_33(empty,Hash_45Set,()=>{
			return Hash_45Set(empty(Hash_45Map))
		});
		impl_33(iterator,Hash_45Set,function(){
			const _this=this;
			return iterator(keys(_this.val))
		});
		kind_33(Hash_45Set,Set);
		impl_33(_43_43_33,Hash_45Set,function(_64added){
			const _this=this;
			for(let em of _64added){
				assoc_33(_this.val,em,true)
			}
		});
		impl_33(_45_45_33,Hash_45Set,function(_64deleted){
			const _this=this;
			for(let em of _64deleted){
				un_45assoc_33(_this.val,em)
			}
		});
		impl_33(empty_33,Hash_45Set,function(){
			const _this=this;
			empty_33(_this.val)
		});
		const name=exports.name=`Hash-Set`;
		exports.default=Hash_45Set;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NldC9IYXNoLVNldC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVdBLGlCQUFVLGdCQUNTOztHQUFsQixvQkFDQztHQUVELDJDQUFjOzs7RUFFZixlQUFXLFdBQVM7RUFDcEIsZUFBVyxNQUFNLFdBQ1UsSUFBQTtVQUExQixXQUFVLE1BQU07RUFBQTtFQUVqQixRQUFNLFNBQVMsV0FDVyxVQUFBOztVQUF6QixTQUFVLEtBQUs7O0VBRWhCLFFBQU0sV0FBUztFQUdmLFFBQU0sVUFBSSxXQUFZLFNBQUEsU0FDTTs7R0FBdEIsUUFBQSxNQUFNLFNBQ007SUFBaEIsU0FBTyxVQUFLLEdBQUc7R0FBQTtFQUFBO0VBR2pCLFFBQU0sVUFBSSxXQUFZLFNBQUEsV0FDUTs7R0FBeEIsUUFBQSxNQUFNLFdBQ1E7SUFBbEIsY0FBVSxVQUFLO0dBQUE7RUFBQTtFQUVqQixRQUFNLFNBQU8sV0FDWSxVQUFBOztHQUF4QixTQUFPOztFQXJDUix3QkFBQTtrQkFXQSIsImZpbGUiOiJhdC9TZXQvSGFzaC1TZXQuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==