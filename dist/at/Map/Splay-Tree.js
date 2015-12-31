"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../compare","./../../js","./../../methods","./../at","./Map","./Sorted-Map"],(exports,compare_0,js_1,methods_2,_64_3,Map_4,Sorted_45Map_5)=>{
	exports._get=_ms.lazy(()=>{
		let compare=_ms.getDefaultExport(compare_0),_$0=_ms.getModule(compare_0),_60_63=_ms.get(_$0,"<?"),_$1=_ms.getModule(js_1),defined_63=_ms.get(_$1,"defined?"),_$2=_ms.getModule(methods_2),del_45sub_33=_ms.get(_$2,"del-sub!"),set_45sub_33=_ms.get(_$2,"set-sub!"),_$3=_ms.getModule(_64_3),empty=_ms.get(_$3,"empty"),empty_33=_ms.get(_$3,"empty!"),empty_63=_ms.get(_$3,"empty?"),iterator=_ms.get(_$3,"iterator"),_$4=_ms.getModule(Map_4),_63get=_ms.get(_$4,"?get"),Sorted_45Map=_ms.getDefaultExport(Sorted_45Map_5);
		let Splay_45Tree=exports.default=(()=>{
			let _=class Splay_45Tree{
				static [_ms.symbol(empty)](){
					let _this=this;
					return new (_this)(void 0)
				}
				constructor(root){
					let _this=this;
					_ms.checkInstance(Splay_45Node,root,"root");
					_ms.newProperty(this,"root",root)
				}
				[_ms.symbol(iterator)](){
					let _this=this;
					let node_45iter=function* node_45iter(_){
						if(defined_63(_)){
							(yield* node_45iter(_.left));
							(yield [_.key,_.val]);
							(yield* node_45iter(_.right))
						}
					};
					return node_45iter(_this.root)
				}
				[_ms.symbol(empty_63)](){
					let _this=this;
					return ! defined_63(_this.root)
				}
				[_ms.symbol(empty_33)](){
					let _this=this;
					_this.root=void 0
				}
				[_ms.symbol(_63get)](key){
					let _this=this;
					return ((! empty_63(_this)&&_this["splay!?"](key))?_ms.some((()=>{
						return _this.root.val
					})()):_ms.None)
				}
				[_ms.symbol(set_45sub_33)](key,val){
					let _this=this;
					if(empty_63(_this)){
						_this.root=new (Splay_45Node)(key,val,void 0,void 0)
					} else if(_this["splay!?"](key)){
						_this.root.val=val
					} else {
						let old_45root=_this.val;
						_ms.assertNot(empty_63,_this);
						_this.root=(()=>{
							if(_60_63(old_45root.key,key)){
								let old_45right=old_45root.right;
								old_45root.right=void 0;
								return new (Splay_45Node)(key,val,old_45root,old_45right)
							} else {
								let old_45left=old_45root.left;
								old_45root.left=void 0;
								return new (Splay_45Node)(key,val,old_45left,old_45root)
							}
						})()
					}
				}
				[_ms.symbol(del_45sub_33)](key){
					let _this=this;
					return ((! empty_63(_this)&&_this["splay!?"](key))?_ms.some((()=>{
						let removed=_this.root;
						_this.root=(()=>{
							if(removed["has-left?"]){
								let right=removed.right;
								let new_45root=removed.left;
								_this["splay!?"](key);
								new_45root.right=right;
								return new_45root
							} else {
								return removed.right
							}
						})();
						return removed.val
					})()):_ms.None)
				}
				"splay!?"(key){
					let _this=this;
					let dummy=new (Splay_45Node)(void 0,void 0,void 0,void 0);
					let left=dummy;
					let right=dummy;
					let cur=_this.root;
					let found=(()=>{
						for(;;){
							{
								let _=compare(key,cur.key);
								if(_60_63(_,0)){
									if(! cur["has-left?"]){
										return false
									};
									let link_45right_33=function link_45right_33(new_45right){
										right.left=new_45right;
										cur=new_45right.left;
										right=new_45right
									};
									if(_60_63(key,cur.left.key)){
										let old_45left=cur.left;
										cur.left=old_45left.right;
										old_45left.right=cur;
										if(! old_45left["has-left?"]){
											cur=old_45left;
											return false
										};
										cur=old_45left;
										link_45right_33(old_45left)
									} else {
										link_45right_33(cur)
									}
								} else if(_60_63(0,_)){
									if(! cur["has-right?"]){
										return false
									};
									let link_45left_33=function link_45left_33(new_45left){
										left.right=new_45left;
										cur=new_45left.right;
										left=new_45left
									};
									if(_60_63(cur.right.key,key)){
										let tmp=cur.right;
										cur.right=tmp.left;
										tmp.left=cur;
										if(! tmp["has-right?"]){
											cur=tmp;
											return false
										};
										link_45left_33(tmp)
									} else {
										link_45left_33(cur)
									}
								} else {
									return true
								}
							}
						}
					})();
					left.right=cur.left;
					right.left=cur.right;
					cur.left=dummy.right;
					cur.right=dummy.left;
					_this.root=cur;
					return found
				}
			};
			_ms.traitDo(_,Sorted_45Map);
			return _
		})();
		let Splay_45Node=class Splay_45Node{
			constructor(key,val,left,right){
				let _this=this;
				_ms.newProperty(this,"key",key);
				_ms.newProperty(_this,"val",val);
				_ms.newProperty(_this,"left",left);
				_ms.newProperty(_this,"right",right)
			}
			get "has-left?"(){
				let _this=this;
				return defined_63(_this.left)
			}
			get "has-right?"(){
				let _this=this;
				return defined_63(_this.right)
			}
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9NYXAvU3BsYXktVHJlZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVFBLGlDQUFrQjs7dUJBSWhCLFNBQ087U0FxSUc7WUFySVQsS0FxSVMsT0FySUE7O0lBRUQsWUFBQSxLQUNnQjtTQWtJZjt1QkFuSUs7OztnQkFHaEIsWUFDVTtTQStIQztLQS9IVixnQkFBZ0Isc0JBQUEsRUFDQTtNQUFaLEdBQUEsV0FBUyxHQUNBO2VBQUosWUFBVztjQUNaLENBQUUsTUFBTTtlQUNQLFlBQVc7OztZQUNwQixZQTBIVTs7Z0JBeEhYLFlBQ1E7U0F1SEc7WUF2SFYsRUFBSSxXQXVITTs7Z0JBckhYLFlBQ1M7U0FvSEU7S0FBQSxXQXBIRDs7Z0JBRVYsU0FBTSxJQUNHO1NBaUhFO1lBakhQLENBQUEsQ0FBSyxFQUFJLFNBaUhGLHlCQWpIeUIsb0JBQ0k7YUFnSDdCOzs7Z0JBN0dYLGVBQVcsSUFBSSxJQUNHO1NBNEdQO0tBM0dOLEdBQUgsU0EyR1MsT0ExR0U7TUEwR0YsV0ExR0MsS0FBSSxjQUFXLElBQUksSUFBSSxPQUFVO1lBQzNDLEdBeUdTLGlCQXpHQSxLQUNHO01Bd0dILGVBeEdLO0tBQUEsT0FFVjtNQUFILGVBc0dRO29CQXJHRCxTQXFHQztNQUFBLFdBbkdLO09BQVosR0FBQSxPQUFHLGVBQWEsS0FDRztRQUFsQixnQkFBWTtRQUNaLGlCQUFrQjtlQUNsQixLQUFJLGNBQVcsSUFBSSxJQUFJLFdBQVM7T0FBQSxPQUU3QjtRQUFILGVBQVc7UUFDWCxnQkFBaUI7ZUFDakIsS0FBSSxjQUFXLElBQUksSUFBSSxXQUFTO09BQUE7TUFBQTtLQUFBO0lBQUE7Z0JBR3JDLGVBQVUsSUFDRztTQXdGRjtZQXhGUCxDQUFBLENBQUssRUFBSSxTQXdGRix5QkF4RnlCLG9CQUNJO01BQXRDLFlBdUZTO01BQUEsV0FwRkk7T0FBWixHQUFBLHFCQUNpQjtRQUFoQixVQUFRO1FBQ1IsZUFBVztRQWtGSixpQkFoRkU7UUFDVCxpQkFBa0I7ZUFDbEI7T0FBQSxPQUVHO2VBQ0g7OzthQUVGOzs7Y0FJVyxJQUNHO1NBb0VMO0tBcEVWLFVBQVEsS0FBSSxjQUFXLE9BQVUsT0FBVSxPQUFVO0tBQ3JELFNBQU87S0FDUCxVQUFRO0tBQ1IsUUFpRVU7S0EvRFYsVUFDVzthQUFBO09BQUw7UUFBQSxNQUFBLFFBQVEsSUFBSTtRQUNoQixHQUFBLE9BQUksRUFBQyxHQUNDO1NBQUUsS0FBQSxpQkFDYTtVQUFuQixPQUFNO1NBQUE7U0FDUCxvQkFBZ0IseUJBQUEsWUFDUztVQUF4QixXQUFjO2NBQ1A7Z0JBQ0U7U0FBQTtTQUVOLEdBQUgsT0FBRyxJQUFJLGNBQ1k7VUFDbEIsZUFBVztVQUNYLFNBQVk7VUFDWixpQkFBa0I7VUFDWCxLQUFBLHdCQUNrQjtlQUFqQjtXQUNQLE9BQU07VUFBQTtjQUNBO1VBQ1AsZ0JBQVk7U0FBQSxPQUVUO1VBQUgsZ0JBQVk7U0FBQTtRQUFBLE9BQ2YsR0FBQSxPQUFHLEVBQUcsR0FDQTtTQUFFLEtBQUEsa0JBQ2M7VUFBcEIsT0FBTTtTQUFBO1NBQ1AsbUJBQWUsd0JBQUEsV0FDUTtVQUF0QixXQUFjO2NBQ1A7ZUFDQztTQUFBO1NBRUwsR0FBSCxPQUFHLGNBQWMsS0FDRztVQUNuQixRQUFNO1VBQ04sVUFBYTtVQUNiLFNBQVk7VUFDTCxLQUFBLGtCQUNjO2VBQWI7V0FDUCxPQUFNO1VBQUE7VUFDUCxlQUFXO1NBQUEsT0FFUjtVQUFILGVBQVc7U0FBQTtRQUFBLE9BRVY7U0FBSCxPQUFNO1FBQUE7T0FBQTtNQUFBO0tBQUE7S0FFVCxXQUFjO0tBQ2QsV0FBYztLQUNkLFNBQVk7S0FDWixVQUFhO0tBZ0JILFdBZkQ7WUFDVDtJQUFBO0dBQUE7aUJBNUhzQjs7O0VBZ0l2QixpQkFDa0I7R0FBUCxZQUFBLElBQUssSUFBSSxLQUFLLE1BQ0s7UUFRbkI7O29CQUFBLFlBUkY7b0JBUUUsYUFQRDtvQkFPQyxjQU5BO0dBQUE7b0JBR0k7UUFHSjtXQUhULFdBR1M7O3FCQUFLO1FBQUw7V0FBVCxXQUFTIiwiZmlsZSI6ImF0L01hcC9TcGxheS1UcmVlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
