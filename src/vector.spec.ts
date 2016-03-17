import {expect} from 'chai';
import {Vector} from './vector';

describe('Vector', function() {
  it('has an identity',
     function() { expect(Vector.I.toArray()).to.deep.equal([ 1, 0, 0, 0 ]); });

  it('creates a vector from an array', function() {
    expect(Vector.xyz([ 0, 1, 2 ]).toArray()).to.deep.equal([ 0, 1, 2, 0 ]);
  });

  it('clones into a new vector', function() {
    const v = Vector.xyz([ 1, 2, 3 ]);
    expect(v.clone().toArray()).to.deep.equal(v.toArray());
    expect(v.clone()).to.not.equal(v);
  });

  describe('math', function() {
    it('dot products', function() {
      expect(Vector.I.dot(Vector.I)).to.deep.equal(1);

      expect(Vector.xyz([ 1, 2, 3 ]).dot(Vector.xyz([ 3, 2, 1 ]))).to.equal(10);
    });

    it('cross products', function() {

    });
  });
});
