import { Matrix } from "./matrix.ts";
import { SUZANNE } from "./monkey.ts";
import { Vector } from "./vector.ts";

export interface Face {
  A: number;
  B: number;
  C: number;
}

export interface Vertex {
  normal: Vector;
  position: Vector;
  worldPosition: Vector;
}

export class Mesh {
  private _position = Vector.Zero;
  private _rotation = Vector.Zero;
  private _matrix!: Matrix;
  name: string;
  vertices: Vertex[];
  faces: Face[];
  color: Vector;

  constructor(name: string, vertCount: number, faceCount: number) {
    this.name = name;
    this.vertices = new Array(vertCount);
    this.faces = new Array(faceCount);
    this.color = new Vector([1, 1, 1, 1]);
    this.updateMatrix();
  }

  private updateMatrix() {
    this._matrix = Matrix.pitchYawRoll(this._rotation).mmul(
      Matrix.translation(this._position),
    );
  }

  get matrix() {
    return this._matrix;
  }

  get position() {
    return this._position;
  }
  set position(p: Vector) {
    this._position = p;
    this.updateMatrix();
  }

  get rotation() {
    return this._rotation;
  }
  set rotation(r: Vector) {
    this._rotation = r;
    this.updateMatrix();
  }

  scale(scale: number) {
    for (const v of this.vertices) {
      v.position.scales(scale);
      v.normal.set(v.position.x, v.position.y, v.position.z, 0);
      v.normal.normalize3i();
    }
  }

  static get Axes(): Mesh[] {
    const x = new Mesh("X Axis", 2, 0);
    x.vertices[0] = {
      position: Vector.Zero,
      normal: Vector.xyz(1, 0, 0),
      worldPosition: Vector.Zero,
    };
    x.vertices[1] = {
      position: Vector.xyz(1, 0, 0),
      normal: Vector.xyz(1, 0, 0),
      worldPosition: Vector.Zero,
    };
    x.color = new Vector([1, 0, 0, 1]);

    const y = new Mesh("Y Axis", 2, 0);
    y.vertices[0] = {
      position: Vector.Zero,
      normal: Vector.xyz(0, 1, 0),
      worldPosition: Vector.Zero,
    };
    y.vertices[1] = {
      position: Vector.xyz(0, 1, 0),
      normal: Vector.xyz(0, 1, 0),
      worldPosition: Vector.Zero,
    };
    y.color = new Vector([0, 1, 0, 1]);

    const z = new Mesh("Z Axis", 2, 0);
    z.vertices[0] = {
      position: Vector.Zero,
      normal: Vector.xyz(0, 0, 1),
      worldPosition: Vector.Zero,
    };
    z.vertices[1] = {
      position: Vector.xyz(0, 0, 1),
      normal: Vector.xyz(0, 0, 1),
      worldPosition: Vector.Zero,
    };
    z.color = new Vector([0, 0, 1, 1]);
    return [x, y, z];
  }

  static get Triangle(): Mesh {
    const mesh = new Mesh("Triangle", 3, 1);
    mesh.vertices[0] = {
      position: Vector.xyz(-1, -1, -1),
      normal: Vector.xyz0(-1, -1, -1),
      worldPosition: Vector.Zero,
    };
    mesh.vertices[1] = {
      position: Vector.xyz(0, 1, -1),
      normal: Vector.xyz0(0, 1, -1),
      worldPosition: Vector.Zero,
    };
    mesh.vertices[2] = {
      position: Vector.xyz(0, -1, 1),
      normal: Vector.xyz0(0, -1, 1),
      worldPosition: Vector.Zero,
    };
    for (let i = 0; i < 3; i++) {
      mesh.vertices[i].normal.normalizei();
    }

    mesh.faces[0] = { A: 0, B: 1, C: 2 };

    return mesh;
  }

  static get Cube(): Mesh {
    const m = new Mesh("Cube", 8, 12);
    m.vertices[7] = {
      position: Vector.xyz(-1, -1, -1),
      normal: Vector.xyz0(-1, -1, -1),
      worldPosition: Vector.Zero,
    };
    m.vertices[2] = {
      position: Vector.xyz(-1, -1, 1),
      normal: Vector.xyz0(-1, -1, 1),
      worldPosition: Vector.Zero,
    };
    m.vertices[4] = {
      position: Vector.xyz(-1, 1, -1),
      normal: Vector.xyz0(-1, 1, -1),
      worldPosition: Vector.Zero,
    };
    m.vertices[0] = {
      position: Vector.xyz(-1, 1, 1),
      normal: Vector.xyz0(-1, 1, 1),
      worldPosition: Vector.Zero,
    };

    m.vertices[6] = {
      position: Vector.xyz(1, -1, -1),
      normal: Vector.xyz0(1, -1, -1),
      worldPosition: Vector.Zero,
    };
    m.vertices[3] = {
      position: Vector.xyz(1, -1, 1),
      normal: Vector.xyz0(1, -1, 1),
      worldPosition: Vector.Zero,
    };
    m.vertices[5] = {
      position: Vector.xyz(1, 1, -1),
      normal: Vector.xyz0(1, 1, -1),
      worldPosition: Vector.Zero,
    };
    m.vertices[1] = {
      position: Vector.xyz(1, 1, 1),
      normal: Vector.xyz0(1, 1, 1),
      worldPosition: Vector.Zero,
    };

    for (let i = 0; i < 8; i++) {
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

  private static _monkey = Mesh.fromBabylon(SUZANNE);
  static get Monkey(): Mesh[] {
    return Mesh._monkey;
  }

  static fromBabylon(saved: unknown): Mesh[] {
    const meshes: Mesh[] = [];
    const saved_meshes =
      (
        saved as {
          meshes?: {
            vertices: number[];
            indices: number[];
            uvCount: 0 | 1 | 2;
            name: string;
            position: [number, number, number];
          }[];
        }
      ).meshes ?? [];
    for (let m = 0; m < saved_meshes.length; m++) {
      const data = saved_meshes[m];
      const vArray = data.vertices;
      const fArray = data.indices;

      const uvCount = data.uvCount;
      let vStep = 1;

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

      const vCount = vArray.length / vStep;
      const fCount = fArray.length / 3;

      const mesh = new Mesh(data.name, vCount, fCount);

      for (let i = 0; i < vCount; i++) {
        // Load position
        const x = vArray[i * vStep + 0];
        const y = vArray[i * vStep + 1];
        const z = vArray[i * vStep + 2];
        // Load normals
        const l = vArray[i * vStep + 3];
        const m = vArray[i * vStep + 4];
        const n = vArray[i * vStep + 5];
        mesh.vertices[i] = {
          position: Vector.xyz(x, y, z),
          normal: Vector.xyz0(l, m, n),
          worldPosition: Vector.Zero,
        };
      }
      for (let i = 0; i < fCount; i++) {
        mesh.faces[i] = {
          A: fArray[i * 3],
          B: fArray[i * 3 + 1],
          C: fArray[i * 3 + 2],
        };
      }
      const pos: number[] = data.position;
      mesh.position = Vector.xyz(pos[0], pos[1], pos[2]);
      meshes.push(mesh);
    }
    return meshes;
  }
}
