"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../control","../../Type/Kind","../atbang","../at-Type","../q","./Map","./Map-Type","./Mapbang"],(exports,control_0,Kind_1,_64_33_2,_64_45Type_3,_63_4,Map_5,Map_45Type_6,Map_33_7)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(control_0),returning=_ms.get(_$2,"returning"),_$3=_ms.getModule(Kind_1),kind_33=_ms.get(_$3,"kind!"),self_45kind_33=_ms.get(_$3,"self-kind!"),_$4=_ms.getModule(_64_33_2),empty_33=_ms.get(_$4,"empty!"),_$5=_ms.getModule(_64_45Type_3),empty=_ms.get(_$5,"empty"),_$6=_ms.getModule(_63_4),Opt_45_62_63=_ms.get(_$6,"Opt->?"),_$7=_ms.getModule(Map_5),_63get=_ms.get(_$7,"?get"),has_45key_63=_ms.get(_$7,"has-key?"),keys=_ms.get(_$7,"keys"),Map_45Type=_ms.getDefaultExport(Map_45Type_6),Map_33=_ms.getDefaultExport(Map_33_7),_$9=_ms.getModule(Map_33_7),assoc_33=_ms.get(_$9,"assoc!"),un_45assoc_33=_ms.get(_$9,"un-assoc!");
		const Weak_45Id_45Map_33=()=>{
			const built={};
			const doc=built.doc=`Map! which can only hold have Objects as keys and stops holding them when they are garbage collected.\nGood for caches.\nIt does not have the full functionality of a Map! because there is no way to iterate over the keys.`;
			return _ms.set(global.WeakMap,built,"Weak-Id-Map!")
		}();
		self_45kind_33(Weak_45Id_45Map_33,Map_45Type,()=>{
			const built=new global.Map();
			_ms.assoc(built,empty,()=>{
				return new Weak_45Id_45Map_33()
			});
			return built
		}());
		kind_33(Weak_45Id_45Map_33,Map_33,()=>{
			const built=new global.Map();
			_ms.assoc(built,_63get,(_,key)=>{
				return Opt_45_62_63(_.get(key))
			});
			_ms.assoc(built,has_45key_63,(_,key)=>{
				return _.has(key)
			});
			_ms.assoc(built,assoc_33,(_,key,val)=>{
				_.set(key,val)
			});
			_ms.assoc(built,un_45assoc_33,(_,key)=>{
				return returning(_63get(_,key),()=>{
					_.delete(key)
				})
			});
			_ms.assoc(built,keys,()=>{
				throw _ms.error(`Weak-Id-Map! does not support \`keys\`.`)
			});
			_ms.assoc(built,empty_33,()=>{
				throw _ms.error(`Weak-Id-Map! does not support \`empty!\`.`)
			});
			return built
		}());
		const name=exports.name=`Weak-Id-Map!`;
		exports.default=Weak_45Id_45Map_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9XZWFrLUlkLU1hcCEubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFVQSw2QkFDYTs7R0FBWixvQkFDQztrQkFHRDs7RUFFRCxlQUFXLG1CQUFhLGVBQ1E7O21CQUEvQixNQUNVLElBQUE7V0FBVCxJQUFJO0dBQUE7OztFQUVOLFFBQU0sbUJBQWEsV0FDSTs7bUJBQXRCLE9BQVMsQ0FBQSxFQUFFLE1BQ0c7V0FBYixhQUFRLE1BQU07R0FBQTttQkFDZixhQUFhLENBQUEsRUFBRSxNQUNHO1dBQWpCLE1BQU07R0FBQTttQkFDUCxTQUFZLENBQUEsRUFBRSxJQUFJLE1BQ0c7SUFBcEIsTUFBTSxJQUFJO0dBQUE7bUJBQ1gsY0FBYyxDQUFBLEVBQUUsTUFDRztXQUFsQixVQUFXLE9BQUssRUFBRSxLQUNPLElBQUE7S0FBeEIsU0FBUztJQUFBO0dBQUE7bUJBRVgsS0FDVSxJQUFBO0lBQVQsZ0JBQVE7O21CQUNULFNBQ1ksSUFBQTtJQUFYLGdCQUFROzs7O0VBbkNWLHdCQUFBO2tCQVVBIiwiZmlsZSI6ImF0L01hcC9XZWFrLUlkLU1hcGJhbmcuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==