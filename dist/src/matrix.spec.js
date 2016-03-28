"use strict";

var chai_1 = require('chai');
var matrix_1 = require('./matrix');
var vector_1 = require('./vector');
describe('Matrix', function () {
    it('has an identity', function () {
        chai_1.expect(matrix_1.Matrix.Identity.toArray()).to.deep.equal([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
    });
    it('creates a matrix from an array', function () {
        chai_1.expect(matrix_1.Matrix.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]).toArray()).to.deep.equal([[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]]);
    });
    it('clones into a new matrix', function () {
        var m = matrix_1.Matrix.diag(1, 2, 3, 4);
        chai_1.expect(m.clone().toArray()).to.deep.equal(m.toArray());
        chai_1.expect(m.clone()).to.not.equal(m);
    });
    describe('math', function () {
        it('multiplies', function () {
            chai_1.expect(matrix_1.Matrix.Identity.mmul(matrix_1.Matrix.Identity).toArray()).to.deep.equal(matrix_1.Matrix.Identity.toArray());
            chai_1.expect(matrix_1.Matrix.diag(1, 2, 3, 4).mmul(matrix_1.Matrix.diag(4, 3, 2, 1)).toArray()).to.deep.equal(matrix_1.Matrix.diag(4, 6, 6, 4).toArray());
        });
        it('vector multiplies', function () {
            chai_1.expect(matrix_1.Matrix.Identity.vmul(vector_1.Vector.I).toArray()).to.deep.equal(vector_1.Vector.I.toArray());
        });
    });
    describe('rotation', function () {
        it('creates the identity matrix with no rotations', function () {
            //expect(Matrix.pitchYawRoll(Vector.Zero).toArray())
            //    .to.deep.equal(Matrix.Identity.toArray());
        });
    });
});
//# sourceMappingURL=matrix.spec.js.map