# Leapfrog UI

This repo explores packaging Leapfrog so that it can easily be adopted into new projects incrementally. With no dependency on CSS and as few JS dependencies as possible. It features:

* Documentation with live code evaluation and hot loading
* Themable CSS in JS
* Lerna mono repo to allow easy development of related packages
* Tree shaking friendly a packages for fast loading apps
* Optimized SVG icons

## Installation

```bash
git clone git@gitlab.dev1.diginsite.net:philholden/leapfrog-ui.git
npm install -g lerna@2.0.0-beta.32
lerna bootstrap
```

You may also need to run `npm install` if this did not happen with bootstrap:

```bash
cd packages/di-ui-styled
npm style
```

You should now be able to see the style guide by visiting:

http://localhost:3000/examples

You should also be able to test on your phone on the local network using your IP in place of `localhost`
