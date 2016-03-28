"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector = function () {
    function Vector() {
        var init = arguments.length <= 0 || arguments[0] === undefined ? [1, 0, 0, 0] : arguments[0];

        var _array = arguments.length <= 1 || arguments[1] === undefined ? Float32Array.from(init) : arguments[1];

        _classCallCheck(this, Vector);

        this._array = _array;
    }

    _createClass(Vector, [{
        key: "clone",
        value: function clone() {
            return new Vector(this._array);
        }
    }, {
        key: "add",
        value: function add(v) {
            var a = this._array;
            var b = v._array;
            return new Vector([a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3]]);
        }
    }, {
        key: "sub",
        value: function sub(v) {
            var a = this._array;
            var b = v._array;
            return new Vector([a[0] - b[0], a[1] - b[1], a[2] - b[2], a[3] - b[3]]);
        }
    }, {
        key: "scale",
        value: function scale(s) {
            var v = Vector.xyz(0, 0, 0);
            this.scalei(s, v);
            return v;
        }
    }, {
        key: "scalei",
        value: function scalei(s, i) {
            var v = this._array;
            i.set(v[0] * s, v[1] * s, v[2] * s, v[3] * s);
        }
    }, {
        key: "normalizei",
        value: function normalizei() {
            var a = this._array;
            var l = this.length;
            this.set(a[0] / l, a[1] / l, a[2] / l, a[3] / l);
        }
    }, {
        key: "normalize",
        value: function normalize() {
            var n = new Vector(this._array);
            n.normalizei();
            return n;
        }
    }, {
        key: "dot",
        value: function dot(v) {
            var a = this._array;
            var b = v._array;
            return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
        }
    }, {
        key: "cross",
        value: function cross(v) {
            var a = this._array;
            var a0 = a[0];
            var a1 = a[1];
            var a2 = a[2];
            var b = v._array;
            var b0 = b[0];
            var b1 = b[1];
            var b2 = b[2];
            return new Vector([a1 * b2 - a2 * b1, a2 * b0 - a0 * b2, a0 * b1 - a1 * b0, 0]);
        }
    }, {
        key: "toArray",
        value: function toArray() {
            var a = this._array;
            return [a[0], a[1], a[2], a[3]];
        }
    }, {
        key: "set",
        value: function set(x, y, z) {
            var w = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

            this._array[0] = x;
            this._array[1] = y;
            this._array[2] = z;
            this._array[3] = w;
            return this;
        }
    }, {
        key: "length",
        get: function get() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        }
    }, {
        key: "x",
        get: function get() {
            return this._array[0];
        }
    }, {
        key: "y",
        get: function get() {
            return this._array[1];
        }
    }, {
        key: "z",
        get: function get() {
            return this._array[2];
        }
    }, {
        key: "w",
        get: function get() {
            return this._array[3];
        }
    }], [{
        key: "xyz",
        value: function xyz(x, y, z) {
            return new Vector([x, y, z, 1]);
        }
    }, {
        key: "Zero",
        get: function get() {
            return Vector._Zero;
        }
    }, {
        key: "I",
        get: function get() {
            return Vector._I;
        }
    }, {
        key: "J",
        get: function get() {
            return Vector._J;
        }
    }, {
        key: "K",
        get: function get() {
            return Vector._K;
        }
    }]);

    return Vector;
}();

Vector._Zero = new Vector([0, 0, 0, 0]);
Vector._I = new Vector();
Vector._J = new Vector([0, 1, 0, 0]);
Vector._K = new Vector([0, 0, 1, 0]);
exports.Vector = Vector;
//# sourceMappingURL=vector.js.map