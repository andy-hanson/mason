"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./compare","./js","./math/Number","./Type/Method"],(exports,compare_0,js_1,Number_2,Method_3)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_$1=_ms.getModule(js_1),id_61_63=_ms.get(_$1,"id=?"),js_42=_ms.get(_$1,"js*"),js_45=_ms.get(_$1,"js-"),js_43=_ms.get(_$1,"js+"),js_45bar=_ms.get(_$1,"js-bar"),js_45sub=_ms.get(_$1,"js-sub"),_$2=_ms.getModule(Number_2),Int=_ms.get(_$2,"Int"),Method=_ms.getDefaultExport(Method_3),_$3=_ms.getModule(Method_3),impl_33=_ms.get(_$3,"impl!");
		const hash_45code=exports.default=new (Method)((()=>{
			const built={};
			built[`name`]="hash-code";
			const args=built.args=1;
			const returns=built.returns=Int;
			const allow_45null_63=built["allow-null?"]=true;
			const _default=built.default=function _default(){
				const _this=this;
				return (()=>{
					if(id_61_63(_this,null)){
						return 108
					} else if(id_61_63(_this,void 0)){
						return 109
					} else {
						return (()=>{
							const _=hashes_45cache.get(_this);
							if(id_61_63(_,void 0)){
								hashes_45cache.set(_this,17);
								let hash=17;
								for(let key of Object.keys(_this)){
									const val=js_45sub(_this,key);
									const val_45hash=hash_45code(val);
									hash=js_45bar(js_42(hash,23),0);
									hash=js_45bar(js_43(hash,val_45hash),0)
								};
								hashes_45cache.set(_this,hash);
								return hash
							} else {
								return _
							}
						})()
					}
				})()
			};
			return built
		})());
		const hashes_45cache=new (WeakMap)();
		impl_33(hash_45code,Boolean,function(){
			const _this=this;
			return (_this?1:0)
		});
		impl_33(hash_45code,Function,function(){
			const _this=this;
			return hash_45code((()=>{
				const _=_this.name;
				if(_61_63(0,_.length)){
					return _this.toString()
				} else {
					return _
				}
			})())
		});
		impl_33(hash_45code,String,function(){
			const _this=this;
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
			const _this=this;
			return js_45bar(_this,0)
		});
		const name=exports.name=`hash-code`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvaGFzaC1jb2RlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBT0Esa0NBQVcsS0FBSSxRQUNNLEtBQUE7O1NBRXBCLFFBQUE7R0FDQSxzQkFBTTtHQUNOLDRCQUFTO0dBQ1QsMkNBQWE7R0FDYiw2QkFDVyxtQkFBQTtVQTBESDtXQXpESDtLQUFILEdBQUEsU0F5RE0sTUF6REksTUFDSTthQUFiO0tBQUEsT0FDRCxHQUFBLFNBdURNLE1BdkRJLFFBQ1M7YUFBbEI7S0FBQSxPQUVHO2FBQUU7T0FBQSxRQUFBLG1CQW9EQTtPQW5ESixHQUFBLFNBQUssRUFBRSxRQUNTO1FBQ2YsbUJBaURHLE1BakRtQjtRQUN0QixTQUFTO1FBRUosUUFBQSxPQUFPLFlBOENULE9BN0N5QjtTQUEzQixVQUFNLFNBNkNKLE1BN0NnQjtTQUNsQixpQkFBVyxZQUFVO2NBQ2IsU0FBUSxNQUFJLEtBQUssSUFBSTtjQUNyQixTQUFRLE1BQUksS0FBSyxZQUFVO1FBQUE7UUFFcEMsbUJBd0NHLE1BeENtQjtlQUN0QjtPQUFBLE9BRUc7ZUFBSDtPQUFBO01BQUE7S0FBQTtJQUFBO0dBQUE7OztFQUVOLHFCQUFlLEtBQUk7RUFHbEIsUUFBTSxZQUFVLFFBQ1UsVUFBQTtTQStCbEI7VUEvQkYsQ0ErQkUsTUEvQkcsRUFBRTtFQUFBO0VBRWIsUUFBTSxZQUFVLFNBQ1csVUFBQTtTQTRCbkI7VUEzQlAsWUFBZTtJQUFBLFFBMkJSO0lBMUJOLEdBQUEsT0FBRyxFQUFFLFVBQ3NCO1lBeUJyQjtXQXZCRjtZQUFIO0lBQUE7R0FBQTtFQUFBO0VBR0gsUUFBTSxZQUFVLE9BQ1MsVUFBQTtTQW1CakI7R0FuQlAsU0FBUztHQUNULE1Ba0JPO0dBaEJILE9BQUE7U0FBSyxNQUFJLEtBZ0JOLGlCQWhCd0I7U0FDdEIsU0FBTyxLQUFLO1NBQ1osTUFBSSxLQUFLO0lBRWpCLEdBQUksU0FBSyxFQUFFLEdBQ0M7S0FBWDtJQUFBO01BQ0ksTUFBSSxFQUFFO0dBQUE7VUFDWjtFQUFBO0VBRUQsUUFBTSxZQUFVLE9BQ1EsSUFBQTtVQUV2QjtFQUFBO0VBR0QsUUFBTSxZQUFVLE9BQ1MsVUFBQTtTQUFqQjtVQUFQLFNBQU8sTUFBSztFQUFBO0VBekVkLHdCQUFBIiwiZmlsZSI6Imhhc2gtY29kZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
