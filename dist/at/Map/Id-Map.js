"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../methods","./../../Type/Method","./../../Type/Kind","./../at","./../q","./../Seq/Stream","./Map"],(exports,methods_0,Method_1,Kind_2,_64_3,_63_4,Stream_5,Map_6)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(methods_0),del_45sub_33=_ms.get(_$0,"del-sub!"),set_45sub_33=_ms.get(_$0,"set-sub!"),_$1=_ms.getModule(Method_1),impl_33=_ms.get(_$1,"impl!"),_$2=_ms.getModule(Kind_2),kind_33=_ms.get(_$2,"kind!"),_$3=_ms.getModule(_64_3),count=_ms.get(_$3,"count"),empty_33=_ms.get(_$3,"empty!"),_$4=_ms.getModule(_63_4),Opt_45_62_63=_ms.get(_$4,"Opt->?"),Stream=_ms.getDefaultExport(Stream_5),Map=_ms.getDefaultExport(Map_6),_$5=_ms.getModule(Map_6),_63get=_ms.get(_$5,"?get"),has_45key_63=_ms.get(_$5,"has-key?"),_64keys=_ms.get(_$5,"@keys"),_64values=_ms.get(_$5,"@values");
		let Id_45Map=exports.default=(()=>{
			return global.Map
		})();
		impl_33(set_45sub_33,Id_45Map,function(key,val){
			let _this=this;
			_this.set(key,val)
		});
		kind_33(Id_45Map,Map,(()=>{
			let built=new (global.Map)();
			_ms.setSub(built,count,function(){
				let _this=this;
				return _this.size
			});
			_ms.setSub(built,_63get,function(key){
				let _this=this;
				return Opt_45_62_63(_this.get(key))
			});
			_ms.setSub(built,has_45key_63,function(key){
				let _this=this;
				return _this.has(key)
			});
			_ms.setSub(built,_64keys,function(){
				let _this=this;
				return new (Stream)(()=>{
					return _this.keys()
				})
			});
			_ms.setSub(built,_64values,function(){
				let _this=this;
				return new (Stream)(()=>{
					return _this.values()
				})
			});
			_ms.setSub(built,empty_33,function(){
				let _this=this;
				_this.clear()
			});
			_ms.setSub(built,del_45sub_33,function(key){
				let _this=this;
				return (()=>{
					let _=_63get(_this,key);
					_this.delete(key);
					return _
				})()
			});
			return built
		})());
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9NYXAvSWQtTWFwLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBV0EsNkJBQ08sS0FBQTtVQUVOOztFQUdELFFBQU0sYUFBUyxTQUFVLFNBQUEsSUFBSTtPQTBCMUI7R0FBQSxVQXpCRyxJQUFJO0VBQUE7RUFFVixRQUFNLFNBQU8sSUFDRyxLQUFBOztvQkFBZixNQUNXO1FBcUJUO1dBQUE7O29CQW5CRixPQUFVLFNBQUE7UUFtQlI7V0FsQkQsYUFrQkMsVUFsQlk7R0FBQTtvQkFFZCxhQUFjLFNBQUE7UUFnQlo7V0FBQSxVQWZJO0dBQUE7b0JBRU4sUUFDVztRQVlUO1dBWkQsS0FBSSxRQUNRO1lBV1g7OztvQkFURixVQUNhO1FBUVg7V0FSRCxLQUFJLFFBQ1E7WUFPWDs7O29CQUxGLFNBQ2E7UUFJWDtJQUFBOztvQkFGRixhQUFjLFNBQUE7UUFFWjtXQURJLEtBQ2E7V0FEYixPQUNKLE1BRGM7S0FDZCxhQUFRIiwiZmlsZSI6ImF0L01hcC9JZC1NYXAuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
