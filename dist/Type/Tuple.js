"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","esast/dist/mangle-identifier","../control","../js","../private/bootstrap","../private/js-impl","./Impl-Type","./Kind","./Method","./Obj-Type","./Type","../bang","../compare","../math/Num"],function(exports,mangle_45identifier_0,control_1,js_2,bootstrap_3,js_45impl_4,Impl_45Type_5,Kind_6,Method_7,Obj_45Type_8,Type_9,_33_10,compare_11,Num_12){
	exports._get=_ms.lazy(function(){
		const mangle_45identifier=_ms.getDefaultExport(mangle_45identifier_0),_$3=_ms.getModule(control_1),if_33=_ms.get(_$3,"if!"),_$4=_ms.getModule(js_2),defined_63=_ms.get(_$4,"defined?"),js_45instanceof=_ms.get(_$4,"js-instanceof"),_$5=_ms.getModule(bootstrap_3),Fun=_ms.get(_$5,"Fun"),impl_45contains_63_33=_ms.get(_$5,"impl-contains?!"),Obj=_ms.get(_$5,"Obj"),p_43_33=_ms.get(_$5,"p+!"),Str=_ms.get(_$5,"Str"),_$6=_ms.getModule(js_45impl_4),buildStr=_ms.get(_$6,"buildStr"),Impl_45Type=_ms.getDefaultExport(Impl_45Type_5),_$8=_ms.getModule(Kind_6),kind_33=_ms.get(_$8,"kind!"),_$9=_ms.getModule(Method_7),self_45impl_33=_ms.get(_$9,"self-impl!"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_8),_$11=_ms.getModule(Type_9),extract=_ms.get(_$11,"extract"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_10)
		}),_$14=_ms.lazyGetModule(compare_11),_61_63=_ms.lazyProp(_$14,"=?"),Num=_ms.lazy(function(){
			return _ms.getDefaultExport(Num_12)
		});
		const access=function(){
			return _ms.set(function(name){
				return (("[\""+_ms.show(name))+"\"]")
			},"displayName","access")
		}();
		const get_45prop=function(){
			return _ms.set(function(_){
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
			},"displayName","get-prop")
		}();
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
				const prototype=function(){
					return _ms.set(function(){
						return Obj.create(Obj.prototype)
					},"displayName","prototype")
				}();
				return {
					prototype:prototype,
					displayName:"defaults"
				}
			}();
			const make_45callable=function(){
				return _ms.set(function(tuple){
					const props=tuple.props.map(get_45prop);
					const args=props.map(function(){
						return _ms.set(function(_){
							return _.id
						},"displayName","args")
					}());
					const argsStr=args.join(",");
					const src=buildStr(function(){
						return _ms.set(function(add_33){
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
						},"displayName","src")
					}());
					const type_45args=props.map(function(){
						return _ms.set(function(_){
							return ((""+_ms.show(_.id))+"_type")
						},"displayName","type-args")
					}());
					const make_45ctr=Function.apply.call(Fun,null,[].concat("postConstruct",_ms.arr(type_45args),src));
					const types=props.map(function(){
						return _ms.set(function(prop){
							return prop.type
						},"displayName","types")
					}());
					const ctr=Function.apply.call(make_45ctr,null,[].concat(tuple["post-construct"],_ms.arr(types)));
					p_43_33(ctr,"source",src);
					return ctr
				},"displayName","make-callable")
			}();
			const post_45construct=function(){
				return _ms.set(function(_){
					p_43_33(_.prototype,"constructor",_);
					const accesses=_.props.map(get_45prop).map(function(){
						return _ms.set(function(_){
							return ("_"+_ms.show(access(_.name)))
						},"displayName","accesses")
					}());
					const extract_45src=(("return function(_) { return _ instanceof tuple ? [ "+_ms.show(accesses.join(",")))+" ] : null }");
					const make_45extractor=Fun("tuple",extract_45src);
					const extractor=make_45extractor(_);
					return self_45impl_33(extract,_,extractor)
				},"displayName","post-construct")
			}();
			const test=function(){
				return _ms.set(function(){
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
				},"displayName","test")
			}();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL1R1cGxlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztFQWdCQSx1QkFBVTtrQkFBQSxTQUFBLEtBQ0k7V0FBWixpQkFBSTs7O0VBRU4sMkJBQVk7a0JBQUEsU0FBQSxFQUFBOztLQUVYLHlCQUFDLE1BQUQsSUFDTTtNQUFMLG1CQUFNLEVBQUU7TUFDUixTQUFJLDRCQUFrQixFQUFFO01BQ3hCLG1CQUFNLEVBQUU7Ozs7OztZQUNULHlCQUFDLElBQUQsSUFDSTtNQUFILFdBQU07TUFDTixTQUFJLG9CQUFBOzs7Ozs7Ozs7RUFFTixZQUFRLHFCQUNRO0dBQWYsc0JBQ007SUFBTCxrQkFBYTtJQUNiLFlBQU87SUFDUCxnQkFBVzs7Ozs7OztHQUNaLDRCQUNVO0lBQ1QsdUJBQWdCO0lBQ2hCLFVBQUs7SUFDTCxXQUFNOzs7Ozs7OztHQUNQLHlCQUNTO0lBQVIsMEJBQ1k7b0JBQUEsVUFBQTthQUFYLFdBQVc7Ozs7Ozs7O0dBQ2IsZ0NBQWdCO21CQUFBLFNBQUEsTUFDSztLQUFwQixZQUFRLGdCQUFnQjtLQUd4QixXQUFPLG9CQUFXO3FCQUFBLFNBQUEsRUFDQztjQUFsQjs7O0tBQ0QsY0FBVSxVQUFXO0tBRXJCLFVBQU0sbUJBQVU7cUJBQUEsU0FBQSxPQUNJO09BQ25CLE9BQ0Msb0NBQXFCLHVFQUN1QjtPQUU3QyxjQUFlLFNBQUEsRUFDQztRQUFmLE1BQUssV0FBUyxRQUNTLFVBQUE7Z0JBQXRCLE9BQU0sb0NBQW1CLDJCQUFhLHdCQUFVOztlQUVqRCxPQUFNLG1CQUFLLE9BQU8sMEJBQVc7O09BRTlCLE9BQ0MsdUNBQXdCLGlFQUNTO09BSWxDLE1BQUssV0FBUyx5QkFDdUIsVUFBQTtlQUFwQyxPQUFNO09BQUE7Y0FFUCxPQUFNO01BQUE7O0tBRVAsa0JBQVksb0JBQVc7cUJBQUEsU0FBQSxFQUNDO2NBQXRCLEVBL0JRLFlBK0JQOzs7S0FDSCxxQ0FBVyxtQkFBSyx3QkFBZSxhQUFhO0tBQzVDLFlBQVEsb0JBQVc7cUJBQUEsU0FBQSxLQUNJO2NBQXRCOzs7S0FDRCw4QkFBTSwwQkFBUyxnQ0FBcUI7S0FDOUIsUUFBSSxJQUFLLFNBQVE7WUFDdkI7SUFBQTs7R0FFRCxpQ0FBaUI7bUJBQUEsU0FBQSxFQUNDO0tBQWpCLFFBQUksWUFBYSxjQUFhO0tBQzlCLGVBQVksWUFBWSwwQkFBZTtxQkFBQSxTQUFBLEVBQ0M7Y0FBdEMsY0FBRSxPQUFPOzs7S0FDWCxvQkFBZSxpRUFBcUQsY0FBZTtLQUNuRix1QkFBaUIsSUFBSyxRQUFPO0tBQzdCLGdCQUFZLGlCQUFlO1lBQzNCLGVBQVcsUUFBUSxFQUFFO0lBQUE7O0dBRXRCLHFCQUNPO21CQUFBLFVBQUE7S0FBTixXQUFPLGdCQUNLO01BQVgsc0JBQ007T0FBTCxTQUFHO09BQ0gsU0FBRSxDQUFHOzs7Ozs7OztLQUNQLFFBQUksS0FBSyxFQUFFO3dDQUNOLEVBQUU7d0NBQ0YsRUFBRTs7TUFDRixRQUFBO01BQ0o7NEJBQUMsS0FBRDtzQkFDUzs7MkNBQUgsRUFBRTtrREFDRixFQUFFO09BQUE7Ozs7Ozs7Ozs7Ozs7OztFQUVYLHNCQUFnQixNQUFPLFNBQUEsTUFBTSxFQUNDO1VBQTdCLGdCQUFjLEVBQUU7RUFBQTtFQUVqQixRQUFNLE1BQU07RUEzR1osc0NBQUE7a0JBNkdBIiwiZmlsZSI6IlR5cGUvVHVwbGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==