"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../js","../Str","./Num","../bang","../RegExp","../Try"],function(exports,js_0,Str_1,Num_2,_33_3,RegExp_4,Try_5){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(js_0),js_45bar=_ms.get(_$2,"js-bar"),js_45and=_ms.get(_$2,"js-and"),js_45caret=_ms.get(_$2,"js-caret"),js_126=_ms.get(_$2,"js~"),js_60_60=_ms.get(_$2,"js<<"),js_62_62=_ms.get(_$2,"js>>"),js_62_62_62=_ms.get(_$2,"js>>>"),Str=_ms.getDefaultExport(Str_1),Num=_ms.getDefaultExport(Num_2),_$4=_ms.getModule(Num_2),Int=_ms.get(_$4,"Int"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_3)
		}),_$6=_ms.lazyGetModule(_33_3),_33not=_ms.lazyProp(_$6,"!not"),_$7=_ms.lazyGetModule(RegExp_4),regexp=_ms.lazyProp(_$7,"regexp"),_$8=_ms.lazyGetModule(Try_5),fails_63=_ms.lazyProp(_$8,"fails?");
		const exports={};
		const doc=exports.doc="For dealing with Ints qua sequences of bits.";
		const binary=exports.binary=function(){
			const doc="Makes an Int out of a string of 0s and 1s.";
			const test=function(){
				const _k0=["101"],_v0=5;
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return binary("0a")
				});
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function(bin_45str){
				_ms.checkContains(Str,bin_45str,"bin-str");
				_ms.unlazy(_33not)(_ms.unlazy(regexp)("[^01]").test(bin_45str),_ms.lazy(function(){
					return ("Not a valid binary number: "+_ms.show(bin_45str))
				}));
				const res=_ms.checkContains(Int,Num.parseInt(bin_45str,2),"res");
				_ms.unlazy(_33not)(Num.isNaN,res);
				return res
			},"doc",doc,"test",test,"displayName","binary")
		}();
		const hexidecimal=exports.hexidecimal=function(){
			const doc="Max an Int out of a string of hex codes (0-f). Capitalization ignored.";
			const test=function(){
				const _k0=["7f"],_v0=127;
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return hexidecimal("asdfghjkl")
				});
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function(hex_45str){
				_ms.checkContains(Str,hex_45str,"hex-str");
				_ms.unlazy(_33not)(_ms.unlazy(regexp)("[^0-9a-fA-F]").test(hex_45str),_ms.lazy(function(){
					return ("Not a valid hexidecimal number: "+_ms.show(hex_45str))
				}));
				const res=_ms.checkContains(Int,Num.parseInt(hex_45str,16),"res");
				_ms.unlazy(_33not)(Num.isNaN,res);
				return res
			},"doc",doc,"test",test,"displayName","hexidecimal")
		}();
		const bit_45or=exports["bit-or"]=function(){
			const doc="JavaScript's `|` operator.";
			const test=function(){
				const _k0=[binary("0101"),binary("0011")],_v0=binary("0111");
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function(a,b){
				_ms.checkContains(Int,a,"a");
				_ms.checkContains(Int,b,"b");
				return js_45bar(a,b)
			},"doc",doc,"test",test,"displayName","bit-or")
		}();
		const bit_45and=exports["bit-and"]=function(){
			const doc="JavaScript's `&` operator.";
			const test=function(){
				const _k0=[binary("0101"),binary("0011")],_v0=binary("0001");
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function(a,b){
				_ms.checkContains(Int,a,"a");
				_ms.checkContains(Int,b,"b");
				return js_45and(a,b)
			},"doc",doc,"test",test,"displayName","bit-and")
		}();
		const bit_45xor=exports["bit-xor"]=function(){
			const doc="Javascript's `^` operator.";
			const test=function(){
				const _k0=[binary("0101"),binary("0011")],_v0=binary("0110");
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function(a,b){
				_ms.checkContains(Int,a,"a");
				_ms.checkContains(Int,b,"b");
				return js_45caret(a,b)
			},"doc",doc,"test",test,"displayName","bit-xor")
		}();
		const bit_45not=exports["bit-not"]=function(){
			const doc="Javascript's `~` operator.";
			const test=function(){
				const _k0=[0],_v0=- 1;
				const _k1=[- 1],_v1=0;
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function(_){
				_ms.checkContains(Int,_,"_");
				return js_126(_)
			},"doc",doc,"test",test,"displayName","bit-not")
		}();
		const bit_45shift_45left=exports["bit-shift-left"]=function(){
			const doc="Javascript's `<<` operator.";
			const test=function(){
				const _k0=[binary("01"),1],_v0=binary("10");
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function(a,b){
				_ms.checkContains(Int,a,"a");
				_ms.checkContains(Int,b,"b");
				return js_60_60(a,b)
			},"doc",doc,"test",test,"displayName","bit-shift-left")
		}();
		const bit_45shift_45right_45signed=exports["bit-shift-right-signed"]=function(){
			const doc="Javascript's `>>` operator.";
			const test=function(){
				const _k0=[1,1],_v0=0;
				const _k1=[- 1,1],_v1=- 1;
				const _k2=[- 2,1],_v2=- 1;
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2)
			};
			return _ms.set(function(a,b){
				_ms.checkContains(Int,a,"a");
				_ms.checkContains(Int,b,"b");
				return js_62_62(a,b)
			},"doc",doc,"test",test,"displayName","bit-shift-right-signed")
		}();
		const bit_45shift_45right_45unsigned=exports["bit-shift-right-unsigned"]=function(){
			const doc="Javascript's `>>>` operator.";
			const test=function(){
				const _k0=[1,1],_v0=0;
				const _k1=[- 1,1],_v1=binary("1".repeat(31));
				const _k2=[- 2,1],_v2=binary("1".repeat(31));
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2)
			};
			return _ms.set(function(a,b){
				_ms.checkContains(Int,a,"a");
				_ms.checkContains(Int,b,"b");
				return js_62_62_62(a,b)
			},"doc",doc,"test",test,"displayName","bit-shift-right-unsigned")
		}();
		const displayName=exports.displayName="bit-arithmetic";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tYXRoL2JpdC1hcml0aG1ldGljLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztpQ0FTQTs7Ozs7RUFBQSxzQkFBTTtFQUVOLHNDQUFPO0dBQ04sVUFBTTtHQUNOLFdBQU8sVUFDTjtJQUFBLFVBQUEsQ0FBRyxXQUFVO3lDQUNHLFVBQ2Y7WUFBQSxPQUFRO0lBQUE7OztrQkFDVCxTQUFLLFVBTUw7c0JBTmE7MENBRUcsY0FBVjtZQUFrQyx3Q0FBMkI7SUFBQTtnQ0FGbEUsSUFNRCxhQUFBLFVBQXFCO3VCQUZmLFVBQUw7Ozs7RUFJSCxnREFBWTtHQUNYLFVBQU07R0FDTixXQUFPLFVBQ047SUFBQSxVQUFBLENBQUcsVUFBUzt5Q0FDSSxVQUNmO1lBQUEsWUFBYTtJQUFBOzs7a0JBQ2QsU0FBSyxVQU1MO3NCQU5hOzBDQUVHLHFCQUFWO1lBQXlDLDZDQUFnQztJQUFBO2dDQUY5RSxJQU1ELGFBQUEsVUFBcUI7dUJBRmYsVUFBTDs7OztFQUlILDJDQUFPO0dBQ04sVUFBTTtHQUNOLFdBQU8sVUFDTjtJQUFBLFVBQUEsQ0FBRSxPQUFTLFFBQU8sT0FBUyxhQUFZLE9BQVE7OztrQkFDL0MsU0FBQSxFQUFNLEVBQ047c0JBREU7c0JBQU07V0FDUixTQUFBLEVBQUE7R0FBQTs7RUFFRiw2Q0FBUTtHQUNQLFVBQU07R0FDTixXQUFPLFVBQ047SUFBQSxVQUFBLENBQUUsT0FBUyxRQUFPLE9BQVMsYUFBWSxPQUFROzs7a0JBQy9DLFNBQUEsRUFBTSxFQUNOO3NCQURFO3NCQUFNO1dBQ1IsU0FBQSxFQUFBO0dBQUE7O0VBRUYsNkNBQVE7R0FDUCxVQUFNO0dBQ04sV0FBTyxVQUNOO0lBQUEsVUFBQSxDQUFFLE9BQVMsUUFBTyxPQUFTLGFBQVksT0FBUTs7O2tCQUMvQyxTQUFBLEVBQU0sRUFDTjtzQkFERTtzQkFBTTtXQUNSLFdBQUEsRUFBQTtHQUFBOztFQUVGLDZDQUFRO0dBQ1AsVUFBTTtHQUNOLFdBQU8sVUFDTjtJQUFBLFVBQUEsQ0FBRSxPQUFPO0lBQ1QsVUFBQSxDQUFFLFNBQVE7OztrQkFDVixTQUFBLEVBQ0E7c0JBREU7V0FDRixPQUFBO0dBQUE7O0VBRUYsNkRBQWU7R0FDZCxVQUFNO0dBQ04sV0FBTyxVQUNOO0lBQUEsVUFBQSxDQUFFLE9BQVMsTUFBSyxPQUFPLE9BQVE7OztrQkFDL0IsU0FBQSxFQUFNLEVBQ047c0JBREU7c0JBQU07V0FDUixTQUFBLEVBQUE7R0FBQTs7RUFFRiwrRUFBdUI7R0FDdEIsVUFBTTtHQUNOLFdBQU8sVUFDTjtJQUFBLFVBQUEsQ0FBRSxFQUFFLE9BQU87SUFDWCxVQUFBLENBQUUsSUFBRyxPQUFPO0lBQ1osVUFBQSxDQUFFLElBQUcsT0FBTzs7O2tCQUNaLFNBQUEsRUFBTSxFQUNOO3NCQURFO3NCQUFNO1dBQ1IsU0FBQSxFQUFBO0dBQUE7O0VBRUYsbUZBQXlCO0dBQ3hCLFVBQU07R0FDTixXQUFPLFVBQ047SUFBQSxVQUFBLENBQUUsRUFBRSxPQUFPO0lBQ1gsVUFBQSxDQUFFLElBQUcsT0FBTyxPQUFVLFdBQVU7SUFDaEMsVUFBQSxDQUFFLElBQUcsT0FBTyxPQUFVLFdBQVU7OztrQkFDaEMsU0FBQSxFQUFNLEVBQ047c0JBREU7c0JBQU07V0FDUixZQUFBLEVBQUE7R0FBQTs7RUEzRkYsc0NBQUEiLCJmaWxlIjoibWF0aC9iaXQtYXJpdGhtZXRpYy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9