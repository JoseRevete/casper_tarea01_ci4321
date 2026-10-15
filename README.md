# RGB Figures

An interactive WebGL2 demo rendering geometric figures (Triangle, Square, Hexagon, Circle) in primary RGB colors (red, blue, green).

- `src/examples/figures.ff.ts` uses the FixedFunction (FF) module. The shaders stay hidden.

## Requirements

- Node.js 18 or later (tested with Node 24)
- npm
- A browser with WebGL2 support

## Run

1. Install the dependencies. This is the only step that needs a network connection.

   ```
   npm install
   ```

2. Start the development server.

   ```
   npm run dev
   ```

3. Open `http://localhost:5173` in your browser.

## Use

- Click the figure selector button (Triangle | Square | Hexagon | Circle) to switch shapes.
- Click the color selector button (red | blue | green) to switch colors.
- The right panel shows the source file of the active version.

## Other commands

| Command           | Action                                          |
| ----------------- | ----------------------------------------------- |
| `npm run build`   | Type-check with `tsc` and build to `dist/`      |
| `npm run preview` | Serve the built `dist/` folder locally          |

## Project layout

```
index.html                 page markup
src/main.ts                toggle, canvas swap, source panel
src/examples/shared.ts     Logic for vertex data and color management
src/examples/figures.ff.ts  FixedFunction implementation
src/vendor/ff/             FF v1.0 (read only; do not edit)
```

## Troubleshooting

- **Blank page or "WebGL2 is not available."** Enable hardware acceleration in the browser, or try another browser.
- **Port 5173 is in use.** Stop the other process, or run `npx vite --port 3000`.
