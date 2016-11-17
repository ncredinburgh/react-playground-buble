import React from 'react'
import Title from '../components/title'
import { Caret } from '../../../src'

import Playground from '../components/themed-playground'

const compass =
`<div>
  <Caret east />
  <Caret north />
  <Caret south />
  <Caret west />
</div>`

const compass2 =
`<div>
  <Caret rotate={-90 + 45} />
  <Caret rotate={180 + 45} />
  <Caret rotate={0 + 45} />
  <Caret rotate={90 + 45} />
</div>`

const rotate =
`class Rotate extends Component {
  constructor() {
    this.state = { angle: 0 }
    this.clear = setInterval(
      () => this.setState({ angle: this.state.angle + 90 }),
      1000
    )
  }

  componentWillUnmount() { clearInterval(this.clear) }

  render() {
    return (
      <Caret
        rotate={this.state.angle}
        transitionSpeed={0.3}
      />
    )
  }
}

<Rotate />`

const CaretPage = () => (
  <div>
    <Title>Caret</Title>
    <p>Default caret:</p>
    <Playground
      defaultValue={`<Caret />`}
      scope={{ Caret }}
    />
    <p>Size is determined by `width` and `height`. Note: if rotating the caret use odd numbers for crisp rendering:</p>
    <Playground
      defaultValue={`<Caret width={9} height={5}/>`}
      scope={{ Caret }}
    />
    <p>Color is inherited from css `color` of ancestor:</p>
    <Playground
      defaultValue={
`<div style={{color: 'crimson'}}>
  <Caret />
</div>`
      }
      scope={{ Caret }}
    />
    <p>Inline styles can be passed down:</p>
    <Playground
      defaultValue={
`<Caret east style={{
  padding: 20,
  background: '#ccc',
  color: '#777',
  borderRadius: 5,
  boxShadow: '-2px 2px 5px'
}} />`
      }
      scope={{ Caret }}
    />
    <p>Direction is determined by `north`, `south`, `east` & `west`:</p>
    <Playground
      defaultValue={compass}
      scope={{ Caret }}
    />
    <p>Or `rotate` can be used to do the same:</p>
    <Playground
      defaultValue={compass2}
      scope={{ Caret }}
    />
    <p>If animating use `rotation` and `transitionSpeed`:</p>
    <Playground
      defaultValue={rotate}
      scope={{ Caret }}
    />
  </div>
)

export default CaretPage
