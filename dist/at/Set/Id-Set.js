"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../Type/Kind","./../../Type/Method","./../../Type/Type","./../at","./../at-Type","./Set"],(exports,Kind_0,Method_1,Type_2,_64_3,_64_45Type_4,Set_5)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(Kind_0),kind_33=_ms.get(_$0,"kind!"),self_45kind_33=_ms.get(_$0,"self-kind!"),_$1=_ms.getModule(Method_1),impl_33=_ms.get(_$1,"impl!"),self_45impl_33=_ms.get(_$1,"self-impl!"),_$2=_ms.getModule(Type_2),contains_63=_ms.get(_$2,"contains?"),_$3=_ms.getModule(_64_3),_43_43_33=_ms.get(_$3,"++!"),_45_45_33=_ms.get(_$3,"--!"),count=_ms.get(_$3,"count"),empty_33=_ms.get(_$3,"empty!"),_64_45Type=_ms.getDefaultExport(_64_45Type_4),_$4=_ms.getModule(_64_45Type_4),empty=_ms.get(_$4,"empty"),Set=_ms.getDefaultExport(Set_5);
		const Id_45Set=exports.default=global.Set;
		self_45kind_33(Id_45Set,_64_45Type);
		self_45impl_33(empty,Id_45Set,()=>{
			return new (Id_45Set)()
		});
		kind_33(Id_45Set,Set);
		impl_33(count,Id_45Set,function(){
			const _this=this;
			return _this.size
		});
		impl_33(_43_43_33,Id_45Set,function(_64added){
			const _this=this;
			for(let _ of _64added){
				_this.add(_)
			}
		});
		impl_33(empty_33,Id_45Set,function(){
			const _this=this;
			_this.clear()
		});
		impl_33(_45_45_33,Id_45Set,function(_64deleted){
			const _this=this;
			for(let _ of _64deleted){
				_this.delete(_)
			}
		});
		impl_33(contains_63,Id_45Set,function(_){
			const _this=this;
			return _this.has(_)
		});
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9TZXQvSWQtU2V0Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBVUEsK0JBQVE7RUFFUixlQUFXLFNBQU87RUFDbEIsZUFBVyxNQUFNLFNBQ1E7VUFBeEIsS0FBSTtFQUFBO0VBRUwsUUFBTSxTQUFPO0VBQ2IsUUFBTSxNQUFNLFNBQ1M7U0FnQnBCO1VBQUE7O0VBYkQsUUFBTSxVQUFJLFNBQVUsU0FBQTtTQWFuQjtHQVpLLFFBQUEsS0FBQSxTQUNNO0lBV1gsVUFYTTtHQUFBO0VBQUE7RUFFUCxRQUFNLFNBQU8sU0FDVTtTQVF0QjtHQUFBOztFQUxELFFBQU0sVUFBSSxTQUFVLFNBQUE7U0FLbkI7R0FKSyxRQUFBLEtBQUEsV0FDUTtJQUdiLGFBSFM7R0FBQTtFQUFBO0VBRVYsUUFBTSxZQUFVLFNBQVMsU0FBQTtTQUN4QjtVQUFBLFVBQUM7RUFBQSIsImZpbGUiOiJhdC9TZXQvSWQtU2V0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
