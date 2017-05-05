export default function waitForWebfonts(fonts, callback) {
  let loadedFonts = 0
  for (let i = 0, l = fonts.length; i < l; ++i) {
    ;(function(font) {
      let node = document.createElement('span')
      // Characters that lety significantly among different fonts
      node.innerHTML = 'giItT1WQy@!-/#'
      // Visible - so we can measure it - but not on the screen
      node.style.position = 'absolute'
      node.style.left = '-10000px'
      node.style.top = '-10000px'
      // Large font size makes even subtle changes obvious
      node.style.fontSize = '300px'
      // Reset any font properties
      node.style.fontFamily = 'sans-serif'
      node.style.fontVariant = 'normal'
      node.style.fontStyle = 'normal'
      node.style.fontWeight = 'normal'
      node.style.letterSpacing = '0'
      document.body.appendChild(node)

      // Remember width with no applied web font
      let width = node.offsetWidth

      node.style.fontFamily = `${font}, sans-serif`

      let interval
      function checkFont() {
        // Compare current width with original width
        console.log(node && node.offsetWidth, width)
        if (node && node.offsetWidth != width) {
          ++loadedFonts
          node.parentNode.removeChild(node)
          node = null
        }

        // If all fonts have been loaded
        if (loadedFonts >= fonts.length) {
          if (interval) {
            clearInterval(interval)
          }
          if (loadedFonts == fonts.length) {
            callback()
            return true
          }
        }
      }

      if (!checkFont()) {
        interval = setInterval(checkFont, 50)
      }
    })(fonts[i])
  }
}
