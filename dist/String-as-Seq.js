"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at","./at/Seq/Seq","./compare","./control","./to-string","./Type/Impl-Type","./Type/Kind","./Type/Method","./Type/Pred-Type","./Type/primitive","./Type/Type"],(exports,_64_0,Seq_1,compare_2,control_3,to_45string_4,Impl_45Type_5,Kind_6,Method_7,Pred_45Type_8,primitive_9,Type_10)=>{
	exports._get=_ms.lazy(()=>{
		let _64=_ms.getDefaultExport(_64_0),_$0=_ms.getModule(_64_0),count=_ms.get(_$0,"count"),empty=_ms.get(_$0,"empty"),empty_63=_ms.get(_$0,"empty?"),from_45stream=_ms.get(_$0,"from-stream"),_64map=_ms.get(_$0,"@map"),Seq=_ms.getDefaultExport(Seq_1),_$1=_ms.getModule(compare_2),_61_63=_ms.get(_$1,"=?"),sort=_ms.get(_$1,"sort"),_$2=_ms.getModule(control_3),opr=_ms.get(_$2,"opr"),to_45string=_ms.getDefaultExport(to_45string_4),_$3=_ms.getModule(Impl_45Type_5),Self_45Type=_ms.get(_$3,"Self-Type"),_$4=_ms.getModule(Kind_6),kind_33=_ms.get(_$4,"kind!"),_$5=_ms.getModule(Method_7),impl_45double_33=_ms.get(_$5,"impl-double!"),self_45impl_33=_ms.get(_$5,"self-impl!"),_$6=_ms.getModule(Pred_45Type_8),Opt=_ms.get(_$6,"Opt"),_$7=_ms.getModule(primitive_9),Str=_ms.get(_$7,"Str"),_$8=_ms.getModule(Type_10),_61_62=_ms.get(_$8,"=>");
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
		exports.default=kind_33(String,Seq,(()=>{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvU3RyaW5nLWFzLVNlcS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQWVBLGVBQVcsTUFBTSxPQUNRO1VBbUJpQjtFQUFBO0VBakIxQyxlQUFXLGNBQVksT0FBUztVQUUvQixjQUFZLE1BQU87RUFBQTtFQUdwQixpQkFBYSxPQUFJLEtBQUksYUFBVSxRQUFRLElBQUcsQ0FBQSxLQUFLOzZCQUFPLElBQUk7VUFDL0MsSUFBSSxPQVcyQjtVQVR4QyxPQUFHLE1BQU8sT0FBSyxLQUFLLG1CQUFpQjtFQUFBO2tCQUV2QyxRQUFNLE9BQU8sSUFDRyxLQUFBOztvQkFBZixNQUNXO1FBS1M7V0FBQTs7b0JBSnBCLFNBQ1k7UUFHUTtXQUhuQixPQUFHLEVBR2dCOztvQkFEcEIsS0FBVSxTQUFBO1FBQ1U7OEJBREQsSUFBSTtXQUNyQixrQkFBa0IsTUFBSyxtQkFBZ0I7R0FBQSIsImZpbGUiOiJTdHJpbmctYXMtU2VxLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
