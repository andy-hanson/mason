"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../compare","./../control","./../js","./../Type/Method","./../Type/Pred-Type","./methods"],(exports,compare_0,control_1,js_2,Method_3,Pred_45Type_4,methods_5)=>{
	exports._get=_ms.lazy(()=>{
		const compare=_ms.getDefaultExport(compare_0),_$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_60_63=_ms.get(_$0,"<?"),_60_61_63=_ms.get(_$0,"<=?"),_62_63=_ms.get(_$0,">?"),_62_61_63=_ms.get(_$0,">=?"),_$1=_ms.getModule(control_1),opr=_ms.get(_$1,"opr"),_$2=_ms.getModule(js_2),id_61_63=_ms.get(_$2,"id=?"),js_60=_ms.get(_$2,"js<"),js_60_61=_ms.get(_$2,"js<="),js_62=_ms.get(_$2,"js>"),js_62_61=_ms.get(_$2,"js>="),js_43=_ms.get(_$2,"js+"),js_45=_ms.get(_$2,"js-"),js_42=_ms.get(_$2,"js*"),js_47=_ms.get(_$2,"js/"),js_45mod=_ms.get(_$2,"js-mod"),_$3=_ms.getModule(Method_3),impl_33=_ms.get(_$3,"impl!"),Pred_45Type=_ms.getDefaultExport(Pred_45Type_4),_$4=_ms.getModule(Pred_45Type_4),Opt=_ms.get(_$4,"Opt"),_$5=_ms.getModule(methods_5),_43=_ms.get(_$5,"+"),_45=_ms.get(_$5,"-"),_42=_ms.get(_$5,"*"),_47=_ms.get(_$5,"/");
		const Int=exports.Int=new (Pred_45Type)((()=>{
			const built={};
			built.name="Int";
			const predicate=built.predicate=Number.isSafeInteger;
			return built
		})());
		const Nat=exports.Nat=new (Pred_45Type)((()=>{
			const built={};
			built.name="Nat";
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
		impl_33(_61_63,Number,function(other){
			const _this=this;
			return id_61_63(_this,other)
		});
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
		impl_33(_62_63,Number,function(other){
			const _this=this;
			_ms.checkContains(Number,other,"other");
			return js_62(_this,other)
		});
		impl_33(_62_61_63,Number,function(other){
			const _this=this;
			_ms.checkContains(Number,other,"other");
			return js_62_61(_this,other)
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
		const sign=exports.sign=function sign(_){
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
		};
		const same_45sign_63=exports["same-sign?"]=function same_45sign_63(a,b){
			_ms.checkContains(Number,a,"a");
			_ms.checkContains(Number,b,"b");
			return _60_61_63(0,_42(a,b))
		};
		const remainder=exports.remainder=function remainder(numerator,denominator){
			_ms.checkContains(Number,numerator,"numerator");
			_ms.checkContains(Number,denominator,"denominator");
			return js_45mod(numerator,denominator)
		};
		const int_47=exports["int/"]=function int_47(a,b){
			_ms.checkContains(Number,a,"a");
			_ms.checkContains(Number,b,"b");
			return Math.floor(_47(a,b))
		};
		const modulo=exports.modulo=function modulo(numerator,denominator){
			_ms.checkContains(Number,numerator,"numerator");
			_ms.checkContains(Number,denominator,"denominator");
			return (()=>{
				if(_60_63(numerator,0)){
					return _43(Math.abs(denominator),remainder(numerator,denominator))
				} else {
					return remainder(numerator,denominator)
				}
			})()
		};
		const divisible_63=exports["divisible?"]=function divisible_63(a,b){
			_ms.checkContains(Number,a,"a");
			_ms.checkContains(Number,b,"b");
			return _61_63(0,remainder(a,b))
		};
		const log=exports.log=function log(base,n){
			_ms.checkContains(Number,base,"base");
			_ms.checkContains(Number,n,"n");
			return _47(Math.log(n),Math.log(base))
		};
		const square=exports.square=function square(_){
			_ms.checkContains(Number,_,"_");
			return _42(_,_)
		};
		const square_45root=exports["square-root"]=function square_45root(_){
			_ms.checkContains(Number,_,"_");
			if(! _60_61_63(0,_))throw new (Error)(`Can't take square root of negative number ${_}.`);
			return Math.sqrt(_)
		};
		const near_63=exports["near?"]=function near_63(a,b,sig_45figs){
			_ms.checkContains(Number,b,"b");
			_ms.checkContains(_ms.sub(Opt,Nat),sig_45figs,"sig-figs");
			sig_45figs=opr(sig_45figs,6);
			return (()=>{
				if(_61_63(a,0)){
					return near_450_63(b,sig_45figs)
				} else if(_61_63(b,0)){
					return near_450_63(a,sig_45figs)
				} else {
					const avg_45mag=_47(_43(Math.abs(a),Math.abs(b)),2);
					const n_45digits_45avg_45mag=Math.floor(log(10,avg_45mag));
					const scale=Math.pow(10,_42(- 1,n_45digits_45avg_45mag));
					const scaled_45diff=_45(_42(a,scale),_42(b,scale));
					const epsilon=Math.pow(10,_42(- 1,sig_45figs));
					return _60_63(Math.abs(scaled_45diff),epsilon)
				}
			})()
		};
		const near_450_63=exports["near-0?"]=function near_450_63(_,sig_45figs){
			_ms.checkContains(_ms.sub(Opt,Nat),sig_45figs,"sig-figs");
			sig_45figs=opr(sig_45figs,6);
			const max=Math.pow(10,_42(- 1,sig_45figs));
			return _60_63(Math.abs(_),max)
		};
		const neg=exports.neg=function neg(_){
			_ms.checkContains(Number,_,"_");
			return _42(- 1,_)
		};
		const mid=exports.mid=function mid(a,b){
			_ms.checkContains(Number,a,"a");
			_ms.checkContains(Number,b,"b");
			return _47(_43(a,b),2)
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvbWF0aC9OdW1iZXIubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFRQSxzQkFBSyxLQUFJLGFBQ1MsS0FBQTs7Y0FHakI7R0FDQSxnQ0FBVzs7O0VBRVosc0JBQUssS0FBSSxhQUNTLEtBQUE7O2NBQ2pCO0dBQ0EsZ0NBQVksbUJBQUE7V0FDWCxjQUFLLElBQUQsSUFBTSxVQUFJLEVBQUU7R0FBQTs7O0VBSWpCLFFBQU0sUUFBUSxPQUFTLFNBQUE7U0FtQmxCO3FCQW5Cd0I7VUFDNUIsSUFrQkksTUFsQkc7RUFBQTtFQUNSLFFBQU0sT0FBRyxPQUFTLFNBQUE7U0FpQmI7VUFoQkosU0FnQkksTUFoQk07RUFBQTtFQUNYLFFBQU0sT0FBRyxPQUFTLFNBQUE7U0FlYjtxQkFmbUI7VUFDdkIsTUFjSSxNQWRLO0VBQUE7RUFDVixRQUFNLFVBQUksT0FBUyxTQUFBO1NBYWQ7cUJBYm9CO1VBQ3hCLFNBWUksTUFaTTtFQUFBO0VBQ1gsUUFBTSxPQUFHLE9BQVMsU0FBQTtTQVdiO3FCQVhtQjtVQUN2QixNQVVJLE1BVks7RUFBQTtFQUNWLFFBQU0sVUFBSSxPQUFTLFNBQUE7U0FTZDtxQkFUb0I7VUFDeEIsU0FRSSxNQVJNO0VBQUE7RUFDWCxRQUFNLElBQUUsT0FBUyxTQUFBO1NBT1o7cUJBUGtCO1VBQ3RCLE1BTUksTUFOSztFQUFBO0VBQ1YsUUFBTSxJQUFFLE9BQVMsU0FBQTtTQUtaO3FCQUxrQjtVQUN0QixNQUlJLE1BSks7RUFBQTtFQUNWLFFBQU0sSUFBRSxPQUFTLFNBQUE7U0FHWjtxQkFIa0I7VUFDdEIsTUFFSSxNQUZLO0VBQUE7RUFDVixRQUFNLElBQUUsT0FBUyxTQUFBO1NBQ1o7cUJBRGtCO1VBQ3RCLE1BQUksTUFBSztFQUFBO0VBR1Ysd0JBQU8sY0FBQTtxQkFBRTtVQUVKO0lBQUgsR0FBQSxPQUFHLEVBQUUsR0FDQztZQUFMO0lBQUEsT0FDRCxHQUFBLE9BQUcsRUFBRSxHQUNDO1lBQUw7V0FFRztZQUFIO0lBQUE7R0FBQTtFQUFBO0VBRUgsMkNBQWEsd0JBQUEsRUFBUztxQkFBUDtxQkFBUztVQUN2QixVQUFJLEVBQUcsSUFBRSxFQUFFO0VBQUE7RUFHWixrQ0FBWSxtQkFBQSxVQUFpQjtxQkFBUDtxQkFBbUI7VUFHeEMsU0FBTyxVQUFVO0VBQUE7RUFFbEIsNkJBQU8sZ0JBQUEsRUFBUztxQkFBUDtxQkFBUztVQUdqQixXQUFZLElBQUUsRUFBRTtFQUFBO0VBRWpCLDRCQUFTLGdCQUFBLFVBQWlCO3FCQUFQO3FCQUFtQjtVQUlqQztJQUFILEdBQUEsT0FBRyxVQUFVLEdBQ0M7WUFBYixJQUFHLFNBQVMsYUFBYyxVQUFVLFVBQVU7SUFBQSxPQUUzQztZQUFILFVBQVUsVUFBVTtJQUFBO0dBQUE7RUFBQTtFQUV2Qix5Q0FBYSxzQkFBQSxFQUFTO3FCQUFQO3FCQUFTO1VBRXZCLE9BQUcsRUFBRyxVQUFVLEVBQUU7RUFBQTtFQUtuQixzQkFBTSxhQUFBLEtBQVk7cUJBQVA7cUJBQVM7VUFFbkIsSUFBRyxTQUFTLEdBQUksU0FBUztFQUFBO0VBRTFCLDRCQUFTLGdCQUFBO3FCQUFFO1VBQ1YsSUFBRSxFQUFFO0VBQUE7RUFFTCwyQ0FBYyx1QkFBQTtxQkFBRTtHQUVSLEtBQUEsVUFBSSxFQUFFLHFCQUFTLDZDQUEyQztVQUNqRSxVQUFVO0VBQUE7RUFHWCwrQkFBUSxpQkFBQSxFQUFFLEVBQVM7cUJBQVA7NkJBQWdCLElBQUk7Y0FFbkIsSUFBSSxXQUFTO1VBRXJCO0lBQUgsR0FBQSxPQUFHLEVBQUUsR0FDQztZQUFMLFlBQVEsRUFBRTtJQUFBLE9BQ1gsR0FBQSxPQUFHLEVBQUUsR0FDQztZQUFMLFlBQVEsRUFBRTtJQUFBLE9BRVA7S0FBSCxnQkFBVSxJQUFHLElBQUcsU0FBUyxHQUFJLFNBQVMsSUFBSTtLQUMxQyw2QkFBbUIsV0FBWSxJQUFJLEdBQUc7S0FDdEMsWUFBUSxTQUFTLEdBQUksSUFBRSxJQUFHO0tBQzFCLG9CQUFjLElBQUcsSUFBRSxFQUFFLE9BQVEsSUFBRSxFQUFFO0tBQ2pDLGNBQVUsU0FBUyxHQUFJLElBQUUsSUFBRztZQUM1QixPQUFJLFNBQVMsZUFBYTtJQUFBO0dBQUE7RUFBQTtFQUU3QixxQ0FBVSxxQkFBQSxFQUFFOzZCQUFTLElBQUk7Y0FHWixJQUFJLFdBQVM7R0FFekIsVUFBTSxTQUFTLEdBQUksSUFBRSxJQUFHO1VBQ3hCLE9BQUcsU0FBSyxHQUFLO0VBQUE7RUFHZCxzQkFBTSxhQUFBO3FCQUFFO1VBRVAsSUFBRSxJQUFHO0VBQUE7RUFFTixzQkFBTSxhQUFBLEVBQVM7cUJBQVA7cUJBQVM7VUFFaEIsSUFBRyxJQUFFLEVBQUUsR0FBRztFQUFBIiwiZmlsZSI6Im1hdGgvTnVtYmVyLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=
