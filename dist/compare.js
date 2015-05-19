"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Boolean","./js","./Type/Method","./at/at","./at/at-Type","./at/q","./at/Seq/Arraybang","./at/Seq/Seq","./control","./Function","./Object","./Type/Pred-Type","./bang","./at/at","./at/q","./at/at-Type","./Try"],function(exports,Boolean_0,js_1,Method_2,_64_3,_64_45Type_4,_63_5,Array_33_6,Seq_7,control_8,Function_9,Object_10,Pred_45Type_11,_33_12,_64_13,_63_14,_64_45Type_15,Try_16){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),not=_$2.not,or=_$2.or,_$3=_ms.getModule(js_1),id_61_63=_$3["id=?"],Method=_ms.getDefaultExport(Method_2),_64=_ms.lazy(function(){
			return _ms.getDefaultExport(_64_3)
		}),_$6=_ms.lazyGetModule(_64_3),all_63=_ms.lazyProp(_$6,"all?"),empty_63=_ms.lazyProp(_$6,"empty?"),iterator=_ms.lazyProp(_$6,"iterator"),_$7=_ms.lazyGetModule(_64_45Type_4),from_45stream=_ms.lazyProp(_$7,"from-stream"),_$8=_ms.lazyGetModule(_63_5),un_45_63=_ms.lazyProp(_$8,"un-?"),Array_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Array_33_6)
		}),Seq=_ms.lazy(function(){
			return _ms.getDefaultExport(Seq_7)
		}),_$10=_ms.lazyGetModule(Seq_7),first=_ms.lazyProp(_$10,"first"),tail=_ms.lazyProp(_$10,"tail"),_$11=_ms.lazyGetModule(control_8),_if=_ms.lazyProp(_$11,"if"),opr=_ms.lazyProp(_$11,"opr"),returning=_ms.lazyProp(_$11,"returning"),_$12=_ms.lazyGetModule(Function_9),identity=_ms.lazyProp(_$12,"identity"),_$13=_ms.lazyGetModule(Object_10),object_61_63=_ms.lazyProp(_$13,"object=?"),_$14=_ms.lazyGetModule(Pred_45Type_11),Opt=_ms.lazyProp(_$14,"Opt"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_12)
		}),_$17=_ms.lazyGetModule(_64_13),count=_ms.lazyProp(_$17,"count"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_14)
		}),_$19=_ms.lazyGetModule(_64_45Type_15),empty=_ms.lazyProp(_$19,"empty"),_$20=_ms.lazyGetModule(Try_16),fails_63=_ms.lazyProp(_$20,"fails?");
		const compare=Method(function(){
			const doc="A Number < 0 if a < b, > 0 if a > b, and = 0 if a = b.\nIt could be implemented as:\n\tcase\n\t\t<? a b\n\t\t\t-1\n\t\t>? a b\n\t\t\t1\n\t\telse\n\t\t\t0\nBut instead, other comparison operators are defined in terms of this.\n`compare a b` should always be `* -1 (compare b a)`.";
			const args=2;
			return {
				doc:doc,
				args:args,
				name:"compare"
			}
		}());
		const _61_63=exports["=?"]=Method(function(){
			const doc="Whether two objects are considered equivalent.\nGenerally, if two values are `=?`, then most Functions called on them should return the same results.\n`=?` defaults to `object=?`.\nValues can be `=?` but not `object=?` if they are conceptually the same, but have different representations.\nFor example, two Sets with the same values might internally have different ordering.\n\nValues of different types should generally not be =?.\nFor example, [ 1 2 3 ] is not `=?` (=> Stream [ 1 2 3 ]), but it is `seq=?`.\nUnlike other comparison methods, `=?` should not make assertions about type.";
			const args=2;
			const allow_45null_63=true;
			const _default=function _default(a,b){
				return or(id_61_63(a,b),_ms.lazy(function(){
					return _ms.unlazy(object_61_63)(a,b)
				}))
			};
			return {
				doc:doc,
				args:args,
				"allow-null?":allow_45null_63,
				default:_default,
				name:"=?"
			}
		}());
		const _60_63=exports["<?"]=Method(function(){
			const doc="Whether `lesser` comes before `greater` in these values' ordering.\nSame as `not  (>=? lesser greater)`.";
			const args=2;
			const _default=function _default(lesser,greater){
				return _60_63(compare(lesser,greater),0)
			};
			return {
				doc:doc,
				args:args,
				default:_default,
				name:"<?"
			}
		}());
		const _60_61_63=exports["<=?"]=Method(function(){
			const doc="<? or =?.";
			const args=2;
			const _default=function _default(lesser,greater){
				return _60_61_63(compare(lesser,greater),0)
			};
			return {
				doc:doc,
				args:args,
				default:_default,
				name:"<=?"
			}
		}());
		const same_63=exports["same?"]=function(){
			const doc="Whether two values have the same `f`.";
			return _ms.set(function same_63(f,a,b){
				return _61_63(f(a),f(b))
			},"doc",doc)
		}();
		const max=exports.max=function(){
			const doc="An element that is >=? all others. Fails when empty.";
			return _ms.set(function max(_){
				return _ms.unlazy(un_45_63)(_63max(_),"Can not take max of empty.")
			},"doc",doc)
		}();
		const _63max=exports["?max"]=function(){
			const doc="Like max, but returns empty ? for empty.";
			return _ms.set(function _63max(_){
				return _63max_45by(_,_ms.unlazy(identity))
			},"doc",doc)
		}();
		const max_45by=exports["max-by"]=function(){
			const doc="An element whose `by em` is >=? all other elements' `by em`s.\nLike `max (map _ by)` except the mapping is not applied to the result.";
			return _ms.set(function max_45by(_,by){
				return _ms.unlazy(un_45_63)(_63max_45by(_,by),"Can not take max of empty.")
			},"doc",doc)
		}();
		const _63max_45by=exports["?max-by"]=function(){
			const doc="Like max-by, but returns empty ? for empty.";
			return _ms.set(function _63max_45by(_,by){
				return _ms.unlazy(_if)(not(_ms.unlazy(empty_63)(_)),_ms.lazy(function(){
					return function(){
						const iter=_ms.unlazy(iterator)(_);
						const value=iter.next().value;
						let cur_45max=value;
						let cur_45max_45by=by(value);
						while(true){
							const _$120=iter.next(),value=_$120.value,done=_$120.done;
							if(done){
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
					}()
				}))
			},"doc",doc)
		}();
		const sorted_63=exports["sorted?"]=function(){
			const doc="Whether it is already in sorted order.";
			return _ms.set(function sorted_63(seq,sort_45by){
				sort_45by=_ms.unlazy(opr)(sort_45by,_ms.unlazy(identity));
				return function(){
					const _=seq;
					if(_ms.unlazy(empty_63)(_)){
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
			},"doc",doc)
		}();
		const sort=exports.sort=Method(function(){
			const doc="Puts the elements in sorted order.\nOrder is determined by calling `compare`.\nOptional `sort-by` determines an attribute of elements to be compared.";
			const args=function(){
				return 2
			}();
			const _default=function _default(_,sort_45by){
				sort_45by=_ms.unlazy(opr)(sort_45by,_ms.unlazy(identity));
				const sorted=_ms.unlazy(from_45stream)(_ms.unlazy(Array_33),_);
				sorted.sort(function(a,b){
					return compare(sort_45by(a),sort_45by(b))
				});
				return sorted
			};
			return {
				doc:doc,
				args:args,
				default:_default,
				name:"sort"
			}
		}());
		const name=exports.name="compare";
		exports.default=compare;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9jb21wYXJlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztFQXFCQSxjQUFVLGlCQUNNO0dBQWYsVUFDQztHQVdELFdBQU07Ozs7Ozs7RUFFUCwyQkFBSSxpQkFDTTtHQUFULFVBQ0M7R0FTRCxXQUFNO0dBQ04sc0JBQWE7R0FDYixlQUFVLGtCQUFTLEVBQUUsRUFDQztXQUFyQixHQUFJLFNBQUssRUFBRTtxQ0FBYyxFQUFFO0lBQUE7R0FBQTs7Ozs7Ozs7O0VBRTdCLDJCQUFJLGlCQUNNO0dBQVQsVUFDQztHQUVELFdBQU07R0FDTixlQUFVLGtCQUFTLE9BQU8sUUFDTztXQUFoQyxPQUFJLFFBQVEsT0FBTyxTQUFTO0dBQUE7Ozs7Ozs7O0VBRTlCLCtCQUFLLGlCQUNNO0dBQVYsVUFBTTtHQUNOLFdBQU07R0FDTixlQUFVLGtCQUFTLE9BQU8sUUFDTztXQUFoQyxVQUFLLFFBQVEsT0FBTyxTQUFTO0dBQUE7Ozs7Ozs7O0VBRzlCLHlDQUNNO0dBQUwsVUFBTTtrQkFJTCxpQkFBQSxFQUFXLEVBQUUsRUFDQztXQUFkLE9BQUksRUFBRSxHQUFJLEVBQUU7R0FBQTs7RUFLZCxnQ0FDSTtHQUFILFVBQU07a0JBTUwsYUFBQSxFQUNHO2dDQUFFLE9BQUEsR0FBTztHQUFBOztFQUVkLHVDQUNLO0dBQUosVUFBTTtrQkFJTCxnQkFBQSxFQUNHO1dBQUgsWUFBUTs7O0VBRVYsMkNBQ087R0FBTixVQUNDO2tCQU1BLGtCQUFBLEVBQUksR0FDVztnQ0FBVCxZQUFRLEVBQUUsSUFBSztHQUFBOztFQUV2QiwrQ0FDUTtHQUFQLFVBQU07a0JBSUwscUJBQUEsRUFBSSxHQUNXOzJCQUFYLHlCQUFJO3NCQUNVO01BQWpCLGdDQUFPO01BQ1AsWUFBUTtNQUNSLGNBQVk7TUFDWixtQkFBZSxHQUFHO01BRWQsV0FBQTtPQUFILFlBQWE7T0FFUixHQUFKLEtBQ0k7UUFBSDtPQUFBLE9BRUc7UUFBSCxpQkFBVyxHQUFHO1FBQ2QsR0FBSSxPQUFHLGVBQVcsWUFDUTttQkFBZDt3QkFDRztRQUFBO09BQUE7TUFBQTthQUNsQjtLQUFBO0lBQUE7R0FBQTs7RUFHSCw2Q0FDUTtHQUFQLFVBQU07a0JBTUwsbUJBQUEsSUFBUSxVQUNxQjs4QkFBZDs7S0FDVixRQUFBO0tBQ0osd0JBQUEsR0FDTzthQUFOO0tBQUEsT0FFRztNQUFILGNBQVksNEJBQVE7aURBQ2YsR0FBTyxTQUFBLEdBQ0U7T0FBYixlQUFTLFVBQVE7b0NBQ04sT0FBRyxVQUFRLFVBQ1MsVUFBQTtrQkFBbkI7T0FBQTtNQUFBO0tBQUE7SUFBQTtHQUFBOztFQUVqQix3QkFBTSxpQkFDTTtHQUFYLFVBQ0M7R0FNRCxxQkFDSztXQUFKO0dBQUE7R0FHRCxlQUFVLGtCQUFBLEVBQUUsVUFDTzs4QkFBSDtJQUVmLDREQUE0QjtJQUM1QixZQUFhLFNBQUEsRUFBRSxFQUNDO1lBQWYsUUFBUyxVQUFRLEdBQUksVUFBUTtJQUFBO1dBQzlCO0dBQUE7Ozs7Ozs7O0VBeEtILHdCQUFBO2tCQTBLQSIsImZpbGUiOiJjb21wYXJlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=