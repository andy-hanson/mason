"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Function","../../Type/Kind","../../Type/Method","../at","../at-Type","../q","./Map","./Map-Type"],(exports,Function_0,Kind_1,Method_2,_64_3,_64_45Type_4,_63_5,Map_6,Map_45Type_7)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(Function_0),noop=_ms.get(_$2,"noop"),_$3=_ms.getModule(Kind_1),kind_33=_ms.get(_$3,"kind!"),self_45kind_33=_ms.get(_$3,"self-kind!"),_$4=_ms.getModule(Method_2),impl_33=_ms.get(_$4,"impl!"),self_45impl_33=_ms.get(_$4,"self-impl!"),_$5=_ms.getModule(_64_3),empty_33=_ms.get(_$5,"empty!"),_$6=_ms.getModule(_64_45Type_4),empty=_ms.get(_$6,"empty"),_$7=_ms.getModule(_63_5),Opt_45_62_63=_ms.get(_$7,"Opt->?"),Map=_ms.getDefaultExport(Map_6),_$8=_ms.getModule(Map_6),assoc_33=_ms.get(_$8,"assoc!"),_63get=_ms.get(_$8,"?get"),has_45key_63=_ms.get(_$8,"has-key?"),keys=_ms.get(_$8,"keys"),un_45assoc_33=_ms.get(_$8,"un-assoc!"),Map_45Type=_ms.getDefaultExport(Map_45Type_7);
		const Weak_45Id_45Map=(()=>{
			const built={};
			const doc=built.doc=`Map which can only hold have Objects as keys and stops holding them when they are garbage collected.\nGood for caches.\nIt does not have the full functionality of a Map because there is no way to iterate over the keys.`;
			return _ms.set(global.WeakMap,built,"Weak-Id-Map")
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
		impl_33(assoc_33,Weak_45Id_45Map,function(key,val){
			const _this=this;
			_this.set(key,val)
		});
		impl_33(un_45assoc_33,Weak_45Id_45Map,function(key){
			const _this=this;
			return (_=>{
				_this.delete(key);
				return _
			})(_63get(_this,key))
		});
		impl_33(keys,Weak_45Id_45Map,function(){
			const _this=this;
			noop(_this);
			throw _ms.error(`Weak-Id-Map does not support \`keys\`.`)
		});
		impl_33(empty_33,Weak_45Id_45Map,function(){
			const _this=this;
			noop(_this);
			throw _ms.error(`Weak-Id-Map does not support \`empty!\`.`)
		});
		const name=exports.name=`Weak-Id-Map`;
		exports.default=Weak_45Id_45Map;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvQC9NYXAvV2Vhay1JZC1NYXAubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFVQSxzQkFDWSxLQUFBOztHQUFYLG9CQUNDO2tCQUdEOztFQUVELGVBQVcsZ0JBQVk7RUFDdkIsZUFBVyxNQUFNLGdCQUNhLElBQUE7VUFBN0IsS0FBSTtFQUFBO0VBRUwsUUFBTSxnQkFBWTtFQUNsQixRQUFNLE9BQUssZ0JBQWMsU0FBQSxJQUNHO1NBZXRCO1VBZkwsYUFlSyxVQWZRO0VBQUE7RUFDZCxRQUFNLGFBQVMsZ0JBQWMsU0FBQSxJQUNHO1NBYTFCO1VBQUEsVUFiQTtFQUFBO0VBQ04sUUFBTSxTQUFPLGdCQUFlLFNBQUEsSUFBSSxJQUNHO1NBVzdCO0dBQUEsVUFYQSxJQUFJO0VBQUE7RUFDVixRQUFNLGNBQVUsZ0JBQWMsU0FBQSxJQUNHO1NBUzNCO1VBVEEsSUFDYTtJQVFiLGFBUkk7O01BREosT0FTQSxNQVRVO0VBQUE7RUFJaEIsUUFBTSxLQUFLLGdCQUNlLFVBQUE7U0FJcEI7R0FKTCxLQUlLO0dBSEwsZ0JBQVE7O0VBRVQsUUFBTSxTQUFPLGdCQUNlLFVBQUE7U0FBdEI7R0FBTCxLQUFLO0dBQ0wsZ0JBQVE7O0VBdkNULHdCQUFBO2tCQVVBIiwiZmlsZSI6ImF0L01hcC9XZWFrLUlkLU1hcC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9