"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../control","../../Type/Method","../../Type/Kind","../at","../at-Type","../q","../Seq/Stream","./Map","./Map-Type","../../compare","../Seq/Seq"],(exports,control_0,Method_1,Kind_2,_64_3,_64_45Type_4,_63_5,Stream_6,Map_7,Map_45Type_8,compare_9,Seq_10)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(control_0),returning=_ms.get(_$2,"returning"),_$3=_ms.getModule(Method_1),impl_33=_ms.get(_$3,"impl!"),self_45impl_33=_ms.get(_$3,"self-impl!"),_$4=_ms.getModule(Kind_2),kind_33=_ms.get(_$4,"kind!"),self_45kind_33=_ms.get(_$4,"self-kind!"),_$5=_ms.getModule(_64_3),count=_ms.get(_$5,"count"),empty_33=_ms.get(_$5,"empty!"),_$6=_ms.getModule(_64_45Type_4),empty=_ms.get(_$6,"empty"),_$7=_ms.getModule(_63_5),Opt_45_62_63=_ms.get(_$7,"Opt->?"),Stream=_ms.getDefaultExport(Stream_6),Map=_ms.getDefaultExport(Map_7),_$9=_ms.getModule(Map_7),assoc_33=_ms.get(_$9,"assoc!"),_63get=_ms.get(_$9,"?get"),has_45key_63=_ms.get(_$9,"has-key?"),keys=_ms.get(_$9,"keys"),un_45assoc_33=_ms.get(_$9,"un-assoc!"),values=_ms.get(_$9,"values"),Map_45Type=_ms.getDefaultExport(Map_45Type_8),_$12=_ms.lazyGetModule(compare_9),_61_63=_ms.lazyProp(_$12,"=?"),_$13=_ms.lazyGetModule(Seq_10),seq_61_63=_ms.lazyProp(_$13,"seq=?");
		const Id_45Map=()=>{
			const built={};
			const doc=built.doc=`JavaScript's native Map type.\nOnly considers exactly identical keys =?; this makes it the fastest Map.`;
			return _ms.set(global.Map,built,"Id-Map")
		}();
		kind_33(Id_45Map,Map);
		self_45kind_33(Id_45Map,Map_45Type);
		const test=exports.test=function test(){
			const _=empty(Id_45Map);
			assoc_33(_,1,2);
			_ms.assert(_ms.unlazy(_61_63),_ms.sub(_,1),2);
			const key_451=()=>{
				const built={};
				const a=built.a=1;
				return _ms.setName(built,"key-1")
			}();
			assoc_33(_,key_451,3);
			_ms.assert(_ms.unlazy(_61_63),_ms.sub(_,key_451),3);
			const key_452=()=>{
				const built={};
				const a=built.a=1;
				return _ms.setName(built,"key-2")
			}();
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
			return returning(_63get(_this,key),()=>{
				_this.delete(key)
			})
		});
		const name=exports.name=`Id-Map`;
		exports.default=Id_45Map;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9JZC1NYXAubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFjQSxtQkFDTzs7R0FBTixvQkFDQztrQkFHRDs7RUFFRCxRQUFNLFNBQU87RUFDYixlQUFXLFNBQU87RUFHbEIsd0JBQ1EsZUFBQTtHQUNQLFFBQUksTUFBTTtHQUNWLFNBQU8sRUFBRSxFQUFFO3lDQUNBLEVBQUUsR0FBRztHQUNoQixrQkFDTzs7SUFBTixnQkFBRzs7O0dBQ0osU0FBTyxFQUFFLFFBQU07eUNBQ0osRUFBRSxTQUFPO0dBQ3BCLGtCQUNPOztJQUFOLGdCQUFHOzs7R0FDSixTQUFPLEVBQUUsUUFBTTt5Q0FFSixFQUFFLFNBQU87eUNBQ1QsRUFBRSxTQUFPO29DQUVOLEtBQUksR0FBRSxDQUFFLEVBQUUsUUFBTTtvQ0FDaEIsT0FBTSxHQUFFLENBQUUsRUFBRSxFQUFFO0VBQUE7RUFFN0IsZUFBVyxNQUFNLFNBQ1EsSUFBQTtVQUF4QixLQUFJO0VBQUE7RUFFTCxRQUFNLE1BQU0sU0FDUyxVQUFBO1NBd0JuQjtVQUFBOztFQXRCRixRQUFNLE9BQUssU0FBUyxTQUFBLElBQ0c7U0FxQnJCO1VBckJELGFBcUJDLFVBckJZO0VBQUE7RUFFZCxRQUFNLGFBQVMsU0FBUyxTQUFBLElBQ0c7U0FrQnpCO1VBQUEsVUFsQkk7RUFBQTtFQUVOLFFBQU0sS0FBSyxTQUNTLFVBQUE7U0FlbEI7VUFmRCxLQUFJLFFBQ1EsSUFBQTtXQWNYOzs7RUFaRixRQUFNLE9BQU8sU0FDUyxVQUFBO1NBV3BCO1VBWEQsS0FBSSxRQUNRLElBQUE7V0FVWDs7O0VBUkYsUUFBTSxTQUFPLFNBQ1UsVUFBQTtTQU9yQjtHQUFBOztFQUxGLFFBQU0sU0FBTyxTQUFVLFNBQUEsSUFBSSxJQUNHO1NBSTVCO0dBQUEsVUFKSSxJQUFJO0VBQUE7RUFFVixRQUFNLGNBQVUsU0FBUyxTQUFBLElBQ0c7U0FDMUI7VUFERCxVQUFXLE9BQ1YsTUFEb0IsS0FDTyxJQUFBO0lBQTNCLGFBQVE7R0FBQTtFQUFBO0VBeEVWLHdCQUFBO2tCQWNBIiwiZmlsZSI6ImF0L01hcC9JZC1NYXAuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==