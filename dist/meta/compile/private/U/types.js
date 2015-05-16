if (typeof define !== 'function') var define = require('amdefine')(module);define(['exports', 'esast/dist/mangle-identifier', './util'], function (exports, _esastDistMangleIdentifier, _util) {
	'use strict';

	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	exports.ObjType = ObjType;

	function _interopRequire(obj) { return obj && obj.__esModule ? obj['default'] : obj; }

	var _mangle = _interopRequire(_esastDistMangleIdentifier);

	function ObjType(name, superType, members) {
		(0, _util.type)(name, String, superType, Object, members, Object);
		const prototype = Object.create(superType.prototype);
		Object.keys(members).forEach(function (key) {
			return (0, _util.type)(members[key], Object);
		});

		let s = 'return function ' + (0, _mangle)(name) + '(props) { const _ = Object.create(prototype);';
		Object.keys(members).forEach(function (member) {
			s = s + ('_["' + member + '"] = props["' + member + '"];');
		});
		s = s + 'return _}';
		const theType = Function('prototype', s)(prototype);

		theType.toString = function () {
			return name;
		};
		theType.prototype = prototype;
		Object.assign(theType.prototype, {
			constructor: theType,
			toString: inspect
		});

		return theType;
	}

	function inspect() {
		var _this = this;

		let s = '' + this.constructor.name + ' {';
		Object.keys(this).forEach(function (key) {
			const val = _this[key];
			const str = val instanceof Array ? val.join(',\n') : toStr(val);
			s = s + ('\n\t' + key + ': ' + indented(str));
		});
		return s + '\n}';
	}

	const indented = function (str) {
		return str.replace(/\n/g, '\n\t');
	},
	      toStr = function (_) {
		return _ === null ? 'null' : _ === undefined ? 'undefined' : _.toString();
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGEvY29tcGlsZS9wcml2YXRlL1UvdHlwZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O1NBR2dCLE9BQU8sR0FBUCxPQUFPOzs7Ozs7QUFBaEIsVUFBUyxPQUFPLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUU7QUFDakQsWUFIUSxJQUFJLEVBR1AsSUFBSSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQTtBQUN0RCxRQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQTtBQUNwRCxRQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUc7VUFBSSxVQUw1QixJQUFJLEVBSzZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLENBQUM7R0FBQSxDQUFDLENBQUE7O0FBRS9ELE1BQUksQ0FBQyx3QkFBc0IsYUFBTyxJQUFJLENBQUMsa0RBQStDLENBQUE7QUFDdEYsUUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxNQUFNLEVBQUk7QUFDdEMsSUFBQyxHQUFHLENBQUMsWUFBUyxNQUFNLG9CQUFlLE1BQU0sU0FBSyxDQUFBO0dBQzlDLENBQUMsQ0FBQTtBQUNGLEdBQUMsR0FBRyxDQUFDLEdBQUcsV0FBVyxDQUFBO0FBQ25CLFFBQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUE7O0FBRW5ELFNBQU8sQ0FBQyxRQUFRLEdBQUc7VUFBTSxJQUFJO0dBQUEsQ0FBQTtBQUM3QixTQUFPLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQTtBQUM3QixRQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUU7QUFDaEMsY0FBVyxFQUFFLE9BQU87QUFDcEIsV0FBUSxFQUFFLE9BQU87R0FDakIsQ0FBQyxDQUFBOztBQUVGLFNBQU8sT0FBTyxDQUFBO0VBQ2Q7O0FBRUQsVUFBUyxPQUFPLEdBQUc7OztBQUNsQixNQUFJLENBQUMsUUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksT0FBSSxDQUFBO0FBQ3BDLFFBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsR0FBRyxFQUFJO0FBQ2hDLFNBQU0sR0FBRyxHQUFHLE1BQUssR0FBRyxDQUFDLENBQUE7QUFDckIsU0FBTSxHQUFHLEdBQUcsR0FBRyxZQUFZLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUMvRCxJQUFDLEdBQUcsQ0FBQyxhQUFVLEdBQUcsVUFBSyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUUsQ0FBQTtHQUN0QyxDQUFDLENBQUE7QUFDRixTQUFPLENBQUMsR0FBRyxLQUFLLENBQUE7RUFDaEI7O0FBRUQsT0FDQyxRQUFRLEdBQUcsVUFBQSxHQUFHO1NBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDO0VBQUE7T0FDNUMsS0FBSyxHQUFHLFVBQUEsQ0FBQztTQUNSLENBQUMsS0FBSyxJQUFJLEdBQUcsTUFBTSxHQUFHLENBQUMsS0FBSyxTQUFTLEdBQUcsV0FBVyxHQUFHLENBQUMsQ0FBQyxRQUFRLEVBQUU7RUFBQSxDQUFBIiwiZmlsZSI6Im1ldGEvY29tcGlsZS9wcml2YXRlL1UvdHlwZXMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWFuZ2xlIGZyb20gJ2VzYXN0L2Rpc3QvbWFuZ2xlLWlkZW50aWZpZXInXG5pbXBvcnQgeyB0eXBlIH0gZnJvbSAnLi91dGlsJ1xuXG5leHBvcnQgZnVuY3Rpb24gT2JqVHlwZShuYW1lLCBzdXBlclR5cGUsIG1lbWJlcnMpIHtcblx0dHlwZShuYW1lLCBTdHJpbmcsIHN1cGVyVHlwZSwgT2JqZWN0LCBtZW1iZXJzLCBPYmplY3QpXG5cdGNvbnN0IHByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJUeXBlLnByb3RvdHlwZSlcblx0T2JqZWN0LmtleXMobWVtYmVycykuZm9yRWFjaChrZXkgPT4gdHlwZShtZW1iZXJzW2tleV0sIE9iamVjdCkpXG5cblx0bGV0IHMgPSBgcmV0dXJuIGZ1bmN0aW9uICR7bWFuZ2xlKG5hbWUpfShwcm9wcykgeyBjb25zdCBfID0gT2JqZWN0LmNyZWF0ZShwcm90b3R5cGUpO2Bcblx0T2JqZWN0LmtleXMobWVtYmVycykuZm9yRWFjaChtZW1iZXIgPT4ge1xuXHRcdHMgPSBzICsgYF9bXCIke21lbWJlcn1cIl0gPSBwcm9wc1tcIiR7bWVtYmVyfVwiXTtgXG5cdH0pXG5cdHMgPSBzICsgJ3JldHVybiBffSdcblx0Y29uc3QgdGhlVHlwZSA9IEZ1bmN0aW9uKCdwcm90b3R5cGUnLCBzKShwcm90b3R5cGUpXG5cblx0dGhlVHlwZS50b1N0cmluZyA9ICgpID0+IG5hbWVcblx0dGhlVHlwZS5wcm90b3R5cGUgPSBwcm90b3R5cGVcblx0T2JqZWN0LmFzc2lnbih0aGVUeXBlLnByb3RvdHlwZSwge1xuXHRcdGNvbnN0cnVjdG9yOiB0aGVUeXBlLFxuXHRcdHRvU3RyaW5nOiBpbnNwZWN0XG5cdH0pXG5cblx0cmV0dXJuIHRoZVR5cGVcbn1cblxuZnVuY3Rpb24gaW5zcGVjdCgpIHtcblx0bGV0IHMgPSBgJHt0aGlzLmNvbnN0cnVjdG9yLm5hbWV9IHtgXG5cdE9iamVjdC5rZXlzKHRoaXMpLmZvckVhY2goa2V5ID0+IHtcblx0XHRjb25zdCB2YWwgPSB0aGlzW2tleV1cblx0XHRjb25zdCBzdHIgPSB2YWwgaW5zdGFuY2VvZiBBcnJheSA/IHZhbC5qb2luKCcsXFxuJykgOiB0b1N0cih2YWwpXG5cdFx0cyA9IHMgKyBgXFxuXFx0JHtrZXl9OiAke2luZGVudGVkKHN0cil9YFxuXHR9KVxuXHRyZXR1cm4gcyArICdcXG59J1xufVxuXG5jb25zdFxuXHRpbmRlbnRlZCA9IHN0ciA9PiBzdHIucmVwbGFjZSgvXFxuL2csICdcXG5cXHQnKSxcblx0dG9TdHIgPSBfID0+XG5cdFx0XyA9PT0gbnVsbCA/ICdudWxsJyA6IF8gPT09IHVuZGVmaW5lZCA/ICd1bmRlZmluZWQnIDogXy50b1N0cmluZygpXG5cbiJdLCJzb3VyY2VSb290IjoiL3NyYyJ9