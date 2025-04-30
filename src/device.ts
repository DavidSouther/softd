import { assertExists } from "./assert.ts";
import { Camera } from "./camera.ts";
import { Matrix } from "./matrix.ts";
import { Mesh, type Face, type Vertex } from "./mesh.ts";
import { Vector } from "./vector.ts";

// Clamping values to keep them between 0 and 1
function clamp(value: number, min: number = 0, max: number = 1): number {
  return Math.max(min, Math.min(value, max));
}

// Interpolating the value between 2 vertices.  min is the starting point, max
// the ending point, and gradient the % between the 2 points
function interpolate(min: number, max: number, gradient: number) {
  return min + (max - min) * clamp(gradient);
}

interface ScanlineData {
  y: number;
  ndotla: number;
  ndotlb: number;
  ndotlc: number;
  ndotld: number;
}

export class Device {
  private v = Vector.xyz(0, 0, 0); // Scratch pad
  private c = Vector.xyz(0, 0, 0); // Color scratch pad
  private data: ScanlineData = {
    y: 0,
    ndotla: 0,
    ndotlb: 0,
    ndotlc: 0,
    ndotld: 0,
  };
  private light = {
    position: Vector.xyz(0, 10, 10),
  };
  private backbuffer!: Uint8ClampedArray;
  private depthbuffer: number[];
  private workingCanvas: HTMLCanvasElement;
  private workingWidth: number;
  private workingHeight: number;
  private workingContext: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.workingCanvas = canvas;
    this.workingWidth = canvas.width;
    this.workingHeight = canvas.height;
    const context = this.workingCanvas.getContext("2d");
    this.workingContext = assertExists(context);
    this.depthbuffer = new Array(this.workingWidth * this.workingHeight);
    this.reset();
  }

  get width(): number {
    return this.workingWidth;
  }
  get height(): number {
    return this.workingHeight;
  }

  reset() {
    this.backbuffer = new Uint8ClampedArray(
      4 * this.workingWidth * this.workingHeight,
    );
    for (let i = 0; i < this.workingWidth * this.workingHeight; i++) {
      this.backbuffer[3 + i * 4] = 255;
    }
    this.depthbuffer.fill(Number.MAX_VALUE, 0, this.depthbuffer.length);
  }

  present() {
    this.workingContext.putImageData(
      new ImageData(this.backbuffer, this.workingWidth, this.workingHeight),
      0,
      0,
    );
  }

  putPixel(v: Vector, color: Vector): void {
    const data = this.backbuffer;
    const index = (v.x | 0) + (v.y | 0) * this.workingWidth;
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
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;
    let e2: number;

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

  project(v: Vertex, t: Matrix, w: Matrix, i: Vertex): void {
    t.vmuli(v.position, i.position);
    const x = (i.position.x * this.workingWidth) / 2 + this.workingWidth / 2.0;
    const y =
      (-i.position.y * this.workingHeight) / 2 + this.workingHeight / 2.0;
    i.position.set(x, y, i.position.z, 0);

    w.vmuli(v.position, i.worldPosition);
    w.vmuli(v.normal, i.normal);
    i.normal.set(i.normal.x, i.normal.y, i.normal.z);
  }

  static Yellow = new Vector([1, 1, 0, 1]);
  static Black = new Vector([0, 0, 0, 1]);
  drawPoint(p: Vector, color: Vector = Device.Yellow): void {
    if (
      p.x >= 0 &&
      p.y >= 0 &&
      p.x < this.workingWidth &&
      p.y < this.workingHeight
    ) {
      this.putPixel(p, color);
    }
  }

  scanLine(
    va: Vertex,
    vb: Vertex,
    vc: Vertex,
    vd: Vertex,
    color: Vector,
  ): void {
    const y = this.data.y;
    const pa = va.position;
    const pb = vb.position;
    const pc = vc.position;
    const pd = vd.position;

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
      const ndotl = this.data.ndotla;
      this.drawPoint(
        this.v.set(x, y, z),
        this.c.set(color.x * ndotl, color.y * ndotl, color.z * ndotl, color.w),
      );
    }
  }

  computeNdotL(position: Vector, normal: Vector, light: Vector): number {
    const direction = light.sub(position);
    normal.normalizei();
    direction.normalizei();
    const lighting = normal.dot(direction);
    return Math.max(0, lighting);
  }

  drawTriangle(v0: Vertex, v1: Vertex, v2: Vertex, color: Vector): void {
    // Calculate lighting
    const face = v0.normal.add(v1.normal.add(v2.normal));
    face.scalei(1 / 3, face);
    const center = v0.worldPosition.add(v1.worldPosition.add(v2.worldPosition));
    center.scalei(1 / 3, center);
    this.data.ndotla = this.computeNdotL(center, face, this.light.position);
    if (this.data.ndotla <= 0) {
      return;
    }

    // Sort triangles so that v0.y >= v1.y >= v2.y
    if (v0.position.y > v1.position.y) {
      [v1, v0] = [v0, v1];
    }

    if (v1.position.y > v2.position.y) {
      [v2, v1] = [v1, v2];
    }

    if (v0.position.y > v1.position.y) {
      [v1, v0] = [v0, v1];
    }

    const p0 = v0.position;
    const p1 = v1.position;
    const p2 = v2.position;

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
      for (let y = p0.y | 0; y <= (p2.y | 0); y++) {
        if (y < p1.y) {
          this.data.y = y;
          this.scanLine(v0, v2, v0, v1, color);
        } else {
          this.scanLine(v0, v2, v1, v2, color);
        }
      }
    } else {
      for (let y = p0.y | 0; y <= (p2.y | 0); y++) {
        if (y < p1.y) {
          this.data.y = y;
          this.scanLine(v0, v1, v0, v2, color);
        } else {
          this.scanLine(v1, v2, v0, v2, color);
        }
      }
    }
  }

  render(camera: Camera, meshes: Mesh[]) {
    let transform: Matrix;
    let mesh: Mesh;
    let face: Face;
    let p0 = {
      position: Vector.xyz(0, 0, 0),
      normal: Vector.xyz(0, 0, 0),
      worldPosition: Vector.xyz(0, 0, 0),
    };
    let p1 = {
      position: Vector.xyz(0, 0, 0),
      normal: Vector.xyz(0, 0, 0),
      worldPosition: Vector.xyz(0, 0, 0),
    };
    let p2 = {
      position: Vector.xyz(0, 0, 0),
      normal: Vector.xyz(0, 0, 0),
      worldPosition: Vector.xyz(0, 0, 0),
    };
    let color = Vector.xyz(0, 0, 0);
    let c: number;

    for (let i = 0; i < meshes.length; i++) {
      mesh = meshes[i];
      transform = camera.matrix.mmul(mesh.matrix);
      if (mesh.faces.length > 0) {
        for (let f = 0; f < mesh.faces.length; f++) {
          face = mesh.faces[f];
          this.project(mesh.vertices[face.A], transform, camera.matrix, p0);
          this.project(mesh.vertices[face.B], transform, camera.matrix, p1);
          this.project(mesh.vertices[face.C], transform, camera.matrix, p2);

          c = 0.25 + ((f % mesh.faces.length) / mesh.faces.length) * 0.75;
          mesh.color.scalei(c, color);
          color.set(color.x, color.y, color.z, mesh.color.w);
          this.drawTriangle(p0, p1, p2, color);
        }
      } else {
        for (let v = 0; v < mesh.vertices.length - 1; v++) {
          this.project(mesh.vertices[v], transform, camera.matrix, p0);
          this.project(mesh.vertices[v + 1], transform, camera.matrix, p1);
          this.drawLine(p0.position, p1.position, mesh.color);
        }
      }
    }
  }
}
