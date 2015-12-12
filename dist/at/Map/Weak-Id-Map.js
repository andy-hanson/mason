"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../methods","./../../Type/Kind","./../at","./../q","./Map"],(exports,methods_0,Kind_1,_64_2,_63_3,Map_4)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(methods_0),del_45sub_33=_ms.get(_$0,"del-sub!"),set_45sub_33=_ms.get(_$0,"set-sub!"),_$1=_ms.getModule(Kind_1),kind_33=_ms.get(_$1,"kind!"),_$2=_ms.getModule(_64_2),empty_33=_ms.get(_$2,"empty!"),_$3=_ms.getModule(_63_3),Opt_45_62_63=_ms.get(_$3,"Opt->?"),Map=_ms.getDefaultExport(Map_4),_$4=_ms.getModule(Map_4),_63get=_ms.get(_$4,"?get"),has_45key_63=_ms.get(_$4,"has-key?"),_64keys=_ms.get(_$4,"@keys");
		let Weak_45Id_45Map=exports.default=(()=>{
			return WeakMap
		})();
		kind_33(Weak_45Id_45Map,Map,(()=>{
			let built=new (global.Map)();
			_ms.setSub(built,_63get,function(key){
				let _this=this;
				return Opt_45_62_63(_this.get(key))
			});
			_ms.setSub(built,has_45key_63,function(key){
				let _this=this;
				return _this.has(key)
			});
			_ms.setSub(built,set_45sub_33,function(key,val){
				let _this=this;
				_this.set(key,val)
			});
			_ms.setSub(built,del_45sub_33,function(key){
				let _this=this;
				return (()=>{
					let _=_63get(_this,key);
					_this.delete(key);
					return _
				})()
			});
			_ms.setSub(built,_64keys,()=>{
				throw new (Error)(`Weak-Id-Map does not support \`keys\`.`)
			});
			_ms.setSub(built,empty_33,()=>{
				throw new (Error)(`Weak-Id-Map does not support \`empty!\`.`)
			});
			return built
		})());
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9NYXAvV2Vhay1JZC1NYXAubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFRQSxvQ0FDWSxLQUFBO1VBR1g7RUFBQTtFQUVELFFBQU0sZ0JBQVksSUFDRyxLQUFBOztvQkFBcEIsT0FBVSxTQUFBO1FBV1I7V0FWRCxhQVVDLFVBVlk7R0FBQTtvQkFFZCxhQUFjLFNBQUE7UUFRWjtXQUFBLFVBUEk7R0FBQTtvQkFFTixhQUFlLFNBQUEsSUFBSTtRQUtqQjtJQUFBLFVBSkksSUFBSTtHQUFBO29CQUVWLGFBQWMsU0FBQTtRQUVaO1dBREksS0FDYTtXQURiLE9BQ0osTUFEYztLQUNkLGFBQVE7Ozs7b0JBR1YsUUFDVztJQUFWLGtCQUFPOztvQkFFUixTQUNZO0lBQVgsa0JBQU8iLCJmaWxlIjoiYXQvTWFwL1dlYWstSWQtTWFwLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
