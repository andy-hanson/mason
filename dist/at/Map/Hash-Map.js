"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../hash-code","../../js","../../methods","../../Type/Kind","../at","../at-Type","../q","./Map","./Map-Type","../../Type/Type","../Seq/Seq","./Map"],(exports,compare_0,hash_45code_1,js_2,methods_3,Kind_4,_64_5,_64_45Type_6,_63_7,Map_8,Map_45Type_9,Type_10,Seq_11,Map_12)=>{
	exports._get=_ms.lazy(()=>{
		const _$3=_ms.getModule(compare_0),_61_63=_ms.get(_$3,"=?"),hash_45code=_ms.getDefaultExport(hash_45code_1),_$5=_ms.getModule(js_2),defined_63=_ms.get(_$5,"defined?"),_$6=_ms.getModule(methods_3),freeze=_ms.get(_$6,"freeze"),_$7=_ms.getModule(Kind_4),kind_33=_ms.get(_$7,"kind!"),self_45kind_33=_ms.get(_$7,"self-kind!"),_$8=_ms.getModule(_64_5),empty_33=_ms.get(_$8,"empty!"),iterator=_ms.get(_$8,"iterator"),map=_ms.get(_$8,"map"),_$9=_ms.getModule(_64_45Type_6),empty=_ms.get(_$9,"empty"),_$10=_ms.getModule(_63_7),_63None=_ms.get(_$10,"?None"),Opt_45_62_63=_ms.get(_$10,"Opt->?"),_63some=_ms.get(_$10,"?some"),Map=_ms.getDefaultExport(Map_8),_$11=_ms.getModule(Map_8),assoc_33=_ms.get(_$11,"assoc!"),_63get=_ms.get(_$11,"?get"),un_45assoc_33=_ms.get(_$11,"un-assoc!"),Map_45Type=_ms.getDefaultExport(Map_45Type_9),_$14=_ms.lazyGetModule(Type_10),_61_62=_ms.lazyProp(_$14,"=>"),_$15=_ms.lazyGetModule(Seq_11),seq_61_63=_ms.lazyProp(_$15,"seq=?"),_$16=_ms.lazyGetModule(Map_12),keys=_ms.lazyProp(_$16,"keys");
		const Hash_45Map=()=>{
			const _=class Hash_45Map{
				static [_ms.symbol(empty)](){
					const _this=this;
					return new (_this)(new (global.Map)())
				}
				constructor(val){
					_ms.newProperty(this,"val",val)
				}
				*[_ms.symbol(iterator)](){
					const _this=this;
					for(let bucket of _this.val.values()){
						let cur=bucket;
						for(;;){
							if(! _ms.bool(defined_63(cur))){
								break
							};
							(yield [cur.key,cur["val!"]]);
							cur=cur["next!"]
						}
					}
				}
				[_ms.symbol(_63get)](key){
					const _this=this;
					const bucket=_this.val.get(hash_45code(key));
					const entry=opt_45bucket_45entry(bucket,key);
					return map(Opt_45_62_63(entry),_=>{
						return _["val!"]
					})
				}
				[_ms.symbol(assoc_33)](key,val){
					const _this=this;
					const hash=hash_45code(key);
					const bucket=_this.val.get(hash);
					{
						const _=opt_45bucket_45entry(bucket,key);
						if(_ms.bool(defined_63(_))){
							_["val!"]=val
						} else {
							_this.val.set(hash,new (Bucket)(key,val,bucket))
						}
					}
				}
				[_ms.symbol(un_45assoc_33)](key){
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
											_this.val.set(key,_)
										} else {
											_this.val.delete(hash)
										}
									};
									return _63some(_["val!"])
								} else {
									let cur=bucket;
									return ()=>{
										for(;;){
											const next=cur["next!"];
											if(! _ms.bool(defined_63(next))){
												return _63None
											};
											if(_61_63(next.key,key)){
												cur["next!"]=next["next!"];
												return _63some(next["val!"])
											};
											cur=next
										}
									}()
								}
							}()
						} else {
							return _63None
						}
					}()
				}
				[_ms.symbol(freeze)](){
					const _this=this;
					freeze(_this.val);
					Object.freeze(_this)
				}
				[_ms.symbol(empty_33)](){
					const _this=this;
					_this.val.clear()
				}
			};
			self_45kind_33(_,Map_45Type);
			kind_33(_,Map);
			return _
		}();
		_ms.newProperty(Hash_45Map,"test",()=>{
			const _=_ms.unlazy(_61_62)(Hash_45Map,()=>{
				const built=new (global.Map)();
				_ms.assoc(built,1,2);
				_ms.assoc(built,3,4);
				return built
			}());
			_ms.assert(_61_63,_ms.sub(_,1),2);
			_ms.assert(_61_63,_ms.sub(_,3),4);
			_ms.assert(_ms.unlazy(seq_61_63),_,()=>{
				const built=[];
				_ms.add(built,[1,2]);
				_ms.add(built,[3,4]);
				return built
			}());
			_ms.assert(_ms.unlazy(seq_61_63),_ms.unlazy(keys)(_),[1,3]);
			_ms.assert(_61_63,_63None,_63get(_,8))
		});
		const Bucket=class Bucket{
			constructor(key,val_33,next_33){
				_ms.newProperty(this,"key",key);
				_ms.newMutableProperty(this,"val!",val_33);
				_ms.newMutableProperty(this,"next!",next_33)
			}
		};
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
		const name=exports.name=`Hash-Map`;
		exports.default=Hash_45Map;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9IYXNoLU1hcC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQWlCQSxxQkFFSTtTQURIO3VCQUtDLFNBQ087V0ErRFA7WUEvREMsS0ErREQsT0EvRFcsS0FBSTs7Z0JBR0wsSUFDRztxQkFBYixXQUFPO0lBQUE7aUJBRVIsWUFDWTtXQXdEWDtLQXhESyxRQUFBLFVBd0RMLG1CQXZENEI7TUFBM0IsUUFBUTtNQUVKLE9BQUE7T0FBSCxjQUFRLFdBQVMsTUFDRztRQUFuQjtPQUFBO2NBQ0UsQ0FBRSxRQUFRO1dBQ047Ozs7Z0JBRVYsU0FBTSxJQUNHO1dBK0NSO0tBL0NBLGFBK0NBLGNBL0NtQixZQUFVO0tBQzdCLFlBQVEscUJBQWlCLE9BQU87WUFDaEMsSUFBSyxhQUFPLE9BQVEsR0FDQzthQUFwQjs7O2dCQUVGLFdBQVMsSUFBSSxJQUNHO1dBeUNmO0tBekNBLFdBQU8sWUFBVTtLQUNqQixhQXdDQSxjQXhDa0I7S0FDWjtNQUFBLFFBQUEscUJBQWlCLE9BQU87TUFDN0IsWUFBQSxXQUFRLElBQ0M7T0FDUixVQUFVO01BQUEsT0FFUDtPQWtDTCxjQWpDVyxLQUFNLEtBQUksUUFBTyxJQUFJLElBQUk7TUFBQTtLQUFBO0lBQUE7Z0JBRXJDLGdCQUFXLElBQ0c7V0E4QmI7S0E5QkEsV0FBTyxZQUFVO0tBQ2pCLGFBNkJBLGNBN0JrQjs7TUFDYixRQUFBO01BQ0osWUFBQSxXQUFRLElBQ0M7O1FBQ1AsWUFBQSxPQUFHLE1BQU0sTUFDRztTQUFMO1VBQUEsUUFBQTtVQUNMLFlBQUEsV0FBUSxJQUNDO1dBc0JkLGNBdEJlLElBQUk7VUFBQSxPQUVWO1dBb0JULGlCQXBCa0I7VUFBQTtTQUFBO2dCQUNkLFFBQU07ZUFFSDtTQUFILFFBQVE7O2lCQUVMO1dBQUYsV0FBTztXQUNQLGNBQVEsV0FBUyxPQUNJO1lBQXBCLE9BQU07V0FBQTtXQUNQLEdBQUksT0FBRyxTQUFTLEtBQ0c7WUFBbEIsYUFBYTtZQUNiLE9BQU0sUUFBTTs7ZUFDTjtVQUFBO1NBQUE7UUFBQTtPQUFBO01BQUEsT0FFUDtjQUFIO01BQUE7S0FBQTtJQUFBO2dCQUVILFVBQ1M7V0FJUjtLQUpBLE9BSUE7S0FIQSxjQUdBO0lBQUE7Z0JBREQsWUFDUztXQUFSO0tBQUE7OztHQXBFQSxlQUFXLEVBQUU7R0FDYixRQUFNLEVBQUU7VUFGVDtFQUFBO2tCQTRFRCxrQkFDa0IsSUFBQTtHQUFqQiwyQkFBTyxlQUNROztvQkFBZCxFQUFLO29CQUNMLEVBQUs7OztjQUNFLGVBQUcsRUFBRSxHQUFHO2NBQ1IsZUFBRyxFQUFFLEdBQUc7b0NBQ0YsTUFDQzs7a0JBQVosQ0FBRSxFQUFFO2tCQUNKLENBQUUsRUFBRTs7O3FEQUNXLEdBQUUsQ0FBRSxFQUFFO2NBQ2hCLE9BQUcsUUFBTyxPQUFLLEVBQUU7RUFBQTtFQUd6QixhQUNjO2VBQ0YsSUFBSSxPQUFLLFFBQ0s7b0JBQXhCLFdBQU87MkJBQ1AsWUFBVTsyQkFDVixhQUFXO0dBQUE7RUFBQTtFQUliLDJCQUFvQiw4QkFBQSxhQUFXLElBQ0c7R0FBakMsUUFBUTs7V0FFTDtLQUFGLGNBQVEsV0FBUyxNQUNHO01BQW5CLE9BQU07O0tBQ1AsR0FBSSxPQUFHLFFBQVEsS0FDRztNQUFqQixPQUFNO0tBQUE7U0FDQTs7OztFQTNIVix3QkFBQTtrQkFpQkEiLCJmaWxlIjoiYXQvTWFwL0hhc2gtTWFwLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=