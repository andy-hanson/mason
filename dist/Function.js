"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./methods","./Type/Alias-Type","./Type/Method","./at/at","./at/at-Type","./at/Map/Hash-Map","./at/Map/Map","./at/Map/Weak-Id-Map","./at/Seq/Seq","./Object","./Type/Pred-Type","./Type/Type"],(exports,methods_0,Alias_45Type_1,Method_2,_64_3,_64_45Type_4,Hash_45Map_5,Map_6,Weak_45Id_45Map_7,Seq_8,Object_9,Pred_45Type_10,Type_11)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(methods_0),sub=_ms.get(_$0,"sub"),Alias_45Type=_ms.getDefaultExport(Alias_45Type_1),_$1=_ms.getModule(Method_2),impl_33=_ms.get(_$1,"impl!"),self_45impl_33=_ms.get(_$1,"self-impl!"),_64=_ms.lazy(()=>_ms.getDefaultExport(_64_3)),_$2=_ms.lazyGetModule(_64_3),_43_43=_ms.lazyProp(_$2,"++"),_$3=_ms.lazyGetModule(_64_45Type_4),empty=_ms.lazyProp(_$3,"empty"),Hash_45Map=_ms.lazy(()=>_ms.getDefaultExport(Hash_45Map_5)),Map=_ms.lazy(()=>_ms.getDefaultExport(Map_6)),_$4=_ms.lazyGetModule(Map_6),get_45or_45add_33=_ms.lazyProp(_$4,"get-or-add!"),Weak_45Id_45Map=_ms.lazy(()=>_ms.getDefaultExport(Weak_45Id_45Map_7)),_$5=_ms.lazyGetModule(Seq_8),rtail=_ms.lazyProp(_$5,"rtail"),last=_ms.lazyProp(_$5,"last"),_$6=_ms.lazyGetModule(Object_9),Object_45_62Map=_ms.lazyProp(_$6,"Object->Map"),_$7=_ms.lazyGetModule(Pred_45Type_10),ObjLit=_ms.lazyProp(_$7,"ObjLit"),_$8=_ms.lazyGetModule(Type_11),_61_62=_ms.lazyProp(_$8,"=>");
		const Action=exports.Action=new (Alias_45Type)((()=>{
			const built={};
			built[`name`]="Action";
			const alias_45of=built["alias-of"]=Function;
			return built
		})());
		const Pred=exports.Pred=new (Alias_45Type)((()=>{
			const built={};
			built[`name`]="Pred";
			const alias_45of=built["alias-of"]=Function;
			return built
		})());
		const apply=exports.apply=function apply(_,args){
			_ms.checkContains(Function,_,"_");
			_ms.checkContains(_ms.unlazy(_64),args,"args");
			return _(...args)
		};
		const call=exports.call=function call(_){
			const args=[].slice.call(arguments,1);
			_ms.checkContains(Function,_,"_");
			return _(...args)
		};
		const fun_45copy=exports["fun-copy"]=function fun_45copy(_){
			_ms.checkContains(Function,_,"_");
			return Function.prototype.call.bind(_,null)
		};
		const identity=exports.identity=function identity(_){
			return _
		};
		const id_45memoize=exports["id-memoize"]=function id_45memoize(_){
			_ms.checkContains(Function,_,"_");
			const wm=_ms.unlazy(empty)(_ms.unlazy(Weak_45Id_45Map));
			return arg=>{
				_ms.checkContains(Object,arg,"arg");
				return _ms.unlazy(get_45or_45add_33)(wm,arg,_ms.lazy(()=>_(arg)))
			}
		};
		const hash_45memoize=exports["hash-memoize"]=function hash_45memoize(_){
			_ms.checkContains(Function,_,"_");
			const hm=_ms.unlazy(empty)(_ms.unlazy(Hash_45Map));
			return arg=>{
				_ms.checkContains(Object,arg,"arg");
				return _ms.unlazy(get_45or_45add_33)(hm,arg,_ms.lazy(()=>_(arg)))
			}
		};
		const spread=exports.spread=function spread(fun){
			const args=[].slice.call(arguments,1);
			_ms.checkContains(Function,fun,"fun");
			const init_45args=_ms.unlazy(rtail)(args);
			const last_45arg=_ms.unlazy(last)(args);
			const _64spreaded=(()=>{
				const _=last_45arg;
				if(_ms.contains(_ms.unlazy(Map),_)){
					return _ms.unlazy(_61_62)(Array,_)
				} else if(_ms.contains(_ms.unlazy(_64),_)){
					return (()=>{
						const built=[];
						for(let elem of _){
							_ms.add(built,[elem])
						};
						return built
					})()
				} else if(_ms.contains(_ms.unlazy(ObjLit),_)){
					return _ms.unlazy(_61_62)(Array,_ms.unlazy(Object_45_62Map)(_))
				} else {
					throw new (Error)(`Can only spread a @, Map, or ObjLit, not ${_}`)
				}
			})();
			return _ms.checkContains(_ms.unlazy(_64),(()=>{
				const built=[];
				for(let _ of _64spreaded){
					const all_45args=_ms.unlazy(_43_43)(init_45args,_);
					_ms.add(built,fun(...all_45args))
				};
				return built
			})(),"res")
		};
		const spread_33=exports["spread!"]=function spread_33(fun){
			const args=[].slice.call(arguments,1);
			spread(fun,...args)
		};
		const thunk=exports.thunk=function thunk(_){
			return ()=>{
				return _
			}
		};
		const curry=(()=>{
			return Function(`f`,`return Function.prototype.bind.apply(f, arguments)`)
		})();
		impl_33(sub,Function,function(){
			const _this=this;
			const args=[].slice.call(arguments,0);
			return curry(_this,...args)
		});
		self_45impl_33(sub,Function,()=>{
			return Function
		});
		const name=exports.name=`Function`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvRnVuY3Rpb24ubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFlQSw0QkFBUSxLQUFJLGNBQ1UsS0FBQTs7U0FHckIsUUFBQTtHQUNBLG1DQThGQTs7O0VBNUZELHdCQUFNLEtBQUksY0FDVSxLQUFBOztTQUNuQixRQUFBO0dBQ0EsbUNBeUZBOzs7RUF0RkQsMEJBQVEsZUFBQSxFQUFXLEtBQ007cUJBcUZ4Qjs7VUFwRkEsRUFBRSxHQUFBO0VBQUE7RUFHSCx3QkFBTyxjQUFBLEVBQ2tCOztxQkFnRnhCO1VBL0VBLEVBQUUsR0FBQTtFQUFBO0VBR0gscUNBQVcsb0JBQUEsRUFDVTtxQkEyRXBCO1VBQUEsNkJBdkU2QixFQUFFO0VBQUE7RUFFaEMsZ0NBQVcsa0JBQUEsRUFDQztVQUNYO0VBQUE7RUFJQSx5Q0FBYSxzQkFBQSxFQUNVO3FCQThEdkI7R0E1REM7VUFDQyxLQUNVO3NCQU9OO3lDQVBRLEdBQUcsaUJBQU0sRUFBRTtHQUFBO0VBQUE7RUFFekIsNkNBQWUsd0JBQUEsRUFDVTtxQkF1RHpCO0dBcERDO1VBQ0MsS0FDVTtzQkFETjt5Q0FDUSxHQUFHLGlCQUFNLEVBQUU7R0FBQTtFQUFBO0VBRTFCLDRCQUFTLGdCQUFHLElBQ29COztxQkErQy9CO0dBNUNBLG9DQUFrQjtHQUNsQixrQ0FBZ0I7R0FDaEIsa0JBQWlCO0lBQUEsUUFBQTtJQUNoQixnQ0FBQSxHQUNJOytCQUNBLE1BQU07SUFBQSxPQUNWLGdDQUFBLEdBQ0U7WUFBSTs7Y0FBQSxRQUFRLEVBQ0M7cUJBQWIsQ0FBQztNQUFBOzs7V0FDSCxtQ0FBQSxHQUNPOytCQUxILGtDQUtNO0lBQUEsT0FFTjtLQUFILGtCQUFRLDRDQUEwQzs7OzRDQUUvQzs7WUFBQSxLQUFBLFlBQ1M7S0FBYixvQ0FBYyxZQUFVO21CQUN0QixJQUFJLEdBQUE7SUFBQTs7OztFQUVSLG1DQUFXLG1CQUFBLElBQ1c7O0dBQ3JCLE9BQU8sSUFBSSxHQUFBO0VBQUE7RUFHWiwwQkFBUSxlQUFBLEVBQ0M7VUFFUCxJQUFBO1dBQUE7R0FBQTtFQUFBO0VBRUYsWUFDTyxLQUFBO1VBZU4sU0FkVSxJQUFJOztFQUtmLFFBQU0sSUFTTCxTQVRvQixVQUNPO1NBQXJCOztVQUFOLE1BQU0sTUFBSyxHQUFBO0VBQUE7RUFFWixlQUFXLElBTVYsU0FMd0IsSUFBQTtVQUt4QjtFQUFBO0VBbEhELHdCQUFBIiwiZmlsZSI6IkZ1bmN0aW9uLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
