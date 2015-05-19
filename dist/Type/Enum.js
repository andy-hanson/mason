"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Objectbang","../show","./Impl-Type","./Kind","./Method","./Obj-Type","./Type","../bang","../compare","./Type"],function(exports,Object_33_0,show_1,Impl_45Type_2,Kind_3,Method_4,Obj_45Type_5,Type_6,_33_7,compare_8,Type_9){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Object_33_0),p_43_33=_ms.get(_$2,"p+!"),show=_ms.getDefaultExport(show_1),Impl_45Type=_ms.getDefaultExport(Impl_45Type_2),_$5=_ms.getModule(Kind_3),kind_33=_ms.get(_$5,"kind!"),_$6=_ms.getModule(Method_4),impl_33=_ms.get(_$6,"impl!"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_5),_$8=_ms.getModule(Type_6),contains_63=_ms.get(_$8,"contains?"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_7)
		}),_$11=_ms.lazyGetModule(compare_8),_61_63=_ms.lazyProp(_$11,"=?"),_$12=_ms.lazyGetModule(Type_9),type_45of=_ms.lazyProp(_$12,"type-of");
		const Enum=Obj_45Type(function(){
			const doc="A Concrete-Type with a small number of instances.\nGreat for using with `switch`.";
			const test=function test(){
				const Fruit=Enum(function(){
					const values=function(){
						const _0="apple";
						const _1="orange";
						return [_0,_1]
					}();
					return {
						values:values,
						name:"Fruit"
					}
				}());
				const prices=function(){
					const _k0=Fruit.apple,_v0=1;
					const _k1=Fruit.orange,_v1=2;
					return _ms.map(_k0,_v0,_k1,_v1)
				}();
				_ms.unlazy(_33)(_ms.unlazy(_61_63),_ms.sub(prices,Fruit.apple),1);
				_ms.unlazy(_33)(_ms.unlazy(_61_63),_ms.sub(prices,Fruit.orange),2);
				_ms.unlazy(_33)(_ms.unlazy(_61_63),_ms.unlazy(type_45of)(Fruit.apple),Fruit);
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),(""+_ms.show(Fruit.apple)),"Fruit.apple")
			};
			const props=function(){
				const name=String;
				const prototype=Object;
				const values=_ms.sub(Array,String);
				return {
					name:name,
					prototype:prototype,
					values:values
				}
			}();
			const defaults=function(){
				const prototype=function prototype(){
					return Object.create(Object.prototype)
				};
				return {
					prototype:prototype,
					name:"defaults"
				}
			}();
			const post_45construct=function post_45construct(_enum){
				for(let value_45name of _enum.values[Symbol.iterator]()){
					const enum_45val=Object.create(_enum.prototype);
					p_43_33(enum_45val,"name",value_45name);
					p_43_33(_enum,value_45name,enum_45val)
				};
				p_43_33(_enum.prototype,"constructor",_enum);
				return impl_33(show,_enum,function(val){
					return (((""+_ms.show(_enum.name))+".")+_ms.show(val.name))
				})
			};
			return {
				doc:doc,
				test:test,
				props:props,
				defaults:defaults,
				"post-construct":post_45construct,
				name:"Enum"
			}
		}());
		kind_33(Enum,Impl_45Type);
		impl_33(contains_63,Enum,function(_,value){
			return Object.prototype.isPrototypeOf.call(_.prototype,value)
		});
		const name=exports.name="Enum";
		exports.default=Enum;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL0VudW0ubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQWFBLFdBQU8scUJBQ1E7R0FBZCxVQUNDO0dBRUQsV0FDTyxlQUFBO0lBQU4sWUFBUSxlQUNJO0tBQVgsdUJBQ087TUFBTixTQUFHO01BQ0gsU0FBRzs7Ozs7Ozs7SUFDTCx1QkFDUTtLQUFQLFVBQUEsZ0JBQWU7S0FDZixVQUFBLGlCQUFnQjs7OytDQUNaLE9BQU8sYUFBYTsrQ0FDcEIsT0FBTyxjQUFjOzZEQUNaLGFBQWE7OENBQ3JCLENBb0JNLFlBcEJMLGNBQWU7R0FBQTtHQUN2QixzQkFDTTtJQUFMLFdBQU07SUFDTixnQkFBVztJQUNYLHFCQUFRLE1BQU07Ozs7Ozs7R0FDZix5QkFDUztJQUFSLGdCQUNZLG9CQUFBO1lBQVgsY0FBYzs7Ozs7OztHQUNoQix1QkFBaUIsMEJBQUEsTUFDSTtJQUFmLFFBQUEsZ0JBQWMsZ0NBQ1c7S0FBN0IsaUJBQVcsY0FBYztLQUN6QixRQUFJLFdBQVUsT0FBTTtLQUNwQixRQUFJLE1BQUssYUFBVztJQUFBO0lBQ3JCLFFBQUksZ0JBQWdCLGNBQWE7V0FDakMsUUFBTSxLQUFLLE1BQU0sU0FBQSxJQUNHO1lBQWxCLEdBS1UsWUFMVCwyQkFBWTs7Ozs7Ozs7Ozs7O0VBRWpCLFFBQU0sS0FBSztFQUVYLFFBQU0sWUFBVSxLQUFNLFNBQUEsRUFBRSxNQUNLO1VBQTVCLG9DQUFvQyxZQUFZO0VBQUE7RUFoRGpELHdCQUFBO2tCQWtEQSIsImZpbGUiOiJUeXBlL0VudW0uanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==