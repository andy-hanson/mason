"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../js","../../Type/Kind","../../Type/Method","../../Type/Type","../at","../at-Type","./Seq","../../math/Number"],(exports,compare_0,js_1,Kind_2,Method_3,Type_4,_64_5,_64_45Type_6,Seq_7,Number_8)=>{
	exports._get=_ms.lazy(()=>{
		const _$4=_ms.getModule(compare_0),_60_63=_ms.get(_$4,"<?"),_$5=_ms.getModule(js_1),js_45set=_ms.get(_$5,"js-set"),js_45sub=_ms.get(_$5,"js-sub"),_$6=_ms.getModule(Kind_2),kind_33=_ms.get(_$6,"kind!"),self_45kind_33=_ms.get(_$6,"self-kind!"),_$7=_ms.getModule(Method_3),impl_33=_ms.get(_$7,"impl!"),self_45impl_33=_ms.get(_$7,"self-impl!"),_$8=_ms.getModule(Type_4),_61_62=_ms.get(_$8,"=>"),_64=_ms.getDefaultExport(_64_5),_$9=_ms.getModule(_64_5),count=_ms.get(_$9,"count"),empty_33=_ms.get(_$9,"empty!"),empty_63=_ms.get(_$9,"empty?"),_64_45Type=_ms.getDefaultExport(_64_45Type_6),_$10=_ms.getModule(_64_45Type_6),empty=_ms.get(_$10,"empty"),from_45stream=_ms.get(_$10,"from-stream"),Seq=_ms.getDefaultExport(Seq_7),_$11=_ms.getModule(Seq_7),_60_43_43_33=_ms.get(_$11,"<++!"),_43_43_62_33=_ms.get(_$11,"++>!"),_63nth=_ms.get(_$11,"?nth"),_63_60pop_33=_ms.get(_$11,"?<pop!"),_63pop_62_33=_ms.get(_$11,"?pop>!"),set_45nth_33=_ms.get(_$11,"set-nth!"),_$13=_ms.lazyGetModule(Number_8),Nat=_ms.lazyProp(_$13,"Nat");
		self_45kind_33(Array,_64_45Type);
		self_45impl_33(empty,Array,()=>{
			return []
		});
		self_45impl_33(from_45stream,Array,stream=>{
			const arr=[];
			for(let _ of stream){
				arr.push(_)
			};
			return arr
		});
		kind_33(Array,Seq);
		impl_33(count,Array,function(){
			const _this=this;
			return _this.length
		});
		impl_33(_63nth,Array,function(n){
			const _this=this;
			return _ms.bool(_60_63(n,count(_this)))?_ms.some(()=>{
				return js_45sub(_this,n)
			}()):_ms.None
		});
		impl_33(_60_43_43_33,Array,function(added){
			const _this=this;
			_ms.checkContains(_64,added,"added");
			return Array.prototype.unshift.apply(_this,_61_62(Array,added))
		});
		impl_33(_43_43_62_33,Array,function(added){
			const _this=this;
			_ms.checkContains(_64,added,"added");
			return Array.prototype.push.apply(_this,_61_62(Array,added))
		});
		impl_33(_63_60pop_33,Array,function(){
			const _this=this;
			return _ms.bool(empty_63(_this))?_ms.None:_ms.some(()=>{
				return _this.shift()
			}())
		});
		impl_33(_63pop_62_33,Array,function(){
			const _this=this;
			return _ms.bool(empty_63(_this))?_ms.None:_ms.some(()=>{
				return _this.pop()
			}())
		});
		impl_33(empty_33,Array,function(){
			const _this=this;
			for(;;){
				if(empty_63(_this)){
					break
				};
				_this.pop()
			}
		});
		const name=exports.name=`Array-as-Seq`;
		exports.default=impl_33(set_45nth_33,Array,function(n,val){
			const _this=this;
			_ms.checkContains(_ms.unlazy(Nat),n,"n");
			js_45set(_this,n,val)
		});
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9BcnJheS1hcy1TZXEubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFjQSxlQUFXLE1BQU07RUFDakIsZUFBVyxNQUFNLE1BQ08sSUFBQTtVQUF2QjtFQUFBO0VBQ0QsZUFBVyxjQUFZLE1BQU8sUUFDTTtHQUFuQyxVQUFNO0dBQ0QsUUFBQSxLQUFBLE9BQ007SUFBVixTQUFTO0dBQUE7VUFDVjtFQUFBO0VBR0QsUUFBTSxNQUFNO0VBRVosUUFBTSxNQUFNLE1BQ1EsVUFBQTs7VUFBbkI7O0VBRUQsUUFBTSxPQUFLLE1BQVEsU0FBQSxFQUNDOzttQkFBaEIsT0FBRyxFQUFHLE1BQU0sc0JBQ0s7V0FBbkIsU0FBTyxNQUFLO0dBQUE7O0VBRWQsUUFBTSxhQUFLLE1BQVEsU0FBQSxNQUNPOztxQkFERDtVQUV4Qiw4QkFBOEIsTUFBTSxPQUFHLE1BQU07RUFBQTtFQUU5QyxRQUFNLGFBQUssTUFBUSxTQUFBLE1BQ087O3FCQUREO1VBRXhCLDJCQUEyQixNQUFNLE9BQUcsTUFBTTtFQUFBO0VBRTNDLFFBQU0sYUFBTyxNQUNRLFVBQUE7O21CQUFiLFNBQU8sOEJBQ0k7V0FBakI7OztFQUVGLFFBQU0sYUFBTyxNQUNRLFVBQUE7O21CQUFiLFNBQU8sOEJBQ0k7V0FBakI7OztFQUVGLFFBQU0sU0FBTyxNQUNTLFVBQUE7O0dBR2pCLE9BQUE7SUFBSCxHQUFJLFNBQU8sT0FDSTtLQUFkO0lBQUE7SUFDRDs7O0VBdkRGLHdCQUFBO2tCQXlEQSxRQUFNLGFBQVMsTUFBUyxTQUFBLEVBQU0sSUFDRzs7O0dBQWhDLFNBQU8sTUFBSyxFQUFFO0VBQUEiLCJmaWxlIjoiYXQvU2VxL0FycmF5LWFzLVNlcS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9