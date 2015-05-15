"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Bool","../compare","../js","../private/bootstrap","../private/js-impl","./Method","./Obj-Type","../at/at","../control","./Impl-Type","../methods","../bang","../Try","./Method","./Type"],function(exports,Bool_0,compare_1,js_2,bootstrap_3,js_45impl_4,Method_5,Obj_45Type_6,_64_7,control_8,Impl_45Type_9,methods_10,_33_11,Try_12,Method_13,Type_14){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Bool_0),or=_ms.get(_$2,"or"),not=_ms.get(_$2,"not"),_$3=_ms.getModule(compare_1),_61_63=_ms.get(_$3,"=?"),_$4=_ms.getModule(js_2),defined_63=_ms.get(_$4,"defined?"),js_45sub=_ms.get(_$4,"js-sub"),_$5=_ms.getModule(bootstrap_3),impl_45contains_63_33=_ms.get(_$5,"impl-contains?!"),Obj=_ms.get(_$5,"Obj"),p_43_33=_ms.get(_$5,"p+!"),Str=_ms.get(_$5,"Str"),_$6=_ms.getModule(js_45impl_4),isEmpty=_ms.get(_$6,"isEmpty"),KindContains=_ms.get(_$6,"KindContains"),_$7=_ms.getModule(Method_5),impl_33=_ms.get(_$7,"impl!"),propagate_45method_45down_33=_ms.get(_$7,"propagate-method-down!"),self_45impl_33=_ms.get(_$7,"self-impl!"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_6),_64=_ms.lazy(function(){
			return _ms.getDefaultExport(_64_7)
		}),_$10=_ms.lazyGetModule(_64_7),each_33=_ms.lazyProp(_$10,"each!"),flat_45map=_ms.lazyProp(_$10,"flat-map"),_$11=_ms.lazyGetModule(control_8),if_33=_ms.lazyProp(_$11,"if!"),Impl_45Type=_ms.lazy(function(){
			return _ms.getDefaultExport(Impl_45Type_9)
		}),_$12=_ms.lazyGetModule(Impl_45Type_9),self_45type=_ms.lazyProp(_$12,"self-type"),_$13=_ms.lazyGetModule(methods_10),freeze=_ms.lazyProp(_$13,"freeze"),frozen_63=_ms.lazyProp(_$13,"frozen?"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_11)
		}),_$15=_ms.lazyGetModule(_33_11),_33not=_ms.lazyProp(_$15,"!not"),Try=_ms.lazy(function(){
			return _ms.getDefaultExport(Try_12)
		}),_$16=_ms.lazyGetModule(Try_12),fails_45with_63=_ms.lazyProp(_$16,"fails-with?"),Method=_ms.lazy(function(){
			return _ms.getDefaultExport(Method_13)
		}),_$18=_ms.lazyGetModule(Type_14),contains_63=_ms.lazyProp(_$18,"contains?");
		const Kind=Obj_45Type(function(){
			const doc="A Kind is like a tag you can apply to a Concrete-Type to signify that it belongs in some category.\nThat category is typically a group of types all of which implement the same set of methods.\nType checking for Kind membership is O(1).\n-\nThe `prototype` on a Kind is not meant to be used as a prototype.\nIt stores the impl!_s that have been done on the Kind0.\nimpl! and kind! make sure that Concrete-Types receive the methods of their Kinds.\nThey require the Kind to correctly track super-kinds and implementors.";
			const test=function(){
				return _ms.set(function(){
					const A=Kind(function(){
						const doc="A";
						return {
							doc:doc,
							displayName:"A"
						}
					}());
					const B=Kind(function(){
						const doc="B";
						return {
							doc:doc,
							displayName:"B"
						}
					}());
					const C=Obj_45Type(function(){
						const props=function(){
							const c=null;
							return {
								c:c,
								displayName:"props"
							}
						}();
						return {
							props:props,
							displayName:"C"
						}
					}());
					kind_33(B,A);
					kind_33(C,B);
					const c=C(function(){
						const c=1;
						return {
							c:c,
							displayName:"c"
						}
					}());
					_ms.unlazy(_33)(_ms.unlazy(contains_63),A,c);
					const X=Kind(function(){
						const doc="X";
						return {
							doc:doc,
							displayName:"X"
						}
					}());
					const Y=Kind(function(){
						const doc="Y";
						return {
							doc:doc,
							displayName:"Y"
						}
					}());
					const Z=Obj_45Type(function(){
						const props=function(){
							const x=null;
							return {
								x:x,
								displayName:"props"
							}
						}();
						return {
							props:props,
							displayName:"Z"
						}
					}());
					kind_33(Z,Y);
					kind_33(Y,X);
					const z=Z(function(){
						const x=1;
						return {
							x:x,
							displayName:"z"
						}
					}());
					_ms.unlazy(_33)(_ms.unlazy(contains_63),X,z);
					const asdf=_ms.unlazy(Method)(function(){
						const doc="asdf_s its arguments.";
						return {
							doc:doc,
							displayName:"asdf"
						}
					}());
					impl_33(asdf,X,function(){
						return 1
					});
					_ms.unlazy(_33)(_61_63,asdf(z),1);
					_ms.unlazy(_33)(_ms.unlazy(contains_63),X,z);
					const Closed=Kind(function(){
						const implementors=[C,Z];
						return {
							implementors:implementors,
							displayName:"Closed"
						}
					}());
					return _ms.unlazy(_33)(_ms.unlazy(fails_45with_63),"Closed is not open to new subtypes.",function(){
						return kind_33(X,Closed)
					})
				},"displayName","test")
			}();
			const props=function(){
				const displayName=Str;
				const super_45kinds=Array;
				const prototype=Obj;
				const implementors=Array;
				const symbol_45for_45isa=Symbol;
				return {
					displayName:displayName,
					"super-kinds":super_45kinds,
					prototype:prototype,
					implementors:implementors,
					"symbol-for-isa":symbol_45for_45isa
				}
			}();
			const extensible=true;
			const defaults=function(){
				const super_45kinds=function(){
					return _ms.set(function(){
						return Array(0)
					},"displayName","super-kinds")
				}();
				const prototype=function(){
					return _ms.set(function(){
						return Obj.create(null)
					},"displayName","prototype")
				}();
				const implementors=function(){
					return _ms.set(function(){
						return Array(0)
					},"displayName","implementors")
				}();
				const symbol_45for_45isa=function(){
					return _ms.set(function(_){
						const name=_ms.checkContains(Str,_.displayName,"name");
						return Symbol(("isa-"+_ms.show(name)))
					},"displayName","symbol-for-isa")
				}();
				return {
					"super-kinds":super_45kinds,
					prototype:prototype,
					implementors:implementors,
					"symbol-for-isa":symbol_45for_45isa,
					displayName:"defaults"
				}
			}();
			const post_45construct=function(){
				return _ms.set(function(_){
					p_43_33(_.prototype,_["symbol-for-isa"],true);
					if(_ms.bool(isEmpty(_.implementors))){} else {
						_.implementors.forEach(function(implementor){
							return on_45implementor_33(implementor,_)
						});
						_ms.unlazy(freeze)(_.implementors)
					}
				},"displayName","post-construct")
			}();
			return {
				doc:doc,
				test:test,
				props:props,
				extensible:extensible,
				defaults:defaults,
				"post-construct":post_45construct,
				displayName:"Kind"
			}
		}());
		impl_45contains_63_33(Kind,KindContains);
		const can_45subtype_63=exports["can-subtype?"]=function(){
			const doc="Whether a Kind accepts new subtypes.";
			const test=function(){
				return _ms.set(function(){
					const _k0=[_ms.unlazy(Impl_45Type)],_v0=true;
					const _k1=[_ms.unlazy(Try)],_v1=false;
					return _ms.map(_k0,_v0,_k1,_v1)
				},"displayName","test")
			}();
			return _ms.set(function(_){
				_ms.checkContains(Kind,_,"_");
				return not(_ms.unlazy(frozen_63)(_.implementors))
			},"doc",doc,"test",test,"displayName","can-subtype?")
		}();
		const unchecked_45kind_33=exports["unchecked-kind!"]=function(){
			const doc="kind! without any checks.\nNecessary if trying to implement Impl-Type itself.";
			return _ms.set(function(implementor,kind){
				kind.implementors.push(implementor);
				return on_45implementor_33(implementor,kind)
			},"doc",doc,"displayName","unchecked-kind!")
		}();
		const concrete_45implementors=exports["concrete-implementors"]=function(){
			const doc="List of Impl-Types inheriting from this.\nDoes not include inheriting Kinds, but does include their implementors.";
			const test=function(){
				return _ms.set(function(){
					const X=Kind(function(){
						const doc="X";
						return {
							doc:doc,
							displayName:"X"
						}
					}());
					const Y=Kind(function(){
						const doc="Y";
						return {
							doc:doc,
							displayName:"Y"
						}
					}());
					const Z=Obj_45Type(function(){
						const props=function(){
							const z=null;
							return {
								z:z,
								displayName:"props"
							}
						}();
						return {
							props:props,
							displayName:"Z"
						}
					}());
					const W=Obj_45Type(function(){
						const props=function(){
							const w=null;
							return {
								w:w,
								displayName:"props"
							}
						}();
						return {
							props:props,
							displayName:"W"
						}
					}());
					kind_33(Y,X);
					kind_33(Z,X);
					kind_33(W,Y);
					const _k0=[X],_v0=[W,Z];
					return _ms.map(_k0,_v0)
				},"displayName","test")
			}();
			return _ms.set(function(kind){
				_ms.checkContains(Kind,kind,"kind");
				return _ms.checkContains(_ms.sub(_ms.unlazy(_64),_ms.unlazy(Impl_45Type)),_ms.unlazy(flat_45map)(kind.implementors,function(_){
					return function(){
						if(_ms.bool(_ms.contains(Kind,_))){
							return concrete_45implementors(_)
						} else {
							return [_]
						}
					}()
				}),"res")
			},"doc",doc,"test",test,"displayName","concrete-implementors")
		}();
		const kind_33=exports["kind!"]=function(){
			const doc="Makes one Impl-Type a subtype of a Kind.\nKinds can subtype each other.";
			const test="See Impl-Type.test.";
			return _ms.set(function(implementor,kind,method_45impls){
				_ms.checkContains(Kind,kind,"kind");
				_ms.unlazy(_33)(can_45subtype_63(kind),_ms.lazy(function(){
					return ((""+_ms.show(kind))+" is not open to new subtypes.")
				}));
				_ms.unlazy(_33not)(kind_63,implementor,kind);
				unchecked_45kind_33(implementor,kind);
				{
					const _=method_45impls;
					if(_ms.bool(defined_63(_))){
						_ms.unlazy(each_33)(_,function(pair){
							return impl_33(pair.key,implementor,pair.val)
						})
					} else {}
				}
			},"doc",doc,"test",test,"displayName","kind!")
		}();
		const self_45kind_33=exports["self-kind!"]=function(){
			const doc="TODO";
			const test=function(){
				return _ms.set(function(){
					return "TODO"
				},"displayName","test")
			}();
			return _ms.set(function(implementor,kind,method_45impls){
				_ms.checkContains(Obj,implementor,"implementor");
				_ms.checkContains(Kind,kind,"kind");
				kind_33(_ms.unlazy(self_45type)(implementor),kind);
				return _ms.unlazy(if_33)(defined_63(method_45impls),function(){
					return _ms.unlazy(each_33)(method_45impls,function(pair){
						return self_45impl_33(pair.key,implementor,pair.val)
					})
				})
			},"doc",doc,"test",test,"displayName","self-kind!")
		}();
		const kind_63=exports["kind?"]=function(){
			const doc="Whether one Impl-Type is a subtype of a Kind.\"\nimplementor may itself be a Kind.";
			const test="See Impl-Type.test.";
			return _ms.set(function(implementor,kind){
				_ms.checkContains(Kind,kind,"kind");
				return function(){
					const _=implementor;
					if(_ms.bool(_ms.contains(Kind,_))){
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
			},"doc",doc,"test",test,"displayName","kind?")
		}();
		const _64p_45all=function(){
			return _ms.set(function(_){
				return Obj.getOwnPropertyNames(_).concat(Obj.getOwnPropertySymbols(_))
			},"displayName","@p-all")
		}();
		const on_45implementor_33=function(){
			return _ms.set(function(implementor,kind){
				{
					const _=implementor;
					if(_ms.bool(_ms.contains(Kind,_))){
						_["super-kinds"].push(kind)
					} else {}
				};
				return inherit_45methods_33(implementor,kind)
			},"displayName","on-implementor!")
		}();
		const inherit_45methods_33=function(){
			return _ms.set(function(implementor,kind){
				const rec_33=function(){
					return _ms.set(function(kind){
						_64p_45all(kind.prototype).forEach(function(name){
							return propagate_45method_45down_33(implementor,name,js_45sub(kind.prototype,name))
						});
						return kind["super-kinds"].forEach(rec_33)
					},"displayName","rec!")
				}();
				return rec_33(kind)
			},"displayName","inherit-methods!")
		}();
		const displayName=exports.displayName="Kind";
		exports.default=Kind;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL0tpbmQubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0VBbUJBLFdBQU8scUJBQ1E7R0FBZCxVQUNDO0dBUUQscUJBQ087bUJBQUEsVUFBQTtLQUNMLFFBQUksZUFDSTtNQUFQLFVBQU07Ozs7OztLQUNQLFFBQUksZUFDSTtNQUFQLFVBQU07Ozs7OztLQUNQLFFBQUkscUJBQ1E7TUFBWCxzQkFDTTtPQUFMLFFBQUE7Ozs7Ozs7Ozs7O0tBQ0YsUUFBTSxFQUFFO0tBQ1IsUUFBTSxFQUFFO0tBQ1IsUUFBSSxZQUNDO01BQUosUUFBRzs7Ozs7OzZDQUNRLEVBQUU7S0FHZCxRQUFJLGVBQ0k7TUFBUCxVQUFNOzs7Ozs7S0FDUCxRQUFJLGVBQ0k7TUFBUCxVQUFNOzs7Ozs7S0FDUCxRQUFJLHFCQUNRO01BQVgsc0JBQ007T0FBTCxRQUFBOzs7Ozs7Ozs7OztLQUNGLFFBQU0sRUFBRTtLQUNSLFFBQU0sRUFBRTtLQUNSLFFBQUksWUFDQztNQUFKLFFBQUc7Ozs7Ozs2Q0FDUSxFQUFFO0tBR2Qsd0NBQ2E7TUFBWixVQUFNOzs7Ozs7S0FDUCxRQUFNLEtBQUssRUFDRyxVQUFBO2FBQWI7S0FBQTtxQkFDQyxPQUFJLEtBQUssR0FBRzs2Q0FDRixFQUFFO0tBR2QsYUFBUyxlQUNJO01BQVosbUJBQWMsQ0FBRSxFQUFFOzs7Ozs7d0RBQ0osc0NBQ3NDLFVBQUE7YUFBcEQsUUFBTSxFQUFFO0tBQUE7SUFBQTs7R0FFWCxzQkFDTTtJQUFMLGtCQUFhO0lBQ2Isb0JBQWE7SUFDYixnQkFBVztJQUdYLG1CQUFjO0lBQ2QseUJBQWdCOzs7Ozs7Ozs7R0FDakIsaUJBQVk7R0FDWix5QkFDUztJQUFSLDhCQUNjO29CQUFBLFVBQUE7YUFBYixNQUFNO0tBQUE7O0lBQ1AsMEJBQ1k7b0JBQUEsVUFBQTthQUFYLFdBQVc7S0FBQTs7SUFDWiw2QkFDZTtvQkFBQSxVQUFBO2FB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