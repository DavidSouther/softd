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

	var camera_1 = __webpack_require__(1);
	var device_1 = __webpack_require__(4);
	var mesh_1 = __webpack_require__(7);
	var vector_1 = __webpack_require__(3);
	document.addEventListener('DOMContentLoaded', init, false);
	var canvas = void 0;
	var device = void 0;
	var meshes = [mesh_1.Mesh.Cube];
	var mera = new camera_1.Camera();
	function init() {
	    canvas = document.getElementsByTagName('canvas')[0];
	    device = new device_1.Device(canvas);
	    mera.position = vector_1.Vector.xyz(0, 0, 10);
	    mera.target = meshes[0].position;
	    requestAnimationFrame(renderLoop);
	}
	function renderLoop() {
	    device.reset();
	    device.render(mera, meshes);
	    device.present();
	    mera.position = mera.position.add(vector_1.Vector.xyz(0, 0, .1));
	    meshes[0].rotation = meshes[0].rotation.add(vector_1.Vector.xyz(.01, .01, .01));
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

	        this._position = vector_1.Vector.xyz(0, 0, 20);
	        this._target = vector_1.Vector.Zero;
	        this._fov = 110 * DEG_TO_HALF_RAD;
	        this._aspect = 4 / 3;
	        this._znear = 0.1;
	        this._zfar = 100;
	        this._lookat = matrix_1.Matrix.lookAt(this._position, this._target);
	        this.updateProjection();
	    }

	    _createClass(Camera, [{
	        key: 'updateLookat',
	        value: function updateLookat() {
	            this._lookat = matrix_1.Matrix.lookAt(this._position, this._target);
	            this._matrix = this._lookat.mmul(this._projection);
	        }
	    }, {
	        key: 'updateProjection',
	        value: function updateProjection() {
	            var f_n = this._zfar - this._znear;
	            var sy = 1 / Math.tan(this._fov);
	            var sx = sy / this._aspect;
	            this._projection = new matrix_1.Matrix([sx, 0, 0, 0, 0, sy, 0, 0, 0, 0, (this._zfar + this._znear) / f_n, -1, 0, 0, 2 * this._zfar * this._znear / f_n, 0]);
	            this._matrix = this._lookat.mmul(this._projection);
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
	            return new vector_1.Vector([a00 * bx + a01 * by + a02 * bz + a03 * bw, a10 * bx + a11 * by + a12 * bz + a13 * bw, a20 * bx + a21 * by + a22 * bz + a23 * bw, a30 * bx + a31 * by + a32 * bz + a33 * bw]);
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
	            var sr = Math.cos(roll);
	            return new Matrix([1, 0, 0, 0, 0, cp, -sp, 0, 0, sp, cp, 0, 0, 0, 0, 1]).mmul(new Matrix([cy, 0, sy, 0, 0, 1, 0, 0, -sy, 0, cy, 0, 0, 0, 0, 1])).mmul(new Matrix([cr, -sr, 0, 0, sr, cr, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]));
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
	            var yaxis = zaxis.cross(xaxis);
	            var zdotu = zaxis.dot(u);
	            var ydotu = yaxis.dot(u);
	            var xdotu = xaxis.dot(u);
	            return Matrix.from([xaxis.x, yaxis.x, zaxis.x, 0, xaxis.y, yaxis.y, zaxis.y, 0, xaxis.z, yaxis.z, zaxis.z, 0, -xdotu, -ydotu, -zdotu, 1]);
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
	            var v = this._array;
	            return new Vector([v[0] * s, v[1] * s, v[2] * s, v[3] * s]);
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

	var Matrix_1 = __webpack_require__(5);
	var Vector_1 = __webpack_require__(6);

	var Device = function () {
	    function Device(canvas) {
	        _classCallCheck(this, Device);

	        this.workingCanvas = canvas;
	        this.workingWidth = canvas.width;
	        this.workingHeight = canvas.height;
	        this.workingContext = this.workingCanvas.getContext('2d');
	    }

	    _createClass(Device, [{
	        key: 'reset',
	        value: function reset() {
	            this.backbuffer = new Uint8ClampedArray(4 * this.workingWidth * this.workingHeight);
	            for (var i = 0; i < this.workingWidth * this.workingHeight; i++) {
	                this.backbuffer[3 + i * 4] = 255;
	            }
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
	            var index = ((v.x | 0) + (v.y | 0) * this.workingWidth) * 4;
	            data[index + 0] = color.x * 255;
	            data[index + 1] = color.y * 255;
	            data[index + 2] = color.z * 255;
	            data[index + 3] = color.w * 255;
	        }
	    }, {
	        key: 'drawLine',
	        value: function drawLine(p0, p1) {
	            var dist = p1.sub(p0).length;
	            if (dist < 2) return;
	            var middle = p0.add(p1.sub(p0).scale(0.5));
	            this.drawPoint(middle);
	            this.drawLine(p0, middle);
	            this.drawLine(middle, p1);
	        }
	    }, {
	        key: 'project',
	        value: function project(v, t) {
	            var point = t.vmul(v);
	            var x = point.x * this.workingWidth / 2 + this.workingWidth / 2.0;
	            var y = -point.y * this.workingHeight / 2 + this.workingHeight / 2.0;
	            return Vector_1.Vector.xyz(x, y, 0);
	        }
	    }, {
	        key: 'drawPoint',
	        value: function drawPoint(p) {
	            if (p.x >= 0 && p.y >= 0 && p.x < this.workingWidth && p.y < this.workingHeight) {
	                this.putPixel(p, Device.Yellow);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render(camera, meshes) {
	            var transform = void 0;
	            var mesh = void 0;
	            var face = void 0;
	            var p0 = void 0;
	            var p1 = void 0;
	            var p2 = void 0;
	            for (var i = 0; i < meshes.length; i++) {
	                mesh = meshes[i];
	                transform = Matrix_1.Matrix.pitchYawRoll(mesh.rotation).mmul(Matrix_1.Matrix.translation(mesh.position)).mmul(camera.matrix);
	                for (var f = 0; f < mesh.faces.length; f++) {
	                    face = mesh.faces[f];
	                    p0 = this.project(mesh.verticies[face.A], transform);
	                    p1 = this.project(mesh.verticies[face.B], transform);
	                    p2 = this.project(mesh.verticies[face.C], transform);
	                    this.drawLine(p0, p1);
	                    this.drawLine(p1, p2);
	                    this.drawLine(p2, p0);
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
	            return new vector_1.Vector([a00 * bx + a01 * by + a02 * bz + a03 * bw, a10 * bx + a11 * by + a12 * bz + a13 * bw, a20 * bx + a21 * by + a22 * bz + a23 * bw, a30 * bx + a31 * by + a32 * bz + a33 * bw]);
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
	            var sr = Math.cos(roll);
	            return new Matrix([1, 0, 0, 0, 0, cp, -sp, 0, 0, sp, cp, 0, 0, 0, 0, 1]).mmul(new Matrix([cy, 0, sy, 0, 0, 1, 0, 0, -sy, 0, cy, 0, 0, 0, 0, 1])).mmul(new Matrix([cr, -sr, 0, 0, sr, cr, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]));
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
	            var yaxis = zaxis.cross(xaxis);
	            var zdotu = zaxis.dot(u);
	            var ydotu = yaxis.dot(u);
	            var xdotu = xaxis.dot(u);
	            return Matrix.from([xaxis.x, yaxis.x, zaxis.x, 0, xaxis.y, yaxis.y, zaxis.y, 0, xaxis.z, yaxis.z, zaxis.z, 0, -xdotu, -ydotu, -zdotu, 1]);
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
/* 6 */
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
	            var v = this._array;
	            return new Vector([v[0] * s, v[1] * s, v[2] * s, v[3] * s]);
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var vector_1 = __webpack_require__(3);

	var Mesh = function () {
	    function Mesh(name, vertCount, faceCount) {
	        _classCallCheck(this, Mesh);

	        this.name = name;
	        this.position = vector_1.Vector.Zero;
	        this.rotation = vector_1.Vector.Zero;
	        this.verticies = new Array(vertCount);
	        this.faces = new Array(faceCount);
	    }

	    _createClass(Mesh, null, [{
	        key: "Cube",
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
	    }]);

	    return Mesh;
	}();

	exports.Mesh = Mesh;
	//# sourceMappingURL=Mesh.js.map

/***/ }
/******/ ]);