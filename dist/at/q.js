"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../control","../js","../private/bootstrap","../Type/Kind","../Type/Method","../Type/Pred-Type","../Type/Type","./at","./at-Type","./Seq/Seq","../compare","../Try"],(exports,control_0,js_1,bootstrap_2,Kind_3,Method_4,Pred_45Type_5,Type_6,_64_7,_64_45Type_8,Seq_9,compare_10,Try_11)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(control_0),opr=_ms.get(_$2,"opr"),_$3=_ms.getModule(js_1),defined_63=_ms.get(_$3,"defined?"),id_61_63=_ms.get(_$3,"id=?"),_$4=_ms.getModule(bootstrap_2),msDef=_ms.get(_$4,"msDef"),_$5=_ms.getModule(Kind_3),kind_33=_ms.get(_$5,"kind!"),self_45kind_33=_ms.get(_$5,"self-kind!"),_$6=_ms.getModule(Method_4),self_45impl_33=_ms.get(_$6,"self-impl!"),Pred_45Type=_ms.getDefaultExport(Pred_45Type_5),_$8=_ms.getModule(Type_6),extract=_ms.get(_$8,"extract"),_$9=_ms.getModule(_64_7),empty_63=_ms.get(_$9,"empty?"),iterator=_ms.get(_$9,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_8),_$10=_ms.getModule(_64_45Type_8),empty=_ms.get(_$10,"empty"),from_45stream=_ms.get(_$10,"from-stream"),Seq=_ms.getDefaultExport(Seq_9),_$13=_ms.lazyGetModule(compare_10),_61_63=_ms.lazyProp(_$13,"=?"),_$14=_ms.lazyGetModule(Try_11),fails_63=_ms.lazyProp(_$14,"fails?");
		const _63=(()=>{
			const _=class _63{
				static [_ms.symbol(empty)](){
					const _this=this;
					return _63None
				}
				static [_ms.symbol(from_45stream)](_){
					const _this=this;
					const iter=iterator(_);
					const _$32=iter.next(),value=_$32.value,done=_$32.done;
					return (()=>{
						if(done){
							return _63None
						} else {
							return _63some(value)
						}
					})()
				}
				constructor(val){
					_ms.newProperty(this,"val",val)
				}
				[_ms.symbol(empty_63)](){
					const _this=this;
					return id_61_63(_this,_63None)
				}
				*[_ms.symbol(iterator)](){
					const _this=this;
					if(! empty_63(_this)){
						(yield _this.val)
					}
				}
			};
			self_45kind_33(_,_64_45Type);
			kind_33(_,Seq);
			return _
		})();
		const empty_45marker=(()=>{
			const built={};
			const doc=built.doc=`\`_.val\` on an empty \`?\` will return this.`;
			return _ms.setName(built,"empty-marker")
		})();
		const _63None=exports["?None"]=new (_63)(empty_45marker);
		const _63some=exports["?some"]=function _63some(_){
			return new (_63)(_)
		};
		msDef(`some`,_63some);
		msDef(`None`,_63None);
		const Opt_45_62_63=exports["Opt->?"]=(()=>{
			const built={};
			const doc=built.doc=`\`?\` containing the value iff it is defined.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[0],_63some(0));
				_ms.assoc(built,[null],_63some(null));
				_ms.assoc(built,[void 0],_63None);
				return built
			};
			return _ms.set(function Opt_45_62_63(_){
				return defined_63(_)?_ms.some((()=>{
					return _
				})()):_ms.None
			},built)
		})();
		const _63_45_62Opt=exports["?->Opt"]=(()=>{
			const built={};
			const doc=built.doc=`Extracts the value from a \`?\`, or returns undefined.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[_63some(0)],0);
				_ms.assertNot(defined_63,_63_45_62Opt(_63None));
				return built
			};
			return _ms.set(function _63_45_62Opt(_){
				_ms.checkContains(_63,_,"_");
				return (()=>{
					if(empty_63(_)){
						return void 0
					} else {
						return _.val
					}
				})()
			},built)
		})();
		const un_45_63=exports["un-?"]=(()=>{
			const built={};
			const doc=built.doc=`Tries to extract the value out of a \`?\`. Throws an error if it is empty.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[_63some(1)],1);
				_ms.assert(_ms.unlazy(fails_63),()=>{
					return un_45_63(_63None)
				});
				return built
			};
			return _ms.set(function un_45_63(_,fail_45message){
				_ms.checkContains(_63,_,"_");
				if(empty_63(_))throw _ms.error(opr(_ms.unlazy(fail_45message),`Tried to force empty \`?\`.`));
				return _.val
			},built)
		})();
		const _63_45or=exports["?-or"]=(()=>{
			const built={};
			const doc=built.doc=`If empty, defaults to \`or\` - else returns its value.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[_63None,1],1);
				_ms.assoc(built,[_63some(1),2],1);
				return built
			};
			return _ms.set(function _63_45or(_,or_45else){
				_ms.checkContains(_63,_,"_");
				return (()=>{
					if(empty_63(_)){
						return _ms.unlazy(or_45else)
					} else {
						return _.val
					}
				})()
			},built)
		})();
		const Some=exports.Some=new (Pred_45Type)((()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const predicate=built.predicate=function predicate(_){
				return (_ms.contains(_63,_)&&! empty_63(_))
			};
			const test=built.test=function test(){
				{
					const _=_63some(1);
					{
						const _$=_ms.extract(Some,_);
						if((_$!==null)){
							const val=_$[0];
							_ms.assert(_ms.unlazy(_61_63),val,1)
						} else throw new (Error)("No branch of `case` matches.")
					}
				}
			};
			return _ms.setName(built,"Some")
		})());
		self_45impl_33(extract,Some,_=>{
			return (()=>{
				if(_ms.contains(Some,_)){
					return [_.val]
				} else {
					return null
				}
			})()
		});
		const name=exports.name=`?`;
		exports.default=_63;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvQC8/Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBZUEsVUFDUSxLQU1KO1NBREg7dUJBS0MsU0FDTztXQW9CSDtZQXBCSDtJQUFBO3VCQUVELGdCQUFhLEVBQ0M7V0FpQlY7S0FqQkgsV0FBTyxTQUFRO0tBQ2YsV0FBYTtZQUVUO01BQUgsR0FBQSxLQUNJO2NBQUg7TUFBQSxPQUVHO2NBQUgsUUFBTTtNQUFBO0tBQUE7SUFBQTtnQkFHQyxJQUNHO3FCQUFiLFdBQU87SUFBQTtnQkFFUixZQUNRO1dBSUg7WUFKSixTQUlJLE1BSk07SUFBQTtpQkFFWCxZQUNZO1dBQ1A7S0FESixLQUFRLFNBQ0osT0FBZTthQUFmOzs7O0dBekJKLGVBQVcsRUFBRTtHQUNiLFFBQU0sRUFBRTtVQUZUO0VBQUE7RUE2QkQscUJBQ2MsS0FBQTs7R0FBYixvQkFBTTs7O0VBRVAsK0JBQU8sS0FBSSxLQUFFO0VBQ2IsK0JBQVEsaUJBQUEsRUFDQztVQUFSLEtBQUksS0FBRTtFQUFBO0VBRVAsTUFBTyxPQUFNO0VBQ2IsTUFBTyxPQUFNO0VBR1oscUNBQ08sS0FBQTs7R0FBTixvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsR0FBTyxRQUFNO29CQUNmLENBQUUsTUFBVSxRQUFNO29CQUNsQixDQUFFLFFBQWU7OztrQkFDakIsc0JBQUEsRUFDQztXQUNFLFdBQVEsaUJBQ0M7WUFBWDtJQUFBOzs7RUFFSCxxQ0FDTyxLQUFBOztHQUFOLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRyxRQUFNLElBQVE7a0JBQ1QsV0FBVSxhQUFPOzs7a0JBQ3pCLHNCQUFBLEVBQ0c7c0JBREQ7V0FFRTtLQUFILEdBQUEsU0FBTSxHQUNDO2FBQU47WUFFRzthQUFIOzs7OztFQUdKLCtCQUNLLEtBQUE7O0dBQUosb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFHLFFBQU0sSUFBUTtvQ0FFRCxJQUFBO1lBQWYsU0FBSztJQUFBOzs7a0JBQ04sa0JBQUEsRUFBSSxlQUNhO3NCQURmO0lBQ00sR0FBQSxTQUFNLG1CQUFTLCtCQUFrQjtXQUN6Qzs7O0VBRUYsK0JBQ0ssS0FBQTs7R0FBSixvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsUUFBTSxHQUFPO29CQUNmLENBQUcsUUFBTSxHQUFHLEdBQU87OztrQkFDbkIsa0JBQUEsRUFBSSxVQUNRO3NCQURWO1dBRUU7S0FBSCxHQUFBLFNBQU0sR0FDQzs7WUFFSDthQUFIOzs7OztFQUVMLHdCQUFNLEtBQUksYUFDUyxLQUFBOztHQUFsQixvQkFBTTtHQUNOLGdDQUFZLG1CQUFBLEVBQ0M7V0FBWixjQUFLLElBQUQsSUFBSSxFQUFJLFNBQU07R0FBQTtHQUVuQixzQkFDUSxlQUFBO0lBQUQ7S0FBQSxRQUFBLFFBQU07S0FDWDsyQkFBQyxLQUFEO3FCQUNTOztxQ0FBRyxJQUFJO01BQUE7Ozs7OztFQUVuQixlQUFXLFFBQVEsS0FBTSxHQUFBO1VBQ0k7SUFBNUIsZ0JBQUMsS0FBRCxHQUNLO1lBQUosQ0FBRTtXQUVDO1lBQUg7SUFBQTtHQUFBO0VBQUE7RUF6SEYsd0JBQUE7a0JBZUEiLCJmaWxlIjoiYXQvcS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9