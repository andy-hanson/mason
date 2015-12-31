"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../compare","./../../js","./../../math/methods","./../../methods","./../../Type/primitive","./../../Type/Type","./../at","./../Set/Set","./Seq","./../../math/Number"],(exports,compare_0,js_1,methods_2,methods_3,primitive_4,Type_5,_64_6,Set_7,Seq_8,Number_9)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_60_61_63=_ms.get(_$0,"<=?"),_60_63=_ms.get(_$0,"<?"),_$1=_ms.getModule(js_1),js_45set=_ms.get(_$1,"js-set"),js_45sub=_ms.get(_$1,"js-sub"),_$2=_ms.getModule(methods_2),_43=_ms.get(_$2,"+"),_$3=_ms.getModule(methods_3),set_45sub_33=_ms.get(_$3,"set-sub!"),_$4=_ms.getModule(primitive_4),Num=_ms.get(_$4,"Num"),_$5=_ms.getModule(Type_5),_61_62=_ms.get(_$5,"=>"),_64=_ms.getDefaultExport(_64_6),_$6=_ms.getModule(_64_6),_45_33=_ms.get(_$6,"-!"),_45_45_33=_ms.get(_$6,"--!"),count=_ms.get(_$6,"count"),each_33=_ms.get(_$6,"each!"),empty_33=_ms.get(_$6,"empty!"),empty_63=_ms.get(_$6,"empty?"),from_45stream=_ms.get(_$6,"from-stream"),Set=_ms.getDefaultExport(Set_7),Seq=_ms.getDefaultExport(Seq_8),_$7=_ms.getModule(Seq_8),_60_43_43_33=_ms.get(_$7,"<++!"),_43_43_62_33=_ms.get(_$7,"++>!"),_64indexes=_ms.get(_$7,"@indexes"),_63nth=_ms.get(_$7,"?nth"),_63_60pop_33=_ms.get(_$7,"?<pop!"),_63pop_62_33=_ms.get(_$7,"?pop>!"),_$8=_ms.lazyGetModule(Number_9),Nat=_ms.lazyProp(_$8,"Nat");
		_ms.traitWithDefs(Array,Seq,{
			[_ms.symbol(from_45stream)](stream){
				let _this=this;
				return (()=>{
					let _=[];
					each_33(stream,_ms.methodBound(_,"push"));
					return _
				})()
			}
		},{
			[_ms.symbol(count)](){
				let _this=this;
				return _this.length
			},
			[_ms.symbol(_63nth)](n){
				let _this=this;
				return (_60_63(n,count(_this))?_ms.some((()=>{
					return js_45sub(_this,n)
				})()):_ms.None)
			},
			[_ms.symbol(_60_43_43_33)](added){
				let _this=this;
				_ms.checkInstance(_64,added,"added");
				return _this.unshift(...added)
			},
			[_ms.symbol(_43_43_62_33)](added){
				let _this=this;
				_ms.checkInstance(_64,added,"added");
				return _this.push(...added)
			},
			[_ms.symbol(_63_60pop_33)](){
				let _this=this;
				return (empty_63(_this)?_ms.None:_ms.some((()=>{
					return _this.shift()
				})()))
			},
			[_ms.symbol(_63pop_62_33)](){
				let _this=this;
				return (empty_63(_this)?_ms.None:_ms.some((()=>{
					return _this.pop()
				})()))
			},
			[_ms.symbol(empty_33)](){
				let _this=this;
				for(;;){
					if(! _this.length){
						break
					};
					_this.pop()
				}
			},
			[_ms.symbol(set_45sub_33)](n,val){
				let _this=this;
				_ms.checkInstance(_ms.unlazy(Nat),n,"n");
				js_45set(_this,n,val)
			},
			[_ms.symbol(_45_33)](em){
				let _this=this;
				for(let _ of _64indexes(_this)){
					if(_61_63(_ms.sub(_this,_),em)){
						_this.splice(_,1);
						break
					}
				}
			},
			[_ms.symbol(_45_45_33)](_64deleted){
				let _this=this;
				_64deleted=_61_62(Set,_64deleted);
				filter_33(_this,em=>{
					return (()=>{
						let _=_ms.hasInstance(_64deleted,em);
						if(_){
							_45_45_33(_64deleted,[em])
						};
						return _
					})()
				})
			}
		});
		let filter_33=exports["filter!"]=function filter_33(arr,keep_45if_63){
			let read_45idx=0;
			let write_45idx=0;
			for(;;){
				if(_60_61_63(arr.length,read_45idx)){
					break
				};
				let here=_ms.sub(arr,read_45idx);
				if(keep_45if_63(here)){
					_ms.setSub(arr,write_45idx,here,"mutate");
					write_45idx=_43(1,write_45idx)
				};
				read_45idx=_43(1,read_45idx)
			};
			arr.length=write_45idx
		};
		let fill=exports.fill=function fill(count,filler){
			_ms.checkInstance(Num,count,"count");
			_ms.checkInstance(Function,filler,"filler");
			return (()=>{
				let _=new (Array)(count);
				for(let i of _64indexes(_)){
					_ms.setSub(_,i,filler(i),"init")
				};
				return _
			})()
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9TZXEvQXJyYXkubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7b0JBZU8sTUFBTTtlQUdYLGdCQUFhLE9BQ007UUE0Q1g7V0E1Q0YsS0FDRTtXQURGO0tBQ0osUUFBTSx1QkFBUTs7Ozs7ZUFFakIsU0FDTztRQXdDRTtXQUFBOztlQXRDVCxTQUFNLEVBQ0M7UUFxQ0U7V0FyQ0wsQ0FBQSxPQUFHLEVBQUcsTUFxQ0Qsc0JBcENZO1lBQW5CLFNBb0NPLE1BcENLO0lBQUE7O2VBRWQsZUFBTSxNQUNPO1FBaUNKO3NCQWxDRztXQWtDSCxjQWpDQyxHQUFHO0dBQUE7ZUFFYixlQUFNLE1BQ087UUE4Qko7c0JBL0JHO1dBK0JILFdBOUJGLEdBQUc7R0FBQTtlQUVWLGdCQUNRO1FBMkJDO1dBM0JELENBQUEsU0EyQkMsOEJBMUJVO1lBMEJWOzs7ZUF4QlQsZ0JBQ1E7UUF1QkM7V0F2QkQsQ0FBQSxTQXVCQyw4QkF0QlU7WUFzQlY7OztlQXBCVCxZQUNTO1FBbUJBO0lBZkwsT0FBQTtLQUFLLEtBZUEsYUFkTztNQUFiO0tBQUE7S0FjTTs7O2VBWFQsZUFBVyxFQUFNLElBQ0c7UUFVWDs7SUFWUixTQVVRLE1BVkksRUFBRTtHQUFBO2VBRWYsU0FBSyxHQUNFO1FBT0U7SUFQSixRQUFBLEtBQUEsV0FPSSxPQU5TO0tBQWIsR0FBQSxlQU1JLE1BTkssR0FBRSxJQUNFO01BS1QsYUFMRyxFQUFDO01BQ1Y7S0FBQTtJQUFBO0dBQUE7ZUFFSCxZQUFNLFdBQ1E7UUFDTDtlQURJLE9BQUcsSUFBSTtJQUNuQixVQUFRLE1BQU0sSUFDRTtZQUFWLEtBQ1c7NEJBRFIsV0FBSDtNQUNBLEdBQUEsRUFDQTtPQUNILFVBQUksV0FBUyxDQUFDO01BQUE7Ozs7OztFQUduQixpQ0FBVyxtQkFBQSxJQUFJLGFBQ1E7R0FBdEIsZUFBVztHQUNYLGdCQUFZO0dBR1QsT0FBQTtJQUFDLEdBQUEsVUFBSSxXQUFXLFlBQ1E7S0FBekI7SUFBQTtJQUVELGlCQUFPLElBQUk7SUFDUixHQUFBLGFBQVMsTUFDSTtnQkFBZixJQUFJLFlBQWM7aUJBQ0wsSUFBRSxFQUFFO0lBQUE7ZUFFTixJQUFFLEVBQUU7R0FBQTtHQUVqQixXQUFjO0VBQUE7RUFHZixzQkFBTyxjQUFBLE1BQVUsT0FDZTtxQkFEbkI7cUJBQVc7VUFFbEIsS0FDZTtVQURmLEtBQUksT0FBTTtJQUNWLFFBQUEsS0FBSyxXQUFTLEdBQ0E7Z0JBQWhCLEVBQUMsRUFBSyxPQUFPIiwiZmlsZSI6ImF0L1NlcS9BcnJheS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9
