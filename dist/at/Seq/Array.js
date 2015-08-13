"use strict";
if((typeof define!=="function"))var define=require("amdefine")(module);
define(["exports","../../compare","../../js","../../math/Number","../../Type/Kind","../../Type/Method","../../Type/Type","../at","../at-Type","../Set/Set","./Seq","../../math/Number","../../compare","../../Function","../../math/Number"],(exports,compare_0,js_1,Number_2,Kind_3,Method_4,Type_5,_64_6,_64_45Type_7,Set_8,Seq_9,Number_10,compare_11,Function_12,Number_13)=>{
	exports._get=_ms.lazy(()=>{
		const _$4=_ms.getModule(compare_0),_60_61_63=_ms.get(_$4,"<=?"),_60_63=_ms.get(_$4,"<?"),_$5=_ms.getModule(js_1),js_45set=_ms.get(_$5,"js-set"),js_45sub=_ms.get(_$5,"js-sub"),_$6=_ms.getModule(Number_2),incr=_ms.get(_$6,"incr"),_$7=_ms.getModule(Kind_3),kind_33=_ms.get(_$7,"kind!"),self_45kind_33=_ms.get(_$7,"self-kind!"),_$8=_ms.getModule(Method_4),impl_33=_ms.get(_$8,"impl!"),self_45impl_33=_ms.get(_$8,"self-impl!"),_$9=_ms.getModule(Type_5),_61_62=_ms.get(_$9,"=>"),_64=_ms.getDefaultExport(_64_6),_$10=_ms.getModule(_64_6),_45_45_33=_ms.get(_$10,"--!"),count=_ms.get(_$10,"count"),empty_33=_ms.get(_$10,"empty!"),empty_63=_ms.get(_$10,"empty?"),_64_45Type=_ms.getDefaultExport(_64_45Type_7),_$11=_ms.getModule(_64_45Type_7),empty=_ms.get(_$11,"empty"),from_45stream=_ms.get(_$11,"from-stream"),Set=_ms.getDefaultExport(Set_8),Seq=_ms.getDefaultExport(Seq_9),_$13=_ms.getModule(Seq_9),_60_43_43_33=_ms.get(_$13,"<++!"),_43_43_62_33=_ms.get(_$13,"++>!"),indexes=_ms.get(_$13,"indexes"),_63nth=_ms.get(_$13,"?nth"),_63_60pop_33=_ms.get(_$13,"?<pop!"),_63pop_62_33=_ms.get(_$13,"?pop>!"),set_45nth_33=_ms.get(_$13,"set-nth!"),_$15=_ms.lazyGetModule(Number_10),Nat=_ms.lazyProp(_$15,"Nat"),_$17=_ms.lazyGetModule(compare_11),_61_63=_ms.lazyProp(_$17,"=?"),_$18=_ms.lazyGetModule(Function_12),identity=_ms.lazyProp(_$18,"identity"),_$19=_ms.lazyGetModule(Number_13),divisible_63=_ms.lazyProp(_$19,"divisible?");
		self_45kind_33(Array,_64_45Type);
		self_45impl_33(empty,Array,()=>{
			return []
		});
		self_45impl_33(from_45stream,Array,stream=>{
			const arr=[];
			for(let _ of stream){
				arr.push(_)
			};
			return arr
		});
		kind_33(Array,Seq);
		impl_33(count,Array,function(){
			const _this=this;
			return _this.length
		});
		impl_33(_63nth,Array,function(n){
			const _this=this;
			return _60_63(n,count(_this))?_ms.some((()=>{
				return js_45sub(_this,n)
			})()):_ms.None
		});
		impl_33(_60_43_43_33,Array,function(added){
			const _this=this;
			_ms.checkContains(_64,added,"added");
			return Array.prototype.unshift.apply(_this,_61_62(Array,added))
		});
		impl_33(_43_43_62_33,Array,function(added){
			const _this=this;
			_ms.checkContains(_64,added,"added");
			return Array.prototype.push.apply(_this,_61_62(Array,added))
		});
		impl_33(_63_60pop_33,Array,function(){
			const _this=this;
			return empty_63(_this)?_ms.None:_ms.some((()=>{
				return _this.shift()
			})())
		});
		impl_33(_63pop_62_33,Array,function(){
			const _this=this;
			return empty_63(_this)?_ms.None:_ms.some((()=>{
				return _this.pop()
			})())
		});
		impl_33(empty_33,Array,function(){
			const _this=this;
			for(;;){
				if(empty_63(_this)){
					break
				};
				_this.pop()
			}
		});
		impl_33(set_45nth_33,Array,function(n,val){
			const _this=this;
			_ms.checkContains(_ms.unlazy(Nat),n,"n");
			js_45set(_this,n,val)
		});
		impl_33(_45_45_33,Array,function(_64deleted){
			const _this=this;
			_64deleted=_61_62(Set,_64deleted);
			filter_33(_this,em=>{
				return (_=>{
					if(_){
						_45_45_33(_64deleted,[em])
					};
					return _
				})(_ms.contains(_64deleted,em))
			})
		});
		const filter_33=exports["filter!"]=(()=>{
			const built={};
			const test=built.test=function test(){
				const arr=[1,2,3,4,5];
				filter_33(arr,_=>{
					return _ms.unlazy(divisible_63)(_,2)
				});
				_ms.assert(_ms.unlazy(_61_63),arr,[2,4])
			};
			return _ms.set(function filter_33(arr,keep_45if_63){
				let read_45idx=0;
				let write_45idx=0;
				for(;;){
					if(_60_61_63(arr.length,read_45idx)){
						break
					};
					const here=_ms.sub(arr,read_45idx);
					if(keep_45if_63(here)){
						set_45nth_33(arr,write_45idx,here);
						write_45idx=incr(write_45idx)
					};
					read_45idx=incr(read_45idx)
				};
				arr.length=write_45idx
			},built)
		})();
		const fill=exports.fill=(()=>{
			const built={};
			const doc=built.doc=`Creates a new Array by calling \`filler\` on each number from zero to \`count\`.`;
			const test=built.test=function test(){
				const built=new (global.Map)();
				_ms.assoc(built,[3,_ms.unlazy(identity)],[0,1,2]);
				return built
			};
			return _ms.set(function fill(count,filler){
				_ms.checkContains(Number,count,"count");
				_ms.checkContains(Function,filler,"filler");
				return (_=>{
					for(let i of indexes(_)){
						set_45nth_33(_,i,filler(i))
					};
					return _
				})(new (Array)(count))
			},built)
		})();
		const name=exports.name=`Array`;
		return exports
	})
})
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvcHJvZ3JhbW1pbmcvbWFzb24zL21hc29uL3NyYy9AL1NlcS9BcnJheS5tcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztFQW9CQSxlQUFXLE1BQU07RUFDakIsZUFBVyxNQUFNLE1BQ08sSUFBQTtVQUF2QjtFQUFBO0VBQ0QsZUFBVyxjQUFZLE1BQU8sUUFDTTtHQUFuQyxVQUFNO0dBQ0QsUUFBQSxLQUFBLE9BQ007SUFBVixTQUFTO0dBQUE7VUFDVjtFQUFBO0VBR0QsUUFBTSxNQUFNO0VBRVosUUFBTSxNQUFNLE1BQ1EsVUFBQTtTQTJDWDtVQUFBOztFQXpDVCxRQUFNLE9BQUssTUFBUSxTQUFBLEVBQ0M7U0F3Q1g7VUF4Q0wsT0FBRyxFQUFHLE1Bd0NELHNCQXZDWTtXQUFuQixTQXVDTyxNQXZDSztHQUFBOztFQUVkLFFBQU0sYUFBSyxNQUFRLFNBQUEsTUFDTztTQW9DakI7cUJBckNnQjtVQUV4Qiw4QkFtQ1EsTUFuQzRCLE9BQUcsTUFBTTtFQUFBO0VBRTlDLFFBQU0sYUFBSyxNQUFRLFNBQUEsTUFDTztTQWdDakI7cUJBakNnQjtVQUV4QiwyQkErQlEsTUEvQnlCLE9BQUcsTUFBTTtFQUFBO0VBRTNDLFFBQU0sYUFBTyxNQUNRLFVBQUE7U0E0Qlo7VUE1QkQsU0E0QkMsOEJBM0JVO1dBMkJWOzs7RUF6QlQsUUFBTSxhQUFPLE1BQ1EsVUFBQTtTQXdCWjtVQXhCRCxTQXdCQyw4QkF2QlU7V0F1QlY7OztFQXJCVCxRQUFNLFNBQU8sTUFDUyxVQUFBO1NBb0JiO0dBakJKLE9BQUE7SUFBSCxHQUFJLFNBaUJHLE9BaEJRO0tBQWQ7SUFBQTtJQWdCTTs7O0VBYlQsUUFBTSxhQUFTLE1BQVMsU0FBQSxFQUFNLElBQ0c7U0FZeEI7O0dBWlIsU0FZUSxNQVpJLEVBQUU7RUFBQTtFQVVmLFFBQU0sVUFBSSxNQUFTLFNBQUEsV0FDUTtTQUNsQjtjQURJLE9BQUcsSUFBSTtHQUNuQixVQUFRLE1BQU0sSUFDRTtXQUFWLElBQ1c7S0FBZixHQUFJLEVBQ0M7TUFDSixVQUFJLFdBQVMsQ0FBRTtLQUFBOztvQkFIVCxXQUFIO0dBQUE7RUFBQTtFQU1QLG1DQUNRLEtBQUE7O0dBQVAsc0JBQ1EsZUFBQTtJQUFQLFVBQU0sQ0FBRSxFQUFFLEVBQUUsRUFBRSxFQUFFO0lBQ2hCLFVBQVEsSUFBSyxHQUNDO3FDQUFGLEVBQUU7SUFBQTtrQ0FDSCxJQUFJLENBQUUsRUFBRTtHQUFBO2tCQUVsQixtQkFBQSxJQUFJLGFBQ1E7SUFBYixlQUFhO0lBQ2IsZ0JBQWM7SUFHVixPQUFBO0tBQUgsR0FBSSxVQUFJLFdBQVcsWUFDUTtNQUExQjtLQUFBO0tBRUQsbUJBQU8sSUFBSTtLQUNYLEdBQUksYUFBUyxNQUNJO01BQ2hCLGFBQVMsSUFBSSxZQUFVO2tCQUNWLEtBQUs7S0FBQTtnQkFFUCxLQUFLO0lBQUE7SUFFbEIsV0FBYztHQUFBOztFQUVoQix3QkFDSyxLQUFBOztHQUFKLG9CQUNDO0dBQ0Qsc0JBQ08sZUFBQTs7b0JBQU4sQ0FBRSx3QkFBZ0IsQ0FBRSxFQUFFLEVBQUU7OztrQkFDeEIsY0FBQSxNQUFhLE9BQ2U7c0JBRHRCO3NCQUFjO1dBQ2YsSUFDZTtLQUFkLFFBQUEsS0FBSyxRQUFPLEdBQ0M7TUFDakIsYUFBUyxFQUFFLEVBQUcsT0FBTztLQUFBOztPQUhsQixLQUFJLE9BQU07R0FBQTs7RUFsSGpCLHdCQUFBIiwiZmlsZSI6ImF0L1NlcS9BcnJheS5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYyJ9