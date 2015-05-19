"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Boolean","../compare","../js","../private/bootstrap","../private/js-impl","./Method","./Obj-Type","../at/at","./Impl-Type","../methods","../bang","../Try","./Method","./Type"],function(exports,Boolean_0,compare_1,js_2,bootstrap_3,js_45impl_4,Method_5,Obj_45Type_6,_64_7,Impl_45Type_8,methods_9,_33_10,Try_11,Method_12,Type_13){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),or=_$2.or,not=_$2.not,_$3=_ms.getModule(compare_1),_61_63=_$3["=?"],_$4=_ms.getModule(js_2),defined_63=_$4["defined?"],js_45sub=_$4["js-sub"],_$5=_ms.getModule(bootstrap_3),implContains=_$5.implContains,pAdd=_$5.pAdd,_$6=_ms.getModule(js_45impl_4),isEmpty=_$6.isEmpty,KindContains=_$6.KindContains,_$7=_ms.getModule(Method_5),impl_33=_$7["impl!"],propagate_45method_45down_33=_$7["propagate-method-down!"],self_45impl_33=_$7["self-impl!"],Obj_45Type=_ms.getDefaultExport(Obj_45Type_6),_64=_ms.lazy(function(){
			return _ms.getDefaultExport(_64_7)
		}),_$10=_ms.lazyGetModule(_64_7),flat_45map=_ms.lazyProp(_$10,"flat-map"),Impl_45Type=_ms.lazy(function(){
			return _ms.getDefaultExport(Impl_45Type_8)
		}),_$11=_ms.lazyGetModule(Impl_45Type_8),self_45type=_ms.lazyProp(_$11,"self-type"),_$12=_ms.lazyGetModule(methods_9),freeze=_ms.lazyProp(_$12,"freeze"),frozen_63=_ms.lazyProp(_$12,"frozen?"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_10)
		}),_$14=_ms.lazyGetModule(_33_10),_33not=_ms.lazyProp(_$14,"!not"),Try=_ms.lazy(function(){
			return _ms.getDefaultExport(Try_11)
		}),_$15=_ms.lazyGetModule(Try_11),fails_45with_63=_ms.lazyProp(_$15,"fails-with?"),Method=_ms.lazy(function(){
			return _ms.getDefaultExport(Method_12)
		}),_$17=_ms.lazyGetModule(Type_13),contains_63=_ms.lazyProp(_$17,"contains?");
		const Kind=Obj_45Type(function(){
			const doc="A Kind is like a tag you can apply to a Concrete-Type to signify that it belongs in some category.\nThat category is typically a group of types all of which implement the same set of methods.\nType checking for Kind membership is O(1).\n-\nThe `prototype` on a Kind is not meant to be used as a prototype.\nIt stores the impl!_s that have been done on the Kind0.\nimpl! and kind! make sure that Concrete-Types receive the methods of their Kinds.\nThey require the Kind to correctly track super-kinds and implementors.";
			const props=function(){
				const name=String;
				const super_45kinds=Array;
				const prototype=Object;
				const implementors=Array;
				const symbol_45for_45isa=Symbol;
				return {
					name:name,
					"super-kinds":super_45kinds,
					prototype:prototype,
					implementors:implementors,
					"symbol-for-isa":symbol_45for_45isa
				}
			}();
			const extensible=true;
			const defaults=function(){
				const super_45kinds=function super_45kinds(){
					return Array(0)
				};
				const prototype=function prototype(){
					return Object.create(null)
				};
				const implementors=function implementors(){
					return Array(0)
				};
				const symbol_45for_45isa=function symbol_45for_45isa(_){
					return Symbol(("isa-"+_ms.show(_.name)))
				};
				return {
					"super-kinds":super_45kinds,
					prototype:prototype,
					implementors:implementors,
					"symbol-for-isa":symbol_45for_45isa,
					name:"defaults"
				}
			}();
			const post_45construct=function post_45construct(_){
				pAdd(_.prototype,_["symbol-for-isa"],true);
				if(! isEmpty(_.implementors)){
					_.implementors.forEach(function(implementor){
						return on_45implementor_33(implementor,_)
					});
					_ms.unlazy(freeze)(_.implementors)
				}
			};
			return {
				doc:doc,
				props:props,
				extensible:extensible,
				defaults:defaults,
				"post-construct":post_45construct,
				name:"Kind"
			}
		}());
		implContains(Kind,KindContains);
		const can_45subtype_63=exports["can-subtype?"]=function(){
			const doc="Whether a Kind accepts new subtypes.";
			return _ms.set(function can_45subtype_63(_){
				return not(_ms.unlazy(frozen_63)(_.implementors))
			},"doc",doc)
		}();
		const unchecked_45kind_33=exports["unchecked-kind!"]=function(){
			const doc="kind! without any checks.\nNecessary if trying to implement Impl-Type itself.";
			return _ms.set(function unchecked_45kind_33(implementor,kind){
				kind.implementors.push(implementor);
				return on_45implementor_33(implementor,kind)
			},"doc",doc)
		}();
		const concrete_45implementors=exports["concrete-implementors"]=function(){
			const doc="List of Impl-Types inheriting from this.\nDoes not include inheriting Kinds, but does include their implementors.";
			return _ms.set(function concrete_45implementors(kind){
				return _ms.unlazy(flat_45map)(kind.implementors,function(_){
					return function(){
						if(_ms.contains(Kind,_)){
							return concrete_45implementors(_)
						} else {
							return [_]
						}
					}()
				})
			},"doc",doc)
		}();
		const kind_33=exports["kind!"]=function(){
			const doc="Makes one Impl-Type a subtype of a Kind.\nKinds can subtype each other.";
			return _ms.set(function kind_33(implementor,kind,method_45impls){
				unchecked_45kind_33(implementor,kind);
				if(defined_63(method_45impls)){
					for(let _ of _ms.iterator(method_45impls)){
						impl_33(_.key,implementor,_.val)
					}
				}
			},"doc",doc)
		}();
		const self_45kind_33=exports["self-kind!"]=function(){
			const doc="TODO";
			return _ms.set(function self_45kind_33(implementor,kind,method_45impls){
				kind_33(_ms.unlazy(self_45type)(implementor),kind);
				if(defined_63(method_45impls)){
					for(let _ of _ms.iterator(method_45impls)){
						self_45impl_33(_.key,implementor,_.val)
					}
				}
			},"doc",doc)
		}();
		const kind_63=exports["kind?"]=function(){
			const doc="Whether one Impl-Type is a subtype of a Kind.\"\nimplementor may itself be a Kind.";
			return _ms.set(function kind_63(implementor,kind){
				return function(){
					const _=implementor;
					if(_ms.contains(Kind,_)){
						return _["super-kinds"].some(function(_super){
							return or(_61_63(_super,kind),_ms.lazy(function(){
								return kind_63(_super,kind)
							}))
						})
					} else {
						const _=implementor.prototype;
						return _ms.contains(kind,_)
					}
				}()
			},"doc",doc)
		}();
		const _64p_45all=function _64p_45all(_){
			return Object.getOwnPropertyNames(_).concat(Object.getOwnPropertySymbols(_))
		};
		const on_45implementor_33=function on_45implementor_33(_,kind){
			if(_ms.contains(Kind,_)){
				_["super-kinds"].push(kind)
			};
			return inherit_45methods_33(_,kind)
		};
		const inherit_45methods_33=function inherit_45methods_33(implementor,kind){
			const rec_33=function rec_33(kind){
				_64p_45all(kind.prototype).forEach(function(name){
					return propagate_45method_45down_33(implementor,name,js_45sub(kind.prototype,name))
				});
				return kind["super-kinds"].forEach(rec_33)
			};
			return rec_33(kind)
		};
		const name=exports.name="Kind";
		exports.default=Kind;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL0tpbmQubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0VBa0JBLFdBQU8scUJBQ1E7R0FBZCxVQUNDO0dBbURELHNCQUNNO0lBQUwsV0FBTTtJQUNOLG9CQUFhO0lBQ2IsZ0JBQVc7SUFHWCxtQkFBYztJQUNkLHlCQUFnQjs7Ozs7Ozs7O0dBQ2pCLGlCQUFZO0dBQ1oseUJBQ1M7SUFBUixvQkFDYyx3QkFBQTtZQUFiLE1BQU07SUFBQTtJQUNQLGdCQUNZLG9CQUFBO1lBQVgsY0FBYztJQUFBO0lBQ2YsbUJBQ2UsdUJBQUE7WUFBZCxNQUFNO0lBQUE7SUFDUCx5QkFBaUIsNEJBQUEsRUFDQztZQUFqQixPQUFRLGlCQUFLOzs7Ozs7Ozs7O0dBQ2YsdUJBQWlCLDBCQUFBLEVBQ0M7SUFBakIsS0FBSyxZQUFZLG9CQUFpQjtJQUNsQyxLQUFRLFFBQVEsZ0JBQ2M7S0FBN0IsdUJBQXdCLFNBQUEsWUFDVzthQUFsQyxvQkFBZ0IsWUFBWTtLQUFBO3dCQUN0Qjs7Ozs7Ozs7Ozs7O0VBRVYsYUFBYSxLQUFLO0VBRWxCLHlEQUNhO0dBQVosVUFBTTtrQkFJTCwwQkFBQSxFQUNNO1dBQU4sMEJBQWE7OztFQUdmLCtEQUNnQjtHQUFmLFVBQ0M7a0JBRUEsNkJBQUEsWUFBWSxLQUNJO0lBQWhCLHVCQUF1QjtXQUN2QixvQkFBZ0IsWUFBWTtHQUFBOztFQUU5Qix5RUFDc0I7R0FBckIsVUFDQztrQkFpQkEsaUNBQWMsS0FDUztrQ0FBZCxrQkFBbUIsU0FBQSxFQUFBOztNQUMzQixnQkFBQyxLQUFELEdBQ0s7Y0FBSix3QkFBQTtNQUFBLE9BRUc7Y0FBSCxDQUFFO01BQUE7S0FBQTtJQUFBO0dBQUE7O0VBRU4seUNBQ007R0FBTCxVQUNDO2tCQUtBLGlCQUFBLFlBQVksS0FBVSxlQUt0QjtJQUFBLG9CQUFnQixZQUFZO0lBQzVCLEdBQUksV0FBUyxnQkFDWTtLQUFuQixRQUFBLGtCQUFBLGdCQUNZO01BQWhCLFFBQU0sTUFBTSxZQUFZOzs7OztFQUU1QixxREFDVztHQUFWLFVBQU07a0JBR0wsd0JBQUEsWUFBbUIsS0FBVSxlQUNZO0lBQXpDLGdDQUFpQixhQUFhO0lBQzlCLEdBQUksV0FBUyxnQkFDWTtLQUFuQixRQUFBLGtCQUFBLGdCQUNZO01BQWhCLGVBQVcsTUFBTSxZQUFZOzs7OztFQUVqQyx5Q0FDTTtHQUFMLFVBQ0M7a0JBSUEsaUJBQUEsWUFBWSxLQUNTOztLQUFoQixRQUFBO0tBQ0osZ0JBQUMsS0FBRCxHQUNLO2FBQUosc0JBQW9CLFNBQUEsT0FDSztjQUF4QixHQUFJLE9BQUcsT0FBTTtlQUFRLFFBQU0sT0FBTTtPQUFBO01BQUE7S0FBQSxPQUUvQjtNQUFILFFBQUk7MEJBQ0gsS0FBRDtLQUFBO0lBQUE7R0FBQTs7RUFHSCxpQkFBVSxvQkFBQSxFQUNDO1VBQVQsMkJBQTJCLFVBQVcsNkJBQTZCO0VBQUE7RUFFckUsMEJBQW1CLDZCQUFBLEVBQUUsS0FDSTtHQUF4QixnQkFBSyxLQUFELEdBQ0s7SUFBUixzQkFBbUI7R0FBQTtVQUNwQixxQkFBaUIsRUFBRTtFQUFBO0VBRXBCLDJCQUFvQiw4QkFBQSxZQUFZLEtBQ0k7R0FBbkMsYUFBUSxnQkFBQSxLQUNJO0lBQVYsV0FBTyx3QkFBeUIsU0FBQSxLQUNJO1lBQXBDLDZCQUF1QixZQUFZLEtBQU0sU0FBTyxlQUFlO0lBQUE7V0FDaEUsNEJBQXlCO0dBQUE7VUFDMUIsT0FBSztFQUFBO0VBck1QLHdCQUFBO2tCQXVNQSIsImZpbGUiOiJUeXBlL0tpbmQuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==