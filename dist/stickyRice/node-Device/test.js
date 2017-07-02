"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var fs = require('fs');

var content = fs.read('data.json');
var data = JSON.parse(content);
console.log('read data:', content);
console.log(typeof data === 'undefined' ? 'undefined' : _typeof(data));
console.log(data);

phantom.exit();
//# sourceMappingURL=test.js.map