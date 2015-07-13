"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./js","./Type/Method","./at/at","./at/at-Type","./at/q","./at/Seq/Arraybang","./at/Seq/Seq","./control","./Function","./Object","./Type/Pred-Type","./bang","./at/at","./at/q","./at/at-Type","./Try"],function(exports,js_0,Method_1,_64_2,_64_45Type_3,_63_4,Array_33_5,Seq_6,control_7,Function_8,Object_9,Pred_45Type_10,_33_11,_64_12,_63_13,_64_45Type_14,Try_15){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(js_0),id_61_63=_ms.get(_$2,"id=?"),Method=_ms.getDefaultExport(Method_1),_64=_ms.lazy(function(){
			return _ms.getDefaultExport(_64_2)
		}),_$5=_ms.lazyGetModule(_64_2),all_63=_ms.lazyProp(_$5,"all?"),empty_63=_ms.lazyProp(_$5,"empty?"),iterator=_ms.lazyProp(_$5,"iterator"),_$6=_ms.lazyGetModule(_64_45Type_3),from_45stream=_ms.lazyProp(_$6,"from-stream"),_$7=_ms.lazyGetModule(_63_4),un_45_63=_ms.lazyProp(_$7,"un-?"),Array_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Array_33_5)
		}),Seq=_ms.lazy(function(){
			return _ms.getDefaultExport(Seq_6)
		}),_$9=_ms.lazyGetModule(Seq_6),first=_ms.lazyProp(_$9,"first"),tail=_ms.lazyProp(_$9,"tail"),_$10=_ms.lazyGetModule(control_7),opr=_ms.lazyProp(_$10,"opr"),returning=_ms.lazyProp(_$10,"returning"),_$11=_ms.lazyGetModule(Function_8),identity=_ms.lazyProp(_$11,"identity"),_$12=_ms.lazyGetModule(Object_9),object_61_63=_ms.lazyProp(_$12,"object=?"),_$13=_ms.lazyGetModule(Pred_45Type_10),Opt=_ms.lazyProp(_$13,"Opt"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_11)
		}),_$16=_ms.lazyGetModule(_64_12),count=_ms.lazyProp(_$16,"count"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_13)
		}),_$18=_ms.lazyGetModule(_64_45Type_14),empty=_ms.lazyProp(_$18,"empty"),_$19=_ms.lazyGetModule(Try_15),fails_63=_ms.lazyProp(_$19,"fails?");
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
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
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
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
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
						const _$119=iter.next(),value=_$119.value,done=_$119.done;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9jb21wYXJlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztFQW9CQSxjQUFTLGlCQUNNOztHQUFkLG9CQUNDO0dBV0Qsc0JBQU07OztFQUVQLDJCQUFJLGlCQUNNOztHQUFULG9CQUNDO0dBU0Qsc0JBQU07R0FDTiwyQ0FBYTtHQUNiLDZCQUFVLGtCQUFBLEVBQUUsRUFDQztXQUFaLENBQUksU0FBSyxFQUFFLDZCQUFhLEVBQUU7R0FBQTs7O0VBRTVCLDJCQUFJLGlCQUNNOztHQUFULG9CQUNDO0dBRUQsc0JBQU07R0FDTiw2QkFBVSxrQkFBQSxPQUFPLFFBQ087V0FBdkIsT0FBSSxRQUFRLE9BQU8sU0FBUztHQUFBOzs7RUFFOUIsK0JBQUssaUJBQ007O0dBQVYsb0JBQU07R0FDTixzQkFBTTtHQUNOLDZCQUFVLGtCQUFBLE9BQU8sUUFDTztXQUF2QixVQUFLLFFBQVEsT0FBTyxTQUFTO0dBQUE7OztFQUc5Qix5Q0FDTTs7R0FBTCxvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLG1CQUFRLENBQUUsR0FBSSxDQUFFLElBQVM7b0JBQ3pCLG1CQUFRLEdBQUksQ0FBRSxJQUFTOzs7a0JBQ3ZCLGlCQUFBLEVBQVcsRUFBRSxFQUNDO3NCQURaO1dBQ0YsT0FBSSxFQUFFLEdBQUksRUFBRTtHQUFBOztFQUtkLGdDQUNJOztHQUFILG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxDQUFFLEVBQUUsRUFBRSxJQUFTO29CQUNqQixDQUFFLENBQUUsRUFBRSxFQUFFLElBQVM7eUNBRVAsVUFBQTtZQUFULElBQUk7SUFBQTs7O2tCQUNMLGFBQUEsRUFDRzs7Z0NBQUUsT0FBSSxHQUFHOzs7RUFFZCx1Q0FDSzs7R0FBSixvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsQ0FBRSxvQkFBVztvQkFDZixDQUFFOzs7a0JBQ0YsZ0JBQUEsRUFDRzs7V0FBSCxZQUFROzs7RUFFViwyQ0FDTzs7R0FBTixvQkFDQztHQUVELHNCQUNPLGVBQUE7O29CQUFOLENBQUUsQ0FBRyxPQUFPLE1BQU0sNEJBQXFCO3lDQUU3QixVQUFBO1lBQVQsU0FBTzs7OztrQkFDUixrQkFBQSxFQUFJLEdBQ1c7O3NCQURSO2dDQUNELFlBQVEsRUFBRSxJQUFLOzs7RUFFdkIsK0NBQ1E7O0dBQVAsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFFLENBQUUseUNBQW9CO29CQUN4QixDQUFFOzs7a0JBQ0YscUJBQUEsRUFBSSxHQUNXOztzQkFEUjt5Q0FDTSxnQ0FDQztLQUFiLGdDQUFlO0tBQ2YsWUFBUTtLQUNSLGNBQVk7S0FDWixtQkFBZSxHQUFHO0tBRWQsT0FBQTtNQUFILFlBQWE7TUFFUixZQUFKLE1BQ0k7T0FBSDtNQUFBLE9BRUc7T0FBSCxpQkFBVyxHQUFHO09BQ2QsR0FBSSxPQUFHLGVBQVcsWUFDUTtrQkFBZDt1QkFDRztPQUFBO01BQUE7S0FBQTtZQUNsQjtJQUFBO0dBQUE7O0VBR0gsNkNBQ1E7O0dBQVAsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFFLElBQVM7b0JBQ1gsQ0FBRSxDQUFFLEVBQUUsRUFBRSxJQUFTO29CQUNqQixDQUFFLENBQUUsRUFBRSxFQUFFLElBQVM7b0JBQ2pCLENBQUUsQ0FBRyxNQUFNLE9BQU8sNEJBQW9COzs7a0JBQ3RDLG1CQUFBLElBQVEsVUFDcUI7OzhDQURUOzhCQUNMOztLQUNWLFFBQUE7S0FDSixpQ0FBTSxJQUNDO2FBQU47S0FBQSxPQUVHO01BQUgsY0FBWSw0QkFBYTtpREFDaEIsR0FBRyxTQUFBLEdBQ0U7T0FBYixlQUFTLFVBQVE7b0NBQ04sT0FBRyxVQUFRLFVBQ1UsVUFBQTtrQkFBcEI7T0FBQTtNQUFBO0tBQUE7SUFBQTtHQUFBOztFQUVqQix3QkFBTSxpQkFDTTs7R0FBWCxvQkFDQztHQUdELHNCQUNPLGVBQUE7O29CQUFOLENBQUUsQ0FBRSxFQUFFLEVBQUUsSUFBUyxDQUFFLEVBQUUsRUFBRTtvQkFDdkIsQ0FBRSxDQUFHLE9BQU8sTUFBTSw0QkFBb0IsQ0FBRyxNQUFNLE9BQU87OztHQUN2RCxnQ0FDSztXQUFKO0dBQUE7R0FHRCw2QkFBVSxrQkFBQSxFQUFFLFVBQ087OEJBQUg7SUFFZiw0REFBNEI7SUFDNUIsWUFBYSxTQUFBLEVBQUUsRUFDQztZQUFmLFFBQVMsVUFBUSxHQUFJLFVBQVE7SUFBQTtXQUM5QjtHQUFBOzs7RUF2S0gsd0JBQUE7a0JBb0JBIiwiZmlsZSI6ImNvbXBhcmUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==