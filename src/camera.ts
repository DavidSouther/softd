import { Matrix } from './matrix';
import { Vector } from './vector';

const DEG_TO_HALF_RAD = Math.PI / 360;

export class Camera {
  private _position = Vector.xyz(0, 0, 20);
  private _target = Vector.Zero;
  private _lookat: Matrix;
  private _projection: Matrix;
  private _matrix: Matrix;

  private _fov: number = 110 * DEG_TO_HALF_RAD;
  private _aspect: number = 4/3;
  private _znear: number = 0.1;
  private _zfar: number = 100;

  constructor() {
    this._lookat = Matrix.lookAt(this._position, this._target);
    this.updateProjection();
  }

  private updateLookat() {
    this._lookat = Matrix.lookAt(this._position, this._target);
    this._matrix = this._lookat.mmul(this._projection);
  }

  private updateProjection() {
    const f_n = this._zfar - this._znear;
    const sy = 1 / Math.tan(this._fov);
    const sx = sy / this._aspect;

    this._projection = new Matrix([
      sx, 0, 0, 0,
      0, sy, 0, 0,
      0, 0, (this._zfar + this._znear) / f_n , -1,
      0, 0, (2 * this._zfar * this._znear) / f_n, 0 
    ]);
    this._matrix = this._lookat.mmul(this._projection);
  };

  get matrix() { return this._matrix; }
  get projectionMatrix() { return this._projection; }
  get viewMatrix() { return this._lookat; }
  get target() { return this._target; }
  set target(t: Vector) {
    this._target = t;
    this.updateLookat();
  }
  get position() { return this._position; }
  set position(p: Vector) {
    this._position = p;
    this.updateLookat();
  }
}

