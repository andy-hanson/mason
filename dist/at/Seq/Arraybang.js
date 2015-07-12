"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Boolean","../../control","../../js","../../math/Number","../../methods","../../Type/Kind","../../Type/Pred-Type","../../Type/Type","../at","../atbang","../at-Type","./Seqbang"],function(exports,Boolean_0,control_1,js_2,Number_3,methods_4,Kind_5,Pred_45Type_6,Type_7,_64_8,_64_33_9,_64_45Type_10,Seq_33_11){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_ms.get(_$2,"and"),not=_ms.get(_$2,"not"),_$3=_ms.getModule(control_1),opr=_ms.get(_$3,"opr"),_$4=_ms.getModule(js_2),js_45set=_ms.get(_$4,"js-set"),_$5=_ms.getModule(Number_3),Nat=_ms.get(_$5,"Nat"),_$6=_ms.getModule(methods_4),frozen_63=_ms.get(_$6,"frozen?"),_$7=_ms.getModule(Kind_5),kind_33=_ms.get(_$7,"kind!"),self_45kind_33=_ms.get(_$7,"self-kind!"),Pred_45Type=_ms.getDefaultExport(Pred_45Type_6),_$9=_ms.getModule(Type_7),_61_62=_ms.get(_$9,"=>"),_64=_ms.getDefaultExport(_64_8),_$10=_ms.getModule(_64_8),empty_63=_ms.get(_$10,"empty?"),_$11=_ms.getModule(_64_33_9),empty_33=_ms.get(_$11,"empty!"),_64_45Type=_ms.getDefaultExport(_64_45Type_10),_$12=_ms.getModule(_64_45Type_10),empty=_ms.get(_$12,"empty"),from_45stream=_ms.get(_$12,"from-stream"),Seq_33=_ms.getDefaultExport(Seq_33_11),_$13=_ms.getModule(Seq_33_11),_60_43_43_33=_ms.get(_$13,"<++!"),_43_43_62_33=_ms.get(_$13,"++>!"),_63_60pop_33=_ms.get(_$13,"?<pop!"),_63pop_62_33=_ms.get(_$13,"?pop>!"),set_45nth_33=_ms.get(_$13,"set-nth!");
		const Array_33=Pred_45Type(function(){
			const built={};
			const doc=built.doc=`TODO:MORE\nUnlike Deque!, pushing and popping elements from the left side is expensive.`;
			const predicate=built.predicate=function predicate(_){
				return and(_ms.contains(Array,_),_ms.lazy(function(){
					return not(frozen_63(_))
				}))
			};
			return _ms.setName(built,"Array!")
		}());
		self_45kind_33(Array_33,_64_45Type,function(){
			const built=new global.Map();
			_ms.assoc(built,empty,function(initial_45size){
				return Array(opr(initial_45size,0))
			});
			_ms.assoc(built,from_45stream,function(stream){
				const arr=Array(0);
				for(let _ of stream){
					arr.push(_)
				};
				return arr
			});
			return built
		}());
		kind_33(Array,Seq_33,function(){
			const built=new global.Map();
			_ms.assoc(built,_60_43_43_33,function(_,added){
				_ms.checkContains(_64,added,"added");
				Array.prototype.unshift.apply(_,_61_62(Array,added))
			});
			_ms.assoc(built,_43_43_62_33,function(_,added){
				Array.prototype.push.apply(_,_61_62(Array,added))
			});
			_ms.assoc(built,_63_60pop_33,function(_){
				return _ms.bool(not(empty_63(_)))?_ms.some(function(){
					return _.shift()
				}()):_ms.None
			});
			_ms.assoc(built,_63pop_62_33,function(_){
				return _ms.bool(not(empty_63(_)))?_ms.some(function(){
					return _.pop()
				}()):_ms.None
			});
			_ms.assoc(built,empty_33,function(_){
				for(;;){
					if(empty_63(_)){
						break
					};
					_.pop()
				}
			});
			_ms.assoc(built,set_45nth_33,function(_,n,val){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9BcnJheSEubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFjQSxlQUFRLHNCQUNTOztHQUFoQixvQkFDQztHQUVELGdDQUFZLG1CQUFBLEVBQ0M7V0FBWixpQkFBSyxNQUFEO1lBQVMsSUFBSSxVQUFPO0lBQUE7R0FBQTs7O0VBRTFCLGVBQVcsU0FBTyxxQkFDTTs7bUJBQXZCLE1BQVUsU0FBQSxlQUNZO1dBQXJCLE1BQU8sSUFBSSxlQUFhO0dBQUE7bUJBRXpCLGNBQWdCLFNBQUEsT0FDTTtJQUFyQixVQUFNLE1BQU07SUFDUCxRQUFBLEtBQUEsT0FDTTtLQUFWLFNBQVM7SUFBQTtXQUNWO0dBQUE7OztFQUdGLFFBQU0sTUFBTSxpQkFDSTs7bUJBQWYsYUFBVSxTQUFBLEVBQUUsTUFDTztzQkFERDtJQUVqQiw4QkFBOEIsRUFBRyxPQUFHLE1BQU07R0FBQTttQkFDM0MsYUFBVSxTQUFBLEVBQUUsTUFDSztJQUNoQiwyQkFBMkIsRUFBRyxPQUFHLE1BQU07R0FBQTttQkFDeEMsYUFBVyxTQUFBLEVBQ0M7b0JBQVIsSUFBSSxTQUFNLHdCQUNDO1lBQWI7OzttQkFDRixhQUFXLFNBQUEsRUFDQztvQkFBUixJQUFJLFNBQU0sd0JBQ0M7WUFBYjs7O21CQUNGLFNBQVksU0FBQSxFQUNDO0lBR1IsT0FBQTtLQUFILEdBQUksU0FBTSxHQUNDO01BQVY7S0FBQTtLQUNEOzs7bUJBQ0YsYUFBYyxTQUFBLEVBQUUsRUFBTSxJQUNHO3NCQURQO0lBQ2pCLFNBQU8sRUFBRSxFQUFFO0dBQUE7OztFQXJEYix3QkFBQTtrQkFjQSIsImZpbGUiOiJhdC9TZXEvQXJyYXliYW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=