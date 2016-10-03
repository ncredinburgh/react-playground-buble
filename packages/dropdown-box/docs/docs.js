// docs.jsx

import React from "react";
import ReactDOM from "react-dom";
import Ecology from "ecology";
import * as docgen from "react-docgen";
import { StyleRoot, Style } from "radium";

import DropdownBox from "../src/index";
import { VictoryTheme } from 'formidable-landers'

const DiTheme = {
  ...VictoryTheme,
  body: {
    background: 'transparent',
    fontFamily: 'sans-serif',
    lineHeight: 1.4,
    color: '#333',
  },
  '.Interactive': {
    background: '#f7f7f7',
  },
  h1: {
    fontFamily: 'sans-serif',
    color: '#333',
  },
  h3: {
    fontFamily: 'sans-serif',
    color: '#333',
  },
  h2: {
    fontFamily: 'sans-serif',
    color: '#333',
  },
  '.Ecology code': {
    ...VictoryTheme['.Ecology code'],
    background: '#f7f7f7',
  },
  '.Interactive .playgroundStage': {
    ...VictoryTheme['.Interactive .playgroundStage'],
    boxSizing: 'border-box',
    overflow: 'auto',
    resize: 'both',
  },
  '.Interactive .playgroundPreview': {
    ...VictoryTheme['.Interactive .playgroundPreview'],
    padding: '30px',
    flex: '0 1 50%',
    'box-sizing': 'border-box',
    overflow: 'auto',
  },
  // '@media only screen and (min-width: 650px)': {
  //   '.Interactive .playgroundPreview': {
  //     ...VictoryTheme['@media only screen and (min-width: 650px)'],
  //     flex: '0 1 50%',
  //   },
  // },
}

console.log(DiTheme)

const mapFlowTypes = (doc) => {
  Object.keys(doc.props).forEach(key => {
    if (!doc.props[key].type && doc.props[key].flowType) {
      doc.props[key].type = doc.props[key].flowType
    }
  })
  return doc
}

class Docs extends React.Component {
  render() {
    return (
      <StyleRoot>
      <div className="demo">
        <Ecology
          // This loads up your markdown documentation.
          overview={require("!!raw!./ecology.md")}

          // This loads up your component source so Ecology can inject the `propType` table.
          source={mapFlowTypes(docgen.parse(require("!!raw!../src/index")))}

          // The `scope` prop is used by Component Playground to render live code snippets.
          // It needs React, ReactDOM, and your component.
          // See https://github.com/FormidableLabs/component-playground#scope
          scope={{ React, ReactDOM, DropdownBox }}
          playgroundtheme="blackboard"
        />
      </div>
      <Style rules={DiTheme} />
      </StyleRoot>
    );
  }
}

ReactDOM.render(<Docs/>, document.getElementById("content"));
