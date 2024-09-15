'use strict';
'use client'
import { useEffect, useRef } from 'react';
import { configureWebGPU } from '../components/gpu/configGPU.js';

export default function WebGPU() {
    const refGPU = useRef<HTMLCanvasElement>();

    useEffect(() => {
        const canvasGPU = refGPU.current;
        const contextGPU = canvasGPU.getContext('webgpu');

        configureWebGPU(contextGPU)
        .then(() => {
            console.log('WebGPU initialized');
        })
        .catch(
        (error) => {
            console.error('Failed to initialize WebGPU', error);
        })

        return () => {
            console.log('Cleaning up WebGPU');
            contextGPU.unconfigure();
        }
    }, []);

    return (
        <div>
            <div className="flex justify-center mt-5">
                <div className="flex-col mx-5">
                    <h1>WebGPU Canvas</h1>
                    <canvas id="canvasGPU" ref={refGPU} width={600} height={600}></canvas>
                </div>
            </div>
            <div className="flex justify-center">
                {/* Nagivate to webgl page */}
                <a href="/webgl" className="text-center px-2 py-1 mx-5 bg-cyan-400 border rounded-md">WebGL</a>
            </div>
        </div>
    );
}
