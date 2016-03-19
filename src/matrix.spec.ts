import {expect} from 'chai';
import {Matrix} from './matrix';
import {Vector} from './vector';

describe('Matrix', function() {
  it('has an identity', function() {
    expect(Matrix.Identity.toArray())
        .to.deep.equal(
            [ [ 1, 0, 0, 0 ], [ 0, 1, 0, 0 ], [ 0, 0, 1, 0 ], [ 0, 0, 0, 1 ] ]);
  });

  it('creates a matrix from an array', function() {
    expect(Matrix.from([ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 ])
               .toArray())
        .to.deep.equal([
          [ 0, 1, 2, 3 ],
          [ 4, 5, 6, 7 ],
          [ 8, 9, 10, 11 ],
          [ 12, 13, 14, 15 ]
        ]);
  });

  it('clones into a new matrix', function() {
    const m = Matrix.diag(1, 2, 3, 4);
    expect(m.clone().toArray()).to.deep.equal(m.toArray());
    expect(m.clone()).to.not.equal(m);
  });

  describe('math', function() {
    it('multiplies', function() {
      expect(Matrix.Identity.mmul(Matrix.Identity).toArray())
          .to.deep.equal(Matrix.Identity.toArray());

      expect(Matrix.diag(1, 2, 3, 4).mmul(Matrix.diag(4, 3, 2, 1)).toArray())
          .to.deep.equal(Matrix.diag(4, 6, 6, 4).toArray());
    });

    it('vector multiplies', function() {
      expect(Matrix.Identity.vmul(Vector.I).toArray())
          .to.deep.equal(Vector.I.toArray());
    });
  });
  describe('rotation', function() {
    it('creates the identity matrix with no rotations', function() {
      //expect(Matrix.pitchYawRoll(Vector.Zero).toArray())
      //    .to.deep.equal(Matrix.Identity.toArray());
    });
  });
});
