"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Function","./js","./private/bootstrap","./private/js-impl","./Object","./String","./Type/Method","./Type/Type","./at/at"],function(exports,Function_0,js_1,bootstrap_2,js_45impl_3,Object_4,String_5,Method_6,Type_7,_64_8){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Function_0),spread_33=_ms.get(_$2,"spread!"),_$3=_ms.getModule(js_1),id_61_63=_ms.get(_$3,"id=?"),js_43=_ms.get(_$3,"js+"),_$4=_ms.getModule(bootstrap_2),msDef=_ms.get(_$4,"msDef"),_$5=_ms.getModule(js_45impl_3),newSet=_ms.get(_$5,"newSet"),_$6=_ms.getModule(Object_4),flag_63=_ms.get(_$6,"flag?"),p=_ms.get(_$6,"p"),_64p=_ms.get(_$6,"@p"),_$7=_ms.getModule(String_5),indent=_ms.get(_$7,"indent"),Method=_ms.getDefaultExport(Method_6),_$8=_ms.getModule(Method_6),impl_33=_ms.get(_$8,"impl!"),_$9=_ms.getModule(Type_7),_61_62=_ms.get(_$9,"=>"),type_45of=_ms.get(_$9,"type-of"),_$11=_ms.lazyGetModule(_64_8),_45_45=_ms.lazyProp(_$11,"--"),empty_63=_ms.lazyProp(_$11,"empty?"),map=_ms.lazyProp(_$11,"map");
		const showing=newSet();
		const show=Method(function(){
			const built={};
			const doc=built.doc=function(){
				return `Converts the value to a string for string interpolation.\nThis is the method called when you do \`{...}\`.\nFor a more detailed String representation of data, use \`inspect\`.`
			}();
			const test=built.test=function test(){
				const built=new global.Map();
				const a=function(){
					const built={};
					const x=_ms.lazy(function(){
						return a
					});
					_ms.setLazy(built,"x",x);
					return _ms.setName(built,"a")
				}();
				_ms.assoc(built,[a],`Object\n\tx. <recursive>\n\tname. a`);
				_ms.assoc(built,[a,{
					repr:true
				}],`Object\n\tx. <recursive>\n\tname. "a"`);
				_ms.assoc(built,[null],`null`);
				_ms.assoc(built,[void 0],`undefined`);
				return built
			};
			const args=built.args=[`_`,`opts`];
			const returns=built.returns=String;
			const allow_45null_63=built["allow-null?"]=true;
			const wrap=built.wrap=function wrap(impl,_,opts){
				return function(){
					if(_ms.bool(showing.has(_))){
						return `<recursive>`
					} else {
						showing.add(_);
						const x=_ms.checkContains(String,impl(_,opts),"x");
						showing.delete(_);
						return x
					}
				}()
			};
			const _default=built.default=function _default(_,opts){
				return function(){
					if(_ms.bool(id_61_63(_,null))){
						return `null`
					} else if(_ms.bool(id_61_63(_,void 0))){
						return `undefined`
					} else {
						const props=_ms.unlazy(_45_45)(_64p(_),[`prototype`]);
						const key_45vals=_61_62(Array,_ms.unlazy(map)(props,function(key){
							const val=_ms.checkContains(String,show(p(_,key),opts),"val");
							return `${_ms.show(key)}. ${_ms.show(indent(val))}`
						}));
						return `${_ms.show(type_45of(_))}\n\t${_ms.show(key_45vals.join(`\n\t`))}`
					}
				}()
			};
			return _ms.setName(built,"show")
		}());
		const repr=exports.repr=function(){
			const built={};
			const doc=built.doc=`Shows it with the \`repr\` flag set.\nFor debug printing, there is the helper function \`console.dbg!\`.`;
			return _ms.set(function repr(_){
				return show(_,{
					repr:true
				})
			},built)
		}();
		spread_33(impl_33,show,function(){
			const built=new global.Map();
			_ms.assoc(built,String,function(){
				const built={};
				const test=built.test=function test(){
					const built=new global.Map();
					_ms.assoc(built,[`a`],`a`);
					_ms.assoc(built,[`a`,{
						repr:true
					}],`"a"`);
					return built
				};
				return _ms.set(function(_,opts){
					return function(){
						if(_ms.bool(flag_63(opts,`repr`))){
							return js_43(`"`,js_43(_,`"`))
						} else {
							return _
						}
					}()
				},built)
			}());
			_ms.assoc(built,Number,function(){
				const built={};
				const test=built.test=function test(){
					const built=new global.Map();
					_ms.assoc(built,[12],`12`);
					_ms.assoc(built,[- 1],`-1`);
					return built
				};
				return _ms.set(function(_){
					const base=10;
					return _.toString(base)
				},built)
			}());
			_ms.assoc(built,Symbol,function(){
				const built={};
				const test=built.test=function test(){
					const built=new global.Map();
					_ms.assoc(built,[Symbol(`name`)],`<Symbol>`);
					return built
				};
				return _ms.set(function(){
					return `<Symbol>`
				},built)
			}());
			_ms.assoc(built,Boolean,function(){
				const built={};
				const test=built.test=function test(){
					const built=new global.Map();
					_ms.assoc(built,[true],`true`);
					_ms.assoc(built,[false],`false`);
					return built
				};
				return _ms.set(function(_){
					return function(){
						if(_ms.bool(_)){
							return `true`
						} else {
							return `false`
						}
					}()
				},built)
			}());
			_ms.assoc(built,Function,function(){
				const built={};
				const test=built.test=function test(){
					const built=new global.Map();
					const a=function(){
						const built={};
						const doc=built.doc=`a`;
						return _ms.set(function a(){
							return 1
						},built)
					}();
					_ms.assoc(built,[a],`a`);
					_ms.assoc(built,[Object],`Object`);
					_ms.assoc(built,[Function("","")],`<anonymous Function>`);
					return built
				};
				return _ms.set(function(fun){
					return _ms.checkContains(String,function(){
						const _=fun.name;
						if(_ms.bool(_ms.unlazy(empty_63)(_))){
							return `<anonymous Function>`
						} else {
							return _
						}
					}(),"res")
				},built)
			}());
			return built
		}());
		msDef(`show`,show);
		msDef(`repr`,repr);
		const name=exports.name=`show`;
		exports.default=show;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9zaG93Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBWUEsY0FBVTtFQUVWLFdBQU0saUJBQ007O0dBQVgsOEJBQ0k7V0FDRjs7R0FHRixzQkFDTyxlQUFBOztJQUNOLGtCQUNHOztLQUFGO2FBQUk7S0FBQTs7OztvQkFDTCxDQUFFLEdBQ0Q7b0JBSUQsQ0FBRSxFQUFFO1VBQU87SUFBQSxHQUNWO29CQUdELENBQUUsTUFBVztvQkFDYixDQUFFLFFBQWdCOzs7R0FDbkIsc0JBQU0sQ0FBRyxJQUFJO0dBQ2IsNEJBQVM7R0FDVCwyQ0FBYTtHQUNiLHNCQUFPLGNBQUEsS0FBSyxFQUFFLEtBQ0k7O0tBQ2hCLFlBQUEsWUFBWSxJQUNDO2FBQVg7WUFFRTtNQUFILFlBQVk7TUFDWiwwQkFBRSxPQUFTLEtBQUssRUFBRTtNQUNsQixlQUFlO2FBQ2Y7S0FBQTtJQUFBO0dBQUE7R0FDSCw2QkFBVSxrQkFBQSxFQUFFLEtBQ0k7O0tBQ2QsWUFBQSxTQUFLLEVBQUUsT0FDSTthQUFUO1lBQ0YsWUFBQSxTQUFLLEVBQUUsU0FDUzthQUFkO1lBRUU7TUFDSCwrQkFBVyxLQUFFLEdBQUUsQ0FBRztNQUNsQixpQkFBVyxPQUFHLHNCQUFXLE1BQU8sU0FBQSxJQUNHO09BQWxDLDRCQUFJLE9BQVMsS0FBTSxFQUFFLEVBQUUsS0FBSztjQUMzQixZQUFDLGtCQUFPLE9BQU87O2FBRWhCLFlBQUMsVUFBTyxtQkFDTixnQkFBZTs7Ozs7O0VBRXRCLGtDQUNLOztHQUFKLG9CQUNDO2tCQUVBLGNBQUEsRUFDQztXQUNELEtBQUssRUFBRTtVQUFPO0lBQUE7R0FBQTs7RUFFaEIsVUFBUSxRQUFNLGVBQ0k7O21CQUFqQixpQkFDUzs7SUFBUixzQkFDTyxlQUFBOztxQkFBTixDQUFHLEtBQVM7cUJBRVosQ0FBRyxJQUFHO1dBQU87S0FBQSxHQUFZOzs7bUJBQ3pCLFNBQUEsRUFBRSxLQUNJOztNQUNMLFlBQUEsUUFBTSxLQUFNLFNBQ0s7Y0FBaEIsTUFBSyxJQUFLLE1BQUksRUFBRzthQUVkO2NBQUg7TUFBQTtLQUFBO0lBQUE7O21CQUVKLGlCQUNTOztJQUFSLHNCQUNPLGVBQUE7O3FCQUFOLENBQUUsSUFBUztxQkFDWCxDQUFFLEtBQVc7OzttQkFDYixTQUFBLEVBQ0M7S0FBRCxXQUFPO1lBQ1AsV0FBVztJQUFBOzttQkFFYixpQkFDUzs7SUFBUixzQkFDTyxlQUFBOztxQkFFTixDQUFHLE9BQVEsU0FBYTs7O21CQUV4QixVQUFBO1lBQ0M7OzttQkFFSCxrQkFDVTs7SUFBVCxzQkFDTyxlQUFBOztxQkFBTixDQUFFLE1BQVc7cUJBQ2IsQ0FBRSxPQUFZOzs7bUJBQ2QsU0FBQSxFQUFBOztNQUNBLFlBQUEsR0FDQztjQUFDO2FBRUU7Y0FBRjs7Ozs7bUJBRUosbUJBQ1c7O0lBQVYsc0JBQ08sZUFBQTs7S0FDTixrQkFDRzs7TUFBRixvQkFBTTtxQkFFTCxZQUFBO2NBQUE7TUFBQTs7cUJBQ0YsQ0FBRSxHQUFRO3FCQUNWLENBQUUsUUFBYTtxQkFDZixDQUFHLFNBQWEsUUFBUzs7O21CQUN6QixTQUFRLElBQ0c7OEJBRFY7TUFDSSxRQUFBO01BRUosaUNBQU0sSUFDQztjQUFMO2FBRUU7Y0FBSDtNQUFBO0tBQUE7Ozs7O0VBRUwsTUFBTyxPQUFNO0VBQ2IsTUFBTyxPQUFNO0VBbEliLHdCQUFBO2tCQWNBIiwiZmlsZSI6InNob3cuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==