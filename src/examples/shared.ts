// Data shared by both implementations, so the two files differ only in how they drive WebGL.

/** Background color #1b1e2b as linear floats in [0, 1]. */
export const CLEAR_COLOR: readonly [number, number, number, number] = [0x1b / 255, 0x1e / 255, 0x2b / 255, 1];

/** Canvas size in device pixels. Fixed so both versions render the same pixels. */
export const CANVAS_SIZE = 480;

export const SEGMENTS = 64;

/** Interleaved vertex data: x, y, z, r, g, b, a per vertex. Clip space, counter-clockwise. */
const TRIANGLE = new Float32Array([
  //  x      y     z    r  g  b  a
   0.0,   0.7,  0.0,
  -0.7,  -0.6,  0.0,
   0.7,  -0.6,  0.0,
]);

const SQUARE = new Float32Array([
  -0.7,  0.7, 0,
   0.7,  0.7, 0,
   0.7, -0.7, 0,
  -0.7, -0.7, 0,
]);

export const squareIndices = new Uint16Array([
  0, 1, 2,
  0, 2, 3,
]);

export const STRIDE_BYTES = 3 * 4;//4 bytes per float (Float32)

export type Figure = 'Triangle' | 'Square' | 'Hexagon' | 'Circle';
export type Colors = 'red' | 'green' | 'blue';

function vertex(x: number, y: number, ): number[] {
  return [x, y, 0];
}

export function getFigureData({figure}: {figure: Figure}): Float32Array {
  if (figure === 'Triangle') {
    return Float32Array.from([
      TRIANGLE[0], TRIANGLE[1], TRIANGLE[2],
      TRIANGLE[3], TRIANGLE[4], TRIANGLE[5],
      TRIANGLE[6], TRIANGLE[7], TRIANGLE[8],
    ]);
  } else if (figure === 'Square') {
    return Float32Array.from([
      SQUARE[0], SQUARE[1], SQUARE[2],
      SQUARE[3], SQUARE[4], SQUARE[5],
      SQUARE[6], SQUARE[7], SQUARE[8],
      SQUARE[9], SQUARE[10], SQUARE[11],
    ]);
  }

  const sides = figure === 'Hexagon' ? 6 : SEGMENTS;
  const data: number[] = [];
  const radius = 0.7;
  data.push(...vertex(0, 0));

  for (let i = 0; i < sides; i += 1) {
    const angle = (i / sides) * Math.PI * 2;
    data.push(
      ...vertex(
        radius * (1 - Math.cos(angle)) - radius,
        radius * Math.sin(angle),
      ),
    );
  }

  return new Float32Array(data);
}

export function getFigureIndices(figure: Figure): Uint16Array {
  if (figure === 'Square') return squareIndices;

  const sides = figure === 'Hexagon' ? 6 : SEGMENTS;
  const indices: number[] = [];
  for (let i = 0; i < sides; i += 1) {
    const current = i + 1;
    const next = ((i + 1) % sides) + 1;
    indices.push(0, current, next);
  }

  return new Uint16Array(indices);
}
