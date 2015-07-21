"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../js","../../Object","../../Type/Method","../../Type/Kind","../../Type/Tuple","../../Type/Wrap-Type","../at","../at-Type","./Map","./Map-Type","./Sorted-Map"],(exports,compare_0,js_1,Object_2,Method_3,Kind_4,Tuple_5,Wrap_45Type_6,_64_7,_64_45Type_8,Map_9,Map_45Type_10,Sorted_45Map_11)=>{
	exports._get=_ms.lazy(()=>{
		const compare=_ms.getDefaultExport(compare_0),_$2=_ms.getModule(compare_0),_60_63=_ms.get(_$2,"<?"),_$3=_ms.getModule(js_1),defined_63=_ms.get(_$3,"defined?"),_$4=_ms.getModule(Object_2),p_33=_ms.get(_$4,"p!"),_$5=_ms.getModule(Method_3),impl_33=_ms.get(_$5,"impl!"),self_45impl_33=_ms.get(_$5,"self-impl!"),_$6=_ms.getModule(Kind_4),kind_33=_ms.get(_$6,"kind!"),self_45kind_33=_ms.get(_$6,"self-kind!"),Tuple=_ms.getDefaultExport(Tuple_5),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_6),_$9=_ms.getModule(_64_7),empty_33=_ms.get(_$9,"empty!"),empty_63=_ms.get(_$9,"empty?"),iterator=_ms.get(_$9,"iterator"),_$10=_ms.getModule(_64_45Type_8),empty=_ms.get(_$10,"empty"),_$11=_ms.getModule(Map_9),assoc_33=_ms.get(_$11,"assoc!"),_63get=_ms.get(_$11,"?get"),un_45assoc_33=_ms.get(_$11,"un-assoc!"),Map_45Type=_ms.getDefaultExport(Map_45Type_10),Sorted_45Map=_ms.getDefaultExport(Sorted_45Map_11);
		const Splay_45Tree=Wrap_45Type(()=>{
			const built={};
			const doc=built.doc=`Default Sorted-Map implementation.\nBinary tree that is good at accessing the same values many times.`;
			return _ms.setName(built,"Splay-Tree")
		}());
		const Splay_45Node=Tuple(()=>{
			const built={};
			const props=built.props=[`key`,`val!`,`left!`,`right!`];
			return _ms.setName(built,"Splay-Node")
		}());
		self_45kind_33(Splay_45Tree,Map_45Type);
		self_45impl_33(empty,Splay_45Tree,()=>{
			return Splay_45Tree(void 0)
		});
		impl_33(iterator,Splay_45Tree,function(){
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
		kind_33(Splay_45Tree,Sorted_45Map);
		impl_33(empty_63,Splay_45Tree,function(){
			const _this=this;
			return ! defined_63(_this.val)
		});
		impl_33(empty_33,Splay_45Tree,function(){
			const _this=this;
			p_33(_this,`val`,void 0)
		});
		impl_33(_63get,Splay_45Tree,function(key){
			const _this=this;
			return _ms.bool((! empty_63(_this)&&splay_33_63(_this,key)))?_ms.some(()=>{
				return _this.val["val!"]
			}()):_ms.None
		});
		impl_33(assoc_33,Splay_45Tree,function(key,val){
			const _this=this;
			if(_ms.bool(empty_63(_this))){
				p_33(_this,`val`,Splay_45Node(key,val,void 0,void 0))
			} else if(_ms.bool(splay_33_63(_this,key))){
				p_33(_this.val,`val!`,val)
			} else {
				const old_45root=_this.val;
				_ms.assertNot(empty_63,_this);
				p_33(_this,`val`,()=>{
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
		impl_33(un_45assoc_33,Splay_45Tree,function(key){
			const _this=this;
			return _ms.bool((! empty_63(_this)&&splay_33_63(_this,key)))?_ms.some(()=>{
				const removed=_this.val;
				p_33(_this,`val`,()=>{
					if(_ms.bool(has_45left_63(removed))){
						const right=removed.right;
						const new_45root=removed.left;
						splay_33_63(_this,key);
						p_33(new_45root,`right!`,right);
						return new_45root
					} else {
						return removed.right
					}
				}());
				return removed.val
			}()):_ms.None
		});
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
		exports.default=Splay_45Tree;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9TcGxheS1UcmVlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBY0EsbUJBQVksZ0JBQ1M7O0dBQXBCLG9CQUNDOzs7RUFHRixtQkFBYSxVQUNLOztHQUFqQix3QkFBTyxDQUFHLE1BQU0sT0FBTyxRQUFROzs7RUFFaEMsZUFBVyxhQUFXO0VBQ3RCLGVBQVcsTUFBTSxhQUNZLElBQUE7VUFBNUIsYUFBVzs7RUFFWixRQUFNLFNBQVMsYUFDYSxVQUFBOztHQUEzQixXQUFVLGVBQUEsRUFDQztJQUFWLEdBQUksV0FBUSxHQUNDO2FBQVIsS0FBSztZQUNOLENBQUUsTUFBTTthQUNQLEtBQUs7OztVQUNYLEtBQUs7O0VBRU4sUUFBTSxhQUFXO0VBRWpCLFFBQU0sU0FBTyxhQUNhLFVBQUE7O1VBQXpCLEVBQUksV0FBUzs7RUFFZCxRQUFNLFNBQU8sYUFDYyxVQUFBOztHQUExQixLQUFHLE1BQU0sTUFBSzs7RUFFZixRQUFNLE9BQUssYUFBYSxTQUFBLElBQ0c7O21CQUF2QixDQUFLLEVBQUksU0FBTyxRQUFPLFlBQVEsTUFBSyxvQkFDSTtXQUExQzs7O0VBRUYsUUFBTSxTQUFPLGFBQWMsU0FBQSxJQUFJLElBQ0c7O0dBQzVCLFlBQUosU0FBTyxRQUNJO0lBQVYsS0FBRyxNQUFNLE1BQU0sYUFBVyxJQUFJLElBQUksT0FBVTtVQUM3QyxZQUFBLFlBQVEsTUFBSyxNQUNHO0lBQWYsS0FBRyxVQUFNLE9BQU07R0FBQSxPQUVaO0lBQUgsaUJBQVc7a0JBQ0csU0FBTztJQUNyQixLQUFHLE1BQU07S0FDUixZQUFBLE9BQUcsZUFBYSxNQUNHO01BQWxCLGtCQUFZO01BQ1osS0FBRyxXQUFVLFNBQVE7YUFDckIsYUFBVyxJQUFJLElBQUksV0FBUztLQUFBLE9BRXpCO01BQUgsaUJBQVc7TUFDWCxLQUFHLFdBQVUsUUFBTzthQUNwQixhQUFXLElBQUksSUFBSSxXQUFTO0tBQUE7SUFBQTtHQUFBO0VBQUE7RUFFakMsUUFBTSxjQUFVLGFBQWEsU0FBQSxJQUNHOzttQkFBNUIsQ0FBSyxFQUFJLFNBQU8sUUFBTyxZQUFRLE1BQUssb0JBQ0k7SUFBMUMsY0FBVTtJQUVWLEtBQUcsTUFBTTtLQUNSLFlBQUEsY0FBVSxVQUNPO01BQWhCLFlBQVE7TUFDUixpQkFBVztNQUVYLFlBQVEsTUFBSztNQUNiLEtBQUcsV0FBVSxTQUFRO2FBQ3JCO0tBQUEsT0FFRzthQUNIOzs7V0FDRjs7O0VBS0Qsa0JBQVcscUJBQUEsRUFBRSxJQUNHO0dBQWYsWUFBUSxhQUFXLE9BQVUsT0FBVSxPQUFVO0dBQ2pELFNBQVM7R0FDVCxVQUFVO0dBQ1YsUUFBUTtHQUVSLFVBQVU7R0FFTixPQUFBO0lBQUc7S0FBQSxRQUFBLFFBQVEsSUFBSTtLQUNqQixZQUFBLE9BQUcsRUFBRSxJQUNDO01BQUwsY0FBUSxjQUFVLE1BQ0c7YUFBWDtPQUNUO01BQUE7TUFDRCxzQkFBZ0IseUJBQUEsWUFDUztPQUF4QixLQUFHLE1BQU8sUUFBTztXQUNWO2FBQ0U7TUFBQTtNQUVMLFlBQUosT0FBRyxJQUFJLG1CQUNhO09BQ25CLGlCQUFXO09BQ1gsS0FBRyxJQUFLLFFBQU87T0FDZixLQUFHLFdBQVUsU0FBUTtPQUNyQixjQUFRLGNBQVUsYUFDUTtZQUFsQjtjQUNFO1FBQ1Q7T0FBQTtXQUNNO09BQ1AsZ0JBQVk7TUFBQSxPQUVUO09BQUgsZ0JBQVk7TUFBQTtLQUFBLE9BQ2YsWUFBQSxPQUFHLEVBQUUsSUFDQztNQUFMLGNBQVEsZUFBVyxNQUNHO2FBQVo7T0FDVDtNQUFBO01BQ0QscUJBQWUsd0JBQUEsV0FDUTtPQUF0QixLQUFHLEtBQU0sU0FBUTtXQUNWO1lBQ0M7TUFBQTtNQUVKLFlBQUosT0FBRyxrQkFBZSxNQUNHO09BQ3BCLFVBQU07T0FDTixLQUFHLElBQUssU0FBUTtPQUNoQixLQUFHLElBQUssUUFBTztPQUNmLGNBQVEsZUFBVyxNQUNHO1lBQWQ7Y0FDRTtRQUNUO09BQUE7T0FDRCxlQUFXO01BQUEsT0FFUjtPQUFILGVBQVc7TUFBQTtLQUFBLE9BRVY7WUFBTTtNQUNUO0tBQUE7SUFBQTtHQUFBO0dBRUgsS0FBRyxLQUFNLFNBQVE7R0FDakIsS0FBRyxNQUFPLFFBQU87R0FDakIsS0FBRyxJQUFLLFFBQU87R0FDZixLQUFHLElBQUssU0FBUTtHQUNoQixLQUFHLEVBQUcsTUFBSztVQUNYO0VBQUE7RUFFRCxvQkFBYSx1QkFBQSxLQUNJO1VBQWhCLFdBQVM7O0VBQ1YscUJBQWMsd0JBQUEsS0FDSTtVQUFqQixXQUFTOztFQXZKWCx3QkFBQTtrQkFjQSIsImZpbGUiOiJhdC9NYXAvU3BsYXktVHJlZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9