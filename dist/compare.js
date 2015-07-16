"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./js","./Type/Method","./at/at","./at/at-Type","./at/q","./at/Seq/Arraybang","./at/Seq/Seq","./control","./Function","./Object","./Type/Pred-Type","./at/at","./at/q","./at/at-Type","./Try"],function(exports,js_0,Method_1,_64_2,_64_45Type_3,_63_4,Array_33_5,Seq_6,control_7,Function_8,Object_9,Pred_45Type_10,_64_11,_63_12,_64_45Type_13,Try_14){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(js_0),id_61_63=_ms.get(_$2,"id=?"),Method=_ms.getDefaultExport(Method_1),_64=_ms.lazy(function(){
			return _ms.getDefaultExport(_64_2)
		}),_$5=_ms.lazyGetModule(_64_2),all_63=_ms.lazyProp(_$5,"all?"),empty_63=_ms.lazyProp(_$5,"empty?"),iterator=_ms.lazyProp(_$5,"iterator"),_$6=_ms.lazyGetModule(_64_45Type_3),from_45stream=_ms.lazyProp(_$6,"from-stream"),_$7=_ms.lazyGetModule(_63_4),un_45_63=_ms.lazyProp(_$7,"un-?"),Array_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Array_33_5)
		}),Seq=_ms.lazy(function(){
			return _ms.getDefaultExport(Seq_6)
		}),_$9=_ms.lazyGetModule(Seq_6),first=_ms.lazyProp(_$9,"first"),tail=_ms.lazyProp(_$9,"tail"),_$10=_ms.lazyGetModule(control_7),opr=_ms.lazyProp(_$10,"opr"),returning=_ms.lazyProp(_$10,"returning"),_$11=_ms.lazyGetModule(Function_8),identity=_ms.lazyProp(_$11,"identity"),_$12=_ms.lazyGetModule(Object_9),object_61_63=_ms.lazyProp(_$12,"object=?"),_$13=_ms.lazyGetModule(Pred_45Type_10),Opt=_ms.lazyProp(_$13,"Opt"),_$15=_ms.lazyGetModule(_64_11),count=_ms.lazyProp(_$15,"count"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_12)
		}),_$17=_ms.lazyGetModule(_64_45Type_13),empty=_ms.lazyProp(_$17,"empty"),_$18=_ms.lazyGetModule(Try_14),fails_63=_ms.lazyProp(_$18,"fails?");
		const compare=Method(function(){
			const built={};
			const doc=built.doc=`A Number < 0 if a < b, > 0 if a > b, and = 0 if a = b.\nIt could be implemented as:\n\tcase\n\t\t<? a b\n\t\t\t-1\n\t\t>? a b\n\t\t\t1\n\t\telse\n\t\t\t0\nBut instead, other comparison operators are defined in terms of this.\n\`compare a b\` should always be \`* -1 (compare b a)\`.`;
			const args=built.args=2;
			return _ms.setName(built,"compare")
		}());
		const _61_63=exports["=?"]=Method(function(){
			const built={};
			const doc=built.doc=`Whether two objects are considered equivalent.\nGenerally, if two values are \`=?\`, then most Functions called on them should return the same results.\n\`=?\` defaults to \`object=?\`.\nValues can be \`=?\` but not \`object=?\` if they are conceptually the same, but have different representations.\nFor example, two Sets with the same values might internally have different ordering.\n\nValues of different types should generally not be =?.\nFor example, [ 1 2 3 ] is not \`=?\` (=> Stream [ 1 2 3 ]), but it is \`seq=?\`.\nUnlike other comparison methods, \`=?\` should not make assertions about type.`;
			const args=built.args=2;
			const allow_45null_63=built["allow-null?"]=true;
			const _default=built.default=function _default(a,b){
				return (id_61_63(a,b)||_ms.unlazy(object_61_63)(a,b))
			};
			return _ms.setName(built,"=?")
		}());
		const _60_63=exports["<?"]=Method(function(){
			const built={};
			const doc=built.doc=`Whether \`lesser\` comes before \`greater\` in these values' ordering.\nSame as \`not  (>=? lesser greater)\`.`;
			const args=built.args=2;
			const _default=built.default=function _default(lesser,greater){
				return _60_63(compare(lesser,greater),0)
			};
			return _ms.setName(built,"<?")
		}());
		const _60_61_63=exports["<=?"]=Method(function(){
			const built={};
			const doc=built.doc=`<? or =?.`;
			const args=built.args=2;
			const _default=built.default=function _default(lesser,greater){
				return _60_61_63(compare(lesser,greater),0)
			};
			return _ms.setName(built,"<=?")
		}());
		const same_63=exports["same?"]=function(){
			const built={};
			const doc=built.doc=`Whether two values have the same \`f\`.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[_ms.unlazy(count),[1],[2]],true);
				_ms.assoc(built,[_ms.unlazy(count),[],[1]],false);
				return built
			};
			return _ms.set(function same_63(f,a,b){
				_ms.checkContains(Function,f,"f");
				return _61_63(f(a),f(b))
			},built)
		}();
		const max=exports.max=function(){
			const built={};
			const doc=built.doc=`An element that is >=? all others. Fails when empty.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[1,3,2]],3);
				_ms.assoc(built,[[2,1,2]],2);
				_ms.assert(_ms.unlazy(fails_63),function(){
					return max([])
				});
				return built
			};
			return _ms.set(function max(_){
				_ms.checkContains(_ms.unlazy(_64),_,"_");
				return _ms.unlazy(un_45_63)(_63max(_),`Can not take max of empty.`)
			},built)
		}();
		const _63max=exports["?max"]=function(){
			const built={};
			const doc=built.doc=`Like max, but returns empty ? for empty.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[1]],_ms.unlazy(_63)(1));
				_ms.assoc(built,[[]],_ms.unlazy(empty)(_ms.unlazy(_63)));
				return built
			};
			return _ms.set(function _63max(_){
				_ms.checkContains(_ms.unlazy(_64),_,"_");
				return _63max_45by(_,_ms.unlazy(identity))
			},built)
		}();
		const max_45by=exports["max-by"]=function(){
			const built={};
			const doc=built.doc=`An element whose \`by em\` is >=? all other elements' \`by em\`s.\nLike \`max (map _ by)\` except the mapping is not applied to the result.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[`five`,`six`,`seven`],_ms.unlazy(count)],`seven`);
				_ms.assert(_ms.unlazy(fails_63),function(){
					return max_45by([],_ms.unlazy(identity))
				});
				return built
			};
			return _ms.set(function max_45by(_,by){
				_ms.checkContains(_ms.unlazy(_64),_,"_");
				_ms.checkContains(Function,by,"by");
				return _ms.unlazy(un_45_63)(_63max_45by(_,by),`Can not take max of empty.`)
			},built)
		}();
		const _63max_45by=exports["?max-by"]=function(){
			const built={};
			const doc=built.doc=`Like max-by, but returns empty ? for empty.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[1],_ms.unlazy(identity)],_ms.unlazy(_63)(1));
				_ms.assoc(built,[[],_ms.unlazy(identity)],_ms.unlazy(empty)(_ms.unlazy(_63)));
				return built
			};
			return _ms.set(function _63max_45by(_,by){
				_ms.checkContains(_ms.unlazy(_64),_,"_");
				_ms.checkContains(Function,by,"by");
				return _ms.bool(_ms.unlazy(empty_63)(_))?_ms.None:_ms.some(function(){
					const iter=_ms.unlazy(iterator)(_);
					const value=iter.next().value;
					let cur_45max=value;
					let cur_45max_45by=by(value);
					for(;;){
						const _$118=iter.next(),value=_$118.value,done=_$118.done;
						if(_ms.bool(done)){
							break
						} else {
							const value_45by=by(value);
							if(_60_63(cur_45max_45by,value_45by)){
								cur_45max=value;
								cur_45max_45by=value_45by
							}
						}
					};
					return cur_45max
				}())
			},built)
		}();
		const sorted_63=exports["sorted?"]=function(){
			const built={};
			const doc=built.doc=`Whether it is already in sorted order.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[]],true);
				_ms.assoc(built,[[1,2,3]],true);
				_ms.assoc(built,[[3,2,1]],false);
				_ms.assoc(built,[[`six`,`five`,`seven`],_ms.unlazy(count)],true);
				return built
			};
			return _ms.set(function sorted_63(seq,sort_45by){
				_ms.checkContains(_ms.unlazy(Seq),seq,"seq");
				_ms.checkContains(_ms.sub(_ms.unlazy(Opt),Function),sort_45by,"sort-by");
				sort_45by=_ms.unlazy(opr)(sort_45by,_ms.unlazy(identity));
				return function(){
					const _=seq;
					if(_ms.bool(_ms.unlazy(empty_63)(_))){
						return true
					} else {
						let sb_45prev=sort_45by(_ms.unlazy(first)(_));
						return _ms.unlazy(all_63)(_ms.unlazy(tail)(_),function(em){
							const sb_45cur=sort_45by(em);
							return _ms.unlazy(returning)(_60_63(sb_45prev,sb_45cur),function(){
								sb_45prev=sb_45cur
							})
						})
					}
				}()
			},built)
		}();
		const sort=exports.sort=Method(function(){
			const built={};
			const doc=built.doc=`Puts the elements in sorted order.\nOrder is determined by calling \`compare\`.\nOptional \`sort-by\` determines an attribute of elements to be compared.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[[3,2,1]],[1,2,3]);
				_ms.assoc(built,[[`five`,`six`,`seven`],_ms.unlazy(count)],[`six`,`five`,`seven`]);
				return built
			};
			const args=built.args=function(){
				return 2
			}();
			const _default=built.default=function _default(_,sort_45by){
				sort_45by=_ms.unlazy(opr)(sort_45by,_ms.unlazy(identity));
				const sorted=_ms.unlazy(from_45stream)(_ms.unlazy(Array_33),_);
				sorted.sort(function(a,b){
					return compare(sort_45by(a),sort_45by(b))
				});
				return sorted
			};
			return _ms.setName(built,"sort")
		}());
		const name=exports.name=`compare`;
		exports.default=compare;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9jb21wYXJlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7RUFtQkEsY0FBUyxpQkFDTTs7R0FBZCxvQkFDQztHQVdELHNCQUFNOzs7RUFFUCwyQkFBSSxpQkFDTTs7R0FBVCxvQkFDQztHQVNELHNCQUFNO0dBQ04sMkNBQWE7R0FDYiw2QkFBVSxrQkFBQSxFQUFFLEVBQ0M7V0FBWixDQUFJLFNBQUssRUFBRSw2QkFBYSxFQUFFO0dBQUE7OztFQUU1QiwyQkFBSSxpQkFDTTs7R0FBVCxvQkFDQztHQUVELHNCQUFNO0dBQ04sNkJBQVUsa0JBQUEsT0FBTyxRQUNPO1dBQXZCLE9BQUksUUFBUSxPQUFPLFNBQVM7R0FBQTs7O0VBRTlCLCtCQUFLLGlCQUNNOztHQUFWLG9CQUFNO0dBQ04sc0JBQU07R0FDTiw2QkFBVSxrQkFBQSxPQUFPLFFBQ087V0FBdkIsVUFBSyxRQUFRLE9BQU8sU0FBUztHQUFBOzs7RUFHOUIseUNBQ007O0dBQUwsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixtQkFBUSxDQUFFLEdBQUksQ0FBRSxJQUFTO29CQUN6QixtQkFBUSxHQUFJLENBQUUsSUFBUzs7O2tCQUN2QixpQkFBQSxFQUFXLEVBQUUsRUFDQztzQkFEWjtXQUNGLE9BQUksRUFBRSxHQUFJLEVBQUU7R0FBQTs7RUFLZCxnQ0FDSTs7R0FBSCxvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsQ0FBRSxFQUFFLEVBQUUsSUFBUztvQkFDakIsQ0FBRSxDQUFFLEVBQUUsRUFBRSxJQUFTO29DQUVELFVBQUE7WUFBZixJQUFJO0lBQUE7OztrQkFDTCxhQUFBLEVBQ0c7O2dDQUFFLE9BQUksR0FBRzs7O0VBRWQsdUNBQ0s7O0dBQUosb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFFLENBQUUsb0JBQVc7b0JBQ2YsQ0FBRTs7O2tCQUNGLGdCQUFBLEVBQ0c7O1dBQUgsWUFBUTs7O0VBRVYsMkNBQ087O0dBQU4sb0JBQ0M7R0FFRCxzQkFDTyxlQUFBOztvQkFBTixDQUFFLENBQUcsT0FBTyxNQUFNLDRCQUFxQjtvQ0FFdkIsVUFBQTtZQUFmLFNBQU87Ozs7a0JBQ1Isa0JBQUEsRUFBSSxHQUNXOztzQkFEUjtnQ0FDRCxZQUFRLEVBQUUsSUFBSzs7O0VBRXZCLCtDQUNROztHQUFQLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxDQUFFLHlDQUFvQjtvQkFDeEIsQ0FBRTs7O2tCQUNGLHFCQUFBLEVBQUksR0FDVzs7c0JBRFI7eUNBQ00sZ0NBQ0M7S0FBYixnQ0FBZTtLQUNmLFlBQVE7S0FDUixjQUFZO0tBQ1osbUJBQWUsR0FBRztLQUVkLE9BQUE7TUFBSCxZQUFhO01BRVIsWUFBSixNQUNJO09BQUg7TUFBQSxPQUVHO09BQUgsaUJBQVcsR0FBRztPQUNkLEdBQUksT0FBRyxlQUFXLFlBQ1E7a0JBQWQ7dUJBQ0c7T0FBQTtNQUFBO0tBQUE7WUFDbEI7SUFBQTtHQUFBOztFQUdILDZDQUNROztHQUFQLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxJQUFTO29CQUNYLENBQUUsQ0FBRSxFQUFFLEVBQUUsSUFBUztvQkFDakIsQ0FBRSxDQUFFLEVBQUUsRUFBRSxJQUFTO29CQUNqQixDQUFFLENBQUcsTUFBTSxPQUFPLDRCQUFvQjs7O2tCQUN0QyxtQkFBQSxJQUFRLFVBQ3FCOzs4Q0FEVDs4QkFDTDs7S0FDVixRQUFBO0tBQ0osaUNBQU0sSUFDQzthQUFOO0tBQUEsT0FFRztNQUFILGNBQVksNEJBQWE7aURBQ2hCLEdBQUcsU0FBQSxHQUNFO09BQWIsZUFBUyxVQUFRO29DQUNOLE9BQUcsVUFBUSxVQUNVLFVBQUE7a0JBQXBCO09BQUE7TUFBQTtLQUFBO0lBQUE7R0FBQTs7RUFFakIsd0JBQU0saUJBQ007O0dBQVgsb0JBQ0M7R0FHRCxzQkFDTyxlQUFBOztvQkFBTixDQUFFLENBQUUsRUFBRSxFQUFFLElBQVMsQ0FBRSxFQUFFLEVBQUU7b0JBQ3ZCLENBQUUsQ0FBRyxPQUFPLE1BQU0sNEJBQW9CLENBQUcsTUFBTSxPQUFPOzs7R0FDdkQsZ0NBQ0s7V0FBSjtHQUFBO0dBR0QsNkJBQVUsa0JBQUEsRUFBRSxVQUNPOzhCQUFIO0lBRWYsNERBQTRCO0lBQzVCLFlBQWEsU0FBQSxFQUFFLEVBQ0M7WUFBZixRQUFTLFVBQVEsR0FBSSxVQUFRO0lBQUE7V0FDOUI7R0FBQTs7O0VBdEtILHdCQUFBO2tCQW1CQSIsImZpbGUiOiJjb21wYXJlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=