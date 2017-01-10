const googlish = (
  query,
  wholeWords = false,
  caseSensitive = false
) => {
  const inquotes = /(["'])(\\\1|.)*?\1/g
  const words = /[^\s"']+/g
  const quoted = query.match(inquotes) || []
  const rest = query.replace(inquotes, '').match(words) || []
  const trim = (s) => s.substr(1, s.length - 2)
  const dequoted = quoted.map(trim)
  const cs = caseSensitive ? '' : 'i'
  const wb = wholeWords ? '\\b' : ''
  const toRegExp = (word) => new RegExp(wb + word + wb, cs)
  const regExps = [ ...dequoted, ...rest ].map(toRegExp)
  return (text) => {
    let i = 0
    while(regExps[i] && regExps[i].test(text)) i++
    return i === regExps.length
  }
}

export default googlish
