"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../control","../../js","../../Type/Kind","../../Type/Method","../at","../atbang","../at-Type","../q","../Seq/Stream","./Map","./Mapbang","./Map-Type","../../bang","../../compare","../Seq/Seq"],function(exports,control_0,js_1,Kind_2,Method_3,_64_4,_64_33_5,_64_45Type_6,_63_7,Stream_8,Map_9,Map_33_10,Map_45Type_11,_33_12,compare_13,Seq_14){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(control_0),returning=_ms.get(_$2,"returning"),_$3=_ms.getModule(js_1),_new=_ms.get(_$3,"new"),_$4=_ms.getModule(Kind_2),kind_33=_ms.get(_$4,"kind!"),self_45kind_33=_ms.get(_$4,"self-kind!"),_$5=_ms.getModule(Method_3),impl_33=_ms.get(_$5,"impl!"),self_45impl_33=_ms.get(_$5,"self-impl!"),_$6=_ms.getModule(_64_4),count=_ms.get(_$6,"count"),_$7=_ms.getModule(_64_33_5),empty_33=_ms.get(_$7,"empty!"),_$8=_ms.getModule(_64_45Type_6),empty=_ms.get(_$8,"empty"),_$9=_ms.getModule(_63_7),Opt_45_62_63=_ms.get(_$9,"Opt->?"),Stream=_ms.getDefaultExport(Stream_8),_$11=_ms.getModule(Map_9),_63get=_ms.get(_$11,"?get"),has_45key_63=_ms.get(_$11,"has-key?"),keys=_ms.get(_$11,"keys"),values=_ms.get(_$11,"values"),Map_33=_ms.getDefaultExport(Map_33_10),_$12=_ms.getModule(Map_33_10),assoc_33=_ms.get(_$12,"assoc!"),un_45assoc_33=_ms.get(_$12,"un-assoc!"),Map_45Type=_ms.getDefaultExport(Map_45Type_11),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_12)
		}),_$16=_ms.lazyGetModule(compare_13),_61_63=_ms.lazyProp(_$16,"=?"),_$17=_ms.lazyGetModule(Seq_14),seq_61_63=_ms.lazyProp(_$17,"seq=?");
		const Id_45Map_33=function(){
			const doc="JavaScript's native Map type.\nOnly considers exactly identical keys =?; this makes it the fastest Map.";
			const test=function test(){
				const _=empty(Id_45Map_33);
				assoc_33(_,1,2);
				_ms.unlazy(_33)(_ms.unlazy(_61_63),_ms.sub(_,1),2);
				const key_451=function(){
					const a=1;
					return {
						a:a,
						name:"key-1"
					}
				}();
				assoc_33(_,key_451,3);
				_ms.unlazy(_33)(_ms.unlazy(_61_63),_ms.sub(_,key_451),3);
				const key_452=function(){
					const a=1;
					return {
						a:a,
						name:"key-2"
					}
				}();
				assoc_33(_,key_452,4);
				_ms.unlazy(_33)(_ms.unlazy(_61_63),_ms.sub(_,key_451),3);
				_ms.unlazy(_33)(_ms.unlazy(_61_63),_ms.sub(_,key_452),4);
				_ms.unlazy(_33)(_ms.unlazy(seq_61_63),keys(_),[1,key_451,key_452]);
				return _ms.unlazy(_33)(_ms.unlazy(seq_61_63),values(_),[2,3,4])
			};
			return _ms.set(global.Map,"doc",doc,"test",test,"name","Id-Map!")
		}();
		self_45kind_33(Id_45Map_33,Map_45Type);
		self_45impl_33(empty,Id_45Map_33,function(){
			return _new(Id_45Map_33)
		});
		kind_33(Id_45Map_33,Map_33);
		impl_33(count,Id_45Map_33,function(_){
			return _.size
		});
		impl_33(_63get,Id_45Map_33,function(_,key){
			return Opt_45_62_63(_.get(key))
		});
		impl_33(has_45key_63,Id_45Map_33,function(_,key){
			return _.has(key)
		});
		impl_33(keys,Id_45Map_33,function(_){
			return Stream(function(){
				return _.keys()
			})
		});
		impl_33(values,Id_45Map_33,function(_){
			return Stream(function(){
				return _.values()
			})
		});
		impl_33(empty_33,Id_45Map_33,function(_){
			return _.clear()
		});
		impl_33(assoc_33,Id_45Map_33,function(_,key,val){
			return _.set(key,val)
		});
		impl_33(un_45assoc_33,Id_45Map_33,function(_,key){
			return returning(_63get(_,key),function(){
				return _.delete(key)
			})
		});
		const name=exports.name="Id-Map!";
		exports.default=Id_45Map_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9JZC1NYXAhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFrQkEsNEJBQ1M7R0FBUixVQUNDO0dBRUQsV0FDTyxlQUFBO0lBQ04sUUFBSSxNQUFNO0lBQ1YsU0FBTyxFQUFFLEVBQUU7K0NBQ04sRUFBRSxHQUFHO0lBQ1Ysd0JBQ087S0FBTixRQUFHOzs7Ozs7SUFDSixTQUFPLEVBQUUsUUFBTTsrQ0FDVixFQUFFLFNBQU87SUFDZCx3QkFDTztLQUFOLFFBQUc7Ozs7OztJQUNKLFNBQU8sRUFBRSxRQUFNOytDQUVWLEVBQUUsU0FBTzsrQ0FDVCxFQUFFLFNBQU87MENBRU4sS0FBQSxHQUFNLENBQUUsRUFBRSxRQUFNO2lEQUNoQixPQUFBLEdBQVEsQ0FBRSxFQUFFLEVBQUU7R0FBQTtrQkFFdkI7O0VBRUQsZUFBVyxZQUFRO0VBQ25CLGVBQVcsTUFBTSxZQUNTLFVBQUE7VUFBekIsS0FBSTtFQUFBO0VBRUwsUUFBTSxZQUFRO0VBQ2QsUUFBTSxNQUFNLFlBQVMsU0FBQSxFQUNDO1VBQXJCOztFQUNELFFBQU0sT0FBSyxZQUFTLFNBQUEsRUFBRSxJQUNHO1VBQXhCLGFBQVEsTUFBTTtFQUFBO0VBQ2YsUUFBTSxhQUFTLFlBQVMsU0FBQSxFQUFFLElBQ0c7VUFBNUIsTUFBTTtFQUFBO0VBQ1AsUUFBTSxLQUFLLFlBQVMsU0FBQSxFQUNDO1VBQXBCLE9BQ1EsVUFBQTtXQUFQOzs7RUFDRixRQUFNLE9BQU8sWUFBUyxTQUFBLEVBQ0M7VUFBdEIsT0FDUSxVQUFBO1dBQVA7OztFQUNGLFFBQU0sU0FBTyxZQUFTLFNBQUEsRUFDQztVQUF0Qjs7RUFDRCxRQUFNLFNBQU8sWUFBUyxTQUFBLEVBQUUsSUFBSSxJQUNHO1VBQTlCLE1BQU0sSUFBSTtFQUFBO0VBQ1gsUUFBTSxjQUFVLFlBQVMsU0FBQSxFQUFFLElBQ0c7VUFBN0IsVUFBVyxPQUFLLEVBQUUsS0FDTSxVQUFBO1dBQXZCLFNBQVM7R0FBQTtFQUFBO0VBbEVYLHdCQUFBO2tCQW9FQSIsImZpbGUiOiJhdC9NYXAvSWQtTWFwYmFuZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9