"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../compare","../js","../private/bootstrap","../to-string","./Impl-Type","./Kind","./Method","../at/q","../Object","../to-string","./Method"],(exports,compare_0,js_1,bootstrap_2,to_45string_3,Impl_45Type_4,Kind_5,Method_6,_63_7,Object_8,to_45string_9,Method_10)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(js_1),id_61_63=_ms.get(_$3,"id=?"),_$4=_ms.getModule(bootstrap_2),ms=_ms.get(_$4,"ms"),msDef=_ms.get(_$4,"msDef"),to_45string=_ms.getDefaultExport(to_45string_3),Impl_45Type=_ms.getDefaultExport(Impl_45Type_4),Kind=_ms.getDefaultExport(Kind_5),_$8=_ms.getModule(Kind_5),kind_33=_ms.get(_$8,"kind!"),Method=_ms.getDefaultExport(Method_6),_$9=_ms.getModule(Method_6),impl_33=_ms.get(_$9,"impl!"),_$11=_ms.lazyGetModule(_63_7),_63_45or=_ms.lazyProp(_$11,"?-or"),_$12=_ms.lazyGetModule(Object_8),_63p_45with_45proto=_ms.lazyProp(_$12,"?p-with-proto"),_$13=_ms.lazyGetModule(to_45string_9),inspect=_ms.lazyProp(_$13,"inspect"),_$15=_ms.lazyGetModule(Method_10),self_45impl_33=_ms.lazyProp(_$15,"self-impl!");
		const Type=new (Kind)((()=>{
			const built={};
			const doc=built.doc=`Anything implementing contains?.\nTypes are generally used to succinctly make assertions about values.`;
			return _ms.setName(built,"Type")
		})());
		impl_33(to_45string,Type,function(){
			const _this=this;
			return _this.name
		});
		impl_33(to_45string,Kind,function(){
			const _this=this;
			return _this.name
		});
		impl_33(_61_63,Type,function(other){
			const _this=this;
			return id_61_63(_this,other)
		});
		const contains_63=exports["contains?"]=ms.contains;
		const extract=exports.extract=new (Method)((()=>{
			const built={};
			const doc=built.doc=`Given a type and arbitrary value:\n\tIf the value is of the type, return an array of sub-values.\n\tOtherwise, return \`null\`.\nThe array of values are taken into local variables.\nFor example:`;
			const test=built.test=function test(){
				const My_45Type=(()=>{
					const built={};
					const doc=built.doc=`Example type`;
					return _ms.setName(built,"My-Type")
				})();
				_ms.unlazy(self_45impl_33)(extract,My_45Type,_=>{
					return (()=>{
						if(_61_63(_,`extractable`)){
							return [1,2]
						} else {
							return null
						}
					})()
				});
				const f=function f(_){
					return (()=>{
						{
							const _$=_ms.extract(My_45Type,_);
							if((_$!==null)){
								const a=_$[0],b=_$[1];
								return `${a}${b}`
							} else {
								return `not extractable`
							}
						}
					})()
				};
				_ms.assert(_61_63,`12`,f(`extractable`));
				_ms.assert(_61_63,`not extractable`,f())
			};
			const args=built.args=(()=>{
				const built=[];
				_ms.add(built,`type`);
				_ms.add(built,`candidate`);
				_ms.add(built,[`num-extracteds`,Number]);
				return built
			})();
			return _ms.setName(built,"extract")
		})());
		msDef(`extract`,extract);
		msDef(`checkContains`,(type,value,name)=>{
			if(! contains_63(type,value))throw _ms.error(`${name} is no ${type.name}, is a ${type_45of(value).name}: ${_ms.unlazy(inspect)(value)}`);
			return value
		});
		const _61_62=exports["=>"]=new (Method)((()=>{
			const built={};
			const doc=built.doc=`TODO: Don't take additional args...\n|convert-to:Type convert-me (may take additional args)\nConverts a value to a given type.`;
			const wrap=built.wrap=function wrap(impl,type,converted,opts){
				return (()=>{
					const _=converted;
					if(_ms.contains(type,_)){
						return _
					} else {
						return Function.prototype.call.call(impl,type,converted,opts)
					}
				})()
			};
			return _ms.setName(built,"=>")
		})());
		const type_45of=exports["type-of"]=(()=>{
			const built={};
			const doc=built.doc=`Most specific Impl-Type for a value.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[Type],Kind);
				_ms.assoc(built,[null],Object);
				return built
			};
			return _ms.set(function type_45of(_){
				return _ms.checkContains(Impl_45Type,_ms.unlazy(_63_45or)(_ms.unlazy(_63p_45with_45proto)(_,`constructor`),Object),"res")
			},built)
		})();
		kind_33(Impl_45Type,Type);
		const name=exports.name=`Type`;
		exports.default=Type;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL1R5cGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFnQkEsV0FBTSxLQUFJLE1BQ0ksS0FBQTs7R0FBYixvQkFDQzs7O0VBR0YsUUFBTSxZQUFVLEtBQ08sVUFBQTtTQU1qQjtVQUFBOztFQUpOLFFBQU0sWUFBVSxLQUNPLFVBQUE7U0FHakI7VUFBQTs7RUFETixRQUFNLE9BQUcsS0FBTyxTQUFBLE1BQ0s7U0FBZjtVQUFMLFNBQUssTUFBSztFQUFBO0VBR1gsdUNBQVc7RUFFWCw4QkFBUyxLQUFJLFFBQ00sS0FBQTs7R0FBbEIsb0JBQ0M7R0FLRCxzQkFDUSxlQUFBO0lBQ1AsZ0JBQ1MsS0FBQTs7S0FBUixvQkFBTTs7OytCQUNJLFFBQVEsVUFBUyxHQUFBO1lBQ0k7TUFBL0IsR0FBQSxPQUFHLEVBQUcsZUFDWTtjQUFqQixDQUFFLEVBQUU7TUFBQSxPQUVEO2NBQUg7TUFBQTtLQUFBO0lBQUE7SUFFRixRQUFLLFdBQUEsRUFBQTtZQUNJO01BQVI7NEJBQUMsVUFBRDtzQkFDWTs7ZUFBVixHQUFDLElBQUc7Y0FFRjtlQUFGOzs7OztlQUVLLE9BQUksS0FBSyxFQUFHO2VBQ1osT0FBSSxrQkFBaUI7R0FBQTtHQUM5QixzQkFDSyxLQUFBOztrQkFBRDtrQkFDQTtrQkFDRCxDQUFHLGlCQUFnQjs7Ozs7RUFFdkIsTUFBTyxVQUFTO0VBRWhCLE1BQU8sZ0JBQWdCLENBQUEsS0FBSyxNQUFNLE9BQ0k7R0FBN0IsS0FBQSxZQUFVLEtBQUssdUJBQWMsR0FBQyxjQUFhLG1CQUFtQixVQUFRLG9DQUF1QjtVQUNyRztFQUFBO0VBRUQsMkJBQUksS0FBSSxRQUNNLEtBQUE7O0dBQWIsb0JBQ0M7R0FHRCxzQkFBTyxjQUFBLEtBQUssS0FBSyxVQUFVLEtBQ0k7V0FBekI7S0FBQSxRQUFBO0tBQ0osZ0JBQUMsS0FBRCxHQUNLO2FBQUo7S0FBQSxPQUVHO2FBQUgsNkJBQTZCLEtBQUssS0FBSyxVQUFVO0tBQUE7SUFBQTtHQUFBOzs7RUFFckQsbUNBQ1EsS0FBQTs7R0FBUCxvQkFDQztHQUNELHNCQUNPLGVBQUE7O29CQUFOLENBQUUsTUFBVTtvQkFDWixDQUFFLE1BQVU7OztrQkFDWixtQkFBVyxFQUNDOzZCQURYLGlFQUNtQixFQUFHLGVBQWM7OztFQUd0QyxRQUFNLFlBQVU7RUEzRmpCLHdCQUFBO2tCQWdCQSIsImZpbGUiOiJUeXBlL1R5cGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==