"use strict";

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var camera_1 = require('./camera');
var device_1 = require('./device');
var mesh_1 = require('./mesh');
var vector_1 = require('./vector');
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
    meshes[0].rotation = meshes[0].rotation.add(vector_1.Vector.xyz(0, 0.01, 0));
    requestAnimationFrame(renderLoop);
}
//# sourceMappingURL=scene.js.map