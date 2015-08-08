"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../compare","../js","../private/bootstrap","../to-string","./Impl-Type","./Kind","./Method","../at/q","../Object","./Method"],(exports,compare_0,js_1,bootstrap_2,to_45string_3,Impl_45Type_4,Kind_5,Method_6,_63_7,Object_8,Method_9)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_$3=_ms.getModule(js_1),id_61_63=_ms.get(_$3,"id=?"),_$4=_ms.getModule(bootstrap_2),ms=_ms.get(_$4,"ms"),msDef=_ms.get(_$4,"msDef"),to_45string=_ms.getDefaultExport(to_45string_3),Impl_45Type=_ms.getDefaultExport(Impl_45Type_4),Kind=_ms.getDefaultExport(Kind_5),_$8=_ms.getModule(Kind_5),kind_33=_ms.get(_$8,"kind!"),Method=_ms.getDefaultExport(Method_6),_$9=_ms.getModule(Method_6),impl_33=_ms.get(_$9,"impl!"),_$11=_ms.lazyGetModule(_63_7),_63_45or=_ms.lazyProp(_$11,"?-or"),_$12=_ms.lazyGetModule(Object_8),_63p_45with_45proto=_ms.lazyProp(_$12,"?p-with-proto"),_$14=_ms.lazyGetModule(Method_9),self_45impl_33=_ms.lazyProp(_$14,"self-impl!");
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
			if(! contains_63(type,value))throw _ms.error(`${name} is no ${type.name}, is a ${type_45of(value).name}: ${value}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL1R5cGUubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFlQSxXQUFNLEtBQUksTUFDSSxLQUFBOztHQUFiLG9CQUNDOzs7RUFHRixRQUFNLFlBQVUsS0FDTyxVQUFBO1NBTWpCO1VBQUE7O0VBSk4sUUFBTSxZQUFVLEtBQ08sVUFBQTtTQUdqQjtVQUFBOztFQUROLFFBQU0sT0FBRyxLQUFPLFNBQUEsTUFDSztTQUFmO1VBQUwsU0FBSyxNQUFLO0VBQUE7RUFHWCx1Q0FBVztFQUVYLDhCQUFTLEtBQUksUUFDTSxLQUFBOztHQUFsQixvQkFDQztHQUtELHNCQUNRLGVBQUE7SUFDUCxnQkFDUyxLQUFBOztLQUFSLG9CQUFNOzs7K0JBQ0ksUUFBUSxVQUFTLEdBQUE7WUFDSTtNQUEvQixHQUFBLE9BQUcsRUFBRyxlQUNZO2NBQWpCLENBQUUsRUFBRTtNQUFBLE9BRUQ7Y0FBSDtNQUFBO0tBQUE7SUFBQTtJQUVGLFFBQUssV0FBQSxFQUFBO1lBQ0k7TUFBUjs0QkFBQyxVQUFEO3NCQUNZOztlQUFWLEdBQUMsSUFBRztjQUVGO2VBQUY7Ozs7O2VBRUssT0FBSSxLQUFLLEVBQUc7ZUFDWixPQUFJLGtCQUFpQjtHQUFBO0dBQzlCLHNCQUNLLEtBQUE7O2tCQUFEO2tCQUNBO2tCQUNELENBQUcsaUJBQWdCOzs7OztFQUV2QixNQUFPLFVBQVM7RUFFaEIsTUFBTyxnQkFBZ0IsQ0FBQSxLQUFLLE1BQU0sT0FDSTtHQUE3QixLQUFBLFlBQVUsS0FBSyx1QkFBYyxHQUFDLGNBQWEsbUJBQW1CLFVBQVEsZ0JBQWU7VUFDN0Y7RUFBQTtFQUVELDJCQUFJLEtBQUksUUFDTSxLQUFBOztHQUFiLG9CQUNDO0dBR0Qsc0JBQU8sY0FBQSxLQUFLLEtBQUssVUFBVSxLQUNJO1dBQXpCO0tBQUEsUUFBQTtLQUNKLGdCQUFDLEtBQUQsR0FDSzthQUFKO0tBQUEsT0FFRzthQUFILDZCQUE2QixLQUFLLEtBQUssVUFBVTtLQUFBO0lBQUE7R0FBQTs7O0VBRXJELG1DQUNRLEtBQUE7O0dBQVAsb0JBQ0M7R0FDRCxzQkFDTyxlQUFBOztvQkFBTixDQUFFLE1BQVU7b0JBQ1osQ0FBRSxNQUFVOzs7a0JBQ1osbUJBQVcsRUFDQzs2QkFEWCxpRUFDbUIsRUFBRyxlQUFjOzs7RUFHdEMsUUFBTSxZQUFVO0VBMUZqQix3QkFBQTtrQkFlQSIsImZpbGUiOiJUeXBlL1R5cGUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==