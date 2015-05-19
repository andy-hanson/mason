"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../control","../../js","../../Try","../../Type/Kind","../../Type/Method","../atbang","../at-Type","../q","./Map","./Map-Type","./Mapbang"],function(exports,control_0,js_1,Try_2,Kind_3,Method_4,_64_33_5,_64_45Type_6,_63_7,Map_8,Map_45Type_9,Map_33_10){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(control_0),returning=_ms.get(_$2,"returning"),_$3=_ms.getModule(js_1),_new=_ms.get(_$3,"new"),_$4=_ms.getModule(Try_2),oh_45no_33=_ms.get(_$4,"oh-no!"),_$5=_ms.getModule(Kind_3),kind_33=_ms.get(_$5,"kind!"),self_45kind_33=_ms.get(_$5,"self-kind!"),_$6=_ms.getModule(Method_4),impl_33=_ms.get(_$6,"impl!"),self_45impl_33=_ms.get(_$6,"self-impl!"),_$7=_ms.getModule(_64_33_5),empty_33=_ms.get(_$7,"empty!"),_$8=_ms.getModule(_64_45Type_6),empty=_ms.get(_$8,"empty"),_$9=_ms.getModule(_63_7),Opt_45_62_63=_ms.get(_$9,"Opt->?"),_$10=_ms.getModule(Map_8),_63get=_ms.get(_$10,"?get"),has_45key_63=_ms.get(_$10,"has-key?"),keys=_ms.get(_$10,"keys"),Map_45Type=_ms.getDefaultExport(Map_45Type_9),Map_33=_ms.getDefaultExport(Map_33_10),_$12=_ms.getModule(Map_33_10),assoc_33=_ms.get(_$12,"assoc!"),un_45assoc_33=_ms.get(_$12,"un-assoc!");
		const Weak_45Id_45Map_33=function(){
			const doc="Map! which can only hold have Objects as keys and stops holding them when they are garbage collected.\nGood for caches.\nIt does not have the full functionality of a Map! because there is no way to iterate over the keys.";
			return _ms.set(global.WeakMap,"doc",doc,"name","Weak-Id-Map!")
		}();
		self_45kind_33(Weak_45Id_45Map_33,Map_45Type);
		self_45impl_33(empty,Weak_45Id_45Map_33,function(){
			return _new(Weak_45Id_45Map_33)
		});
		kind_33(Weak_45Id_45Map_33,Map_33);
		impl_33(_63get,Weak_45Id_45Map_33,function(_,key){
			return Opt_45_62_63(_.get(key))
		});
		impl_33(has_45key_63,Weak_45Id_45Map_33,function(_,key){
			return _.has(key)
		});
		impl_33(keys,Weak_45Id_45Map_33,function(){
			return oh_45no_33("Can't get keys of Weak-Id-Map! because the garbage collector can freely change this.")
		});
		impl_33(empty_33,Weak_45Id_45Map_33,function(){
			return oh_45no_33("Can't empty Weak-Id-Map! for some reason.\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/clear\"")
		});
		impl_33(assoc_33,Weak_45Id_45Map_33,function(_,key,val){
			return _.set(key,val)
		});
		impl_33(un_45assoc_33,Weak_45Id_45Map_33,function(_,key){
			return returning(_63get(_,key),function(){
				return _.delete(key)
			})
		});
		const name=exports.name="Weak-Id-Map!";
		exports.default=Weak_45Id_45Map_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9XZWFrLUlkLU1hcCEubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFhQSxtQ0FDYztHQUFiLFVBQ0M7a0JBR0Q7O0VBRUQsZUFBVyxtQkFBYTtFQUN4QixlQUFXLE1BQU0sbUJBQ2MsVUFBQTtVQUE5QixLQUFJO0VBQUE7RUFFTCxRQUFNLG1CQUFhO0VBQ25CLFFBQU0sT0FBSyxtQkFBYyxTQUFBLEVBQUUsSUFDRztVQUE3QixhQUFRLE1BQU07RUFBQTtFQUNmLFFBQU0sYUFBUyxtQkFBYyxTQUFBLEVBQUUsSUFDRztVQUFqQyxNQUFNO0VBQUE7RUFDUCxRQUFNLEtBQUssbUJBQ2MsVUFBQTtVQUF4QixXQUFRO0VBQUE7RUFDVCxRQUFNLFNBQU8sbUJBQ2MsVUFBQTtVQUExQixXQUNDO0VBQUE7RUFFRixRQUFNLFNBQU8sbUJBQWMsU0FBQSxFQUFFLElBQUksSUFDRztVQUFuQyxNQUFNLElBQUk7RUFBQTtFQUNYLFFBQU0sY0FBVSxtQkFBYyxTQUFBLEVBQUUsSUFDRztVQUFsQyxVQUFXLE9BQUssRUFBRSxLQUNNLFVBQUE7V0FBdkIsU0FBUztHQUFBO0VBQUE7RUF2Q1gsd0JBQUE7a0JBMENBIiwiZmlsZSI6ImF0L01hcC9XZWFrLUlkLU1hcGJhbmcuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==