import React from 'react'
import { parse } from 'react-docgen'

const toRawFlowType = item => {
  const flowType = item.value && item.value.flowType
  return {
    name: item.key,
    flowType: (flowType && (flowType.raw || flowType.name)) || '',
    description: item.value.description || '',
    required: item.value.required ? '✓' : '✗',
  }
}

function PropsDocs({ src }) {
  const typeData = parse(src)
  const toArray = obj => Object.keys(obj).map(key => ({ key, value: obj[key] }))
  //console.log(JSON.stringify(parse(src),0,2))
  const typeArray = toArray(typeData.props)
  return (
    <table>
      <tbody>
      {
        typeArray
          .map(toRawFlowType)
          .map(({ name, flowType, description, required }, i) => (
            <tr key={i}>
              <td><code><b>{`${name}${required ? '' : '?'}`}</b></code></td>
              <td><pre style={{padding: '5px 20px', margin: 0}}>{flowType}</pre></td>
              <td>{description}</td>
            </tr>
          ))
      }
      </tbody>
    </table>
  )
}

export default PropsDocs
