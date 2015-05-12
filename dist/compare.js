"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./Bool","./js","./Type/Method","./at/at","./at/at-Type","./at/q","./at/Seq/Arraybang","./at/Seq/Seq","./control","./Fun","./Obj","./Type/Pred-Type","./bang","./at/at","./at/q","./at/at-Type","./Try"],function(exports,Bool_0,js_1,Method_2,_64_3,_64_45Type_4,_63_5,Array_33_6,Seq_7,control_8,Fun_9,Obj_10,Pred_45Type_11,_33_12,_64_13,_63_14,_64_45Type_15,Try_16){
	exports._get=_ms.lazy(function(){
		const Bool=_ms.getDefaultExport(Bool_0),_$2=_ms.getModule(Bool_0),not=_ms.get(_$2,"not"),or=_ms.get(_$2,"or"),_$3=_ms.getModule(js_1),id_61_63=_ms.get(_$3,"id=?"),Method=_ms.getDefaultExport(Method_2),_64=_ms.lazy(function(){
			return _ms.getDefaultExport(_64_3)
		}),_$6=_ms.lazyGetModule(_64_3),all_63=_ms.lazyProp(_$6,"all?"),empty_63=_ms.lazyProp(_$6,"empty?"),iterator=_ms.lazyProp(_$6,"iterator"),_$7=_ms.lazyGetModule(_64_45Type_4),from_45stream=_ms.lazyProp(_$7,"from-stream"),_$8=_ms.lazyGetModule(_63_5),un_45_63=_ms.lazyProp(_$8,"un-?"),Array_33=_ms.lazy(function(){
			return _ms.getDefaultExport(Array_33_6)
		}),Seq=_ms.lazy(function(){
			return _ms.getDefaultExport(Seq_7)
		}),_$10=_ms.lazyGetModule(Seq_7),first=_ms.lazyProp(_$10,"first"),tail=_ms.lazyProp(_$10,"tail"),_$11=_ms.lazyGetModule(control_8),_if=_ms.lazyProp(_$11,"if"),if_33=_ms.lazyProp(_$11,"if!"),opr=_ms.lazyProp(_$11,"opr"),returning=_ms.lazyProp(_$11,"returning"),Ref_33=_ms.lazyProp(_$11,"Ref!"),get=_ms.lazyProp(_$11,"get"),set_33=_ms.lazyProp(_$11,"set!"),Fun=_ms.lazy(function(){
			return _ms.getDefaultExport(Fun_9)
		}),_$12=_ms.lazyGetModule(Fun_9),identity=_ms.lazyProp(_$12,"identity"),_$13=_ms.lazyGetModule(Obj_10),obj_61_63=_ms.lazyProp(_$13,"obj=?"),_$14=_ms.lazyGetModule(Pred_45Type_11),Opt=_ms.lazyProp(_$14,"Opt"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_12)
		}),_$17=_ms.lazyGetModule(_64_13),count=_ms.lazyProp(_$17,"count"),_63=_ms.lazy(function(){
			return _ms.getDefaultExport(_63_14)
		}),_$19=_ms.lazyGetModule(_64_45Type_15),empty=_ms.lazyProp(_$19,"empty"),_$20=_ms.lazyGetModule(Try_16),fails_63=_ms.lazyProp(_$20,"fails?");
		const compare=Method(function(){
			const doc="A Num < 0 if a < b, > 0 if a > b, and = 0 if a = b.\nIt could be implemented as:\n\tcase\n\t\t<? a b\n\t\t\t-1\n\t\t>? a b\n\t\t\t1\n\t\telse\n\t\t\t0\nBut instead, other comparison operators are defined in terms of this.\n`compare a b` should always be `* -1 (compare b a)`.";
			return {
				doc:doc,
				displayName:"compare"
			}
		}());
		const _61_63=exports["=?"]=Method(function(){
			const doc="Whether two objects are considered equivalent.\nGenerally, if two values are `=?`, then most functions called on them should return the same results.\n`=?` defaults to `obj=?`.\nValues can be `=?` but not `obj=?` if they are conceptually the same, but have different representations.\nFor example, two Sets with the same values might internally have different ordering.\n\nValues of different types should generally not be =?.\nFor example, [ 1 2 3 ] is not `=?` (=> Stream [ 1 2 3 ]), but it is `seq=?`.\nUnlike other comparison methods, `=?` should not make assertions about type.";
			const _default=_ms.set(function(a,b){
				return _ms.checkContains(Bool,or(id_61_63(a,b),_ms.lazy(function(){
					return _ms.unlazy(obj_61_63)(a,b)
				})),"res")
			},"displayName","default");
			return {
				doc:doc,
				default:_default,
				displayName:"=?"
			}
		}());
		const _60_63=exports["<?"]=Method(function(){
			const doc="Whether `lesser` comes before `greater` in these values' ordering.\nSame as `not  (>=? lesser greater)`.";
			const _default=_ms.set(function(lesser,greater){
				return _ms.checkContains(Bool,_60_63(compare(lesser,greater),0),"res")
			},"displayName","default");
			return {
				doc:doc,
				default:_default,
				displayName:"<?"
			}
		}());
		const _60_61_63=exports["<=?"]=Method(function(){
			const doc="<? or =?.";
			const _default=_ms.set(function(lesser,greater){
				return _ms.checkContains(Bool,_60_61_63(compare(lesser,greater),0),"res")
			},"displayName","default");
			return {
				doc:doc,
				default:_default,
				displayName:"<=?"
			}
		}());
		const same_63=exports["same?"]=function(){
			const doc="Whether two values have the same `f`.";
			const test=_ms.set(function(){
				const _k0=[_ms.unlazy(count),[1],[2]],_v0=true;
				const _k1=[_ms.unlazy(count),[],[1]],_v1=false;
				return _ms.map(_k0,_v0,_k1,_v1)
			},"displayName","test");
			return _ms.set(function(f,a,b){
				_ms.checkContains(_ms.unlazy(Fun),f,"f");
				return _61_63(f(a),f(b))
			},"doc",doc,"test",test,"displayName","same?")
		}();
		const max=exports.max=function(){
			const doc="An element that is >=? all others. Fails when empty.";
			const test=_ms.set(function(){
				const _k0=[[1,3,2]],_v0=3;
				const _k1=[[2,1,2]],_v1=2;
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return max([])
				});
				return _ms.map(_k0,_v0,_k1,_v1)
			},"displayName","test");
			return _ms.set(function(_){
				_ms.checkContains(_ms.unlazy(_64),_,"_");
				return _ms.unlazy(un_45_63)(_63max(_),"Can not take max of empty.")
			},"doc",doc,"test",test,"displayName","max")
		}();
		const _63max=exports["?max"]=function(){
			const doc="Like max, but returns empty ? for empty.";
			const test=_ms.set(function(){
				const _k0=[[1]],_v0=_ms.unlazy(_63)(1);
				const _k1=[[]],_v1=_ms.unlazy(empty)(_ms.unlazy(_63));
				return _ms.map(_k0,_v0,_k1,_v1)
			},"displayName","test");
			return _ms.set(function(_){
				_ms.checkContains(_ms.unlazy(_64),_,"_");
				return _63max_45by(_,_ms.unlazy(identity))
			},"doc",doc,"test",test,"displayName","?max")
		}();
		const max_45by=exports["max-by"]=function(){
			const doc="An element whose `by em` is >=? all other elements' `by em`s.\nLike `max (map _ by)` except the mapping is not applied to the result.";
			const test=_ms.set(function(){
				const _k0=[["five","six","seven"],_ms.unlazy(count)],_v0="seven";
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return max_45by([],_ms.unlazy(identity))
				});
				return _ms.map(_k0,_v0)
			},"displayName","test");
			return _ms.set(function(_,by){
				_ms.checkContains(_ms.unlazy(_64),_,"_");
				_ms.checkContains(_ms.unlazy(Fun),by,"by");
				return _ms.unlazy(un_45_63)(_63max_45by(_,by),"Can not take max of empty.")
			},"doc",doc,"test",test,"displayName","max-by")
		}();
		const _63max_45by=exports["?max-by"]=function(){
			const doc="Like max-by, but returns empty ? for empty.";
			const test=_ms.set(function(){
				const _k0=[[1],_ms.unlazy(identity)],_v0=_ms.unlazy(_63)(1);
				const _k1=[[],_ms.unlazy(identity)],_v1=_ms.unlazy(empty)(_ms.unlazy(_63));
				return _ms.map(_k0,_v0,_k1,_v1)
			},"displayName","test");
			return _ms.set(function(_,by){
				_ms.checkContains(_ms.unlazy(_64),_,"_");
				_ms.checkContains(_ms.unlazy(Fun),by,"by");
				return _ms.unlazy(_if)(not(_ms.unlazy(empty_63)(_)),_ms.lazy(function(){
					return function(){
						const iter=_ms.unlazy(iterator)(_);
						const value=iter.next().value;
						const cur_45max=_ms.unlazy(Ref_33)(value);
						const cur_45max_45by=_ms.unlazy(Ref_33)(by(value));
						loop115:while(true){
							const _$116=iter.next(),value=_$116.value,done=_$116.done;
							if(_ms.bool(done)){
								break loop115
							} else {
								const value_45by=by(value);
								_ms.unlazy(if_33)(_60_63(_ms.unlazy(get)(cur_45max_45by),value_45by),function(){
									_ms.unlazy(set_33)(cur_45max,value);
									return _ms.unlazy(set_33)(cur_45max_45by,value_45by)
								})
							}
						};
						return _ms.unlazy(get)(cur_45max)
					}()
				}))
			},"doc",doc,"test",test,"displayName","?max-by")
		}();
		const sorted_63=exports["sorted?"]=function(){
			const doc="Whether it is already in sorted order.";
			const test=_ms.set(function(){
				const _k0=[[]],_v0=true;
				const _k1=[[1,2,3]],_v1=true;
				const _k2=[[3,2,1]],_v2=false;
				const _k3=[["six","five","seven"],_ms.unlazy(count)],_v3=true;
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3)
			},"displayName","test");
			return _ms.set(function(seq,_63sort_45by){
				_ms.checkContains(_ms.unlazy(Seq),seq,"seq");
				_ms.checkContains(_ms.sub(_ms.unlazy(Opt),_ms.unlazy(Fun)),_63sort_45by,"?sort-by");
				const sort_45by=_ms.unlazy(opr)(_63sort_45by,_ms.unlazy(identity));
				return function(){
					const _=seq;
					if(_ms.bool(_ms.unlazy(empty_63)(_))){
						return true
					} else {
						const sb_45prev=_ms.unlazy(Ref_33)(sort_45by(_ms.unlazy(first)(_)));
						return _ms.unlazy(all_63)(_ms.unlazy(tail)(_),function(em){
							const sb_45cur=sort_45by(em);
							return _ms.unlazy(returning)(_60_63(_ms.unlazy(get)(sb_45prev),sb_45cur),function(){
								return _ms.unlazy(set_33)(sb_45prev,sb_45cur)
							})
						})
					}
				}()
			},"doc",doc,"test",test,"displayName","sorted?")
		}();
		const sort=exports.sort=Method(function(){
			const doc="Puts the elements in sorted order.\nOrder is determined by calling `compare`.\nOptional `sort-by` determines an attribute of elements to be compared.";
			const test=_ms.set(function(){
				const _k0=[[3,2,1]],_v0=[1,2,3];
				const _k1=[["five","six","seven"],_ms.unlazy(count)],_v1=["six","five","seven"];
				return _ms.map(_k0,_v0,_k1,_v1)
			},"displayName","test");
			const _default=_ms.set(function(_,_63sort_45by){
				_ms.checkContains(_ms.unlazy(_64),_,"_");
				_ms.checkContains(_ms.sub(_ms.unlazy(Opt),_ms.unlazy(Fun)),_63sort_45by,"?sort-by");
				const sort_45by=_ms.unlazy(opr)(_63sort_45by,_ms.unlazy(identity));
				const sorted=_ms.unlazy(from_45stream)(_ms.unlazy(Array_33),_);
				sorted.sort(function(a,b){
					return compare(sort_45by(a),sort_45by(b))
				});
				return _ms.checkContains(Array,sorted,"res")
			},"displayName","default");
			return {
				doc:doc,
				test:test,
				default:_default,
				displayName:"sort"
			}
		}());
		const displayName=exports.displayName="compare";
		exports.default=compare;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9jb21wYXJlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBcUJBLGNBQVUsaUJBQ007R0FBZixVQUNDO1VBRGM7Ozs7O0VBYWhCLDJCQUFJLGlCQUNNO0dBQVQsVUFDQztHQVVELHVCQUFVLFNBQU0sRUFBRSxFQUNDOzZCQURSLEtBQ1YsR0FBSSxTQUFLLEVBQUU7a0NBQVcsRUFBRTtJQUFBOztVQVpoQjs7Ozs7O0VBY1YsMkJBQUksaUJBQ007R0FBVCxVQUNDO0dBRUQsdUJBQVUsU0FBTSxPQUFPLFFBQ087NkJBRG5CLEtBQ1YsT0FBSSxRQUFRLE9BQU8sU0FBUzs7VUFKcEI7Ozs7OztFQU1WLCtCQUFLLGlCQUNNO0dBQVYsVUFBTTtHQUNOLHVCQUFVLFNBQU0sT0FBTyxRQUNPOzZCQURuQixLQUNWLFVBQUssUUFBUSxPQUFPLFNBQVM7O1VBRnBCOzs7Ozs7RUFLVix5Q0FDTTtHQUFMLFVBQU07R0FDTixtQkFDTyxVQUFBO0lBQU4sVUFBQSxtQkFBUSxDQUFFLEdBQUksQ0FBRSxRQUFTO0lBQ3pCLFVBQUEsbUJBQVEsR0FBSSxDQUFFLFFBQVM7OztrQkFDdkIsU0FBQSxFQUFNLEVBQUUsRUFDQzs7V0FBVCxPQUFJLEVBQUUsR0FBSSxFQUFFO0dBQUE7O0VBS2QsZ0NBQ0k7R0FBSCxVQUFNO0dBQ04sbUJBQ08sVUFBQTtJQUFOLFVBQUEsQ0FBRSxDQUFFLEVBQUUsRUFBRSxRQUFTO0lBQ2pCLFVBQUEsQ0FBRSxDQUFFLEVBQUUsRUFBRSxRQUFTO3lDQUVQLFVBQUE7WUFBVCxJQUFJO0lBQUE7OztrQkFDTCxTQUFBLEVBQ0c7O2dDQUFFLE9BQUEsR0FBTztHQUFBOztFQUVkLHVDQUNLO0dBQUosVUFBTTtHQUNOLG1CQUNPLFVBQUE7SUFBTixVQUFBLENBQUUsQ0FBRSx3QkFBVztJQUNmLFVBQUEsQ0FBRTs7O2tCQUNGLFNBQUEsRUFDRzs7V0FBSCxZQUFROzs7RUFFViwyQ0FDTztHQUFOLFVBQ0M7R0FFRCxtQkFDTyxVQUFBO0lBQU4sVUFBQSxDQUFFLENBQUcsT0FBTyxNQUFNLGdDQUFxQjt5Q0FFN0IsVUFBQTtZQUFULFNBQU87Ozs7a0JBQ1IsU0FBQSxFQUFJLEdBQ007OztnQ0FBSixZQUFRLEVBQUUsSUFBSztHQUFBOztFQUV2QiwrQ0FDUTtHQUFQLFVBQU07R0FDTixtQkFDTyxVQUFBO0lBQU4sVUFBQSxDQUFFLENBQUUsNkNBQW9CO0lBQ3hCLFVBQUEsQ0FBRTs7O2tCQUNGLFNBQUEsRUFBSSxHQUNNOzs7MkJBQU4seUJBQUk7c0JBQ1U7TUFBakIsZ0NBQU87TUFDUCxZQUFRO01BQ1IsbUNBQWU7TUFDZix3Q0FBbUIsR0FBRzt5QkFFakI7T0FBSixZQUFhO09BRVIsWUFBSixNQUNJO1FBQUg7Y0FFRztRQUFILGlCQUFXLEdBQUc7MEJBQ1QsdUJBQVEsZ0JBQVksWUFDVyxVQUFBOzRCQUE5QixVQUFRO21DQUNSLGVBQVc7UUFBQTtPQUFBO01BQUE7NkJBQ2hCO0tBQUE7SUFBQTtHQUFBOztFQUdQLDZDQUNRO0dBQVAsVUFBTTtHQUNOLG1CQUNPLFVBQUE7SUFBTixVQUFBLENBQUUsUUFBUztJQUNYLFVBQUEsQ0FBRSxDQUFFLEVBQUUsRUFBRSxRQUFTO0lBQ2pCLFVBQUEsQ0FBRSxDQUFFLEVBQUUsRUFBRSxRQUFTO0lBQ2pCLFVBQUEsQ0FBRSxDQUFHLE1BQU0sT0FBTyxnQ0FBb0I7OztrQkFDdEMsU0FBQSxJQUFRLGFBQ2lCOzs7SUFBekIsZ0NBQWM7O0tBQ1QsUUFBQTtLQUNKLGlDQUFBLElBQ087YUFBTjtLQUFBLE9BRUc7TUFBSCxtQ0FBZ0IsNEJBQVE7aURBQ25CLEdBQU8sU0FBQSxHQUNFO09BQWIsZUFBUyxVQUFRO29DQUNOLHVCQUFRLFdBQVMsVUFDUyxVQUFBO2tDQUEvQixVQUFRO09BQUE7TUFBQTtLQUFBO0lBQUE7R0FBQTs7RUFFbkIsd0JBQU0saUJBQ007R0FBWCxVQUNDO0dBR0QsbUJBQ08sVUFBQTtJQUFOLFVBQUEsQ0FBRSxDQUFFLEVBQUUsRUFBRSxRQUFTLENBQUUsRUFBRSxFQUFFO0lBQ3ZCLFVBQUEsQ0FBRSxDQUFHLE9BQU8sTUFBTSxnQ0FBb0IsQ0FBRyxNQUFNLE9BQU87OztHQUN2RCx1QkFBVSxTQUFPLEVBQUksYUFDaUI7OztJQUFyQyxnQ0FBYztJQUVkLDREQUE0QjtJQUM1QixZQUFhLFNBQUEsRUFBRSxFQUNDO1lBQWYsUUFBUyxVQUFRLEdBQUksVUFBUTtJQUFBOzZCQUxwQixNQU1WOztVQWJVOzs7Ozs7O0VBbkpiLHNDQUFBO2tCQWtLQSIsImZpbGUiOiJjb21wYXJlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=