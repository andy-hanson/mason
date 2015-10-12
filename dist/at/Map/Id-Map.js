"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../methods","./../../Type/Method","./../../Type/Kind","./../at","./../at-Type","./../q","./../Seq/Stream","./Map","./Map-Type"],(exports,methods_0,Method_1,Kind_2,_64_3,_64_45Type_4,_63_5,Stream_6,Map_7,Map_45Type_8)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(methods_0),del_45sub_33=_ms.get(_$0,"del-sub!"),set_45sub_33=_ms.get(_$0,"set-sub!"),_$1=_ms.getModule(Method_1),impl_33=_ms.get(_$1,"impl!"),self_45impl_33=_ms.get(_$1,"self-impl!"),_$2=_ms.getModule(Kind_2),kind_33=_ms.get(_$2,"kind!"),self_45kind_33=_ms.get(_$2,"self-kind!"),_$3=_ms.getModule(_64_3),count=_ms.get(_$3,"count"),empty_33=_ms.get(_$3,"empty!"),_$4=_ms.getModule(_64_45Type_4),empty=_ms.get(_$4,"empty"),_$5=_ms.getModule(_63_5),Opt_45_62_63=_ms.get(_$5,"Opt->?"),Stream=_ms.getDefaultExport(Stream_6),Map=_ms.getDefaultExport(Map_7),_$6=_ms.getModule(Map_7),_63get=_ms.get(_$6,"?get"),has_45key_63=_ms.get(_$6,"has-key?"),_64keys=_ms.get(_$6,"@keys"),_64values=_ms.get(_$6,"@values"),Map_45Type=_ms.getDefaultExport(Map_45Type_8);
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
		impl_33(set_45sub_33,Id_45Map,function(key,val){
			const _this=this;
			_this.set(key,val)
		});
		impl_33(del_45sub_33,Id_45Map,function(key){
			const _this=this;
			return (_=>{
				_this.delete(key);
				return _
			})(_63get(_this,key))
		});
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9NYXAvSWQtTWFwLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBYUEsK0JBQ08sS0FBQTtVQUVOOztFQUVELFFBQU0sU0FBTztFQUNiLGVBQVcsU0FBTztFQUVsQixlQUFXLE1BQU0sU0FDUTtVQUF4QixLQUFJO0VBQUE7RUFFTCxRQUFNLE1BQU0sU0FDUztTQXVCVjtVQUFBOztFQXJCWCxRQUFNLE9BQUssU0FBUyxTQUFBO1NBcUJUO1VBcEJWLGFBb0JVLFVBcEJHO0VBQUE7RUFFZCxRQUFNLGFBQVMsU0FBUyxTQUFBO1NBa0JiO1VBQUEsVUFqQkw7RUFBQTtFQUVOLFFBQU0sUUFBTSxTQUNTO1NBY1Y7VUFkVixLQUFJLFFBQ1E7V0FhRjs7O0VBWFgsUUFBTSxVQUFRLFNBQ1M7U0FVWjtVQVZWLEtBQUksUUFDUTtXQVNGOzs7RUFQWCxRQUFNLFNBQU8sU0FDVTtTQU1aO0dBQUE7O0VBSlgsUUFBTSxhQUFTLFNBQVUsU0FBQSxJQUFJO1NBSWxCO0dBQUEsVUFITCxJQUFJO0VBQUE7RUFFVixRQUFNLGFBQVMsU0FBUyxTQUFBO1NBQ2I7VUFBTCxJQUNhO0lBRFIsYUFDRDs7TUFESixPQUFLLE1BQUs7RUFBQSIsImZpbGUiOiJhdC9NYXAvSWQtTWFwLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
