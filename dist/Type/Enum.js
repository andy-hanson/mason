"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../at/at","../Obj","../Objbang","../show","../Str","./Impl-Type","./Kind","./Method","./Obj-Type","./Type","../bang","../compare","./Type"],function(exports,_64_0,Obj_1,Obj_33_2,show_3,Str_4,Impl_45Type_5,Kind_6,Method_7,Obj_45Type_8,Type_9,_33_10,compare_11,Type_12){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(_64_0),each_33=_ms.get(_$2,"each!"),Obj=_ms.getDefaultExport(Obj_1),_$4=_ms.getModule(Obj_33_2),p_43_33=_ms.get(_$4,"p+!"),show=_ms.getDefaultExport(show_3),Str=_ms.getDefaultExport(Str_4),Impl_45Type=_ms.getDefaultExport(Impl_45Type_5),_$8=_ms.getModule(Kind_6),kind_33=_ms.get(_$8,"kind!"),_$9=_ms.getModule(Method_7),impl_33=_ms.get(_$9,"impl!"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_8),_$11=_ms.getModule(Type_9),contains_63=_ms.get(_$11,"contains?"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_10)
		}),_$14=_ms.lazyGetModule(compare_11),_61_63=_ms.lazyProp(_$14,"=?"),_$15=_ms.lazyGetModule(Type_12),type_45of=_ms.lazyProp(_$15,"type-of");
		const exports={};
		const Enum=Obj_45Type(function(){
			const doc="A Concrete-Type with a small number of instances.\nGreat for using with `switch`.";
			const test=function(){
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
			};
			const props=function(){
				const displayName=Str;
				const prototype=Obj;
				const values=_ms.sub(Array,Str);
				return {
					displayName:displayName,
					prototype:prototype,
					values:values
				}
			}();
			const defaults=function(){
				const prototype=function(){
					return Obj.create(Obj.prototype)
				};
				return {
					prototype:prototype,
					displayName:"defaults"
				}
			}();
			const post_45construct=function(_enum){
				each_33(_enum.values,function(val_45name){
					const enum_45val=Obj.create(_enum.prototype);
					p_43_33(enum_45val,"name",val_45name);
					return p_43_33(_enum,val_45name,enum_45val)
				});
				p_43_33(_enum.prototype,"constructor",_enum);
				return impl_33(show,_enum,function(val){
					return (((""+_ms.show(_enum.displayName))+".")+_ms.show(val.name))
				})
			};
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
			return Obj.prototype.isPrototypeOf.call(_.prototype,value)
		});
		exports.default=Enum;
		const displayName=exports.displayName="Enum";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL0VudW0ubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2lDQWdCQTs7Ozs7RUFBQSxXQUFPLHFCQUNRO0dBQWQsVUFDQztHQUVELFdBQ08sVUFBQTtJQUFOLFlBQVEsZUFDSTtLQUFYLHVCQUNPO01BQU4sU0FBRztNQUNILFNBQUc7YUFERzs7WUFESTs7Ozs7SUFHWix1QkFDUTtLQUFQLFVBQUEsZ0JBQWU7S0FDZixVQUFBLGlCQUFnQjs7OytDQUNaLE9BQU8sYUFBYTsrQ0FDcEIsT0FBTyxjQUFjOzZEQUNaLGFBQWE7OENBQ3JCLENBWUksWUFaSCxjQUFlO0dBQUE7R0FDdkIsc0JBQ007SUFBTCxrQkFBYTtJQUNiLGdCQUFXO0lBQ1gscUJBQVEsTUFBTTtXQUZUOzs7Ozs7R0FHTix5QkFDUztJQUFSLGdCQUNZLFVBQUE7WUFBWCxXQUFXOztXQURKOzs7OztHQUVULHVCQUFpQixTQUFBLE1BQ0k7SUFBcEIsUUFBTSxhQUFhLFNBQUEsV0FDUTtLQUExQixpQkFBVyxXQUFXO0tBQ3RCLFFBQUksV0FBVSxPQUFNO1lBQ3BCLFFBQUksTUFBSyxXQUFTO0lBQUE7SUFDbkIsUUFBSSxnQkFBZ0IsY0FBYTtXQUNqQyxRQUFNLEtBQUssTUFBTSxTQUFBLElBQ0c7WUFBbEIsR0FIUSxZQUdQLGtDQUFtQjs7O1VBN0JUOzs7Ozs7Ozs7RUErQmYsUUFBTSxLQUFLO0VBRVgsUUFBTSxZQUFVLEtBQU0sU0FBQSxFQUFFLE1BQ0s7VUFBNUIsaUNBQWlDLFlBQVk7RUFBQTtrQkFFOUM7RUFyREEsc0NBQUEiLCJmaWxlIjoiVHlwZS9FbnVtLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=