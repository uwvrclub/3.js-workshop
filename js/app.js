import * as THREE from "https://cdn.jsdelivr.net/npm/three@v0.108.0/build/three.module.js";
import {OrbitControls} from "https://cdn.jsdelivr.net/npm/three@v0.108.0/examples/jsm/controls/OrbitControls.js";

function main() {
    const canvas = document.querySelector('#b');
    const renderer = new THREE.WebGLRenderer({canvas, antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Perspective Camera
    const fov = 45;
    const aspect = 1.4;
    const near = 0.1;
    const far = 100;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 5;
    camera.position.y = 2;
    camera.position.x = 0;

    const scene = new THREE.Scene();
    // change background color to gray
    scene.background = new THREE.Color(0xf0f0f0);

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // directional and ambient light
    {
        const color = 0xFFFFFF;
        const intensity = 0.7;
        const directionalLight = new THREE.DirectionalLight(color, intensity);
        directionalLight.position.set(-1, 2, 4);
        const light = new THREE.AmbientLight(0x636363); // soft white light
        scene.add(light);
        scene.add(directionalLight);
    }

    // Primitive Geometry Shape
    const radius = 1;
    const widthSegments = 32;
    const heightSegments = 32;
    const ballGeometry = new THREE.SphereBufferGeometry(radius, widthSegments, heightSegments);

    // Material
    //const ballMaterial = new THREE.MeshBasicMaterial({ color: 0x44aa88 });  // greenish blue
    //const ball = new THREE.Mesh(ballGeometry, ballMaterial);
    //scene.add(ball);

    // Textures
    const loader = new THREE.TextureLoader();
    const texture = loader.load('assets/texture.jpg');
    texture.repeat.set(1, 1);
    const ballMaterial = new THREE.MeshPhongMaterial({map: texture});
    const ball = new THREE.Mesh(ballGeometry, ballMaterial);
    scene.add(ball);

    // Plane
    {
        const planeSize = 20;

        const planeTexture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
        planeTexture.wrapS = THREE.RepeatWrapping;
        planeTexture.wrapT = THREE.RepeatWrapping;
        planeTexture.magFilter = THREE.NearestFilter;
        const repeats = planeSize / 2;
        planeTexture.repeat.set(repeats, repeats);

        const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
        const planeMat = new THREE.MeshPhongMaterial({
            map: planeTexture,
            side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(planeGeo, planeMat);
        mesh.rotation.x = Math.PI * -.5;
        scene.add(mesh);
    }

    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
          renderer.setSize(width, height, false);
        }
        return needResize;
    }

    // Animation/Render loop
    function render(time) {
        
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }

        time *= 0.001;  // convert time to seconds

        ball.position.y = Math.sin(4*time)+2;

        controls.update();
        renderer.render(scene, camera);

        requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
}

main();
