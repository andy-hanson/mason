"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../methods","./Kind","./Type","../compare"],(exports,methods_0,Kind_1,Type_2,compare_3)=>{
	exports._get=_ms.lazy(()=>{
		const _$2=_ms.getModule(methods_0),sub=_ms.get(_$2,"sub"),_$3=_ms.getModule(Kind_1),kind_33=_ms.get(_$3,"kind!"),Type=_ms.getDefaultExport(Type_2),_$4=_ms.getModule(Type_2),contains_63=_ms.get(_$4,"contains?"),_$6=_ms.lazyGetModule(compare_3),_61_63=_ms.lazyProp(_$6,"=?");
		const Alias_45Type=(()=>{
			const _=class Alias_45Type{
				constructor(params){
					Object.assign(this,params);
					_ms.assert(_ms.contains,String,this.name);
					_ms.assert(_ms.contains,Type,this["alias-of"])
				}
				[_ms.symbol(contains_63)](value){
					const _this=this;
					return contains_63(_this["alias-of"],value)
				}
				[_ms.symbol(sub)](){
					const _this=this;
					const args=[].slice.call(arguments,0);
					return sub(_this["alias-of"],...args)
				}
			};
			kind_33(_,Type);
			return _
		})();
		_ms.newProperty(Alias_45Type,"test",()=>{
			const A=new (Alias_45Type)((()=>{
				const built={};
				const alias_45of=built["alias-of"]=String;
				return _ms.setName(built,"A")
			})());
			_ms.assert(contains_63,A,`0`);
			_ms.assertNot(_ms.unlazy(_61_63),A,String)
		});
		const name=exports.name=`Alias-Type`;
		exports.default=Alias_45Type;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvbWFzb24zL21zbC9zcmMvVHlwZS9BbGlhcy1UeXBlLm1zIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0VBT0EsbUJBQ2lCLEtBSWI7U0FESDtnQkFJVyxPQUNNO0tBQWhCLGNBQWMsS0FBSzs2QkFDTCxPQUFOOzZCQUNVLEtBQVY7O2dCQUVULGNBQVcsTUFDSztXQVFYO1lBUkosWUFRSSxrQkFSZ0I7SUFBQTtnQkFFckIsT0FDWTtXQUtQOztZQUFKLElBQUksa0JBQVUsR0FBQTtJQUFBO0dBQUE7R0FqQmQsUUFBTSxFQUFFO1VBRFQ7RUFBQTtrQkFxQkQsb0JBQ29CLElBQUE7R0FBbkIsUUFBSSxLQUFJLGNBQ1UsS0FBQTs7SUFBakIsbUNBQVU7OztjQUNILFlBQVUsRUFBRztvQ0FDVixFQUFFO0VBQUE7RUFwQ2Qsd0JBQUE7a0JBT0EiLCJmaWxlIjoiVHlwZS9BbGlhcy1UeXBlLmpzIiwic291cmNlUm9vdCI6Ii4vc3JjIn0=