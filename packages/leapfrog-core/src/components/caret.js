import React from 'react'
import { css } from 'aphrodite'
import bindStyles from '../hocs/bind-styles'
import { compose, defaultProps, setDisplayName } from 'recompose'

const Caret = ({ styles, north, south, east, west}) => {
  let direction = 'south'
  if (north) direction = 'north'
  if (east) direction = 'east'
  if (west) direction = 'west'

  return <div className={css(styles.caret, styles[direction])} />
}

const getStyles = ({ width, height }) => ({
  [`caret`]: {
    borderTop: `${height}px solid`,
    borderRight: `${width}px solid transparent`,
    borderLeft: `${width}px solid transparent`,
    marginLeft: 0,
    display: 'inline-block',
  },
  north: {
    transform: 'rotate(180deg)',
  },
  south: {
    transform: 'rotate(0deg)',
  },
  east: {
    transform: 'rotate(90deg)',
  },
  west: {
    transform: 'rotate(270deg)',
  },
})

const enhance = compose(
  setDisplayName('Caret'),
  defaultProps({
    width: 5,
    height: 10,
  }),
  bindStyles({
    getStyles,
  }),
)

export default enhance(Caret)
