"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../math/Number","../../Type/Kind","../../Type/Method","../at","../atbang","../at-Type","../q","./Seq","./Dequebang","../../bang","../../compare","../at","./Arraybang","./Seq"],function(exports,Number_0,Kind_1,Method_2,_64_3,_64_33_4,_64_45Type_5,_63_6,Seq_7,Deque_33_8,_33_9,compare_10,_64_11,Array_33_12,Seq_13){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Number_0),Nat=_$2.Nat,Kind=_ms.getDefaultExport(Kind_1),_$3=_ms.getModule(Kind_1),kind_33=_$3["kind!"],self_45kind_33=_$3["self-kind!"],Method=_ms.getDefaultExport(Method_2),_64=_ms.getDefaultExport(_64_3),_64_33=_ms.getDefaultExport(_64_33_4),_64_45Type=_ms.getDefaultExport(_64_45Type_5),_$7=_ms.getModule(_64_45Type_5),empty=_$7.empty,_63=_ms.getDefaultExport(_63_6),Seq=_ms.getDefaultExport(Seq_7),Deque_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Deque_33_8)
		}),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_9)
		}),_$14=_ms.lazyGetModule(compare_10),_61_63=_ms.lazyProp(_$14,"=?"),_$15=_ms.lazyGetModule(_64_11),empty_63=_ms.lazyProp(_$15,"empty?"),Array_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Array_33_12)
		}),_$17=_ms.lazyGetModule(Seq_13),seq_61_63=_ms.lazyProp(_$17,"seq=?");
		const Seq_33=Kind(function(){
			const doc="Mutable Seq.\nArray!s can efficiently change existing elements and add new ones on the right.\nDeque!s are like Arrays, but can add new values on the left.";
			return {
				doc:doc,
				name:"Seq!"
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
			const doc="Makes `_` into `+ added _`.";
			const args=function(){
				const _0="_";
				const _1=["added",_64];
				return [_0,_1]
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
				const _0="_";
				const _1=["added",_64];
				return [_0,_1]
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
				const _0="_";
				const _1=["n",Nat];
				const _2="val";
				return [_0,_1,_2]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9TZXEhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0VBa0JBLGFBQU8sZUFDSTtHQUFWLFVBQ0M7Ozs7OztFQXFCRixlQUFXLE9BQUsscUJBQ007R0FBckIsVUFBQSxVQUNVLFVBQUE7V0FBVDs7OztFQUVGLFFBQU0sT0FBSztFQUNYLFFBQU0sT0FBSztFQUVYLG1DQUFNLGlCQUNNO0dBQVgsVUFBTTtHQUNOLHFCQUNLO0lBQUosU0FBRztJQUNILFNBQUUsQ0FBRyxRQUFPOzs7Ozs7Ozs7RUFDZCxtQ0FBTSxpQkFDTTtHQUFYLFVBQU07R0FDTixxQkFDSztJQUFKLFNBQUc7SUFDSCxTQUFFLENBQUcsUUFBTzs7Ozs7Ozs7O0VBRWQscUNBQVEsaUJBQ007R0FBYixVQUFNO0dBQ04sV0FBTTtHQUNOLGNBQVM7Ozs7Ozs7O0VBQ1YscUNBQVEsaUJBQ007R0FBYixVQUFNO0dBQ04sV0FBTTtHQUNOLGNBQVM7Ozs7Ozs7O0VBRVYsdUNBQVUsaUJBQ007R0FBZixVQUFNO0dBQ04scUJBQ0s7SUFBSixTQUFHO0lBQ0gsU0FBRSxDQUFHLElBQUc7SUFDUixTQUFHOzs7Ozs7Ozs7RUF6RUwsd0JBQUE7a0JBMkVBIiwiZmlsZSI6ImF0L1NlcS9TZXFiYW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=