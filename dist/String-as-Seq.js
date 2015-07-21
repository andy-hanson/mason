"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./at/at","./at/at-Type","./at/Seq/Seq","./compare","./control","./Function","./show","./Type/Impl-Type","./Type/Kind","./Type/Method","./Type/Pred-Type","./Type/Type","./at/at","./Function"],(exports,_64_0,_64_45Type_1,Seq_2,compare_3,control_4,Function_5,show_6,Impl_45Type_7,Kind_8,Method_9,Pred_45Type_10,Type_11,_64_12,Function_13)=>{
	exports._get=_ms.lazy(()=>{
		const _64=_ms.getDefaultExport(_64_0),_$2=_ms.getModule(_64_0),count=_ms.get(_$2,"count"),empty_63=_ms.get(_$2,"empty?"),_64_45Type=_ms.getDefaultExport(_64_45Type_1),_$3=_ms.getModule(_64_45Type_1),empty=_ms.get(_$3,"empty"),from_45stream=_ms.get(_$3,"from-stream"),Seq=_ms.getDefaultExport(Seq_2),_$5=_ms.getModule(compare_3),_61_63=_ms.get(_$5,"=?"),sort=_ms.get(_$5,"sort"),_$6=_ms.getModule(control_4),opr=_ms.get(_$6,"opr"),_$7=_ms.getModule(Function_5),thunk=_ms.get(_$7,"thunk"),show=_ms.getDefaultExport(show_6),_$9=_ms.getModule(Impl_45Type_7),self_45type=_ms.get(_$9,"self-type"),_$10=_ms.getModule(Kind_8),kind_33=_ms.get(_$10,"kind!"),self_45kind_33=_ms.get(_$10,"self-kind!"),_$11=_ms.getModule(Method_9),impl_33=_ms.get(_$11,"impl!"),impl_45double_33=_ms.get(_$11,"impl-double!"),self_45impl_33=_ms.get(_$11,"self-impl!"),_$12=_ms.getModule(Pred_45Type_10),Opt=_ms.get(_$12,"Opt"),_$13=_ms.getModule(Type_11),_61_62=_ms.get(_$13,"=>"),_$15=_ms.lazyGetModule(_64_12),map=_ms.lazyProp(_$15,"map"),_$16=_ms.lazyGetModule(Function_13),identity=_ms.lazyProp(_$16,"identity");
		const test=exports.test=function test(){
			_ms.assert(_61_63,`123`,_ms.unlazy(map)(`123`,_ms.unlazy(identity)))
		};
		self_45kind_33(String,_64_45Type);
		self_45impl_33(empty,String,thunk(""));
		self_45impl_33(from_45stream,String,_=>{
			return from_45stream(Array,_)
		});
		impl_45double_33(_61_62,self_45type(String),_64,()=>{
			const built={};
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[String,[1,2,3]],`123`);
				_ms.assoc(built,[String,[1,2,3],`, `],`1, 2, 3`);
				return built
			};
			return _ms.set((vals,joiner)=>{
				_ms.checkContains(_ms.sub(Opt,String),joiner,"joiner");
				joiner=opr(joiner,"");
				const arr=()=>{
					const built=[];
					for(let _ of vals){
						_ms.add(built,show(_))
					};
					return built
				}();
				return arr.join(joiner)
			},built)
		}());
		impl_33(sort,String,()=>{
			const built={};
			const test=built.test=function test(){};
			return _ms.set(function(_63sort_45by){
				const _this=this;
				_ms.checkContains(_ms.sub(Opt,Function),_63sort_45by,"?sort-by");
				return sort.default.call(_this,_63sort_45by).join("")
			},built)
		}());
		kind_33(String,Seq);
		impl_33(count,String,function(){
			const _this=this;
			return _this.length
		});
		impl_33(empty_63,String,function(){
			const _this=this;
			return _61_63(0,_this.length)
		});
		const name=exports.name=`String-as-Seq`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9TdHJpbmctYXMtU2VxLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBbUJBLHdCQUNRLGVBQUE7Y0FBQyxPQUFJLHNCQUFXOztFQUV4QixlQUFXLE9BQU87RUFDbEIsZUFBVyxNQUFNLE9BQVEsTUFxQmlCO0VBbkIxQyxlQUFXLGNBQVksT0FBUSxHQUNDO1VBQS9CLGNBQVksTUFBTTtFQUFBO0VBR25CLGlCQUFhLE9BQUksWUFBVSxRQUFRLFFBQ0M7O0dBQW5DLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsT0FBTyxDQUFFLEVBQUUsRUFBRSxJQUFVO29CQUN6QixDQUFFLE9BQU8sQ0FBRSxFQUFFLEVBQUUsR0FBSyxNQUFVOzs7a0JBQzlCLENBQUEsS0FBSyxTQUNrQjs4QkFEWCxJQUFJO1dBQ04sSUFBSSxPQVUwQjtJQVR4Qzs7YUFBVyxLQUFBLEtBQ0k7b0JBQWQsS0FBSTtLQUFBOzs7V0FDTCxTQUFTO0dBQUE7O0VBR1gsUUFBTSxLQUFLLFdBQ007O0dBQWhCLHNCQUNRLGVBQUE7a0JBQ04sU0FBQSxhQUNzQjs7OEJBRGIsSUFBSTtXQUNiLGtCQUFrQixNQUFLLG1CQUFnQjtHQUFBOztFQUUxQyxRQUFNLE9BQU87RUFDYixRQUFNLE1BQU0sT0FDUyxVQUFBOztVQUFwQjs7RUFDRCxRQUFNLFNBQU8sT0FDUyxVQUFBOztVQUFyQixPQUFHLEVBQUU7O0VBbEROLHdCQUFBIiwiZmlsZSI6IlN0cmluZy1hcy1TZXEuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==