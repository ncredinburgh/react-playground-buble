import { PageLoader, SmallLoader } from '@di-internal/leapfrog-icons'
import { withProps } from 'recompose'
import styled, { keyframes } from 'styled-components'

const rotate360 = keyframes`
  from { transform: rotate3d(0,0,1,0deg); }
  to { transform: rotate3d(0,0,1,360deg); }
`
const enhance = withProps({ block: true, height: 22 })
const rotate = icon => enhance(styled(icon)`
  animation: ${rotate360} 2s linear infinite;`)

const Page = rotate(PageLoader)
const Small = rotate(SmallLoader)

const Loader = ({ small }) => small ? Page : Small

export default Loader
