"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../methods","./Kind","./Method","./Obj-Type","./Type","../bang","../at/q","../compare"],function(exports,methods_0,Kind_1,Method_2,Obj_45Type_3,Type_4,_33_5,_63_6,compare_7){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(methods_0),sub=_ms.get(_$2,"sub"),_$3=_ms.getModule(Kind_1),kind_33=_ms.get(_$3,"kind!"),_$4=_ms.getModule(Method_2),impl_33=_ms.get(_$4,"impl!"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_3),Type=_ms.getDefaultExport(Type_4),_$6=_ms.getModule(Type_4),contains_63=_ms.get(_$6,"contains?"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_5)
		}),_$8=_ms.lazyGetModule(_33_5),_33not=_ms.lazyProp(_$8,"!not"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_6)
		}),_$10=_ms.lazyGetModule(compare_7),_61_63=_ms.lazyProp(_$10,"=?");
		const Alias_45Type=Obj_45Type(function(){
			const built={};
			const doc=built.doc=`Contains the same instances as another type (officially), but has its own meaning and identity.`;
			const test=built.test=function test(){
				const A=Alias_45Type(function(){
					const built={};
					const alias_45of=built["alias-of"]=String;
					return _ms.setName(built,"A")
				}());
				_ms.unlazy(_33)(contains_63,A,`0`);
				return _ms.unlazy(_33not)(_ms.unlazy(_61_63),A,String)
			};
			const props=built.props=function(){
				const built={};
				const name=built.name=String;
				const alias_45of=built["alias-of"]=Type;
				return built
			}();
			const extensible=built.extensible=true;
			return _ms.setName(built,"Alias-Type")
		}());
		kind_33(Alias_45Type,Type);
		impl_33(contains_63,Alias_45Type,function(_,value){
			return contains_63(_["alias-of"],value)
		});
		impl_33(sub,Alias_45Type,function(){
			const built={};
			const test=built.test=function test(){
				const built=new global.Map();
				const _632=Alias_45Type(function(){
					const built={};
					const alias_45of=built["alias-of"]=_ms.unlazy(_63);
					return _ms.setName(built,"?2")
				}());
				_ms.assoc(built,[_632,String],_ms.sub(_ms.unlazy(_63),String));
				return built
			};
			return _ms.set(function(_){
				const args=[].slice.call(arguments,1);
				return Function.apply.call(sub,null,[].concat(_["alias-of"],_ms.arr(args)))
			},built)
		}());
		const name=exports.name=`Alias-Type`;
		exports.default=Alias_45Type;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL0FsaWFzLVR5cGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0VBV0EsbUJBQVkscUJBQ1E7O0dBQW5CLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTtJQUFOLFFBQUksdUJBQ1U7O0tBQWIsbUNBQVU7OztvQkFDVCxZQUFVLEVBQUc7aURBQ1AsRUFBRTtHQUFBO0dBQ1gsa0NBQ007O0lBQUwsc0JBQU07SUFDTixtQ0FBVTs7O0dBQ1gsa0NBQVk7OztFQUViLFFBQU0sYUFBVztFQUdqQixRQUFNLFlBQVUsYUFBWSxTQUFBLEVBQUUsTUFDSztVQUFsQyxZQUFVLGNBQVc7RUFBQTtFQUd0QixRQUFNLElBQUksdUJBQ1U7O0dBQW5CLHNCQUNPLGVBQUE7O0lBQU4sV0FBSyx1QkFDVTs7S0FBZDs7O29CQUNELENBQUUsS0FBRyxnQ0FBYzs7O2tCQUNuQixTQUFBLEVBQ1M7OytCQUFULG1CQUFJLHNCQUFXO0dBQUE7O0VBcENqQix3QkFBQTtrQkFXQSIsImZpbGUiOiJUeXBlL0FsaWFzLVR5cGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==