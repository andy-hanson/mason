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
					const built={};
					const name=built.name=_ms.sub(_,0);
					const id=built.id=mangle_45identifier(_ms.sub(_,0));
					const type=built.type=_ms.sub(_,1);
					return built
				} else if(_ms.bool(_ms.contains(String,_))){
					const built={};
					const name=built.name=_;
					const id=built.id=mangle_45identifier(_);
					return built
				} else throw new Error("No branch of `case` matches.")
			}()
		};
		const Tuple=Obj_45Type(function(){
			const built={};
			const props=built.props=function(){
				const built={};
				const name=built.name=String;
				const props=built.props=Object;
				const prototype=built.prototype=Object;
				return built
			}();
			const opt_45props=built["opt-props"]=function(){
				const built={};
				const post_45construct=built["post-construct"]=Function;
				return _ms.setName(built,"opt-props")
			}();
			const extensible=built.extensible=true;
			const defaults=built.defaults=function(){
				const built={};
				const prototype=built.prototype=function prototype(){
					return Object.create(Object.prototype)
				};
				return _ms.setName(built,"defaults")
			}();
			const make_45callable=built["make-callable"]=function make_45callable(tuple){
				const props=tuple.props.map(get_45prop);
				const args=function(){
					const built=[];
					for(let _ of props[Symbol.iterator]()){
						_ms.add(built,_.id)
					};
					return built
				}();
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
				const type_45args=function(){
					const built=[];
					for(let _ of props[Symbol.iterator]()){
						_ms.add(built,((""+_ms.show(_.id))+"_type"))
					};
					return built
				}();
				const make_45ctr=Function.apply.call(Function,null,[].concat("postConstruct",_ms.arr(type_45args),src));
				const types=function(){
					const built=[];
					for(let _ of props[Symbol.iterator]()){
						_ms.add(built,_.type)
					};
					return built
				}();
				const ctr=Function.apply.call(make_45ctr,null,[].concat(tuple["post-construct"],_ms.arr(types)));
				pAdd(ctr,"source",src);
				return ctr
			};
			const post_45construct=built["post-construct"]=function post_45construct(_){
				pAdd(_.prototype,"constructor",_);
				const accesses=function(){
					const built=[];
					for(let _ of _.props[Symbol.iterator]()){
						_ms.add(built,("_"+_ms.show(access(get_45prop(_).name))))
					};
					return built
				}();
				const extract_45src=(("return function(_) { return _ instanceof tuple ? [ "+_ms.show(accesses.join(",")))+" ] : null }");
				const make_45extractor=Function("tuple",extract_45src);
				const extractor=make_45extractor(_);
				self_45impl_33(extract,_,extractor)
			};
			const test=built.test=function test(){
				const Vec2=Tuple(function(){
					const built={};
					const props=built.props=function(){
						const built=[];
						_ms.add(built,"x");
						_ms.add(built,["y",Number]);
						return built
					}();
					return _ms.setName(built,"Vec2")
				}());
				const v=Vec2(1,2);
				_ms.unlazy(_33)(_ms.unlazy(_61_63),1,v.x);
				_ms.unlazy(_33)(_ms.unlazy(_61_63),2,v.y);
				{
					const _=v;
					{
						const _$=_ms.extract(Vec2,_);
						if((_$!==null)){
							const x=_$[0],y=_$[1];
							_ms.unlazy(_33)(_ms.unlazy(_61_63),1,x);
							_ms.unlazy(_33)(_ms.unlazy(_61_63),2,y)
						} else throw new Error("No branch of `case` matches.")
					}
				}
			};
			return _ms.setName(built,"Tuple")
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL1R1cGxlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFjQSxhQUFVLGdCQUFBLEtBQ0k7VUFBWixpQkFBSTs7RUFFTixpQkFBWSxvQkFBQSxFQUFBOztJQUVYLHlCQUFDLE1BQUQsSUFDTTs7S0FBTCw4QkFBTSxFQUFFO0tBQ1Isa0JBQUksNEJBQWtCLEVBQUU7S0FDeEIsOEJBQU0sRUFBRTs7V0FDVCx5QkFBQyxPQUFELElBQ087O0tBQU4sc0JBQU07S0FDTixrQkFBSSxvQkFBaUI7Ozs7O0VBRXZCLFlBQU8scUJBQ1E7O0dBQWQsa0NBQ007O0lBQUwsc0JBQU07SUFDTix3QkFBTztJQUNQLGdDQUFXOzs7R0FDWiwrQ0FDVTs7SUFDVCwrQ0FBZ0I7OztHQUNqQixrQ0FBWTtHQUNaLHdDQUNTOztJQUFSLGdDQUNZLG9CQUFBO1lBQVgsY0FBYzs7OztHQUNoQiw2Q0FBZ0IseUJBQUEsTUFDSztJQUFwQixZQUFRLGdCQUFnQjtJQUV4Qjs7YUFBWSxLQUFBLHlCQUNLO29CQUFoQjs7OztJQUNELGNBQVUsVUFBVztJQUVyQixVQUFNLFNBQVUsU0FBQSxPQUNJO0tBQW5CLFdBQU8sb0JBQWtCO0tBR3pCLE9BQ0Msc0NBQWlCLHFCQUFPLGtEQUNELGtDQUFvQixxQkFBTztLQUU5QyxRQUFBLEtBQUEseUJBQ0s7TUFBVCxZQUFJLFdBQVMsU0FDTTtPQUFsQixPQUFNLG9DQUFtQiwyQkFBYSx3QkFBVTs7TUFFakQsT0FBTSxtQkFBSyxPQUFPLDBCQUFXOztLQUU5QixPQUNDLHVDQUF3QixpRUFDUztLQUlsQyxZQUFJLFdBQVMsMEJBQ29CO01BQWhDLE9BQU07S0FBQTtZQUVQLE9BQU07SUFBQTtJQUVQOzthQUFpQixLQUFBLHlCQUNLO29CQUFwQixFQWdEZSxZQWhEZDs7OztJQUNILHFDQUFXLHdCQUFVLHdCQUFlLGFBQWE7SUFDakQ7O2FBQWEsS0FBQSx5QkFDSztvQkFBakI7Ozs7SUFDRCw4QkFBTSwwQkFBUyxnQ0FBcUI7SUFDOUIsS0FBSyxJQUFLLFNBQVE7V0FDeEI7R0FBQTtHQUVELCtDQUFrQiwwQkFBQSxFQUNDO0lBQWxCLEtBQUssWUFBYSxjQUFhO0lBQy9COzthQUFnQixLQUFBLDJCQUNPO29CQUFyQixjQUFFLE9BQU8sV0FBUTs7OztJQUNuQixvQkFBZSxpRUFBcUQsY0FBZTtJQUNuRix1QkFBaUIsU0FBVSxRQUFPO0lBQ2xDLGdCQUFZLGlCQUFlO0lBQzNCLGVBQVcsUUFBUSxFQUFFO0dBQUE7R0FFdEIsc0JBQ1EsZUFBQTtJQUFQLFdBQU8sZ0JBQ0s7O0tBQVgsa0NBQ007O29CQUFGO29CQUNELENBQUcsSUFBRzs7Ozs7SUFDVixRQUFJLEtBQUssRUFBRTt1Q0FDTixFQUFFO3VDQUNGLEVBQUU7SUFDRDtLQUFBLFFBQUE7S0FDTDsyQkFBQyxLQUFEO3FCQUNTOzswQ0FBSCxFQUFFOzBDQUNGLEVBQUU7TUFBQTs7Ozs7O0VBRVgsYUFBYSxNQUFPLFNBQUEsTUFBTSxFQUNDO1VBQTFCLGdCQUFjLEVBQUU7RUFBQTtFQUVqQixRQUFNLE1BQU07RUF6R1osd0JBQUE7a0JBMkJBIiwiZmlsZSI6IlR5cGUvVHVwbGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==