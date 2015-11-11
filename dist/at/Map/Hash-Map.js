"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../compare","./../../hash-code","./../../js","./../../methods","./../../Type/Kind","./../at","./../at-Type","./../q","./Id-Map","./Map","./Map-Type"],(exports,compare_0,hash_45code_1,js_2,methods_3,Kind_4,_64_5,_64_45Type_6,_63_7,Id_45Map_8,Map_9,Map_45Type_10)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),hash_45code=_ms.getDefaultExport(hash_45code_1),_$1=_ms.getModule(js_2),defined_63=_ms.get(_$1,"defined?"),_$2=_ms.getModule(methods_3),del_45sub_33=_ms.get(_$2,"del-sub!"),set_45sub_33=_ms.get(_$2,"set-sub!"),_$3=_ms.getModule(Kind_4),self_45kind_33=_ms.get(_$3,"self-kind!"),_$4=_ms.getModule(_64_5),empty_33=_ms.get(_$4,"empty!"),iterator=_ms.get(_$4,"iterator"),_64map=_ms.get(_$4,"@map"),_$5=_ms.getModule(_64_45Type_6),empty=_ms.get(_$5,"empty"),_$6=_ms.getModule(_63_7),_63None=_ms.get(_$6,"?None"),Opt_45_62_63=_ms.get(_$6,"Opt->?"),_63some=_ms.get(_$6,"?some"),Id_45Map=_ms.getDefaultExport(Id_45Map_8),Map=_ms.getDefaultExport(Map_9),_$7=_ms.getModule(Map_9),_63get=_ms.get(_$7,"?get"),Map_45Type=_ms.getDefaultExport(Map_45Type_10);
		const Hash_45Map=exports.default=(()=>{
			const _=class Hash_45Map{
				static [_ms.symbol(empty)](){
					const _this=this;
					return new (_this)(new (global.Map)())
				}
				constructor(val){
					_ms.newProperty(this,"val",val);
					_ms.checkContains(Id_45Map,val,"val")
				}
				*[_ms.symbol(iterator)](){
					const _this=this;
					for(let bucket of _this.val.values()){
						let cur=bucket;
						for(;;){
							if(! defined_63(cur)){
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
					return _64map(Opt_45_62_63(entry),_=>{
						return _["val!"]
					})
				}
				[_ms.symbol(set_45sub_33)](key,val){
					const _this=this;
					const hash=hash_45code(key);
					const bucket=_this.val.get(hash);
					{
						const _=opt_45bucket_45entry(bucket,key);
						if(defined_63(_)){
							_["val!"]=val
						} else {
							_this.val.set(hash,new (Bucket)(key,val,bucket))
						}
					}
				}
				[_ms.symbol(del_45sub_33)](key){
					const _this=this;
					const hash=hash_45code(key);
					const bucket=_this.val.get(hash);
					return (()=>{
						const _=bucket;
						if(defined_63(_)){
							return (()=>{
								if(_61_63(_.key,key)){
									{
										const _=bucket["next!"];
										if(defined_63(_)){
											_this.val.set(key,_)
										} else {
											_this.val.delete(hash)
										}
									};
									return _63some(_["val!"])
								} else {
									let cur=bucket;
									return (()=>{
										for(;;){
											const next=cur["next!"];
											if(! defined_63(next)){
												return _63None
											};
											if(_61_63(next.key,key)){
												cur["next!"]=next["next!"];
												return _63some(next["val!"])
											};
											cur=next
										}
									})()
								}
							})()
						} else {
							return _63None
						}
					})()
				}
				[_ms.symbol(empty_33)](){
					const _this=this;
					_this.val.clear()
				}
			};
			_ms.kindDo(_,Map);
			self_45kind_33(_,Map_45Type);
			return _
		})();
		const Bucket=class Bucket{
			constructor(key,val_33,next_33){
				_ms.newProperty(this,"key",key);
				_ms.newMutableProperty(this,"val!",val_33);
				_ms.newMutableProperty(this,"next!",next_33)
			}
		};
		const opt_45bucket_45entry=function opt_45bucket_45entry(opt_45bucket,key){
			let cur=opt_45bucket;
			return (()=>{
				for(;;){
					if(! defined_63(cur)){
						return void 0
					};
					if(_61_63(cur.key,key)){
						return cur
					};
					cur=cur["next!"]
				}
			})()
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9NYXAvSGFzaC1NYXAubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFpQkEsaUNBQWdCLEtBR2I7O3VCQUdEO1dBNERBO1lBM0RDLEtBMkRELE9BM0RXLEtBQUk7O0lBRU4sWUFBQTs7dUJBQUs7O2lCQUdmO1dBc0RDO0tBckRJLFFBQUEsVUFxREosbUJBcEQyQjtNQUExQixRQUFRO01BRUwsT0FBQTtPQUFLLEtBQUEsV0FBUyxLQUNHO1FBQWxCO09BQUE7Y0FDRSxDQUFDLFFBQVE7V0FDTDs7OztnQkFFVixTQUFNO1dBNkNMO0tBNUNBLGFBNENBLGNBNUNtQixZQUFVO0tBQzdCLFlBQVEscUJBQWlCLE9BQU87WUFFaEMsT0FBTSxhQUFPLE9BQVE7YUFDcEI7OztnQkFFRixlQUFXLElBQUk7V0FzQ2Q7S0FyQ0EsV0FBTyxZQUFVO0tBQ2pCLGFBb0NBLGNBcENrQjtLQUNiO01BQUEsUUFBQSxxQkFBaUIsT0FBTztNQUM1QixHQUFBLFdBQUEsR0FDUztPQUNSLFVBQVU7TUFBQSxPQUVQO09BOEJMLGNBN0JXLEtBQU0sS0FBSSxRQUFPLElBQUksSUFBSTtNQUFBO0tBQUE7SUFBQTtnQkFFckMsZUFBVTtXQTJCVDtLQTFCQSxXQUFPLFlBQVU7S0FDakIsYUF5QkEsY0F6QmtCO1lBQ2I7TUFBQSxRQUFBO01BQ0osR0FBQSxXQUFBLEdBQ1M7Y0FDSjtRQUFILEdBQUEsT0FBRyxNQUFNLEtBQ0c7U0FBTjtVQUFNLFFBQU47VUFDSixHQUFBLFdBQUEsR0FDUztXQWtCZCxjQWxCZSxJQUFJO1VBQUEsT0FFVjtXQWdCVCxpQkFoQmtCO1VBQUE7U0FBQTtnQkFDZCxRQUFNO2VBRUg7U0FBSCxRQUFRO2dCQUVMO2lCQUFBO1dBQUYsV0FBTztXQUNBLEtBQUEsV0FBUyxNQUNJO1lBQW5CLE9BQU07V0FBQTtXQUNKLEdBQUEsT0FBRyxTQUFTLEtBQ0c7WUFBakIsYUFBYTtZQUNiLE9BQU0sUUFBTTs7ZUFDTjtVQUFBO1NBQUE7UUFBQTtPQUFBO01BQUEsT0FFUDtjQUFIO01BQUE7S0FBQTtJQUFBO2dCQUVIO1dBQ0M7S0FBQTs7O2dCQWxFbUI7R0FHbkIsZUFBVyxFQUFFOzs7RUFrRWQsYUFDYztHQUFILFlBQUEsSUFBSyxPQUFLOzsyQkFDbkIsWUFBVTsyQkFDVixhQUFXO0dBQUE7RUFBQTtFQUliLDJCQUFvQiw4QkFBQSxhQUFXO0dBQzlCLFFBQVE7VUFFTDtXQUFBO0tBQUssS0FBQSxXQUFTLEtBQ0c7TUFBbEIsT0FBTTs7S0FDSixHQUFBLE9BQUcsUUFBUSxLQUNHO01BQWhCLE9BQU07S0FBQTtTQUNBIiwiZmlsZSI6ImF0L01hcC9IYXNoLU1hcC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
