// Three.js-opzet: renderer, isometrische camera, lichten en het laden van het Blender-model.

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Dezelfde hoek als de camera in Blender: gelijke afstand op x, y en z (isometrisch).
// Let op: Blender is Z-up, glTF/three.js is Y-up. Blender (x, y, z) wordt three.js (x, z, -y).
export const HOME_POSITION = new THREE.Vector3(38.94, 44.12, 38.94);
export const HOME_TARGET = new THREE.Vector3(0, 4.9, 0);
const VIEW_WIDTH = 41; // breedte van de stad in wereld-eenheden

export function createStage(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x041a1b);

  // Orthografische camera = geen perspectief, dus echte isometrie
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 300);
  camera.position.copy(HOME_POSITION);
  camera.lookAt(HOME_TARGET);

  const controls = new OrbitControls(camera, canvas);
  controls.target.copy(HOME_TARGET);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false; // de camera volgt de geselecteerde gebouwen zelf
  controls.minZoom = 0.7;
  controls.maxZoom = 3;
  // Beperkt draaien: de stad blijft altijd mooi in beeld
  const azimuth = Math.PI / 4;
  controls.minAzimuthAngle = azimuth - 0.7;
  controls.maxAzimuthAngle = azimuth + 0.7;
  controls.minPolarAngle = 0.55;
  controls.maxPolarAngle = 1.3;
  controls.update();

  addLights(scene);

  function resize() {
    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;
    renderer.setSize(width, height, false);

    // Zorg dat de hele stad past, ook op smalle of brede schermen
    const aspect = width / height;
    const baseHeight = (VIEW_WIDTH * 9) / 16;
    let halfWidth;
    let halfHeight;
    if (aspect >= 16 / 9) {
      halfHeight = baseHeight / 2;
      halfWidth = halfHeight * aspect;
    } else {
      halfWidth = VIEW_WIDTH / 2;
      halfHeight = halfWidth / aspect;
    }
    camera.left = -halfWidth;
    camera.right = halfWidth;
    camera.top = halfHeight;
    camera.bottom = -halfHeight;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  return { renderer, scene, camera, controls, resize };
}

// De lichten uit Blender: een zon linksvoor en een koele vullamp rechts.
function addLights(scene) {
  scene.add(new THREE.HemisphereLight(0x8ff0ff, 0x0a3030, 0.9));

  const sun = new THREE.DirectionalLight(0xffffff, 2.6);
  sun.position.set(-8, 16, 10);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -22;
  sun.shadow.camera.right = 22;
  sun.shadow.camera.top = 22;
  sun.shadow.camera.bottom = -22;
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 70;
  sun.shadow.bias = -0.0004;
  sun.shadow.normalBias = 0.03;
  scene.add(sun);

  const fill = new THREE.DirectionalLight(0x80e6ff, 0.7);
  fill.position.set(12, 10, 4);
  scene.add(fill);
}

// Laadt het .glb-model uit Blender. `onProgress(0..1)` voor de laadbalk.
export async function loadCity(url, onProgress = () => {}) {
  const loader = new GLTFLoader();
  const gltf = await loader.loadAsync(url, (event) => {
    if (event.lengthComputable) onProgress(event.loaded / event.total);
  });

  const city = gltf.scene;
  city.traverse((object) => {
    if (object.isMesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });
  city.updateMatrixWorld(true);
  return city;
}
