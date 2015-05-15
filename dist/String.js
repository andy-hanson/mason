"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Boolean","./compare","./js","./RegExp","./Type/Kind","./Type/Method","./Type/Pred-Type","./at/at"],function(exports,Boolean_0,compare_1,js_2,RegExp_3,Kind_4,Method_5,Pred_45Type_6,_64_7){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_ms.get(_$2,"and"),compare=_ms.getDefaultExport(compare_1),_$3=_ms.getModule(compare_1),_61_63=_ms.get(_$3,"=?"),_$4=_ms.getModule(js_2),id_61_63=_ms.get(_$4,"id=?"),_$5=_ms.getModule(RegExp_3),regexp=_ms.get(_$5,"regexp"),Kind=_ms.getDefaultExport(Kind_4),_$7=_ms.getModule(Method_5),impl_33=_ms.get(_$7,"impl!"),Pred_45Type=_ms.getDefaultExport(Pred_45Type_6),_$10=_ms.lazyGetModule(_64_7),count=_ms.lazyProp(_$10,"count");
		const String_45Test=exports["String-Test"]=Kind(function(){
			const doc="Something we can compare a String to.";
			const implementors=[String,RegExp];
			return {
				doc:doc,
				implementors:implementors,
				displayName:"String-Test"
			}
		}());
		const _45_62upper=exports["->upper"]=function(){
			const doc="Converts a-z to A-Z.";
			const test=function(){
				return _ms.set(function(){
					const _k0=["hi"],_v0="HI";
					return _ms.map(_k0,_v0)
				},"displayName","test")
			}();
			return _ms.set(function(_){
				_ms.checkContains(String,_,"_");
				return _.toUpperCase()
			},"doc",doc,"test",test,"displayName","->upper")
		}();
		const Char=exports.Char=Pred_45Type(function(){
			const doc="Any String with only one character.";
			const predicate=function(){
				return _ms.set(function(_){
					return and(_ms.contains(String,_),_ms.lazy(function(){
						return _61_63(_ms.unlazy(count)(_),1)
					}))
				},"displayName","predicate")
			}();
			return {
				doc:doc,
				predicate:predicate,
				displayName:"Char"
			}
		}());
		const indent=exports.indent=function(){
			const doc="Adds a `\\t` to all `\\n` in `str`.\nDoes *not* do anything to the first line.";
			const test=function(){
				return _ms.set(function(){
					const s="a\nb";
					const s_45indented="a\n\tb";
					const _k0=[s],_v0=s_45indented;
					const _k1=["a"],_v1="a";
					return _ms.map(_k0,_v0,_k1,_v1)
				},"displayName","test")
			}();
			return _ms.set(function(_){
				_ms.checkContains(String,_,"_");
				return (""+_ms.show(_.replace(regexp("\n","g"),"\n\t")))
			},"doc",doc,"test",test,"displayName","indent")
		}();
		const split_45str=exports["split-str"]=function(){
			const doc="Like `@.split` but using a String-Test instead of a predicate.";
			const test=function(){
				return _ms.set(function(){
					const _k0=[" ","I am a String"],_v0=["I","am","a","String"];
					const _k1=[regexp("."),"abc"],_v1=["","","",""];
					return _ms.map(_k0,_v0,_k1,_v1)
				},"displayName","test")
			}();
			return _ms.set(function(splitter,_){
				_ms.checkContains(String_45Test,splitter,"splitter");
				_ms.checkContains(String,_,"_");
				return _ms.checkContains(_ms.sub(Array,String),_.split(splitter),"res")
			},"doc",doc,"test",test,"displayName","split-str")
		}();
		impl_33(_61_63,String,id_61_63);
		const displayName=exports.displayName="String";
		exports.default=impl_33(compare,String,function(a,b){
			return a.localeCompare(b)
		});
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9TdHJpbmcubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFXQSwyQ0FBYSxlQUNJO0dBQWhCLFVBQU07R0FDTixtQkFBYyxDQUFFLE9BQU87Ozs7Ozs7RUFFeEIsK0NBQ1E7R0FBUCxVQUFNO0dBQ04scUJBQ087bUJBQUEsVUFBQTtLQUFOLFVBQUEsQ0FBRyxVQUFVOzs7O2tCQUNiLFNBQUEsRUFDUTtzQkFETjtXQUNGOzs7RUFFRix3QkFBTSxzQkFDUztHQUFkLFVBQU07R0FDTiwwQkFBWTttQkFBQSxTQUFBLEVBQ0M7WUFBWixpQkFBSyxPQUFEO2FBQVUseUJBQUcsR0FBTztLQUFBO0lBQUE7Ozs7Ozs7O0VBRTFCLHNDQUNPO0dBQU4sVUFDQztHQUVELHFCQUNPO21CQUFBLFVBQUE7S0FBTixRQUNDO0tBR0QsbUJBQ0M7S0FHRCxVQUFBLENBQUUsT0FBTztLQUNULFVBQUEsQ0FBRyxTQUFTOzs7O2tCQUNaLFNBQUEsRUFDUTtzQkFETjtXQUNELENBTXFDLFlBTnBDLFVBQVcsT0FBUSxLQUFLLEtBQUs7R0FBQTs7RUFFakMsaURBQ1U7R0FBVCxVQUFNO0dBQ04scUJBQ087bUJBQUEsVUFBQTtLQUFOLFVBQUEsQ0FBRyxJQUFJLHFCQUFvQixDQUFHLElBQUksS0FBSyxJQUFJO0tBQzNDLFVBQUEsQ0FBRyxPQUFRLEtBQUssV0FBVSxDQUFZOzs7O2tCQUN0QyxTQUFlLFNBQXFCLEVBQ1E7c0JBRHBCO3NCQUFjO3FDQUFyQyxNQUFNLFFBQ1AsUUFBUTs7O0VBRVYsUUFBTSxPQUFHLE9BQU87RUFyRGhCLHNDQUFBO2tCQXNEQSxRQUFNLFFBQVEsT0FBUSxTQUFBLEVBQUUsRUFDQztVQUF4QixnQkFBZ0I7RUFBQSIsImZpbGUiOiJTdHJpbmcuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==