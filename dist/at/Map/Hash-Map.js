"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../hash-code","../../js","../../methods","../../Object","../../Type/Js-Method","../../Type/Kind","../../Type/Tuple","../../Type/Wrap-Type","../at","../at-Type","../q","./Id-Map","./Map","./Map-Type","../Seq/Seq","./Map"],(exports,compare_0,hash_45code_1,js_2,methods_3,Object_4,Js_45Method_5,Kind_6,Tuple_7,Wrap_45Type_8,_64_9,_64_45Type_10,_63_11,Id_45Map_12,Map_13,Map_45Type_14,Seq_15,Map_16)=>{
	exports._get=_ms.lazy(()=>{
		const _$3=_ms.getModule(compare_0),_61_63=_ms.get(_$3,"=?"),hash_45code=_ms.getDefaultExport(hash_45code_1),_$5=_ms.getModule(js_2),defined_63=_ms.get(_$5,"defined?"),_$6=_ms.getModule(methods_3),freeze=_ms.get(_$6,"freeze"),_$7=_ms.getModule(Object_4),p_33=_ms.get(_$7,"p!"),_$8=_ms.getModule(Js_45Method_5),js_45impl_33=_ms.get(_$8,"js-impl!"),_$9=_ms.getModule(Kind_6),kind_33=_ms.get(_$9,"kind!"),self_45kind_33=_ms.get(_$9,"self-kind!"),Tuple=_ms.getDefaultExport(Tuple_7),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_8),_$12=_ms.getModule(_64_9),empty_33=_ms.get(_$12,"empty!"),iterator=_ms.get(_$12,"iterator"),map=_ms.get(_$12,"map"),_$13=_ms.getModule(_64_45Type_10),empty=_ms.get(_$13,"empty"),_63=_ms.getDefaultExport(_63_11),_$14=_ms.getModule(_63_11),Opt_45_62_63=_ms.get(_$14,"Opt->?"),Id_45Map=_ms.getDefaultExport(Id_45Map_12),Map=_ms.getDefaultExport(Map_13),_$16=_ms.getModule(Map_13),assoc_33=_ms.get(_$16,"assoc!"),_63get=_ms.get(_$16,"?get"),un_45assoc_33=_ms.get(_$16,"un-assoc!"),values=_ms.get(_$16,"values"),Map_45Type=_ms.getDefaultExport(Map_45Type_14),_$19=_ms.lazyGetModule(Seq_15),seq_61_63=_ms.lazyProp(_$19,"seq=?"),_$20=_ms.lazyGetModule(Map_16),keys=_ms.lazyProp(_$20,"keys");
		const Hash_45Map=Wrap_45Type(()=>{
			const built={};
			const doc=built.doc=`Default Map type. Depends on efficient \`hash-code\` of its keys.`;
			const test=built.test=function test(){
				const _=()=>{
					const built=new global.Map();
					_ms.assoc(built,1,2);
					_ms.assoc(built,3,4);
					return built
				}();
				_ms.assert(_61_63,_ms.sub(_,1),2);
				_ms.assert(_61_63,_ms.sub(_,3),4);
				_ms.assert(_ms.unlazy(seq_61_63),_,()=>{
					const built=[];
					_ms.add(built,[1,2]);
					_ms.add(built,[3,4]);
					return built
				}());
				_ms.assert(_ms.unlazy(seq_61_63),_ms.unlazy(keys)(_),[1,3]);
				_ms.assert(_61_63,_63get(_,8),empty(_63))
			};
			const wrapped_45type=built["wrapped-type"]=Id_45Map;
			return _ms.setName(built,"Hash-Map")
		}());
		const Bucket=Tuple(()=>{
			const built={};
			const props=built.props=[`key`,`val!`,`next!`];
			return _ms.setName(built,"Bucket")
		}());
		self_45kind_33(Hash_45Map,Map_45Type,()=>{
			const built=new global.Map();
			_ms.assoc(built,empty,()=>{
				return Hash_45Map(empty(Id_45Map))
			});
			return built
		}());
		const opt_45bucket_45entry=function opt_45bucket_45entry(opt_45bucket,key){
			let cur=opt_45bucket;
			return ()=>{
				for(;;){
					if(! _ms.bool(defined_63(cur))){
						return void 0
					};
					if(_61_63(cur.key,key)){
						return cur
					};
					cur=cur["next!"]
				}
			}()
		};
		js_45impl_33(iterator,Hash_45Map,function*(){
			const _this=this;
			for(let bucket of values(_this.val)){
				let cur=bucket;
				for(;;){
					if(! _ms.bool(defined_63(cur))){
						break
					};
					(yield [cur.key,cur["val!"]]);
					cur=cur["next!"]
				}
			}
		});
		kind_33(Hash_45Map,Map,()=>{
			const built=new global.Map();
			_ms.assoc(built,_63get,(_,key)=>{
				const bucket=_.val.get(hash_45code(key));
				const entry=opt_45bucket_45entry(bucket,key);
				return map(Opt_45_62_63(entry),_=>{
					return _["val!"]
				})
			});
			_ms.assoc(built,assoc_33,(hm,key,val)=>{
				const hash=hash_45code(key);
				const bucket=hm.val.get(hash);
				{
					const _=opt_45bucket_45entry(bucket,key);
					if(_ms.bool(defined_63(_))){
						p_33(_,`val!`,val)
					} else {
						hm.val.set(hash,Bucket(key,val,bucket))
					}
				}
			});
			_ms.assoc(built,un_45assoc_33,(hm,key)=>{
				const hash=hash_45code(key);
				const bucket=hm.val.get(hash);
				return ()=>{
					const _=bucket;
					if(_ms.bool(defined_63(_))){
						return ()=>{
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
								return ()=>{
									for(;;){
										const next=cur["next!"];
										if(! _ms.bool(defined_63(_)(next))){
											return empty(_63)
										};
										if(_61_63(next.key,key)){
											p_33(cur,`next!`,next["next!"]);
											return _63(next["val!"])
										};
										cur=next
									}
								}()
							}
						}()
					} else {
						return empty(_63)
					}
				}()
			});
			_ms.assoc(built,freeze,_=>{
				freeze(_.val);
				return Object.freeze(_)
			});
			_ms.assoc(built,empty_33,_=>{
				empty_33(_.val)
			});
			return built
		}());
		const name=exports.name=`Hash-Map`;
		exports.default=Hash_45Map;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9IYXNoLU1hcC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQXFCQSxpQkFBVSxnQkFDUzs7R0FBbEIsb0JBQU07R0FFTixzQkFDUSxlQUFBO0lBQVAsWUFDRzs7cUJBQUYsRUFBSztxQkFDTCxFQUFLOzs7ZUFDRSxlQUFHLEVBQUUsR0FBRztlQUNSLGVBQUcsRUFBRSxHQUFHO3FDQUNGLE1BQ0M7O21CQUFaLENBQUUsRUFBRTttQkFDSixDQUFFLEVBQUU7OztzREFDVyxHQUFFLENBQUUsRUFBRTtlQUNoQixPQUFJLE9BQUssRUFBRSxHQUFJLE1BQU07R0FBQTtHQUU5QiwyQ0FBYzs7O0VBRWYsYUFBUyxVQUNLOztHQUFiLHdCQUFPLENBQUcsTUFBTSxPQUFPOzs7RUFFeEIsZUFBVyxXQUFTLGVBQ1E7O21CQUEzQixNQUNVLElBQUE7V0FBVCxXQUFVLE1BQU07R0FBQTs7O0VBSWxCLDJCQUFvQiw4QkFBQSxhQUFXLElBQ0c7R0FBakMsUUFBUTs7V0FFTDtLQUFGLGNBQVEsV0FBUyxNQUNHO01BQW5CLE9BQU07O0tBQ1AsR0FBSSxPQUFHLFFBQVEsS0FDRztNQUFqQixPQUFNO0tBQUE7U0FDQTs7OztFQUVULGFBQVMsU0FBUyxXQUNhLFdBQUE7O0dBQXpCLFFBQUEsVUFBVSxPQUFPLFdBQ0k7SUFBekIsUUFBUTtJQUVKLE9BQUE7S0FBSCxjQUFRLFdBQVMsTUFDRztNQUFuQjtLQUFBO1lBQ0UsQ0FBRSxRQUFRO1NBQ047Ozs7RUFFVixRQUFNLFdBQVMsUUFDRzs7bUJBQWpCLE9BQVMsQ0FBQSxFQUFFLE1BQ0c7SUFBYixhQUFTLFVBQVcsWUFBVTtJQUM5QixZQUFRLHFCQUFpQixPQUFPO1dBQ2hDLElBQUssYUFBTyxPQUFRLEdBQ0M7WUFBcEI7OzttQkFFRixTQUFZLENBQUEsR0FBRyxJQUFJLE1BQ0c7SUFBckIsV0FBTyxZQUFVO0lBQ2pCLGFBQVMsV0FBVztJQUNkO0tBQUEsUUFBQSxxQkFBaUIsT0FBTztLQUM3QixZQUFBLFdBQVEsSUFDQztNQUNSLEtBQUcsRUFBRyxPQUFNO0tBQUEsT0FFVDtNQUNILFdBQVcsS0FBTSxPQUFPLElBQUksSUFBSTtLQUFBO0lBQUE7R0FBQTttQkFFbkMsY0FBYyxDQUFBLEdBQUcsTUFDRztJQUFuQixXQUFPLFlBQVU7SUFDakIsYUFBUyxXQUFXOztLQUNmLFFBQUE7S0FDSixZQUFBLFdBQVEsSUFDQzs7T0FDUCxZQUFBLE9BQUcsTUFBTSxNQUNHO1FBQUw7U0FBQSxRQUFBO1NBQ0wsWUFBQSxXQUFRLElBQ0M7VUFBUixTQUFPLE9BQU8sSUFBSTtTQUFBLE9BRWY7VUFBSCxjQUFVLE9BQU87U0FBQTtRQUFBO2VBQ25CLElBQUU7Y0FFQztRQUFILFFBQVE7O2dCQUVMO1VBQUYsV0FBTztVQUNQLGNBQVEsV0FBUSxHQUFFLE9BQ0k7V0FBckIsT0FBTSxNQUFNO1VBQUE7VUFDYixHQUFJLE9BQUcsU0FBUyxLQUNHO1dBQWxCLEtBQUcsSUFBSyxRQUFPO1dBQ2YsT0FBTSxJQUFFOztjQUNGO1NBQUE7UUFBQTtPQUFBO01BQUE7S0FBQSxPQUVQO2FBQUgsTUFBTTtLQUFBO0lBQUE7R0FBQTttQkFFVCxPQUFXLEdBQ0M7SUFBWCxPQUFPO1dBQ1AsY0FBYztHQUFBO21CQUVmLFNBQVksR0FDQztJQUFaLFNBQU87Ozs7RUFsSFQsd0JBQUE7a0JBcUJBIiwiZmlsZSI6ImF0L01hcC9IYXNoLU1hcC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9