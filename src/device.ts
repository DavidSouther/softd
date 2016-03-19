import {Camera} from './camera';
import {Matrix} from './Matrix';
import {Mesh, Face} from './Mesh';
import {Vector} from './Vector';

// Clamping values to keep them between 0 and 1
function clamp(value: number, min: number = 0, max: number = 1): number {
  return Math.max(min, Math.min(value, max));
}

// Interpolating the value between 2 vertices
// min is the starting point, max the ending point
// and gradient the % between the 2 points
function interpolate(min: number, max: number, gradient: number) {
  return min + (max - min) * clamp(gradient);
}

export class Device {
  private v = Vector.xyz(0, 0, 0); // Scratch pad
  private backbuffer: Uint8ClampedArray;
  private depthbuffer: number[];
  private workingCanvas: HTMLCanvasElement;
  private workingWidth: number;
  private workingHeight: number;
  private workingContext: CanvasRenderingContext2D;
  constructor(canvas: HTMLCanvasElement) {
    this.workingCanvas = canvas;
    this.workingWidth = canvas.width;
    this.workingHeight = canvas.height;
    this.workingContext = this.workingCanvas.getContext('2d');
    this.depthbuffer = new Array(this.workingWidth * this.workingHeight);
  }

  get width(): number { return this.workingWidth; }
  get height(): number { return this.workingHeight; }

  reset() {
    this.backbuffer =
        new Uint8ClampedArray(4 * this.workingWidth * this.workingHeight);
    for (let i = 0; i < this.workingWidth * this.workingHeight; i++) {
      this.backbuffer[3 + (i * 4)] = 255;
    }
    this.depthbuffer.fill(Number.MAX_VALUE, 0, this.depthbuffer.length);
  }

  present() {
    this.workingContext.putImageData(
        new ImageData(this.backbuffer, this.workingWidth, this.workingHeight),
        0, 0);
  }

  putPixel(v: Vector, color: Vector): void {
    const data = this.backbuffer;
    const index = ((v.x | 0) + ((v.y | 0) * this.workingWidth));
    const index4 = index * 4;

    if (this.depthbuffer[index] < v.z) {
      return;
    }

    this.depthbuffer[index] = v.z;

    data[index4 + 0] = color.x * 255;
    data[index4 + 1] = color.y * 255;
    data[index4 + 2] = color.z * 255;
    data[index4 + 3] = color.w * 255;
  }

  drawLine(p0: Vector, p1: Vector, color: Vector): void {
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
      this.drawPoint(this.v.set(x0, y0, 0), color);

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

  project(v: Vector, t: Matrix, i: Vector): void {
    t.vmuli(v, i);
    const x = i.x * this.workingWidth / 2 + this.workingWidth / 2.0;
    const y = -i.y * this.workingHeight / 2 + this.workingHeight / 2.0;
    i.set(x, y, v.z);
  }

  static Yellow = new Vector([ 1, 1, 0, 1 ]);
  static Black = new Vector([ 0, 0, 0, 1 ]);
  drawPoint(p: Vector, color: Vector = Device.Yellow): void {
    if (p.x >= 0 && p.y >= 0 && p.x < this.workingWidth &&
        p.y < this.workingHeight) {
      this.putPixel(p, color);
    }
  }

  scanLine(y: number, pa: Vector, pb: Vector, pc: Vector, pd: Vector,
           color: Vector): void {
    // Thanks to current Y, we can compute the gradient to compute others values
    // like the starting X (sx) and ending X (ex) to draw between if pa.Y ==
    // pb.Y or pc.Y == pd.Y, gradient is forced to 1
    const gradient1 = pa.y != pb.y ? (y - pa.y) / (pb.y - pa.y) : 1;
    const gradient2 = pc.y != pd.y ? (y - pc.y) / (pd.y - pc.y) : 1;

    const sx = interpolate(pa.x, pb.x, gradient1) | 0;
    const ex = interpolate(pc.x, pd.x, gradient2) | 0;
    const sz = interpolate(pa.z, pb.z, gradient1);
    const ez = interpolate(pc.z, pd.z, gradient2);

    // drawing a line from left (sx) to right (ex)
    for (let x = sx; x < ex; x++) {
      const zgrad = (x - sx) / (ex - sx);
      const z = interpolate(sz, ez, zgrad) * 100;
      this.drawPoint(this.v.set(x, y, z), color);
    }
  }

  drawTriangle(p0: Vector, p1: Vector, p2: Vector, color: Vector): void {
    // Sort triangles so that p0.y >= p1.y >= p2.y
    if (p0.y > p1.y) {
      [p1, p0] = [ p0, p1 ];
    }

    if (p1.y > p2.y) {
      [p2, p1] = [ p1, p2 ];
    }

    if (p0.y > p1.y) {
      [p1, p0] = [ p0, p1 ];
    }

    const dyp1p0 = p1.y - p0.y;
    const dyp2p0 = p2.y - p0.y;
    const dxp1p0 = p1.x - p0.x;
    const dxp2p0 = p2.x - p0.x;
    const mp0p1 = dyp1p0 > 0 ? dxp1p0 / dyp1p0 : 0;
    const mp0p2 = dyp2p0 > 0 ? dxp2p0 / dyp2p0 : 0;

    // First case, for:
    //
    //    P0
    //   |  \
    //   |   P1
    //   |  /
    //    P2
    if (mp0p1 > mp0p2) {
      for (let y = (p0.y | 0); y <= (p2.y | 0); y++) {
        if (y < p1.y) {
          this.scanLine(y, p0, p2, p0, p1, color);
        } else {
          this.scanLine(y, p0, p2, p1, p2, color);
        }
      }
    } else {
      for (let y = (p0.y | 0); y <= (p2.y | 0); y++) {
        if (y < p1.y) {
          this.scanLine(y, p0, p1, p0, p2, color);
        } else {
          this.scanLine(y, p1, p2, p0, p2, color);
        }
      }
    }
  }

  render(camera: Camera, meshes: Mesh[]) {
    let transform: Matrix;
    let mesh: Mesh;
    let face: Face;
    let p0 = Vector.xyz(0, 0, 0);
    let p1 = Vector.xyz(0, 0, 0);
    let p2 = Vector.xyz(0, 0, 0);
    let color = Vector.xyz(0, 0, 0);
    let c: number;

    for (let i = 0; i < meshes.length; i++) {
      mesh = meshes[i];
      transform = camera.matrix.mmul(mesh.matrix);
      if (mesh.faces.length > 0) {
        for (let f = 0; f < mesh.faces.length; f++) {
          face = mesh.faces[f];
          this.project(mesh.verticies[face.A], transform, p0);
          this.project(mesh.verticies[face.B], transform, p1);
          this.project(mesh.verticies[face.C], transform, p2);

          c = .25 + ((f % mesh.faces.length) / mesh.faces.length) * 0.75;
          mesh.color.scalei(c, color);
          this.drawTriangle(p0, p1, p2, color);
          /*
          this.drawLine(p0, p1, color);
          this.drawLine(p1, p2, color);
          this.drawLine(p2, p0, color);
          */
        }
      } else {
        for (let v = 0; v < mesh.verticies.length - 1; v++) {
          this.project(mesh.verticies[v], transform, p0);
          this.project(mesh.verticies[v + 1], transform, p1);
          this.drawLine(p0, p1, mesh.color);
        }
      }
    }
  }
}
