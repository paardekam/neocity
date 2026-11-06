// Opdracht 4b — stringUtils.js: alle drie de functies worden geëxporteerd.

export function capitalize(tekst) {
  return tekst.toUpperCase();
}

export function reverse(tekst) {
  return [...tekst].reverse().join('');
}

export function countChars(tekst) {
  return tekst.length;
}
