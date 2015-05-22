"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Boolean","../control","../js","../Type/Js-Method","../Type/Kind","../Type/Method","../Type/Pred-Type","../Type/Wrap-Type","../Type/Type","./at","./at-Type","./Seq/Seq","../Try","../bang","../compare","../Try"],function(exports,Boolean_0,control_1,js_2,Js_45Method_3,Kind_4,Method_5,Pred_45Type_6,Wrap_45Type_7,Type_8,_64_9,_64_45Type_10,Seq_11,Try_12,_33_13,compare_14,Try_15){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_ms.get(_$2,"and"),not=_ms.get(_$2,"not"),_$3=_ms.getModule(control_1),opr=_ms.get(_$3,"opr"),_$4=_ms.getModule(js_2),defined_63=_ms.get(_$4,"defined?"),id_61_63=_ms.get(_$4,"id=?"),_$5=_ms.getModule(Js_45Method_3),js_45impl_33=_ms.get(_$5,"js-impl!"),_$6=_ms.getModule(Kind_4),kind_33=_ms.get(_$6,"kind!"),self_45kind_33=_ms.get(_$6,"self-kind!"),_$7=_ms.getModule(Method_5),impl_33=_ms.get(_$7,"impl!"),self_45impl_33=_ms.get(_$7,"self-impl!"),Pred_45Type=_ms.getDefaultExport(Pred_45Type_6),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_7),_$10=_ms.getModule(Type_8),extract=_ms.get(_$10,"extract"),_$11=_ms.getModule(_64_9),empty_63=_ms.get(_$11,"empty?"),iterator=_ms.get(_$11,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_10),_$12=_ms.getModule(_64_45Type_10),empty=_ms.get(_$12,"empty"),from_45stream=_ms.get(_$12,"from-stream"),Seq=_ms.getDefaultExport(Seq_11),_$15=_ms.lazyGetModule(Try_12),oh_45no_33=_ms.lazyProp(_$15,"oh-no!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_13)
		}),_$17=_ms.lazyGetModule(_33_13),_33not=_ms.lazyProp(_$17,"!not"),_$18=_ms.lazyGetModule(compare_14),_61_63=_ms.lazyProp(_$18,"=?"),_$19=_ms.lazyGetModule(Try_15),fails_63=_ms.lazyProp(_$19,"fails?");
		const _63=Wrap_45Type(function(){
			const doc="A Seq with 0 or 1 elements.\nTODO: MORE";
			return {
				doc:doc,
				name:"?"
			}
		}());
		const empty_45marker=function(){
			const doc="`_.val` on an empty `?` will return this.";
			return {
				doc:doc,
				name:"empty-marker"
			}
		}();
		const empty_45_63=function(){
			return _63(empty_45marker)
		}();
		self_45kind_33(_63,_64_45Type);
		self_45impl_33(from_45stream,_63,function(stream){
			const iter=iterator(stream);
			const _$35=iter.next(),value=_$35.value,done=_$35.done;
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
			const doc="`?` containing the value iff it is defined.";
			const test=function test(){
				const _k0=[0],_v0=_63(0);
				const _k1=[null],_v1=_63(null);
				const _k2=[void 0],_v2=empty(_63);
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2)
			};
			return _ms.set(function Opt_45_62_63(_){
				return function(){
					if(_ms.bool(defined_63(_))){
						return _63(_)
					} else {
						return empty(_63)
					}
				}()
			},"doc",doc,"test",test)
		}();
		const _63_45_62Opt=exports["?->Opt"]=function(){
			const doc="Extracts the value from a `?`, or returns undefined.";
			const test=function test(){
				const _k0=[_63(0)],_v0=0;
				_ms.unlazy(_33not)(defined_63,_63_45_62Opt(empty(_63)));
				return _ms.map(_k0,_v0)
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
			},"doc",doc,"test",test)
		}();
		const un_45_63=exports["un-?"]=function(){
			const doc="Tries to extract the value out of a `?`. Throws an error if it is empty.";
			const test=function test(){
				const _k0=[_63(1)],_v0=1;
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return un_45_63(empty(_63))
				});
				return _ms.map(_k0,_v0)
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
			},"doc",doc,"test",test)
		}();
		const _63_45or=exports["?-or"]=function(){
			const doc="If empty, defaults to `or` - else returns its value.";
			const test=function test(){
				const _k0=[empty(_63),1],_v0=1;
				const _k1=[_63(1),2],_v1=1;
				return _ms.map(_k0,_v0,_k1,_v1)
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
			},"doc",doc,"test",test)
		}();
		const Some=exports.Some=Pred_45Type(function(){
			const doc="TODO";
			const predicate=function predicate(_){
				return and(_ms.contains(_63,_),_ms.lazy(function(){
					return not(empty_63(_))
				}))
			};
			const test=function test(){
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
			return {
				doc:doc,
				predicate:predicate,
				test:test,
				name:"Some"
			}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9ALz8ubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQW1CQSxVQUFJLHNCQUNTO0dBQVosVUFDQzs7Ozs7O0VBR0YsK0JBQ2M7R0FBYixVQUFNOzs7Ozs7RUFDUCw0QkFDUztVQUFSLElBQUU7RUFBQTtFQUdGLGVBQVcsSUFBRTtFQUViLGVBQVcsY0FBWSxJQUFHLFNBQUEsT0FDTTtHQUEvQixXQUFPLFNBQVM7R0FDaEIsV0FBYTs7SUFFWixZQUFBLE1BQ0k7WUFBSDtJQUFBLE9BRUc7WUFBSCxJQUFFO0lBQUE7R0FBQTtFQUFBO0VBRUwsZUFBVyxNQUFNLElBQ0csVUFBQTtVQUFuQjtFQUFBO0VBRUQsUUFBTSxJQUFFO0VBRVIsUUFBTSxTQUFPLElBQUcsU0FBQSxFQUNDO1VBQWhCLFNBQUssRUFBRTtFQUFBO0VBRVIsYUFBUyxTQUFTLElBQ0ksV0FBQTtHQUFyQixjQUFRLFNBQU8sT0FDSTtXQUFmOzs7RUFHTCwrQ0FDTztHQUFOLFVBQU07R0FDTixXQUNPLGVBQUE7SUFBTixVQUFBLENBQUUsT0FBTyxJQUFFO0lBQ1gsVUFBQSxDQUFFLFVBQVUsSUFBRTtJQUNkLFVBQUEsQ0FBRSxZQUFlLE1BQU07OztrQkFDdkIsc0JBQUEsRUFBQTs7S0FDQSxZQUFBLFdBQVEsSUFDQzthQUFSLElBQUU7S0FBQSxPQUVDO2FBQUgsTUFBTTtLQUFBO0lBQUE7R0FBQTs7RUFFVCwrQ0FDTztHQUFOLFVBQU07R0FDTixXQUNPLGVBQUE7SUFBTixVQUFBLENBQUcsSUFBRSxRQUFRO3VCQUNSLFdBQVUsYUFBUSxNQUFNOzs7a0JBQzdCLHNCQUFBLEVBQ0c7c0JBREQ7O0tBRUQsWUFBQSxTQUFNLElBQ0M7YUFBTjtZQUVHO2FBQUg7Ozs7O0VBR0oseUNBQ0s7R0FBSixVQUFNO0dBQ04sV0FDTyxlQUFBO0lBQU4sVUFBQSxDQUFHLElBQUUsUUFBUTt5Q0FFSCxVQUFBO1lBQVQsU0FBTSxNQUFNO0lBQUE7OztrQkFDYixrQkFBQSxFQUFJLGVBQ2E7c0JBRGY7O0tBRUQsWUFBQSxTQUFNLElBQ0M7b0NBQUUsZUFITixnQkFHd0I7S0FBQSxPQUV2QjthQUFIOzs7OztFQUVKLHlDQUNLO0dBQUosVUFBTTtHQUNOLFdBQ08sZUFBQTtJQUFOLFVBQUEsQ0FBRyxNQUFNLEtBQUcsT0FBTztJQUNuQixVQUFBLENBQUcsSUFBRSxHQUFHLE9BQU87OztrQkFDZixrQkFBQSxFQUFJLEdBQ0c7c0JBREw7O0tBRUQsWUFBQSxTQUFNLElBQ0M7d0JBSEo7S0FBQSxPQUtDO2FBQUg7Ozs7O0VBRUwsd0JBQU0sc0JBQ1M7R0FBZCxVQUFNO0dBQ04sZ0JBQVksbUJBQUEsRUFDQztXQUFaLGlCQUFLLElBQUQ7WUFBSyxJQUFJLFNBQU07SUFBQTtHQUFBO0dBQ3BCLFdBQ08sZUFBQTs7S0FBRCxRQUFBLElBQUU7S0FDTjsyQkFBQyxLQUFEO3FCQUNTOztpREFBSCxJQUFJO01BQUE7Ozs7Ozs7Ozs7O0VBRWIsZUFBVyxRQUFRLEtBQU0sU0FBQSxFQUFBOztJQUN4Qix5QkFBQyxLQUFELElBQ0s7WUFBSixDQUFFO1dBRUM7WUFBSDtJQUFBO0dBQUE7RUFBQTtFQXJIRix3QkFBQTtrQkF1SEEiLCJmaWxlIjoiYXQvcS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9