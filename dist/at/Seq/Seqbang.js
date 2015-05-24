"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../math/Number","../../Type/Kind","../../Type/Method","../at","../atbang","../at-Type","../q","./Seq","./Dequebang","../../bang","../../compare","../at","./Arraybang","./Seq"],function(exports,Number_0,Kind_1,Method_2,_64_3,_64_33_4,_64_45Type_5,_63_6,Seq_7,Deque_33_8,_33_9,compare_10,_64_11,Array_33_12,Seq_13){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Number_0),Nat=_ms.get(_$2,"Nat"),Kind=_ms.getDefaultExport(Kind_1),_$3=_ms.getModule(Kind_1),kind_33=_ms.get(_$3,"kind!"),self_45kind_33=_ms.get(_$3,"self-kind!"),Method=_ms.getDefaultExport(Method_2),_64=_ms.getDefaultExport(_64_3),_64_33=_ms.getDefaultExport(_64_33_4),_64_45Type=_ms.getDefaultExport(_64_45Type_5),_$7=_ms.getModule(_64_45Type_5),empty=_ms.get(_$7,"empty"),_63=_ms.getDefaultExport(_63_6),Seq=_ms.getDefaultExport(Seq_7),Deque_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Deque_33_8)
		}),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_9)
		}),_$14=_ms.lazyGetModule(compare_10),_61_63=_ms.lazyProp(_$14,"=?"),_$15=_ms.lazyGetModule(_64_11),empty_63=_ms.lazyProp(_$15,"empty?"),Array_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Array_33_12)
		}),_$17=_ms.lazyGetModule(Seq_13),seq_61_63=_ms.lazyProp(_$17,"seq=?");
		const Seq_33=Kind(function(){
			const doc="Mutable Seq.\nArray!s can efficiently change existing elements and add new ones on the right.\nDeque!s are like Arrays, but can add new values on the left.";
			const implementor_45test=function implementor_45test(type){
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
				_ms.unlazy(_33)(_ms.unlazy(_61_63),_63pop_62_33(_),_63(2));
				_ms.unlazy(_33)(_ms.unlazy(_61_63),_63_60pop_33(_),_63(- 2));
				_ms.unlazy(_33)(_ms.unlazy(_61_63),_63pop_62_33(_),_63(1));
				_ms.unlazy(_33)(_ms.unlazy(_61_63),_63_60pop_33(_),_63(- 1));
				_ms.unlazy(_33)(_ms.unlazy(_61_63),_63pop_62_33(_),empty(_63));
				_ms.unlazy(_33)(_ms.unlazy(empty_63),_);
				_43_43_62_33(_,[1,2,3])
			};
			return {
				doc:doc,
				"implementor-test":implementor_45test,
				name:"Seq!"
			}
		}());
		self_45kind_33(Seq_33,_64_45Type,function(){
			const built=new global.Map();
			_ms.assoc(built,empty,function(){
				return empty(_ms.unlazy(Deque_33))
			});
			return built
		}());
		kind_33(Seq_33,_64_33);
		kind_33(Seq_33,Seq);
		const _60_43_43_33=exports["<++!"]=Method(function(){
			const doc="Makes `_` into `+ added _`.";
			const args=function(){
				const built=[];
				_ms.add(built,"_");
				_ms.add(built,["added",_64]);
				return built
			}();
			return {
				doc:doc,
				args:args,
				name:"<++!"
			}
		}());
		const _43_43_62_33=exports["++>!"]=Method(function(){
			const doc="Makes `_` into `+ _ added`.";
			const args=function(){
				const built=[];
				_ms.add(built,"_");
				_ms.add(built,["added",_64]);
				return built
			}();
			return {
				doc:doc,
				args:args,
				name:"++>!"
			}
		}());
		const _63_60pop_33=exports["?<pop!"]=Method(function(){
			const doc="Takes one element off the left side, if not empty?.";
			const args=1;
			const returns=_63;
			return {
				doc:doc,
				args:args,
				returns:returns,
				name:"?<pop!"
			}
		}());
		const _63pop_62_33=exports["?pop>!"]=Method(function(){
			const doc="Takes one element off the right side, if not empty?.";
			const args=1;
			const returns=_63;
			return {
				doc:doc,
				args:args,
				returns:returns,
				name:"?pop>!"
			}
		}());
		const set_45nth_33=exports["set-nth!"]=Method(function(){
			const doc="Makes `_[n]` be `val`.";
			const args=function(){
				const built=[];
				_ms.add(built,"_");
				_ms.add(built,["n",Nat]);
				_ms.add(built,"val");
				return built
			}();
			return {
				doc:doc,
				args:args,
				name:"set-nth!"
			}
		}());
		const name=exports.name="Seq!";
		exports.default=Seq_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9TZXEhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0VBa0JBLGFBQU8sZUFDSTtHQUFWLFVBQ0M7R0FHRCx5QkFBb0IsNEJBQUEsS0FDSTtJQUN2QjtLQUFTLFFBQUE7S0FDUiwrQkFBRyxFQUFFLFFBQ0s7YUFBVDtZQUVHO2FBQUgsTUFBTTtLQUFBO0lBQUE7SUFDUixhQUFLLEVBQUUsQ0FBRSxFQUFFO0lBQ1gsYUFBSyxFQUFFLENBQUUsSUFBRzswQ0FDSixFQUFFLENBQUUsSUFBRyxJQUFHLEVBQUU7dUNBQ2YsYUFBTSxHQUFHLElBQUU7dUNBQ1gsYUFBTSxHQUFHLElBQUU7dUNBQ1gsYUFBTSxHQUFHLElBQUU7dUNBQ1gsYUFBTSxHQUFHLElBQUU7dUNBQ1gsYUFBTSxHQUFHLE1BQU07eUNBQ1g7SUFDVCxhQUFLLEVBQUUsQ0FBRSxFQUFFLEVBQUU7R0FBQTs7Ozs7OztFQUVmLGVBQVcsT0FBSyxxQkFDTTs7bUJBQXJCLE1BQ1UsVUFBQTtXQUFUOzs7O0VBRUYsUUFBTSxPQUFLO0VBQ1gsUUFBTSxPQUFLO0VBRVgsbUNBQU0saUJBQ007R0FBWCxVQUFNO0dBQ04scUJBQ0s7O2tCQUFEO2tCQUNELENBQUcsUUFBTzs7Ozs7Ozs7O0VBQ2QsbUNBQU0saUJBQ007R0FBWCxVQUFNO0dBQ04scUJBQ0s7O2tCQUFEO2tCQUNELENBQUcsUUFBTzs7Ozs7Ozs7O0VBRWQscUNBQVEsaUJBQ007R0FBYixVQUFNO0dBQ04sV0FBTTtHQUNOLGNBQVM7Ozs7Ozs7O0VBQ1YscUNBQVEsaUJBQ007R0FBYixVQUFNO0dBQ04sV0FBTTtHQUNOLGNBQVM7Ozs7Ozs7O0VBRVYsdUNBQVUsaUJBQ007R0FBZixVQUFNO0dBQ04scUJBQ0s7O2tCQUFEO2tCQUNELENBQUcsSUFBRztrQkFDTDs7Ozs7Ozs7O0VBekVMLHdCQUFBO2tCQTJFQSIsImZpbGUiOiJhdC9TZXEvU2VxYmFuZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9