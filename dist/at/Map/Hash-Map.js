"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../hash-code","../../js","../../methods","../../Type/Method","../../Type/Kind","../../Type/Tuple","../../Type/Wrap-Type","../at","../at-Type","../q","./Id-Map","./Map","./Map-Type","../Seq/Seq","./Map"],(exports,compare_0,hash_45code_1,js_2,methods_3,Method_4,Kind_5,Tuple_6,Wrap_45Type_7,_64_8,_64_45Type_9,_63_10,Id_45Map_11,Map_12,Map_45Type_13,Seq_14,Map_15)=>{
	exports._get=_ms.lazy(()=>{
		const _$3=_ms.getModule(compare_0),_61_63=_ms.get(_$3,"=?"),hash_45code=_ms.getDefaultExport(hash_45code_1),_$5=_ms.getModule(js_2),defined_63=_ms.get(_$5,"defined?"),_$6=_ms.getModule(methods_3),freeze=_ms.get(_$6,"freeze"),_$7=_ms.getModule(Method_4),impl_33=_ms.get(_$7,"impl!"),self_45impl_33=_ms.get(_$7,"self-impl!"),_$8=_ms.getModule(Kind_5),kind_33=_ms.get(_$8,"kind!"),self_45kind_33=_ms.get(_$8,"self-kind!"),Tuple=_ms.getDefaultExport(Tuple_6),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_7),_$11=_ms.getModule(_64_8),empty_33=_ms.get(_$11,"empty!"),iterator=_ms.get(_$11,"iterator"),map=_ms.get(_$11,"map"),_$12=_ms.getModule(_64_45Type_9),empty=_ms.get(_$12,"empty"),_63=_ms.getDefaultExport(_63_10),_$13=_ms.getModule(_63_10),Opt_45_62_63=_ms.get(_$13,"Opt->?"),Id_45Map=_ms.getDefaultExport(Id_45Map_11),Map=_ms.getDefaultExport(Map_12),_$15=_ms.getModule(Map_12),assoc_33=_ms.get(_$15,"assoc!"),_63get=_ms.get(_$15,"?get"),un_45assoc_33=_ms.get(_$15,"un-assoc!"),values=_ms.get(_$15,"values"),Map_45Type=_ms.getDefaultExport(Map_45Type_13),_$18=_ms.lazyGetModule(Seq_14),seq_61_63=_ms.lazyProp(_$18,"seq=?"),_$19=_ms.lazyGetModule(Map_15),keys=_ms.lazyProp(_$19,"keys");
		const Hash_45Map=Wrap_45Type(()=>{
			const built={};
			const doc=built.doc=`Default Map type. Depends on efficient \`hash-code\` of its keys.`;
			const test=built.test=function test(){
				const _=()=>{
					const built=new (global.Map)();
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
		self_45kind_33(Hash_45Map,Map_45Type);
		self_45impl_33(empty,Hash_45Map,()=>{
			return Hash_45Map(empty(Id_45Map))
		});
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
		impl_33(iterator,Hash_45Map,function*(){
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
		kind_33(Hash_45Map,Map);
		impl_33(_63get,Hash_45Map,function(key){
			const _this=this;
			const bucket=_this.val.get(hash_45code(key));
			const entry=opt_45bucket_45entry(bucket,key);
			return map(Opt_45_62_63(entry),_=>{
				return _["val!"]
			})
		});
		impl_33(assoc_33,Hash_45Map,function(key,val){
			const _this=this;
			const hash=hash_45code(key);
			const bucket=_this.val.get(hash);
			{
				const _=opt_45bucket_45entry(bucket,key);
				if(_ms.bool(defined_63(_))){
					_["val!"]=val
				} else {
					_this.val.set(hash,Bucket(key,val,bucket))
				}
			}
		});
		impl_33(un_45assoc_33,Hash_45Map,function(key){
			const _this=this;
			const hash=hash_45code(key);
			const bucket=_this.val.get(hash);
			return ()=>{
				const _=bucket;
				if(_ms.bool(defined_63(_))){
					return ()=>{
						if(_ms.bool(_61_63(_.key,key))){
							{
								const _=bucket["next!"];
								if(_ms.bool(defined_63(_))){
									assoc_33(_this.val,key,_)
								} else {
									un_45assoc_33(_this.val,hash)
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
										cur["next!"]=next["next!"];
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
		impl_33(freeze,Hash_45Map,function(){
			const _this=this;
			freeze(_this.val);
			Object.freeze(_this)
		});
		impl_33(empty_33,Hash_45Map,function(){
			const _this=this;
			empty_33(_this.val)
		});
		const name=exports.name=`Hash-Map`;
		exports.default=Hash_45Map;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9IYXNoLU1hcC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQW9CQSxpQkFBVSxnQkFDUzs7R0FBbEIsb0JBQU07R0FFTixzQkFDUSxlQUFBO0lBQVAsWUFDRzs7cUJBQUYsRUFBSztxQkFDTCxFQUFLOzs7ZUFDRSxlQUFHLEVBQUUsR0FBRztlQUNSLGVBQUcsRUFBRSxHQUFHO3FDQUNGLE1BQ0M7O21CQUFaLENBQUUsRUFBRTttQkFDSixDQUFFLEVBQUU7OztzREFDVyxHQUFFLENBQUUsRUFBRTtlQUNoQixPQUFJLE9BQUssRUFBRSxHQUFJLE1BQU07R0FBQTtHQUU5QiwyQ0FBYzs7O0VBRWYsYUFBUyxVQUNLOztHQUFiLHdCQUFPLENBQUcsTUFBTSxPQUFPOzs7RUFFeEIsZUFBVyxXQUFTO0VBQ3BCLGVBQVcsTUFBTSxXQUNVLElBQUE7VUFBMUIsV0FBVSxNQUFNO0VBQUE7RUFJakIsMkJBQW9CLDhCQUFBLGFBQVcsSUFDRztHQUFqQyxRQUFROztXQUVMO0tBQUYsY0FBUSxXQUFTLE1BQ0c7TUFBbkIsT0FBTTs7S0FDUCxHQUFJLE9BQUcsUUFBUSxLQUNHO01BQWpCLE9BQU07S0FBQTtTQUNBOzs7O0VBRVQsUUFBTSxTQUFTLFdBQ2EsV0FBQTtTQTBEcEI7R0ExREYsUUFBQSxVQUFVLE9BMERSLFdBekRtQjtJQUF6QixRQUFRO0lBRUosT0FBQTtLQUFILGNBQVEsV0FBUyxNQUNHO01BQW5CO0tBQUE7WUFDRSxDQUFFLFFBQVE7U0FDTjs7OztFQUVWLFFBQU0sV0FBUztFQUVmLFFBQU0sT0FBSyxXQUFXLFNBQUEsSUFDRztTQStDakI7R0EvQ1AsYUErQ08sY0EvQ1ksWUFBVTtHQUM3QixZQUFRLHFCQUFpQixPQUFPO1VBQ2hDLElBQUssYUFBTyxPQUFRLEdBQ0M7V0FBcEI7OztFQUVGLFFBQU0sU0FBTyxXQUFZLFNBQUEsSUFBSSxJQUNHO1NBeUN4QjtHQXpDUCxXQUFPLFlBQVU7R0FDakIsYUF3Q08sY0F4Q1c7R0FDWjtJQUFBLFFBQUEscUJBQWlCLE9BQU87SUFDN0IsWUFBQSxXQUFRLElBQ0M7S0FDUixVQUFVO0lBQUEsT0FFUDtLQWtDRSxjQWpDSSxLQUFNLE9BQU8sSUFBSSxJQUFJO0lBQUE7R0FBQTtFQUFBO0VBRWpDLFFBQU0sY0FBVSxXQUFXLFNBQUEsSUFDRztTQThCdEI7R0E5QlAsV0FBTyxZQUFVO0dBQ2pCLGFBNkJPLGNBN0JXOztJQUNiLFFBQUE7SUFDSixZQUFBLFdBQVEsSUFDQzs7TUFDUCxZQUFBLE9BQUcsTUFBTSxNQUNHO09BQUw7UUFBQSxRQUFBO1FBQ0wsWUFBQSxXQUFRLElBQ0M7U0FBUixTQXNCQyxVQXRCVyxJQUFJO1FBQUEsT0FFYjtTQUFILGNBb0JDLFVBcEJjO1FBQUE7T0FBQTtjQUNqQixJQUFFO2FBRUM7T0FBSCxRQUFROztlQUVMO1NBQUYsV0FBTztTQUNQLGNBQVEsV0FBUSxHQUFFLE9BQ0k7VUFBckIsT0FBTSxNQUFNO1NBQUE7U0FDYixHQUFJLE9BQUcsU0FBUyxLQUNHO1VBQWxCLGFBQWE7VUFDYixPQUFNLElBQUU7O2FBQ0Y7UUFBQTtPQUFBO01BQUE7S0FBQTtJQUFBLE9BRVA7WUFBSCxNQUFNO0lBQUE7R0FBQTtFQUFBO0VBRVQsUUFBTSxPQUFPLFdBQ1ksVUFBQTtTQUlqQjtHQUpQLE9BSU87R0FIUCxjQUdPO0VBQUE7RUFEUixRQUFNLFNBQU8sV0FDWSxVQUFBO1NBQWpCO0dBQVAsU0FBTzs7RUFsSFIsd0JBQUE7a0JBb0JBIiwiZmlsZSI6ImF0L01hcC9IYXNoLU1hcC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9