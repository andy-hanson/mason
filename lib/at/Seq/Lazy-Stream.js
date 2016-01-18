"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../math/Number","./../../math/methods","./../at","./Seq","./Stream"],(exports,Number_0,methods_1,_64_2,Seq_3,Stream_4)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(Number_0),Nat=_ms.get(_$0,"Nat"),_$1=_ms.getModule(methods_1),_45=_ms.get(_$1,"-"),_$2=_ms.getModule(_64_2),count=_ms.get(_$2,"count"),empty=_ms.get(_$2,"empty"),empty_63=_ms.get(_$2,"empty?"),from_45stream=_ms.get(_$2,"from-stream"),iterator=_ms.get(_$2,"iterator"),Seq=_ms.getDefaultExport(Seq_3),_$3=_ms.getModule(Seq_3),_63nth=_ms.get(_$3,"?nth"),Stream=_ms.getDefaultExport(Stream_4);
		let Lazy_45Stream=exports.default=(()=>{
			let _=class Lazy_45Stream{
				static [_ms.symbol(empty)](){
					let _this=this;
					return new (_this)(function*(){})
				}
				static [_ms.symbol(from_45stream)](_){
					let _this=this;
					return new (_this)(()=>{
						return iterator(_)
					})
				}
				constructor(stream){
					let _this=this;
					_ms.checkInstance(Function,stream,"stream");
					_ms.newProperty(_this,"cache",[]);
					let strm=new (Stream)(stream);
					let self=_this;
					let get_45caching_45iterator=function* get_45caching_45iterator(){
						for(let _ of strm){
							self.cache.push(_);
							(yield _)
						}
					};
					_ms.newProperty(_this,"caching-iterator",get_45caching_45iterator())
				}
				*[_ms.symbol(iterator)](){
					let _this=this;
					(yield* iterator(_this.cache));
					(yield* _this["caching-iterator"])
				}
				[_ms.symbol(_63nth)](n){
					let _this=this;
					_ms.checkInstance(Nat,n,"n");
					return (()=>{
						let _=_63nth(_this.cache,n);
						if(empty_63(_)){
							let n_45left=_45(n,count(_this.cache));
							return _63nth(Stream(_this["caching-iterator"]),n_45left)
						} else {
							return _
						}
					})()
				}
			};
			_ms.traitDo(_,Seq);
			return _
		})();
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9TZXEvTGF6eS1TdHJlYW0ubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFPQSxrQ0FBbUI7O0lBS2pCLG1CQUFBLFNBQ087O1lBQU4sS0FBSSxPQUNRLFdBQUE7SUFBQTtJQUViLG1CQUFBLGdCQUFjLEVBQ0E7O1lBQWIsS0FBSSxPQUNNLElBQUE7YUFBVCxTQUFTO0tBQUE7SUFBQTtJQUVGLFlBQUEsT0FDZTs7dUJBRFI7cUJBRWhCLGNBQVM7S0FJVCxTQUFPLEtBQUksUUFBTztLQUVsQixTQUFPO0tBRVAsNkJBQzBCLG9DQUFBO01BQXJCLFFBQUEsS0FBQSxLQUNJO09BQ1AsZ0JBQWlCO2NBQ1Y7TUFBQTtLQUFBO3FCQUNULHlCQUFvQjtJQUFBO0lBRXJCLGFBQUEsWUFDWTs7YUFBSixTQUFTO2FBQ1Q7O0lBRVIsWUFBQSxTQUFNLEVBQ0s7O3VCQURIO1lBRUY7TUFBQSxNQUFBLE9BQUssWUFBTztNQUNoQixHQUFBLFNBQU8sR0FDQTtPQUFOLGFBQVMsSUFBRSxFQUFHLE1BQU07Y0FDcEIsT0FBTSxPQUFPLDJCQUFtQjtNQUFBLE9BRTdCO2NBQUY7TUFBQTtLQUFBO0lBQUE7R0FBQTtpQkF6Q29CIiwiZmlsZSI6ImF0L1NlcS9MYXp5LVN0cmVhbS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
