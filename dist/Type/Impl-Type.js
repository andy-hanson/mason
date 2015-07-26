"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Kind","../compare","../Object","./Method","./Type","./Kind"],(exports,Kind_0,compare_1,Object_2,Method_3,Type_4,Kind_5)=>{
	exports._get=_ms.lazy(()=>{
		const Kind=_ms.getDefaultExport(Kind_0),_$2=_ms.getModule(Kind_0),kind_33=_ms.get(_$2,"kind!"),unchecked_45kind_33=_ms.get(_$2,"unchecked-kind!"),_$4=_ms.lazyGetModule(compare_1),_61_63=_ms.lazyProp(_$4,"=?"),_$5=_ms.lazyGetModule(Object_2),empty_45Object_33=_ms.lazyProp(_$5,"empty-Object!"),_$6=_ms.lazyGetModule(Method_3),impl_33=_ms.lazyProp(_$6,"impl!"),_$7=_ms.lazyGetModule(Type_4),contains_63=_ms.lazyProp(_$7,"contains?"),_$9=_ms.lazyGetModule(Kind_5),kind_63=_ms.lazyProp(_$9,"kind?");
		const Impl_45Type=new (Kind)(()=>{
			const built={};
			const doc=built.doc=`TODO:REST\nEvery Impl-Type should have a \`prototype\` property.`;
			const test=built.test=function test(){
				const A=Kind(()=>{
					const built={};
					const doc=built.doc=`A`;
					return _ms.setName(built,"A")
				}());
				const B=Kind(()=>{
					const built={};
					const doc=built.doc=`B`;
					return _ms.setName(built,"B")
				}());
				const C=class C{
					dummy(){
						const _this=this;
						return _this
					}
				};
				kind_33(B,A);
				kind_33(C,B);
				_ms.assert(_ms.unlazy(kind_63),B,A);
				_ms.assert(_ms.unlazy(kind_63),C,B);
				_ms.assert(_ms.unlazy(kind_63),C,A);
				_ms.assertNot(_ms.unlazy(kind_63),A,B)
			};
			return _ms.setName(built,"Impl-Type")
		}());
		unchecked_45kind_33(Function,Impl_45Type);
		kind_33(Kind,Impl_45Type);
		const Self_45Type=exports["Self-Type"]=()=>{
			const _=class Self_45Type{
				constructor(prototype){
					_ms.checkContains(Object,prototype,"prototype");
					_ms.newProperty(this,"prototype",prototype)
				}
			};
			kind_33(_,Impl_45Type);
			return _
		}();
		_ms.newProperty(Self_45Type,"test",()=>{
			const x=_ms.unlazy(empty_45Object_33)();
			_ms.unlazy(impl_33)(_ms.unlazy(contains_63),new (Self_45Type)(x),()=>{
				return 1
			});
			_ms.assert(_ms.unlazy(_61_63),_ms.unlazy(contains_63)(x),1)
		});
		const name=exports.name=`Impl-Type`;
		exports.default=Impl_45Type;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL0ltcGwtVHlwZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVVBLGtCQUFXLEtBQUksVUFDSTs7R0FBbEIsb0JBQ0M7R0FFRCxzQkFDUSxlQUFBO0lBQVAsUUFBSSxTQUNJOztLQUFQLG9CQUFNOzs7SUFDUCxRQUFJLFNBQ0k7O0tBQVAsb0JBQU07OztJQUNQLFFBQ1M7WUFFQztZQUFSO2FBQUE7S0FBQTtJQUFBO0lBQ0YsUUFBTSxFQUFFO0lBQ1IsUUFBTSxFQUFFO21DQUNNLEVBQUU7bUNBQ0YsRUFBRTttQ0FDRixFQUFFO3NDQUNGLEVBQUU7R0FBQTs7O0VBRWxCLG9CQUFnQixTQUFTO0VBQ3pCLFFBQU0sS0FBSztFQUdWLDJDQUVJO1NBREg7Z0JBT1csVUFDZ0I7dUJBRE47cUJBQ3BCLGlCQUFhO0lBQUE7R0FBQTtHQVBiLFFBQU0sRUFBRTtVQURUO0VBQUE7a0JBV0QsbUJBQ21CLElBQUE7R0FBbEI7K0NBQ2lCLEtBQUksYUFBVSxHQUNJLElBQUE7V0FBbEM7R0FBQTt5REFDcUIsR0FBRztFQUFBO0VBbEQzQix3QkFBQTtrQkFVQSIsImZpbGUiOiJUeXBlL0ltcGwtVHlwZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9