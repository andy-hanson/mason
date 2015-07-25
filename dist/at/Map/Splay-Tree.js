"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../js","../../Type/Method","../../Type/Kind","../../Type/Tuple","../../Type/Wrap-Type","../at","../at-Type","./Map","./Map-Type","./Sorted-Map"],(exports,compare_0,js_1,Method_2,Kind_3,Tuple_4,Wrap_45Type_5,_64_6,_64_45Type_7,Map_8,Map_45Type_9,Sorted_45Map_10)=>{
	exports._get=_ms.lazy(()=>{
		const compare=_ms.getDefaultExport(compare_0),_$2=_ms.getModule(compare_0),_60_63=_ms.get(_$2,"<?"),_$3=_ms.getModule(js_1),defined_63=_ms.get(_$3,"defined?"),_$4=_ms.getModule(Method_2),impl_33=_ms.get(_$4,"impl!"),self_45impl_33=_ms.get(_$4,"self-impl!"),_$5=_ms.getModule(Kind_3),kind_33=_ms.get(_$5,"kind!"),self_45kind_33=_ms.get(_$5,"self-kind!"),Tuple=_ms.getDefaultExport(Tuple_4),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_5),_$8=_ms.getModule(_64_6),empty_33=_ms.get(_$8,"empty!"),empty_63=_ms.get(_$8,"empty?"),iterator=_ms.get(_$8,"iterator"),_$9=_ms.getModule(_64_45Type_7),empty=_ms.get(_$9,"empty"),_$10=_ms.getModule(Map_8),assoc_33=_ms.get(_$10,"assoc!"),_63get=_ms.get(_$10,"?get"),un_45assoc_33=_ms.get(_$10,"un-assoc!"),Map_45Type=_ms.getDefaultExport(Map_45Type_9),Sorted_45Map=_ms.getDefaultExport(Sorted_45Map_10);
		const Splay_45Tree=Wrap_45Type(()=>{
			const built={};
			const doc=built.doc=`Default Sorted-Map implementation.\nBinary tree that is good at accessing the same values many times.`;
			return _ms.setName(built,"Splay-Tree")
		}());
		const Splay_45Node=Tuple(()=>{
			const built={};
			const props=built.props=[`key`,`val!`,`left!`,`right!`];
			return _ms.setName(built,"Splay-Node")
		}());
		self_45kind_33(Splay_45Tree,Map_45Type);
		self_45impl_33(empty,Splay_45Tree,()=>{
			return Splay_45Tree(void 0)
		});
		impl_33(iterator,Splay_45Tree,function(){
			const _this=this;
			const iter=function* iter(_){
				if(defined_63(_)){
					(yield* iter(_["left!"]));
					(yield [_.key,_["val!"]]);
					(yield* iter(_["right!"]))
				}
			};
			return iter(_this.val)
		});
		kind_33(Splay_45Tree,Sorted_45Map);
		impl_33(empty_63,Splay_45Tree,function(){
			const _this=this;
			return ! defined_63(_this.val)
		});
		impl_33(empty_33,Splay_45Tree,function(){
			const _this=this;
			_this.val=void 0
		});
		impl_33(_63get,Splay_45Tree,function(key){
			const _this=this;
			return _ms.bool((! empty_63(_this)&&splay_33_63(_this,key)))?_ms.some(()=>{
				return _this.val["val!"]
			}()):_ms.None
		});
		impl_33(assoc_33,Splay_45Tree,function(key,val){
			const _this=this;
			if(_ms.bool(empty_63(_this))){
				_this.val=Splay_45Node(key,val,void 0,void 0)
			} else if(_ms.bool(splay_33_63(_this,key))){
				_this.val["val!"]=val
			} else {
				const old_45root=_this.val;
				_ms.assertNot(empty_63,_this);
				_this.val=()=>{
					if(_ms.bool(_60_63(old_45root.key,key))){
						const old_45right=old_45root["right!"];
						old_45root["right!"]=void 0;
						return Splay_45Node(key,val,old_45root,old_45right)
					} else {
						const old_45left=old_45root["left!"];
						old_45root["left!"]=void 0;
						return Splay_45Node(key,val,old_45left,old_45root)
					}
				}()
			}
		});
		impl_33(un_45assoc_33,Splay_45Tree,function(key){
			const _this=this;
			return _ms.bool((! empty_63(_this)&&splay_33_63(_this,key)))?_ms.some(()=>{
				const removed=_this.val;
				_this.val=()=>{
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
				return removed.val
			}()):_ms.None
		});
		const splay_33_63=function splay_33_63(_,key){
			const dummy=Splay_45Node(void 0,void 0,void 0,void 0);
			let left=dummy;
			let right=dummy;
			let cur=_.val;
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
			_.val=cur;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9TcGxheS1UcmVlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBYUEsbUJBQVksZ0JBQ1M7O0dBQXBCLG9CQUNDOzs7RUFHRixtQkFBYSxVQUNLOztHQUFqQix3QkFBTyxDQUFHLE1BQU0sT0FBTyxRQUFROzs7RUFFaEMsZUFBVyxhQUFXO0VBQ3RCLGVBQVcsTUFBTSxhQUNZLElBQUE7VUFBNUIsYUFBVzs7RUFFWixRQUFNLFNBQVMsYUFDYSxVQUFBO1NBK0NoQjtHQS9DWCxXQUFVLGVBQUEsRUFDQztJQUFWLEdBQUksV0FBUSxHQUNDO2FBQVIsS0FBSztZQUNOLENBQUUsTUFBTTthQUNQLEtBQUs7OztVQUNYLEtBMENXOztFQXhDWixRQUFNLGFBQVc7RUFFakIsUUFBTSxTQUFPLGFBQ2EsVUFBQTtTQXFDZDtVQXJDWCxFQUFJLFdBcUNPOztFQW5DWixRQUFNLFNBQU8sYUFDYyxVQUFBO1NBa0NmO0dBQUEsVUFsQ0g7O0VBRVQsUUFBTSxPQUFLLGFBQWEsU0FBQSxJQUNHO1NBK0JmO21CQS9CUixDQUFLLEVBQUksU0ErQkQsUUEvQmUsWUErQmYsTUEvQjRCLG9CQUNJO1dBOEJoQzs7O0VBNUJaLFFBQU0sU0FBTyxhQUFjLFNBQUEsSUFBSSxJQUNHO1NBMkJ0QjtHQTFCTixZQUFKLFNBMEJVLFFBekJDO0lBeUJELFVBekJELGFBQVcsSUFBSSxJQUFJLE9BQVU7VUFDdEMsWUFBQSxZQXdCVSxNQXhCRyxNQUNHO0lBdUJOLGtCQXZCSTtHQUFBLE9BRVY7SUFBSCxpQkFxQlM7a0JBcEJLLFNBb0JMO0lBQUE7S0FsQlIsWUFBQSxPQUFHLGVBQWEsTUFDRztNQUFsQixrQkFBWTtNQUNaLHFCQUFtQjthQUNuQixhQUFXLElBQUksSUFBSSxXQUFTO0tBQUEsT0FFekI7TUFBSCxpQkFBVztNQUNYLG9CQUFrQjthQUNsQixhQUFXLElBQUksSUFBSSxXQUFTO0tBQUE7SUFBQTtHQUFBO0VBQUE7RUFFakMsUUFBTSxjQUFVLGFBQWEsU0FBQSxJQUNHO1NBUXBCO21CQVJSLENBQUssRUFBSSxTQVFELFFBUmUsWUFRZixNQVI0QixvQkFDSTtJQUExQyxjQU9VO0lBQUE7S0FKVCxZQUFBLGNBQVUsVUFDTztNQUFoQixZQUFRO01BQ1IsaUJBQVc7TUFFWCxZQUFRLE1BQUs7TUFDYixxQkFBbUI7YUFDbkI7S0FBQSxPQUVHO2FBQ0g7OztXQUNGOzs7RUFLRCxrQkFBVyxxQkFBQSxFQUFFLElBQ0c7R0FBZixZQUFRLGFBQVcsT0FBVSxPQUFVLE9BQVU7R0FDakQsU0FBUztHQUNULFVBQVU7R0FDVixRQUFRO0dBRVIsVUFBVTtHQUVOLE9BQUE7SUFBRztLQUFBLFFBQUEsUUFBUSxJQUFJO0tBQ2pCLFlBQUEsT0FBRyxFQUFFLElBQ0M7TUFBTCxjQUFRLGNBQVUsTUFDRzthQUFYO09BQ1Q7TUFBQTtNQUNELHNCQUFnQix5QkFBQSxZQUNTO09BQXhCLGVBQWU7V0FDUjthQUNFO01BQUE7TUFFTCxZQUFKLE9BQUcsSUFBSSxtQkFDYTtPQUNuQixpQkFBVztPQUNYLGFBQWE7T0FDYixxQkFBbUI7T0FDbkIsY0FBUSxjQUFVLGFBQ1E7WUFBbEI7Y0FDRTtRQUNUO09BQUE7V0FDTTtPQUNQLGdCQUFZO01BQUEsT0FFVDtPQUFILGdCQUFZO01BQUE7S0FBQSxPQUNmLFlBQUEsT0FBRyxFQUFFLElBQ0M7TUFBTCxjQUFRLGVBQVcsTUFDRzthQUFaO09BQ1Q7TUFBQTtNQUNELHFCQUFlLHdCQUFBLFdBQ1E7T0FBdEIsZUFBZTtXQUNSO1lBQ0M7TUFBQTtNQUVKLFlBQUosT0FBRyxrQkFBZSxNQUNHO09BQ3BCLFVBQU07T0FDTixjQUFjO09BQ2QsYUFBYTtPQUNiLGNBQVEsZUFBVyxNQUNHO1lBQWQ7Y0FDRTtRQUNUO09BQUE7T0FDRCxlQUFXO01BQUEsT0FFUjtPQUFILGVBQVc7TUFBQTtLQUFBLE9BRVY7WUFBTTtNQUNUO0tBQUE7SUFBQTtHQUFBO0dBRUgsZUFBZTtHQUNmLGVBQWU7R0FDZixhQUFhO0dBQ2IsY0FBYztHQUNkLE1BQVM7VUFDVDtFQUFBO0VBRUQsb0JBQWEsdUJBQUEsS0FDSTtVQUFoQixXQUFTOztFQUNWLHFCQUFjLHdCQUFBLEtBQ0k7VUFBakIsV0FBUzs7RUF0Slgsd0JBQUE7a0JBYUEiLCJmaWxlIjoiYXQvTWFwL1NwbGF5LVRyZWUuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==