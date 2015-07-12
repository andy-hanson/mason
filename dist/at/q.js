"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Boolean","../control","../js","../private/bootstrap","../Type/Js-Method","../Type/Kind","../Type/Method","../Type/Pred-Type","../Type/Wrap-Type","../Type/Type","./at","./at-Type","./Seq/Seq","../bang","../compare","../Try"],function(exports,Boolean_0,control_1,js_2,bootstrap_3,Js_45Method_4,Kind_5,Method_6,Pred_45Type_7,Wrap_45Type_8,Type_9,_64_10,_64_45Type_11,Seq_12,_33_13,compare_14,Try_15){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_ms.get(_$2,"and"),not=_ms.get(_$2,"not"),_$3=_ms.getModule(control_1),opr=_ms.get(_$3,"opr"),_$4=_ms.getModule(js_2),defined_63=_ms.get(_$4,"defined?"),id_61_63=_ms.get(_$4,"id=?"),_$5=_ms.getModule(bootstrap_3),msDef=_ms.get(_$5,"msDef"),_$6=_ms.getModule(Js_45Method_4),js_45impl_33=_ms.get(_$6,"js-impl!"),_$7=_ms.getModule(Kind_5),kind_33=_ms.get(_$7,"kind!"),self_45kind_33=_ms.get(_$7,"self-kind!"),_$8=_ms.getModule(Method_6),self_45impl_33=_ms.get(_$8,"self-impl!"),Pred_45Type=_ms.getDefaultExport(Pred_45Type_7),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_8),_$11=_ms.getModule(Type_9),extract=_ms.get(_$11,"extract"),_$12=_ms.getModule(_64_10),empty_63=_ms.get(_$12,"empty?"),iterator=_ms.get(_$12,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_11),_$13=_ms.getModule(_64_45Type_11),empty=_ms.get(_$13,"empty"),from_45stream=_ms.get(_$13,"from-stream"),Seq=_ms.getDefaultExport(Seq_12),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_13)
		}),_$16=_ms.lazyGetModule(_33_13),_33not=_ms.lazyProp(_$16,"!not"),_$17=_ms.lazyGetModule(compare_14),_61_63=_ms.lazyProp(_$17,"=?"),_$18=_ms.lazyGetModule(Try_15),fails_63=_ms.lazyProp(_$18,"fails?");
		const _63=Wrap_45Type(function(){
			const built={};
			const doc=built.doc=`A Seq with 0 or 1 elements.\nTODO: MORE`;
			return _ms.setName(built,"?")
		}());
		const empty_45marker=function(){
			const built={};
			const doc=built.doc=`\`_.val\` on an empty \`?\` will return this.`;
			return _ms.setName(built,"empty-marker")
		}();
		const empty_45_63=function(){
			return _63(empty_45marker)
		}();
		msDef(`some`,_63);
		msDef(`None`,empty_45_63);
		self_45kind_33(_63,_64_45Type,function(){
			const built=new global.Map();
			_ms.assoc(built,from_45stream,function(stream){
				const iter=iterator(stream);
				const _$37=iter.next(),value=_$37.value,done=_$37.done;
				return function(){
					if(_ms.bool(done)){
						return empty_45_63
					} else {
						return _63(value)
					}
				}()
			});
			_ms.assoc(built,empty,function(){
				return empty_45_63
			});
			return built
		}());
		kind_33(_63,Seq,function(){
			const built=new global.Map();
			_ms.assoc(built,empty_63,function(_){
				return id_61_63(_,empty_45_63)
			});
			return built
		}());
		js_45impl_33(iterator,_63,function*(){
			if(! _ms.bool(empty_63(this))){
				(yield this.val)
			}
		});
		const Opt_45_62_63=exports["Opt->?"]=function(){
			const built={};
			const doc=built.doc=`\`?\` containing the value iff it is defined.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[0],_63(0));
				_ms.assoc(built,[null],_63(null));
				_ms.assoc(built,[void 0],empty(_63));
				return built
			};
			return _ms.set(function Opt_45_62_63(_){
				return _ms.bool(defined_63(_))?_ms.some(function(){
					return _
				}()):_ms.None
			},built)
		}();
		const _63_45_62Opt=exports["?->Opt"]=function(){
			const built={};
			const doc=built.doc=`Extracts the value from a \`?\`, or returns undefined.`;
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
			const doc=built.doc=`Tries to extract the value out of a \`?\`. Throws an error if it is empty.`;
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
						throw _ms.error(opr(_ms.unlazy(fail_45message),`Tried to force empty \`?\`.`))
					} else {
						return _.val
					}
				}()
			},built)
		}();
		const _63_45or=exports["?-or"]=function(){
			const built={};
			const doc=built.doc=`If empty, defaults to \`or\` - else returns its value.`;
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
			const doc=built.doc=`TODO`;
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
		const name=exports.name=`?`;
		exports.default=_63;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9ALz8ubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQW1CQSxVQUFHLHNCQUNTOztHQUFYLG9CQUNDOzs7RUFHRiwrQkFDYzs7R0FBYixvQkFBTTs7O0VBQ1AsNEJBQ1M7VUFBUixJQUFFO0VBQUE7RUFFSCxNQUFPLE9BQU07RUFDYixNQUFPLE9BQU07RUFHWixlQUFXLElBQUUscUJBQ007O21CQUFsQixjQUFnQixTQUFBLE9BQ007SUFBckIsV0FBTyxTQUFTO0lBQ2hCLFdBQWE7O0tBRVosWUFBQSxNQUNJO2FBQUg7S0FBQSxPQUVHO2FBQUgsSUFBRTtLQUFBO0lBQUE7R0FBQTttQkFFTCxNQUNVLFVBQUE7V0FBVDtHQUFBOzs7RUFFRixRQUFNLElBQUUsY0FDRzs7bUJBQVYsU0FBVyxTQUFBLEVBQ0M7V0FBWCxTQUFLLEVBQUU7R0FBQTs7O0VBRVQsYUFBUyxTQUFTLElBQ0ssV0FBQTtHQUF0QixjQUFRLFNBQU8sT0FDSTtXQUFmOzs7RUFHTCwrQ0FDTzs7R0FBTixvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsR0FBTyxJQUFFO29CQUNYLENBQUUsTUFBVSxJQUFFO29CQUNkLENBQUUsUUFBZSxNQUFNOzs7a0JBQ3ZCLHNCQUFBLEVBQ0M7b0JBQ0UsV0FBUSx1QkFDQztZQUFYO0lBQUE7OztFQUVILCtDQUNPOztHQUFOLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRyxJQUFFLElBQVE7dUJBQ1IsV0FBVSxhQUFRLE1BQU07OztrQkFDN0Isc0JBQUEsRUFDRztzQkFERDs7S0FFRCxZQUFBLFNBQU0sSUFDQzthQUFOO1lBRUc7YUFBSDs7Ozs7RUFHSix5Q0FDSzs7R0FBSixvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUcsSUFBRSxJQUFRO3lDQUVILFVBQUE7WUFBVCxTQUFNLE1BQU07SUFBQTs7O2tCQUNiLGtCQUFBLEVBQUksZUFDYTtzQkFEZjs7S0FFRCxZQUFBLFNBQU0sSUFDQztNQUFOLGdCQUFPLGVBSEwsZ0JBR3VCO1lBRXRCO2FBQUg7Ozs7O0VBRUoseUNBQ0s7O0dBQUosb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFHLE1BQU0sS0FBRyxHQUFPO29CQUNuQixDQUFHLElBQUUsR0FBRyxHQUFPOzs7a0JBQ2Ysa0JBQUEsRUFBSSxHQUNHO3NCQURMOztLQUVELFlBQUEsU0FBTSxJQUNDO3dCQUhKO0tBQUEsT0FLQzthQUFIOzs7OztFQUVMLHdCQUFNLHNCQUNTOztHQUFkLG9CQUFNO0dBQ04sZ0NBQVksbUJBQUEsRUFDQztXQUFaLGlCQUFLLElBQUQ7WUFBSyxJQUFJLFNBQU07SUFBQTtHQUFBO0dBRXBCLHNCQUNPLGVBQUE7O0tBQUQsUUFBQSxJQUFFO0tBQ047MkJBQUMsS0FBRDtxQkFDUzs7aURBQUgsSUFBSTtNQUFBOzs7Ozs7RUFFYixlQUFXLFFBQVEsS0FBTSxTQUFBLEVBQUE7O0lBQ3hCLHlCQUFDLEtBQUQsSUFDSztZQUFKLENBQUU7V0FFQztZQUFIO0lBQUE7R0FBQTtFQUFBO0VBdEhGLHdCQUFBO2tCQW1CQSIsImZpbGUiOiJhdC9xLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=