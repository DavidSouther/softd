import { Camera } from './camera';
import { Device } from './device';
import { Mesh } from './mesh';
import { Vector } from './vector';

document.addEventListener('DOMContentLoaded', init, false);

let canvas: HTMLCanvasElement;
let device: Device;
let meshes: Mesh[] = [Mesh.Cube, ...Mesh.Axes];
let mera: Camera = new Camera();

function init() {
  canvas = <HTMLCanvasElement>document.getElementsByTagName('canvas')[0];
  device = new Device(canvas);

  mera.position = Vector.xyz(0, 0, 10);
  mera.target = meshes[0].position;

  requestAnimationFrame(renderLoop);
}

function renderLoop() {
  device.reset();
  device.render(mera, meshes);
  device.present();
  //mera.position = mera.position.add(Vector.xyz(0, 0, 1));
  //mera.position = mera.position.add(Vector.xyz(0, 1, 0));
  mera.position = mera.position.add(Vector.xyz(1, 0, 0));
  //meshes[0].rotation = meshes[0].rotation.add(Vector.xyz(0, 0, .01));
  //meshes[0].rotation = meshes[0].rotation.add(Vector.xyz(0, .01, 0));
  //meshes[0].rotation = meshes[0].rotation.add(Vector.xyz(.01, 0, 0));
  requestAnimationFrame(renderLoop);
}
