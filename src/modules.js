// Het register van de stad: welk gebouw hoort bij welke module, wat staat er in het paneel
// en welke demo draait er als je op "Voer uit" klikt.
//
// `?raw` is een Vite-feature: het importeert de échte broncode van een bestand als tekst,
// zodat het paneel altijd de code toont die ook daadwerkelijk wordt uitgevoerd.

import * as letConst from './demos/letConst.js';
import * as arrow from './demos/arrow.js';
import * as template from './demos/template.js';
import * as importExport from './demos/importExport.js';
import * as callbacks from './demos/callbacks.js';
import * as promises from './demos/promises.js';
import * as asyncAwait from './demos/asyncAwait.js';
import * as neocity from './demos/neocity.js';
import * as plaza from './demos/plaza.js';

import letConstSrc from './demos/letConst.js?raw';
import arrowSrc from './demos/arrow.js?raw';
import templateSrc from './demos/template.js?raw';
import importExportSrc from './demos/importExport.js?raw';
import callbacksSrc from './demos/callbacks.js?raw';
import promisesSrc from './demos/promises.js?raw';
import asyncAwaitSrc from './demos/asyncAwait.js?raw';
import neocitySrc from './demos/neocity.js?raw';
import plazaSrc from './demos/plaza.js?raw';

export const MODULES = [
  {
    id: 1,
    object: 'module_1',
    naam: 'Let & const',
    gebouw: 'De Let/Const-torens',
    tags: ['let', 'const', 'block scope'],
    uitleg:
      'Links staat de afgesloten const-toren: eenmaal toegewezen, nooit meer te wijzigen. Rechts de let-toren, waarvan de bovenste verdieping los zweeft omdat de waarde mag veranderen. Beide hebben block scope; var niet.',
    bron: letConstSrc,
    run: letConst.run,
  },
  {
    id: 2,
    object: 'module_2',
    naam: 'Arrow functions',
    gebouw: 'De Pijltoren',
    tags: ['=>', 'impliciete return', 'this'],
    uitleg:
      'Een compacte manier om functies te schrijven. Een arrow function heeft geen eigen "this": die erft hij van de omringende scope. Handig voor korte functies zoals filter en map.',
    bron: arrowSrc,
    run: arrow.run,
  },
  {
    id: 3,
    object: 'module_3',
    naam: 'Template literals',
    gebouw: 'Het Backtick-reclamegebouw',
    tags: ['`backticks`', '${ }', 'multiline'],
    uitleg:
      'Met backticks verwerk je variabelen en berekeningen direct in tekst, en schrijf je strings over meerdere regels zonder speciale tekens.',
    bron: templateSrc,
    run: template.run,
  },
  {
    id: 4,
    object: 'module_4',
    naam: 'Import / export',
    gebouw: 'Het Modulemagazijn',
    tags: ['import', 'export', 'export default'],
    uitleg:
      'Twee magazijnen, math.js en main.js, met een buis ertussen. Wat je exporteert mag een ander bestand importeren. Zo splits je code op in overzichtelijke, herbruikbare modules (en deze hele stad is ermee gebouwd).',
    bron: importExportSrc,
    run: importExport.run,
  },
  {
    id: 5,
    object: 'module_5',
    naam: 'Callbacks',
    gebouw: 'De Pizzeria',
    tags: ['callback', 'setTimeout', 'callback hell'],
    uitleg:
      'Je bestelt een pizza en geeft je telefoonnummer mee: dát is de callback. De bezorger belt pas als hij klaar is. Intussen loopt de rest van het programma gewoon door.',
    bron: callbacksSrc,
    run: callbacks.run,
  },
  {
    id: 6,
    object: 'module_6',
    naam: 'Promises',
    gebouw: 'Het Pakketcentrum',
    tags: ['Promise', '.then()', '.catch()', 'fetch'],
    uitleg:
      'Een belofte voor later: pending, fulfilled of rejected. Het stoplicht op het dak laat de drie toestanden zien. Met .then() en .catch() koppel je stappen aan elkaar zonder callback hell.',
    bron: promisesSrc,
    run: promises.run,
  },
  {
    id: 7,
    object: 'module_7',
    naam: 'Async / await',
    gebouw: 'De Klokkentoren',
    tags: ['async', 'await', 'try/catch'],
    uitleg:
      'Asynchrone code die eruitziet als gewone code. De klokkentoren wacht (pauze-teken), terwijl het async-bijgebouw gewoon doorwerkt. Fouten vang je netjes af met try/catch.',
    bron: asyncAwaitSrc,
    run: asyncAwait.run,
  },
  {
    id: 8,
    object: 'module_8',
    naam: 'NeoCity',
    gebouw: 'De NeoCity-toren',
    tags: ['eindopdracht', 'Promise.allSettled', 'destructuring'],
    uitleg:
      'Het hart van de stad: alles uit de reader komt hier samen. Het stadsrapport controleert drie API\'s tegelijk met Promise.allSettled, zodat één storing de rest niet onderuit haalt.',
    bron: neocitySrc,
    run: neocity.run,
  },
  {
    id: 'plein',
    object: 'plaza',
    naam: 'INTERFACE2-plein',
    gebouw: 'Plein met blimp',
    tags: ['planning', 'Object.entries'],
    uitleg: 'Het plein met de INTERFACE2-blimp. Hier staat de planning van de lessen, als data in een object.',
    bron: plazaSrc,
    run: plaza.run,
  },
];

// Zoekfunctie op object-naam in het 3D-model ("module_3" → het Template literals-register)
export const findByObject = (objectName) => MODULES.find((m) => m.object === objectName);
export const findById = (id) => MODULES.find((m) => m.id === id);
