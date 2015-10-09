"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../methods","../../private/bootstrap","../../to-string","../../Type/Kind","../../Type/Method","../../Type/Pred-Type","../../Type/Type","../at","../at-Type","../q","./Id-Map"],(exports,compare_0,methods_1,bootstrap_2,to_45string_3,Kind_4,Method_5,Pred_45Type_6,Type_7,_64_8,_64_45Type_9,_63_10,Id_45Map_11)=>{
	exports._get=_ms.lazy(()=>{
		const _$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_$1=_ms.getModule(methods_1),sub=_ms.get(_$1,"sub"),_$2=_ms.getModule(bootstrap_2),msDef=_ms.get(_$2,"msDef"),to_45string=_ms.getDefaultExport(to_45string_3),Kind=_ms.getDefaultExport(Kind_4),_$3=_ms.getModule(Kind_4),kind_33=_ms.get(_$3,"kind!"),Method=_ms.getDefaultExport(Method_5),_$4=_ms.getModule(Method_5),impl_33=_ms.get(_$4,"impl!"),_$5=_ms.getModule(Pred_45Type_6),Any=_ms.get(_$5,"Any"),_$6=_ms.getModule(Type_7),_61_62=_ms.get(_$6,"=>"),type_45of=_ms.get(_$6,"type-of"),_64=_ms.getDefaultExport(_64_8),_$7=_ms.getModule(_64_8),all_63=_ms.get(_$7,"all?"),count=_ms.get(_$7,"count"),empty_63=_ms.get(_$7,"empty?"),_64map_126=_ms.get(_$7,"@map~"),_$8=_ms.getModule(_64_45Type_9),empty=_ms.get(_$8,"empty"),_$9=_ms.getModule(_63_10),_63_45or=_ms.get(_$9,"?-or"),un_45_63=_ms.get(_$9,"un-?"),Id_45Map=_ms.lazy(()=>_ms.getDefaultExport(Id_45Map_11));
		const Map=exports.default=new (Kind)((()=>{
			const built={};
			built[`name`]="Map";
			return built
		})());
		kind_33(Map,_64);
		impl_33(to_45string,Map,function(){
			const _this=this;
			const parts=_64map_126(_this,pair=>{
				return `${_ms.sub(pair,0)} -> ${_ms.sub(pair,1)}`
			});
			return `${_this.constructor.name}
	${_61_62(String,parts,`\n\t`)}`
		});
		const _63get=exports["?get"]=new (Method)((()=>{
			const built={};
			built[`name`]="?get";
			const args=built.args=[`_`,`key`];
			return built
		})());
		const has_45key_63=exports["has-key?"]=new (Method)((()=>{
			const built={};
			built[`name`]="has-key?";
			const args=built.args=[`_`,`key`];
			const _default=built.default=function _default(key){
				const _this=this;
				return ! empty_63(_63get(_this,key))
			};
			return built
		})());
		const _64keys=exports["@keys"]=new (Method)((()=>{
			const built={};
			built[`name`]="@keys";
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				return _61_62(Array,_64map_126(_this,pair=>{
					return _ms.sub(pair,0)
				}))
			};
			return built
		})());
		const _64values=exports["@values"]=new (Method)((()=>{
			const built={};
			built[`name`]="@values";
			const args=built.args=1;
			const _default=built.default=function _default(){
				const _this=this;
				return _61_62(Array,_64map_126(_this,pair=>{
					return _ms.sub(pair,1)
				}))
			};
			return built
		})());
		impl_33(_61_63,Map,function(other){
			const _this=this;
			return (_61_63(type_45of(_this),type_45of(other))&&map_61_63(_this,other))
		});
		impl_33(sub,Map,function(key){
			const _this=this;
			_ms.checkContains(Any,key,"key");
			return un_45_63(_63get(_this,key),_ms.lazy(()=>`${_this} does not contain ${key}.`))
		});
		const make_45map=exports["make-map"]=function make_45map(_64key,get_45value){
			_ms.checkContains(_64,_64key,"@key");
			_ms.checkContains(Function,get_45value,"get-value");
			const map=empty(_ms.unlazy(Id_45Map));
			for(let _ of _64key){
				assoc_33(map,_,get_45value(_))
			};
			return map
		};
		const map_61_63=exports["map=?"]=function map_61_63(a,b){
			_ms.checkContains(Map,a,"a");
			_ms.checkContains(Map,b,"b");
			return (_61_63(count(a),count(b))&&(()=>{
				return all_63(a,pair=>{
					const key=_ms.sub(pair,0);
					const val=_ms.sub(pair,1);
					const _63bk=_63get(b,key);
					return (! empty_63(_63bk)&&_61_63(val,_63bk.val))
				})
			})())
		};
		const assoc_33=exports["assoc!"]=new (Method)((()=>{
			const built={};
			built[`name`]="assoc!";
			const args=built.args=[`_`,`key`,`val`];
			return built
		})());
		msDef(`assoc`,assoc_33);
		const assoc_42_33=exports["assoc*!"]=function assoc_42_33(map,to_45add){
			_ms.checkContains(Map,map,"map");
			_ms.checkContains(Map,to_45add,"to-add");
			for(let _ of to_45add){
				assoc_33(map,_ms.sub(_,0),_ms.sub(_,1))
			}
		};
		const un_45assoc_33=exports["un-assoc!"]=new (Method)((()=>{
			const built={};
			built[`name`]="un-assoc!";
			const args=built.args=[`_`,`key`];
			return built
		})());
		const un_45assoc_42_33=exports["un-assoc*!"]=function un_45assoc_42_33(map,_64to_45delete){
			_ms.checkContains(Map,map,"map");
			_ms.checkContains(_64,_64to_45delete,"@to-delete");
			for(let _ of _64to_45delete){
				un_45assoc_33(map,_)
			}
		};
		const add_33=exports["add!"]=new (Method)((()=>{
			const built={};
			built[`name`]="add!";
			const args=built.args=[`_`,`key`,`val`];
			const _default=built.default=function _default(key,val){
				const _this=this;
				{
					if(has_45key_63(_this,key))throw new (Error)(`Already have key ${key}.`)
				};
				assoc_33(_this,key,val)
			};
			return built
		})());
		const get_45or_45add_33=exports["get-or-add!"]=new (Method)((()=>{
			const built={};
			built[`name`]="get-or-add!";
			const args=built.args=[`_`,`key`,`~default-val`];
			const _default=built.default=function _default(key,default_45val){
				const _this=this;
				return _63_45or(_63get(_this,key),_ms.lazy(()=>(()=>{
					assoc_33(_this,key,_ms.unlazy(default_45val));
					return _ms.unlazy(default_45val)
				})()))
			};
			return built
		})());
		const name=exports.name=`Map`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvQC9NYXAvTWFwLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBZUEsMEJBQUssS0FBSSxNQUNJLEtBQUE7O1NBQ1osUUFBQTs7O0VBRUQsUUFBTSxJQUFJO0VBRVYsUUFBTSxZQUFVLElBQ00sVUFBQTtTQXdHWDtHQXJHVixZQUFRLFdBcUdFLE1BckdVLE1BQ0k7V0FBdEIsV0FBQyxLQUFLLGlCQUFRLEtBQUs7O1VBRXBCLEdBa0dTLDJCQWpHUCxPQUFHLE9BQU8sTUFBTzs7RUFHcEIsNkJBQU0sS0FBSSxRQUNNLEtBQUE7O1NBQ2YsUUFBQTtHQUNBLHNCQUFNLENBQUUsSUFBSTs7O0VBRWIsdUNBQVUsS0FBSSxRQUNNLEtBQUE7O1NBQ25CLFFBQUE7R0FDQSxzQkFBTSxDQUFFLElBQUk7R0FDWiw2QkFBVyxrQkFBQSxJQUNHO1VBb0ZMO1dBcEZSLEVBQUssU0FBUSxPQW9GTCxNQXBGZTtHQUFBOzs7RUFFekIsK0JBQU8sS0FBSSxRQUNNLEtBQUE7O1NBQ2hCLFFBQUE7R0FDQSxzQkFBTTtHQUNOLDZCQUNXLG1CQUFBO1VBNkVGO1dBNUVSLE9BU0csTUFUTyxXQTRFRixNQTVFYyxNQUNJO29CQUF6QixLQUFLO0lBQUE7R0FBQTs7O0VBRVIsbUNBQVMsS0FBSSxRQUNNLEtBQUE7O1NBQ2xCLFFBQUE7R0FDQSxzQkFBTTtHQUNOLDZCQUNXLG1CQUFBO1VBb0VGO1dBbkVSLE9BQUcsTUFBTyxXQW1FRixNQW5FYyxNQUNJO29CQUF6QixLQUFLO0lBQUE7R0FBQTs7O0VBR1IsUUFBTSxPQUFHLElBQU0sU0FBQSxNQUNLO1NBOERWO1VBOURULENBQUssT0FBSSxVQThEQSxPQTlEZSxVQUFRLFNBQVMsVUE4RGhDLE1BOUQyQztFQUFBO0VBRXJELFFBQU0sSUFBSSxJQUFNLFNBQUEsSUFDTztTQTJEYjtxQkE1RFU7VUFDbkIsU0FBTSxPQTJERyxNQTNETyxrQkFBTyxHQTJEZCwwQkEzRHVDOztFQUdqRCxxQ0FBVyxvQkFBQSxPQUFPLFlBQ2tCO3FCQURwQjtxQkFBWTtHQUczQixVQUFNO0dBQ0QsUUFBQSxLQUFBLE9BQ0k7SUFBUixTQUFPLElBQUksRUFBRSxZQUFBO0dBQUE7VUFDZDtFQUFBO0VBRUQsaUNBQVEsbUJBQUEsRUFBTSxFQUNLO3FCQURUO3FCQUFNO1VBRWYsQ0FBSyxPQUFJLE1BQU0sR0FBSSxNQUFNLEtBQ0csS0FBQTtXQUEzQixPQUFLLEVBQUcsTUFDSTtLQUNYLGtCQUFNLEtBQUs7S0FDWCxrQkFBTSxLQUFLO0tBQ1gsWUFBTSxPQUFLLEVBQUU7WUFDYixDQUFLLEVBQUksU0FBTyxRQUFNLE9BQUcsSUFBSTs7OztFQUdoQyxpQ0FBUSxLQUFJLFFBQ00sS0FBQTs7U0FDakIsUUFBQTtHQUNBLHNCQUFNLENBQUUsSUFBSSxNQUFNOzs7RUFDbkIsTUFBTyxRQUFPO0VBRWQscUNBQVcscUJBQUEsSUFBUSxTQUNVO3FCQURkO3FCQUFXO0dBRXBCLFFBQUEsS0FBQSxTQUNNO0lBQ1YsU0FBTyxZQUFJLEVBQUUsV0FBRyxFQUFFO0dBQUE7RUFBQTtFQUVwQix5Q0FBVyxLQUFJLFFBQ00sS0FBQTs7U0FDcEIsUUFBQTtHQUNBLHNCQUFNLENBQUUsSUFBSTs7O0VBRWIsNkNBQWMsMEJBQUEsSUFBUSxlQUNZO3FCQURoQjtxQkFBZTtHQUUzQixRQUFBLEtBQUEsZUFDVTtJQUFkLGNBQVUsSUFBSTtHQUFBO0VBQUE7RUFFaEIsNkJBQU0sS0FBSSxRQUNNLEtBQUE7O1NBQ2YsUUFBQTtHQUNBLHNCQUFNLENBQUUsSUFBSSxNQUFNO0dBQ2xCLDZCQUFZLGtCQUFBLElBQUksSUFHZjtVQVFRO0lBVlI7S0FDUyxHQUFBLGFBU0QsTUFUZSx1QkFBWSxvQkFBa0I7O0lBQ3JELFNBUVEsTUFSSSxJQUFJO0dBQUE7OztFQUVsQiwrQ0FBYSxLQUFJLFFBQ00sS0FBQTs7U0FDdEIsUUFBQTtHQUNBLHNCQUFNLENBQUUsSUFBSSxNQUFNO0dBQ2xCLDZCQUFXLGtCQUFBLElBQUksY0FDWTtVQUNsQjtXQURSLFNBQU0sT0FDRSxNQURRLGtCQUNNLEtBQUE7S0FBckIsU0FBTyxNQUFLOzs7Ozs7RUE5SGhCLHdCQUFBIiwiZmlsZSI6ImF0L01hcC9NYXAuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
