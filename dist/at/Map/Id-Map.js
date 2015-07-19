"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../control","../../Type/Kind","../at","../at-Type","../q","../Seq/Stream","./Map","./Map-Type","../../compare","../Seq/Seq"],(exports,control_0,Kind_1,_64_2,_64_45Type_3,_63_4,Stream_5,Map_6,Map_45Type_7,compare_8,Seq_9)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(control_0),returning=_ms.get(_$2,"returning"),_$3=_ms.getModule(Kind_1),kind_33=_ms.get(_$3,"kind!"),self_45kind_33=_ms.get(_$3,"self-kind!"),_$4=_ms.getModule(_64_2),count=_ms.get(_$4,"count"),empty_33=_ms.get(_$4,"empty!"),_$5=_ms.getModule(_64_45Type_3),empty=_ms.get(_$5,"empty"),_$6=_ms.getModule(_63_4),Opt_45_62_63=_ms.get(_$6,"Opt->?"),Stream=_ms.getDefaultExport(Stream_5),Map=_ms.getDefaultExport(Map_6),_$8=_ms.getModule(Map_6),assoc_33=_ms.get(_$8,"assoc!"),_63get=_ms.get(_$8,"?get"),has_45key_63=_ms.get(_$8,"has-key?"),keys=_ms.get(_$8,"keys"),un_45assoc_33=_ms.get(_$8,"un-assoc!"),values=_ms.get(_$8,"values"),Map_45Type=_ms.getDefaultExport(Map_45Type_7),_$11=_ms.lazyGetModule(compare_8),_61_63=_ms.lazyProp(_$11,"=?"),_$12=_ms.lazyGetModule(Seq_9),seq_61_63=_ms.lazyProp(_$12,"seq=?");
		const Id_45Map=()=>{
			const built={};
			const doc=built.doc=`JavaScript's native Map type.\nOnly considers exactly identical keys =?; this makes it the fastest Map.`;
			const test=built.test=function test(){
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
			return _ms.set(global.Map,built,"Id-Map")
		}();
		self_45kind_33(Id_45Map,Map_45Type,()=>{
			const built=new global.Map();
			_ms.assoc(built,empty,()=>{
				return new Id_45Map()
			});
			return built
		}());
		kind_33(Id_45Map,Map,()=>{
			const built=new global.Map();
			_ms.assoc(built,count,_=>{
				return _.size
			});
			_ms.assoc(built,_63get,(_,key)=>{
				return Opt_45_62_63(_.get(key))
			});
			_ms.assoc(built,has_45key_63,(_,key)=>{
				return _.has(key)
			});
			_ms.assoc(built,keys,_=>{
				return Stream(()=>{
					return _.keys()
				})
			});
			_ms.assoc(built,values,_=>{
				return Stream(()=>{
					return _.values()
				})
			});
			_ms.assoc(built,empty_33,_=>{
				_.clear()
			});
			_ms.assoc(built,assoc_33,(_,key,val)=>{
				_.set(key,val)
			});
			_ms.assoc(built,un_45assoc_33,(_,key)=>{
				return returning(_63get(_,key),()=>{
					_.delete(key)
				})
			});
			return built
		}());
		const name=exports.name=`Id-Map`;
		exports.default=Id_45Map;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL01hcC9JZC1NYXAubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFhQSxtQkFDTzs7R0FBTixvQkFDQztHQUVELHNCQUNRLGVBQUE7SUFDUCxRQUFJLE1BQU07SUFDVixTQUFPLEVBQUUsRUFBRTswQ0FDQSxFQUFFLEdBQUc7SUFDaEIsa0JBQ087O0tBQU4sZ0JBQUc7OztJQUNKLFNBQU8sRUFBRSxRQUFNOzBDQUNKLEVBQUUsU0FBTztJQUNwQixrQkFDTzs7S0FBTixnQkFBRzs7O0lBQ0osU0FBTyxFQUFFLFFBQU07MENBRUosRUFBRSxTQUFPOzBDQUNULEVBQUUsU0FBTztxQ0FFTixLQUFJLEdBQUUsQ0FBRSxFQUFFLFFBQU07cUNBQ2hCLE9BQU0sR0FBRSxDQUFFLEVBQUUsRUFBRTtHQUFBO2tCQUU3Qjs7RUFFRCxlQUFXLFNBQU8sZUFDUTs7bUJBQXpCLE1BQ1UsSUFBQTtXQUFULElBQUk7R0FBQTs7O0VBRU4sUUFBTSxTQUFPLFFBQ0c7O21CQUFmLE1BQVUsR0FDQztXQUFWOzttQkFDRCxPQUFTLENBQUEsRUFBRSxNQUNHO1dBQWIsYUFBUSxNQUFNO0dBQUE7bUJBQ2YsYUFBYSxDQUFBLEVBQUUsTUFDRztXQUFqQixNQUFNO0dBQUE7bUJBQ1AsS0FBUyxHQUNDO1dBQVQsT0FDUSxJQUFBO1lBQVA7OzttQkFDRixPQUFXLEdBQ0M7V0FBWCxPQUNRLElBQUE7WUFBUDs7O21CQUNGLFNBQVksR0FDQztJQUFaOzttQkFDRCxTQUFZLENBQUEsRUFBRSxJQUFJLE1BQ0c7SUFBcEIsTUFBTSxJQUFJO0dBQUE7bUJBQ1gsY0FBYyxDQUFBLEVBQUUsTUFDRztXQUFsQixVQUFXLE9BQUssRUFBRSxLQUNPLElBQUE7S0FBeEIsU0FBUztJQUFBO0dBQUE7OztFQTdEWix3QkFBQTtrQkFhQSIsImZpbGUiOiJhdC9NYXAvSWQtTWFwLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=