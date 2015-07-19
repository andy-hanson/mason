"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../js","../../Object","../../Type/Js-Method","../../Type/Kind","../../Type/Tuple","../../Type/Wrap-Type","../at","../at-Type","./Map","./Map-Type","./Sorted-Map"],(exports,compare_0,js_1,Object_2,Js_45Method_3,Kind_4,Tuple_5,Wrap_45Type_6,_64_7,_64_45Type_8,Map_9,Map_45Type_10,Sorted_45Map_11)=>{
	exports._get=_ms.lazy(()=>{
		const compare=_ms.getDefaultExport(compare_0),_$2=_ms.getModule(compare_0),_60_63=_ms.get(_$2,"<?"),_$3=_ms.getModule(js_1),defined_63=_ms.get(_$3,"defined?"),_$4=_ms.getModule(Object_2),p_33=_ms.get(_$4,"p!"),_$5=_ms.getModule(Js_45Method_3),js_45impl_33=_ms.get(_$5,"js-impl!"),_$6=_ms.getModule(Kind_4),kind_33=_ms.get(_$6,"kind!"),self_45kind_33=_ms.get(_$6,"self-kind!"),Tuple=_ms.getDefaultExport(Tuple_5),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_6),_$9=_ms.getModule(_64_7),empty_33=_ms.get(_$9,"empty!"),empty_63=_ms.get(_$9,"empty?"),iterator=_ms.get(_$9,"iterator"),_$10=_ms.getModule(_64_45Type_8),empty=_ms.get(_$10,"empty"),_$11=_ms.getModule(Map_9),assoc_33=_ms.get(_$11,"assoc!"),_63get=_ms.get(_$11,"?get"),un_45assoc_33=_ms.get(_$11,"un-assoc!"),Map_45Type=_ms.getDefaultExport(Map_45Type_10),Sorted_45Map=_ms.getDefaultExport(Sorted_45Map_11);
		const Splay_45Tree_33=exports["Splay-Tree!"]=Wrap_45Type(()=>{
			const built={};
			const doc=built.doc=`Default Sorted-Map implementation.\nBinary tree that is good at accessing the same values many times.`;
			return _ms.setName(built,"Splay-Tree!")
		}());
		const Splay_45Node=Tuple(()=>{
			const built={};
			const props=built.props=[`key`,`val!`,`left!`,`right!`];
			return _ms.setName(built,"Splay-Node")
		}());
		self_45kind_33(Splay_45Tree_33,Map_45Type,()=>{
			const built=new global.Map();
			_ms.assoc(built,empty,()=>{
				return Splay_45Tree_33(void 0)
			});
			return built
		}());
		js_45impl_33(iterator,Splay_45Tree_33,function(){
			const _this=this;
			const iter=function* iter(_){
				if(defined_63(_)){
					(yield* iter(_["left!"]));
					(yield [_.key,_["val!"]]);
					(yield* iter(_["right!"]))
				}
			};
			return iter(_this.val)
		});
		kind_33(Splay_45Tree_33,Sorted_45Map,()=>{
			const built=new global.Map();
			_ms.assoc(built,empty_63,_=>{
				return ! defined_63(_.val)
			});
			_ms.assoc(built,empty_33,_=>{
				p_33(_,`val`,void 0)
			});
			_ms.assoc(built,_63get,(_,key)=>{
				return _ms.bool((! empty_63(_)&&splay_33_63(_,key)))?_ms.some(()=>{
					return _.val["val!"]
				}()):_ms.None
			});
			_ms.assoc(built,assoc_33,(_,key,val)=>{
				if(_ms.bool(empty_63(_))){
					p_33(_,`val`,Splay_45Node(key,val,void 0,void 0))
				} else if(_ms.bool(splay_33_63(_,key))){
					p_33(_.val,`val!`,val)
				} else {
					const old_45root=_.val;
					_ms.assertNot(empty_63,_);
					p_33(_,`val`,()=>{
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
			_ms.assoc(built,un_45assoc_33,(_,key)=>{
				return _ms.bool((! empty_63(_)&&splay_33_63(_,key)))?_ms.some(()=>{
					const removed=_.val;
					p_33(_,`val`,()=>{
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
		const name=exports.name=`Splay-Tree`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9TcGxheS1UcmVlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBY0EsNkNBQWEsZ0JBQ1M7O0dBQXJCLG9CQUNDOzs7RUFHRixtQkFBYSxVQUNLOztHQUFqQix3QkFBTyxDQUFHLE1BQU0sT0FBTyxRQUFROzs7RUFFaEMsZUFBVyxnQkFBWSxlQUNROzttQkFBOUIsTUFDVSxJQUFBO1dBQVQsZ0JBQVk7Ozs7RUFFZCxhQUFTLFNBQVMsZ0JBQ2MsVUFBQTs7R0FBL0IsV0FBVSxlQUFBLEVBQ0M7SUFBVixHQUFJLFdBQVEsR0FDQzthQUFSLEtBQUs7WUFDTixDQUFFLE1BQU07YUFDUCxLQUFLOzs7VUFDWCxLQUFLOztFQUVOLFFBQU0sZ0JBQVksaUJBQ1U7O21CQUEzQixTQUFXLEdBQ0M7V0FBWCxFQUFJLFdBQVM7O21CQUNkLFNBQVksR0FDQztJQUFaLEtBQUcsRUFBRyxNQUFLOzttQkFDWixPQUFTLENBQUEsRUFBRSxNQUNHO29CQUFWLENBQUssRUFBSSxTQUFNLElBQUksWUFBUSxFQUFFLG9CQUNJO1lBQW5DOzs7bUJBQ0YsU0FBWSxDQUFBLEVBQUUsSUFBSSxNQUNHO0lBQ2YsWUFBSixTQUFNLElBQ0M7S0FBTixLQUFHLEVBQUcsTUFBTSxhQUFXLElBQUksSUFBSSxPQUFVO1dBQzFDLFlBQUEsWUFBUSxFQUFFLE1BQ0c7S0FBWixLQUFHLE1BQU8sT0FBTTtJQUFBLE9BRWI7S0FBSCxpQkFBVzttQkFDRyxTQUFPO0tBQ3JCLEtBQUcsRUFBRztNQUNMLFlBQUEsT0FBRyxlQUFhLE1BQ0c7T0FBbEIsa0JBQVk7T0FDWixLQUFHLFdBQVUsU0FBUTtjQUNyQixhQUFXLElBQUksSUFBSSxXQUFTO01BQUEsT0FFekI7T0FBSCxpQkFBVztPQUNYLEtBQUcsV0FBVSxRQUFPO2NBQ3BCLGFBQVcsSUFBSSxJQUFJLFdBQVM7TUFBQTtLQUFBO0lBQUE7R0FBQTttQkFDakMsY0FBYyxDQUFBLEVBQUUsTUFDRztvQkFBZixDQUFLLEVBQUksU0FBTSxJQUFJLFlBQVEsRUFBRSxvQkFDSTtLQUFuQyxjQUFVO0tBRVYsS0FBRyxFQUFHO01BQ0wsWUFBQSxjQUFVLFVBQ087T0FBaEIsWUFBUTtPQUNSLGlCQUFXO09BRVgsWUFBUSxFQUFFO09BQ1YsS0FBRyxXQUFVLFNBQVE7Y0FDckI7TUFBQSxPQUVHO2NBQ0g7OztZQUVGOzs7OztFQUtGLGtCQUFXLHFCQUFBLEVBQUUsSUFDRztHQUFmLFlBQVEsYUFBVyxPQUFVLE9BQVUsT0FBVTtHQUNqRCxTQUFTO0dBQ1QsVUFBVTtHQUNWLFFBQVE7R0FFUixVQUFVO0dBRU4sT0FBQTtJQUFHO0tBQUEsUUFBQSxRQUFRLElBQUk7S0FDakIsWUFBQSxPQUFHLEVBQUUsSUFDQztNQUFMLGNBQVEsY0FBVSxNQUNHO2FBQVg7T0FDVDtNQUFBO01BQ0Qsc0JBQWdCLHlCQUFBLFlBQ1M7T0FBeEIsS0FBRyxNQUFPLFFBQU87V0FDVjthQUNFO01BQUE7TUFFTCxZQUFKLE9BQUcsSUFBSSxtQkFDYTtPQUNuQixpQkFBVztPQUNYLEtBQUcsSUFBSyxRQUFPO09BQ2YsS0FBRyxXQUFVLFNBQVE7T0FDckIsY0FBUSxjQUFVLGFBQ1E7WUFBbEI7Y0FDRTtRQUNUO09BQUE7V0FDTTtPQUNQLGdCQUFZO01BQUEsT0FFVDtPQUFILGdCQUFZO01BQUE7S0FBQSxPQUNmLFlBQUEsT0FBRyxFQUFFLElBQ0M7TUFBTCxjQUFRLGVBQVcsTUFDRzthQUFaO09BQ1Q7TUFBQTtNQUNELHFCQUFlLHdCQUFBLFdBQ1E7T0FBdEIsS0FBRyxLQUFNLFNBQVE7V0FDVjtZQUNDO01BQUE7TUFFSixZQUFKLE9BQUcsa0JBQWUsTUFDRztPQUNwQixVQUFNO09BQ04sS0FBRyxJQUFLLFNBQVE7T0FDaEIsS0FBRyxJQUFLLFFBQU87T0FDZixjQUFRLGVBQVcsTUFDRztZQUFkO2NBQ0U7UUFDVDtPQUFBO09BQ0QsZUFBVztNQUFBLE9BRVI7T0FBSCxlQUFXO01BQUE7S0FBQSxPQUVWO1lBQU07TUFDVDtLQUFBO0lBQUE7R0FBQTtHQUVILEtBQUcsS0FBTSxTQUFRO0dBQ2pCLEtBQUcsTUFBTyxRQUFPO0dBQ2pCLEtBQUcsSUFBSyxRQUFPO0dBQ2YsS0FBRyxJQUFLLFNBQVE7R0FDaEIsS0FBRyxFQUFHLE1BQUs7VUFDWDtFQUFBO0VBRUQsb0JBQWEsdUJBQUEsS0FDSTtVQUFoQixXQUFTOztFQUNWLHFCQUFjLHdCQUFBLEtBQ0k7VUFBakIsV0FBUzs7RUFuSlgsd0JBQUEiLCJmaWxlIjoiYXQvTWFwL1NwbGF5LVRyZWUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==