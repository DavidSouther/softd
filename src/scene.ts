import { Camera } from './camera';
import { Device } from './device';
import { Mesh } from './mesh';
import { Vector } from './vector';

document.addEventListener('DOMContentLoaded', init, false);

let canvas: HTMLCanvasElement;
let device: Device;
let meshes: Mesh[] = [Mesh.Cube, /*...Mesh.Monkey,*/ ...Mesh.Axes];
let mera: Camera = new Camera();

function init() {
  canvas = <HTMLCanvasElement>document.getElementsByTagName('canvas')[0];
  device = new Device(canvas);

  mera.position = Vector.xyz(1, 2, -8);
  mera.target = meshes[0].position;

  requestAnimationFrame(renderLoop);
}

let s = 1;
function renderLoop() {
  device.reset();
  device.render(mera, meshes);
  device.present();

  meshes[0].rotation = meshes[0].rotation.add(Vector.xyz(0.01, 0.01, 0));

  requestAnimationFrame(renderLoop);
}
