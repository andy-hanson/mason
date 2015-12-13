"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../js","./../at","./Seq"],(exports,js_0,_64_1,Seq_2)=>{
	exports._get=_ms.lazy(()=>{
		let _$1=_ms.getModule(js_0),id_61_63=_ms.get(_$1,"id=?"),_64=_ms.getDefaultExport(_64_1),_$2=_ms.getModule(_64_1),_43_43=_ms.get(_$2,"++"),empty=_ms.get(_$2,"empty"),empty_63=_ms.get(_$2,"empty?"),from_45stream=_ms.get(_$2,"from-stream"),iterator=_ms.get(_$2,"iterator"),Seq=_ms.getDefaultExport(Seq_2),_$3=_ms.getModule(Seq_2),_60_43_43_126=_ms.get(_$3,"<++~"),_64tail=_ms.get(_$3,"@tail");
		let LList=exports.default=(()=>{
			let _=class LList{
				static [_ms.symbol(empty)](){
					let _this=this;
					return empty_45LList
				}
				static [_ms.symbol(from_45stream)](_){
					let _this=this;
					return _60_43_43_126(empty_45LList,_)
				}
				constructor(head,tail){
					let _this=this;
					_ms.newProperty(this,"head",head);
					_ms.newProperty(this,"tail",tail)
				}
				*[_ms.symbol(iterator)](){
					let _this=this;
					let cur=_this;
					for(;;){
						if(empty_63(cur)){
							break
						};
						(yield cur.head);
						cur=cur.tail
					}
				}
				[_ms.symbol(empty_63)](){
					let _this=this;
					return id_61_63(_this,empty_45LList)
				}
				[_ms.symbol(_64tail)](){
					let _this=this;
					return _this.tail
				}
				[_ms.symbol(_60_43_43_126)](left_45added){
					let _this=this;
					_ms.checkInstance(_64,left_45added,"left-added");
					let iter=iterator(left_45added);
					let f=function f(){
						let _$0=iter.next(),value=_$0.value,done=_$0.done;
						return (done?_this:new (LList)(value,f()))
					};
					return f()
				}
				[_ms.symbol(_43_43)](other){
					let _this=this;
					return (()=>{
						let _=other;
						if(_ms.hasInstance(LList,_)){
							return _60_43_43_126(other,_this)
						} else {
							return _43_43.default.call(_this,other)
						}
					})()
				}
			};
			_ms.traitDo(_,Seq);
			return _
		})();
		let empty_45LList=new (LList)(void 0,void 0);
		Object.defineProperty(empty_45LList,"tail",(()=>{
			let built={};
			let value=built.value=empty_45LList;
			return built
		})());
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9TZXEvTExpc3QubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFLQSwwQkFBYTs7dUJBSVg7U0FpQ2E7WUFoQ1o7SUFBQTt1QkFDRCxnQkFBYztTQStCRDtZQTlCWixjQUFLLGNBQWE7SUFBQTtJQUVWLFlBQUEsS0FBTTtTQTRCRjs7OztpQkF6QmQ7U0F5QmM7S0F4QmIsUUF3QmE7S0F0QlYsT0FBQTtNQUFDLEdBQUEsU0FBTyxLQUNHO09BQVo7TUFBQTthQUNLO1VBQ0M7OztnQkFFVDtTQWlCYztZQWhCYixTQWdCYSxNQWhCSDtJQUFBO2dCQUVYO1NBY2M7WUFBQTs7Z0JBWGQsZ0JBQU07U0FXUTt1QkFYRztLQUNoQixTQUFPLFNBQVM7S0FDaEIsTUFDSztNQUFKLFFBQWE7YUFDUixDQUFBLEtBT08sTUFQRyxLQUFJLE9BQU0sTUFBTTtLQUFBO1lBQ2hDO0lBQUE7Z0JBRUQsU0FBSTtTQUlVO1lBRlI7TUFBQSxNQUFBO01BQ0osbUJBQUMsTUFBRCxHQUNNO2NBQUwsY0FBSyxNQUFNO01BQUEsT0FFUjtjQUFILG9CQUZXLE1BRVU7TUFBQTtLQUFBO0lBQUE7R0FBQTtpQkF2Q047OztFQXlDbkIsa0JBQWMsS0FBSSxPQUFNLE9BQVU7RUFDbEMsc0JBQXNCLGNBQWEsT0FDSSxLQUFBOztHQUF0QyxzQkFBTyIsImZpbGUiOiJhdC9TZXEvTExpc3QuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
