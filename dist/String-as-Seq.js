"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at","./at/at-Type","./at/Seq/Seq","./compare","./control","./Function","./show","./Type/Impl-Type","./Type/Kind","./Type/Method","./Type/Pred-Type","./Type/Type","./bang","./Function"],function(exports,_64_0,_64_45Type_1,Seq_2,compare_3,control_4,Function_5,show_6,Impl_45Type_7,Kind_8,Method_9,Pred_45Type_10,Type_11,_33_12,Function_13){
	exports._get=_ms.lazy(function(){
		const _64=_ms.getDefaultExport(_64_0),_$2=_ms.getModule(_64_0),count=_$2.count,empty_63=_$2["empty?"],iterator=_$2.iterator,map=_$2.map,_64_45Type=_ms.getDefaultExport(_64_45Type_1),_$3=_ms.getModule(_64_45Type_1),empty=_$3.empty,from_45stream=_$3["from-stream"],Seq=_ms.getDefaultExport(Seq_2),_$5=_ms.getModule(compare_3),_61_63=_$5["=?"],sort=_$5.sort,_$6=_ms.getModule(control_4),opr=_$6.opr,_$7=_ms.getModule(Function_5),noop=_$7.noop,thunk=_$7.thunk,show=_ms.getDefaultExport(show_6),_$9=_ms.getModule(Impl_45Type_7),self_45type=_$9["self-type"],_$10=_ms.getModule(Kind_8),kind_33=_$10["kind!"],self_45kind_33=_$10["self-kind!"],_$11=_ms.getModule(Method_9),impl_33=_$11["impl!"],impl_45double_33=_$11["impl-double!"],impl_45for=_$11["impl-for"],_$12=_ms.getModule(Pred_45Type_10),Opt=_$12.Opt,_$13=_ms.getModule(Type_11),_61_62=_$13["=>"],_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_12)
		}),_$16=_ms.lazyGetModule(Function_13),identity=_ms.lazyProp(_$16,"identity");
		self_45kind_33(String,_64_45Type,function(){
			const _k0=empty,_v0=thunk("");
			const _k1=from_45stream,_v1=function(_){
				return from_45stream(Array,_)
			};
			return _ms.map(_k0,_v0,_k1,_v1)
		}());
		impl_45double_33(_61_62,self_45type(String),_64,function(){
			return _ms.set(function(str,_,joiner){
				noop(str);
				joiner=opr(joiner,"");
				return _61_62(Array,map(_,show)).join(joiner)
			})
		}());
		impl_33(sort,String,function(){
			return _ms.set(function(_,_63sort_45by){
				return _61_62(String,sort.default(_,_63sort_45by))
			})
		}());
		const name=exports.name="String-as-Seq";
		exports.default=kind_33(String,Seq,function(){
			const _k0=count,_v0=function(_){
				return _.length
			};
			const _k1=empty_63,_v1=function(_){
				return _61_63(0,_.length)
			};
			const _k2=iterator,_v2=impl_45for(iterator,Array);
			return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2)
		}());
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9TdHJpbmctYXMtU2VxLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFzQkEsZUFBVyxPQUFPLHFCQUNNO0dBQXZCLFVBQUEsVUFBUyxNQVljO0dBVnZCLFVBQUEsa0JBQWdCLFNBQUEsRUFDQztXQUFoQixjQUFZLE1BQU07R0FBQTs7O0VBR3BCLGlCQUFhLE9BQUksWUFBVSxRQUFRLGNBQ0M7a0JBR2xDLFNBQUEsSUFBSSxFQUFFLE9BQ2tCO0lBQXhCLEtBQUs7V0FDSyxJQUFJLE9BQVE7V0FDckIsT0FBRyxNQUFPLElBQUksRUFBRSxZQUFZO0dBQUE7RUFBQTtFQUcvQixRQUFNLEtBQUssaUJBQ007a0JBRWYsU0FBQSxFQUFFLGFBQ3NCO1dBQXhCLE9BQUcsT0FBUSxhQUFhLEVBQUU7R0FBQTtFQUFBO0VBM0M1Qix3QkFBQTtrQkE2Q0EsUUFBTSxPQUFPLGNBQ0c7R0FBZixVQUFBLFVBQVUsU0FBQSxFQUNDO1dBQVY7O0dBQ0QsVUFBQSxhQUFXLFNBQUEsRUFDQztXQUFYLE9BQUcsRUFBRTs7R0FHTixVQUFBLGFBQVksV0FBUyxTQUFTIiwiZmlsZSI6IlN0cmluZy1hcy1TZXEuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==