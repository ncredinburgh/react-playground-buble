# React Playground Lite

This component renders JSX in a code editor to be live evaluated in a viewer
component. The lite component creates a playground with a code mirror editor
and is styled via CSS so does not have styled-components as a dependency.

## Install

```bash
npm install --save react-playgrond-styled
```

## Usage

```javascript
<ReactPlaygroundLite
  defaultValue={'<button>Click</button>'}
/>
```

Will render a code editor as text area with the content `<button>click</button>`
and a DOM button will appear in a div while any errors will be rendered in pre
element.

## Thanks

This component was developed at [NCR Edinburgh](http://ncrediburgh.com).
