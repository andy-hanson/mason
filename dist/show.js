"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Bool","./compare","./Fun","./js","./math/Num","./private/bootstrap","./private/js-impl","./Obj","./Str","./Type/Method","./Type/Type","./at/at","./Obj"],function(exports,Bool_0,compare_1,Fun_2,js_3,Num_4,bootstrap_5,js_45impl_6,Obj_7,Str_8,Method_9,Type_10,_64_11,Obj_12){
	exports._get=_ms.lazy(function(){
		const Bool=_ms.getDefaultExport(Bool_0),_$3=_ms.getModule(compare_1),_61_63=_ms.get(_$3,"=?"),Fun=_ms.getDefaultExport(Fun_2),_$4=_ms.getModule(Fun_2),spread_33=_ms.get(_$4,"spread!"),_$5=_ms.getModule(js_3),js_43=_ms.get(_$5,"js+"),Num=_ms.getDefaultExport(Num_4),_$7=_ms.getModule(bootstrap_5),msDef=_ms.get(_$7,"msDef"),_$8=_ms.getModule(js_45impl_6),newSet=_ms.get(_$8,"newSet"),_$9=_ms.getModule(Obj_7),flag_63=_ms.get(_$9,"flag?"),p=_ms.get(_$9,"p"),_64p=_ms.get(_$9,"@p"),Str=_ms.getDefaultExport(Str_8),_$10=_ms.getModule(Str_8),indent=_ms.get(_$10,"indent"),Method=_ms.getDefaultExport(Method_9),_$11=_ms.getModule(Method_9),impl_33=_ms.get(_$11,"impl!"),_$12=_ms.getModule(Type_10),_61_62=_ms.get(_$12,"=>"),type_45of=_ms.get(_$12,"type-of"),_$14=_ms.lazyGetModule(_64_11),_45_45=_ms.lazyProp(_$14,"--"),empty_63=_ms.lazyProp(_$14,"empty?"),map=_ms.lazyProp(_$14,"map"),Obj=_ms.lazy(function(){
			return _ms.getDefaultExport(Obj_12)
		});
		const showing=newSet();
		const show=Method(function(){
			const doc=function(){
				return "|:Str _ opts\nConverts the value to a string for string interpolation.\nThis is the method called when you do `{...}`.\nFor a more detailed Str representation of data, use `inspect`."
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
					const _k0=[a],_v0="Obj\n\tx. <recursive>\n\tdisplayName. a";
					const _k1=[a,{
						repr:true
					}],_v1="Obj\n\tx. <recursive>\n\tdisplayName. \"a\"";
					const _k2=[null],_v2="()";
					const _k3=[undefined],_v3="undefined";
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
							const x=_ms.checkContains(Str,impl(_,opts),"x");
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
						} else if(_ms.bool(_61_63(_,undefined))){
							return "undefined"
						} else {
							const props=_ms.unlazy(_45_45)(_64p(_),["prototype"]);
							const key_45vals=_61_62(Array,_ms.unlazy(map)(props,function(){
								return _ms.set(function(key){
									const val=_ms.checkContains(Str,show(p(_,key),opts),"val");
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
			const _k0=Str,_v0=function(){
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
			const _k1=Num,_v1=function(){
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
			const _k3=Bool,_v3=function(){
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
			const _k4=Fun,_v4=function(){
				const test=function(){
					return _ms.set(function(){
						const a=function(){
							const doc="a";
							return _ms.set(function(){
								return 1
							},"doc",doc,"displayName","a")
						}();
						const _k0=[a],_v0="a";
						const _k1=[_ms.unlazy(Obj)],_v1="Obj";
						const _k2=[Fun("","")],_v2="<anonymous Fun>";
						return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2)
					},"displayName","test")
				}();
				return _ms.set(function(fun){
					return _ms.checkContains(Str,function(){
						const _=fun.displayName;
						if(_ms.bool(_ms.contains(Str,_))){
							return _
						} else {
							return function(){
								const _=fun.name;
								if(_ms.bool(_ms.unlazy(empty_63)(_))){
									return "<anonymous Fun>"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9zaG93Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFpQkEsY0FBVTtFQUVWLFdBQU8saUJBQ007R0FBWixvQkFDSTtXQUNGO0dBQUE7R0FJRixxQkFDTzttQkFBQSxVQUFBO0tBQ04sa0JBQ0c7TUFBRjtjQUFJO01BQUE7Ozs7Ozs7O0tBQ0wsVUFBQSxDQUFFLE9BQ0Q7S0FJRCxVQUFBLENBQUUsRUFBRTtXQUFPO0tBQUEsT0FDVjtLQUdELFVBQUEsQ0FBRSxVQUFTO0tBQ1gsVUFBQSxDQUFFLGVBQWdCOzs7O0dBQ25CLHFCQUFPO21CQUFBLFNBQUEsS0FBSyxFQUFFLEtBQ0k7O01BQ2hCLFlBQUEsWUFBWSxJQUNDO2NBQVg7TUFBQSxPQUVFO09BQUgsWUFBWTtPQUNaLDBCQUFFLElBQU0sS0FBSyxFQUFFO09BQ2YsZUFBZTtjQUNmO01BQUE7S0FBQTtJQUFBOztHQUNILHlCQUFVO21CQUFBLFNBQUEsRUFBRSxLQUNJOztNQUNkLFlBQUEsT0FBRyxFQUFFLE9BQ0U7Y0FBTDtNQUFBLE9BQ0YsWUFBQSxPQUFHLEVBQUUsWUFDUztjQUFaO01BQUEsT0FFRTtPQUNILCtCQUFXLEtBQUEsR0FBSSxDQUFHO09BQ2xCLGlCQUFXLE9BQUcsc0JBQVcsZ0JBQU87dUJBQUEsU0FBQSxJQUNHO1NBQWxDLDRCQUFJLElBQU0sS0FBTSxFQUFFLEVBQUUsS0FBSztnQkFDeEIsR0FnRVEsWUFoRVAscUJBQU8sT0FBTztRQUFBOztjQUVoQixHQThEUyxZQTlEUixVQUFBLHNCQUNDLGdCQUFlO01BQUE7S0FBQTtJQUFBOzs7Ozs7Ozs7O0VBRXRCLE1BQU8sT0FBTTtFQUViLGtDQUNLO0dBQUosVUFDQztrQkFFQSxTQUFBLEVBQ0M7V0FDRCxLQUFLLEVBQUU7VUFBTztJQUFBO0dBQUE7O0VBRWhCLFVBQVEsUUFBTSxlQUNJO0dBQWpCLFVBQUEsa0JBQ007SUFBTCxxQkFDTztvQkFBQSxVQUFBO01BQU4sVUFBQSxDQUFHLFNBQVM7TUFFWixVQUFBLENBQUcsSUFBRztZQUFPO01BQUEsT0FBWTs7OzttQkFDekIsU0FBQSxFQUFFLEtBQ0k7O01BQ0wsWUFBQSxRQUFNLEtBQU0sU0FDSztjQUFoQixNQUFLLEtBQUssTUFBSSxFQUFHO01BQUEsT0FFZDtjQUFIO01BQUE7S0FBQTtJQUFBOztHQUVKLFVBQUEsa0JBQ007SUFBTCxxQkFDTztvQkFBQSxVQUFBO01BQU4sVUFBQSxDQUFFLFFBQVM7TUFDWCxVQUFBLENBQUUsU0FBVzs7OzttQkFDYixTQUFBLEVBQ0M7S0FBRCxXQUFPO1lBQ1AsV0FBVztJQUFBOztHQUViLFVBQUEscUJBQ1M7SUFBUixxQkFDTztvQkFBQSxVQUFBO01BRU4sVUFBQSxDQUFHLE9BQVEsYUFBYTs7OzttQkFFeEIsVUFBQTtZQUNDO0lBQUE7O0dBRUgsVUFBQSxtQkFDTztJQUFOLHFCQUNPO29CQUFBLFVBQUE7TUFBTixVQUFBLENBQUUsVUFBVztNQUNiLFVBQUEsQ0FBRSxXQUFZOzs7O21CQUNkLFNBQUEsRUFBQTs7TUFDQSxZQUFBLEdBQ0M7Y0FBQztNQUFBLE9BRUU7Y0FBRjtNQUFBO0tBQUE7SUFBQTs7R0FFSixVQUFBLGtCQUNNO0lBQUwscUJBQ087b0JBQUEsVUFBQTtNQUNOLGtCQUNHO09BQUYsVUFBTTtzQkFFTCxVQUFBO2VBQUE7T0FBQTs7TUFDRixVQUFBLENBQUUsT0FBUTtNQUNWLFVBQUEsc0JBQVk7TUFDWixVQUFBLENBQUcsSUFBUSxZQUFTOzs7O21CQUNwQixTQUFLLElBQ0c7OEJBRFA7TUFDSSxRQUFBO01BQ0oseUJBQUMsSUFBRCxJQUNJO2NBQUg7TUFBQSxPQUVHOztRQUFFLFFBQUE7UUFFSixpQ0FBQSxJQUNPO2dCQUFMO1FBQUEsT0FFRTtnQkFBSDtRQUFBO09BQUE7TUFBQTtLQUFBOzs7OztFQXhJUCxzQ0FBQTtrQkEwSUEiLCJmaWxlIjoic2hvdy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9