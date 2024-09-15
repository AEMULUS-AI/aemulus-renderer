const vertices = new Float32Array([
    // Front face
    -0.5, 0.5, 0.5,
    0.5,  0.5, 0.5,
    -0.5, -0.5, 0.5,
    0.5, -0.5, 0.5,
    // Back face
    -0.5, 0.5, -0.5,
    0.5,  0.5, -0.5,
    -0.5, -0.5, -0.5,
    0.5, -0.5, -0.5,
    // Top face
    -0.5, 0.5, 0.5,
    0.5,  0.5, 0.5,
    -0.5, 0.5, -0.5,
    0.5, 0.5, -0.5,
    // Bottom face
    -0.5, -0.5, 0.5,
    0.5, -0.5, 0.5,
    -0.5, -0.5, -0.5,
    0.5, -0.5, -0.5,
    // Right face
    0.5, 0.5, 0.5,
    0.5, -0.5, 0.5,
    0.5, 0.5, -0.5,
    0.5, -0.5, -0.5,
    // Left face
    -0.5, 0.5, 0.5,
    -0.5, -0.5, 0.5,
    -0.5, 0.5, -0.5,
    -0.5, -0.5, -0.5,
]);

const indices = new Uint16Array([
    // Front face
    0, 1, 2, 1, 3, 2,
    // Back face
    4, 6, 5, 5, 6, 7,
    // Top face
    8, 10, 9, 9, 10, 11,
    // Bottom face
    12, 13, 14, 13, 15, 14,
    // Right face
    16, 18, 17, 17, 18, 19,
    // Left face
    20, 21, 22, 21, 23, 22,
]);

const faceColors = [
    [1.0, 0.0, 0.0, 1.0],    // Front face: red
    [0.0, 1.0, 0.0, 1.0],    // Back face: green
    [0.0, 0.0, 1.0, 1.0],    // Top face: blue
    [1.0, 1.0, 0.0, 1.0],    // Bottom face: yellow
    [1.0, 0.0, 1.0, 1.0],    // Right face: purple
    [0.0, 1.0, 1.0, 1.0],    // Left face: white
];
const tmpColors = [];
faceColors.forEach(color => {
    for (let j = 0; j < 4; j++) {
        tmpColors.push(...color);
    }
});
const colors = new Float32Array(tmpColors);

export { vertices, indices, colors }