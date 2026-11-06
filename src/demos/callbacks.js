// Module 5 — Callbacks (opdracht 5a en 5b)

// 5a: de callback bepaalt wat er met de uitkomst gebeurt
export function rekenUit(a, b, callback) {
  const som = a + b;
  callback(som);
}

// 5b: voer de callback uit na een aantal milliseconden
export function wachtEnVoerUit(tijd, callback) {
  setTimeout(callback, tijd);
}

// Geeft een Promise terug zodat het paneel weet wanneer de demo klaar is
export function run(log) {
  return new Promise((resolve) => {
    log('Tafel dekken...');

    wachtEnVoerUit(1500, () => {
      log('Pizza is er!  (callback na 1500 ms)', 'ok');
      resolve();
    });

    // Dit draait direct, terwijl setTimeout nog wacht: dát is asynchroon
    log('Drankjes inschenken...');
    rekenUit(2, 3, (som) => log(`rekenUit(2, 3) → callback krijgt ${som}, verdubbeld: ${som * 2}`));
  });
}
