"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Boolean","../../compare","../../control","../../js","../../Objectbang","../../Type/Kind","../../Type/Tuple","../../Type/Wrap-Type","../at","../atbang","../at-Type","../Seq/Stream","./Map","./Mapbang","./Map-Type","./Sorted-Mapbang","../../bang","../../compare"],function(exports,Boolean_0,compare_1,control_2,js_3,Object_33_4,Kind_5,Tuple_6,Wrap_45Type_7,_64_8,_64_33_9,_64_45Type_10,Stream_11,Map_12,Map_33_13,Map_45Type_14,Sorted_45Map_33_15,_33_16,compare_17){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_$2.and,not=_$2.not,_$3=_ms.getModule(compare_1),_60_63=_$3["<?"],_$4=_ms.getModule(control_2),_if=_$4.if,loop=_$4.loop,End_45Loop=_$4["End-Loop"],_$5=_ms.getModule(js_3),defined_63=_$5["defined?"],_$6=_ms.getModule(Object_33_4),p_33=_$6["p!"],_$7=_ms.getModule(Kind_5),kind_33=_$7["kind!"],self_45kind_33=_$7["self-kind!"],Tuple=_ms.getDefaultExport(Tuple_6),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_7),_$10=_ms.getModule(_64_8),empty_63=_$10["empty?"],_$11=_ms.getModule(_64_33_9),empty_33=_$11["empty!"],_$12=_ms.getModule(_64_45Type_10),empty=_$12.empty,Stream=_ms.getDefaultExport(Stream_11),_$14=_ms.getModule(Map_12),_63get=_$14["?get"],keys=_$14.keys,_$15=_ms.getModule(Map_33_13),assoc_33=_$15["assoc!"],un_45assoc_33=_$15["un-assoc!"],Map_45Type=_ms.getDefaultExport(Map_45Type_14),Sorted_45Map_33=_ms.getDefaultExport(Sorted_45Map_33_15),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_16)
		}),_$19=_ms.lazyGetModule(_33_16),_33not=_ms.lazyProp(_$19,"!not"),_$20=_ms.lazyGetModule(compare_17),_61_63=_ms.lazyProp(_$20,"=?");
		const Splay_45Node=Tuple(function(){
			const props=["key","val!","left!","right!"];
			return {
				props:props,
				name:"Splay-Node"
			}
		}());
		const Splay_45Tree_33=Wrap_45Type(function(){
			const doc="Default Sorted-Map! implementation.\nBinary tree that is good at accessing the same values many times.";
			return {
				doc:doc,
				name:"Splay-Tree!"
			}
		}());
		self_45kind_33(Splay_45Tree_33,Map_45Type,function(){
			const _k0=empty,_v0=function(){
				return Splay_45Tree_33(void 0)
			};
			return _ms.map(_k0,_v0)
		}());
		kind_33(Splay_45Tree_33,Sorted_45Map_33,function(){
			const _k0=empty_63,_v0=function(_){
				return not(defined_63(_.val))
			};
			const _k1=empty_33,_v1=function(_){
				return p_33(_,"val",void 0)
			};
			const _k2=_63get,_v2=function(_,key){
				return _if(and(not(empty_63(_)),_ms.lazy(function(){
					return splay_33_63(_,key)
				})),_ms.lazy(function(){
					return _.val["val!"]
				}))
			};
			const _k3=keys,_v3=function(_){
				return Stream(function*(){
					const get_126=function* get_126(_){
						if(defined_63(_)){
							(yield* get_126(_["left!"]));
							(yield _.key);
							(yield* get_126(_["right!"]))
						}
					};
					return (yield* get_126(_.val))
				})
			};
			const _k4=assoc_33,_v4=function(_,key,val){
				if(empty_63(_)){
					p_33(_,"val",Splay_45Node(key,val,void 0,void 0))
				} else if(splay_33_63(_,key)){
					p_33(_.val,"val!",val)
				} else {
					const old_45root=_.val;
					p_33(_,"val",function(){
						if(_60_63(old_45root.key,key)){
							const old_45right=old_45root["right!"];
							p_33(old_45root,"right!",void 0);
							return Splay_45Node(key,val,old_45root,old_45right)
						} else {
							const old_45left=old_45root["left!"];
							p_33(old_45root,"left!",void 0);
							return Splay_45Node(key,val,old_45left,old_45root)
						}
					}())
				}
			};
			const _k5=un_45assoc_33,_v5=function(_,key){
				return _if(and(not(empty_63(_)),_ms.lazy(function(){
					return splay_33_63(_,key)
				})),_ms.lazy(function(){
					return function(){
						const removed=_.val;
						p_33(_,"val",function(){
							if(has_45left_63(removed)){
								const right=removed.right;
								const new_45root=removed.left;
								splay_33_63(_,key);
								p_33(new_45root,"right!",right);
								return new_45root
							} else {
								return removed.right
							}
						}());
						return removed.val
					}()
				}))
			};
			return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3,_k4,_v4,_k5,_v5)
		}());
		const splay_33_63=function splay_33_63(_,key){
			const dummy=Splay_45Node(void 0,void 0,void 0,void 0);
			const start={
				left:dummy,
				right:dummy,
				cur:_.val
			};
			const _$94=loop(start,_ms.sub(splay_45step_33,key)),left=_$94.left,right=_$94.right,cur=_$94.cur,found=_$94.found;
			p_33(left,"right!",cur["left!"]);
			p_33(right,"left!",cur["right!"]);
			p_33(cur,"left!",dummy["right!"]);
			p_33(cur,"right!",dummy["left!"]);
			p_33(_,"val",cur);
			return found
		};
		const splay_45step_33=function splay_45step_33(key,_){
			const not_45found=function not_45found(end){
				return End_45Loop({
					found:false,
					cur:end,
					left:_.left,
					right:_.right
				})
			};
			return function(){
				if(_60_63(key,_.cur.key)){
					return function(){
						if(has_45left_63(_.cur)){
							const link_45right=function link_45right(new_45cur){
								p_33(_.right,"left!",new_45cur);
								return {
									cur:new_45cur["left!"],
									left:_.left,
									right:new_45cur
								}
							};
							return function(){
								if(_60_63(key,_.cur["left!"].key)){
									const tmp=_.cur["left!"];
									p_33(_.cur,"left!",tmp["right!"]);
									p_33(tmp,"right!",_.cur);
									return function(){
										if(has_45left_63(tmp)){
											return link_45right(tmp)
										} else {
											return not_45found(tmp)
										}
									}()
								} else {
									return link_45right(_.cur)
								}
							}()
						} else {
							return not_45found(_.cur)
						}
					}()
				} else if(_60_63(_.cur.key,key)){
					return function(){
						if(has_45right_63(_.cur)){
							const link_45left=function link_45left(new_45cur){
								p_33(_.left,"right!",new_45cur);
								return {
									cur:new_45cur["right!"],
									left:new_45cur,
									right:_.right
								}
							};
							return function(){
								if(_60_63(_.cur["right!"].key,key)){
									const tmp=_.cur["right!"];
									p_33(_.cur,"right!",tmp["left!"]);
									p_33(tmp,"left!",_.cur);
									return function(){
										if(has_45right_63(tmp)){
											return link_45left(tmp)
										} else {
											return not_45found(tmp)
										}
									}()
								} else {
									return link_45left(_.cur)
								}
							}()
						} else {
							return not_45found(_.cur)
						}
					}()
				} else {
					return End_45Loop({
						found:true,
						cur:_.cur,
						left:_.left,
						right:_.right
					})
				}
			}()
		};
		const has_45left_63=function has_45left_63(node){
			return defined_63(node["left!"])
		};
		const has_45right_63=function has_45right_63(node){
			return defined_63(node["right!"])
		};
		const name=exports.name="Splay-Tree!";
		exports.default=Splay_45Tree_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9TcGxheS1UcmVlIS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBcUJBLG1CQUFhLGdCQUNLO0dBQWpCLFlBQU8sQ0FBRyxNQUFNLE9BQU8sUUFBUTs7Ozs7O0VBRWhDLHNCQUFjLHNCQUNTO0dBQXRCLFVBQ0M7Ozs7OztFQUdGLGVBQVcsZ0JBQVkscUJBQ1E7R0FBOUIsVUFBQSxVQUNVLFVBQUE7V0FBVCxnQkFBWTs7OztFQUVkLFFBQU0sZ0JBQVksMEJBQ1c7R0FBNUIsVUFBQSxhQUFXLFNBQUEsRUFDQztXQUFYLElBQUssV0FBUzs7R0FDZixVQUFBLGFBQVcsU0FBQSxFQUNDO1dBQVgsS0FBRyxFQUFHLE1BQUs7O0dBQ1osVUFBQSxXQUFTLFNBQUEsRUFBRSxJQUNHO1dBQWIsSUFBSSxJQUFLLElBQUksU0FBQTtZQUFXLFlBQVEsRUFBRTtJQUFBO1lBQU87OztHQUMxQyxVQUFBLFNBQVMsU0FBQSxFQUNDO1dBQVQsT0FDUyxXQUFBO0tBQVIsY0FBUyxrQkFBQSxFQUNDO01BQVQsR0FBSSxXQUFBLEdBQ1M7ZUFBUixRQUFLO2NBQ047ZUFDQyxRQUFLOzs7WUFDUCxRQUFBLFFBQUs7OztHQUNYLFVBQUEsYUFBVyxTQUFBLEVBQUUsSUFBSSxJQUNHO0lBQ2QsR0FBSixTQUFBLEdBQ087S0FBTixLQUFHLEVBQUcsTUFBTSxhQUFXLElBQUksSUFBSSxPQUFVO1dBQzFDLEdBQUEsWUFBUSxFQUFFLEtBQ0c7S0FBWixLQUFHLE1BQU8sT0FBTTtJQUFBLE9BRWI7S0FBSCxpQkFBVztLQUVYLEtBQUcsRUFBRztNQUNMLEdBQUEsT0FBRyxlQUFhLEtBQ0c7T0FBbEIsa0JBQVk7T0FDWixLQUFHLFdBQVUsU0FBUTtjQUNyQixhQUFXLElBQUksSUFBSSxXQUFTO01BQUEsT0FFekI7T0FBSCxpQkFBVztPQUNYLEtBQUcsV0FBVSxRQUFPO2NBQ3BCLGFBQVcsSUFBSSxJQUFJLFdBQVM7TUFBQTtLQUFBO0lBQUE7R0FBQTtHQUNqQyxVQUFBLGtCQUFjLFNBQUEsRUFBRSxJQUNHO1dBQWxCLElBQUksSUFBSyxJQUFJLFNBQUE7WUFBVyxZQUFRLEVBQUU7SUFBQTtzQkFDTztNQUF4QyxjQUFVO01BRVYsS0FBRyxFQUFHO09BQ0wsR0FBQSxjQUFVLFNBQ087UUFBaEIsWUFBUTtRQUNSLGlCQUFXO1FBRVgsWUFBUSxFQUFFO1FBQ1YsS0FBRyxXQUFVLFNBQVE7ZUFDckI7T0FBQSxPQUVHO2VBQ0g7OzthQUVGOzs7Ozs7RUFLRixrQkFBVyxxQkFBUyxFQUFFLElBSXJCO0dBQUEsWUFBUSxhQUFXLE9BQVUsT0FBVSxPQUFVO0dBQ2pELFlBQVE7U0FBTTtVQUFhO1FBQVc7O0dBQ3RDLFdBQXVCLEtBQUssY0FBTSxnQkFBWTtHQUM5QyxLQUFHLEtBQU0sU0FBUTtHQUNqQixLQUFHLE1BQU8sUUFBTztHQUNqQixLQUFHLElBQUssUUFBTztHQUNmLEtBQUcsSUFBSyxTQUFRO0dBQ2hCLEtBQUcsRUFBRyxNQUFLO1VBQ1g7RUFBQTtFQUVELHNCQUFlLHlCQUFBLElBQUksRUFDQztHQUFuQixrQkFBYSxxQkFBQSxJQUNHO1dBQWYsV0FBUztXQUFRO1NBQVc7VUFBVTtXQUFjOzs7O0lBRXBELEdBQUEsT0FBRyxJQUFJLFdBQ1M7O01BQ2QsR0FBQSxjQUFVLE9BQ0s7T0FBZCxtQkFBYyxzQkFBQSxVQUNPO1FBQXBCLEtBQUcsUUFBUyxRQUFPO2VBQ25CO2FBQU07Y0FBb0I7ZUFBYztRQUFBO09BQUE7O1FBRXhDLEdBQUEsT0FBRyxJQUFJLG9CQUNlO1NBQ3JCLFVBQU07U0FDTixLQUFHLE1BQU8sUUFBTztTQUNqQixLQUFHLElBQUssU0FBUTs7VUFFZixHQUFBLGNBQVUsS0FDRztrQkFBWixhQUFXO1VBQUEsT0FFUjtrQkFBSCxZQUFVO1VBQUE7U0FBQTtRQUFBLE9BRVQ7Z0JBQUgsYUFBVzs7O2FBRVY7Y0FBSCxZQUFVOzs7V0FFYixHQUFBLE9BQUcsVUFBVSxLQUNHOztNQUNkLEdBQUEsZUFBVyxPQUNLO09BQWYsa0JBQWEscUJBQUEsVUFDTztRQUFuQixLQUFHLE9BQVEsU0FBUTtlQUNuQjthQUFNO2NBQXFCO2VBQWU7Ozs7UUFFMUMsR0FBQSxPQUFHLG9CQUFpQixLQUNHO1NBQ3RCLFVBQU07U0FDTixLQUFHLE1BQU8sU0FBUTtTQUNsQixLQUFHLElBQUssUUFBTzs7VUFFZCxHQUFBLGVBQVcsS0FDRztrQkFBYixZQUFVO1VBQUEsT0FFUDtrQkFBSCxZQUFVO1VBQUE7U0FBQTtRQUFBLE9BRVQ7Z0JBQUgsWUFBVTs7O2FBRVQ7Y0FBSCxZQUFVOzs7V0FFVDtZQUNILFdBQVM7WUFBUTtVQUFVO1dBQVk7WUFBYzs7Ozs7RUFFeEQsb0JBQWEsdUJBQUEsS0FDSTtVQUFoQixXQUFTOztFQUNWLHFCQUFjLHdCQUFBLEtBQ0k7VUFBakIsV0FBUzs7RUEzSlgsd0JBQUE7a0JBOEpBIiwiZmlsZSI6ImF0L01hcC9TcGxheS1UcmVlYmFuZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9