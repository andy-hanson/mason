"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at","./at/at-Type","./at/Seq/Seq","./compare","./control","./Function","./js","./math/methods","./show","./Type/Impl-Type","./Type/Kind","./Type/Method","./Type/Pred-Type","./Type/Type","./bang","./at/at","./Function"],function(exports,_64_0,_64_45Type_1,Seq_2,compare_3,control_4,Function_5,js_6,methods_7,show_8,Impl_45Type_9,Kind_10,Method_11,Pred_45Type_12,Type_13,_33_14,_64_15,Function_16){
	exports._get=_ms.lazy(function(){
		const _64=_ms.getDefaultExport(_64_0),_$2=_ms.getModule(_64_0),count=_ms.get(_$2,"count"),empty_63=_ms.get(_$2,"empty?"),_64_45Type=_ms.getDefaultExport(_64_45Type_1),_$3=_ms.getModule(_64_45Type_1),empty=_ms.get(_$3,"empty"),from_45stream=_ms.get(_$3,"from-stream"),Seq=_ms.getDefaultExport(Seq_2),_$5=_ms.getModule(compare_3),_61_63=_ms.get(_$5,"=?"),sort=_ms.get(_$5,"sort"),_$6=_ms.getModule(control_4),opr=_ms.get(_$6,"opr"),_$7=_ms.getModule(Function_5),noop=_ms.get(_$7,"noop"),thunk=_ms.get(_$7,"thunk"),_$8=_ms.getModule(js_6),js_43=_ms.get(_$8,"js+"),_$9=_ms.getModule(methods_7),_45=_ms.get(_$9,"-"),show=_ms.getDefaultExport(show_8),_$11=_ms.getModule(Impl_45Type_9),self_45type=_ms.get(_$11,"self-type"),_$12=_ms.getModule(Kind_10),kind_33=_ms.get(_$12,"kind!"),self_45kind_33=_ms.get(_$12,"self-kind!"),_$13=_ms.getModule(Method_11),impl_33=_ms.get(_$13,"impl!"),impl_45double_33=_ms.get(_$13,"impl-double!"),_$14=_ms.getModule(Pred_45Type_12),Opt=_ms.get(_$14,"Opt"),_$15=_ms.getModule(Type_13),_61_62=_ms.get(_$15,"=>"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_14)
		}),_$18=_ms.lazyGetModule(_64_15),map=_ms.lazyProp(_$18,"map"),_$19=_ms.lazyGetModule(Function_16),identity=_ms.lazyProp(_$19,"identity");
		const test=exports.test=function test(){
			_ms.unlazy(_33)(_61_63,"123",_ms.unlazy(map)("123",_ms.unlazy(identity)))
		};
		self_45kind_33(String,_64_45Type,function(){
			const built=new global.Map();
			_ms.assoc(built,empty,thunk(""));
			_ms.assoc(built,from_45stream,function(_){
				return from_45stream(Array,_)
			});
			return built
		}());
		impl_45double_33(_61_62,self_45type(String),_64,function(){
			const built={};
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[String,[1,2,3]],"123");
				_ms.assoc(built,[String,[1,2,3],", "],"1, 2, 3");
				return built
			};
			return _ms.set(function(str,_,joiner){
				_ms.checkContains(_ms.sub(Opt,String),joiner,"joiner");
				noop(str);
				joiner=opr(joiner,"");
				let s="";
				for(let _ of _[Symbol.iterator]()){
					s=js_43(s,show(_));
					s=js_43(s,joiner)
				};
				return s.slice(0,_45(s.length,joiner.length))
			},built)
		}());
		impl_33(sort,String,function(){
			const built={};
			const test=built.test=function test(){};
			return _ms.set(function(_,_63sort_45by){
				_ms.checkContains(_ms.sub(Opt,Function),_63sort_45by,"?sort-by");
				return _61_62(String,sort.default(_,_63sort_45by))
			},built)
		}());
		kind_33(String,Seq,function(){
			const built=new global.Map();
			_ms.assoc(built,count,function(_){
				return _.length
			});
			_ms.assoc(built,empty_63,function(_){
				return _61_63(0,_.length)
			});
			return built
		}());
		const name=exports.name="String-as-Seq";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9TdHJpbmctYXMtU2VxLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFzQkEsd0JBQ1EsZUFBQTttQkFBTCxPQUFJLHNCQUFXOztFQUVsQixlQUFXLE9BQU8scUJBQ007O21CQUF2QixNQUFTLE1BYUQ7bUJBWFIsY0FBZ0IsU0FBQSxFQUNDO1dBQWhCLGNBQVksTUFBTTtHQUFBOzs7RUFHcEIsaUJBQWEsT0FBSSxZQUFVLFFBQVEsY0FDQzs7R0FBbkMsc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxPQUFPLENBQUUsRUFBRSxFQUFFLElBQVU7b0JBQ3pCLENBQUUsT0FBTyxDQUFFLEVBQUUsRUFBRSxHQUFLLE1BQVU7OztrQkFDOUIsU0FBQSxJQUFJLEVBQUUsT0FDa0I7OEJBRFgsSUFBSTtJQUNqQixLQUFLO1dBQ0ssSUFBSSxPQUNQO0lBQVAsTUFBTztJQUNGLFFBQUEsS0FBQSxxQkFDQztPQUFBLE1BQUksRUFBRSxLQUFJO09BQ1YsTUFBSSxFQUFFO0lBQUE7V0FDWixRQUFRLEVBQUcsSUFBRSxTQUFTOzs7RUFHeEIsUUFBTSxLQUFLLGlCQUNNOztHQUFoQixzQkFDUSxlQUFBO2tCQUNQLFNBQUEsRUFBRSxhQUNzQjs4QkFEYixJQUFJO1dBQ2YsT0FBRyxPQUFRLGFBQWEsRUFBRTtHQUFBOztFQUU1QixRQUFNLE9BQU8sY0FDRzs7bUJBQWYsTUFBVSxTQUFBLEVBQ0M7V0FBVjs7bUJBQ0QsU0FBVyxTQUFBLEVBQ0M7V0FBWCxPQUFHLEVBQUU7Ozs7RUF4RFAsd0JBQUEiLCJmaWxlIjoiU3RyaW5nLWFzLVNlcS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9