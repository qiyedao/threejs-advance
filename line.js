import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight, true);
document.body.appendChild(renderer.domElement);
const points = [];
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));

const geometry = new THREE.BufferGeometry().setFromPoints(points);

const material = new THREE.LineBasicMaterial({ color: 0x00ff00 });
const line = new THREE.Line(geometry, material);
scene.add(line);
camera.position.set(0, 0, 100);

function animate() {
    requestAnimationFrame(animate);
    // line.rotation.x += 0.01;
    // line.rotation.y += 0.01;
    renderer.render(scene, camera);
}
if (WebGL.isWebGLAvailable()) {
    animate();
} else {
    const warning = WebGL.getWebGLErrorMessage();
    document.body.appendChild(warning);
}
