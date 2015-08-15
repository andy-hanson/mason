"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../control","../../Type/Pred-Type","../at","../at-Type","./Map","../../compare","../../to-string","../at","../Seq/Seq"],(exports,control_0,Pred_45Type_1,_64_2,_64_45Type_3,Map_4,compare_5,to_45string_6,_64_7,Seq_8)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(control_0),opr=_ms.get(_$2,"opr"),_$3=_ms.getModule(Pred_45Type_1),Opt=_ms.get(_$3,"Opt"),_64=_ms.getDefaultExport(_64_2),_$4=_ms.getModule(_64_2),_43_43_33=_ms.get(_$4,"++!"),_64_45Type=_ms.getDefaultExport(_64_45Type_3),_$5=_ms.getModule(_64_45Type_3),empty=_ms.get(_$5,"empty"),Map=_ms.getDefaultExport(Map_4),_$6=_ms.getModule(Map_4),get_45or_45add_33=_ms.get(_$6,"get-or-add!"),_$8=_ms.lazyGetModule(compare_5),_61_63=_ms.lazyProp(_$8,"=?"),to_45string=_ms.lazy(()=>{
			return _ms.getDefaultExport(to_45string_6)
		}),_$10=_ms.lazyGetModule(_64_7),keep=_ms.lazyProp(_$10,"keep"),_$11=_ms.lazyGetModule(Seq_8),seq_61_63=_ms.lazyProp(_$11,"seq=?");
		const add_45to_45_64_33=exports["add-to-@!"]=(()=>{
			const built={};
			const doc=built.doc=`Treat \`map\` as a multi-map and add \`added\` to the @ associated with \`key\`.\n\`@-type\` is the type to use to create the \`@\` if it's not already there.`;
			const test=built.test=function test(){
				const _=empty(Map);
				add_45to_45_64_33(_,1,[1]);
				_ms.assert(_ms.unlazy(_61_63),_ms.sub(_,1),[1]);
				add_45to_45_64_33(_,1,[1]);
				_ms.assert(_ms.unlazy(_61_63),_ms.sub(_,1),[1,1])
			};
			return _ms.set(function add_45to_45_64_33(map,key,added,_64_45type){
				_ms.checkContains(Map,map,"map");
				_ms.checkContains(_64,added,"added");
				_ms.checkContains(_ms.sub(Opt,_64_45Type),_64_45type,"@-type");
				const _=get_45or_45add_33(map,key,_ms.lazy(()=>{
					return (()=>{
						return empty(opr(_64_45type,Array))
					})()
				}));
				return _43_43_33(_,added)
			},built)
		})();
		const group=exports.group=(()=>{
			const built={};
			const doc=built.doc=`Creates groups of elements which all have the same result for some function.\n\`(group @x f)[k]\` should be \`f`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				const _64sample=[1,`1`,2,`2`];
				_ms.assoc(built,[_64sample,_ms.unlazy(to_45string)],(()=>{
					const built=new (global.Map)();
					_ms.assoc(built,`1`,[1,`1`]);
					_ms.assoc(built,`2`,[2,`2`]);
					return built
				})());
				_ms.assert(_ms.unlazy(seq_61_63),_ms.sub(group(_64sample,_ms.unlazy(to_45string)),`1`),_ms.unlazy(keep)(_64sample,_=>{
					return _ms.unlazy(_61_63)(_ms.unlazy(to_45string)(_),`1`)
				}));
				return built
			};
			return _ms.set(function group(_64value,group_45by){
				_ms.checkContains(_64,_64value,"@value");
				_ms.checkContains(Function,group_45by,"group-by");
				const map=empty(Map);
				for(let _ of _64value){
					const key=group_45by(_);
					add_45to_45_64_33(map,key,[_])
				};
				return map
			},built)
		})();
		const name=exports.name=`multi-map`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvQC9NYXAvbXVsdGktbWFwLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFZQSw2Q0FDVSxLQUFBOztHQUFULG9CQUNDO0dBRUQsc0JBQ1EsZUFBQTtJQUFQLFFBQUksTUFBTTtJQUNWLGtCQUFVLEVBQUUsRUFBRSxDQUFFOzBDQUNMLEVBQUUsR0FBRyxDQUFFO0lBQ2xCLGtCQUFVLEVBQUUsRUFBRSxDQUFDOzBDQUNKLEVBQUUsR0FBRyxDQUFFLEVBQUU7R0FBQTtrQkFDcEIsMkJBQUEsSUFBUSxJQUFJLE1BQVEsV0FDa0I7c0JBRGxDO3NCQUFjOzhCQUFTLElBQUk7SUFDL0IsUUFBSSxrQkFBWSxJQUFJO1lBQ0ssS0FBQTthQUF4QixNQUFPLElBQUksV0FBTztLQUFBO0lBQUE7V0FDbkIsVUFBSSxFQUFFO0dBQUE7O0VBRVIsMEJBQ00sS0FBQTs7R0FBTCxvQkFDQztHQUVELHNCQUNPLGVBQUE7O0lBQU4sZ0JBQVUsQ0FBRSxFQUFHLElBQUcsRUFBRztvQkFDckIsQ0FBRSxtQ0FDc0IsS0FBQTs7cUJBQXRCLElBQU0sQ0FBRSxFQUFHO3FCQUNYLElBQU0sQ0FBRSxFQUFHOzs7NkNBR0UsTUFBTSxtQ0FBb0Isc0JBQVUsVUFBUyxHQUNDO3VEQUFoRCxHQUFHOzs7O2tCQUNoQixlQUFBLFNBQVMsV0FDaUI7c0JBRG5CO3NCQUFXO0lBQ2xCLFVBQU0sTUFBTTtJQUNQLFFBQUEsS0FBQSxTQUNNO0tBQVYsVUFBTSxXQUFTO0tBQ2Ysa0JBQVUsSUFBSSxJQUFJLENBQUU7SUFBQTtXQUNyQjtHQUFBOztFQTdDRix3QkFBQSIsImZpbGUiOiJhdC9NYXAvbXVsdGktbWFwLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=