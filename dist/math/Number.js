"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../compare","../control","../js","../Type/Method","../Type/Pred-Type","./methods","../Function","../Try"],(exports,compare_0,control_1,js_2,Method_3,Pred_45Type_4,methods_5,Function_6,Try_7)=>{
	exports._get=_ms.lazy(()=>{
		const compare=_ms.getDefaultExport(compare_0),_$2=_ms.getModule(compare_0),_61_63=_ms.get(_$2,"=?"),_60_63=_ms.get(_$2,"<?"),_60_61_63=_ms.get(_$2,"<=?"),_$3=_ms.getModule(control_1),opr=_ms.get(_$3,"opr"),_$4=_ms.getModule(js_2),id_61_63=_ms.get(_$4,"id=?"),js_45bar=_ms.get(_$4,"js-bar"),js_60=_ms.get(_$4,"js<"),js_60_61=_ms.get(_$4,"js<="),js_43=_ms.get(_$4,"js+"),js_45=_ms.get(_$4,"js-"),js_42=_ms.get(_$4,"js*"),js_47=_ms.get(_$4,"js/"),js_45mod=_ms.get(_$4,"js-mod"),_$5=_ms.getModule(Method_3),impl_33=_ms.get(_$5,"impl!"),Pred_45Type=_ms.getDefaultExport(Pred_45Type_4),_$6=_ms.getModule(Pred_45Type_4),Opt=_ms.get(_$6,"Opt"),_$7=_ms.getModule(methods_5),_43=_ms.get(_$7,"+"),_45=_ms.get(_$7,"-"),_42=_ms.get(_$7,"*"),_47=_ms.get(_$7,"/"),_$9=_ms.lazyGetModule(Function_6),spread_33=_ms.lazyProp(_$9,"spread!"),_$10=_ms.lazyGetModule(Try_7),fails_63=_ms.lazyProp(_$10,"fails?");
		const Int=exports.Int=new (Pred_45Type)((()=>{
			const built={};
			const doc=built.doc=`A multiple of 1.\nThis only contains Numbers for which integer methods return sensible results, AKA safe ints.\nThis is anything between Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER.`;
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
		const name=exports.name=`Number`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvbWF0aC9OdW1iZXIubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFXQSxzQkFBSyxLQUFJLGFBQ1MsS0FBQTs7R0FBakIsb0JBQ0M7R0FHRCxzQkFDUSxlQUFBO0lBQVAsc0JBQWdCLHlCQUFBLEVBQ0M7NkJBQU4sSUFBRjtJQUFBO0lBQ1Qsc0JBQWdCLHlCQUFBLEVBQ0M7Z0NBQU4sSUFBRjtJQUFBOzBCQUNELGdCQUNXLEtBQUE7O21CQUFoQjttQkFDQTttQkFDQTs7OzBCQUNLLGdCQUNXLEtBQUE7O21CQUFoQjttQkFDQSxJQUFFLHdCQUF3QjttQkFDMUIsSUFBRSx3QkFBd0I7Ozs7R0FDOUIsZ0NBQVc7OztFQUVaLHNCQUFLLEtBQUksYUFDUyxLQUFBOztHQUFqQixvQkFBTTtHQUNOLHNCQUNRLGVBQUE7NEJBQUcsSUFBRjsrQkFDRyxJQUFIOztHQUNULGdDQUFZLG1CQUFBLEVBQ0M7V0FBWixjQUFLLElBQUQsSUFBTSxVQUFJLEVBQUU7R0FBQTs7O0VBSWpCLFFBQU0sUUFBUSxPQUFTLFNBQUEsTUFDWTtTQWlCOUI7cUJBbEJ3QjtVQUM1QixJQWlCSSxNQWpCRztFQUFBO0VBQ1IsUUFBTSxPQUFHLE9BQ00sS0FBQTs7R0FBZCxzQkFDTyxlQUFBOztvQkFBTixDQUFFLFdBQVcsWUFBZ0I7OztrQkFDNUIsU0FBQSxNQUNLO1VBWUg7V0FaSCxTQVlHLE1BWk87R0FBQTs7RUFDWixRQUFNLE9BQUcsT0FBUyxTQUFBLE1BQ1k7U0FVekI7cUJBWG1CO1VBQ3ZCLE1BVUksTUFWSztFQUFBO0VBQ1YsUUFBTSxVQUFJLE9BQVMsU0FBQSxNQUNZO1NBUTFCO3FCQVRvQjtVQUN4QixTQVFJLE1BUk07RUFBQTtFQUNYLFFBQU0sSUFBRSxPQUFTLFNBQUEsTUFDWTtTQU14QjtxQkFQa0I7VUFDdEIsTUFNSSxNQU5LO0VBQUE7RUFDVixRQUFNLElBQUUsT0FBUyxTQUFBLE1BQ1k7U0FJeEI7cUJBTGtCO1VB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STtNQUNoQyw2QkFBbUIsYUFBWSxJQUFJLEdBQUc7TUFDdEMsWUFBUSxJQUFJLEdBQUksSUFBRSxJQUFHO01BQ3JCLG9CQUFjLElBQUcsSUFBRSxFQUFFLE9BQVEsSUFBRSxFQUFFO01BQ2pDLGNBQVUsSUFBSSxHQUFJLElBQUUsSUFBRzthQUN2QixPQUFJLElBQUksZUFBYTtLQUFBO0lBQUE7R0FBQTs7RUFFekIscUNBQ1EsS0FBQTs7R0FBUCxvQkFDQztHQUVELHNCQUNPLGVBQUE7O29CQUFOLENBQUUsUUFBUSxHQUFPO29CQUNqQixDQUFFLEtBQUssR0FBTzs7O2tCQUNkLHFCQUFBLEVBQUUsV0FDaUI7OEJBRFIsSUFBSTtlQUNILElBQUksV0FBUztJQUV6QixVQUFNLElBQUksR0FBSSxJQUFFLElBQUc7V0FDbkIsT0FBRyxJQUFBLEdBQUs7R0FBQTs7RUFHVix3QkFDSyxLQUFBOztHQUFKLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxHQUFPOzs7a0JBQ1QsY0FBQSxFQUNRO3NCQUROO1dBQ0YsSUFBRSxFQUFFO0dBQUE7O0VBRU4sd0JBQ0ssS0FBQTs7R0FBSixvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsR0FBTzs7O2tCQUNULGNBQUEsRUFDUTtzQkFETjtXQUNGLElBQUUsRUFBRTtHQUFBOztFQUVOLHdCQUNLLEtBQUE7O0dBQUosb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFFLEdBQU87OztrQkFDVCxjQUFBLEVBQ1E7c0JBRE47V0FDRixJQUFFLEVBQUU7R0FBQTs7RUFFTiwwQkFDTSxLQUFBOztHQUFMLG9CQUFNO0dBQ04sc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSxLQUFTOzs7a0JBQ1gsZUFBQSxFQUNRO3NCQUROO1dBQ0YsSUFBRSxFQUFFO0dBQUE7O0VBRU4sc0JBQ0ksS0FBQTs7R0FBSCxvQkFBTTtHQUNOLHNCQUNPLGVBQUE7O29CQUFOLENBQUUsR0FBTztvQkFDVCxDQUFFLEdBQU87OztrQkFDVCxhQUFBLEVBQ1E7c0JBRE47V0FDRixJQUFFLEVBQUU7OztFQUVOLHNCQUNJLEtBQUE7O0dBQUgsb0JBQU07R0FDTixzQkFDTyxlQUFBOztvQkFBTixDQUFFLEVBQUUsR0FBTzs7O2tCQUNYLGFBQUEsRUFBUyxFQUNRO3NCQURmO3NCQUFTO1dBQ1gsS0FBTSxJQUFFLEVBQUU7R0FBQTs7RUE3UmIsd0JBQUEiLCJmaWxlIjoibWF0aC9OdW1iZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==