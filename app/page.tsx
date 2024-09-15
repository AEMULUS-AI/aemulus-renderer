export default function Home() {
    return (
        <div className="flex justify-center">
            {/* Nagivate to webgl page */}
            <a href="/webgl" className="text-center px-2 py-1 mx-5 bg-orange-400 border rounded-md">WebGL</a>
            {/* Navigate to webgpu page */}
            <a href="/webgpu" className="text-center px-2 py-1 mx-5 bg-cyan-400 border rounded-md">WebGPU</a>
        </div>
    )
}