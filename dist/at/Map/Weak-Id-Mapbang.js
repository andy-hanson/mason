"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../control","../../js","../../Try","../../Type/Kind","../atbang","../at-Type","../q","./Map","./Map-Type","./Mapbang"],function(exports,control_0,js_1,Try_2,Kind_3,_64_33_4,_64_45Type_5,_63_6,Map_7,Map_45Type_8,Map_33_9){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(control_0),returning=_ms.get(_$2,"returning"),_$3=_ms.getModule(js_1),_new=_ms.get(_$3,"new"),_$4=_ms.getModule(Try_2),oh_45no_33=_ms.get(_$4,"oh-no!"),_$5=_ms.getModule(Kind_3),kind_33=_ms.get(_$5,"kind!"),self_45kind_33=_ms.get(_$5,"self-kind!"),_$6=_ms.getModule(_64_33_4),empty_33=_ms.get(_$6,"empty!"),_$7=_ms.getModule(_64_45Type_5),empty=_ms.get(_$7,"empty"),_$8=_ms.getModule(_63_6),Opt_45_62_63=_ms.get(_$8,"Opt->?"),_$9=_ms.getModule(Map_7),_63get=_ms.get(_$9,"?get"),has_45key_63=_ms.get(_$9,"has-key?"),keys=_ms.get(_$9,"keys"),Map_45Type=_ms.getDefaultExport(Map_45Type_8),Map_33=_ms.getDefaultExport(Map_33_9),_$11=_ms.getModule(Map_33_9),assoc_33=_ms.get(_$11,"assoc!"),un_45assoc_33=_ms.get(_$11,"un-assoc!");
		const Weak_45Id_45Map_33=function(){
			const doc="Map! which can only hold have Objects as keys and stops holding them when they are garbage collected.\nGood for caches.\nIt does not have the full functionality of a Map! because there is no way to iterate over the keys.";
			return _ms.set(global.WeakMap,"doc",doc,"name","Weak-Id-Map!")
		}();
		self_45kind_33(Weak_45Id_45Map_33,Map_45Type,function(){
			const _k0=empty,_v0=function(){
				return _new(Weak_45Id_45Map_33)
			};
			return _ms.map(_k0,_v0)
		}());
		kind_33(Weak_45Id_45Map_33,Map_33,function(){
			const _k0=_63get,_v0=function(_,key){
				return Opt_45_62_63(_.get(key))
			};
			const _k1=has_45key_63,_v1=function(_,key){
				return _.has(key)
			};
			const _k2=assoc_33,_v2=function(_,key,val){
				return _.set(key,val)
			};
			const _k3=un_45assoc_33,_v3=function(_,key){
				return returning(_63get(_,key),function(){
					return _.delete(key)
				})
			};
			const _k4=keys,_v4=function(){
				return oh_45no_33("Weak-Id-Map! does not support `keys`.")
			};
			const _k5=empty_33,_v5=function(){
				return oh_45no_33("Weak-Id-Map! does not support `empty!`.")
			};
			return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3,_k4,_v4,_k5,_v5)
		}());
		const name=exports.name="Weak-Id-Map!";
		exports.default=Weak_45Id_45Map_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9XZWFrLUlkLU1hcCEubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFZQSxtQ0FDYztHQUFiLFVBQ0M7a0JBR0Q7O0VBRUQsZUFBVyxtQkFBYSxxQkFDUTtHQUEvQixVQUFBLFVBQ1UsVUFBQTtXQUFULEtBQUk7R0FBQTs7O0VBRU4sUUFBTSxtQkFBYSxpQkFDSTtHQUF0QixVQUFBLFdBQVMsU0FBQSxFQUFFLElBQ0c7V0FBYixhQUFRLE1BQU07R0FBQTtHQUNmLFVBQUEsaUJBQWEsU0FBQSxFQUFFLElBQ0c7V0FBakIsTUFBTTtHQUFBO0dBQ1AsVUFBQSxhQUFXLFNBQUEsRUFBRSxJQUFJLElBQ0c7V0FBbkIsTUFBTSxJQUFJO0dBQUE7R0FDWCxVQUFBLGtCQUFjLFNBQUEsRUFBRSxJQUNHO1dBQWxCLFVBQVcsT0FBSyxFQUFFLEtBQ00sVUFBQTtZQUF2QixTQUFTO0lBQUE7R0FBQTtHQUVYLFVBQUEsU0FDUyxVQUFBO1dBQVIsV0FBUTtHQUFBO0dBQ1QsVUFBQSxhQUNXLFVBQUE7V0FBVixXQUFRO0dBQUE7OztFQXJDVix3QkFBQTtrQkF1Q0EiLCJmaWxlIjoiYXQvTWFwL1dlYWstSWQtTWFwYmFuZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9