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
		const exports={};
		const Kind=Obj_45Type(function(){
			const doc="A Kind is like a tag you can apply to a Concrete-Type to signify that it belongs in some category.\nThat category is typically a group of types all of which implement the same set of methods.\nType checking for Kind membership is O(1).\n-\nThe `prototype` on a Kind is not meant to be used as a prototype.\nIt stores the impl!_s that have been done on the Kind0.\nimpl! and kind! make sure that Concrete-Types receive the methods of their Kinds.\nThey require the Kind to correctly track super-kinds and implementors.";
			const test=function(){
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
			};
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
					return Array(0)
				};
				const prototype=function(){
					return Obj.create(null)
				};
				const implementors=function(){
					return Array(0)
				};
				const symbol_45for_45isa=function(_){
					const name=_ms.checkContains(Str,_.displayName,"name");
					return Symbol(("isa-"+_ms.show(name)))
				};
				return {
					"super-kinds":super_45kinds,
					prototype:prototype,
					implementors:implementors,
					"symbol-for-isa":symbol_45for_45isa,
					displayName:"defaults"
				}
			}();
			const post_45construct=function(_){
				p_43_33(_.prototype,_["symbol-for-isa"],true);
				if(_ms.bool(isEmpty(_.implementors))){
					null
				} else {
					_.implementors.forEach(function(implementor){
						return on_45implementor_33(implementor,_)
					});
					_ms.unlazy(freeze)(_.implementors)
				}
			};
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
				const _k0=[_ms.unlazy(Impl_45Type)],_v0=true;
				const _k1=[_ms.unlazy(Try)],_v1=false;
				return _ms.map(_k0,_v0,_k1,_v1)
			};
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
			};
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
					} else {
						null
					}
				}
			},"doc",doc,"test",test,"displayName","kind!")
		}();
		const self_45kind_33=exports["self-kind!"]=function(){
			const doc="TODO";
			const test=function(){
				return "TODO"
			};
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
		const _64p_45all=function(_){
			return Obj.getOwnPropertyNames(_).concat(Obj.getOwnPropertySymbols(_))
		};
		const on_45implementor_33=function(implementor,kind){
			{
				const _=implementor;
				if(_ms.bool(_ms.contains(Kind,_))){
					_["super-kinds"].push(kind)
				} else {
					null
				}
			};
			return inherit_45methods_33(implementor,kind)
		};
		const inherit_45methods_33=function(implementor,kind){
			const rec_33=function(kind){
				_64p_45all(kind.prototype).forEach(function(name){
					return propagate_45method_45down_33(implementor,name,js_45sub(kind.prototype,name))
				});
				return kind["super-kinds"].forEach(rec_33)
			};
			return rec_33(kind)
		};
		exports.default=Kind;
		const displayName=exports.displayName="Kind";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL0tpbmQubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2lDQW1CQTs7Ozs7Ozs7Ozs7OztFQUFBLFdBQU8scUJBQ1E7R0FBZCxVQUNDO0dBUUQsV0FDTyxVQUFBO0lBQ0wsUUFBSSxlQUNJO0tBQVAsVUFBTTtZQUFDOzs7OztJQUNSLFFBQUksZUFDSTtLQUFQLFVBQU07WUFBQzs7Ozs7SUFDUixRQUFJLHFCQUNRO0tBQVgsc0JBQ007TUFBTCxRQUFBO2FBQUs7Ozs7O1lBREs7Ozs7O0lBRVosUUFBTSxFQUFFO0lBQ1IsUUFBTSxFQUFFO0lBQ1IsUUFBSSxZQUNDO0tBQUosUUFBRztZQUFDOzs7Ozs0Q0FDTyxFQUFFO0lBR2QsUUFBSSxlQUNJO0tBQVAsVUFBTTtZQUFDOzs7OztJQUNSLFFBQUksZUFDSTtLQUFQLFVBQU07WUFBQzs7Ozs7SUFDUixRQUFJLHFCQUNRO0tBQVgsc0JBQ007TUFBTCxRQUFBO2FBQUs7Ozs7O1lBREs7Ozs7O0lBRVosUUFBTSxFQUFFO0lBQ1IsUUFBTSxFQUFFO0lBQ1IsUUFBSSxZQUNDO0tBQUosUUFBRztZQUFDOzs7Ozs0Q0FDTyxFQUFFO0lBR2Qsd0NBQ2E7S0FBWixVQUFNO1lBQU07Ozs7O0lBQ2IsUUFBTSxLQUFLLEVBQ0csVUFBQTtZQUFiO0lBQUE7b0JBQ0MsT0FBSSxLQUFLLEdBQUc7NENBQ0YsRUFBRTtJQUdkLGFBQVMsZUFDSTtLQUFaLG1CQUFjLENBQUUsRUFBRTtZQUFOOzs7Ozt1REFDRSxzQ0FDc0MsVUFBQTtZQUFwRCxRQUFNLEVBQUU7SUFBQTtHQUFBO0dBRVgsc0JBQ007SUFBTCxrQkFBYTtJQUNiLG9CQUFhO0lBQ2IsZ0JBQVc7SUFHWCxtQkFBYztJQUNkLHlCQUFnQjtXQU5YOzs7Ozs7OztHQU9OLGlCQUFZO0dBQ1oseUJBQ1M7SUFBUixvQkFDYyxVQUFBO1lBQWIsTUFBTTtJQUFBO0lBQ1AsZ0JBQ1ksVUFBQTtZQUFY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