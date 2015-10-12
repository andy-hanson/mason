"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../compare","./../../js","./../../methods","./../../Type/Kind","./../at","./../at-Type","./Map","./Sorted-Map"],(exports,compare_0,js_1,methods_2,Kind_3,_64_4,_64_45Type_5,Map_6,Sorted_45Map_7)=>{
	exports._get=_ms.lazy(()=>{
		const compare=_ms.getDefaultExport(compare_0),_$0=_ms.getModule(compare_0),_60_63=_ms.get(_$0,"<?"),_$1=_ms.getModule(js_1),defined_63=_ms.get(_$1,"defined?"),_$2=_ms.getModule(methods_2),del_45sub_33=_ms.get(_$2,"del-sub!"),set_45sub_33=_ms.get(_$2,"set-sub!"),_$3=_ms.getModule(Kind_3),kind_33=_ms.get(_$3,"kind!"),_$4=_ms.getModule(_64_4),empty_33=_ms.get(_$4,"empty!"),empty_63=_ms.get(_$4,"empty?"),iterator=_ms.get(_$4,"iterator"),_$5=_ms.getModule(_64_45Type_5),empty=_ms.get(_$5,"empty"),_$6=_ms.getModule(Map_6),_63get=_ms.get(_$6,"?get"),Sorted_45Map=_ms.getDefaultExport(Sorted_45Map_7);
		const Splay_45Tree=exports.default=(()=>{
			const _=class Splay_45Tree{
				static [_ms.symbol(empty)](){
					const _this=this;
					return new (_this)()
				}
				constructor(root){
					_ms.newProperty(this,"root",root);
					_ms.checkContains(Splay_45Node,root,"root")
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
			kind_33(_,Sorted_45Map);
			return _
		})();
		const Splay_45Node=class Splay_45Node{
			constructor(key,val_33,left_33,right_33){
				_ms.newProperty(this,"key",key);
				_ms.newMutableProperty(this,"val!",val_33);
				_ms.newMutableProperty(this,"left!",left_33);
				_ms.newMutableProperty(this,"right!",right_33)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9NYXAvU3BsYXktVHJlZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVVBLG1DQUNpQixLQUliO1NBREg7SUFJQyxtQkFBQTtXQXNEVztZQXJEVixLQXFEVTtJQUFBO0lBbkRELFlBQUE7O3VCQUFNOztJQUdqQixZQUFBO1dBZ0RZO0tBL0NYLGtCQUFlLHNCQUFBO01BQ2QsR0FBSSxXQUFBLEdBQ1M7ZUFBUixZQUFVO2NBQ1gsQ0FBQyxNQUFNO2VBQ04sWUFBVTs7O1lBQ2hCLFlBMENXOztJQXhDWixZQUFBO1dBd0NZO1lBdkNYLEVBQUksV0F1Q087O0lBckNaLFlBQUE7V0FxQ1k7S0FBQSxXQXBDRjs7SUFFVixZQUFBLFNBQU07V0FrQ007WUFqQ1gsQ0FBRyxDQUFLLEVBQUksU0FpQ0QsUUFqQ2UsWUFpQ2YsTUFqQzRCLG9CQUNJO2FBZ0NoQzs7O0lBN0JaLFlBQUEsZUFBVyxJQUFJO1dBNkJIO0tBM0JOLEdBQUosU0EyQlUsT0ExQkM7TUEwQkQsV0ExQkEsS0FBSSxjQUFXLElBQUksSUFBSSxPQUFVO1lBQzNDLEdBQUEsWUF5QlUsTUF6QkcsS0FDRztNQXdCTixtQkF4Qks7S0FBQSxPQUVYO01BQUgsaUJBc0JTO29CQXJCRCxTQXFCQztNQUFBLFdBbkJJO09BQVosR0FBQSxPQUFHLGVBQWEsS0FDRztRQUFsQixrQkFBWTtRQUNaLHFCQUFtQjtlQUNuQixLQUFJLGNBQVcsSUFBSSxJQUFJLFdBQVM7T0FBQSxPQUU3QjtRQUFILGlCQUFXO1FBQ1gsb0JBQWtCO2VBQ2xCLEtBQUksY0FBVyxJQUFJLElBQUksV0FBUztPQUFBO01BQUE7S0FBQTtJQUFBO0lBR3JDLFlBQUEsZUFBVTtXQVNFO1lBUlgsQ0FBRyxDQUFLLEVBQUksU0FRRCxRQVJlLFlBUWYsTUFSNEIsb0JBQ0k7TUFBMUMsY0FPVTtNQUFBLFdBSkc7T0FBWixHQUFBLGNBQVUsU0FDTztRQUFoQixZQUFRO1FBQ1IsaUJBQVc7UUFFWCxZQUFRLE1BQUs7UUFDYixxQkFBbUI7ZUFDbkI7T0FBQSxPQUVHO2VBQ0g7OzthQUVGOzs7O0dBaEVELFFBQU0sRUFBRTtVQURUO0VBQUE7RUFvRUEsbUJBQ2tCO0dBQU4sWUFBQSxJQUFLLE9BQUssUUFBTTs7MkJBQzFCLFlBQVU7MkJBQ1YsYUFBVzsyQkFDWCxjQUFZO0dBQUE7RUFBQTtFQUlkLGtCQUFXLHFCQUFBLEVBQUU7R0FDWixZQUFRLEtBQUksY0FBVyxPQUFVLE9BQVUsT0FBVTtHQUNyRCxTQUFTO0dBQ1QsVUFBVTtHQUNWLFFBQVE7R0FFUixZQUNXO1dBQUE7S0FBSjtNQUFBLFFBQUEsUUFBUSxJQUFJO01BQ2pCLEdBQUEsT0FBRyxFQUFFLEdBQ0M7T0FBTCxLQUFRLGNBQVUsS0FDRztRQUFwQixPQUFNO09BQUE7T0FDUCxzQkFBZ0IseUJBQUE7UUFDZixlQUFlO1lBQ1I7Y0FDRTtPQUFBO09BRUwsR0FBSixPQUFHLElBQUksa0JBQ2E7UUFDbkIsaUJBQVc7UUFDWCxhQUFhO1FBQ2IscUJBQW1CO1FBQ25CLEtBQVEsY0FBVSxZQUNRO2FBQWxCO1NBQ1AsT0FBTTtRQUFBO1lBQ0E7UUFDUCxnQkFBWTtPQUFBLE9BRVQ7UUFBSCxnQkFBWTtPQUFBO01BQUEsT0FDZixHQUFBLE9BQUcsRUFBRSxHQUNDO09BQUwsS0FBUSxlQUFXLEtBQ0c7UUFBckIsT0FBTTtPQUFBO09BQ1AscUJBQWUsd0JBQUE7UUFDZCxlQUFlO1lBQ1I7YUFDQztPQUFBO09BRUosR0FBSixPQUFHLGtCQUFlLEtBQ0c7UUFDcEIsVUFBTTtRQUNOLGNBQWM7UUFDZCxhQUFhO1FBQ2IsS0FBUSxlQUFXLEtBQ0c7YUFBZDtTQUNQLE9BQU07UUFBQTtRQUNQLGVBQVc7T0FBQSxPQUVSO1FBQUgsZUFBVztPQUFBO01BQUEsT0FFVjtPQUFILE9BQU07TUFBQTtLQUFBO0lBQUE7R0FBQTtHQUVULGVBQWU7R0FDZixlQUFlO0dBQ2YsYUFBYTtHQUNiLGNBQWM7R0FDZCxPQUFVO1VBQ1Y7RUFBQTtFQUVELG9CQUFhLHVCQUFBO1VBQ1osV0FBUzs7RUFFVixxQkFBYyx3QkFBQTtVQUNiLFdBQVMiLCJmaWxlIjoiYXQvTWFwL1NwbGF5LVRyZWUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
