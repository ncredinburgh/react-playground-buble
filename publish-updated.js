const spawn = require('child_process').spawn
const path = require('path')
const fs = require('fs')

const args = process.argv.slice(2)
const isNew = args.includes('--new')
const packageName = args.filter(arg => arg !== '--new')[0]

function npmPublish(packageName, version) {
  let errMessage = ''
  let message = ''
  console.log(
`
Publishing @di-internal/${packageName}@${version}:
cd packages/${packageName} && npm publish`)
  const npmPub = spawn('npm', ['publish'], {
    cwd: path.resolve(__dirname, 'packages', packageName),
  })

  // const timeout = setTimeout(() => {
  //   npmPub.stdout.pause()
  //   npmPub.stderr.pause()
  //   npmPub.kill()
  //   console.log(`Error: timeout connecting to internal npm to publish ${packageName}`)
  //   process.exit(1)
  // }, 5000)

  npmPub.on('close', code => {
//    clearTimeout(timeout)
    console.log(message)
    console.log(errMessage)
    console.log(`child process exited with code ${code}`)
    process.exit(code)
  })

  npmPub.stdout.on('data', data => message += data)
  npmPub.stderr.on('data', data => errMessage += data)
}

function getVersion(packageName) {
  const packageJson = fs.readFileSync(
    path.join(__dirname, 'packages', packageName, 'package.json'),
    'utf8'
  )
  return JSON.parse(packageJson).version
}

function publishUpdated(packageName) {
  let errMessage = ''
  let message = ''
  const version = getVersion(packageName)
  const npmView = spawn('npm', ['view', `@di-internal/${packageName}@${version}`])
  let err = false
  let canPublish = false
  const timeout = setTimeout(() => {
    npmView.stdout.pause()
    npmView.stderr.pause()
    npmView.kill()
    console.log(`Error: timeout connecting to internal npm to publish ${packageName}`)
    process.exit(1)
  }, 10000)

  npmView.on('close', code => {
    clearTimeout(timeout)
    const packageNotFound = errMessage.indexOf('npm ERR! 404') !== -1

    if (packageNotFound) {
//       if (!isNew) {
//         console.log(
// `Package ${packageName} may not have been published.
// When adding a new package use '--new' on first publish:
//
// node publish-updated some-package --new`
//         )
//         console.log(`child process exited with code ${1}`)
//         process.exit(1)
//       } else {
      console.log(`first publish ${packageName}@${version}`)
      npmPublish(packageName, version)
      // }
    } else {
      if (message === 'undefined') {
        console.log('publishing because version not found')
        npmPublish(packageName, version)
      } else {
        console.log('VERSION May exist so skiping publish')
        console.log(`message: ${message}`)
        console.log(`errMessage: ${errMessage}`)
        process.exit(0)
      }
    }
  })

  npmView.stdout.on('data', data => message += data)
  npmView.stderr.on('data', data => errMessage += data)
}

// console.log(getVersion(packageName))
publishUpdated(packageName)
