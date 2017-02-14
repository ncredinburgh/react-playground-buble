const fs = require('fs')
const path = require('path')

const getFnName = str => str
  .replace(/\.svg$/, '')
  .replace(/(^|\-)(\w)/g, (...m) => m[2].toUpperCase())

const camel = str => str
  .replace(/\-(\w)/g, (...m) => m[1].toUpperCase())

const getHeight = attrs => {
  if (!attrs) return ''
  const matches = attrs.match(/viewBox="\d+ \d+ \d+ (\d+)"/)
  if ((!(matches && matches[1])) || matches[1] === '18') return ''
  return `height="${matches[1]}"`
}

const getContent = svgTxt => svgTxt.replace(/^/g, '  ')
  .trim()
  .replace(/\n/g, '\n  ')
  .replace(/\bclass=/g, 'className=')
  .replace(
    /(<style[^>]*?>)([\s\S]*?)(<\/style>)/gm,
    (...m) => `${m[1]}{\`${m[2]}\`}${m[3]}`
  )
  .replace(/<svg([^>]*)>/, (...m) =>
`  <Svg${m[1].replace(/\s?xmlns="http:\/\/www.w3.org\/2000\/svg\s?"/, '')} {...props}>`
  )
  .replace(/<title>[^<]*?<\/title>/g, '')
  .replace(/<desc>[^<]*?<\/desc>/g, '')
  .replace(/\s(\S*?)="/g, (...m) => ` ${camel(m[1])}="`)
  .replace(/"\/>/g, '" />')
  .replace(/<\/svg>/g, '</Svg>')

const wrapContent = (content, file) =>
`export const ${getFnName(file)} = props => (\n${content}\n)\n`

const wrapPage = (content, names, allFnName) =>
`import React from 'react'
import Svg from './svg'

${content}
`

const convertDir = (inputFolder, outputFile, allFnName) => {
  fs.readdir(inputFolder, (err, files) => {
    const components = []
    const names = []
    files
      .filter(x => /\.svg$/.test(x))
      .forEach(file => {
        const svgTxt = fs.readFileSync(
          path.join(inputFolder, file)
        , 'utf8')
        names.push(getFnName(file))
        components.push(wrapContent(getContent(svgTxt), file))
      })
    fs.writeFileSync(
      outputFile,
      wrapPage(components.join('\n'), names, allFnName),
      'utf8'
    )
  })
}

[
  'current-color',
  'fixed-color',
  'loaders',
].forEach(name => convertDir(
  path.join(__dirname, 'output', name),
  path.join(__dirname, 'src', `${name}.js`),
  camel(`all-${name}`)
))
