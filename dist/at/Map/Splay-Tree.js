"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../compare","./../../js","./../../methods","./../at","./../at-Type","./Map","./Sorted-Map"],(exports,compare_0,js_1,methods_2,_64_3,_64_45Type_4,Map_5,Sorted_45Map_6)=>{
	exports._get=_ms.lazy(()=>{
		const compare=_ms.getDefaultExport(compare_0),_$0=_ms.getModule(compare_0),_60_63=_ms.get(_$0,"<?"),_$1=_ms.getModule(js_1),defined_63=_ms.get(_$1,"defined?"),_$2=_ms.getModule(methods_2),del_45sub_33=_ms.get(_$2,"del-sub!"),set_45sub_33=_ms.get(_$2,"set-sub!"),_$3=_ms.getModule(_64_3),empty_33=_ms.get(_$3,"empty!"),empty_63=_ms.get(_$3,"empty?"),iterator=_ms.get(_$3,"iterator"),_$4=_ms.getModule(_64_45Type_4),empty=_ms.get(_$4,"empty"),_$5=_ms.getModule(Map_5),_63get=_ms.get(_$5,"?get"),Sorted_45Map=_ms.getDefaultExport(Sorted_45Map_6);
		const Splay_45Tree=exports.default=(()=>{
			const _=class Splay_45Tree{
				static [_ms.symbol(empty)](){
					const _this=this;
					return new (_this)()
				}
				constructor(root){
					const _this=this;
					_ms.checkContains(Splay_45Node,root,"root");
					_ms.newProperty(this,"root",root)
				}
				[_ms.symbol(iterator)](){
					const _this=this;
					const node_45iter=function* node_45iter(_){
						if(defined_63(_)){
							(yield* node_45iter(_["left!"]));
							(yield [_.key,_["val!"]]);
							(yield* node_45iter(_["right!"]))
						}
					};
					return node_45iter(_this.root)
				}
				[_ms.symbol(empty_63)](){
					const _this=this;
					return ! defined_63(_this.root)
				}
				[_ms.symbol(empty_33)](){
					const _this=this;
					_this.root=void 0
				}
				[_ms.symbol(_63get)](key){
					const _this=this;
					return ((! empty_63(_this)&&splay_33_63(_this,key))?_ms.some((()=>{
						return _this.root["val!"]
					})()):_ms.None)
				}
				[_ms.symbol(set_45sub_33)](key,val){
					const _this=this;
					if(empty_63(_this)){
						_this.root=new (Splay_45Node)(key,val,void 0,void 0)
					} else if(splay_33_63(_this,key)){
						_this.root["val!"]=val
					} else {
						const old_45root=_this.val;
						_ms.assertNot(empty_63,_this);
						_this.root=(()=>{
							if(_60_63(old_45root.key,key)){
								const old_45right=old_45root["right!"];
								old_45root["right!"]=void 0;
								return new (Splay_45Node)(key,val,old_45root,old_45right)
							} else {
								const old_45left=old_45root["left!"];
								old_45root["left!"]=void 0;
								return new (Splay_45Node)(key,val,old_45left,old_45root)
							}
						})()
					}
				}
				[_ms.symbol(del_45sub_33)](key){
					const _this=this;
					return ((! empty_63(_this)&&splay_33_63(_this,key))?_ms.some((()=>{
						const removed=_this.root;
						_this.root=(()=>{
							if(has_45left_63(removed)){
								const right=removed.right;
								const new_45root=removed.left;
								splay_33_63(_this,key);
								new_45root["right!"]=right;
								return new_45root
							} else {
								return removed.right
							}
						})();
						return removed["val!"]
					})()):_ms.None)
				}
			};
			_ms.kindDo(_,Sorted_45Map);
			return _
		})();
		const Splay_45Node=class Splay_45Node{
			constructor(key,val_33,left_33,right_33){
				const _this=this;
				_ms.newProperty(this,"key",key);
				_ms.newMutableProperty(_this,"val!",val_33);
				_ms.newMutableProperty(_this,"left!",left_33);
				_ms.newMutableProperty(_this,"right!",right_33)
			}
		};
		const splay_33_63=function splay_33_63(_,key){
			const dummy=new (Splay_45Node)(void 0,void 0,void 0,void 0);
			let left=dummy;
			let right=dummy;
			let cur=_.root;
			const found=(()=>{
				for(;;){
					{
						const _=compare(key,cur.key);
						if(_60_63(_,0)){
							if(! has_45left_63(cur)){
								return false
							};
							const link_45right_33=function link_45right_33(new_45right){
								right["left!"]=new_45right;
								cur=new_45right["left!"];
								right=new_45right
							};
							if(_60_63(key,cur["left!"].key)){
								const old_45left=cur["left!"];
								cur["left!"]=old_45left["right!"];
								old_45left["right!"]=cur;
								if(! has_45left_63(old_45left)){
									cur=old_45left;
									return false
								};
								cur=old_45left;
								link_45right_33(old_45left)
							} else {
								link_45right_33(cur)
							}
						} else if(_60_63(0,_)){
							if(! has_45right_63(cur)){
								return false
							};
							const link_45left_33=function link_45left_33(new_45left){
								left["right!"]=new_45left;
								cur=new_45left["right!"];
								left=new_45left
							};
							if(_60_63(cur["right!"].key,key)){
								const tmp=cur["right!"];
								cur["right!"]=tmp["left!"];
								tmp["left!"]=cur;
								if(! has_45right_63(tmp)){
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
			left["right!"]=cur["left!"];
			right["left!"]=cur["right!"];
			cur["left!"]=dummy["right!"];
			cur["right!"]=dummy["left!"];
			_.root=cur;
			return found
		};
		const has_45left_63=function has_45left_63(node){
			return defined_63(node["left!"])
		};
		const has_45right_63=function has_45right_63(node){
			return defined_63(node["right!"])
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9NYXAvU3BsYXktVHJlZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVNBLG1DQUFrQjs7dUJBSWhCO1dBb0VDO1lBbkVBLEtBbUVBO0lBQUE7SUFqRVEsWUFBQTtXQWlFUjt1QkFqRWM7OztnQkFHaEI7V0E4REU7S0E3REQsa0JBQWUsc0JBQUE7TUFDWCxHQUFBLFdBQUEsR0FDUztlQUFQLFlBQVU7Y0FDWCxDQUFDLE1BQU07ZUFDTixZQUFVOzs7WUFDaEIsWUF3REM7O2dCQXRERjtXQXNERTtZQXJERCxFQUFJLFdBcURIOztnQkFuREY7V0FtREU7S0FBQSxXQWxEUTs7Z0JBRVYsU0FBTTtXQWdESjtZQS9DRSxDQUFBLENBQUssRUFBSSxTQStDWCxRQS9DeUIsWUErQ3pCLE1BL0NzQyxvQkFDSTthQThDMUM7OztnQkEzQ0YsZUFBVyxJQUFJO1dBMkNiO0tBekNHLEdBQUgsU0F5Q0EsT0F4Q1c7TUF3Q1gsV0F4Q1UsS0FBSSxjQUFXLElBQUksSUFBSSxPQUFVO1lBQzNDLEdBQUEsWUF1Q0EsTUF2Q2EsS0FDRztNQXNDaEIsbUJBdENlO0tBQUEsT0FFWDtNQUFILGlCQW9DRDtvQkFuQ1EsU0FtQ1I7TUFBQSxXQWpDYztPQUFaLEdBQUEsT0FBRyxlQUFhLEtBQ0c7UUFBbEIsa0JBQVk7UUFDWixxQkFBbUI7ZUFDbkIsS0FBSSxjQUFXLElBQUksSUFBSSxXQUFTO09BQUEsT0FFN0I7UUFBSCxpQkFBVztRQUNYLG9CQUFrQjtlQUNsQixLQUFJLGNBQVcsSUFBSSxJQUFJLFdBQVM7T0FBQTtNQUFBO0tBQUE7SUFBQTtnQkFHckMsZUFBVTtXQXVCUjtZQXRCRSxDQUFBLENBQUssRUFBSSxTQXNCWCxRQXRCeUIsWUFzQnpCLE1BdEJzQyxvQkFDSTtNQUExQyxjQXFCQTtNQUFBLFdBbEJhO09BQVosR0FBQSxjQUFVLFNBQ087UUFBaEIsWUFBUTtRQUNSLGlCQUFXO1FBRVgsWUFjRixNQWRlO1FBQ2IscUJBQW1CO2VBQ25CO09BQUEsT0FFRztlQUNIOzs7YUFFRjs7OztnQkFqRW9COzs7RUFvRXRCLG1CQUNrQjtHQUFQLFlBQUEsSUFBSyxPQUFLLFFBQU07VUFHekI7OzJCQUFBLGFBRlU7MkJBRVYsY0FEVzsyQkFDWCxlQUFZO0dBQUE7RUFBQTtFQUlkLGtCQUFXLHFCQUFBLEVBQUU7R0FDWixZQUFRLEtBQUksY0FBVyxPQUFVLE9BQVUsT0FBVTtHQUNyRCxTQUFTO0dBQ1QsVUFBVTtHQUNWLFFBQVE7R0FFUixZQUNXO1dBQUE7S0FBTDtNQUFBLFFBQUEsUUFBUSxJQUFJO01BQ2hCLEdBQUEsT0FBRyxFQUFFLEdBQ0M7T0FBRSxLQUFBLGNBQVUsS0FDRztRQUFuQixPQUFNO09BQUE7T0FDUCxzQkFBZ0IseUJBQUE7UUFDZixlQUFlO1lBQ1I7Y0FDRTtPQUFBO09BRU4sR0FBSCxPQUFHLElBQUksa0JBQ2E7UUFDbkIsaUJBQVc7UUFDWCxhQUFhO1FBQ2IscUJBQW1CO1FBQ1osS0FBQSxjQUFVLFlBQ1E7YUFBakI7U0FDUCxPQUFNO1FBQUE7WUFDQTtRQUNQLGdCQUFZO09BQUEsT0FFVDtRQUFILGdCQUFZO09BQUE7TUFBQSxPQUNmLEdBQUEsT0FBRyxFQUFFLEdBQ0M7T0FBRSxLQUFBLGVBQVcsS0FDRztRQUFwQixPQUFNO09BQUE7T0FDUCxxQkFBZSx3QkFBQTtRQUNkLGVBQWU7WUFDUjthQUNDO09BQUE7T0FFTCxHQUFILE9BQUcsa0JBQWUsS0FDRztRQUNwQixVQUFNO1FBQ04sY0FBYztRQUNkLGFBQWE7UUFDTixLQUFBLGVBQVcsS0FDRzthQUFiO1NBQ1AsT0FBTTtRQUFBO1FBQ1AsZUFBVztPQUFBLE9BRVI7UUFBSCxlQUFXO09BQUE7TUFBQSxPQUVWO09BQUgsT0FBTTtNQUFBO0tBQUE7SUFBQTtHQUFBO0dBRVQsZUFBZTtHQUNmLGVBQWU7R0FDZixhQUFhO0dBQ2IsY0FBYztHQUNkLE9BQVU7VUFDVjtFQUFBO0VBRUQsb0JBQWEsdUJBQUE7VUFDWixXQUFTOztFQUVWLHFCQUFjLHdCQUFBO1VBQ2IsV0FBUyIsImZpbGUiOiJhdC9NYXAvU3BsYXktVHJlZS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
