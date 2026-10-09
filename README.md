-- Práctica 12A - Hola React

1. Compilador (SWC)
   Ocurre porque SWC, sin configuración, trata el archivo como JavaScript normal y no reconoce la sintaxis de JSX.

   Salida en modo clásico: ver evidencias/swc-clasico.png
   Salida en modo automático: ver evidencias/swc-automatico.png

- ¿En qué se convirtió cada etiqueta del JSX?
 Cada etiqueta se convirtió en una llamada a función que crea un elemento:

 - Modo clásico: `<div>`, `<h1>` y `<p>` se convirtieron en llamadas a
  `React.createElement("div", { className: "tarjeta" }, ...)`,
- Modo automático: las etiquetas se convirtieron en `_jsx(...)`, o en `_jsxs(...)`
  cuando el elemento tiene varios hijos. Los hijos ya no van como argumentos sino
  dentro de la propiedad `children`. Además, el compilador agrega solo
  `import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime"`, así que ya no
  hace falta importar React en el archivo.

Si React es "sólo una biblioteca", ¿quién traduce el JSX?
Lo traduce el compilador (SWC, Babel o esbuild, que es el que se integra en la
herramienta de construcción como Vite). React no entiende JSX: solo recibe las
llamadas a funciones que el compilador generó.


2. Proyecto con Vite
   El contenedor vacío es `<div id="root"></div>` en `index.html`. Lo llena React
desde `src/main.tsx`, mediante `createRoot(...).render(...)`.

3. "Hola mundo" sin JSX
   Evidencia: `evidencias/hola-mundo-sin-jsx.png`

   - ¿Qué hace createRoot y qué hace render?
  
- `createRoot` crea una raíz de React enlazada a un nodo del DOM (en este caso
  `#root`). Es el punto de conexión entre React y la página.
- `render` le indica a esa raíz qué elementos de React debe dibujar. React los
  convierte en nodos reales del DOM dentro del contenedor y los mantiene
  actualizados.


4. El primer componente

   - ¿Por qué el nombre de un componente empieza con mayúscula?
     Porque JSX usa la mayúscula para distinguir entre elementos HTML y componentes.
Una etiqueta en minúscula (`<saludo>`) se interpreta como un elemento HTML y se
compila como el texto `"saludo"`. Una etiqueta en mayúscula (`<Saludo>`) se
interpreta como una variable que apunta a un componente y se compila como
`createElement(Saludo)`. Si el componente empezara en minúscula, React buscaría
una etiqueta HTML con ese nombre y no encontraría el componente.

5. Componentes dentro de componentes

   Evidencia: `evidencias/tres-tarjetas.png`

   - ¿Cuál es la diferencia entre escribir semestre="8" y semestre={8}?

- `semestre="8"` pasa un **string** (el texto "8").
- `semestre={8}` pasa un **número**, porque las llaves evalúan una expresión de
  JavaScript.

Como la prop `semestre` está tipada como `number`, TypeScript marca error con
`"8"`. Además, comparar un texto con `>= 7` es propenso a fallos, y el número sí
permite operaciones aritméticas y comparaciones correctas.


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
