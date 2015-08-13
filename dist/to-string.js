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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy90by1zdHJpbmcubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFNQSxrQkFBVyxLQUFJLFFBQ00sS0FBQTs7R0FBcEIseUNBQWM7R0FDZCw2QkFDVyxtQkFBQTtVQWlCRztXQWpCUjtLQUFBLFFBaUJRO0tBaEJaLEdBQUEsU0FBSyxFQUFFLE1BQ0k7YUFBVDtZQUNGLEdBQUEsU0FBSyxFQUFFLFFBQ1M7YUFBZDtZQUVFO2FBQUY7Ozs7OztFQUVMLDhCQUFTLEtBQUksUUFDTSxLQUFBOztHQUFsQixzQkFDTyxlQUFBOztvQkFBTixDQUFFLEdBQVE7b0JBQ1YsQ0FBRTtPQUFJO09BQUs7SUFBQSxHQUFTO29CQUNwQixDQUFFLE1BQVc7b0JBQ2IsQ0FBRSxRQUFnQjs7O0dBQ25CLHlDQUFjO0dBQ2QsMkNBQWE7R0FDYiw2QkFDVyxtQkFBQTtVQUFHO1dBQWIsZUFBYTtHQUFBOzs7RUFFZixNQUFPLFVBQVM7RUE1QmhCLHdCQUFBO2tCQU1BIiwiZmlsZSI6InRvLXN0cmluZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9