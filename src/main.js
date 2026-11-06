// Startpunt van NeoCity: scène opbouwen, model laden, interactie en UI koppelen.

import './style.css';
import { createStage, loadCity } from './scene.js';
import { CityInteraction } from './interaction.js';
import { createUI } from './ui.js';

const loader = document.querySelector('#loader');
const loaderFill = document.querySelector('#loader-fill');
const loaderText = document.querySelector('#loader-text');

async function main() {
  const canvas = document.querySelector('#stage');
  const { renderer, scene, camera, controls } = createStage(canvas);

  let city;
  try {
    city = await loadCity(`${import.meta.env.BASE_URL}neocity.glb`, (fraction) => {
      loaderFill.style.width = `${Math.round(fraction * 100)}%`;
    });
  } catch (error) {
    // Foutafhandeling: laat de gebruiker zien dat het laden mislukt is
    console.error('[NeoCity] Model laden mislukt:', error);
    loaderText.textContent = 'Kon de stad niet laden. Staat neocity.glb in de map public/?';
    return;
  }
  scene.add(city);
  console.info('[NeoCity] stad geladen');

  // De blimp zweeft zachtjes op en neer (tenzij de gebruiker minder beweging wil)
  const blimp = city.getObjectByName('Blimp');
  const blimpBaseY = blimp?.position.y ?? 0;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let interaction;
  const ui = createUI({
    onSelect: (objectName) => interaction.select(objectName),
    onClose: () => interaction.clear(),
  });

  interaction = new CityInteraction({
    canvas,
    camera,
    controls,
    city,
    onHover: (name, event) => ui.showTooltip(name, event),
    onSelect: (name) => (name ? ui.openPanel(name) : ui.closePanel()),
  });

  renderer.setAnimationLoop((time) => {
    if (blimp && !reduceMotion) blimp.position.y = blimpBaseY + Math.sin(time / 1200) * 0.25;
    controls.update();
    interaction.update();
    renderer.render(scene, camera);
  });

  loader.classList.add('is-done');
}

main();
