/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	var camera_1 = __webpack_require__(1);
	var device_1 = __webpack_require__(4);
	var mesh_1 = __webpack_require__(6);
	var vector_1 = __webpack_require__(3);
	document.addEventListener('DOMContentLoaded', init, false);
	var canvas = void 0;
	var device = void 0;
	var meshes = [].concat(_toConsumableArray(mesh_1.Mesh.Monkey), _toConsumableArray(mesh_1.Mesh.Axes));
	var mera = new camera_1.Camera();
	function init() {
	    canvas = document.getElementsByTagName('canvas')[0];
	    device = new device_1.Device(canvas);
	    mera.position = vector_1.Vector.xyz(1, 2, -8);
	    mera.target = meshes[0].position;
	    requestAnimationFrame(renderLoop);
	}
	var s = 1;
	function renderLoop() {
	    device.reset();
	    device.render(mera, meshes);
	    device.present();
	    meshes[0].rotation = meshes[0].rotation.add(vector_1.Vector.xyz(0.01, 0.01, 0));
	    requestAnimationFrame(renderLoop);
	}
	//# sourceMappingURL=scene.js.map

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var matrix_1 = __webpack_require__(2);
	var vector_1 = __webpack_require__(3);
	var DEG_TO_HALF_RAD = Math.PI / 360;

	var Camera = function () {
	    function Camera() {
	        _classCallCheck(this, Camera);

	        this._position = vector_1.Vector.xyz(0, 0, 60);
	        this._target = vector_1.Vector.Zero;
	        this._fov = 110 * DEG_TO_HALF_RAD;
	        this._aspect = 4 / 3;
	        this._znear = 0.1;
	        this._zfar = 100;
	        this._lookat = matrix_1.Matrix.lookAt(this._position, this._target);
	        this.updateProjection();
	    }

	    _createClass(Camera, [{
	        key: 'buildMatrix',
	        value: function buildMatrix() {
	            this._matrix = this._projection.mmul(this._lookat);
	        }
	    }, {
	        key: 'updateLookat',
	        value: function updateLookat() {
	            this._lookat = matrix_1.Matrix.lookAt(this._position, this._target);
	            this.buildMatrix();
	        }
	    }, {
	        key: 'updateProjection',
	        value: function updateProjection() {
	            var f_n = this._zfar - this._znear;
	            var sy = 1 / Math.tan(this._fov);
	            var sx = sy / this._aspect;
	            var fpn = this._zfar + this._znear;
	            var fn = this._zfar * this._znear;
	            this._projection = new matrix_1.Matrix([sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, -fpn / f_n, 2 * fn / f_n, 0, 0, 1, 0]);
	            this.buildMatrix();
	        }
	    }, {
	        key: 'matrix',
	        get: function get() {
	            return this._matrix;
	        }
	    }, {
	        key: 'projectionMatrix',
	        get: function get() {
	            return this._projection;
	        }
	    }, {
	        key: 'viewMatrix',
	        get: function get() {
	            return this._lookat;
	        }
	    }, {
	        key: 'target',
	        get: function get() {
	            return this._target;
	        },
	        set: function set(t) {
	            this._target = t;
	            this.updateLookat();
	        }
	    }, {
	        key: 'position',
	        get: function get() {
	            return this._position;
	        },
	        set: function set(p) {
	            this._position = p;
	            this.updateLookat();
	        }
	    }]);

	    return Camera;
	}();

	exports.Camera = Camera;
	//# sourceMappingURL=camera.js.map

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var vector_1 = __webpack_require__(3);

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

/***/ },
/* 3 */
/***/ function(module, exports) {

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
	        key: "normalize",
	        value: function normalize() {
	            var a = this._array;
	            var l = this.length;
	            return new Vector([a[0] / l, a[1] / l, a[2] / l, a[3] / l]);
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
	            return new Vector([x, y, z, 0]);
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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Vector_1 = __webpack_require__(5);
	// Clamping values to keep them between 0 and 1
	function clamp(value) {
	    var min = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	    var max = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

	    return Math.max(min, Math.min(value, max));
	}
	// Interpolating the value between 2 vertices
	// min is the starting point, max the ending point
	// and gradient the % between the 2 points
	function interpolate(min, max, gradient) {
	    return min + (max - min) * clamp(gradient);
	}

	var Device = function () {
	    function Device(canvas) {
	        _classCallCheck(this, Device);

	        this.v = Vector_1.Vector.xyz(0, 0, 0); // Scratch pad
	        this.workingCanvas = canvas;
	        this.workingWidth = canvas.width;
	        this.workingHeight = canvas.height;
	        this.workingContext = this.workingCanvas.getContext('2d');
	        this.depthbuffer = new Array(this.workingWidth * this.workingHeight);
	    }

	    _createClass(Device, [{
	        key: 'reset',
	        value: function reset() {
	            this.backbuffer = new Uint8ClampedArray(4 * this.workingWidth * this.workingHeight);
	            for (var i = 0; i < this.workingWidth * this.workingHeight; i++) {
	                this.backbuffer[3 + i * 4] = 255;
	            }
	            this.depthbuffer.fill(Number.MAX_VALUE, 0, this.depthbuffer.length);
	        }
	    }, {
	        key: 'present',
	        value: function present() {
	            this.workingContext.putImageData(new ImageData(this.backbuffer, this.workingWidth, this.workingHeight), 0, 0);
	        }
	    }, {
	        key: 'putPixel',
	        value: function putPixel(v, color) {
	            var data = this.backbuffer;
	            var index = (v.x | 0) + (v.y | 0) * this.workingWidth;
	            var index4 = index * 4;
	            if (this.depthbuffer[index] < v.z) {
	                return;
	            }
	            this.depthbuffer[index] = v.z;
	            data[index4 + 0] = color.x * 255;
	            data[index4 + 1] = color.y * 255;
	            data[index4 + 2] = color.z * 255;
	            data[index4 + 3] = color.w * 255;
	        }
	    }, {
	        key: 'drawLine',
	        value: function drawLine(p0, p1, color) {
	            var x0 = p0.x | 0;
	            var y0 = p0.y | 0;
	            var x1 = p1.x | 0;
	            var y1 = p1.y | 0;
	            var dx = Math.abs(x0 - x1);
	            var dy = Math.abs(y0 - y1);
	            var sx = x0 < x1 ? 1 : -1;
	            var sy = y0 < y1 ? 1 : -1;
	            var err = dx - dy;
	            var e2 = void 0;
	            while (true) {
	                this.drawPoint(this.v.set(x0, y0, 0), color);
	                if (x0 == x1 && y0 == y1) {
	                    return;
	                }
	                e2 = 2 * err;
	                if (e2 > -dy) {
	                    err -= dy;
	                    x0 += sx;
	                }
	                if (e2 < dx) {
	                    err += dx;
	                    y0 += sy;
	                }
	            }
	        }
	    }, {
	        key: 'project',
	        value: function project(v, t, i) {
	            t.vmuli(v, i);
	            var x = i.x * this.workingWidth / 2 + this.workingWidth / 2.0;
	            var y = -i.y * this.workingHeight / 2 + this.workingHeight / 2.0;
	            i.set(x, y, v.z);
	        }
	    }, {
	        key: 'drawPoint',
	        value: function drawPoint(p) {
	            var color = arguments.length <= 1 || arguments[1] === undefined ? Device.Yellow : arguments[1];

	            if (p.x >= 0 && p.y >= 0 && p.x < this.workingWidth && p.y < this.workingHeight) {
	                this.putPixel(p, color);
	            }
	        }
	    }, {
	        key: 'scanLine',
	        value: function scanLine(y, pa, pb, pc, pd, color) {
	            // Thanks to current Y, we can compute the gradient to compute others values
	            // like the starting X (sx) and ending X (ex) to draw between if pa.Y ==
	            // pb.Y or pc.Y == pd.Y, gradient is forced to 1
	            var gradient1 = pa.y != pb.y ? (y - pa.y) / (pb.y - pa.y) : 1;
	            var gradient2 = pc.y != pd.y ? (y - pc.y) / (pd.y - pc.y) : 1;
	            var sx = interpolate(pa.x, pb.x, gradient1) | 0;
	            var ex = interpolate(pc.x, pd.x, gradient2) | 0;
	            var sz = interpolate(pa.z, pb.z, gradient1);
	            var ez = interpolate(pc.z, pd.z, gradient2);
	            // drawing a line from left (sx) to right (ex)
	            for (var x = sx; x < ex; x++) {
	                var zgrad = (x - sx) / (ex - sx);
	                var z = interpolate(sz, ez, zgrad) * 100;
	                this.drawPoint(this.v.set(x, y, z), color);
	            }
	        }
	    }, {
	        key: 'drawTriangle',
	        value: function drawTriangle(p0, p1, p2, color) {
	            // Sort triangles so that p0.y >= p1.y >= p2.y
	            if (p0.y > p1.y) {
	                var _ref = [p0, p1];
	                p1 = _ref[0];
	                p0 = _ref[1];
	            }
	            if (p1.y > p2.y) {
	                var _ref2 = [p1, p2];
	                p2 = _ref2[0];
	                p1 = _ref2[1];
	            }
	            if (p0.y > p1.y) {
	                var _ref3 = [p0, p1];
	                p1 = _ref3[0];
	                p0 = _ref3[1];
	            }
	            var dyp1p0 = p1.y - p0.y;
	            var dyp2p0 = p2.y - p0.y;
	            var dxp1p0 = p1.x - p0.x;
	            var dxp2p0 = p2.x - p0.x;
	            var mp0p1 = dyp1p0 > 0 ? dxp1p0 / dyp1p0 : 0;
	            var mp0p2 = dyp2p0 > 0 ? dxp2p0 / dyp2p0 : 0;
	            // First case, for:
	            //
	            //    P0
	            //   |  \
	            //   |   P1
	            //   |  /
	            //    P2
	            if (mp0p1 > mp0p2) {
	                for (var y = p0.y | 0; y <= (p2.y | 0); y++) {
	                    if (y < p1.y) {
	                        this.scanLine(y, p0, p2, p0, p1, color);
	                    } else {
	                        this.scanLine(y, p0, p2, p1, p2, color);
	                    }
	                }
	            } else {
	                for (var _y = p0.y | 0; _y <= (p2.y | 0); _y++) {
	                    if (_y < p1.y) {
	                        this.scanLine(_y, p0, p1, p0, p2, color);
	                    } else {
	                        this.scanLine(_y, p1, p2, p0, p2, color);
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render(camera, meshes) {
	            var transform = void 0;
	            var mesh = void 0;
	            var face = void 0;
	            var p0 = Vector_1.Vector.xyz(0, 0, 0);
	            var p1 = Vector_1.Vector.xyz(0, 0, 0);
	            var p2 = Vector_1.Vector.xyz(0, 0, 0);
	            var color = Vector_1.Vector.xyz(0, 0, 0);
	            var c = void 0;
	            for (var i = 0; i < meshes.length; i++) {
	                mesh = meshes[i];
	                transform = camera.matrix.mmul(mesh.matrix);
	                if (mesh.faces.length > 0) {
	                    for (var f = 0; f < mesh.faces.length; f++) {
	                        face = mesh.faces[f];
	                        this.project(mesh.verticies[face.A], transform, p0);
	                        this.project(mesh.verticies[face.B], transform, p1);
	                        this.project(mesh.verticies[face.C], transform, p2);
	                        c = .25 + f % mesh.faces.length / mesh.faces.length * 0.75;
	                        mesh.color.scalei(c, color);
	                        this.drawTriangle(p0, p1, p2, color);
	                    }
	                } else {
	                    for (var v = 0; v < mesh.verticies.length - 1; v++) {
	                        this.project(mesh.verticies[v], transform, p0);
	                        this.project(mesh.verticies[v + 1], transform, p1);
	                        this.drawLine(p0, p1, mesh.color);
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'width',
	        get: function get() {
	            return this.workingWidth;
	        }
	    }, {
	        key: 'height',
	        get: function get() {
	            return this.workingHeight;
	        }
	    }]);

	    return Device;
	}();

	Device.Yellow = new Vector_1.Vector([1, 1, 0, 1]);
	Device.Black = new Vector_1.Vector([0, 0, 0, 1]);
	exports.Device = Device;
	//# sourceMappingURL=device.js.map

/***/ },
/* 5 */
/***/ function(module, exports) {

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
	        key: "normalize",
	        value: function normalize() {
	            var a = this._array;
	            var l = this.length;
	            return new Vector([a[0] / l, a[1] / l, a[2] / l, a[3] / l]);
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
	            return new Vector([x, y, z, 0]);
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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var matrix_1 = __webpack_require__(2);
	var vector_1 = __webpack_require__(3);
	var monkey_1 = __webpack_require__(7);

	var Mesh = function () {
	    function Mesh(name, vertCount, faceCount) {
	        _classCallCheck(this, Mesh);

	        this.name = name;
	        this._position = vector_1.Vector.Zero;
	        this._rotation = vector_1.Vector.Zero;
	        this.color = new vector_1.Vector([0, 1, 1, 1]);
	        this.verticies = new Array(vertCount);
	        this.faces = new Array(faceCount);
	        this.updateMatrix();
	    }

	    _createClass(Mesh, [{
	        key: 'updateMatrix',
	        value: function updateMatrix() {
	            this._matrix = matrix_1.Matrix.pitchYawRoll(this._rotation).mmul(matrix_1.Matrix.translation(this._position));
	        }
	    }, {
	        key: 'matrix',
	        get: function get() {
	            return this._matrix;
	        }
	    }, {
	        key: 'position',
	        get: function get() {
	            return this._position;
	        },
	        set: function set(p) {
	            this._position = p;
	            this.updateMatrix();
	        }
	    }, {
	        key: 'rotation',
	        get: function get() {
	            return this._rotation;
	        },
	        set: function set(r) {
	            this._rotation = r;
	            this.updateMatrix();
	        }
	    }], [{
	        key: 'fromBabylon',
	        value: function fromBabylon(saved) {
	            var meshes = [];
	            for (var m = 0; m < saved.meshes.length; m++) {
	                var data = saved.meshes[m];
	                var vArray = data.vertices;
	                var fArray = data.indices;
	                var uvCount = data.uvCount;
	                var vStep = 1;
	                switch (uvCount) {
	                    case 0:
	                        vStep = 6;
	                        break;
	                    case 1:
	                        vStep = 8;
	                        break;
	                    case 2:
	                        vStep = 10;
	                        break;
	                }
	                var vCount = vArray.length / vStep;
	                var fCount = fArray.length / 3;
	                var mesh = new Mesh(data.name, vCount, fCount);
	                for (var i = 0; i < vCount; i++) {
	                    var x = vArray[i * vStep];
	                    var y = vArray[i * vStep + 1];
	                    var z = vArray[i * vStep + 2];
	                    mesh.verticies[i] = vector_1.Vector.xyz(x, y, z);
	                }
	                ;
	                for (var _i = 0; _i < fCount; _i++) {
	                    mesh.faces[_i] = {
	                        A: fArray[_i * 3],
	                        B: fArray[_i * 3 + 1],
	                        C: fArray[_i * 3 + 2]
	                    };
	                }
	                var pos = data.position;
	                mesh.position = vector_1.Vector.xyz(pos[0], pos[1], pos[2]);
	                meshes.push(mesh);
	            }
	            ;
	            return meshes;
	        }
	    }, {
	        key: 'Axes',
	        get: function get() {
	            var x = new Mesh("X Axis", 2, 0);
	            x.verticies[0] = vector_1.Vector.Zero;
	            x.verticies[1] = vector_1.Vector.xyz(1, 0, 0);
	            x.color = new vector_1.Vector([1, 0, 0, 1]);
	            var y = new Mesh("Y Axis", 2, 0);
	            y.verticies[0] = vector_1.Vector.Zero;
	            y.verticies[1] = vector_1.Vector.xyz(0, 1, 0);
	            y.color = new vector_1.Vector([0, 1, 0, 1]);
	            var z = new Mesh("Z Axis", 2, 0);
	            z.verticies[0] = vector_1.Vector.Zero;
	            z.verticies[1] = vector_1.Vector.xyz(0, 0, 1);
	            z.color = new vector_1.Vector([0, 0, 1, 1]);
	            return [x, y, z];
	        }
	    }, {
	        key: 'Cube',
	        get: function get() {
	            var m = new Mesh("Cube", 8, 12);
	            m.verticies[7] = vector_1.Vector.xyz(-1, -1, -1);
	            m.verticies[2] = vector_1.Vector.xyz(-1, -1, 1);
	            m.verticies[4] = vector_1.Vector.xyz(-1, 1, -1);
	            m.verticies[0] = vector_1.Vector.xyz(-1, 1, 1);
	            m.verticies[6] = vector_1.Vector.xyz(1, -1, -1);
	            m.verticies[3] = vector_1.Vector.xyz(1, -1, 1);
	            m.verticies[5] = vector_1.Vector.xyz(1, 1, -1);
	            m.verticies[1] = vector_1.Vector.xyz(1, 1, 1);
	            m.faces[0] = { A: 0, B: 1, C: 2 };
	            m.faces[1] = { A: 1, B: 2, C: 3 };
	            m.faces[2] = { A: 1, B: 3, C: 6 };
	            m.faces[3] = { A: 1, B: 5, C: 6 };
	            m.faces[4] = { A: 0, B: 1, C: 4 };
	            m.faces[5] = { A: 1, B: 4, C: 5 };
	            m.faces[6] = { A: 2, B: 3, C: 7 };
	            m.faces[7] = { A: 3, B: 6, C: 7 };
	            m.faces[8] = { A: 0, B: 2, C: 7 };
	            m.faces[9] = { A: 0, B: 4, C: 7 };
	            m.faces[10] = { A: 4, B: 5, C: 6 };
	            m.faces[11] = { A: 4, B: 6, C: 7 };
	            return m;
	        }
	    }, {
	        key: 'Monkey',
	        get: function get() {
	            return Mesh._monkey;
	        }
	    }]);

	    return Mesh;
	}();

	Mesh._monkey = Mesh.fromBabylon(monkey_1.SUZANNE);
	exports.Mesh = Mesh;
	//# sourceMappingURL=Mesh.js.map

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	exports.SUZANNE = {
	        "autoClear": true, "clearColor": [0.0000, 0.0000, 0.0000], "ambientColor": [0.0000, 0.0000, 0.0000], "gravity": [0.0000, -9.8100, 0.0000], "cameras": [{ "name": "Camera", "id": "Camera", "position": [7.4811, 5.3437, -6.5076], "target": [-0.3174, 0.8953, 0.3125], "fov": 0.8576, "minZ": 0.1000, "maxZ": 100.0000, "speed": 1.0000, "inertia": 0.9000, "checkCollisions": false, "applyGravity": false, "ellipsoid": [0.2000, 0.9000, 0.2000] }], "activeCamera": "Camera", "lights": [{ "name": "Lamp", "id": "Lamp", "type": 0.0000, "data": [4.0762, 5.9039, 1.0055], "intensity": 1.0000, "diffuse": [1.0000, 1.0000, 1.0000], "specular": [1.0000, 1.0000, 1.0000] }], "materials": [], "meshes": [{ "name": "Suzanne", "id": "Suzanne", "position": [0.0000, 0.0000, 0.0000], "rotation": [0.0000, 0.0000, 0.0000], "scaling": [1.0000, 1.0000, 1.0000], "isVisible": true, "isEnabled": true, "checkCollisions": false, "billboardMode": 0, "uvCount": 0, "vertices": [0.4688, 0.2422, -0.7578, 0.9693, -0.0118, -0.2456, 0.4375, 0.1641, -0.7656, 0.7290, -0.6566, -0.1934, 0.5000, 0.0937, -0.6875, 0.6076, -0.5104, -0.6085, -0.5000, 0.0937, -0.6875, -0.6053, -0.5058, -0.6146, -0.4375, 0.1641, -0.7656, -0.7116, -0.6793, -0.1793, -0.5625, 0.2422, -0.6719, -0.8018, -0.0010, -0.5976, 0.5625, 0.2422, -0.6719, 0.8001, -0.0028, -0.5998, 0.5469, 0.0547, -0.5781, 0.6802, -0.5463, -0.4888, -0.5469, 0.0547, -0.5781, -0.6836, -0.5473, -0.4827, -0.6250, 0.2422, -0.5625, -0.8684, -0.0023, -0.4958, 0.3516, 0.0312, -0.7188, 0.0967, -0.7558, -0.6475, 0.3516, -0.0234, -0.6172, 0.1160, -0.8693, -0.4805, -0.3516, -0.0234, -0.6172, -0.1128, -0.8748, -0.4711, -0.3516, 0.0312, -0.7188, -0.0996, -0.7466, -0.6577, 0.3516, 0.1328, -0.7812, 0.0395, -0.9631, -0.2661, -0.3516, 0.1328, -0.7812, -0.0406, -0.9693, -0.2424, 0.2734, 0.1641, -0.7969, -0.6386, -0.6965, -0.3272, -0.2031, 0.0937, -0.7422, 0.4563, -0.5354, -0.7107, -0.2734, 0.1641, -0.7969, 0.6531, -0.6866, -0.3193, 0.2031, 0.0937, -0.7422, -0.4549, -0.5415, -0.7069, -0.1562, 0.0547, -0.6484, 0.5538, -0.6332, -0.5406, 0.1406, 0.2422, -0.7422, -0.6901, 0.0003, -0.7237, 0.0781, 0.2422, -0.6562, -0.8119, -0.0009, -0.5837, -0.0781, 0.2422, -0.6562, 0.8097, -0.0070, -0.5867, -0.1406, 0.2422, -0.7422, 0.6893, -0.0046, -0.7244, 0.2422, 0.2422, -0.7969, -0.9557, -0.0183, -0.2936, -0.2422, 0.2422, -0.7969, 0.9526, -0.0131, -0.3040, 0.2734, 0.3281, -0.7969, -0.6458, 0.6947, -0.3166, -0.2031, 0.3906, -0.7422, 0.4559, 0.5222, -0.7207, -0.2734, 0.3281, -0.7969, 0.6644, 0.6821, -0.3056, 0.2031, 0.3906, -0.7422, -0.4604, 0.5277, -0.7138, 0.1562, 0.4375, -0.6484, -0.5250, 0.6254, -0.5771, -0.1562, 0.4375, -0.6484, 0.5306, 0.6258, -0.5717, 0.3516, 0.4531, -0.7188, 0.1005, 0.7447, -0.6598, 0.3516, 0.5156, -0.6172, 0.1226, 0.8395, -0.5293, -0.3516, 0.5156, -0.6172, -0.1195, 0.8455, -0.5203, -0.3516, 0.4531, -0.7188, -0.1034, 0.7350, -0.6701, 0.3516, 0.3594, -0.7812, 0.0340, 0.9690, -0.2445, -0.3516, 0.3594, -0.7812, -0.0351, 0.9748, -0.2204, 0.4375, 0.3281, -0.7656, 0.7364, 0.6521, -0.1803, -0.5000, 0.3906, -0.6875, -0.6098, 0.4922, -0.6211, -0.4375, 0.3281, -0.7656, -0.7162, 0.6771, -0.1692, 0.5000, 0.3906, -0.6875, 0.6102, 0.4956, -0.6181, -0.5469, 0.4375, -0.5781, -0.6727, 0.5347, -0.5114, 0.5469, 0.4375, -0.5781, 0.6682, 0.5371, -0.5148, -0.4688, 0.2422, -0.7578, -0.9706, -0.0152, -0.2402, 0.4766, 0.2422, -0.7734, 0.9644, -0.0127, -0.2639, -0.4453, 0.3359, -0.7812, -0.7179, 0.6582, -0.2264, 0.4453, 0.3359, -0.7812, 0.7216, 0.6556, -0.2224, -0.3516, 0.3750, -0.8047, -0.0416, 0.9387, -0.3422, 0.2656, 0.3359, -0.8203, -0.6071, 0.6448, -0.4644, -0.2656, 0.3359, -0.8203, 0.6237, 0.6285, -0.4647, 0.2266, 0.2422, -0.8203, -0.9239, -0.0133, -0.3824, -0.2266, 0.2422, -0.8203, 0.9270, -0.0129, -0.3749, -0.2656, 0.1562, -0.8203, 0.6159, -0.6366, -0.4641, 0.2656, 0.1562, -0.8203, -0.5992, -0.6524, -0.4640, -0.3516, 0.1172, -0.8047, -0.0410, -0.9401, -0.3383, 0.4453, 0.1562, -0.7812, 0.7152, -0.6625, -0.2227, -0.4453, 0.1562, -0.7812, -0.7106, -0.6658, -0.2274, -0.4766, 0.2422, -0.7734, -0.9626, -0.0113, -0.2707, 0.3516, 0.2422, -0.8281, 0.1836, -0.0053, -0.9830, -0.3516, 0.2422, -0.8281, -0.1836, -0.0053, -0.9830, 0.3516, 0.1172, -0.8047, 0.0318, -0.9414, -0.3357, 0.3516, 0.3750, -0.8047, 0.0323, 0.9399, -0.3397, 0.1797, -0.9688, -0.5547, 0.1596, -0.9752, -0.1529, 0.1641, -0.9297, -0.6328, 0.1554, -0.7590, -0.6323, 0.0000, -0.9844, -0.5781, -0.0205, -0.9692, -0.2452, 0.0000, -0.9453, -0.6406, -0.0179, -0.7709, -0.6367, -0.1641, -0.9297, -0.6328, -0.1461, -0.7887, -0.5971, -0.1797, -0.9688, -0.5547, -0.1472, -0.9781, -0.1474, 0.3281, -0.9453, -0.5234, 0.5267, -0.8347, -0.1611, 0.2344, -0.9141, -0.6328, 0.3502, -0.6391, -0.6847, -0.2344, -0.9141, -0.6328, -0.3578, -0.6333, -0.6862, -0.3281, -0.9453, -0.5234, -0.6239, -0.7772, -0.0817, 0.3672, -0.8906, -0.5312, 0.9457, -0.2579, -0.1977, 0.2656, -0.8203, -0.6641, 0.5557, -0.2264, -0.8000, -0.2656, -0.8203, -0.6641, -0.5315, -0.2379, -0.8130, 0.3516, -0.6953, -0.5703, 0.9728, 0.1003, -0.2087, 0.2500, -0.7031, -0.6875, 0.5652, -0.0297, -0.8244, -0.2500, -0.7031, -0.6875, -0.5566, -0.0457, -0.8295, -0.3672, -0.8906, -0.5312, -0.9384, -0.3451, -0.0143, 0.3125, -0.4375, -0.5703, 0.9557, 0.2492, -0.1565, 0.2109, -0.4453, -0.7109, 0.5937, 0.1082, -0.7974, -0.2109, -0.4453, -0.7109, -0.5704, 0.0751, -0.8179, -0.3516, -0.6953, -0.5703, -0.9782, 0.0801, -0.1917, 0.2031, -0.1875, -0.5625, 0.8915, -0.3307, -0.3095, 0.4375, -0.1406, -0.5312, 0.3488, -0.9371, 0.0081, 0.3984, -0.0469, -0.6719, 0.3411, -0.5510, -0.7616, -0.3984, -0.0469, -0.6719, -0.4388, -0.5190, -0.7335, -0.4375, -0.1406, -0.5312, -0.3383, -0.9407, 0.0250, -0.1250, -0.1016, -0.8125, -0.0238, -0.2265, -0.9737, 0.6328, -0.0391, -0.5391, 0.5875, -0.7849, -0.1970, -0.6172, 0.0547, -0.6250, -0.4817, -0.3736, -0.7927, -0.6328, -0.0391, -0.5391, -0.5811, -0.7812, -0.2279, 0.8281, 0.1484, -0.4453, 0.9070, -0.4009, 0.1289, 0.7266, 0.2031, -0.6016, 0.5665, -0.3188, -0.7598, -0.7266, 0.2031, -0.6016, -0.5989, -0.2850, -0.7483, -0.8281, 0.1484, -0.4453, -0.9118, -0.3861, 0.1399, 0.8594, 0.4297, -0.5938, 0.8451, 0.4434, -0.2985, -0.7422, 0.3750, -0.6562, -0.4371, -0.4690, -0.7674, -0.8594, 0.4297, -0.5938, -0.8837, 0.3928, -0.2543, 0.7109, 0.4844, -0.6250, 0.5170, 0.8291, -0.2125, 0.7422, 0.3750, -0.6562, 0.4607, -0.1448, -0.8756, -0.6875, 0.4141, -0.7266, -0.3790, -0.1825, -0.9072, -0.7109, 0.4844, -0.6250, -0.4349, 0.8866, -0.1574, 0.4922, 0.6016, -0.6875, 0.5976, 0.7847, -0.1646, 0.6875, 0.4141, -0.7266, 0.4801, -0.1833, -0.8578, -0.4375, 0.5469, -0.7969, -0.3127, -0.0113, -0.9498, -0.4922, 0.6016, -0.6875, -0.6023, 0.7813, -0.1636, 0.3203, 0.7578, -0.7344, 0.2247, 0.9601, -0.1662, 0.3125, 0.6406, -0.8359, 0.2699, 0.2137, -0.9388, -0.3125, 0.6406, -0.8359, -0.2538, 0.2144, -0.9432, -0.3203, 0.7578, -0.7344, -0.2255, 0.9589, -0.1721, 0.1562, 0.7187, -0.7578, -0.5952, 0.7791, -0.1968, 0.2031, 0.6172, -0.8516, -0.1274, 0.1700, -0.9771, -0.2031, 0.6172, -0.8516, 0.1609, 0.1534, -0.9750, -0.1562, 0.7187, -0.7578, 0.6051, 0.7680, -0.2098, 0.0625, 0.4922, -0.7500, -0.8108, 0.5623, -0.1623, 0.1016, 0.4297, -0.8438, -0.0553, -0.0432, -0.9975, -0.1016, 0.4297, -0.8438, 0.0293, -0.1579, -0.9870, -0.0625, 0.4922, -0.7500, 0.8242, 0.5468, -0.1473, 0.0000, 0.4297, -0.7422, -0.0584, 0.9485, -0.3114, 0.0000, 0.3516, -0.8203, -0.0323, -0.0563, -0.9979, 0.1641, 0.4141, -0.7734, 0.3572, -0.2743, -0.8928, 0.2500, 0.4687, -0.7578, 0.2633, -0.1145, -0.9579, -0.2500, 0.4687, -0.7578, -0.2180, -0.1231, -0.9681, -0.1641, 0.4141, -0.7734, -0.2898, -0.2241, -0.9304, 0.3281, 0.4766, -0.7422, 0.1490, -0.1541, -0.9767, -0.3281, 0.4766, -0.7422, -0.1442, -0.1598, -0.9766, 0.4297, 0.4375, -0.7188, 0.2190, 0.0371, -0.9750, 0.4375, 0.5469, -0.7969, 0.3085, 0.0038, -0.9512, 0.6016, 0.3750, -0.6641, 0.2254, -0.3608, -0.9050, -0.4297, 0.4375, -0.7188, -0.1943, 0.0657, -0.9787, 0.6406, 0.2969, -0.6484, 0.3588, -0.1192, -0.9257, -0.6016, 0.3750, -0.6641, -0.2447, -0.3607, -0.9000, 0.6250, 0.1875, -0.6484, 0.4602, -0.1651, -0.8723, -0.6406, 0.2969, -0.6484, -0.3562, -0.1236, -0.9262, 0.4922, 0.0625, -0.6719, 0.4305, -0.3617, -0.8269, 0.6172, 0.0547, -0.6250, 0.5001, -0.3758, -0.7802, -0.4922, 0.0625, -0.6719, -0.4216, -0.4031, -0.8122, 0.3750, 0.0156, -0.7031, 0.1637, -0.5078, -0.8458, 0.2031, 0.0937, -0.7422, -0.1553, -0.3230, -0.9335, 0.1250, -0.1016, -0.8125, 0.0559, -0.2297, -0.9716, -0.3750, 0.0156, -0.7031, -0.3458, -0.3722, -0.8613, 0.1641, 0.1406, -0.7500, -0.2965, -0.2673, -0.9168, 0.0000, 0.0469, -0.7266, 0.0038, 0.0699, -0.9975, -0.1641, 0.1406, -0.7500, 0.2393, -0.3012, -0.9230, -0.2031, 0.0937, -0.7422, 0.1823, -0.2533, -0.9500, 0.1250, 0.3047, -0.7656, 0.0360, -0.2032, -0.9785, 0.0000, 0.2109, -0.7656, 0.0446, -0.2602, -0.9645, -0.1328, 0.2109, -0.7578, 0.1646, -0.1727, -0.9711, 0.1328, 0.2109, -0.7578, -0.1938, -0.1490, -0.9696, 0.0625, -0.8828, -0.6953, -0.0402, -0.3406, -0.9393, 0.0000, -0.8906, -0.6875, -0.0466, -0.3789, -0.9243, 0.1172, -0.8359, -0.7109, 0.1083, -0.3252, -0.9394, -0.0625, -0.8828, -0.6953, 0.0893, -0.4239, -0.9013, 0.1094, -0.7188, -0.7344, 0.1461, -0.1193, -0.9820, -0.1172, -0.8359, -0.7109, -0.1950, -0.2758, -0.9412, -0.1094, -0.7188, -0.7344, -0.1568, -0.1334, -0.9785, 0.0781, -0.4453, -0.7500, 0.1344, 0.0067, -0.9909, 0.1172, -0.6875, -0.7344, 0.1817, -0.0454, -0.9823, -0.1172, -0.6875, -0.7344, -0.1928, -0.0461, -0.9801, -0.0781, -0.4453, -0.7500, -0.1335, -0.0018, -0.9910, 0.0859, -0.2891, -0.7422, 0.5003, -0.4292, -0.7519, 0.0000, -0.3281, -0.7422, -0.0068, -0.4701, -0.8826, 0.0000, -0.4453, -0.7500, -0.0003, 0.0004, -1.0000, 0.0000, -0.6797, -0.7344, -0.0002, -0.0344, -0.9994, 0.0000, -0.7656, -0.7344, -0.0384, -0.5979, -0.8006, 0.1250, -0.2266, -0.7500, 0.8061, -0.3932, -0.4421, 0.1328, -0.2266, -0.7969, 0.9262, -0.2430, -0.2880, 0.0938, -0.2734, -0.7812, 0.5836, -0.6929, -0.4235, -0.0938, -0.2734, -0.7812, -0.5287, -0.7138, -0.4592, -0.1328, -0.2266, -0.7969, -0.9303, -0.2210, -0.2926, -0.0859, -0.2891, -0.7422, -0.4317, -0.4659, -0.7724, 0.1016, -0.1484, -0.7422, 0.0032, 0.1752, -0.9845, 0.1094, -0.1328, -0.7812, 0.6186, 0.7757, -0.1248, -0.1094, -0.1328, -0.7812, -0.6276, 0.7712, -0.1065, -0.1016, -0.1484, -0.7422, -0.0107, 0.0912, -0.9958, 0.0000, -0.1406, -0.7422, 0.0664, 0.3602, -0.9305, 0.0391, -0.1250, -0.7812, -0.2936, 0.9400, -0.1735, -0.0391, -0.1250, -0.7812, 0.2391, 0.9534, -0.1840, 0.0000, -0.1953, -0.7500, 0.1722, 0.8255, -0.5374, 0.0000, -0.1875, -0.7969, -0.0265, 0.9120, -0.4093, 0.0000, -0.3203, -0.7812, -0.0088, -0.8681, -0.4964, 0.0000, -0.2891, -0.8047, 0.0000, -0.5222, -0.8528, -0.0781, -0.2500, -0.8047, -0.3870, -0.7462, -0.5416, 0.0000, -0.2031, -0.8281, -0.0063, 0.1920, -0.9814, -0.0469, -0.1484, -0.8125, 0.1976, 0.5896, -0.7831, 0.0469, -0.1484, -0.8125, -0.1333, 0.5965, -0.7914, 0.0938, -0.1563, -0.8125, 0.3611, 0.4713, -0.8047, -0.0938, -0.1563, -0.8125, -0.3647, 0.4640, -0.8073, -0.1094, -0.2266, -0.8281, -0.4917, -0.2875, -0.8219, 0.1094, -0.2266, -0.8281, 0.4931, -0.2846, -0.8220, 0.0781, -0.2500, -0.8047, 0.3870, -0.7462, -0.5416, -0.1641, -0.2422, -0.7109, -0.8366, 0.0461, -0.5458, -0.1250, -0.2266, -0.7500, -0.8196, -0.2792, -0.5003, 0.1641, -0.2422, -0.7109, 0.7995, 0.0044, -0.6006, -0.1797, -0.3125, -0.7109, -0.6554, 0.1339, -0.7432, 0.1797, -0.3125, -0.7109, 0.6507, 0.1487, -0.7447, 0.2578, -0.3125, -0.5547, 0.9278, 0.3530, -0.1209, -0.2578, -0.3125, -0.5547, -0.9228, 0.3715, -0.1019, -0.3125, -0.4375, -0.5703, -0.9636, 0.2327, -0.1312, 0.2344, -0.2500, -0.5547, 0.9306, 0.3435, -0.1263, -0.2344, -0.2500, -0.5547, -0.9289, 0.3610, -0.0820, 0.0938, -0.7422, -0.7266, -0.1468, -0.5234, -0.8394, 0.0000, -0.7734, -0.7187, -0.0194, -0.9571, -0.2891, 0.0938, -0.8203, -0.7109, -0.6332, -0.0002, -0.7740, -0.0938, -0.7422, -0.7266, 0.2008, -0.4711, -0.8589, 0.0469, -0.8672, -0.6875, -0.3669, 0.6037, -0.7077, -0.0938, -0.8203, -0.7109, 0.6351, 0.0428, -0.7712, 0.0000, -0.8750, -0.6875, -0.0381, 0.5754, -0.8169, -0.0469, -0.8672, -0.6875, 0.4141, 0.5798, -0.7016, 0.0469, -0.8516, -0.6328, -0.3245, 0.4755, -0.8177, -0.0469, -0.8516, -0.6328, 0.2900, 0.4687, -0.8343, 0.0000, -0.8594, -0.6328, 0.0044, 0.5304, -0.8477, -0.0938, -0.8125, -0.6406, 0.6738, 0.1155, -0.7299, 0.0938, -0.8125, -0.6406, -0.6715, 0.1450, -0.7267, -0.0938, -0.7500, -0.6641, 0.5168, -0.7037, -0.4875, 0.0938, -0.7500, -0.6641, -0.5177, -0.7041, -0.4860, 0.0000, -0.7812, -0.6562, 0.0046, -0.6963, -0.7177, 0.1719, 0.2187, -0.7812, 0.1182, -0.0594, -0.9912, -0.1875, 0.1562, -0.7734, 0.0103, -0.0716, -0.9974, 0.1797, 0.2969, -0.7812, 0.2781, -0.1122, -0.9539, -0.1719, 0.2187, -0.7812, -0.1586, -0.0802, -0.9841, -0.1250, 0.3047, -0.7656, -0.0843, -0.0546, -0.9949, -0.1797, 0.2969, -0.7812, -0.2715, -0.0865, -0.9586, -0.2109, 0.3750, -0.7812, -0.1558, -0.0818, -0.9844, 0.2266, 0.1094, -0.7812, -0.0239, -0.1866, -0.9821, -0.2266, 0.1094, -0.7812, 0.0688, -0.1757, -0.9820, -0.3750, 0.0625, -0.7422, -0.2432, -0.1762, -0.9538, 0.4766, 0.1016, -0.7188, 0.3072, -0.0162, -0.9515, -0.4766, 0.1016, -0.7188, -0.2661, -0.0486, -0.9627, 0.5781, 0.1953, -0.6797, 0.2781, -0.0927, -0.9561, -0.5781, 0.1953, -0.6797, -0.2977, -0.0310, -0.9541, -0.6250, 0.1875, -0.6484, -0.4833, -0.2039, -0.8513, 0.5859, 0.2891, -0.6875, 0.1638, -0.0697, -0.9840, -0.5859, 0.2891, -0.6875, -0.1819, -0.0705, -0.9808, -0.5625, 0.3516, -0.6953, -0.3223, -0.0972, -0.9416, 0.5625, 0.3516, -0.6953, 0.2816, -0.0011, -0.9595, -0.4219, 0.3984, -0.7734, -0.0553, -0.1278, -0.9902, 0.3359, 0.4297, -0.7578, 0.1723, 0.1345, -0.9758, -0.3359, 0.4297, -0.7578, -0.1907, 0.1022, -0.9763, 0.2734, 0.4219, -0.7734, 0.1514, 0.0618, -0.9865, -0.2734, 0.4219, -0.7734, -0.1550, 0.1021, -0.9826, 0.2109, 0.3750, -0.7812, 0.2021, -0.1124, -0.9729, 0.2344, 0.3594, -0.7578, 0.4634, -0.3949, -0.7932, -0.2344, 0.3594, -0.7578, -0.5008, -0.4443, -0.7428, -0.2812, 0.3984, -0.7656, -0.3007, -0.2641, -0.9164, 0.2812, 0.3984, -0.7656, 0.1744, -0.2683, -0.9474, -0.3359, 0.4062, -0.7500, -0.0996, -0.3046, -0.9472, 0.4219, 0.3984, -0.7734, 0.1811, -0.1429, -0.9730, 0.3359, 0.4062, -0.7500, 0.0001, -0.3783, -0.9257, -0.4141, 0.3906, -0.7500, 0.2741, -0.8556, -0.4391, 0.4141, 0.3906, -0.7500, -0.1395, -0.9154, -0.3776, -0.5312, 0.3359, -0.6797, 0.1423, -0.5826, -0.8002, 0.5547, 0.2812, -0.6719, -0.3840, -0.1351, -0.9134, -0.5547, 0.2812, -0.6719, 0.4229, -0.1078, -0.8997, -0.5469, 0.2109, -0.6719, 0.1921, 0.1914, -0.9625, 0.4609, 0.1172, -0.7031, -0.1242, 0.6164, -0.7775, 0.3750, 0.0625, -0.7422, 0.2286, -0.1674, -0.9590, 0.3750, 0.0859, -0.7266, 0.1431, 0.5587, -0.8169, -0.4609, 0.1172, -0.7031, 0.1653, 0.6098, -0.7751, -0.3750, 0.0859, -0.7266, -0.1564, 0.5646, -0.8104, 0.2422, 0.1250, -0.7578, 0.4323, 0.5833, -0.6876, 0.1875, 0.1562, -0.7734, -0.0438, 0.0069, -0.9990, -0.2422, 0.1250, -0.7578, -0.4197, 0.6008, -0.6803, -0.2031, 0.1719, -0.7500, -0.6920, 0.2958, -0.6585, 0.1953, 0.2969, -0.7578, 0.7894, -0.2032, -0.5793, -0.1953, 0.2969, -0.7578, -0.7938, -0.2865, -0.5364, 0.1953, 0.2266, -0.7500, 0.8016, 0.0110, -0.5977, -0.1953, 0.2266, -0.7500, -0.7987, 0.0194, -0.6014, 0.2031, 0.1719, -0.7500, 0.6880, 0.2985, -0.6614, 0.0000, 0.4062, -0.6016, -0.0345, 0.8722, -0.4879, -0.1094, 0.4609, -0.6094, 0.5870, 0.7351, -0.3391, 0.1094, 0.4609, -0.6094, -0.4285, 0.8853, -0.1808, -0.1953, 0.6641, -0.6172, 0.4766, 0.5094, 0.7164, 0.3359, 0.6875, -0.5938, 0.1150, 0.6553, 0.7466, -0.3359, 0.6875, -0.5938, -0.1169, 0.6457, 0.7545, -0.4844, 0.5547, -0.5547, -0.2746, 0.8880, 0.3688, 0.4844, 0.5547, -0.5547, 0.2275, 0.8745, 0.4283, -0.6797, 0.4531, -0.4922, -0.3626, 0.9120, 0.1919, 0.7969, 0.4062, -0.4609, 0.6957, 0.5814, 0.4218, -0.7969, 0.4062, -0.4609, -0.7391, 0.6070, 0.2920, -0.7734, 0.1641, -0.3750, -0.8565, -0.4709, 0.2113, 0.6016, -0.0000, -0.4141, 0.5443, -0.8372, 0.0533, -0.6016, -0.0000, -0.4141, -0.6261, -0.7782, 0.0493, 0.4375, -0.0938, -0.4688, 0.4720, -0.8637, 0.1768, -0.4375, -0.0938, -0.4688, -0.3676, -0.9095, 0.1939, 0.0000, -0.5703, -0.3203, 0.0226, -0.2705, 0.9624, 0.0000, -0.4844, -0.2812, 0.0819, -0.7395, 0.6681, 0.1250, -0.5391, -0.3594, 0.2771, -0.3147, 0.9078, -0.1797, -0.4141, -0.2578, -0.6095, -0.7764, 0.1601, 0.0000, -0.8047, -0.3437, -0.0570, -0.3260, 0.9436, 0.1406, -0.7578, -0.3672, 0.2050, -0.1864, 0.9608, -0.1250, -0.5391, -0.3594, -0.4085, -0.2920, 0.8648, 0.0000, -0.9766, -0.4609, -0.0479, -0.8737, 0.4840, 0.1641, -0.9453, -0.4375, 0.0963, -0.7572, 0.6460, -0.1406, -0.7578, -0.3672, -0.1179, -0.1639, 0.9794, -0.1641, -0.9453, -0.4375, -0.0110, -0.7755, 0.6312, -0.3281, -0.9141, -0.3984, -0.6665, -0.4385, 0.6029, 0.3281, -0.9141, -0.3984, 0.5130, -0.4512, 0.7302, -0.2891, -0.7109, -0.3828, -0.6281, 0.0925, 0.7726, 0.2891, -0.7109, -0.3828, 0.6053, 0.0333, 0.7953, -0.2500, -0.5000, -0.3906, -0.6249, 0.1224, 0.7710, 0.2344, -0.3516, -0.4062, 0.8957, 0.2577, 0.3624, 0.2500, -0.5000, -0.3906, 0.7798, -0.0105, 0.6258, 0.1797, -0.4141, -0.2578, 0.6893, -0.6687, 0.2786, -0.2344, -0.3516, -0.4062, -0.9439, 0.1056, 0.3129, 0.2188, -0.2813, -0.4297, 0.9787, -0.1958, -0.0615, -0.2109, -0.2266, -0.4688, -0.9562, -0.1362, -0.2589, -0.2188, -0.2813, -0.4297, -0.9982, 0.0183, -0.0565, 0.2031, -0.1719, -0.5000, 0.7857, -0.5715, -0.2367, -0.2031, -0.1875, -0.5625, -0.9361, -0.3368, -0.1016, -0.2031, -0.1719, -0.5000, -0.7526, -0.5911, -0.2901, 0.0000, 0.0703, 0.8281, -0.0265, -0.2849, 0.9582, 0.3359, 0.0547, 0.6641, 0.4455, -0.3583, 0.8204, 0.0000, -0.1953, 0.6719, -0.0037, -0.6934, 0.7205, -0.3438, -0.1484, 0.5391, -0.5264, -0.6594, 0.5367, -0.3359, 0.0547, 0.6641, -0.4404, -0.3208, 0.8385, 0.3438, -0.1484, 0.5391, 0.5223, -0.6536, 0.5477, 0.0000, -0.3828, 0.3516, -0.0040, -0.9391, 0.3435, -0.2969, -0.3125, 0.2656, -0.5017, -0.8333, 0.2320, 0.2969, -0.3125, 0.2656, 0.5071, -0.8376, 0.2033, 0.2109, -0.3906, -0.1641, 0.5727, -0.8197, -0.0120, -0.2109, -0.3906, -0.1641, -0.5747, -0.8183, -0.0009, 0.0000, -0.4609, -0.1875, 0.0134, -0.9822, 0.1874, 0.7734, 0.1641, -0.3750, 0.9302, -0.3062, 0.2023, 0.7344, -0.0469, -0.0703, 0.7210, -0.6898, -0.0651, -0.7344, -0.0469, -0.0703, -0.7504, -0.6502, -0.1191, -0.8516, 0.2344, -0.0547, -0.9855, -0.1614, -0.0522, 0.0000, 0.5625, 0.8516, -0.0007, 0.3401, 0.9404, 0.4609, 0.4375, 0.7031, 0.4730, 0.1763, 0.8632, -0.4609, 0.4375, 0.7031, -0.5126, 0.1686, 0.8419, 0.0000, 0.8984, -0.2891, 0.0226, 0.8392, -0.5434, 0.4531, 0.8516, -0.2344, 0.4442, 0.7244, -0.5271, 0.0000, 0.9844, 0.0781, 0.0039, 0.9997, -0.0222, -0.4531, 0.9297, 0.0703, -0.4288, 0.9025, -0.0398, -0.4531, 0.8516, -0.2344, -0.4798, 0.7182, -0.5040, 0.4531, 0.9297, 0.0703, 0.4135, 0.9096, -0.0395, 0.4531, 0.8672, 0.3828, 0.3912, 0.8153, 0.4268, -0.4531, 0.8672, 0.3828, -0.4265, 0.7997, 0.4225, 0.0000, 0.8984, 0.5469, 0.0172, 0.8404, 0.5417, 0.6797, 0.4531, -0.4922, 0.3455, 0.9124, 0.2191, 0.7266, 0.4062, -0.3359, 0.7831, 0.6136, -0.1011, -0.7266, 0.4062, -0.3359, -0.6092, 0.7911, 0.0546, -0.6328, 0.4531, -0.2813, -0.4234, 0.8153, -0.3949, 0.6328, 0.4531, -0.2813, 0.3760, 0.7903, -0.4836, 0.6406, 0.7031, -0.0547, 0.6639, 0.6793, -0.3127, -0.7969, 0.5625, -0.1250, -0.7631, 0.4966, -0.4136, 0.7969, 0.5625, -0.1250, 0.7705, 0.5058, -0.3880, 0.7969, 0.6172, 0.1172, 0.8486, 0.5288, 0.0140, -0.7969, 0.6172, 0.1172, -0.8678, 0.4968, -0.0030, -0.6406, 0.7500, 0.1953, -0.6595, 0.7481, 0.0733, 0.6406, 0.7500, 0.1953, 0.6784, 0.7314, 0.0695, 0.7969, 0.5391, 0.3594, 0.8722, 0.3146, 0.3746, -0.7969, 0.5391, 0.3594, -0.8935, 0.2545, 0.3698, -0.6406, 0.6797, 0.4453, -0.4986, 0.5502, 0.6698, 0.7734, 0.2656, 0.4375, 0.7831, -0.1485, 0.6038, 0.6172, 0.3281, 0.5859, 0.6196, -0.0605, 0.7825, -0.6172, 0.3281, 0.5859, -0.6099, -0.0221, 0.7921, -0.7734, 0.2656, 0.4375, -0.6664, -0.0202, 0.7453, 0.6406, 0.6797, 0.4453, 0.6075, 0.5696, 0.5536, -0.6406, 0.7031, -0.0547, -0.6593, 0.6777, -0.3254, 0.4609, 0.5234, -0.4297, 0.3406, 0.8832, -0.3223, -0.4609, 0.5234, -0.4297, -0.3645, 0.9029, -0.2280, 0.0000, 0.5703, -0.5703, 0.0518, 0.5225, -0.8510, 0.1953, 0.6641, -0.6172, -0.4701, 0.5252, 0.7093, 0.8516, 0.2344, -0.0547, 0.9850, -0.1605, -0.0631, 0.8594, 0.3203, 0.0469, 0.9970, -0.0333, 0.0695, -0.8594, 0.3203, 0.0469, -0.9979, 0.0404, 0.0497, 0.8203, 0.3281, 0.2031, 0.9144, 0.2312, -0.3323, -0.8203, 0.3281, 0.2031, -0.8007, 0.5628, -0.2050, 0.4062, -0.1719, -0.1484, 0.5790, -0.8027, -0.1427, -0.4297, -0.1953, 0.2109, -0.5968, -0.7859, 0.1618, 0.5938, -0.1250, 0.1641, 0.3105, -0.9506, -0.0010, -0.4062, -0.1719, -0.1484, -0.5673, -0.8083, -0.1575, 0.2109, -0.2266, -0.4688, 0.8872, -0.1577, -0.4336, 0.6406, -0.0078, 0.4297, 0.3535, -0.5927, 0.7237, -0.4844, 0.0234, 0.5469, -0.5421, -0.4993, 0.6759, -0.6406, -0.0078, 0.4297, -0.2692, -0.6315, 0.7272, 0.4297, -0.1953, 0.2109, 0.5633, -0.8173, 0.1213, -0.5938, -0.1250, 0.1641, -0.2785, -0.9594, 0.0447, 0.4844, 0.0234, 0.5469, 0.5292, -0.5051, 0.6817, 1.0234, 0.4766, 0.3125, -0.0199, 0.8803, -0.4740, 0.8906, 0.4062, 0.2344, -0.2911, 0.7817, -0.5516, 1.0156, 0.4141, 0.2891, 0.5512, -0.0788, -0.8306, -0.9219, 0.3594, 0.2187, -0.4461, -0.0227, -0.8947, -0.8906, 0.4062, 0.2344, 0.3026, 0.7616, -0.5731, -1.0234, 0.4766, 0.3125, -0.0005, 0.8798, -0.4753, 1.1875, 0.4375, 0.3906, 0.3214, -0.0922, -0.9424, -1.1875, 0.4375, 0.3906, -0.3912, -0.1216, -0.9122, -1.0156, 0.4141, 0.2891, -0.5720, -0.1149, -0.8122, -1.2344, 0.5078, 0.4219, -0.3940, 0.8547, -0.3380, 1.2344, 0.5078, 0.4219, 0.3552, 0.8790, -0.3179, 1.3516, 0.3203, 0.4219, 0.7788, 0.1678, -0.6044, -1.2656, 0.2891, 0.4062, 0.1568, -0.0805, -0.9843, 1.2656, 0.2891, 0.4062, -0.1523, -0.1211, -0.9809, 1.2812, 0.0547, 0.4297, 0.6526, -0.4768, -0.5888, -1.2109, 0.0781, 0.4062, 0.0469, 0.3680, -0.9286, -1.3516, 0.3203, 0.4219, -0.7626, 0.1751, -0.6227, 1.2109, 0.0781, 0.4062, -0.0400, 0.3039, -0.9518, 1.0391, -0.1016, 0.3281, 0.5029, -0.7810, -0.3703, -1.0312, -0.0391, 0.3047, -0.4992, 0.2890, -0.8168, -1.2812, 0.0547, 0.4297, -0.6804, -0.4264, -0.5960, 1.0312, -0.0391, 0.3047, 0.5089, 0.3211, -0.7987, 0.8281, -0.0703, 0.1328, 0.3409, 0.3183, -0.8845, -0.8281, -0.0703, 0.1328, -0.3488, 0.2273, -0.9092, -0.7734, -0.1406, 0.1250, -0.0394, -0.6351, -0.7714, 1.0391, 0.0000, 0.3672, -0.1831, 0.9556, -0.2307, -0.8828, -0.0234, 0.2109, -0.2527, 0.8501, -0.4620, -1.0391, 0.0000, 0.3672, 0.1868, 0.9538, -0.2351, 1.1875, 0.0938, 0.4453, -0.8095, 0.5847, 0.0524, -1.1875, 0.0938, 0.4453, 0.7621, 0.6471, 0.0193, 1.2344, 0.2500, 0.4453, -0.9931, -0.0552, -0.1035, -1.2344, 0.2500, 0.4453, 0.9847, -0.0996, -0.1426, 1.1719, 0.3594, 0.4375, -0.1439, -0.7537, -0.6413, -1.1719, 0.3594, 0.4375, 0.1333, -0.7504, -0.6474, 1.0234, 0.3438, 0.3594, 0.5604, -0.6609, -0.4991, -1.0234, 0.3438, 0.3594, -0.5585, -0.6545, -0.5096, 0.9219, 0.3594, 0.2187, 0.4492, -0.0383, -0.8926, 0.9453, 0.3047, 0.2891, 0.6842, -0.5558, -0.4722, -0.9453, 0.3047, 0.2891, -0.7274, -0.5127, -0.4560, 0.7266, 0.0000, 0.0703, 0.8572, -0.4931, 0.1483, -0.7188, -0.0234, 0.1719, -0.7341, 0.1288, -0.6667, 0.7734, -0.1406, 0.1250, 0.0381, -0.6438, -0.7642, -0.7266, 0.0000, 0.0703, -0.9710, -0.2035, 0.1250, 0.8438, 0.2891, 0.2109, 0.3727, -0.2242, -0.9004, -0.8438, 0.2891, 0.2109, -0.7723, -0.2654, -0.5771, 0.8828, -0.0234, 0.2109, 0.2435, 0.8170, -0.5227, 0.8125, -0.0156, 0.2734, 0.5998, 0.5131, -0.6139, -0.8125, -0.0156, 0.2734, -0.7615, 0.4580, -0.4586, 0.8438, 0.0156, 0.2734, 0.8420, -0.1762, -0.5098, 0.7188, 0.0391, 0.1875, 0.9609, -0.1188, -0.2499, -0.7188, 0.0391, 0.1875, -0.9344, -0.0891, -0.3448, -0.8438, 0.0156, 0.2734, -0.8754, -0.1836, -0.4472, 0.7578, 0.0938, 0.2734, 0.8515, 0.0414, -0.5228, -0.8203, 0.0859, 0.2734, -0.5701, 0.7361, -0.3649, 0.8359, 0.1719, 0.2734, 0.6864, -0.6234, -0.3746, 0.7969, 0.2031, 0.2109, 0.8484, -0.4354, -0.3012, -0.7969, 0.2031, 0.2109, -0.8532, -0.4084, -0.3243, -0.8359, 0.1719, 0.2734, -0.7465, -0.5659, -0.3498, 0.8906, 0.2422, 0.2656, 0.7261, -0.4989, -0.4731, -0.8906, 0.2422, 0.2656, -0.6655, -0.5609, -0.4923, 0.7188, -0.0234, 0.1719, 0.7313, 0.1263, -0.6702, 0.8906, 0.2344, 0.3203, 0.6593, -0.4685, -0.5881, -0.8906, 0.2344, 0.3203, -0.6639, -0.4673, -0.5838, -0.9531, 0.2891, 0.3438, -0.6215, -0.4422, -0.6466, -0.8438, 0.1719, 0.3203, -0.5176, -0.4523, -0.7263, 0.7656, 0.0938, 0.3203, 0.7584, 0.2665, -0.5948, -0.7656, 0.0938, 0.3203, -0.7675, 0.2336, -0.5969, -0.7578, 0.0938, 0.2734, -0.9543, 0.1026, -0.2806, 0.8203, 0.0859, 0.2734, 0.4814, 0.6344, -0.6048, -0.8281, 0.0781, 0.3203, -0.4243, 0.4571, -0.7816, 0.8281, 0.0781, 0.3203, 0.4492, 0.3799, -0.8086, -0.8516, 0.0156, 0.3203, -0.6593, -0.3517, -0.6645, 0.8125, -0.0156, 0.3203, 0.6450, 0.3101, -0.6984, -0.8125, -0.0156, 0.3203, -0.7098, 0.3132, -0.6309, 0.8828, -0.0156, 0.2656, -0.0434, 0.9405, -0.3371, -0.8828, -0.0156, 0.2656, 0.0413, 0.9530, -0.3001, 0.9531, 0.2891, 0.3438, 0.6482, -0.4206, -0.6347, -1.0391, 0.3281, 0.4141, -0.5205, -0.2498, -0.8165, 1.0391, 0.3281, 0.4141, 0.4618, -0.3291, -0.8237, -1.1875, 0.3438, 0.4844, 0.2607, -0.5229, -0.8115, 1.2578, 0.2422, 0.4922, -0.7551, 0.0224, -0.6552, -1.2578, 0.2422, 0.4922, 0.7564, -0.0876, -0.6482, -1.2109, 0.0859, 0.4844, 0.5640, 0.5479, -0.6178, 1.2109, 0.0859, 0.4844, -0.6207, 0.4376, -0.6506, -1.0469, 0.0000, 0.4219, -0.0631, 0.7003, -0.7110, 0.8516, 0.0156, 0.3203, 0.2929, 0.3709, -0.8812, 0.8906, 0.1094, 0.3281, 0.1951, 0.0389, -0.9800, -0.9375, 0.0625, 0.3359, -0.3975, 0.1464, -0.9058, 0.9375, 0.0625, 0.3359, -0.1907, 0.5192, -0.8331, 0.9609, 0.1719, 0.3516, 0.3347, -0.0046, -0.9423, -1.0000, 0.1250, 0.3672, -0.4182, -0.0769, -0.9051, -0.8906, 0.1094, 0.3281, -0.1933, -0.0056, -0.9811, 1.0000, 0.1250, 0.3672, 0.4605, -0.0522, -0.8861, 1.0547, 0.1875, 0.3828, 0.3144, -0.1037, -0.9436, -1.0547, 0.1875, 0.3828, -0.3254, -0.1152, -0.9385, -1.0156, 0.2344, 0.3750, -0.2996, -0.0545, -0.9525, 1.0156, 0.2344, 0.3750, 0.3343, 0.1068, -0.9364, 1.0859, 0.2734, 0.3906, 0.2897, 0.3158, -0.9035, -1.1094, 0.2109, 0.3906, -0.4628, -0.3818, -0.8000, -1.0859, 0.2734, 0.3906, -0.3586, 0.3081, -0.8812, -0.9609, 0.1719, 0.3516, -0.3723, -0.0194, -0.9279, 0.8438, 0.1719, 0.3203, 0.5725, -0.4189, -0.7047, 1.0469, 0.0000, 0.4219, 0.1481, 0.7017, -0.6969, 1.1094, 0.2109, 0.3906, 0.3831, -0.0685, -0.9211, 1.1875, 0.3438, 0.4844, -0.2113, -0.5485, -0.8089, 0.7891, -0.1250, 0.3281, -0.1016, -0.8343, 0.5418, -0.7891, -0.1250, 0.3281, 0.0917, -0.8428, 0.5303, -1.0391, -0.0859, 0.4922, 0.0555, -0.6765, 0.7343, 1.0391, -0.0859, 0.4922, -0.0349, -0.6861, 0.7267, -1.0391, -0.1016, 0.3281, -0.4613, -0.7982, -0.3875, -1.3125, 0.0547, 0.5312, -0.6466, -0.4789, 0.5937, 1.3672, 0.2969, 0.5000, 0.9253, 0.0918, 0.3680, 1.2500, 0.4688, 0.5469, 0.2873, 0.6209, 0.7293, -1.3672, 0.2969, 0.5000, -0.9240, 0.0860, 0.3726, -1.2500, 0.4688, 0.5469, -0.2792, 0.5978, 0.7514, -1.0234, 0.4375, 0.4844, 0.4142, 0.5509, 0.7245, 1.0234, 0.4375, 0.4844, -0.4278, 0.5755, 0.6970, -0.8594, 0.3828, 0.3828, 0.6500, 0.5846, 0.4853, 1.3125, 0.0547, 0.5312, 0.6502, -0.5100, 0.5631, 0.8594, 0.3828, 0.3828, -0.6611, 0.5885, 0.4653, 0.6250, 0.2422, -0.5625, 0.8682, -0.0047, -0.4961, 0.1562, 0.0547, -0.6484, -0.5472, -0.6394, -0.5400, 0.5312, 0.3359, -0.6797, -0.1346, -0.5529, -0.8222, 0.5469, 0.2109, -0.6719, -0.1477, 0.1899, -0.9706],
	                "indices": [0, 1, 2, 3, 4, 5, 6, 2, 7, 8, 3, 9, 2, 10, 11, 12, 13, 8, 1, 14, 10, 13, 15, 3, 14, 16, 10, 17, 18, 15, 10, 19, 11, 20, 17, 13, 19, 21, 22, 23, 24, 20, 16, 25, 21, 24, 26, 17, 25, 27, 21, 28, 29, 26, 21, 30, 31, 32, 28, 23, 30, 33, 34, 35, 36, 32, 27, 37, 33, 36, 38, 28, 37, 39, 33, 40, 41, 38, 33, 42, 34, 43, 40, 36, 42, 6, 44, 9, 5, 40, 39, 0, 42, 5, 45, 41, 0, 39, 46, 47, 41, 45, 39, 37, 48, 49, 38, 41, 37, 27, 50, 51, 29, 49, 27, 25, 52, 53, 26, 51, 25, 16, 52, 54, 18, 26, 16, 14, 55, 56, 15, 18, 14, 1, 57, 58, 4, 56, 1, 0, 46, 59, 45, 58, 60, 57, 46, 59, 58, 61, 62, 57, 60, 61, 58, 56, 60, 55, 62, 56, 54, 61, 60, 52, 55, 54, 53, 61, 60, 50, 52, 53, 51, 61, 60, 63, 50, 51, 49, 61, 60, 48, 63, 49, 47, 61, 60, 46, 48, 47, 59, 61, 64, 65, 66, 67, 68, 69, 70, 71, 64, 68, 72, 73, 74, 75, 71, 72, 76, 73, 77, 78, 75, 76, 79, 80, 81, 82, 78, 79, 83, 84, 85, 86, 87, 88, 89, 90, 86, 91, 87, 92, 93, 89, 91, 94, 95, 96, 97, 92, 94, 98, 95, 99, 100, 97, 98, 101, 102, 103, 104, 100, 101, 105, 106, 107, 108, 104, 105, 109, 110, 111, 112, 107, 109, 113, 114, 115, 116, 111, 113, 117, 118, 119, 120, 115, 117, 121, 122, 122, 121, 119, 123, 124, 118, 115, 125, 126, 124, 127, 110, 111, 128, 115, 129, 130, 127, 111, 107, 128, 131, 106, 129, 107, 103, 132, 133, 102, 131, 103, 99, 134, 135, 95, 133, 99, 96, 136, 137, 138, 135, 96, 92, 139, 140, 87, 138, 92, 88, 139, 141, 142, 87, 88, 90, 143, 141, 144, 145, 145, 146, 147, 123, 118, 148, 122, 119, 126, 148, 122, 149, 149, 122, 150, 145, 144, 151, 150, 146, 149, 152, 153, 67, 67, 153, 68, 154, 152, 65, 68, 155, 72, 156, 154, 75, 72, 157, 158, 82, 159, 160, 161, 162, 79, 156, 75, 78, 79, 76, 161, 163, 164, 159, 165, 164, 162, 160, 159, 165, 165, 162, 166, 167, 156, 166, 161, 158, 166, 168, 169, 170, 171, 172, 173, 174, 175, 168, 172, 176, 177, 178, 179, 174, 176, 180, 178, 181, 182, 179, 180, 182, 178, 164, 163, 183, 171, 173, 164, 183, 170, 184, 185, 171, 183, 182, 186, 179, 187, 186, 182, 179, 188, 189, 190, 187, 176, 175, 189, 169, 191, 190, 176, 169, 192, 193, 185, 191, 172, 186, 192, 188, 190, 191, 186, 186, 184, 192, 185, 184, 191, 178, 174, 142, 90, 177, 178, 174, 168, 142, 194, 195, 90, 168, 163, 196, 197, 173, 195, 163, 159, 198, 83, 162, 173, 81, 199, 82, 197, 200, 201, 199, 202, 198, 194, 203, 200, 85, 142, 196, 194, 90, 203, 156, 167, 204, 205, 167, 158, 154, 156, 206, 207, 158, 157, 152, 154, 208, 209, 157, 155, 153, 152, 210, 211, 155, 153, 210, 208, 212, 213, 211, 214, 208, 206, 212, 215, 209, 211, 206, 204, 216, 217, 207, 209, 204, 205, 218, 219, 205, 207, 219, 214, 212, 213, 214, 217, 218, 212, 216, 215, 213, 217, 151, 144, 220, 221, 146, 150, 148, 151, 222, 223, 150, 224, 123, 148, 222, 225, 224, 226, 144, 141, 227, 228, 147, 221, 141, 140, 227, 229, 143, 228, 140, 137, 230, 231, 139, 229, 137, 135, 232, 233, 234, 231, 135, 133, 235, 236, 136, 233, 133, 131, 235, 237, 134, 136, 131, 129, 238, 239, 132, 134, 129, 127, 240, 241, 128, 132, 127, 124, 242, 243, 125, 241, 124, 123, 242, 226, 126, 125, 242, 244, 245, 246, 226, 247, 240, 242, 248, 247, 243, 249, 250, 240, 251, 249, 241, 252, 238, 250, 253, 252, 239, 254, 235, 238, 255, 254, 237, 236, 232, 235, 255, 256, 236, 257, 230, 232, 258, 257, 233, 231, 259, 230, 260, 261, 231, 262, 227, 259, 263, 262, 229, 228, 264, 227, 263, 265, 228, 266, 244, 222, 267, 268, 225, 246, 222, 220, 269, 270, 223, 268, 220, 264, 271, 266, 221, 270, 121, 117, 272, 273, 120, 121, 117, 113, 274, 275, 116, 120, 113, 109, 276, 277, 112, 275, 109, 105, 276, 278, 108, 112, 105, 101, 279, 280, 104, 108, 101, 98, 281, 282, 100, 280, 98, 94, 281, 283, 97, 100, 94, 91, 284, 285, 93, 283, 91, 86, 286, 287, 89, 285, 288, 289, 290, 291, 289, 288, 292, 288, 293, 294, 288, 292, 295, 292, 296, 297, 292, 295, 64, 66, 295, 295, 66, 298, 70, 64, 296, 298, 69, 299, 74, 70, 300, 299, 73, 301, 77, 74, 302, 301, 80, 303, 302, 293, 290, 294, 297, 303, 302, 300, 296, 298, 299, 297, 304, 305, 306, 294, 303, 307, 81, 77, 305, 303, 84, 307, 199, 308, 202, 309, 310, 200, 81, 304, 199, 310, 307, 201, 85, 202, 311, 309, 203, 312, 85, 311, 86, 287, 313, 312, 314, 315, 316, 317, 318, 314, 316, 319, 320, 321, 317, 316, 320, 322, 323, 324, 321, 325, 325, 323, 306, 291, 324, 289, 304, 306, 308, 324, 291, 307, 326, 284, 327, 328, 285, 329, 330, 331, 314, 318, 332, 330, 333, 334, 335, 336, 337, 333, 335, 338, 339, 340, 336, 341, 341, 339, 331, 332, 340, 330, 342, 281, 343, 344, 282, 345, 346, 343, 347, 348, 344, 345, 347, 349, 350, 351, 348, 352, 353, 350, 354, 355, 351, 356, 357, 358, 354, 356, 359, 360, 331, 339, 361, 356, 340, 359, 339, 338, 353, 352, 336, 356, 338, 334, 347, 362, 337, 352, 334, 363, 346, 345, 364, 362, 279, 342, 363, 345, 280, 278, 365, 363, 333, 337, 364, 365, 274, 366, 276, 277, 275, 278, 274, 279, 363, 364, 278, 365, 272, 274, 365, 365, 273, 272, 281, 326, 343, 329, 283, 282, 367, 368, 349, 348, 369, 344, 368, 370, 350, 351, 371, 348, 357, 354, 370, 351, 355, 360, 323, 322, 372, 373, 321, 324, 327, 372, 374, 373, 375, 328, 284, 286, 372, 375, 287, 328, 286, 376, 308, 310, 309, 375, 308, 323, 372, 375, 324, 310, 286, 311, 376, 309, 313, 287, 357, 377, 358, 378, 379, 360, 331, 358, 315, 378, 359, 332, 374, 380, 377, 378, 373, 381, 322, 319, 380, 378, 317, 321, 315, 382, 319, 317, 378, 318, 383, 384, 385, 386, 387, 388, 383, 385, 389, 390, 391, 392, 393, 389, 394, 395, 390, 392, 394, 396, 397, 398, 395, 399, 397, 400, 401, 402, 398, 403, 401, 404, 405, 406, 402, 407, 404, 408, 405, 409, 410, 402, 400, 411, 404, 410, 412, 398, 396, 413, 411, 412, 414, 398, 389, 415, 413, 414, 416, 395, 385, 417, 389, 416, 418, 391, 385, 419, 420, 421, 386, 418, 327, 374, 422, 423, 381, 328, 374, 424, 405, 406, 407, 423, 367, 327, 422, 425, 328, 369, 370, 426, 419, 386, 427, 371, 405, 428, 429, 430, 409, 423, 431, 432, 429, 423, 433, 434, 435, 432, 431, 434, 433, 436, 437, 438, 435, 433, 439, 440, 426, 438, 441, 440, 439, 427, 419, 426, 420, 442, 427, 386, 368, 438, 370, 427, 439, 369, 368, 422, 438, 433, 425, 369, 422, 443, 432, 433, 423, 425, 420, 441, 444, 445, 442, 446, 441, 437, 444, 447, 440, 442, 437, 435, 448, 449, 450, 447, 435, 451, 448, 452, 436, 450, 451, 431, 453, 454, 434, 436, 431, 429, 455, 456, 430, 454, 429, 428, 457, 458, 409, 430, 417, 420, 459, 446, 421, 460, 415, 417, 461, 460, 418, 462, 413, 415, 463, 462, 416, 414, 411, 413, 463, 464, 414, 465, 408, 411, 466, 465, 412, 467, 428, 408, 457, 467, 410, 458, 453, 468, 469, 470, 454, 452, 469, 471, 472, 473, 470, 474, 472, 475, 476, 477, 473, 478, 479, 476, 480, 481, 477, 478, 461, 459, 479, 478, 446, 482, 444, 472, 459, 478, 483, 445, 444, 484, 472, 474, 447, 445, 453, 469, 484, 447, 474, 449, 455, 457, 468, 470, 458, 456, 485, 475, 457, 470, 473, 467, 466, 476, 485, 473, 477, 465, 463, 486, 466, 477, 481, 464, 487, 480, 486, 481, 482, 464, 461, 480, 487, 462, 482, 460, 401, 424, 488, 489, 407, 490, 397, 401, 491, 490, 492, 493, 394, 397, 494, 493, 403, 399, 393, 394, 495, 496, 399, 392, 383, 393, 495, 497, 392, 498, 384, 383, 499, 498, 388, 500, 499, 491, 488, 489, 490, 500, 499, 495, 491, 493, 497, 498, 495, 494, 501, 493, 496, 497, 357, 370, 384, 387, 371, 500, 357, 502, 377, 489, 500, 360, 374, 377, 488, 489, 379, 381, 6, 0, 2, 4, 45, 5, 503, 6, 7, 3, 5, 9, 7, 2, 11, 13, 3, 8, 2, 1, 10, 15, 4, 3, 16, 19, 10, 13, 17, 15, 19, 504, 11, 12, 20, 13, 504, 19, 22, 24, 17, 20, 19, 16, 21, 26, 18, 17, 27, 30, 21, 24, 28, 26, 22, 21, 31, 28, 24, 23, 31, 30, 34, 36, 28, 32, 30, 27, 33, 38, 29, 28, 39, 42, 33, 36, 40, 38, 42, 44, 34, 35, 43, 36, 6, 503, 44, 43, 9, 40, 0, 6, 42, 40, 5, 41, 39, 48, 46, 59, 47, 45, 37, 63, 48, 47, 49, 41, 63, 37, 50, 29, 38, 49, 50, 27, 52, 26, 29, 51, 16, 55, 52, 53, 54, 26, 14, 62, 55, 54, 56, 18, 62, 14, 57, 4, 15, 56, 57, 1, 46, 45, 4, 58, 65, 67, 66, 66, 67, 69, 71, 65, 64, 69, 68, 73, 70, 74, 71, 76, 80, 73, 74, 77, 75, 79, 84, 80, 77, 81, 78, 83, 201, 84, 142, 85, 87, 89, 312, 90, 91, 138, 87, 88, 92, 89, 138, 91, 95, 97, 93, 92, 98, 102, 95, 96, 99, 97, 101, 106, 102, 99, 103, 100, 105, 130, 106, 103, 107, 104, 130, 105, 110, 112, 108, 107, 110, 109, 114, 116, 112, 111, 114, 113, 118, 120, 116, 115, 118, 117, 122, 121, 120, 119, 124, 114, 118, 119, 115, 126, 114, 124, 110, 128, 125, 115, 130, 110, 127, 107, 132, 128, 106, 130, 129, 103, 134, 132, 102, 106, 131, 99, 136, 134, 95, 102, 133, 96, 234, 136, 138, 95, 135, 234, 96, 139, 137, 140, 138, 88, 143, 139, 140, 141, 87, 90, 147, 143, 142, 141, 145, 90, 145, 147, 118, 122, 148, 224, 122, 126, 151, 148, 149, 122, 224, 150, 149, 145, 151, 146, 145, 149, 65, 152, 67, 153, 155, 68, 71, 154, 65, 155, 157, 72, 154, 71, 75, 76, 72, 158, 78, 82, 160, 162, 83, 79, 160, 156, 78, 76, 158, 161, 164, 165, 159, 164, 173, 162, 166, 160, 165, 162, 161, 166, 156, 160, 166, 158, 167, 166, 163, 168, 170, 172, 195, 173, 175, 169, 168, 195, 172, 177, 179, 175, 174, 177, 176, 178, 178, 181, 179, 182, 181, 178, 163, 170, 183, 183, 171, 164, 170, 193, 184, 184, 185, 183, 186, 188, 179, 180, 187, 182, 175, 179, 189, 187, 180, 176, 189, 192, 169, 172, 191, 176, 170, 169, 193, 171, 185, 172, 192, 189, 188, 187, 190, 186, 184, 193, 192, 184, 186, 191, 145, 178, 142, 145, 90, 178, 168, 196, 142, 195, 177, 90, 163, 198, 196, 194, 197, 195, 159, 82, 198, 197, 83, 173, 199, 198, 82, 83, 197, 201, 202, 196, 198, 197, 194, 200, 202, 85, 196, 90, 312, 203, 167, 205, 204, 207, 205, 158, 156, 204, 206, 209, 207, 157, 154, 206, 208, 211, 209, 155, 152, 208, 210, 210, 211, 153, 214, 210, 212, 211, 210, 214, 206, 216, 212, 213, 215, 211, 204, 218, 216, 215, 217, 209, 205, 219, 218, 217, 219, 207, 218, 219, 212, 214, 219, 217, 144, 264, 220, 223, 221, 150, 151, 220, 222, 225, 223, 224, 244, 123, 222, 224, 126, 226, 264, 144, 227, 147, 146, 221, 140, 259, 227, 143, 147, 228, 259, 140, 230, 139, 143, 229, 230, 137, 232, 234, 139, 231, 232, 135, 235, 136, 234, 233, 131, 238, 235, 236, 237, 136, 129, 250, 238, 237, 239, 134, 250, 129, 240, 239, 241, 132, 240, 127, 242, 125, 128, 241, 123, 244, 242, 243, 226, 125, 248, 242, 245, 226, 243, 247, 251, 240, 248, 243, 241, 249, 253, 250, 251, 241, 239, 252, 505, 238, 253, 239, 237, 254, 238, 505, 255, 256, 254, 236, 506, 232, 255, 236, 233, 257, 232, 506, 258, 261, 257, 231, 230, 258, 260, 231, 229, 262, 259, 260, 263, 265, 262, 228, 271, 264, 263, 228, 221, 266, 245, 244, 267, 225, 226, 246, 267, 222, 269, 223, 225, 268, 269, 220, 271, 221, 223, 270, 117, 274, 272, 272, 273, 121, 113, 366, 274, 273, 275, 120, 366, 113, 276, 112, 116, 275, 105, 279, 276, 277, 278, 112, 101, 342, 279, 278, 280, 108, 342, 101, 281, 100, 104, 280, 94, 326, 281, 282, 283, 100, 326, 94, 284, 93, 97, 283, 284, 91, 286, 89, 93, 285, 289, 306, 290, 294, 291, 288, 288, 290, 293, 297, 294, 292, 292, 293, 296, 298, 297, 295, 296, 64, 295, 66, 69, 298, 300, 70, 296, 69, 73, 299, 302, 74, 300, 73, 80, 301, 305, 77, 302, 80, 84, 303, 305, 302, 290, 297, 301, 303, 293, 302, 296, 299, 301, 297, 305, 290, 306, 291, 294, 307, 304, 81, 305, 84, 201, 307, 308, 376, 202, 203, 309, 200, 304, 308, 199, 200, 310, 201, 202, 376, 311, 313, 309, 312, 311, 286, 86, 89, 287, 312, 315, 319, 316, 316, 317, 314, 319, 322, 320, 320, 321, 316, 325, 320, 323, 321, 320, 325, 289, 325, 306, 324, 325, 289, 306, 323, 308, 310, 324, 307, 367, 326, 327, 285, 283, 329, 331, 315, 314, 314, 318, 330, 334, 338, 335, 335, 336, 333, 341, 335, 339, 336, 335, 341, 330, 341, 331, 340, 341, 330, 346, 342, 343, 282, 280, 345, 343, 349, 347, 362, 348, 345, 353, 347, 350, 348, 362, 352, 361, 353, 354, 351, 352, 356, 358, 361, 354, 355, 356, 360, 358, 331, 361, 340, 332, 359, 361, 339, 353, 336, 340, 356, 353, 338, 347, 337, 336, 352, 347, 334, 346, 364, 337, 362, 342, 346, 363, 364, 345, 278, 363, 334, 333, 333, 337, 365, 279, 274, 276, 275, 273, 278, 365, 274, 363, 278, 273, 365, 326, 367, 343, 344, 329, 282, 343, 367, 349, 369, 329, 344, 349, 368, 350, 371, 369, 348, 354, 350, 370, 371, 351, 360, 322, 380, 372, 375, 373, 324, 372, 380, 374, 381, 373, 328, 327, 284, 372, 287, 285, 328, 372, 286, 308, 309, 287, 375, 377, 382, 358, 359, 378, 360, 358, 382, 315, 318, 378, 332, 380, 382, 377, 379, 378, 381, 319, 382, 380, 373, 378, 321, 384, 419, 385, 391, 386, 388, 393, 383, 389, 391, 388, 392, 389, 396, 394, 399, 395, 392, 396, 400, 397, 403, 398, 399, 400, 404, 401, 492, 402, 403, 424, 401, 405, 402, 492, 407, 408, 428, 405, 406, 409, 402, 411, 408, 404, 402, 410, 398, 400, 396, 411, 414, 395, 398, 396, 389, 413, 416, 390, 395, 417, 415, 389, 390, 416, 391, 417, 385, 420, 386, 391, 418, 374, 443, 422, 425, 423, 328, 443, 374, 405, 407, 381, 423, 368, 367, 422, 328, 329, 369, 384, 370, 419, 387, 386, 371, 443, 405, 429, 409, 406, 423, 432, 443, 429, 430, 423, 434, 451, 435, 431, 433, 450, 436, 438, 432, 435, 450, 433, 440, 438, 437, 441, 442, 440, 427, 426, 441, 420, 421, 442, 386, 438, 426, 370, 371, 427, 369, 422, 432, 438, 439, 433, 369, 459, 420, 444, 442, 421, 446, 437, 484, 444, 445, 447, 442, 484, 437, 448, 450, 440, 447, 451, 453, 448, 449, 452, 450, 431, 468, 453, 452, 454, 436, 468, 431, 455, 430, 434, 454, 455, 429, 457, 456, 458, 430, 461, 417, 459, 421, 418, 460, 487, 415, 461, 418, 416, 462, 415, 487, 463, 464, 462, 414, 466, 411, 463, 414, 412, 465, 485, 408, 466, 412, 410, 467, 408, 485, 457, 410, 409, 458, 468, 471, 469, 474, 470, 452, 471, 475, 472, 483, 473, 474, 479, 472, 476, 473, 483, 478, 476, 486, 480, 482, 481, 478, 480, 461, 479, 446, 460, 482, 472, 479, 459, 446, 478, 445, 484, 469, 472, 483, 474, 445, 448, 453, 484, 474, 452, 449, 457, 471, 468, 454, 470, 456, 475, 471, 457, 458, 470, 467, 476, 475, 485, 467, 473, 465, 486, 476, 466, 465, 477, 464, 463, 487, 486, 482, 462, 464, 491, 401, 488, 407, 492, 490, 501, 397, 491, 492, 403, 493, 397, 501, 494, 496, 493, 399, 394, 494, 495, 497, 496, 392, 499, 383, 495, 392, 388, 498, 502, 384, 499, 388, 387, 500, 502, 499, 488, 490, 498, 500, 495, 501, 491, 490, 493, 498, 502, 357, 384, 371, 360, 500, 502, 488, 377, 379, 489, 360, 424, 374, 488, 407, 489, 381],
	                "subMeshes": [{ "materialIndex": 0, "verticesStart": 0, "verticesCount": 507, "indexStart": 0, "indexCount": 2904 }] }], "multiMaterials": []
	};
	//# sourceMappingURL=monkey.js.map

/***/ }
/******/ ]);