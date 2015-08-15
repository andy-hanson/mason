"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./private/bootstrap","./Type/Method"],(exports,bootstrap_0,Method_1)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(bootstrap_0),msDef=_ms.get(_$2,"msDef"),Method=_ms.getDefaultExport(Method_1);
		const sub=exports.sub=new (Method)((()=>{
			const built={};
			const doc=built.doc=`Implementing this allows the use of the special syntax \`a[b]\`.`;
			return _ms.setName(built,"sub")
		})());
		msDef(`sub`,sub);
		const freeze=exports.freeze=new (Method)((()=>{
			const built={};
			const doc=built.doc=`Returns a compacted and immutable version of it.\nDoes not have to return the same value, but often does.`;
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				return Object.freeze(_this)
			};
			return _ms.setName(built,"freeze")
		})());
		const frozen_63=exports["frozen?"]=Object.isFrozen;
		const name=exports.name=`methods`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvbWV0aG9kcy5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQUtDLHNCQUFLLEtBQUksUUFDTSxLQUFBOztHQUFkLG9CQUFNOzs7RUFDUCxNQUFPLE1BQUs7RUFJWiw0QkFBUSxLQUFJLFFBQ00sS0FBQTs7R0FBakIsb0JBQ0M7R0FFRCxzQkFBTTtHQUNOLDZCQUNXLG1CQUFBO1VBQUk7V0FBZCxjQUFjO0dBQUE7OztFQUVoQixtQ0FBUztFQW5CVix3QkFBQSIsImZpbGUiOiJtZXRob2RzLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=