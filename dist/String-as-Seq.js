"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at","./at/at-Type","./at/Seq/Seq","./compare","./control","./Function","./js","./math/methods","./show","./Type/Impl-Type","./Type/Kind","./Type/Method","./Type/Pred-Type","./Type/Type","./at/at","./Function"],(exports,_64_0,_64_45Type_1,Seq_2,compare_3,control_4,Function_5,js_6,methods_7,show_8,Impl_45Type_9,Kind_10,Method_11,Pred_45Type_12,Type_13,_64_14,Function_15)=>{
	exports._get=_ms.lazy(()=>{
		const _64=_ms.getDefaultExport(_64_0),_$2=_ms.getModule(_64_0),count=_ms.get(_$2,"count"),empty_63=_ms.get(_$2,"empty?"),_64_45Type=_ms.getDefaultExport(_64_45Type_1),_$3=_ms.getModule(_64_45Type_1),empty=_ms.get(_$3,"empty"),from_45stream=_ms.get(_$3,"from-stream"),Seq=_ms.getDefaultExport(Seq_2),_$5=_ms.getModule(compare_3),_61_63=_ms.get(_$5,"=?"),sort=_ms.get(_$5,"sort"),_$6=_ms.getModule(control_4),opr=_ms.get(_$6,"opr"),_$7=_ms.getModule(Function_5),noop=_ms.get(_$7,"noop"),thunk=_ms.get(_$7,"thunk"),_$8=_ms.getModule(js_6),js_43=_ms.get(_$8,"js+"),_$9=_ms.getModule(methods_7),_45=_ms.get(_$9,"-"),show=_ms.getDefaultExport(show_8),_$11=_ms.getModule(Impl_45Type_9),self_45type=_ms.get(_$11,"self-type"),_$12=_ms.getModule(Kind_10),kind_33=_ms.get(_$12,"kind!"),self_45kind_33=_ms.get(_$12,"self-kind!"),_$13=_ms.getModule(Method_11),impl_33=_ms.get(_$13,"impl!"),impl_45double_33=_ms.get(_$13,"impl-double!"),_$14=_ms.getModule(Pred_45Type_12),Opt=_ms.get(_$14,"Opt"),_$15=_ms.getModule(Type_13),_61_62=_ms.get(_$15,"=>"),_$17=_ms.lazyGetModule(_64_14),map=_ms.lazyProp(_$17,"map"),_$18=_ms.lazyGetModule(Function_15),identity=_ms.lazyProp(_$18,"identity");
		const test=exports.test=function test(){
			_ms.assert(_61_63,`123`,_ms.unlazy(map)(`123`,_ms.unlazy(identity)))
		};
		self_45kind_33(String,_64_45Type,()=>{
			const built=new global.Map();
			_ms.assoc(built,empty,thunk(""));
			_ms.assoc(built,from_45stream,_=>{
				return from_45stream(Array,_)
			});
			return built
		}());
		impl_45double_33(_61_62,self_45type(String),_64,()=>{
			const built={};
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[String,[1,2,3]],`123`);
				_ms.assoc(built,[String,[1,2,3],`, `],`1, 2, 3`);
				return built
			};
			return _ms.set((str,vals,joiner)=>{
				_ms.checkContains(_ms.sub(Opt,String),joiner,"joiner");
				noop(str);
				joiner=opr(joiner,"");
				let s="";
				for(let _ of vals){
					s=js_43(s,show(_));
					s=js_43(s,joiner)
				};
				return s.slice(0,_45(s.length,joiner.length))
			},built)
		}());
		impl_33(sort,String,()=>{
			const built={};
			const test=built.test=function test(){};
			return _ms.set((_,_63sort_45by)=>{
				_ms.checkContains(_ms.sub(Opt,Function),_63sort_45by,"?sort-by");
				return _61_62(String,sort.default(_,_63sort_45by))
			},built)
		}());
		kind_33(String,Seq,()=>{
			const built=new global.Map();
			_ms.assoc(built,count,_=>{
				return _.length
			});
			_ms.assoc(built,empty_63,_=>{
				return _61_63(0,_.length)
			});
			return built
		}());
		const name=exports.name=`String-as-Seq`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9TdHJpbmctYXMtU2VxLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBcUJBLHdCQUNRLGVBQUE7Y0FBQyxPQUFJLHNCQUFXOztFQUV4QixlQUFXLE9BQU8sZUFDTTs7bUJBQXZCLE1BQVMsTUFhRDttQkFYUixjQUFnQixHQUNDO1dBQWhCLGNBQVksTUFBTTtHQUFBOzs7RUFHcEIsaUJBQWEsT0FBSSxZQUFVLFFBQVEsUUFDQzs7R0FBbkMsc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxPQUFPLENBQUUsRUFBRSxFQUFFLElBQVU7b0JBQ3pCLENBQUUsT0FBTyxDQUFFLEVBQUUsRUFBRSxHQUFLLE1BQVU7OztrQkFDOUIsQ0FBQSxJQUFJLEtBQUssU0FDa0I7OEJBRFgsSUFBSTtJQUNwQixLQUFLO1dBQ0ssSUFBSSxPQUNQO0lBQVAsTUFBTztJQUNGLFFBQUEsS0FBQSxLQUNJO09BQUgsTUFBSSxFQUFFLEtBQUk7T0FDVixNQUFJLEVBQUU7SUFBQTtXQUNaLFFBQVEsRUFBRyxJQUFFLFNBQVM7OztFQUd4QixRQUFNLEtBQUssV0FDTTs7R0FBaEIsc0JBQ1EsZUFBQTtrQkFDUCxDQUFBLEVBQUUsZUFDc0I7OEJBRGIsSUFBSTtXQUNmLE9BQUcsT0FBUSxhQUFhLEVBQUU7R0FBQTs7RUFFNUIsUUFBTSxPQUFPLFFBQ0c7O21CQUFmLE1BQVUsR0FDQztXQUFWOzttQkFDRCxTQUFXLEdBQ0M7V0FBWCxPQUFHLEVBQUU7Ozs7RUF2RFAsd0JBQUEiLCJmaWxlIjoiU3RyaW5nLWFzLVNlcS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9