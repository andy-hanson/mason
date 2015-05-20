"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Boolean","./compare","./js","./Type/Kind","./Type/Method","./Type/Pred-Type","./at/at"],function(exports,Boolean_0,compare_1,js_2,Kind_3,Method_4,Pred_45Type_5,_64_6){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_ms.get(_$2,"and"),compare=_ms.getDefaultExport(compare_1),_$3=_ms.getModule(compare_1),_61_63=_ms.get(_$3,"=?"),_$4=_ms.getModule(js_2),id_61_63=_ms.get(_$4,"id=?"),Kind=_ms.getDefaultExport(Kind_3),_$6=_ms.getModule(Method_4),impl_33=_ms.get(_$6,"impl!"),Pred_45Type=_ms.getDefaultExport(Pred_45Type_5),_$9=_ms.lazyGetModule(_64_6),count=_ms.lazyProp(_$9,"count");
		const String_45Test=exports["String-Test"]=Kind(function(){
			const doc="Something we can compare a String to.";
			const implementors=[String,RegExp];
			return {
				doc:doc,
				implementors:implementors,
				name:"String-Test"
			}
		}());
		const _45_62upper=exports["->upper"]=function(){
			const doc="Converts a-z to A-Z.";
			const test=function test(){
				const _k0=["hi"],_v0="HI";
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function _45_62upper(_){
				_ms.checkContains(String,_,"_");
				return _.toUpperCase()
			},"doc",doc,"test",test)
		}();
		const Char=exports.Char=Pred_45Type(function(){
			const doc="Any String with only one character.";
			const predicate=function predicate(_){
				return and(_ms.contains(String,_),_ms.lazy(function(){
					return _61_63(_ms.unlazy(count)(_),1)
				}))
			};
			return {
				doc:doc,
				predicate:predicate,
				name:"Char"
			}
		}());
		const indent=exports.indent=function(){
			const doc="Adds a `\\t` to all `\\n` in `str`.\nDoes *not* do anything to the first line.";
			const test=function test(){
				const s="a\nb";
				const s_45indented="a\n\tb";
				const _k0=[s],_v0=s_45indented;
				const _k1=["a"],_v1="a";
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function indent(_){
				_ms.checkContains(String,_,"_");
				return _.replace(RegExp("\n","g"),"\n\t")
			},"doc",doc,"test",test)
		}();
		const split_45str=exports["split-str"]=function(){
			const doc="Like `@.split` but using a String-Test instead of a predicate.";
			const test=function test(){
				const _k0=[" ","I am a String"],_v0=["I","am","a","String"];
				const _k1=[RegExp("."),"abc"],_v1=["","","",""];
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function split_45str(splitter,_){
				_ms.checkContains(String_45Test,splitter,"splitter");
				_ms.checkContains(String,_,"_");
				return _ms.checkContains(_ms.sub(Array,String),_.split(splitter),"res")
			},"doc",doc,"test",test)
		}();
		impl_33(_61_63,String,id_61_63);
		const name=exports.name="String";
		exports.default=impl_33(compare,String,function(a,b){
			return a.localeCompare(b)
		});
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9TdHJpbmcubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFVQSwyQ0FBYSxlQUNJO0dBQWhCLFVBQU07R0FDTixtQkFBYyxDQUFFLE9BQU87Ozs7Ozs7RUFFeEIsK0NBQ1E7R0FBUCxVQUFNO0dBQ04sV0FDTyxlQUFBO0lBQU4sVUFBQSxDQUFHLFVBQVU7OztrQkFDYixxQkFBQSxFQUNRO3NCQUROO1dBQ0Y7OztFQUVGLHdCQUFNLHNCQUNTO0dBQWQsVUFBTTtHQUNOLGdCQUFZLG1CQUFBLEVBQ0M7V0FBWixpQkFBSyxPQUFEO1lBQVUseUJBQUcsR0FBTztJQUFBO0dBQUE7Ozs7Ozs7RUFFMUIsc0NBQ087R0FBTixVQUNDO0dBRUQsV0FDTyxlQUFBO0lBQU4sUUFDQztJQUdELG1CQUNDO0lBR0QsVUFBQSxDQUFFLE9BQU87SUFDVCxVQUFBLENBQUcsU0FBUzs7O2tCQUNaLGdCQUFBLEVBQ1E7c0JBRE47V0FDRixVQUFXLE9BQVEsS0FBSyxLQUFLO0dBQUE7O0VBRS9CLGlEQUNVO0dBQVQsVUFBTTtHQUNOLFdBQ08sZUFBQTtJQUFOLFVBQUEsQ0FBRyxJQUFJLHFCQUFvQixDQUFHLElBQUksS0FBSyxJQUFJO0lBQzNDLFVBQUEsQ0FBRyxPQUFRLEtBQUssV0FBVSxDQUFZOzs7a0JBQ3RDLHFCQUFlLFNBQXFCLEVBQ1E7c0JBRHBCO3NCQUFjO3FDQUFyQyxNQUFNLFFBQ1AsUUFBUTs7O0VBRVYsUUFBTSxPQUFHLE9BQU87RUFwRGhCLHdCQUFBO2tCQXFEQSxRQUFNLFFBQVEsT0FBUSxTQUFBLEVBQUUsRUFDQztVQUF4QixnQkFBZ0I7RUFBQSIsImZpbGUiOiJTdHJpbmcuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==