import React from 'react'
import Title from '../components/title'
import { Caret, PageHeader } from '../../../src'
import styled from 'styled-components'

import Playground from '../components/themed-playground'

const Wrapper = styled.div`
  line-height: 1.6em;
`

const PageHeaderPage = () => (
  <Wrapper>
    <Title>Intoduction</Title>
    <p>PoC for responsive UI and UI documentation with the following aims:</p>
    <ul>
      <li>Isolate styles in the components that use them:
        <ul>
          <li>CSS of any unused components is not included in page</li>
          <li>Deprecate old components when introducing new ones</li>
          <li>Projects can upgrade components at their own pace</li>
          <li>Does not force site wide upgrade of components because of global CSS changes</li>
          <li>Global CSS changes could be impossible to manage across many projects</li>
          <li>No need to worry about breaking other components when tweaking CSS</li>
          <li>Supports:
            <ul>
              <li>Continuous delivery</li>
              <li>A/B user testing</li>
            </ul>
          </li>
        </ul>
      </li>
      <li>Documentation with playgrounds that show common use cases</li>
      <li>Use npm to version components</li>
      <li>Few external dependencies:
        <ul>
          <li>No flux, just state</li>
          <li>No Moment JS</li>
          <li>No Immutable</li>
        </ul>
      </li>
      <li>User delight
        <ul>
          <li>Accurate rendering of component specification</li>
          <li>Introduce animation</li>
          <li>Make animations smooth on mobile</li>
          <li>Add keyboard shortcuts</li>
        </ul>
      </li>
      <li>Realtime themes</li>
      <li>Prioritise mobile over legacy browsers
        <ul>
          <li>Embrace flexbox over floats for layout</li>
          <li>Switch to alternative components for IE9 and IE10</li>
        </ul>
      </li>
    </ul>
    <h2>Status</h2>
    <p>
      <ul>
        <li>Chrome & Firefox - Good</li>
        <li>Safari
          <ul>
            <li>Loader does not animate</li>
          </ul>
        </li>
        <li>IE11
          <ul>
            <li>Icons must be placed in a wrapper div to render</li>
            <li>Loader does not animate</li>
          </ul>
        </li>
        <li>IE9 and IE10<ul>
          <li>Support possible via component switching</li>
          <li>Tested component switching on ToggleSwitch using table-cell rather than flexbox</li>
          <li>IE9 and IE10 probably not worth developing further, because obsolete by delivery time</li>
          <li>Could be done if needed</li>
        </ul>
        </li>
      </ul>
    </p>
  </Wrapper>
)

export default PageHeaderPage
