"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../compare","../control","../Object","../js","../Type/Method","../Type/Pred-Type","./methods","../bang","../Function","../Try","../Type/Type"],function(exports,compare_0,control_1,Object_2,js_3,Method_4,Pred_45Type_5,methods_6,_33_7,Function_8,Try_9,Type_10){
	exports._get=_ms.lazy(function(){
		const compare=_ms.getDefaultExport(compare_0),_$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_60_63=_ms.get(_$2,"<?"),_60_61_63=_ms.get(_$2,"<=?"),_$3=_ms.getModule(control_1),opr=_ms.get(_$3,"opr"),_$4=_ms.getModule(Object_2),p=_ms.get(_$4,"p"),_$5=_ms.getModule(js_3),id_61_63=_ms.get(_$5,"id=?"),js_45bar=_ms.get(_$5,"js-bar"),js_60=_ms.get(_$5,"js<"),js_60_61=_ms.get(_$5,"js<="),js_43=_ms.get(_$5,"js+"),js_45=_ms.get(_$5,"js-"),js_42=_ms.get(_$5,"js*"),js_47=_ms.get(_$5,"js/"),js_45mod=_ms.get(_$5,"js-mod"),_$6=_ms.getModule(Method_4),impl_33=_ms.get(_$6,"impl!"),Pred_45Type=_ms.getDefaultExport(Pred_45Type_5),_$7=_ms.getModule(Pred_45Type_5),Opt=_ms.get(_$7,"Opt"),_$8=_ms.getModule(methods_6),_43=_ms.get(_$8,"+"),_45=_ms.get(_$8,"-"),_42=_ms.get(_$8,"*"),_47=_ms.get(_$8,"/"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_7)
		}),_$10=_ms.lazyGetModule(_33_7),_33not=_ms.lazyProp(_$10,"!not"),_$11=_ms.lazyGetModule(Function_8),spread_33=_ms.lazyProp(_$11,"spread!"),_$12=_ms.lazyGetModule(Try_9),fails_63=_ms.lazyProp(_$12,"fails?"),_$13=_ms.lazyGetModule(Type_10),contains_63=_ms.lazyProp(_$13,"contains?");
		const Int=exports.Int=Pred_45Type(function(){
			const built={};
			const doc=built.doc=`A multiple of 1.\nThis only contains Numbers for which integer methods return sensible results, AKA safe ints.\nThis is anything between min-safe-integer and max-safe-integer.`;
			const test=built.test=function test(){
				_ms.unlazy(spread_33)(_ms.sub(_ms.unlazy(_33),_ms.sub(_ms.unlazy(contains_63),Int)),function(){
					const built=[];
					_ms.add(built,1);
					_ms.add(built,min_45safe_45int);
					_ms.add(built,max_45safe_45int);
					return built
				}());
				_ms.unlazy(spread_33)(_ms.sub(_ms.unlazy(_33not),_ms.sub(_ms.unlazy(contains_63),Int)),function(){
					const built=[];
					_ms.add(built,1.1);
					_ms.add(built,_45(min_45safe_45int,1));
					_ms.add(built,_43(max_45safe_45int,1));
					return built
				}())
			};
			const predicate=built.predicate=Number.isSafeInteger;
			return _ms.setName(built,"Int")
		}());
		const Nat=exports.Nat=Pred_45Type(function(){
			const built={};
			const doc=built.doc=`Any counting number, including \`0\`.`;
			const test=built.test=function test(){
				_ms.unlazy(_33)(_ms.unlazy(contains_63),Nat,0);
				_ms.unlazy(_33not)(_ms.unlazy(contains_63),Nat,- 1)
			};
			const predicate=built.predicate=function predicate(_){
				return (_ms.contains(Int,_)&&_60_61_63(0,_))
			};
			return _ms.setName(built,"Nat")
		}());
		impl_33(compare,Number,_45);
		impl_33(_61_63,Number,function(){
			const built={};
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[not_45a_45number,not_45a_45number],true);
				return built
			};
			return _ms.set(id_61_63,built)
		}());
		impl_33(_60_63,Number,function(a,b){
			_ms.checkContains(Number,b,"b");
			return js_60(a,b)
		});
		impl_33(_60_61_63,Number,function(a,b){
			_ms.checkContains(Number,b,"b");
			return js_60_61(a,b)
		});
		impl_33(_43,Number,function(a,b){
			_ms.checkContains(Number,b,"b");
			return js_43(a,b)
		});
		impl_33(_45,Number,function(a,b){
			_ms.checkContains(Number,b,"b");
			return js_45(a,b)
		});
		impl_33(_42,Number,function(a,b){
			_ms.checkContains(Number,b,"b");
			return js_42(a,b)
		});
		impl_33(_47,Number,function(a,b){
			_ms.checkContains(Number,b,"b");
			return js_47(a,b)
		});
		const sign=exports.sign=function(){
			const built={};
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[- 8],- 1);
				_ms.assoc(built,[0],0);
				_ms.assoc(built,[8],1);
				return built
			};
			return _ms.set(function sign(_){
				_ms.checkContains(Number,_,"_");
				return function(){
					if(_ms.bool(_60_63(0,_))){
						return 1
					} else if(_ms.bool(_60_63(_,0))){
						return - 1
					} else {
						return 0
					}
				}()
			},built)
		}();
		const remainder=exports.remainder=function(){
			const built={};
			const doc=built.doc=`Remainder of \`a\` after dividing by \`b\`.\nSign of result is sign of \`a\`. Sign of \`b\` is ignored.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[2,3],2);
				_ms.assoc(built,[2,- 3],2);
				_ms.assoc(built,[- 2,3],- 2);
				_ms.assoc(built,[- 2,- 3],- 2);
				return built
			};
			return _ms.set(function remainder(numerator,denominator){
				_ms.checkContains(Number,numerator,"numerator");
				_ms.checkContains(Number,denominator,"denominator");
				return js_45mod(numerator,denominator)
			},built)
		}();
		const int_47=exports["int/"]=function(){
			const built={};
			const doc=built.doc=`Integer division: throws out any remainder.\nThis is the default in other programming languages, but in Mason \`/ 1 2\` is 0.5, not 0.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[3,2],1);
				_ms.assoc(built,[- 3,2],- 2);
				return built
			};
			return _ms.set(function int_47(a,b){
				_ms.checkContains(Number,a,"a");
				_ms.checkContains(Number,b,"b");
				return round_45down(_47(a,b))
			},built)
		}();
		const modulo=exports.modulo=function(){
			const built={};
			const doc=built.doc=`Mathematical modulus.\nSmallest positive number which can be added to a multiple of \`denominator\` to get \`numerator\`."`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[2,3],2);
				_ms.assoc(built,[2,- 3],2);
				_ms.assoc(built,[- 2,3],1);
				_ms.assoc(built,[- 2,- 3],1);
				return built
			};
			return _ms.set(function modulo(numerator,denominator){
				_ms.checkContains(Number,numerator,"numerator");
				_ms.checkContains(Number,denominator,"denominator");
				const res=function(){
					if(_ms.bool(_60_63(numerator,0))){
						return _43(abs(denominator),remainder(numerator,denominator))
					} else {
						return remainder(numerator,denominator)
					}
				}();
				divisible_63(_45(numerator,res),denominator);
				return res
			},built)
		}();
		const divisible_63=exports["divisible?"]=function(){
			const built={};
			const doc=built.doc=`Whether an integer number of \`b\` can add up to \`a\`.`;
			const test=built.test=function test(){
				_ms.unlazy(_33)(divisible_63,4,2);
				_ms.unlazy(_33)(divisible_63,4,- 2);
				return _ms.unlazy(_33not)(divisible_63,3,2)
			};
			return _ms.set(function divisible_63(a,b){
				_ms.checkContains(Number,a,"a");
				_ms.checkContains(Number,b,"b");
				return _61_63(0,remainder(a,b))
			},built)
		}();
		const log_45e=exports["log-e"]=function log_45e(_){
			_ms.checkContains(Number,_,"_");
			return Math.log(_)
		};
		const log=exports.log=function(){
			const built={};
			const doc=built.doc=`Mathematical logarithm.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.unlazy(_33)(near_63,log(10,0.01),- 2);
				_ms.assoc(built,[2,8],3);
				return built
			};
			return _ms.set(function log(base,n){
				_ms.checkContains(Number,base,"base");
				_ms.checkContains(Number,n,"n");
				return _47(log_45e(n),log_45e(base))
			},built)
		}();
		const abs=exports.abs=function(){
			const built={};
			const doc=built.doc=`Negates \`a\` until it is positive.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[1],1);
				_ms.assoc(built,[- 1],1);
				return built
			};
			return _ms.set(function abs(a){
				_ms.checkContains(Number,a,"a");
				return Math.abs(a)
			},built)
		}();
		const pow=exports.pow=function(){
			const built={};
			const doc=built.doc=`\`a\` raised to the power of \`b\`.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[2,3],8);
				return built
			};
			return _ms.set(function pow(a,b){
				_ms.checkContains(Number,a,"a");
				_ms.checkContains(Number,b,"b");
				return Math.pow(a,b)
			},built)
		}();
		const square=exports.square=function square(_){
			_ms.checkContains(Number,_,"_");
			return _42(_,_)
		};
		const square_45root=exports["square-root"]=function(){
			const built={};
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[4],2);
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					square_45root(- 1)
				});
				return built
			};
			return _ms.set(function square_45root(_){
				_ms.checkContains(Number,_,"_");
				_ms.unlazy(_33)(_60_61_63(0,_),`Can't take square root of negative number ${_ms.show(_)}.`);
				return Math.sqrt(_)
			},built)
		}();
		const round=exports.round=function(){
			const built={};
			const doc=built.doc=`Closest integer.\nRounds up to break ties.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[- 0.5],- 0);
				_ms.assoc(built,[0.5],1);
				return built
			};
			return _ms.set(function round(_){
				_ms.checkContains(Number,_,"_");
				return Math.round(_)
			},built)
		}();
		const round_45down=exports["round-down"]=function(){
			const built={};
			const doc=built.doc=`Greatest integer no greater than \`a\`.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[- 0.5],- 1);
				_ms.assoc(built,[0.5],0);
				return built
			};
			return _ms.set(function round_45down(_){
				_ms.checkContains(Number,_,"_");
				return Math.floor(_)
			},built)
		}();
		const round_45up=exports["round-up"]=function(){
			const built={};
			const doc=built.doc=`Least integer no less than \`a\`.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[- 0.5],- 0);
				_ms.assoc(built,[0.5],1);
				return built
			};
			return _ms.set(function round_45up(_){
				_ms.checkContains(Number,_,"_");
				return Math.ceil(_)
			},built)
		}();
		const round_45towards_450=exports["round-towards-0"]=function(){
			const built={};
			const doc=built.doc=`\`round-down\` if positive, else \`round-up\`.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[- 0.5],0);
				_ms.assoc(built,[0.5],0);
				return built
			};
			return _ms.set(function round_45towards_450(_){
				_ms.checkContains(Number,_,"_");
				return js_45bar(_,0)
			},built)
		}();
		const near_63=exports["near?"]=function(){
			const built={};
			const doc=built.doc=`Whether they are within sig-figs precision.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[1000.9,1000,3],true);
				_ms.assoc(built,[1000.9,1000,4],false);
				_ms.assoc(built,[0.001001,0.001,3],true);
				_ms.assoc(built,[0.001001,0.001,4],false);
				_ms.assoc(built,[0.001,- 0.001,1],false);
				_ms.assoc(built,[0.00999,0,2],true);
				_ms.assoc(built,[0,0.00999,2],true);
				return built
			};
			return _ms.set(function near_63(a,b,sig_45figs){
				_ms.checkContains(Number,b,"b");
				_ms.checkContains(_ms.sub(Opt,Nat),sig_45figs,"sig-figs");
				sig_45figs=opr(sig_45figs,6);
				return function(){
					if(_ms.bool(_61_63(a,0))){
						return near_450_63(b,sig_45figs)
					} else if(_ms.bool(_61_63(b,0))){
						return near_450_63(a,sig_45figs)
					} else {
						const avg_45mag=_47(_43(abs(a),abs(b)),2);
						const n_45digits_45avg_45mag=round_45down(log(10,avg_45mag));
						const scale=pow(10,_42(- 1,n_45digits_45avg_45mag));
						const scaled_45diff=_45(_42(a,scale),_42(b,scale));
						const epsilon=pow(10,_42(- 1,sig_45figs));
						return _60_63(abs(scaled_45diff),epsilon)
					}
				}()
			},built)
		}();
		const near_450_63=exports["near-0?"]=function(){
			const built={};
			const doc=built.doc=`Whether it is close to zero.\nIt must be \`0.0...\` where there are \`sig-figs\` 0s after the decimal point.`;
			const test=built.test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[0.00999,2],true);
				_ms.assoc(built,[0.01,2],false);
				return built
			};
			return _ms.set(function near_450_63(_,sig_45figs){
				_ms.checkContains(_ms.sub(Opt,Nat),sig_45figs,"sig-figs");
				sig_45figs=opr(sig_45figs,6);
				const max=pow(10,_42(- 1,sig_45figs));
				return _60_63(abs(_),max)
			},built)
		}();
		const infinity=exports.infinity=p(Number,`POSITIVE_INFINITY`);
		const _45infinity=exports["-infinity"]=p(Number,`NEGATIVE_INFINITY`);
		const max_45safe_45int=exports["max-safe-int"]=p(Number,`MAX_SAFE_INTEGER`);
		const min_45safe_45int=exports["min-safe-int"]=p(Number,`MIN_SAFE_INTEGER`);
		const not_45a_45number=exports["not-a-number"]=Number.NaN;
		const name=exports.name=`Number`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tYXRoL051bWJlci5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBY0Esc0JBQUssc0JBQ1M7O0dBQWIsb0JBQ0M7R0FHRCxzQkFDUSxlQUFBO2tGQUFhLGdCQUNLOzttQkFBdEI7bUJBQ0E7bUJBQ0E7OztxRkFDb0IsZ0JBQ0s7O21CQUF6QjttQkFDQSxJQUFFLGlCQUFhO21CQUNmLElBQUUsaUJBQWE7Ozs7R0FDbkIsZ0NBQVc7OztFQUVaLHNCQUFLLHNCQUNTOztHQUFiLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTs0Q0FBSyxJQUFJOytDQUNELElBQUk7O0dBQ3BCLGdDQUFZLG1CQUFBLEVBQ0M7V0FBWixjQUFLLElBQUQsSUFBTSxVQUFJLEVBQUU7R0FBQTs7O0VBSWpCLFFBQU0sUUFBUSxPQUFPO0VBQ3JCLFFBQU0sT0FBRyxpQkFDTTs7R0FBZCxzQkFDTyxlQUFBOztvQkFBTixDQUFFLGlCQUFhLGtCQUFrQjs7O2tCQUNsQzs7RUFDRCxRQUFNLE9BQUcsT0FBUSxTQUFBLEVBQUUsRUFDUTtxQkFETjtVQUNwQixNQUFJLEVBQUU7RUFBQTtFQUNQLFFBQU0sVUFBSSxPQUFRLFNBQUEsRUFBRSxFQUNRO3FCQUROO1VBQ3JCLFNBQUssRUFBRTtFQUFBO0VBQ1IsUUFBTSxJQUFFLE9BQVEsU0FBQSxFQUFFLEVBQ1E7cUJBRE47VUFDbkIsTUFBSSxFQUFFO0VBQUE7RUFDUCxRQUFNLElBQUUsT0FBUSxTQUFBLEVBQUUsRUFDUTtxQkFETjtVQUNuQixNQUFJLEVBQUU7RUFBQTtFQUNQLFFBQU0sSUFBRSxPQUFRLFNBQUEsRUFBRSxFQUNRO3FCQUROO1VBQ25CLE1BQUksRUFBRTtFQUFBO0VBQ1AsUUFBTSxJQUFFLE9BQVEsU0FBQSxFQUFFLEVBQ1E7cUJBRE47VUFDbkIsTUFBSSxFQUFFO0VBQUE7RUFHUCxrQ0FDSzs7R0FBSixzQkFDTyxlQUFBOztvQkFBTixDQUFFLEtB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ZUFBQTs7b0JBQU4sQ0FBRSxPQUFVO29CQUNaLENBQUUsS0FBUzs7O2tCQUNYLG9CQUFBLEVBQ1E7c0JBRE47V0FDRixVQUFVO0dBQUE7O0VBRVosK0RBQ2dCOztHQUFmLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxPQUFVO29CQUNaLENBQUUsS0FBUzs7O2tCQUNYLDZCQUFBLEVBQ1E7c0JBRE47V0FDRixTQUFPLEVBQUU7R0FBQTs7RUFHWCx5Q0FDTTs7R0FBTCxvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsT0FBTyxLQUFLLEdBQU87b0JBQ3JCLENBQUUsT0FBTyxLQUFLLEdBQU87b0JBQ3JCLENBQUUsU0FBUyxNQUFNLEdBQU87b0JBQ3hCLENBQUUsU0FBUyxNQUFNLEdBQU87b0JBQ3hCLENBQUUsTUFBTSxRQUFPLEdBQU87b0JBRXJCLENBQUUsUUFBUSxFQUFFLEdBQU87b0JBQ25CLENBQUUsRUFBRSxRQUFRLEdBQU87OztrQkFDcEIsaUJBQUEsRUFBRSxFQUFTLFdBQ2lCO3NCQUR4Qjs4QkFBZ0IsSUFBSTtlQUNaLElBQUksV0FBUzs7S0FFeEIsWUFBQSxPQUFHLEVBQUUsSUFDQzthQUFMLFlBQVEsRUFBRTtLQUFBLE9BQ1gsWUFBQSxPQUFHLEVBQUUsSUFDQzthQUFMLFlBQVEsRUFBRTtLQUFBLE9BRVA7TUFBSCxnQkFBVSxJQUFHLElBQUcsSUFBSSxHQUFJLElBQUksSUFBSTtNQUNoQyw2QkFBbUIsYUFBWSxJQUFJLEdBQUc7TUFDdEMsWUFBUSxJQUFJLEdBQUksSUFBRSxJQUFHO01BQ3JCLG9CQUFjLElBQUcsSUFBRSxFQUFFLE9BQVEsSUFBRSxFQUFFO01BQ2pDLGNBQVUsSUFBSSxHQUFJLElBQUUsSUFBRzthQUN2QixPQUFJLElBQUksZUFBYTtLQUFBO0lBQUE7R0FBQTs7RUFFekIsK0NBQ1E7O0dBQVAsb0JBQ0M7R0FFRCxzQkFDTyxlQUFBOztvQkFBTixDQUFFLFFBQVEsR0FBTztvQkFDakIsQ0FBRSxLQUFLLEdBQU87OztrQkFDZCxxQkFBQSxFQUFFLFdBQ2lCOzhCQURSLElBQUk7ZUFDSCxJQUFJLFdBQVM7SUFFekIsVUFBTSxJQUFJLEdBQUksSUFBRSxJQUFHO1dBQ25CLE9BQUcsSUFBRyxHQUFFO0dBQUE7O0VBR1YsZ0NBQVUsRUFBRSxPQUFRO0VBQ3BCLHVDQUFXLEVBQUUsT0FBUTtFQUNyQiwrQ0FBYyxFQUFFLE9BQVE7RUFDeEIsK0NBQWMsRUFBRSxPQUFRO0VBQ3hCLCtDQUFjO0VBclBmLHdCQUFBIiwiZmlsZSI6Im1hdGgvTnVtYmVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=