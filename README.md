# dotmatrix-loader

Une petite librairie de loaders en grille de points (SVG), animés par un seul
keyframe CSS et une carte de délais par point — pas de sprite, pas de GIF, pas
de moteur d'animation JS au runtime. Zéro dépendance à l'exécution.

**[Galerie live](https://claude.ai/code/artifact/6ae39045-daf1-4469-933f-5baa38361749)** — les 8 motifs, personnalisables en direct.

## Installation

### Avec npm

```bash
npm install dotmatrix-loader
```

```js
import { createLoader } from "dotmatrix-loader";

createLoader("#app", { pattern: "pulse" });
```

### Sans build — directement dans une page HTML

Aucune étape de build n'est nécessaire : le fichier `dist/dotmatrix-loader.global.js`
du dépôt expose une variable globale `DotMatrixLoader`.

```html
<script src="https://cdn.jsdelivr.net/gh/guillaumecaillet/dotmatrix-loader@main/dist/dotmatrix-loader.global.js"></script>
<div id="app"></div>
<script>
  DotMatrixLoader.createLoader("#app", { pattern: "pulse" });
</script>
```

## Usage

```js
import { createLoader } from "dotmatrix-loader";

const loader = createLoader("#app", {
  pattern: "pulse", // pulse | wave | rowSweep | columnSweep | orbit | checker | heartbeat | sparkle
  size: 5,
  dotSize: 6,
  gap: 4,
  duration: 1.2,
  colorOn: "#111111",
  colorOff: "#e2e2e2",
  minOpacity: 0.2,
  shape: "circle", // circle | square
});

loader.start();
loader.stop();
loader.setPattern("wave");
loader.destroy();
```

`createLoader(target, options)` accepte un sélecteur CSS, un élément DOM, ou
`null`/`undefined` pour construire le loader sans l'attacher (récupérable via
`loader.el`).

### Motifs personnalisés

Un motif est une fonction `(row, col, size) => number | null` qui renvoie un
délai brut (normalisé automatiquement) pour chaque point ; `null` marque un
point statique (non animé).

```js
createLoader("#app", {
  pattern: (r, c, size) => Math.abs(r - c),
});
```

## Développement

```bash
npm install
npm run dev    # lance la galerie de démo sur http://localhost:4321
npm run build  # génère dist/dotmatrix-loader.{esm,cjs,global}.js
```

## Motifs inclus

| Nom          | Description                                      |
| ------------ | ------------------------------------------------- |
| `pulse`      | Anneaux concentriques depuis le centre             |
| `wave`       | Balayage diagonal                                  |
| `rowSweep`   | Balayage ligne par ligne                           |
| `columnSweep`| Balayage colonne par colonne (type barre de charge) |
| `orbit`      | Balayage angulaire autour du centre                |
| `checker`    | Damier à deux phases                               |
| `heartbeat`  | Seul le centre clignote, le reste reste statique   |
| `sparkle`    | Scintillement déterministe, sans ordre apparent    |

## Licence

MIT — voir [LICENSE](LICENSE).
