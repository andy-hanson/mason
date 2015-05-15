"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../control","../../Type/Pred-Type","../at","../atbang","../at-Type","../Seq/Arraybang","./Mapbang","../../bang","../../compare","../../show","../at","../Seq/Seq"],function(exports,control_0,Pred_45Type_1,_64_2,_64_33_3,_64_45Type_4,Array_33_5,Map_33_6,_33_7,compare_8,show_9,_64_10,Seq_11){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(control_0),opr=_ms.get(_$2,"opr"),_$3=_ms.getModule(Pred_45Type_1),Opt=_ms.get(_$3,"Opt"),_64=_ms.getDefaultExport(_64_2),_$4=_ms.getModule(_64_2),each_33=_ms.get(_$4,"each!"),_$5=_ms.getModule(_64_33_3),_43_43_33=_ms.get(_$5,"++!"),_64_45Type=_ms.getDefaultExport(_64_45Type_4),_$6=_ms.getModule(_64_45Type_4),empty=_ms.get(_$6,"empty"),Array_33=_ms.getDefaultExport(Array_33_5),Map_33=_ms.getDefaultExport(Map_33_6),_$8=_ms.getModule(Map_33_6),get_45or_45add_33=_ms.get(_$8,"get-or-add!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_7)
		}),_$11=_ms.lazyGetModule(compare_8),_61_63=_ms.lazyProp(_$11,"=?"),show=_ms.lazy(function(){
			return _ms.getDefaultExport(show_9)
		}),_$13=_ms.lazyGetModule(_64_10),keep=_ms.lazyProp(_$13,"keep"),_$14=_ms.lazyGetModule(Seq_11),seq_61_63=_ms.lazyProp(_$14,"seq=?");
		const add_45to_45_64_33=exports["add-to-@!"]=function(){
			const doc="Treat `map` as a multi-map and add `added` to the @ associated with `key`.\n`@-type` is the type to use to create the `@` if it's not already there.";
			const test=function(){
				return _ms.set(function(){
					const _=empty(Map_33);
					add_45to_45_64_33(_,1,[1]);
					_ms.unlazy(_33)(_ms.unlazy(_61_63),_ms.sub(_,1),[1]);
					add_45to_45_64_33(_,1,[1]);
					return _ms.unlazy(_33)(_ms.unlazy(_61_63),_ms.sub(_,1),[1,1])
				},"displayName","test")
			}();
			return _ms.set(function(map,key,added,_63_64_45type){
				_ms.checkContains(Map_33,map,"map");
				_ms.checkContains(_64,added,"added");
				_ms.checkContains(_ms.sub(Opt,_64_45Type),_63_64_45type,"?@-type");
				const _=get_45or_45add_33(map,key,_ms.lazy(function(){
					return function(){
						return empty(opr(_63_64_45type,Array_33))
					}()
				}));
				return _43_43_33(_,added)
			},"doc",doc,"test",test,"displayName","add-to-@!")
		}();
		const group=exports.group=function(){
			const doc="Creates groups of elements which all have the same result for some function.\n`(group @x f)[k]` should be `f";
			const test=function(){
				return _ms.set(function(){
					const _64sample=[1,"1",2,"2"];
					const _k0=[_64sample,_ms.unlazy(show)],_v0=function(){
						const _k0="1",_v0=[1,"1"];
						const _k1="2",_v1=[2,"2"];
						return _ms.map(_k0,_v0,_k1,_v1)
					}();
					_ms.unlazy(_33)(_ms.unlazy(seq_61_63),_ms.sub(group(_64sample,_ms.unlazy(show)),"1"),_ms.unlazy(keep)(_64sample,function(_){
						return _ms.unlazy(_61_63)(_ms.unlazy(show)(_),"1")
					}));
					return _ms.map(_k0,_v0)
				},"displayName","test")
			}();
			return _ms.set(function(_64value,group_45by){
				_ms.checkContains(_64,_64value,"@value");
				_ms.checkContains(Function,group_45by,"group-by");
				const map=empty(Map_33);
				each_33(_64value,function(val){
					const key=group_45by(val);
					return add_45to_45_64_33(map,key,[val])
				});
				return map
			},"doc",doc,"test",test,"displayName","group")
		}();
		const displayName=exports.displayName="multi-map!";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9tdWx0aS1tYXAhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztFQWVBLHVEQUNVO0dBQVQsVUFDQztHQUVELHFCQUNPO21CQUFBLFVBQUE7S0FBTixRQUFJLE1BQU07S0FDVixrQkFBVSxFQUFFLEVBQUUsQ0FBRTtnREFDWCxFQUFFLEdBQUcsQ0FBRTtLQUNaLGtCQUFVLEVBQUUsRUFBRSxDQUFDO3VEQUNWLEVBQUUsR0FBRyxDQUFFLEVBQUU7SUFBQTs7a0JBQ2QsU0FBQSxJQUFTLElBQUksTUFBUSxjQUNtQjtzQkFEcEM7c0JBQWU7OEJBQVUsSUFBSTtJQUNqQyxRQUFJLGtCQUFZLElBQUk7c0JBQ0s7YUFBeEIsTUFBTyxJQUFJLGNBQVE7S0FBQTtJQUFBO1dBQ3BCLFVBQUksRUFBRTtHQUFBOztFQUVSLG9DQUNNO0dBQUwsVUFDQztHQUVELHFCQUNPO21CQUFBLFVBQUE7S0FBTixnQkFBVSxDQUFFLEVBQUcsSUFBRyxFQUFHO0tBQ3JCLFVBQUEsQ0FBRSwwQ0FDaUI7TUFBbEIsVUFBQyxRQUFNLENBQUUsRUFBRztNQUNaLFVBQUMsUUFBTSxDQUFFLEVBQUc7OzttREFHSixNQUFNLDRCQUFlLHNCQUFVLFVBQVMsU0FBQSxFQUNDO2lEQUE5QyxHQUFPO0tBQUE7Ozs7a0JBQ1gsU0FBQSxTQUFTLFdBQ2lCO3NCQURuQjtzQkFBVztJQUNsQixVQUFNLE1BQU07SUFDWixRQUFNLFNBQVEsU0FBQSxJQUNHO0tBQWhCLFVBQU0sV0FBUztZQUNmLGtCQUFVLElBQUksSUFBSSxDQUFFO0lBQUE7V0FDckI7R0FBQTs7RUFoREYsc0NBQUEiLCJmaWxlIjoiYXQvTWFwL211bHRpLW1hcGJhbmcuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==