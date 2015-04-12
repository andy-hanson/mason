if (typeof define !== 'function') var define = require('amdefine')(module);define(["exports", "module", "esast/dist/Loc", "q-io/fs", "path", "../Expression", "../private/Cx", "../private/Opts", "../private/transpile/transpile", "../private/render", "../private/U/Bag", "../private/Vr"], function (exports, module, _esastDistLoc, _qIoFs, _path, _Expression, _privateCx, _privateOpts, _privateTranspileTranspile, _privateRender, _privateUBag, _privateVr) {
	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var singleCharLoc = _esastDistLoc.singleCharLoc;
	var StartPos = _esastDistLoc.StartPos;

	var fs = _interopRequire(_qIoFs);

	var relative = _path.relative;
	var BlockDo = _Expression.BlockDo;
	var ELiteral = _Expression.ELiteral;
	var ListSimple = _Expression.ListSimple;
	var Module = _Expression.Module;
	var ModuleDefaultExport = _Expression.ModuleDefaultExport;

	var Cx = _interopRequire(_privateCx);

	var OptsFromObject = _privateOpts.OptsFromObject;

	var transpile = _interopRequire(_privateTranspileTranspile);

	var render = _interopRequire(_privateRender);

	var flatMap = _privateUBag.flatMap;
	var emptyVr = _privateVr.emptyVr;

	// Searches a directory and creates a module whose default export is
	// a list of the paths of every module in that directory, relative to it.

	module.exports = function (dirPath, opts) {
		return fs.listTree(dirPath).then(function (files) {
			const ext = ".js";
			const moduleFiles = flatMap(files, function (f) {
				if (!f.endsWith(ext)) return [];
				if (opts.exclude && opts.exclude.test(f)) return [];
				const noExt = f.slice(0, f.length - ext.length);
				return ["./" + relative(dirPath, noExt)];
			}).sort();
			// Dummy Loc. We will not use source maps.
			const loc = singleCharLoc(StartPos);
			const val = ListSimple(loc, moduleFiles.map(function (f) {
				return ELiteral(loc, f, String);
			}));
			const e = Module(loc, [], [], [], BlockDo(loc, [ModuleDefaultExport(loc, val)]));

			const cx = new Cx(OptsFromObject({
				includeSourceMap: false,
				includeModuleDisplayName: false
			}));
			const ast = transpile(cx, e, emptyVr());
			return render(cx, ast);
		});
	};
});
//# sourceMappingURL=../../../meta/compile/node-only/list-modules.js.map