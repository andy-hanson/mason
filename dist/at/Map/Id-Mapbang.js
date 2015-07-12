"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../control","../../Type/Kind","../at","../atbang","../at-Type","../q","../Seq/Stream","./Map","./Mapbang","./Map-Type","../../bang","../../compare","../Seq/Seq"],function(exports,control_0,Kind_1,_64_2,_64_33_3,_64_45Type_4,_63_5,Stream_6,Map_7,Map_33_8,Map_45Type_9,_33_10,compare_11,Seq_12){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(control_0),returning=_ms.get(_$2,"returning"),_$3=_ms.getModule(Kind_1),kind_33=_ms.get(_$3,"kind!"),self_45kind_33=_ms.get(_$3,"self-kind!"),_$4=_ms.getModule(_64_2),count=_ms.get(_$4,"count"),_$5=_ms.getModule(_64_33_3),empty_33=_ms.get(_$5,"empty!"),_$6=_ms.getModule(_64_45Type_4),empty=_ms.get(_$6,"empty"),_$7=_ms.getModule(_63_5),Opt_45_62_63=_ms.get(_$7,"Opt->?"),Stream=_ms.getDefaultExport(Stream_6),_$9=_ms.getModule(Map_7),_63get=_ms.get(_$9,"?get"),has_45key_63=_ms.get(_$9,"has-key?"),keys=_ms.get(_$9,"keys"),values=_ms.get(_$9,"values"),Map_33=_ms.getDefaultExport(Map_33_8),_$10=_ms.getModule(Map_33_8),assoc_33=_ms.get(_$10,"assoc!"),un_45assoc_33=_ms.get(_$10,"un-assoc!"),Map_45Type=_ms.getDefaultExport(Map_45Type_9),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_10)
		}),_$14=_ms.lazyGetModule(compare_11),_61_63=_ms.lazyProp(_$14,"=?"),_$15=_ms.lazyGetModule(Seq_12),seq_61_63=_ms.lazyProp(_$15,"seq=?");
		const Id_45Map_33=function(){
			const built={};
			const doc=built.doc=`JavaScript's native Map type.\nOnly considers exactly identical keys =?; this makes it the fastest Map.`;
			const test=built.test=function test(){
				const _=empty(Id_45Map_33);
				assoc_33(_,1,2);
				_ms.unlazy(_33)(_ms.unlazy(_61_63),_ms.sub(_,1),2);
				const key_451=function(){
					const built={};
					const a=built.a=1;
					return _ms.setName(built,"key-1")
				}();
				assoc_33(_,key_451,3);
				_ms.unlazy(_33)(_ms.unlazy(_61_63),_ms.sub(_,key_451),3);
				const key_452=function(){
					const built={};
					const a=built.a=1;
					return _ms.setName(built,"key-2")
				}();
				assoc_33(_,key_452,4);
				_ms.unlazy(_33)(_ms.unlazy(_61_63),_ms.sub(_,key_451),3);
				_ms.unlazy(_33)(_ms.unlazy(_61_63),_ms.sub(_,key_452),4);
				_ms.unlazy(_33)(_ms.unlazy(seq_61_63),keys(_),[1,key_451,key_452]);
				_ms.unlazy(_33)(_ms.unlazy(seq_61_63),values(_),[2,3,4])
			};
			return _ms.set(global.Map,built,"Id-Map!")
		}();
		self_45kind_33(Id_45Map_33,Map_45Type,function(){
			const built=new global.Map();
			_ms.assoc(built,empty,function(){
				return new Id_45Map_33()
			});
			return built
		}());
		kind_33(Id_45Map_33,Map_33,function(){
			const built=new global.Map();
			_ms.assoc(built,count,function(_){
				return _.size
			});
			_ms.assoc(built,_63get,function(_,key){
				return Opt_45_62_63(_.get(key))
			});
			_ms.assoc(built,has_45key_63,function(_,key){
				return _.has(key)
			});
			_ms.assoc(built,keys,function(_){
				return Stream(function(){
					return _.keys()
				})
			});
			_ms.assoc(built,values,function(_){
				return Stream(function(){
					return _.values()
				})
			});
			_ms.assoc(built,empty_33,function(_){
				_.clear()
			});
			_ms.assoc(built,assoc_33,function(_,key,val){
				_.set(key,val)
			});
			_ms.assoc(built,un_45assoc_33,function(_,key){
				return returning(_63get(_,key),function(){
					_.delete(key)
				})
			});
			return built
		}());
		const name=exports.name=`Id-Map!`;
		exports.default=Id_45Map_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9JZC1NYXAhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFnQkEsNEJBQ1E7O0dBQVAsb0JBQ0M7R0FFRCxzQkFDUSxlQUFBO0lBQ1AsUUFBSSxNQUFNO0lBQ1YsU0FBTyxFQUFFLEVBQUU7K0NBQ04sRUFBRSxHQUFHO0lBQ1Ysd0JBQ087O0tBQU4sZ0JBQUc7OztJQUNKLFNBQU8sRUFBRSxRQUFNOytDQUNWLEVBQUUsU0FBTztJQUNkLHdCQUNPOztLQUFOLGdCQUFHOzs7SUFDSixTQUFPLEVBQUUsUUFBTTsrQ0FFVixFQUFFLFNBQU87K0NBQ1QsRUFBRSxTQUFPOzBDQUVOLEtBQUksR0FBRSxDQUFFLEVBQUUsUUFBTTswQ0FDaEIsT0FBTSxHQUFFLENBQUUsRUFBRSxFQUFFO0dBQUE7a0JBRXZCOztFQUVELGVBQVcsWUFBUSxxQkFDUTs7bUJBQTFCLE1BQ1UsVUFBQTtXQUFULElBQUk7R0FBQTs7O0VBRU4sUUFBTSxZQUFRLGlCQUNJOzttQkFBakIsTUFBVSxTQUFBLEVBQ0M7V0FBVjs7bUJBQ0QsT0FBUyxTQUFBLEVBQUUsSUFDRztXQUFiLGFBQVEsTUFBTTtHQUFBO21CQUNmLGFBQWEsU0FBQSxFQUFFLElBQ0c7V0FBakIsTUFBTTtHQUFBO21CQUNQLEtBQVMsU0FBQSxFQUNDO1dBQVQsT0FDUSxVQUFBO1lBQVA7OzttQkFDRixPQUFXLFNBQUEsRUFDQztXQUFYLE9BQ1EsVUFBQTtZQUFQOzs7bUJBQ0YsU0FBWSxTQUFBLEVBQ0M7SUFBWjs7bUJBQ0QsU0FBWSxTQUFBLEVBQUUsSUFBSSxJQUNHO0lBQXBCLE1BQU0sSUFBSTtHQUFBO21CQUNYLGNBQWMsU0FBQSxFQUFFLElBQ0c7V0FBbEIsVUFBVyxPQUFLLEVBQUUsS0FDTyxVQUFBO0tBQXhCLFNBQVM7SUFBQTtHQUFBOzs7RUFoRVosd0JBQUE7a0JBZ0JBIiwiZmlsZSI6ImF0L01hcC9JZC1NYXBiYW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=