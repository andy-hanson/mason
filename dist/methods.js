"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./private/bootstrap","./Type/Method"],function(exports,bootstrap_0,Method_1){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(bootstrap_0),msDef=_ms.get(_$2,"msDef"),Method=_ms.getDefaultExport(Method_1);
		const sub=exports.sub=Method(function(){
			const built={};
			const doc=built.doc="Implementing this allows the use of the special syntax `a[b]`.";
			return _ms.setName(built,"sub")
		}());
		msDef("sub",sub);
		const freeze=exports.freeze=Method(function(){
			const built={};
			const doc=built.doc="Returns a compacted and immutable version of it.\nDoes not have to return the same value, but often does.";
			const args=built.args=1;
			const _default=built.default=Object.freeze;
			return _ms.setName(built,"freeze")
		}());
		const frozen_63=exports["frozen?"]=Object.isFrozen;
		const name=exports.name="methods";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRob2RzLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBS0Msc0JBQUssaUJBQ007O0dBQVYsb0JBQU07OztFQUNQLE1BQU8sTUFBSztFQUlaLDRCQUFRLGlCQUNNOztHQUFiLG9CQUNDO0dBRUQsc0JBQU07R0FDTiw2QkFBUzs7O0VBQ1YsbUNBQVM7RUFqQlYsd0JBQUEiLCJmaWxlIjoibWV0aG9kcy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9