"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../control","../../Function","../../Type/Kind","../../Type/Method","../at","../at-Type","../q","./Map","./Map-Type"],(exports,control_0,Function_1,Kind_2,Method_3,_64_4,_64_45Type_5,_63_6,Map_7,Map_45Type_8)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(control_0),returning=_ms.get(_$2,"returning"),_$3=_ms.getModule(Function_1),noop=_ms.get(_$3,"noop"),_$4=_ms.getModule(Kind_2),kind_33=_ms.get(_$4,"kind!"),self_45kind_33=_ms.get(_$4,"self-kind!"),_$5=_ms.getModule(Method_3),impl_33=_ms.get(_$5,"impl!"),self_45impl_33=_ms.get(_$5,"self-impl!"),_$6=_ms.getModule(_64_4),empty_33=_ms.get(_$6,"empty!"),_$7=_ms.getModule(_64_45Type_5),empty=_ms.get(_$7,"empty"),_$8=_ms.getModule(_63_6),Opt_45_62_63=_ms.get(_$8,"Opt->?"),Map=_ms.getDefaultExport(Map_7),_$9=_ms.getModule(Map_7),assoc_33=_ms.get(_$9,"assoc!"),_63get=_ms.get(_$9,"?get"),has_45key_63=_ms.get(_$9,"has-key?"),keys=_ms.get(_$9,"keys"),un_45assoc_33=_ms.get(_$9,"un-assoc!"),Map_45Type=_ms.getDefaultExport(Map_45Type_8);
		const Weak_45Id_45Map=()=>{
			const built={};
			const doc=built.doc=`Map which can only hold have Objects as keys and stops holding them when they are garbage collected.\nGood for caches.\nIt does not have the full functionality of a Map because there is no way to iterate over the keys.`;
			return _ms.set(global.WeakMap,built,"Weak-Id-Map")
		}();
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
			return returning(_63get(_this,key),()=>{
				_this.delete(key)
			})
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9XZWFrLUlkLU1hcC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVdBLDBCQUNZOztHQUFYLG9CQUNDO2tCQUdEOztFQUVELGVBQVcsZ0JBQVk7RUFDdkIsZUFBVyxNQUFNLGdCQUNhLElBQUE7VUFBN0IsS0FBSTtFQUFBO0VBRUwsUUFBTSxnQkFBWTtFQUNsQixRQUFNLE9BQUssZ0JBQWMsU0FBQSxJQUNHO1NBZXRCO1VBZkwsYUFlSyxVQWZRO0VBQUE7RUFDZCxRQUFNLGFBQVMsZ0JBQWMsU0FBQSxJQUNHO1NBYTFCO1VBQUEsVUFiQTtFQUFBO0VBQ04sUUFBTSxTQUFPLGdCQUFlLFNBQUEsSUFBSSxJQUNHO1NBVzdCO0dBQUEsVUFYQSxJQUFJO0VBQUE7RUFDVixRQUFNLGNBQVUsZ0JBQWMsU0FBQSxJQUNHO1NBUzNCO1VBVEwsVUFBVyxPQVNOLE1BVGdCLEtBQ08sSUFBQTtJQVF2QixhQVJJO0dBQUE7RUFBQTtFQUdWLFFBQU0sS0FBSyxnQkFDZSxVQUFBO1NBSXBCO0dBSkwsS0FJSztHQUhMLGdCQUFROztFQUVULFFBQU0sU0FBTyxnQkFDZSxVQUFBO1NBQXRCO0dBQUwsS0FBSztHQUNMLGdCQUFROztFQXhDVCx3QkFBQTtrQkFXQSIsImZpbGUiOiJhdC9NYXAvV2Vhay1JZC1NYXAuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==