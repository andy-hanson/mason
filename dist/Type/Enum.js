"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../at/at","../Objectbang","../show","./Impl-Type","./Kind","./Method","./Obj-Type","./Type","../bang","../compare","./Type"],function(exports,_64_0,Object_33_1,show_2,Impl_45Type_3,Kind_4,Method_5,Obj_45Type_6,Type_7,_33_8,compare_9,Type_10){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(_64_0),each_33=_ms.get(_$2,"each!"),_$3=_ms.getModule(Object_33_1),p_43_33=_ms.get(_$3,"p+!"),show=_ms.getDefaultExport(show_2),Impl_45Type=_ms.getDefaultExport(Impl_45Type_3),_$6=_ms.getModule(Kind_4),kind_33=_ms.get(_$6,"kind!"),_$7=_ms.getModule(Method_5),impl_33=_ms.get(_$7,"impl!"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_6),_$9=_ms.getModule(Type_7),contains_63=_ms.get(_$9,"contains?"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_8)
		}),_$12=_ms.lazyGetModule(compare_9),_61_63=_ms.lazyProp(_$12,"=?"),_$13=_ms.lazyGetModule(Type_10),type_45of=_ms.lazyProp(_$13,"type-of");
		const Enum=Obj_45Type(function(){
			const doc="A Concrete-Type with a small number of instances.\nGreat for using with `switch`.";
			const test=function(){
				return _ms.set(function(){
					const Fruit=Enum(function(){
						const values=function(){
							const _0="apple";
							const _1="orange";
							return [_0,_1]
						}();
						return {
							values:values,
							displayName:"Fruit"
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
				},"displayName","test")
			}();
			const props=function(){
				const displayName=String;
				const prototype=Object;
				const values=_ms.sub(Array,String);
				return {
					displayName:displayName,
					prototype:prototype,
					values:values
				}
			}();
			const defaults=function(){
				const prototype=function(){
					return _ms.set(function(){
						return Object.create(Object.prototype)
					},"displayName","prototype")
				}();
				return {
					prototype:prototype,
					displayName:"defaults"
				}
			}();
			const post_45construct=function(){
				return _ms.set(function(_enum){
					each_33(_enum.values,function(val_45name){
						const enum_45val=Object.create(_enum.prototype);
						p_43_33(enum_45val,"name",val_45name);
						return p_43_33(_enum,val_45name,enum_45val)
					});
					p_43_33(_enum.prototype,"constructor",_enum);
					return impl_33(show,_enum,function(val){
						return (((""+_ms.show(_enum.displayName))+".")+_ms.show(val.name))
					})
				},"displayName","post-construct")
			}();
			return {
				doc:doc,
				test:test,
				props:props,
				defaults:defaults,
				"post-construct":post_45construct,
				displayName:"Enum"
			}
		}());
		kind_33(Enum,Impl_45Type);
		impl_33(contains_63,Enum,function(_,value){
			return Object.prototype.isPrototypeOf.call(_.prototype,value)
		});
		const displayName=exports.displayName="Enum";
		exports.default=Enum;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL0VudW0ubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQWNBLFdBQU8scUJBQ1E7R0FBZCxVQUNDO0dBRUQscUJBQ087bUJBQUEsVUFBQTtLQUFOLFlBQVEsZUFDSTtNQUFYLHVCQUNPO09BQU4sU0FBRztPQUNILFNBQUc7Ozs7Ozs7O0tBQ0wsdUJBQ1E7TUFBUCxVQUFBLGdCQUFlO01BQ2YsVUFBQSxpQkFBZ0I7OztnREFDWixPQUFPLGFBQWE7Z0RBQ3BCLE9BQU8sY0FBYzs4REFDWixhQUFhOytDQUNyQixDQWNJLFlBZEgsY0FBZTtJQUFBOztHQUN2QixzQkFDTTtJQUFMLGtCQUFhO0lBQ2IsZ0JBQVc7SUFDWCxxQkFBUSxNQUFNOzs7Ozs7O0dBQ2YseUJBQ1M7SUFBUiwwQkFDWTtvQkFBQSxVQUFBO2FBQVgsY0FBYzs7Ozs7Ozs7R0FDaEIsaUNBQWlCO21CQUFBLFNBQUEsTUFDSTtLQUFwQixRQUFNLGFBQWEsU0FBQSxXQUNRO01BQTFCLGlCQUFXLGNBQWM7TUFDekIsUUFBSSxXQUFVLE9BQU07YUFDcEIsUUFBSSxNQUFLLFdBQVM7S0FBQTtLQUNuQixRQUFJLGdCQUFnQixjQUFhO1lBQ2pDLFFBQU0sS0FBSyxNQUFNLFNBQUEsSUFDRzthQUFsQixHQURRLFlBQ1Asa0NBQW1COzs7Ozs7Ozs7Ozs7O0VBRXhCLFFBQU0sS0FBSztFQUVYLFFBQU0sWUFBVSxLQUFNLFNBQUEsRUFBRSxNQUNLO1VBQTVCLG9DQUFvQyxZQUFZO0VBQUE7RUFqRGpELHNDQUFBO2tCQW1EQSIsImZpbGUiOiJUeXBlL0VudW0uanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==