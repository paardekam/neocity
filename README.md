# NeoCity — INTERFACE2 (ES6+)

Een interactieve isometrische 3D-stad waarin **elk gebouw een module uit de ES6+-reader is**.
Klik op een gebouw: de camera zoomt erop in, een paneel toont uitleg en de échte broncode,
en met **▶ Voer uit** draait die code live in de browser.

## Starten

```bash
npm install
npm run dev      # opent op http://localhost:5173
npm run build    # productiebuild in dist/
```

Je hebt Node.js 18 of hoger nodig. Het 3D-model staat in `public/neocity.glb`.

## De stad

| Gebouw | Module | Wat zie je |
|---|---|---|
| 1 · Let/Const-torens | `let` en `const` | Afgesloten const-toren met hangslot, let-toren met zwevende verdieping |
| 2 · Pijltoren | arrow functions | `=>` op de gevel en een pijl op het dak |
| 3 · Backtick-reclamegebouw | template literals | Billboard met `` `Hallo ${naam}!` `` |
| 4 · Modulemagazijn | import / export | `math.js` en `main.js` verbonden door een buis |
| 5 · Pizzeria | callbacks | Pizza-bord en een belltoren: "bel me terug" |
| 6 · Pakketcentrum | promises | Stoplicht met pending / fulfilled / rejected |
| 7 · Klokkentoren | async / await | Wachtende klok met pauzeteken + doorwerkend async-bijgebouw |
| 8 · NeoCity-toren | eindopdracht | Stadsrapport dat alle technieken combineert |
| ✦ Plein met blimp | planning | De INTERFACE2-lessen als data |

## Hoe het gemaakt is

1. **Blender**: elk gebouw is met Python (`bpy`) opgebouwd uit eenvoudige vormen, gegroepeerd per module
   (`module_1` … `module_8`, `plaza`) en geëxporteerd als `neocity.glb`.
2. **three.js**: `GLTFLoader` laadt het model, een `OrthographicCamera` herhaalt dezelfde isometrische hoek
   als in Blender en een zon + vullamp geven de schaduwen.
3. **Interactie**: een `Raycaster` bepaalt welke groep onder de muis zit. Hover = gebouw komt omhoog,
   klik = selecteren en camera-focus.

## Projectstructuur

```
index.html            pagina, canvas, paneel
public/neocity.glb    het 3D-model uit Blender
src/main.js           startpunt: alles aan elkaar koppelen
src/scene.js          renderer, camera, lichten, model laden
src/interaction.js    hover, klik en camerabeweging
src/ui.js             chips, tooltip en zijpaneel
src/modules.js        koppeling gebouw ↔ module ↔ demo
src/demos/*.js        één demo-bestand per module
```

## Waar zie je welke ES6+-techniek?

| Techniek | Waar |
|---|---|
| `let` / `const`, block scope | overal; demo in `src/demos/letConst.js` |
| Arrow functions | demo `arrow.js`, en in vrijwel de hele code (`.map`, `.filter`, event handlers) |
| Template literals | demo `template.js`; HTML van het paneel in `src/ui.js` |
| Modules (`import` / `export`, `export default`) | de hele opzet; demo `importExport.js` met `mathUtils.js`, `stringUtils.js`, `logger.js`, `greet.js` |
| Callbacks | `callbacks.js`; ook `onHover` / `onSelect` in `interaction.js` |
| Promises (`.then`, `.catch`, `Promise.allSettled`) | `promises.js`, `neocity.js` |
| `async` / `await` + `try/catch` | `asyncAwait.js`, `main.js` (model laden met foutafhandeling) |
| Destructuring, spread, `Object.entries`, optional chaining | o.a. `neocity.js`, `plaza.js`, `interaction.js` |

## Keuzes

- **Vite + three.js** in plaats van alleen CSS: de stad is echt 3D en je kunt eromheen kijken.
- **Isometrische (orthografische) camera**: dezelfde hoek als de referentie-stad van de les.
- **De echte broncode in het paneel** via Vite's `?raw`-import, zodat wat je leest ook echt is wat draait.
- **Module-chips onderin**: dezelfde navigatie met toetsenbord en op mobiel (waar je niet goed kunt hoveren).
- **Foutafhandeling overal waar het netwerk in het spel is**: zonder internet toont de demo een nette foutmelding.

## AI-gebruik

Het 3D-model en de code zijn gemaakt met hulp van Claude (AI), met toestemming van de docent.

## Bronnen

- INTERFACE2 reader — ES6+ (Javascript but better)
- [three.js](https://threejs.org/docs/) · [Vite](https://vite.dev/) · [Blender](https://www.blender.org/)
- API's in de demo's: [Chuck Norris API](https://api.chucknorris.io), [PokéAPI](https://pokeapi.co), [JSONPlaceholder](https://jsonplaceholder.typicode.com)
