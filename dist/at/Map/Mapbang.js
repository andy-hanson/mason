"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Type/Kind","../../Type/Method","../../Type/Pred-Type","../at","../at-Type","../q","./Map","./Map-Type","./Hash-Mapbang","../../bang","../../Bool","../../compare","../../control","../../math/methods","../../Type/Method","../../Type/Wrap-Type","../../Type/Type","../at","../atbang","../Set/Set","./Map","./Weak-Id-Mapbang"],function(exports,Kind_0,Method_1,Pred_45Type_2,_64_3,_64_45Type_4,_63_5,Map_6,Map_45Type_7,Hash_45Map_33_8,_33_9,Bool_10,compare_11,control_12,methods_13,Method_14,Wrap_45Type_15,Type_16,_64_17,_64_33_18,Set_19,Map_20,Weak_45Id_45Map_33_21){
	exports._get=_ms.lazy(function(){
		const Kind=_ms.getDefaultExport(Kind_0),_$2=_ms.getModule(Kind_0),kind_33=_ms.get(_$2,"kind!"),self_45kind_33=_ms.get(_$2,"self-kind!"),Method=_ms.getDefaultExport(Method_1),_$3=_ms.getModule(Method_1),self_45impl_33=_ms.get(_$3,"self-impl!"),_$4=_ms.getModule(Pred_45Type_2),Any=_ms.get(_$4,"Any"),_64=_ms.getDefaultExport(_64_3),_$5=_ms.getModule(_64_3),each_33=_ms.get(_$5,"each!"),empty_63=_ms.get(_$5,"empty?"),_$6=_ms.getModule(_64_45Type_4),empty=_ms.get(_$6,"empty"),_63=_ms.getDefaultExport(_63_5),Map=_ms.getDefaultExport(Map_6),_$8=_ms.getModule(Map_6),_63get=_ms.get(_$8,"?get"),Map_45Type=_ms.getDefaultExport(Map_45Type_7),Hash_45Map_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Hash_45Map_33_8)
		}),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_9)
		}),_$13=_ms.lazyGetModule(_33_9),_33not=_ms.lazyProp(_$13,"!not"),_$14=_ms.lazyGetModule(Bool_10),not=_ms.lazyProp(_$14,"not"),compare=_ms.lazy(function(){
			return _ms.getDefaultExport(compare_11)
		}),_$15=_ms.lazyGetModule(compare_11),_61_63=_ms.lazyProp(_$15,"=?"),_$16=_ms.lazyGetModule(control_12),if_33=_ms.lazyProp(_$16,"if!"),_$17=_ms.lazyGetModule(methods_13),_42=_ms.lazyProp(_$17,"*"),_$18=_ms.lazyGetModule(Method_14),impl_33=_ms.lazyProp(_$18,"impl!"),Wrap_45Type=_ms.lazy(function(){
			return _ms.getDefaultExport(Wrap_45Type_15)
		}),_$20=_ms.lazyGetModule(Type_16),_61_62=_ms.lazyProp(_$20,"=>"),_$21=_ms.lazyGetModule(_64_17),map=_ms.lazyProp(_$21,"map"),_$22=_ms.lazyGetModule(_64_33_18),empty_33=_ms.lazyProp(_$22,"empty!"),_$23=_ms.lazyGetModule(Set_19),set_61_63=_ms.lazyProp(_$23,"set=?"),_$24=_ms.lazyGetModule(Map_20),has_45key_63=_ms.lazyProp(_$24,"has-key?"),keys=_ms.lazyProp(_$24,"keys"),Weak_45Id_45Map_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Weak_45Id_45Map_33_21)
		});
		const exports={};
		const Map_33=Kind(function(){
			const doc="TODO";
			const implementor_45test=function(type){
				const Mt=_ms.unlazy(Wrap_45Type)(function(){
					const doc="Mappable Thing; might be a Weak-Id-Map!, so must be a reference type.";
					return {
						doc:doc,
						displayName:"Mt"
					}
				}());
				_ms.unlazy(impl_33)(_ms.unlazy(compare),Mt,function(a,b){
					return _ms.unlazy(compare)(a.val,b.val)
				});
				const ks=_ms.unlazy(_61_62)(Array,_ms.unlazy(map)([1,3,5,4,2],Mt));
				const noweak=function(_do){
					return _ms.unlazy(if_33)(_ms.unlazy(not)(_ms.contains(_ms.unlazy(Weak_45Id_45Map_33),_)),_do)
				};
				const _=empty(type);
				noweak(function(){
					return _ms.unlazy(_33)(empty_63,_)
				});
				const do_45adds=function(){
					return each_33(ks,function(n){
						return add_33(_,n,_ms.unlazy(_42)(2,n.val))
					})
				};
				do_45adds();
				each_33(ks,function(n){
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),_ms.sub(_,n),_ms.unlazy(_42)(2,n.val))
				});
				_63get(_,Mt(0));
				_ms.unlazy(_33)(empty_63,_63get(_,Mt(0)));
				noweak(function(){
					_ms.unlazy(_33)(_ms.unlazy(set_61_63),_ms.unlazy(keys)(_),_ms.unlazy(map)([1,2,3,4,5],Mt));
					_ms.unlazy(empty_33)(_);
					_ms.unlazy(_33)(empty_63,_);
					do_45adds();
					un_45assoc_42_33(_,ks);
					return _ms.unlazy(_33)(empty_63,_)
				});
				const zero=Mt(0);
				assoc_33(_,zero,0);
				assoc_33(_,zero,1);
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),_ms.sub(_,zero),1)
			};
			return {
				doc:doc,
				"implementor-test":implementor_45test,
				displayName:"Map!"
			}
		}());
		self_45kind_33(Map_33,Map_45Type);
		self_45impl_33(empty,Map_33,function(){
			return empty(_ms.unlazy(Hash_45Map_33))
		});
		const assoc_33=exports["assoc!"]=Method(function(){
			const doc=function(_,key,val){
				_ms.checkContains(Any,key,"key");
				_ms.checkContains(Any,val,"val");
				return "Set _[key] to val."
			};
			return {
				doc:doc,
				displayName:"assoc!"
			}
		}());
		const assoc_42_33=exports["assoc*!"]=function(){
			const doc="Adds the other map's keys to mine, overriding my values.";
			const test="See Map!.implementor-test.";
			return _ms.set(function(_,to_45add){
				_ms.checkContains(Map_33,_,"_");
				_ms.checkContains(Map,to_45add,"to-add");
				return each_33(to_45add,function(pair){
					return assoc_33(_,pair.key,pair.val)
				})
			},"doc",doc,"test",test,"displayName","assoc*!")
		}();
		const un_45assoc_33=exports["un-assoc!"]=Method(function(){
			const doc=function(_,key){
				return _ms.checkContains(_63,"If there is a value associated with `key`, removes it and returns the value associated.","res")
			};
			return {
				doc:doc,
				displayName:"un-assoc!"
			}
		}());
		const un_45assoc_42_33=exports["un-assoc*!"]=function(){
			const doc="Removes keys (and by proxy, their associated values).";
			return _ms.set(function(_,_64to_45delete){
				_ms.checkContains(_64,_64to_45delete,"@to-delete");
				return each_33(_64to_45delete,_ms.sub(un_45assoc_33,_))
			},"doc",doc,"displayName","un-assoc*!")
		}();
		const add_33=exports["add!"]=Method(function(){
			const doc=function(_,key,val){
				_ms.checkContains(Any,key,"key");
				_ms.checkContains(Any,val,"val");
				return "assoc! key val, but fail if _[key] is set already."
			};
			const _default=function(_,key,val){
				_ms.checkContains(Any,key,"key");
				_ms.checkContains(Any,val,"val");
				_ms.unlazy(_33not)(_ms.unlazy(has_45key_63)(_,key),_ms.lazy(function(){
					return (("Already have key "+_ms.show(key))+".")
				}));
				return assoc_33(_,key,val)
			};
			return {
				doc:doc,
				default:_default,
				displayName:"add!"
			}
		}());
		const get_45or_45add_33=exports["get-or-add!"]=Method(function(){
			const doc="map[key], and if it's not already there, fill it in with default-val.";
			const _default=function(map,key,default_45val){
				_ms.checkContains(Any,key,"key");
				return function(){
					const _=_63get(map,key);
					if(_ms.bool(empty_63(_))){
						assoc_33(map,key,_ms.unlazy(default_45val));
						return _ms.unlazy(default_45val)
					} else {
						return _.val
					}
				}()
			};
			return {
				doc:doc,
				default:_default,
				displayName:"get-or-add!"
			}
		}());
		kind_33(Map_33,Map);
		exports.default=Map_33;
		const displayName=exports.displayName="Map!";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9NYXAhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztpQ0EwQkE7Ozs7Ozs7Ozs7Ozs7RUFBQSxhQUFPLGVBQUk7R0FDVixVQUFNO0dBQ04seUJBQW1CLFNBQUEsS0FDbEI7SUFBQSwyQ0FBYztLQUNiLFVBQU07WUFETzs7Ozs7NENBR2QsR0FBa0IsU0FBQSxFQUFFLEVBQ25CO2dDQUFRLE1BQU07O0lBRWYsNEJBQUssc0JBQWMsQ0FBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQWY7SUFDZCxhQUFVLFNBQUEsSUFDVDswRkFBUyxJQUFUO0lBQUE7SUFDRCxRQUFJLE1BQUE7SUFDSixPQUFRLFVBQ1A7NEJBQUEsU0FBUztJQUFBO0lBQ1YsZ0JBQVcsVUFDVjtZQUFBLFFBQUEsR0FBVSxTQUFBLEVBQ1Q7YUFBQSxPQUFLLEVBQUwsa0JBQVksRUFBRTs7O0lBQ2hCO0lBQ0EsUUFBQSxHQUFVLFNBQUEsRUFDVDt1REFBSyxFQUFDLG1CQUFPLEVBQUU7O0lBQ2hCLE9BQUssRUFBRSxHQUFJO29CQUNYLFNBQVMsT0FBTSxFQUFFLEdBQUk7SUFDckIsT0FBUSxVQUNQOzREQUFRLG1CQUFXLENBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFmOzBCQUNQO3FCQUNQLFNBQVM7S0FDVDtLQUNBLGlCQUFXLEVBQVg7NEJBQ0EsU0FBUztJQUFBO0lBR1YsV0FBTyxHQUFHO0lBQ1YsU0FBTyxFQUFQLEtBQWM7SUFDZCxTQUFPLEVBQVAsS0FBYztzREFDVCxFQUFDLE1BQU87R0FBQTtVQW5DSjs7Ozs7O0VBcUNYLGVBQUEsT0FBQTtFQUNBLGVBQUEsTUFBQSxPQUF1QixVQUN0QjtVQUFBOztFQUVELGlDQUFRLGlCQUFNO0dBQ2IsVUFBTSxTQUFBLEVBQUUsSUFBUSxJQUNmO3NCQURXO3NCQUFRO1dBQ2xCO0dBQUE7VUFGVzs7Ozs7RUFJZCwrQ0FBUTtHQUNQLFVBQU07R0FDTixXQUFPO2tCQUNOLFNBQUEsRUFBTyxTQUNQO3NCQURFO3NCQUFZO1dBQ2QsUUFBQSxTQUFjLFNBQUEsS0FDYjtZQUFBLFNBQU8sRUFBRSxTQUFTOzs7O0VBRXJCLHlDQUFXLGlCQUFNO0dBQ2hCLFVBQU0sU0FBRyxFQUFFLElBQ1Y7NkJBRE0sSUFDTDs7VUFGYzs7Ozs7RUFJakIsdURBQVc7R0FDVixVQUFNO2tCQUNMLFNBQUEsRUFBRSxlQUNGO3NCQURhO1dBQ2IsUUFBQSx1QkFBaUIsY0FBVTtHQUFBOztFQUU3Qiw2QkFBTSxpQkFBTTtHQUNYLFVBQU0sU0FBQSxFQUFFLElBQVEsSUFDZjtzQkFEVztzQkFBUTtXQUNsQjtHQUFBO0dBQ0YsZUFBVSxTQUFBLEVBQUUsSUFBUSxJQUluQjtzQkFKZTtzQkFBUTtnREFFUCxFQUFWO1lBQ0osK0JBQWlCOztXQUNuQixTQUFPLEVBQVAsSUFBQTtHQUFBO1VBUFU7Ozs7OztFQVNaLCtDQUFhLGlCQUFNO0dBQ2xCLFVBQU07R0FDTixlQUFVLFNBQUEsSUFBSSxJQUFRLGNBQ3JCO3NCQURpQjs7S0FDWixRQUFBLE9BQUEsSUFBQTtLQUNKLFlBQUEsU0FBQSxJQUNDO01BQUEsU0FBQSxJQUFBLGVBSG1CO3dCQUFBO0tBQUEsT0FNbkI7YUFBQTs7OztVQVJlOzs7Ozs7RUFVbkIsUUFBQSxPQUFBO2tCQUVBO0VBNUdBLHNDQUFBIiwiZmlsZSI6ImF0L01hcC9NYXBiYW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=