import { Camera } from "./camera.ts";
import { Device } from "./device.ts";
import { Mesh } from "./mesh.ts";
import { Vector } from "./vector.ts";

document.addEventListener("DOMContentLoaded", init, false);

let canvas: HTMLCanvasElement;
let device: Device;
const lights = [Vector.xyz(0, 3, -10)];
const meshes: Mesh[] = [
  //   Mesh.Triangle,
  //   Mesh.Cube,
  ...Mesh.Monkey,
  //   ...Mesh.Axes,
];
// meshes[0].color = Device.Red;
// meshes[0].scale(1.3);
// meshes[1].color = Device.Blue;
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
  device.render(mera, meshes, lights);
  device.present();

  meshes[0].rotation = meshes[0].rotation.add(Vector.xyz(0, 0.001, 0));
  //   meshes[1].rotation = meshes[1].rotation.add(Vector.xyz(0, 0.001, 0));

  requestAnimationFrame(renderLoop);
}
