"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../hash-code","../../js","../../methods","../../Objectbang","../../Type/Kind","../../Type/Method","../../Type/Wrap-Type","../at","../atbang","../at-Type","../Seq/Stream","../q","./Map","./Id-Mapbang","./Mapbang","./Map-Type","../../bang","../Seq/Seq"],function(exports,compare_0,hash_45code_1,js_2,methods_3,Object_33_4,Kind_5,Method_6,Wrap_45Type_7,_64_8,_64_33_9,_64_45Type_10,Stream_11,_63_12,Map_13,Id_45Map_33_14,Map_33_15,Map_45Type_16,_33_17,Seq_18){
	exports._get=_ms.lazy(function(){
		const _$3=_ms.getModule(compare_0),_61_63=_ms.get(_$3,"=?"),hash_45code=_ms.getDefaultExport(hash_45code_1),_$5=_ms.getModule(js_2),defined_63=_ms.get(_$5,"defined?"),_$6=_ms.getModule(methods_3),freeze=_ms.get(_$6,"freeze"),_$7=_ms.getModule(Object_33_4),p_33=_ms.get(_$7,"p!"),_$8=_ms.getModule(Kind_5),kind_33=_ms.get(_$8,"kind!"),self_45kind_33=_ms.get(_$8,"self-kind!"),_$9=_ms.getModule(Method_6),impl_33=_ms.get(_$9,"impl!"),self_45impl_33=_ms.get(_$9,"self-impl!"),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_7),_$11=_ms.getModule(_64_8),flat_45map=_ms.get(_$11,"flat-map"),map=_ms.get(_$11,"map"),_$12=_ms.getModule(_64_33_9),empty_33=_ms.get(_$12,"empty!"),_$13=_ms.getModule(_64_45Type_10),empty=_ms.get(_$13,"empty"),Stream=_ms.getDefaultExport(Stream_11),_63=_ms.getDefaultExport(_63_12),_$15=_ms.getModule(_63_12),Opt_45_62_63=_ms.get(_$15,"Opt->?"),_$16=_ms.getModule(Map_13),_63get=_ms.get(_$16,"?get"),keys=_ms.get(_$16,"keys"),values=_ms.get(_$16,"values"),Id_45Map_33=_ms.getDefaultExport(Id_45Map_33_14),Map_33=_ms.getDefaultExport(Map_33_15),_$18=_ms.getModule(Map_33_15),assoc_33=_ms.get(_$18,"assoc!"),un_45assoc_33=_ms.get(_$18,"un-assoc!"),Map_45Type=_ms.getDefaultExport(Map_45Type_16),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_17)
		}),_$22=_ms.lazyGetModule(Seq_18),seq_61_63=_ms.lazyProp(_$22,"seq=?");
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
				_ms.unlazy(_33)(_ms.unlazy(seq_61_63),keys(_),[1,3]);
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
		kind_33(Hash_45Map_33,Map_33);
		self_45kind_33(Hash_45Map_33,Map_45Type);
		self_45impl_33(empty,Hash_45Map_33,function(){
			return Hash_45Map_33(empty(Id_45Map_33))
		});
		const opt_45bucket=function opt_45bucket(_,key){
			return _.val.get(hash_45code(key))
		};
		const opt_45bucket_45entry=function opt_45bucket_45entry(opt_45bucket,key){
			return function(){
				const _=opt_45bucket;
				if(_ms.bool(defined_63(_))){
					return function(){
						if(_ms.bool(_61_63(_.key,key))){
							return _
						} else {
							return opt_45bucket_45entry(_["next!"],key)
						}
					}()
				} else {
					return void 0
				}
			}()
		};
		impl_33(_63get,Hash_45Map_33,function(_,key){
			const bucket=opt_45bucket(_,key);
			const entry=opt_45bucket_45entry(bucket,key);
			return _ms.checkContains(_63,map(Opt_45_62_63(entry),function(be){
				return be["val!"]
			}),"res")
		});
		impl_33(keys,Hash_45Map_33,function(_){
			const buckets=values(_.val);
			return flat_45map(buckets,function(_){
				return Stream(function*(){
					let cur=_;
					while(true){
						if(! _ms.bool(defined_63(cur))){
							break
						};
						(yield cur.key);
						cur=cur["next!"]
					}
				})
			})
		});
		impl_33(assoc_33,Hash_45Map_33,function(hm,key,val){
			const bucket=opt_45bucket(hm,key);
			{
				const _=opt_45bucket_45entry(bucket,key);
				if(_ms.bool(defined_63(_))){
					p_33(_,"val!",val)
				} else {
					const k=key;
					hm.val.set(hash_45code(key),function(){
						const key=k;
						const val_33=val;
						const next_33=bucket;
						return {
							key:key,
							"val!":val_33,
							"next!":next_33
						}
					}())
				}
			}
		});
		impl_33(un_45assoc_33,Hash_45Map_33,function(hm,key){
			const bucket=opt_45bucket(hm,key);
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
									un_45assoc_33(hm.val,hash_45code(key))
								}
							};
							return _63(_["val!"])
						} else {
							const delete_45from_45next_45bucket_33=function delete_45from_45next_45bucket_33(prev_45bucket){
								const next=prev_45bucket["next!"];
								return function(){
									const _=next;
									if(_ms.bool(defined_63(_))){
										return function(){
											if(_ms.bool(_61_63(next.key,key))){
												p_33(prev_45bucket,"next!",next["next!"]);
												return _63(next["val!"])
											} else {
												return delete_45from_45next_45bucket_33(next)
											}
										}()
									} else {
										return empty(_63)
									}
								}()
							};
							return delete_45from_45next_45bucket_33(bucket)
						}
					}()
				} else {
					return empty(_63)
				}
			}()
		});
		impl_33(freeze,Hash_45Map_33,function(_){
			freeze(_.val);
			return Object.freeze(_)
		});
		impl_33(empty_33,Hash_45Map_33,function(_){
			return empty_33(_.val)
		});
		const name=exports.name="Hash-Map!";
		exports.default=Hash_45Map_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9IYXNoLU1hcCEubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQXVCQSxvQkFBWSxzQkFDUztHQUFwQixVQUFNO0dBQ04sV0FDTyxlQUFBO0lBQU4sa0JBQ0c7S0FBRixVQUFBLE1BQUs7S0FDTCxVQUFBLE1BQUs7OztvQkFDSixlQUFHLEVBQUUsR0FBRztvQkFDUixlQUFHLEVBQUUsR0FBRzswQ0FDRixLQUFBLEdBQU0sQ0FBRSxFQUFFOzJCQUNoQixPQUFJLE9BQUssRUFBRSxHQUFJLE1BQU07R0FBQTtHQUV4QixxQkFBYzs7Ozs7Ozs7RUFFZixRQUFNLGNBQVU7RUFFaEIsZUFBVyxjQUFVO0VBQ3JCLGVBQVcsTUFBTSxjQUNXLFVBQUE7VUFBM0IsY0FBVyxNQUFNO0VBQUE7RUFFbEIsbUJBQWMsc0JBQUEsRUFBRSxJQUNHO1VBQWxCLFVBQVcsWUFBVTtFQUFBO0VBRXRCLDJCQUFvQiw4QkFBQSxhQUFXLElBQ0c7O0lBQTVCLFFBQUE7SUFDSixZQUFBLFdBQUEsSUFDUzs7TUFDUCxZQUFBLE9BQUcsTUFBTSxNQUNHO2NBQVg7TUFBQSxPQUVHO2NBQUgscUJBQWlCLFdBQVE7TUFBQTtLQUFBO0lBQUEsT0FFeEI7WUFBSDs7OztFQUVILFFBQU0sT0FBSyxjQUFXLFNBQUcsRUFBRSxJQUNHO0dBQTdCLGFBQVMsYUFBVyxFQUFFO0dBQ3RCLFlBQVEscUJBQWlCLE9BQU87NEJBRlYsSUFHdEIsSUFBSyxhQUFPLE9BQVEsU0FBQSxHQUNFO1dBQXJCOzs7RUFFRixRQUFNLEtBQUssY0FBVyxTQUFBLEVBQ0M7R0FBdEIsY0FBVSxPQUFPO1VBQ2pCLFdBQVMsUUFBUyxTQUFBLEVBQ0M7V0FBbEIsT0FDUyxXQUFBO0tBQVIsUUFBUTtLQUVKLFdBQUE7TUFBSCxjQUFRLFdBQVMsTUFDRztPQUFuQjtNQUFBO2FBQ0U7VUFDSTs7Ozs7RUFJWCxRQUFNLFNBQU8sY0FBVyxTQUFBLEdBQUcsSUFBSSxJQUNHO0dBQWpDLGFBQVMsYUFBVyxHQUFHO0dBQ2pCO0lBQUEsUUFBQSxxQkFBaUIsT0FBTztJQUM3QixZQUFBLFdBQUEsSUFDUztLQUFSLEtBQUcsRUFBRyxPQUFNO0lBQUEsT0FFVDtLQUNILFFBQUk7S0FDSixXQUFZLFlBQVUsZUFDSTtNQUF6QixVQUFLO01BQ0wsYUFBTTtNQUNOLGNBQU87Ozs7Ozs7Ozs7RUFFWCxRQUFNLGNBQVUsY0FBVyxTQUFBLEdBQUcsSUFDRztHQUFoQyxhQUFTLGFBQVcsR0FBRzs7SUFDbEIsUUFBQTtJQUNKLFlBQUEsV0FBQSxJQUNTOztNQUNQLFlBQUEsT0FBRyxNQUFNLE1BQ0c7T0FBTDtRQUFBLFFBQUE7UUFDTCxZQUFBLFdBQUEsSUFDUztTQUFSLFNBQU8sT0FBTyxJQUFJO1FBQUEsT0FFZjtTQUFILGNBQVUsT0FBUSxZQUFVO1FBQUE7T0FBQTtjQUM5QixJQUFFO2FBRUM7T0FBSCx1Q0FBNEIsMENBQUEsY0FDVztRQUF0QyxXQUFPOztTQUNGLFFBQUE7U0FDSixZQUFBLFdBQUEsSUFDUzs7V0FDUCxZQUFBLE9BQUcsU0FBUyxNQUNHO1lBQWQsS0FBRyxjQUFhLFFBQU87bUJBQ3ZCLElBQUU7a0JBRUM7bUJBQUgsaUNBQXlCO1dBQUE7VUFBQTtTQUFBLE9BRXhCO2lCQUFILE1BQU07U0FBQTtRQUFBO09BQUE7Y0FFVCxpQ0FBeUI7TUFBQTtLQUFBO0lBQUEsT0FFeEI7WUFBSCxNQUFNO0lBQUE7R0FBQTtFQUFBO0VBRVQsUUFBTSxPQUFPLGNBQVcsU0FBQSxFQUNDO0dBQXhCLE9BQU87VUFDUCxjQUFjO0VBQUE7RUFFZixRQUFNLFNBQU8sY0FBVyxTQUFBLEVBQ0M7VUFBeEIsU0FBTzs7RUEzSFIsd0JBQUE7a0JBNkhBIiwiZmlsZSI6ImF0L01hcC9IYXNoLU1hcGJhbmcuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==