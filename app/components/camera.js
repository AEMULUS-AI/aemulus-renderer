import * as mat from './matrix.js';

export default class Camera {
    constructor(fov, nearPlane, farPlane, canvas) {
        const viewAngle = fov * Math.PI / 180;
        const f = 1 / Math.tan(viewAngle / 2);
        const rangeInv = 1 / (nearPlane - farPlane);
        const aspectRatio = canvas.width / canvas.height;

        this.perspectiveMatrix = new Float32Array([
            f/aspectRatio, 0, 0, 0,
            0, f, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ])

        this.viewMatrix = new Float32Array([
            0.35, 0, 0,
            0, 0.35, 0,
            0, 0, 0.35,
        ]);

        this.translationVec = new Float32Array([0, 0, 0])
    }

    translate(x, y, z) {
        this.translationVec[0] += x;
        this.translationVec[1] += y;
        this.translationVec[2] += z;
    }

    rotate(theta, phi) {
        this.viewMatrix = mat.rotate(this.viewMatrix, theta, phi);
    }

    zoom(factor) {
        this.viewMatrix = mat.scalarMul(this.viewMatrix, factor, 3, 3)
    }

    getViewMatrix() {
        return this.viewMatrix;   
    }

    getPerspectiveMatrix() {
        return this.perspectiveMatrix;
    }
}