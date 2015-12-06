"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","./../compare","./../control","./../js","./../Type/Method","./../Type/Pred-Type","./../Type/primitive","./methods"],(exports,compare_0,control_1,js_2,Method_3,Pred_45Type_4,primitive_5,methods_6)=>{
	exports._get=_ms.lazy(()=>{
		let compare=_ms.getDefaultExport(compare_0),_$0=_ms.getModule(compare_0),_61_63=_ms.get(_$0,"=?"),_60_63=_ms.get(_$0,"<?"),_60_61_63=_ms.get(_$0,"<=?"),_62_63=_ms.get(_$0,">?"),_62_61_63=_ms.get(_$0,">=?"),_$1=_ms.getModule(control_1),opr=_ms.get(_$1,"opr"),_$2=_ms.getModule(js_2),id_61_63=_ms.get(_$2,"id=?"),js_60=_ms.get(_$2,"js<"),js_60_61=_ms.get(_$2,"js<="),js_62=_ms.get(_$2,"js>"),js_62_61=_ms.get(_$2,"js>="),js_43=_ms.get(_$2,"js+"),js_45=_ms.get(_$2,"js-"),js_42=_ms.get(_$2,"js*"),js_47=_ms.get(_$2,"js/"),js_45mod=_ms.get(_$2,"js-mod"),_$3=_ms.getModule(Method_3),impl_33=_ms.get(_$3,"impl!"),Pred_45Type=_ms.getDefaultExport(Pred_45Type_4),_$4=_ms.getModule(Pred_45Type_4),Opt=_ms.get(_$4,"Opt"),_$5=_ms.getModule(primitive_5),Num=_ms.get(_$5,"Num"),_$6=_ms.getModule(methods_6),_43=_ms.get(_$6,"+"),_45=_ms.get(_$6,"-"),_42=_ms.get(_$6,"*"),_47=_ms.get(_$6,"/");
		let Int=exports.Int=new (Pred_45Type)((()=>{
			let built={};
			built.name="Int";
			let predicate=built.predicate=Number.isSafeInteger;
			return built
		})());
		let Nat=exports.Nat=new (Pred_45Type)((()=>{
			let built={};
			built.name="Nat";
			let predicate=built.predicate=_=>(_ms.hasInstance(Int,_)&&_62_61_63(_,0));
			return built
		})());
		impl_33(compare,Number,function(other){
			let _this=this;
			_ms.checkInstance(Num,other,"other");
			return _45(_this,other)
		});
		impl_33(_61_63,Number,function(other){
			let _this=this;
			return id_61_63(_this,other)
		});
		impl_33(_60_63,Number,function(other){
			let _this=this;
			_ms.checkInstance(Num,other,"other");
			return js_60(_this,other)
		});
		impl_33(_60_61_63,Number,function(other){
			let _this=this;
			_ms.checkInstance(Num,other,"other");
			return js_60_61(_this,other)
		});
		impl_33(_62_63,Number,function(other){
			let _this=this;
			_ms.checkInstance(Num,other,"other");
			return js_62(_this,other)
		});
		impl_33(_62_61_63,Number,function(other){
			let _this=this;
			_ms.checkInstance(Num,other,"other");
			return js_62_61(_this,other)
		});
		impl_33(_43,Number,function(other){
			let _this=this;
			_ms.checkInstance(Num,other,"other");
			return js_43(_this,other)
		});
		impl_33(_45,Number,function(other){
			let _this=this;
			_ms.checkInstance(Num,other,"other");
			return js_45(_this,other)
		});
		impl_33(_42,Number,function(other){
			let _this=this;
			_ms.checkInstance(Num,other,"other");
			return js_42(_this,other)
		});
		impl_33(_47,Number,function(other){
			let _this=this;
			_ms.checkInstance(Num,other,"other");
			return js_47(_this,other)
		});
		let remainder=exports.remainder=function remainder(numerator,denominator){
			_ms.checkInstance(Num,numerator,"numerator");
			_ms.checkInstance(Num,denominator,"denominator");
			return js_45mod(numerator,denominator)
		};
		let modulo=exports.modulo=function modulo(numerator,denominator){
			_ms.checkInstance(Num,numerator,"numerator");
			_ms.checkInstance(Num,denominator,"denominator");
			return (()=>{
				if(_60_63(numerator,0)){
					return _43(Math.abs(denominator),remainder(numerator,denominator))
				} else {
					return remainder(numerator,denominator)
				}
			})()
		};
		let int_47=exports["int/"]=function int_47(a,b){
			_ms.checkInstance(Num,a,"a");
			_ms.checkInstance(Num,b,"b");
			return Math.floor(_47(a,b))
		};
		let divisible_63=exports["divisible?"]=function divisible_63(a,b){
			_ms.checkInstance(Num,a,"a");
			_ms.checkInstance(Num,b,"b");
			return _61_63(0,remainder(a,b))
		};
		let log_45base=exports["log-base"]=function log_45base(base,n){
			_ms.checkInstance(Num,base,"base");
			_ms.checkInstance(Num,n,"n");
			return _47(Math.log(n),Math.log(base))
		};
		let square=exports.square=function square(_){
			_ms.checkInstance(Num,_,"_");
			return _42(_,_)
		};
		let nearest_45ceil=exports["nearest-ceil"]=function nearest_45ceil(_,step){
			_ms.checkInstance(Num,_,"_");
			_ms.checkInstance(Num,step,"step");
			return _42(step,Math.ceil(_47(_,step)))
		};
		let nearest_45floor=exports["nearest-floor"]=function nearest_45floor(_,step){
			_ms.checkInstance(Num,_,"_");
			_ms.checkInstance(Num,step,"step");
			return _42(step,Math.floor(_47(_,step)))
		};
		let nearest_45round=exports["nearest-round"]=function nearest_45round(_,step){
			_ms.checkInstance(Num,_,"_");
			_ms.checkInstance(Num,step,"step");
			return _42(step,Math.round(_47(_,step)))
		};
		let near_63=exports["near?"]=function near_63(a,b,sig_45figs){
			_ms.checkInstance(Num,b,"b");
			_ms.checkInstance(_ms.sub(Opt,Nat),sig_45figs,"sig-figs");
			sig_45figs=opr(sig_45figs,6);
			return (()=>{
				if(_61_63(a,0)){
					return near_450_63(b,sig_45figs)
				} else if(_61_63(b,0)){
					return near_450_63(a,sig_45figs)
				} else {
					let avg_45mag=_47(_43(Math.abs(a),Math.abs(b)),2);
					let n_45digits_45avg_45mag=Math.floor(Math.log10(avg_45mag));
					let scale=Math.pow(10,_42(- 1,n_45digits_45avg_45mag));
					let scaled_45diff=_45(_42(a,scale),_42(b,scale));
					let epsilon=Math.pow(10,_42(- 1,sig_45figs));
					return _60_63(Math.abs(scaled_45diff),epsilon)
				}
			})()
		};
		let near_450_63=exports["near-0?"]=function near_450_63(_,sig_45figs){
			_ms.checkInstance(_ms.sub(Opt,Nat),sig_45figs,"sig-figs");
			sig_45figs=opr(sig_45figs,6);
			let max=Math.pow(10,_42(- 1,sig_45figs));
			return _60_63(Math.abs(_),max)
		};
		let mid=exports.mid=function mid(a,b){
			_ms.checkInstance(Num,a,"a");
			_ms.checkInstance(Num,b,"b");
			return _47(_43(a,b),2)
		};
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvbWF0aC9OdW1iZXIubXMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFTQSxvQkFBSyxLQUFJLGFBQ1MsS0FBQTs7Y0FHakI7R0FDQSw4QkFBVzs7O0VBRVosb0JBQUssS0FBSSxhQUNTLEtBQUE7O2NBQ2pCO0dBQ0EsaUNBQWEsaUJBQUssSUFBRCxJQUFNLFVBQUssRUFBQzs7O0VBSTdCLFFBQU0sUUFBUSxPQUFTLFNBQUE7T0FtQmxCO3FCQW5Cd0I7VUFDNUIsSUFrQkksTUFsQkc7RUFBQTtFQUNSLFFBQU0sT0FBRyxPQUFTLFNBQUE7T0FpQmI7VUFoQkosU0FnQkksTUFoQk07RUFBQTtFQUNYLFFBQU0sT0FBRyxPQUFTLFNBQUE7T0FlYjtxQkFmbUI7VUFDdkIsTUFjSSxNQWRLO0VBQUE7RUFDVixRQUFNLFVBQUksT0FBUyxTQUFBO09BYWQ7cUJBYm9CO1VBQ3hCLFNBWUksTUFaTTtFQUFBO0VBQ1gsUUFBTSxPQUFHLE9BQVMsU0FBQTtPQVdiO3FCQVhtQjtVQUN2QixNQVVJLE1BVks7RUFBQTtFQUNWLFFBQU0sVUFBSSxPQUFTLFNBQUE7T0FTZDtxQkFUb0I7VUFDeEIsU0FRSSxNQVJNO0VBQUE7RUFDWCxRQUFNLElBQUUsT0FBUyxTQUFBO09BT1o7cUJBUGtCO1VBQ3RCLE1BTUksTUFOSztFQUFBO0VBQ1YsUUFBTSxJQUFFLE9BQVMsU0FBQTtPQUtaO3FCQUxrQjtVQUN0QixNQUlJLE1BSks7RUFBQTtFQUNWLFFBQU0sSUFBRSxPQUFTLFNBQUE7T0FHWjtxQkFIa0I7VUFDdEIsTUFFSSxNQUZLO0VBQUE7RUFDVixRQUFNLElBQUUsT0FBUyxTQUFBO09BQ1o7cUJBRGtCO1VBQ3RCLE1BQUksTUFBSztFQUFBO0VBR1YsZ0NBQVksbUJBQUEsVUFBYztxQkFBSjtxQkFBZ0I7VUFHckMsU0FBTyxVQUFVO0VBQUE7RUFFbEIsMEJBQVMsZ0JBQUEsVUFBYztxQkFBSjtxQkFBZ0I7VUFJOUI7SUFBSCxHQUFBLE9BQUcsVUFBVSxHQUNDO1lBQWIsSUFBRyxTQUFTLGFBQWMsVUFBVSxVQUFVO0lBQUEsT0FFM0M7WUFBSCxVQUFVLFVBQVU7SUFBQTtHQUFBO0VBQUE7RUFFdkIsMkJBQU8sZ0JBQUEsRUFBTTtxQkFBSjtxQkFBTTtVQUdkLFdBQVksSUFBRSxFQUFFO0VBQUE7RUFFakIsdUNBQWEsc0JBQUEsRUFBTTtxQkFBSjtxQkFBTTtVQUVwQixPQUFHLEVBQUcsVUFBVSxFQUFFO0VBQUE7RUFHbkIsbUNBQVcsb0JBQUEsS0FBUztxQkFBSjtxQkFBTTtVQUVyQixJQUFHLFNBQVMsR0FBSSxTQUFTO0VBQUE7RUFFMUIsMEJBQVMsZ0JBQUE7cUJBQUU7VUFDVixJQUFHLEVBQUU7RUFBQTtFQUVOLDJDQUFlLHdCQUFBLEVBQU07cUJBQUo7cUJBQVM7VUFDekIsSUFBRSxLQUFNLFVBQVcsSUFBRyxFQUFDO0VBQUE7RUFFeEIsNkNBQWdCLHlCQUFBLEVBQU07cUJBQUo7cUJBQVM7VUFDMUIsSUFBRSxLQUFNLFdBQVksSUFBRyxFQUFDO0VBQUE7RUFFekIsNkNBQWdCLHlCQUFBLEVBQU07cUJBQUo7cUJBQVM7VUFDMUIsSUFBRSxLQUFNLFdBQVksSUFBRyxFQUFDO0VBQUE7RUFHekIsNkJBQVEsaUJBQUEsRUFBRSxFQUFNO3FCQUFKOzZCQUFhLElBQUk7Y0FFaEIsSUFBSSxXQUFTO1VBRXJCO0lBQUgsR0FBQSxPQUFHLEVBQUUsR0FDQztZQUFMLFlBQVEsRUFBRTtJQUFBLE9BQ1gsR0FBQSxPQUFHLEVBQUUsR0FDQztZQUFMLFlBQVEsRUFBRTtJQUFBLE9BRVA7S0FBSCxjQUFVLElBQUcsSUFBRyxTQUFTLEdBQUksU0FBUyxJQUFJO0tBQzFDLDJCQUFtQixXQUFZLFdBQVc7S0FDMUMsVUFBUSxTQUFTLEdBQUksSUFBRSxJQUFHO0tBQzFCLGtCQUFjLElBQUcsSUFBRSxFQUFFLE9BQVEsSUFBRSxFQUFFO0tBQ2pDLFlBQVUsU0FBUyxHQUFJLElBQUUsSUFBRztZQUM1QixPQUFJLFNBQVMsZUFBYTtJQUFBO0dBQUE7RUFBQTtFQUU3QixtQ0FBVyxxQkFBQSxFQUFDOzZCQUFTLElBQUk7Y0FHWixJQUFJLFdBQVM7R0FFekIsUUFBTSxTQUFTLEdBQUksSUFBRSxJQUFHO1VBQ3hCLE9BQUcsU0FBUyxHQUFDO0VBQUE7RUFHZCxvQkFBTSxhQUFBLEVBQU07cUJBQUo7cUJBQU07VUFFYixJQUFHLElBQUUsRUFBRSxHQUFHO0VBQUEiLCJmaWxlIjoibWF0aC9OdW1iZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==
