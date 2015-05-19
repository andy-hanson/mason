"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Boolean","./js","./Type/Method","./at/at","./at/at-Type","./at/q","./at/Seq/Arraybang","./at/Seq/Seq","./control","./Function","./Object","./Type/Pred-Type","./bang","./at/at","./at/q","./at/at-Type","./Try"],function(exports,Boolean_0,js_1,Method_2,_64_3,_64_45Type_4,_63_5,Array_33_6,Seq_7,control_8,Function_9,Object_10,Pred_45Type_11,_33_12,_64_13,_63_14,_64_45Type_15,Try_16){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),not=_ms.get(_$2,"not"),or=_ms.get(_$2,"or"),_$3=_ms.getModule(js_1),id_61_63=_ms.get(_$3,"id=?"),Method=_ms.getDefaultExport(Method_2),_64=_ms.lazy(function(){
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
				return _ms.checkContains(Boolean,or(id_61_63(a,b),_ms.lazy(function(){
					return _ms.unlazy(object_61_63)(a,b)
				})),"res")
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
				return _ms.checkContains(Boolean,_60_63(compare(lesser,greater),0),"res")
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
				return _ms.checkContains(Boolean,_60_61_63(compare(lesser,greater),0),"res")
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
			const test=function test(){
				const _k0=[_ms.unlazy(count),[1],[2]],_v0=true;
				const _k1=[_ms.unlazy(count),[],[1]],_v1=false;
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function same_63(f,a,b){
				_ms.checkContains(Function,f,"f");
				return _61_63(f(a),f(b))
			},"doc",doc,"test",test)
		}();
		const max=exports.max=function(){
			const doc="An element that is >=? all others. Fails when empty.";
			const test=function test(){
				const _k0=[[1,3,2]],_v0=3;
				const _k1=[[2,1,2]],_v1=2;
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return max([])
				});
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function max(_){
				_ms.checkContains(_ms.unlazy(_64),_,"_");
				return _ms.unlazy(un_45_63)(_63max(_),"Can not take max of empty.")
			},"doc",doc,"test",test)
		}();
		const _63max=exports["?max"]=function(){
			const doc="Like max, but returns empty ? for empty.";
			const test=function test(){
				const _k0=[[1]],_v0=_ms.unlazy(_63)(1);
				const _k1=[[]],_v1=_ms.unlazy(empty)(_ms.unlazy(_63));
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function _63max(_){
				_ms.checkContains(_ms.unlazy(_64),_,"_");
				return _63max_45by(_,_ms.unlazy(identity))
			},"doc",doc,"test",test)
		}();
		const max_45by=exports["max-by"]=function(){
			const doc="An element whose `by em` is >=? all other elements' `by em`s.\nLike `max (map _ by)` except the mapping is not applied to the result.";
			const test=function test(){
				const _k0=[["five","six","seven"],_ms.unlazy(count)],_v0="seven";
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return max_45by([],_ms.unlazy(identity))
				});
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function max_45by(_,by){
				_ms.checkContains(_ms.unlazy(_64),_,"_");
				_ms.checkContains(Function,by,"by");
				return _ms.unlazy(un_45_63)(_63max_45by(_,by),"Can not take max of empty.")
			},"doc",doc,"test",test)
		}();
		const _63max_45by=exports["?max-by"]=function(){
			const doc="Like max-by, but returns empty ? for empty.";
			const test=function test(){
				const _k0=[[1],_ms.unlazy(identity)],_v0=_ms.unlazy(_63)(1);
				const _k1=[[],_ms.unlazy(identity)],_v1=_ms.unlazy(empty)(_ms.unlazy(_63));
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function _63max_45by(_,by){
				_ms.checkContains(_ms.unlazy(_64),_,"_");
				_ms.checkContains(Function,by,"by");
				return _ms.unlazy(_if)(not(_ms.unlazy(empty_63)(_)),_ms.lazy(function(){
					return function(){
						const iter=_ms.unlazy(iterator)(_);
						const value=iter.next().value;
						let cur_45max=value;
						let cur_45max_45by=by(value);
						loop119:while(true){
							const _$120=iter.next(),value=_$120.value,done=_$120.done;
							if(_ms.bool(done)){
								break loop119
							} else {
								const value_45by=by(value);
								if(_ms.bool(_60_63(cur_45max_45by,value_45by))){
									cur_45max=value;
									cur_45max_45by=value_45by
								}
							}
						};
						return cur_45max
					}()
				}))
			},"doc",doc,"test",test)
		}();
		const sorted_63=exports["sorted?"]=function(){
			const doc="Whether it is already in sorted order.";
			const test=function test(){
				const _k0=[[]],_v0=true;
				const _k1=[[1,2,3]],_v1=true;
				const _k2=[[3,2,1]],_v2=false;
				const _k3=[["six","five","seven"],_ms.unlazy(count)],_v3=true;
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3)
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
			},"doc",doc,"test",test)
		}();
		const sort=exports.sort=Method(function(){
			const doc="Puts the elements in sorted order.\nOrder is determined by calling `compare`.\nOptional `sort-by` determines an attribute of elements to be compared.";
			const test=function test(){
				const _k0=[[3,2,1]],_v0=[1,2,3];
				const _k1=[["five","six","seven"],_ms.unlazy(count)],_v1=["six","five","seven"];
				return _ms.map(_k0,_v0,_k1,_v1)
			};
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
				test:test,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9jb21wYXJlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztFQXFCQSxjQUFVLGlCQUNNO0dBQWYsVUFDQztHQVdELFdBQU07Ozs7Ozs7RUFFUCwyQkFBSSxpQkFDTTtHQUFULFVBQ0M7R0FTRCxXQUFNO0dBQ04sc0JBQWE7R0FDYixlQUFVLGtCQUFTLEVBQUUsRUFDQzs2QkFEWCxRQUNWLEdBQUksU0FBSyxFQUFFO3FDQUFjLEVBQUU7SUFBQTs7Ozs7Ozs7OztFQUU3QiwyQkFBSSxpQkFDTTtHQUFULFVBQ0M7R0FFRCxXQUFNO0dBQ04sZUFBVSxrQkFBUyxPQUFPLFFBQ087NkJBRHRCLFFBQ1YsT0FBSSxRQUFRLE9BQU8sU0FBUzs7Ozs7Ozs7O0VBRTlCLCtCQUFLLGlCQUNNO0dBQVYsVUFBTTtHQUNOLFdBQU07R0FDTixlQUFVLGtCQUFTLE9BQU8sUUFDTzs2QkFEdEIsUUFDVixVQUFLLFFBQVEsT0FBTyxTQUFTOzs7Ozs7Ozs7RUFHOUIseUNBQ007R0FBTCxVQUFNO0dBQ04sV0FDTyxlQUFBO0lBQU4sVUFBQSxtQkFBUSxDQUFFLEdBQUksQ0FBRSxRQUFTO0lBQ3pCLFVBQUEsbUJBQVEsR0FBSSxDQUFFLFFBQVM7OztrQkFDdkIsaUJBQUEsRUFBVyxFQUFFLEVBQ0M7c0JBRFo7V0FDRixPQUFJLEVBQUUsR0FBSSxFQUFFO0dBQUE7O0VBS2QsZ0NBQ0k7R0FBSCxVQUFNO0dBQ04sV0FDTyxlQUFBO0lBQU4sVUFBQSxDQUFFLENBQUUsRUFBRSxFQUFFLFFBQVM7SUFDakIsVUFBQSxDQUFFLENBQUUsRUFBRSxFQUFFLFFBQVM7eUNBRVAsVUFBQTtZQUFULElBQUk7SUFBQTs7O2tCQUNMLGFBQUEsRUFDRzs7Z0NBQUUsT0FBQSxHQUFPO0dBQUE7O0VBRWQsdUNBQ0s7R0FBSixVQUFNO0dBQ04sV0FDTyxlQUFBO0lBQU4sVUFBQSxDQUFFLENBQUUsd0JBQVc7SUFDZixVQUFBLENBQUU7OztrQkFDRixnQkFBQSxFQUNHOztXQUFILFlBQVE7OztFQUVWLDJDQUNPO0dBQU4sVUFDQztHQUVELFdBQ08sZUFBQTtJQUFOLFVBQUEsQ0FBRSxDQUFHLE9BQU8sTUFBTSxnQ0FBcUI7eUNBRTdCLFVBQUE7WUFBVCxTQUFPOzs7O2tCQUNSLGtCQUFBLEVBQUksR0FDVzs7c0JBRFI7Z0NBQ0QsWUFBUSxFQUFFLElBQUs7R0FBQTs7RUFFdkIsK0NBQ1E7R0FBUCxVQUFNO0dBQ04sV0FDTyxlQUFBO0lBQU4sVUFBQSxDQUFFLENBQUUsNkNBQW9CO0lBQ3hCLFVBQUEsQ0FBRTs7O2tCQUNGLHFCQUFBLEVBQUksR0FDVzs7c0JBRFI7MkJBQ0gseUJBQUk7c0JBQ1U7TUFBakIsZ0NBQU87TUFDUCxZQUFRO01BQ1IsY0FBWTtNQUNaLG1CQUFlLEdBQUc7eUJBRWI7T0FBSixZQUFhO09BRVIsWUFBSixNQUNJO1FBQUg7Y0FFRztRQUFILGlCQUFXLEdBQUc7UUFDZCxZQUFJLE9BQUcsZUFBVyxhQUNRO21CQUFkO3dCQUNHO1FBQUE7T0FBQTtNQUFBO2FBQ2xCO0tBQUE7SUFBQTtHQUFBOztFQUdILDZDQUNRO0dBQVAsVUFBTTtHQUNOLFdBQ08sZUFBQTtJQUFOLFVBQUEsQ0FBRSxRQUFTO0lBQ1gsVUFBQSxDQUFFLENBQUUsRUFBRSxFQUFFLFFBQVM7SUFDakIsVUFBQSxDQUFFLENBQUUsRUFBRSxFQUFFLFFBQVM7SUFDakIsVUFBQSxDQUFFLENBQUcsTUFBTSxPQUFPLGdDQUFvQjs7O2tCQUN0QyxtQkFBQSxJQUFRLFVBQ3FCOzs4Q0FEVDs4QkFDTDs7S0FDVixRQUFBO0tBQ0osaUNBQUEsSUFDTzthQUFOO0tBQUEsT0FFRztNQUFILGNBQVksNEJBQVE7aURBQ2YsR0FBTyxTQUFBLEdBQ0U7T0FBYixlQUFTLFVBQVE7b0NBQ04sT0FBRyxVQUFRLFVBQ1MsVUFBQTtrQkFBbkI7T0FBQTtNQUFBO0tBQUE7SUFBQTtHQUFBOztFQUVqQix3QkFBTSxpQkFDTTtHQUFYLFVBQ0M7R0FHRCxXQUNPLGVBQUE7SUFBTixVQUFBLENBQUUsQ0FBRSxFQUFFLEVBQUUsUUFBUyxDQUFFLEVBQUUsRUFBRTtJQUN2QixVQUFBLENBQUUsQ0FBRyxPQUFPLE1BQU0sZ0NBQW9CLENBQUcsTUFBTSxPQUFPOzs7R0FDdkQscUJBQ0s7V0FBSjtHQUFBO0dBR0QsZUFBVSxrQkFBQSxFQUFFLFVBQ087OEJBQUg7SUFFZiw0REFBNEI7SUFDNUIsWUFBYSxTQUFBLEVBQUUsRUFDQztZQUFmLFFBQVMsVUFBUSxHQUFJLFVBQVE7SUFBQTtXQUM5QjtHQUFBOzs7Ozs7Ozs7RUF4S0gsd0JBQUE7a0JBMEtBIiwiZmlsZSI6ImNvbXBhcmUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==