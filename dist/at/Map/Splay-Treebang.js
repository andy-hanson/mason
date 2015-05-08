"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Bool","../../compare","../../control","../../js","../../Objbang","../../Type/Kind","../../Type/Tuple","../../Type/Wrap-Type","../at","../atbang","../at-Type","../Seq/Stream","./Map","./Mapbang","./Map-Type","./Sorted-Mapbang","../../bang","../../compare"],function(exports,Bool_0,compare_1,control_2,js_3,Obj_33_4,Kind_5,Tuple_6,Wrap_45Type_7,_64_8,_64_33_9,_64_45Type_10,Stream_11,Map_12,Map_33_13,Map_45Type_14,Sorted_45Map_33_15,_33_16,compare_17){
	exports._get=_ms.lazy(function(){
		const Bool=_ms.getDefaultExport(Bool_0),_$2=_ms.getModule(Bool_0),and=_ms.get(_$2,"and"),not=_ms.get(_$2,"not"),_$3=_ms.getModule(compare_1),_60_63=_ms.get(_$3,"<?"),_$4=_ms.getModule(control_2),_if=_ms.get(_$4,"if"),loop=_ms.get(_$4,"loop"),End_45Loop=_ms.get(_$4,"End-Loop"),_$5=_ms.getModule(js_3),defined_63=_ms.get(_$5,"defined?"),_$6=_ms.getModule(Obj_33_4),p_33=_ms.get(_$6,"p!"),_$7=_ms.getModule(Kind_5),kind_33=_ms.get(_$7,"kind!"),self_45kind_33=_ms.get(_$7,"self-kind!"),Tuple=_ms.getDefaultExport(Tuple_6),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_7),_$10=_ms.getModule(_64_8),empty_63=_ms.get(_$10,"empty?"),_$11=_ms.getModule(_64_33_9),empty_33=_ms.get(_$11,"empty!"),_$12=_ms.getModule(_64_45Type_10),empty=_ms.get(_$12,"empty"),Stream=_ms.getDefaultExport(Stream_11),_$14=_ms.getModule(Map_12),_63get=_ms.get(_$14,"?get"),keys=_ms.get(_$14,"keys"),_$15=_ms.getModule(Map_33_13),assoc_33=_ms.get(_$15,"assoc!"),un_45assoc_33=_ms.get(_$15,"un-assoc!"),Map_45Type=_ms.getDefaultExport(Map_45Type_14),Sorted_45Map_33=_ms.getDefaultExport(Sorted_45Map_33_15),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_16)
		}),_$19=_ms.lazyGetModule(_33_16),_33not=_ms.lazyProp(_$19,"!not"),_$20=_ms.lazyGetModule(compare_17),_61_63=_ms.lazyProp(_$20,"=?");
		const exports={};
		const Splay_45Node=Tuple(function(){
			const props=["key","val!","left!","right!"];
			return {
				props:props,
				displayName:"Splay-Node"
			}
		}());
		const Splay_45Tree_33=Wrap_45Type(function(){
			const doc="Default Sorted-Map! implementation.\nBinary tree that is good at accessing the same values many times.";
			return {
				doc:doc,
				displayName:"Splay-Tree!"
			}
		}());
		self_45kind_33(Splay_45Tree_33,Map_45Type,function(){
			const _k0=empty,_v0=function(){
				return Splay_45Tree_33(undefined)
			};
			return _ms.map(_k0,_v0)
		}());
		kind_33(Splay_45Tree_33,Sorted_45Map_33,function(){
			const _k0=empty_63,_v0=function(_){
				return not(defined_63(_.val))
			};
			const _k1=empty_33,_v1=function(_){
				return p_33(_,"val",undefined)
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
					const get_126=function*(_){
						if(_ms.bool(defined_63(_))){
							(yield* get_126(_["left!"]));
							(yield _.key);
							(yield* get_126(_["right!"]))
						} else {
							null
						}
					};
					return (yield* get_126(_.val))
				})
			};
			const _k4=assoc_33,_v4=function(_,key,val){
				if(_ms.bool(empty_63(_))){
					p_33(_,"val",Splay_45Node(key,val,undefined,undefined))
				} else if(_ms.bool(splay_33_63(_,key))){
					p_33(_.val,"val!",val)
				} else {
					const old_45root=_.val;
					_ms.unlazy(_33not)(empty_63,_);
					p_33(_,"val",function(){
						if(_ms.bool(_60_63(old_45root.key,key))){
							const old_45right=old_45root["right!"];
							p_33(old_45root,"right!",undefined);
							return Splay_45Node(key,val,old_45root,old_45right)
						} else {
							const old_45left=old_45root["left!"];
							p_33(old_45root,"left!",undefined);
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
							if(_ms.bool(has_45left_63(removed))){
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
		const splay_33_63=function(_,key){
			_ms.unlazy(_33not)(empty_63,_);
			const dummy=Splay_45Node(undefined,undefined,undefined,undefined);
			const start={
				cur:_.val,
				left:dummy,
				right:dummy
			};
			const _$96=loop(start,_ms.sub(splay_45step_33,key)),left=_$96.left,right=_$96.right,cur=_$96.cur,found=_$96.found;
			p_33(left,"right!",cur["left!"]);
			p_33(right,"left!",cur["right!"]);
			p_33(cur,"left!",dummy["right!"]);
			p_33(cur,"right!",dummy["left!"]);
			p_33(_,"val",cur);
			return _ms.checkContains(Bool,found,"res")
		};
		const splay_45step_33=function(key,_){
			const not_45found=function(end){
				return End_45Loop({
					cur:end,
					found:false,
					left:_.left,
					right:_.right
				})
			};
			return function(){
				if(_ms.bool(_60_63(key,_.cur.key))){
					return function(){
						if(_ms.bool(has_45left_63(_.cur))){
							const link_45right=function(new_45cur){
								p_33(_.right,"left!",new_45cur);
								return {
									cur:new_45cur["left!"],
									left:_.left,
									right:new_45cur
								}
							};
							return function(){
								if(_ms.bool(_60_63(key,_.cur["left!"].key))){
									const tmp=_.cur["left!"];
									p_33(_.cur,"left!",tmp["right!"]);
									p_33(tmp,"right!",_.cur);
									return function(){
										if(_ms.bool(has_45left_63(tmp))){
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
				} else if(_ms.bool(_60_63(_.cur.key,key))){
					return function(){
						if(_ms.bool(has_45right_63(_.cur))){
							const link_45left=function(new_45cur){
								p_33(_.left,"right!",new_45cur);
								return {
									cur:new_45cur["right!"],
									left:new_45cur,
									right:_.right
								}
							};
							return function(){
								if(_ms.bool(_60_63(_.cur["right!"].key,key))){
									const tmp=_.cur["right!"];
									p_33(_.cur,"right!",tmp["left!"]);
									p_33(tmp,"left!",_.cur);
									return function(){
										if(_ms.bool(has_45right_63(tmp))){
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
					_ms.unlazy(_33)(_ms.unlazy(_61_63),key,_.cur.key);
					return End_45Loop({
						cur:_.cur,
						found:true,
						left:_.left,
						right:_.right
					})
				}
			}()
		};
		const has_45left_63=function(node){
			return defined_63(node["left!"])
		};
		const has_45right_63=function(node){
			return defined_63(node["right!"])
		};
		exports.default=Splay_45Tree_33;
		const displayName=exports.displayName="Splay-Tree!";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9TcGxheS1UcmVlIS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7aUNBcUJBOzs7OztFQUFBLG1CQUFhLGdCQUFLO0dBQ2pCLFlBQU8sQ0FBRyxNQUFNLE9BQU8sUUFBUTtVQURkOzs7OztFQUdsQixzQkFBYyxzQkFBUztHQUN0QixVQUNDO1VBRnFCOzs7OztFQUt2QixlQUFBLGdCQUFBLHFCQUErQjtHQUM5QixVQUFBLFVBQVUsVUFDVDtXQUFBLGdCQUFBO0dBQUE7OztFQUVGLFFBQUEsZ0JBQUEsMEJBQTZCO0dBQzVCLFVBQUEsYUFBVyxTQUFBLEVBQ1Y7V0FBQSxJQUFJLFdBQVU7O0dBQ2YsVUFBQSxhQUFXLFNBQUEsRUFDVjtXQUFBLEtBQUcsRUFBRyxNQUFOO0dBQUE7R0FDRCxVQUFBLFdBQVMsU0FBQSxFQUFFLElBQ1Y7V0FBQSxJQUFHLElBQUssSUFBQSxTQUFLO1lBQVUsWUFBUyxFQUFUO0lBQUE7WUFBa0I7OztHQUMxQyxVQUFBLFNBQVMsU0FBQSxFQUNSO1dBQUEsT0FBUyxXQUNSO0tBQUEsY0FBUyxVQUFBLEVBQUE7TUFBSyxZQUNiLFdBQUEsSUFBUztPQUNKLFFBQUEsUUFBSztPQUNMLE9BQUQ7T0FDQyxRQUFBLFFBQUs7YUFDTjtPQUNIO01BQUE7S0FBQTtZQUNFLFFBQUEsUUFBSzs7O0dBQ1gsVUFBQSxhQUFXLFNBQUEsRUFBRSxJQUFJLElBQ2hCO0lBQUssWUFDSixTQUFBLElBQU87S0FDTixLQUFHLEVBQUcsTUFBSyxhQUFBLElBQUEsSUFBQSxVQUFBO0lBQUEsT0FDWixZQUFBLFlBQVEsRUFBUixNQUFhO0tBQ1osS0FBRyxNQUFPLE9BQVY7SUFBQSxPQUNHO0tBQ0gsaUJBQVc7d0JBQ0wsU0FBWTtLQUNsQixLQUFHLEVBQUc7TUFDTCxZQUFBLE9BQUcsZUFBSCxNQUFtQjtPQUNsQixrQkFBWTtPQUNaLEtBQUEsV0FBYSxTQUFiO2NBQ0EsYUFBQSxJQUFBLElBQUEsV0FBQTtNQUFBLE9BQ0c7T0FDSCxpQkFBVztPQUNYLEtBQUEsV0FBYSxRQUFiO2NBQ0EsYUFBQSxJQUFBLElBQUEsV0FBQTtNQUFBO0tBQUE7SUFBQTtHQUFBO0dBQ0wsVUFBQSxrQkFBYyxTQUFBLEVBQUUsSUFDZjtXQUFBLElBQUcsSUFBSyxJQUFBLFNBQUs7WUFBVSxZQUFTLEVBQVQ7SUFBQTtzQkFBa0I7TUFDeEMsY0FBVTtNQUVWLEtBQUcsRUFBRztPQUNMLFlBQUEsY0FBQSxVQUFpQjtRQUNoQixZQUFRO1FBQ1IsaUJBQVc7UUFFWCxZQUFRLEVBQVI7UUFDQSxLQUFBLFdBQWEsU0FBYjtlQUNBO09BQUEsT0FDRztlQUVIOzs7YUFFRjs7Ozs7O0VBS0Ysa0JBQVcsU0FBTSxFQUFFLElBSWxCO3NCQUZDLFNBQVk7R0FFYixZQUFRLGFBQUEsVUFBQSxVQUFBLFVBQUE7R0FDUixZQUFRO1FBQThCO1NBQXhCO1VBQWE7R0FBQTtHQUMzQixXQUF1QixLQUFBLGNBQVcsZ0JBQVc7R0FDN0MsS0FBQSxLQUFTLFNBQVE7R0FDakIsS0FBQSxNQUFVLFFBQU87R0FDakIsS0FBQSxJQUFRLFFBQU87R0FDZixLQUFBLElBQVEsU0FBUTtHQUNoQixLQUFHLEVBQUcsTUFBTjs0QkFYVyxLQVlYOztFQUVELHNCQUFlLFNBQUEsSUFBSSxFQUNsQjtHQUFBLGtCQUFhLFNBQUEsSUFDWjtXQUFBLFdBQVM7U0FBbUI7V0FBWDtVQUFxQjtXQUFjOzs7O0lBRXBELFlBQUEsT0FBQSxJQUFPLFlBQVM7O01BRWQsWUFBQSxjQUFVLFFBQUs7T0FDZCxtQkFBYyxTQUFBLFVBQ2I7UUFBQSxLQUFHLFFBQVMsUUFBWjtlQUNBO2FBQU07Y0FBb0I7ZUFBYztRQUFBO09BQUE7O1FBRXhDLFlBQUEsT0FBQSxJQUFPLHFCQUFlO1NBRXJCLFVBQU07U0FDTixLQUFHLE1BQU8sUUFBTztTQUNqQixLQUFBLElBQVEsU0FBUTs7VUFFZixZQUFBLGNBQUEsTUFBYTtrQkFDWixhQUFBO1VBQUEsT0FDRztrQkFDSCxZQUFBO1VBQUE7U0FBQTtRQUFBLE9BQ0M7Z0JBQ0gsYUFBVzs7O2FBQ1Y7Y0FDSCxZQUFVOzs7V0FFYixZQUFBLE9BQUcsVUFBSCxNQUFnQjs7TUFFZCxZQUFBLGVBQVcsUUFBSztPQUNmLGtCQUFhLFNBQUEsVUFDWjtRQUFBLEtBQUcsT0FBUSxTQUFYO2VBQ0E7YUFBTTtjQUFxQjtlQUFlOzs7O1FBRTFDLFlBQUEsT0FBRyxvQkFBSCxNQUF1QjtTQUV0QixVQUFNO1NBQ04sS0FBRyxNQUFPLFNBQVE7U0FDbEIsS0FBQSxJQUFRLFFBQU87O1VBRWQsWUFBQSxlQUFBLE1BQWM7a0JBQ2IsWUFBQTtVQUFBLE9BQ0c7a0JBQ0gsWUFBQTtVQUFBO1NBQUE7UUFBQSxPQUNDO2dCQUNILFlBQVU7OzthQUNUO2NBQ0gsWUFBVTs7O1dBQ1Q7d0NBQ0csSUFBUztZQUNmLFdBQVM7VUFBa0I7WUFBVjtXQUFzQjtZQUFjOzs7OztFQUV4RCxvQkFBYSxTQUFBLEtBQ1o7VUFBQSxXQUFTOztFQUNWLHFCQUFjLFNBQUEsS0FDYjtVQUFBLFdBQVM7O2tCQUdYO0VBaEtBLHNDQUFBIiwiZmlsZSI6ImF0L01hcC9TcGxheS1UcmVlYmFuZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9