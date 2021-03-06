"use strict";

!function (a, b) {
  function c(a) {
    var c = parseFloat(a.designWidth),
        d = parseFloat(a.designUnit),
        h = parseFloat(a.columnCount),
        i = parseFloat(a.columnXUnit),
        j = parseFloat(a.gutterXUnit),
        k = parseFloat(a.edgeXUnit),
        l = a.className || "grid";if (!(a.designWidth && a.designUnit && a.columnCount && a.columnXUnit && a.gutterXUnit && a.edgeXUnit)) throw new Error("参数错误");b.flexible.gridParams = a;for (var m = d / c * 10, n = i * m, o = j * m, p = k * m, q = ["." + l + " {", "box-sizing:content-box;", "padding-left: " + p + "rem;", "padding-right: " + p + "rem;", "margin-left: -" + o + "rem;", "}", "." + l + ":before,", "." + l + ":after{", 'content: " ";', "display: table;", "}", "." + l + ":after {", "clear: both;", "}", "." + l + ' [class^="col-"] {', "margin-left: " + o + "rem;", "float: left;", "}"], r = 1; h >= r; r++) {
      var s = n * r + o * (r - 1);q.push("." + l + " .col-" + r + " {width: " + s + "rem;}");
    }e && e.parentNode && e.parentNode.removeChild(e), e = f.createElement("style"), e.innerHTML = q.join("");var t = f.querySelector("head") || g.firstElementChild || g;t.appendChild(e);
  }function d(a) {
    var b = j[a];if (!b) throw new Error("不支持这个预设模式");c(b);
  }var e,
      f = a.document,
      g = f.documentElement,
      h = f.querySelector('meta[name="grid"]'),
      i = b.flexible || (b.flexible = {}),
      j = { "750-12": { designWidth: 750, designUnit: 6, columnCount: 12, columnXUnit: 7, gutterXUnit: 3, edgeXUnit: 4 }, "750-6": { designWidth: 750, designUnit: 6, columnCount: 6, columnXUnit: 17, gutterXUnit: 3, edgeXUnit: 4 }, "640-12": { designWidth: 640, designUnit: 4, columnCount: 12, columnXUnit: 11, gutterXUnit: 2, edgeXUnit: 3 }, "640-6": { designWidth: 640, designUnit: 4, columnCount: 6, columnXUnit: 24, gutterXUnit: 2, edgeXUnit: 3 } };if (h) {
    var k = h.getAttribute("content");if (k) {
      for (var l, m = /([^=]+)=([\d\.\-]+)/g, n = {}; l = m.exec(k);) {
        n[l[1]] = l[2];
      }n.modeName ? d(n.modeName) : c(n);
    }
  }i.makeGrid = c, i.makeGridMode = d;
}(window, window.lib || (window.lib = {}));
//# sourceMappingURL=makegrid.js.map