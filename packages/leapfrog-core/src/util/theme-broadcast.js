export default class ThemeBroadcast {
  listeners = []
  constructor(theme) {
    this.theme = theme
  }

  addListener = fn => {
    this.listeners.push(fn)
  }

  removeListener = fn => {
    this.listeners = this.listeners.filter(x => x !== fn)
  }

  broadcast = (theme, ignoreFn) => {
    this.theme = theme
    this.listeners
      .filter(fn => fn !== ignoreFn)
      .forEach(fn => fn(theme, true))
  }
}
