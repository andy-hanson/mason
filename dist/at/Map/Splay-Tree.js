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
					_ms.checkContains(Splay_45Node,root,"root");
					_ms.newProperty(this,"root",root)
				}
				[_ms.symbol(iterator)](){
					let _this=this;
					let node_45iter=function* node_45iter(_){
						if(defined_63(_)){
							(yield* node_45iter(_["left!"]));
							(yield [_.key,_["val!"]]);
							(yield* node_45iter(_["right!"]))
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
					return ((! empty_63(_this)&&splay_33_63(_this,key))?_ms.some((()=>{
						return _this.root["val!"]
					})()):_ms.None)
				}
				[_ms.symbol(set_45sub_33)](key,val){
					let _this=this;
					if(empty_63(_this)){
						_this.root=new (Splay_45Node)(key,val,void 0,void 0)
					} else if(splay_33_63(_this,key)){
						_this.root["val!"]=val
					} else {
						let old_45root=_this.val;
						_ms.assertNot(empty_63,_this);
						_this.root=(()=>{
							if(_60_63(old_45root.key,key)){
								let old_45right=old_45root["right!"];
								old_45root["right!"]=void 0;
								return new (Splay_45Node)(key,val,old_45root,old_45right)
							} else {
								let old_45left=old_45root["left!"];
								old_45root["left!"]=void 0;
								return new (Splay_45Node)(key,val,old_45left,old_45root)
							}
						})()
					}
				}
				[_ms.symbol(del_45sub_33)](key){
					let _this=this;
					return ((! empty_63(_this)&&splay_33_63(_this,key))?_ms.some((()=>{
						let removed=_this.root;
						_this.root=(()=>{
							if(has_45left_63(removed)){
								let right=removed.right;
								let new_45root=removed.left;
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
		let Splay_45Node=class Splay_45Node{
			constructor(key,val_33,left_33,right_33){
				let _this=this;
				_ms.newProperty(this,"key",key);
				_ms.newProperty(_this,"val!",val_33);
				_ms.newProperty(_this,"left!",left_33);
				_ms.newProperty(_this,"right!",right_33)
			}
		};
		let splay_33_63=function splay_33_63(_,key){
			let dummy=new (Splay_45Node)(void 0,void 0,void 0,void 0);
			let left=dummy;
			let right=dummy;
			let cur=_.root;
			let found=(()=>{
				for(;;){
					{
						let _=compare(key,cur.key);
						if(_60_63(_,0)){
							if(! has_45left_63(cur)){
								return false
							};
							let link_45right_33=function link_45right_33(new_45right){
								right["left!"]=new_45right;
								cur=new_45right["left!"];
								right=new_45right
							};
							if(_60_63(key,cur["left!"].key)){
								let old_45left=cur["left!"];
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
							let link_45left_33=function link_45left_33(new_45left){
								left["right!"]=new_45left;
								cur=new_45left["right!"];
								left=new_45left
							};
							if(_60_63(cur["right!"].key,key)){
								let tmp=cur["right!"];
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
		let has_45left_63=function has_45left_63(node){
			return defined_63(node["left!"])
		};
		let has_45right_63=function has_45right_63(node){
			return defined_63(node["right!"])
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9NYXAvU3BsYXktVHJlZS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVNBLGlDQUFrQjs7dUJBSWhCO1NBcUVDO1lBcEVBLEtBb0VBO0lBQUE7SUFsRVEsWUFBQTtTQWtFUjt1QkFsRWM7OztnQkFHaEI7U0ErREU7S0E5REQsZ0JBQWUsc0JBQUE7TUFDWCxHQUFBLFdBQUEsR0FDUztlQUFKLFlBQVU7Y0FDWCxDQUFDLE1BQU07ZUFDTixZQUFVOzs7WUFDbkIsWUF5REM7O2dCQXZERjtTQXVERTtZQXRERCxFQUFJLFdBc0RIOztnQkFwREY7U0FvREU7S0FBQSxXQW5EUTs7Z0JBRVYsU0FBTTtTQWlESjtZQWhERSxDQUFBLENBQUssRUFBSSxTQWdEWCxRQWhEeUIsWUFnRHpCLE1BaERzQyxvQkFDSTthQStDMUM7OztnQkE1Q0YsZUFBVyxJQUFJO1NBNENiO0tBMUNHLEdBQUgsU0EwQ0EsT0F6Q1c7TUF5Q1gsV0F6Q1UsS0FBSSxjQUFXLElBQUksSUFBSSxPQUFVO1lBQzNDLEdBQUEsWUF3Q0EsTUF4Q2EsS0FDRztNQXVDaEIsbUJBdkNlO0tBQUEsT0FFWDtNQUFILGVBcUNEO29CQXBDUSxTQW9DUjtNQUFBLFdBbENjO09BQVosR0FBQSxPQUFHLGVBQWEsS0FDRztRQUFsQixnQkFBWTtRQUNaLHFCQUFtQjtlQUNuQixLQUFJLGNBQVcsSUFBSSxJQUFJLFdBQVM7T0FBQSxPQUU3QjtRQUFILGVBQVc7UUFDWCxvQkFBa0I7ZUFDbEIsS0FBSSxjQUFXLElBQUksSUFBSSxXQUFTO09BQUE7TUFBQTtLQUFBO0lBQUE7Z0JBR3JDLGVBQVU7U0F3QlI7WUF2QkUsQ0FBQSxDQUFLLEVBQUksU0F1QlgsUUF2QnlCLFlBdUJ6QixNQXZCc0Msb0JBQ0k7TUFBMUMsWUFzQkE7TUFBQSxXQW5CYTtPQUFaLEdBQUEsY0FBVSxTQUNPO1FBQWhCLFVBQVE7UUFDUixlQUFXO1FBRVgsWUFlRixNQWZlO1FBQ2IscUJBQW1CO2VBQ25CO09BQUEsT0FFRztlQUNIOzs7YUFFRjs7OztnQkFqRW9COzs7RUFxRXRCLGlCQUNrQjtHQUFQLFlBQUEsSUFBSyxPQUFLLFFBQU07UUFHekI7O29CQUFBLGFBRlE7b0JBRVIsY0FEUztvQkFDVCxlQUFVO0dBQUE7RUFBQTtFQUlaLGdCQUFXLHFCQUFBLEVBQUU7R0FDWixVQUFRLEtBQUksY0FBVyxPQUFVLE9BQVUsT0FBVTtHQUNyRCxTQUFPO0dBQ1AsVUFBUTtHQUNSLFFBQU07R0FFTixVQUNXO1dBQUE7S0FBTDtNQUFBLE1BQUEsUUFBUSxJQUFJO01BQ2hCLEdBQUEsT0FBRyxFQUFFLEdBQ0M7T0FBRSxLQUFBLGNBQVUsS0FDRztRQUFuQixPQUFNO09BQUE7T0FDUCxvQkFBZ0IseUJBQUE7UUFDZixlQUFlO1lBQ1I7Y0FDRTtPQUFBO09BRU4sR0FBSCxPQUFHLElBQUksa0JBQ2E7UUFDbkIsZUFBVztRQUNYLGFBQWE7UUFDYixxQkFBbUI7UUFDWixLQUFBLGNBQVUsWUFDUTthQUFqQjtTQUNQLE9BQU07UUFBQTtZQUNBO1FBQ1AsZ0JBQVk7T0FBQSxPQUVUO1FBQUgsZ0JBQVk7T0FBQTtNQUFBLE9BQ2YsR0FBQSxPQUFHLEVBQUUsR0FDQztPQUFFLEtBQUEsZUFBVyxLQUNHO1FBQXBCLE9BQU07T0FBQTtPQUNQLG1CQUFlLHdCQUFBO1FBQ2QsZUFBZTtZQUNSO2FBQ0M7T0FBQTtPQUVMLEdBQUgsT0FBRyxrQkFBZSxLQUNHO1FBQ3BCLFFBQU07UUFDTixjQUFjO1FBQ2QsYUFBYTtRQUNOLEtBQUEsZUFBVyxLQUNHO2FBQWI7U0FDUCxPQUFNO1FBQUE7UUFDUCxlQUFXO09BQUEsT0FFUjtRQUFILGVBQVc7T0FBQTtNQUFBLE9BRVY7T0FBSCxPQUFNO01BQUE7S0FBQTtJQUFBO0dBQUE7R0FFVCxlQUFlO0dBQ2YsZUFBZTtHQUNmLGFBQWE7R0FDYixjQUFjO0dBQ2QsT0FBVTtVQUNWO0VBQUE7RUFFRCxrQkFBYSx1QkFBQTtVQUNaLFdBQVM7O0VBRVYsbUJBQWMsd0JBQUE7VUFDYixXQUFTIiwiZmlsZSI6ImF0L01hcC9TcGxheS1UcmVlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
