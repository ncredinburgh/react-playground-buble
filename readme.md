# React Buble Playgrounds

Docs: https://ncredinburgh.github.io/react-playground-buble/

This [Lerna](https://lernajs.io/) repo contains npm packages used to render live evaluation code
playgrounds that use buble to transpile JSX and ES2015. It is lighter weight
than playgrounds that use Babel for transpilation.

* `react-playground-bare`: Helper tool for making playgrounds does not contains
a code editor
* `react-playground-lite`: Playground styled with inline styles and CSS it uses
CodeMirror as a code editor
* `react-playground-styled`: Playground styled using `styled-components` with
CodeMirror as a code editor

For more details see individual projects in the packages folder.

## Install

```bash
npm install -g lerna@2.0.0-beta.32
```

Clone the repo and cd into the project folder then run:

```bash
npm install
lerna bootstrap
```

You can then see examples:

```bash
cd packages/react-playground-lite
npm start
```

Then visit http://localhost:3000/examples

## Thanks

This component was developed at [NCR Edinburgh](http://ncredinburgh.com).

## License

MIT
