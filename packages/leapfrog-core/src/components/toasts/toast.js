import React from 'react'
import styled from 'styled-components'
import Spacer from '../spacer'
import {
  AlertError,
  AlertWarning,
  Success,
  AlertFill,
  Info,
} from '@di-internal/leapfrog-icons'

const colors = {
  success: 'background: #e0ead9',
  info: 'background: #f5fbff;',
  warning: 'background: #fff8e5;',
  danger: 'background: #ffe7e5;',
  message:
`background: #f5f5f5;
border: 1px solid #e7e3e3;`,
}

const icons = {
  success: <Success block/>,
  info: <Info block/>,
  warning: <AlertWarning block/>,
  danger: <AlertError block/>,
  message: <AlertFill block/>,
}

const getColor = ({ type }) =>
  colors[type] || colors.message

const Div = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  line-height: 1.42857143;
  padding: 15px;
  margin-bottom: 22px;
  font-weight: bold;
  ${getColor}
`

const Icon = type => ({

})

const Toast = ({ id, type, icon, children }) => (
  <Div
    key={id}
    type={type}
  >
    {
      icon ? (
        <div style={{ color: '#05c' }}>
          {icons[type || 'message']}
        </div>
      ) : null
    }
    {icon ? <Spacer height={1} /> : null}
    <div>
      {children}
    </div>
  </Div>
)

export default Toast
