// Interactie met de stad: hover (gebouw komt omhoog), klik (selecteren + camera-focus).

import * as THREE from 'three';
import { HOME_TARGET } from './scene.js';

const GROUP_PATTERN = /^(module_\d+|plaza)$/;
const HOVER_LIFT = 0.35;
const SELECTED_LIFT = 0.6;

// Rechts-vector van de isometrische camera (in three.js-coördinaten)
const SCREEN_RIGHT = new THREE.Vector3(1, 0, -1).normalize();

export class CityInteraction {
  constructor({ canvas, camera, controls, city, onHover, onSelect }) {
    this.canvas = canvas;
    this.camera = camera;
    this.controls = controls;
    this.onHover = onHover;
    this.onSelect = onSelect;

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.hovered = null;
    this.selected = null;
    this.pointerDown = null;

    // Elk gebouw in het model is een groep (module_1 … module_8, plaza) met alle onderdelen erin
    this.groups = new Map();
    city.traverse((object) => {
      if (!GROUP_PATTERN.test(object.name)) return;
      const centre = new THREE.Box3().setFromObject(object).getCenter(new THREE.Vector3());
      this.groups.set(object.name, { object, baseY: object.position.y, lift: 0, centre });
    });
    console.info(`[NeoCity] ${this.groups.size} klikbare gebouwen gevonden:`, [...this.groups.keys()]);

    // Camera-doel waar we naartoe bewegen (soepel, elke frame een stukje)
    this.desiredTarget = HOME_TARGET.clone();
    this.desiredZoom = 1;

    canvas.addEventListener('pointermove', (event) => this.#handleMove(event));
    canvas.addEventListener('pointerleave', () => this.#setHovered(null));
    canvas.addEventListener('pointerdown', (event) => {
      this.pointerDown = { x: event.clientX, y: event.clientY };
    });
    canvas.addEventListener('pointerup', (event) => this.#handleUp(event));
  }

  // Welk gebouw ligt er onder de muis? (geeft de naam van de groep of null)
  #pick(event) {
    const rect = this.canvas.getBoundingClientRect();
    this.pointer.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
    );
    this.raycaster.setFromCamera(this.pointer, this.camera);

    const targets = [...this.groups.values()].map(({ object }) => object);
    const hits = this.raycaster.intersectObjects(targets, true);
    if (!hits.length) return null;

    // Loop omhoog van het geraakte onderdeel naar de groep waar het bij hoort
    let object = hits[0].object;
    while (object && !GROUP_PATTERN.test(object.name)) object = object.parent;
    return object ? object.name : null;
  }

  #handleMove(event) {
    if (event.buttons) return; // tijdens slepen niet highlighten
    this.#setHovered(this.#pick(event), event);
  }

  #handleUp(event) {
    const start = this.pointerDown;
    this.pointerDown = null;
    if (!start) return;

    // Alleen een echte klik, geen sleepbeweging
    const moved = Math.hypot(event.clientX - start.x, event.clientY - start.y);
    if (moved > 5) return;

    const name = this.#pick(event);
    if (name) this.select(name);
    else if (this.selected) this.clear();
  }

  #setHovered(name, event) {
    if (name !== this.hovered) {
      this.hovered = name;
      this.canvas.style.cursor = name ? 'pointer' : '';
    }
    this.onHover?.(name, event);
  }

  select(name) {
    const group = this.groups.get(name);
    if (!group) return;
    this.selected = name;

    // Op brede schermen schuift het paneel rechts over de stad; verschuif het doel zodat
    // het gebouw in het vrije deel links van het paneel komt te staan.
    const panelPx = window.innerWidth > 900 ? 440 : 0;
    const worldPerPixel = (this.camera.right - this.camera.left) / this.camera.zoom / window.innerWidth;
    const offset = SCREEN_RIGHT.clone().multiplyScalar(worldPerPixel * (panelPx / 2));

    this.desiredTarget = group.centre.clone().add(offset);
    this.desiredZoom = 1.7;
    this.onSelect?.(name);
  }

  clear() {
    this.selected = null;
    this.desiredTarget = HOME_TARGET.clone();
    this.desiredZoom = 1;
    this.onSelect?.(null);
  }

  // Elke frame: gebouwen laten zweven en de camera soepel richting het doel bewegen
  update() {
    for (const [name, group] of this.groups) {
      const targetLift = name === this.selected ? SELECTED_LIFT : name === this.hovered ? HOVER_LIFT : 0;
      group.lift += (targetLift - group.lift) * 0.15;
      group.object.position.y = group.baseY + group.lift;
    }

    const delta = this.desiredTarget.clone().sub(this.controls.target).multiplyScalar(0.08);
    this.controls.target.add(delta);
    this.camera.position.add(delta);

    const zoomDelta = (this.desiredZoom - this.camera.zoom) * 0.08;
    if (Math.abs(zoomDelta) > 0.0001) {
      this.camera.zoom += zoomDelta;
      this.camera.updateProjectionMatrix();
    }
  }
}
