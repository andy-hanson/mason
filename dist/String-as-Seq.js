"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at","./at/Seq/Seq","./compare","./control","./to-string","./Type/Impl-Type","./Type/Method","./Type/Pred-Type","./Type/primitive","./Type/Trait","./Type/Type"],(exports,_64_0,Seq_1,compare_2,control_3,to_45string_4,Impl_45Type_5,Method_6,Pred_45Type_7,primitive_8,Trait_9,Type_10)=>{
	exports._get=_ms.lazy(()=>{
		let _64=_ms.getDefaultExport(_64_0),_$0=_ms.getModule(_64_0),count=_ms.get(_$0,"count"),empty=_ms.get(_$0,"empty"),empty_63=_ms.get(_$0,"empty?"),from_45stream=_ms.get(_$0,"from-stream"),_64map=_ms.get(_$0,"@map"),Seq=_ms.getDefaultExport(Seq_1),_$1=_ms.getModule(compare_2),_61_63=_ms.get(_$1,"=?"),sort=_ms.get(_$1,"sort"),_$2=_ms.getModule(control_3),opr=_ms.get(_$2,"opr"),to_45string=_ms.getDefaultExport(to_45string_4),_$3=_ms.getModule(Impl_45Type_5),Self_45Type=_ms.get(_$3,"Self-Type"),_$4=_ms.getModule(Method_6),impl_45double_33=_ms.get(_$4,"impl-double!"),self_45impl_33=_ms.get(_$4,"self-impl!"),_$5=_ms.getModule(Pred_45Type_7),Opt=_ms.get(_$5,"Opt"),_$6=_ms.getModule(primitive_8),Str=_ms.get(_$6,"Str"),_$7=_ms.getModule(Trait_9),trait_33=_ms.get(_$7,"trait!"),_$8=_ms.getModule(Type_10),_61_62=_ms.get(_$8,"=>");
		self_45impl_33(empty,String,()=>{
			return ""
		});
		self_45impl_33(from_45stream,String,_=>{
			return from_45stream(Array,_)
		});
		impl_45double_33(_61_62,new (Self_45Type)(String),_64,(vals,joiner)=>{
			_ms.checkInstance(_ms.sub(Opt,Str),joiner,"joiner");
			joiner=opr(joiner,"");
			return _61_62(Array,_64map(vals,to_45string)).join(joiner)
		});
		exports.default=trait_33(String,Seq,(()=>{
			let built=new (global.Map)();
			_ms.setSub(built,count,function(){
				let _this=this;
				return _this.length
			});
			_ms.setSub(built,empty_63,function(){
				let _this=this;
				return _61_63(0,_this.length)
			});
			_ms.setSub(built,sort,function(_63sort_45by){
				let _this=this;
				_ms.checkInstance(_ms.sub(Opt,Function),_63sort_45by,"?sort-by");
				return sort.default.call(_this,_63sort_45by).join("")
			});
			return built
		})());
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvU3RyaW5nLWFzLVNlcS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQWVBLGVBQVcsTUFBTSxPQUNRO1VBbUJpQjtFQUFBO0VBakIxQyxlQUFXLGNBQVksT0FBUztVQUUvQixjQUFZLE1BQU87RUFBQTtFQUdwQixpQkFBYSxPQUFJLEtBQUksYUFBVSxRQUFRLElBQUcsQ0FBQSxLQUFLOzZCQUFPLElBQUk7VUFDL0MsSUFBSSxPQVcyQjtVQVR4QyxPQUFHLE1BQU8sT0FBSyxLQUFLLG1CQUFpQjtFQUFBO2tCQUV2QyxTQUFPLE9BQU8sSUFDRyxLQUFBOztvQkFBaEIsTUFDVztRQUtTO1dBQUE7O29CQUpwQixTQUNZO1FBR1E7V0FIbkIsT0FBRyxFQUdnQjs7b0JBRHBCLEtBQVUsU0FBQTtRQUNVOzhCQURELElBQUk7V0FDckIsa0JBQWtCLE1BQUssbUJBQWdCO0dBQUEiLCJmaWxlIjoiU3RyaW5nLWFzLVNlcS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
