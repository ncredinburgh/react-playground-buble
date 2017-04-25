// @flow

import React from 'react'
import { ReactPlaygroundStyled as Playground } from '../../../src'
import styled from 'styled-components'
const themeNames = [
  '3024-day',
  '3024-night',
  'abcdef',
  'ambiance',
  'base16-dark',
  'base16-light',
  'bespin',
  'blackboard',
  'cobalt',
  'colorforth',
  'dracula',
  'duotone-dark',
  'duotone-light',
  'eclipse',
  'elegant',
  'erlang-dark',
  'hopscotch',
  'icecoder',
  'isotope',
  'lesser-dark',
  'liquibyte',
  'material',
  'mbo',
  'mdn-like',
  'midnight',
  'monokai',
  'neat',
  'neo',
  'night',
  'panda-syntax',
  'paraiso-dark',
  'paraiso-light',
  'pastel-on-dark',
  'railscasts',
  'rubyblue',
  'seti',
  'solarized dark',
  'solarized light',
  'the-matrix',
  'tomorrow-night-bright',
  'tomorrow-night-eighties',
  'ttcn',
  'twilight',
  'vibrant-ink',
  'xq-dark',
  'xq-light',
  'yeti',
  'zenburn',
]
const Text = styled.div`
  max-width: 35em;
  margin: 0 auto;
  padding: 0 20px;
  line-height: 1.5;
`

const OuterPlayground = ({ scope, ...props }) => (
  <Playground
    backgroundColor="#eee"
    scope={{ styled, ...scope }}
    fullWidth
    {...props}
  />
)

const ReactPlaygroundStyled = ({ scope, ...props }) => (
  <Playground backgroundColor="#bbb" scope={{ ...scope }} {...props} />
)

const defaultJsx = `<div className="Edit">
  <button>Hello</button>
</div>`

const defaultClass = `class MyComponent extends React.Component {
  render() {
    return (
      <div className="Edit">
        <button>Hello</button>
      </div>
    )
  }
}

ReactDOM.render(<MyComponent />, mountNode)`

const evalToJsx = `class MyComponent extends Component {
  render() {
    return (
      <div className="Edit">
        <button>Hello</button>
      </div>
    )
  }
}

<MyComponent />`

const App = () => (
  <div>
    <Text>
      <h1>React Playground Styled</h1>
      <p>
        This is a playground styled with
        {' '}
        <em>styled-components</em>
        {' '}
        it allows
        binding themes from the outer page. It was made to enable the creation
        of themable living component guides. The editor will evalute the last expression and if it is a React element
        it will be rendered in the viewer:
      </p>
    </Text>
    <OuterPlayground defaultValue={defaultJsx} />
    <Text>
      <p>
        I appologise if this is a bit
        meta, but I am going to be using the playground to document itself hence you may see a
        playground within a playground for most examples. You set the code for
        the playground by putting it in the <em>defaultValue</em> prop:
      </p>
    </Text>
    <OuterPlayground
      defaultValue={`<ReactPlaygroundStyled
    defaultValue={'<button>Hello</button>'}
  />`}
      scope={{ ReactPlaygroundStyled }}
    />

    <Text>
      <p>
        You pass in components, functions and variables via the
        {' '}
        <em>scope</em>
        {' '}
        prop. Often these will be imports. Remember it accepts an
        {' '}
        <em>Object</em>
        {' '}
        and also note the semicolon
        on the last line before the JSX that is rendered. As a rule of thumb
        make sure the last non-whitespace character before the evaluated JSX
        is either a semicolon
        {' '}
        <em>';'</em>
        {' '}
        or a closing curly bracket
        {' '}
        <em>'}'</em>:
      </p>
    </Text>

    <OuterPlayground
      defaultValue={`const onClick = () => alert('hello')
const HelloWorld = () => (
  <strong onClick={onClick}>Hello World!!</strong>
);

<ReactPlaygroundStyled
  defaultValue={'<HelloWorld onClick={onClick} />'}
  scope={{onClick, HelloWorld}}
/>`}
      scope={{ ReactPlaygroundStyled }}
    />

    <Text>
      <p>
        One of the goals of this playgrond is to be light weight for this reason we use
        {' '}
        <a href="https://gitlab.com/Rich-Harris/buble">Bublé</a>
        {' '}
        rather than Babel this makes bundle downloads on the browser a few megabytes smaller:
      </p>
    </Text>

    <Text>
      <h2>Editor Settings</h2>
      <p>
        Another goal is to use minimal screen space to document a component.
        Because horizontal space is at such a high premium I have taken the
        unusual decision to use a proportional font. I found this to be less
        evil than all line wrapping I encountered with monospace fonts. You
        can change the font with the <em>font</em> property:
      </p>
    </Text>
    <OuterPlayground
      scope={{ ReactPlaygroundStyled }}
      defaultValue={`<ReactPlaygroundStyled
  font={'consolas, monospace'}
  defaultValue={'<button>Hello</button>'}
/>`}
    />
    <Text>
      <p>
        You can also use
        {' '}
        <em>loadTheme</em>
        {' '}
        to load CodeMirror CSS themes from a CDN. There is a list of themes in the
        {' '}
        <em>textarea</em>
        {' '}
        below. Try pasting them into the <em>loadTheme</em> prop on the right:
      </p>
    </Text>
    <OuterPlayground
      scope={{ ReactPlaygroundStyled, themeNames }}
      defaultValue={`<ReactPlaygroundStyled
  scope={{ themeNames }}
  loadTheme={'monokai'}
  defaultValue={
\`const a = 1;
let b = [1,2,3];

<textarea
  value={themeNames.join(\'\\\\n\')}
  rows={15}
/>\`}
/>`}
    />
    <Text>
      <p>
        The final aim of this library is to deliver complete customisation of
        each component within the playground. This is done by:
      </p>
      <ul>
        <li>
          Props for common requirements e.g. alignment, padding, gutters
        </li>
        <li>Injecting or modifing wrappers for unlimited flexibility</li>
      </ul>
      <h3>Props</h3>
      <p>
        <em>gutter</em> puts a margin around both the viewer and the editor
        giving the appearance of a gutter between the two:
      </p>
    </Text>

    <OuterPlayground
      defaultValue={`<ReactPlaygroundStyled
  defaultValue={'<button>Hello</button>'}
  gutter={4}
/>`}
      scope={{ ReactPlaygroundStyled }}
    />
    <Text>
      <p>
        If you do not want the outer margin on the non adjcent edges you may want to add negative
        {' '}
        <em>margin</em>
        {' '}
        to a playground:
      </p>
    </Text>
    <OuterPlayground
      scope={{ styled }}
      defaultValue={`<ReactPlaygroundStyled
  defaultValue={'<button>Hello</button>'}
  gutter={4}
  margin={-4}
/>`}
      scope={{ ReactPlaygroundStyled }}
    />

    <Text>
      <p>
        <em>padding</em> affects both the editor and viewer:
      </p>
    </Text>
    <OuterPlayground
      defaultValue={`<ReactPlaygroundStyled
  defaultValue={'<button>Hello</button>'}
  padding={0}
/>`}
      scope={{ ReactPlaygroundStyled }}
    />
    <Text>
      <p>
        <em>minHeightViewer, minWidthViewer, minWidthEditor</em>. For components
        such as dropdown list it might be important to force a certain minimum height
        for the viewer:
      </p>
    </Text>

    <OuterPlayground
      defaultValue={`<ReactPlaygroundStyled
  defaultValue={'<button>Hello</button>'}
  minHeightViewer={110}
/>`}
      scope={{ ReactPlaygroundStyled }}
    />
    <Text>
      <p>
        Many compents use <em>flex-box</em> for styling this means they may
        expect to be rendered into a parent with display set to <em>flex</em>.
        So it is important to be able to control the context compnents are
        rendered into. Below some alignment props:
      </p>
      <p><em>left</em>:</p>
    </Text>

    <OuterPlayground
      defaultValue={`<ReactPlaygroundStyled
  defaultValue={'<button>Hello</button>'}
  minHeightViewer={110}
  left
/>`}
      scope={{ ReactPlaygroundStyled }}
    />

    <Text>
      <p><em>right</em>:</p>
    </Text>
    <OuterPlayground
      defaultValue={`<ReactPlaygroundStyled
  defaultValue={'<button>Hello</button>'}
  minHeightViewer={110}
  right
/>`}
      scope={{ ReactPlaygroundStyled }}
    />

    <Text>
      <p><em>top</em>:</p>
    </Text>
    <OuterPlayground
      defaultValue={`<ReactPlaygroundStyled
  defaultValue={'<button>Hello</button>'}
  minHeightViewer={110}
  top
/>`}
      scope={{ ReactPlaygroundStyled }}
    />

    <Text>
      <p><em>bottom</em>:</p>
    </Text>
    <OuterPlayground
      defaultValue={`<ReactPlaygroundStyled
  defaultValue={'<button>Hello</button>'}
  minHeightViewer={110}
  bottom
/>`}
      scope={{ ReactPlaygroundStyled }}
    />
    <Text>
      <p>Horizontal and vertical alignment can be used together.</p>
      <p><em>bottom right</em>:</p>
    </Text>
    <OuterPlayground
      defaultValue={`<ReactPlaygroundStyled
  defaultValue={'<button>Hello</button>'}
  minHeightViewer={110}
  bottom right
/>`}
      scope={{ ReactPlaygroundStyled }}
    />
    <Text>
      <h2>Wrappers</h2>
      <p>
        There are wrappers around the editor, the viewer and the whole playground.
        This allows you to set arbitrary styles, replace the default wrapper or add additional wrappers. Wrapper props
        are callbacks which accept the default wrapper component as an argument.
        We provide the following wrappers:
      </p>
      <ul>
        <li>playgroundWrapper</li>
        <li>editorWrapper</li>
        <li>viewerWrapper</li>
        <li>viewerAlign</li>
        <li>evalWrapper</li>
        <li>errorWrapper</li>
      </ul>

      <p>
        E.g. provide addition styles to a wrapper, forcing column layout and adding a border:
      </p>
    </Text>

    <OuterPlayground
      defaultValue={`<ReactPlaygroundStyled
  defaultValue={'<button>Hello</button>'}
  playgroundWrapper={
    Wrapper => styled(Wrapper)\`
      border: 10px solid #555;
      flex-direction: column-reverse;\`
  }
  scope={{styled}}
/>`}
      scope={{ ReactPlaygroundStyled }}
    />

    <Text>
      <p>Replace a wrapper by providing a new component:</p>
    </Text>

    <OuterPlayground
      defaultValue={`<ReactPlaygroundStyled
  defaultValue={'<button>Hello</button>'}
  viewerWrapper={
    Wrapper => props => (
      <div {...props} style={{
        border: '1px solid black'
      }}/>
    )
  }
  scope={{styled}}
/>`}
      scope={{ ReactPlaygroundStyled }}
    />

  </div>
)

export default App
