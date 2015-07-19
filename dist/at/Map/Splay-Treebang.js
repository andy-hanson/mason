"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../js","../../Objectbang","../../Type/Js-Method","../../Type/Kind","../../Type/Tuple","../../Type/Wrap-Type","../at","../atbang","../at-Type","./Map","./Mapbang","./Map-Type","./Sorted-Mapbang"],function(exports,compare_0,js_1,Object_33_2,Js_45Method_3,Kind_4,Tuple_5,Wrap_45Type_6,_64_7,_64_33_8,_64_45Type_9,Map_10,Map_33_11,Map_45Type_12,Sorted_45Map_33_13){
	exports._get=_ms.lazy(function(){
		const compare=_ms.getDefaultExport(compare_0),_$2=_ms.getModule(compare_0),_60_63=_ms.get(_$2,"<?"),_$3=_ms.getModule(js_1),defined_63=_ms.get(_$3,"defined?"),_$4=_ms.getModule(Object_33_2),p_33=_ms.get(_$4,"p!"),_$5=_ms.getModule(Js_45Method_3),js_45impl_33=_ms.get(_$5,"js-impl!"),_$6=_ms.getModule(Kind_4),kind_33=_ms.get(_$6,"kind!"),self_45kind_33=_ms.get(_$6,"self-kind!"),Tuple=_ms.getDefaultExport(Tuple_5),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_6),_$9=_ms.getModule(_64_7),empty_63=_ms.get(_$9,"empty?"),iterator=_ms.get(_$9,"iterator"),_$10=_ms.getModule(_64_33_8),empty_33=_ms.get(_$10,"empty!"),_$11=_ms.getModule(_64_45Type_9),empty=_ms.get(_$11,"empty"),_$12=_ms.getModule(Map_10),_63get=_ms.get(_$12,"?get"),_$13=_ms.getModule(Map_33_11),assoc_33=_ms.get(_$13,"assoc!"),un_45assoc_33=_ms.get(_$13,"un-assoc!"),Map_45Type=_ms.getDefaultExport(Map_45Type_12),Sorted_45Map_33=_ms.getDefaultExport(Sorted_45Map_33_13);
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
					_ms.assertNot(empty_63,_);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9TcGxheS1UcmVlIS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQWdCQSxzQkFBYSxzQkFDUzs7R0FBckIsb0JBQ0M7OztFQUdGLG1CQUFhLGdCQUNLOztHQUFqQix3QkFBTyxDQUFHLE1BQU0sT0FBTyxRQUFROzs7RUFFaEMsZUFBVyxnQkFBWSxxQkFDUTs7bUJBQTlCLE1BQ1UsVUFBQTtXQUFULGdCQUFZOzs7O0VBRWQsYUFBUyxTQUFTLGdCQUNjLFVBQUE7O0dBQS9CLFdBQVUsZUFBQSxFQUNDO0lBQVYsR0FBSSxXQUFRLEdBQ0M7YUFBUixLQUFLO1lBQ04sQ0FBRSxNQUFNO2FBQ1AsS0FBSzs7O1VBQ1gsS0FBSzs7RUFFTixRQUFNLGdCQUFZLDBCQUNXOzttQkFBNUIsU0FBVyxTQUFBLEVBQ0M7V0FBWCxFQUFJLFdBQVM7O21CQUNkLFNBQVksU0FBQSxFQUNDO0lBQVosS0FBRyxFQUFHLE1BQUs7O21CQUNaLE9BQVMsU0FBQSxFQUFFLElBQ0c7b0JBQVYsQ0FBSyxFQUFJLFNBQU0sSUFBSSxZQUFRLEVBQUUsMEJBQ0k7WUFBbkM7OzttQkFDRixTQUFZLFNBQUEsRUFBRSxJQUFJLElBQ0c7SUFDZixZQUFKLFNBQU0sSUFDQztLQUFOLEtBQUcsRUFBRyxNQUFNLGFBQVcsSUFBSSxJQUFJLE9BQVU7V0FDMUMsWUFBQSxZQUFRLEVBQUUsTUFDRztLQUFaLEtBQUcsTUFBTyxPQUFNO0lBQUEsT0FFYjtLQUFILGlCQUFXO21CQUNHLFNBQU87S0FDckIsS0FBRyxFQUFHO01BQ0wsWUFBQSxPQUFHLGVBQWEsTUFDRztPQUFsQixrQkFBWTtPQUNaLEtBQUcsV0FBVSxTQUFRO2NBQ3JCLGFBQVcsSUFBSSxJQUFJLFdBQVM7TUFBQSxPQUV6QjtPQUFILGlCQUFXO09BQ1gsS0FBRyxXQUFVLFFBQU87Y0FDcEIsYUFBVyxJQUFJLElBQUksV0FBUztNQUFBO0tBQUE7SUFBQTtHQUFBO21CQUNqQyxjQUFjLFNBQUEsRUFBRSxJQUNHO29CQUFmLENBQUssRUFBSSxTQUFNLElBQUksWUFBUSxFQUFFLDBCQUNJO0tBQW5DLGNBQVU7S0FFVixLQUFHLEVBQUc7TUFDTCxZQUFBLGNBQVUsVUFDTztPQUFoQixZQUFRO09BQ1IsaUJBQVc7T0FFWCxZQUFRLEVBQUU7T0FDVixLQUFHLFdBQVUsU0FBUTtjQUNyQjtNQUFBLE9BRUc7Y0FDSDs7O1lBRUY7Ozs7O0VBS0Ysa0JBQVcscUJBQUEsRUFBRSxJQUNHO0dBQWYsWUFBUSxhQUFXLE9BQVUsT0FBVSxPQUFVO0dBQ2pELFNBQVM7R0FDVCxVQUFVO0dBQ1YsUUFBUTtHQUVSLFVBQVU7R0FFTixPQUFBO0lBQUc7S0FBQSxRQUFBLFFBQVEsSUFBSTtLQUNqQixZQUFBLE9BQUcsRUFBRSxJQUNDO01BQUwsY0FBUSxjQUFVLE1BQ0c7YUFBWDtPQUNUO01BQUE7TUFDRCxzQkFBZ0IseUJBQUEsWUFDUztPQUF4QixLQUFHLE1BQU8sUUFBTztXQUNWO2FBQ0U7TUFBQTtNQUVMLFlBQUosT0FBRyxJQUFJLG1CQUNhO09BQ25CLGlCQUFXO09BQ1gsS0FBRyxJQUFLLFFBQU87T0FDZixLQUFHLFdBQVUsU0FBUTtPQUNyQixjQUFRLGNBQVUsYUFDUTtZQUFsQjtjQUNFO1FBQ1Q7T0FBQTtXQUNNO09BQ1AsZ0JBQVk7TUFBQSxPQUVUO09BQUgsZ0JBQVk7TUFBQTtLQUFBLE9BQ2YsWUFBQSxPQUFHLEVBQUUsSUFDQztNQUFMLGNBQVEsZUFBVyxNQUNHO2FBQVo7T0FDVDtNQUFBO01BQ0QscUJBQWUsd0JBQUEsV0FDUTtPQUF0QixLQUFHLEtBQU0sU0FBUTtXQUNWO1lBQ0M7TUFBQTtNQUVKLFlBQUosT0FBRyxrQkFBZSxNQUNHO09BQ3BCLFVBQU07T0FDTixLQUFHLElBQUssU0FBUTtPQUNoQixLQUFHLElBQUssUUFBTztPQUNmLGNBQVEsZUFBVyxNQUNHO1lBQWQ7Y0FDRTtRQUNUO09BQUE7T0FDRCxlQUFXO01BQUEsT0FFUjtPQUFILGVBQVc7TUFBQTtLQUFBLE9BRVY7WUFBTTtNQUNUO0tBQUE7SUFBQTtHQUFBO0dBRUgsS0FBRyxLQUFNLFNBQVE7R0FDakIsS0FBRyxNQUFPLFFBQU87R0FDakIsS0FBRyxJQUFLLFFBQU87R0FDZixLQUFHLElBQUssU0FBUTtHQUNoQixLQUFHLEVBQUcsTUFBSztVQUNYO0VBQUE7RUFFRCxvQkFBYSx1QkFBQSxLQUNJO1VBQWhCLFdBQVM7O0VBQ1YscUJBQWMsd0JBQUEsS0FDSTtVQUFqQixXQUFTOztFQXJKWCx3QkFBQTtrQkFnQkEiLCJmaWxlIjoiYXQvTWFwL1NwbGF5LVRyZWViYW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=