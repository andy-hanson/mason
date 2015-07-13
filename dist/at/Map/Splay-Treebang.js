"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../js","../../Objectbang","../../Type/Js-Method","../../Type/Kind","../../Type/Tuple","../../Type/Wrap-Type","../at","../atbang","../at-Type","./Map","./Mapbang","./Map-Type","./Sorted-Mapbang","../../bang"],function(exports,compare_0,js_1,Object_33_2,Js_45Method_3,Kind_4,Tuple_5,Wrap_45Type_6,_64_7,_64_33_8,_64_45Type_9,Map_10,Map_33_11,Map_45Type_12,Sorted_45Map_33_13,_33_14){
	exports._get=_ms.lazy(function(){
		const compare=_ms.getDefaultExport(compare_0),_$2=_ms.getModule(compare_0),_60_63=_ms.get(_$2,"<?"),_$3=_ms.getModule(js_1),defined_63=_ms.get(_$3,"defined?"),_$4=_ms.getModule(Object_33_2),p_33=_ms.get(_$4,"p!"),_$5=_ms.getModule(Js_45Method_3),js_45impl_33=_ms.get(_$5,"js-impl!"),_$6=_ms.getModule(Kind_4),kind_33=_ms.get(_$6,"kind!"),self_45kind_33=_ms.get(_$6,"self-kind!"),Tuple=_ms.getDefaultExport(Tuple_5),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_6),_$9=_ms.getModule(_64_7),empty_63=_ms.get(_$9,"empty?"),iterator=_ms.get(_$9,"iterator"),_$10=_ms.getModule(_64_33_8),empty_33=_ms.get(_$10,"empty!"),_$11=_ms.getModule(_64_45Type_9),empty=_ms.get(_$11,"empty"),_$12=_ms.getModule(Map_10),_63get=_ms.get(_$12,"?get"),_$13=_ms.getModule(Map_33_11),assoc_33=_ms.get(_$13,"assoc!"),un_45assoc_33=_ms.get(_$13,"un-assoc!"),Map_45Type=_ms.getDefaultExport(Map_45Type_12),Sorted_45Map_33=_ms.getDefaultExport(Sorted_45Map_33_13),_$17=_ms.lazyGetModule(_33_14),_33not=_ms.lazyProp(_$17,"!not");
		const Splay_45Tree_33=Wrap_45Type(function(){
			const built={};
			const doc=built.doc=`Default Sorted-Map! implementation.\nBinary tree that is good at accessing the same values many times.`;
			return _ms.setName(built,"Splay-Tree!")
		}());
		const Splay_45Node=Tuple(function(){
			const built={};
			const props=built.props=[`key`,`val!`,`left!`,`right!`];
			return _ms.setName(built,"Splay-Node")
		}());
		self_45kind_33(Splay_45Tree_33,Map_45Type,function(){
			const built=new global.Map();
			_ms.assoc(built,empty,function(){
				return Splay_45Tree_33(void 0)
			});
			return built
		}());
		js_45impl_33(iterator,Splay_45Tree_33,function(){
			const iter=function* iter(_){
				if(defined_63(_)){
					(yield* iter(_["left!"]));
					(yield [_.key,_["val!"]]);
					(yield* iter(_["right!"]))
				}
			};
			return iter(this.val)
		});
		kind_33(Splay_45Tree_33,Sorted_45Map_33,function(){
			const built=new global.Map();
			_ms.assoc(built,empty_63,function(_){
				return ! defined_63(_.val)
			});
			_ms.assoc(built,empty_33,function(_){
				p_33(_,`val`,void 0)
			});
			_ms.assoc(built,_63get,function(_,key){
				return _ms.bool((! empty_63(_)&&splay_33_63(_,key)))?_ms.some(function(){
					return _.val["val!"]
				}()):_ms.None
			});
			_ms.assoc(built,assoc_33,function(_,key,val){
				if(_ms.bool(empty_63(_))){
					p_33(_,`val`,Splay_45Node(key,val,void 0,void 0))
				} else if(_ms.bool(splay_33_63(_,key))){
					p_33(_.val,`val!`,val)
				} else {
					const old_45root=_.val;
					_ms.unlazy(_33not)(empty_63,_);
					p_33(_,`val`,function(){
						if(_ms.bool(_60_63(old_45root.key,key))){
							const old_45right=old_45root["right!"];
							p_33(old_45root,`right!`,void 0);
							return Splay_45Node(key,val,old_45root,old_45right)
						} else {
							const old_45left=old_45root["left!"];
							p_33(old_45root,`left!`,void 0);
							return Splay_45Node(key,val,old_45left,old_45root)
						}
					}())
				}
			});
			_ms.assoc(built,un_45assoc_33,function(_,key){
				return _ms.bool((! empty_63(_)&&splay_33_63(_,key)))?_ms.some(function(){
					const removed=_.val;
					p_33(_,`val`,function(){
						if(_ms.bool(has_45left_63(removed))){
							const right=removed.right;
							const new_45root=removed.left;
							splay_33_63(_,key);
							p_33(new_45root,`right!`,right);
							return new_45root
						} else {
							return removed.right
						}
					}());
					return removed.val
				}()):_ms.None
			});
			return built
		}());
		const splay_33_63=function splay_33_63(_,key){
			const dummy=Splay_45Node(void 0,void 0,void 0,void 0);
			let left=dummy;
			let right=dummy;
			let cur=_.val;
			let found=null;
			for(;;){
				{
					const _=compare(key,cur.key);
					if(_ms.bool(_60_63(_,0))){
						if(! _ms.bool(has_45left_63(cur))){
							found=false;
							break
						};
						const link_45right_33=function link_45right_33(new_45right){
							p_33(right,`left!`,new_45right);
							cur=new_45right["left!"];
							right=new_45right
						};
						if(_ms.bool(_60_63(key,cur["left!"].key))){
							const old_45left=cur["left!"];
							p_33(cur,`left!`,old_45left["right!"]);
							p_33(old_45left,`right!`,cur);
							if(! _ms.bool(has_45left_63(old_45left))){
								cur=old_45left;
								found=false;
								break
							};
							cur=old_45left;
							link_45right_33(old_45left)
						} else {
							link_45right_33(cur)
						}
					} else if(_ms.bool(_60_63(0,_))){
						if(! _ms.bool(has_45right_63(cur))){
							found=false;
							break
						};
						const link_45left_33=function link_45left_33(new_45left){
							p_33(left,`right!`,new_45left);
							cur=new_45left["right!"];
							left=new_45left
						};
						if(_ms.bool(_60_63(cur["right!"].key,key))){
							const tmp=cur["right!"];
							p_33(cur,`right!`,tmp["left!"]);
							p_33(tmp,`left!`,cur);
							if(! _ms.bool(has_45right_63(tmp))){
								cur=tmp;
								found=false;
								break
							};
							link_45left_33(tmp)
						} else {
							link_45left_33(cur)
						}
					} else {
						found=true;
						break
					}
				}
			};
			p_33(left,`right!`,cur["left!"]);
			p_33(right,`left!`,cur["right!"]);
			p_33(cur,`left!`,dummy["right!"]);
			p_33(cur,`right!`,dummy["left!"]);
			p_33(_,`val`,cur);
			return found
		};
		const has_45left_63=function has_45left_63(node){
			return defined_63(node["left!"])
		};
		const has_45right_63=function has_45right_63(node){
			return defined_63(node["right!"])
		};
		const name=exports.name=`Splay-Tree!`;
		exports.default=Splay_45Tree_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9TcGxheS1UcmVlIS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQWtCQSxzQkFBYSxzQkFDUzs7R0FBckIsb0JBQ0M7OztFQUdGLG1CQUFhLGdCQUNLOztHQUFqQix3QkFBTyxDQUFHLE1BQU0sT0FBTyxRQUFROzs7RUFFaEMsZUFBVyxnQkFBWSxxQkFDUTs7bUJBQTlCLE1BQ1UsVUFBQTtXQUFULGdCQUFZOzs7O0VBRWQsYUFBUyxTQUFTLGdCQUNhLFVBQUE7R0FBOUIsV0FBVSxlQUFBLEVBQ0M7SUFBVixHQUFJLFdBQVEsR0FDQzthQUFSLEtBQUs7WUFDTixDQUFFLE1BQU07YUFDUCxLQUFLOzs7VUFDWCxLQUFLOztFQUVOLFFBQU0sZ0JBQVksMEJBQ1c7O21CQUE1QixTQUFXLFNBQUEsRUFDQztXQUFYLEVBQUksV0FBUzs7bUJBQ2QsU0FBWSxTQUFBLEVBQ0M7SUFBWixLQUFHLEVBQUcsTUFBSzs7bUJBQ1osT0FBUyxTQUFBLEVBQUUsSUFDRztvQkFBVixDQUFLLEVBQUksU0FBTSxJQUFJLFlBQVEsRUFBRSwwQkFDSTtZQUFuQzs7O21CQUNGLFNBQVksU0FBQSxFQUFFLElBQUksSUFDRztJQUNmLFlBQUosU0FBTSxJQUNDO0tBQU4sS0FBRyxFQUFHLE1BQU0sYUFBVyxJQUFJLElBQUksT0FBVTtXQUMxQyxZQUFBLFlBQVEsRUFBRSxNQUNHO0tBQVosS0FBRyxNQUFPLE9BQU07SUFBQSxPQUViO0tBQUgsaUJBQVc7d0JBQ0EsU0FBTztLQUNsQixLQUFHLEVBQUc7TUFDTCxZQUFBLE9BQUcsZUFBYSxNQUNHO09BQWxCLGtCQUFZO09BQ1osS0FBRyxXQUFVLFNBQVE7Y0FDckIsYUFBVyxJQUFJLElBQUksV0FBUztNQUFBLE9BRXpCO09BQUgsaUJBQVc7T0FDWCxLQUFHLFdBQVUsUUFBTztjQUNwQixhQUFXLElBQUksSUFBSSxXQUFTO01BQUE7S0FBQTtJQUFBO0dBQUE7bUJBQ2pDLGNBQWMsU0FBQSxFQUFFLElBQ0c7b0JBQWYsQ0FBSyxFQUFJLFNBQU0sSUFBSSxZQUFRLEVBQUUsMEJBQ0k7S0FBbkMsY0FBVTtLQUVWLEtBQUcsRUFBRztNQUNMLFlBQUEsY0FBVSxVQUNPO09BQWhCLFlBQVE7T0FDUixpQkFBVztPQUVYLFlBQVEsRUFBRTtPQUNWLEtBQUcsV0FBVSxTQUFRO2NBQ3JCO01BQUEsT0FFRztjQUNIOzs7WUFFRjs7Ozs7RUFLRixrQkFBVyxxQkFBQSxFQUFFLElBQ0c7R0FBZixZQUFRLGFBQVcsT0FBVSxPQUFVLE9BQVU7R0FDakQsU0FBUztHQUNULFVBQVU7R0FDVixRQUFRO0dBRVIsVUFBVTtHQUVOLE9BQUE7SUFBRztLQUFBLFFBQUEsUUFBUSxJQUFJO0tBQ2pCLFlBQUEsT0FBRyxFQUFFLElBQ0M7TUFBTCxjQUFRLGNBQVUsTUFDRzthQUFYO09BQ1Q7TUFBQTtNQUNELHNCQUFnQix5QkFBQSxZQUNTO09BQXhCLEtBQUcsTUFBTyxRQUFPO1dBQ1Y7YUFDRTtNQUFBO01BRUwsWUFBSixPQUFHLElBQUksbUJBQ2E7T0FDbkIsaUJBQVc7T0FDWCxLQUFHLElBQUssUUFBTztPQUNmLEtBQUcsV0FBVSxTQUFRO09BQ3JCLGNBQVEsY0FBVSxhQUNRO1lBQWxCO2NBQ0U7UUFDVDtPQUFBO1dBQ007T0FDUCxnQkFBWTtNQUFBLE9BRVQ7T0FBSCxnQkFBWTtNQUFBO0tBQUEsT0FDZixZQUFBLE9BQUcsRUFBRSxJQUNDO01BQUwsY0FBUSxlQUFXLE1BQ0c7YUFBWjtPQUNUO01BQUE7TUFDRCxxQkFBZSx3QkFBQSxXQUNRO09BQXRCLEtBQUcsS0FBTSxTQUFRO1dBQ1Y7WUFDQztNQUFBO01BRUosWUFBSixPQUFHLGtCQUFlLE1BQ0c7T0FDcEIsVUFBTTtPQUNOLEtBQUcsSUFBSyxTQUFRO09BQ2hCLEtBQUcsSUFBSyxRQUFPO09BQ2YsY0FBUSxlQUFXLE1BQ0c7WUFBZDtjQUNFO1FBQ1Q7T0FBQTtPQUNELGVBQVc7TUFBQSxPQUVSO09BQUgsZUFBVztNQUFBO0tBQUEsT0FFVjtZQUFNO01BQ1Q7S0FBQTtJQUFBO0dBQUE7R0FFSCxLQUFHLEtBQU0sU0FBUTtHQUNqQixLQUFHLE1BQU8sUUFBTztHQUNqQixLQUFHLElBQUssUUFBTztHQUNmLEtBQUcsSUFBSyxTQUFRO0dBQ2hCLEtBQUcsRUFBRyxNQUFLO1VBQ1g7RUFBQTtFQUVELG9CQUFhLHVCQUFBLEtBQ0k7VUFBaEIsV0FBUzs7RUFDVixxQkFBYyx3QkFBQSxLQUNJO1VBQWpCLFdBQVM7O0VBdkpYLHdCQUFBO2tCQWtCQSIsImZpbGUiOiJhdC9NYXAvU3BsYXktVHJlZWJhbmcuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==