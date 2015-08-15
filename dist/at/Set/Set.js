"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../Type/Type","../../Type/Kind","../../Type/Method","../at","../at-Type","./Hash-Set","../at"],(exports,compare_0,Type_1,Kind_2,Method_3,_64_4,_64_45Type_5,Hash_45Set_6,_64_7)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),same_63=_ms.get(_$2,"same?"),_$3=_ms.getModule(Type_1),_61_62=_ms.get(_$3,"=>"),contains_63=_ms.get(_$3,"contains?"),type_45of=_ms.get(_$3,"type-of"),Kind=_ms.getDefaultExport(Kind_2),_$4=_ms.getModule(Kind_2),kind_33=_ms.get(_$4,"kind!"),self_45kind_33=_ms.get(_$4,"self-kind!"),Method=_ms.getDefaultExport(Method_3),_$5=_ms.getModule(Method_3),impl_33=_ms.get(_$5,"impl!"),self_45impl_33=_ms.get(_$5,"self-impl!"),_64=_ms.getDefaultExport(_64_4),_$6=_ms.getModule(_64_4),all_63=_ms.get(_$6,"all?"),count=_ms.get(_$6,"count"),keep=_ms.get(_$6,"keep"),_64_45Type=_ms.getDefaultExport(_64_45Type_5),_$7=_ms.getModule(_64_45Type_5),empty=_ms.get(_$7,"empty"),Hash_45Set=_ms.lazy(()=>{
			return _ms.getDefaultExport(Hash_45Set_6)
		}),_$11=_ms.lazyGetModule(_64_7),_45_45=_ms.lazyProp(_$11,"--");
		const Set=new (Kind)((()=>{
			const built={};
			const doc=built.doc=`@ without repeat values.`;
			return _ms.setName(built,"Set")
		})());
		self_45kind_33(Set,_64_45Type);
		kind_33(Set,_64);
		self_45impl_33(empty,Set,()=>{
			return empty(_ms.unlazy(Hash_45Set))
		});
		impl_33(_61_63,Set,(()=>{
			const built={};
			const doc=built.doc=`Two Sets are =? if they have the same type and contain the same values.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				const a=_61_62(Set,[1,2]);
				const b=_61_62(Set,[1,2]);
				_ms.assoc(built,[a,b],true);
				_ms.assoc(built,[a,[_ms.unlazy(_45_45),b,[1]]],false);
				return built
			};
			return _ms.set(function(other){
				const _this=this;
				return ((same_63(type_45of,_this,other)&&same_63(count,_this,other))&&all_63(_this,_ms.sub(contains_63,other)))
			},built)
		})());
		const set_61_63=exports["set=?"]=(()=>{
			const built={};
			const doc=built.doc=`Whether two @s have the same values, regardless of order or count.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
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
		})();
		const intersect=exports.intersect=new (Method)((()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[_61_62(Set,[1,2]),_61_62(Set,[2,3])],_61_62(Set,[2]));
				return built
			};
			const args=built.args=2;
			const _default=built.default=function _default(_64intersect_45with){
				const _this=this;
				return keep(_this,_=>{
					return _ms.contains(_61_62(Set,_64intersect_45with),_)
				})
			};
			return _ms.setName(built,"intersect")
		})());
		const name=exports.name=`Set`;
		exports.default=Set;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvQC9TZXQvU2V0Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFZQSxVQUFLLEtBQUksTUFDSSxLQUFBOztHQUFaLG9CQUFNOzs7RUFFUCxlQUFXLElBQUk7RUFDZixRQUFNLElBQUk7RUFFVixlQUFXLE1BQU0sSUFDSyxJQUFBO1VBQXJCOztFQUVELFFBQU0sT0FBRyxJQUNHLEtBQUE7O0dBQVgsb0JBQU07R0FDTixzQkFDTyxlQUFBOztJQUFOLFFBQUksT0FBRyxJQUFJLENBQUUsRUFBRTtJQUNmLFFBQUksT0FBRyxJQUFJLENBQUUsRUFBRTtvQkFDZixDQUFFLEVBQUUsR0FBTztvQkFDWCxDQUFFLEVBQUUsb0JBQUssRUFBRSxDQUFFLEtBQVc7OztrQkFDdkIsU0FBQSxNQUNLO1VBaUJEO1dBakJMLEVBQUssUUFBTSxVQWlCTixNQWpCbUIsUUFBUSxRQUFNLE1BaUJqQyxNQWpCNEMsU0FBUSxPQWlCcEQsY0FqQjhELFlBQVU7R0FBQTs7RUFFL0UsaUNBQ00sS0FBQTs7R0FBTCxvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsQ0FBRSxFQUFFLEVBQUUsR0FBSSxDQUFFLEVBQUUsRUFBRSxJQUFTO29CQUMzQixDQUFFLENBQUUsR0FBSSxDQUFFLEVBQUUsRUFBRSxJQUFTO29CQUN2QixDQUFFLENBQUUsRUFBRSxHQUFJLENBQUUsRUFBRSxFQUFFLElBQVM7OztrQkFDekIsbUJBQUEsRUFBSSxFQUNHO3NCQURMO3NCQUFJO1dBQ04sT0FBSSxPQUFHLElBQUksR0FBSSxPQUFHLElBQUk7R0FBQTs7RUFFeEIsa0NBQVcsS0FBSSxRQUNNLEtBQUE7O0dBQXBCLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRyxPQUFHLElBQUksQ0FBRSxFQUFFLElBQU0sT0FBRyxJQUFJLENBQUUsRUFBRSxLQUFVLE9BQUcsSUFBSSxDQUFFOzs7R0FDbkQsc0JBQU07R0FDTiw2QkFBVyxrQkFBQSxvQkFDZTtVQUFwQjtXQUFMLEtBQUssTUFBTSxHQUNDO3lCQUFSLE9BQUcsSUFBSSxxQkFBVjtJQUFBO0dBQUE7OztFQS9DSCx3QkFBQTtrQkFZQSIsImZpbGUiOiJhdC9TZXQvU2V0LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=