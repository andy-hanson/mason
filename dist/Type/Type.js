"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../compare","./../js","./../private/bootstrap","./../to-string","./Impl-Type","./Kind","./Method","./../at/q","./../Object","./../to-string"],(exports,compare_0,js_1,bootstrap_2,to_45string_3,Impl_45Type_4,Kind_5,Method_6,_63_7,Object_8,to_45string_9)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_$1=_ms.getModule(js_1),id_61_63=_ms.get(_$1,"id=?"),_$2=_ms.getModule(bootstrap_2),ms=_ms.get(_$2,"ms"),msDef=_ms.get(_$2,"msDef"),to_45string=_ms.getDefaultExport(to_45string_3),Impl_45Type=_ms.getDefaultExport(Impl_45Type_4),Kind=_ms.getDefaultExport(Kind_5),_$3=_ms.getModule(Kind_5),kind_33=_ms.get(_$3,"kind!"),Method=_ms.getDefaultExport(Method_6),_$4=_ms.getModule(Method_6),impl_33=_ms.get(_$4,"impl!"),_$5=_ms.lazyGetModule(_63_7),_63_45or=_ms.lazyProp(_$5,"?-or"),_$6=_ms.lazyGetModule(Object_8),_63property_45with_45proto=_ms.lazyProp(_$6,"?property-with-proto"),_$7=_ms.lazyGetModule(to_45string_9),inspect=_ms.lazyProp(_$7,"inspect");
		const Type=exports.default=new (Kind)((()=>{
			const built={};
			built.name="Type";
			return built
		})());
		impl_33(to_45string,Type,function(){
			const _this=this;
			return _this.name
		});
		impl_33(to_45string,Kind,function(){
			const _this=this;
			return _this.name
		});
		impl_33(_61_63,Type,function(other){
			const _this=this;
			return id_61_63(_this,other)
		});
		const contains_63=exports["contains?"]=ms.contains;
		const extract=exports.extract=new (Method)((()=>{
			const built={};
			built.name="extract";
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,`type`);
				_ms.add(built,`candidate`);
				_ms.add(built,[`num-extracteds`,Number]);
				return built
			})();
			return built
		})());
		msDef(`extract`,extract);
		msDef(`checkContains`,(type,value,value_45name)=>{
			if(! _ms.contains(type,value))throw new (Error)(`${value_45name} is no ${type.name}, is a ${type_45of(value).name}: ${_ms.unlazy(inspect)(value)}`);
			return value
		});
		const _61_62=exports["=>"]=new (Method)((()=>{
			const built={};
			built.name="=>";
			const wrap=built.wrap=function wrap(impl,type,converted,opts){
				return (()=>{
					const _=converted;
					if(_ms.contains(type,_)){
						return _
					} else {
						return impl.call(type,_,opts)
					}
				})()
			};
			return built
		})());
		const type_45of=exports["type-of"]=function type_45of(_){
			return _ms.checkContains(Impl_45Type,_ms.unlazy(_63_45or)(_ms.unlazy(_63property_45with_45proto)(_,`constructor`),Object),"returned value")
		};
		kind_33(Impl_45Type,Type);
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvVHlwZS9UeXBlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBYUEsMkJBQU0sS0FBSSxNQUNJLEtBQUE7O2NBRWI7OztFQUVELFFBQU0sWUFBVSxLQUNPO1NBTWpCO1VBQUE7O0VBSk4sUUFBTSxZQUFVLEtBQ087U0FHakI7VUFBQTs7RUFETixRQUFNLE9BQUcsS0FBTyxTQUFBO1NBQ1Y7VUFBTCxTQUFLLE1BQUs7RUFBQTtFQUdYLHVDQUFXO0VBRVgsOEJBQVMsS0FBSSxRQUNNLEtBQUE7O2NBTWxCO0dBQ0Esc0JBQ0ssS0FBQTs7a0JBQUQ7a0JBQ0E7a0JBRUQsQ0FBRSxpQkFBZ0I7Ozs7O0VBRXRCLE1BQU8sVUFBUztFQUVoQixNQUFPLGdCQUFnQixDQUFBLEtBQUssTUFBTTtHQUN6QixrQkFBTSxLQUFOLHlCQUFtQixHQUFDLHNCQUFtQixtQkFBbUIsVUFBUSxvQ0FBdUI7VUFDakc7RUFBQTtFQUVELDJCQUFJLEtBQUksUUFDTSxLQUFBOztjQUdiO0dBQ0Esc0JBQU8sY0FBQSxLQUFLLEtBQUssVUFBVTtXQUNyQjtLQUFBLFFBQUE7S0FDSixnQkFBQyxLQUFELEdBQ0s7YUFBSjtLQUFBLE9BRUc7YUFBSCxVQUFVLEtBQUssRUFBRTtLQUFBO0lBQUE7R0FBQTs7O0VBR3JCLG1DQUFVLG1CQUFXOzRCQUFWLHdFQUVpQixFQUFHLGVBQWM7O0VBRzVDLFFBQU0sWUFBVSIsImZpbGUiOiJUeXBlL1R5cGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
