"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Boolean","../compare","../js","../private/bootstrap","../private/js-impl","./Method","./Obj-Type","../at/at","./Impl-Type","../methods","../bang","../Try","./Method","./Type"],function(exports,Boolean_0,compare_1,js_2,bootstrap_3,js_45impl_4,Method_5,Obj_45Type_6,_64_7,Impl_45Type_8,methods_9,_33_10,Try_11,Method_12,Type_13){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),or=_ms.get(_$2,"or"),not=_ms.get(_$2,"not"),_$3=_ms.getModule(compare_1),_61_63=_ms.get(_$3,"=?"),_$4=_ms.getModule(js_2),defined_63=_ms.get(_$4,"defined?"),js_45sub=_ms.get(_$4,"js-sub"),_$5=_ms.getModule(bootstrap_3),implContains=_ms.get(_$5,"implContains"),pAdd=_ms.get(_$5,"pAdd"),_$6=_ms.getModule(js_45impl_4),isEmpty=_ms.get(_$6,"isEmpty"),KindContains=_ms.get(_$6,"KindContains"),_$7=_ms.getModule(Method_5),impl_33=_ms.get(_$7,"impl!"),propagate_45method_45down_33=_ms.get(_$7,"propagate-method-down!"),self_45impl_33=_ms.get(_$7,"self-impl!"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_6),_64=_ms.lazy(function(){
			return _ms.getDefaultExport(_64_7)
		}),_$10=_ms.lazyGetModule(_64_7),each_33=_ms.lazyProp(_$10,"each!"),flat_45map=_ms.lazyProp(_$10,"flat-map"),Impl_45Type=_ms.lazy(function(){
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
			const test=function test(){
				const A=Kind(function(){
					const doc="A";
					return {
						doc:doc,
						name:"A"
					}
				}());
				const B=Kind(function(){
					const doc="B";
					return {
						doc:doc,
						name:"B"
					}
				}());
				const C=Obj_45Type(function(){
					const props=function(){
						const c=null;
						return {
							c:c,
							name:"props"
						}
					}();
					return {
						props:props,
						name:"C"
					}
				}());
				kind_33(B,A);
				kind_33(C,B);
				const c=C(function(){
					const c=1;
					return {
						c:c,
						name:"c"
					}
				}());
				_ms.unlazy(_33)(_ms.unlazy(contains_63),A,c);
				const X=Kind(function(){
					const doc="X";
					return {
						doc:doc,
						name:"X"
					}
				}());
				const Y=Kind(function(){
					const doc="Y";
					return {
						doc:doc,
						name:"Y"
					}
				}());
				const Z=Obj_45Type(function(){
					const props=function(){
						const x=null;
						return {
							x:x,
							name:"props"
						}
					}();
					return {
						props:props,
						name:"Z"
					}
				}());
				kind_33(Z,Y);
				kind_33(Y,X);
				const z=Z(function(){
					const x=1;
					return {
						x:x,
						name:"z"
					}
				}());
				_ms.unlazy(_33)(_ms.unlazy(contains_63),X,z);
				const asdf=_ms.unlazy(Method)(function(){
					const doc="asdf_s its arguments.";
					return {
						doc:doc,
						name:"asdf"
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
						name:"Closed"
					}
				}());
				return _ms.unlazy(_33)(_ms.unlazy(fails_45with_63),"Closed is not open to new subtypes.",function(){
					return kind_33(X,Closed)
				})
			};
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
				if(! _ms.bool(isEmpty(_.implementors))){
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
				name:"Kind"
			}
		}());
		implContains(Kind,KindContains);
		const can_45subtype_63=exports["can-subtype?"]=function(){
			const doc="Whether a Kind accepts new subtypes.";
			const test=function test(){
				const _k0=[_ms.unlazy(Impl_45Type)],_v0=true;
				const _k1=[_ms.unlazy(Try)],_v1=false;
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function can_45subtype_63(_){
				_ms.checkContains(Kind,_,"_");
				return not(_ms.unlazy(frozen_63)(_.implementors))
			},"doc",doc,"test",test)
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
			const test=function test(){
				const X=Kind(function(){
					const doc="X";
					return {
						doc:doc,
						name:"X"
					}
				}());
				const Y=Kind(function(){
					const doc="Y";
					return {
						doc:doc,
						name:"Y"
					}
				}());
				const Z=Obj_45Type(function(){
					const props=function(){
						const z=null;
						return {
							z:z,
							name:"props"
						}
					}();
					return {
						props:props,
						name:"Z"
					}
				}());
				const W=Obj_45Type(function(){
					const props=function(){
						const w=null;
						return {
							w:w,
							name:"props"
						}
					}();
					return {
						props:props,
						name:"W"
					}
				}());
				kind_33(Y,X);
				kind_33(Z,X);
				kind_33(W,Y);
				const _k0=[X],_v0=[W,Z];
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function concrete_45implementors(kind){
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
			},"doc",doc,"test",test)
		}();
		const kind_33=exports["kind!"]=function(){
			const doc="Makes one Impl-Type a subtype of a Kind.\nKinds can subtype each other.";
			const test="See Impl-Type.test.";
			return _ms.set(function kind_33(implementor,kind,method_45impls){
				_ms.checkContains(Kind,kind,"kind");
				_ms.unlazy(_33)(can_45subtype_63(kind),_ms.lazy(function(){
					return ((""+_ms.show(kind))+" is not open to new subtypes.")
				}));
				_ms.unlazy(_33not)(kind_63,implementor,kind);
				unchecked_45kind_33(implementor,kind);
				if(_ms.bool(defined_63(method_45impls))){
					_ms.unlazy(each_33)(method_45impls,function(pair){
						return impl_33(pair.key,implementor,pair.val)
					})
				}
			},"doc",doc,"test",test)
		}();
		const self_45kind_33=exports["self-kind!"]=function(){
			const doc="TODO";
			const test=function test(){
				return "TODO"
			};
			return _ms.set(function self_45kind_33(implementor,kind,method_45impls){
				_ms.checkContains(Object,implementor,"implementor");
				_ms.checkContains(Kind,kind,"kind");
				kind_33(_ms.unlazy(self_45type)(implementor),kind);
				if(_ms.bool(defined_63(method_45impls))){
					_ms.unlazy(each_33)(method_45impls,function(pair){
						return self_45impl_33(pair.key,implementor,pair.val)
					})
				}
			},"doc",doc,"test",test)
		}();
		const kind_63=exports["kind?"]=function(){
			const doc="Whether one Impl-Type is a subtype of a Kind.\"\nimplementor may itself be a Kind.";
			const test="See Impl-Type.test.";
			return _ms.set(function kind_63(implementor,kind){
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
			},"doc",doc,"test",test)
		}();
		const _64p_45all=function _64p_45all(_){
			return Object.getOwnPropertyNames(_).concat(Object.getOwnPropertySymbols(_))
		};
		const on_45implementor_33=function on_45implementor_33(_,kind){
			if(_ms.bool(_ms.contains(Kind,_))){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL0tpbmQubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0VBa0JBLFdBQU8scUJBQ1E7R0FBZCxVQUNDO0dBUUQsV0FDTyxlQUFBO0lBQ0wsUUFBSSxlQUNJO0tBQVAsVUFBTTs7Ozs7O0lBQ1AsUUFBSSxlQUNJO0tBQVAsVUFBTTs7Ozs7O0lBQ1AsUUFBSSxxQkFDUTtLQUFYLHNCQUNNO01BQUwsUUFBQTs7Ozs7Ozs7Ozs7SUFDRixRQUFNLEVBQUU7SUFDUixRQUFNLEVBQUU7SUFDUixRQUFJLFlBQ0M7S0FBSixRQUFHOzs7Ozs7NENBQ1EsRUFBRTtJQUdkLFFBQUksZUFDSTtLQUFQLFVBQU07Ozs7OztJQUNQLFFBQUksZUFDSTtLQUFQLFVBQU07Ozs7OztJQUNQLFFBQUkscUJBQ1E7S0FBWCxzQkFDTTtNQUFMLFFBQUE7Ozs7Ozs7Ozs7O0lBQ0YsUUFBTSxFQUFFO0lBQ1IsUUFBTSxFQUFFO0lBQ1IsUUFBSSxZQUNDO0tBQUosUUFBRzs7Ozs7OzRDQUNRLEVBQUU7SUFHZCx3Q0FDYTtLQUFaLFVBQU07Ozs7OztJQUNQLFFBQU0sS0FBSyxFQUNHLFVBQUE7WUFBYjtJQUFBO29CQUNDLE9BQUksS0FBSyxHQUFHOzRDQUNGLEVBQUU7SUFHZCxhQUFTLGVBQ0k7S0FBWixtQkFBYyxDQUFFLEVBQUU7Ozs7Ozt1REFDSixzQ0FDc0MsVUFBQTtZQUFwRCxRQUFNLEVBQUU7SUFBQTtHQUFBO0dBRVgsc0JBQ007SUFBTCxXQUFNO0lBQ04sb0JBQWE7SUFDYixnQkFBVztJQUdYLG1CQUFjO0lBQ2QseUJBQWdCOzs7Ozs7Ozs7R0FDakIsaUJBQVk7R0FDWix5QkFDUztJQUFSLG9CQUNjLHdCQUFBO1lBQWIsTUFBTTtJQUFBO0lBQ1AsZ0JBQ1ksb0JBQUE7WUFBWCxjQUFjO0lBQUE7SUFDZixtQkFDZSx1QkFBQTtZQUFkLE1BQU07SUFBQTtJQUNQLHlCQUFpQiw0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