"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Function","./js","./private/bootstrap","./private/js-impl","./Object","./String","./Type/Method","./Type/Type","./at/at"],function(exports,Function_0,js_1,bootstrap_2,js_45impl_3,Object_4,String_5,Method_6,Type_7,_64_8){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Function_0),spread_33=_ms.get(_$2,"spread!"),_$3=_ms.getModule(js_1),id_61_63=_ms.get(_$3,"id=?"),js_43=_ms.get(_$3,"js+"),_$4=_ms.getModule(bootstrap_2),msDef=_ms.get(_$4,"msDef"),_$5=_ms.getModule(js_45impl_3),newSet=_ms.get(_$5,"newSet"),_$6=_ms.getModule(Object_4),flag_63=_ms.get(_$6,"flag?"),p=_ms.get(_$6,"p"),_64p=_ms.get(_$6,"@p"),_$7=_ms.getModule(String_5),indent=_ms.get(_$7,"indent"),Method=_ms.getDefaultExport(Method_6),_$8=_ms.getModule(Method_6),impl_33=_ms.get(_$8,"impl!"),_$9=_ms.getModule(Type_7),_61_62=_ms.get(_$9,"=>"),type_45of=_ms.get(_$9,"type-of"),_$11=_ms.lazyGetModule(_64_8),_45_45=_ms.lazyProp(_$11,"--"),empty_63=_ms.lazyProp(_$11,"empty?"),map=_ms.lazyProp(_$11,"map");
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
					const _k2=[null],_v2="null";
					const _k3=[void 0],_v3="undefined";
					return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3)
				},"displayName","test")
			}();
			const args=2;
			const allow_45null_63=true;
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
						if(_ms.bool(id_61_63(_,null))){
							return "null"
						} else if(_ms.bool(id_61_63(_,void 0))){
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
				args:args,
				"allow-null?":allow_45null_63,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9zaG93Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBWUEsY0FBVTtFQUVWLFdBQU8saUJBQ007R0FBWixvQkFDSTtXQUNGO0dBQUE7R0FJRixxQkFDTzttQkFBQSxVQUFBO0tBQ04sa0JBQ0c7TUFBRjtjQUFJO01BQUE7Ozs7Ozs7O0tBQ0wsVUFBQSxDQUFFLE9BQ0Q7S0FJRCxVQUFBLENBQUUsRUFBRTtXQUFPO0tBQUEsT0FDVjtLQUdELFVBQUEsQ0FBRSxVQUFXO0tBQ2IsVUFBQSxDQUFFLFlBQWdCOzs7O0dBQ25CLFdBQU07R0FDTixzQkFBYTtHQUNiLHFCQUFPO21CQUFBLFNBQUEsS0FBSyxFQUFFLEtBQ0k7O01BQ2hCLFlBQUEsWUFBWSxJQUNDO2NBQVg7TUFBQSxPQUVFO09BQUgsWUFBWTtPQUNaLDBCQUFFLE9BQVMsS0FBSyxFQUFFO09BQ2xCLGVBQWU7Y0FDZjtNQUFBO0tBQUE7SUFBQTs7R0FDSCx5QkFBVTttQkFBQSxTQUFBLEVBQUUsS0FDSTs7TUFDZCxZQUFBLFNBQUssRUFBRSxPQUNJO2NBQVQ7TUFBQSxPQUNGLFlBQUEsU0FBSyxFQUFFLFNBQ1M7Y0FBZDtNQUFBLE9BRUU7T0FDSCwrQkFBVyxLQUFBLEdBQUksQ0FBRztPQUNsQixpQkFBVyxPQUFHLHNCQUFXLGdCQUFPO3VCQUFBLFNBQUEsSUFDRztTQUFsQyw0QkFBSSxPQUFTLEtBQU0sRUFBRSxFQUFFLEtBQUs7Z0JBQzNCLEdBZ0VhLFlBaEVaLHFCQUFPLE9BQU87UUFBQTs7Y0FFaEIsR0E4RGMsWUE5RGIsVUFBQSxzQkFDQyxnQkFBZTtNQUFBO0tBQUE7SUFBQTs7Ozs7Ozs7Ozs7O0VBRXRCLE1BQU8sT0FBTTtFQUViLGtDQUNLO0dBQUosVUFDQztrQkFFQSxTQUFBLEVBQ0M7V0FDRCxLQUFLLEVBQUU7VUFBTztJQUFBO0dBQUE7O0VBRWhCLFVBQVEsUUFBTSxlQUNJO0dBQWpCLFVBQUEscUJBQ1M7SUFBUixxQkFDTztvQkFBQSxVQUFBO01BQU4sVUFBQSxDQUFHLFNBQVM7TUFFWixVQUFBLENBQUcsSUFBRztZQUFPO01BQUEsT0FBWTs7OzttQkFDekIsU0FBQSxFQUFFLEtBQ0k7O01BQ0wsWUFBQSxRQUFNLEtBQU0sU0FDSztjQUFoQixNQUFLLEtBQUssTUFBSSxFQUFHO01BQUEsT0FFZDtjQUFIO01BQUE7S0FBQTtJQUFBOztHQUVKLFVBQUEscUJBQ1M7SUFBUixxQkFDTztvQkFBQSxVQUFBO01BQU4sVUFBQSxDQUFFLFFBQVM7TUFDWCxVQUFBLENBQUUsU0FBVzs7OzttQkFDYixTQUFBLEVBQ0M7S0FBRCxXQUFPO1lBQ1AsV0FBVztJQUFBOztHQUViLFVBQUEscUJBQ1M7SUFBUixxQkFDTztvQkFBQSxVQUFBO01BRU4sVUFBQSxDQUFHLE9BQVEsYUFBYTs7OzttQkFFeEIsVUFBQTtZQUNDO0lBQUE7O0dBRUgsVUFBQSxzQkFDVTtJQUFULHFCQUNPO29CQUFBLFVBQUE7TUFBTixVQUFBLENBQUUsVUFBVztNQUNiLFVBQUEsQ0FBRSxXQUFZOzs7O21CQUNkLFNBQUEsRUFBQTs7TUFDQSxZQUFBLEdBQ0M7Y0FBQztNQUFBLE9BRUU7Y0FBRjtNQUFBO0tBQUE7SUFBQTs7R0FFSixVQUFBLHVCQUNXO0lBQVYscUJBQ087b0JBQUEsVUFBQTtNQUNOLGtCQUNHO09BQUYsVUFBTTtzQkFFTCxVQUFBO2VBQUE7T0FBQTs7TUFDRixVQUFBLENBQUUsT0FBUTtNQUNWLFVBQUEsQ0FBRSxZQUFhO01BQ2YsVUFBQSxDQUFHLFNBQWEsWUFBUzs7OzttQkFDekIsU0FBUSxJQUNHOzhCQURWO01BQ0ksUUFBQTtNQUNKLHlCQUFDLE9BQUQsSUFDTztjQUFOO01BQUEsT0FFRzs7UUFBRSxRQUFBO1FBRUosaUNBQUEsSUFDTztnQkFBTDtRQUFBLE9BRUU7Z0JBQUg7UUFBQTtPQUFBO01BQUE7S0FBQTs7Ozs7RUFySVAsc0NBQUE7a0JBdUlBIiwiZmlsZSI6InNob3cuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==