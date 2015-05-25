"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Boolean","../../compare","../../Type/Type","../../Type/Kind","../../Type/Method","../at","../at-Type","./Hash-Setbang","../at"],function(exports,Boolean_0,compare_1,Type_2,Kind_3,Method_4,_64_5,_64_45Type_6,Hash_45Set_33_7,_64_8){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_ms.get(_$2,"and"),_$3=_ms.getModule(compare_1),_61_63=_ms.get(_$3,"=?"),same_63=_ms.get(_$3,"same?"),_$4=_ms.getModule(Type_2),_61_62=_ms.get(_$4,"=>"),contains_63=_ms.get(_$4,"contains?"),type_45of=_ms.get(_$4,"type-of"),Kind=_ms.getDefaultExport(Kind_3),_$5=_ms.getModule(Kind_3),kind_33=_ms.get(_$5,"kind!"),self_45kind_33=_ms.get(_$5,"self-kind!"),Method=_ms.getDefaultExport(Method_4),_$6=_ms.getModule(Method_4),impl_33=_ms.get(_$6,"impl!"),_64=_ms.getDefaultExport(_64_5),_$7=_ms.getModule(_64_5),all_63=_ms.get(_$7,"all?"),count=_ms.get(_$7,"count"),keep=_ms.get(_$7,"keep"),_64_45Type=_ms.getDefaultExport(_64_45Type_6),_$8=_ms.getModule(_64_45Type_6),empty=_ms.get(_$8,"empty"),from_45stream=_ms.get(_$8,"from-stream"),Hash_45Set_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Hash_45Set_33_7)
		}),_$12=_ms.lazyGetModule(_64_8),_45_45=_ms.lazyProp(_$12,"--");
		const Set=Kind(function(){
			const built={};
			const doc=built.doc="@ without repeat values.";
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
			const doc=built.doc="Two Sets are =? if they have the same type and contain the same values.";
			const test=built.test=function test(){
				const built=new global.Map();
				const a=_61_62(Set,[1,2]);
				const b=_61_62(Set,[1,2]);
				_ms.assoc(built,[a,b],true);
				_ms.assoc(built,[a,[_ms.unlazy(_45_45),b,[1]]],false);
				return built
			};
			return _ms.set(function(a,b){
				return and(same_63(type_45of,a,b),_ms.lazy(function(){
					return same_63(count,a,b)
				}),_ms.lazy(function(){
					return all_63(a,_ms.sub(contains_63,b))
				}))
			},built)
		}());
		const set_61_63=exports["set=?"]=function(){
			const built={};
			const doc=built.doc="Whether two @s have the same values, regardless of order or count.";
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
			const doc=built.doc="TODO";
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
		const name=exports.name="Set";
		exports.default=Set;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NldC9TZXQubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQWFBLFVBQUssZUFDSTs7R0FBUixvQkFBTTs7O0VBRVAsZUFBVyxJQUFJLHFCQUNNOzttQkFBcEIsTUFDVSxVQUFBO1dBQVQ7O21CQUNELGNBQWdCLFNBQUEsRUFDQztXQUFoQix3Q0FBc0I7R0FBQTs7O0VBQ3hCLFFBQU0sSUFBSTtFQUVWLFFBQU0sT0FBRyxjQUNHOztHQUFYLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7SUFBTixRQUFJLE9BQUcsSUFBSSxDQUFFLEVBQUU7SUFDZixRQUFJLE9BQUcsSUFBSSxDQUFFLEVBQUU7b0JBQ2YsQ0FBRSxFQUFFLEdBQU87b0JBQ1gsQ0FBRSxFQUFFLG9CQUFLLEVBQUUsQ0FBRSxLQUFXOzs7a0JBQ3hCLFNBQUEsRUFBRSxFQUNDO1dBQUgsSUFBSyxRQUFNLFVBQVEsRUFBRTtZQUFLLFFBQU0sTUFBTSxFQUFFO0lBQUE7WUFBSyxPQUFLLFVBQUUsWUFBVTtJQUFBO0dBQUE7O0VBRWhFLDJDQUNNOztHQUFMLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxDQUFFLEVBQUUsRUFBRSxHQUFJLENBQUUsRUFBRSxFQUFFLElBQVM7b0JBQzNCLENBQUUsQ0FBRSxHQUFJLENBQUUsRUFBRSxFQUFFLElBQVM7b0JBQ3ZCLENBQUUsQ0FBRSxFQUFFLEdBQUksQ0FBRSxFQUFFLEVBQUUsSUFBUzs7O2tCQUN6QixtQkFBQSxFQUFJLEVBQ0c7c0JBREw7c0JBQUk7V0FDTixPQUFJLE9BQUcsSUFBSSxHQUFJLE9BQUcsSUFBSTtHQUFBOztFQUV4QixrQ0FBVyxpQkFDTTs7R0FBaEIsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFHLE9BQUcsSUFBSSxDQUFFLEVBQUUsSUFBTSxPQUFHLElBQUksQ0FBRSxFQUFFLEtBQVUsT0FBRyxJQUFJLENBQUU7OztHQUNuRCxzQkFBTTtHQUNOLDZCQUFVLGtCQUFBLEVBQUUsRUFDQztXQUFaLEtBQUssVUFBRSxZQUFXLE9BQUcsSUFBSTtHQUFBOzs7RUFoRDNCLHdCQUFBO2tCQWFBIiwiZmlsZSI6ImF0L1NldC9TZXQuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==