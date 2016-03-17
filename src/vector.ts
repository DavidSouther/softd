export class Vector {
  constructor(init: number[]|Float32Array = [ 1, 0, 0, 0 ],
              public _array = Float32Array.from(init)) {}

  clone(): Vector { return new Vector(this._array); }

  dot(v: Vector): number {
    const a = this._array;
    const b = v._array;  
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  }

  toArray(): number[] {
    const a = this._array;
    return [a[0], a[1], a[2], a[3]];
  }

  get x() { return this._array[0]; }
  get y() { return this._array[1]; }
  get z() { return this._array[2]; }
  get w() { return this._array[3]; }

  private static _I = new Vector();
  static get I(): Vector { return Vector._I; }
  private static _J = new Vector([ 0, 1, 0, 0 ]);
  static get J(): Vector { return Vector._J; }
  private static _K = new Vector([ 0, 0, 1, 0 ]);
  static get K(): Vector { return Vector._K; }
  static xyz(n: number[]): Vector {
    return new Vector([ n[0], n[1], n[2], 0 ]);
  }
}
