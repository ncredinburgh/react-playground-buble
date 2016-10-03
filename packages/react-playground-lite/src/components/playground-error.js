import React from 'react'

const PlaygroundError = ({ errorMessage, source, style }) => {
  if (!/\((\d+):(\d+)\)$/.test(errorMessage)) {
    return (
      <pre style={{color: 'red'}}>
        {errorMessage}
      </pre>
    )
  }
  const [,line, char] = errorMessage.match(/\((\d+):(\d+)\)$/)
  const lines = source.split('\n')
  let spaces = ''
  for(let i = 0; i < char - 1; i++) {
    spaces += ' '
  }
  const prevLine = lines[line - 2]
  console.log(lines)
  return (
    <pre style={{
      color: 'red',
      ...style,
    }}>
      {prevLine ? `${lines[line - 2]}\n` : ''}
      {`${lines[line - 1]}\n`}
      {`${spaces}^\n`}
      {errorMessage}
    </pre>
  )
}

export default PlaygroundError
