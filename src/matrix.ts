import {Vector} from './vector';

export class Matrix {
  constructor(init: number[] | Float32Array =
                  [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1 ],
              public _array: Float32Array = Float32Array.from(init)) {}

  set(x: number, y: number, v: number): Matrix {
    this._array[x + (y * 4)] = v;
    return this;
  }

  get(x: number, y: number): number { return this._array[x + (y * 4)]; }

  setArray(n: number[]): Matrix {
    this._array[0] = n[0];
    this._array[1] = n[1];
    this._array[2] = n[2];
    this._array[3] = n[3];
    this._array[4] = n[4];
    this._array[5] = n[5];
    this._array[6] = n[6];
    this._array[7] = n[7];
    this._array[8] = n[8];
    this._array[9] = n[9];
    this._array[10] = n[10];
    this._array[11] = n[11];
    this._array[12] = n[12];
    this._array[13] = n[13];
    this._array[14] = n[14];
    this._array[15] = n[15];
    return this;
  }

  clone(): Matrix { return new Matrix(this._array); }

  mmul(m: Matrix): Matrix {
    const a = this._array;
    const a00 = a[0];
    const a01 = a[1];
    const a02 = a[2];
    const a03 = a[3];
    const a10 = a[4];
    const a11 = a[5];
    const a12 = a[6];
    const a13 = a[7];
    const a20 = a[8];
    const a21 = a[9];
    const a22 = a[10];
    const a23 = a[11];
    const a30 = a[12];
    const a31 = a[13];
    const a32 = a[14];
    const a33 = a[15];
    const b = m._array;
    const b00 = b[0];
    const b01 = b[1];
    const b02 = b[2];
    const b03 = b[3];
    const b10 = b[4];
    const b11 = b[5];
    const b12 = b[6];
    const b13 = b[7];
    const b20 = b[8];
    const b21 = b[9];
    const b22 = b[10];
    const b23 = b[11];
    const b30 = b[12];
    const b31 = b[13];
    const b32 = b[14];
    const b33 = b[15];
    return new Matrix([
      a00 * b00 + a01 * b10 + a02 * b20 + a03 * b30,
      a00 * b01 + a01 * b11 + a02 * b21 + a03 * b31,
      a00 * b02 + a01 * b12 + a02 * b22 + a03 * b32,
      a00 * b03 + a01 * b13 + a02 * b23 + a03 * b33,

      a10 * b00 + a11 * b10 + a12 * b20 + a13 * b30,
      a10 * b01 + a11 * b11 + a12 * b21 + a13 * b31,
      a10 * b02 + a11 * b12 + a12 * b22 + a13 * b32,
      a10 * b03 + a11 * b13 + a12 * b23 + a13 * b33,

      a20 * b00 + a21 * b10 + a22 * b20 + a23 * b30,
      a20 * b01 + a21 * b11 + a22 * b21 + a23 * b31,
      a20 * b02 + a21 * b12 + a22 * b22 + a23 * b32,
      a20 * b03 + a21 * b13 + a22 * b23 + a23 * b33,

      a30 * b00 + a31 * b10 + a32 * b20 + a33 * b30,
      a30 * b01 + a31 * b11 + a32 * b21 + a33 * b31,
      a30 * b02 + a31 * b12 + a32 * b22 + a33 * b32,
      a30 * b03 + a31 * b13 + a32 * b23 + a33 * b33,
    ]);
  }

  vmul(v: Vector): Vector {
    const a = this._array;
    const a00 = a[0];
    const a01 = a[1];
    const a02 = a[2];
    const a03 = a[3];
    const a10 = a[4];
    const a11 = a[5];
    const a12 = a[6];
    const a13 = a[7];
    const a20 = a[8];
    const a21 = a[9];
    const a22 = a[10];
    const a23 = a[11];
    const a30 = a[12];
    const a31 = a[13];
    const a32 = a[14];
    const a33 = a[15];

    const b = v._array;
    const bx = b[0];
    const by = b[1];
    const bz = b[2];
    const bw = b[3];

    return new Vector([
      a00 * bx + a01 * by + a02 * bz + a03 * bw,
      a10 * bx + a11 * by + a12 * bz + a13 * bw,
      a20 * bx + a21 * by + a22 * bz + a23 * bw,
      a30 * bx + a31 * by + a32 * bz + a33 * bw
    ]);
  }

  toArray(): number[][] {
    return [
      Array.from(this._array.subarray(0, 4)),
      Array.from(this._array.subarray(4, 8)),
      Array.from(this._array.subarray(8, 12)),
      Array.from(this._array.subarray(12, 16))
    ];
  }

  static diag(a: number, b: number, c: number, d: number): Matrix {
    return new Matrix([ a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 0, 0, 0, 0, d ]);
  }

  static from(n: number[]): Matrix { return new Matrix(n); }

  private static _I = new Matrix();
  static get Identity() { return Matrix._I; }
}
