import { describe, expect, it } from "vitest";
import { Vector } from "./vector.ts";

describe("Vector", () => {
  it("has an identity", () => {
    expect(Vector.I.toArray()).to.deep.equal([1, 0, 0, 0]);
  });

  it("creates a vector from an array", () => {
    expect(Vector.xyz(0, 1, 2).toArray()).to.deep.equal([0, 1, 2, 1]);
  });

  it("clones into a new vector", () => {
    const v = Vector.xyz(1, 2, 3);
    expect(v.clone().toArray()).to.deep.equal(v.toArray());
    expect(v.clone()).to.not.equal(v);
  });

  describe("math", () => {
    it("adds", () => {
      expect(
        Vector.xyz(1, 1, 1)
          .add(new Vector([0, 0, 0, 1]))
          .toArray(),
      ).to.deep.equal([1, 1, 1, 2]);
    });

    it("subs", () => {
      expect(
        Vector.xyz(1, 2, 3)
          .sub(new Vector([4, 3, 2, 1]))
          .toArray(),
      ).to.deep.equal([-3, -1, 1, 0]);
    });

    it("normalizes", () => {
      expect(Vector.xyz(0, 0, 0).normalize().toArray()).to.deep.equal([
        0, 0, 0, 1,
      ]);
    });

    it("dot products", () => {
      expect(Vector.I.dot(Vector.I)).to.deep.equal(1);

      expect(new Vector([1, 2, 3, 0]).dot(new Vector([3, 2, 1, 0]))).to.equal(
        10,
      );
    });

    it("cross products", () => {
      expect(
        new Vector([1, 2, 3, 0]).cross(new Vector([3, 2, 1, 0])).toArray(),
      ).to.deep.equal([-4, 8, -4, 0]);
    });
  });
});
