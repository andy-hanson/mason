"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Boolean","../../compare","../../control","../../js","../../Objectbang","../../Type/Js-Method","../../Type/Kind","../../Type/Tuple","../../Type/Wrap-Type","../at","../atbang","../at-Type","../Seq/Stream","./Map","./Mapbang","./Map-Type","./Sorted-Mapbang","../../bang","../../compare"],function(exports,Boolean_0,compare_1,control_2,js_3,Object_33_4,Js_45Method_5,Kind_6,Tuple_7,Wrap_45Type_8,_64_9,_64_33_10,_64_45Type_11,Stream_12,Map_13,Map_33_14,Map_45Type_15,Sorted_45Map_33_16,_33_17,compare_18){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_ms.get(_$2,"and"),not=_ms.get(_$2,"not"),_$3=_ms.getModule(compare_1),_60_63=_ms.get(_$3,"<?"),_$4=_ms.getModule(control_2),_if=_ms.get(_$4,"if"),loop=_ms.get(_$4,"loop"),End_45Loop=_ms.get(_$4,"End-Loop"),_$5=_ms.getModule(js_3),defined_63=_ms.get(_$5,"defined?"),_$6=_ms.getModule(Object_33_4),p_33=_ms.get(_$6,"p!"),_$7=_ms.getModule(Js_45Method_5),js_45impl_33=_ms.get(_$7,"js-impl!"),_$8=_ms.getModule(Kind_6),kind_33=_ms.get(_$8,"kind!"),self_45kind_33=_ms.get(_$8,"self-kind!"),Tuple=_ms.getDefaultExport(Tuple_7),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_8),_$11=_ms.getModule(_64_9),empty_63=_ms.get(_$11,"empty?"),iterator=_ms.get(_$11,"iterator"),_$12=_ms.getModule(_64_33_10),empty_33=_ms.get(_$12,"empty!"),_$13=_ms.getModule(_64_45Type_11),empty=_ms.get(_$13,"empty"),Stream=_ms.getDefaultExport(Stream_12),_$15=_ms.getModule(Map_13),_63get=_ms.get(_$15,"?get"),keys=_ms.get(_$15,"keys"),_$16=_ms.getModule(Map_33_14),assoc_33=_ms.get(_$16,"assoc!"),un_45assoc_33=_ms.get(_$16,"un-assoc!"),Map_45Type=_ms.getDefaultExport(Map_45Type_15),Sorted_45Map_33=_ms.getDefaultExport(Sorted_45Map_33_16),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_17)
		}),_$20=_ms.lazyGetModule(_33_17),_33not=_ms.lazyProp(_$20,"!not"),_$21=_ms.lazyGetModule(compare_18),_61_63=_ms.lazyProp(_$21,"=?");
		const Splay_45Tree_33=Wrap_45Type(function(){
			const doc="Default Sorted-Map! implementation.\nBinary tree that is good at accessing the same values many times.";
			return {
				doc:doc,
				name:"Splay-Tree!"
			}
		}());
		const Splay_45Node=Tuple(function(){
			const props=["key","val!","left!","right!"];
			return {
				props:props,
				name:"Splay-Node"
			}
		}());
		self_45kind_33(Splay_45Tree_33,Map_45Type,function(){
			const _k0=empty,_v0=function(){
				return Splay_45Tree_33(void 0)
			};
			return _ms.map(_k0,_v0)
		}());
		js_45impl_33(iterator,Splay_45Tree_33,function(){
			const get_126=function* get_126(_){
				if(_ms.bool(defined_63(_))){
					(yield* get_126(_["left!"]));
					(yield [_.key,_["val!"]]);
					(yield* get_126(_["right!"]))
				}
			};
			return get_126(this.val)
		});
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
						if(_ms.bool(defined_63(_))){
							(yield* get_126(_["left!"]));
							(yield _.key);
							(yield* get_126(_["right!"]))
						}
					};
					return (yield* get_126(_.val))
				})
			};
			const _k4=assoc_33,_v4=function(_,key,val){
				if(_ms.bool(empty_63(_))){
					p_33(_,"val",Splay_45Node(key,val,void 0,void 0))
				} else if(_ms.bool(splay_33_63(_,key))){
					p_33(_.val,"val!",val)
				} else {
					const old_45root=_.val;
					_ms.unlazy(_33not)(empty_63,_);
					p_33(_,"val",function(){
						if(_ms.bool(_60_63(old_45root.key,key))){
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
		const splay_33_63=function splay_33_63(_,key){
			_ms.unlazy(_33not)(empty_63,_);
			const dummy=Splay_45Node(void 0,void 0,void 0,void 0);
			const start={
				left:dummy,
				right:dummy,
				cur:_.val
			};
			const _$103=loop(start,_ms.sub(splay_45step_33,key)),left=_$103.left,right=_$103.right,cur=_$103.cur,found=_$103.found;
			p_33(left,"right!",cur["left!"]);
			p_33(right,"left!",cur["right!"]);
			p_33(cur,"left!",dummy["right!"]);
			p_33(cur,"right!",dummy["left!"]);
			p_33(_,"val",cur);
			return _ms.checkContains(Boolean,found,"res")
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
				if(_ms.bool(_60_63(key,_.cur.key))){
					return function(){
						if(_ms.bool(has_45left_63(_.cur))){
							const link_45right=function link_45right(new_45cur){
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
							const link_45left=function link_45left(new_45cur){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9TcGxheS1UcmVlIS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBc0JBLHNCQUFjLHNCQUNTO0dBQXRCLFVBQ0M7Ozs7OztFQUdGLG1CQUFhLGdCQUNLO0dBQWpCLFlBQU8sQ0FBRyxNQUFNLE9BQU8sUUFBUTs7Ozs7O0VBRWhDLGVBQVcsZ0JBQVkscUJBQ1E7R0FBOUIsVUFBQSxVQUNVLFVBQUE7V0FBVCxnQkFBWTs7OztFQUVkLGFBQVMsU0FBUyxnQkFDYSxVQUFBO0dBQTlCLGNBQVMsa0JBQUEsRUFDQztJQUFULFlBQUksV0FBQSxJQUNTO2FBQVIsUUFBSztZQUNOLENBQUUsTUFBTTthQUNQLFFBQUs7OztVQUNYLFFBQUs7O0VBRU4sUUFBTSxnQkFBWSwwQkFDVztHQUE1QixVQUFBLGFBQVcsU0FBQSxFQUNDO1dBQVgsSUFBSyxXQUFTOztHQUNmLFVBQUEsYUFBVyxTQUFBLEVBQ0M7V0FBWCxLQUFHLEVBQUcsTUFBSzs7R0FDWixVQUFBLFdBQVMsU0FBQSxFQUFFLElBQ0c7V0FBYixJQUFJLElBQUssSUFBSSxTQUFBO1lBQVcsWUFBUSxFQUFFO0lBQUE7WUFBTzs7O0dBQzFDLFVBQUEsU0FBUyxTQUFBLEVBQ0M7V0FBVCxPQUNTLFdBQUE7S0FBUixjQUFTLGtCQUFBLEVBQ0M7TUFBVCxZQUFJLFdBQUEsSUFDUztlQUFSLFFBQUs7Y0FDTjtlQUNDLFFBQUs7OztZQUNQLFFBQUEsUUFBSzs7O0dBQ1gsVUFBQSxhQUFXLFNBQUEsRUFBRSxJQUFJLElBQ0c7SUFDZCxZQUFKLFNBQUEsSUFDTztLQUFOLEtBQUcsRUFBRyxNQUFNLGFBQVcsSUFBSSxJQUFJLE9BQVU7V0FDMUMsWUFBQSxZQUFRLEVBQUUsTUFDRztLQUFaLEtBQUcsTUFBTyxPQUFNO0lBQUEsT0FFYjtLQUFILGlCQUFXO3dCQUNBLFNBQU87S0FDbEIsS0FBRyxFQUFHO01BQ0wsWUFBQSxPQUFHLGVBQWEsTUFDRztPQUFsQixrQkFBWTtPQUNaLEtBQUcsV0FBVSxTQUFRO2NBQ3JCLGFBQVcsSUFBSSxJQUFJLFdBQVM7TUFBQSxPQUV6QjtPQUFILGlCQUFXO09BQ1gsS0FBRyxXQUFVLFFBQU87Y0FDcEIsYUFBVyxJQUFJLElBQUksV0FBUztNQUFBO0tBQUE7SUFBQTtHQUFBO0dBQ2pDLFVBQUEsa0JBQWMsU0FBQSxFQUFFLElBQ0c7V0FBbEIsSUFBSSxJQUFLLElBQUksU0FBQTtZQUFXLFlBQVEsRUFBRTtJQUFBO3NCQUNPO01BQXhDLGNBQVU7TUFFVixLQUFHLEVBQUc7T0FDTCxZQUFBLGNBQVUsVUFDTztRQUFoQixZQUFRO1FBQ1IsaUJBQVc7UUFFWCxZQUFRLEVBQUU7UUFDVixLQUFHLFdBQVUsU0FBUTtlQUNyQjtPQUFBLE9BRUc7ZUFDSDs7O2FBRUY7Ozs7OztFQUtGLGtCQUFXLHFCQUFTLEVBQUUsSUFJckI7c0JBRk0sU0FBTztHQUViLFlBQVEsYUFBVyxPQUFVLE9BQVUsT0FBVTtHQUNqRCxZQUFRO1NBQU07VUFBYTtRQUFXOztHQUN0QyxZQUF1QixLQUFLLGNBQU0sZ0JBQVk7R0FDOUMsS0FBRyxLQUFNLFNBQVE7R0FDakIsS0FBRyxNQUFPLFFBQU87R0FDakIsS0FBRyxJQUFLLFFBQU87R0FDZixLQUFHLElBQUssU0FBUTtHQUNoQixLQUFHLEVBQUcsTUFBSzs0QkFYQSxRQVlYOztFQUVELHNCQUFlLHlCQUFBLElBQUksRUFDQztHQUFuQixrQkFBYSxxQkFBQSxJQUNHO1dBQWYsV0FBUztXQUFRO1NBQVc7VUFBVTtXQUFjOzs7O0lBRXBELFlBQUEsT0FBRyxJQUFJLFlBQ1M7O01BQ2QsWUFBQSxjQUFVLFFBQ0s7T0FBZCxtQkFBYyxzQkFBQSxVQUNPO1FBQXBCLEtBQUcsUUFBUyxRQUFPO2VBQ25CO2FBQU07Y0FBb0I7ZUFBYztRQUFBO09BQUE7O1FBRXhDLFlBQUEsT0FBRyxJQUFJLHFCQUNlO1NBQ3JCLFVBQU07U0FDTixLQUFHLE1BQU8sUUFBTztTQUNqQixLQUFHLElBQUssU0FBUTs7VUFFZixZQUFBLGNBQVUsTUFDRztrQkFBWixhQUFXO1VBQUEsT0FFUjtrQkFBSCxZQUFVO1VBQUE7U0FBQTtRQUFBLE9BRVQ7Z0JBQUgsYUFBVzs7O2FBRVY7Y0FBSCxZQUFVOzs7V0FFYixZQUFBLE9BQUcsVUFBVSxNQUNHOztNQUNkLFlBQUEsZUFBVyxRQUNLO09BQWYsa0JBQWEscUJBQUEsVUFDTztRQUFuQixLQUFHLE9BQVEsU0FBUTtlQUNuQjthQUFNO2NBQXFCO2VBQWU7Ozs7UUFFMUMsWUFBQSxPQUFHLG9CQUFpQixNQUNHO1NBQ3RCLFVBQU07U0FDTixLQUFHLE1BQU8sU0FBUTtTQUNsQixLQUFHLElBQUssUUFBTzs7VUFFZCxZQUFBLGVBQVcsTUFDRztrQkFBYixZQUFVO1VBQUEsT0FFUDtrQkFBSCxZQUFVO1VBQUE7U0FBQTtRQUFBLE9BRVQ7Z0JBQUgsWUFBVTs7O2FBRVQ7Y0FBSCxZQUFVOzs7V0FFVDt3Q0FBUSxJQUFJO1lBQ2YsV0FBUztZQUFRO1VBQVU7V0FBWTtZQUFjOzs7OztFQUV4RCxvQkFBYSx1QkFBQSxLQUNJO1VBQWhCLFdBQVM7O0VBQ1YscUJBQWMsd0JBQUEsS0FDSTtVQUFqQixXQUFTOztFQXBLWCx3QkFBQTtrQkF1S0EiLCJmaWxlIjoiYXQvTWFwL1NwbGF5LVRyZWViYW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=