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
			const test=function test(){
				const a=function(){
					const x=_ms.lazy(function(){
						return a
					});
					return {
						get x(){
							return _ms.unlazy(x)
						},
						name:"a"
					}
				}();
				const _k0=[a],_v0="Object\n\tx. <recursive>\n\tname. a";
				const _k1=[a,{
					repr:true
				}],_v1="Object\n\tx. <recursive>\n\tname. \"a\"";
				const _k2=[null],_v2="null";
				const _k3=[void 0],_v3="undefined";
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3)
			};
			const args=2;
			const allow_45null_63=true;
			const wrap=function wrap(impl,_,opts){
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
			};
			const _default=function _default(_,opts){
				return function(){
					if(_ms.bool(id_61_63(_,null))){
						return "null"
					} else if(_ms.bool(id_61_63(_,void 0))){
						return "undefined"
					} else {
						const props=_ms.unlazy(_45_45)(_64p(_),["prototype"]);
						const key_45vals=_61_62(Array,_ms.unlazy(map)(props,function(key){
							const val=_ms.checkContains(String,show(p(_,key),opts),"val");
							return (((""+_ms.show(key))+". ")+_ms.show(indent(val)))
						}));
						return (((""+_ms.show(type_45of(_)))+"\n\t")+_ms.show(key_45vals.join("\n\t")))
					}
				}()
			};
			return {
				doc:doc,
				test:test,
				args:args,
				"allow-null?":allow_45null_63,
				wrap:wrap,
				default:_default,
				name:"show"
			}
		}());
		msDef("show",show);
		const repr=exports.repr=function(){
			const doc="Shows it with the `repr` flag set.\nFor debug printing, there is the helper function `console.dbg!`.";
			return _ms.set(function repr(_){
				return show(_,{
					repr:true
				})
			},"doc",doc)
		}();
		spread_33(impl_33,show,function(){
			const _k0=String,_v0=function(){
				const test=function test(){
					const _k0=["a"],_v0="a";
					const _k1=["a",{
						repr:true
					}],_v1="\"a\"";
					return _ms.map(_k0,_v0,_k1,_v1)
				};
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
				const test=function test(){
					const _k0=[12],_v0="12";
					const _k1=[- 1],_v1="-1";
					return _ms.map(_k0,_v0,_k1,_v1)
				};
				return _ms.set(function(_){
					const base=10;
					return _.toString(base)
				},"test",test)
			}();
			const _k2=Symbol,_v2=function(){
				const test=function test(){
					const _k0=[Symbol("name")],_v0="<Symbol>";
					return _ms.map(_k0,_v0)
				};
				return _ms.set(function(){
					return "<Symbol>"
				},"test",test)
			}();
			const _k3=Boolean,_v3=function(){
				const test=function test(){
					const _k0=[true],_v0="true";
					const _k1=[false],_v1="false";
					return _ms.map(_k0,_v0,_k1,_v1)
				};
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
				const test=function test(){
					const a=function(){
						const doc="a";
						return _ms.set(function a(){
							return 1
						},"doc",doc)
					}();
					const _k0=[a],_v0="a";
					const _k1=[Object],_v1="Object";
					const _k2=[Function("","")],_v2="<anonymous Function>";
					return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2)
				};
				return _ms.set(function(fun){
					return _ms.checkContains(String,function(){
						const _=fun.name;
						if(_ms.bool(_ms.unlazy(empty_63)(_))){
							return "<anonymous Function>"
						} else {
							return _
						}
					}(),"res")
				},"test",test)
			}();
			return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3,_k4,_v4)
		}());
		const name=exports.name="show";
		exports.default=show;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9zaG93Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBWUEsY0FBVTtFQUVWLFdBQU8saUJBQ007R0FBWixvQkFDSTtXQUNGO0dBQUE7R0FJRixXQUNPLGVBQUE7SUFDTixrQkFDRztLQUFGO2FBQUk7S0FBQTs7Ozs7Ozs7SUFDTCxVQUFBLENBQUUsT0FDRDtJQUlELFVBQUEsQ0FBRSxFQUFFO1VBQU87SUFBQSxPQUNWO0lBR0QsVUFBQSxDQUFFLFVBQVc7SUFDYixVQUFBLENBQUUsWUFBZ0I7OztHQUNuQixXQUFNO0dBQ04sc0JBQWE7R0FDYixXQUFPLGNBQUEsS0FBSyxFQUFFLEtBQ0k7O0tBQ2hCLFlBQUEsWUFBWSxJQUNDO2FBQVg7S0FBQSxPQUVFO01BQUgsWUFBWTtNQUNaLDBCQUFFLE9BQVMsS0FBSyxFQUFFO01BQ2xCLGVBQWU7YUFDZjtLQUFBO0lBQUE7R0FBQTtHQUNILGVBQVUsa0JBQUEsRUFBRSxLQUNJOztLQUNkLFlBQUEsU0FBSyxFQUFFLE9BQ0k7YUFBVDtLQUFBLE9BQ0YsWUFBQSxTQUFLLEVBQUUsU0FDUzthQUFkO0tBQUEsT0FFRTtNQUNILCtCQUFXLEtBQUUsR0FBRSxDQUFHO01BQ2xCLGlCQUFXLE9BQUcsc0JBQVcsTUFBTyxTQUFBLElBQ0c7T0FBbEMsNEJBQUksT0FBUyxLQUFNLEVBQUUsRUFBRSxLQUFLO2NBQzNCLEdBZ0VhLFlBaEVaLHFCQUFPLE9BQU87TUFBQTthQUVoQixHQThEYyxZQTlEYixVQUFPLHNCQUNOLGdCQUFlO0tBQUE7SUFBQTtHQUFBOzs7Ozs7Ozs7OztFQUV0QixNQUFPLE9BQU07RUFFYixrQ0FDSztHQUFKLFVBQ0M7a0JBRUEsY0FBQSxFQUNDO1dBQ0QsS0FBSyxFQUFFO1VBQU87SUFBQTtHQUFBOztFQUVoQixVQUFRLFFBQU0sZUFDSTtHQUFqQixVQUFBLHFCQUNTO0lBQVIsV0FDTyxlQUFBO0tBQU4sVUFBQSxDQUFHLFNBQVM7S0FFWixVQUFBLENBQUcsSUFBRztXQUFPO0tBQUEsT0FBWTs7O21CQUN6QixTQUFBLEVBQUUsS0FDSTs7TUFDTCxZQUFBLFFBQU0sS0FBTSxTQUNLO2NBQWhCLE1BQUssS0FBSyxNQUFJLEVBQUc7TUFBQSxPQUVkO2NBQUg7TUFBQTtLQUFBO0lBQUE7O0dBRUosVUFBQSxxQkFDUztJQUFSLFdBQ08sZUFBQTtLQUFOLFVBQUEsQ0FBRSxRQUFTO0tBQ1gsVUFBQSxDQUFFLFNBQVc7OzttQkFDYixTQUFBLEVBQ0M7S0FBRCxXQUFPO1lBQ1AsV0FBVztJQUFBOztHQUViLFVBQUEscUJBQ1M7SUFBUixXQUNPLGVBQUE7S0FFTixVQUFBLENBQUcsT0FBUSxhQUFhOzs7bUJBRXhCLFVBQUE7WUFDQztJQUFBOztHQUVILFVBQUEsc0JBQ1U7SUFBVCxXQUNPLGVBQUE7S0FBTixVQUFBLENBQUUsVUFBVztLQUNiLFVBQUEsQ0FBRSxXQUFZOzs7bUJBQ2QsU0FBQSxFQUFBOztNQUNBLFlBQUEsR0FDQztjQUFDO01BQUEsT0FFRTtjQUFGO01BQUE7S0FBQTtJQUFBOztHQUVKLFVBQUEsdUJBQ1c7SUFBVixXQUNPLGVBQUE7S0FDTixrQkFDRztNQUFGLFVBQU07cUJBRUwsWUFBQTtjQUFBO01BQUE7O0tBQ0YsVUFBQSxDQUFFLE9BQVE7S0FDVixVQUFBLENBQUUsWUFBYTtLQUNmLFVBQUEsQ0FBRyxTQUFhLFlBQVM7OzttQkFDekIsU0FBUSxJQUNHOzhCQURWO01BQ0ksUUFBQTtNQUVKLGlDQUFNLElBQ0M7Y0FBTDtNQUFBLE9BRUU7Y0FBSDtNQUFBO0tBQUE7Ozs7O0VBaklMLHdCQUFBO2tCQW1JQSIsImZpbGUiOiJzaG93LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=