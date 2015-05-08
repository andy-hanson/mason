"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../hash-code","../../js","../../methods","../../Obj","../../Objbang","../../Type/Kind","../../Type/Method","../../Type/Wrap-Type","../at","../atbang","../at-Type","../Seq/Stream","../q","./Map","./Id-Mapbang","./Mapbang","./Map-Type","../../Generatorbang","../../bang","../Seq/Seq"],function(exports,compare_0,hash_45code_1,js_2,methods_3,Obj_4,Obj_33_5,Kind_6,Method_7,Wrap_45Type_8,_64_9,_64_33_10,_64_45Type_11,Stream_12,_63_13,Map_14,Id_45Map_33_15,Map_33_16,Map_45Type_17,Generator_33_18,_33_19,Seq_20){
	exports._get=_ms.lazy(function(){
		const _$4=_ms.getModule(compare_0),_61_63=_ms.get(_$4,"=?"),hash_45code=_ms.getDefaultExport(hash_45code_1),_$6=_ms.getModule(js_2),defined_63=_ms.get(_$6,"defined?"),_$7=_ms.getModule(methods_3),freeze=_ms.get(_$7,"freeze"),Obj=_ms.getDefaultExport(Obj_4),_$9=_ms.getModule(Obj_33_5),p_33=_ms.get(_$9,"p!"),_$10=_ms.getModule(Kind_6),kind_33=_ms.get(_$10,"kind!"),self_45kind_33=_ms.get(_$10,"self-kind!"),_$11=_ms.getModule(Method_7),impl_33=_ms.get(_$11,"impl!"),self_45impl_33=_ms.get(_$11,"self-impl!"),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_8),_$13=_ms.getModule(_64_9),flat_45map=_ms.get(_$13,"flat-map"),map=_ms.get(_$13,"map"),_$14=_ms.getModule(_64_33_10),empty_33=_ms.get(_$14,"empty!"),_$15=_ms.getModule(_64_45Type_11),empty=_ms.get(_$15,"empty"),Stream=_ms.getDefaultExport(Stream_12),_63=_ms.getDefaultExport(_63_13),_$17=_ms.getModule(_63_13),Opt_45_62_63=_ms.get(_$17,"Opt->?"),_$18=_ms.getModule(Map_14),_63get=_ms.get(_$18,"?get"),keys=_ms.get(_$18,"keys"),values=_ms.get(_$18,"values"),Id_45Map_33=_ms.getDefaultExport(Id_45Map_33_15),Map_33=_ms.getDefaultExport(Map_33_16),_$20=_ms.getModule(Map_33_16),assoc_33=_ms.get(_$20,"assoc!"),un_45assoc_33=_ms.get(_$20,"un-assoc!"),Map_45Type=_ms.getDefaultExport(Map_45Type_17),_$23=_ms.lazyGetModule(Generator_33_18),if_126=_ms.lazyProp(_$23,"if~"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_19)
		}),_$26=_ms.lazyGetModule(Seq_20),seq_61_63=_ms.lazyProp(_$26,"seq=?");
		const exports={};
		const Hash_45Map_33=Wrap_45Type(function(){
			const doc="Default Map! type. Depends on efficient `hash-code` of its keys.";
			const test=function(){
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
				displayName:"Hash-Map!"
			}
		}());
		kind_33(Hash_45Map_33,Map_33);
		self_45kind_33(Hash_45Map_33,Map_45Type);
		self_45impl_33(empty,Hash_45Map_33,function(){
			return Hash_45Map_33(empty(Id_45Map_33))
		});
		const opt_45bucket=function(_,key){
			return _.val.get(hash_45code(key))
		};
		const opt_45bucket_45entry=function(opt_45bucket,key){
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
					return undefined
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
			const bucket_45keys_126=function(_){
				return _ms.unlazy(if_126)(defined_63(_),function*(){
					(yield _.key);
					return (yield* bucket_45keys_126(_["next!"]))
				})
			};
			return flat_45map(buckets,function(_){
				return Stream(function(){
					return bucket_45keys_126(_)
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
							const delete_45from_45next_45bucket_33=function(prev_45bucket){
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
			return Obj.freeze(_)
		});
		impl_33(empty_33,Hash_45Map_33,function(_){
			return empty_33(_.val)
		});
		exports.default=Hash_45Map_33;
		const displayName=exports.displayName="Hash-Map!";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9IYXNoLU1hcCEubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2lDQTJCQTs7Ozs7RUFBQSxvQkFBWSxzQkFBUztHQUNwQixVQUFNO0dBQ04sV0FBTyxVQUNOO0lBQUEsa0JBQUc7S0FDRixVQUFBLE1BQUs7S0FDTCxVQUFBLE1BQUs7OztvQkFDTixlQUFLLEVBQUUsR0FBRztvQkFDVixlQUFLLEVBQUUsR0FBRzswQ0FDVixLQUFRLEdBQU0sQ0FBRSxFQUFFOzJCQUNsQixPQUFLLE9BQU0sRUFBRSxHQUFHLE1BQUE7R0FBQTtHQUVqQixxQkFBYztVQVhNOzs7Ozs7O0VBYXJCLFFBQUEsY0FBQTtFQUVBLGVBQUEsY0FBQTtFQUNBLGVBQUEsTUFBQSxjQUE0QixVQUMzQjtVQUFBLGNBQVUsTUFBQTtFQUFBO0VBRVgsbUJBQWMsU0FBQSxFQUFFLElBQ2Y7VUFBQSxVQUFVLFlBQUE7RUFBQTtFQUVYLDJCQUFvQixTQUFBLGFBQVcsSUFDOUI7O0lBQUssUUFBQTtJQUNKLFlBQUEsV0FBQSxJQUFTOztNQUVQLFlBQUEsT0FBRyxNQUFILE1BQVk7Y0FDWDtNQUFBLE9BQ0c7Y0FDSCxxQkFBaUIsV0FBakI7TUFBQTtLQUFBO0lBQUEsT0FDQztZQUNIO0lBQUE7R0FBQTtFQUFBO0VBRUgsUUFBQSxPQUFBLGNBQXNCLFNBQUcsRUFBRSxJQUMxQjtHQUFBLGFBQVMsYUFBVyxFQUFYO0dBQ1QsWUFBUSxxQkFBQSxPQUFBOzRCQUZjLElBR3RCLElBQUksYUFBQSxPQUFnQixTQUFBLEdBQ25CO1dBQUE7OztFQUVGLFFBQUEsS0FBQSxjQUFzQixTQUFBLEVBQ3JCO0dBQUEsY0FBVSxPQUFPO0dBQ2pCLHdCQUFnQixTQUFBLEVBQ2Y7OEJBQUEsV0FBSSxHQUFZLFdBQ2Y7S0FBSSxPQUFEO1lBQ0MsUUFBQSxrQkFBYTs7O1VBQ25CLFdBQUEsUUFBa0IsU0FBQSxFQUNqQjtXQUFBLE9BQVEsVUFDUDtZQUFBLGtCQUFBO0lBQUE7R0FBQTtFQUFBO0VBSUgsUUFBQSxTQUFBLGNBQXdCLFNBQUEsR0FBRyxJQUFJLElBQzlCO0dBQUEsYUFBUyxhQUFBLEdBQUE7R0FDSDtJQUFBLFFBQUEscUJBQUEsT0FBQTtJQUNMLFlBQUEsV0FBQSxJQUFTO0tBQ1IsS0FBRyxFQUFHLE9BQU47SUFBQSxPQUNHO0tBRUgsUUFBSTtLQUNKLFdBQVcsWUFBQSxlQUFlO01BQ3pCLFVBQUs7TUFDTCxhQUFNO01BQ04sY0FBTzthQUhrQjs7Ozs7Ozs7O0VBSzdCLFFBQUEsY0FBQSxjQUEyQixTQUFBLEdBQUcsSUFDN0I7R0FBQSxhQUFTLGFBQUEsR0FBQTs7SUFDSixRQUFBO0lBQ0osWUFBQSxXQUFBLElBQVM7O01BRVAsWUFBQSxPQUFHLE1BQUgsTUFBWTtPQUNMO1FBQUEsUUFBQTtRQUNMLFlBQUEsV0FBQSxJQUFTO1NBQ1IsU0FBTyxPQUFQLElBQWtCO1FBQUEsT0FDZjtTQUNILGNBQVUsT0FBTyxZQUFBO1FBQUE7T0FBQTtjQUNuQixJQUFFO2FBQ0M7T0FDSCx1Q0FBNEIsU0FBQSxjQUMzQjtRQUFBLFdBQU87O1NBQ0YsUUFBQTtTQUNKLFlBQUEsV0FBQSxJQUFTOztXQUVQLFlBQUEsT0FBRyxTQUFILE1BQWU7WUFDZCxLQUFBLGNBQWdCLFFBQU87bUJBQ3ZCLElBQUU7a0JBQ0M7bUJBQ0gsaUNBQUE7V0FBQTtVQUFBO1NBQUEsT0FDQztpQkFDSCxNQUFBO1NBQUE7UUFBQTtPQUFBO2NBRUgsaUNBQUE7TUFBQTtLQUFBO0lBQUEsT0FDQztZQUNILE1BQUE7SUFBQTtHQUFBO0VBQUE7RUFFSCxRQUFBLE9BQUEsY0FBd0IsU0FBQSxFQUN2QjtHQUFBLE9BQU87VUFDUCxXQUFXO0VBQUE7RUFFWixRQUFBLFNBQUEsY0FBd0IsU0FBQSxFQUN2QjtVQUFBLFNBQU87O2tCQUVSO0VBaElBLHNDQUFBIiwiZmlsZSI6ImF0L01hcC9IYXNoLU1hcGJhbmcuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==