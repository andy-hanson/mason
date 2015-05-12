"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Bool","../../compare","../../control","../../math/Num","../../math/methods","../../Type/Kind","../../Type/Wrap-Type","../at","../atbang","../at-Type","../q","../Seq/Arraybang","../Seq/Seq","../Seq/Seqbang","./Priority-Queuebang"],function(exports,Bool_0,compare_1,control_2,Num_3,methods_4,Kind_5,Wrap_45Type_6,_64_7,_64_33_8,_64_45Type_9,_63_10,Array_33_11,Seq_12,Seq_33_13,Priority_45Queue_33_14){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Bool_0),and=_ms.get(_$2,"and"),not=_ms.get(_$2,"not"),_$3=_ms.getModule(compare_1),_60_63=_ms.get(_$3,"<?"),_$4=_ms.getModule(control_2),if_33=_ms.get(_$4,"if!"),returning=_ms.get(_$4,"returning"),_$5=_ms.getModule(Num_3),int_47=_ms.get(_$5,"int/"),_$6=_ms.getModule(methods_4),_43=_ms.get(_$6,"+"),_45=_ms.get(_$6,"-"),_42=_ms.get(_$6,"*"),_$7=_ms.getModule(Kind_5),kind_33=_ms.get(_$7,"kind!"),self_45kind_33=_ms.get(_$7,"self-kind!"),Wrap_45Type=_ms.getDefaultExport(Wrap_45Type_6),_$9=_ms.getModule(_64_7),count=_ms.get(_$9,"count"),each_33=_ms.get(_$9,"each!"),empty_63=_ms.get(_$9,"empty?"),iterator=_ms.get(_$9,"iterator"),map=_ms.get(_$9,"map"),_$10=_ms.getModule(_64_33_8),_43_43_33=_ms.get(_$10,"++!"),empty_33=_ms.get(_$10,"empty!"),_64_45Type=_ms.getDefaultExport(_64_45Type_9),_$11=_ms.getModule(_64_45Type_9),empty=_ms.get(_$11,"empty"),_$12=_ms.getModule(_63_10),un_45_63=_ms.get(_$12,"un-?"),Array_33=_ms.getDefaultExport(Array_33_11),_$14=_ms.getModule(Seq_12),_63first=_ms.get(_$14,"?first"),_$15=_ms.getModule(Seq_33_13),_63pop_62_33=_ms.get(_$15,"?pop>!"),set_45nth_33=_ms.get(_$15,"set-nth!"),Priority_45Queue_33=_ms.getDefaultExport(Priority_45Queue_33_14),_$16=_ms.getModule(Priority_45Queue_33_14),_63pop_33=_ms.get(_$16,"?pop!");
		const Heap_45Priority_45Queue_33=Wrap_45Type(function(){
			const doc="Default implementation for Priority-Queue!.";
			const wrapped_45type=Array_33;
			return {
				doc:doc,
				"wrapped-type":wrapped_45type,
				displayName:"Heap-Priority-Queue!"
			}
		}());
		self_45kind_33(Heap_45Priority_45Queue_33,_64_45Type,function(){
			const _k0=empty,_v0=function(){
				return Heap_45Priority_45Queue_33(empty(Array_33))
			};
			return _ms.map(_k0,_v0)
		}());
		kind_33(Heap_45Priority_45Queue_33,Priority_45Queue_33,function(){
			const _k0=_43_43_33,_v0=function(_,added){
				return each_33(added,_ms.sub(add_33,_.val))
			};
			const _k1=_63pop_33,_v1=function(_){
				const heap=_.val;
				return map(_63first(heap),function(first){
					return returning(first,function(){
						const last_45leaf=un_45_63(_63pop_62_33(heap));
						return if_33(not(empty_63(_)),function(){
							return fix_45down_33(heap,last_45leaf)
						})
					})
				})
			};
			const _k2=empty_63,_v2=function(_){
				return empty_63(_.val)
			};
			const _k3=empty_33,_v3=function(_){
				return empty_33(_.val)
			};
			const _k4=iterator,_v4=function(_){
				return iterator(_.val)
			};
			return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3,_k4,_v4)
		}());
		const idx_45left=_ms.set(function(idx){
			return _43(1,_42(2,idx))
		},"displayName","idx-left");
		const idx_45right=_ms.set(function(idx){
			return _43(2,_42(2,idx))
		},"displayName","idx-right");
		const idx_45parent=_ms.set(function(idx){
			return _45(int_47(_43(1,idx),2),1)
		},"displayName","idx-parent");
		const add_33=_ms.set(function(heap,em){
			heap.push(em);
			return fix_45up_33(heap,em)
		},"displayName","add!");
		const fix_45up_33=_ms.set(function(heap,val){
			const rec_33=_ms.set(function(idx){
				const ip=_ms.lazy(function(){
					return idx_45parent(idx)
				});
				const parent=_ms.lazy(function(){
					return _ms.sub(heap,_ms.unlazy(ip))
				});
				if(_ms.bool(and(_60_63(0,idx),_ms.lazy(function(){
					return _60_63(val,_ms.unlazy(parent))
				})))){
					set_45nth_33(heap,idx,_ms.unlazy(parent));
					rec_33(_ms.unlazy(ip))
				} else {
					set_45nth_33(heap,idx,val)
				}
			},"displayName","rec!");
			return rec_33(_45(count(heap),1))
		},"displayName","fix-up!");
		const fix_45down_33=_ms.set(function(heap,val){
			const size=count(heap);
			const rec_33=_ms.set(function(idx){
				const il=idx_45left(idx);
				const left=_ms.lazy(function(){
					return _ms.sub(heap,il)
				});
				const l_60=and(_60_63(il,size),_ms.lazy(function(){
					return _60_63(_ms.unlazy(left),val)
				}));
				const ir=idx_45right(idx);
				const right=_ms.lazy(function(){
					return _ms.sub(heap,ir)
				});
				const r_60=and(_60_63(ir,size),_ms.lazy(function(){
					return _60_63(_ms.unlazy(right),val)
				}));
				const fill_33=_ms.set(function(val){
					return set_45nth_33(heap,idx,val)
				},"displayName","fill!");
				const rec_45left_33=_ms.set(function(){
					fill_33(_ms.unlazy(left));
					return rec_33(il)
				},"displayName","rec-left!");
				const rec_45right_33=_ms.set(function(){
					fill_33(_ms.unlazy(right));
					return rec_33(ir)
				},"displayName","rec-right!");
				if(_ms.bool(l_60)){
					if(_ms.bool(and(r_60,_ms.lazy(function(){
						return _60_63(_ms.unlazy(right),_ms.unlazy(left))
					})))){
						rec_45right_33()
					} else {
						rec_45left_33()
					}
				} else if(_ms.bool(r_60)){
					rec_45right_33(null)
				} else {
					fill_33(val)
				}
			},"displayName","rec!");
			return rec_33(0)
		},"displayName","fix-down!");
		const displayName=exports.displayName="Heap-Priority-Queue!";
		exports.default=Heap_45Priority_45Queue_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1ByaW9yaXR5LVF1ZXVlL0hlYXAtUHJpb3JpdHktUXVldWUhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBaUJBLGlDQUF1QixzQkFDUztHQUEvQixVQUFNO0dBQ04scUJBQWM7VUFEaUI7Ozs7OztFQUdoQyxlQUFXLDJCQUFxQixxQkFDTTtHQUFyQyxVQUFBLFVBQ1UsVUFBQTtXQUFULDJCQUFzQixNQUFNO0dBQUE7OztFQUU5QixRQUFNLDJCQUFxQiw4QkFDZTtHQUF6QyxVQUFBLGNBQVEsU0FBQSxFQUFFLE1BQ0s7V0FBZCxRQUFNLGNBQU0sT0FBSzs7R0FDbEIsVUFBQSxjQUFVLFNBQUEsRUFDQztJQUFWLFdBQU87V0FDUCxJQUFLLFNBQU8sTUFBTyxTQUFBLE1BQ0s7WUFBdkIsVUFBVSxNQUNPLFVBQUE7TUFBaEIsa0JBQVksU0FBTSxhQUFPO2FBQ3pCLE1BQUssSUFBSSxTQUFBLElBQ1UsVUFBQTtjQUFsQixjQUFVLEtBQUs7TUFBQTtLQUFBO0lBQUE7R0FBQTtHQUNuQixVQUFBLGFBQVcsU0FBQSxFQUNDO1dBQVgsU0FBTzs7R0FDUixVQUFBLGFBQVcsU0FBQSxFQUNDO1dBQVgsU0FBTzs7R0FDUixVQUFBLGFBQWEsU0FBQSxFQUNDO1dBQWIsU0FBUzs7OztFQUlWLHlCQUFZLFNBQUEsSUFDRztVQUFkLElBQUUsRUFBRyxJQUFFLEVBQUU7RUFBQTtFQUNWLDBCQUFhLFNBQUEsSUFDRztVQUFmLElBQUUsRUFBRyxJQUFFLEVBQUU7RUFBQTtFQUNWLDJCQUFjLFNBQUEsSUFDRztVQUFoQixJQUFHLE9BQU0sSUFBRSxFQUFFLEtBQUssR0FBRztFQUFBO0VBRXRCLHFCQUFRLFNBQUEsS0FBSyxHQUNFO0dBQWQsVUFBVTtVQUNWLFlBQVEsS0FBSztFQUFBO0VBR2QsMEJBQVcsU0FBQSxLQUFLLElBQ0c7R0FBbEIscUJBQVEsU0FBQSxJQUNHO0lBQVY7WUFBTSxhQUFXO0lBQUE7SUFDakI7b0JBQVU7O0lBRUwsWUFBSixJQUFLLE9BQUcsRUFBRTtZQUFPLE9BQUc7U0FDVztLQUE5QixhQUFTLEtBQUs7S0FDZDtXQUVHO0tBQUgsYUFBUyxLQUFLLElBQUk7SUFBQTtHQUFBO1VBQ3JCLE9BQU0sSUFBRyxNQUFNLE1BQU07RUFBQTtFQUl0Qiw0QkFBYSxTQUFBLEtBQUssSUFDRztHQUFwQixXQUFPLE1BQU07R0FDYixxQkFBUSxTQUFBLElBQ0c7SUFBVixTQUFLLFdBQVM7SUFDZDtvQkFBUSxLQUFLO0lBQUE7SUFDYixXQUFLLElBQUssT0FBRyxHQUFHO1lBQVEsd0JBQVE7SUFBQTtJQUNoQyxTQUFLLFlBQVU7SUFDZjtvQkFBUyxLQUFLO0lBQUE7SUFDZCxXQUFLLElBQUssT0FBRyxHQUFHO1lBQVEseUJBQVM7SUFBQTtJQUVqQyxzQkFBUyxTQUFBLElBQ0c7WUFBWCxhQUFTLEtBQUssSUFBSTtJQUFBO0lBQ25CLDRCQUNhLFVBQUE7S0FBWjtZQUNBLE9BQUs7SUFBQTtJQUNOLDZCQUNjLFVBQUE7S0FBYjtZQUNBLE9BQUs7SUFBQTtJQUVELFlBQUosTUFDRTtLQUNJLFlBQUosSUFBSTthQUFLO1VBQ2M7TUFBdEI7S0FBQSxPQUVHO01BQUg7S0FBQTtJQUFBLE9BQ0gsWUFBQSxNQUNFO0tBQUQsZUFBVztJQUFBLE9BRVI7S0FBSCxRQUFNO0lBQUE7R0FBQTtVQUNULE9BQUs7RUFBQTtFQW5HUCxzQ0FBQTtrQkFxR0EiLCJmaWxlIjoiYXQvUHJpb3JpdHktUXVldWUvSGVhcC1Qcmlvcml0eS1RdWV1ZWJhbmcuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==