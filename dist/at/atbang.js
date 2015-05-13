"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Type/Kind","../Type/Method","./at","./at-Type","./Seq/Arraybang","./Seq/Seqbang","../bang","../compare","../Type/Type","./at"],function(exports,Kind_0,Method_1,_64_2,_64_45Type_3,Array_33_4,Seq_33_5,_33_6,compare_7,Type_8,_64_9){
	exports._get=_ms.lazy(function(){
		const Kind=_ms.getDefaultExport(Kind_0),_$2=_ms.getModule(Kind_0),kind_33=_ms.get(_$2,"kind!"),self_45kind_33=_ms.get(_$2,"self-kind!"),Method=_ms.getDefaultExport(Method_1),_$3=_ms.getModule(Method_1),self_45impl_33=_ms.get(_$3,"self-impl!"),_64=_ms.getDefaultExport(_64_2),_64_45Type=_ms.getDefaultExport(_64_45Type_3),_$5=_ms.getModule(_64_45Type_3),empty=_ms.get(_$5,"empty"),Array_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Array_33_4)
		}),_$8=_ms.lazyGetModule(Seq_33_5),_43_43_62_33=_ms.lazyProp(_$8,"++>!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_6)
		}),_$10=_ms.lazyGetModule(_33_6),_33not=_ms.lazyProp(_$10,"!not"),_$11=_ms.lazyGetModule(compare_7),_61_63=_ms.lazyProp(_$11,"=?"),_$12=_ms.lazyGetModule(Type_8),contains_63=_ms.lazyProp(_$12,"contains?"),_$13=_ms.lazyGetModule(_64_9),each_33=_ms.lazyProp(_$13,"each!"),empty_63=_ms.lazyProp(_$13,"empty?");
		const _64_33=Kind(function(){
			const doc="Mutable @.";
			const implementor_45test=function(){
				return _ms.set(function(type){
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
				},"displayName","implementor-test")
			}();
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
				return _ms.set(function(){
					return "TODO:impl-test"
				},"displayName","test")
			}();
			const _default=function(){
				return _ms.set(function(_,added){
					return _ms.unlazy(_43_43_62_33)(_,added)
				},"displayName","default")
			}();
			return {
				doc:doc,
				test:test,
				default:_default,
				displayName:"++!"
			}
		}());
		const _45_45_33=exports["--!"]=Method(function(){
			const doc=function(){
				return "|_ removed:@\nRemoves all elements in `removed` once.\nFor Seqs these are removed starting from the left."
			}();
			const test=function(){
				return _ms.set(function(){
					return "TODO:impl-test"
				},"displayName","test")
			}();
			return {
				doc:doc,
				test:test,
				displayName:"--!"
			}
		}());
		const displayName=exports.displayName="@!";
		exports.default=_64_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL0AhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztFQWNBLGFBQUssZUFDSTtHQUFSLFVBQU07R0FDTixtQ0FBbUI7bUJBQUEsU0FBQSxLQUNJO0tBQ3RCO01BQVMsUUFBQTtNQUNSLCtCQUFHLEVBQUUsUUFDSztjQUFUO2FBRUc7Y0FBSCxNQUFNO01BQUE7S0FBQTtLQUNSLFVBQUksRUFBRSxDQUFFLEVBQUU7S0FDVixVQUFJLEVBQUUsQ0FBRSxFQUFFO3lCQUNKLENBQUUsRUFBRSxFQUFFLEVBQUUsR0FBSyxTQUFBLEdBQ0U7cURBQVIsRUFBRTtLQUFBO2dEQUNBLEVBQUU7S0FDakIsU0FBTzt5QkFDRCxDQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUssU0FBQSxHQUNFO3dEQUFMLEVBQUU7S0FBQTtpREFDVDtJQUFBOzs7Ozs7OztFQUVYLGVBQVcsT0FBRztFQUNkLGVBQVcsTUFBTSxPQUNJLFVBQUE7VUFBcEI7O0VBRUQsUUFBTSxPQUFHO0VBRVQsaUNBQVEsaUJBQ007R0FBYixVQUFNOzs7Ozs7RUFFUCwrQkFBSyxpQkFDTTtHQUFWLFVBQ0M7R0FFRCxxQkFDTzttQkFBQSxVQUFBO1lBQUw7SUFBQTs7R0FFRix5QkFBVTttQkFBQSxTQUFBLEVBQUUsTUFDSztxQ0FBWCxFQUFFO0lBQUE7Ozs7Ozs7OztFQUVULCtCQUFLLGlCQUNNO0dBQVYsb0JBQ0k7V0FDRjtHQUFBO0dBR0YscUJBQ087bUJBQUEsVUFBQTtZQUFMO0lBQUE7Ozs7Ozs7O0VBM0RILHNDQUFBO2tCQTZEQSIsImZpbGUiOiJhdC9hdGJhbmcuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==