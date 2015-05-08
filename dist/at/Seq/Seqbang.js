"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../math/Num","../../Type/Kind","../../Type/Method","../at","../atbang","../at-Type","../q","./Seq","./Dequebang","../../bang","../../compare","../at","./Arraybang","./Seq"],function(exports,Num_0,Kind_1,Method_2,_64_3,_64_33_4,_64_45Type_5,_63_6,Seq_7,Deque_33_8,_33_9,compare_10,_64_11,Array_33_12,Seq_13){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Num_0),Nat=_ms.get(_$2,"Nat"),Kind=_ms.getDefaultExport(Kind_1),_$3=_ms.getModule(Kind_1),kind_33=_ms.get(_$3,"kind!"),self_45kind_33=_ms.get(_$3,"self-kind!"),Method=_ms.getDefaultExport(Method_2),_64=_ms.getDefaultExport(_64_3),_64_33=_ms.getDefaultExport(_64_33_4),_64_45Type=_ms.getDefaultExport(_64_45Type_5),_$7=_ms.getModule(_64_45Type_5),empty=_ms.get(_$7,"empty"),_63=_ms.getDefaultExport(_63_6),Seq=_ms.getDefaultExport(Seq_7),Deque_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Deque_33_8)
		}),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_9)
		}),_$14=_ms.lazyGetModule(compare_10),_61_63=_ms.lazyProp(_$14,"=?"),_$15=_ms.lazyGetModule(_64_11),empty_63=_ms.lazyProp(_$15,"empty?"),Array_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Array_33_12)
		}),_$17=_ms.lazyGetModule(Seq_13),seq_61_63=_ms.lazyProp(_$17,"seq=?");
		const exports={};
		const Seq_33=Kind(function(){
			const doc="Mutable Seq.\nArray!s can efficiently change existing elements and add new ones on the right.\nDeque!s are like Arrays, but can add new values on the left.";
			const implementor_45test=function(type){
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
				return _43_43_62_33(_,[1,2,3])
			};
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
			const doc=function(_,added){
				_ms.checkContains(_64,added,"added");
				return "Makes `_` into `+ added _`."
			};
			return {
				doc:doc,
				displayName:"<++!"
			}
		}());
		const _43_43_62_33=exports["++>!"]=Method(function(){
			const doc=function(_,added){
				_ms.checkContains(_64,added,"added");
				return "Makes `_` into `+ _ added`."
			};
			return {
				doc:doc,
				displayName:"++>!"
			}
		}());
		const _63_60pop_33=exports["?<pop!"]=Method(function(){
			const doc=function(_){
				return _ms.checkContains(_63,"Takes one element off the left side, if not empty?.","res")
			};
			return {
				doc:doc,
				displayName:"?<pop!"
			}
		}());
		const _63pop_62_33=exports["?pop>!"]=Method(function(){
			const doc=function(_){
				return _ms.checkContains(_63,"Takes one element off the right side, if not empty?.","res")
			};
			return {
				doc:doc,
				displayName:"?pop>!"
			}
		}());
		const set_45nth_33=exports["set-nth!"]=Method(function(){
			const doc=function(_,n,val){
				_ms.checkContains(Nat,n,"n");
				return "Makes `_[n]` be `val`."
			};
			return {
				doc:doc,
				displayName:"set-nth!"
			}
		}());
		exports.default=Seq_33;
		const displayName=exports.displayName="Seq!";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9TZXEhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztpQ0FrQkE7Ozs7Ozs7OztFQUFBLGFBQU8sZUFBSTtHQUNWLFVBQ0M7R0FHRCx5QkFBbUIsU0FBQSxLQUVsQjtJQUFBO0tBQVMsUUFBQTtLQUNSLCtCQUFHLEVBQUgsUUFBVTthQUNUO1lBQ0c7YUFDSCxNQUFBO0tBQUE7SUFBQTtJQUNGLGFBQUssRUFBRSxDQUFFLEVBQUU7SUFDWCxhQUFLLEVBQUUsQ0FBRSxJQUFHOzBDQUNKLEVBQUUsQ0FBRSxJQUFHLElBQUcsRUFBRTt1Q0FDcEIsYUFBSyxHQUFRLElBQUc7dUNBQ2hCLGFBQUssR0FBUSxJQUFHO3VDQUNoQixhQUFLLEdBQVEsSUFBRzt1Q0FDaEIsYUFBSyxHQUFRLElBQUc7dUNBQ2hCLGFBQUssR0FBUSxNQUFBO3lDQUNKO1dBQ1QsYUFBSyxFQUFFLENBQUUsRUFBRSxFQUFFO0dBQUE7VUFyQko7Ozs7OztFQXVCWCxlQUFBLE9BQUEscUJBQXNCO0dBQ3JCLFVBQUEsVUFBVSxVQUNUO1dBQUE7Ozs7RUFFRixRQUFBLE9BQUE7RUFDQSxRQUFBLE9BQUE7RUFFQSxtQ0FBTSxpQkFBTTtHQUNYLFVBQU0sU0FBQSxFQUFFLE1BQ1A7c0JBRGE7V0FDWjtHQUFBO1VBRlM7Ozs7O0VBSVosbUNBQU0saUJBQU07R0FDWCxVQUFNLFNBQUEsRUFBRSxNQUNQO3NCQURhO1dBQ1o7R0FBQTtVQUZTOzs7OztFQUlaLHFDQUFRLGlCQUFNO0dBQ2IsVUFBTSxTQUFHLEVBQ1I7NkJBRE0sSUFDTDs7VUFGVzs7Ozs7RUFHZCxxQ0FBUSxpQkFBTTtHQUNiLFVBQU0sU0FBRyxFQUNSOzZCQURNLElBQ0w7O1VBRlc7Ozs7O0VBSWQsdUNBQVUsaUJBQU07R0FDZixVQUFNLFNBQUEsRUFBRSxFQUFNLElBQ2I7c0JBRFM7V0FDUjtHQUFBO1VBRmE7Ozs7O2tCQUloQjtFQW5FQSxzQ0FBQSIsImZpbGUiOiJhdC9TZXEvU2VxYmFuZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9