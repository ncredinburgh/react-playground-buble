// @flow
// setTimeout(() => document.body.scrollTop = 0, 2000)
import React from 'react'
import {
  ReactPlaygroundStyled as Playground,
  ThemeBroadcast,
  ThemeChooserProvider,
} from '../../../src'
import styled, { withTheme, ThemeProvider } from 'styled-components'
import phone from '../../img/phone.png'
import ncr from '../../img/ncr.jpg'

const themeNames = [
  '3024-day',
  '3024-night',
  //  'abcdef',
  'ambiance',
  'base16-dark',
  'base16-light',
  //  'bespin',
  'blackboard',
  'cobalt',
  'colorforth',
  //  'dracula',
  //  'duotone-dark',
  'duotone-light',
  'eclipse',
  'elegant',
  'erlang-dark',
  //  'hopscotch',
  //  'icecoder',
  //  'isotope',
  'lesser-dark',
  //  'liquibyte',
  //  'material',
  'mbo',
  'mdn-like',
  'midnight',
  'monokai',
  'neat',
  'neo',
  'night',
  //  'panda-syntax',
  'paraiso-dark',
  'paraiso-light',
  'pastel-on-dark',
  //  'railscasts',
  'rubyblue',
  //  'seti',
  //  'solarized dark',
  //  'solarized light',
  'the-matrix',
  'tomorrow-night-bright',
  'tomorrow-night-eighties',
  //  'ttcn',
  'twilight',
  'vibrant-ink',
  'xq-dark',
  'xq-light',
  //  'yeti',
  'zenburn',
]
const Text = styled.div`
  max-width: 35em;
  margin: 0 auto;
  padding: 0 15px;
  line-height: 1.5;
  color: #333;
  font-size: 18px;
  font-family: Georgia, Cambria, "Times New Roman", Times, serif;
  em {
    font-family: consolas, monospace;
    color: #777;
  }
  h1, h2, h3 {
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;
  }
  h1 {
    font-size: 32px;
  }
  h2 {
    font-size: 28px;
  }


  @media (min-width: 600px) {
    padding: 0 20px;
    font-size: 19px;
    h1 {
      font-size: 40px;
    }
    h2 {
      font-size: 32px;
    }
  }
  a {
    color: #333;
  }
`

const PhoneImg = styled.img`
  max-width: 240px;
  border-top: 1px solid #d5d5d8;
  border-left: 1px solid #d5d5d8;
  border-right: 1px solid #d5d5d8;
  box-shadow: 0 0 30px rgba(0,0,0,0.1);
`

const PhoneWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;
  background: #fafafa;
  padding-top: 20px;
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
  <Playground
    editorBorder="none"
    backgroundColor="#bbb"
    scope={{ ...scope }}
    {...props}
  />
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
      <div style={{ float: 'right' }}>
        <a
          className="github-button"
          href="https://github.com/ncredinburgh/react-playground-buble"
          data-icon="octicon-star"
          data-show-count="true"
          aria-label="Star ntkme/github-buttons on GitHub"
        >
          Star
        </a>
      </div>
      <h1>React Playground Styled</h1>
      <p>
        This is a playground styled with
        {' '}
        <em>
          <a href="https://styled-components.com/" target="_blank">
            styled-components
          </a>
        </em>.
        {' '}
        It enables you to create
        {' '}
        <a href="#custom">custom playgrounds</a>
        {' '}
        to meet your exact needs. It allows
        {' '}
        <em>context</em>
        {' '}
        based
        {' '}
        <em>theme</em>s
        {' '}
        from
        {' '}
        <em>styled-components</em>
        {' '}
        to penetrate into playgrounds so you can
        create <a href="#themable">themable living component guides</a>.
      </p>
      <p>
        It is designed to be as small as possible so it does not break the flow of your docs.
        It is responsive and supports hot loading so it can be used to test components performance on mobile while you develop:
      </p>
      <PhoneWrapper>
        <PhoneImg src={phone} width="240" />
      </PhoneWrapper>
      <h2>Install</h2>
      <em>npm install --save react-playground-styled</em><br />
      <em>import ReactPlaygroundStyled from 'react-playground-styled'</em>

      <p>
        The viewer (left) will evalute the last expression in the editor (right) and if it is a React element
        it will be rendered into the viewer:
      </p>
    </Text>
    <OuterPlayground defaultValue={defaultJsx} />
    <Text>
      <p>
        I appologise if this is a bit
        meta, but I am going to be using the playground to document itself hence you may see a
        playground within a playground for most examples. You will see the inner playground has a different style to the outer one (I will show you how to achieve this
        {' '}
        <a href="#themable">later</a>
        ). The code for the playground is set by putting it in the
        {' '}
        <em>defaultValue</em>
        {' '}
        prop:
      </p>
    </Text>
    <OuterPlayground
      defaultValue={`// import ReactPlaygroundStyled from 'react-playground-styled'

<ReactPlaygroundStyled
  defaultValue={'<button>Hello</button>'}
/>`}
      scope={{ ReactPlaygroundStyled }}
    />

    <Text>
      <p>
        You pass in components, functions and variables as an
        {' '}
        <em>Object</em> (map)
        {' '}
        in the
        {' '}
        <em>scope</em>
        {' '}
        prop (often these will be imported from the package you are documenting). Remember it accepts an
        {' '}
        <em>Object</em>
        {' '}
        (not a single component)
        where each value is a function, value or component.
      </p>

      <p>
        <strong>NOTE:</strong> The semicolon
        on the last line before the JSX that is rendered. As a rule of thumb
        make sure the last non-whitespace character before the evaluated JSX
        is either a semicolon
        {' '}
        <em>';'</em>
        {' '}
        or a closing curly
        {' '}
        <em>'}'</em> (this causes most of my errors):
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
        One of the goals of this playground is to be light weight, for this reason we use
        {' '}
        <a href="https://gitlab.com/Rich-Harris/buble">Bublé</a>
        {' '}
        rather than Babel. This makes bundle downloads on the browser a few megabytes smaller:
      </p>
    </Text>

    <Text>
      <h2>Editor Settings</h2>
      <p>
        Another goal is to use minimal screen space to document a component.
        Because horizontal space is at such a high premium I have taken the
        unusual decision to use a proportional font by default. I found this to be less
        evil than all the line wrapping I encountered with monospace fonts. You
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
        You can load fonts from
        {' '}
        <a href="https://fonts.google.com">Google Fonts</a>
        {' '}
        and change the
        {' '}
        <em>editorFontSize</em>
        :
      </p>
    </Text>
    <OuterPlayground
      scope={{ ReactPlaygroundStyled }}
      defaultValue={`<ReactPlaygroundStyled
  editorFontSize="18px"
  googleFont="Indie Flower"
  font={'Indie Flower, monospace'}
  defaultValue={'<button>Hello</button>'}
/>`}
    />
    <Text>
      <p>
        <em>loadTheme</em>
        {' '}
        to loads CodeMirror CSS themes from a CDN. There is a list of themes in the
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
  loadTheme="monokai"
  defaultValue={
\`const a = 1;
let b = [1,2,3];

<textarea
  readOnly
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
      <ol>
        <li>
          Props for common requirements e.g. alignment, padding, gutters
        </li>
        <li>Injecting or modifing wrappers for unlimited flexibility</li>
      </ol>
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
        If you do not want the outer margin on the non-adjcent edges you may want to add negative
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
        such as dropdown lists it might be important to force a certain minimum height
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
        Many compents use <em>flex-box</em> for layout this means they may
        expect to be rendered into a parent with display set to <em>flex</em>.
        So it is important to be able to control the context components are
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
      <p>
        Use
        {' '}
        <em>fullWidth</em>
        {' '}
        if you want a component to fill the width of the viewer rather than being centered.
      </p>
    </Text>
    <OuterPlayground
      defaultValue={`<ReactPlaygroundStyled
  defaultValue={\`<h3
  style={{borderBottom: '1px solid'}}
>
  Full Width
</h3>\`}
  minHeightViewer={110}
  fullWidth
/>`}
      scope={{ ReactPlaygroundStyled }}
    />
    <Text>
      <h2 id="themable">Themes from Styled-Components</h2>
      <p>
        The <em>ThemeBroadcast</em> class
        {' '}
        can be used to pass
        {' '}
        <em>styled-components</em>'
        {' '}
        themes to new React roots e.g.
        modals, portals or playgrounds. Setting the <em>themeBroadcast</em> prop
        to an instance of <em>ThemeBroadcast</em> will provide the
        theme on the context to the React root in the viewer:
      </p>
    </Text>
    <OuterPlayground
      defaultValue={`// import {ThemeBroadcast} from 'react-playground-styled'

const themeBroadcast = new ThemeBroadcast({
  color: 'green'
})

const setColor = color => () => themeBroadcast.broadcast({
  color: color
});

const H3 = styled.h3\`color: \${({theme}) => theme.color};\`;
const Button = styled.button\`color: \${({theme}) => theme.color};\`;

<div>
  <p>Click link to change theme:</p>
  <button onClick={setColor('green')}>green</button>{' '}
  <button onClick={setColor('pink')}>pink</button><p/>
  <ReactPlaygroundStyled
    defaultValue={\`<Button>hello</Button>\`}
    scope={{Button}}
    themeBroadcast ={themeBroadcast}
  />
  <p />
  <ReactPlaygroundStyled
    defaultValue={\`<H3>hello</H3>\`}
    scope={{H3}}
    themeBroadcast ={themeBroadcast}
  />
</div>`}
      scope={{
        ReactPlaygroundStyled,
        withTheme,
        ThemeBroadcast,
        styled,
        ThemeChooserProvider,
      }}
    />
    <Text>
      <h2>Wrappers</h2>
      <p>
        There are wrappers components around the editor, the viewer and the whole playground.
        This allows you to set augment styles on the wrapper (via
        {' '}
        <em>styled-components</em>
        ), replace the default wrapper or add additional wrappers. Wrapper props
        are callbacks which accept the default wrapper component as an argument and return a new or changed wrapper.
        We provide the following wrappers:
      </p>
      <ul>
        <li>playgroundWrapper</li>
        <li>editorWrapper</li>
        <li>viewerWrapper (outer)</li>
        <li>viewerAlign (inner)</li>
        <li>errorWrapper</li>
        <li>EvalWrapper (NOTE: component not callback)</li>
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
      <p>
        Provide alternative wrapper:
      </p>
    </Text>

    <OuterPlayground
      defaultValue={`<ReactPlaygroundStyled
  defaultValue={'<button>Hello</button>'}
  playgroundWrapper={
    () => ({children}) => <div children={children}/>
  }
  scope={{styled}}
/>`}
      scope={{ ReactPlaygroundStyled }}
    />
    <Text>
      <p>
        The
        {' '}
        <em>EvalWrapper</em>
        {' '}
        is different to the other wrappers. It should be
        a component or
        {' '}
        <em>null</em>
        {' '}
        rather than a function that returns a component.
        If
        {' '}
        <em>null</em>
        {' '}
        the content will be evaluated without a wrapper otherwise
        evaluated content will be passed as
        {' '}
        <em>children</em>
        {' '}
        to the
        {' '}
        <em>EvalWrapper</em>
        {' '}
        component. The
        {' '}
        <em>EvalWrapper</em>
        {' '}
        sits inside the new React root in the viewer.
        So it can be used for binding
        {' '}
        <em>context</em>
        {' '}
        to the outer root e.g. this is the long version of how to bind themes to the inner React root.
        :
      </p>
    </Text>

    <OuterPlayground
      defaultValue={`const themeBroadcast = new ThemeBroadcast({
  color: 'green'
})
const EvalWrapper = ({ children }) => (
  <ThemeChooserProvider
    themeBroadcast={themeBroadcast}
  >
    {children}
  </ThemeChooserProvider>
)
const ThemedPlayground = props => (
  <ReactPlaygroundStyled
    {...props}
    EvalWrapper={EvalWrapper}
  />
);

const setColor = color => () => themeBroadcast.broadcast({
  color: color
});

const H3 = styled.h3\`color: \${({theme}) => theme.color};\`;
const Button = styled.button\`color: \${({theme}) => theme.color};\`;

<div>
  <p>Click link to change theme:</p>
  <button onClick={setColor('green')}>green</button>{' '}
  <button onClick={setColor('pink')}>pink</button><p/>
  <ThemedPlayground
    defaultValue={\`<Button>hello</Button>\`}
    scope={{Button}}
  />
  <p />
  <ThemedPlayground
    defaultValue={\`<H3>hello</H3>\`}
    scope={{H3}}
  />
</div>`}
      scope={{
        ReactPlaygroundStyled,
        withTheme,
        ThemeBroadcast,
        styled,
        ThemeChooserProvider,
      }}
    />
    <Text>
      <h2 id="custom">Creating your own custom playground</h2>
      <p>
        There are many props for configuring appearance
        so in a style guide with lots of identical playgrounds
        you do not want to manually configure each one. You should
        create your own custom playground with presets that suit you e.g.
      </p>
      <ul>
        <li>borders</li>
        <li>padding</li>
        <li>wrappers</li>
        <li>themes</li>
        <li>background colors</li>
        <li>put things you will need on the <em>scope</em></li>
      </ul>
      <p>

        Export it from a module import it where needed and use it repeatedly:

      </p>
    </Text>
    <OuterPlayground
      defaultValue={`
// export this to control themes
const themeBroadcast = new ThemeBroadcast({
  color: 'brown'
})

// import * from lib
const lib = {
  add: (a, b) => a + b,
  minus: (a, b) => a - b,
  H3: styled.h3\`color: \${({theme}) => theme.color};\`,
  Button: styled.button\`color: \${({theme}) => theme.color};\`
}

// export default
const MyPlayground = props => {
  // const { scope, ...rest } = props
  // no object spread in Buble
  const rest = {...props}
  const { scope } = props
  delete(rest.scope)
  return (
    <ReactPlaygroundStyled
      scope={{...lib, ...scope}}
      themeBroadcast={themeBroadcast}
      loadTheme="cobalt"
      font="consolas, monospace"
      backgroundColor="orange"
      playgroundWrapper={
        Wrapper => styled(Wrapper)\`
          flex-direction: row-reverse;
          margin-bottom: 20px;
          border-radius: 5px;
          overflow: hidden;\`
      }
      {...rest}
    />
  )
};

// import MyPlayground from 'my-playground'

<div>
  <MyPlayground defaultValue={\`<Button>hello</Button>\`}/>
  <MyPlayground defaultValue={\`<H3>hello</H3>\`}/>
  <MyPlayground defaultValue={\`<em>{add(2,2)}</em>\`}/>
  <MyPlayground defaultValue={\`<em>{minus(5,2)}</em>\`}/>
</div>`}
      scope={{
        ReactPlaygroundStyled,
        withTheme,
        ThemeBroadcast,
        styled,
        ThemeChooserProvider,
      }}
    />
    <Text>

      <h2>Thanks</h2>
      <div style={{ display: 'flex' }}>

        <p>
          <em>react-playground-styled</em>
          {' '}
          was written at
          {' '}
          <a href="http://www.ncredinburgh.com" target="_blank">
            NCR Edinburgh
          </a>
          {' '}
          thanks for letting me open source it. Inspirtation was taken from
          {' '}
          <em>
            <a href="https://github.com/FormidableLabs/component-playground">
              component-playground
            </a>
          </em>
          {' '}
          from
          {' '}
          <a href="https://formidable.com/" target="_blank">
            Formidable Labs
          </a>
          .
        </p>
        <a href="http://www.ncredinburgh.com" target="_blank">
          <img src={ncr} width={128} style={{ marginLeft: 20 }} />
        </a>
      </div>
      <p />
    </Text>
  </div>
)

export default App
