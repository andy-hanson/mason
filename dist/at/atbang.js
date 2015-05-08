"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Type/Kind","../Type/Method","./at","./at-Type","./Seq/Arraybang","./Seq/Seqbang","../bang","../compare","../Type/Type","./at"],function(exports,Kind_0,Method_1,_64_2,_64_45Type_3,Array_33_4,Seq_33_5,_33_6,compare_7,Type_8,_64_9){
	exports._get=_ms.lazy(function(){
		const Kind=_ms.getDefaultExport(Kind_0),_$2=_ms.getModule(Kind_0),kind_33=_ms.get(_$2,"kind!"),self_45kind_33=_ms.get(_$2,"self-kind!"),Method=_ms.getDefaultExport(Method_1),_$3=_ms.getModule(Method_1),self_45impl_33=_ms.get(_$3,"self-impl!"),_64=_ms.getDefaultExport(_64_2),_64_45Type=_ms.getDefaultExport(_64_45Type_3),_$5=_ms.getModule(_64_45Type_3),empty=_ms.get(_$5,"empty"),Array_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Array_33_4)
		}),_$8=_ms.lazyGetModule(Seq_33_5),_43_43_62_33=_ms.lazyProp(_$8,"++>!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_6)
		}),_$10=_ms.lazyGetModule(_33_6),_33not=_ms.lazyProp(_$10,"!not"),_$11=_ms.lazyGetModule(compare_7),_61_63=_ms.lazyProp(_$11,"=?"),_$12=_ms.lazyGetModule(Type_8),contains_63=_ms.lazyProp(_$12,"contains?"),_$13=_ms.lazyGetModule(_64_9),each_33=_ms.lazyProp(_$13,"each!"),empty_63=_ms.lazyProp(_$13,"empty?");
		const exports={};
		const _64_33=Kind(function(){
			const doc="Mutable @.";
			const implementor_45test=function(type){
				const _=function(){
					const _=type;
					if(_ms.bool(_ms.unlazy(_61_63)(_,Array))){
						return empty(_ms.unlazy(Array_33))
					} else {
						return empty(type)
					}
				}();
				_43_43_33(_,[1,2]);
				_43_43_33(_,[3,4]);
				_ms.unlazy(each_33)([1,2,3,4],function(em){
					return _ms.unlazy(_33)(_ms.unlazy(contains_63),_,em)
				});
				_ms.unlazy(_33not)(_ms.unlazy(contains_63),_,5);
				empty_33(_);
				_ms.unlazy(each_33)([1,2,3,4],function(em){
					return _ms.unlazy(_33not)(_ms.unlazy(contains_63),_,em)
				});
				return _ms.unlazy(_33)(_ms.unlazy(empty_63),_)
			};
			return {
				doc:doc,
				"implementor-test":implementor_45test,
				displayName:"@!"
			}
		}());
		self_45kind_33(_64_33,_64_45Type);
		self_45impl_33(empty,_64_33,function(){
			return empty(_ms.unlazy(Array_33))
		});
		kind_33(_64_33,_64);
		const empty_33=exports["empty!"]=Method(function(){
			const doc="Mutates this collection so that it will be `empty?`.";
			return {
				doc:doc,
				displayName:"empty!"
			}
		}());
		const _43_43_33=exports["++!"]=Method(function(){
			const doc="Adds new elements.\nFor Seqs these are added on the right; use `<++!` to add on the left.";
			const test=function(){
				return "TODO:impl-test"
			};
			const _default=function(_,added){
				return _ms.unlazy(_43_43_62_33)(_,added)
			};
			return {
				doc:doc,
				test:test,
				default:_default,
				displayName:"++!"
			}
		}());
		const _45_45_33=exports["--!"]=Method(function(){
			const doc=function(_,removed){
				_ms.checkContains(_64,removed,"removed");
				return "Removes all elements in `removed` once.\nFor Seqs these are removed starting from the left."
			};
			const test=function(){
				return "TODO:impl-test"
			};
			return {
				doc:doc,
				test:test,
				displayName:"--!"
			}
		}());
		exports.default=_64_33;
		const displayName=exports.displayName="@!";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL0AhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztpQ0FjQTs7Ozs7OztFQUFBLGFBQUssZUFBSTtHQUNSLFVBQU07R0FDTix5QkFBbUIsU0FBQSxLQUVsQjtJQUFBO0tBQVMsUUFBQTtLQUNSLCtCQUFHLEVBQUgsUUFBVTthQUNUO1lBQ0c7YUFDSCxNQUFBO0tBQUE7SUFBQTtJQUNGLFVBQUksRUFBRSxDQUFFLEVBQUU7SUFDVixVQUFJLEVBQUUsQ0FBRSxFQUFFO3dCQUNKLENBQUUsRUFBRSxFQUFFLEVBQUUsR0FBSyxTQUFBLEdBQ2xCO29EQUFZLEVBQVo7SUFBQTsrQ0FDYyxFQUFFO0lBQ2pCLFNBQU87d0JBQ0QsQ0FBRSxFQUFFLEVBQUUsRUFBRSxHQUFLLFNBQUEsR0FDbEI7dURBQWUsRUFBZjtJQUFBO2dEQUNRO0dBQUE7VUFqQkY7Ozs7OztFQW1CVCxlQUFBLE9BQUE7RUFDQSxlQUFBLE1BQUEsT0FBcUIsVUFDcEI7VUFBQTs7RUFFRCxRQUFBLE9BQUE7RUFFQSxpQ0FBUSxpQkFBTTtHQUNiLFVBQU07VUFETzs7Ozs7RUFHZCwrQkFBSyxpQkFBTTtHQUNWLFVBQ0M7R0FFRCxXQUFPLFVBQ047V0FBQztHQUFBO0dBRUYsZUFBVSxTQUFBLEVBQUUsTUFDWDtvQ0FBSyxFQUFMO0dBQUE7VUFSUzs7Ozs7OztFQVVYLCtCQUFLLGlCQUFNO0dBQ1YsVUFBTSxTQUFBLEVBQUUsUUFDUDtzQkFEZTtXQUVkO0dBQUE7R0FFRixXQUFPLFVBQ047V0FBQztHQUFBO1VBTlE7Ozs7OztrQkFRWDtFQTVEQSxzQ0FBQSIsImZpbGUiOiJhdC9hdGJhbmcuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==