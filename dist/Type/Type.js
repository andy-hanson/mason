"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../compare","./../js","./../private/bootstrap","./../to-string","./Impl-Type","./Kind","./Method","./../at/q","./../Object","./../to-string"],(exports,compare_0,js_1,bootstrap_2,to_45string_3,Impl_45Type_4,Kind_5,Method_6,_63_7,Object_8,to_45string_9)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_$1=_ms.getModule(js_1),id_61_63=_ms.get(_$1,"id=?"),_$2=_ms.getModule(bootstrap_2),ms=_ms.get(_$2,"ms"),msDef=_ms.get(_$2,"msDef"),to_45string=_ms.getDefaultExport(to_45string_3),Impl_45Type=_ms.getDefaultExport(Impl_45Type_4),Kind=_ms.getDefaultExport(Kind_5),_$3=_ms.getModule(Kind_5),kind_33=_ms.get(_$3,"kind!"),Method=_ms.getDefaultExport(Method_6),_$4=_ms.getModule(Method_6),impl_33=_ms.get(_$4,"impl!"),_$5=_ms.lazyGetModule(_63_7),_63_45or=_ms.lazyProp(_$5,"?-or"),_$6=_ms.lazyGetModule(Object_8),_63property_45with_45proto=_ms.lazyProp(_$6,"?property-with-proto"),_$7=_ms.lazyGetModule(to_45string_9),inspect=_ms.lazyProp(_$7,"inspect");
		const Type=exports.default=_ms.kind("Type",[],{},{
			[_ms.symbol(_61_63)](other){
				const _this=this;
				return id_61_63(_this,other)
			},
			[_ms.symbol(to_45string)](){
				const _this=this;
				return _this.name
			}
		});
		impl_33(to_45string,Kind,function(){
			const _this=this;
			return _this.name
		});
		const contains_63=exports["contains?"]=ms.contains;
		const extract=exports.extract=new (Method)((()=>{
			const built={};
			built.name="extract";
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,"type");
				_ms.add(built,"candidate");
				_ms.add(built,["num-extracteds",Number]);
				return built
			})();
			return built
		})());
		msDef("extract",extract);
		msDef("checkContains",(expected_45type,value,value_45name)=>{
			if(! _ms.contains(expected_45type,value))throw new (TypeError)((()=>{
				return `${value_45name} is no ${expected_45type.name}, is a ${type_45of(value).name}: ${_ms.unlazy(inspect)(value)}`
			})());
			return value
		});
		const _61_62=exports["=>"]=new (Method)((()=>{
			const built={};
			built.name="=>";
			const wrap=built.wrap=function wrap(impl,convert_45to_45type,converted,opts){
				return (()=>{
					const _=converted;
					if(_ms.contains(convert_45to_45type,_)){
						return _
					} else {
						return impl.call(convert_45to_45type,_,opts)
					}
				})()
			};
			return built
		})());
		const type_45of=exports["type-of"]=function type_45of(_){
			return _ms.checkContains(Impl_45Type,_ms.unlazy(_63_45or)(_ms.unlazy(_63property_45with_45proto)(_,"constructor"),Object),"returned value")
		};
		kind_33(Impl_45Type,Type);
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvVHlwZS9UeXBlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBY0E7ZUFJQyxTQUFJO1VBUUo7V0FQQyxTQU9ELE1BUFc7R0FBQTtlQUVYO1VBS0E7V0FBQTs7O0VBREQsUUFBTSxZQUFVLEtBQ087U0FBdEI7VUFBQTs7RUFHRCx1Q0FBVztFQUVYLDhCQUFTLEtBQUksUUFDTSxLQUFBOztjQU1sQjtHQUNBLHNCQUNLLEtBQUE7O2tCQUFEO2tCQUNBO2tCQUVELENBQUUsaUJBQWU7Ozs7O0VBRXJCLE1BQU8sVUFBUTtFQUVmLE1BQU8sZ0JBQWUsQ0FBQSxnQkFBYyxNQUFNO0dBQ2pDLGtCQUFNLGdCQUFOLGFBQTJCLEtBQUksV0FDUyxLQUFBO1dBQTlDLEdBQUMsc0JBQW1CLDhCQUE0QixVQUFRLG9DQUF1Qjs7VUFDakY7RUFBQTtFQUVELDJCQUFJLEtBQUksUUFDTSxLQUFBOztjQUdiO0dBQ0Esc0JBQU8sY0FBQSxLQUFLLG9CQUFnQixVQUFVO1dBQ2hDO0tBQUEsUUFBQTtLQUNKLGdCQUFDLG9CQUFELEdBQ2dCO2FBQWY7S0FBQSxPQUVHO2FBQUgsVUFBVSxvQkFBZ0IsRUFBRTtLQUFBO0lBQUE7R0FBQTs7O0VBR2hDLG1DQUFVLG1CQUFXOzRCQUFWLHdFQUVpQixFQUFHLGVBQWE7O0VBSTVDLFFBQU0sWUFBVSIsImZpbGUiOiJUeXBlL1R5cGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
