"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","esast/dist/mangle-identifier","../control","../js","../private/bootstrap","../private/js-impl","./Impl-Type","./Kind","./Method","./Obj-Type","./Type","../bang","../compare","../math/Num"],function(exports,mangle_45identifier_0,control_1,js_2,bootstrap_3,js_45impl_4,Impl_45Type_5,Kind_6,Method_7,Obj_45Type_8,Type_9,_33_10,compare_11,Num_12){
	exports._get=_ms.lazy(function(){
		const mangle_45identifier=_ms.getDefaultExport(mangle_45identifier_0),_$3=_ms.getModule(control_1),if_33=_ms.get(_$3,"if!"),_$4=_ms.getModule(js_2),defined_63=_ms.get(_$4,"defined?"),js_45instanceof=_ms.get(_$4,"js-instanceof"),_$5=_ms.getModule(bootstrap_3),Fun=_ms.get(_$5,"Fun"),impl_45contains_63_33=_ms.get(_$5,"impl-contains?!"),Obj=_ms.get(_$5,"Obj"),p_43_33=_ms.get(_$5,"p+!"),Str=_ms.get(_$5,"Str"),_$6=_ms.getModule(js_45impl_4),buildStr=_ms.get(_$6,"buildStr"),Impl_45Type=_ms.getDefaultExport(Impl_45Type_5),_$8=_ms.getModule(Kind_6),kind_33=_ms.get(_$8,"kind!"),_$9=_ms.getModule(Method_7),self_45impl_33=_ms.get(_$9,"self-impl!"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_8),_$11=_ms.getModule(Type_9),extract=_ms.get(_$11,"extract"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_10)
		}),_$14=_ms.lazyGetModule(compare_11),_61_63=_ms.lazyProp(_$14,"=?"),Num=_ms.lazy(function(){
			return _ms.getDefaultExport(Num_12)
		});
		const access=_ms.set(function(name){
			return (("[\""+_ms.show(name))+"\"]")
		},"displayName","access");
		const get_45prop=_ms.set(function(_){
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
				} else if(_ms.bool(_ms.contains(Str,_))){
					const name=_;
					const id=mangle_45identifier(_);
					return {
						name:name,
						id:id
					}
				} else throw new Error("No branch of `case` matches.")
			}()
		},"displayName","get-prop");
		const Tuple=Obj_45Type(function(){
			const props=function(){
				const displayName=Str;
				const props=Obj;
				const prototype=Obj;
				return {
					displayName:displayName,
					props:props,
					prototype:prototype
				}
			}();
			const opt_45props=function(){
				const post_45construct=Fun;
				const doc=Str;
				const test=Fun;
				return {
					"post-construct":post_45construct,
					doc:doc,
					test:test,
					displayName:"opt-props"
				}
			}();
			const defaults=function(){
				const prototype=_ms.set(function(){
					return Obj.create(Obj.prototype)
				},"displayName","prototype");
				return {
					prototype:prototype,
					displayName:"defaults"
				}
			}();
			const make_45callable=_ms.set(function(tuple){
				const props=tuple.props.map(get_45prop);
				const args=props.map(_ms.set(function(_){
					return _.id
				},"displayName","args"));
				const argsStr=args.join(",");
				const src=buildStr(_ms.set(function(add_33){
					add_33((((("return function ctr("+_ms.show(argsStr))+") {\nif (!(this instanceof ctr)) return new ctr(")+_ms.show(argsStr))+")"));
					props.forEach(function(_){
						if_33(defined_63(_.type),function(){
							return add_33((((((("_ms.checkContains("+_ms.show(_.id))+"_type, ")+_ms.show(_.id))+", \"")+_ms.show(_.name))+"\")"))
						});
						return add_33(((("this"+_ms.show(access(_.name)))+" = ")+_ms.show(_.id)))
					});
					add_33((((("if (arguments.length > "+_ms.show(props.length))+")\n\tthrow new Error(\"Only expected ")+_ms.show(props.length))+" args, got \" + arguments.length)"));
					if_33(defined_63(tuple["post-construct"]),function(){
						return add_33("postConstruct(this)")
					});
					return add_33("}")
				},"displayName","src"));
				const type_45args=props.map(_ms.set(function(_){
					return ((""+_ms.show(_.id))+"_type")
				},"displayName","type-args"));
				const make_45ctr=Function.apply.call(Fun,null,[].concat("postConstruct",_ms.arr(type_45args),src));
				const types=props.map(_ms.set(function(prop){
					return prop.type
				},"displayName","types"));
				const ctr=Function.apply.call(make_45ctr,null,[].concat(tuple["post-construct"],_ms.arr(types)));
				p_43_33(ctr,"source",src);
				return ctr
			},"displayName","make-callable");
			const post_45construct=_ms.set(function(_){
				p_43_33(_.prototype,"constructor",_);
				const accesses=_.props.map(get_45prop).map(_ms.set(function(_){
					return ("_"+_ms.show(access(_.name)))
				},"displayName","accesses"));
				const extract_45src=(("return function(_) { return _ instanceof tuple ? [ "+_ms.show(accesses.join(",")))+" ] : null }");
				const make_45extractor=Fun("tuple",extract_45src);
				const extractor=make_45extractor(_);
				return self_45impl_33(extract,_,extractor)
			},"displayName","post-construct");
			const test=_ms.set(function(){
				const Vec2=Tuple(function(){
					const props=function(){
						const _0="x";
						const _1=["y",_ms.unlazy(Num)];
						return [_0,_1]
					}();
					return {
						props:props,
						displayName:"Vec2"
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
			},"displayName","test");
			return {
				props:props,
				"opt-props":opt_45props,
				defaults:defaults,
				"make-callable":make_45callable,
				"post-construct":post_45construct,
				test:test,
				displayName:"Tuple"
			}
		}());
		impl_45contains_63_33(Tuple,function(tuple,_){
			return js_45instanceof(_,tuple)
		});
		kind_33(Tuple,Impl_45Type);
		const displayName=exports.displayName="Tuple";
		exports.default=Tuple;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL1R1cGxlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztFQWdCQSxxQkFBVSxTQUFBLEtBQ0k7VUFBWixpQkFBSTs7RUFFTix5QkFBWSxTQUFBLEVBQUE7O0lBRVgseUJBQUMsTUFBRCxJQUNNO0tBQUwsbUJBQU0sRUFBRTtLQUNSLFNBQUksNEJBQWtCLEVBQUU7S0FDeEIsbUJBQU0sRUFBRTtZQUZIOzs7OztXQUdOLHlCQUFDLElBQUQsSUFDSTtLQUFILFdBQU07S0FDTixTQUFJLG9CQUFBO1lBREQ7Ozs7Ozs7RUFHTCxZQUFRLHFCQUNRO0dBQWYsc0JBQ007SUFBTCxrQkFBYTtJQUNiLFlBQU87SUFDUCxnQkFBVztXQUZOOzs7Ozs7R0FHTiw0QkFDVTtJQUNULHVCQUFnQjtJQUNoQixVQUFLO0lBQ0wsV0FBTTtXQUhHOzs7Ozs7O0dBSVYseUJBQ1M7SUFBUix3QkFDWSxVQUFBO1lBQVgsV0FBVzs7V0FESjs7Ozs7R0FFVCw4QkFBZ0IsU0FBQSxNQUNLO0lBQXBCLFlBQVEsZ0JBQWdCO0lBR3hCLFdBQU8sa0JBQVcsU0FBQSxFQUNDO1lBQWxCOztJQUNELGNBQVUsVUFBVztJQUVyQixVQUFNLGlCQUFVLFNBQUEsT0FDSTtLQUNuQixPQUNDLG9DQUFxQix1RUFDdUI7S0FFN0MsY0FBZSxTQUFBLEVBQ0M7TUFBZixNQUFLLFdBQVMsUUFDUyxVQUFBO2NBQXRCLE9BQU0sb0NBQW1CLDJCQUFhLHdCQUFVOzthQUVqRCxPQUFNLG1CQUFLLE9BQU8sMEJBQVc7O0tBRTlCLE9BQ0MsdUNBQXdCLGlFQUNTO0tBSWxDLE1BQUssV0FBUyx5QkFDdUIsVUFBQTthQUFwQyxPQUFNO0tBQUE7WUFFUCxPQUFNO0lBQUE7SUFFUCxrQkFBWSxrQkFBVyxTQUFBLEVBQ0M7WUFBdEIsRUFtRFUsWUFuRFQ7O0lBQ0gscUNBQVcsbUJBQUssd0JBQWUsYUFBYTtJQUM1QyxZQUFRLGtCQUFXLFNBQUEsS0FDSTtZQUF0Qjs7SUFDRCw4QkFBTSwwQkFBUyxnQ0FBcUI7SUFDOUIsUUFBSSxJQUFLLFNBQVE7V0FDdkI7R0FBQTtHQUVELCtCQUFpQixTQUFBLEVBQ0M7SUFBakIsUUFBSSxZQUFhLGNBQWE7SUFDOUIsZUFBWSxZQUFZLHdCQUFlLFNBQUEsRUFDQztZQUF0QyxjQUFFLE9BQU87O0lBQ1gsb0JBQWUsaUVBQXFELGNBQWU7SUFDbkYsdUJBQWlCLElBQUssUUFBTztJQUM3QixnQkFBWSxpQkFBZTtXQUMzQixlQUFXLFFBQVEsRUFBRTtHQUFBO0dBRXRCLG1CQUNPLFVBQUE7SUFBTixXQUFPLGdCQUNLO0tBQVgsc0JBQ007TUFBTCxTQUFHO01BQ0gsU0FBRSxDQUFHO2FBREE7O1lBREs7Ozs7O0lBR1osUUFBSSxLQUFLLEVBQUU7dUNBQ04sRUFBRTt1Q0FDRixFQUFFOztLQUNGLFFBQUE7S0FDSjsyQkFBQyxLQUFEO3FCQUNTOzswQ0FBSCxFQUFFO2lEQUNGLEVBQUU7TUFBQTs7OztVQXhFSzs7Ozs7Ozs7OztFQTBFaEIsc0JBQWdCLE1BQU8sU0FBQSxNQUFNLEVBQ0M7VUFBN0IsZ0JBQWMsRUFBRTtFQUFBO0VBRWpCLFFBQU0sTUFBTTtFQTNHWixzQ0FBQTtrQkE2R0EiLCJmaWxlIjoiVHlwZS9UdXBsZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9