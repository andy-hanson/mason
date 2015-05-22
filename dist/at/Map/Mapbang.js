"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Type/Kind","../../Type/Method","../at","../at-Type","../q","./Map","./Map-Type","./Hash-Mapbang","../../bang","../../compare","../../math/methods","../../Type/Method","../../Type/Wrap-Type","../../Type/Type","../at","../atbang","../Set/Set","./Map","./Weak-Id-Mapbang"],function(exports,Kind_0,Method_1,_64_2,_64_45Type_3,_63_4,Map_5,Map_45Type_6,Hash_45Map_33_7,_33_8,compare_9,methods_10,Method_11,Wrap_45Type_12,Type_13,_64_14,_64_33_15,Set_16,Map_17,Weak_45Id_45Map_33_18){
	exports._get=_ms.lazy(function(){
		const Kind=_ms.getDefaultExport(Kind_0),_$2=_ms.getModule(Kind_0),kind_33=_ms.get(_$2,"kind!"),self_45kind_33=_ms.get(_$2,"self-kind!"),Method=_ms.getDefaultExport(Method_1),_$3=_ms.getModule(Method_1),self_45impl_33=_ms.get(_$3,"self-impl!"),_64=_ms.getDefaultExport(_64_2),_$5=_ms.getModule(_64_45Type_3),empty=_ms.get(_$5,"empty"),_$6=_ms.getModule(_63_4),_63_45or=_ms.get(_$6,"?-or"),Map=_ms.getDefaultExport(Map_5),_$7=_ms.getModule(Map_5),_63get=_ms.get(_$7,"?get"),Map_45Type=_ms.getDefaultExport(Map_45Type_6),Hash_45Map_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Hash_45Map_33_7)
		}),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_8)
		}),_$12=_ms.lazyGetModule(_33_8),_33not=_ms.lazyProp(_$12,"!not"),compare=_ms.lazy(function(){
			return _ms.getDefaultExport(compare_9)
		}),_$13=_ms.lazyGetModule(compare_9),_61_63=_ms.lazyProp(_$13,"=?"),_$14=_ms.lazyGetModule(methods_10),_42=_ms.lazyProp(_$14,"*"),_$15=_ms.lazyGetModule(Method_11),impl_33=_ms.lazyProp(_$15,"impl!"),Wrap_45Type=_ms.lazy(function(){
			return _ms.getDefaultExport(Wrap_45Type_12)
		}),_$17=_ms.lazyGetModule(Type_13),_61_62=_ms.lazyProp(_$17,"=>"),_$18=_ms.lazyGetModule(_64_14),empty_63=_ms.lazyProp(_$18,"empty?"),map=_ms.lazyProp(_$18,"map"),_$19=_ms.lazyGetModule(_64_33_15),empty_33=_ms.lazyProp(_$19,"empty!"),_$20=_ms.lazyGetModule(Set_16),set_61_63=_ms.lazyProp(_$20,"set=?"),_$21=_ms.lazyGetModule(Map_17),has_45key_63=_ms.lazyProp(_$21,"has-key?"),keys=_ms.lazyProp(_$21,"keys"),Weak_45Id_45Map_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Weak_45Id_45Map_33_18)
		});
		const Map_33=Kind(function(){
			const doc="TODO";
			const implementor_45test=function implementor_45test(type){
				const Mt=_ms.unlazy(Wrap_45Type)(function(){
					const doc="Mappable Thing; might be a Weak-Id-Map!, so must be a reference type.";
					return {
						doc:doc,
						name:"Mt"
					}
				}());
				_ms.unlazy(impl_33)(_ms.unlazy(compare),Mt,function(a,b){
					return _ms.unlazy(compare)(a.val,b.val)
				});
				const ks=_ms.unlazy(_61_62)(Array,_ms.unlazy(map)([1,3,5,4,2],Mt));
				const noweak=function noweak(_do){
					if(! _ms.bool(_ms.contains(_ms.unlazy(Weak_45Id_45Map_33),_))){
						_do()
					}
				};
				const _=empty(type);
				noweak(function(){
					return _ms.unlazy(_33)(_ms.unlazy(empty_63),_)
				});
				const do_45adds=function do_45adds(){
					for(let n of ks[Symbol.iterator]()){
						add_33(_,n,_ms.unlazy(_42)(2,n.val))
					}
				};
				do_45adds();
				for(let n of ks[Symbol.iterator]()){
					_ms.unlazy(_33)(_ms.unlazy(_61_63),_ms.sub(_,n),_ms.unlazy(_42)(2,n.val))
				};
				_63get(_,Mt(0));
				_ms.unlazy(_33)(_ms.unlazy(empty_63),_63get(_,Mt(0)));
				noweak(function(){
					_ms.unlazy(_33)(_ms.unlazy(set_61_63),_ms.unlazy(keys)(_),_ms.unlazy(map)([1,2,3,4,5],Mt));
					_ms.unlazy(empty_33)(_);
					_ms.unlazy(_33)(_ms.unlazy(empty_63),_);
					do_45adds();
					un_45assoc_42_33(_,ks);
					return _ms.unlazy(_33)(_ms.unlazy(empty_63),_)
				});
				const zero=Mt(0);
				assoc_33(_,zero,0);
				assoc_33(_,zero,1);
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),_ms.sub(_,zero),1)
			};
			return {
				doc:doc,
				"implementor-test":implementor_45test,
				name:"Map!"
			}
		}());
		self_45kind_33(Map_33,Map_45Type);
		self_45impl_33(empty,Map_33,function(){
			return empty(_ms.unlazy(Hash_45Map_33))
		});
		const assoc_33=exports["assoc!"]=Method(function(){
			const doc="Set _[key] to val.";
			const args=["_","key","val"];
			return {
				doc:doc,
				args:args,
				name:"assoc!"
			}
		}());
		const assoc_42_33=exports["assoc*!"]=function(){
			const doc="Adds the other map's keys to mine, overriding my values.";
			const test="See Map!.implementor-test.";
			return _ms.set(function assoc_42_33(map,to_45add){
				_ms.checkContains(Map_33,map,"map");
				_ms.checkContains(Map,to_45add,"to-add");
				for(let _ of to_45add[Symbol.iterator]()){
					assoc_33(map,_ms.sub(_,0),_ms.sub(_,1))
				}
			},"doc",doc,"test",test)
		}();
		const un_45assoc_33=exports["un-assoc!"]=Method(function(){
			const doc="If there is a value associated with `key`, removes it and returns the value associated.";
			const args=["_","key"];
			return {
				doc:doc,
				args:args,
				name:"un-assoc!"
			}
		}());
		const un_45assoc_42_33=exports["un-assoc*!"]=function(){
			const doc="Removes keys (and by proxy, their associated values).";
			return _ms.set(function un_45assoc_42_33(map,_64to_45delete){
				_ms.checkContains(Map_33,map,"map");
				_ms.checkContains(_64,_64to_45delete,"@to-delete");
				for(let _ of _64to_45delete[Symbol.iterator]()){
					un_45assoc_33(map,_)
				}
			},"doc",doc)
		}();
		const add_33=exports["add!"]=Method(function(){
			const doc="|_ key:Any val:Any\nassoc! key val, but fail if _[key] is set already.";
			const args=["_","key","val"];
			const _default=function _default(_,key,val){
				_ms.unlazy(_33not)(_ms.unlazy(has_45key_63)(_,key),_ms.lazy(function(){
					return (("Already have key "+_ms.show(key))+".")
				}));
				return assoc_33(_,key,val)
			};
			return {
				doc:doc,
				args:args,
				default:_default,
				name:"add!"
			}
		}());
		const get_45or_45add_33=exports["get-or-add!"]=Method(function(){
			const doc="map[key], and if it's not already there, fill it in with default-val.";
			const args=["_","key","~default-val"];
			const _default=function _default(map,key,default_45val){
				return _63_45or(_63get(map,key),_ms.lazy(function(){
					return function(){
						assoc_33(map,key,_ms.unlazy(default_45val));
						return _ms.unlazy(default_45val)
					}()
				}))
			};
			return {
				doc:doc,
				args:args,
				default:_default,
				name:"get-or-add!"
			}
		}());
		kind_33(Map_33,Map);
		const name=exports.name="Map!";
		exports.default=Map_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9NYXAhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztFQXVCQSxhQUFPLGVBQ0k7R0FBVixVQUFNO0dBQ04seUJBQW1CLDRCQUFBLEtBQ0k7SUFBdEIsMkNBQ2M7S0FBYixVQUFNOzs7Ozs7NENBRU8sR0FBSSxTQUFBLEVBQUUsRUFDQztnQ0FBWixNQUFNOztJQUVmLDRCQUFRLHNCQUFXLENBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFJO0lBQ2pDLGFBQVUsZ0JBQUEsSUFDRTtLQUFYLDBEQUFRLElBQ2E7TUFBcEI7S0FBQTtJQUFBO0lBQ0YsUUFBSSxNQUFNO0lBQ1YsT0FDUSxVQUFBO2lEQUFFO0lBQUE7SUFDVixnQkFDVyxvQkFBQTtLQUFMLFFBQUEsS0FBSyxzQkFDRTtNQUFYLE9BQUssRUFBRSxrQkFBSyxFQUFFOzs7SUFDaEI7SUFDSyxRQUFBLEtBQUssc0JBQ0U7Z0RBQU4sRUFBRSxtQkFBTSxFQUFFOztJQUNoQixPQUFLLEVBQUcsR0FBRzt5Q0FDRCxPQUFLLEVBQUcsR0FBRztJQUNyQixPQUNRLFVBQUE7NERBQUssbUJBQU8sQ0FBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUk7MEJBQzFCOzBDQUNFO0tBQ1Q7S0FDQSxpQkFBVyxFQUFFO2lEQUNKO0lBQUE7SUFHVixXQUFPLEdBQUc7SUFDVixTQUFPLEVBQUUsS0FBSztJQUNkLFNBQU8sRUFBRSxLQUFLO3NEQUNULEVBQUUsTUFBTTtHQUFBOzs7Ozs7O0VBRWYsZUFBVyxPQUFLO0VBQ2hCLGVBQVcsTUFBTSxPQUNNLFVBQUE7VUFBdEI7O0VBRUQsaUNBQVEsaUJBQ007R0FBYixVQUFNO0dBQ04sV0FBTSxDQUFHLElBQUksTUFBTTs7Ozs7OztFQUVwQiwrQ0FDUTtHQUFQLFVBQU07R0FDTixXQUFPO2tCQUNOLHFCQUFBLElBQVMsU0FDVTtzQkFEZjtzQkFBWTtJQUNYLFFBQUEsS0FBQSw0QkFDTTtLQUNWLFNBQU8sWUFBSSxFQUFFLFdBQUcsRUFBRTtJQUFBO0dBQUE7O0VBRXJCLHlDQUFXLGlCQUNNO0dBQWhCLFVBQ0M7R0FDRCxXQUFNLENBQUcsSUFBSTs7Ozs7OztFQUVkLHVEQUNXO0dBQVYsVUFBTTtrQkFDTCwwQkFBQSxJQUFTLGVBQ1k7c0JBRGpCO3NCQUFnQjtJQUNmLFFBQUEsS0FBQSxrQ0FDVTtLQUFkLGNBQVUsSUFBSTtJQUFBO0dBQUE7O0VBRWpCLDZCQUFNLGlCQUNNO0dBQVgsVUFDQztHQUVELFdBQU0sQ0FBRyxJQUFJLE1BQU07R0FDbkIsZUFBVSxrQkFBQSxFQUFFLElBQUksSUFJZjtnREFGZ0IsRUFBRTtZQUNoQiwrQkFBa0I7O1dBQ3BCLFNBQU8sRUFBRSxJQUFJO0dBQUE7Ozs7Ozs7O0VBRWYsK0NBQWEsaUJBQ007R0FBbEIsVUFBTTtHQUNOLFdBQU0sQ0FBRyxJQUFJLE1BQU07R0FDbkIsZUFBVSxrQkFBQSxJQUFJLElBQUksY0FDWTtXQUE3QixTQUFNLE9BQUssSUFBSTtzQkFDTTtNQUFwQixTQUFPLElBQUksZUFGSzt3QkFBQTtLQUFBO0lBQUE7R0FBQTs7Ozs7Ozs7RUFLbkIsUUFBTSxPQUFLO0VBM0dYLHdCQUFBO2tCQTZHQSIsImZpbGUiOiJhdC9NYXAvTWFwYmFuZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9