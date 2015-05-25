"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Type/Kind","../Type/Method","./at","./at-Type","./Seq/Arraybang","./Seq/Seqbang","../bang","../compare","../Type/Type","./at"],function(exports,Kind_0,Method_1,_64_2,_64_45Type_3,Array_33_4,Seq_33_5,_33_6,compare_7,Type_8,_64_9){
	exports._get=_ms.lazy(function(){
		const Kind=_ms.getDefaultExport(Kind_0),_$2=_ms.getModule(Kind_0),kind_33=_ms.get(_$2,"kind!"),self_45kind_33=_ms.get(_$2,"self-kind!"),Method=_ms.getDefaultExport(Method_1),_$3=_ms.getModule(Method_1),self_45impl_33=_ms.get(_$3,"self-impl!"),_64=_ms.getDefaultExport(_64_2),_64_45Type=_ms.getDefaultExport(_64_45Type_3),_$5=_ms.getModule(_64_45Type_3),empty=_ms.get(_$5,"empty"),Array_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Array_33_4)
		}),_$8=_ms.lazyGetModule(Seq_33_5),_43_43_62_33=_ms.lazyProp(_$8,"++>!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_6)
		}),_$10=_ms.lazyGetModule(_33_6),_33not=_ms.lazyProp(_$10,"!not"),_$11=_ms.lazyGetModule(compare_7),_61_63=_ms.lazyProp(_$11,"=?"),_$12=_ms.lazyGetModule(Type_8),contains_63=_ms.lazyProp(_$12,"contains?"),_$13=_ms.lazyGetModule(_64_9),empty_63=_ms.lazyProp(_$13,"empty?");
		const _64_33=Kind(function(){
			const built={};
			const doc=built.doc="Mutable @.";
			const implementor_45test=built["implementor-test"]=function implementor_45test(type){
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
				for(let em of [1,2,3,4][Symbol.iterator]()){
					_ms.unlazy(_33)(_ms.unlazy(contains_63),_,em)
				};
				_ms.unlazy(_33not)(_ms.unlazy(contains_63),_,5);
				empty_33(_);
				for(let em of [1,2,3,4][Symbol.iterator]()){
					_ms.unlazy(_33not)(_ms.unlazy(contains_63),_,em)
				};
				_ms.unlazy(_33)(_ms.unlazy(empty_63),_)
			};
			return _ms.setName(built,"@!")
		}());
		self_45kind_33(_64_33,_64_45Type);
		self_45impl_33(empty,_64_33,function(){
			return empty(_ms.unlazy(Array_33))
		});
		kind_33(_64_33,_64);
		const empty_33=exports["empty!"]=Method(function(){
			const built={};
			const doc=built.doc="Mutates this collection so that it will be `empty?`.";
			const args=built.args=1;
			return _ms.setName(built,"empty!")
		}());
		const _43_43_33=exports["++!"]=Method(function(){
			const built={};
			const doc=built.doc="Adds new elements.\nFor Seqs these are added on the right; use `<++!` to add on the left.";
			const test=built.test=function test(){};
			const args=built.args=function(){
				const built=[];
				_ms.add(built,"_");
				_ms.add(built,["added",_64]);
				return built
			}();
			const _default=built.default=function _default(_,added){
				_ms.unlazy(_43_43_62_33)(_,added)
			};
			return _ms.setName(built,"++!")
		}());
		const _45_45_33=exports["--!"]=Method(function(){
			const built={};
			const doc=built.doc="Removes all elements in `removed` once.\nFor Seqs these are removed starting from the left.";
			const args=built.args=function(){
				const built=[];
				_ms.add(built,"_");
				_ms.add(built,["@removed",_64]);
				return built
			}();
			const test=built.test=function test(){};
			return _ms.setName(built,"--!")
		}());
		const name=exports.name="@!";
		exports.default=_64_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL0AhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztFQWNBLGFBQUksZUFDSTs7R0FBUCxvQkFBTTtHQUNOLG1EQUFvQiw0QkFBQSxLQUNJO0lBQ3ZCO0tBQVMsUUFBQTtLQUNSLCtCQUFHLEVBQUUsUUFDSzthQUFUO1lBRUc7YUFBSCxNQUFNO0tBQUE7SUFBQTtJQUNSLFVBQUksRUFBRSxDQUFFLEVBQUU7SUFDVixVQUFJLEVBQUUsQ0FBRSxFQUFFO0lBQ0wsUUFBQSxNQUFNLENBQUUsRUFBRSxFQUFFLEVBQUUsc0JBQ0c7NkNBQVQsRUFBRTtJQUFBOytDQUNBLEVBQUU7SUFDakIsU0FBTztJQUNGLFFBQUEsTUFBTSxDQUFFLEVBQUUsRUFBRSxFQUFFLHNCQUNHO2dEQUFOLEVBQUU7SUFBQTt5Q0FDVDtHQUFBOzs7RUFFWCxlQUFXLE9BQUc7RUFDZCxlQUFXLE1BQU0sT0FDSSxVQUFBO1VBQXBCOztFQUVELFFBQU0sT0FBRztFQUVULGlDQUFRLGlCQUNNOztHQUFiLG9CQUFNO0dBQ04sc0JBQU07OztFQUVQLCtCQUFLLGlCQUNNOztHQUFWLG9CQUNDO0dBRUQsc0JBQ1EsZUFBQTtHQUNSLGdDQUNLOztrQkFBRDtrQkFDRCxDQUFHLFFBQU87OztHQUViLDZCQUFXLGtCQUFBLEVBQUUsTUFDSzs2QkFBWixFQUFFO0dBQUE7OztFQUVULCtCQUFLLGlCQUNNOztHQUFWLG9CQUNDO0dBRUQsZ0NBQ0s7O2tCQUFEO2tCQUNELENBQUcsV0FBVTs7O0dBQ2hCLHNCQUNRLGVBQUE7OztFQWhFVCx3QkFBQTtrQkFjQSIsImZpbGUiOiJhdC9hdGJhbmcuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==