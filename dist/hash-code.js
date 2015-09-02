"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./compare","./js","./math/Number","./Type/Method"],(exports,compare_0,js_1,Number_2,Method_3)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_$1=_ms.getModule(js_1),id_61_63=_ms.get(_$1,"id=?"),js_42=_ms.get(_$1,"js*"),js_45=_ms.get(_$1,"js-"),js_43=_ms.get(_$1,"js+"),js_45bar=_ms.get(_$1,"js-bar"),js_45sub=_ms.get(_$1,"js-sub"),_$2=_ms.getModule(Number_2),Int=_ms.get(_$2,"Int"),Method=_ms.getDefaultExport(Method_3),_$3=_ms.getModule(Method_3),impl_33=_ms.get(_$3,"impl!");
		const hash_45code=new (Method)((()=>{
			const built={};
			built[`name`]="hash-code";
			const doc=built.doc=`Integer used to identify a value in a Hash-Map (or Hash-Set).
This should have a high probability of being different than the hash-codes of the other values in the map.`;
			const test=built.test=function test(){
				const a=(()=>{
					const built={};
					const x=built.x=1;
					const y=built.y=2;
					return built
				})();
				const b=(()=>{
					const built={};
					const x=built.x=1;
					const y=built.y=1;
					return built
				})();
				_ms.assert(_61_63,hash_45code(a),hash_45code(a));
				_ms.assertNot(_61_63,hash_45code(a),hash_45code(b))
			};
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
			return (()=>{
				const _=_this;
				if(_){
					return 1
				} else {
					return 0
				}
			})()
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
		impl_33(hash_45code,String,(()=>{
			const built={};
			const test=built.test=function test(){
				_ms.assert(_61_63,hash_45code(`a`),hash_45code(`a`));
				_ms.assertNot(_61_63,hash_45code(`a`),hash_45code(`b`))
			};
			return _ms.set(function(){
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
			},built)
		})());
		impl_33(hash_45code,Symbol,(()=>{
			const built={};
			const test=built.test=function test(){
				const sym=Symbol(`test`);
				_ms.assert(_61_63,hash_45code(sym),hash_45code(sym))
			};
			return _ms.set(()=>{
				return 42
			},built)
		})());
		impl_33(hash_45code,Number,function(){
			const _this=this;
			return js_45bar(_this,0)
		});
		const name=exports.name=`hash-code`;
		exports.default=hash_45code;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvaGFzaC1jb2RlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBT0Esa0JBQVcsS0FBSSxRQUNNLEtBQUE7O1NBQXBCLFFBQUE7R0FDQSxvQkFDQztHQUVELHNCQUNRLGVBQUE7SUFBUCxRQUNHLEtBQUE7O0tBQUYsZ0JBQUc7S0FDSCxnQkFBRzs7O0lBQ0osUUFDRyxLQUFBOztLQUFGLGdCQUFHO0tBQ0gsZ0JBQUc7OztlQUNJLE9BQUksWUFBVSxHQUFJLFlBQVU7a0JBQzVCLE9BQUksWUFBVSxHQUFJLFlBQVU7R0FBQTtHQUVyQyxzQkFBTTtHQUNOLDRCQUFTO0dBQ1QsMkNBQWE7R0FDYiw2QkFDVyxtQkFBQTtVQXFFSjtXQXBFRjtLQUFILEdBQUEsU0FvRUssTUFwRUssTUFDSTthQUFiO0tBQUEsT0FDRCxHQUFBLFNBa0VLLE1BbEVLLFFBQ1M7YUFBbEI7S0FBQSxPQUVHO2FBQUU7T0FBQSxRQUFBLG1CQStERDtPQTlESCxHQUFBLFNBQUssRUFBRSxRQUNTO1FBQ2YsbUJBNERFLE1BNURvQjtRQUN0QixTQUFTO1FBRUosUUFBQSxPQUFPLFlBeURWLE9BeEQwQjtTQUEzQixVQUFNLFNBd0RMLE1BeERpQjtTQUNsQixpQkFBVyxZQUFVO2NBQ2IsU0FBUSxNQUFJLEtBQUssSUFBSTtjQUNyQixTQUFRLE1BQUksS0FBSyxZQUFVO1FBQUE7UUFFcEMsbUJBbURFLE1BbkRvQjtlQUN0QjtPQUFBLE9BRUc7ZUFBSDtPQUFBO01BQUE7S0FBQTtJQUFBO0dBQUE7OztFQUVOLHFCQUFlLEtBQUk7RUFHbkIsUUFBTSxZQUFVLFFBQ1UsVUFBQTtTQTBDbEI7VUExQ0Y7SUFBQSxRQTBDRTtJQXpDTixHQUFBLEVBQ0M7WUFBQTtJQUFBLE9BRUc7WUFBSDtJQUFBO0dBQUE7RUFBQTtFQUVILFFBQU0sWUFBVSxTQUNXLFVBQUE7U0FtQ25CO1VBbENQLFlBQWU7SUFBQSxRQWtDUjtJQWpDTixHQUFBLE9BQUcsRUFBRSxVQUN3QjtZQWdDdkI7V0E5QkY7WUFBSDtJQUFBO0dBQUE7RUFBQTtFQUdILFFBQU0sWUFBVSxPQUNNLEtBQUE7O0dBQXJCLHNCQUNRLGVBQUE7ZUFBQyxPQUFJLFlBQVcsS0FBSyxZQUFXO2tCQUMvQixPQUFJLFlBQVcsS0FBSyxZQUFXOztrQkFFdEMsVUFBQTtVQXNCSztJQXRCTixTQUFTO0lBQ1QsTUFxQk07SUFuQkYsT0FBQTtVQUFLLE1BQUksS0FtQlAsaUJBbkJ5QjtVQUN0QixTQUFPLEtBQUs7VUFDWixNQUFJLEtBQUs7S0FFakIsR0FBSSxTQUFLLEVBQUUsR0FDQztNQUFYO0tBQUE7T0FDSSxNQUFJLEVBQUU7SUFBQTtXQUNaO0dBQUE7O0VBRUYsUUFBTSxZQUVFLE9BRGMsS0FBQTs7R0FBckIsc0JBQ1EsZUFBQTtJQUFQLFVBQU0sT0FBUTtlQUNOLE9BQUksWUFBVSxLQUFNLFlBQVU7R0FBQTtrQkFFdEMsSUFBQTtXQUNBO0dBQUE7O0VBR0YsUUFBTSxZQUFVLE9BQ1MsVUFBQTtTQUFqQjtVQUFQLFNBQU8sTUFBSztFQUFBO0VBL0ZiLHdCQUFBO2tCQU9BIiwiZmlsZSI6Imhhc2gtY29kZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9