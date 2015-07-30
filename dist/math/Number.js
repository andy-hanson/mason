"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../compare","../control","../Object","../js","../Type/Method","../Type/Pred-Type","./methods","../Function","../Try"],(exports,compare_0,control_1,Object_2,js_3,Method_4,Pred_45Type_5,methods_6,Function_7,Try_8)=>{
	exports._get=_ms.lazy(()=>{
		const compare=_ms.getDefaultExport(compare_0),_$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_60_63=_ms.get(_$2,"<?"),_60_61_63=_ms.get(_$2,"<=?"),_$3=_ms.getModule(control_1),opr=_ms.get(_$3,"opr"),_$4=_ms.getModule(Object_2),p=_ms.get(_$4,"p"),_$5=_ms.getModule(js_3),id_61_63=_ms.get(_$5,"id=?"),js_45bar=_ms.get(_$5,"js-bar"),js_60=_ms.get(_$5,"js<"),js_60_61=_ms.get(_$5,"js<="),js_43=_ms.get(_$5,"js+"),js_45=_ms.get(_$5,"js-"),js_42=_ms.get(_$5,"js*"),js_47=_ms.get(_$5,"js/"),js_45mod=_ms.get(_$5,"js-mod"),_$6=_ms.getModule(Method_4),impl_33=_ms.get(_$6,"impl!"),Pred_45Type=_ms.getDefaultExport(Pred_45Type_5),_$7=_ms.getModule(Pred_45Type_5),Opt=_ms.get(_$7,"Opt"),_$8=_ms.getModule(methods_6),_43=_ms.get(_$8,"+"),_45=_ms.get(_$8,"-"),_42=_ms.get(_$8,"*"),_47=_ms.get(_$8,"/"),_$10=_ms.lazyGetModule(Function_7),spread_33=_ms.lazyProp(_$10,"spread!"),_$11=_ms.lazyGetModule(Try_8),fails_63=_ms.lazyProp(_$11,"fails?");
		const Int=exports.Int=new (Pred_45Type)(()=>{
			const built={};
			const doc=built.doc=`A multiple of 1.\nThis only contains Numbers for which integer methods return sensible results, AKA safe ints.\nThis is anything between min-safe-integer and max-safe-integer.`;
			const test=built.test=function test(){
				const assert_45int_33=function assert_45int_33(_){
					_ms.assert(_ms.contains,Int,_)
				};
				const forbid_45int_33=function forbid_45int_33(_){
					_ms.assertNot(_ms.contains,Int,_)
				};
				_ms.unlazy(spread_33)(assert_45int_33,()=>{
					const built=[];
					_ms.add(built,1);
					_ms.add(built,min_45safe_45int);
					_ms.add(built,max_45safe_45int);
					return built
				}());
				_ms.unlazy(spread_33)(forbid_45int_33,()=>{
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
		const Nat=exports.Nat=new (Pred_45Type)(()=>{
			const built={};
			const doc=built.doc=`Any counting number, including \`0\`.`;
			const test=built.test=function test(){
				_ms.assert(_ms.contains,Nat,0);
				_ms.assertNot(_ms.contains,Nat,- 1)
			};
			const predicate=built.predicate=function predicate(_){
				return (_ms.contains(Int,_)&&_60_61_63(0,_))
			};
			return _ms.setName(built,"Nat")
		}());
		impl_33(compare,Number,function(other){
			const _this=this;
			_ms.checkContains(Number,other,"other");
			return _45(_this,other)
		});
		impl_33(_61_63,Number,()=>{
			const built={};
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[not_45a_45number,not_45a_45number],true);
				return built
			};
			return _ms.set(function(other){
				const _this=this;
				return id_61_63(_this,other)
			},built)
		}());
		impl_33(_60_63,Number,function(other){
			const _this=this;
			_ms.checkContains(Number,other,"other");
			return js_60(_this,other)
		});
		impl_33(_60_61_63,Number,function(other){
			const _this=this;
			_ms.checkContains(Number,other,"other");
			return js_60_61(_this,other)
		});
		impl_33(_43,Number,function(other){
			const _this=this;
			_ms.checkContains(Number,other,"other");
			return js_43(_this,other)
		});
		impl_33(_45,Number,function(other){
			const _this=this;
			_ms.checkContains(Number,other,"other");
			return js_45(_this,other)
		});
		impl_33(_42,Number,function(other){
			const _this=this;
			_ms.checkContains(Number,other,"other");
			return js_42(_this,other)
		});
		impl_33(_47,Number,function(other){
			const _this=this;
			_ms.checkContains(Number,other,"other");
			return js_47(_this,other)
		});
		const sign=exports.sign=()=>{
			const built={};
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[- 8],- 1);
				_ms.assoc(built,[0],0);
				_ms.assoc(built,[8],1);
				return built
			};
			return _ms.set(function sign(_){
				_ms.checkContains(Number,_,"_");
				return ()=>{
					if(_60_63(0,_)){
						return 1
					} else if(_60_63(_,0)){
						return - 1
					} else {
						return 0
					}
				}()
			},built)
		}();
		const remainder=exports.remainder=()=>{
			const built={};
			const doc=built.doc=`Remainder of \`a\` after dividing by \`b\`.\nSign of result is sign of \`a\`. Sign of \`b\` is ignored.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
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
		const int_47=exports["int/"]=()=>{
			const built={};
			const doc=built.doc=`Integer division: throws out any remainder.\nThis is the default in other programming languages, but in Mason \`/ 1 2\` is 0.5, not 0.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
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
		const modulo=exports.modulo=()=>{
			const built={};
			const doc=built.doc=`Mathematical modulus.\nSmallest positive number which can be added to a multiple of \`denominator\` to get \`numerator\`."`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[2,3],2);
				_ms.assoc(built,[2,- 3],2);
				_ms.assoc(built,[- 2,3],1);
				_ms.assoc(built,[- 2,- 3],1);
				return built
			};
			return _ms.set(function modulo(numerator,denominator){
				_ms.checkContains(Number,numerator,"numerator");
				_ms.checkContains(Number,denominator,"denominator");
				const res=()=>{
					if(_60_63(numerator,0)){
						return _43(abs(denominator),remainder(numerator,denominator))
					} else {
						return remainder(numerator,denominator)
					}
				}();
				divisible_63(_45(numerator,res),denominator);
				return res
			},built)
		}();
		const divisible_63=exports["divisible?"]=()=>{
			const built={};
			const doc=built.doc=`Whether an integer number of \`b\` can add up to \`a\`.`;
			const test=built.test=function test(){
				_ms.assert(divisible_63,4,2);
				_ms.assert(divisible_63,4,- 2);
				_ms.assertNot(divisible_63,3,2)
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
		const log=exports.log=()=>{
			const built={};
			const doc=built.doc=`Mathematical logarithm.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assert(near_63,log(10,0.01),- 2);
				_ms.assoc(built,[2,8],3);
				return built
			};
			return _ms.set(function log(base,n){
				_ms.checkContains(Number,base,"base");
				_ms.checkContains(Number,n,"n");
				return _47(log_45e(n),log_45e(base))
			},built)
		}();
		const abs=exports.abs=()=>{
			const built={};
			const doc=built.doc=`Negates \`a\` until it is positive.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[1],1);
				_ms.assoc(built,[- 1],1);
				return built
			};
			return _ms.set(function abs(a){
				_ms.checkContains(Number,a,"a");
				return Math.abs(a)
			},built)
		}();
		const pow=exports.pow=()=>{
			const built={};
			const doc=built.doc=`\`a\` raised to the power of \`b\`.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
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
		const square_45root=exports["square-root"]=()=>{
			const built={};
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[4],2);
				_ms.assert(_ms.unlazy(fails_63),()=>{
					square_45root(- 1)
				});
				return built
			};
			return _ms.set(function square_45root(_){
				_ms.checkContains(Number,_,"_");
				if(! _60_61_63(0,_))throw _ms.error(`Can't take square root of negative number ${_ms.show(_)}.`);
				return Math.sqrt(_)
			},built)
		}();
		const round=exports.round=()=>{
			const built={};
			const doc=built.doc=`Closest integer.\nRounds up to break ties.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[- 0.5],- 0);
				_ms.assoc(built,[0.5],1);
				return built
			};
			return _ms.set(function round(_){
				_ms.checkContains(Number,_,"_");
				return Math.round(_)
			},built)
		}();
		const round_45down=exports["round-down"]=()=>{
			const built={};
			const doc=built.doc=`Greatest integer no greater than \`a\`.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[- 0.5],- 1);
				_ms.assoc(built,[0.5],0);
				return built
			};
			return _ms.set(function round_45down(_){
				_ms.checkContains(Number,_,"_");
				return Math.floor(_)
			},built)
		}();
		const round_45up=exports["round-up"]=()=>{
			const built={};
			const doc=built.doc=`Least integer no less than \`a\`.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[- 0.5],- 0);
				_ms.assoc(built,[0.5],1);
				return built
			};
			return _ms.set(function round_45up(_){
				_ms.checkContains(Number,_,"_");
				return Math.ceil(_)
			},built)
		}();
		const round_45towards_450=exports["round-towards-0"]=()=>{
			const built={};
			const doc=built.doc=`\`round-down\` if positive, else \`round-up\`.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[- 0.5],0);
				_ms.assoc(built,[0.5],0);
				return built
			};
			return _ms.set(function round_45towards_450(_){
				_ms.checkContains(Number,_,"_");
				return js_45bar(_,0)
			},built)
		}();
		const near_63=exports["near?"]=()=>{
			const built={};
			const doc=built.doc=`Whether they are within sig-figs precision.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
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
				return ()=>{
					if(_61_63(a,0)){
						return near_450_63(b,sig_45figs)
					} else if(_61_63(b,0)){
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
		const near_450_63=exports["near-0?"]=()=>{
			const built={};
			const doc=built.doc=`Whether it is close to zero.\nIt must be \`0.0...\` where there are \`sig-figs\` 0s after the decimal point.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tYXRoL051bWJlci5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVlBLHNCQUFLLEtBQUksaUJBQ1M7O0dBQWpCLG9CQUNDO0dBR0Qsc0JBQ1EsZUFBQTtJQUFQLHNCQUFnQix5QkFBQSxFQUNDOzZCQUFOLElBQUY7SUFBQTtJQUNULHNCQUFnQix5QkFBQSxFQUNDO2dDQUFOLElBQUY7SUFBQTswQkFDRCxvQkFDVzs7bUJBQWhCO21CQUNBO21CQUNBOzs7MEJBQ0ssb0JBQ1c7O21CQUFoQjttQkFDQSxJQUFFLGlCQUFhO21CQUNmLElBQUUsaUJBQWE7Ozs7R0FDbkIsZ0NBQVc7OztFQUVaLHNCQUFLLEtBQUksaUJBQ1M7O0dBQWpCLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTs0QkFBRyxJQUFGOytCQUNHLElBQUg7O0dBQ1QsZ0NBQVksbUJBQUEsRUFDQztXQUFaLGNBQUssSUFBRCxJQUFNLFVBQUksRUFBRTtHQUFBOzs7RUFJakIsUUFBTSxRQUFRLE9BQVMsU0FBQSxNQUNZO1NBaUI5QjtxQkFsQndCO1VBQzVCLElBaUJJLE1BakJHO0VBQUE7RUFDUixRQUFNLE9BQUcsV0FDTTs7R0FBZCxzQkFDTyxlQUFBOztvQkFBTixDQUFFLGlCQUFhLGtCQUFrQjs7O2tCQUNoQyxTQUFBLE1BQ0s7VUFZSDtXQVpILFNBWUcsTUFaTztHQUFBOztFQUNaLFFBQU0sT0FBRyxPQUFTLFNBQUEsTUFDWTtTQVV6QjtxQkFYbUI7VUFDdkIsTUFVSSxNQVZLO0VBQUE7RUFDVixRQUFNLFVBQUksT0FBUyxTQUFBLE1BQ1k7U0FRMUI7cUJBVG9CO1VBQ3hCLFNBUUksTUFSTTtFQUFBO0VBQ1gsUUFBTSxJQUFFLE9BQVMsU0FBQSxNQUNZO1NBTXhCO3FCQVBrQjtVQUN0QixNQU1JLE1BTks7RUFBQTtFQUNWLFFBQU0sSUFBRSxPQUFTLFNBQUEsTUFDWTtTQUl4QjtxQkFMa0I7VUFDdEIsTUFJSSxN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WCxlQUFBLEVBQ1E7c0JBRE47V0FDRixXQUFXO0dBQUE7O0VBRWIsNkNBQ1c7O0dBQVYsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFFLE9BQVU7b0JBQ1osQ0FBRSxLQUFTOzs7a0JBQ1gsc0JBQUEsRUFDUTtzQkFETjtXQUNGLFdBQVc7R0FBQTs7RUFFYix5Q0FDUzs7R0FBUixvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsT0FBVTtvQkFDWixDQUFFLEtBQVM7OztrQkFDWCxvQkFBQSxFQUNRO3NCQUROO1dBQ0YsVUFBVTtHQUFBOztFQUVaLHlEQUNnQjs7R0FBZixvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsT0FBVTtvQkFDWixDQUFFLEtBQVM7OztrQkFDWCw2QkFBQSxFQUNRO3NCQUROO1dBQ0YsU0FBTyxFQUFFO0dBQUE7O0VBR1gsbUNBQ007O0dBQUwsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFFLE9BQU8sS0FBSyxHQUFPO29CQUNyQixDQUFFLE9BQU8sS0FBSyxHQUFPO29CQUNyQixDQUFFLFNBQVMsTUFBTSxHQUFPO29CQUN4QixDQUFFLFNBQVMsTUFBTSxHQUFPO29CQUN4QixDQUFFLE1BQU0sUUFBTyxHQUFPO29CQUVyQixDQUFFLFFBQVEsRUFBRSxHQUFPO29CQUNuQixDQUFFLEVBQUUsUUFBUSxHQUFPOzs7a0JBQ3BCLGlCQUFBLEVBQUUsRUFBUyxXQUNpQjtzQkFEeEI7OEJBQWdCLElBQUk7ZUFDWixJQUFJLFdBQVM7O0tBRXhCLEdBQUEsT0FBRyxFQUFFLEdBQ0M7YUFBTCxZQUFRLEVBQUU7S0FBQSxPQUNYLEdBQUEsT0FBRyxFQUFFLEdBQ0M7YUFBTCxZQUFRLEVBQUU7S0FBQSxPQUVQO01BQUgsZ0JBQVUsSUFBRyxJQUFHLElBQUksR0FBSSxJQUFJLElBQUk7TUFDaEMsNkJBQW1CLGFBQVksSUFBSSxHQUFHO01BQ3RDLFlBQVEsSUFBSSxHQUFJLElBQUUsSUFBRztNQUNyQixvQkFBYyxJQUFHLElBQUUsRUFBRSxPQUFRLElBQUUsRUFBRTtNQUNqQyxjQUFVLElBQUksR0FBSSxJQUFFLElBQUc7YUFDdkIsT0FBSSxJQUFJLGVBQWE7S0FBQTtJQUFBO0dBQUE7O0VBRXpCLHlDQUNROztHQUFQLG9CQUNDO0dBRUQsc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxRQUFRLEdBQU87b0JBQ2pCLENBQUUsS0FBSyxHQUFPOzs7a0JBQ2QscUJBQUEsRUFBRSxXQUNpQjs4QkFEUixJQUFJO2VBQ0gsSUFBSSxXQUFTO0lBRXpCLFVBQU0sSUFBSSxHQUFJLElBQUUsSUFBRztXQUNuQixPQUFHLElBQUcsR0FBRTtHQUFBOztFQUdWLGdDQUFVLEVBQUUsT0FBUTtFQUNwQix1Q0FBVyxFQUFFLE9BQVE7RUFDckIsK0NBQWMsRUFBRSxPQUFRO0VBQ3hCLCtDQUFjLEVBQUUsT0FBUTtFQUN4QiwrQ0FBYztFQXpQZix3QkFBQSIsImZpbGUiOiJtYXRoL051bWJlci5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9