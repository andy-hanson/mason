"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Boolean","../control","../js","../Type/Js-Method","../Type/Kind","../Type/Method","../Type/Pred-Type","../Type/Wrap-Type","../Type/Type","./at","./at-Type","./Seq/Seq","../Try","../bang","../compare","../Try"],function(exports,Boolean_0,control_1,js_2,Js_45Method_3,Kind_4,Method_5,Pred_45Type_6,Wrap_45Type_7,Type_8,_64_9,_64_45Type_10,Seq_11,Try_12,_33_13,compare_14,Try_15){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_ms.get(_$2,"and"),not=_ms.get(_$2,"not"),_$3=_ms.getModule(control_1),opr=_ms.get(_$3,"opr"),_$4=_ms.getModule(js_2),defined_63=_ms.get(_$4,"defined?"),id_61_63=_ms.get(_$4,"id=?"),_$5=_ms.getModule(Js_45Method_3),js_45impl_33=_ms.get(_$5,"js-impl!"),_$6=_ms.getModule(Kind_4),kind_33=_ms.get(_$6,"kind!"),self_45kind_33=_ms.get(_$6,"self-kind!"),_$7=_ms.getModule(Method_5),impl_33=_ms.get(_$7,"impl!"),self_45impl_33=_ms.get(_$7,"self-impl!"),Pred_45Type=_ms.getDefaultExport(Pred_45Type_6),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_7),_$10=_ms.getModule(Type_8),extract=_ms.get(_$10,"extract"),_$11=_ms.getModule(_64_9),empty_63=_ms.get(_$11,"empty?"),iterator=_ms.get(_$11,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_10),_$12=_ms.getModule(_64_45Type_10),empty=_ms.get(_$12,"empty"),from_45stream=_ms.get(_$12,"from-stream"),Seq=_ms.getDefaultExport(Seq_11),_$15=_ms.lazyGetModule(Try_12),oh_45no_33=_ms.lazyProp(_$15,"oh-no!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_13)
		}),_$17=_ms.lazyGetModule(_33_13),_33not=_ms.lazyProp(_$17,"!not"),_$18=_ms.lazyGetModule(compare_14),_61_63=_ms.lazyProp(_$18,"=?"),_$19=_ms.lazyGetModule(Try_15),fails_63=_ms.lazyProp(_$19,"fails?");
		const _63=Wrap_45Type(function(){
			const built={};
			const doc=built.doc="A Seq with 0 or 1 elements.\nTODO: MORE";
			return _ms.setName(built,"?")
		}());
		const empty_45marker=function(){
			const built={};
			const doc=built.doc="`_.val` on an empty `?` will return this.";
			return _ms.setName(built,"empty-marker")
		}();
		const empty_45_63=function(){
			return _63(empty_45marker)
		}();
		self_45kind_33(_63,_64_45Type);
		self_45impl_33(from_45stream,_63,function(stream){
			const iter=iterator(stream);
			const _$36=iter.next(),value=_$36.value,done=_$36.done;
			return function(){
				if(_ms.bool(done)){
					return empty_45_63
				} else {
					return _63(value)
				}
			}()
		});
		self_45impl_33(empty,_63,function(){
			return empty_45_63
		});
		kind_33(_63,Seq);
		impl_33(empty_63,_63,function(_){
			return id_61_63(_,empty_45_63)
		});
		js_45impl_33(iterator,_63,function*(){
			if(! _ms.bool(empty_63(this))){
				(yield this.val)
			}
		});
		const Opt_45_62_63=exports["Opt->?"]=function(){
			const built={};
			const doc=built.doc="`?` containing the value iff it is defined.";
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[0],_63(0));
				_ms.assoc(built,[null],_63(null));
				_ms.assoc(built,[void 0],empty(_63));
				return built
			};
			return _ms.set(function Opt_45_62_63(_){
				return function(){
					if(_ms.bool(defined_63(_))){
						return _63(_)
					} else {
						return empty(_63)
					}
				}()
			},built)
		}();
		const _63_45_62Opt=exports["?->Opt"]=function(){
			const built={};
			const doc=built.doc="Extracts the value from a `?`, or returns undefined.";
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[_63(0)],0);
				_ms.unlazy(_33not)(defined_63,_63_45_62Opt(empty(_63)));
				return built
			};
			return _ms.set(function _63_45_62Opt(_){
				_ms.checkContains(_63,_,"_");
				return function(){
					if(_ms.bool(empty_63(_))){
						return void 0
					} else {
						return _.val
					}
				}()
			},built)
		}();
		const un_45_63=exports["un-?"]=function(){
			const built={};
			const doc=built.doc="Tries to extract the value out of a `?`. Throws an error if it is empty.";
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[_63(1)],1);
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return un_45_63(empty(_63))
				});
				return built
			};
			return _ms.set(function un_45_63(_,fail_45message){
				_ms.checkContains(_63,_,"_");
				return function(){
					if(_ms.bool(empty_63(_))){
						return _ms.unlazy(oh_45no_33)(opr(_ms.unlazy(fail_45message),"Tried to force empty `?`."))
					} else {
						return _.val
					}
				}()
			},built)
		}();
		const _63_45or=exports["?-or"]=function(){
			const built={};
			const doc=built.doc="If empty, defaults to `or` - else returns its value.";
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[empty(_63),1],1);
				_ms.assoc(built,[_63(1),2],1);
				return built
			};
			return _ms.set(function _63_45or(_,or){
				_ms.checkContains(_63,_,"_");
				return function(){
					if(_ms.bool(empty_63(_))){
						return _ms.unlazy(or)
					} else {
						return _.val
					}
				}()
			},built)
		}();
		const Some=exports.Some=Pred_45Type(function(){
			const built={};
			const doc=built.doc="TODO";
			const predicate=built.predicate=function predicate(_){
				return and(_ms.contains(_63,_),_ms.lazy(function(){
					return not(empty_63(_))
				}))
			};
			const test=built.test=function test(){
				return function(){
					const _=_63(1);
					{
						const _$=_ms.extract(Some,_);
						if((_$!==null)){
							const val=_$[0];
							return _ms.unlazy(_33)(_ms.unlazy(_61_63),val,1)
						} else throw new Error("No branch of `case` matches.")
					}
				}()
			};
			return _ms.setName(built,"Some")
		}());
		self_45impl_33(extract,Some,function(_){
			return function(){
				if(_ms.bool(_ms.contains(Some,_))){
					return [_.val]
				} else {
					return null
				}
			}()
		});
		const name=exports.name="?";
		exports.default=_63;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9ALz8ubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQW9CQSxVQUFHLHNCQUNTOztHQUFYLG9CQUNDOzs7RUFHRiwrQkFDYzs7R0FBYixvQkFBTTs7O0VBQ1AsNEJBQ1M7VUFBUixJQUFFO0VBQUE7RUFHRixlQUFXLElBQUU7RUFFYixlQUFXLGNBQVksSUFBRyxTQUFBLE9BQ007R0FBL0IsV0FBTyxTQUFTO0dBQ2hCLFdBQWE7O0lBRVosWUFBQSxNQUNJO1lBQUg7SUFBQSxPQUVHO1lBQUgsSUFBRTtJQUFBO0dBQUE7RUFBQTtFQUVMLGVBQVcsTUFBTSxJQUNHLFVBQUE7VUFBbkI7RUFBQTtFQUVELFFBQU0sSUFBRTtFQUVSLFFBQU0sU0FBTyxJQUFHLFNBQUEsRUFDQztVQUFoQixTQUFLLEVBQUU7RUFBQTtFQUVSLGFBQVMsU0FBUyxJQUNLLFdBQUE7R0FBdEIsY0FBUSxTQUFPLE9BQ0k7V0FBZjs7O0VBR0wsK0NBQ087O0dBQU4sb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFFLEdBQU8sSUFBRTtvQkFDWCxDQUFFLE1BQVUsSUFBRTtvQkFDZCxDQUFFLFFBQWUsTUFBTTs7O2tCQUN2QixzQkFBQSxFQUFBOztLQUNBLFlBQUEsV0FBUSxJQUNDO2FBQVIsSUFBRTtLQUFBLE9BRUM7YUFBSCxNQUFNO0tBQUE7SUFBQTtHQUFBOztFQUVULCtDQUNPOztHQUFOLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRyxJQUFFLElBQVE7dUJBQ1IsV0FBVSxhQUFRLE1BQU07OztrQkFDN0Isc0JBQUEsRUFDRztzQkFERDs7S0FFRCxZQUFBLFNBQU0sSUFDQzthQUFOO1lBRUc7YUFBSDs7Ozs7RUFHSix5Q0FDSzs7R0FBSixvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUcsSUFBRSxJQUFRO3lDQUVILFVBQUE7WUFBVCxTQUFNLE1BQU07SUFBQTs7O2tCQUNiLGtCQUFBLEVBQUksZUFDYTtzQkFEZjs7S0FFRCxZQUFBLFNBQU0sSUFDQztvQ0FBRSxlQUhOLGdCQUd3QjtLQUFBLE9BRXZCO2FBQUg7Ozs7O0VBRUoseUNBQ0s7O0dBQUosb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFHLE1BQU0sS0FBRyxHQUFPO29CQUNuQixDQUFHLElBQUUsR0FBRyxHQUFPOzs7a0JBQ2Ysa0JBQUEsRUFBSSxHQUNHO3NCQURMOztLQUVELFlBQUEsU0FBTSxJQUNDO3dCQUhKO0tBQUEsT0FLQzthQUFIOzs7OztFQUVMLHdCQUFNLHNCQUNTOztHQUFkLG9CQUFNO0dBQ04sZ0NBQVksbUJBQUEsRUFDQztXQUFaLGlCQUFLLElBQUQ7WUFBSyxJQUFJLFNBQU07SUFBQTtHQUFBO0dBRXBCLHNCQUNPLGVBQUE7O0tBQUQsUUFBQSxJQUFFO0tBQ047MkJBQUMsS0FBRDtxQkFDUzs7aURBQUgsSUFBSTtNQUFBOzs7Ozs7RUFFYixlQUFXLFFBQVEsS0FBTSxTQUFBLEVBQUE7O0lBQ3hCLHlCQUFDLEtBQUQsSUFDSztZQUFKLENBQUU7V0FFQztZQUFIO0lBQUE7R0FBQTtFQUFBO0VBdkhGLHdCQUFBO2tCQW9CQSIsImZpbGUiOiJhdC9xLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=