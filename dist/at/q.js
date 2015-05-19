"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Boolean","../control","../js","../Type/Kind","../Type/Method","../Type/Pred-Type","../Type/Wrap-Type","../Type/Type","./at","./at-Type","./Seq/Seq","../Try","../bang","../compare","../Try"],function(exports,Boolean_0,control_1,js_2,Kind_3,Method_4,Pred_45Type_5,Wrap_45Type_6,Type_7,_64_8,_64_45Type_9,Seq_10,Try_11,_33_12,compare_13,Try_14){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_ms.get(_$2,"and"),not=_ms.get(_$2,"not"),_$3=_ms.getModule(control_1),opr=_ms.get(_$3,"opr"),_$4=_ms.getModule(js_2),defined_63=_ms.get(_$4,"defined?"),id_61_63=_ms.get(_$4,"id=?"),_$5=_ms.getModule(Kind_3),kind_33=_ms.get(_$5,"kind!"),self_45kind_33=_ms.get(_$5,"self-kind!"),_$6=_ms.getModule(Method_4),impl_33=_ms.get(_$6,"impl!"),self_45impl_33=_ms.get(_$6,"self-impl!"),Pred_45Type=_ms.getDefaultExport(Pred_45Type_5),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_6),_$9=_ms.getModule(Type_7),extract=_ms.get(_$9,"extract"),_$10=_ms.getModule(_64_8),empty_63=_ms.get(_$10,"empty?"),iterator=_ms.get(_$10,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_9),_$11=_ms.getModule(_64_45Type_9),empty=_ms.get(_$11,"empty"),from_45stream=_ms.get(_$11,"from-stream"),Seq=_ms.getDefaultExport(Seq_10),_$14=_ms.lazyGetModule(Try_11),oh_45no_33=_ms.lazyProp(_$14,"oh-no!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_12)
		}),_$16=_ms.lazyGetModule(_33_12),_33not=_ms.lazyProp(_$16,"!not"),_$17=_ms.lazyGetModule(compare_13),_61_63=_ms.lazyProp(_$17,"=?"),_$18=_ms.lazyGetModule(Try_14),fails_63=_ms.lazyProp(_$18,"fails?");
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
			const _$34=iter.next(),value=_$34.value,done=_$34.done;
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
		impl_33(iterator,_63,function*(_){
			if(! _ms.bool(empty_63(_))){
				(yield _.val)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9ALz8ubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztFQWtCQSxVQUFJLHNCQUNTO0dBQVosVUFDQzs7Ozs7O0VBR0YsK0JBQ2M7R0FBYixVQUFNOzs7Ozs7RUFDUCw0QkFDUztVQUFSLElBQUU7RUFBQTtFQUdGLGVBQVcsSUFBRTtFQUViLGVBQVcsY0FBWSxJQUFHLFNBQUEsT0FDTTtHQUEvQixXQUFPLFNBQVM7R0FDaEIsV0FBYTs7SUFFWixZQUFBLE1BQ0k7WUFBSDtJQUFBLE9BRUc7WUFBSCxJQUFFO0lBQUE7R0FBQTtFQUFBO0VBRUwsZUFBVyxNQUFNLElBQ0csVUFBQTtVQUFuQjtFQUFBO0VBRUQsUUFBTSxJQUFFO0VBRVIsUUFBTSxTQUFPLElBQUcsU0FBQSxFQUNDO1VBQWhCLFNBQUssRUFBRTtFQUFBO0VBRVIsUUFBTSxTQUFTLElBQUksVUFBQSxFQUNDO0dBQW5CLGNBQVEsU0FBQSxJQUNPO1dBQVg7OztFQUdMLCtDQUNPO0dBQU4sVUFBTTtHQUNOLFdBQ08sZUFBQTtJQUFOLFVBQUEsQ0FBRSxPQUFPLElBQUU7SUFDWCxVQUFBLENBQUUsVUFBVSxJQUFFO0lBQ2QsVUFBQSxDQUFFLFlBQWUsTUFBTTs7O2tCQUN2QixzQkFBQSxFQUFBOztLQUNBLFlBQUEsV0FBQSxJQUNTO2FBQVIsSUFBRTtLQUFBLE9BRUM7YUFBSCxNQUFNO0tBQUE7SUFBQTtHQUFBOztFQUVULCtDQUNPO0dBQU4sVUFBTTtHQUNOLFdBQ08sZUFBQTtJQUFOLFVBQUEsQ0FBRyxJQUFFLFFBQVE7dUJBQ1IsV0FBVSxhQUFRLE1BQU07OztrQkFDN0Isc0JBQUEsRUFDRztzQkFERDs7S0FFRCxZQUFBLFNBQUEsSUFDTzthQUFOO1lBRUc7YUFBSDs7Ozs7RUFHSix5Q0FDSztHQUFKLFVBQU07R0FDTixXQUNPLGVBQUE7SUFBTixVQUFBLENBQUcsSUFBRSxRQUFRO3lDQUVILFVBQUE7WUFBVCxTQUFNLE1BQU07SUFBQTs7O2tCQUNiLGtCQUFBLEVBQUksZUFDYTtzQkFEZjs7S0FFRCxZQUFBLFNBQUEsSUFDTztvQ0FBRSxlQUhOLGdCQUd3QjtLQUFBLE9BRXZCO2FBQUg7Ozs7O0VBRUoseUNBQ0s7R0FBSixVQUFNO0dBQ04sV0FDTyxlQUFBO0lBQU4sVUFBQSxDQUFHLE1BQU0sS0FBRyxPQUFPO0lBQ25CLFVBQUEsQ0FBRyxJQUFFLEdBQUcsT0FBTzs7O2tCQUNmLGtCQUFBLEVBQUksR0FDRztzQkFETDs7S0FFRCxZQUFBLFNBQUEsSUFDTzt3QkFISjtLQUFBLE9BS0M7YUFBSDs7Ozs7RUFFTCx3QkFBTSxzQkFDUztHQUFkLFVBQU07R0FDTixnQkFBWSxtQkFBQSxFQUNDO1dBQVosaUJBQUssSUFBRDtZQUFLLElBQUksU0FBQTtJQUFBO0dBQUE7R0FDZCxXQUNPLGVBQUE7O0tBQUQsUUFBQSxJQUFFO0tBQ047MkJBQUMsS0FBRDtxQkFDUzs7aURBQUgsSUFBSTtNQUFBOzs7Ozs7Ozs7OztFQUViLGVBQVcsUUFBUSxLQUFNLFNBQUEsRUFBQTs7SUFDeEIseUJBQUMsS0FBRCxJQUNLO1lBQUosQ0FBRTtXQUVDO1lBQUg7SUFBQTtHQUFBO0VBQUE7RUFwSEYsd0JBQUE7a0JBc0hBIiwiZmlsZSI6ImF0L3EuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==