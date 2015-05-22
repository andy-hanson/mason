"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../hash-code","../../js","../../methods","../../Objectbang","../../Type/Js-Method","../../Type/Kind","../../Type/Tuple","../../Type/Wrap-Type","../at","../atbang","../at-Type","../q","./Map","./Id-Mapbang","./Mapbang","./Map-Type","../../bang","../Seq/Seq","./Map"],function(exports,compare_0,hash_45code_1,js_2,methods_3,Object_33_4,Js_45Method_5,Kind_6,Tuple_7,Wrap_45Type_8,_64_9,_64_33_10,_64_45Type_11,_63_12,Map_13,Id_45Map_33_14,Map_33_15,Map_45Type_16,_33_17,Seq_18,Map_19){
	exports._get=_ms.lazy(function(){
		const _$3=_ms.getModule(compare_0),_61_63=_ms.get(_$3,"=?"),hash_45code=_ms.getDefaultExport(hash_45code_1),_$5=_ms.getModule(js_2),defined_63=_ms.get(_$5,"defined?"),_$6=_ms.getModule(methods_3),freeze=_ms.get(_$6,"freeze"),_$7=_ms.getModule(Object_33_4),p_33=_ms.get(_$7,"p!"),_$8=_ms.getModule(Js_45Method_5),js_45impl_33=_ms.get(_$8,"js-impl!"),_$9=_ms.getModule(Kind_6),kind_33=_ms.get(_$9,"kind!"),self_45kind_33=_ms.get(_$9,"self-kind!"),Tuple=_ms.getDefaultExport(Tuple_7),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_8),_$12=_ms.getModule(_64_9),iterator=_ms.get(_$12,"iterator"),map=_ms.get(_$12,"map"),_$13=_ms.getModule(_64_33_10),empty_33=_ms.get(_$13,"empty!"),_$14=_ms.getModule(_64_45Type_11),empty=_ms.get(_$14,"empty"),_63=_ms.getDefaultExport(_63_12),_$15=_ms.getModule(_63_12),Opt_45_62_63=_ms.get(_$15,"Opt->?"),_$16=_ms.getModule(Map_13),_63get=_ms.get(_$16,"?get"),values=_ms.get(_$16,"values"),Id_45Map_33=_ms.getDefaultExport(Id_45Map_33_14),Map_33=_ms.getDefaultExport(Map_33_15),_$18=_ms.getModule(Map_33_15),assoc_33=_ms.get(_$18,"assoc!"),un_45assoc_33=_ms.get(_$18,"un-assoc!"),Map_45Type=_ms.getDefaultExport(Map_45Type_16),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_17)
		}),_$22=_ms.lazyGetModule(Seq_18),seq_61_63=_ms.lazyProp(_$22,"seq=?"),_$23=_ms.lazyGetModule(Map_19),keys=_ms.lazyProp(_$23,"keys");
		const Hash_45Map_33=Wrap_45Type(function(){
			const doc="Default Map! type. Depends on efficient `hash-code` of its keys.";
			const test=function test(){
				const _=function(){
					const _k0=1,_v0=2;
					const _k1=3,_v1=4;
					return _ms.map(_k0,_v0,_k1,_v1)
				}();
				_ms.unlazy(_33)(_61_63,_ms.sub(_,1),2);
				_ms.unlazy(_33)(_61_63,_ms.sub(_,3),4);
				_ms.unlazy(_33)(_ms.unlazy(seq_61_63),_,function(){
					const _0=[1,2];
					const _1=[3,4];
					return [_0,_1]
				}());
				_ms.unlazy(_33)(_ms.unlazy(seq_61_63),_ms.unlazy(keys)(_),[1,3]);
				return _ms.unlazy(_33)(_61_63,_63get(_,8),empty(_63))
			};
			const wrapped_45type=Id_45Map_33;
			return {
				doc:doc,
				test:test,
				"wrapped-type":wrapped_45type,
				name:"Hash-Map!"
			}
		}());
		const Bucket=Tuple(function(){
			const props=["key","val!","next!"];
			return {
				props:props,
				name:"Bucket"
			}
		}());
		self_45kind_33(Hash_45Map_33,Map_45Type,function(){
			const _k0=empty,_v0=function(){
				return Hash_45Map_33(empty(Id_45Map_33))
			};
			return _ms.map(_k0,_v0)
		}());
		const opt_45bucket_45entry=function opt_45bucket_45entry(opt_45bucket,key){
			let cur=opt_45bucket;
			let res=void 0;
			while(true){
				if(! _ms.bool(defined_63(cur))){
					break
				};
				if(_ms.bool(_61_63(cur.key,key))){
					res=cur
				};
				cur=cur["next!"]
			};
			return res
		};
		js_45impl_33(iterator,Hash_45Map_33,function*(){
			for(let bucket of values(this.val)[Symbol.iterator]()){
				let cur=bucket;
				while(true){
					if(! _ms.bool(defined_63(cur))){
						break
					};
					(yield [cur.key,cur["val!"]]);
					cur=cur["next!"]
				}
			}
		});
		kind_33(Hash_45Map_33,Map_33,function(){
			const _k0=_63get,_v0=function(_,key){
				const bucket=_.val.get(hash_45code(key));
				const entry=opt_45bucket_45entry(bucket,key);
				return map(Opt_45_62_63(entry),function(_){
					return _["val!"]
				})
			};
			const _k1=assoc_33,_v1=function(hm,key,val){
				const hash=hash_45code(key);
				const bucket=hm.val.get(hash);
				{
					const _=opt_45bucket_45entry(bucket,key);
					if(_ms.bool(defined_63(_))){
						p_33(_,"val!",val)
					} else {
						hm.val.set(hash,Bucket(key,val,bucket))
					}
				}
			};
			const _k2=un_45assoc_33,_v2=function(hm,key){
				const hash=hash_45code(key);
				const bucket=hm.val.get(hash);
				return function(){
					const _=bucket;
					if(_ms.bool(defined_63(_))){
						return function(){
							if(_ms.bool(_61_63(_.key,key))){
								{
									const _=bucket["next!"];
									if(_ms.bool(defined_63(_))){
										assoc_33(hm.val,key,_)
									} else {
										un_45assoc_33(hm.val,hash)
									}
								};
								return _63(_["val!"])
							} else {
								let cur=bucket;
								let res=empty(_63);
								while(true){
									const next=cur["next!"];
									if(! _ms.bool(defined_63(_)(next))){
										break
									};
									if(_ms.bool(_61_63(next.key,key))){
										p_33(cur,"next!",next["next!"]);
										res=_63(next["val!"]);
										break
									};
									cur=next
								};
								return res
							}
						}()
					} else {
						return empty(_63)
					}
				}()
			};
			const _k3=freeze,_v3=function(_){
				freeze(_.val);
				return Object.freeze(_)
			};
			const _k4=empty_33,_v4=function(_){
				return empty_33(_.val)
			};
			return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3,_k4,_v4)
		}());
		const name=exports.name="Hash-Map!";
		exports.default=Hash_45Map_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9IYXNoLU1hcCEubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQXdCQSxvQkFBWSxzQkFDUztHQUFwQixVQUFNO0dBRU4sV0FDTyxlQUFBO0lBQU4sa0JBQ0c7S0FBRixVQUFBLE1BQUs7S0FDTCxVQUFBLE1BQUs7OztvQkFDSixlQUFHLEVBQUUsR0FBRztvQkFDUixlQUFHLEVBQUUsR0FBRzswQ0FDRixZQUNDO0tBQVIsU0FBRSxDQUFFLEVBQUU7S0FDTixTQUFFLENBQUUsRUFBRTs7OzJEQUNLLEdBQUUsQ0FBRSxFQUFFOzJCQUNoQixPQUFJLE9BQUssRUFBRSxHQUFJLE1BQU07R0FBQTtHQUV4QixxQkFBYzs7Ozs7Ozs7RUFFZixhQUFTLGdCQUNLO0dBQWIsWUFBTyxDQUFHLE1BQU0sT0FBTzs7Ozs7O0VBRXhCLGVBQVcsY0FBVSxxQkFDUTtHQUE1QixVQUFBLFVBQ1UsVUFBQTtXQUFULGNBQVcsTUFBTTtHQUFBOzs7RUFJbkIsMkJBQW9CLDhCQUFBLGFBQVcsSUFDRztHQUFqQyxRQUFRO0dBRVIsUUFBUTtHQUVKLFdBQUE7SUFBSCxjQUFRLFdBQVMsTUFDRztLQUFuQjtJQUFBO0lBQ0QsWUFBSSxPQUFHLFFBQVEsTUFDRztTQUFWO0lBQUE7UUFDRDs7VUFDUjtFQUFBO0VBRUQsYUFBUyxTQUFTLGNBQ1ksV0FBQTtHQUF4QixRQUFBLFVBQVUsT0FBTyw2QkFDUTtJQUE3QixRQUFRO0lBRUosV0FBQTtLQUFILGNBQVEsV0FBUyxNQUNHO01BQW5CO0tBQUE7WUFDRSxDQUFFLFFBQVE7U0FDTjs7OztFQUVWLFFBQU0sY0FBVSxpQkFDSTtHQUFuQixVQUFBLFdBQVMsU0FBQSxFQUFFLElBQ0c7SUFBYixhQUFTLFVBQVcsWUFBVTtJQUM5QixZQUFRLHFCQUFpQixPQUFPO1dBQ2hDLElBQUssYUFBTyxPQUFRLFNBQUEsRUFDQztZQUFwQjs7O0dBRUYsVUFBQSxhQUFXLFNBQUEsR0FBRyxJQUFJLElBQ0c7SUFBcEIsV0FBTyxZQUFVO0lBQ2pCLGFBQVMsV0FBVztJQUNkO0tBQUEsUUFBQSxxQkFBaUIsT0FBTztLQUM3QixZQUFBLFdBQVEsSUFDQztNQUNSLEtBQUcsRUFBRyxPQUFNO0tBQUEsT0FFVDtNQUNILFdBQVcsS0FBTSxPQUFPLElBQUksSUFBSTtLQUFBO0lBQUE7R0FBQTtHQUVuQyxVQUFBLGtCQUFjLFNBQUEsR0FBRyxJQUNHO0lBQW5CLFdBQU8sWUFBVTtJQUNqQixhQUFTLFdBQVc7O0tBQ2YsUUFBQTtLQUNKLFlBQUEsV0FBUSxJQUNDOztPQUNQLFlBQUEsT0FBRyxNQUFNLE1BQ0c7UUFBTDtTQUFBLFFBQUE7U0FDTCxZQUFBLFdBQVEsSUFDQztVQUFSLFNBQU8sT0FBTyxJQUFJO1NBQUEsT0FFZjtVQUFILGNBQVUsT0FBTztTQUFBO1FBQUE7ZUFDbkIsSUFBRTtjQUVDO1FBQ0gsUUFBUTtRQUNSLFFBQVEsTUFBTTtRQUVWLFdBQUE7U0FBSCxXQUFPO1NBQ1AsY0FBUSxXQUFRLEdBQUUsT0FDSTtVQUFyQjtTQUFBO1NBQ0QsWUFBSSxPQUFHLFNBQVMsTUFDRztVQUFsQixLQUFHLElBQUssUUFBTztjQUNSLElBQUU7VUFDVDtTQUFBO2FBQ007UUFBQTtlQUNSO09BQUE7TUFBQTtLQUFBLE9BRUM7YUFBSCxNQUFNO0tBQUE7SUFBQTtHQUFBO0dBRVQsVUFBQSxXQUFXLFNBQUEsRUFDQztJQUFYLE9BQU87V0FDUCxjQUFjO0dBQUE7R0FFZixVQUFBLGFBQVcsU0FBQSxFQUNDO1dBQVgsU0FBTzs7OztFQTVIVCx3QkFBQTtrQkE4SEEiLCJmaWxlIjoiYXQvTWFwL0hhc2gtTWFwYmFuZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9