"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Boolean","../Function","../js","../methods","./Kind","./Method","./Obj-Type","./Type","../at/at","../bang","../compare"],function(exports,Boolean_0,Function_1,js_2,methods_3,Kind_4,Method_5,Obj_45Type_6,Type_7,_64_8,_33_9,compare_10){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_ms.get(_$2,"and"),not=_ms.get(_$2,"not"),or=_ms.get(_$2,"or"),_$3=_ms.getModule(Function_1),Pred=_ms.get(_$3,"Pred"),_$4=_ms.getModule(js_2),defined_63=_ms.get(_$4,"defined?"),id_61_63=_ms.get(_$4,"id=?"),_$5=_ms.getModule(methods_3),sub=_ms.get(_$5,"sub"),_$6=_ms.getModule(Kind_4),kind_33=_ms.get(_$6,"kind!"),_$7=_ms.getModule(Method_5),impl_33=_ms.get(_$7,"impl!"),self_45impl_33=_ms.get(_$7,"self-impl!"),Obj_45Type=_ms.getDefaultExport(Obj_45Type_6),Type=_ms.getDefaultExport(Type_7),_$9=_ms.getModule(Type_7),_61_62=_ms.get(_$9,"=>"),contains_63=_ms.get(_$9,"contains?"),_$11=_ms.lazyGetModule(_64_8),any_63=_ms.lazyProp(_$11,"any?"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_9)
		}),_$13=_ms.lazyGetModule(_33_9),_33not=_ms.lazyProp(_$13,"!not"),_$14=_ms.lazyGetModule(compare_10),_61_63=_ms.lazyProp(_$14,"=?");
		const Pred_45Type=Obj_45Type(function(){
			const built={};
			const doc=built.doc="Arbitrary predicates can be made into types using Pred-Type.";
			const props=built.props=function(){
				const built={};
				const name=built.name=String;
				const predicate=built.predicate=Pred;
				return built
			}();
			const extensible=built.extensible=true;
			return _ms.setName(built,"Pred-Type")
		}());
		kind_33(Pred_45Type,Type);
		impl_33(contains_63,Pred_45Type,function(_,value){
			return _.predicate(value)
		});
		const Opt=exports.Opt=Pred_45Type(function(){
			const built={};
			const doc=built.doc="A value which could be anything, even undefined.";
			const predicate=built.predicate=function predicate(){
				return true
			};
			return _ms.setName(built,"Opt")
		}());
		self_45impl_33(sub,Opt,function(){
			const built={};
			const doc=built.doc="Contains null, undefined, or an instance of Exists-Type.";
			return _ms.set(function(Exists_45Type){
				_ms.checkContains(Type,Exists_45Type,"Exists-Type");
				const ET=Exists_45Type;
				return Opt_45Sub(function(){
					const built={};
					const Exists_45Type=built["Exists-Type"]=ET;
					return built
				}())
			},built)
		}());
		const Opt_45Sub=Obj_45Type(function(){
			const built={};
			const doc=built.doc="Result of calling Opt[something].";
			const props=built.props=function(){
				const built={};
				const Exists_45Type=built["Exists-Type"]=Type;
				return _ms.setName(built,"props")
			}();
			return _ms.setName(built,"Opt-Sub")
		}());
		kind_33(Opt_45Sub,Type);
		impl_33(contains_63,Opt_45Sub,function(nt,_){
			return or(not(defined_63(_)),_ms.lazy(function(){
				return contains_63(nt["Exists-Type"],_)
			}))
		});
		const Any=exports.Any=Pred_45Type(function(){
			const built={};
			const doc=built.doc="Not undefined.";
			const test=built.test=function test(){
				_ms.unlazy(_33)(contains_63,Any,0);
				_ms.unlazy(_33)(contains_63,Any,null);
				_ms.unlazy(_33not)(contains_63,Any,void 0)
			};
			const predicate=built.predicate=defined_63;
			return _ms.setName(built,"Any")
		}());
		const ObjLit=exports.ObjLit=Pred_45Type(function(){
			const built={};
			const doc=built.doc="Matches only Objects which have no type (other than Object itself).";
			const test=built.test=function test(){
				_ms.unlazy(_33)(contains_63,ObjLit,{
					a:1
				});
				_ms.unlazy(_33not)(contains_63,ObjLit,ObjLit)
			};
			const predicate=built.predicate=function predicate(_){
				return and(_ms.contains(Object,_),_ms.lazy(function(){
					return id_61_63(Object.getPrototypeOf(_),Object.prototype)
				}))
			};
			return _ms.setName(built,"ObjLit")
		}());
		const Union=exports.Union=function(){
			const built={};
			const doc=built.doc="Type that matches one of several types. Analogous to `or`.";
			const test=built.test=function test(){
				const SBN=_ms.sub(Union,String,Boolean,Number);
				_ms.unlazy(_33)(_ms.unlazy(_61_63),SBN.name,"Union[String Boolean Number]");
				_ms.unlazy(_33)(contains_63,SBN,"true");
				_ms.unlazy(_33)(contains_63,SBN,true);
				_ms.unlazy(_33)(contains_63,SBN,3);
				_ms.unlazy(_33not)(contains_63,SBN,null)
			};
			return _ms.setName(built,"Union")
		}();
		self_45impl_33(sub,Union,function(){
			const types=[].slice.call(arguments,0);
			return Pred_45Type(function(){
				const built={};
				const name=built.name=(("Union["+_ms.show(_61_62(String,types," ")))+"]");
				const predicate=built.predicate=function predicate(_){
					return _ms.unlazy(any_63)(types,function(type){
						return contains_63(type,_)
					})
				};
				return built
			}())
		});
		const name=exports.name="Pred-Type";
		exports.default=Pred_45Type;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9UeXBlL1ByZWQtVHlwZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBZUEsa0JBQVcscUJBQ1E7O0dBQWxCLG9CQUFNO0dBQ04sa0NBQ007O0lBQUwsc0JBQU07SUFDTixnQ0FBVzs7O0dBQ1osa0NBQVk7OztFQUViLFFBQU0sWUFBVTtFQUNoQixRQUFNLFlBQVUsWUFBVyxTQUFBLEVBQUUsTUFDSztVQUFqQyxZQUFZO0VBQUE7RUFHWixzQkFBSyxzQkFDUzs7R0FBYixvQkFBTTtHQUNOLGdDQUNZLG9CQUFBO1dBQVg7R0FBQTs7O0VBRUYsZUFBVyxJQUFJLGNBQ0c7O0dBQWpCLG9CQUFNO2tCQUNMLFNBQUEsY0FDZ0I7c0JBREo7SUFDWixTQUFLO1dBQ0wsb0JBQ087O0tBQU4seUNBQWE7Ozs7O0VBRWhCLGdCQUFVLHFCQUNROztHQUFqQixvQkFBTTtHQUNOLGtDQUNNOztJQUFMLHlDQUFhOzs7OztFQUNmLFFBQU0sVUFBUTtFQUNkLFFBQU0sWUFBVSxVQUFTLFNBQUEsR0FBRyxFQUNDO1VBQTVCLEdBQUksSUFBSSxXQUFRO1dBQUssWUFBVSxrQkFBZTtHQUFBO0VBQUE7RUFFaEQsc0JBQUssc0JBQ1M7O0dBQWIsb0JBQU07R0FDTixzQkFDUSxlQUFBO29CQUFMLFlBQVUsSUFBSTtvQkFDZCxZQUFVLElBQUk7dUJBQ1gsWUFBVSxJQUFJOztHQUNwQixnQ0FBVzs7O0VBRVosNEJBQVEsc0JBQ1M7O0dBQWhCLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtvQkFBTCxZQUFVLE9BQU87T0FBSTtJQUFBO3VCQUNsQixZQUFVLE9BQU87R0FBQTtHQUN2QixnQ0FBWSxtQkFBQSxFQUNDO1dBQVosaUJBQUssT0FBRDtZQUFVLFNBQU0sc0JBQXNCLEdBQUc7Ozs7O0VBRS9DLG9DQUNNOztHQUFMLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtJQUNQLGtCQUFNLE1BQU0sT0FBTyxRQUFRO3VDQUN0QixTQUFVO29CQUNiLFlBQVUsSUFBSztvQkFDZixZQUFVLElBQUk7b0JBQ2QsWUFBVSxJQUFJO3VCQUNYLFlBQVUsSUFBSTtHQUFBOzs7RUFFckIsZUFBVyxJQUFJLE1BQU8sVUFDUTs7VUFBN0Isc0JBQ1M7O0lBQVIsc0JBQU8sb0JBQU8sT0FBRyxPQUFPLE1BQU87SUFDL0IsZ0NBQVksbUJBQUEsRUFDQzsrQkFBUCxNQUFPLFNBQUEsS0FDSTthQUFmLFlBQVUsS0FBSztLQUFBO0lBQUE7Ozs7RUEvRW5CLHdCQUFBO2tCQWVBIiwiZmlsZSI6IlR5cGUvUHJlZC1UeXBlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=