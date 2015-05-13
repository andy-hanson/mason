"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Type/Kind","../../Type/Method","../atbang","../at-Type","./Seq","./Dequebang","../../bang","../../compare","../at","../q","./Arraybang","./Seq"],function(exports,Kind_0,Method_1,_64_33_2,_64_45Type_3,Seq_4,Deque_33_5,_33_6,compare_7,_64_8,_63_9,Array_33_10,Seq_11){
	exports._get=_ms.lazy(function(){
		const Kind=_ms.getDefaultExport(Kind_0),_$2=_ms.getModule(Kind_0),kind_33=_ms.get(_$2,"kind!"),self_45kind_33=_ms.get(_$2,"self-kind!"),Method=_ms.getDefaultExport(Method_1),_64_33=_ms.getDefaultExport(_64_33_2),_64_45Type=_ms.getDefaultExport(_64_45Type_3),_$5=_ms.getModule(_64_45Type_3),empty=_ms.get(_$5,"empty"),Seq=_ms.getDefaultExport(Seq_4),Deque_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Deque_33_5)
		}),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_6)
		}),_$11=_ms.lazyGetModule(compare_7),_61_63=_ms.lazyProp(_$11,"=?"),_$12=_ms.lazyGetModule(_64_8),empty_63=_ms.lazyProp(_$12,"empty?"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_9)
		}),Array_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Array_33_10)
		}),_$15=_ms.lazyGetModule(Seq_11),seq_61_63=_ms.lazyProp(_$15,"seq=?");
		const Seq_33=Kind(function(){
			const doc="Mutable Seq.\nArray!s can efficiently change existing elements and add new ones on the right.\nDeque!s are like Arrays, but can add new values on the left.";
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
					_43_43_62_33(_,[1,2]);
					_60_43_43_33(_,[- 2,- 1]);
					_ms.unlazy(_33)(_ms.unlazy(seq_61_63),_,[- 2,- 1,1,2]);
					_ms.unlazy(_33)(_ms.unlazy(_61_63),_63pop_62_33(_),_ms.unlazy(_63)(2));
					_ms.unlazy(_33)(_ms.unlazy(_61_63),_63_60pop_33(_),_ms.unlazy(_63)(- 2));
					_ms.unlazy(_33)(_ms.unlazy(_61_63),_63pop_62_33(_),_ms.unlazy(_63)(1));
					_ms.unlazy(_33)(_ms.unlazy(_61_63),_63_60pop_33(_),_ms.unlazy(_63)(- 1));
					_ms.unlazy(_33)(_ms.unlazy(_61_63),_63pop_62_33(_),empty(_ms.unlazy(_63)));
					_ms.unlazy(_33)(_ms.unlazy(empty_63),_);
					return _43_43_62_33(_,[1,2,3])
				},"displayName","implementor-test")
			}();
			return {
				doc:doc,
				"implementor-test":implementor_45test,
				displayName:"Seq!"
			}
		}());
		self_45kind_33(Seq_33,_64_45Type,function(){
			const _k0=empty,_v0=function(){
				return empty(_ms.unlazy(Deque_33))
			};
			return _ms.map(_k0,_v0)
		}());
		kind_33(Seq_33,_64_33);
		kind_33(Seq_33,Seq);
		const _60_43_43_33=exports["<++!"]=Method(function(){
			const doc="|_ added:@\nMakes `_` into `+ added _`.";
			return {
				doc:doc,
				displayName:"<++!"
			}
		}());
		const _43_43_62_33=exports["++>!"]=Method(function(){
			const doc="|_ added:@\nMakes `_` into `+ _ added`.";
			return {
				doc:doc,
				displayName:"++>!"
			}
		}());
		const _63_60pop_33=exports["?<pop!"]=Method(function(){
			const doc="|:? _\nTakes one element off the left side, if not empty?.";
			return {
				doc:doc,
				displayName:"?<pop!"
			}
		}());
		const _63pop_62_33=exports["?pop>!"]=Method(function(){
			const doc="|:? _\nTakes one element off the right side, if not empty?.";
			return {
				doc:doc,
				displayName:"?pop>!"
			}
		}());
		const set_45nth_33=exports["set-nth!"]=Method(function(){
			const doc="|_ n:Nat val\nMakes `_[n]` be `val`.";
			return {
				doc:doc,
				displayName:"set-nth!"
			}
		}());
		const displayName=exports.displayName="Seq!";
		exports.default=Seq_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9TZXEhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7RUFnQkEsYUFBTyxlQUNJO0dBQVYsVUFDQztHQUdELG1DQUFtQjttQkFBQSxTQUFBLEtBQ0k7S0FDdEI7TUFBUyxRQUFBO01BQ1IsK0JBQUcsRUFBRSxRQUNLO2NBQVQ7YUFFRztjQUFILE1BQU07TUFBQTtLQUFBO0tBQ1IsYUFBSyxFQUFFLENBQUUsRUFBRTtLQUNYLGFBQUssRUFBRSxDQUFFLElBQUc7MkNBQ0osRUFBRSxDQUFFLElBQUcsSUFBRyxFQUFFO3dDQUNmLGFBQUEsbUJBQVc7d0NBQ1gsYUFBQSxtQkFBVzt3Q0FDWCxhQUFBLG1CQUFXO3dDQUNYLGFBQUEsbUJBQVc7d0NBQ1gsYUFBQSxHQUFTOzBDQUNMO1lBQ1QsYUFBSyxFQUFFLENBQUUsRUFBRSxFQUFFO0lBQUE7Ozs7Ozs7O0VBRWYsZUFBVyxPQUFLLHFCQUNNO0dBQXJCLFVBQUEsVUFDVSxVQUFBO1dBQVQ7Ozs7RUFFRixRQUFNLE9BQUs7RUFDWCxRQUFNLE9BQUs7RUFFWCxtQ0FBTSxpQkFDTTtHQUFYLFVBQ0M7Ozs7OztFQUVGLG1DQUFNLGlCQUNNO0dBQVgsVUFDQzs7Ozs7O0VBR0YscUNBQVEsaUJBQ007R0FBYixVQUNDOzs7Ozs7RUFFRixxQ0FBUSxpQkFDTTtHQUFiLFVBQ0M7Ozs7OztFQUdGLHVDQUFVLGlCQUNNO0dBQWYsVUFDQzs7Ozs7O0VBbEVGLHNDQUFBO2tCQXFFQSIsImZpbGUiOiJhdC9TZXEvU2VxYmFuZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9