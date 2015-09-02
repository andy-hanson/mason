"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../compare","../control","../js","../Type/Method","../Type/Pred-Type","./methods","../Function","../Try"],(exports,compare_0,control_1,js_2,Method_3,Pred_45Type_4,methods_5,Function_6,Try_7)=>{
	exports._get=_ms.lazy(()=>{
		const compare=_ms.getDefaultExport(compare_0),_$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_60_63=_ms.get(_$0,"<?"),_60_61_63=_ms.get(_$0,"<=?"),_$1=_ms.getModule(control_1),opr=_ms.get(_$1,"opr"),_$2=_ms.getModule(js_2),id_61_63=_ms.get(_$2,"id=?"),js_45bar=_ms.get(_$2,"js-bar"),js_60=_ms.get(_$2,"js<"),js_60_61=_ms.get(_$2,"js<="),js_43=_ms.get(_$2,"js+"),js_45=_ms.get(_$2,"js-"),js_42=_ms.get(_$2,"js*"),js_47=_ms.get(_$2,"js/"),js_45mod=_ms.get(_$2,"js-mod"),_$3=_ms.getModule(Method_3),impl_33=_ms.get(_$3,"impl!"),Pred_45Type=_ms.getDefaultExport(Pred_45Type_4),_$4=_ms.getModule(Pred_45Type_4),Opt=_ms.get(_$4,"Opt"),_$5=_ms.getModule(methods_5),_43=_ms.get(_$5,"+"),_45=_ms.get(_$5,"-"),_42=_ms.get(_$5,"*"),_47=_ms.get(_$5,"/"),_$6=_ms.lazyGetModule(Function_6),spread_33=_ms.lazyProp(_$6,"spread!"),_$7=_ms.lazyGetModule(Try_7),fails_63=_ms.lazyProp(_$7,"fails?");
		const Int=exports.Int=new (Pred_45Type)((()=>{
			const built={};
			built[`name`]="Int";
			const doc=built.doc=`A multiple of 1.
This only contains Numbers for which integer methods return sensible results, AKA safe ints.
This is anything between Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER.`;
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
					_ms.add(built,Number.MIN_SAFE_INTEGER);
					_ms.add(built,Number.MAX_SAFE_INTEGER);
					return built
				})());
				_ms.unlazy(spread_33)(forbid_45int_33,(()=>{
					const built=[];
					_ms.add(built,1.1);
					_ms.add(built,_45(Number.MIN_SAFE_INTEGER,1));
					_ms.add(built,_43(Number.MAX_SAFE_INTEGER,1));
					return built
				})())
			};
			const predicate=built.predicate=Number.isSafeInteger;
			return built
		})());
		const Nat=exports.Nat=new (Pred_45Type)((()=>{
			const built={};
			built[`name`]="Nat";
			const doc=built.doc=`Any counting number, including \`0\`.`;
			const test=built.test=function test(){
				_ms.assert(_ms.contains,Nat,0);
				_ms.assertNot(_ms.contains,Nat,- 1)
			};
			const predicate=built.predicate=function predicate(_){
				return (_ms.contains(Int,_)&&_60_61_63(0,_))
			};
			return built
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
				_ms.assoc(built,[Number.NaN,Number.NaN],true);
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
			return _ms.set(_=>{
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
			const doc=built.doc=`Remainder of \`a\` after dividing by \`b\`.
Sign of result is sign of \`a\`. Sign of \`b\` is ignored.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[2,3],2);
				_ms.assoc(built,[2,- 3],2);
				_ms.assoc(built,[- 2,3],- 2);
				_ms.assoc(built,[- 2,- 3],- 2);
				return built
			};
			return _ms.set((numerator,denominator)=>{
				_ms.checkContains(Number,numerator,"numerator");
				_ms.checkContains(Number,denominator,"denominator");
				return js_45mod(numerator,denominator)
			},built)
		})();
		const int_47=exports["int/"]=(()=>{
			const built={};
			const doc=built.doc=`Integer division: throws out any remainder.
This is the default in other programming languages, but in Mason \`/ 1 2\` is 0.5, not 0.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[3,2],1);
				_ms.assoc(built,[- 3,2],- 2);
				return built
			};
			return _ms.set((a,b)=>{
				_ms.checkContains(Number,a,"a");
				_ms.checkContains(Number,b,"b");
				return round_45down(_47(a,b))
			},built)
		})();
		const modulo=exports.modulo=(()=>{
			const built={};
			const doc=built.doc=`Mathematical modulus.
Smallest positive number which can be added to a multiple of \`denominator\` to get \`numerator\`."`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[2,3],2);
				_ms.assoc(built,[2,- 3],2);
				_ms.assoc(built,[- 2,3],1);
				_ms.assoc(built,[- 2,- 3],1);
				return built
			};
			return _ms.set((numerator,denominator)=>{
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
			return _ms.set((a,b)=>{
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
			return _ms.set((base,n)=>{
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
			return _ms.set(a=>{
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
			return _ms.set((a,b)=>{
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
			return _ms.set(_=>{
				_ms.checkContains(Number,_,"_");
				if(! _60_61_63(0,_))throw new (Error)(`Can't take square root of negative number ${_}.`);
				return Math.sqrt(_)
			},built)
		})();
		const round=exports.round=(()=>{
			const built={};
			const doc=built.doc=`Closest integer.
Rounds up to break ties.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[- 0.5],- 0);
				_ms.assoc(built,[0.5],1);
				return built
			};
			return _ms.set(_=>{
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
			return _ms.set(_=>{
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
			return _ms.set(_=>{
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
			return _ms.set(_=>{
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
			return _ms.set((a,b,sig_45figs)=>{
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
			const doc=built.doc=`Whether it is close to zero.
It must be \`0.0...\` where there are \`sig-figs\` 0s after the decimal point.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[0.00999,2],true);
				_ms.assoc(built,[0.01,2],false);
				return built
			};
			return _ms.set((_,sig_45figs)=>{
				_ms.checkContains(_ms.sub(Opt,Nat),sig_45figs,"sig-figs");
				sig_45figs=opr(sig_45figs,6);
				const max=pow(10,_42(- 1,sig_45figs));
				return _60_63(abs(_),max)
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
			return _ms.set(_=>{
				_ms.checkContains(Number,_,"_");
				return _42(- 1,_)
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
			return _ms.set((a,b)=>{
				_ms.checkContains(Number,a,"a");
				_ms.checkContains(Number,b,"b");
				return _47(_43(a,b),2)
			},built)
		})();
		const name=exports.name=`Number`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvbWF0aC9OdW1iZXIubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFXQSxzQkFBSyxLQUFJLGFBQ1MsS0FBQTs7U0FBakIsUUFBQTtHQUNBLG9CQUNDO0dBR0Qsc0JBQ1EsZUFBQTtJQUFQLHNCQUFnQix5QkFBQSxFQUNDOzZCQUFOLElBQUY7SUFBQTtJQUNULHNCQUFnQix5QkFBQSxFQUNDO2dDQUFOLElBQUY7SUFBQTswQkFDRCxnQkFDVyxLQUFBOzttQkFBaEI7bUJBMk9TO21CQUFBOzs7MEJBeE9KLGdCQUNXLEtBQUE7O21CQUFoQjttQkFDQSxJQXNPUyx3QkF0T2lCO21CQUMxQixJQXFPUyx3QkFyT2lCOzs7O0dBQzlCLGdDQW9PYTs7O0VBbE9kLHNCQUFLLEtBQUksYUFDUyxLQUFBOztTQUFqQixRQUFBO0dBQ0Esb0JBQU07R0FDTixzQkFDUSxlQUFBOzRCQUFHLElBQUY7K0JBQ0csSUFBSDs7R0FDVCxnQ0FBWSxtQkFBQSxFQUNDO1dBQVosY0FBSyxJQUFELElBQU0sVUFBSSxFQUFFO0dBQUE7OztFQUlqQixRQUFNLFFBdU5PLE9Bdk5VLFNBQUEsTUFDWTtTQWlCOUI7cUJBcU1RO1VBdE5aLElBaUJJLE1BakJHO0VBQUE7RUFDUixRQUFNLE9BcU5PLE9BcE5FLEtBQUE7O0dBQWQsc0JBQ08sZUFBQTs7b0JBQU4sQ0FtTlcsdUJBbk5rQjs7O2tCQUM1QixTQUFBLE1BQ0s7VUFZSDtXQVpILFNBWUcsTUFaTztHQUFBOztFQUNaLFFBQU0sT0FnTk8sT0FoTkssU0FBQSxNQUNZO1NBVXpCO3FCQXFNUTtVQS9NWixNQVVJLE1BVks7RUFBQTtFQUNWLFFBQU0sVUE4TU8sT0E5TU0sU0FBQSxNQUNZO1NBUTFCO3FCQXFNUTtVQTdNWixTQVFJLE1BUk07RUFBQTtFQUNYLFFBQU0sSUE0TU8sT0E1TUksU0FBQSxNQUNZO1NBTXhCO3FCQXFNUTtVQTNNWixNQU1JLE1BTks7RUFBQTtFQUNWLFFBQU0sSUEwTU8sT0ExTUksU0FBQSxNQUNZO1NBSXhCO3FCQXFNUTtVQXpNWixNQUlJLE1BSks7RUFBQTtFQUNWLFFBQU0sSUF3TU8sT0F4TUksU0FBQSxNQUNZO1NBRXhCO3FCQXFNUTtVQXZNWixNQUVJLE1BRks7RUFBQTtFQUNWLFFBQU0sSUFzTU8sT0F0TUksU0FBQSxNQUNZO1NBQXhCO3FCQXFNUTtVQXJNWixNQUFJLE1BQUs7RUFBQTtFQUdWLHdCQUNLLEtBQUE7O0dBQUosc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxLQUFRO29CQUNWLENBQUUsR0FBTztvQkFDVCxDQUFFLEdBQU87OztrQkFDVCxHQUNRO3NCQTRMRztXQTNMUDtLQUFILEdBQUEsT0FBRyxFQUFFLEdBQ0M7YUFBTDtLQUFBLE9BQ0QsR0FBQSxPQUFHLEVBQUUsR0FDQzthQUFMO1lBRUc7YUFBSDtLQUFBO0lBQUE7R0FBQTs7RUFHSixrQ0FDVSxLQUFBOztHQUFULG9CQUNDO0dBRUQsc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxFQUFFLEdBQU87b0JBQ1gsQ0FBRSxFQUFFLEtBQVE7b0JBQ1osQ0FBRSxJQUFHLEdBQU87b0JBQ1osQ0FBRSxJQUFHLEtBQVE7OztrQkFDYixDQUFBLFVBQWlCLGNBQ2tCO3NCQXlLeEI7c0JBQUE7V0F6S1gsU0FBTyxVQUFVO0dBQUE7O0VBRW5CLDZCQUNLLEtBQUE7O0dBQUosb0JBQ0M7R0FFRCxzQkFDTyxlQUFBOztvQkFBTixDQUFFLEVBQUUsR0FBTztvQkFDWCxDQUFFLElBQUcsR0FBTzs7O2tCQUNaLENBQUEsRUFBUyxJQUNRO3NCQStKTjtzQkFBQTtXQS9KWCxhQUFZLElBQUUsRUFBRTtHQUFBOztFQUVsQiw0QkFDTyxLQUFBOztHQUFOLG9CQUNDO0dBRUQsc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxFQUFFLEdBQU87b0JBQ1gsQ0FBRSxFQUFFLEtBQVE7b0JBQ1osQ0FBRSxJQUFHLEdBQU87b0JBQ1osQ0FBRSxJQUFHLEtBQVE7OztrQkFDYixDQUFBLFVBQWlCLGNBR2pCO3NCQWlKVztzQkFBQTtjQWhKUDtLQUFILEdBQUEsT0FBRyxVQUFVLEdBQ0M7YUFBYixJQUFHLElBQUksYUFBYyxVQUFVLFVBQVU7S0FBQSxPQUV0QzthQUFILFVBQVUsVUFBVTtLQUFBO0lBQUE7SUFMckIsYUFBWSxJQUFFLFVBQVUsS0FBSzs7OztFQU9oQyx5Q0FDVyxLQUFBOztHQUFWLG9CQUFNO0dBQ04sc0JBQ1EsZUFBQTtlQUFDLGFBQVcsRUFBRTtlQUNiLGFBQVcsRUFBRTtrQkFDYixhQUFXLEVBQUU7R0FBQTtrQkFDckIsQ0FBQSxFQUFTLElBQ1E7c0JBb0lOO3NCQUFBO1dBcElYLE9BQUcsRUFBRyxVQUFVLEVBQUU7R0FBQTs7RUFLcEIsK0JBQVEsaUJBQUEsRUFDUTtxQkE4SEg7VUEvRFgsU0EvRFE7RUFBQTtFQUVWLHNCQUNJLEtBQUE7O0dBQUgsb0JBQU07R0FDTixzQkFDTyxlQUFBOztlQUFFLFFBQU8sSUFBSSxHQUFHLE1BQU07b0JBQzVCLENBQUUsRUFBRSxHQUFPOzs7a0JBQ1gsQ0FBQSxLQUFZLElBQ1E7c0JBc0hUO3NCQUFBO1dBdEhYLElBQUcsUUFBTSxHQUFJLFFBQU07R0FBQTs7RUFFckIsc0JBQ0ksS0FBQTs7R0FBSCxvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsR0FBTztvQkFDVCxDQUFFLEtBQVE7OztrQkFDVixHQUNRO3NCQThHRztXQS9EWCxTQS9DUztHQUFBOztFQUVYLHNCQUNJLEtBQUE7O0dBQUgsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFFLEVBQUUsR0FBTzs7O2tCQUNYLENBQUEsRUFBUyxJQUNRO3NCQXVHTjtzQkFBQTtXQS9EWCxTQXhDUyxFQUFFO0dBQUE7O0VBRWIsNEJBQVMsZ0JBQUEsRUFDUTtxQkFvR0o7VUFwR1osSUFBRSxFQUFFO0VBQUE7RUFFTCwyQ0FDWSxLQUFBOztHQUFYLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsR0FBTztvQ0FFYyxJQUFBO0tBQXRCLGNBQVk7Ozs7a0JBQ2IsR0FHQTtzQkEwRlc7SUEzRkYsS0FBQSxVQUFJLEVBQUUscUJBQVUsNkNBQTJDO1dBNEJwRSxVQTNCVTtHQUFBOztFQUdaLDBCQUNNLEtBQUE7O0dBQUwsb0JBQ0M7R0FFRCxzQkFDTyxlQUFBOztvQkFBTixDQUFFLE9BQVU7b0JBQ1osQ0FBRSxLQUFTOzs7a0JBQ1gsR0FDUTtzQkErRUc7V0EvRFgsV0FoQlc7R0FBQTs7RUFFYix5Q0FDVyxLQUFBOztHQUFWLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxPQUFVO29CQUNaLENBQUUsS0FBUzs7O2tCQUNYLEdBQ1E7c0JBdUVHO1dBL0RYLFdBUlc7R0FBQTs7RUFFYixxQ0FDUyxLQUFBOztHQUFSLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxPQUFVO29CQUNaLENBQUUsS0FBUzs7O2tCQUNYLEdBQ1E7c0JBK0RHO1dBL0RYLFVBQVU7R0FBQTs7RUFFWixxREFDZ0IsS0FBQTs7R0FBZixvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsT0FBVTtvQkFDWixDQUFFLEtBQVM7OztrQkFDWCxHQUNRO3NCQXVERztXQXZEWCxTQUFPLEVBQUU7R0FBQTs7RUFHWCwrQkFDTSxLQUFBOztHQUFMLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxPQUFPLEtBQUssR0FBTztvQkFDckIsQ0FBRSxPQUFPLEtBQUssR0FBTztvQkFDckIsQ0FBRSxTQUFTLE1BQU0sR0FBTztvQkFDeEIsQ0FBRSxTQUFTLE1BQU0sR0FBTztvQkFDeEIsQ0FBRSxNQUFNLFFBQU8sR0FBTztvQkFFckIsQ0FBRSxRQUFRLEVBQUUsR0FBTztvQkFDbkIsQ0FBRSxFQUFFLFFBQVEsR0FBTzs7O2tCQUNwQixDQUFBLEVBQUUsRUFBUyxhQUNpQjtzQkF3Q2pCOzhCQXpDUyxJQUFJO2VBQ1osSUFBSSxXQUFTO1dBRXJCO0tBQUgsR0FBQSxPQUFHLEVBQUUsR0FDQzthQUFMLFlBQVEsRUFBRTtLQUFBLE9BQ1gsR0FBQSxPQUFHLEVBQUUsR0FDQzthQUFMLFlBQVEsRUFBRTtLQUFBLE9BRVA7TUFBSCxnQkFBVSxJQUFHLElBQUcsSUFBSSxHQUFJLElBQUksSUFBSTtNQUNoQyw2QkFBbUIsYUFBWSxJQUFJLEdBQUc7TUFDdEMsWUFBUSxJQUFJLEdBQUksSUFBRSxJQUFHO01BQ3JCLG9CQUFjLElBQUcsSUFBRSxFQUFFLE9BQVEsSUFBRSxFQUFFO01BQ2pDLGNBQVUsSUFBSSxHQUFJLElBQUUsSUFBRzthQUN2QixPQUFJLElBQUksZUFBYTtLQUFBO0lBQUE7R0FBQTs7RUFFekIscUNBQ1EsS0FBQTs7R0FBUCxvQkFDQztHQUVELHNCQUNPLGVBQUE7O29CQUFOLENBQUUsUUFBUSxHQUFPO29CQUNqQixDQUFFLEtBQUssR0FBTzs7O2tCQUNkLENBQUEsRUFBRSxhQUNpQjs4QkFEUixJQUFJO2VBQ0gsSUFBSSxXQUFTO0lBRXpCLFVBQU0sSUFBSSxHQUFJLElBQUUsSUFBRztXQUNuQixPQUFHLElBQUEsR0FBSztHQUFBOztFQUdWLHNCQUNJLEtBQUE7O0dBQUgsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFFLEdBQU87b0JBQ1QsQ0FBRSxHQUFPOzs7a0JBQ1QsR0FDUTtzQkFNRztXQU5YLElBQUUsSUFBRztHQUFBOztFQUVQLHNCQUNJLEtBQUE7O0dBQUgsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFFLEVBQUUsR0FBTzs7O2tCQUNYLENBQUEsRUFBUyxJQUNRO3NCQUROO3NCQUFBO1dBQ1gsSUFBRyxJQUFFLEVBQUUsR0FBRztHQUFBOztFQW5RYix3QkFBQSIsImZpbGUiOiJtYXRoL051bWJlci5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9