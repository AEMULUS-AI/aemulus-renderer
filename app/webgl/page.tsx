'use strict';
'use client'
import { useEffect, useRef } from 'react';
import { configureWebGL } from '../components/gl/configGL.js';


export default function WebGL() {
    const refGL = useRef<HTMLCanvasElement>();

    useEffect(() => {
        const canvasGL = refGL.current;
        configureWebGL(canvasGL);

        return () => {
        }
    }, []);

    return (
        <div>
            <div className="flex justify-center mt-5">
                <div className="flex-col mx-5">
                    <h1>WebGL Canvas</h1>
                    <canvas id="canvasGL" ref={refGL} width={600} height={600}></canvas>
                </div>
            </div>
            <div className="flex justify-center">
                {/* Nagivate to webgl page */}
                <a href="/webgpu" className="text-center px-2 py-1 mx-5 bg-cyan-400 border rounded-md">WebGPU</a>
            </div>
        </div>
    );
}
