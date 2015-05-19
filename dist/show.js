"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Function","./js","./private/bootstrap","./private/js-impl","./Object","./String","./Type/Method","./Type/Type","./at/at"],function(exports,Function_0,js_1,bootstrap_2,js_45impl_3,Object_4,String_5,Method_6,Type_7,_64_8){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Function_0),spread_33=_$2["spread!"],_$3=_ms.getModule(js_1),id_61_63=_$3["id=?"],js_43=_$3["js+"],_$4=_ms.getModule(bootstrap_2),msDef=_$4.msDef,_$5=_ms.getModule(js_45impl_3),newSet=_$5.newSet,_$6=_ms.getModule(Object_4),flag_63=_$6["flag?"],p=_$6.p,_64p=_$6["@p"],_$7=_ms.getModule(String_5),indent=_$7.indent,Method=_ms.getDefaultExport(Method_6),_$8=_ms.getModule(Method_6),impl_33=_$8["impl!"],_$9=_ms.getModule(Type_7),_61_62=_$9["=>"],type_45of=_$9["type-of"],_$11=_ms.lazyGetModule(_64_8),_45_45=_ms.lazyProp(_$11,"--"),empty_63=_ms.lazyProp(_$11,"empty?"),map=_ms.lazyProp(_$11,"map");
		const showing=newSet();
		const show=Method(function(){
			const doc=function(){
				return "|:String _ opts\nConverts the value to a string for string interpolation.\nThis is the method called when you do `{...}`.\nFor a more detailed String representation of data, use `inspect`."
			}();
			const args=2;
			const allow_45null_63=true;
			const wrap=function wrap(impl,_,opts){
				return function(){
					if(showing.has(_)){
						return "<recursive>"
					} else {
						showing.add(_);
						const x=impl(_,opts);
						showing.delete(_);
						return x
					}
				}()
			};
			const _default=function _default(_,opts){
				return function(){
					if(id_61_63(_,null)){
						return "null"
					} else if(id_61_63(_,void 0)){
						return "undefined"
					} else {
						const props=_ms.unlazy(_45_45)(_64p(_),["prototype"]);
						const key_45vals=_61_62(Array,_ms.unlazy(map)(props,function(key){
							const val=show(p(_,key),opts);
							return (((""+_ms.show(key))+". ")+_ms.show(indent(val)))
						}));
						return (((""+_ms.show(type_45of(_)))+"\n\t")+_ms.show(key_45vals.join("\n\t")))
					}
				}()
			};
			return {
				doc:doc,
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
				return _ms.set(function(_,opts){
					return function(){
						if(flag_63(opts,"repr")){
							return js_43("\"",js_43(_,"\""))
						} else {
							return _
						}
					}()
				})
			}();
			const _k1=Number,_v1=function(){
				return _ms.set(function(_){
					const base=10;
					return _.toString(base)
				})
			}();
			const _k2=Symbol,_v2=function(){
				return _ms.set(function(){
					return "<Symbol>"
				})
			}();
			const _k3=Boolean,_v3=function(){
				return _ms.set(function(_){
					return function(){
						if(_){
							return "true"
						} else {
							return "false"
						}
					}()
				})
			}();
			const _k4=Function,_v4=function(){
				return _ms.set(function(fun){
					return function(){
						const _=fun.name;
						if(_ms.unlazy(empty_63)(_)){
							return "<anonymous Function>"
						} else {
							return _
						}
					}()
				})
			}();
			return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3,_k4,_v4)
		}());
		const name=exports.name="show";
		exports.default=show;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9zaG93Lm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBWUEsY0FBVTtFQUVWLFdBQU8saUJBQ007R0FBWixvQkFDSTtXQUNGO0dBQUE7R0FtQkYsV0FBTTtHQUNOLHNCQUFhO0dBQ2IsV0FBTyxjQUFBLEtBQUssRUFBRSxLQUNJOztLQUNoQixHQUFBLFlBQVksR0FDQzthQUFYO0tBQUEsT0FFRTtNQUFILFlBQVk7TUFDWixRQUFXLEtBQUssRUFBRTtNQUNsQixlQUFlO2FBQ2Y7S0FBQTtJQUFBO0dBQUE7R0FDSCxlQUFVLGtCQUFBLEVBQUUsS0FDSTs7S0FDZCxHQUFBLFNBQUssRUFBRSxNQUNJO2FBQVQ7S0FBQSxPQUNGLEdBQUEsU0FBSyxFQUFFLFFBQ1M7YUFBZDtLQUFBLE9BRUU7TUFDSCwrQkFBVyxLQUFBLEdBQUksQ0FBRztNQUNsQixpQkFBVyxPQUFHLHNCQUFXLE1BQU8sU0FBQSxJQUNHO09BQWxDLFVBQWEsS0FBTSxFQUFFLEVBQUUsS0FBSztjQUMzQixHQXZCa0IsWUF1QmpCLHFCQUFPLE9BQU87TUFBQTthQUVoQixHQXpCbUIsWUF5QmxCLFVBQUEsc0JBQ0MsZ0JBQWU7S0FBQTtJQUFBO0dBQUE7Ozs7Ozs7Ozs7RUFFdEIsTUFBTyxPQUFNO0VBRWIsa0NBQ0s7R0FBSixVQUNDO2tCQUVBLGNBQUEsRUFDQztXQUNELEtBQUssRUFBRTtVQUFPO0lBQUE7R0FBQTs7RUFFaEIsVUFBUSxRQUFNLGVBQ0k7R0FBakIsVUFBQSxxQkFDUzttQkFJUCxTQUFBLEVBQUUsS0FDSTs7TUFDTCxHQUFBLFFBQU0sS0FBTSxRQUNLO2NBQWhCLE1BQUssS0FBSyxNQUFJLEVBQUc7TUFBQSxPQUVkO2NBQUg7TUFBQTtLQUFBO0lBQUE7R0FBQTtHQUVKLFVBQUEscUJBQ1M7bUJBR1AsU0FBQSxFQUNDO0tBQUQsV0FBTztZQUNQLFdBQVc7SUFBQTtHQUFBO0dBRWIsVUFBQSxxQkFDUzttQkFLUCxVQUFBO1lBQ0M7SUFBQTtHQUFBO0dBRUgsVUFBQSxzQkFDVTttQkFHUixTQUFBLEVBQUE7O01BQ0EsR0FBQSxFQUNDO2NBQUM7TUFBQSxPQUVFO2NBQUY7TUFBQTtLQUFBO0lBQUE7R0FBQTtHQUVKLFVBQUEsdUJBQ1c7bUJBU1QsU0FBUSxJQUNHOztNQUFOLFFBQUE7TUFFSix3QkFBQSxHQUNPO2NBQUw7TUFBQSxPQUVFO2NBQUg7TUFBQTtLQUFBO0lBQUE7R0FBQTs7O0VBaklMLHdCQUFBO2tCQW1JQSIsImZpbGUiOiJzaG93LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=