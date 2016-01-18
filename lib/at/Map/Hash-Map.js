"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../compare","./../../hash-code","./../../js","./../../methods","./../at","./../q","./Id-Map","./Map"],(exports,compare_0,hash_45code_1,js_2,methods_3,_64_4,_63_5,Id_45Map_6,Map_7)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),hash_45code=_ms.getDefaultExport(hash_45code_1),_$1=_ms.getModule(js_2),defined_63=_ms.get(_$1,"defined?"),_$2=_ms.getModule(methods_3),del_45sub_33=_ms.get(_$2,"del-sub!"),set_45sub_33=_ms.get(_$2,"set-sub!"),_$3=_ms.getModule(_64_4),empty=_ms.get(_$3,"empty"),empty_33=_ms.get(_$3,"empty!"),iterator=_ms.get(_$3,"iterator"),_64map=_ms.get(_$3,"@map"),_$4=_ms.getModule(_63_5),_63None=_ms.get(_$4,"?None"),Opt_45_62_63=_ms.get(_$4,"Opt->?"),_63some=_ms.get(_$4,"?some"),Id_45Map=_ms.getDefaultExport(Id_45Map_6),Map=_ms.getDefaultExport(Map_7),_$5=_ms.getModule(Map_7),_63get=_ms.get(_$5,"?get");
		let Hash_45Map=exports.default=(()=>{
			let _=class Hash_45Map{
				static [_ms.symbol(empty)](){
					let _this=this;
					return new (_this)(new (global.Map)())
				}
				constructor(val){
					let _this=this;
					_ms.checkInstance(Id_45Map,val,"val");
					_ms.newProperty(this,"val",val)
				}
				*[_ms.symbol(iterator)](){
					let _this=this;
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
					let _this=this;
					let bucket=_this.val.get(hash_45code(key));
					let entry=opt_45bucket_45entry(bucket,key);
					return _64map(Opt_45_62_63(entry),_=>{
						return _["val!"]
					})
				}
				[_ms.symbol(set_45sub_33)](key,val){
					let _this=this;
					let hash=hash_45code(key);
					let bucket=_this.val.get(hash);
					{
						let _=opt_45bucket_45entry(bucket,key);
						if(defined_63(_)){
							_["val!"]=val
						} else {
							_this.val.set(hash,new (Bucket)(key,val,bucket))
						}
					}
				}
				[_ms.symbol(del_45sub_33)](key){
					let _this=this;
					let hash=hash_45code(key);
					let bucket=_this.val.get(hash);
					return (()=>{
						let _=bucket;
						if(defined_63(_)){
							return (()=>{
								if(_61_63(_.key,key)){
									{
										let _=bucket["next!"];
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
											let next=cur["next!"];
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
					let _this=this;
					_this.val.clear()
				}
			};
			_ms.traitDo(_,Map);
			return _
		})();
		let Bucket=class Bucket{
			constructor(key,val_33,next_33){
				let _this=this;
				_ms.newProperty(this,"key",key);
				_ms.newProperty(_this,"val!",val_33);
				_ms.newProperty(_this,"next!",next_33)
			}
		};
		let opt_45bucket_45entry=function opt_45bucket_45entry(opt_45bucket,key){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9NYXAvSGFzaC1NYXAubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFjQSwrQkFBZ0I7O0lBR2QsbUJBQUEsU0FDTzs7WUFBTixLQUFJLE9BQUssS0FBSTs7SUFFTCxZQUFBLElBQ1c7O3VCQUROOzs7SUFHZixhQUFBLFlBQ1k7O0tBQVAsUUFBQSxVQUFVLG1CQUNhO01BQTFCLFFBQU07TUFFSCxPQUFBO09BQUssS0FBQSxXQUFTLEtBQ0c7UUFBbEI7T0FBQTtjQUNLLENBQUMsUUFBUTtXQUNSOzs7O0lBRVYsWUFBQSxTQUFNLElBQ0c7O0tBQVIsV0FBUyxjQUFVLFlBQVU7S0FDN0IsVUFBUSxxQkFBaUIsT0FBTztZQUVoQyxPQUFNLGFBQU8sT0FBUyxHQUNBO2FBQXBCOzs7SUFFSCxZQUFBLGVBQVcsSUFBSSxJQUNHOztLQUFqQixTQUFPLFlBQVU7S0FDakIsV0FBUyxjQUFTO0tBQ2I7TUFBQSxNQUFBLHFCQUFpQixPQUFPO01BQzVCLEdBQUEsV0FBUyxHQUNBO09BQ1AsVUFBUztNQUFBLE9BRVA7T0FDSCxjQUFTLEtBQUssS0FBSSxRQUFPLElBQUksSUFBSTtNQUFBO0tBQUE7SUFBQTtJQUVwQyxZQUFBLGVBQVUsSUFDRzs7S0FBWixTQUFPLFlBQVU7S0FDakIsV0FBUyxjQUFTO1lBQ2I7TUFBQSxNQUFBO01BQ0osR0FBQSxXQUFTLEdBQ0E7Y0FDSjtRQUFILEdBQUEsT0FBSSxNQUFLLEtBQ0c7U0FBTjtVQUFNLE1BQU47VUFDSixHQUFBLFdBQVMsR0FDQTtXQUFSLGNBQVMsSUFBSztVQUFBLE9BRVg7V0FBSCxpQkFBWTtVQUFBO1NBQUE7Z0JBQ2QsUUFBTztlQUVKO1NBQUgsUUFBTTtnQkFFSDtpQkFBQTtXQUFGLFNBQU87V0FDQSxLQUFBLFdBQVMsTUFDSTtZQUFuQixPQUFNO1dBQUE7V0FDSixHQUFBLE9BQUcsU0FBUyxLQUNHO1lBQWpCLGFBQWE7WUFDYixPQUFNLFFBQU07O2VBQ047VUFBQTtTQUFBO1FBQUE7T0FBQTtNQUFBLE9BRVA7Y0FBSDtNQUFBO0tBQUE7SUFBQTtJQUVILFlBQUEsWUFDUzs7S0FBUjs7O2lCQS9Eb0I7OztFQWtFckIsV0FDYztHQUFILFlBQUEsSUFBSyxPQUFLLFFBQ0s7OztvQkFBeEIsYUFBUTtvQkFDUixjQUFTO0dBQUE7RUFBQTtFQUlYLHlCQUFvQiw4QkFBQSxhQUFXLElBQ0c7R0FBakMsUUFBTTtVQUVIO1dBQUE7S0FBSyxLQUFBLFdBQVMsS0FDRztNQUFsQixPQUFNOztLQUNKLEdBQUEsT0FBRyxRQUFRLEtBQ0c7TUFBaEIsT0FBTTtLQUFBO1NBQ0EiLCJmaWxlIjoiYXQvTWFwL0hhc2gtTWFwLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
