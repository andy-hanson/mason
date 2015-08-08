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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9XZWFrLUlkLU1hcC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVVBLHNCQUNZLEtBQUE7O0dBQVgsb0JBQ0M7a0JBR0Q7O0VBRUQsZUFBVyxnQkFBWTtFQUN2QixlQUFXLE1BQU0sZ0JBQ2EsSUFBQTtVQUE3QixLQUFJO0VBQUE7RUFFTCxRQUFNLGdCQUFZO0VBQ2xCLFFBQU0sT0FBSyxnQkFBYyxTQUFBLElBQ0c7U0FldEI7VUFmTCxhQWVLLFVBZlE7RUFBQTtFQUNkLFFBQU0sYUFBUyxnQkFBYyxTQUFBLElBQ0c7U0FhMUI7VUFBQSxVQWJBO0VBQUE7RUFDTixRQUFNLFNBQU8sZ0JBQWUsU0FBQSxJQUFJLElBQ0c7U0FXN0I7R0FBQSxVQVhBLElBQUk7RUFBQTtFQUNWLFFBQU0sY0FBVSxnQkFBYyxTQUFBLElBQ0c7U0FTM0I7VUFUQSxJQUNhO0lBUWIsYUFSSTs7TUFESixPQVNBLE1BVFU7RUFBQTtFQUloQixRQUFNLEtBQUssZ0JBQ2UsVUFBQTtTQUlwQjtHQUpMLEtBSUs7R0FITCxnQkFBUTs7RUFFVCxRQUFNLFNBQU8sZ0JBQ2UsVUFBQTtTQUF0QjtHQUFMLEtBQUs7R0FDTCxnQkFBUTs7RUF2Q1Qsd0JBQUE7a0JBVUEiLCJmaWxlIjoiYXQvTWFwL1dlYWstSWQtTWFwLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=