"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector_1 = require('./Vector');
// Clamping values to keep them between 0 and 1
function clamp(value) {
    var min = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
    var max = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

    return Math.max(min, Math.min(value, max));
}
// Interpolating the value between 2 vertices.  min is the starting point, max
// the ending point, and gradient the % between the 2 points
function interpolate(min, max, gradient) {
    return min + (max - min) * clamp(gradient);
}

var Device = function () {
    function Device(canvas) {
        _classCallCheck(this, Device);

        this.v = Vector_1.Vector.xyz(0, 0, 0); // Scratch pad
        this.c = Vector_1.Vector.xyz(0, 0, 0); // Color scratch pad
        this.data = { y: 0, ndotla: 0, ndotlb: 0, ndotlc: 0, ndotld: 0 };
        this.light = {
            position: Vector_1.Vector.xyz(0, 10, 10)
        };
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
        value: function project(v, t, w, i) {
            t.vmuli(v.position, i.position);
            var x = i.position.x * this.workingWidth / 2 + this.workingWidth / 2.0;
            var y = -i.position.y * this.workingHeight / 2 + this.workingHeight / 2.0;
            i.position.set(x, y, i.position.z, 0);
            w.vmuli(v.position, i.worldPosition);
            w.vmuli(v.normal, i.normal);
            i.normal.set(i.normal.x, i.normal.y, i.normal.z);
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
        value: function scanLine(va, vb, vc, vd, color) {
            var y = this.data.y;
            var pa = va.position;
            var pb = vb.position;
            var pc = vc.position;
            var pd = vd.position;
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
                var ndotl = this.data.ndotla;
                this.drawPoint(this.v.set(x, y, z), this.c.set(color.x * ndotl, color.y * ndotl, color.z * ndotl, color.w));
            }
        }
    }, {
        key: 'computeNdotL',
        value: function computeNdotL(position, normal, light) {
            var direction = light.sub(position);
            normal.normalizei();
            direction.normalizei();
            var lighting = normal.dot(direction);
            return Math.max(0, lighting);
        }
    }, {
        key: 'drawTriangle',
        value: function drawTriangle(v0, v1, v2, color) {
            // Calculate lighting
            var face = v0.normal.add(v1.normal.add(v2.normal));
            face.scalei(1 / 3, face);
            var center = v0.worldPosition.add(v1.worldPosition.add(v2.worldPosition));
            center.scalei(1 / 3, center);
            this.data.ndotla = this.computeNdotL(center, face, this.light.position);
            if (this.data.ndotla <= 0) {
                return;
            }
            // Sort triangles so that v0.y >= v1.y >= v2.y
            if (v0.position.y > v1.position.y) {
                var _ref = [v0, v1];
                v1 = _ref[0];
                v0 = _ref[1];
            }
            if (v1.position.y > v2.position.y) {
                var _ref2 = [v1, v2];
                v2 = _ref2[0];
                v1 = _ref2[1];
            }
            if (v0.position.y > v1.position.y) {
                var _ref3 = [v0, v1];
                v1 = _ref3[0];
                v0 = _ref3[1];
            }
            var p0 = v0.position;
            var p1 = v1.position;
            var p2 = v2.position;
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
                        this.data.y = y;
                        this.scanLine(v0, v2, v0, v1, color);
                    } else {
                        this.scanLine(v0, v2, v1, v2, color);
                    }
                }
            } else {
                for (var _y = p0.y | 0; _y <= (p2.y | 0); _y++) {
                    if (_y < p1.y) {
                        this.data.y = _y;
                        this.scanLine(v0, v1, v0, v2, color);
                    } else {
                        this.scanLine(v1, v2, v0, v2, color);
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
            var p0 = {
                position: Vector_1.Vector.xyz(0, 0, 0),
                normal: Vector_1.Vector.xyz(0, 0, 0),
                worldPosition: Vector_1.Vector.xyz(0, 0, 0)
            };
            var p1 = {
                position: Vector_1.Vector.xyz(0, 0, 0),
                normal: Vector_1.Vector.xyz(0, 0, 0),
                worldPosition: Vector_1.Vector.xyz(0, 0, 0)
            };
            var p2 = {
                position: Vector_1.Vector.xyz(0, 0, 0),
                normal: Vector_1.Vector.xyz(0, 0, 0),
                worldPosition: Vector_1.Vector.xyz(0, 0, 0)
            };
            var color = Vector_1.Vector.xyz(0, 0, 0);
            var c = void 0;
            for (var i = 0; i < meshes.length; i++) {
                mesh = meshes[i];
                transform = camera.matrix.mmul(mesh.matrix);
                if (mesh.faces.length > 0) {
                    for (var f = 0; f < mesh.faces.length; f++) {
                        face = mesh.faces[f];
                        this.project(mesh.vertices[face.A], transform, camera.matrix, p0);
                        this.project(mesh.vertices[face.B], transform, camera.matrix, p1);
                        this.project(mesh.vertices[face.C], transform, camera.matrix, p2);
                        c = .25 + f % mesh.faces.length / mesh.faces.length * 0.75;
                        mesh.color.scalei(c, color);
                        color.set(color.x, color.y, color.z, mesh.color.w);
                        this.drawTriangle(p0, p1, p2, color);
                    }
                } else {
                    for (var v = 0; v < mesh.vertices.length - 1; v++) {
                        this.project(mesh.vertices[v], transform, camera.matrix, p0);
                        this.project(mesh.vertices[v + 1], transform, camera.matrix, p1);
                        this.drawLine(p0.position, p1.position, mesh.color);
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