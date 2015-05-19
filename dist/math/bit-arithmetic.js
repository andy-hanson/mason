"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../js","./Number","../bang","../Try"],function(exports,js_0,Number_1,_33_2,Try_3){
	exports._get=_ms.lazy(function(){
		const _$2=_ms.getModule(js_0),js_45bar=_$2["js-bar"],js_45and=_$2["js-and"],js_45caret=_$2["js-caret"],js_126=_$2["js~"],js_60_60=_$2["js<<"],js_62_62=_$2["js>>"],js_62_62_62=_$2["js>>>"],_$3=_ms.getModule(Number_1),Int=_$3.Int,_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_2)
		}),_$5=_ms.lazyGetModule(_33_2),_33not=_ms.lazyProp(_$5,"!not"),_$6=_ms.lazyGetModule(Try_3),fails_63=_ms.lazyProp(_$6,"fails?");
		const doc=exports.doc="For dealing with Ints qua sequences of bits.";
		const binary=exports.binary=function(){
			const doc="Makes an Int out of a string of 0s and 1s.";
			return _ms.set(function binary(bin_45str){
				const res=Number.parseInt(bin_45str,2);
				return res
			},"doc",doc)
		}();
		const hexidecimal=exports.hexidecimal=function(){
			const doc="Max an Int out of a string of hex codes (0-f). Capitalization ignored.";
			return _ms.set(function hexidecimal(hex_45str){
				const res=Number.parseInt(hex_45str,16);
				return res
			},"doc",doc)
		}();
		const bit_45or=exports["bit-or"]=function(){
			const doc="JavaScript's `|` operator.";
			return _ms.set(function bit_45or(a,b){
				return js_45bar(a,b)
			},"doc",doc)
		}();
		const bit_45and=exports["bit-and"]=function(){
			const doc="JavaScript's `&` operator.";
			return _ms.set(function bit_45and(a,b){
				return js_45and(a,b)
			},"doc",doc)
		}();
		const bit_45xor=exports["bit-xor"]=function(){
			const doc="Javascript's `^` operator.";
			return _ms.set(function bit_45xor(a,b){
				return js_45caret(a,b)
			},"doc",doc)
		}();
		const bit_45not=exports["bit-not"]=function(){
			const doc="Javascript's `~` operator.";
			return _ms.set(function bit_45not(_){
				return js_126(_)
			},"doc",doc)
		}();
		const bit_45shift_45left=exports["bit-shift-left"]=function(){
			const doc="Javascript's `<<` operator.";
			return _ms.set(function bit_45shift_45left(a,b){
				return js_60_60(a,b)
			},"doc",doc)
		}();
		const bit_45shift_45right_45signed=exports["bit-shift-right-signed"]=function(){
			const doc="Javascript's `>>` operator.";
			return _ms.set(function bit_45shift_45right_45signed(a,b){
				return js_62_62(a,b)
			},"doc",doc)
		}();
		const bit_45shift_45right_45unsigned=exports["bit-shift-right-unsigned"]=function(){
			const doc="Javascript's `>>>` operator.";
			return _ms.set(function bit_45shift_45right_45unsigned(a,b){
				return js_62_62_62(a,b)
			},"doc",doc)
		}();
		const name=exports.name="bit-arithmetic";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tYXRoL2JpdC1hcml0aG1ldGljLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFPQSxzQkFBTTtFQUVOLHNDQUNPO0dBQU4sVUFBTTtrQkFLTCxnQkFBSyxVQU1MO2NBQUEsZ0JBQWdCLFVBQVE7Ozs7RUFFMUIsZ0RBQ1k7R0FBWCxVQUFNO2tCQUtMLHFCQUFLLFVBTUw7Y0FBQSxnQkFBZ0IsVUFBUTs7OztFQUUxQiwyQ0FDTztHQUFOLFVBQU07a0JBR0wsa0JBQUEsRUFBTSxFQUNLO1dBQVgsU0FBTyxFQUFFO0dBQUE7O0VBRVgsNkNBQ1E7R0FBUCxVQUFNO2tCQUdMLG1CQUFBLEVBQU0sRUFDSztXQUFYLFNBQU8sRUFBRTtHQUFBOztFQUVYLDZDQUNRO0dBQVAsVUFBTTtrQkFHTCxtQkFBQSxFQUFNLEVBQ0s7V0FBWCxXQUFTLEVBQUU7R0FBQTs7RUFFYiw2Q0FDUTtHQUFQLFVBQU07a0JBSUwsbUJBQUEsRUFDSztXQUFMLE9BQUE7R0FBQTs7RUFFRiw2REFDZTtHQUFkLFVBQU07a0JBR0wsNEJBQUEsRUFBTSxFQUNLO1dBQVgsU0FBSyxFQUFFO0dBQUE7O0VBRVQsK0VBQ3VCO0dBQXRCLFVBQU07a0JBS0wsc0NBQUEsRUFBTSxFQUNLO1dBQVgsU0FBSyxFQUFFO0dBQUE7O0VBRVQsbUZBQ3lCO0dBQXhCLFVBQU07a0JBS0wsd0NBQUEsRUFBTSxFQUNLO1dBQVgsWUFBTSxFQUFFO0dBQUE7O0VBekZWLHdCQUFBIiwiZmlsZSI6Im1hdGgvYml0LWFyaXRobWV0aWMuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==