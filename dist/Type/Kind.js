"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../compare","../js","../private/bootstrap","../private/js-impl","./Method","./Obj-Type","../at/at","./Impl-Type","../methods","../Try","./Method","./Type"],(exports,compare_0,js_1,bootstrap_2,js_45impl_3,Method_4,Obj_45Type_5,_64_6,Impl_45Type_7,methods_8,Try_9,Method_10,Type_11)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(js_1),defined_63=_ms.get(_$3,"defined?"),js_45sub=_ms.get(_$3,"js-sub"),_$4=_ms.getModule(bootstrap_2),implContains=_ms.get(_$4,"implContains"),pAdd=_ms.get(_$4,"pAdd"),_$5=_ms.getModule(js_45impl_3),isEmpty=_ms.get(_$5,"isEmpty"),KindContains=_ms.get(_$5,"KindContains"),_$6=_ms.getModule(Method_4),impl_33=_ms.get(_$6,"impl!"),propagate_45method_45down_33=_ms.get(_$6,"propagate-method-down!"),self_45impl_33=_ms.get(_$6,"self-impl!"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_5),_64=_ms.lazy(()=>{
			return _ms.getDefaultExport(_64_6)
		}),Impl_45Type=_ms.lazy(()=>{
			return _ms.getDefaultExport(Impl_45Type_7)
		}),_$10=_ms.lazyGetModule(Impl_45Type_7),self_45type=_ms.lazyProp(_$10,"self-type"),_$11=_ms.lazyGetModule(methods_8),freeze=_ms.lazyProp(_$11,"freeze"),frozen_63=_ms.lazyProp(_$11,"frozen?"),_$13=_ms.lazyGetModule(Try_9),fails_45with_63=_ms.lazyProp(_$13,"fails-with?"),Method=_ms.lazy(()=>{
			return _ms.getDefaultExport(Method_10)
		}),_$15=_ms.lazyGetModule(Type_11),contains_63=_ms.lazyProp(_$15,"contains?");
		const Kind=Obj_45Type(()=>{
			const built={};
			const doc=built.doc=`A Kind is like a tag you can apply to a Concrete-Type to signify that it belongs in some category.\nThat category is typically a group of types all of which implement the same set of methods.\nType checking for Kind membership is O(1).\n-\nThe \`prototype\` on a Kind is not meant to be used as a prototype.\nIt stores the impl!_s that have been done on the Kind0.\nimpl! and kind! make sure that Concrete-Types receive the methods of their Kinds.\nThey require the Kind to correctly track super-kinds and implementors.`;
			const test=built.test=function test(){
				const A=Kind(()=>{
					const built={};
					const doc=built.doc=`A`;
					return _ms.setName(built,"A")
				}());
				const B=Kind(()=>{
					const built={};
					const doc=built.doc=`B`;
					return _ms.setName(built,"B")
				}());
				const C=Obj_45Type(()=>{
					const built={};
					const props=built.props=()=>{
						const built={};
						const c=built.c=null;
						return _ms.setName(built,"props")
					}();
					return _ms.setName(built,"C")
				}());
				kind_33(B,A);
				kind_33(C,B);
				const c=C(()=>{
					const built={};
					const c=built.c=1;
					return _ms.setName(built,"c")
				}());
				_ms.assert(_ms.unlazy(contains_63),A,c);
				const X=Kind(()=>{
					const built={};
					const doc=built.doc=`X`;
					return _ms.setName(built,"X")
				}());
				const Y=Kind(()=>{
					const built={};
					const doc=built.doc=`Y`;
					return _ms.setName(built,"Y")
				}());
				const Z=Obj_45Type(()=>{
					const built={};
					const props=built.props=()=>{
						const built={};
						const x=built.x=null;
						return _ms.setName(built,"props")
					}();
					return _ms.setName(built,"Z")
				}());
				kind_33(Z,Y);
				kind_33(Y,X);
				const z=Z(()=>{
					const built={};
					const x=built.x=1;
					return _ms.setName(built,"z")
				}());
				_ms.assert(_ms.unlazy(contains_63),X,z);
				const asdf=new (_ms.unlazy(Method))(()=>{
					const built={};
					const doc=built.doc=`asdf_s its arguments.`;
					return _ms.setName(built,"asdf")
				}());
				impl_33(asdf,X,()=>{
					return 1
				});
				_ms.assert(_61_63,asdf(z),1);
				_ms.assert(_ms.unlazy(contains_63),X,z);
				const Closed=Kind(()=>{
					const built={};
					const implementors=built.implementors=[C,Z];
					return _ms.setName(built,"Closed")
				}());
				_ms.assert(_ms.unlazy(fails_45with_63),`Closed is not open to new subtypes.`,()=>{
					kind_33(X,Closed)
				})
			};
			const props=built.props=()=>{
				const built={};
				const name=built.name=String;
				const super_45kinds=built["super-kinds"]=Array;
				const prototype=built.prototype=Object;
				const implementors=built.implementors=Array;
				const symbol_45for_45isa=built["symbol-for-isa"]=Symbol;
				return built
			}();
			const extensible=built.extensible=true;
			const defaults=built.defaults=()=>{
				const built={};
				const super_45kinds=built["super-kinds"]=function super_45kinds(){
					return []
				};
				const prototype=built.prototype=function prototype(){
					return Object.create(null)
				};
				const implementors=built.implementors=function implementors(){
					return []
				};
				const symbol_45for_45isa=built["symbol-for-isa"]=function symbol_45for_45isa(_){
					return Symbol(`isa-${_ms.show(_.name)}`)
				};
				return _ms.setName(built,"defaults")
			}();
			const post_45construct=built["post-construct"]=function post_45construct(_){
				pAdd(_.prototype,_["symbol-for-isa"],true);
				if(! _ms.bool(isEmpty(_.implementors))){
					for(let implementor of _.implementors){
						on_45implementor_33(implementor,_)
					};
					_ms.unlazy(freeze)(_.implementors)
				}
			};
			return _ms.setName(built,"Kind")
		}());
		implContains(Kind,KindContains);
		const can_45subtype_63=exports["can-subtype?"]=()=>{
			const built={};
			const doc=built.doc=`Whether a Kind accepts new subtypes.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[_ms.unlazy(Impl_45Type)],true);
				return built
			};
			return _ms.set(function can_45subtype_63(_){
				_ms.checkContains(Kind,_,"_");
				return ! _ms.unlazy(frozen_63)(_.implementors)
			},built)
		}();
		const unchecked_45kind_33=exports["unchecked-kind!"]=()=>{
			const built={};
			const doc=built.doc=`kind! without any checks.\nNecessary if trying to implement Impl-Type itself.`;
			return _ms.set(function unchecked_45kind_33(implementor,kind){
				kind.implementors.push(implementor);
				on_45implementor_33(implementor,kind)
			},built)
		}();
		const concrete_45implementors=exports["concrete-implementors"]=()=>{
			const built={};
			const doc=built.doc=`List of Impl-Types inheriting from this.\nDoes not include inheriting Kinds, but does include their implementors.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				const X=Kind(()=>{
					const built={};
					const doc=built.doc=`X`;
					return _ms.setName(built,"X")
				}());
				const Y=Kind(()=>{
					const built={};
					const doc=built.doc=`Y`;
					return _ms.setName(built,"Y")
				}());
				const Z=Obj_45Type(()=>{
					const built={};
					const props=built.props=()=>{
						const built={};
						const z=built.z=null;
						return _ms.setName(built,"props")
					}();
					return _ms.setName(built,"Z")
				}());
				const W=Obj_45Type(()=>{
					const built={};
					const props=built.props=()=>{
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
				return _ms.checkContains(_ms.sub(_ms.unlazy(_64),_ms.unlazy(Impl_45Type)),()=>{
					const built=[];
					for(let _ of kind.implementors){
						if(_ms.bool(_ms.contains(Kind,_))){
							_ms.addMany(built,concrete_45implementors(_))
						} else {
							_ms.add(built,_)
						}
					};
					return built
				}(),"res")
			},built)
		}();
		const kind_33=exports["kind!"]=()=>{
			const built={};
			const doc=built.doc=`Makes one Impl-Type a subtype of a Kind.\nKinds can subtype each other.`;
			const test=built.test=`See Impl-Type.test.`;
			return _ms.set(function kind_33(implementor,kind,method_45impls){
				_ms.checkContains(Kind,kind,"kind");
				if(! _ms.bool(can_45subtype_63(kind)))throw _ms.error(`${_ms.show(kind)} is not open to new subtypes.`);
				_ms.assertNot(kind_63,implementor,kind);
				unchecked_45kind_33(implementor,kind);
				if(defined_63(method_45impls)){
					for(let _ of method_45impls){
						impl_33(js_45sub(_,0),implementor,js_45sub(_,1))
					}
				}
			},built)
		}();
		const self_45kind_33=exports["self-kind!"]=()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){};
			return _ms.set(function self_45kind_33(implementor,kind,method_45impls){
				_ms.checkContains(Object,implementor,"implementor");
				_ms.checkContains(Kind,kind,"kind");
				kind_33(_ms.unlazy(self_45type)(implementor),kind);
				if(defined_63(method_45impls)){
					for(let _ of method_45impls){
						self_45impl_33(js_45sub(_,0),implementor,js_45sub(_,1))
					}
				}
			},built)
		}();
		const kind_63=exports["kind?"]=()=>{
			const built={};
			const doc=built.doc=`Whether one Impl-Type is a subtype of a Kind."\nimplementor may itself be a Kind.`;
			const test=built.test=`See Impl-Type.test.`;
			return _ms.set(function kind_63(implementor,kind){
				_ms.checkContains(Kind,kind,"kind");
				return ()=>{
					const _=implementor;
					if(_ms.bool(_ms.contains(Kind,_))){
						return _["super-kinds"].some(super_45kind=>{
							return (_61_63(super_45kind,kind)||kind_63(super_45kind,kind))
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
			if(_ms.contains(Kind,_)){
				_["super-kinds"].push(kind)
			};
			inherit_45methods_33(_,kind)
		};
		const inherit_45methods_33=function inherit_45methods_33(implementor,kind){
			const rec_33=function rec_33(kind){
				for(let name of _64p_45all(kind.prototype)){
					propagate_45method_45down_33(implementor,name,js_45sub(kind.prototype,name))
				};
				for(let _ of kind["super-kinds"]){
					rec_33(_)
				}
			};
			rec_33(kind)
		};
		const name=exports.name=`Kind`;
		exports.default=Kind;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL0tpbmQubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7RUFnQkEsV0FBTSxlQUNROztHQUFiLG9CQUNDO0dBUUQsc0JBQ1EsZUFBQTtJQUNOLFFBQUksU0FDSTs7S0FBUCxvQkFBTTs7O0lBQ1AsUUFBSSxTQUNJOztLQUFQLG9CQUFNOzs7SUFDUCxRQUFJLGVBQ1E7O0tBQVgsNEJBQ007O01BQUwsZ0JBQUE7Ozs7O0lBQ0YsUUFBTSxFQUFFO0lBQ1IsUUFBTSxFQUFFO0lBQ1IsUUFBSSxNQUNDOztLQUFKLGdCQUFHOzs7dUNBQ2MsRUFBRTtJQUdwQixRQUFJLFNBQ0k7O0tBQVAsb0JBQU07OztJQUNQLFFBQUksU0FDSTs7S0FBUCxvQkFBTTs7O0lBQ1AsUUFBSSxlQUNROztLQUFYLDRCQUNNOztNQUFMLGdCQUFBOzs7OztJQUNGLFFBQU0sRUFBRTtJQUNSLFFBQU0sRUFBRTtJQUNSLFFBQUksTUFDQzs7S0FBSixnQkFBRzs7O3VDQUNjLEVBQUU7SUFHcEIsV0FBTyw2QkFDVTs7S0FBaEIsb0JBQU07OztJQUNQLFFBQU0sS0FBSyxFQUNHLElBQUE7WUFBYjtJQUFBO2VBQ08sT0FBSSxLQUFLLEdBQUc7dUNBQ0YsRUFBRTtJQUdwQixhQUFTLFNBQ0k7O0tBQVosc0NBQWMsQ0FBRSxFQUFFOzs7MkNBRUUsc0NBQ3VDLElBQUE7S0FBM0QsUUFBTSxFQUFFO0lBQUE7R0FBQTtHQUVYLDRCQUNNOztJQUFMLHNCQUFNO0lBQ04seUNBQWE7SUFDYixnQ0FBVztJQUdYLHNDQUFjO0lBQ2QsaURBQWdCOzs7R0FDakIsa0NBQVk7R0FDWixrQ0FDUzs7SUFBUix5Q0FDYyx3QkFBQTtZQUFiO0lBQUE7SUFDRCxnQ0FDWSxvQkFBQTtZQUFYLGNBQWM7SUFBQTtJQUNmLHNDQUNlLHVCQUFBO1lBQWQ7SUFBQTtJQUNELGlEQUFpQiw0QkFBQSxFQUNDO1lBQWpCLE9BQVEsZ0JB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