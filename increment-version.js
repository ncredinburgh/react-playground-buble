const path = require('path')
const fs = require('fs')


const name = path.join(__dirname, 'package.json')
const packageJson = fs.readFileSync(name, 'utf8')
const out = packageJson.replace(
  /"version":\s+"(\d+)\.(\d+)\.(\d+)"/,
  (all, major, minor, patch) =>
    `"version": "${major}.${minor * 1 + 1}.${patch}"`
)

fs.writeFileSync(name, out, 'utf8')
