"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Objectbang","../show","./Impl-Type","./Kind","./Method","./Obj-Type","./Type","../bang","../compare","./Type"],function(exports,Object_33_0,show_1,Impl_45Type_2,Kind_3,Method_4,Obj_45Type_5,Type_6,_33_7,compare_8,Type_9){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Object_33_0),p_43_33=_$2["p+!"],show=_ms.getDefaultExport(show_1),Impl_45Type=_ms.getDefaultExport(Impl_45Type_2),_$5=_ms.getModule(Kind_3),kind_33=_$5["kind!"],_$6=_ms.getModule(Method_4),impl_33=_$6["impl!"],Obj_45Type=_ms.getDefaultExport(Obj_45Type_5),_$8=_ms.getModule(Type_6),contains_63=_$8["contains?"],_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_7)
		}),_$11=_ms.lazyGetModule(compare_8),_61_63=_ms.lazyProp(_$11,"=?"),_$12=_ms.lazyGetModule(Type_9),type_45of=_ms.lazyProp(_$12,"type-of");
		const Enum=Obj_45Type(function(){
			const doc="A Concrete-Type with a small number of instances.\nGreat for using with `switch`.";
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
				for(let value_45name of _ms.iterator(_enum.values)){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL0VudW0ubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQWFBLFdBQU8scUJBQ1E7R0FBZCxVQUNDO0dBY0Qsc0JBQ007SUFBTCxXQUFNO0lBQ04sZ0JBQVc7SUFDWCxxQkFBUSxNQUFNOzs7Ozs7O0dBQ2YseUJBQ1M7SUFBUixnQkFDWSxvQkFBQTtZQUFYLGNBQWM7Ozs7Ozs7R0FDaEIsdUJBQWlCLDBCQUFBLE1BQ0k7SUFBZixRQUFBLDZCQUFjLGNBQ1c7S0FBN0IsaUJBQVcsY0FBYztLQUN6QixRQUFJLFdBQVUsT0FBTTtLQUNwQixRQUFJLE1BQUssYUFBVztJQUFBO0lBQ3JCLFFBQUksZ0JBQWdCLGNBQWE7V0FDakMsUUFBTSxLQUFLLE1BQU0sU0FBQSxJQUNHO1lBQWxCLEdBQVEsWUFBUCwyQkFBWTs7Ozs7Ozs7Ozs7RUFFakIsUUFBTSxLQUFLO0VBRVgsUUFBTSxZQUFVLEtBQU0sU0FBQSxFQUFFLE1BQ0s7VUFBNUIsb0NBQW9DLFlBQVk7RUFBQTtFQWhEakQsd0JBQUE7a0JBa0RBIiwiZmlsZSI6IlR5cGUvRW51bS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9