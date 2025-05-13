import { Camera } from "./camera.ts";
import { Device } from "./device.ts";
import { Mesh } from "./mesh.ts";
import { Vector } from "./vector.ts";

document.addEventListener("DOMContentLoaded", init, false);

let canvas: HTMLCanvasElement;
let device: Device;
const meshes: Mesh[] = [/*Mesh.Cube, */ ...Mesh.Monkey, ...Mesh.Axes];
const mera: Camera = new Camera();

function init() {
  canvas = document.getElementsByTagName("canvas")[0];
  device = new Device(canvas);

  mera.position = Vector.xyz(1, 2, -8);
  mera.target = meshes[0].position;

  requestAnimationFrame(renderLoop);
}

const s = 1;
function renderLoop() {
  device.reset();
  device.render(mera, meshes);
  device.present();

  meshes[0].rotation = meshes[0].rotation.add(Vector.xyz(0, 0.01, 0));

  requestAnimationFrame(renderLoop);
}
