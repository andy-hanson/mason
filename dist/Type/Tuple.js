"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","esast/dist/mangle-identifier","../js","../private/bootstrap","../private/js-impl","./Impl-Type","./Kind","./Method","./Obj-Type","./Type","../bang","../compare"],function(exports,mangle_45identifier_0,js_1,bootstrap_2,js_45impl_3,Impl_45Type_4,Kind_5,Method_6,Obj_45Type_7,Type_8,_33_9,compare_10){
	exports._get=_ms.lazy(function(){
		const mangle_45identifier=_ms.getDefaultExport(mangle_45identifier_0),_$3=_ms.getModule(js_1),defined_63=_ms.get(_$3,"defined?"),js_45instanceof=_ms.get(_$3,"js-instanceof"),_$4=_ms.getModule(bootstrap_2),implContains=_ms.get(_$4,"implContains"),pAdd=_ms.get(_$4,"pAdd"),_$5=_ms.getModule(js_45impl_3),buildStr=_ms.get(_$5,"buildStr"),Impl_45Type=_ms.getDefaultExport(Impl_45Type_4),_$7=_ms.getModule(Kind_5),kind_33=_ms.get(_$7,"kind!"),_$8=_ms.getModule(Method_6),self_45impl_33=_ms.get(_$8,"self-impl!"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_7),_$10=_ms.getModule(Type_8),extract=_ms.get(_$10,"extract"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_9)
		}),_$13=_ms.lazyGetModule(compare_10),_61_63=_ms.lazyProp(_$13,"=?");
		const access=function access(name){
			return (("[\""+_ms.show(name))+"\"]")
		};
		const get_45prop=function get_45prop(_){
			return function(){
				if(_ms.bool(_ms.contains(Array,_))){
					const name=_ms.sub(_,0);
					const id=mangle_45identifier(_ms.sub(_,0));
					const type=_ms.sub(_,1);
					return {
						name:name,
						id:id,
						type:type
					}
				} else if(_ms.bool(_ms.contains(String,_))){
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
				const test=Function;
				return {
					"post-construct":post_45construct,
					doc:doc,
					test:test,
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
					for(let _ of props[Symbol.iterator]()){
						if(_ms.bool(defined_63(_.type))){
							add_33((((((("_ms.checkContains("+_ms.show(_.id))+"_type, ")+_ms.show(_.id))+", \"")+_ms.show(_.name))+"\")"))
						};
						add_33(((("this"+_ms.show(access(_.name)))+" = ")+_ms.show(_.id)))
					};
					add_33((((("if (arguments.length > "+_ms.show(props.length))+")\n\tthrow new Error(\"Only expected ")+_ms.show(props.length))+" args, got \" + arguments.length)"));
					if(_ms.bool(defined_63(tuple["post-construct"]))){
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
				pAdd(ctr,"source",src);
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
			const test=function test(){
				const Vec2=Tuple(function(){
					const props=function(){
						const _0="x";
						const _1=["y",Number];
						return [_0,_1]
					}();
					return {
						props:props,
						name:"Vec2"
					}
				}());
				const v=Vec2(1,2);
				_ms.unlazy(_33)(_ms.unlazy(_61_63),1,v.x);
				_ms.unlazy(_33)(_ms.unlazy(_61_63),2,v.y);
				return function(){
					const _=v;
					{
						const _$=_ms.extract(Vec2,_);
						if((_$!==null)){
							const x=_$[0],y=_$[1];
							_ms.unlazy(_33)(_ms.unlazy(_61_63),1,x);
							return _ms.unlazy(_33)(_ms.unlazy(_61_63),2,y)
						} else throw new Error("No branch of `case` matches.")
					}
				}()
			};
			return {
				props:props,
				"opt-props":opt_45props,
				defaults:defaults,
				"make-callable":make_45callable,
				"post-construct":post_45construct,
				test:test,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL1R1cGxlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFjQSxhQUFVLGdCQUFBLEtBQ0k7VUFBWixpQkFBSTs7RUFFTixpQkFBWSxvQkFBQSxFQUFBOztJQUVYLHlCQUFDLE1BQUQsSUFDTTtLQUFMLG1CQUFNLEVBQUU7S0FDUixTQUFJLDRCQUFrQixFQUFFO0tBQ3hCLG1CQUFNLEVBQUU7Ozs7OztXQUNULHlCQUFDLE9BQUQsSUFDTztLQUFOLFdBQU07S0FDTixTQUFJLG9CQUFBOzs7Ozs7OztFQUVOLFlBQVEscUJBQ1E7R0FBZixzQkFDTTtJQUFMLFdBQU07SUFDTixZQUFPO0lBQ1AsZ0JBQVc7Ozs7Ozs7R0FDWiw0QkFDVTtJQUNULHVCQUFnQjtJQUNoQixVQUFLO0lBQ0wsV0FBTTs7Ozs7Ozs7R0FDUCx5QkFDUztJQUFSLGdCQUNZLG9CQUFBO1lBQVgsY0FBYzs7Ozs7OztHQUNoQixzQkFBZ0IseUJBQUEsTUFDSztJQUFwQixZQUFRLGdCQUFnQjtJQUd4QixXQUFPLFVBQVcsU0FBQSxFQUNDO1lBQWxCOztJQUNELGNBQVUsVUFBVztJQUVyQixVQUFNLFNBQVUsU0FBQSxPQUNJO0tBQW5CLFdBQU8sb0JBQWtCO0tBR3pCLE9BQ0Msc0NBQWlCLHFCQUFPLGtEQUNELGtDQUFvQixxQkFBTztLQUU5QyxRQUFBLEtBQUEseUJBQ0s7TUFBVCxZQUFJLFdBQVMsU0FDTTtPQUFsQixPQUFNLG9DQUFtQiwyQkFBYSx3QkFBVTs7TUFFakQsT0FBTSxtQkFBSyxPQUFPLDBCQUFXOztLQUU5QixPQUNDLHVDQUF3QixpRUFDUztLQUlsQyxZQUFJLFdBQVMsMEJBQ29CO01BQWhDLE9BQU07S0FBQTtZQUVQLE9BQU07SUFBQTtJQUVQLGtCQUFZLFVBQVcsU0FBQSxFQUNDO1lBQXRCLEVBL0JRLFlBK0JQOztJQUNILHFDQUFXLHdCQUFVLHdCQUFlLGFBQWE7SUFDakQsWUFBUSxVQUFXLFNBQUEsS0FDSTtZQUF0Qjs7SUFDRCw4QkFBTSwwQkFBUyxnQ0FBcUI7SUFDOUIsS0FBSyxJQUFLLFNBQVE7V0FDeEI7R0FBQTtHQUVELHVCQUFpQiwwQkFBQSxFQUNDO0lBQWpCLEtBQUssWUFBYSxjQUFhO0lBQy9CLGVBQVksWUFBWSxnQkFBZSxTQUFBLEVBQ0M7WUFBdEMsY0FBRSxPQUFPOztJQUNYLG9CQUFlLGlFQUFxRCxjQUFlO0lBQ25GLHVCQUFpQixTQUFVLFFBQU87SUFDbEMsZ0JBQVksaUJBQWU7V0FDM0IsZUFBVyxRQUFRLEVBQUU7R0FBQTtHQUV0QixXQUNPLGVBQUE7SUFBTixXQUFPLGdCQUNLO0tBQVgsc0JBQ007TUFBTCxTQUFHO01BQ0gsU0FBRSxDQUFHLElBQUc7Ozs7Ozs7O0lBQ1YsUUFBSSxLQUFLLEVBQUU7dUNBQ04sRUFBRTt1Q0FDRixFQUFFOztLQUNGLFFBQUE7S0FDSjsyQkFBQyxLQUFEO3FCQUNTOzswQ0FBSCxFQUFFO2lEQUNGLEVBQUU7TUFBQTs7Ozs7Ozs7Ozs7Ozs7RUFFWCxhQUFhLE1BQU8sU0FBQSxNQUFNLEVBQ0M7VUFBMUIsZ0JBQWMsRUFBRTtFQUFBO0VBRWpCLFFBQU0sTUFBTTtFQTNHWix3QkFBQTtrQkE2R0EiLCJmaWxlIjoiVHlwZS9UdXBsZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9