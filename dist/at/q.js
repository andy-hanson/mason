"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../control","./../js","./../private/bootstrap","./../to-string","./../Type/Kind","./../Type/Method","./../Type/Type","./at","./at-Type","./Seq/Seq"],(exports,control_0,js_1,bootstrap_2,to_45string_3,Kind_4,Method_5,Type_6,_64_7,_64_45Type_8,Seq_9)=>{
	exports._get=_ms.lazy(()=>{
		const _$1=_ms.getModule(control_0),opr=_ms.get(_$1,"opr"),_$2=_ms.getModule(js_1),defined_63=_ms.get(_$2,"defined?"),id_61_63=_ms.get(_$2,"id=?"),_$3=_ms.getModule(bootstrap_2),msDef=_ms.get(_$3,"msDef"),to_45string=_ms.getDefaultExport(to_45string_3),_$4=_ms.getModule(to_45string_3),inspect=_ms.get(_$4,"inspect"),_$5=_ms.getModule(Kind_4),self_45kind_33=_ms.get(_$5,"self-kind!"),_$6=_ms.getModule(Method_5),self_45impl_33=_ms.get(_$6,"self-impl!"),_$7=_ms.getModule(Type_6),extract=_ms.get(_$7,"extract"),_$8=_ms.getModule(_64_7),empty_63=_ms.get(_$8,"empty?"),iterator=_ms.get(_$8,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_8),_$9=_ms.getModule(_64_45Type_8),empty=_ms.get(_$9,"empty"),from_45stream=_ms.get(_$9,"from-stream"),Seq=_ms.getDefaultExport(Seq_9);
		const _63=exports.default=(()=>{
			const _=class _63{
				static [_ms.symbol(empty)](){
					const _this=this;
					return _63None
				}
				static [_ms.symbol(from_45stream)](_){
					const _this=this;
					const iter=iterator(_);
					const _$0=iter.next(),value=_$0.value,done=_$0.done;
					return (done?_63None:_63some(value))
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
					return inspect(_this)
				}
				[_ms.symbol(inspect)](){
					const _this=this;
					return (()=>{
						if(empty_63(_this)){
							return "?None"
						} else {
							return `?some ${inspect(_this.val)}`
						}
					})()
				}
			};
			_ms.kindDo(_,Seq);
			self_45kind_33(_,_64_45Type);
			return _
		})();
		const empty_45marker=(()=>{
			return new (Object)()
		})();
		const _63None=exports["?None"]=new (_63)(empty_45marker);
		const _63some=exports["?some"]=function _63some(_){
			return new (_63)(_)
		};
		self_45impl_33(extract,_63some,_=>{
			return (()=>{
				if(empty_63(_)){
					return null
				} else {
					return [_.val]
				}
			})()
		});
		msDef("some",_63some);
		msDef("None",_63None);
		const Opt_45_62_63=exports["Opt->?"]=function Opt_45_62_63(_){
			return (defined_63(_)?_ms.some(_):_ms.None)
		};
		const _63_45_62Opt=exports["?->Opt"]=function _63_45_62Opt(_){
			_ms.checkContains(_63,_,"_");
			return (empty_63(_)?void 0:_.val)
		};
		const un_45_63=exports["un-?"]=function un_45_63(_,fail_45message){
			_ms.checkContains(_63,_,"_");
			if(empty_63(_))throw opr(_ms.unlazy(fail_45message),`Tried to force empty \`?\`.`);
			return _.val
		};
		const _63_45or=exports["?-or"]=function _63_45or(_,or_45else){
			_ms.checkContains(_63,_,"_");
			return (empty_63(_)?_ms.unlazy(or_45else):_.val)
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC8/Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBZUEsMEJBQVMsS0FLTjs7dUJBR0Q7V0F1QlE7WUF0QlA7SUFBQTt1QkFFRCxnQkFBYTtXQW9CTDtLQW5CUCxXQUFPLFNBQUE7S0FDUCxVQUFhO1lBQ1IsQ0FBQSxLQUFLLFFBQU8sUUFBTTtJQUFBO0lBRWYsWUFBQTs7O2dCQUdWO1dBWVM7WUFYUixTQVdRLE1BWEU7SUFBQTtpQkFFWDtXQVNTO0tBUkQsS0FBQSxTQVFDLE9BUFU7YUFPVjs7O2dCQUxUO1dBS1M7WUFKUixRQUlRO0lBQUE7Z0JBRlQ7V0FFUztZQUFKO01BQUgsR0FBQSxTQUFPLE9BQ0k7Y0FBVDtNQUFBLE9BRUU7Y0FBRixTQUFPLFFBSEY7Ozs7O2dCQS9CSTtHQUtaLGVBQVcsRUFBRTs7O0VBK0JmLHFCQUNjLEtBQUE7VUFDYixLQUFJO0VBQUE7RUFFTCwrQkFBTyxLQUFJLEtBQUU7RUFDYiwrQkFBUSxpQkFBQTtVQUNQLEtBQUksS0FBRTtFQUFBO0VBRVAsZUFBVyxRQUFRLFFBQU87VUFDSTtJQUE3QixHQUFBLFNBQUEsR0FDTztZQUFOO0lBQUEsT0FFRztZQUFILENBQUM7Ozs7RUFFSCxNQUFPLE9BQUs7RUFDWixNQUFPLE9BQUs7RUFHWCxxQ0FBUyxzQkFBQTtVQUdMLENBQUEsV0FBQSxZQUFVOztFQUVkLHFDQUFTLHNCQUFBO3FCQUFFO1VBRUwsQ0FBQSxTQUFBLEdBQVEsT0FBVTs7RUFHeEIsK0JBQU8sa0JBQUEsRUFBSTtxQkFBRjtHQUVELEdBQUEsU0FBQSxTQUFjLCtCQUFrQjtVQUN2Qzs7RUFFRCwrQkFBTyxrQkFBQSxFQUFJO3FCQUFGO1VBRUgsQ0FBQSxTQUFBLHlCQUFnQiIsImZpbGUiOiJhdC9xLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
