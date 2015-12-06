"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../compare","./../../js","./../../methods","./../at","./../at-Type","./Map","./Sorted-Map"],(exports,compare_0,js_1,methods_2,_64_3,_64_45Type_4,Map_5,Sorted_45Map_6)=>{
	exports._get=_ms.lazy(()=>{
		let compare=_ms.getDefaultExport(compare_0),_$0=_ms.getModule(compare_0),_60_63=_ms.get(_$0,"<?"),_$1=_ms.getModule(js_1),defined_63=_ms.get(_$1,"defined?"),_$2=_ms.getModule(methods_2),del_45sub_33=_ms.get(_$2,"del-sub!"),set_45sub_33=_ms.get(_$2,"set-sub!"),_$3=_ms.getModule(_64_3),empty_33=_ms.get(_$3,"empty!"),empty_63=_ms.get(_$3,"empty?"),iterator=_ms.get(_$3,"iterator"),_$4=_ms.getModule(_64_45Type_4),empty=_ms.get(_$4,"empty"),_$5=_ms.getModule(Map_5),_63get=_ms.get(_$5,"?get"),Sorted_45Map=_ms.getDefaultExport(Sorted_45Map_6);
		let Splay_45Tree=exports.default=(()=>{
			let _=class Splay_45Tree{
				static [_ms.symbol(empty)](){
					let _this=this;
					return new (_this)()
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
			_ms.kindDo(_,Sorted_45Map);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9NYXAvU3BsYXktVHJlZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVNBLGlDQUFrQjs7dUJBSWhCO1NBd0lVO1lBdElULEtBc0lTO0lBQUE7SUFwSUQsWUFBQTtTQW9JQzt1QkFwSUs7OztnQkFHaEI7U0FpSVc7S0FoSVYsZ0JBQWdCLHNCQUFBO01BQ1osR0FBQSxXQUFTLEdBQ0E7ZUFBSixZQUFXO2NBQ1osQ0FBRSxNQUFNO2VBQ1AsWUFBVzs7O1lBQ3BCLFlBMkhVOztnQkF6SFg7U0F5SFc7WUF4SFYsRUFBSSxXQXdITTs7Z0JBdEhYO1NBc0hXO0tBQUEsV0FySEQ7O2dCQUVWLFNBQU07U0FtSEs7WUFsSFAsQ0FBQSxDQUFLLEVBQUksU0FrSEYseUJBbEh5QixvQkFDSTthQWlIN0I7OztnQkE5R1gsZUFBVyxJQUFJO1NBOEdKO0tBNUdOLEdBQUgsU0E0R1MsT0EzR0U7TUEyR0YsV0EzR0MsS0FBSSxjQUFXLElBQUksSUFBSSxPQUFVO1lBQzNDLEdBMEdTLGlCQTFHQSxLQUNHO01BeUdILGVBekdLO0tBQUEsT0FFVjtNQUFILGVBdUdRO29CQXRHRCxTQXNHQztNQUFBLFdBcEdLO09BQVosR0FBQSxPQUFHLGVBQWEsS0FDRztRQUFsQixnQkFBWTtRQUNaLGlCQUFrQjtlQUNsQixLQUFJLGNBQVcsSUFBSSxJQUFJLFdBQVM7T0FBQSxPQUU3QjtRQUFILGVBQVc7UUFDWCxnQkFBaUI7ZUFDakIsS0FBSSxjQUFXLElBQUksSUFBSSxXQUFTO09BQUE7TUFBQTtLQUFBO0lBQUE7Z0JBR3JDLGVBQVU7U0EwRkM7WUF6RlAsQ0FBQSxDQUFLLEVBQUksU0F5RkYseUJBekZ5QixvQkFDSTtNQUF0QyxZQXdGUztNQUFBLFdBckZJO09BQVosR0FBQSxxQkFDaUI7UUFBaEIsVUFBUTtRQUNSLGVBQVc7UUFtRkosaUJBakZFO1FBQ1QsaUJBQWtCO2VBQ2xCO09BQUEsT0FFRztlQUNIOzs7YUFFRjs7O2NBSVc7U0FzRUY7S0FyRVYsVUFBUSxLQUFJLGNBQVcsT0FBVSxPQUFVLE9BQVU7S0FDckQsU0FBTztLQUNQLFVBQVE7S0FDUixRQWtFVTtLQWhFVixVQUNXO2FBQUE7T0FBTDtRQUFBLE1BQUEsUUFBUSxJQUFJO1FBQ2hCLEdBQUEsT0FBSSxFQUFDLEdBQ0M7U0FBRSxLQUFBLGlCQUNhO1VBQW5CLE9BQU07U0FBQTtTQUNQLG9CQUFnQix5QkFBQTtVQUNmLFdBQWM7Y0FDUDtnQkFDRTtTQUFBO1NBRU4sR0FBSCxPQUFHLElBQUksY0FDWTtVQUNsQixlQUFXO1VBQ1gsU0FBWTtVQUNaLGlCQUFrQjtVQUNYLEtBQUEsd0JBQ2tCO2VBQWpCO1dBQ1AsT0FBTTtVQUFBO2NBQ0E7VUFDUCxnQkFBWTtTQUFBLE9BRVQ7VUFBSCxnQkFBWTtTQUFBO1FBQUEsT0FDZixHQUFBLE9BQUcsRUFBRyxHQUNBO1NBQUUsS0FBQSxrQkFDYztVQUFwQixPQUFNO1NBQUE7U0FDUCxtQkFBZSx3QkFBQTtVQUNkLFdBQWM7Y0FDUDtlQUNDO1NBQUE7U0FFTCxHQUFILE9BQUcsY0FBYyxLQUNHO1VBQ25CLFFBQU07VUFDTixVQUFhO1VBQ2IsU0FBWTtVQUNMLEtBQUEsa0JBQ2M7ZUFBYjtXQUNQLE9BQU07VUFBQTtVQUNQLGVBQVc7U0FBQSxPQUVSO1VBQUgsZUFBVztTQUFBO1FBQUEsT0FFVjtTQUFILE9BQU07UUFBQTtPQUFBO01BQUE7S0FBQTtLQUVULFdBQWM7S0FDZCxXQUFjO0tBQ2QsU0FBWTtLQUNaLFVBQWE7S0FpQkgsV0FoQkQ7WUFDVDtJQUFBO0dBQUE7Z0JBN0hxQjs7O0VBa0l0QixpQkFDa0I7R0FBUCxZQUFBLElBQUssSUFBSSxLQUFLO1FBU2Q7O29CQUFBLFlBUkY7b0JBUUUsYUFQRDtvQkFPQyxjQU5BO0dBQUE7b0JBR0k7UUFHSjtXQUhULFdBR1M7O3FCQUFLO1FBQUw7V0FBVCxXQUFTIiwiZmlsZSI6ImF0L01hcC9TcGxheS1UcmVlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
