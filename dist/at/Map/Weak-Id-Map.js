"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../methods","./../../Type/Kind","./../../Type/Method","./../at","./../at-Type","./../q","./Map","./Map-Type"],(exports,methods_0,Kind_1,Method_2,_64_3,_64_45Type_4,_63_5,Map_6,Map_45Type_7)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(methods_0),del_45sub_33=_ms.get(_$0,"del-sub!"),set_45sub_33=_ms.get(_$0,"set-sub!"),_$1=_ms.getModule(Kind_1),kind_33=_ms.get(_$1,"kind!"),self_45kind_33=_ms.get(_$1,"self-kind!"),_$2=_ms.getModule(Method_2),impl_33=_ms.get(_$2,"impl!"),self_45impl_33=_ms.get(_$2,"self-impl!"),_$3=_ms.getModule(_64_3),empty_33=_ms.get(_$3,"empty!"),_$4=_ms.getModule(_64_45Type_4),empty=_ms.get(_$4,"empty"),_$5=_ms.getModule(_63_5),Opt_45_62_63=_ms.get(_$5,"Opt->?"),Map=_ms.getDefaultExport(Map_6),_$6=_ms.getModule(Map_6),_63get=_ms.get(_$6,"?get"),has_45key_63=_ms.get(_$6,"has-key?"),_64keys=_ms.get(_$6,"@keys"),Map_45Type=_ms.getDefaultExport(Map_45Type_7);
		const Weak_45Id_45Map=exports.default=(()=>{
			return WeakMap
		})();
		self_45kind_33(Weak_45Id_45Map,Map_45Type);
		self_45impl_33(empty,Weak_45Id_45Map,()=>{
			return new (Weak_45Id_45Map)()
		});
		kind_33(Weak_45Id_45Map,Map);
		impl_33(_63get,Weak_45Id_45Map,function(key){
			const _this=this;
			return Opt_45_62_63(_this.get(key))
		});
		impl_33(has_45key_63,Weak_45Id_45Map,function(key){
			const _this=this;
			return _this.has(key)
		});
		impl_33(set_45sub_33,Weak_45Id_45Map,function(key,val){
			const _this=this;
			_this.set(key,val)
		});
		impl_33(del_45sub_33,Weak_45Id_45Map,function(key){
			const _this=this;
			return (_=>{
				_this.delete(key);
				return _
			})(_63get(_this,key))
		});
		impl_33(_64keys,Weak_45Id_45Map,function(){
			const _this=this;
			throw new (Error)(`Weak-Id-Map does not support \`keys\`.`)
		});
		impl_33(empty_33,Weak_45Id_45Map,function(){
			const _this=this;
			throw new (Error)(`Weak-Id-Map does not support \`empty!\`.`)
		});
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9NYXAvV2Vhay1JZC1NYXAubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFXQSxzQ0FDWSxLQUFBO1VBR1g7RUFBQTtFQUVELGVBQVcsZ0JBQVk7RUFDdkIsZUFBVyxNQUFNLGdCQUNhO1VBQTdCLEtBQUk7RUFBQTtFQUVMLFFBQU0sZ0JBQVk7RUFDbEIsUUFBTSxPQUFLLGdCQUFjLFNBQUE7U0FPZDtVQU5WLGFBTVUsVUFORztFQUFBO0VBQ2QsUUFBTSxhQUFTLGdCQUFjLFNBQUE7U0FLbEI7VUFBQSxVQUpMO0VBQUE7RUFDTixRQUFNLGFBQVMsZ0JBQWUsU0FBQSxJQUFJO1NBR3ZCO0dBQUEsVUFGTCxJQUFJO0VBQUE7RUFDVixRQUFNLGFBQVMsZ0JBQWMsU0FBQTtTQUNsQjtVQUFMLElBQ2E7SUFEUixhQUNEOztNQURKLE9BQUssTUFBSztFQUFBO0VBSWhCLFFBQU0sUUFBTSxnQkFDZTtTQUxoQjtHQU1WLGtCQUFROztFQUVULFFBQU0sU0FBTyxnQkFDZTtTQVRqQjtHQVVWLGtCQUFRIiwiZmlsZSI6ImF0L01hcC9XZWFrLUlkLU1hcC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
