import { describe, expect, it } from "vitest";
import { Matrix } from "./matrix.ts";
import { Vector } from "./vector.ts";

describe("Matrix", () => {
  it("has an identity", () => {
    expect(Matrix.Identity.toArray()).to.deep.equal([
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ]);
  });

  it("creates a matrix from an array", () => {
    expect(
      Matrix.from([
        0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
      ]).toArray(),
    ).to.deep.equal([
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15],
    ]);
  });

  it("clones into a new matrix", () => {
    const m = Matrix.diag(1, 2, 3, 4);
    expect(m.clone().toArray()).to.deep.equal(m.toArray());
    expect(m.clone()).to.not.equal(m);
  });

  describe("math", () => {
    it("multiplies", () => {
      expect(Matrix.Identity.mmul(Matrix.Identity).toArray()).to.deep.equal(
        Matrix.Identity.toArray(),
      );

      expect(
        Matrix.diag(1, 2, 3, 4)
          .mmul(Matrix.diag(4, 3, 2, 1))
          .toArray(),
      ).to.deep.equal(Matrix.diag(4, 6, 6, 4).toArray());
    });

    it("vector multiplies", () => {
      expect(Matrix.Identity.vmul(Vector.I).toArray()).to.deep.equal(
        Vector.I.toArray(),
      );
    });
  });
  describe("rotation", () => {
    it("creates the identity matrix with no rotations", () => {
      //expect(Matrix.pitchYawRoll(Vector.Zero).toArray())
      //    .to.deep.equal(Matrix.Identity.toArray());
    });
  });
});
