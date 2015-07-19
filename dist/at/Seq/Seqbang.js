"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../math/Number","../../Type/Kind","../../Type/Method","../at","../atbang","../at-Type","../q","./Seq","./Dequebang","../../compare","../at","./Arraybang","./Seq"],(exports,Number_0,Kind_1,Method_2,_64_3,_64_33_4,_64_45Type_5,_63_6,Seq_7,Deque_33_8,compare_9,_64_10,Array_33_11,Seq_12)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(Number_0),Nat=_ms.get(_$2,"Nat"),Kind=_ms.getDefaultExport(Kind_1),_$3=_ms.getModule(Kind_1),kind_33=_ms.get(_$3,"kind!"),self_45kind_33=_ms.get(_$3,"self-kind!"),Method=_ms.getDefaultExport(Method_2),_64=_ms.getDefaultExport(_64_3),_64_33=_ms.getDefaultExport(_64_33_4),_64_45Type=_ms.getDefaultExport(_64_45Type_5),_$7=_ms.getModule(_64_45Type_5),empty=_ms.get(_$7,"empty"),_63=_ms.getDefaultExport(_63_6),Seq=_ms.getDefaultExport(Seq_7),Deque_33=_ms.lazy(()=>{
			return _ms.getDefaultExport(Deque_33_8)
		}),_$13=_ms.lazyGetModule(compare_9),_61_63=_ms.lazyProp(_$13,"=?"),_$14=_ms.lazyGetModule(_64_10),empty_63=_ms.lazyProp(_$14,"empty?"),Array_33=_ms.lazy(()=>{
			return _ms.getDefaultExport(Array_33_11)
		}),_$16=_ms.lazyGetModule(Seq_12),seq_61_63=_ms.lazyProp(_$16,"seq=?");
		const Seq_33=Kind(()=>{
			const built={};
			const doc=built.doc=`Mutable Seq.\nArray!s can efficiently change existing elements and add new ones on the right.\nDeque!s are like Arrays, but can add new values on the left.`;
			const implementor_45test=built["implementor-test"]=function implementor_45test(type){
				const _=()=>{
					const _=type;
					if(_ms.bool(_ms.unlazy(_61_63)(_,Array))){
						return empty(_ms.unlazy(Array_33))
					} else {
						return empty(type)
					}
				}();
				_43_43_62_33(_,[1,2]);
				_60_43_43_33(_,[- 2,- 1]);
				_ms.assert(_ms.unlazy(seq_61_63),_,[- 2,- 1,1,2]);
				_ms.assert(_ms.unlazy(_61_63),_63pop_62_33(_),_63(2));
				_ms.assert(_ms.unlazy(_61_63),_63_60pop_33(_),_63(- 2));
				_ms.assert(_ms.unlazy(_61_63),_63pop_62_33(_),_63(1));
				_ms.assert(_ms.unlazy(_61_63),_63_60pop_33(_),_63(- 1));
				_ms.assert(_ms.unlazy(_61_63),_63pop_62_33(_),empty(_63));
				_ms.assert(_ms.unlazy(empty_63),_);
				_43_43_62_33(_,[1,2,3])
			};
			return _ms.setName(built,"Seq!")
		}());
		self_45kind_33(Seq_33,_64_45Type,()=>{
			const built=new global.Map();
			_ms.assoc(built,empty,()=>{
				return empty(_ms.unlazy(Deque_33))
			});
			return built
		}());
		kind_33(Seq_33,_64_33);
		kind_33(Seq_33,Seq);
		const _60_43_43_33=exports["<++!"]=Method(()=>{
			const built={};
			const doc=built.doc=`Makes \`_\` into \`+ added _\`.`;
			const args=built.args=()=>{
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`added`,_64]);
				return built
			}();
			return _ms.setName(built,"<++!")
		}());
		const _43_43_62_33=exports["++>!"]=Method(()=>{
			const built={};
			const doc=built.doc=`Makes \`_\` into \`+ _ added\`.`;
			const args=built.args=()=>{
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`added`,_64]);
				return built
			}();
			return _ms.setName(built,"++>!")
		}());
		const _63_60pop_33=exports["?<pop!"]=Method(()=>{
			const built={};
			const doc=built.doc=`Takes one element off the left side, if not empty?.`;
			const args=built.args=1;
			const returns=built.returns=_63;
			return _ms.setName(built,"?<pop!")
		}());
		const _63pop_62_33=exports["?pop>!"]=Method(()=>{
			const built={};
			const doc=built.doc=`Takes one element off the right side, if not empty?.`;
			const args=built.args=1;
			const returns=built.returns=_63;
			return _ms.setName(built,"?pop>!")
		}());
		const set_45nth_33=exports["set-nth!"]=Method(()=>{
			const built={};
			const doc=built.doc=`Makes \`_[n]\` be \`val\`.`;
			const args=built.args=()=>{
				const built=[];
				_ms.add(built,`_`);
				_ms.add(built,[`n`,Nat]);
				_ms.add(built,`val`);
				return built
			}();
			return _ms.setName(built,"set-nth!")
		}());
		const name=exports.name=`Seq!`;
		exports.default=Seq_33;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9TZXEhLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztFQWlCQSxhQUFNLFNBQ0k7O0dBQVQsb0JBQ0M7R0FHRCxtREFBb0IsNEJBQUEsS0FDSTtJQUN2QjtLQUFTLFFBQUE7S0FDUiwrQkFBRyxFQUFFLFFBQ0s7YUFBVDtZQUVHO2FBQUgsTUFBTTtLQUFBO0lBQUE7SUFDUixhQUFLLEVBQUUsQ0FBRSxFQUFFO0lBQ1gsYUFBSyxFQUFFLENBQUUsSUFBRztxQ0FDRSxFQUFFLENBQUUsSUFBRyxJQUFHLEVBQUU7a0NBQ2YsYUFBTSxHQUFHLElBQUU7a0NBQ1gsYUFBTSxHQUFHLElBQUU7a0NBQ1gsYUFBTSxHQUFHLElBQUU7a0NBQ1gsYUFBTSxHQUFHLElBQUU7a0NBQ1gsYUFBTSxHQUFHLE1BQU07b0NBQ1g7SUFDZixhQUFLLEVBQUUsQ0FBRSxFQUFFLEVBQUU7R0FBQTs7O0VBRWYsZUFBVyxPQUFLLGVBQ007O21CQUFyQixNQUNVLElBQUE7V0FBVDs7OztFQUVGLFFBQU0sT0FBSztFQUNYLFFBQU0sT0FBSztFQUVYLG1DQUFNLFdBQ007O0dBQVgsb0JBQU07R0FDTiwwQkFDSzs7a0JBQUQ7a0JBQ0QsQ0FBRyxRQUFPOzs7OztFQUNkLG1DQUFNLFdBQ007O0dBQVgsb0JBQU07R0FDTiwwQkFDSzs7a0JBQUQ7a0JBQ0QsQ0FBRyxRQUFPOzs7OztFQUVkLHFDQUFRLFdBQ007O0dBQWIsb0JBQU07R0FDTixzQkFBTTtHQUNOLDRCQUFTOzs7RUFDVixxQ0FBUSxXQUNNOztHQUFiLG9CQUFNO0dBQ04sc0JBQU07R0FDTiw0QkFBUzs7O0VBRVYsdUNBQVUsV0FDTTs7R0FBZixvQkFBTTtHQUNOLDBCQUNLOztrQkFBRDtrQkFDRCxDQUFHLElBQUc7a0JBQ0w7Ozs7O0VBeEVMLHdCQUFBO2tCQWlCQSIsImZpbGUiOiJhdC9TZXEvU2VxYmFuZy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9