// Hulpmodule voor opdracht 4c: een logger die door andere modules wordt geïmporteerd.

let sink = null; // optioneel: extra bestemming voor berichten (het paneel in de stad)

export function setSink(callback) {
  sink = callback;
}

export function logMessage(message) {
  console.log(`[logMessage] ${message}`);
  if (sink) sink(message);
}
