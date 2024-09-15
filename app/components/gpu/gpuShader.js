const vertexShader = `  
    struct Uniform {
        matrix: mat3x3f,
    }
    @group(0) @binding(0) var<uniform> u_matrix: Uniform;

    struct VSInput {
        @location(0) position: vec2f,
        @location(1) color: vec4f,
    }
    struct VertexOut {
        @builtin(position) position: vec4f,
        @location(0) color : vec4f
    }
  
    @vertex
    fn vertex_main(v: VSInput) -> VertexOut
    {
        var out: VertexOut;

        var new_pos = vec3f(v.position, 1.0);
        new_pos = u_matrix.matrix * new_pos;
        out.position = vec4f(new_pos.xy, 0.0, 1.0);
        out.color = v.color;
        return out;
    }
`

const fragShader = `
    @fragment
    fn fragment_main(@location(0) color: vec4f) -> @location(0) vec4f 
    {
        return color;
    }
`

const shader = vertexShader + fragShader;

export { shader }