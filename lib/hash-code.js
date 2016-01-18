"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at","./js","./math/Number","./Type/Method"],(exports,_64_0,js_1,Number_2,Method_3)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(_64_0),empty_63=_ms.get(_$0,"empty?"),_$1=_ms.getModule(js_1),defined_63=_ms.get(_$1,"defined?"),id_61_63=_ms.get(_$1,"id=?"),js_42=_ms.get(_$1,"js*"),js_45=_ms.get(_$1,"js-"),js_43=_ms.get(_$1,"js+"),js_45bar=_ms.get(_$1,"js-bar"),_$2=_ms.getModule(Number_2),Int=_ms.get(_$2,"Int"),Method=_ms.getDefaultExport(Method_3),_$3=_ms.getModule(Method_3),impl_33=_ms.get(_$3,"impl!");
		let hash_45code=exports.default=new (Method)((()=>{
			let built={};
			built.name="hash-code";
			let args=built.args=[];
			let returns=built.returns=Int;
			let allow_45null_63=built["allow-null?"]=true;
			let _default=built.default=function _default(){
				let _this=this;
				return (()=>{
					switch(_this){
						case null:{
							return 108
						}
						case void 0:{
							return 109
						}
						default:
							let cached=hashes_45cache.get(_this);
							return (defined_63(cached)?cached:(()=>{
								hashes_45cache.set(_this,17);
								let hash=17;
								for(let key of Object.keys(_this)){
									let val=_this[key];
									let val_45hash=hash_45code(val);
									hash=js_45bar(js_42(hash,23),0);
									hash=js_45bar(js_43(hash,val_45hash),0)
								};
								hashes_45cache.set(_this,hash);
								return hash
							})())
					}
				})()
			};
			return built
		})());
		let hashes_45cache=new (WeakMap)();
		impl_33(hash_45code,Boolean,function(){
			let _this=this;
			return (_this?1:0)
		});
		impl_33(hash_45code,Function,function(){
			let _this=this;
			return hash_45code((()=>{
				let _=_this.name;
				if(empty_63(_)){
					return _this.toString()
				} else {
					return _
				}
			})())
		});
		impl_33(hash_45code,String,function(){
			let _this=this;
			let hash=13;
			let i=_this.length;
			for(;;){
				hash=js_43(hash,_this.charCodeAt(i));
				hash=js_45bar(hash,0);
				hash=js_42(hash,31);
				if(id_61_63(i,0)){
					break
				};
				i=js_45(i,1)
			};
			return hash
		});
		impl_33(hash_45code,Symbol,()=>{
			return 42
		});
		impl_33(hash_45code,Number,function(){
			let _this=this;
			return js_45bar(_this,0)
		});
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvaGFzaC1jb2RlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBT0EsZ0NBQVcsS0FBSSxRQUNNLEtBQUE7O2NBRXBCO0dBQ0Esb0JBQU07R0FDTiwwQkFBUztHQUNULHlDQUFhO0dBQ2IsMkJBQ1csbUJBQUE7O1dBQUg7WUFBQTtNQUNOLEtBQUEsS0FDSTtjQUFIO01BQUE7TUFDRCxLQUFBLE9BQ1M7Y0FBUjtNQUFBO01BRUc7T0FDSCxXQUFTLG1CQUFpQjtjQUNyQixDQUFDLFdBQVMsUUFBUSxPQUNNLEtBQUE7UUFDNUIsbUJBQWlCLE1BQUs7UUFDdEIsU0FBTztRQUNILFFBQUEsT0FBTyxZQUFZLE9BQ0k7U0FBMUIsUUFBTSxNQUFFO1NBQ1IsZUFBVyxZQUFVO2NBQ2IsU0FBUSxNQUFJLEtBQUssSUFBSTtjQUNyQixTQUFRLE1BQUksS0FBSyxZQUFVO1FBQUE7UUFDcEMsbUJBQWlCLE1BQUs7ZUFDdEI7T0FBQTtLQUFBO0lBQUE7R0FBQTs7O0VBRUwsbUJBQWUsS0FBSTtFQUdsQixRQUFNLFlBQVUsUUFDVSxVQUFBOztVQUFwQixDQUFBLE1BQUssRUFBRTtFQUFBO0VBRWIsUUFBTSxZQUFVLFNBQ1csVUFBQTs7VUFDMUIsWUFBZTtJQUFBLE1BQUE7SUFDZCxHQUFBLFNBQU8sR0FDQTtZQUFOO1dBRUc7WUFBRjtJQUFBO0dBQUE7RUFBQTtFQUdKLFFBQU0sWUFBVSxPQUNTLFVBQUE7O0dBQXhCLFNBQU87R0FDUCxNQUFJO0dBRUQsT0FBQTtTQUFNLE1BQUksS0FBTSxpQkFBWTtTQUN0QixTQUFPLEtBQUs7U0FDWixNQUFJLEtBQUs7SUFFZCxHQUFBLFNBQUssRUFBRSxHQUNDO0tBQVY7SUFBQTtNQUNJLE1BQUksRUFBRTtHQUFBO1VBQ1o7RUFBQTtFQUVELFFBQU0sWUFBVSxPQUNRLElBQUE7VUFFdkI7RUFBQTtFQUdELFFBQU0sWUFBVSxPQUNTLFVBQUE7O1VBQXhCLFNBQU8sTUFBSztFQUFBIiwiZmlsZSI6Imhhc2gtY29kZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
