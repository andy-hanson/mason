"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../control","../js","../Type/Kind","../Type/Method","../Type/Wrap-Type","./at","./at-Type","./Seq/Seq","../Try","../bang","../Try"],function(exports,control_0,js_1,Kind_2,Method_3,Wrap_45Type_4,_64_5,_64_45Type_6,Seq_7,Try_8,_33_9,Try_10){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(control_0),opr=_ms.get(_$2,"opr"),_$3=_ms.getModule(js_1),defined_63=_ms.get(_$3,"defined?"),id_61_63=_ms.get(_$3,"id=?"),_$4=_ms.getModule(Kind_2),kind_33=_ms.get(_$4,"kind!"),self_45kind_33=_ms.get(_$4,"self-kind!"),_$5=_ms.getModule(Method_3),impl_33=_ms.get(_$5,"impl!"),self_45impl_33=_ms.get(_$5,"self-impl!"),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_4),_$7=_ms.getModule(_64_5),empty_63=_ms.get(_$7,"empty?"),iterator=_ms.get(_$7,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_6),_$8=_ms.getModule(_64_45Type_6),empty=_ms.get(_$8,"empty"),from_45stream=_ms.get(_$8,"from-stream"),Seq=_ms.getDefaultExport(Seq_7),_$11=_ms.lazyGetModule(Try_8),oh_45no_33=_ms.lazyProp(_$11,"oh-no!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_9)
		}),_$13=_ms.lazyGetModule(_33_9),_33not=_ms.lazyProp(_$13,"!not"),_$14=_ms.lazyGetModule(Try_10),fails_63=_ms.lazyProp(_$14,"fails?");
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
			const _$30=iter.next(null),value=_$30.value,done=_$30.done;
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
		exports.default=_63;
		const displayName=exports.displayName="?";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9ALz8ubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2lDQWNBOzs7OztFQUFBLFVBQUksc0JBQVM7R0FDWixVQUNDO1VBRlc7Ozs7O0VBS2IsK0JBQWM7R0FDYixVQUFNO1VBRE87Ozs7O0VBRWQsNEJBQVM7VUFDUixJQUFBO0VBQUE7RUFHQSxlQUFBLElBQUE7RUFFQSxlQUFBLGNBQUEsSUFBMEIsU0FBQSxPQUN6QjtHQUFBLFdBQU8sU0FBQTtHQUNQLFdBQWEsVUFBVTs7SUFFdEIsWUFBQSxNQUNDO1lBQUE7SUFBQSxPQUVBO1lBQUEsSUFBQTtJQUFBO0dBQUE7RUFBQTtFQUVILGVBQUEsTUFBQSxJQUFvQixVQUNuQjtVQUFBO0VBQUE7RUFFRCxRQUFBLElBQUE7RUFFQSxRQUFBLFNBQUEsSUFBZ0IsU0FBQSxFQUNmO1VBQUEsU0FBSyxFQUFMO0VBQUE7RUFFRCxRQUFBLFNBQUEsSUFBbUIsVUFBQSxFQUFBO0dBQUssWUFDdkIsU0FBQSxJQUNDO0lBQUE7R0FBQSxPQUVBO0lBQUksT0FBRDs7O0VBR0wsK0NBQU87R0FDTixVQUFNO0dBQ04sV0FBTyxVQUNOO0lBQUEsVUFBQSxDQUFFLE9BQU8sSUFBRTtJQUNYLFVBQUEsQ0FBRSxVQUFRLElBQUU7SUFDWixVQUFBLENBQUEsZUFBaUIsTUFBQTs7O2tCQUNqQixTQUFBLEVBQUE7O0tBQ0EsWUFBQSxXQUFBLElBQ0M7YUFBQSxJQUFFO0tBQUEsT0FFRjthQUFBLE1BQUE7S0FBQTtJQUFBO0dBQUE7O0VBRUgsK0NBQU87R0FDTixVQUFNO0dBQ04sV0FBTyxVQUNOO0lBQUEsVUFBQSxDQUFFLElBQUcsUUFBUTt1QkFDYixXQUFjLGFBQVEsTUFBQTs7O2tCQUN0QixTQUFBLEVBQ0E7c0JBREU7O0tBRUQsWUFBQSxTQUFBLElBQ0M7YUFBQTtLQUFBLE9BRUE7YUFBQTs7Ozs7RUFHSix5Q0FBSztHQUNKLFVBQU07R0FDTixXQUFPLFVBQ047SUFBQSxVQUFBLENBQUUsSUFBRyxRQUFRO3lDQUNILFVBQ1Q7WUFBQSxTQUFLLE1BQUE7SUFBQTs7O2tCQUNOLFNBQUEsRUFBSSxlQUNKO3NCQURFOztLQUVELFlBQUEsU0FBQSxJQUNDO29DQUFPLGVBSEwsZ0JBR3dCO0tBQUEsT0FFMUI7YUFBQTs7Ozs7RUFFSix5Q0FBSztHQUNKLFVBQU07R0FDTixXQUFPLFVBQ047SUFBQSxVQUFBLENBQUUsTUFBQSxLQUFVLE9BQU87SUFDbkIsVUFBQSxDQUFFLElBQUcsR0FBRyxPQUFPOzs7a0JBQ2YsU0FBQSxFQUFJLEdBQ0o7c0JBREU7O0tBRUQsWUFBQSxTQUFBLElBQ0M7d0JBSEU7S0FBQSxPQUtGO2FBQUE7Ozs7O2tCQUVMO0VBckdBLHNDQUFBIiwiZmlsZSI6ImF0L3EuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==