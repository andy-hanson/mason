"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Type/Kind","../../Type/Method","../at","../at-Type","../q","./Map","./Map-Type","./Id-Mapbang","../../compare","../../math/methods","../../Type/Method","../../Type/Wrap-Type","../../Type/Type","../at","../atbang","../Set/Set","./Map","./Weak-Id-Mapbang"],(exports,Kind_0,Method_1,_64_2,_64_45Type_3,_63_4,Map_5,Map_45Type_6,Id_45Map_33_7,compare_8,methods_9,Method_10,Wrap_45Type_11,Type_12,_64_13,_64_33_14,Set_15,Map_16,Weak_45Id_45Map_33_17)=>{
	exports._get=_ms.lazy(()=>{
		const Kind=_ms.getDefaultExport(Kind_0),_$2=_ms.getModule(Kind_0),kind_33=_ms.get(_$2,"kind!"),self_45kind_33=_ms.get(_$2,"self-kind!"),Method=_ms.getDefaultExport(Method_1),_$3=_ms.getModule(Method_1),self_45impl_33=_ms.get(_$3,"self-impl!"),_64=_ms.getDefaultExport(_64_2),_$5=_ms.getModule(_64_45Type_3),empty=_ms.get(_$5,"empty"),_$6=_ms.getModule(_63_4),_63_45or=_ms.get(_$6,"?-or"),Map=_ms.getDefaultExport(Map_5),_$7=_ms.getModule(Map_5),_63get=_ms.get(_$7,"?get"),Map_45Type=_ms.getDefaultExport(Map_45Type_6),Id_45Map_33=_ms.lazy(()=>{
			return _ms.getDefaultExport(Id_45Map_33_7)
		}),compare=_ms.lazy(()=>{
			return _ms.getDefaultExport(compare_8)
		}),_$12=_ms.lazyGetModule(compare_8),_61_63=_ms.lazyProp(_$12,"=?"),_$13=_ms.lazyGetModule(methods_9),_42=_ms.lazyProp(_$13,"*"),_$14=_ms.lazyGetModule(Method_10),impl_33=_ms.lazyProp(_$14,"impl!"),Wrap_45Type=_ms.lazy(()=>{
			return _ms.getDefaultExport(Wrap_45Type_11)
		}),_$16=_ms.lazyGetModule(Type_12),_61_62=_ms.lazyProp(_$16,"=>"),_$17=_ms.lazyGetModule(_64_13),empty_63=_ms.lazyProp(_$17,"empty?"),map=_ms.lazyProp(_$17,"map"),_$18=_ms.lazyGetModule(_64_33_14),empty_33=_ms.lazyProp(_$18,"empty!"),_$19=_ms.lazyGetModule(Set_15),set_61_63=_ms.lazyProp(_$19,"set=?"),_$20=_ms.lazyGetModule(Map_16),has_45key_63=_ms.lazyProp(_$20,"has-key?"),keys=_ms.lazyProp(_$20,"keys"),Weak_45Id_45Map_33=_ms.lazy(()=>{
			return _ms.getDefaultExport(Weak_45Id_45Map_33_17)
		});
		const Map_33=Kind(()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const implementor_45test=built["implementor-test"]=function implementor_45test(type){
				const Mt=_ms.unlazy(Wrap_45Type)(()=>{
					const built={};
					const doc=built.doc=`Mappable Thing; might be a Weak-Id-Map!, so must be a reference type.`;
					return _ms.setName(built,"Mt")
				}());
				_ms.unlazy(impl_33)(_ms.unlazy(compare),Mt,(a,b)=>{
					return _ms.unlazy(compare)(a.val,b.val)
				});
				const ks=_ms.unlazy(_61_62)(Array,_ms.unlazy(map)([1,3,5,4,2],Mt));
				const noweak=function noweak(act){
					if(! _ms.bool(_ms.contains(_ms.unlazy(Weak_45Id_45Map_33),_))){
						act()
					}
				};
				const _=empty(type);
				noweak(()=>{
					_ms.assert(_ms.unlazy(empty_63),_)
				});
				const do_45adds=function do_45adds(){
					for(let n of ks){
						add_33(_,n,_ms.unlazy(_42)(2,n.val))
					}
				};
				do_45adds();
				for(let n of ks){
					_ms.assert(_ms.unlazy(_61_63),_ms.sub(_,n),_ms.unlazy(_42)(2,n.val))
				};
				_63get(_,Mt(0));
				_ms.assert(_ms.unlazy(empty_63),_63get(_,Mt(0)));
				noweak(()=>{
					_ms.assert(_ms.unlazy(set_61_63),_ms.unlazy(keys)(_),_ms.unlazy(map)([1,2,3,4,5],Mt));
					_ms.unlazy(empty_33)(_);
					_ms.assert(_ms.unlazy(empty_63),_);
					do_45adds();
					un_45assoc_42_33(_,ks);
					_ms.assert(_ms.unlazy(empty_63),_)
				});
				const zero=Mt(0);
				assoc_33(_,zero,0);
				assoc_33(_,zero,1);
				_ms.assert(_ms.unlazy(_61_63),_ms.sub(_,zero),1)
			};
			return _ms.setName(built,"Map!")
		}());
		self_45kind_33(Map_33,Map_45Type);
		self_45impl_33(empty,Map_33,()=>{
			return empty(_ms.unlazy(Id_45Map_33))
		});
		const assoc_33=exports["assoc!"]=Method(()=>{
			const built={};
			const doc=built.doc=`Set _[key] to val.`;
			const args=built.args=[`_`,`key`,`val`];
			return _ms.setName(built,"assoc!")
		}());
		const assoc_42_33=exports["assoc*!"]=()=>{
			const built={};
			const doc=built.doc=`Adds the other map's keys to mine, overriding my values.`;
			const test=built.test=`See Map!.implementor-test.`;
			return _ms.set(function assoc_42_33(map,to_45add){
				_ms.checkContains(Map_33,map,"map");
				_ms.checkContains(Map,to_45add,"to-add");
				for(let _ of to_45add){
					assoc_33(map,_ms.sub(_,0),_ms.sub(_,1))
				}
			},built)
		}();
		const un_45assoc_33=exports["un-assoc!"]=Method(()=>{
			const built={};
			const doc=built.doc=`If there is a value associated with \`key\`, removes it and returns the value associated.`;
			const args=built.args=[`_`,`key`];
			return _ms.setName(built,"un-assoc!")
		}());
		const un_45assoc_42_33=exports["un-assoc*!"]=()=>{
			const built={};
			const doc=built.doc=`Removes keys (and by proxy, their associated values).`;
			return _ms.set(function un_45assoc_42_33(map,_64to_45delete){
				_ms.checkContains(Map_33,map,"map");
				_ms.checkContains(_64,_64to_45delete,"@to-delete");
				for(let _ of _64to_45delete){
					un_45assoc_33(map,_)
				}
			},built)
		}();
		const add_33=exports["add!"]=Method(()=>{
			const built={};
			const doc=built.doc=`|_ key:Any val:Any\nassoc! key val, but fail if _[key] is set already.`;
			const args=built.args=[`_`,`key`,`val`];
			const _default=built.default=function _default(_,key,val){
				if(_ms.bool(_ms.unlazy(has_45key_63)(_,key)))throw _ms.error(`Already have key ${_ms.show(key)}.`);
				assoc_33(_,key,val)
			};
			return _ms.setName(built,"add!")
		}());
		const get_45or_45add_33=exports["get-or-add!"]=Method(()=>{
			const built={};
			const doc=built.doc=`map[key], and if it's not already there, fill it in with default-val.`;
			const args=built.args=[`_`,`key`,`~default-val`];
			const _default=built.default=function _default(map,key,default_45val){
				return _63_45or(_63get(map,key),_ms.lazy(()=>{
					return ()=>{
						assoc_33(map,key,_ms.unlazy(default_45val));
						return _ms.unlazy(default_45val)
					}()
				}))
			};
			return _ms.setName(built,"get-or-add!")
		}());
		kind_33(Map_33,Map);
		const name=exports.name=`Map!`;
		exports.default=Map_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9NYXAhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7RUFzQkEsYUFBTSxTQUNJOztHQUFULG9CQUFNO0dBQ04sbURBQW9CLDRCQUFBLEtBQ0k7SUFBdkIscUNBQ2M7O0tBQWIsb0JBQU07Ozs0Q0FFTyxHQUFJLENBQUEsRUFBRSxJQUNDO2dDQUFaLE1BQU07O0lBRWYsNEJBQVEsc0JBQVcsQ0FBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUk7SUFDakMsYUFBVyxnQkFBQSxJQUNHO0tBQWIsMERBQVEsSUFDYTtNQUFwQjtLQUFBO0lBQUE7SUFDRixRQUFJLE1BQU07SUFDVixPQUNTLElBQUE7cUNBQU87SUFBQTtJQUNoQixnQkFDWSxvQkFBQTtLQUFOLFFBQUEsS0FBSyxHQUNFO01BQVgsT0FBSyxFQUFFLGtCQUFLLEVBQUU7OztJQUNoQjtJQUNLLFFBQUEsS0FBSyxHQUNFOzJDQUFBLEVBQUUsbUJBQU0sRUFBRTs7SUFDdEIsT0FBSyxFQUFHLEdBQUc7b0NBQ0ssT0FBSyxFQUFHLEdBQUc7SUFDM0IsT0FDUyxJQUFBO3VEQUFVLG1CQUFPLENBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxHQUFJOzBCQUNoQztxQ0FDUTtLQUNmO0tBQ0EsaUJBQVcsRUFBRTtxQ0FDRTtJQUFBO0lBR2hCLFdBQU8sR0FBRztJQUNWLFNBQU8sRUFBRSxLQUFLO0lBQ2QsU0FBTyxFQUFFLEtBQUs7MENBQ0gsRUFBRSxNQUFNO0dBQUE7OztFQUVyQixlQUFXLE9BQUs7RUFDaEIsZUFBVyxNQUFNLE9BQ00sSUFBQTtVQUF0Qjs7RUFFRCxpQ0FBUSxXQUNNOztHQUFiLG9CQUFNO0dBQ04sc0JBQU0sQ0FBRyxJQUFJLE1BQU07OztFQUVwQix5Q0FDUTs7R0FBUCxvQkFBTTtHQUNOLHNCQUFPO2tCQUNMLHFCQUFBLElBQVMsU0FDVTtzQkFEZjtzQkFBWTtJQUNaLFFBQUEsS0FBQSxTQUNNO0tBQ1YsU0FBTyxZQUFJLEVBQUUsV0FBRyxFQUFFO0lBQUE7R0FBQTs7RUFFckIseUNBQVcsV0FDTTs7R0FBaEIsb0JBQ0M7R0FDRCxzQkFBTSxDQUFHLElBQUk7OztFQUVkLGlEQUNXOztHQUFWLG9CQUFNO2tCQUNKLDBCQUFBLElBQVMsZUFDWTtzQkFEakI7c0JBQWdCO0lBQ2hCLFFBQUEsS0FBQSxlQUNVO0tBQWQsY0FBVSxJQUFJO0lBQUE7R0FBQTs7RUFFakIsNkJBQU0sV0FDTTs7R0FBWCxvQkFDQztHQUVELHNCQUFNLENBQUcsSUFBSSxNQUFNO0dBQ25CLDZCQUFXLGtCQUFBLEVBQUUsSUFBSSxJQUdoQjtJQURTLHFDQUFTLEVBQUUsc0JBQVksNkJBQWtCO0lBQ2xELFNBQU8sRUFBRSxJQUFJO0dBQUE7OztFQUVmLCtDQUFhLFdBQ007O0dBQWxCLG9CQUFNO0dBQ04sc0JBQU0sQ0FBRyxJQUFJLE1BQU07R0FDbkIsNkJBQVUsa0JBQUEsSUFBSSxJQUFJLGNBQ1k7V0FBN0IsU0FBTSxPQUFLLElBQUk7Z0JBQ007TUFBcEIsU0FBTyxJQUFJLGVBRks7d0JBQUE7S0FBQTtJQUFBO0dBQUE7OztFQUtuQixRQUFNLE9BQUs7RUF6R1gsd0JBQUE7a0JBc0JBIiwiZmlsZSI6ImF0L01hcC9NYXBiYW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=