// Module 4 — Import / export (opdracht 4a, 4b en 4c)
// Dit bestand IS het bewijs: alles hieronder komt uit losse bestanden.

import { add, subtract } from './mathUtils.js'; // named exports
import { capitalize, countChars, reverse } from './stringUtils.js';
import { setSink } from './logger.js';
import greet from './greet.js'; // default export: geen { }

export function run(log) {
  // Berichten van logMessage() (in logger.js) laten we ook in het paneel verschijnen
  setSink((bericht) => log(`  ↳ logMessage: ${bericht}`, 'muted'));

  try {
    log(`add(5, 3)       →  ${add(5, 3)}`);
    log(`subtract(10, 4) →  ${subtract(10, 4)}`);

    log(`capitalize("neocity")  →  ${capitalize('neocity')}`);
    log(`reverse("neocity")     →  ${reverse('neocity')}`);
    log(`countChars("neocity")  →  ${countChars('neocity')}`);

    log(greet('Jeff'));
    log('✓ export zegt "dit mag iemand anders gebruiken", import zegt "ik wil dit gebruiken".', 'ok');
  } finally {
    setSink(null); // ruim de koppeling weer op
  }
}
