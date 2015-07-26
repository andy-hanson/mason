"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../control","../methods","../Type/Kind","../Type/Method","../Type/Type","./at","./Seq/Range"],(exports,control_0,methods_1,Kind_2,Method_3,Type_4,_64_5,Range_6)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(control_0),returning=_ms.get(_$2,"returning"),_$3=_ms.getModule(methods_1),sub=_ms.get(_$3,"sub"),Kind=_ms.getDefaultExport(Kind_2),_$4=_ms.getModule(Kind_2),self_45kind_33=_ms.get(_$4,"self-kind!"),Method=_ms.getDefaultExport(Method_3),_$5=_ms.getModule(Method_3),impl_33=_ms.get(_$5,"impl!"),_$6=_ms.getModule(Type_4),_61_62=_ms.get(_$6,"=>"),_64=_ms.getDefaultExport(_64_5),_$7=_ms.getModule(_64_5),_43_43_33=_ms.get(_$7,"++!"),Range=_ms.lazy(()=>{
			return _ms.getDefaultExport(Range_6)
		});
		const _64_45Type=new (Kind)(()=>{
			const built={};
			const doc=built.doc=`Any sub-type of @.`;
			return _ms.setName(built,"@-Type")
		}());
		impl_33(sub,_64_45Type,function(){
			const _this=this;
			return _this
		});
		const empty=exports.empty=new (Method)(()=>{
			const built={};
			const doc=built.doc=`Given a type, makes an instance which is \`empty?\`.\nShould always return the same thing iff immutable.`;
			return _ms.setName(built,"empty")
		}());
		const from_45stream=exports["from-stream"]=new (Method)(()=>{
			const built={};
			const doc=built.doc=`|_ stream:@\nCreates a new value of this type by reading out from an @'s iterator.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[Array,new (_ms.unlazy(Range))(0,5)],[0,1,2,3,4]);
				return built
			};
			const args=built.args=[`type`,`stream`];
			const _default=built.default=function _default(stream){
				const _this=this;
				return returning(empty(_this),_=>{
					_43_43_33(_,stream)
				})
			};
			return _ms.setName(built,"from-stream")
		}());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL0AtVHlwZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBVUEsaUJBQVEsS0FBSSxVQUNJOztHQUFmLG9CQUFNOzs7RUFFUCxRQUFNLElBQUksV0FDUyxVQUFBO1NBd0JOO1VBQUE7RUFBQTtFQXRCYiwwQkFBTyxLQUFJLFlBQ007O0dBQWhCLG9CQUNDOzs7RUFHRiwyQ0FBYSxLQUFJLFlBQ007O0dBQXRCLG9CQUNDO0dBRUQsc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxNQUFPLHdCQUFVLEVBQUUsSUFBUSxDQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUU7OztHQUN4QyxzQkFBTSxDQUFHLE9BQU87R0FDaEIsNkJBQVcsa0JBQUEsT0FDTTtVQVNMO1dBVFgsVUFBVyxNQVNBLE9BVGMsR0FDQztLQUF6QixVQUFJLEVBQUU7SUFBQTtHQUFBOzs7RUFHVCxlQUFXLElBQUU7RUFJYixRQUFNLE9BQUcsV0FBUyxTQUFBLE9BQ007U0FBWDtVQUFaLGNBQVksTUFBSztFQUFBO0VBdENsQix3QkFBQTtrQkFVQSIsImZpbGUiOiJhdC9hdC1UeXBlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=