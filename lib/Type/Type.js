"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../compare","./../js","./../private/bootstrap","./../to-string","./Impl-Type","./Method","./Trait","./../at/q","./../Object","./../to-string"],(exports,compare_0,js_1,bootstrap_2,to_45string_3,Impl_45Type_4,Method_5,Trait_6,_63_7,Object_8,to_45string_9)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_$1=_ms.getModule(js_1),id_61_63=_ms.get(_$1,"id=?"),_$2=_ms.getModule(bootstrap_2),containsImplSymbol=_ms.get(_$2,"containsImplSymbol"),msDef=_ms.get(_$2,"msDef"),to_45string=_ms.getDefaultExport(to_45string_3),Impl_45Type=_ms.getDefaultExport(Impl_45Type_4),Method=_ms.getDefaultExport(Method_5),_$3=_ms.getModule(Method_5),impl_33=_ms.get(_$3,"impl!"),Trait=_ms.getDefaultExport(Trait_6),_$4=_ms.lazyGetModule(_63_7),_63_45or=_ms.lazyProp(_$4,"?-or"),_$5=_ms.lazyGetModule(Object_8),_63property_45with_45proto=_ms.lazyProp(_$5,"?property-with-proto"),_$6=_ms.lazyGetModule(to_45string_9),inspect=_ms.lazyProp(_$6,"inspect");
		let Type=exports.default=_ms.trait("Type",[],{},{
			[_ms.symbol(_61_63)](other){
				let _this=this;
				return id_61_63(_this,other)
			},
			[_ms.symbol(to_45string)](){
				let _this=this;
				return _this.name
			}
		});
		impl_33(to_45string,Trait,function(){
			let _this=this;
			return _this.name
		});
		let has_45instance_63=exports["has-instance?"]=new (Method)((()=>{
			let built={};
			built.name="has-instance?";
			let args=built.args=["instance"];
			let impl_45symbol=built["impl-symbol"]=containsImplSymbol;
			return built
		})());
		msDef("hasInstance",has_45instance_63);
		let extract=exports.extract=_ms.method("extract",["candidate","num-extracteds"]);
		msDef("extract",extract);
		msDef("checkInstance",(expected_45type,value,value_45name)=>{
			if(! _ms.hasInstance(expected_45type,value))throw new (TypeError)((()=>{
				return `${value_45name} is no ${expected_45type.name}, is a ${type_45of(value).name}: ${_ms.unlazy(inspect)(value)}`
			})());
			return value
		});
		let _61_62=exports["=>"]=new (Method)((()=>{
			let built={};
			built.name="=>";
			let wrap=built.wrap=function wrap(impl,convert_45to_45type,converted,opts){
				return (()=>{
					let _=converted;
					if(_ms.hasInstance(convert_45to_45type,_)){
						return _
					} else {
						return impl.call(convert_45to_45type,_,opts)
					}
				})()
			};
			return built
		})());
		let type_45of=exports["type-of"]=function type_45of(_){
			return _ms.checkInstance(Impl_45Type,_ms.unlazy(_63_45or)(_ms.unlazy(_63property_45with_45proto)(_,"constructor"),Object),"returned value")
		};
		_ms.traitWithDefs(Impl_45Type,Type,{},{});
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvVHlwZS9UeXBlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBY0E7R0FHQyxZQUFBLFNBQUksTUFDSzs7V0FBUixTQUFLLE1BQUs7R0FBQTtHQUVYLFlBQUEsZUFDVzs7V0FBVjs7O0VBR0YsUUFBTSxZQUFVLE1BQ1EsVUFBQTs7VUFBdkI7O0VBRUQsK0NBQWUsS0FBSSxRQUNNLEtBQUE7O2NBQ3hCO0dBQ0Esb0JBQU0sQ0FBRTtHQUNSLHVDQUFhOzs7RUFDZCxNQUFPLGNBQVk7RUFHbkI7RUFTQSxNQUFPLFVBQVE7RUFFZixNQUFPLGdCQUFlLENBQUEsZ0JBQWMsTUFBTSxlQUNVO0dBQTVDLHFCQUFNLGdCQUFOLGFBQTBCLEtBQUksV0FDUyxLQUFBO1dBQTVDLEdBQUMsc0JBQW1CLDhCQUE2QixVQUFRLG9DQUF3Qjs7VUFDbkY7RUFBQTtFQUVELHlCQUFJLEtBQUksUUFDTSxLQUFBOztjQUdiO0dBQ0Esb0JBQU8sY0FBQSxLQUFLLG9CQUFnQixVQUFVLEtBQ0k7V0FBcEM7S0FBQSxNQUFBO0tBQ0osbUJBQUMsb0JBQUQsR0FDZ0I7YUFBZDtLQUFBLE9BRUU7YUFBSCxVQUFVLG9CQUFpQixFQUFDO0tBQUE7SUFBQTtHQUFBOzs7RUFHaEMsaUNBQVUsbUJBQVksRUFDQTs0QkFEWCx3RUFFa0IsRUFBRSxlQUFhOztvQkFJckMsWUFBVSIsImZpbGUiOiJUeXBlL1R5cGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
