"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../Type/Type","../../Type/Kind","../../Type/Method","../at","../at-Type","./Hash-Setbang","../at"],function(exports,compare_0,Type_1,Kind_2,Method_3,_64_4,_64_45Type_5,Hash_45Set_33_6,_64_7){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),same_63=_ms.get(_$2,"same?"),_$3=_ms.getModule(Type_1),_61_62=_ms.get(_$3,"=>"),contains_63=_ms.get(_$3,"contains?"),type_45of=_ms.get(_$3,"type-of"),Kind=_ms.getDefaultExport(Kind_2),_$4=_ms.getModule(Kind_2),kind_33=_ms.get(_$4,"kind!"),self_45kind_33=_ms.get(_$4,"self-kind!"),Method=_ms.getDefaultExport(Method_3),_$5=_ms.getModule(Method_3),impl_33=_ms.get(_$5,"impl!"),_64=_ms.getDefaultExport(_64_4),_$6=_ms.getModule(_64_4),all_63=_ms.get(_$6,"all?"),count=_ms.get(_$6,"count"),keep=_ms.get(_$6,"keep"),_64_45Type=_ms.getDefaultExport(_64_45Type_5),_$7=_ms.getModule(_64_45Type_5),empty=_ms.get(_$7,"empty"),from_45stream=_ms.get(_$7,"from-stream"),Hash_45Set_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Hash_45Set_33_6)
		}),_$11=_ms.lazyGetModule(_64_7),_45_45=_ms.lazyProp(_$11,"--");
		const Set=Kind(function(){
			const built={};
			const doc=built.doc=`@ without repeat values.`;
			return _ms.setName(built,"Set")
		}());
		self_45kind_33(Set,_64_45Type,function(){
			const built=new global.Map();
			_ms.assoc(built,empty,function(){
				return empty(_ms.unlazy(Hash_45Set_33))
			});
			_ms.assoc(built,from_45stream,function(_){
				return from_45stream(_ms.unlazy(Hash_45Set_33),_)
			});
			return built
		}());
		kind_33(Set,_64);
		impl_33(_61_63,Set,function(){
			const built={};
			const doc=built.doc=`Two Sets are =? if they have the same type and contain the same values.`;
			const test=built.test=function test(){
				const built=new global.Map();
				const a=_61_62(Set,[1,2]);
				const b=_61_62(Set,[1,2]);
				_ms.assoc(built,[a,b],true);
				_ms.assoc(built,[a,[_ms.unlazy(_45_45),b,[1]]],false);
				return built
			};
			return _ms.set(function(a,b){
				return ((same_63(type_45of,a,b)&&same_63(count,a,b))&&all_63(a,_ms.sub(contains_63,b)))
			},built)
		}());
		const set_61_63=exports["set=?"]=function(){
			const built={};
			const doc=built.doc=`Whether two @s have the same values, regardless of order or count.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[1,2,3],[3,2,1]],true);
				_ms.assoc(built,[[1],[1,1,1]],true);
				_ms.assoc(built,[[1,2],[1,2,3]],false);
				return built
			};
			return _ms.set(function set_61_63(a,b){
				_ms.checkContains(_64,a,"a");
				_ms.checkContains(_64,b,"b");
				return _61_63(_61_62(Set,a),_61_62(Set,b))
			},built)
		}();
		const intersect=exports.intersect=Method(function(){
			const built={};
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[_61_62(Set,[1,2]),_61_62(Set,[2,3])],_61_62(Set,[2]));
				return built
			};
			const args=built.args=2;
			const _default=built.default=function _default(a,b){
				return keep(a,_ms.sub(contains_63,_61_62(Set,b)))
			};
			return _ms.setName(built,"intersect")
		}());
		const name=exports.name=`Set`;
		exports.default=Set;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NldC9TZXQubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQVlBLFVBQUssZUFDSTs7R0FBUixvQkFBTTs7O0VBRVAsZUFBVyxJQUFJLHFCQUNNOzttQkFBcEIsTUFDVSxVQUFBO1dBQVQ7O21CQUNELGNBQWdCLFNBQUEsRUFDQztXQUFoQix3Q0FBc0I7R0FBQTs7O0VBQ3hCLFFBQU0sSUFBSTtFQUVWLFFBQU0sT0FBRyxjQUNHOztHQUFYLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7SUFBTixRQUFJLE9BQUcsSUFBSSxDQUFFLEVBQUU7SUFDZixRQUFJLE9BQUcsSUFBSSxDQUFFLEVBQUU7b0JBQ2YsQ0FBRSxFQUFFLEdBQU87b0JBQ1gsQ0FBRSxFQUFFLG9CQUFLLEVBQUUsQ0FBRSxLQUFXOzs7a0JBQ3hCLFNBQUEsRUFBRSxFQUNDO1dBQUgsRUFBSyxRQUFNLFVBQVEsRUFBRSxJQUFJLFFBQU0sTUFBTSxFQUFFLEtBQUksT0FBSyxVQUFFLFlBQVU7R0FBQTs7RUFFOUQsMkNBQ007O0dBQUwsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFFLENBQUUsRUFBRSxFQUFFLEdBQUksQ0FBRSxFQUFFLEVBQUUsSUFBUztvQkFDM0IsQ0FBRSxDQUFFLEdBQUksQ0FBRSxFQUFFLEVBQUUsSUFBUztvQkFDdkIsQ0FBRSxDQUFFLEVBQUUsR0FBSSxDQUFFLEVBQUUsRUFBRSxJQUFTOzs7a0JBQ3pCLG1CQUFBLEVBQUksRUFDRztzQkFETDtzQkFBSTtXQUNOLE9BQUksT0FBRyxJQUFJLEdBQUksT0FBRyxJQUFJO0dBQUE7O0VBRXhCLGtDQUFXLGlCQUNNOztHQUFoQixvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUcsT0FBRyxJQUFJLENBQUUsRUFBRSxJQUFNLE9BQUcsSUFBSSxDQUFFLEVBQUUsS0FBVSxPQUFHLElBQUksQ0FBRTs7O0dBQ25ELHNCQUFNO0dBQ04sNkJBQVUsa0JBQUEsRUFBRSxFQUNDO1dBQVosS0FBSyxVQUFFLFlBQVcsT0FBRyxJQUFJO0dBQUE7OztFQS9DM0Isd0JBQUE7a0JBWUEiLCJmaWxlIjoiYXQvU2V0L1NldC5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9