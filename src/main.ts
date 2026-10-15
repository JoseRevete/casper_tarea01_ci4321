// Page scaffolding only: toggle, canvas swap and source panel.
import './style.css';
import { run as runFF } from './examples/figures.ff';
import ffSource from './examples/figures.ff.ts?raw';

type Mode = 'ff';
type Figure = 'Triangle' | 'Square' | 'Hexagon' | 'Circle';
const figures: Figure[] = ['Triangle', 'Square', 'Hexagon', 'Circle'];
type Colors = 'red' | 'green' | 'blue';

const examples: { [K in Mode]: { file: string; source: string; run: (options: {canvas: HTMLCanvasElement, color: Colors, figure: Figure}) => void } } = {
  ff: { file: 'figures.ff.ts', source: ffSource, run: runFF },
};

const stage = document.getElementById('stage')!;
const fileName = document.getElementById('file-name')!;
const source = document.getElementById('source')!;
const figureButton = document.getElementById('btn-figure')!;
const colorButton = document.getElementById('btn-color')!;

let currentFigure: Figure = 'Triangle';
let currentColor: Colors = 'red';

function show(mode: Mode): void {
  // A fresh canvas gives a fresh WebGL context, so no state leaks between versions.
  const canvas = document.createElement('canvas');
  stage.replaceChildren(canvas);
  examples[mode].run({canvas, color: currentColor, figure: currentFigure});

  fileName.textContent = examples[mode].file;
  source.textContent = examples[mode].source;
  history.replaceState(null, '', `#${mode}`);
}

const current = (): Mode => {return 'ff'};

colorButton.addEventListener('click', () => {
  const nextColor = currentColor === 'red' ? 'green' : currentColor === 'green' ? 'blue' : 'red';
  currentColor = nextColor;
  colorButton.textContent = currentColor;
  show(current());
});
figureButton.addEventListener('click', () => {
  const nextIndex = (figures.indexOf(currentFigure) + 1) % figures.length;
  currentFigure = figures[nextIndex];
  figureButton.textContent = currentFigure;
  show(current());
});

show(current());
