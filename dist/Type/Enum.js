"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Objectbang","../show","./Impl-Type","./Kind","./Method","./Obj-Type","./Type","../bang","../compare","./Type"],function(exports,Object_33_0,show_1,Impl_45Type_2,Kind_3,Method_4,Obj_45Type_5,Type_6,_33_7,compare_8,Type_9){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Object_33_0),p_43_33=_ms.get(_$2,"p+!"),show=_ms.getDefaultExport(show_1),Impl_45Type=_ms.getDefaultExport(Impl_45Type_2),_$5=_ms.getModule(Kind_3),kind_33=_ms.get(_$5,"kind!"),_$6=_ms.getModule(Method_4),impl_33=_ms.get(_$6,"impl!"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_5),_$8=_ms.getModule(Type_6),contains_63=_ms.get(_$8,"contains?"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_7)
		}),_$11=_ms.lazyGetModule(compare_8),_61_63=_ms.lazyProp(_$11,"=?"),_$12=_ms.lazyGetModule(Type_9),type_45of=_ms.lazyProp(_$12,"type-of");
		const Enum=Obj_45Type(function(){
			const built={};
			const doc=built.doc="A Concrete-Type with a small number of instances.\nGreat for using with `switch`.";
			const test=built.test=function test(){
				const Fruit=Enum(function(){
					const built={};
					const values=built.values=function(){
						const built=[];
						_ms.add(built,"apple");
						_ms.add(built,"orange");
						return built
					}();
					return _ms.setName(built,"Fruit")
				}());
				const prices=function(){
					const built=new global.Map();
					_ms.assoc(built,Fruit.apple,1);
					_ms.assoc(built,Fruit.orange,2);
					return built
				}();
				_ms.unlazy(_33)(_ms.unlazy(_61_63),_ms.sub(prices,Fruit.apple),1);
				_ms.unlazy(_33)(_ms.unlazy(_61_63),_ms.sub(prices,Fruit.orange),2);
				_ms.unlazy(_33)(_ms.unlazy(_61_63),_ms.unlazy(type_45of)(Fruit.apple),Fruit);
				_ms.unlazy(_33)(_ms.unlazy(_61_63),(""+_ms.show(Fruit.apple)),"Fruit.apple")
			};
			const props=built.props=function(){
				const built={};
				const name=built.name=String;
				const prototype=built.prototype=Object;
				const values=built.values=_ms.sub(Array,String);
				return built
			}();
			const defaults=built.defaults=function(){
				const built={};
				const prototype=built.prototype=function prototype(){
					return Object.create(Object.prototype)
				};
				return _ms.setName(built,"defaults")
			}();
			const post_45construct=built["post-construct"]=function post_45construct(_enum){
				for(let value_45name of _enum.values[Symbol.iterator]()){
					const enum_45val=Object.create(_enum.prototype);
					p_43_33(enum_45val,"name",value_45name);
					p_43_33(_enum,value_45name,enum_45val)
				};
				p_43_33(_enum.prototype,"constructor",_enum);
				impl_33(show,_enum,function(val){
					return (((""+_ms.show(_enum.name))+".")+_ms.show(val.name))
				})
			};
			return _ms.setName(built,"Enum")
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL0VudW0ubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQWFBLFdBQU0scUJBQ1E7O0dBQWIsb0JBQ0M7R0FFRCxzQkFDUSxlQUFBO0lBQVAsWUFBUSxlQUNJOztLQUFYLG9DQUNPOztvQkFBSDtvQkFDQTs7Ozs7SUFDTCx1QkFDUTs7cUJBQVAsWUFBZTtxQkFDZixhQUFnQjs7OytDQUNaLE9BQU8sYUFBYTsrQ0FDcEIsT0FBTyxjQUFjOzZEQUNaLGFBQWE7dUNBQ3JCLENBNEZXLFlBNUZWLGNBQWU7R0FBQTtHQUN2QixrQ0FDTTs7SUFBTCxzQkFBTTtJQUNOLGdDQUFXO0lBQ1gsa0NBQVEsTUFBTTs7O0dBQ2Ysd0NBQ1M7O0lBQVIsZ0NBQ1ksb0JBQUE7WUFBWCxjQUFjOzs7O0dBQ2hCLCtDQUFrQiwwQkFBQSxNQUNJO0lBQWhCLFFBQUEsZ0JBQWMsZ0NBQ1c7S0FBN0IsaUJBQVcsY0FBYztLQUN6QixRQUFJLFdBQVUsT0FBTTtLQUNwQixRQUFJLE1BQUssYUFBVztJQUFBO0lBQ3JCLFFBQUksZ0JBQWdCLGNBQWE7SUFDakMsUUFBTSxLQUFLLE1BQU0sU0FBQSxJQUNHO1lBQWxCLEdBNkVlLFlBN0VkLDJCQUFZOzs7OztFQUVqQixRQUFNLEtBQUs7RUFFWCxRQUFNLFlBQVUsS0FBTSxTQUFBLEVBQUUsTUFDSztVQUE1QixvQ0FBb0MsWUFBWTtFQUFBO0VBaERqRCx3QkFBQTtrQkFhQSIsImZpbGUiOiJUeXBlL0VudW0uanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==