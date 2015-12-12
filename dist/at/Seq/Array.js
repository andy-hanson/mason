"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../../compare","./../../js","./../../math/methods","./../../methods","./../../Type/Kind","./../../Type/Method","./../../Type/primitive","./../../Type/Type","./../at","./../Set/Set","./Seq","./../../math/Number"],(exports,compare_0,js_1,methods_2,methods_3,Kind_4,Method_5,primitive_6,Type_7,_64_8,Set_9,Seq_10,Number_11)=>{
	exports._get=_ms.lazy(()=>{
		let _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_60_61_63=_ms.get(_$0,"<=?"),_60_63=_ms.get(_$0,"<?"),_$1=_ms.getModule(js_1),js_45set=_ms.get(_$1,"js-set"),js_45sub=_ms.get(_$1,"js-sub"),_$2=_ms.getModule(methods_2),_43=_ms.get(_$2,"+"),_$3=_ms.getModule(methods_3),set_45sub_33=_ms.get(_$3,"set-sub!"),_$4=_ms.getModule(Kind_4),kind_33=_ms.get(_$4,"kind!"),_$5=_ms.getModule(Method_5),self_45impl_33=_ms.get(_$5,"self-impl!"),_$6=_ms.getModule(primitive_6),Num=_ms.get(_$6,"Num"),_$7=_ms.getModule(Type_7),_61_62=_ms.get(_$7,"=>"),_64=_ms.getDefaultExport(_64_8),_$8=_ms.getModule(_64_8),_45_33=_ms.get(_$8,"-!"),_45_45_33=_ms.get(_$8,"--!"),count=_ms.get(_$8,"count"),each_33=_ms.get(_$8,"each!"),empty_33=_ms.get(_$8,"empty!"),empty_63=_ms.get(_$8,"empty?"),from_45stream=_ms.get(_$8,"from-stream"),Set=_ms.getDefaultExport(Set_9),Seq=_ms.getDefaultExport(Seq_10),_$9=_ms.getModule(Seq_10),_60_43_43_33=_ms.get(_$9,"<++!"),_43_43_62_33=_ms.get(_$9,"++>!"),_64indexes=_ms.get(_$9,"@indexes"),_63nth=_ms.get(_$9,"?nth"),_63_60pop_33=_ms.get(_$9,"?<pop!"),_63pop_62_33=_ms.get(_$9,"?pop>!"),_$10=_ms.lazyGetModule(Number_11),Nat=_ms.lazyProp(_$10,"Nat");
		self_45impl_33(from_45stream,Array,stream=>{
			return (()=>{
				let _=[];
				each_33(stream,_ms.methodBound(_,"push"));
				return _
			})()
		});
		kind_33(Array,Seq,(()=>{
			let built=new (global.Map)();
			_ms.setSub(built,count,function(){
				let _this=this;
				return _this.length
			});
			_ms.setSub(built,_63nth,function(n){
				let _this=this;
				return (_60_63(n,count(_this))?_ms.some((()=>{
					return js_45sub(_this,n)
				})()):_ms.None)
			});
			_ms.setSub(built,_60_43_43_33,function(added){
				let _this=this;
				_ms.checkInstance(_64,added,"added");
				return _this.unshift(...added)
			});
			_ms.setSub(built,_43_43_62_33,function(added){
				let _this=this;
				_ms.checkInstance(_64,added,"added");
				return _this.push(...added)
			});
			_ms.setSub(built,_63_60pop_33,function(){
				let _this=this;
				return (empty_63(_this)?_ms.None:_ms.some((()=>{
					return _this.shift()
				})()))
			});
			_ms.setSub(built,_63pop_62_33,function(){
				let _this=this;
				return (empty_63(_this)?_ms.None:_ms.some((()=>{
					return _this.pop()
				})()))
			});
			_ms.setSub(built,empty_33,function(){
				let _this=this;
				for(;;){
					if(! _this.length){
						break
					};
					_this.pop()
				}
			});
			_ms.setSub(built,set_45sub_33,function(n,val){
				let _this=this;
				_ms.checkInstance(_ms.unlazy(Nat),n,"n");
				js_45set(_this,n,val)
			});
			_ms.setSub(built,_45_33,function(em){
				let _this=this;
				for(let _ of _64indexes(_this)){
					if(_61_63(_ms.sub(_this,_),em)){
						_this.splice(_,1);
						break
					}
				}
			});
			_ms.setSub(built,_45_45_33,function(_64deleted){
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
			});
			return built
		})());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9TZXEvQXJyYXkubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFpQkEsZUFBVyxjQUFZLE1BQU87VUFDeEIsS0FDRTtVQURGO0lBQ0osUUFBTSx1QkFBUTs7OztFQUVoQixRQUFNLE1BQU0sSUFDRyxLQUFBOztvQkFBZCxNQUNXO1FBd0NGO1dBQUE7O29CQXRDVCxPQUFVLFNBQUE7UUFzQ0Q7V0FyQ0wsQ0FBQSxPQUFHLEVBQUcsTUFxQ0Qsc0JBcENZO1lBQW5CLFNBb0NPLE1BcENLO0lBQUE7O29CQUVkLGFBQVUsU0FBQTtRQWtDRDtzQkFsQ087V0FrQ1AsY0FqQ0MsR0FBRztHQUFBO29CQUViLGFBQVUsU0FBQTtRQStCRDtzQkEvQk87V0ErQlAsV0E5QkYsR0FBRztHQUFBO29CQUVWLGFBQ1k7UUEyQkg7V0EzQkQsQ0FBQSxTQTJCQyw4QkExQlU7WUEwQlY7OztvQkF4QlQsYUFDWTtRQXVCSDtXQXZCRCxDQUFBLFNBdUJDLDhCQXRCVTtZQXNCVjs7O29CQXBCVCxTQUNhO1FBbUJKO0lBZkwsT0FBQTtLQUFLLEtBZUEsYUFkTztNQUFiO0tBQUE7S0FjTTs7O29CQVhULGFBQWUsU0FBQSxFQUFNO1FBV1o7O0lBVlIsU0FVUSxNQVZJLEVBQUU7R0FBQTtvQkFFZixPQUFTLFNBQUE7UUFRQTtJQVBKLFFBQUEsS0FBQSxXQU9JLE9BTlM7S0FBYixHQUFBLGVBTUksTUFOSyxHQUFFLElBQ0U7TUFLVCxhQUxHLEVBQUM7TUFDVjtLQUFBO0lBQUE7R0FBQTtvQkFFSCxVQUFVLFNBQUE7UUFFRDtlQURJLE9BQUcsSUFBSTtJQUNuQixVQUFRLE1BQU07WUFDUixLQUNXOzRCQURSLFdBQUg7TUFDQSxHQUFBLEVBQ0E7T0FDSCxVQUFJLFdBQVMsQ0FBQztNQUFBOzs7Ozs7O0VBR25CLGlDQUFXLG1CQUFBLElBQUk7R0FDZCxlQUFXO0dBQ1gsZ0JBQVk7R0FHVCxPQUFBO0lBQUMsR0FBQSxVQUFJLFdBQVcsWUFDUTtLQUF6QjtJQUFBO0lBRUQsaUJBQU8sSUFBSTtJQUNSLEdBQUEsYUFBUyxNQUNJO2dCQUFmLElBQUksWUFBYztpQkFDTCxJQUFFLEVBQUU7SUFBQTtlQUVOLElBQUUsRUFBRTtHQUFBO0dBRWpCLFdBQWM7RUFBQTtFQUdmLHNCQUFPLGNBQUEsTUFBVTtxQkFBSjtxQkFBVztVQUVsQixLQUNlO1VBRGYsS0FBSSxPQUFNO0lBQ1YsUUFBQSxLQUFLLFdBQVMsR0FDQTtnQkFBaEIsRUFBQyxFQUFLLE9BQU8iLCJmaWxlIjoiYXQvU2VxL0FycmF5LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
