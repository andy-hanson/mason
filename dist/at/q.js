"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../control","../js","../private/bootstrap","../to-string","../Type/Kind","../Type/Method","../Type/Pred-Type","../Type/Type","./at","./at-Type","./Seq/Seq","../compare","../Try"],(exports,control_0,js_1,bootstrap_2,to_45string_3,Kind_4,Method_5,Pred_45Type_6,Type_7,_64_8,_64_45Type_9,Seq_10,compare_11,Try_12)=>{
	exports._get=_ms.lazy(()=>{
		const _$1=_ms.getModule(control_0),opr=_ms.get(_$1,"opr"),_$2=_ms.getModule(js_1),defined_63=_ms.get(_$2,"defined?"),id_61_63=_ms.get(_$2,"id=?"),_$3=_ms.getModule(bootstrap_2),msDef=_ms.get(_$3,"msDef"),to_45string=_ms.getDefaultExport(to_45string_3),_$4=_ms.getModule(Kind_4),kind_33=_ms.get(_$4,"kind!"),self_45kind_33=_ms.get(_$4,"self-kind!"),_$5=_ms.getModule(Method_5),self_45impl_33=_ms.get(_$5,"self-impl!"),Pred_45Type=_ms.getDefaultExport(Pred_45Type_6),_$6=_ms.getModule(Type_7),extract=_ms.get(_$6,"extract"),_$7=_ms.getModule(_64_8),empty_63=_ms.get(_$7,"empty?"),iterator=_ms.get(_$7,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_9),_$8=_ms.getModule(_64_45Type_9),empty=_ms.get(_$8,"empty"),from_45stream=_ms.get(_$8,"from-stream"),Seq=_ms.getDefaultExport(Seq_10),_$9=_ms.lazyGetModule(compare_11),_61_63=_ms.lazyProp(_$9,"=?"),_$10=_ms.lazyGetModule(Try_12),fails_63=_ms.lazyProp(_$10,"fails?");
		const _63=(()=>{
			const _=class _63{
				static [_ms.symbol(empty)](){
					const _this=this;
					return _63None
				}
				static [_ms.symbol(from_45stream)](_){
					const _this=this;
					const iter=iterator(_);
					const _$0=iter.next(),value=_$0.value,done=_$0.done;
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
				[_ms.symbol(to_45string)](){
					const _this=this;
					return (()=>{
						if(empty_63(_this)){
							return `None`
						} else {
							return `?some ${_this.val}`
						}
					})()
				}
			};
			self_45kind_33(_,_64_45Type);
			kind_33(_,Seq);
			return _
		})();
		const empty_45marker=(()=>{
			const built={};
			const doc=built.doc=`\`_.val\` on an empty \`?\` will return this.`;
			return built
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
			return _ms.set(_=>{
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
			return _ms.set(_=>{
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
			return _ms.set((_,fail_45message)=>{
				_ms.checkContains(_63,_,"_");
				if(empty_63(_))throw opr(_ms.unlazy(fail_45message),`Tried to force empty \`?\`.`);
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
			return _ms.set((_,or_45else)=>{
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
			built[`name`]="Some";
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
			return built
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvQC8/Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBZ0JBLFVBQ1EsS0FNSjtTQURIO0lBS0MsbUJBQUEsU0FDTztXQXdCQztZQXhCUDtJQUFBO0lBRUQsbUJBQUEsZ0JBQWEsRUFDQztXQXFCTjtLQXJCUCxXQUFPLFNBQUE7S0FDUCxVQUFhO1lBRVQ7TUFBSCxHQUFBLEtBQ0k7Y0FBSDtNQUFBLE9BRUc7Y0FBSCxRQUFNO01BQUE7S0FBQTtJQUFBO2dCQUdDLElBQ0c7cUJBQWIsV0FBTztJQUFBO0lBRVIsWUFBQSxZQUNRO1dBUUM7WUFSUixTQVFRLE1BUkU7SUFBQTtJQUVYLGFBQUEsWUFDWTtXQUtIO0tBTFIsS0FBUSxTQUtBLE9BSlc7YUFJWDs7O0lBRlQsWUFBQSxlQUNXO1dBQ0Y7WUFBSjtNQUFILEdBQUEsU0FBTyxPQUNJO2NBQVQ7YUFFRTtjQUFGLFNBSEs7Ozs7O0dBN0JSLGVBQVcsRUFBRTtHQUNiLFFBQU0sRUFBRTtVQUZUO0VBQUE7RUFtQ0QscUJBQ2MsS0FBQTs7R0FBYixvQkFBTTs7O0VBRVAsK0JBQU8sS0FBSSxLQUFFO0VBQ2IsK0JBQVEsaUJBQUEsRUFDQztVQUFSLEtBQUksS0FBRTtFQUFBO0VBRVAsTUFBTyxPQUFNO0VBQ2IsTUFBTyxPQUFNO0VBR1oscUNBQ08sS0FBQTs7R0FBTixvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsR0FBTyxRQUFNO29CQUNmLENBQUUsTUFBVSxRQUFNO29CQUNsQixDQUFFLFFBQWU7OztrQkFDakIsR0FDQztXQUNFLFdBQUEsaUJBQ1M7WUFBWDtJQUFBOzs7RUFFSCxxQ0FDTyxLQUFBOztHQUFOLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRyxRQUFNLElBQVE7a0JBQ1QsV0FBVSxhQUFPOzs7a0JBQ3pCLEdBQ0c7c0JBREQ7V0FFRTtLQUFILEdBQUEsU0FBQSxHQUNPO2FBQU47WUFFRzthQUFIOzs7OztFQUdKLCtCQUNLLEtBQUE7O0dBQUosb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFHLFFBQU0sSUFBUTtvQ0FFRCxJQUFBO1lBQWYsU0FBSztJQUFBOzs7a0JBQ04sQ0FBQSxFQUFJLGlCQUNhO3NCQURmO0lBQ00sR0FBQSxTQUFBLFNBQWUsK0JBQWtCO1dBQ3pDOzs7RUFFRiwrQkFDSyxLQUFBOztHQUFKLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxRQUFNLEdBQU87b0JBQ2YsQ0FBRyxRQUFNLEdBQUcsR0FBTzs7O2tCQUNuQixDQUFBLEVBQUksWUFDUTtzQkFEVjtXQUVFO0tBQUgsR0FBQSxTQUFBLEdBQ087O1lBRUg7YUFBSDs7Ozs7RUFFTCx3QkFBTSxLQUFJLGFBQ1MsS0FBQTs7U0FBbEIsUUFBQTtHQUNBLG9CQUFNO0dBQ04sZ0NBQVksbUJBQUEsRUFDQztXQUFaLGNBQUssSUFBRCxJQUFJLEVBQUksU0FBQTtHQUFBO0dBRWIsc0JBQ1EsZUFBQTtJQUFEO0tBQUEsUUFBQSxRQUFNO0tBQ1g7MkJBQUMsS0FBRDtxQkFDUzs7cUNBQUcsSUFBSTtNQUFBOzs7Ozs7RUFFbkIsZUFBVyxRQUFRLEtBQU0sR0FBQTtVQUNJO0lBQTVCLGdCQUFDLEtBQUQsR0FDSztZQUFKLENBQUU7V0FFQztZQUFIO0lBQUE7R0FBQTtFQUFBO0VBaklGLHdCQUFBO2tCQWdCQSIsImZpbGUiOiJhdC9xLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=