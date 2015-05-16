"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../js","./Number","../bang","../RegExp","../Try"],function(exports,js_0,Number_1,_33_2,RegExp_3,Try_4){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(js_0),js_45bar=_ms.get(_$2,"js-bar"),js_45and=_ms.get(_$2,"js-and"),js_45caret=_ms.get(_$2,"js-caret"),js_126=_ms.get(_$2,"js~"),js_60_60=_ms.get(_$2,"js<<"),js_62_62=_ms.get(_$2,"js>>"),js_62_62_62=_ms.get(_$2,"js>>>"),_$3=_ms.getModule(Number_1),Int=_ms.get(_$3,"Int"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_2)
		}),_$5=_ms.lazyGetModule(_33_2),_33not=_ms.lazyProp(_$5,"!not"),_$6=_ms.lazyGetModule(RegExp_3),regexp=_ms.lazyProp(_$6,"regexp"),_$7=_ms.lazyGetModule(Try_4),fails_63=_ms.lazyProp(_$7,"fails?");
		const doc=exports.doc="For dealing with Ints qua sequences of bits.";
		const binary=exports.binary=function(){
			const doc="Makes an Int out of a string of 0s and 1s.";
			const test=function test(){
				const _k0=["101"],_v0=5;
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return binary("0a")
				});
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function binary(bin_45str){
				_ms.checkContains(String,bin_45str,"bin-str");
				_ms.unlazy(_33not)(_ms.unlazy(regexp)("[^01]").test(bin_45str),_ms.lazy(function(){
					return ("Not a valid binary number: "+_ms.show(bin_45str))
				}));
				const res=_ms.checkContains(Int,Number.parseInt(bin_45str,2),"res");
				_ms.unlazy(_33not)(Number.isNaN,res);
				return res
			},"doc",doc,"test",test)
		}();
		const hexidecimal=exports.hexidecimal=function(){
			const doc="Max an Int out of a string of hex codes (0-f). Capitalization ignored.";
			const test=function test(){
				const _k0=["7f"],_v0=127;
				_ms.unlazy(_33)(_ms.unlazy(fails_63),function(){
					return hexidecimal("asdfghjkl")
				});
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function hexidecimal(hex_45str){
				_ms.checkContains(String,hex_45str,"hex-str");
				_ms.unlazy(_33not)(_ms.unlazy(regexp)("[^0-9a-fA-F]").test(hex_45str),_ms.lazy(function(){
					return ("Not a valid hexidecimal number: "+_ms.show(hex_45str))
				}));
				const res=_ms.checkContains(Int,Number.parseInt(hex_45str,16),"res");
				_ms.unlazy(_33not)(Number.isNaN,res);
				return res
			},"doc",doc,"test",test)
		}();
		const bit_45or=exports["bit-or"]=function(){
			const doc="JavaScript's `|` operator.";
			const test=function test(){
				const _k0=[binary("0101"),binary("0011")],_v0=binary("0111");
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function bit_45or(a,b){
				_ms.checkContains(Int,a,"a");
				_ms.checkContains(Int,b,"b");
				return js_45bar(a,b)
			},"doc",doc,"test",test)
		}();
		const bit_45and=exports["bit-and"]=function(){
			const doc="JavaScript's `&` operator.";
			const test=function test(){
				const _k0=[binary("0101"),binary("0011")],_v0=binary("0001");
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function bit_45and(a,b){
				_ms.checkContains(Int,a,"a");
				_ms.checkContains(Int,b,"b");
				return js_45and(a,b)
			},"doc",doc,"test",test)
		}();
		const bit_45xor=exports["bit-xor"]=function(){
			const doc="Javascript's `^` operator.";
			const test=function test(){
				const _k0=[binary("0101"),binary("0011")],_v0=binary("0110");
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function bit_45xor(a,b){
				_ms.checkContains(Int,a,"a");
				_ms.checkContains(Int,b,"b");
				return js_45caret(a,b)
			},"doc",doc,"test",test)
		}();
		const bit_45not=exports["bit-not"]=function(){
			const doc="Javascript's `~` operator.";
			const test=function test(){
				const _k0=[0],_v0=- 1;
				const _k1=[- 1],_v1=0;
				return _ms.map(_k0,_v0,_k1,_v1)
			};
			return _ms.set(function bit_45not(_){
				_ms.checkContains(Int,_,"_");
				return js_126(_)
			},"doc",doc,"test",test)
		}();
		const bit_45shift_45left=exports["bit-shift-left"]=function(){
			const doc="Javascript's `<<` operator.";
			const test=function test(){
				const _k0=[binary("01"),1],_v0=binary("10");
				return _ms.map(_k0,_v0)
			};
			return _ms.set(function bit_45shift_45left(a,b){
				_ms.checkContains(Int,a,"a");
				_ms.checkContains(Int,b,"b");
				return js_60_60(a,b)
			},"doc",doc,"test",test)
		}();
		const bit_45shift_45right_45signed=exports["bit-shift-right-signed"]=function(){
			const doc="Javascript's `>>` operator.";
			const test=function test(){
				const _k0=[1,1],_v0=0;
				const _k1=[- 1,1],_v1=- 1;
				const _k2=[- 2,1],_v2=- 1;
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2)
			};
			return _ms.set(function bit_45shift_45right_45signed(a,b){
				_ms.checkContains(Int,a,"a");
				_ms.checkContains(Int,b,"b");
				return js_62_62(a,b)
			},"doc",doc,"test",test)
		}();
		const bit_45shift_45right_45unsigned=exports["bit-shift-right-unsigned"]=function(){
			const doc="Javascript's `>>>` operator.";
			const test=function test(){
				const _k0=[1,1],_v0=0;
				const _k1=[- 1,1],_v1=binary("1".repeat(31));
				const _k2=[- 2,1],_v2=binary("1".repeat(31));
				return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2)
			};
			return _ms.set(function bit_45shift_45right_45unsigned(a,b){
				_ms.checkContains(Int,a,"a");
				_ms.checkContains(Int,b,"b");
				return js_62_62_62(a,b)
			},"doc",doc,"test",test)
		}();
		const name=exports.name="bit-arithmetic";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tYXRoL2JpdC1hcml0aG1ldGljLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFRQSxzQkFBTTtFQUVOLHNDQUNPO0dBQU4sVUFBTTtHQUNOLFdBQ08sZUFBQTtJQUFOLFVBQUEsQ0FBRyxXQUFVO3lDQUVHLFVBQUE7WUFBZixPQUFRO0lBQUE7OztrQkFDVCxnQkFBSyxVQU1MO3NCQU5hOzBDQUVHLGNBQWE7WUFBVyx3Q0FBNEI7SUFBQTtnQ0FGbkUsSUFNRCxnQkFBZ0IsVUFBUTt1QkFGbEIsYUFBYTs7OztFQUlyQixnREFDWTtHQUFYLFVBQU07R0FDTixXQUNPLGVBQUE7SUFBTixVQUFBLENBQUcsVUFBUzt5Q0FFSSxVQUFBO1lBQWYsWUFBYTtJQUFBOzs7a0JBQ2QscUJBQUssVUFNTDtzQkFOYTswQ0FFRyxxQkFBb0I7WUFBVyw2Q0FBaUM7SUFBQTtnQ0FGL0UsSUFNRCxnQkFBZ0IsVUFBUTt1QkFGbEIsYUFBYTs7OztFQUlyQiwyQ0FDTztHQUFOLFVBQU07R0FDTixXQUNPLGVBQUE7SUFBTixVQUFBLENBQUcsT0FBUSxRQUFRLE9BQVEsYUFBWSxPQUFROzs7a0JBQy9DLGtCQUFBLEVBQU0sRUFDSztzQkFEVDtzQkFBTTtXQUNSLFNBQU8sRUFBRTtHQUFBOztFQUVYLDZDQUNRO0dBQVAsVUFBTTtHQUNOLFdBQ08sZUFBQTtJQUFOLFVBQUEsQ0FBRyxPQUFRLFFBQVEsT0FBUSxhQUFZLE9BQVE7OztrQkFDL0MsbUJBQUEsRUFBTSxFQUNLO3NCQURUO3NCQUFNO1dBQ1IsU0FBTyxFQUFFO0dBQUE7O0VBRVgsNkNBQ1E7R0FBUCxVQUFNO0dBQ04sV0FDTyxlQUFBO0lBQU4sVUFBQSxDQUFHLE9BQVEsUUFBUSxPQUFRLGFBQVksT0FBUTs7O2tCQUMvQyxtQkFBQSxFQUFNLEVBQ0s7c0JBRFQ7c0JBQU07V0FDUixXQUFTLEVBQUU7R0FBQTs7RUFFYiw2Q0FDUTtHQUFQLFVBQU07R0FDTixXQUNPLGVBQUE7SUFBTixVQUFBLENBQUUsT0FBTztJQUNULFVBQUEsQ0FBRSxTQUFROzs7a0JBQ1YsbUJBQUEsRUFDSztzQkFESDtXQUNGLE9BQUE7R0FBQTs7RUFFRiw2REFDZTtHQUFkLFVBQU07R0FDTixXQUNPLGVBQUE7SUFBTixVQUFBLENBQUcsT0FBUSxNQUFLLE9BQU8sT0FBUTs7O2tCQUMvQiw0QkFBQSxFQUFNLEVBQ0s7c0JBRFQ7c0JBQU07V0FDUixTQUFLLEVBQUU7R0FBQTs7RUFFVCwrRUFDdUI7R0FBdEIsVUFBTTtHQUNOLFdBQ08sZUFBQTtJQUFOLFVBQUEsQ0FBRSxFQUFFLE9BQU87SUFDWCxVQUFBLENBQUUsSUFBRyxPQUFPO0lBQ1osVUFBQSxDQUFFLElBQUcsT0FBTzs7O2tCQUNaLHNDQUFBLEVBQU0sRUFDSztzQkFEVDtzQkFBTTtXQUNSLFNBQUssRUFBRTtHQUFBOztFQUVULG1GQUN5QjtHQUF4QixVQUFNO0dBQ04sV0FDTyxlQUFBO0lBQU4sVUFBQSxDQUFFLEVBQUUsT0FBTztJQUNYLFVBQUEsQ0FBRSxJQUFHLE9BQVEsT0FBUyxXQUFVO0lBQ2hDLFVBQUEsQ0FBRSxJQUFHLE9BQVEsT0FBUyxXQUFVOzs7a0JBQ2hDLHdDQUFBLEVBQU0sRUFDSztzQkFEVDtzQkFBTTtXQUNSLFlBQU0sRUFBRTtHQUFBOztFQTFGVix3QkFBQSIsImZpbGUiOiJtYXRoL2JpdC1hcml0aG1ldGljLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=