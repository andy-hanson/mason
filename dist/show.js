"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./compare","./Function","./js","./private/bootstrap","./private/js-impl","./Object","./String","./Type/Method","./Type/Type","./at/at"],function(exports,compare_0,Function_1,js_2,bootstrap_3,js_45impl_4,Object_5,String_6,Method_7,Type_8,_64_9){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(Function_1),spread_33=_ms.get(_$3,"spread!"),_$4=_ms.getModule(js_2),js_43=_ms.get(_$4,"js+"),_$5=_ms.getModule(bootstrap_3),msDef=_ms.get(_$5,"msDef"),_$6=_ms.getModule(js_45impl_4),newSet=_ms.get(_$6,"newSet"),_$7=_ms.getModule(Object_5),flag_63=_ms.get(_$7,"flag?"),p=_ms.get(_$7,"p"),_64p=_ms.get(_$7,"@p"),_$8=_ms.getModule(String_6),indent=_ms.get(_$8,"indent"),Method=_ms.getDefaultExport(Method_7),_$9=_ms.getModule(Method_7),impl_33=_ms.get(_$9,"impl!"),_$10=_ms.getModule(Type_8),_61_62=_ms.get(_$10,"=>"),type_45of=_ms.get(_$10,"type-of"),_$12=_ms.lazyGetModule(_64_9),_45_45=_ms.lazyProp(_$12,"--"),empty_63=_ms.lazyProp(_$12,"empty?"),map=_ms.lazyProp(_$12,"map");
		const showing=newSet();
		const show=Method(function(){
			const doc=function(){
				return "|:String _ opts\nConverts the value to a string for string interpolation.\nThis is the method called when you do `{...}`.\nFor a more detailed String representation of data, use `inspect`."
			}();
			const test=function(){
				return _ms.set(function(){
					const a=function(){
						const x=_ms.lazy(function(){
							return a
						});
						return {
							get x(){
								return _ms.unlazy(x)
							},
							displayName:"a"
						}
					}();
					const _k0=[a],_v0="Object\n\tx. <recursive>\n\tdisplayName. a";
					const _k1=[a,{
						repr:true
					}],_v1="Object\n\tx. <recursive>\n\tdisplayName. \"a\"";
					const _k2=[null],_v2="()";
					const _k3=[void 0],_v3="undefined";
					return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3)
				},"displayName","test")
			}();
			const wrap=function(){
				return _ms.set(function(impl,_,opts){
					return function(){
						if(_ms.bool(showing.has(_))){
							return "<recursive>"
						} else {
							showing.add(_);
							const x=_ms.checkContains(String,impl(_,opts),"x");
							showing.delete(_);
							return x
						}
					}()
				},"displayName","wrap")
			}();
			const _default=function(){
				return _ms.set(function(_,opts){
					return function(){
						if(_ms.bool(_61_63(_,null))){
							return "()"
						} else if(_ms.bool(_61_63(_,void 0))){
							return "undefined"
						} else {
							const props=_ms.unlazy(_45_45)(_64p(_),["prototype"]);
							const key_45vals=_61_62(Array,_ms.unlazy(map)(props,function(){
								return _ms.set(function(key){
									const val=_ms.checkContains(String,show(p(_,key),opts),"val");
									return (((""+_ms.show(key))+". ")+_ms.show(indent(val)))
								},"displayName","key-vals")
							}()));
							return (((""+_ms.show(type_45of(_)))+"\n\t")+_ms.show(key_45vals.join("\n\t")))
						}
					}()
				},"displayName","default")
			}();
			return {
				doc:doc,
				test:test,
				wrap:wrap,
				default:_default,
				displayName:"show"
			}
		}());
		msDef("show",show);
		const repr=exports.repr=function(){
			const doc="Shows it with the `repr` flag set.\nFor debug printing, there is the helper function `console.dbg!`.";
			return _ms.set(function(_){
				return show(_,{
					repr:true
				})
			},"doc",doc,"displayName","repr")
		}();
		spread_33(impl_33,show,function(){
			const _k0=String,_v0=function(){
				const test=function(){
					return _ms.set(function(){
						const _k0=["a"],_v0="a";
						const _k1=["a",{
							repr:true
						}],_v1="\"a\"";
						return _ms.map(_k0,_v0,_k1,_v1)
					},"displayName","test")
				}();
				return _ms.set(function(_,opts){
					return function(){
						if(_ms.bool(flag_63(opts,"repr"))){
							return js_43("\"",js_43(_,"\""))
						} else {
							return _
						}
					}()
				},"test",test)
			}();
			const _k1=Number,_v1=function(){
				const test=function(){
					return _ms.set(function(){
						const _k0=[12],_v0="12";
						const _k1=[- 1],_v1="-1";
						return _ms.map(_k0,_v0,_k1,_v1)
					},"displayName","test")
				}();
				return _ms.set(function(_){
					const base=10;
					return _.toString(base)
				},"test",test)
			}();
			const _k2=Symbol,_v2=function(){
				const test=function(){
					return _ms.set(function(){
						const _k0=[Symbol("name")],_v0="<Symbol>";
						return _ms.map(_k0,_v0)
					},"displayName","test")
				}();
				return _ms.set(function(){
					return "<Symbol>"
				},"test",test)
			}();
			const _k3=Boolean,_v3=function(){
				const test=function(){
					return _ms.set(function(){
						const _k0=[true],_v0="true";
						const _k1=[false],_v1="false";
						return _ms.map(_k0,_v0,_k1,_v1)
					},"displayName","test")
				}();
				return _ms.set(function(_){
					return function(){
						if(_ms.bool(_)){
							return "true"
						} else {
							return "false"
						}
					}()
				},"test",test)
			}();
			const _k4=Function,_v4=function(){
				const test=function(){
					return _ms.set(function(){
						const a=function(){
							const doc="a";
							return _ms.set(function(){
								return 1
							},"doc",doc,"displayName","a")
						}();
						const _k0=[a],_v0="a";
						const _k1=[Object],_v1="Object";
						const _k2=[Function("","")],_v2="<anonymous Function>";
						return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2)
					},"displayName","test")
				}();
				return _ms.set(function(fun){
					return _ms.checkContains(String,function(){
						const _=fun.displayName;
						if(_ms.bool(_ms.contains(String,_))){
							return _
						} else {
							return function(){
								const _=fun.name;
								if(_ms.bool(_ms.unlazy(empty_63)(_))){
									return "<anonymous Function>"
								} else {
									return _
								}
							}()
						}
					}(),"res")
				},"test",test)
			}();
			return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3,_k4,_v4)
		}());
		const displayName=exports.displayName="show";
		exports.default=show;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9zaG93Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBYUEsY0FBVTtFQUVWLFdBQU8saUJBQ007R0FBWixvQkFDSTtXQUNGO0dBQUE7R0FJRixxQkFDTzttQkFBQSxVQUFBO0tBQ04sa0JBQ0c7TUFBRjtjQUFJO01BQUE7Ozs7Ozs7O0tBQ0wsVUFBQSxDQUFFLE9BQ0Q7S0FJRCxVQUFBLENBQUUsRUFBRTtXQUFPO0tBQUEsT0FDVjtLQUdELFVBQUEsQ0FBRSxVQUFTO0tBQ1gsVUFBQSxDQUFFLFlBQWdCOzs7O0dBQ25CLHFCQUFPO21CQUFBLFNBQUEsS0FBSyxFQUFFLEtBQ0k7O01BQ2hCLFlBQUEsWUFBWSxJQUNDO2NBQVg7TUFBQSxPQUVFO09BQUgsWUFBWTtPQUNaLDBCQUFFLE9BQVMsS0FBSyxFQUFFO09BQ2xCLGVBQWU7Y0FDZjtNQUFBO0tBQUE7SUFBQTs7R0FDSCx5QkFBVTttQkFBQSxTQUFBLEVBQUUsS0FDSTs7TUFDZCxZQUFBLE9BQUcsRUFBRSxPQUNFO2NBQUw7TUFBQSxPQUNGLFlBQUEsT0FBRyxFQUFFLFNBQ1M7Y0FBWjtNQUFBLE9BRUU7T0FDSCwrQkFBVyxLQUFBLEdBQUksQ0FBRztPQUNsQixpQkFBVyxPQUFHLHNCQUFXLGdCQUFPO3VCQUFBLFNBQUEsSUFDRztTQUFsQyw0QkFBSSxPQUFTLEtBQU0sRUFBRSxFQUFFLEtBQUs7Z0JBQzNCLEdBZ0VhLFlBaEVaLHFCQUFPLE9BQU87UUFBQTs7Y0FFaEIsR0E4RGMsWUE5RGIsVUFBQSxzQkFDQyxnQkFBZTtNQUFBO0tBQUE7SUFBQTs7Ozs7Ozs7OztFQUV0QixNQUFPLE9BQU07RUFFYixrQ0FDSztHQUFKLFVBQ0M7a0JBRUEsU0FBQSxFQUNDO1dBQ0QsS0FBSyxFQUFFO1VBQU87SUFBQTtHQUFBOztFQUVoQixVQUFRLFFBQU0sZUFDSTtHQUFqQixVQUFBLHFCQUNTO0lBQVIscUJBQ087b0JBQUEsVUFBQTtNQUFOLFVBQUEsQ0FBRyxTQUFTO01BRVosVUFBQSxDQUFHLElBQUc7WUFBTztNQUFBLE9BQVk7Ozs7bUJBQ3pCLFNBQUEsRUFBRSxLQUNJOztNQUNMLFlBQUEsUUFBTSxLQUFNLFNBQ0s7Y0FBaEIsTUFBSyxLQUFLLE1BQUksRUFBRztNQUFBLE9BRWQ7Y0FBSDtNQUFBO0tBQUE7SUFBQTs7R0FFSixVQUFBLHFCQUNTO0lBQVIscUJBQ087b0JBQUEsVUFBQTtNQUFOLFVBQUEsQ0FBRSxRQUFTO01BQ1gsVUFBQSxDQUFFLFNBQVc7Ozs7bUJBQ2IsU0FBQSxFQUNDO0tBQUQsV0FBTztZQUNQLFdBQVc7SUFBQTs7R0FFYixVQUFBLHFCQUNTO0lBQVIscUJBQ087b0JBQUEsVUFBQTtNQUVOLFVBQUEsQ0FBRyxPQUFRLGFBQWE7Ozs7bUJBRXhCLFVBQUE7WUFDQztJQUFBOztHQUVILFVBQUEsc0JBQ1U7SUFBVCxxQkFDTztvQkFBQSxVQUFBO01BQU4sVUFBQSxDQUFFLFVBQVc7TUFDYixVQUFBLENBQUUsV0FBWTs7OzttQkFDZCxTQUFBLEVBQUE7O01BQ0EsWUFBQSxHQUNDO2NBQUM7TUFBQSxPQUVFO2NBQUY7TUFBQTtLQUFBO0lBQUE7O0dBRUosVUFBQSx1QkFDVztJQUFWLHFCQUNPO29CQUFBLFVBQUE7TUFDTixrQkFDRztPQUFGLFVBQU07c0JBRUwsVUFBQTtlQUFBO09BQUE7O01BQ0YsVUFBQSxDQUFFLE9BQVE7TUFDVixVQUFBLENBQUUsWUFBYTtNQUNmLFVBQUEsQ0FBRyxTQUFhLFlBQVM7Ozs7bUJBQ3pCLFNBQVEsSUFDRzs4QkFEVjtNQUNJLFFBQUE7TUFDSix5QkFBQyxPQUFELElBQ087Y0FBTjtNQUFBLE9BRUc7O1FBQUUsUUFBQTtRQUVKLGlDQUFBLElBQ087Z0JBQUw7UUFBQSxPQUVFO2dCQUFIO1FBQUE7T0FBQTtNQUFBO0tBQUE7Ozs7O0VBcElQLHNDQUFBO2tCQXNJQSIsImZpbGUiOiJzaG93LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=