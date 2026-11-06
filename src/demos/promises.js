// Module 6 — Promises (opdracht 6a, 6b en 6c)

// Een eigen Promise: pending → fulfilled óf rejected
export function maakBelofte(slaag, ms = 700) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (slaag) resolve('Het is gelukt!');
      else reject(new Error('Er ging iets mis...'));
    }, ms);
  });
}

// 6a: een grap ophalen met fetch() en .then()/.catch()
export function haalGrap() {
  return fetch('https://api.chucknorris.io/jokes/random')
    .then((response) => response.json())
    .then((data) => data.value);
}

// 6b: de naam van Pikachu (id 25) uit de PokéAPI
export function haalPokemon(id = 25) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`); // 6c: response.ok controleren
      return response.json();
    })
    .then((data) => data.name);
}

export function run(log) {
  log('Promise status: pending …', 'muted');

  return maakBelofte(true)
    .then((resultaat) => {
      log(`✓ fulfilled: ${resultaat}`, 'ok');
      return maakBelofte(false); // chaining: de volgende .then() wacht hierop
    })
    .then(() => log('(dit wordt overgeslagen omdat de vorige Promise rejected is)'))
    .catch((fout) => log(`✗ rejected: ${fout.message}`, 'error'))
    .then(() => haalGrap())
    .then((grap) => log(`Grap: ${grap}`))
    .then(() => haalPokemon(25))
    .then((naam) => log(`Naam van Pokémon: ${naam}`))
    .catch(() => log('Er ging iets mis (geen internet?)', 'error'));
}
