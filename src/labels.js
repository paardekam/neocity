// Vaste labels boven elk gebouw: zo zie je meteen welk gebouw bij welke module hoort.

import * as THREE from 'three';
import { findByObject } from './modules.js';

const anchor = new THREE.Vector3();

// Het label hangt boven het hoogste onderdeel van het gebouw (bv. het hangslot of de klok),
// de borden voor de deur tellen niet mee.
function findTop(root) {
  const box = new THREE.Box3();
  const best = new THREE.Box3();
  let bestY = -Infinity;
  root.traverse((object) => {
    if (!object.isMesh || /^sign/.test(object.name)) return;
    box.setFromObject(object);
    if (box.max.y > bestY) {
      bestY = box.max.y;
      best.copy(box);
    }
  });
  const centre = best.getCenter(new THREE.Vector3());
  return new THREE.Vector3(centre.x, bestY + 0.4, centre.z);
}

export function createLabels({ camera, groups, onSelect }) {
  const container = document.querySelector('#labels');

  // Eén knop per gebouw; de positie wordt elke frame opnieuw uitgerekend
  const labels = [...groups.entries()].map(([name, group]) => {
    const module = findByObject(name);
    const button = document.createElement('button');
    button.className = 'label';
    button.type = 'button';
    button.innerHTML = `<b>${typeof module?.id === 'number' ? module.id : '✦'}</b>${module?.naam ?? name}`;
    button.addEventListener('click', () => onSelect(name));
    container.append(button);

    return { name, group, button, top: findTop(group.object) };
  });

  // `selected` en `hovered` zijn de namen van de groepen (of null)
  function update(selected, hovered) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    for (const { name, group, button, top } of labels) {
      anchor.copy(top);
      anchor.y += group.lift; // het label zweeft mee met het gebouw
      anchor.project(camera);
      const x = (anchor.x * 0.5 + 0.5) * width;
      const y = (-anchor.y * 0.5 + 0.5) * height;
      button.style.transform = `translate(-50%, -100%) translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      button.classList.toggle('is-active', name === selected);
      button.classList.toggle('is-hover', name === hovered);
      button.classList.toggle('is-dim', selected !== null && name !== selected);
    }
  }

  return { update };
}
