"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./js","./private/bootstrap","./private/js-impl","./Object","./String","./Type/Method","./Type/Type","./at/at"],(exports,js_0,bootstrap_1,js_45impl_2,Object_3,String_4,Method_5,Type_6,_64_7)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(js_0),id_61_63=_ms.get(_$2,"id=?"),js_43=_ms.get(_$2,"js+"),_$3=_ms.getModule(bootstrap_1),msDef=_ms.get(_$3,"msDef"),_$4=_ms.getModule(js_45impl_2),newSet=_ms.get(_$4,"newSet"),_$5=_ms.getModule(Object_3),flag_63=_ms.get(_$5,"flag?"),p=_ms.get(_$5,"p"),_64p=_ms.get(_$5,"@p"),_$6=_ms.getModule(String_4),indent=_ms.get(_$6,"indent"),Method=_ms.getDefaultExport(Method_5),_$7=_ms.getModule(Method_5),impl_33=_ms.get(_$7,"impl!"),_$8=_ms.getModule(Type_6),_61_62=_ms.get(_$8,"=>"),type_45of=_ms.get(_$8,"type-of"),_$10=_ms.lazyGetModule(_64_7),_45_45=_ms.lazyProp(_$10,"--"),empty_63=_ms.lazyProp(_$10,"empty?"),map=_ms.lazyProp(_$10,"map");
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
					if(showing.has(_)){
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
					if(id_61_63(_this,null)){
						return `null`
					} else if(id_61_63(_this,void 0)){
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
		impl_33(show,String,()=>{
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
					if(flag_63(opts,`repr`)){
						return js_43(`"`,js_43(_this,`"`))
					} else {
						return _this
					}
				}()
			},built)
		}());
		impl_33(show,Number,()=>{
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
		impl_33(show,Symbol,()=>{
			const built={};
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[Symbol(`name`)],`Symbol(name)`);
				return built
			};
			return _ms.set(function(){
				const _this=this;
				return _this.toString()
			},built)
		}());
		impl_33(show,Boolean,()=>{
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
					if(_this){
						return `true`
					} else {
						return `false`
					}
				}()
			},built)
		}());
		impl_33(show,Function,()=>{
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
					if(_ms.unlazy(empty_63)(_)){
						return `<anonymous Function>`
					} else {
						return _
					}
				}()
			},built)
		}());
		msDef(`show`,show);
		msDef(`repr`,repr);
		const name=exports.name=`show`;
		exports.default=show;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9zaG93Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBV0EsY0FBVTtFQUVWLFdBQU0sS0FBSSxZQUNNOztHQUFmLHdCQUNJO1dBQ0Y7O0dBR0Ysc0JBQ08sZUFBQTs7SUFDTixZQUNHOztLQUFGO2FBQUk7S0FBQTs7OztvQkFDTCxDQUFFLEdBQ0Q7b0JBSUQsQ0FBRSxFQUFFO1VBQU87SUFBQSxHQUNWO29CQUdELENBQUUsTUFBVztvQkFDYixDQUFFLFFBQWdCOzs7R0FDbkIsc0JBQU0sQ0FBRyxJQUFJO0dBQ2IsNEJBQVM7R0FDVCwyQ0FBYTtHQUNiLHNCQUFPLGNBQUEsS0FBSyxFQUFFLEtBQ0k7O0tBQ2hCLEdBQUEsWUFBWSxHQUNDO2FBQVg7WUFFRTtNQUFILFlBQVk7TUFDWiwwQkFBRSxPQUFTLFVBQVUsRUFBRTtNQUN2QixlQUFlO2FBQ2Y7S0FBQTtJQUFBO0dBQUE7R0FDSCw2QkFBVyxrQkFBQSxLQUNJO1VBdUVUOztLQXRFSixHQUFBLFNBc0VJLE1BdEVNLE1BQ0k7YUFBWjtZQUNGLEdBQUEsU0FvRUksTUFwRU0sUUFDUzthQUFqQjtZQUVFO01BQ0gsK0JBQVksS0FnRVQsT0FoRWtCLENBQUc7TUFDeEIsaUJBQVcsT0FBRyxzQkFBVyxNQUFPLEtBQ0c7T0FBbEMsNEJBQUksT0FBUyxLQUFNLEVBOERqQixNQTlEd0IsS0FBSztjQUM5QixZQUFDLGtCQUFPLE9BQU87O2FBRWhCLFlBQUMsVUEyREMsdUJBMURBLGdCQUFlOzs7Ozs7RUFFdEIsNEJBQ0s7O0dBQUosb0JBQ0M7a0JBRUEsY0FBQSxFQUNDO1dBQ0QsS0FBSyxFQUFFO1VBQU87SUFBQTtHQUFBOztFQUVoQixRQUFNLEtBQUssV0FDTTs7R0FBaEIsc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRyxLQUFTO29CQUVaLENBQUcsSUFBRztVQUFPO0lBQUEsR0FBWTs7O2tCQUN4QixTQUFBLEtBQ0k7VUEwQ0E7O0tBekNKLEdBQUEsUUFBTSxLQUFNLFFBQ0s7YUFBaEIsTUFBSyxJQUFLLE1Bd0NQLE1BeENpQjtZQUVqQjthQXNDQTtLQUFBO0lBQUE7R0FBQTs7RUFwQ1AsUUFBTSxLQUFLLFdBQ007O0dBQWhCLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsSUFBUztvQkFDWCxDQUFFLEtBQVc7OztrQkFFWixVQUFBO1VBK0JJO0lBL0JMLFdBQU87V0ErQkYsZUE5Qks7R0FBQTs7RUFFWixRQUFNLEtBQUssV0FDTTs7R0FBaEIsc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRyxPQUFRLFNBQWE7OztrQkFFdkIsVUFBQTtVQXdCSTtXQUFBOzs7RUF0QlAsUUFBTSxLQUFLLFlBQ087O0dBQWpCLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsTUFBVztvQkFDYixDQUFFLE9BQVk7OztrQkFFYixVQUFBO1VBaUJJOztLQWhCSixHQWdCSSxNQWZBO2FBQUY7WUFFRTthQUFGOzs7OztFQUVMLFFBQU0sS0FBSyxhQUNROztHQUFsQixzQkFDTyxlQUFBOztJQUNOLFlBQ0c7O0tBQUYsb0JBQU07b0JBRUwsWUFBQTthQUFBO0tBQUE7O29CQUNGLENBQUUsR0FBUTtvQkFDVixDQUFFLFFBQWE7b0JBQ2YsQ0FBRyxTQUFhLFFBQVM7OztrQkFFeEIsVUFBQTtVQUFJOztLQUFBLFFBQUE7S0FFSix3QkFBTSxHQUNDO2FBQUw7WUFFRTthQUFIO0tBQUE7SUFBQTtHQUFBOztFQUdKLE1BQU8sT0FBTTtFQUNiLE1BQU8sT0FBTTtFQS9IYix3QkFBQTtrQkFhQSIsImZpbGUiOiJzaG93LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=