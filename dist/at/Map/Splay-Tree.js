"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../js","../../Type/Kind","../at","../at-Type","./Map","./Sorted-Map"],(exports,compare_0,js_1,Kind_2,_64_3,_64_45Type_4,Map_5,Sorted_45Map_6)=>{
	exports._get=_ms.lazy(()=>{
		const compare=_ms.getDefaultExport(compare_0),_$2=_ms.getModule(compare_0),_60_63=_ms.get(_$2,"<?"),_$3=_ms.getModule(js_1),defined_63=_ms.get(_$3,"defined?"),_$4=_ms.getModule(Kind_2),kind_33=_ms.get(_$4,"kind!"),_$5=_ms.getModule(_64_3),empty_33=_ms.get(_$5,"empty!"),empty_63=_ms.get(_$5,"empty?"),iterator=_ms.get(_$5,"iterator"),_$6=_ms.getModule(_64_45Type_4),empty=_ms.get(_$6,"empty"),_$7=_ms.getModule(Map_5),assoc_33=_ms.get(_$7,"assoc!"),_63get=_ms.get(_$7,"?get"),un_45assoc_33=_ms.get(_$7,"un-assoc!"),Sorted_45Map=_ms.getDefaultExport(Sorted_45Map_6);
		const Splay_45Tree=()=>{
			const _=class Splay_45Tree{
				static [_ms.symbol(empty)](){
					const _this=this;
					return new (_this)()
				}
				constructor(root){
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
					return (! empty_63(_this)&&splay_33_63(_this,key))?_ms.some(()=>{
						return _this.root["val!"]
					}()):_ms.None
				}
				[_ms.symbol(assoc_33)](key,val){
					const _this=this;
					if(empty_63(_this)){
						_this.root=new (Splay_45Node)(key,val,void 0,void 0)
					} else if(splay_33_63(_this,key)){
						_this.root["val!"]=val
					} else {
						const old_45root=_this.val;
						_ms.assertNot(empty_63,_this);
						_this.root=()=>{
							if(_60_63(old_45root.key,key)){
								const old_45right=old_45root["right!"];
								old_45root["right!"]=void 0;
								return new (Splay_45Node)(key,val,old_45root,old_45right)
							} else {
								const old_45left=old_45root["left!"];
								old_45root["left!"]=void 0;
								return new (Splay_45Node)(key,val,old_45left,old_45root)
							}
						}()
					}
				}
				[_ms.symbol(un_45assoc_33)](key){
					const _this=this;
					return (! empty_63(_this)&&splay_33_63(_this,key))?_ms.some(()=>{
						const removed=_this.root;
						_this.root=()=>{
							if(has_45left_63(removed)){
								const right=removed.right;
								const new_45root=removed.left;
								splay_33_63(_this,key);
								new_45root["right!"]=right;
								return new_45root
							} else {
								return removed.right
							}
						}();
						return removed["val!"]
					}()):_ms.None
				}
			};
			kind_33(_,Sorted_45Map);
			return _
		}();
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
			let found=null;
			for(;;){
				{
					const _=compare(key,cur.key);
					if(_60_63(_,0)){
						if(! has_45left_63(cur)){
							found=false;
							break
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
								found=false;
								break
							};
							cur=old_45left;
							link_45right_33(old_45left)
						} else {
							link_45right_33(cur)
						}
					} else if(_60_63(0,_)){
						if(! has_45right_63(cur)){
							found=false;
							break
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
		const name=exports.name=`Splay-Tree`;
		exports.default=Splay_45Tree;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9TcGxheS1UcmVlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBU0EsdUJBRUk7U0FESDt1QkFJQyxTQUNPO1dBc0RJO1lBdERWLEtBc0RVO0lBQUE7Z0JBbkRELEtBQ0k7cUJBQWQsWUFBUTtJQUFBO2dCQUVULFlBQ1U7V0ErQ0U7S0EvQ1gsa0JBQWUsc0JBQUEsRUFDQztNQUFmLEdBQUksV0FBUSxHQUNDO2VBQVIsWUFBVTtjQUNYLENBQUUsTUFBTTtlQUNQLFlBQVU7OztZQUNoQixZQTBDVzs7Z0JBeENaLFlBQ1E7V0F1Q0k7WUF2Q1gsRUFBSSxXQXVDTzs7Z0JBckNaLFlBQ1M7V0FvQ0c7S0FBQSxXQXBDRjs7Z0JBRVYsU0FBTSxJQUNHO1dBaUNHO1lBakNSLENBQUssRUFBSSxTQWlDRCxRQWpDZSxZQWlDZixNQWpDNEIsbUJBQ0k7YUFnQ2hDOzs7Z0JBN0JaLFdBQVMsSUFBSSxJQUNHO1dBNEJKO0tBM0JOLEdBQUosU0EyQlUsT0ExQkM7TUEwQkQsV0ExQkEsS0FBSSxjQUFXLElBQUksSUFBSSxPQUFVO1lBQzNDLEdBQUEsWUF5QlUsTUF6QkcsS0FDRztNQXdCTixtQkF4Qks7S0FBQSxPQUVYO01BQUgsaUJBc0JTO29CQXJCSyxTQXFCTDtNQUFBO09BbkJSLEdBQUEsT0FBRyxlQUFhLEtBQ0c7UUFBbEIsa0JBQVk7UUFDWixxQkFBbUI7ZUFDbkIsS0FBSSxjQUFXLElBQUksSUFBSSxXQUFTO09BQUEsT0FFN0I7UUFBSCxpQkFBVztRQUNYLG9CQUFrQjtlQUNsQixLQUFJLGNBQVcsSUFBSSxJQUFJLFdBQVM7T0FBQTtNQUFBO0tBQUE7SUFBQTtnQkFHckMsZ0JBQVcsSUFDRztXQVFGO1lBUlIsQ0FBSyxFQUFJLFNBUUQsUUFSZSxZQVFmLE1BUjRCLG1CQUNJO01BQTFDLGNBT1U7TUFBQTtPQUpULEdBQUEsY0FBVSxTQUNPO1FBQWhCLFlBQVE7UUFDUixpQkFBVztRQUVYLFlBQVEsTUFBSztRQUNiLHFCQUFtQjtlQUNuQjtPQUFBLE9BRUc7ZUFDSDs7O2FBRUY7Ozs7R0FqRUQsUUFBTSxFQUFFO1VBRFQ7RUFBQTtFQTBFQSxtQkFDa0I7ZUFDTixJQUFJLE9BQUssUUFBTSxTQUNNO29CQUEvQixXQUFPOzJCQUNQLFlBQVU7MkJBQ1YsYUFBVzsyQkFDWCxjQUFZO0dBQUE7RUFBQTtFQUlkLGtCQUFXLHFCQUFBLEVBQUUsSUFDRztHQUFmLFlBQVEsS0FBSSxjQUFXLE9BQVUsT0FBVSxPQUFVO0dBQ3JELFNBQVM7R0FDVCxVQUFVO0dBQ1YsUUFBUTtHQUVSLFVBQVU7R0FFTixPQUFBO0lBQUc7S0FBQSxRQUFBLFFBQVEsSUFBSTtLQUNqQixHQUFBLE9BQUcsRUFBRSxHQUNDO01BQUwsS0FBUSxjQUFVLEtBQ0c7YUFBWDtPQUNUO01BQUE7TUFDRCxzQkFBZ0IseUJBQUEsWUFDUztPQUF4QixlQUFlO1dBQ1I7YUFDRTtNQUFBO01BRUwsR0FBSixPQUFHLElBQUksa0JBQ2E7T0FDbkIsaUJBQVc7T0FDWCxhQUFhO09BQ2IscUJBQW1CO09BQ25CLEtBQVEsY0FBVSxZQUNRO1lBQWxCO2NBQ0U7UUFDVDtPQUFBO1dBQ007T0FDUCxnQkFBWTtNQUFBLE9BRVQ7T0FBSCxnQkFBWTtNQUFBO0tBQUEsT0FDZixHQUFBLE9BQUcsRUFBRSxHQUNDO01BQUwsS0FBUSxlQUFXLEtBQ0c7YUFBWjtPQUNUO01BQUE7TUFDRCxxQkFBZSx3QkFBQSxXQUNRO09BQXRCLGVBQWU7V0FDUjtZQUNDO01BQUE7TUFFSixHQUFKLE9BQUcsa0JBQWUsS0FDRztPQUNwQixVQUFNO09BQ04sY0FBYztPQUNkLGFBQWE7T0FDYixLQUFRLGVBQVcsS0FDRztZQUFkO2NBQ0U7UUFDVDtPQUFBO09BQ0QsZUFBVztNQUFBLE9BRVI7T0FBSCxlQUFXO01BQUE7S0FBQSxPQUVWO1lBQU07TUFDVDtLQUFBO0lBQUE7R0FBQTtHQUVILGVBQWU7R0FDZixlQUFlO0dBQ2YsYUFBYTtHQUNiLGNBQWM7R0FDZCxPQUFVO1VBQ1Y7RUFBQTtFQUVELG9CQUFhLHVCQUFBLEtBQ0k7VUFBaEIsV0FBUzs7RUFFVixxQkFBYyx3QkFBQSxLQUNJO1VBQWpCLFdBQVM7O0VBaktYLHdCQUFBO2tCQVNBIiwiZmlsZSI6ImF0L01hcC9TcGxheS1UcmVlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=