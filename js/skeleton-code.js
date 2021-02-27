import * as THREE from "https://cdn.jsdelivr.net/npm/three@v0.108.0/build/three.module.js";
import {OrbitControls} from "https://cdn.jsdelivr.net/npm/three@v0.108.0/examples/jsm/controls/OrbitControls.js";

function main() {
    const canvas = document.querySelector('#b');

    // Renderer

    // Camera

    // Scene
    
    // Directional & Ambient light in here
    {
        
    }
    
    // Sphere Geometry

    // Material (replaced by Texture)

    // Texture
    
    // Plane (added at the end)
    {

    }

    // Orbit Controls (added at the end)


    // Allows Renderer to change its size 
    function resizeRendererToDisplaySize(renderer) {
        
    }

    // Animation/render loop
    function render(time) {
        
        // renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();