"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../compare","./../../js","./../../math/methods","./../../methods","./../../Type/Kind","./../../Type/Method","./../../Type/Type","./../at","./../at-Type","./../Set/Set","./Seq","./../../math/Number"],(exports,compare_0,js_1,methods_2,methods_3,Kind_4,Method_5,Type_6,_64_7,_64_45Type_8,Set_9,Seq_10,Number_11)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_60_61_63=_ms.get(_$0,"<=?"),_60_63=_ms.get(_$0,"<?"),_$1=_ms.getModule(js_1),js_45set=_ms.get(_$1,"js-set"),js_45sub=_ms.get(_$1,"js-sub"),_$2=_ms.getModule(methods_2),_43=_ms.get(_$2,"+"),_$3=_ms.getModule(methods_3),set_45sub_33=_ms.get(_$3,"set-sub!"),_$4=_ms.getModule(Kind_4),kind_33=_ms.get(_$4,"kind!"),self_45kind_33=_ms.get(_$4,"self-kind!"),_$5=_ms.getModule(Method_5),impl_33=_ms.get(_$5,"impl!"),self_45impl_33=_ms.get(_$5,"self-impl!"),_$6=_ms.getModule(Type_6),_61_62=_ms.get(_$6,"=>"),_64=_ms.getDefaultExport(_64_7),_$7=_ms.getModule(_64_7),_45_33=_ms.get(_$7,"-!"),_45_45_33=_ms.get(_$7,"--!"),count=_ms.get(_$7,"count"),empty_33=_ms.get(_$7,"empty!"),empty_63=_ms.get(_$7,"empty?"),_64_45Type=_ms.getDefaultExport(_64_45Type_8),_$8=_ms.getModule(_64_45Type_8),empty=_ms.get(_$8,"empty"),from_45stream=_ms.get(_$8,"from-stream"),Set=_ms.getDefaultExport(Set_9),Seq=_ms.getDefaultExport(Seq_10),_$9=_ms.getModule(Seq_10),_60_43_43_33=_ms.get(_$9,"<++!"),_43_43_62_33=_ms.get(_$9,"++>!"),_64indexes=_ms.get(_$9,"@indexes"),_63nth=_ms.get(_$9,"?nth"),_63_60pop_33=_ms.get(_$9,"?<pop!"),_63pop_62_33=_ms.get(_$9,"?pop>!"),_$10=_ms.lazyGetModule(Number_11),Nat=_ms.lazyProp(_$10,"Nat");
		self_45kind_33(Array,_64_45Type);
		self_45impl_33(empty,Array,()=>{
			return []
		});
		self_45impl_33(from_45stream,Array,stream=>{
			const arr=[];
			for(let _ of stream){
				arr.push(_)
			};
			return arr
		});
		kind_33(Array,Seq);
		impl_33(count,Array,function(){
			const _this=this;
			return _this.length
		});
		impl_33(_63nth,Array,function(n){
			const _this=this;
			return (_60_63(n,count(_this))?_ms.some((()=>{
				return js_45sub(_this,n)
			})()):_ms.None)
		});
		impl_33(_60_43_43_33,Array,function(added){
			const _this=this;
			_ms.checkContains(_64,added,"added");
			return _this.unshift(...added)
		});
		impl_33(_43_43_62_33,Array,function(added){
			const _this=this;
			_ms.checkContains(_64,added,"added");
			return _this.push(...added)
		});
		impl_33(_63_60pop_33,Array,function(){
			const _this=this;
			return (empty_63(_this)?_ms.None:_ms.some((()=>{
				return _this.shift()
			})()))
		});
		impl_33(_63pop_62_33,Array,function(){
			const _this=this;
			return (empty_63(_this)?_ms.None:_ms.some((()=>{
				return _this.pop()
			})()))
		});
		impl_33(empty_33,Array,function(){
			const _this=this;
			for(;;){
				if(empty_63(_this)){
					break
				};
				_this.pop()
			}
		});
		impl_33(set_45sub_33,Array,function(n,val){
			const _this=this;
			_ms.checkContains(_ms.unlazy(Nat),n,"n");
			js_45set(_this,n,val)
		});
		impl_33(_45_33,Array,function(em){
			const _this=this;
			for(let _ of _64indexes(_this)){
				if(_61_63(_ms.sub(_this,_),em)){
					_this.splice(_,1);
					break
				}
			}
		});
		impl_33(_45_45_33,Array,function(_64deleted){
			const _this=this;
			_64deleted=_61_62(Set,_64deleted);
			filter_33(_this,em=>{
				return (_=>{
					if(_){
						_45_45_33(_64deleted,[em])
					};
					return _
				})(_ms.contains(_64deleted,em))
			})
		});
		const filter_33=exports["filter!"]=function filter_33(arr,keep_45if_63){
			let read_45idx=0;
			let write_45idx=0;
			for(;;){
				if(_60_61_63(arr.length,read_45idx)){
					break
				};
				const here=_ms.sub(arr,read_45idx);
				if(keep_45if_63(here)){
					_ms.setSub(arr,write_45idx,here,"mutate");
					write_45idx=_43(1,write_45idx)
				};
				read_45idx=_43(1,read_45idx)
			};
			arr.length=write_45idx
		};
		const fill=exports.fill=function fill(count,filler){
			_ms.checkContains(Number,count,"count");
			_ms.checkContains(Function,filler,"filler");
			return (_=>{
				for(let i of _64indexes(_)){
					_ms.setSub(_,i,filler(i),"init")
				};
				return _
			})(new (Array)(count))
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9TZXEvQXJyYXkubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFpQkEsZUFBVyxNQUFNO0VBQ2pCLGVBQVcsTUFBTSxNQUNPO1VBQXZCO0VBQUE7RUFDRCxlQUFXLGNBQVksTUFBTztHQUM3QixVQUFNO0dBQ0QsUUFBQSxLQUFBLE9BQ007SUFBVixTQUFTO0dBQUE7VUFDVjtFQUFBO0VBR0QsUUFBTSxNQUFNO0VBRVosUUFBTSxNQUFNLE1BQ1E7U0F1Q1g7VUFBQTs7RUFyQ1QsUUFBTSxPQUFLLE1BQVEsU0FBQTtTQXFDVjtVQXBDUixDQUFHLE9BQUcsRUFBRyxNQW9DRCxzQkFuQ1k7V0FBbkIsU0FtQ08sTUFuQ0s7R0FBQTs7RUFFZCxRQUFNLGFBQUssTUFBUSxTQUFBO1NBaUNWO3FCQWpDZ0I7VUFpQ2hCLGNBaENDLEdBQUc7RUFBQTtFQUViLFFBQU0sYUFBSyxNQUFRLFNBQUE7U0E4QlY7cUJBOUJnQjtVQThCaEIsV0E3QkYsR0FBRztFQUFBO0VBRVYsUUFBTSxhQUFPLE1BQ1E7U0EwQlo7VUExQlIsQ0FBTyxTQTBCQyw4QkF6QlU7V0F5QlY7OztFQXZCVCxRQUFNLGFBQU8sTUFDUTtTQXNCWjtVQXRCUixDQUFPLFNBc0JDLDhCQXJCVTtXQXFCVjs7O0VBbkJULFFBQU0sU0FBTyxNQUNTO1NBa0JiO0dBZkosT0FBQTtJQUFILEdBQUksU0FlRyxPQWRRO0tBQWQ7SUFBQTtJQWNNOzs7RUFYVCxRQUFNLGFBQVMsTUFBUyxTQUFBLEVBQU07U0FXckI7O0dBVlIsU0FVUSxNQVZJLEVBQUU7RUFBQTtFQUVmLFFBQU0sT0FBRyxNQUFTLFNBQUE7U0FRVDtHQVBILFFBQUEsS0FBQSxXQU9HLE9BTlU7SUFBakIsR0FBSSxlQU1HLE1BTkssR0FBRyxJQUNFO0tBS1YsYUFMRSxFQUFFO0tBQ1Y7SUFBQTtHQUFBO0VBQUE7RUFFSCxRQUFNLFVBQUksTUFBUyxTQUFBO1NBRVY7Y0FESSxPQUFHLElBQUk7R0FDbkIsVUFBUSxNQUFNO1dBQ1IsSUFDVztLQUFmLEdBQUksRUFDQztNQUNKLFVBQUksV0FBUyxDQUFDO0tBQUE7O29CQUhSLFdBQUg7R0FBQTtFQUFBO0VBTVAsbUNBQVcsbUJBQUEsSUFBSTtHQUNkLGVBQWE7R0FDYixnQkFBYztHQUdWLE9BQUE7SUFBSCxHQUFJLFVBQUksV0FBVyxZQUNRO0tBQTFCO0lBQUE7SUFFRCxtQkFBTyxJQUFJO0lBQ1gsR0FBSSxhQUFTLE1BQ0k7Z0JBQWhCLElBQUksWUFBYztpQkFDTCxJQUFFLEVBQUU7SUFBQTtlQUVOLElBQUUsRUFBRTtHQUFBO0dBRWpCLFdBQWM7RUFBQTtFQUdmLHdCQUFPLGNBQUEsTUFBYTtxQkFBUDtxQkFBYztVQUVyQixJQUNlO0lBQWQsUUFBQSxLQUFLLFdBQUEsR0FDUztnQkFBbEIsRUFBRSxFQUFLLE9BQU87OztNQUZYLEtBQUksT0FBTTtFQUFBIiwiZmlsZSI6ImF0L1NlcS9BcnJheS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
