// Het plein met de blimp: de planning van INTERFACE2 (uit de reader) als data.

const tijdsplanning = {
  'Week 1': ['let / const', 'arrow functions', 'template literals'],
  'Week 2': ['modules: import / export', 'callbacks'],
  'Week 3': ['promises'],
  'Week 4': ['async / await'],
  'Week 5': ['eindopdracht: NeoCity'],
  'Week 6': ['eindopdracht: NeoCity'],
};

export function run(log) {
  log('INTERFACE2 — ES6+ (JavaScript but better)');
  // Object.entries + destructuring in de parameters van de arrow function
  Object.entries(tijdsplanning).forEach(([week, onderwerpen]) => {
    log(`${week.padEnd(7)} ${onderwerpen.join(' · ')}`, 'muted');
  });
  log('✓ Elk gebouw in de stad is één van deze onderwerpen.', 'ok');
}
