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
			const predicate=built.predicate=_=>(_ms.contains(Int,_)&&_62_61_63(_,0));
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
		const remainder=exports.remainder=function remainder(numerator,denominator){
			_ms.checkContains(Number,numerator,"numerator");
			_ms.checkContains(Number,denominator,"denominator");
			return js_45mod(numerator,denominator)
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
		const int_47=exports["int/"]=function int_47(a,b){
			_ms.checkContains(Number,a,"a");
			_ms.checkContains(Number,b,"b");
			return Math.floor(_47(a,b))
		};
		const divisible_63=exports["divisible?"]=function divisible_63(a,b){
			_ms.checkContains(Number,a,"a");
			_ms.checkContains(Number,b,"b");
			return _61_63(0,remainder(a,b))
		};
		const log_45base=exports["log-base"]=function log_45base(base,n){
			_ms.checkContains(Number,base,"base");
			_ms.checkContains(Number,n,"n");
			return _47(Math.log(n),Math.log(base))
		};
		const square=exports.square=function square(_){
			_ms.checkContains(Number,_,"_");
			return _42(_,_)
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
					const n_45digits_45avg_45mag=Math.floor(Math.log10(avg_45mag));
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
		const mid=exports.mid=function mid(a,b){
			_ms.checkContains(Number,a,"a");
			_ms.checkContains(Number,b,"b");
			return _47(_43(a,b),2)
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvbWF0aC9OdW1iZXIubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFRQSxzQkFBSyxLQUFJLGFBQ1MsS0FBQTs7Y0FHakI7R0FDQSxnQ0FBVzs7O0VBRVosc0JBQUssS0FBSSxhQUNTLEtBQUE7O2NBQ2pCO0dBQ0EsbUNBQWEsY0FBSyxJQUFELElBQU0sVUFBSSxFQUFFOzs7RUFJN0IsUUFBTSxRQUFRLE9BQVMsU0FBQTtTQW1CbEI7cUJBbkJ3QjtVQUM1QixJQWtCSSxNQWxCRztFQUFBO0VBQ1IsUUFBTSxPQUFHLE9BQVMsU0FBQTtTQWlCYjtVQWhCSixTQWdCSSxNQWhCTTtFQUFBO0VBQ1gsUUFBTSxPQUFHLE9BQVMsU0FBQTtTQWViO3FCQWZtQjtVQUN2QixNQWNJLE1BZEs7RUFBQTtFQUNWLFFBQU0sVUFBSSxPQUFTLFNBQUE7U0FhZDtxQkFib0I7VUFDeEIsU0FZSSxNQVpNO0VBQUE7RUFDWCxRQUFNLE9BQUcsT0FBUyxTQUFBO1NBV2I7cUJBWG1CO1VBQ3ZCLE1BVUksTUFWSztFQUFBO0VBQ1YsUUFBTSxVQUFJLE9BQVMsU0FBQTtTQVNkO3FCQVRvQjtVQUN4QixTQVFJLE1BUk07RUFBQTtFQUNYLFFBQU0sSUFBRSxPQUFTLFNBQUE7U0FPWjtxQkFQa0I7VUFDdEIsTUFNSSxNQU5LO0VBQUE7RUFDVixRQUFNLElBQUUsT0FBUyxTQUFBO1NBS1o7cUJBTGtCO1VBQ3RCLE1BSUksTUFKSztFQUFBO0VBQ1YsUUFBTSxJQUFFLE9BQVMsU0FBQTtTQUdaO3FCQUhrQjtVQUN0QixNQUVJLE1BRks7RUFBQTtFQUNWLFFBQU0sSUFBRSxPQUFTLFNBQUE7U0FDWjtxQkFEa0I7VUFDdEIsTUFBSSxNQUFLO0VBQUE7RUFHVixrQ0FBWSxtQkFBQSxVQUFpQjtxQkFBUDtxQkFBbUI7VUFHeEMsU0FBTyxVQUFVO0VBQUE7RUFFbEIsNEJBQVMsZ0JBQUEsVUFBaUI7cUJBQVA7cUJBQW1CO1VBSWpDO0lBQUgsR0FBQSxPQUFHLFVBQVUsR0FDQztZQUFiLElBQUcsU0FBUyxhQUFjLFVBQVUsVUFBVTtJQUFBLE9BRTNDO1lBQUgsVUFBVSxVQUFVO0lBQUE7R0FBQTtFQUFBO0VBRXZCLDZCQUFPLGdCQUFBLEVBQVM7cUJBQVA7cUJBQVM7VUFHakIsV0FBWSxJQUFFLEVBQUU7RUFBQTtFQUVqQix5Q0FBYSxzQkFBQSxFQUFTO3FCQUFQO3FCQUFTO1VBRXZCLE9BQUcsRUFBRyxVQUFVLEVBQUU7RUFBQTtFQUduQixxQ0FBVyxvQkFBQSxLQUFZO3FCQUFQO3FCQUFTO1VBRXhCLElBQUcsU0FBUyxHQUFJLFNBQVM7RUFBQTtFQUUxQiw0QkFBUyxnQkFBQTtxQkFBRTtVQUNWLElBQUUsRUFBRTtFQUFBO0VBR0wsK0JBQVEsaUJBQUEsRUFBRSxFQUFTO3FCQUFQOzZCQUFnQixJQUFJO2NBRW5CLElBQUksV0FBUztVQUVyQjtJQUFILEdBQUEsT0FBRyxFQUFFLEdBQ0M7WUFBTCxZQUFRLEVBQUU7SUFBQSxPQUNYLEdBQUEsT0FBRyxFQUFFLEdBQ0M7WUFBTCxZQUFRLEVBQUU7SUFBQSxPQUVQO0tBQUgsZ0JBQVUsSUFBRyxJQUFHLFNBQVMsR0FBSSxTQUFTLElBQUk7S0FDMUMsNkJBQW1CLFdBQVksV0FBVztLQUMxQyxZQUFRLFNBQVMsR0FBSSxJQUFFLElBQUc7S0FDMUIsb0JBQWMsSUFBRyxJQUFFLEVBQUUsT0FBUSxJQUFFLEVBQUU7S0FDakMsY0FBVSxTQUFTLEdBQUksSUFBRSxJQUFHO1lBQzVCLE9BQUksU0FBUyxlQUFhO0lBQUE7R0FBQTtFQUFBO0VBRTdCLHFDQUFVLHFCQUFBLEVBQUU7NkJBQVMsSUFBSTtjQUdaLElBQUksV0FBUztHQUV6QixVQUFNLFNBQVMsR0FBSSxJQUFFLElBQUc7VUFDeEIsT0FBRyxTQUFLLEdBQUs7RUFBQTtFQUdkLHNCQUFNLGFBQUEsRUFBUztxQkFBUDtxQkFBUztVQUVoQixJQUFHLElBQUUsRUFBRSxHQUFHO0VBQUEiLCJmaWxlIjoibWF0aC9OdW1iZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
