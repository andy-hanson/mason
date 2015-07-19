"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../control","../js","../private/bootstrap","../Type/Js-Method","../Type/Kind","../Type/Method","../Type/Pred-Type","../Type/Wrap-Type","../Type/Type","./at","./at-Type","./Seq/Seq","../compare","../Try"],function(exports,control_0,js_1,bootstrap_2,Js_45Method_3,Kind_4,Method_5,Pred_45Type_6,Wrap_45Type_7,Type_8,_64_9,_64_45Type_10,Seq_11,compare_12,Try_13){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(control_0),opr=_ms.get(_$2,"opr"),_$3=_ms.getModule(js_1),defined_63=_ms.get(_$3,"defined?"),id_61_63=_ms.get(_$3,"id=?"),_$4=_ms.getModule(bootstrap_2),msDef=_ms.get(_$4,"msDef"),_$5=_ms.getModule(Js_45Method_3),js_45impl_33=_ms.get(_$5,"js-impl!"),_$6=_ms.getModule(Kind_4),kind_33=_ms.get(_$6,"kind!"),self_45kind_33=_ms.get(_$6,"self-kind!"),_$7=_ms.getModule(Method_5),self_45impl_33=_ms.get(_$7,"self-impl!"),Pred_45Type=_ms.getDefaultExport(Pred_45Type_6),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_7),_$10=_ms.getModule(Type_8),extract=_ms.get(_$10,"extract"),_$11=_ms.getModule(_64_9),empty_63=_ms.get(_$11,"empty?"),iterator=_ms.get(_$11,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_10),_$12=_ms.getModule(_64_45Type_10),empty=_ms.get(_$12,"empty"),from_45stream=_ms.get(_$12,"from-stream"),Seq=_ms.getDefaultExport(Seq_11),_$15=_ms.lazyGetModule(compare_12),_61_63=_ms.lazyProp(_$15,"=?"),_$16=_ms.lazyGetModule(Try_13),fails_63=_ms.lazyProp(_$16,"fails?");
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
				const _$35=iter.next(),value=_$35.value,done=_$35.done;
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
			const _this=this;
			if(! _ms.bool(empty_63(_this))){
				(yield _this.val)
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
				_ms.assertNot(defined_63,_63_45_62Opt(empty(_63)));
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
				_ms.assert(_ms.unlazy(fails_63),function(){
					return un_45_63(empty(_63))
				});
				return built
			};
			return _ms.set(function un_45_63(_,fail_45message){
				_ms.checkContains(_63,_,"_");
				if(_ms.bool(empty_63(_)))throw _ms.error(opr(_ms.unlazy(fail_45message),`Tried to force empty \`?\`.`));
				return _.val
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
			return _ms.set(function _63_45or(_,or_45else){
				_ms.checkContains(_63,_,"_");
				return function(){
					if(_ms.bool(empty_63(_))){
						return _ms.unlazy(or_45else)
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
				return (_ms.contains(_63,_)&&! empty_63(_))
			};
			const test=built.test=function test(){
				{
					const _=_63(1);
					{
						const _$=_ms.extract(Some,_);
						if((_$!==null)){
							const val=_$[0];
							_ms.assert(_ms.unlazy(_61_63),val,1)
						} else throw new Error("No branch of `case` matches.")
					}
				}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9ALz8ubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFpQkEsVUFBRyxzQkFDUzs7R0FBWCxvQkFDQzs7O0VBR0YsK0JBQ2M7O0dBQWIsb0JBQU07OztFQUNQLDRCQUNTO1VBQVIsSUFBRTtFQUFBO0VBRUgsTUFBTyxPQUFNO0VBQ2IsTUFBTyxPQUFNO0VBR1osZUFBVyxJQUFFLHFCQUNNOzttQkFBbEIsY0FBZ0IsU0FBQSxPQUNNO0lBQXJCLFdBQU8sU0FBUztJQUNoQixXQUFhOztLQUVaLFlBQUEsTUFDSTthQUFIO0tBQUEsT0FFRzthQUFILElBQUU7S0FBQTtJQUFBO0dBQUE7bUJBRUwsTUFDVSxVQUFBO1dBQVQ7R0FBQTs7O0VBRUYsUUFBTSxJQUFFLGNBQ0c7O21CQUFWLFNBQVcsU0FBQSxFQUNDO1dBQVgsU0FBSyxFQUFFO0dBQUE7OztFQUVULGFBQVMsU0FBUyxJQUNNLFdBQUE7O0dBQXZCLGNBQVEsU0FBTyxRQUNJO1dBQWY7OztFQUdMLCtDQUNPOztHQUFOLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxHQUFPLElBQUU7b0JBQ1gsQ0FBRSxNQUFVLElBQUU7b0JBQ2QsQ0FBRSxRQUFlLE1BQU07OztrQkFDdkIsc0JBQUEsRUFDQztvQkFDRSxXQUFRLHVCQUNDO1lBQVg7SUFBQTs7O0VBRUgsK0NBQ087O0dBQU4sb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFHLElBQUUsSUFBUTtrQkFDTCxXQUFVLGFBQVEsTUFBTTs7O2tCQUNoQyxzQkFBQSxFQUNHO3NCQUREOztLQUVELFlBQUEsU0FBTSxJQUNDO2FBQU47WUFFRzthQUFIOzs7OztFQUdKLHlDQUNLOztHQUFKLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRyxJQUFFLElBQVE7b0NBRUcsVUFBQTtZQUFmLFNBQU0sTUFBTTtJQUFBOzs7a0JBQ2Isa0JBQUEsRUFBSSxlQUNhO3NCQURmO0lBQ00sWUFBQSxTQUFNLG9CQUFTLGVBRG5CLGdCQUNxQztXQUN6Qzs7O0VBRUYseUNBQ0s7O0dBQUosb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFHLE1BQU0sS0FBRyxHQUFPO29CQUNuQixDQUFHLElBQUUsR0FBRyxHQUFPOzs7a0JBQ2Ysa0JBQUEsRUFBSSxVQUNRO3NCQURWOztLQUVELFlBQUEsU0FBTSxJQUNDO3dCQUhKO0tBQUEsT0FLQzthQUFIOzs7OztFQUVMLHdCQUFNLHNCQUNTOztHQUFkLG9CQUFNO0dBQ04sZ0NBQVksbUJBQUEsRUFDQztXQUFaLGNBQUssSUFBRCxJQUFJLEVBQUksU0FBTTtHQUFBO0dBRW5CLHNCQUNRLGVBQUE7SUFBRDtLQUFBLFFBQUEsSUFBRTtLQUNQOzJCQUFDLEtBQUQ7cUJBQ1M7O3FDQUFHLElBQUk7TUFBQTs7Ozs7O0VBRW5CLGVBQVcsUUFBUSxLQUFNLFNBQUEsRUFBQTs7SUFDeEIseUJBQUMsS0FBRCxJQUNLO1lBQUosQ0FBRTtXQUVDO1lBQUg7SUFBQTtHQUFBO0VBQUE7RUFqSEYsd0JBQUE7a0JBaUJBIiwiZmlsZSI6ImF0L3EuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==