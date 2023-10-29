import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { MeshBasicMaterial, MeshStandardMaterial } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x414141, 1);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 150);
camera.rotation.reorder('YXZ');
camera.position.set(-15, 15, 0);
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');
dracoLoader.setDecoderConfig({ type: 'js' });
const meshBasicMaterial = new MeshBasicMaterial();
const ambientLight = new THREE.AmbientLight(0xffffff);
const axesHelper = new THREE.AxesHelper(5);
axesHelper.setColors(0xff0000, 0x008000, 0x0000ff);
scene.add(axesHelper);
const img = new Image();
img.src = '/assets/bakedDay.jpg';
const bakedDay = new THREE.Texture(img);
bakedDay.needsUpdate = true;
bakedDay.encoding = THREE.sRGBEncoding;
bakedDay.flipY = false;
meshBasicMaterial.map = bakedDay;
scene.add(ambientLight);
const orbitControls = new OrbitControls(camera, document.body);
// orbitControls.enabled = false;
orbitControls.zoomSpeed = 0.25;
orbitControls.screenSpacePanning = true;
orbitControls.enableKeys = false;
orbitControls.enableDamping = true;
scene.add(orbitControls);
const gltfloader = new GLTFLoader();
gltfloader.setDRACOLoader(dracoLoader);
gltfloader.load('/assets/roomModel.glb', gltf => {
    const mesh = gltf.scene.children[0];
    console.log('mesh', mesh);
    mesh.material = meshBasicMaterial;
    mesh.traverse(_child => {
        if (_child instanceof THREE.Mesh) {
            _child.material = mesh.material;
        }
    });
    scene.add(mesh);
});
renderer.render(scene, camera);
function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
}
animate();
