"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./js","./private/bootstrap","./Type/Method"],(exports,js_0,bootstrap_1,Method_2)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(js_0),id_61_63=_ms.get(_$2,"id=?"),_$3=_ms.getModule(bootstrap_1),msDef=_ms.get(_$3,"msDef"),Method=_ms.getDefaultExport(Method_2);
		const to_45string=new (Method)((()=>{
			const built={};
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[null],`null`);
				_ms.assoc(built,[void 0],`undefined`);
				_ms.assoc(built,[Object.create(null)],`<object with no prototype>`);
				return built
			};
			const allow_45null_63=built["allow-null?"]=true;
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
						return inspect_45object(_this)
					}
				})()
			};
			return _ms.setName(built,"to-string")
		})());
		const inspect_45seen=new (global.Set)();
		const inspect=exports.inspect=new (Method)((()=>{
			const built={};
			const allow_45null_63=built["allow-null?"]=true;
			const wrap=built.wrap=function wrap(impl,arg,opts){
				return (()=>{
					if(_ms.contains(inspect_45seen,arg)){
						return `<recursive>`
					} else {
						inspect_45seen.add(arg);
						return (_=>{
							inspect_45seen.delete(arg);
							return _
						})(impl.call(arg,opts))
					}
				})()
			};
			const _default=built.default=to_45string.default;
			return _ms.setName(built,"inspect")
		})());
		const inspect_45object=function inspect_45object(){
			return `<object with no prototype>`
		};
		msDef(`inspect`,inspect);
		const name=exports.name=`to-string`;
		exports.default=to_45string;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvdG8tc3RyaW5nLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBS0Esa0JBQVcsS0FBSSxRQUNNLEtBQUE7O0dBQXBCLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsTUFBVztvQkFDYixDQUFFLFFBQWdCO29CQUNsQixDQUFHLGNBQWMsT0FBWTs7O0dBQzlCLDJDQUFhO0dBQ2IseUNBQWM7R0FDZCw2QkFDVyxtQkFBQTtVQUFMO1dBQUE7S0FBQSxRQUFBO0tBQ0osR0FBQSxTQUFLLEVBQUUsTUFDSTthQUFUO1lBQ0YsR0FBQSxTQUFLLEVBQUUsUUFDUzthQUFkO1lBRUU7YUFBSCxpQkFORztLQUFBO0lBQUE7R0FBQTs7O0VBUVAscUJBQWUsS0FBSTtFQUVuQiw4QkFBUyxLQUFJLFFBQ00sS0FBQTs7R0FBbEIsMkNBQWE7R0FDYixzQkFBTyxjQUFBLEtBQUssSUFBSSxLQUNJO1dBQ2Y7S0FBSCxnQkFBSSxlQUFKLEtBQ2dCO2FBQWQ7WUFFRTtNQUFILG1CQUFpQjthQUNaLElBQ2tCO09BQXRCLHNCQUFvQjs7U0FEaEIsVUFBVSxJQUFJO0tBQUE7SUFBQTtHQUFBO0dBRXRCLDZCQUFTOzs7RUFHVix1QkFDa0IsMkJBQUE7VUFBaEI7O0VBRUYsTUFBTyxVQUFTO0VBdkNoQix3QkFBQTtrQkFLQSIsImZpbGUiOiJ0by1zdHJpbmcuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==