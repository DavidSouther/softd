import {Camera} from './camera';
import {Matrix} from './Matrix';
import {Mesh, Face} from './Mesh';
import {Vector} from './Vector';

export class Device {
  private backbuffer: Uint8ClampedArray;
  private workingCanvas: HTMLCanvasElement;
  private workingWidth: number;
  private workingHeight: number;
  private workingContext: CanvasRenderingContext2D;
  constructor(canvas: HTMLCanvasElement) {
    this.workingCanvas = canvas;
    this.workingWidth = canvas.width;
    this.workingHeight = canvas.height;
    this.workingContext = this.workingCanvas.getContext('2d');
  }

  get width(): number { return this.workingWidth; }
  get height(): number { return this.workingHeight; }

  reset() {
    this.backbuffer =
        new Uint8ClampedArray(4 * this.workingWidth * this.workingHeight);
    for (let i = 0; i < this.workingWidth * this.workingHeight; i++) {
      this.backbuffer[3 + (i * 4)] = 255;
    }
  }

  present() {
    this.workingContext.putImageData(
        new ImageData(this.backbuffer, this.workingWidth, this.workingHeight),
        0, 0);
  }

  putPixel(v: Vector, color: Vector): void {
    const data = this.backbuffer;
    const index = ((v.x | 0) + ((v.y | 0) * this.workingWidth)) * 4;

    data[index + 0] = color.x * 255;
    data[index + 1] = color.y * 255;
    data[index + 2] = color.z * 255;
    data[index + 3] = color.w * 255;
  }

  drawLine(p0: Vector, p1: Vector): void {
    let x0 = p0.x | 0;
    let y0 = p0.y | 0;
    const x1 = p1.x | 0;
    const y1 = p1.y | 0;
    const dx = Math.abs(x0 - x1);
    const dy = Math.abs(y0 - y1);
    const sx = (x0 < x1) ? 1 : -1;
    const sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;
    let e2: number;

    while (true) {
      this.drawPoint(Vector.xyz(x0, y0, 0));

      if ((x0 == x1) && (y0 == y1)) {
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

  project(v: Vector, t: Matrix): Vector {
    let point = t.vmul(v);
    const x = point.x * this.workingWidth / 2 + this.workingWidth / 2.0;
    const y = -point.y * this.workingHeight / 2 + this.workingHeight / 2.0;
    return Vector.xyz(x, y, 0);
  }

  static Yellow = new Vector([ 1, 1, 0, 1 ]);
  static Black = new Vector([ 0, 0, 0, 1 ]);
  drawPoint(p: Vector): void {
    if (p.x >= 0 && p.y >= 0 && p.x < this.workingWidth &&
        p.y < this.workingHeight) {
      this.putPixel(p, Device.Yellow);
    }
  }

  render(camera: Camera, meshes: Mesh[]) {
    let transform: Matrix;
    let mesh: Mesh;
    let face: Face;
    let p0: Vector;
    let p1: Vector;
    let p2: Vector;

    for (let i = 0; i < meshes.length; i++) {
      mesh = meshes[i];
      transform = Matrix.pitchYawRoll(mesh.rotation)
                      .mmul(Matrix.translation(mesh.position))
                      .mmul(camera.matrix);
      for (let f = 0; f < mesh.faces.length; f++) {
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
}
