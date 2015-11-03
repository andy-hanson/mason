"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../methods","./../Type/Kind","./../Type/Method","./../Type/Type","./at"],(exports,methods_0,Kind_1,Method_2,Type_3,_64_4)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(methods_0),sub=_ms.get(_$0,"sub"),_$1=_ms.getModule(Kind_1),self_45kind_33=_ms.get(_$1,"self-kind!"),Method=_ms.getDefaultExport(Method_2),_$2=_ms.getModule(Type_3),_61_62=_ms.get(_$2,"=>"),_64=_ms.getDefaultExport(_64_4),_$3=_ms.getModule(_64_4),_43_43_33=_ms.get(_$3,"++!");
		const _64_45Type=exports.default=(()=>{
			const _=_ms.kind("@-Type",[],{},{
				[_ms.symbol(sub)](){
					const _this=this;
					return _this
				},
				[_ms.symbol(_61_62)](stream){
					const _this=this;
					return from_45stream(_this,stream)
				}
			});
			self_45kind_33(_64,_);
			return _
		})();
		const empty=exports.empty=new (Method)((()=>{
			const built={};
			built.name="empty";
			return built
		})());
		const from_45stream=exports["from-stream"]=new (Method)((()=>{
			const built={};
			built.name="from-stream";
			const args=built.args=["type","stream"];
			const _default=built.default=function _default(stream){
				const _this=this;
				return (_=>{
					_43_43_33(_,stream);
					return _
				})(empty(_this))
			};
			return built
		})());
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9ALVR5cGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFPQSxpQ0FDWSxLQUdUOztnQkFHRjtXQWdCWTtZQUFBO0lBQUE7Z0JBYlosU0FBSTtXQWFRO1lBWlgsY0FZVyxNQVpNO0lBQUE7R0FBQTtHQU5qQixlQUFXLElBQUU7OztFQVFmLDBCQUFPLEtBQUksUUFDTSxLQUFBOztjQUVoQjs7O0VBRUQsMkNBQWEsS0FBSSxRQUNNLEtBQUE7O2NBQ3RCO0dBQ0Esc0JBQU0sQ0FBRSxPQUFNO0dBQ2QsNkJBQVcsa0JBQUE7VUFDQztXQUFOLElBQ1U7S0FBZCxVQUFJLEVBQUU7O09BREYsTUFBTTtHQUFBIiwiZmlsZSI6ImF0L2F0LVR5cGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
