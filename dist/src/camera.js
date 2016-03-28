"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var matrix_1 = require('./matrix');
var vector_1 = require('./vector');
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