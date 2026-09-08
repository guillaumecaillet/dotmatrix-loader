# dotmatrix-loader

Une petite librairie de loaders en grille de points (SVG), animés par un seul
keyframe CSS et une carte de délais par point — pas de sprite, pas de GIF, pas
de moteur d'animation JS au runtime. Zéro dépendance à l'exécution.

**[Galerie live](https://claude.ai/code/artifact/6ae39045-daf1-4469-933f-5baa38361749)** — les 24 motifs, personnalisables en direct (couleurs et vitesse).

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
  pattern: "pulse", // voir la table des motifs inclus plus bas pour la liste complète
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
| `diamond`    | Anneaux en losange depuis le centre (distance de Manhattan) |
| `square`     | Anneaux carrés depuis le centre (distance de Chebyshev) |
| `chevron`    | Un V symétrique qui converge vers la diagonale     |
| `cross`      | Une croix qui se remplit depuis le centre vers les bords |
| `spiral`     | Un tourbillon qui part du centre                   |
| `snake`      | Balayage ligne par ligne en alternant le sens (comme une machine à écrire) |
| `ripple`     | Anneaux depuis le coin supérieur gauche (pulse asymétrique) |
| `cornersIn`  | Un souffle qui part des 4 coins vers le centre     |
| `zigzag`     | Balayage diagonal qui rebondit (aller-retour)      |
| `starburst`  | Les deux diagonales se remplissent en même temps, en X |
| `windmill`   | Un moulin à 3 pales qui tourne                     |
| `quadrants`  | Les 4 quadrants s'allument à tour de rôle          |
| `unison`     | Tous les points clignotent ensemble, sans décalage |
| `columnSnake`| Comme `snake`, mais colonne par colonne            |
| `collision`  | Deux anneaux partent de coins opposés et se rencontrent au centre |
| `staircase`  | Balayage diagonal par marches de 2 points          |

## Licence

MIT — voir [LICENSE](LICENSE).
