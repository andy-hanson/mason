"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../compare","../control","../Object","../js","../Type/Method","../Type/Pred-Type","./methods","../Function","../Try"],(exports,compare_0,control_1,Object_2,js_3,Method_4,Pred_45Type_5,methods_6,Function_7,Try_8)=>{
	exports._get=_ms.lazy(()=>{
		const compare=_ms.getDefaultExport(compare_0),_$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_60_63=_ms.get(_$2,"<?"),_60_61_63=_ms.get(_$2,"<=?"),_$3=_ms.getModule(control_1),opr=_ms.get(_$3,"opr"),_$4=_ms.getModule(Object_2),p=_ms.get(_$4,"p"),_$5=_ms.getModule(js_3),id_61_63=_ms.get(_$5,"id=?"),js_45bar=_ms.get(_$5,"js-bar"),js_60=_ms.get(_$5,"js<"),js_60_61=_ms.get(_$5,"js<="),js_43=_ms.get(_$5,"js+"),js_45=_ms.get(_$5,"js-"),js_42=_ms.get(_$5,"js*"),js_47=_ms.get(_$5,"js/"),js_45mod=_ms.get(_$5,"js-mod"),_$6=_ms.getModule(Method_4),impl_33=_ms.get(_$6,"impl!"),Pred_45Type=_ms.getDefaultExport(Pred_45Type_5),_$7=_ms.getModule(Pred_45Type_5),Opt=_ms.get(_$7,"Opt"),_$8=_ms.getModule(methods_6),_43=_ms.get(_$8,"+"),_45=_ms.get(_$8,"-"),_42=_ms.get(_$8,"*"),_47=_ms.get(_$8,"/"),_$10=_ms.lazyGetModule(Function_7),spread_33=_ms.lazyProp(_$10,"spread!"),_$11=_ms.lazyGetModule(Try_8),fails_63=_ms.lazyProp(_$11,"fails?");
		const Int=exports.Int=new (Pred_45Type)((()=>{
			const built={};
			const doc=built.doc=`A multiple of 1.\nThis only contains Numbers for which integer methods return sensible results, AKA safe ints.\nThis is anything between min-safe-integer and max-safe-integer.`;
			const test=built.test=function test(){
				const assert_45int_33=function assert_45int_33(_){
					_ms.assert(_ms.contains,Int,_)
				};
				const forbid_45int_33=function forbid_45int_33(_){
					_ms.assertNot(_ms.contains,Int,_)
				};
				_ms.unlazy(spread_33)(assert_45int_33,(()=>{
					const built=[];
					_ms.add(built,1);
					_ms.add(built,min_45safe_45int);
					_ms.add(built,max_45safe_45int);
					return built
				})());
				_ms.unlazy(spread_33)(forbid_45int_33,(()=>{
					const built=[];
					_ms.add(built,1.1);
					_ms.add(built,_45(min_45safe_45int,1));
					_ms.add(built,_43(max_45safe_45int,1));
					return built
				})())
			};
			const predicate=built.predicate=Number.isSafeInteger;
			return _ms.setName(built,"Int")
		})());
		const Nat=exports.Nat=new (Pred_45Type)((()=>{
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
		})());
		impl_33(compare,Number,function(other){
			const _this=this;
			_ms.checkContains(Number,other,"other");
			return _45(_this,other)
		});
		impl_33(_61_63,Number,(()=>{
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
		})());
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
		const sign=exports.sign=(()=>{
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
				return (()=>{
					if(_60_63(0,_)){
						return 1
					} else if(_60_63(_,0)){
						return - 1
					} else {
						return 0
					}
				})()
			},built)
		})();
		const remainder=exports.remainder=(()=>{
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
		})();
		const int_47=exports["int/"]=(()=>{
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
		})();
		const modulo=exports.modulo=(()=>{
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
				const res=(()=>{
					if(_60_63(numerator,0)){
						return _43(abs(denominator),remainder(numerator,denominator))
					} else {
						return remainder(numerator,denominator)
					}
				})();
				divisible_63(_45(numerator,res),denominator);
				return res
			},built)
		})();
		const divisible_63=exports["divisible?"]=(()=>{
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
		})();
		const log_45e=exports["log-e"]=function log_45e(_){
			_ms.checkContains(Number,_,"_");
			return Math.log(_)
		};
		const log=exports.log=(()=>{
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
		})();
		const abs=exports.abs=(()=>{
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
		})();
		const pow=exports.pow=(()=>{
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
		})();
		const square=exports.square=function square(_){
			_ms.checkContains(Number,_,"_");
			return _42(_,_)
		};
		const square_45root=exports["square-root"]=(()=>{
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
				if(! _60_61_63(0,_))throw _ms.error(`Can't take square root of negative number ${_}.`);
				return Math.sqrt(_)
			},built)
		})();
		const round=exports.round=(()=>{
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
		})();
		const round_45down=exports["round-down"]=(()=>{
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
		})();
		const round_45up=exports["round-up"]=(()=>{
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
		})();
		const round_45towards_450=exports["round-towards-0"]=(()=>{
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
		})();
		const near_63=exports["near?"]=(()=>{
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
				return (()=>{
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
				})()
			},built)
		})();
		const near_450_63=exports["near-0?"]=(()=>{
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
		})();
		const incr=exports.incr=(()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[0],1);
				return built
			};
			return _ms.set(function incr(_){
				_ms.checkContains(Number,_,"_");
				return _43(_,1)
			},built)
		})();
		const decr=exports.decr=(()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[0],- 1);
				return built
			};
			return _ms.set(function decr(_){
				_ms.checkContains(Number,_,"_");
				return _45(_,1)
			},built)
		})();
		const half=exports.half=(()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[3],1.5);
				return built
			};
			return _ms.set(function half(_){
				_ms.checkContains(Number,_,"_");
				return _47(_,2)
			},built)
		})();
		const twice=exports.twice=(()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[1.5],3);
				return built
			};
			return _ms.set(function twice(_){
				_ms.checkContains(Number,_,"_");
				return _42(_,2)
			},built)
		})();
		const neg=exports.neg=(()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[1],- 1);
				_ms.assoc(built,[0],- 0);
				return built
			};
			return _ms.set(function neg(_){
				_ms.checkContains(Number,_,"_");
				return _42(_,- 1)
			},built)
		})();
		const mid=exports.mid=(()=>{
			const built={};
			const doc=built.doc=`TODO`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[0,1],0.5);
				return built
			};
			return _ms.set(function mid(a,b){
				_ms.checkContains(Number,a,"a");
				_ms.checkContains(Number,b,"b");
				return half(_43(a,b))
			},built)
		})();
		const infinity=exports.infinity=p(Number,`POSITIVE_INFINITY`);
		const _45infinity=exports["-infinity"]=p(Number,`NEGATIVE_INFINITY`);
		const max_45safe_45int=exports["max-safe-int"]=p(Number,`MAX_SAFE_INTEGER`);
		const min_45safe_45int=exports["min-safe-int"]=p(Number,`MIN_SAFE_INTEGER`);
		const not_45a_45number=exports["not-a-number"]=Number.NaN;
		const name=exports.name=`Number`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tYXRoL051bWJlci5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQVlBLHNCQUFLLEtBQUksYUFDUyxLQUFBOztHQUFqQixvQkFDQztHQUdELHNCQUNRLGVBQUE7SUFBUCxzQkFBZ0IseUJBQUEsRUFDQzs2QkFBTixJQUFGO0lBQUE7SUFDVCxzQkFBZ0IseUJBQUEsRUFDQztnQ0FBTixJQUFGO0lBQUE7MEJBQ0QsZ0JBQ1csS0FBQTs7bUJBQWhCO21CQUNBO21CQUNBOzs7MEJBQ0ssZ0JBQ1csS0FBQTs7bUJBQWhCO21CQUNBLElBQUUsaUJBQWE7bUJBQ2YsSUFBRSxpQkFBYTs7OztHQUNuQixnQ0FBVzs7O0VBRVosc0JBQUssS0FBSSxhQUNTLEtBQUE7O0dBQWpCLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTs0QkFBRyxJQUFGOytCQUNHLElBQUg7O0dBQ1QsZ0NBQVksbUJBQUEsRUFDQztXQUFaLGNBQUssSUFBRCxJQUFNLFVBQUksRUFBRTtHQUFBOzs7RUFJakIsUUFBTSxRQUFRLE9BQVMsU0FBQSxNQUNZO1NBaUI5QjtxQkFsQndCO1VBQzVCLElBaUJJLE1BakJHO0VBQUE7RUFDUixRQUFNLE9BQUcsT0FDTSxLQUFBOztHQUFkLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsaUJBQWEsa0JBQWtCOzs7a0JBQ2hDLFNBQUEsTUFDSztVQVlIO1dBWkgsU0FZRyxNQVpPO0dBQUE7O0VBQ1osUUFBTSxPQUFHLE9BQVMsU0FBQSxNQUNZO1NBVXpCO3FCQVhtQjtVQUN2QixNQVVJLE1BVks7RUFBQTtFQUNWLFFBQU0sVUFBSSxPQUFTLFNBQUEsTUFDWTtTQVExQjtxQkFUb0I7VUFDeEIsU0FRSSxNQVJNO0VBQUE7RUFDWCxRQUFNLElBQUUsT0FBUyxTQUFBLE1BQ1k7U0FNeEI7cUJBUGtCO1VBQ3RCLE1BTUksTUFOSztFQUFBO0VBQ1YsUUFBTSxJQUFFLE9BQVMsU0FBQSxNQUNZO1NB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R0FBSSxJQUFJLElBQUk7TUFDaEMsNkJBQW1CLGFBQVksSUFBSSxHQUFHO01BQ3RDLFlBQVEsSUFBSSxHQUFJLElBQUUsSUFBRztNQUNyQixvQkFBYyxJQUFHLElBQUUsRUFBRSxPQUFRLElBQUUsRUFBRTtNQUNqQyxjQUFVLElBQUksR0FBSSxJQUFFLElBQUc7YUFDdkIsT0FBSSxJQUFJLGVBQWE7S0FBQTtJQUFBO0dBQUE7O0VBRXpCLHFDQUNRLEtBQUE7O0dBQVAsb0JBQ0M7R0FFRCxzQkFDTyxlQUFBOztvQkFBTixDQUFFLFFBQVEsR0FBTztvQkFDakIsQ0FBRSxLQUFLLEdBQU87OztrQkFDZCxxQkFBQSxFQUFFLFdBQ2lCOzhCQURSLElBQUk7ZUFDSCxJQUFJLFdBQVM7SUFFekIsVUFBTSxJQUFJLEdBQUksSUFBRSxJQUFHO1dBQ25CLE9BQUcsSUFBRyxHQUFFO0dBQUE7O0VBR1Ysd0JBQ0ssS0FBQTs7R0FBSixvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsR0FBTzs7O2tCQUNULGNBQUEsRUFDUTtzQkFETjtXQUNGLElBQUUsRUFBRTtHQUFBOztFQUVOLHdCQUNLLEtBQUE7O0dBQUosb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFFLEdBQU87OztrQkFDVCxjQUFBLEVBQ1E7c0JBRE47V0FDRixJQUFFLEVBQUU7R0FBQTs7RUFFTix3QkFDSyxLQUFBOztHQUFKLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxHQUFPOzs7a0JBQ1QsY0FBQSxFQUNRO3NCQUROO1dBQ0YsSUFBRSxFQUFFO0dBQUE7O0VBRU4sMEJBQ00sS0FBQTs7R0FBTCxvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsS0FBUzs7O2tCQUNYLGVBQUEsRUFDUTtzQkFETjtXQUNGLElBQUUsRUFBRTtHQUFBOztFQUVOLHNCQUNJLEtBQUE7O0dBQUgsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFFLEdBQU87b0JBQ1QsQ0FBRSxHQUFPOzs7a0JBQ1QsYUFBQSxFQUNRO3NCQUROO1dBQ0YsSUFBRSxFQUFFOzs7RUFFTixzQkFDSSxLQUFBOztHQUFILG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxFQUFFLEdBQU87OztrQkFDWCxhQUFBLEVBQVMsRUFDUTtzQkFEZjtzQkFBUztXQUNYLEtBQU0sSUFBRSxFQUFFO0dBQUE7O0VBSVosZ0NBQVUsRUFBRSxPQUFRO0VBQ3BCLHVDQUFXLEVBQUUsT0FBUTtFQUNyQiwrQ0FBYyxFQUFFLE9BQVE7RUFDeEIsK0NBQWMsRUFBRSxPQUFRO0VBQ3hCLCtDQUFjO0VBdFNmLHdCQUFBIiwiZmlsZSI6Im1hdGgvTnVtYmVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=