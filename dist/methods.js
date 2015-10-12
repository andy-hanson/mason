"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./private/bootstrap","./Type/Method"],(exports,bootstrap_0,Method_1)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(bootstrap_0),msDef=_ms.get(_$0,"msDef"),Method=_ms.getDefaultExport(Method_1);
		const sub=exports.sub=new (Method)((()=>{
			const built={};
			built.name="sub";
			return built
		})());
		msDef(`sub`,sub);
		const set_45sub_33=exports["set-sub!"]=new (Method)((()=>{
			const built={};
			built.name="set-sub!";
			return built
		})());
		msDef(`setSub`,set_45sub_33);
		const del_45sub_33=exports["del-sub!"]=new (Method)((()=>{
			const built={};
			built.name="del-sub!";
			return built
		})());
		msDef(`delSub`,del_45sub_33);
		const freeze=exports.freeze=new (Method)((()=>{
			const built={};
			built.name="freeze";
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				return Object.freeze(_this)
			};
			return built
		})());
		const frozen_63=exports["frozen?"]=Object.isFrozen;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvbWV0aG9kcy5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQUtDLHNCQUFLLEtBQUksUUFDTSxLQUFBOztjQUNkOzs7RUFDRCxNQUFPLE1BQUs7RUFFWix1Q0FBVSxLQUFJLFFBQ00sS0FBQTs7Y0FDbkI7OztFQUNELE1BQU8sU0FBUTtFQUVmLHVDQUFVLEtBQUksUUFDTSxLQUFBOztjQUNuQjs7O0VBQ0QsTUFBTyxTQUFRO0VBSWYsNEJBQVEsS0FBSSxRQUNNLEtBQUE7O2NBRWpCO0dBQ0Esc0JBQU07R0FDTiw2QkFDVztVQUFJO1dBQWQsY0FBYztHQUFBOzs7RUFFaEIsbUNBQVMiLCJmaWxlIjoibWV0aG9kcy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
