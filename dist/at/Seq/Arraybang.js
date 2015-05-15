"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Boolean","../../control","../../js","../../math/Number","../../methods","../../Type/Kind","../../Type/Pred-Type","../../Type/Type","../at","../atbang","../at-Type","./Seqbang"],function(exports,Boolean_0,control_1,js_2,Number_3,methods_4,Kind_5,Pred_45Type_6,Type_7,_64_8,_64_33_9,_64_45Type_10,Seq_33_11){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_ms.get(_$2,"and"),not=_ms.get(_$2,"not"),_$3=_ms.getModule(control_1),_if=_ms.get(_$3,"if"),opr=_ms.get(_$3,"opr"),_$4=_ms.getModule(js_2),js_45set=_ms.get(_$4,"js-set"),_$5=_ms.getModule(Number_3),Nat=_ms.get(_$5,"Nat"),_$6=_ms.getModule(methods_4),frozen_63=_ms.get(_$6,"frozen?"),_$7=_ms.getModule(Kind_5),kind_33=_ms.get(_$7,"kind!"),self_45kind_33=_ms.get(_$7,"self-kind!"),Pred_45Type=_ms.getDefaultExport(Pred_45Type_6),_$9=_ms.getModule(Type_7),_61_62=_ms.get(_$9,"=>"),_64=_ms.getDefaultExport(_64_8),_$10=_ms.getModule(_64_8),each_33=_ms.get(_$10,"each!"),empty_63=_ms.get(_$10,"empty?"),_$11=_ms.getModule(_64_33_9),empty_33=_ms.get(_$11,"empty!"),_64_45Type=_ms.getDefaultExport(_64_45Type_10),_$12=_ms.getModule(_64_45Type_10),empty=_ms.get(_$12,"empty"),from_45stream=_ms.get(_$12,"from-stream"),Seq_33=_ms.getDefaultExport(Seq_33_11),_$13=_ms.getModule(Seq_33_11),_60_43_43_33=_ms.get(_$13,"<++!"),_43_43_62_33=_ms.get(_$13,"++>!"),_63_60pop_33=_ms.get(_$13,"?<pop!"),_63pop_62_33=_ms.get(_$13,"?pop>!"),set_45nth_33=_ms.get(_$13,"set-nth!");
		const Array_33=Pred_45Type(function(){
			const doc="TODO:MORE\nUnlike Deque!, pushing and popping elements from the left side is expensive.";
			const predicate=function(){
				return _ms.set(function(_){
					return and(_ms.contains(Array,_),_ms.lazy(function(){
						return not(frozen_63(_))
					}))
				},"displayName","predicate")
			}();
			return {
				doc:doc,
				predicate:predicate,
				displayName:"Array!"
			}
		}());
		self_45kind_33(Array_33,_64_45Type,function(){
			const _k0=empty,_v0=function(_63initial_45size){
				const initial_45size=opr(_63initial_45size,0);
				return Array(initial_45size)
			};
			const _k1=from_45stream,_v1=function(_){
				const arr=Array(0);
				each_33(_,function(em){
					return arr.push(em)
				});
				return arr
			};
			return _ms.map(_k0,_v0,_k1,_v1)
		}());
		kind_33(Array,Seq_33,function(){
			const _k0=_60_43_43_33,_v0=function(_,added){
				_ms.checkContains(_64,added,"added");
				return Array.prototype.unshift.apply(_,_61_62(Array,added))
			};
			const _k1=_43_43_62_33,_v1=function(_,added){
				return Array.prototype.push.apply(_,_61_62(Array,added))
			};
			const _k2=_63_60pop_33,_v2=function(_){
				return _if(not(empty_63(_)),_ms.lazy(function(){
					return _.shift()
				}))
			};
			const _k3=_63pop_62_33,_v3=function(_){
				return _if(not(empty_63(_)),_ms.lazy(function(){
					return _.pop()
				}))
			};
			const _k4=empty_33,_v4=function(_){
				loop46:while(true){
					if(_ms.bool(empty_63(_))){
						break loop46
					} else {
						_.pop()
					}
				}
			};
			const _k5=set_45nth_33,_v5=function(_,n,val){
				_ms.checkContains(Nat,n,"n");
				return js_45set(_,n,val)
			};
			return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3,_k4,_v4,_k5,_v5)
		}());
		const displayName=exports.displayName="Array!";
		exports.default=Array_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9BcnJheSEubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFjQSxlQUFTLHNCQUNTO0dBQWpCLFVBQ0M7R0FFRCwwQkFBWTttQkFBQSxTQUFBLEVBQ0M7WUFBWixpQkFBSyxNQUFEO2FBQVMsSUFBSSxVQUFBO0tBQUE7SUFBQTs7Ozs7Ozs7RUFFbkIsZUFBVyxTQUFPLHFCQUNNO0dBQXZCLFVBQUEsVUFBVSxTQUFBLGtCQUNhO0lBQXRCLHFCQUFlLElBQUksa0JBQWM7V0FDakMsTUFBTTtHQUFBO0dBQ1AsVUFBQSxrQkFBZ0IsU0FBQSxFQUNDO0lBQWhCLFVBQU0sTUFBTTtJQUNaLFFBQU0sRUFBRyxTQUFBLEdBQ0U7WUFBVixTQUFTO0lBQUE7V0FDVjtHQUFBOzs7RUFHRixRQUFNLE1BQU0saUJBQ0k7R0FBZixVQUFBLGlCQUFTLFNBQUEsRUFBRSxNQUNPO3NCQUREO1dBRWhCLDhCQUE4QixFQUFHLE9BQUcsTUFBTTtHQUFBO0dBQzNDLFVBQUEsaUJBQVMsU0FBQSxFQUFFLE1BQ0s7V0FDZiwyQkFBMkIsRUFBRyxPQUFHLE1BQU07R0FBQTtHQUN4QyxVQUFBLGlCQUFXLFNBQUEsRUFDQztXQUFYLElBQUksSUFBSSxTQUFBO1lBQVU7OztHQUNuQixVQUFBLGlCQUFXLFNBQUEsRUFDQztXQUFYLElBQUksSUFBSSxTQUFBO1lBQVU7OztHQUNuQixVQUFBLGFBQVcsU0FBQSxFQUNDO3NCQUVOO0tBQ0MsWUFBSixTQUFBLElBQ087TUFBTjtZQUVHO01BQUg7Ozs7R0FDSixVQUFBLGlCQUFhLFNBQUEsRUFBRSxFQUFNLElBQ0c7c0JBRFA7V0FDaEIsU0FBTyxFQUFFLEVBQUU7R0FBQTs7O0VBcERiLHNDQUFBO2tCQXNEQSIsImZpbGUiOiJhdC9TZXEvQXJyYXliYW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=