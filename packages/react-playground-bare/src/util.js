import 'isomorphic-fetch'
import { transform } from 'buble'
import ReactDOM from 'react-dom'
import React from 'react'


export function evalInContext(js, context) {
  const scope = Object.keys(context)
    .map(key => `var ${key} = this.${key};\n`)
    .join('')

  return function () {
    return eval(`${scope};\n${js}`)
  }.call(context)
}

export const remoteCompile = (source, url) => fetch(url, {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  method: 'POST',
  body: JSON.stringify({ source }),
})
.then(res => res.json())
.then(({ transpiled, errorMessage }) => {
  if (errorMessage !== '') throw new Error(errorMessage)
  return transpiled
})

export const localCompile = source => new Promise((resolve, reject) => {
  const trans = transform(source, {
    objectAssign: 'Object.assign',
    transforms: {
      dangerousTaggedTemplateString: true,
    },
  })

  resolve(trans.code)
})

export const evalReact = (scope, mountNode) => transpiled => new Promise((resolve, reject) => {
  const evaluatedChild = evalInContext(transpiled, {
    React,
    ReactDOM,
    render: ReactDOM.render,
    Component: React.Component,
    mountNode,
    ...scope
  })
  resolve(React.isValidElement(evaluatedChild) ? evaluatedChild : null)
})

export const formatErrorMessage = ({ errorMessage, source }) => {
  if (!/\((\d+):(\d+)\)$/.test(errorMessage)) {
    return errorMessage
  }

  const [,line, char] = errorMessage.match(/\((\d+):(\d+)\)$/)
  const lines = source.split('\n')
  let spaces = ''
  for(let i = 0; i < char - 1; i++) {
    spaces += ' '
  }
  const prevLine = lines[line - 2]
  return [
    prevLine ? `${lines[line - 2]}\n` : '',
    `${lines[line - 1]}\n`,
    `${spaces}^\n`,
    errorMessage
  ].join('')
}
