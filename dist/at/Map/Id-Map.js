"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../methods","./../at","./../q","./../Seq/Stream","./Map"],(exports,methods_0,_64_1,_63_2,Stream_3,Map_4)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(methods_0),del_45sub_33=_ms.get(_$0,"del-sub!"),set_45sub_33=_ms.get(_$0,"set-sub!"),_$1=_ms.getModule(_64_1),count=_ms.get(_$1,"count"),empty_33=_ms.get(_$1,"empty!"),_$2=_ms.getModule(_63_2),Opt_45_62_63=_ms.get(_$2,"Opt->?"),Stream=_ms.getDefaultExport(Stream_3),Map=_ms.getDefaultExport(Map_4),_$3=_ms.getModule(Map_4),_63get=_ms.get(_$3,"?get"),has_45key_63=_ms.get(_$3,"has-key?"),_64keys=_ms.get(_$3,"@keys"),_64values=_ms.get(_$3,"@values");
		let Id_45Map=exports.default=(()=>{
			return global.Map
		})();
		_ms.traitWithDefs(Id_45Map,Map,{},{
			[_ms.symbol(set_45sub_33)](key,val){
				let _this=this;
				_this.set(key,val)
			},
			[_ms.symbol(count)](){
				let _this=this;
				return _this.size
			},
			[_ms.symbol(_63get)](key){
				let _this=this;
				return Opt_45_62_63(_this.get(key))
			},
			[_ms.symbol(has_45key_63)](key){
				let _this=this;
				return _this.has(key)
			},
			[_ms.symbol(_64keys)](){
				let _this=this;
				return new (Stream)(()=>{
					return _this.keys()
				})
			},
			[_ms.symbol(_64values)](){
				let _this=this;
				return new (Stream)(()=>{
					return _this.values()
				})
			},
			[_ms.symbol(empty_33)](){
				let _this=this;
				_this.clear()
			},
			[_ms.symbol(del_45sub_33)](key){
				let _this=this;
				return (()=>{
					let _=_63get(_this,key);
					_this.delete(key);
					return _
				})()
			}
		});
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9NYXAvSWQtTWFwLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBU0EsNkJBQ08sS0FBQTtVQUVOOztvQkFFTSxTQUFPO2VBQ2IsZUFBVyxJQUFJLElBQ0c7UUF3QmhCO0lBQUEsVUF4QkksSUFBSTtHQUFBO2VBRVYsU0FDTztRQXFCTDtXQUFBOztlQW5CRixTQUFNLElBQ0c7UUFrQlA7V0FsQkQsYUFrQkMsVUFsQlk7R0FBQTtlQUVkLGVBQVUsSUFDRztRQWVYO1dBQUEsVUFmSTtHQUFBO2VBRU4sV0FDTztRQVlMO1dBWkQsS0FBSSxRQUNRLElBQUE7WUFXWDs7O2VBVEYsYUFDUztRQVFQO1dBUkQsS0FBSSxRQUNRLElBQUE7WUFPWDs7O2VBTEYsWUFDUztRQUlQO0lBQUE7O2VBRkYsZUFBVSxJQUNHO1FBQ1g7V0FESSxLQUNhO1dBRGIsT0FDSixNQURjO0tBQ2QsYUFBUSIsImZpbGUiOiJhdC9NYXAvSWQtTWFwLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
