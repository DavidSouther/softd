import {Vector} from './vector';

export interface Face {
  A: number;
  B: number;
  C: number;
}

export class Mesh {
  position = Vector.Zero;
  rotation = Vector.Zero;
  verticies: Vector[];
  faces: Face[];

  constructor(public name: string, vertCount: number, faceCount: number) {
    this.verticies = new Array(vertCount);
    this.faces = new Array(faceCount);
  }

  static get Cube(): Mesh {
    const m = new Mesh("Cube", 8, 12);
    m.verticies[7] = (Vector.xyz(-1, -1, -1));
    m.verticies[2] = (Vector.xyz(-1, -1, 1));
    m.verticies[4] = (Vector.xyz(-1, 1, -1));
    m.verticies[0] = (Vector.xyz(-1, 1, 1));

    m.verticies[6] = (Vector.xyz(1, -1, -1));
    m.verticies[3] = (Vector.xyz(1, -1, 1));
    m.verticies[5] = (Vector.xyz(1, 1, -1));
    m.verticies[1] = (Vector.xyz(1, 1, 1));

    m.faces[0] = {A : 0, B : 1, C : 2};
    m.faces[1] = {A : 1, B : 2, C : 3};
    m.faces[2] = {A : 1, B : 3, C : 6};
    m.faces[3] = {A : 1, B : 5, C : 6};
    m.faces[4] = {A : 0, B : 1, C : 4};
    m.faces[5] = {A : 1, B : 4, C : 5};

    m.faces[6] = {A : 2, B : 3, C : 7};
    m.faces[7] = {A : 3, B : 6, C : 7};
    m.faces[8] = {A : 0, B : 2, C : 7};
    m.faces[9] = {A : 0, B : 4, C : 7};
    m.faces[10] = {A : 4, B : 5, C : 6};
    m.faces[11] = {A : 4, B : 6, C : 7};

    return m;
  }
}
