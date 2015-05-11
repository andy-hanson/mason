"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../control","../../Fun","../../Type/Pred-Type","../at","../atbang","../at-Type","../Seq/Arraybang","./Mapbang","../../bang","../../compare","../../show","../at","../Seq/Seq"],function(exports,control_0,Fun_1,Pred_45Type_2,_64_3,_64_33_4,_64_45Type_5,Array_33_6,Map_33_7,_33_8,compare_9,show_10,_64_11,Seq_12){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(control_0),opr=_ms.get(_$2,"opr"),Fun=_ms.getDefaultExport(Fun_1),_$4=_ms.getModule(Pred_45Type_2),Opt=_ms.get(_$4,"Opt"),_64=_ms.getDefaultExport(_64_3),_$5=_ms.getModule(_64_3),each_33=_ms.get(_$5,"each!"),_$6=_ms.getModule(_64_33_4),_43_43_33=_ms.get(_$6,"++!"),_64_45Type=_ms.getDefaultExport(_64_45Type_5),_$7=_ms.getModule(_64_45Type_5),empty=_ms.get(_$7,"empty"),Array_33=_ms.getDefaultExport(Array_33_6),Map_33=_ms.getDefaultExport(Map_33_7),_$9=_ms.getModule(Map_33_7),get_45or_45add_33=_ms.get(_$9,"get-or-add!"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_8)
		}),_$12=_ms.lazyGetModule(compare_9),_61_63=_ms.lazyProp(_$12,"=?"),show=_ms.lazy(function(){
			return _ms.getDefaultExport(show_10)
		}),_$14=_ms.lazyGetModule(_64_11),keep=_ms.lazyProp(_$14,"keep"),_$15=_ms.lazyGetModule(Seq_12),seq_61_63=_ms.lazyProp(_$15,"seq=?");
		const exports={};
		const add_45to_45_64_33=exports["add-to-@!"]=function(){
			const doc="Treat `map` as a multi-map and add `added` to the @ associated with `key`.\n`@-type` is the type to use to create the `@` if it's not already there.";
			const test=function(){
				const _=empty(Map_33);
				add_45to_45_64_33(_,1,[1]);
				_ms.unlazy(_33)(_ms.unlazy(_61_63),_ms.sub(_,1),[1]);
				add_45to_45_64_33(_,1,[1]);
				return _ms.unlazy(_33)(_ms.unlazy(_61_63),_ms.sub(_,1),[1,1])
			};
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
			};
			return _ms.set(function(_64value,group_45by){
				_ms.checkContains(_64,_64value,"@value");
				_ms.checkContains(Fun,group_45by,"group-by");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9tdWx0aS1tYXAhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztpQ0FnQkE7Ozs7Ozs7RUFBQSx1REFDVTtHQUFULFVBQ0M7R0FFRCxXQUNPLFVBQUE7SUFBTixRQUFJLE1BQU07SUFDVixrQkFBVSxFQUFFLEVBQUUsQ0FBRTsrQ0FDWCxFQUFFLEdBQUcsQ0FBRTtJQUNaLGtCQUFVLEVBQUUsRUFBRSxDQUFDO3NEQUNWLEVBQUUsR0FBRyxDQUFFLEVBQUU7R0FBQTtrQkFDZCxTQUFBLElBQVMsSUFBSSxNQUFRLGNBQ21CO3NCQURwQztzQkFBZTs4QkFBVSxJQUFJO0lBQ2pDLFFBQUksa0JBQVksSUFBSTtzQkFDSzthQUF4QixNQUFPLElBQUksY0FBUTtLQUFBO0lBQUE7V0FDcEIsVUFBSSxFQUFFO0dBQUE7O0VBRVIsb0NBQ007R0FBTCxVQUNDO0dBRUQsV0FDTyxVQUFBO0lBQU4sZ0JBQVUsQ0FBRSxFQUFHLElBQUcsRUFBRztJQUNyQixVQUFBLENBQUUsMENBQ2lCO0tBQWxCLFVBQUMsUUFBTSxDQUFFLEVBQUc7S0FDWixVQUFDLFFBQU0sQ0FBRSxFQUFHOzs7a0RBR0osTUFBTSw0QkFBZSxzQkFBVSxVQUFTLFNBQUEsRUFDQztnREFBOUMsR0FBTztJQUFBOzs7a0JBQ1gsU0FBQSxTQUFTLFdBQ1k7c0JBRGQ7c0JBQVc7SUFDbEIsVUFBTSxNQUFNO0lBQ1osUUFBTSxTQUFRLFNBQUEsSUFDRztLQUFoQixVQUFNLFdBQVM7WUFDZixrQkFBVSxJQUFJLElBQUksQ0FBRTtJQUFBO1dBQ3JCO0dBQUE7O0VBakRGLHNDQUFBIiwiZmlsZSI6ImF0L01hcC9tdWx0aS1tYXBiYW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=