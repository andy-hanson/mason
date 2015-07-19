"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../control","../../Type/Kind","../at","../at-Type","../q","./Map","./Map-Type"],(exports,control_0,Kind_1,_64_2,_64_45Type_3,_63_4,Map_5,Map_45Type_6)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(control_0),returning=_ms.get(_$2,"returning"),_$3=_ms.getModule(Kind_1),kind_33=_ms.get(_$3,"kind!"),self_45kind_33=_ms.get(_$3,"self-kind!"),_$4=_ms.getModule(_64_2),empty_33=_ms.get(_$4,"empty!"),_$5=_ms.getModule(_64_45Type_3),empty=_ms.get(_$5,"empty"),_$6=_ms.getModule(_63_4),Opt_45_62_63=_ms.get(_$6,"Opt->?"),Map=_ms.getDefaultExport(Map_5),_$7=_ms.getModule(Map_5),assoc_33=_ms.get(_$7,"assoc!"),_63get=_ms.get(_$7,"?get"),has_45key_63=_ms.get(_$7,"has-key?"),keys=_ms.get(_$7,"keys"),un_45assoc_33=_ms.get(_$7,"un-assoc!"),Map_45Type=_ms.getDefaultExport(Map_45Type_6);
		const Weak_45Id_45Map=()=>{
			const built={};
			const doc=built.doc=`Map which can only hold have Objects as keys and stops holding them when they are garbage collected.\nGood for caches.\nIt does not have the full functionality of a Map because there is no way to iterate over the keys.`;
			return _ms.set(global.WeakMap,built,"Weak-Id-Map")
		}();
		self_45kind_33(Weak_45Id_45Map,Map_45Type,()=>{
			const built=new global.Map();
			_ms.assoc(built,empty,()=>{
				return new Weak_45Id_45Map()
			});
			return built
		}());
		kind_33(Weak_45Id_45Map,Map,()=>{
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
				throw _ms.error(`Weak-Id-Map does not support \`keys\`.`)
			});
			_ms.assoc(built,empty_33,()=>{
				throw _ms.error(`Weak-Id-Map does not support \`empty!\`.`)
			});
			return built
		}());
		const name=exports.name=`Weak-Id-Map`;
		exports.default=Weak_45Id_45Map;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9XZWFrLUlkLU1hcC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVNBLDBCQUNZOztHQUFYLG9CQUNDO2tCQUdEOztFQUVELGVBQVcsZ0JBQVksZUFDUTs7bUJBQTlCLE1BQ1UsSUFBQTtXQUFULElBQUk7R0FBQTs7O0VBRU4sUUFBTSxnQkFBWSxRQUNHOzttQkFBcEIsT0FBUyxDQUFBLEVBQUUsTUFDRztXQUFiLGFBQVEsTUFBTTtHQUFBO21CQUNmLGFBQWEsQ0FBQSxFQUFFLE1BQ0c7V0FBakIsTUFBTTtHQUFBO21CQUNQLFNBQVksQ0FBQSxFQUFFLElBQUksTUFDRztJQUFwQixNQUFNLElBQUk7R0FBQTttQkFDWCxjQUFjLENBQUEsRUFBRSxNQUNHO1dBQWxCLFVBQVcsT0FBSyxFQUFFLEtBQ08sSUFBQTtLQUF4QixTQUFTO0lBQUE7R0FBQTttQkFFWCxLQUNVLElBQUE7SUFBVCxnQkFBUTs7bUJBQ1QsU0FDWSxJQUFBO0lBQVgsZ0JBQVE7Ozs7RUFsQ1Ysd0JBQUE7a0JBU0EiLCJmaWxlIjoiYXQvTWFwL1dlYWstSWQtTWFwLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=