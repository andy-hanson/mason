"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","esast/dist/mangle-identifier","../js","../private/js-impl","./Impl-Type","./Kind","./Method","./Obj-Type","./Type","../compare","../js","../Try"],(exports,mangle_45identifier_0,js_1,js_45impl_2,Impl_45Type_3,Kind_4,Method_5,Obj_45Type_6,Type_7,compare_8,js_9,Try_10)=>{
	exports._get=_ms.lazy(()=>{
		const mangle_45identifier=_ms.getDefaultExport(mangle_45identifier_0),_$3=_ms.getModule(js_1),js_45instanceof=_ms.get(_$3,"js-instanceof"),_$4=_ms.getModule(js_45impl_2),buildStr=_ms.get(_$4,"buildStr"),Impl_45Type=_ms.getDefaultExport(Impl_45Type_3),_$6=_ms.getModule(Kind_4),kind_33=_ms.get(_$6,"kind!"),_$7=_ms.getModule(Method_5),impl_33=_ms.get(_$7,"impl!"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_6),Type=_ms.getDefaultExport(Type_7),_$9=_ms.getModule(Type_7),contains_63=_ms.get(_$9,"contains?"),extract=_ms.get(_$9,"extract"),_$11=_ms.lazyGetModule(compare_8),_61_63=_ms.lazyProp(_$11,"=?"),_$12=_ms.lazyGetModule(js_9),defined_63=_ms.lazyProp(_$12,"defined?"),_$13=_ms.lazyGetModule(Try_10),fails_63=_ms.lazyProp(_$13,"fails?");
		const Wrap_45Type=Obj_45Type(()=>{
			const built={};
			const doc=built.doc=`Object with only one prop (always called \`val\`).\nThese are useful for wrapping a value with a new type.`;
			const props=built.props=()=>{
				const built={};
				const name=built.name=String;
				const prototype=built.prototype=Object;
				return built
			}();
			const opt_45props=built["opt-props"]=()=>{
				const built={};
				const wrapped_45type=built["wrapped-type"]=Type;
				return _ms.setName(built,"opt-props")
			}();
			const extensible=built.extensible=true;
			const defaults=built.defaults=()=>{
				const built={};
				const prototype=built.prototype=function prototype(){
					return Object.create(Object.prototype)
				};
				return _ms.setName(built,"defaults")
			}();
			const post_45construct=built["post-construct"]=function post_45construct(_){
				_ms.newProperty(_.prototype,"constructor",_)
			};
			const make_45callable=built["make-callable"]=function make_45callable(_){
				const src=buildStr(add_33=>{
					const name=mangle_45identifier(_.name);
					add_33(`return function ${_ms.show(name)}(_) \{\n\tif (!(this instanceof ${_ms.show(name)})) return new ${_ms.show(name)}(_)\n\tthis.val = _`);
					if(_ms.unlazy(defined_63)(_["wrapped-type"])){
						add_33(`_ms.checkContains(wrappedType, _, "val")`)
					};
					return add_33(`}`)
				});
				const f=Function(`wrappedType`,src);
				return f(_["wrapped-type"])
			};
			const test=built.test=function test(){
				const W=Wrap_45Type(()=>{
					const built={};
					const doc=built.doc=`W`;
					const wrapped_45type=built["wrapped-type"]=Number;
					return _ms.setName(built,"W")
				}());
				const w=W(3);
				_ms.assert(_ms.unlazy(_61_63),w.val,3);
				_ms.assert(_ms.unlazy(fails_63),()=>{
					return W(`three`)
				})
			};
			return _ms.setName(built,"Wrap-Type")
		}());
		kind_33(Wrap_45Type,Impl_45Type);
		impl_33(contains_63,Wrap_45Type,function(_){
			const _this=this;
			return js_45instanceof(_,_this)
		});
		impl_33(extract,Wrap_45Type,function(_){
			const _this=this;
			return ()=>{
				if(_ms.bool(js_45instanceof(_,_this))){
					return [_.val]
				} else {
					return null
				}
			}()
		});
		const name=exports.name=`Wrap-Type`;
		exports.default=Wrap_45Type;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL1dyYXAtVHlwZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQWNBLGtCQUFXLGVBQ1E7O0dBQWxCLG9CQUNDO0dBRUQsNEJBQ007O0lBQUwsc0JBQU07SUFDTixnQ0FBVzs7O0dBQ1oseUNBQ1U7O0lBQVQsMkNBQWM7OztHQUNmLGtDQUFZO0dBQ1osa0NBQ1M7O0lBQVIsZ0NBQ1ksb0JBQUE7WUFBWCxjQUFjOzs7O0dBQ2hCLCtDQUFrQiwwQkFBQSxFQUNDO29CQUFsQiwwQkFBMEI7R0FBQTtHQUMzQiw2Q0FBZ0IseUJBQUEsRUFDQztJQUFoQixVQUFNLFNBQVUsUUFDSTtLQUFuQixXQUFPLG9CQUFrQjtLQUN6QixPQUNDLDRCQUFpQixpREFDTywrQkFBb0I7S0FFdkMsMEJBQWEsbUJBQ2M7TUFBaEMsT0FBTTs7WUFDUCxPQUFNOztJQUNQLFFBQUksU0FBVSxjQUFhO1dBQzNCLEVBQUU7O0dBQ0gsc0JBQ1EsZUFBQTtJQUFQLFFBQUksZ0JBQ1M7O0tBQVosb0JBQU07S0FDTiwyQ0FBYzs7O0lBQ2YsUUFBSSxFQUFFO2tDQUNLLE1BQU07b0NBRUssSUFBQTtZQUFyQixFQUFHOzs7OztFQUVOLFFBQU0sWUFBVTtFQUNoQixRQUFNLFlBQVUsWUFBWSxTQUFBLEVBQ0M7U0FHWDtVQUhqQixnQkFBYyxFQUdHO0VBQUE7RUFGbEIsUUFBTSxRQUFRLFlBQVksU0FBQSxFQUNDO1NBQ1Q7O0lBQWhCLFlBQUEsZ0JBQWMsRUFBRSxRQUNJO1lBQW5CLENBQUU7V0FFQztZQUFIO0lBQUE7R0FBQTtFQUFBO0VBMURILHdCQUFBO2tCQWNBIiwiZmlsZSI6IlR5cGUvV3JhcC1UeXBlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=