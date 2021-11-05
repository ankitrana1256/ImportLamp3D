let container;
let camera;
let renderer;
let scene;
let house;

container = document.querySelector(".lamp");

//Create scene
scene = new THREE.Scene();

const fov = 75;
const aspect = container.clientWidth / container.clientHeight;
const near = 0.1;
const far = 1000;

//Camera setup
camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 55);

// const ambient = new THREE.AmbientLight(0x404040, 2);
// scene.add(ambient);

const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light);

//Renderer
renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enabled = false;

container.appendChild(renderer.domElement);

//Load Model
let loader = new THREE.GLTFLoader();
loader.load("./models/study_lamp/scene.gltf", function(gltf) {
    gltf.scene.position.x = -160;
    gltf.scene.position.y = -24;
    gltf.scene.position.z = 75;
    scene.add(gltf.scene);
    lamp = gltf.scene.children[0];
    animate();
});

// const lamplight = new THREE.DirectionalLight(0xFFFFFF);
// lamplight.position.z = 15;
// lamplight.position.y = 12;

const lamplight = new THREE.PointLight(0xffffff, 1, 100);
lamplight.position.set(0, 10, 20);
lamplight.castShadow = true; // default false
scene.add(lamplight);

// const helper = new THREE.PointLightHelper(lamplight, 5);
// scene.add(helper);

// const grid = new THREE.GridHelper(100, 50, 0x000000, 0x000000);
// grid.material.opacity = 1;
// grid.material.transparent = true;
// grid.material.receiveShadow = true
// scene.add(grid);



function animate() {
    requestAnimationFrame(animate);
    controls.autoRotate = true;
    renderer.render(scene, camera);
    controls.update();
}


function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);