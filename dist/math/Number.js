"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../Boolean","../compare","../control","../Object","../js","../Type/Method","../Type/Pred-Type","./methods","../bang","../Function","../Try","../Type/Type"],function(exports,Boolean_0,compare_1,control_2,Object_3,js_4,Method_5,Pred_45Type_6,methods_7,_33_8,Function_9,Try_10,Type_11){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(Boolean_0),and=_$2.and,compare=_ms.getDefaultExport(compare_1),_$3=_ms.getModule(compare_1),_61_63=_$3["=?"],_60_63=_$3["<?"],_60_61_63=_$3["<=?"],_$4=_ms.getModule(control_2),opr=_$4.opr,_$5=_ms.getModule(Object_3),p=_$5.p,_$6=_ms.getModule(js_4),id_61_63=_$6["id=?"],js_45bar=_$6["js-bar"],js_60=_$6["js<"],js_60_61=_$6["js<="],js_43=_$6["js+"],js_45=_$6["js-"],js_42=_$6["js*"],js_47=_$6["js/"],js_45mod=_$6["js-mod"],_$7=_ms.getModule(Method_5),impl_33=_$7["impl!"],Pred_45Type=_ms.getDefaultExport(Pred_45Type_6),_$8=_ms.getModule(Pred_45Type_6),Opt=_$8.Opt,_$9=_ms.getModule(methods_7),_43=_$9["+"],_45=_$9["-"],_42=_$9["*"],_47=_$9["/"],_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_8)
		}),_$11=_ms.lazyGetModule(_33_8),_33not=_ms.lazyProp(_$11,"!not"),_$12=_ms.lazyGetModule(Function_9),spread_33=_ms.lazyProp(_$12,"spread!"),_$13=_ms.lazyGetModule(Try_10),fails_63=_ms.lazyProp(_$13,"fails?"),_$14=_ms.lazyGetModule(Type_11),contains_63=_ms.lazyProp(_$14,"contains?");
		const Int=exports.Int=Pred_45Type(function(){
			const doc="A multiple of 1.\nThis only contains Numbers for which integer methods return sensible results, AKA safe ints.\nThis is anything between min-safe-integer and max-safe-integer.";
			const predicate=function predicate(_){
				return Number.isSafeInteger(_)
			};
			return {
				doc:doc,
				predicate:predicate,
				name:"Int"
			}
		}());
		const Nat=exports.Nat=Pred_45Type(function(){
			const doc="Any counting number, including `0`.";
			const predicate=function predicate(_){
				return and(_ms.contains(Int,_),_ms.lazy(function(){
					return _60_61_63(0,_)
				}))
			};
			return {
				doc:doc,
				predicate:predicate,
				name:"Nat"
			}
		}());
		impl_33(compare,Number,_45);
		impl_33(_61_63,Number,function(){
			return _ms.set(id_61_63)
		}());
		impl_33(_60_63,Number,function(a,b){
			return js_60(a,b)
		});
		impl_33(_60_61_63,Number,function(a,b){
			return js_60_61(a,b)
		});
		impl_33(_43,Number,function(a,b){
			return js_43(a,b)
		});
		impl_33(_45,Number,function(a,b){
			return js_45(a,b)
		});
		impl_33(_42,Number,function(a,b){
			return js_42(a,b)
		});
		impl_33(_47,Number,function(a,b){
			return js_47(a,b)
		});
		const sign=exports.sign=function(){
			return _ms.set(function sign(_){
				return function(){
					if(_60_63(0,_)){
						return 1
					} else if(_60_63(_,0)){
						return - 1
					} else {
						return 0
					}
				}()
			})
		}();
		const remainder=exports.remainder=function(){
			const doc="Remainder of `a` after dividing by `b`.\nSign of result is sign of `a`. Sign of `b` is ignored.";
			return _ms.set(function remainder(numerator,denominator){
				return js_45mod(numerator,denominator)
			},"doc",doc)
		}();
		const int_47=exports["int/"]=function(){
			const doc="Integer division: throws out any remainder.\nThis is the default in other programming languages, but in Mason `/ 1 2` is 0.5, not 0.";
			return _ms.set(function int_47(a,b){
				return round_45down(_47(a,b))
			},"doc",doc)
		}();
		const modulo=exports.modulo=function(){
			const doc="Mathematical modulus.\nSmallest positive number which can be added to a multiple of `denominator` to get `numerator`.\"";
			return _ms.set(function modulo(numerator,denominator){
				const res=function(){
					if(_60_63(numerator,0)){
						return _43(abs(denominator),remainder(numerator,denominator))
					} else {
						return remainder(numerator,denominator)
					}
				}();
				return res
			},"doc",doc)
		}();
		const divisible_63=exports["divisible?"]=function(){
			const doc="Whether an integer number of `b` can add up to `a`.";
			return _ms.set(function divisible_63(a,b){
				return _61_63(0,remainder(a,b))
			},"doc",doc)
		}();
		const log_45e=exports["log-e"]=function log_45e(_){
			return Math.log(_)
		};
		const log=exports.log=function(){
			const doc="Mathematical logarithm.";
			return _ms.set(function log(base,n){
				return _47(log_45e(n),log_45e(base))
			},"doc",doc)
		}();
		const abs=exports.abs=function(){
			const doc="Negates `a` until it is positive.";
			return _ms.set(function abs(a){
				return Math.abs(a)
			},"doc",doc)
		}();
		const pow=exports.pow=function(){
			const doc="`a` raised to the power of `b`.";
			return _ms.set(function pow(a,b){
				return Math.pow(a,b)
			},"doc",doc)
		}();
		const square=exports.square=function square(_){
			return _42(_,_)
		};
		const square_45root=exports["square-root"]=function(){
			return _ms.set(function square_45root(_){
				return Math.sqrt(_)
			})
		}();
		const round=exports.round=function(){
			const doc="Closest integer.\nRounds up to break ties.";
			return _ms.set(function round(_){
				return Math.round(_)
			},"doc",doc)
		}();
		const round_45down=exports["round-down"]=function(){
			const doc="Greatest integer no greater than `a`.";
			return _ms.set(function round_45down(_){
				return Math.floor(_)
			},"doc",doc)
		}();
		const round_45up=exports["round-up"]=function(){
			const doc="Least integer no less than `a`.";
			return _ms.set(function round_45up(_){
				return Math.ceil(_)
			},"doc",doc)
		}();
		const round_45towards_450=exports["round-towards-0"]=function(){
			const doc="`round-down` if positive, else `round-up`.";
			return _ms.set(function round_45towards_450(_){
				return js_45bar(_,0)
			},"doc",doc)
		}();
		const near_63=exports["near?"]=function(){
			const doc="Whether they are within sig-figs precision.";
			return _ms.set(function near_63(a,b,sig_45figs){
				sig_45figs=opr(sig_45figs,6);
				return function(){
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
			},"doc",doc)
		}();
		const near_450_63=exports["near-0?"]=function(){
			const doc="Whether it is close to zero.\nIt must be `0.0...` where there are `sig-figs` 0s after the decimal point.";
			return _ms.set(function near_450_63(_,sig_45figs){
				sig_45figs=opr(sig_45figs,6);
				const max=pow(10,_42(- 1,sig_45figs));
				return _60_63(abs(_),max)
			},"doc",doc)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tYXRoL051bWJlci5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0VBZUEsc0JBQUssc0JBQ1M7R0FBYixVQUNDO0dBWUQsZ0JBQVksbUJBQUEsRUFDQztXQUFaLHFCQUFxQjtHQUFBOzs7Ozs7O0VBRXZCLHNCQUFLLHNCQUNTO0dBQWIsVUFBTTtHQUlOLGdCQUFZLG1CQUFBLEVBQ0M7V0FBWixpQkFBSyxJQUFEO1lBQU8sVUFBSSxFQUFFO0lBQUE7R0FBQTs7Ozs7OztFQUlsQixRQUFNLFFBQVEsT0FBTztFQUNyQixRQUFNLE9BQUcsaUJBQ007a0JBRWQ7RUFBQTtFQUNELFFBQU0sT0FBRyxPQUFRLFNBQUEsRUFBRSxFQUNRO1VBQTFCLE1BQUksRUFBRTtFQUFBO0VBQ1AsUUFBTSxVQUFJLE9BQVEsU0FBQSxFQUFFLEVBQ1E7VUFBM0IsU0FBSyxFQUFFO0VBQUE7RUFDUixRQUFNLElBQUUsT0FBUSxTQUFBLEVBQUUsRUFDUTtVQUF6QixNQUFJLEVBQUU7RUFBQTtFQUNQLFFBQU0sSUFBRSxPQUFRLFNBQUEsRUFBRSxFQUNRO1VBQXpCLE1BQUksRUFBRTtFQUFBO0VBQ1AsUUFBTSxJQUFFLE9BQVEsU0FBQSxFQUFFLEVBQ1E7VUFBekIsTUFBSSxFQUFFO0VBQUE7RUFDUCxRQUFNLElBQUUsT0FBUSxTQUFBLEVBQUUsRUFDUTtVQUF6QixNQUFJLEVBQUU7RUFBQTtFQUdQLGtDQUNLO2tCQUlILGNBQUEsRUFDUTs7S0FDUCxHQUFBLE9BQUcsRUFBRSxHQUNDO2FBQUw7S0FBQSxPQUNELEdBQUEsT0FBRyxFQUFFLEdBQ0M7YUFBTDtZQUVHO2FBQUg7S0FBQTtJQUFBO0dBQUE7RUFBQTtFQUdKLDRDQUNVO0dBQVQsVUFDQztrQkFPQSxtQkFBQSxVQUFpQixZQUNrQjtXQUFuQyxTQUFPLFVBQVU7R0FBQTs7RUFFbkIsdUNBQ0s7R0FBSixVQUNDO2tCQUtBLGdCQUFBLEVBQVMsRUFDUTtXQUFqQixhQUFZLElBQUUsRUFBRTtHQUFBOztFQUVsQixzQ0FDTztHQUFOLFVBQ0M7a0JBT0EsZ0JBQUEsVUFBaUIsWUFHakI7O0tBQ0MsR0FBQSxPQUFHLFVBQVUsR0FDQzthQUFiLElBQUcsSUFBSSxhQUFjLFVBQVUsVUFBVTtLQUFBLE9BRXRDO2FBQUgsVUFBVSxVQUFVO0tBQUE7SUFBQTs7OztFQUV4QixtREFDVztHQUFWLFVBQU07a0JBS0wsc0JBQUEsRUFBUyxFQUNRO1dBQWpCLE9BQUcsRUFBRyxVQUFVLEVBQUU7R0FBQTs7RUFLcEIsK0JBQVEsaUJBQUEsRUFDUTtVQUFmLFNBQVM7RUFBQTtFQUVWLGdDQUNJO0dBQUgsVUFBTTtrQkFJTCxhQUFBLEtBQVksRUFDUTtXQUFwQixJQUFHLFFBQU0sR0FBSSxRQUFNO0dBQUE7O0VBRXJCLGdDQUNJO0dBQUgsVUFBTTtrQkFJTCxhQUFBLEVBQ1E7V0FBUixTQUFTO0dBQUE7O0VBRVgsZ0NBQ0k7R0FBSCxVQUFNO2tCQUdMLGFBQUEsRUFBUyxFQUNRO1dBQWpCLFNBQVMsRUFBRTtHQUFBOztFQUViLDRCQUFTLGdCQUFBLEVBQ1E7VUFBaEIsSUFBRSxFQUFFO0VBQUE7RUFFTCxxREFDWTtrQkFJVix1QkFBQSxFQUdBO1dBQUEsVUFBVTtHQUFBO0VBQUE7RUFHWixvQ0FDTTtHQUFMLFVBQ0M7a0JBS0EsZUFBQSxFQUNRO1dBQVIsV0FBVztHQUFBOztFQUViLG1EQUNXO0dBQVYsVUFBTTtrQkFJTCxzQkFBQSxFQUNRO1dBQVIsV0FBVztHQUFBOztFQUViLCtDQUNTO0dBQVIsVUFBTTtrQkFJTCxvQkFBQSxFQUNRO1dBQVIsVUFBVTtHQUFBOztFQUVaLCtEQUNnQjtHQUFmLFVBQU07a0JBSUwsNkJBQUEsRUFDUTtXQUFSLFNBQU8sRUFBRTtHQUFBOztFQUdYLHlDQUNNO0dBQUwsVUFBTTtrQkFVTCxpQkFBQSxFQUFFLEVBQVMsV0FDaUI7ZUFBaEIsSUFBSSxXQUFTOztLQUV4QixHQUFBLE9BQUcsRUFBRSxHQUNDO2FBQUwsWUFBUSxFQUFFO0tBQUEsT0FDWCxHQUFBLE9BQUcsRUFBRSxHQUNDO2FBQUwsWUFBUSxFQUFFO0tBQUEsT0FFUDtNQUFILGdCQUFVLElBQUcsSUFBRyxJQUFJLEdBQUksSUFBSSxJQUFJO01BQ2hDLDZCQUFtQixhQUFZLElBQUksR0FBRztNQUN0QyxZQUFRLElBQUksR0FBSSxJQUFFLElBQUc7TUFDckIsb0JBQWMsSUFBRyxJQUFFLEVBQUUsT0FBUSxJQUFFLEVBQUU7TUFDakMsY0FBVSxJQUFJLEdBQUksSUFBRSxJQUFHO2FBQ3ZCLE9BQUksSUFBSSxlQUFhO0tBQUE7SUFBQTtHQUFBOztFQUV6QiwrQ0FDUTtHQUFQLFVBQ0M7a0JBS0EscUJBQUEsRUFBRSxXQUNpQjtlQUFQLElBQUksV0FBUztJQUV6QixVQUFNLElBQUksR0FBSSxJQUFFLElBQUc7V0FDbkIsT0FBRyxJQUFBLEdBQUs7R0FBQTs7RUFHVixnQ0FBVSxFQUFFLE9BQVE7RUFDcEIsdUNBQVcsRUFBRSxPQUFRO0VBQ3JCLCtDQUFjLEVBQUUsT0FBUTtFQUN4QiwrQ0FBYyxFQUFFLE9BQVE7RUFDeEIsK0NBQWM7RUF2UGYsd0JBQUEiLCJmaWxlIjoibWF0aC9OdW1iZXIuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==