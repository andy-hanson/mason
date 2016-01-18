"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./js","./private/bootstrap","./Type/Method"],(exports,js_0,bootstrap_1,Method_2)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(js_0),id_61_63=_ms.get(_$0,"id=?"),_$1=_ms.getModule(bootstrap_1),msDef=_ms.get(_$1,"msDef"),Method=_ms.getDefaultExport(Method_2);
		let to_45string=exports.default=new (Method)((()=>{
			let built={};
			built.name="to-string";
			let allow_45null_63=built["allow-null?"]=true;
			let impl_45symbol=built["impl-symbol"]="toString";
			let _default=built.default=function _default(){
				let _this=this;
				return (()=>{
					let _=_this;
					if(id_61_63(_,null)){
						return "null"
					} else if(id_61_63(_,void 0)){
						return "undefined"
					} else {
						return inspect_45object(_this)
					}
				})()
			};
			return built
		})());
		let inspect_45seen=new (Set)();
		let inspect=exports.inspect=new (Method)((()=>{
			let built={};
			built.name="inspect";
			let allow_45null_63=built["allow-null?"]=true;
			let wrap=built.wrap=function wrap(impl,arg,opts){
				return (()=>{
					if(inspect_45seen.has(arg)){
						return "<recursive>"
					} else {
						inspect_45seen.add(arg);
						return (()=>{
							let _=impl.call(arg,opts);
							inspect_45seen.delete(arg);
							return _
						})()
					}
				})()
			};
			let _default=built.default=to_45string.default;
			return built
		})());
		let inspect_45object=function inspect_45object(){
			return `<object with no prototype>`
		};
		msDef("inspect",inspect);
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvdG8tc3RyaW5nLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBTUEsZ0NBQVcsS0FBSSxRQUNNLEtBQUE7O2NBQXBCO0dBQ0EseUNBQWE7R0FDYix1Q0FBYztHQUNkLDJCQUNXLG1CQUFBOztXQUFMO0tBQUEsTUFBQTtLQUNKLEdBQUEsU0FBTSxFQUFDLE1BQ0k7YUFBVDtLQUFBLE9BQ0YsR0FBQSxTQUFNLEVBQUMsUUFDUzthQUFkO0tBQUEsT0FFRTthQUFILGlCQUFlO0tBQUE7SUFBQTtHQUFBOzs7RUFFbkIsbUJBQWUsS0FBSTtFQUVuQiw0QkFBUyxLQUFJLFFBQ00sS0FBQTs7Y0FBbEI7R0FDQSx5Q0FBYTtHQUNiLG9CQUFPLGNBQUEsS0FBSyxJQUFJLEtBQ0k7V0FDZjtLQUFILEdBQUEsbUJBQWlCLEtBQ0c7YUFBbEI7S0FBQSxPQUVFO01BQUgsbUJBQWlCO2FBQ1osS0FDa0I7YUFEbEIsVUFBVSxJQUFJO09BQ2xCLHNCQUFvQjs7Ozs7O0dBQ3hCLDJCQUFTOzs7RUFHVixxQkFDa0IsMkJBQUE7VUFBaEI7O0VBRUYsTUFBTyxVQUFRIiwiZmlsZSI6InRvLXN0cmluZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9