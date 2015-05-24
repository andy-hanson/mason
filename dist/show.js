"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Function","./js","./private/bootstrap","./private/js-impl","./Object","./String","./Type/Method","./Type/Type","./at/at"],function(exports,Function_0,js_1,bootstrap_2,js_45impl_3,Object_4,String_5,Method_6,Type_7,_64_8){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Function_0),spread_33=_ms.get(_$2,"spread!"),_$3=_ms.getModule(js_1),id_61_63=_ms.get(_$3,"id=?"),js_43=_ms.get(_$3,"js+"),_$4=_ms.getModule(bootstrap_2),msDef=_ms.get(_$4,"msDef"),_$5=_ms.getModule(js_45impl_3),newSet=_ms.get(_$5,"newSet"),_$6=_ms.getModule(Object_4),flag_63=_ms.get(_$6,"flag?"),p=_ms.get(_$6,"p"),_64p=_ms.get(_$6,"@p"),_$7=_ms.getModule(String_5),indent=_ms.get(_$7,"indent"),Method=_ms.getDefaultExport(Method_6),_$8=_ms.getModule(Method_6),impl_33=_ms.get(_$8,"impl!"),_$9=_ms.getModule(Type_7),_61_62=_ms.get(_$9,"=>"),type_45of=_ms.get(_$9,"type-of"),_$11=_ms.lazyGetModule(_64_8),_45_45=_ms.lazyProp(_$11,"--"),empty_63=_ms.lazyProp(_$11,"empty?"),map=_ms.lazyProp(_$11,"map");
		const showing=newSet();
		const show=Method(function(){
			const doc=function(){
				return "Converts the value to a string for string interpolation.\nThis is the method called when you do `{...}`.\nFor a more detailed String representation of data, use `inspect`."
			}();
			const test=function test(){
				const built=new global.Map();
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
				_ms.assoc(built,[a],"Object\n\tx. <recursive>\n\tname. a");
				_ms.assoc(built,[a,{
					repr:true
				}],"Object\n\tx. <recursive>\n\tname. \"a\"");
				_ms.assoc(built,[null],"null");
				_ms.assoc(built,[void 0],"undefined");
				return built
			};
			const args=["_","opts"];
			const returns=String;
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
				returns:returns,
				"allow-null?":allow_45null_63,
				wrap:wrap,
				default:_default,
				name:"show"
			}
		}());
		const repr=exports.repr=function(){
			const doc="Shows it with the `repr` flag set.\nFor debug printing, there is the helper function `console.dbg!`.";
			return _ms.set(function repr(_){
				return show(_,{
					repr:true
				})
			},"doc",doc)
		}();
		spread_33(impl_33,show,function(){
			const built=new global.Map();
			_ms.assoc(built,String,function(){
				const test=function test(){
					const built=new global.Map();
					_ms.assoc(built,["a"],"a");
					_ms.assoc(built,["a",{
						repr:true
					}],"\"a\"");
					return built
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
			}());
			_ms.assoc(built,Number,function(){
				const test=function test(){
					const built=new global.Map();
					_ms.assoc(built,[12],"12");
					_ms.assoc(built,[- 1],"-1");
					return built
				};
				return _ms.set(function(_){
					const base=10;
					return _.toString(base)
				},"test",test)
			}());
			_ms.assoc(built,Symbol,function(){
				const test=function test(){
					const built=new global.Map();
					_ms.assoc(built,[Symbol("name")],"<Symbol>");
					return built
				};
				return _ms.set(function(){
					return "<Symbol>"
				},"test",test)
			}());
			_ms.assoc(built,Boolean,function(){
				const test=function test(){
					const built=new global.Map();
					_ms.assoc(built,[true],"true");
					_ms.assoc(built,[false],"false");
					return built
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
			}());
			_ms.assoc(built,Function,function(){
				const test=function test(){
					const built=new global.Map();
					const a=function(){
						const doc="a";
						return _ms.set(function a(){
							return 1
						},"doc",doc)
					}();
					_ms.assoc(built,[a],"a");
					_ms.assoc(built,[Object],"Object");
					_ms.assoc(built,[Function("","")],"<anonymous Function>");
					return built
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
			}());
			return built
		}());
		msDef("show",show);
		const name=exports.name="show";
		exports.default=show;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9zaG93Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBWUEsY0FBVTtFQUVWLFdBQU8saUJBQ007R0FBWixvQkFDSTtXQUNGO0dBQUE7R0FHRixXQUNPLGVBQUE7O0lBQ04sa0JBQ0c7S0FBRjthQUFJO0tBQUE7Ozs7Ozs7O29CQUNMLENBQUUsR0FDRDtvQkFJRCxDQUFFLEVBQUU7VUFBTztJQUFBLEdBQ1Y7b0JBR0QsQ0FBRSxNQUFXO29CQUNiLENBQUUsUUFBZ0I7OztHQUNuQixXQUFNLENBQUcsSUFBSTtHQUNiLGNBQVM7R0FDVCxzQkFBYTtHQUNiLFdBQU8sY0FBQSxLQUFLLEVBQUUsS0FDSTs7S0FDaEIsWUFBQSxZQUFZLElBQ0M7YUFBWDtLQUFBLE9BRUU7TUFBSCxZQUFZO01BQ1osMEJBQUUsT0FBUyxLQUFLLEVBQUU7TUFDbEIsZUFBZTthQUNmO0tBQUE7SUFBQTtHQUFBO0dBQ0gsZUFBVSxrQkFBQSxFQUFFLEtBQ0k7O0tBQ2QsWUFBQSxTQUFLLEVBQUUsT0FDSTthQUFUO0tBQUEsT0FDRixZQUFBLFNBQUssRUFBRSxTQUNTO2FBQWQ7S0FBQSxPQUVFO01BQ0gsK0JBQVcsS0FBRSxHQUFFLENBQUc7TUFDbEIsaUJBQVcsT0FBRyxzQkFBVyxNQUFPLFNBQUEsSUFDRztPQUFsQyw0QkFBSSxPQUFTLEtBQU0sRUFBRSxFQUFFLEtBQUs7Y0FDM0IsR0E4RGEsWUE5RFoscUJBQU8sT0FBTztNQUFBO2FBRWhCLEdBNERjLFlBNURiLFVBQU8sc0JBQ04sZ0JBQWU7S0FBQTtJQUFBO0dBQUE7Ozs7Ozs7Ozs7OztFQUV0QixrQ0FDSztHQUFKLFVBQ0M7a0JBRUEsY0FBQSxFQUNDO1dBQ0QsS0FBSyxFQUFFO1VBQU87SUFBQTtHQUFBOztFQUVoQixVQUFRLFFBQU0sZUFDSTs7bUJBQWpCLGlCQUNTO0lBQVIsV0FDTyxlQUFBOztxQkFBTixDQUFHLEtBQVM7cUJBRVosQ0FBRyxJQUFHO1dBQU87S0FBQSxHQUFZOzs7bUJBQ3pCLFNBQUEsRUFBRSxLQUNJOztNQUNMLFlBQUEsUUFBTSxLQUFNLFNBQ0s7Y0FBaEIsTUFBSyxLQUFLLE1BQUksRUFBRztNQUFBLE9BRWQ7Y0FBSDtNQUFBO0tBQUE7SUFBQTs7bUJBRUosaUJBQ1M7SUFBUixXQUNPLGVBQUE7O3FCQUFOLENBQUUsSUFBUztxQkFDWCxDQUFFLEtBQVc7OzttQkFDYixTQUFBLEVBQ0M7S0FBRCxXQUFPO1lBQ1AsV0FBVztJQUFBOzttQkFFYixpQkFDUztJQUFSLFdBQ08sZUFBQTs7cUJBRU4sQ0FBRyxPQUFRLFNBQWE7OzttQkFFeEIsVUFBQTtZQUNDO0lBQUE7O21CQUVILGtCQUNVO0lBQVQsV0FDTyxlQUFBOztxQkFBTixDQUFFLE1BQVc7cUJBQ2IsQ0FBRSxPQUFZOzs7bUJBQ2QsU0FBQSxFQUFBOztNQUNBLFlBQUEsR0FDQztjQUFDO01BQUEsT0FFRTtjQUFGO01BQUE7S0FBQTtJQUFBOzttQkFFSixtQkFDVztJQUFWLFdBQ08sZUFBQTs7S0FDTixrQkFDRztNQUFGLFVBQU07cUJBRUwsWUFBQTtjQUFBO01BQUE7O3FCQUNGLENBQUUsR0FBUTtxQkFDVixDQUFFLFFBQWE7cUJBQ2YsQ0FBRyxTQUFhLFFBQVM7OzttQkFDekIsU0FBUSxJQUNHOzhCQURWO01BQ0ksUUFBQTtNQUVKLGlDQUFNLElBQ0M7Y0FBTDtNQUFBLE9BRUU7Y0FBSDtNQUFBO0tBQUE7Ozs7O0VBRUwsTUFBTyxPQUFNO0VBakliLHdCQUFBO2tCQW1JQSIsImZpbGUiOiJzaG93LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=