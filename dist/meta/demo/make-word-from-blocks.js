"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/at","../../at/q","../../at/Seq/Seq","../../String","../../Type/Type","../../bang","../../at/at","../../at/at-Type","../../compare"],function(exports,_64_0,_63_1,Seq_2,String_3,Type_4,_33_5,_64_6,_64_45Type_7,compare_8){
	exports._get=_ms.lazy(function(){
		const _64=_ms.getDefaultExport(_64_0),_$2=_ms.getModule(_64_0),_43_43=_ms.get(_$2,"++"),_45_45=_ms.get(_$2,"--"),empty_63=_ms.get(_$2,"empty?"),flat_45map=_ms.get(_$2,"flat-map"),keep=_ms.get(_$2,"keep"),map=_ms.get(_$2,"map"),_63=_ms.getDefaultExport(_63_1),Seq=_ms.getDefaultExport(Seq_2),_$4=_ms.getModule(Seq_2),_63first=_ms.get(_$4,"?first"),tail=_ms.get(_$4,"tail"),_$5=_ms.getModule(String_3),_45_62upper=_ms.get(_$5,"->upper"),_$6=_ms.getModule(Type_4),contains_63=_ms.get(_$6,"contains?"),_33=_ms.lazy(function(){
			return _ms.getDefaultExport(_33_5)
		}),_$9=_ms.lazyGetModule(_64_6),each_33=_ms.lazyProp(_$9,"each!"),_$10=_ms.lazyGetModule(_64_45Type_7),empty=_ms.lazyProp(_$10,"empty"),_$11=_ms.lazyGetModule(compare_8),_61_63=_ms.lazyProp(_$11,"=?");
		const make_45word_45from_45blocks=exports["make-word-from-blocks"]=function(){
			const doc="http://rosettacode.org/wiki/ABC_Problem";
			const test=function(){
				return _ms.set(function(){
					const _k0=["AB",["AB","AC"]],_v0=_63(["AC","AB"]);
					const sample_45blocks=function(){
						const _0="BO";
						const _1="XK";
						const _2="DQ";
						const _3="CP";
						const _4="NA";
						const _5="GT";
						const _6="RE";
						const _7="TG";
						const _8="QD";
						const _9="FS";
						const _10="JW";
						const _11="HU";
						const _12="VI";
						const _13="AN";
						const _14="OB";
						const _15="ER";
						const _16="FS";
						const _17="LY";
						const _18="PC";
						const _19="ZM";
						return [_0,_1,_2,_3,_4,_5,_6,_7,_8,_9,_10,_11,_12,_13,_14,_15,_16,_17,_18,_19]
					}();
					const sample_45answers=function(){
						const _k0="a",_v0=_63(["NA"]);
						const _k1="bark",_v1=_63(["BO","NA","RE","XK"]);
						const _k2="book",_v2=_ms.unlazy(empty)(_63);
						const _k3="treat",_v3=_63(["GT","RE","ER","NA","TG"]);
						const _k4="common",_v4=_ms.unlazy(empty)(_63);
						const _k5="squad",_v5=_63(["FS","DQ","HU","NA","QD"]);
						const _k6="confuse",_v6=_63(["CP","BO","NA","FS","HU","FS","RE"]);
						return _ms.map(_k0,_v0,_k1,_v1,_k2,_v2,_k3,_v3,_k4,_v4,_k5,_v5,_k6,_v6)
					}();
					_ms.unlazy(each_33)(sample_45answers,function(pair){
						const word=pair.key;
						const ans=pair.val;
						return _ms.unlazy(_33)(_ms.unlazy(_61_63),ans,make_45word_45from_45blocks(word,sample_45blocks))
					});
					return _ms.map(_k0,_v0)
				},"displayName","test")
			}();
			return _ms.set(function(word,blocks){
				_ms.checkContains(String,word,"word");
				_ms.checkContains(_ms.sub(_64,String),blocks,"blocks");
				const rec=function(){
					return _ms.set(function(word,blocks){
						return function(){
							const _=word;
							if(_ms.bool(empty_63(_))){
								return _63([])
							} else {
								const rest_45word=tail(_);
								const this_45char_45blocks=keep(blocks,function(){
									return _ms.set(function(_){
										return contains_63(_,_ms.sub(word,0))
									},"displayName","this-char-blocks")
								}());
								return _63first(flat_45map(this_45char_45blocks,function(_){
									return map(rec(rest_45word,_45_45(blocks,[_])),function(ans){
										return _43_43([_],ans)
									})
								}))
							}
						}()
					},"displayName","rec")
				}();
				return _ms.checkContains(_ms.sub(_63,_ms.sub(Seq,String)),rec(_45_62upper(word),map(blocks,_45_62upper)),"res")
			},"doc",doc,"test",test,"displayName","make-word-from-blocks")
		}();
		const displayName=exports.displayName="make-word-from-blocks";
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9tZXRhL2RlbW8vbWFrZS13b3JkLWZyb20tYmxvY2tzLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7RUFZQSw2RUFDc0I7R0FBckIsVUFBTTtHQUNOLHFCQUNPO21CQUFBLFVBQUE7S0FDTixVQUFBLENBQUcsS0FBSSxDQUFHLEtBQUssV0FBVyxJQUFFLENBQUcsS0FBSztLQUVwQyxnQ0FDZTtNQUFkLFNBQUc7TUFDSCxTQUFHO01BQ0gsU0FBRztNQUNILFNBQUc7TUFDSCxTQUFHO01BQ0gsU0FBRztNQUNILFNBQUc7TUFDSCxTQUFHO01BQ0gsU0FBRztNQUNILFNBQUc7TUFDSCxVQUFHO01BQ0gsVUFBRztNQUNILFVBQUc7TUFDSCxVQUFHO01BQ0gsVUFBRztNQUNILFVBQUc7TUFDSCxVQUFHO01BQ0gsVUFBRztNQUNILFVBQUc7TUFDSCxVQUFHOzs7S0FFSixpQ0FDZ0I7TUFBZixVQUFDLFFBQU0sSUFBRSxDQUFHO01BQ1osVUFBQyxXQUFTLElBQUUsQ0FBRyxLQUFLLEtBQUssS0FBSztNQUM5QixVQUFDLDZCQUFlO01BQ2hCLFVBQUMsWUFBVSxJQUFFLENBQUcsS0FBSyxLQUFLLEtBQUssS0FBSztNQUNwQyxVQUFDLCtCQUFpQjtNQUNsQixVQUFDLFlBQVUsSUFBRSxDQUFHLEtBQUssS0FBSyxLQUFLLEtBQUs7TUFDcEMsVUFBQyxjQUFZLElBQUUsQ0FBRyxLQUFLLEtBQUssS0FBSyxLQUFLLEtBQUssS0FBSzs7O3lCQUMzQyxpQkFBZ0IsU0FBQSxLQUNJO01BQXpCLFdBQU87TUFDUCxVQUFNO2dEQUNELElBQUssNEJBQXNCLEtBQUs7S0FBQTs7OztrQkFFdEMsU0FBZ0IsS0FBWSxPQUNnQjtzQkFEdkI7OEJBQWMsSUFBRTtJQUNyQyxvQkFBTztvQkFBQSxTQUFBLEtBQUssT0FDTTs7T0FBWixRQUFBO09BQ0osWUFBQSxTQUFBLElBQ087ZUFBTixJQUFFO09BQUEsT0FFQztRQUFILGtCQUFZLEtBQUE7UUFDWiwyQkFBbUIsS0FBSyxpQkFBUTt3QkFBQSxTQUFBLEVBQ0M7aUJBQWhDLFlBQVUsVUFBRSxLQUFLO1NBQUE7O2VBQ2xCLFNBQVEsV0FBUyxxQkFBa0IsU0FBQSxFQUNDO2dCQUNuQyxJQUFLLElBQUksWUFBVyxPQUFHLE9BQU8sQ0FBRSxLQUFPLFNBQUEsSUFDRztpQkFBekMsT0FBRyxDQUFFLEdBQUk7U0FBQTtRQUFBO09BQUE7TUFBQTtLQUFBOztxQ0FaYixZQUFFLElBQUksU0FhUCxJQUFLLFlBQVEsTUFBTyxJQUFJLE9BQU87OztFQWxFakMsc0NBQUEiLCJmaWxlIjoibWV0YS9kZW1vL21ha2Utd29yZC1mcm9tLWJsb2Nrcy5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9