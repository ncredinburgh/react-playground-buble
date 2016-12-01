export const injectCss = url => {
  if (document.querySelector(`link[rel="stylesheet"][href="${url}"]`)) return
  const stylesheet = document.createElement('link')
  stylesheet.setAttribute('rel', 'stylesheet')
  stylesheet.setAttribute('href', url)
  document.head.appendChild(stylesheet)
}
