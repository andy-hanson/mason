"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./private/util-inspect","./js","./private/bootstrap","./Type/Method"],(exports,util_45inspect_0,js_1,bootstrap_2,Method_3)=>{
	exports._get=_ms.lazy(()=>{
		const util_45inspect=_ms.getDefaultExport(util_45inspect_0),_$3=_ms.getModule(js_1),id_61_63=_ms.get(_$3,"id=?"),_$4=_ms.getModule(bootstrap_2),msDef=_ms.get(_$4,"msDef"),Method=_ms.getDefaultExport(Method_3);
		const to_45string=new (Method)((()=>{
			const built={};
			const impl_45symbol=built["impl-symbol"]=`toString`;
			const _default=built.default=function _default(){
				const _this=this;
				return (()=>{
					const _=_this;
					if(id_61_63(_,null)){
						return `null`
					} else if(id_61_63(_,void 0)){
						return `undefined`
					} else {
						return `<object with no toString defined>`
					}
				})()
			};
			return _ms.setName(built,"to-string")
		})());
		const inspect=exports.inspect=new (Method)((()=>{
			const built={};
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[2],`2`);
				_ms.assoc(built,[{
					a:1,
					b:2
				}],`\{ a: 1, b: 2 }`);
				_ms.assoc(built,[null],`null`);
				_ms.assoc(built,[void 0],`undefined`);
				return built
			};
			const impl_45symbol=built["impl-symbol"]=`inspect`;
			const allow_45null_63=built["allow-null?"]=true;
			const _default=built.default=function _default(){
				const _this=this;
				return util_45inspect(_this)
			};
			return _ms.setName(built,"inspect")
		})());
		msDef(`inspect`,inspect);
		const name=exports.name=`to-string`;
		exports.default=to_45string;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvdG8tc3RyaW5nLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBTUEsa0JBQVcsS0FBSSxRQUNNLEtBQUE7O0dBQXBCLHlDQUFjO0dBQ2QsNkJBQ1csbUJBQUE7VUFpQkc7V0FqQlI7S0FBQSxRQWlCUTtLQWhCWixHQUFBLFNBQUssRUFBRSxNQUNJO2FBQVQ7WUFDRixHQUFBLFNBQUssRUFBRSxRQUNTO2FBQWQ7WUFFRTthQUFGOzs7Ozs7RUFFTCw4QkFBUyxLQUFJLFFBQ00sS0FBQTs7R0FBbEIsc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxHQUFRO29CQUNWLENBQUU7T0FBSTtPQUFLO0lBQUEsR0FBUztvQkFDcEIsQ0FBRSxNQUFXO29CQUNiLENBQUUsUUFBZ0I7OztHQUNuQix5Q0FBYztHQUNkLDJDQUFhO0dBQ2IsNkJBQ1csbUJBQUE7VUFBRztXQUFiLGVBQWE7R0FBQTs7O0VBRWYsTUFBTyxVQUFTO0VBNUJoQix3QkFBQTtrQkFNQSIsImZpbGUiOiJ0by1zdHJpbmcuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==