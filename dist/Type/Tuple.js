"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","esast/dist/mangle-identifier","../js","../private/bootstrap","../private/js-impl","./Impl-Type","./Kind","./Method","./Obj-Type","./Type","../bang","../compare"],function(exports,mangle_45identifier_0,js_1,bootstrap_2,js_45impl_3,Impl_45Type_4,Kind_5,Method_6,Obj_45Type_7,Type_8,_33_9,compare_10){
	exports._get=_ms.lazy(function(){
		const mangle_45identifier=_ms.getDefaultExport(mangle_45identifier_0),_$3=_ms.getModule(js_1),defined_63=_$3["defined?"],js_45instanceof=_$3["js-instanceof"],_$4=_ms.getModule(bootstrap_2),implContains=_$4.implContains,pAdd=_$4.pAdd,_$5=_ms.getModule(js_45impl_3),buildStr=_$5.buildStr,Impl_45Type=_ms.getDefaultExport(Impl_45Type_4),_$7=_ms.getModule(Kind_5),kind_33=_$7["kind!"],_$8=_ms.getModule(Method_6),self_45impl_33=_$8["self-impl!"],Obj_45Type=_ms.getDefaultExport(Obj_45Type_7),_$10=_ms.getModule(Type_8),extract=_$10.extract,_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_9)
		}),_$13=_ms.lazyGetModule(compare_10),_61_63=_ms.lazyProp(_$13,"=?");
		const access=function access(name){
			return (("[\""+_ms.show(name))+"\"]")
		};
		const get_45prop=function get_45prop(_){
			return function(){
				if(_ms.contains(Array,_)){
					const name=_ms.sub(_,0);
					const id=mangle_45identifier(_ms.sub(_,0));
					const type=_ms.sub(_,1);
					return {
						name:name,
						id:id,
						type:type
					}
				} else if(_ms.contains(String,_)){
					const name=_;
					const id=mangle_45identifier(_);
					return {
						name:name,
						id:id
					}
				} else throw new Error("No branch of `case` matches.")
			}()
		};
		const Tuple=Obj_45Type(function(){
			const props=function(){
				const name=String;
				const props=Object;
				const prototype=Object;
				return {
					name:name,
					props:props,
					prototype:prototype
				}
			}();
			const opt_45props=function(){
				const post_45construct=Function;
				const doc=String;
				return {
					"post-construct":post_45construct,
					doc:doc,
					name:"opt-props"
				}
			}();
			const defaults=function(){
				const prototype=function prototype(){
					return Object.create(Object.prototype)
				};
				return {
					prototype:prototype,
					name:"defaults"
				}
			}();
			const make_45callable=function make_45callable(tuple){
				const props=tuple.props.map(get_45prop);
				const args=props.map(function(_){
					return _.id
				});
				const argsStr=args.join(",");
				const src=buildStr(function(add_33){
					const name=mangle_45identifier(tuple.name);
					add_33((((((((((("return function "+_ms.show(name))+"(")+_ms.show(argsStr))+") {\nif (!(this instanceof ")+_ms.show(name))+")) return new ")+_ms.show(name))+"(")+_ms.show(argsStr))+")"));
					props.forEach(function(_){
						if(defined_63(_.type)){
							add_33((((((("_ms.checkContains("+_ms.show(_.id))+"_type, ")+_ms.show(_.id))+", \"")+_ms.show(_.name))+"\")"))
						};
						return add_33(((("this"+_ms.show(access(_.name)))+" = ")+_ms.show(_.id)))
					});
					add_33((((("if (arguments.length > "+_ms.show(props.length))+")\n\tthrow new Error(\"Only expected ")+_ms.show(props.length))+" args, got \" + arguments.length)"));
					if(defined_63(tuple["post-construct"])){
						add_33("postConstruct(this)")
					};
					return add_33("}")
				});
				const type_45args=props.map(function(_){
					return ((""+_ms.show(_.id))+"_type")
				});
				const make_45ctr=Function.apply.call(Function,null,[].concat("postConstruct",_ms.arr(type_45args),src));
				const types=props.map(function(prop){
					return prop.type
				});
				const ctr=Function.apply.call(make_45ctr,null,[].concat(tuple["post-construct"],_ms.arr(types)));
				return ctr
			};
			const post_45construct=function post_45construct(_){
				pAdd(_.prototype,"constructor",_);
				const accesses=_.props.map(get_45prop).map(function(_){
					return ("_"+_ms.show(access(_.name)))
				});
				const extract_45src=(("return function(_) { return _ instanceof tuple ? [ "+_ms.show(accesses.join(",")))+" ] : null }");
				const make_45extractor=Function("tuple",extract_45src);
				const extractor=make_45extractor(_);
				return self_45impl_33(extract,_,extractor)
			};
			return {
				props:props,
				"opt-props":opt_45props,
				defaults:defaults,
				"make-callable":make_45callable,
				"post-construct":post_45construct,
				name:"Tuple"
			}
		}());
		implContains(Tuple,function(tuple,_){
			return js_45instanceof(_,tuple)
		});
		kind_33(Tuple,Impl_45Type);
		const name=exports.name="Tuple";
		exports.default=Tuple;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL1R1cGxlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFjQSxhQUFVLGdCQUFBLEtBQ0k7VUFBWixpQkFBSTs7RUFFTixpQkFBWSxvQkFBQSxFQUFBOztJQUVYLGdCQUFDLE1BQUQsR0FDTTtLQUFMLG1CQUFNLEVBQUU7S0FDUixTQUFJLDRCQUFrQixFQUFFO0tBQ3hCLG1CQUFNLEVBQUU7Ozs7OztXQUNULGdCQUFDLE9BQUQsR0FDTztLQUFOLFdBQU07S0FDTixTQUFJLG9CQUFBOzs7Ozs7OztFQUVOLFlBQVEscUJBQ1E7R0FBZixzQkFDTTtJQUFMLFdBQU07SUFDTixZQUFPO0lBQ1AsZ0JBQVc7Ozs7Ozs7R0FDWiw0QkFDVTtJQUNULHVCQUFnQjtJQUNoQixVQUFLOzs7Ozs7O0dBRU4seUJBQ1M7SUFBUixnQkFDWSxvQkFBQTtZQUFYLGNBQWM7Ozs7Ozs7R0FDaEIsc0JBQWdCLHlCQUFBLE1BQ0s7SUFBcEIsWUFBUSxnQkFBZ0I7SUFHeEIsV0FBTyxVQUFXLFNBQUEsRUFDQztZQUFsQjs7SUFDRCxjQUFVLFVBQVc7SUFFckIsVUFBTSxTQUFVLFNBQUEsT0FDSTtLQUFuQixXQUFPLG9CQUFrQjtLQUd6QixPQUNDLHNDQUFpQixxQkFBTyxrREFDRCxrQ0FBb0IscUJBQU87S0FFbkQsY0FBZSxTQUFBLEVBQ0M7TUFBZixHQUFJLFdBQVMsUUFDTTtPQUFsQixPQUFNLG9DQUFtQiwyQkFBYSx3QkFBVTs7YUFFakQsT0FBTSxtQkFBSyxPQUFPLDBCQUFXOztLQUU5QixPQUNDLHVDQUF3QixpRUFDUztLQUlsQyxHQUFJLFdBQVMseUJBQ29CO01BQWhDLE9BQU07S0FBQTtZQUVQLE9BQU07SUFBQTtJQUVQLGtCQUFZLFVBQVcsU0FBQSxFQUNDO1lBQXRCLEVBL0JRLFlBK0JQOztJQUNILHFDQUFXLHdCQUFVLHdCQUFlLGFBQWE7SUFDakQsWUFBUSxVQUFXLFNBQUEsS0FDSTtZQUF0Qjs7SUFDRCw4QkFBTSwwQkFBUyxnQ0FBcUI7V0FFcEM7R0FBQTtHQUVELHVCQUFpQiwwQkFBQSxFQUNDO0lBQWpCLEtBQUssWUFBYSxjQUFhO0lBQy9CLGVBQVksWUFBWSxnQkFBZSxTQUFBLEVBQ0M7WUFBdEMsY0FBRSxPQUFPOztJQUNYLG9CQUFlLGlFQUFxRCxjQUFlO0lBQ25GLHVCQUFpQixTQUFVLFFBQU87SUFDbEMsZ0JBQVksaUJBQWU7V0FDM0IsZUFBVyxRQUFRLEVBQUU7R0FBQTs7Ozs7Ozs7OztFQWV2QixhQUFhLE1BQU8sU0FBQSxNQUFNLEVBQ0M7VUFBMUIsZ0JBQWMsRUFBRTtFQUFBO0VBRWpCLFFBQU0sTUFBTTtFQTNHWix3QkFBQTtrQkE2R0EiLCJmaWxlIjoiVHlwZS9UdXBsZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9