"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../compare","../js","../private/bootstrap","../private/js-impl","./Method","../at/at","./Impl-Type","../methods","../Try","./Method","./Type","./Impl-Type"],(exports,compare_0,js_1,bootstrap_2,js_45impl_3,Method_4,_64_5,Impl_45Type_6,methods_7,Try_8,Method_9,Type_10,Impl_45Type_11)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(js_1),defined_63=_ms.get(_$3,"defined?"),js_45sub=_ms.get(_$3,"js-sub"),_$4=_ms.getModule(bootstrap_2),implContains=_ms.get(_$4,"implContains"),pAdd=_ms.get(_$4,"pAdd"),_$5=_ms.getModule(js_45impl_3),KindContains=_ms.get(_$5,"KindContains"),_$6=_ms.getModule(Method_4),impl_33=_ms.get(_$6,"impl!"),propagate_45method_45down_33=_ms.get(_$6,"propagate-method-down!"),self_45impl_33=_ms.get(_$6,"self-impl!"),_64=_ms.lazy(()=>{
			return _ms.getDefaultExport(_64_5)
		}),_$9=_ms.lazyGetModule(Impl_45Type_6),Self_45Type=_ms.lazyProp(_$9,"Self-Type"),_$10=_ms.lazyGetModule(methods_7),freeze=_ms.lazyProp(_$10,"freeze"),frozen_63=_ms.lazyProp(_$10,"frozen?"),_$12=_ms.lazyGetModule(Try_8),fails_45with_63=_ms.lazyProp(_$12,"fails-with?"),Method=_ms.lazy(()=>{
			return _ms.getDefaultExport(Method_9)
		}),_$14=_ms.lazyGetModule(Type_10),contains_63=_ms.lazyProp(_$14,"contains?"),Impl_45Type=_ms.lazy(()=>{
			return _ms.getDefaultExport(Impl_45Type_11)
		});
		const Kind=()=>{
			const _=class Kind{
				constructor(params){
					Object.defineProperty(this,`name`,()=>{
						const built={};
						const value=built.value=params.name;
						return built
					}());
					_ms.newProperty(this,"super-kinds",()=>{
						const _=params["super-kinds"];
						if(defined_63(_)){
							return _
						} else {
							return []
						}
					}());
					_ms.newProperty(this,"implementors",()=>{
						const _=params.implementors;
						if(defined_63(_)){
							return _ms.unlazy(freeze)(_)
						} else {
							return []
						}
					}());
					_ms.newProperty(this,"symbol-for-isa",()=>{
						const _=params["symbol-for-isa"];
						if(defined_63(_)){
							return _
						} else {
							return Symbol(`isa-${_ms.show(this.name)}`)
						}
					}());
					_ms.newProperty(this,"prototype",()=>{
						const _=params.prototype;
						if(defined_63(_)){
							return _
						} else {
							return Object.create(null)
						}
					}());
					pAdd(this.prototype,this["symbol-for-isa"],true);
					for(let _ of this.implementors){
						on_45implementor_33(_,this)
					}
				}
			};
			implContains(_,KindContains);
			return _
		}();
		_ms.newProperty(Kind,"test",()=>{
			const A=new (Kind)(()=>{
				const built={};
				const doc=built.doc=`A`;
				return _ms.setName(built,"A")
			}());
			const B=new (Kind)(()=>{
				const built={};
				const doc=built.doc=`B`;
				return _ms.setName(built,"B")
			}());
			const C=class C{
				dummy(){
					const _this=this;
					return _this
				}
			};
			kind_33(B,A);
			kind_33(C,B);
			const c=new (C)();
			_ms.assert(_ms.unlazy(contains_63),A,c);
			const X=new (Kind)(()=>{
				const built={};
				const doc=built.doc=`X`;
				return _ms.setName(built,"X")
			}());
			const Y=new (Kind)(()=>{
				const built={};
				const doc=built.doc=`Y`;
				return _ms.setName(built,"Y")
			}());
			const Z=class Z{
				dummy(){
					const _this=this;
					return _this
				}
			};
			kind_33(Z,Y);
			kind_33(Y,X);
			const z=new (Z)();
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
			const Closed=new (Kind)(()=>{
				const built={};
				const implementors=built.implementors=[C,Z];
				return _ms.setName(built,"Closed")
			}());
			_ms.assert(_ms.unlazy(fails_45with_63),`Closed is not open to new subtypes.`,()=>{
				kind_33(X,Closed)
			})
		});
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
				const X=new (Kind)(()=>{
					const built={};
					const doc=built.doc=`X`;
					return _ms.setName(built,"X")
				}());
				const Y=new (Kind)(()=>{
					const built={};
					const doc=built.doc=`Y`;
					return _ms.setName(built,"Y")
				}());
				const Z=class Z{
					dummy(){
						const _this=this;
						return _this
					}
				};
				const W=class W{
					dummy(){
						const _this=this;
						return _this
					}
				};
				kind_33(Y,X);
				kind_33(Z,X);
				kind_33(W,Y);
				_ms.assoc(built,[X],[W,Z]);
				return built
			};
			return _ms.set(function concrete_45implementors(kind){
				_ms.checkContains(Kind,kind,"kind");
				return _ms.checkContains(_ms.unlazy(_64),()=>{
					const built=[];
					for(let _ of kind.implementors){
						if(_ms.contains(Kind,_)){
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
				if(! can_45subtype_63(kind))throw _ms.error(`${_ms.show(kind)} is not open to new subtypes.`);
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
				kind_33(new (_ms.unlazy(Self_45Type))(implementor),kind);
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
					if(_ms.contains(Kind,_)){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL0tpbmQubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7RUFpQkEsZUFFSTtTQURIO2dCQWFXLE9BQ007S0FBaEIsc0JBQXNCLEtBQU0sV0FDSzs7TUFBaEMsd0JBQU87OztxQkFFUjtNQUFvQixRQUFBO01BQ25CLEdBQUEsV0FBUSxHQUNDO2NBQ1I7TUFBQSxPQUVHO2NBQUg7TUFBQTtLQUFBO3FCQUVGO01BQXFCLFFBQUE7TUFDcEIsR0FBQSxXQUFRLEdBQ0M7aUNBQ0Q7TUFBQSxPQUVKO2NBQUg7TUFBQTtLQUFBO3FCQUVGO01BQXVCLFFBQUE7TUFDdEIsR0FBQSxXQUFRLEdBQ0M7Y0FDUjtNQUFBLE9BRUc7Y0FBSCxPQUFRLGdCQUFLOzs7cUJBRWY7TUFBa0IsUUFBQTtNQUNqQixHQUFBLFdBQVEsR0FDQztjQUNSO01BQUEsT0FFRztjQUFILGNBQWM7TUFBQTtLQUFBO0tBRWhCLEtBQUssZUFBVyx1QkFBZ0I7S0FDM0IsUUFBQSxLQUFBLGtCQUNhO01BQWpCLG9CQUFnQixFQUFFO0tBQUE7SUFBQTtHQUFBO0dBOUNuQixhQUFhLEVBQUU7VUFEaEI7RUFBQTtrQkFtREQsWUFDYyxJQUFBO0dBQ1osUUFBSSxLQUFJLFVBQ0k7O0lBQVgsb0JBQU07OztHQUNQLFFBQUksS0FBSSxVQUNJOztJQUFYLG9CQUFNOzs7R0FDUCxRQUNTO1dBRUM7V0FtRVI7WUFBQTtJQUFBO0dBQUE7R0FsRUYsUUFBTSxFQUFFO0dBQ1IsUUFBTSxFQUFFO0dBQ1IsUUFBSSxLQUFJO3NDQUNVLEVBQUU7R0FHcEIsUUFBSSxLQUFJLFVBQ0k7O0lBQVgsb0JBQU07OztHQUNQLFFBQUksS0FBSSxVQUNJOztJQUFYLG9CQUFNOzs7R0FDUCxRQUNTO1dBRUM7V0FxRFI7WUFBQTtJQUFBO0dBQUE7R0FwREYsUUFBTSxFQUFFO0dBQ1IsUUFBTSxFQUFFO0dBQ1IsUUFBSSxLQUFJO3NDQUNV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