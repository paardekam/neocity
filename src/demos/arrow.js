// Module 2 — Arrow functions (opdracht 2a en 2b)

// 2a: herschreven naar arrow function syntax
export const multiply = (a, b) => a * b; // impliciete return
export const greet = (name) => `Hello, ${name}!`;
export const double = (getal) => getal * 2;
export const filterEvens = (reeks) => reeks.filter((getal) => getal % 2 === 0);

export function run(log) {
  log(`multiply(6, 7)  →  ${multiply(6, 7)}`);
  log(`greet("Max")    →  ${greet('Max')}`);
  log(`double(21)      →  ${double(21)}`);

  const getallen = [1, 2, 3, 4, 5, 6, 7, 8];
  log(`filterEvens([${getallen}])  →  [${filterEvens(getallen)}]`);

  // 2b: het verschil in `this`
  // Een gewone functie krijgt zijn eigen `this` (het object ervoor);
  // een arrow function erft `this` van de omringende scope.
  const myObject = {
    waarde: 5,
    regularFunction() {
      return `this.waarde = ${this.waarde}`;
    },
    arrowFunction: () => {
      // `this` is hier niet myObject, maar de `this` van run()
      return `this?.waarde = ${this?.waarde}`;
    },
  };

  log(`regularFunction()  →  ${myObject.regularFunction()}`);
  log(`arrowFunction()    →  ${myObject.arrowFunction()}`);
  log('✓ Arrow functions hebben geen eigen "this" binding.', 'ok');
}
