# React Playground styled

This component renders JSX in a code editor to be live evaluated in a viewer
component. This viewer is intended to be used with styled components as it
allows theme variables to propagate into the playground.

## Install

```bash
npm install --save react-playgrond-styled
```

## Usage

```javascript
<Playground
  defaultValue={'<button>click</button>'}
/>
```

Will render a code editor on the right with the content `<button>click</button>`
and a DOM button will appear on the left.

## Thanks

This component was developed at [NCR Edinburgh](http://ncrediburgh.com).
