"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Type/Method","../../Type/Kind","../at","../at-Type","../q","../Seq/Stream","./Map","./Map-Type"],(exports,Method_0,Kind_1,_64_2,_64_45Type_3,_63_4,Stream_5,Map_6,Map_45Type_7)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(Method_0),impl_33=_ms.get(_$0,"impl!"),self_45impl_33=_ms.get(_$0,"self-impl!"),_$1=_ms.getModule(Kind_1),kind_33=_ms.get(_$1,"kind!"),self_45kind_33=_ms.get(_$1,"self-kind!"),_$2=_ms.getModule(_64_2),count=_ms.get(_$2,"count"),empty_33=_ms.get(_$2,"empty!"),_$3=_ms.getModule(_64_45Type_3),empty=_ms.get(_$3,"empty"),_$4=_ms.getModule(_63_4),Opt_45_62_63=_ms.get(_$4,"Opt->?"),Stream=_ms.getDefaultExport(Stream_5),Map=_ms.getDefaultExport(Map_6),_$5=_ms.getModule(Map_6),assoc_33=_ms.get(_$5,"assoc!"),_63get=_ms.get(_$5,"?get"),has_45key_63=_ms.get(_$5,"has-key?"),_64keys=_ms.get(_$5,"@keys"),un_45assoc_33=_ms.get(_$5,"un-assoc!"),_64values=_ms.get(_$5,"@values"),Map_45Type=_ms.getDefaultExport(Map_45Type_7);
		const Id_45Map=exports.default=(()=>{
			return global.Map
		})();
		kind_33(Id_45Map,Map);
		self_45kind_33(Id_45Map,Map_45Type);
		self_45impl_33(empty,Id_45Map,()=>{
			return new (Id_45Map)()
		});
		impl_33(count,Id_45Map,function(){
			const _this=this;
			return _this.size
		});
		impl_33(_63get,Id_45Map,function(key){
			const _this=this;
			return Opt_45_62_63(_this.get(key))
		});
		impl_33(has_45key_63,Id_45Map,function(key){
			const _this=this;
			return _this.has(key)
		});
		impl_33(_64keys,Id_45Map,function(){
			const _this=this;
			return new (Stream)(()=>{
				return _this.keys()
			})
		});
		impl_33(_64values,Id_45Map,function(){
			const _this=this;
			return new (Stream)(()=>{
				return _this.values()
			})
		});
		impl_33(empty_33,Id_45Map,function(){
			const _this=this;
			_this.clear()
		});
		impl_33(assoc_33,Id_45Map,function(key,val){
			const _this=this;
			_this.set(key,val)
		});
		impl_33(un_45assoc_33,Id_45Map,function(key){
			const _this=this;
			return (_=>{
				_this.delete(key);
				return _
			})(_63get(_this,key))
		});
		const name=exports.name=`Id-Map`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9NYXAvSWQtTWFwLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBWUEsK0JBQ08sS0FBQTtVQUVOOztFQUVELFFBQU0sU0FBTztFQUNiLGVBQVcsU0FBTztFQUVsQixlQUFXLE1BQU0sU0FDUSxJQUFBO1VBQXhCLEtBQUk7RUFBQTtFQUVMLFFBQU0sTUFBTSxTQUNTLFVBQUE7U0F1QlY7VUFBQTs7RUFyQlgsUUFBTSxPQUFLLFNBQVMsU0FBQSxJQUNHO1NBb0JaO1VBcEJWLGFBb0JVLFVBcEJHO0VBQUE7RUFFZCxRQUFNLGFBQVMsU0FBUyxTQUFBLElBQ0c7U0FpQmhCO1VBQUEsVUFqQkw7RUFBQTtFQUVOLFFBQU0sUUFBTSxTQUNTLFVBQUE7U0FjVjtVQWRWLEtBQUksUUFDUSxJQUFBO1dBYUY7OztFQVhYLFFBQU0sVUFBUSxTQUNTLFVBQUE7U0FVWjtVQVZWLEtBQUksUUFDUSxJQUFBO1dBU0Y7OztFQVBYLFFBQU0sU0FBTyxTQUNVLFVBQUE7U0FNWjtHQUFBOztFQUpYLFFBQU0sU0FBTyxTQUFVLFNBQUEsSUFBSSxJQUNHO1NBR25CO0dBQUEsVUFITCxJQUFJO0VBQUE7RUFFVixRQUFNLGNBQVUsU0FBUyxTQUFBLElBQ0c7U0FBakI7VUFBTCxJQUNhO0lBRFIsYUFDRDs7TUFESixPQUFLLE1BQUs7RUFBQTtFQS9DaEIsd0JBQUEiLCJmaWxlIjoiYXQvTWFwL0lkLU1hcC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
