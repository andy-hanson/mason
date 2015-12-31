"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../control","./../js","./../private/bootstrap","./../to-string","./../Type/Method","./../Type/Type","./at","./Seq/Seq"],(exports,control_0,js_1,bootstrap_2,to_45string_3,Method_4,Type_5,_64_6,Seq_7)=>{
	exports._get=_ms.lazy(()=>{
		let _$1=_ms.getModule(control_0),opr=_ms.get(_$1,"opr"),_$2=_ms.getModule(js_1),defined_63=_ms.get(_$2,"defined?"),id_61_63=_ms.get(_$2,"id=?"),_$3=_ms.getModule(bootstrap_2),msDef=_ms.get(_$3,"msDef"),to_45string=_ms.getDefaultExport(to_45string_3),_$4=_ms.getModule(to_45string_3),inspect=_ms.get(_$4,"inspect"),_$5=_ms.getModule(Method_4),self_45impl_33=_ms.get(_$5,"self-impl!"),_$6=_ms.getModule(Type_5),extract=_ms.get(_$6,"extract"),_$7=_ms.getModule(_64_6),empty=_ms.get(_$7,"empty"),empty_63=_ms.get(_$7,"empty?"),from_45stream=_ms.get(_$7,"from-stream"),iterator=_ms.get(_$7,"iterator"),Seq=_ms.getDefaultExport(Seq_7);
		let _63=exports.default=(()=>{
			let _=class _63{
				static [_ms.symbol(empty)](){
					let _this=this;
					return _63None
				}
				static [_ms.symbol(from_45stream)](_){
					let _this=this;
					let iter=iterator(_);
					let _$0=iter.next(),value=_$0.value,done=_$0.done;
					return (done?_63None:_63some(value))
				}
				constructor(val){
					let _this=this;
					_ms.newProperty(this,"val",val)
				}
				[_ms.symbol(empty_63)](){
					let _this=this;
					return id_61_63(_this,_63None)
				}
				*[_ms.symbol(iterator)](){
					let _this=this;
					if(! empty_63(_this)){
						(yield _this.val)
					}
				}
				[_ms.symbol(to_45string)](){
					let _this=this;
					return inspect(_this)
				}
				[_ms.symbol(inspect)](){
					let _this=this;
					return (()=>{
						if(empty_63(_this)){
							return "?None"
						} else {
							return `?some ${inspect(_this.val)}`
						}
					})()
				}
			};
			_ms.traitDo(_,Seq);
			return _
		})();
		let empty_45marker=(()=>{
			return new (Object)()
		})();
		let _63None=exports["?None"]=new (_63)(empty_45marker);
		let _63some=exports["?some"]=function _63some(_){
			return new (_63)(_)
		};
		self_45impl_33(extract,_63some,(_,num_45extracteds)=>{
			return _63_45_62nullable((((id_61_63(1,num_45extracteds)&&_ms.hasInstance(_63,_))&&! empty_63(_))?_ms.some((()=>{
				return [_.val]
			})()):_ms.None))
		});
		msDef("some",_63some);
		msDef("None",_63None);
		let Opt_45_62_63=exports["Opt->?"]=function Opt_45_62_63(_){
			return (defined_63(_)?_ms.some(_):_ms.None)
		};
		let _63_45_62Opt=exports["?->Opt"]=function _63_45_62Opt(_){
			_ms.checkInstance(_63,_,"_");
			return (empty_63(_)?void 0:_.val)
		};
		let _63_45_62nullable=exports["?->nullable"]=function _63_45_62nullable(_){
			_ms.checkInstance(_63,_,"_");
			return (empty_63(_)?null:_.val)
		};
		let un_45_63=exports["un-?"]=function un_45_63(_,fail_45message){
			_ms.checkInstance(_63,_,"_");
			if(empty_63(_))throw opr(_ms.unlazy(fail_45message),`Tried to force empty \`?\`.`);
			return _.val
		};
		let _63_45or=exports["?-or"]=function _63_45or(_,or_45else){
			_ms.checkInstance(_63,_,"_");
			return (empty_63(_)?_ms.unlazy(or_45else):_.val)
		};
		let _63_45cond=exports["?-cond"]=function _63_45cond(_,if_45none,if_45some){
			_ms.checkInstance(_63,_,"_");
			_ms.checkInstance(Function,if_45some,"if-some");
			return (empty_63(_)?_ms.unlazy(if_45none):if_45some(_.val))
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC8/Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBYUEsd0JBQVM7O3VCQUtQLFNBQ087U0FzQkM7WUF0QlA7SUFBQTt1QkFFRCxnQkFBYyxFQUNBO1NBbUJOO0tBbkJQLFNBQU8sU0FBUztLQUNoQixRQUFhO1lBQ1IsQ0FBQSxLQUFLLFFBQU8sUUFBTTtJQUFBO0lBRWYsWUFBQSxJQUNJO1NBY0w7OztnQkFaVCxZQUNRO1NBV0M7WUFYUixTQVdRLE1BWEU7SUFBQTtpQkFFWCxZQUNZO1NBUUg7S0FSRCxLQUFBLFNBUUMsT0FQVTthQU9WOzs7Z0JBTFQsZUFDVztTQUlGO1lBSlIsUUFJUTtJQUFBO2dCQUZULFdBQ1M7U0FDQTtZQUFKO01BQUgsR0FBQSxTQUFPLE9BQ0k7Y0FBVDtNQUFBLE9BRUU7Y0FBRixTQUFRLFFBSEg7Ozs7O2lCQTVCSzs7O0VBaUNmLG1CQUNjLEtBQUE7VUFDYixLQUFJO0VBQUE7RUFFTCw2QkFBTyxLQUFJLEtBQUU7RUFDYiw2QkFBUyxpQkFBQSxFQUNBO1VBQVIsS0FBSSxLQUFHO0VBQUE7RUFFUixlQUFXLFFBQVEsUUFBUSxDQUFBLEVBQUMsbUJBQ2M7VUFBekMsa0JBQWUsQ0FBQSxFQUFLLFNBQUssRUFBRSxtQ0FBaUIsSUFBRCxLQUFHLEVBQUksU0FBTyxrQkFDQTtXQUF4RCxDQUFFOzs7RUFFSixNQUFPLE9BQUs7RUFDWixNQUFPLE9BQUs7RUFHWCxtQ0FBVSxzQkFBQSxFQUNBO1VBRU4sQ0FBQSxXQUFTLFlBQUU7O0VBRWYsbUNBQVMsc0JBQUEsRUFDRztxQkFERDtVQUVMLENBQUEsU0FBTyxHQUFDLE9BQVc7O0VBRXpCLDZDQUFjLDJCQUFBLEVBQ0c7cUJBREQ7VUFDVixDQUFBLFNBQU8sR0FBQyxLQUFNOztFQUdwQiw2QkFBTyxrQkFBQSxFQUFJLGVBQ2E7cUJBRGY7R0FFRCxHQUFBLFNBQU8sU0FBTywrQkFBa0I7VUFDdEM7O0VBRUYsNkJBQU8sa0JBQUEsRUFBSSxVQUNRO3FCQURWO1VBRUgsQ0FBQSxTQUFPLHlCQUFVOztFQUV2QixpQ0FBUyxvQkFBQSxFQUFJLFVBQVMsVUFDZ0I7cUJBRDNCO3FCQUFtQjtVQUl4QixDQUFBLFNBQU8seUJBQVUsVUFBUyIsImZpbGUiOiJhdC9xLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
