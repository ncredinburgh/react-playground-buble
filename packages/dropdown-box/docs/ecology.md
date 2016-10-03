Interactive Docs for My Component
=================================

PlayGround
----------

A `playground` triple-backtick snippet will render your component for you. This is useful for quick interactive component demos without the need to add boilerplate.

```playground
<DropdownBox
  open
  onClickOutside={() => console.log(1)}
>
  Click outside once only to log
</DropdownBox>
```

NoRender Playground
-------------------

A `playground_norender` triple-backtick snippet will not do automatic rendering of your component; you have to manually call `ReactDom.render`. Useful for examples of using your component in context.

```playground_norender
class App extends React.Component{
  state = { open: true }
  setOpen = open => () =>
    this.setState({open})
  render() {
    const {open} = this.state
    return (
      <div>
        <div onClick={this.setOpen(true)}>
          click to open
        </div>
      	<DropdownBox
          open={open}
          onClickOutside={this.setOpen(false)}
        >
        Click out side to close
      	</DropdownBox>
      </div>
    )
  }
}

ReactDOM.render(<App/>, mountNode);
```

## Prop Types

Ecology will inject a `propTypes` table at the bottom of your component docs. This is generated from the component `propTypes` definition, and takes into account JSDoc style comments for each `propType`
