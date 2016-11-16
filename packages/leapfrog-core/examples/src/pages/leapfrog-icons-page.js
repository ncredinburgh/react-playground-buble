import React from 'react'
import Title from '../components/title'
import { PageHeader } from '../../../src'
import * as icons from '@di/leapfrog-icons'
import styled, { keyframes } from 'styled-components'

import Playground from '../components/themed-playground'

const iconsToPlayground = icons => iconName => (
  <Playground
    key={iconName}
    defaultValue={
`<${iconName} />`
    }
    scope={{ [iconName]: icons[iconName] }}
  />
)

const IconsPage = () => (
  <div>
    <Title>Icons</Title>
    <p>By default most icons render in the current color with a height of 18px:</p>
    <Playground
      defaultValue={
  `<Accounts />`
      }
      scope={{ Accounts : icons.Accounts }}
    />
    <p>Current color is the CSS `color` of the containing element:</p>
    <Playground
      defaultValue={
`<div style={{color: '#ccc'}}>
  <Accounts />
</div>`
      }
      scope={{ Accounts : icons.Accounts }}
    />
    <p>However all props are spread onto the svg element:</p>
    <Playground
      defaultValue={
  `<Accounts
    fill="#ccc"
    height="36"
    style={{padding: 10, border: '2px solid #ccc'}}
  />`
      }
      scope={{ Accounts : icons.Accounts }}
    />
    <p>For hover effects use `styled-components`:</p>
    <Playground
      defaultValue={
`const AccountsHoverable = styled(Accounts)\`
transition: 0.3s;
cursor: pointer;
&:hover {
  color: #ccc;
  transform: scale(2);
}\`;

<AccountsHoverable />`
}
      scope={{ Accounts : icons.Accounts, styled }}
    />
    <p>`top` is CSS top with relative position and can be used to center an
       inline icon (note this will break if the `fontSize` changes):</p>
    <Playground
      defaultValue={
`<div>
  My Accounts: <Accounts/><br />
  My Accounts: <Accounts top={3} /><br />
</div>`
      }
      scope={{ Accounts : icons.Accounts, styled }}
    />
    <p>`block` is shorthand for display block and is helpful for centering with
       flexbox (note this will not break if the `fontSize` changes):</p>
    <Playground
      defaultValue={
`<div style={{display: 'flex', alignItems: 'center'}}>
  <div style={{paddingRight: 5}}>My Accounts:</div>
  <Accounts block/>
</div>`
      }
      scope={{ Accounts : icons.Accounts, styled }}
    />
    <p>All icons:</p>
    {
      Object
        .keys(icons)
        .map(iconsToPlayground(icons))
    }
  </div>
)

export default IconsPage
