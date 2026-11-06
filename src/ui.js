// De HTML-kant van NeoCity: module-chips, tooltip en het zijpaneel met uitleg, code en demo.

import { MODULES, findByObject } from './modules.js';

const escapeHtml = (text) =>
  text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

export function createUI({ onSelect, onClose }) {
  const panel = document.querySelector('#panel');
  const chips = document.querySelector('#chips');
  const tooltip = document.querySelector('#tooltip');
  const hint = document.querySelector('#hint');

  // ---- chips onderin: dezelfde modules, bereikbaar met toetsenbord en op mobiel ----
  chips.innerHTML = MODULES.map(
    ({ object, id, naam }) =>
      `<button class="chip" data-object="${object}"><b>${typeof id === 'number' ? id : '✦'}</b>${naam}</button>`,
  ).join('');
  chips.addEventListener('click', (event) => {
    const chip = event.target.closest('.chip');
    if (chip) onSelect(chip.dataset.object);
  });

  function setActiveChip(objectName) {
    chips.querySelectorAll('.chip').forEach((chip) => {
      chip.classList.toggle('is-active', chip.dataset.object === objectName);
    });
  }

  // ---- tooltip bij hover ----
  function showTooltip(objectName, event) {
    const module = objectName && findByObject(objectName);
    if (!module || !event) {
      tooltip.hidden = true;
      return;
    }
    tooltip.hidden = false;
    tooltip.textContent = `${typeof module.id === 'number' ? `${module.id} · ` : ''}${module.naam}`;
    tooltip.style.left = `${event.clientX}px`;
    tooltip.style.top = `${event.clientY}px`;
  }

  // ---- zijpaneel ----
  function openPanel(objectName) {
    const module = findByObject(objectName);
    if (!module) return;

    hint.classList.add('is-hidden');
    setActiveChip(objectName);

    panel.innerHTML = `
      <button class="panel__close" aria-label="Sluiten">×</button>
      <span class="panel__badge">${typeof module.id === 'number' ? module.id : '✦'}</span>
      <h2>${module.naam}</h2>
      <p class="panel__building">${module.gebouw}</p>
      <div class="tags">${module.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}</div>
      <p>${module.uitleg}</p>
      <h3>Code</h3>
      <pre class="code"><code>${escapeHtml(module.bron)}</code></pre>
      <button class="run">▶ Voer uit</button>
      <h3>Uitvoer</h3>
      <div class="console"><span class="empty">Klik op “Voer uit” om de code te draaien.</span></div>
    `;
    panel.classList.add('is-open');
    document.body.classList.add('has-panel');
    panel.setAttribute('aria-hidden', 'false');
    panel.scrollTop = 0;

    const runButton = panel.querySelector('.run');
    const output = panel.querySelector('.console');
    panel.querySelector('.panel__close').addEventListener('click', onClose);

    runButton.addEventListener('click', async () => {
      output.innerHTML = '';
      runButton.disabled = true;

      // `log` schrijft naar het paneel én naar de browserconsole
      const log = (message, type = '') => {
        const line = document.createElement('div');
        line.className = `line ${type}`.trim();
        line.textContent = message;
        output.append(line);
        output.scrollTop = output.scrollHeight;
        console.log(`[${module.naam}] ${message}`);
      };

      try {
        // await werkt voor zowel gewone als async demo's (en demo's die een Promise teruggeven)
        await module.run(log, { modules: MODULES });
      } catch (error) {
        log(`Onverwachte fout: ${error.message}`, 'error');
      } finally {
        runButton.disabled = false;
      }
    });
  }

  function closePanel() {
    panel.classList.remove('is-open');
    document.body.classList.remove('has-panel');
    panel.setAttribute('aria-hidden', 'true');
    setActiveChip(null);
  }

  // Escape sluit het paneel
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') onClose();
  });

  return { showTooltip, openPanel, closePanel };
}
