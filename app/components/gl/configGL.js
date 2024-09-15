import * as glShader from './glShader.js';
import * as mat from '../matrix.js';
import * as cube from '../data/cube.js';
import Controls from '../controls.js';
import Camera from '../camera.js';

function setUpShaders(gl, vsSource, fsSource) {
    // Compile vertex shader
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vsSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(vertexShader));
        gl.deleteShader(vertexShader);
        return;
    }
    // Compile fragment shader
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fsSource);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(fragmentShader));
        gl.deleteShader(fragmentShader);
        return;
    }

    // Create a shader program
    const program = gl.createProgram();
    // Attach the shaders to the program
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    // Link the program
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return;
    }

    return program;
}

export function configureWebGL(canvas) {
    const gl = canvasGL.getContext('webgl');
    // Setup shaders
    const program = setUpShaders(gl, glShader.vertexShader, glShader.fragShader);

    // Create, set and bind the buffers
    const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
    const colorAttributeLocation = gl.getAttribLocation(program, "a_color");
    const viewMatrixLocation = gl.getUniformLocation(program, "u_viewMatrix");
    const perspectiveMatrixLocation = gl.getUniformLocation(program, "u_perspectiveMatrix");

    // Position buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        cube.vertices,
        gl.STATIC_DRAW
    )

    // Indices buffer
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        cube.indices,
        gl.STATIC_DRAW
    )

    // Color buffer
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        cube.colors,
        gl.STATIC_DRAW
    )
    
    const camera = new Camera(90, 1, 50, canvas)
    const controls = new Controls(canvas, window, camera);
    
    // Find maximum radius of object

    // Find distance between camera and object

    requestAnimationFrame(draw);
    
    function draw(timestamp) {
        controls.update();
        // Set background color
        gl.clearColor(1.0, 1.0, 1.0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.DEPTH_TEST);
        gl.enable(gl.CULL_FACE);
        // Use progam
        gl.useProgram(program);
        // Set pixel space
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        
        // console.log(camera.getViewMatrix, camera.getPerspectiveMatrix)
        gl.uniformMatrix3fv(viewMatrixLocation, false, camera.getViewMatrix());
        gl.uniformMatrix4fv(perspectiveMatrixLocation, false, camera.getPerspectiveMatrix())

        // Bind position buffer
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.vertexAttribPointer(positionAttributeLocation, 3, gl.FLOAT, false, 0, 0);
        // Bind color buffer
        gl.enableVertexAttribArray(colorAttributeLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
        gl.vertexAttribPointer(colorAttributeLocation, 4, gl.FLOAT, false, 0, 0);
        // Bind index buffer
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

        gl.drawElements(gl.TRIANGLES, 6*6, gl.UNSIGNED_SHORT, 0);
        requestAnimationFrame(draw);
    }
}