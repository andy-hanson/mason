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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvVHlwZS9UeXBlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBZ0JBLFdBQU0sS0FBSSxNQUNJLEtBQUE7O0dBQWIsb0JBQ0M7OztFQUdGLFFBQU0sWUFBVSxLQUNPLFVBQUE7U0FNakI7VUFBQTs7RUFKTixRQUFNLFlBQVUsS0FDTyxVQUFBO1NBR2pCO1VBQUE7O0VBRE4sUUFBTSxPQUFHLEtBQU8sU0FBQSxNQUNLO1NBQWY7VUFBTCxTQUFLLE1BQUs7RUFBQTtFQUdYLHVDQUFXO0VBRVgsOEJBQVMsS0FBSSxRQUNNLEtBQUE7O0dBQWxCLG9CQUNDO0dBS0Qsc0JBQ1EsZUFBQTtJQUNQLGdCQUNTLEtBQUE7O0tBQVIsb0JBQU07OzsrQkFDSSxRQUFRLFVBQVMsR0FBQTtZQUNJO01BQS9CLEdBQUEsT0FBRyxFQUFHLGVBQ1k7Y0FBakIsQ0FBRSxFQUFFO01BQUEsT0FFRDtjQUFIO01BQUE7S0FBQTtJQUFBO0lBRUYsUUFBSyxXQUFBLEVBQUE7WUFDSTtNQUFSOzRCQUFDLFVBQUQ7c0JBQ1k7O2VBQVYsR0FBQyxJQUFHO2NBRUY7ZUFBRjs7Ozs7ZUFFSyxPQUFJLEtBQUssRUFBRztlQUNaLE9BQUksa0JBQWlCO0dBQUE7R0FDOUIsc0JBQ0ssS0FBQTs7a0JBQUQ7a0JBQ0E7a0JBQ0QsQ0FBRyxpQkFBZ0I7Ozs7O0VBRXZCLE1BQU8sVUFBUztFQUVoQixNQUFPLGdCQUFnQixDQUFBLEtBQUssTUFBTSxPQUNJO0dBQTdCLEtBQUEsWUFBVSxLQUFLLHVCQUFjLEdBQUMsY0FBYSxtQkFBbUIsVUFBUSxvQ0FBdUI7VUFDckc7RUFBQTtFQUVELDJCQUFJLEtBQUksUUFDTSxLQUFBOztHQUFiLG9CQUNDO0dBR0Qsc0JBQU8sY0FBQSxLQUFLLEtBQUssVUFBVSxLQUNJO1dBQXpCO0tBQUEsUUFBQTtLQUNKLGdCQUFDLEtBQUQsR0FDSzthQUFKO0tBQUEsT0FFRzthQUFILDZCQUE2QixLQUFLLEtBQUssVUFBVTtLQUFBO0lBQUE7R0FBQTs7O0VBRXJELG1DQUNRLEtBQUE7O0dBQVAsb0JBQ0M7R0FDRCxzQkFDTyxlQUFBOztvQkFBTixDQUFFLE1BQVU7b0JBQ1osQ0FBRSxNQUFVOzs7a0JBQ1osbUJBQVcsRUFDQzs2QkFEWCxpRUFDbUIsRUFBRyxlQUFjOzs7RUFHdEMsUUFBTSxZQUFVO0VBM0ZqQix3QkFBQTtrQkFnQkEiLCJmaWxlIjoiVHlwZS9UeXBlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=