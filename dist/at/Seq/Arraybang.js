"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../control","../../js","../../math/Number","../../methods","../../Type/Kind","../../Type/Pred-Type","../../Type/Type","../at","../atbang","../at-Type","./Seqbang"],(exports,control_0,js_1,Number_2,methods_3,Kind_4,Pred_45Type_5,Type_6,_64_7,_64_33_8,_64_45Type_9,Seq_33_10)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(control_0),opr=_ms.get(_$2,"opr"),_$3=_ms.getModule(js_1),js_45set=_ms.get(_$3,"js-set"),_$4=_ms.getModule(Number_2),Nat=_ms.get(_$4,"Nat"),_$5=_ms.getModule(methods_3),frozen_63=_ms.get(_$5,"frozen?"),_$6=_ms.getModule(Kind_4),kind_33=_ms.get(_$6,"kind!"),self_45kind_33=_ms.get(_$6,"self-kind!"),Pred_45Type=_ms.getDefaultExport(Pred_45Type_5),_$8=_ms.getModule(Type_6),_61_62=_ms.get(_$8,"=>"),_64=_ms.getDefaultExport(_64_7),_$9=_ms.getModule(_64_7),empty_63=_ms.get(_$9,"empty?"),_$10=_ms.getModule(_64_33_8),empty_33=_ms.get(_$10,"empty!"),_64_45Type=_ms.getDefaultExport(_64_45Type_9),_$11=_ms.getModule(_64_45Type_9),empty=_ms.get(_$11,"empty"),from_45stream=_ms.get(_$11,"from-stream"),Seq_33=_ms.getDefaultExport(Seq_33_10),_$12=_ms.getModule(Seq_33_10),_60_43_43_33=_ms.get(_$12,"<++!"),_43_43_62_33=_ms.get(_$12,"++>!"),_63_60pop_33=_ms.get(_$12,"?<pop!"),_63pop_62_33=_ms.get(_$12,"?pop>!"),set_45nth_33=_ms.get(_$12,"set-nth!");
		const Array_33=Pred_45Type(()=>{
			const built={};
			const doc=built.doc=`TODO:MORE\nUnlike Deque!, pushing and popping elements from the left side is expensive.`;
			const predicate=built.predicate=function predicate(_){
				return (_ms.contains(Array,_)&&! frozen_63(_))
			};
			return _ms.setName(built,"Array!")
		}());
		self_45kind_33(Array_33,_64_45Type,()=>{
			const built=new global.Map();
			_ms.assoc(built,empty,initial_45size=>{
				return Array(opr(initial_45size,0))
			});
			_ms.assoc(built,from_45stream,stream=>{
				const arr=Array(0);
				for(let _ of stream){
					arr.push(_)
				};
				return arr
			});
			return built
		}());
		kind_33(Array,Seq_33,()=>{
			const built=new global.Map();
			_ms.assoc(built,_60_43_43_33,(_,added)=>{
				_ms.checkContains(_64,added,"added");
				Array.prototype.unshift.apply(_,_61_62(Array,added))
			});
			_ms.assoc(built,_43_43_62_33,(_,added)=>{
				Array.prototype.push.apply(_,_61_62(Array,added))
			});
			_ms.assoc(built,_63_60pop_33,_=>{
				return _ms.bool(empty_63(_))?_ms.None:_ms.some(()=>{
					return _.shift()
				}())
			});
			_ms.assoc(built,_63pop_62_33,_=>{
				return _ms.bool(empty_63(_))?_ms.None:_ms.some(()=>{
					return _.pop()
				}())
			});
			_ms.assoc(built,empty_33,_=>{
				for(;;){
					if(empty_63(_)){
						break
					};
					_.pop()
				}
			});
			_ms.assoc(built,set_45nth_33,(_,n,val)=>{
				_ms.checkContains(Nat,n,"n");
				js_45set(_,n,val)
			});
			return built
		}());
		const name=exports.name=`Array!`;
		exports.default=Array_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9BcnJheSEubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFhQSxlQUFRLGdCQUNTOztHQUFoQixvQkFDQztHQUVELGdDQUFZLG1CQUFBLEVBQ0M7V0FBWixjQUFLLE1BQUQsSUFBUSxFQUFJLFVBQU87R0FBQTs7O0VBRXpCLGVBQVcsU0FBTyxlQUNNOzttQkFBdkIsTUFBVSxnQkFDWTtXQUFyQixNQUFPLElBQUksZUFBYTtHQUFBO21CQUV6QixjQUFnQixRQUNNO0lBQXJCLFVBQU0sTUFBTTtJQUNQLFFBQUEsS0FBQSxPQUNNO0tBQVYsU0FBUztJQUFBO1dBQ1Y7R0FBQTs7O0VBR0YsUUFBTSxNQUFNLFdBQ0k7O21CQUFmLGFBQVUsQ0FBQSxFQUFFLFFBQ087c0JBREQ7SUFFakIsOEJBQThCLEVBQUcsT0FBRyxNQUFNO0dBQUE7bUJBQzNDLGFBQVUsQ0FBQSxFQUFFLFFBQ0s7SUFDaEIsMkJBQTJCLEVBQUcsT0FBRyxNQUFNO0dBQUE7bUJBQ3hDLGFBQVcsR0FDQztvQkFBSixTQUFNLDBCQUNDO1lBQWI7OzttQkFDRixhQUFXLEdBQ0M7b0JBQUosU0FBTSwwQkFDQztZQUFiOzs7bUJBQ0YsU0FBWSxHQUNDO0lBR1IsT0FBQTtLQUFILEdBQUksU0FBTSxHQUNDO01BQVY7S0FBQTtLQUNEOzs7bUJBQ0YsYUFBYyxDQUFBLEVBQUUsRUFBTSxNQUNHO3NCQURQO0lBQ2pCLFNBQU8sRUFBRSxFQUFFO0dBQUE7OztFQXBEYix3QkFBQTtrQkFhQSIsImZpbGUiOiJhdC9TZXEvQXJyYXliYW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=