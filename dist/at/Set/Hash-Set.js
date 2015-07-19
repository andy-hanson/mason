"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../Type/Js-Method","../../Type/Kind","../../Type/Method","../../Type/Wrap-Type","../at","../at-Type","../Map/Map","../Map/Hash-Map","../Map/Map","./Set"],(exports,compare_0,Js_45Method_1,Kind_2,Method_3,Wrap_45Type_4,_64_5,_64_45Type_6,Map_7,Hash_45Map_8,Map_9,Set_10)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(Js_45Method_1),js_45impl_33=_ms.get(_$3,"js-impl!"),_$4=_ms.getModule(Kind_2),kind_33=_ms.get(_$4,"kind!"),self_45kind_33=_ms.get(_$4,"self-kind!"),_$5=_ms.getModule(Method_3),impl_33=_ms.get(_$5,"impl!"),impl_45for=_ms.get(_$5,"impl-for"),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_4),_$7=_ms.getModule(_64_5),_43_43_33=_ms.get(_$7,"++!"),_45_45_33=_ms.get(_$7,"--!"),empty_33=_ms.get(_$7,"empty!"),iterator=_ms.get(_$7,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_6),_$8=_ms.getModule(_64_45Type_6),empty=_ms.get(_$8,"empty"),_$9=_ms.getModule(Map_7),keys=_ms.get(_$9,"keys"),Hash_45Map=_ms.getDefaultExport(Hash_45Map_8),_$11=_ms.getModule(Map_9),assoc_33=_ms.get(_$11,"assoc!"),un_45assoc_33=_ms.get(_$11,"un-assoc!"),Set=_ms.getDefaultExport(Set_10);
		const Hash_45Set=Wrap_45Type(()=>{
			const built={};
			const doc=built.doc=`Set that considers elements equal using =?.\nRelies on an efficient hash-code implementation.`;
			const wrapped_45type=built["wrapped-type"]=Hash_45Map;
			return _ms.setName(built,"Hash-Set")
		}());
		self_45kind_33(Hash_45Set,_64_45Type,()=>{
			const built=new global.Map();
			_ms.assoc(built,empty,()=>{
				return Hash_45Set(empty(Hash_45Map))
			});
			return built
		}());
		js_45impl_33(iterator,Hash_45Set,function(){
			const _this=this;
			return iterator(keys(_this.val))
		});
		kind_33(Hash_45Set,Set,()=>{
			const built=new global.Map();
			_ms.assoc(built,_43_43_33,(_,_64added)=>{
				for(let em of _64added){
					assoc_33(_.val,em,true)
				}
			});
			_ms.assoc(built,_45_45_33,(_,_64deleted)=>{
				for(let em of _64deleted){
					un_45assoc_33(_.val,em)
				}
			});
			_ms.assoc(built,empty_33,_=>{
				empty_33(_.val)
			});
			return built
		}());
		impl_33(_61_63,Hash_45Set,impl_45for(_61_63,Set));
		const name=exports.name=`Hash-Set`;
		exports.default=Hash_45Set;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NldC9IYXNoLVNldC5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQWFBLGlCQUFVLGdCQUNTOztHQUFsQixvQkFDQztHQUVELDJDQUFjOzs7RUFFZixlQUFXLFdBQVMsZUFDTTs7bUJBQXpCLE1BQ1UsSUFBQTtXQUFULFdBQVUsTUFBTTtHQUFBOzs7RUFFbEIsYUFBUyxTQUFTLFdBQ1csVUFBQTs7VUFBNUIsU0FBVSxLQUFLOztFQUVoQixRQUFNLFdBQVMsUUFDRzs7bUJBQ2pCLFVBQVMsQ0FBQSxFQUFFLFdBQ007SUFBWCxRQUFBLE1BQU0sU0FDTTtLQUFoQixTQUFPLE1BQU0sR0FBRztJQUFBO0dBQUE7bUJBR2xCLFVBQVMsQ0FBQSxFQUFFLGFBQ1E7SUFBYixRQUFBLE1BQU0sV0FDUTtLQUFsQixjQUFVLE1BQU07SUFBQTtHQUFBO21CQUVsQixTQUFZLEdBQ0M7SUFBWixTQUFPOzs7O0VBR1QsUUFBTSxPQUFHLFdBQVUsV0FBUyxPQUFHO0VBekMvQix3QkFBQTtrQkFhQSIsImZpbGUiOiJhdC9TZXQvSGFzaC1TZXQuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==