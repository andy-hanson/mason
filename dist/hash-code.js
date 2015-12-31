"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at","./js","./math/Number","./Type/Method"],(exports,_64_0,js_1,Number_2,Method_3)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(_64_0),empty_63=_ms.get(_$0,"empty?"),_$1=_ms.getModule(js_1),defined_63=_ms.get(_$1,"defined?"),id_61_63=_ms.get(_$1,"id=?"),js_42=_ms.get(_$1,"js*"),js_45=_ms.get(_$1,"js-"),js_43=_ms.get(_$1,"js+"),js_45bar=_ms.get(_$1,"js-bar"),js_45sub=_ms.get(_$1,"js-sub"),_$2=_ms.getModule(Number_2),Int=_ms.get(_$2,"Int"),Method=_ms.getDefaultExport(Method_3),_$3=_ms.getModule(Method_3),impl_33=_ms.get(_$3,"impl!");
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
									let val=js_45sub(_this,key);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvaGFzaC1jb2RlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBT0EsZ0NBQVcsS0FBSSxRQUNNLEtBQUE7O2NBRXBCO0dBQ0Esb0JBQU07R0FDTiwwQkFBUztHQUNULHlDQUFhO0dBQ2IsMkJBQ1csbUJBQUE7UUF1REg7V0F2REE7WUF1REE7V0F0RE4sS0FDSTtjQUFIO01BQUE7V0FDRCxPQUNTO2NBQVI7TUFBQTs7T0FHQSxXQUFTLG1CQWdESjtjQS9DQSxDQUFDLFdBQVMsUUFBUSxPQUNNLEtBQUE7UUFDNUIsbUJBNkNJLE1BN0NrQjtRQUN0QixTQUFPO1FBQ0gsUUFBQSxPQUFPLFlBMkNQLE9BMUN1QjtTQUExQixRQUFNLFNBMENILE1BMUNlO1NBQ2xCLGVBQVcsWUFBVTtjQUNiLFNBQVEsTUFBSSxLQUFLLElBQUk7Y0FDckIsU0FBUSxNQUFJLEtBQUssWUFBVTtRQUFBO1FBQ3BDLG1CQXNDSSxNQXRDa0I7ZUFDdEI7T0FBQTtLQUFBO0lBQUE7R0FBQTs7O0VBRUwsbUJBQWUsS0FBSTtFQUdsQixRQUFNLFlBQVUsUUFDVSxVQUFBO09BK0JsQjtVQS9CRixDQStCRSxNQS9CRyxFQUFFO0VBQUE7RUFFYixRQUFNLFlBQVUsU0FDVyxVQUFBO09BNEJuQjtVQTNCUCxZQUFlO0lBQUEsTUEyQlI7SUExQk4sR0FBQSxTQUFPLEdBQ0E7WUF5QkQ7V0F2QkY7WUFBRjtJQUFBO0dBQUE7RUFBQTtFQUdKLFFBQU0sWUFBVSxPQUNTLFVBQUE7T0FtQmpCO0dBbkJQLFNBQU87R0FDUCxNQWtCTztHQWhCSixPQUFBO1NBQU0sTUFBSSxLQWdCTixpQkFoQndCO1NBQ3RCLFNBQU8sS0FBSztTQUNaLE1BQUksS0FBSztJQUVkLEdBQUEsU0FBSyxFQUFFLEdBQ0M7S0FBVjtJQUFBO01BQ0ksTUFBSSxFQUFFO0dBQUE7VUFDWjtFQUFBO0VBRUQsUUFBTSxZQUFVLE9BQ1EsSUFBQTtVQUV2QjtFQUFBO0VBR0QsUUFBTSxZQUFVLE9BQ1MsVUFBQTtPQUFqQjtVQUFQLFNBQU8sTUFBSztFQUFBIiwiZmlsZSI6Imhhc2gtY29kZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
