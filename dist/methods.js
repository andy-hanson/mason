"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./private/bootstrap","./Type/Method"],function(exports,bootstrap_0,Method_1){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(bootstrap_0),msDef=_$2.msDef,Method=_ms.getDefaultExport(Method_1);
		const sub=exports.sub=Method(function(){
			const doc="Implementing this allows the use of the special syntax `a[b]`.";
			return {
				doc:doc,
				name:"sub"
			}
		}());
		msDef("sub",sub);
		const freeze=exports.freeze=Method(function(){
			const doc="Returns a compacted and immutable version of it.\nDoes not have to return the same value, but often does.";
			const args=1;
			const _default=function _default(_){
				return Object.freeze(_)
			};
			return {
				doc:doc,
				args:args,
				default:_default,
				name:"freeze"
			}
		}());
		const frozen_63=exports["frozen?"]=function frozen_63(_){
			return Object.isFrozen(_)
		};
		const name=exports.name="methods";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRob2RzLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBS0Msc0JBQUssaUJBQ007R0FBVixVQUFNOzs7Ozs7RUFDUCxNQUFPLE1BQUs7RUFJWiw0QkFBUSxpQkFDTTtHQUFiLFVBQ0M7R0FFRCxXQUFNO0dBRU4sZUFBVSxrQkFBQSxFQUNDO1dBQVYsY0FBYztHQUFBOzs7Ozs7OztFQUVoQixtQ0FBVSxtQkFBQSxFQUNDO1VBQVYsZ0JBQWdCO0VBQUE7RUFyQmxCLHdCQUFBIiwiZmlsZSI6Im1ldGhvZHMuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==