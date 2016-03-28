"use strict";

var chai_1 = require('chai');
var vector_1 = require('./vector');
describe('Vector', function () {
    it('has an identity', function () {
        chai_1.expect(vector_1.Vector.I.toArray()).to.deep.equal([1, 0, 0, 0]);
    });
    it('creates a vector from an array', function () {
        chai_1.expect(vector_1.Vector.xyz(0, 1, 2).toArray()).to.deep.equal([0, 1, 2, 1]);
    });
    it('clones into a new vector', function () {
        var v = vector_1.Vector.xyz(1, 2, 3);
        chai_1.expect(v.clone().toArray()).to.deep.equal(v.toArray());
        chai_1.expect(v.clone()).to.not.equal(v);
    });
    describe('math', function () {
        it('adds', function () {
            chai_1.expect(vector_1.Vector.xyz(1, 1, 1).add(new vector_1.Vector([0, 0, 0, 1])).toArray()).to.deep.equal([1, 1, 1, 2]);
        });
        it('subs', function () {
            chai_1.expect(vector_1.Vector.xyz(1, 2, 3).sub(new vector_1.Vector([4, 3, 2, 1])).toArray()).to.deep.equal([-3, -1, 1, 0]);
        });
        it('normalizes', function () {
            chai_1.expect(vector_1.Vector.xyz(0, 0, 0).normalize().toArray()).to.deep.equal([0, 0, 0, 1]);
        });
        it('dot products', function () {
            chai_1.expect(vector_1.Vector.I.dot(vector_1.Vector.I)).to.deep.equal(1);
            chai_1.expect(new vector_1.Vector([1, 2, 3, 0]).dot(new vector_1.Vector([3, 2, 1, 0]))).to.equal(10);
        });
        it('cross products', function () {
            chai_1.expect(new vector_1.Vector([1, 2, 3, 0]).cross(new vector_1.Vector([3, 2, 1, 0])).toArray()).to.deep.equal([-4, 8, -4, 0]);
        });
    });
});
//# sourceMappingURL=vector.spec.js.map