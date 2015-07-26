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
					return _ms.bool((! empty_63(_this)&&splay_33_63(_this,key)))?_ms.some(()=>{
						return _this.root["val!"]
					}()):_ms.None
				}
				[_ms.symbol(assoc_33)](key,val){
					const _this=this;
					if(_ms.bool(empty_63(_this))){
						_this.root=new (Splay_45Node)(key,val,void 0,void 0)
					} else if(_ms.bool(splay_33_63(_this,key))){
						_this.root["val!"]=val
					} else {
						const old_45root=_this.val;
						_ms.assertNot(empty_63,_this);
						_this.root=()=>{
							if(_ms.bool(_60_63(old_45root.key,key))){
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
					return _ms.bool((! empty_63(_this)&&splay_33_63(_this,key)))?_ms.some(()=>{
						const removed=_this.root;
						_this.root=()=>{
							if(_ms.bool(has_45left_63(removed))){
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
					if(_ms.bool(_60_63(_,0))){
						if(! _ms.bool(has_45left_63(cur))){
							found=false;
							break
						};
						const link_45right_33=function link_45right_33(new_45right){
							right["left!"]=new_45right;
							cur=new_45right["left!"];
							right=new_45right
						};
						if(_ms.bool(_60_63(key,cur["left!"].key))){
							const old_45left=cur["left!"];
							cur["left!"]=old_45left["right!"];
							old_45left["right!"]=cur;
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
							left["right!"]=new_45left;
							cur=new_45left["right!"];
							left=new_45left
						};
						if(_ms.bool(_60_63(cur["right!"].key,key))){
							const tmp=cur["right!"];
							cur["right!"]=tmp["left!"];
							tmp["left!"]=cur;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9TcGxheS1UcmVlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBU0EsdUJBRUk7U0FESDt1QkFJQyxTQUNPO1dBc0RJO1lBdERWLEtBc0RVO0lBQUE7Z0JBbkRELEtBQ0k7cUJBQWQsWUFBUTtJQUFBO2dCQUVULFlBQ1U7V0ErQ0U7S0EvQ1gsa0JBQWUsc0JBQUEsRUFDQztNQUFmLEdBQUksV0FBUSxHQUNDO2VBQVIsWUFBVTtjQUNYLENBQUUsTUFBTTtlQUNQLFlBQVU7OztZQUNoQixZQTBDVzs7Z0JBeENaLFlBQ1E7V0F1Q0k7WUF2Q1gsRUFBSSxXQXVDTzs7Z0JBckNaLFlBQ1M7V0FvQ0c7S0FBQSxXQXBDRjs7Z0JBRVYsU0FBTSxJQUNHO1dBaUNHO3FCQWpDUixDQUFLLEVBQUksU0FpQ0QsUUFqQ2UsWUFpQ2YsTUFqQzRCLG9CQUNJO2FBZ0NoQzs7O2dCQTdCWixXQUFTLElBQUksSUFDRztXQTRCSjtLQTNCTixZQUFKLFNBMkJVLFFBMUJDO01BMEJELFdBMUJBLEtBQUksY0FBVyxJQUFJLElBQUksT0FBVTtZQUMzQyxZQUFBLFlBeUJVLE1BekJHLE1BQ0c7TUF3Qk4sbUJBeEJLO0tBQUEsT0FFWDtNQUFILGlCQXNCUztvQkFyQkssU0FxQkw7TUFBQTtPQW5CUixZQUFBLE9BQUcsZUFBYSxNQUNHO1FBQWxCLGtCQUFZO1FBQ1oscUJBQW1CO2VBQ25CLEtBQUksY0FBVyxJQUFJLElBQUksV0FBUztPQUFBLE9BRTdCO1FBQUgsaUJBQVc7UUFDWCxvQkFBa0I7ZUFDbEIsS0FBSSxjQUFXLElBQUksSUFBSSxXQUFTO09BQUE7TUFBQTtLQUFBO0lBQUE7Z0JBR3JDLGdCQUFXLElBQ0c7V0FRRjtxQkFSUixDQUFLLEVBQUksU0FRRCxRQVJlLFlBUWYsTUFSNEIsb0JBQ0k7TUFBMUMsY0FPVTtNQUFBO09BSlQsWUFBQSxjQUFVLFVBQ087UUFBaEIsWUFBUTtRQUNSLGlCQUFXO1FBRVgsWUFBUSxNQUFLO1FBQ2IscUJBQW1CO2VBQ25CO09BQUEsT0FFRztlQUNIOzs7YUFFRjs7OztHQWpFRCxRQUFNLEVBQUU7VUFEVDtFQUFBO0VBMEVBLG1CQUNrQjtlQUNOLElBQUksT0FBSyxRQUFNLFNBQ007b0JBQS9CLFdBQU87MkJBQ1AsWUFBVTsyQkFDVixhQUFXOzJCQUNYLGNBQVk7R0FBQTtFQUFBO0VBSWQsa0JBQVcscUJBQUEsRUFBRSxJQUNHO0dBQWYsWUFBUSxLQUFJLGNBQVcsT0FBVSxPQUFVLE9BQVU7R0FDckQsU0FBUztHQUNULFVBQVU7R0FDVixRQUFRO0dBRVIsVUFBVTtHQUVOLE9BQUE7SUFBRztLQUFBLFFBQUEsUUFBUSxJQUFJO0tBQ2pCLFlBQUEsT0FBRyxFQUFFLElBQ0M7TUFBTCxjQUFRLGNBQVUsTUFDRzthQUFYO09BQ1Q7TUFBQTtNQUNELHNCQUFnQix5QkFBQSxZQUNTO09BQXhCLGVBQWU7V0FDUjthQUNFO01BQUE7TUFFTCxZQUFKLE9BQUcsSUFBSSxtQkFDYTtPQUNuQixpQkFBVztPQUNYLGFBQWE7T0FDYixxQkFBbUI7T0FDbkIsY0FBUSxjQUFVLGFBQ1E7WUFBbEI7Y0FDRTtRQUNUO09BQUE7V0FDTTtPQUNQLGdCQUFZO01BQUEsT0FFVDtPQUFILGdCQUFZO01BQUE7S0FBQSxPQUNmLFlBQUEsT0FBRyxFQUFFLElBQ0M7TUFBTCxjQUFRLGVBQVcsTUFDRzthQUFaO09BQ1Q7TUFBQTtNQUNELHFCQUFlLHdCQUFBLFdBQ1E7T0FBdEIsZUFBZTtXQUNSO1lBQ0M7TUFBQTtNQUVKLFlBQUosT0FBRyxrQkFBZSxNQUNHO09BQ3BCLFVBQU07T0FDTixjQUFjO09BQ2QsYUFBYTtPQUNiLGNBQVEsZUFBVyxNQUNHO1lBQWQ7Y0FDRTtRQUNUO09BQUE7T0FDRCxlQUFXO01BQUEsT0FFUjtPQUFILGVBQVc7TUFBQTtLQUFBLE9BRVY7WUFBTTtNQUNUO0tBQUE7SUFBQTtHQUFBO0dBRUgsZUFBZTtHQUNmLGVBQWU7R0FDZixhQUFhO0dBQ2IsY0FBYztHQUNkLE9BQVU7VUFDVjtFQUFBO0VBRUQsb0JBQWEsdUJBQUEsS0FDSTtVQUFoQixXQUFTOztFQUVWLHFCQUFjLHdCQUFBLEtBQ0k7VUFBakIsV0FBUzs7RUFqS1gsd0JBQUE7a0JBU0EiLCJmaWxlIjoiYXQvTWFwL1NwbGF5LVRyZWUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==