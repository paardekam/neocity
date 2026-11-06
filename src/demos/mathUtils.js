// Opdracht 4a + 4c — mathUtils.js
// Importeert logMessage uit logger.js en gebruikt die voordat het resultaat wordt teruggegeven.
import { logMessage } from './logger.js';

export function add(a, b) {
  const resultaat = a + b;
  logMessage(`add(${a}, ${b}) = ${resultaat}`);
  return resultaat;
}

export function subtract(a, b) {
  const resultaat = a - b;
  logMessage(`subtract(${a}, ${b}) = ${resultaat}`);
  return resultaat;
}
