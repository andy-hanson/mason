"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../methods","../Type/Kind","../Type/Method","../Type/Type","./at","./Range"],(exports,methods_0,Kind_1,Method_2,Type_3,_64_4,Range_5)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(methods_0),sub=_ms.get(_$0,"sub"),Kind=_ms.getDefaultExport(Kind_1),_$1=_ms.getModule(Kind_1),self_45kind_33=_ms.get(_$1,"self-kind!"),Method=_ms.getDefaultExport(Method_2),_$2=_ms.getModule(Method_2),impl_33=_ms.get(_$2,"impl!"),_$3=_ms.getModule(Type_3),_61_62=_ms.get(_$3,"=>"),_64=_ms.getDefaultExport(_64_4),_$4=_ms.getModule(_64_4),_43_43_33=_ms.get(_$4,"++!"),Range=_ms.lazy(()=>_ms.getDefaultExport(Range_5));
		const _64_45Type=new (Kind)((()=>{
			const built={};
			built[`name`]="@-Type";
			const doc=built.doc=`Any sub-type of @.`;
			return built
		})());
		impl_33(sub,_64_45Type,function(){
			const _this=this;
			return _this
		});
		const empty=exports.empty=new (Method)((()=>{
			const built={};
			built[`name`]="empty";
			const doc=built.doc=`Given a type, makes an instance which is \`empty?\`.
Should always return the same thing iff immutable.`;
			return built
		})());
		const from_45stream=exports["from-stream"]=new (Method)((()=>{
			const built={};
			built[`name`]="from-stream";
			const doc=built.doc=`|_ stream:@
Creates a new value of this type by reading out from an @'s iterator.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[Array,new (_ms.unlazy(Range))(0,5)],[0,1,2,3,4]);
				return built
			};
			const args=built.args=[`type`,`stream`];
			const _default=built.default=function _default(stream){
				const _this=this;
				return (_=>{
					_43_43_33(_,stream);
					return _
				})(empty(_this))
			};
			return built
		})());
		self_45kind_33(_64,_64_45Type);
		impl_33(_61_62,_64_45Type,function(stream){
			const _this=this;
			return from_45stream(_this,stream)
		});
		const name=exports.name=`@-Type`;
		exports.default=_64_45Type;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvQC9ALVR5cGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFTQSxpQkFBUSxLQUFJLE1BQ0ksS0FBQTs7U0FBZixRQUFBO0dBQ0Esb0JBQU07OztFQUVQLFFBQU0sSUFBSSxXQUNTLFVBQUE7U0EwQk47VUFBQTtFQUFBO0VBeEJiLDBCQUFPLEtBQUksUUFDTSxLQUFBOztTQUFoQixRQUFBO0dBQ0Esb0JBQ0M7OztFQUdGLDJDQUFhLEtBQUksUUFDTSxLQUFBOztTQUF0QixRQUFBO0dBQ0Esb0JBQ0M7R0FFRCxzQkFDTyxlQUFBOztvQkFBTixDQUFFLE1BQU8sd0JBQVUsRUFBRSxJQUFRLENBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRTs7O0dBQ3hDLHNCQUFNLENBQUcsT0FBTztHQUNoQiw2QkFBVyxrQkFBQSxPQUNNO1VBU0w7V0FUTixJQUNVO0tBQWQsVUFBSSxFQUFFOztPQURGLE1BU007R0FBQTs7O0VBTGIsZUFBVyxJQUFFO0VBSWIsUUFBTSxPQUFHLFdBQVMsU0FBQSxPQUNNO1NBQVg7VUFBWixjQUFZLE1BQUs7RUFBQTtFQXhDbEIsd0JBQUE7a0JBU0EiLCJmaWxlIjoiYXQvYXQtVHlwZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9