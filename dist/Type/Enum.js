"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../control","../Object","../to-string","./Impl-Type","./Kind","./Method","./Type","../compare","./Type"],(exports,control_0,Object_1,to_45string_2,Impl_45Type_3,Kind_4,Method_5,Type_6,compare_7,Type_8)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(control_0),opr=_ms.get(_$0,"opr"),_$1=_ms.getModule(Object_1),p_43_33=_ms.get(_$1,"p+!"),to_45string=_ms.getDefaultExport(to_45string_2),Impl_45Type=_ms.getDefaultExport(Impl_45Type_3),_$2=_ms.getModule(Kind_4),kind_33=_ms.get(_$2,"kind!"),_$3=_ms.getModule(Method_5),impl_33=_ms.get(_$3,"impl!"),_$4=_ms.getModule(Type_6),contains_63=_ms.get(_$4,"contains?"),_$5=_ms.lazyGetModule(compare_7),_61_63=_ms.lazyProp(_$5,"=?"),_$6=_ms.lazyGetModule(Type_8),type_45of=_ms.lazyProp(_$6,"type-of");
		const Enum=(()=>{
			const _=class Enum{
				constructor(params){
					_ms.newProperty(this,"name",params.name);
					_ms.newProperty(this,"prototype",opr(params.prototype,_ms.lazy(()=>Object.create(Object.prototype))));
					_ms.newProperty(this,"values",params.values);
					for(let value_45name of this.values){
						const enum_45val=Object.create(this.prototype);
						_ms.newProperty(enum_45val,"name",value_45name);
						p_43_33(this,value_45name,enum_45val)
					};
					_ms.newProperty(this.prototype,"constructor",this);
					const enum_45name=this.name;
					impl_33(to_45string,this,function(){
						return `${enum_45name}.${this.name}`
					})
				}
				[_ms.symbol(contains_63)](_){
					const _this=this;
					return Object.prototype.isPrototypeOf.call(_this.prototype,_)
				}
			};
			kind_33(_,Impl_45Type);
			return _
		})();
		_ms.newProperty(Enum,"test",()=>{
			const Fruit=new (Enum)((()=>{
				const built={};
				built[`name`]="Fruit";
				const values=built.values=(()=>{
					const built=[];
					_ms.add(built,`apple`);
					_ms.add(built,`orange`);
					return built
				})();
				return built
			})());
			const prices=(()=>{
				const built=new (global.Map)();
				_ms.assoc(built,Fruit.apple,1);
				_ms.assoc(built,Fruit.orange,2);
				return built
			})();
			_ms.assert(_ms.unlazy(_61_63),_ms.sub(prices,Fruit.apple),1);
			_ms.assert(_ms.unlazy(_61_63),_ms.sub(prices,Fruit.orange),2);
			_ms.assert(_ms.unlazy(_61_63),_ms.unlazy(type_45of)(Fruit.apple),Fruit);
			_ms.assert(_ms.unlazy(_61_63),`Fruit.apple`,`${Fruit.apple}`)
		});
		const name=exports.name=`Enum`;
		exports.default=Enum;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvVHlwZS9FbnVtLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBWUEsV0FDVyxLQUNQO1NBREg7SUFPVyxZQUFBLE9BQ007cUJBQWhCLFlBQVE7cUJBQ1IsaUJBQWEsSUFBSSw4QkFhakI7cUJBWkEsY0FBVTtLQUVMLFFBQUEsZ0JBQWMsWUFDTztNQUF6QixpQkFTRCxjQVQwQjtzQkFDekIsa0JBQWdCO01BQ2hCLFFBQUksS0FBSyxhQUFXO0tBQUE7cUJBQ3JCLDZCQUF5QjtLQUN6QixrQkFBWTtLQUNaLFFBQU0sWUFBVSxLQUNPLFVBQUE7YUFBckIsR0FBQyxlQUFZOzs7SUFFaEIsWUFBQSxjQUFXLEVBQ0M7V0FBeUI7WUFBcEMsb0NBQW9DLGdCQUFXO0lBQUE7R0FBQTtHQXJCL0MsUUFBTSxFQUFFO1VBRFQ7RUFBQTtrQkF5QkQsWUFDYyxJQUFBO0dBQWIsWUFBUSxLQUFJLE1BQ0ksS0FBQTs7VUFBZixRQUFBO0lBQ0EsMEJBQ08sS0FBQTs7bUJBQUg7bUJBQ0E7Ozs7O0dBQ0wsYUFDUSxLQUFBOztvQkFBUCxZQUFlO29CQUNmLGFBQWdCOzs7eUNBQ04sT0FBTyxhQUFhO3lDQUNwQixPQUFPLGNBQWM7dURBQ1osYUFBYTtpQ0FDckIsY0FBYyxHQUFDOztFQWxENUIsd0JBQUE7a0JBWUEiLCJmaWxlIjoiVHlwZS9FbnVtLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=