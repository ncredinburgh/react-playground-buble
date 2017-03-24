# React Playground Bare

This component renders JSX in a code editor to be live evaluated in a viewer
component. The bare component is a helper for constructing playgrounds. It
provides it tacks in JSX and then provides functionality needed to render
errors, code editors and rendered views (without specify which components should
be used for editors etc).  

## Install

```bash
npm install --save react-playgrond-styled
```

## Usage

```javascript
<ReactPlaygroundBare
  defaultValue={'<button>click</button>'}
>
  {
    ({
      defaultValue,
      onChange,
      errorMessage,
      evalChild,
      onViewerMount
    }) => {
      return (
        <div>
          <pre>{errorMessage}</pre>
          <textarea {...{
            defaultValue,
            style: {width: 300, height: 100},
            onChange: e => onChange(e.target.value),
          }} />
          <div ref={onViewerMount} />
        </div>
      )
    }
  }
</ReactPlaygroundBare>
```

Will render a code editor as text area with the content `<button>click</button>`
and a DOM button will appear in a div while any errors will be rendered in pre
element.

## Thanks

This component was developed at [NCR Edinburgh](http://ncrediburgh.com).
