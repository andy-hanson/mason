"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../methods","./Kind","./Method","./Obj-Type","./Type","../at/q","../compare"],(exports,methods_0,Kind_1,Method_2,Obj_45Type_3,Type_4,_63_5,compare_6)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(methods_0),sub=_ms.get(_$2,"sub"),_$3=_ms.getModule(Kind_1),kind_33=_ms.get(_$3,"kind!"),_$4=_ms.getModule(Method_2),impl_33=_ms.get(_$4,"impl!"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_3),Type=_ms.getDefaultExport(Type_4),_$6=_ms.getModule(Type_4),contains_63=_ms.get(_$6,"contains?"),_63=_ms.lazy(()=>{
			return _ms.getDefaultExport(_63_5)
		}),_$9=_ms.lazyGetModule(compare_6),_61_63=_ms.lazyProp(_$9,"=?");
		const Alias_45Type=Obj_45Type(()=>{
			const built={};
			const doc=built.doc=`Contains the same instances as another type (officially), but has its own meaning and identity.`;
			const test=built.test=function test(){
				const A=Alias_45Type(()=>{
					const built={};
					const alias_45of=built["alias-of"]=String;
					return _ms.setName(built,"A")
				}());
				_ms.assert(contains_63,A,`0`);
				_ms.assertNot(_ms.unlazy(_61_63),A,String)
			};
			const props=built.props=()=>{
				const built={};
				const name=built.name=String;
				const alias_45of=built["alias-of"]=Type;
				return built
			}();
			const extensible=built.extensible=true;
			return _ms.setName(built,"Alias-Type")
		}());
		kind_33(Alias_45Type,Type);
		impl_33(contains_63,Alias_45Type,function(value){
			const _this=this;
			return contains_63(_this["alias-of"],value)
		});
		impl_33(sub,Alias_45Type,()=>{
			const built={};
			const test=built.test=function test(){
				const built=new global.Map();
				const _632=Alias_45Type(()=>{
					const built={};
					const alias_45of=built["alias-of"]=_ms.unlazy(_63);
					return _ms.setName(built,"?2")
				}());
				_ms.assoc(built,[_632,String],_ms.sub(_ms.unlazy(_63),String));
				return built
			};
			return _ms.set(function(){
				const _this=this;
				const args=[].slice.call(arguments,0);
				return Function.apply.call(sub,null,[].concat(_this["alias-of"],_ms.arr(args)))
			},built)
		}());
		const name=exports.name=`Alias-Type`;
		exports.default=Alias_45Type;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL0FsaWFzLVR5cGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQVVBLG1CQUFZLGVBQ1E7O0dBQW5CLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtJQUFQLFFBQUksaUJBQ1U7O0tBQWIsbUNBQVU7OztlQUNILFlBQVUsRUFBRztxQ0FDVixFQUFFO0dBQUE7R0FDZCw0QkFDTTs7SUFBTCxzQkFBTTtJQUNOLG1DQUFVOzs7R0FDWCxrQ0FBWTs7O0VBRWIsUUFBTSxhQUFXO0VBR2pCLFFBQU0sWUFBVSxhQUFhLFNBQUEsTUFDSzs7VUFBakMsWUFBVSxrQkFBVTtFQUFBO0VBR3JCLFFBQU0sSUFBSSxpQkFDVTs7R0FBbkIsc0JBQ08sZUFBQTs7SUFBTixXQUFLLGlCQUNVOztLQUFkOzs7b0JBQ0QsQ0FBRSxLQUFHLGdDQUFjOzs7a0JBQ2xCLFVBQ087OzsrQkFBUixtQkFBSSwwQkFBVTtHQUFBOztFQW5DaEIsd0JBQUE7a0JBVUEiLCJmaWxlIjoiVHlwZS9BbGlhcy1UeXBlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=