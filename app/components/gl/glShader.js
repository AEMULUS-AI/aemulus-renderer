const vertexShader = `
  attribute vec3 a_position;
  attribute vec4 a_color;
  uniform mat3 u_viewMatrix;
  uniform mat4 u_perspectiveMatrix;
  varying vec4 v_color;

  void main() {
    // Move point away from camera
    // Multiply vertex position by matrix
    vec3 transformedPosition = u_viewMatrix * a_position;
    gl_Position = u_perspectiveMatrix * vec4(transformedPosition, (1.0+transformedPosition.z) / 2.0);
    if (gl_Position.z < -10.0) {
      v_color = vec4(0.0, 0.0, 0.0, 1.0);
    }
    else {
      // Convert clip space to color space
      v_color = a_color;
    }

  }
`


const fragShader = `
  precision mediump float;

  varying vec4 v_color;

  void main() {
    gl_FragColor = v_color;
  }
`

export { vertexShader, fragShader }