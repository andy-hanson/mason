"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./js","./Obj","./Type/Alias-Type","./Type/Pred-Type","./control","./bang","./compare","./Obj","./Try"],function(exports,js_0,Obj_1,Alias_45Type_2,Pred_45Type_3,control_4,_33_5,compare_6,Obj_7,Try_8){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(js_0),js_45delete=_ms.get(_$2,"js-delete"),js_45set=_ms.get(_$2,"js-set"),Obj=_ms.getDefaultExport(Obj_1),_$3=_ms.getModule(Obj_1),Obj_45Key=_ms.get(_$3,"Obj-Key"),Alias_45Type=_ms.getDefaultExport(Alias_45Type_2),_$5=_ms.getModule(Pred_45Type_3),Opt=_ms.get(_$5,"Opt"),_$7=_ms.lazyGetModule(control_4),opr=_ms.lazyProp(_$7,"opr"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_5)
		}),_$9=_ms.lazyGetModule(_33_5),_33not=_ms.lazyProp(_$9,"!not"),_$10=_ms.lazyGetModule(compare_6),_61_63=_ms.lazyProp(_$10,"=?"),_$11=_ms.lazyGetModule(Obj_7),empty_45Obj_63=_ms.lazyProp(_$11,"empty-Obj?"),p_63=_ms.lazyProp(_$11,"p?"),prototype=_ms.lazyProp(_$11,"prototype"),_$12=_ms.lazyGetModule(Try_8),fails_63=_ms.lazyProp(_$12,"fails?");
		const exports={};
		const doc=exports.doc="For mutating Objs.";
		const Obj_33=Alias_45Type(function(){
			const doc="Obj which is at least partially mutable.";
			const alias_45of=Obj;
			return {
				doc:doc,
				"alias-of":alias_45of,
				displayName:"Obj!"
			}
		}());
		const empty_45Obj_33=exports["empty-Obj!"]=function(){
			const doc="Creates a new Obj! with no properties and the given prototype.";
			const test=function(){
				const _=empty_45Obj_33();
				_ms.unlazy(_33)(_ms.unlazy(empty_45Obj_63),_);
				const child=empty_45Obj_33(_);
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),_,_ms.unlazy(prototype)(child))
			};
			return _ms.set(function(_63prototype){
				_ms.checkContains(_ms.sub(Opt,Obj),_63prototype,"?prototype");
				const prototype=_ms.unlazy(opr)(_63prototype,Obj.prototype);
				return Obj.create(prototype)
			},"doc",doc,"test",test,"displayName","empty-Obj!")
		}();
		const p_43_33=exports["p+!"]=function(){
			const doc="Adds a new immutable property.";
			const test=function(){
				const _=empty_45Obj_33();
				p_43_33(_,"a",1);
				_ms.unlazy(_33)(_ms.unlazy(_61_63),_.a,1);
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return p_43_33(_,"a",2)
				});
				return _ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return p_43_33("string","a",1)
				})
			};
			return _ms.set(function(_,name,val){
				_ms.checkContains(Obj_33,_,"_");
				_ms.checkContains(Obj_45Key,name,"name");
				Obj.defineProperty(_,name,function(){
					const enumerable=true;
					const writable=false;
					const value=val;
					return {
						enumerable:enumerable,
						writable:writable,
						value:value
					}
				}());
				return null
			},"doc",doc,"test",test,"displayName","p+!")
		}();
		const p_43mut_33=exports["p+mut!"]=function(){
			const doc="Adds a new mutable property.";
			const test="See `p!`";
			return _ms.set(function(_,name,val){
				_ms.checkContains(Obj_33,_,"_");
				_ms.checkContains(Obj_45Key,name,"name");
				Obj.defineProperty(_,name,function(){
					const enumerable=true;
					const writable=true;
					const value=val;
					const configurable=true;
					return {
						enumerable:enumerable,
						writable:writable,
						value:value,
						configurable:configurable
					}
				}());
				return null
			},"doc",doc,"test",test,"displayName","p+mut!")
		}();
		const p_33=exports["p!"]=function(){
			const doc="Modifies an already-existing property.";
			const test=function(){
				const _=empty_45Obj_33();
				p_43mut_33(_,"a",1);
				p_33(_,"a",2);
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),_.a,2)
			};
			return _ms.set(function(_,name,new_45val){
				_ms.checkContains(Obj_33,_,"_");
				_ms.checkContains(Obj_45Key,name,"name");
				_ms.unlazy(_33)(_ms.unlazy(p_63),_,name);
				return js_45set(_,name,new_45val)
			},"doc",doc,"test",test,"displayName","p!")
		}();
		const p_45_33=exports["p-!"]=function(){
			const test=function(){
				const _=empty_45Obj_33();
				p_43mut_33(_,"a",1);
				p_45_33(_,"a");
				return _ms.unlazy(_33not)(_ms.unlazy(p_63),_,"a")
			};
			return _ms.set(function(_,name){
				_ms.checkContains(Obj_33,_,"_");
				_ms.checkContains(Obj_45Key,name,"name");
				_ms.unlazy(_33)(_ms.unlazy(p_63),_,name);
				return js_45delete(_,name)
			},"test",test,"displayName","p-!")
		}();
		const extend_33=exports["extend!"]=function(){
			const doc="Adds all the properties in `extender` to `_`.";
			const test=function(){
				const _=empty_45Obj_33();
				extend_33(_,function(){
					const a=1;
					return {
						a:a
					}
				}());
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),_.a,1)
			};
			return _ms.set(function(_,extender){
				_ms.checkContains(Obj_33,_,"_");
				_ms.checkContains(Obj,extender,"extender");
				return Obj.assign(_,extender)
			},"doc",doc,"test",test,"displayName","extend!")
		}();
		exports.default=Obj_33;
		const displayName=exports.displayName="Obj!";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9PYmohLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztpQ0FhQTs7Ozs7RUFBQSxzQkFBTTtFQUVOLGFBQU8sdUJBQ1U7R0FBaEIsVUFBTTtHQUNOLGlCQUFVO1VBRE07Ozs7OztFQUdqQixxREFDVztHQUFWLFVBQU07R0FDTixXQUNPLFVBQUE7SUFBTixRQUFJOytDQUNTO0lBQ2IsWUFBUSxlQUFXOzhDQUNkLHdCQUFhO0dBQUE7a0JBQ2xCLFNBQUEsYUFDbUI7OEJBRFIsSUFBSTtJQUNmLGdDQUFnQixhQUFXO1dBQzNCLFdBQVc7R0FBQTs7RUFFYix1Q0FDSTtHQUFILFVBQU07R0FDTixXQUNPLFVBQUE7SUFBTixRQUFJO0lBQ0osUUFBSSxFQUFHLElBQUc7dUNBQ0wsSUFBSTt5Q0FFQyxVQUFBO1lBQVQsUUFBSSxFQUFHLElBQUc7SUFBQTtnREFFRCxVQUFBO1lBQVQsUUFBSyxTQUFTLElBQUc7SUFBQTtHQUFBO2tCQUNsQixTQUFBLEVBQU8sS0FBYSxJQUNHO3NCQURyQjtzQkFBVTtJQUNaLG1CQUFtQixFQUFFLGVBQ0k7S0FBeEIsaUJBQUE7S0FDQSxlQUFVO0tBQ1YsWUFBTztZQUZpQjs7Ozs7O1dBR3pCO0dBQUE7O0VBRUYsNkNBQ087R0FBTixVQUFNO0dBQ04sV0FBTztrQkFDTixTQUFBLEVBQU8sS0FBYSxJQUNHO3NCQURyQjtzQkFBVTtJQUNaLG1CQUFtQixFQUFFLGVBQ0k7S0FBeEIsaUJBQUE7S0FDQSxlQUFBO0tBQ0EsWUFBTztLQUNQLG1CQUFBO1lBSHdCOzs7Ozs7O1dBSXpCO0dBQUE7O0VBRUYsbUNBQ0c7R0FBRixVQUFNO0dBQ04sV0FDTyxVQUFBO0lBQU4sUUFBSTtJQUNKLFdBQU8sRUFBRyxJQUFHO0lBQ2IsS0FBRyxFQUFHLElBQUc7OENBQ0osSUFBSTtHQUFBO2tCQUNULFNBQUEsRUFBTyxLQUFhLFVBSXBCO3NCQUpFO3NCQUFVO3FDQUVOLEVBQUU7V0FFUixTQUFPLEVBQUUsS0FBSztHQUFBOztFQUVoQix1Q0FDSTtHQUFILFdBQ08sVUFBQTtJQUFOLFFBQUk7SUFDSixXQUFPLEVBQUcsSUFBRztJQUNiLFFBQUksRUFBRzsrQ0FDQyxFQUFHO0dBQUE7a0JBQ1gsU0FBQSxFQUFPLEtBSVA7c0JBSkU7c0JBQVU7cUNBRU4sRUFBRTtXQUVSLFlBQVUsRUFBRTtHQUFBOztFQUdkLDZDQUNRO0dBQVAsVUFBTTtHQUNOLFdBQ08sVUFBQTtJQUFOLFFBQUk7SUFDSixVQUFRLFlBQ0M7S0FBUixRQUFHO1lBQUs7Ozs7OENBQ0osSUFBSTtHQUFBO2tCQUNULFNBQUEsRUFBTyxTQUNZO3NCQURqQjtzQkFBYztXQUNoQixXQUFXLEVBQUU7R0FBQTs7a0JBRWY7RUE5RkEsc0NBQUEiLCJmaWxlIjoiT2JqYmFuZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9