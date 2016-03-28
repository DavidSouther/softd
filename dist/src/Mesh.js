"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var matrix_1 = require('./matrix');
var vector_1 = require('./vector');
var monkey_1 = require('./monkey');

var Mesh = function () {
    function Mesh(name, vertCount, faceCount) {
        _classCallCheck(this, Mesh);

        this.name = name;
        this._position = vector_1.Vector.Zero;
        this._rotation = vector_1.Vector.Zero;
        this.color = new vector_1.Vector([1, 1, 1, 1]);
        this.vertices = new Array(vertCount);
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
                    // Load position
                    var x = vArray[i * vStep + 0];
                    var y = vArray[i * vStep + 1];
                    var z = vArray[i * vStep + 2];
                    // Load normals
                    var l = vArray[i * vStep + 3];
                    var _m = vArray[i * vStep + 4];
                    var n = vArray[i * vStep + 5];
                    mesh.vertices[i] = {
                        position: vector_1.Vector.xyz(x, y, z),
                        normal: vector_1.Vector.xyz(l, _m, n),
                        worldPosition: null
                    };
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
            x.vertices[0] = {
                position: vector_1.Vector.Zero,
                normal: vector_1.Vector.xyz(1, 0, 0),
                worldPosition: null
            };
            x.vertices[1] = {
                position: vector_1.Vector.xyz(1, 0, 0),
                normal: vector_1.Vector.xyz(1, 0, 0),
                worldPosition: null
            };
            x.color = new vector_1.Vector([1, 0, 0, 1]);
            var y = new Mesh("Y Axis", 2, 0);
            y.vertices[0] = {
                position: vector_1.Vector.Zero,
                normal: vector_1.Vector.xyz(0, 1, 0),
                worldPosition: null
            };
            y.vertices[1] = {
                position: vector_1.Vector.xyz(0, 1, 0),
                normal: vector_1.Vector.xyz(0, 1, 0),
                worldPosition: null
            };
            y.color = new vector_1.Vector([0, 1, 0, 1]);
            var z = new Mesh("Z Axis", 2, 0);
            z.vertices[0] = {
                position: vector_1.Vector.Zero,
                normal: vector_1.Vector.xyz(0, 0, 1),
                worldPosition: null
            };
            z.vertices[1] = {
                position: vector_1.Vector.xyz(0, 0, 1),
                normal: vector_1.Vector.xyz(0, 0, 1),
                worldPosition: null
            };
            z.color = new vector_1.Vector([0, 0, 1, 1]);
            return [x, y, z];
        }
    }, {
        key: 'Cube',
        get: function get() {
            var m = new Mesh("Cube", 8, 12);
            m.vertices[7] = {
                position: vector_1.Vector.xyz(-1, -1, -1),
                normal: vector_1.Vector.xyz(-1, -1, -1),
                worldPosition: null
            };
            m.vertices[2] = {
                position: vector_1.Vector.xyz(-1, -1, 1),
                normal: vector_1.Vector.xyz(-1, -1, 1),
                worldPosition: null
            };
            m.vertices[4] = {
                position: vector_1.Vector.xyz(-1, 1, -1),
                normal: vector_1.Vector.xyz(-1, 1, -1),
                worldPosition: null
            };
            m.vertices[0] = {
                position: vector_1.Vector.xyz(-1, 1, 1),
                normal: vector_1.Vector.xyz(-1, 1, 1),
                worldPosition: null
            };
            m.vertices[6] = {
                position: vector_1.Vector.xyz(1, -1, -1),
                normal: vector_1.Vector.xyz(1, -1, -1),
                worldPosition: null
            };
            m.vertices[3] = {
                position: vector_1.Vector.xyz(1, -1, 1),
                normal: vector_1.Vector.xyz(1, -1, 1),
                worldPosition: null
            };
            m.vertices[5] = {
                position: vector_1.Vector.xyz(1, 1, -1),
                normal: vector_1.Vector.xyz(1, 1, -1),
                worldPosition: null
            };
            m.vertices[1] = {
                position: vector_1.Vector.xyz(1, 1, 1),
                normal: vector_1.Vector.xyz(1, 1, 1),
                worldPosition: null
            };
            for (var i = 0; i < 8; i++) {
                m.vertices[i].normal.normalizei();
            }
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