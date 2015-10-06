"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../at/at","../../at/q","../../at/Seq/Seq"],(exports,_64_0,_63_1,Seq_2)=>{
	exports._get=_ms.lazy(()=>{
		const _64=_ms.getDefaultExport(_64_0),_$0=_ms.getModule(_64_0),_43_43=_ms.get(_$0,"++"),_45_45=_ms.get(_$0,"--"),empty_63=_ms.get(_$0,"empty?"),_64flat_45map_126=_ms.get(_$0,"@flat-map~"),_64keep=_ms.get(_$0,"@keep"),_64map=_ms.get(_$0,"@map"),_64map_126=_ms.get(_$0,"@map~"),_63=_ms.getDefaultExport(_63_1),_$1=_ms.getModule(Seq_2),_63first=_ms.get(_$1,"?first"),tail=_ms.get(_$1,"tail");
		const make_45word_45from_45blocks=exports.default=(()=>{
			return (word,blocks)=>{
				_ms.checkContains(String,word,"word");
				_ms.checkContains(_64,blocks,"blocks");
				const rec=function rec(chars_45left,blocks_45left){
					return (()=>{
						const _=chars_45left;
						if(empty_63(_)){
							return _63([])
						} else {
							const rest_45word=tail(_);
							const this_45char_45blocks=_64keep(blocks_45left,_=>{
								return _ms.contains(_,_ms.sub(chars_45left,0))
							});
							return _63first(_64flat_45map_126(this_45char_45blocks,_=>{
								return _64map_126(rec(rest_45word,_45_45(blocks_45left,[_])),ans=>{
									return _43_43([_],ans)
								})
							}))
						}
					})()
				};
				return _ms.checkContains(_63,rec(word.toUpperCase(),_64map(blocks,_=>{
					return _.toUpperCase()
				})),"res")
			}
		})();
		const name=exports.name=`make-word-from-blocks`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvZ2l0L21hc29uL21zbC9zcmMvbWV0YS9kZW1vL21ha2Utd29yZC1mcm9tLWJsb2Nrcy5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQUtBLGtEQUNzQixLQUFBO1VBMENwQixDQUFHLEtBQVksU0FDd0M7c0JBRC9DO3NCQUFjO0lBQ3RCLFVBQU8sYUFBQSxhQUFXLGNBQ1c7WUFBdkI7TUFBQSxRQUFBO01BQ0osR0FBQSxTQUFBLEdBQ087Y0FBTixJQUFFO01BQUEsT0FFQztPQUFILGtCQUFZLEtBQUE7T0FDWiwyQkFBbUIsUUFBTSxjQUFhLEdBQ0M7NEJBQXhCLFVBQWQsYUFBVztPQUFBO2NBRVosU0FBUSxrQkFBVyxxQkFBa0IsR0FDQztlQUNyQyxXQUFPLElBQUksWUFBVyxPQUFHLGNBQVksQ0FBQyxLQUFNLEtBQ0c7Z0JBQTlDLE9BQUcsQ0FBQyxHQUFHO1FBQUE7T0FBQTtNQUFBO0tBQUE7SUFBQTs2QkFiWCxJQWVELElBQUksbUJBQW9CLE9BQUssT0FBUSxHQUNDO1lBQXJDOzs7O0VBaEVILHdCQUFBIiwiZmlsZSI6Im1ldGEvZGVtby9tYWtlLXdvcmQtZnJvbS1ibG9ja3MuanMiLCJzb3VyY2VSb290IjoiLi9zcmMifQ==