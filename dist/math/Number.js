"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../compare","../control","../js","../Type/Method","../Type/Pred-Type","./methods"],(exports,compare_0,control_1,js_2,Method_3,Pred_45Type_4,methods_5)=>{
	exports._get=_ms.lazy(()=>{
		const compare=_ms.getDefaultExport(compare_0),_$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_60_63=_ms.get(_$0,"<?"),_60_61_63=_ms.get(_$0,"<=?"),_62_63=_ms.get(_$0,">?"),_62_61_63=_ms.get(_$0,">=?"),_$1=_ms.getModule(control_1),opr=_ms.get(_$1,"opr"),_$2=_ms.getModule(js_2),id_61_63=_ms.get(_$2,"id=?"),js_45bar=_ms.get(_$2,"js-bar"),js_60=_ms.get(_$2,"js<"),js_60_61=_ms.get(_$2,"js<="),js_62=_ms.get(_$2,"js>"),js_62_61=_ms.get(_$2,"js>="),js_43=_ms.get(_$2,"js+"),js_45=_ms.get(_$2,"js-"),js_42=_ms.get(_$2,"js*"),js_47=_ms.get(_$2,"js/"),js_45mod=_ms.get(_$2,"js-mod"),_$3=_ms.getModule(Method_3),impl_33=_ms.get(_$3,"impl!"),Pred_45Type=_ms.getDefaultExport(Pred_45Type_4),_$4=_ms.getModule(Pred_45Type_4),Opt=_ms.get(_$4,"Opt"),_$5=_ms.getModule(methods_5),_43=_ms.get(_$5,"+"),_45=_ms.get(_$5,"-"),_42=_ms.get(_$5,"*"),_47=_ms.get(_$5,"/");
		const Int=exports.Int=new (Pred_45Type)((()=>{
			const built={};
			built[`name`]="Int";
			const predicate=built.predicate=Number.isSafeInteger;
			return built
		})());
		const Nat=exports.Nat=new (Pred_45Type)((()=>{
			const built={};
			built[`name`]="Nat";
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
		const remainder=exports.remainder=function remainder(numerator,denominator){
			_ms.checkContains(Number,numerator,"numerator");
			_ms.checkContains(Number,denominator,"denominator");
			return js_45mod(numerator,denominator)
		};
		const int_47=exports["int/"]=function int_47(a,b){
			_ms.checkContains(Number,a,"a");
			_ms.checkContains(Number,b,"b");
			return round_45down(_47(a,b))
		};
		const modulo=exports.modulo=function modulo(numerator,denominator){
			_ms.checkContains(Number,numerator,"numerator");
			_ms.checkContains(Number,denominator,"denominator");
			const res=(()=>{
				if(_60_63(numerator,0)){
					return _43(abs(denominator),remainder(numerator,denominator))
				} else {
					return remainder(numerator,denominator)
				}
			})();
			{
				divisible_63(_45(numerator,res),denominator)
			};
			return res
		};
		const divisible_63=exports["divisible?"]=function divisible_63(a,b){
			_ms.checkContains(Number,a,"a");
			_ms.checkContains(Number,b,"b");
			return _61_63(0,remainder(a,b))
		};
		const log_45e=exports["log-e"]=function log_45e(_){
			_ms.checkContains(Number,_,"_");
			return Math.log(_)
		};
		const log=exports.log=function log(base,n){
			_ms.checkContains(Number,base,"base");
			_ms.checkContains(Number,n,"n");
			return _47(log_45e(n),log_45e(base))
		};
		const abs=exports.abs=function abs(a){
			_ms.checkContains(Number,a,"a");
			return Math.abs(a)
		};
		const pow=exports.pow=function pow(a,b){
			_ms.checkContains(Number,a,"a");
			_ms.checkContains(Number,b,"b");
			return Math.pow(a,b)
		};
		const square=exports.square=function square(_){
			_ms.checkContains(Number,_,"_");
			return _42(_,_)
		};
		const square_45root=exports["square-root"]=function square_45root(_){
			_ms.checkContains(Number,_,"_");
			{
				if(! _60_61_63(0,_))throw new (Error)(`Can't take square root of negative number ${_}.`)
			};
			return Math.sqrt(_)
		};
		const round=exports.round=function round(_){
			_ms.checkContains(Number,_,"_");
			return Math.round(_)
		};
		const round_45down=exports["round-down"]=function round_45down(_){
			_ms.checkContains(Number,_,"_");
			return Math.floor(_)
		};
		const round_45up=exports["round-up"]=function round_45up(_){
			_ms.checkContains(Number,_,"_");
			return Math.ceil(_)
		};
		const round_45towards_450=exports["round-towards-0"]=function round_45towards_450(_){
			_ms.checkContains(Number,_,"_");
			return js_45bar(_,0)
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
					const avg_45mag=_47(_43(abs(a),abs(b)),2);
					const n_45digits_45avg_45mag=round_45down(log(10,avg_45mag));
					const scale=pow(10,_42(- 1,n_45digits_45avg_45mag));
					const scaled_45diff=_45(_42(a,scale),_42(b,scale));
					const epsilon=pow(10,_42(- 1,sig_45figs));
					return _60_63(abs(scaled_45diff),epsilon)
				}
			})()
		};
		const near_450_63=exports["near-0?"]=function near_450_63(_,sig_45figs){
			_ms.checkContains(_ms.sub(Opt,Nat),sig_45figs,"sig-figs");
			sig_45figs=opr(sig_45figs,6);
			const max=pow(10,_42(- 1,sig_45figs));
			return _60_63(abs(_),max)
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
		const name=exports.name=`Number`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvbWF0aC9OdW1iZXIubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFRQSxzQkFBSyxLQUFJLGFBQ1MsS0FBQTs7U0FHakIsUUFBQTtHQUNBLGdDQW9KaUI7OztFQWxKbEIsc0JBQUssS0FBSSxhQUNTLEtBQUE7O1NBQ2pCLFFBQUE7R0FDQSxnQ0FBWSxtQkFBQSxFQUNDO1dBQVosY0FBSyxJQUFELElBQU0sVUFBSSxFQUFFO0dBQUE7OztFQUlqQixRQUFNLFFBMElXLE9BMUlNLFNBQUEsTUFDWTtTQWtCOUI7cUJBdUhZO1VBekloQixJQWtCSSxNQWxCRztFQUFBO0VBQ1IsUUFBTSxPQXdJVyxPQXhJQyxTQUFBLE1BQ0s7U0FnQmxCO1VBaEJKLFNBZ0JJLE1BaEJNO0VBQUE7RUFDWCxRQUFNLE9Bc0lXLE9BdElDLFNBQUEsTUFDWTtTQWN6QjtxQkF1SFk7VUFySWhCLE1BY0ksTUFkSztFQUFBO0VBQ1YsUUFBTSxVQW9JVyxPQXBJRSxTQUFBLE1BQ1k7U0FZMUI7cUJBdUhZO1VBbkloQixTQVlJLE1BWk07RUFBQTtFQUNYLFFBQU0sT0FrSVcsT0FsSUMsU0FBQSxNQUNZO1NBVXpCO3FCQXVIWTtVQWpJaEIsTUFVSSxNQVZLO0VBQUE7RUFDVixRQUFNLFVBZ0lXLE9BaElFLFNBQUEsTUFDWTtTQVExQjtxQkF1SFk7VUEvSGhCLFNBUUksTUFSTTtFQUFBO0VBQ1gsUUFBTSxJQThIVyxPQTlIQSxTQUFBLE1BQ1k7U0FNeEI7cUJBdUhZO1VBN0hoQixNQU1JLE1BTks7RUFBQTtFQUNWLFFBQU0sSUE0SFcsT0E1SEEsU0FBQSxNQUNZO1NBSXhCO3FCQXVIWTtVQTNIaEIsTUFJSSxNQUpLO0VBQUE7RUFDVixRQUFNLElBMEhXLE9BMUhBLFNBQUEsTUFDWTtTQUV4QjtxQkF1SFk7VUF6SGhCLE1BRUksTUFGSztFQUFBO0VBQ1YsUUFBTSxJQXdIVyxPQXhIQSxTQUFBLE1BQ1k7U0FBeEI7cUJBdUhZO1VB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
