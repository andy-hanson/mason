"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Object","../show","./Impl-Type","./Kind","./Method","./Obj-Type","./Type","../compare","./Type"],(exports,Object_0,show_1,Impl_45Type_2,Kind_3,Method_4,Obj_45Type_5,Type_6,compare_7,Type_8)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(Object_0),p_43_33=_ms.get(_$2,"p+!"),show=_ms.getDefaultExport(show_1),Impl_45Type=_ms.getDefaultExport(Impl_45Type_2),_$5=_ms.getModule(Kind_3),kind_33=_ms.get(_$5,"kind!"),_$6=_ms.getModule(Method_4),impl_33=_ms.get(_$6,"impl!"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_5),_$8=_ms.getModule(Type_6),contains_63=_ms.get(_$8,"contains?"),_$10=_ms.lazyGetModule(compare_7),_61_63=_ms.lazyProp(_$10,"=?"),_$11=_ms.lazyGetModule(Type_8),type_45of=_ms.lazyProp(_$11,"type-of");
		const Enum=Obj_45Type(()=>{
			const built={};
			const doc=built.doc=`A Concrete-Type with a small number of instances.\nGreat for using with \`switch\`.`;
			const test=built.test=function test(){
				const Fruit=Enum(()=>{
					const built={};
					const values=built.values=()=>{
						const built=[];
						_ms.add(built,`apple`);
						_ms.add(built,`orange`);
						return built
					}();
					return _ms.setName(built,"Fruit")
				}());
				const prices=()=>{
					const built=new global.Map();
					_ms.assoc(built,Fruit.apple,1);
					_ms.assoc(built,Fruit.orange,2);
					return built
				}();
				_ms.assert(_ms.unlazy(_61_63),_ms.sub(prices,Fruit.apple),1);
				_ms.assert(_ms.unlazy(_61_63),_ms.sub(prices,Fruit.orange),2);
				_ms.assert(_ms.unlazy(_61_63),_ms.unlazy(type_45of)(Fruit.apple),Fruit);
				_ms.assert(_ms.unlazy(_61_63),`${_ms.show(Fruit.apple)}`,`Fruit.apple`)
			};
			const props=built.props=()=>{
				const built={};
				const name=built.name=String;
				const prototype=built.prototype=Object;
				const values=built.values=_ms.sub(Array,String);
				return built
			}();
			const defaults=built.defaults=()=>{
				const built={};
				const prototype=built.prototype=function prototype(){
					return Object.create(Object.prototype)
				};
				return _ms.setName(built,"defaults")
			}();
			const post_45construct=built["post-construct"]=function post_45construct(_){
				for(let value_45name of _.values){
					const enum_45val=Object.create(_.prototype);
					_ms.newProperty(enum_45val,"name",value_45name);
					p_43_33(_,value_45name,enum_45val)
				};
				_ms.newProperty(_.prototype,"constructor",_);
				impl_33(show,_,function(){
					const _this=this;
					return `${_ms.show(_.name)}.${_ms.show(_this.name)}`
				})
			};
			return _ms.setName(built,"Enum")
		}());
		kind_33(Enum,Impl_45Type);
		impl_33(contains_63,Enum,function(value){
			const _this=this;
			return Object.prototype.isPrototypeOf.call(_this.prototype,value)
		});
		const name=exports.name=`Enum`;
		exports.default=Enum;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL0VudW0ubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFZQSxXQUFNLGVBQ1E7O0dBQWIsb0JBQ0M7R0FFRCxzQkFDUSxlQUFBO0lBQVAsWUFBUSxTQUNJOztLQUFYLDhCQUNPOztvQkFBSDtvQkFDQTs7Ozs7SUFDTCxpQkFDUTs7cUJBQVAsWUFBZTtxQkFDZixhQUFnQjs7OzBDQUNOLE9BQU8sYUFBYTswQ0FDcEIsT0FBTyxjQUFjO3dEQUNaLGFBQWE7a0NBQ3JCLFlBQUMsZUFBZTs7R0FDN0IsNEJBQ007O0lBQUwsc0JBQU07SUFDTixnQ0FBVztJQUNYLGtDQUFRLE1BQU07OztHQUNmLGtDQUNTOztJQUFSLGdDQUNZLG9CQUFBO1lBQVgsY0FBYzs7OztHQUNoQiwrQ0FBa0IsMEJBQUEsRUFDQztJQUFiLFFBQUEsZ0JBQWMsU0FDUTtLQUExQixpQkFBVyxjQUFjO3FCQUN6QixrQkFBZ0I7S0FDaEIsUUFBSSxFQUFFLGFBQVc7SUFBQTtvQkFDbEIsMEJBQTBCO0lBQzFCLFFBQU0sS0FBSyxFQUNJLFVBQUE7O1lBQWIsWUFBQyxvQkFBUzs7Ozs7RUFFZCxRQUFNLEtBQUs7RUFFWCxRQUFNLFlBQVUsS0FBTyxTQUFBLE1BQ0s7O1VBQTNCLG9DQUFvQyxnQkFBVztFQUFBO0VBL0NoRCx3QkFBQTtrQkFZQSIsImZpbGUiOiJUeXBlL0VudW0uanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==