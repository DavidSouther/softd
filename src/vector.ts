export class Vector {
  constructor(init: number[] | Float32Array = [ 1, 0, 0, 0 ],
              public _array = Float32Array.from(init)) {}

  clone(): Vector { return new Vector(this._array); }

  add(v: Vector): Vector {
    const a = this._array;
    const b = v._array;
    return new Vector([ a[0] + b[0], a[1] + b[1], a[2] + b[2], a[3] + b[3] ]);
  }

  sub(v: Vector): Vector {
    const a = this._array;
    const b = v._array;
    return new Vector([ a[0] - b[0], a[1] - b[1], a[2] - b[2], a[3] - b[3] ]);
  }

  get length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z +
                     this.w * this.w);
  }

  scale(s: number): Vector {
    const v = Vector.xyz(0, 0, 0);	
    this.scalei(s, v);
    return v;
  }

  scalei(s: number, i: Vector): void {
    const v = this._array;
    i.set(v[0]*s, v[1]*s, v[2]*s, v[3]*s);
  }

  normalize(): Vector {
    const a = this._array;
    const l = this.length;

    return new Vector([ a[0] / l, a[1] / l, a[2] / l, a[3] / l ]);
  }

  dot(v: Vector): number {
    const a = this._array;
    const b = v._array;
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2] + a[3] * b[3];
  }

  cross(v: Vector): Vector {
    const a = this._array;
    const a0 = a[0];
    const a1 = a[1];
    const a2 = a[2];
    const b = v._array;
    const b0 = b[0];
    const b1 = b[1];
    const b2 = b[2];

    return new Vector(
        [ a1 * b2 - a2 * b1, a2 * b0 - a0 * b2, a0 * b1 - a1 * b0, 0 ]);
  }

  toArray(): number[] {
    const a = this._array;
    return [ a[0], a[1], a[2], a[3] ];
  }

  get x() { return this._array[0]; }
  get y() { return this._array[1]; }
  get z() { return this._array[2]; }
  get w() { return this._array[3]; }
  set(x: number, y: number, z: number, w: number = 0): Vector {
    this._array[0] = x;
    this._array[1] = y;
    this._array[2] = z;
    this._array[3] = w;
    return this;
  }

  private static _Zero = new Vector([ 0, 0, 0, 0 ]);
  static get Zero() { return Vector._Zero; }
  private static _I = new Vector();
  static get I(): Vector { return Vector._I; }
  private static _J = new Vector([ 0, 1, 0, 0 ]);
  static get J(): Vector { return Vector._J; }
  private static _K = new Vector([ 0, 0, 1, 0 ]);
  static get K(): Vector { return Vector._K; }
  static xyz(x: number, y: number, z: number): Vector {
    return new Vector([ x, y, z, 0 ]);
  }
}
