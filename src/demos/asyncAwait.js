// Module 7 — Async / await (opdracht 7a, 7b en 7c)

const wachtEven = (ms) => new Promise((resolve) => setTimeout(() => resolve('Klaar!'), ms));

// 7b: haal data op met await en zet het om naar .json()
export async function haalPokemonOp(log) {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon/25');
  const data = await response.json();
  log(`Naam van Pokémon: ${data.name}`);
}

// 7c: bestaat de gebruiker? Controleer met response.ok
export async function controleerGebruiker(id, log) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);

  if (response.ok) {
    const gebruiker = await response.json();
    log(`Gebruiker gevonden: ${gebruiker.name}`, 'ok');
  } else {
    log(`Gebruiker niet gevonden (statuscode ${response.status})`, 'muted');
  }
}

export async function run(log) {
  try {
    log('Begin...');
    const resultaat = await wachtEven(1000); // lijkt te pauzeren, de rest van de pagina draait door
    log(`${resultaat}  (na 1 seconde)`);

    await haalPokemonOp(log);
    await controleerGebruiker(1, log); // bestaat
    await controleerGebruiker(9999, log); // bestaat niet → 404

    log('Einde!', 'ok');
  } catch (error) {
    // try/catch werkt net als bij gewone code, bijvoorbeeld bij geen internet
    log(`Er ging iets mis: ${error.message}`, 'error');
  }
}
