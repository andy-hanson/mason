"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../control","../../Type/Pred-Type","../at","../atbang","../at-Type","../Seq/Arraybang","./Mapbang","../../compare","../../show","../at","../Seq/Seq"],function(exports,control_0,Pred_45Type_1,_64_2,_64_33_3,_64_45Type_4,Array_33_5,Map_33_6,compare_7,show_8,_64_9,Seq_10){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(control_0),opr=_ms.get(_$2,"opr"),_$3=_ms.getModule(Pred_45Type_1),Opt=_ms.get(_$3,"Opt"),_64=_ms.getDefaultExport(_64_2),_$5=_ms.getModule(_64_33_3),_43_43_33=_ms.get(_$5,"++!"),_64_45Type=_ms.getDefaultExport(_64_45Type_4),_$6=_ms.getModule(_64_45Type_4),empty=_ms.get(_$6,"empty"),Array_33=_ms.getDefaultExport(Array_33_5),Map_33=_ms.getDefaultExport(Map_33_6),_$8=_ms.getModule(Map_33_6),get_45or_45add_33=_ms.get(_$8,"get-or-add!"),_$10=_ms.lazyGetModule(compare_7),_61_63=_ms.lazyProp(_$10,"=?"),show=_ms.lazy(function(){
			return _ms.getDefaultExport(show_8)
		}),_$12=_ms.lazyGetModule(_64_9),keep=_ms.lazyProp(_$12,"keep"),_$13=_ms.lazyGetModule(Seq_10),seq_61_63=_ms.lazyProp(_$13,"seq=?");
		const add_45to_45_64_33=exports["add-to-@!"]=function(){
			const built={};
			const doc=built.doc=`Treat \`map\` as a multi-map and add \`added\` to the @ associated with \`key\`.\n\`@-type\` is the type to use to create the \`@\` if it's not already there.`;
			const test=built.test=function test(){
				const _=empty(Map_33);
				add_45to_45_64_33(_,1,[1]);
				_ms.assert(_ms.unlazy(_61_63),_ms.sub(_,1),[1]);
				add_45to_45_64_33(_,1,[1]);
				_ms.assert(_ms.unlazy(_61_63),_ms.sub(_,1),[1,1])
			};
			return _ms.set(function add_45to_45_64_33(map,key,added,_64_45type){
				_ms.checkContains(Map_33,map,"map");
				_ms.checkContains(_64,added,"added");
				_ms.checkContains(_ms.sub(Opt,_64_45Type),_64_45type,"@-type");
				const _=get_45or_45add_33(map,key,_ms.lazy(function(){
					return function(){
						return empty(opr(_64_45type,Array_33))
					}()
				}));
				return _43_43_33(_,added)
			},built)
		}();
		const group=exports.group=function(){
			const built={};
			const doc=built.doc=`Creates groups of elements which all have the same result for some function.\n\`(group @x f)[k]\` should be \`f`;
			const test=built.test=function test(){
				const built=new global.Map();
				const _64sample=[1,`1`,2,`2`];
				_ms.assoc(built,[_64sample,_ms.unlazy(show)],function(){
					const built=new global.Map();
					_ms.assoc(built,`1`,[1,`1`]);
					_ms.assoc(built,`2`,[2,`2`]);
					return built
				}());
				_ms.assert(_ms.unlazy(seq_61_63),_ms.sub(group(_64sample,_ms.unlazy(show)),`1`),_ms.unlazy(keep)(_64sample,function(_){
					return _ms.unlazy(_61_63)(_ms.unlazy(show)(_),`1`)
				}));
				return built
			};
			return _ms.set(function group(_64value,group_45by){
				_ms.checkContains(_64,_64value,"@value");
				_ms.checkContains(Function,group_45by,"group-by");
				const map=empty(Map_33);
				for(let _ of _64value){
					const key=group_45by(_);
					add_45to_45_64_33(map,key,[_])
				};
				return map
			},built)
		}();
		const name=exports.name=`multi-map!`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9tdWx0aS1tYXAhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFjQSx1REFDVTs7R0FBVCxvQkFDQztHQUVELHNCQUNRLGVBQUE7SUFBUCxRQUFJLE1BQU07SUFDVixrQkFBVSxFQUFFLEVBQUUsQ0FBRTswQ0FDTCxFQUFFLEdBQUcsQ0FBRTtJQUNsQixrQkFBVSxFQUFFLEVBQUUsQ0FBQzswQ0FDSixFQUFFLEdBQUcsQ0FBRSxFQUFFO0dBQUE7a0JBQ3BCLDJCQUFBLElBQVMsSUFBSSxNQUFRLFdBQ2tCO3NCQURuQztzQkFBZTs4QkFBUyxJQUFJO0lBQ2hDLFFBQUksa0JBQVksSUFBSTtzQkFDSzthQUF4QixNQUFPLElBQUksV0FBTztLQUFBO0lBQUE7V0FDbkIsVUFBSSxFQUFFO0dBQUE7O0VBRVIsb0NBQ007O0dBQUwsb0JBQ0M7R0FFRCxzQkFDTyxlQUFBOztJQUFOLGdCQUFVLENBQUUsRUFBRyxJQUFHLEVBQUc7b0JBQ3JCLENBQUUsc0NBQ2lCOztxQkFBakIsSUFBTSxDQUFFLEVBQUc7cUJBQ1gsSUFBTSxDQUFFLEVBQUc7Ozs2Q0FHRSxNQUFNLDRCQUFlLHNCQUFVLFVBQVMsU0FBQSxFQUNDO2dEQUFoRCxHQUFHOzs7O2tCQUNYLGVBQUEsU0FBUyxXQUNpQjtzQkFEbkI7c0JBQVc7SUFDbEIsVUFBTSxNQUFNO0lBQ1AsUUFBQSxLQUFBLFNBQ007S0FBVixVQUFNLFdBQVM7S0FDZixrQkFBVSxJQUFJLElBQUksQ0FBRTtJQUFBO1dBQ3JCO0dBQUE7O0VBL0NGLHdCQUFBIiwiZmlsZSI6ImF0L01hcC9tdWx0aS1tYXBiYW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=