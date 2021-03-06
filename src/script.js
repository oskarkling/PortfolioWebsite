import './css/style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { CubeReflectionMapping } from 'three';
//import * as dat from 'dat.gui'

// Debug -> remove for production build
//const gui = new dat.GUI();

// Loader
const textureLoader = new THREE.TextureLoader();
const normalMapPebblesTexture = textureLoader.load('Metal_Plate_047_normal.jpg');

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1);
//const geometry = new THREE.SphereBufferGeometry(0.75, 65, 64);

// Materials
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.2;
material.metalness = 0.8;
material.normalMap = normalMapPebblesTexture;

material.color = new THREE.Color(0x292929);

// Mesh
const cube = new THREE.Mesh(geometry,material);
cube.position.set(0,0,-1);
scene.add(cube);

// Lights
// pointLight1
const pointLight1 = new THREE.PointLight(0x00F1FF, 0.1);
pointLight1.position.set(1, 2, 4);
pointLight1.intensity = 2;
scene.add(pointLight1);

// pointLight2
const pointLight2 = new THREE.PointLight(0xFF019A, 0.1);
pointLight2.position.set(-1, -2, 4);
pointLight2.intensity = 2;
scene.add(pointLight2);

// pointLight3
const pointLight3 = new THREE.PointLight(0xffffff, 0.1);
pointLight3.position.set(0, 5, 1);
pointLight3.intensity = 2;
scene.add(pointLight3);

//  // GUI UI - remove for prod build.
// // gui light1
// const light1 = gui.addFolder('Light 1');
// light1.add(pointLight1.position, 'y').min(-5).max(5).step(0.01);
// light1.add(pointLight1.position, 'x').min(-6).max(6).step(0.01);
// light1.add(pointLight1.position, 'z').min(-5).max(5).step(0.01);
// light1.add(pointLight1, 'intensity').min(0).max(10).step(0.01);
// const pointLight1Helper = new THREE.PointLightHelper(pointLight1, 0.3);
// scene.add(pointLight1Helper);
// const light1Color =
// {
//     color: 0xff0000
// }
// light1.addColor(light1Color, 'color')
//     .onChange(() => 
//     {
//         pointLight1.color.set(light1Color.color)
//     });

// // gui light 2
// const light2 = gui.addFolder('Light 2');
// light2.add(pointLight2.position, 'y').min(-5).max(5).step(0.01);
// light2.add(pointLight2.position, 'x').min(-6).max(6).step(0.01);
// light2.add(pointLight2.position, 'z').min(-5).max(5).step(0.01);
// light2.add(pointLight2, 'intensity').min(0).max(10).step(0.01);
// const pointLight2Helper = new THREE.PointLightHelper(pointLight2, 0.3);
// scene.add(pointLight2Helper);
// const light2Color =
// {
//     color: 0xff0000
// }
// light2.addColor(light2Color, 'color')
//     .onChange(() =>
//     {
//         pointLight2.color.set(light2Color.color)
//     });

// // gui light 3
// const light3 = gui.addFolder('Light 3');
// light3.add(pointLight3.position, 'y').min(-5).max(5).step(0.01);
// light3.add(pointLight3.position, 'x').min(-6).max(6).step(0.01);
// light3.add(pointLight3.position, 'z').min(-5).max(5).step(0.01);
// light3.add(pointLight3, 'intensity').min(0).max(10).step(0.01);
// const pointLight3Helper = new THREE.PointLightHelper(pointLight3, 0.3);
// scene.add(pointLight3Helper);
// const light3Color =
// {
//     color: 0xff0000
// }
// light3.addColor(light3Color, 'color')
//     .onChange(() => 
//     {
//         pointLight3.color.set(light3Color.color)
//     });


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Window listening
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 0;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true



/**
 * Renderer
 */
// alpha value makes the three.js objects sit on top of the html background
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    //alpha: true
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true

/**
 * Animate
 */
document.addEventListener('mousemove', onDocumentMouseMove);

let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event) 
{
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
}


// Button functionality
let gotPower = false;

document.getElementById("gainPower").addEventListener("click", gainPower, false);

document.getElementById("loosePower").addEventListener("click", loosePower, false);

document.getElementById("resetCube").addEventListener("click", resetCube, false);

function resetCube() {
    gotPower = false;
    cube.position.set(0,0,0);
}

function gainPower()
{
    gotPower = true;
}

function loosePower()
{
    gotPower = false;
}

// star functions
// star with star.png
const starTexture = textureLoader.load('star.png');

const particlesCustomGeometry = new THREE.BufferGeometry()
const count = 2000

const vertices = new Float32Array(count*3)
for(let i= 0; i<count*3;i++){
    vertices[i] = (Math.random()-0.5) * 20
}

particlesCustomGeometry.setAttribute(
    'position', 
    new THREE.BufferAttribute(vertices,3)
)
const particleCustommaterial = new THREE.PointsMaterial({
    color:'#00F1FF',
    map:starTexture
})
particleCustommaterial.size = 0.1
particleCustommaterial.sizeAttenuation = true
particleCustommaterial.transparent = true
particleCustommaterial.alphaMap = starTexture
particleCustommaterial.alphaTest = 0.001
// const mesh = new THREE.Mesh(particlesCustomGeometry,material)
const customParticles = new THREE.Points(
    particlesCustomGeometry,
    particleCustommaterial
)
scene.add(customParticles)


//star with mesh
function addStar()
{
    const starGeometry = new THREE.SphereGeometry(0.11, 12, 12);
    const material = new THREE.MeshBasicMaterial( {color: 0xffffff});
    const star = new THREE.Mesh(starGeometry, material);

    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    star.position.set(x,y,z);
    scene.add(star);
}

Array(500).fill().forEach(addStar);

// Orbit controls functionality

//const controls = new OrbitControls(camera, renderer.domElement);


//move camera

function moveCamera()
{
    const t = document.body.getBoundingClientRect().top;
    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;

}

document.body.onscroll = moveCamera;


const clock = new THREE.Clock();

// Recursive function. The "game loop"
const tick = () =>
{
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    const elapsedTime = clock.getElapsedTime();

    if(!gotPower)
    {
        cube.rotation.y = .6 * elapsedTime;
        cube.rotation.x = .16 * elapsedTime;
    }
    else
    {
        cube.rotation.y = .4;
        cube.rotation.x = .12;
    
        // Mouse movement
        cube.rotation.y += 0.5 * (targetX - cube.rotation.y);
        cube.rotation.x += 0.5 * (targetY - cube.rotation.x);
        cube.rotation.z += -0.05 * (targetY - cube.rotation.x);

        cube.position.y += -0.1 * targetY;
        cube.position.x += 0.1 * targetX;
    }
    
    

    // Update Orbital Controls
    controls.update()

    // Render the webgl
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}

tick();