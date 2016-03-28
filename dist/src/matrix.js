"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var vector_1 = require('./vector');

var Matrix = function () {
    function Matrix() {
        var init = arguments.length <= 0 || arguments[0] === undefined ? [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] : arguments[0];

        var _array = arguments.length <= 1 || arguments[1] === undefined ? Float32Array.from(init) : arguments[1];

        _classCallCheck(this, Matrix);

        this._array = _array;
    }

    _createClass(Matrix, [{
        key: "set",
        value: function set(x, y, v) {
            this._array[x + y * 4] = v;
            return this;
        }
    }, {
        key: "get",
        value: function get(x, y) {
            return this._array[x + y * 4];
        }
    }, {
        key: "setArray",
        value: function setArray(n) {
            this._array[0] = n[0];
            this._array[1] = n[1];
            this._array[2] = n[2];
            this._array[3] = n[3];
            this._array[4] = n[4];
            this._array[5] = n[5];
            this._array[6] = n[6];
            this._array[7] = n[7];
            this._array[8] = n[8];
            this._array[9] = n[9];
            this._array[10] = n[10];
            this._array[11] = n[11];
            this._array[12] = n[12];
            this._array[13] = n[13];
            this._array[14] = n[14];
            this._array[15] = n[15];
            return this;
        }
    }, {
        key: "clone",
        value: function clone() {
            return new Matrix(this._array);
        }
    }, {
        key: "mmul",
        value: function mmul(m) {
            var a = this._array;
            var a00 = a[0];
            var a01 = a[1];
            var a02 = a[2];
            var a03 = a[3];
            var a10 = a[4];
            var a11 = a[5];
            var a12 = a[6];
            var a13 = a[7];
            var a20 = a[8];
            var a21 = a[9];
            var a22 = a[10];
            var a23 = a[11];
            var a30 = a[12];
            var a31 = a[13];
            var a32 = a[14];
            var a33 = a[15];
            var b = m._array;
            var b00 = b[0];
            var b01 = b[1];
            var b02 = b[2];
            var b03 = b[3];
            var b10 = b[4];
            var b11 = b[5];
            var b12 = b[6];
            var b13 = b[7];
            var b20 = b[8];
            var b21 = b[9];
            var b22 = b[10];
            var b23 = b[11];
            var b30 = b[12];
            var b31 = b[13];
            var b32 = b[14];
            var b33 = b[15];
            return new Matrix([a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30, a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31, a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32, a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33, a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30, a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31, a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32, a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33, a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30, a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31, a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32, a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33, a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30, a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31, a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32, a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33]);
        }
    }, {
        key: "vmul",
        value: function vmul(v) {
            var i = vector_1.Vector.xyz(0, 0, 0);
            this.vmuli(v, i);
            return i;
        }
    }, {
        key: "vmuli",
        value: function vmuli(v, i) {
            var a = this._array;
            var a00 = a[0];
            var a01 = a[1];
            var a02 = a[2];
            var a03 = a[3];
            var a10 = a[4];
            var a11 = a[5];
            var a12 = a[6];
            var a13 = a[7];
            var a20 = a[8];
            var a21 = a[9];
            var a22 = a[10];
            var a23 = a[11];
            var a30 = a[12];
            var a31 = a[13];
            var a32 = a[14];
            var a33 = a[15];
            var b = v._array;
            var bx = b[0];
            var by = b[1];
            var bz = b[2];
            var bw = b[3];
            i.set(a00 * bx + a01 * by + a02 * bz + a03 * bw, a10 * bx + a11 * by + a12 * bz + a13 * bw, a20 * bx + a21 * by + a22 * bz + a23 * bw, a30 * bx + a31 * by + a32 * bz + a33 * bw);
        }
    }, {
        key: "toArray",
        value: function toArray() {
            return [Array.from(this._array.subarray(0, 4)), Array.from(this._array.subarray(4, 8)), Array.from(this._array.subarray(8, 12)), Array.from(this._array.subarray(12, 16))];
        }
    }], [{
        key: "diag",
        value: function diag(a, b, c, d) {
            return new Matrix([a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 0, 0, 0, 0, d]);
        }
    }, {
        key: "from",
        value: function from(n) {
            return new Matrix(n);
        }
    }, {
        key: "pitchYawRoll",
        value: function pitchYawRoll(xyzEuler) {
            var pitch = xyzEuler.x;
            var yaw = xyzEuler.y;
            var roll = xyzEuler.z;
            var cp = Math.cos(pitch);
            var sp = Math.sin(pitch);
            var cy = Math.cos(yaw);
            var sy = Math.sin(yaw);
            var cr = Math.cos(roll);
            var sr = Math.sin(roll);
            /*
             return new Matrix([
                   1,  0,   0, 0,
                   0, cp, -sp, 0,
                   0, sp,  cp, 0,
                   0,  0,   0, 1])
               .mmul(new Matrix([
                  cy,  0,  sy, 0,
                   0,  1,   0, 0,
                 -sy,  0,  cy, 0,
                   0,  0,   0, 1]))
               .mmul(new Matrix([
                  cr, -sr,  0, 0,
                  sr,  cr,  0, 0,
                   0,   0,  1, 0,
                   0,   0,  0, 1]));
                   */
            return new Matrix([cy * cr, cp * sr + sp * sy * cr, sp * sr - cp * sy * cr, 0, -cy * sr, cp * cr - sp * sy * sr, sp * cr + cp * sy * sr, 0, sy, -sp * cy, cp * cy, 0, 0, 0, 0, 1]);
        }
    }, {
        key: "translation",
        value: function translation(p) {
            return new Matrix([1, 0, 0, p.x, 0, 1, 0, p.y, 0, 0, 1, p.z, 0, 0, 0, 1]);
        }
    }, {
        key: "lookAt",
        value: function lookAt(p, t) {
            var u = arguments.length <= 2 || arguments[2] === undefined ? vector_1.Vector.xyz(0, 1, 0) : arguments[2];

            var zaxis = t.sub(p).normalize();
            var xaxis = u.cross(zaxis).normalize();
            var yaxis = zaxis.cross(xaxis).normalize();
            /*
            return Matrix.from([
                1, 0, 0, 0,
                0, 1, 0, 0,
                0, 0, 1, 0,
                -p.x, -p.y, -p.z, 1
            ]).mmul(Matrix.from([
                xaxis.x, xaxis.y, xaxis.z, 0,
                yaxis.x, yaxis.y, yaxis.z, 0,
                zaxis.x, yaxis.y, zaxis.z, 0,
                0, 0, 0, 1
            ]));
            */
            var zdotp = zaxis.dot(p);
            var ydotp = yaxis.dot(p);
            var xdotp = xaxis.dot(p);
            return Matrix.from([xaxis.x, yaxis.x, zaxis.x, 0, xaxis.y, yaxis.y, zaxis.y, 0, xaxis.z, yaxis.z, zaxis.z, 0, p.x, p.y, p.z, 1]);
            /* */
        }
    }, {
        key: "Identity",
        get: function get() {
            return Matrix._I;
        }
    }]);

    return Matrix;
}();

Matrix._I = new Matrix();
exports.Matrix = Matrix;
//# sourceMappingURL=matrix.js.map