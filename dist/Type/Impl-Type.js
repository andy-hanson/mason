"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Kind","./Obj-Type","../compare","../Objectbang","./Kind","./Method","./Type"],function(exports,Kind_0,Obj_45Type_1,compare_2,Object_33_3,Kind_4,Method_5,Type_6){
	exports._get=_ms.lazy(function(){
		const Kind=_ms.getDefaultExport(Kind_0),_$2=_ms.getModule(Kind_0),kind_33=_ms.get(_$2,"kind!"),unchecked_45kind_33=_ms.get(_$2,"unchecked-kind!"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_1),_$5=_ms.lazyGetModule(compare_2),_61_63=_ms.lazyProp(_$5,"=?"),_$6=_ms.lazyGetModule(Object_33_3),empty_45Object_33=_ms.lazyProp(_$6,"empty-Object!"),_$7=_ms.lazyGetModule(Kind_4),kind_63=_ms.lazyProp(_$7,"kind?"),_$8=_ms.lazyGetModule(Method_5),impl_33=_ms.lazyProp(_$8,"impl!"),_$9=_ms.lazyGetModule(Type_6),contains_63=_ms.lazyProp(_$9,"contains?");
		const Impl_45Type=Kind(function(){
			const built={};
			const doc=built.doc=`TODO:REST\nEvery Impl-Type should have a \`prototype\` property.`;
			const test=built.test=function test(){
				const A=Kind(function(){
					const built={};
					const doc=built.doc=`A`;
					return _ms.setName(built,"A")
				}());
				const B=Kind(function(){
					const built={};
					const doc=built.doc=`B`;
					return _ms.setName(built,"B")
				}());
				const C=Obj_45Type(function(){
					const built={};
					const props=built.props=function(){
						const built={};
						const c=built.c=null;
						return _ms.setName(built,"props")
					}();
					return _ms.setName(built,"C")
				}());
				kind_33(B,A);
				kind_33(C,B);
				_ms.assert(_ms.unlazy(kind_63),B,A);
				_ms.assert(_ms.unlazy(kind_63),C,B);
				_ms.assert(_ms.unlazy(kind_63),C,A);
				_ms.assertNot(_ms.unlazy(kind_63),A,B)
			};
			return _ms.setName(built,"Impl-Type")
		}());
		unchecked_45kind_33(Obj_45Type,Impl_45Type);
		unchecked_45kind_33(Function,Impl_45Type);
		kind_33(Kind,Impl_45Type);
		const Self_45Type=exports["Self-Type"]=Obj_45Type(function(){
			const built={};
			const doc=built.doc=`Impl-Type with exactly one member.\nCalling impl! on it will directly modify an Object to contain method implementations.`;
			const props=built.props=function(){
				const built={};
				const prototype=built.prototype=Object;
				return _ms.setName(built,"props")
			}();
			const test=built.test=function test(){
				const x=_ms.unlazy(empty_45Object_33)();
				_ms.unlazy(impl_33)(_ms.unlazy(contains_63),self_45type(x),function(){
					return 1
				});
				_ms.assert(_ms.unlazy(_61_63),_ms.unlazy(contains_63)(x),1)
			};
			return _ms.setName(built,"Self-Type")
		}());
		kind_33(Self_45Type,Impl_45Type);
		const self_45type=exports["self-type"]=function self_45type(_){
			_ms.checkContains(Object,_,"_");
			return Self_45Type({
				prototype:_
			})
		};
		const name=exports.name=`Impl-Type`;
		exports.default=Impl_45Type;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL0ltcGwtVHlwZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVVBLGtCQUFXLGVBQ0k7O0dBQWQsb0JBQ0M7R0FFRCxzQkFDUSxlQUFBO0lBQVAsUUFBSSxlQUNJOztLQUFQLG9CQUFNOzs7SUFDUCxRQUFJLGVBQ0k7O0tBQVAsb0JBQU07OztJQUNQLFFBQUkscUJBQ1E7O0tBQVgsa0NBQ007O01BQUwsZ0JBQUE7Ozs7O0lBQ0YsUUFBTSxFQUFFO0lBQ1IsUUFBTSxFQUFFO21DQUNNLEVBQUU7bUNBQ0YsRUFBRTttQ0FDRixFQUFFO3NDQUNGLEVBQUU7R0FBQTs7O0VBRWxCLG9CQUFnQixXQUFTO0VBQ3pCLG9CQUFnQixTQUFTO0VBQ3pCLFFBQU0sS0FBSztFQUlWLHVDQUFXLHFCQUNROztHQUFsQixvQkFDQztHQUVELGtDQUNNOztJQUFMLGdDQUFXOzs7R0FDWixzQkFDUSxlQUFBO0lBQVA7Z0RBQ2lCLFlBQVUsR0FDSSxVQUFBO1lBQTlCO0lBQUE7MERBQ3FCLEdBQUc7R0FBQTs7O0VBRTNCLFFBQU0sWUFBVTtFQUVoQix1Q0FBWSxxQkFBQSxFQUNRO3FCQUROO1VBQ2IsWUFBVTtjQUFZO0dBQUE7RUFBQTtFQWxEeEIsd0JBQUE7a0JBVUEiLCJmaWxlIjoiVHlwZS9JbXBsLVR5cGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==