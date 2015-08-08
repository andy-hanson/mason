"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Type/Method","../../Type/Kind","../at","../at-Type","../q","../Seq/Stream","./Map","./Map-Type","../../compare","../Seq/Seq"],(exports,Method_0,Kind_1,_64_2,_64_45Type_3,_63_4,Stream_5,Map_6,Map_45Type_7,compare_8,Seq_9)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(Method_0),impl_33=_ms.get(_$2,"impl!"),self_45impl_33=_ms.get(_$2,"self-impl!"),_$3=_ms.getModule(Kind_1),kind_33=_ms.get(_$3,"kind!"),self_45kind_33=_ms.get(_$3,"self-kind!"),_$4=_ms.getModule(_64_2),count=_ms.get(_$4,"count"),empty_33=_ms.get(_$4,"empty!"),_$5=_ms.getModule(_64_45Type_3),empty=_ms.get(_$5,"empty"),_$6=_ms.getModule(_63_4),Opt_45_62_63=_ms.get(_$6,"Opt->?"),Stream=_ms.getDefaultExport(Stream_5),Map=_ms.getDefaultExport(Map_6),_$8=_ms.getModule(Map_6),assoc_33=_ms.get(_$8,"assoc!"),_63get=_ms.get(_$8,"?get"),has_45key_63=_ms.get(_$8,"has-key?"),keys=_ms.get(_$8,"keys"),un_45assoc_33=_ms.get(_$8,"un-assoc!"),values=_ms.get(_$8,"values"),Map_45Type=_ms.getDefaultExport(Map_45Type_7),_$11=_ms.lazyGetModule(compare_8),_61_63=_ms.lazyProp(_$11,"=?"),_$12=_ms.lazyGetModule(Seq_9),seq_61_63=_ms.lazyProp(_$12,"seq=?");
		const Id_45Map=(()=>{
			const built={};
			const doc=built.doc=`JavaScript's native Map type.\nOnly considers exactly identical keys =?; this makes it the fastest Map.`;
			return _ms.set(global.Map,built,"Id-Map")
		})();
		kind_33(Id_45Map,Map);
		self_45kind_33(Id_45Map,Map_45Type);
		const test=exports.test=function test(){
			const _=empty(Id_45Map);
			assoc_33(_,1,2);
			_ms.assert(_ms.unlazy(_61_63),_ms.sub(_,1),2);
			const key_451=(()=>{
				const built={};
				const a=built.a=1;
				return _ms.setName(built,"key-1")
			})();
			assoc_33(_,key_451,3);
			_ms.assert(_ms.unlazy(_61_63),_ms.sub(_,key_451),3);
			const key_452=(()=>{
				const built={};
				const a=built.a=1;
				return _ms.setName(built,"key-2")
			})();
			assoc_33(_,key_452,4);
			_ms.assert(_ms.unlazy(_61_63),_ms.sub(_,key_451),3);
			_ms.assert(_ms.unlazy(_61_63),_ms.sub(_,key_452),4);
			_ms.assert(_ms.unlazy(seq_61_63),keys(_),[1,key_451,key_452]);
			_ms.assert(_ms.unlazy(seq_61_63),values(_),[2,3,4])
		};
		self_45impl_33(empty,Id_45Map,()=>{
			return new (Id_45Map)()
		});
		impl_33(count,Id_45Map,function(){
			const _this=this;
			return _this.size
		});
		impl_33(_63get,Id_45Map,function(key){
			const _this=this;
			return Opt_45_62_63(_this.get(key))
		});
		impl_33(has_45key_63,Id_45Map,function(key){
			const _this=this;
			return _this.has(key)
		});
		impl_33(keys,Id_45Map,function(){
			const _this=this;
			return new (Stream)(()=>{
				return _this.keys()
			})
		});
		impl_33(values,Id_45Map,function(){
			const _this=this;
			return new (Stream)(()=>{
				return _this.values()
			})
		});
		impl_33(empty_33,Id_45Map,function(){
			const _this=this;
			_this.clear()
		});
		impl_33(assoc_33,Id_45Map,function(key,val){
			const _this=this;
			_this.set(key,val)
		});
		impl_33(un_45assoc_33,Id_45Map,function(key){
			const _this=this;
			return (_=>{
				_this.delete(key);
				return _
			})(_63get(_this,key))
		});
		const name=exports.name=`Id-Map`;
		exports.default=Id_45Map;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9JZC1NYXAubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFhQSxlQUNPLEtBQUE7O0dBQU4sb0JBQ0M7a0JBR0Q7O0VBRUQsUUFBTSxTQUFPO0VBQ2IsZUFBVyxTQUFPO0VBR2xCLHdCQUNRLGVBQUE7R0FDUCxRQUFJLE1BQU07R0FDVixTQUFPLEVBQUUsRUFBRTt5Q0FDQSxFQUFFLEdBQUc7R0FDaEIsY0FDTyxLQUFBOztJQUFOLGdCQUFHOzs7R0FDSixTQUFPLEVBQUUsUUFBTTt5Q0FDSixFQUFFLFNBQU87R0FDcEIsY0FDTyxLQUFBOztJQUFOLGdCQUFHOzs7R0FDSixTQUFPLEVBQUUsUUFBTTt5Q0FFSixFQUFFLFNBQU87eUNBQ1QsRUFBRSxTQUFPO29DQUVOLEtBQUksR0FBRSxDQUFFLEVBQUUsUUFBTTtvQ0FDaEIsT0FBTSxHQUFFLENBQUUsRUFBRSxFQUFFO0VBQUE7RUFFN0IsZUFBVyxNQUFNLFNBQ1EsSUFBQTtVQUF4QixLQUFJO0VBQUE7RUFFTCxRQUFNLE1BQU0sU0FDUyxVQUFBO1NBdUJWO1VBQUE7O0VBckJYLFFBQU0sT0FBSyxTQUFTLFNBQUEsSUFDRztTQW9CWjtVQXBCVixhQW9CVSxVQXBCRztFQUFBO0VBRWQsUUFBTSxhQUFTLFNBQVMsU0FBQSxJQUNHO1NBaUJoQjtVQUFBLFVBakJMO0VBQUE7RUFFTixRQUFNLEtBQUssU0FDUyxVQUFBO1NBY1Q7VUFkVixLQUFJLFFBQ1EsSUFBQTtXQWFGOzs7RUFYWCxRQUFNLE9BQU8sU0FDUyxVQUFBO1NBVVg7VUFWVixLQUFJLFFBQ1EsSUFBQTtXQVNGOzs7RUFQWCxRQUFNLFNBQU8sU0FDVSxVQUFBO1NBTVo7R0FBQTs7RUFKWCxRQUFNLFNBQU8sU0FBVSxTQUFBLElBQUksSUFDRztTQUduQjtHQUFBLFVBSEwsSUFBSTtFQUFBO0VBRVYsUUFBTSxjQUFVLFNBQVMsU0FBQSxJQUNHO1NBQWpCO1VBQUwsSUFDYTtJQURSLGFBQ0Q7O01BREosT0FBSyxNQUFLO0VBQUE7RUF0RWhCLHdCQUFBO2tCQWFBIiwiZmlsZSI6ImF0L01hcC9JZC1NYXAuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==