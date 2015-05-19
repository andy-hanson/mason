"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../hash-code","../../js","../../methods","../../Objectbang","../../Type/Js-Method","../../Type/Kind","../../Type/Method","../../Type/Tuple","../../Type/Wrap-Type","../at","../atbang","../at-Type","../q","./Map","./Id-Mapbang","./Mapbang","./Map-Type","../../bang","../Seq/Seq","./Map"],function(exports,compare_0,hash_45code_1,js_2,methods_3,Object_33_4,Js_45Method_5,Kind_6,Method_7,Tuple_8,Wrap_45Type_9,_64_10,_64_33_11,_64_45Type_12,_63_13,Map_14,Id_45Map_33_15,Map_33_16,Map_45Type_17,_33_18,Seq_19,Map_20){
	exports._get=_ms.lazy(function(){
		const _$3=_ms.getModule(compare_0),_61_63=_ms.get(_$3,"=?"),hash_45code=_ms.getDefaultExport(hash_45code_1),_$5=_ms.getModule(js_2),defined_63=_ms.get(_$5,"defined?"),_$6=_ms.getModule(methods_3),freeze=_ms.get(_$6,"freeze"),_$7=_ms.getModule(Object_33_4),p_33=_ms.get(_$7,"p!"),_$8=_ms.getModule(Js_45Method_5),js_45impl_33=_ms.get(_$8,"js-impl!"),_$9=_ms.getModule(Kind_6),kind_33=_ms.get(_$9,"kind!"),self_45kind_33=_ms.get(_$9,"self-kind!"),_$10=_ms.getModule(Method_7),impl_33=_ms.get(_$10,"impl!"),self_45impl_33=_ms.get(_$10,"self-impl!"),Tuple=_ms.getDefaultExport(Tuple_8),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_9),_$13=_ms.getModule(_64_10),iterator=_ms.get(_$13,"iterator"),map=_ms.get(_$13,"map"),_$14=_ms.getModule(_64_33_11),empty_33=_ms.get(_$14,"empty!"),_$15=_ms.getModule(_64_45Type_12),empty=_ms.get(_$15,"empty"),_63=_ms.getDefaultExport(_63_13),_$16=_ms.getModule(_63_13),Opt_45_62_63=_ms.get(_$16,"Opt->?"),_$17=_ms.getModule(Map_14),_63get=_ms.get(_$17,"?get"),values=_ms.get(_$17,"values"),Id_45Map_33=_ms.getDefaultExport(Id_45Map_33_15),Map_33=_ms.getDefaultExport(Map_33_16),_$19=_ms.getModule(Map_33_16),assoc_33=_ms.get(_$19,"assoc!"),un_45assoc_33=_ms.get(_$19,"un-assoc!"),Map_45Type=_ms.getDefaultExport(Map_45Type_17),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_18)
		}),_$23=_ms.lazyGetModule(Seq_19),seq_61_63=_ms.lazyProp(_$23,"seq=?"),_$24=_ms.lazyGetModule(Map_20),keys=_ms.lazyProp(_$24,"keys");
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
		kind_33(Hash_45Map_33,Map_33);
		self_45kind_33(Hash_45Map_33,Map_45Type);
		self_45impl_33(empty,Hash_45Map_33,function(){
			return Hash_45Map_33(empty(Id_45Map_33))
		});
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
		impl_33(_63get,Hash_45Map_33,function(_,key){
			const bucket=_.val.get(hash_45code(key));
			const entry=opt_45bucket_45entry(bucket,key);
			return map(Opt_45_62_63(entry),function(be){
				return be["val!"]
			})
		});
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
		impl_33(assoc_33,Hash_45Map_33,function(hm,key,val){
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
		});
		impl_33(un_45assoc_33,Hash_45Map_33,function(hm,key){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9IYXNoLU1hcCEubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQXlCQSxvQkFBWSxzQkFDUztHQUFwQixVQUFNO0dBRU4sV0FDTyxlQUFBO0lBQU4sa0JBQ0c7S0FBRixVQUFBLE1BQUs7S0FDTCxVQUFBLE1BQUs7OztvQkFDSixlQUFHLEVBQUUsR0FBRztvQkFDUixlQUFHLEVBQUUsR0FBRzswQ0FDRixZQUNDO0tBQVIsU0FBRSxDQUFFLEVBQUU7S0FDTixTQUFFLENBQUUsRUFBRTs7OzJEQUNDLEdBQU0sQ0FBRSxFQUFFOzJCQUNoQixPQUFJLE9BQUssRUFBRSxHQUFJLE1BQU07R0FBQTtHQUV4QixxQkFBYzs7Ozs7Ozs7RUFFZixhQUFTLGdCQUNLO0dBQWIsWUFBTyxDQUFHLE1BQU0sT0FBTzs7Ozs7O0VBRXhCLFFBQU0sY0FBVTtFQUVoQixlQUFXLGNBQVU7RUFDckIsZUFBVyxNQUFNLGNBQ1csVUFBQTtVQUEzQixjQUFXLE1BQU07RUFBQTtFQUlsQiwyQkFBb0IsOEJBQUEsYUFBVyxJQUNHO0dBQWpDLFFBQVE7R0FFUixRQUFRO0dBRUosV0FBQTtJQUFILGNBQVEsV0FBUyxNQUNHO0tBQW5CO0lBQUE7SUFDRCxZQUFJLE9BQUcsUUFBUSxNQUNHO1NBQVY7SUFBQTtRQUNEOztVQUNSO0VBQUE7RUFFRCxRQUFNLE9BQUssY0FBVyxTQUFBLEVBQUUsSUFDRztHQUExQixhQUFTLFVBQVcsWUFBVTtHQUM5QixZQUFRLHFCQUFpQixPQUFPO1VBQ2hDLElBQUssYUFBTyxPQUFRLFNBQUEsR0FDRTtXQUFyQjs7O0VBRUYsYUFBUyxTQUFTLGNBQ1ksV0FBQTtHQUF4QixRQUFBLFVBQVUsT0FBTyw2QkFDUTtJQUE3QixRQUFRO0lBRUosV0FBQTtLQUFILGNBQVEsV0FBUyxNQUNHO01BQW5CO0tBQUE7WUFDRSxDQUFFLFFBQVE7U0FDTjs7OztFQUVWLFFBQU0sU0FBTyxjQUFXLFNBQUEsR0FBRyxJQUFJLElBQ0c7R0FBakMsV0FBTyxZQUFVO0dBQ2pCLGFBQVMsV0FBVztHQUNkO0lBQUEsUUFBQSxxQkFBaUIsT0FBTztJQUM3QixZQUFBLFdBQUEsSUFDUztLQUNSLEtBQUcsRUFBRyxPQUFNO0lBQUEsT0FFVDtLQUNILFdBQVcsS0FBTSxPQUFPLElBQUksSUFBSTtJQUFBO0dBQUE7RUFBQTtFQUVuQyxRQUFNLGNBQVUsY0FBVyxTQUFBLEdBQUcsSUFDRztHQUFoQyxXQUFPLFlBQVU7R0FDakIsYUFBUyxXQUFXOztJQUNmLFFBQUE7SUFDSixZQUFBLFdBQUEsSUFDUzs7TUFDUCxZQUFBLE9BQUcsTUFBTSxNQUNHO09BQUw7UUFBQSxRQUFBO1FBQ0wsWUFBQSxXQUFBLElBQ1M7U0FBUixTQUFPLE9BQU8sSUFBSTtRQUFBLE9BRWY7U0FBSCxjQUFVLE9BQU87UUFBQTtPQUFBO2NBQ25CLElBQUU7YUFFQztPQUNILFFBQVE7T0FDUixRQUFRLE1BQU07T0FFVixXQUFBO1FBQUgsV0FBTztRQUNQLGNBQVEsV0FBQSxHQUFVLE9BQ0k7U0FBckI7UUFBQTtRQUNELFlBQUksT0FBRyxTQUFTLE1BQ0c7U0FBbEIsS0FBRyxJQUFLLFFBQU87YUFDUixJQUFFO1NBQ1Q7UUFBQTtZQUNNO09BQUE7Y0FDUjtNQUFBO0tBQUE7SUFBQSxPQUVDO1lBQUgsTUFBTTtJQUFBO0dBQUE7RUFBQTtFQUVULFFBQU0sT0FBTyxjQUFXLFNBQUEsRUFDQztHQUF4QixPQUFPO1VBQ1AsY0FBYztFQUFBO0VBRWYsUUFBTSxTQUFPLGNBQVcsU0FBQSxFQUNDO1VBQXhCLFNBQU87O0VBOUhSLHdCQUFBO2tCQWdJQSIsImZpbGUiOiJhdC9NYXAvSGFzaC1NYXBiYW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=