"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Type/Kind","../../Type/Method","../../Type/Type","../at","../at-Type","./Set"],(exports,Kind_0,Method_1,Type_2,_64_3,_64_45Type_4,Set_5)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(Kind_0),kind_33=_ms.get(_$2,"kind!"),self_45kind_33=_ms.get(_$2,"self-kind!"),_$3=_ms.getModule(Method_1),impl_33=_ms.get(_$3,"impl!"),self_45impl_33=_ms.get(_$3,"self-impl!"),_$4=_ms.getModule(Type_2),contains_63=_ms.get(_$4,"contains?"),_$5=_ms.getModule(_64_3),_43_43_33=_ms.get(_$5,"++!"),_45_45_33=_ms.get(_$5,"--!"),count=_ms.get(_$5,"count"),empty_33=_ms.get(_$5,"empty!"),_64_45Type=_ms.getDefaultExport(_64_45Type_4),_$6=_ms.getModule(_64_45Type_4),empty=_ms.get(_$6,"empty"),Set=_ms.getDefaultExport(Set_5);
		const Id_45Set=global.Set;
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
			for(let em of _64added){
				_this.add(em)
			}
		});
		impl_33(empty_33,Id_45Set,function(){
			const _this=this;
			_this.clear()
		});
		impl_33(_45_45_33,Id_45Set,function(_64deleted){
			const _this=this;
			for(let em of _64deleted){
				_this.delete(em)
			}
		});
		impl_33(contains_63,Id_45Set,function(val){
			const _this=this;
			return _this.has(val)
		});
		const name=exports.name=`Id-Set`;
		exports.default=Id_45Set;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvQC9TZXQvSWQtU2V0Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBUUEsZUFBUTtFQUVSLGVBQVcsU0FBTztFQUNsQixlQUFXLE1BQU0sU0FDUSxJQUFBO1VBQXhCLEtBQUk7RUFBQTtFQUVMLFFBQU0sU0FBTztFQUNiLFFBQU0sTUFBTSxTQUNTLFVBQUE7U0FnQnBCO1VBQUE7O0VBYkQsUUFBTSxVQUFJLFNBQVUsU0FBQSxTQUNNO1NBWXpCO0dBWkssUUFBQSxNQUFNLFNBQ007SUFXakIsVUFYTTtHQUFBO0VBQUE7RUFFUCxRQUFNLFNBQU8sU0FDVSxVQUFBO1NBUXRCO0dBQUE7O0VBTEQsUUFBTSxVQUFJLFNBQVUsU0FBQSxXQUNRO1NBSTNCO0dBSkssUUFBQSxNQUFNLFdBQ1E7SUFHbkIsYUFIUztHQUFBO0VBQUE7RUFFVixRQUFNLFlBQVUsU0FBUyxTQUFBLElBQ0c7U0FBM0I7VUFBQSxVQUFLO0VBQUE7RUFoQ04sd0JBQUE7a0JBUUEiLCJmaWxlIjoiYXQvU2V0L0lkLVNldC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9