import {expect} from 'chai';
import {Vector} from './vector';

describe('Vector', function() {
  it('has an identity',
     function() { expect(Vector.I.toArray()).to.deep.equal([ 1, 0, 0, 0 ]); });

  it('creates a vector from an array', function() {
    expect(Vector.xyz(0, 1, 2).toArray()).to.deep.equal([ 0, 1, 2, 0 ]);
  });

  it('clones into a new vector', function() {
    const v = Vector.xyz(1, 2, 3);
    expect(v.clone().toArray()).to.deep.equal(v.toArray());
    expect(v.clone()).to.not.equal(v);
  });

  describe('math', function() {
    it('adds', function() {
      expect(Vector.xyz(1, 1, 1).add(new Vector([ 0, 0, 0, 1 ])).toArray())
          .to.deep.equal([ 1, 1, 1, 1 ]);
    });

    it('subs', function() {
      expect(Vector.xyz(1, 2, 3).sub(new Vector([ 4, 3, 2, 1 ])).toArray())
          .to.deep.equal([ -3, -1, 1, -1 ]);
    });

    it('normalizes', function() {
      expect(Vector.xyz(2, 0, 0).normalize().toArray())
          .to.deep.equal([ 1, 0, 0, 0 ]);
    });

    it('dot products', function() {
      expect(Vector.I.dot(Vector.I)).to.deep.equal(1);

      expect(Vector.xyz(1, 2, 3).dot(Vector.xyz(3, 2, 1))).to.equal(10);
    });

    it('cross products', function() {
      expect(Vector.xyz(1, 2, 3).cross(Vector.xyz(3, 2, 1)).toArray())
          .to.deep.equal([ -4, 8, -4, 0 ]);
    });
  });
});
