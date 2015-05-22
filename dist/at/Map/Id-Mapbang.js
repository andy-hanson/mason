"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../control","../../js","../../Type/Kind","../at","../atbang","../at-Type","../q","../Seq/Stream","./Map","./Mapbang","./Map-Type","../../bang","../../compare","../Seq/Seq"],function(exports,control_0,js_1,Kind_2,_64_3,_64_33_4,_64_45Type_5,_63_6,Stream_7,Map_8,Map_33_9,Map_45Type_10,_33_11,compare_12,Seq_13){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(control_0),returning=_ms.get(_$2,"returning"),_$3=_ms.getModule(js_1),_new=_ms.get(_$3,"new"),_$4=_ms.getModule(Kind_2),kind_33=_ms.get(_$4,"kind!"),self_45kind_33=_ms.get(_$4,"self-kind!"),_$5=_ms.getModule(_64_3),count=_ms.get(_$5,"count"),_$6=_ms.getModule(_64_33_4),empty_33=_ms.get(_$6,"empty!"),_$7=_ms.getModule(_64_45Type_5),empty=_ms.get(_$7,"empty"),_$8=_ms.getModule(_63_6),Opt_45_62_63=_ms.get(_$8,"Opt->?"),Stream=_ms.getDefaultExport(Stream_7),_$10=_ms.getModule(Map_8),_63get=_ms.get(_$10,"?get"),has_45key_63=_ms.get(_$10,"has-key?"),keys=_ms.get(_$10,"keys"),values=_ms.get(_$10,"values"),Map_33=_ms.getDefaultExport(Map_33_9),_$11=_ms.getModule(Map_33_9),assoc_33=_ms.get(_$11,"assoc!"),un_45assoc_33=_ms.get(_$11,"un-assoc!"),Map_45Type=_ms.getDefaultExport(Map_45Type_10),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_11)
		}),_$15=_ms.lazyGetModule(compare_12),_61_63=_ms.lazyProp(_$15,"=?"),_$16=_ms.lazyGetModule(Seq_13),seq_61_63=_ms.lazyProp(_$16,"seq=?");
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
		self_45kind_33(Id_45Map_33,Map_45Type,function(){
			const _k0=empty,_v0=function(){
				return _new(Id_45Map_33)
			};
			return _ms.map(_k0,_v0)
		}());
		kind_33(Id_45Map_33,Map_33,function(){
			const _k0=count,_v0=function(_){
				return _.size
			};
			const _k1=_63get,_v1=function(_,key){
				return Opt_45_62_63(_.get(key))
			};
			const _k2=has_45key_63,_v2=function(_,key){
				return _.has(key)
			};
			const _k3=keys,_v3=function(_){
				return Stream(function(){
					return _.keys()
				})
			};
			const _k4=values,_v4=function(_){
				return Stream(function(){
					return _.values()
				})
			};
			const _k5=empty_33,_v5=function(_){
				return _.clear()
			};
			const _k6=assoc_33,_v6=function(_,key,val){
				return _.set(key,val)
			};
			const _k7=un_45assoc_33,_v7=function(_,key){
				return returning(_63get(_,key),function(){
					return _.delete(key)
				})
			};
			return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3,_k4,_v4,_k5,_v5,_k6,_v6,_k7,_v7)
		}());
		const name=exports.name="Id-Map!";
		exports.default=Id_45Map_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9JZC1NYXAhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFpQkEsNEJBQ1M7R0FBUixVQUNDO0dBRUQsV0FDTyxlQUFBO0lBQ04sUUFBSSxNQUFNO0lBQ1YsU0FBTyxFQUFFLEVBQUU7K0NBQ04sRUFBRSxHQUFHO0lBQ1Ysd0JBQ087S0FBTixRQUFHOzs7Ozs7SUFDSixTQUFPLEVBQUUsUUFBTTsrQ0FDVixFQUFFLFNBQU87SUFDZCx3QkFDTztLQUFOLFFBQUc7Ozs7OztJQUNKLFNBQU8sRUFBRSxRQUFNOytDQUVWLEVBQUUsU0FBTzsrQ0FDVCxFQUFFLFNBQU87MENBRU4sS0FBSSxHQUFFLENBQUUsRUFBRSxRQUFNO2lEQUNoQixPQUFNLEdBQUUsQ0FBRSxFQUFFLEVBQUU7R0FBQTtrQkFFdkI7O0VBRUQsZUFBVyxZQUFRLHFCQUNRO0dBQTFCLFVBQUEsVUFDVSxVQUFBO1dBQVQsS0FBSTtHQUFBOzs7RUFFTixRQUFNLFlBQVEsaUJBQ0k7R0FBakIsVUFBQSxVQUFVLFNBQUEsRUFDQztXQUFWOztHQUNELFVBQUEsV0FBUyxTQUFBLEVBQUUsSUFDRztXQUFiLGFBQVEsTUFBTTtHQUFBO0dBQ2YsVUFBQSxpQkFBYSxTQUFBLEVBQUUsSUFDRztXQUFqQixNQUFNO0dBQUE7R0FDUCxVQUFBLFNBQVMsU0FBQSxFQUNDO1dBQVQsT0FDUSxVQUFBO1lBQVA7OztHQUNGLFVBQUEsV0FBVyxTQUFBLEVBQ0M7V0FBWCxPQUNRLFVBQUE7WUFBUDs7O0dBQ0YsVUFBQSxhQUFXLFNBQUEsRUFDQztXQUFYOztHQUNELFVBQUEsYUFBVyxTQUFBLEVBQUUsSUFBSSxJQUNHO1dBQW5CLE1BQU0sSUFBSTtHQUFBO0dBQ1gsVUFBQSxrQkFBYyxTQUFBLEVBQUUsSUFDRztXQUFsQixVQUFXLE9BQUssRUFBRSxLQUNNLFVBQUE7WUFBdkIsU0FBUztJQUFBO0dBQUE7OztFQWpFWix3QkFBQTtrQkFtRUEiLCJmaWxlIjoiYXQvTWFwL0lkLU1hcGJhbmcuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==