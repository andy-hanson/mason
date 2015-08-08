"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../Function","../../Generator","../../Type/Kind","../../Type/Method","../at","../at-Type","./Seq"],(exports,Function_0,Generator_1,Kind_2,Method_3,_64_4,_64_45Type_5,Seq_6)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(Function_0),thunk=_ms.get(_$2,"thunk"),Generator=_ms.getDefaultExport(Generator_1),_$3=_ms.getModule(Generator_1),empty_45Generator=_ms.get(_$3,"empty-Generator"),_$4=_ms.getModule(Kind_2),kind_33=_ms.get(_$4,"kind!"),self_45kind_33=_ms.get(_$4,"self-kind!"),_$5=_ms.getModule(Method_3),self_45impl_33=_ms.get(_$5,"self-impl!"),_$6=_ms.getModule(_64_4),iterator=_ms.get(_$6,"iterator"),_64_45Type=_ms.getDefaultExport(_64_45Type_5),_$7=_ms.getModule(_64_45Type_5),empty=_ms.get(_$7,"empty"),from_45stream=_ms.get(_$7,"from-stream"),Seq=_ms.getDefaultExport(Seq_6),_$8=_ms.getModule(Seq_6),seq_61_63=_ms.get(_$8,"seq=?");
		const Stream=(()=>{
			const _=class Stream{
				static [_ms.symbol(from_45stream)](_){
					const _this=this;
					return new (_this)(()=>{
						return iterator(_)
					})
				}
				constructor(make_45iterator){
					_ms.checkContains(_ms.sub(Function,Generator),make_45iterator,"make-iterator");
					Object.defineProperty(this,Symbol.iterator,(()=>{
						const built={};
						const value=built.value=make_45iterator;
						return built
					})())
				}
			};
			self_45kind_33(_,_64_45Type);
			kind_33(_,Seq);
			self_45impl_33(empty,_,thunk(new (_)(()=>{
				return empty_45Generator
			})));
			return _
		})();
		_ms.newProperty(Stream,"test",()=>{
			const _=new (Stream)(function*(){
				(yield 1);
				(yield 2)
			});
			_ms.assert(seq_61_63,_,[1,2]);
			_ms.assert(seq_61_63,_,[1,2])
		});
		const name=exports.name=`Stream`;
		exports.default=Stream;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9TdHJlYW0ubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFTQSxhQUNhLEtBQ1Q7U0FESDt1QkFhQyxnQkFBYSxFQUNDO1dBQVQ7WUFBSixLQUFJLE9BQ00sSUFBQTthQUFULFNBQVE7S0FBQTtJQUFBO2dCQUVBLGdCQUNpQzsrQkFEbkIsU0FBUztLQUNqQyxzQkFBc0IsS0FBSyxnQkFDZSxLQUFBOztNQUF6Qyx3QkFBTzs7Ozs7R0FsQlIsZUFBVyxFQUFFO0dBQ2IsUUFBTSxFQUFFO0dBRVIsZUFBVyxNQUFNLEVBQUcsTUFBTyxLQUFJLEdBQ0csSUFBQTtXQUFqQztHQUFBO1VBTEY7RUFBQTtrQkFzQkQsY0FDZ0IsSUFBQTtHQUFmLFFBQUksS0FBSSxRQUNVLFdBQUE7V0FBZDtXQUNBO0dBQUE7Y0FDSSxVQUFNLEVBQUUsQ0FBRSxFQUFFO2NBRVosVUFBTSxFQUFFLENBQUUsRUFBRTtFQUFBO0VBdENyQix3QkFBQTtrQkFTQSIsImZpbGUiOiJhdC9TZXEvU3RyZWFtLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=