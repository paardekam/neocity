// Module 3 — Template literals (opdracht 3a en 3b)

// 3a: een bericht met variabelen en een datum, in één template literal
export const maakWelkom = ({ naam, klas, opleiding }) => {
  const vandaag = new Date().toLocaleDateString('nl-NL');
  return `Welkom, ${naam}! Je zit in de klas: ${klas} op de opleiding: ${opleiding}. (${vandaag})`;
};

// 3b: berekeningen mogen gewoon binnen ${ }
export const maakBestelling = (product, prijs, aantal) =>
  `Je bestelde ${aantal} x ${product}. Totaalprijs: €${(prijs * aantal).toFixed(2)}`;

export function run(log) {
  const naam = 'Max';
  const klas = 'd2x';
  const opleiding = 'Creative Software Developer';
  log(maakWelkom({ naam, klas, opleiding }));

  const product = 'Tosti';
  const prijs = 2.75;
  const aantal = 3;
  log(maakBestelling(product, prijs, aantal));

  // Meerdere regels zonder \n
  const uitleg = `Dit is een uitleg
die over meerdere regels gaat
zonder gedoe`;
  log(uitleg, 'muted');
  log('✓ Backticks + ${ } vervangen "tekst" + variabele + "tekst".', 'ok');
}
