"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Boolean","../compare","../control","../Object","../js","../Type/Method","../Type/Pred-Type","./methods","../bang","../Function","../Try","../Type/Type"],function(exports,Boolean_0,compare_1,control_2,Object_3,js_4,Method_5,Pred_45Type_6,methods_7,_33_8,Function_9,Try_10,Type_11){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_ms.get(_$2,"and"),compare=_ms.getDefaultExport(compare_1),_$3=_ms.getModule(compare_1),_61_63=_ms.get(_$3,"=?"),_60_63=_ms.get(_$3,"<?"),_60_61_63=_ms.get(_$3,"<=?"),_$4=_ms.getModule(control_2),opr=_ms.get(_$4,"opr"),_$5=_ms.getModule(Object_3),p=_ms.get(_$5,"p"),_$6=_ms.getModule(js_4),id_61_63=_ms.get(_$6,"id=?"),js_45bar=_ms.get(_$6,"js-bar"),js_60=_ms.get(_$6,"js<"),js_60_61=_ms.get(_$6,"js<="),js_43=_ms.get(_$6,"js+"),js_45=_ms.get(_$6,"js-"),js_42=_ms.get(_$6,"js*"),js_47=_ms.get(_$6,"js/"),js_45mod=_ms.get(_$6,"js-mod"),_$7=_ms.getModule(Method_5),impl_33=_ms.get(_$7,"impl!"),Pred_45Type=_ms.getDefaultExport(Pred_45Type_6),_$8=_ms.getModule(Pred_45Type_6),Opt=_ms.get(_$8,"Opt"),_$9=_ms.getModule(methods_7),_43=_ms.get(_$9,"+"),_45=_ms.get(_$9,"-"),_42=_ms.get(_$9,"*"),_47=_ms.get(_$9,"/"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_8)
		}),_$11=_ms.lazyGetModule(_33_8),_33not=_ms.lazyProp(_$11,"!not"),_$12=_ms.lazyGetModule(Function_9),spread_33=_ms.lazyProp(_$12,"spread!"),_$13=_ms.lazyGetModule(Try_10),fails_63=_ms.lazyProp(_$13,"fails?"),_$14=_ms.lazyGetModule(Type_11),contains_63=_ms.lazyProp(_$14,"contains?");
		const Int=exports.Int=Pred_45Type(function(){
			const doc="A multiple of 1.\nThis only contains Numbers for which integer methods return sensible results, AKA safe ints.\nThis is anything between min-safe-integer and max-safe-integer.";
			const test=function test(){
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
			const predicate=Number.isSafeInteger;
			return {
				doc:doc,
				test:test,
				predicate:predicate,
				name:"Int"
			}
		}());
		const Nat=exports.Nat=Pred_45Type(function(){
			const doc="Any counting number, including `0`.";
			const test=function test(){
				_ms.unlazy(_33)(_ms.unlazy(contains_63),Nat,0);
				_ms.unlazy(_33not)(_ms.unlazy(contains_63),Nat,- 1)
			};
			const predicate=function predicate(_){
				return and(_ms.contains(Int,_),_ms.lazy(function(){
					return _60_61_63(0,_)
				}))
			};
			return {
				doc:doc,
				test:test,
				predicate:predicate,
				name:"Nat"
			}
		}());
		impl_33(compare,Number,_45);
		impl_33(_61_63,Number,function(){
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[not_45a_45number,not_45a_45number],true);
				return built
			};
			return _ms.set(id_61_63,"test",test)
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
			const test=function test(){
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
			},"test",test)
		}();
		const remainder=exports.remainder=function(){
			const doc="Remainder of `a` after dividing by `b`.\nSign of result is sign of `a`. Sign of `b` is ignored.";
			const test=function test(){
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
			},"doc",doc,"test",test)
		}();
		const int_47=exports["int/"]=function(){
			const doc="Integer division: throws out any remainder.\nThis is the default in other programming languages, but in Mason `/ 1 2` is 0.5, not 0.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[3,2],1);
				_ms.assoc(built,[- 3,2],- 2);
				return built
			};
			return _ms.set(function int_47(a,b){
				_ms.checkContains(Number,a,"a");
				_ms.checkContains(Number,b,"b");
				return round_45down(_47(a,b))
			},"doc",doc,"test",test)
		}();
		const modulo=exports.modulo=function(){
			const doc="Mathematical modulus.\nSmallest positive number which can be added to a multiple of `denominator` to get `numerator`.\"";
			const test=function test(){
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
			},"doc",doc,"test",test)
		}();
		const divisible_63=exports["divisible?"]=function(){
			const doc="Whether an integer number of `b` can add up to `a`.";
			const test=function test(){
				_ms.unlazy(_33)(divisible_63,4,2);
				_ms.unlazy(_33)(divisible_63,4,- 2);
				return _ms.unlazy(_33not)(divisible_63,3,2)
			};
			return _ms.set(function divisible_63(a,b){
				_ms.checkContains(Number,a,"a");
				_ms.checkContains(Number,b,"b");
				return _61_63(0,remainder(a,b))
			},"doc",doc,"test",test)
		}();
		const log_45e=exports["log-e"]=function log_45e(_){
			_ms.checkContains(Number,_,"_");
			return Math.log(_)
		};
		const log=exports.log=function(){
			const doc="Mathematical logarithm.";
			const test=function test(){
				const built=new global.Map();
				_ms.unlazy(_33)(near_63,log(10,0.01),- 2);
				_ms.assoc(built,[2,8],3);
				return built
			};
			return _ms.set(function log(base,n){
				_ms.checkContains(Number,base,"base");
				_ms.checkContains(Number,n,"n");
				return _47(log_45e(n),log_45e(base))
			},"doc",doc,"test",test)
		}();
		const abs=exports.abs=function(){
			const doc="Negates `a` until it is positive.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[1],1);
				_ms.assoc(built,[- 1],1);
				return built
			};
			return _ms.set(function abs(a){
				_ms.checkContains(Number,a,"a");
				return Math.abs(a)
			},"doc",doc,"test",test)
		}();
		const pow=exports.pow=function(){
			const doc="`a` raised to the power of `b`.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[2,3],8);
				return built
			};
			return _ms.set(function pow(a,b){
				_ms.checkContains(Number,a,"a");
				_ms.checkContains(Number,b,"b");
				return Math.pow(a,b)
			},"doc",doc,"test",test)
		}();
		const square=exports.square=function square(_){
			_ms.checkContains(Number,_,"_");
			return _42(_,_)
		};
		const square_45root=exports["square-root"]=function(){
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[4],2);
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					square_45root(- 1)
				});
				return built
			};
			return _ms.set(function square_45root(_){
				_ms.checkContains(Number,_,"_");
				_ms.unlazy(_33)(_60_61_63(0,_),(("Can't take square root of negative number "+_ms.show(_))+"."));
				return Math.sqrt(_)
			},"test",test)
		}();
		const round=exports.round=function(){
			const doc="Closest integer.\nRounds up to break ties.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[- 0.5],- 0);
				_ms.assoc(built,[0.5],1);
				return built
			};
			return _ms.set(function round(_){
				_ms.checkContains(Number,_,"_");
				return Math.round(_)
			},"doc",doc,"test",test)
		}();
		const round_45down=exports["round-down"]=function(){
			const doc="Greatest integer no greater than `a`.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[- 0.5],- 1);
				_ms.assoc(built,[0.5],0);
				return built
			};
			return _ms.set(function round_45down(_){
				_ms.checkContains(Number,_,"_");
				return Math.floor(_)
			},"doc",doc,"test",test)
		}();
		const round_45up=exports["round-up"]=function(){
			const doc="Least integer no less than `a`.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[- 0.5],- 0);
				_ms.assoc(built,[0.5],1);
				return built
			};
			return _ms.set(function round_45up(_){
				_ms.checkContains(Number,_,"_");
				return Math.ceil(_)
			},"doc",doc,"test",test)
		}();
		const round_45towards_450=exports["round-towards-0"]=function(){
			const doc="`round-down` if positive, else `round-up`.";
			const test=function test(){
				const built=new global.Map();
				_ms.assoc(built,[- 0.5],0);
				_ms.assoc(built,[0.5],0);
				return built
			};
			return _ms.set(function round_45towards_450(_){
				_ms.checkContains(Number,_,"_");
				return js_45bar(_,0)
			},"doc",doc,"test",test)
		}();
		const near_63=exports["near?"]=function(){
			const doc="Whether they are within sig-figs precision.";
			const test=function test(){
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
			},"doc",doc,"test",test)
		}();
		const near_450_63=exports["near-0?"]=function(){
			const doc="Whether it is close to zero.\nIt must be `0.0...` where there are `sig-figs` 0s after the decimal point.";
			const test=function test(){
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
			},"doc",doc,"test",test)
		}();
		const infinity=exports.infinity=p(Number,"POSITIVE_INFINITY");
		const _45infinity=exports["-infinity"]=p(Number,"NEGATIVE_INFINITY");
		const max_45safe_45int=exports["max-safe-int"]=p(Number,"MAX_SAFE_INTEGER");
		const min_45safe_45int=exports["min-safe-int"]=p(Number,"MIN_SAFE_INTEGER");
		const not_45a_45number=exports["not-a-number"]=Number.NaN;
		const name=exports.name="Number";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tYXRoL051bWJlci5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBZUEsc0JBQUssc0JBQ1M7R0FBYixVQUNDO0dBR0QsV0FDUSxlQUFBO2tGQUFhLGdCQUNLOzttQkFBdEI7bUJBQ0E7bUJBQ0E7OztxRkFDb0IsZ0JBQ0s7O21CQUF6QjttQkFDQSxJQUFFLGlCQUFhO21CQUNmLElBQUUsaUJBQWE7Ozs7R0FDbkIsZ0JBQVc7Ozs7Ozs7O0VBRVosc0JBQUssc0JBQ1M7R0FBYixVQUFNO0dBQ04sV0FDUSxlQUFBOzRDQUFLLElBQUk7K0NBQ0QsSUFBSTs7R0FDcEIsZ0JBQVksbUJBQUEsRUFDQztXQUFaLGlCQUFLLElBQUQ7WUFBTyxVQUFJLEVBQUU7SUFBQTtHQUFBOzs7Ozs7OztFQUlsQixRQUFNLFFBQVEsT0FBTztFQUNyQixRQUFNLE9BQUcsaUJBQ007R0FBZCxXQUNPLGVBQUE7O29CQUFOLENBQUUsaUJBQWEsa0JBQWtCOzs7a0JBQ2xDOztFQUNELFFBQU0sT0FBRyxPQUFRLFNBQUEsRUFBRSxFQUNRO3FCQUROO1VBQ3BCLE1BQUksRUFBRTtFQUFBO0VBQ1AsUUFBTSxVQUFJLE9BQVEsU0FBQSxFQUFFLEVBQ1E7cUJBRE47VUFDckIsU0FBSyxFQUFFO0VBQUE7RUFDUixRQUFNLElBQUUsT0FBUSxTQUFBLEVBQUUsRUFDUTtxQkFETjtVQUNuQixNQUFJLEVBQUU7RUFBQTtFQUNQLFFBQU0sSUFBRSxPQUFRLFNBQUEsRUFBRSxFQUNRO3FCQUROO1VBQ25CLE1BQUksRUFBRTtFQUFBO0VBQ1AsUUFBTSxJQUFFLE9BQVEsU0FBQSxFQUFFLEVBQ1E7cUJBRE47VUFDbkIsTUFBSSxFQUFFO0VBQUE7RUFDUCxRQUFNLElBQUUsT0FBUSxTQUFBLEVBQUUsRUFDUTtxQkFETjtVQUNuQixNQUFJLEVBQUU7RUFBQTtFQUdQLGtDQUNLO0dBQUosV0FDTyxlQUFBOztvQkFBTixD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WixDQUFFLEtBQVM7OztrQkFDWCxvQkFBQSxFQUNRO3NCQUROO1dBQ0YsVUFBVTtHQUFBOztFQUVaLCtEQUNnQjtHQUFmLFVBQU07R0FDTixXQUNPLGVBQUE7O29CQUFOLENBQUUsT0FBVTtvQkFDWixDQUFFLEtBQVM7OztrQkFDWCw2QkFBQSxFQUNRO3NCQUROO1dBQ0YsU0FBTyxFQUFFO0dBQUE7O0VBR1gseUNBQ007R0FBTCxVQUFNO0dBQ04sV0FDTyxlQUFBOztvQkFBTixDQUFFLE9BQU8sS0FBSyxHQUFPO29CQUNyQixDQUFFLE9BQU8sS0FBSyxHQUFPO29CQUNyQixDQUFFLFNBQVMsTUFBTSxHQUFPO29CQUN4QixDQUFFLFNBQVMsTUFBTSxHQUFPO29CQUN4QixDQUFFLE1BQU0sUUFBTyxHQUFPO29CQUVyQixDQUFFLFFBQVEsRUFBRSxHQUFPO29CQUNuQixDQUFFLEVBQUUsUUFBUSxHQUFPOzs7a0JBQ3BCLGlCQUFBLEVBQUUsRUFBUyxXQUNpQjtzQkFEeEI7OEJBQWdCLElBQUk7ZUFDWixJQUFJLFdBQVM7O0tBRXhCLFlBQUEsT0FBRyxFQUFFLElBQ0M7YUFBTCxZQUFRLEVBQUU7S0FBQSxPQUNYLFlBQUEsT0FBRyxFQUFFLElBQ0M7YUFBTCxZQUFRLEVBQUU7S0FBQSxPQUVQO01BQUgsZ0JBQVUsSUFBRyxJQUFHLElBQUksR0FBSSxJQUFJLElBQUk7TUFDaEMsNkJBQW1CLGFBQVksSUFBSSxHQUFHO01BQ3RDLFlBQVEsSUFBSSxHQUFJLElBQUUsSUFBRztNQUNyQixvQkFBYyxJQUFHLElBQUUsRUFBRSxPQUFRLElBQUUsRUFBRTtNQUNqQyxjQUFVLElBQUksR0FBSSxJQUFFLElBQUc7YUFDdkIsT0FBSSxJQUFJLGVBQWE7S0FBQTtJQUFBO0dBQUE7O0VBRXpCLCtDQUNRO0dBQVAsVUFDQztHQUVELFdBQ08sZUFBQTs7b0JBQU4sQ0FBRSxRQUFRLEdBQU87b0JBQ2pCLENBQUUsS0FBSyxHQUFPOzs7a0JBQ2QscUJBQUEsRUFBRSxXQUNpQjs4QkFEUixJQUFJO2VBQ0gsSUFBSSxXQUFTO0lBRXpCLFVBQU0sSUFBSSxHQUFJLElBQUUsSUFBRztXQUNuQixPQUFHLElBQUcsR0FBRTtHQUFBOztFQUdWLGdDQUFVLEVBQUUsT0FBUTtFQUNwQix1Q0FBVyxFQUFFLE9BQVE7RUFDckIsK0NBQWMsRUFBRSxPQUFRO0VBQ3hCLCtDQUFjLEVBQUUsT0FBUTtFQUN4QiwrQ0FBYztFQXRQZix3QkFBQSIsImZpbGUiOiJtYXRoL051bWJlci5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9