"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../control","../../js","../../Type/Kind","../atbang","../at-Type","../q","./Map","./Map-Type","./Mapbang"],function(exports,control_0,js_1,Kind_2,_64_33_3,_64_45Type_4,_63_5,Map_6,Map_45Type_7,Map_33_8){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(control_0),returning=_ms.get(_$2,"returning"),_$3=_ms.getModule(js_1),_new=_ms.get(_$3,"new"),_$4=_ms.getModule(Kind_2),kind_33=_ms.get(_$4,"kind!"),self_45kind_33=_ms.get(_$4,"self-kind!"),_$5=_ms.getModule(_64_33_3),empty_33=_ms.get(_$5,"empty!"),_$6=_ms.getModule(_64_45Type_4),empty=_ms.get(_$6,"empty"),_$7=_ms.getModule(_63_5),Opt_45_62_63=_ms.get(_$7,"Opt->?"),_$8=_ms.getModule(Map_6),_63get=_ms.get(_$8,"?get"),has_45key_63=_ms.get(_$8,"has-key?"),keys=_ms.get(_$8,"keys"),Map_45Type=_ms.getDefaultExport(Map_45Type_7),Map_33=_ms.getDefaultExport(Map_33_8),_$10=_ms.getModule(Map_33_8),assoc_33=_ms.get(_$10,"assoc!"),un_45assoc_33=_ms.get(_$10,"un-assoc!");
		const Weak_45Id_45Map_33=function(){
			const built={};
			const doc=built.doc="Map! which can only hold have Objects as keys and stops holding them when they are garbage collected.\nGood for caches.\nIt does not have the full functionality of a Map! because there is no way to iterate over the keys.";
			return _ms.set(global.WeakMap,built,"Weak-Id-Map!")
		}();
		self_45kind_33(Weak_45Id_45Map_33,Map_45Type,function(){
			const built=new global.Map();
			_ms.assoc(built,empty,function(){
				return _new(Weak_45Id_45Map_33)
			});
			return built
		}());
		kind_33(Weak_45Id_45Map_33,Map_33,function(){
			const built=new global.Map();
			_ms.assoc(built,_63get,function(_,key){
				return Opt_45_62_63(_.get(key))
			});
			_ms.assoc(built,has_45key_63,function(_,key){
				return _.has(key)
			});
			_ms.assoc(built,assoc_33,function(_,key,val){
				_.set(key,val)
			});
			_ms.assoc(built,un_45assoc_33,function(_,key){
				return returning(_63get(_,key),function(){
					_.delete(key)
				})
			});
			_ms.assoc(built,keys,function(){
				throw _ms.error("Weak-Id-Map! does not support `keys`.")
			});
			_ms.assoc(built,empty_33,function(){
				throw _ms.error("Weak-Id-Map! does not support `empty!`.")
			});
			return built
		}());
		const name=exports.name="Weak-Id-Map!";
		exports.default=Weak_45Id_45Map_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9XZWFrLUlkLU1hcCEubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFXQSxtQ0FDYTs7R0FBWixvQkFDQztrQkFHRDs7RUFFRCxlQUFXLG1CQUFhLHFCQUNROzttQkFBL0IsTUFDVSxVQUFBO1dBQVQsS0FBSTtHQUFBOzs7RUFFTixRQUFNLG1CQUFhLGlCQUNJOzttQkFBdEIsT0FBUyxTQUFBLEVBQUUsSUFDRztXQUFiLGFBQVEsTUFBTTtHQUFBO21CQUNmLGFBQWEsU0FBQSxFQUFFLElBQ0c7V0FBakIsTUFBTTtHQUFBO21CQUNQLFNBQVksU0FBQSxFQUFFLElBQUksSUFDRztJQUFwQixNQUFNLElBQUk7R0FBQTttQkFDWCxjQUFjLFNBQUEsRUFBRSxJQUNHO1dBQWxCLFVBQVcsT0FBSyxFQUFFLEtBQ08sVUFBQTtLQUF4QixTQUFTO0lBQUE7R0FBQTttQkFFWCxLQUNVLFVBQUE7SUFBVCxnQkFBUTtHQUFBO21CQUNULFNBQ1ksVUFBQTtJQUFYLGdCQUFRO0dBQUE7OztFQXBDVix3QkFBQTtrQkFXQSIsImZpbGUiOiJhdC9NYXAvV2Vhay1JZC1NYXBiYW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=