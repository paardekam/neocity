// Module 1 — let & const (opdracht 1a, 1b en 1c)
// `log` is de functie waarmee de demo naar het paneel (en de console) schrijft.

export function run(log) {
  // --- 1a: `let` mag opnieuw worden toegewezen -----------------------------
  let count = 0;
  count += 5;
  log(`let count = 0; count += 5;  →  count is ${count}`);

  // --- 1c: `const` mag dat niet --------------------------------------------
  const naam = 'Max';
  log(`const naam = "${naam}"`);
  try {
    // Een rechtstreekse toewijzing aan een const geeft al bij het bouwen een
    // waarschuwing. Daarom voeren we de verboden regel uit via new Function.
    new Function('"use strict"; const PI = 3.14159; PI = 3.14;')();
  } catch (error) {
    log(`✗ ${error.name}: ${error.message}`, 'error');
    log('Een const kan na de declaratie niet meer opnieuw worden toegewezen.', 'muted');
  }

  // --- 1b: block scope ------------------------------------------------------
  let globalVar = 10;

  function modifyVar() {
    let localVar = 5;
    {
      let innerVar = 2; // bestaat alleen binnen dit blok
      log(`binnen het blok:    globalVar=${globalVar}, localVar=${localVar}, innerVar=${innerVar}`);
    }
    log(`binnen de functie:  globalVar=${globalVar}, localVar=${localVar}, innerVar is ${typeof innerVar}`);
  }

  modifyVar();
  log(`buiten de functie:  globalVar=${globalVar}, localVar is ${typeof localVar}`);
  log('✓ let en const hebben block scope; var niet.', 'ok');
}
