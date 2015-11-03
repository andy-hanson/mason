"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./compare","./js","./math/Number","./Type/Method"],(exports,compare_0,js_1,Number_2,Method_3)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_$1=_ms.getModule(js_1),defined_63=_ms.get(_$1,"defined?"),id_61_63=_ms.get(_$1,"id=?"),js_42=_ms.get(_$1,"js*"),js_45=_ms.get(_$1,"js-"),js_43=_ms.get(_$1,"js+"),js_45bar=_ms.get(_$1,"js-bar"),_$2=_ms.getModule(Number_2),Int=_ms.get(_$2,"Int"),Method=_ms.getDefaultExport(Method_3),_$3=_ms.getModule(Method_3),impl_33=_ms.get(_$3,"impl!");
		const hash_45code=exports.default=new (Method)((()=>{
			const built={};
			built.name="hash-code";
			const args=built.args=1;
			const returns=built.returns=Int;
			const allow_45null_63=built["allow-null?"]=true;
			const _default=built.default=function _default(){
				const _this=this;
				return (()=>{
					if(id_61_63(_this,null)){
						return 108
					} else if(! defined_63(_this)){
						return 109
					} else {
						return (()=>{
							const _=hashes_45cache.get(_this);
							if(defined_63(_)){
								return _
							} else {
								hashes_45cache.set(_this,17);
								let hash=17;
								for(let key of Object.keys(_this)){
									const val=_this[`${key}`];
									const val_45hash=hash_45code(val);
									hash=js_45bar(js_42(hash,23),0);
									hash=js_45bar(js_43(hash,val_45hash),0)
								};
								hashes_45cache.set(_this,hash);
								return hash
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
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvaGFzaC1jb2RlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBT0Esa0NBQVcsS0FBSSxRQUNNLEtBQUE7O2NBRXBCO0dBQ0Esc0JBQU07R0FDTiw0QkFBUztHQUNULDJDQUFhO0dBQ2IsNkJBQ1c7VUEwREg7V0F6REg7S0FBSCxHQUFBLFNBeURNLE1BekRJLE1BQ0k7YUFBYjtLQUFBLE9BQ0QsR0FBQSxFQUFJLFdBdURFLE9BdERXO2FBQWhCO0tBQUEsT0FFRzthQUFFO09BQUEsUUFBQSxtQkFvREE7T0FuREosR0FBQSxXQUFBLEdBQ1M7ZUFBUjtPQUFBLE9BRUc7UUFDSCxtQkErQ0csTUEvQ21CO1FBQ3RCLFNBQVM7UUFFTCxRQUFBLE9BQU8sWUE0Q1IsT0EzQ3dCO1NBQTFCLFVBMkNFLE1BM0NVLEdBQUM7U0FDYixpQkFBVyxZQUFVO2NBQ2IsU0FBUSxNQUFJLEtBQUssSUFBSTtjQUNyQixTQUFRLE1BQUksS0FBSyxZQUFVO1FBQUE7UUFFcEMsbUJBc0NHLE1BdENtQjtlQUN0QjtPQUFBO01BQUE7S0FBQTtJQUFBO0dBQUE7OztFQUVOLHFCQUFlLEtBQUk7RUFHbEIsUUFBTSxZQUFVLFFBQ1U7U0ErQmxCO1VBL0JGLENBK0JFLE1BL0JHLEVBQUU7RUFBQTtFQUViLFFBQU0sWUFBVSxTQUNXO1NBNEJuQjtVQTNCUCxZQUFlO0lBQUEsUUEyQlI7SUExQk4sR0FBQSxPQUFHLEVBQUUsVUFDc0I7WUF5QnJCO1dBdkJGO1lBQUg7SUFBQTtHQUFBO0VBQUE7RUFHSCxRQUFNLFlBQVUsT0FDUztTQW1CakI7R0FuQlAsU0FBUztHQUNULE1Ba0JPO0dBaEJKLE9BQUE7U0FBTSxNQUFJLEtBZ0JOLGlCQWhCd0I7U0FDdEIsU0FBTyxLQUFLO1NBQ1osTUFBSSxLQUFLO0lBRWpCLEdBQUcsU0FBSyxFQUFFLEdBQ0M7S0FBVjtJQUFBO01BQ0ksTUFBSSxFQUFFO0dBQUE7VUFDWjtFQUFBO0VBRUQsUUFBTSxZQUFVLE9BQ1E7VUFFdkI7RUFBQTtFQUdELFFBQU0sWUFBVSxPQUNTO1NBQWpCO1VBQVAsU0FBTyxNQUFLO0VBQUEiLCJmaWxlIjoiaGFzaC1jb2RlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
