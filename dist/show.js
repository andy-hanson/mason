"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Function","./js","./private/bootstrap","./private/js-impl","./Object","./String","./Type/Method","./Type/Type","./at/at"],(exports,Function_0,js_1,bootstrap_2,js_45impl_3,Object_4,String_5,Method_6,Type_7,_64_8)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(Function_0),spread_33=_ms.get(_$2,"spread!"),_$3=_ms.getModule(js_1),id_61_63=_ms.get(_$3,"id=?"),js_43=_ms.get(_$3,"js+"),_$4=_ms.getModule(bootstrap_2),msDef=_ms.get(_$4,"msDef"),_$5=_ms.getModule(js_45impl_3),newSet=_ms.get(_$5,"newSet"),_$6=_ms.getModule(Object_4),flag_63=_ms.get(_$6,"flag?"),p=_ms.get(_$6,"p"),_64p=_ms.get(_$6,"@p"),_$7=_ms.getModule(String_5),indent=_ms.get(_$7,"indent"),Method=_ms.getDefaultExport(Method_6),_$8=_ms.getModule(Method_6),impl_33=_ms.get(_$8,"impl!"),_$9=_ms.getModule(Type_7),_61_62=_ms.get(_$9,"=>"),type_45of=_ms.get(_$9,"type-of"),_$11=_ms.lazyGetModule(_64_8),_45_45=_ms.lazyProp(_$11,"--"),empty_63=_ms.lazyProp(_$11,"empty?"),map=_ms.lazyProp(_$11,"map");
		const showing=newSet();
		const show=new (Method)(()=>{
			const built={};
			const doc=built.doc=()=>{
				return `Converts the value to a string for string interpolation.\nThis is the method called when you do \`\{...}\`.\nFor a more detailed String representation of data, use \`inspect\`.`
			}();
			const test=built.test=function test(){
				const built=new (global.Map)();
				const a=()=>{
					const built={};
					const x=_ms.lazy(()=>{
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
				return ()=>{
					if(_ms.bool(showing.has(_))){
						return `<recursive>`
					} else {
						showing.add(_);
						const x=_ms.checkContains(String,impl.call(_,opts),"x");
						showing.delete(_);
						return x
					}
				}()
			};
			const _default=built.default=function _default(opts){
				const _this=this;
				return ()=>{
					if(_ms.bool(id_61_63(_this,null))){
						return `null`
					} else if(_ms.bool(id_61_63(_this,void 0))){
						return `undefined`
					} else {
						const props=_ms.unlazy(_45_45)(_64p(_this),[`prototype`]);
						const key_45vals=_61_62(Array,_ms.unlazy(map)(props,key=>{
							const val=_ms.checkContains(String,show(p(_this,key),opts),"val");
							return `${_ms.show(key)}. ${_ms.show(indent(val))}`
						}));
						return `${_ms.show(type_45of(_this))}\n\t${_ms.show(key_45vals.join(`\n\t`))}`
					}
				}()
			};
			return _ms.setName(built,"show")
		}());
		const repr=exports.repr=()=>{
			const built={};
			const doc=built.doc=`Shows it with the \`repr\` flag set.\nFor debug printing, there is the helper function \`console.dbg!\`.`;
			return _ms.set(function repr(_){
				return show(_,{
					repr:true
				})
			},built)
		}();
		spread_33(impl_33,show,()=>{
			const built=new (global.Map)();
			_ms.assoc(built,String,()=>{
				const built={};
				const test=built.test=function test(){
					const built=new (global.Map)();
					_ms.assoc(built,[`a`],`a`);
					_ms.assoc(built,[`a`,{
						repr:true
					}],`"a"`);
					return built
				};
				return _ms.set(function(opts){
					const _this=this;
					return ()=>{
						if(_ms.bool(flag_63(opts,`repr`))){
							return js_43(`"`,js_43(_this,`"`))
						} else {
							return _this
						}
					}()
				},built)
			}());
			_ms.assoc(built,Number,()=>{
				const built={};
				const test=built.test=function test(){
					const built=new (global.Map)();
					_ms.assoc(built,[12],`12`);
					_ms.assoc(built,[- 1],`-1`);
					return built
				};
				return _ms.set(function(){
					const _this=this;
					const base=10;
					return _this.toString(base)
				},built)
			}());
			_ms.assoc(built,Symbol,()=>{
				const built={};
				const test=built.test=function test(){
					const built=new (global.Map)();
					_ms.assoc(built,[Symbol(`name`)],`<Symbol>`);
					return built
				};
				return _ms.set(()=>{
					return `<Symbol>`
				},built)
			}());
			_ms.assoc(built,Boolean,()=>{
				const built={};
				const test=built.test=function test(){
					const built=new (global.Map)();
					_ms.assoc(built,[true],`true`);
					_ms.assoc(built,[false],`false`);
					return built
				};
				return _ms.set(function(){
					const _this=this;
					return ()=>{
						if(_ms.bool(_this)){
							return `true`
						} else {
							return `false`
						}
					}()
				},built)
			}());
			_ms.assoc(built,Function,()=>{
				const built={};
				const test=built.test=function test(){
					const built=new (global.Map)();
					const a=()=>{
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
				return _ms.set(function(){
					const _this=this;
					return ()=>{
						const _=_this.name;
						if(_ms.bool(_ms.unlazy(empty_63)(_))){
							return `<anonymous Function>`
						} else {
							return _
						}
					}()
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9zaG93Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBWUEsY0FBVTtFQUVWLFdBQU0sS0FBSSxZQUNNOztHQUFmLHdCQUNJO1dBQ0Y7O0dBR0Ysc0JBQ08sZUFBQTs7SUFDTixZQUNHOztLQUFGO2FBQUk7S0FBQTs7OztvQkFDTCxDQUFFLEdBQ0Q7b0JBSUQsQ0FBRSxFQUFFO1VBQU87SUFBQSxHQUNWO29CQUdELENBQUUsTUFBVztvQkFDYixDQUFFLFFBQWdCOzs7R0FDbkIsc0JBQU0sQ0FBRyxJQUFJO0dBQ2IsNEJBQVM7R0FDVCwyQ0FBYTtHQUNiLHNCQUFPLGNBQUEsS0FBSyxFQUFFLEtBQ0k7O0tBQ2hCLFlBQUEsWUFBWSxJQUNDO2FBQVg7WUFFRTtNQUFILFlBQVk7TUFDWiwwQkFBRSxPQUFTLFVBQVUsRUFBRTtNQUN2QixlQUFlO2FBQ2Y7S0FBQTtJQUFBO0dBQUE7R0FDSCw2QkFBVyxrQkFBQSxLQUNJO1VBMkVSOztLQTFFTCxZQUFBLFNBMEVLLE1BMUVLLE9BQ0k7YUFBWjtZQUNGLFlBQUEsU0F3RUssTUF4RUssU0FDUzthQUFqQjtZQUVFO01BQ0gsK0JBQVksS0FvRVIsT0FwRWlCLENBQUc7TUFDeEIsaUJBQVcsT0FBRyxzQkFBVyxNQUFPLEtBQ0c7T0FBbEMsNEJBQUksT0FBUyxLQUFNLEVBa0VoQixNQWxFdUIsS0FBSztjQUM5QixZQUFDLGtCQUFPLE9BQU87O2FBRWhCLFlBQUMsVUErREUsdUJBOURELGdCQUFlOzs7Ozs7RUFFdEIsNEJBQ0s7O0dBQUosb0JBQ0M7a0JBRUEsY0FBQSxFQUNDO1dBQ0QsS0FBSyxFQUFFO1VBQU87SUFBQTtHQUFBOztFQUVoQixVQUFRLFFBQU0sU0FDSTs7bUJBQWpCLFdBQ1M7O0lBQVIsc0JBQ08sZUFBQTs7cUJBQU4sQ0FBRyxLQUFTO3FCQUVaLENBQUcsSUFBRztXQUFPO0tBQUEsR0FBWTs7O21CQUN4QixTQUFBLEtBQ0k7V0E2Q0E7O01BNUNKLFlBQUEsUUFBTSxLQUFNLFNBQ0s7Y0FBaEIsTUFBSyxJQUFLLE1BMkNQLE1BM0NpQjthQUVqQjtjQXlDQTtNQUFBO0tBQUE7SUFBQTs7bUJBdkNQLFdBQ1M7O0lBQVIsc0JBQ08sZUFBQTs7cUJBQU4sQ0FBRSxJQUFTO3FCQUNYLENBQUUsS0FBVzs7O21CQUVaLFVBQUE7V0FrQ0k7S0FsQ0wsV0FBTztZQWtDRixlQWpDSztJQUFBOzttQkFFWixXQUNTOztJQUFSLHNCQUNPLGVBQUE7O3FCQUVOLENBQUcsT0FBUSxTQUFhOzs7bUJBRXhCLElBQUE7WUFDQzs7O21CQUVILFlBQ1U7O0lBQVQsc0JBQ08sZUFBQTs7cUJBQU4sQ0FBRSxNQUFXO3FCQUNiLENBQUUsT0FBWTs7O21CQUViLFVBQUE7V0FpQkk7O01BaEJKLFlBZ0JJLE9BZkE7Y0FBRjthQUVFO2NBQUY7Ozs7O21CQUVMLGFBQ1c7O0lBQVYsc0JBQ08sZUFBQTs7S0FDTixZQUNHOztNQUFGLG9CQUFNO3FCQUVMLFlBQUE7Y0FBQTtNQUFBOztxQkFDRixDQUFFLEdBQVE7cUJBQ1YsQ0FBRSxRQUFhO3FCQUNmLENBQUcsU0FBYSxRQUFTOzs7bUJBRXhCLFVBQUE7V0FBSTs7TUFBQSxRQUFBO01BRUosaUNBQU0sSUFDQztjQUFMO2FBRUU7Y0FBSDtNQUFBO0tBQUE7SUFBQTs7OztFQUVMLE1BQU8sT0FBTTtFQUNiLE1BQU8sT0FBTTtFQW5JYix3QkFBQTtrQkFjQSIsImZpbGUiOiJzaG93LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=