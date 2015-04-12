if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	const bool = _ms.bool;
	const unlazy = _ms.unlazy;
	const
	// js.ms
	iNew = function (ctr, a, b, c) {
		// TODO:ES6 return new ctr(...args)
		switch (arguments.length) {
			case 0:
				throw new Error("`new` needs a constructor.");
			case 1:
				return new ctr();
			case 2:
				return new ctr(a);
			case 3:
				return new ctr(a, b);
			case 4:
				return new ctr(a, b, c);
			default:
				throw new Error("This many arguments not supported.");
		}
	},
	     

	// Bool.ms
	// TODO:ES6 ...args
	iAnd = function () {
		const args = arguments;
		switch (args.length) {
			case 0:
				return true;
			case 1:
				return bool(args[0]);
			case 2:
				return bool(args[0]) && bool(unlazy(args[1]));
			case 3:
				return bool(args[0]) && bool(unlazy(args[1])) && bool(unlazy(args[2]));
			default:
				if (!bool(args[0])) return false;
				for (let i = 1; i < args.length; i = i + 1) if (!bool(unlazy(args[i]))) return false;
				return true;
		}
	},
	     
	// TODO:ES6 (...args) => {
	iOr = function () {
		const args = arguments;
		switch (args.length) {
			case 0:
				return false;
			case 1:
				return bool(args[0]);
			case 2:
				return bool(args[0]) || bool(unlazy(args[1]));
			case 3:
				return bool(args[0]) || bool(unlazy(args[1])) || bool(unlazy(args[2]));
			default:
				if (bool(args[0])) return true;
				for (let i = 1; i < args.length; i = i + 1) if (bool(unlazy(args[i]))) return true;
				return true;
		}
	},
	     

	// Kind.ms
	KindContains = function (kind, _) {
		return _ != null && _[kind["symbol-for-isa"]] !== undefined;
	},
	      isEmpty = function (array) {
		return array.length === 0;
	},
	     

	// Generator.ms
	eachGenerator = function* (iter, doEach) {
		for (let em of iter) yield* doEach(em);
	},
	     

	// Try.ms
	ohNo = function (error) {
		throw makeError(error);
	},
	      alwaysDoAfter = function (tried, finallyDo) {
		try {
			return tried();
		} finally {
			finallyDo();
		}
	},
	      iTry = function (Success, tried) {
		try {
			return Success(tried());
		} catch (e) {
			return e;
		}
	},
	      makeError = function (error) {
		let err;
		try {
			err = _ms.unlazy(error);
		} catch (e) {
			return makeError(e)
			// TODO: return new Error ('Error making error: ' + e.message)
			;
		}
		if (err instanceof Error) return err;else if (typeof err === "string") return new Error(err);else if (err === undefined) return new Error("Oh no!");else throw new Error("Argument to `oh-no!` must be Error or String");
	},
	     

	// Array.ms
	// TODO:ES6 Shouldn't need this.
	arrayIterator = function* (_) {
		for (let i = 0; i < _.length; i = i + 1) yield _[i];
	},
	     

	// show.ms
	newSet = function () {
		return new global.Set();
	},
	     

	// Hash-Map.ms
	makeMap = function (hm, assoc, args) {
		let i = 0;
		while (i < args.length) {
			const key = args[i];
			i = i + 1;
			const val = args[i];
			i = i + 1;
			assoc(hm, key, val);
		}
	},
	     

	// Obj-Type.ms and Method.ms and Wrap-Type.ms
	buildStr = function (builder) {
		let s = "";
		builder(function (str) {
			s = s + str + "\n";
		});
		return s;
	},
	     
	// Obj-Type.ms
	addOne = function (_) {
		return _ + 1;
	},
	     

	// perf-test.ms
	timeStar = function (times, timeMe) {
		let i = times;
		const out = [];
		while (i > 0) {
			i = i - 1;
			out.push(timeMe(i));
		}
		return out;
	},
	     

	// Fun.ms
	// TODO:ES6 (f, ...args) => Function.prototype.bind.call(f, null, ...args)
	iCurry = function (f) {
		return Function.prototype.bind.apply(f, arguments);
	};
	exports.iNew = iNew;
	exports.iAnd = iAnd;
	exports.iOr = iOr;
	exports.KindContains = KindContains;
	exports.isEmpty = isEmpty;
	exports.eachGenerator = eachGenerator;
	exports.ohNo = ohNo;
	exports.alwaysDoAfter = alwaysDoAfter;
	exports.iTry = iTry;
	exports.makeError = makeError;
	exports.arrayIterator = arrayIterator;
	exports.newSet = newSet;
	exports.makeMap = makeMap;
	exports.buildStr = buildStr;
	exports.addOne = addOne;
	exports.timeStar = timeStar;
	exports.iCurry = iCurry;
});
//# sourceMappingURL=../private/js-impl.js.map