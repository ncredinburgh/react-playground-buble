import React from 'react'
import Title from '../components/title'
import { Caret, PageHeader, H2 } from '../../../src'
import styled from 'styled-components'

import Playground from '../components/themed-playground'

import DocPage from '../components/doc-page'

const PageHeaderPage = () => (
  <DocPage>
    <Title>Intoduction</Title>
    <p>PoC responsive UI and UI documentation</p>
    <H2>Installation</H2>
    <p>In an npm project create a file called <code>.npmrc</code> with the following contents:</p>
    <pre>
      @di-internal:registry = http://anprd10d2dge140.dca.diginsite.net:8080/repository/npm-internal
    </pre>
    <p>To install connect to the VPN and type:</p>
    <pre>
      npm install --save @di-internal/di-ui-styled @di-internal/di-ui-icon-elements
    </pre>
    <p>The <a href="http://apdev10cmage001.dca.diginsite.net/philholden/leapfrog-ui/">repository</a> may be cloned from GitLab</p>
    <H2>Aims</H2>
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

  </DocPage>
)

export default PageHeaderPage
