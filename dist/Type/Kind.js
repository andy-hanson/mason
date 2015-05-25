"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Boolean","../compare","../js","../private/bootstrap","../private/js-impl","./Method","./Obj-Type","../at/at","./Impl-Type","../methods","../bang","../Try","./Method","./Type"],function(exports,Boolean_0,compare_1,js_2,bootstrap_3,js_45impl_4,Method_5,Obj_45Type_6,_64_7,Impl_45Type_8,methods_9,_33_10,Try_11,Method_12,Type_13){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),or=_ms.get(_$2,"or"),not=_ms.get(_$2,"not"),_$3=_ms.getModule(compare_1),_61_63=_ms.get(_$3,"=?"),_$4=_ms.getModule(js_2),defined_63=_ms.get(_$4,"defined?"),js_45sub=_ms.get(_$4,"js-sub"),_$5=_ms.getModule(bootstrap_3),implContains=_ms.get(_$5,"implContains"),pAdd=_ms.get(_$5,"pAdd"),_$6=_ms.getModule(js_45impl_4),isEmpty=_ms.get(_$6,"isEmpty"),KindContains=_ms.get(_$6,"KindContains"),_$7=_ms.getModule(Method_5),impl_33=_ms.get(_$7,"impl!"),propagate_45method_45down_33=_ms.get(_$7,"propagate-method-down!"),self_45impl_33=_ms.get(_$7,"self-impl!"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_6),_64=_ms.lazy(function(){
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
			const built={};
			const doc=built.doc="A Kind is like a tag you can apply to a Concrete-Type to signify that it belongs in some category.\nThat category is typically a group of types all of which implement the same set of methods.\nType checking for Kind membership is O(1).\n-\nThe `prototype` on a Kind is not meant to be used as a prototype.\nIt stores the impl!_s that have been done on the Kind0.\nimpl! and kind! make sure that Concrete-Types receive the methods of their Kinds.\nThey require the Kind to correctly track super-kinds and implementors.";
			const test=built.test=function test(){
				const A=Kind(function(){
					const built={};
					const doc=built.doc="A";
					return _ms.setName(built,"A")
				}());
				const B=Kind(function(){
					const built={};
					const doc=built.doc="B";
					return _ms.setName(built,"B")
				}());
				const C=Obj_45Type(function(){
					const built={};
					const props=built.props=function(){
						const built={};
						const c=built.c=null;
						return _ms.setName(built,"props")
					}();
					return _ms.setName(built,"C")
				}());
				kind_33(B,A);
				kind_33(C,B);
				const c=C(function(){
					const built={};
					const c=built.c=1;
					return _ms.setName(built,"c")
				}());
				_ms.unlazy(_33)(_ms.unlazy(contains_63),A,c);
				const X=Kind(function(){
					const built={};
					const doc=built.doc="X";
					return _ms.setName(built,"X")
				}());
				const Y=Kind(function(){
					const built={};
					const doc=built.doc="Y";
					return _ms.setName(built,"Y")
				}());
				const Z=Obj_45Type(function(){
					const built={};
					const props=built.props=function(){
						const built={};
						const x=built.x=null;
						return _ms.setName(built,"props")
					}();
					return _ms.setName(built,"Z")
				}());
				kind_33(Z,Y);
				kind_33(Y,X);
				const z=Z(function(){
					const built={};
					const x=built.x=1;
					return _ms.setName(built,"z")
				}());
				_ms.unlazy(_33)(_ms.unlazy(contains_63),X,z);
				const asdf=_ms.unlazy(Method)(function(){
					const built={};
					const doc=built.doc="asdf_s its arguments.";
					return _ms.setName(built,"asdf")
				}());
				impl_33(asdf,X,function(){
					return 1
				});
				_ms.unlazy(_33)(_61_63,asdf(z),1);
				_ms.unlazy(_33)(_ms.unlazy(contains_63),X,z);
				const Closed=Kind(function(){
					const built={};
					const implementors=built.implementors=[C,Z];
					return _ms.setName(built,"Closed")
				}());
				_ms.unlazy(_33)(_ms.unlazy(fails_45with_63),"Closed is not open to new subtypes.",function(){
					return kind_33(X,Closed)
				})
			};
			const props=built.props=function(){
				const built={};
				const name=built.name=String;
				const super_45kinds=built["super-kinds"]=Array;
				const prototype=built.prototype=Object;
				const implementors=built.implementors=Array;
				const symbol_45for_45isa=built["symbol-for-isa"]=Symbol;
				return built
			}();
			const extensible=built.extensible=true;
			const defaults=built.defaults=function(){
				const built={};
				const super_45kinds=built["super-kinds"]=function super_45kinds(){
					return Array(0)
				};
				const prototype=built.prototype=function prototype(){
					return Object.create(null)
				};
				const implementors=built.implementors=function implementors(){
					return Array(0)
				};
				const symbol_45for_45isa=built["symbol-for-isa"]=function symbol_45for_45isa(_){
					return Symbol(("isa-"+_ms.show(_.name)))
				};
				return _ms.setName(built,"defaults")
			}();
			const post_45construct=built["post-construct"]=function post_45construct(_){
				pAdd(_.prototype,_["symbol-for-isa"],true);
				if(! _ms.bool(isEmpty(_.implementors))){
					for(let implementor of _.implementors[Symbol.iterator]()){
						on_45implementor_33(implementor,_)
					};
					_ms.unlazy(freeze)(_.implementors)
				}
			};
			return _ms.setName(built,"Kind")
		}());
		implContains(Kind,KindContains);
		const can_45subtype_63=exports["can-subtype?"]=function(){
			const built={};
			const doc=built.doc="Whether a Kind accepts new subtypes.";
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[_ms.unlazy(Impl_45Type)],true);
				_ms.assoc(built,[_ms.unlazy(Try)],false);
				return built
			};
			return _ms.set(function can_45subtype_63(_){
				_ms.checkContains(Kind,_,"_");
				return not(_ms.unlazy(frozen_63)(_.implementors))
			},built)
		}();
		const unchecked_45kind_33=exports["unchecked-kind!"]=function(){
			const built={};
			const doc=built.doc="kind! without any checks.\nNecessary if trying to implement Impl-Type itself.";
			return _ms.set(function unchecked_45kind_33(implementor,kind){
				kind.implementors.push(implementor);
				on_45implementor_33(implementor,kind)
			},built)
		}();
		const concrete_45implementors=exports["concrete-implementors"]=function(){
			const built={};
			const doc=built.doc="List of Impl-Types inheriting from this.\nDoes not include inheriting Kinds, but does include their implementors.";
			const test=built.test=function test(){
				const built=new global.Map();
				const X=Kind(function(){
					const built={};
					const doc=built.doc="X";
					return _ms.setName(built,"X")
				}());
				const Y=Kind(function(){
					const built={};
					const doc=built.doc="Y";
					return _ms.setName(built,"Y")
				}());
				const Z=Obj_45Type(function(){
					const built={};
					const props=built.props=function(){
						const built={};
						const z=built.z=null;
						return _ms.setName(built,"props")
					}();
					return _ms.setName(built,"Z")
				}());
				const W=Obj_45Type(function(){
					const built={};
					const props=built.props=function(){
						const built={};
						const w=built.w=null;
						return _ms.setName(built,"props")
					}();
					return _ms.setName(built,"W")
				}());
				kind_33(Y,X);
				kind_33(Z,X);
				kind_33(W,Y);
				_ms.assoc(built,[X],[W,Z]);
				return built
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
			},built)
		}();
		const kind_33=exports["kind!"]=function(){
			const built={};
			const doc=built.doc="Makes one Impl-Type a subtype of a Kind.\nKinds can subtype each other.";
			const test=built.test="See Impl-Type.test.";
			return _ms.set(function kind_33(implementor,kind,method_45impls){
				_ms.checkContains(Kind,kind,"kind");
				_ms.unlazy(_33)(can_45subtype_63(kind),_ms.lazy(function(){
					return ((""+_ms.show(kind))+" is not open to new subtypes.")
				}));
				_ms.unlazy(_33not)(kind_63,implementor,kind);
				unchecked_45kind_33(implementor,kind);
				if(_ms.bool(defined_63(method_45impls))){
					for(let _ of method_45impls[Symbol.iterator]()){
						impl_33(_ms.sub(_,0),implementor,_ms.sub(_,1))
					}
				}
			},built)
		}();
		const self_45kind_33=exports["self-kind!"]=function(){
			const built={};
			const doc=built.doc="TODO";
			const test=built.test=function test(){};
			return _ms.set(function self_45kind_33(implementor,kind,method_45impls){
				_ms.checkContains(Object,implementor,"implementor");
				_ms.checkContains(Kind,kind,"kind");
				kind_33(_ms.unlazy(self_45type)(implementor),kind);
				if(_ms.bool(defined_63(method_45impls))){
					for(let _ of method_45impls[Symbol.iterator]()){
						self_45impl_33(_ms.sub(_,0),implementor,_ms.sub(_,1))
					}
				}
			},built)
		}();
		const kind_63=exports["kind?"]=function(){
			const built={};
			const doc=built.doc="Whether one Impl-Type is a subtype of a Kind.\"\nimplementor may itself be a Kind.";
			const test=built.test="See Impl-Type.test.";
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
			},built)
		}();
		const _64p_45all=function _64p_45all(_){
			return Object.getOwnPropertyNames(_).concat(Object.getOwnPropertySymbols(_))
		};
		const on_45implementor_33=function on_45implementor_33(_,kind){
			if(_ms.bool(_ms.contains(Kind,_))){
				_["super-kinds"].push(kind)
			};
			inherit_45methods_33(_,kind)
		};
		const inherit_45methods_33=function inherit_45methods_33(implementor,kind){
			const rec_33=function rec_33(kind){
				for(let name of _64p_45all(kind.prototype)[Symbol.iterator]()){
					propagate_45method_45down_33(implementor,name,js_45sub(kind.prototype,name))
				};
				for(let _ of kind["super-kinds"][Symbol.iterator]()){
					rec_33(_)
				}
			};
			rec_33(kind)
		};
		const name=exports.name="Kind";
		exports.default=Kind;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL0tpbmQubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0VBa0JBLFdBQU0scUJBQ1E7O0dBQWIsb0JBQ0M7R0FRRCxzQkFDUSxlQUFBO0lBQ04sUUFBSSxlQUNJOztLQUFQLG9CQUFNOzs7SUFDUCxRQUFJLGVBQ0k7O0tBQVAsb0JBQU07OztJQUNQLFFBQUkscUJBQ1E7O0tBQVgsa0NBQ007O01BQUwsZ0JBQUE7Ozs7O0lBQ0YsUUFBTSxFQUFFO0lBQ1IsUUFBTSxFQUFFO0lBQ1IsUUFBSSxZQUNDOztLQUFKLGdCQUFHOzs7NENBQ1EsRUFBRTtJQUdkLFFBQUksZUFDSTs7S0FBUCxvQkFBTTs7O0lBQ1AsUUFBSSxlQUNJOztLQUFQLG9CQUFNOzs7SUFDUCxRQUFJLHFCQUNROztLQUFYLGtDQUNNOztNQUFMLGdCQUFBOzs7OztJQUNGLFFBQU0sRUFBRTtJQUNSLFFBQU0sRUFBRTtJQUNSLFFBQUksWUFDQzs7S0FBSixnQkFBRzs7OzRDQUNRLEVBQUU7SUFHZCx3Q0FDYTs7S0FBWixvQkFBTTs7O0lBQ1AsUUFBTSxLQUFLLEVBQ0csVUFBQTtZQUFiO0lBQUE7b0JBQ0MsT0FBSSxLQUFLLEdBQUc7NENBQ0YsRUFBRTtJQUdkLGFBQVMsZUFDSTs7S0FBWixzQ0FBYyxDQUFFLEVBQUU7OztnREFDSixzQ0FDc0MsVUFBQTtZQUFwRCxRQUFNLEVBQUU7SUFBQTtHQUFBO0dBRVgsa0NBQ007O0lBQUwsc0JBQU07SUFDTix5Q0FBYTtJQUNiLGdDQUFXO0lBR1gsc0NBQWM7SUFDZCxpREFBZ0I7OztHQUNqQixrQ0FBWTtHQUNaLHdDQUNTOztJQUFSLHlDQUNjLHdCQUFBO1lBQWIsTUFBTTtJQUFBO0lBQ1AsZ0NBQ1ksb0JBQUE7WUFBWCxjQUFjO0lBQUE7SUFDZixzQ0FDZSx1QkFBQTtZQUFkLE1BQU07SUFBQTtJQUNQLGlEQUFpQiw0QkFBQSxFQUNDO1lBQWpC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