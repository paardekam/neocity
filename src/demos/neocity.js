// Module 8 — NeoCity (eindopdracht): alles komt hier samen.
// Dit "stadsrapport" gebruikt bijna alle technieken uit de reader tegelijk.

const API_CHECKS = [
  { naam: 'Chuck Norris API', url: 'https://api.chucknorris.io/jokes/random' },
  { naam: 'PokéAPI', url: 'https://pokeapi.co/api/v2/pokemon/25' },
  { naam: 'JSONPlaceholder', url: 'https://jsonplaceholder.typicode.com/users/1' },
];

// Mét tijdmeting; gooit een Error als de API niet goed antwoordt
async function controleerApi({ naam, url }) {
  const start = performance.now();
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return { naam, ms: Math.round(performance.now() - start) };
}

export async function run(log, { modules }) {
  const districten = modules.filter(({ id }) => typeof id === 'number' && id !== 8);
  log(`NeoCity telt ${districten.length} modules:`);
  districten.forEach(({ id, naam, tags }) => log(`  ${id}. ${naam}  (${tags.join(', ')})`, 'muted'));

  const { innerWidth: breedte, innerHeight: hoogte } = window; // destructuring
  log(`Scherm: ${breedte}×${hoogte}px`);

  // Promise.allSettled: één mislukte API breekt de rest niet af
  log('Stadsstatus (API\'s) controleren…');
  const resultaten = await Promise.allSettled(API_CHECKS.map(controleerApi));

  resultaten.forEach((resultaat, index) => {
    const { naam } = API_CHECKS[index];
    if (resultaat.status === 'fulfilled') {
      log(`✓ ${naam} online (${resultaat.value.ms} ms)`, 'ok');
    } else {
      log(`✗ ${naam} offline: ${resultaat.reason.message}`, 'error');
    }
  });
}
