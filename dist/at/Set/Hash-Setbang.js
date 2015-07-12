"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../Type/Js-Method","../../Type/Kind","../../Type/Method","../../Type/Wrap-Type","../at","../atbang","../at-Type","../Map/Map","../Map/Hash-Mapbang","../Map/Mapbang","./Set","./Setbang"],function(exports,compare_0,Js_45Method_1,Kind_2,Method_3,Wrap_45Type_4,_64_5,_64_33_6,_64_45Type_7,Map_8,Hash_45Map_33_9,Map_33_10,Set_11,Set_33_12){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(Js_45Method_1),js_45impl_33=_ms.get(_$3,"js-impl!"),_$4=_ms.getModule(Kind_2),kind_33=_ms.get(_$4,"kind!"),self_45kind_33=_ms.get(_$4,"self-kind!"),_$5=_ms.getModule(Method_3),impl_33=_ms.get(_$5,"impl!"),impl_45for=_ms.get(_$5,"impl-for"),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_4),_$7=_ms.getModule(_64_5),iterator=_ms.get(_$7,"iterator"),_$8=_ms.getModule(_64_33_6),_43_43_33=_ms.get(_$8,"++!"),_45_45_33=_ms.get(_$8,"--!"),empty_33=_ms.get(_$8,"empty!"),_64_45Type=_ms.getDefaultExport(_64_45Type_7),_$9=_ms.getModule(_64_45Type_7),empty=_ms.get(_$9,"empty"),_$10=_ms.getModule(Map_8),keys=_ms.get(_$10,"keys"),Hash_45Map_33=_ms.getDefaultExport(Hash_45Map_33_9),_$12=_ms.getModule(Map_33_10),assoc_33=_ms.get(_$12,"assoc!"),un_45assoc_33=_ms.get(_$12,"un-assoc!"),Set=_ms.getDefaultExport(Set_11),Set_33=_ms.getDefaultExport(Set_33_12);
		const Hash_45Set_33=Wrap_45Type(function(){
			const built={};
			const doc=built.doc=`Set that considers elements equal using =?.\nRelies on an efficient hash-code implementation.`;
			const wrapped_45type=built["wrapped-type"]=Hash_45Map_33;
			return _ms.setName(built,"Hash-Set!")
		}());
		self_45kind_33(Hash_45Set_33,_64_45Type,function(){
			const built=new global.Map();
			_ms.assoc(built,empty,function(){
				return Hash_45Set_33(empty(Hash_45Map_33))
			});
			return built
		}());
		js_45impl_33(iterator,Hash_45Set_33,function(){
			return iterator(keys(this.val))
		});
		kind_33(Hash_45Set_33,Set_33,function(){
			const built=new global.Map();
			_ms.assoc(built,_43_43_33,function(_,_64added){
				for(let em of _64added){
					assoc_33(_.val,em,true)
				}
			});
			_ms.assoc(built,_45_45_33,function(_,_64deleted){
				for(let em of _64deleted){
					un_45assoc_33(_.val,em)
				}
			});
			_ms.assoc(built,empty_33,function(_){
				empty_33(_.val)
			});
			return built
		}());
		impl_33(_61_63,Hash_45Set_33,impl_45for(_61_63,Set));
		const name=exports.name=`Hash-Set!`;
		exports.default=Hash_45Set_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NldC9IYXNoLVNldCEubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFlQSxvQkFBVyxzQkFDUzs7R0FBbkIsb0JBQ0M7R0FFRCwyQ0FBYzs7O0VBRWYsZUFBVyxjQUFVLHFCQUNNOzttQkFBMUIsTUFDVSxVQUFBO1dBQVQsY0FBVyxNQUFNO0dBQUE7OztFQUVuQixhQUFTLFNBQVMsY0FDVyxVQUFBO1VBQTVCLFNBQVUsS0FBSzs7RUFFaEIsUUFBTSxjQUFVLGlCQUNJOzttQkFDbkIsVUFBUyxTQUFBLEVBQUUsU0FDTTtJQUFYLFFBQUEsTUFBTSxTQUNNO0tBQWhCLFNBQU8sTUFBTSxHQUFHO0lBQUE7R0FBQTttQkFHbEIsVUFBUyxTQUFBLEVBQUUsV0FDUTtJQUFiLFFBQUEsTUFBTSxXQUNRO0tBQWxCLGNBQVUsTUFBTTtJQUFBO0dBQUE7bUJBRWxCLFNBQVksU0FBQSxFQUNDO0lBQVosU0FBTzs7OztFQUdULFFBQU0sT0FBRyxjQUFXLFdBQVMsT0FBRztFQTNDaEMsd0JBQUE7a0JBZUEiLCJmaWxlIjoiYXQvU2V0L0hhc2gtU2V0YmFuZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9