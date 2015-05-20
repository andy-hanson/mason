"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Boolean","../../compare","../../control","../../js","../../Objectbang","../../Type/Js-Method","../../Type/Kind","../../Type/Tuple","../../Type/Wrap-Type","../at","../atbang","../at-Type","./Map","./Mapbang","./Map-Type","./Sorted-Mapbang","../../bang"],function(exports,Boolean_0,compare_1,control_2,js_3,Object_33_4,Js_45Method_5,Kind_6,Tuple_7,Wrap_45Type_8,_64_9,_64_33_10,_64_45Type_11,Map_12,Map_33_13,Map_45Type_14,Sorted_45Map_33_15,_33_16){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_ms.get(_$2,"and"),not=_ms.get(_$2,"not"),compare=_ms.getDefaultExport(compare_1),_$3=_ms.getModule(compare_1),_60_63=_ms.get(_$3,"<?"),_$4=_ms.getModule(control_2),_if=_ms.get(_$4,"if"),_$5=_ms.getModule(js_3),defined_63=_ms.get(_$5,"defined?"),_$6=_ms.getModule(Object_33_4),p_33=_ms.get(_$6,"p!"),_$7=_ms.getModule(Js_45Method_5),js_45impl_33=_ms.get(_$7,"js-impl!"),_$8=_ms.getModule(Kind_6),kind_33=_ms.get(_$8,"kind!"),self_45kind_33=_ms.get(_$8,"self-kind!"),Tuple=_ms.getDefaultExport(Tuple_7),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_8),_$11=_ms.getModule(_64_9),empty_63=_ms.get(_$11,"empty?"),iterator=_ms.get(_$11,"iterator"),_$12=_ms.getModule(_64_33_10),empty_33=_ms.get(_$12,"empty!"),_$13=_ms.getModule(_64_45Type_11),empty=_ms.get(_$13,"empty"),_$14=_ms.getModule(Map_12),_63get=_ms.get(_$14,"?get"),_$15=_ms.getModule(Map_33_13),assoc_33=_ms.get(_$15,"assoc!"),un_45assoc_33=_ms.get(_$15,"un-assoc!"),Map_45Type=_ms.getDefaultExport(Map_45Type_14),Sorted_45Map_33=_ms.getDefaultExport(Sorted_45Map_33_15),_$19=_ms.lazyGetModule(_33_16),_33not=_ms.lazyProp(_$19,"!not");
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
			const iter=function* iter(_){
				if(_ms.bool(defined_63(_))){
					(yield* iter(_["left!"]));
					(yield [_.key,_["val!"]]);
					(yield* iter(_["right!"]))
				}
			};
			return iter(this.val)
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
			const _k3=assoc_33,_v3=function(_,key,val){
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
			const _k4=un_45assoc_33,_v4=function(_,key){
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
			return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3,_k4,_v4)
		}());
		const splay_33_63=function splay_33_63(_,key){
			const dummy=Splay_45Node(void 0,void 0,void 0,void 0);
			let left=dummy;
			let right=dummy;
			let cur=_.val;
			let found=null;
			while(true){
				{
					const _=compare(key,cur.key);
					if(_ms.bool(_60_63(_,0))){
						if(! _ms.bool(has_45left_63(cur))){
							found=false;
							break
						};
						const link_45right_33=function link_45right_33(new_45right){
							p_33(right,"left!",new_45right);
							cur=new_45right["left!"];
							right=new_45right
						};
						if(_ms.bool(_60_63(key,cur["left!"].key))){
							const old_45left=cur["left!"];
							p_33(cur,"left!",old_45left["right!"]);
							p_33(old_45left,"right!",cur);
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
							p_33(left,"right!",new_45left);
							cur=new_45left["right!"];
							left=new_45left
						};
						if(_ms.bool(_60_63(cur["right!"].key,key))){
							const tmp=cur["right!"];
							p_33(cur,"right!",tmp["left!"]);
							p_33(tmp,"left!",cur);
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
			p_33(left,"right!",cur["left!"]);
			p_33(right,"left!",cur["right!"]);
			p_33(cur,"left!",dummy["right!"]);
			p_33(cur,"right!",dummy["left!"]);
			p_33(_,"val",cur);
			return _ms.checkContains(Boolean,found,"res")
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9TcGxheS1UcmVlIS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQW9CQSxzQkFBYyxzQkFDUztHQUF0QixVQUNDOzs7Ozs7RUFHRixtQkFBYSxnQkFDSztHQUFqQixZQUFPLENBQUcsTUFBTSxPQUFPLFFBQVE7Ozs7OztFQUVoQyxlQUFXLGdCQUFZLHFCQUNRO0dBQTlCLFVBQUEsVUFDVSxVQUFBO1dBQVQsZ0JBQVk7Ozs7RUFFZCxhQUFTLFNBQVMsZ0JBQ2EsVUFBQTtHQUE5QixXQUFTLGVBQUEsRUFDQztJQUFULFlBQUksV0FBQSxJQUNTO2FBQVIsS0FBSztZQUNOLENBQUUsTUFBTTthQUNQLEtBQUs7OztVQUNYLEtBQUs7O0VBRU4sUUFBTSxnQkFBWSwwQkFDVztHQUE1QixVQUFBLGFBQVcsU0FBQSxFQUNDO1dBQVgsSUFBSyxXQUFTOztHQUNmLFVBQUEsYUFBVyxTQUFBLEVBQ0M7V0FBWCxLQUFHLEVBQUcsTUFBSzs7R0FDWixVQUFBLFdBQVMsU0FBQSxFQUFFLElBQ0c7V0FBYixJQUFJLElBQUssSUFBSSxTQUFBO1lBQVcsWUFBUSxFQUFFO0lBQUE7WUFBTzs7O0dBQzFDLFVBQUEsYUFBVyxTQUFBLEVBQUUsSUFBSSxJQUNHO0lBQ2QsWUFBSixTQUFBLElBQ087S0FBTixLQUFHLEVBQUcsTUFBTSxhQUFXLElBQUksSUFBSSxPQUFVO1dBQzFDLFlBQUEsWUFBUSxFQUFFLE1BQ0c7S0FBWixLQUFHLE1BQU8sT0FBTTtJQUFBLE9BRWI7S0FBSCxpQkFBVzt3QkFDQSxTQUFPO0tBQ2xCLEtBQUcsRUFBRztNQUNMLFlBQUEsT0FBRyxlQUFhLE1BQ0c7T0FBbEIsa0JBQVk7T0FDWixLQUFHLFdBQVUsU0FBUTtjQUNyQixhQUFXLElBQUksSUFBSSxXQUFTO01BQUEsT0FFekI7T0FBSCxpQkFBVztPQUNYLEtBQUcsV0FBVSxRQUFPO2NBQ3BCLGFBQVcsSUFBSSxJQUFJLFdBQVM7TUFBQTtLQUFBO0lBQUE7R0FBQTtHQUNqQyxVQUFBLGtCQUFjLFNBQUEsRUFBRSxJQUNHO1dBQWxCLElBQUksSUFBSyxJQUFJLFNBQUE7WUFBVyxZQUFRLEVBQUU7SUFBQTtzQkFDTztNQUF4QyxjQUFVO01BRVYsS0FBRyxFQUFHO09BQ0wsWUFBQSxjQUFVLFVBQ087UUFBaEIsWUFBUTtRQUNSLGlCQUFXO1FBRVgsWUFBUSxFQUFFO1FBQ1YsS0FBRyxXQUFVLFNBQVE7ZUFDckI7T0FBQSxPQUVHO2VBQ0g7OzthQUVGOzs7Ozs7RUFLRixrQkFBVyxxQkFBUyxFQUFFLElBQ0c7R0FBeEIsWUFBUSxhQUFXLE9BQVUsT0FBVSxPQUFVO0dBQ2pELFNBQVM7R0FDVCxVQUFVO0dBQ1YsUUFBUTtHQUVSLFVBQVU7R0FFTixXQUFBO0lBQUc7S0FBQSxRQUFBLFFBQVEsSUFBSTtLQUNqQixZQUFBLE9BQUcsRUFBRSxJQUNDO01BQUwsY0FBUSxjQUFVLE1BQ0c7YUFBWDtPQUNUO01BQUE7TUFDRCxzQkFBZSx5QkFBQSxZQUNTO09BQXZCLEtBQUcsTUFBTyxRQUFPO1dBQ1Y7YUFDRTtNQUFBO01BRUwsWUFBSixPQUFHLElBQUksbUJBQ2E7T0FDbkIsaUJBQVc7T0FDWCxLQUFHLElBQUssUUFBTztPQUNmLEtBQUcsV0FBVSxTQUFRO09BQ3JCLGNBQVEsY0FBVSxhQUNRO1lBQWxCO2NBQ0U7UUFDVDtPQUFBO1dBQ007T0FDUCxnQkFBWTtNQUFBLE9BRVQ7T0FBSCxnQkFBWTtNQUFBO0tBQUEsT0FDZixZQUFBLE9BQUcsRUFBRSxJQUNDO01BQUwsY0FBUSxlQUFXLE1BQ0c7YUFBWjtPQUNUO01BQUE7TUFDRCxxQkFBYyx3QkFBQSxXQUNRO09BQXJCLEtBQUcsS0FBTSxTQUFRO1dBQ1Y7WUFDQztNQUFBO01BRUosWUFBSixPQUFHLGtCQUFlLE1BQ0c7T0FDcEIsVUFBTTtPQUNOLEtBQUcsSUFBSyxTQUFRO09BQ2hCLEtBQUcsSUFBSyxRQUFPO09BQ2YsY0FBUSxlQUFXLE1BQ0c7WUFBZDtjQUNFO1FBQ1Q7T0FBQTtPQUNELGVBQVc7TUFBQSxPQUVSO09BQUgsZUFBVztNQUFBO0tBQUEsT0FFVjtZQUFNO01BQ1Q7S0FBQTtJQUFBO0dBQUE7R0FFSCxLQUFHLEtBQU0sU0FBUTtHQUNqQixLQUFHLE1BQU8sUUFBTztHQUNqQixLQUFHLElBQUssUUFBTztHQUNmLEtBQUcsSUFBSyxTQUFRO0dBQ2hCLEtBQUcsRUFBRyxNQUFLOzRCQTVEQSxRQTZEWDs7RUFFRCxvQkFBYSx1QkFBQSxLQUNJO1VBQWhCLFdBQVM7O0VBQ1YscUJBQWMsd0JBQUEsS0FDSTtVQUFqQixXQUFTOztFQXhKWCx3QkFBQTtrQkEwSkEiLCJmaWxlIjoiYXQvTWFwL1NwbGF5LVRyZWViYW5nLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=