function matmul(a, b, nRows, nCols) {
    // Matmul two matrices stored in arrayBuffers
    const c = new Float32Array(nRows * nCols);
    for (let i = 0; i < nRows; i++) {
        for (let j = 0; j < nCols; j++) {
            let sum = 0;
            for (let k = 0; k < nCols; k++) {
                sum += a[i * nCols + k] * b[k * nCols + j];
            }
            c[i * nCols + j] = sum;
        }
    }
    return c;
}

function scalarMul(a, c, nRows, nCols) {
    // Multiply a matrix by a scalar
    for (let i = 0; i < nRows; i++) {
        for (let j = 0; j < nCols; j++) {
            a[i * nCols + j] *= c;
        }
    }
    return a;
}

function inverse(a) {
    // Invert a 3x3 matrix
    const det = a[0] * (a[4] * a[8] - a[5] * a[7]) -
                a[1] * (a[3] * a[8] - a[5] * a[6]) +
                a[2] * (a[3] * a[7] - a[4] * a[6]);
    const invDet = 1 / det;
    const b = new Float32Array(9);
    b[0] = (a[4] * a[8] - a[5] * a[7]) * invDet;
    b[1] = (a[2] * a[7] - a[1] * a[8]) * invDet;
    b[2] = (a[1] * a[5] - a[2] * a[4]) * invDet;
    b[3] = (a[5] * a[6] - a[3] * a[8]) * invDet;
    b[4] = (a[0] * a[8] - a[2] * a[6]) * invDet;
    b[5] = (a[2] * a[3] - a[0] * a[5]) * invDet;
    b[6] = (a[3] * a[7] - a[4] * a[6]) * invDet;
    b[7] = (a[1] * a[6] - a[0] * a[7]) * invDet;
    b[8] = (a[0] * a[4] - a[1] * a[3]) * invDet;
    return b;
}

function rotate(a, angleX, angleY) {
    const pitch = new Float32Array([
        Math.cos(angleX), 0, Math.sin(angleX),
        0, 1, 0,
        -Math.sin(angleX), 0, Math.cos(angleX),
    ]);
    const roll = new Float32Array([
        1, 0, 0,
        0, Math.cos(angleY), -Math.sin(angleY),
        0, Math.sin(angleY), Math.cos(angleY),
    ]);
    const matrix = matmul(pitch, roll, 3, 3);
    a = matmul(a, matrix, 3, 3);
    return a;
}

export { matmul,
        inverse,
        rotate,
        scalarMul };