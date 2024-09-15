import { shader } from './gpuShader.js';

export async function configureWebGPU(context) {
    const adaptor = await navigator.gpu?.requestAdapter();
    const device = await adaptor?.requestDevice();
    if (!device) {
        reject('need a browser that supports WebGPU');
    }

    const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
    context.configure({
        device,
        format: presentationFormat,
    });

    // Create buffers
    const positions = new Float32Array([
        -0.5, 0.5,
        0.5,  0.5,
        -0.5, -0.5,
        -0.5, -0.5,
        0.5,  0.5,
        0.5, -0.5,
    ]);
    const colors = new Float32Array([
        1, 0, 0, 1,
        0, 1, 0, 1,
        0, 0, 1, 1,
        0, 0, 1, 1,
        0, 1, 0, 1,
        0, 1, 1, 1,
    ]);
    const positionBuffer = device.createBuffer({
        size: positions.byteLength,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });

    const colorBuffer = device.createBuffer({
        size: colors.byteLength,
        usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
    });
    
    const shader_module = device.createShaderModule({
        label: 'hello world shader_module',
        code: shader,
    })

    const pipeline = device.createRenderPipeline({
        label: 'hello world pipeline',
        layout: 'auto',
        vertex: {
            module: shader_module,
            buffers: [
                // position
                {
                    arrayStride: 2 * 4,
                    attributes: [
                        {
                            shaderLocation: 0,
                            offset: 0,
                            format: 'float32x2'
                        }
                    ],
                    stepMode: "vertex",
                },
                // color
                {
                    arrayStride: 4 * 4,
                    attributes: [
                        {
                            shaderLocation: 1,
                            offset: 0,
                            format: 'float32x4'
                        }
                    ],
                    stepMode: "vertex",
                }
            ]
        },
        fragment: {
            module: shader_module,
            targets: [{format: presentationFormat}]
        },
        primitive: {
            topology: 'triangle-list',
            cullMode: 'none',
        }
    })

    const renderPassDescriptor = {
        label: 'hello world renderPass',
        colorAttachments: [
            {
                clearValue: [0.3, 0.3, 0.3, 1],
                loadOp: 'clear',
                storeOp: 'store',
            }
        ]
    }

    const vsUniformBuffer = device.createBuffer({
        size: 12 * 4,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    });
    // Create bind group
    const bindGroup = device.createBindGroup({
        label: "hello world bind group",
        layout: pipeline.getBindGroupLayout(0),
        entries: [
            {
                binding: 0,
                resource: {
                    buffer: vsUniformBuffer
                }
            },
        ]
    });

    requestAnimationFrame(render);
    function render(timestamp) {
        // Create uniforms
        const angle = timestamp / 1000;
        const matrix = new Float32Array([
            Math.cos(angle), Math.sin(-angle), 0.0, 0.0,
            Math.sin(angle), Math.cos(angle), 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0
        ]);
        
        // Write uniforms to buffer
        device.queue.writeBuffer(vsUniformBuffer, 0, matrix);
        // Write vertex and color buffer
        device.queue.writeBuffer(positionBuffer, 0, positions);
        device.queue.writeBuffer(colorBuffer, 0, colors);

        renderPassDescriptor.colorAttachments[0].view = context.getCurrentTexture().createView();
   
        const encoder = device.createCommandEncoder({
            label: 'hello world encoder',
        });
        const pass = encoder.beginRenderPass(renderPassDescriptor);
        pass.setPipeline(pipeline);
        pass.setVertexBuffer(0, positionBuffer);
        pass.setVertexBuffer(1, colorBuffer);
        pass.setBindGroup(0, bindGroup);
        pass.setViewport(0, 0, context.canvas.width, context.canvas.height, 0, 1);
        pass.draw(6);
        pass.end();
    
        const commandBuffer = encoder.finish();
        device.queue.submit([commandBuffer]);
        requestAnimationFrame(render);
    }

    // const observer = new ResizeObserver(entries => {
    // for (const entry of entries) {
    //     const canvas = entry.target;
    //     const width = entry.contentBoxSize[0].inlineSize;
    //     const height = entry.contentBoxSize[0].blockSize;
    //     canvas.width = Math.max(1, Math.min(width, device.limits.maxTextureDimension2D));
    //     canvas.height = Math.max(1, Math.min(height, device.limits.maxTextureDimension2D));
    //     // re-render
    //     render();
    // }
    // });
    // observer.observe(canvas);
}

