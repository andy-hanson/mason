"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../control","../Function","../methods","../Type/Kind","../Type/Method","../Type/Type","./at","./atbang","./Seq/Range"],function(exports,control_0,Function_1,methods_2,Kind_3,Method_4,Type_5,_64_6,_64_33_7,Range_8){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(control_0),returning=_ms.get(_$2,"returning"),_$3=_ms.getModule(Function_1),identity=_ms.get(_$3,"identity"),_$4=_ms.getModule(methods_2),sub=_ms.get(_$4,"sub"),Kind=_ms.getDefaultExport(Kind_3),_$5=_ms.getModule(Kind_3),self_45kind_33=_ms.get(_$5,"self-kind!"),Method=_ms.getDefaultExport(Method_4),_$6=_ms.getModule(Method_4),impl_33=_ms.get(_$6,"impl!"),self_45impl_33=_ms.get(_$6,"self-impl!"),_$7=_ms.getModule(Type_5),_61_62=_ms.get(_$7,"=>"),_64=_ms.getDefaultExport(_64_6),_$10=_ms.lazyGetModule(_64_33_7),_43_43_33=_ms.lazyProp(_$10,"++!"),_$12=_ms.lazyGetModule(Range_8),range=_ms.lazyProp(_$12,"range");
		const _64_45Type=Kind(function(){
			const built={};
			const doc=built.doc=`Any sub-type of @.`;
			return _ms.setName(built,"@-Type")
		}());
		impl_33(sub,_64_45Type,identity);
		const empty=exports.empty=Method(function(){
			const built={};
			const doc=built.doc=`Given a type, makes an instance which is \`empty?\`.\nShould always return the same thing iff immutable.`;
			return _ms.setName(built,"empty")
		}());
		const from_45stream=exports["from-stream"]=Method(function(){
			const built={};
			const doc=built.doc=`|_ stream:@\nCreates a new value of this type by reading out from an @'s iterator.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[Array,_ms.unlazy(range)(0,5)],[0,1,2,3,4]);
				return built
			};
			const args=built.args=[`type`,`stream`];
			const _default=built.default=function _default(type,stream){
				return returning(empty(type),function(_){
					_ms.unlazy(_43_43_33)(_,stream)
				})
			};
			return _ms.setName(built,"from-stream")
		}());
		self_45kind_33(_64,_64_45Type);
		self_45impl_33(empty,_64,function(){
			return empty(Array)
		});
		impl_33(_61_62,_64_45Type,from_45stream);
		const name=exports.name=`@-Type`;
		exports.default=_64_45Type;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL0AtVHlwZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQWFBLGlCQUFRLGVBQ0k7O0dBQVgsb0JBQU07OztFQUVQLFFBQU0sSUFBSSxXQUFPO0VBRWpCLDBCQUFPLGlCQUNNOztHQUFaLG9CQUNDOzs7RUFHRiwyQ0FBYSxpQkFDTTs7R0FBbEIsb0JBQ0M7R0FFRCxzQkFDTyxlQUFBOztvQkFBTixDQUFFLHdCQUFhLEVBQUUsSUFBUSxDQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7OztHQUNwQyxzQkFBTSxDQUFHLE9BQU87R0FDaEIsNkJBQVUsa0JBQUEsS0FBSyxPQUNNO1dBQXBCLFVBQVcsTUFBTSxNQUFRLFNBQUEsRUFDQzsyQkFBckIsRUFBRTtJQUFBO0dBQUE7OztFQUdULGVBQVcsSUFBRTtFQUNiLGVBQVcsTUFBTSxJQUNHLFVBQUE7VUFBbkIsTUFBTTtFQUFBO0VBRVAsUUFBTSxPQUFHLFdBQU87RUF2Q2hCLHdCQUFBO2tCQWFBIiwiZmlsZSI6ImF0L2F0LVR5cGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==