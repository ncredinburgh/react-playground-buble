import React from 'react'
import Title from '../components/title'
import { Button, PageHeader } from '../../../src'
import styled from 'styled-components'

import Playground from '../components/themed-playground'

const ButtonPage = () => (
  <div>
    <Title>Button</Title>
    <p>`secondary` by default:</p>
    <Playground
      defaultValue={
`<Button>Click</Button>`
      }
      scope={{ Button, styled }}
    />

    <p>Can be `primary`:</p>
    <Playground
      defaultValue={
`<Button primary>Click</Button>`
      }
      scope={{ Button, styled }}
    />

    <p>Or `tertiary`:</p>
    <Playground
      defaultValue={
`<Button tertiary>Click</Button>`
      }
      scope={{ Button, styled }}
    />

    <p>`secondary` button should be white `onGray` backgroud:</p>
    <Playground
      defaultValue={
`<Button onGray>Click</Button>`
      }
      scope={{ Button, styled }}
    />

    <p>Buttons can be `disabled`:</p>
    <Playground
      defaultValue={
`<Button disabled>Click</Button>`
      }
      scope={{ Button, styled }}
    />

    <p>Most elements can be turned into a `Button`:</p>
    <Playground
      defaultValue={
`const ButtonLink = Button.factory('a');

<ButtonLink href="#">
  Click
</ButtonLink>`
      }
      scope={{ Button, styled }}
    />
    <p>Shortcuts are provided for turning the following elements into `Buttons`:</p>
    <Playground
      defaultValue={
`<div>
  <Button.A href="#">Click</Button.A>{' '}
  <Button.Div>Click</Button.Div>{' '}
  <Button.Span>Click</Button.Span>{' '}
  <Button.Li>Click</Button.Li>
</div>`
      }
      scope={{ Button, styled }}
    />
    <p>Arbitrary styles may override using `styled-components`:</p>
    <Playground
      defaultValue={
`const MyButton = styled(Button)\`
  borderRadius: 20px;
\`;

<MyButton>Click</MyButton>`
      }
      scope={{ Button, styled }}
    />
    <p>But a few shorthands are provided: `flex`, `margin` & `block`.</p>
    <Playground
      defaultValue={
`<div style={{display: 'flex', width: '100%'}}>
  <Button flex margin="0 2px">Cancel</Button>
  <Button flex primary margin="0 2px">OK</Button>
</div>`
      }
      scope={{ Button, styled }}
      viewerStyle={{ width: '100%' }}
    />
    <Playground
      defaultValue={
`<div style={{
  display: 'flex',
  flexDirection: 'column',
  width: '100%'}}>
  <Button flex margin="2px 0">One</Button>
  <Button flex margin="2px 0">Two</Button>
  <Button flex margin="2px 0">Three</Button>
</div>`
      }
      scope={{ Button, styled }}
      fullWidth
    />
    <Playground
      defaultValue={
`<Button.Div block>Block</Button.Div>`
      }
      scope={{ Button, styled }}
      viewerStyle={{ width: '100%' }}
    />

  </div>
)

export default ButtonPage
