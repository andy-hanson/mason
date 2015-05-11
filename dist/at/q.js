"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Bool","../control","../js","../Type/Kind","../Type/Method","../Type/Pred-Type","../Type/Wrap-Type","../Type/Type","./at","./at-Type","./Seq/Seq","../Try","../bang","../compare","../Try"],function(exports,Bool_0,control_1,js_2,Kind_3,Method_4,Pred_45Type_5,Wrap_45Type_6,Type_7,_64_8,_64_45Type_9,Seq_10,Try_11,_33_12,compare_13,Try_14){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Bool_0),and=_ms.get(_$2,"and"),not=_ms.get(_$2,"not"),_$3=_ms.getModule(control_1),opr=_ms.get(_$3,"opr"),_$4=_ms.getModule(js_2),defined_63=_ms.get(_$4,"defined?"),id_61_63=_ms.get(_$4,"id=?"),_$5=_ms.getModule(Kind_3),kind_33=_ms.get(_$5,"kind!"),self_45kind_33=_ms.get(_$5,"self-kind!"),_$6=_ms.getModule(Method_4),impl_33=_ms.get(_$6,"impl!"),self_45impl_33=_ms.get(_$6,"self-impl!"),Pred_45Type=_ms.getDefaultExport(Pred_45Type_5),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_6),_$9=_ms.getModule(Type_7),extract=_ms.get(_$9,"extract"),_$10=_ms.getModule(_64_8),empty_63=_ms.get(_$10,"empty?"),iterator=_ms.get(_$10,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_9),_$11=_ms.getModule(_64_45Type_9),empty=_ms.get(_$11,"empty"),from_45stream=_ms.get(_$11,"from-stream"),Seq=_ms.getDefaultExport(Seq_10),_$14=_ms.lazyGetModule(Try_11),oh_45no_33=_ms.lazyProp(_$14,"oh-no!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_12)
		}),_$16=_ms.lazyGetModule(_33_12),_33not=_ms.lazyProp(_$16,"!not"),_$17=_ms.lazyGetModule(compare_13),_61_63=_ms.lazyProp(_$17,"=?"),_$18=_ms.lazyGetModule(Try_14),fails_63=_ms.lazyProp(_$18,"fails?");
		const exports={};
		const _63=Wrap_45Type(function(){
			const doc="A Seq with 0 or 1 elements.\nTODO: MORE";
			return {
				doc:doc,
				displayName:"?"
			}
		}());
		const empty_45marker=function(){
			const doc="`_.val` on an empty `?` will return this.";
			return {
				doc:doc,
				displayName:"empty-marker"
			}
		}();
		const empty_45_63=function(){
			return _63(empty_45marker)
		}();
		self_45kind_33(_63,_64_45Type);
		self_45impl_33(from_45stream,_63,function(stream){
			const iter=iterator(stream);
			const _$34=iter.next(null),value=_$34.value,done=_$34.done;
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
			if(_ms.bool(empty_63(_))){
				null
			} else {
				(yield _.val)
			}
		});
		const Opt_45_62_63=exports["Opt->?"]=function(){
			const doc="`?` containing the value iff it is defined.";
			const test=function(){
				const _k0=[0],_v0=_63(0);
				const _k1=[null],_v1=_63(null);
				const _k2=[undefined],_v2=empty(_63);
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2)
			};
			return _ms.set(function(_){
				return function(){
					if(_ms.bool(defined_63(_))){
						return _63(_)
					} else {
						return empty(_63)
					}
				}()
			},"doc",doc,"test",test,"displayName","Opt->?")
		}();
		const _63_45_62Opt=exports["?->Opt"]=function(){
			const doc="Extracts the value from a `?`, or returns undefined.";
			const test=function(){
				const _k0=[_63(0)],_v0=0;
				_ms.unlazy(_33not)(defined_63,_63_45_62Opt(empty(_63)));
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function(_){
				_ms.checkContains(_63,_,"_");
				return function(){
					if(_ms.bool(empty_63(_))){
						return undefined
					} else {
						return _.val
					}
				}()
			},"doc",doc,"test",test,"displayName","?->Opt")
		}();
		const un_45_63=exports["un-?"]=function(){
			const doc="Tries to extract the value out of a `?`. Throws an error if it is empty.";
			const test=function(){
				const _k0=[_63(1)],_v0=1;
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return un_45_63(empty(_63))
				});
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function(_,fail_45message){
				_ms.checkContains(_63,_,"_");
				return function(){
					if(_ms.bool(empty_63(_))){
						return _ms.unlazy(oh_45no_33)(opr(_ms.unlazy(fail_45message),"Tried to force empty `?`."))
					} else {
						return _.val
					}
				}()
			},"doc",doc,"test",test,"displayName","un-?")
		}();
		const _63_45or=exports["?-or"]=function(){
			const doc="If empty, defaults to `or` - else returns its value.";
			const test=function(){
				const _k0=[empty(_63),1],_v0=1;
				const _k1=[_63(1),2],_v1=1;
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function(_,or){
				_ms.checkContains(_63,_,"_");
				return function(){
					if(_ms.bool(empty_63(_))){
						return _ms.unlazy(or)
					} else {
						return _.val
					}
				}()
			},"doc",doc,"test",test,"displayName","?-or")
		}();
		const Some=exports.Some=Pred_45Type(function(){
			const doc="TODO";
			const predicate=function(_){
				return and(_ms.contains(_63,_),_ms.lazy(function(){
					return not(empty_63(_))
				}))
			};
			const test=function(){
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
				displayName:"Some"
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
		exports.default=_63;
		const displayName=exports.displayName="?";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9ALz8ubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2lDQWtCQTs7Ozs7RUFBQSxVQUFJLHNCQUNTO0dBQVosVUFDQztVQURXOzs7OztFQUliLCtCQUNjO0dBQWIsVUFBTTtVQUFPOzs7OztFQUNkLDRCQUNTO1VBQVIsSUFBRTtFQUFBO0VBR0YsZUFBVyxJQUFFO0VBRWIsZUFBVyxjQUFZLElBQUcsU0FBQSxPQUNNO0dBQS9CLFdBQU8sU0FBUztHQUNoQixXQUFhLFVBQVU7O0lBRXRCLFlBQUEsTUFDSTtZQUFIO0lBQUEsT0FFRztZQUFILElBQUU7SUFBQTtHQUFBO0VBQUE7RUFFTCxlQUFXLE1BQU0sSUFDRyxVQUFBO1VBQW5CO0VBQUE7RUFFRCxRQUFNLElBQUU7RUFFUixRQUFNLFNBQU8sSUFBRyxTQUFBLEVBQ0M7VUFBaEIsU0FBSyxFQUFFO0VBQUE7RUFFUixRQUFNLFNBQVMsSUFBSSxVQUFBLEVBQUE7R0FDSyxZQUF2QixTQUFBLElBQ087SUFBTjtHQUFBLE9BRUc7SUFBQSxPQUFBOzs7RUFHTCwrQ0FDTztHQUFOLFVBQU07R0FDTixXQUNPLFVBQUE7SUFBTixVQUFBLENBQUUsT0FBTyxJQUFFO0lBQ1gsVUFBQSxDQUFFLFVBQVEsSUFBRTtJQUNaLFVBQUEsQ0FBRSxlQUFlLE1BQU07OztrQkFDdkIsU0FBQSxFQUFBOztLQUNBLFlBQUEsV0FBQSxJQUNTO2FBQVIsSUFBRTtLQUFBLE9BRUM7YUFBSCxNQUFNO0tBQUE7SUFBQTtHQUFBOztFQUVULCtDQUNPO0dBQU4sVUFBTTtHQUNOLFdBQ08sVUFBQTtJQUFOLFVBQUEsQ0FBRyxJQUFFLFFBQVE7dUJBQ1IsV0FBVSxhQUFRLE1BQU07OztrQkFDN0IsU0FBQSxFQUNHO3NCQUREOztLQUVELFlBQUEsU0FBQSxJQUNPO2FBQU47S0FBQSxPQUVHO2FBQUg7Ozs7O0VBR0oseUNBQ0s7R0FBSixVQUFNO0dBQ04sV0FDTyxVQUFBO0lBQU4sVUFBQSxDQUFHLElBQUUsUUFBUTt5Q0FFSCxVQUFBO1lBQVQsU0FBTSxNQUFNO0lBQUE7OztrQkFDYixTQUFBLEVBQUksZUFDYTtzQkFEZjs7S0FFRCxZQUFBLFNBQUEsSUFDTztvQ0FBRSxlQUhOLGdCQUd3QjtLQUFBLE9BRXZCO2FBQUg7Ozs7O0VBRUoseUNBQ0s7R0FBSixVQUFNO0dBQ04sV0FDTyxVQUFBO0lBQU4sVUFBQSxDQUFHLE1BQU0sS0FBRyxPQUFPO0lBQ25CLFVBQUEsQ0FBRyxJQUFFLEdBQUcsT0FBTzs7O2tCQUNmLFNBQUEsRUFBSSxHQUNHO3NCQURMOztLQUVELFlBQUEsU0FBQSxJQUNPO3dCQUhKO0tBQUEsT0FLQzthQUFIOzs7OztFQUVMLHdCQUFNLHNCQUNTO0dBQWQsVUFBTTtHQUNOLGdCQUFZLFNBQUEsRUFDQztXQUFaLGlCQUFLLElBQUQ7WUFBSyxJQUFJLFNBQUE7SUFBQTtHQUFBO0dBQ2QsV0FDTyxVQUFBOztLQUFELFFBQUEsSUFBRTtLQUNOOzJCQUFDLEtBQUQ7cUJBQ1M7O2lEQUFILElBQUk7TUFBQTs7OztVQU5FOzs7Ozs7O0VBUWYsZUFBVyxRQUFRLEtBQU0sU0FBQSxFQUFBOztJQUN4Qix5QkFBQyxLQUFELElBQ0s7WUFBSixDQUFFO1dBRUM7WUFBSDtJQUFBO0dBQUE7RUFBQTtrQkFFRjtFQXhIQSxzQ0FBQSIsImZpbGUiOiJhdC9xLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=